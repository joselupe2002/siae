var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var total=0;
var tagCarreras="";


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
				" and CARR_CLAVE IN ("+data+") UNION (SELECT '%', 'TODAS LAS CARRERAS' FROM DUAL)", "",""); 
				miscarreras=data;
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });
		
		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Anterior</span>");
		addSELECT("selCiclosAnt","losciclossel","PROPIO", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by cicl_clave desc", "","");  			      
	
		$("#losciclossel2").append("<span class=\"label label-danger\">Ciclo Actual</span>");
		addSELECT("selCiclosAct","losciclossel2","PROPIO", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by cicl_clave desc", "","");  			      

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selCarreras') {	
			$("#tabInformacion").empty();	
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
		   "                <th>Matricula</th> "+
		   "                <th>Nombre</th> "+	
		   "                <th>Avance</th> "+	
		   "                <th>Egresado</th> "+
		   "              </tr>"+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);


		   tagCarreras="="+$("#selCarreras").val();
		   if ($("#selCarreras").val()=='%') {tagCarreras=" IN ("+miscarreras+")";}
		
		   
		elsql="select distinct ALUCTR AS MATRICULA, CONCAT(b.ALUM_NOMBRE, ' ', b.ALUM_APEPAT, ' ',b.ALUM_APEMAT) AS NOMBRE,"+
		" ALUM_CARRERAREG from dlista a, falumnos b  where a.PDOCVE='"+$("#selCiclosAnt").val()+"'"+
		" and a.ALUCTR=b.ALUM_MATRICULA and b.ALUM_CARRERAREG "+tagCarreras+
		" AND a.ALUCTR NOT IN (SELECT ALUCTR FROM dlista t WHERE t.PDOCVE='"+$("#selCiclosAct").val()+"' AND t.ALUCTR=ALUM_MATRICULA)";
		//" AND getAvanceMatCiclo(ALUM_MATRICULA,'"+$("#selCiclosAnt").val()+"')<100";

		

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	  
		mostrarEspera("esperaInf","grid_vstdesxciclo","Cargando Datos...Puede tardar");
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
	totegr=0;totdes=0;
	contR=1;

	//numero de alumnos ciclo anterior 
	elsql="select count(distinct(MATRICULA)) as MAT FROM vdlista_cred where CICLO='"+$("#selCiclosAnt").val()+"'"+
	" and CARRERA "+tagCarreras;
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  
					total=JSON.parse(data)[0]["MAT"];
				
			   }
	});


	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contR).html()+" "+valor.PROFESOR);   	
		$("#cuerpoInformacion").append("<tr id=\"rowM"+contR+"\">");
		$("#rowM"+contR).append("<td>"+contR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.MATRICULA+"</td>");
		$("#rowM"+contR).append("<td>"+valor.NOMBRE+"</td>");		
		$("#rowM"+contR).append("<td><span id=\"Mat_"+valor.MATRICULA+"\"  class=\"badge badge-danger\"></span></td>");		
		$("#rowM"+contR).append("<td><span id=\"Egr_"+valor.MATRICULA+"\"  class=\"badge badge-success\"></span></td>");		
		contR++;    
		
		
		elsqlAv="select getAvanceMatCiclo('"+valor.MATRICULA+"','"+$("#selCiclosAnt").val()+"') as AVANCE from dual";      					  
		parametros={sql:elsqlAv,dato:sessionStorage.co,bd:"Mysql"}

	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(dataAv){ 
				   
				    jQuery.each(JSON.parse(dataAv), function(claveAv, valorAv) {
						 egresado=""
						 if (valorAv.AVANCE>=100) {
							 egresado="S";
							 $("#Mat_"+valor.MATRICULA).html(valorAv.AVANCE);					 
							 $("#Egr_"+valor.MATRICULA).html(egresado);
							 $("#Mat_"+valor.MATRICULA).removeClass("badge-danger");	
							 $("#Mat_"+valor.MATRICULA).addClass("badge-primary");							 
							 totegr++;	
							 $("#captotegr").html(totegr+" / "+total);
							}  
						else {
						 	 $("#Mat_"+valor.MATRICULA).html(valorAv.AVANCE);					 
							 $("#Egr_"+valor.MATRICULA).html(egresado);
							 totdes++;				
							 $("#captotdes").html(totdes+" / "+total);
						}
					});																														
			    },
			    error: function(dataMat) {	                  
					alert('ERROR: '+dataMat);
								}
	    });	      

	});	
	$("#pie").empty();
	$("#pie").append("<div class=\"row\">"+
					 "   <div class=\"col-sm-4\"><class=\"text-primary\">Egresados: </span><span id=\"captotegr\" class=\"badge badge-success\">"+totegr+" / "+total+"</span></div>"+
					 "   <div class=\"col-sm-4\"><class=\"text-primary\">Desertores: </span><span id=\"captotdes\" class=\"badge badge-danger\">"+totegr+" / "+total+"</span></div>"+
					 "</div>"
	);
	
} 


