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
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-editable.min.css" />
        
        <link rel="stylesheet"  href="<?php echo $nivel; ?>js/morris/morris.css">
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ui.jqgrid.min.css" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/chosen.min.css" />
        
        </head>


<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white; width:98%;">
    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
    
<div class="row">
    <div class="col-sm-4">
        <div class="space-6"></div>
        <div class="col-sm-7 infobox-container">
            <div class="infobox infobox-green">
                <div class="infobox-icon"> <i class="ace-icon fa fa-keyboard-o"></i></div>
                <div class="infobox-data">
                    <span class="infobox-data-number" id="solicitudes">0</span>
                    <div class="infobox-content">Sol. capturadas</div>
                </div>                
            </div>

            <div class="infobox infobox-blue">
                <div class="infobox-icon"><i class="ace-icon fa fa-check"></i></div>
                <div class="infobox-data">
                    <span class="infobox-data-number" id="solicitudesFin">0</span>
                    <div class="infobox-content">Sol. Finalizadas</div>
                </div>
                <div class="badge badge-success" id="solicitudesFinPor">0%<i class="ace-icon fa fa-arrow-up"></i></div>
            </div>

            <div class="infobox infobox-pink">
                <div class="infobox-icon"><i class="ace-icon fa fa-eye"></i></div>
                <div class="infobox-data">
					<span class="infobox-data-number" id="solicitudesCot">0</span>
						<div class="infobox-content">Sol. Cotejadas</div>
				</div>
				<div class="badge badge-danger" id="solicitudesCotPor">0%<i class="ace-icon fa fa-arrow-up"></i></div>
            </div>
            
            <div class="infobox infobox-red">
                <div class="infobox-icon"><i class="ace-icon fa fa-hand-o-right"></i></div>
                <div class="infobox-data">
					<span class="infobox-data-number" id="solicitudesAc">0</span>
						<div class="infobox-content">Sol. Aceptadas</div>
				</div>
				<div class="badge badge-primary" id="solicitudesAcPor">0%<i class="ace-icon fa fa-arrow-up"></i></div>
            </div>
            
        </div>
    </div>
    <div class="col-sm-8">
        <span class="text-success lead"><i class="ace-icon fa fa-keyboard-o bigger-120 blue"></i> <strong> Solicitudes Capturadas</strong></span>
        <div  id="lascarreras"></div>
        <div class="space-6"></div>
        <span class="text-primary lead"><i class="ace-icon fa fa-check bigger-120 green"></i> <strong> Solicitudes Finalizadas</strong></span>
        <div  id="lascarrerasFin"></div>
    </div>
</div>
<div class="space-12"></div>
<div class="row">
    <div class="col-sm-8">
         <div class="widget-box">
              <div class="widget-header widget-header-flat widget-header-small"  >
                    <div class="row"> 
                        <div class="col-sm-12"> 
                            <h5 class="widget-title"><i class="ace-icon green fa fa-group"></i> Registros de aspirantes en Página</h5>
                        </div>                       
                    </div> <!--  del row del titula de la grafica-->
                </div><!--  del widget header-->
                <div class="widget-body">
                    <div class="widget-main"> 
                        <div id="graphfichas" class="graph"></div>
                    </div>
                </div>                                         
        </div><!--  del widget box-->
    </div>  <!-- Del col de de la grafica -->  
</div><!-- Del row de de la grafica -->  
    

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
<script src="<?php echo $nivel; ?>assets/js/bootstrap-editable.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace-editable.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.nestable.min.js"></script>
<script src="<?php echo $nivel; ?>js/morris/raphael-min.js"></script>
<script src="<?php echo $nivel; ?>js/morris/morris.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>






<script type="text/javascript">

   var graficaMateria;
   var graficaCarrera;
   var graficaSemestre;
   var graficaProfesor;
   var cadCarrera;  
   var elciclo;
   var elcorte;
   var colores=["4,53,252","238,18,8","238,210,7","5,223,5","7,240,191","240,7,223","240,7,7","240,7,12"];
   var ladefault="<img src=\"../../imagenes/menu/esperar.gif\"> </img>";
   colorbtn=["btn-yellow","btn-light","btn-pink","btn-grey","btn-success","btn-info","btn-warning","btn-danger","btn-primary"];                            

   $(document).ready(function($) { 
       var Body = $('body'); 
       Body.addClass('preloader-site');
       elsqlCiclo="SELECT CICL_CLAVE FROM ciclosesc where CICL_REGISTROLINEA='S' order by CICL_ORDEN DESC";
       parametros={sql:elsqlCiclo,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
            type: "POST",
            data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){	
		 
                   jQuery.each(JSON.parse(data), function(clave, valor) {elciclo=valor.CICL_CLAVE;	 });
                   generaAspirantes();	
                  
                    //Cargamos las solicitudes que se han capturado
                    $("#solicitudes").html(ladefault);
                    elsqlSol="SELECT count(*) from aspirantes where CICLO='"+elciclo+"'";
                    parametros={sql:elsqlSol,dato:sessionStorage.co,bd:"Mysql"}
                    $.ajax({
                        type: "POST",
                        data:parametros,
                        url:  "../base/getdatossqlSeg.php",
                        success: function(dataSol){                     
                            $("#solicitudes").html(JSON.parse(dataSol)[0][0]);

                            //Cargamos las solicitudes que se han finalizado
                            $("#solicitudesFin").html(ladefault);
                            elsqlSolFin="SELECT count(*) from aspirantes where CICLO='"+elciclo+"' and FINALIZADO='S'";
                            parametros={sql:elsqlSolFin,dato:sessionStorage.co,bd:"Mysql"}
                            $.ajax({
                                type: "POST",
                                data:parametros,
                                url:  "../base/getdatossqlSeg.php",
                                success: function(dataSolFin){   
                                    solfin=parseInt(JSON.parse(dataSolFin)[0][0]);  
                                    $("#solicitudesFin").html(solfin);                      
                                    $("#solicitudesFinPor").html(Math.round(solfin/parseInt($("#solicitudes").html())*100,2)+"%");	    
                                }
                            });  

                             //Cargamos las solicitudes que se han cotejado
                             $("#solicitudesFin").html(ladefault);
                            elsqlSolCot="SELECT count(*) from aspirantes where CICLO='"+elciclo+"' and COTEJADO='S'";
                            parametros={sql:elsqlSolCot,dato:sessionStorage.co,bd:"Mysql"}
                            $.ajax({
                                type: "POST",
                                data:parametros,
                                url:  "../base/getdatossqlSeg.php",
                                success: function(dataSolCot){   

                                    solcot=parseInt(JSON.parse(dataSolCot)[0][0]);  
                                    $("#solicitudesCot").html(solcot);                      
                                    $("#solicitudesCotPor").html(Math.round(solcot/parseInt($("#solicitudes").html())*100,2)+"%");	    
                                }
                            });  

                            //Cargamos las solicitudes que se han aceptado
                            $("#solicitudesFin").html(ladefault);
                            elsqlSolAc="SELECT count(*) from aspirantes where CICLO='"+elciclo+"' and ACEPTADO='S'";
                            parametros={sql:elsqlSolAc,dato:sessionStorage.co,bd:"Mysql"}
                            $.ajax({
                                type: "POST",
                                data:parametros,
                                url:  "../base/getdatossqlSeg.php",
                                success: function(dataSolAc){   
                                    solac=parseInt(JSON.parse(dataSolAc)[0][0]);  
                                    $("#solicitudesAc").html(solac);                      
                                    $("#solicitudesAcPor").html(Math.round(solac/parseInt($("#solicitudes").html())*100,2)+"%");	    
                                }
                            });  

                        }
                    });

                    //Cargamos datos de las carreras aspirantes 
                         
                            elsqlSolCar="SELECT a.CARR_DESCRIP AS CARRERA, a.CARR_DESCORTA AS CARRERACOR,"+
                                       "(SELECT COUNT(*) FROM aspirantes where CICLO='"+elciclo+"'"+
                                       " and CARRERA=CARR_CLAVE) AS NUM FROM ccarreras a WHERE a.CARR_OFERTAR='S' order by CARR_DESCRIP";                                                       
                            c=0;
                            parametros={sql:elsqlSolCar,dato:sessionStorage.co,bd:"Mysql"}
                            $.ajax({
                                type: "POST",
                                data:parametros,
                                url:  "../base/getdatossqlSeg.php",
                                success: function(dataCar){   
                                    jQuery.each(JSON.parse(dataCar), function(clave, valor) {
                                         $("#lascarreras").append("<span title=\""+valor.CARRERA+"\" class=\"btn btn-app btn-sm "+colorbtn[c]+" no-hover\">"+
													              "   <span class=\"line-height-1 bigger-170\">"+valor.NUM+"</span>"+
                                                                  "   <br /> "+
													              "   <span class=\"line-height-1 smaller-60\"> "+valor.CARRERACOR+" </span>"+
                                                                  "</span>");
                                                                  c++;
                                     });
                                   
                                }
                            });  
                     //Cargamos datos de las carreras aspirantes finalizadas
                            colorbtn=["btn-yellow","btn-light","btn-pink","btn-grey","btn-success","btn-info","btn-warning","btn-danger","btn-primary"];                            
                            elsqlSolCarFin="SELECT a.CARR_DESCRIP AS CARRERA, a.CARR_DESCORTA AS CARRERACOR,"+
                                       "(SELECT COUNT(*) FROM aspirantes where CICLO='"+elciclo+"' and FINALIZADO='S' "+
                                       " and CARRERA=CARR_CLAVE) AS NUM FROM ccarreras a WHERE a.CARR_OFERTAR='S' order by CARR_DESCRIP";                                                       
                            c2=0;
                            parametros={sql:elsqlSolCarFin,dato:sessionStorage.co,bd:"Mysql"}
                            $.ajax({
                                type: "POST",
                                data:parametros,
                                url:  "../base/getdatossqlSeg.php",
                                success: function(dataCarFin){   
                                    jQuery.each(JSON.parse(dataCarFin), function(clave, valor) {
                                         $("#lascarrerasFin").append("<span title=\""+valor.CARRERA+"\" class=\"btn btn-app btn-sm "+colorbtn[c2]+" no-hover\">"+
													              "   <span class=\"line-height-1 bigger-170\">"+valor.NUM+"</span>"+
                                                                  "   <br /> "+
													              "   <span class=\"line-height-1 smaller-60\"> "+valor.CARRERACOR+" </span>"+
                                                                  "</span>");
                                                                  c2++;
                                     });
                                   
                                }
                            });

                     
                    
                    
                    
				  },
			error: function(data) {	                  
					   alert('ERROR: '+data);
				   }
           });

        
           
    });

   $(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});


   function generaAspirantes() {
        $("#graphfichas").empty();
            var elsql="SELECT CARRERAD as x, count(*)  AS y"+
                    "  from vaspirantes where CICLO='"+elciclo+"' group by CARRERAD ORDER By 2";

            parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
            $.ajax({
                    type: "POST",
                    data:parametros,
                    url:  "../base/getdatossqlSeg.php",
                    success: function(data){ 
                                    
                    datosgraf=JSON.parse(data);  
                    
                    graficaCarrera= Morris.Bar({
                        element: 'graphfichas',
                        data: datosgraf,
                        xkey: 'x',
                        ykeys: ['y'],
                        labels: ['y'],
                        xLabelAngle: 50,
                        postUnits: '',
                        gridTextSize: '8',
                        resize: true,
                        barColors: function (row, series, type) {
                            if (type === 'bar') {return 'rgb(' +colores[row.x]+')';}
                            else {return '#000';}
                        }
                        });

                        $( "#chartdiv svg rect" ).on("click", function(data) {    			     
                            detalle($(".morris-hover-row-label").html(),'','','');    			     
                        });
                    
                    
                    }
                });
   }
         

</script>

</body>
<?php } else {header("Location: index.php");}?>
</html>
