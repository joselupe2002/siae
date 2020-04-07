

function impJustifica(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	window.open("../vejustifica/justificante.php?id="+table.rows('.selected').data()[0][0]+"&tipo=0", '_blank');
    return false;
	
}


function correoJustifica(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	window.open("../vejustifica/justificante.php?id="+table.rows('.selected').data()[0][0]+"&tipo=1", '_blank');
    return false;
	
}


function selladoJustifica(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	window.open("../vejustifica/justificante.php?id="+table.rows('.selected').data()[0][0]+"&tipo=2", '_blank');
    return false;
	
}
