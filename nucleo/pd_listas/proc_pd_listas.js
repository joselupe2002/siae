

function expLista(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
	    window.open("../pd_listas/explistas.php?materia="+table.rows('.selected').data()[0]["MATERIA"]+
	    		"&grupo="+table.rows('.selected').data()[0]["GRUPO"]+
	    		"&letra="+table.rows('.selected').data()[0]["SIE"]+
	    		"&profesor="+table.rows('.selected').data()[0]["PROFESOR"], '_blank');
        return false;
	}
	else {
		alert ("Debe seleccionar una asignatura");
		return 0;
		}
	
}

