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
		if ($("#atendidos").prop("checked")) {cadex="  ATENDIDO='S'";} else {cadex+="  ATENDIDO='N'";} 

		if (essuper=="S") {
			elsql="SELECT * FROM vtut_canalizaciones n where "+cadex+" AND TIPO='OPS' AND CICLO='"+$("#selCiclo").val()+"' ORDER BY ID DESC";
		}
		else {
			elsql="SELECT * FROM vtut_canalizaciones n where "+cadex+" and TIPO='OPS' CARRERA in ("+carrera+") AND CICLO='"+$("#selCiclo").val()+"' ORDER BY ID DESC"			
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
						$("#informacion").append("<div class=\"alert alert-danger\">No existen Canalizaciones pendientes de Atender<div>");   }	     		   
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
	"<th style=\"text-align: center;\">No.</th>"+ 
	"<th style=\"text-align: center;\">Id</th>"+ 
	"<th style=\"text-align: center;\">Ciclo</th>"+ 
	"<th style=\"text-align: center;\">Tipo</th>"+ 
	"<th style=\"text-align: center;\">Matricula</th>"+
	"<th style=\"text-align: center;\">Nombre</th>"+
	"<th style=\"text-align: center;\">Carrera</th>"+
	"<th style=\"text-align: center;\">Fecha</th>"+
	"<th style=\"text-align: center;\">Hora</th>"+
	"<th style=\"text-align: center;\">Teléfono</th>"+
	"<th style=\"text-align: center;\">Correo</th>"+
	"<th style=\"text-align: center;\">Tutor</th>"+
	"<th style=\"text-align: center;\">Act. Apoyo</th>"+
	"<th style=\"text-align: center;\">Observaciones</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 n=1;
	 jQuery.each(grid_data, function(clave, valor) { 			
		cadFile="";	

		btnAten="";
		if (valor.ATENDIDO=='N') {
			btnAten="<i title=\"Marcar como atendida la Canalización\" onclick=\"marcarAtendido('"+valor.ID+"','S','"+valor.OBSERVACIONES+"','"+valor.ACTAPOYO+"');\" class=\"ace-icon green fa fa-thumbs-up bigger-200\" style=\"cursor:pointer;\"></i>";
		}
		if (valor.ATENDIDO=='S') {
			btnAten="<i title=\"Marcar como no Atendida\"  onclick=\"marcarAtendido('"+valor.ID+"','N','"+valor.OBSERVACIONES+"','"+valor.ACTAPOYO+"');\" class=\"ace-icon red fa fa-thumbs-down bigger-200\" style=\"cursor:pointer;\"></i>";
		}

	
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ID+"\">");   		
		 $("#row"+valor.ID).append("<td>"+btnAten+"</td>");    
		 $("#row"+valor.ID).append("<td><span class=\"badge badge-success\">"+n+"<span></td>");  
		 $("#row"+valor.ID).append("<td>"+valor.ID+"</td>");   	
		 $("#row"+valor.ID).append("<td>"+valor.CICLO+"</td>");    	
		 $("#row"+valor.ID).append("<td>"+valor.TIPO+"</td>");    	
		 $("#row"+valor.ID).append("<td>"+valor.MATRICULA+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.NOMBRE+"</td>");		
		 $("#row"+valor.ID).append("<td>"+valor.CARRERAD+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.FECHA+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.HORA+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.TELEFONO+"</td>");	
		 $("#row"+valor.ID).append("<td>"+valor.CORREO+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.TUTORD+"</td>");			 
		 $("#row"+valor.ID).append("<td>"+valor.PROBLEMATICA+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.ACTAPOYO+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.OBSERVACIONES+"</td>");
		 $("#row"+valor.ID).append("</tr>");
		n++;
	 });
	$('#dlgproceso').modal("hide"); 
}	

function marcarAtendido(elid,elvalor,obs,actap){


		$("#confirmCotejado").empty();
		mostrarConfirm("confirmCotejado", "grid_tut_canalpsi",  "Resultados",
		"<span class=\"label label-success\">Observaciones</span>"+
		"     <textarea id=\"observaciones\" style=\"width:100%; height:100%; resize: none;\">"+obs+"</textarea>"+
		"<span class=\"label label-success\">Actividades Apoyo</span>"+
		"     <textarea id=\"actapoyo\" style=\"width:100%; height:100%; resize: none;\">"+actap+"</textarea>",
		"","Finalizar Proceso", "grabarAtendido('"+elid+"','"+elvalor+"');","modal-sm");
}


function grabarAtendido(elid,elvalor){
	fecha=dameFecha("FECHAHORA");
	cadVal="MARCAR COMO ATENDIDO";
	if (elvalor=='N') {cadVal="MARCAR COMO NO ATENDIDO";}
		parametros={tabla:"tut_canalizaciones",						    		    	      
					bd:"Mysql",
					campollave:"ID",
					valorllave:elid,
					ATENDIDO:elvalor,
					FECHAAT:fecha,
					USERAT:usuario,
					OBSERVACIONES:$("#observaciones").val(),
					ACTAPOYO:$("#actapoyo").val()

					};	      
		$.ajax({
					type: "POST",
					url:"../base/actualiza.php",
					data: parametros,
					success: function(data){    
						console.log(data);
						$('#confirmCotejado').empty("");
						$('#confirmCotejado').modal("hide");
						cargarInformacion();
	   				}		
	   }); 
	
}

