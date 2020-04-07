
<?php session_start(); if (($_SESSION['inicio']==1)){ 
      header('Content-Type: text/html; charset='.$_SESSION['encode']);
	
   include("../.././includes/Conexion.php");

        $laTabla=$_GET['tabla'];
       	$miConex = new Conexion();
       	
       	$res=$miConex->getConsulta("SQLite","select * from all_col_comment WHERE TABLE_NAME='".$laTabla."'
                                     and visgrid='S' order by seccion,numero");
       	echo json_encode($res);
       	
} else {header("Location: index.php");}
?>
