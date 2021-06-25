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

	cadSql="select * from vrespropproy where ACTIVO='S' ";
			
	$("#informacion").empty();
	parametrosw={sql:cadSql,dato:sessionStorage.co,bd:"Mysql"}				
	$.ajax({
			type: "POST",
			data:parametrosw,
			url:  "../base/getdatossqlSeg.php",
			success: function(data2){  
				generaTabla(JSON.parse(data2));   													
				ocultarEspera("esperaInf");  	

			}
		});
						  					  		
}

function generaTabla(grid_data){	
	contAlum=1;
	$("#principal").empty();
	cont=1;
	jQuery.each(grid_data, function(clave, valor) { 

		
		$("#principal").append("<div  class=\"profile-activity clearfix sigeaPrin\"> "+
		                       "      <div>"+
							   "         <div class=\"fontRobotoB col-sm-10 bigger-120 text-success\"><span class=\"badge badge-primary\">"+valor.ID+"</span>"+valor.PROYECTO+"<br>"+
							   "             <span class=\"fontRoboto bigger-60  text-warning\">"+valor.DESCRIPCION+"</span><br>"+
							   "             <span class=\"fontRobotoB bigger-60  text-primary\">Empresa: "+valor.EMPRESAD+"</span><br>"+
							   "             <span class=\"fontRobotoB bigger-60 text-muted\">Contacto: "+valor.CONTACTO+"</span><br>"+
							   "             <span class=\"label label-white middle fontRoboto bigger-60  label-primary\">Correo: "+valor.CORREO+"</span>"+"<br>"+
							   "             <span class=\"label label-white middle fontRoboto bigger-60  label-danger\">Telefono: "+valor.TELEFONO+"</span>"+
							   
							   "         </div>"+
							   "         <div class=\"col-sm-2\">"+
							   "         </div>"+
							   "         <div class=\"col-sm-2 fontRobotoB col-sm-8 bigger-80 text-success\">"+
							   "               <span></span>"+
							   "         </div>"+
		                       "         <div class=\"col-sm-2\"></div>"+
							   "     </div>"+
							   "</div>");
		contAlum++;     
	});	
} 
