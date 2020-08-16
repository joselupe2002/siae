var nreg=0;
var elReg=0;


function verPagosGen(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		 window.open(table.rows('.selected').data()[0]["RUTA"], '_blank'); 
	    
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
}


function setCotejado(id,valor,obs, eluser){
	fecha=dameFecha("FECHAHORA");
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"eadjreins",
		   campollave:"IDDET",
		   bd:"Mysql",
		   valorllave:id,
		   COTEJADO: valor,
		   OBSCOTEJO:obs,
		   FECHACOTEJO:fecha,
		   USERCOTEJO:eluser
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   window.parent.document.getElementById('FRvcotejarpagos').contentWindow.location.reload();
	   }					     
	   });    	
	   
	//grabamos en dlista por si ya se reinscribio el alumno 
	
}



function CotejarPago (modulo,usuario,essuper){
	    table = $("#G_"+modulo).DataTable();
		$("#confirmCotejado").empty();
		mostrarConfirm("confirmCotejado", "grid_vcotejarpagos",  "Proceso de Cotejo",
		"<span class=\"label label-success\">Observaciones</span>"+
		"     <textarea id=\"obsCotejado\" style=\"width:100%; height:100%; resize: none;\">"+table.rows('.selected').data()[0]["OBSCOTEJO"]+"</textarea>",
		"¿Marcar como Cotejado? "+
		"<SELECT id=\"cotejado\"><OPTION value=\"S\">SI</OPTION><OPTION value=\"N\">NO</OPTION></SELECT>"
		,"Finalizar Proceso", "btnMarcarCotejado('"+table.rows('.selected').data()[0]["IDDET"]+"','"+modulo+"','"+usuario+"');","modal-sm");
}

function btnMarcarCotejado(id,modulo,eluser){
	setCotejado(id,$("#cotejado").val(),$("#obsCotejado").val(),eluser);
	enviarCorreo(modulo,$("#cotejado").val(),$("#obsCotejado").val(),table.rows('.selected').data()[0]["TIPOD"]);

	//Materias de las carreras 
	if (($("#cotejado").val()=='S') && (table.rows('.selected').data()[0]["TIPO"]=='N')) {
		enviarCorreoJefe(modulo,$("#cotejado").val(),$("#obsCotejado").val(),
					 table.rows('.selected').data()[0]["MATRICULA"],
					 table.rows('.selected').data()[0]["NOMBRE"]);
	}
	// Materias de Inglés 
	if (($("#cotejado").val()=='S') && (table.rows('.selected').data()[0]["TIPO"]=='I')) {
		enviarCorreoIngles(modulo,$("#cotejado").val(),$("#obsCotejado").val(),
					 table.rows('.selected').data()[0]["MATRICULA"],
					 table.rows('.selected').data()[0]["NOMBRE"]);
	}


}




/*======================================Envio de Correos =====================================*/


function enviarCorreo(modulo,cotejado, obs, tipo){
	table = $("#G_"+modulo).DataTable();
	elcorreo=table.rows('.selected').data()[0]["CORREO"];
	eltipo=table.rows('.selected').data()[0]["TIPOD"];

	mensaje="<html>Tu pago "+tipo+" ha sido <span style=\"color:blue\"><b> VALIDADO </b></span> por el &aacute;rea de Contabilidad, "+
	" ya se podia continuar con el proceso para ofrecerte el servicio soclitado. <html>";
	if (cotejado=='N') {mensaje="<html> Tu pago <span style=\"color:red\"> <b> NO SE HA VALIDADO </b></span> por el &aacute;rea de Contabilidad, "+
	                      "presenta las siguientes observaciones: <br/><html>"+obs;}

	//=================para las pruebas ==================
	//elcorreo='mecatronica@macuspana.tecnm.mx';
   //========================================================
    var parametros = {
		"MENSAJE": mensaje,
		"ADJSERVER": 'N',
		"ASUNTO": 'ITSM: STATUS DE PAGO DE '+eltipo,
		"CORREO" :  elcorreo,
		"NOMBRE" :  table.rows('.selected').data()[0]["NOMBRE"],
		"ADJUNTO":''
    };

    $.ajax({
        data:  parametros,
        type: "POST",
        url: "../base/enviaCorreo.php",
        success: function(response)
        {
           console.log("ALUMNO: "+response);
        },
        error : function(error) {
            console.log(error);
            alert ("Error en ajax "+error.toString()+"\n");
        }
	});

}



function enviarCorreoJefe(modulo,cotejado, obs, matricula, nombre){			
		table = $("#G_"+modulo).DataTable();
		elcorreoalum=table.rows('.selected').data()[0]["CORREO"];
		telalum=table.rows('.selected').data()[0]["TELEFONO"];
		eltipo=table.rows('.selected').data()[0]["TIPOD"];
	    elsql="select EMPL_CORREOINS from falumnos a, fures b, pempleados c "+
			  " where ALUM_MATRICULA='"+matricula+"' AND ALUM_CARRERAREG=b.CARRERA and b.URES_JEFE=c.EMPL_NUMERO";
	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){   
	
				elcorreo=JSON.parse(data)[0][0];
				mensaje="<html>El pago del alumno <span style=\"color:green\"><b>"+matricula+" "+nombre+"</b></span> ha sido "+
				"<span style=\"color:blue\"><b> VALIDADO </b></span> por el &aacute;rea de Contabilidad, "+
				" ya se puede realizar su proceso de reinscripci&oacute;n <BR>"+
				"<b>Datos de contacto del alumno:</b><br>"+
				"<b>Correo:</b>"+elcorreoalum+"<br>"+
				"<b>Correo:</b>"+telalum+"<br>"+
				" <html>";

				var parametros = {
					"MENSAJE": mensaje,
					"ADJSERVER": 'N',
					"ASUNTO": 'ITSM: PAGO DE REINSCRIPCIÓN COTEJADO DE '+matricula+" "+nombre,
					"CORREO" :  elcorreo,
					"NOMBRE" :  table.rows('.selected').data()[0]["NOMBRE"],
					"ADJUNTO":''
				};
			
				$.ajax({
					data:  parametros,
					type: "POST",
					url: "../base/enviaCorreo.php",
					success: function(response)
					{
					   console.log("JEFE: "+response);
					},
					error : function(error) {
						console.log(error);
						alert ("Error en ajax "+error.toString()+"\n");
					}
				});

				
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
				$('#dlgproceso').modal("hide");  
			}
		}); 	    

}




function enviarCorreoIngles(modulo,cotejado, obs, matricula, nombre){		
		
	table = $("#G_"+modulo).DataTable();
	elcorreoalum=table.rows('.selected').data()[0]["CORREO"];
	telalum=table.rows('.selected').data()[0]["TELEFONO"];
	eltipo=table.rows('.selected').data()[0]["TIPOD"];
	elsql="select EMPL_CORREOINS from fures b, pempleados c where URES_URES=601 and b.URES_JEFE=c.EMPL_NUMERO";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
	type: "POST",
	data:parametros,
	url:  "../base/getdatossqlSeg.php",
	success: function(data){   
	
			elcorreo=JSON.parse(data)[0][0];
			mensaje="<html>El pago de Inglés de <span style=\"color:green\"><b>"+matricula+" "+nombre+"</b></span> ha sido "+
			"<span style=\"color:blue\"><b> VALIDADO </b></span> por el &aacute;rea de Contabilidad, "+
			" ya se puede realizar su proceso de reinscripci&oacute;n a Inglés <BR>"+
			"<b>Datos de contacto del alumno:</b><br>"+
			"<b>Correo:</b>"+elcorreoalum+"<br>"+
			"<b>Correo:</b>"+telalum+"<br>"+
			" <html>";

			var parametros = {
				"MENSAJE": mensaje,
				"ADJSERVER": 'N',
				"ASUNTO": 'ITSM: PAGO COTEJADO DE INGLÉS DE '+matricula+" "+nombre,
				"CORREO" :  elcorreo,
				"NOMBRE" :  table.rows('.selected').data()[0]["NOMBRE"],
				"ADJUNTO":''
			};
		
			$.ajax({
				data:  parametros,
				type: "POST",
				url: "../base/enviaCorreo.php",
				success: function(response)
				{
				   console.log("JEFE INGLÉS: "+response);
				},
				error : function(error) {
					console.log(error);
					alert ("Error en ajax "+error.toString()+"\n");
				}
			});

			
	},
	error: function(data) {	                  
			alert('ERROR: '+data);
			$('#dlgproceso').modal("hide");  
		}
	}); 	    

}









