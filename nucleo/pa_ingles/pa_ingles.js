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
var miid=0;


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

		elsql="select CICL_CLAVE, CICL_DESCRIP from ciclosesc where CICL_CLAVE=getciclo()";	
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
	});
	
	
		 
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
								OpcionesServicio();		
						
					}
				});

		   }
	   });
   }  


   function OpcionesServicio(){

	$("#servicio").append("<div class=\"row\" style=\"text-align:left;\"><div id=\"documentos\" class=\"col-sm-12\" ></div></div>");

	
	elsql="SELECT RUTA,COTEJADO,IDDET,IFNULL(ATENDIDO,'N') AS ATENDIDO,count(*) AS N FROM eadjreins where AUX LIKE '"+usuario+"_"+miciclo+"_LI'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data2){ 
					laruta=""; 
					activaEliminar="S";
					losdatos2=JSON.parse(data2); 	
	
					miid=0;
					atendido=losdatos2[0]["ATENDIDO"];
					if ((losdatos2[0]["N"])>0){laruta=losdatos2[0]["RUTA"]; 
											activaEliminar=losdatos2[0]["COTEJADO"]=='N'?'S':'N';
											miid=losdatos2[0]["IDDET"];											
										}
					
					if (activaEliminar=='S') {		
						dameSubirArchivoDrive("documentos","Subir pago de liberación de Inglés","pagolib",'RECIBOREINS','pdf',
						'ID',usuario,'PAGO DE LIBERACION DE INGLÉS','eadjreins','alta',usuario+"_"+miciclo+"_LI",laruta,activaEliminar);
					} else {
						$("#documentos").append("<span class=\"badge badge-primary\">"+
										        "Recibo de Pago </span> <a href=\""+laruta+"\" target=\"_blank\" >"+
												"<img src=\"../../imagenes/menu/pdf.png\" style=\"width:25px; height:25px;\"></a><br/>");
					}
					
					

					elsql="SELECT RUTA,RESPUESTA,VALIDADO,count(*) FROM eadjlibing where AUX LIKE '"+usuario+"_"+miciclo+"_CERING'";
					parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
					$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data2){ 
									laruta=""; 
									activaEliminar="S";
									losdatos2=JSON.parse(data2); 	
					
									if ((losdatos2[0][3])>0){laruta=losdatos2[0]["RUTA"]; 
															larutares=losdatos2[0]["RESPUESTA"]; 
															activaEliminar=losdatos2[0]["VALIDADO"]=='N'?'S':'N';}
											
									if (atendido=='N') {
									     dameSubirArchivoDrive("documentos","Subir Certificado de Inglés","cering",'RECIBOREINS','pdf',
										 'ID',usuario,'CERTIFICADO DE INGÉS','eadjlibing','alta',usuario+"_"+miciclo+"_CERING",laruta,activaEliminar);
									}
									else {
										$("#documentos").append("<span class=\"badge badge-danger\">"+
										                        "Certificado de Inglés </span> <a href=\""+laruta+"\" target=\"_blank\" >"+
														"<img src=\"../../imagenes/menu/pdf.png\" style=\"width:25px; height:25px;\"></a><br/>");
									}
									

									$("#documentos").append("<div class=\"alert alert-danger\" style=\"text-align:justify;\"><i class=\"fa fa-info blue bigger-150\"/>  "+
									"Si Ingresaste en el 2015 en adelante debes subir Certificado de Inglés<br><br>"+
									"<b>Por disposición del Tecnológico Nacional de México a través de la Secretaria de Extensión y Vinculación "+
									"y La Coordinación Nacional de Lenguas Extranjeras, en la reunión realizada con la Región 8, donde participó "+
									"La Coordinación de Lengua Extranjera Macuspana y que tuvo lugar el 18 de febrero del 2021, se determinaron y "+
									"homologaron los requisitos con los que debe contar el Certificado o Constancia presentado por el estudiante, "+
									"para la obtención de la liberación del idioma inglés.<br>"+
									"<b>REQUISITOS DEL CERTIFICADO O CONSTANCIA EN EL IDIOMA INGLÉS:<b><br><br>"+
									"<span class=\"text-primary\">MANUAL DE LINEAMIENTOS ACADÉMICO-ADMINISTRATIVOS DEL TECNOLÓGICO NACIONAL DE MÉXICO, CAPÍTULO 14. LINEAMIENTO PARA LA TITULACIÓN INTEGRAL, 14.4 POLÍTICAS DE OPERACIÓN, NUMERAL 14.4.1.2:</span><br><br>"+
									"<span class=\"text-success\"><b> a) El certificado o constancia debe ser emitida por una Institución u Organismo Nacional o Internacional con validez oficial.</span><br>"+
									"<span class=\"text-success\"> b) El certificado o constancia debe validar la capacidad de ENTENDER (Escuchar, Leer), ELABORAR Y COMUNICAR DE MANERA ORAL Y ESCRITA (Hablar, Escribir) nociones estándar en el ámbito personal, así como profesional, de acuerdo al Nivel B1 del Marco Común Europeo de Referencia (MCER) para el caso del idioma inglés.</span><br><br></b>"+
									"</div>");


									//Checamos si ya hay respuesta de PDF
									elsql="SELECT RUTA FROM eadjreinsres where AUX="+miid;
									parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
									$.ajax({
											type: "POST",
											data:parametros,
											url:  "../base/getdatossqlSeg.php",
											success: function(data2){ 
											
													losdatos2=JSON.parse(data2); 	
													if (!(losdatos2[0]["RUTA"]=='')) {
														$("#documentos").append("<span class=\"badge badge-success\">"+
														"Oficio de Liberación </span> <a href=\""+losdatos2[0]["RUTA"]+"\" target=\"_blank\" >"+
														"<img src=\"../../imagenes/menu/pdf.png\" style=\"width:25px; height:25px;\"></a>");	
													}
												}
									});

							}
					});

			}
	});

	

	

}


    