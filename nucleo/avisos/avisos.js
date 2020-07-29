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

	mostrarEspera("esperaInf","grid_avisos","Cargando Datos...");
	elsql="SELECT usua_usuader, usua_super FROM CUSUARIOS WHERE usua_usuario='"+usuario+"'";
	cadSql="select s.*, DATEDIFF(STR_TO_DATE(TERMINA,'%d/%m/%Y'), STR_TO_DATE(INICIA,'%d/%m/%Y')) AS QUEDAN from eavisos s where  "+
	" ACTIVO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y')"+
	" Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
	" AND STR_TO_DATE(TERMINA,'%d/%m/%Y') ";
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
						elsql2+=cadSql+" and USUARIOS LIKE '%"+currentValue+"%' UNION ";						
					});
					elsql2=elsql2.substring(0,elsql2.length-7)+" ORDER BY 13";
				}
				else {
				   elsql2=cadSql+"  ORDER BY 13 ";
				}

		
				$("#informacion").empty();
				parametrosw={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}				
				$.ajax({
						type: "POST",
						data:parametrosw,
						url:  "../base/getdatossqlSeg.php",
						success: function(data2){  
							generaTabla(JSON.parse(data2));   													
							ocultarEspera("esperahor");  	

						}
					});
			}
		});
				  					  		
}

function generaTabla(grid_data){	
	contAlum=1;
	$("#principal").empty();
	cont=1;
	jQuery.each(grid_data, function(clave, valor) { 

		img1="<a href=\""+valor.AVISOS_ADJ1+"\" target=\"_blank\" > <img  title=\"Documentos adjuntos a la Convocatoria\" id=\"img1\" src=\"../../imagenes/menu/documentos.png\"  /></a>";
		if ((valor.AVISOS_ADJ1=="../../imagenes/menu/default.png") || (valor.AVISOS_ADJ1=="")) {img1="";}
		img2="<a href=\""+valor.AVISOS_ADJ2+"\"  target=\"_blank\"> <img  title=\"Documentos adjuntos a la Convocatoria\" id=\"img1\" src=\"../../imagenes/menu/documentos.png\"  /></a>";
		if ((valor.AVISOS_ADJ2=="../../imagenes/menu/default.png") || (valor.AVISOS_ADJ2=="")) {img2="";}
		

		laclase="badge badge-success";
		if (valor.QUEDAN==0) {laclase="badge badge-danger";}
		if (valor.QUEDAN==1) {laclase="badge badge-warning";}
		
		$("#principal").append("<div  class=\"profile-activity clearfix\"> "+
		                       "      <div>"+
							   "         <div class=\"fontRobotoB col-sm-8 bigger-120 text-success\">"+valor.AVISO+"<br>"+
							   "             <span class=\"fontRoboto bigger-60  text-warning\">"+valor.DESCRIP+"</span>"+
							   "         </div>"+
							   "         <div class=\"col-sm-2 fontRobotoB col-sm-8 bigger-80 text-success\">"+
							   "               <span class=\""+laclase+"\">"+(parseInt(valor.QUEDAN)+1)+" Días para Cerrar</span>"+
							   "         </div>"+
		                       "         <div class=\"col-sm-2\">"+img1+img2+"</div>"+
							   "     </div>"+
							   "</div>");
		contAlum++;     
	});	
} 
