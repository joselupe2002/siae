

function verCarta(modulo,usuario,institucion, campus,essuper){
 	 table = $("#G_"+modulo).DataTable();
	 	  
	if (table.rows('.selected').data().length>0) {

		enlace="nucleo/vrespropuestas/carta.php?id="+table.rows('.selected').data()[0]["ID"];
		abrirPesta(enlace,'Carta Presentación');


	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}

      return false;
}



function setFinalizado(id,valor){
	lafecha=dameFecha("FECHAHORA");
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"respropuestas",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:id,
		   ENVIADA: valor,
		   FECHAENVIADA:lafecha 
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   window.parent.document.getElementById('FRvrespropuestas').contentWindow.location.reload();
	   }					     
	   });    	                
}



function marcarEnviado(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        if (table.rows('.selected').data()[0]["ENVIADA"]=='N') {
			if (confirm("Desea Marcar como enviado el registro No.  "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"])) {
				setFinalizado(table.rows('.selected').data()[0]["ID"],"S");
			}
		}
		else {
			if (confirm("El proceso de : "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"]+" esta Enviada ¿desea cambiarlo a No Enviada?")) {
				setFinalizado(table.rows('.selected').data()[0]["ID"],"N");
			}
		} 

	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	}




	
function veradjprop  (modulo,usuario,institucion, campus,essuper){

	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		residencia_mostrarAdjuntos(modulo,usuario,institucion, campus,essuper,table.rows('.selected').data()[0]["CICLO"]);
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}

}
