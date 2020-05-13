
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
        <link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />	


<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white; width:98%;">
<div class="row"> 
    <div class="col-sm-4">
		   <div class="widget-box widget-color-blue2">
			    <div class="widget-header">
					<h4 class="fontRobotoBk widget-title lighter smaller">Ayuda</h4>
				</div>
                <div class="widget-body" style="padding: 20px;  height: 350px; overflow-y: auto;">
                        <a onclick="getAyuda('grpr');" style="cursor:pointer;">
                            <p><i class="fa fa-file-text green"></i> <span id="etgrpr" class="indice fontRoboto">Grid Principal</span></p>
                        </a>

                        <a onclick="getAyuda('fuba');" style="cursor:pointer;">
                            <p><i class="fa fa-file-text green"></i> <span id="etfuba" class="indice fontRoboto">Funciones Básicas</span></p>
                        </a>
                        <a onclick="getAyuda('fire');" style="cursor:pointer;">
                            <p><i class="fa fa-file-text green"></i> <span id="etfire" class="indice fontRoboto">Filtro de Registros</span></p>
                        </a>
                        <a onclick="getAyuda('daco');" style="cursor:pointer;">
                            <p><i class="fa fa-file-text green"></i> <span id="etdaco" class="indice fontRoboto">Contactos de Alumnos</span></p>
                        </a>
				</div>
			</div>
    </div>
    <div class="col-sm-8">
		   <div class="widget-box widget-color-green">
			    <div class="widget-header">
					<h4 id="titulo" class="fontRobotoBk  widget-title lighter smaller">SiGEA</h4>
				</div>
                <div id="laayuda" class="widget-body" style="padding:20px; height: 350px; overflow-y: auto; ">
		           
				</div>
			</div>
    </div>
</div>

<!--=====================================================================================================-->
<div  class="hide" id="grpr">
     <div class="fontRoboto bigger-110" style="text-align: justify">
              La mayoría de los módulos del SIGEA al ingresar al módulo presentan una interfaz de filtrado como la siguiente:
     </div><br/>
     <div class="row">
         <div class="col-sm-4">
             <img src="../../imagenes/ayuda/filtro.PNG" style="width: 100%;"></img><br/>
         </div>
         <div class="col-sm-8">
             <div class="fontRobotoB bigger-100 text-danger text-align: justify"">
                 El SiGEA solo carga los primero 30 registros que tenga del módulo, por lo que si al módulo al que esta
                 ingresando tiene más de 30 se debe establecer un filtro.
             </div>
             <div class="fontRobotoB bigger-100 text-success text-align: justify"">
                 En la ventana aparecé el listado de todas las columnas que tiene el módulo, deberá colocar la palabra 
                 que de acuerdo al campo se quiera visualizar. 
                 <span class="fontRoboto text-warning">(por ejemplo si buscamos un alumno que se llama JOSE, colocariamos en 
                 la casilla NOMBRE jose puede ser mayúscula o minúscula es indistinto).</span> El sistema nos daría el listado 
                 de todos los alumnos que tengan en su nombre la palabra JOSE.                 
             </div>
             <div class="fontRobotoB bigger-100 text-primary text-align: justify"">
                 En caso de llenar otra casilla el sistema buscará los que cumplan todas las condiciones.             
             </div>
             <div class="fontRobotoB bigger-100 text-primary text-align: justify"">
                 Una vez establecidos los filtros hacemos clic en el botón  
                 <span class="btn btn-white btn-success"><i class="ace-icon fa fa-search bigger-120 blue"></i>Ver Datos Filtrados</span>           
             </div>
         </div>
     </div>
     <br/>
     <div class="fontRoboto bigger-110 text-align: justify"">
                 Aparecerán los datos de acuerdo al filtro establecido, de aqui en adelante llamaremos GRID a el componenete 
                 donde se encuentra la información del módulo.                    
      </div>
     <img src="../../imagenes/ayuda/grid.PNG" style="width: 100%;"></img><br/>
     <ol>
         <li class="fontRobotoB text-danger bigger-110" style="text-align: justify; color: blue;">
             <a onclick="getAyuda('fuba');" style="cursor:pointer"> 
             Barra de botónes de las acciones principales que se pueden hacer sobre el módulo </a>
         </li>
         <li class="fontRobotoB text-danger bigger-110" style="text-align: justify; color: green;">
            Procesos que se pueden ejecutar sobre los registros, para ello primero se debe seleccionar el registro en el grid, 
            y posteriormente elegir el proceso <span class="fontRoboto text-warning">(ej. de procesos, Adjuntar Documento, Autorizar, Imprimir Reporte, etc.) </span>
         </li>
         <li class="fontRobotoB text-danger bigger-110" style="text-align: justify; color: blue;">          
             La información siempre se tabula por default de 10 en 10, en este componente puede elegir 
             el número de registros que desea ver en cada página 
         </li>
         <li class="fontRobotoB text-danger bigger-110" style="text-align: justify; color: green;">          
            GRID: se encuentra cada registro de información del módulo. Para seleccionar un registro haga clic sobre la línea. 
         </li>
         <li class="fontRobotoB text-danger bigger-110" style="text-align: justify; color: blue;">          
             En esta sección se puede filtrar de manera rápida. Al escribir un texto se buscará en todas las columnas del GRID si se encuentra 
             la búsqueda deseada. Si desea solo buscar por una columna en específico debe seleccionarla en el combo que se encuentra a la derecha. 
         </li>
     </ol>
</div>


<!--=====================================================================================================-->
<div  class="hide" id="fuba">
     <div class="fontRoboto bigger-110" style="text-align: justify">
              En esta sección se explican el funcionamiento de algunos botones que se encontrarán en la 
              aplicación en diversos módulos, dicha barra estará en la parte superior del grid. 
     </div><br/>
     <div class="row">
         <div class="col-sm-2">
            <span class="btn btn-white btn-primary btn-bold"><i class='fa fa-search grren bigger-110 red'></i></span>
         </div>
         <div class="col-sm-10">
             <div class="fontRobotoB text-danger bigger-100" style="text-align: justify; color: red;">
                  Filtra los registros que se presentan en el grid, de acuerdo a los campos que se muestran.
             </div>
         </div>
     </div>
     <div class="row">
         <div class="col-sm-2">
            <span class="btn btn-white btn-primary btn-bold"><i class='fa fa-list-ul bigger-110 blue'></i></span>
         </div>
         <div class="col-sm-10 text-primary" style="text-align: justify;"> 
             <div class="fontRobotoB bigger-100">
                  Puede configurar las columnas que desea que aparezcan en el grid, para una mejor visualización, 
                  al cargar el módulo nuevamente se muestran todas las columnas. 
             </div>
         </div>
     </div>
     <div class="row">
         <div class="col-sm-2">
            <span class="btn btn-white btn-primary btn-bold"><i class='fa fa-copy bigger-110 pink'></i></span>
         </div>
         <div class="col-sm-10" style="text-align: justify; color:purple;"> 
             <div class="fontRobotoB bigger-100">
                  Copia al portapapeles los datos que se estan visualizando en el grid, 
                  para pegarlos en cualquier otra aplicación.
             </div>
         </div>
     </div>
     <div class="row">
         <div class="col-sm-2">
            <span class="btn btn-white btn-primary btn-bold"><i class='glyphicon glyphicon-export bigger-110 orange'></i></span>
         </div>
         <div class="col-sm-10" style="text-align: justify; color:orange;"> 
             <div class="fontRobotoB bigger-100">
                 Exporta la información que se visualiza en el grid a Microsoft excel.
             </div>
         </div>
     </div>
     <div class="row">
         <div class="col-sm-2">
            <span class="btn btn-white btn-primary btn-bold"><i class='fa fa-plus-circle blue bigger-110'></i></span>
         </div>
         <div class="col-sm-10" style="text-align: justify; color:blue;"> 
             <div class="fontRobotoB bigger-100">
                 Inserta un nuevo registro. Muestra el formulario de llenado de acuerdo al módulo donde se encuentre.
             </div>
         </div>
     </div>
     <div class="row">
         <div class="col-sm-2">
            <span class="btn btn-white btn-primary btn-bold"><i class='fa fa-edit  green bigger-110'></i></span>
         </div>
         <div class="col-sm-10" style="text-align: justify; color:green;"> 
             <div class="fontRobotoB bigger-100">
                 Modifica el registro. Muestra el formulario de edición de datos de acuerdo al módulo donde se encuentre.
             </div>
         </div>
     </div>
     <div class="row">
         <div class="col-sm-2">
            <span class="btn btn-white btn-primary btn-bold"><i class='fa fa-trash red bigger-110 '></i></span>
         </div>
         <div class="col-sm-10" style="text-align: justify; color:red;"> 
             <div class="fontRobotoB bigger-100">
                  Elimina el resgistro que se encuentre seleccionado en el grid.
             </div>
         </div>
     </div>
</div>

<!--=====================================================================================================-->
<div  class="hide" id="fire">
     <div class="fontRoboto bigger-110" style="text-align: justify">
             Al ingresar a la opción filtrar registros aparecerá una ventana como la siguiente:
     </div><br/>
     <div class="row">
         <div class="col-sm-4">
             <img src="../../imagenes/ayuda/filtro.PNG" style="width: 100%;"></img><br/>
         </div>
         <div class="col-sm-8">
             <div class="fontRobotoB text-info bigger-100" style="text-align: justify;">
                  Debe colocar la palabra que desea buscar en el campo correspondiente. El sistema buscará todos los registros que contengan 
                  esa palabra en la columna seleccionada. 
             </div> 
             <div class="fontRobotoB bigger-100" style="text-align: justify; color:green;">
                  Tipos de busqueda
             </div> 
             <div class="fontRoboto bigger-100" style="text-align: justify; color:black;">
                  <span class="fontRobotoB bigger-110 red">=</span> Busca exactamente el valor que se coloque (Ej. si ponemos en la casilla  
                  <span class="fontRobotoB bigger-110 red"> NOMBRE </span> <span style="border:solid 1px;" class="fontRobotoB bigger-110 green">=JOSE</span>) buscaría todos los que se llamen exactamente JOSE                   
             </div> 
             <br/>
             <div class="fontRoboto bigger-100" style="text-align: justify; color:black;">
                  <span class="fontRobotoB bigger-110 red">>,<,>=,<=</span> Para campos numéricos, buscaria los registros que sean mayores, menores, mayor o igual y menor igual a la cantidad escrita
                  <br/>
                  <span class="fontRobotoB bigger-110 red"> EDAD </span> <span style="border:solid 1px;" class="fontRobotoB bigger-110 green">>18</span>) buscaría todos los registros que en edad sean mayores de 18               
                  <span class="fontRobotoB bigger-110 red"> EDAD </span> <span style="border:solid 1px;" class="fontRobotoB bigger-110 green"><=18</span>) buscaría todos los registros que en edad sean menores o igual a 18              
             </div> 
         </div>
     </div>
</div>


<!--para los tipos de menu-->
<div class="hide" id="daco">
     <span class="fontRoboto bigger-110">Muestra una lista de alumnos inscritos en el ciclo actual, con sus teléfonos, correos y dirección</span><br/>
     <ol>
     <li class="fontRoboto bigger-110">Ir al menú </span> 
         <span class="fontRobotoB bigger-110"> Escolar <i class="fa fa-arrow-circle-right blue"></i> 
                                 04) Alumnos <i class="fa fa-arrow-circle-right blue"></i>                                   
                                <span class="text-danger"> 10) Ins. Contacto </span></li>
     <li class="fontRoboto bigger-110">Elija el Ciclo Escolar</li>
     <li class="fontRoboto bigger-110">Elija la Carrera</li>
     <li class="fontRoboto bigger-110">Click en el boton <span class="btn btn-white btn-info btn-round"><i class="ace-icon green fa fa-search bigger-140"></i></span> </li>
     <li class="fontRoboto bigger-110">Si desea exportar la información a Excel haga Click en el boton <span class="btn btn-white btn-info btn-round"><i class="ace-icon blue fa fa-wrench bigger-140"></i></span> </li>
     <li class="fontRoboto bigger-110">Click en el boton <span class="btn btn-white btn-info btn-round"><i class="glyphicon glyphicon-export bigger-110 orange"></i></span> </li>
   </ol>
</div>

<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>        
<script src="<?php echo $nivel; ?>assets/js/jquery-2.1.4.min.js"></script>
<script type="<?php echo $nivel; ?>text/javascript"> if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");</script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery-ui.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/chosen.jquery.min.js"></script>
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

    function getAyuda(id){
        
        $("#titulo").html($("#et"+id).html());
        $("#laayuda").empty();
        $("#laayuda").html($("#"+id).html());
    }
</script>

</body>
<?php } else {header("Location: index.php");}?>
</html>
