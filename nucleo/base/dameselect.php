<?php header('Content-Type: text/html; charset=ISO-8859-1'); ?>
<?php session_start(); if (($_SESSION['inicio']==1)){ 
	
   include("../.././includes/Conexion.php");

   
     $miConex = new Conexion();
      $arraydato=explode(",",$_GET['sel']);
      
      $res=$miConex->getConsulta($_GET['bd'],$_GET['sql']);
      $msj="Elija una opci&oacute;n";
      if (isset($_GET['msj'])) {$msj=$_GET['msj'];}
      echo "<option value=\"\">".$msj."</option>";
       foreach ($res as $lin) {
       	$seleccionada="";
       	if (in_array($lin[0],$arraydato)) {$seleccionada="selected";}
       	echo "<option value=\"".$lin[0]."\"".$seleccionada.">".$lin[1]."</option>";
       }
     

} else {header("Location: index.php");}
?>
