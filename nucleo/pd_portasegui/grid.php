
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
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-datepicker3.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-datetimepicker.min.css" />

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


      <h3 class="header smaller lighter text-success"><strong>Asignaturas del ciclo: <i class="ace-icon fa fa-angle-double-right"></i> <small id="elciclo"></small> <small id="elciclod"></small></strong></h3>
	     <div  class="table-responsive">
		     <table id=tabHorarios class= "display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
				   	<thead>  
					    <tr style="background-color: #042893; color: white;">
					        <th style="text-align: center;">ID</th> 
							<th style="text-align: center;">Ciclo</th> 
					        <th style="text-align: center;">Sem</th> 
					        <th style="text-align: center;">Grupo</th> 
					        <th style="text-align: center;">Clave</th> 					        
					        <th style="text-align: center;">Asigantura</th> 
					        <th colspan="5" style="text-align: center;">Encuadre</th> 					        
					        <th colspan="2"  style="text-align: center;">Diagn&oacute;stica</th> 
					        <th style="text-align: center;">Unidades</th> 		
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

<script src="<?php echo $nivel; ?>js/utilerias.js?v=<?php echo date('YmdHis'); ?>"></script>



<script type="text/javascript">
        var todasColumnas;
		var global,globalUni;
		var cargandoSubtemas=true;
		var cargandoTemas=true;
		var operacion="";

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
			$("#row"+valor.ID).append("<td>"+valor.CICLO+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.SEM+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.SIE+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.MATERIA+"</td>");
    	    $("#row"+valor.ID).append("<td>"+valor.MATERIAD+"</td>");


    	    $("#row"+valor.ID).append("<td style= \"text-align: center;\" ><a  onclick=\"verPlaneacion('"+valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"','"+valor.CICLO+"','grid_pd_portasegui','N');\" title=\"Fechas de planeaci&oacute;n de unidades\" "+
                    "class=\"btn btn-white btn-warning btn-bold\">"+
             "<i class=\"ace-icon fa fa-calendar-o bigger-160 red \"></i>"+
			 "</a></td>");
			 

            
    	    $("#row"+valor.ID).append("<td style= \"text-align: center;\" ><a  onclick=\"captEncuadre('"+valor.ID+"','"+valor.MATERIA+"','"+valor.MATERIAD+"');\" title=\"Capturar encuadre de la asignatura\" "+
    	    	                                  "class=\"btn btn-white btn-info btn-bold\">"+
					                       "<i class=\"ace-icon fa fa-list-alt bigger-160 green \"></i>"+
					                       "</a></td>");

    	    $("#row"+valor.ID).append("<td style= \"text-align: center;\" ><a  onclick=\"impEncuadre('"+valor.ID+"','"+valor.MATERIA+"','"+valor.MATERIAD+"');\" title=\"Imprimir encuadre de la asignatura\" "+
                    "class=\"btn btn-white btn-info btn-bold\">"+
             "<i class=\"ace-icon fa fa-print bigger-160 blue \"></i>"+
             "</a></td>");

    	    //================================eENCUADRE =============================================
    	    $("#row"+valor.ID).append("<td width=\"20%\">"+
 	    		   "                      <input class=\"fileSigea\"  type=\"file\" id=\"file1_"+valor.MATERIA+valor.SIE+"\" name=\"file1_"+valor.MATERIA+valor.SIE+"\""+
 	    	       "                          onchange=\"subirPDFDriveSave('file1_"+valor.MATERIA+valor.SIE+"','EVIDENCIAS_"+valor.CICLO+"','pdf1_"+valor.MATERIA+valor.SIE+"','"+valor.MATERIA+valor.SIE+"1','pdf','S','ID','"+valor.ID+"','"+valor.MATERIAD+" - ENCUADRE','eadjuntos','alta','ENCUADRE');\">"+
 	    	       
 	    	       "                      <input  type=\"hidden\" value=\""+valor.RUTAENCUADRE+"\"  name=\""+valor.MATERIA+valor.SIE+"1\" id=\""+valor.MATERIA+valor.SIE+"1\"  placeholder=\"\" />"+    	    	      
 	    	    "</td>");


    	    stElim="display:none; cursor:pointer;";
    	    if (valor.RUTAENCUADRE.length>0) { stElim="cursor:pointer; display:block; ";}    	    	  
            eliminarEncuadre="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.MATERIA+valor.SIE+"1\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
				                        "onclick=\"eliminarEnlaceDrive('file1_"+valor.MATERIA+valor.SIE+"','EVIDENCIAS_"+valor.CICLO+"',"+
				                        "'pdf1_"+valor.MATERIA+valor.SIE+"','"+valor.MATERIA+valor.SIE+"1','pdf','S','ID','"+
				                        valor.ID+"','"+valor.MATERIAD+"-ENCUADRE',"+
				                        "'eadjuntos','alta','ENCUADRE');\"></i> "; 

    	    $("#row"+valor.ID).append("<td><div class=\"btn-group\"> <a title=\"Ver Archivo de encuadre\" target=\"_blank\" id=\"enlace_"+valor.MATERIA+valor.SIE+"1\" href=\""+valor.RUTAENCUADRE+"\">"+
     	  		   "                               <img width=\"40px\" height=\"40px\" id=\"pdf1_"+valor.MATERIA+valor.SIE+"\" name=\"pdf1_"+valor.MATERIA+valor.SIE+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
     	 		   "                          </a>"+eliminarEncuadre+"</div>"+
  	    	    "</td>");


    	    //================================DIAGNOSTICA =============================================
    	    $("#row"+valor.ID).append("<td width=\"20%\">"+
  	    		   "                      <input class=\"fileSigea\" type=\"file\" id=\"file2_"+valor.MATERIA+valor.SIE+"\" name=\"file2_"+valor.MATERIA+valor.SIE+"\""+
  	    	       "                          onchange=\"subirPDFDriveSave('file2_"+valor.MATERIA+valor.SIE+"','EVIDENCIAS_"+valor.CICLO+"','pdf2_"+valor.MATERIA+valor.SIE+"','"+valor.MATERIA+valor.SIE+"2','pdf','S','ID','"+valor.ID+"','"+valor.MATERIAD+" - EVAL. DIAG. ','eadjuntos','alta','DIAGNOSTICA');\">"+
  	    	       
  	    	       "                      <input  type=\"hidden\" value=\""+valor.RUTADIAGNOSTICA+"\"  name=\""+valor.MATERIA+valor.SIE+"2\" id=\""+valor.MATERIA+valor.SIE+"2\"  placeholder=\"\" />"+    	    	      
  	    	    "</td>");

    	    stElim="display:none; cursor:pointer;";
    	    if (valor.RUTADIAGNOSTICA.length>0) { stElim="cursor:pointer; display:block; ";}    	    	  
            eliminarDiagnostica="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.MATERIA+valor.SIE+"2\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
				                        "onclick=\"eliminarEnlaceDrive('file2_"+valor.MATERIA+valor.SIE+"','EVIDENCIAS_"+valor.CICLO+"',"+
				                        "'pdf2_"+valor.MATERIA+valor.SIE+"','"+valor.MATERIA+valor.SIE+"2','pdf','S','ID','"+
				                        valor.ID+"','"+valor.MATERIAD+"-DIAG',"+
				                        "'eadjuntos','alta','DIAGNOSTICA');\"></i> "; 

     	    $("#row"+valor.ID).append("<td><div class=\"btn-group\">  <a title=\"Ver Archivo de Evaluaci&oacute;n Diagn&oacute;stica\" target=\"_blank\" id=\"enlace_"+valor.MATERIA+valor.SIE+"2\" href=\""+valor.RUTADIAGNOSTICA+"\">"+
      	  		   "                               <img width=\"40px\" height=\"40px\" id=\"pdf2_"+valor.MATERIA+valor.SIE+"\" name=\"pdf2_"+valor.MATERIA+valor.SIE+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
      	 		   "                         </a>"+eliminarDiagnostica+"</div>"+
   	    	    "</td>");

     	 
    	    $("#row"+valor.ID).append("<td style= \"text-align: center;\" ><a  onclick=\"subirUnidades('"+valor.CICLO+"','"+valor.ID+"','"+valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.SIE+"');\" title=\"Subir evidencias de las Unidades\" "+
                    "class=\"btn btn-white btn-primary btn-bold\">"+
                    "<i class=\"ace-icon fa fa-tasks bigger-160 yellow \"></i>"+
                    "</a></td>");


    	    if (valor.RUTAENCUADRE=='') { 
                $('#enlace_'+valor.MATERIA+valor.SIE+"1").attr('disabled', 'disabled');
                $('#enlace_'+valor.MATERIA+valor.SIE+"1").attr('href', '#');
                $('#pdf1_'+valor.MATERIA+valor.SIE).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
       	    }
    	    if (valor.RUTADIAGNOSTICA=='') { 
                $('#enlace_'+valor.MATERIA+valor.SIE+"2").attr('disabled', 'disabled');
                $('#enlace_'+valor.MATERIA+valor.SIE+"2").attr('href', '#');
                $('#pdf2_'+valor.MATERIA+valor.SIE).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
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

	

	elsql="SELECT ID, MATERIA, MATERIAD, SIE, SEM, CICLO, "+
                 " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=a.ID and b.AUX='ENCUADRE'),'') AS RUTAENCUADRE, "+
                 " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=a.ID and b.AUX='DIAGNOSTICA'),'') AS RUTADIAGNOSTICA "+                 
				 " FROM vcargasprof a where ifnull(TIPOMAT,'') NOT IN ('T') and PROFESOR='<?php echo $_SESSION['usuario']?>' "+
				 " and CERRADOCAL='N' order by CICLO DESC,MATERIA";
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



function guadarPortafolio(id,campo,materia){
	
	    dato=$("#"+campo).val();
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


function impEncuadre(id, materia, descrip){
	window.open("encuadres.php?ID="+id+"&materiad="+materia, '_blank');
}

 function captEncuadre(id, materia, descrip){
			script="<div class=\"modal fade\" id=\"modalDocumentEnc\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div style=\"height:10px;\" class=\"modal-header widget-header  widget-color-green\">"+			 
			   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Asignatura:"+descrip+"</span></b> </span>"+
			   "             <input type=\"hidden\" id=\"elid\" value=\""+id+"\"></input>"+
			   "             <button type=\"button\" class=\"close\" onclick=\"cierraModal();\"  aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
			   "                  <span aria-hidden=\"true\">&times;</span>"+
			   "             </button>"+
			   "             <div style=\"text-align:center;\"> "+ 	
		       "                  <button title=\"Guardar todos los cambios\" type=\"button\" class=\"btn btn-white btn-warning btn-bold\" onclick=\"guardarActividades();\">"+
			   "                  <i class=\"ace-icon fa fa-floppy-o bigger-120 red\"></i>Guardar Encuadre</button>"+	
			   "             </div>"+	
			   "          </div>"+  
			   "          <div id=\"frmdescarga\" style=\"overflow-y: auto; height:350px;\" class=\"modal-body\" >"+	
			   "               <ul class=\"nav nav-tabs\" > "+
			   "                  <li class=\"active\"><a data-toggle=\"tab\" href=\"#tabEv\"><i class=\"menu-icon green fa fa-thumbs-down\"></i><span class=\"menu-text\">Evidencias</span></a></li> "+
			   "                  <li><a data-toggle=\"tab\" href=\"#tabAdd\"><i class=\"menu-icon blue fa fa-group\"></i><span class=\"menu-text\">Adicional</span></a></li> "+
			   "               </ul> "+
			   "               <div class=\"tab-content\">"+
			   "                   <div id=\"tabEv\" class=\"tab-pane fade in active\">"+				   					 
			   "                      <div class=\"row\" style=\"overflow-x: auto; overflow-y: auto; height:100%;\"> "+		
		       "                         <table id=\"tabActividad\" class= \"table table-condensed table-striped table-bordered table-hover\"\">"+
		   	   "                             <thead>  "+
			   "                               <tr>"+
			   "                             	   <th>R</th> "+//Sirve para le lectura del renglon al momento de validar cruce
			   "                             	   <th>ID</th> "+ 
			   "                                   <th>No.</th> "+
			   "                                   <th>Unidad</th> "+
			 //  "                                   <th>Fecha Eval.</th> "+
			   "                                   <th style=\"text-align:center;\"><span class=\"label label-sm label-primary arrowed arrowed-right\"> Ev. Producto (Hacer)</span></th> "+
			   "                                   <th style=\"text-align:center;\"><span class=\"label label-sm label-primary arrowed arrowed-right\">Ev. Desempe&ntilde;o (Hacer)</span></th> "+
			   "                                   <th style=\"text-align:center;\"><span class=\"label label-sm label-yellow  arrowed arrowed-right\">Ev. Conocimiento (Saber)</span></th> "+
			   "                                   <th style=\"text-align:center;\"><span class=\"label label-sm label-purple  arrowed arrowed-right\">Ev. Actitud (Ser)</span></th> "+
			   "                               </tr> "+
			   "                             </thead>" +
			   "                          </table>"+				   
			   "                      </div> "+ //div del row
			   "                   </div>"+	//div de la pesta�a		   			   
			   "                   <div id=\"tabAdd\" class=\"tab-pane fade\">"+	
			   "                        <div class=\"row\"> "+		
			   "                            <div class=\"col-md-12\">"+
			   "                                 <span class=\"label label-success\">Objetivo(s) general  de la asignatura. (competencias espec&iacute;ficas)</span>"+
			   "                                 <textarea id=\"aportacion\" style=\"width:100%;\"></textarea>"+
			   "                            </div>"+ 
			   "                        </div> "+ //div del row
			   "                        <div class=\"row\"> "+		
			   "                            <div class=\"col-md-6\">"+
			   "                                 <span class=\"label label-primary\">Pol&iacute;ticas Adicionales</span>"+
			   "                                 <textarea id=\"politicas\" style=\"width:100%;\"></textarea>"+
			   "                            </div>"+ 
			   "                            <div class=\"col-md-6\">"+
			   "                                 <span class=\"label label-warning\">Referencias</span>"+
			   "                                 <textarea id=\"bibliografia\" style=\"width:100%;\"></textarea>"+
			   "                            </div>"+ 		   
			   "                        </div> "+ //div del row
			   "                        <div class=\"row\"> "+		
			   "                            <div class=\"col-md-12\">"+
			   "                                 <span class=\"label label-danger\">Apoyos Did&aacute;ctivos</span>"+
			   "                                 <textarea id=\"apoyos\" style=\"width:100%;\"></textarea>"+
			   "                            </div>"+ 
			   "                        </div> "+ //div del row
			   "                   </div>"+ 
			   "               </div>"+ //div de las pesta�as gral 			   	  
			   "          </div>"+ //div del modal-body		 
		       "          </div>"+ //div del modal content		  
			   "      </div>"+ //div del modal dialog
			   "   </div>"+ //div del modal-fade
			   "</div>";
		 
			
			
			
			 $("#modalDocumentEnc").remove();
		    if (! ( $("#modalDocumentEnc").length )) {
		        $("#grid_<?php echo $_GET['modulo']; ?>").append(script);
		    }

		    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		    
		    $('#modalDocumentEnc').modal({show:true, backdrop: 'static'});

			elsql="SELECT  UNID_NUMERO, UNID_DESCRIP, UNID_ID,IFNULL(ENCU_FECHAEVAL,'') AS ENCU_FECHAEVAL,"+
		                  " IFNULL(ENCU_ID,'0') AS ENCU_ID, IFNULL(ENCU_EC,'') AS EC, IFNULL(ENCU_EP,'') AS EP,"+
		                  " IFNULL(ENCU_ED,'') AS ED, IFNULL(ENCU_EA,'') AS EA  FROM eunidades j "+
		                  " left outer join encuadres k on (j.UNID_ID=k.`ENCU_IDTEMA` and k.`ENCU_IDDETGRUPO`="+id+")"+
						  " where j.`UNID_MATERIA`='"+materia+"' and UNID_PRED='' order by UNID_NUMERO";
			
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
						  losdatos=JSON.parse(data);  
						 
		        	      generaTablaActividad(JSON.parse(data),"CAPTURA");
						  //cargamos los datos adicionales
						  elsql="SELECT * from encuadresadd where ENCU_IDDETGRUPO="+id;
						  parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		        	      $.ajax({
							  type: "POST",
							  data:parametros,
		   		           url:  "../base/getdatossqlSeg.php",
		   		           success: function(data){  
		   		        	      losdatos=JSON.parse(data);  
		   		        	      jQuery.each(losdatos, function(clave, valor) { 
                                       $("#aportacion").val(valor.ENCU_APORTACION);
                                       $("#politicas").val(valor.ENCU_POLITICAS);
                                       $("#bibliografia").val(valor.ENCU_BIBLIOGRAFIA);
                                       $("#apoyos").val(valor.ENCU_APOYOS);
				   		        	  });			        	    
		   		                 },
		   		           error: function(data) {	                  
		   		                      alert('ERROR: '+data);
		   		                  }
		   		          });
		        	      
		        	        		        	    
		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		   });			  
	}


    function generaTablaActividad(grid_data, op){		
	       $("#cuerpoActividad").empty();
		   $("#tabActividad").append("<tbody id=\"cuerpoActividad\">");
	       c=1;	
		   global=1; 
           jQuery.each(grid_data, function(clave, valor) { 				 
                 var f = new Date();
			     fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();
                 $("#cuerpoActividad").append("<tr id=\"rowe"+c+"\">");
				 $("#rowe"+c).append("<td>"+c+"</td>");
				 $("#rowe"+c).append("<td>"+valor.UNID_ID+"</td>");
				 $("#rowe"+c).append("<td>"+valor.UNID_NUMERO+"</td>");
				 $("#rowe"+c).append("<td>"+valor.UNID_DESCRIP+"</td>");	
				 $("#rowe"+c).append("<td><input  style=\"width:150px;\" id=\"a_"+c+"_2\" value=\""+valor.EP+"\" class=\"form-control\" id=\"ep\"></input></td>");	
				 $("#rowe"+c).append("<td><input  style=\"width:150px;\" id=\"a_"+c+"_3\" value=\""+valor.ED+"\" class=\"form-control\" id=\"ep\"></input></td>");
				 $("#rowe"+c).append("<td><input  style=\"width:150px;\" id=\"a_"+c+"_4\" value=\""+valor.EC+"\" class=\"form-control\" id=\"ep\"></input></td>");	
				 $("#rowe"+c).append("<td><input  readonly style=\"width:150px;\" id=\"a_"+c+"_5\" value=\""+"PORT. EVIDENCIA"+"\" class=\"form-control\" id=\"ep\"></input></td>");	       		   
				 $("#rowe"+c).append("<td><input class=\"hidden\" id=\"a_"+c+"_6\" value=\""+valor.ENCU_ID+"\"></input></td>");	       		   
				 c++;
					global=c;
					operacion='INSERTAR';  if (valor.ENCU_ID>0) {operacion='EDITAR';} 
			   	});
              $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});  
			   }

      function cierraModal(){
		var r = confirm("Seguro que desea cerrar la ventana no ha guardado los cambios");
    	if (r == true) {
    		 $('#modalDocumentEnc').modal("hide");  
            }
	    }


	function guardarActividades() {
       if (operacion=='EDITAR') {editarEncuadre();} 
	   else {insertarEncuadre();}

	}

      function insertarEncuadre(){

	 	    var losdatos=[];
	 	    var losdatosadd=[];
	        var i=1; 
	        var j=0; var cad="";
	        var c=-1;

	        var f = new Date();
			fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();

	        $('#tabActividad tr').each(function () {
	            if (c>=0) {
	            	        var i = $(this).find("td").eq(0).html();	            	
	    		    		cad+= $(this).find("td").eq(1).html()+"|"+ //ID DEL TEMA
	    		    		$("#elid").val()+"|"+ //id del detalle del grupo
	    		    		$("#a_"+i+"_1").val()+"|"+    //fecha
	    		    		$("#a_"+i+"_2").val()+"|"+    //evidencia de producto
	    		    		$("#a_"+i+"_3").val()+"|"+    //evidencia de desempe�o
	    		            $("#a_"+i+"_4").val()+"|"+    //evidencia de conocimiento
	    		            $("#a_"+i+"_5").val()+"|"+    //evidencia de actitud	    		            
	    		            fechacap+"|<?php echo $_SESSION["usuario"];?>|<?php echo $_SESSION["INSTITUCION"];?>|<?php echo $_SESSION["CAMPUS"];?>";    //fechaCaptura +
	    		            losdatos[c]=cad;
	    				    cad="";
	    		           }
	    				    c++;
	    		  });

		    
	    		  var loscampos = ["ENCU_IDTEMA","ENCU_IDDETGRUPO","ENCU_FECHAEVAL","ENCU_EP","ENCU_ED",
		    		                "ENCU_EC","ENCU_EA","ENCU_FECHACAP","ENCU_USER","_INSTITUCION","_CAMPUS"];

	    		  parametros={
    		    	      tabla:"encuadres",
    		    	      campollave:"ENCU_IDDETGRUPO",
    		    	      bd:"Mysql",
    		    	      valorllave:$("#elid").val(),
    		    	      eliminar: "S",
    		    	      separador:"|",
    		    	      campos: JSON.stringify(loscampos),
    		    	      datos: JSON.stringify(losdatos)
    		    	    };
		    	    
	                
	    		  losdatosadd[0]=$("#elid").val()+"|"+$("#bibliografia").val()+"|"+$("#politicas").val()+"|"+ $("#aportacion").val()+"|"+ $("#apoyos").val(); 
	    		  var loscamposadd = ["ENCU_IDDETGRUPO","ENCU_BIBLIOGRAFIA","ENCU_POLITICAS","ENCU_APORTACION","ENCU_APOYOS"];
	    		  parametrosadd={
    		    	      tabla:"encuadresadd",
    		    	      campollave:"ENCU_IDDETGRUPO",
    		    	      bd:"Mysql",
    		    	      valorllave:$("#elid").val(),
    		    	      eliminar: "S",
    		    	      separador:"|",
    		    	      campos: JSON.stringify(loscamposadd),
    		    	      datos: JSON.stringify(losdatosadd)
    		    	    };
		    	      	    
	    		  
	    		  $.ajax({
	    		    	  type: "POST",
	    		    	  url:"../base/grabadetalle.php",
	    		    	  data: parametros,
	    		    	  success: function(data){
	    		    	  if (data.length>0) {alert ("Ocurrio un error: "+data); console.log(data);}
	    		    	  else {  

	    		    		  $.ajax({
	    	    		    	  type: "POST",
	    	    		    	  url:"../base/grabadetalle.php",
	    	    		    	  data: parametrosadd,
	    	    		    	  success: function(data){
		    	    		    	  if (data.length>0) {alert ("Ocurrio un error: "+data); console.log(data);}
		    	    		    	  else {  
		    		    		    	      alert ("Registros guardados"); 
		    	    		    	          $('#modalDocumentEnc').modal("hide");  
		    	    		    	          $('#dlgproceso').modal("hide"); 
		    	    		    	       }		                                	                                        					          
	    	    		    	       } 				     
	    	    		           }); //del ajax que guarda adicional 		    		    	                            	                                        					        
	    		    	      }
	    		    	  }// del succcess del primero					     
	    		    }); 
			}
			

			function editarEncuadre(){
				var losdatos=[];
				var losdatosadd=[];
				var i=1; 
				var j=0; var cad="";
				var c=-1;

				var f = new Date();
				fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();

				$('#tabActividad tr').each(function () {
				if (c>=0) {
							var i = $(this).find("td").eq(0).html();
							parametros={
									tabla:"encuadres",
									campollave:"ENCU_ID",
									bd:"Mysql",
									valorllave:	$("#a_"+i+"_6").val(),
									ENCU_IDTEMA:$(this).find("td").eq(1).html(),
									ENCU_IDDETGRUPO:$("#elid").val(),
									ENCU_FECHAEVAL:$("#a_"+i+"_1").val(),
									ENCU_EP:$("#a_"+i+"_2").val(),
									ENCU_ED:$("#a_"+i+"_3").val(),
									ENCU_EC:$("#a_"+i+"_4").val(),
									ENCU_EA:$("#a_"+i+"_5").val(),
									ENCU_FECHACAP:fechacap,
									ENCU_USER:"<?php echo $_SESSION["usuario"];?>",
									_INSTITUCION:"<?php echo $_SESSION["INSTITUCION"];?>",
									_CAMPUS:"<?php echo $_SESSION["CAMPUS"];?>"                                    
								};	
								//alert ("ID. "+$("#a_"+i+"_6").val()+" "+parametros.valorllave+" "+parametros.ENCU_EP);							            
								$.ajax({
									type: "POST",
									url:"../base/actualiza.php",
									data: parametros,
									success: function(data){									
													                                	                                        					          
										} 				     
									});

							}
							c++;
					});

					
				  losdatosadd[0]=$("#elid").val()+"|"+$("#bibliografia").val()+"|"+$("#politicas").val()+"|"+ $("#aportacion").val()+"|"+ $("#apoyos").val(); 
	    		  var loscamposadd = ["ENCU_IDDETGRUPO","ENCU_BIBLIOGRAFIA","ENCU_POLITICAS","ENCU_APORTACION","ENCU_APOYOS"];
	    		  parametrosadd={
    		    	      tabla:"encuadresadd",
    		    	      campollave:"ENCU_IDDETGRUPO",
    		    	      bd:"Mysql",
    		    	      valorllave:$("#elid").val(),
    		    	      eliminar: "S",
    		    	      separador:"|",
    		    	      campos: JSON.stringify(loscamposadd),
    		    	      datos: JSON.stringify(losdatosadd)
						};		
									
					$.ajax({
						type: "POST",
						url:"../base/grabadetalle.php",
						data: parametrosadd,
						success: function(data){
							if (data.length>0) {alert ("Ocurrio un error: "+data); console.log(data);}
							else {  
									alert ("Registros guardados"); 
									$('#modalDocumentEnc').modal("hide");  
									$('#dlgproceso').modal("hide"); 
								}		                                	                                        					          
							} 				     
						}); //del ajax que guarda adicional 	
			}





      function subirUnidades(miciclo,id, materia, descrip, grupo){
			script="<div class=\"modal fade\" id=\"modalDocumentUni\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header widget-header  widget-color-green\">"+
			   "             <span class=\"label label-lg label-primary arrowed arrowed-right\"> Asignatura </span>"+
			   "             <span class=\"label label-lg label-success arrowed arrowed-right\">"+descrip+"</span>"+			   
			   "             <input type=\"hidden\" id=\"elidUnid\" value=\""+id+"\"></input>"+
			   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
			   "                  <span aria-hidden=\"true\">&times;</span>"+
			   "             </button>"+
			   "          </div>"+  
			   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+						  
			   "             <div class=\"row\" style=\"overflow-x: auto; overflow-y: auto; height:100%;\"> "+		
		       "                  <table id=\"tabUnidades\" class= \"table table-condensed table-bordered table-hover\">"+
		   	   "                         <thead>  "+
			   "                               <tr>"+			  
			   "                             	   <th>ID</th> "+ 
			   "                                   <th>Unidad</th> "+
			   "                                   <th colspan=\"2\">Ev. Producto (Hacer)</th> "+
			   "                                   <th colspan=\"2\">Ev. Desempe&ntilde;o (Hacer)</th> "+
			   "                                   <th colspan=\"2\">Ev. Conocimiento (Saber)</th> "+
			   "                                   <th colspan=\"3\">Ev. Actitud (Ser)</th> "+
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
		 
			
			elsql="SELECT ENCU_ID, UNID_NUMERO, UNID_DESCRIP, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_ID and b.AUX='EP'),'') AS RUTAEP, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_ID and b.AUX='ED'),'') AS RUTAED, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_ID and b.AUX='EC'),'') AS RUTAEC, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_ID and b.AUX='EA'),'') AS RUTAEA "+
	                      "  FROM eunidades j "+
		                  " join encuadres k on (j.UNID_ID=k.`ENCU_IDTEMA` and k.`ENCU_IDDETGRUPO`="+id+")"+
						  " where j.`UNID_MATERIA`='"+materia+"' and j.UNID_PRED='' order by UNID_NUMERO";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
						  losdatos=JSON.parse(data);  
						  if (JSON.parse(data).length<=0) {alert ("Para poder visualizar las Unidades debe primero capturar su encuadre");}
						  else { 							  
							    $("#modalDocumentUni").remove();
								if (! ( $("#modalDocumentUni").length )) {$("#grid_<?php echo $_GET['modulo']; ?>").append(script);}
								$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});								
								$('#modalDocumentUni').modal({show:true, backdrop: 'static'});
								generaTablaSubir(JSON.parse(data),"CAPTURA",materia,descrip,grupo,miciclo);
							}
		        	        		        	    
		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		   });
			   

	}

    function generaTablaSubir(grid_data, op,materia,materiad,grupo,miciclo){		
		          
			       $("#cuerpoUnidades").empty();
				   $("#tabUnidades").append("<tbody id=\"cuerpoUnidades\">");
			       c=1;	
				   globalUni=1; 
				  
		           jQuery.each(grid_data, function(clave, valor) { 	
			             
		                 var f = new Date();
					     fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();
		                 $("#cuerpoUnidades").append("<tr id=\"rowUni"+c+"\">");
						 $("#rowUni"+c).append("<td>"+valor.ENCU_ID+"</td>");
						 $("#rowUni"+c).append("<td>"+valor.UNID_NUMERO+"-"+valor.UNID_DESCRIP+"</td>");	



						 //==========================EVIDENCIA DE PRODUCTO ==========================						 
						 $("#rowUni"+c).append("<td width=\"20%\">"+
				 	    		                "<input class=\"fileSigea\" type=\"file\" id=\"file1_"+c+"_"+valor.ENCU_ID+"\" name=\"file1_"+c+"_"+valor.ENCU_ID+"\""+
				 	    	                    "onchange=\"subirPDFDriveSave('file1_"+c+"_"+valor.ENCU_ID+"','EVIDENCIAS_"+$("#elciclo").html()+"','pdf1_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"1_"+c+"','pdf','S','ID','"+valor.ENCU_ID+"','"+valor.UNID_DESCRIP+" - EV. PROD.','eadjuntos','alta','EP');\">"+
                                                "<input  type=\"hidden\" value=\""+valor.RUTAEP+"\"  name=\""+valor.ENCU_ID+"1_"+c+"\" id=\""+valor.ENCU_ID+"1_"+c+"\"  placeholder=\"\" />"+    	    	      
				 	    	                "</td>");	
	    	                
						 stElim="display:none; cursor:pointer;";
				    	 if (valor.RUTAEP.length>0) {stElim="cursor:pointer; display:block; ";}
				    	 eliminarEP="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.ENCU_ID+"1_"+c+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
								                        "onclick=\"eliminarEnlaceDrive('NO APLICA','EVIDENCIAS_"+$("#elciclo").html()+"',"+
								                        "'pdf1_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"1_"+c+"','pdf','S','ID','"+
								                        valor.ENCU_ID+"','"+valor.UNID_DESCRIP+"- EV. PROD.',"+
								                        "'eadjuntos','alta','EP');\"></i> "; 
								                        
						  $("#rowUni"+c).append("<td> <div class=\"btn-group\"> <a title=\"Ver Archivo de Evidencia de Producto\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"1_"+c+"\" href=\""+valor.RUTAEP+"\">"+
				     	  		                " <img width=\"40px\" height=\"40px\" id=\"pdf1_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf1_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
				     	 		                " </a>"+eliminarEP+"</div>"+
				  	    	                  "</td>");

						 //==========================EVIDENCIA DE DESEMPE�O ==========================	
						  $("#rowUni"+c).append("<td width=\"20%\">"+
	 	    		                "<input class=\"fileSigea\" type=\"file\" id=\"file2_"+c+"_"+valor.ENCU_ID+"\" name=\"file2_"+c+"_"+valor.ENCU_ID+"\""+
	 	    	                    "onchange=\"subirPDFDriveSave('file2_"+c+"_"+valor.ENCU_ID+"','EVIDENCIAS_"+$("#elciclo").html()+"','pdf2_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"2_"+c+"','pdf','S','ID','"+valor.ENCU_ID+"','"+valor.UNID_DESCRIP+" - EV. DESEMP.','eadjuntos','alta','ED');\">"+
                                  "<input  type=\"hidden\" value=\""+valor.RUTAED+"\"  name=\""+valor.ENCU_ID+"2_"+c+"\" id=\""+valor.ENCU_ID+"2_"+c+"\"  placeholder=\"\" />"+    	    	      
	 	    	                "</td>");	

						  stElim="display:none; cursor:pointer;";
					      if (valor.RUTAED.length>0) {stElim="cursor:pointer; display:block; ";}
					      eliminarED="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.ENCU_ID+"2_"+c+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
									                        "onclick=\"eliminarEnlaceDrive('NO APLICA','EVIDENCIAS_"+$("#elciclo").html()+"',"+
									                        "'pdf2_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"2_"+c+"','pdf','S','ID','"+
									                        valor.ENCU_ID+"','"+valor.UNID_DESCRIP+"- EV. DES.',"+
									                        "'eadjuntos','alta','ED');\"></i> "; 
									                        
			               $("#rowUni"+c).append("<td><div class=\"btn-group\"><a title=\"Ver Archivo de Evidencia de Desempe&ntilde;o\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"2_"+c+"\" href=\""+valor.RUTAED+"\">"+
	     	  		                " <img width=\"40px\" height=\"40px\" id=\"pdf2_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf2_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	     	  		                " </a>"+eliminarED+"</div>"+
	  	    	                  "</td>");

	    	                  
			             //==========================EVIDENCIA DE CONOCIMIENTO ==========================	
			               $("#rowUni"+c).append("<td width=\"20%\">"+
	 	    		                "<input class=\"fileSigea\" type=\"file\" id=\"file3_"+c+"_"+valor.ENCU_ID+"\" name=\"file3_"+c+"_"+valor.ENCU_ID+"\""+
	 	    	                    "onchange=\"subirPDFDriveSave('file3_"+c+"_"+valor.ENCU_ID+"','EVIDENCIAS_"+$("#elciclo").html()+"','pdf3_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"3_"+c+"','pdf','S','ID','"+valor.ENCU_ID+"','"+valor.UNID_DESCRIP+"  - EV. CONOC.','eadjuntos','alta','EC');\">"+
                                 "<input  type=\"hidden\" value=\""+valor.RUTAEC+"\"  name=\""+valor.ENCU_ID+"3_"+c+"\" id=\""+valor.ENCU_ID+"3_"+c+"\"  placeholder=\"\" />"+    	    	      
	 	    	                "</td>");	

			               stElim="display:none; cursor:pointer;";
						   if (valor.RUTAEC.length>0) {stElim="cursor:pointer; display:block; ";}
						   eliminarEC="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.ENCU_ID+"3_"+c+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
										                        "onclick=\"eliminarEnlaceDrive('NO APLICA','EVIDENCIAS_"+$("#elciclo").html()+"',"+
										                        "'pdf3_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"3_"+c+"','pdf','S','ID','"+
										                        valor.ENCU_ID+"','"+valor.UNID_DESCRIP+"- EV. CON.',"+
										                        "'eadjuntos','alta','EC');\"></i> "; 


			               $("#rowUni"+c).append("<td> <div class=\"btn-group\"><a title=\"Ver Archivo de Evidencia de Conocimiento\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"3_"+c+"\" href=\""+valor.RUTAEC+"\">"+
	     	  		                " <img width=\"40px\" height=\"40px\" id=\"pdf3_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf3_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	     	  		             " </a>"+eliminarEC+"</div>"+
	  	    	                  "</td>");

			             //==========================EVIDENCIA DE ACTITUD ==========================	
			               $("#rowUni"+c).append("<td>"+
					                             "<div class=\"btn-group\">"+
									                  "<button title=\"Imprimir listas de cotejo para evaluaci&oacute;n de portafolio\" data-toggle=\"dropdown\" class=\"btn btn-sm btn-danger dropdown-toggle\">"+
									                      "<span class=\"ace-icon fa fa-caret-down icon-on-right\"></span>"+
								                      "</button>"+
								                      "<ul class=\"dropdown-menu dropdown-default\">"+
									                       "<li><a onclick=\"impCotejo('"+miciclo+"','"+materia+"','"+materiad+"','"+grupo+"','"+valor.UNID_NUMERO+"','"+valor.UNID_DESCRIP+"');\" href=\"#\">Lis. Cot. 1</a></li>"+
									                       "<li><a onclick=\"impCotejo_indus('"+miciclo+"','"+materia+"','"+materiad+"','"+grupo+"','"+valor.UNID_NUMERO+"','"+valor.UNID_DESCRIP+"');\" href=\"#\">Lis. Cot. 2</a></li>"+
									                  "</ul>"+
											     "</div>"+
					                            "</td>");
				           

			               $("#rowUni"+c).append("<td width=\"20%\">"+
	 	    		                "<input class=\"fileSigea\" type=\"file\" id=\"file4_"+c+"_"+valor.ENCU_ID+"\" name=\"file4_"+c+"_"+valor.ENCU_ID+"\""+
	 	    	                    "onchange=\"subirPDFDriveSave('file4_"+c+"_"+valor.ENCU_ID+"','EVIDENCIAS_"+$("#elciclo").html()+"','pdf4_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"4_"+c+"','pdf','S','ID','"+valor.ENCU_ID+"','"+valor.UNID_DESCRIP+"  - EV. ACT.','eadjuntos','alta','EA');\">"+
                                 "<input  type=\"hidden\" value=\""+valor.RUTAEA+"\"  name=\""+valor.ENCU_ID+"4_"+c+"\" id=\""+valor.ENCU_ID+"4_"+c+"\"  placeholder=\"\" />"+    	    	      
	 	    	                "</td>");	

			               stElim="display:none; cursor:pointer;";
						   if (valor.RUTAEA.length>0) {stElim="cursor:pointer; display:block; ";}
						   eliminarEA="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.ENCU_ID+"4_"+c+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
										                        "onclick=\"eliminarEnlaceDrive('NO APLICA','EVIDENCIAS_"+$("#elciclo").html()+"',"+
										                        "'pdf4_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"4_"+c+"','pdf','S','ID','"+
										                        valor.ENCU_ID+"','"+valor.UNID_DESCRIP+"- EV. ACT.',"+
										                        "'eadjuntos','alta','EA');\"></i> "; 
										                        
			               $("#rowUni"+c).append("<td><div class=\"btn-group\"> <a title=\"Ver Archivo de Evidencia de Actitud\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"4_"+c+"\" href=\""+valor.RUTAEA+"\">"+
	     	  		                " <img width=\"40px\" height=\"40px\" id=\"pdf4_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf4_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	     	  		              " </a>"+eliminarEA+"</div>"+
	  	    	                  "</td>");



            
						 if (valor.RUTAEP=='') { 
				                $('#enlace_'+valor.ENCU_ID+"1_"+c).attr('disabled', 'disabled');
				                $('#enlace_'+valor.ENCU_ID+"1_"+c).attr('href', '#');
				                $('#pdf1_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
				       	    }
						 if (valor.RUTAED=='') { 
							    $('#enlace_'+valor.ENCU_ID+"2_"+c).attr('disabled', 'disabled');
				                $('#enlace_'+valor.ENCU_ID+"2_"+c).attr('href', '#');
				                $('#pdf2_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
				       	    }
						 if (valor.RUTAEC=='') { 
							    $('#enlace_'+valor.ENCU_ID+"3_"+c).attr('disabled', 'disabled');
				                $('#enlace_'+valor.ENCU_ID+"3_"+c).attr('href', '#');
				                $('#pdf3_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
				       	    }
						 if (valor.RUTAEA=='') { 
							    $('#enlace_'+valor.ENCU_ID+"4_"+c).attr('disabled', 'disabled');
				                $('#enlace_'+valor.ENCU_ID+"4_"+c).attr('href', '#');
				                $('#pdf4_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
				       	    }
				       	 
						    c++;
					   		globalUni=c;

					   		
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

/*==========================================FECHAS DE PLANEACION ===================================*/
       
/*============================================================================================*/


	   function impCotejo(ciclo,materia, materiad, grupo, unidad,unidadd) {
		   
		    window.open("listacot.php?materia="+materia+"&materiad="+materiad+"&ciclo="+ciclo+
				    "&grupo="+grupo+"&unidad="+unidad+"&unidadd="+unidadd, '_blank');
		   }


	   function impCotejo_indus(ciclo,materia, materiad, grupo, unidad,unidadd) {
		   
		    window.open("listacotindus.php?materia="+materia+"&materiad="+materiad+"&ciclo="+ciclo+
				    "&grupo="+grupo+"&unidad="+unidad+"&unidadd="+unidadd, '_blank');
		   }	
    
		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
