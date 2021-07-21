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
		<link rel="stylesheet"  href="<?php echo $nivel; ?>js/morris/morris.css">
		<link rel="stylesheet" href="../../css/sigea.css?v=<?php echo date('YmdHis'); ?>" />

        

		<style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white; width:98%;">
	   
	    
	<div class="widget-box widget-color-purple" id="principal">
			  <div class="widget-header widget-header-small" style="padding:0px;">
			      <div class="row" >	
				         <div id="losciclos" class="col-sm-1">
						</div> 	
						<div id="losciclos2" class="col-sm-2"></div>  
						<div id="losprofesores" class="col-sm-3"></div>
						<div id="lasmaterias" class="col-sm-3"></div>
								
						<div class="col-sm-2" style="padding-top:14px;">
						    <button title="Ver Programación" onclick="cargarProgramacion();" class="btn btn-white btn-info btn-round" value="Agregar"> 
								<i class="ace-icon green fa fa-calendar bigger-140"></i><span class="btn-small fontRoboto">Programación</span>            
							</button>													 									
						</div>
						
		            </div> 

					<div class="row hide" id="encabezado">	 
		 				<select  class="form-control"  id="selTipoCierre"></select>  
						<select  class="form-control"  id="selTipoRetraso"></select>  
			             		           
         			</div>

		      </div>

              <div class="widget-body" >
				   <div class="widget-main">						   
					       <div  class="sigeaPrin table-responsive" style="overflow-y: auto; height: 400px; width:100%;" >   												   		
						   <table id="tabFechas" class= "fontRobotoB display table-condensed table-striped table-sm table-bordered table-hover nowrap" style="width:98%;">
								
							<thead>  
									<tr>	
										<th colspan=3 style="text-align: center; background-color:#521F54; color:white;">Planeación</th> 
										<th colspan="5" style="text-align: center; background-color:#165E88; color:white;">Datos Desarrollo Académico </th> 
										<th colspan="5" style="text-align: center;  background-color:#316925;  color:white;">Datos del Profesor</th>                          																	
									</tr> 
									<tr>	
										<th style="text-align: center; background-color:#521F54; color:white;">Tema</th> 
										<th style="text-align: center; background-color:#521F54; color:white;">Inicia Prog.</th> 
										<th style="text-align: center; background-color:#521F54; color:white;">Termina Prog.</th> 

										<th style="text-align: center; background-color:#165E88; color:white;">Inicia Real</th> 
										<th style="text-align: center; background-color:#165E88; color:white;">Termina Real</th> 
										<th style="text-align: center; background-color:#165E88; color:white;">Terminada</th> 
										<th style="text-align: center; background-color:#165E88; color:white;">Motivo de Retraso</th> 	
										<th style="text-align: center; background-color:#165E88; color:white;">Obs</th> 	

										<th style="text-align: center; background-color:#316925;  color:white;">Inicia Real</th> 
										<th style="text-align: center; background-color:#316925;  color:white;">Termina Real</th> 
										<th style="text-align: center; background-color:#316925;  color:white;">Terminada</th> 
										<th style="text-align: center; background-color:#316925;  color:white;">Motivo de Retraso</th> 	
										<th style="text-align: center; background-color:#316925;  color:white;">Obs</th>                          																	
									</tr> 												
								</thead> 
							</table>
						   </div>
                       </div>
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
<script src="<?php echo $nivel; ?>assets/js/jquery.sparkline.index.min.js"></script>

<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js?v=<?php echo date('YmdHis'); ?>"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>

<script src="<?php echo $nivel; ?>assets/js/jquery.gritter.min.js"></script>

<script src="<?php echo $nivel; ?>assets/js/jquery.easypiechart.min.js"></script>

<!-- -------------------Exportación de tabla a excel----------------------->
<script src="<?php echo $nivel; ?>js/FileSaver.min.js"></script>
<script src="<?php echo $nivel; ?>js/tableexport.js"></script>


<script src="<?php echo $nivel; ?>js/morris/raphael-min.js"></script>
<script src="<?php echo $nivel; ?>js/morris/morris.min.js"></script>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>



<script src="segPlaneacion.js?v=<?php echo date('YmdHis'); ?>"></script>
<script type="text/javascript">
	var usuario="<?php echo $_SESSION["usuario"];?>";
	var carrera="<?php echo $_SESSION["carrera"];?>";
	var essuper="<?php echo $_SESSION["super"];?>";

</script>



</body>
<?php } else {header("Location: index.php");}?>
</html>


