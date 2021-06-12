
<?php session_start(); if (($_SESSION['inicio']==1) ){ 
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
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ui.jqgrid.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-select.css">	
		
		<!---------------------3------ultimos--------------------->
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/fonts.googleapis.com.css" />			
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-rtl.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />
		
			
	</head>

<body style="background-color: white;">
 <?php $numCol=1;
       $tam=(12/$numCol);
 ?>
<!--  
   <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
 -->
 	
 <div class="panel panel-success">
    <div class="panel-heading" ><span class="text-danger"><strong> <?php echo $_GET['descrip'];?></strong></span> </div>
         <div class="container text-info"  style="width:100%; background-color: #E1F3EF; text-align: justify;"><strong><?php echo $_GET['objetivo'];?></strong></div>
        
         <div class="space-10"></div>
		 <div class="container" id="cuerpo<?php echo $_GET['modulo'];?>">	
		          
		     <form style="width: 100%" method="post" id="frmReg" name="frmReg">
	               <fieldset>
	               
	                   <?php $laTabla="encrespuestas"; $laTablaGraba= "encrespuestas";?>
          	                        
	                   <?php $misTabs=$miUtil->getTabsEncuestas($_GET['id']); ?>
	                   <script type="text/javascript"> 
	                       bd="<?php echo $_SESSION["bd"]?>";
	                       tabs=<?php echo json_encode($misTabs);?>;</script>
	                  
	                       <?php $rescampos=$miUtil->getCamposFormEncuestas($_GET['id']); ?>
	                   <script type="text/javascript"> campos=<?php echo json_encode($rescampos);?></script>
	                  
		           
	                </fieldset>
	         </form>
	        <br/>
	         <div class="row">	
				         <div class="col-sm-6" style="text-align: center;">
				               <?php $antes=""; if ($_GET['gridpropio']=='S') { $antes="../".$_GET['modulo']."/";}	?>				                                                       				        
				               <a href="<?php echo $antes;?>grid.php?modulo=<?php echo $_GET['modulo'];?>&bd=<?php echo $_SESSION['bd']?>&nombre=<?php echo $_GET['nombre'];?>&limitar=S&automatico=S&loscamposf=&losdatosf="
				               class="btn  btn-white btn-warning" role="button" style="width: 150px; height: 40px;">
				               <i class="ace-icon red fa fa-arrow-left bigger-160 "></i><span class="btn-lg">Cancelar</span></a>
				         </div>
				       
				          <div class="col-sm-6" style="text-align: center;">
				                <button  onclick="guardar();" class="btn  btn-white btn-primary" value="Agregar" style="width: 200px; height: 40px;">
				                 <i class="ace-icon blue fa fa-envelope-o bigger-160"></i><span class="btn-lg">Enviar Encuesta</span>            
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
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-select.js"></script>


<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>

<?php  if (file_exists($nivel."nucleo/".$_GET["modulo"]."/ed_".$_GET["modulo"].".js")) { ?>
<script src="<?php echo $nivel."nucleo/".$_GET["modulo"]."/ed_".$_GET["modulo"].".js"?>"></script>
<?php }?>


	

<script type="text/javascript">

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





/*======================================CARGANDO LOS COMPONENTES ==================================*/		
				function cargarElementos(callback) {
					numCol=1;
				    tam=(12/numCol);
				       
					$("#frmReg").append("<div id =\"tabPrin\" class=\"tabbable\">");  
					$("#tabPrin").append("<div id=\"tabs_\">");  
					c=0;		
					claseActive="class=\"active\"";
				     jQuery.each(tabs, function(clave, valor){			    
			   	         $("#myTab").append("<li id=\"li_tabs_"+valor.SECCION+"\" "+claseActive+">\n");  
			   	         $("#li_tabs_"+valor.SECCION).append("<a data-toggle=\"tab\" href=\"#tabs_"+valor.SECCION+"\"> <i class=\"green ace-icon fa fa-check bigger-120\"></i>"+valor.SECCION+"</a>");
			   	         if (c==0) {elprimeTab=valor.SECCION; claseActive="";}
			   	         c++;                             					          
				    });
					    
				    
				
				     controw=1;  abrilinea=false; contcol=1;
				     
				     jQuery.each(campos, function(clave, valor){	

					
				    	    if (contcol>numCol) {abrilinea=false; controw++;}
				    	    		    	 
		                    if (!(abrilinea)) { 
		                        $("#tabs_"+valor.SECCION).append("<div  "+
		                                                         "id=\"row_"+valor.SECCION+"_"+controw+"\" class=\"row\">\n");
		                        $("#tabs_"+valor.SECCION).append("<div class=\"space-10\">\n");
		                        contcol=1;
		                        abrilinea=true;
		                        }
		                   
		                    if (valor.autoinc==null) {autoi="";} else { autoi=valor.autoinc;} 
		                   
		                    if (abrilinea){     
		                    	 $("#row_"+valor.SECCION+"_"+controw).append("   <div id=\"cell_"+valor.SECCION+"_"+controw+"_"+contcol+"\" class=\"col-sm-"+tam+"\">\n");                     	 
		                         getElementoEd("cell_"+valor.SECCION+"_"+controw+"_"+contcol,valor.CLAVE,valor.TIPO,valor.PREGUNTA,valor.ELSQL,"","N", valor.gif,autoi,'I',bd,'<?php echo $_SESSION['usuario'];?>');		                         
		                         contcol++;
		                    	}  
		                	callback(valor.CLAVE);                                    					         
				      });
				     callback("Ok");
				     
					}
/*========================================================================================================*/		

				$(document).ready(function(){	
		             cargarElementos(function(evento, valor) { });
		          	 $("#tabs").tabs();
					
				});



					 function cambioSelect(nombre){
						
			             jQuery.each(campos, function(clave, valor){	                     

			            	    var elsql="";
			                    if (!(valor.ELSQL==null)) {elsql=valor.ELSQL;}
			                   
			                    
			                   if (elsql.indexOf("{"+nombre+"}")>0) {
			                    	    elsql=damesqldep(elsql,'<?php echo $_SESSION["usuario"];?>');
			                            agregarEspera("imggif_"+valor.CLAVE,valor.gif);

										param=buscarBD('<?php echo $_SESSION["bd"];?>',elsql);
										
										parametros={sql:param[1],dato:sessionStorage.co,bd:param[0],sel:'0'}
			            				 $.ajax({
			                                 type: "POST",
											 url: 'dameselectSeg.php', 
											 data:parametros,
			                                 success: function(data){     												
			                                      $("#"+valor.CLAVE).html(data);  
			                                      $("#"+valor.CLAVE).trigger("chosen:updated");                             
			                                      $('#'+nombre).trigger("chosen:updated");
			                                      $('.chosen-select').chosen({allow_single_deselect:true}); 			
					                              
			                                      quitarEspera("imggif_"+valor.CLAVE,valor.gif);
			                              },
			                              error: function(data) {
			                                 alert('ERROR: '+data);
			                              }
			                            });                        
			                        }
			        			
			                 });

			              callChange(nombre);
				             
						}

					 
			

			<?php echo $miUtil->getConfInputFileEncuestas($rescampos);  ?>
			
	        //Para los componentes de fecha 
			$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});

	
		
            //Para los Tabs
			$("#tabs").tabs();
			

			$.validator.setDefaults({
				 ignore: [],
				 <?php echo $miUtil->getReglasValEncuestas($rescampos,"I");?>
			});



	  function guardar(){
			var form = $( "#frmReg" );
			form.validate();
			campo=sonvalidos(form);
			if (!(campo=="")) {
				$("#"+campo).focus();
				
			}
			else {
				 <?php echo $miUtil->getParamSubmitEncuestas($rescampos,$laTablaGraba,"I",$_SESSION["bd"],$_GET["id"],$_GET["ciclo"]);?>	
	        	 $('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
				        $.ajax({
			                type: "POST",
			                url:"inserta.php",
			                data: parametros,
			                success: function(data){
				                		
			                	$('#dlgproceso').modal("hide");  			                                	                      
				                if (!(data.substring(0,1)=="0"))	
					                 { 	<?php if (isset($_GET["fuera"])){
									        echo "location.href=\"".$antes."comprobante.php?id=".$_GET['id']."&matricula=".$_SESSION['usuario']."\";"; 
									     }
									 	else {
											 echo "location.href=\"".$antes."grid.php?modulo=".$_GET['modulo']."&bd=".$_SESSION['bd']."&nombre=".$_GET['nombre']."&limitar=S&automatico=S&loscamposf=&losdatosf=\";"; 
										 }?>				                	 			                                                                                             
					                  }	
				                else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
			                }					     
			            });               
				
			}

	  }
	  

	  function callChange(elemento){
		  nombreFuncion="change"+elemento;
		  try {existe=typeof eval(nombreFuncion);}
	      catch(error) {existe=false;}
		  if ( existe=="function") {
			  eval (nombreFuncion+"("+elemento+",'<?php echo $_SESSION['usuario']?>','<?php echo $_SESSION['INSTITUCION']?>','<?php echo $_SESSION['CAMPUS']?>'"+")");	   
			}
	  }
	  

	  function calldblclick(elemento){
		  nombreFuncion="dblclick"+elemento;
		  try {existe=typeof eval(nombreFuncion);}
	      catch(error) {existe=false;}
		  if ( existe=="function") {
			  eval (nombreFuncion+"("+elemento+",'<?php echo $_SESSION['usuario']?>','<?php echo $_SESSION['INSTITUCION']?>','<?php echo $_SESSION['CAMPUS']?>'"+")");	   
			}
	  }

	

</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
