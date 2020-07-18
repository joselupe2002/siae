<?php session_start(); if (($_SESSION['inicio']==1)) {
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
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery.gritter.min.css" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/chosen.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />
        

		<style type="text/css">
		       table.dataTable tbody tr.selected {color: blue; font-weight:bold;}
			   table.dataTable tbody td {padding:4px;}
               th, td { white-space: nowrap; }        
        </style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white; width:98%;">
	   
	<div class="row">  
		<div class="col-sm-4"  style="text-align:center;">   				
			<span class="profile-picture" style="text-align:center;">
				<img id="foto"  style="width: 80px; height: 90px;" class="img-responsive" src="../../imagenes/menu/esperar.gif"/>				
			</span>			
		</div>
		<div class="col-sm-8">   
			<div class="row"> 
				<div class="col-sm-4" style="text-align:center;">  
					<div class="infobox-progress" title="Total de Créditos que tiene aprobados">
						<div id="elavance" id="porcavance" class="easy-pie-chart percentage" data-color="green" data-percent="0" data-size="100">
							<span id="etelavance"  class="percent"></span>%
						</div>
					</div>
					<div class="infobox-data">
						<span id="etelavance2" class="fontRobotoB infobox-text bigger-120 text-success">Real</span>
					</div>
					
				</div>
				<div class="col-sm-4" style="text-align:center;">
					<div class="infobox-progress" title="Total de Créditos de las asignaturas que esta cursando" >
						<div id="posible"  class="easy-pie-chart percentage" data-color="blue" data-percent="0" data-size="100">
							<span id="etposible"  class="percent"></span>%
						</div>
					</div>
					<div class="infobox-data">
						<span  id="etposible2" class="fontRobotoB infobox-text bigger-120 text-primary">Posibles</span>
					</div>
				</div>
				<div class="col-sm-4" style="text-align:center;">
					<div class="infobox-progress" title="Total de Créditos que pudierá acumular en caso de que apruebe las asignaturas que esta cursando">
						<div id="proyectados"  class="easy-pie-chart percentage" data-color="red" data-percent="0" data-size="100">
							<span id="etproyectados"  class="percent"></span>%
						</div>
					</div>
					<div class="infobox-data" >
						<span id="etproyectados2"  class="fontRobotoB infobox-text bigger-120 text-danger">Proyectados</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row">  
		<div class="col-sm-4">   
		    <div class="profile-user-info"> 
				<div><div class="fontRobotoB" id="nombre" style=" text-align:center; background-color:#77BBD2;"></div></div> 
		    </div>

			<div class="profile-user-info profile-user-info-striped">    				
				<div class="profile-info-row"><div class="profile-info-name fontRobotoB">Matricula</div>
					<div class="profile-info-value"><i class="fa fa-user light-orange bigger-110"></i>
						<span class="fontRoboto" id="matricula"></span>
					</div>
				</div>	
				<div class="profile-info-row"><div class="profile-info-name fontRobotoB">Plan:</div>
					<div class="profile-info-value"><i class="fa fa-user light-orange bigger-110"></i>
						<span class="fontRoboto" id="mapa"></span>
					</div>
				</div>		
				<div class="profile-info-row"><div class="profile-info-name fontRobotoB">Especialidad:</div>
					<div class="profile-info-value"><i class="fa fa-user light-orange bigger-110"></i>
						<span class="fontRoboto" id="especialiad"></span>
					</div>
				</div>	
				<div class="profile-info-row"><div class="profile-info-name fontRobotoB">Carrera:</div>
					<div class="profile-info-value"><i class="fa fa-user light-orange bigger-110"></i>
						<span class="fontRoboto" id="carrera"></span>
					</div>
				</div>			
			</div>
		</div>

		<div id="servicio" class="col-sm-8" style="text-align:center;">   
			

		</div>

	</div>

<!-- ============================================================================================================-->			
		 							
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
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>

<script src="<?php echo $nivel; ?>assets/js/jquery.gritter.min.js"></script>

<script src="<?php echo $nivel; ?>assets/js/jquery.easypiechart.min.js"></script>

<!-- -------------------Exportación de tabla a excel----------------------->
<script src="<?php echo $nivel; ?>js/FileSaver.min.js"></script>
<script src="<?php echo $nivel; ?>js/tableexport.js"></script>



<script src="pa_servsoc.js?v=<?php echo date('YmdHis'); ?>"></script>
<script type="text/javascript">
	var usuario="<?php echo $_SESSION["usuario"];?>";
	var maxuni=0;
</script>



</body>
<?php } else {header("Location: index.php");}?>
</html>


