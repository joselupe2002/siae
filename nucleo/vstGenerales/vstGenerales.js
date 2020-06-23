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

		$("#lascarreras").append("<span class=\"label label-primary\">Carrera</span>");
		addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_CLAVE=0", "","");  			      

		
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				actualizaSelect("selCarreras", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+")", "",""); 
				$("#selCarreras").append("<option value=\"%\">TODAS LAS CARRERAS</option>");
				miscarreras=data;
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });
		
		$("#losciclossel").append("<span class=\"label label-primary\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc WHERE CICL_CLAVE=9999", "","");  			      
	
		actualizaSelect("selCiclos", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc UNION SELECT '%','TODOS LOS CICLO' FROM DUAL order by 1 DESC", "",""); 
		
		$("#losreportes").append("<span class=\"label label-danger\">Reporte</span>");
		addSELECT("selReportes","losreportes","PROPIO", "SELECT ID, NOMBRE FROM strepgenerales order by NOMBRE DESC", "","");  			      

	
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
	
    }


    function cargarInformacion(){
		$("#opcionestabInformacion").addClass("hide");
		$("#botonestabInformacion").empty();
		
		elsql="select * from strepgenerales where id="+$("#selReportes").val();

		tagCarreras="="+$("#selCarreras").val();
		if ($("#selCarreras").val()=='%') {tagCarreras=" IN ("+miscarreras+")";}
		tagCiclos="="+$("#selCiclos").val();
		if ($("#selCiclos").val()=='%') {tagCiclos="LIKE '%'";}
		
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
  		mostrarEspera("esperaInf","grid_vstGenerales","Cargando Datos...");
		$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){  
					elsqlCon=JSON.parse(data)[0]["ELSQL"];
					elsqlCon=elsqlCon.replace(/IN {CARRERA}/gi,tagCarreras);
					elsqlCon=elsqlCon.replace(/IN {CICLO}/gi,tagCiclos);
					miscampos=JSON.parse(data)[0]["CAMPOS"].split("|");
		            misclases=JSON.parse(data)[0]["CLASES"].split("|");
					parametros={sql:elsqlCon,dato:sessionStorage.co,bd:"Mysql"}
	
					$.ajax({
						type: "POST",
						data:parametros,
						url:  "../base/getdatossqlSeg.php",
						success: function(data){ 

							cadCampos="";
							miscampos.forEach(element => cadCampos+="<th>"+element+"</th>");

							script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\">"+
							    "        <thead>  "+
								"             <tr id=\"headMaterias\"><td>No.</td>"+cadCampos+"</tr>"
								"            </thead>" +
								"         </table>";

					        $("#informacion").empty();
							$("#informacion").append(script);
							 generaTablaInformacion(JSON.parse(data),miscampos,misclases);   
							 ocultarEspera("esperaInf");  
						}
					});	
																																							
				},
				error: function(dataMat) {	                  
					alert('ERROR: '+dataMat);
								}
		});	      	      			
 					  		
}





function generaTablaInformacion(grid_data,miscampos,misclases){
	
	contR=1;
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	jQuery.each(grid_data, function(clave, valor) { 
		$("#cuerpoInformacion").append("<tr id=\"rowM"+contR+"\">");
		$("#rowM"+contR).append("<td>"+contR+"</td>");
		miscampos.forEach(function callback(currentValue, index, array) {
			cadDato=grid_data[contR-1][index];
			if (!(misclases[index]=="")) {
				cadDato="<span class=\""+misclases[index]+"\">"+grid_data[contR-1][index]+"</span></td>";
			}
			$("#rowM"+contR).append("<td>"+cadDato+"</td>");
		});	
	    contR++;      			
	});	
	
} 


