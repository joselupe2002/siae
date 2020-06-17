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

		$("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		 
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+")", "",""); 
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });
		
		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc order by cicl_clave desc", "","");  			      
	

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selCarreras') {	
			$("#loshorarios").empty();	
		}  
    }


    function cargarInformacion(){

		$("#opcionestabInformacion").addClass("hide");
		$("#botonestabInformacion").empty();
	
		script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headMaterias\">"+
		   "                <th>No.</th> "+
		   "                <th>Ciclo</th> "+
		   "                <th>Gpo</th> "+	
		   "                <th>Sem</th> "+	
		   "                <th>Materia</th> "+	
		   "                <th>MateriaD</th> "+	
		   "                <th>Profesor</th> "+
		   "                <th>ProfesorD</th>"+
		   "                <th>Total</th>"+
		   "                <th>Hombres</th>"+
		   "                <th>Mujeres</th> "+
		   "                <th>Aprobados_H</th> "+
		   "                <th>Aprobados_M</th> "+
		   "                <th>Reprobados_H</th> "+
		   "                <th>Reprobados_M</th> "+
		   "                <th>%Rep_H</th> "+
		   "                <th>%Rep_M</th> "+
		   "              </tr>"+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);

				
		elsql="select a.PDOCVE AS CICLO, a.MATCVE AS MATERIA,c.MATE_DESCRIP AS MATERIAD,IFNULL(a.LISTC15,0) AS PROFESOR,"+
		"CONCAT(d.EMPL_NOMBRE,' ',d.EMPL_APEPAT, ' ',d.EMPL_APEMAT) AS PROFESORD,a.GPOCVE AS GRUPO, "+
		"getcuatrimat(a.MATCVE,b.ALUM_MAPA) AS SEMESTRE,"+
		"b.ALUM_CARRERAREG AS CARRERA, e.CARR_DESCRIP AS CARRERAD,SUM(IF (ALUM_SEXO=1,1,0)) AS HOMBRE,"+
		"SUM(IF (ALUM_SEXO=2,1,0)) AS MUJER,SUM(IF (LISCAL>=70 AND ALUM_SEXO=1,1,0)) AS APR_HOMBRE,"+
		"SUM(IF (LISCAL>=70 AND ALUM_SEXO=2,1,0)) AS APR_MUJER, COUNT(*) as TOTAL "+		
		" from dlista a left outer join pempleados d on (d.EMPL_NUMERO=IFNULL(a.LISTC15,0)), falumnos b, cmaterias c, ccarreras e"+
		" where a.ALUCTR=b.ALUM_MATRICULA  and a.MATCVE=c.MATE_CLAVE and b.ALUM_CARRERAREG=e.CARR_CLAVE"+
		" and ALUM_CARRERAREG='"+$("#selCarreras").val()+"' and PDOCVE='"+$("#selCiclos").val()+"'"+
		" and IFNULL(c.MATE_TIPO,'99') not in ('SS','AC','OC','RP') and GPOCVE<>'REV' "+
		" GROUP BY PDOCVE, MATCVE, GPOCVE, LISTC15,b.ALUM_CARRERAREG";

		
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		

		mostrarEspera("esperaInf","grid_vstrepxmatxcic","Cargando Datos...");
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  				      			      
					generaTablaInformacion(JSON.parse(data));   
					ocultarEspera("esperaInf");  																																								
			    },
			    error: function(dataMat) {	                  
					alert('ERROR: '+dataMat);
								}
	});	      	      					  					  		
}





function generaTablaInformacion(grid_data){
	
	contR=1;
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contR).html()+" "+valor.PROFESOR);   
		tit=valor.MATERIAD+" "+valor.PROFESORD;			
		$("#cuerpoInformacion").append("<tr id=\"rowM"+contR+"\">");
		$("#rowM"+contR).append("<td>"+contR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.CICLO+"</td>");
		$("#rowM"+contR).append("<td>"+valor.GRUPO+"</td>");
		$("#rowM"+contR).append("<td>"+valor.SEMESTRE+"</td>");
		$("#rowM"+contR).append("<td>"+valor.MATERIA+"</td>");
		$("#rowM"+contR).append("<td>"+valor.MATERIAD+"</td>");
		$("#rowM"+contR).append("<td>"+valor.PROFESOR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.PROFESORD+"</td>");
		$("#rowM"+contR).append("<td><span title=\""+tit+"\" class=\"badge badge-success\">"+valor.TOTAL+"</span></td>");
		$("#rowM"+contR).append("<td><span title=\""+tit+"\" class=\"badge badge-info\"><i class=\"fa fa-male\"></i> "+valor.HOMBRE+"</span></td>");
		$("#rowM"+contR).append("<td><span title=\""+tit+"\" class=\"badge badge-pink\"><i class=\"fa fa-female\"></i> "+valor.MUJER+"</span></td>");
		$("#rowM"+contR).append("<td><i title=\""+tit+"\" class=\"fa fa-male blue\"></i> <span class=\"fontRobotoBk bigger-110 blue\"><strong>"+valor.APR_HOMBRE+"</strong></span></td>");
		$("#rowM"+contR).append("<td><i title=\""+tit+"\" class=\"fa fa-female pink\"></i> <span class=\"fontRobotoBk bigger-110 blue\"><strong>"+valor.APR_MUJER+"</strong></span></td>");	
		$("#rowM"+contR).append("<td><i title=\""+tit+"\" class=\"fa fa-male blue\"></i> <span class=\"bigger-110 red\"><strong>"+(parseInt(valor.HOMBRE)-parseInt(valor.APR_HOMBRE))+"</strong></span></td>");
		$("#rowM"+contR).append("<td><i title=\""+tit+"\" class=\"fa fa-female pink\"></i> <span class=\"bigger-110 red\"><strong>"+(parseInt(valor.MUJER)-parseInt(valor.APR_MUJER))+"</strong></span></td>");
		prm=0; if (valor.MUJER>0) {prm=Math.round(((parseInt(valor.MUJER)-parseInt(valor.APR_MUJER))/parseInt(valor.MUJER)*100) );}
		prh=0; if (valor.HOMBRE>0) {prh=Math.round(((parseInt(valor.HOMBRE)-parseInt(valor.APR_HOMBRE))/parseInt(valor.HOMBRE)*100));}

		$("#rowM"+contR).append("<td><span title=\""+tit+"\" class=\"badge badge-primary\">"+prh+"%</span></td>");
		$("#rowM"+contR).append("<td><span title=\""+tit+" "+valor.PROFESORD+"\" class=\"badge badge-pink\">"+prm+"%</td>");		
	    contR++;      			
	});	
	
} 


function promediar(){
	c=0;
	$('#tabInformacion tr').each(function () {
		if (c>0) {
			var profesor = $(this).find("td").eq(6).html();
			var materia = $(this).find("td").eq(4).html();
			var materiad = $(this).find("td").eq(5).html();
			var grupo = $(this).find("td").eq(2).html();
			var ciclo = $(this).find("td").eq(1).html();
			//alert (profesor+' '+materia+' '+materiad+' '+grupo+' '+ciclo);
			console.log("Promediado: "+profesor+' '+materia+' '+materiad+' '+grupo+' '+ciclo);
			calcularFinal(profesor,materia,materiad,grupo,ciclo, 'vstrepxmatxcic');
			
		}
		c++;		
		});
		cargarInformacion();
}