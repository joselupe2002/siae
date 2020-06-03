
<?php session_start(); 

    if (($_SESSION['inicio']==1)  && (strpos($_SESSION['permisos'],$_GET["modulo"])) ){ 
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
    
                   
					
         <div class="main-content"  style="margin-left: 10px; margin-right: 10px; width: 98%;">
          <div class="row">
		       <div class="col-xs-3">
		             <label class="et" for="">Categor&iacute;a</label> 
		              <select onchange="cargaIndicadores();" class="form-control" name="categoria" id="categoria" data-placeholder="Elija la categoria">	                    
		              </SELECT>
                </div>  
                <div class="col-xs-3">
		             <label class="et" for="">Indicador</label> 
		              <select  onchange="mostrarDatos();" class="form-control" name="indicador" id="indicador" data-placeholder="Elija el indicador">
	   
		              </SELECT>
                </div>                  
		  </div>
		  
		  <div class="row"> 
                     <div class="col-sm-4"> 
                            <div class="clearfix">
					            <div id="botones" class="pull-left tableTools-container"></div>
					        </div>
				     </div>	
		  </div>
				     
		   <div class="row">
		      <div>
		       		<div id="tablaind" class="col-xs-12">
		        
                	</div>
                </div>                  
		  </div>
		  
		 </div>
		       
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

<script type="text/javascript">
       $(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
       $(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

       jQuery(function($) {
    	   

p
		var elsql="SELECT DISTINCT(S.INDI_CATEGORIA) AS ID ,INDI_CATEGORIA from eindicadores s where indi_tipo='ESCOLAR' ORDER BY INDI_CATEGORIA";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}
		$("#categoria").load("../base/dameselectSeg.php");

       });

       
       function cargaIndicadores(){
		   var elsql="select INDI_TABLA,INDI_NOMBRE from eindicadores s where  indi_categoria='"+$("#categoria").val()+"' ORDER BY INDI_CLAVE";
		   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}
           $.ajax({
			   type: "POST",
			   data:parametros,
               url: "../base/dameselectSeg.php?",
               success: function(data){                 
                    $("#indicador").html(data);   
            },
            error: function(data) {
               alert('ERROR: '+data);
            }
          }); 	

      }

       function mostrarDatos(){
	       var colsql="";
	       var columnas;
	       var col=[];
	       var obj;
	   
	       $('#dlgproceso').modal({backdrop: 'static', keyboard: false});	
	        
	       $.ajax({
               type: "GET",
               url: "../base/ind_getCampos.php?bd=Mysql&tabla="+$("#indicador").val(),
               success: function(data){  
                    col=[];
                    columnas=JSON.parse(data);
                    var i=0;


                    $("#tablaind").empty();
                    $("#botones").empty();
                    $("#tablaind").append("<select class=\"form-control input-sm\" id=\"id_campo\">");
                   

					
                    $("#id_campo").empty();
                    $("#id_campo").append("<option value=\"-1\">Todos</option>");
                    jQuery.each(columnas, function(clave, valor){	
                         colsql+=valor.colum_name+",";   
                         obj={"title":valor.comments}
                         $("#id_campo").append("<option value=\""+i+"\">"+valor.colum_name+"</option>");
                         col[i]=obj;
                         i++;                      
                        });              
                    colsql=colsql.substring(0,colsql.length-1);

                    //$('#mitabla').DataTable().destroy();
                    
                    $("#tablaind").append("<table id=\"mitabla\" class=\"table  table-condensed table-striped table-bordered table-sm  table-hover\">"); 


            	    
                    //console.log("../base/getdatossql.php?sql=SELECT "+colsql+" FROM "+$("#indicador").val());
                    $.ajax({
                        type: "GET",
                        url:  "../base/getdatossql.php?bd=Mysql&sql=SELECT "+colsql+" FROM "+$("#indicador").val(),
                        success: function(data){  
                        	 losdatos=JSON.parse(data);

                        	 var myTable = $('#mitabla').DataTable( {
                     			bAutoWidth: false,  
                     			 data: losdatos,
                                 columns:col,          		
                     			"aaSorting": [],
                     			"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                     				             
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
                     					"last":				"�ltima",
                     					"next":				"Siguiente",
                     					"previous":			"Anterior"
                     				},
                     				"aria": {
                     					"sortAscending":	"Ordenaci�n ascendente",
                     					"sortDescending":	"Ordenaci�n descendente"
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
 
                        	  $('#dlgproceso').modal("hide");              
                        },
                         error: function(data) {
                             $('#dlgproceso').modal("hide");      
                             alert('ERROR: '+data);
                         }
                    });
            },
            error: function(data) {
               $('#dlgproceso').modal("hide");      
               alert('ERROR: '+data);
            }
          }); 	
      
	     
	    		
       }
       
</script>

</body>
<?php } ?>
</html>
