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
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery.gritter.min.css" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/chosen.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />

        

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white; width:98%;">
       
	     <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>

		<div class="row">
		    <div class="col-sm-6">
				<h3 class="header smaller lighter text-warning"><strong>Motivos de Reprobación <i class="ace-icon fa fa-angle-double-right"></i> 
							<small id="elciclo"></small> <small id="lostiposhide" class="hide"></small></strong></h3>				
			</div>
			<div class="col-sm-3">
				<small id="loscortes"></small>
			</div>
		</div>

		<div  class="table-responsive">
			<table id=tabHorarios class= "display  table-condensed table-striped table-sm table-bordered table-hover nowrap "></table>	
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


<script type="text/javascript">

var id_unico="";
var estaseriando=false;
var matser="";
var maxuni=0;
var elciclo="";

var usuario="<?php echo $_SESSION["usuario"];?>";
var lains="<?php echo $_SESSION["INSTITUCION"];?>";
var elcam="<?php echo $_SESSION["CAMPUS"];?>";

    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		$("#info").css("display","none");
		
		 //Buscamos los cortes que esta abierto para la asignatura de acuerdo al ciclo 
		 sqlCor="select * from ecortescal where  CICLO=getciclo()"+
		        " and ABIERTO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') "+
				" Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
		        " AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='CALIFICACION' "+
		        " order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 1";
			

			parametros={sql:sqlCor,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				 type: "POST",
				 data:parametros,
		         url:  "../base/getdatossqlSeg.php",
		         success: function(dataCor){   					 	        				         
		        	 jQuery.each(JSON.parse(dataCor), function(clave, valorCor) { 							
						elciclo=valorCor.CICLO;	
					 });
					}
				});


		
		
		$("#loscortes").append("<span class=\"label label-danger\">Corte de Calificación</span>");
		addSELECT("selCortes","loscortes","PROPIO", "SELECT ID, concat(DESCRIPCION,'|',TIPO)FROM ecortescal  WHERE CICLO=getciclo() and CLASIFICACION='CALIFICACION' ORDER BY ID ", "","");  					


		//creamos select de tipos de motivos 
		addSELECT("selTipos","lostiposhide","PROPIO","SELECT ID,DESCRIP FROM tut_catmotrep order by ORDEN", "","");  

        
       
	      
    });



	function change_SELECT(elemento) {
		if (elemento=="selCortes") {
			if ($("#selCortes").val()>0) {
			   cargarMaterias('<?php echo $_SESSION["usuario"];?>');
			}
			else {$("#tabHorarios").empty();}
		}
    }



        function generaTabla(grid_data){
			c=0;
			$("#tabHorarios").empty();
			$("#cuerpo").empty();
			
            caduni="";
			
            $("#tabHorarios").append(
			"<thead class=\"fontRobotoB\" style=\"background:#0C1E61; color:white;\">"+
			"	<tr id=\"titulo\"><th style=\"text-align: center;\" >Clave</th>"+ 
			"		<th style=\"text-align: center;\">Materia</th>"+			
			"		<th style=\"text-align: center;\">Profesor</th>"+
            "		<th title=\"Semestre de la asignatura\" style=\"text-align: center;\">SEM</th>"+
            "		<th title=\"N&uacute;mero de Unidades de la asignatura\" style=\"text-align: center;\">NU</th>"+
			"		<th title=\"Calificaci&oacute;n final de la asignatura\" style=\"text-align: center;\">CF</th>"+
			"		<th title=\"Motivo por el cuál reprobó las unidades del corte\" style=\"text-align: left;\">MOTIVO</th>"+
			"		<th title=\"Información adicional para determinar la causa\" style=\"text-align: left;\">OBSERVACIONES</th>"+
			"	</tr>"+
			"</thead>"); 

     	    $("#tabHorarios").append("<tbody id=\"cuerpo\" class=\"fontRoboto\">");
     	   
            jQuery.each(grid_data, function(clave, valor) { 	
             	    
         	    $("#cuerpo").append("<tr id=\"row"+valor.MATERIA+"\">");    	   
         	    $("#row"+valor.MATERIA).append("<td>"+valor.MATERIA+"</td>");         	    
         	    $("#row"+valor.MATERIA).append("<td>"+utf8Decode(valor.MATERIAD)+"</td>");
         	    $("#row"+valor.MATERIA).append("<td>"+utf8Decode(valor.PROFESORD)+"</td>");
         	    $("#row"+valor.MATERIA).append("<td>"+valor.SEM+"</td>");
         	    $("#row"+valor.MATERIA).append("<td>"+valor.NUMUNI+"</td>");
				$("#row"+valor.MATERIA).append("<td>"+valor.GRUPO+"</td>");
				$("#row"+valor.MATERIA).append("<td><select class=\"form-control text-success\" id=\"mot"+valor.MATERIA+"\" onchange=\"guardar('"+valor.ID+"','"+valor.MATERIA+"','"+valor.GRUPO+"');\"></select></td>");
				$("#row"+valor.MATERIA).append("<td><input class=\"form-control text-success\" id=\"obs"+valor.MATERIA+"\" value=\""+valor.OBS+"\" onchange=\"guardar('"+valor.ID+"','"+valor.MATERIA+"','"+valor.GRUPO+"');\"></input></td>");
				 $("#row"+valor.MATERIA).append("</tr>");
				 
				 $("#mot"+valor.MATERIA).html($("#selTipos").html());
				 $("#mot"+valor.MATERIA).val(valor.TIPO); 
             });
			$('#dlgproceso').modal("hide"); 
			
     }		
         

    function cargarMaterias() {
		$('#dlgproceso').modal({show:true, backdrop: 'static'});
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
                  $('#dlgproceso').modal("hide");  
         	          	     
                  },
            error: function(data) {	                  
                       alert('ERROR: '+data);
                       $('#dlgproceso').modal("hide");  
                   }
           });


		 $('#dlgproceso').modal({show:true, backdrop: 'static'});
		 
		 elsql="SELECT MAX((select count(*) from eunidades l where "+
                  "l.UNID_MATERIA=e.MATCVE and UNID_PRED='')) AS N from dlista e  where  "+
				  "e.ALUCTR='<?php echo $_SESSION['usuario']?>'  and e.IDGRUPO IN "+
				  "(select DGRU_ID FROM edgrupos where DGRU_CERRADOCAL='N')";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
  	     $.ajax({
		  type: "POST",
		  data:parametros,
          url:  "../base/getdatossqlSeg.php",
          success: function(data){      	    
        	      jQuery.each(JSON.parse(data), function(clave, valor) { 	
                        maxuni=valor.N;
            	      });

				
			      sqlMat="select e.ID, e.ALUCTR as MATRICULA,e.PDOCVE AS CICLO, e.MATCVE AS MATERIA, f.MATE_DESCRIP AS MATERIAD, "+
                	             "ifnull(LISCAL,0) as LISCAL,ifnull(LISPA1,0)  as LISPA1,ifnull(LISPA2,0) AS LISPA2,ifnull(LISPA3,0) as LISPA3,"+
								 "ifnull(LISPA4,0) as LISPA4,ifnull(LISPA5,0) as LISPA5,ifnull(LISPA6,0) as LISPA6,ifnull(LISPA7,0) as LISPA7,"+
								 "ifnull(LISPA8,0) as LISPA8,ifnull(LISPA9,0) as LISPA9,ifnull(LISPA10,0) as LISPA10, ifnull(LISPA11,0) as LISPA11,"+
								 "ifnull(LISPA12,0) AS LISPA12,ifnull(LISPA13,0) AS LISPA13,ifnull(LISPA14,0) AS LISPA14,ifnull(LISPA15,0) AS LISPA15,"+
        	                      " e.GPOCVE AS GRUPO, e.LISTC15 as PROFESOR, concat(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS PROFESORD,"+
        	                      " (select count(*) from eunidades l where l.UNID_MATERIA=e.MATCVE and UNID_PRED='') AS NUMUNI,"+
								  " ifnull(getcuatrimatxalum(e.MATCVE,ALUCTR),0) AS SEM, "+
								  " IFNULL((SELECT TIPO FROM tut_motrepalum WHERE IDDETALLE=e.ID AND IDCORTE="+$("#selCortes").val()+"),'') as TIPO,"+
								  " IFNULL((SELECT OBS FROM tut_motrepalum WHERE IDDETALLE=e.ID AND IDCORTE="+$("#selCortes").val()+"),'') as OBS"+
        	                      " from dlista e, cmaterias f, pempleados g  where  e.LISTC15=g.EMPL_NUMERO and e.MATCVE=f.MATE_CLAVE"+        	                      
								  " AND e.ALUCTR='<?php echo $_SESSION['usuario']?>' and e.BAJA='N' and e.IDGRUPO IN (select DGRU_ID FROM edgrupos where DGRU_CERRADOCAL='N') order by PDOCVE DESC"			  		  
				parametros={sql:sqlMat,dato:sessionStorage.co,bd:"Mysql"}
        	      $.ajax({
						 type: "POST",
						 data:parametros,
        	             url:  "../base/getdatossqlSeg.php",
        	             success: function(data){   
            	                 	    
        	          	        generaTabla(JSON.parse(data,maxuni));	   
        	          	        $('#dlgproceso').modal("hide");      	     
        	                   },
        	             error: function(data) {	                  
        	                        alert('ERROR: '+data);
        	                        $('#dlgproceso').modal("hide");  
        	                    }
        	            });
            	     
                },
          error: function(data) {	                  
                     alert('ERROR: '+data);
                     $('#dlgproceso').modal("hide");  
                 }
         });
       

    	 
    	
    }


	function guardar(iddet,materia,grupo,){
		campo='';
	
		elciclo=$("#elciclo").html();
	
		idcorte=$("#selCortes").val();
		tipocorte=$("#selCortes option:selected").text().split("|")[1];

		eltipo=$("#mot"+materia).val();
		laobs=$("#obs"+materia).val();
		lafecha=dameFecha("FECHAHORA");
		var losdatos=[];
		losdatos[0]=iddet+"|"+idcorte+"|"+tipocorte+"|"+eltipo+"|"+laobs+"|"+materia+"|"+grupo+"|"+usuario+"|"+elciclo+"|"+lains+"|"+elcam+"|"+usuario+"|"+lafecha;
   		var loscampos = ["IDDETALLE","IDCORTE","CORTE","TIPO","OBS","MATERIA","GRUPO","MATRICULA","CICLO","_INSTITUCION","_CAMPUS","USUARIO","FECHAUS"];

		   parametros={
			tabla:"tut_motrepalum",
			 campollave:"concat(IDDETALLE,'_',IDCORTE)",
			 bd:"Mysql",
			 valorllave:iddet+"_"+idcorte,
			 eliminar: "S",
			 separador:"|",
			 campos: JSON.stringify(loscampos),
			 datos: JSON.stringify(losdatos)
		   };

		  $.ajax({
			 type: "POST",
			 url:"../base/grabadetalle.php",
			 data: parametros,
			 success: function(data){
						          
			 }					     
		 });    	                 	 
}




 
</script>



</body>
<?php } else {header("Location: index.php");}?>
</html>


