var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var lasiniciales="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");


		elsql="select INICIALES, count(*) as HAY from iso_auditores where USUARIO='"+usuario+"'";
	  
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		mostrarEspera("esperaInf","grid_iso_laaudit","Cargando Datos...");
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  
				      			    
				    if (inicial=JSON.parse(data)[0]["HAY"]>0) {
						inicial=JSON.parse(data)[0]["INICIALES"];  
						lasiniciales= JSON.parse(data)[0]["INICIALES"]; 
						$("#lasauditorias").append("<span class=\"label label-warning\">Auditoria</span>");
						addSELECT("selAuditorias","lasauditorias","PROPIO", "SELECT ID, concat(NOAUDIT,' ',DESCRIPCION) FROM iso_auditorias b where b.`AUDITORES` like '%"+inicial+"%'", "","");  			      

						$("#lasactividades").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
						addSELECT("selActividades","lasactividades","PROPIO", "SELECT ID, ACTIVIDAD FROM iso_detauditorias b where b.AUDITORES like '%"+999+"%'", "","");  			      
						ocultarEspera("esperaInf");
					}
					else {
						alert ("No estas dado de alta como Auditor");
						ocultarEspera("esperaInf");
					}
																																							
			    }
		});	      	      	
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selAuditorias') {	
			actualizaSelect("selActividades", "SELECT ID, ACTIVIDAD FROM iso_detauditorias b where b.AUDITORES like '%"+inicial+"%'", "","");  			      
		}  
    }


    function cargarInformacion(){
						
		elsql="select REQUISITOS from iso_detauditorias where ID='"+$("#selActividades").val()+"'";
	  
		$("#botones").empty();
		$("#informacion").empty();


		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		mostrarEspera("esperaInf","grid_iso_laaudit","Cargando Datos...");
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  
				      			      
					requisitos=JSON.parse(data)[0]["REQUISITOS"];   
					elsql2="select * from iso_requisitos where CLAVE IN ("+requisitos+") order by convert(CLAVE, UNSIGNED INTEGER)";

					parametros2={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}
					$.ajax({
						type: "POST",
						data:parametros2,
						url:  "../base/getdatossqlSeg.php",
						success: function(data2){  
							grid_data=JSON.parse(data2);
							jQuery.each(grid_data, function(clave, valor) { 
									$("#botones").append("<button title=\""+valor.DESCRIPCION+"\" onclick=\"cargarCriterios('"+valor.CLAVE+"');\" "+
									                           "class=\"fontRoboto btn btn-white btn-primary btn-round\"> "+ 									                         
													           "<span class=\"btn-small\">"+valor.CLAVE+"</span> "+            
								                         "</button>&nbsp;");					 								
							});
																																	 
						}
				 	});	   

					ocultarEspera("esperaInf");
																															
			   }
		});	      	      					  					  		
}





function cargarCriterios(subtema){
	$("#informacion").empty();
	$("#titulos").empty();
	$("#titulos").append("<div class=\"fontRobotoB bg-info text-danger col-sm-4 bigger-220\" style=\"text-align:center;\" >CRITERIOS</div>"+
					     "<div class=\" fontRobotoB bg-info text-danger  col-sm-8 bigger-220\" style=\"text-align:center;\" >OBSERVACIONES</div>");
		 				

	elsql2="SELECT a.*, "+
	       "      IFNULL((select OBS from iso_entrevistas where "+
		   "              CONCAT(AUDITORIA,ACTIVIDAD,REQUISITO,IDCRITERIO)="+
		   "              concat('"+$("#selAuditorias").val()+$("#selActividades").val()+"',a.SUBTEMA,a.ID)),'') AS OBS "+
		   "FROM iso_criterios a where SUBTEMA='"+subtema+"' ORDER BY ID";

	parametros2={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros2,
		url:  "../base/getdatossqlSeg.php",
		success: function(data2){  
			grid_data=JSON.parse(data2);
			$("#informacion").append("<br>");
			jQuery.each(grid_data, function(clave, valor) { 
				$("#informacion").append("<div class=\"fontRobotoB row\">"+
										 "    <div class=\"fontRobotoB bigger-140 col-sm-4\" style=\"text-align:justify;\">"+valor.DESCRIPCION+"</div>"+
										 "    <div class=\" fontRoboto bigger-140 col-sm-8\">"+
										 "       <textarea id=\"tx"+valor.ID+"\" onchange=\"grabarDatos('"+valor.ID+"','"+valor.SUBTEMA+"');\" style=\"width:100%; height:130px;\">"+valor.OBS+"</textarea>"+
										 "    </div>"+
										 " </div><hr>"
				);		 								
			});
																														
		}
	});	   
	
} 



function grabarDatos(id,subtema) {

	var losdatos=[];

	lafecha=dameFecha("FECHAHORA");
	cad=$("#selAuditorias").val()+"|"+$("#selAuditorias option:selected").text()+"|"+$("#selActividades").val()+"|"+
	subtema+"|"+id+"|"+$("#tx"+id).val()+"|"+institucion+"|"+campus+"|"+usuario+"|"+lasiniciales+"|"+lafecha;	
	losdatos[0]=cad;                                                  


	var loscampos = ["AUDITORIA","NUMAUDIT","ACTIVIDAD",
	"REQUISITO","IDCRITERIO","OBS","_INSTITUCION","_CAMPUS", "AUDITOR", "AUDITOINI","FECHA"];

	parametros={
		tabla:"iso_entrevistas",
		campollave:"CONCAT(AUDITORIA,ACTIVIDAD,REQUISITO,IDCRITERIO,AUDITOR)",
		bd:"Mysql",
		valorllave:$("#selAuditorias").val()+$("#selActividades").val()+subtema+id+usuario,
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
			}					     
	});    	 
}
