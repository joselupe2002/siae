var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var elalumno="";
var miciclo="";

var cargando=false;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 


		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		
	
		$("#lostipos").append("<span class=\"label label-danger\">Tipo de Servicio</span>");
		addSELECT("selTipos","lostipos","PROPIO", "SELECT IdTipo, DescripcionTipo FROM mtto_tipos  order by DescripcionTipo", "","");  	
	
		$("#lassituaciones").append("<span class=\"label label-danger\">Estatus</span>");
		addSELECT("selSituacion","lassituaciones","PROPIO", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='SITUSOP' order by CATA_CLAVE", "","");  	
	
		
		addSELECT("baseTecnicos","losocultos","PROPIO", "SELECT IdTecnico, NombreTecnico  FROM mtto_tecnicos  where Activo='S' order by NombreTecnico", "","");  			      
		addSELECT("baseResultados","losocultos","PROPIO", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='RESSOP' order by CATA_CLAVE", "","");  			      
		addSELECT("baseTipoMtto","losocultos","PROPIO", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='TIPOMTTOSOP' order by CATA_CLAVE", "",""); 
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selCiclo') {miciclo=$("#selCiclo").val(); $("#elciclo").html($("#selCiclo").val());}
	}  



    function cargarInformacion(){
		$("#informacion").empty();
		mostrarEspera("esperaInf","grid_pa_mispagos","Cargando Datos...");
	
		tipo=" and IdTipo='"+$("#selTipos").val()+"'";
		if ($("#selTipos").val()=="0") {tipo="";}
		elsql="SELECT * FROM vmtto_reportes n where  IdSituacion='"+$("#selSituacion").val()+"' "+tipo+" ORDER BY IdReporte DESC"			

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
				else {ocultarEspera("esperaInf");
						$("#informacion").empty();
						$("#informacion").append("<div class=\"alert alert-danger\">No existen Servicios en el rubro de "+$("#selTipos option:selected").text()+" en situacion "+$("#selSituacion option:selected").text()+"<div>");   }	     		   
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
	"<th style=\"text-align: center;\">No.</th>"+ 
	"<th style=\"text-align: center;\">Id</th>"+ 
	"<th style=\"text-align: center;\">Problema</th>"+ 
	"<th style=\"text-align: center;\" class=\"hidden\"></th>"+ 
	"<th style=\"text-align: center;\">Tecnico</th>"+ 
	"<th style=\"text-align: center;\">Estatus</th>"+	
	"<th style=\"text-align: center;\">Resultado</th>"+	
	"<th style=\"text-align: center;\">Fecha de Atención  </th>"+
	"<th style=\"text-align: center;\">Hora de Atención  </th>"+	
	"<th style=\"text-align: center;\">Fecha de Resultado  </th>"+
	"<th style=\"text-align: center;\">Hora de Resultado  </th>"+
	"<th style=\"text-align: center;\">Tipo Mantenimiento</th>"+
	"<th style=\"text-align: center;\">Observaciones del servicio solicitado</th>"+	
	"<th style=\"text-align: center;\">Diagnóstico del servicio solicitado</th>"+		
	"<th style=\"text-align: center;\">Materiales Utilizados en el servicio solicitado</th>"+
	"<th style=\"text-align: center;\">Trabajo Realizado en el servicio solicitado</th>"+	

	"<th style=\"text-align: center;\">Fecha</th>"+ 
	"<th style=\"text-align: center;\">Hora</th>"+ 
	"<th style=\"text-align: center;\">Solicitante</th>"+ 
	"<th style=\"text-align: center;\">Area</th>"
	
			
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 cargando=true;
	 n=1;
	 jQuery.each(grid_data, function(clave, valor) { 			
		cadFile="";	

		btnAten="";
		

		enlace="nucleo/mtto_reportes/reporte.php?ID="+valor.IdReporte;
		

		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.IdReporte+"\">"); 
		 $("#row"+valor.IdReporte).append("<td><span class=\"badge badge-success\">"+n+"<span></td>");    		
		 $("#row"+valor.IdReporte).append("<td>"+valor.IdReporte+"</td>");    
		 $("#row"+valor.IdReporte).append("<td>"+valor.Descripcion.substr(0,40).toUpperCase()+
		 " <i class=\"fa blue fa-arrow-circle-right bigger-150\" style=\"cursor:pointer\" onclick=\"verExtenso('"+valor.IdReporte+"')\"></i>"+
		 " <i class=\"fa green fa-file bigger-150\" style=\"cursor:pointer\" onclick=\"abrirPesta('"+enlace+"','Reporte')\"></i></td>");		

		
		 $("#row"+valor.IdReporte).append("<td id=\"txt"+valor.IdReporte+"\" class=\"hidden\">"+
			 "<b>PROBLEMÁTICA: </b>"+valor.Descripcion+
			 "<br><b><span>SOLICITANTE: </b></span>"+valor.UsuarioCapturaD+
			 "<br><b>AREA: </b>"+valor.URESD+
			 "<br><b>FECHA: </b>"+valor.FechaReporte+
			 "<br><b>HORA: </b>"+valor.HoraReporte+
			 "<br><b>TIPO: </b>"+valor.IdTipoD+
			 "</td>"); 
		


		 $("#row"+valor.IdReporte).append("<td><SELECT onchange=\"grabaDato('"+valor.IdReporte+"','IdTecnico');\" id=\"IdTecnico"+valor.IdReporte+"\" style=\"width:140px;\" ></SELECT></td>");
		 $("#row"+valor.IdReporte).append("<td><SELECT onchange=\"grabaDato('"+valor.IdReporte+"','IdSituacion');\" id=\"IdSituacion"+valor.IdReporte+"\" style=\"width:140px;\" ></SELECT></td>");

		 $("#row"+valor.IdReporte).append("<td><SELECT onchange=\"grabaDato('"+valor.IdReporte+"','IdResultado');\" id=\"IdResultado"+valor.IdReporte+"\" style=\"width:140px;\" ></SELECT></td>");

		 $("#row"+valor.IdReporte).append("<td><div class=\"input-group\"><input onchange=\"grabaDato('"+valor.IdReporte+"','FechaAtencion');\" "+
							 "            value=\""+valor.FechaAtencion+"\" class=\"form-control date-picker\" id=\"FechaAtencion"+valor.IdReporte+"\" "+
				             "            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
							 "     <span class=\"input-group-addon\"><i class=\"fa green fa-calendar bigger-110\"></i></span></div></td>");

		$("#row"+valor.IdReporte).append("<td><input  id=\"HoraAtencion"+valor.IdReporte+"\"  value=\""+valor.HoraAtencion+"\" autocomplete=\"off\" onchange=\"grabaDato('"+valor.IdReporte+"','HoraAtencion');\" class= \" small form-control input-mask-hora\" </input></td>");


		$("#row"+valor.IdReporte).append("<td><div class=\"input-group\"><input onchange=\"grabaDato('"+valor.IdReporte+"','FechaResultado');\" "+
		"            value=\""+valor.FechaResultado+"\" class=\"form-control date-picker\" id=\"FechaResultado"+valor.IdReporte+"\" "+
		"            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
		"     <span class=\"input-group-addon\"><i class=\"fa green fa-calendar bigger-110\"></i></span></div></td>");

	    $("#row"+valor.IdReporte).append("<td><input  id=\"HoraResultado"+valor.IdReporte+"\"  value=\""+valor.HoraResultado+"\" autocomplete=\"off\" onchange=\"grabaDato('"+valor.IdReporte+"','HoraResultado');\" class= \" small form-control input-mask-hora\" </input></td>");


		$("#row"+valor.IdReporte).append("<td><SELECT onchange=\"grabaDato('"+valor.IdReporte+"','TipoMantenimiento');\" id=\"TipoMantenimiento"+valor.IdReporte+"\" style=\"width:140px;\" ></SELECT></td>");
		$("#row"+valor.IdReporte).append("<td><textarea  id=\"Observaciones"+valor.IdReporte+"\"  onchange=\"grabaDato('"+valor.IdReporte+"','Observaciones');\" class= \"small form-control\">"+valor.Observaciones+"</textarea></td>");

		$("#row"+valor.IdReporte).append("<td><textarea  id=\"Diagnostico"+valor.IdReporte+"\"   onchange=\"grabaDato('"+valor.IdReporte+"','Diagnostico');\" class= \"small form-control\">"+valor.Diagnostico+"</textarea></td>");
		$("#row"+valor.IdReporte).append("<td><textarea  id=\"MaterialesUtilizados"+valor.IdReporte+"\"  onchange=\"grabaDato('"+valor.IdReporte+"','MaterialesUtilizados');\" class= \"small form-control\">"+valor.MaterialesUtilizados+"</textarea></td>");
		$("#row"+valor.IdReporte).append("<td><textarea  id=\"TrabajoRealizado"+valor.IdReporte+"\"  onchange=\"grabaDato('"+valor.IdReporte+"','TrabajoRealizado');\" class= \"small form-control\">"+valor.TrabajoRealizado+"</textarea></td>");


		 $("#row"+valor.IdReporte).append("<td>"+valor.FechaReporte+"</td>");   	
		 $("#row"+valor.IdReporte).append("<td>"+valor.HoraReporte+"</td>");    	
		 $("#row"+valor.IdReporte).append("<td>"+valor.UsuarioCapturaD+"</td>");    	
		 $("#row"+valor.IdReporte).append("<td>"+valor.URESD+"</td>");
		 
		 
		
		 $("#row"+valor.ID).append("</tr>");

		 $("#IdTecnico"+valor.IdReporte).html($("#baseTecnicos").html());
		 $("#IdTecnico"+valor.IdReporte+" option[value='"+ valor.IdTecnico+"']").attr("selected",true);

		 $("#IdSituacion"+valor.IdReporte).html($("#selSituacion").html());
		 $("#IdSituacion"+valor.IdReporte+" option[value='"+ valor.IdSituacion+"']").attr("selected",true);


		 $("#IdResultado"+valor.IdReporte).html($("#baseResultados").html());
		 $("#IdResultado"+valor.IdReporte+" option[value='"+ valor.IdResultado+"']").attr("selected",true);

		 $("#TipoMantenimiento"+valor.IdReporte).html($("#baseTipoMtto").html());
		 $("#TipoMantenimiento"+valor.IdReporte+" option[value='"+ valor.TipoMantenimiento+"']").attr("selected",true);

		n++;
	 });
	$('#dlgproceso').modal("hide"); 
	$('.date-picker').datepicker({autoclose: true,todayHighlight: true});
	$(".input-mask-hora").mask("99:99");
	cargando=false;
}	


function verExtenso(elid){
	
	mostrarIfo("infomsj","grid_mtto_atencion","Problemática","<div style=\"text-align:left;\">"+$("#txt"+elid).html()+"</div>","modal-sm")

}

function grabaDato(elid,columna){
	if (!cargando) {
	    mostrarEspera("esperaGrab", "grid_mtto_atencion", "Grabando");

		parametros={
			tabla:"mtto_reportes",
			campollave:"IdReporte",
			valorllave:elid,
			nombreCampo:columna,
			valorCampo:$("#"+columna+elid).val(),
			bd:"Mysql"};

		   $.ajax({
					type: "POST",
					url:"../base/actualizaDin.php",
					data: parametros,
					success: function(data){
						console.log(data);	
						ocultarEspera("esperaGrab");	    				       					           
					   }					     
				  }); 
		}
				
}



/*=================================================================*/
function marcarAtendido(elid,elvalor,obs,actap){


		$("#confirmCotejado").empty();
		mostrarConfirm("confirmCotejado", "grid_tut_canalpsi",  "Resultados",
		"<span class=\"label label-success\">Observaciones</span>"+
		"     <textarea id=\"observaciones\" style=\"width:100%; height:100%; resize: none;\">"+obs+"</textarea>"+
		"<span class=\"label label-success\">Actividades Apoyo</span>"+
		"     <textarea id=\"actapoyo\" style=\"width:100%; height:100%; resize: none;\">"+actap+"</textarea>",
		"","Finalizar Proceso", "grabarAtendido('"+elid+"','"+elvalor+"');","modal-sm");
}


function grabarAtendido(elid,elvalor){
	fecha=dameFecha("FECHAHORA");
	cadVal="MARCAR COMO ATENDIDO";
	if (elvalor=='N') {cadVal="MARCAR COMO NO ATENDIDO";}
		parametros={tabla:"tut_canalizaciones",						    		    	      
					bd:"Mysql",
					campollave:"ID",
					valorllave:elid,
					ATENDIDO:elvalor,
					FECHAAT:fecha,
					USERAT:usuario,
					OBSERVACIONES:$("#observaciones").val(),
					ACTAPOYO:$("#actapoyo").val()

					};	      
		$.ajax({
					type: "POST",
					url:"../base/actualiza.php",
					data: parametros,
					success: function(data){    
						console.log(data);
						$('#confirmCotejado').empty("");
						$('#confirmCotejado').modal("hide");
						cargarInformacion();
	   				}		
	   }); 
	
}

