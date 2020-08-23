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


		$("#losciclos2").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclo","losciclos2","PROPIO", "SELECT CICL_CLAVE, concat(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by CICL_CLAVE DESC", "","");  	
		
	
		$("#lasmaterias").append("<span class=\"label label-danger\">Asignatura</span>");
		addSELECT("selMaterias","lasmaterias","PROPIO", "SELECT IDDETALLE, concat(SIE,' ',MATERIAD) FROM vedgrupos a where a.CICLO='' AND PROFESOR='"+usuario+"' order by MATERIAD, SIE", "","");  	
		
	
		$("#lafecha").append("<span class=\"label label-danger\">Fecha</span>");
		addSELECT("selFechas","lafecha","PROPIO", "SELECT * from efectem where FECT_GRUPO=1", "","");  	
	

		$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {

		if (elemento=='selCiclo') {
			actualizaSelect("selMaterias", "SELECT IDDETALLE, concat(MATERIAD,'(',SIE,')') FROM vedgrupos a where a.CICLO='"+$("#selCiclo").val()+"' AND PROFESOR='"+usuario+"' order by MATERIAD, SIE", "","");  	
		}

		if (elemento=='selMaterias') {			
	    	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",ciclo:$("#selCiclo").val(),grupo:$("#selMaterias").val()}
			$.ajax({
			type: "POST",
			data:parametros,
			url:  "fechasTem.php",
				success: function(data){ 

					elsql=" select FECT_FECHA from efectem a where a.FECT_GRUPO="+$("#selMaterias").val()+" ORDER BY STR_TO_DATE(FECT_FECHA,'%d/%m/%Y') ";
					parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}     	
					$.ajax({
						type: "POST",
						data:parametros,
						url:  "../base/getdatossqlSeg.php",
						success: function(data){ 
							$("#selFechas").empty();
							jQuery.each(JSON.parse(data), function(clave, valor) { 	
								$("#selFechas").append("<option value=\""+valor.FECT_FECHA+"\">"+valor.FECT_FECHA+"</option>");
							});								
						}
					});
				}
			});
	
		}  
	}



    function cargarInformacion(){

		mostrarEspera("esperaInf","grid_pd_lista","Cargando Datos...");
		elsql="SELECT ID, CARR_DESCRIP AS CARRERAD, ALUCTR as MATRICULA, ALUM_CORREOINS, ALUM_CORREO, ALUM_TELEFONO, concat(b.ALUM_APEPAT,' ',b.ALUM_APEMAT,' ', b.ALUM_NOMBRE) AS NOMBRE,"+
		"(select VALOR FROM asistencia m where m.IDGRUPO=a.IDGRUPO and m.MATRICULA=ALUCTR AND m.FECHA='"+$("#selFechas").val()+"') AS VALOR"+
		" from dlista a, falumnos b, ccarreras c where ALUCTR=ALUM_MATRICULA AND  IDGRUPO="+$("#selMaterias").val()+
		" and ALUM_CARRERAREG=CARR_CLAVE"
		" ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE ";


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

	script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"fontRoboto table table-condensed table-bordered table-hover\" "+
				">";
	$("#informacion").empty();
	$("#informacion").append(script);
				
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	$("#tabInformacion").append("<thead><tr id=\"headMaterias\">"+
	"<th style=\"text-align: center;\">Id</th>"+ 
	"<th style=\"text-align: center;\">No. Control</th>"+
	"<th style=\"text-align: center;\">Nombre</th>"+
	"<th style=\"text-align: center;\"><span class=\"badge badge-danger\">"+$("#selFechas").val()+"</span>"+
								   "<SELECT id=\"selTodos\" onchange=\"agregarTodas();\"  id=\"\">"+
									"<option value=\"\">Todos</option>"+
									"<option value=\"S\">S</option>"+
									"<option value=\"N\">N</option>"+
									"<option value=\"J\">J</option>"+
									"<option value=\"R\">R</option>"+
									"<SELECT></th>"+
	"<th style=\"text-align: center;\">CARRERA</th>"+
	"<th style=\"text-align: center;\">CORREO INSTITUCIONAL</th>"+
	"<th style=\"text-align: center;\">CORREO PERSONAL</th>"+
	"<th style=\"text-align: center;\">TELEFONO</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	 c=1;
	 jQuery.each(grid_data, function(clave, valor) { 	
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ID+"\">");    	
		 $("#row"+valor.ID).append("<td>"+c+"</td>");  
		 $("#row"+valor.ID).append("<td>"+valor.MATRICULA+"</td>");    
		 $("#row"+valor.ID).append("<td>"+valor.NOMBRE+"</td>");         
		 $("#row"+valor.ID).append("<td><SELECT id=\"selValor"+valor.MATRICULA+"\" class=\"asistencias\" matricula=\""+valor.MATRICULA+"\" "+
		                            "onchange=\"insertaFecha('"+valor.MATRICULA+"');\">"+
									"<option value=\"\">Elija una Opción</option>"+
									"<option value=\"S\">S</option>"+
									"<option value=\"N\">N</option>"+
									"<option value=\"J\">J</option>"+
									"<option value=\"R\">R</option>"+
									"<SELECT></td>");      	    
		 $("#row"+valor.ID).append("<td>"+utf8Decode(valor.CARRERAD)+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.ALUM_CORREOINS+"</td>");      
		 $("#row"+valor.ID).append("<td>"+valor.ALUM_CORREO+"</td>");      
		 $("#row"+valor.ID).append("<td>"+valor.ALUM_TELEFONO+"</td>");     
		 $("#selValor"+valor.MATRICULA).val(valor.VALOR);
		$("#row"+valor.ID).append("</tr>");
		c++;
	 });
	$('#dlgproceso').modal("hide"); 
}	



function agregarTodas(){
	if (confirm("¿Seguro desea asignar a todos los alumnos de la lista en valor de  "+$("#selTodos option:selected").text())){
		$(".asistencias").each(function(){
			$(this).val($("#selTodos").val());
			lamat=$(this).attr("matricula");			
			insertaFecha(lamat);
		});
	}
}



function insertaFecha (matricula) {

	var parametros = {
		"tabla" : "asistencia",
		 "campollave" : "concat(MATRICULA,IDGRUPO,FECHA)",
		 "valorllave" : matricula+$("#selMaterias").val()+$("#selFechas").val(),
		 "bd":"Mysql",
	   };
		
		$.ajax({ data:  parametros,
			url:   '../base/eliminar.php',
			type:  'post',          
			success:  function (response) {
				parametros={tabla:"asistencia",
			    bd:"Mysql",
			    _INSTITUCION:"ITSM",
			    _CAMPUS:"0",
			    MATRICULA:matricula,
			    IDGRUPO:$("#selMaterias").val(),
			    FECHA:$("#selFechas").val(), 
			    VALOR:$("#selValor"+matricula).val()};
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
		}); 		    

}