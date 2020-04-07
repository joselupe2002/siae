
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

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    
	    
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
    
    <h3 class="header smaller lighter red">Listado de Actividades Complementarias</h3>
	<div  class="table-responsive">
		  <table id=tabHorarios class= "display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
			    <thead>  
                      <tr>
                          <th style="text-align: center;">Evaluar</th> 
                          <th style="text-align: center;">Id</th> 
                          <th style="text-align: center;">Actividad</th> 
                          <th style="text-align: center;">Inicia</th> 
                          <th style="text-align: center;">Termina</th> 
                          <th style="text-align: center;">Responsable</th> 	
                          <th style="text-align: center;">Requerimientos</th> 		                          
                          <th style="text-align: center;">Lunes</th> 
                          <th style="text-align: center;">Martes</th> 
                          <th style="text-align: center;">Miercoles</th> 
                          <th style="text-align: center;">Jueves</th> 
                          <th style="text-align: center;">Viernes</th> 
                          <th style="text-align: center;">Sabado</th> 		                                                 	   	   
					   </tr> 
			     </thead> 
	         </table>
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
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 
			cargarAct();
			});




 function generaTabla(grid_data){
       c=0;
       $("#cuerpo").empty();
	   $("#tabHorarios").append("<tbody id=\"cuerpo\">");
       jQuery.each(grid_data, function(clave, valor) { 	
    	    
    	    $("#cuerpo").append("<tr id=\"row"+valor.ID+"\">");
    	    $("#row"+valor.ID).append("<td><button title=\"Evaluar a los alumnos inscritos\" onclick=\"evaluar('"+valor.ID+"','<?php echo $_SESSION["usuario"]?>','"+valor.ACTIVIDAD+"','"+valor.RESPONSABLED+"');\""+
    	    	                              " class=\"btn btn-xs btn-white btn-primary\"><i class=\"ace-icon fa fa-building bigger-120\"></i></button></td>");
    	    $("#row"+valor.ID).append("<td>"+valor.ID+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.ACTIVIDAD+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.INICIA+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.TERMINA+"</td>");
    	    
    	    $("#row"+valor.ID).append("<td>"+valor.RESPONSABLED+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.REQUERIMIENTO+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.LUNES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.MARTES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.MIERCOLES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.JUEVES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.VIERNES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.SABADO+"</td>");
			
        });
}		



 
function confirma(id,matricula,ciclo){

	 var losdatos=[];

	 var f = new Date();
	 lafecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

	
	 parametros={
			 tabla:"einscompl",		
			 bd:"Mysql",	
			 MATRICULA:matricula,
			 ACTIVIDAD:id,
			 FECHAUS:lafecha,
			 CICLO:ciclo,
			 USUARIO:"<?php echo $_SESSION["usuario"]?>",
			 _INSTITUCION:"<?php echo $_SESSION["INSTITUCION"]?>",
			 _CAMPUS:"<?php echo $_SESSION["CAMPUS"]?>"	 			 
			};

	 $.ajax({
         type: "POST",
         url:"../base/inserta.php",
         data: parametros,
         success: function(data){		                                	                      
             if (!(data.substring(0,1)=="0"))	
	                 { 						                  
            	       $("#row"+id).remove();
            	       cargarActIns();
	                  }	
             else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
         }					     
     });      
     
}



function cargarAct(){
	    $.ajax({
	           type: "GET",
	           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select a.CICLO, a.INICIA, a.TERMINA, a.ID, a.ACTIVIDAD, a.ACTIVIDADD, a.RESPONSABLED, a.REQUERIMIENTO, a.LUNES, a.MARTES, a.MIERCOLES, a.JUEVES, a.VIERNES, a.SABADO, "+
	        		                                                   " a.AULA from vecomplementaria a where   AUTORIZADO='S' and ABIERTA='S' and RESPONSABLE='"+<?php  echo $_SESSION["usuario"];?>+"';"),
	           success: function(data){

	        	     generaTabla(JSON.parse(data));	        	     
	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });
}


function evaluar(id,usuario,descrip, responsable){
	 window.location="evaluar.php?id="+id+"&responsabled="+responsable+"&nombre="+descrip+"&modulo=<?php echo $_GET["modulo"];?>";
}



	


		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
