
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

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	     <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
  
	    <div class="page-header">
		   <h1>Datos<small><i class="ace-icon green fa fa-angle-double-right"></i></small><?php echo $_GET["nombre"];?></h1>       
        </div>
     
					<select class="form-control input-sm" id="id_campo">
					<option value="-1">Todos</option>
					 <?php  $columnas=$miUtil->getColGrid($_GET['modulo']);  
					        $l=0;
	                        foreach ($columnas as $row) {
	                        	echo "<option value=\"".$l."\">".$row["comments"]."</option>";
			                    $l++;
	                        }
	                        ?>					
					</select>
			
		
        <div class="main-content"  style="margin-left: 10px; margin-right: 10px; width: 98%;">
          <div class="row">
		     <div class="col-xs-12"> 
                <div class="row"> 
                     <div class="col-sm-4"> 
                            <div class="clearfix">
					            <div class="pull-left tableTools-container"></div>
					        </div>
				     </div>	
				     <div class="col-sm-1"> 
					        <div class=""> 
					        <?php 
					            $proc=$miUtil->getProcesos($_SESSION['usuario'],$_SESSION['super'],$_GET['modulo']);  
					            $tieneProc='N';
					            if (!(empty($proc[0]))) {
					            	$tieneProc='S';
					            	echo "<button data-toggle=\"dropdown\" class=\"btn btn-info btn-white dropdown-toggle\">
								          Procesos <span class=\"ace-icon fa fa-caret-down icon-only\"></span>
								          </button>
                                          <ul class=\"dropdown-menu dropdown-info dropdown-menu-right\">";
					            	
					                foreach ($proc as $row) {
					                	echo "<li><a onclick=\"".$row["proc_proceso"]."('".$_GET['modulo']."','"
				                                                                         .$_SESSION['usuario']."','"
				                                                                         .$_SESSION['super']."');\">".$row["proc_descrip"]."</a></li>";
					                }
					                echo "</ul>";
					            }
					            
					        ?> 
 
					        </div>
				     </div>	
				 </div>	
				 <div> 					   
	                   <?php  
	                   echo " <table id=\"G_".$_GET["modulo"]."\" class=\"table  table-condensed table-striped table-bordered table-hover\">".
	                            "<thead>".
						           "<tr> ";                   
	                   $columnas=$miUtil->getColGrid($_GET['modulo']);  	                  
	                   foreach ($columnas as $row) {
	                   	    echo "<th>".$row[0]."</th>"; 
	                   	    if ($row["keys"]=="S") {$llave=$row[0];}
	                   }
	                   echo "</tr></thead>";
	                   echo "<tbody>";					 
                       $resDatos=$miUtil->getDatosGrid($_SESSION['usuario'],$_SESSION['super'],$_GET['modulo'],$_SESSION["bd"]);     
                                         
                       
                       foreach ($resDatos as $datos) {
                    	    echo "<tr>";
                    	 

                    	    foreach ($columnas as $row) {                    	                        	  
                    	         echo "<td>".$datos[$row[0]]."</td>";
                    	    }
                    	    echo "</tr>\n";
                        } 
                        echo "</tbody>";
                        echo "</table>";
             ?>
           </div> <!--  De la tabla  -->
        </div> <!--  De la columna  -->
    </div> <!--  De la fila  -->
  </div> <!--  Del contenedor principal  -->
  
  <?php 		
			 $botones=$miUtil->getPermisos($_SESSION['usuario'],$_SESSION['super'],$_GET['modulo']);  	
			 
			 $laTabla=$miUtil->getTablaModulo($_GET['modulo']);
			 $campoLlave=$miUtil->getCampoLlave($laTabla); 

			    		        
   ?>
     
 
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

 
        
<script src="<?php echo $nivel; ?>assets/js/jquery-2.1.4.min.js"></script>
<script type="<?php echo $nivel; ?>text/javascript"> if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");</script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap.min.js"></script>
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

<?php if ($tieneProc=='S') {?>
    <script src="<?php echo $nivel; ?>js/<?php echo $_GET["modulo"];?>.js"></script>
<?php }?>

<script type="text/javascript">

		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});


		jQuery(function($) { 
			 <?php $cad="";  for ($x=0;$x<=count($columnas)-1;$x++) {$cad.="null,";}?>	
			   
			var myTable = $('#G_<?php echo $_GET['modulo']?>').DataTable( {
				bAutoWidth: false,
				"aoColumns": [<?php echo $cad;?>],
				"aaSorting": [],
				"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
					
                   // if ( aData[0] == "200803" ){$('td', nRow).css('background-color', '#FCF3CF');}
                 
                },				
				select: {style: 'single'},
				"language": {
					"emptyTable":			"No hay datos disponibles en la tabla.",
					"info":		   			"Del _START_ al _END_ de _TOTAL_ ",
					"infoEmpty":			"Mostrando 0 registros de un total de 0.",
					"infoFiltered":			"(filtrados de un total de _MAX_ registros)",
					"infoPostFix":			"(actualizados)",
					"lengthMenu":			"Mostrar _MENU_ registros",
					"loadingRecords":		"Cargando...",
					"processing":			"Procesando...",
					"search":				"Buscar:",
					"searchPlaceholder":	"Dato para buscar",
					"zeroRecords":			"No se han encontrado coincidencias.",
					"paginate": {
						"first":			"Primera",
						"last":				"Última",
						"next":				"Siguiente",
						"previous":			"Anterior"
					},
					"aria": {
						"sortAscending":	"Ordenación ascendente",
						"sortDescending":	"Ordenación descendente"
					}
				},
	
		    } );


			$.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';

      
			new $.fn.dataTable.Buttons( myTable, {
				buttons: [
					{
						"extend": "colvis",
						"text": "<i title='Columnas' class='fa fa-search bigger-110 blue'></i>",
						"className": "btn btn-white btn-primary btn-bold",
						 columns: ':not(:first):not(:last)'
					  },
					{
					    "extend": "copy",
						"text": "<i title='Copiar Datos' class='fa fa-copy bigger-110 pink'></i>",
						"className": "btn btn-white btn-primary btn-bold"
				     },
					{
				        "extend": "csv",
				        "charset": "UTF-8",
						"text": "<i title='Exportar a Excel' class='glyphicon glyphicon-export bigger-110 orange'></i>",
						"className": "btn btn-white btn-primary btn-bold"
					},

					{
						"extend": "",
						"text": "",
					    "className": "btn disabled btn-link"	
									
			        },

				<?php if ($botones[0]=='S') {?>		   					 			
				  {
						"extend": "",
						"text": "<i title='Insertar Registro' class='fa fa-plus-circle blue bigger-110 red'></i>",
						"className": "btn btn-white btn-primary btn-bold",
						"action": function ( e, dt, node, config ) {
							  insertar();
			                }
			      },
			      <?php }?>
			      <?php if ($botones[1]=='S') {?>	
			      {
						"extend": "",
						"text": "<i title='Editar Registro' class='fa fa-edit  green bigger-110 red'></i>",
						"className": "btn btn-white btn-primary btn-bold",
						"action": function ( e, dt, node, config ) {
							  modificar();
			                }
			      },
			      <?php }?>
			      <?php if ($botones[2]=='S') {?>
			      {
						"extend": "",
						"text": "<i title='Eliminar Registro' class='fa fa-trash red bigger-110 red'></i>",
						"className": "btn btn-white btn-primary btn-bold",
						"action": function ( e, dt, node, config ) {
							  eliminar();
			                }
			      },
			      <?php }?>			    

			      {
			  	        "extend": "print",
						"text": "<i title='Imprimir datos' class='fa fa-print bigger-110 grey'></i>",
						"className": "btn btn-white btn-primary btn-bold",
						autoPrint: false,
						message: 'SIGEA'
			      }	
			  	
					  	 
				]
			} );
			myTable.buttons().container().appendTo( $('.tableTools-container') );

			$(".dataTables_filter").append(id_campo);

			//Mensaje del copiado de datos del Grid
			var defaultCopyAction = myTable.button(1).action();
			myTable.button(1).action(function (e, dt, button, config) {
				defaultCopyAction(e, dt, button, config);
				$('.dt-button-info').addClass('gritter-item-wrapper gritter-info gritter-center white');
			});
			

			//Columnas que se desean visualizar en el grid 
			var defaultColvisAction = myTable.button(0).action();
			myTable.button(0).action(function (e, dt, button, config) {
				
				defaultColvisAction(e, dt, button, config);
				
				if($('.dt-button-collection > .dropdown-menu').length == 0) {
					$('.dt-button-collection')
					.wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
					.find('a').attr('href', '#').wrap("<li />")
				}
				$('.dt-button-collection').appendTo('.tableTools-container .dt-buttons')
			});


			
			$('.dataTables_filter input').unbind().bind('keyup', function() {
				   var searchTerm = this.value.toLowerCase()
				   if (!searchTerm) {
				      myTable.draw()
				      return
				   }
				   $.fn.dataTable.ext.search.pop(); 
				   
				   opb=searchTerm.substr(0,2);
				   opa=searchTerm.substr(0,1);   
				 
				   $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {	
					   
					   if ($('#id_campo').prop('value')=="-1") {ini=0; fin=data.length-1;}
					   else  {ini=$('#id_campo').prop('value'); fin=$('#id_campo').prop('id');}				 
				       for (var i=ini;i<=fin;i++) {
					     if ((opa=="=") ||(opa==">") ||(opa=="<") ||  (opb==">=")|| (opb=="<=")||(opb=="<=")||(opb=="!=")) {						     
					    	 if ((opa=="=")) {if (data[i].toLowerCase() == searchTerm.substr(1,searchTerm.length)) return true}
					    	 if ((opb==">=")) {if (parseFloat(data[i].toLowerCase()) >= parseFloat(searchTerm.substr(2,searchTerm.length))) return true}
					    	 if ((opa==">")) {if (parseFloat(data[i].toLowerCase()) > parseFloat(searchTerm.substr(1,searchTerm.length))) return true}
					    	 if ((opa=="<")) {if (parseFloat(data[i].toLowerCase()) < parseFloat(searchTerm.substr(1,searchTerm.length))) return true}
					    	 
					    	 if ((opb=="<=")) {if (parseFloat(data[i].toLowerCase()) <= parseFloat(searchTerm.substr(2,searchTerm.length))) return true}
					    	 if ((opb=="!=")) {if (!(data[i].toLowerCase() == searchTerm.substr(2,searchTerm.length))) return true}
						     }
					     else
					    	 if (data[i].toLowerCase().indexOf(searchTerm)>=0) return true				        
				      }
				      return false
				   });
				   
				   myTable.draw();   
				   
				   
				});

			
				 
		});

		function modificar(){
			

			ruta="editaReg.php?modulo=<?php echo $_GET["modulo"]?>&nombre=<?php echo $_GET["nombre"]?>&tabla=<?php echo $laTabla;?>&campollave=<?php echo $campoLlave; ?>&valorllave=";
		   <?php                  
	             if (file_exists("../".$_GET["modulo"]."/editaReg.php")) {?>
	                 ruta="<?php echo "../".$_GET["modulo"]."/editaReg.php"?>?modulo=<?php echo $_GET["modulo"]?>&nombre=<?php echo $_GET["nombre"]?>&tabla=<?php echo $laTabla;?>&campollave=<?php echo $campoLlave; ?>&valorllave=";  
	       <?php }?>
	              
			
			var table = $('#G_<?php echo $_GET['modulo']?>').DataTable();
			if (table.rows('.selected').data().length>0) {
				 $('#dlgproceso').modal({backdrop: 'static', keyboard: false});
				 location.href=ruta+table.rows('.selected').data()[0][0]; 
				}
			else {
				alert ("Debe seleccionar un registro");

				}
		}

		  function eliminar(){
			   
			    var table = $('#G_<?php echo $_GET['modulo']?>').DataTable();
			    if (table.rows('.selected').data().length>0) {
			    	  if(confirm("Seguro que desea eliminar el registro: "+table.rows('.selected').data()[0][0])) {
			    			$('#dlgproceso').modal({backdrop: 'static', keyboard: false});			    		
			    		        
			    		  var parametros = {
			    	                "tabla" : "<?php echo $laTabla;?>",
			    	                "campollave" : "<?php echo $campoLlave;?>",
			    	                "valorllave" : table.rows('.selected').data()[0][0]
			    	        };
			    	        
			    		  $.ajax({
				  	            data:  parametros,
				  	            url:   'eliminar.php',
				  	            type:  'post',          
				  	            success:  function (response) {
				  	            	$('#dlgproceso').modal("hide");
				  	            	alert(response);
				  	            	location.href ="grid.php?modulo=<?php echo $_GET['modulo'];?>&nombre=<?php echo $_GET['nombre'];?>";
			    		        }		
				  	       }); 
			    	  }    
					}
				else {
					alert ("Debe seleccionar un registro a eliminar");
					}
				}      

				

		function insertar() {
			  $('#dlgproceso').modal({backdrop: 'static', keyboard: false});	
               <?php                  
                 $url="nuevoReg.php?modulo=".$_GET["modulo"]."&nombre=".$_GET["nombre"]."&tabla=".$laTabla;
                 if (file_exists("../".$_GET["modulo"]."/nuevoReg.php")) {$url="../".$_GET["modulo"]."/nuevoReg.php";}?>
                 location.href="<?php echo $url;?>";       
                       
			}


		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
