

function addImagen(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+
		   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Actividad: </span>"+
		   "                                          <span class=\"text-danger\">"+table.rows('.selected').data()[0][3].substring(0,30)+"...</span></b> </span>"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\">"+	
	       "              <div class=\"row\">"+
	       "                  <div class=\"col-sm-6\">"+
	       "                      <div class=\"row\">"+
	       "                          <div class=\"col-sm-2\"></div>"+
		   "                          <div class=\"col-sm-8\"> <img id=\"img_FOTO1\" name=\"img_FOTO1\" src=\"../../imagenes/menu/default.png\" width=\"100%\" height=\"100px\"></div>"+
		   "                          <div class=\"col-sm-2\">"+
		   "                               <i style=\"display:none; cursor:pointer;\"  id=\"btnEli_FOTO1\"  title=\"Eliminar la Foto que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
           "                                  onclick=\"eliminarEnlaceDrive('NO APLICA','DP_ACTIVIDADES','img_FOTO1','FOTO1',"+
           "                                            'png|bmp|jpeg|jpg','S','ID','FOTO1_"+table.rows('.selected').data()[0][0]+"',' FOTO 1','eadjuntos','alta','FOTO1');\"></i> "+
		   "                          </div>"+
		   "                      </div>"+
		   "                     <div class=\"row\">"+		   
		   "                          <input  class=\"fileSigea\" type=\"file\" id=\"file_foto1\" name=\"file_foto1\""+
	       "                          onchange=\"subirImagenDriveSave('file_foto1','DP_ACTIVIDADES','img_FOTO1','FOTO1','png|bmp|jpeg|jpg','S','ID','FOTO1_"+table.rows('.selected').data()[0][0]+"',' FOTO 1','eadjuntos','alta','FOTO1');\">"+
	       "                          <input type=\"hidden\" id=\"FOTO1\" value=\"\"  placeholder=\"\" />\n"+
		   "                     </div> "+
	       "                  </div>"+
	       "                  <div class=\"col-sm-6\">"+
	       "                      <div class=\"row\">"+
	       "                          <div class=\"col-sm-2\"></div>"+
		   "                          <div class=\"col-sm-8\"> <img id=\"img_FOTO2\" name=\"img_FOTO2\" src=\"../../imagenes/menu/default.png\" width=\"100%\" height=\"100px\"></div>"+
		   "                          <div class=\"col-sm-2\">"+
		   "                               <i style=\"display:none; cursor:pointer;\"  id=\"btnEli_FOTO2\"  title=\"Eliminar la Foto que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
           "                                  onclick=\"eliminarEnlaceDrive('NO APLICA','DP_ACTIVIDADES','img_FOTO2','FOTO2',"+
           "                                            'png|bmp|jpeg|jpg','S','ID','FOTO2_"+table.rows('.selected').data()[0][0]+"',' FOTO 2','eadjuntos','alta','FOTO2');\"></i> "+
		   "                          </div>"+
		   "                      </div>"+
		   "                     <div class=\"row\">"+		   
		   "                          <input  class=\"fileSigea\" type=\"file\" id=\"file_foto2\" name=\"file_foto2\""+
	       "                          onchange=\"subirImagenDriveSave('file_foto2','DP_ACTIVIDADES','img_FOTO2','FOTO2','png|bmp|jpeg|jpg','S','ID','FOTO2_"+table.rows('.selected').data()[0][0]+"',' FOTO 2','eadjuntos','alta','FOTO2');\">"+
	       "                          <input type=\"hidden\" id=\"FOTO2\" value=\"\"  placeholder=\"\" />\n"+
		   "                     </div> "+
	       "                  </div>"+
	       "              </div>"+
	       "              <div class=\"row\">"+
	       "                  <div class=\"col-sm-6\">"+
	       "                      <div class=\"row\">"+
	       "                          <div class=\"col-sm-2\"></div>"+
		   "                          <div class=\"col-sm-8\"> <img id=\"img_FOTO3\" name=\"img_FOTO3\" src=\"../../imagenes/menu/default.png\" width=\"100%\" height=\"100px\"></div>"+
		   "                          <div class=\"col-sm-2\">"+
		   "                               <i style=\"display:none; cursor:pointer;\"  id=\"btnEli_FOTO3\"  title=\"Eliminar la Foto que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
           "                                  onclick=\"eliminarEnlaceDrive('NO APLICA','DP_ACTIVIDADES','img_FOTO3','FOTO3',"+
           "                                            'png|bmp|jpeg|jpg','S','ID','FOTO3_"+table.rows('.selected').data()[0][0]+"',' FOTO 3','eadjuntos','alta','FOTO3');\"></i> "+
		   "                          </div>"+
		   "                      </div>"+
		   "                     <div class=\"row\">"+		   
		   "                          <input  class=\"fileSigea\" type=\"file\" id=\"file_foto3\" name=\"file_foto3\""+
	       "                          onchange=\"subirImagenDriveSave('file_foto3','DP_ACTIVIDADES','img_FOTO3','FOTO3','png|bmp|jpeg|jpg','S','ID','FOTO3_"+table.rows('.selected').data()[0][0]+"',' FOTO 3','eadjuntos','alta','FOTO3');\">"+
	       "                          <input type=\"hidden\" id=\"FOTO3\" value=\"\"  placeholder=\"\" />\n"+
		   "                     </div> "+	       
	       "                  </div>"+
	       "                  <div class=\"col-sm-6\">"+
	       "                      <div class=\"row\">"+
	       "                          <div class=\"col-sm-2\"></div>"+
		   "                          <div class=\"col-sm-8\"> <img id=\"img_FOTO4\" name=\"img_FOTO4\" src=\"../../imagenes/menu/default.png\" width=\"100%\" height=\"100px\"></div>"+
		   "                          <div class=\"col-sm-2\">"+
		   "                               <i style=\"display:none; cursor:pointer;\"  id=\"btnEli_FOTO4\"  title=\"Eliminar la Foto que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
           "                                  onclick=\"eliminarEnlaceDrive('NO APLICA','DP_ACTIVIDADES','img_FOTO4','FOTO4',"+
           "                                            'png|bmp|jpeg|jpg','S','ID','FOTO4_"+table.rows('.selected').data()[0][0]+"',' FOTO 4','eadjuntos','alta','FOTO4');\"></i> "+
		   "                          </div>"+
		   "                      </div>"+
		   "                     <div class=\"row\">"+		   
		   "                          <input  class=\"fileSigea\" type=\"file\" id=\"file_foto4\" name=\"file_foto4\""+
	       "                          onchange=\"subirImagenDriveSave('file_foto4','DP_ACTIVIDADES','img_FOTO4','FOTO4','png|bmp|jpeg|jpg','S','ID','FOTO4_"+table.rows('.selected').data()[0][0]+"',' FOTO 4','eadjuntos','alta','FOTO4');\">"+
	       "                          <input type=\"hidden\" id=\"FOTO4\" value=\"\"  placeholder=\"\" />\n"+
		   "                     </div> "+
	       
	       "                  </div>"+
	       "              </div>"+
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
       	 
		
		elsql="SELECT * from eadjuntos where ID=CONCAT('FOTO1_',"+table.rows('.selected').data()[0][0]+")"+
		" or ID=CONCAT('FOTO2_',"+table.rows('.selected').data()[0][0]+")"+
		" or ID=CONCAT('FOTO3_',"+table.rows('.selected').data()[0][0]+")"+
		" or ID=CONCAT('FOTO4_',"+table.rows('.selected').data()[0][0]+")";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
	        	 type: "POST",
	        	 url:  "../base/getdatossqlSeg.php",
	        	 success: function(data){ 	        	   	        		        	
	        	   	        	     jQuery.each(JSON.parse(data), function(clave, valor) { 	        	   	        	 
	        	   	        		       $("#"+valor.AUX).val(valor.RUTA);
	        	   	        		       $("#img_"+valor.AUX).attr("src",valor.RUTA);
	        	   	        		       $("#btnEli_"+valor.AUX).css("display","block");
	        	   	        		    	        	   	        		    
	        						      
	        	   	        	          });
	        	   	                 },
	        	 error: function(data) {	                  
	        	   	                      alert('ERROR: '+data);
	        	   	                  }
	          });
	        	   	   
	    $('.fileSigea').ace_file_input({
   			no_file:'Sin archivo ...',
   			btn_choose:'Buscar',
   			btn_change:'Cambiar',
   			droppable:false,
   			onchange:null,
   			thumbnail:false, //| true | large
   			whitelist:'png|jpeg|jpg|bmp',
   			blacklist:'exe|php'
   			//onchange:''
   			//
   		});
		
	}
	else {
		alert ("Debe seleccionar un registro de actividad");
		return 0;

		}
	
}



