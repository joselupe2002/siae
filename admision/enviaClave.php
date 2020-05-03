<?php 
	header('Content-Type: text/html; charset=UTF-8');
	include("../includes/Conexion.php");
	include("../includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();

    $res=$miConex->getConsulta("Mysql","SELECT CORREO, CLAVE FROM aspirantes WHERE CURP='".$_POST["curp"]."'");
    if (count($res)>0) {
          $resCorreo=$miUtil->enviarCorreo($res[0]["CORREO"],utf8_decode('ITSM: Recordatorio de clave de ingreso'),
          "Se envia la contraseña para ingresar al módulo de Adminisión:<b>".$res[0]["CLAVE"]."</b>","");
          echo "Se envió clave al correo ".$res[0]["CORREO"].$resCorreo." En caso de no encontrarlo en bandeja de entrada, verifique en su bandeja de correo no deseado.";						
		}
    else 
         {echo "No existe esta CURP registrada";}
	
 ?>
