function cargaMaterias(contenedor, ciclo,alumno){

	elsqlMa=elsql="select MATCVE AS MATERIA, MATE_DESCRIP AS MATERIAD, getcuatrimatxalum(MATCVE,ALUCTR) AS SEM "+
	" from dlista a, cmaterias c  where  PDOCVE='"+ciclo+"'  and  a.MATCVE=c.MATE_CLAVE AND ALUCTR='"+alumno+"'  ORDER BY 3,1";

	parametros={sql:elsqlMa,dato:sessionStorage.co,bd:"Mysql"}

	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  						      			      
			cad="<ol>";
			jQuery.each(JSON.parse(data), function(clave, valor) {
			   cad+="<li style=\"text-align:justify;\">"+valor.MATERIA+" "+valor.MATERIAD+					
			        "</li>"; 
			});	
			cad+="</ol>";
			
			mostrarIfo("infoMaterias",contenedor,"Asignaturas",cad,"modal-lg"); 
	 },
	 error: function(dataMat) {	                  
			 alert('ERROR: '+dataMat);
						 }
    });	  

}

function cargaMateriasCal(contenedor, ciclo,alumno){

	elsqlMa=elsql="select MATCVE AS MATERIA, MATE_DESCRIP AS MATERIAD, getcuatrimatxalum(MATCVE,ALUCTR) AS SEM, LISCAL AS LISCAL "+
	" from dlista a, cmaterias c  where  PDOCVE='"+ciclo+"' and IFNULL(MATE_TIPO,'0') NOT IN ('AC','T','OC') "+
	" and  a.MATCVE=c.MATE_CLAVE AND ALUCTR='"+alumno+"'  ORDER BY 3,1";

	parametros={sql:elsqlMa,dato:sessionStorage.co,bd:"Mysql"}

	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  						      			      
			cad="<ol>";
			jQuery.each(JSON.parse(data), function(clave, valor) {
				elcolor='success';
				if (valor.LISCAL<70) {elcolor='danger';}
			   cad+="<li style=\"text-align:justify;\">"+valor.MATERIA+" "+valor.MATERIAD+
			            "<span class=\"badge badge-"+elcolor+"\">"+valor.LISCAL+"</span>"+					
			        "</li>"; 
			});	
			cad+="</ol>";
			
			mostrarIfo("infoMaterias",contenedor,"Asignaturas",cad,"modal-lg"); 
	 },
	 error: function(dataMat) {	                  
			 alert('ERROR: '+dataMat);
						 }
    });	  

}




function cargaAlumnosRep (contenedor, ciclo,carrera,genero){

	elsqlMa=elsql="select  ALUCTR AS MATRICULA, CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE, "+
	" ALUM_CARRERAREG, CARR_DESCRIP,  if (ALUM_SEXO=1,'H','M') AS SEXO , COUNT(*) AS REP"+
	" from dlista, falumnos b, cmaterias c, ccarreras d where ALUCTR=ALUM_MATRICULA  "+
	" AND ALUM_CARRERAREG='"+carrera+"' and MATCVE=MATE_CLAVE "+
	" and ALUM_CARRERAREG=CARR_CLAVE "+
	" and PDOCVE IN ('"+ciclo+"') AND IFNULL(MATE_TIPO,'0') NOT IN ('OC','T','RP','I','SS') "+
	" AND LISCAL<70 and ALUM_SEXO='"+genero+"'"+
	" GROUP BY ALUCTR,ALUM_CARRERAREG, CARR_DESCRIP, ALUM_SEXO ";

	parametros={sql:elsqlMa,dato:sessionStorage.co,bd:"Mysql"}

	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  						      			      
			cad="<ol>";
			jQuery.each(JSON.parse(data), function(clave, valor) {
				elcolor='danger';
				if (valor.LISCAL==1) {elcolor='warning';}
			   cad+="<li style=\"text-align:justify;\">"+valor.MATRICULA+" "+valor.NOMBRE+
			            "<span class=\"badge badge-"+elcolor+"\">"+valor.REP+"</span>"+					
			        "</li>"; 
			});	
			cad+="</ol>";
			
			mostrarIfo("infoMaterias",contenedor,"Alumnos con asignaturas reprobadas",cad,"modal-lg"); 
	 },
	 error: function(dataMat) {	                  
			 alert('ERROR: '+dataMat);
						 }
    });	  

}



function cargaAlumnosRepAs(contenedor, ciclo,carrera,genero){

	elsqlMa="select  ALUCTR AS MATRICULA, CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE, "+
	" ALUM_CARRERAREG, CARR_DESCRIP,  if (ALUM_SEXO=1,'H','M') AS SEXO , COUNT(*) AS REP,"+
	" (select count(*) from vasesorias where ASES_MATRICULA=ALUCTR AND ASES_CICLO='"+ciclo+"') as ASESORIAS "+
	" from dlista, falumnos b, cmaterias c, ccarreras d where ALUCTR=ALUM_MATRICULA  "+
	" AND ALUM_CARRERAREG='"+carrera+"' and MATCVE=MATE_CLAVE "+
	" and ALUM_CARRERAREG=CARR_CLAVE "+
	" and PDOCVE IN ('"+ciclo+"') AND IFNULL(MATE_TIPO,'0') NOT IN ('OC','T','RP','I','SS') "+
	" AND LISCAL<70 and ALUM_SEXO='"+genero+"'"+
	" and ALUCTR IN (select a.ASES_MATRICULA from vasesorias a where a.ASES_CICLO='"+ciclo+"')"+
	" GROUP BY ALUCTR,ALUM_CARRERAREG, CARR_DESCRIP, ALUM_SEXO ";



	parametros={sql:elsqlMa,dato:sessionStorage.co,bd:"Mysql"}

	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  						      			      
			cad="<ol>";
			jQuery.each(JSON.parse(data), function(clave, valor) {
				elcolor='success';
			   cad+="<li style=\"text-align:justify;\">"+valor.MATRICULA+" "+valor.NOMBRE+
			            "<span title=\"Asesorias que llevó\" class=\"badge badge-"+elcolor+"\">"+valor.ASESORIAS+"</span>"+					
			        "</li>"; 
			});	
			cad+="</ol>";
			
			mostrarIfo("infoMaterias",contenedor,"Alumnos con asignaturas reprobadas y Asesorías",cad,"modal-lg"); 
	 },
	 error: function(dataMat) {	                  
			 alert('ERROR: '+dataMat);
						 }
    });	  

}
