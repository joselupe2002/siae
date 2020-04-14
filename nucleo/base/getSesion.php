<?php  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if ($_SESSION['inicio']==1) {
       echo $_SESSION[$_GET["campo"]];
   } else {header("Location: index.php");}
?>
