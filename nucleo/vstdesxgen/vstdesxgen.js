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
		
		$("#losciclossel").append("<span class=\"label label-danger\">A partir del Ciclo de Ingreso</span>");
		addSELECT("selCiclosAnt","losciclossel","PROPIO", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by cicl_clave desc", "","");  			      
		
		ayuda="Deserción por cohorte generacional, alumnos que no se fueron inscribiendo a los ciclos siguientes.";
		$("#losciclos").append("<i class=\" fa yellow fa-info bigger-180\" title=\""+ayuda+"\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selCarreras') {	
			$("#tabInformacion").empty();	
		}  
    }


    function cargarInformacion(){
	
		script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headMaterias\">"+
		   "                <th>No.</th> "+
		   "                <th>Ciclo Ing.</th> "+
		   "                <th>Total</th> "+	
		   "              </tr>"+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);

				
		elsql="select ALUM_CICLOINS AS CICLO, COUNT(*)  as TOTAL from falumnos where ALUM_CICLOINS>='"+$("#selCiclosAnt").val()+"'"+
		" AND ALUM_CARRERAREG='"+$("#selCarreras").val()+"'"+
		" GROUP BY ALUM_CICLOINS ORDER by ALUM_CICLOINS ASC ";
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
	

	cicant=$("#selCiclosAnt").val();
		
		
		elsqlAv="select CICL_CLAVE AS CICLO, CICL_DESCRIP  AS CICLOD from ciclosesc where CICL_CLAVE>'"+$("#selCiclosAnt").val()+"' and RIGHT(CICL_CLAVE,1) IN (1,3)";      					  
		parametros={sql:elsqlAv,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(dataAv){ 				   
				    jQuery.each(JSON.parse(dataAv), function(claveAv, valorAv) {
						 $("#headMaterias").append("<th class=\"ciclosid\">"+valorAv.CICLO+"</th>");						
					   });
					
					   jQuery.each(grid_data, function(clave, valor) { 
							//alert ($("#rowM"+contR).html()+" "+valor.PROFESOR);   	
							$("#cuerpoInformacion").append("<tr id=\"rowM"+valor.CICLO+"\">");
							$("#rowM"+valor.CICLO).append("<td>"+contR+"</td>");
							$("#rowM"+valor.CICLO).append("<td>"+valor.CICLO+"</td>");
							$("#rowM"+valor.CICLO).append("<td><span class=\"badge badge-primary\">"+valor.TOTAL+"</span></td>");		

							cicloant=$("#selCiclosAnt").val();  
							$(".ciclosid").each(function(){
								cicloNuevo=$(this).html();
								if (cicloNuevo>valor.CICLO) {
										elsqlDes="SELECT COUNT(MATRICULA) AS MATRICULA, IFNULL(SUM(IF (ESTABAINS='S',1,0)),0) AS ESTABAN FROM ("+
										" SELECT DISTINCT(a.ALUCTR) AS MATRICULA, "+
										" IF ((select count(*) from dlista h where h.PDOCVE="+cicloant+" and "+
										"      h.ALUCTR=a.ALUCTR)>0,'S','N') AS ESTABAINS "+
										" FROM dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA "+
										" and b.ALUM_CICLOINS='"+valor.CICLO+"' and b.ALUM_CARRERAREG=5"+
										" and ALUCTR NOT IN ("+
										" SELECT DISTINCT(l.ALUCTR) FROM dlista l where l.PDOCVE="+cicloNuevo+" and l.ALUCTR=a.ALUCTR "+
										")) j";	
										//mostrarEspera("esperaInf","grid_vstdesxgen","Cargando Datos...Puede tardar");	
										parametros={sql:elsqlDes,dato:sessionStorage.co,bd:"Mysql"}
										$.ajax({
												type: "POST",
												data:parametros,
												url:  "../base/getdatossqlSeg.php",
												success: function(dataDes){ 	
													ayuda1="Alumnos de la generación "+valor.CICLO+" que no se inscribieron al ciclo ";
													ayuda2="Alumnos de la generación "+valor.CICLO+" que no se inscribieron al ciclo y estaban inscritos en el ciclo anterior: ";
																										
													$("#rowM"+valor.CICLO).append("<td><span title=\""+ayuda1+"\" class=\"badge badge-danger\">"+JSON.parse(dataDes)[0]["MATRICULA"]+"</span> "+
													                                  "<span title=\""+ayuda2+"\" class=\"badge badge-warning\">"+JSON.parse(dataDes)[0]["ESTABAN"]+"</span>"+
																				  "</td>");		
													 //ocultarEspera("esperaInf");  	   																																																																			
												}												
										});
										
								}
								else {  $("#rowM"+valor.CICLO).append("<td>NA</td>"); 
								        ocultarEspera("esperaInf"); 							
							        }
								cicloant=$(this).html();
							}); 
							contR++;   
						});
					}
			});	
	
} 


