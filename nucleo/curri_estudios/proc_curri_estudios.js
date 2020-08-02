
	

function verAdjEst(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
	
			abrirPesta(table.rows('.selected').data()[0]["CURRI_RUTA"], "Comprobante")
	}
	else {
		alert ("Debe seleccionar un Mapa Curricular");
		return 0;

		}
	
}

