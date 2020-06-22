
function imprimeDiploma(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
	    elid=table.rows('.selected').data()[0][0];
		window.open("../vecertespecialidad/certespecialidad.php?matricula="+table.rows('.selected').data()[0]["MATRICULA"]+
		"&id="+table.rows('.selected').data()[0]["ID"], '_blank');
	    return false;
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;
		}
   
}




