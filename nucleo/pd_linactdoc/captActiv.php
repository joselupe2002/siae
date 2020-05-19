
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
                   <button class="btn btn-white btn-success btn-bold" onclick="formulario('ALTA','','','','','','','N');"><i class="ace-icon fa fa-plus bigger-120 green"></i>Nuevo</button>
               </div>  
                <div class="col-sm-1">
		           <div class="space-8"></div>
                   <button class="btn btn-white btn-danger btn-bold" onclick="regresar();"><i class="ace-icon fa fa-reply-all bigger-120 blue"></i>Regresar    </button>
               </div>          
	     </div>
    </div>
    <div >
	    <div class="widget-box transparent">
		     <div class="widget-header widget-header-small"><h2 class="widget-title blue smaller"><i class="ace-icon fa fa-rss orange"></i>Actividades</h2>                                 </div>
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
		        		 " from eunidades a where a.UNID_MATERIA='<?php echo $_GET["materia"]?>' and UNID_PRED=''"),
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


		function formulario(op,id,actividad,fechaent, enlace1,enlace2,enlace3,notificar){
			elboton="";
			if (op=="ALTA") {elboton="guardarActividades();"}
			if (op=="EDITAR") {elboton="guardarActividadesEditadas();"}
			
            if ($("#unidades").val()!=0) {
               script="<div class=\"modal fade\" id=\"modalFrm\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
     	       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
     		   "      <div class=\"modal-content\">"+
     		   "          <div class=\"modal-header widget-header  widget-color-green\">"+     		 
     		   "             <button type=\"button\" class=\"close\" aria-label=\"Cancelar\" data-dismiss=\"modal\" style=\"margin: 0 auto; top:0px;\">"+
     		   "                  <span aria-hidden=\"true\">&times;</span>"+
     		   "             </button>"+
     		   "             <div style=\"text-align:center;\"> "+ 	
     	       "                  <button title=\"Guardar todos los cambios\" type=\"button\" class=\"btn btn-white btn-warning btn-bold\" onclick=\""+elboton+"\">"+
     		   "                  <i class=\"ace-icon fa fa-floppy-o bigger-120 red\"></i>Guardar Actividad</button>"+	
     		   "             </div>"+	
     		   "          </div>"+  
     		   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+		
     		   "             <div class=\"row\"> "+			
     	       "                 <div class=\"col-sm-4\"> "+	
     	       "                      <div><span class=\"label label-warning\">Id</span>	"+    
     		   "                           <input  readonly=\"true\"  value=\""+id+"\" class=\"form-control\" id=\"ID\"></input>"+
     		   "                      </div>"+	
     		   "                  </div>"+
     		   "                 <div class=\"col-sm-8\"> "+	
     	       "                      <div><span class=\"label label-success\">Descripci&oacute;n de la Actividad</span>	"+     
     		   "                           <input value=\""+actividad+"\" class=\"form-control\" id=\"ACTIVIDAD\"></input>"+
     		   "                      </div>"+	
     		   "                  </div>"+   
     		   "             </div>"+	
     		   "             <div class=\"space-8\"></div>"+            
     		   "             <div class=\"row\"> "+	  		  
     		   "                 <div class=\"col-sm-4\"> "+	
     	       "                      <div><span class=\"label label-success\">Fecha de Entrega</span>	"+      
     		   "                           <div class=\"input-group\"><input style=\"cursor:pointer;\" value=\""+fechaent+"\" class=\"form-control date-picker\" id=\"FECHAENT\" "+
     	       "                                type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
     	       "                                <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
     		   "                      </div>"+	
     		   "                  </div>"+   
     		   "                  <div class=\"col-sm-4\"> "+	
    	       "                      <div><span class=\"label label-primary\">Enlace de ayuda 1</span>	"+     
    		   "                           <input value=\""+enlace1+"\" class=\"form-control\" id=\"ENLACE1\"></input>"+
    		   "                      </div>"+	
    		   "                  </div>"+
     	       "             </div>"+		
     	       "             <div class=\"row\"> "+	  		  
     	       "                  <div class=\"col-sm-4\"> "+	
  	           "                      <div><span class=\"label label-primary\">Enlace de ayuda 2</span>	"+     
  		       "                           <input value=\""+enlace2+"\" class=\"form-control\" id=\"ENLACE2\"></input>"+
  		       "                      </div>"+	
  		       "                  </div>"+
    		   "                  <div class=\"col-sm-4\"> "+	
   	           "                      <div><span class=\"label label-primary\">Enlace de ayuda 3</span>	"+     
   		       "                           <input value=\""+enlace3+"\" class=\"form-control\" id=\"ENLACE3\"></input>"+
   		       "                      </div>"+	
   		       "                  </div>"+
   		       "                  <div class=\"col-sm-4\"> "+	
	           "                      <div><span class=\"label label-warning\">Notificar por correo</span>	"+     
		       "                           <select class=\"form-control\" id=\"NOTIFICAR\"><option value='S'>Si</option><option value='N'>No</option></select>"+
		       "                      </div>"+	
		       "                  </div>"+
    	       "             </div>"+		        		      		  	 
     		   "          </div>"+ //div del modal-body		 
     	       "          </div>"+ //div del modal content		  
     		   "      </div>"+ //div del modal dialog
     		   "   </div>"+ //div del modal-fade
     		   "</div>";
	       		 
     		 $("#modalFrm").remove();
     	    if (! ( $("#modalFrm").length )) {
     	        $("#gestorActividad").append(script);
     	    }

     	    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
     	    
     	    $('#modalFrm').modal({show:true, backdrop: 'static'});

     	    $("#NOTIFICAR").val(notificar);
                 }
            else 
            { alert ("Por favor seleccione una unidad");}
		}
		

        function cargarActividades() {
    	  
			 $.ajax({
		         type: "GET",
		         url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select * from linactdoc a where "+
				          " GRUPO='<?php echo $_GET["grupo"];?>' and IDUNIDAD='"+$("#unidades").val()+"'"+
				          " and CICLO='<?php echo $_GET["ciclo"];?>' and PROFESOR='<?php echo $_GET["profesor"];?>'"+
				          " and MATERIA='<?php echo $_GET["materia"];?>' order by ID"),
		         success: function(data){    
		        	 $("#lalista").empty();		                	
		        	 jQuery.each(JSON.parse(data), function(clave, valor) { 

		        		    stElim="display:none; cursor:pointer;";
		         	        if (valor.RUTA.length>0) { stElim="cursor:pointer; display:block; ";}    


		         	        
		         	        	 divpublicar="<div class=\"col-sm-1\">"+
		                           "              <a  id=\"btnpub"+valor.ID+"\" onclick=\"publicar('"+valor.ID+"','S');\" title=\"Publicar la actividad para ser vista por los alumnos\" "+
		                           "                    class=\"btn btn-white btn-waarning btn-bold\">"+
		                           "                    <i id=\icopub"+valor.ID+"\" class=\"ace-icon fa fa-bullhorn  bigger-160 green \"></i>"+
		                           "              </a>"+
		                           "            </div> ";
		         	        if (valor.PUBLICADA=='S') { divpublicar="<span class=\"badge badge-success\"><i class=\"fa fa-check\"> </i> Actividad Publicada</span>";}  
		         	       

		         	      
                           

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

	         	        			         	       
		         	       
		        		    $("#lalista").append("<div  class=\"profile-activity clearfix\"> "+
									                  "<div>"+
							                          "      <span class=\"text-success\">"+utf8Decode(valor.ACTIVIDAD)+"</span>"+
                                                      "      <div class=\"time\"><i class=\"ace-icon fa fa-clock-o bigger-110\"></i> "+valor.FECHAENT+"</div>"+
                                                      "      <div class=\"col-sm-4\">"+
                                                      "           <input class=\"fileSigea\" type=\"file\" id=\"file_"+valor.ID+"\""+
                                                      "                  onchange=\"subirPDFDriveSave('file_"+valor.ID+"','ENLINEA_<?php echo $_GET["ciclo"]; ?>','pdf_"+valor.ID+"','RUTA_"+valor.ID+"','pdf','S','ID','"+valor.ID+"',' ACTIVIDAD  "+valor.ID+" ','linactdoc','edita','');\">"+
                                                      "           <input  type=\"hidden\" value=\""+valor.RUTA+"\"  name=\"RUTA_"+valor.ID+"\" id=\"RUTA_"+valor.ID+"\"  placeholder=\"\" />"+
                                                      "      </div>"+
                                                      "      <div class=\"col-sm-1\">"+
                                                      "           <a target=\"_blank\" id=\"enlace_RUTA_"+valor.ID+"\" href=\""+valor.RUTA+"\">"+
                                                      "                 <img width=\"40px\" height=\"40px\" id=\"pdf_"+valor.ID+"\" name=\"pdf_"+valor.ID+"\" src=\"..\\..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
                                                      "           </a>"+
                                                      "           <i style=\""+stElim+"\"  id=\"btnEli_RUTA_"+valor.ID+"\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
              				                          "            onclick=\"eliminarEnlaceDrive('file_"+valor.ID+"','ENLINEA_<?php echo $_GET["ciclo"]; ?>"+valor.CICLO+"',"+
              				                          "                      'pdf_"+valor.ID+"','RUTA_"+valor.ID+"','pdf','S','ID','"+valor.ID+"','"+valor.ID+"-ACTIVIDAD',"+
              				                          "                      'linactdoc','edita','');\"></i> "+              				                        
                                                      "      </div> "+
                                                      htenlace1+htenlace2+htenlace3+divpublicar+
						                              "</div>"+
						                              "<div class=\"tools action-buttons\">"+
							                          "<a onclick=\"formulario('EDITAR','"+valor.ID+"','"+utf8Decode(valor.ACTIVIDAD)+"','"+valor.FECHAENT+"','"+valor.ENLACE1+"','"+valor.ENLACE2+"','"+valor.ENLACE3+"','"+valor.NOTIFICAR+"');\"  class=\"blue\" style=\"cursor: pointer;\"><i class=\"ace-icon fa fa-pencil bigger-125\"></i></a>"+
                                                      "<a onclick=\"elimarActividad("+valor.ID+");\" class=\"red\" style=\"cursor: pointer;\"><i class=\"ace-icon fa fa-times bigger-125\"></i></a>"+
						                           "</div>"+
				                              "</div>");

		        		    if (valor.RUTA=='') { 
		                        $('#enlace_RUTA'+valor.ID).attr('disabled', 'disabled');
		                        $('#enlace_RUTA'+valor.ID).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
		                        $('#pdf_'+valor.ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");		                    
		               	    }
				    	         		        	    
		               });

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
			 			
		             },
		         error: function(data) {	                  
		                    alert('ERROR: '+data);
		                }
		        });
            }
		
        
		function guardarActividades(id,numeroUni){
			 var f = new Date();
			 fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
             parametros={
			          tabla:"linactdoc",						    		    	      
			    	  bd:"Mysql",
			          MATERIA:"<?php echo $_GET["materia"]?>",
	    		      PROFESOR:"<?php echo $_GET["profesor"]?>",
		    		  GRUPO:"<?php echo $_GET["grupo"]?>",
			    	  IDUNIDAD:$("#unidades").val(),
			          NUMUNIDAD:"0",
			          FECHAENT: $("#FECHAENT").val(),
				      CICLO:"<?php echo $_GET["ciclo"]?>",
					  ACTIVIDAD:$("#ACTIVIDAD").val(),
					  ENLACE1:$("#ENLACE1").val(),
					  ENLACE2:$("#ENLACE2").val(),
					  ENLACE3:$("#ENLACE3").val(),
					  NOTIFICAR:$("#NOTIFICAR").val(),	
					  RUTA:"",
				      USUARIO:"<?php echo $_SESSION["usuario"]?>",
					  FECHAUS:fechacap,
					  _INSTITUCION:"<?php echo $_SESSION["INSTITUCION"]?>",
					  _CAMPUS:"<?php echo $_SESSION["CAMPUS"]?>"};
			  
			    		  $.ajax({
			    		    	  type: "POST",
			    		    	  url:"../base/inserta.php",
			    		    	  data: parametros,
			    		    	  success: function(data){
					    		    	  if (data.substring(0,2)=='0:') { 
						    		    	  $('#dlgproceso').modal("hide"); 
					    		    	      alert ("Ocurrio un error: "+data); console.log(data);
					    		    	      }
					    		    	  else {
						    		    	      $('#dlgproceso').modal("hide"); 
					    		    		      $('#modalFrm').modal("hide");
					    		    		      cargarActividades();
					    		    	         }		                                	                                        					          
			    		    	      }					     
			    		    });            
			}


        function guardarActividadesEditadas(id,numeroUni){			
        	 var f = new Date();
			 fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
             parametros={
			          tabla:"linactdoc",						    		    	      
			    	  bd:"Mysql",
			    	  campollave:"ID",
			    	  valorllave:$("#ID").val(),
			          MATERIA:"<?php echo $_GET["materia"]?>",
	    		      PROFESOR:"<?php echo $_GET["profesor"]?>",
		    		  GRUPO:"<?php echo $_GET["grupo"]?>",
			    	  IDUNIDAD:$("#unidades").val(),
			          NUMUNIDAD:"0",
			          FECHAENT: $("#FECHAENT").val(),
				      CICLO:"<?php echo $_GET["ciclo"]?>",
					  ACTIVIDAD:$("#ACTIVIDAD").val(),
					  ENLACE1:$("#ENLACE1").val(),
					  ENLACE2:$("#ENLACE2").val(),
					  ENLACE3:$("#ENLACE3").val(),
					  NOTIFICAR:$("#NOTIFICAR").val(),					  
				      USUARIO:"<?php echo $_SESSION["usuario"]?>",
					  FECHAUS:fechacap,
					  _INSTITUCION:"<?php echo $_SESSION["INSTITUCION"]?>",
					  _CAMPUS:"<?php echo $_SESSION["CAMPUS"]?>"};
			  
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
						    		    	      $('#dlgproceso').modal("hide"); 
					    		    		      $('#modalFrm').modal("hide");
					    		    		      cargarActividades();
					    		    	         }		                                	                                        					          
			    		    	      }					     
			    		    });                     	 
			}


             function elimarActividad(id){			
                if (confirm("Seguro que desea eliminar esta actividad")) {
		        parametros={
		    			    tabla:"linactdoc",						    		    	      
		    			    bd:"Mysql",
		    			    campollave:"ID",
		    			    valorllave:id};

		    	    $.ajax({
		    			   type: "POST",
		    			   url:"../base/eliminar.php",
		    			   data: parametros,
		    			   success: function(data){
		    					    if (data.substring(0,2)=='0:') { 
		    						    $('#dlgproceso').modal("hide"); 
		    					    	alert ("Ocurrio un error: "+data); console.log(data);
		    					    }
		    					     else {
		    						       $('#dlgproceso').modal("hide"); 
		    					    	   $('#modalFrm').modal("hide");
		    					    	   cargarActividades();
		    					          }		                                	                                        					          
		    			    }					     
		    	      });  
                    }
                                   	 
    			}



             function publicar(id,valor){		

            	 parametros={
    			          tabla:"linactdoc",						    		    	      
    			    	  bd:"Mysql",
    			    	  campollave:"ID",
    			    	  valorllave:id,
    			          PUBLICADA:valor};
		             	    		      
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
            					    		    	      alert("La actividad fue publicada exitosamente");            					    		    	      
            					    		    	      cargarActividades();
            					    		    	      }
        					    		    	      if (valor=='N') { 
            					    		    	      alert("La actividad se ha dejado de publicar");
            					    		    	      cargarActividades();
        					    		    	       }
    					    		    		      
    					    		    	         }		                                	                                        					          
    			    		    	      }					     
    			    		    });                     	 
    			}

             
             

		function regresar(){
			window.location="grid.php?modulo=<?php echo $_GET["modulo"];?> ";	
			}
		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
