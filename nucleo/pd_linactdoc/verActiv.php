
<?php session_start(); if ($_SESSION['inicio']==1) { 
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";  
	$nivel="../../";
?> 
<!DOCTYPE html>
<html lang="es">
	<head>
	    <link rel="icon" type="image/gif" href="imagenes/login/sigea.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="<?php echo $_SESSION['encode'];?>" />
		<title><?php echo $_SESSION["titApli"];?></title>
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/font-awesome/4.5.0/css/font-awesome.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/fonts.googleapis.com.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-rtl.min.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>estilos/preloader.css" type="text/css" media="screen">         
        <link href="imagenes/login/sigea.png" rel="image_src" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ui.jqgrid.min.css" />

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="gestorActividad" style="background-color: white; width: 98%">
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
    
    <div class="page-header">        
         <div class="row">	               
		      <div class="col-sm-4"> 
		               <span class="label label-success" >Unidad </span> <span class="label label-warning" ><?php echo $_GET["materiad"] ?><small><i class="ace-icon fa fa-angle-double-right"></i><?php echo $_GET["materia"] ?></small> </span>
			           <select id="unidades" style="width: 100%;"> </select>			          
		       </div> 			       
		       <div class="col-sm-4">
		               <span class="label label-danger" >Actividad</span>
			           <select id="actividades" style="width: 100%;"> </select>
               </div>   
                <div class="col-sm-1">
		           <div class="space-8"></div>
                   <button class="btn btn-white btn-danger btn-bold" onclick="regresar();"><i class="ace-icon fa fa-reply-all bigger-120 blue"></i>Regresar    </button>
               </div>                 
	     </div>
	</div>
	<div class="widget-body">
				   <div class="widget-main">
				      <div id="opcionestabHorarios" class="row hide" >
					        <div class="col-sm-1"></div>
						    <div class="col-sm-3">
								<div class="pull-left tableTools-container" id="botonestabHorarios"></div>
							</div>
							<div class="col-sm-3">
								<input type="text" id="buscartabHorarios" placeholder="Filtrar...">	
							</div>
							<div class="col-sm-3">
								 <span class="text-success">Alum: </span><span class="badge badge-success" id="total"></span>
								 <span class="text-primary">Ent: </span><span class="badge badge-primary" id="totale"></span>
							</div>
					   </div>
					   <div class="row" style="height: 300px; overflow-y: auto;">
							<div class="col-sm-1"></div> 
							<div class="col-sm-10" id="laTabla"></div> 
							<div class="col-sm-1"></div> 
					   </div>	
                    </div>
			   </div>

   
	
	
	
		
 
<!-- DIALOGO DE ESPERA -->     
<div id="dlgproceso" class="modal fade" role="dialog">
    <div class="modal-dialog" style="width: 50%;">
     <div class="modal-content" style="vertical-align: middle;">
         <div class="modal-header" style="text-align: center;"> <p style="font-size: 16px; color: green; font-weight: bold;"> Procesando espere por favor..</p></div>
         <div class="modal-body" style="text-align: center;">
              <img src="../../imagenes/menu/esperar.gif" style="background: transparent; width: 100px; height: 80px"/>	
         </div>     
     </div>
     </div>
</div>

 
 <script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>   
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>     
<script src="<?php echo $nivel; ?>assets/js/jquery-2.1.4.min.js"></script>
<script type="<?php echo $nivel; ?>text/javascript"> if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");</script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery-ui.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.dataTables.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.dataTables.bootstrap.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/dataTables.buttons.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.flash.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.html5.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.print.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.colVis.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/dataTables.select.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-timepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/moment.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/daterangepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datetimepicker.min.js"></script>



<!-- -------------------Medios ----------------------->


<script src="<?php echo $nivel; ?>assets/js/jquery.inputlimiter.min.js"></script>
<script src="<?php echo $nivel; ?>js/mask.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-tag.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>


<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/sha/sha512.js"></script>




<script type="text/javascript">
        var todasColumnas;
        var losCriterios;
        var cuentasCal=0;
        
        
		$(document).ready(function($) { 
			var Body = $('body'); 
			Body.addClass('preloader-site'); 
			cargarUnidades(); 
			
			$("#unidades").change(function(){cargarActividades();}); 
			$("#actividades").change(function(){cargarAlumnos();});

			$('.fileSigea').ace_file_input({
				no_file:'Sin archivo ...',
				btn_choose:'Buscar',
				btn_change:'Cambiar',
				droppable:false,
				onchange:null,
				thumbnail:false, //| true | large
				whitelist:'pdf',
				blacklist:'exe|php'
				//onchange:''
				//
			});

			});
		
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});




		function cargarUnidades(){		
			 $("#laTabla").empty();
			 $("#unidades").empty();
			 $("#unidades").append("<option value=\"0\">Elija Unidad</option>");	
			 $.ajax({
		         type: "GET",
		         url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select UNID_ID, UNID_NUMERO, UNID_DESCRIP"+		        		
		        		 " from eunidades a where a.UNID_MATERIA='<?php echo $_GET["materia"]?>' and UNID_PRED=''"),
		         success: function(data){    		        	 
		        	 jQuery.each(JSON.parse(data), function(clave, valor) { 			        	 
		        		 $("#unidades").append("<option value=\""+valor.UNID_ID+"\">"+utf8Decode(valor.UNID_NUMERO+ " "+valor.UNID_DESCRIP)+"</option>");       	     
		               });
		             },
		         error: function(data) {	                  
		                    alert('ERROR: '+data);
		                }
		        });		     
			    
		}


		function cargarActividades(){		
			 var launidad=$("#unidades").val();
			 $("#laTabla").empty();
			 $("#actividades").empty();
			 $("#actividades").append("<option value=\"0\">Elija Unidad</option>");
			 $.ajax({
		         type: "GET",
		         url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select * from linactdoc a where "+
				          " GRUPO='<?php echo $_GET["grupo"];?>' and IDUNIDAD='"+$("#unidades").val()+"'"+
				          " and CICLO='<?php echo $_GET["ciclo"];?>' and PROFESOR='<?php echo $_GET["profesor"];?>'"+
				          " and MATERIA='<?php echo $_GET["materia"];?>' order by ID"),
		         success: function(data){    
		        	 jQuery.each(JSON.parse(data), function(clave, valor) { 	
		        		 $("#actividades").append("<option value=\""+valor.ID+"\">"+utf8Decode(valor.ACTIVIDAD)+"</option>");       	     
		               });
		             },
		         error: function(data) {	                  
		                    alert('ERROR: '+data);
		                }
		        });
		}

		

        function cargarAlumnos() {
			 var ladefault="..\\..\\imagenes\\menu\\pdf.png";
			 total=0; tne=0;
			 $.ajax({
		         type: "GET",
				 url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select a.ID AS ID, c.ALUM_MATRICULA AS MATRICULA, "+
						 "concat(ALUM_APEPAT,' ',ALUM_APEMAT,' ', ALUM_NOMBRE) AS NOMBRE, GPOCVE AS GRUPO, MATCVE AS MATERIA, LISTC5 AS PROFESOR,"+ 
						 "(select count(*) from lintareasobs where MATRICULA=c.ALUM_MATRICULA and IDTAREA='"+$("#actividades").val()+"') AS NUMOBS,"+
		        		 "PDOCVE as CICLO, ifnull(b.RUTA,'') AS RUTA, ifnull(b.FECHARUTA,'') as FECHARUTA,  ifnull(b.FECHAENV,'') as FECHAENV, b.REVISADA"+
		        		 " from dlista a LEFT OUTER JOIN lintareas b ON (concat('"+$("#actividades").val()+"','_',a.ALUCTR)=b.AUX), falumnos c"+ 
		        		 " where ALUCTR=ALUM_MATRICULA AND GPOCVE='<?php echo $_GET["grupo"];?>' "+
		        		 " and PDOCVE='<?php echo $_GET["ciclo"];?>' and LISTC15='<?php echo $_GET["profesor"];?>'"+
		        		 " and MATCVE='<?php echo $_GET["materia"];?>' ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE"),
		         success: function(data){    
					   $("#laTabla").empty();										   
		        	   $("#laTabla").append("<table id=tabHorarios class= \"table table-sm table-condensed table-bordered table-hover\" style=\"overflow-y: auto;\">"+
		                       "<thead><tr><th>NO. CONTROL</th><th>NOMBRE ALUMNO</th><th>TAREA</th><th>SUBIO</th><th>ENVIO</th><th>SUBIO</th><th>OBS</th><th>N.OBS</th><th>REV.</th></tr>"+ 
		                       "</thead></table> ");
		    
		        	 $("#cuerpo").empty();
		      	     $("#tabHorarios").append("<tbody id=\"cuerpo\">"); 
		       	     jQuery.each(JSON.parse(data), function(clave, valor) { 	
				          $("#cuerpo").append("<tr id=\"row"+valor.MATRICULA+"\">");
				          $("#row"+valor.MATRICULA).append("<td><span class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+valor.MATRICULA+"</span></td>");
				          $("#row"+valor.MATRICULA).append("<td><span class=\"text-primary\" style=\"font-size:11px; font-weight:bold;\">"+utf8Decode(valor.NOMBRE)+"</span></td>");	
				          	          
				          $("#row"+valor.MATRICULA).append("<td style=\"text-align:center\"><a title=\"Ver Archivo de Evidencia Encuadre\" target=\"_blank\" href=\""+valor.RUTA+"\">"+
			                                                    " <img width=\"30px\" height=\"30px\" id=\""+valor.MATRICULA+"TAREA\" "+
			                                                           "src=\""+ladefault+"\" width=\"50px\" height=\"50px\"></a></td>");
				          $("#row"+valor.MATRICULA).append("<td><span class=\"text-primary\" style=\"font-size:11px; font-weight:bold;\">"+valor.FECHARUTA+"</span></td>");
						  $("#row"+valor.MATRICULA).append("<td><span class=\"text-primary\" style=\"font-size:11px; font-weight:bold;\">"+valor.FECHAENV+"</span></td>");
						  
						  total++;
						  cadSubio='S'	
						  
						  if (valor.REVISADA=='S') { tne++; $('#'+valor.MATRICULA+"TAREA").attr('src', "..\\..\\imagenes\\menu\\pdfrev.png");}	
						  if (valor.RUTA=='') {cadSubio='N'; tne++; $('#'+valor.MATRICULA+"TAREA").attr('src', "..\\..\\imagenes\\menu\\pdfno.png");}	
						  


						  $("#row"+valor.MATRICULA).append("<td><span class=\"badge badge-primary\" style=\"font-weight:bold;\">"+cadSubio+"</span></td>");
						  
						  btnRegresa="";
						  btnFinalizar="";
						  if ((cadSubio=='S') && (valor.REVISADA=='N') ){
							  btnRegresa="<button id=\"btnreg"+valor.MATRICULA+"\" title=\"Click para hacer observación sobre la tarea y devolverla al alumno\""+
							  " class=\"btn btn-white btn-danger btn-bold\" "+
							  " onClick=\"devolverActividad('"+$("#actividades").val()+"','"+valor.MATRICULA+"','"+
							    valor.CICLO+"','"+valor.GRUPO+"','"+valor.MATERIA+"','"+valor.PROFESOR+"');\">"+
							  "Dev. Actividad</button>";	

							  btnFinalizar="<button  id=\"btnfin"+valor.MATRICULA+"\"  title=\"Click para marcar la actividad como finalizada\""+
							  " class=\"btn btn-white btn-primary btn-bold\" "+
							  " onClick=\"finalizar('"+$("#actividades").val()+"','"+valor.MATRICULA+"','"+
							    valor.CICLO+"','"+valor.GRUPO+"','"+valor.MATERIA+"','"+valor.PROFESOR+"');\">"+
							  "<i class=\"fa fa-check blue\"></i></button>";
						  }

						  if ((cadSubio=='S') && (valor.REVISADA=='S') ){btnFinalizar="<i class=\"fa fa-check green bigger-120\"><i>";}

						  $("#row"+valor.MATRICULA).append("<td>"+btnRegresa+"</td>");
						  $("#row"+valor.MATRICULA).append("<td><span title=\"Click para ver las observaciones realizadas a la tarea\" class=\"badge badge-danger\" style=\"cursor:pointer;\" "+
							  " onclick=\"mostrarObs('"+$("#actividades").val()+"','"+valor.MATRICULA+"','"+
							  valor.NUMOBS+"');\""+" style=\"color:white;\">"+valor.NUMOBS+"</span></td>");
						  $("#row"+valor.MATRICULA).append("<td id=\"rev"+valor.MATRICULA+"\">"+btnFinalizar+"</td>");
					  });
					  $("#total").html(total);
					  $("#totale").html(parseInt(total)-parseInt(tne));
					  

					  $("#botonestabHorarios").empty();
					  $("#opcionestabHorarios").addClass("hide");
					  convertirDataTable('tabHorarios');
					    
		       	         $('#dlgproceso').modal("hide"); 
		            },
		        error: function(data) {	  
		        	      $('#dlgproceso').modal("hide");                 
		                   alert('ERROR: '+data);  
		               }
		       });
            }
		
		
		function devolverActividad(idact,matricula,ciclo,grupo,materia,profesor){
			$("#confirmDevolver").empty();					
			mostrarConfirm("confirmDevolver", "gestorActividad",  "DevolverTarea",
			"<span class=\"label label-success\">Observaciones de la Tarea</span>"+
			"     <textarea id=\"obsTarea\" style=\"width:100%; height:100%; resize: none;\"></textarea>",""
			,"Devolver", "devuelve('"+idact+"','"+matricula+"','"+ciclo+"','"+grupo+"','"+materia+"','"+profesor+"');","modal-sm");
			$("#msjConfirm").empty();	
		}

		function devuelve (idact,matricula,ciclo,grupo,materia,profesor){
			lafecha=dameFecha("FECHAHORA");
			lafechaNot=dameFecha("FECHA");
			lafechaNotFin=dameFecha("FECHA",3);
		
			laobs=$("#obsTarea").val();
			$('#confirmDevolver').modal("hide");
			mostrarEspera("esperaobs","gestorActividad","Procesando...");

			parametros={tabla:"lintareas",bd:"Mysql",campollave:"AUX",valorllave:idact+"_"+matricula,ENVIADA:'N'};
			$.ajax({
				type: "POST",
				url:"../../nucleo/base/actualiza.php",
				data: parametros,
				success: function(data){    					 									 
					parametros={tabla:"lintareasobs",
								bd:"Mysql",
								_INSTITUCION:"<?php echo $_SESSION['INSTITUCION'];?>",
								_CAMPUS:"<?php echo $_SESSION['CAMPUS'];?>",
								MATRICULA:matricula,
								OBSERVACION:laobs,
								IDTAREA:idact,							
								FECHA:lafecha,
								USUARIO:"<?php echo $_SESSION['usuario'];?>"};     
			  		$.ajax({
							type: "POST",
							url:"../base/inserta.php",
							data: parametros,
							success: function(data){ 
								cargarAlumnos();
								ocultarEspera("esperaobs");					            	
							}
						});
				
					//Abrimos una notificación para el alumno
					parametros={tabla:"enotificaciones",
								bd:"Mysql",
								_INSTITUCION:"<?php echo $_SESSION['INSTITUCION'];?>",
								_CAMPUS:"<?php echo $_SESSION['CAMPUS'];?>",
								ENOT_DESCRIP:"Tienes una corrección Asignatura: "+materia+" Unidad: "+$("#actividades option:selected").text(),
								ENOT_USUARIO:matricula,
								ENOT_INICIA:lafechaNot,							
								ENOT_TERMINA:lafechaNotFin,
								ENOT_ENLACE:"nucleo/pa_lintareas/grid.php?modulo=pa_lintareas",
								ENOT_TIPO:"P",
								ENOT_FECHA:lafecha,
								ENOT_USER:"<?php echo $_SESSION['usuario'];?>"};     
			  		$.ajax({
							type: "POST",
							url:"../base/inserta.php",
							data: parametros,
							success: function(data){ 			            	
							}
						});
										
				}					     
			}); 

		}



		function finalizar (idact,matricula,ciclo,grupo,materia,profesor){
			lafecha=dameFecha("FECHAHORA");
			lafechaNot=dameFecha("FECHA");
			lafechaNotFin=dameFecha("FECHA",3);
	
			if (confirm("¿Seguro desea marcar la actividad como REVISADA, ya no se podrán enviar observaciones?")) {
				mostrarEspera("esperaobs","gestorActividad","Procesando...");
				parametros={tabla:"lintareas",bd:"Mysql",campollave:"AUX",valorllave:idact+"_"+matricula,REVISADA:'S'};
				$.ajax({
					type: "POST",
					url:"../../nucleo/base/actualiza.php",
					data: parametros,
					success: function(data){    					 									 
						ocultarEspera("esperaobs");	   
						$("#btnfin"+matricula).addClass("hide");								
						$("#btnreg"+matricula).addClass("hide");
						$("#rev"+matricula).html("<i class=\"fa fa-check green bigger-120\"><i>");
						$('#'+matricula+"TAREA").attr('src', "..\\..\\imagenes\\menu\\pdfrev.png");
					}					     
				}); 
			}
		

		}
			 
			 
		
		function mostrarObs(idact,matricula,numobs){
			if (numobs>0) {
				$("#infoObs").empty();
				$.ajax({
		         type: "GET",
				 url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select * from lintareasobs where "+
				        "MATRICULA='"+matricula+"' and IDTAREA='"+idact+"'"),
		         success: function(data){   
					    cad="<ol>"; 
					    jQuery.each(JSON.parse(data), function(clave, valor) { 
							cad+="<li class=\"fontRoboto text-success\" style=\"width:100%; font-size:12px; text-align:justify;\">"+
							"<strong>Fecha: "+valor.FECHA+" OBS:"+valor.OBSERVACION+"</strong></li>";
						});
					    cad+="</ol>";
						mostrarIfo("infoObs", "gestorActividad", "Observaciones Realizadas",
									"<span class=\"lead text-danger\">"+cad+
									"</span>","modal-lg");
				       }
			     });
		   }
		}

		function regresar(){
			window.location="grid.php?modulo=<?php echo $_GET["modulo"];?> ";	
			}
		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
