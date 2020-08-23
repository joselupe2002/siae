<?php  
  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if (($_SESSION['inicio']==1) && ($_SESSION['idsesion']==$_POST["dato"])) { 
       $miConex = new Conexion();

       $sql="CALL INSERTAFECHATEM('".$_POST['ciclo']."','".$_POST['grupo']."','')";
       $res=$miConex->afectaSQL($_SESSION["bd"],$sql);   
       $msj="";
       if (!($res=='')) { $msj= "0: PRIMERO ".$res."\n";}
       else {$msj="1:Registro actualizado satisfactoriamente";}

       echo $msj;
 } else {header("Location: index.php");}
?>
