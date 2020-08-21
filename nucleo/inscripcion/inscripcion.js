var id_unico="";
var estaseriando=false;
var matser="";
var contFila=1;
var contFilaAlum=1;


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
		
		$("#losgrupos").append("<span class=\"label label-danger\">Grupos</span>");

		addSELECT("selCiclos","losciclos","PROPIO", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,'|',CICL_DESCRIP) FROM ciclosesc  ORDER BY CICL_CLAVE DESC", "","BUSQUEDA");  			      

		addSELECT("selGrupos","losgrupos","PROPIO", "SELECT SIE, SIE FROM vedgrupos a where a.CARRERA=0 "+
		"AND a.CICLO='0' AND a.SEMESTRE=1", "","");  			      

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
			    cargarAlumnos();
			    $("#selGrupos").empty();
			    $("#tabHorariosReins").empty();
			    actualizaSelect("selGrupos", "SELECT distinct(SIE), SIE FROM vedgrupos a where a.CARRERA='"+$("#selCarreras").val()+"' "+
				"AND a.CICLO='"+$("#selCiclos").val()+"' AND a.SEMESTRE=1","");
			}
			
		if (elemento=='selCiclos') {
			$("#elciclo").html($("#selCiclos option:selected").text());
		}

		if (elemento=='selGrupos') {
			cargarHorarios();
		}
        
    }


    function cargarHorarios(){
		mostrarEspera("esperahor","grid_inscripcion","Cargando Horarios...");		
		script="<table id=\"tabHorariosReins\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead>  "+
		   "             <tr>"+
		   "                <th><input type=\"checkbox\" id=\"chkTodos\" checked =\"true\" onclick=\"selTodos();\"/>Sel</th> "+	
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
		   cargaMateriasDer();	
	        	    	
}




function generaTablaHorarios(grid_data){
	
	colorSem=["success","warning","danger","info","purple","inverse","pink","yellow","grey","success"];

	valorcheck="checked =\"true\"";
	$("#cuerpoReins").empty();
	$("#tabHorariosReins").append("<tbody id=\"cuerpoReins\">");

	jQuery.each(grid_data, function(clave, valor) { 	 	
	
	
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
		
		$("#rowR"+contFila).append("<td>"+contFila+"</td>");		
		$("#rowR"+contFila).append("<td class=\"hidden\">"+ "<label id=\"c_"+contFila+"_0\" class=\"small text-info font-weight-bold\">"+valor.IDDETALLE+"</label</td>");
		
		$("#rowR"+contFila).append("<td><span class=\"text-purple\" id=\"c_"+contFila+"_13\">"+valor.MATERIA+"</span></td>");
		
	    $("#rowR"+contFila).append("<td><input  style=\"width:100%\" type=\"hidden\" value=\""+valor.MATERIA+"\" id=\"c_"+contFila+"_1\"></input>"+
								"<label  id=\"c_"+contFila+"_1B\" class=\"font-weight-bold small text-info\">"+valor.MATERIAD+"</label>"+
								"</td>");
		
		$("#rowR"+contFila).append("<td><span class=\"badge badge-"+colorSem[valor.SEMESTRE]+"\" id=\"c_"+contFila+"_20\">"+valor.SEMESTRE+"</span></td>");
		$("#rowR"+contFila).append("<td><span class=\"label label-success label-white middle\" id=\"c_"+contFila+"_2SIE\">"+valor.SIE+"</span></td>");

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
	ocultarEspera("esperahor")   	
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


function cargaMateriasDer(){
	sqlNI="SELECT  a.*, (select count(*) from dlista h where h.IDGRUPO=a.IDDETALLE) AS INS FROM vedgrupos a where a.CARRERA='"+$("#selCarreras").val()+"' "+
	       "AND a.CICLO='"+$("#selCiclos").val()+"' AND a.SEMESTRE=1 and SIE='"+$("#selGrupos").val()+"'";
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
}



/*=========================================LISTADO DE ASPIRANTES QUE CUMPLEN PARA INSCRIBIRSE========================*/
function cargarAlumnos(){		
	script="<table id=\"tabHorariosAlum\" class= \"table table-condensed table-bordered table-hover\" "+
			">"+
		  "        <thead>  "+
	   "             <tr>"+
	   "                <th><input type=\"checkbox\" checked =\"true\" id=\"chkTodosAlum\" onclick=\"selTodosAlum();\"/>Sel</th> "+	
	   "                <th>R</th> "+	
	   "                <th>Matricula</th> "+	   
	   "                <th>Nombre</th> "+	
	   "                <th>Paterno</th> "+	   
	   "                <th>Materno</th> "+	 
	   "                <th>Ciudad</th> "+ 
	   "                <th>Dirección</th> "+ 
	   "                <th>Carrera</th> "+	   	   	   
	   "                <th>Municipio</th> "+
	   "                <th>Estado</th> "+	   
	   "             </tr> "+
	   "            </thead>" +
	   "         </table>";
	   $("#losalumnos").empty();
	   $("#losalumnos").append(script);
	   sql="select a.MATRICULA, a.CURP, a.NOMBRE, APEPAT, APEMAT, a.CIUDADRES, a.CARRERA, a.CALLE,"+
	       "(SELECT COUNT(*) from dlista where ALUCTR=a.MATRICULA and PDOCVE='"+$("#selCiclos").val()+"') AS INS,"+
	       "a.MUNRESD,a.ESTRESD from vaspirantes a "+
		   " where a.CICLO='"+$("#selCiclos").val()+"' and a.CARRERA='"+$("#selCarreras").val()+"' AND a.MATRICULA<>''";
			parametros={sql:sql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(dataNI){ 			
					losdatosNI=JSON.parse(dataNI);	
					generaTablaAlumnos(losdatosNI,"NOINSCRITAS");
								  
				 },
				 error: function(data) {	                  
							alert('ERROR: '+data);
										  }
			 });	  
					
}


function generaTablaAlumnos(grid_data){
	
	colorSem=["success","warning","danger","info","purple","inverse","pink","yellow","grey","success"];
	valorcheck="checked =\"true\"";
	$("#cuerpoReinsAlum").empty();
	$("#tabHorariosAlum").append("<tbody id=\"cuerpoReinsAlum\">");

	jQuery.each(grid_data, function(clave, valor) { 	 	
	
	    $("#cuerpoReinsAlum").append("<tr id=\"rowRAlum"+contFilaAlum+"\">");
	   		
		$("#rowRAlum"+contFilaAlum).append("<td>"+
		                           "<div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
		                           "<label> "+
									  "<input id=\"cAlum_"+contFilaAlum+"_99\" matricula=\""+valor.MATRICULA+"\" type=\"checkbox\" "+
									  "class=\"selChAlum ace ace-switch ace-switch-6\""+valorcheck+" />"+
			                          "<span class=\"lbl\"></span>"+
	                                "</label> "+
                                    "</div> "+
		"</td>");
		
		cadIns="";
		if (valor.INS>0) cadIns="<i>"+valor.INS+"</i>";

		$("#rowRAlum"+contFilaAlum).append("<td>"+contFila+"</td>");		
		$("#rowRAlum"+contFilaAlum).append("<td <label id=\"cAlum_"+contFila+"_0\" class=\"small text-info font-weight-bold\">"+valor.MATRICULA+"</label</td>");		
		$("#rowRAlum"+contFilaAlum).append("<td style=\"font-size:10px;\"><span class=\"badge badge-primary\" id=\"INS_"+valor.MATRICULA+"\">"+cadIns+"</span>"+valor.NOMBRE+"</td>");
		$("#rowRAlum"+contFilaAlum).append("<td style=\"font-size:10px;\">"+valor.APEPAT+"</td>");
		$("#rowRAlum"+contFilaAlum).append("<td style=\"font-size:10px;\">"+valor.APEMAT+"</td>");
		
		$("#rowRAlum"+contFilaAlum).append("<td style=\"font-size:10px;\">"+valor.CIUDADRES+"</td>");
		$("#rowRAlum"+contFilaAlum).append("<td style=\"font-size:10px;\">"+valor.CALLE+"</td>");
		$("#rowRAlum"+contFilaAlum).append("<td style=\"font-size:10px;\">"+valor.CARRERA+"</td>");
		
		$("#rowRAlum"+contFilaAlum).append("<td style=\"font-size:10px;\">"+valor.MUNRESD+"</td>");
		$("#rowRAlum"+contFilaAlum).append("<td style=\"font-size:10px;\">"+valor.ESTRESD+"</td>");
					
		contFilaAlum++;      			
	});	
	ocultarEspera("esperahor");
	$("#numAlum").html(contFilaAlum-1);	
} 



function selTodosAlum() {
	if ($("#chkTodosAlum").prop("checked")) {
		$(".selChAlum").each(function(){		
			$(this).prop("checked",true);
		 });
	}
	else {
		$(".selChAlum").each(function(){		
			$(this).prop("checked",false);
		 });
	}
}



function guardarRegistros(matricula){
	j=0;
	var f = new Date();
	fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();
	var losdatos=[];
	for (i=1; i<contFila; i++){
		elgrupo=$("#c_"+i+"_0").html();
		cad="";
		if ($("#c_"+i+"_99").prop("checked")) {
					cad=$("#elciclo").html().split("|")[0]+"|"+ //PDOCVE
					$("#c_"+i+"_13").html()+"|"+    //MATCVE
					matricula+"|"+    //ALUCTR                  
					$("#c_"+i+"_2SIE").html()+"|"+ //GRUPO                    
					elgrupo+"|"+ //iddetalle
					$("#c_"+i+"_2").val()+"|"+ //profesor
					fechacap+"|"+ //fecha
					$("#elusuario").html()+"|N"; //usuario				
					losdatos[j]=cad;
								
					j++;			
		}
	}

	var loscampos = ["PDOCVE","MATCVE","ALUCTR","GPOCVE","IDGRUPO","LISTC15","FECHAINS","USUARIO","LISTC14"];

	parametros={
		tabla:"dlista",
		campollave:"concat(PDOCVE,ALUCTR)",
		bd:"Mysql",
		valorllave:$("#elciclo").html().split("|")[0]+matricula,
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
			$("#INS_"+matricula).html("<i class=\"fa fa-check-circle-o\"></i>");

			if (data.length>0) {alert ("Ocurrio un error: "+data);}	
			
			
			if ($("#imprimirBoletaCheck").prop("checked")) {
				window.open("boletaMat.php?carrera="+$("#selCarreras").val()+"&matricula="+matricula+"&ciclo="+$("#elciclo").html().split("|")[0], '_blank');                                 	                                        					          
			}
		
		}					     
	});    	         
}


function inscribir(){
	
//	if (($("#selCarreras").val()>0) && ($("#selGrupos").val()>0)) {
		mostrarEspera("guardandoReins","grid_reinscripciones","Guardando...");
		for (u=1; u<contFilaAlum; u++){
			cad="";		
			if ($("#cAlum_"+u+"_99").prop("checked")) {			
				guardarRegistros($("#cAlum_"+u+"_99").attr("matricula"));
			}
		}
		ocultarEspera("guardandoReins");
//	}
//	else {
//		alert ("Debe elegir una carrera y un Grupo")
//	}
	
}


/*=============================================================================*/
function eliminaReins(matricula){
	parametros={
		tabla:"dlista",
		campollave:"concat(PDOCVE,ALUCTR)",
		bd:"Mysql",
		valorllave:$("#elciclo").html().split("|")[0]+matricula
	};
	$.ajax({
		type: "POST",
		url:"../base/eliminar.php",
		data: parametros,
		success: function(data){
			$("#INS_"+matricula).html("");
			console.log(data+" "+$("#elciclo").html().split("|")[0]+matricula);
		}					     
	});    	         
}


function eliminar(){
	if (confirm("¿Seguro desea eliminar la reinscripción para el ciclo "+$("#elciclo").html().split("|")[0]+
	" de los alumnos seleccionados")) {
	
		mostrarEspera("guardandoReins","grid_reinscripciones","Guardando...");
		for (u=1; u<contFilaAlum; u++){
			cad="";		
			if ($("#cAlum_"+u+"_99").prop("checked")) {			
				eliminaReins($("#cAlum_"+u+"_99").attr("matricula"));
			}
		}
		ocultarEspera("guardandoReins");
	}
}

function imprimeBoleta(){
	mostrarEspera("guardandoReins","grid_reinscripciones","Guardando...");
		for (u=1; u<contFilaAlum; u++){
			cad="";		
			if ($("#cAlum_"+u+"_99").prop("checked")) {			
				window.open("boletaMat.php?carrera="+$("#selCarreras").val()+"&matricula="+
				            $("#cAlum_"+u+"_99").attr("matricula")+"&ciclo="+$("#elciclo").html().split("|")[0], '_blank');                                 	                                        					          
			}
		}
		ocultarEspera("guardandoReins");
}