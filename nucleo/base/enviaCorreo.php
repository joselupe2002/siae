<?php 
	header('Content-Type: text/html; charset=UTF-8');
	include("../../includes/Conexion.php");
	include("../../includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();

     if ($_POST["ADJSERVER"]=='S') {
          $resCorreo=$miUtil->enviarCorreoAdj($_POST["CORREO"],$_POST["ASUNTO"],
          $_POST["MENSAJE"],$_POST["ADJUNTO"]);
     }
     else {
          $resCorreo=$miUtil->enviarCorreo($_POST["CORREO"],$_POST["ASUNTO"],
         $_POST["MENSAJE"],$_POST["ADJUNTO"]);
     }
  
     echo "Se envió correo a ".$_POST["NOMBRE"]." CORREO: ".$_POST["CORREO"];						

 ?>
