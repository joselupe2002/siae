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
		cargaEventos();
		cargaIndicadores();
		generaIndicGen();
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
	
	cadSql3="select YEAR(NOW()) as ANIO, COMI_ID, COMI_HORAINI, COMI_HORAFIN, DATEDIFF(STR_TO_DATE(COMI_FECHAFIN,'%d/%m/%Y'),now()) AS DIF, "+
	"COMI_ID, COMI_ACTIVIDAD, COMI_CUMPLIDA,COMI_FECHAINI,  COMI_FECHAFIN, COMI_LUGAR "+
    " from vpcomisiones a, ciclosesc b  where a.`COMI_PROFESOR`='"+$("#selProfesores").val()+"' and CICL_CLAVE='"+$("#selCiclo").val()+"'"+
    " AND  YEAR(STR_TO_DATE(COMI_FECHAFIN,'%d/%m/%Y'))= YEAR(STR_TO_DATE(CICL_INICIO,'%d/%m/%Y')) "+
    " order by STR_TO_DATE(COMI_FECHAFIN,'%d/%m/%Y') DESC";
	
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
	
		of1="<a style=\"cursor:pointer;\" onclick=\"abrirPesta('nucleo/pcomisiones/oficionocumple.php?tipo=1&ID="+valor.COMI_ID+"','comision');\">";
		if (valor.COMI_CUMPLIDA=='S') {
			of1="<a style=\"cursor:pointer;\" onclick=\"abrirPesta('nucleo/pcomisiones/oficiocumple.php?tipo=1&ID="+valor.COMI_ID+"','comision');\">";
			laimagen="green fa-check";  leyendatxt="Actividad Cumplida";
		}
		
		$("#con2").append("<div  class=\"profile-activity clearfix\"> "+
		                       "      <div>"+
							   "         <div class=\"fontRobotoB col-sm-6 bigger-80 text-success\"><a style=\"cursor:pointer;\" onclick=\"abrirPesta('nucleo/pcomisiones/oficiocom.php?tipo=1&ID="+valor.COMI_ID+"','comision');\">"+valor.COMI_ACTIVIDAD+"</a><br>"+
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
							   "               "+of1+"<i class=\"fa bigger-200 "+laimagen+"\"> </i></a><br>"+
							   "               "+of1+"<span class=\"fontRoboto text-info\">"+leyendatxt+"</spann></a>"+
							   "         </div>"+			                    
							   "     </div>"+
							   "</div>");
		contAlum++;     
	});	
} 



/*====================================EVENTOS =================================*/


function cargaEventos() {
	$('#con3').append("<img id=\"esperarcon2\" src=\"../../imagenes/menu/esperar.gif\" style=\"width:100%;height:100%;\">");
	
	cadSql3=" select * from veventos_ins a, ciclosesc b where a.PERSONA='"+$("#selProfesores").val()+"'"+
	" AND YEAR(STR_TO_DATE(FECHA,'%d/%m/%Y'))= YEAR(STR_TO_DATE(CICL_INICIO,'%d/%m/%Y')) "+
	" AND CICL_CLAVE='"+$("#selCiclo").val()+"'"+
	" order by ID DESC";

	alert (cadSql3);

	parametros3={sql:cadSql3,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros3,
		url:  "../base/getdatossqlSeg.php",
		success: function(data3){   	
			datos3=JSON.parse(data3);
			generaEventos(datos3);
			$("#esperarcon2").remove();
		}  
	});
}


function generaEventos(grid_data){	
	contAlum=1;
	$("#con3").empty();
	cont=1;
	jQuery.each(grid_data, function(clave, valor) { 

		laclase="badge badge-success";
		leyendaday="Días restan";
		
		etasistio="Asistió al evento";
		asistio="<i class=\"fa fa-check blue bigger-200\"></i>";
		if (valor.ASISTIO=='N') {etasistio="No se ha marcado como que asistió al evento"; asistio="<i class=\"fa fa-times red bigger-200\"></i>";}

		etconstancia="";constancia="";
		etautorizada="La constancia NO se ha autorizado"; 
		autorizada="<i class=\"fa fa-thumbs-o-down red bigger-200\"></i>";
		
		if (valor.AUTORIZADO=='S') {
			etautorizada="La constancia se encuentra autorizada"; 
			autorizada="<i class=\"fa fa-thumbs-o-up green bigger-200\"></i>";
			etconstancia="Descargue su constancia de participación";
			constancia="<button class=\"btn btn-white btn-info btn-bold\" onclick=\"verConstancia("+valor.ID+");\">"+
			                "<i class=\"ace-icon fa fa-check-square-o bigger-120 blue\"></i>Ver Constancia</button>";
		}
		lafecha=fechaLetra(valor.FECHA);

		lafoto=valor.FOTOACTIVIDAD;
		if  (valor.FOTOACTIVIDAD=='') {lafoto="../../imagenes/menu/default.png";}

		$("#con3").append("<div style=\"border-bottom:1px dotted; border-color:#14418A;\"> "+
							   "      <div class=\"row\" >"+
							   "        <div class=\"fontRobotoB col-sm-1\">"+
							   "                  <img  class=\"ma_foto\" src=\""+lafoto+"\"/>"+							   
							   "         </div>"+
							   "         <div class=\"fontRobotoB col-sm-6 bigger-80 text-success\">"+
							   "             <span class=\"fontRoboto bigger-150 text-primary\">"+valor.EVENTOD+"</span>"+"<br>"+
							   "             <span title=\"Fecha en la que se llevará acabo el evento\" class=\"badge badge-success fontRoboto bigger-50 \">"+lafecha+"</span><br>"+
							   "             <span title=\"Hora en la que se realizará el evento\"  class=\"badge badge-warning fontRoboto bigger-50 \">"+valor.HORA+"</span><br>"+							   
							   "         </div>"+
							   "         <div class=\"col-sm-1\" title=\""+etasistio+"\">"+asistio+"</div>"+	
							   "         <div class=\"col-sm-1\" title=\""+etautorizada+"\">"+autorizada+"</div>"+
							   "         <div class=\"col-sm-1\" title=\""+etconstancia+"\">"+constancia+"</div>"+							   
							   "     </div>"+
							   "</div><br>");
		contAlum++;     
	});	
} 

function verConstancia(id){		
	enlace=("nucleo/eventos_ins/constancia.php?id="+id+"&tipo=1");
	abrirPesta(enlace,"Constancia");
}


/*======================================indicadores ==========================*/


function cargaIndicadores() {
	$('#con3').append("<img id=\"esperarcon2\" src=\"../../imagenes/menu/esperar.gif\" style=\"width:100%;height:100%;\">");
	
	cadSql3=" SELECT a.IDDETALLE, a.SIE, a.MATERIA, a.MATERIAD, a.SEMESTRE, a.CARRERAD,"+
	"(select count(*) from dlista b where b.IDGRUPO=a.IDDETALLE AND BAJA='N') AS NUMALUM,"+
	"(select count(*) from dlista b where b.IDGRUPO=a.IDDETALLE AND BAJA='S') AS NUMBAJA,"+
	"(select count(*) from dlista b where b.IDGRUPO=a.IDDETALLE AND BAJA='N' AND LISCAL>70) AS NUMAPR"+
	" FROM vedgrupos a where a.PROFESOR='"+$("#selProfesores").val()+"' and a.CICLO='"+$("#selCiclo").val()+"'";


	parametros3={sql:cadSql3,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros3,
		url:  "../base/getdatossqlSeg.php",
		success: function(data3){   
				
			datos3=JSON.parse(data3);
			generaIndicadores(datos3);
			$("#esperarcon2").remove();
		}  
	});
}

function generaIndicadores(grid_data){	
	contAlum=1;
	$("#con4").empty();
	cont=1;
	jQuery.each(grid_data, function(clave, valor) { 
		papr=Math.round((valor.NUMAPR/valor.NUMALUM)*100);
		$("#con4").append("<div style=\"border-bottom:1px dotted; border-color:#14418A;\"> "+
							   "      <div class=\"row\" >"+
							   "           <div class=\"col-sm-5\" style=\"padding-left:50px;\">"+
							   "                <div class=\"row fontRobotoB text-primary\">"+	
							   "                   <span class=\"fontRobotoB\" style=\"font-size:18px;\">"+ valor.MATERIAD+"</span>"+					   
							   "                </div>"+
							   "                <div class=\"row fontRobotoB text-primary\">"+	
							   "                   <span class=\"fontRobotoB badge badge-success\"> Sem:"+ valor.SEMESTRE+"</span>"+	
							   "                   <span class=\"fontRobotoB badge badge-danger\"> Gpo:"+ valor.SIE+"</span>"+					   
							   "                </div>"+	
							   "           </div>"+	
							   "           <div class=\"col-sm-1 centrarVertical\">"+
							   "                   <span class=\"fontRobotoB indVertical\" style=\"color:black;\">ALUMNOS</span>"+					   
							   "                   <span class=\"fontRobotoB indNumero\" style=\"color:black;\">"+ valor.NUMALUM+"</span>"+					   
							   "           </div>"+	
							   "           <div class=\"col-sm-1 centrarVertical\">"+							   
							   "                   <span class=\"fontRobotoB indNumero\" style=\"color:#790909;\">"+ valor.NUMBAJA+"</span>"+					   
							   "                   <span class=\"fontRobotoB indVertical\" style=\"color:#790909;\">BAJAS</span>"+					   
							   "           </div>"+		
							   "           <div class=\"col-sm-1 centrarVertical\">"+							   
							   "                   <span class=\"fontRobotoB indVertical\">APROBADOS</span>"+
							   "                   <span class=\"fontRobotoB indNumero\">"+ valor.NUMAPR+"</span>"+					   							   					   
							   "           </div>"+	
							   "           <div class=\"col-sm-1 centrarVertical\">"+	
							   "                <div class=\"infobox-progress\" title=\"Porcentaje de Aprobación\">"+
						       "                   <div class=\"easy-pie-chart percentage\" data-color=\"green\" data-percent=\""+papr+"\" data-size=\"70\">"+
							   "                       <span class=\"percent\">"+papr+"</span>%"+
						       "                  </div>"+
					           "               </div>"+
							   "           </div>"+	
							   "           <div class=\"col-sm-1 centrarVertical\">"+							   
							   "                  <a style=\"cursor:pointer;\" onclick=\"verBoleta('"+valor.SIE+"','"+valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.IDDETALLE+"','"+valor.SEMESTRE+"');\">"+
							   "                  <img src=\"../../imagenes/menu/pdf.png\"  style=\"width:50px; height:60px; \"></i></a>"+				   
							   "           </div>"+					 
							   "     </div>"+
							   "</div><br>");
		contAlum++;     
	});	

	$('.easy-pie-chart.percentage').each(function(){
		var barColor = $(this).data('color') || '#2979FF';
		var trackColor = '#E2E2E2';
		var size = parseInt($(this).data('size')) || 72;
		$(this).easyPieChart({
			barColor: barColor,
			trackColor: trackColor,
			scaleColor: false,
			lineCap: 'butt',
			lineWidth: parseInt(size/5),
			animate:false,
			size: size
		}).css('color', barColor);
		});


} 

function verBoleta(grupo,materia,materiad,id,semestre){		
	tit='Boleta';
	enlace="nucleo/cierreCal/boleta.php?tipo=0&grupo="+grupo+"&ciclo="+$("#selCiclo").val()+"&profesor="+$("#selProfesores").val()+"&materia="+
								  materia+"&materiad="+materiad+"&id="+id+"&semestre="+semestre;
	abrirPesta(enlace,tit);
}

/*=================================EVALUACION DOCENTES ===============================*/

function generaIndicGen(){
	$('#con5').append("<img id=\"esperarcon5\" src=\"../../imagenes/menu/esperar.gif\" style=\"width:100%;height:100%;\">");
	
	cadSql3="select ALUM_FOTO AS FOTO, f.CARR_DESCRIP AS CARRERAD,ALUM_MATRICULA AS MATRICULA, CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE,"+
	" MATERIAD,DESCRIP, d.FECHA from ed_respuestasv2 d, ed_observa a, vedgrupos b, falumnos c, ccarreras f where a.IDGRUPO=b.IDDETALLE"+
	" and b.CICLO='"+$("#selCiclo").val()+"' and b.PROFESOR='"+$("#selProfesores").val()+"'"+
	" AND DESCRIP<>'' and d.IDDETALLE=a.IDDETALLE and c.ALUM_CARRERAREG=f.CARR_CLAVE"+
	" and d.MATRICULA=c.ALUM_MATRICULA ORDER BY IDOBS";


	parametros3={sql:cadSql3,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros3,
		url:  "../base/getdatossqlSeg.php",
		success: function(data3){   

			datos3=JSON.parse(data3);
			generaObs(datos3);
			$("#esperarcon5").remove();
		}  
	});
}

function generaObs(grid_data){	
	$("#con5").empty();
	contAlum=1;
	cont=1;
	$("#con5").append("<div class=\"row\">"+
	"                      <div class=\"col-sm-6\" style=\"text-align:center;\">"+
	"                           <div class=\"row\">"+
	"                                <div class=\"col-sm-12\">"+
	"                                     <button class=\"btn btn-white btn-info btn-bold\" onclick=\"verEvalDoc();\">"+
	"                                         <i class=\"ace-icon fa fa-table bigger-180 purple\"></i>"+
	"                                         <span class=\"fontRobotoB bigger-180\">Ver Resultados de Encuesta Docente</span>"+
	"                                     </button>"+
	"                                 </div>"+
	"                            </div><hr>"+
	"                           <div class=\"row\">"+
	"                               <div class=\"col-sm-3 centrarVertical\">"+							   
	"                                    <span class=\"fontRobotoB indVertical\" style=\"color:black;\">ALUMNOS</span>"+
	"                                    <span class=\"fontRobotoB indNumero\" id=\"totAlum\" style=\"color:black;\"></span>"+					   							   					   
	"                               </div>"+	
	"                               <div class=\"col-sm-3 centrarVertical\">"+							   
	"                                    <span class=\"fontRobotoB indVertical\" style=\"color:red;\">BAJAS</span>"+
	"                                    <span class=\"fontRobotoB indNumero\" id=\"totBajas\" style=\"color:red;\"></span>"+					   							   					   
	"                               </div>"+	
	"                               <div class=\"col-sm-3 centrarVertical\">"+							   
	"                                    <span class=\"fontRobotoB indVertical\">APROBADOS</span>"+
	"                                    <span class=\"fontRobotoB indNumero\" id=\"totApr\"></span>"+					   							   					   
	"                               </div>"+	
	"           					<div class=\"col-sm-3 centrarVertical\">"+	
	"                					<div class=\"infobox-progress\" title=\"Porcentaje de Aprobación\">"+
	"                   					<div id=\"gaprgen\" class=\"easy-pie-chart percentage\" data-color=\"blue\" data-percent=\"\" data-size=\"70\">"+
	"                      				 	<span class=\"percent\" id=\"aprgen\"></span>%"+
	"                  					</div>"+
	"           					</div>"+	
	"           			    </div>"+
	"                           </div><hr>"+	
	"                           <div class=\"row infobox-container\">"+
	"								<div class=\"infobox infobox-blue infobox-small infobox-dark\">"+
	"										<div class=\"infobox-data\">"+
	"											<div id=\"aac\" class=\"infobox-content bigger-180\"></div>"+
	"										</div>"+
	"										<div class=\"infobox-data\">"+
	"											<div class=\"infobox-content\">Asesorías</div>"+
	"											<div class=\"infobox-content\">Académicas</div>"+
	"										</div>"+
	"								</div>"+
	"								<div class=\"infobox infobox-green infobox-small infobox-dark\">"+
	"										<div class=\"infobox-data\">"+
	"											<div id=\"are\" class=\"infobox-content bigger-180\"></div>"+	
	"										</div>"+
	"										<div class=\"infobox-data\">"+
	"											<div class=\"infobox-content\">Asesorías</div>"+
	"											<div class=\"infobox-content\">Residencia</div>"+
	"										</div>"+
	"								</div>"+	
	"								<div class=\"infobox infobox-orange infobox-small infobox-dark\">"+
	"										<div class=\"infobox-data\">"+
	"											<div id=\"aco\" class=\"infobox-content bigger-180\"></div>"+	
	"										</div>"+
	"										<div class=\"infobox-data\">"+
	"											<div class=\"infobox-content\">Asesorías</div>"+
	"											<div class=\"infobox-content\">Complem.</div>"+
	"										</div>"+
	"								</div>"+		
		
	"                     	    </div>"+
	"                     	 </div>"+
	"                     <div class=\"col-sm-6\">"+
	"                         <div class=\"widget-box\">"+
	"	                          <div class=\"widget-header\">"+
	"		                           <h4 class=\"widget-title lighter smaller\">"+
	"			                            <i class=\"ace-icon fa fa-comment blue\"></i>"+
	"			                           Comentarios"+
	"		                           </h4>"+
	"	                          </div>"+
	"                             <div class=\"widget-body\">"+
	"		                           <div class=\"widget-main no-padding\" >"+
	"                                       <div class=\"dialogs\" id=\"obsitem\" >"+
	"	                                    </div>"+
	"	                               </div>"+
	"	                          </div>"+
	"	                      </div>"+
	"	                  </div>"+
	"	             </div>"
	);

	$('.easy-pie-chart.percentage').each(function(){
		var barColor = $(this).data('color') || '#2979FF';
		var trackColor = '#E2E2E2';
		var size = parseInt($(this).data('size')) || 72;
		$(this).easyPieChart({
			barColor: barColor,
			trackColor: trackColor,
			scaleColor: false,
			lineCap: 'butt',
			lineWidth: parseInt(size/5),
			animate:false,
			size: size
		}).css('color', barColor);
		});

		$('.sparkline').each(function(){
			var $box = $(this).closest('.infobox');
			var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
			$(this).sparkline('html',
							 {
								tagValuesAttribute:'data-values',
								type: 'bar',
								barColor: barColor ,
								chartRangeMin:$(this).data('min') || 0
							 });
		});

	jQuery.each(grid_data, function(clave, valor) { 
		$("#obsitem").append("	  <div class=\"itemdiv dialogdiv\">"+
					  "				  <div class=\"user\">"+
					  "					  <img alt=\""+valor.NOMBRE+"\" src=\""+valor.FOTO+"\" />"+
					  "				  </div>"+					  
					  "				  <div class=\"body\">"+
					  "					  <div class=\"time\">"+
					  "						  <i class=\"ace-icon fa fa-clock-o\"></i>"+
					  "						  <span class=\"green\">"+valor.FECHA+"</span>"+
					  "					  </div>"+
					  "						  <div class=\"fontRobotoB name\">"+
					  "							  <a onclick=\"verBoletaAl('"+valor.MATRICULA+"');\"  style=\"cursor:pointer;\">"+valor.NOMBRE+"</a>"+
					  "						  </div>"+
					  "						  <div class=\"fontRoboto text-danger\" >"+valor.CARRERAD+"</div>"+
					  "						  <div class=\"text\">"+valor.DESCRIP+"</div>"+
					  "						  <div class=\"tools\">"+
					  "						      <a onclick=\"verBoletaAl('"+valor.MATRICULA+"');\"  class=\"btn btn-minier btn-info\" style=\"cursor:pointer;\">"+
					  "							      <i class=\"icon-only ace-icon fa fa-share\"></i>"+
					  "						      </a>"+
					  "					      </div>"+
					  "				  </div>"+
					  "			  </div>");
	});

	//Número de alumnos total 

	cadSql3="SELECT SUM((select count(*) from dlista b where b.IDGRUPO=a.IDDETALLE AND BAJA='N')) AS NUMALUM,"+
	"sum((select count(*) from dlista b where b.IDGRUPO=a.IDDETALLE AND BAJA='S')) AS NUMBAJA,"+
	"sum((select count(*) from dlista b where b.IDGRUPO=a.IDDETALLE AND BAJA='N' AND LISCAL>70)) AS NUMAPR"+
	" FROM vedgrupos a where a.PROFESOR='"+$("#selProfesores").val()+"' and a.CICLO='"+$("#selCiclo").val()+"'";

	parametros3={sql:cadSql3,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros3,
		url:  "../base/getdatossqlSeg.php",
		success: function(data3){   
			datos3=JSON.parse(data3);
			$("#totAlum").html(datos3[0]["NUMALUM"]);
			$("#totBajas").html(datos3[0]["NUMBAJA"]);
			$("#totApr").html(datos3[0]["NUMAPR"]);
			$("#totApr").html(datos3[0]["NUMAPR"]);
			papr=Math.round((datos3[0]["NUMAPR"]/datos3[0]["NUMALUM"])*100);
			$("#aprgen").html(papr);
			$('#gaprgen').data('easyPieChart').update(papr);
			
		}  
	});


	//Número de asesorias

	cadSql3="select ASES_TIPO AS TIPO,COUNT(*) AS NUM from vasesorias a where a.ASES_CICLO='"+$("#selCiclo").val()+"'"+
	"and ASES_PROFESOR='"+$("#selProfesores").val()+"' GROUP BY ASES_TIPO";

	parametros3={sql:cadSql3,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros3,
		url:  "../base/getdatossqlSeg.php",
		success: function(data3){   
			grid_data=JSON.parse(data3);
			$("#aac").html("0");
			$("#are").html("0");
			$("#aco").html("0");
			jQuery.each(grid_data, function(clave, valor) { 
				
				if (valor.TIPO=='AA') {$("#aac").html(valor.NUM);}
				if (valor.TIPO=='AC') {$("#aco").html(valor.NUM);}
				if (valor.TIPO=='AR') {$("#are").html(valor.NUM);}
			});
			
			
		}  
	});

}

function verEvalDoc(){		
	tit='Evaluación';
	abrirPesta("nucleo/resEvalDocv2/reporte.php?ciclo="+$("#selCiclo").val()+"&profesor="+$("#selProfesores").val()+"&profesord="+
	$("#selProfesores option:selected").text()+"&deptod="+$("#selCarrera option:selected").text(),tit);
	abrirPesta(enlace,tit);
}

function verBoletaAl(matricula){		
	tit='Boleta';
	abrirPesta("nucleo/econstancias/boleta.php?matricula="+matricula+"&ciclo="+$("#selCiclo").val(),tit);
}



