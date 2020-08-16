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
		
		
		$("#losservicios").append("<span class=\"label label-danger\">Servicio Solicitado</span>");
		addSELECT("selServicios","losservicios","PROPIO", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='TIPOSPAGOS' order by CATA_DESCRIP", "","");  	
		

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
		
		cadex="";
		if ($("#atendidos").prop("checked")) {cadex=" and ATENDIDO='S'";} else {cadex+=" and ATENDIDO='N'";} 
		if ($("#nocotejados").prop("checked")) {cadex+=" and COTEJADO='N'";} else {cadex+=" and COTEJADO='S'";}

		if (essuper=="S") {
			elsql="SELECT * FROM vcotejarpagos n where CICLO='"+$("#selCiclo").val()+"'"+cadex+" and TIPO='"+$("#selServicios").val()+"' ORDER BY IDDET DESC";
		}
		else {
			elsql="SELECT * FROM vcotejarpagos n where CICLO='"+$("#selCiclo").val()+"'"+cadex+" and TIPO='"+$("#selServicios").val()+"'"+
			" and CARRERA in ("+carrera+") ORDER BY IDDET DESC";
		}

    


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
	"<th style=\"text-align: center;\">Id</th>"+ 
	"<th style=\"text-align: center;\">Ciclo</th>"+ 
	"<th style=\"text-align: center;\">Cve_Tipo</th>"+
	"<th style=\"text-align: center;\">Tipo</th>"+
	"<th style=\"text-align: center;\">Matricula</th>"+
	"<th style=\"text-align: center;\">Nombre</th>"+	
	"<th style=\"text-align: center;\">Cotejado</th>"+
	"<th style=\"text-align: center;\">Atendido</th>"+
	"<th style=\"text-align: center;\">Carrera</th>"+
	"<th style=\"text-align: center;\">Observación Cotejo</th>"+
	"<th style=\"text-align: center;\">Fecha Cotejo</th>"+
	"<th style=\"text-align: center;\">Fecha Subida</th>"+
	"<th style=\"text-align: center;\">Fecha Atendido</th>"+
	"<th style=\"text-align: center;\">Usuario Atendio</th>"

	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
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
		 $("#row"+valor.IDDET).append("<td>"+valor.IDDET+"</td>");   	
		 $("#row"+valor.IDDET).append("<td>"+valor.CICLO+"</td>");    
		 $("#row"+valor.IDDET).append("<td>"+valor.TIPO+"</td>");         	    
		 $("#row"+valor.IDDET).append("<td>"+valor.TIPOD+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.MATRICULA+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.NOMBRE+"</td>");
		 

		 if ((valor.COTEJADO=='N') && (valor.OBSCOTEJO=='' || valor.OBSCOTEJO==null)) {tit="En espera de ser cotejado"; cadCotejado="fa-retweet blue";}
		 if ((valor.COTEJADO=='N') && (valor.OBSCOTEJO!='' && valor.OBSCOTEJO!=null)) { tit="El recibo de pago no fue aceptado tiene observaciones"; cadCotejado="fa-times red"; }
		 if (valor.COTEJADO=='S') {tit="El pago ha sido cotejado correctamente"; cadCotejado="fa-check-square-o green";}
		 $("#row"+valor.IDDET).append("<td><i title=\""+tit+"\" class=\"fa "+cadCotejado+" bigger-200\"></i></td>");
		
		 tit="En espera para ser atendido"; cadAten="fa-retweet blue";
		 if (valor.ATENDIDO=='S') {tit="El servicio ya fue atendido"; cadAten="fa-check-square-o green";}
		 $("#row"+valor.IDDET).append("<td><i title=\""+tit+"\" class=\"fa "+cadAten+" bigger-200\"></i></td>");

		 $("#row"+valor.IDDET).append("<td>"+valor.CARRERAD+"</td>");

		 $("#row"+valor.IDDET).append("<td>"+valor.OBSCOTEJO+"</td>");
		 
		 $("#row"+valor.IDDET).append("<td>"+valor.FECHACOTEJO+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.FECHARUTA+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.FECHAATENDIO+"</td>");
		 $("#row"+valor.IDDET).append("<td>"+valor.USERATENDIO+"</td>");
		 
		$("#row"+valor.IDDET).append("</tr>");
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