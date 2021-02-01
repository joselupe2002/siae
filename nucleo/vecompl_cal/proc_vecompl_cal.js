

function liberacion(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["PROM"]>=1) {
			window.open("../vecompl_cal/liberacion.php?ID="+table.rows('.selected').data()[0]["IDCAL"]+"&tipo=0", '_blank');
			window.open("../vecompl_cal/evaluacion.php?ID="+table.rows('.selected').data()[0]["IDCAL"]+"&tipo=0", '_blank');
		}
		else {
			alert ("No se puede emitir oficio si la calificación de la actividad no es mayor o igual a  1")
			}
		}
	else {
		alert ("Debe seleccionar a un alumno");
		return 0;

		}
	
}


function liberacionSellada(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["PROM"]>=1) {
			enlace="nucleo/vecompl_cal/liberacion.php?ID="+table.rows('.selected').data()[0]["IDCAL"]+"&tipo=1";
			//enlace2="nucleo/vecompl_cal/evaluacion.php?ID="+table.rows('.selected').data()[0]["IDCAL"]+"&tipo=1";
			abrirPesta(enlace,"Liberación");
			abrirPesta(enlace2,"Evaluación");
		}
		else {
			alert ("No se puede emitir oficio si la calificación de la actividad no es mayor o igual a  1")
			}
		}
	else {
		alert ("Debe seleccionar a un alumno");
		return 0;

		}
	
}


function laliberacion(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["PROM"]>=1) {
			window.open("../vecompl_cal/liberacion.php?ID="+table.rows('.selected').data()[0]["IDCAL"]+"&tipo=0", '_blank');
		}
		else {
			alert ("No se puede emitir oficio si la calificación de la actividad no es mayor o igual a  1")
			}
		}
	else {
		alert ("Debe seleccionar a un alumno");
		return 0;

		}
	
}



function verPDF(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["COMP_LIBERACION"]) {
			window.open(table.rows('.selected').data()[0]["COMP_LIBERACION"], '_blank');
		}
		else {
			alert ("No se ha adjuntando PDF")
			}
		}
	else {
		alert ("Debe seleccionar a un alumno");
		return 0;

		}
	
}


function laevaluacion(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["PROM"]>=1) {
			window.open("../vecompl_cal/evaluacion.php?ID="+table.rows('.selected').data()[0]["IDCAL"]+"&tipo=1", '_blank');
		}
		else {
			alert ("No se puede emitir oficio si la calificación de la actividad no es mayor o igual a  1")
			}
		}
	else {
		alert ("Debe seleccionar a un alumno");
		return 0;

		}
	
}



function captObs(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {	
		
		var obs = prompt("Observación: "+table.rows('.selected').data()[0]["OBS"], table.rows('.selected').data()[0]["OBS"]);

		if (obs != null) {
			 $('#modalDocument').modal({show:true, backdrop: 'static'});	 
				parametros={
					tabla:"ecalificagen",
					campollave:"ID",
					bd:"Mysql",
					valorllave:table.rows('.selected').data()[0][0],
					OBS: obs.toUpperCase()
				};
				$.ajax({
				type: "POST",
				url:"actualiza.php",
				data: parametros,
				success: function(data){
					$('#dlgproceso').modal("hide"); 
					if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
					//else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	

					window.parent.document.getElementById('FRvecompl_cal').contentWindow.location.reload();
				}					     
				});    	    
		}
		
		
	}
	else {
		alert ("Debe seleccionar a un alumno");
		return 0;

		}
	
}


function adjPDF(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	ladefault="..\\..\\imagenes\\menu\\pdf.png";
	if (table.rows('.selected').data().length>0) {
		
		 
		stElim="display:none; cursor:pointer;";
    	if (table.rows('.selected').data()[0]["COMP_LIBERACION"].length>0) {stElim="cursor:pointer; display:block; ";}
    	btnEliminar="<i style=\""+stElim+"\"  id=\"btnEli_COMP_LIBERACION\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
        "onclick=\"eliminarEnlaceDrive('file_COMP_LIBERACION','COMP_LIBERACION','pdf_COMP_LIBERACION','COMP_LIBERACION','pdf','S','ID','"+
                                        table.rows('.selected').data()[0]["IDCAL"]+"','"+table.rows('.selected').data()[0]["ACTIVIDADD"]+
                                        "','ecalificagen','edita','');\"></i> "; 
    	
    	 
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
		   "                         <span class=\"label label-sm label-success arrowed-in\">"+table.rows('.selected').data()[0]["MATRICULAD"]+"</span>"+
		   "                     </div>"+
		   "                  </div> "+
		   "                  <div class=\"row\"> "+
		   "                     <div class=\"col-sm-12\">"+
		   "                         <span class=\"label label-sm label-primary arrowed-in\">"+table.rows('.selected').data()[0]["ACTIVIDADD"]+"</span>"+
		   "                     </div>"+
		   "                  </div> "+
		   "                  <div class=\"space-12\"></div> "+
		   "                  <div class=\"row\"> "+
		   "                     <div class=\"col-sm-3\"></div>"+
		   "                     <div class=\"col-sm-5\">"+
		   "                          <a target=\"_blank\" id=\"enlace_COMP_LIBERACION\" href=\""+table.rows('.selected').data()[0]["COMP_LIBERACION"]+"\">"+
		   "                               <img id=\"pdf_COMP_LIBERACION\" name=\"pdf_COMP_LIBERACION\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
		   "                          </a>"+
		   "                     </div>"+
		   "                     <div class=\"col-sm-1\">"+btnEliminar+"</div>"+
		   "                     <div class=\"col-sm-3\"></div>"+
		   "                  </div>"+
		   "                  <div class=\"space-12\"></div> "+
		   "                  <div class=\"row\"> "+
		   "                    <div class=\"col-sm-12\">"+
		   "                      <input type=\"file\" id=\"file_COMP_LIBERACION\" name=\"file_COMP_LIBERACION\""+
	       "                          onchange=\"subirPDFDriveSave('file_COMP_LIBERACION','COMP_LIBERACION','pdf_COMP_LIBERACION','COMP_LIBERACION','pdf','S','ID','"+table.rows('.selected').data()[0]["IDCAL"]+"','"+table.rows('.selected').data()[0]["ACTIVIDADD"]+"','ecalificagen','edita','');\"/>"+
	       "                      <input  type=\"hidden\" value=\""+table.rows('.selected').data()[0]["COMP_LIBERACION"]+"\"  name=\"COMP_LIBERACION\" id=\"COMP_LIBERACION\"  placeholder=\"\" />\n"+
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
	    
	    	 if (table.rows('.selected').data()[0]["COMP_LIBERACION"]=='') { 
	                $('#enlace_COMP_LIBERACION').attr('disabled', 'disabled');
	                $('#enlace_COMP_LIBERACION').attr('href', '#');
	                $('#pdf_COMP_LIBERACION').attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
	       	    }
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
	
	    $('#file_COMP_LIBERACION').ace_file_input({
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
	     table = $("#G_"+modulo).DataTable();
	     table.rows('.selected').data()[0]["COMP_LIBERACION"]=$('#COMP_LIBERACION').val();  
	     /*
	     var node = $(table.rows('.selected').row(0).node());	     
	     node.find("td").eq(24).html($('#COMP_LIBERACION').val());	 
	     */	    
         $('#modalDocument').modal("hide");  
    }



