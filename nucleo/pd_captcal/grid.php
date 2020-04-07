
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
    
    <h2 class="header smaller lighter red">Listado de Asignaturas <small><i class="ace-icon fa fa-angle-double-right"></i><span id="stCorte"></span></small> </h2> 
	<div  class="table-responsive">
		  <table id=tabHorarios class= "display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
			    <thead>  
                      <tr>
                          <th style="text-align: center;">Evaluar</th> 
                          <th style="text-align: center;">Id</th> 
                          <th style="text-align: center;">Sem</th> 
                          <th style="text-align: center;">Grupo</th> 
                          <th style="text-align: center;">Cve. Asig.</th> 
                          <th style="text-align: center;">Asignatura</th> 	
                                                            	   	  
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
        var haycorte;
        var idcorte=0;
        var inicia_corte="";
        var termina_corte="";  
        
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 
			verificarCorte();
	    });




 function generaTabla(grid_data){
       c=0;
       $("#cuerpo").empty();
	   $("#tabHorarios").append("<tbody id=\"cuerpo\">");
       jQuery.each(grid_data, function(clave, valor) { 	
    	    
    	    $("#cuerpo").append("<tr id=\"row"+valor.ID+"\">");
    	    $("#row"+valor.ID).append("<td><button title=\"Evaluar a los alumnos inscritos\" onclick=\"evaluar('"+valor.ID+"','<?php echo $_SESSION["usuario"]?>','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"');\""+
    	    	                              " class=\"btn btn-xs btn-white btn-primary\"><i class=\"ace-icon fa fa-building bigger-120\"></i></button></td>");
    	    $("#row"+valor.ID).append("<td>"+valor.ID+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.SEM+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.SIE+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.MATERIA+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.MATERIAD+"</td>");

        });
}		



function verificarCorte(){
    $('#dlgproceso').modal({show:true, backdrop: 'static'});
    $.ajax({
           type: "GET",
           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select * from `ecortescal` where  CICLO=getciclo() and ABIERTO='S' order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 0,1"),
           success: function(data){
        	        haycorte=false;
        	        $("#stCorte").html("Corte Cerrado");                  
        	        jQuery.each(JSON.parse(data), function(clave, valor) { 	
                          haycorte=true; 
                          idcorte=valor.ID;
                          inicia_corte=valor.INICIA;
                          termina_corte=valor.TERMINA;
                          $("#stCorte").html("Corte Abierto");
            	        });         	      
        	        cargarAct();        	      
                 },
           error: function(data) {	          	                     
                      alert('ERROR: '+data);	                      
                  }
          });
}



function cargarAct(){
	    $('#dlgproceso').modal({show:true, backdrop: 'static'});
	    $.ajax({
	           type: "GET",
	           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT ID, MATERIA, MATERIAD, SIE, SEM, CICLO, BASE "+                
	          		 " FROM vcargasprof a where ifnull(TIPOMAT,'') NOT IN ('T') and PROFESOR='<?php echo $_SESSION['usuario']?>' and CICLO=getciclo() "),
	           success: function(data){
	        	     generaTabla(JSON.parse(data));	 
	        	     $('#dlgproceso').modal("hide");        	     
	                 },
	           error: function(data) {	  
	        	          $('#dlgproceso').modal("hide");                 
	                      alert('ERROR: '+data);	                      
	                  }
	          });
}


function evaluar(id,profesor,materia,materiad,grupo,ciclo, base){
	 window.location="evaluar.php?base="+base+"&termina_corte="+termina_corte+"&inicia_corte="+inicia_corte+"&idcorte="+idcorte+"&id="+id+"&ciclo="+ciclo+"&profesor="+profesor+"&grupo="+grupo+"&materia="+materia+"&materiad="+materiad+"&modulo=<?php echo $_GET["modulo"];?>";
}



	


		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
