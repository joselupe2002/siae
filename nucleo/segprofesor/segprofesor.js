var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var elalumno="";
var miciclo="";
var micarrera="";

var colores=["4,53,252","238,18,8","238,210,7","5,223,5","7,240,191","240,7,223","240,7,7","240,7,12"];



    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#lascarreras").append("<span class=\"label label-warning\">Departamento</span>");
		 
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=depto",
			success: function(data){  
				addSELECT("selCarreras","lascarreras","PROPIO", "SELECT URES_URES, URES_DESCRIP FROM fures where "+
				"  URES_URES IN ("+data+")", "",""); 
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });

		$("#losciclos2").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclo","losciclos2","PROPIO", "SELECT CICL_CLAVE, concat(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by CICL_CLAVE DESC", "","");  	
		
		$("#losprofesores").append("<span class=\"label label-danger\">Profesor</span>");
		addSELECT("selProfesores","losprofesores","PROPIO", "SELECT EMPL_NUMERO, CONCAT(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS NOMBRE  FROM pempleados where EMPL_NUMERO='xyz' order by EMPL_NOMBRE, EMPL_APEPAT, EMPL_APEMAT", "","BUSQUEDA");  	
		

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	

		 
	function change_SELECT(elemento) {
		if (elemento=='selCiclo') {miciclo=$("#selCiclo").val(); $("#elciclo").html($("#selCiclo").val());}
		if (elemento=='selCarreras') {
			micarrera=$("#selCarreras").val();
			
			elql="SELECT EMPL_NUMERO, CONCAT(EMPL_NUMERO, ' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS NOMBRE  FROM pempleados where EMPL_DEPTO='"+$("#selCarreras").val()+"' order by EMPL_NOMBRE, EMPL_APEPAT, EMPL_APEMAT";
			actualizaSelect("selProfesores", elql, "BUSQUEDA","");  	
		}
		
	}  

	function limpiar(){
		$(".dashboard").each(function(index) {
			$(this).empty();		
		});
	  
	}


	function cargaPestanias(){
		cargaDescarga();
		cargaComisiones();
	}

    

	function cargaDescarga() {
		$('#con1').append("<img id=\"esperarcon1\" src=\"../../imagenes/menu/esperar.gif\" style=\"width:100%;height:100%;\">");
		
		elsql=" select * from vedescarga where DESC_CICLO='"+$("#selCiclo").val()+"' AND DESC_PROFESOR='"+$("#selProfesores").val()+"'";

		//console.log(elsql);
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){   			
				datos=JSON.parse(data);
				generaDescarga(data);
				$("#esperarcon1").remove();
			}  
		});

	}

	function generaDescarga(data){
		var losid = [];
		var c=0;
		$("#accordion").empty();
		jQuery.each(JSON.parse(data), function(clave, valor) { 	
			$("#accordion").append(
				"<div class=\"panel panel-default\">"+
				"    <div class=\"panel-heading\"> "+
				"         <h4 class=\"panel-title\">"+
				"             <a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#tab"+valor.DESC_ID+"\">"+
				"		          <i class=\"ace-icon fa fa-angle-down bigger-110\" data-icon-hide=\"ace-icon fa fa-angle-down\" data-icon-show=\"ace-icon fa fa-angle-right\"></i>"+
				"                    &nbsp;"+valor.DESC_ACTIVIDAD+" <span class=\"fontRobotoB text-success\">"+valor.DESC_ACTIVIDADD+"</span>"+
				"              </a>"+
				"         </h4> "+
				"    </div>"+
				"    <div class=\"panel-collapse collapse\" id=\"tab"+valor.DESC_ID+"\">"+
				"        <div class=\"panel-body fontRoboto bigger-120\"> "+
				"           <div class=\"row\" id=\"plan"+valor.DESC_ID+"\"></div>"+                
				"	     </div> "+				
				"	 </div> "+
				"</div>"
				);	

				losid[c]=valor.DESC_ID;
				c++;				
		});
		
		
		losid.forEach(function(elid, index) {
				elsql2="SELECT * FROM eplandescarga n where n.PLAN_IDACT='"+elid+"' order by PLAN_ORDEN";
				parametros2={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}
				$.ajax({
					type: "POST",
					data:parametros2,
					url:  "../base/getdatossqlSeg.php",
					success: function(data2){   						
						jQuery.each(JSON.parse(data2), function(clave2, valor2) { 
							elpdf="";enl1="";enl2="";
							
							if ((valor2.RUTA!=null)&&(valor2.RUTA!="")) {
								    elpdf="<a onclick=\"previewAdjunto('"+valor2.RUTA+"');\" style=\"cursor:pointer;\" ><img style=\"width:30px; height:30px;\" src=\"../../imagenes/menu/pdf.png\"></img></a>";
									enl1="<a onclick=\"previewAdjunto('"+valor2.RUTA+"');\" style=\"cursor:pointer;\">";
									enl2="</a>";
								}
						
								$("#plan"+elid).append(
									"<div class=\"row\">  "+
									"    <div class=\"col-sm-1\" style=\"padding-left:100px;\">"+
									"       <span class=\"fontRobotoB text-success\">"+valor2.PLAN_ORDEN+"</span>"+
									"    </div>"+
									"    <div class=\"col-sm-5\" style=\"padding-left:100px;\">"+
									"       "+enl1+"<span class=\"fontRobotoB text-primary\">"+valor2.PLAN_ACTIVIDAD+"</span>"+enl2+
									"    </div>"+
									"   <div class=\"col-sm-1\" style=\"padding-left:100px;\">"+
									"       <span class=\"fontRobotoB text-sucess pull-right\">"+valor2.PLAN_FECHAENTREGA+"</span>"+
									"    </div>"+
									"   <div class=\"col-sm-2\" style=\"padding-left:100px;\">"+
									"       <span class=\"fontRobotoB text-danger pull-right\">"+valor2.FECHARUTA+"</span>"+
									"    </div>"+
									"    <div class=\"col-sm-1\" style=\"padding-left:100px;\">"+
									"       <span pull-right\">"+elpdf+"</span>"+
									"    </div>"+
									"</div>");
								
							
						});	
						
					}  
				});
		});

		
			
}
	



function cargaComisiones() {
	$('#con2').append("<img id=\"esperarcon2\" src=\"../../imagenes/menu/esperar.gif\" style=\"width:100%;height:100%;\">");
	
	cadSql3="select YEAR(NOW()) as ANIO, COMI_HORAINI, COMI_HORAFIN, DATEDIFF(STR_TO_DATE(COMI_FECHAFIN,'%d/%m/%Y'),now()) AS DIF, "+
	"COMI_ID, COMI_ACTIVIDAD, COMI_CUMPLIDA,COMI_FECHAINI,  COMI_FECHAFIN, COMI_LUGAR "+
    " from vpcomisiones a, ciclosesc b  where a.`COMI_PROFESOR`='"+$("#selProfesores").val()+"' and CICL_CLAVE='"+$("#selCiclo").val()+"'"+
    " AND  STR_TO_DATE(a.COMI_FECHAINI,'%d/%m/%Y') between STR_TO_DATE(CICL_INICIO,'%d/%m/%Y') AND STR_TO_DATE(CICL_FIN,'%d/%m/%Y')"+
    " order by STR_TO_DATE(COMI_FECHAFIN,'%d/%m/%Y') ";
	
	parametros3={sql:cadSql3,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros3,
		url:  "../base/getdatossqlSeg.php",
		success: function(data3){   	
			datos3=JSON.parse(data3);
			generaComisiones(datos3);
			$("#esperarcon2").remove();
		}  
	});

}


function generaComisiones(grid_data){
	contAlum=1;
	$("#con2").empty();
	cont=1;
	jQuery.each(grid_data, function(clave, valor) { 

		laclase="badge badge-success";
		leyendaday="Días restan";
		leyendatxt="";
		laimagen="";

		if (valor.DIF==0) {laclase="badge badge-warning"; leyendaday="Vence hoy"; }
		if (valor.DIF==1) {laclase="badge badge-pink"; leyendaday="Vence 1 día";}
		if (valor.DIF<0) {laclase="badge badge-danger"; leyendaday="Vencida"; }
		if (valor.DIF>1) {laclase="badge badge-success"; leyendaday="Vence "+valor.DIF+" días";}

		if ((valor.DIF<0) && (valor.COMI_CUMPLIDA=='N')) {laimagen="red fa-times"; leyendatxt="No Cumplio";}
		if ((valor.DIF>=0) && (valor.COMI_CUMPLIDA=='N')) {laimagen="blue fa-retweet";  leyendatxt="En Proceso";}
		if (valor.COMI_CUMPLIDA=='S') {laimagen="green fa-check";  leyendatxt="Actividad Cumplida";}
		
		$("#con2").append("<div  class=\"profile-activity clearfix\"> "+
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
