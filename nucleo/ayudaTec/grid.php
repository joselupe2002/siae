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

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
                th, td { white-space: nowrap; }
        </style>
         
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
       
	      <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>	      
                
            <div class="row" style=" overflow-x: auto;">	
                   <table id=tabHorarios class= "display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
			       </table>	
           </div>
      
	
	
	<div class="main-content"  style="margin-left: 10px; margin-right: 10px; width: 98%;">
          <div class="row">
               <div class="col-sm-2"> 
                    <div class="clearfix"><div class="pull-left tableTools-container"></div></div>
			   </div>	
			   <div class="col-sm-2"> 
					            <span class="label label-info">Ciclo</span>
					            <div id="contCiclo"></div>					           			   
			   </div>
			   <div class="col-sm-3"> 
				     <span class="label label-info">Estado</span>
					 <div id="contEstado"></div>	
			   </div>	
			   <div class="col-sm-3"> 
				     <span class="label label-info">Municipio</span>
					 <div id="contMunicipio"></div>	
			   </div>
			   <div class="col-sm-2" style="padding-top: 14px;"> 				     
					 <button class="btn btn-white btn-success btn-bold" onclick="buscarRegistros();">
						    <i class="ace-icon fa fa-search bigger-120 blue"></i>Buscar
					 </button>
			   </div>
	      </div>	
		  <div class="row">
				 <div id="tablaind" class="table-responsive">
                       
                </div>			            
          </div> 
    </div> <!--  del Contenedor  -->
  
  	
	
		
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


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

    	sql="SELECT MATE_CLAVE, MATE_DESCRIP, MATE_TIPO FROM cmaterias limit 10";
        var titulos = [{titulo: "CLAVE",estilo: "text-align: center;"}, 
                       {titulo: "DESCRIPCION",estilo: "text-align: left;"},
                       {titulo: "TIPO",estilo: "color:red;"}];

        var campos = [{campo: "MATE_CLAVE",estilo:"",antes:"<span class=\"pull-right badge badge-info\">",despues:"</span>"}, 
                      {campo: "MATE_DESCRIP",estilo: "font-size:10px;",antes:"<strong>",despues:"</strong>"},
                      {campo: "MATE_TIPO",estilo: "",antes:"<span class=\"pull-right badge badge-info\">",despues:"</span>"}];
        
       generaTablaDin("tabHorarios","",sql,titulos,campos);
       
       
      
        addSELECT("selCiclos","contCiclo","CICLOS", "", "","BUSQUEDA"); 
        addSELECT("selMaterias","contMaterias","MATERIAS", "", " AND MATE_TIPO='T'",""); 
        addSELECT("selGenero","contGenero","PROPIO", "SELECT SEXO_CLAVE, SEXO_DESCRIP FROM esexo", "",""); 
        addSELECT("selEstado","contEstado","PROPIO", "SELECT ID_ESTADO, ESTADO FROM cat_estado", "",""); 
       // addSELECT("selMunicipio","contMunicipio","PROPIO", "SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio where ID_MUNICIPIO=''", "",""); 


        var losmeses = [{id: "01",opcion: "ENERO"},{id: "02",opcion: "FEBRERO"}, {id: "03",opcion: "MARZO"}, {id: "04",opcion: "ABRIL"},
        	{id: "05",opcion: "MAYO"},{id: "06",opcion: "JUNIO"}, {id: "07",opcion: "JULIO"}, {id: "08",opcion: "AGOSTO"},  
        	{id: "09",opcion: "SEPTIEMBRE"},{id: "10",opcion: "OCTUBRE"}, {id: "11",opcion: "NOVIEMBRE"}, {id: "12",opcion: "DICIEMBRE"}];
        addSELECTJSON("selMeses","contMunicipio",losmeses);

            
    });


    function change_SELECT(elemento) {
        if (elemento=='selCiclos') {
            alert ("dsfsdfsdfsdfsd: " +elemento);
            }
        if (elemento=='selEstado') {
        	actualizaSelect("selMunicipio","SELECT ID_MUNICIPIO, MUNICIPIO from "+
                	                       "cat_municipio where ID_ESTADO='"+$("#selEstado").val()+"'","")
            }
        
    }
   

    function buscarRegistros(){

    	 sql="SELECT ALUM_MATRICULA as MATRICULA,ALUM_APEPAT AS PATERNO,ALUM_APEMAT AS MATERNO, ALUM_NOMBRE , ALUM_CARRERAREG, "+
             "ALUM_MAPA,ALUM_ACTIVO,ALUM_TUTOR, ALUM_TELEFONO,ALUM_CORREO, ALUM_DIRECCION, ALUM_ESTADO FROM FALUMNOS limit 50";

         titulos=getJsonCol("ALUM_MATRICULA as MATRICULA,ALUM_APEPAT AS PATERNO,ALUM_APEMAT AS MATERNO,ALUM_NOMBRE, "+
                             "ALUM_CARRERAREG, ALUM_MAPA,ALUM_ACTIVO,ALUM_TUTOR, ALUM_TELEFONO,ALUM_CORREO, ALUM_DIRECCION, ALUM_ESTADO");

          
          generaTablaBus("ayudaTec","tablaind",sql,titulos);
      	 
        }


 
</script>



</body>
<?php } else {header("Location: index.php");}?>
</html>


