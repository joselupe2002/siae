var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+") union select '%', 'TODOS' from dual", "",""); 			
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });



		$("#losciclos2").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclo","losciclos2","PROPIO", "SELECT CICL_CLAVE, concat(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by CICL_CLAVE DESC", "","");  	
		
		
	
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {

		//if (elemento=='selAlumnos') {$("#informacion").empty(); cargarInformacion();}

		}  



    function cargarInformacion(){

		mostrarEspera("esperaInf","grid_ss_solicitudes","Cargando Datos...");
		
		elsql="select  distinct(substring_index(`a`.`AUX`, '_', 1)) as MATRICULA, "+
				"CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE,"+
				"ALUM_CARRERAREG AS CARRERA,	CARR_DESCRIP AS CARRERAD, "+
				"(SELECT RUTA FROM eadjreins where AUX=concat(ALUM_MATRICULA,'_','"+$("#selCiclo").val()+"','_','SS_SOLSS')) AS RUTASOLSS, "+
				"(SELECT RUTA FROM eadjreins where AUX=concat(ALUM_MATRICULA,'_','"+$("#selCiclo").val()+"','_','SS_PAGOCONS')) AS RUTAPAGOCONS, "+
				"(SELECT RUTA FROM eadjreins where AUX=concat(ALUM_MATRICULA,'_','"+$("#selCiclo").val()+"','_','SS_CARTACOM')) AS RUTACARTACOM, "+
				"(SELECT RUTA FROM eadjreins where AUX=concat(ALUM_MATRICULA,'_','"+$("#selCiclo").val()+"','_','SS_PAGOAPERSS')) AS RUTAPAGOAPERSS,"+
				"getAvanceCred(ALUM_MATRICULA) as AVANCE,"+
				"(SELECT COUNT(*) from ss_alumnos where MATRICULA=substring_index(`a`.`AUX`, '_', 1) and CICLO=substring_index(substring_index(`a`.`AUX`, '_', 2), '_', - 1)) AS ESTA"+
				" from eadjreins a, falumnos b, ccarreras c "+
				" where  substring_index(substring_index(`a`.`AUX`, '_', 2), '_', - 1)='"+$("#selCiclo").val()+"'"+
				" AND substring_index(`a`.`AUX`, '_', 1)=ALUM_MATRICULA"+
				" AND ALUM_CARRERAREG=CARR_CLAVE"+ 
				" AND ALUM_CARRERAREG LIKE '"+$("#selCarreras").val()+"'"+
				" AND substring_index(substring_index(`a`.`AUX`, '_', - 2), '_', - 1) IN ('SOLSS')"+
				" ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){    
			    if (JSON.parse(data).length>0) {
						laCarrera=JSON.parse(data)[0]["CARRERA"]; 
						generaTablaInformacion(JSON.parse(data));   
						ocultarEspera("esperaInf");  }
				else { ocultarEspera("esperaInf");  }   	     		   
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
				$('#dlgproceso').modal("hide");  
			}
		}); 					  		
}


function generaTablaInformacion(grid_data){
	c=0;

	script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\" "+
				">";
	$("#informacion").empty();
	$("#informacion").append(script);
				
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	$("#tabInformacion").append("<thead><tr id=\"headMaterias\">"+
	"<th style=\"text-align: center;\">No.</th>"+ 
	"<th style=\"text-align: center;\">MATRICULA</th>"+
	"<th style=\"text-align: center;\">NOMBRE</th>"+
	"<th style=\"text-align: center;\">SOL.</th>"+
	"<th style=\"text-align: center;\">PAGO CONS.</th>"+
	"<th style=\"text-align: center;\">CARTA COMP.</th>"+
	"<th style=\"text-align: center;\">PAGO APER.</th>"+
	"<th style=\"text-align: center;\">AVANCE</th>"+
	"<th style=\"text-align: center;\">REGISTRADO</th>"+
	"<th style=\"text-align: center;\">KARDEX</th>"+
	"<th style=\"text-align: center;\">REGISTRO</th>"
	//"<th style=\"text-align: center;\">CARTA</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 cont=1;
	 jQuery.each(grid_data, function(clave, valor) { 	
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+cont+"\">"); 
		 $("#row"+cont).append("<td>"+cont+"</td>");    	
		 $("#row"+cont).append("<td>"+valor.MATRICULA+"</td>");    
		 $("#row"+cont).append("<td>"+valor.NOMBRE+"</td>");         	    
		 
		 img1="../../imagenes/menu/pdf.png"; laruta1=valor.RUTASOLSS;
		 if ((valor.RUTASOLSS=="") || (valor.RUTASOLSS==null)) {img1="../../imagenes/menu/pdfno.png"; laruta1="../../imagenes/menu/pdfno.png";}
		 $("#row"+cont).append("<td><a target=\"_blank\"href=\""+laruta1+"\"><img width=\"25px\" height=\"25px\" src=\""+img1+"\"></img></a></td>");

		 img2="../../imagenes/menu/pdf.png"; laruta2=valor.RUTAPAGOCONS;
		 if ((valor.RUTAPAGOCONS=="") || (valor.RUTAPAGOCONS==null)) {img1="../../imagenes/menu/pdfno.png"; laruta2="../../imagenes/menu/pdfno.png";}
		 $("#row"+cont).append("<td><a target=\"_blank\"href=\""+laruta2+"\"><img width=\"25px\" height=\"25px\" src=\""+img2+"\"></img></a></td>");

		 img3="../../imagenes/menu/pdf.png"; laruta3=valor.RUTACARTACOM;
		 if ((valor.RUTACARTACOM=="") || (valor.RUTACARTACOM==null)) {img3="../../imagenes/menu/pdfno.png"; laruta3="../../imagenes/menu/pdfno.png";}
		 $("#row"+cont).append("<td><a target=\"_blank\"href=\""+laruta3+"\"><img width=\"25px\" height=\"25px\" src=\""+img3+"\"></img></a></td>");

		 img4="../../imagenes/menu/pdf.png"; laruta4=valor.RUTAPAGOAPERSS;
		 if ((valor.RUTAPAGOAPERSS=="") || (valor.RUTAPAGOAPERSS==null)) {img4="../../imagenes/menu/pdfno.png"; laruta4="../../imagenes/menu/pdfno.png";}
		 $("#row"+cont).append("<td><a target=\"_blank\"href=\""+laruta4+"\"><img width=\"25px\" height=\"25px\" src=\""+img4+"\"></img></a></td>");		

		 $("#row"+cont).append("<td><span class=\"badge badge-success\">"+valor.AVANCE+" % </span></td>");

		 cadesta="<i class=\"ace-icon red fa  fa-times-circle-o bigger-200\"></i>";
		 if (valor.ESTA>0) { cadesta="<i class=\"ace-icon green fa fa-check-circle-o bigger-200\"></i>";}
		 $("#row"+cont).append("<td>"+cadesta+"</td>"); 

		 
		 $("#row"+cont).append("<td><button title=\"Ver Kardex del Alumno\" "+
		 " onclick=\"window.open('../avancecurri/kardex.php?matricula="+valor.MATRICULA+"','_blank');\" class=\"btn btn-white btn-info btn-round\">"+ 
		 " <i class=\"ace-icon blue fa fa-list-alt bigger-140\"></i><span class=\"btn-small\"></span>"+            
		  "</button></td>");		 
	
		  btnReg="";
		  if (valor.ESTA>0) { btnReg="class=\"hide\"";}
		 $("#row"+cont).append("<td><button "+btnReg+" title=\"Registrar al alumnos al servicio social\" "+
							" id=\"btnReg"+valor.MATRICULA+"\" onclick=\"registrarAlumno('"+valor.MATRICULA+"','"+valor.NOMBRE+"','"+valor.AVANCE+"');\" class=\"btn btn-white btn-info btn-round\">"+ 
							" <i class=\"ace-icon green fa fa-pencil bigger-140\"></i><span class=\"btn-small\">"+
							" Registrar</span>"+            
							"</button></td>");	

		/*
		btnCarta="";
		if (valor.ESTA<=0) { btnCarta="class=\"hide\"";}
		$("#row"+cont).append("<td><button "+btnCarta+"  title=\"Emitir Carta de Presentación\" "+
								" id=\"btnCarta"+valor.MATRICULA+"\" onclick=\"cartaPresenta('"+valor.MATRICULA+"','"+valor.NOMBRE+"','"+valor.AVANCE+"');\" class=\"btn btn-white success btn-info btn-round\">"+ 
								" <i class=\"ace-icon blue fa fa-file-text bigger-140\"></i><span class=\"btn-small\">"+
								" Carta</span>"+            
								"</button></td>");	
		*/

		$("#row"+cont).append("</tr>");
		cont++;
	 });
	$('#dlgproceso').modal("hide"); 
}	



function ImprimirReporte(){
	enlace="nucleo/reinscripciones/boletaMat.php?carrera="+laCarrera+"&matricula="+usuario+"&ciclod=&ciclo="+$('#selCiclo').val();
	abrirPesta(enlace,"Reporte_Horario");
}


function registrarAlumno (matricula,nombre,avance) {
	script="<div class=\"modal fade\" id=\"regSS\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	"   <div class=\"modal-dialog modal-lg\"  role=\"document\">"+
	"      <div class=\"modal-content\">"+
	"          <div class=\"modal-header primary\" >"+
	"             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	"                  <span aria-hidden=\"true\">&times;</span>"+
	"             </button>"+
	"             <span><i class=\"menu-icon fa fa-pencil \"></i><span class=\" fontRobotoB bigger-130 text-success\"> <strong>Registrando: "+matricula+" "+nombre+"</strong></span></span>"+	   
	"          </div>"+
	"          <div id=\"body_regSS\" class=\"modal-body\"  style=\"height:300px; overflow-y: auto;\">"+
	"                <div class=\"row\"><div class=\"col-sm-12\" id=\"laempresa\"></div></div>"+
	"                <div class=\"space-10\"></div>"+	
	"                <div class=\"row\"><div class=\"col-sm-6\" id=\"elrep\"></div><div class=\"col-sm-6\" id=\"elpuesto\"></div></div>"+
	"                <div class=\"space-10\"></div>"+
	"                <div class=\"row\">"+
	"                      <div class=\"col-sm-4\" id=\"elhorario\"></div>"+
	"                      <div class=\"col-sm-2\" id=\"lashoras\"></div>"+
	"                      <div class=\"col-sm-3\" id=\"elinicio\"></div>"+
	"                      <div class=\"col-sm-3\" id=\"elfin\"></div>"+
	"                </div>"+
	"                <div class=\"space-10\"></div>"+
	"                <div class=\"row\"><div class=\"col-sm-12\" id=\"laobs\"></div></div>"+
	"          </div>"+
	"          <div id=\"body_regSS\" class=\"modal-header\">"+	

	"              <button style=\" margin-right: 20px;\" title=\"Registrar al alumnos al servicio social\" "+
		                       " onclick=\"guardarDatos('"+matricula+"','"+nombre+"','"+avance+"');\" class=\"btn pull-right btn-white btn-info btn-round\">"+ 
							   " <i class=\"ace-icon green fa fa-save bigger-140\"></i><span class=\"btn-small\">"+
							   " Guardar </span>"+            
								"</button>"+
	"              <button style=\" margin-right: 20px;\"  onclick=\"$('#regSS').modal('hide');\"class=\"btn pull-right btn-white btn-info btn-round\">"+ 
								" <i class=\"ace-icon red fa fa-save bigger-140\"></i><span class=\"btn-small\">"+
								" Cerrar </span>"+            
								 "</button>"+																
	"          </div>"+
	"      </div>"+
	"   </div>"+
	"</div>";
	$("#regSS").remove();
    if (! ( $("#regSS").length )) {
	        $("#grid_ss_solicitudes").append(script);	     
	    }	    
	$("#regSS").modal({show:true, backdrop: 'static'});
	
	$("#laempresa").append("<span class=\"label label-danger\">Empresa</span>");
		addSELECT("selEmpresa","laempresa","PROPIO", "select IDEMP, CONCAT(IDEMP, ' ',NOMBRE,' ',DIRECCION)  from resempresas ORDER BY NOMBRE", "","BUSQUEDA");  	
	
	$("#elhorario").append("<span class=\"label label-success\">Horario</span><input class=\"form-control\" id=\"horario\"  value=\"Lunes a Viernes\"/>");
	$("#lashoras").append("<span class=\"label label-danger\">Horas Diarías</span><input class=\"form-control\" id=\"horas\"  value=\"4\"/>");
	$("#elinicio").append("<span class=\"label label-danger\">Fecha de Inicio</span>"+
	                      " <div class=\"input-group\"><input class=\"form-control date-picker\"  id=\"inicio\" "+
	                      " type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
						   " <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>");
	$("#elfin").append("<span class=\"label label-danger\">Fecha de Termino</span>"+
						   " <div class=\"input-group\"><input class=\"form-control date-picker\"  id=\"termino\" "+
						   " type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
							" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>");
	$("#elrep").append("<span class=\"label label-success\">Nombre del Representante Empresa</span><input class=\"form-control\" id=\"representante\" />");
	$("#elpuesto").append("<span class=\"label label-success\">Puesto en la Empresa</span><input class=\"form-control\" id=\"puesto\"  />");
						
	$("#laobs").append("<span class=\"label label-danger\">Notas / Observaciones</span><textarea class=\"form-control\" id=\"obs\"  row=\"5\"/>");
	
	
	 $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});  


}


function validar () {
	cad="";
	if ($("#selEmpresa").val()<=0) { cad+="Por favor elija la empresa <br/>";}
	if ($("#horario").val()=="") { cad+="Por favor coloque los días de servicio ej. Lunes a Viernes  <br/>";}
	if ($("#horas").val()=="") { cad+="Por favor coloque las horas diarias de servicio <br/>";}
	if ($("#inicio").val()=="") { cad+="Por favor coloque fecha de Inicio del Servicio <br/>";}
	if ($("#termino").val()=="") { cad+="Por favor coloque fecha de termino del Servicio <br/>";}
	if ($("#representante").val()=="") { cad+="Por favor coloque nombre del Representante Empresa <br/>";}
	if ($("#puesto").val()=="") { cad+="Por favor coloque Puesto del Representante de la Empresa <br/>";}
    return cad;
}

function guardarDatos (matricula,nombre,avance) {
	vali=validar();
    if (vali=="") {
		$("#regSS").modal("hide");
 	    mostrarEspera("esperaInf","grid_ss_solicitudes","Cargando Datos...");
		$("#btnReg"+matricula).addClass("hide");
        fecha=dameFecha("FECHAHORA");
		parametros={tabla:"ss_alumnos",
				bd:"Mysql",
				MATRICULA:matricula,
				CICLO:$("#selCiclo").val(),
				INICIO:$("#inicio").val(),
				TERMINO:$("#termino").val(),
				EMPRESA:$("#selEmpresa").val(),
				REPRESENTANTE:$("#representante").val(),
				PUESTO:$("#puesto").val(),
				HORARIO:$("#horario").val(),
				HORAS:$("#horas").val(),
				AVANCE:avance,
				USUARIO:usuario,
				FECHAUS:fecha,
				OBS:$("#obs").val(),
				_INSTITUCION: lainstitucion, 
				_CAMPUS: elcampus}						
				$.ajax({
						type: "POST",
						url:"../base/inserta.php",
						data: parametros,
						success: function(data){ 
							 ocultarEspera("esperaInf");     							
						
							}
						});			
		}
	else {
		mostrarIfo("infoError","grid_ss_solicitudes","Errores de Registro",vali,"modal-lg");
	}

}

function cartaPresenta (matricula,nombre,avance) {
	enlace="nucleo/ss_solicitudes/carta.php?matricula="+matricula+"&ciclo="+$("#selCiclo").val();
	abrirPesta(enlace,'Carta Presentación');

//	enlace="carta.php?matricula="+matricula+"&ciclo="+$("#selCiclo").val();
//	window.open(enlace,"_blank");
}
