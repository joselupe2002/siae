function setCerrado(id,valor,actualiza){
	 $('#dlgproceso').modal({show:true, backdrop: 'static'});	 
		parametros={
			tabla:"iso_mejoras",
			campollave:"CERRADO",
			bd:"Mysql",
			valorllave:id,
			DESC_ABIERTA: valor
		};
		$.ajax({
		type: "POST",
		url:"actualiza.php",
		data: parametros,
		success: function(data){
			$('#dlgproceso').modal("hide"); 
			if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
			//else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
			if (actualiza) {
			    window.parent.document.getElementById('FRviso_mejoras').contentWindow.location.reload();
			}
		}					     
		});    	                
}


function setVerificado(id,valor,actualiza){
	$('#dlgproceso').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"iso_mejoras",
		   campollave:"VERIFICADO",
		   bd:"Mysql",
		   valorllave:id,
		   VISIBLE: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   if (actualiza) {
			   window.parent.document.getElementById('FRvedescarga').contentWindow.location.reload();
		   }
	   }					     
	   });    	                
}


function abrircerrarMejora(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["CERRADO"]=='N') {
			if (confirm("Desea Cerrar las acciones de Mejora: "+table.rows('.selected').data()[0]["ID"])) {
				setCerrado(table.rows('.selected').data()[0][0],"S",true);
			}
		}
		else {
			if (confirm("La Acción de Mejora: "+table.rows('.selected').data()[0]["ID"]+" Esta Cerrada ¿Desea abrir la acción de mejora?")) {
				setCerrado(table.rows('.selected').data()[0][0],"N",true);
			}
		} 
	 
	}
	else {
		alert ("Debe seleccionar una acción de mejora");
		return 0;

		}
	
}




function addAcciones(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	elsql="SELECT * FROM viso_acciones WHERE IDMEJORA='"+table.rows('.selected').data()[0]["ID"]+"'";
	sqlper="SELECT EMPL_NUMERO, CONCAT(EMPL_NUMERO,' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS NOMBRE FROM pempleados where EMPL_ACTIVO='S'";
	
	var campos = [{campo: "ACCION",etiqueta:"Acción a Realizar",titulo:"ACCION",tipo:"PARRAFO",sql:"",descripselec:"",obligatorio:true}, 
				  {campo: "RESPONSABLE",etiqueta:"Reponsable de la Acción",titulo:"RESPONSABLE",tipo:"SELECTBUS",sql:sqlper,descripselec:"RESPONSABLED",obligatorio:true},
				  {campo: "VERIFICA",etiqueta:"Persona que verifica la acción",titulo:"VERIFICA",tipo:"SELECTBUS",sql:sqlper,descripselec:"VERIFICAD",obligatorio:true},
				  {campo: "FECHA",etiqueta:"Fecha en la que se realizará",titulo:"FECHA",tipo:"FECHA",sql:"",descripselec:"",obligatorio:false},
				  {campo: "EVIDENCIA",etiqueta:"Evidencia de acción",titulo:"EVIDENCIA QUE SE REPORTA DE LA ACCIÓN",tipo:"ARCHIVO",sql:"",descripselec:"",obligatorio:false}];
	
	generaMaestroDetalle(modulo,"iso_acciones",table.rows('.selected').data()[0]["ID"],
	                     "IDMEJORA",campos,table.rows('.selected').data()[0]["DESCRIPCION"],elsql,"ID",institucion,campus,usuario);
				 
	
}



function mejorareporte(modulo,usuario,institucion, campus,essuper){	
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		enlace="nucleo/viso_mejoras/reporteMejora.php?id="+table.rows('.selected').data()[0]["ID"];
		abrirPesta(enlace, "OficioEnt");
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;
		}
	}