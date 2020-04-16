

function vercalunidad(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
	    
		cargarCalificaciones(table.rows('.selected').data()[0]["UNIDAD"],
							 table.rows('.selected').data()[0]["GRUPO"],
							 table.rows('.selected').data()[0]["CICLO"],
							 table.rows('.selected').data()[0]["NUM_PROFESOR"],
							 table.rows('.selected').data()[0]["CVE_MATERIA"],
							 );
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}
	
}


function cargarCalificaciones(unidad,grupo,ciclo, profesor, materia) {	
	launidad=unidad;  
	dameVentana("venCal","grid_vbitacoracal","Calificaciones","lg","bg-success","fa blue bigger-160 fa-list-ul","360");
	$("#body_venCal").append("<div  class=\"table-responsive\" style=\"overflow-y: auto; height: 300px;\" >"+
								  "<table id=\"latablaCal\" class= \"display table-condensed table-striped table-sm "+
								          "table-bordered table-hover nowrap\" ></table>"+
                             "</div>");

	$.ajax({
		type: "GET",
		url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select a.ID, ALUM_MATRICULA,  CONCAT(ALUM_APEPAT,' ',ALUM_APEMAT,' ',ALUM_NOMBRE) AS NOMBRE,"+
		         " LISPA"+launidad+" as CAL, LISFA"+launidad+" as FALTA"+
				 " from dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA and a.GPOCVE='"+grupo+"'"+
				 " and PDOCVE='"+ciclo+"' and LISTC15='"+profesor+"'"+
				 " and MATCVE='"+materia+"' order by 2"),
		success: function(data){    
			$("#latablaCal").empty();
			$("#latablaCal").append("<thead><tr id=\"titulo\"><th style=\"text-align: center;\">No. Control</th>"+ 
											 "<th style=\"text-align: center;\">Nombre</th><th colspan=\"2\" style=\"text-align: center;\">Calif.</th><th style=\"text-align: center;\">Faltas.</th></tr></thead>"); 
		
			$("#latablaCal").append("<tbody id=\"cuerpoCal\">");		        	 
			jQuery.each(JSON.parse(data), function(clave, valor) { 
				   $("#cuerpoCal").append("<tr id=\"rowCal"+valor.ID+"\">");				
				   $("#rowCal"+valor.ID).append("<td id=\"matricula_"+valor.ID+"\">"+valor.ALUM_MATRICULA+"</td>");
				   $("#rowCal"+valor.ID).append("<td id=\"nombre_"+valor.ID+"\">"+utf8Decode(valor.NOMBRE)+"</td>");
                   $("#rowCal"+valor.ID).append("<td id=\"cal_"+valor.ID+"\">"+valor.CAL+"</td>");
				   laruta="..\\..\\imagenes\\menu\\mal.png";
				   if (valor.CAL>=70) {laruta="..\\..\\imagenes\\menu\\bien.png"; }  			    	                                 
				   $("#rowCal"+valor.ID).append("<td><img id=\"SELIMG_"+valor.ID+"\" width=\"20px\" height=\"20px\" src=\""+laruta+"\"></td>");
				   $("#rowCal"+valor.ID).append("<td id=\"calf_"+valor.ID+"\">"+valor.FALTA+"</td>");								
			  });
			},
		error: function(data) {	                  
				   alert('ERROR: '+data);
			   }
	   });
   }


