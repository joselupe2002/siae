
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
		if (table.rows('.selected').data()[0]["AUTJEFE"]=='S') {
				if (table.rows('.selected').data()[0]["NUMCOMITE"]==0) {
					mostrarConfirm2("pagonew","grid_co_solicitud","Comité Académico","<div id=\"contComite\" "+
					"style=\"text-justify:left;\"></div>","Agregar",
					"agregarComite('"+table.rows('.selected').data()[0]["ID"]+"','"+usuario+"','"+institucion+"','"+campus+"');");

					$("#contComite").append("<span class=\"label label-danger\">Elija el Comité Académico</span>");
					addSELECT("selComites","contComite","PROPIO", "SELECT ID, DESCRIP FROM co_comites where ABIERTO='S' order by ID DESC", "","");  	
				}
				else {alert ("El número de solicitud "+table.rows('.selected').data()[0]["ID"]+" Ya esta asignada a un comité")}
			}
		else {
			alert ("No puede asignar comité si no ha autorizado antes");
		}
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;
		}
}


function agregarComite(id,usuario,institucion,campus) {

	if ($("#selComites").val()>0) {
	var hoy= new Date();		
	var elanio=hoy.getFullYear();
    $.ajax({
			type: "POST",
			url:"../base/getConsecutivo.php?tabla=econsoficial&campok=concat(TIPO,ANIO)&campocons=CONSECUTIVO&valork="+"CASOCOMITE"+elanio,
			success: function(dataC){
				micons=dataC;							
				micaso="ITSM-"+elanio+"-"+micons;		
				parametros={
					tabla:"co_solicitud",
					campollave:"ID",
					bd:"Mysql",
					valorllave:id,
					COMITE: $("#selComites").val(),
					NUMCOMITE:micaso
				};
				$.ajax({
				type: "POST",
				url:"actualiza.php",
				data: parametros,
				success: function(data){
					$('#dlgproceso').modal("hide"); 
					if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
					addStatusComite(id,"ASIGNADO A COMITE "+$("#selComites option:selected").text()+" No."+micaso,usuario,institucion,campus); 
					window.parent.document.getElementById('FRco_solicitud').contentWindow.location.reload();
				}					     
				});    	  
				
				
			} 					     
	   }); //ajax de actualizacion   	
	}
	else alert ("Debe elegir un comité") ;               
}


function actaComite(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	ladefault="..\\..\\imagenes\\menu\\pdf.png";
	if (table.rows('.selected').data().length>0) {
		enlace="nucleo/co_elcomite/actacomite.php?id="+table.rows('.selected').data()[0]["COMITE"];
		abrirPesta(enlace, "Sol. Com."+table.rows('.selected').data()[0]["ID"]);
	
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}
}



function setAutorizadoDir(id,valor,usuario,institucion,campus){
	lafecha=dameFecha("FECHAHORA");
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"co_solicitud",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:id,
		   AUTDIR: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   if (valor=='S') {addStatusComite(id,"TU CASO FUE AUTORIZADO POR DIRECION GENERAL "+lafecha,usuario,institucion,campus); }
		   if (valor=='N') {addStatusComite(id,"TU CASO NO FUE AUTORIZADO POR DIRECION GENERAL "+lafecha,usuario,institucion,campus); }
		   window.parent.document.getElementById('FRco_solicitud').contentWindow.location.reload();
	   }					     
	   });    	                
}


function autorizarDir(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		if (table.rows('.selected').data()[0]["AUTCOMITE"]=='S') {
        		if (table.rows('.selected').data()[0]["AUTDIR"]=='S') {
			
					if (confirm("Desea Des-Autorizar la solicitud "+table.rows('.selected').data()[0]["ID"])) {
						setAutorizadoDir(table.rows('.selected').data()[0]["ID"],"N",usuario,institucion,campus);
					}
				}
				else {
					if (confirm("Desea Autorizar la solicitud "+table.rows('.selected').data()[0]["ID"])) {
						setAutorizadoDir(table.rows('.selected').data()[0]["ID"],"S",usuario,institucion,campus);
					}
				} 
		} 
		else { alert ("El comité académico no recomendo este caso");}
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;
		}
	
}




function impAutDG (modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		enlace="nucleo/co_solicitud/autorizacion.php?id="+table.rows('.selected').data()[0]["ID"]+"&tipo=0";
		abrirPesta(enlace, "Aut."+table.rows('.selected').data()[0]["ID"]);
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;
		}

}


function impAutDGSello (modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		enlace="nucleo/co_solicitud/autorizacion.php?id="+table.rows('.selected').data()[0]["ID"]+"&tipo=1";
		abrirPesta(enlace, "Aut."+table.rows('.selected').data()[0]["ID"]);
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;
		}

}
