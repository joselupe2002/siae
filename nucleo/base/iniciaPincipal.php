<?php  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if ($_SESSION['inicio']==1) {
       $_SESSION["idsesion"]=$_POST["cose"];
   echo "le puse : ".$_POST["cose"];
   } else {header("Location: index.php");}
?>
