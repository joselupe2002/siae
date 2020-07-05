<?php 
 

   session_start(); 
   if (($_SESSION['inicio']==1)  && ($_SESSION['idsesion']==$_POST["dato"])  ){ 
      include("../.././includes/Conexion.php");

       $miConex = new Conexion();
       $datos = array();
       $res=$miConex->getConsulta($_POST['bd'],$_POST['sql']);
       
       foreach ($res as $lin) {
       	 echo ("dato: ".$lin);  
          $datos[]=$lin;
       }
      
       echo json_encode($datos);

      echo "si entre ".$_SESSION['inicio']."|".$_SESSION['idsesion']."==".$_POST["dato"];

   }
   else {echo "no enre";}
   /*
      header('Content-Type: text/html; charset=UTF-8'); 
   echo "si entre ".$_SESSION['idsesion']."==".$_POST["dato"];
   

	mb_internal_encoding ('UTF-8');
	
   include("../.././includes/Conexion.php");

       $miConex = new Conexion();
       $datos = array();
       $res=$miConex->getConsulta($_POST['bd'],$_POST['sql']);
       
       foreach ($res as $lin) {
       	 echo ("dato: ".$lin);  
          $datos[]=$lin;
       }
       echo json_encode($datos);
    
    
} else {header("Location: index.php");}
*/
?>
