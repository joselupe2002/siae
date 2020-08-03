var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;
var elexamen=0;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#losexamenes").append("<span class=\"label label-warning\">Exámenes</span>");
		$("#losalumnos").append("<span class=\"label label-warning\">Aspirante/Alumno</span>");
		 
		elsql="SELECT IDAP, CONCAT(IDAP,'|',IDEXAMEN,'|',EXAMEND,'|',CICLO) from vlinaplex ORDER BY IDAP DESC";
		if (essup!='S') { elsql="SELECT IDAP, CONCAT(IDAP,'|',IDEXAMEN,'|',EXAMEND,'|',CICLO) from vlinaplex  ORDER BY IDAP DESC"; }
		addSELECT("selExamenes","losexamenes","PROPIO",elsql, "","BUSQUEDA"); 

		
		$("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		 
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+") union select '%', 'TODOS' from dual", "",""); 			
				}
		   });

		   elsql="SELECT CICL_CLAVE FROM ciclosesc WHERE CICL_ADMISION='S' ORDER BY CICL_CLAVE DESC";
		   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		   $.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  		
			     $("#miciclo").html(JSON.parse(data)[0][0]);
				}
		   });

		   
		$("#losciclos").append("<br/><span title=\"Total de puntos en el examen\" class=\"badge badge-warning\" id=\"totalp\"></span><br/>"+
							   "<span title=\"Total de preguntas en el examen\" class=\"badge badge-success\" id=\"totalpr\"></span>");

		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selExamenes') {
			elexamen=$("#selExamenes option:selected").text().split('|')[1];
			elsql="select SUM(PUNTAJE), COUNT(*) AS N from linpreguntas a where a.IDEXAMEN="+elexamen;
		    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){  
			
						$("#totalp").html(JSON.parse(data)[0][0]);	
						$("#totalpr").html(JSON.parse(data)[0][1]);	
					},
				error: function(data) {	                  
						   alert('ERROR: '+data);
						   $('#dlgproceso').modal("hide");  
					   }
			   });
		}  
    }

/*=================================================RESULTADOS GENERALES POR SECCIÓN ==============================================*/
    function cargarInformacion(){
		campos=[];
		cadSeccion="";
		cadSecSql="";
		elsql="select IDSECC, REPLACE(DESCRIP,' ','') as DESCRIP  from linsecciones a where a.IDEXA="+elexamen+" ORDER BY IDSECC";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  			      			      
				j=0;
				jQuery.each(JSON.parse(data), function(clave, valor) {  
					cadSeccion+="<th>"+valor.DESCRIP+"</th>";
					cadSecSql+="(SELECT ifnull(SUM(if (z.RESPUESTA=y.CORRECTA,y.PUNTAJE*1,y.PUNTAJE*0)),0) from linrespuestas z, "+
							   " linpreguntas y where z.IDPREGUNTA=y.IDPREG AND z.IDPRESENTA=x.MATRICULA "+
							   " and z.IDEXAMEN=x.IDEXAMEN AND y.IDSECCION="+valor.IDSECC+") AS "+valor.DESCRIP+",";
								
					campos[j]=valor.DESCRIP;
					j++;
				});  
			
				script="<table id=\"tabMaterias\" name=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
								">"+
						"        <thead >  "+
						"             <tr id=\"headMaterias\">"+
						"                <th>No.</th> "+
						"                <th>Control</th> "+
						"                <th>Nombre</th> "+	
						cadSeccion+
						"                <th>Total</th> "+	
						"                <th>CVE</th> "+	
						"                <th>CARRERA</th> "+	
						"             </tr> "+
						"            </thead>" +
						"         </table>";
						$("#informacion").empty();
						$("#informacion").append(script);
								
						elsql="select MATRICULA,IDEXAMEN,MATRICULAD,CARRERA, CARRERAD,"+cadSecSql+" ifnull(SUM(PUNTOS),0) as TOTAL from vlinrespuestas x where "+
						"IDAPLICA="+$("#selExamenes").val()+" AND CARRERA LIKE '"+$("#selCarreras").val()+"' GROUP BY MATRICULA,IDEXAMEN ORDER BY MATRICULA, MATRICULAD,CARRERA,CARRERAD";
	
			
						mostrarEspera("esperahor","grid_linresexa","Cargando Datos...");
						parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){  				      			      
									generaTablaMaterias(JSON.parse(data),campos);   													
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

function generaTablaMaterias(grid_data,campos){	
	contAlum=1;
	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   			
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td id=\"IDDETALLE_"+contAlum+"\" style=\"font-size:10px;\">"+valor.MATRICULA+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:10px;\">"+valor.MATRICULAD+"</td>");
	
		campos.forEach(element => {
			$("#rowM"+contAlum).append("<td style=\"text-align:center\"><span class=\"badge badge-warning\">"+grid_data[clave][element]+"</span></td>"); 
		});

		evento="onclick=\"showResultExamen('"+valor.IDEXAMEN+"','"+valor.MATRICULA+"','grid_linresexa','"+valor.MATRICULAD+"');\"";
		$("#rowM"+contAlum).append("<td><span "+evento+" class=\"badge badge-info\" style=\"cursor:pointer;\">"+valor.TOTAL+"</span></td>");
		$("#rowM"+contAlum).append("<td>"+valor.CARRERA+"</td>");
		$("#rowM"+contAlum).append("<td>"+valor.CARRERAD+"</td>");
		
	
	    contAlum++;      			
	});	
} 

/*=================================================ALUMNOS QUE NO PRESENTARON ==============================================*/

function cargarNoPresentaron() {
	campos=[];
	cadSeccion="";
	cadSecSql="";
	elsql="select * FROM vaspirantes  where CICLO='"+$("#miciclo").html()+"' and CARRERA LIKE '"+$("#selCarreras").val()+"'"+
	" and CURP NOT IN (select IDPRESENTA from linrespuestas where IDAPLICA='"+$("#selExamenes").val()+"') and FINALIZADO='S'";

	
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
	
			grid_data=JSON.parse(data);	      			      
			script="<table id=\"tabMaterias\" name=\"tabMaterias\"  class= \"fontRoboto table table-condensed table-bordered table-hover\" "+
							">"+
					"        <thead >  "+
					"             <tr id=\"headMaterias\">"+
					"                <th>No.</th> "+
					"                <th>Control</th> "+
					"                <th>Nombre</th> "+	
					"                <th>CARRERA</th> "+	
					"                <th>CORREO</th> "+	
					"                <th>CELULAR</th> "+	
					"                <th>TEL. CASA</th> "+	
					"                <th>CLAVE</th> "+	
					"             </tr> "+
					"            </thead>" +
					"         </table>";
			$("#informacion").empty();
			$("#informacion").append(script);

			$("#cuerpoMaterias").empty();
			$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
			contAlum=1;
			jQuery.each(grid_data, function(clave, valor) { 	
				$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
				$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
				$("#rowM"+contAlum).append("<td>"+valor.CURP+"</td>");
				$("#rowM"+contAlum).append("<td>"+valor.NOMBRE+" "+valor.APEPAT+" "+valor.APEMAT+"</td>");									
				$("#rowM"+contAlum).append("<td>"+valor.CARRERAD+"</td>");
				$("#rowM"+contAlum).append("<td>"+valor.CORREO+"</td>");
				$("#rowM"+contAlum).append("<td>"+valor.TELCEL+"</td>");
				$("#rowM"+contAlum).append("<td>"+valor.TELCASA+"</td>");
				$("#rowM"+contAlum).append("<td>"+valor.CLAVE+"</td>");
				contAlum++;      			
			});	
		}																																										
	 });     	    
}

/*=================================================ESTADÍSTICAS DE PRESENTACIÓN==============================================*/

function cargarEstadisticas() {

	elsql="select a.*, (select count(*) from linrespuestas b where b.IDAPLICA='"+$("#selExamenes").val()+"' and IDPRESENTA=a.CURP) as LLEVA"+
	" FROM vaspirantes a where CICLO='"+$("#miciclo").html()+"' and CARRERA LIKE '"+$("#selCarreras").val()+"'"+
	" and CURP IN (select IDPRESENTA from linrespuestas where IDAPLICA='"+$("#selExamenes").val()+"')";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
	
			grid_data=JSON.parse(data);	      			      
			script="<table id=\"tabMaterias\" name=\"tabMaterias\"  class= \"fontRoboto table table-condensed table-bordered table-hover\" "+
							">"+
					"        <thead >  "+
					"             <tr id=\"headMaterias\">"+
					"                <th>No.</th> "+
					"                <th>Control</th> "+
					"                <th>NOMBRE</th> "+	
					"                <th>CARRERA</th> "+	
					"                <th>LLEVA</th> "+	
					"                <th>AVANCE</th> "+	
					"                <th>AVANCE</th> "+	
					"             </tr> "+
					"            </thead>" +
					"         </table>";
			$("#informacion").empty();
			$("#informacion").append(script);

			$("#cuerpoMaterias").empty();
			$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
			contAlum=1;
			jQuery.each(grid_data, function(clave, valor) { 	
				$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
				$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
				$("#rowM"+contAlum).append("<td>"+valor.CURP+"</td>");
				$("#rowM"+contAlum).append("<td>"+valor.NOMBRE+" "+valor.APEPAT+" "+valor.APEMAT+"</td>");									
				$("#rowM"+contAlum).append("<td>"+valor.CARRERAD+"</td>");
				$("#rowM"+contAlum).append("<td>"+valor.LLEVA+"</td>");
				elavance=(valor.LLEVA/parseInt($("#totalpr").html())*100).toFixed(0);
				$("#rowM"+contAlum).append("<td>"+elavance+"% </td>");
				if ((elavance>=0) && (elavance<=30)) {elcolor="red";}
				if ((elavance>30) && (elavance<=60)) {elcolor="#C27B27"};
				if ((elavance>60) && (elavance<=80)) {elcolor="blue"};
				if ((elavance>80) && (elavance<=100)) {elcolor="#6CB612"};
				
				$("#rowM"+contAlum).append("<td><div  class=\"easy-pie-chart percentage\" data-color=\""+elcolor+"\" data-percent=\""+elavance+"\" data-size=\"50\">"+
				                           "     <span id=\"etelavance\" class=\"percent bigger-60\">"+elavance+"</span>%"+
										   "</div></td>");

				contAlum++;      			
			});	

			$('.easy-pie-chart.percentage').each(function(){
				var barColor = $(this).data('color') || '#2979FF';
				var trackColor = '#E2E2E2';
				var size = parseInt($(this).data('size')) || 72;
				$(this).easyPieChart({
					barColor: barColor,
					trackColor: trackColor,
					scaleColor: false,
					lineCap: 'butt',
					lineWidth: parseInt(size/5),
					animate:false,
					size: size
				}).css('color', barColor);
				});
		}																																										
	 }); 
	 
	 
}
