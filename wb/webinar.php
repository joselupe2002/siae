<?php 
	header('Content-Type: text/html; charset=ISO-8859-1');
	include("../includes/Conexion.php");
	include("../includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../imagenes/login/sigea.png";
	$nivel="../";
	session_start();		
	$_SESSION['usuario'] = "ASPIRANTES";
	$_SESSION['nombre'] = "registro de aspirantes";
	$_SESSION['super'] = "N";
	$_SESSION['inicio'] = 1;
	$_SESSION['INSTITUCION'] = "ITSM";
	$_SESSION['CAMPUS'] = "0";
	$_SESSION['encode'] = "ISO-8859-1";
	$_SESSION['carrera'] = "1";
	$_SESSION['depto'] = "0";
	$_SESSION['titApli'] = "Sistema Gesti&oacute;n Escolar - Administrativa";
	$_SESSION['bd'] = "Mysql";

	?>
<!DOCTYPE html>
<html lang="es">
	<head>
	    <link rel="icon" type="image/gif" href="../imagenes/login/sigea.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="ISO-8859-1"/>
		<title>SIGEA Sistema de Gestión Escolar - Administrativa </title>
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
	
	<?php 
		$miConex = new Conexion();
		$resultado=$miConex->getConsultaAspira("SQLite","SELECT * from INSTITUCIONES where inst_clave='".$_SESSION["INSTITUCION"]."'");
		foreach ($resultado as $row) {$titulo= $row["inst_tituloasp"]; }		
	?>



	<div style="height:10px; background-color: #040E5A;"> </div>
	<div class="container-fluid informacion" style="background-color: #DBEEEA;">   
         <div class="row">
             <div class="col-md-4" >
                   <img src="../imagenes/empresa/logo2.png" alt="" width="90px" class="img-fluid" alt="Responsive image" />  
			  </div>
			  <div class="col-md-4" >
				   <div class="text-success" style="padding:0px;  font-size:35px; font-family:'Girassol'; color:#1728A3; text-align:center; font-weight: bold;">
				   			<?php echo $titulo ?>
				    </div>
			  </div>
			  <div class="col-md-4" style="padding-top: 20px; text-align: right;">
			        <button onclick="window.open('registroCapt.php', '_blank'); " class="btn btn-white bigger-180  btn-info btn-round btn-next">
						 <i class="ace-icon fa fa-pencil green icon-on-right"></i>
						 <strong><span style="font-family:'Girassol';"class="text-primary">Registrarme</span></strong>						
					</button>
			  </div>
        </div>
    </div>
	<div style="height:10px; background-color: #040E5A;"> 
	 </div>
	 
<div style="padding-left: 30px; padding-right:30px; ">  
	<div class='space-7'></div>
	<div>
	    <div class="row"> 
			 <div class="col-sm-12 text-center">
				  <span class="fontAmaranthB text-danger bigger-300"><strong>INFORMACIÓN IMPORTANTE</strong></span> 
              </div>
		</div>
		<div class="row"> 
			 <div class="col-sm-12">
				  <span class="fontAmaranthB text-light bigger-120">Antes de iniciar tu proceso de pre-inscripción es necesario que tomes en cuente la documentación que debes tener a la mano para que sea más ágil tu registro. 
				  </span> 
              </div>
		</div>

		<?php 
			$loscolor=["badge-primary","badge-success","badge-danger","badge-pink","badge-info","badge-Secondary","badge-yellow","badge-purple",
			"badge-dark","badge-success","badge-danger","badge-pink","badge-info","badge-Secondary","badge-yellow","badge-purple"];
			$miConex = new Conexion();
			$resultado=$miConex->getConsulta($_SESSION["bd"],"SELECT * from aspobserva where TIPO='ASPIRANTES' ORDER BY orden");
			foreach ($resultado as $row) {
				echo "<div class=\"row\" style=\"padding-top: 10px; text-align:justify;\">". 
				     "     <div class=\"col-sm-12\"> ".
					 "     		<span class=\"badge ".$loscolor[$row["ORDEN"]]." bigger-120\">".$row["ORDEN"]."</span>".
					 "     		<span class=\"fontAmaranth text-light bigger-120\">".$row["OBSERVACION"]."</span>".
					 "		</div>".
					 "</div>"; 
				}		
		?>
	</div>
</div>

<?php include '../admision/pie.php'?>
	
		 							
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


<script type="text/javascript">
    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});

	co=Math.round(Math.random() * (999999 - 111111) + 111111); 
	parametros={cose:co}; $.ajax({type: "POST",url:  "../nucleo/base/iniciaPincipal.php", data:parametros, success: function(data){}});sessionStorage.setItem("co",co);

	jQuery(function($) { 
		elsql="SELECT count(*) as hay  FROM ciclosesc where CICL_REGISTROLINEA='S' order by CICL_ORDEN DESC";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../nucleo/base/getdatossqlSeg.php",
			success: function(data){	
				   if (!(JSON.parse(data)[0]["hay"]>0)) {
					  window.location.href="cerrado.php";
				   }
				   	
				  },
			error: function(data) {	                  
					   alert('ERROR: '+data);
				   }
		   });
		});
	

</script>

</body>
</html>


