var table;
var nreg=0;
var elReg=0;


function setAutorizado(id,valor){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"prorrogas",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:id,
		   AUTORIZADA: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   window.parent.document.getElementById('FRvprorrogas').contentWindow.location.reload();
	   }					     
	   });    	                
}


//Actualiza Usuario 
function Autorizar(modulo,usuario,institucion, campus,essuper) {
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        if (table.rows('.selected').data()[0]["AUTORIZADA"]=='S') {
			if (confirm("Desea DESAUTORIZAR PRORROGA DE: "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"])) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"N");
			}
		}
		else {
			if (confirm("Desea AUTORIZAR PRORROGA DE: "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"])) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"S");
			}
		} 

	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}    
}



function impFormato(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	fila=table.rows('.selected').data();
	enlace="nucleo/vprorrogas/formato.php?id="+fila[0]["ID"];
	abrirPesta(enlace, "Formato")
	
   //window.open(enlace, '_blank'); 
  }


function envioCorreoAlum(modulo,usuario,essuper) {
	getVentanaCorreo("pinscripcion","CORREO");
	
}