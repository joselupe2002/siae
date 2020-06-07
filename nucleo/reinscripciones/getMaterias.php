<?php  
  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if (($_SESSION['inicio']==1) && ($_SESSION['idsesion']==$_POST[["dato"])) { 
       $miConex = new Conexion();

       $sqld="DELETE FROM dlistatem where MATRICULA='".$_POST["matricula"]."'";
       $res=$miConex->afectaSQL($_SESSION["bd"],$sqld);
       $msj="";
	   if (!($res=='')) { $msj= "0: ".$res."\n";}
       else {$msj="1:Registro actualizado satisfactoriamente";}
           
       $sql="INSERT INTO dlistatem (MATRICULA,CICLO,IDDETALLE,MATERIA, MATERIAD, ".
            "                       PROFESOR, PROFESORD, SEMESTRE, GRUPO, CUPO,".
                                 "  INS,REP,LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO, CREDITOS, CARRERA, MAPA) ".
            "SELECT '".$_POST["matricula"]."',CICLO, IDDETALLE, MATERIA, MATERIAD, ".
                    "PROFESOR, PROFESORD, SEMESTRE, SIE, CUPO,".
                    "(SELECT COUNT(*) FROM dlista u where u.IDGRUPO=IDDETALLE) as INS,". 
                    "(SELECT COUNT(*) FROM dlista u where u.PDOCVE<'".$_POST["ciclo"]."' AND ".
                                     "u.ALUCTR='".$_POST["matricula"]."' AND u.MATCVE=MATERIA and u.LISCAL<70) as REP,".
                    "LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO, CREDITOS, CARRERA,MAPA ".
                    " FROM vedgrupos y where y.CICLO='".$_POST["ciclo"]."' ".
                    " and y.MATERIA IN (".
                                        "select VMAT_MATERIA from vmatciclo where ".
                                        " VMAT_MAPA='".$_POST["vmapa"]."' and  ".
                                        " VMAT_MATERIA IN ( select VMAT_MATERIA  from vmatciclo p where ".
                                        "                   p.VMAT_MAPA='".$_POST["vmapa"]."'   ".                              
                                        "                   and VMAT_TIPOMAT NOT IN ('T') ".
                                        "                   and ifnull(p.CVEESP,'0')='0'".
                                        "                   and VMAT_MATERIA NOT IN (SELECT MATCVE from dlista h where h.ALUCTR='".$_POST["matricula"]."'".
                                        "                                            and (LISCAL>=70 or PDOCVE='".$_POST["ciclo"]."'))".
                                        "                   UNION ".
                                                        "   select p.VMAT_MATERIA from vmatciclo p where ".
                                                        "   p.VMAT_MAPA='".$_POST["vmapa"]."'  ".
                                                        "   and VMAT_TIPOMAT NOT IN ('T') ".
                                                        "   AND ifnull(p.CVEESP,'0')='".$_POST["vesp"]."'".
                                                        "    and VMAT_MATERIA NOT IN (SELECT MATCVE from dlista h where h.ALUCTR='".$_POST["matricula"]."'".
                                                            "                         and (LISCAL>=70 or PDOCVE='".$_POST["ciclo"]."'))   ".     
                                                   "    )".
                                        "   )";

     
       $res=$miConex->afectaSQL($_SESSION["bd"],$sql);   
       $msj="";
       if (!($res=='')) {
       	    $msj= "0: ".$res."\n";
       }
       else
       {$msj="1:Registro actualizado satisfactoriamente";}
       
       $sql2="call dameMaterias('".$_POST["ciclo"]."','".$_POST["matricula"]."','".$_POST["vmapa"]."','".$_POST["vesp"]."')";
       $res=$miConex->afectaSQL($_SESSION["bd"],$sql2);

	       $msj="";
	       if (!($res=='')) { $msj= "0: ".$res."\n";}
	       else {$msj="1:Registro actualizado satisfactoriamente";}
       		     
       echo $msj;
 } else {header("Location: index.php");}
?>
