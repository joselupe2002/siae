<?php
header("Content-Type: text/html;charset=UTF-8");
include("../includes/Conexion.php"); 
include("../includes/UtilUser.php");

$miConex = new Conexion(); 
$miUtil = new UtilUser(); 


$res=$miConex->getConsulta("Mysql","SELECT * FROM aspirantes, ciclosesc, ccarreras WHERE CURP='".$_POST["login"]."'".
" and CICLO=CICL_CLAVE and CARRERA=CARR_CLAVE and FINALIZADO='S'  and (CICL_ABIERTOEXA='S' or CICL_ACIERTORES='S')");
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
		$_SESSION['carrerad'] = $res[0]["CARR_DESCRIP"];
		$_SESSION['aceptado'] = $res[0]["ACEPTADO"];
		$_SESSION['abiertoRes'] = $res[0]["CICL_ACIERTORES"];
		$_SESSION['abiertoExa'] = $res[0]["CICL_ABIERTOEXA"];
		$_SESSION['idasp'] = $res[0]["IDASP"];
		$_SESSION['enviodocins'] = $res[0]["ENVIODOCINS"];
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
	echo "La CURP no se encuentra activa esto puede suceder: ".
	"<br> <span class=\"text-warning\"><strong>1. La CURP se activa el 02/08/2020. </span></strong><br>".
	"  <span class=\"text-danger\"><strong> 2. No finalizó su proceso de registro en línea. </span></strong><br>".
	" <span class=\"text-success\"><strong>3. Esta mal escrita </span></strong>";
}


?>