<?php 
     session_start(); if (($_SESSION['inicio']==1)  && ($_SESSION['idsesion']==$_POST["dato"])  ){ 
    header('Content-Type: text/html; charset=UTF-8'); 
	
	mb_internal_encoding ('UTF-8');
	
   include("../.././includes/Conexion.php");

       $miConex = new Conexion();
       $datos = array();
       $res=$miConex->getConsulta($_POST['bd'],$_POST['sql']);
       
       foreach ($res as $lin) {
       	 echo ("dato: ".$lin);  
          $datos[]=$lin;
       }
      // echo json_encode($datos);
    
} else {header("Location: index.php");}
?>
