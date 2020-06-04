<?php header('Content-Type: text/html; charset=ISO-8859-1'); ?>
<?php session_start(); if (($_SESSION['inicio']==1)  && ($_SESSION['idsesion']==$_POST["dato"])){ 
	
   include("../.././includes/Conexion.php");

       $miConex = new Conexion();
    
       $res=$miConex->getConsulta($_POST['bd'],$_POST['sql']);
       echo $res[$_POST["numlin"]][$_POST["numcol"]];
     

} else {header("Location: index.php");}
?>
