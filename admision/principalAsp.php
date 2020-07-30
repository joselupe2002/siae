<?php session_start(); if ($_SESSION['inicio']==1) { 
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
  
	include("../includes/Conexion.php");
	include("../includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
    $logouser="../imagenes/login/sigea.png";  
    $nivel="../";
?> 
<!DOCTYPE html>
<html lang="es">
	<head>
	    <link rel="icon" type="image/gif" href="../imagenes/login/sigea.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="ISO-8859-1"/>
        <title>SIGEA Sistema de Gestión Escolar - Administrativa </title>
        <meta http-equiv="Expires" content="0" />
        <meta http-equiv="Pragma" content="no-cache" />
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

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_registro" style="background-color: white;">
       
    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>	      
    </div>


	<div style="height:10px; background-color: #C18900;"> </div>
	<div class="container-fluid informacion" style="background-color: #9B0B0B;">   
         <div class="row">
             <div class="col-md-4" >
                   <img src="../imagenes/empresa/logo2.png" alt="" width="50%" class="img-fluid" alt="Responsive image" />  
			  </div>
			  <div class="col-md-4" >
				   <div class="text-success" style="padding:0px;  font-size:35px; font-family:'Girassol'; color:white; text-align:center; font-weight: bold;">
						  PROCESO DE ADMISIÓN
				    </div>
				   <div class="text-primary"  style="padding:0px; font-size:35px; font-family:'Girassol'; color:white; text-align:center; font-weight: bold;">2020</div>
			  </div>
              <div class="col-md-4" style="padding-top: 20px; text-align: right;">
                  <img class="imgRedonda" id="fotoAsp" src="" width="35px" height="40px"></img> 
			      <span class="fontAmaranthB" style="color:lavenderblush; font-size:10px;"><?php echo $_SESSION["nombre"]; ?></span>
				 <br/> 
				  <span id="cierra" onclick="window.open('cierraSesion.php','_self');" class="badge badge-warning fontAmaranthB" 
				        style="cursor:pointer;"><i class="fa fa-reply-all bigger-110"></i> Cerrar Sesión</span>
			  </div>
        </div>
    </div>
	<div style="height:10px; background-color: #C18900;"> 
	 </div>
	 
<div  id="contenidoAsp" style="padding-left: 30px; padding-right:30px; ">  

       
</div>	

<?php include './pie.php'?>
						
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
<script src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.gritter.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.easypiechart.min.js"></script>

<script src="<?php echo $nivel; ?>assets/js/wizard.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery-additional-methods.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.maskedinput.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/select2.min.js"></script>

<script src="ex.js?v=<?php echo date('YmdHis'); ?>"></script>
<script type="text/javascript">
       var curp="<?php echo $_SESSION["usuario"] ;?>";
	   var nombre="<?php echo $_SESSION["nombre"] ;?>";
	   
	   co=Math.round(Math.random() * (999999 - 111111) + 111111); 
	   parametros={cose:co}; $.ajax({type: "POST",url:  "../nucleo/base/iniciaPincipal.php", data:parametros, success: function(data){}});sessionStorage.setItem("co",co);
	   carrera="<?php echo $_SESSION["carrera"]?>";
	   abiertoExa="<?php echo $_SESSION["abiertoExa"]?>";
	   abiertoRes="<?php echo $_SESSION["abiertoRes"]?>";
	   aceptado="<?php echo $_SESSION["aceptado"]?>";
	   carrerad="<?php echo $_SESSION["carrerad"]?>";
	   usuario="<?php echo $_SESSION["usuario"]?>";
	   idasp="<?php echo $_SESSION["idasp"]?>";
	  
	   

	   

</script>

</body>
<?php } else {header("Location: login.php");}?>
</html>

