<?php  
   
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if ($_SESSION['inicio']==1) { 
       $miConex = new Conexion();
       $res=$miConex->afectaSQL($_SESSION["bd"],$_GET["sql"]);
       echo $res;


   } else {header("Location: index.php");}
?>
