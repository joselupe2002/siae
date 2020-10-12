

function verSolicitud(modulo,usuario,institucion, campus,essuper){
 	 table = $("#G_"+modulo).DataTable();
	 	  
	  if (table.rows('.selected').data().length>0) {
		enlace="nucleo/pa_residencia/formato.php?id="+table.rows('.selected').data()[0]["ID"];
		abrirPesta(enlace, "Sol. Proyecto");
		$('#modalDocument').modal("hide");  

	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}

      return false;
}



function setAutorizado(id,valor){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"rescapproy",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:id,
		   VALIDADO: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   window.parent.document.getElementById('FRvrescapproy').contentWindow.location.reload();
	   }					     
	   });    	                
}


function autorizar (modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        if (table.rows('.selected').data()[0]["VALIDADO"]=='S') {
			if (confirm("El proyecto esta Autorizado ¿Desea NO Autorizar/Validar el Proyecto de  "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"]+"?")) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"N");
			}
		}
		else {
			if (confirm("Desea Autorizar/Validar el Proyecto de  "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"])) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"S");
			}
		} 

	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
}

function verAdjCap  (modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		residencia_mostrarAdjuntos(modulo,usuario,institucion, campus,essuper,table.rows('.selected').data()[0]["CICLO"]);
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	
}