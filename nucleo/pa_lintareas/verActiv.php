
<?php session_start(); if ($_SESSION['inicio']==1) { 
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

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="gestorActividad" style="background-color: white; width: 98%">
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
    
    <div class="page-header">        
         <div class="row">	               
		      <div class="col-sm-6"> 
		               <span class="label label-success" >Unidad </span> <span class="label label-warning" ><?php echo $_GET["materiad"] ?><small><i class="ace-icon fa fa-angle-double-right"></i><?php echo $_GET["materia"] ?></small> </span>
			           <select id="unidades" style="width: 100%;"> </select>			          
		       </div> 			       		      
                <div class="col-sm-1">
		           <div class="space-8"></div>
                   <button class="btn btn-white btn-danger btn-bold" onclick="regresar();"><i class="ace-icon fa fa-reply-all bigger-120 blue"></i>Regresar    </button>
               </div>          
	     </div>
    </div>
    <div >
	    <div class="widget-box transparent">
		     <div class="widget-header widget-header-small"><h2 class="widget-title blue smaller"><i class="ace-icon fa fa-rss orange"></i>Actividades a Realizar</h2>                                 </div>
		           <div class="widget-body" style="height:350px;overflow: auto; ">
						 <div class="widget-main padding-8" >
							  <div id="lalista" class="profile-feed">							   
							  </div>
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

 
 <script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>   
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>     
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
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-timepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/moment.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/daterangepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datetimepicker.min.js"></script>



<!-- -------------------Medios ----------------------->


<script src="<?php echo $nivel; ?>assets/js/jquery.inputlimiter.min.js"></script>
<script src="<?php echo $nivel; ?>js/mask.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-tag.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>


<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/sha/sha512.js"></script>




<script type="text/javascript">
        var todasColumnas;
        var losCriterios;
        var cuentasCal=0;
        
        
		$(document).ready(function($) { 
			var Body = $('body'); 
			Body.addClass('preloader-site'); 
			cargarUnidades(); $("#unidades").change(function(){cargarActividades();}); 

			$('.fileSigea').ace_file_input({
				no_file:'Sin archivo ...',
				btn_choose:'Buscar',
				btn_change:'Cambiar',
				droppable:false,
				onchange:null,
				thumbnail:false, //| true | large
				whitelist:'pdf',
				blacklist:'exe|php'
				//onchange:''
				//
			});

			});
		
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});




     function cargarUnidades(){		
			 $("#laTabla").empty();
			 $("#unidades").empty();
			 $("#unidades").append("<option value=\"0\">Elija Unidad</option>");	
			 $.ajax({
		         type: "GET",
		         url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select UNID_ID, UNID_NUMERO, UNID_DESCRIP"+		        		
		        		 " from eunidades a where a.UNID_MATERIA='<?php echo $_GET["materia"]?>' and UNID_PRED='' order by UNID_NUMERO"),
		         success: function(data){    		        	 
		        	 jQuery.each(JSON.parse(data), function(clave, valor) { 			        	 
		        		 $("#unidades").append("<option value=\""+valor.UNID_ID+"\">"+utf8Decode(valor.UNID_NUMERO+ " "+valor.UNID_DESCRIP)+"</option>");       	     
		               });
		             },
		         error: function(data) {	                  
		                    alert('ERROR: '+data);
		                }
		        });		     
			    
		}


		

        function cargarActividades() {
 
			 $.ajax({
		         type: "GET",
		         url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select  a.ID AS ID, a.CICLO as CICLO, a.RUTA AS RUTA, a.ACTIVIDAD AS ACTIVIDAD,IFNULL(b.ENVIADA,'') AS ENVIADA,"+
				         " IFNULL(b.RUTA,'') AS RUTA2, IFNULL(b.FECHAENV,'') AS FECHARUTA2,IFNULL(a.ENLACE1,'') AS ENLACE1, IFNULL(a.ENLACE2,'') AS ENLACE2, IFNULL(a.ENLACE3,'') AS ENLACE3, a.FECHAENT as FECHAENT from linactdoc a LEFT OUTER JOIN lintareas b ON (concat(a.ID,'_<?php echo $_SESSION['usuario'];?>')=b.AUX)  where "+
				          " GRUPO='<?php echo $_GET["grupo"];?>' and IDUNIDAD='"+$("#unidades").val()+"'"+
				          " and CICLO='<?php echo $_GET["ciclo"];?>' and PROFESOR='<?php echo $_GET["profesor"];?>'"+
				          " and MATERIA='<?php echo $_GET["materia"];?>' and PUBLICADA='S' order by ID"),
		         success: function(data){    
		        	 $("#lalista").empty();		                	
		        	 jQuery.each(JSON.parse(data), function(clave, valor) { 
                      

		        		    htenlace1=""; htenlace2=""; htenlace3=""; 
	         	        	if (valor.ENLACE1.length>0) {
	         	        		 htenlace1="      <div class=\"col-sm-1\">"+
                               "              <a  id=\"enlace1_"+valor.ID+"\" href=\""+valor.ENLACE1+"\"  target=\"_blank\" title=\"Enlace de Ayuda 1\" "+
                               "                    class=\"btn btn-white btn-waarning btn-bold\">"+
                               "                    <span class=\"badge badge-danger\">1</span>"+
                               "              </a>"+
                               "      </div> ";
		         	        	}
	         	        	if (valor.ENLACE2.length>0) {
	         	        		 htenlace2="      <div class=\"col-sm-1\">"+
                              "              <a  id=\"enlace1_"+valor.ID+"\" href=\""+valor.ENLACE2+"\" target=\"_blank\" title=\"Enlace de Ayuda 2\" "+
                              "                    class=\"btn btn-white btn-waarning btn-bold\">"+
                              "                    <span class=\"badge badge-danger\">2</span>"+
                              "              </a>"+
                              "      </div> ";
		         	        	}
	         	        	if (valor.ENLACE3.length>0) {
	         	        		 htenlace3="      <div class=\"col-sm-1\">"+
                              "              <a  id=\"enlace1_"+valor.ID+"\" href=\""+valor.ENLACE3+"\"  target=\"_blank\" title=\"Enlace de Ayuda 3\" "+
                              "                    class=\"btn btn-white btn-waarning btn-bold\">"+
                              "                    <span class=\"badge badge-danger\">3</span>"+
                              "              </a>"+
                              "      </div> ";
		         	        	}

	                        
		        		    stElim="display:none; cursor:pointer;";
		         	        if (valor.RUTA2.length>0) { stElim="cursor:pointer; display:block; ";}    

		         	        btnpub="";
		         	        imgpub="fa-unlock";


		         	        botonSubir= "<div class=\"col-sm-4\">"+
                            "                 <input class=\"fileSigea\" type=\"file\" id=\"file_"+valor.ID+"\""+
                            "                        onchange=\"subirPDFDriveSave('file_"+valor.ID+"','ENLINEAALUM_<?php echo $_GET["ciclo"]; ?>','pdf_"+valor.ID+"','RUTA_"+valor.ID+"','pdf','S','ID','"+valor.ID+"',' ACTIVIDAD  "+utf8Decode(valor.ID)+" ','lintareas','alta','"+valor.ID+"_<?php echo $_SESSION['usuario'];?>');\">"+
                            "                 <input  type=\"hidden\" value=\""+valor.RUTA2+"\"  name=\"RUTA_"+valor.ID+"\" id=\"RUTA_"+valor.ID+"\"  placeholder=\"\" />"+
                            "           </div>"+
                            "           <div class=\"col-sm-1\">"+
                            "                <a target=\"_blank\" id=\"enlace_RUTA_"+valor.ID+"\" href=\""+valor.RUTA2+"\">"+
                            "                     <img class=\"otra\" width=\"40px\" height=\"40px\" id=\"pdf_"+valor.ID+"\" name=\"pdf_"+valor.ID+"\" src=\"..\\..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
                            "                </a>"+
                            "                <i style=\""+stElim+"\"  id=\"btnEli_RUTA_"+valor.ID+"\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
	                        "                 onclick=\"eliminarEnlaceDrive('file_"+valor.ID+"','ENLINEAALUM_<?php echo $_GET["ciclo"]; ?>"+valor.CICLO+"',"+
	                        "                      'pdf_"+valor.ID+"','RUTA_"+valor.ID+"','pdf','S','ID','"+valor.ID+"','"+valor.ID+"-ACTIVIDAD',"+
	                        "                      'lintareas','alta','"+valor.ID+"_<?php echo $_SESSION['usuario'];?>');\"></i> "+              				                        
                            "           </div> ";
                             
                            
		         	        botonEnviar="<a  id=\"btnpub"+valor.ID+"\" onclick=\"enviar('"+valor.ID+"_<?php echo $_SESSION['usuario'];?>"+"','S','"+valor.ID+"');\" "+
		         	                    "title=\"Enviar la actividad al Profesor\" class=\"btn btn-white btn-waarning btn-bold\">"+
                                        "<i class=\"ace-icon green \">Enviar</i></a>";
		         	        			         	       
		         	        if (valor.ENVIADA=='S') { 
			         	        botonEnviar=""; 
			         	        botonSubir="<div class=\"col-sm-4\">"+
	                            "              <span class=\"label label-lg label-info arrowed-in\"><strong>Evidencia enviada: "+valor.FECHARUTA2+"</strong></span"+
	                            "           </div>"; }  		         	       
			         	          
		        		    $("#lalista").append("<div  class=\"profile-activity clearfix\"> "+
									                  "<div>"+
							                          "      <span class=\"text-success\">"+utf8Decode(valor.ACTIVIDAD)+"</span>"+
							                          "      <div class=\"row\"> "+ 
							                          "           <div class=\"col-sm-2\">"+
                                                      "                 <span><strong>Instrucciones:</strong></span>"+
                                                      "                 <a target=\"_blank\" id=\"enlaceProf"+valor.ID+"\" href=\""+valor.RUTA+"\">"+
                                                      "                     <img width=\"40px\" height=\"40px\" id=\"pdfProf"+valor.ID+"\" name=\"pdfProf\" src=\"..\\..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
                                                      "                 </a>"+
                                                      "           </div> "+ 
							                          "           <div class=\"col-sm-2\">"+
                                                      "                <div class=\"time\"><i class=\"ace-icon fa fa-clock-o bigger-110\"></i> <span class=\"text-primary\">"+
                                                      "                          <strong>Entrega:</strong></span> "+valor.FECHAENT+
                                                      "                </div>"+
                                                      "           </div>"+                                                      
                                                      htenlace1+htenlace2+htenlace3+botonSubir+
                                                      "      <div class=\"col-sm-1\">"+
                                                              botonEnviar+
                                                      "      </div> "+                                                                                                         
						                              "</div>"+						                              
											  "</div>");
											  
											  

		        		    if (valor.RUTA=='') { 								
								 $('#enlaceProf'+valor.ID).click(function(evt) {evt.preventDefault();});
			                     $('#enlaceProf'+valor.ID).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
								 $('#pdfProf'+valor.ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");	                        		                       	                    
		               	    }
						

		        		    if (valor.RUTA2=='') {								 
								 $('#enlace_RUTA'+valor.ID).click(function(evt) {evt.preventDefault();});
			                     $('#enlace_RUTA'+valor.ID).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
			                     $('#pdf_'+valor.ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");	
			        		    }
				    	         		        	    
		               });

		        	 $('.fileSigea').ace_file_input({
		 				no_file:'Subir actividad resuelta',
		 				btn_choose:'Buscar',
		 				btn_change:'Cambiar',
		 				droppable:false,
		 				onchange:null,
		 				thumbnail:false, //| true | large
		 				whitelist:'pdf',
		 				blacklist:'exe|php'
		 				//onchange:''
		 				//
		 			});
			 			
		             },
		         error: function(data) {	                  
		                    alert('ERROR: '+data);
		                }
		        });
            }
		
             function enviar(id,valor, idsolo){	
            	 var f = new Date();
            	 fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
            			            	
            	 if ($("#enlace_RUTA_"+idsolo).attr("href").length>0) { 
		            	 parametros={tabla:"lintareas",						    		    	      
		    			    	     bd:"Mysql",
		    			    	     campollave:"AUX",
		    			    	     valorllave:id,
		    			             ENVIADA:valor,
                                     FECHAENV:fechacap,
                                     _INSTITUCION: "<?php echo $_SESSION["INSTITUCION"];?>",
                                     _CAMPUS:"<?php echo $_SESSION["INSTITUCION"];?>"
		    			             };	      
		    			 $.ajax({
		    			    		 type: "POST",
		    			    		 url:"../base/actualiza.php",
		    			    		 data: parametros,
		    			    		 success: function(data){        			    		
		    					     if (data.substring(0,2)=='0:') { 
		    						        $('#dlgproceso').modal("hide"); 
		    					    		alert ("Ocurrio un error: "+data); console.log(data);
		    					     }
		    					     else {
		        					    	if (valor=='S') {
		            					        alert("La actividad fue enviada exitosamente");            					    		    	      
		            					    	$("#icopub"+id).removeClass("fa-unlock");
		            					    	$("#icopub"+id).addClass("fa-lock");
		            					    	cargarActividades();
		            					    }
		        					 if (valor=='N') { 
		            					    	alert("La actividad se coloco como NO ENVIADA");
		            					    	$("#icopub"+id).removeClass("fa-lock");
		            					    	$("#icopub"+id).addClass("fa-unlock");        
		            					    	cargarActividades();    					    		    	      
		        					    	}
		    					    		    		      
		    					      }		                                	                                        					          
		    			          }					     
		    			    });
            	 }
            	 else { alert ("No ha adjuntado archivo PDF de la actividad");}                     	 
    			}

             
             

		function regresar(){
			window.location="grid.php?modulo=<?php echo $_GET["modulo"];?> ";	
			}
		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
