var id_unico="";
var estaseriando=false;
var matser="";
var rtrim = / /g;
var elalumno="";



    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
	
        $("#info").css("display","none");

    	$('.easy-pie-chart.percentage').each(function(){
			var barColor = $(this).data('color') || '#2979FF';
			var trackColor = '#E2E2E2';
			var size = parseInt($(this).data('size')) || 72;
			$(this).easyPieChart({
				barColor: barColor,
				trackColor: trackColor,
				scaleColor: false,
				lineCap: 'butt',
				lineWidth: parseInt(size/10),
				animate:false,
				size: size
			}).css('color', barColor);
			});


          $('.chosen-select').chosen({allow_single_deselect:true}); 			
		  $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
		  $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});

		  $('[data-rel=popover]').popover({html:true});


		  $("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		 
			$.ajax({
				type: "GET",
				url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
				success: function(data){  
					addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
					" and CARR_CLAVE IN ("+data+")", "",""); 
				
					},
				error: function(data) {	                  
						alert('ERROR: '+data);
						$('#dlgproceso').modal("hide");  
					}
			});
		

			elsql="SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE, ' ',ALUM_APEPAT,' ',ALUM_APEMAT) "+
  		  		   " FROM falumnos where ALUM_CARRERAREG=0 order by ALUM_NOMBRE, ALUM_APEPAT, ALUM_APEMAT";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}	
    	$.ajax({
			 type: "POST",
			 data:parametros,
  		   url:  "../base/dameselectSeg.php",
  		   success: function(data){  
  			     $("#alumnos").empty();
				 $("#alumnos").html(data);
				 
  		       $('#alumnos').trigger("chosen:updated"); 
  		   }
    	});
       
		
		if (ext) {elalumno=lamat; verAvance(); verInfo(); ext=false;}
    });

	function change_SELECT(elemento) {
        if (elemento=='selCarreras') {
			actualizaSelect("alumnos","SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE, ' ',ALUM_APEPAT,' ',ALUM_APEMAT) "+
  		  		   " FROM falumnos where ALUM_CARRERAREG='"+$("#selCarreras").val()+"' order by ALUM_NOMBRE, ALUM_APEPAT, ALUM_APEMAT","BUSQUEDA");
			}
	}
	

	function cambiaAlumnos(){
			elalumno=$("#alumnos").val();	 	
	}

   function getInfo(materia,elalumno){
	   $('#lositems').empty();

	   elsql="SELECT a.MATCVE, b.MATE_DESCRIP, a.PDOCVE,a.LISCAL, a.PDOCVE, CONCAT(c.EMPL_NOMBRE,' ',c.EMPL_APEPAT,' ',c.EMPL_APEMAT) as PROFESORD "+
                   " FROM dlista a, cmaterias b, pempleados c "+
        		   " where a.MATCVE=b.MATE_CLAVE and  a.LISTC15=c.EMPL_NUMERO and a.ALUCTR='"+elalumno+"' and a.MATCVE='"+materia+"'";

	   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	   $.ajax({
		   type: "POST",
		   data:parametros,
           url:  "../base/getdatossqlSeg.php",
           success: function(data){  
               losdatos=JSON.parse(data);                          
               jQuery.each(losdatos, function(clave, valor) { 

            	     colorCic="label-info";
            	     if (valor.LISCAL<70) {colorCic="label-danger";}
                     $('#lositems').append("<div class=\"timeline-item clearfix\"> "+
					                           "<div class=\"timeline-info\">"+
						                           "<span class=\"label "+colorCic+" label-sm\">"+valor.PDOCVE+"</span>"+
					                           "</div>"+
					                           "<div class=\"widget-box transparent\">"+
						                           "<div class=\"widget-header widget-header-small\">"+
								                        "<h5 class=\"widget-title smaller\">"+valor.MATE_DESCRIP+"   </h5>"+
								                              "<span class=\"grey\">"+valor.PROFESORD+"</span>"+								                        
								                        "<span class=\"widget-toolbar no-border\"><i class=\"ace-icon green fa fa-star-o bigger-110\"></i>"+valor.LISCAL+"</span> "+                                           
							                       "</div>"+
					                           "</div>"+
				                             "</div>");
				 
            	     $('#modalDocument').modal({show:true, backdrop: 'static'});
	               });
           }
	 });
		 
	  
	   }

   function verAvance() {
       

	   elsql="SELECT CARR_DESCRIP, ALUM_MAPA, CLAVEOF, ALUM_ESPECIALIDAD, ALUM_ESPECIALIDADSIE "+
					   " FROM falumnos a LEFT outer JOIN especialidad c on (a.ALUM_ESPECIALIDAD=c.ID), "+
					   " ccarreras b where ALUM_CARRERAREG=CARR_CLAVE and ALUM_MATRICULA='"+elalumno+"'";
	   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	   $.ajax({
			 type: "POST",
			 data:parametros,
  		   url:  "../base/getdatossqlSeg.php",
  		   success: function(data){  
  			   losdatos=JSON.parse(data);  
			   jQuery.each(losdatos, function(clave, valor) { 
				   elmapa=valor.ALUM_MAPA;
				   laespecialidad=valor.ALUM_ESPECIALIDAD;
				   $("#lacarrera").html(valor.CARR_DESCRIP);
				   $("#lacarrerainfo").html(valor.CARR_DESCRIP);
				   $("#elmapa").html(valor.ALUM_MAPA);
				   $("#laespecialidad").html(valor.CLAVEOF);
				   $("#cveespecialidad").html(valor.ALUM_ESPECIALIDAD);
			   });
				   
  			       cargaMapa(elmapa,elalumno);
  		   }
    	});

	    }
   

    function cargaMapa(elmapa,elalumno){		
    	$("#mihoja").empty();
        laespera="<img src=\"../../imagenes/menu/esperar.gif\" style=\"background: transparent; width: 30%; height:30%;\"/>"
    	$("#fondo").css("display","block");
    	$("#fondo").empty();
    	$("#fondo").append("<img src=\"../../imagenes/menu/esperar.gif\" style=\"background: transparent; width: 100px; height: 80px\"/>");
    	
		$("#info").css("display","none");
		
		elsql="SELECT MAX(N) as N FROM (select CICL_CUATRIMESTRE,count(*) as N "+
 	    		   "from veciclmate where CICL_MAPA='"+elmapa+"' group by CICL_CUATRIMESTRE) as miscuat ";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

    	$.ajax({
			type: "POST",
			data:parametros,
 		   url:  "../base/getdatossqlSeg.php",
 		   success: function(data){  
 		       losdatos=JSON.parse(data);  
 		       jQuery.each(losdatos, function(clave, valor) { elmax=valor.N });

				   elsql2="select veciclmate.*, (SELECT COUNT(*) from `eseriacion` "+
					   " where seri_materia=cicl_materia and seri_mapa=CICL_MAPA) as numseriada from veciclmate "+
					   " where CICL_MAPA='"+elmapa+"' and (ifnull(CVEESP,0)=0 or ifnull(CVEESP,0)='"+laespecialidad+"') ORDER BY cicl_cuatrimestre, cicl_materia";

				   parametros2={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}
			       $.ajax({
					   type: "POST",
					   data:parametros2,
			           url:  "../base/getdatossqlSeg.php",
			           success: function(data){  
			           losdatos=JSON.parse(data);  

						left=5; ancho=Math.round(((305-10)/10))-5;
						arriba=8;
						alto=Math.round(((206-60)/elmax))-2;
						eltam=Math.round(ancho/3);				
						tamfin=ancho-(eltam*2);
						
						altoasig=(alto*0.70);

						periodo=losdatos[0]["CICL_CUATRIMESTRE"];
						mapa=losdatos[0]["CICL_MAPAD"];

                        // Para colocar el primero 1 
                        cad="<div style=\"font-size:12px; font-weight:bold; position: absolute; left: "+(left+(Math.round(ancho/2)))+"mm; "+
												"top:1mm; width:5mm; height:5mm;\"><span id =\"periodo_"+periodo+"\" ondblclick=\"cambiarPeriodo('"+periodo+"');\""+
												"title=\"Doble click para cambiar materias de periodos\" "+
												"class=\"pull-right badge badge-info classper\" Style=\"cursor:pointer;\">"+periodo+"</span></div>";
						$("#mihoja").append(cad);	
						
					
                   
			        	jQuery.each(losdatos, function(clave, valor) { 
				           et="";
				           if (valor.numseriada>0){et="background-color:red;";}
				           
				           if (!(periodo==valor.CICL_CUATRIMESTRE)) { 
					           left+=ancho+4; 
					           arriba=8;
					           periodo=valor.CICL_CUATRIMESTRE;
							   cad="<div style=\"font-size:12px; font-weight:bold; position: absolute; left: "+(left+(Math.round(ancho/2)))+"mm; "+
												"top:1mm; width:5mm; height:5mm;\"><span id =\"periodo_"+periodo+"\" ondblclick=\"cambiarPeriodo('"+periodo+"');\""+
												"title=\"Doble click para cambiar materias de periodos\" "+
												"class=\"pull-right badge badge-info classper\" Style=\"cursor:pointer;\">"+periodo+"</span></div>";
							   $("#mihoja").append(cad);	

					           }
                        
			        	   estiloPadre="style= \"background-color:white; position: absolute; left: "+left+"mm; top: "+arriba+"mm; width: "+ancho+"mm; height:"+alto+"mm; border: 0.1mm solid;\"";
			               estiloAsignatura="style=\"font-size:7px; font-weight:bold; text-align: center; word-wrap: break-word;  "+
			                                        "cursor:pointer; position:absolute; left: 0mm; top: 0mm; width:100%; height:"+altoasig+"mm; border-bottom: 0.1mm solid;\""+ 
			                                        "id=\""+valor.CICL_MATERIA.replace(rtrim, '')+"\" elcolor=\""+valor.CICL_COLOR+"\" seleccionado=\"0\" onclick=\"getInfo('"+valor.CICL_MATERIA+"','"+elalumno+"');\"";
										 
						 
						//alert (valor.CICL_MATERIA.replace(rtrim, ''));
                         cad="<div id=\""+valor.CICL_MATERIA.replace(rtrim, '')+"\""+estiloPadre+">"+                                     
		                            "<div "+estiloAsignatura+">"+valor.CICL_MATERIAD+" ("+valor.CICL_CLAVEMAPA+")"+
		                            "</div>"+
		                            "<div title=\"Calificaci&oacute;n con la que aprobo la asignatura\" id=\""+valor.CICL_MATERIA.replace(rtrim, '')+"_CAL\" style=\"font-size:9px; font-weight:bold; text-align: center; color:blue; position: absolute; left: 0mm; top: "+altoasig+"mm; width:"+eltam+"mm; height:"+(alto-altoasig)+"mm; border-top: 0.1mm solid black;\"></div>"+
		                            "<div title=\"Numero de veces que ha cursado la asignatura\"id=\""+valor.CICL_MATERIA.replace(rtrim, '')+"_NVE\" style=\"font-size:9px; font-weight:bold; text-align: center; color:green;  position: absolute; left: "+eltam+"mm; top: "+altoasig+"mm; width:"+eltam+"mm; height:"+(alto-altoasig)+"mm; border-top: 0.1mm solid black;\"></div>"+
		                            "<div title=\"Ciclo en el que se aprobo la asignatura\" id=\""+valor.CICL_MATERIA.replace(rtrim, '')+"_BAN\" style=\"font-size:9px; font-weight:bold; text-align: center; color:red;  position: absolute; left: "+eltam*2+"mm; top: "+altoasig+"mm; width:"+(tamfin-0.1)+"mm; height:"+(alto-altoasig)+"mm; border-top: 0.1mm solid black;\"></div>"+		                      
		                          "</div>";
		                   //console.log(cad);
                        $("#mihoja").append(cad);
                        $('[data-rel=popover]').popover({html:true});
                        arriba+=alto+2;

			             });
			
			          }
			    
				
			    }); //Ajax de busqueda de las materias 

			    marcarMaterias();
			
				 /*
				 

				 */
				
				 $('#dlgproceso').modal("hide");  

		      } //success del primer ajax
	   
        });//ajax del semestre que mas asignaturas tiene
    	

        }


    function marcarMaterias() {
	//buscamos las asignaturas que ya aprobo 
	elsql="SELECT a.MATCVE, b.MATE_DESCRIP, a.PDOCVE,a.LISCAL, a.PDOCVE FROM dlista a, cmaterias b "+
							   " where a.MATCVE=b.MATE_CLAVE and a.ALUCTR='"+elalumno+"' and a.LISCAL>=70";
							   
				parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
				 $.ajax({
					   type: "POST",
					   data:parametros,
			           url:  "../base/getdatossqlSeg.php",
			           success: function(data){  
			               losdatos=JSON.parse(data);                            
			               jQuery.each(losdatos, function(clave, valor) { 
                                 $("#"+valor.MATCVE.replace(rtrim, '')).css("background-color","#6EF2AE");
                                 $("#"+valor.MATCVE.replace(rtrim, '')+"_CAL").html(valor.LISCAL);
                                 $("#"+valor.MATCVE.replace(rtrim, '')+"_BAN").html(valor.PDOCVE);
				               });
			           }
				 });


				//buscamos las asignaturas que cursa actualmente
				elsql2="SELECT a.MATCVE, b.MATE_DESCRIP, a.PDOCVE,a.LISCAL FROM dlista a, cmaterias b "+
							   " where a.MATCVE=b.MATE_CLAVE and a.ALUCTR='"+elalumno+"' and a.PDOCVE=getciclo()";
							   
				parametros2={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}
				 $.ajax({
					   type: "POST",
					   data:parametros2,
			           url:  "../base/getdatossqlSeg.php",
			           success: function(data){   
			               losdatos=JSON.parse(data);                          
			               jQuery.each(losdatos, function(clave, valor) { 
                               $("#"+valor.MATCVE.replace(rtrim, '')).css("background-color","#77B5FF");
				               });

			               
			           }
				 });

				 elsql3="SELECT a.MATCVE, count(*) as N FROM dlista a"+
			        		   " where a.ALUCTR='"+elalumno+"' GROUP BY MATCVE";
				 parametros3={sql:elsql3,dato:sessionStorage.co,bd:"Mysql"}
				//numero de veces que ha cursado la asignatura
				 $.ajax({
					   type: "POST",
					   data:parametros3,
			           url:  "../base/getdatossqlSeg.php",
			           success: function(data){   
			               losdatos=JSON.parse(data);                          
			               jQuery.each(losdatos, function(clave, valor) { 
                               $("#"+valor.MATCVE.replace(rtrim, '')+"_NVE").html(valor.N);
				               });

			               
			           }
				 });


	}
	
	

    function imprimir(nombreDiv) {
    
        var contenido= document.getElementById(nombreDiv).innerHTML;
        var contenidoOriginal= document.body.innerHTML;

        document.body.innerHTML = contenido;
        window.print();

        document.body.innerHTML = contenidoOriginal;
   }


   function verInfo(){
	
	    laespera="<img src=\"../../imagenes/menu/esperar.gif\" style=\"background: transparent; width: 30%; height:30%;\"/>"
		$('#info').modal({show:true, backdrop: 'static'});
		$("#elpromedio").html(laespera);
				 $("#loscreditost").html(laespera);
				 $("#loscreditos").html(laespera);
				 $("#prom_cr").html(laespera);
                 $("#prom_sr").html(laespera);
				 $("#periodos").html(laespera);
				//LLenamos datos del Perfil del Alumno 
				misql="SELECT CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE, "+
				               "getPeriodos('"+elalumno+"',getciclo()) as PERIODOS,"+
					           " CARR_DESCRIP as CARRERA, getavance('"+elalumno+"') as CREDITOS, getAvanceMat('"+elalumno+"') as MATERIAS, "+
					           " getPromedio('"+elalumno+"','N') as PROMEDIO_SR, getPromedio('"+elalumno+"','S') as PROMEDIO_CR   FROM falumnos a, ccarreras b"+
							   " where a.ALUM_MATRICULA='"+elalumno+"' and a.ALUM_CARRERAREG=b.CARR_CLAVE";				
				
				 parametros={sql:misql,dato:sessionStorage.co,bd:"Mysql"}			 
			    $.ajax({
					   type: "POST",
					   data:parametros,
			           url:  "../base/getdatossqlSeg.php",
			           success: function(data){   
						   losdatos=JSON.parse(data);   
						                        
			               jQuery.each(losdatos, function(clave, valor) { 				               
                                $("#elnombre").html(valor.NOMBRE);
                                $("#lacarrerainfo").html(valor.CARRERA);
                                $("#elpromedio").html(valor.PROMEDIO);
                                $("#loscreditost").html(valor.CREDITOS.split('|')[0]);
                                $("#loscreditos").html(valor.CREDITOS.split('|')[1]);
                                $("#etelavance").html(valor.CREDITOS.split('|')[2]);                               
                                $('#elavance').data('easyPieChart').update(valor.CREDITOS.split('|')[2]);
                                $("#credpen").html(valor.CREDITOS.split('|')[0]-valor.CREDITOS.split('|')[1]+" Cr&eacute;ditos pend."); 
                                $("#matcur").html(valor.MATERIAS.split('|')[1]);
 
                                $("#matavance").html(valor.MATERIAS.split('|')[2]);
                                $("#prom_cr").html(valor.PROMEDIO_CR);
                                $("#prom_sr").html(valor.PROMEDIO_SR);

								$("#periodos").html(valor.PERIODOS);

                                $("#fondo").css("display","none");
                                $("#info").css("display","block");
                                
				               });

			               
			           }
				 });
   }


 function verInfoPerfil(){

		$('#infoPerfil').modal({show:true, backdrop: 'static'});
		//$("#elpromedio").html(laespera);
		$("#bodyperfil").empty();
		
	   $("#bodyperfil").append("<table id=tabPerfil class= \"display table-condensed table-striped "+
	           "table-sm table-bordered table-hover nowrap \" style= \"overflow-y: auto;\">"+
		"</table>");	
		$("#tabPerfil").append("<thead><tr><th style=\"text-aling:center\">ID</th><th style=\"text-aling:center\">PERFIL</th><th style=\"text-aling:center\">%</th></tr></thead>");
		$("#tabPerfil").append("<body id=\"tabbodyper\"></body>");
			

		misqlperfil="SELECT IDPER,DESCRIP,'100%' AS AVANCE FROM falumnos, perfilegreso where ALUM_MAPA=MAPA and ALUM_MATRICULA='"+elalumno+"' ORDER BY IDPER";				
		parametros={sql:misqlperfil,dato:sessionStorage.co,bd:"Mysql"}		
		$.ajax({type: "POST",
			    data:parametros,
			    url:  "../base/getdatossqlSeg.php",
			    success: function(dataperfil){   
					losdatosperfil=JSON.parse(dataperfil);  
					var cont=0; 
					jQuery.each(losdatosperfil, function(clavep, valorp) { 				               
						$("#tabPerfil").append("<tr id=\"row_"+cont+"\"></tr>");
						$("#row_"+cont).append("<td id=\"idper_"+cont+"\">"+valorp.IDPER+"</td>"+
												 "<td><span class=\"text-primary\">"+valorp.DESCRIP+"</span></td>"+
												 "<td><span id=\"avance_"+valorp.IDPER+"\" class=\"badge badge-danger\">"+valorp.AVANCE+"</td>");
						cont++;	
					});

					for (i=0; i<cont;i++) {
						misqlav="SELECT  "+$("#idper_"+i).html()+" AS IDPER,"+
								"(SELECT COUNT(*) FROM matperfil c,eciclmate d Where IDPERFIL="+$("#idper_"+i).html()+
								" and (d.CICL_MAPA='"+$("#elmapa").html()+"' and IFNULL(d.CVEESP,'0')='0' and d.CICL_MATERIA=c.MATERIA)"+
								") AS NUMMATMAPA,"+
								"(SELECT COUNT(*) FROM matperfil c,eciclmate d Where IDPERFIL="+$("#idper_"+i).html()+
								" and (d.CICL_MAPA='"+$("#elmapa").html()+"' and  d.CVEESP="+$("#cveespecialidad").html()+"  and d.CICL_MATERIA=c.MATERIA)"+
								") AS NUMMATESP,"+
								"(SELECT COUNT(*) FROM dlista e where e.ALUCTR='"+elalumno+"' and e.LISCAL>=70 and e.MATCVE IN "+
								"	(SELECT MATERIA FROM vmatperfil WHERE MAPA='"+$("#elmapa").html()+"' and IDPERFIL="+$("#idper_"+i).html()+")) AS APROBADAS"+
								" FROM DUAL ";		
								
						parametros={sql:misqlav,dato:sessionStorage.co,bd:"Mysql"}	
						$.ajax({type: "POST",
							    data:parametros,
								url:  "../base/getdatossqlSeg.php",
								success: function(dataav){   
									losdatosav=JSON.parse(dataav);  
									jQuery.each(losdatosav, function(claveav, valorav) { 
										total=parseInt(valorav.NUMMATMAPA)+parseInt(valorav.NUMMATESP);
									    $("#avance_"+valorav.IDPER).html(Math.round((parseInt(valorav.APROBADAS)/total*100),2));
									});
									
								}		
							});

                          
					}
				}		
			});
   }

   function imprimirKardex(){
	   window.open("kardex.php?matricula="+elalumno, '_blank'); 
   }


   function guardarTodos(){

   }
 