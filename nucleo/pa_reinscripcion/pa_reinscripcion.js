var id_unico="";
var estaseriando=false;
var matser="";
var contFila=1;
var miciclo="";
var residencias=[];
var matsineval=0;
var cadmatsineval="";
var micicloant="";

    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		setSesion("elusuario","usuario");
		$("#info").css("display","none");
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
	

		elsql="SELECT CICL_CLAVE, CICL_DESCRIP, CICL_CICLOANT,count(*) from ciclosesc where CICL_ABIERTOREINS='S' ORDER BY CICL_CLAVE DESC";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){  	
					losdatos=JSON.parse(data);
					if (losdatos[0][3]>0) {
							miciclo=losdatos[0][0];
							micicloant=losdatos[0][2];
							$("#elciclo").html(losdatos[0][0]+"|"+losdatos[0][1]);					

							elsql="SELECT RUTA,COTEJADO,count(*) FROM eadjreins where AUX='"+usuario+"_"+miciclo+"_PAGO'";
							parametros2={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			
							$.ajax({
								type: "POST",
								data:parametros2,
								url:  "../base/getdatossqlSeg.php",
								success: function(data2){  	
									laruta='';
									activaEliminar='S';
									if (JSON.parse(data2)[0][2]>0) {laruta=JSON.parse(data2)[0][0]; 
																	activaEliminar=JSON.parse(data2)[0][1]=='N'?'S':'N'; }
									dameSubirArchivoDrive("elrecibo","Recibo de Pago de Reinscripción","reciboreins",'RECIBOREINS','pdf',
												'ID',usuario,'RECIBO DE PAGO','eadjreins','alta',usuario+"_"+miciclo+"_PAGO",laruta,activaEliminar);						
									
									//en caso de que el pago ya haya sido validado
									if (JSON.parse(data2)[0][1]=='S') {
										$("#inputFileRow").html("<span class=\"badge badge-success bigger-120\"><i class=\"fa fa-check bigger-200\"></i>"+
																"Tu pago ha sido validado Correctamente</span>");										
									}	
									
									//agregamos el boton de subir horarios
									$("#losbotones").html("<button title=\"Hacer mi propuesta de Horario\" onclick=\"miHorario();\" "+
									                     "     class=\"btn btn-white btn-purple  btn-round\">"+ 
														 "     <i class=\"ace-icon text-warning fa fa-calendar bigger-140\"></i>"+
														 "     Mi Propuesta de Horario<span class=\"btn-small\"></span> "+           
														 "</button>");														
								}
							});

							
							//Verificamos si le quedán asignaturas por hacer evaldoc
							matsineval=0;
							cadmatsineval="";
							elsql3="select MATE_DESCRIP AS MATERIAD, MATCVE AS MATERIA, "+
								"(IF ((IFNULL((SELECT COUNT(*) from ed_respuestas n "+
								"			where n.IDDETALLE=a.ID AND n.TERMINADA='S'),0))>0,'S','N')) AS EVAL "+
								" from dlista a, cmaterias b where a.ALUCTR='"+usuario+"' and PDOCVE='"+micicloant+"'"+
								" and MATCVE=MATE_CLAVE";
							
							parametros3={sql:elsql3,dato:sessionStorage.co,bd:"Mysql"}
							$.ajax({
								type: "POST",
								data:parametros3,
								url:  "../base/getdatossqlSeg.php",
								success: function(data3){ 					
									jQuery.each(JSON.parse(data3), function(clave, valor) { 
								
										if (valor.EVAL=='N') {
											matsineval++;
											cadmatsineval+="<span>"+valor.MATERIAD+"</span><br/>";
										}
									});	
									$("#laevaldoc").html(matsineval);																									
								}
							});

						} 
					else { //En caso de que no haya ciclos abiertos 
						$("#elrecibo").html("<span class=\"badge badge-danger  bigger-120\"><i class=\"fa fa-times-circle bigger-200\"></i>"+
																"El proceso de Reinscripción no se encuentra abierto actualmente</span>");	
					}
				
			   }
			});
		
			elsql3="SELECT getavanceCred('"+usuario+"') from dual";
			parametros3={sql:elsql3,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros3,
				url:  "../base/getdatossqlSeg.php",
				success: function(data3){ 			
					losavance=losdatos=JSON.parse(data3)[0][0];
					$("#selAvance").html(losavance);					
											
				}
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


			

			



	$(document).on( 'change', '.edit', function(){		
		lin=$(this).attr("id").split("_")[1];
		$("#guardar_"+lin).removeClass("btn-success");
		$("#guardar_"+lin).addClass("btn-warning");
		$(this).css("border-color",""); 
	 });
	 
	});


	function verMateriasEvalDoc(){
		mostrarIfo("infoEval","grid_pa_reinscripcion","Asignaturas que faltan Eval. Doc.",
		"<div style=\"text-align:justify;\">"+cadmatsineval+"</div>","modal-lg");
	}

	function miHorario(){
		if (!($("#reciboreins").val()=='')) {			
			//verificamos si ya se envio la propuesta 		
			elsql="SELECT count(*) as N FROM dlistaprop y where y.PDOCVE='"+miciclo+
			"' AND y.ALUCTR='"+usuario+"' and ENVIADA='S'";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
					type: "POST",
					data:parametros,
					url:  "../base/getdatossqlSeg.php",
					success: function(data){  
						yaenvio=JSON.parse(data);
						if (yaenvio[0][0]>0) {
							mostrarIfo("infoYa","grid_pa_reinscripcion","Propuesta Enviada","Su propuesta ya fue enviada con "+
							"anterioriedad, ya la esta verificando su Jefe de División, por favor este atento a su correo electrónico y/o celular",
							"modal-lg");
						}
						else {
							$("#principal").removeClass("hide");
							cargarHorarios();
						}
					}
				});			
		}
		else { alert ("Debe cargar primero su recibo de pago para tener acceso a cargar su propuesta");}
		
	}
	

    function cargarHorarios(){		
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
				
		elsql="SELECT * FROM vreinstem y where y.CICLO='"+miciclo+
		       "' AND y.MATRICULA='"+usuario+"' order by SEMESTRE, MATERIAD";
		mostrarEspera("esperahor","grid_pa_reinscripcion","Cargando Horarios...");
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  
						losdatos=JSON.parse(data);
									
						elsqlmapa="SELECT ALUM_MAPA, ALUM_ESPECIALIDAD, ALUM_ESPECIALIDADSIE, PLACMA,PLACMI,PLAC1R, PLACM1 FROM falumnos, mapas where "+
						" ALUM_MAPA=MAPA_CLAVE AND ALUM_MATRICULA='"+usuario+"'"	
						parametros={sql:elsqlmapa,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(dataMapa){  	
								
								losdatosMapa=JSON.parse(dataMapa);
								jQuery.each(losdatosMapa, function(clave, valor) { 
													
									generaTablaHorarios(losdatos,"INSCRITAS");   
								
									
									cargaMateriasDer(losdatosMapa[0]["ALUM_MAPA"],losdatosMapa[0]["ALUM_ESPECIALIDAD"]);
									
									$("#elmapa").html(losdatosMapa[0]["ALUM_MAPA"]);
									$("#laespecialidad").html(losdatosMapa[0]["ALUM_ESPECIALIDAD"]);
									$("#laespecialidadSIE").html(losdatosMapa[0]["ALUM_ESPECIALIDADSIE"]);	
									$("#CMA").html(losdatosMapa[0]["PLACMA"]);
									$("#CMI").html(losdatosMapa[0]["PLACMI"]);	
									$("#C1R").html(losdatosMapa[0]["PLAC1R"]);	
									$("#CM1").html(losdatosMapa[0]["PLACM1"]);									
									validarCondiciones(false);	
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
		$("#cuerpoReins").empty();
		$("#tabHorariosReins").append("<tbody id=\"cuerpoReins\">");
		valorcheck="checked =\"true\"";
	}
	if (tipo=="NO INSCRITAS COND") {
		valorcheck="checked =\"true\"";
	}

	jQuery.each(grid_data, function(clave, valor) { 	 		
		cadRep="N";colorrepit="white";claserepit="etRepit_N"; 
		if (valor.REP==1) {claserepit="etRepit_R"; cadRep="R"; colorrepit="warning";}
		if (valor.REP>1) {claserepit="etRepit_E"; cadRep="E"; colorrepit="danger";}
    
	    $("#cuerpoReins").append("<tr id=\"rowR"+contFila+"\">");
	   		
		$("#rowR"+contFila).append("<td>"+
		                           "<div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
		                           "<label> "+
									  "<input id=\"c_"+contFila+"_99\" onclick=\"checkOp('"+contFila+"')\" type=\"checkbox\" "+
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


function cargaMateriasDer(vmapa,vesp){

	parametros={matricula:usuario,ciclo:miciclo,dato:sessionStorage.co,bd:"Mysql",vmapa:vmapa,vesp:vesp}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../reinscripciones/getMaterias.php",
		success: function(data){ 

			sqlNI="SELECT * FROM dlistatem where MATRICULA='"+usuario+
				  "' and SEMESTRE<=getPeriodos('"+usuario+"','"+miciclo+"') "+
				  " and INS<CUPO and IDDETALLE NOT IN (SELECT IDDETALLE FROM vreinstem y where y.CICLO='"+miciclo+
				  "' AND y.MATRICULA='"+usuario+"')"+ 
				  " and MAPA='"+vmapa+"' ORDER BY SEMESTRE, GRUPO, MATERIAD";
		
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



/*=====================================AGREGAR VENTANA ASIGNATURA CON CONDICIONES================================*/
function agregarCondiciones(){

    if (!($('#selAlumnos').val()=="0")) {
		
		$("#venasigcond").modal("hide");
		$("#venasigcond").empty();
	    dameVentana("venasigcond","grid_pa_reinscripcion","Agregar Asignatura otros Periodos","lg","bg-danger","fa blue bigger-160 fa-legal","300");
	  
		$("#body_venasigcond").append("<div class=\"row\">"+
							"           <div class=\"col-sm-12\">"+
							"                 <table id=\"tabcond\" class= \"table table-condensed table-bordered table-hover\" "+
							"           </div>"+
							"       </div>");

		sql="SELECT '' as BTN, a.* FROM dlistatem a where MATRICULA='"+usuario+"'"+
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
			sqlNI="SELECT * FROM dlistatem where MATRICULA='"+usuario+
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
	         elalumno=usuario;
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



/*===================================VALIDANDO CONDICIONES GENERALES ======================================*/

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
	sumacred=0;
	for (i=1; i<contFila; i++){
		if ($("#c_"+i+"_99").prop("checked")) {
            sumacred+=parseInt($("#c_"+i+"_14").html());
		}
	}
	$("#selCreditos").html(sumacred);
	
	//CALCULAMOS NUMERO DE REPORBADAS 
	$("#selRepitiendo").html($(".etRepit_R").toArray().length); 
    //CALCULAMOS NUMERO DE ESPECIALES
	$("#selEspecial").html($(".etRepit_E").toArray().length); 
   
	//Checamos que los creditos de especiales no se rebasen 
	 if (parseInt($("#selEspecial").html())>2) {res+="<span class=\"badge badge-warning\"> No se puede solicitar mas de dos asignaturas en especiales</span><br/>";}
	 
	 if ((parseInt($("#selEspecial").html())>0) && (parseInt($("#selCreditos").html())>parseInt($("#CMI").html()))) {		
		  res+="<span class=\"badge badge-info\"> Si esta cursando una asignatura en especial debe llevar solo carga mínima "+$("#CMI").html()+" cr&eacute;ditos</span><br/>";}
	
	if ((parseInt($("#selRepitiendo").html())==1) && (parseInt($("#selCreditos").html())>parseInt($("#C1R").html()))) {
		res+="<span class=\"badge badge-primary\"> Si esta cursando una asignatura en repitición solo debe llevar "+$("#C1R").html()+" créditos</span><br/>";}

	if ((parseInt($("#selRepitiendo").html()>1)) && (parseInt($("#selCreditos").html()>$("#CM1").html()))) {
		res+="<span class=\"badge badge-warning\"> Si esta cursando dos o mas asignaturas en repitición solo debe llevar "+$("#CM1").html()+" créditos</span><br/>";}
	
	matRes=checarResidencia();
	if (!(matRes=='') && (parseFloat($("#selAvance").html())<80)) {
		res+="<span class=\"badge badge-pink\"> Para poder cursar la Residencia Prof. "+matRes+" debe cumplir el 80% de avances en créditos </span><br/>";
	}
	
	//Checamos si ya evaluo todos sus docentes
	if (parseInt($("#laevaldoc").html())>0) {res+="<span class=\"badge badge-info\">  Su propuesta no puede ser enviada no ha evaluado a todos sus docentes del ciclo pasado</span><br/>";}
	
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
		if ($("#c_"+i+"_99").prop("checked")) {
					cad=miciclo+"|"+ //PDOCVE
					$("#c_"+i+"_13").html()+"|"+    //MATCVE
					usuario+"|"+    //ALUCTR                  
					$("#c_"+i+"_2SIE").html()+"|"+ //GRUPO                    
					$("#c_"+i+"_0").html()+"|"+ //iddetalle
					$("#c_"+i+"_2").val()+"|"+ //profesor
					fechacap+"|"+ //fecha
					usuario+"|"+ //usuario
					$("#c_"+i+"_1C").html(); //Tipo de cursamiento 
					losdatos[j]=cad;				
					j++;			
		}
	}

	var loscampos = ["PDOCVE","MATCVE","ALUCTR","GPOCVE","IDGRUPO","LISTC15","FECHAINS","USUARIO","LISTC14"];

	parametros={
		tabla:"dlistaprop",
		campollave:"concat(PDOCVE,ALUCTR)",
		bd:"Mysql",
		valorllave:miciclo+usuario,
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
			if (data.length>0) {alert ("Ocurrio un error: "+data);}
			ocultarEspera("guardandoReins");
			mostrarIfo("infoYa","grid_pa_reinscripcion","Validación Correcta","Su propuesta ha sido validada correctamente, ahora ya puede enviarla"+
			" a su Jefe de División haciendo click en el botón Enviar propuesta",
							"modal-lg");	
		}					     
	});    	         
}



function guardarTodos(){
	mostrarEspera("guardandoReins","grid_pa_reinscripcion","Guardando...");
	res=validarCondiciones(false);
	
	if (res.length>0) {
		mostrarConfirm2("confirmFinalizar", "grid_pa_reinscripcion", "ERRORES EN LA PROPUESTA",			  
			  "         <div  id=\"miserrores\"  style=\"width:100%; text-align:justify; height:150px; overflow-y: scroll;\">"+res+"</div>",
			  "Cerrar", "cerrarVentana();","modal-lg");
			  ocultarEspera("guardandoReins");			  
		}		
	else {
		guardarRegistros();   //en caso de que no haya errores
		ocultarEspera("guardandoReins");	
	}
}

function cerrarVentana(){
	ocultarEspera("guardandoReins");
	$("#confirmFinalizar").modal("hide");	
}



function addObserva(){
	//cargamos listas de residencias 
	elsql3="select OBS, count(*) from dlistapropobs  where ALUCTR='"+usuario+"' and PDOCVE='"+miciclo+"'";
	parametros3={sql:elsql3,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros3,
		url:  "../base/getdatossqlSeg.php",
		success: function(data3){ 
			cadOBS='';
			if ((JSON.parse(data3)[0][1])>0) {cadOBS=JSON.parse(data3)[0][0];}
			mostrarConfirm2("confirmObs", "grid_pa_reinscripcion", "OBSERVACIONES",			  
			"         <textarea  id=\"misobs\"  style=\"width:100%; text-align:justify; height:100%; overflow-y: scroll;\">"+cadOBS+"</textarea>",
			"Guardar", "grabarObs();","modal-lg");																											
		}
	});		  
}


function grabarObs(){

	var losdatos = [miciclo+"|"+usuario+"|"+$("#misobs").val()];
	var loscampos = ["PDOCVE","ALUCTR","OBS"];

	parametros={
		tabla:"dlistapropobs",
		campollave:"concat(PDOCVE,ALUCTR)",
		bd:"Mysql",
		valorllave:miciclo+usuario,
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
			if (data.length>0) {alert ("Ocurrio un error: "+data);}
			ocultarEspera("guardandoReins");
			$("#confirmObs").modal("hide");			
		}					     
	});    	         
}


function
 enviarJefe(){
	elsql3="select  count(*) from dlistaprop  where ALUCTR='"+usuario+"' and PDOCVE='"+miciclo+"'";
	parametros3={sql:elsql3,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros3,
		url:  "../base/getdatossqlSeg.php",
		success: function(data3){ 
			if ((JSON.parse(data3)[0][0])>0) {
				if (confirm("¿Seguro que deseas enviar tu propuesta, ya no podrá realziar cambios?")) {
					mostrarEspera("guardandoReins","grid_pa_reinscripcion","Guardando...");
					res=validarCondiciones(false);	
					if (res.length==0) {
							parametros={tabla:"dlistaprop",bd:"Mysql",campollave:"concat(PDOCVE,ALUCTR)",valorllave:miciclo+usuario,ENVIADA:"S"};
							$.ajax({
								type: "POST",
								url:"../base/actualiza.php",
								data: parametros,
								success: function(data){       
								if (!(data.substring(0,1)=="0"))	{ 
									ocultarEspera("guardandoReins");
									$("#principal").addClass("hide");
									$("#tabHorariosReins").empty();
								}
								else {alert (" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}																												
								}					     
						}); 
					}
				  else {alert ("Tu propuesta tiene errores de Validación, haga clic primero en el botón Verificar y Guardar y ya no agregues o quites asignatura");
				       ocultarEspera("guardandoReins");
				       }
				} 
			}
			else { alert ("Al parecer no has guardado tu propuesta, recuerda hacer click primero en el botón Verificar y Guardar");
			       ocultarEspera("guardandoReins");
		       }
		}
	});		  

}