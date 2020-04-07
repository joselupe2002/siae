
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
		<link href="imagenes/login/sigea.png" rel="image_src" />
		<title><?php echo $_SESSION["titApli"];?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600' rel='stylesheet' type='text/css'>		
		
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
		
		<!---------------------3------ultimos--------------------->
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/fonts.googleapis.com.css" />			
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-rtl.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />	
			
	</head>

<body style="background-color: white;">
 <?php $numCol=2;
       $tam=(12/$numCol);
 ?>
  <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	    
 <div class="panel panel-success">
    <div class="panel-heading"> <b><i class="ace-icon blue fa fa-pencil"></i> Nuevo <?php echo $_GET["nombre"];?></b></div>
         <div class="space-10"></div>
		 <div class="container">	
		          
		     <form style="width: 100%" method="post" id="frmReg" name="frmReg">
	               <fieldset>
          
	                   <?php 	                  	                  
	                   $resDatos=$miConex->getConsulta($_SESSION['bd'],"SELECT ".$miUtil->getCamposFrm($_GET['tabla'],$_SESSION['bd'])." FROM ".$_GET['tabla']." WHERE ".$_GET['campollave']."='".$_GET['valorllave']."'");
	                   foreach ($resDatos as $datos) {
			                   $col=$numCol;
			                   $laTabla= $_GET['tabla'];
			                   $misTabs=$miUtil->getTabs($_GET['modulo']);
			                   echo "<div class=\"tabbable\">";
			                   echo "<ul class= \"nav nav-tabs\" id=\"myTab\">\n";
			                   $c=0;
			                   $claseActive="class=\"active\"";
			                   foreach ($misTabs as $tabs) {
			                   	    echo "<li id=\"li_tabs_".$tabs[0]."\" ".$claseActive.">\n";
			                   	    if ($c==0) {$elprimeTab=$tabs[0]; $claseActive="";}
			                   	   
			                   	    echo "<a data-toggle=\"tab\" href=\"#tabs_".$tabs[0]."\"> <i class=\"green ace-icon fa fa-check bigger-120\"></i>".$tabs[0]."</a>";
			                   	    echo "</li>\n";	   
			                   	    $c++;
			                   }
			                   echo "</ul>\n";
	                  
	                   
	                   			echo "<div id=\"myTab_cont\" class=\"tab-content\">";
	                   			echo "<div id= \"tabs_".$elprimeTab."\"  class=\"tab-pane fade in active\" >\n";
	                   
			                   $rescampos=$miUtil->getCamposForm($_GET['modulo']);	                  
			                   foreach ($rescampos as $campos) {
			                   	   if (!($campos["seccion"]==$elprimeTab)) {
			                   	      $elprimeTab=$campos["seccion"];
			                   	      echo "</div><!--Por que se debe pasar a otra pestaña-->\n"; //del cierre de la linea por que se debe pasar a la otra pestaña 
			                   	      $col=$numCol;
			                   	   	  echo "</div><!-- este no se que -->\n";
			                   	   	  echo "<div id= \"tabs_".$elprimeTab."\" class=\"tab-pane fade\" >\n";
			                   	   }
	                   	   
			                       if ($col==$numCol) {echo "<div class=\"row\">\n"; $col=0; }
			                       echo "   <div class=\"col-sm-".$tam."\">\n"; 	                       
			                       echo $miUtil->getElementoEd($campos["colum_name"],$campos["tipo"],$campos["comentario"],$campos["sql"],$datos[$campos["colum_name"]],$campos["keys"]);
			                       echo "   </div><!--Cierre del colum-->\n";
			                       $col++;
			                       if  ($col==$numCol) {echo "</div><!--Cierre de colum parte dos-->\n";}
				               }
				               if  ($col<$numCol) {echo "</div><!--Cierre en caso de no completar los elementos-->\n";}
				               echo "</div><!--Cierre del ultimo tab-->\n"; //cierre del último tabs
		               
	                   } 
		?> 
		         </div> <!-- del contenido de los tabs -->
		         </div> <!-- del tab princpal de los tabs -->
				
			        
		           
	                </fieldset>
	         </form>
	        <br/>
	         <div class="row">	
				         <div class="col-sm-6" style="text-align: center;">
				               <a href="grid.php?modulo=<?php echo $_GET['modulo'];?>&nombre=<?php echo $_GET['modulo'];?>"
				               class="btn  btn-white btn-warning" role="button" style="width: 150px; height: 40px;">
				               <i class="ace-icon red fa fa-arrow-left bigger-160 "></i><span class="btn-lg">Cancelar</span></a>
				         </div>
				       
				          <div class="col-sm-6" style="text-align: center;">
				                <button  onclick="guardar();" class="btn  btn-white btn-primary" value="Agregar" style="width: 150px; height: 40px;">
				                 <i class="ace-icon blue fa fa-save bigger-160"></i><span class="btn-lg">Guardar</span>            
				                 </button>
				         </div>
				                 		            
			 </div> 	
		      <br/>		            
     </div> <!--  Del container -->
 </div> <!--  Del panel-success -->
 
 <!-- DIALOGO DE ESPERA -->     
<div id="dlgproceso" class="modal fade" role="dialog">
    <div class="modal-dialog" style="width: 50%;">
     <div class="modal-content" style="vertical-align: middle;">
         <div class="modal-header" style="text-align: center;"> <p style="font-size: 16px; color: green; font-weight: bold;"> Procesando espere por favor..</p></div>
         <div class="modal-body" style="text-align: center;">
              <img src="../../imagenes/menu/esperar.gif" style="background: transparent; width: 100px; height: 80px"/>	
         </div>     
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
<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
	

<script type="text/javascript">
        var textosel="";
        
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});


		function sonvalidos(formulario){
			var noval = 0;
			$(formulario).find("input, select").each(function () {			
			    if (!($(this).valid())) {noval++; ultimo=$(this).attr("id");}     
			});
			if (noval>0) {return ultimo;}
			else {return "";}		
		}

		function adaptarSelectBus(){
			//para los SELECT de busqueda
			if(!ace.vars['touch']) {
				$('.chosen-select').chosen({allow_single_deselect:true}); 			
				$(window).off('resize.chosen').on('resize.chosen', function() {
					       $('.chosen-select').each(function() {
						         var $this = $(this);
						         $this.next().css({'width': $this.parent().width()});
						         })
						         }).trigger('resize.chosen');
				                 $(document).on('settings.ace.chosen', function(e, event_name, event_val) {
					                 if(event_name != 'sidebar_collapsed') return; 
							             $('.chosen-select').each(function() {  
								              var $this = $(this);
								              $this.next().css({'width': $this.parent().width()});
								          })
						          });
			}
		}


		
		<?php $miUtil->getSELECTDEP($laTabla);  ?>

		
		
		jQuery(function($) { 


			<?php $miUtil->getConfInputFile($rescampos);  ?>

	        //Para los componentes de fecha 
			$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});

			adaptarSelectBus();
		
            //Para los Tabs
			$("#tabs").tabs();
			$('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {adaptarSelectBus();});

			$.validator.setDefaults({
				 ignore: [],
				 <?php echo $miUtil->getReglasVal($rescampos,"A");?>
			});
			
	  });


	  function guardar(){
			var form = $( "#frmReg" );
			form.validate();
			campo=sonvalidos(form);
			if (!(campo=="")) {
				elemento=$("#"+campo);
				pes=elemento.closest('.tab-pane').attr("id");
				$("#myTab li").removeClass("active"); 
				$("#li_"+pes).addClass("active"); 
				$("#myTab_cont div").removeClass("in active");			
				$("#"+pes).addClass("in active");
			}
			else {
				 <?php echo $miUtil->getParamSubmit($rescampos,$laTabla,"A");?>	
	        	 $('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
				        $.ajax({
			                type: "POST",
			                url:"actualiza.php",
			                data: parametros,
			                success: function(data){
				                alert (data);			
			                	$('#dlgproceso').modal("hide");  			                                	                      
				                if (!(data.substring(0,1)=="0"))	
					                 { 						                  
                                      location.href="grid.php?modulo=<?php echo $_GET['modulo']?>&nombre=<?php echo $_GET['nombre']?>";
					                  }	
				                else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
			                }					     
			            });               
				
			}

	  }
	  



</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
