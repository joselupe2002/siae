<?php  
  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if (($_SESSION['inicio']==1) && ($_SESSION['idsesion']==$_POST["dato"])) { 
       $miConex = new Conexion();

       $sql="UPDATE inscritos set BAJA='S' where getPeriodos(MATRICULA,getciclo())>=13 AND EGRESADO='N';";
       $res=$miConex->afectaSQL($_SESSION["bd"],$sql);   
       $msj="";
       if (!($res=='')) { $msj= "0: PRIMERO ".$res."\n";}
       else {$msj="1:Registro actualizado satisfactoriamente";}

       $sql="UPDATE inscritos set BAJA='S' where MATRICULA IN (".
        "SELECT MATRICULA FROM (".
        "                 SELECT MATRICULA,MATCVE,COUNT(*) AS N  FROM inscritos,dlista where ALUCTR=MATRICULA ".
        "                  AND  LISCAL<70".
        "                  GROUP BY MATRICULA,MATCVE) a ".
        " where N>=3 AND MATCVE NOT IN ( select MATCVE  from dlista WHERE ALUCTR=matricula AND LISCAL>=70)".
        " AND CONCAT(MATRICULA,MATCVE) NOT IN (SELECT concat(h.MATRICULA,h.MATERIA) FROM econvenios h where h.CICLO=getciclo()))";


       $res=$miConex->afectaSQL($_SESSION["bd"],$sql);   
       $msj="";
       if (!($res=='')) { $msj= "0: SEGUNDO ".$res."\n";}
       else {$msj="1:Registro actualizado satisfactoriamente";}          

       echo $msj;
 } else {header("Location: index.php");}
?>
