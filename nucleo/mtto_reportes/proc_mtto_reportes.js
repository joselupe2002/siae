

function repSoli(modulo,usuario,institucion, campus,essuper){
 	 table = $("#G_"+modulo).DataTable();
	 	  
	  if (table.rows('.selected').data().length>0) {
		  enlace="nucleo/mtto_reportes/reporte.php?ID="+table.rows('.selected').data()[0]["IdReporte"];
		  abrirPesta(enlace, "Reporte");
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;
		}

      return false;
}

