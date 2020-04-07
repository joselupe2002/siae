

function detInci(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+
		   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Profesor: "+table.rows('.selected').data()[0][3]+"</span></b> </span>"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\">"+	
	       "                           <table id=\"tabHorarios\" class= \"table table-condensed table-bordered table-hover\">"+
	   	   "                              <thead>  "+
		   "                                  <tr>"+
		   "                             	     <th>Fecha</th> "+	
		   "                             	     <th>Dia</th> "+
		   "                             	     <th>Hora</th> "+
		   "                             	     <th>Materia</th> "+
		   "                             	     <th>Aula</th> "+		   
		   "                             	     <th>Horario</th> "+
		   "                             	     <th>Reviso</th> "+
		   "                      			</tr> "+
		   "                              </thead>" +
		   "                           </table>"+	
		   "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   " <select id=\"aulas\" style=\"visibility:hidden\"></select> "
		   "</div>";
	 
		 $("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	    }
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
       	 
	    

	    $.ajax({
	        	 type: "GET",
	        	 url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select a.FECHA, a.DIA, a.HORA, b.MATERIAD, b.AULA, b.HORARIO, b.NOMBRE from vprefectura a, vdprefectura b  where a.ID=b.IDPREF"+
                                                                         " and a.PREF_ANIO='"+table.rows('.selected').data()[0][1]+"'"+
                                                                         " and a.PREF_MES='"+table.rows('.selected').data()[0][0]+"'"+
                                                                         " and b.PROFESOR='"+table.rows('.selected').data()[0][2]+"'"+
                                                                         " and b.INCIDENCIA='F' order by STR_TO_DATE(a.FECHA,'%d/%m/%Y')"),
	        	 success: function(data){ 	        	   	        	
	        	   	        	     generaTabla(JSON.parse(data));
	        	   	                 },
	        	 error: function(data) {	                  
	        	   	                      alert('ERROR: '+data);
	        	   	                  }
	          });
	        	   	   
	    
	   
		
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}
	
}



function generaTabla(grid_data){
	   c=0;
	   $("#cuerpo").empty();
	   $("#tabHorarios").append("<tbody id=\"cuerpo\">");
	   jQuery.each(grid_data, function(clave, valor) { 	        			
	   $("#cuerpo").append("<tr id=\"row"+c+"\">");	 
	        			$("#row"+c).append("<td>"+valor.FECHA+"</td>");
	        			$("#row"+c).append("<td>"+valor.DIA+"</td>");
	        			$("#row"+c).append("<td>"+valor.HORA+"</td>");	        				        			
	        			$("#row"+c).append("<td>"+valor.MATERIAD+"</td>");
	        			$("#row"+c).append("<td>"+valor.AULA+"</td>");	        			
	        			$("#row"+c).append("<td>"+valor.HORARIO+"</td>");
	        			$("#row"+c).append("<td>"+valor.NOMBRE+"</td>");
	        			c++;
	        		});

}



function ofiEx(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	window.open("../ivprefecxmes/exhorto.php?mes="+table.rows('.selected').data()[0][0]+"&periodo="+
			                                    table.rows('.selected').data()[0][1]+"&profesor="+
			                                    table.rows('.selected').data()[0][2], '_blank');
    return false;
	
}


function pad (str, max) {
	  str = str.toString();
	  return str.length < max ? pad("0" + str, max) : str;
	}




