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
			        <button onclick="window.open('registroCapt.php', '_blank'); " class="btn btn-white bigger-180  btn-info btn-round btn-next">
						 <i class="ace-icon fa fa-pencil green icon-on-right"></i>
						 <strong><span style="font-family:'Girassol';"class="text-primary">Registrarme</span></strong>						
					</button>
			  </div>
        </div>
    </div>
	<div style="height:10px; background-color: #C18900;"> 
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
		<div class="row" style="padding-top: 10px; text-align:justify;"> 
			 <div class="col-sm-12">
				  <span class="badge badge-primary bigger-120">1</span>
				  <span class="fontAmaranth text-light bigger-120">Clave Única de registro de Población CURP. la cuál será tu identificador como aspirante, por lo que se debe capturar correctamente. 
				  </span> 
				  <a href="https://www.gob.mx/curp/" target="_blank"><span class="label label-white label-success middle">Consulta tu CURP</span></a>
              </div>
		</div>
		<div class="row" style="padding-top: 10px; text-align:justify;"> 
			 <div class="col-sm-12">
				  <span class="fontAmaranth badge badge-success bigger-120">2</span>
				  <span class="fontAmaranth text-light bigger-120">Número de Seguro Social del IMSS, que fue otorgado en tu Bachiller  
				  </span> 
				  <a  target="_blank" href="https://serviciosdigitales.imss.gob.mx/gestionAsegurados-web-externo/asignacionNSS;JSESSIONIDASEGEXTERNO=SpgaCff8MRCqwDIw13E4NlcwPXSkV1jKBE6u0cilknwtWuzE4o0r!-1509158015">
					  <span class="label label-white label-success middle">Consulta tu IMSS</span>
				  </a>
              </div>
		</div>
		<div class="row" style="padding-top: 10px; text-align:justify;"> 
			 <div class="col-sm-12">
				  <span class="badge badge-danger bigger-120">3</span>
				  <span class="fontAmaranth text-light bigger-120"> Constancia de Estudios de Educación Media Superior. 
					  <span class="fontAmaranth text-danger">En caso de no contar con ella por la situación actual deberá 
						                        llenar el documento de prorroga, firmarlo, escanearlo y subirlo en la sección de Constancia en formato PDF <i class="ace-icon blue fa fa-hand-o-right"></i> </span>  
				  </span> 
				  <a href="docProroga.docx">
					  <span class="label label-white label-success middle">Prorroga</span>
				  </a>
              </div>
		</div>
		<div class="row" style="padding-top: 10px; text-align:justify;"> 
			 <div class="col-sm-12">
				  <span class="badge badge-yellow bigger-120">4</span>
				  <span class="fontAmaranth text-light bigger-120"> Haber realizado el pago correspondiente de
					  <span class="fontAmaranth text-danger bigger-140"> $ 545.00 </span> por concepto de Ficha. Debe tener escaneado en formato PDF el Recibo
				  </span>
				  <a href="docCuenta.pdf" target="_blank">
					  <span class="fontAmaranth label label-white label-success middle">Datos Cuenta</span>
				  </a>
				  <br/>				  
				  <strong><span class="fontAmaranthB text-primary bigger-140">CUENTA: </span><span class="text-success bigger-140">0114349660</span></strong><br/>				   
				  <strong><span class="fontAmaranthB text-primary bigger-140">CLABE : </span><span class="text-success bigger-140">012790001143496603</span></strong><br/> 
				  <strong><span class="fontAmaranthB text-primary bigger-140">BANCO : </span><span class="text-success bigger-140">BBVA Bancomer</span></strong>
              </div>
		</div>

		<div class="row" style="padding-top: 10px; text-align:justify;"> 
			 <div class="col-sm-12">
				  <span class="badge badge-pink bigger-120">5</span>
				  <span class="fontAmaranthB  text-light bigger-140"> Deberá tener los siguientes documentos en PDF</span> 
				  <br/>				  				         
					     <span class="fontAmaranth  text-inverse bigger-140">Acta de Nacimiento</span><br/>				         
						 <span class="fontAmaranth  text-inverse bigger-140">Clave Única de registro de Población</span><br/>						 
						 <span class="fontAmaranth  text-inverse bigger-140">Número de Seguridad Social Expedida por el IMSS</span><br/>						 
						<!-- <span class="fontAmaranth  text-inverse bigger-140">Certificado de Secundaria (opcional)</span><br/>						 -->
						 <span class="fontAmaranth  text-inverse bigger-140">Constancia de estudio con calificaciones hasta 5to semestre de Bachiller o Certificado de Estudios o Prorroga debidamente firmada</span><br/>						 
						 <span class="fontAmaranth text-inverse bigger-140">Recibo de Pago</span><br/>
              </div>
		</div>

		<div class="row" style="padding-top: 10px; text-align:justify;"> 
			 <div class="col-sm-12">
				  <span class="badge badge-purple bigger-120">6</span>
				  <span class="fontAmaranth  text-light bigger-120"> Fotografía infantil (blanco y negro o a color) en formato PNG o JPEG</span> 			  
              </div>
		</div>

		<div class="row" style="padding-top: 10px; text-align:justify;"> 
			 <div class="col-sm-12">
				  <span class="badge badge-success bigger-120">7</span>
				  <strong>
				  <span class=" fontAmaranth  text-danger bigger-120"> Una vez que capture Su CURP, Carrera y Nombre Completo, su registro queda guardado y puede finalizarlo en cualquier momento.</span> 			  
				  </strong>
              </div>
		</div>

		<div class="row" style="padding-top: 10px; text-align:justify;"> 
			 <div class="col-sm-12">
				  <span class="badge badge-warning bigger-120">8</span>
				  <strong>
				  <span class="fontAmaranth  text-success bigger-120"> Al finalizar su registro si desea imprimir nuevamente su ficha, solo ingrese al registro, coloque su CURP y le dará la opción de Imprimir su Ficha</span> 			  
				  </strong>
              </div>
		</div>


	</div>
</div>

<div class='space-20'></div>
<div style="height:5px; background-color:#C40E0E;"> </div>
<div class="container-fluid informacion" >   
		 <div class="row" style="background-color: #9B0B0B;">
		     <div class="col-md-2" > </div>
             <div class="col-md-3" > 
			    <div class='space-8'></div>
			    <div class="row"> 
					<div class="col-md-12"> 
						 <span style="color:#9E9494; font-weight: bold;"> REDES SOCIALES</span>
					</div>
				 </div>
				 <div class="row"> 
				    <div class="col-md-12"> 
						 <a href="https://www.facebook.com/tecnologico.macuspana.73" target="_blank">
						 <i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
						 <span style="color:white; font-weight: bold;"> Facebook</span></a>
                    </div>

				 </div>
             </div>
			  <div class="col-md-3" >
					<div class='space-8'></div>
					<div class="row"> 
							<div class="col-md-12"> 
								<span style="color:#9E9494; font-weight: bold;"> CONTACTO</span>
							</div>
					</div>
					<div class="row"> 
							<div class="col-md-12"> 
								<i class="ace-icon fa fa-envelope-o white bigger-150"></i>
								<span style="color:white;">escolares@macuspana.tecnm.mx</span>
							</div>
					</div>				
			  </div>				

			  <div class="col-md-4" >
					<div class='space-8'></div>
					<div class="row"> 
							<div class="col-md-12"> 
								<span style="color:#9E9494; font-weight: bold;">INSTITUTO TECNOLÓGICO SUPERIOR DE MACUSPANA</span>
							</div>
					</div>
					<div class="row"> 
							<div class="col-md-12"> 
								<i class="ace-icon fa fa-map-marker green bigger-150"></i>
								<span style="color:white; font-weight: bold;"> Avenida Tecnológico s/n, Lerdo de Tejada 1ra Secc.</span>
						    </div>
					</div>
					<div class="row"> 
							<div class="col-md-12"> 								
								<span style="color:white; font-weight: bold;"> Macuspana, Tabasco, C.P. 86719</span>
						    </div>
					</div>
					
					

					
			  </div>

			  <div class="col-md-1" style="padding-top: 20px; text-align: right;">
			    
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


</script>

</body>
</html>


