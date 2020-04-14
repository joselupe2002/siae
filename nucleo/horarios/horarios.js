var id_unico="";
var estaseriando=false;
var matser="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#info").css("display","none");
		$("#losciclos").append("<span class=\"label label-info\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclos","CICLOS", "", "","NORMAL");
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
		
		$("#losplanes").append("<span class=\"label label-danger\">Plan de estudios</span>");
		addSELECT("selPlanes","losplanes","PROPIO", "SELECT MAPA_CLAVE,MAPA_DESCRIP FROM mapas where MAPA_CLAVE='0'", "","");  			      

		addSELECT_ST("aulas","grid_horarios","PROPIO", "select AULA_CLAVE, AULA_DESCRIP from eaula where "+
		                                           "AULA_ACTIVO='S' order by AULA_DESCRIP", "","","visibility:hidden;");  			      
		
		addSELECT_ST("losprofes","grid_horarios","PROPIO","SELECT EMPL_NUMERO, CONCAT(IFNULL(EMPL_APEPAT,''),' ',"+
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
			actualizaSelect("selPlanes","select MAPA_CLAVE, MAPA_DESCRIP from mapas l where "+
		                    "l.MAPA_CARRERA='"+$("#selCarreras").val()+"' AND l.MAPA_ACTIVO='S'");
			}
		if ((elemento=='selCiclos')||(elemento=='selCarreras')) {	
			$("#loshorarios").empty();	
		}
		if (elemento=='selCiclos') {	
			$("#selPlanes").empty();
			$("#selCarreras option[value=0]").attr("selected","true");	
		}
		if (elemento=='selPlanes') {
			cargarHorarios();		
		}
        
    }


    function cargarHorarios(){
		
		script="<table id=\"tabHorarios\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead>  "+
		   "             <tr>"+
		   "                <th>El</th> "+
		   "                <th>Gu</th> "+	
		   "                <th>R</th> "+
		   "                <th>ID</th> "+
		   "                <th>SEM</th> "+
		   "                <th>Asignatura</th> "+
		   "                <th>Profesor</th> "+
		   "                <th>Grupo</th> "+
		   "                <th>Cupo</th> "+			   
		   "                <th>HT</th> "+
		   "                <th>HP</th> "+
		   "                <th style=\"text-align:center\">Lunes</th> "+
		   "                <th style=\"text-align:center\">Martes</th> "+
		   "                <th style=\"text-align:center\">Miercoles</th> "+
		   "                <th style=\"text-align:center\">Jueves</th> "+
		   "                <th style=\"text-align:center\">Viernes</th> "+
		   "                <th style=\"text-align:center\">Sabado</th> "+
		   "                <th style=\"text-align:center\">Domingo</th> "+	  
		   
		   "             </tr> "+
		   "            </thead>" +
		   "         </table>";
		   $("#loshorarios").empty();
		   $("#loshorarios").append(script);
				
		elsql="SELECT DGRU_ID AS id, DGRU_MATERIA AS materia, MATE_DESCRIP AS materiad, DGRU_PROFESOR AS profesor, "+
		       "CICL_HT AS ht, CICL_HP as hp, LUNES AS lunes, MARTES AS martes, MIERCOLES as miercoles,"+
		       " JUEVES as jueves, VIERNES as viernes, SABADO as sabado, DOMINGO as domingo,   "+
		       " A_LUNES AS a_lunes, A_MARTES AS a_martes, A_MIERCOLES AS a_miercoles, A_JUEVES AS a_jueves, "+
		       " A_VIERNES AS a_viernes, A_SABADO AS a_sabado, A_DOMINGO AS a_domingo, CUPO as cupo,SIE,CICL_CUATRIMESTRE AS SEM"+
			   " FROM edgrupos, cmaterias, eciclmate WHERE DGRU_CARRERA='"+$("#selCarreras").val()+"'"+
			   " AND DGRU_CICLO='"+$("#selCiclos").val()+"' and MATE_CLAVE=DGRU_MATERIA and MATE_CLAVE=CICL_MATERIA "+
			   " AND CICL_MAPA=DGRU_MAPA AND DGRU_MAPA='"+$("#selPlanes").val()+"' order by CICL_CUATRIMESTRE, MATE_DESCRIP";
		mostrarEspera("esperahor","grid_horarios","Cargando Horarios...");
	    $.ajax({
	           type: "GET",
			   url:  "../base/getdatossql.php?bd=Mysql&sql="+elsql,
	           success: function(data){  
				      
					  generaTablaHorarios(JSON.parse(data));   
					  ocultarEspera("esperahor");     	      					  					  
	            },
	        	error: function(data) {	                  
	        	   	    alert('ERROR: '+data);
	        	   	                  }
	    });	        	   	   	        	    	 
		
}


var globlal;
var parte0="<div style=\"width:150px; padding-left:10px;padding-right:10px;padding-top:0; padding-bottom:0;\"><div class=\"row\">" +
		   "     <div class=\"col-md-5\" style=\"padding: 0;\"><select style=\"width:100%; font-size:11px;  font-weight:bold; color:#0E536C;\"";
var parte1="</div><div class=\"col-md-7\" style=\"padding: 0;\">" +
		   " <input  autocomplete=\"off\" class= \" small form-control input-mask-horario\" style=\"width:100%;  " +
		                    " font-size:11px;  font-weight:bold; color:#03661E; height: 30px;\" type=\"text\"";
var parte2="</input></div></div></td>";

/*=====================================AGREGAR ASIGNATURA VENTANA================================*/
function agregarAsignatura(){
    if (!($('#selPlanes').val()=="0")) {
	    dameVentana("venasig","grid_horarios","Agregar Asignatura","lg","bg-danger","fa blue bigger-160 fa-stack-overflow","300");
	    $("#body_venasig").append("<div class=\"row\">"+
							"           <div class=\"col-sm-1\"></div>"+
							"           <div id=\"contasig\" class=\"col-sm-10\"><span class=\"label label-success\">Asignatura</span></div>"+
							"           <div class=\"col-sm-1\"></div>"+
							"       </div><br/>"+
							"       <div class=\"row\">"+
							"          <div class=\"col-sm-1\"></div>"+
							"          <div class=\"col-sm-10\" style=\"text-align:center;\">"+
							"             <button title= \"Agregar Asignaturas\" onclick=\"agregarasignaturasola();\" class= \"btn btn-white btn-success btn-round\"> "+
							"	              <i class=\"ace-icon green fa fa-book bigger-160\"></i><span class=\"btn-small\">Agregar Asignatura</span>   "+        
							"              </button>"+
							"          </div>"+
							"          <div class=\"col-sm-1\"></div>"+
							"       </div><br/><br/>"+				
							"       <div class=\"row\">"+
							"           <div class=\"col-sm-1\"></div>"+
							"           <div id=\"contsem\" class=\"col-sm-10\"><span class=\"label label-danger\">Semestre</span></div>"+
							"           <div class=\"col-sm-1\"></div>"+
							"       </div><br/>"+
							"       <div class=\"row\">"+
							"          <div class=\"col-sm-1\"></div>"+
							"          <div class=\"col-sm-10\" style=\"text-align:center;\">"+
							"             <button title= \"Agregar Asignaturas del Semestre\" onclick=\"agregarasignaturasemestre();\" class= \"btn btn-white btn-danger btn-round\"> "+
							"	              <i class=\"ace-icon red fa fa-plus bigger-160\"></i><span class=\"btn-small\">Agregar Semestre</span>   "+        
							"              </button>"+
							"          </div>"+
							"          <div class=\"col-sm-1\"></div>"+
							"       </div>"							
							);
		addSELECT("selAsignaturas","contasig","PROPIO", "SELECT CICL_MATERIA, CONCAT (CICL_CUATRIMESTRE,' | ',"+
		                                                "CICL_MATERIA,' | ',CICL_MATERIAD,' | ',CICL_HT,' | ',CICL_HP) FROM veciclmate i where "+
                                                        "CICL_MAPA='"+$("#selPlanes").val()+"' order by CICL_MATERIAD", "","BUSQUEDA");
		var lossemestres = [{id: "1",opcion: "1"},{id: "2",opcion: "2"}, {id: "3",opcion: "3"}, {id: "4",opcion: "4"},
        	{id: "5",opcion: "5"},{id: "6",opcion: "6"}, {id: "7",opcion: "7"}, {id: "8",opcion: "8"},  
        	{id: "9",opcion: "9"},{id: "10",opcion: "10"}];
        addSELECTJSON("selSem","contsem",lossemestres);
	}	
    else {
		alert ("Debe elegir el Plan de Estudio");
	}					
}

function agregarasignaturasola() {
   if (!($("#selAsignaturas").val()=='0')){
	   elsem=$("#selAsignaturas option:selected").text().split("|")[0].trim();
	   lamateriad=$("#selAsignaturas option:selected").text().split("|")[2].trim();
	   ht=$("#selAsignaturas option:selected").text().split("|")[3].trim();
	   hp=$("#selAsignaturas option:selected").text().split("|")[4].trim();
	   lamateria=$("#selAsignaturas").val();
	   agregarAsignaturaGrid(lamateria,lamateriad,elsem,ht,hp);
	   $('#venasig').modal("hide");
	   cargarHorarios();
   }
   else { alert ("No ha elegido una asignatura");}
}

function agregarasignaturasemestre() {
	if (!($("#selSem").val()=='0')){
		elsql="  SELECT CICL_MATERIA, CICL_HT, CICL_HP,CICL_CUATRIMESTRE FROM eciclmate i where "+ 
              "  CICL_MAPA='"+$("#selPlanes").val()+"' AND CICL_CUATRIMESTRE='"+$("#selSem").val()+"' order by CICL_MATERIA";
		mostrarEspera("esperainssem","grid_horarios","Insertando Horarios...");
			  $.ajax({
	           type: "GET",
			   url:  "../base/getdatossql.php?bd=Mysql&sql="+elsql,
	           success: function(data){  
				   jQuery.each(JSON.parse(data), function(clave, valor) { 
					   
				       agregarAsignaturaGrid(valor.CICL_MATERIA,valor.CICL_MATERIA,valor.CICL_CUATRIMESTRE,valor.CICL_HT,valor.CICL_HP);
				   });  
				   $('#venasig').modal("hide");
				   ocultarEspera("esperainssem");	      					  					  
				   cargarHorarios();
	            },
	        	error: function(data) {	                  
	        	   	    alert('ERROR: '+data);
	        	   	                  }
	    });	        	   	
    }   
    else { alert ("No ha elegido una asignatura");}
}


function agregarAsignaturaGrid(lamateria,materiad,semestre, ht, hp){	
	parametros={tabla:"edgrupos",
			    bd:"Mysql",
			    _INSTITUCION:"ITSM",
			    _CAMPUS:"0",
			    DGRU_MATERIA:lamateria,
			    DGRU_HT:ht,
			    DGRU_HP:hp, 
				DGRU_PERIODO:semestre,
				DGRU_CICLO: $("#selCiclos").val(),
				DGRU_CARRERA:$("#selCarreras").val(),
				DGRU_MAPA:$("#selPlanes").val(),
			    SIE:""};
			    $.ajax({
			 		  type: "POST",
			 		  url:"../base/inserta.php",
			 	      data: parametros,
			 	      success: function(data){ 
						if (data.substring(0,2)=='0:') { 
					         alert ("Ocurrio un error: "+data); console.log(data);
					    	 }
					   
						}
					});
}


function generaTablaHorarios(grid_data){
	c=1; global=1;
	$("#cuerpo").empty();
	$("#tabHorarios").append("<tbody id=\"cuerpo\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 	        			
	    $("#cuerpo").append("<tr id=\"row"+c+"\">");
	    $("#row"+c).append("<td><button onclick=\"eliminarFila('row"+c+"','"+valor.id+"','"+c+"');\" class=\"btn btn-xs btn-danger\"> " +
			                     "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
								 "</button></td>");
		$("#row"+c).append("<td><button id=\"guardar_"+c+"\" onclick=\"guardarFila('row"+c+"','"+valor.id+"','"+c+"');\" class=\"btn btn-xs btn-success\"> " +
			                     "    <i class=\"ace-icon fa fa-save bigger-120\"></i>" +
			                     "</button></td>");
		$("#row"+c).append("<td>"+c+"</td>");		
		$("#row"+c).append("<td>"+ "<label id=\"c_"+c+"_0\" class=\"small text-info font-weight-bold\">"+valor.id+"</label</td>");
		$("#row"+c).append("<td>"+valor.SEM+"</td>");
	    $("#row"+c).append("<td><input  style=\"width:100%\" type=\"hidden\" value=\""+valor.materia+"\" id=\"c_"+c+"_1\"></input>"+
	        					                     "<label  id=\"c_"+c+"_1B\" class=\"font-weight-bold small text-info\">"+valor.materiad+"</label></td>");
	    $("#row"+c).append("<td><select chosen-select form-control\" id=\"c_"+c+"_2\" style=\"width:200px;\"></select></td>");
	    $("#row"+c).append("<td><input style=\"width:50px;\" id=\"c_"+c+"_2SIE\" value=\""+valor.SIE+"\"></td>");
		$("#row"+c).append("<td><input style=\"width:100%\" type=\"text\" class=\"input-mask-numero\" value=\""+valor.cupo+"\" id=\"c_"+c+"_10\"></input></td>");
		$("#row"+c).append("<td>"+valor.ht+"</td>");
		$("#row"+c).append("<td>"+valor.hp+"</td>");
		
	    $("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_3B\" ondblclick=\"horarioAulas('"+c+"','3B','LUNES','AULA');\"></select>"+parte1+" id=\"c_"+c+"_3\" value=\""+valor.lunes+"\" ondblclick=\"horarioAulas('"+c+"','3B','LUNES','PROFESOR');\">"+parte2);
	    $("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_4B\" ondblclick=\"horarioAulas('"+c+"','4B','MARTES','AULA');\"></select>"+parte1+" id=\"c_"+c+"_4\" value=\""+valor.martes+"\" ondblclick=\"horarioAulas('"+c+"','4B','MARTES','PROFESOR');\">"+parte2);
	    $("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_5B\" ondblclick=\"horarioAulas('"+c+"','5B','MIERCOLES','AULA');\"></select>"+parte1+" id=\"c_"+c+"_5\" value=\""+valor.miercoles+"\" ondblclick=\"horarioAulas('"+c+"','5B','MIERCOLES','PROFESOR');\">"+parte2);
	    $("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_6B\" ondblclick=\"horarioAulas('"+c+"','6B','JUEVES','AULA');\"></select>"+parte1+" id=\"c_"+c+"_6\" value=\""+valor.jueves+"\" ondblclick=\"horarioAulas('"+c+"','6B','JUEVES','PROFESOR');\">"+parte2);
		$("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_7B\" ondblclick=\"horarioAulas('"+c+"','7B','VIERNES','AULA');\"></select>"+parte1+" id=\"c_"+c+"_8\" value=\""+valor.viernes+"\" ondblclick=\"horarioAulas('"+c+"','7B','VIERNES','PROFESOR');\">"+parte2);
	    $("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_8B\" ondblclick=\"horarioAulas('"+c+"','8B','SABADO','AULA');\"></select>"+parte1+" id=\"c_"+c+"_8\" value=\""+valor.sabado+"\" ondblclick=\"horarioAulas('"+c+"','8B','SABADO','PROFESOR');\">"+parte2);
	    $("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_9B\" ondblclick=\"horarioAulas('"+c+"','9B','DOMINGO','AULA');\"></select>"+parte1+" id=\"c_"+c+"_9\" value=\""+valor.domingo+"\" ondblclick=\"horarioAulas('"+c+"','9B','DOMINGO','PROFESOR');\">"+parte2);
		
		//AGREGAMOS LA CLASE EDIT A TODOS LOS ELEMENTOS 
		$("#c_"+c+"_2").addClass("edit");
		$("#c_"+c+"_2SIE").addClass("edit");
		for (i=3;i<=10;i++){
			$("#c_"+c+"_"+i).addClass("edit");
			$("#c_"+c+"_"+i+"B").addClass("edit");
		}
	        			
	    $("#c_"+c+"_2").html($("#losprofes").html()); 
		$("#c_"+c+"_2").val(valor.profesor);
		$(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
		$(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
		$("#c_"+c+"_2").trigger("chosen:updated");
						 
	    $("#c_"+c+"_3B").html($("#aulas").html()); 
	    $("#c_"+c+"_3B").val(valor.a_lunes); 
	    $("#c_"+c+"_4B").html($("#aulas").html()); 
	    $("#c_"+c+"_4B").val(valor.a_martes); 
	    $("#c_"+c+"_5B").html($("#aulas").html()); 
	    $("#c_"+c+"_5B").val(valor.a_miercoles); 
	    $("#c_"+c+"_6B").html($("#aulas").html()); 
	    $("#c_"+c+"_6B").val(valor.a_jueves); 
	    $("#c_"+c+"_7B").html($("#aulas").html()); 
	    $("#c_"+c+"_7B").val(valor.a_viernes); 
	    $("#c_"+c+"_8B").html($("#aulas").html()); 
	    $("#c_"+c+"_8B").val(valor.a_sabado); 
	    $("#c_"+c+"_9B").html($("#aulas").html()); 
	    $("#c_"+c+"_9B").val(valor.a_domingo); 
	    c++;
	    global=c;        			
	});	
	if (c>1) { $("#btnfiltrar").removeAttr('disabled');}		   
	
} 

function horarioAulas (linea,id,dia,tipo,elaula){
   
   if (tipo=="AULA") {
   sql="SELECT PROFESORD AS PROF,MATERIAD AS MATERIA,SIE AS GRUPO,"+dia+"_A AS AULA,"+dia+"_1 AS HORARIO"+
	   " FROM vedgrupos b where b.CICLO='"+$("#selCiclos").val()+"' and "+dia+"_A='"+$("#c_"+linea+"_"+id).val()+"' ORDER BY "+dia;
	   descrip=$("#c_"+linea+"_"+id).val();
	}
   if (tipo=="PROFESOR") {
		sql="SELECT PROFESORD AS PROF,MATERIAD AS MATERIA,SIE AS GRUPO,"+dia+"_A AS AULA,"+dia+"_1 AS HORARIO"+
			" FROM vedgrupos b where b.CICLO='"+$("#selCiclos").val()+"' and PROFESOR='"+$("#c_"+linea+"_2").val()+"' ORDER BY "+dia;
		descrip=$("#c_"+linea+"_2 option:selected").text();
		}
    if (tipo=="AULAVACIA") {
			sql="SELECT PROFESORD AS PROF,MATERIAD AS MATERIA,SIE AS GRUPO,"+dia+"_A AS AULA,"+dia+"_1 AS HORARIO"+
			" FROM vedgrupos b where b.CICLO='"+$("#selCiclosEsp").val()+"' and "+dia+"_A='"+elaula+"' ORDER BY "+dia;
			descrip=elaula;
		}
	
   dameVentana("ventaulas", "grid_horarios","HORARIO DE "+tipo+":<span class=\"text-info small\">"+descrip+"</span> DIA: <span class=\"text-danger small\">"+dia+"</span>","lg","bg-successs","fa fa-cog","370");
 		
 
   titulos=[{titulo:"PROF",estilo:""},{titulo:"MATERIA",estilo:""},
			{titulo:"GRUPO",estilo:""},{titulo:"AULA",estilo:""},
			{titulo:"HORARIO",estilo:""}];

   var campos = [{campo: "PROF",estilo:"",antes:"<span clasS=\"text-success\">",despues:"</span>"}, 
   {campo: "MATERIA",estilo: "",antes:"",despues:""},
   {campo: "GRUPO",estilo: "",antes:"<span class=\"badge badge-success\">",despues:"</span>"},
   {campo: "AULA",estilo: "",antes:"",despues:""},
   {campo: "HORARIO",estilo: "font-size:14px;",antes:"<span clasS=\"text-danger\"><strong>", despues:"</span></strong>"}];

   $("#body_ventaulas").append("<table id=tabaulas class=\"display table-condensed table-striped table-sm table-bordered "+
                               "table-hover nowrap\" style=\"overflow-y: auto;\"></table>");
   generaTablaDin("tabaulas",sql,titulos,campos);
}


/*=========================================FILTRADO DE HORARIOS ============================================*/
function filtrarHorarios() {
	dameVentana("ventFiltros", "grid_horarios","Filtrar Horarios","sm","bg-successs","fa blue fa-filter bigger-160","370");
    $("#body_ventFiltros").append("<div class=\"row\">"+
								   "    <div class=\"col-sm-12\" id=\"losCampos\"><span class=\"label label-success\">Ciclo Escolar</span></div>"+
								   "</div><br/>"+
								   "<div class=\"row\">"+
								   "    <div class=\"col-sm-12\">"+
								   "          <span class=\"label label-info\">Valor del Filtro</span>"+
								   "          <input id=\"filtro\" class=\"small form-control\" />"+
								   "    </div>"+
								   "</div><br/>"+
								   "<div class=\"row\">"+
								   "    <div class=\"col-sm-12\" style=\"text-align:center;\">"+
								   "         <button title=\"Filtrar datos por el campo seleccionado\" onclick=\"hacerFiltro();\" "+
								   "                 class=\"btn btn-white btn-success btn-round\"> "+
								   "                 <i class=\"ace-icon blue fa fa-search bigger-80\"></i><span class=\"btn-small\">Filtrar Horarios</span>"+            
								   "         </button>"+
								   "    </div>"+
								   "</div>"								   
								   );
	var loscamposbus = [{id: "SIE",opcion: "GRUPO"},{id: "DGRU_PROFESOR",opcion: "NO. DE PROFESOR"}, 
	                    {id: "CICL_CUATRIMESTRE",opcion: "NO. SEMESTRE"}, 
						{id: "DGRU_MATERIA",opcion: "CLAVE DE MATERIA"}];
	addSELECTJSON("selCampos","losCampos",loscamposbus);
	
}	

function hacerFiltro(){
	elsqlfil="SELECT DGRU_ID AS id, DGRU_MATERIA AS materia, MATE_DESCRIP AS materiad, DGRU_PROFESOR AS profesor, "+
	       "CICL_HT AS ht, CICL_HP as hp, LUNES AS lunes, MARTES AS martes, MIERCOLES as miercoles,"+
	      " JUEVES as jueves, VIERNES as viernes, SABADO as sabado, DOMINGO as domingo,   "+
	      " A_LUNES AS a_lunes, A_MARTES AS a_martes, A_MIERCOLES AS a_miercoles, A_JUEVES AS a_jueves, "+
	      " A_VIERNES AS a_viernes, A_SABADO AS a_sabado, A_DOMINGO AS a_domingo, CUPO as cupo,SIE,CICL_CUATRIMESTRE AS SEM"+
	      " FROM edgrupos, cmaterias, eciclmate WHERE DGRU_CARRERA='"+$("#selCarreras").val()+"'"+
	      " AND DGRU_CICLO='"+$("#selCiclos").val()+"' and MATE_CLAVE=DGRU_MATERIA and MATE_CLAVE=CICL_MATERIA "+
		  " AND CICL_MAPA=DGRU_MAPA AND DGRU_MAPA='"+$("#selPlanes").val()+"'"+
		  " and "+$("#selCampos").val()+" like '%"+$("#filtro").val()+"%'"+ 
		  " order by CICL_CUATRIMESTRE, MATE_DESCRIP";
		  $.ajax({
			type: "GET",
			url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsqlfil),
			success: function(data){  				   
				   $('#ventFiltros').modal("hide");
				   mostrarEspera("esperahor","grid_horarios","Cargando Horarios...");
				   generaTablaHorarios(JSON.parse(data));   
				   ocultarEspera("esperahor");     	      
				  					 
			 },
			 error: function(data) {	                  
						alert('ERROR: '+data);
									  }
	 });	    
}

/*================================================BUSCAR ESPACIOS EN AULAS ===========================================*/
function buscarEspacios() {
	dameVentana("ventespacios", "grid_horarios","Espacios en Aulas","lg","bg-successs","fa blue fa-trello bigger-160","370");
    $("#body_ventespacios").append("<div class=\"row\">"+
								   "    <div class=\"col-sm-3\" id=\"losCiclosEsp\"><span class=\"label label-success\">Ciclo Escolar</span></div>"+
								   "    <div class=\"col-sm-3\" id=\"losDiasEsp\"><span class=\"label label-warning\">Días de la Semana</span></div>"+
								   "    <div class=\"col-sm-3\">"+
								   "          <span class=\"label label-info\">Horario a buscar</span>"+
								   "          <input id=\"horarioEsp\" class=\"small form-control input-mask-horario\" />"+
								   "    </div>"+
								   "    <div class=\"col-sm-3\" style=\"padding-top:15px;\">"+
								   "         <button title=\"Buscar Espacios en aulas\" onclick=\"getEspaciosAulas();\" "+
								   "                 class=\"btn btn-white btn-warning btn-round\"> "+
								   "                 <i class=\"ace-icon blue fa fa-search bigger-80\"></i><span class=\"btn-small\">Buscar</span>"+            
								   "         </button>"+
								   "    </div>"+
								   "</div>"+
								   "<div class=\"row\">"+
								   "    <div class=\"col-sm-12\" id=\"aulasvacias\"></div>"+
								   "</div>"
								   );
	addSELECT("selCiclosEsp","losCiclosEsp","CICLOS", "", "","NORMAL");
	var lossemestres = [{id: "LUNES",opcion: "LUNES"},{id: "MARTES",opcion: "MARTES"}, {id: "MIERCOLES",opcion: "MIERCOLES"}, 
						{id: "JUEVES",opcion: "JUEVES"},{id: "VIERNES",opcion: "VIERNES"},{id: "SABADO",opcion: "SABADO"}, 
						{id: "DOMINGO",opcion: "DOMINGO"}];
	addSELECTJSON("selDiaEsp","losDiasEsp",lossemestres);
	
}	


function getEspaciosAulas(){
    
	if (($("#selDiaEsp").val()!=0) && ($("#selCiclosEsp").val()!=0) && ($("#horarioEsp").val().length>0))  {
		    var eldia=[];
			res=true;
			j=0;
			cadFin="";
			elsql="SELECT "+$("#selDiaEsp").val()+"_A, "+$("#selDiaEsp").val()+"_1 from vedgrupos b where b.CICLO='"+$("#selCiclosEsp").val()+"' "+
				"and "+$("#selDiaEsp").val()+"_A<>'' order by "+$("#selDiaEsp").val()+"_A,"+$("#selDiaEsp").val()+"_1";
			$.ajax({
				type: "GET",
				url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
				success: function(data){  

					losdatos=JSON.parse(data);
					aula=losdatos[0][0];
				    jQuery.each(losdatos, function(clave, valor) { 					
						if (!(aula==losdatos[clave][0])) {							
							res=getEspacio(eldia,$("#horarioEsp").val());
							if (res.length>0) {cadFin+=res+"|";}                            
							eldia.length=0;
							j=0;
							aula=losdatos[clave][0];
						   }
						   horariodec=decodificaHora(losdatos[clave][1]);
						   eldia[j]=horariodec[4]+"|"+horariodec[5]+"|"+losdatos[clave][0]+"|";		
						   j++;													
					});
					
					var visres=[];
					visres=cadFin.split("|");
					$("#aulasvacias").empty();
					for (i=0; i<visres.length; i++){
					$("#aulasvacias").append("<span class=\"label label-success label-white middle\" "+
													"onclick=\"horarioAulas('0','0','"+$("#selDiaEsp").val()+"','AULAVACIA','"+visres[i]+"');\" "+
													" style=\"cursor:pointer\">"+visres[i]+"</span>  ");
					}
				},
				error: function(data) {	                  
							alert('ERROR: '+data);
							res=false;
							return false;
										}
			});	     
			return res;
		}
	else {alert ("No ha llenado los campos necesarios");}
}
							

function eliminarFila(nombre,id,fila) {
	var r = confirm("Seguro que desea eliminar del horario esta asignatura");
	if (r == true) {
	    var parametros = {
			               "tabla" : "edgrupos",
						    "campollave" : "DGRU_ID",
							"valorllave" : id,
							"bd":"Mysql",
						  };
						   
		 $.ajax({ data:  parametros,
				  url:   '../base/eliminar.php',
				  type:  'post',          
				  success:  function (response) {
							$("#"+nombre).remove();													
				   }		
				}); 		    
        }
}


function validarFormatoHorarios(){
	error=false;
	$(".input-mask-horario").each(function(){
		   hor=$(this).val();
		   if (hor==":-:") {$(this).val(""); hor="";}
		   if (hor!=="") {			   
			   tam=hor.length;
			   var horario=[];  
			   horario=decodificaHora(hor); //datos[hora1,min1,hora2,min2,minutot1,minutot2];
 
			   if ((!((parseInt(horario[0])>=1) && (parseInt(horario[0])<=23))) || (!((parseInt(horario[2])>=1) && (parseInt(horario[2])<=23)))) {
				   $(this).css("border-color","red");
				   error=true;
					}
			   if ((!((parseInt(horario[1])>=0) && (parseInt(horario[1])<=59))) || (!((parseInt(horario[3])>=0) && (parseInt(horario[3])<=59)))) {
				   $(this).css("border-color","red");
				   error=true;
					}			   
			   if (horario[4]>=horario[5]) {$(this).css("border-color","red"); error=true;}			   
			   $(this).val(pad(horario[0],2)+":"+pad(horario[1],2)+"-"+pad(horario[2],2)+":"+pad(horario[3],2));
		   }	
	});
	return error;  
}


function validarDatos(fila,id){
	var todobien=true;
	if ($("#c_"+fila+"_2SIE").val().length<=0) {
		 alert ("Debe capturar la letra del grupo"); 
		 $("#c_"+fila+"_2SIE").css("border-color","red"); 
		 todobien=false;
		 return false; }
	if (($("#c_"+fila+"_2").val()=="0") || ($("#c_"+fila+"_2").val()==null)) {
	    alert ("Debe capturar el nombre del profesor"); 
		$("#c_"+fila+"_2").css("border-color","red"); 
		todobien=false;
		return false; }
	if (!validarFormatoHorarios) {
		alert ("Existen horarios que no tienen el formato HH:MM-HH:MM");
		todobien=false;
		return false;
	}
	cruces=obtenerHorarios(id,$("#selCiclos").val(),fila);
	
    return todobien;
}

function guardarFila(nombre,id,fila){
     if (validarDatos(fila,id)) {
			parametros={
					tabla:"edgrupos",
					campollave:"DGRU_ID",
					valorllave:id,
					bd:"Mysql",			
					DGRU_MATERIA:$("#c_"+fila+"_1").val(),
					DGRU_PROFESOR:$("#c_"+fila+"_2").val(),			 
					LUNES:$("#c_"+fila+"_3").val(),
					MARTES:$("#c_"+fila+"_4").val(),
					MIERCOLES:$("#c_"+fila+"_5").val(),
					JUEVES:$("#c_"+fila+"_6").val(),
					VIERNES:$("#c_"+fila+"_7").val(),
					SABADO:$("#c_"+fila+"_8").val(),
					DOMINGO:$("#c_"+fila+"_9").val(),
					A_LUNES:$("#c_"+fila+"_3B").val(),
					A_MARTES:$("#c_"+fila+"_4B").val(),
					A_MIERCOLES:$("#c_"+fila+"_5B").val(),
					A_JUEVES:$("#c_"+fila+"_6B").val(),
					A_VIERNES:$("#c_"+fila+"_7B").val(),
					A_SABADO:$("#c_"+fila+"_8B").val(),
					A_DOMINGO:$("#c_"+fila+"_9B").val(),
					CUPO:$("#c_"+fila+"_10B").val(),
					SIE:$("#c_"+fila+"_2SIE").val()
					};

			$.ajax({
				type: "POST",
				url:"../base/actualiza.php",
				data: parametros,
				success: function(data){		                                	                      
					if (!(data.substring(0,1)=="0"))	
							{$("#guardar_"+fila).removeClass("btn-warning");
							$("#guardar_"+fila).addClass("btn-success");					  
							}	
					else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
				}					     
			});      
		}
}
