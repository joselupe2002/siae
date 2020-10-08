<?php
include_once '../../includes/google-api-php-client-2.2.4/vendor/autoload.php';
include("../../includes/Conexion.php");

putenv('GOOGLE_APPLICATION_CREDENTIALS=../../credenciales.json');
$client = new Google_Client();
$client->useApplicationDefaultCredentials();
$client->setScopes(['https://www.googleapis.com/auth/drive.file']);

session_start();
if ($_SESSION['inicio']==1) {      
			
				
				try {
					$service = new Google_Service_Drive($client);				
					$file= new Google_Service_Drive_DriveFile();
					
					
					$result=$service->files->delete($_GET["idfile"]);
					
					echo "1|";

						//eliminamos de la tabla de rutas
						$miConex = new Conexion();
						$elsql="delete from rutas where IDDRIVE='".substr($_GET["idfile"],0,strlen($_GET["idfile"]))."'";
						$res=$miConex->afectaSQL($_SESSION['bd'],$elsql);
						

				}catch (Google_Service_Exception $gs) {
					$m=json_decode($gs->getMessage());
					echo "0|Google_Service_Exception ".$gs->getMessage();
				}catch (Exception $e) {
					echo "0|Exception ".$e->getMessage();
				}
			

}// el del si hay sesion
else
{header("Location: index.php");}
	

				