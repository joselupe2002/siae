

function impEtiquetas(modulo,usuario,institucion, campus,essuper){

	dameVentana("ventFolios", "grid_bib_ejemplares","Etiquetas","sm","bg-successs","fa fa-book blue bigger-180","370");
	$("#body_ventFolios").append("<div class=\"row fontRoboto\">"+
	                            "     <div class=\"col-sm-12\">"+								
						    	"	    	<label class=\"fontRobotoB\">Folio Inicio</label><input class=\"form-control\"  id=\"ini\"></input>"+							
								"	  </div>"+	
								"     <div class=\"col-sm-12\">"+								
						    	"	    	<label class=\"fontRobotoB\">Folio Fin</label><input class=\"form-control\"  id=\"fin\"></input>"+							
								"	  </div>"+								
								"</div><br>"+
								"<div class=\"col-sm-12\" style=\"text-align:center;\">"+	
								"         <button  onclick=\"imprimirFolios();\" class=\"fontRobotoB btn btn-white btn-danger btn-bold bigger-100\">"+
								"            <i class= \"ace-icon fa fa-th bigger-100 blue\"></i>"+
								"            <span class=\"text-danger\">Ver Reporte</span>"+
								"         </button> "+
								"</div>");
				
	
}

function imprimirFolios() {	
		enlace="nucleo/bib_ejemplares/etiquetas.php?ini="+$("#ini").val()+"&fin="+$("#fin").val();
		abrirPesta(enlace,"Etiquetas");
}

