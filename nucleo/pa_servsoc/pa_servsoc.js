var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var porcProyectado=0;
var porcPosible=0;
var porcReal=0;


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
			   laesp=losdatos[0]["CVEESP"];
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
															   "    Ya podrías cursar el Servicio Social, si llegas a cursar todas las asignaturas de el semestre no cerrado"+
															   "</div>");
											OpcionesServicio();
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


   function OpcionesServicio(){
	   alert ("aparecer opciones");
   }


    