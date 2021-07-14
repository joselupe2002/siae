
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
		<link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="bodEstra" style="background-color: white; width:98%;">
	    
	    
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
    
    <div class="page-header">
         
         
         
         <div class="row">	               	
		         <div class="col-sm-6">  
                   <h1><?php echo $_GET["materiad"] ?><small><i class="ace-icon fa fa-angle-double-right"></i><?php echo $_GET["materia"] ?></small></h1>
              </div>	           
         </div>
		 <div class="row" id="encabezado">	               		           
         </div>
    
    </div>
    
    
		      
	<div  class="sigeaPrin table-responsive" style="overflow-y: auto; height: 300px; width:100%;" >
		  <table id="tabEstra" class= "fontRobotoB display table-condensed table-striped table-sm table-bordered table-hover nowrap" style="width:98%;">
		  	<thead>  
				<tr>
					<th style="text-align: center;">No.</th> 
					<th style="text-align: center;">Op</th> 
					<th style="text-align: center;">Estrategia</th> 
					<th style="text-align: center;">Inicia</th> 
					<th style="text-align: center;">Termina</th> 	
					<th style="text-align: center;" class="hidden-480">Obs</th> 	
					<th style="text-align: center;">Evidencia</th> 	                         																	
				</tr> 
			</thead> 
		  </table>
	</div>
	
	<div class="space-10"></div>
	<div style="text-align:center;" class="row">
         <div class="col-sm-2"> 
              <button class="btn btn-white btn-danger btn-bold" onclick="regresar();"><i class="ace-icon fa fa-reply-all bigger-120 blue"></i>Regresar    </button>
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

<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>

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
        var eltidepocorte;
		var porcRepEst=0;
        
		$(document).ready(function($) { var Body = $('body'); $(document).bind("contextmenu",function(e){return false;});  Body.addClass('preloader-site'); });
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});


		jQuery(function($) { 
			$("#encabezado").append(" <div class=\"col-sm-1\"></div>"+
			                    "<div class=\"col-sm-3\">"+								
						    	"	    	<label class=\"fontRobotoB label label-success\">No. Corte</label><select onchange=\"seleccionaCorte('<?php echo $_GET["id"]?>');\" class=\"form-control\"  id=\"selCorteEs\"></select>"+							
								"</div>"+
								"<div class=\"col-sm-1\">"+								
						    	"	    	<label class=\"fontRobotoB label label-success\">% Reprobación</label><input class=\"form-control input-mask-numero\" id=\"porrep\"></input>"+							
								"</div>"+
								"<div class=\"col-sm-1\" style=\"padding-top:23px;\">"+								
						    	"<button title=\"Insertar una estrategia\" onclick=\"insertarEst('<?php echo $_GET["id"]?>');\""+
								"        class=\"btn  btn-white btn-success btn-round fontRobotoB\"><i class=\"ace-icon fa blue fa-plus-square bigger-150\"></i>Nueva Estrategia</button>"+
								"</div>"
																
								);

			actualizaSelect("selCorteEs", "SELECT ID, DESCRIPCION FROM ecortescal where CLASIFICACION='CALIFICACION' AND CICLO=getciclo()"+
			                    " ORDER BY STR_TO_DATE(INICIA,'%d/%m/%Y')", "","");
			$(".input-mask-numero").mask("999");
		
		});

function seleccionaCorte(id){
	cargaTablaEstra(id);
	
	
}

function insertarEst(id) {
	if (($("#selCorteEs").val()>0) && ($("#porrep").val()!='')) {
		dameVentana("ventEstra", "bodEstra","Insertar Estrategias","lg","bg-successs","fa fa-random blue bigger-180","370");
		$("#body_ventEstra").append("<div class=\"row fontRobotoB bigger-120\">"+
									"     <div class=\"col-sm-12\">"+								
									"	    	<label class=\"fontRobotoB\">Estrategia</label><select onchange=\"verExplicacion();\" class=\"form-control\"  id=\"selEstrategia\"></select>"+							
									"	  </div>"+	
									"     <div class=\"col-sm-12 \" id=\"explicacion\">"+														    	
									"	  </div>"+	
									"     <div class=\"col-sm-6\">"+								
									"	    	<label class=\"fontRobotoB\">Observaciones/Actividades a desarrollar</label><textarea class=\"form-control\"  id=\"obsEstrategia\"></textarea>"+							
									"	  </div>"+
									"     <div class=\"col-sm-3\"> "+
									"         <label>Inicio</label>"+
									"         <div class=\"input-group\"><input  class=\"form-control date-picker\"  id=\"inicioEst\" "+
									"         type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
									"        <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
								    "     </div>"+
									"     <div class=\"col-sm-3\"> "+
									"         <label>Inicio</label>"+
									"         <div class=\"input-group\"><input  class=\"form-control date-picker\"  id=\"finEst\" "+
									"         type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
									"        <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
								    "     </div>"+							
									"</div><br>"+
									"<div class=\"col-sm-12\" style=\"text-align:center;\">"+	
									"         <button  onclick=\"insertarEstra('"+id+"');\" class=\"fontRobotoB btn btn-white btn-danger btn-bold bigger-130\">"+
									"            <i class= \"ace-icon fa fa-save bigger-130 blue\"></i>"+
									"            <span class=\"text-danger\">Guardar Estrategia</span>"+
									"         </button> "+
									"</div>");

		$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		actualizaSelect("selEstrategia", "SELECT ID, ESTRATEGIA FROM estrategiasrep where TIPO='RE' "+
		" AND ID NOT IN (SELECT IDESTRA FROM estrarepro WHERE IDDETALLE='"+id+"' "+
		"and IDCORTE='"+$("#selCorteEs").val()+"') ORDER BY ESTRATEGIA", "","BUSQUEDA");
	}
	else {
		alert ("Antes de insertar Una estrategia debe seleccionar el corte y llenar el campo Porcentaje de Reprobación")
	}
}
	

function verExplicacion(){
	elsql="SELECT * FROM estrategiasrep WHERE ID='"+$("#selEstrategia").val()+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
    $.ajax({
		   type: "POST",
		   data:parametros,
		   url:  "../base/getdatossqlSeg.php",
           success: function(data){
			   datos=JSON.parse(data);
			   $("#explicacion").html("<div class=\"col-sm-8 alert alert-info\">"+
			                                "<span class=\"fontRoboto\"><i class=\"fa fa-info-circle blue\"></i> <b>Descripción</b><br>"+datos[0]["EXPLICACION"]+"</span>"+
									  "</div>"+
									  "<div class=\"col-sm-4 alert alert-danger\">"+
			                                "<span class=\"fontRoboto\"><i class=\"fa fa-check-circle green\"></i> <b>Evidencia</b><br>"+datos[0]["EVIDENCIA"]+"</span>"+
									  "</div>");
		   }
	});

}


function insertarEstra(id){
	lafecha=dameFecha("FECHAHORA");
    parametros={tabla:"estrarepro",
			    bd:"Mysql",
			    _INSTITUCION:"<?php echo $_SESSION["INSTITUCION"]?>",
			    _CAMPUS:"<?php echo $_SESSION["CAMPUS"]?>",
			    IDDETALLE:id,
				IDCORTE:$("#selCorteEs").val(),	
				INICIA:$("#inicioEst").val(),
				TERMINA:$("#finEst").val(),		
				PORREP:$("#porrep").val(),	
				IDESTRA:$("#selEstrategia").val(),
				OBS:$("#obsEstrategia").val(),
                USUARIO:"<?php echo $_SESSION["usuario"]?>",
				FECHAUS:lafecha	
			};
			    $.ajax({
			 		  type: "POST",
			 		  url:"../base/inserta.php",
			 	      data: parametros,
			 	      success: function(data){  
						$("#ventEstra").modal("hide");   
						parametros={
							tabla:"estrarepro",
							campollave:"concat(IDDETALLE,IDCORTE)",
							valorllave:id+$("#selCorteEs").val(),
							bd:"Mysql",			
							PORREP:$("#porrep").val(),
						};
						$.ajax({
							type: "POST",
							url:"../base/actualiza.php",
							data: parametros,
							success: function(data){		                                	                      
								console.log (data);
							}					     
						});    
						 cargaTablaEstra(id);
					   }					
					});
}
		

function cargaTablaEstra(id){
	elsql="select * from vestrarepro where IDDETALLE='"+id+"' and IDCORTE='"+$("#selCorteEs").val()+"' order by ID";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){	
				grid_data=JSON.parse(data);			
				c=1;
       			$("#cuerpoEstra").empty();
	   			$("#tabEstra").append("<tbody id=\"cuerpoEstra\">");
				$("#porrep").val("");
      			jQuery.each(grid_data, function(clave, valor) { 	
					$("#cuerpoEstra").append("<tr id=\"row"+valor.ID+"\">");
					$("#row"+valor.ID).append("<td>"+c+"</td>");
					$("#row"+valor.ID).append("<td><button onclick=\"eliminarEstra('"+valor.ID+"');\" class=\"btn btn-xs btn-white\"><i class=\"ace-icon fa fa-trash-o red bigger-120\"></i></button></td>");
					$("#row"+valor.ID).append("<td>"+valor.ESTRATEGIA+"</td>");
					$("#row"+valor.ID).append("<td>"+valor.INICIA+"</td>");
					$("#row"+valor.ID).append("<td>"+valor.TERMINA+"</td>");
					$("#row"+valor.ID).append("<td>"+valor.OBS+"</td>");	
					$("#row"+valor.ID).append("<td><div style=\"width:200px;\" id=\"file"+valor.ID+"\"></div></td>");	
					
					
					cadRuta=valor.RUTA;		
					if(typeof cadRuta === 'undefined'){ cadRuta="";}
					activaEliminar="S";
					dameSubirArchivoDrive("file"+valor.ID,"","ADJ_"+valor.ID,'estrategiasRepro','pdf',
					'ID',valor.ID,'EVIDENCIA DE ESTRATEGIA '+valor.ID,'eadjgenerales','alta',"ESTREP_"+valor.ID+"_"+valor.IDCORTE+"_"+valor.IDDETALLE,cadRuta,activaEliminar);	


					c++;
					porcRepEst=valor.PORREP;
					$("#porrep").val(porcRepEst);
        		});				
			}			
	});

}


function eliminarEstra(id) {
	if (confirm("Seguro que desea borrrar la estrategia No. "+id)) {
		parametros={
						tabla:"estrarepro",
						campollave:"ID",
						valorllave:id,
						bd:"Mysql"
						};

		$.ajax({
					type: "POST",
					url:"../base/eliminar.php",
					data: parametros,
					success: function(data){
						console.log(data);
						$("#row"+id).remove();
					}
				});		 
			}     
}



function regresar(){
			window.location="grid.php?modulo=<?php echo $_GET["modulo"];?> ";	
			}

</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
