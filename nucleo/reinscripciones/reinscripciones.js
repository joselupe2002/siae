var id_unico="";
var estaseriando=false;
var matser="";
var contFila=1;
var residencias=[];
var matsineval=0;
var cadmatsineval="";
var miciclo="";
var micicloant="";
var mensajeAlumno="";
var eltipomat="";
var credMax=0;
var credMin=0;
var cred1R=0;
var credM1=0;

    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		setSesion("elusuario","usuario");
		$("#info").css("display","none");
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","AMBOS");

	
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
		
		$("#losalumnos").append("<span class=\"label label-danger\">Alumno</span>");

			
		addSELECT("selCiclos","losciclos","PROPIO", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,'|',CICL_DESCRIP) FROM ciclosesc where CICL_ABIERTOREINS='S' ORDER BY CICL_CLAVE DESC", "","BUSQUEDA");  			      

		addSELECT("selAlumnos","losalumnos","PROPIO", "SELECT ALUM_MATRICULA,CONCAT(ALUM_APEPAT,' ',ALUM_APEMAT,' ',ALUM_NOMBRE) FROM falumnos where ALUM_MATRICULA='0'", "","BUSQUEDA");  			      

		addSELECT_ST("aulas","grid_reinscripciones","PROPIO", "select AULA_CLAVE, AULA_DESCRIP from eaula where "+
		                                           "AULA_ACTIVO='S' order by AULA_DESCRIP", "","","visibility:hidden;");  			      
		
		addSELECT_ST("losprofes","grid_reinscripciones","PROPIO","SELECT EMPL_NUMERO, CONCAT(IFNULL(EMPL_APEPAT,''),' ',"+
													  "IFNULL(EMPL_APEMAT,''),' ',IFNULL(EMPL_NOMBRE,''),' ',EMPL_NUMERO)"+
													  " AS NOMBRE FROM pempleados ORDER BY 2", "","","visibility:hidden;");  			      

	$(document).on( 'change', '.edit', function(){		
		lin=$(this).attr("id").split("_")[1];
		$("#guardar_"+lin).removeClass("btn-success");
		$("#guardar_"+lin).addClass("btn-warning");
		$(this).css("border-color",""); 
	 });

	//cargamos listas de residencias 
	elsql3="select MATE_CLAVE from cmaterias  where MATE_TIPO  IN ('RP')";
	parametros3={sql:elsql3,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros3,
		url:  "../base/getdatossqlSeg.php",
		success: function(data3){ 	
			jQuery.each(JSON.parse(data3), function(clave, valor) { 
				residencias[clave]=valor.MATE_CLAVE;
			});																										
		}
	});

	 
	});
	
	
		 
	function change_SELECT(elemento) {
        if (elemento=='selCarreras') {
			if (($("#selCarreras").val()=='10') || ($("#selCarreras").val()=='12')) { //Lengua ext.
			      actualizaSelect("selAlumnos","SELECT ALUM_MATRICULA,CONCAT(ALUM_MATRICULA,' ',ALUM_APEPAT,' ',ALUM_APEMAT,' ',ALUM_NOMBRE) "+
							" from falumnos where ALUM_ACTIVO IN (1,2) order by ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE","BUSQUEDA");}
			else 
			{
				actualizaSelect("selAlumnos","SELECT ALUM_MATRICULA,CONCAT(ALUM_MATRICULA,' ',ALUM_APEPAT,' ',ALUM_APEMAT,' ',ALUM_NOMBRE) "+
						  " from falumnos where ALUM_ACTIVO IN (1,2) and ALUM_CARRERAREG='"+$("#selCarreras").val()+"' order by ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE","BUSQUEDA");}
			}
		if (elemento=='selCarreras') {	
			eltipomat='N';
			if ($("#selCarreras").val()=='10') {eltipomat='I'};
			if ($("#selCarreras").val()=='12') {eltipomat='OC'};
			$("#selAlumnos").empty();
			$("#tabHorariosReins").empty();
		}

		if (elemento=='selCiclos') {
			$("#elciclo").html($("#selCiclos option:selected").text());


		}
        
	}
	


    function cargarDatosAlumno(){

		//Verificamos si su pago ya fue cotejado 
		elsql="SELECT RUTA,COTEJADO,count(*) AS N FROM eadjreins where AUX='"+
		$("#selAlumnos").val()+"_"+$("#elciclo").html().split("|")[0]+"_"+eltipomat+"'";	
		
		parametros2={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros2,
			url:  "../base/getdatossqlSeg.php",
			success: function(data2){  
				
				laruta='';
				laclase="badge-success";
				secotejo='S';
				msjDoc="El pago ya fue cotejado por el área de Contabilidad";

				if (JSON.parse(data2)[0][2]>0) {laruta=JSON.parse(data2)[0][0]; 
												secotejo=JSON.parse(data2)[0][1]=='S'?'S':'N'; 
												if (secotejo=='N') {laclase="badge-warning"; msjDoc="El pago NO se ha cotejado Contabilidad";}
											}
				else {laruta=""; secotejo='N'; msjDoc="El alumno NO ha subido documento de pago al SIGEA"; laclase="badge-danger"; }				

			
				if (secotejo=='S') {
					$("#elpago").attr("href",laruta);
					$("#elpagospan").prop("title",msjDoc);
					$("#elpagospan").html("Pago <i class=\"fa white fa-check-square-o\"></i>");
					$("#elpagospan").addClass(laclase);
				}
				else{
					$("#elpago").attr("href",laruta);
					$("#elpagospan").prop("title",msjDoc);
					$("#elpagospan").html("Pago <i class=\"fa white fa-times\"></i>");
					$("#elpagospan").addClass(laclase);
				}

			}
		});

		//Verificamos la carga de las asignaturas que faltan de evaluacion docente 
		elsql="SELECT getStatusAlum('"+$("#selAlumnos").val()+"','"+$("#selCiclos").val()+"') from dual ";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){  		
			
					losdatos=JSON.parse(data);
					errores=losdatos[0][0];
				
					/*=================================================================================*/
					if (errores=='') {
								if (($("#selCarreras").val()=='10') || ($("#selCarreras").val()=='12')) {cargarHorariosExt('vinscripciones_oc');} else {cargarHorarios('vinscripciones');}
					}
					else {
								mostrarIfo("infoEval","grid_reinscripciones","Bloqueado para Reinscripción",
								"<div class=\"alert alert-danger\" style=\"text-align:justify; height:200px; overflow-y: scroll; \">"+errores+"</div>","modal-lg");
							}
							/*=================================================================================*/
							
						}
					});
	}



	function cargarPropuestaAlum (){
		$("#loshorarios").empty();
		if (eltipomat=='N') {cargarHorarios('vreinstem');}
		else {cargarHorariosExt('vreinstem');}
	}


    function cargarHorarios(lavista){		
		script="<table id=\"tabHorariosReins\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead>  "+
		   "             <tr>"+
		   "                <th><input type=\"checkbox\" id=\"chkTodos\" onclick=\"selTodos();\"/>Sel</th> "+	
		   "                <th>R</th> "+
		   "                <th class=\"hidden\">ID</th> "+		
		   "                <th>CVE_Asig</th> "+	   
		   "                <th>Asignatura</th> "+	
		   "                <th>SEM</th> "+	   
		   "                <th>Grupo</th> "+
		   "                <th>Carrera</th> "+
		   "                <th>Cupo</th> "+	   
		   "                <th>Ins</th> "+
		   "                <th style=\"text-align:center\">Lunes</th> "+
		   "                <th style=\"text-align:center\">Martes</th> "+
		   "                <th style=\"text-align:center\">Miercoles</th> "+
		   "                <th style=\"text-align:center\">Jueves</th> "+
		   "                <th style=\"text-align:center\">Viernes</th> "+
		   "                <th style=\"text-align:center\">Sabado</th> "+
		   "                <th style=\"text-align:center\">Domingo</th> "+	  	
		   "                <th style=\"text-align:center\">Cred.</th> "+	 
		   "                <th>Profesor</th> "+	   
		   "             </tr> "+
		   "            </thead>" +
		   "         </table>";
		   $("#loshorarios").empty();
		   $("#loshorarios").append(script);
				
		elsql="SELECT * FROM "+lavista+" y where y.CICLO='"+$("#elciclo").html().split("|")[0]+
			   "' AND y.MATRICULA='"+$("#selAlumnos").val()+"' and TIPOMAT='"+eltipomat+"' order by SEMESTRE, GRUPO, MATERIAD";
		
		mostrarEspera("esperahor","grid_reinscripciones","Cargando Horarios...");


		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  
				  
						elsqlmapa="SELECT ALUM_MAPA, ALUM_ESPECIALIDAD, ALUM_ESPECIALIDADSIE, PLACMA,PLACMI,PLAC1R, "+
						" PLACM1, getavanceCred(ALUM_MATRICULA) AS AVANCE  FROM falumnos, mapas where "+
						" ALUM_MAPA=MAPA_CLAVE AND ALUM_MATRICULA='"+$("#selAlumnos").val()+"'";
					
						parametros={sql:elsqlmapa,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(dataMapa){ 						
								losdatos=JSON.parse(data);
								losdatosMapa=JSON.parse(dataMapa);
								jQuery.each(losdatosMapa, function(clave, valor) { 
													
									generaTablaHorarios(losdatos,"INSCRITAS");   
									
									cargaMateriasDer(losdatosMapa[0]["ALUM_MAPA"],losdatosMapa[0]["ALUM_ESPECIALIDAD"],lavista);
									$("#elmapa").html(losdatosMapa[0]["ALUM_MAPA"]);
									$("#laespecialidad").html(losdatosMapa[0]["ALUM_ESPECIALIDAD"]);
									$("#laespecialidadSIE").html(losdatosMapa[0]["ALUM_ESPECIALIDADSIE"]);
									$("#selAvance").html(losdatosMapa[0]["AVANCE"]);		
									$("#CMA").html(losdatosMapa[0]["PLACMA"]);									
									$("#CMI").html(losdatosMapa[0]["PLACMI"]);										
									$("#C1R").html(losdatosMapa[0]["PLAC1R"]);	
									$("#CM1").html(losdatosMapa[0]["PLACM1"]);	

									credMax=losdatosMapa[0]["PLACMA"];
									credMin=losdatosMapa[0]["PLACMI"];
									cred1R=losdatosMapa[0]["PLAC1R"];
									credM1=losdatosMapa[0]["PLACM1"];

									validarCondiciones(false);	

									if (lavista="vreinstem") {
										mensajeAlumno="";
										elsql="select OBS, count(*) from dlistapropobs  where ALUCTR='"+$("#selAlumnos").val()+
										"' and PDOCVE='"+$("#elciclo").html().split("|")[0]+"' and TIPOMAT='"+eltipomat+"'";
																																
										parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
										$.ajax({
												type: "POST",
												data:parametros,
												url:  "../base/getdatossqlSeg.php",
												success: function(data){  
													
													if ((JSON.parse(data)[0][1])>0) {mensajeAlumno=JSON.parse(data)[0][0];}
												}
											});
										}
								});

								ocultarEspera("esperahor");     	      					  					  
							},
							error: function(data) {	                  
										alert('ERROR: '+data);
													}
					    });	          	      					  					  
	            },
	        	error: function(data) {	                  
	        	   	    alert('ERROR: '+data);
	        	   	                  }
	    });	        	   	   	        	    	 
		
}


function cargarHorarioCapturado(){
	    if (eltipomat=='OC') {lostipos="'N','I'";} else {lostipos="'N','OC'";}
		elsql="SELECT * FROM vinscripciones y where y.CICLO='"+$("#elciclo").html().split("|")[0]+
			   "' AND y.MATRICULA='"+$("#selAlumnos").val()+"' and TIPOMAT in ("+lostipos+") order by SEMESTRE, GRUPO, MATERIAD";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){  
					losdatos=JSON.parse(data);
					generaTablaHorarios(losdatos,"VISTAHORARIO");
				}
		});

}


function cargarHorariosExt(lavista){		
	script="<table id=\"tabHorariosReins\" class= \"table table-condensed table-bordered table-hover\" "+
			">"+
		  "        <thead>  "+
	   "             <tr>"+
	   "                <th><input type=\"checkbox\" id=\"chkTodos\" onclick=\"selTodos();\"/>Sel</th> "+	
	   "                <th>R</th> "+
	   "                <th class=\"hidden\">ID</th> "+		
	   "                <th>CVE_Asig</th> "+	   
	   "                <th>Asignatura</th> "+	
	   "                <th>SEM</th> "+	   
	   "                <th>Grupo</th> "+
	   "                <th>Carrera</th> "+
	   "                <th>Cupo</th> "+	   
	   "                <th>Ins</th> "+
	   "                <th style=\"text-align:center\">Lunes</th> "+
	   "                <th style=\"text-align:center\">Martes</th> "+
	   "                <th style=\"text-align:center\">Miercoles</th> "+
	   "                <th style=\"text-align:center\">Jueves</th> "+
	   "                <th style=\"text-align:center\">Viernes</th> "+
	   "                <th style=\"text-align:center\">Sabado</th> "+
	   "                <th style=\"text-align:center\">Domingo</th> "+	  	
	   "                <th style=\"text-align:center\">Cred.</th> "+	 
	   "                <th>Profesor</th> "+	   
	   "             </tr> "+
	   "            </thead>" +
	   "         </table>";
	   $("#loshorarios").empty();
	   $("#loshorarios").append(script);
	   cargarHorarioCapturado();	
	   
	elsql="SELECT * FROM "+lavista+" y where y.CICLO='"+$("#elciclo").html().split("|")[0]+
		   "' AND y.MATRICULA='"+$("#selAlumnos").val()+"' AND y.TIPOMAT='"+eltipomat+"' order by SEMESTRE, MATERIAD";	
	mostrarEspera("esperahor","grid_reinscripciones","Cargando Horarios...");
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		   type: "POST",
		   data:parametros,
		   url:  "../base/getdatossqlSeg.php",
		   success: function(data){  
					elsqlmapa="SELECT ALUM_MAPA, ALUM_ESPECIALIDAD, ALUM_ESPECIALIDADSIE, PLACMA,PLACMI,PLAC1R, PLACM1 FROM falumnos, mapas where "+
					" ALUM_MAPA=MAPA_CLAVE AND ALUM_MATRICULA='"+$("#selAlumnos").val()+"'"	
					parametros={sql:elsqlmapa,dato:sessionStorage.co,bd:"Mysql"}
					$.ajax({
						type: "POST",
						data:parametros,
						url:  "../base/getdatossqlSeg.php",
						success: function(dataMapa){  	
							losdatos=JSON.parse(data);
							losdatosMapa=JSON.parse(dataMapa);
							jQuery.each(losdatosMapa, function(clave, valor) { 
												
								generaTablaHorarios(losdatos,"INSCRITAS");   
								
								cargaMateriasDerExt('vinscripciones_oc');
								$("#elmapa").html(losdatosMapa[0]["ALUM_MAPA"]);
								$("#laespecialidad").html(losdatosMapa[0]["ALUM_ESPECIALIDAD"]);
								$("#laespecialidadSIE").html(losdatosMapa[0]["ALUM_ESPECIALIDADSIE"]);	
								$("#CMA").html(losdatosMapa[0]["PLACMA"]);
								$("#CMI").html(losdatosMapa[0]["PLACMI"]);	
								$("#C1R").html(losdatosMapa[0]["PLAC1R"]);	
								$("#CM1").html(losdatosMapa[0]["PLACM1"]);									
								validarCondiciones(false);	

								if (lavista="vreinstem") {
									mensajeAlumno="";
									elsql="select OBS, count(*) from dlistapropobs  where ALUCTR='"+$("#selAlumnos").val()+
									"' and PDOCVE='"+$("#elciclo").html().split("|")[0]+"' and TIPOMAT='"+eltipomat+"'";																													
									parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
									$.ajax({
											type: "POST",
											data:parametros,
											url:  "../base/getdatossqlSeg.php",
											success: function(data){  												
												if ((JSON.parse(data)[0][1])>0) {mensajeAlumno=JSON.parse(data)[0][0];}
											}
										});
									}
							});

							ocultarEspera("esperahor");     	      					  					  
						},
						error: function(data) {	                  
									alert('ERROR: '+data);
												}
					});	          	      					  					  
			},
			error: function(data) {	                  
					   alert('ERROR: '+data);
									 }
	});	        	   	   	        	    	 
	
}


function generaTablaHorarios(grid_data, tipo){
	
	colorSem=["success","warning","danger","info","purple","inverse","pink","yellow","grey","success"];
	valorcheck="";
	if (tipo=="INSCRITAS") {
		if (!($("#cuerpoReins").length)) {
			$("#cuerpoReins").empty();
			$("#tabHorariosReins").append("<tbody id=\"cuerpoReins\">");
		}
		valorcheck="checked =\"true\"";
	}
	if (tipo=="NO INSCRITAS COND") {
		valorcheck="checked =\"true\"";
	}
	if (tipo=="VISTAHORARIO") {
		$("#cuerpoReins").empty();
		$("#tabHorariosReins").append("<tbody id=\"cuerpoReins\">");
		valorcheck="checked =\"true\" disabled=\"true\"";
	}




	jQuery.each(grid_data, function(clave, valor) { 
		cadRep="N";colorrepit="white";claserepit="etRepit_N"; propRep=" repitiendo='0'"; propEsp=" especial='0''";
		if (valor.REP==1) {propRep=" repitiendo='1'";  claserepit="etRepit_R"; cadRep="R"; colorrepit="warning";}
		if (valor.REP>1) { propEsp=" especial='1'";  claserepit="etRepit_E"; cadRep="E"; colorrepit="danger";}
    
	    $("#cuerpoReins").append("<tr id=\"rowR"+contFila+"\">");
	   		
		$("#rowR"+contFila).append("<td>"+
		                           "<div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
		                           "<label> "+
									  "<input id=\"c_"+contFila+"_99\" "+propRep+propEsp+" onclick=\"checkOp('"+contFila+"')\" type=\"checkbox\" "+
									  "class=\"selMateria ace ace-switch ace-switch-6\""+valorcheck+" />"+
			                          "<span class=\"lbl\"></span>"+
	                                "</label> "+
                                    "</div> "+
		"</td>");
		//<input id=\"c_"+contFila+"_99\" type=\"checkbox\" onclick=\"checkOp('"+contFila+"')\" class=\"selMateria\" "+valorcheck+" /></td>");
		$("#rowR"+contFila).append("<td>"+contFila+"</td>");		
		$("#rowR"+contFila).append("<td  class=\"hidden\">"+ "<label id=\"c_"+contFila+"_0\" class=\"small text-info font-weight-bold\">"+valor.IDDETALLE+"</label</td>");
		
		$("#rowR"+contFila).append("<td><span class=\"text-purple\" id=\"c_"+contFila+"_13\">"+valor.MATERIA+"</span></td>");
		
	    $("#rowR"+contFila).append("<td><input  style=\"width:100%\" type=\"hidden\" value=\""+valor.MATERIA+"\" id=\"c_"+contFila+"_1\"></input>"+
								"<label  id=\"c_"+contFila+"_1B\" class=\"font-weight-bold small text-info\">"+valor.MATERIAD+"</label>"+
								"  <span id=\"c_"+contFila+"_1C\"  class=\""+claserepit+" badge badge-"+colorrepit+"\">"+cadRep+"</span></td>");
		
		$("#rowR"+contFila).append("<td><span class=\"badge badge-"+colorSem[valor.SEMESTRE]+"\" id=\"c_"+contFila+"_20\">"+valor.SEMESTRE+"</span></td>");
		$("#rowR"+contFila).append("<td><span class=\"label label-success label-white middle\" id=\"c_"+contFila+"_2SIE\">"+valor.GRUPO+"</span></td>");

		$("#rowR"+contFila).append("<td><span class=\"badge badge-"+colorSem[valor.CARRERA]+"\" id=\"c_"+contFila+"_12SIE\">"+valor.CARRERA+"</span></td>");
			
		$("#rowR"+contFila).append("<td><span class=\"text-danger\" id=\"c_"+contFila+"_10B\">"+valor.CUPO+"</span></td>");
		$("#rowR"+contFila).append("<td><span class=\"text-success\" id=\"c_"+contFila+"_11B\">"+valor.INS+"</span></td>");
			

		$("#rowR"+contFila).append("<td><strong><span class=\"text-success small\" id=\"c_"+contFila+"_3B\">"+valor.LUNES+"</span></strong></td>");
		$("#rowR"+contFila).append("<td><strong><span class=\"text-success small\" id=\"c_"+contFila+"_4B\">"+valor.MARTES+"</span></strong></td>");
		$("#rowR"+contFila).append("<td><strong><span class=\"text-success small\" id=\"c_"+contFila+"_5B\">"+valor.MIERCOLES+"</span></strong></td>");
		$("#rowR"+contFila).append("<td><strong><span class=\"text-success small\" id=\"c_"+contFila+"_6B\">"+valor.JUEVES+"</span></strong></td>");
		$("#rowR"+contFila).append("<td><strong><span class=\"text-success small\" id=\"c_"+contFila+"_7B\">"+valor.VIERNES+"</span></strong></td>");
		$("#rowR"+contFila).append("<td><strong><span class=\"text-success small\" id=\"c_"+contFila+"_8B\">"+valor.SABADO+"</span></strong></td>");
		$("#rowR"+contFila).append("<td><strong><span class=\"text-success small\" id=\"c_"+contFila+"_9B\">"+valor.DOMINGO+"</span></strong></td>");
		
		$("#rowR"+contFila).append("<td><span class=\"badge badge-"+colorSem[valor.CREDITOS]+"\" id=\"c_"+contFila+"_14\">"+valor.CREDITOS+"</span></td>");

		//profesor		
		$("#rowR"+contFila).append("<td><input  style=\"width:100%\" type=\"hidden\" value=\""+valor.PROFESOR+"\" id=\"c_"+contFila+"_2\"></input>"+
		                    "<label  id=\"c_"+contFila+"_2B\" class=\"font-weight-bold small text-info\">"+valor.PROFESORD+"</label></td>");
		
		contFila++;      			
	});	
	if (contFila>1) { $("#btnfiltrar").removeAttr('disabled');}		   	
} 


function selTodos() {
	if ($("#chkTodos").prop("checked")) {
		$(".selMateria").each(function(){		
			$(this).prop("checked",true);
		 });
	}
	else {
		$(".selMateria").each(function(){		
			$(this).prop("checked",false);
		 });
	}
}


function cargaMateriasDer(vmapa,vesp,lavista){
	parametros={matricula:$("#selAlumnos").val(),ciclo:$("#elciclo").html().split("|")[0],
	dato:sessionStorage.co,bd:"Mysql",vmapa:vmapa,vesp:vesp,tablaReg:"dlistaprop"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "getMaterias.php",
		success: function(data){ 

			sqlNI="SELECT * FROM dlistatem where MATRICULA='"+$("#selAlumnos").val()+
				  "' and SEMESTRE<=getPeriodos('"+$("#selAlumnos").val()+"','"+$("#elciclo").html().split("|")[0]+"') "+
				  " and INS<CUPO"+
				  " and IDDETALLE NOT IN (SELECT IDDETALLE FROM "+lavista+" y where y.CICLO='"+$("#elciclo").html().split("|")[0]+
				  "' AND y.MATRICULA='"+$("#selAlumnos").val()+"')"+ 
				  " and MAPA='"+vmapa+"' ORDER BY SEMESTRE, MATERIAD";
			parametros={sql:sqlNI,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(dataNI){ 
					losdatosNI=JSON.parse(dataNI);				
					generaTablaHorarios(losdatosNI,"NOINSCRITAS");				  					  
				 },
				 error: function(data) {	                  
							alert('ERROR: '+data);
										  }
		     });	       			  					  
		 },
		 error: function(data) {	                  
					alert('ERROR: '+data);
								  }
 });	       
}


function cargaMateriasDerExt(lavista){
	cadExtraesc="";
	if ($("#selCarreras").val()=='10') { cadphp="getMateriasIng";}
	if ($("#selCarreras").val()=='12') { cadphp="getMateriasExt";}

	parametros={lacarrera:$("#selCarreras").val(),matricula:$("#selAlumnos").val(),ciclo:$("#elciclo").html().split("|")[0],
	dato:sessionStorage.co,bd:"Mysql",tablaReg:"dlista",usuario:"ADMIN"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  cadphp+".php",
		success: function(data){ 
	

				sqlgrupo="select c.GRUPO, count(*) from dlista a, cmaterias b, ex_grupos c where a.MATCVE=b.MATE_CLAVE "+
				"AND MATE_TIPO='OC' and MATE_CLAVE=c.MATERIA and ALUCTR='"+$("#selAlumnos").val()+"' ORDER BY PDOCVE DESC";
				parametros={sql:sqlgrupo,dato:sessionStorage.co,bd:"Mysql"}
				$.ajax({
					type: "POST",
					data:parametros,
					url: "../base/getdatossqlSeg.php",
					success: function(datagrupo){ 
						arrgrupo=JSON.parse(datagrupo);	
						if ((arrgrupo[0][1]>0) && ($("#selCarreras").val()=='12')) { cadExtraesc=" and MATERIA IN (SELECT MATERIA FROM ex_grupos where GRUPO='"+arrgrupo[0][0]+"')";}

						sqlNI="SELECT * FROM dlistatem where MATRICULA='"+$("#selAlumnos").val()+
						"' and ADICIONAL='"+$("#selCarreras").val()+"'"+
						" and INS<CUPO"+
						" and IDDETALLE NOT IN (SELECT IDDETALLE FROM "+lavista+" y where y.CICLO='"+$("#elciclo").html().split("|")[0]+
						"' AND y.MATRICULA='"+$("#selAlumnos").val()+"')"+ 
						cadExtraesc+
						" ORDER BY SEMESTRE, MATERIAD";


						parametros={sql:sqlNI,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(dataNI){ 
								losdatosNI=JSON.parse(dataNI);				
								generaTablaHorarios(losdatosNI,"NOINSCRITAS");				  					  
							},
							error: function(data) {	                  
										alert('ERROR: '+data);
													}
						});	     
					
					}// del success de la buqueda de grupo 
				});
			  			  					  
		 }// del success principal
 });	       
}




/*=====================================AGREGAR VENTANA ASIGNATURA CON CONDICIONES================================*/
function agregarCondiciones(){
    if (!($('#selAlumnos').val()=="0")) {
		
		$("#venasigcond").modal("hide");
		$("#venasigcond").empty();
	    dameVentana("venasigcond","grid_reinscripciones","Agregar Asignatura otros Periodos","lg","bg-danger","fa blue bigger-160 fa-legal","300");
	  
		$("#body_venasigcond").append("<div class=\"row\">"+
							"           <div class=\"col-sm-12\">"+
							"                 <table id=\"tabcond\" class= \"table table-condensed table-bordered table-hover\" "+
							"           </div>"+
							"       </div>");

		cadFil=" AND CARRERA IN (10,13) ";
		if (eltipomat=='I') {cadFil=" AND CARRERA  IN (10) ";}
		if (eltipomat=='OC') {cadFil=" AND CARRERA  IN (12) ";}
		if (eltipomat=='N') {cadFil=" AND CARRERA NOT IN (10,12) ";}
		sql="SELECT '' as BTN, a.* FROM dlistatem a where MATRICULA='"+$("#selAlumnos").val()+"'"+
		cadFil+
		" ORDER BY SEMESTRE, MATERIAD";


        var titulos = [{titulo: "SEL",estilo: "text-align: center;"},
					   {titulo: "SEM",estilo: "text-align: center;"}, 
					   {titulo: "CARRERA",estilo: "text-align: center;"},
					   {titulo: "CVE. MAT.",estilo: "text-align: center;"}, 
                       {titulo: "MATERIA",estilo: "text-align: center;"},
					   {titulo: "PROFESORD",estilo: "text-align: center;"},					  
					   {titulo: "LUNES",estilo: "text-align: center;"},
					   {titulo: "MARTES",estilo: "text-align: center;"},
					   {titulo: "MIERCOLES",estilo: "text-align: center;"},
					   {titulo: "JUEVES",estilo: "text-align: center;"},
					   {titulo: "VIERNES",estilo: "text-align: center;"},
					   {titulo: "SABADO",estilo: "text-align: center;"},
					   {titulo: "DOMINGO",estilo: "text-align: center;"},
					];

		var campos = [{tipo:"btn", ico:"fa-legal", parametros:"IDDETALLE", nombreevento:"addAsigCond", campo:"", estilo:"", antes:"", despues:""},
					  {tipo:"campo", campo: "SEMESTRE",estilo:"text-align:center;",antes:"<span class=\"pull-right badge badge-info\">",despues:"</span>"}, 
					  {tipo:"campo", campo: "CARRERA",estilo:"text-align:center;",antes:"<span class=\"pull-right badge badge-success\">",despues:"</span>"}, 
		              {tipo:"campo", campo: "MATERIA",estilo:"",antes:"<span class=\"text-success\">",despues:"</span>"}, 
					  {tipo:"campo", campo: "MATERIAD",estilo:"",antes:"<strong>",despues:"</strong>"},					  
					  {tipo:"campo", campo: "PROFESORD",estilo: "",antes:"<span class=\"text-purple\">",despues:"</span>"},					  
					  {tipo:"campo", campo: "LUNES",estilo:"",antes:"<span class=\"text-danger\">",despues:"</span>"}, 
					  {tipo:"campo", campo: "MARTES",estilo:"",antes:"<span class=\"text-danger\">",despues:"</span>"}, 
					  {tipo:"campo", campo: "MIERCOLES",estilo:"",antes:"<span class=\"text-danger\">",despues:"</span>"}, 
					  {tipo:"campo", campo: "JUEVES",estilo:"",antes:"<span class=\"text-danger\">",despues:"</span>"}, 
					  {tipo:"campo", campo: "VIERNES",estilo:"",antes:"<span class=\"text-danger\">",despues:"</span>"}, 
					  {tipo:"campo", campo: "SABADO",estilo:"",antes:"<span class=\"text-danger\">",despues:"</span>"}, 
					  {tipo:"campo", campo: "DOMINGO",estilo:"",antes:"<span class=\"text-danger\">",despues:"</span>"}, 
				
					];

		generaTablaDinBtn("tabcond",sql,titulos,campos);

	}	
    else {
		alert ("Debe elegir un alumno");
	}					
}




function addAsigCond(id){
			sqlNI="SELECT * FROM dlistatem where MATRICULA='"+$("#selAlumnos").val()+
				  "' and IDDETALLE="+id+" ORDER BY SEMESTRE, MATERIAD";
			parametros={sql:sqlNI,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(dataNI){ 
					losdatosNI=JSON.parse(dataNI);	
					if 	(parseInt(losdatosNI[0]["INS"])<parseInt(losdatosNI[0]["CUPO"])) {
						generaTablaHorarios(losdatosNI,"NO INSCRITAS COND");	
						validarCondiciones(false);	
					}
					else {
						alert ("El cupo de esta asignatura "+losdatosNI[0]["MATERIAD"]+" es: "+losdatosNI[0]["CUPO"]+" Ya hay inscritos: "+losdatosNI[0]["INS"]);
					}		  					  
				 },
				 error: function(data) {	                  
							alert('ERROR: '+data);
										  }
		     });	       			  					  
}





function verInfo(){
	laespera="<img src=\"../../imagenes/menu/esperar.gif\" style=\"background: transparent; width: 30%; height:30%;\"/>"
	$('#infoReins').modal({show:true, backdrop: 'static'});
	         elalumno=$("#selAlumnos").val();
	         $("#elpromedio").html(laespera);
			 $("#loscreditost").html(laespera);
			 $("#loscreditos").html(laespera);
			 $("#prom_cr").html(laespera);
			 $("#prom_sr").html(laespera);
			
			//LLenamos datos del Perfil del Alumno 
			misql="SELECT CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE, "+
						   " CARR_DESCRIP as CARRERA, getavance('"+elalumno+"') as CREDITOS, getAvanceMat('"+elalumno+"') as MATERIAS, "+
						   " getPromedio('"+elalumno+"','N') as PROMEDIO_SR, getPromedio('"+elalumno+"','S') as PROMEDIO_CR   FROM falumnos a, ccarreras b"+
						   " where a.ALUM_MATRICULA='"+elalumno+"' and a.ALUM_CARRERAREG=b.CARR_CLAVE";		
			parametros={sql:misql,dato:sessionStorage.co,bd:"Mysql"}		
			 $.ajax({
				   type: "POST",
				   data:parametros,
				   url:  "../base/getdatossqlSeg.php",
				   success: function(data){   
					   losdatos=JSON.parse(data);   
											
					   jQuery.each(losdatos, function(clave, valor) { 				               
							$("#elnombre").html(valor.NOMBRE);
							$("#lacarrerainfo").html(valor.CARRERA);
							$("#elpromedio").html(valor.PROMEDIO);
							$("#loscreditost").html(valor.CREDITOS.split('|')[0]);
							$("#loscreditos").html(valor.CREDITOS.split('|')[1]);
							$("#etelavance").html(valor.CREDITOS.split('|')[2]);                               							
							$("#credpen").html(valor.CREDITOS.split('|')[0]-valor.CREDITOS.split('|')[1]+" Cr&eacute;ditos pend."); 
							$("#matcur").html(valor.MATERIAS.split('|')[1]);

							$("#matavance").html(valor.MATERIAS.split('|')[2]);
							$("#prom_cr").html(valor.PROMEDIO_CR);
							$("#prom_sr").html(valor.PROMEDIO_SR);

							$("#fondo").css("display","none");
							$("#info").css("display","block");

							$('#elavance').data('easyPieChart').update(valor.CREDITOS.split('|')[2]);
							
						   });

					   
				   }
			 });
}




/*=================================================================================================*/
function checkOp(id) {
     validarCondiciones(false);
}
function verCruceReins (arreglo,numdia,marcar){
	arreglo=Burbuja(arreglo);
	renglon=[];	
	renglon=arreglo[0].split("|");
	terant=renglon[1];
	desant=renglon[2];
	inputant=renglon[3];
	cad="";
	for (i=1;i<arreglo.length;i++){		
		renglon=arreglo[i].split("|");
		if (marcar) {$("#c_"+renglon[3]+"_"+numdia).css("border-color","#BEBEBE");}
		if (parseInt (terant)>parseInt (renglon[0])) { 
			cad+=renglon[2]+" CON "+desant+"|";
			if (marcar) {
				$("#c_"+inputant+"_"+numdia).removeClass("text-success"); 
				$("#c_"+inputant+"_"+numdia).addClass("text-danger"); 

				$("#c_"+renglon[3]+"_"+numdia).removeClass("text-success"); 
				$("#c_"+renglon[3]+"_"+numdia).addClass("text-danger"); 
			}
		}
		terant=renglon[1];
		desant=renglon[2];
		inputant=renglon[3];
		
	}
	return cad;
}

function validarcrucesReins(){
	var cadFin="";
	var eldia=[];
	var losdias=["LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO","DOMINGO"];
	 for (x=3;x<=9;x++) {
		 j=0;
		 eldia=[];
		 for (i=1; i<contFila; i++) {
				$("#c_"+i+"_"+x+"B").removeClass("text-danger"); 
				$("#c_"+i+"_"+x+"B").addClass("text-success");
	
				hor=$("#c_"+i+"_"+x+"B").html();
				marcado=$("#c_"+i+"_"+"99").prop("checked");				
				if ((hor!=="") && (marcado)) {
					cad1=hor.substr(0,hor.indexOf("-"));
					cad2=hor.substr(hor.indexOf("-")+1,hor.length);
		            
					hora1=cad1.substr(0,cad1.indexOf(":"));
					min1=cad1.substr(cad1.indexOf(":")+1,cad1.length);
					
					hora2=cad2.substr(0,cad2.indexOf(":"));
					min2=cad2.substr(cad2.indexOf(":")+1,cad2.length);
					
					mintot1=parseInt(hora1)*60+parseInt(min1);
					mintot2=parseInt(hora2)*60+parseInt(min2);
                    
					eldia[j]=mintot1+"|"+mintot2+"|"+$("#c_"+i+"_"+"1B").html()+"|"+i;				
					j++;
				}
		}	     
		if (!(eldia.length==0)) {
			 res=verCruceReins(eldia,x+"B",true);
			 if (res.length>0) {
			      cadFin+="<span class=\"badge badge-danger\">CRUCE: "+losdias[x-3]+" "+res+"</span><br/>";
			 }			 
		 }		
	}
 return cadFin;  
}


function hayRepetidas(){
	var listaMat=[];
	var matRep="";
	j=0;
	for (i=1; i<contFila; i++){
		cad="";
		if ($("#c_"+i+"_99").prop("checked")) {
			listaMat[j]=$("#c_"+i+"_13").html();				
			j++;
		}
	}
	listaMat=BurbujaCadena(listaMat);
	materiaant=listaMat[0];
	for (i=1; i<listaMat.length; i++){
		if (materiaant==listaMat[i]) {matRep+="<span class=\"badge badge-success\"> La materia "+listaMat[i]+" Se encuentra repetida</span><br/>";}
		materiaant=listaMat[i];
	}
	return matRep;
}



function checarResidencia(){
	//Checamos que no haya elegido residencia sin cumplir los creditos 
	resCursa='';
	var listaMat=[];
	for (i=1; i<contFila; i++){
		cad="";
		if ($("#c_"+i+"_99").prop("checked")) {		
			if (residencias.indexOf($("#c_"+i+"_13").html())>=0){
                resCursa=$("#c_"+i+"_13").html();
			}  							
		}
	}
	return resCursa;
}



function validarCondiciones(mensaje) {
	res="";

	//Checamos materias repetidas
	cadMat=hayRepetidas();
	if (cadMat.length>0) {res+=cadMat; }

	//calculamos el total de créditos 
	sumacred=0; for (i=1; i<contFila; i++){if ($("#c_"+i+"_99").prop("checked")) {sumacred+=parseInt($("#c_"+i+"_14").html());}}
	sumaRep=0; for (i=1; i<contFila; i++){ if ($("#c_"+i+"_99").prop("checked")) {sumaRep+=parseInt($("#c_"+i+"_99").attr("repitiendo"));}}
	sumaEsp=0; for (i=1; i<contFila; i++){if ($("#c_"+i+"_99").prop("checked")) {sumaRep+=parseInt($("#c_"+i+"_99").attr("especial"));}}

	$("#selCreditos").html(sumacred);
	$("#selRepitiendo").html(sumaRep);
	$("#selEspecial").html(sumaEsp);
	
   
	//Checamos que los creditos de especiales no se rebasen 
	 if (parseInt($("#selEspecial").html())>2) {res+="<span class=\"badge badge-warning\"> No se puede solicitar mas de dos asignaturas en especiales</span><br/>";}
	 
	 if ((parseInt($("#selEspecial").html())>0) && (parseInt($("#selCreditos").html())>parseInt($("#CMI").html()))) {		
		  res+="<span class=\"badge badge-info\"> Si esta cursando una asignatura en especial debe llevar solo carga mínima "+$("#CMI").html()+" cr&eacute;ditos</span><br/>";}
	
	if ((parseInt($("#selRepitiendo").html())==1) && (parseInt($("#selCreditos").html())>parseInt($("#C1R").html()))) {
		res+="<span class=\"badge badge-primary\"> Si esta cursando una asignatura en repitición solo debe llevar "+$("#C1R").html()+" créditos</span><br/>";}

	if ((parseInt($("#selRepitiendo").html())>1) && (parseInt($("#selCreditos").html())>$("#CM1").html())) {
		res+="<span class=\"badge badge-warning\"> Si esta cursando dos o mas asignaturas en repitición solo debe llevar "+$("#CM1").html()+" créditos</span><br/>";}

	if  (parseInt($("#selCreditos").html())>parseInt(credMax)) {
			res+="<span class=\"badge badge-warning\"> Los créditos máximos que puedes cursar son:  "+$("#CMA").html()+" créditos</span><br/>";}
	
	matRes=checarResidencia();
	if (!(matRes=='') && (parseFloat($("#selAvance").html())<80)) {
		res+="<span class=\"badge badge-pink\"> Para poder cursar la Residencia Prof. "+matRes+" debe cumplir el 80% de avances en créditos </span><br/>";
	}
	
	res+=validarcrucesReins();
	return (res);
}




function guardarRegistros(){
	j=0;
	var f = new Date();
	fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();
	var losdatos=[];
	for (i=1; i<contFila; i++){
		cad="";
		if ($("#c_"+i+"_99").prop("checked") && !($("#c_"+i+"_99").prop("disabled")) ) {
					cad=$("#elciclo").html().split("|")[0]+"|"+ //PDOCVE
					$("#c_"+i+"_13").html()+"|"+    //MATCVE
					$("#selAlumnos").val()+"|"+    //ALUCTR                  
					$("#c_"+i+"_2SIE").html()+"|"+ //GRUPO                    
					$("#c_"+i+"_0").html()+"|"+ //iddetalle
					$("#c_"+i+"_2").val()+"|"+ //profesor
					fechacap+"|"+ //fecha
					$("#elusuario").html()+"|"+ //usuario
					$("#c_"+i+"_1C").html()+"|"+ //Tipo de cursamiento 
					$("#selCarreras").val(); //Tipo de cursamiento 
					losdatos[j]=cad;				
					j++;			
		}
	}

	var loscampos = ["PDOCVE","MATCVE","ALUCTR","GPOCVE","IDGRUPO","LISTC15","FECHAINS","USUARIO","LISTC14","LISTC13"];

	parametros={
		tabla:"dlista",
		campollave:"concat(PDOCVE,ALUCTR,LISTC13)",
		bd:"Mysql",
		valorllave:$("#elciclo").html().split("|")[0]+$("#selAlumnos").val()+$("#selCarreras").val(),
		eliminar: "S",
		separador:"|",
		campos: JSON.stringify(loscampos),
		datos: JSON.stringify(losdatos)
	};
	$.ajax({
		type: "POST",
		url:"../base/grabadetalle.php",
		data: parametros,
		success: function(data){
			console.log(data);
			if (data.length>0) {alert ("Ocurrio un error: "+data);}
			ocultarEspera("guardandoReins");
			
			if ($("#imprimirBoletaCheck").prop("checked")) {
				window.open("boletaMat.php?carrera="+$("#selCarreras").val()+"&matricula="+$("#selAlumnos").val()+"&ciclo="+$("#elciclo").html().split("|")[0], '_blank');                                 	                                        					          
			}
			limpiarVentana();
		}					     
	});  
	
	//ACTUALIZAMOS EL DOCUMENTO DE REINSCRIPCION COMO ATENDIDO 
	fecha=dameFecha("FECHAHORA");

	parametros={tabla:"eadjreins",						    		    	      
	bd:"Mysql",
	campollave:"AUX",
	valorllave:$("#selAlumnos").val()+"_"+$("#elciclo").html().split("|")[0]+"_N",
	ATENDIDO:'S',
	FECHAATENCION:fecha,
	USERATENCION:elusuario
	};	      
	$.ajax({
	type: "POST",
	url:"../base/actualiza.php",
	data: parametros,
	success: function(data){     			    		
		$('#dlgproceso').modal("hide");
	   }		
	}); 



}


function limpiarVentana(){
	$("#tabHorariosReins").empty();
	$("#confirmFinalizar").modal("hide");
    mensajeAlumno="";
}

function guardarTodos(){


	mostrarEspera("guardandoReins","grid_reinscripciones","Guardando...");
	res=validarCondiciones(false);

	if (res.length>0) {
		mostrarConfirm2("confirmFinalizar", "grid_reinscripciones", "ERRORES EN LA REINSCRIPCIÓN",			  
			  "         <div  id=\"miserrores\"  style=\"width:100%; text-align:justify; height:150px; overflow-y: scroll;\">"+res+"</div>",
			  "Grabar de todos modos", "guardarRegistros();","modal-lg");
			  ocultarEspera("guardandoReins");	
			}	
	else {
		guardarRegistros();   //en caso de que no haya errores
	}
}


function verKardex(){
	window.open("../avancecurri/kardex.php?matricula="+$("#selAlumnos").val(), '_blank'); 
}

function imprimeBoleta(){
	window.open("boletaMat.php?carrera="+$("#selCarreras").val()+"&matricula="+$("#selAlumnos").val()+"&ciclo="+$("#elciclo").html().split("|")[0], '_blank'); 
}

function verMateriasEvalDoc(){
	mostrarIfo("infoEval","grid_reinscripciones","Asignaturas que faltan Eval. Doc.",
	"<div style=\"text-align:justify;\">"+cadmatsineval+"</div>","modal-lg");
}


function verNotaAlum(){
	mostrarIfo("infoEval","grid_reinscripciones","Observación de la propuesta Alumno",
	"<div style=\"text-align:justify;\">"+mensajeAlumno+"</div>","modal-lg");
}