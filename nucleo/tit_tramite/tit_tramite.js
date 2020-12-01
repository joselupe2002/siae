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


			elsqlc='SELECT getciclo() from dual';
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

						if ((porcReal>=100)) {
										
							$("#servicio").empty();
							$("#servicio").append("<div class=\"row\" style=\"text-align:left;\">"+
							"    <div class=\"col-sm-12\"> "+
							"     <div id=\"panel1\" class=\"col-sm-12\" ></div>"+										
							"    </div>"+
							"</div>");

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
	var abierto=false;
	elsql="select count(*) as N from tit_pasantes where MATRICULA='"+usuario+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){	
			if (JSON.parse(data)[0]["N"]>0) {	etbtn="Ver Oficio Tramite"; evbtn="reporteTramite();"; msj="Ya iniciaste trámite de titulación"; tipo="success";} 
			else { etbtn="Iniciar Tramite";  evbtn="iniciarTramite();"; msj="No has iniciado trámite de titulación"; tipo="warning"; }
			
			$("#servicio").html();	

			$("#panel1").append("<div class=\"alert alert-"+tipo+"\" style=\"width:100%;\"> "+msj+
			"<div style=\"text-align:center;\"><button  onclick=\""+evbtn+"\" class=\"btn  btn-white btn-danger\">"+
			"     <i class=\"ace-icon blue fa fa-gears bigger-130\"></i><span>"+etbtn+"</span>"+
			"</button></div></div>");	
			
			
		}
		}); //del ajax de busqueda de corte abierto 
	}
	

	function  reporteTramite(){
		enlace="nucleo/tit_tramite/formato.php?alumno="+usuario;
		abrirPesta(enlace, "Solicitud");
			
	}


	function  iniciarTramite(){

				mostrarConfirm2("infoError","grid_tit_tramite","Iniciar Trámite de Titulación",
				"<div class=\"ventanaSC\" style=\"text-align:justify; width:99%; height:250px; overflow-y:auto; overflow-x:hidden;\">"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-12\">"+
							"<label class=\"fontRobotoB\">Empresa donde labora:</label><input class=\"form-control captProy\" id=\"trabajo\"></input>"+
						"</div>"+						
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Dirección de la empresa</label><input class=\"form-control captProy\"  id=\"dirtrabajo\"></input>"+
						"</div>"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Teléfono de la empresa</label><input class=\"form-control captProy\" id=\"teltrabajo\"></input>"+
						"</div>"+		
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-12\">"+
							"<label class=\"fontRobotoB\">Modalidad de Titulación</label><select class=\"form-control captProy\"  id=\"modalidad\"></select>"+
						"</div>"+					
					"</div>"+	
					"<div class=\"row\">"+
						"<div class=\"col-sm-12\">"+
						"<label class=\"fontRobotoB\">Nombre del Tema (Proyecto/tesis/Residencia/etc)</label><input class=\"form-control captProy\" id=\"tema\"></input>"+
						"</div>"+					
					"</div>"+				

				"</div>"
				,"Grabar Datos","grabarPasante();","modal-lg");

				actualizaSelectMarcar("modalidad", "SELECT ID, OPCION FROM tit_opciones order by OPCION", "","",""); 
			
				$('.captProy').keypress(function(){
					$(this).css("border-color","black");				
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
					CICLOREG:miciclo,
					ID_OPCION:$("#modalidad").val(),
					TEMA:$("#tema").val(),
					FECHA_REG:fecha,
					FECHA_SE:fecha,
					FECHAUS:fechaus,
					TELTRABAJO:$("#teltrabajo").val(),
					TRABAJO:$("#trabajo").val(),
					DIRTRABAJO:$("#dirtrabajo").val(),
					USUARIO:usuario,				
					_INSTITUCION: lainstitucion, 
					_CAMPUS: elcampus}						
					$.ajax({
							type: "POST",
							url:"../base/inserta.php",
							data: parametros,
							success: function(data){
								 reporteTramite(); 
								 cargarAvance();
								 ocultarEspera("esperaInf");  
								 ocultarEspera("infoError"); 								   						
								}
							});			
		 }
		 else {alert ("No ha capturado toda la información obligatoria");}
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
	$("#lapropuesta").append("<br><div style=\"text-align:center;\"><button  onclick=\"enviarPropuesta();\" class=\"btn  btn-bold btn-danger\" value=\"Agregar\">"+
	                         "     <i class=\"ace-icon white fa fa-save bigger-200\"></i><span class=\"btn-lg\">Enviar propuesta</span>"+
	                         "</button></div>");								

	//Para los componentes de fecha 
    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
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
								$("#servicio").html("<div class=\"alert alert-warning\" style=\"width:100%;\">"+ 									        
								"    Tu Solicitud ya fue enviada"+
								"</div>");	
								correoalJefe(usuario, "<html>El alumno <span style=\"color:green\"><b>"+usuario+" "+nombreuser+
								"</b></span> ha capturado los datos de Carta de Presentaci&oacute;n para Residencia Profesional, "+
								"Favor de Revisarlo para proceder a su autorizaci&oacute;n <BR>","ITSM: CAPTURA DE DATOS DE PRESENTACION DE "+usuario+" "+nombreuser);			

								setNotificacionalJefe(usuario,"Sol. Carta Presentación RP."+usuario+" "+nombreuser,"nucleo/respropuestas/grid.php?modulo=respropuestas","P",lainstitucion,elcampus);
								}
							});
						}
		else {alert ("Todos los datos son necesarios, por favor llene todos los campos");}
	
	}









	function abrirCapturaProyecto (){


		elsql="SELECT IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_CARTAPRES'),'') AS RUTAPRES, "+
			  " IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SOLANTEP'),'') AS RUTASOLANTEP, "+
			  " IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_ANTEP'),'') AS RUTAANTEP, "+
			  " IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_LIBSER'),'') AS RUTALIBSER, "+
			  " IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_IMSS'),'') AS RUTAIMSS, "+
			  " IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_CARDEX'),'') AS RUTACARDEX, "+
			  "       IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_CARTAACEP'),'') AS RUTAACEP FROM DUAL"; 

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){	

				$("#documentos2").append("<div class=\"row\"><div id=\"cartaPres\" class=\"col-sm-6\"></div>"+
															"<div id=\"cartaAcep\" class=\"col-sm-6\"></div>"+
										"</div>"+
										"<div class=\"row\"><div id=\"Libser\" class=\"col-sm-6\"></div>"+
															"<div id=\"Imss\" class=\"col-sm-6\"></div>"+
										"</div>"+
										"<div class=\"row\"><div id=\"Cardex\" class=\"col-sm-6\"></div>"+
															"<div id=\"Otro\" class=\"col-sm-6\"></div>"+
										"</div>"+
										"<div class=\"row\"><div id=\"solAntep\" class=\"col-sm-6\"></div>"+
															"<div id=\"Antep\" class=\"col-sm-6\"></div>"+
										"</div>");
				activaEliminar="";
				if (JSON.parse(data)[0]["RUTAPRES"]!='') {	activaEliminar='S';}					
				dameSubirArchivoDrive("cartaPres","Carta Presenta. Sellada","cartapres",'ADJRESIDENCIA','pdf',
				'ID',usuario,'CARTA DE PRESENTACIÓN','eadjresidencia','alta',usuario+"_"+miciclo+"_CARTAPRES",JSON.parse(data)[0]["RUTAPRES"],activaEliminar);
				
				activaEliminar="";
				if (JSON.parse(data)[0]["RUTAACEP"]!='') {	activaEliminar='S';}					
				dameSubirArchivoDrive("cartaAcep","Carta de Aceptación","cartaacep",'ADJRESIDENCIA','pdf',
				'ID',usuario,'CARTA DE ACEPTACIÓN','eadjresidencia','alta',usuario+"_"+miciclo+"_CARTAACEP",JSON.parse(data)[0]["RUTAACEP"],activaEliminar);
				

				activaEliminar="";
				if (JSON.parse(data)[0]["RUTASOLANTEP"]!='') {	activaEliminar='S';}					
				dameSubirArchivoDrive("solAntep","Sol. Anteproyecto Sellada","solantep",'ADJRESIDENCIA','pdf',
				'ID',usuario,'SOLICITUD DE ANTEPROYECTO FIRMADA Y SELLADA','eadjresidencia','alta',usuario+"_"+miciclo+"_SOLANTEP",JSON.parse(data)[0]["RUTASOLANTEP"],activaEliminar);
				

				activaEliminar="";
				if (JSON.parse(data)[0]["RUTAANTEP"]!='') {	activaEliminar='S';}					
				dameSubirArchivoDrive("Antep","Anteprotecto Autorizado","antep",'ADJRESIDENCIA','pdf',
				'ID',usuario,'ANTEPROYECTO AUTORIZADO','eadjresidencia','alta',usuario+"_"+miciclo+"_ANTEP",JSON.parse(data)[0]["RUTAANTEP"],activaEliminar);
				
				activaEliminar="";
				if (JSON.parse(data)[0]["RUTALIBSER"]!='') {	activaEliminar='S';}					
				dameSubirArchivoDrive("Libser","Liberación Servicio Social","libser",'ADJRESIDENCIA','pdf',
				'ID',usuario,'LIBERACIÓN DE SERVICIO SOCIAL','eadjresidencia','alta',usuario+"_"+miciclo+"_LIBSER",JSON.parse(data)[0]["RUTALIBSER"],activaEliminar);
				
				activaEliminar="";
				if (JSON.parse(data)[0]["RUTAIMSS"]!='') {	activaEliminar='S';}					
				dameSubirArchivoDrive("Imss","Carta Vigencia IMSS","imss",'ADJRESIDENCIA','pdf',
				'ID',usuario,'ANTEPROYECTO AUTORIZADO','eadjresidencia','alta',usuario+"_"+miciclo+"_IMSS",JSON.parse(data)[0]["RUTAIMSS"],activaEliminar);
				
				activaEliminar="";
				if (JSON.parse(data)[0]["RUTACARDEX"]!='') {	activaEliminar='S';}					
				dameSubirArchivoDrive("Cardex","Cardex de estudios","cardex",'ADJRESIDENCIA','pdf',
				'ID',usuario,'CARDEX DE ESTUDIOS','eadjresidencia','alta',usuario+"_"+miciclo+"_CARDEX",JSON.parse(data)[0]["RUTACARDEX"],activaEliminar);
				
				
			}
		});

	

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
					$("#documentos2").append("<hr><div style=\"text-align:center;\">"+
							"<button  onclick=\"capturaProyecto();\" class=\"btn btn-white btn-info btn-bold\">"+
							"     <i class=\"ace-icon green glyphicon glyphicon-book\"></i>1. Capturar Sol. Proyecto"+
							"</button> &nbsp;  &nbsp; "+
							"<button  onclick=\"verProyecto();\" class=\"btn btn-white btn-success btn-bold\">"+
							"     <i class=\"ace-icon pink glyphicon glyphicon-print\"></i>2. Imprimir Sol. Proyecto"+
							"</button>"+
					"</div>");

				}
				else {
					$("#pcapt").removeClass("glyphicon glyphicon-unchecked blue bigger-260");
					$("#pcapt").addClass("fa  fa-times red bigger-260");
					$("#documentos2").append("<hr>"+
							"<button  onclick=\"verProyecto();\" class=\"btn btn-white btn-success btn-bold\">"+
							"     <i class=\"ace-icon pink glyphicon glyphicon-print\"></i>2. Imprimir Sol. Proyecto"+
							"</button>"+
					"</div>");
				}
			}
		});
	

		

	}



	function capturaProyecto(){


		
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
								// Abrimos las opciones para subir documentacion de residencia 	
								elsql="SELECT IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+elciclo+"_EVAL1'),'') AS EVAL1, "+
										"IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+elciclo+"_EVAL2'),'') AS EVAL2,"+
										"IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+elciclo+"_EVALF'),'') AS EVALF,"+
										"IFNULL((select RUTA from eadjresidencia where  AUX='"+usuario+"_"+elciclo+"_REPTEC'),'') AS REPTEC FROM DUAL"; 
			
								parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
								$.ajax({
									type: "POST",
									data:parametros,
									url:  "../base/getdatossqlSeg.php",
									success: function(data){	
			
										$("#documentos3").append("<hr><div class=\"row\"><div id=\"EVAL1\" class=\"col-sm-6\"></div><div id=\"EVAL2\" class=\"col-sm-6\"></div></div>"+
										"<div class=\"row\"><div id=\"EVALF\" class=\"col-sm-6\"></div><div id=\"REPTEC\" class=\"col-sm-6\"></div></div>");
						
										activaEliminar="";
										if (JSON.parse(data)[0]["EVAL1"]!='') {	activaEliminar='S';}					
										dameSubirArchivoDrive("EVAL1","1ra Evaluación","eval1",'ADJRESIDENCIA','pdf',
										'ID',usuario,'PRIMERA EVALUACIÓN','eadjresidencia','alta',usuario+"_"+elciclo+"_EVAL1",JSON.parse(data)[0]["EVAL1"],activaEliminar);
										
										activaEliminar="";
										if (JSON.parse(data)[0]["EVAL2"]!='') {	activaEliminar='S';}					
										dameSubirArchivoDrive("EVAL2","Segunda Evaluación","eval2",'ADJRESIDENCIA','pdf',
										'ID',usuario,'SEGUNDA EVALUACION','eadjresidencia','alta',usuario+"_"+elciclo+"_EVAL2",JSON.parse(data)[0]["EVAL2"],activaEliminar);
										
										activaEliminar="";
										if (JSON.parse(data)[0]["EVALF"]!='') {	activaEliminar='S';}					
										dameSubirArchivoDrive("EVALF","Evaluación Final","evalf",'ADJRESIDENCIA','pdf',
										'ID',usuario,'EVALUACIÓN FINAL','eadjresidencia','alta',usuario+"_"+elciclo+"_EVALF",JSON.parse(data)[0]["EVALF"],activaEliminar);							
			
										activaEliminar="";
										if (JSON.parse(data)[0]["REPTEC"]!='') {	activaEliminar='S';}					
										dameSubirArchivoDrive("REPTEC","Reporte Técnico","reptec",'ADJRESIDENCIA','pdf',
										'ID',usuario,'REPORTE TÉCNICO','eadjresidencia','alta',usuario+"_"+elciclo+"_REPTEC",JSON.parse(data)[0]["REPTEC"],activaEliminar);							
										
									}
								});		
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
	