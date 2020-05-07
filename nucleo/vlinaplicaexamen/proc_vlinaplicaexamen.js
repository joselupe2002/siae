

function impExamen(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	window.open("../vlinaplicaexamen/examen.php?idaplica="+table.rows('.selected').data()[0][0]+
	            "&idexamen="+table.rows('.selected').data()[0][1], '_blank');
    return false;
	
}


function previewExa(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	var url="../vlinaplicaexamen/examenprev.php?idaplica="+table.rows('.selected').data()[0][0]+"&idexamen="+table.rows('.selected').data()[0][1]   	 
	window.open(url, '_blank');
    return true;
	
}


