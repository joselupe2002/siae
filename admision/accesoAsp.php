<?php
header("Content-Type: text/html;charset=UTF-8");
include("../includes/Conexion.php"); 
include("../includes/UtilUser.php");

$miConex = new Conexion(); 
$miUtil = new UtilUser(); 


$res=$miConex->getConsulta("Mysql","SELECT * FROM aspirantes WHERE CURP='".$_POST["login"]."'");
if (count($res)>0) {
	//if ($res[0]["usua_clave"]==sha1($_POST["password"])){	
	if ( $_POST["password"]==$res[0]["CLAVE"]) {
		session_start();		
		$_SESSION['usuario'] = $_POST['login'];
		$_SESSION['nombre'] = $res[0]["NOMBRE"]." ".$res[0]["APEPAT"]." ".$res[0]["APEMAT"];
		$_SESSION['inicio'] = 1;
		$_SESSION['INSTITUCION'] = $res[0]["_INSTITUCION"];
		$_SESSION['CAMPUS'] = $res[0]["_CAMPUS"];
		$_SESSION['encode'] = "ISO-8859-1";
		$_SESSION['carrera'] = $res[0]["CARRERA"];
		$_SESSION['carrera2'] = $res[0]["CARRERA2"];
		$_SESSION['titApli'] = "Sistema Gesti&oacute;n Escolar - Administrativa";
		$_SESSION['bd'] = "Mysql";
		echo "1";	
	}
	else {
		echo "El password no es correcto";
	}
}
else {
	echo "La CURP no esta Registrada";
}


?>