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
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/colorbox.min.css" />

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
						  RECORRIDO VIRTUAL
				    </div>
					<div class="text-success" style="padding:0px;  font-size:35px; font-family:'Girassol'; color:white; text-align:center; font-weight: bold;">
						  ITSM
				    </div>
			  </div>
			  <div class="col-md-4" style="padding-top: 20px; text-align: right;">
			     <a download href="ITSM.mcworld">
			        <button class="btn btn-white bigger-180  btn-info btn-round btn-next">
						 <i class="ace-icon fa fa-download orange icon-on-right"></i>
						 <strong><span style="font-family:'Girassol';"class="text-primary">Descargar Mapa Minecraft</span></strong>						
					</button>
				</a>
			  </div>
        </div>
    </div>
	<div style="height:10px; background-color: #C18900;"> 
	 </div>
	 
	 
<div style="padding-left: 30px; padding-right:30px; ">  
    <div class='space-10'></div>
    <div class="row"> 
	    <div class="col-sm-6">
		    <div class="row"> 
			    <div class="col-sm-12">
					<div class="page-header"><h1>Vídeos Minecraft<small><i class="ace-icon fa fa-angle-double-right"></i> Instituto Tecnológico Superior de Macuspana</small></h1></div><!-- /.page-header -->
				</div>
			</div>
		    <div class="row"> 
			       <div class="col-sm-4">
						 <a onclick="verVideo('5zTuOYRPKuY')" style="cursor:pointer;"> 
							 <i class="ace-icon fa fa-hand-o-right"></i> <span class="text-primary bigger-130">Intro</span>
						 </a><br/>
						 <a onclick="verVideo('pvhIf7FcXBI')" style="cursor:pointer"> 
							 <i class="ace-icon fa fa-hand-o-right"></i> <span class="text-primary bigger-130">Biblioteca</span>
						 </a><br/>
						 <a onclick="verVideo('fhnS6riecwc')" style="cursor:pointer"> 
							 <i class="ace-icon fa fa-hand-o-right"></i> <span class="text-primary bigger-130">Edificio A</span>
						 </a><br/>
						 <a onclick="verVideo('N_aGrLaZ0xw')" style="cursor:pointer"> 
							 <i class="ace-icon fa fa-hand-o-right"></i> <span class="text-primary bigger-130">Edificio B</span>
						 </a><br/>
						 <a onclick="verVideo('FcapEJxV_3c')" style="cursor:pointer"> 
							 <i class="ace-icon fa fa-hand-o-right"></i> <span class="text-primary bigger-130">Edificio C</span>
						 </a><br/>
						 <a onclick="verVideo('yXi52wt_1qI')" style="cursor:pointer"> 
							 <i class="ace-icon fa fa-hand-o-right"></i> <span class="text-primary bigger-130">Promoción 1</span>
						 </a><br/>
						 <a onclick="verVideo('9_P9TDMOY-s')" style="cursor:pointer"> 
							 <i class="ace-icon fa fa-hand-o-right"></i> <span class="text-primary bigger-130">Promoción 2</span>
					     </a><br/>
			       </div>
			       <div class="col-sm-8">
						<div class="embed-responsive embed-responsive-16by9">
                              <iframe id="elvideo2" class="embed-responsive-item" src="https://www.youtube.com/embed/5zTuOYRPKuY?rel=0&autoplay:1" allowfullscreen></iframe>
                        </div>
				   </div>				   
			</div>
			<div class="row"> 
			    <div class="col-sm-12">
					<h1 class="fontRobotoB text-danger">¿Quieres vivir una mejor Experiencia?</h1>
					<a download href="ITSM.mcworld">
			        <button class="btn btn-white bigger-180  btn-info btn-round btn-next">
						 <i class="ace-icon fa fa-download orange icon-on-right"></i>
						 <strong><span style="font-family:'Girassol';"class="text-primary">Descargar Mapa Minecraft</span></strong>						
					</button>
				</a>
				</div>
			</div>
		</div> 
		<div class="col-sm-6">
		    <div class="row"> 
			    <div class="col-sm-12">
					<div class="page-header"><h1>Galeria de Imágenes<small><i class="ace-icon fa fa-angle-double-right"></i> Instituto Tecnológico Superior de Macuspana</small></h1></div><!-- /.page-header -->
				</div>
			</div>
			<div class="row"> 
			    <div class="col-sm-12 text-center">
			        <ul class="ace-thumbnails clearfix">
						<?php for ($i=1; $i<=16; $i++) {
							 echo "<li> <a href=\"img/foto".$i.".png\" data-rel=\"colorbox\">".
							      "        <img width=\"150\" height=\"120\" src=\"img/foto".$i.".PNG\" /> ".
						          "     </a>".
					              "</li>";
							}?>
						
					
						
					</ul>					
				</div>
			</div>
		</div>	
	</div>

	<div class='space-10'></div>
	<div class="row"> 
	    <div class="col-sm-3 text-center">
		    
		</div>
		<div class="col-sm-3 text-center">
		   
		</div>
		<div class="col-sm-3 text-center">
		   
		</div>
		<div class="col-sm-3 text-center">
		   
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
								<span style="color:white;">comunicacion@macuspana.tecnm.mx</span>
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

<script src="<?php echo $nivel; ?>assets/js/jquery.colorbox.min.js"></script>



<script type="text/javascript">
    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


	jQuery(function($) {
	var $overflow = '';
	var colorbox_params = {
		rel: 'colorbox',
		reposition:true,
		scalePhotos:true,
		scrolling:false,
		previous:'<i class="ace-icon fa fa-arrow-left"></i>',
		next:'<i class="ace-icon fa fa-arrow-right"></i>',
		close:'&times;',
		current:'{current} of {total}',
		maxWidth:'100%',
		maxHeight:'100%',
		onOpen:function(){
			$overflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
		},
		onClosed:function(){
			document.body.style.overflow = $overflow;
		},
		onComplete:function(){
			$.colorbox.resize();
		}
	};

	$('.ace-thumbnails [data-rel="colorbox"]').colorbox(colorbox_params);
	$("#cboxLoadingGraphic").html("<i class='ace-icon fa fa-spinner orange fa-spin'></i>");//let's add a custom loading icon
	
	
	$(document).one('ajaxloadstart.page', function(e) {
		$('#colorbox, #cboxOverlay').remove();
   });
})


function verVideo(video) {
	$("#elvideo").attr("src",video);
	$("#elvideo2").attr("src","https://www.youtube.com/embed/"+video+"?rel=0");
	
}
</script>

</body>
</html>


