<?php header('Content-Type: text/html; charset=ISO-8859-1'); ?>
<?php session_start(); if (($_SESSION['inicio']==1)  && ($_SESSION['idsesion']==$_POST["dato"]) ){ 
	
   include("../.././includes/Conexion.php");
     
      $miConex = new Conexion();
      $arraydato=explode(",",$_POST['sel']);
      
      //echo $_POST['sql'];
      $res=$miConex->getConsulta($_POST['bd'],$_POST['sql']);
      $msj="Elija una opci&oacute;n";
      if (isset($_POST['msj'])) {$msj=$_POST['msj'];}
      echo "<option value=\"\">".$msj."</option>";
       foreach ($res as $lin) {
       	$seleccionada="";
       	if (in_array($lin[0],$arraydato)) {$seleccionada="selected";}
       	echo "<option value=\"".$lin[0]."\"".$seleccionada.">".$lin[1]."</option>";
       }     

} else {header("Location: index.php");}
?>
