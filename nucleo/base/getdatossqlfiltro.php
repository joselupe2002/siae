<?php 
    session_start(); if (($_SESSION['inicio']==1)  && ($_SESSION['idsesion']==$_POST["dato"]) ){ 
    header('Content-Type: text/html; charset=ISO-8859-1'); 
	
	mb_internal_encoding ('ISO-8859-1');
	
   include("../.././includes/Conexion.php");
   include("../.././includes/UtilUser.php");

       $miConex = new Conexion();
       $miUtil= new UtilUser();
       $datos = array();
   
       
       $sql=$miUtil->getConsultaFiltro($_SESSION['usuario'],$_SESSION['super'],$_POST['modulo'],$_POST["bd"]); 
       

       if (isset($_POST['loscamposf'])) {
       	$sql=$miUtil->getSQLfiltro($sql,$_POST['loscamposf'],$_POST['losdatosf'],$_POST['limitar']);       
       }
   
    
       //echo $sql;
       $res=$miConex->getConsulta($_POST["bd"],$sql);
       
       foreach ($res as $lin) {       	  
          $datos[]=$lin;          
       }
      // echo $sql;

       echo json_encode($datos);
} else {header("Location: index.php");}
?>
