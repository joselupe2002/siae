
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
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ui.jqgrid.min.css" />
        
            <!--------------------2----------------------------->
	    <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery-ui.min.css" />
	    <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-datepicker3.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-datetimepicker.min.css" />			
		
		

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>

	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    
	    
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>


     <h3 class="header smaller lighter red">Actividades Descargas <i class="ace-icon fa fa-angle-double-right"></i> <small id="elciclo"></small> <small id="elciclod"></small></h3>
	     <div  class="table-responsive">
		     <table id=tabHorarios class= "display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
				   	<thead>  
					    <tr>
					        <th style="text-align: center;">ID</th> 	
							<th style="text-align: center;">Ciclo</th> 						
					        <th style="text-align: center;">Actividad</th> 
					        <th style="text-align: center;">Horas</th> 
					        <th style="text-align: center;">Lunes</th> 
					        <th style="text-align: center;">Martes</th> 
					        <th style="text-align: center;">Miercoles</th> 
					        <th style="text-align: center;">Jueves</th> 
					        <th style="text-align: center;">Viernes</th> 					       
					        <th style="text-align: center;">Plan</th> 		
					     </tr> 
			        </thead> 
			  </table>	
		</div>
		<div class="space-10"></div>
	    <div class="row"> 
	        <div class="col-md-3"> </div>			
	        <div class="col-md-6"> 	
		       <div>  	
	               <button title="Imprimir Plan de Trabajo" type="button" 
	                class="btn btn-white btn-success btn-bold" onclick="imprimirPlan();">
		            <i class="ace-icon fa fa-book bigger-120 blue"></i>Imprimir Plan de Trabajo</button>	
		       </div>  
		    </div>  		    
		    <div class="col-md-3"> </div>	                
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
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js?v=<?php echo date('YmdHis'); ?>"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>





<script type="text/javascript">
        var todasColumnas;
        var globlal=1;
        
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 
			cargarMaterias();
			

			});




 function generaTabla(grid_data){
       c=0;
       ladefault="..\\..\\imagenes\\menu\\pdf.png";
       $("#cuerpo").empty();
	   $("#tabHorarios").append("<tbody id=\"cuerpo\">");

	   
       jQuery.each(grid_data, function(clave, valor) { 	

    	    proceso="verActividad"; etiqueta="Ver Actividades"; elcolor="btn-warning";
    	   
    	    if (valor.DESC_ABIERTA=='S') {proceso="agregarActividad"; etiqueta="Capt. Actividades"; elcolor="btn-success";}
    	    
    	    $("#cuerpo").append("<tr id=\"row"+valor.DESC_ID+"\">");
			$("#row"+valor.DESC_ID).append("<td>"+valor.DESC_ID+"</td>");	
			$("#row"+valor.DESC_ID).append("<td><span class=\"badge badge-successs\">"+valor.DESC_CICLO+"<span></td>");		
    	    $("#row"+valor.DESC_ID).append("<td>"+valor.DESC_ACTIVIDADD+"</td>");
    	    $("#row"+valor.DESC_ID).append("<td>"+valor.DESC_HORAS+"</td>");
    	    $("#row"+valor.DESC_ID).append("<td>"+valor.LUNES+"</td>");
    	    $("#row"+valor.DESC_ID).append("<td>"+valor.MARTES+"</td>");
    	    $("#row"+valor.DESC_ID).append("<td>"+valor.MIERCOLES+"</td>");
    	    $("#row"+valor.DESC_ID).append("<td>"+valor.JUEVES+"</td>");
    	    $("#row"+valor.DESC_ID).append("<td>"+valor.VIERNES+"</td>");
    	    $("#row"+valor.DESC_ID).append("<td><button onclick=\""+proceso+"('"+valor.DESC_ID+"','"+valor.DESC_ACTIVIDADD+"','<?php echo $_GET["modulo"];?>','"+valor.DESC_CICLO+"');\" class=\"btn btn-white "+elcolor+" btn-bold\">"+
					                                    "<i class=\"ace-icon fa  fa-cogs bigger-120 blue\"></i> "+
					                                    etiqueta+
				                                 "</button></td>");

        });
}		



function cargarMaterias() {
	 elsql="SELECT CICL_CLAVE, CICL_DESCRIP from ciclosesc a where a.CICL_CLAVE=getciclo() ";
	 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	 $.ajax({
		 type: "POST",
		 data:parametros,
         url:  "../base/getdatossqlSeg.php",
         success: function(data){
			  
        	   losdatos=JSON.parse(data);
        	   cad1="";cad2="";
        	   jQuery.each(losdatos, function(clave, valor) { cad1=valor.CICL_CLAVE; cad2=valor.CICL_DESCRIP;	 });   

               $("#elciclo").html(cad1);
               $("#elciclod").html(cad2);
      	          	     
               },
         error: function(data) {	                  
                    alert('ERROR: '+data);
                }
        });


	elsql="SELECT * from vedescarga a where a.DESC_PROFESOR='<?php echo $_SESSION['usuario']?>' and VISIBLE='S'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	 $.ajax({
		 type: "POST",
		 data:parametros,
         url:  "../base/getdatossqlSeg.php",
         success: function(data){
		
      	     generaTabla(JSON.parse(data));	        	     
               },
         error: function(data) {	                  
                    alert('ERROR: '+data);
                }
		});
	
}


function pad (str, max) {
	  str = str.toString();
	  return str.length < max ? pad("0" + str, max) : str;
	}
	

function guadarPortafolio(id,campo,materia){
	    dato=$("#"+campo).val();
	    alert (id+" "+dato+" "+campo);
		if ((dato != null) && (dato != 'null')) {
			 $('#modalDocument').modal({show:true, backdrop: 'static'});	 
				parametros={
					tabla:"eportafolios",
					campollave:"ID",
					bd:"Mysql",
					valorllave:id,
					RUTA: dato
				};
				$.ajax({
				type: "POST",
				url:"../base/actualiza.php",
				data: parametros,
				success: function(data){
					$('#dlgproceso').modal("hide"); 
					$('#modalDocument').modal("hide");
					if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
					else {alert ("Se ha guardado el portafolio de la asignatura: "+materia);}
										
				}					     
				});    	    
		}
}


function agregarActividad(id, descrip,modulo,elciclo){

	alert ("entre");
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
	       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header widget-header  widget-color-green\">"+
		 
		   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-plus-square\"></i><span class=\"menu-text\"> Actividad:"+descrip+"</span></b> </span>"+
		   "             <input type=\"hidden\" id=\"elid\" value=\""+id+"\"></input>"+
		   "             <button type=\"button\" class=\"close\" onclick=\"cierraModal();\"  aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+

		   "             <div style=\"text-align:center;\"> "+ 	
	       "                  <button title=\"Guardar todos los cambios\" type=\"button\" class=\"btn btn-white btn-warning btn-bold\" onclick=\"guardarActividades();\">"+
		   "                  <i class=\"ace-icon fa fa-floppy-o bigger-120 red\"></i>Guardar Actividades</button>"+	
		   "             </div>"+	
		   "          </div>"+  
		   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+		
		   "             <div class=\"row\"> "+			
	       "                 <div class=\"col-sm-1\"> "+	
	       "                      <div><span class=\"label label-warning\">Orden</span>	"+    
		   "                           <input  class=\"form-control\" id=\"orden\"></input>"+
		   "                      </div>"+	
		   "                  </div>"+
		   "                 <div class=\"col-sm-4\"> "+	
	       "                      <div><span class=\"label label-success\">Actividad</span>	"+     
		   "                           <input class=\"form-control\" id=\"actividad\"></input>"+
		   "                      </div>"+	
		   "                  </div>"+
		   "                 <div class=\"col-sm-4\"> "+	
	       "                      <div><span class=\"label label-success\">Entregable</span>	"+   
		   "                           <input class=\"form-control\" id=\"entregable\"></input>"+
		   "                      </div>"+	
		   "                  </div>"+		
		   "                 <div class=\"col-sm-2\"> "+	
	       "                      <div><span class=\"label label-success\">Fecha</span>	"+      
		   "                           <div class=\"input-group\"><input class=\"form-control date-picker\" id=\"fecha\" "+
	       "                                type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
	       "                                <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
		   "                      </div>"+	
		   "                  </div>"+   
	       "                 <div class=\"col-sm-1\"> "+
	       "                      <div style=\"padding-bottom:22px;\"> </div>"+   
	       "                          <button title=\"Agregar un nuevo campo\" type=\"button\" class=\"btn btn-white btn-dark btn-bold\" onclick=\"insertaActividad('"+id+"','"+descrip+"','"+modulo+"','"+elciclo+"');\">"+
		   "                          <i class=\"ace-icon fa fa-plus  bigger-120 blue\"></i></button>"+	   
		   "                 </div>"+	   
		   "             </div>"+		
           "             <div class=\"space-10\"></div>"+		   
		   "             <div class=\"row\"> "+		
	       "                  <table id=\"tabActividad\" class= \"table table-condensed table-bordered table-hover\">"+
	   	   "                         <thead>  "+
		   "                               <tr>"+
		   "                             	   <th>Op</th> "+
		   "                             	   <th>PDF</th> "+//Sirve para le lectura del renglon al momento de validar cruce
		   "                             	   <th>R</th> "+//Sirve para le lectura del renglon al momento de validar cruce
		   "                             	   <th>ID</th> "+ 
		   "                                   <th>Orden</th> "+
		   "                                   <th>Actividad</th> "+
		   "                                   <th>Entregable</th> "+
		   "                                   <th>Fecha</th> "+
		   "                               </tr> "+
		   "                         </thead>" +
		   "                   </table>"+	
		   "             </div> "+ //div del row
		   "             <div class=\"space-10\"></div>"+		   
		   "          </div>"+ //div del modal-body		 
	       "          </div>"+ //div del modal content		  
		   "      </div>"+ //div del modal dialog
		   "   </div>"+ //div del modal-fade
		   "</div>";
	 
		
		alert ("pase");
 		 
		$("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	    }

	    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
	    
		$('#modalDocument').modal({show:true, backdrop: 'static'});
		
		alert ("en prueba");

		elsql="SELECT count(*) as NUM FROM eplandescarga WHERE PLAN_IDACT='"+id+"'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){  
	        	      losdatos=JSON.parse(data);  
	        	        
	        	      jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; });
			
						  
	        	    	  if (hay>0) {	        	    			        	    	
							elsql="SELECT * FROM eplandescarga WHERE PLAN_IDACT='"+id+"' order by PLAN_ORDEN";
						    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
							$.ajax({
								  type: "POST",
								  data:parametros,
	        	   	              url:  "../base/getdatossqlSeg.php",
	        	   	           success: function(data){ 	        	   	        	
	        	   	        	     generaTablaActividad(JSON.parse(data),"CAPTURA",elciclo);
	        	   	                 },
	        	   	           error: function(data) {	                  
	        	   	                      alert('ERROR: '+data);
	        	   	                  }
	        	   	          });
	        	   	   
	        	    	  }

	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	   });
		   

}




	function verActividad(id, descrip,modulo,elciclo){
			script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header widget-header  widget-color-green\">"+
			 
			   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-plus-square\"></i><span class=\"menu-text\"> Actividad:"+descrip+"</span></b> </span>"+
			   "             <input type=\"hidden\" id=\"elid\" value=\""+id+"\"></input>"+
			   "             <button type=\"button\" class=\"close\"  data-dismiss=\"modal\"   aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
			   "                  <span aria-hidden=\"true\">&times;</span>"+
			   "             </button>"+
			   "          </div>"+  
			   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+					  
			   "             <div class=\"row\"> "+		
		       "                  <table id=\"tabActividad\" class= \"table table-condensed table-bordered table-hover\">"+
		   	   "                         <thead>  "+
			   "                               <tr>"+
			   "                             	   <th>Op</th> "+
			   "                             	   <th>PDF</th> "+
			   "                             	   <th>R</th> "+//Sirve para le lectura del renglon al momento de validar cruce
			   "                             	   <th>ID</th> "+ 
			   "                                   <th>Orden</th> "+
			   "                                   <th>Actividad</th> "+
			   "                                   <th>Entregable</th> "+
			   "                                   <th>Fecha</th> "+
			   "                               </tr> "+
			   "                         </thead>" +
			   "                   </table>"+	
			   "             </div> "+ //div del row
			   "          </div>"+ //div del modal-body		 
		       "          </div>"+ //div del modal content		  
			   "      </div>"+ //div del modal dialog
			   "   </div>"+ //div del modal-fade
			   "</div>";
		 
			
			
	 		 
			 $("#modalDocument").remove();
		    if (! ( $("#modalDocument").length )) {
		        $("#grid_"+modulo).append(script);
		    }

		    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		    
		    $('#modalDocument').modal({show:true, backdrop: 'static'});

			elsql="SELECT count(*) as NUM FROM eplandescarga WHERE PLAN_IDACT='"+id+"'";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
		        	      losdatos=JSON.parse(data);  
		        	        
		        	      jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; });
		        
		        	    	  if (hay>0) {	  
								  elsql=  "SELECT * FROM eplandescarga WHERE PLAN_IDACT='"+id+"' order by PLAN_ORDEN" ;
								  parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"} 	    			        	    	
		        	    		  $.ajax({
									  type: "POST",
									  data:parametros,
		        	   	           url:  "../base/getdatossqlSeg.php",
		        	   	           success: function(data){ 	        	   	        	
		        	   	        	     generaTablaActividad(JSON.parse(data),"VER",elciclo);
		        	   	                 },
		        	   	           error: function(data) {	                  
		        	   	                      alert('ERROR: '+data);
		        	   	                  }
		        	   	          });
		        	   	   
		        	    	  }

		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		   });
			   

	}



	function subirArchivo (id,actividad) {

		ladefault="..\\..\\imagenes\\menu\\pdf.png";
		script="<div class=\"modal fade\" id=\"modalFile\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	    "   <div class=\"modal-dialog modal-sm \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+
		   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-thumb-tack\"></i><span class=\"menu-text\"> Actividad: "+actividad+"</span></b> </span>"+
		   "             <input type=\"hidden\" id=\"elidfile\" value=\""+id+"\"></input>"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "             <div class=\"row\"> "+			
	       "                 <div class=\"col-sm-12\"> "+			   
		    "                       <div class=\"widget-box widget-color-green2\"> "+
			"                              <div class=\"widget-header\">"+
			"	                                <h4 class=\"widget-title lighter smaller\">Subir Archivo PDF</h4>"+
			"                              </div>"+
			"                              <div id =\"elarchivo\" style=\"overflow-y: auto;height:200px;width:100%;\">"+
			"                                  <div class=\"row\" style=\"width:90%;\">"+
			"                                    <div class=\"col-sm-1\"></div>"+
			"                                    <div class=\"col-sm-10\">"+
			"                                        <input class=\"fileSigea\" type=\"file\" id=\"file_"+id+"\" name=\"file_"+id+"\""+
  	        "                                        onchange=\"subirPDFDriveSave('file_"+id+"','ACTDES_"+$("#elciclo").html()+"','pdf_"+id+"','I_"+id+"','pdf','S','PLAN_ID','"+id+"','"+actividad+"','eplandescarga','edita','');\">"+
  	        "                                    <\div>"+  
  	        "                                    <div class=\"col-sm-1\"></div>"+	         	                                     
  	        "                                  <\div>"+
  	        "                                  <div class=\"row\">"+
   	        "                                      <a target=\"_blank\" id=\"enlace_I_"+id+"_2\" href=\"\">"+
		    "                                          <img width=\"40px\" height=\"40px\" id=\"pdf_"+id+"_2\" name=\"pdf_"+id+"_2\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	        "                                      </a>"+
	        "                                  <\div>"+
 			"                              </div>"+
		    "                       </div>"+
		    "                 </div>"+
		    "             </div>"+	    
	       "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   "</div>";
		   
		 $("#modalFile").remove();
		 if (! ( $("#modalFile").length )) {$("body").append(script);}
		    
		 $('#modalFile').modal({show:true, backdrop: 'static', keyboard: false});

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
		   
   }

	   

   function generaTablaActividad(grid_data, op,elciclo){		
	   	 $("#cuerpoActividad").empty();
	   	 $("#tabActividad").append("<tbody id=\"cuerpoActividad\">");
	       c=1;	
	       global=1; 

	       ladefault="..\\..\\imagenes\\menu\\pdf.png";
		     
	   	jQuery.each(grid_data, function(clave, valor) { 	


	   	    var f = new Date();
			fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();

         	
			var f1 = new Date(f.getFullYear(), f.getMonth() +1, f.getDate());
			var f2 = new Date(valor.PLAN_FECHAENTREGA.substring(6,10), valor.PLAN_FECHAENTREGA.substring(3,5), valor.PLAN_FECHAENTREGA.substring(0,2));
			
			btnSubir="<td></td>";
			
            if (f1<=f2) {         
                  btnSubir="<td width=\"20%\">"+
		                   "     <input class=\"fileSigea\" type=\"file\" id=\"file_"+valor.PLAN_ID+"\" name=\"file_"+valor.PLAN_ID+"\""+
	                       "            onchange=\"subirPDFDriveSave('file_"+valor.PLAN_ID+"','ACTDES_"+elciclo+"','pdf_"+valor.PLAN_ID+"','"+valor.PLAN_ID+"','pdf','S','PLAN_ID','"+valor.PLAN_ID+"','"+valor.PLAN_ACTIVIDAD+"','eplandescarga','edita','');\">"+	    	       	                      
						   "</td>";										  
                }
			

			 cad1="";cad2="";cad3="";cad4="";
			 botonPDF="";
		   	 if (op=='CAPTURA') { 
		    	    boton="<td><button title=\"Borrar Actividad del Plan\" onclick=\"eliminarFila('row"+c+"','"+valor.PLAN_ID+"');\" class=\"btn btn-xs btn-danger\"> " +
	                   "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
					   "</button></td>";
					cad1="ondblclick=\"editarCeldaTabla('a_"+c+"_1','INPUT','1','"+valor.PLAN_ID+"');\"";
			 		cad2="ondblclick=\"editarCeldaTabla('a_"+c+"_2','INPUT','2','"+valor.PLAN_ID+"');\"";
			 		cad3="ondblclick=\"editarCeldaTabla('a_"+c+"_3','INPUT','3','"+valor.PLAN_ID+"');\"";
			 		cad4="ondblclick=\"editarCeldaTabla('a_"+c+"_4','FECHA','4','"+valor.PLAN_ID+"');\"";	                
			     }
	
		     else { boton=btnSubir;}
				  
			stElim="display:none; cursor:pointer;"
			if (valor.RUTA.length>0) {stElim="cursor:pointer; display:block; ";}

			botonPDF="<a target=\"_blank\" id=\"enlace_"+valor.PLAN_ID+"\" href=\""+valor.RUTA+"\">"+
							"           <img width=\"40px\" height=\"40px\" id=\"pdf_"+valor.PLAN_ID+"\" name=\"pdf_"+valor.PLAN_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
							"      </a>"+	
							"<input  type=\"hidden\" value=\""+valor.RUTA+"\"  name=\""+valor.PLAN_ID+"\" id=\""+valor.PLAN_ID+"\"  placeholder=\"\" />";						
							"      <i style=\""+stElim+"\" id=\"btnEli_"+valor.PLAN_ID+"\" title=\"Eliminar el archivo que se subi&oacute; anteriormente\" "+
							"         onclick=\"eliminarEnlaceDrive('file_"+valor.PLAN_ID+"','ACTDES_"+elciclo+"','pdf_"+valor.PLAN_ID+"','"+valor.PLAN_ID+"','pdf','S','PLAN_ID','"+valor.PLAN_ID+"','"+valor.PLAN_ACTIVIDAD+"','eplandescarga','edita','');\" "+
							"         class=\"ace-icon fa red fa-trash-o bigger-120\"></i>";   	  

		   	 $("#cuerpoActividad").append("<tr id=\"row"+c+"\">");
		   	 $("#row"+c).append(boton);
		   	 $("#row"+c).append("<td>"+botonPDF+"</td>");
		   	 $("#row"+c).append("<td>"+c+"</td>");
			 $("#row"+c).append("<td>"+valor.PLAN_ID+"</td>");	
			 
		     $("#row"+c).append("<td id=\"a_"+c+"_1\" "+cad1+" >"+valor.PLAN_ORDEN+"</td>");		
		   	 $("#row"+c).append("<td id=\"a_"+c+"_2\" "+cad2+" >"+valor.PLAN_ACTIVIDAD+"</td>");	
		   	 $("#row"+c).append("<td id=\"a_"+c+"_3\" "+cad3+" >"+valor.PLAN_ENTREGABLE+"</td>");	
		     $("#row"+c).append("<td id=\"a_"+c+"_4\" "+cad4+" >"+valor.PLAN_FECHAENTREGA+"</td>");	

		     if (valor.RUTA=='') { 
	                $('#enlace_'+valor.PLAN_ID).attr('disabled', 'disabled');
	                $('#enlace_'+valor.PLAN_ID).attr('href', '');
	                $('#pdf_'+valor.PLAN_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");	                
	       	    }

		 	       		   
	   		c++;
	   		global=c;
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
			
	   }

	    
      function insertaActividad(id,descrip,modulo,elciclo){	

	

	    if (($("#orden").val().length>0) && ($("#actividad").val().length>0) && ($("#entregable").val().length>0) && ($("#fecha").val().length>0) ) {
					
					var f = new Date();
					fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();
					parametros={tabla:"eplandescarga",
								bd:"Mysql",
								_INSTITUCION:"ITSM",
								_CAMPUS:"0",
								PLAN_IDACT: $("#elid").val(),
								PLAN_ORDEN:  $("#orden").val(),
								PLAN_ACTIVIDAD: $("#actividad").val(),							
								PLAN_ENTREGABLE: $("#entregable").val(),
								PLAN_FECHAENTREGA: $("#fecha").val(),
								PLAN_FECHA:fechacap,
								PLAN_USER:"<?php echo $_SESSION["usuario"];?>",
								_INSTITUCION:"<?php echo $_SESSION["INSTITUCION"];?>",
								_CAMPUS:"<?php echo $_SESSION["CAMPUS"];?>"							
								};     
							$.ajax({
									type: "POST",
									url:"../base/inserta.php",
									data: parametros,
									success: function(data){ 																		
										elsql="SELECT * FROM eplandescarga WHERE PLAN_IDACT='"+id+"' order by PLAN_ORDEN";
										parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
										$.ajax({
											type: "POST",
											data:parametros,
											url:  "../base/getdatossqlSeg.php",
										success: function(data){ 	        	   	        	
												generaTablaActividad(JSON.parse(data),"CAPTURA",elciclo);
												},
										error: function(data) {	                  
													alert('ERROR: '+data);
												}
										});      	
									}
								});
					
	    }
	    else
	    { alert ("Todos los campos son necesarios");}

	   }


	    function eliminarFila(nombre,elid) {
	    	var r = confirm("Seguro que desea eliminar esta actividad");
	    	if (r == true) {
				parametros={tabla:"eplandescarga",bd:"Mysql",campollave:"PLAN_ID",valorllave:elid} }

				$.ajax({
					type: "POST",
					url:"../base/eliminar.php",
					data: parametros,
					success: function(data){   
						$("#"+nombre).remove();
					}
				});
		}


	    function guardarActividades(){cierraModal();}


	    function cierraModal(){
			if($(".editandotabla").length>0){
				alert("Existen elementos que se estan editando y no se han guardado"); 
				}
			else {$('#modalDocument').modal("hide");}
		}

	    function imprimirPlan(){	
	       window.open("plan.php?profesor=<?php echo $_SESSION["usuario"];?>"+"&ciclo="+$("#elciclo").html()+"&ciclod="+$("#elciclod").html(), '_blank');
		}
		
		/*======== Evento cuando se edita una celda =======================*/
		function aceptarEdicionCelda(celda, renglon, id){
			$("#"+celda).html($("#INP_"+celda).val()); 

			if (renglon=="1") {parametros={tabla:"eplandescarga",bd:"Mysql",campollave:"PLAN_ID",valorllave:id,PLAN_ORDEN:$("#"+celda).html()} }
			if (renglon=="2") {parametros={tabla:"eplandescarga",bd:"Mysql",campollave:"PLAN_ID",valorllave:id,PLAN_ACTIVIDAD:$("#"+celda).html()} }
			if (renglon=="3") {parametros={tabla:"eplandescarga",bd:"Mysql",campollave:"PLAN_ID",valorllave:id,PLAN_ENTREGABLE:$("#"+celda).html()} }
			if (renglon=="4") {parametros={tabla:"eplandescarga",bd:"Mysql",campollave:"PLAN_ID",valorllave:id,PLAN_FECHAENTREGA:$("#"+celda).html()} }

    		$.ajax({
				type: "POST",
				url:"../base/actualiza.php",
				data: parametros,
				success: function(data){   
		
				}
			});
			
		}

		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
