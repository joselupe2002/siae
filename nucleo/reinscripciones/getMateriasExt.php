<?php  
  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if (($_SESSION['inicio']==1) && ($_SESSION['idsesion']==$_POST["dato"])) { 
       $miConex = new Conexion();

       $sqld="DELETE FROM dlistatem where MATRICULA='".$_POST["matricula"]."' and ADICIONAL in (10,12) ";
       $res=$miConex->afectaSQL($_SESSION["bd"],$sqld);
       $msj="";
	   if (!($res=='')) { $msj= "0: ".$res."\n";}
       else {$msj="1:Registro actualizado satisfactoriamente";}


       $sqld="DELETE FROM dlistatem where MATRICULA='".$_POST["matricula"]."' and ADICIONAL in (10,12) ";
 

       $resAntes=$miConex->getConsulta("Mysql","SELECT MATCVE FROM dlista u, cmaterias q ".       
       " where u.MATCVE=q.MATE_CLAVE and u.ALUCTR='".$_POST["matricula"]."' AND IFNULL(q.MATE_TIPO,'0') IN ('OC') order by PDOCVE LIMIT 1");
       
       $laextra="";$addsql="";
       if (count($resAntes)>0) { $laextra= $resAntes[0]["MATCVE"];
          $addsql="  and y.MATERIA IN ('".$resAntes[0]["MATCVE"]."')";
       }
       if ($_POST["usuario"]=='ADMIN') {$laextra="";$addsql=""; }
       
           
       $sql="INSERT INTO dlistatem (MATRICULA,CICLO,IDDETALLE,MATERIA, MATERIAD, ".
            "                       PROFESOR, PROFESORD, SEMESTRE, GRUPO, CUPO,".
                                 "  INS,REP,LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO, CREDITOS, CARRERA, MAPA, ADICIONAL) ".
            "SELECT '".$_POST["matricula"]."',CICLO, IDDETALLE, MATERIA, MATERIAD, ".
                    "PROFESOR, PROFESORD, SEMESTRE, SIE, CUPO,".
                    "(SELECT COUNT(*) FROM ".$_POST["tablaReg"]." u where u.IDGRUPO=IDDETALLE) as INS,". 
                    "(SELECT COUNT(*) FROM dlista u where u.PDOCVE<'".$_POST["ciclo"]."' AND ".
                                     "u.ALUCTR='".$_POST["matricula"]."' AND u.MATCVE=MATERIA and u.LISCAL<70) as REP,".
                    "LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO, CREDITOS, CARRERA,MAPA, y.CARRERA".
                    " FROM vedgrupos y where y.CICLO='".$_POST["ciclo"]."' ".
                    " and y.MATERIA IN (select VMAT_MATERIA from vmatciclo where CARRERA IN (12)".
                                        " and  VMAT_MATERIA NOT IN ".
                                        " (SELECT MATCVE from dlista h where h.ALUCTR='".$_POST["matricula"]."'".
                                        "            and (LISCAL>=70 or PDOCVE='".$_POST["ciclo"]."')) ". 
                                        ") ".$addsql;                                      

   
       $res=$miConex->afectaSQL($_SESSION["bd"],$sql);   
       $msj="";
       if (!($res=='')) {
       	    $msj= "0: ".$res."\n";
       }
       else
       {$msj="1:Registro actualizado satisfactoriamente";}
      
       		     
       echo $msj;
 } else {header("Location: index.php");}
?>
