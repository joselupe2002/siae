<?php

session_start(); if (($_SESSION['inicio']==1)) {





require_once '../../PHPExcel/Classes/PHPExcel.php';
require_once '../../PHPExcel/Classes/PHPExcel/IOFactory.php';
require_once '../../PHPExcel/Classes/PHPExcel/Reader/Excel2007.php';
include("../.././includes/Conexion.php");
$miConex = new Conexion();


$inputFileName='listab.xls';
$sheetnames='VALO';
echo "<br/>OK 1-A";
/**  GESTION DU FICHIER EXCEL  **/
/**  Identify the type of $inputFileName  **/
$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
echo '<br/>File ',pathinfo($inputFileName,PATHINFO_BASENAME),' has been identified as an ',$inputFileType,' file<br />';
echo "OK 1-B<br/>";
/**  Create a new Reader of the type that has been identified  **/
echo 'Loading file ',pathinfo($inputFileName,PATHINFO_BASENAME),' using IOFactory with the identified reader type<br />';
$objReader = PHPExcel_IOFactory::createReader($inputFileType);
echo "OK 1-C<br/>";
/**  Advise the Reader that we only want to load cell data  **/
echo 'Turning Formatting off for Load<br />';
$objReader->setReadDataOnly(true);
echo "OK 1-D<br/>";
/**  Advise the Reader of which WorkSheets we want to load  **/ 
echo 'Loading Sheet "',$sheetnames,'" only<br />';
$objReader->setLoadSheetsOnly($sheetnames); 
echo "OK 1-E<br/>";
/**  Load $inputFileName to a PHPExcel Object  **/
$objPHPExcel = $objReader->load($inputFileName);
echo "OK 1-F<br/>";
/**  Selection de la feuille EXCEL  **/
$sheetData = $objPHPExcel->getSheetByName($sheetnames);
echo "OK 1-G";

/*
$objPHPExcel = new PHPExcel();

  //initialize cache, so the phpExcel will not throw memory overflow
  $cacheMethod = PHPExcel_CachedObjectStorageFactory::cache_to_phpTemp;
  $cacheSettings = array(' memoryCacheSize ' => '8MB');
  PHPExcel_Settings::setCacheStorageMethod($cacheMethod, $cacheSettings);

$objReader = PHPExcel_IOFactory::createReader('Excel2007');
$objPHPExcel = $objReader->load("lista.xlsx");
$objPHPExcel->setActiveSheetIndex(0);



$resultado=$miConex->getConsulta($_SESSION["bd"],"select MATE_DESCRIP from cmaterias s where MATE_CLAVE='".$_GET['materia']."'");
foreach ($resultado as $row) {
	$descMat=$row[0];
}


$resultado2=$miConex->getConsulta($_SESSION["bd"],"select DGRU_CICLO from edgrupos s where s.DGRU_ID='".$_GET['grupo']."'");
foreach ($resultado2 as $row) {
	$elCiclo=$row[0];
}



$resultado2=$miConex->getConsulta($_SESSION["bd"],"select concat(EMPL_NOMBRE,' ', EMPL_APEPAT,' ', EMPL_APEMAT)  from pempleados s where s.EMPL_NUMERO='".$_GET['profesor']."'");
foreach ($resultado2 as $row) {
	$elProfe=$row[0];
}



$objPHPExcel->getActiveSheet()->SetCellValue('D5',utf8_encode($_GET['materia']."-".$descMat));
$objPHPExcel->getActiveSheet()->SetCellValue('D6', utf8_encode($_GET['profesor']."-".$elProfe));
$objPHPExcel->getActiveSheet()->SetCellValue('D7', $_GET['letra']);

$letras = array("D", "E", "F", "G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
		"AA","AB","AC","AD", "AE", "AF", "AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ",
		"BA","BB","BC","BD", "BE", "BF", "BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ",
		"CA","CB","CC","CD", "CE", "CF", "CG","CH","CI","CJ","CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT","CU","CV","CW","CX","CY","CZ",
		"DA","DB","DC","DD", "DE", "DF", "DG","DH","DI","DJ","DK","DL","DM","DN","DO","DP","DQ","DR","DS","DT","DU","DV","DW","DX","DY","DZ",
);


$res=$miConex->afectaSQL($_SESSION["bd"],"CALL INSERTAFECHATEM('".$elCiclo."','".$_GET['grupo']."','".$_GET['materia']."')");
if (!($res=='')) {echo "error de procedimiento 0: ".$res."\n";}


$resultado2=$miConex->getConsulta($_SESSION["bd"],"SELECT FECT_FECHA FROM efectem WHERE FECT_GRUPO='".$_GET['grupo'].
		"' AND FECT_MATERIA='".$_GET['materia']."' ORDER BY STR_TO_DATE(FECT_FECHA,'%d/%m/%Y')");
$cont=0;
foreach ($resultado2 as $row) {
	$objPHPExcel->getActiveSheet()->SetCellValue($letras[$cont].'8', $row[0]);
	$cont++;
}


$resultado2=$miConex->getConsulta($_SESSION["bd"],"SELECT a.`ALUCTR`, concat(b.`ALUM_APEPAT`,' ',b.`ALUM_APEMAT`,' ', b.`ALUM_NOMBRE`)".
                                                  " from dlista a, falumnos b where a.`MATCVE`='".$_GET['materia'].
		                                          "' and a.`PDOCVE`='".$elCiclo."' and a.`GPOCVE`='".$_GET['letra'].
		                                          "' and a.`ALUCTR`=b.`ALUM_MATRICULA` ".
		                                          " ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE");

$cont=9;
foreach ($resultado2 as $row) {
	$objPHPExcel->getActiveSheet()->SetCellValue('B'.$cont, $row[0]);
	$objPHPExcel->getActiveSheet()->SetCellValue('C'.$cont, utf8_encode($row[1]));
	$cont++;
}




header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="'.$_GET['grupo'].'-'.$_GET['materia'].'.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');

*/

} else {header("Location: index.php");}



