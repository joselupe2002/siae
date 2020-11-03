

    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#lostramites").append("<span class=\"label label-warning\">Trámites</span>");
		sql="SELECT ID, TRAMITE FROM ci_tramites WHERE VISIBLE='S' order by TRAMITE";
		addSELECT("selTramites","lostramites","PROPIO", sql, "","BUSQUEDA"); 		
	});
	
	
		 
	function change_SELECT(elemento) {
	
    }

/*===========================================================POR MATERIAS ==============================================*/
    function verCitas(){

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	var calendar = $('#calendar').fullCalendar({	
		buttonHtml: {
			prev: '<i class="ace-icon fa fa-chevron-left"></i>',
			next: '<i class="ace-icon fa fa-chevron-right"></i>'
		},
	
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
				
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar !!!
		drop: function(date) { // this function is called when something is dropped
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			var $extraEventClass = $(this).attr('data-class');
		
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = false;
			if($extraEventClass) copiedEventObject['className'] = [$extraEventClass];
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
			
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
			
		}
		,
		selectable: true,
		selectHelper: true,
		select: function(start, end, allDay) {
						
		}
		,
		eventClick: function(calEvent, jsEvent, view) {
			cad=calEvent.title.split("|");
			if (cad[1]=='') {agendarCita(calEvent,jsEvent,view);}
			else {opcionesCita(calEvent,jsEvent,view);}
		}
		
	});

	cargamosCitas();

} 


function cargamosCitas() {

	$('#calendar').fullCalendar('refresh');
	$('#calendar').fullCalendar('removeEvents');

	elsql="SELECT ID, a.FECHA AS FECHA,a.MINUTOS, a.SOLICITANTE, IFNULL(NOMBRE,'') AS NOMBRE, a.HORA, a.HORA2, count(*) AS hay FROM  "+
	"vci_citas a where TRAMITE='"+$("#selTramites").val()+"' and (SOLICITANTE='' or SOLICITANTE='"+usuario+"')"+
	" and  STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y')<=STR_TO_DATE(FECHA,'%d/%m/%Y') "+
	" group by a.ID,a.FECHA,a.HORA";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_pa_citas","Cargando Datos...");
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
				mostrarEspera("esperahor","grid_ci_vercitas","Cargando Datos...");
				jQuery.each(JSON.parse(data), function(clave, valor) {
					
					ini=fechaJava(valor.FECHA)+" "+valor.HORA;
					fin=fechaJava(valor.FECHA)+" "+convierteHHHMM(parseInt(valor.HORA2)+parseInt(valor.MINUTOS));
					var elcolor="#500A06";
					if (valor.SOLICITANTE=='') {elcolor="#05054A";}
					var my_events = {
						events: [
						{
							id:valor.ID,
							title: valor.MINUTOS+" MIN.|"+valor.SOLICITANTE,
							start: ini,
							end: fin,
							color: elcolor
						},
						]};
					
						//console.log(valor.ID+':'+valor.SOLICITANTE+" "+valor.NOMBRE+"\n");
					//	$('#calendar').fullCalendar('removeEventSource', my_events);
						$('#calendar').fullCalendar('addEventSource', my_events);
				
					});
				ocultarEspera("esperahor");
	   }
	});
}



function agendarCita(calEvent,jsEvent,view){
	elid=calEvent.id;
	elsql="SELECT * from vci_citas where ID='"+elid+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_pa_citas","Cargando Datos...");
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
			losdatos=JSON.parse(data);
		 	elas=losdatos[0]["PREGADD"];
			if (losdatos[0]["PREGADD"]=="") {elas="Asunto a Tratar:"}
			termina=convierteHHHMM(parseInt(losdatos[0]["HORA2"])+parseInt(losdatos[0]["MINUTOS"]));
			var modal = 
			'<div class="modal fade">\
			<div class="modal-dialog">\
			<div class="modal-content">\
				<div class="modal-body">\
				<button type="button" class="close" data-dismiss="modal" style="margin-top:-10px;">&times;</button>\
				<form class="no-margin">\
				<div class=\"row\">\
							<div class="col-sm-12">\
								<h4  class="fontRobotoB">Cita: <span class="text-success">'+losdatos[0]["FECHA"]+'</span> DE: <span class="text-primary">'+losdatos[0]["HORA"]+'</span> A: <span class="text-danger">'+termina+'</span> </h4>\
								<br><label  class="fontRobotoB">'+elas+'</label>\
								<textarea  id="obs"   style="width:100%; height:50px;"></textarea>\
							</div>\
						</div>\
				</form>\
				</div>\
				<div class="modal-footer">\
					<button type="button" class="btn btn-sm btn-primary" data-action="agendar"><i class="ace-icon fa fa-trash-o"></i> Agendar Cita</button>\
					<button type="button" class="btn btn-sm" data-dismiss="modal"><i class="ace-icon fa fa-times"></i> Cancelar</button>\
				</div>\
			</div>\
			</div>\
			</div>';

			ocultarEspera("esperahor");
			var modal = $(modal).appendTo('body');
			modal.find('form').on('submit', function(ev){
				ev.preventDefault();
				modal.modal("hide");
			});
			modal.find('button[data-action=agendar]').on('click', function() {
				guardarCita(elid);			
				modal.modal("hide");
			});
			
			modal.modal('show').on('hidden', function(){
				modal.remove();
			});
		}
	});
}

function guardarCita(elid){

	elsql="SELECT a.*, count(*) AS hay from vci_citas  a where ID='"+elid+"' and SOLICITANTE=''";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_pa_citas","Cargando Datos...");
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){ 
			
			if (JSON.parse(data)[0]["hay"]>0) { 
				lafecha=dameFecha("FECHAHORA");
				parametros={
					tabla:"ci_citas",
					campollave:"ID",
					bd:"Mysql",
					valorllave:elid,
					SOLICITANTE:usuario,
					OBS:$("#obs").val(),
					FECAGENDA:lafecha
				};
				$.ajax({
					type: "POST",
					url:"../base/actualiza.php",
					data: parametros,
					success: function(data){	
					
						elsql="SELECT a.*, count(*) AS hay from vci_citas  a where ID='"+elid+"'";
						parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
						mostrarEspera("esperahor","grid_pa_citas","Cargando Datos...");
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){ 
					
								dataCita=JSON.parse(data);
								mensaje=" <span style=\"color:blue\"><br>"+
								"<b> ID CITA: </b>"+dataCita[0]["ID"]+"<br>"+
								"<b> No. Control: </b>"+dataCita[0]["SOLICITANTE"]+"<br>"+
								"<b> Nombre: </b>"+dataCita[0]["NOMBRE"]+"<br>"+
								"<b> Tramite: </b>"+dataCita[0]["TRAMITED"]+"<br>"+
								"<b> Fecha: </b>"+dataCita[0]["FECHA"]+"<br>"+
								"<b> Hora: </b>"+dataCita[0]["HORA"]+"<br>"+
								"<b> Tiempo de atenci&oacute;n: </b>"+dataCita[0]["MINUTOS"]+" Minutos"+"<br>"+
								"<b> Lugar: </b>"+dataCita[0]["LUGAR"]+"<br>"+
								"<b> Asunto: </b>"+dataCita[0]["OBS"]+"<br>"+
								"<b> Requisitos: </b><br>"+dataCita[0]["REQUISITOS"]+"<br>"+									
								"Favor de llegar a tiempo a su cita <BR>";

								correoPersona(usuario,"<html><span style=\"color:green;\"><b>Te confirmamos tu cita: </b></span>"+mensaje,"ITSM: CONFIRMACIÓN DE CITA "+dataCita[0]["FECHA"]);			
								correoPersona(dataCita[0]["RESPONSABLE"], "<html><span style=\"color:green;\"><b>Se agendo una cita: </b></span>"+mensaje,"ITSM: CONFIRMACIÓN DE CITA "+dataCita[0]["FECHA"]);	

								setNotificacionFecha(usuario,"Cita: "+dataCita[0]["HORA"]+" "+dataCita[0]["TRAMITED"],
										dataCita[0]["FECHA"],dataCita[0]["FECHA"],"","P",institucion,campus);

								setNotificacionFecha(dataCita[0]["RESPONSABLE"],"Cita: "+dataCita[0]["HORA"]+" "+dataCita[0]["SOLICITANTE"]+" "+dataCita[0]["NOMBRE"],
										dataCita[0]["FECHA"],dataCita[0]["FECHA"],"","P",institucion,campus);
								
										
								enlace="../../nucleo/pa_citas/comcita.php?id="+elid;
								window.open(enlace,"_blank");

								cargamosCitas();
							}// DEL SUCCESS
						});// DEL AJAX DE LA CARGA DE LA CITA NUEVAMENTE 
						
					}					     
				});  
			}
			else {
				alert ("La fecha seleccionada ya no esta disponible elija otra por favor");
				cargamosCitas();
			}  	      
		}
	});
	
}



function opcionesCita(calEvent,jsEvent,view){
	elid=calEvent.id;
	var modal = 
			'<div class="modal fade">\
			<div class="modal-dialog">\
			<div class="modal-content">\
				<div class="modal-body">\
				<button type="button" class="close" data-dismiss="modal" style="margin-top:-10px;">&times;</button>\
					<button type="button" class="btn btn-sm btn-danger" data-action="cancelar"><i class="ace-icon fa fa-trash-o"></i> Cancelar Cita</button>\
					<button type="button" class="btn btn-sm btn-primary" data-action="imprimir"><i class="ace-icon fa fa-trash-o"></i> Imprimir Cita</button>\
					<button type="button" class="btn btn-sm" data-dismiss="modal"><i class="ace-icon fa fa-times"></i> Cerrar</button>\
			</div>\
			</div>\
			</div>';

			ocultarEspera("esperahor");
			var modal = $(modal).appendTo('body');
			modal.find('form').on('submit', function(ev){
				ev.preventDefault();
				modal.modal("hide");
			});
			modal.find('button[data-action=cancelar]').on('click', function() {
				cancelarCita(elid);			
				modal.modal("hide");
			});

			modal.find('button[data-action=imprimir]').on('click', function() {
				enlace="nucleo/pa_citas/comcita.php?id="+elid;
				abrirPesta(enlace,"Cita");	
				modal.modal("hide");
			});
			
			modal.modal('show').on('hidden', function(){
				modal.remove();
			});

	
}

function cancelarCita(elid) {
	
	if (confirm("¿Desea cancelar esta cita?")) {				
		elsql="SELECT a.*, count(*) AS hay from vci_citas  a where ID='"+elid+"'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		mostrarEspera("esperahor","grid_pa_citas","Cargando Datos...");
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){ 
	
				dataCita=JSON.parse(data);
				mensaje=" <span style=\"color:blue\"><br>"+
				"<b> ID CITA: </b>"+dataCita[0]["ID"]+"<br>"+
				"<b> SOLICITANTE: </b>"+dataCita[0]["SOLICITANTE"]+" "+dataCita[0]["NOMBRE"]+"<br>"+
				"<b> Tramite: </b>"+dataCita[0]["TRAMITED"]+"<br>"+
				"<b> Fecha: </b>"+dataCita[0]["FECHA"]+"<br>"+
				"<b> Hora: </b>"+dataCita[0]["HORA"]+"<br>";

				correoPersona(dataCita[0]["SOLICITANTE"],"<html><span style=\"color:green;\"><b>Te confirmamos <span style=\"color:red;\"> CANCELACIÓN </span> de tu cita: </b></span>"+mensaje,"ITSM: CANCELACIÓN DE CITA "+dataCita[0]["FECHA"]);			
				correoPersona(dataCita[0]["RESPONSABLE"], "<html><span style=\"color:green;\"><b>Se <span style=\"color:red;\"> CANCELO </span> una cita: </b></span>"+mensaje,"ITSM: CANCELACIÓN DE CITA "+dataCita[0]["FECHA"]);	
				
				lafecha=dameFecha("FECHAHORA");
				parametros={
					tabla:"ci_citas",
					campollave:"ID",
					bd:"Mysql",
					valorllave:elid,
					SOLICITANTE:'',
					OBS:'',
					FECAGENDA:''
				};
				$.ajax({
					type: "POST",
					url:"../base/actualiza.php",
					data: parametros,
					success: function(data){
					}					     
				});  

				cargamosCitas();			
			}// DEL SUCCESS
		});// DEL AJAX DE LA CARGA DE LA CITA NUEVAMENTE 		
	}

}