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
		if ($("#atendidos").prop("checked")) {cadex="  ASES_STATUS='S'";} else {cadex+="  ASES_STATUS='N'";} 

	
		elsql="select ASES_ID,ASES_CICLO, ASES_PROFESOR, ASES_TEMA,ASES_FECHA, ASES_HORA, ASES_MATRICULA AS MATRICULA,ASES_STATUS, "+
		"CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE, CARR_DESCRIP AS CARRERAD,"+
		"ASES_ASIGNATURA AS MATERIA, MATE_DESCRIP AS MATERIAD from propasesorias, falumnos, cmaterias, ccarreras where ASES_MATRICULA=ALUM_MATRICULA "+
		"and ASES_ASIGNATURA=MATE_CLAVE  and ALUM_CARRERAREG=CARR_CLAVE and ASES_PROFESOR='"+usuario+"' and "+cadex;			
	
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
						$("#informacion").append("<div class=\"alert alert-danger\">No existen Asesorías pendientes de Atender<div>");   }	     		   
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
	"<th style=\"text-align: center;\">Matricula</th>"+
	"<th style=\"text-align: center;\">Nombre</th>"+
	"<th style=\"text-align: center;\">Carrera</th>"+
	"<th style=\"text-align: center;\">Asignatura</th>"+
	"<th style=\"text-align: center;\">Tema</th>"+
	"<th style=\"text-align: center;\">Fecha</th>"+
	"<th style=\"text-align: center;\">Hora</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 n=1;
	 jQuery.each(grid_data, function(clave, valor) { 			
		cadFile="";	

		btnAten="";
		if (valor.ASES_STATUS=='N') {
			btnAten="<i title=\"Marcar la asesoría como atendida\" onclick=\"marcarAtendido('"+valor.ASES_ID+"','S','"+valor.MATRICULA+"','"+valor.ASES_CICLO+"','"+valor.MATERIA+"','"+valor.ASES_TEMA+"','"+valor.ASES_FECHA+"','"+valor.ASES_HORA+"');\" class=\"ace-icon green fa fa-thumbs-up bigger-200\" style=\"cursor:pointer;\"></i>";
		}
		if (valor.ASES_STATUS=='S') {
			btnAten="<i title=\"Marcar la asesoría como no atendida\"  onclick=\"marcarAtendido('"+valor.ASES_ID+"','N','"+valor.MATRICULA+"','"+valor.ASES_CICLO+"','"+valor.MATERIA+"','"+valor.ASES_TEMA+"','"+valor.ASES_FECHA+"','"+valor.ASES_HORA+"');\" class=\"ace-icon red fa fa-thumbs-down bigger-200\" style=\"cursor:pointer;\"></i>";
		}

		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ASES_ID+"\">");   		
		 $("#row"+valor.ASES_ID).append("<td>"+btnAten+"</td>");   
		 $("#row"+valor.ASES_ID).append("<td><span class=\"badge badge-success\">"+n+"<span></td>");  
		 $("#row"+valor.ASES_ID).append("<td>"+valor.ASES_ID+"</td>");   	
		 $("#row"+valor.ASES_ID).append("<td>"+valor.ASES_CICLO+"</td>");    		
		 $("#row"+valor.ASES_ID).append("<td>"+valor.MATRICULA+"</td>");
		 $("#row"+valor.ASES_ID).append("<td>"+valor.NOMBRE+"</td>");		
		 $("#row"+valor.ASES_ID).append("<td>"+valor.CARRERAD+"</td>");
		 $("#row"+valor.ASES_ID).append("<td>"+valor.MATERIAD+"</td>");
		 $("#row"+valor.ASES_ID).append("<td>"+valor.ASES_TEMA+"</td>");		 
		 $("#row"+valor.ASES_ID).append("<td>"+valor.ASES_FECHA+"</td>");
		 $("#row"+valor.ASES_ID).append("<td>"+valor.ASES_HORA+"</td>");	
		 $("#row"+valor.ASES_ID).append("</tr>");
		n++;
	 });
	$('#dlgproceso').modal("hide"); 
}	



function marcarAtendido(elid,elvalor, matricula,ciclo,asignatura,tema,fecha,hora){
	fechamov=dameFecha("FECHAHORA");
	cadVal="AUTORIZAR";
	if (elvalor=='N') {cadVal="NO AUTORIZADO";}
	if (confirm("¿Seguro que desea "+cadVal+" el Registro  No. "+elid+"?")) {
	
		parametros={tabla:"propasesorias",						    		    	      
					bd:"Mysql",
					campollave:"ASES_ID",
					valorllave:elid,
					ASES_STATUS:elvalor
					};	      
				$.ajax({
					type: "POST",
					url:"../base/actualiza.php",
					data: parametros,
					success: function(data){   
									    		
						$('#dlgproceso').modal("hide");

						if (elvalor=='S') {
								parametros={
									tabla:"asesorias",
									bd:"Mysql",			
									ASES_PROFESOR:usuario,
									ASES_MATRICULA:matricula,			 
									ASES_FECHA:fecha,
									ASES_HORA:hora,
									ASES_TIPO:"AA",
									ASES_ASIGNATURA:asignatura,
									ASES_TEMA:tema,
									ASES_CICLO:ciclo,
									ASES_FECHAUS:fechamov,
									ASES_STATUS: "N",
									ASES_USUARIO:usuario ,
									_INSTITUCION:lainstitucion,
									_CAMPUS: elcampus
								
									};
				
							$.ajax({
								type: "POST",
								url:"../base/inserta.php",
								data: parametros,
								success: function(data){	
									                                	                      
									cargarInformacion();
								}					     
							});
						}// DEL SI APLICA INSERCION 
						else { cargarInformacion();}
						
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
