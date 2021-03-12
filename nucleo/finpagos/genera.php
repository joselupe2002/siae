<?php 

include("../../includes/Conexion.php");

$options=array('trace'=>true, 
               'soap_version' => SOAP_1_2,
               'stream_context'=>stream_context_create( ['http' => ['timeout'=>1] ] )
            );
$client = new SoapClient("http://tservicios.spf.tabasco.gob.mx:8082/RE_ServiciosInternetExternos/SIExternosWSPort?wsdl",$options);

$idTramite=$_GET["idTramite"];
$nombre=$_GET["nombre"];
$apaterno=$_GET["apaterno"];
$amaterno=$_GET["amaterno"];
$curp=$_GET["curp"];

$factura   = "?idTramite=".$idTramite."&nombre=".$nombre."&apaterno=".$apaterno."&amaterno=".$amaterno."&curp=".$curp;            	
$resultado = $client->Consulta(['generaFormatoPagoReferenciado'=>$factura]);
echo $resultado->ConsultaResult->folioSeguimiento;
 ?>