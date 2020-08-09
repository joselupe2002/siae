var id_unico="";
var estaseriando=false;
var matser="";
var miayuda="";
contR=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#lascarreras").append("<span class=\"label label-primary\">Carrera</span>");
		addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_CLAVE=0", "","");  			      

		
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				actualizaSelect("selCarreras", "(SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+")) UNION (SELECT '%', 'TODAS LAS CARRERAS' FROM DUAL)", "",""); 				
				miscarreras=data;
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });
		
		$("#losciclossel").append("<span class=\"label label-primary\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc WHERE CICL_CLAVE=9999", "","");  			      
	
		actualizaSelect("selCiclos", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc UNION SELECT '%','TODOS LOS CICLO' FROM DUAL order by 1 DESC", "",""); 
		

		
		$("#losreportes").append("<span class=\"label label-danger\">Reporte</span>");
		$("#losreportes").append("<select id=\"selReportes\" onchange=\" cargaInfoSel();\"  class=\" chosen-select form-control text-success\" ></select>");	
		$('.chosen-select').chosen({allow_single_deselect:true}); 			
		$(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
		$(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
		 $("#selReportes").trigger("chosen:updated");	

		cargaReportes();
	
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function cargaInfoSel() {

			elsql="select * from strepgenerales where id="+$("#selReportes").val();
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){  
	
					miayuda=JSON.parse(data)[0]["DESCRIPCION"];
				}
			});

	}
	
	function cargaReportes(){
		mostrarEspera("esperaInf","grid_vstGenerales","Cargando Datos...");
		elsql="SELECT usua_usuader, usua_super FROM CUSUARIOS WHERE usua_usuario='"+usuario+"'";
		elsql2="";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"SQLite"}
		$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){  
					losroles=JSON.parse(data)[0][0].split(",");
					if (JSON.parse(data)[0][1]!='S') {
						losroles.forEach(function callback(currentValue, index, array) {					
							elsql2+="(SELECT ID, CONCAT(CATEGORIA,' ',NOMBRE) AS NOMBRE FROM strepgenerales where USUARIOSPERM LIKE '%"+currentValue+"%' ORDER BY CATEGORIA,NOMBRE) UNION ";
						});
                        elsql2=elsql2.substring(0,elsql2.length-7);   
					}
					else {
                       elsql2="SELECT ID, CONCAT(CATEGORIA,' ',NOMBRE) AS NOMBRE FROM strepgenerales order by NOMBRE DESC";
					}

					parametrosw={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}				
					$.ajax({
							type: "POST",
							data:parametrosw,
							url:  "../base/getdatossqlSeg.php",
							success: function(data2){  
								jQuery.each(JSON.parse(data2), function(clave, valor) { 
								     $("#selReportes").append("<option value=\""+valor.ID+"\">"+valor.NOMBRE+"</option>");
								});
								$("#selReportes").trigger("chosen:updated");	
								ocultarEspera("esperaInf");  
							}
						});
				}
			});
	}


    function cargarInformacion(){
		

		$("#opcionestabInformacion").addClass("hide");
		$("#botonestabInformacion").empty();
		
		elsql="select * from strepgenerales where id="+$("#selReportes").val();

		tagCarreras="="+$("#selCarreras").val();
		if ($("#selCarreras").val()=='%') {tagCarreras=" IN ("+miscarreras+")";}
		tagCiclos="="+$("#selCiclos").val();
		if ($("#selCiclos").val()=='%') {tagCiclos="LIKE '%'";}
		


		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
  		mostrarEspera("esperaInf","grid_vstGenerales","Cargando Datos...");
		$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){  
					elsqlCon=JSON.parse(data)[0]["ELSQL"];
					elsqlCon=elsqlCon.replace(/IN {CARRERA}/gi,tagCarreras);
					elsqlCon=elsqlCon.replace(/IN {CICLO}/gi,tagCiclos);
					miscampos=JSON.parse(data)[0]["CAMPOS"].split("|");
					misclases=JSON.parse(data)[0]["CLASES"].split("|");
					miseventos=JSON.parse(data)[0]["EVENTOS"].split("|");
					miayuda=JSON.parse(data)[0]["DESCRIPCION"];
					parametros={sql:elsqlCon,dato:sessionStorage.co,bd:"Mysql"}

				

					$.ajax({
						type: "POST",
						data:parametros,
						url:  "../base/getdatossqlSeg.php",
						success: function(data){ 							
							cadCampos="";
							miscampos.forEach(element => cadCampos+="<th>"+element+"</th>");

							script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\">"+
							    "        <thead>  "+
								"             <tr id=\"headMaterias\"><td>No.</td>"+cadCampos+"</tr>"
								"            </thead>" +
								"         </table>";

					        $("#informacion").empty();
							$("#informacion").append(script);
							 generaTablaInformacion(JSON.parse(data),miscampos,misclases,miseventos);   
							 ocultarEspera("esperaInf");  
						}
					});	
																																							
				},
				error: function(dataMat) {	                  
					alert('ERROR: '+dataMat);
								}
		});	      	      			
 					  		
}





function generaTablaInformacion(grid_data,miscampos,misclases,miseventos){
	
	contR=1;
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	jQuery.each(grid_data, function(clave, valor) { 
		$("#cuerpoInformacion").append("<tr id=\"rowM"+contR+"\">");
		$("#rowM"+contR).append("<td>"+contR+"</td>");
		miscampos.forEach(function callback(currentValue, index, array) {
			cadDato=grid_data[contR-1][index];
		
			if (!(misclases[index]=="")) {
				cadDato="<span class=\""+misclases[index]+"\">"+grid_data[contR-1][index]+"</span></td>";
			}

			cadEvento="";
			if (!(miseventos[index]=="")) {
				miev=miseventos[index].split(",");			
				cadEvento=" style=\"cursor:pointer;\" onclick=\""+ miev[0]+"('grid_vstGenerales',";
				miev.forEach(function callback(currentValue, index, array) {					
					if (index>0) {cadEvento+="'"+grid_data[contR-1][currentValue]+"',";}
				});
				cadEvento=cadEvento.substring(0,cadEvento.length-1)+");\"";				
			}
			

			$("#rowM"+contR).append("<td "+cadEvento+"}>"+cadDato+"</td>");
		});	
	    contR++;      			
	});	
	
} 


function getInfoInd(){
	mostrarIfo("infoInd","grid_vstGenerales","Información de Indicador",
	"<div style=\"text-align:left;\">"+
	"     <span class=\"badge badge-warning\">Indicador: "+	 $("#selReportes option:selected").text()+"</span><br>"+
	      miayuda+"</div>","modal-lg");
}