<?php header('Content-Type: text/html; charset=ISO-8859-1'); ?>
<?php session_start(); if (($_SESSION['inicio']==1)){ 
	
   include("../.././includes/Conexion.php");

       $miConex = new Conexion();
    
       $res=$miConex->getConsulta('SQLite',"SELECT * FROM CUSUARIOS WHERE usua_usuario='".$_SESSION["usuario"]."'");
       if ( hash("sha512",$_GET["passAnt"], false)==$res[0]["usua_clave"]) {
       	  echo "true";
       }
       else {
       	echo "false";
       }
       	
} else {header("Location: index.php");}
?>
