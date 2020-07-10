
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
         
         
         
         <div class="row">	   
            
		      <div class="col-sm-6"> 
		               <span class="label label-success" >Unidad</span>
			           <select id="unidades" style="width: 100%;"> </select>
			           <select style="display:none;" id="base" style="width: 100%;">
			              <?php for ($x=0;$x<=100;$x++) {?>
			                  echo  <option value="<?php echo $x;?>"><?php echo $x;?></option>			            
			              <?php } ?>		              
			           </select>
		       </div> 	
		         <div class="col-sm-6">  
                   <h1><?php echo $_GET["materiad"] ?><small><i class="ace-icon fa fa-angle-double-right"></i><?php echo $_GET["materia"] ?></small></h1>
              </div>	           
         </div>
    
    </div>
    
    
		      
	<div  class="table-responsive" style="overflow-y: auto; height: 300px;" >
		  <table id="latabla" class= "display table-condensed table-striped table-sm table-bordered table-hover nowrap" ></table>
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
        
		$(document).ready(function($) { var Body = $('body'); $(document).bind("contextmenu",function(e){return false;});  Body.addClass('preloader-site'); cargarUnidades(); $("#unidades").change(function(){cargarCalificaciones();}); });
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});




		function cargarUnidades(){		
			 $("#laTabla").empty();
			 $("#unidades").empty();
			 $("#unidades").append("<option value=\"0\">Elija Unidad</option>");	
			 
			 base_materia=0;
			 base_grupo=0;
			 
			 //Buscamos los cortes que esta abierto para la asignatura de acuerdo al ciclo 
			 sqlCor="select * from ecortescal where  CICLO='<?php echo $_GET["ciclo"]?>'"+
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
					 iniCorte=""; finCorte=""; 		        				         
		        	 jQuery.each(JSON.parse(dataCor), function(clave, valorCor) { 	
					    iniCorte=valorCor.INICIA; finCorte=valorCor.TERMINA; eltidepocorte=	valorCor.TIPO;					
					 });

					//alert (iniCorte+" "+finCorte);
					elsql="SELECT DGRU_MATERIA AS MATERIA,SIE FROM edgrupos p where p.`DGRU_ID`='<?php echo $_GET["base"]?>'";
					parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
					$.ajax({
						type: "POST",
						data:parametros,
						url:  "../base/getdatossqlSeg.php",
						success: function(data){    		        				         
							jQuery.each(JSON.parse(data), function(clave, valor) { 
								base_grupo=valor.SIE; base_materia=valor.MATERIA;    });
							

							sqlUni="select UNID_ID, UNID_NUMERO, UNID_DESCRIP, "+
										"(select count(*) from eplaneacion b where STR_TO_DATE(FECHA,'%d/%m/%Y')  BETWEEN STR_TO_DATE('"+iniCorte+"','%d/%m/%Y') "+ 
										" AND STR_TO_DATE('"+finCorte+"','%d/%m/%Y') and b.NUMUNIDAD=a.UNID_NUMERO "+ 
										" and b.MATERIA=a.UNID_MATERIA and b.GRUPO='<?php echo $_GET["grupo"]?>' and b.CICLO='<?php echo $_GET["ciclo"]?>') as ABIERTO,"+
										"(select count(*) from vecortesexp g where DATE_FORMAT(NOW(),'%Y-%m-%d') BETWEEN STR_TO_DATE(INICIA,'%d/%m/%Y')  "+
										" AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and g.UNIDAD=a.UNID_ID and g.MATERIA=a.UNID_MATERIA and "+
										"g.PROFESOR='<?php echo $_GET["profesor"]?>' and g.CICLO='<?php echo $_GET["ciclo"]?>' and g.GRUPO='<?php echo $_GET["grupo"]?>')  as ABIERTO2, "+
										"(select count(*) from eplaneacion b where STR_TO_DATE(FECHA,'%d/%m/%Y')  BETWEEN STR_TO_DATE('"+iniCorte+"','%d/%m/%Y') "+ 
										" AND STR_TO_DATE('"+finCorte+"','%d/%m/%Y') and b.NUMUNIDAD=a.UNID_NUMERO "+ 
										" and b.MATERIA='"+base_materia+"' and b.GRUPO='"+base_grupo+"' and b.CICLO='<?php echo $_GET["ciclo"]?>') as ABIERTO3 "+
										" from eunidades a where a.UNID_MATERIA='<?php echo $_GET["materia"]?>' and UNID_PRED=''"
						
		
				            parametros2={sql:sqlUni,dato:sessionStorage.co,bd:"Mysql"}
							$.ajax({
								type: "POST",
								data:parametros2,
								url:  "../base/getdatossqlSeg.php",
								success: function(data){    
									
									jQuery.each(JSON.parse(data), function(clave, valor) {										
										ab=parseInt(valor.ABIERTO)+parseInt(valor.ABIERTO2)+parseInt(valor.ABIERTO3);
										
										cadVer='C';
										if (ab>0) {cadVer='A';}
										$("#unidades").append("<option value=\""+valor.UNID_NUMERO+"\">"+utf8Decode(valor.UNID_NUMERO+" "+valor.UNID_DESCRIP)+" |"+cadVer+"|</option>");       	     
									});
									},
								error: function(data) {	                  
											alert('ERROR: '+data);
										}
								});		     
						}
					}); //del ajax de las Unidades 					 
				 } // del success
			}); // del ajax de los cortes 			    
		}


        function cargarCalificaciones() {
        	 //Cargar Calificaciones
        	 launidad=parseInt($("#unidades").val());  
        	 abierto=$('#unidades option:selected').text().split("|")[1];
   
			 elsql="select a.ID, ALUM_MATRICULA,  CONCAT(ALUM_APEPAT,' ',ALUM_APEMAT,' ',ALUM_NOMBRE) AS NOMBRE, IFNULL(LISPA"+launidad+",'0') as CAL, IFNULL(LISFA"+launidad+",'0') as FALTA"+
				          " from dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA and a.GPOCVE='<?php echo $_GET["grupo"];?>'"+
				          " and PDOCVE='<?php echo $_GET["ciclo"];?>' and LISTC15='<?php echo $_GET["profesor"];?>'"+
						  " and MATCVE='<?php echo $_GET["materia"];?>' and a.BAJA='N' order by ALUM_APEPAT,ALUM_APEMAT,ALUM_NOMBRE";
				
			
	          parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			 $.ajax({
				 type: "POST",
				 data:parametros,
		         url:  "../base/getdatossqlSeg.php",
		         success: function(data){    
		        	 $("#latabla").empty();
		        	 $("#latabla").append("<thead><tr id=\"titulo\"><th style=\"text-align: center;\">No. Control</th>"+ 
                                                      "<th style=\"text-align: center;\">Nombre</th><th colspan=\"2\" style=\"text-align: center;\">Calif.</th><th style=\"text-align: center;\">Faltas.</th></tr></thead>"); 
			     
		        	 $("#latabla").append("<tbody id=\"cuerpo\">");		        	 
		        	 jQuery.each(JSON.parse(data), function(clave, valor) { 
		        		    $("#cuerpo").append("<tr id=\"row"+valor.ID+"\">");				
				    	    $("#row"+valor.ID).append("<td id=\"matricula_"+valor.ID+"\">"+valor.ALUM_MATRICULA+"</td>");
				    	    $("#row"+valor.ID).append("<td id=\"nombre_"+valor.ID+"\">"+utf8Decode(valor.NOMBRE)+"</td>");

				    	    if (abierto=='A') {

				    	    	//Para capturar calificaciones
				    	    	$("#row"+valor.ID).append("<td id=\"nombre_"+valor.ID+"\">"+"<select class=\"text-primary\" style=\"width:60px; font-size:11px;\" id=\"SEL_"+valor.ID+"\" "+
						    	    	" onchange=\"guardar("+valor.ID+",'"+launidad+"','<?php echo $_GET["materia"];?>','<?php echo $_GET["profesor"];?>','<?php echo $_GET["ciclo"];?>','"+
						    	    	valor.ALUM_MATRICULA+"','<?php echo $_GET["grupo"];?>','CAL');\"></select>"+"</td>");

				    	    	//Para el indicador 
				    	    	laruta="..\\..\\imagenes\\menu\\mal.png";
		                        if (valor.CAL>=70) {laruta="..\\..\\imagenes\\menu\\bien.png"; }  			    	                                 
		                        $("#row"+valor.ID).append("<td><img id=\"SELIMG_"+valor.ID+"\" width=\"20px\" height=\"20px\" src=\""+laruta+"\"></td>");

		                         //Para capturar Faltas
				    	    	$("#row"+valor.ID).append("<td id=\"nombre_"+valor.ID+"\">"+"<select class=\"text-primary\" style=\"width:60px; font-size:11px;\" id=\"SELF_"+valor.ID+"\" "+
						    	    	" onchange=\"guardar("+valor.ID+",'"+launidad+"','<?php echo $_GET["materia"];?>','<?php echo $_GET["profesor"];?>','<?php echo $_GET["ciclo"];?>','"+
						    	    	valor.ALUM_MATRICULA+"','<?php echo $_GET["grupo"];?>','FALTA');\"></select>"+"</td>");
		                            
				    	    	$("#SELF_"+valor.ID).html($("#base").html());
				    	    	$("#SEL_"+valor.ID).html($("#base").html());
                                $("#SEL_"+valor.ID).val(valor.CAL);  
                                $("#SELF_"+valor.ID).val(valor.FALTA);                              				    	    
				    	    }
				    	    else { 
					    	    $("#row"+valor.ID).append("<td id=\"cal_"+valor.ID+"\">"+valor.CAL+"</td>");
					    	   
					    	    laruta="..\\..\\imagenes\\menu\\mal.png";
		                        if (valor.CAL>=70) {laruta="..\\..\\imagenes\\menu\\bien.png"; }  			    	                                 
		                        $("#row"+valor.ID).append("<td><img id=\"SELIMG_"+valor.ID+"\" width=\"20px\" height=\"20px\" src=\""+laruta+"\"></td>");
		                        $("#row"+valor.ID).append("<td id=\"calf_"+valor.ID+"\">"+valor.FALTA+"</td>");
		                        
					    	    }

				    	            		        	     
		               });
		             },
		         error: function(data) {	                  
		                    alert('ERROR: '+data);
		                }
		        });
            }
		

		function guardar(id,numeroUni, materia, profesor, ciclo, matricula, grupo, tipo){

			campo='';
			if (tipo=="FALTA"){campo='F';}
			
			if (eltidepocorte=='CCO1'){tipocal="1";}
			if (eltidepocorte=='CCO2'){tipocal="1";}
			if (eltidepocorte=='CCO3'){tipocal="1";}
			if (eltidepocorte=='CCC1'){tipocal="2";}
			if (eltidepocorte=='CCC2'){tipocal="3";}

			$("#SELIMG_"+id).attr("src","..\\..\\imagenes\\menu\\esperar.gif");
		    	    $.ajax({
		    	        type: "POST",
		    	        url:"actualizaCal.php?valorllave="+id+"&numeroUni="+numeroUni+"&c="+$("#SEL"+campo+"_"+id).val()+"&materia="+materia+
							"&tipocal="+tipocal+"&materia="+materia+"&profesor="+profesor+"&ciclo="+ciclo+"&matricula="+matricula+"&grupo="+grupo+"&tipo="+tipo+
							"&idcorte=<?php echo $_GET["idcorte"];?>&tipocorte="+eltidepocorte,		    
		    	        success: function(data){	
								    	        		
		    	        	if (data.substring(0,2)=='0:') {alert ("Ocurrio un error: "+data);}	 

		    	        	 laruta="..\\..\\imagenes\\menu\\mal.png";
                             if ($("#SEL_"+id).val()>=70) {laruta="..\\..\\imagenes\\menu\\bien.png"; }

		    	        	$("#SELIMG_"+id).attr("src",laruta);                                 	                                        					          
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
