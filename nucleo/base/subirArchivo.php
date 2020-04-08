<?php
session_start();
if ($_SESSION['inicio']==1) {   
	if ($_FILES[$_GET['inputFile']]["error"] > 0)
			{
				echo "0|Ocurrio un error al subir el archivo (Extensiones png, bmp, jpg, pdf menos de 1 MB)";
		}
		else
		{       /*$niv="";
			    if ($_SERVER["SERVER_NAME"] == "localhost") {$niv="../";}*/
			 
				$name = "img_";
				$name.= date("YmdHis");
				$name.= substr(md5(rand(0, PHP_INT_MAX)), 10);
				$name.=".".end(explode(".",$_FILES[$_GET['inputFile']]['name']));
				
						
				if (!(move_uploaded_file($_FILES[$_GET['inputFile']]['tmp_name'],
						"../../imagenes/".$_GET['carpeta']."/" . $name)))
				      { echo "0|el archivo no se pudo mover a: ../../imagenes/".$_GET['carpeta']."/";}	
				
				      else {echo "1|../../imagenes/".$_GET['carpeta']."/" .$name;}

				if (isset($_GET['imganterior'])) {
					if (!($_GET['imganterior']=='../../imagenes/menu/default.png')) {						
						if (file_exists ($_GET['imganterior'])) {
							unlink($_GET['imganterior']);
						}
						
					}
				}
                
			}

}// el del si hay sesion
else
{header("Location: index.php");}
	

				