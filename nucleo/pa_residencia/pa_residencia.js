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

	

			elsqlc="select ifnull(MAX(PDOCVE),getcicloRes()), COUNT(*) from dlista, cmaterias where ALUCTR='"+usuario+
			"' AND MATCVE=MATE_CLAVE AND IFNULL(MATE_TIPO,'0')='RP' AND IFNULL(LISCAL,'0')=0";

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
		verCartaPresentacion();
	});
	
	

	function verCartaPresentacion(){
		elsqlc="select ifnull(MAX(PDOCVE),getcicloRes()), COUNT(*) from dlista, cmaterias where ALUCTR='"+usuario+
			"' AND MATCVE=MATE_CLAVE AND IFNULL(MATE_TIPO,'0')='RP' AND IFNULL(LISCAL,'')=0";

		parametros={sql:elsqlc,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(dataCic2){ 
				losdatosCic=JSON.parse( dataCic2); 
				elciclo=losdatosCic[0][0];
				elsql="select ifnull(RUTA,'') as RUTA, count(*) as HAY FROM respropuestas a where MATRICULA='"+usuario+"' and CICLO='"+elciclo+"' and CANCELADA='N'";
				parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		
				$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){	
								losdatos=JSON.parse(data); 				
								if ((losdatos[0]["HAY"]>0) && (losdatos[0]["RUTA"]!="")) {							
									$("#lacarta").append(
										"<div class=\"row\">"+
											"<div class=\"row\">"+
												"<button  onclick=\"abrirPesta('"+losdatos[0]["RUTA"]+"','Carta');\" class=\"btn  btn-bold btn-danger\" value=\"Agregar\">"+
												"     <i class=\"ace-icon white fa fa-file-text bigger-200\"></i><span class=\"fontRobotoB text-white\">Ver Carta Presentación</span>"+
												"</button>"+
											"<div>"+
										"</div>");							
									}									 
							}
					});
			}
		});
	}
	

		 
	function cargarAvance() {

		elsql="select ALUM_MATRICULA, ALUM_CORREO, ALUM_FOTO, ALUM_MAPA, ALUM_ESPECIALIDAD,"+ 
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

						if ((porcReal>=80)) {
														
							$("#servicio").append("<div class=\"row\" style=\"text-align:left;\">"+
							"    <div class=\"col-sm-12\"> "+
							"     <div id=\"documentos2\" class=\"col-sm-12\" ></div>"+										
							"    </div>"+
							"</div>");

							$("#servicio").append("<div class=\"row\" style=\"text-align:left;\">"+
							"    <div class=\"col-sm-12\"> "+
							"     <div id=\"documentos3\" class=\"col-sm-12\" ></div>"+										
							"    </div>"+
							"</div>");
							$("#ppuede").removeClass("glyphicon glyphicon-unchecked blue bigger-260");
							$("#ppuede").addClass("fa  fa-check green bigger-260");	

							OpcionesResidencia();
							//abrirCapturaProyecto();
							documentosRes();
							OpcionesEvaluaciones();							
							
						}	
					else {
						alert ("No cumples los créditos todavia para cursar la  Residencia Profesional");
						$("#ppuede").removeClass("glyphicon glyphicon-unchecked blue bigger-260");
						$("#ppuede").addClass("fa fa-times red bigger-260");	
					}			
					}
				});

		   }
	   });
   }  


function cargarDatosPropuesta(tipo){
	$("#servicio").append("<div class=\"fontRobotoB\" id=\"lapropuesta\" style=\"text-align:left;\"></div>");

	$("#lapropuesta").append("<div class=\"row\">"+
								 "<div class=\"col-sm-6\"> "+
									"<label>Nombre de la Empresa</label><input class=\"form-control\" id=\"empresa\"></input>"+
								"</div>"+
								"<div class=\"col-sm-6\"> "+
								    "<label>Persona para Oficio</label><input class=\"form-control\" id=\"persona\"></input>"+
								"</div>");

	$("#lapropuesta").append("<div class=\"row\">"+
								"<div class=\"col-sm-6\"> "+
								   "<label>Puesto de la Persona</label><input class=\"form-control\" id=\"puesto\"></input>"+
							   "</div>"+
							   "<div class=\"col-sm-6\"> "+
								   "<label>Dirección Empresa, (Calle, número, ciudad, estado) </label><input class=\"form-control\" id=\"direccion\"></input>"+
							   "</div>");
	$("#lapropuesta").append("<div class=\"row\">"+
								"<div class=\"col-sm-6\">"+
									"<label class=\"fontRobotoB\">Estado</label><select onchange=\"eligeMuniProp();\" class=\"form-control captProy\"  id=\"estadoProp\"></select>"+							
								"</div>"+	
								"<div class=\"col-sm-6\">"+
   									"<label class=\"fontRobotoB\">Municipio</label><select class=\"form-control captProy\"  id=\"municipioProp\"></select>"+	
								"</div>"+
							"</div>");								   

	$("#lapropuesta").append("<div class=\"row\">"+
								 "<div class=\"col-sm-6\"> "+
									"<label>Inicia Residencia</label>"+
									" <div class=\"input-group\"><input  class=\"form-control date-picker\"  id=\"inicia\" "+
									" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
									" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
								"</div>"+
								"<div class=\"col-sm-6\"> "+
									"<label>Termina Residencia</label>"+
									" <div class=\"input-group\"><input  class=\"form-control date-picker\"  id=\"termina\" "+
									" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
									" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
								"</div>");

	$("#lapropuesta").append("<div class=\"row\">"+
								"<div class=\"col-sm-12\"> "+
									"<label>Proyecto de Residencia</label><input class=\"form-control\" id=\"proyectoProp\"></input>"+
								"</div>"+
							"</div>");

								
	$("#lapropuesta").append("<br><div style=\"text-align:center;\"><button  onclick=\"enviarPropuesta();\" class=\"btn  btn-bold btn-danger\" value=\"Agregar\">"+
	                         "     <i class=\"ace-icon white fa fa-save bigger-200\"></i><span class=\"btn-lg\">Enviar propuesta</span>"+
	                         "</button></div>");	
							 
	actualizaSelectMarcar("estadoProp", "SELECT ID_ESTADO, ESTADO FROM cat_estado order by ID_ESTADO", "","",'0'); 

	//Para los componentes de fecha 
    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
   }


   function eligeMuniProp(){
		actualizaSelectMarcar("municipioProp", "SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio where ID_ESTADO='"+$("#estadoProp").val()+"' order by MUNICIPIO", "","",municipioProp);
	}

   function OpcionesResidencia(){
	var abierto=false;
	elsql="select count(*) as N from ecortescal where  CICLO='"+miciclo+"'"+
	" and ABIERTO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') "+
	" Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
	" AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='RESPROF' "+
	" order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 1";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){	
			if (JSON.parse(data)[0]["N"]>0) {	

					$("#pcarta").removeClass("glyphicon glyphicon-unchecked blue bigger-260");
					$("#pcarta").addClass("fa  fa-check green bigger-260");
					// Verficamos si ya envio su propuesta de empresa. 
					var abierto=false;
					elsql="select a.*, count(*) as HAY FROM respropuestas a where MATRICULA='"+usuario+"' and CICLO='"+miciclo+"'";
					parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		
					$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){	
								losdatos=JSON.parse(data); 
								if (losdatos[0]["HAY"]>0) {	
									$("#pacarta").removeClass("glyphicon glyphicon-unchecked blue bigger-260");									    							
									$("#pcarta").addClass("fa  fa-check purple bigger-260");									
									}									 
								else {cargarDatosPropuesta(0);}
							}
					});

				} //DEL SI ESTA ABIERO 
				else { console.log("No hay proceso abierto para solicitud de Residencia Profesional");
						$("#pcarta").removeClass("glyphicon glyphicon-unchecked blue bigger-260");
						$("#pcarta").addClass("fa  fa-times red bigger-260");
				}
			}
		}); //del ajax de busqueda de corte abierto 
	}
	
	function enviarPropuesta(){
		if (($("#puesto").val()!='') && ($("#persona").val()!='') && ($("#inicia").val()!='') && ($("#empresa").val()!='') && ($("#domicilio").val()!='')) {
			var hoy= new Date();
			lafecha=hoy.getDate()+"/"+hoy.getMonth()+"/"+hoy.getFullYear()+" "+ hoy.getHours()+":"+hoy.getMinutes();
			parametros={tabla:"respropuestas",
						bd:"Mysql",
						_INSTITUCION:"ITSM",
						_CAMPUS:"0",
						MATRICULA:usuario,
						CICLO:miciclo,					
						PUESTO:$("#puesto").val().toUpperCase(),
						DOMICILIO:$("#direccion").val().toUpperCase(),
						PERSONA:$("#persona").val().toUpperCase(),
						EMPRESA:$("#empresa").val().toUpperCase(),
						ESTADO:$("#estadoProp").val(),
						MUNICIPIO:$("#municipioProp").val(),
						PROYECTO:$("#proyectoProp").val().toUpperCase(),
						INICIA:$("#inicia").val(),
						TERMINA:$("#termina").val(),
						FECHAENVIADA:lafecha,
						USUARIO:usuario,
						FECHAUS:lafecha
					};
						$.ajax({
							type: "POST",
							url:"../base/inserta.php",
							data: parametros,
							success: function(data){ 
								console.log(data);
								$("#servicio").html("<div class=\"alert alert-warning\" style=\"width:100%;\">"+ 									        
								"    Tu Solicitud ya fue enviada"+
								"</div>");	
								correoalJefe(usuario, "<html>El alumno <span style=\"color:green\"><b>"+usuario+" "+nombreuser+
								"</b></span> ha capturado los datos de Carta de Presentaci&oacute;n para Residencia Profesional, "+
								"Favor de Revisarlo para proceder a su autorizaci&oacute;n <BR>","ITSP: CAPTURA DE DATOS DE PRESENTACION DE "+usuario+" "+nombreuser);			

								setNotificacionalJefe(usuario,"Sol. Carta Presentación RP."+usuario+" "+nombreuser,"nucleo/respropuestas/grid.php?modulo=respropuestas","P",lainstitucion,elcampus);
								}
							});
						}
		else {alert ("Todos los datos son necesarios, por favor llene todos los campos");}
	
	}









	function abrirCapturaProyecto (){

		var abierto=false;
		elsql="select count(*) as N from ecortescal where  CICLO='"+miciclo+"'"+
		" and ABIERTO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') "+
		" Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
		" AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='CAPTPROYRES' "+
		" order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 1";


		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){	

				
				if (JSON.parse(data)[0]["N"]>0) {						
					//Si esta abierto aparecemos la opción de capturar Proyecto.
					$("#pcapt").removeClass("glyphicon glyphicon-unchecked blue bigger-260");
					$("#pcapt").addClass("fa  fa-check green bigger-260");
					$("#pesAnt").append("<hr><div style=\"text-align:center;\">"+
							"<button  onclick=\"capturaProyecto();\" class=\"btn btn-white btn-info btn-bold\">"+
							"     <i class=\"ace-icon green glyphicon glyphicon-book\"></i>1. Capturar Sol. Proyecto"+
							"</button> &nbsp;  &nbsp; "+
							"<button  onclick=\"verProyecto();\" class=\"btn btn-white btn-success btn-bold\">"+
							"     <i class=\"ace-icon pink glyphicon glyphicon-print\"></i>2. Imprimir Sol. Proyecto"+
							"</button>"+
					"</div>");

				}
				
			}
		});

	}


	function documentosRes(){

		var abierto=false;
		elsql="select count(*) as N from ecortescal where  CICLO='"+miciclo+"'"+
		" and ABIERTO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') "+
		" Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
		" AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='SUBIRDOCRES' "+
		" order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 1";
	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){					
				if (JSON.parse(data)[0]["N"]>0) {	
						cargarPestania("RESIDEN_REQ","pesReq","ADJRESIDENCIA","eadjresidencia",usuario,miciclo);
						cargarPestania("RESIDEN_ANT","pesAnt","ADJRESIDENCIA","eadjresidencia",usuario,miciclo);
						abrirCapturaProyecto ();
				}
			}
		});

	}

	function capturaProyecto(){
		elsql="select ifnull(ID,'0') as ID,ifnull( MATRICULA,'') AS MATRICULA,ifnull( CICLO,'') AS CICLO,ifnull( INICIA,'') AS INICIA,"+
		"ifnull( PROYECTO,'') AS PROYECTO,ifnull( TERMINA,'') AS TERMINA,ifnull( EMPRESA,'') AS EMPRESA,ifnull( DEPARTAMENTO,'')AS DEPARTAMENTO,ifnull( GIRO,'') AS GIRO,"+
		"ifnull( SECTOR,'') AS SECTOR,ifnull( DOMICILIO,'') AS DOMICILIO,ifnull( CP,'') AS CP,ifnull( TELEFONO,'') AS TELEFONO,ifnull( MISION,'') AS MISION,"+
		"ifnull( TITULAR,'') AS TITULAR,ifnull( PSTOTITULAR,'') AS PSTOTITULAR,ifnull( ASESOREX,'') AS ASESOREX,"+
		"ifnull( PSTOASESOREX,'') AS PSTOASESOREX,ifnull( ASESOR,'') AS ASESOR,ifnull( CORREOASESOREX,'') AS CORREOASESOREX,"+
		"ifnull( FIRMA,'') AS FIRMA,ifnull( PSTOFIRMA,'') as PSTOFIRMA,ifnull( CORREOFIRMA,'') as CORREOFIRMA,"+
		"ifnull( HORARIO,'LUNES A VIERNES DE DE HH:MM HORAS A HH:MM HORAS') as HORARIO,ifnull( VALIDADO,'') AS VALIDADI,"+
		"ifnull( USUARIO,'') AS USUARIO,ifnull( FECHAUS,'') AS FECHAUS,ifnull( _INSTITUCION,'') AS _INSTITUCION,"+
		"ifnull( MUNICIPIO,'') AS MUNICIPIO,ifnull( ESTADO,'') AS ESTADO,ifnull(TAMANIO,'') AS TAMANIO,"+
		"ifnull( ADICIONAL1,'') AS ADICIONAL1,ifnull( ADICIONAL2,'') AS ADICIONAL2,"+
		"ifnull( _CAMPUS,'') AS _CAMPUS,ifnull( RFC,'') AS RFC, VALIDADO AS VALIDADO,"+
		"count(*) as HAY from rescapproy a where  CICLO='"+miciclo+"'"+
		" and MATRICULA='"+usuario+"'";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){

				misdatos=JSON.parse(data);

				if (misdatos[0]["HAY"]>0) {proceso="actualizaDatos("+misdatos[0]["ID"]+");"; } else {proceso="grabarDatos();";}
				mostrarConfirm2("infoError","grid_pa_residencia","Captura de Datos del Proyecto",
				"<div class=\"ventanaSC\" style=\"text-align:justify; width:99%; height:250px; overflow-y:auto; overflow-x:hidden;\">"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Nombre del Proyecto</label><input class=\"form-control captProy\" id=\"proyecto\" value=\""+misdatos[0]["PROYECTO"]+"\"></input>"+
						"</div>"+
						"<div class=\"col-sm-3\">"+
							"<label  class=\"fontRobotoB\">Inicia</label>"+
							" <div class=\"input-group\"><input  class=\"form-control  captProy date-picker\"  value=\""+misdatos[0]["INICIA"]+"\" id=\"inicia\" "+
							" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
							" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
						"</div>"+
						"<div class=\"col-sm-3\">"+
							"<label class=\"fontRobotoB\">Termina</label>"+
							" <div class=\"input-group\"><input  class=\"form-control captProy date-picker\" value=\""+misdatos[0]["TERMINA"]+"\" id=\"termina\" "+
							" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
							" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
						"</div>"+
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Nombre de la empresa</label><input class=\"form-control captProy\" value=\""+misdatos[0]["EMPRESA"]+"\" id=\"empresa\"></input>"+
						"</div>"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Departamento de la empresa</label><input class=\"form-control captProy\" value=\""+misdatos[0]["DEPARTAMENTO"]+"\" id=\"departamento\"></input>"+
						"</div>"+		
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Giro de la empresa</label><select class=\"form-control captProy\"  id=\"giro\"></select>"+
						"</div>"+
						"<div class=\"col-sm-3\">"+
							"<label class=\"fontRobotoB\">Sector de la empresa</label><select class=\"form-control captProy\" id=\"sector\"></select>"+
						"</div>"+
						"<div class=\"col-sm-3\">"+
							"<label class=\"fontRobotoB\">RFC Empresa</label><input class=\"form-control captProy\" value=\""+misdatos[0]["RFC"]+"\" id=\"rfc\"></input>"+
						"</div>"+		
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-8\">"+
							"<label class=\"fontRobotoB\">Domicilio</label><input class=\"form-control captProy\" value=\""+misdatos[0]["DOMICILIO"]+"\" id=\"domicilio\"></input>"+
						"</div>"+
						"<div class=\"col-sm-2\">"+
							"<label class=\"fontRobotoB\">C.P.</label><input class=\"form-control captProy\" value=\""+misdatos[0]["CP"]+"\" id=\"cp\"></input>"+
						"</div>"+
						"<div class=\"col-sm-2\">"+
							"<label class=\"fontRobotoB\">Teléfono</label><input class=\"form-control captProy\" value=\""+misdatos[0]["TELEFONO"]+"\" id=\"telefono\"></input>"+
						"</div>"+		
					"</div>"+

					"<div class=\"row\">"+
						"<div class=\"col-sm-3\">"+
						     "<label class=\"fontRobotoB\">Estado</label><select onchange=\"eligeMuni('"+misdatos[0]["MUNICIPIO"]+"');\" class=\"form-control captProy\"  id=\"estado\"></select>"+							
						"</div>"+	
						"<div class=\"col-sm-3\">"+
							"<label class=\"fontRobotoB\">Municipio</label><select class=\"form-control captProy\"  id=\"municipio\"></select>"+	
						"</div>"+						
						"<div class=\"col-sm-3\">"+
							"<label class=\"fontRobotoB\">Tamaño</label><select class=\"form-control captProy\"  id=\"tamanio\"></select>"+	
						"</div>"+					
					"</div>"+

					"<div class=\"row\">"+
						"<div class=\"col-sm-12\">"+
							"<label class=\"fontRobotoB\">Misión de la Empresa</label><input class=\"form-control captProy\" value=\""+misdatos[0]["MISION"]+"\" id=\"mision\"></input>"+
						"</div>"+	
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Nombre del Titular Empresa (LIC./ING./MTRO. XXXX)</label><input class=\"form-control captProy\" value=\""+misdatos[0]["TITULAR"]+"\" id=\"titular\"></input>"+
						"</div>"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Puesto que ocupa en la Empresa</label><input class=\"form-control captProy\" value=\""+misdatos[0]["PSTOTITULAR"]+"\" id=\"pstotitular\"></input>"+
						"</div>"+	
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-4\">"+
							"<label class=\"fontRobotoB\">Grado y Nombre Asesor Externo</label><input class=\"form-control captProy\" value=\""+misdatos[0]["ASESOREX"]+"\" id=\"asesorex\"></input>"+
						"</div>"+
						"<div class=\"col-sm-4\">"+
							"<label class=\"fontRobotoB\">Puesto que ocupa en la empresa</label><input class=\"form-control captProy\" value=\""+misdatos[0]["PSTOASESOREX"]+"\" id=\"pstoasesorex\"></input>"+
						"</div>"+
						"<div class=\"col-sm-4\">"+
							"<label class=\"fontRobotoB\">Correo del Asesor externo</label><input class=\"form-control captProy\" value=\""+misdatos[0]["CORREOASESOREX"]+"\" id=\"correoasesorex\"></input>"+
						"</div>"+		
					"</div>"+

					"<div class=\"row\">"+
						"<div class=\"col-sm-4\">"+
							"<label class=\"fontRobotoB\">Grado y Nombre Firma Acuerdo</label><input class=\"form-control captProy\" value=\""+misdatos[0]["FIRMA"]+"\" id=\"firma\"></input>"+
						"</div>"+
						"<div class=\"col-sm-4\">"+
							"<label class=\"fontRobotoB\">Puesto que ocupa en la empresa</label><input class=\"form-control captProy\" value=\""+misdatos[0]["PSTOFIRMA"]+"\" id=\"pstofirma\"></input>"+
						"</div>"+
						"<div class=\"col-sm-4\">"+
							"<label class=\"fontRobotoB\">Correo</label><input class=\"form-control captProy\" value=\""+misdatos[0]["CORREOFIRMA"]+"\" id=\"correofirma\"></input>"+
						"</div>"+		
					"</div>"+

					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Horario Establecido para la Residencia</label><input class=\"form-control captProy\" id=\"horario\" value=\""+misdatos[0]["HORARIO"]+"\" ></input>"+
						"</div>"+	
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Asesor Interno</label><select class=\"form-control captProy\"  id=\"asesor\"></select>"+
						"</div>"+		
					"</div>"+

					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Adicional 1</label><input class=\"form-control captProyOP\" value=\""+misdatos[0]["ADICIONAL1"]+"\" id=\"adicional1\"></input>"+
						"</div>"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Adicional 2</label><input class=\"form-control captProyOP\" value=\""+misdatos[0]["ADICIONAL2"]+"\" id=\"adicional2\"></input>"+
						"</div>"+	
					"</div>"+

				"</div>"
				,"Grabar Datos",proceso,"modal-lg");

				actualizaSelectMarcar("giro", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='GIROEMPRESAS'", "","",misdatos[0]["GIRO"]); 
				actualizaSelectMarcar("sector", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='REGIMENEMPRESAS'", "","",misdatos[0]["SECTOR"]); 
				actualizaSelectMarcar("asesor", "SELECT EMPL_NUMERO, CONCAT(EMPL_NOMBRE, ' ',EMPL_APEPAT,' ', EMPL_APEMAT) FROM pempleados where EMPL_ACTIVO='S' ORDER BY EMPL_NOMBRE, EMPL_APEPAT", "","",misdatos[0]["ASESOR"]); 
				actualizaSelectMarcar("estado", "SELECT ID_ESTADO, ESTADO FROM cat_estado order by ID_ESTADO", "","",misdatos[0]["ESTADO"]); 				
				actualizaSelectMarcar("tamanio", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='TAMANIOEMP'", "","",misdatos[0]["TAMANIO"]); 
				actualizaSelectMarcar("municipio", "SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio where ID_ESTADO='"+misdatos[0]["ESTADO"]+"' order by MUNICIPIO", "","",misdatos[0]["MUNICIPIO"]);
				
				
				$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
				
			
				$('.captProy').keypress(function(){
					$(this).css("border-color","black");				
				});
			} //del successs
		});

	}


	function eligeMuni(municipio){
		actualizaSelectMarcar("municipio", "SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio where ID_ESTADO='"+$("#estado").val()+"' order by MUNICIPIO", "","",municipio);
	}
	



	function grabarDatos(){
		vacios=false;
		$('.captProy').each(function(){
			if (($(this).val()=="") || (($(this).val()=="0"))) {
				$(this).css("border-color","red");
				vacios=true;
			}
		 });
		 if (!vacios) {
			mostrarEspera("esperaInf","grid_pa_residencia","Cargando Datos...");

			fecha=dameFecha("FECHAHORA");
			parametros={tabla:"rescapproy",
					bd:"Mysql",
					MATRICULA:usuario,
					CICLO:miciclo,
					INICIA:$("#inicia").val(),
					TERMINA:$("#termina").val(),
					ASESOR:$("#asesor").val(),
					PROYECTO:$("#proyecto").val().toUpperCase(),
					EMPRESA:$("#empresa").val().toUpperCase(),
					DEPARTAMENTO:$("#departamento").val().toUpperCase(),
					GIRO:$("#giro").val().toUpperCase(),
					SECTOR:$("#sector").val().toUpperCase(),
					DOMICILIO:$("#domicilio").val().toUpperCase(),
					CP:$("#cp").val().toUpperCase(),
					RFC:$("#rfc").val().toUpperCase(),
					TELEFONO:$("#telefono").val().toUpperCase(),
					MISION:$("#mision").val().toUpperCase(),
					TITULAR:$("#titular").val().toUpperCase(),
					PSTOTITULAR:$("#pstotitular").val(),
					ASESOREX:$("#asesorex").val().toUpperCase(),
					PSTOASESOREX:$("#pstoasesorex").val().toUpperCase(),
					CORREOASESOREX:$("#correoasesorex").val().toLowerCase(),
					FIRMA:$("#firma").val().toUpperCase(),
					PSTOFIRMA:$("#pstofirma").val().toUpperCase(),
					CORREOFIRMA:$("#correofirma").val().toLowerCase(),
					HORARIO:$("#horario").val().toUpperCase(),

					ESTADO:$("#estado").val().toUpperCase(),
					MUNICIPIO:$("#municipio").val().toUpperCase(),				
					TAMANIO:$("#tamanio").val().toUpperCase(),				
					ADICIONAL1:$("#adicional1").val().toUpperCase(),
					ADICIONAL2:$("#adicional2").val().toUpperCase(),

					USUARIO:usuario,
					FECHAUS:fecha,
					_INSTITUCION: lainstitucion, 
					_CAMPUS: elcampus}						
					$.ajax({
							type: "POST",
							url:"../base/inserta.php",
							data: parametros,
							success: function(data){ 
								 alert (data);
								 ocultarEspera("esperaInf");  
								 ocultarEspera("infoError"); 
								   							
							
								}
							});			
		 }
		 else {alert ("No ha capturado toda la información de su proyecto");}
	}


	function actualizaDatos(elid){
		vacios=false;
		$('.captProy').each(function(){
			if($(this).val()==""){
				$(this).css("border-color","red");
				vacios=true;
			}
		 });
		 if (!vacios) {
			mostrarEspera("esperaInf","grid_pa_residencia","Cargando Datos...");
			fecha=dameFecha("FECHAHORA");
			parametros={tabla:"rescapproy",
					bd:"Mysql",
					campollave:"ID",
					valorllave:elid,
					MATRICULA:usuario,
					CICLO:miciclo,
					INICIA:$("#inicia").val(),
					TERMINA:$("#termina").val(),
					PROYECTO:$("#proyecto").val().toUpperCase(),
					EMPRESA:$("#empresa").val().toUpperCase(),
					DEPARTAMENTO:$("#departamento").val().toUpperCase(),
					GIRO:$("#giro").val().toUpperCase(),
					SECTOR:$("#sector").val().toUpperCase(),
					DOMICILIO:$("#domicilio").val().toUpperCase(),
					CP:$("#cp").val().toUpperCase(),
					RFC:$("#rfc").val().toUpperCase(),
					TELEFONO:$("#telefono").val().toUpperCase(),
					MISION:$("#mision").val().toUpperCase(),
					TITULAR:$("#titular").val().toUpperCase(),
					PSTOTITULAR:$("#pstotitular").val(),
					ASESOREX:$("#asesorex").val().toUpperCase(),
					PSTOASESOREX:$("#pstoasesorex").val().toUpperCase(),
					CORREOASESOREX:$("#correoasesorex").val().toLowerCase(),
					FIRMA:$("#firma").val().toUpperCase(),
					PSTOFIRMA:$("#pstofirma").val().toUpperCase(),
					CORREOFIRMA:$("#correofirma").val().toLowerCase(),
					HORARIO:$("#horario").val().toUpperCase(),
					ASESOR:$("#asesor").val(),

					ESTADO:$("#estado").val().toUpperCase(),
					MUNICIPIO:$("#municipio").val().toUpperCase(),				
					TAMANIO:$("#tamanio").val().toUpperCase(),				
					ADICIONAL1:$("#adicional1").val().toUpperCase(),
					ADICIONAL2:$("#adicional2").val().toUpperCase(),

					USUARIO:usuario,
					FECHAUS:fecha,
					_INSTITUCION: lainstitucion, 
					_CAMPUS: elcampus}						
					$.ajax({
							type: "POST",
							url:"../base/actualiza.php",
							data: parametros,
							success: function(data){ 
								 ocultarEspera("esperaInf");  
								 ocultarEspera("infoError"); 								   														
								}
							});			
		 }
		 else {alert ("No ha capturado toda la información de su proyecto");}
	}


	function  verProyecto(){

		elsql="select ID, count(*) as HAY from rescapproy a where  CICLO='"+miciclo+"' and MATRICULA='"+usuario+"'";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){
				misdatos=JSON.parse(data);
				if (misdatos[0]["HAY"]>0) {
					enlace="nucleo/pa_residencia/formato.php?id="+misdatos[0]["ID"];
					abrirPesta(enlace, "Sol. Proyecto");
				} 
				else {alert ("No se ha capturado aún los datos de la Solicitud del Proyecto")}
			}
		});
	
	}



	function OpcionesEvaluaciones(){

		//Verificamos el ciclo escolar 
		elsq="select max(CICLO), count(*) AS HAY from residencias a where a.MATRICULA='"+usuario+"'";
		parametros={sql:elsq,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){	

				if (JSON.parse(data)[0]["HAY"]>0) {
					

					$("#preg").removeClass("glyphicon glyphicon-unchecked blue bigger-260");
					$("#preg").addClass("fa  fa-check green bigger-260");
					elciclo=JSON.parse(data)[0][0];
					var abierto=false;


					elsql="select count(*) as N from ecortescal where  CICLO='"+elciclo+"'"+
					" and ABIERTO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') "+
					" Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
					" AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='RESEVALUA' "+
					" order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 1";
			
				
					parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
					$.ajax({
						type: "POST",
						data:parametros,
						url:  "../base/getdatossqlSeg.php",
						success: function(data){	
							
							if (JSON.parse(data)[0]["N"]>0) {	
								$("#peval").removeClass("glyphicon glyphicon-unchecked blue bigger-260");								
								$("#peval").addClass("fa fa-check green bigger-260");
								
								cargarPestania("RESIDEN_SEG","pesSeg","ADJRESIDENCIA","eadjresidencia",usuario,miciclo);
								cargarPestania("RESIDEN_FIN","panFin","ADJRESIDENCIA","eadjresidencia",usuario,miciclo);
							
								colocarEncuesta();
								
								
								
								} //DEL SI ESTA ABIERO 
								else {		
									$("#peval").removeClass("glyphicon glyphicon-unchecked blue bigger-260");	
									$("#peval").addClass("fa  fa-times red bigger-260");							
								}
							}
						}); //del ajax de busqueda de corte abierto 		
					}
					else {
						$("#preg").removeClass("glyphicon glyphicon-unchecked blue bigger-260");
						$("#preg").addClass("fa  fa-times red bigger-260");
					
					}
			}
		});

			}
	

function verEncuesta(){

  elsql="select a.ID, a.DESCRIP, a.OBJETIVO, ifnull(b.IDRESPONDE,'N') AS IDRESPONDE from encuestas a "+
  "left outer join encrespuestas b on (a.ID=b.IDENC and b.IDRESPONDE='"+usuario+"') where a.ID=2";

   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
   
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){			
				 datos=JSON.parse(data);			
				 if (datos[0]["IDRESPONDE"]=='N'){					
				 	enlace="nucleo/base/aplicarEncuesta.php?ciclo="+elciclo+"&gridpropio=S&id=2&descrip="+datos[0]["DESCRIP"]+"&objetivo="+datos[0]["OBJETIVO"]+"&modulo=enc_aplicar&nombre=Encuesta&fuera=S";			
				 	abrirPesta(enlace,"Encuesta");
				 } else {
					enlace="nucleo/enc_aplicar/comprobante.php?id=2&matricula="+usuario;
					abrirPesta(enlace,"Comprobante");
				 }
			}
		});

   

}


function colocarEncuesta(){
	elsql="select count(*) AS HAY from encrespuestas b where b.IDENC=2 and b.IDRESPONDE='"+usuario+"'";
	 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	 
	  $.ajax({
			  type: "POST",
			  data:parametros,
			  url:  "../base/getdatossqlSeg.php",
			  success: function(data){			
				   datos=JSON.parse(data);			
				   if (datos[0]["HAY"]<=0){					
					$("#panEncuesta").append("<button  onclick=\"verEncuesta();\" class=\"fontRobotoB btn btn-white btn-danger btn-bold bigger-200\">"+
					"     <i class= \"ace-icon fa fa-th-large bigger-200 blue\"></i>"+
					"     <span class=\"text-danger\">Responder Encuesta Egresado</span>"+
					"</button> ");
				   }
				   else {
					$("#panEncuesta").append("<button  onclick=\"comprobante();\" class=\"fontRobotoB btn btn-white btn-info btn-bold bigger-200\">"+
					"     <i class= \"ace-icon fa fa-check bigger-200 blue\"></i>"+
					"     <span class=\"text-success\">Ver Comprobante Encuesta</span>"+
					"</button> ");
				   }
			  }
		  });
}

function comprobante (id){
	enlace="nucleo/enc_aplicar/comprobante.php?id=2&matricula="+usuario;
	abrirPesta(enlace,"Comprobante");
}
