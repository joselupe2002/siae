
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
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/chosen.min.css" />

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    
	    
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
    
    <div class="row" >
		 <div class="col-sm-2" id="contCiclos"> 
		       <span class="label label-info">Ciclo Escolar</span>
		 </div>
		 <div class="col-sm-4" id="contProfesores"> 
		       <span class="label label-success">Profesor</span>
		 </div>
		 <div class="col-sm-4" style="padding-top:17px;"> 
		 	  <button title="Promediar todas las asignaturas del Profesor" onclick="promediarTodo()" class="btn btn-xs btn-white btn-primary btn-round">
		         <i class="ace-icon fa green fa-wrench bigger-140"></i> Promediar Todo
			  </button>
			  <button title="Cerrar todas las asignaturas del Profesor" onclick="cerrarTodo()" class="btn btn-xs btn-white btn-danger btn-round">
		         <i class="ace-icon  blue glyphicon glyphicon-folder-close bigger-140"></i> Cerrar Todo
			  </button>
		 </div>
	</div>
	<div class="space-12"></div>
	<div  class="table-responsive" id="contTabla">
		 
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
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.gritter.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.easypiechart.min.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>


<script type="text/javascript">
        var todasColumnas;
        var haycorte;
		var idcorte=0;
		var tipocorte="";
        var inicia_corte="";
        var termina_corte="";  
        
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 
			
			addSELECT("selCiclos","contCiclos","CICLOS", "", "","BUSQUEDA"); 
			addSELECT("selProfesores","contProfesores","PROPIO", "select EMPL_NUMERO, EMPL_NOMBRE FROM pempleados limit 1", "", "BUSQUEDA"); 
			
			
	    });

		function change_SELECT(elemento) {
        if (elemento=='selCiclos') {
		
			actualizaSelect("selProfesores","select distinct PROFESOR, CONCAT( PROFESORD ,' ',PROFESOR) from vcargasprof where CICLO='"+
										$("#selCiclos").val()+"' and CARRERA not in (12) ORDER BY PROFESORD","BUSQUEDA");
										
			
			}
	    if (elemento=='selProfesores') {
			cargarAct();
		}

    }



 function generaTabla(grid_data){
	   c=0;
	   $("#contTabla").empty();
	   $("#contTabla").append("<table id=tabCierre class= \"display table-condensed table-striped table-sm table-bordered table-hover nowrap \" style=\"overflow-y: auto;\">"+
							"		<thead> "+ 
							"			<tr>        "+                  
							"				<th style=\"text-align: center;\">Id</th> "+
							"				<th style=\"text-align: center;\">Sem</th> "+
							"				<th style=\"text-align: center;\">Grupo</th> "+
							"				<th style=\"text-align: center;\">Cve. Asig.</th> "+
							"				<th style=\"text-align: center;\">Asignatura</th> "+
							"				<th style=\"text-align: center;\">Promedia</th> "+
							"				<th style=\"text-align: center;\">Rep. Uni.</th> "+
							"				<th style=\"text-align: center;\">Boleta</th> "+
							"				<th style=\"text-align: center;\">Enviar</th> "+
							"				<th style=\"text-align: center;\">Cerrar</th> 	   "+                                                         	   	  
							"			</tr> "+
							"		</thead> "+
							"	</table>");
       $("#cuerpoCierre").empty();
	   $("#tabCierre").append("<tbody id=\"cuerpoCierre\">");
       jQuery.each(grid_data, function(clave, valor) { 	

		
			$("#cuerpoCierre").append("<tr id=\"rowCierre"+valor.ID+"\">");
			$("#rowCierre"+valor.ID).append("<td>"+valor.ID+"</td>");
    	    $("#rowCierre"+valor.ID).append("<td>"+valor.SEM+"</td>");
    	    $("#rowCierre"+valor.ID).append("<td>"+valor.SIE+"</td>");
    	    $("#rowCierre"+valor.ID).append("<td>"+valor.MATERIA+"</td>");
			$("#rowCierre"+valor.ID).append("<td>"+valor.MATERIAD+"</td>");
		
			//Boton de Promediar
			$("#rowCierre"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Calcula Calificaci&oacute;n Final\" onclick=\"calcularFinal('"+$("#selProfesores").val()+"','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','cierreCal');\""+
											  " class=\"btn btn-xs btn-white btn-success btn-round\"><i class=\"ace-icon fa green fa-wrench bigger-140\"></i></button></td>");								  
											  
			//Boton de Reporte de Unidades
			$("#rowCierre"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Imprimir Boleta de Calificaci&oacute;n\" onclick=\"imprimirRepUni('"+valor.ID+"','"+$("#selProfesores").val()+"','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"','"+valor.SEM+"');\""+
    	    	                              " class=\"btn btn-xs btn-white btn-warning btn-round\"><i class=\"ace-icon blue fa fa-list-alt bigger-140\"></i></button></td>");								  
			
			//Boton de Boleta
			$("#rowCierre"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Imprimir Boleta de Calificaci&oacute;n\" onclick=\"imprimirBoleta('"+valor.ID+"','"+$("#selProfesores").val()+"','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"','"+valor.SEM+"');\""+
											  " class=\"btn btn-xs btn-white btn-warning btn-round\"><i class=\"ace-icon blue fa fa-print bigger-140\"></i></button></td>");	

			//Boton de enviar boleta por correo
			$("#rowCierre"+valor.ID).append("<td style=\"text-align: center;\"><button title=\"Enviar email de Boleta de Calificaci&oacute;n\" onclick=\"enviarBoleta('"+valor.ID+"','"+$("#selProfesores").val()+"','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"','"+valor.SEM+"');\""+
											  " class=\"btn btn-xs btn-white btn-warning btn-round\"><i class=\"ace-icon pink fa fa-envelope bigger-140\"></i></button></td>");	
											  
			
			accion='S'; iconcierre="red glyphicon glyphicon-folder-close"; tit="Cerrar";
			if (valor.CERRADOCAL=='S') { accion='N'; iconcierre="green glyphicon glyphicon-folder-open"; tit="Abrir";}
			//Boton Cierre	
    	    $("#rowCierre"+valor.ID).append("<td style=\"text-align: center;\"><button title=\""+tit+" boleta de calificación\" onclick=\"cerrarBoleta('"+valor.ID+"','"+$("#selProfesores").val()+"','"+
    	    	                       valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','"+valor.BASE+"','"+accion+"');\""+
											  " class=\"btn btn-xs btn-white btn-primary btn-round\"><i class=\"ace-icon "+iconcierre+" bigger-120\"></i></button></td>");
        });
}		





function cargarAct(){
		$('#dlgproceso').modal({show:true, backdrop: 'static'});
		elsql="SELECT ID, MATERIA, MATERIAD, SIE, SEM, CICLO, BASE, CERRADOCAL "+                
			  " FROM vcargasprof a where  PROFESOR='"+$("#selProfesores").val()+"' and CICLO='"+$("#selCiclos").val()+"' AND CARRERA NOT IN (12)";
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


function cerrarBoleta(id,profesor,materia,materiad,grupo,ciclo, base,valor){
	if(confirm("Seguro que desea Cerrar la Boleta de : "+materiad+" Grupo: "+grupo)) {
		var f = new Date();
		fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
		res="";
	 
	    parametros={tabla:"edgrupos",bd:"Mysql",campollave:"DGRU_ID",valorllave:id,DGRU_CERRADOCAL:valor,
			FECHACIERRECAL:fechacap,USERCIERRECAL:"<?php echo $_SESSION["usuario"];?>"};
        $.ajax({
            type: "POST",
            url:"../base/actualiza.php",
            data: parametros,
            success: function(data){       

        	if (!(data.substring(0,1)=="0"))	{ 
				parametros2={tabla:"dlista",bd:"Mysql",campollave:"IDGRUPO",valorllave:id,CERRADO:valor};
				$.ajax({
						type: "POST",
						url:"../base/actualiza.php",
						data: parametros2,
						success: function(data){       
						if (!(data.substring(0,1)=="0"))	{ cargarAct();}	
						else {alert (" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}																															
						}					     
				}); 
			}
            else {alert (" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
                                           	                                        					         
            }					     
	   });  
	
	}
}


function imprimirBoleta(id,profesor,materia,materiad,grupo,ciclo, base,semestre){
	tit='Boleta';
	abrirPesta("nucleo/cierreCal/boleta.php?tipo=0&grupo="+grupo+"&ciclo="+ciclo+"&profesor="+$("#selProfesores").val()+"&materia="+
								  materia+"&materiad="+materiad+"&id="+id+"&semestre="+semestre,tit);
}

function enviarBoleta(id,profesor,materia,materiad,grupo,ciclo, base,semestre){
	tit='Enviando ...';
	abrirPesta("nucleo/cierreCal/boleta.php?tipo=2&grupo="+grupo+"&ciclo="+ciclo+"&profesor="+$("#selProfesores").val()+"&materia="+
								  materia+"&materiad="+materiad+"&id="+id+"&semestre="+semestre,tit);
}


function imprimirRepUni(id,profesor,materia,materiad,grupo,ciclo, base,semestre){
	window.open("../pd_captcal/repUni.php?grupo="+grupo+"&ciclo="+ciclo+"&profesor="+$("#selProfesores").val()+"&materia="+
								  materia+"&materiad="+materiad+"&id="+id+"&semestre="+semestre, '_blank'); 
}






function promediarTodo() {
		mostrarEspera("calculaProm","grid_cierraCal","Calculando Promedio")
		elsql="SELECT ID, PROFESOR, PROFESORD, MATERIA, MATERIAD, SIE, SEM, CICLO, BASE, CERRADOCAL "+                
			  " FROM vcargasprof a where  CICLO='"+$("#selCiclos").val()+"'"+
			  " AND PROFESOR='"+$("#selProfesores").val()+"'"+
			  " AND CARRERA NOT IN (12,10)";
	
	    if (!($("#vtnRes").is(":visible"))) { 
		     mostrarVentRes('vtnRes','txtResultados','grid_cierreCal','Resultados','modal-lg');
		 }
		 
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}			   
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){
				    listaMaterias=JSON.parse(data);
					jQuery.each(JSON.parse(data), function(clave, valor) { 	
						calcularFinal(valor.PROFESOR,valor.MATERIA,valor.MATERIAD,valor.SIE,valor.CICLO,'cierreCal');
						$('#txtResultados').val($('#txtResultados').val()+"CALCULADO: "+valor.MATERIA+" "+valor.PROFESORD+" "+valor.SIE+"\n");
					});					 
					 ocultarEspera("calculaProm");  	        	       	     
	                 },
	           error: function(data) {	  
	        	         ocultarEspera("calculaProm");                
	                      alert('ERROR: '+data);	                      
	                  }
			  });
} 

	

function cerrarTodo() {
		mostrarEspera("calculaProm","grid_cierraCal","Calculando Promedio")
		elsql="SELECT ID, PROFESOR, PROFESORD, MATERIA, MATERIAD, SIE, SEM, CICLO, BASE, CERRADOCAL "+                
			  " FROM vcargasprof a where  CICLO='"+$("#selCiclos").val()+"'"+
			  " AND PROFESOR='"+$("#selProfesores").val()+"'"+
			  " AND CARRERA NOT IN (12,10)";
	
	    if (!($("#vtnRes").is(":visible"))) { 
		     mostrarVentRes('vtnRes','txtResultados','grid_cierreCal','Resultados','modal-lg');
		 }
		 
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}			   
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){
				    listaMaterias=JSON.parse(data);
					jQuery.each(JSON.parse(data), function(clave, valor) { 
						
						var f = new Date();
						fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
						res="";
					
						parametros={tabla:"edgrupos",bd:"Mysql",campollave:"DGRU_ID",valorllave:valor.ID,DGRU_CERRADOCAL:"S",
							FECHACIERRECAL:fechacap,USERCIERRECAL:"<?php echo $_SESSION["usuario"];?>"};
						$.ajax({
							type: "POST",
							url:"../base/actualiza.php",
							data: parametros,
							success: function(data){       

							if (!(data.substring(0,1)=="0"))	{ 
								parametros2={tabla:"dlista",bd:"Mysql",campollave:"IDGRUPO",valorllave:valor.ID,CERRADO:"S"};
								$.ajax({
										type: "POST",
										url:"../base/actualiza.php",
										data: parametros2,
										success: function(data){       
																																				
										}					     
								}); 
							}
							else {alert (" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
						    }
						});
					
						$('#txtResultados').val($('#txtResultados').val()+"CERRADO: "+valor.ID+" "+valor.MATERIA+" "+valor.PROFESORD+" "+valor.SIE+"\n");
						cargarAct();  
					});					 
						  	       	     
	                 },
	           error: function(data) {	  
	        	         ocultarEspera("calculaProm");                
	                      alert('ERROR: '+data);	                      
	                  }
			  });
} 



		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
