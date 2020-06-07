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
	
		script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headMaterias\">"+
		   "                <th>No.</th> "+
		   "                <th>No. Control</th> "+
		   "                <th>Nombre</th> "+	
		   "                <th>Carrera</th> "+	
		   "                <th>Correo</th> "+	
		   "                <th>Teléfono 1</th> "+
		   "                <th>Teléfono 2</th>"+
		   "                <th>Tutor</th>"+
		   "                <th>Tel. Tutor</th>"+
		   "                <th>Municipio</th> "+
		   "                <th>Ciudad</th> "+
		   "                <th>Direccion</th> "+
		   "              </tr>"+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);

				
		elsql="select distinct ALUM_MATRICULA AS MATRICULA, b.alum_nombrec as NOMBRE, ALUM_CARRERAREG AS CARRERA,"+ 
			  "ALUM_CORREO AS CORREO, ALUM_CARRERAREGD AS CARRERAD, b.ALUM_TELEFONO AS TELEFONO1, b.alum_telefono AS TELEFONO2,b.alum_tutor AS TUTOR,"+
			  "b.alum_teltutor AS TELTUTOR,b.alum_poblaciond as POBLACIOND, IFNULL(b.alum_municipiod,'SIN DATO') AS MUNICIPIOD, "+
			  "b.alum_direccion as DIRECCION,b.alum_ciudad as CIUDAD from dlista a, pvalumnos_cb b "+
			  " where a.PDOCVE='"+$("#selCiclos").val()+"' and a.ALUCTR=b.ALUM_MATRICULA and "+
			  " alum_carrerareg='"+$("#selCarreras").val()+"'";
	  
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		mostrarEspera("esperaInf","grid_vstliscontacto","Cargando Datos...");
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
		$("#cuerpoInformacion").append("<tr id=\"rowM"+contR+"\">");
		$("#rowM"+contR).append("<td>"+contR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.MATRICULA+"</td>");
		$("#rowM"+contR).append("<td>"+valor.NOMBRE+"</td>");
		$("#rowM"+contR).append("<td>"+valor.CARRERAD+"</td>");
		$("#rowM"+contR).append("<td>"+valor.CORREO+"</td>");
		$("#rowM"+contR).append("<td>"+valor.TELEFONO1+"</td>");
		$("#rowM"+contR).append("<td>"+valor.TELEFONO2+"</td>");
		$("#rowM"+contR).append("<td>"+valor.TUTOR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.TELTUTOR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.MUNICIPIOD+"</td>");
		$("#rowM"+contR).append("<td>"+valor.CIUDAD+"</td>");
		$("#rowM"+contR).append("<td>"+valor.DIRECCION+"</td>");		
	    contR++;      			
	});	
	
} 


