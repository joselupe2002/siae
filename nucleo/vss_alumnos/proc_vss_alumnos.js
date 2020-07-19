

function impCarta(modulo,usuario,institucion, campus,essuper){
 	 table = $("#G_"+modulo).DataTable();
	 	  
	if (table.rows('.selected').data().length>0) {

		enlace="nucleo/vss_alumnos/carta.php?id="+table.rows('.selected').data()[0]["ID"];
		abrirPesta(enlace,'Carta Presentación');


	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}

      return false;
}

