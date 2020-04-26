var id_unico="";
var estaseriando=false;
var matser="";
var contFila=1;


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
	 
	});
	
	
		 
	function change_SELECT(elemento) {
        if (elemento=='selCarreras') {
			actualizaSelect("selAlumnos","SELECT ALUM_MATRICULA,CONCAT(ALUM_MATRICULA,' ',ALUM_APEPAT,' ',ALUM_APEMAT,' ',ALUM_NOMBRE) "+
		                    " from falumnos where ALUM_CARRERAREG='"+$("#selCarreras").val()+"' order by ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE","BUSQUEDA");
			}
		if (elemento=='selCarreras') {	
			$("#selAlumnos").empty();
			$("#tabHorariosReins").empty();
		}
		if (elemento=='selAlumnos') {
			cargarHorarios();		
		}
        
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
				
		elsql="SELECT * FROM vinscripciones y where y.CICLO='"+$("#elciclo").html().split("|")[0]+
		       "' AND y.MATRICULA='"+$("#selAlumnos").val()+"' order by SEMESTRE, MATERIAD";
		mostrarEspera("esperahor","grid_reinscripciones","Cargando Horarios...");
	    $.ajax({
	           type: "GET",
			   url:  "../base/getdatossql.php?bd=Mysql&sql="+elsql,
	           success: function(data){  
						elsqlmapa="SELECT ALUM_MAPA, ALUM_ESPECIALIDAD, ALUM_ESPECIALIDADSIE, PLACMA,PLACMI,PLAC1R, PLACM1 FROM falumnos, mapas where "+
						" ALUM_MAPA=MAPA_CLAVE AND ALUM_MATRICULA='"+$("#selAlumnos").val()+"'"	
						$.ajax({
							type: "GET",
							url:  "../base/getdatossql.php?bd=Mysql&sql="+elsqlmapa,
							success: function(dataMapa){  	
								losdatos=JSON.parse(data);
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
	$.ajax({
		type: "GET",
		url:  "getMaterias.php?bd=Mysql&matricula="+$("#selAlumnos").val()+"&ciclo="+$("#elciclo").html().split("|")[0]+
		       "&vmapa="+vmapa+"&vesp="+vesp,
		success: function(data){ 
			sqlNI="SELECT * FROM dlistatem where MATRICULA='"+$("#selAlumnos").val()+
				  "' and SEMESTRE<=getPeriodos('"+$("#selAlumnos").val()+"','"+$("#elciclo").html().split("|")[0]+"') "+
				  " and MAPA='"+vmapa+"' ORDER BY SEMESTRE, MATERIAD";
			$.ajax({
				type: "GET",
				url:  "../base/getdatossql.php?bd=Mysql&sql="+sqlNI,
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
	    dameVentana("venasigcond","grid_reinscripciones","Agregar Asignatura otros Periodos","lg","bg-danger","fa blue bigger-160 fa-legal","300");
	  
		$("#body_venasigcond").append("<div class=\"row\">"+
							"           <div class=\"col-sm-12\">"+
							"                 <table id=\"tabcond\" class= \"table table-condensed table-bordered table-hover\" "+
							"           </div>"+
							"       </div>");

		sql="SELECT '' as BTN, a.* FROM dlistatem a where MATRICULA='"+$("#selAlumnos").val()+
		"' and SEMESTRE>getPeriodos('"+$("#selAlumnos").val()+"','"+$("#elciclo").html().split("|")[0]+"')"+
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
			$.ajax({
				type: "GET",
				url:  "../base/getdatossql.php?bd=Mysql&sql="+sqlNI,
				success: function(dataNI){ 
					losdatosNI=JSON.parse(dataNI);				
					generaTablaHorarios(losdatosNI,"NO INSCRITAS COND");	
					validarCondiciones(false);			  					  
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
			 $.ajax({
				   type: "GET",
				   url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(misql),
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
			      cadFin+=losdias[x-3]+" "+res+"\n";
			 }			 
		 }		
	}
 return cadFin;  
}



/*===================================VALIDANDO CONDICIONES GENERALES ======================================*/
function validarCondiciones(mensaje) {
	res="";
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
	 if ($("#selEspecial").html()>2) {res+="No se puede solicitar mas de dos especiales \n";}
	 
	 if (($("#selEspecial").html()>0) && ($("#selCreditos").html()>$("#CMI").html())) {
		  res+="Si esta cursando una asignatura en especial debe llevar solo carga mínima "+$("#CMI").html()+" cr&eacute;ditos \n";}
	
	if (($("#selRepitiendo").html()==1) && ($("#selCreditos").html()>$("#C1R").html())) {
		res+="Si esta cursando una asignatura en repitición solo debe llevar "+$("#C1R").html()+" créditos \n";}

	if (($("#selRepitiendo").html()>1) && ($("#selCreditos").html()>$("#CM1").html())) {
		res+="Si esta cursando dos o mas asignaturas en repitición solo debe llevar "+$("#CM1").html()+" créitos \n";}
	
	
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
					cad=$("#elciclo").html().split("|")[0]+"|"+ //PDOCVE
					$("#c_"+i+"_13").html()+"|"+    //MATCVE
					$("#selAlumnos").val()+"|"+    //ALUCTR                  
					$("#c_"+i+"_2SIE").html()+"|"+ //GRUPO                    
					$("#c_"+i+"_0").html()+"|"+ //iddetalle
					$("#c_"+i+"_2").val()+"|"+ //profesor
					fechacap+"|"+ //fecha
					$("#elusuario").html()+"|"+ //usuario
					$("#c_"+i+"_1C").html(); //Tipo de cursamiento 
					losdatos[j]=cad;				
					j++;			
		}
	}

	var loscampos = ["PDOCVE","MATCVE","ALUCTR","GPOCVE","IDGRUPO","LISTC15","FECHAINS","USUARIO","LISTC14"];

	parametros={
		tabla:"dlista",
		campollave:"concat(PDOCVE,ALUCTR)",
		bd:"Mysql",
		valorllave:$("#elciclo").html().split("|")[0]+$("#selAlumnos").val(),
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
			
			if ($("#imprimirBoletaCheck").prop("checked")) {
				window.open("boletaMat.php?matricula="+$("#selAlumnos").val()+"&ciclo="+$("#elciclo").html().split("|")[0], '_blank');                                 	                                        					          
			}
			$("#tabHorariosReins").empty();
		}					     
	});    	         
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

	listaMat=Burbuja(listaMat);
	materiaant=listaMat[0];
	for (i=1; i<listaMat.length; i++){
		if (materiaant==listaMat[i]) {matRep+="La materia "+listaMat[i]+" Se encuentra repetida\n";}
		materiaant=listaMat[i];
	}
	
	return matRep;

}

function guardarTodos(){
	mostrarEspera("guardandoReins","grid_reinscripciones","Guardando...");
	res=validarCondiciones(false);
	cadMat=hayRepetidas();
	if (cadMat.length>0) {alert ("ERROR CRITICO:\n"+cadMat); ocultarEspera("guardandoReins"); return 0;}
	if (res.length>0) {
		if(confirm("Existen los siguientes Errores:\n "+res+"¿Desea Grabar de todas formas?")) {
			      guardarRegistros();       	 
				}
		else {ocultarEspera("guardandoReins");}
		}		
	else {
		guardarRegistros();   //en caso de que no haya errores
	}
}


function verKardex(){
	window.open("../avancecurri/kardex.php?matricula="+$("#selAlumnos").val(), '_blank'); 
}

function imprimeBoleta(){
	window.open("boletaMat.php?matricula="+$("#selAlumnos").val()+"&ciclo="+$("#elciclo").html().split("|")[0], '_blank'); 
}



