var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var elalumno="";
var miciclo="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 


		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");


		$("#losciclos2").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclo","losciclos2","PROPIO", "SELECT CICL_CLAVE, concat(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by CICL_CLAVE DESC", "","");  	
		


		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {

		if (elemento=='selCiclo') {miciclo=$("#selCiclo").val(); $("#elciclo").html($("#selCiclo").val());}
	}  



    function cargarInformacion(){
		$("#informacion").empty();
		mostrarEspera("esperaInf","grid_pa_mispagos","Cargando Datos...");
		
		cadex="";
		if ($("#atendidos").prop("checked")) {cadex=" and ATENDIDO='S'";} else {cadex+=" and ATENDIDO='N'";} 
		if ($("#nocotejados").prop("checked")) {cadex+=" and COTEJADO='N'";} else {cadex+=" and COTEJADO='S'";}


			elsql="SELECT n.*, IFNULL((select RUTA from eadjreinsres h where h.ID=n.IDDET),'') AS RUTARES, "+
			"IFNULL((select RUTA from eadjlibing i where i.AUX=concat(n.MATRICULA,'_',n.CICLO,'_CERING')),'') AS RUTACER "+
			"  FROM vcotejarpagos n where CICLO='"+$("#selCiclo").val()+"'"+cadex+" and TIPO='LI' ORDER BY IDDET DESC";




		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){      
			  	if (JSON.parse(data).length>0) {					
					generaTablaInformacion(JSON.parse(data));   
					ocultarEspera("esperaInf");     
				  }
				else {ocultarEspera("esperaInf");
						$("#informacion").empty();
						$("#informacion").append("<div class=\"alert alert-danger\">"+
						                         "No existen Pagos pendientes de Atender del Rubro "+$("#selServicios option:selected").text()+"<div>");   }	     		   
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
				$('#dlgproceso').modal("hide");  
			}
		}); 					  		
}


function generaTablaInformacion(grid_data){
	c=0;

	script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"fontRoboto table table-condensed table-bordered table-hover\" "+
				">";
	$("#informacion").empty();
	$("#informacion").append(script);
				
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	$("#tabInformacion").append("<thead><tr id=\"headMaterias\">"+
	"<th style=\"text-align: center;\">Atendido</th>"+ 
	"<th style=\"text-align: center;\">No.</th>"+ 
	"<th style=\"text-align: center;\">Id</th>"+ 
	"<th style=\"text-align: center;\">Ciclo</th>"+ 
	"<th style=\"text-align: center;\">Cve_Tipo</th>"+
	"<th style=\"text-align: center;\">Tipo</th>"+
	"<th style=\"text-align: center;\">Matricula</th>"+
	"<th style=\"text-align: center;\">Nombre</th>"+
	"<th style=\"text-align: center;\">Pago</th>"+	
	"<th style=\"text-align: center;\">Certificado</th>"+	
	"<th style=\"text-align: center;\">Cotejado</th>"+
	"<th style=\"text-align: center;\">Atendido</th>"+
	"<th style=\"text-align: center;\">2010</th>"+
	"<th style=\"text-align: center;\">2015</th>"+
	"<th style=\"text-align: center;\">Respuesta</th>"+
	"<th style=\"text-align: center;\">Carrera</th>"+
	"<th style=\"text-align: center;\">Observación Cotejo</th>"+
	"<th style=\"text-align: center;\">Fecha Cotejo</th>"+
	"<th style=\"text-align: center;\">Fecha Subida</th>"+
	"<th style=\"text-align: center;\">Fecha Atendido</th>"+
	"<th style=\"text-align: center;\">Usuario Atendio</th>"+
	"<th style=\"text-align: center;\">Teléfono</th>"+
	"<th style=\"text-align: center;\">Correo</th>"

	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 n=1;
	 jQuery.each(grid_data, function(clave, valor) { 			
		cadFile="";	

		btnAten="";
		if (valor.ATENDIDO=='N') {
			btnAten="<i title=\"Marcar el Pago como atendido\" onclick=\"marcarAtendido('"+valor.IDDET+"','S');\" class=\"ace-icon green fa fa-thumbs-up bigger-200\" style=\"cursor:pointer;\"></i>";
		}
		if (valor.ATENDIDO=='S') {
			btnAten="<i title=\"Marcar el Pago como NO atendido\"  onclick=\"marcarAtendido('"+valor.IDDET+"','N');\" class=\"ace-icon red fa fa-thumbs-down bigger-200\" style=\"cursor:pointer;\"></i>";
		}

		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.IDDET+"\">");   		
		 $("#row"+valor.IDDET).append("<td>"+btnAten+"</td>");   
		 $("#row"+valor.IDDET).append("<td><span class=\"badge badge-success\">"+n+"<span></td>");  
		 $("#row"+valor.IDDET).append("<td>"+valor.IDDET+"</td>");   	
		 $("#row"+valor.IDDET).append("<td>"+valor.CICLO+"</td>");    
		 $("#row"+valor.IDDET).append("<td>"+valor.TIPO+"</td>");         	    
		 $("#row"+valor.IDDET).append("<td>"+valor.TIPOD+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.MATRICULA+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.NOMBRE+"</td>");
		 $("#row"+valor.IDDET).append("<td style=\"text-align:center;\"><a href=\""+valor.RUTA+"\" target=\"_blank\" >"+
		                                   "<img src=\"../../imagenes/menu/pdf.png\" style=\"width:25px; height:25px;\"></a></td>");
		 
		 eltit="No ha adjuntado el Certificado de INGLÉS";
		 laimg="../../imagenes/menu/pdfno.png"; if (valor.RUTACER!='') { laimg="../../imagenes/menu/pdf.png";  eltit="Clic para ver el Certificado de INGLÉS";}
		 $("#row"+valor.IDDET).append("<td style=\"text-align:center;\"><a href=\""+valor.RUTACER+"\" target=\"_blank\" >"+
		                                   "<img title=\""+eltit+"\"src=\""+laimg+"\" style=\"width:25px; height:25px;\"></a></td>");
		 

		 if ((valor.COTEJADO=='N') && (valor.OBSCOTEJO=='' || valor.OBSCOTEJO==null)) {tit="En espera de ser cotejado"; cadCotejado="fa-retweet blue";}
		 if ((valor.COTEJADO=='N') && (valor.OBSCOTEJO!='' && valor.OBSCOTEJO!=null)) { tit="El recibo de pago no fue aceptado tiene observaciones"; cadCotejado="fa-times red"; }
		 if (valor.COTEJADO=='S') {tit="El pago ha sido cotejado correctamente"; cadCotejado="fa-check-square-o green";}
		 $("#row"+valor.IDDET).append("<td><i title=\""+tit+"\" class=\"fa "+cadCotejado+" bigger-200\"></i></td>");
		
		 tit="En espera para ser atendido"; cadAten="fa-retweet blue";
		 if (valor.ATENDIDO=='S') {tit="El servicio ya fue atendido"; cadAten="fa-check-square-o green";}
		 $("#row"+valor.IDDET).append("<td><i title=\""+tit+"\" class=\"fa "+cadAten+" bigger-200\"></i></td>");

		 $("#row"+valor.IDDET).append("<td><button title=\"Reporte de Generaciónes antes del 2015\" onclick=\"reporte(1,'"+valor.IDDET+"');\" "+
		 "class=\"btn btn-white btn-info btn-round\"><i class=\"ace-icon green glyphicon glyphicon-copy bigger-140\"></i><span class=\"btn-small fontRoboto\"></span></button>");
		 
		 $("#row"+valor.IDDET).append("<td><button title=\"Reporte de Generaciónes a partir del 2015\" onclick=\"reporte(2,'"+valor.IDDET+"');\" "+
		 "class=\"btn btn-white btn-info btn-round\"><i class=\"ace-icon blue glyphicon glyphicon-paste  bigger-140\"></i><span class=\"btn-small fontRoboto\"></span></button>");
		 
		 $("#row"+valor.IDDET).append("<td><div style=\"width:200px;\" id=\"file"+valor.IDDET+"\"></div></td>");

		 $("#row"+valor.IDDET).append("<td>"+valor.CARRERAD+"</td>");


		 $("#row"+valor.IDDET).append("<td>"+valor.OBSCOTEJO+"</td>");
		 
		 $("#row"+valor.IDDET).append("<td>"+valor.FECHACOTEJO+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.FECHARUTA+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.FECHAATENCION+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.USERATENCION+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.TELEFONO+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.CORREO+"</td>");
		 $("#row"+valor.IDDET).append("</tr>");


		if (valor.ATENDIDO=='N') {
			cadRuta=valor.RUTARES;		
			if(typeof cadRuta === 'undefined'){ cadRuta="";}
			activaEliminar="S";
			txtop=valor.TIPOD; idop=valor.TIPO;
			dameSubirArchivoDrive("file"+valor.IDDET,"","recibo"+valor.IDDET,'RECIBOREINS','pdf',
			'ID',valor.IDDET,'RECIBO DE PAGO '+txtop,'eadjreinsres','alta',valor.IDDET,cadRuta,activaEliminar);	
		}
		else {
			if (!(valor.RUTARES=="")) {
		      	$("#file"+valor.IDDET).html("<a href=\""+valor.RUTARES+"\" target=\"_blank\" >"+
						"<img src=\"../../imagenes/menu/pdf.png\" style=\"width:25px; height:25px;\"></a>");
			}				
		}

		n++;
	 });
	$('#dlgproceso').modal("hide"); 
}	



function marcarAtendido(elid,elvalor){
	fecha=dameFecha("FECHAHORA");
	cadVal="ATENDIDO";
	if (elvalor=='N') {cadVal="NO ATENDIDO";}
	if (confirm("¿Seguro que desea macarcar como "+cadVal+" el Registro de Pago No. "+elid+"?")) {
	
		parametros={tabla:"eadjreins",						    		    	      
					bd:"Mysql",
					campollave:"IDDET",
					valorllave:elid,
					ATENDIDO:elvalor,
					FECHAATENCION:fecha,
					USERATENCION:usuario
					};	      
		$.ajax({
					type: "POST",
					url:"../base/actualiza.php",
					data: parametros,
					success: function(data){        			    		
						$('#dlgproceso').modal("hide");
						cargarInformacion();
	   				}		
	   }); 

	}
	
};


function reporte (tipo,id){
  if (tipo==1) { enlace="nucleo/liberaingles/oficio2010.php?id="+id+"&tipo=0";} 
  if (tipo==2) {enlace="nucleo/liberaingles/oficio2015.php?id="+id+"&tipo=0";}
  abrirPesta(enlace,"OficioLib");


}