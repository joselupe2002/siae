<?php  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   include("../.././includes/Conexion.php");
   if ($_SESSION['inicio']==1) { 
       $miConex = new Conexion();
       $ins="";
       $val="";
       $nombreTabla="";
       $campoLLave="";
       $valorLLave="";
       foreach($_POST as $nombre_campo => $valor){
       	
       	if ($nombre_campo=='tabla') {$nombreTabla=$valor;}
       	elseif ($nombre_campo=='campollave') {$campoLLave=$valor;}
       	elseif ($nombre_campo=='valorllave') {$valorLLave=$valor;}
       	elseif ($nombre_campo=='bd') {$bd=$valor;}
       	else 
       		{
       			$ins.=$nombre_campo."='".utf8_decode($valor)."',";
       	}       	
       }
       $ins=substr($ins,0,strlen($ins)-1);    
             
       $res=$miConex->afectaSQL($bd,"DELETE FROM ".$nombreTabla." WHERE ".$campoLLave."='".$valorLLave."'");       
       $msj="";
       if (!($res=='')) {
       	   $msj= "0: ".$res."\n";
       }
       else
       {$msj="1:Registro eliminado satisfactoriamente";}
       

       if (isset($_POST['imgborrar'])) {  	
       	if (!($_POST['imgborrar']=='imagenes/logos/default.png')) {
       		if (file_exists ($_POST['imgborrar'])) {
       			unlink($_POST['imgborrar']);
       		}
       		
       	}
       }
       
       
       
       echo $msj;
 } else {header("Location: index.php");}
?>
