<?php
include_once '../../includes/google-api-php-client-2.2.4/vendor/autoload.php';

putenv('GOOGLE_APPLICATION_CREDENTIALS=../../credencialesAsp.json');
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
				}catch (Google_Service_Exception $gs) {
					$m=json_decode($gs->getMessage());
					echo "0|Google_Service_Exception ".$gs->getMessage();
				}catch (Exception $e) {
					echo "0|Exception ".$e->getMessage();
				}
			

}// el del si hay sesion
else
{header("Location: index.php");}
	

				