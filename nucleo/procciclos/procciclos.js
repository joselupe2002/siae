var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		cargarInformacion();
	});
	
	
		 
	function change_SELECT(elemento) {

		//if (elemento=='selAlumnos') {$("#informacion").empty(); cargarInformacion();}

		}  



    function cargarInformacion(){

		elsql="select * from ciclosesc order by CICL_CLAVE DESC"; // and CERRADO='S'
		
	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){ 		          	
		    generaTablaInformacion(JSON.parse(data));   
			ocultarEspera("esperaInf");     	     		   
				
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
				$('#dlgproceso').modal("hide");  
			}
		}); 	
			  		
}


function generaTablaInformacion(grid_data){
	c=0;

	script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"fontRoboto table table-condensed table-bordered table-hover fontRoboto\" "+
				">";
	$("#informacion").empty();
	$("#informacion").append(script);
				
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	$("#tabInformacion").append("<thead><tr id=\"headMaterias\">"+
	"<th style=\"text-align: center;\">No.</th>"+ 
	"<th style=\"text-align: center;\">CICLO</th>"+
	"<th style=\"text-align: center;\">DESCRIPCION</th>"+
	"<th style=\"text-align: center;\">INICIA</th>"+
	"<th style=\"text-align: center;\">TERMINA</th>"+
	"<th style=\"text-align: center;\">ADMISIÓN</th>"+	
	"<th style=\"text-align: center;\">EXAMEN</th>"+
	"<th style=\"text-align: center;\">RESULTADOS</th>"+
	"<th style=\"text-align: center;\">REINSCRIPCIÓN</th>"+
	"<th style=\"text-align: center;\">EGRESADOS</th>"+
	"<th style=\"text-align: center;\">BAJAS</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	 var c=1;
	 jQuery.each(grid_data, function(clave, valor) { 	
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+c+"\">");  
		 $("#row"+c).append("<td>"+(clave+1)+"</td>");     	
		 $("#row"+c).append("<td><span class=\"fontRobotoB  text-primary\">"+valor.CICL_CLAVE+"</span></td>");    
		 $("#row"+c).append("<td><span class=\"fontRobotoB  text-success\">"+valor.CICL_DESCRIP+"</span></td>");  
		 $("#row"+c).append("<td><span class=\"fontRobotoB label label-lg label-pink arrowed-right\">"+valor.CICL_INICIOR+"</span></td>"); 
		 $("#row"+c).append("<td><span class=\"fontRobotoB label label-lg label-purple arrowed\">"+valor.CICL_FINR+"</span></td>");     
		 


		 escheck=(valor.CICL_ADMISION=='S')?"checked":"";
		 chk=" <div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
			  "   	<label><input id=\""+valor.CICL_CLAVE+"_CICL_ADMISION\" type=\"checkbox\"  "+escheck+
			  "            onclick=\"setStatus('"+valor.CICL_CLAVE+"','CICL_ADMISION');\" class=\"ace ace-switch ace-switch-6\" />"+
			  " <span class=\"lbl\"></span></label> </div>";
		 $("#row"+c).append("<td>"+chk+"</td>");  
		 
		 escheck=(valor.CICL_ABIERTOEXA=='S')?"checked":"";
		 chk=" <div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
			  "   	<label><input id=\""+valor.CICL_CLAVE+"_CICL_ABIERTOEXA\" type=\"checkbox\"  "+escheck+
			  "            onclick=\"setStatus('"+valor.CICL_CLAVE+"','CICL_ABIERTOEXA');\" class=\"ace ace-switch ace-switch-6\" />"+
			  " <span class=\"lbl\"></span></label> </div>";
		 $("#row"+c).append("<td>"+chk+"</td>");  

		 escheck=(valor.CICL_ACIERTORES=='S')?"checked":"";
		 chk=" <div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
			  "   	<label><input id=\""+valor.CICL_CLAVE+"_CICL_ACIERTORES\" type=\"checkbox\"  "+escheck+
			  "            onclick=\"setStatus('"+valor.CICL_CLAVE+"','CICL_ACIERTORES');\" class=\"ace ace-switch ace-switch-6\" />"+
			  " <span class=\"lbl\"></span></label> </div>";
		 $("#row"+c).append("<td>"+chk+"</td>");  


		 escheck=(valor.CICL_ABIERTOREINS=='S')?"checked":"";
		 chk=" <div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
			  "   	<label><input id=\""+valor.CICL_CLAVE+"_CICL_ABIERTOREINS\" type=\"checkbox\"  "+escheck+
			  "            onclick=\"setStatus('"+valor.CICL_CLAVE+"','CICL_ABIERTOREINS');\" class=\"ace ace-switch ace-switch-6\" />"+
			  " <span class=\"lbl\"></span></label> </div>";
		 $("#row"+c).append("<td>"+chk+"</td>");  
		 
		 
		 $("#row"+c).append("<td>"+
							"<button title=\"Asignar rol de egresados a los de avance 100%\" onclick=\"asignarRol('"+valor.CICL_CLAVE+"');\" "+
							" class=\"btn btn-white btn-info btn-round\" >"+ 
							"<i class=\"ace-icon green blue glyphicon glyphicon-education bigger-140\"></i><span class=\"btn-small\"> "+
							" </span></button>"+
		 "</td>");  
		 $("#row"+c).append("<td>"+
							"<button title=\"Marcar como bajas definitivas alumnos por reglamento\" onclick=\"bajaDefinitiva('"+valor.CICL_CLAVE+"');\" "+
							" class=\"btn btn-white btn-info btn-round\" >"+ 
							"<i class=\"ace-icon red red fa fa-times-circle bigger-140\"></i><span class=\"btn-small\"> "+
							" </span></button>"+
					"</td>");  
		 
	


		$("#row"+c).append("</tr>");
		c++;
	 });
	$('#dlgproceso').modal("hide"); 
}	


function setStatus(ciclo,elcampo){

	cadVal=$("#"+ciclo+"_"+elcampo).prop("checked")?"S":"N";
	if (elcampo=='CICL_ADMISION') {parametros={tabla:"ciclosesc",bd:"Mysql",campollave:"CICL_CLAVE",valorllave:ciclo,CICL_ADMISION:cadVal};}
	if (elcampo=='CICL_ABIERTOEXA') {parametros={tabla:"ciclosesc",bd:"Mysql",campollave:"CICL_CLAVE",valorllave:ciclo,CICL_ABIERTOEXA:cadVal};}
	if (elcampo=='CICL_ACIERTORES') {parametros={tabla:"ciclosesc",bd:"Mysql",campollave:"CICL_CLAVE",valorllave:ciclo,CICL_ACIERTORES:cadVal};}
	if (elcampo=='CICL_ABIERTOREINS') {parametros={tabla:"ciclosesc",bd:"Mysql",campollave:"CICL_CLAVE",valorllave:ciclo,CICL_ABIERTOREINS:cadVal};}

	$.ajax({
		type: "POST",
		url:"../base/actualiza.php",
		data: parametros,
		success: function(data){        			        	
										 
		}					     
	}); 
	

}

function bajaDefinitiva(ciclo){
	
    if (confirm("Le recordamos que primero se debe correr el botón Egresados. ¿Seguro desea aplicar las bajas definitivas para el ciclo "+ciclo+" ? ")) {
		mostrarIfo("infoEval","grid_procciclos","Alumnos que aplicaron Baja Definitiva",
		"<div style=\"text-align:justify; height:200px; overflow-y: auto;\" id=\"lisegre\"></div>","modal-lg");
		mostrarEspera("esperahor","grid_procciclos","Procesando..");
		lafecha=dameFecha("FECHAHORA");
	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",ciclo:ciclo}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "getBajasDef.php",
		success: function(data){ 
            ocultarEspera("esperahor");  
			elsql="select ALUM_MATRICULA, ALUM_NOMBRE, ALUM_APEPAT, ALUM_APEMAT, ALUM_CARRERAREG FROM falumnos a, inscritos c where  "+
			"a.ALUM_MATRICULA=c.MATRICULA and  c.BAJA='S' AND ALUM_ACTIVO<>4";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}     	
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){ 
      
					jQuery.each(JSON.parse(data), function(clave, valor) { 
						 //actualizamos tabla de alumnos
						 parametros={
							tabla:"falumnos",
							bd:"Mysql",
							campollave:"ALUM_MATRICULA",
							valorllave:valor.ALUM_MATRICULA,
							ALUM_ACTIVO: '4'						
							};
							$.ajax({
								type: "POST",
								url:"../base/actualiza.php",
								data: parametros,
								success: function(data){        			        	
																			 
							},
							error: function(data) {	                  
									alert('ERROR: '+data);
								}					     
							}); 

							 //INSERTAMOS AL ALUMNOS EN CAJA DEFINITIVA
							 parametros={tabla:"ebajas",
							 bd:"Mysql",
							 _INSTITUCION:"ITSM",
							 _CAMPUS:"0",
							 MATRICULA:valor.ALUM_MATRICULA,
							 CICLO:ciclo,
							 MOTIVO:5,							
							 TIPOBAJA: 4,
							 FECHABAJA:lafecha,
							 OBS: "BAJA DADA POR SIGEA",
							 FECHAUS:lafecha,
							 USUARIOS:usuario
							 };     
						 $.ajax({
								 type: "POST",
								 url:"../base/inserta.php",
								 data: parametros,
								 success: function(data){ 
												
								 }
							 });

						$("#lisegre").append("<i class=\"fa fa-times-circle red bigger-160\" /> <span class=\"badge badge-success\">"+valor.ALUM_MATRICULA+"</span>"+
											 "<span class=\"text text-danger\">"+valor.ALUM_NOMBRE+" "+valor.ALUM_APEPAT+" "+valor.ALUM_APEMAT+"</span><br/>");
						
					});	          	
				
					ocultarEspera("esperahor");     	     		   				
				},
				error: function(data) {	                  
						alert('ERROR: '+data);
						$('#dlgproceso').modal("hide");  
					}
				}); 		     		   				
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
				$('#dlgproceso').modal("hide");  
			}
		}); 	
			  		

	}

}


function asignarRol(ciclo){
	
    if (confirm("¿Seguro desea asignar rol y status a los egresados?")) {
		mostrarIfo("infoEval","grid_procciclos","Alumnos Egresados",
		"<div style=\"text-align:justify;  height:300px; overflow-y: scroll; \" id=\"lisegre\"></div>","modal-lg");
		mostrarEspera("esperahor","grid_procciclos","Procesando..");
	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",ciclo:ciclo}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "getEgresados.php",
		success: function(data){ 	
			ocultarEspera("esperahor");  
			elsql="select ALUM_MATRICULA, ALUM_NOMBRE, ALUM_APEPAT, ALUM_APEMAT, ALUM_CARRERAREG FROM falumnos a, inscritos c where  "+
			"a.ALUM_MATRICULA=c.MATRICULA and  c.EGRESADO='S' AND ALUM_ACTIVO<>5";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}     	
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){ 

					jQuery.each(JSON.parse(data), function(clave, valor) { 
						 //actualizamos tabla de alumnos
						 parametros={
							tabla:"falumnos",
							bd:"Mysql",
							campollave:"ALUM_MATRICULA",
							valorllave:valor.ALUM_MATRICULA,
							ALUM_ACTIVO: '5', 
							ALUM_CICLOTER: ciclo						
							};
							$.ajax({
								type: "POST",
								url:"../base/actualiza.php",
								data: parametros,
								success: function(data){        			        	
																			 
							},
							error: function(data) {	                  
									alert('ERROR: '+data);
								}					     
							}); 

							 //actualizamos tabla de usuarios
							 parametros={
								tabla:"cusuarios",
								bd:"SQLite",
								campollave:"usua_usuario",
								valorllave:valor.ALUM_MATRICULA,
								usua_usuader: 'EGRESADOS'					
								};
								$.ajax({
									type: "POST",
									url:"../base/actualiza.php",
									data: parametros,
									success: function(data){        			        	
																				 
								},
								error: function(data) {	                  
										alert('ERROR: '+data);
									}					     
								}); 
						$("#lisegre").append("<i class=\"fa fa-check green bigger-160\"> <span class=\"badge badge-success\">"+valor.ALUM_MATRICULA+"</span>"+
											 "<span class=\"text text-success\">"+valor.ALUM_NOMBRE+" "+valor.ALUM_APEPAT+" "+valor.ALUM_APEMAT+"</span><br/>");
						
					});	          	
				
					ocultarEspera("esperahor");     	     		   				
				},
				error: function(data) {	                  
						alert('ERROR: '+data);
						$('#dlgproceso').modal("hide");  
					}
				}); 		     		   				
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
				$('#dlgproceso').modal("hide");  
			}
		}); 	
			  		

	}

}
