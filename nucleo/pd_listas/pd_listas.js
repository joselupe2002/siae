var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");


		$("#losciclos2").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclo","losciclos2","PROPIO", "SELECT CICL_CLAVE, concat(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by CICL_CLAVE DESC", "","");  	
		
	
		$("#lasmaterias").append("<span class=\"label label-danger\">Asignatura</span>");
		addSELECT("selMaterias","lasmaterias","PROPIO", "SELECT IDDETALLE, concat(SIE,' ',MATERIAD) FROM vedgrupos a where a.CICLO='' AND PROFESOR='"+usuario+"' order by MATERIAD, SIE", "","");  	
		
	

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {

		if (elemento=='selCiclo') {
			actualizaSelect("selMaterias", "SELECT IDDETALLE, concat(SIE,' ',MATERIAD) FROM vedgrupos a where a.CICLO='"+$("#selCiclo").val()+"' AND PROFESOR='"+usuario+"' order by MATERIAD, SIE", "","");  	
		}
	
		}  



    function cargarInformacion(){

		mostrarEspera("esperaInf","grid_tu_caltutorados","Cargando Datos...");
		elsql="SELECT ID, CARR_DESCRIP AS CARRERAD, ALUCTR as MATRICULA, concat(b.ALUM_APEPAT,' ',b.ALUM_APEMAT,' ', b.ALUM_NOMBRE) AS NOMBRE"+
		" from dlista a, falumnos b, ccarreras c where ALUCTR=ALUM_MATRICULA AND  IDGRUPO="+$("#selMaterias").val()+
		" and ALUM_CARRERAREG=CARR_CLAVE"
		" ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE ";


		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){      	    
				generaTablaInformacion(JSON.parse(data));   	   
				ocultarEspera("esperaInf");     	     		   
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
	"<th style=\"text-align: center;\">Id</th>"+ 
	"<th style=\"text-align: center;\">No. Control</th>"+
	"<th style=\"text-align: center;\">Nombre</th>"+
	"<th style=\"text-align: center;\">HT</th>"+
	"<th style=\"text-align: center;\">HP</th>"+
	"<th style=\"text-align: center;\">CREDITOS</th>"+
	"<th style=\"text-align: center;\">LUNES</th>"+
	"<th style=\"text-align: center;\">MARTES</th>"+
	"<th style=\"text-align: center;\">MIERCOLES</th>"+
	"<th style=\"text-align: center;\">JUEVES</th>"+
	"<th style=\"text-align: center;\">VIERNES</th>"+
	"<th style=\"text-align: center;\">SABADO</th>"+
	"<th style=\"text-align: center;\">DOMINGO</th>"+
	"<th style=\"text-align: center;\">CARRERA</th>"+
	"<th style=\"text-align: center;\">MAPA</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 jQuery.each(grid_data, function(clave, valor) { 	
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ID+"\">");    	
		 $("#row"+valor.ID).append("<td>"+valor.MATRICULA+"</td>");    
		 $("#row"+valor.ID).append("<td>"+valor.NOMBRE+"</td>");         	    
		 $("#row"+valor.ID).append("<td>"+utf8Decode(valor.CARRERAD)+"</td>");
		$("#row"+valor.MATERIA).append("</tr>");
	 });
	$('#dlgproceso').modal("hide"); 
}	





function ImprimirReporte(){
	enlace="nucleo/vcargasprof/horario.php?ID="+usuario+"&ciclod="+$('#selCiclo option:selected').text()+"&ciclo="+$('#selCiclo').val();
		var content = '<iframe frameborder="0" id="FRNoti" src="'+enlace+'" style="overflow-x:hidden;width:100%;height:100%;"></iframe></div>';	
		$('#parentPrice', window.parent.document).html();
		window.parent.$("#myTab").tabs('add',{
				    	    title:'Reporte_Horario',				    	    
				    	    content:content,
				    	    closable:true		    
				    	});
	   //window.open(enlace, '_blank'); 

}