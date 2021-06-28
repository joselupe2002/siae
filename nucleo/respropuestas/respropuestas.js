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
		
		cadex="";
		if ($("#atendidos").prop("checked")) {cadex="  AUTORIZADA='S'";} else {cadex+="  AUTORIZADA='N'";} 

		if (essuper=="S") {
			elsql="SELECT * FROM vrespropuestas n where "+cadex+" AND CICLO='"+$("#selCiclo").val()+"' ORDER BY ID DESC";
		}
		else {
			elsql="SELECT * FROM vrespropuestas n where "+cadex+" and CARRERA in ("+carrera+") AND CICLO='"+$("#selCiclo").val()+"' ORDER BY ID DESC"			
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
						$("#informacion").append("<div class=\"alert alert-danger\">No existen Propuestas pendientes de Atender<div>");   }	     		   
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
	"<th style=\"text-align: center;\">Autorizado</th>"+ 
	"<th style=\"text-align: center;\">Eliminar</th>"+ 
	"<th style=\"text-align: center;\">No.</th>"+ 
	"<th style=\"text-align: center;\">Id</th>"+ 
	"<th style=\"text-align: center;\">Ciclo</th>"+ 
	"<th style=\"text-align: center;\">Matricula</th>"+
	"<th style=\"text-align: center;\">Nombre</th>"+
	"<th style=\"text-align: center;\">Carrera</th>"+
	"<th style=\"text-align: center;\">Inscrito</th>"+
	"<th style=\"text-align: center;\">Avance</th>"+
	"<th style=\"text-align: center;\">Periodo</th>"+
	"<th style=\"text-align: center;\">Fecha Subida</th>"+
	"<th style=\"text-align: center;\">Empresa</th>"+
	"<th style=\"text-align: center;\">Responsable</th>"+
	"<th style=\"text-align: center;\">Domicilio</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 n=1;
	 jQuery.each(grid_data, function(clave, valor) { 			
		cadFile="";	

		btnAten="";
		if (valor.AUTORIZADA=='N') {
			btnAten="<i title=\"Autorizar la Residencia\" onclick=\"marcarAtendido('"+valor.ID+"','S');\" class=\"ace-icon green fa fa-thumbs-up bigger-200\" style=\"cursor:pointer;\"></i>";
		}
		if (valor.AUTORIZADA=='S') {
			btnAten="<i title=\"Marcar como no Autorizado\"  onclick=\"marcarAtendido('"+valor.ID+"','N');\" class=\"ace-icon red fa fa-thumbs-down bigger-200\" style=\"cursor:pointer;\"></i>";
		}

		btnElim="<i title=\"Eliminar Propuesta\"  onclick=\"eliminaPropuesta('"+valor.ID+"');\" class=\"ace-icon red fa fa-trash-o bigger-200\" style=\"cursor:pointer;\"></i>";


		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ID+"\">");   		
		 $("#row"+valor.ID).append("<td>"+btnAten+"</td>");   
		 $("#row"+valor.ID).append("<td>"+btnElim+"</td>");   
		 $("#row"+valor.ID).append("<td><span class=\"badge badge-success\">"+n+"<span></td>");  
		 $("#row"+valor.ID).append("<td>"+valor.ID+"</td>");   	
		 $("#row"+valor.ID).append("<td>"+valor.CICLO+"</td>");    		
		 $("#row"+valor.ID).append("<td>"+valor.MATRICULA+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.NOMBRE+"</td>");		
		 $("#row"+valor.ID).append("<td>"+valor.CARRERAD+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.INSCRITO+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.AVANCE+"</td>");		 
		 $("#row"+valor.ID).append("<td>"+valor.PERIODOS+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.FECHAENVIADA+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.EMPRESA+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.PERSONA+"</td>");	
		 $("#row"+valor.ID).append("<td>"+valor.DOMICILIO+"</td>");	
		 $("#row"+valor.ID).append("</tr>");
		n++;
	 });
	$('#dlgproceso').modal("hide"); 
}	



function marcarAtendido(elid,elvalor){
	fecha=dameFecha("FECHAHORA");
	cadVal="AUTORIZAR";
	if (elvalor=='N') {cadVal="NO AUTORIZADO";}
	if (confirm("¿Seguro que desea "+cadVal+" el Registro  No. "+elid+"?")) {
	
		parametros={tabla:"respropuestas",						    		    	      
					bd:"Mysql",
					campollave:"ID",
					valorllave:elid,
					AUTORIZADA:elvalor,
					FECHAAUT:fecha,
					USERAUT:usuario
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
	
}


function eliminaPropuesta(id){
	parametros={
		tabla:"respropuestas",
		campollave:"ID",
		bd:"Mysql",
		valorllave:id
	};
	$.ajax({
		type: "POST",
		url:"../base/eliminar.php",
		data: parametros,
		success: function(data){
		    cargarInformacion();
			
		}					     
	});    	         
}
