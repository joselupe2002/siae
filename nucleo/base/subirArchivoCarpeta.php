<?php
session_start();
if ($_SESSION['inicio']==1) {   
	if ($_FILES[$_GET['inputFile']]["error"] > 0)
			{
				echo "0|Ocurrio un error al subir el archivo (Extensiones png, bmp, jpg, pdf menos de 1 MB)";
		}
		else
		{      
                
                $name=$_FILES[$_GET['inputFile']]['name'];
                if (strlen($name)>40) {$name=substr($name,(strlen($name)-39),strlen($name));}
					
				if (!(move_uploaded_file($_FILES[$_GET['inputFile']]['tmp_name'],
						$_GET['carpeta']. $name)))
				      { echo "0|el archivo no se pudo mover a:".$_GET['carpeta'];}	
				
				      else {echo "1|".$name;}

				if (($_GET['imganterior'])!="") {	      				
						if (file_exists ($_GET['carpeta'].$_GET['imganterior'])) {
							unlink($_GET['carpeta'].$_GET['imganterior']);
						}						
				}
                
			}

}// el del si hay sesion
else
{header("Location: index.php");}
	

				