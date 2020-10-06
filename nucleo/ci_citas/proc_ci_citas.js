
var eluser="";
var lainst="";
var elcam="";

function generaCitas(modulo,usuario,institucion, campus,essuper){


	ventanaConf("grid_ci_citas",usuario,institucion,campus,"",1);

      return false;
}




function eliminaTag(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		if (confirm("Esta seguro de borrar todas las citas con el TAG: "+table.rows('.selected').data()[0]["TAG"]+" No se borrarán las que ya esten solicitadas ")) {
				elsql="delete from ci_citas where TAG='"+table.rows('.selected').data()[0]["TAG"]+"' AND SOLICITANTE=''";						
				parametros={bd:"mysql",sql:elsql,dato:sessionStorage.co};
				$.ajax({
						type: "POST",
						url:"../base/ejecutasql.php",
						data:parametros,
						success: function(dataC){	
							console.log(dataC);			
							window.parent.document.getElementById('FRci_citas').contentWindow.location.reload();
						}					     
				});   //ajax del procedimiento de insercion en falumnos  	
			}
	}
	else {
		alert ("Debe seleccionar el registro que contiene el TAG para eliminar en conjunto");
	}

}