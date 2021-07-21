
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
		 <div class="row hide" id="encabezado">	 
		 	<select  class="form-control"  id="selTipoCierre"></select>  
			<select  class="form-control"  id="selTipoRetraso"></select>  
			             		           
         </div>
    
    </div>
    
    
		      
	<div  class="sigeaPrin table-responsive" style="overflow-y: auto; height: 400px; width:100%;" >
		  <table id="tabFechas" class= "fontRobotoB display table-condensed table-striped table-sm table-bordered table-hover nowrap" style="width:98%;">		  
		 	<thead>  
				<tr>	
					<th style="text-align: center;">Tema</th> 
					<th style="text-align: center;">Inicia Prog.</th> 
					<th style="text-align: center;">Termina Prog.</th> 
					<th style="text-align: center;">Inicia Real</th> 
					<th style="text-align: center;">Termina Real</th> 
					<th style="text-align: center;">Terminada</th> 
					<th style="text-align: center;">Motivo de Retraso</th> 	
					<th style="text-align: center;" class="hidden-480">Obs</th> 	                         																	
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
        var cargandoSubtemas=false;

        
		$(document).ready(function($) { var Body = $('body'); $(document).bind("contextmenu",function(e){return false;});  Body.addClass('preloader-site'); });
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});


		jQuery(function($) { 
			actualizaSelect("selTipoCierre", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='AVPROGTIPTER' ORDER BY CATA_DESCRIP", "","");
			actualizaSelect("selTipoRetraso", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='AVPROGTIPRET' ORDER BY CATA_CLAVE", "","");
			cargarFechas('<?php echo $_GET["materia"];?>','<?php echo $_GET["grupo"];?>','<?php echo $_GET["ciclo"];?>');
		
		});


function dameIcono(tipo) {
	ico="<i class=\"fa fa-refresh\" style=\"color:gray;\"></i> ";
	if (tipo=='T') {ico="<i class=\"fa fa-check green\"></i> ";}     
	if (tipo=='R') {ico="<i class=\"fa fa-check purple\"></i> ";}  
	if (tipo=='C') {ico="<i class=\"fa fa-times red \"></i> "; }    
	if (tipo=='P') {ico="<i class=\"fa fa-rotate-right pink \"></i> "; } 
	return ico;
}


function cargarFechas(materia,grupo,ciclo) {
	cargandoSubtemas=true;
	elsql="SELECT l.UNID_ID AS ID, l.UNID_PRED AS TMACVE, IFNULL(PGRFERI,PGRFEPI) AS FECHAINIREAL, IFNULL(PGRFERT,PGRFEPT) FECHAFINREAL, UNID_DESCRIP as TEMA, UNID_NUMERO AS SMACVE, "+
	      " UNID_DESCRIP AS SUBTEMA, PGRFEPI AS FECHAINIPROG,  PGRFEPT AS FECHAFINPROG, TIPORETRASO, TIPOCIERRE, OBS "+
      	" FROM eunidades l left outer join pgrupo on "+
		" (PDOCVE='"+ciclo+"' and MATCVE='"+materia+"' and GPOCVE='"+grupo+"' and TMACVE=UNID_PRED AND SMACVE=UNID_NUMERO)"+ 
		" where l.UNID_MATERIA='"+materia+"'  and l.UNID_PRED<>''"+
	  	" order by UNID_PRED,UNID_NUMERO ";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){    
			
				$("#cuerpoFechasProg").empty();
				$("#tabFechas").append("<tbody id=\"cuerpoFechasProg\">");
				c=1; 
				
		 		elTema=JSON.parse(data)[0]["TMACVE"];
		 
				$("#cuerpoFechasProg").append("<tr id=\"rowProg"+c+"\">");				
				$("#rowProg"+c).append("<td colspan=\"7\"><span  class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+elTema+" "+utf8Decode(JSON.parse(data)[0]["TEMA"])+"</span></td>");
				$("#rowProg"+c).append("</tr>");
				c++;

		  		jQuery.each(JSON.parse(data), function(clave, valor) { 

					if (!(elTema==valor.TMACVE)) {						
						$("#cuerpoFechasProg").append("<tr id=\"rowProg"+c+"\">");
						$("#rowProg"+c).append("<td colspan=\"7\"><span class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+valor.TMACVE+" "+utf8Decode(valor.TEMA)+"</span></td>");
						$("#rowProg"+c).append("</tr>");
						elTema=valor.TMACVE;
						c++;
					}
		
					
			 		$("#cuerpoFechasProg").append("<tr id=\"rowProg"+c+"\">");   
					
					spico="<span id=\"ICO"+ciclo+materia+grupo+valor.ID+"\">"+dameIcono(valor.TIPOCIERRE)+"</span>";

			 		$("#rowProg"+c).append("<td><span class=\"text-primary fontRobotoB\">"+spico+valor.SMACVE+" "+utf8Decode(valor.SUBTEMA)+"</span></td>");	   		          	             		         
			
					htmlfecini="<span class=\"label label-success label-white middle\">"+valor.FECHAINIPROG+"</span>";
					htmlfecfin="<span class=\"label label-danger label-white middle\">"+valor.FECHAFINPROG+"</span>";

				
					htmlfeciniR= "<div class=\"input-group\">"+
							 "     <input onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','PGRFERI');\" "+
							 "            value=\""+valor.FECHAINIREAL+"\" class=\"form-control date-picker\" id=\"PGRFERI"+ciclo+materia+grupo+valor.ID+"\" "+
				             "            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
							 "     <span class=\"input-group-addon\"><i class=\"fa green fa-calendar bigger-110\"></i></span>"+
							 "</div>";

							
					htmlfecfinR= "<div class=\"input-group\">"+
							 "     <input onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','PGRFERT');\" "+
							 "            value=\""+valor.FECHAFINREAL+"\" class=\"form-control date-picker\" id=\"PGRFERT"+ciclo+materia+grupo+valor.ID+"\" "+
				             "            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
							 "     <span class=\"input-group-addon\"><i class=\"fa green fa-calendar bigger-110\"></i></span>"+
							 "</div>";

			 		$("#rowProg"+c).append("<td>"+htmlfecini+"</td>");
					$("#rowProg"+c).append("<td>"+htmlfecfin+"</td>");	

					$("#rowProg"+c).append("<td>"+htmlfeciniR+"</td>");
					$("#rowProg"+c).append("<td>"+htmlfecfinR+"</td>");	


					$("#rowProg"+c).append("<td><select id=\"TIPOCIERRE"+ciclo+materia+grupo+valor.ID+"\" "+
					"onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','TIPOCIERRE');\" class=\"form-control\"  id=\"selTipoCierre\"></select></td>");			                                   
					
					$("#rowProg"+c).append("<td><select id=\"TIPORETRASO"+ciclo+materia+grupo+valor.ID+"\" "+
					"onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','TIPORETRASO');\" class=\"form-control\"  id=\"selTipoCierre\"></select></td>");			                                   

					$("#rowProg"+c).append("<td><textarea id=\"OBS"+ciclo+materia+grupo+valor.ID+"\" "+
					"onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','OBS');\" class=\"form-control\"  id=\"selTipoCierre\">"+valor.OBS+"</textarea></td>");			                                   



					$("#rowProg"+c).append("</tr>");    
					$("#TIPOCIERRE"+ciclo+materia+grupo+valor.ID).html($("#selTipoCierre").html());	
					$("#TIPORETRASO"+ciclo+materia+grupo+valor.ID).html($("#selTipoRetraso").html());	
	
					$("#TIPOCIERRE"+ciclo+materia+grupo+valor.ID+" option[value='"+valor.TIPOCIERRE+"']").attr("selected",true);						
					$("#TIPORETRASO"+ciclo+materia+grupo+valor.ID+" option[value='"+valor.TIPORETRASO+"']").attr("selected",true);						
					c++;					    			
				});	
							
			$('.date-picker').datepicker({autoclose: true,todayHighlight: true});		
			cargandoSubtemas=false;	//Para que no ejecute el procedimiento de grabar 

	  },
  error: function(data) {	  
			$('#dlgproceso').modal("hide");                 
			 alert('ERROR: '+data);  
		 }
 });
}


function guardaAvance(ciclo,materia,grupo,tmacve, smacve,id,campo){
	
	if (!cargandoSubtemas) {
		//alert (campo+" "+ciclo+" "+materia+" "+grupo+" "+id+" "+tmacve+" "+smacve);
		elvalor=$("#"+campo+ciclo+materia+grupo+id).val();
		console.log(elvalor);
			parametros={
				tabla:"pgrupo",
				campollave:"concat(PDOCVE,MATCVE,GPOCVE,TMACVE,SMACVE)",
				valorllave:ciclo+materia+grupo+tmacve+smacve,
				nombreCampo:campo,
				valorCampo:elvalor,
				bd:"Mysql"};
			$('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
			$.ajax({
						type: "POST",
						url:"../base/actualizaDin.php",
						data: parametros,
						success: function(data){
							console.log(data);		
							if (campo=='TIPOCIERRE') {$("#ICO"+ciclo+materia+grupo+id).html(dameIcono(elvalor));}
							$('#dlgproceso').modal("hide");    				       					           
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
