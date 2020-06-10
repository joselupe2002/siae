
<?php session_start(); if (($_SESSION['inicio']==1)  && (strpos($_SESSION['permisos'],$_GET["modulo"])) ){ 
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
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600' rel='stylesheet' type='text/css'>		
		
		<!---------------------1----------------------------->
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/font-awesome/4.5.0/css/font-awesome.min.css" />
	
	     <!--------------------2----------------------------->
	    <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery-ui.min.css" />
	    <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/select2.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/chosen.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-datepicker3.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-datetimepicker.min.css" />			
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-colorpicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ui.jqgrid.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-select.css">	
		
		
		<!---------------------3------ultimos--------------------->
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/fonts.googleapis.com.css" />			
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-rtl.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />	

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    
	    
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>

<div class="row" style="margin-left: 10px; margin-right: 10px; width: 98%;">
      <h3 class="header smaller lighter text-success"><strong>Portafolios de Alumnos: <i class="ace-icon fa fa-angle-double-right"></i> <small id="elciclo"></small> <small id="elciclod"></small></strong></h3>
		      <div class="row">
		          <div class="col-sm-1"></div> 
		          <div class="col-sm-2"> 
		               <span class="label label-info">Ciclo</span>
			           <select class="chosen-select form-control text-success" id="ciclo" style="width: 100%;"> </select>
			      </div>
			      
		          <div class="col-sm-2"> 
		               <span class="label label-info">Profesor</span>
			           <select class="chosen-select form-control text-success"  id="profesor" style="width: 100%;"> </select>
			      </div>
		          <div class="col-sm-3"> 
		               <span class="label label-info">Asignatura</span>
			           <select id="asignaturas" style="width: 100%;"> </select>
			      </div>
		          <div class="col-sm-3"> 
		               <span class="label label-success" >Unidad</span>
			           <select id="unidades" style="width: 100%;"> </select>
		          </div> 
		          <div class="col-sm-1"></div> 
		      </div>
      <div class="space-18"></div>
      <div class="row" style="height: 300px; overflow-y: auto;  overflow-x: auto;">
          <div class="col-sm-1"></div> 
          <div class="col-sm-10" id="laTabla"></div> 
		  <div class="col-sm-1"></div> 
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

 
<!-- -------------------Primero ----------------------->
<script src="<?php echo $nivel; ?>assets/js/jquery-2.1.4.min.js"></script>
<script type="<?php echo $nivel; ?>text/javascript"> if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");</script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap.min.js"></script>

<!-- -------------------Segundo ----------------------->
<script src="<?php echo $nivel; ?>assets/js/jquery-ui.custom.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.ui.touch-punch.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/chosen.jquery.min.js"></script>

<!-- -------------------Medios ----------------------->
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
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-timepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/moment.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/daterangepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datetimepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-colorpicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.knob.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/autosize.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.inputlimiter.min.js"></script>
<script src="<?php echo $nivel; ?>js/mask.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-tag.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-select.js"></script>

<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<?php  if (file_exists($nivel."nucleo/".$_GET["modulo"]."/ed_".$_GET["modulo"].".js")) { ?>
<script src="<?php echo $nivel."nucleo/".$_GET["modulo"]."/ed_".$_GET["modulo"].".js"?>"></script>
<?php }?>	




<script type="text/javascript">
        var elciclo;
        var global,globalUni;
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 
			cargarCiclos();
			$("#ciclo").change(function(){cargarProfesores();});
			$("#profesor").change(function(){cargarMaterias();});
			$("#asignaturas").change(function(){cargarUnidades();});
			$("#unidades").change(function(){cargarPortafolios();});
	    });

		function cargarCiclos() {
			  $('#dlgproceso').modal({show:true, backdrop: 'static'});

			  elsql="SELECT CICL_CLAVE AS CICLO, CICL_DESCRIP as CICLOD from ciclosesc order by CICL_CLAVE desc";
			  parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

			  $.ajax({
				 type: "POST",
				 data:parametros,
		         url:  "../base/getdatossqlSeg.php",
		         success: function(data){
		        	   $("#ciclo").append("<option value=\"0\">Elija Ciclo</option>");
		        	   jQuery.each(JSON.parse(data), function(clave, valor) { 
		        		   $("#ciclo").append("<option value=\""+valor.CICLO+"\">"+valor.CICLO+"-"+utf8Decode(valor.CICLOD)+"</option>");							  						   
					    });

		        	    $('.chosen-select').chosen({allow_single_deselect:true}); 			
		     		    $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
		     		    $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});
		     		   $('#dlgproceso').modal("hide");   	     
		               },
		         error: function(data) {	                  
		        	        $('#dlgproceso').modal("hide"); 
	                        alert('ERROR: '+data);
		                    
		                }
		        });		       
		}


		function cargarProfesores() {
			    $('#dlgproceso').modal({show:true, backdrop: 'static'});
				elciclo=$("#ciclo").val();
				
				elsql="SELECT DISTINCT(PROFESOR), PROFESORD, CICLO "+                               
							 " FROM vcargasprof a  WHERE CICLO="+$("#ciclo").val()+" order by MATERIAD";
				parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		 	    $.ajax({
					 type: "POST",
					 data:parametros,
			         url:  "../base/getdatossqlSeg.php",
			         success: function(data){						        	     
			        	     $("#asignaturas").empty();
			        	     $("#unidades").empty();
			        	     $("#profesor").empty();
			  		         $("#asignaturas").append("<option value=\"0\">Elija Asignatura</option>");
			  		         $("#profesor").append("<option value=\"0\">Elija Profesor</option>");
			  		          $("#unidades").append("<option value=\"0\">Elija Unidad</option>");
			  			     jQuery.each(JSON.parse(data), function(clave, valor) { 	
			  				     $("#profesor").append("<option value=\""+valor.PROFESOR+"\">"+valor.PROFESOR+" "+utf8Decode(valor.PROFESORD)+"</option>");			  				     			  		
			  				   	  }); 
			  			      $('#profesor').trigger("chosen:updated");		
			  			      $('#dlgproceso').modal("hide"); 	 			      	    
			               },
			         error: function(data) {	     
			        	        $('#dlgproceso').modal("hide");              
			                    alert('ERROR: '+data);
			                    
			                }
			        });
		}

		
				

function cargarMaterias() {
	 $('#dlgproceso').modal({show:true, backdrop: 'static'});
	 elsql="SELECT ID, MATERIA, MATERIAD, SIE, SEM, CICLO "+                               
        		 " FROM vcargasprof a where ifnull(TIPOMAT,'') NOT IN ('T') and "+
				 " PROFESOR='"+$("#profesor").val()+"' and CICLO="+$("#ciclo").val()+" order by MATERIAD";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	 $.ajax({
		 type: "POST",
		 data:parametros,
         url:  "../base/getdatossqlSeg.php",
         success: function(data){
                  $("#laTabla").empty();
  	              $("#asignaturas").empty();
  	              $("#asignaturas").append("<option value=\"0\">Elija Asignatura</option>");
  		          jQuery.each(JSON.parse(data), function(clave, valor) { 	
  			            $("#asignaturas").append("<option value=\""+valor.SIE+"|"+valor.ID+"|"+valor.MATERIA+"\">"+utf8Decode(valor.MATERIAD)+"("+valor.SIE+")"+"</option>");
  			   	    });
  		          $('#dlgproceso').modal("hide");        	     
               },
         error: function(data) {	
        	        $('#dlgproceso').modal("hide");                    
                    alert('ERROR: '+data);
                }
        });
}


function cargarUnidades(){
	 $('#dlgproceso').modal({show:true, backdrop: 'static'});
	 var lamateria=$("#asignaturas").val().split("|")[2];
	 $("#laTabla").empty();
	 $("#unidades").empty();
	 $("#unidades").append("<option value=\"0\">Elija Unidad</option>");
	 elsql="select * from eunidades a where a.UNID_MATERIA='"+lamateria+"' and UNID_PRED=''";
	 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

	 $.ajax({
		 type: "POST",
		 data:parametros,
         url:  "../base/getdatossqlSeg.php",
         success: function(data){    
        	 jQuery.each(JSON.parse(data), function(clave, valor) { 	
        		 $("#unidades").append("<option value=\""+valor.UNID_ID+"\">"+utf8Decode(valor.UNID_DESCRIP)+"("+valor.UNID_NUMERO+")"+"</option>");       	     
               });
        	 $('#dlgproceso').modal("hide");  
             },
         error: function(data) {	                  
                    alert('ERROR: '+data);
                    $('#dlgproceso').modal("hide");  
                }
        });
      
}


function cargarPortafolios(){		
	 var elgrupo=$("#asignaturas").val().split("|")[0];
	 var lamateria=$("#asignaturas").val().split("|")[2];
	 var launidad=$("#unidades").val();
	 var ladefault="..\\..\\imagenes\\menu\\pdf.png";
	 $('#dlgproceso').modal({show:true, backdrop: 'static'});
	 elsql="select  "+
        		   " ALUCTR AS MATRICULA,"+
        		   " concat(ALUM_APEPAT, ' ',ALUM_APEMAT,' ',ALUM_NOMBRE) AS `NOMBRE`,"+
        		   " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+launidad+"','"+elciclo+"',ALUM_MATRICULA,MATCVE) and b.AUX='EP' order by IDDET DESC LIMIT 1),'') AS RUTAEP,"+
        		   " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+launidad+"','"+elciclo+"',ALUM_MATRICULA,MATCVE) and b.AUX='ED' order by IDDET DESC LIMIT 1),'') AS RUTAED,"+ 
        		   " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+launidad+"','"+elciclo+"',ALUM_MATRICULA,MATCVE) and b.AUX='EC' order by IDDET DESC LIMIT 1),'') AS RUTAEC,"+ 
        		   " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+launidad+"','"+elciclo+"',ALUM_MATRICULA,MATCVE) and b.AUX='EA' order by IDDET DESC LIMIT 1),'') AS RUTAEA, "+
        		   " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+elciclo+"',ALUM_MATRICULA,MATCVE) and b.AUX='ENCUADRE'  order by IDDET DESC LIMIT 1),'') AS RUTAENCU,"+
        		   " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+elciclo+"',ALUM_MATRICULA,MATCVE) and b.AUX='DIAGNOSTICA'  order by IDDET DESC LIMIT 1),'') AS RUTADIAG "+
        		   " from dlista u, falumnos z where u.ALUCTR=z.ALUM_MATRICULA and u.MATCVE='"+lamateria+"'"+
				   " AND u.LISTC15='"+ $("#profesor").val()+"' and u.GPOCVE='"+elgrupo+"' and u.PDOCVE='"+elciclo+"' ORDER BY ALUM_APEPAT, ALUM_APEMAT";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

	 $.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){   
        	   $("#laTabla").empty();
        	   $("#laTabla").append("<table id=tabHorarios class= \"table table-sm table-condensed table-bordered table-hover\" style=\"overflow-y: auto;\">"+
                       "<thead><tr><th>NO. CONTROL</th><th>NOMBRE ALUMNO</th><th>ENCUADRE</th><th>DIAGNOSTICA</th>"+
                                   "<th>EV. PROD.</th> <th>EV. DES.</th> <th>EC. CONOC.</th> <th>EC. ACT.</th>"+ 		                                	   	  
                               "</tr>"+ 
                       "</thead></table> ");
    
        	 $("#cuerpo").empty();
      	     $("#tabHorarios").append("<tbody id=\"cuerpo\">"); 
       	     jQuery.each(JSON.parse(data), function(clave, valor) { 	
		          $("#cuerpo").append("<tr id=\"row"+valor.MATRICULA+"\">");
		          $("#row"+valor.MATRICULA).append("<td><span class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+valor.MATRICULA+"</span></td>");
		          $("#row"+valor.MATRICULA).append("<td><span class=\"text-primary\" style=\"font-size:11px; font-weight:bold;\">"+valor.NOMBRE+"</span></td>");	
		          	          
		          $("#row"+valor.MATRICULA).append("<td style=\"text-align:center\"><a title=\"Ver Archivo de Evidencia Encuadre\" target=\"_blank\" href=\""+valor.RUTAENCU+"\">"+
	                                                    " <img width=\"30px\" height=\"30px\" id=\""+valor.MATRICULA+"ENCUADRE\" "+
	                                                           "src=\""+ladefault+"\" width=\"50px\" height=\"50px\"></a></td>");

		          $("#row"+valor.MATRICULA).append("<td style=\"text-align:center\"><a title=\"Ver Archivo de Evidencia Diuagn&oacute;stica\" target=\"_blank\" href=\""+valor.RUTADIAG+"\">"+
                          " <img width=\"30px\" height=\"30px\" id=\""+valor.MATRICULA+"DIAGNOSTICA\" "+
                                 "src=\""+ladefault+"\" width=\"30px\" height=\"30px\"></a></td>");

		          $("#row"+valor.MATRICULA).append("<td style=\"text-align:center\"><a title=\"Ver Archivo de Evidencia de Producto\" target=\"_blank\" href=\""+valor.RUTAEP+"\">"+
                          " <img width=\"30px\" height=\"30px\" id=\""+valor.MATRICULA+"EP\" "+
                                 "src=\""+ladefault+"\" width=\"30px\" height=\"30px\"></a></td>");

		          $("#row"+valor.MATRICULA).append("<td style=\"text-align:center\"><a title=\"Ver Archivo de Evidencia de desempe&ntilde;o\" target=\"_blank\" href=\""+valor.RUTAED+"\">"+
                          " <img width=\"30px\" height=\"30px\" id=\""+valor.MATRICULA+"ED\" "+
                                 "src=\""+ladefault+"\" width=\"30px\" height=\"30px\"></a></td>");
                  
		          $("#row"+valor.MATRICULA).append("<td style=\"text-align:center\"><a title=\"Ver Archivo de Evidencia de Conocimiento\" target=\"_blank\" href=\""+valor.RUTAEC+"\">"+
                          " <img width=\"30px\" height=\"30px\" id=\""+valor.MATRICULA+"EC\" "+
                                 "src=\""+ladefault+"\" width=\"30px\" height=\"30px\"></a></td>");

		          $("#row"+valor.MATRICULA).append("<td style=\"text-align:center\"><a title=\"Ver Archivo de Evidencia Actitud\" target=\"_blank\" href=\""+valor.RUTAEA+"\">"+
                          " <img width=\"30px\" height=\"30px\" id=\""+valor.MATRICULA+"EA\" "+
                                 "src=\""+ladefault+"\" width=\"30px\" height=\"30px\"></a></td>");
                  
		          if (valor.RUTAENCU=='') {$('#'+valor.MATRICULA+"ENCUADRE").attr('src', "..\\..\\imagenes\\menu\\pdfno.png");}
		          if (valor.RUTADIAG=='') {$('#'+valor.MATRICULA+"DIAGNOSTICA").attr('src', "..\\..\\imagenes\\menu\\pdfno.png");}
		          if (valor.RUTAEP=='') {$('#'+valor.MATRICULA+"EP").attr('src', "..\\..\\imagenes\\menu\\pdfno.png");}
		          if (valor.RUTAED=='') {$('#'+valor.MATRICULA+"ED").attr('src', "..\\..\\imagenes\\menu\\pdfno.png");}
		          if (valor.RUTAEC=='') {$('#'+valor.MATRICULA+"EC").attr('src', "..\\..\\imagenes\\menu\\pdfno.png");}
		          if (valor.RUTAEA=='') {$('#'+valor.MATRICULA+"EA").attr('src', "..\\..\\imagenes\\menu\\pdfno.png");}
		          
              });
       	       $('#dlgproceso').modal("hide"); 
            },
        error: function(data) {	  
        	      $('#dlgproceso').modal("hide");                 
                   alert('ERROR: '+data);
                   
               }
       });
     
}    
		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
