

function verEvidencia(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		if (table.rows('.selected').data()[0]["RUTA"].length>0) {		
			enlace=table.rows('.selected').data()[0]["RUTA"]
			abrirPesta(enlace,'Evidencia'); 				
		}
		else {
			alert ("No se ha adjuntado evidencia de esta estrategia");
		}
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	
}


