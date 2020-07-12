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





function setCotejado(id,valor,obs){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"eadjreins",
		   campollave:"IDDET",
		   bd:"Mysql",
		   valorllave:id,
		   COTEJADO: valor,
		   OBSCOTEJO:obs
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
		,"Finalizar Proceso", "btnMarcarCotejado('"+table.rows('.selected').data()[0]["IDDET"]+"','"+modulo+"');","modal-sm");
}

function btnMarcarCotejado(id,modulo){
	setCotejado(id,$("#cotejado").val(),$("#obsCotejado").val());
	enviarCorreo(modulo,$("#cotejado").val(),$("#obsCotejado").val());
}




/*======================================Envio de Correos =====================================*/


function enviarCorreo(modulo,cotejado, obs){
	table = $("#G_"+modulo).DataTable();
	elcorreo=table.rows('.selected').data()[0]["CORREO"];
	eltipo=table.rows('.selected').data()[0]["TIPOD"];

	mensaje="<html>Tu pago ha sido <span style=\"color:blue\"><b> VALIDADO </b></span> por el &aacute;rea de Contabilidad, "+
	" ya puedes continuar tu proceso de reinscripci&oacute;n <html>";
	if (cotejado=='N') {mensaje="<html> Tu pago <span style=\"color:red\"> <b> NO SE HA VALIDADO </b></span> por el &aacute;rea de Contabilidad, "+
	                      "presenta las siguientes observaciones: <br/><html>"+obs;}

	//elcorreo='mecatronica@macuspana.tecnm.mx';

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
           console.log(response);
        },
        error : function(error) {
            console.log(error);
            alert ("Error en ajax "+error.toString()+"\n");
        }
	});

}

function envioCorreo(modulo,usuario,essuper) {
	res="";
	var table = $("#G_"+modulo).DataTable();	
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){nreg++;});

	mostrarConfirm2("confirmFinalizar", "grid_"+modulo, "Envio de Correo Electrónico",
		      "<div class=\"row\">"+
			  "    <div class=\"col-sm-6\" style=\"text-align:justify;\">"+
			  "         <span class=\"label label-success\">Tipo de Correo</span><BR/>"+
			  "         <select id=\"opcorreo\" onchange=\"cargaMsj();\">"+
			  "              <option value=\"0\">Elija una opción</option> "+
			  "              <option value=\"1\">Clave y Usuario</option>"+
			  "              <option value=\"2\">Correo General</option>"+
			  "              <option value=\"3\">Aviso Exámen</option>"+
			  "         </select>"+
			  "     </div>"+
			  "    <div class=\"col-sm-6\" style=\"text-align:justify;\">"+
			  "         <span class=\"label label-success\">Correo de Prueba</span>"+
			  "         <input class=\"form-control\" id=\"inpPrueba\" value=\"joselupe_2002@hotmail.com\"></input>"+
			  "    </div>"+
			  "</div>"+
			  "<br/>"+
			  "<div class=\"row\">"+
			  "    <div class=\"col-sm-12\">"+
			  "         <span class=\"label label-primary\">Asunto del Correo</span>"+
			  "         <input class=\"form-control\"  id=\"elasunto\" row=\"20\" style=\"width:100%;\"></input>"+
			  "         <span class=\"label label-success\">Mensaje de Correo</span>"+
			  "         <textarea class=\"form-control\"  id=\"msjCorreo\"  style=\"width:100%; height:100px;\"></textarea>"+
			  "     </div>"+	  
		      "</div>","Enviar Correo", "enviaMail('"+modulo+"');","modal-lg");
}

function cargaMsj(){
	$("#elasunto").val();
	$("#msjCorreo").html();

	if  ($("#opcorreo").val()=='1') {
		$("#elasunto").val("ITSM: ENTREGA DE USUARIO Y CLAVE PARA EXÁMEN DE ADMISIÓN");
		$("#msjCorreo").html("ESTIMADO ASPIRANTE <BR/>\n"+"<b>{NOMBRE} {APEPAT} {APEMAT}</b></BR/></BR/>\n"+
		" EL PRESENTE CORREO ES PARA INDICARLE EL USUARIO Y CLAVE PARA EL EXÁMEN DE ADMISIÓN:<BR/><BR/>\n"+
		" <b>USUARIO:</b>{CURP}<BR/>\n"+
		" <b>CLAVE:</b> {CLAVE}<BR/>\n"+
		" <b>PAGINA</b> :<a href=\"https://escolar.webcoretic.com/admision/\">https://escolar.webcoretic.com/admision/</a><BR/>\n"+
		" <b>FECHA:</b> 03/08/2020<BR/>\n"+
		" <b>HORA:</b> 10:00<BR/><BR/>\n"+
		" <b>POR FAVOR CONSULTE EL MANUAL Y VÍDEO PARA LA APLICACIÓN DEL EXÁMEN DE ADMISIÓN</b></BR/>\n"+
		" <a href=\"https://escolar.webcoretic.com/admision/\">Manual</a><BR/>\n"+
		" <a href=\"https://escolar.webcoretic.com/admision/\">Video</a><BR/>\n"
		);
	}

	if  ($("#opcorreo").val()=='2') {
		$("#elasunto").val("ITSM: LEYENDA DEL ASUNTO");
		$("#msjCorreo").html("PARA UN SALTO DE LINEA USE <br/>\n"+
		" PARA COLOCAR NEGRITAS ENCIERRE ENTRE <b>ESTO VA NEGRITA</b>\n"+
		" PARA COLOCAR INFORMACIÓN DEL ASPIRANTE UN CAMPO {TITULO_COLUMNA} EJEMPLO {NOMBRE}\n"+
		" PARA COLOCAR UN ENLACE <a href=\"https://escolar.webcoretic.com/admision/\">Texto del Enlace</a><BR/>\n"
		);
	}

	if  ($("#opcorreo").val()=='3') {
		$("#elasunto").val("ITSM: INFORMACIÓN SOBRE EXÁMEN DE ADMISIÓN");
		$("#msjCorreo").html("<b>AVISO IMPORTANTE ASPIRANTES AL ITSM</b> <br/><br/>"+
							 "El Instituto Tecnológico Superior de Macuspana atendiendo las "+
							 " disposiciones del Consejo de Salubridad General de nuestro país y con la finalidad "+
							 " de prevenir la propagación del SARS-CoV-2 (COVID-19), comunica a TODOS SUS ASPIRANTES "+
							 " que la aplicación del <b>EXAMEN DE ADMISIÓN</b> se realizará en la <b>MODALIDAD EN LÍNEA,</b> "+
							 " el <b>LUNES 03 DE AGOSTO</b>, para lo que deberá atender las siguientes disposiciones: <br/><br/>"+ 
		
		"1.-  Tener digital o impreso su ficha de ingreso.<br/>"+
		"<br/>2.- Tener la clave de  acceso al examen  que se  les enviará al correo electrónico registrado en su solicitud  de ingreso, con la información necesaria para responder el examen,<br/>"+
		"<br/>3.- Ingresar al examen en línea desde un  dispositivo  electrónico  con  acceso a internet ( PC de escritorio, laptop, tablet o teléfono celular). a través  de la URL <br/>"+
		" <a href=\"https://escolar.macuspana.tecnm.mx/admision/\"> https://escolar.macuspana.tecnm.mx/admision/</a> <br/>"+
		"<br/>4.- El horario del examen es de 9:00 a 13:00 hrs., solicitamos tu puntual  ingreso.<br/>"+
		"<br/>5.- Para dudas y aclaraciones del examen,  vía whatsApp al numero <b> 9361298912 </b> y al correo electrónico <b>escolares@macuspana.tecnm.mx</b><br/>"+
		"<br/>6.- En caso de  interrupción  por   cuestiones  de  internet o energía  eléctrica, el examen guarda las respuestas hasta donde te hayas q uedado y podrás continuar al resolver tu imprevisto técnico.<br/>"+
		"<br/>7.- El examen consta de distintas áreas de conocimiento, por lo que al terminar de responder las preguntas de cada sección, deberás dar click en el botón siguiente para continuar resolviendo el examen. Cuando hayas contestado todas las preguntas, deberás dar click en el botón finalizar  y tu examen se guardara automáticamente.<br/>"+
		"<br/>8.- Publicación de resultados el Martes 04 de agosto de 2020, en nuestra página web <a href=\"https://macuspana.tecnm.mx\"> https://macuspana.tecnm.mx </a> <br/>"+
		
		"<br/><b>Les sugerimos estar atentos a las redes sociales oficiales del instituto.</b><br/>"+
		
		"<b>Facebook: <a href=\"https://www.facebook.com/tecnologico.macuspana.73\"> Itsm Tecnologico Macuspana</b><br/>"+
		"<b>Instragram: itsdemacuspana</b><br/>"
		
		);
	}

}

