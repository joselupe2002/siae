
//tipo 0 Oficio sin sello y firma 
//tipo 1 Oficio Con sello y firma 
//tipo 2 Oficio con sello y firma y enviar al correo

function constancia(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
	    elid=table.rows('.selected').data()[0][0];
	    window.open("../eventos_ins/constancia"+table.rows('.selected').data()[0]["CLAVE"]+".php?ID="+table.rows('.selected').data()[0]["CLAVE"]+"_"+elid, '_blank');
	    return false;
	}
	else {
		alert ("Debe seleccionar una actividad complementaria para determinar la carrera ");
		return 0;
		}
   
}




