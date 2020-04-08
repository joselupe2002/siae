<?php  
   
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if ($_SESSION['inicio']==1) { 
       $miConex = new Conexion();
       $ins="";
       $val="";
       $nombreTabla="";
       foreach($_POST as $nombre_campo => $valor){
       	
       	if ($nombre_campo=='tabla') {$nombreTabla=$valor;}
       	elseif ($nombre_campo=='bd') {$bd=$valor;}
       	else
       	{
       		$ins.=$nombre_campo.",";
       		$val.="'".$valor."',";
       	}       	
       }
       $ins=substr($ins,0,strlen($ins)-1);
       $val=substr($val,0,strlen($val)-1);
       
       
       $res=$miConex->afectaSQL($bd,"INSERT INTO ".$nombreTabla." (".$ins.") VALUES (".$val.")");
       $msj="";
       if (!($res=='')) {
       	   $msj= "0: ".$res."\n";
       }
       else
       {$msj="1:Registro insertado satisfactoriamente";}
     
       echo $msj;
   } else {header("Location: index.php");}
?>
