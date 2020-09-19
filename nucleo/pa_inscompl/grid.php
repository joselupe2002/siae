
<?php session_start(); if (($_SESSION['inicio']==1)) { 
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
		<link rel="stylesheet" href="../../css/sigea.css" />


        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    
	    
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>


          

          
             
         <div class="tabbable fontRoboto">
			 <ul class="nav nav-tabs" id="myTab">
			 	 <li class="active">
					  <a data-toggle="tab" href="#act">Actividades<span id="lisact" class="badge badge-danger">0</span></a>
				 </li>
				 <li >
					 <a data-toggle="tab" href="#ins"><i class="green ace-icon fa fa-home bigger-120"></i>Inscripciones</a>
			     </li>
                
		     </ul>
		     
		     <div class="tab-content">
			 		  <div id="act" class="tab-pane fade in active">
					       <h3 class="header smaller lighter red">Actividades Complementarias Inscritas</h3>
					   
					             <div id="fichas" class="row"> </div>
		
					  </div>

					  <div id="ins" class="tab-pane">
							 <h3 class="header smaller lighter red">Listado de Actividades Complementarias</h3>
			                 <div  class="table-responsive">
				                 <table id=tabHorarios class= "fontRoboto display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
				   	                 <thead>  
					                      <tr>
					                          <th style="text-align: center;">Inscribir</th> 
					                          <th style="text-align: center;">Id</th> 
					                          <th style="text-align: center;">Actividad</th> 
					                          <th style="text-align: center;">Inicia</th> 
					                          <th style="text-align: center;">Termina</th> 
					                          <th style="text-align: center;">Responsable</th> 	
											  <th style="text-align: center;">Lugar/Aula</th> 	
					                          <th style="text-align: center;">Requerimientos</th> 	
											  <th style="text-align: center;">Carrera</th> 		                          
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
		var ext=false;
		var elnombre="";
		var miciclo="";
		var numAct=0;

		<?php if ( isset($_GET["matricula"])) { 
			echo "lamat='".$_GET["matricula"]."';";
			echo "elnombre='".$_GET["nombre"]."';";
			echo "miciclo='".$_GET["ciclo"]."';";
			echo "ext=true;"; } ?>


		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 
			if (!ext) {lamat="<?php echo $_SESSION['usuario']?>";}
			cargarAct();
			cargarActIns();
			

			});




 function generaTabla(grid_data){
       c=0;
       $("#cuerpo").empty();
	   $("#tabHorarios").append("<tbody id=\"cuerpo\">");
       jQuery.each(grid_data, function(clave, valor) { 	
    	    
    	    $("#cuerpo").append("<tr id=\"row"+valor.ID+"\">");
    	    $("#row"+valor.ID).append("<td><button onclick=\"confirma('"+valor.ID+"','<?php echo $_SESSION["usuario"]?>','"+valor.CICLO+"','"+valor.ACTIVIDAD+"');\" "+			
			        "class=\"btn btn-primary\"><i class=\"ace-icon fa fa-thumbs-up bigger-120\"></i> Inscribirme</button></td>");
    	    $("#row"+valor.ID).append("<td>"+valor.ID+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.ACTIVIDAD+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.INICIA+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.TERMINA+"</td>");
    	    
    	    $("#row"+valor.ID).append("<td>"+valor.RESPONSABLED+"</td>");
			$("#row"+valor.ID).append("<td>"+valor.AULA+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.REQUERIMIENTO+"</td>");
			$("#row"+valor.ID).append("<td>"+valor.CARRERAD+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.LUNES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.MARTES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.MIERCOLES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.JUEVES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.VIERNES+"</td>");
		    $("#row"+valor.ID).append("<td>"+valor.SABADO+"</td>");
			
        });
}		



 function generaTablaIns(grid_data){
       c=0;
       $("#fichas").empty();
     jQuery.each(grid_data, function(clave, valor) { 	
         cadDias="";
         cadDias="<div class=\"row\"><div class=\"col-sm-12\">"+             
                 "<table id=tabHorarios class= \"display table-condensed table-striped table-sm table-bordered table-hover\" style=\"width:100%;\">"+
                 "<thead>"+  
                    "<tr>"+
                         "<th style=\"text-align: center;\"><small class=\"text-success\">LUN</small></th>"+ 
                         "<th style=\"text-align: center;\"><small class=\"text-success\">MAR</small></th>"+ 
                         "<th style=\"text-align: center;\"><small class=\"text-success\">MIE</small></th>"+ 
                         "<th style=\"text-align: center;\"><small class=\"text-success\">JUE</small></th>"+ 
                         "<th style=\"text-align: center;\"><small class=\"text-success\">VIE</small></th>"+ 
                         "<th style=\"text-align: center;\"><small class=\"text-success\">SAB</small></th>"+ 
                    "</tr>"+
                 "</thead>"+
                 "<tbody>"+
	                 "<tr>"+
		                 "<td style=\"text-align: center;\"><small class=\"text-primary\">"+valor.LUNES+"</small></td>"+ 
		                 "<td style=\"text-align: center;\"><small class=\"text-primary\">"+valor.MARTES+"</small></td>"+ 
		                 "<td style=\"text-align: center;\"><small class=\"text-primary\">"+valor.MIERCOLES+"</small></td>"+ 
		                 "<td style=\"text-align: center;\"><small class=\"text-primary\">"+valor.JUEVES+"</small></td>"+ 
		                 "<td style=\"text-align: center;\"><small class=\"text-primary\">"+valor.VIERNES+"</small></td>"+ 
		                 "<td style=\"text-align: center;\"><small class=\"text-primary\">"+valor.SABADO+"</small></td>"+ 
	                 "</tr>"+
                 "</tbody></div></div>";
            

    	 $("#fichas").append("<div class=\"col-md-6\">"+
		                         "<div class=\"thumbnail search-thumbnail\">"+
		       							//"<i class=\"pull-right  ace-icon red fa fa-trash-o bigger-80\" style=\"cursor: pointer;\"></i>"+
			   							"<span class=\"search-promotion label label-success\">"+valor.TIPO+"</span> "+                                          
			   							"<div class=\"space-12\"></div>"+
			  							"<h5 class=\"text-primary\" style=\"text-align: center\"><strong>"+valor.NOMBREACT+"</strong></h5>"+
			  							"<div class=\"row\">"+
			  					             "<div class=\"col-sm-5\"><span class=\"label label-success label-white middle\">INICIA: "+valor.INICIA+"</span></div>"+
											   "<div class=\"col-sm-5\" style=\"text-align:right\"><span class=\"label label-danger label-white middle\">TERMINA: "+valor.TERMINA+"</span></div>"+		  						        
											   "<div class=\"col-sm-2\">"+
											          "<a target=\"_blank\" id=\"enlace_"+valor.ACTIVIDAD+"\" href=\""+valor.RUTA+"\">"+
                                                      "     <img width=\"40px\" height=\"40px\" id=\"pdf_"+valor.ACTIVIDAD+"\" name=\"pdf_\" src=\"..\\..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
                                                      "</a>"+
											   "</div>"+		  						        
											   
			  					         "</div>"+
              							cadDias+   
              							"<div class=\"space-6\"></div>"+          
              							"<div class=\"row\">"+
                    						"<div class=\"col-sm-12\" style=\"text-align: right;\"> "+
                          							"<span  title=\"N&uacute;mero de cr&eacute;ditos\" class=\"pull-left badge badge-success\">"+valor.CREDITOS+"</span>"+
                          							"<i class=\"ace-icon blue fa fa-user bigger-80\" style=\"cursor: pointer;\"></i>"+
                          							"<small class=\"text-warning\" title=\"Responsable de la Actividad\"><strong>"+valor.RESPONSABLED+"</strong></small>"+
                    						"</div>"+
              							"</div> "+ 
              							"<div class=\"space-6\"></div>"+  
              							"<div class=\"clearfix\">"+
										    "<span class=\"pull-left\">Calificaci&oacute;n</span>"+
										    "<span class=\"pull-right\">"+valor.PROM+"</span>"+
									        "</div>"+

									        "<div class=\"progress progress-mini\">"+
										    "<div style=\"width:"+(valor.PROM*25)+"%\" class=\"progress-bar\"></div>"+
									   "</div>"+                                  
								"</div>"+
							"</div>");  	   
		    c++;	
		$("#lisact").html(c);
		if ((valor.RUTA=='') || (valor.RUTA==null)) { 								
								 $('#enlace_'+valor.ACTIVIDAD).click(function(evt) {evt.preventDefault();});
			                     $('#enlace_'+valor.ACTIVIDAD).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
								 $('#pdf_'+valor.ACTIVIDAD).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");	                        		                       	                    
		               	    }
	    	
      });

     
}		


function confirma(id,matricula,ciclo,laactividad){
if (numAct>=5) {alert ("Ya tiene "+numAct+" Actividades inscritas para este ciclo ya no se puede inscribir a mas"); return 0;}  
if (confirm("Seguro que desea Inscribirse a la Actividad: "+laactividad)) {
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
					   numAct++;
	                  }	
             else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
         }					     
     });      
}

}








function cargarActIns() {
	elsql="SELECT a.ACTIVIDAD, b.ACTIVIDADD AS TIPO, b.ACTIVIDAD as NOMBREACT,b.INICIA, b.TERMINA, b.RESPONSABLED, b.CREDITOS,"+ 
        		 "c.PROM, b.LUNES, b.MARTES,b.MIERCOLES,b.JUEVES,b.VIERNES,b.SABADO,b.DOMINGO, c.COMP_LIBERACION as RUTA  FROM einscompl a "+
        		 "left outer join ecalificagen c on (a.ACTIVIDAD=c.ACTIVIDAD and a.MATRICULA=c.MATRICULA)"+
        		 ", vecomplementaria b "+
				 "WHERE a.ACTIVIDAD=b.ID and a.MATRICULA='"+lamat+"';"				 
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	 $.ajax({
		 type: "POST",
		 data:parametros,
         url:  "../base/getdatossqlSeg.php",
         success: function(data){
      	     generaTablaIns(JSON.parse(data));	        	     
               },
         error: function(data) {	                  
                    alert('ERROR: '+data);
                }
        });
}


function cargarAct(){
	    elsql="select a.CICLO, a.CARRERAD, a.INICIA, a.TERMINA, a.ID, a.ACTIVIDAD, a.ACTIVIDADD, a.RESPONSABLED, a.REQUERIMIENTO, a.LUNES, a.MARTES, a.MIERCOLES, a.JUEVES, a.VIERNES, a.SABADO, "+
		      "(select count(*) from einscompl where MATRICULA='"+lamat+"' and CICLO=getciclo()) as NUMINS,"+
	          " a.AULA from vecomplementaria a where a.CUPO>a.INS AND a.CICLO=getciclo() and AUTORIZADO='S' "+			  
			 " and a.ID NOT IN (SELECT ACTIVIDAD FROM einscompl WHERE MATRICULA='"+lamat+"');"

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){
				     numAct=JSON.parse(data)[0]["NUMINS"];
	        	     generaTabla(JSON.parse(data));	        	     
	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });
}




	


		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
