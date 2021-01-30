

function verCarta(modulo,usuario,institucion, campus,essuper){
 	 table = $("#G_"+modulo).DataTable();
	 	  
	if (table.rows('.selected').data().length>0) {

		enlace="nucleo/vrespropuestas/carta.php?id="+table.rows('.selected').data()[0]["ID"];
		abrirPesta(enlace,'Carta Presentación');


	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}

      return false;
}



function setFinalizado(id,valor){
	lafecha=dameFecha("FECHAHORA");
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"respropuestas",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:id,
		   ENVIADA: valor,
		   FECHAENVIADA:lafecha 
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   window.parent.document.getElementById('FRvrespropuestas').contentWindow.location.reload();
	   }					     
	   });    	                
}



function marcarEnviado(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        if (table.rows('.selected').data()[0]["ENVIADA"]=='N') {
			if (confirm("Desea Marcar como enviado el registro No.  "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"])) {
				setFinalizado(table.rows('.selected').data()[0]["ID"],"S");
			}
		}
		else {
			if (confirm("El proceso de : "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"]+" esta Enviada ¿desea cambiarlo a No Enviada?")) {
				setFinalizado(table.rows('.selected').data()[0]["ID"],"N");
			}
		} 

	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	}




	
function veradjprop  (modulo,usuario,institucion, campus,essuper){

	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		residencia_mostrarAdjuntos(modulo,usuario,institucion, campus,essuper,table.rows('.selected').data()[0]["CICLO"]);
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}

}




function subirCarta(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	ladefault="..\\..\\imagenes\\menu\\pdf.png";
	if (table.rows('.selected').data().length>0) {
		
		 
		stElim="display:none; cursor:pointer;";
    	if (table.rows('.selected').data()[0]["RUTA"].length>0) {stElim="cursor:pointer; display:block; ";}
    	btnEliminar="<i style=\""+stElim+"\"  id=\"btnEli_RUTA\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
        "onclick=\"eliminarEnlaceDrive('file_RUTA','ADJRESIDENCIA','pdf_RUTA','RUTA','pdf','S','ID','"+
                                        table.rows('.selected').data()[0]["ID"]+"','"+table.rows('.selected').data()[0]["NOMBRE"]+
                                        "','respropuestas','edita','');\"></i> "; 
    	
    	 
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-sm \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header bg-info\" >"+
		   "             <span><i class=\"menu-icon green fa-2x fa fa-cloud-upload\"></i><span class=\"text-success lead \"> <strong>Subir Documento</strong></span></span>"+
		   "             <button type=\"button\" class=\"close\" onclick=\"cierraModal('"+modulo+"');\"  aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\">"+	
		   "                  <div class=\"row\"> "+
		   "                     <div class=\"col-sm-12\">"+
		   "                         <span class=\"label label-sm label-success arrowed-in\">"+table.rows('.selected').data()[0]["ID"]+"</span>"+
		   "                     </div>"+
		   "                  </div> "+
		   "                  <div class=\"row\"> "+
		   "                     <div class=\"col-sm-12\">"+
		   "                         <span class=\"label label-sm label-primary arrowed-in\">"+table.rows('.selected').data()[0]["NOMBRE"]+"</span>"+
		   "                     </div>"+
		   "                  </div> "+
		   "                  <div class=\"space-12\"></div> "+
		   "                  <div class=\"row\"> "+
		   "                     <div class=\"col-sm-3\"></div>"+
		   "                     <div class=\"col-sm-5\">"+
		   "                          <a target=\"_blank\" id=\"enlace_RUTA\" href=\""+table.rows('.selected').data()[0]["RUTA"]+"\">"+
		   "                               <img id=\"pdf_RUTA\" name=\"pdf_RUTA\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
		   "                          </a>"+
		   "                     </div>"+
		   "                     <div class=\"col-sm-1\">"+btnEliminar+"</div>"+
		   "                     <div class=\"col-sm-3\"></div>"+
		   "                  </div>"+
		   "                  <div class=\"space-12\"></div> "+
		   "                  <div class=\"row\"> "+
		   "                    <div class=\"col-sm-12\">"+
		   "                      <input type=\"file\" id=\"file_RUTA\" name=\"file_RUTA\""+
	       "                          onchange=\"subirPDFDriveSave('file_RUTA','ADJRESIDENCIA','pdf_RUTA','RUTA','pdf','S','ID','"+table.rows('.selected').data()[0]["ID"]+"','"+table.rows('.selected').data()[0]["NOMBRE"]+"','respropuestas','edita','');\"/>"+
	       "                      <input  type=\"hidden\" value=\""+table.rows('.selected').data()[0]["RUTA"]+"\"  name=\"RUTA\" id=\"RUTA\"  placeholder=\"\" />\n"+
           "                  </div> "+
	       "                 </div>"+		  
	       "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   " <select id=\"aulas\" style=\"visibility:hidden\"></select> "
		   "</div>";
	 
		$("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	    }
	    
	    	 if (table.rows('.selected').data()[0]["RUTA"]=='') { 
	                $('#enlace_RUTA').attr('disabled', 'disabled');
	                $('#enlace_RUTA').attr('href', '#');
	                $('#pdf_RUTA').attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
	       	    }
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
	
	    $('#file_RUTA').ace_file_input({
			no_file:'No File ...',
			btn_choose:'Choose',
			btn_change:'Change',
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			whitelist:'pdf',
			blacklist:'exe|php'
			//onchange:''
			//
		});
	    

	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}
}


function cierraModal(modulo){
 
	window.parent.document.getElementById('FRvrespropuestas').contentWindow.location.reload();
}