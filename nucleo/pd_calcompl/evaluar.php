
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

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="evaluar" style="background-color: white;">
	    
	    
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
    
    <div class="page-header">
         <h1><?php echo $_GET["nombre"] ?><small><i class="ace-icon fa fa-angle-double-right"></i><?php echo $_GET["responsabled"] ?></small></h1>
         
    </div>
	<div  class="table-responsive">
		  <table id=tabHorarios class= "display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
			    <thead>  
                      <tr id="titulo">
                           <th style="text-align: center;">ID</th> 
                          <th style="text-align: center;">No. Control</th> 
                          <th style="text-align: center;">Nombre</th>    
                          
                                                                 	   	  
					   </tr> 
			     </thead> 
	         </table>
	</div>
	<div class="space-10"></div>
	<div style="text-align:center;" class="row">
	     <div class="col-sm-1"> </div>
         <div class="col-sm-5"> 
              <button class="btn btn-white btn-danger btn-bold" onclick="regresar();"><i class="ace-icon fa fa-reply-all bigger-120 blue"></i>Regresar    </button>
         </div>
         <div class="col-sm-5"> 
	          <button class="btn btn-white btn-info btn-bold" onclick="guardar();"><i class="ace-icon fa fa-floppy-o bigger-120 blue"></i>Guardar Datos</button>
	     </div>
	     <div class="col-sm-1"> </div>	     
	</div>
		
<select style="visibility:hidden" id="muestra"></select>		
 
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
        var losCriterios;
        var cuentasCal=0;
        
        
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site'); agregaCriterios(); });
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});





        function cambiarColor(cal,lafila){

        	  if (cal==0) {
                  $("#PN_"+lafila).addClass("badge-danger"); 
                  $("#PN_"+lafila).removeClass("badge-success");

                  $("#PL_"+lafila).addClass("label-danger"); 
                  $("#PL_"+lafila).removeClass("label-success");
                  }
 			 else { 
 				  $("#PN_"+lafila).addClass("badge-success"); 
                  $("#PN_"+lafila).removeClass("badge-danger");

                  $("#PL_"+lafila).addClass("label-success"); 
                  $("#PL_"+lafila).removeClass("label-danger");
 	 			 }
	 			 
            }
		
		function calcula(elsel, lafila, numCal){		
			if ($("#"+elsel).val()==0) { $("#"+elsel).addClass("text-danger");$("#"+elsel).removeClass("text-primary");}
			else { $("#"+elsel).addClass("text-primary");$("#"+elsel).removeClass("text-danger");}
			suma=0;
			 for (i=1;i<numCal;i++) {
				  if (parseInt($("#CAL"+i+"_"+lafila).val())) {
                      suma+=parseInt($("#CAL"+i+"_"+lafila).val());
                      }
				 }

			 cal=Math.round(suma/(numCal-1));
             $("#PN_"+lafila).html(cal);

             et=$("#muestra option[value='"+cal+"']").html().split(" ")[1];
             $("#PL_"+lafila).html(et);

             cambiarColor(cal,lafila);
           
  			
             
			}
		

		function generaTabla(grid_data,numCal){			   
		       c=0;
		       suma=0;
		       $("#cuerpo").empty();
			   $("#tabHorarios").append("<tbody id=\"cuerpo\">");
		       jQuery.each(grid_data, function(clave, valor) { 	
		    	    
		    	    $("#cuerpo").append("<tr id=\"row"+valor.ID+"\">");
		    	    $("#row"+valor.ID).append("<td id=\"elid_"+valor.ID+"\">"+valor.ID+"</td>");
		    	    $("#row"+valor.ID).append("<td id=\"matricula_"+valor.ID+"\">"+valor.MATRICULA+"</td>");
		    	    $("#row"+valor.ID).append("<td id=\"nombre_"+valor.ID+"\">"+valor.NOMBRE+"</td>");
		    	    suma=0;
                    for (i=1;i<numCal;i++) {
                    	$("#row"+valor.ID).append("<td><SELECT class=\"text-primary\" style=\"width:60px; font-size:11px;\" "+
                            	"id=\"CAL"+i+"_"+valor.ID+"\" onchange=\"calcula('CAL"+i+"_"+valor.ID+"','"+valor.ID+"',"+numCal+"); \"></SELECT></td>");
                    	$("#CAL"+i+"_"+valor.ID).html($("#muestra").html());
                    	$("#CAL"+i+"_"+valor.ID).val(valor["CAL"+i]);
                    	

                    	if (parseInt(valor["CAL"+i])) {
                              suma+=parseInt(valor["CAL"+i]);                              
                        	}
                        }

                  
                    cal=Math.round(suma/(numCal-1))
                    et=$("#muestra option[value='"+cal+"']").html().split(" ")[1];

            
                    
                    $("#row"+valor.ID).append("<td><span id=\"PN_"+valor.ID+"\" class=\"pull-left badge badge-success\">"+cal+"</span></td>");
                    $("#row"+valor.ID).append("<td><span id=\"PL_"+valor.ID+"\" class=\"label label-success label-white middle\">"+et+"</span></td>");

                    cambiarColor(cal,valor.ID);
                     	    					
		        });
		}		
		                      
		

		function agregaCriterios(){
			lasCal="";
			var numCal=1;
			elsql="SELECT VALOR,CONCAT(VALOR,' ',DESCRIP) AS DESCRIP from eponderacion where TIPO='ACTCOMPL' ORDER BY VALOR";
            parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}

			 $.ajax({
				   type: "POST",				   
                   data:parametros,
		           url:  "../base/dameselectSeg.php",
		           success: function(data){			      	                       
		        	       $("#muestra").html(data);  	     
		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		          });

				
			 elsql=	"SELECT * from ecriterioseval where TIPO='ACTCOMPL' ORDER BY NUM";
			 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}	  
			 $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){
			      		 losCriterios=JSON.parse(data)
		        	     jQuery.each(losCriterios, function(clave, valor) { 	
                             $("#titulo").append("<th title=\""+valor.CRITERIO+"\"style=\"text-align: center;\">"+valor.CORTO+"</th> ");	
                             lasCal+="IFNULL(CAL"+numCal+",'') as CAL"+numCal+",";
      	    	             numCal++;      	    	             
			        	     }); 
                        cuantasCal=numCal;
			      		$("#titulo").append("<th style=\"text-align: center;\">PROM</th> ");
			      		$("#titulo").append("<th style=\"text-align: center;\">LETRA</th> ");

			      		lasCal=lasCal.substring(0,lasCal.length-1); 

                        elsql="select a.ID, a.MATRICULA, a.NOMBRE, "+lasCal+" from veinscompl a "+
						" left outer join  ecalificagen b on (a.MATRICULA=b.MATRICULA and a.ACTIVIDAD=b.ACTIVIDAD)where a.ACTIVIDAD='"+<?php echo $_GET["id"]?>+"'";
						parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}			   
			      		$.ajax({
								 type: "POST",
								 data:parametros,
			  		           url:  "../base/getdatossqlSeg.php",
			  		           success: function(data){
			  		        	 generaTabla(JSON.parse(data),numCal);     
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


		function guardar(){
			
		    var losdatos=[];
		    var i=0; 
		    var j=0; var cad="";
		 
		    $('#dlgproceso').modal({backdrop: 'static', keyboard: false});
		    var c=-1;

            numCal=cuantasCal;
	    	idact=<?php echo $_GET["id"]?>; 
	    	cad="";
		    $('#tabHorarios tr').each(function () {
		    if (c>=0) {
    		        var i = $(this).find("td").eq(0).html();
    		      
    		        cad+=$("#matricula_"+i).html()+"|"+(parseInt(numCal)-1)+"|"+idact+"|"+$("#PN_"+i).html()+"|"+$("#PL_"+i).html()+"|";    //Matricula NumCAL aCTIVIDAD

     		        for (h=1;h<numCal;h++) {
     		        	cad+=$("#CAL"+h+"_"+i).val()+"|";
    					 }
					 
                  
		            losdatos[c]=cad.substring(0,cad.length-1); 
		            cad="";
    		     }
		         c++;
    		 });
		    	 
		    
		    	    
		     var loscampos = ["MATRICULA","NUMCAL","ACTIVIDAD","PROM","PROML"];
		     x=5;
		     for (h=1;h<numCal;h++) {loscampos[x]="CAL"+h; x++;}

		    	    
		    	    parametros={
		    	    		tabla:"ecalificagen",
		    	    		campollave:"ACTIVIDAD",
		    	    		bd:"Mysql",
		    	    		valorllave:idact,
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
		    	        	$('#modalDocument').modal("hide");  
		    	        	$('#dlgproceso').modal("hide"); 
		    	        	if (data.length>0) {alert ("Ocurrio un error: "+data);}
		    	        	else {alert ("Registros guardados")}	
		    	        	window.location="grid.php?modulo=<?php echo $_GET["modulo"];?> ";	                                	                                        					          
		    	        }					     
		    	    });    	                	 
       

			}

		function regresar(){
			window.location="grid.php?modulo=<?php echo $_GET["modulo"];?> ";	
			}
		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
