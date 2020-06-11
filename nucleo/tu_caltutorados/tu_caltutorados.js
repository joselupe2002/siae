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


		$("#lasmaterias").append("<span class=\"label label-danger\">Materia Tutoría</span>");
		addSELECT("selMateria","lasmaterias","PROPIO", "SELECT a.ID, CONCAT(a.MATERIA,'|',a.MATERIAD,'|',a.SIE) FROM vcargasprof a where a.CICLO="+
		"getciclo() and a.TIPOMAT IN ('T') AND a.PROFESOR='"+usuario+"'", "","");  	
		
		$("#losalumnos").append("<span class=\"label label-warning\">Alumno</span>");
		addSELECT("selAlumnos","losalumnos","PROPIO", "SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE, ' ',ALUM_APEPAT,' ',ALUM_APEMAT) "+
		" FROM falumnos where ALUM_CARRERAREG=100 order by ALUM_NOMBRE, ALUM_APEPAT, ALUM_APEMAT", "","BUSQUEDA"); 
			
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selMateria') {	
			
			actualizaSelect("selAlumnos","SELECT ALUM_MATRICULA, CONCAT(ALUM_APEPAT,' ',ALUM_APEMAT,' ',ALUM_NOMBRE) AS NOMBRE "+
									  "FROM dlista, falumnos where ALUCTR=ALUM_MATRICULA and IDGRUPO="+
									  $("#selMateria").val()+" ORDER BY 2","BUSQUEDA","");
			}
		if (elemento=='selAlumnos') {$("#informacion").empty(); cargarInformacion();}

		}  



    function cargarInformacion(){

		mostrarEspera("esperaInf","grid_tu_caltutorados","Cargando Datos...");
		elsql="SELECT MAX((select count(*) from eunidades l where "+
		"l.UNID_MATERIA=e.MATCVE and UNID_PRED='')) AS N from dlista e  where  "+
		"e.ALUCTR='"+$("#selAlumnos").val()+"' and PDOCVE=getciclo()";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){      	    
				jQuery.each(JSON.parse(data), function(clave, valor) { 	
					maxuni=valor.N;
					});

	  
				sqlMat="select e.ID, e.ALUCTR as MATRICULA,e.PDOCVE AS CICLO, e.MATCVE AS MATERIA, f.MATE_DESCRIP AS MATERIAD, "+
							"ifnull(LISCAL,0) as LISCAL,ifnull(LISPA1,0)  as LISPA1,ifnull(LISPA2,0) AS LISPA2,ifnull(LISPA3,0) as LISPA3,"+
							"ifnull(LISPA4,0) as LISPA4,ifnull(LISPA5,0) as LISPA5,ifnull(LISPA6,0) as LISPA6,ifnull(LISPA7,0) as LISPA7,"+
							"ifnull(LISPA8,0) as LISPA8,ifnull(LISPA9,0) as LISPA9,ifnull(LISPA10,0) as LISPA10, ifnull(LISPA11,0) as LISPA11,"+
							"ifnull(LISPA12,0) AS LISPA12,ifnull(LISPA13,0) AS LISPA13,ifnull(LISPA14,0) AS LISPA14,ifnull(LISPA15,0) AS LISPA15,"+
								" e.GPOCVE AS GRUPO, e.LISTC15 as PROFESOR, concat(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS PROFESORD,"+
								" (select count(*) from eunidades l where l.UNID_MATERIA=e.MATCVE and UNID_PRED='') AS NUMUNI,"+
								" getcuatrimatxalum(e.MATCVE,ALUCTR) AS SEM "+
								" from dlista e, cmaterias f, pempleados g  where  e.LISTC15=g.EMPL_NUMERO and e.MATCVE=f.MATE_CLAVE"+        	                      
								" AND e.ALUCTR='"+$("#selAlumnos").val()+"' and PDOCVE=getciclo()";			  		  
				parametros={sql:sqlMat,dato:sessionStorage.co,bd:"Mysql"}
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
								ocultarEspera("esperaInf");  
							}
					});
		   
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
	caduni="";

	for (i=1; i<=maxuni;i++) {caduni+="<th>CP"+i+"</th>";}
	$("#tabInformacion").append("<thead><tr id=\"headMaterias\">"+
	"<th style=\"text-align: center;\">Clave</th>"+ 
	"<th style=\"text-align: center;\">Materia</th>"+
	"<th style=\"text-align: center;\">Profesor</th>"+
	"<th style=\"text-align: center;\">SEM</th>"+
	"<th style=\"text-align: center;\">NU</th>"+
	"<th style=\"text-align: center;\">CF</th>"+caduni); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 jQuery.each(grid_data, function(clave, valor) { 	
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.MATERIA+"\">");    	   
		 $("#row"+valor.MATERIA).append("<td>"+valor.MATERIA+"</td>");         	    
		 $("#row"+valor.MATERIA).append("<td>"+utf8Decode(valor.MATERIAD)+"</td>");
		 $("#row"+valor.MATERIA).append("<td>"+utf8Decode(valor.PROFESORD)+"</td>");
		 $("#row"+valor.MATERIA).append("<td>"+valor.SEM+"</td>");
		 $("#row"+valor.MATERIA).append("<td>"+valor.NUMUNI+"</td>");
		 $("#row"+valor.MATERIA).append("<td>"+valor.LISCAL+"</td>");
		
		 for (i=1; i<=maxuni;i++) {
			  cal=grid_data[clave]["LISPA"+i];
			  caltxt="<span class=\"pull-right badge badge-danger\">"+cal+"</span>";
			  if (cal>=70) { caltxt="<span class=\"pull-right badge badge-info\">"+cal+"</span>";}
			 $("#row"+valor.MATERIA).append("<td>"+caltxt+"</td>"); 
			 }
		$("#row"+valor.MATERIA).append("</tr>");
	 });
	$('#dlgproceso').modal("hide"); 
}	



