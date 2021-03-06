var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		cargarInformacion();
	});
	
	
		

/*===========================================================POR MATERIAS ==============================================*/
function cargarInformacion(){

	mostrarEspera("esperaInf","grid_verjuntas","Cargando Datos...");
	elsql="SELECT distinct(anio) as ANIO from jd_juntas order by anio desc";
	
	elsql2="";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql2"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  
				datos=JSON.parse(data);
				generaTabla(datos);
			}
			
		});
				  					  		
}

function generaTabla(grid_data){	
	contAlum=1;
	$("#principal").empty();
	cont=1;
	jQuery.each(grid_data, function(clave, valor) { 

		laclase="badge badge-success";
		
		$("#principal").append("<div  class=\"profile-activity clearfix\"> "+
		                       "      <div>"+
							   "         <div class=\"fontRobotoB col-sm-6 bigger-200 text-primary\">"+
							   "				<a onclick=\"verJunta('"+valor.ANIO+"')\" style=\"cursor:pointer;\">JUNTA DIRECTIVA <span class=\"text-success\">"+valor.ANIO+"</span><br>"+							   
							   "         </div>"+
							   "     </div>"+
							   "</div>");
		contAlum++;     
	});	
} 


function verJunta(anio){

	$("#regreso").empty();
	$("#regreso").append("<button title=\"Regresar a la sección de Años\" onclick=\"cargarInformacion();\" "+
	"class=\"btn btn-white btn-info btn-round\"> "+
	"<i class=\"ace-icon green fa fa-arrow-left bigger-100\"></i><span class=\"btn-small\">Regresar</span> "+
	"</button> ");
	

	$("#principal").empty();
	$("#principal").append("<div id=\"accordion\" class=\"accordion-style1 panel-group\"></div> ");
	
	mostrarEspera("esperaInf","grid_verjuntas","Cargando Datos...");
	elsql="SELECT distinct(b.junta) as NOMBRE, b.idjunta as IDJUNTA from jd_documentos a, jd_juntas b where fkjunta=idjunta and anio="+anio+" order by a.ORDEN";
	
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql2"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  
				datos=JSON.parse(data);
				jQuery.each(datos, function(clave, valor) { 

					$("#accordion").append(
						"<div class=\"panel panel-default\">"+
						"    <div class=\"panel-heading\"> "+
						"         <h3 class=\"panel-title\">"+
						"             <a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#tab"+valor.IDJUNTA+"\">"+
						"		          <i class=\"ace-icon fa fa-angle-down bigger-110\" data-icon-hide=\"ace-icon fa fa-angle-down\" data-icon-show=\"ace-icon fa fa-angle-right\"></i>"+
						"                    <span class=\" fontRobotoB bigger-160 text-success\">"+valor.NOMBRE+"</span>"+
						"              </a>"+
						"         </h3> "+
						"    </div>"+
						"    <div class=\"panel-collapse collapse\" id=\"tab"+valor.IDJUNTA+"\"></div>"
					);

					elsql2="SELECT * from jd_documentos a where fkjunta="+valor.IDJUNTA+" order by ORDEN";
					parametros={sql:elsql2,dato:sessionStorage.co,bd:"Mysql2"}
					$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data2){  
								
								datos2=JSON.parse(data2);
								jQuery.each(datos2, function(clave2, valor2) { 						
										$("#tab"+valor.IDJUNTA).append(
											" <div class=\"row\">"+
											"   <div class=\"col-sm-1\"> </div>"+
											"   <div class=\"col-sm-11\"><a href=\""+valor2.doc+"\" target=\"_blank\">"+
											"       <span class=\"fontRobotoB bigger-110\">"+valor2.nombre+"</span></a></div>"+
											" </div>"
										);
									
								});

							}
						});
				});	
			}
			
		});


}