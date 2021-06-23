var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var porcProyectado=0;
var porcPosible=0;
var porcReal=0;
var miciclo="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		
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

		elsql="select ifnull(MAX(CICLO),getcicloSS()), COUNT(*) from ss_alumnos where MATRICULA='"+usuario+"'";	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data){ 
					losdatos=JSON.parse(data); 
					miciclo=losdatos[0][0];
					$("#elciclo").html(losdatos[0][0]+" "+losdatos[0][1]);
				}
			});

			
		cargarAvance();
		verCartaPresentacionSS();
	});
	
	

	function verCartaPresentacionSS(){
		

		elsqlc="select ifnull(MAX(CICLO),getcicloSS()), COUNT(*) from ss_alumnos where MATRICULA='"+usuario+"'";

		parametros={sql:elsqlc,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(dataCic2){ 
				losdatosCic=JSON.parse( dataCic2); 
				elciclo=losdatosCic[0][0];
				elsql="select ifnull(RUTA,'') as RUTA, count(*) as HAY FROM ss_alumnos a where MATRICULA='"+usuario+"' and CICLO='"+elciclo+"'";
				parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		
				$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){	
								losdatos=JSON.parse(data); 				
								if ((losdatos[0]["HAY"]>0) && (losdatos[0]["RUTA"]!="")) {							
									$("#lacarta").append(
										"<div class=\"row\">"+
											"<div class=\"row\">"+
												"<button  onclick=\"abrirPesta('"+losdatos[0]["RUTA"]+"','Carta');\" class=\"btn  btn-bold btn-danger\" value=\"Agregar\">"+
												"     <i class=\"ace-icon white fa fa-file-text bigger-200\"></i><span class=\"fontRobotoB text-white\">Ver Carta Presentación</span>"+
												"</button>"+
											"<div>"+
										"</div>");							
									}									 
							}
					});
			}
		});
	}
		 

		 
	function cargarAvance() {

		elsql="select ALUM_MATRICULA, ALUM_FOTO, ALUM_MAPA, ALUM_ESPECIALIDAD,"+ 
		"CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) as ALUM_NOMBREC,"+
		"b.CLAVEOF as CVEESP, b.DESCRIP AS ESPECIALIDADD, ALUM_CARRERAREG, CARR_DESCRIP AS CARRERAD, PLACRED "+
		" from falumnos a "+
		" LEFT OUTER join especialidad b on (a.ALUM_ESPECIALIDAD=b.ID)"+
		" LEFT OUTER join ccarreras c on (a.ALUM_CARRERAREG=c.CARR_CLAVE)"+
		" LEFT OUTER join mapas d on (a.ALUM_MAPA=d.MAPA_CLAVE)"+
		" where a.ALUM_MATRICULA='"+usuario+"'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	   $.ajax({
		   type: "POST",
		   data:parametros,
		   url:  "../base/getdatossqlSeg.php",
		   success: function(data){ 
			   losdatos=JSON.parse(data); 
			   $("#matricula").html(losdatos[0]["ALUM_MATRICULA"]);                               
			   $("#foto").attr('src',losdatos[0]["ALUM_FOTO"]);
			   $("#nombre").html(losdatos[0]["ALUM_NOMBREC"]); 
			   $("#carrera").html(losdatos[0]["ALUM_CARRERAREG"]+" "+losdatos[0]["CARRERAD"]); 
			   $("#mapa").html(losdatos[0]["ALUM_MAPA"]); 
			   $("#especialiad").html(losdatos[0]["CVEESP"]+" "+losdatos[0]["ESPECIALIDADD"]);
			   $("#carrera").html(losdatos[0]["ALUM_CARRERAREG"]+" "+losdatos[0]["CARRERAD"]);

			   totalcred=losdatos[0]["PLACRED"];
			   elmapa=losdatos[0]["ALUM_MAPA"];
			   laesp=losdatos[0]["ALUM_ESPECIALIDAD"];
			   //Los avances de los creditos 
			   real=0;
				elsql="select IFNULL(sum(h.CICL_CREDITO),0) from dlista b, eciclmate h where "+
				" b.ALUCTR='"+usuario+"' and h.CICL_MAPA='"+elmapa+"'  and ((IFNULL(h.cveesp,'0')='"+laesp+"') "+
				" or (IFNULL(h.cveesp,'0')='0'))"+
				" and h.CICL_MATERIA=b.MATCVE and b.LISCAL>=70 and CERRADO='S' "+
				" and CICL_TIPOMAT NOT IN ('T'); ";

				parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
				$.ajax({
					type: "POST",
					data:parametros,
					url:  "../base/getdatossqlSeg.php",
					success: function(data){ 
						losdatos=JSON.parse(data); 
						real=losdatos[0][0];
						porcReal=(parseInt(real)/parseInt(totalcred)*100).toFixed(0);
						console.log("Real="+real+" Cred:"+totalcred);
						$("#etelavance").html(porcReal);                               
						$('#elavance').data('easyPieChart').update(porcReal);
						$("#etelavance2").html("Real ("+real+")");  

						//checamos los avances posibles 
						elsql="select ifnull(sum(h.CICL_CREDITO),0) "+
						" from dlista b, eciclmate h where "+
						" b.ALUCTR='"+usuario+"'"+
						" and h.CICL_MAPA='"+elmapa+"'"+
						" and ((IFNULL(h.cveesp,'0')='"+laesp+"') or (IFNULL(h.cveesp,'0')='0'))"+
						" and h.`CICL_MATERIA`=b.`MATCVE`"+
						" and CERRADO='N' "+
						" and CICL_TIPOMAT NOT IN ('T')";

						posible=0;
						parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){
								losdatos=JSON.parse(data); 
								posibles=losdatos[0][0];
								porcPosible=(parseInt(posibles)/parseInt(totalcred)*100).toFixed(0);  
								$("#etposible").html(porcPosible);     				                     
								$('#posible').data('easyPieChart').update(porcPosible);
								$("#etposible2").html("Posibles ("+posibles+")");  
															
								porcProyectado=((parseInt(real)+parseInt(posibles))/parseInt(totalcred)*100).toFixed(0);
								
								$("#etproyectados").html(porcProyectado);                      
								$('#proyectados').data('easyPieChart').update(porcProyectado);
								$("#etproyectados2").html("Proyectado ("+(parseInt(real)+parseInt(posibles))+")");  

								elsql="select count(*) from dlista b, eciclmate h where "+
								" b.ALUCTR='"+usuario+"' and h.CICL_MAPA='"+elmapa+"'"+
								" and h.CICL_MATERIA=b.MATCVE and b.LISCAL>=70 and CERRADO='S' "+
								" and CICL_TIPOMAT  IN ('SS'); ";

								parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
								$.ajax({
									type: "POST",
									data:parametros,
									url:  "../base/getdatossqlSeg.php",
									success: function(data){ 
										losdatos=JSON.parse(data); 						
										if ((porcProyectado>=70) && (losdatos[0][0]<=0)) {
											$("#servicio").html("<div class=\"alert alert-warning\" style=\"width:100%;\">"+ 									        
															   "  Podrías cursar el Servicio Social, si llegas a cursar todas las asignaturas de el semestre no cerrado"+
															   "</div>");
											// OpcionesServicio();			   
										}
										if ((porcProyectado<70) && (losdatos[0][0]<=0)) {
											$("#servicio").html("<div class=\"alert alert-danger\" style=\"width:100%;\">"+ 									        
															   "    Todavía no cumples los créditos necesarios para inscribir el Servicio Social "+
															   "</div>");
										}
										if (losdatos[0][0]>1) {
											$("#servicio").html("<div class=\"alert alert-success\" style=\"width:100%;\">"+ 									        
															   "   Ya cursaste el Servicio Social "+
															   "</div>");
										}
										if ((porcReal>=70) && (losdatos[0][0]<=0)) {
											$("#servicio").html("<div class=\"alert alert-warning\" style=\"width:100%;\">"+ 									        
															   "    Ya puede cursar el Servicio Social"+
															   "</div>");

													
											OpcionesServicio();
										}

									}
								});
							}
						});
						
					}
				});

		   }
	   });
   }  


   function agregaPDF(contenedor,mensaje,ruta) {
	$("#"+contenedor).append("<span class=\" label label-success\"><i class=\"icon fa fa-check white bigger-120\"> </i>"+mensaje+"</span> <a title=\"Ver Archivo\" onclick=\"previewAdjunto('"+ruta+"');\">"+
	"                  		<img src=\"..\\..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
	"           </a>");
   }
  


   function OpcionesServicio(){

	var abierto=false;
	$("#servicio").empty();

	elsql="select ID, count(*) as HAY from ss_alumnos a where  CICLO='"+miciclo+"' and MATRICULA='"+usuario+"'";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){
	
			if (JSON.parse(data)[0]["HAY"]>0) {				
					elsql="select CLAVE, DOCGEN_RUTA FROM edocgen where CLAVE IN ('SOLSS','CARCOMSS') ORDER BY CLAVE";
					parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
					$.ajax({
						type: "POST",
						data:parametros,
						url:  "../base/getdatossqlSeg.php",
						success: function(data){ 
							losdatos=JSON.parse(data); 
				

							$("#servicio").append("<div class=\"row\" style=\"text-align:left;\">"+
												"    <div class=\"col-sm-12\"> "+
												"     <div id=\"documentos\" class=\"col-sm-12\" ></div>"+
												"    </div>"+
												"</div>");

							$("#documentos").append("<div class=\"row\"><div id=\"cont_sscartapres\" class=\"col-sm-6\"></div>"+
													"                   <div id=\"cont_sscartaacep\" class=\"col-sm-6\"></div></div>"+
													"<div class=\"row\"><div id=\"cont_sssol\" class=\"col-sm-6\"></div>"+
													"                   <div id=\"cont_sscartacom\" class=\"col-sm-6\"></div></div>"+
													"<div class=\"row\"><div id=\"cont_ssplan\" class=\"col-sm-6\"></div>"+
													"                   <div id=\"cont_sslibre\" class=\"col-sm-6\"></div></div>"+
													"<div class=\"row\"><div id=\"cont_ssbim1\" class=\"col-sm-6\"></div>"+
													"                   <div id=\"cont_ssbim2\" class=\"col-sm-6\"></div></div>"+
													"<div class=\"row\"><div id=\"cont_ssbim3\" class=\"col-sm-6\"></div>"+
													"                   <div id=\"cont_ssfinal\" class=\"col-sm-6\"></div>"+
													"</div>");


							elsql="SELECT IFNULL((select concat(VALIDADO,'|',RUTA) from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SSSOLSS'),'|') AS RUTA_SSSOLSS, "+
							" IFNULL((select concat(VALIDADO,'|',RUTA)  from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SSCARTACOM'),'|') AS RUTA_SSCARTACOM, "+
							" IFNULL((select concat(VALIDADO,'|',RUTA)  from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SSCARTAPRES'),'|') AS RUTA_SSCARTAPRES, "+
							" IFNULL((select concat(VALIDADO,'|',RUTA)  from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SSCARTAACEP'),'|') AS RUTA_SSCARTAACEP, "+

							" IFNULL((select concat(VALIDADO,'|',RUTA)  from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SSPLAN'),'|') AS RUTA_SSPLAN, "+
							" IFNULL((select concat(VALIDADO,'|',RUTA)  from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SSBIM1'),'|') AS RUTA_SSBIM1, "+
							" IFNULL((select concat(VALIDADO,'|',RUTA)  from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SSBIM2'),'|') AS RUTA_SSBIM2, "+
							" IFNULL((select concat(VALIDADO,'|',RUTA)  from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SSBIM3'),'|') AS RUTA_SSBIM3, "+
							" IFNULL((select concat(VALIDADO,'|',RUTA)  from eadjresidencia where  AUX='"+usuario+"_"+miciclo+"_SSFINAL'),'|') AS RUTA_SSFINAL "+
							" FROM DUAL"; 
	
							parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
							$.ajax({
								type: "POST",
								data:parametros,
								url:  "../base/getdatossqlSeg.php",
								success: function(data){
					
									
									activaEliminar="";							
									if ((JSON.parse(data)[0]["RUTA_SSCARTAPRES"].split("|")[1]!='') && (JSON.parse(data)[0]["RUTA_SSCARTAPRES"].split("|")[0]!='S'))  {	activaEliminar='S';}					
									if (JSON.parse(data)[0]["RUTA_SSCARTAPRES"].split("|")[0]!='S') {
										dameSubirArchivoDrive("cont_sscartapres","Carta Presentación Sellada","sscartapres",'SERVSOC','pdf',
										'ID',usuario,'CARTA PRESENTACIÓN SELLADA','eadjresidencia','alta',usuario+"_"+miciclo+"_SSCARTAPRES",JSON.parse(data)[0]["RUTA_SSCARTAPRES"].split("|")[1],activaEliminar);										
									} else {
										agregaPDF("cont_sssol","Carta Presentación Sellada",JSON.parse(data)[0]["RUTA_SSCARTAPRES"].split("|")[1]);
									}


									activaEliminar="";							
									if ((JSON.parse(data)[0]["RUTA_SSCARTAACEP"].split("|")[1]!='') && (JSON.parse(data)[0]["RUTA_SSCARTAACEP"].split("|")[0]!='S'))  {	activaEliminar='S';}					
									if (JSON.parse(data)[0]["RUTA_SSCARTAACEP"].split("|")[0]!='S') {
										dameSubirArchivoDrive("cont_sscartaacep","Carta Aceptación Sellada","sscartaacep",'SERVSOC','pdf',
										'ID',usuario,'CARTA ACEPTACIÓN SELLADA','eadjresidencia','alta',usuario+"_"+miciclo+"_SSCARTAACEP",JSON.parse(data)[0]["RUTA_SSCARTAACEP"].split("|")[1],activaEliminar);										
									} else {
										agregaPDF("cont_sssol","Carta Aceptación Sellada",JSON.parse(data)[0]["RUTA_SSCARTAACEP"].split("|")[1]);
									}
									


									activaEliminar="";							

									if ((JSON.parse(data)[0]["RUTA_SSSOLSS"].split("|")[1]!='') && (JSON.parse(data)[0]["RUTA_SSSOLSS"].split("|")[0]!='S'))  {	activaEliminar='S';}					
									if (JSON.parse(data)[0]["RUTA_SSSOLSS"].split("|")[0]!='S') {
										dameSubirArchivoDrive("cont_sssol","Solicitud Firmada","sssol",'SERVSOC','pdf',
										'ID',usuario,'SOLICITUD FIRMADA','eadjresidencia','alta',usuario+"_"+miciclo+"_SSSOLSS",JSON.parse(data)[0]["RUTA_SSSOLSS"].split("|")[1],activaEliminar);										
									} else {
										agregaPDF("cont_sssol","Solicitud Firmada",JSON.parse(data)[0]["RUTA_SSSOLSS"].split("|")[1]);
									}

									

									activaEliminar="";
									if ((JSON.parse(data)[0]["RUTA_SSCARTACOM"].split("|")[1]!='') && (JSON.parse(data)[0]["RUTA_SSCARTACOM"].split("|")[0]!='S'))  {	activaEliminar='S';}					
									if (JSON.parse(data)[0]["RUTA_SSCARTACOM"].split("|")[0]!='S') {				
										dameSubirArchivoDrive("cont_sscartacom","Carta Compromiso","sscartacom",'SERVSOC','pdf',
										'ID',usuario,'CARTA COMPROMISO','eadjresidencia','alta',usuario+"_"+miciclo+"_SSCARTACOM",JSON.parse(data)[0]["RUTA_SSCARTACOM"].split("|")[1],activaEliminar);
									} else {
										agregaPDF("cont_sscartacom","Carta Compromiso",JSON.parse(data)[0]["RUTA_SSCARTACOM"].split("|")[1]);
									}


									activaEliminar="";
									if ((JSON.parse(data)[0]["RUTA_SSPLAN"].split("|")[1]!='') && (JSON.parse(data)[0]["RUTA_SSPLAN"].split("|")[0]!='S'))  {	activaEliminar='S';}					
									if (JSON.parse(data)[0]["RUTA_SSPLAN"].split("|")[0]!='S') {				
										dameSubirArchivoDrive("cont_ssplan","Plan de Trabajo","ssplan",'SERVSOC','pdf',
										'ID',usuario,'PLAN DE TRABAJO','eadjresidencia','alta',usuario+"_"+miciclo+"_SSPLAN",JSON.parse(data)[0]["RUTA_SSPLAN"].split("|")[1],activaEliminar);
									} else {
										agregaPDF("cont_ssplan","Plan de Trabajo",JSON.parse(data)[0]["RUTA_SSPLAN"].split("|")[1]);
									}


									activaEliminar="";
									if ((JSON.parse(data)[0]["RUTA_SSBIM1"].split("|")[1]!='') && (JSON.parse(data)[0]["RUTA_SSBIM1"].split("|")[0]!='S'))  {	activaEliminar='S';}					
									if (JSON.parse(data)[0]["RUTA_SSBIM1"].split("|")[0]!='S') {				
										dameSubirArchivoDrive("cont_ssbim1","Reportes Bimestre 1","ssbim1",'SERVSOC','pdf',
										'ID',usuario,'REPORTES BIMESTRE 1','eadjresidencia','alta',usuario+"_"+miciclo+"_SSBIM1",JSON.parse(data)[0]["RUTA_SSBIM1"].split("|")[1],activaEliminar);
									}else {
										agregaPDF("cont_ssbim1","Reportes Bimestre 1",JSON.parse(data)[0]["RUTA_SSBIM1"].split("|")[1]);
									}

									activaEliminar="";
									if ((JSON.parse(data)[0]["RUTA_SSBIM2"].split("|")[1]!='') && (JSON.parse(data)[0]["RUTA_SSBIM2"].split("|")[0]!='S'))  {	activaEliminar='S';}					
									if (JSON.parse(data)[0]["RUTA_SSBIM2"].split("|")[0]!='S') {														
										dameSubirArchivoDrive("cont_ssbim2","Reportes Bimestre 2","ssbim2",'SERVSOC','pdf',
										'ID',usuario,'REPORTES BIMESTRE 2','eadjresidencia','alta',usuario+"_"+miciclo+"_SSBIM2",JSON.parse(data)[0]["RUTA_SSBIM2"].split("|")[1],activaEliminar);
									}else {
										agregaPDF("cont_ssbim2","Reportes Bimestre 2",JSON.parse(data)[0]["RUTA_SSBIM2"].split("|")[1]);
									}

									activaEliminar="";
									if ((JSON.parse(data)[0]["RUTA_SSBIM3"].split("|")[1]!='') && (JSON.parse(data)[0]["RUTA_SSBIM3"].split("|")[0]!='S'))  {	activaEliminar='S';}					
									if (JSON.parse(data)[0]["RUTA_SSBIM3"].split("|")[0]!='S') {					
										dameSubirArchivoDrive("cont_ssbim3","Reportes Bimestre 3","ssbim3",'SERVSOC','pdf',
										'ID',usuario,'REPORTES BIMESTRE 3','eadjresidencia','alta',usuario+"_"+miciclo+"_SSBIM3",JSON.parse(data)[0]["RUTA_SSBIM3"].split("|")[1],activaEliminar);
									}else {
										agregaPDF("cont_ssbim3","Reportes Bimestre 3",JSON.parse(data)[0]["RUTA_SSBIM3"].split("|")[1]);
									}

									activaEliminar="";
									if ((JSON.parse(data)[0]["RUTA_SSFINAL"].split("|")[1]!='') && (JSON.parse(data)[0]["RUTA_SSFINAL"].split("|")[0]!='S'))  {	activaEliminar='S';}					
									if (JSON.parse(data)[0]["RUTA_SSFINAL"].split("|")[0]!='S') {					
										dameSubirArchivoDrive("cont_ssfinal","Documentos Finales","ssfinal",'SERVSOC','pdf',
										'ID',usuario,'DOCUMENTOS FINALES','eadjresidencia','alta',usuario+"_"+miciclo+"_SSFINAL",JSON.parse(data)[0]["RUTA_SSFINAL"].split("|")[1],activaEliminar);
									}else {
										agregaPDF("cont_ssfinal","Documentos Finales",JSON.parse(data)[0]["RUTA_SSFINAL"].split("|")[1]);
									}

								}
							});

						}
					});
				} //DEL SI ESTA ABIERO 
				else { console.log("No hay proceso abierto");
						$("#servicio").append("<div class=\"row\">"+
						"    <div class=\"col-sm-12\"> "+
						"          <div class=\"alert alert-danger\">No se ha realizado Solicitud de Servicio Social para este Ciclo</div> "+
						"    </div>");
				}
			}
		}); //del ajax de busqueda de corte abierto 

		$("#servicio").append("<div class=\"fontRobotoB\" id=\"pcapt\" style=\"text-align:left;\"></div>");
		abrirCaptura();

	}



	function abrirCaptura(){

		var abierto=false;
		elsql="select count(*) as N from ecortescal where  CICLO='"+miciclo+"'"+
		" and ABIERTO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') "+
		" Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
		" AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='SOLSERSOC' "+
		" order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 1";


		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){

				
				if (JSON.parse(data)[0]["N"]>0) {	
					
					elsql="select  ifnull(ENVIADA,'N') AS ENVIADA, count(*) as HAY from ss_alumnos a where  CICLO='"+miciclo+"' and MATRICULA='"+usuario+"'";			
					parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
					$.ajax({
						type: "POST",
						data:parametros,
						url:  "../base/getdatossqlSeg.php",
						success: function(data){
							
							
							bt1="<button  onclick=\"capturaProyecto();\" class=\"btn btn-white btn-info btn-bold\">"+
							"     <i class=\"ace-icon green glyphicon glyphicon-book\"></i>1. Capturar Sol.."+
							"</button> &nbsp;  &nbsp; ";
							bt2="<button  onclick=\"verProyecto();\" class=\"btn btn-white btn-success btn-bold\">"+
							"     <i class=\"ace-icon pink glyphicon glyphicon-print\"></i>2. Imprimir Sol."+
							"</button>  &nbsp;  &nbsp; ";
							bt3="<button  onclick=\"verCartaCom();\" class=\"btn btn-white btn-warning btn-bold\">"+
							"     <i class=\"ace-icon pink glyphicon glyphicon-print\"></i>3. Carta Compromiso"+
							"</button>  &nbsp;  &nbsp; ";
							bt4="<button  onclick=\"enviarSol();\" class=\"btn btn-white btn-danger btn-bold\">"+
							"     <i class=\"ace-icon blue  fa  fa-share-square-o\"></i>4. Enviar"+
							"</button> &nbsp;  &nbsp;";
							bt5="<button  onclick=\"captPlan();\" class=\"btn btn-white btn-warning btn-bold\">"+
							"     <i class=\"ace-icon blue  fa fa-list-ul\"></i>5. Plan"+
							"</button>";
							

							if (JSON.parse(data)[0]["ENVIADA"]=='S') { bt4=''; bt1="";}	

			

								//Si esta abierto aparecemos la opción de capturar Proyecto.
							$("#pcapt").append(bt1+bt2+bt3+bt4+ //bt5+
							"</div>"+"<hr><div style=\"text-align:center;\">");

							

							
						}
					});
				

				}
				else { console.log("No hay proceso abierto");
						$("#servicio").append("<div class=\"row\">"+
						"    <div class=\"col-sm-12\"> "+
						"          <div class=\"alert alert-danger\">No se encuentra abierto el proceso de Solicitud Carta de Servicio Social para este Ciclo</div> "+
						"    </div>");
				}
				
			}
		});

	}

	
	function capturaProyecto(){

		elsql="select ifnull(ID,'0') as ID,ifnull( MATRICULA,'') AS MATRICULA,ifnull( CICLO,'') AS CICLO,ifnull( INICIO,'') AS INICIO,"+
		"ifnull( PROGRAMA,'') AS PROYECTO,ifnull( TERMINO,'') AS TERMINO,ifnull( EMPRESA,'') AS EMPRESA,"+
		"ifnull( REPRESENTANTE,'') AS REPRESENTANTE,ifnull( TELEMPRESA,'') AS TELEMPRESA,ifnull( PUESTO,'') AS PUESTO,ifnull(PROGRAMA,'') AS PROGRAMA,"+
		"ifnull( MODALIDAD,'') AS MODALIDAD,ifnull( ACTIVIDADES,'') AS ACTIVIDADES,ifnull( DIRECCION,'') AS DIRECCION,"+
		"ifnull( RESPPROG,'') AS RESPPROG,ifnull( PSTORESPPROG,'') AS PSTORESPPROG,ifnull(AYUDA,'') AS AYUDA, ifnull(MONTO,'') AS MONTO, "+
		"ifnull( TIPOPROG,'') AS TIPOPROG,ifnull(ENVIADA,'') AS ENVIADA, ifnull( TIPOPROGADD,'') AS TIPOPROGADD, ifnull( FECHACOM,'') AS FECHACOM, VALIDADO AS VALIDADO,"+
		"count(*) as HAY from ss_alumnos a where  CICLO='"+miciclo+"'"+
		" and MATRICULA='"+usuario+"'";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){

				misdatos=JSON.parse(data);

				if (misdatos[0]["HAY"]>0) {proceso="actualizaDatos("+misdatos[0]["ID"]+");"; } else {proceso="grabarDatos();";}
				mostrarConfirm2("infoError","grid_pa_servsoc","Captura de Solicitud",
				"<div class=\"ventanaSC\" style=\"text-align:justify; width:99%; height:250px; overflow-y:auto; overflow-x:hidden;\">"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Dependencia Oficial</label><input class=\"form-control captProy\" id=\"empresa\" value=\""+misdatos[0]["EMPRESA"]+"\"></input>"+
						"</div>"+
						"<div class=\"col-sm-3\">"+
							"<label  class=\"fontRobotoB\">Inicia</label>"+
							" <div class=\"input-group\"><input  class=\"form-control  captProy date-picker\"  value=\""+misdatos[0]["INICIO"]+"\" id=\"inicio\" "+
							" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
							" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
						"</div>"+
						"<div class=\"col-sm-3\">"+
							"<label class=\"fontRobotoB\">Termina</label>"+
							" <div class=\"input-group\"><input  class=\"form-control captProy date-picker\" value=\""+misdatos[0]["TERMINO"]+"\" id=\"termino\" "+
							" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
							" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
						"</div>"+						
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Titular de la Dependencia: </label><input class=\"form-control captProy\" value=\""+misdatos[0]["REPRESENTANTE"]+"\" id=\"representante\"></input>"+
						"</div>"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Cargo del Titular:</label><input class=\"form-control captProy\" value=\""+misdatos[0]["PUESTO"]+"\" id=\"puesto\"></input>"+
						"</div>"+	
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-8\">"+
							"<label class=\"fontRobotoB\">Domicilio Empresa: </label><input class=\"form-control captProy\" value=\""+misdatos[0]["DIRECCION"]+"\" id=\"direccion\"></input>"+
						"</div>"+	
						"<div class=\"col-sm-4\">"+
							"<label class=\"fontRobotoB\">Teléfono: </label><input class=\"form-control captProy\" value=\""+misdatos[0]["TELEMPRESA"]+"\" id=\"telempresa\"></input>"+
						"</div>"+						
					"</div>"+
					"<div class=\"row\">"+
						"<div class=\"col-sm-9\">"+
							"<label class=\"fontRobotoB\">Nombre del Programa </label><input class=\"form-control captProy\" value=\""+misdatos[0]["PROGRAMA"]+"\" id=\"programa\"></input>"+
						"</div>"+
						"<div class=\"col-sm-3\">"+
							"<label class=\"fontRobotoB\">Modalidad</label><select class=\"form-control captProy\"  id=\"modalidad\"></select>"+
						"</div>"+					
					"</div>"+

					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Nombre Responsable Programa</label><input class=\"form-control captProy\" value=\""+misdatos[0]["RESPPROG"]+"\" id=\"respprog\"></input>"+
						"</div>"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Puesto del Responsable</label><input class=\"form-control captProy\" value=\""+misdatos[0]["PSTORESPPROG"]+"\" id=\"pstorespprog\"></input>"+
						"</div>"+				
					"</div>"+

					"<div class=\"row\">"+
						"<div class=\"col-sm-12\">"+
							"<label class=\"fontRobotoB\">Actividades</label><textarea rows=\"5\"  class=\"form-control captProy\" style=\"width:100%;\"  id=\"actividades\">"+misdatos[0]["ACTIVIDADES"]+"</textarea>"+
						"</div>"+					
					"</div>"+

					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Tipo de Programa</label><select class=\"form-control captProy\"  id=\"tipoprog\"></select>"+
						"</div>"+	
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Otro, especifique</label><input class=\"form-control captProyOP\" value=\""+misdatos[0]["TIPOPROGADD"]+"\" id=\"tipoprogadd\"></input>"+
						"</div>"+			
					"</div>"+
					
					"<div class=\"row\">"+
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Recibe Ayuda Económica</label><select class=\"form-control captProy\"  id=\"ayuda\"></select>"+
						"</div>"+	
						"<div class=\"col-sm-6\">"+
							"<label class=\"fontRobotoB\">Monto de Ayuda</label><input class=\"form-control captProyOP\" value=\""+misdatos[0]["MONTO"]+"\" id=\"monto\"></input>"+
						"</div>"+			
					"</div>"+

					"<div class=\"row\">"+
						"<div class=\"col-sm-3\">"+
							"<label class=\"fontRobotoB\">Fecha Firma de Compromiso</label>"+
							" <div class=\"input-group\"><input  class=\"form-control captProy date-picker\" value=\""+misdatos[0]["FECHACOM"]+"\" id=\"fechacom\" "+
							" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
							" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
						"</div>"+		
					"</div>"+					
				"</div>"
				,"Grabar Datos",proceso,"modal-lg");

				actualizaSelectMarcar("modalidad", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='SSMODALIDAD'", "","",misdatos[0]["MODALIDAD"]); 
				actualizaSelectMarcar("tipoprog", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='SSTIPOPROG'", "","",misdatos[0]["TIPOPROG"]); 
				actualizaSelectMarcar("ayuda", "SELECT 'S','SI' FROM DUAL UNION SELECT 'N','NO' FROM DUAL", "","",misdatos[0]["AYUDA"]); 
				$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
				
			
				$('.captProy').keypress(function(){
					$(this).css("border-color","black");				
				});
			} //del successs
		});

	}


	
	function grabarDatos(){
		vacios=false;
		$('.captProy').each(function(){
			if (($(this).val()=="") || (($(this).val()=="0"))) {
				$(this).css("border-color","red");
				vacios=true;
			}
		 });
		 if (!vacios) {
			mostrarEspera("esperaInf","grid_pa_servsoc","Cargando Datos...");

			fecha=dameFecha("FECHAHORA");
			parametros={tabla:"ss_alumnos",
					bd:"Mysql",
					MATRICULA:usuario,
					CICLO:miciclo,
					AVANCE:porcReal,
					RESPPROG:$("#respprog").val(),
					PSTORESPPROG:$("#pstorespprog").val(),
					TELEMPRESA:$("#telempresa").val(),
					AYUDA:$("#ayuda").val(),
					MONTO:$("#monto").val(),
					INICIO:$("#inicio").val(),
					HORARIO:"LUNES A VIERNES 08:00 - 16:00",
					HORAS:"500",
					TERMINO:$("#termino").val(),
					EMPRESA:$("#empresa").val(),
					MODALIDAD:$("#modalidad").val(),
					PUESTO:$("#puesto").val(),
					REPRESENTANTE:$("#representante").val(),
					PROGRAMA:$("#programa").val(),
					TIPOPROG:$("#tipoprog").val(),
					DIRECCION:$("#direccion").val(),
					FECHACOM:$("#fechacom").val(),
					TIPOPROGADD:$("#tipoprogadd").val(),
					ACTIVIDADES:$("#actividades").val(),
					USUARIO:usuario,
					FECHAUS:fecha,
					_INSTITUCION: lainstitucion, 
					_CAMPUS: elcampus}						
					$.ajax({
							type: "POST",
							url:"../base/inserta.php",
							data: parametros,
							success: function(data){ 
								console.log(data);
								 ocultarEspera("esperaInf");  
								 ocultarEspera("infoError"); 
								   							
							
								}
							});	
					OpcionesServicio();
								
		 }
		 else {alert ("No ha capturado toda la información de su solicitud");}
	}


	function actualizaDatos(elid){
		vacios=false;
		$('.captProy').each(function(){
			if($(this).val()==""){
				$(this).css("border-color","red");
				vacios=true;
			}
		 });
		 if (!vacios) {
			mostrarEspera("esperaInf","grid_pa_servsoc","Cargando Datos...");
			fecha=dameFecha("FECHAHORA");
			parametros={tabla:"ss_alumnos",
					bd:"Mysql",
					campollave:"ID",
					valorllave:elid,
					MATRICULA:usuario,
					AVANCE:porcReal,
					RESPPROG:$("#respprog").val(),
					PSTORESPPROG:$("#pstorespprog").val(),
					TELEMPRESA:$("#telempresa").val(),
					AYUDA:$("#ayuda").val(),
					MONTO:$("#monto").val(),
					CICLO:miciclo,
					INICIO:$("#inicio").val(),
					TERMINO:$("#termino").val(),
					EMPRESA:$("#empresa").val(),
					PUESTO:$("#puesto").val(),
					HORARIO:"LUNES A VIERNES 08:00 - 16:00",
					HORAS:"500",
					REPRESENTANTE:$("#representante").val(),
					PROGRAMA:$("#programa").val(),
					MODALIDAD:$("#modalidad").val(),
					TIPOPROG:$("#tipoprog").val(),
					DIRECCION:$("#direccion").val(),
					FECHACOM:$("#fechacom").val(),
					TIPOPROGADD:$("#tipoprogadd").val(),
					ACTIVIDADES:$("#actividades").val(),
					USUARIO:usuario,
					FECHAUS:fecha,
					_INSTITUCION: lainstitucion, 
					_CAMPUS: elcampus}						
					$.ajax({
							type: "POST",
							url:"../base/actualiza.php",
							data: parametros,
							success: function(data){ 
								console.log(data);
								 ocultarEspera("esperaInf");  
								 ocultarEspera("infoError"); 								   														
								}
							});		
							OpcionesServicio();
							
		 }
		 else {alert ("No ha capturado toda la información de su solicitud");}
	}


	function  verProyecto(){

		elsql="select ID, count(*) as HAY from ss_alumnos a where  CICLO='"+miciclo+"' and MATRICULA='"+usuario+"'";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){
				misdatos=JSON.parse(data);
				if (misdatos[0]["HAY"]>0) {
					enlace="nucleo/pa_servsoc/solicitud.php?id="+misdatos[0]["ID"];
					abrirPesta(enlace, "Solic.");
				} 
				else {alert ("No se ha capturado aún los datos de la Solicitud");}
			}
		});
	
	}


	function  verCartaCom(){

		elsql="select ID, count(*) as HAY from ss_alumnos a where  CICLO='"+miciclo+"' and MATRICULA='"+usuario+"'";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){
				misdatos=JSON.parse(data);
				if (misdatos[0]["HAY"]>0) {
					enlace="nucleo/pa_servsoc/cartaCom.php?id="+misdatos[0]["ID"];
					abrirPesta(enlace, "Solic.");
				} 
				else {alert ("No se ha capturado aún los datos de la Solicitud");}
			}
		});
	
	}


	function enviarSol() {

		elsql="select ID, NOMBRE, URES_JEFE, count(*) as HAY from vss_alumnos a, fures b where  b.URES_URES=521 AND CICLO='"+miciclo+"' and MATRICULA='"+usuario+"' group by ID, NOMBRE, URES_JEFE";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){
				misdatos=JSON.parse(data);
				if (misdatos[0]["HAY"]>0) {
					var hoy= new Date();
					lafecha=hoy.getDate()+"/"+hoy.getMonth()+"/"+hoy.getFullYear()+" "+ hoy.getHours()+":"+hoy.getMinutes();
					parametros={tabla:"ss_alumnos",
							bd:"Mysql",
							campollave:"ID",
							valorllave:misdatos[0]["ID"],
							ENVIADA:'S',
							FECHAENVIO:lafecha
					};

					nombreuser=misdatos[0]["NOMBRE"];
					eljefe=misdatos[0]["URES_JEFE"];

					$.ajax({
						type: "POST",
						url:"../base/actualiza.php",
						data: parametros,
						success: function(data){ 
							$("#servicio").html("<div class=\"alert alert-warning\" style=\"width:100%;\">"+ 									        
							"    Tu Solicitud ya fue enviada"+
							"</div>");	
							
							correoPersona(eljefe, "<html>El alumno <span style=\"color:green\"><b>"+usuario+" "+nombreuser+
							"</b></span> ha capturado su solicitud para Servicio Social, "+
							"Favor de Revisarlo para proceder a su autorizaci&oacute;n <BR>","SOLICITUD SERVICIO SOCIAL "+usuario+" "+nombreuser);			

							setNotificacion(eljefe,"Sol. Serv. Social "+usuario+" "+nombreuser,"","",lainstitucion,elcampus);
							}
					});
				}					
			else {alert ("Todos los datos son necesarios, por favor llene todos los campos");}
			}
		});
	}