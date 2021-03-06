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
		addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_CLAVE=0", "","");  			      

		
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				actualizaSelect("selCarreras", "(SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+")) UNION (SELECT '%', 'TODAS LAS CARRERAS' FROM DUAL)", "",""); 				
				miscarreras=data;
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });
		
		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by cicl_clave desc", "","");  			      
		
		ayuda="Información General de los alumnos Reinscritos";
		$("#losciclos").append("<i class=\" fa yellow fa-info bigger-180\" title=\""+ayuda+"\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");

		$("#lossemestre").append("<span class=\"label label-danger\">Semestre(s)</span>");
		$("#lossemestre").append("<input class=\"form-control captProy\" id=\"semestres\"></input>");
	

		
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
		   "                <th>CICLO</th> "+
		   "                <th>CVE</th> "+	
		   "                <th>CARRERA</th> "+	
		   "                <th>MATRICULA</th> "+	
		   "                <th>NOMBRE</th> "+	
		   "                <th>GENERO</th> "+	
		   "                <th>SEMESTRE</th> "+	
		   "                <th>CRED.SEM.</th> "+	
		   "                <th>PROM_SE</th> "+	
		   "                <th>CRED.ACU.</th> "+	
		   "                <th>%AVAN</th> "+	
		   "                <th>PROM. GEN.</th> "+	
		   "              </tr>"+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);


				
		   tagCarreras=" AND CARRERA='"+$("#selCarreras").val()+"'";
		   if ($("#selCarreras").val()=='%') {tagCarreras=" AND CARRERA IN ("+miscarreras+")";}
		   tagSemestres="";
		   if ($("#semestres").val()!='') {tagSemestres=" AND SEMESTRE IN ("+$("#semestres").val()+")";}

		elsql="select * FROM vst_infogensem where CICLO='"+$("#selCiclos").val()+"'"+tagCarreras+tagSemestres+
		" ORDER BY SEMESTRE, NOMBRE";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

	
		mostrarEspera("esperaInf","grid_vstdesxgen","Cargando Datos...Puede tardar");
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
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	
	jQuery.each(grid_data, function(clave, valor) { 
  	
		alert 
		$("#cuerpoInformacion").append("<tr id=\"rowM"+contR+"\">");
		$("#rowM"+contR).append("<td>"+contR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.CICLO+"</td>");
		$("#rowM"+contR).append("<td>"+valor.CARRERA+"</td>");
		$("#rowM"+contR).append("<td>"+valor.CARRERAD+"</td>");
		$("#rowM"+contR).append("<td>"+valor.MATRICULA+"</td>");
		$("#rowM"+contR).append("<td>"+valor.NOMBRE+"</td>");
		$("#rowM"+contR).append("<td>"+valor.GENERO+"</td>");
		$("#rowM"+contR).append("<td>"+valor.SEMESTRE+"</td>");
		$("#rowM"+contR).append("<td>"+valor.CRED_SEM+"</td>");
		$("#rowM"+contR).append("<td>"+valor.PROMEDIO_SEMESTRE+"</td>");
		$("#rowM"+contR).append("<td>"+valor.CRED_ACUMULADOS+"</td>");
		$("#rowM"+contR).append("<td>"+valor.AVANCE+"</td>");
		$("#rowM"+contR).append("<td>"+valor.PROMEDIOG+"</td>");
		contR++;
	});

	
} 


