var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#losexamenes").append("<span class=\"label label-warning\">Exámenes</span>");
		$("#losalumnos").append("<span class=\"label label-warning\">Aspirante/Alumno</span>");
		 
		elsql="SELECT IDEXA, DESCRIP from linexamenes";
		if (essup!='S') { elsql="SELECT IDEXA, DESCRIP from linexamenes WHERE USUARIO='"+usuario+"'"; }
		
		addSELECT("selExamenes","losexamenes","PROPIO",elsql, "",""); 
		addSELECT("selAlumnos","losalumnos","PROPIO","SELECT ID, NOMBRE FROM vaspalumnos WHERE ID=0", "","BUSQUEDA"); 

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selExamenes') {	
			actualizaSelect("selAlumnos","SELECT DISTINCT MATRICULA, concat(MATRICULA,' ',MATRICULAD) from vlinrespuestas where IDEXAMEN="+$("#selExamenes").val(),"BUSQUEDA","");
		}  
    }

/*=================================================RESULTADOS GENERALES POR SECCIÓN ==============================================*/
    function cargarInformacion(){
		campos=[];
		cadSeccion="";
		cadSecSql="";
		elsql="select IDSECC, REPLACE(DESCRIP,' ','') as DESCRIP  from linsecciones a where a.IDEXA="+$("#selExamenes").val()+" ORDER BY IDSECC";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  			      			      
				j=0;
				jQuery.each(JSON.parse(data), function(clave, valor) {  
					cadSeccion+="<th>"+valor.DESCRIP+"</th>";
					cadSecSql+="(SELECT SUM(PUNTOS) from vlinrespuestas z where z.MATRICULA=x.MATRICULA and z.IDEXAMEN=x.IDEXAMEN AND z.IDSECCION="+valor.IDSECC+") AS "+valor.DESCRIP+",";
					campos[j]=valor.DESCRIP;
					j++;
				});  
				script="<table id=\"tabMaterias\" name=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
								">"+
						"        <thead >  "+
						"             <tr id=\"headMaterias\">"+
						"                <th>No.</th> "+
						"                <th>Control</th> "+
						"                <th>Nombre</th> "+	
						cadSeccion+
						"                <th>Total</th> "+	
						"             </tr> "+
						"            </thead>" +
						"         </table>";
						$("#informacion").empty();
						$("#informacion").append(script);
								
						elsql="select MATRICULA,MATRICULAD,"+cadSecSql+" SUM(PUNTOS) as TOTAL from vlinrespuestas x where "+
						"IDEXAMEN="+$("#selExamenes").val()+" GROUP BY MATRICULA, MATRICULAD ORDER BY CARRERA,MATRICULAD";
	
						
						mostrarEspera("esperahor","grid_linresexa","Cargando Datos...");
						parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){  				      			      
									generaTablaMaterias(JSON.parse(data),campos);   													
									ocultarEspera("esperahor");  																											
							},
							error: function(dataMat) {	                  
									alert('ERROR: '+dataMat);
												}
					});	     																																										
		 },
		 error: function(dataMat) {	                  
				 alert('ERROR: '+dataMat);
							 }
 		});	      	      	

		  	      					  					  		
}

function generaTablaMaterias(grid_data,campos){	
	contAlum=1;
	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   			
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td id=\"IDDETALLE_"+contAlum+"\" style=\"font-size:10px;\">"+valor.MATRICULA+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:10px;\">"+valor.MATRICULAD+"</td>");
	
		campos.forEach(element => {
			$("#rowM"+contAlum).append("<td style=\"font-size:10px;\">"+grid_data[clave][element]+"</td>"); 
		});
		$("#rowM"+contAlum).append("<td><span class=\"badge badge-info\" >"+valor.TOTAL+"</span></td>");
		/*
		evento="onclick=\"window.open('../pd_captcal/repUni.php?materia="+valor.MATERIA+"&grupo="+valor.GRUPO+
		"&ciclo="+$("#selCiclos").val()+"&profesor="+valor.PROFESOR+"&id="+valor.IDDETALLE+
		"&materiad="+valor.MATERIAD+"&semestre="+valor.SEMESTRE+"','_blank');\" ";

		stpor="";
		porc=Math.round((parseInt(valor.RES)/parseInt(valor.ALUM)*100),1);
		if (porc==0) stpor="class=\"badge  badge-danger\"";
		if ((porc>0) && (porc<=50)) stpor="class=\"badge  badge-warning\"";
		if ((porc>50) && (porc<=99)) stpor="class=\"badge  badge-success\"";
		if (porc>=100) stpor="class=\"badge  badge-primary\"";
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><a "+evento+"><span title=\"click para ver reporte de unidades por alumnos\" style=\"cursor:pointer\" class=\"badge  badge-info\">"+valor.ALUM+"</span></a></td>");
		$("#rowM"+contAlum).append("<td><span title=\"Número de alumnos que han respondido la encuensta\" class=\"badge badge-success\"><i class=\"fa fa-male white\"> "+valor.RES+"</i></span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span "+stpor+">"+porc+" %</span></td>");
		*/

	    contAlum++;      			
	});	
} 



/*===========================================================POR PROFESORES==============================================*/
function cargarInformacionP(){
	script="<table id=\"tabMaterias\" name=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
			">"+
		  "        <thead >  "+
	   "             <tr id=\"headMaterias\">"+
	   "                <th>No.</th> "+
	   "                <th>Ciclo</th> "+	
	   "                <th>Cve</th> "+	
	   "                <th>Profesor</th> "+	
	   "                <th>Depto</th> "+	
	   "                <th>Departamento</th> "+	 
	   "                <th>Alum</th> "+
	   "                <th>#Res</th> "+
	   "                <th>%Res</th> "+	
	   "                <th>Reporte</th> "+
	   "             </tr> "+
	   "            </thead>" +
	   "         </table>";
	   $("#informacion").empty();
	   $("#informacion").append(script);
			
	elsql="select CICLO,PROFESOR, PROFESORD, z.EMPL_DEPTO as DEPTO, ifnull(URES_DESCRIP,'') AS DEPTOD,"+
		  "SUM((SELECT COUNT(DISTINCT(l.MATRICULA)) FROM ed_respuestas l where l.TERMINADA='S' and l.IDGRUPO=a.IDDETALLE)) AS RES, "+
		  "SUM((select count(*) from dlista where IDGRUPO=a.IDDETALLE AND BAJA='N')) AS ALUM "+
		  " from vedgrupos a, pempleados z LEFT OUTER JOIN  fures y ON (z.EMPL_DEPTO=y.URES_URES)  where a.CICLO='"+$("#selCiclos").val()+"'"+ 
		  " and a.PROFESOR=z.EMPL_NUMERO "+
		  " GROUP BY   CICLO, PROFESOR, PROFESORD, z.EMPL_DEPTO" +
		  "  ORDER BY  CICLO, z.EMPL_DEPTO, PROFESORD";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_resEvalDoc","Cargando Datos...");
	$.ajax({
		   type: "POST",
		   data:parametros,
		   url:  "../base/getdatossqlSeg.php",
		   success: function(data){  				      			      
				generaTablaProfesores(JSON.parse(data));   													
				ocultarEspera("esperahor");  																											
		},
		error: function(dataMat) {	                  
				alert('ERROR: '+dataMat);
							}
});	      	      					  					  		
}

function generaTablaProfesores(grid_data){	
contAlum=1;
$("#cuerpoMaterias").empty();
$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
//$("#btnfiltrar").attr("disabled","disabled");
jQuery.each(grid_data, function(clave, valor) { 

	if (valor.ALUM>0) {
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:14px;\">"+valor.CICLO+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:14px;\">"+valor.PROFESOR+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:14px;\">"+valor.PROFESORD+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:14px;\">"+valor.DEPTO+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:10px;\">"+valor.DEPTOD+"</td>");

		evento="onclick=\"verMaterias('"+$("#selCiclos").val()+"','"+valor.PROFESOR+"');\"";

		stpor="";
		porc=Math.round((parseInt(valor.RES)/parseInt(valor.ALUM)*100),1);
		if (porc==0) stpor="class=\"badge  badge-danger\"";
		if ((porc>0) && (porc<=50)) stpor="class=\"badge  badge-warning\"";
		if ((porc>50) && (porc<=99)) stpor="class=\"badge  badge-success\"";
		if (porc>=100) stpor="class=\"badge  badge-primary\"";

		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><a "+evento+"><span title=\"click para ver asiganturas del profesor\" style=\"cursor:pointer\" class=\"badge  badge-info\">"+valor.ALUM+"</span></a></td>");
		$("#rowM"+contAlum).append("<td><span title=\"Número de alumnos que han respondido la encuensta\" class=\"badge badge-success\"><i class=\"fa fa-male white\"> "+valor.RES+"</i></span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span "+stpor+">"+porc+" %</span></td>");
		


		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+
		                                "<button onclick=\"window.open('reporteEval.php?ciclo="+valor.CICLO+"&profesor="+valor.PROFESOR+"&profesord="+valor.PROFESORD+"&deptod="+valor.DEPTOD+"');\""+
		                                " class=\"btn btn-white btn-success btn-round\">"+
		                                "<i class=\"/ace-icon blue fa fa-tachometer bigger-140\"></i> Reporte</button></td>");
		contAlum++;      			
	}
});	
} 

function verMaterias(ciclo,profesor){
	elsqlMa=elsql="select a.IDDETALLE, PROFESOR, PROFESORD, MATERIA, MATERIAD, SEMESTRE, SIE AS GRUPO, "+
	"(SELECT COUNT(DISTINCT(l.MATRICULA)) FROM ed_respuestas l where l.TERMINADA='S' and l.IDGRUPO=a.IDDETALLE) AS RES, "+
	"(select count(*) from dlista where IDGRUPO=a.IDDETALLE AND BAJA='N') AS ALUM "+
	" from vedgrupos a where a.CICLO='"+ciclo+"' and PROFESOR='"+profesor+"'"+ " ORDER BY SEMESTRE,MATERIAD";

	parametros={sql:elsqlMa,dato:sessionStorage.co,bd:"Mysql"}

	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  				      			      
			cad="<ol>";
			jQuery.each(JSON.parse(data), function(clave, valor) {
			   cad+="<li style=\"text-align:justify;\">"+valor.MATERIA+" "+valor.MATERIAD+
					"   <span title=\"Número de alumnos en el grupo\" class=\"badge badge-primary\">"+valor.ALUM+"</span>"+
					"   <span title=\"Número de alumnos que han respondido encuesta\" class=\"badge badge-success\">"+valor.RES+"</span>"+					
			        "</li>"; 
			});	
			cad+="</ol>";
			
			mostrarIfo("infoMat","grid_resEvalDoc","Asignaturas",cad,"modal-lg"); 
	 },
	 error: function(dataMat) {	                  
			 alert('ERROR: '+dataMat);
						 }
    });	  
   	      				
}


/*===========================================================POR ALUMNOS==============================================*/


function cargarInformacionA(){
	script="<table id=\"tabMaterias\" name=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
			">"+
		  "        <thead >  "+
	   "             <tr id=\"headMaterias\">"+
	   "                <th>No.</th> "+
	   "                <th>Ciclo</th> "+	
	   "                <th>No. Control</th> "+	
	   "                <th>Nombre Alumno</th> "+	
	   "                <th>#Mat</th> "+
	   "                <th>Res</th> "+
	   "                <th>%Res</th> "+	   
	   "             </tr> "+
	   "            </thead>" +
	   "         </table>";
	   $("#informacion").empty();
	   $("#informacion").append(script);
			
	elsql="select PDOCVE AS CICLO,ALUM_MATRICULA as MATRICULA, concat (ALUM_APEPAT,' ',ALUM_APEMAT,' ', ALUM_NOMBRE) as NOMBRE, "+
	" count(*) as NMAT,"+
	" (SELECT COUNT(DISTINCT(l.IDGRUPO)) FROM ed_respuestas l where l.TERMINADA='S' and l.CICLO='"+$("#selCiclos").val()+"' and l.MATRICULA=b.ALUM_MATRICULA) AS RES"+
	" from dlista a, falumnos b, cmaterias c  where PDOCVE='"+$("#selCiclos").val()+"'"+
	" and a.ALUCTR=b.ALUM_MATRICULA"+
	" and a.MATCVE=c.MATE_CLAVE"+
	" and b.ALUM_CARRERAREG='"+$("#selCarreras").val()+"'"+
	" group by PDOCVE,ALUCTR";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_resEvalDoc","Cargando Datos...");
	$.ajax({
		   type: "POST",
		   data:parametros,
		   url:  "../base/getdatossqlSeg.php",
		   success: function(data){  				      			      
				generaTablaAlumnos(JSON.parse(data));   													
				ocultarEspera("esperahor");  																											
		},
		error: function(dataMat) {	                  
				alert('ERROR: '+dataMat);
							}
});	      	      					  					  		
}

function generaTablaAlumnos(grid_data){	
contAlum=1;
$("#cuerpoMaterias").empty();
$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
//$("#btnfiltrar").attr("disabled","disabled");
jQuery.each(grid_data, function(clave, valor) { 

		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:14px;\">"+valor.CICLO+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:14px;\">"+valor.MATRICULA+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:14px;\">"+valor.NOMBRE+"</td>");
	
		evento="onclick=\"verMateriasA('"+$("#selCiclos").val()+"','"+valor.MATRICULA+"');\"";

		stpor="";
		porc=Math.round((parseInt(valor.RES)/parseInt(valor.NMAT)*100),1);
		if (porc==0) stpor="class=\"badge  badge-danger\"";
		if ((porc>0) && (porc<=50)) stpor="class=\"badge  badge-warning\"";
		if ((porc>50) && (porc<=99)) stpor="class=\"badge  badge-success\"";
		if (porc>=100) stpor="class=\"badge  badge-primary\"";

		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><a "+evento+"><span title=\"click para ver asiganturas del profesor\" style=\"cursor:pointer\" class=\"badge  badge-info\">"+valor.NMAT+"</span></a></td>");
		$("#rowM"+contAlum).append("<td><span title=\"Número de materias que ha evaluado\" class=\"badge badge-success\"><i class=\"fa fa-male white\"> "+valor.RES+"</i></span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span "+stpor+">"+porc+" %</span></td>");
		

		contAlum++;      			

});	
} 

function verMateriasA(ciclo,alumno){
	elsqlMa=elsql="select MATCVE AS MATERIA, MATE_DESCRIP AS MATERIAD, getcuatrimatxalum(MATCVE,ALUCTR) AS SEM "+
	" from dlista a, cmaterias c  where  PDOCVE='"+ciclo+"'  and  a.MATCVE=c.MATE_CLAVE AND ALUCTR='"+alumno+"'  ORDER BY 3,1";

	parametros={sql:elsqlMa,dato:sessionStorage.co,bd:"Mysql"}

	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  				      			      
			cad="<ol>";
			jQuery.each(JSON.parse(data), function(clave, valor) {
			   cad+="<li style=\"text-align:justify;\">"+valor.MATERIA+" "+valor.MATERIAD+					
			        "</li>"; 
			});	
			cad+="</ol>";
			
			mostrarIfo("infoMat","grid_resEvalDoc","Asignaturas",cad,"modal-lg"); 
	 },
	 error: function(dataMat) {	                  
			 alert('ERROR: '+dataMat);
						 }
    });	  
   	      				
}
