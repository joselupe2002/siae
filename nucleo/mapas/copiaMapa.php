<?php  
  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if ($_SESSION['inicio']==1) { 

       $miConex = new Conexion();
       $bd=$_GET["bd"];
       $conn=$miConex->tipoConex($bd); 
       $conn->beginTransaction();
    
       $res=$miConex->afectaSQL_conex($conn,$bd,"INSERT mapas(MAPA_CLAVE,MAPA_DESCRIP,MAPA_CARRERA,MAPA_CAMPUS,MAPA_USER,MAPA_FECHAELA,MAPA_ACTIVO,
       	  	                                      MAPA_OBS,MAPA_CALMIN,MAPA_PERIODO,MAPA_MATXCIC,MAPA_CREXCIC,MAPA_MATREP,MAPA_NMATCUA,
                                                  MAPA_NBAJASXMAT,MAPA_NBAJASTEM,_INSTITUCION,_CAMPUS) 
                                           SELECT '".$_GET["copia"]."',MAPA_DESCRIP,MAPA_CARRERA,MAPA_CAMPUS,MAPA_USER,MAPA_FECHAELA,MAPA_ACTIVO,
                                                  MAPA_OBS,MAPA_CALMIN,MAPA_PERIODO,MAPA_MATXCIC,MAPA_CREXCIC,MAPA_MATREP,MAPA_NMATCUA,
                                                  MAPA_NBAJASXMAT,MAPA_NBAJASTEM,_INSTITUCION,_CAMPUS FROM mapas where MAPA_CLAVE='".$_GET["origen"]."'");   
       echo $res;
       
       $res=$miConex->afectaSQL_conex($conn,$bd," INSERT INTO ciclosfor (CICL_CLAVE,CICL_DESCRIP,CICL_CREDITOSMAX,CICL_CREDITOSMIN,CICL_ACTIVO,
                                                             CICL_NUMCUA,CICL_UNIDAD,CICL_DE,CICL_A,CICL_USER,CICL_SEP,CICL_MAPA,
                                                             CICL_ETIQUETA,_INSTITUCION,_CAMPUS) 
                                                    SELECT   CONCAT(SUBSTRING(CICL_CLAVE,1,instr(CICL_CLAVE,'_')),'".$_GET["copia"]."'),CICL_DESCRIP,CICL_CREDITOSMAX,CICL_CREDITOSMIN,CICL_ACTIVO,
                                                             CICL_NUMCUA,CICL_UNIDAD,CICL_DE,CICL_A,CICL_USER,CICL_SEP,'".$_GET["copia"]."',
                                                             CICL_ETIQUETA,_INSTITUCION,_CAMPUS
                                                    FROM ciclosfor WHERE cicl_mapa='".$_GET["origen"]."'");
       echo $res;
       
       $res=$miConex->afectaSQL_conex($conn,$bd,"INSERT INTO eciclmate(CICL_CICLO,CICL_MATERIA,CICL_CREDITO,CICL_CUATRIMESTRE,
       		                                               CICL_HT,CICL_HP,CICL_TIPOMAT,CICL_CLAVEMAPA,CICL_ACTIVA,
       		                                               CICL_MAPA,_INSTITUCION,_CAMPUS)
       		                                        SELECT CONCAT(SUBSTRING(CICL_CICLO,1,instr(CICL_CICLO,'_')),'".$_GET["copia"]."'),CICL_MATERIA,CICL_CREDITO,CICL_CUATRIMESTRE,
       		                                               CICL_HT,CICL_HP,CICL_TIPOMAT,CICL_CLAVEMAPA,CICL_ACTIVA,
       		                                               '".$_GET["copia"]."',_INSTITUCION,_CAMPUS 
                                                    FROM eciclmate WHERE CICL_MAPA='".$_GET["origen"]."'");
       echo $res;

       $conn->commit();
       $conn=null;
       
 } else {header("Location: index.php");}
?>
