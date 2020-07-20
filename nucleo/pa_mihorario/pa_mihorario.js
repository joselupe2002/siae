var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var elalumno="";


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
		
		if (ext) {
			usuario=lamat; 	
			$("#elciclo").html(miciclo);
			cargarInformacion(); 	
		}
		
	});
	
	
		 
	function change_SELECT(elemento) {

		if (elemento=='selCiclo') {$("#elciclo").html($("#selCiclo").val());}

		}  



    function cargarInformacion(){
		$("#informacion").empty();
		mostrarEspera("esperaInf","grid_pa_mihorario","Cargando Datos...");
		elsql="SELECT PDOCVE, ID, MATCVE AS MATERIA, MATERIAD,SEMESTRE, CREDITOS, LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, "+
		"SABADO, DOMINGO, CARRERA"+
		" FROM vhorario_alum a where a.PDOCVE='"+$('#elciclo').html()+"' and a.ALUCTR='"+usuario+"' ORDER BY SEMESTRE, MATERIAD";
	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){      
			  	if (JSON.parse(data).length>0) {
					laCarrera=JSON.parse(data)[0]["CARRERA"]; 
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

	script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\" "+
				">";
	$("#informacion").empty();
	$("#informacion").append(script);
				
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	$("#tabInformacion").append("<thead><tr id=\"headMaterias\">"+
	"<th style=\"text-align: center;\">Ciclo</th>"+ 
	"<th style=\"text-align: center;\">Clave</th>"+ 
	"<th style=\"text-align: center;\">Materia</th>"+
	"<th style=\"text-align: center;\">SEM</th>"+
	"<th style=\"text-align: center;\">CREDITOS</th>"+
	"<th style=\"text-align: center;\">LUNES</th>"+
	"<th style=\"text-align: center;\">MARTES</th>"+
	"<th style=\"text-align: center;\">MIERCOLES</th>"+
	"<th style=\"text-align: center;\">JUEVES</th>"+
	"<th style=\"text-align: center;\">VIERNES</th>"+
	"<th style=\"text-align: center;\">SABADO</th>"+
	"<th style=\"text-align: center;\">DOMINGO</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 jQuery.each(grid_data, function(clave, valor) { 	
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ID+"\">");   
		 $("#row"+valor.ID).append("<td>"+valor.PDOCVE+"</td>");   	
		 $("#row"+valor.ID).append("<td>"+valor.MATERIA+"</td>");    
		 $("#row"+valor.ID).append("<td>"+valor.MATERIAD+"</td>");         	    
		 $("#row"+valor.ID).append("<td>"+utf8Decode(valor.SEMESTRE)+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.CREDITOS+"</td>");

		 $("#row"+valor.ID).append("<td>"+valor.LUNES+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.MARTES+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.MIERCOLES+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.JUEVES+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.VIERNES+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.SABADO+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.DOMINGO+"</td>");

		 
		$("#row"+valor.MATERIA).append("</tr>");
	 });
	$('#dlgproceso').modal("hide"); 
}	



function ImprimirReporte(){
	enlace="nucleo/reinscripciones/boletaMat.php?carrera="+laCarrera+"&matricula="+usuario+"&ciclod=&ciclo="+$('#elciclo').html();
	abrirPesta(enlace,"Reporte_Horario");
}