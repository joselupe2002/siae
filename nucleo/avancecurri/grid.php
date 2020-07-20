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
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	   
	    
	      <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	      
		  <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	      
		  <div class="widget-box widget-color-green">
			  <div class="widget-header widget-header-small" style="padding:0px;">
			      <div class="row" >		                    				
						<div id="lascarreras" class="col-sm-3">
						</div>  								
						<div class="col-sm-3">						   
							<span class="label label-warning">Alumno</span>														
							<span class="label label-info" id="lacarrera"></span>		
							<select onchange="cambiaAlumnos();" class="chosen-select form-control" id="alumnos"></select>								
						</div>     
						<div class="col-sm-1" style="text-align: center; padding-top:14px;">
							<button title="Visualizar Datos" onclick="verAvance();" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon blue fa fa-search bigger-160"></i><span class="btn-small"> Ver Datos</span>            
							</button>
					    </div>
						<div class="col-sm-3" style="text-align: center; padding-top:10px;">	
									              										
							<button title="Imprimir avance curricular" onclick="imprimir('mihoja');" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon blue fa fa-print bigger-160"></i><span class="btn-small"></span>            
							</button>
							<button title="Informaci&oacute;n del alumno" onclick="verInfo();" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon pink glyphicon glyphicon-info-sign bigger-150"></i><span class="btn-small"></span>            
							</button>
							<button title="Informaci&oacute;n del cumplimiento del perfil de egreso" onclick="verInfoPerfil();" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon red glyphicon glyphicon-education bigger-150"></i><span class="btn-small"></span>            
							</button>
							<button title="Kardex del alumno" onclick="imprimirKardex();" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon green glyphicon glyphicon-list-alt bigger-150"></i><span class="btn-small"></span>            
							</button>	

							<button title="Marcar las materias" onclick="marcarMaterias();" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon blue glyphicon glyphicon-pushpin bigger-150"></i><span class="btn-small"></span>            
							</button>							
						</div>	  			 
						<div class="col-sm-2">	
						    <span class="label label-warning" id="elmapa">Alumno</span>														
							<span class="label label-info" id="laespecialidad"></span>
							<span class="label label-info" id="cveespecialidad"></span>	
						</div>		 			               		           
		            </div> 
		      </div>

              <div class="widget-body">
				   <div class="widget-main">
				       <div class="row" style=" overflow-x: scroll;">	
                           <div class="col-sm-12" >
                               <div id="carta" style="width: 289mm; height: 226mm; border: 0px solid;  overflow-x: scroll; padding:0px; margin:0px; ">
                               <div id="mihoja" style="position: absolute; left: 2mm; top: 1mm; width: 269mm; height: 206mm; border: 0px solid;">             
                           </div>
                       </div>
                    </div>
			   </div>
		</div>
 
    </div>
         
         
         
     
<div class="modal fade" id="modalDocument" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
      <div class="modal-dialog modal-lg "  role="document">
		   <div class="modal-content">
		         <div class="modal-header">		   
		                <button type="button" class="close" data-dismiss="modal" aria-label="Cancelar">
		                     <span aria-hidden="true">&times;</span>
		                </button>	
		          </div>
                  <div id="frmdocumentos" class="modal-body">                  
		                  <div class="timeline-container">
								    <div class="timeline-label"><span class="label label-primary arrowed-in-right label-lg"><b>Historial</b></span></div>															                        
			                        <div id="lositems" class="timeline-items">									     									     
										
									 </div> <!-- time contenedor de los items -->										 
						   </div> <!-- time contenedor principal  de los items -->                       
		          </div> <!-- del modal-body -->     
		     </div>
      </div>
</div> 



			                  
<!-- ===============================VENTANA DE INFORMACION=================================================================-->
 <div id="info" class="modal fade" role="dialog" >
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
							   <div class="col-sm-12" >
									<span class="btn btn-app btn-sm btn-light no-hover">
										 <span id="prom_cr" class="line-height-1 bigger-170 blue"></span><br />
										  <span class="line-height-1 smaller-90"> Prom.Rep. </span>
									</span>
									<span class="btn btn-app btn-sm btn-yellow no-hover">
									      <span id="prom_sr" class="line-height-1 bigger-170">  </span><br />
										  <span class="line-height-1 smaller-90"> Promedio </span>
									</span>	
									<span class="btn btn-app btn-sm btn-danger no-hover">
									      <span id="periodos" class="line-height-1 bigger-170">  </span><br />
										  <span class="line-height-1 smaller-90"> Periodos </span>
									</span>									
							   </div>
						 </div>
						 <div class="row">   
							   <div class="col-sm-12">
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
							 <div class="col-sm-12">       	                           
								<div class="infobox infobox-blue2">
									<div class="infobox-progress">
											<div id="elavance"  class="easy-pie-chart percentage" data-percent="0" data-size="50">
												<span id="etelavance"  class="percent"></span>%
											</div>
									</div>
									<div class="infobox-data">
											<span class="infobox-text">Avance Cr&eacute;ditos</span>
												<div class="infobox-content">
													<span id="credpen" class=" text-danger bigger-60"></span>
															
													</div>
									</div>
								</div>
							 </div>
						</div>
						<div class="row">   
							 <div class="col-sm-12">   	  
								<div class="infobox infobox-green">
									<div class="infobox-icon"><i class="ace-icon fa fa-sitemap"></i></div>
									<div class="infobox-data">
											<span id="matcur" class="infobox-data-number"></span>
											<div class="infobox-content">Mat. Aprobadas</div>
									</div>
									<div id="matavance" class="stat stat-success"></div>
								</div>
							  </div>				                           					 
	                     </div>	                    
                 </div><!-- /.modal-body -->
		   </div><!-- /.modal-content -->         
	 </div><!-- /.modal-dialog -->
</div>
			


			<!-- ===============================VENTANA DE INFORMACION PERFIL DE EGRESO=================================================================-->
 <div id="infoPerfil" class="modal fade" role="dialog" >
     <div class="modal-dialog modal-lg">
		   <div class="modal-content">
		        <div class="modal-header bg-primary">	
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								 <span class="white">&times;</span>
						 </button>
						<span class="lead text-white">Cumplimiento Perfil de Egreso</span>
				 </div>
				 <div class="modal-body" id="bodyperfil">				

                 </div><!-- /.modal-body -->
		   </div><!-- /.modal-content -->         
	 </div><!-- /.modal-dialog -->
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
<script src="avancecurri.js?v=<?php echo date('YmdHis'); ?>"></script>

<script type="text/javascript">
var ext=false;
var lamat="";
var lacar="";

	<?php if ( isset($_GET["matricula"])) { 
			echo "lacar='".$_GET["carrera"]."';";  
			echo "lamat='".$_GET["matricula"]."';";
			echo "ext=true;"; } ?>


</script>



</body>
<?php } else {header("Location: index.php");}?>
</html>


