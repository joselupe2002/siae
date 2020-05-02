
<?php 

    session_start(); if (($_SESSION['inicio']==1)){ 
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	$nivel="../../";
?> 
<!DOCTYPE html>
<html lang="es">
	<head>
	    <link rel="icon" type="image/gif" href="imagenes/login/sigea.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="<?php echo $_SESSION['encode'];?>" />
		<link href="imagenes/login/sigea.png" rel="image_src" />
		<title><?php echo $_SESSION["titApli"];?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		
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

			<!-- page specific plugin styles -->
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-part2.min.css" class="ace-main-stylesheet" />
		<script src="<?php echo $nivel; ?>assets/js/ace-extra.min.js"></script>
			
	</head>

<body style="background-color: white;">
   
 <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div> 

 <div class="panel panel-success">
    <div class="panel-heading"> <b>
           <?php echo $_GET["ht"]; ?>
     </div> <!--  Del container -->
 </div> <!--  Del panel-success -->
 
 
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


<script src="<?php echo $nivel; ?>assets/js/markdown.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-markdown.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.hotkeys.index.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-wysiwyg.min.js"></script>


<script type="text/javascript">
        var textosel="";
        var losdatos = new Array();
        
		$(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});

	
</script>

	</body>
<?php } else {header("Location: index.php");}?>
</html>
