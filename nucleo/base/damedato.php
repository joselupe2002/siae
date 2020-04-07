<?php header('Content-Type: text/html; charset=ISO-8859-1'); ?>
<?php session_start(); if (($_SESSION['inicio']==1)){ 
	
   include("../.././includes/Conexion.php");

       $miConex = new Conexion();
    
       $res=$miConex->getConsulta($_GET['bd'],$_GET['sql']);
       
       foreach ($res as $lin) {
           echo $lin[$_GET["numcol"]];
       }

} else {header("Location: index.php");}
?>
