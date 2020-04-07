<?php header('Content-Type: text/html; charset=ISO-8859-1'); ?>
<?php session_start(); if (($_SESSION['inicio']==1)){ 
	
   include("../.././includes/Conexion.php");

       $miConex = new Conexion();
    
      $res=$miConex->getConsulta($_GET['bd'],$_GET['sql']);
      if ($_GET['tipo']=="select") {echo "<option value=\"0\">"."Elija una opci&oacute;n"."</option>";}
       foreach ($res as $lin) {
       	if ($_GET['tipo']=="select") {       		    
		       	$seleccionada="";
		       	if ($_GET['sel']==$lin[0]) {$seleccionada="selected";}
		       	    echo "<option data-content=\"<i class='".$lin[2]."'></i>".$lin[1]."\" value=\"".$lin[0]."\"".$seleccionada."></option>";
		       }
       if ($_GET['tipo']=="tree") {  	
       	    echo "<li style=\"list-style:none; cursor:pointer;\" >".
         	             "<i onclick= \"elegirima('".$lin[0]."');\" class='".$lin[2]." blue fa-2x'></i>".
       	                 "<span onclick= \"elegirima('".$lin[2]."');\" style=\"font-size:14px; margin-left:10px;\" class=\"text-info\"><strong>".$lin[1]."</strong></span>".
       	           "</li>";
       }
      
   }



} else {header("Location: index.php");}
?>
