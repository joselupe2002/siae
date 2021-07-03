

    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		verEventos();
	});
	
	
		 
	function change_SELECT(elemento) {
	
    }

/*===========================================================POR MATERIAS ==============================================*/
    function verEventos(){

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
				
		editable: false,
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
			verDatosCita(calEvent,jsEvent,view);
		
		}
		
	});

	cargamosActividades();
	cargamosComisiones();
	cargamosEventos();

} 


function cargamosActividades() {

	$('#calendar').fullCalendar('refresh');
	$('#calendar').fullCalendar('removeEvents');

	elsql="SELECT * FROM cal_fechas where EXTRACT(YEAR FROM NOW())=EXTRACT(YEAR FROM STR_TO_DATE(INICIA,'%d/%m/%Y')) and ACTIVO='S'";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_cal_calendario","Cargando Datos...");
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
				mostrarEspera("esperahor","grid_ci_vercitas","Cargando Datos...");
				jQuery.each(JSON.parse(data), function(clave, valor) {
					
					ini=fechaJava(valor.INICIA);
					fin=fechaJava(valor.TERMINA)+" 23:00:00";
							
					var my_events = {
						events: [
						{
							id:valor.ID,
							resp:valor.RESPONSABLE,
							title: valor.EVENTO,
							start: ini,
							end: fin,
							color: valor.COLOR
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



function cargamosComisiones() {

	$('#calendar').fullCalendar('refresh');
	$('#calendar').fullCalendar('removeEvents');

	elsql="SELECT * FROM pcomisiones where EXTRACT(YEAR FROM NOW())=EXTRACT(YEAR FROM STR_TO_DATE(COMI_FECHAINI,'%d/%m/%Y'))"+
	" and COMI_PROFESOR='"+usuario+"'";


	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_cal_calendario","Cargando Datos...");
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
				mostrarEspera("esperahor","grid_ci_vercitas","Cargando Datos...");
				jQuery.each(JSON.parse(data), function(clave, valor) {
					
					ini=fechaJava(valor.COMI_FECHAINI);
					fin=fechaJava(valor.COMI_FECHAFIN);
							
					var my_events = {
						events: [
						{
							id:valor.ID,
							resp:valor.RESPONSABLE,
							title: valor.COMI_ACTIVIDAD,
							start: ini,
							end: fin,
							color: "#4A6874"
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




function cargamosEventos() {

	$('#calendar').fullCalendar('refresh');
	$('#calendar').fullCalendar('removeEvents');

	elsql="select * from eeventos  where EXTRACT(YEAR FROM NOW())=EXTRACT(YEAR FROM STR_TO_DATE(FECHA,'%d/%m/%Y'))";
	

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_cal_calendario","Cargando Datos...");
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
				mostrarEspera("esperahor","grid_ci_vercitas","Cargando Datos...");
				jQuery.each(JSON.parse(data), function(clave, valor) {
					
					ini=fechaJava(valor.FECHA)+" "+valor.HORA;
					fin=fechaJava(valor.FECHA);
							
					var my_events = {
						events: [
						{
							id:valor.ID,
							resp:valor.RESPINS,
							title: valor.DESCRIPCION,
							start: ini,
							end: fin,
							color: "#6E3860"
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




function verDatosCita(calEvent,jsEvent,view){
	elid=calEvent.id;
	
			var modal = 
			'<div class="modal fade">\
			<div class="modal-dialog">\
			<div class="modal-content">\
				<div class="modal-body">\
				<button type="button" class="close" data-dismiss="modal" style="margin-top:-10px;">&times;</button>\
				<form class="no-margin">\
				<div class=\"row\">\
							<div class="col-sm-12">\
								<h4  class="fontRobotoB">Evento: <span class="text-success">'+calEvent.title+'</span></h4>\
							</div>\
						</div>\
				</form>\
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
			
			modal.modal('show').on('hidden', function(){
				modal.remove();
			});

}
