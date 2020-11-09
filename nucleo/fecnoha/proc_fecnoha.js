

function adddias(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	cad="";
	dias=["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
	for (i=0; i<7; i++) {
      cad+=
	 	   "           <div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
	       "                 <label><input id=\"d"+i+"\" type=\"checkbox\" class=\"ace ace-switch ace-switch-6\"/><span class=\"lbl\">"+dias[i]+"</span></label> "+
	       "           </div> ";
	}
	mostrarConfirm2("verCitas","grid_"+modulo,"Agregar Días",
		"<div class=\"row fontRoboto\" style=\"text-align:justify; height:200px; overflow-y: scroll; \">"+
		"     <div class=\"col-sm-8\">"+
		"        <div class=\"row\">"+
		"             <div class=\"col-sm-6\">"+
		"                  <label  class=\"fontRobotoB\">Fecha de Inicio</label>"+
		"                  <div class=\"input-group\"><input  class=\"form-control  captProy date-picker\" id=\"fini\" "+
		"                  type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
		"                  <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
		"             </div>"+
		"             <div class=\"col-sm-6\">"+
		"                  <label  class=\"fontRobotoB\">Fecha Termina</label>"+
		"                  <div class=\"input-group\"><input  class=\"form-control  captProy date-picker\" id=\"ffin\" "+
		"                   type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
		"                  <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
		"             </div>"+
		"        </div>"+
		"     </div>"+
		"     <div class=\"col-sm-4\">"+cad+"</div>"+
		"</div>","Agregar Fechas","agregarFechas('"+usuario+"','"+institucion+"','"+campus+"');","modal-lg");

		$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		$(".input-mask-hora").mask("99:99");
			
}


function agregarFechas(usuario,institucion,campus){
	
	var vfini=$("#fini").val();
	var vffin=$("#ffin").val();
	var desde = moment(fechaJava(vfini));
	var hasta = moment(fechaJava(vffin));
	
	
	if (vfini=="") {alert ("Se debe capturar fecha de inicio"); return 0;}
	if (vffin=="") {alert ("Se debe capturar fecha de termino o final"); return 0;}
	if (desde>hasta) { alert ("La fecha de Inicio debe ser menor a la fecha Final"); return 0;}

	//creamos arreglo de los check 
	c=0;
	var misdias=[];
	for (i=0; i<7; i++) {if ($("#d"+i).prop('checked')) { misdias[c]=i; c++;}}

	fec_diasEntreFechas(desde, hasta, misdias,usuario,institucion,campus);
}


function fec_diasEntreFechas (desde, hasta, misdias,usuario,institucion,campus) {
    var losdatosGuardar=[];
	var dia_actual = desde;
	fechaus=dameFecha("FECHAHORA");
	elday = new Date();
	c=0;
	while (dia_actual.isSameOrBefore(hasta)) {
		  d = new Date(dia_actual);
		  var day = d.getDay();
		  mifecha= pad(d.getDate(),2,'0')+"/"+pad(d.getMonth()+1,2,'0')+"/"+d.getFullYear();
	
		  if (misdias.includes(day)) {
			  losdatosGuardar[c]=mifecha+"|"+usuario+"|"+fechaus+"|"+institucion+"|"+campus;
			  c++;		
		  }
		  dia_actual.add(1, 'days');
	}	

	var loscampos = ["DIAS_FECHA","DIAS_USER","DIAS_FECHAUS","_INSTITUCION","_CAMPUS"];
	parametros={
			tabla:"ediasnoha",
			campollave:"DIAS_ID",
			bd:"Mysql",
			valorllave:0,
			eliminar: "S",
			separador:"|",
			campos: JSON.stringify(loscampos),
			datos: JSON.stringify(losdatosGuardar)
	};
	$.ajax({
		type: "POST",
		url:"../base/grabadetalle.php",
		data: parametros,
		success: function(data){
			$("#verCitas").modal("hide");	
			window.parent.document.getElementById('FRfecnoha').contentWindow.location.reload();                      					          
		}					     
	});  
    
}
