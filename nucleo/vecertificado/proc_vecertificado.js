
function imprimeCertificado(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
	    elid=table.rows('.selected').data()[0][0];
		window.open("../vecertificado/certificado.php?matricula="+table.rows('.selected').data()[0]["MATRICULA"]+
		"&folio="+table.rows('.selected').data()[0]["FOLIO"], '_blank');
	    return false;
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;
		}
   
}




