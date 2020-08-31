var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


    jQuery(function($) { 
		cargarProrroga();
	});
	
	
		

/*===========================================================POR MATERIAS ==============================================*/
function cargarProrroga(){

	cadSql="select YEAR(NOW()), TIPOPAGOD, PAGO1, DATEDIFF(STR_TO_DATE(PAGO1,'%d/%m/%Y'),now()) AS DIF"+
	" from vprorrogas a where MATRICULA='"+usuario+"' AND CICLO=getciclo() AND AUTORIZADA='S'";

	parametros={sql:cadSql,dato:sessionStorage.co,bd:"Mysql"}
	$("#informacion").empty();		
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "nucleo/base/getdatossqlSeg.php",
			success: function(data2){  
				generaTabla(JSON.parse(data2));   													
				ocultarEspera("esperaInf");  	

			}
		});
				  					  		
}

function generaTabla(grid_data){	
	contAlum=1;
	$("#prorroga").empty();
	cont=1;
	jQuery.each(grid_data, function(clave, valor) { 

		laclase="badge badge-success";
		leyendaday="Días restan";

		if (valor.DIF==0) {laclase="badge badge-warning"; leyendaday="Vence hoy"; }
		if (valor.DIF==1) {laclase="badge badge-pink"; leyendaday="Vence 1 día";}
		if (valor.DIF<0) {laclase="badge badge-danger"; leyendaday="Vencida "+Math.abs(valor.DIF)+" días de retraso"; }
		if (valor.DIF>1) {laclase="badge badge-success"; leyendaday="Vence "+valor.DIF+" días";}

	
		
		$("#prorroga").append("<div  class=\"profile-activity clearfix\"> "+
		                       "      <div>"+
							   "         <div class=\"fontRobotoB col-sm-6 \">"+
							   "             <span class=\"bigger-160 text-danger\">TIENE PRORROGA EN: "+valor.TIPOPAGOD+"<br>"+							   
							   "             <span class=\"label label-white middle fontRoboto bigger-60  label-primary\">VENCE EL: "+valor.PAGO1+"</span>"+"<br><br>"+							   
							   "         </div>"+
							   "         <div class=\"col-sm-2 fontRobotoB col-sm-8 bigger-160 text-danger\">"+
							   "               <span class=\""+laclase+"\">"+leyendaday+"</span>"+
							   "         </div>"+
							   "         <div class=\"col-sm-2 fontRobotoB col-sm-8 bigger-80 text-success\">"+
							   "         </div>"+			                    
							   "     </div>"+
							   "</div>");
		contAlum++;     
	});	
} 
