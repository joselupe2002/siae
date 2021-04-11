<?php 


ini_set('soap.wsdl_cache_enabled', 0);
ini_set('soap.wsdl_cache_ttl', 900);
ini_set('default_socket_timeout', 15);

define("DEBUG", TRUE);

if(DEBUG)
{
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}
$wsdl="../../wsdl/wsdl.xml";

//Basados en la estructura del servicio armamos un array

$params = Array(
   "folioSeguimiento" => Array(
         "folioControlEstado" => $_POST["folioestado"],      
         "folioSeguimiento" => $_POST["folioSeguimiento"])
    ); 

    
    //$params = Array("folioSeguimiento" => Array("folioControlEstado" => "2021-105000", "folioSeguimiento" => "17E400951142021114825"));

    $options = array(
		'uri'=>'http://schemas.xmlsoap.org/soap/envelope/',
		'style'=>SOAP_RPC,
		'use'=>SOAP_ENCODED,
		'soap_version'=>SOAP_1_2,
		'cache_wsdl'=>WSDL_CACHE_NONE,
		'connection_timeout'=>15,
		'trace'=>true,
		'encoding'=>'UTF-8',
		'exceptions'=>true,
	);

//Enviamos el Request
$soap = new SoapClient($wsdl, $options);
$result = $soap->consultarPagoRealizado($params);

if(isset($result->return->codigo)){ echo "ERROR*".$result->return->mensaje;}
else {
      echo "EXITO*".$result->return->codigoEstatus."*".
                 $result->return->importePagado."*".
                 $result->return->mensajePago."*";

  
}


 ?>