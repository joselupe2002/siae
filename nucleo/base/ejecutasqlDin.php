<?php  
   
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if (($_SESSION['inicio']==1)  && ($_SESSION['idsesion']==$_POST["dato"])) { 
        $miSeg = new Conexion();
        $error="";
        $conn=$miSeg->tipoConex($_POST["bd"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try
        {   
            $stm = $conn->prepare(str_replace("<*>","&",$_POST["sql"]));
            $stm->execute();			
            $stm= null;
            $conn = null;
        }
        catch ( PDOException $e )
        { $error="Error: ".$e->getMessage( )/*." SQL: ".$elSQL*/;}
        echo $error;
  } else {header("Location: index.php");}
?>
