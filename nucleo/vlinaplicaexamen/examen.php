
<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	require('../../fpdf/html2fpdf.php');
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";
	
	
   class PDF extends PDF_HTML {
   	        
			function LoadAplicacion()
			{		
				$data=[];		
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vlinaplex WHERE IDAP=".$_GET["idaplica"]);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			function LoadPreguntas()
			{
				$data=[];	
				$miConex = new Conexion();				
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vlinpreguntas where IDEXAMEN=".$_GET["idexamen"]);
				foreach ($resultado as $row) {
					$data[] = $row;
				}				
				return $data;
			}
			
			
		
			function Header()
			{
				$miutil = new UtilUser();
				$miutil->getEncabezado($this,'V');			
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'V');
			}
			
		}
		

		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		$pdf->SetFont('Arial','',12);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
		$pdf->AddPage();

		$dataApli = $pdf->LoadAplicacion();
		$dataPreg = $pdf->LoadPreguntas();
		$miutil = new UtilUser();

	    $pdf->Ln(15);
		foreach($dataPreg as $rowPreg)
		{
			$reportSubtitle = stripslashes($rowPreg["PREGUNTA"]);
          

			$pdf->WriteHTML(utf8_decode($reportSubtitle));
			$pdf->Ln(15);
		}

		$pdf->Output();



		/*
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
		$pdf->AddPage();
		
	
		$dataApli = $pdf->LoadAplicacion();
		$dataPreg = $pdf->LoadPreguntas();
		$miutil = new UtilUser();
		
		$pdf->WriteHTML($_POST['text']);

		*/
		
		$pdf->Output(); 
		
		

 } else {header("Location: index.php");}
 
 ?>
