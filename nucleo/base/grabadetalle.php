<?php  
   
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if ($_SESSION['inicio']==1) { 
       $miConex = new Conexion();
       $conn=$miConex->tipoConex($_POST["bd"]); 
       
       
       $campos = json_decode($_POST['campos']);
       $datos = json_decode($_POST['datos']);

       $conn->beginTransaction();
       
       if ($_POST['eliminar']=='S') {
             $sqlel='DELETE FROM '.$_POST['tabla']. " WHERE ".$_POST['campollave']."='".$_POST['valorllave']."'";
            
       	  $res=$miConex->afectaSQL_conex($conn,$_POST["bd"],$sqlel);
       	  echo $res;
       }
     
       
       $enc="INSERT INTO ".$_POST['tabla']." (";
       for ($i=0; $i<count($campos); $i++) {$enc.=$campos[$i].",";}
       $enc=substr($enc,0,strlen($enc)-1).") VALUES (";
       
       
       for ($i=0; $i<count($datos); $i++) {
       	  $linea=explode($_POST['separador'],$datos[$i]);
       	  $valores="";
       	  for ($j=0; $j<count($linea); $j++){
       	  	$valores.="'".str_replace("'","''",$linea[$j])."',";
       	  }
       	 
       	  $valores=substr($valores,0,strlen($valores)-1).")";
       	  $sql=$enc.$valores;       	 
       	  $res=$miConex->afectaSQL_conex($conn,$_POST['bd'],$sql);
       	  echo $res;
       }
       
       $conn->commit();
       $conn=null;

   } else {header("Location: index.php");}
?>
