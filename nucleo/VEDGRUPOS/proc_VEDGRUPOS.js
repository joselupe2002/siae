
var cargandoSubtemas=true;
var cargandoTemas=true;

function grupoBase(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+
		   "             <b><span class=\"text-success\">"+table.rows('.selected').data()[0]["CVE_MAT"]+" "+table.rows('.selected').data()[0]["MATERIA"]+" ("+table.rows('.selected').data()[0]["PROFESOR"]+")"+"</b>"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\">"+	
           "                    <select  style=\"width:100%;\" class=\"chosen-select form-control\" name=\"gbase\"  id=\"gbase\" data-placeholder=\"Elija una Opci&oacute;-->\">\n"+
           "                    </SELECT></div>"+
           
           "                           <div class=\"row\"> "+	
           "                                <div class=\"col-sm-3\"> </div>"+
	       "                                <div class=\"col-sm-6\" style=\"text-align:center;\"> "+
		   "                                      <button type=\"button\" class=\"btn btn-white btn-success btn-bold\" onclick=\"asignarbase();\">"+
		   "                                      <i class=\"ace-icon fa fa-floppy-o bigger-120 success\"></i>Asignar Grupo Base</button>"+
		   "                                 </div>"+
		   "                                <div class=\"col-sm-3\"> </div>"+
		   "                           </div><br/><br/>"+		   
		   
		   "      </div>"+
		   "   </div>"+
		   " <select id=\"aulas\" style=\"visibility:hidden\"></select> "
		   "</div>";
	 
		 $("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	    }
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
       	 

	    elsql="select a.`IDDETALLE`, CONCAT(a.MATERIA,' ',a.`MATERIAD`,' (', a.`PROFESORD`,') ',a.`CARRERA`)  from `vedgrupos` a where a.`CICLO`='" +table.rows('.selected').data()[0]["CICLO"]+"'";
        parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}
 
	    $.ajax({
				 type: "POST",				 
                 data:parametros,
	        	 url:  "../base/dameselectSeg.php",
	        	 success: function(data){ 		        		
	        		  $("#gbase").html(data); 
	                  $('#gbase').trigger("chosen:updated");
	                  $('.chosen-select').chosen({allow_single_deselect:true}); 			
	          		  $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
	          		  $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});
	          		
	        	   	                 },
	        	 error: function(data) {	                  
	        	   	                      alert('ERROR: '+data);
	        	   	                  }
	          });
	        	   	   
	    
	   
		
	}
	else {
		alert ("Debe seleccionar un grupo");
		return 0;

		}
	
}

function verPlanea(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	verPlaneacion(table.rows('.selected').data()[0]["CVE_MAT"],table.rows('.selected').data()[0]["MATERIA"],
	table.rows('.selected').data()[0]["GRUPO"],table.rows('.selected').data()[0]["CICLO"],"grid_VEDGRUPOS",'S');
}



function verRepUni(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	window.open("../pd_captcal/repUni.php?materia="+table.rows('.selected').data()[0]["CVE_MAT"]+
	            "&grupo="+table.rows('.selected').data()[0]["GRUPO"]+
				"&ciclo="+table.rows('.selected').data()[0]["CICLO"]+
				"&profesor="+table.rows('.selected').data()[0]["EMPL"]+
				"&id="+table.rows('.selected').data()[0]["IDDET"]+
				"&materiad="+table.rows('.selected').data()[0]["MATERIA"]+
				"&semestre=1","_blank");
}



function asignarbase(){
	
	if ($("#gbase").val()>0) {
		
		
        parametros={
	    tabla:"edgrupos",
	    campollave:"DGRU_ID",
	    bd:"Mysql",
	    valorllave:table.rows('.selected').data()[0]["IDDET"],
	    DGRU_BASE:$("#gbase").val()
        };
        $.ajax({
			type: "POST",
			url:"actualiza.php",
			data: parametros,
			success: function(data){
				$('#modalDocument').modal("hide");  
				$('#dlgproceso').modal("hide"); 
				alert (data);                               	                                        					          
            }					     
        });    	  
	}
	else 
		alert ("Debe elegir una materia que será la base de la asignatura: "+table.rows('.selected').data()[0]["MATERIA"]);
	
}




