<?php 
     session_start(); if (($_SESSION['inicio']==1)){ 
   // header('Content-Type: text/html; charset=ISO-8859-1'); 
	// mb_internal_encoding ('ISO-8859-1');
	
   include("../.././includes/Conexion.php");
   include("./../../includes/UtilUser.php");

       $miConex = new Conexion();
       
       $miUtil= new UtilUser();
       $datos = array();
      
       $misMenus=$miUtil->getMenus($_GET['elusuario'],$miUtil->superUsuario($_GET['elusuario']),false);
              
       foreach ($misMenus as $lin) {
          $datos[]=$lin;
       }
       echo json_encode($datos);

       
} else {header("Location: index.php");}
?>
