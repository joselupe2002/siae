<?php  
  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if (($_SESSION['inicio']==1) && ($_SESSION['idsesion']==$_POST["dato"])) { 
       $miConex = new Conexion();

       $sqld="DELETE FROM inscritos";
       $res=$miConex->afectaSQL($_SESSION["bd"],$sqld);
       $msj="";
	   if (!($res=='')) { $msj= "0: ".$res."\n";}
       else {$msj="1:Registro actualizado satisfactoriamente";}
           
       $sql="SET sql_mode = ''; insert into inscritos select distinct(ALUCTR),'N', 'N' from dlista where PDOCVE='".$_POST['ciclo']."';";
      // $sql="SET sql_mode = ''; insert into inscritos select distinct(ALUCTR),'N','N' from dlista where PDOCVE='".$_POST['ciclo']."' and ALUCTR IN ('14E40010','14E40209');";
       
       $res=$miConex->afectaSQL($_SESSION["bd"],$sql);   
       $msj="";
       if (!($res=='')) {
       	    $msj= "0: PRIMERO ".$res."\n";
       }
       else
       {$msj="1:Registro actualizado satisfactoriamente";}
       

       $sql="UPDATE inscritos set EGRESADO='S' where getAvanceCred(MATRICULA,'".$_POST['ciclo']."')>=100";
       $res=$miConex->afectaSQL($_SESSION["bd"],$sql);   
       $msj="";
       if (!($res=='')) { $msj= "0: SEGUNDO:".$res."\n";}
       else {$msj="1:Registro actualizado satisfactoriamente";}
                

       echo $msj;
 } else {header("Location: index.php");}
?>
