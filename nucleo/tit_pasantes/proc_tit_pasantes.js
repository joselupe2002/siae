var eluser="";
var lainst="";
var elcampus=""


function constnoincov(modulo,usuario,essuper){
	
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        enlace="nucleo/tit_pasantes/consnoinc.php?alumno="+table.rows('.selected').data()[0]["MATRICULA"];
		abrirPesta(enlace, "ConsNoInc");

	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	}


	function solicitud(modulo,usuario,essuper){
		table = $("#G_"+modulo).DataTable();
		if (table.rows('.selected').data().length>0) {
			elsql="SELECT b.TIPO FROM tit_pasantes h, tit_opciones b where h.MATRICULA='"+table.rows('.selected').data()[0]["MATRICULA"]+"' and h.ID_OPCION=b.ID";

			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){	
		
					eltipo=JSON.parse(data)[0][0];
					enlace="";
					if (eltipo=='OBJETIVOS') {	enlace="nucleo/tit_tramite/soltitObj.php?alumno="+table.rows('.selected').data()[0]["MATRICULA"];}
					if (eltipo=='COMPETENCIA') {	enlace="nucleo/tit_tramite/soltitComp.php?alumno="+table.rows('.selected').data()[0]["MATRICULA"];}
					abrirPesta(enlace, "SolicitudTit");
				}
			});		
	
		}
		else {
			alert ("Debe seleccionar un Registro");
			return 0;
	
			}
		}

		
		function solce(modulo,usuario,essuper){
			table = $("#G_"+modulo).DataTable();
			if (table.rows('.selected').data().length>0) {
				enlace="nucleo/tit_tramite/formato.php?alumno="+table.rows('.selected').data()[0]["MATRICULA"];
				abrirPesta(enlace, "SOLCE");
			}
			else {
				alert ("Debe seleccionar un Registro");
				return 0;
				}
			}
	

		function setStatus(id,valor, campo, cargar){			
			$('#modalDocument').modal({show:true, backdrop: 'static'});	 
			if (campo=='REVISADO') { parametros={tabla:"tit_pasantes",campollave:"MATRICULA",bd:"Mysql",valorllave:id,REVISADO: valor};}
			if (campo=='SOLSINODALES') { parametros={tabla:"tit_pasantes",campollave:"MATRICULA",bd:"Mysql",valorllave:id,SOLSINODALES: valor};}
			if (campo=='SINODALASIG') { parametros={tabla:"tit_pasantes",campollave:"MATRICULA",bd:"Mysql",valorllave:id,SINODALASIG: valor};}
			if (campo=='ASIGNOFECHA') { parametros={tabla:"tit_pasantes",campollave:"MATRICULA",bd:"Mysql",valorllave:id,ASIGNOFECHA: valor};}
			if (campo=='TITULADO') { parametros={tabla:"tit_pasantes",campollave:"MATRICULA",bd:"Mysql",valorllave:id,TITULADO: valor};}
			
			   $.ajax({
			   type: "POST",
			   url:"actualiza.php",
			   data: parametros,
			   success: function(data){
				   $('#dlgproceso').modal("hide"); 
				   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
				   if (cargar) {window.parent.document.getElementById('FRtit_pasantes').contentWindow.location.reload();}				   
			   }					     
			   });    	                
		}
		

		function refrescar() {
			window.parent.document.getElementById('FRtit_pasantes').contentWindow.location.reload();
		}
		
		
		function revisado(modulo,usuario,institucion, campus,essuper){
			table = $("#G_"+modulo).DataTable();
				if (table.rows('.selected').data().length>0) {	
						if (table.rows('.selected').data()[0]["REVISADO"]=='N') {
							if (confirm("Desea marcar como revisado el registro: "+table.rows('.selected').data()[0]["MATRICULA"])) {
								setStatus(table.rows('.selected').data()[0]["MATRICULA"],"S","REVISADO",true);
								insertaHistorial(table.rows('.selected').data()[0]["MATRICULA"],'TITULACION','REVISADO','TUS DOCUMENTOS FUERON REVISADOS EN CONTROL ESCOLAR','S',usuario,institucion,campus);
							}
						}
						else {
							if (confirm("El registro: "+table.rows('.selected').data()[0]["MATRICULA"]+" Esta como REVISADO ¿desea marcar como NO REVISADO?")) {
								setStatus(table.rows('.selected').data()[0]["MATRICULA"],"N","REVISADO",true);
								eliminaHistorial(table.rows('.selected').data()[0]["MATRICULA"],'TITULACION','REVISADO');
							}
						} 	
				}
		
				else { alert ("Debe seleccionar un Registro"); return 0; }
		}
		

		function solSinodales(modulo,usuario,institucion, campus,essuper){
			table = $("#G_"+modulo).DataTable();
				if (table.rows('.selected').data().length>0) {	

					if (table.rows('.selected').data()[0]["REVISADO"]=='S') {
								if (table.rows('.selected').data()[0]["SOLSINODALES"]=='N') {
									if (confirm("Desea marcar el registro como SOLICITUD DE SINODALES, se enviará correo al Jefe de División"+table.rows('.selected').data()[0]["MATRICULA"])) {
										setStatus(table.rows('.selected').data()[0]["MATRICULA"],"S","SOLSINODALES",false);
										
										enviarNotificacion(table.rows('.selected').data()[0]["CARRERA"],
														table.rows('.selected').data()[0]["MATRICULA"],
														table.rows('.selected').data()[0]["PASANTE"],
														institucion,campus);
										insertaHistorial(table.rows('.selected').data()[0]["MATRICULA"],'TITULACION','SOLSINODALES','SE SOLICITARON SINODALES A TU JEFE DE DIVISIÓN','S',usuario,institucion,campus);
										mostrarConfirm2("conf","grid_"+modulo,"Información","Se envió Notificación al Jefe de División","Enterado","refrescar();","modal-sm")
										
									}
								}
								else {
									if (confirm("El registro: "+table.rows('.selected').data()[0]["MATRICULA"]+" ya solicito SINODALES ¿desea marcar como NO SOLICITADO SINODALES?")) {
										setStatus(table.rows('.selected').data()[0]["MATRICULA"],"N","SOLSINODALES",true);
										eliminaHistorial(table.rows('.selected').data()[0]["MATRICULA"],'TITULACION','SOLSINODALES');
									}
								} 	
							}
					else { alert ("No puede enviar SOLICITUD DE SINODALES, por que el registro no esta marcado como REVISADO");}
				}		
				else { alert ("Debe seleccionar un Registro"); return 0; }
		}



		function mostrarSinodales(modulo,op) {
			mostrarConfirm2("sinoda","grid_"+modulo,"Información",
			"<div class=\"row\" style=\"text-align:left;\">"+
			"	<div id=\"elpresidente\" class=\"col-sm-6\">"+
			"		<span class=\"label label-danger\">Presidente</span>"+
			"		<select class=\" chosen-select form-control text-success\"  id=\"selPresidente\"> </select>"+
			"   </div>"+
			"	<div id=\"elsecretario\" class=\"col-sm-6\">"+
			"		<span class=\"label label-warning\">Secretario</span>"+
			"		<select class=\" chosen-select form-control text-success\"  id=\"selSecretario\"> </select>"+
			"   </div>"+
			"</div>"+
			"<div class=\"row\" style=\"text-align:left;\">"+
			"	<div id=\"elvocal\" class=\"col-sm-6\">"+
			"		<span class=\"label label-success\">Vocal</span>"+
			"		<select class=\" chosen-select form-control text-success\"  id=\"selVocal\"> </select>"+
			"   </div>"+
			"	<div id=\"elsuplente\" class=\"col-sm-6\">"+
			"		<span class=\"label label-info\">Suplente</span>"+
			"		<select class=\" chosen-select form-control text-success\"  id=\"selSuplente\"> </select>"+
			"   </div>"+
			"</div>"
			,"Guardar y Notificar","guardaSinodales('"+modulo+"');","modal-lg");

			$('.chosen-select').chosen({allow_single_deselect:true}); 
			$(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
			$(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
		   

			actualizaSelectMarcar("selPresidente", "SELECT EMPL_NUMERO, CONCAT(EMPL_NUMERO,' ',EMPL_NOMBRE,' ',EMPL_APEPAT, ' ',EMPL_APEMAT) from pempleados ORDER BY EMPL_NOMBRE, EMPL_APEPAT", "BUSQUEDA","",table.rows('.selected').data()[0]["PRES"]); 
			actualizaSelectMarcar("selSecretario", "SELECT EMPL_NUMERO, CONCAT(EMPL_NUMERO,' ',EMPL_NOMBRE,' ',EMPL_APEPAT, ' ',EMPL_APEMAT) from pempleados ORDER BY EMPL_NOMBRE, EMPL_APEPAT", "BUSQUEDA","",table.rows('.selected').data()[0]["SEC"]); 
			actualizaSelectMarcar("selVocal", "SELECT EMPL_NUMERO, CONCAT(EMPL_NUMERO,' ',EMPL_NOMBRE,' ',EMPL_APEPAT, ' ',EMPL_APEMAT) from pempleados ORDER BY EMPL_NOMBRE, EMPL_APEPAT", "BUSQUEDA","",table.rows('.selected').data()[0]["VOC"]); 
			actualizaSelectMarcar("selSuplente", "SELECT EMPL_NUMERO, CONCAT(EMPL_NUMERO,' ',EMPL_NOMBRE,' ',EMPL_APEPAT, ' ',EMPL_APEMAT) from pempleados ORDER BY EMPL_NOMBRE, EMPL_APEPAT", "BUSQUEDA","",table.rows('.selected').data()[0]["VOC_S"]); 

		}

		function asigSinodales(modulo,usuario,institucion, campus,essuper){

			eluser=usuario; lainst=institucion; elcampus=campus;
			table = $("#G_"+modulo).DataTable();
				if (table.rows('.selected').data().length>0) {	

					if (table.rows('.selected').data()[0]["SOLSINODALES"]=='S') {
								if (table.rows('.selected').data()[0]["SINODALASIG"]=='N') {
									mostrarSinodales(modulo,'S');									
								}
								else {
									mostrarSinodales(modulo,'N');
								} 	
							}
					else { alert ("No puede enviar ASIGNAR SINODALES a este PASANTE, por que aún no se ha slolicitado por la COORDINACIÓN DE TITULACIÓN");}
				}		
				else { alert ("Debe seleccionar un Registro"); return 0; }
		}
		

		function guardaSinodales(modulo){
			parametros={tabla:"tit_pasantes",campollave:"MATRICULA",bd:"Mysql",
						valorllave:table.rows('.selected').data()[0]["MATRICULA"],
						PRESIDENTE:$("#selPresidente").val(),
						SECRETARIO:$("#selSecretario").val(),
						VOCAL:$("#selVocal").val(),
						VOCALSUPLENTE:$("#selSuplente").val()
					};
			$.ajax({
				type: "POST",
				url:"actualiza.php",
				data: parametros,
				success: function(data){				
					setStatus(table.rows('.selected').data()[0]["MATRICULA"],"S","SINODALASIG",false);
					enviarNotificacionTitula(table.rows('.selected').data()[0]["MATRICULA"],
									 table.rows('.selected').data()[0]["PASANTE"],
									 lainst,elcampus);
					$("#sinoda").modal("hide");
					eliminaHistorial(table.rows('.selected').data()[0]["MATRICULA"],'TITULACION','SINODALASIG');
					insertaHistorial(table.rows('.selected').data()[0]["MATRICULA"],'TITULACION','SINODALASIG','SE ASIGNARON SINODALES PARA TU PROTOCOLO DE TITULACIÓN','S',eluser,lainst,elcampus);
					mostrarConfirm2("conf","grid_"+modulo,"Información","Se envió Notificación a la Coordinación de Titulación","Enterado","refrescar();","modal-sm")
				}					     
			});    
		}



		function mostrarFecha(modulo,op) {
			mostrarConfirm2("fechahora","grid_"+modulo,"Información",
			"<div class=\"row\" style=\"text-align:left;\">"+
			"	<div id=\"lafecha\" class=\"col-sm-6\">"+
			"		<span class=\"label label-danger\">Fecha de Protócolo</span>"+
			"		<div class=\"input-group\">"+
			"			<input  class=\"form-control date-picker\" id=\"fecha\" "+
			" 					type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" value=\""+table.rows('.selected').data()[0]["FECHA_TIT"]+"\"/> "+
			"			<span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span>"+
			"		</div>"+
			"   </div>"+
			"	<div id=\"lahora\" class=\"col-sm-6\">"+
			"		<span class=\"label label-warning\">Hora</span>"+			
			"		<input  id=\"hora\" autocomplete=\"off\" class= \"small form-control input-mask-hora\" value=\""+table.rows('.selected').data()[0]["HORA_TIT"]+"\"></input>"+
			"   </div>"+
			"	<div id=\"lahora\" class=\"col-sm-12\">"+
			"		<span class=\"label label-warning\">Lugar del Protócolo</span>"+			
			"		<input  id=\"sala\" autocomplete=\"off\" class= \"small form-control\" value=\""+table.rows('.selected').data()[0]["SALA_TIT"]+"\"></input>"+
			"   </div>"+
			"</div>"
			,"Guardar y Notificar","guardarFecha('"+modulo+"');","modal-lg");

			$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
			$(".input-mask-hora").mask("99:99");
		}


		function guardarFecha(modulo){			
			table = $("#G_"+modulo).DataTable();
			parametros={tabla:"tit_pasantes",campollave:"MATRICULA",bd:"Mysql",
						valorllave:table.rows('.selected').data()[0]["MATRICULA"],
						FECHA_TIT:$("#fecha").val(),
						HORA_TIT:$("#hora").val(),					
						SALA_TIT:$("#sala").val()
					};
			$.ajax({
				type: "POST",
				url:"actualiza.php",
				data: parametros,
				success: function(data){				
					setStatus(table.rows('.selected').data()[0]["MATRICULA"],"S","ASIGNOFECHA",false);

					enviarNotificacionSinodal(table.rows('.selected').data()[0]["PRES"],'PRESIDENTE',modulo,table.rows('.selected').data()[0]["MATRICULA"],table.rows('.selected').data()[0]["PASANTE"],lainst,elcampus);
					enviarNotificacionSinodal(table.rows('.selected').data()[0]["SEC"],'SECRETARIO',modulo,table.rows('.selected').data()[0]["MATRICULA"],table.rows('.selected').data()[0]["PASANTE"],lainst,elcampus);
					enviarNotificacionSinodal(table.rows('.selected').data()[0]["VOC"],'VOCAL',modulo,table.rows('.selected').data()[0]["MATRICULA"],table.rows('.selected').data()[0]["PASANTE"],lainst,elcampus);
					enviarNotificacionSinodal(table.rows('.selected').data()[0]["VOC_S"],'SUPLENTE',modulo,table.rows('.selected').data()[0]["MATRICULA"],table.rows('.selected').data()[0]["PASANTE"],lainst,elcampus);
					enviarNotificacionAlumno(modulo,table.rows('.selected').data()[0]["MATRICULA"],table.rows('.selected').data()[0]["PASANTE"],lainst,elcampus);

					$("#fechahora").modal("hide");
					eliminaHistorial(table.rows('.selected').data()[0]["MATRICULA"],'TITULACION','ASIGNOFECHA');
					insertaHistorial(table.rows('.selected').data()[0]["MATRICULA"],'TITULACION','ASIGNOFECHA','SE ASIGNO FECHA Y HORA DE TITULACIÓN','S',eluser,lainst,elcampus);
					mostrarConfirm2("avisoSinodalP","grid_"+modulo,"Información","Se estan enviando notificaciones a los SINODALES y el ALUMNO espere por favor"+
					"<div class=\"row\" class=\"fontRoboto text-success\" style=\"text-align:left; font-size:8px;\"><div class=\"col-sm-12\" id=\"avisoSinodal\"></div></div>","Enterado","refrescar();","modal-sm")
				}					     
			});    
		}


		function asigFecha(modulo,usuario,institucion, campus,essuper){

			eluser=usuario; lainst=institucion; elcampus=campus;
			table = $("#G_"+modulo).DataTable();
				if (table.rows('.selected').data().length>0) {	

					if (table.rows('.selected').data()[0]["SINODALASIG"]=='S') {
								if (table.rows('.selected').data()[0]["SINODALASIG"]=='N') {
									mostrarFecha(modulo,'S');									
								}
								else {
									mostrarFecha(modulo,'N');
								} 	
							}
					else { alert ("No puede ASIGNAR FECHA a este PASANTE, por que no se ha ASIGNADO SINODAL por JEFE DE DIVISIÓN");}
				}		
				else { alert ("Debe seleccionar un Registro"); return 0; }
		}
	



		function enviarNotificacion(carrera, matricula, nombre,institucion, campus){		
			sqlAsp=	"SELECT EMPL_NUMERO AS PROF,CONCAT(EMPL_ABREVIA,' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS JEFED, "+
			" EMPL_CORREOINS AS CORREO FROM fures, pempleados where CARRERA='"+carrera+"'"+
			" and URES_JEFE=EMPL_NUMERO";		
			parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
						  losdatos=JSON.parse(data); 
						  	 setNotificacion(losdatos[0]["PROF"],"Sol. Sinodales."+matricula+" "+nombre,"","",institucion,campus);         
						     correoalProf(losdatos[0]["PROF"], "<html>Por medio de la presente se le solicitá que asigne en el SIGEA sinodales para: <br> "+
							 "No. Control: <span style=\"color:green\"><b>"+matricula+"</b></span><br>"+
							 "Nombre: <span style=\"color:green\"><b>"+nombre+"</b></span>"+
							 "<br> Sin más por el momento agradecemos su atenci&oacute;n","ITSM: SOLICITUD ASIGNACION SINODALES "+matricula+" "+nombre);
						}
					});			
		}


		function enviarNotificacionTitula( matricula, nombre,institucion, campus){		
			sqlAsp=	"SELECT EMPL_NUMERO AS PROF,CONCAT(EMPL_ABREVIA,' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS JEFED, "+
			" EMPL_CORREOINS AS CORREO FROM fures, pempleados where URES_URES='701' AND URES_JEFE=EMPL_NUMERO";		
			parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
					     
						  losdatos=JSON.parse(data); 
						  	 setNotificacion(losdatos[0]["PROF"],"Sinodales Asignados: "+matricula+" "+nombre,"","",institucion,campus);         
						     correoalProf(losdatos[0]["PROF"], "<html>Por medio de la presente se le NOTIFICA que fueron ASIGNADOS en el SIGEA SINODALES para: <br> "+
							 "No. Control: <span style=\"color:green\"><b>"+matricula+"</b></span><br>"+
							 "Nombre: <span style=\"color:green\"><b>"+nombre+"</b></span><br>"+
							 "PRESIDENTE: <span style=\"color:blue\"><b>"+$("#selPresidente option:selected").text()+"</b></span><br>"+
							 "SECRETARIO: <span style=\"color:blue\"><b>"+$("#selSecretario option:selected").text()+"</b></span><br>"+
							 "VOCAL: <span style=\"color:blue\"><b>"+$("#selVocal option:selected").text()+"</b></span><br>"+
							 "SUPLENTE: <span style=\"color:blue\"><b>"+$("#selSuplente option:selected").text()+"</b></span><br>"+							 
							 "<br> Sin más por el momento agradecemos su atenci&oacute;n","ITSM: NOTIFICACION ASIGNACION SINODALES "+matricula+" "+nombre);
						}
					});			
		}


		function enviarNotificacionSinodal(empl, tipo, modulo, matricula, nombre,institucion, campus){	
			table = $("#G_"+modulo).DataTable();	
			sqlAsp=	"SELECT EMPL_NUMERO AS PROF,CONCAT(EMPL_ABREVIA,' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS SINODAL, "+
			" EMPL_CORREOINS AS CORREO FROM pempleados where EMPL_NUMERO='"+empl+"'";
			parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  				
						  losdatos=JSON.parse(data); 
						  	 setNotificacion(losdatos[0]["PROF"],"Asignación como: "+tipo+"  DEL ALUMNO: "+matricula+" "+nombre,"","",institucion,campus);         
							 correoalProfNoti("avisoSinodal","CORREO "+tipo,losdatos[0]["PROF"], "<html>"+
							 "<span style=\"color:blue\"><b>"+losdatos[0]["SINODAL"]+"</b></span><br>"+
							 " Por este conducto, tengo a bien comunicarle la asignación de sinodal en calidad de: <br> "+
							 "<span style=\"color:green\"><b>"+tipo+"</b></span><br>"+
							 "Al examen profesional de: <br>"+
							 "No. Control: <span style=\"color:green\"><b>"+matricula+"</b></span><br>"+
							 "Nombre: <span style=\"color:green\"><b>"+nombre+"</b></span><br>"+
							 "Carrera: <span style=\"color:green\"><b>"+table.rows('.selected').data()[0]["CARRERAD"]+"</b></span><br>"+
							 "Opci&oacute;n: <span style=\"color:green\"><b>"+table.rows('.selected').data()[0]["OPCIOND"]+"</b></span><br>"+
							 "Trabajo: <span style=\"color:green\"><b>"+table.rows('.selected').data()[0]["TEMA"]+"</b></span><br>"+
							 "<BR>Fecha: <span style=\"color:green\"><b>"+$("#fecha").val()+"</b></span><br>"+
							 "<BR>Hora: <span style=\"color:green\"><b>"+$("#hora").val()+"</b></span><br>"+
							 "<BR>Lugar: <span style=\"color:green\"><b>"+$("#sala").val()+"</b></span><br>"+
							 "<br> Agradeciendo de antemano su puntual asistencia, quedo de usted.","ITSM: ASIGNACION COMO "+tipo+" ALUMNO:"+matricula+" "+nombre);
						}
					});			
		}

		function enviarNotificacionAlumno( modulo, matricula, nombre,institucion, campus){	
			table = $("#G_"+modulo).DataTable();				
			parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  				
						  losdatos=JSON.parse(data); 
						  	 setNotificacion(matricula,"Titulación Fecha:"+$("#fecha").val()+" Hora:"+$("#hora").val()+" Lugar:"+$("#sala").val(),"","",institucion,campus);         
							 correoalAlumNoti("avisoSinodal","CORREO ALUMNO:",matricula,"<html>"+
							 "<span style=\"color:blue\"><b>"+nombre+"</b></span><br>"+
							 " Por este conducto, tengo a bien comunicarle la asignación de sinodales y Fecha para su Protócolo de Titulación: <br> "+						
							 "Carrera: <span style=\"color:green\"><b>"+table.rows('.selected').data()[0]["CARRERAD"]+"</b></span><br>"+
							 "Opci&oacute;n: <span style=\"color:green\"><b>"+table.rows('.selected').data()[0]["OPCIOND"]+"</b></span><br>"+
							 "Trabajo: <span style=\"color:green\"><b>"+table.rows('.selected').data()[0]["TEMA"]+"</b></span><br>"+
							 "<BR>Presidente: <span style=\"color:green\"><b>"+table.rows('.selected').data()[0]["PRESIDENTED"]+"</b></span><br>"+
							 "Secretario: <span style=\"color:green\"><b>"+table.rows('.selected').data()[0]["SECRETARIOD"]+"</b></span><br>"+
							 "Vocal: <span style=\"color:green\"><b>"+table.rows('.selected').data()[0]["VOCALD"]+"</b></span><br>"+
							 "<BR>Fecha: <span style=\"color:green\"><b>"+$("#fecha").val()+"</b></span><br>"+
							 "Hora: <span style=\"color:green\"><b>"+$("#hora").val()+"</b></span><br>"+
							 "Lugar: <span style=\"color:green\"><b>"+$("#sala").val()+"</b></span><br>"+
							 "<br> Agradeciendo de antemano su puntual asistencia, quedo de usted.","ITSM:FECHA Y HORA TITULACION - "+matricula+" "+nombre);
						}
					});			
		}


		/*=====================================DOCUMENTACION D ETUTLACION ================================0*/

		function oficioSinodal(modulo,usuario,institucion, campus,essuper) {
			table = $("#G_"+modulo).DataTable();
			if (table.rows('.selected').data().length>0) {
				enlace="nucleo/tit_pasantes/oficioSinodal.php?alumno="+table.rows('.selected').data()[0]["MATRICULA"];
				abrirPesta(enlace, "Sinodales");
		
			}
			else {
				alert ("Debe seleccionar un Registro");
				return 0;
		
				}
		}


		
		function avisoFecha(modulo,usuario,institucion, campus,essuper) {
			table = $("#G_"+modulo).DataTable();
			if (table.rows('.selected').data().length>0) {
				enlace="nucleo/tit_pasantes/avisofecha.php?alumno="+table.rows('.selected').data()[0]["MATRICULA"];
				abrirPesta(enlace, "Aviso");
		
			}
			else {
				alert ("Debe seleccionar un Registro");
				return 0;
		
				}
		}

		function docProtocolo(modulo,usuario,institucion, campus,essuper) {
			table = $("#G_"+modulo).DataTable();
			if (table.rows('.selected').data().length>0) {
				enlace="nucleo/tit_pasantes/docprotocolo.php?alumno="+table.rows('.selected').data()[0]["MATRICULA"];
				abrirPesta(enlace, "Protocolo");
		
			}
			else {
				alert ("Debe seleccionar un Registro");
				return 0;
		
				}
		}
		

/*===================================================*/		

