<?php  

   session_start();
   include("./includes/Conexion.php");
   include("./includes/UtilUser.php");
       $miConex = new Conexion();
       $miUtil = new UtilUser(); 
       $cad="";
       $user=$_POST['usuario'];
       
       $nueva = date("Yms");
       $nueva.= substr(rand(0, PHP_INT_MAX), 10);

       $resultado=$miConex->getConsulta("Mysql","SELECT CORREO from vpersonas b where b.NUMERO='".$user."'");
       foreach ($resultado as $row) {
              $correo= $row[0];
           } 


       $res=$miConex->afectaSQL("SQLite","UPDATE CUSUARIOS SET  USUA_CLAVE='".$_POST['tag2']."' WHERE USUA_USUARIO='".$user."'"); 
       

       $host= $_SERVER["HTTP_HOST"];
       $folder="/sigea";
       if (!($host=="localhost")) {$folder="";}
       $correo=$correo;
       $cuerpo="<b>Modificaci&oacute;n de Contrase&ntilde;a: <b><br/>";
       $cuerpo.="<b>Usuario:<b>".$user."<br/>";
       $cuerpo.="<b>Contrase&ntilde;a:<b>".$_POST['tag1']."<br/>";
       $res=$miUtil->enviarCorreo($correo,"SIGEA: Recordatorio de Usuario y/o Contrase&ntilde;a",$cuerpo,"");
       echo "Se ha reiniciado tu contrase&ntilde;a, y se ha enviado a la cuenta de correo: ".$correo;
         
?>
