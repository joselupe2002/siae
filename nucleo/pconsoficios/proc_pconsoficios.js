

function abrirPeriodo(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	
	if (table.rows('.selected').data().length>0) {
		
		var anio = prompt("Coloque el nuevo año. Se copiará del Año "+table.rows('.selected').data()[0]["PERIODO"], "");

		if (anio != null) {

			sqAse="insert into pconsoficios ( CONS_URES,CONS_ABIERTO,CONS_PRE,CONS_NUMERO,CONS_ANIO,_INSTITUCION,_CAMPUS) "+
			"select CONS_URES,CONS_ABIERTO,CONS_PRE,'1','"+anio+"',_INSTITUCION,_CAMPUS FROM pconsoficios WHERE CONS_ANIO='"+table.rows('.selected').data()[0]["PERIODO"]+"'";
		
			parametros={
				bd:"mysql",
				sql:sqAse,
				dato:sessionStorage.co				
			};

			$.ajax({
				type: "POST",
				url:"../base/ejecutasql.php",
				data:parametros,
				success: function(dataC){
				
					window.parent.document.getElementById('FRpconsoficios').contentWindow.location.reload();
				}
			});
						
			
		 	
		}
	}
	else {
		alert ("Debe seleccionar un registro, para identificar el año que desea copiar");
		return 0;

		}  
	    
}
