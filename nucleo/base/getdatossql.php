<?php 
     session_start(); if (($_SESSION['inicio']==1)){ 
    header('Content-Type: text/html; charset=ISO-8859-1'); 
	
	mb_internal_encoding ('ISO-8859-1');
	
   include("../.././includes/Conexion.php");

       $miConex = new Conexion();
       $datos = array();
       $res=$miConex->getConsulta($_GET['bd'],$_GET['sql']);
       
       foreach ($res as $lin) {
       	  
          $datos[]=$lin;
       }
       echo json_encode($datos);
    
} else {header("Location: index.php");}
?>
