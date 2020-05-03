<?php  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if ($_SESSION['inicio']==1) {
       date_default_timezone_set('UTC');
       date_default_timezone_set('America/Mexico_City');
       $fecha = date("d/m/Y"); 
       $hora = date("H:i");                        
       echo $hora."|".$fecha; 


   } else {header("Location: index.php");}
?>
