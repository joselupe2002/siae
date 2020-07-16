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

		$("#losexamenes").append("<span class=\"label label-warning\">Exámenes</span>");
		$("#losalumnos").append("<span class=\"label label-warning\">Aspirante/Alumno</span>");
		 
		elsql="SELECT IDEXA, DESCRIP from linexamenes";
		if (essup!='S') { elsql="SELECT IDEXA, DESCRIP from linexamenes WHERE USUARIO='"+usuario+"'"; }
		addSELECT("selExamenes","losexamenes","PROPIO",elsql, "",""); 

		

		$("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		 
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+") union select '%', 'TODOS' from dual", "",""); 			
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });
		   
		
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong><br/>"+
		                       "<span title=\"Total de puntos en el examen\" class=\"badge badge-warning\" id=\"totalp\"></span>");
		colocarCiclo("elciclo","CLAVE");

		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selExamenes') {
			elsql="select SUM(PUNTAJE) from linpreguntas a where a.IDEXAMEN="+$("#selExamenes").val();
		    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){  
						$("#totalp").html(JSON.parse(data)[0][0]);	
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
		elsql="select IDSECC, REPLACE(DESCRIP,' ','') as DESCRIP  from linsecciones a where a.IDEXA="+$("#selExamenes").val()+" ORDER BY IDSECC";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  			      			      
				j=0;
				jQuery.each(JSON.parse(data), function(clave, valor) {  
					cadSeccion+="<th>"+valor.DESCRIP+"</th>";
					cadSecSql+="(SELECT SUM(if (z.RESPUESTA=y.CORRECTA,y.PUNTAJE*1,y.PUNTAJE*0)) from linrespuestas z, "+
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
								
						elsql="select MATRICULA,IDEXAMEN,MATRICULAD,CARRERA, CARRERAD,"+cadSecSql+" SUM(PUNTOS) as TOTAL from vlinrespuestas x where "+
						"IDEXAMEN="+$("#selExamenes").val()+" AND CARRERA LIKE '"+$("#selCarreras").val()+"' GROUP BY MATRICULA,IDEXAMEN, MATRICULAD ORDER BY MATRICULA, MATRICULAD,CARRERA,CARRERAD";
	
						
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

/*===============================================CARGANDO DATOS GENERALES =================================*/
var graficaMateria;
   var graficaCarrera;
   var graficaSemestre;
   var graficaProfesor;
   var cadCarrera;  
   var elciclo;
   var elcorte;
   var colores=["4,53,252","238,18,8","238,210,7","5,223,5","7,240,191","240,7,223","240,7,7","240,7,12"];
   var ladefault="<img src=\"../../imagenes/menu/esperar.gif\"> </img>";
   colorbtn=["btn-yellow","btn-light","btn-pink","btn-grey","btn-success","btn-info","btn-warning","btn-danger","btn-primary"];                            

   function CargaGenerales(){ 
       var Body = $('body'); 
       Body.addClass('preloader-site');
	   elsql="select count(*) from vlincontestar a  where a.IDEXAMEN='"+$("#selExamenes").val()+"'";


       parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
            type: "POST",
            data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){	
	
		          $("#presentando").html(JSON.parse(data)[0][0]);
			}
		});
          //Cargamos datos de las carreras aspirantes 
                         
	   elsqlSolCar="select b.CARRERA,c.CARR_DESCORTA as CARRERACOR, count(*) as NUM from vlincontestar a, vaspalumnos b, ccarreras c   "+
	               "   where a.IDEXAMEN='"+$("#selExamenes").val()+"'"+
	               " and a.IDPRESENTA=b.ID and b.CARRERA=c.CARR_CLAVE "+
	               " GROUP BY b.CARRERA,c.CARR_DESCRIP";                                                       
        c=0;
        parametros={sql:elsqlSolCar,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(dataCar){   
				jQuery.each(JSON.parse(dataCar), function(clave, valor) {
						$("#lascarrerasDiv").append("<span title=\""+valor.CARRERA+"\" class=\"btn btn-app btn-sm "+colorbtn[c]+" no-hover\">"+
												"   <span class=\"line-height-1 bigger-170\">"+valor.NUM+"</span>"+
												"   <br /> "+
												"   <span class=\"line-height-1 smaller-60\"> "+valor.CARRERACOR+" </span>"+
												"</span>");
												c++;
					});
				
			}
		});                  
        
	}
