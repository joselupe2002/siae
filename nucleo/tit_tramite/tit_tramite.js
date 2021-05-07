var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var porcProyectado=0;
var porcPosible=0;
var porcReal=0;
var miciclo="";
var laedad="";
var tramini=false;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

	
		
		$('.easy-pie-chart.percentage').each(function(){
			var barColor = $(this).data('color') || '#2979FF';
			var trackColor = '#E2E2E2';
			var size = parseInt($(this).data('size')) || 72;
			$(this).easyPieChart({
				barColor: barColor,
				trackColor: trackColor,
				scaleColor: false,
				lineCap: 'butt',
				lineWidth: parseInt(size/5),
				animate:false,
				size: size
			}).css('color', barColor);
			});


			elsqlc="SELECT IFNULL(max(CICLO),getciclo()) FROM tit_pasantes a where a.MATRICULA='"+usuario+"'";
			parametros={sql:elsqlc,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
					type: "POST",
					data:parametros,
					url:  "../base/getdatossqlSeg.php",
					success: function(data){ 						
						losdatos=JSON.parse(data); 
						miciclo=losdatos[0][0];
						$("#elciclo").html(losdatos[0][0]);
					}
				});


			
		cargarAvance();
	});
	
	
		 
	function cargarAvance() {

		elsql="select ALUM_MATRICULA, TIMESTAMPDIFF(YEAR,STR_TO_DATE(ALUM_FECNAC,'%d/%m/%Y'),CURDATE()) AS EDAD, "+
		" ALUM_CORREO, ALUM_FOTO, ALUM_MAPA, ALUM_ESPECIALIDAD,"+ 
		"CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) as ALUM_NOMBREC,"+
		"b.CLAVEOF as CVEESP, b.DESCRIP AS ESPECIALIDADD, ALUM_CARRERAREG, CARR_DESCRIP AS CARRERAD, PLACRED "+
		" from falumnos a "+
		" LEFT OUTER join especialidad b on (a.ALUM_ESPECIALIDAD=b.ID)"+
		" LEFT OUTER join ccarreras c on (a.ALUM_CARRERAREG=c.CARR_CLAVE)"+
		" LEFT OUTER join mapas d on (a.ALUM_MAPA=d.MAPA_CLAVE)"+
		" where a.ALUM_MATRICULA='"+usuario+"'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	   $.ajax({
		   type: "POST",
		   data:parametros,
		   url:  "../base/getdatossqlSeg.php",
		   success: function(data){ 
			   losdatos=JSON.parse(data); 
			   $("#matricula").html(losdatos[0]["ALUM_MATRICULA"]);                               
			   $("#foto").attr('src',losdatos[0]["ALUM_FOTO"]);
			   $("#nombre").html(losdatos[0]["ALUM_NOMBREC"]); 
			   $("#carrera").html(losdatos[0]["ALUM_CARRERAREG"]+" "+losdatos[0]["CARRERAD"]); 
			   $("#mapa").html(losdatos[0]["ALUM_MAPA"]); 
			   $("#especialiad").html(losdatos[0]["CVEESP"]+" "+losdatos[0]["ESPECIALIDADD"]);
			   $("#carrera").html(losdatos[0]["ALUM_CARRERAREG"]+" "+losdatos[0]["CARRERAD"]);
			   $("#micorreo").html(losdatos[0]["ALUM_CORREO"]);

			   laedad=losdatos[0]["EDAD"];
			   totalcred=losdatos[0]["PLACRED"];
			   elmapa=losdatos[0]["ALUM_MAPA"];
			   laesp=losdatos[0]["ALUM_ESPECIALIDAD"];
			   //Los avances de los creditos 
			   real=0;
				elsql="select IFNULL(sum(h.CICL_CREDITO),0) from dlista b, eciclmate h where "+
				" b.ALUCTR='"+usuario+"' and h.CICL_MAPA='"+elmapa+"'  and ((IFNULL(h.cveesp,'0')='"+laesp+"') "+
				" or (IFNULL(h.cveesp,'0')='0'))"+
				" and h.CICL_MATERIA=b.MATCVE and b.LISCAL>=70 and CERRADO='S' "+
				" and CICL_TIPOMAT NOT IN ('T'); ";

				parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
				$.ajax({
					type: "POST",
					data:parametros,
					url:  "../base/getdatossqlSeg.php",
					success: function(data){ 
						losdatos=JSON.parse(data); 
						real=losdatos[0][0];
						porcReal=(parseInt(real)/parseInt(totalcred)*100).toFixed(0);
						console.log("Real="+real+" Cred:"+totalcred);
						$("#etelavance").html(porcReal);                               
						$('#elavance').data('easyPieChart').update(porcReal);


						//========================================================
						
						losdatos=JSON.parse(data); 						

						if ((porcReal>=50)) {
										
							$("#servicio").empty();
							$("#panel1").empty();
							OpcionesTitulacion();			
							
						}	
					else {
						alert ("No cumples con el 100%  de tus créditos para iniciar trámites de Titulación");
						$("#ppuede").removeClass("glyphicon glyphicon-unchecked blue bigger-260");
						$("#ppuede").addClass("fa fa-times red bigger-260");	
					}			
					}
				});

		   }
	   });
   }  



   function OpcionesTitulacion(){
	
	//Cargamos datos adjuntos 

	cargarPestania("TITULA_ESCOLARES","panEsc","ADJTITULACION","eadjtitulacion",usuario,miciclo);
	cargarPestania("TITULA_TIT","panTit","ADJTITULACION","eadjtitulacion",usuario,miciclo);
							

	var abierto=false;
	elsql="select a.*, count(*) as N from vtit_pasantes a where MATRICULA='"+usuario+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){	
			arrpasante=JSON.parse(data);
			if (JSON.parse(data)[0]["N"]>0) { tramini=true; etbtn="Ver Oficio Tramite"; evbtn="reporteTramite();"; msj="Ya iniciaste trámite de titulación"; tipo="success";} 
			else { etbtn="Iniciar Tramite";  evbtn="iniciarTramite();"; msj="No has iniciado trámite de titulación"; tipo="warning"; }
			
			$("#servicio").html();	

			$("#panel1").append("<div class=\"alert alert-"+tipo+"\" style=\"width:100%;\"> "+msj+
			"<div class=\"row\">"+
			"    <div class=\"col-sm-6\">"+
			"        <button  style=\"width:100%\" onclick=\""+evbtn+"\" class=\"btn  btn-white btn-danger\">"+
			"            <i class=\"ace-icon red fa fa-gears bigger-130\"></i><span>"+etbtn+"</span>"+
			"        </button>"+
			"    </div>"+
			"    <div class=\"col-sm-6\" id=\"btn2\"></div>"+
			"</div>"+
			"<div class=\"row\">"+
			"    <div class=\"col-sm-6\" id=\"btn3\"></div>"+
			"    <div class=\"col-sm-6\" id=\"btn4\"></div>"+
			"</div>");	


			if (tramini) {

				$("#pestas").removeClass("hidden");

				$("#btn2").append("<button  style=\"width:100%\" onclick=\"impSolTit();\" class=\"btn  btn-white btn-primary\">"+
				"     <i class=\"ace-icon blue fa fa-edit bigger-130\"></i><span>Solicitud de Titulación</span>"+
				"</button></div></div>");
				
				$("#btn3").append("<button style=\"width:100%\" onclick=\"impNoAdeudo();\" class=\"btn  btn-white btn-success\">"+
				"     <i class=\"ace-icon green fa fa-tag bigger-130\"></i><span>No Adeudo</span>"+
				"</button></div></div>");

				$("#btn4").append("<button  style=\"width:100%\" onclick=\"impEntregaProy();\" class=\"btn  btn-white btn-warning\">"+
				"     <i class=\"ace-icon purple fa fa-legal bigger-130\"></i><span>Cons. Entrega Proy.</span>"+
				"</button></div></div>");

				elsql="SELECT * FROM historialtram h where h.IDTRAM='"+usuario+"' and AREA='TITULACION' ORDER BY ID";

				$("#panel1").append("<div id=\"historial\" class=\"alert alert-info fontRobotoB\" style=\"font-size:24px; width:100%;text-align:center;\">"+
				"<span >SEGUIMIENTO DE TITULACIÓN</span>  </div>");	

				cont=1;
				parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
				$.ajax({
					type: "POST",
					data:parametros,
					url:  "../base/getdatossqlSeg.php",
					success: function(data){							
						jQuery.each(JSON.parse(data), function(clave, valor) { 
							cadSin=""; cadExam="";
							if (valor.TIPO=="SINODALASIG") {
								cadSin="<div class=\"col-sm-12\">"+
									   "<span class=\"text-success\">PRESIDENTE:</span><span class=\"text-info\">"+arrpasante[0]["PRESIDENTED"]+"</span><br>"+
									   "<span class=\"text-success\">SECREATARIO:</span><span class=\"text-info\">"+arrpasante[0]["SECRETARIOD"]+"</span><br>"+
									   "<span class=\"text-success\">VOCAL:</span><span class=\"text-info\">"+arrpasante[0]["VOCALD"]+"</span><br>"+
									   "<span class=\"text-success\">SUPLENTE:</span><span class=\"text-info\">"+arrpasante[0]["VOCALSUPLENTED"]+"</span><br><br>"+
									   "</div>";									
							}

							if (valor.TIPO=="ASIGNOFECHA") {
								cadExam="<div class=\"col-sm-12\">"+
									   "<span class=\"text-success\">FECHA PROTOCOLO:</span><span class=\"text-info\">"+arrpasante[0]["FECHA_TIT"]+"</span><br>"+
									   "<span class=\"text-success\">HORA PROTOCOLO:</span><span class=\"text-info\">"+arrpasante[0]["HORA_TIT"]+"</span><br>"+
									   "<span class=\"text-success\">LUGAR:</span><span class=\"text-info\">"+arrpasante[0]["SALA_TIT"]+"</span><br>"+
									 
									   "</div>";									
							}

							$("#historial").append(
							"<div class=\"row fontRobotoB\" style=\"text-align:left; font-size:14px;\">"+
							"	<div class=\"col-sm-1\" style=\"font-size:48px; color:#0E8040;\">"+
							        cont+
							"	</div>"+
							"	<div class=\"col-sm-11\" style=\"text-align:left;\">"+	
							"		<div class=\"row\" style=\"text-align:left;\">"+												
							"			<div class=\"col-sm-12\" style=\"text-align:left; color:#0D5183;\">"+valor.TITULO+"</div>"+
							"			<div class=\"col-sm-12\" style=\"text-align:left;\">"+
							"        		<i class=\"glyphicon glyphicon-time green \"></i>"+valor.FECHA+
							"       		&nbsp;&nbsp;&nbsp;&nbsp;<i class=\"glyphicon glyphicon-calendar red \"></i>"+valor.HORA+
							"			</div>"+											
											cadSin+cadExam+
							"			</div>"+
							"		</div>"+
							"	</div>"+
							"</div>");
							cont++;
						});						
					}			
				});


				
			}
			
			
		}
		}); //del ajax de busqueda de corte abierto 
	}
	

	function  reporteTramite(){
		enlace="nucleo/tit_tramite/formato.php?alumno="+usuario;
		abrirPesta(enlace, "Apertura");
			
	}

	function  impNoAdeudo(){
		enlace="nucleo/tit_tramite/noadeudo.php?alumno="+usuario;
		abrirPesta(enlace, "NoAdeudo");
			
	}

	function  impEntregaProy(){
		enlace="nucleo/tit_tramite/entregaProy.php?alumno="+usuario;
		abrirPesta(enlace, "Ent_Proy");
			
	}
	

	function  impSolTit(){
		elsql="SELECT b.TIPO FROM tit_pasantes h, tit_opciones b where h.MATRICULA='"+usuario+"' and h.ID_OPCION=b.ID";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){	
				eltipo=JSON.parse(data)[0][0];
				enlace="";
				if (eltipo=='OBJETIVOS') {	enlace="nucleo/tit_tramite/soltitObj.php?alumno="+usuario;}
				if (eltipo=='COMPETENCIA') {	enlace="nucleo/tit_tramite/soltitComp.php?alumno="+usuario;}
				abrirPesta(enlace, "SolicitudTit");
			}			
		});

	
		
	}


	function  iniciarTramite(){

		elsql="SELECT count(*) as HAY FROM encrespuestas a where a.IDRESPONDE='"+usuario+"' and a.IDENC='2'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
				$.ajax({
					type: "POST",
					data:parametros,
					url:  "../base/getdatossqlSeg.php",
					success: function(data){	
				
						if (JSON.parse(data)[0]["HAY"]>0) {

							mostrarConfirm2("infoError","grid_tit_tramite","Iniciar Trámite de Titulación",
							"<div class=\"ventanaSC\" style=\"text-align:justify; width:99%; height:250px; overflow-y:auto; overflow-x:hidden;\">"+					
								"<div class=\"row\">"+
									"<div class=\"col-sm-12\">"+
										"<label class=\"fontRobotoB\">Modalidad de Titulación</label><select class=\"form-control captProy\"  id=\"modalidad\"></select>"+
									"</div>"+					
								"</div>"+	
								"<div class=\"row\">"+
									"<div class=\"col-sm-10\">"+
										"<label class=\"fontRobotoB\">Nombre del Tema (Proyecto/tesis/Residencia/Curso/Área Exámen)</label>"+							
										"<input class=\"form-control captProy\" id=\"tema\"></input>"+
									"</div>"+	
									"<div class=\"col-sm-2\">"+
										"<label class=\"fontRobotoB\">Edad Actual</label>"+							
										"<input class=\"form-control captProy\" id=\"edadtit\" value=\""+laedad+"\"></input>"+
									"</div>"+					
								"</div>"+	
								"<div class=\"row\">"+
									"<div class=\"col-sm-8\">"+
									"<label class=\"btn btn-white btn-small btn-success\" onclick=\"getNombreRes();\"><i class=\"fa fa-retweet red\"></i> Traer nombre de Proyecto de Residencia</label>"+
									"</div>"+					
								"</div>"+	
								"<div class=\"row\">"+
									"<div class=\"col-sm-12\">"+
										"<label class=\"fontRobotoB\">Producto de Titulación</label>"+
										"<select class=\"form-control captProy\"  id=\"producto\"></select>"+
									"</div>"+								
								"</div>"+				

							"</div>"
							,"Grabar Datos","grabarPasante();","modal-lg");

							actualizaSelectMarcar("modalidad", "SELECT ID, OPCION FROM tit_opciones order by OPCION", "","",""); 
							actualizaSelectMarcar("producto", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='PRODTITULACION' order by CATA_CLAVE", "","",""); 


							$('.captProy').keypress(function(){
								$(this).css("border-color","black");				
							});
							
						}	
						else {
							alert ("Para iniciar trámite de titulación primero debe llenar la Encuesta de egresados en Ecuestas - 04) Aplicar Encuestas");
						}				
						
					}
				});			
	}



	function grabarPasante(){
		vacios=false;
		$('.captProy').each(function(){
			if (($(this).val()=="") || (($(this).val()=="0"))) {
				$(this).css("border-color","red");
				vacios=true;
			}
		 });
		 if (!vacios) {
			mostrarEspera("esperaInf","grid_tit_tramite","Cargando Datos...");

			fecha=dameFecha("FECHA");
			fechaus=dameFecha("FECHAHORA");
			
			parametros={tabla:"tit_pasantes",
					bd:"Mysql",
					MATRICULA:usuario,
					CICLO:miciclo,
					ID_OPCION:$("#modalidad").val(),
					TEMA:$("#tema").val(),
					EDADTIT:$("#edadtit").val(),
					PRODUCTO:$("#producto").val(),
					FECHA_REG:fecha,
					FECHA_SE:fecha,
					FECHAUS:fechaus,
				
					USUARIO:usuario,				
					_INSTITUCION: lainstitucion, 
					_CAMPUS: elcampus}						
					$.ajax({
							type: "POST",
							url:"../base/inserta.php",
							data: parametros,
							success: function(data){
								 alert (data);
								 reporteTramite(); 
								 cargarAvance();
								 ocultarEspera("esperaInf");  
								 ocultarEspera("infoError"); 								   						
								}
							});			
		 }
		 else {alert ("No ha capturado toda la información obligatoria");}
	}


function getNombreRes(){
	var abierto=false;
		elsql="SELECT PROYECTO FROM vresidencias h where h.`MATRICULA`='"+usuario+"'"+
		"and h.`LIBERADO`='S'";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){
				$("#tema").val(JSON.parse(data)[0][0]);
			}			
		});

}





