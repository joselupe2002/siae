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

		elsql="select ALUM_MATRICULA, ALUM_CORREO, ALUM_FOTO, ALUM_MAPA, ALUM_ESPECIALIDAD,"+ 
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
			   $("#micorreo").html(losdatos[0]["ALUM_CORREO"]);

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
								" and CICL_TIPOMAT  IN ('RP'); ";

								parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
								$.ajax({
									type: "POST",
									data:parametros,
									url:  "../base/getdatossqlSeg.php",
									success: function(data){ 

										//========================================================
										elsql="";

										parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
										$.ajax({
											type: "POST",
											data:parametros,
											url:  "../base/getdatossqlSeg.php",
											success: function(data){ 
											}
										});

										//========================================================
										
										losdatos=JSON.parse(data); 						
										if ((porcProyectado>=80) && (losdatos[0][0]<=0)) {
											$("#servicio").html("<div class=\"alert alert-warning\" style=\"width:100%;\">"+ 									        
															   "  Podrías alcanzar los crédtios para la Residencia Profesional, si apruebas todas las asignaturas de el semestre no cerrado"+
															   "</div>");		   
										}
										if ((porcProyectado<70) && (losdatos[0][0]<=0)) {
											$("#servicio").html("<div class=\"alert alert-danger\" style=\"width:100%;\">"+ 									        
															   "    Todavía no cumples los créditos necesarios para inscribir la Residencia Profesional "+
															   "</div>");
										}
										if (losdatos[0][0]>1) {
											$("#servicio").html("<div class=\"alert alert-success\" style=\"width:100%;\">"+ 									        
															   "   Ya has cursado la Residencia Profesional "+
															   "</div>");
										}

										if ((porcReal>=70) && (losdatos[0][0]<=0)) {
											$("#servicio").html("<div class=\"alert alert-warning\" style=\"width:100%;\">"+ 									        
															   "    Ya cumples el requisito de los crédtios para cursar La Residencia Profesional"+
															   "</div>");													
											OpcionesResidencia();
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


function cargarDatosPropuesta(tipo){
	$("#servicio").append("<div class=\"fontRobotoB\" id=\"lapropuesta\" style=\"text-align:left;\"></div>");

	$("#lapropuesta").append("<div class=\"row\">"+
								 "<div class=\"col-sm-6\"> "+
									"<label>Nombre de la Empresa</label><input class=\"form-control\" id=\"empresa\"></input>"+
								"</div>"+
								"<div class=\"col-sm-6\"> "+
								    "<label>Persona para Oficio</label><input class=\"form-control\" id=\"persona\"></input>"+
								"</div>");

	$("#lapropuesta").append("<div class=\"row\">"+
								"<div class=\"col-sm-6\"> "+
								   "<label>Puesto de la Persona</label><input class=\"form-control\" id=\"puesto\"></input>"+
							   "</div>"+
							   "<div class=\"col-sm-6\"> "+
								   "<label>Dirección Empresa, (Calle, número, ciudad, estado) </label><input class=\"form-control\" id=\"direccion\"></input>"+
							   "</div>");

	$("#lapropuesta").append("<div class=\"row\">"+
								 "<div class=\"col-sm-6\"> "+
									"<label>Inicia Residencia</label>"+
									" <div class=\"input-group\"><input  class=\"form-control date-picker\"  id=\"inicia\" "+
									" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
									" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
								"</div>"+
								"<div class=\"col-sm-6\"> "+
									"<label>Termina Residencia</label>"+
									" <div class=\"input-group\"><input  class=\"form-control date-picker\"  id=\"termina\" "+
									" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
									" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
								"</div>");
	$("#lapropuesta").append("<br><div style=\"text-align:center;\"><button  onclick=\"enviarPropuesta();\" class=\"btn  btn-bold btn-danger\" value=\"Agregar\">"+
	                         "     <i class=\"ace-icon white fa fa-save bigger-200\"></i><span class=\"btn-lg\">Enviar propuesta</span>"+
	                         "</button></div>");								

	//Para los componentes de fecha 
    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
   }



   function OpcionesResidencia(){
	var abierto=false;
	elsql="select count(*) as N from ecortescal where  CICLO='"+miciclo+"'"+
	" and ABIERTO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') "+
	" Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
	" AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='RESPROF' "+
	" order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 1";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){	
			if (JSON.parse(data)[0]["N"]>0) {	
					// Verficamos si ya envio su propuesta de empresa. 
					var abierto=false;
					elsql="select a.*, count(*) as HAY FROM respropuestas a where MATRICULA='"+usuario+"' and CICLO='"+miciclo+"'";
					parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		
					$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){	
								losdatos=JSON.parse(data); 
								if (losdatos[0]["HAY"]>0) {								
										$("#servicio").append("<div class=\"alert alert-warning\" style=\"width:100%;\">"+ 									        
										"    Tu Solicitud ya fue enviada"+
										"</div>");
									}
									 
								else {cargarDatosPropuesta(0);}
							}
					});

				} //DEL SI ESTA ABIERO 
				else { console.log("No hay proceso abierto para solicitud de Residencia Profesional");
						$("#servicio").append("<div class=\"row\">"+
						"    <div class=\"col-sm-12\"> "+
						"          <div class=\"alert alert-danger\">El proceso de Solicitud de Residencia Profesional no esta abierto</div> "+
						"    </div>");
				}
			}
		}); //del ajax de busqueda de corte abierto 
	}
	
	function enviarPropuesta(){
		if (($("#puesto").val()!='') && ($("#persona").val()!='') && ($("#inicia").val()!='') && ($("#empresa").val()!='') && ($("#domicilio").val()!='')) {
			var hoy= new Date();
			lafecha=hoy.getDate()+"/"+hoy.getMonth()+"/"+hoy.getFullYear()+" "+ hoy.getHours()+":"+hoy.getMinutes();
			parametros={tabla:"respropuestas",
						bd:"Mysql",
						_INSTITUCION:"ITSM",
						_CAMPUS:"0",
						MATRICULA:usuario,
						CICLO:miciclo,					
						PUESTO:$("#puesto").val().toUpperCase(),
						DOMICILIO:$("#direccion").val().toUpperCase(),
						PERSONA:$("#persona").val().toUpperCase(),
						EMPRESA:$("#empresa").val().toUpperCase(),
						INICIA:$("#inicia").val(),
						TERMINA:$("#termina").val(),
						FECHAENVIADA:lafecha,
						USUARIO:usuario,
						FECHAUS:lafecha
					};
						$.ajax({
							type: "POST",
							url:"../base/inserta.php",
							data: parametros,
							success: function(data){ 
								$("#servicio").html("<div class=\"alert alert-warning\" style=\"width:100%;\">"+ 									        
								"    Tu Solicitud ya fue enviada"+
								"</div>");						
								}
							});
						}
		else {alert ("Todos los datos son necesarios, por favor llene todos los campos");}
	
	}