

function impCarta(modulo,usuario,institucion, campus,essuper){
 	 table = $("#G_"+modulo).DataTable();
	 	  
	if (table.rows('.selected').data().length>0) {

		enlace="nucleo/vss_alumnos/carta.php?id="+table.rows('.selected').data()[0]["ID"];
		abrirPesta(enlace,'Carta Presentación');


	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}

      return false;
}



function setFinalizado(id,valor){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"ss_alumnos",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:id,
		   FINALIZADO: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   window.parent.document.getElementById('FRvss_alumnos').contentWindow.location.reload();
	   }					     
	   });    	                
}



function finaliza(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        if (table.rows('.selected').data()[0]["FINALIZADO"]=='N') {
			if (confirm("Desea Finalizar el proceso de Servicio Social de  "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"])) {
				setFinalizado(table.rows('.selected').data()[0]["ID"],"S");
			}
		}
		else {
			if (confirm("El proceso de : "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"]+" esta Finalizados ¿desea cambiarlo a No Finalizado?")) {
				setFinalizado(table.rows('.selected').data()[0]["ID"],"N");
			}
		} 

	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	}




/*===============================================*/


function impLib(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {

		if (table.rows('.selected').data()[0]["FINALIZADO"]=='S') {
			enlace="nucleo/vss_alumnos/oficioLib.php?id="+table.rows('.selected').data()[0]["ID"];
			abrirPesta(enlace,'Oficio Lib.');}
		else {
			alert ("El registro de  "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"]+" No esta  Finalizado");
		}


	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}

}




function setValidado(id,valor,obs,user){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   if (valor=='S') {parametros={tabla:"ss_alumnos",campollave:"ID",bd:"Mysql",valorllave:id,VALIDADO: valor,OBS:obs};}
	   else {parametros={tabla:"ss_alumnos",campollave:"ID",bd:"Mysql",valorllave:id,VALIDADO: valor,OBS:obs,ENVIADA:'N'};}
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   window.parent.document.getElementById('FRvss_alumnos').contentWindow.location.reload();
	   }					     
	   });    	                
}



function validarSol (modulo,usuario,essuper){
table = $("#G_"+modulo).DataTable();
$("#confirmCotejado").empty();
mostrarConfirm("confirmCotejado", "grid_vss_alumnos",  "Proceso de Cotejo",
"<span class=\"label label-success\">Observaciones</span>"+
"     <textarea id=\"obsCotejado\" style=\"width:100%; height:100%; resize: none;\">"+table.rows('.selected').data()[0]["OBS"]+"</textarea>",
"¿Marcar como Validado? "+
"<SELECT id=\"cotejado\"><OPTION value=\"S\">SI</OPTION><OPTION value=\"N\">NO</OPTION></SELECT>"
,"Finalizar Proceso", "btnMarcarValidado('"+table.rows('.selected').data()[0]["MATRICULA"]+"','"+table.rows('.selected').data()[0]["ID"]+"','"+modulo+"','"+usuario+"');","modal-sm");
}


function btnMarcarValidado(alumno,id,modulo,eluser){
setValidado(id,$("#cotejado").val(),$("#obsCotejado").val(),eluser);

status="<span style=\"color:red\"><b>NO VALIDADO</b></span>"; 
cadObs="<b>Favor de Revisar la siguiente Observación:<b><br>"+$("#obsCotejado").val();
if ($("#cotejado").val()=='S') {status="<span style=\"color:green\"><b> VALIDADO</b></span>"; cadObs="";}

correoalAlum(alumno, "<html>Tu solicitud de Servicio Social ha sido "+status+
						"</b></span>."+cadObs
						,"STATUS DE SOLICITUD SERVICIO SOCIAL "+alumno);			

}



function cartaFin(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {

		if (table.rows('.selected').data()[0]["FINALIZADO"]=='S') {
			enlace="nucleo/vss_alumnos/cartafin.php?id="+table.rows('.selected').data()[0]["ID"];
			abrirPesta(enlace,'Carta Fin.');}
		else {
			alert ("El registro de  "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"]+" No esta  Finalizado");
		}


	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}

}

	
function veradjss  (modulo,usuario,institucion, campus,essuper){

	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		ss_mostrarAdjuntos(modulo,usuario,institucion, campus,essuper,table.rows('.selected').data()[0]["CICLO"],table.rows('.selected').data()[0]["MATRICULA"]);
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}

}



/*====================================================================*/


function subirCartaSS(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	ladefault="..\\..\\imagenes\\menu\\pdf.png";
	if (table.rows('.selected').data().length>0) {
		
		 
		stElim="display:none; cursor:pointer;";
    	if (table.rows('.selected').data()[0]["RUTA"].length>0) {stElim="cursor:pointer; display:block; ";}
    	btnEliminar="<i style=\""+stElim+"\"  id=\"btnEli_RUTA\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
        "onclick=\"eliminarEnlaceDrive('file_RUTA','ADJRESIDENCIA','pdf_RUTA','RUTA','pdf','S','ID','"+
                                        table.rows('.selected').data()[0]["ID"]+"','"+table.rows('.selected').data()[0]["NOMBRE"]+
                                        "','ss_alumnos','edita','');\"></i> "; 
    	
    	 
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
	       "                          onchange=\"subirPDFDriveSave('file_RUTA','ADJRESIDENCIA','pdf_RUTA','RUTA','pdf','S','ID','"+table.rows('.selected').data()[0]["ID"]+"','"+table.rows('.selected').data()[0]["NOMBRE"]+"','ss_alumnos','edita','');\"/>"+
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
 
	window.parent.document.getElementById('FRvss_alumnos').contentWindow.location.reload();
}