

function verMapa(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		location.href="../mapas/mapagrafico.php?mapa="+table.rows('.selected').data()[0]["Clave"];
	}
	else {
		alert ("Debe seleccionar un Mapa Curricular");
		return 0;

		}
	
}




function copiarMapa(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		
			bootbox.prompt("Clave del Mapa Nuevo", function(result) {
				if (!(result === null)) {
					$.ajax({
				        type: "GET",
				           url:  "../mapas/copiaMapa.php?bd=Mysql&origen="+table.rows('.selected').data()[0][0]+"&copia="+result,
				           success: function(data){  
				        	   if (data.length>0) {alert (data);}
				        	   else {alert ("El mapa ha sido clonado "); location.reload();}
				        	   
			               }
				    });
				}
			});


		
		/*
		
	   
		  */
	}
	else {
		alert ("Debe seleccionar un Mapa Curricular");
		return 0;

		}
	
}