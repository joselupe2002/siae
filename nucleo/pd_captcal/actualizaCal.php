<?php  
  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if ($_SESSION['inicio']==1) { 
       $miConex = new Conexion();
       
       if ($_GET["tipo"]=='CAL') {$campo="LISPA";}
       if ($_GET["tipo"]=='FALTA') {$campo="LISFA";}
       $res=$miConex->afectaSQL($_SESSION["bd"],"UPDATE dlista SET ".$campo.$_GET["numeroUni"]."=".$_GET["c"].", TCACVE='".$_GET["tipocal"]."' WHERE ID='".$_GET["valorllave"]."'");   
       $msj="";
       if (!($res=='')) {
       	    $msj= "0: ".$res."\n";
       }
       else
       {$msj="1:Registro actualizado satisfactoriamente";}
       
       if ($_GET["tipo"]=='CAL') {
       $res=$miConex->afectaSQL($_SESSION["bd"],"INSERT INTO wa_bitacora (usuario,ciclo,materia,grupo,profesor".
                                                ",unidad,matricula,calificacion, ruser, rhost,_INSTITUCION,_CAMPUS,fecha_reg) values (".
       		"'".$_SESSION["usuario"]."',".
       		"'".$_GET["ciclo"]."',".
       		"'".$_GET["materia"]."',".
       		"'".$_GET["grupo"]."',".
       		"'".$_GET["profesor"]."',".
       		"'".$_GET["numeroUni"]."',".
            "'".$_GET["matricula"]."',".
            "'".$_GET["c"]."',".
            "'".$_GET["idcorte"]."',".
            "'".$_GET["tipocorte"]."',".
            "'".$_SESSION["INSTITUCION"]."',".
            "'".$_SESSION["CAMPUS"]."',".
            "now())");

	       $msj="";
	       if (!($res=='')) { $msj= "0: ".$res."\n";}
	       else {$msj="1:Registro actualizado satisfactoriamente";}
       }
       		     
       echo $msj;
 } else {header("Location: index.php");}
?>
