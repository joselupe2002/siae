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
	

		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Escolar Proceso</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc order by cicl_clave desc", "","");  			      
	
		$("#losalumnos").append("<span class=\"label label-warning\">Alumno</span>");
		addSELECT("selAlumnos","losalumnos","PROPIO", "SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) from falumnos WHERE ALUM_ACTIVO IN (1,2)", "","BUSQUEDA");  			      

		$("#lostipos").append("<span class=\"label label-warning\">Tipo Calificación</span>");
		addSELECT("selTipos","lostipos","PROPIO", "SELECT TCACVE, TCADES FROM dtcali order by TCACVE desc", "","");  			      

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selCarreras') {	
			$("#loshorarios").empty();
				
		}  
    }

/*===========================================================POR MATERIAS ==============================================*/
    function cargarInformacion(){
		
		elsql="SELECT ALUM_MAPA, IFNULL(ALUM_ESPECIALIDAD,'0') as ESP, IFNULL(b.CLAVEOF,'SE') AS ESPD FROM falumnos a "+
		" LEFT OUTER JOIN especialidad b on (b.ID=a.ALUM_ESPECIALIDAD)"+
		" WHERE ALUM_MATRICULA='"+$("#selAlumnos").val()+"'";
		$.ajax({
			type: "GET",
			url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
			success: function(data){  				      			      
				 $("#elmapa").html(JSON.parse(data)[0]["ALUM_MAPA"]);  
				 $("#laesp").html(JSON.parse(data)[0]["ESP"]);  
				 $("#laespd").html(JSON.parse(data)[0]["ESPD"]);  
				 
				 script="<table id=\"tabMaterias\" name=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
				"        <thead >  "+
				"             <tr id=\"headMaterias\">"+
				"                <th>No.</th> "+
				"                <th>Semestre</th> "+
				"                <th>Créditos</th> "+		
				"                <th>Cve. Mat.</th> "+
				"                <th>Nombre Materia</th> "+	
				"                <th>Cal.</th> "+			   
				"             </tr> "+
				"            </thead>" +
				"         </table>";
				$("#informacion").empty();
				$("#informacion").append(script);
						
				elsql="SELECT CICL_MATERIA, CICL_MATERIAD, CICL_CUATRIMESTRE AS SEM, c.CICL_CREDITO AS CRED "+
				" FROM veciclmate c where c.CICL_MAPA='"+$("#elmapa").html()+"'"+
				" and if(c.CVEESP=0,'"+$("#laesp").html()+"',CVEESP)='"+$("#laespd").html()+"' AND CICL_MATERIA NOT IN "+
			    " (SELECT MATCVE from  dlista WHERE ALUCTR='"+$("#selAlumnos").val()+"' and LISCAL>=70)";
			   
	
			
				mostrarEspera("esperahor","grid_resEvalDoc","Cargando Datos...");
				$.ajax({
					type: "GET",
					url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
					success: function(data){  				      			      
							generaTablaMaterias(JSON.parse(data));   													
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

function generaTablaMaterias(grid_data){	
	contAlum=1;
	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   			
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td id=\"IDDETALLE_"+contAlum+"\" style=\"font-size:10px;\">"+valor.IDDETALLE+"</td>");
		$("#rowM"+contAlum).append("<td id=\"Nalum_"+contAlum+"\" style=\"font-size:10px;\">"+valor.PROFESORD+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:10px;\">"+valor.MATERIAD+"</td>");						
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.GRUPO+"</span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.SEMESTRE+"</td>");

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
		

	    contAlum++;      			
	});	
} 

