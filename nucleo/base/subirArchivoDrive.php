<?php
include_once '../../includes/google-api-php-client-2.2.4/vendor/autoload.php';

putenv('GOOGLE_APPLICATION_CREDENTIALS=../../credenciales.json');
$client = new Google_Client();
$client->useApplicationDefaultCredentials();
$client->setScopes(['https://www.googleapis.com/auth/drive.file']);

session_start();
if ($_SESSION['inicio']==1) {   
	if (($_FILES[$_GET['inputFile']]["error"] > 0)||($_FILES[$_GET['inputFile']]['size'] >40000000))
			{
				echo "0|"."Extension no permitida o Archivo demasiado grande (".$_FILES[$_GET['inputFile']]['size']." ".$_FILES[$_GET['inputFile']]['error'].")";
		}
		else
		{     
			    $name = "F_".pathinfo($_FILES[$_GET['inputFile']]['name'],PATHINFO_FILENAME);
				$name.= "_".date("YmdHis");
				$name.= substr(md5(rand(0, PHP_INT_MAX)), 10);
				$laext=explode(".",$_FILES[$_GET['inputFile']]['name']);
				$name.=".".end($laext);

				if (isset($_GET['nombre'])) { $name= $_GET['nombre'].".".end($laext);}
				
				try {
					$service = new Google_Service_Drive($client);
					$file_path=$_FILES[$_GET['inputFile']]['tmp_name'] ;
					$file= new Google_Service_Drive_DriveFile();
					
					
					$file->setName($name);
					$file->setParents(array($_GET['carpeta']));
					$file->setDescription("Archivo subido desde SIGEA");
					
					//$file->setMimeType('image/png');
					$result= $service->files->create(
							$file,
							array (
									'data'=>file_get_contents($file_path),
									'uploadType'=>'media',
							));
					
					$modo="export=download";
					if (isset($_GET['imganterior'])) {$modo="";}
					echo "1|https://drive.google.com//uc?id=".$result->id."&".$modo;
				}catch (Google_Service_Exception $gs) {
					$m=json_decode($gs->getMessage());
					echo "0|Google_Service_Exception ".$gs->getMessage();
				}catch (Exception $e) {
					echo "0|Exception ".$e->getMessage();
				}
			
                
			}

}// el del si hay sesion
else
{header("Location: index.php");}
	

				