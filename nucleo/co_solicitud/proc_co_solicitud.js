
function setAutorizado(id,valor,usuario,institucion,campus){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"co_solicitud",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:id,
		   AUTJEFE: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   if (valor=='S') {addStatusComite(id,"AUTORIZADA POR JEFE DE DIV.",usuario,institucion,campus); }
		   window.parent.document.getElementById('FRco_solicitud').contentWindow.location.reload();
	   }					     
	   });    	                
}



function autorizarSol(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        if (table.rows('.selected').data()[0]["AUTJEFE"]=='S') {
			if (confirm("Desea Des-Autorizar la solicitud "+table.rows('.selected').data()[0]["ID"])) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"N",usuario,institucion,campus);
			}
		}
		else {
			if (confirm("Desea Autorizar la solicitud "+table.rows('.selected').data()[0]["ID"])) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"S",usuario,institucion,campus);
			}
		} 

	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;
		}
	
}


function impSol (modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		enlace="nucleo/co_solicitud/solicitud.php?id="+table.rows('.selected').data()[0]["ID"];
		abrirPesta(enlace, "Sol. Com."+table.rows('.selected').data()[0]["ID"]);
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;
		}

}


function asignarComite(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	ladefault="..\\..\\imagenes\\menu\\pdf.png";
	if (table.rows('.selected').data().length>0) {
		

	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}
}



