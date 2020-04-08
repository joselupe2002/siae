<?php 
    session_start(); if (($_SESSION['inicio']==1)){ 
    header('Content-Type: text/html; charset=ISO-8859-1'); 
	
	mb_internal_encoding ('ISO-8859-1');
	
   include("../.././includes/Conexion.php");
   include("../.././includes/UtilUser.php");

       $miConex = new Conexion();
       $miUtil= new UtilUser();
       $datos = array();
   
       
       $sql=$miUtil->getConsultaFiltro($_SESSION['usuario'],$_SESSION['super'],$_GET['modulo'],$_GET["bd"]); 
       
      
       if (isset($_GET['loscamposf'])) {
       	$sql=$miUtil->getSQLfiltro($sql,$_GET['loscamposf'],$_GET['losdatosf'],$_GET['limitar']);       
       }
   
    
       //echo $sql;
       $res=$miConex->getConsulta($_GET["bd"],$sql);
       
       foreach ($res as $lin) {       	  
          $datos[]=$lin;          
       }
      // echo $sql;

       echo json_encode($datos);
} else {header("Location: index.php");}
?>
