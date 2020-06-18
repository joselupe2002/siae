

function imprimeCarta(modulo,usuario,institucion, campus,essuper){
 	 table = $("#G_"+modulo).DataTable();
	 	  
	  if (table.rows('.selected').data().length>0) {
		window.open("../vpasantes/cartaPasante.php?ID="+table.rows('.selected').data()[0]["MATRICULA"], '_blank');
		$('#modalDocument').modal("hide");  

	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}

      return false;
}
