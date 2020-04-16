
<?php session_start(); 
	header('Content-Type: text/html; charset=ISO-8859-1');
	require('../../fpdf/fpdf.php');
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";
	

	
	
	class PDF extends FPDF {
   	
   	        var $eljefe="";
   	        var $elid="";
   	        var $eljefepsto="";
 
   	
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("Mysql","SELECT * from veventos_ins where ID=".$this->elid);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			function LoadDatosGen()
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("SQLite","SELECT * from INSTITUCIONES where _INSTITUCION='ITSM'");
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
		}
		
		$pdf = new PDF('L','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
		$pdf->AddPage();

		$partes = explode("_", $_GET["ID"]);
		$laclave=$partes[0]; 
		$pdf->elid= $partes[1]; 
		$data = $pdf->LoadData();
		
		$pdf->Image("constancia".$laclave."/banner.png",0,0,280);
		$pdf->Image("constancia".$laclave."/logos.png",10,195,120);
		$pdf->Image("constancia".$laclave."/sello.png",220,150,40);
		$pdf->Image("constancia".$laclave."/firma.png",35,150,60);
		
		
		 $pdf->Image('https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://escolar.webcoretic.com'.
				'/nucleo/eventos_ins/constancia2FM.php?ID='.$laclave.'_'.$pdf->elid.'&.png',170,150,40);
		 
		
		//$pdf->Image('https://chart.googleapis.com/chart?&choe=ISO-8859-1&chs=150x150&cht=qr&chl=EL NOMBRE&.png',170,150,40);
		

		
		$pdf->AddFont('Montserrat-Black','B','Montserrat-Black.php');
		$pdf->AddFont('Montserrat-Black','U','Montserrat-Black.php');
		$pdf->AddFont('Montserrat-Black','','Montserrat-Black.php');
		$pdf->AddFont('Montserrat-Medium','B','Montserrat-Medium.php');
		$pdf->AddFont('Montserrat-Medium','','Montserrat-Medium.php');
		$pdf->AddFont('Montserrat-SemiBold','','Montserrat-SemiBold.php');
		$pdf->AddFont('Montserrat-SemiBold','B','Montserrat-SemiBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','B','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','U','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','I','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraLight','I','Montserrat-ExtraLight.php');
		$pdf->AddFont('Montserrat-ExtraLight','','Montserrat-ExtraLight.php');
		
		
		
		$pdf->SetFont('Montserrat-ExtraBold','B',24);
		$pdf->SetTextColor(177,125,4);
		$pdf->setY(50);
		$pdf->Cell(0,0,utf8_decode("El Instituto Tecnológico Superior de Macuspana"),0,1,'C');
		$pdf->SetTextColor(5,27,149);
		$pdf->setY(60);
		$pdf->Cell(0,0,"Otorga la Presente:",0,1,'C');
		$pdf->SetTextColor(177,125,4);
		$pdf->setY(80);
		$pdf->SetFont('Montserrat-ExtraBold','B',48);
		$pdf->Cell(0,0,"CONSTANCIA",0,1,'C');
		$pdf->setY(100);	
		
		$pdf->SetTextColor(0,0,0);
		$pdf->SetFont('Montserrat-ExtraBold','B',28);
		$pdf->Cell(0,0,"Al: ",0,0,'L');
		$pdf->setX(50);
		$pdf->SetFont('Montserrat-ExtraBold','U',28);
		$pdf->Cell(0,1,utf8_decode($data[0]["GRADO"]." ".$data[0]["NOMBRE"]),0,1,'L');
		
		$pdf->SetTextColor(5,27,149);
		$pdf->setY(110);
		$pdf->setX(50);
		$pdf->SetFont('Montserrat-ExtraLight','',20);
		$pdf->MultiCell(200,8,utf8_decode($data[0]["LEYENDA"]),0,'J', false);
		
		$pdf->SetFont('Montserrat-ExtraBold','B',13);
		$pdf->SetTextColor(177,125,4);

		$pdf->setX(160); $pdf->setY(180);
		$pdf->Cell(40,0,utf8_decode("MATI. L. Rafael Bojorges Güereña"),0,'C', false);

		$pdf->setX(177); $pdf->setY(185);
		$pdf->Cell(40,0,"Director General",0,'C', false);
		
		$pdf->Output();

 
 ?>
