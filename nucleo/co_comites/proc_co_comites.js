
function setAutorizado(id,valor,usuario,institucion,campus){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"co_comites",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:id,
		   ABIERTO: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   window.parent.document.getElementById('FRco_comites').contentWindow.location.reload();
	   }					     
	   });    	                
}



function abrircerrarCom(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        if (table.rows('.selected').data()[0]["ABIERTO"]=='S') {
			if (confirm("Desea Cerrar la sesión de Comite "+table.rows('.selected').data()[0]["ID"])) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"N",usuario,institucion,campus);
			}
		}
		else {
			if (confirm("Desea Abrir la sesión de Comite "+table.rows('.selected').data()[0]["ID"])) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"S",usuario,institucion,campus);
			}
		} 
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;
		}
	
}
