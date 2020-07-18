var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";


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

		elsql="select COUNT(*) "+
		 " from dlista e, cmaterias f, pempleados g  where  e.LISTC15=g.EMPL_NUMERO and e.MATCVE=f.MATE_CLAVE"+ 
		 " and PDOCVE='"+$("#selCiclo").val()+"'"+       	                      
		 " AND e.ALUCTR='"+usuario+"' and e.BAJA='N' and CERRADO='S'";
		
	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){ 
		          	  
				hay=JSON.parse(data)[0][0];   
			    if (hay>0) {
					mostrarEspera("esperaInf","grid_pa_mihorario","Cargando Datos...");
					elsql="select e.ID, e.ALUCTR as MATRICULA,e.PDOCVE AS CICLO, e.MATCVE AS MATERIA, f.MATE_DESCRIP AS MATERIAD, "+
					"ifnull(LISCAL,0) as LISCAL,ifnull(LISPA1,0)  as LISPA1,ifnull(LISPA2,0) AS LISPA2,ifnull(LISPA3,0) as LISPA3,"+
					"ifnull(LISPA4,0) as LISPA4,ifnull(LISPA5,0) as LISPA5,ifnull(LISPA6,0) as LISPA6,ifnull(LISPA7,0) as LISPA7,"+
					"ifnull(LISPA8,0) as LISPA8,ifnull(LISPA9,0) as LISPA9,ifnull(LISPA10,0) as LISPA10, ifnull(LISPA11,0) as LISPA11,"+
					"ifnull(LISPA12,0) AS LISPA12,ifnull(LISPA13,0) AS LISPA13,ifnull(LISPA14,0) AS LISPA14,ifnull(LISPA15,0) AS LISPA15,"+
					" e.GPOCVE AS GRUPO, e.LISTC15 as PROFESOR, concat(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS PROFESORD,"+
					" (select count(*) from eunidades l where l.UNID_MATERIA=e.MATCVE and UNID_PRED='') AS NUMUNI,"+
					" getcuatrimatxalum(e.MATCVE,ALUCTR) AS SEM "+
					" from dlista e, cmaterias f, pempleados g  where  e.LISTC15=g.EMPL_NUMERO and e.MATCVE=f.MATE_CLAVE"+ 
					" and PDOCVE='"+$("#selCiclo").val()+"'"+       	                      
					" AND e.ALUCTR='"+usuario+"' and e.BAJA='N' and CERRADO='S' order by PDOCVE DESC";	
				

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
				else {
					
					mostrarIfo('infoNo','grid_pa_miboleta','Sin Datos','No existen materias cerradas en este ciclo','modal-lg');

				}     		   
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
	"<th style=\"text-align: center;\">No.</th>"+ 
	"<th style=\"text-align: center;\">SEM</th>"+
	"<th style=\"text-align: center;\">GRUPO</th>"+
	"<th style=\"text-align: center;\">PROFESOR</th>"+
	"<th style=\"text-align: center;\">MATERIA</th>"+
	"<th style=\"text-align: center;\">LISCAL</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 jQuery.each(grid_data, function(clave, valor) { 	
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ID+"\">");  
		 $("#row"+valor.ID).append("<td>"+valor.ID+"</td>");     	
		 $("#row"+valor.ID).append("<td>"+valor.SEM+"</td>");    
		 $("#row"+valor.ID).append("<td>"+valor.GRUPO+"</td>");  
		 $("#row"+valor.ID).append("<td>"+valor.PROFESOR+"</td>");     
		 $("#row"+valor.ID).append("<td>"+valor.MATERIA+" "+valor.MATERIAD+"</td>");    
		 if (valor.LISCAL>=70) {cadsp="<span class=\"badge badge-primary\">"+valor.LISCAL+"</span>";}  
		 else {cadsp="<span class=\"badge badge-danger\">"+valor.LISCAL+"</span>";}  	    
		 $("#row"+valor.ID).append("<td>"+cadsp+"</td>");
		$("#row"+valor.ID).append("</tr>");
	 });
	$('#dlgproceso').modal("hide"); 
}	



function ImprimirReporte(){
	enlace="nucleo/pa_miboleta/boleta.php?matricula="+usuario+"&ciclod=&ciclo="+$('#selCiclo').val();
	abrirPesta(enlace,"Reporte_Horario");
}