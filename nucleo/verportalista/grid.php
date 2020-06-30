
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


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    
	    
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>

<div class="row" style="margin-left: 10px; margin-right: 10px; width: 98%;">
      <h3 class="header smaller lighter text-success"><strong>Portafolios de Alumnos: <i class="ace-icon fa fa-angle-double-right"></i> <small id="elciclo"></small> <small id="elciclod"></small></strong></h3>
		      <div class="row">
		          <div class="col-sm-1"></div> 
		          <div class="col-sm-5"> 
		               <span class="label label-info">Asignatura</span>
			           <select id="asignaturas" style="width: 100%;"> </select>
			      </div>
		          <div class="col-sm-5"> 
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

 
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>          
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

<script src="<?php echo $nivel; ?>js/utilerias.js"></script>



<script type="text/javascript">
        var elciclo;
        var global,globalUni;
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 
			cargarMaterias();
			$("#asignaturas").change(function(){cargarUnidades();});
			$("#unidades").change(function(){cargarPortafolios();});
			});


function cargarMaterias() {

	elsql="SELECT ID, MATERIA, CONCAT(CICLO,' ',MATERIA, ' ',MATERIAD) AS MATERIAD, SIE, SEM, CICLO "+                               
        		 " FROM vcargasprof a where ifnull(TIPOMAT,'') NOT IN ('T') and "+
				 " PROFESOR='<?php echo $_SESSION['usuario']?>' and CERRADOCAL='N' order by MATERIAD";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	 $.ajax({
		 type: "POST",
		 data:parametros,
         url:  "../base/getdatossqlSeg.php",
         success: function(data){
        	 llenaAsignaturas(JSON.parse(data));	        	     
               },
         error: function(data) {	                  
                    alert('ERROR: '+data);
                }
        });
}

function llenaAsignaturas(grid_data, op){	
	       $("#laTabla").empty();
	       $("#asignaturas").empty();
	       $("#asignaturas").append("<option value=\"0\">Elija Asignatura</option>");
		   jQuery.each(grid_data, function(clave, valor) { 	
			   $("#asignaturas").append("<option value=\""+valor.SIE+"|"+valor.ID+"|"+valor.MATERIA+"\">"+utf8Decode(valor.MATERIAD)+"("+valor.SIE+")"+"</option>");
			   elciclo=valor.CICLO;
			   	});
             
}

function cargarUnidades(){		
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
             },
         error: function(data) {	                  
                    alert('ERROR: '+data);
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
        		   " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+elciclo+"',ALUM_MATRICULA,MATCVE) and b.AUX='ENCUADRE' order by IDDET DESC LIMIT 1),'') AS RUTAENCU,"+
        		   " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+elciclo+"',ALUM_MATRICULA,MATCVE) and b.AUX='DIAGNOSTICA' order by IDDET DESC LIMIT 1),'') AS RUTADIAG "+
        		   " from dlista u, falumnos z where u.ALUCTR=z.ALUM_MATRICULA and u.MATCVE='"+lamateria+"'"+
				   " AND u.LISTC15='<?php echo $_SESSION['usuario']?>' and u.GPOCVE='"+elgrupo+"' and u.PDOCVE='"+elciclo+"' ORDER BY ALUM_APEPAT, ALUM_APEMAT";				   
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
