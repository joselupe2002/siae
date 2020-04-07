<?php  
   session_start();
   header('Content-Type: text/html; charset='.$_SESSION['encode']);
   if ($_SESSION['inicio']==1) { 
      
       
       if (isset($_GET['imgborrar'])) {  	
       	if (!($_GET['imgborrar']=='../../imagenes/menu/default.png')) {
       		if (file_exists ($_GET['imgborrar'])) {
       		
       			unlink($_GET['imgborrar']);
       		}
       		
       	}
       }
       
 } else {header("Location: index.php");}
?>
