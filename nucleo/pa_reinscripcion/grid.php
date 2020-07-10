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

		<style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
		<style type="text/css">
		       table.dataTable tbody tr.selected {color: blue; font-weight:bold;}
			   table.dataTable tbody td {padding:4px;}
               th, td { white-space: nowrap; }        
        </style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
       
	      <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>	      
                
		  <div class="row alert alert-success" style="padding:0px; margin:0px;">
		      <div id="losciclos" class="col-sm-2" ></div>			
		      <div id="elrecibo" class="col-sm-6" ></div>  
			  <div id="losbotones" class="col-sm-4" style="padding:15px;">
			   
			  </div>	
		  </div>
		          	
		  <div class="hide widget-box widget-color-white" id="principal" style="padding:0px; margin:0px;">
              <div class="widget-body">
				   <div class="widget-main" style="padding:0px;">
				       <div class="row" style="padding:0px;">	
					       <div id="loshorarios" class="col-sm-12" style="overflow-x: scroll; height:300px;" >    
						   </div>
                       </div>
					</div>
					<div class="widget-footer bg-primary" style="padding-top:5px;">
					     <div class='row'>
						      <div class="col-sm-2">
								  <span class="text-white">Créditos:  <span id="selCreditos" class="badge badge-primary">0</span></span> <br/>
								  <span class="text-white">Usuario:  <span id="elusuario" class="badge badge-danger">0</span>
								  <span style="cursor:pointer;" title="Número de asignaturas que faltan de hacer evaluación docente" 
								        onclick="verMateriasEvalDoc();" 
								        id="laevaldoc" class="badge badge-warning">0</span></span>
							  </div> 
							  <div class="col-sm-2">
								  <span title="Repitiendo segunda vez"  class="text-white">Rep|Esp:  <span id="selRepitiendo" class="badge badge-warning">0</span>
								  <span title="Repitiendo en especial" id="selEspecial" class="badge badge-danger">0</span></span><br/>
								  <span class="text-white">Avance:  <span id="selAvance" class="badge badge-success">0</span></span><br/>
							  </div> 

							  <div class="col-sm-8">
							  
							            <button title="Añadir una observación a tu propuesta de carga" onclick="addObserva();" class="btn btn-white btn-purple  btn-round"> 
											<i class="ace-icon warning fa fa-comment bigger-140"></i>Observación<span class="btn-small"></span>            
										</button>  

										<button title="Agregar asignaturas de otros periodos o de otros planes" onclick="agregarCondiciones();" class="btn btn-white btn-info btn-round" value="Agregar"> 
											<i class="ace-icon green fa fa-legal bigger-140"></i> Otras carreras<span class="btn-small"></span>            
										</button>	

								   		<button title="Ver informaci&oacute;n del Alumno" id="btnfiltrar" onclick="verInfo();" class="btn btn-white btn-success btn-round" value="Agregar"> 
											<i class="ace-icon red fa fa-info bigger-140"></i> Info<span class="btn-small"></span>            
										</button>	

							  			<button title="Verificar y guardar propuesta de horario" onclick="guardarTodos();" class="btn btn-white btn-purple  btn-round"> 
											<i class="ace-icon blue fa fa-save bigger-140"></i>Verificar y Guardar<span class="btn-small"></span>            
										</button>    

										<button title="Enviar mi horario a Jefe de División" onclick="enviarJefe();" class="btn btn-white btn-danger  btn-round"> 
											<i class="ace-icon green glyphicon glyphicon-send bigger-140"></i>Enviar Propuesta<span class="btn-small"></span>            
										</button>													
								
							  </di>					  
						</div>
					</div>
			   </div>
		</div>
	
<!-- ===============================VENTANA DE INFORMACION=================================================================-->
<div id="infoReins" class="modal fade" role="dialog" >
     <div class="modal-dialog modal-sm">
		   <div class="modal-content">
		        <div class="modal-header bg-primary">	
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								 <span class="white">&times;</span>
						 </button>
						<span class="lead text-white">Información General</span>
				 </div>
				 <div class="modal-body">
				
	                     <div class="row">
						      <div class="col-sm-12">
						           <i class="ace-icon fa fa-user icon-animated-hand-pointer blue bigger-160"></i>	
								   <strong><span class="lighter text-success " id="elnombre"></span> </strong> 							       
							   </div>
						 </div>
						 <div class="row">
	                           <div class="col-sm-12">  
							       <i class="ace-icon fa fa-book icon-animated-hand-pointer green bigger-160"></i>	
								   <strong><span class="lighter text-info " id="lacarrerainfo"></span> </strong> 		                               
                               </div>	
						 </div>   
						 <div class="row">
						      <div class="col-sm-12">
						           <i class="ace-icon fa fa-file icon-animated-hand-pointer purple bigger-160"></i>	
								   <strong><span class="lighter text-success " id="elmapa"></span> </strong> 							       
							   </div>
						 </div>
						 <div class="row">
						      <div class="col-sm-12">
						           <i class="ace-icon fa fa-chevron-circle-right icon-animated-hand-pointer red bigger-160"></i>	
								   <strong><span class="lighter text-success " id="laespecialidad"></span> </strong> 
								   <strong><span class="lighter text-success " id="laespecialidadSIE"></span> </strong> 							       
							   </div>
						 </div>
						 <div class="row">   
							   <div class="col-sm-12" style="text-align: center;">
									<span class="btn btn-app btn-sm btn-light no-hover">
										 <span id="prom_cr" class="line-height-1 bigger-170 blue"></span><br />
										  <span class="line-height-1 smaller-90"> Prom.Rep. </span>
									</span>
									<span class="btn btn-app btn-sm btn-yellow no-hover">
									      <span id="prom_sr" class="line-height-1 bigger-170">  </span><br />
										  <span class="line-height-1 smaller-90"> Promedio </span>
									</span>										
															
							   </div>
						 </div>
						 <div class="row">   
							   <div class="col-sm-12" style="text-align: center;">
							        <span class="btn btn-app btn-sm btn-pink no-hover">
									      <span id="loscreditost"  class="line-height-1 bigger-170">  </span><br />
										  <span class="line-height-1 smaller-90"> Cr&eacute;ditos </span>
									</span>
									<span class="btn btn-app btn-sm btn-success  no-hover">
									      <span id="loscreditos" class="line-height-1 bigger-170">  </span><br />
										  <span class="line-height-1 smaller-90"> Cursados </span>
									</span>
							   </div>
						</div>
	                           
	                    <div class="space-10"></div>  
						<div class="row">   
						        <div class="col-sm-6">
										<span class="text-primary"><strong>Cred. Max.:</strong></span>
										<span class="pull-right badge badge-success" id="CMA">50</span>
						        </div>		
								<div class="col-sm-6">
										<span class="text-primary"><strong>Cred. Min.:</strong></span>
									    <span class="pull-right badge badge-info" id="CMI">50</span>
								</div>
						</div>
						<div class="space-10"></div>  
						<div class="row"> 
								<div class="col-sm-6">
										<span class="text-primary"><strong>Cred. 1 Rep.:</strong></span>
										<span class="pull-right badge badge-purple" id="C1R">30</span>
								</div>		
								<div class="col-sm-6">
										<span class=" text-primary"><strong>Cred. +1:</strong></span>
										<span class="pull-right badge badge-danger" id="CM1">20</span>							    
						        </div>
						</div>
						                 
                 </div><!-- /.modal-body -->
		   </div><!-- /.modal-content -->         
	 </div><!-- /.modal-dialog -->
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
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js?v=<?php echo date('YmdHis'); ?>"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js?v=<?php echo date('YmdHis'); ?>"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>

<script src="<?php echo $nivel; ?>assets/js/jquery.gritter.min.js"></script>

<script src="<?php echo $nivel; ?>assets/js/jquery.easypiechart.min.js"></script>
<script src="<?php echo $nivel; ?>nucleo/pa_reinscripcion/pa_reinscripcion.js?v=<?php echo date('YmdHis'); ?>"></script>

</body>
<?php } else {header("Location: index.php");}?>

<script type="text/javascript">
   var usuario='<?php echo $_SESSION['usuario'];?>';
</script>

</html>


