var globlal;
var parte0="<div style=\"width:150px; padding-left:10px;padding-right:10px;padding-top:0; padding-bottom:0;\"><div class=\"row\">" +
		   "     <div class=\"col-md-5\" style=\"padding: 0;\"><select style=\"width:100%; font-size:11px;  font-weight:bold; color:#0E536C;\"";
var parte1="</div><div class=\"col-md-7\" style=\"padding: 0;\">" +
		   " <input class= \"small form-control input-mask-horario\" style=\"width:100%;  " +
		                    " font-size:11px;  font-weight:bold; color:#03661E; height: 30px;\" type=\"text\"";
var parte2="</input></div></div></td>";

function listaInci(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\">"+	
	       "                           <table id=\"tabHorarios\" class= \"table table-condensed table-bordered table-hover\">"+
	   	   "                              <thead>  "+
		   "                                  <tr>"+
		   "                             	     <th>ID</th> "+	
		   "                             	     <th>Incidencia</th> "+
		   "                             	     <th>Profesor</th> "+
		   "                             	     <th>Aula</th> "+
		   "                             	     <th>Horario</th> "+		   
		   "                             	     <th>Asignatura</th> "+
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
	        	 url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT * FROM vdprefectura where IDPREF=" +table.rows('.selected').data()[0][0]),
	        	 success: function(data){ 	        	   	        	
	        	   	        	     generaTabla(JSON.parse(data));
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



function generaTabla(grid_data){
	   c=0;
	   $("#cuerpo").empty();
	   $("#tabHorarios").append("<tbody id=\"cuerpo\">");
	   jQuery.each(grid_data, function(clave, valor) { 	        			
	   $("#cuerpo").append("<tr id=\"row"+c+"\">");
	   cad="<span class=\"label label-sm arrowed-in label-success\">"+valor.INCIDENCIA+"</span>";
	   if (valor.INCIDENCIA=='F') {cad="<span class=\"label label-sm label-danger arrowed-in\">"+valor.INCIDENCIA+"</span>"+
										"<i onclick=\"verExhorto('"+valor.ID+"');\" title=\"Ver Oficio de Exhorto\" class=\"ace-icon fa fa-file-text bigger-100 blue\" "+
										"style=\"cursor:pointer; padding-left:10px; padding-top:10px;\" ></i>";}
	   if (valor.INCIDENCIA=='J') {cad="<span class=\"label label-sm label-warning arrowed-in\">"+valor.INCIDENCIA+"</span>";}
	   
	        			$("#row"+c).append("<td>"+valor.ID+"</td>");
	        			$("#row"+c).append("<td>"+cad+"</td>");
	        			$("#row"+c).append("<td>"+valor.PROFESORD+"</td>");	        				        			
	        			$("#row"+c).append("<td>"+valor.AULA+"</td>");
	        			$("#row"+c).append("<td>"+valor.HORARIO+"</td>");	        			
	        			$("#row"+c).append("<td>"+valor.MATERIAD+"</td>");
	        			c++;
	        		});

}



function verExhorto(elid){
	
	window.open("../LISTASREC/exhorto.php?ID="+elid, '_blank');
    return false;
	
}


function pad (str, max) {
	  str = str.toString();
	  return str.length < max ? pad("0" + str, max) : str;
	}




function eliminarRec(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		 if(confirm("Seguro que desea eliminar el registro: "+table.rows('.selected').data()[0][0])) {
 			$('#dlgproceso').modal({backdrop: 'static', keyboard: false});			    		
 		        
 		  var parametros = {
 	                "tabla" : "eprefectura",
 	                "campollave" : "PREF_ID",
 	                "bd":"Mysql",
 	                "valorllave" : table.rows('.selected').data()[0][0]
 	        };
 	        
 		  $.ajax({
	  	            data:  parametros,
	  	            url:   'eliminar.php',
	  	            type:  'post',          
	  	            success:  function (response) {
	  	            	$('#dlgproceso').modal("hide");
	  	            	alert(response);
	  	            	window.parent.document.getElementById('FRLISTASREC').contentWindow.location.reload();
 		        }		
	  	       }); 
 	  }
	}
	
	else {
		alert ("Debe seleccionar un grupo");
		return 0;

		}
	
}


