var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
	
	});
	
	
		 
	function change_SELECT(elemento) {

    }


    function cargarInformacion(){
		$("#opcionestabInformacion").addClass("hide");
		$("#botonestabInformacion").empty();
		
		script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headMaterias\">"+
		   "                <th >R</th> "+	
		   "                <th style=\"width:80%;\">SQL</th> "+	
		   "                <th>R</th> "+		
		   "              </tr>"+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);

				
		elsql="select * from tem_ed2193 order by alumno limit 15 ";
	  
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

	cadCampo="INSERT INTO ed_respuestas "+
	"(CICLO,MATRICULA,PROFESOR,MATERIA,GRUPO,RESPUESTA,FECHA,"+
	"PUNTAJE,_INSTITUCION,_CAMPUS,IDDETALLE,TERMINADA,IDPREGUNTA,IDGRUPO)"+
	" VALUE (";
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contR).html()+" "+valor.PROFESOR);   			
		
		for (var i = 0; i< valor.respuestas.length; i++) {
			var caracter = valor.respuestas.charAt(i);
			respuesta=5;
			if (caracter=="A") {respuesta=5;}
			if (caracter=="B") {respuesta=4;}
			if (caracter=="C") {respuesta=3;}
			if (caracter=="D") {respuesta=2;}
			if (caracter=="E") {respuesta=1;}
			idpreg=i+49;
			cadCampo2="'2193','"+valor.alumno+"','"+valor.profesor+"','"+
			valor.cvemateria+"','"+valor.GRUPO1+"','"+respuesta+"','15/09/2020',"+
			respuesta+",'ITSM','0','"+valor.IDDETALLE+"','S','"+idpreg+"','"+valor.IDGRUPO+"');";

			$("#cuerpoInformacion").append("<tr id=\"rowM"+contR+"\">");
			$("#rowM"+contR).append("<td>"+contR+"</td>");
			$("#rowM"+contR).append("<td>"+cadCampo+cadCampo2+"</td>");
			$("#rowM"+contR).append("<td>"+valor.respuestas+"</td>");
			contR++; 
		}

	        			
	});	
	
} 


