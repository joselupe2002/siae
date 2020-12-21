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
		
		$("#losmapas").append("<span class=\"label label-danger\">Mapa Curricular</span>");
		addSELECT("selMapas","losmapas","PROPIO", "SELECT MAPA_CLAVE, CONCAT(MAPA_CLAVE,' ',MAPA_DESCRIP) FROM mapas where MAPA_CARRERA=0 order by MAPA_CLAVE DESC", "","");  			      
	

		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo de Ingreso</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by cicl_clave desc", "","");  			      
	
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selCarreras') {	
			$("#tabInformacion").empty();	
			actualizaSelect("selMapas","SELECT MAPA_CLAVE, CONCAT(MAPA_CLAVE,' ',MAPA_DESCRIP) FROM mapas "+
			                " where MAPA_CARRERA='"+$("#selCarreras").val()+"' order by MAPA_CLAVE DESC", "","");  			      
		}  
		if (elemento=='selMapas') {	
			$("#tabInformacion").empty();	
		}  

		
    }


    function cargarInformacion(todos){
		
      $("#opcionestabInformacion").addClass("hide");
      $("#botonestabInformacion").empty();
	
		script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headMaterias\">"+
		   "                <th>No.</th> "+
		   "                <th>Matricula</th> "+
		   "                <th>Nombre</th> "+	
		   "                <th>Plan</th> "+	
		   "                <th><div class=\"row\"><div id=\"laespecialidad\" class=\"col-sm-10\"><select style=\"width:100%\" id=\"selEspecialidad\"></select></div>"+
		   "                    <div id=\"elbtn\" class=\"col-sm-1\"></div><div class=\"col-sm-1\"></div></div>"+
		   "                </th> "+
		   //"                <th>Avance</th> "+
		   "              </tr>"+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);

			actualizaSelect("selEspecialidad","SELECT 	ID,DESCRIP FROM especialidad  where MAPA='"+
					 $("#selMapas").val()+"' order by ID DESC", "","");  	
		
		   
		   $("#elbtn").append("<button title=\"Agregar Especialidad a todos los registros\" onclick=\"agregarTodas();\" "+
										" class=\"btn btn-white btn-success btn-round\"> "+
										" <i class=\"ace-icon blue fa fa-arrow-down bigger-120\"></i><span class=\"btn-small\"></span> "+           
										"</button>");
		
			$("#selEspecialidad").append("<option value='0'>SIN ESPECIALIDAD</option>");
		   
		sinesp=" and ((IFNULL(ALUM_ESPECIALIDAD,'')<>'') or (ALUM_ESPECIALIDAD<>'0')) ";
		if (todos=='N') {sinesp=" and ((IFNULL(ALUM_ESPECIALIDAD,'')='') or (ALUM_ESPECIALIDAD='0')) ";}
				
		elsql="select ALUM_MATRICULA AS MATRICULA, CONCAT(b.ALUM_APEPAT, ' ', b.ALUM_APEMAT, ' ',b.ALUM_NOMBRE) AS NOMBRE,"+
		//" getAvanceMatCiclo(ALUM_MATRICULA,'"+$("#elciclo").html()+"') AS AVANCE, "+		
		"ALUM_MAPA AS MAPA, ALUM_ESPECIALIDAD AS ESPECIALIDAD, "+
		" ALUM_CARRERAREG from falumnos b, ccarreras c where b.ALUM_CICLOINS='"+$("#selCiclos").val()+"'"+
		" and b.ALUM_CARRERAREG=c.CARR_CLAVE and b.ALUM_CARRERAREG='"+$("#selCarreras").val()+"'"+
		" and ALUM_MAPA='"+$("#selMapas").val()+"' "+sinesp+" order by ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE";

		
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	  
		mostrarEspera("esperaInf","grid_asignaespecialidad","Cargando Datos...Puede tardar");
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  				      			      
					generaTablaInformacion(JSON.parse(data));   																																													
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
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contR).html()+" "+valor.PROFESOR);   	
		$("#cuerpoInformacion").append("<tr id=\"rowM"+contR+"\">");
		$("#rowM"+contR).append("<td>"+contR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.MATRICULA+"</td>");
		$("#rowM"+contR).append("<td>"+valor.NOMBRE+"</td>");
		$("#rowM"+contR).append("<td>"+valor.MAPA+"</td>");
		$("#rowM"+contR).append("<td><select onchange=\"actualizaIndi('"+valor.MATRICULA+"','sel_"+valor.MATRICULA+"');\" class=\"losselectesp\" matricula=\""+valor.MATRICULA+"\" id=\"sel_"+valor.MATRICULA+"\"></select></td>");	
		//$("#rowM"+contR).append("<td><span class=\"badge badge-danger\">"+valor.AVANCE+"</span></td>");		
		$("#sel_"+valor.MATRICULA).html($("#selEspecialidad").html());	
		$("#sel_"+valor.MATRICULA).val(valor.ESPECIALIDAD);	
		
		contR++;    
		
		
	});	
	ocultarEspera("esperaInf");  
} 



function agregarTodas(){
	if (confirm("¿Seguro desea asignar a todos los alumnos de esta vista la especialidad "+$("#selEspecialidad option:selected").text())){
		$(".losselectesp").each(function(){
			$(this).val($("#selEspecialidad").val());
			lamat=$(this).attr("matricula");
			actualizaEsp(lamat,$("#selEspecialidad").val());
		});
	}
}

function actualizaIndi (matricula,nombre){
	
	actualizaEsp(matricula,$("#"+nombre).val());
}

function actualizaEsp (matricula,especialidad) {
   
    parametros={
		tabla:"falumnos",
		bd:"Mysql",
		campollave:"ALUM_MATRICULA",
		valorllave:matricula,
		ALUM_ESPECIALIDAD:especialidad
	};

	$.ajax({
		type: "POST",
		url:"../base/actualiza.php",
		data: parametros,
		success: function(data){  
	
				        									 
		}					     
	}); 
	
}