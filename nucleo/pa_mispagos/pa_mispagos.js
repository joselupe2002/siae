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
		if (elemento=='selTiposPagos') {$("#larutapago").empty(); selPago(); }
	}  



    function cargarInformacion(){
		$("#informacion").empty();
		mostrarEspera("esperaInf","grid_pa_mispagos","Cargando Datos...");
		elsql="SELECT n.*, IFNULL((select RUTA from eadjreinsres h where h.ID=n.IDDET),'') AS RUTARES FROM vcotejarpagos n where MATRICULA='"+usuario+"' AND CICLO='"+$("#selCiclo").val()+"' ORDER BY IDDET DESC";

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
				else {ocultarEspera("esperaInf");  }	     		   
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
	"<th style=\"text-align: center;\">Elim</th>"+ 
	"<th style=\"text-align: center;\">Id</th>"+ 
	"<th style=\"text-align: center;\">Ciclo</th>"+ 
	"<th style=\"text-align: center;\">Cve_Tipo</th>"+
	"<th style=\"text-align: center;\">Tipo</th>"+
	"<th style=\"text-align: center;\">Comprobante de Pago</th>"+
	"<th style=\"text-align: center;\">Cotejado</th>"+
	"<th style=\"text-align: center;\">Atendido</th>"+
	"<th style=\"text-align: center;\">Respuesta</th>"+
	"<th style=\"text-align: center;\">Observación Cotejo</th>"+
	"<th style=\"text-align: center;\">Fecha Cotejo</th>"+
	"<th style=\"text-align: center;\">Fecha Subida</th>"
	
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 jQuery.each(grid_data, function(clave, valor) { 			
		cadFile="";	

		 btnElim="";
		 if ((valor.COTEJADO=='N') && ((valor.RUTARES==''))) {
		     btnElim="<i onclick=\"eliminarReg('"+valor.IDDET+"');\" class=\"ace-icon red fa fa-trash-o bigger-200\" style=\"cursor:pointer;\"></i>";
		 }
		
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.IDDET+"\">");   
		 $("#row"+valor.IDDET).append("<td>"+btnElim+"</td>");   

		 $("#row"+valor.IDDET).append("<td>"+valor.IDDET+"</td>");   	
		 $("#row"+valor.IDDET).append("<td>"+valor.CICLO+"</td>");    
		 $("#row"+valor.IDDET).append("<td>"+valor.TIPO+"</td>");         	    
		 $("#row"+valor.IDDET).append("<td>"+valor.TIPOD+"</td>");
		 $("#row"+valor.IDDET).append("<td><div style=\"width:200px;\" id=\"file"+valor.IDDET+"\"></div></td>");
		 

		 tit=""; cadCotejado="";

		 if ((valor.COTEJADO=='N') && (valor.OBSCOTEJO=='' || valor.OBSCOTEJO==null)) {tit="En espera de ser cotejado"; cadCotejado="fa-retweet blue";}
		 if ((valor.COTEJADO=='N') && (valor.OBSCOTEJO!='' && valor.OBSCOTEJO!=null)) { tit="El recibo de pago no fue aceptado tiene observaciones"; cadCotejado="fa-times red"; }
		 if (valor.COTEJADO=='S') {tit="El pago ha sido cotejado correctamente"; cadCotejado="fa-check-square-o green";}
		 $("#row"+valor.IDDET).append("<td><i title=\""+tit+"\" class=\"fa "+cadCotejado+" bigger-200\"></i></td>");
		
		 tit="En espera para ser atendido"; cadAten="fa-retweet blue";
		 if (valor.ATENDIDO=='S') {tit="El servicio ya fue atendido"; cadAten="fa-check-square-o green";}
		 $("#row"+valor.IDDET).append("<td><i title=\""+tit+"\" class=\"fa "+cadAten+" bigger-200\"></i></td>");

		 $("#row"+valor.IDDET).append("<td><div id=\"respuesta"+valor.IDDET+"\"></div></td>");

		 $("#row"+valor.IDDET).append("<td>"+valor.OBSCOTEJO+"</td>");
		 
		 $("#row"+valor.IDDET).append("<td>"+valor.FECHACOTEJO+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.FECHARUTA+"</td>");

		 
		$("#row"+valor.IDDET).append("</tr>");

		if (valor.COTEJADO=='N') {
			activaEliminar="N";
			txtop=valor.TIPOD; idop=valor.TIPO;
			dameSubirArchivoDrive("file"+valor.IDDET,"","recibo"+valor.IDDET,'RECIBOREINS','pdf',
			'ID',valor.ID,'RECIBO DE PAGO '+txtop,'eadjreins','alta',usuario+"_"+miciclo+"_"+idop,valor.RUTA,activaEliminar);	
		}
		else {
			$("#recibo"+valor.IDDET).html("<a href=\""+valor.RUTA+"\" target=\"_blank\" >"+
			"<img src=\"../../imagenes/menu/pdf.png\" style=\"width:50px; height:50px;\"></a>");

		}

		if (!(valor.RUTARES=='')) {
			$("#file"+valor.IDDET).html("<a href=\""+valor.RUTARES+"\" target=\"_blank\" >"+
			"<img src=\"../../imagenes/menu/pdf.png\" style=\"width:50px; height:50px;\"></a>");	
		}


	 });
	$('#dlgproceso').modal("hide"); 
}	


function nuevoPago(){
	if ($("#selCiclo").val()>0) {
		mostrarConfirm2("pagonew","grid_pa_mispagos","Pago Nuevo","<div id=\"contPago\" style=\"text-justify:left;\"></div>","Finalizar","cargarInformacionNew();");

		$("#contPago").append("<div class=\"row\"><div id=\"lostipos\" class=\"col-sm-4\"></div>"+
												 "<div id=\"larutapago\" class=\"col-sm-8\"><div>"+
							   "</div>");
		
		$("#lostipos").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selTiposPagos","lostipos","PROPIO", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='TIPOSPAGOS' and CATA_ACTIVO='S' order by CATA_DESCRIP", "","");  	
	}
	else {alert ("Por favor elija primero el ciclo escolar actual");}

}

function selPago (){
    eltag=dameFecha("TAG");
	txtop=$("#selTiposPagos option:selected").text();
    idop=$("#selTiposPagos option:selected").val();
	
	activaEliminar="N";
	dameSubirArchivoDrive("larutapago","Recibo: "+txtop,"reciboreins",'RECIBOREINS','pdf',
	'ID',usuario+"_"+eltag,'RECIBO DE PAGO '+txtop,'eadjreins','alta',usuario+"_"+miciclo+"_"+idop,"",activaEliminar);	

}

function cargarInformacionNew(){

	$("#pagonew").modal("hide");
	cargarInformacion();
};




function eliminarReg(elid){
	if (confirm("¿Seguro que desea eliminar el Registro de Pago No. "+elid)) {
	
		parametros={tabla:"eadjreins",
					bd:"Mysql",					
					campollave:"IDDET",
					valorllave:elid};
		$.ajax({
			data:  parametros,
			url:   '../base/eliminar.php',
			type:  'post',          
			success:  function (response) {
				$('#dlgproceso').modal("hide");
				cargarInformacion();
	   }		
	   }); 

	}
	
};