<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	include(".././includes/Conexion.php");
	include(".././includes/UtilUser.php");
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
		<meta charset=""/>
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


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
       
    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>	      
    </div>


	<div style="height:10px; background-color: #C18900;"> </div>
	<div class="container-fluid informacion">   
         <div class="row">
             <div class="col-md-4" >
                   <img src="../imagenes/empresa/logo2.png" alt="" width="50%" class="img-fluid" alt="Responsive image" />  
			  </div>
			  <div class="col-md-4" >
				   <div class="text-success" style="font-size:25px; text-align:center; font-weight: bold;">
						  Proceso de Admisión
				    </div>
				   <div class="text-primary"  style="font-size:30px; text-align:center; font-weight: bold;">2020</div>
			  </div>
			  <div class="col-md-4" >
                   
			  </div>
        </div>
    </div>
	<div style="height:10px; background-color: #C18900;"> 
     </div>


	 <div class="widget-box">
		<div class="widget-body">
			<div class="widget-main">
				<div id="fuelux-wizard-container"><div>
				<ul class="steps">
					<li data-step="1" class="active"><span class="step">1</span><span class="title">Registro</span></li>
					<li data-step="2"><span class="step">2</span><span class="title">Personales</span></li>
					<li data-step="3"><span class="step">3</span><span class="title">Payment Info</span></li>
					<li data-step="4"><span class="step">4</span><span class="title">Other Info</span></li>
				</ul>
			</div>
			<hr />
			<div class="step-content pos-rel">
				<div class="step-pane active" data-step="1">
				<form style="width: 100%" method="post" id="frmReg" name="frmReg">
					<fieldset>
						<div class="row"> 
							<div class="col-sm-1"> </div>
							<!--================ CURP DEL ASPIRANTE ======================-->
							<div class="col-sm-4"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">1</span> Clave &Uacute;nica de Registro de Población</strong> 
								</label>
								<span class="block input-icon input-icon-right">
									<input  class="UNO form-control width-100" name="CURP" id="CURP" />
									<i class="ace-icon fa fa-pencil-square"></i>
								</span>
							</div>
							<!--================ CARRERA  DEL ASPIRANTE ======================-->
							<div class="col-sm-6"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">2</span> Programa Educativo</strong> 
								</label>								
							    <Select  class="UNO form-control width-100" name="CARRERA" id="CARRERA"></SELECT>
							</div>
							<div class="col-sm-1"> </div>
						</div>
						<div class="row"> 
							<div class="col-sm-1"> </div>
							<!--================NOMBRE DEL ASPIRANTE ======================-->
							<div class="col-sm-4"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">3</span> Nombre (s)</strong> 
								</label>
								<span class="block input-icon input-icon-right">
									<input  class="UNO form-control width-100" name="NOMBRE"  id="NOMBRE" />
									<i class="ace-icon fa fa-pencil-square"></i>
								</span>
							</div>
							<!--================ PATERNO DEL ASPIRANTE ======================-->
							<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">4</span> Apellido Paterno</strong> 
								</label>
								<span class="block input-icon input-icon-right">
									<input  class="UNO form-control width-100" name="APEPAT"   id="APEPAT" />
									<i class="ace-icon fa fa-pencil-square"></i>
								</span>
							</div>
							<!--================ MATERNO DEL ASPIRANTE ======================-->
							<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">5</span> Apellido Materno</strong> 
								</label>
								<span class="block input-icon input-icon-right">
									<input  class="UNO form-control width-100" name="APEMAT"  id="APEMAT" />
									<i class="ace-icon fa fa-pencil-square"></i>
								</span>
							</div>
							<div class="col-sm-1"> </div>
						</div>
					</fieldset>
				</form>
				</div><!-- Fin del panel 1-->

				<div class="step-pane" data-step="2">
					<!--================================LINEA 1 PANEL 2 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">6</span> Nacionalidad</strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="NACIONALIDAD" id="NACIONALIDAD">
									<OPTION value="M">MEXICANA</OPTION>
									<OPTION value="E">EXTRANJERA</OPTION>
								</SELECT>
								<label class=" hide text-primary" id="NACIONALIDAD_ET">
									<strong><span class="badge badge-success">6</span> Especifique</strong> 
								</label>
								<input  class="hide DOS form-control width-100" name="NACIONALIDAD_ADD"   id="NACIONALIDAD_ADD" />
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">7</span> Fecha Nacimiento</strong> 
								</label>								
							    <div class="input-group">
    				                 <input class="form-control editandotabla date-picker" name="FECHANAC" id="FECHANAC" type="text" autocomplete="off" data-date-format="dd/mm/yyyy" /> 
	                                 <span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i></span>	                                 
	                            </div>
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">8</span> Género </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="GENERO" id="GENERO">
									<OPTION value="1">HOMBRE</OPTION>
									<OPTION value="2">MUJER</OPTION>
								</SELECT>
								
						</div>					

						<div class="col-sm-1"> </div>
					</div>
					<!--================================LINEA 2 PANEL 2 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>						
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">9</span> Estado Civil </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="EDOCIVIL" id="EDOCIVIL">									
								</SELECT>
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">10</span> Capacidad Diferente </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="CAPACIDADDIF" id="CAPACIDADDIF">
								    <OPTION value="N">NO</OPTION>
									<OPTION value="S">SI</OPTION>									
								</SELECT>
								<label class=" hide text-primary" id="CAPACIDADDIF_ET">
									<strong><span class="badge badge-success">10</span> Especifique</strong> 
								</label>
								<input  class="hide DOS form-control width-100" name="CAPACIDADDIF_ADD"   id="CAPACIDADDIF_ADD" />
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">10</span> Cuentas con alguna Beca </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="BECA" id="BECA">
								    <OPTION value="N">NO</OPTION>
									<OPTION value="S">SI</OPTION>									
								</SELECT>
								<label class=" hide text-primary" id="BECA_ET">
									<strong><span class="badge badge-success">10</span>¿Quien la otorgo?</strong> 
								</label>
								<input  class="hide DOS form-control width-100" name="BECA_ADD"   id="BECA_ADD" />
						</div>
					 </div>
					 <!--================================LINEA 3 PANEL 2 ================================-->
					 <div class="row">
					    <div class="col-sm-1"> </div>						
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">11</span> Estado de Nacimiento</strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="EDONAC" id="EDONAC">									
								</SELECT>
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">10</span> Municipio de Nacimiento </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="MUNINAC" id="MUNINAC">								  								
								</SELECT>							
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">10</span> Cuentas con alguna Beca </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="BECA" id="BECA">
								    <OPTION value="N">NO</OPTION>
									<OPTION value="S">SI</OPTION>									
								</SELECT>
								<label class=" hide text-primary" id="BECA_ET">
									<strong><span class="badge badge-success">10</span>¿Quien la otorgo?</strong> 
								</label>
								<input  class="hide DOS form-control width-100" name="BECA_ADD"   id="BECA_ADD" />
						</div>
					 </div>
					 
				</div><!-- Fin del panel 2-->
				<div class="step-pane" data-step="3">
				</div><!-- Fin del panel 3-->
				<div class="step-pane" data-step="4">
					<div class="center">
						<h3 class="green">Congrats!</h3>
							Your product is ready to ship! Click finish to continue!
					</div>
						
				</div>
			</div>
			<hr/>
		    </div>
			<div class="wizard-actions">
					<button class="btn btn-white btn-danger btn-round btn-prev">
					    <i class="ace-icon danger fa fa-arrow-left"></i>Ant
					</button>

					<button class="btn btn-white  btn-info btn-round btn-next" data-last="Finish">Sig
						<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
					</button>
			</div>
		</div><!-- /.widget-main -->
	</div><!-- /.widget-body -->


	
										
		 							
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

<script src="registro.js"></script>
<script type="text/javascript">


</script>



</body>
<?php } else {header("Location: index.php");}?>
</html>


