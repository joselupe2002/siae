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
		
	
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {

		//if (elemento=='selAlumnos') {$("#informacion").empty(); cargarInformacion();}

		}  



    function cargarInformacion(){

		mostrarEspera("esperaInf","grid_tu_caltutorados","Cargando Datos...");
		elsql="SELECT IDDETALLE, CICLO, SIE, CERRADOCAL, SEMESTRE AS SEM, BASE, PROFESOR AS PROFESOR, PROFESORD AS PROFESORD, MATERIA, MATERIAD,SEMESTRE, HT, HP, CREDITOS, LUNES_1, MARTES_1, MIERCOLES_1, JUEVES_1, VIERNES_1, "+
		"SABADO_1, DOMINGO_1, LUNES_A, MARTES_A, MIERCOLES_A, JUEVES_A, VIERNES_A, SABADO_A, DOMINGO_A, CARRERA, CARRERAD, MAPA "+
		" FROM vedgrupos a where a.CICLO='"+$("#selCiclo").val()+"' and a.PROFESOR='"+usuario+"' ORDER BY SEMESTRE, MATERIAD";
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
	"<th style=\"text-align: center;\">Boleta</th>"+ 
	"<th style=\"text-align: center;\">Clave</th>"+ 
	"<th style=\"text-align: center;\">Materia</th>"+
	"<th style=\"text-align: center;\">SEM</th>"+
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
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.IDDETALLE+"\">");    

		if (valor.CERRADOCAL=='S') {
		$("#row"+valor.IDDETALLE).append("<td style=\"text-align: center;\"><button title=\"Imprimir Boleta de Calificaci&oacute;n\" onclick=\"imprimirBoleta('"+valor.IDDETALLE+"','"+$("#selProfesores").val()+"','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"','"+valor.SEM+"');\""+
											  " class=\"btn btn-xs btn-white btn-warning btn-round\"><i class=\"ace-icon blue fa fa-print bigger-140\"></i></button></td>");
		} else {
			$("#row"+valor.IDDETALLE).append("<td><span class=\"badge badge-warning\">Abierto</span></td>");
		}

		 $("#row"+valor.IDDETALLE).append("<td>"+valor.MATERIA+"</td>");    
		 $("#row"+valor.IDDETALLE).append("<td>"+valor.MATERIAD+"</td>");         	    
		 $("#row"+valor.IDDETALLE).append("<td>"+utf8Decode(valor.SEMESTRE)+"</td>");
		 $("#row"+valor.IDDETALLE).append("<td>"+utf8Decode(valor.HT)+"</td>");
		 $("#row"+valor.IDDETALLE).append("<td>"+valor.HP+"</td>");
		 $("#row"+valor.IDDETALLE).append("<td>"+valor.CREDITOS+"</td>");

		 cadl="<td></td>"; if (valor.LUNES_1!='') cadl="<td><span> "+valor.LUNES_1+"</span> | <span class=\"badge badge-warning\"> "+valor.LUNES_A+"</span></td>";
		 $("#row"+valor.IDDETALLE).append(cadl);

		 cadm="<td></td>"; if (valor.MARTES_1!='') cadm="<td><span> "+valor.MARTES_1+"</span> | <span class=\"badge badge-warning\"> "+valor.MARTES_A+"</span></td>";
		 $("#row"+valor.IDDETALLE).append(cadm);

		 cadmi="<td></td>"; if (valor.MIERCOLES_1!='') cadmi="<td><span> "+valor.MIERCOLES_1+"</span> | <span class=\"badge badge-warning\"> "+valor.MIERCOLES_A+"</span></td>";
		 $("#row"+valor.IDDETALLE).append(cadmi);

		 cadj="<td></td>"; if (valor.JUEVES_1!='') cadj="<td><span> "+valor.JUEVES_1+"</span> | <span class=\"badge badge-warning\"> "+valor.JUEVES_A+"</span></td>";
		 $("#row"+valor.IDDETALLE).append(cadj);
		 
		 cadv="<td></td>"; if (valor.VIERNES_1!='') cadv="<td><span> "+valor.VIERNES_1+"</span> | <span class=\"badge badge-warning\"> "+valor.VIERNES_A+"</span></td>";
		 $("#row"+valor.IDDETALLE).append(cadv);

		 cads="<td></td>"; if (valor.SABADO_1!='') cads="<td><span> "+valor.SABADO_1+"</span> | <span class=\"badge badge-warning\"> "+valor.SABADO_A+"</span></td>";
		 $("#row"+valor.IDDETALLE).append(cads);

		 cadd="<td></td>"; if (valor.DOMINGO_1!='') cadd="<td><span> "+valor.DOMINGO_1+"</span> | <span class=\"badge badge-warning\"> "+valor.DOMINGO_A+"</span></td>";
		 $("#row"+valor.IDDETALLE).append(cadd);

		 $("#row"+valor.IDDETALLE).append("<td><span class=\"badge badge-gray\"> "+valor.CARRERAD+"</span></td>");
		 $("#row"+valor.IDDETALLE).append("<td><span class=\"badge badge-danger\"> "+valor.MAPA+"</span></td>");
		 
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

}


function imprimirBoleta(id,profesor,materia,materiad,grupo,ciclo, base,semestre){
	console.log ("id:"+id+" prof:"+usuario+" mat:"+materia+" matd:"+materiad+" grupo"+grupo+" ciclo:"+ciclo+" base:"+base+" sem:"+semestre)
	tit='Boleta';
	abrirPesta("nucleo/cierreCal/boleta.php?tipo=0&grupo="+grupo+"&ciclo="+ciclo+"&profesor="+usuario+"&materia="+
								  materia+"&materiad="+materiad+"&id="+id+"&semestre="+semestre,tit);
}