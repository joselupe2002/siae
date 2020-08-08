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
	cadSql="select YEAR(NOW()), COMI_HORAINI, COMI_HORAFIN, DATEDIFF(STR_TO_DATE(COMI_FECHAFIN,'%d/%m/%Y'),now()) AS DIF, "+
	"COMI_ID, COMI_ACTIVIDAD, COMI_CUMPLIDA,COMI_FECHAINI,  COMI_FECHAFIN, COMI_LUGAR "+
	" from vpcomisiones a where a.`COMI_PROFESOR`="+usuario+" AND  YEAR(STR_TO_DATE(a.`COMI_FECHAINI`,'%d/%m/%Y'))=YEAR(NOW())"+
	" order by STR_TO_DATE(COMI_FECHAFIN,'%d/%m/%Y') DESC";

	parametros={sql:cadSql,dato:sessionStorage.co,bd:"Mysql"}
	$("#informacion").empty();		
	$.ajax({
			type: "POST",
			data:parametros,
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

	
		laclase="badge badge-success";
		leyendaday="Días restan";

		if (valor.DIF==0) {laclase="badge badge-warning"; leyendaday="Vence hoy"; }
		if (valor.DIF==1) {laclase="badge badge-pink"; leyendaday="Vence 1 día";}
		if (valor.DIF<0) {laclase="badge badge-danger"; leyendaday="Vencida"; }
		if (valor.DIF>1) {laclase="badge badge-success"; leyendaday="Vence "+valor.DIF+" días";}

		if ((valor.DIF<0) && (valor.COMI_CUMPLIDA=='N')) {laimagen="red fa-times"; leyendatxt="No Cumplio";}
		if ((valor.DIF>=0) && (valor.COMI_CUMPLIDA=='N')) {laimagen="blue fa-retweet";  leyendatxt="En Proceso";}
		if (valor.COMI_CUMPLIDA=='S') {laimagen="green fa-check";  leyendatxt="Actividad Cumplida";}
		
		$("#principal").append("<div  class=\"profile-activity clearfix\"> "+
		                       "      <div>"+
							   "         <div class=\"fontRobotoB col-sm-6 bigger-80 text-success\">"+valor.COMI_ACTIVIDAD+"<br>"+
							   "             <span class=\"fontRoboto bigger-50 text-primary\">"+valor.COMI_LUGAR+"</span>"+"<br>"+
							   "             <span title=\"Fecha de inicio de la Actividad\" class=\"badge badge-success fontRoboto bigger-50 \">"+valor.COMI_HORAINI+"</span>"+
							   "             <span title=\"Fecha de termino de la Actividad\"  class=\"badge badge-warning fontRoboto bigger-50 \">"+valor.COMI_HORAFIN+"</span><br>"+
							   "         </div>"+
							   "         <div class=\"col-sm-2\">"+
							   "             <span class=\"label label-white middle fontRoboto bigger-60  label-primary\">"+valor.COMI_FECHAINI+"</span>"+"<br><br>"+
							   "             <span class=\"label label-white middle fontRoboto bigger-60  label-danger\">"+valor.COMI_FECHAFIN+"</span>"+
							   "         </div>"+
							   "         <div class=\"col-sm-2 fontRobotoB col-sm-8 bigger-80 text-success\">"+
							   "               <span class=\""+laclase+"\">"+leyendaday+"</span>"+
							   "         </div>"+
							   "         <div class=\"col-sm-2 fontRobotoB col-sm-8 bigger-80 text-success\">"+
							   "               <i class=\"fa bigger-160 "+laimagen+"\"> </i><br>"+
							   "               <span class=\"fontRoboto text-info\">"+leyendatxt+"</spann>"+
							   "         </div>"+			                    
							   "     </div>"+
							   "</div>");
		contAlum++;     
	});	
} 
