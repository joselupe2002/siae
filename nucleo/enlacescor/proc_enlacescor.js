

function verEnlace(modulo,id,tipo){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {				
				elid=table.rows('.selected').data()[0][0];							
				enlace="http://"+location.host+"/wb.php?w="+elid;
				grabarEnlace(elid,enlace);
				alert (enlace);
				return false;			
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;
		}
}



function grabarEnlace(id,valor){

		parametros={
			tabla:"enlacescor",
			bd:"Mysql",
			campollave:"ID",
			valorllave:id,		
			CORTO:"<a href=\""+valor+"\" target=\"_blank\">"+valor+"</a>"

			//CORTO:valor
		};
		$.ajax({
			type: "POST",
			url:"../base/actualiza.php",
			data: parametros,
			success: function(data){  
				console.log(data);
				window.parent.document.getElementById('FRenlacescor').contentWindow.location.reload();      			        	
				}					 
		});				     
}
