

function verInstrucciones(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {				
		if (table.rows('.selected').data()[0]["RUTA"]) {
			window.open(table.rows('.selected').data()[0]["RUTA"], '_blank');
		}
		else {
			alert ("No se ha adjuntando PDF")
			}
		}
	else {
		alert ("Debe seleccionar una actividad");
		return 0;

		}
	
}




function verEvidencias(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {				
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header bg-info\" >"+
		   "             <span><i class=\"menu-icon green fa-2x fa fa-book\"></i>"+
		   "                   <span class=\"text-success \"><strong>"+table.rows('.selected').data()[0]["MATERIAD"]+"</strong><i class=\"menu-icon green fa fa-angle-double-right\"></i></span>"+
		   "                   <span class=\"text-warning small \"><strong>"+table.rows('.selected').data()[0]["UNIDADD"]+"</strong></span>"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\"  aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\">"+	
		   "                <div class=\"row\">"+
	       "                     <div class=\"col-sm-1\"></div> "+
	       "                     <div class=\"col-sm-10\" id=\"laTabla\"></div> "+
		   "                <div class=\"col-sm-1\"></div> "+
	       "          </div>"+		     
	       "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   " <select id=\"aulas\" style=\"visibility:hidden\"></select> "
		   "</div>";
	 
		$("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script); }
	    
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
	    cargarAlumnos(table.rows('.selected').data()[0]["GRUPO"],table.rows('.selected').data()[0]["CICLO"],
	    		table.rows('.selected').data()[0]["PROFESOR"],table.rows('.selected').data()[0]["MATERIA"],table.rows('.selected').data()[0]["ID"]);	    
	    }
	else {
		alert ("Debe seleccionar una actividad");
		return 0;
		}
	
}


function cargarAlumnos(grupo, ciclo,profesor,materia,actividad) {
	 var ladefault="..\\..\\imagenes\\menu\\pdf.png";	
	 $.ajax({
        type: "GET",
        url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select a.ID AS ID, c.ALUM_MATRICULA AS MATRICULA, concat(ALUM_APEPAT,' ',ALUM_APEMAT,' ', ALUM_NOMBRE) AS NOMBRE,"+ 
       		 "PDOCVE as CICLO, ifnull(b.RUTA,'') AS RUTA, ifnull(b.FECHARUTA,'') as FECHARUTA,  ifnull(b.FECHAENV,'') as FECHAENV"+
       		 " from dlista a LEFT OUTER JOIN lintareas b ON (concat('"+actividad+"','_',a.ALUCTR)=b.AUX), falumnos c"+ 
       		 " where ALUCTR=ALUM_MATRICULA AND GPOCVE='"+grupo+"' "+
       		 " and PDOCVE='"+ciclo+"' and LISTC15='"+profesor+"'"+
       		 " and MATCVE='"+materia+"' ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE"),
        success: function(data){    
       	 $("#laTabla").empty();
       	   $("#laTabla").append("<table id=tabHorarios class= \"table table-sm table-condensed table-bordered table-hover\" style=\"overflow-y: auto;\">"+
                      "<thead><tr><th>NO. CONTROL</th><th>NOMBRE ALUMNO</th><th>TAREA</th><th>SUBIO</th><th>ENVIO</th></tr>"+ 
                      "</thead></table> ");
   
       	 $("#cuerpo").empty();
     	     $("#tabHorarios").append("<tbody id=\"cuerpo\">"); 
      	     jQuery.each(JSON.parse(data), function(clave, valor) { 	
		          $("#cuerpo").append("<tr id=\"row"+valor.MATRICULA+"\">");
		          $("#row"+valor.MATRICULA).append("<td><span class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+valor.MATRICULA+"</span></td>");
		          $("#row"+valor.MATRICULA).append("<td><span class=\"text-primary\" style=\"font-size:11px; font-weight:bold;\">"+utf8Decode(valor.NOMBRE)+"</span></td>");	
		          	          
		          $("#row"+valor.MATRICULA).append("<td style=\"text-align:center\"><a title=\"Ver Archivo de Evidencia Encuadre\" target=\"_blank\" href=\""+valor.RUTA+"\">"+
	                                                    " <img width=\"30px\" height=\"30px\" id=\""+valor.MATRICULA+"TAREA\" "+
	                                                           "src=\""+ladefault+"\" width=\"50px\" height=\"50px\"></a></td>");
		          $("#row"+valor.MATRICULA).append("<td><span class=\"text-primary\" style=\"font-size:11px; font-weight:bold;\">"+valor.FECHARUTA+"</span></td>");
		          $("#row"+valor.MATRICULA).append("<td><span class=\"text-primary\" style=\"font-size:11px; font-weight:bold;\">"+valor.FECHAENV+"</span></td>");
		         		                  
		          if (valor.RUTA=='') {$('#'+valor.MATRICULA+"TAREA").attr('src', "..\\..\\imagenes\\menu\\pdfno.png");}				          		         
             });
      	       $('#dlgproceso').modal("hide"); 
           },
       error: function(data) {	  
       	      $('#dlgproceso').modal("hide");                 
                  alert('ERROR: '+data);  
              }
      });
   }


