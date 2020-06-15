
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


      <h3 class="header smaller lighter text-success"><strong>Asignaturas inscritas: <i class="ace-icon fa fa-angle-double-right"></i> <small id="elciclo"></small> <small id="elciclod"></small></strong></h3>
	     <div  class="table-responsive">
		     <table id=tabHorarios class= "display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
				   	<thead>  
					    <tr style="background-color: #042893; color: white;">					        
					        <th style="text-align: center;">Grupo</th> 
					        <th style="text-align: center;">Clave</th> 					        
					        <th style="text-align: center;">Asigantura</th> 
					        <th colspan="2" style="text-align: center;">Encuadre</th> 					        
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

<script src="<?php echo $nivel; ?>js/utilerias.js"></script>



<script type="text/javascript">
        var todasColumnas;
        var global,globalUni;
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
    
    	    
    	    $("#cuerpo").append("<tr id=\"row"+c+"\">");
    	    $("#row"+c).append("<td>"+valor.GRUPO+"</td>");
    	    $("#row"+c).append("<td>"+valor.MATERIA+"</td>");
    	    $("#row"+c).append("<td>"+valor.MATERIAD+"</td>");

    	    
    	    $("#row"+c).append("<td width=\"20%\">"+
 	    		   "                      <input class=\"fileSigea\" type=\"file\" id=\"file1_"+valor.MATERIA+"\" name=\"file1_"+valor.MATERIA+"\""+
 	    	       "                          onchange=\"subirPDFDriveSave('file1_"+valor.MATERIA+"','EVIDENCIAS_ALUM_"+valor.CICLO+"','pdf1_"+valor.MATERIA+"','"+valor.MATERIA+"1','pdf','S','ID','"+valor.CICLO+valor.MATRICULA+valor.MATERIA+"','"+valor.MATERIAD+" - ENCUADRE"+"','eadjuntos','alta','ENCUADRE');\">"+
 	    	       
 	    	       "                      <input  type=\"hidden\" value=\""+valor.RUTAENCUADRE+"\"  name=\""+valor.MATERIA+"1\" id=\""+valor.MATERIA+"1\"  placeholder=\"\" />"+    	    	      
 	    	    "</td>");

 
    	    stElim="display:none; cursor:pointer;";
    	    if (valor.RUTAENCUADRE.length>0) { stElim="cursor:pointer; display:block; ";}    	    	  
            eliminarEncuadre="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.MATERIA+"1\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
				                        "onclick=\"eliminarEnlaceDrive('file1_"+valor.MATERIA+"','EVIDENCIAS_ALUM_"+valor.CICLO+"',"+
				                        "'pdf1_"+valor.MATERIA+"','"+valor.MATERIA+"1','pdf','S','ID','"+
				                        valor.CICLO+valor.MATRICULA+valor.MATERIA+"','"+valor.MATERIAD+"-ENCUADRE',"+
				                        "'eadjuntos','alta','ENCUADRE');\"></i> "; 

    	    $("#row"+c).append("<td> <div class=\"btn-group\"> <a title=\"Ver Archivo de encuadre\" target=\"_blank\" id=\"enlace_"+valor.MATERIA+"1\" href=\""+valor.RUTAENCUADRE+"\">"+
     	  		   "                               <img width=\"40px\" height=\"40px\" id=\"pdf1_"+valor.MATERIA+"\" name=\"pdf1_"+valor.MATERIA+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
     	 		   "                          </a>"+eliminarEncuadre+"</div>"+
  	    	       "</td>");



    	    stElim="display:none; cursor:pointer;";
    	    if (valor.RUTADIAGNOSTICA.length>0) {stElim="cursor:pointer; display:block; ";}
    	    eliminarDiagnostica="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.MATERIA+"2\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
				                        "onclick=\"eliminarEnlaceDrive('file2_"+valor.MATERIA+"','EVIDENCIAS_ALUM_"+valor.CICLO+"',"+
				                        "'pdf2_"+valor.MATERIA+"','"+valor.MATERIA+"2','pdf','S','ID','"+
				                        valor.CICLO+valor.MATRICULA+valor.MATERIA+"','"+valor.MATERIAD+"-DIAGNOSTICA',"+
				                        "'eadjuntos','alta','DIAGNOSTICA');\"></i> "; 
            
    	    $("#row"+c).append("<td width=\"20%\">"+
  	    		   "                      <input class=\"fileSigea\" type=\"file\" id=\"file2_"+valor.MATERIA+"\" name=\"file2_"+valor.MATERIA+"\""+
  	    	       "                          onchange=\"subirPDFDriveSave('file2_"+valor.MATERIA+"','EVIDENCIAS_ALUM_"+valor.CICLO+"','pdf2_"+valor.MATERIA+"','"+valor.MATERIA+"2','pdf','S','ID','"+valor.CICLO+valor.MATRICULA+valor.MATERIA+"','"+valor.MATERIAD+" - DIAGNOSTICA"+"','eadjuntos','alta','DIAGNOSTICA');\">"+  	    	       
  	    	       "                      <input  type=\"hidden\" value=\""+valor.RUTADIAGNOSTICA+"\"  name=\""+valor.MATERIA+"2\" id=\""+valor.MATERIA+"2\"  placeholder=\"\" />"+    	    	      
  	    	    "</td>");

     	    $("#row"+c).append("<td><div class=\"btn-group\"><a title=\"Ver Archivo de encuadre\" target=\"_blank\" id=\"enlace_"+valor.MATERIA+"2\" href=\""+valor.RUTADIAGNOSTICA+"\">"+
      	  		   "                               <img width=\"40px\" height=\"40px\" id=\"pdf2_"+valor.MATERIA+"\" name=\"pdf2_"+valor.MATERIA+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
      	 		   "                          </a>"+eliminarDiagnostica+"</div>"+
   	    	    "</td>");

     	 
    	    $("#row"+c).append("<td style= \"text-align: center;\" ><a  onclick=\"subirUnidades('"+valor.MATRICULA+"','"+valor.CICLO+"','"+valor.ID+"','"+valor.MATERIA+"','"+valor.MATERIAD+"');\" title=\"Subir evidencias de las Unidades\" "+
                    "class=\"btn btn-white btn-primary btn-bold\">"+
                    "<i class=\"ace-icon fa fa-tasks bigger-160 yellow \"></i>"+
                    "</a></td>");


    	    if (valor.RUTAENCUADRE=='') { 
				$('#enlace_'+valor.MATERIA+"1").attr('disabled', 'disabled');				
                $('#enlace_'+valor.MATERIA+"1").attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
                $('#pdf1_'+valor.MATERIA).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
       	    }
    	    if (valor.RUTADIAGNOSTICA=='') { 
                $('#enlace_'+valor.MATERIA+"2").attr('disabled', 'disabled');
                $('#enlace_'+valor.MATERIA+"2").attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
                $('#pdf2_'+valor.MATERIA).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
       	    }
     
    	    c++;
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

	

	   elsql="select e.ALUCTR as MATRICULA,e.PDOCVE AS CICLO, e.MATCVE AS MATERIA, f.MATE_DESCRIP AS MATERIAD, "+
                 " e.GPOCVE AS GRUPO,"+
                 " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(PDOCVE,ALUCTR,MATCVE) and b.AUX='ENCUADRE' ORDER BY IDDET DESC LIMIT 1),'') AS RUTAENCUADRE, "+
                 " IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(PDOCVE,ALUCTR,MATCVE) and b.AUX='DIAGNOSTICA' ORDER BY IDDET DESC LIMIT 1),'') AS RUTADIAGNOSTICA "+     
        		  " from dlista e, cmaterias f where e.MATCVE=f.MATE_CLAVE and ifnull(MATE_TIPO,'0') NOT IN ('T','AC')"+
				  " AND e.ALUCTR='<?php echo $_SESSION['usuario']?>' and e.IDGRUPO IN (select DGRU_ID FROM edgrupos where DGRU_CERRADOCAL='N') order by PDOCVE DESC";
				  
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


function impEncuadre(id, materia, descrip){
	window.open("encuadres.php?ID="+id+"&materiad="+materia, '_blank');
}



    function generaTablaActividad(grid_data, op){		
	       $("#cuerpoActividad").empty();
		   $("#tabActividad").append("<tbody id=\"cuerpoActividad\">");
	       c=1;	
		   global=1; 
           jQuery.each(grid_data, function(clave, valor) { 	
                 var f = new Date();
			     fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();
                 $("#cuerpoActividad").append("<tr id=\"row"+c+"\">");
				 $("#row"+c).append("<td>"+c+"</td>");
				 $("#row"+c).append("<td>"+valor.UNID_ID+"</td>");
				 $("#row"+c).append("<td>"+valor.UNID_NUMERO+"</td>");
				 $("#row"+c).append("<td>"+valor.UNID_DESCRIP+"</td>");	
				 /*
				 $("#row"+c).append("<td><div style=\"width:150px;\" class=\"input-group\"><input id=\"a_"+c+"_1\" value=\""+valor.ENCU_FECHAEVAL+"\" class=\"form-control date-picker\" id=\"fechaeval\" "+
					       "                  type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
					       "                  <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
						   "             </div></td>");	
						   */
				 $("#row"+c).append("<td><input  style=\"width:150px;\" id=\"a_"+c+"_2\" value=\""+valor.EP+"\" class=\"form-control\" id=\"ep\"></input></td>");	
				 $("#row"+c).append("<td><input  style=\"width:150px;\" id=\"a_"+c+"_3\" value=\""+valor.ED+"\" class=\"form-control\" id=\"ep\"></input></td>");
				 $("#row"+c).append("<td><input  style=\"width:150px;\" id=\"a_"+c+"_4\" value=\""+valor.EC+"\" class=\"form-control\" id=\"ep\"></input></td>");	
				 $("#row"+c).append("<td><input  readonly style=\"width:150px;\" id=\"a_"+c+"_5\" value=\""+"PORTFOLIO DE EVIDENCIA"+"\" class=\"form-control\" id=\"ep\"></input></td>");	       		   
				 	c++;
			   		global=c;
			   	});
              $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});  
			   }

      function cierraModal(){
		var r = confirm("Seguro que desea cerrar la ventana no ha guardado los cambios");
    	if (r == true) {
    		 $('#modalDocumentEnc').modal("hide");  
            }
	    }



      function guardarActividades(){

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




      function subirUnidades(matricula, ciclo, id, materia, descrip){
			script="<div class=\"modal fade\" id=\"modalDocumentUni\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header widget-header  widget-color-green\">"+
			   "             <span class=\"label label-lg label-primary arrowed arrowed-right\"> Asignatura </span>"+
			   "             <span class=\"label label-lg label-success arrowed arrowed-right\">"+descrip+"</span>"+			   			   
			   "             <input type=\"hidden\" id=\"elid\" value=\""+id+"\"></input>"+
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
			   "                                   <th colspan=\"2\">Ev. Actitud (Ser)</th> "+
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
		 
			
			
	 		 
			 $("#modalDocumentUni").remove();
		    if (! ( $("#modalDocumentUni").length )) {
		        $("#grid_<?php echo $_GET['modulo']; ?>").append(script);
		    }

		    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		    
		    $('#modalDocumentUni').modal({show:true, backdrop: 'static'});

		  
			elsql="SELECT UNID_ID, UNID_NUMERO, UNID_DESCRIP, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(UNID_ID,'"+ciclo+matricula+materia+"') and b.AUX='EP' ORDER BY IDDET DESC LIMIT 1),'') AS RUTAEP, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(UNID_ID,'"+ciclo+matricula+materia+"') and b.AUX='ED' ORDER BY IDDET DESC LIMIT 1),'') AS RUTAED, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(UNID_ID,'"+ciclo+matricula+materia+"') and b.AUX='EC' ORDER BY IDDET DESC LIMIT 1),'') AS RUTAEC, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(UNID_ID,'"+ciclo+matricula+materia+"') and b.AUX='EA' ORDER BY IDDET DESC LIMIT 1),'') AS RUTAEA "+
						  "  FROM eunidades j where j.`UNID_MATERIA`='"+materia+"' and j.UNID_PRED='' order by UNID_NUMERO";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}	  
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
		        	      losdatos=JSON.parse(data);  
		        	      generaTablaSubir(JSON.parse(data),"CAPTURA", ciclo, matricula, materia);		        	        		        	    
		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		   });
			   

	}

    function generaTablaSubir(grid_data, op, ciclo, matricula, materia){		
			       $("#cuerpoUnidades").empty();
				   $("#tabUnidades").append("<tbody id=\"cuerpoUnidades\">");
			       c=1;	
				   globalUni=1; 
		           jQuery.each(grid_data, function(clave, valor) { 	
			             
		                 var f = new Date();
					     fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();
		                 $("#cuerpoUnidades").append("<tr id=\"rowUni"+c+"\">");
						 $("#rowUni"+c).append("<td>"+c+"</td>");
						 $("#rowUni"+c).append("<td>"+valor.UNID_DESCRIP+"</td>");	


						//===================EVIDENCIAS DE PRODUCTO ==========================================
						 $("#rowUni"+c).append("<td width=\"20%\">"+
				 	    		                "<input class=\"fileSigea\" type=\"file\" id=\"file1_"+c+"_"+valor.ENCU_ID+"\" name=\"file1_"+c+"_"+valor.ENCU_ID+"\""+
				 	    	                    "onchange=\"subirPDFDriveSave('file1_"+c+"_"+valor.ENCU_ID+"','EVIDENCIAS_ALUM_"+$("#elciclo").html()+"','pdf1_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"1_"+c+"','pdf','S','ID','"+valor.UNID_ID+ciclo+matricula+materia+"','"+valor.UNID_DESCRIP+" - EV. PROD.','eadjuntos','alta','EP');\">"+
                                                "<input  type=\"hidden\" value=\""+valor.RUTAEP+"\"  name=\""+valor.ENCU_ID+"1_"+c+"\" id=\""+valor.ENCU_ID+"1_"+c+"\"  placeholder=\"\" />"+    	    	      
				 	    	                "</td>");	


							 
						 stElim="display:none; cursor:pointer;";
				    	 if (valor.RUTAEP.length>0) {stElim="cursor:pointer; display:block; ";}
				    	 eliminarEP="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.ENCU_ID+"1_"+c+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
								                        "onclick=\"eliminarEnlaceDrive('file1_"+valor.ENCU_ID+"','EVIDENCIAS_ALUM_"+$("#elciclo").html()+"',"+
								                        "'pdf1_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"1_"+c+"','pdf','S','ID','"+
								                        valor.UNID_ID+ciclo+matricula+materia+"','"+valor.UNID_DESCRIP+"- EV. PROD.',"+
								                        "'eadjuntos','alta','EP');\"></i> "; 
								                        
						  $("#rowUni"+c).append("<td><div class=\"btn-group\"><a title=\"Ver Archivo de Evidencia de Producto\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"1_"+c+"\" href=\""+valor.RUTAEP+"\">"+
				     	  		                " <img width=\"40px\" height=\"40px\" id=\"pdf1_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf1_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
				     	 		                "</div> </a>"+eliminarEP+
				  	    	                  "</td>");


						  
						//===================EVIDENCIAS DE DESEMPE�O ==========================================			                        
						  $("#rowUni"+c).append("<td width=\"20%\">"+
	 	    		                "<input class=\"fileSigea\" type=\"file\" id=\"file2_"+c+"_"+valor.ENCU_ID+"\" name=\"file2_"+c+"_"+valor.ENCU_ID+"\""+
	 	    	                    "onchange=\"subirPDFDriveSave('file2_"+c+"_"+valor.ENCU_ID+"','EVIDENCIAS_ALUM_"+$("#elciclo").html()+"','pdf2_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"2_"+c+"','pdf','S','ID','"+valor.UNID_ID+ciclo+matricula+materia+"','"+valor.UNID_DESCRIP+" - EV. DES.','eadjuntos','alta','ED');\">"+
                                  "<input  type=\"hidden\" value=\""+valor.RUTAED+"\"  name=\""+valor.ENCU_ID+"2_"+c+"\" id=\""+valor.ENCU_ID+"2_"+c+"\"  placeholder=\"\" />"+    	    	      
	 	    	                "</td>");	

						  stElim="display:none; cursor:pointer;";
					      if (valor.RUTAED.length>0) {stElim="cursor:pointer; display:block; ";}
					      eliminarED="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.ENCU_ID+"2_"+c+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
									                        "onclick=\"eliminarEnlaceDrive('file2_"+valor.ENCU_ID+"','EVIDENCIAS_ALUM_"+$("#elciclo").html()+"',"+
									                        "'pdf2_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"2_"+c+"','pdf','S','ID','"+
									                        valor.UNID_ID+ciclo+matricula+materia+"','"+valor.UNID_DESCRIP+"- EV. DES.',"+
									                        "'eadjuntos','alta','ED');\"></i> "; 
									                        
			               $("#rowUni"+c).append("<td> <div class=\"btn-group\"> <a title=\"Ver Archivo de Evidencia de Producto\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"2_"+c+"\" href=\""+valor.RUTAED+"\">"+
	     	  		                " <img width=\"40px\" height=\"40px\" id=\"pdf2_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf2_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	     	 		                "</div> </a>"+eliminarED+
	  	    	                  "</div></td>");


			             //===================EVIDENCIAS DE CONOCIMIENTO==========================================
			             
			               $("#rowUni"+c).append("<td width=\"20%\">"+
	 	    		                "<input class=\"fileSigea\" type=\"file\" id=\"file3_"+c+"_"+valor.ENCU_ID+"\" name=\"file3_"+c+"_"+valor.ENCU_ID+"\""+
	 	    	                    "onchange=\"subirPDFDriveSave('file3_"+c+"_"+valor.ENCU_ID+"','EVIDENCIAS_ALUM_"+$("#elciclo").html()+"','pdf3_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"3_"+c+"','pdf','S','ID','"+valor.UNID_ID+ciclo+matricula+materia+"','"+valor.UNID_DESCRIP+" - EV. CONOC.','eadjuntos','alta','EC');\">"+
                                 "<input  type=\"hidden\" value=\""+valor.RUTAEC+"\"  name=\""+valor.ENCU_ID+"3_"+c+"\" id=\""+valor.ENCU_ID+"3_"+c+"\"  placeholder=\"\" />"+    	    	      
	 	    	                "</td>");
	    	                
			               stElim="display:none; cursor:pointer;";
						   if (valor.RUTAEC.length>0) {stElim="cursor:pointer; display:block; ";}
						   eliminarEC="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.ENCU_ID+"3_"+c+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
										                        "onclick=\"eliminarEnlaceDrive('file3_"+valor.ENCU_ID+"','EVIDENCIAS_ALUM_"+$("#elciclo").html()+"',"+
										                        "'pdf3_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"3_"+c+"','pdf','S','ID','"+
										                        valor.UNID_ID+ciclo+matricula+materia+"','"+valor.UNID_DESCRIP+"- EV. CON.',"+
										                        "'eadjuntos','alta','EC');\"></i> "; 
										                        	
			               $("#rowUni"+c).append("<td> <div class=\"btn-group\"> <a title=\"Ver Archivo de Evidencia de Producto\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"3_"+c+"\" href=\""+valor.RUTAEC+"\">"+
	     	  		                " <img width=\"40px\" height=\"40px\" id=\"pdf3_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf3_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	     	  		             "</div> </a>"+eliminarEC+
	  	    	                  "</td>");


			             //===================EVIDENCIAS DE ACTITUD==========================================
			             
			               $("#rowUni"+c).append("<td width=\"20%\">"+
	 	    		                "<input class=\"fileSigea\" type=\"file\" id=\"file4_"+c+"_"+valor.ENCU_ID+"\" name=\"file4_"+c+"_"+valor.ENCU_ID+"\""+
	 	    	                    "onchange=\"subirPDFDriveSave('file4_"+c+"_"+valor.ENCU_ID+"','EVIDENCIAS_ALUM_"+$("#elciclo").html()+"','pdf4_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"4_"+c+"','pdf','S','ID','"+valor.UNID_ID+ciclo+matricula+materia+"','"+valor.UNID_DESCRIP+" - EV. ACT.','eadjuntos','alta','EA');\">"+
                                 "<input  type=\"hidden\" value=\""+valor.RUTAEA+"\"  name=\""+valor.ENCU_ID+"4_"+c+"\" id=\""+valor.ENCU_ID+"4_"+c+"\"  placeholder=\"\" />"+    	    	      
	 	    	                "</td>");	

			               stElim="display:none; cursor:pointer;";
						   if (valor.RUTAEA.length>0) {stElim="cursor:pointer; display:block; ";}
						   eliminarEA="<i style=\""+stElim+"\"  id=\"btnEli_"+valor.ENCU_ID+"4_"+c+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
										                        "onclick=\"eliminarEnlaceDrive('file4_"+valor.ENCU_ID+"','EVIDENCIAS_ALUM_"+$("#elciclo").html()+"',"+
										                        "'pdf4_"+c+"_"+valor.ENCU_ID+"','"+valor.ENCU_ID+"4_"+c+"','pdf','S','ID','"+
										                        valor.UNID_ID+ciclo+matricula+materia+"','"+valor.UNID_DESCRIP+"- EV. ACT.',"+
										                        "'eadjuntos','alta','EA');\"></i> "; 
										                        
			               $("#rowUni"+c).append("<td><div class=\"btn-group\"> <a title=\"Ver Archivo de Evidencia de Producto\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"4_"+c+"\" href=\""+valor.RUTAEA+"\">"+
	     	  		                " <img width=\"40px\" height=\"40px\" id=\"pdf4_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf4_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	     	  		                " </div> </a>"+eliminarEA+
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
		    	
    
		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
