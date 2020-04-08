<?php
header("Content-Type: text/html;charset=UTF-8");
include("./includes/Conexion.php"); 
include("./includes/UtilUser.php");

$miConex = new Conexion(); 
$miUtil = new UtilUser(); 


$res=$miConex->getConsulta("SQLite","SELECT * FROM CUSUARIOS WHERE USUA_USUARIO='".$_POST["login"]."'");
if (count($res)>0) {
	//if ($res[0]["usua_clave"]==sha1($_POST["password"])){	
	if ( hash("sha512",$_POST["password"], false)==$res[0]["usua_clave"]) {
		session_start();		
		$_SESSION['usuario'] = $_POST['login'];
		$_SESSION['nombre'] = $res[0]["usua_nombre"];
		$_SESSION['super'] = $miUtil->superUsuario($_POST["login"]);
		$_SESSION['inicio'] = 1;
		$_SESSION['INSTITUCION'] = $res[0]["_INSTITUCION"];
		$_SESSION['CAMPUS'] = $res[0]["_CAMPUS"];
		$_SESSION['encode'] = "ISO-8859-1";
		$_SESSION['carrera'] = $res[0]["usua_carrera"];
		$_SESSION['depto'] = $res[0]["usua_depto"];
		$_SESSION['titApli'] = "Sistema Gesti&oacute;n Escolar - Administrativa";
		$_SESSION['bd'] = "Mysql";
		echo "1";	
	}
	else {
		echo "El password no es correcto";
	}
}
else {
	echo "El usuario no existe";
}


?>