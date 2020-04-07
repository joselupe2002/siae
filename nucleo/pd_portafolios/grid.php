
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


     <h3 class="header smaller lighter success"><strong>Asignaturas</strong></h3>
	     <div  class="table-responsive">
		     <table id=tabHorarios class= "display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
				   	<thead>  
					    <tr>
					        <th style="text-align: center;">ID</th> 
					        <th style="text-align: center;">Clave</th> 
					        <th style="text-align: center;">Asigantura</th> 
					        <th width="50%" style="text-align: center;">Subir</th> 
					        <th style="text-align: center;"></th> 
					        <th style="text-align: center;">Archivo</th> 		
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

 
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>          
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

<script src="<?php echo $nivel; ?>js/utilerias.js"></script>



<script type="text/javascript">
        var todasColumnas;
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
    
    	    
    	    $("#cuerpo").append("<tr id=\"row"+valor.ID+"\">");
    	    $("#row"+valor.ID).append("<td>"+valor.ID+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.MATERIA+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.MATE_DESCRIP+"</td>");

    	    
    	    $("#row"+valor.ID).append("<td width=\"50%\">"+
    	    		   "                      <input class=\"fileSigea\" type=\"file\" id=\"file_"+valor.MATERIA+"\" name=\"file_"+valor.MATERIA+"\""+
    	    	       "                          onchange=\"subirPDFDriveSave('file_"+valor.MATERIA+"','PORTAFOLIOSD','pdf_"+valor.MATERIA+"','"+valor.MATERIA+"','pdf','S','ID','"+valor.ID+"','"+valor.MATE_DESCRIP+"','eportafoliosd');\">"+
    	    	       
    	    	       "                      <input  type=\"hidden\" value=\""+valor.RUTA+"\"  name=\""+valor.MATERIA+"\" id=\""+valor.MATERIA+"\"  placeholder=\"\" />"+    	    	      
    	    	    "</td>");


    	    $("#row"+valor.ID).append("<td>"+ "<button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"guadarPortafolio('"+valor.ID+"','"+valor.MATERIA+"','"+valor.MATE_DESCRIP+"');\">"+
 	    		   "                           <i class=\"ace-icon fa fa-save bigger-120 red\"></i></button>"+"</td>");

    	    $("#row"+valor.ID).append(" <a target=\"_blank\" id=\"enlace_"+valor.MATERIA+"\" href=\""+valor.RUTA+"\">"+
    	  		   "                               <img width=\"40px\" height=\"40px\" id=\"pdf_"+valor.MATERIA+"\" name=\"pdf_"+valor.MATERIA+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
    	 		   "                          </a>"+
 	    	    "</td>");

    	    if (valor.RUTA=='') { 
                $('#enlace_'+valor.MATERIA).attr('disabled', 'disabled');
                $('#enlace_'+valor.MATERIA).attr('href', '#');
                $('#pdf_'+valor.MATERIA).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
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
		
}		



function cargarMaterias() {

	 $.ajax({
         type: "GET",
         url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT a.ID, a.CICLO, a.MATERIA, b.MATE_DESCRIP, a.PROFESOR, a.RUTA "+
        		 " FROM eportafoliosd a, cmaterias b where a.PROFESOR='<?php echo $_SESSION['usuario']?>' and a.CICLO=getciclo() "+
        		 " and a.MATERIA=b.MATE_CLAVE "),
         success: function(data){

      	     generaTabla(JSON.parse(data));	        	     
               },
         error: function(data) {	                  
                    alert('ERROR: '+data);
                }
        });
}



function guadarPortafolio(id,campo,materia){
	   alert ("entre");
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

		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
