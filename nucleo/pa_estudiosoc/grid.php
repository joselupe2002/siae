
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
		

        <link rel="stylesheet" href="../../css/sigea.css" />

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>



	<style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white; width:98%;">
	    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	    
	<div class="alert-success">
		<div class="row">
			<div class="col-sm-1">
				<span class="profile-picture">
					<img id="img_ALUM_FOTO"  style="width: 50px; height: 70px;" class="editable img-responsive" src=""/>
				</span>    			
			</div>
			<div class="col-sm-3" style="text-align:left;">
				<span id="nombre" class="fontRobotoB bigger-120"></span>  <br> 
				<span id="carrera" class="text-danger fontRobotoB bigger-120"></span> <br> 
				<span id="correo" class="text-primary fontRobotoB bigger-120"></span>    			
			</div>
			<div class="col-sm-6" style="text-align:center;">
				<span id="nombre" class="fontRobotoB bigger-200">ESTUDIO SOCIO-ECONÓMICO</span>  <br> 
				<span id="carrera" class="text-danger fontRobotoB bigger-200">ITSM</span> <br> 				
			</div>
			<div class="col-sm-2" style="text-align:center;">
			    <div style="padding-top:20px;">
					<button onclick="imprimirEstudio();" class="btn btn-white btn-info btn-bold">
						<i class="ace-icon fa fa-print bigger-120 pink"></i>Reporte
					</button>	
				</div>
			</div>
		</div>

	</div>
<br>
    <div class="main-content"  style="margin-left: 10px; margin-right: 10px; width: 98%;">
		<div class="tabbable">		
			<ul class="nav nav-tabs" id="myTab">

				<li class="active">
					<a data-toggle="tab" href="#servicios"><i class="purple ace-icon fa fa-cogs bigger-120"></i>1. Servicios</a>
				</li>

				<li>
					<a data-toggle="tab" href="#casa"><i class="green ace-icon fa fa-home bigger-120"></i>2. Casa</a>
				</li>

				<li>
					<a data-toggle="tab" href="#gastos"><i class="red ace-icon fa fa-dollar bigger-120"></i>3. Gastos</a>
				</li>

				<li>
					<a data-toggle="tab" href="#comunidad"><i class="blue ace-icon fa fa-map-marker bigger-120"></i>4. Comunidad</a>
				</li>

				<li>
					<a data-toggle="tab" href="#enfermedades"><i class="pink ace-icon fa fa-user-md bigger-120"></i>5. Enfermedades</a>
				</li>

			</ul>																	
				<div class="tab-content">
					<div id="servicios" class="tab-pane fade in active"></div> 					
					<div id="casa" class="tab-pane fade"></div>
					<div id="gastos" class="tab-pane fade"></div>
					<div id="comunidad" class="tab-pane fade"></div>
					<div id="enfermedades" class="tab-pane fade"></div>
					
					
				</div> <!--  Deltab content -->
		
		</div> <!--  Deltab principal -->
										 

 

 
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
<script src="<?php echo $nivel; ?>js/subirArchivos.js?v=<?php echo date('YmdHis'); ?>"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js?v=<?php echo date('YmdHis'); ?>"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<?php  if (file_exists($nivel."nucleo/".$_GET["modulo"]."/ed_".$_GET["modulo"].".js")) { ?>
<script src="<?php echo $nivel."nucleo/".$_GET["modulo"]."/ed_".$_GET["modulo"].".js?v=".date('YmdHis');?>"></script>
<?php }?>	

<script src="<?php echo $nivel; ?>assets/js/markdown.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-markdown.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.hotkeys.index.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-wysiwyg.min.js"></script>





<script src="pa_estudiosoc.js?v=<?php echo date('YmdHis'); ?>"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js?v=<?php echo date('YmdHis'); ?>"></script>



<script type="text/javascript">
   var elusuario="<?php echo $_SESSION['usuario'];?>";
   var institucion="<?php echo $_SESSION['INSTITUCION'];?>";
   var campus="<?php echo $_SESSION['CAMPUS'];?>";
</script>



	</body>
<?php } else {header("Location: index.php");}?>
</html>
