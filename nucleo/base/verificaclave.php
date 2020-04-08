
<?php session_start(); if (($_SESSION['inicio']==1)){ 
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   $disponible = "true";

       $miConex = new Conexion();
    
       $res=$miConex->getConsulta($_GET['bd'],"SELECT count(*) AS N FROM ".$_GET['tabla']." WHERE ".$_GET['campo']."='".$_GET[$_GET['campo']]."'");
       foreach ($res as $lin) {
       	if (!($lin['N']==0)) {$disponible="false";}
       }
   	   header('Content-type: application/json');
   	   echo $disponible;
  
} else {header("Location: index.php");}
?>
