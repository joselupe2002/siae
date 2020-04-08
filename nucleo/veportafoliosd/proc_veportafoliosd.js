




function verPortafoliod(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["RUTA"]) {
			window.open(table.rows('.selected').data()[0]["RUTA"], '_blank');
		}
		else {
			alert ("No se ha adjuntando Portafolio de Evidencia")
			}
		}
	else {
		alert ("Debe seleccionar a un profesor");
		return 0;

		}
	
}


