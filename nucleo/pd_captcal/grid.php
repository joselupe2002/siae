
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
		<link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />

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
                          <th style="text-align: center;">Id</th> 
						  <th style="text-align: center;">Ciclo</th> 
                          <th style="text-align: center;">Sem</th> 
                          <th style="text-align: center;">Grupo</th> 
                          <th style="text-align: center;">Cve. Asig.</th> 
						  <th style="text-align: center;">Asignatura</th> 
						  <th style="text-align: center;">Evaluar</th> 
						  <th style="text-align: center;">Promediar</th> 
						  <th style="text-align: center;">Reporte</th> 	
						  <th style="text-align: center;">Asesorias</th> 
						  <th style="text-align: center;">RepxCorte</th> 
						  <th style="text-align: center;">Mot. Rep.</th> 
						  <th style="text-align: center;">Estratégias</th> 
						  <th style="text-align: center;">Avance Prog.</th>                                                             	   	  
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
<script src="<?php echo $nivel; ?>js/utilerias.js?v=<?php echo date('YmdHis');?>"></script>



<script type="text/javascript">
        var todasColumnas;
        var haycorte;
		var idcorte=0;
		var tipocorte="";
        var inicia_corte="";
        var termina_corte="";  
        
		$(document).ready(function($) { var Body = $('body'); $(document).bind("contextmenu",function(e){return false;}); Body.addClass('preloader-site');});
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
			$("#row"+valor.ID).append("<td>"+valor.ID+"</td>");
			$("#row"+valor.ID).append("<td>"+valor.CICLO+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.SEM+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.SIE+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.MATERIA+"</td>");
			$("#row"+valor.ID).append("<td>"+valor.MATERIAD+"</td>");
			
    	    $("#row"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Evaluar a los alumnos inscritos\" onclick=\"evaluar('"+valor.ID+"','<?php echo $_SESSION["usuario"]?>','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"');\""+
											  " class=\"btn btn-xs btn-white btn-primary btn-round\"><i class=\"ace-icon fa red fa-building bigger-120\"></i></button></td>");
			
			//Boton de Promediar
			$("#row"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Calcula Calificación Final\" onclick=\"calcularFinal('<?php echo $_SESSION["usuario"]?>','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','pd_captcal');\""+
											  " class=\"btn btn-xs btn-white btn-success btn-round\"><i class=\"ace-icon fa blue fa-wrench bigger-140\"></i></button></td>");								  
											  
			//Boton de Boleta
			$("#row"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Reporte de Unidades\" onclick=\"imprimirBoleta('"+valor.ID+"','<?php echo $_SESSION["usuario"]?>','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"','"+valor.SEM+"');\""+
    	    	                              " class=\"btn btn-xs btn-white btn-warning btn-round\"><i class=\"ace-icon green fa fa-print bigger-140\"></i></button></td>");								  
    	    
			
			//Boton de asesorias
			$("#row"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Reporte de asesorias\" onclick=\"imprimirRepAses('"+valor.ID+"','<?php echo $_SESSION["usuario"]?>','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"','"+valor.SEM+"');\""+
    	    	                              " class=\"btn btn-xs btn-white btn-warning btn-round\"><i class=\"ace-icon pink fa fa-lightbulb-o bigger-140\"></i></button></td>");								  
    	    
			//Boton de Reporte por COrte
			$("#row"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Reporte de Reprobación x Corte\" onclick=\"verPantallaCorte('<?php echo $_SESSION["usuario"]?>','"+
    	    	                       valor.CICLO+"','"+valor.ID+"','REPROBACION');\""+
    	    	                     " class=\"btn btn-xs btn-white btn-primary btn-round\"><i class=\"ace-icon blue fa fa-th  bigger-140\"></i></button></td>");								  
    	    
			 //Boton de Motivos de Reprobación por corte
			$("#row"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Reporte de Motivos de Reprobación x Corte\" onclick=\"verPantallaCorte('<?php echo $_SESSION["usuario"]?>','"+
    	    	                       valor.CICLO+"','"+valor.ID+"','MOTIVOS');\""+
    	    	                     " class=\"btn btn-xs btn-white btn-primary btn-round\"><i class=\"ace-icon purple fa fa-eye bigger-140\"></i></button></td>");								  
    	    

			//Boton de Estratégias a Realizar
			$("#row"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Plantear estratégias para el corte de calificaciones\" onclick=\"verEstrategias('"+valor.ID+"','<?php echo $_SESSION["usuario"]?>','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"');\""+
											  " class=\"btn btn-xs btn-white btn-success btn-round\"><i class=\"ace-icon fa green fa-random bigger-120\"></i></button></td>");

			//Boton de Estratégias a Realizar
			$("#row"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Plantear estratégias para el corte de calificaciones\" onclick=\"verAvanceProg('"+valor.ID+"','<?php echo $_SESSION["usuario"]?>','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"');\""+
											  " class=\"btn btn-xs btn-white btn-success btn-round\"><i class=\"ace-icon fa blue fa-calendar bigger-120\"></i></button></td>");
							  
    	      
    	    

        });
}		


/*=======================AVANCE PROGRAMÁTICO DEL PROFESOR ================================*/
function verAvanceProg(id,profesor,materia,materiad,grupo,ciclo, base){
	window.location="avanceprog.php?base="+base+"&termina_corte="+termina_corte+"&inicia_corte="+inicia_corte+"&idcorte="+
								  idcorte+"&tipocorte="+tipocorte+"&id="+id+"&ciclo="+ciclo+"&profesor="+profesor+"&grupo="+
								  grupo+"&materia="+materia+"&materiad="+materiad+"&modulo=<?php echo $_GET["modulo"];?>";
}


/*========================ESTRATEGIAS PARA MEJORAR EL RENDIMIENTO EN EL CORTE ========================*/

function verEstrategias(id,profesor,materia,materiad,grupo,ciclo, base){
	window.location="estrategias.php?base="+base+"&termina_corte="+termina_corte+"&inicia_corte="+inicia_corte+"&idcorte="+
								  idcorte+"&tipocorte="+tipocorte+"&id="+id+"&ciclo="+ciclo+"&profesor="+profesor+"&grupo="+
								  grupo+"&materia="+materia+"&materiad="+materiad+"&modulo=<?php echo $_GET["modulo"];?>";
}

/*===============REPORTE POR CORTE DE CALIFICACIONES ========================================*/

function verPantallaCorte(elprof,elciclo,id, tipo){

	if (tipo=="REPROBACION") {evento="verReporteCorte";}
	if (tipo=="MOTIVOS") {evento="verReporteMotCorte";}
	dameVentana("ventCorte", "grid_pd_captcal","Reporte x Corte de Calificaciones","sm","bg-successs","fa fa-book blue bigger-180","370");
	$("#body_ventCorte").append("<div class=\"row fontRoboto\">"+
	                            "     <div class=\"col-sm-12\">"+								
						    	"	    	<label class=\"fontRobotoB\">No. Corte</label><select class=\"form-control\"  id=\"selCorte\"></select>"+							
								"	  </div>"+	
								"     <div class=\"col-sm-12\">"+								
						    	"	    	<label class=\"fontRobotoB\">Departamento</label><select class=\"form-control\"  id=\"selDepto\"></select>"+							
								"	  </div>"+								
								"</div><br>"+
								"<div class=\"col-sm-12\" style=\"text-align:center;\">"+	
								"         <button  onclick=\""+evento+"('"+elprof+"','"+elciclo+"','"+id+"');\" class=\"fontRobotoB btn btn-white btn-danger btn-bold bigger-100\">"+
								"            <i class= \"ace-icon fa fa-th bigger-100 blue\"></i>"+
								"            <span class=\"text-danger\">Ver Reporte</span>"+
								"         </button> "+
								"</div>");
	actualizaSelect("selCorte", "SELECT ID, DESCRIPCION FROM ecortescal where CLASIFICACION='CALIFICACION' AND CICLO=getciclo()"+
			                    " ORDER BY STR_TO_DATE(INICIA,'%d/%m/%Y')", "","");
	
	actualizaSelect("selDepto", "select DISTINCT DEPTO, URES_DESCRIP from vedgrupos, fures  where CICLO=getciclo() "+
	                            " AND PROFESOR="+elprof+" AND DEPTO=URES_URES", "","");
				

	
}

function verReporteCorte(elprof,elciclo,id){
	enlace="nucleo/repCorte/reporteCorte.php?profesor="+elprof+"&ciclo="+elciclo+"&corte="+$("#selCorte").val()+"&depto="+$("#selDepto").val();
	abrirPesta(enlace,"Reporte");
}

function verReporteMotCorte(elprof,elciclo,id){
	enlace="nucleo/pd_captcal/reporteCorteMot.php?id="+id+"&profesor="+elprof+"&ciclo="+elciclo+"&corte="+$("#selCorte").val()+"&depto="+$("#selDepto").val();
	abrirPesta(enlace,"Motivos");
}



/*======================================================================================*/

function verificarCorte(){
	$('#dlgproceso').modal({show:true, backdrop: 'static'});
	
	elsql="select * from ecortescal where  CICLO=getciclo() "+
		   " and ABIERTO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
		   " AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='CALIFICACION' "+
		   " order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 0,1";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
    $.ajax({
		   type: "POST",
		   data:parametros,
		   url:  "../base/getdatossqlSeg.php",
           success: function(data){
        	        haycorte=false;
        	        $("#stCorte").html("Corte Cerrado");                  
        	        jQuery.each(JSON.parse(data), function(clave, valor) { 	
                          haycorte=true; 
						  idcorte=valor.ID;
						  tipocorte=valor.TIPO;
                          inicia_corte=valor.INICIA;
                          termina_corte=valor.TERMINA;
                          $("#stCorte").html("Corte Abierto "+valor.DESCRIPCION);
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
		elsql="SELECT ID, MATERIA, MATERIAD, SIE, SEM, CICLO, BASE "+                
					   " FROM vcargasprof a where PROFESOR='<?php echo $_SESSION['usuario']?>'"+
					   //" and CICLO=getciclo() "+
					   " and CERRADOCAL='N' order by CICLO DESC,MATERIA";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
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
	 window.location="evaluar.php?base="+base+"&termina_corte="+termina_corte+"&inicia_corte="+inicia_corte+"&idcorte="+
								  idcorte+"&tipocorte="+tipocorte+"&id="+id+"&ciclo="+ciclo+"&profesor="+profesor+"&grupo="+
								  grupo+"&materia="+materia+"&materiad="+materiad+"&modulo=<?php echo $_GET["modulo"];?>";
}


function imprimirBoleta(id,profesor,materia,materiad,grupo,ciclo, base,semestre){
	enlace="nucleo/pd_captcal/repUni.php?grupo="+grupo+"&ciclo="+ciclo+"&profesor=<?php echo $_SESSION["usuario"];?>&materia="+
								  materia+"&materiad="+materiad+"&id="+id+"&semestre="+semestre;
	abrirPesta(enlace,"Rep.Uni.");

}

	

function imprimirRepAses(id,profesor,materia,materiad,grupo,ciclo, base,semestre){
	enlace="nucleo/pd_captcal/repAses.php?grupo="+grupo+"&ciclo="+ciclo+"&profesor=<?php echo $_SESSION["usuario"];?>&materia="+
								  materia+"&materiad="+materiad+"&id="+id+"&semestre="+semestre;
	abrirPesta(enlace,"Rep.Uni.");

}


		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
