<?php 
     session_start(); if (($_SESSION['inicio']==1)){ 
       //header('Content-Type: text/html; charset=ISO-8859-1'); 
	    //mb_internal_encoding ('ISO-8859-1');
	
      include("../.././includes/Conexion.php");

       $miConex = new Conexion();
       $datos = array();
       $res=$miConex->getConsulta($_SESSION['bd'],"SELECT ".$_GET["campocons"]." FROM ".$_GET["tabla"].
       " where ".$_GET["campok"]."='".$_GET["valork"]."'");
        
       $cons="SIN CONSECUTIVO";
       if (!(empty($res))) { 
          $cons=$res[0][0];
       }

       $res=$miConex->afectaSQL($_SESSION['bd'],"UPDATE  ".$_GET["tabla"]." SET ". $_GET["campocons"]."=".$_GET["campocons"]."+1 ".
                                " WHERE ".$_GET["campok"]."='".$_GET["valork"]."'");
       echo $res;
       echo $cons;
    
} else {header("Location: index.php");}
?>
