

    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#lostramites").append("<span class=\"label label-warning\">Trámites</span>");
		if (essuper!='S') {sql="SELECT ID, TRAMITE FROM ci_tramites where USUARIO='"+usuario+"' order by TRAMITE";}
		else {sql="SELECT ID, TRAMITE FROM ci_tramites order by TRAMITE";}
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
			crearEspacioCita(start, end, allDay);
			
		}
		,
		eventClick: function(calEvent, jsEvent, view) {

			verCita(calEvent, jsEvent, view);

		}
		
	});

	cargamosCitas();

} 



function verCita(calEvent, jsEvent, view) {
		//display a modal
		dato=calEvent.title.split("|");
		bteli="";
		elsql="SELECT * from ci_citas where ID='"+calEvent.id+"'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}		
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  
					losdatos=JSON.parse(data);
					if (dato[0]==''){bteli='<button type="button" class="btn btn-sm btn-danger" data-action="delete"><i class="ace-icon fa fa-trash-o"></i> Borrar Cita</button>'; }

					var modal = 
					'<div class="modal fade">\
					<div class="modal-dialog">\
					<div class="modal-content">\
						<div class="modal-body">\
						<button type="button" class="close" data-dismiss="modal" style="margin-top:-10px;">&times;</button>\
						<div class=\"row\">\
							<div class="col-sm-12">\
								<h4  class="fontRobotoB">Cita: <span class="text-success">'+losdatos[0]["ID"]+'</span></h4>\
								<h4  class="fontRobotoB">Fecha: <span class="text-success">'+losdatos[0]["FECHA"]+'</span></h4>\
								<h4  class="fontRobotoB">Hora: <span class="text-success">'+losdatos[0]["HORA"]+'</span></h4>\
								<h4  class="fontRobotoB">Minutos para atender: <span class="text-success">'+losdatos[0]["MINUTOS"]+'</span></h4>\
							</div>\
						</div>\
						</div>\
						<div class="modal-footer">'+bteli+'\
							<button type="button" class="btn btn-sm btn-warning" data-action="cancelar"><i class="ace-icon fa fa-trash-o"></i> Cancelar Cita</button>\
							<button type="button" class="btn btn-sm" data-dismiss="modal"><i class="ace-icon fa fa-times"></i> Cerrar</button>\
						</div>\
					</div>\
					</div>\
					</div>';
				
				
					var modal = $(modal).appendTo('body');
					modal.find('form').on('submit', function(ev){
						ev.preventDefault();
						modal.modal("hide");
					});
					modal.find('button[data-action=delete]').on('click', function() {
						eliminarCita(calEvent.id);
						modal.modal("hide");
					});

					modal.find('button[data-action=cancelar]').on('click', function() {
						cancelarCita(calEvent.id);
						modal.modal("hide");
					});
					
					modal.modal('show').on('hidden', function(){
						modal.remove();
					});
				}// del success de la cita 
			});// del ajax de la cita 
}

function eliminarCita(elid){
	if (confirm("¿Seguro que desea eliminar esta cita?")) {
		parametros={
			tabla:"ci_citas",
			campollave:"ID",
			bd:"Mysql",
			valorllave:elid
		};
		$.ajax({
			type: "POST",
			url:"../base/eliminar.php",
			data: parametros,
			success: function(data){
				cargamosCitas();
			}					     
		});    	    
	}  
}

function cargamosCitas() {

	$('#calendar').fullCalendar('refresh');
	$('#calendar').fullCalendar('removeEvents');

	elsql="SELECT ID, a.FECHA AS FECHA,a.MINUTOS, a.SOLICITANTE, IFNULL(NOMBRE,'') AS NOMBRE, a.HORA, a.HORA2, count(*) AS hay FROM  "+
	"vci_citas a where TRAMITE='"+$("#selTramites").val()+"'"+
	" and  STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y')<=STR_TO_DATE(FECHA,'%d/%m/%Y') "+
	" group by a.ID,a.FECHA,a.HORA";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_ci_vercitas","Cargando Datos...");
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
							title: valor.SOLICITANTE+"|"+valor.NOMBRE,
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



function crearEspacioCita(start, end, allDay){
	//display a modal
	d1 = new Date(start); 
	d2 = new Date(end); 
	
	mifecha= pad(d2.getDate(),2,'0')+"/"+pad(d2.getMonth()+1,2,'0')+"/"+d2.getFullYear();
	mihora= pad(d1.getHours(),2,'0')+":"+pad(d1.getMinutes(),2,'0');

	var modal = 
	'<div class="modal fade">\
	  <div class="modal-dialog">\
	   <div class="modal-content">\
		 <div class="modal-body">\
		   <button type="button" class="close" data-dismiss="modal" style="margin-top:-10px;">&times;</button>\
		   <form class="no-margin">\
		           <div class=\"row\">\
		               <div class="col-sm-4">\
		                     <label  class="fontRobotoB">Fecha de Inicio</label>\
		                     <div class="input-group"><input  class="form-control date-picker" id="inpfecha" value="' + mifecha + '"\
		                     type="text" autocomplete="off"  data-date-format="dd/mm/yyyy" /> \
		                     <span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i></span></div>\
						</div>\
						<div class="col-sm-3">\
		                     <label  class="fontRobotoB">Hora de Inicio</label>\
							 <input  id="hora" autocomplete="off" class= "small form-control input-mask-hora" value="'+ mihora + '"></input>\
						</div>\
						<div class="col-sm-3">\
		                     <label  class="fontRobotoB">Minutos</label>\
							 <input  id="minutos" autocomplete="off" class= "small form-control" value=""></input>\
		                </div>\
		    		</div>\
		   </form>\
		 </div>\
		 <div class="modal-footer">\
			<button type="button" class="btn btn-sm btn-primary" data-action="grabar"><i class="ace-icon fa fa-trash-o"></i> Crear Cita</button>\
			<button type="button" class="btn btn-sm" data-dismiss="modal"><i class="ace-icon fa fa-times"></i> Cancel</button>\
		 </div>\
	  </div>\
	 </div>\
	</div>';

	$("#inpfecha").val(mifecha);
	var modal = $(modal).appendTo('body');
	modal.find('form').on('submit', function(ev){
		ev.preventDefault();
		modal.modal("hide");
	});

	$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
	$(".input-mask-hora").mask("99:99");
		

	modal.find('button[data-action=grabar]').on('click', function() {
		fechacap=dameFecha("FECHAHORA");
		elday = new Date();
		mitag=pad(elday.getDate(),2,'0')+pad(elday.getMonth()+1,2,'0')+elday.getFullYear()+elday.getHours()+elday.getMinutes()+elday.getSeconds();
        parametros={
			          tabla:"ci_citas",						    		    	      
			    	  bd:"Mysql",
			          TRAMITE:$("#selTramites").val(),
	    		      FECHA:$("#inpfecha").val(),
		    		  HORA:$("#hora").val(),
			    	  HORA2:dameMinutos($("#hora").val()),
			          MINUTOS:$("#minutos").val(),
			          ATENDIDO: 'N',
				      TAG:mitag,					
				      USUARIO:usuario,
					  FECHAUS:fechacap,
					  _INSTITUCION:institucion,
					  _CAMPUS:campus};
			  
		 $.ajax({ type: "POST",url:"../base/inserta.php",data: parametros,success: function(data){  cargamosCitas(); }});            

		modal.modal("hide");
	});
	
	modal.modal('show').on('hidden', function(){
		modal.remove();
	});
}


function generaCitas (){
	 ventanaConf("grid_ci_vercitas",usuario,institucion,campus,$("#selTramites").val(),2);
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