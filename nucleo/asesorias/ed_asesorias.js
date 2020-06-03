

function changeASES_MATRICULA(elemento, usuario, institucion, campus){

	$("#ASES_HORA").mask("99:99");

	elsql="SELECT CICL_MATERIA, CICL_MATERIAD FROM veciclmate a where a.CICL_MAPA IN ("+
	"SELECT ALUM_MAPA from falumnos n where n.ALUM_MATRICULA='"+$("#ASES_MATRICULA").val()+"')"+
	" ORDER BY CICL_MATERIAD";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/dameselectSeg.php",
        success: function(data){ 
     	      //losdatos=JSON.parse(data);         
     	      $("#ASES_ASIGNATURA").html(data);
     	      $('#ASES_ASIGNATURA').trigger("chosen:updated");
              $('.chosen-select').chosen({allow_single_deselect:true}); 			
     		  $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
     		  $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});
            

              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
               
    });
    

}



function dblclickASES_ASIGNATURA(elemento){
	if  ($("#ASES_ASIGNATURA").val()=="") {  $("#ASES_ASIGNATURA").val(localStorage.getItem("ASES_ASIGNATURA"));  }
	else  { localStorage.setItem("ASES_ASIGNATURA", $("#ASES_ASIGNATURA").val()); }
	
}



function dblclickASES_TEMA(elemento){
	if  ($("#ASES_TEMA").val()=="") {  $("#ASES_TEMA").val(localStorage.getItem("ASES_TEMA"));  }
	else  { localStorage.setItem("ASES_TEMA", $("#ASES_TEMA").val()); }
	
}

function dblclickASES_HORA(elemento){
	if  ($("#ASES_HORA").val()=="") {  $("#ASES_HORA").val(localStorage.getItem("ASES_HORA"));  }
	else  { localStorage.setItem("ASES_HORA", $("#ASES_HORA").val()); }
	
}

function dblclickASES_FECHA(elemento){
	if  ($("#ASES_FECHA").val()=="") {  $("#ASES_FECHA").val(localStorage.getItem("ASES_FECHA"));  }
	else  { localStorage.setItem("ASES_FECHA", $("#ASES_FECHA").val()); }
	
}


