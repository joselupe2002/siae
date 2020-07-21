

<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	require('../../fpdf/fpdf.php');
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";
	
	class PDF extends FPDF {
   	        var $eljefe="";
   	        var $eljefepsto="";
 
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vss_alumnos where ID=".$_GET["id"]);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			function LoadDatosGen()
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("SQLite","SELECT * from INSTITUCIONES where _INSTITUCION='".$_SESSION['INSTITUCION']."'");
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
	
		

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(30, 62 , 30);
		$pdf->SetAutoPageBreak(true,30); 
		$pdf->AddPage();
		
	
		 
		$data = $pdf->LoadData();
		$miutil = new UtilUser();
		$fechadec=$miutil->formatFecha($data[0]["INICIO"]);
		$fechaini=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
		$fechadec=$miutil->formatFecha($data[0]["TERMINO"]);
		$fechafin=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
				
		$dataGen = $pdf->LoadDatosGen();

		//$dataof=$miutil->verificaOficio("521","COMISION",$_GET["id"]);		
		//$fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
		//$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
		
		
		$ss=$miutil->getJefe('521'); //empleado servicio social y residencia
		$elpsto=$miUtil->getDatoEmpl($miutil->getJefeNum('521'),"EMPL_FIRMAOF");
		$pdf->eljefe=$ss;
		$pdf->eljefepsto=$elpsto;


		$dir=$miutil->getJefe('101'); //Director General
		
		
		$pdf->SetFont('Arial','',12);
		$pdf->Cell(0,5,utf8_decode("A QUIEN CORRESPONDA"),0,1,'L');
		$pdf->setY(72);
		$pdf->Cell(0,5,utf8_decode("Por medio de la presente se hace constar que:"),0,1,'L');
		$pdf->setY(92);

		$pdf->SetFont('Arial','',12);
		$elperiodo='del '.$fechaini.' al '.$fechafin;
		$pdf->MultiCell(0,5,utf8_decode('Según documentos que obran en los archivos de esta Institución, el (la) C. ').utf8_decode($data[0]["NOMBRE"]).
		' con matricula No. '.utf8_decode($data[0]["MATRICULA"]).utf8_decode(', de la carrera de ').utf8_decode($data[0]["CARRERAD"]).
		utf8_decode(' realizó su servicio social en ').utf8_decode($data[0]["EMPRESAD"]).
		utf8_decode(' obteniendo una calificacion final de ').utf8_decode($data[0]["CALIFICACION"]).
		utf8_decode(', cumpliendo satisfactoriamente con los requisitos que se establecen de acuerdo a lo establecido en el artículo 55 '.
					'de la Ley Reglamentaria del artículo 5o Constitucional, relativo al ejercicio de las Profesiones '.
					' y los reglamentos que rigen al Instituto. '),0,'J', false);
		$pdf->Ln(10);

		$fechadecof=strtotime($miutil->formatFecha($data[0]["FECHAOF"]));
		$fechaof=$miutil->aletras(date("d",$fechadecof))." días del mes  de ".$miutil->getMesLetra(date("m",$fechadecof))." de ". $miutil->aletras(date("Y",$fechadecof));
        $pdf->Ln(5);
   

        $pdf->MultiCell(0,5,utf8_decode("Se extiende la presente para los fines legales que al interesado convengan en la ciudad de Macuspana, Tabasco, a los ".
		strtolower($fechaof)).".",0,'J',FALSE);
		
		$pdf->setY(180);
		$pdf->Cell(0,5,utf8_decode("Atentamente:"),0,1,'C');
		$pdf->SetFont('Arial','B',12);
		$pdf->setY(210);
		$pdf->Cell(0,5,utf8_decode($dir),0,1,'C');
		$pdf->setY(217);
		$pdf->Cell(0,5,"Director General",0,1,'C');

		$pdf->SetFont('Arial','',7);
		$pdf->setY(233);
		$pdf->Cell(0,5,"C.c.p. Servicios Escolares.- Expediente del alumno",0,1,'L');
		$pdf->setY(236);
		$pdf->Cell(0,5,"C.c.p. Archivo",0,1,'L');
		$pdf->setY(238);$pdf->setX(155);
		$pdf->Cell(0,5,"LIC'GHA",0,1,'L');
		

		$pdf->Output(); 
	
	
 } else {header("Location: index.php");}
 
 ?>
