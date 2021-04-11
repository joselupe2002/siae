var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var elalumno="";
var miciclo="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 


		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");


		$("#losarticulos").append("<span class=\"label label-danger\">Conceptos de Pago</span>");
		addSELECT("selArticulo","losarticulos","PROPIO", "SELECT CLAVE, DESCRIPCION, MONTO FROM finarticulos order by DESCRIPCION", "","");  	
		

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
	}  



    function cargarInformacion(){
		$("#informacion").empty();
		mostrarEspera("esperaInf","grid_finpagos","Cargando Datos...");
		elsql="SELECT  * from finlincap h where MATRICULA='"+usuario+"' ORDER BY ID DESC";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){      
			  	if (JSON.parse(data).length>0) {			
					generaTablaInformacion(JSON.parse(data));   
					ocultarEspera("esperaInf");     
				  }
				else {ocultarEspera("esperaInf");  }	     		   
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
				$('#dlgproceso').modal("hide");  
			}
		}); 					  		
}


function generaTablaInformacion(grid_data){
	c=0;

	script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \" fontRoboto table table-condensed table-bordered table-hover\" "+
				">";
	$("#informacion").empty();
	$("#informacion").append(script);
				
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	$("#tabInformacion").append("<thead><tr id=\"headMaterias\">"+
	"<th style=\"text-align: center;\">Id</th>"+ 
	"<th style=\"text-align: center;\">Descripción</th>"+ 
	"<th style=\"text-align: center;\">Monto</th>"+
	"<th style=\"text-align: center;\">Fecha Sol.</th>"+
	"<th style=\"text-align: center;\">Vencimiento</th>"+
	"<th style=\"text-align: center;\">STATUS</th>"+
	"<th style=\"text-align: center;\">Linea</th>"+
	"<th style=\"text-align: center;\">Folio</th>"
	
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 jQuery.each(grid_data, function(clave, valor) { 			
		cadFile="";	

		
		
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ID+"\">");   
		 
		 $("#row"+valor.ID).append("<td>"+valor.ID+"</td>");   	
		 $("#row"+valor.ID).append("<td>"+valor.DESCRIPCION+"</td>");    
		 $("#row"+valor.ID).append("<td>"+valor.IMPORTE+"</td>");         	    
		 $("#row"+valor.ID).append("<td>"+valor.FECHAUS+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.FECHAVENCE+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.STATUS+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.LINEA+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.FOLIOESTADO+"</td>");
		 
		$("#row"+valor.ID).append("</tr>");

		

	 });
	$('#dlgproceso').modal("hide"); 
}	















function creaLinea(){

	
    if ($("#selArticulo").val()>0) {
			mostrarEspera("esperaRep","grid_finpagos","Procesando Petición...");
			elarticulo=$("#selArticulo").val();
			elarticulod=$("#selArticulo option:selected").text();

			elsql="SELECT ALUM_NOMBRE, ALUM_APEPAT, ALUM_APEMAT, CARR_DESCRIP, ALUM_CARRERAREG,"+
			"getciclo() AS CICLO FROM falumnos n, ccarreras o where ALUM_MATRICULA='"+usuario+"' and ALUM_CARRERAREG=CARR_CLAVE";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){   
					alumno=JSON.parse(data);			
					var hoy=new Date();		
					
					fechaexp=pad(hoy.getDate(),2,'0')+"-"+pad(hoy.getMonth()+1,2,'0')+"-"+hoy.getFullYear();
					elfolio=usuario.concat(hoy.getDate()).concat((hoy.getMonth()+1)).concat(hoy.getFullYear()).concat(hoy.getHours()).concat(hoy.getMinutes()).concat(hoy.getSeconds());
					

					var parametrosF = {
						idTramite:elarticulo,
						nombre:alumno[0]["ALUM_NOMBRE"],
						apaterno:alumno[0]["ALUM_APEPAT"],
						amaterno:alumno[0]["ALUM_APEMAT"],
						curp:alumno[0]["ALUM_CURP"],
						folioSeguimiento:elfolio
						};
										
					$.ajax({
								data:  parametrosF,
								url:   'genera.php',
								type:  'POST',                          
								success:  function (response) {							
									respuesta=response.split("*");
									if (respuesta[0]=="ERROR") {
										alert ("OCURRIO EL SIGUIENTE ERROR: "+respuesta[1]+ " INTENTELO NUEVAMENTE");							
									}
									else {
										fechaus=dameFecha("FECHAHORA");
										parametros={tabla:"finlincap",
										bd:"Mysql",
										_INSTITUCION:"ITSM",
										_CAMPUS:"0",
										MATRICULA:usuario,
										NOMBRE:alumno[0]["ALUM_NOMBRE"]+" "+alumno[0]["ALUM_APEPAT"]+" "+alumno[0]["ALUM_APEMAT"],
										FOLIOSEG:elfolio,
										FOLIOESTADO:respuesta[3],
										LINEA:respuesta[2],
										FECHAVENCE:respuesta[1],
										IMPORTE:respuesta[4],
										CARRERA:alumno[0]["ALUM_CARRERAREG"],
										CARRERAD:alumno[0]["CARR_DESCRIP"],
										IDARTICULO:elarticulo,
										DESCRIPCION:elarticulod,
										CICLO:alumno[0]["CICLO"],
										USUARIO:usuario,
										FECHAUS:fechaus
									};
										$.ajax({
											type: "POST",
											url:"../base/inserta.php",
											data: parametros,
											success: function(data){ 
												if (data.substring(0,2)=='0:') { 
													alert ("Ocurrio un error: "+data); console.log(data);
													ocultarEspera("esperaRep");
													}
											
												}
											});

										//Se imprime el reporte de linea de captura
										enlace="nucleo/finpagos/reporte.php?linea="+respuesta[2]+"&fechavence="+respuesta[1]+
										"&usuario="+usuario+"&nombre="+alumno[0]["ALUM_NOMBRE"]+" "+alumno[0]["ALUM_APEPAT"]+" "+alumno[0]["ALUM_APEMAT"]+
										"&carrera="+alumno[0]["CARR_DESCRIP"]+"idarticulo="+elarticulo+"&descripcion="+elarticulod+
										"&folioestado="+respuesta[3]+"&fechaexp="+fechaexp+"&importe="+respuesta[4];								
										
										abrirPesta(enlace,"Línea");

										/*
										var parametrosF = {FOLIOESTADO:respuesta[3]};																					
										//Borramos los codigo de barras Generados 
										$.ajax({
											type: "POST",
											url:"borraCod.php",
											data: parametrosF,
											success: function(data){ 
												
												}
											});

											*/

										ocultarEspera("esperaRep");  
									}												
								},
								async: false, 
								cache: false 
					}); 

				}
			}); 	
	}
	else { alert ("Debe elegir primero el concepto a Pagar")}			
	
}