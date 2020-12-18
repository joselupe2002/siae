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


		elsql="SELECT a.ID, CONCAT(a.MATERIA,'|',a.MATERIAD,'|',a.SIE,'|',a.CARRERAD) FROM vcargasprof a where a.CICLO="+
				"'1' and a.TIPOMAT IN ('T') AND a.PROFESOR='"+usuario+"'";

		$("#lasmaterias").append("<span class=\"label label-danger\">Materia Tutoría</span>");
			addSELECT("selMateria","lasmaterias","PROPIO",elsql , "","BUSQUEDA");  	

		$("#loscortes").append("<span class=\"label label-danger\">Corte de Calificación</span>");
		addSELECT("selCortes","loscortes","PROPIO", "SELECT ID, DESCRIPCION FROM ecortescal  WHERE CICLO='1' and CLASIFICACION='CALIFICACION' ORDER BY ID ", "","");  					


		
		$("#losciclos2").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclos2","PROPIO","SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) FROM CICLOSESC ORDER BY CICL_CLAVE DESC" , "","");  	


		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
	    $("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");

	
		
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=="selCiclos") {
			if ((roles.indexOf("DOCENTE")>=0) ){
				elsql="SELECT a.ID, CONCAT(a.MATERIA,'|',a.MATERIAD,'|',a.SIE,'|',a.CARRERAD) FROM vcargasprof a where a.CICLO="+
				"'"+$("#selCiclos").val()+"' and a.TIPOMAT IN ('T') AND a.PROFESOR='"+usuario+"'";
			} 
			else {
				elsql="SELECT a.ID, CONCAT(a.MATERIA,'|',a.MATERIAD,'|',a.SIE,'|',a.CARRERAD) FROM vcargasprof a where a.CICLO="+
				"'"+$("#selCiclos").val()+"' and a.TIPOMAT IN ('T')";
			} 

		
			actualizaSelect("selMateria",elsql , "BUSQUEDA","");  	

			actualizaSelect("selCortes", "SELECT ID, DESCRIPCION FROM ecortescal  WHERE CICLO='"+$("#selCiclos").val()+"' and CLASIFICACION='CALIFICACION' ORDER BY ID ", "","");  					

		
			$("#elciclo").html($("#selCiclos").val());
		

		}
    }

	function exportar (){
		$("#tabAvances").tableExport();
	}

    function cargarAvances(){

		$("#opcionestabAvances").addClass("hide");
		$("#botonestabAvances").empty();
		
		script="<table id=\"tabAvances\" class= \" fontRobotoB table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headAvances\">"+
		   "                <th>No.</th> "+
		   "                <th>Control</th> "+	
		   "                <th>Nombre</th> "+	
		   "                <th>Per</th> "+		
		   "             </tr> "+
		   "            </thead>" +
		   "         </table>";
		   $("#losAvances").empty();
		   $("#losAvances").append(script);
				
		elsql="SELECT distinct ALUM_MATRICULA, concat(ALUM_APEPAT,' ',ALUM_APEMAT, ' ',ALUM_NOMBRE) AS NOMBRE,"+
		" getPeriodos(ALUM_MATRICULA,'"+$("#selCiclos").val()+"') as PERIODOS  FROM "+
		" dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA and a.IDGRUPO="+$("#selMateria").val()+

		" ORDER BY ALUM_MATRICULA";
		mostrarEspera("esperahor","grid_avancegral","Cargando Datos...");

	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  				      
					  generaTablaAvances(JSON.parse(data));   
						 
					   elsqlMat="SELECT DISTINCT MATCVE AS MATERIA, MATE_DESCRIP AS MATERIAD from dlista g, cmaterias h "+
					            " where g.MATCVE=h.MATE_CLAVE AND g.PDOCVE='"+$("#selCiclos").val()+"'"+
					            "AND h.MATE_TIPO NOT IN ('OC') AND g.ALUCTR IN ("+
								"    SELECT  a.ALUCTR FROM dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA and "+
								"    a.IDGRUPO="+$("#selMateria").val()+")";	
									
						parametros2={sql:elsqlMat,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros2,
							url:  "../base/getdatossqlSeg.php",
							success: function(dataMat){  											      
									generaTablaMaterias(JSON.parse(dataMat));  
																												
									   	      					  					  
								},
								error: function(dataMat) {	                  
										alert('ERROR: '+dataMat);
													}
						});	      	      					  					  
	            },
	        	error: function(data) {	                  
	        	   	    alert('ERROR: '+data);
	        	   	                  }
	    });	        	   	   	        	    	 
		
}


function generaTablaAvances(grid_data){
	contAlum=1;
	$("#cuerpoAvances").empty();
	$("#tabAvances").append("<tbody id=\"cuerpoAvances\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 	        			
		$("#cuerpoAvances").append("<tr id=\"rowA"+contAlum+"\">");
		
		$("#rowA"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowA"+contAlum).append("<td id=\"alum_"+contAlum+"\" style=\"font-size:10px;\">"+valor.ALUM_MATRICULA+"</td>");
		$("#rowA"+contAlum).append("<td id=\"Nalum_"+contAlum+"\" style=\"font-size:10px;\">"+valor.NOMBRE+"</td>");
		$("#rowA"+contAlum).append("<td style=\"font-size:10px;\"><span class=\"badge  badge-info\">"+valor.PERIODOS+"</span></td>");

	    contAlum++;      			
	});	
	
} 



function generaTablaMaterias(grid_data){
	contMat=1;
	//$("#btnfiltrar").attr("disabled","disabled");
	colorSem=["success","warning","danger","info","purple","inverse","pink","yellow","grey","success"];
	fondos=["bg-success","bg-danger","bg-warning","bg-primary","bg-yellow","bg-purple","bg-info","bg-inverse","bg-grey","bg-pink"];
	jQuery.each(grid_data, function(clave, valor) { 
	    	        			
		$("#headAvances").append("<th style=\"font-size:8px;\" class=\""+fondos[3]+"\" title=\""+valor.MATERIAD+"\" >"+
								"<span class=\"materias\" id=\"mat_"+contMat+"\" "+
									   "fondo=\""+fondos[3]+"\" descrip=\""+valor.MATERIAD+"\" >"+valor.MATERIAD.substring(0,10)+
								"</span>"+
								//"<span class=\"badge badge-"+colorSem[valor.SEMESTRE]+"\" >"+valor.SEMESTRE+
								//"</span>"+								
								 "</th>");	  
								 
		for (i=1;i<contAlum;i++) {

			elsqlPaso="select "+i+" as ID, ifnull(TIPO,'') AS TIPO, b.DESCRIP AS DESCRIP, b.CORTO AS CORTO,"+
			" ifnull(OBS,'') AS OBS, "+
			" (select count(*) from dlista b where b.ALUCTR='"+$("#alum_"+i).html()+
			          "' AND b.MATCVE='"+valor.MATERIA+"' AND BAJA='N' AND PDOCVE='"+$("#selCiclos").val()+"') AS LLEVA,"+
			" COUNT(*) AS HAY "+
			" from tut_motrepalum a, tut_catmotrep b where  a.TIPO=b.ID and  MATERIA='"+valor.MATERIA+"'"+
			" AND IDCORTE="+$("#selCortes").val()+" and MATRICULA='"+$("#alum_"+i).html()+"'";

			
			parametros3={sql:elsqlPaso,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros3,
				url:  "../base/getdatossqlSeg.php",
				success: function(dataPaso){ 
					misdatos=JSON.parse(dataPaso);
				
					if (misdatos[0]["LLEVA"]>0) {
					   if (misdatos[0]["HAY"]>0) {	$("#rowA"+misdatos[0]["ID"]).append("<td><span title=\""+misdatos[0]["DESCRIP"]+"\" class=\"badge badge-warning\">"+misdatos[0]["CORTO"]+"</badge></td>");}	
					   else {$("#rowA"+misdatos[0]["ID"]).append("<td><span title=\""+misdatos[0]["DESCRIP"]+"\" class=\"badge badge-danger\">"+"SD"+"</badge></td>");}							      
					}
					else {$("#rowA"+misdatos[0]["ID"]).append("<td><span title=\"No Cursa la asignatura\" ><i class=\"fa fa-times green\"></i></badge></td>");}							      
			
				}
			});
			
		}

	    contMat++;   			
	});	
	
} 