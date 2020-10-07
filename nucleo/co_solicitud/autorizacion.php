
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
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vco_solicitud where ID=".$_GET["id"]);				
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
			
			function Header()
			{
				$miutil = new UtilUser();
				$miutil->getEncabezado($this,'V');			
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'V');
				
				$this->SetX(10);$this->SetY(-65);
				$this->SetFont('Montserrat-ExtraBold','B',10);
				$this->Cell(0,0,'A T E N T A M E N T E',0,1,'L');
				
				$this->SetX(10);$this->SetY(-60);
				$this->SetFont('Montserrat-ExtraLight','I',8);
				$this->Cell(0,0,utf8_decode('Excelencia en Educación Tecnológica'),0,1,'L');
				$this->SetX(10);$this->SetY(-57);
				$this->SetFont('Montserrat-ExtraLight','I',8);
				$this->Cell(0,0,utf8_decode('"Habilidad, Actitud y Conocimiento"'),0,1,'L');
				
				$this->SetX(10);$this->SetY(-45);
				$this->SetFont('Montserrat-ExtraBold','B',10);
				$this->Cell(0,0,utf8_decode($this->eljefe),0,1,'L');
				
				$this->SetX(10);$this->SetY(-40);
				$this->Cell(0,0,utf8_decode($this->eljefepsto),0,1,'L');
				
				
				$this->SetX(10);$this->SetY(-30);
				$this->SetFont('Montserrat-Medium','',8);
				$this->Cell(0,0,"c.c.p. Archivo.",0,1,'L');
				
			}
			
			function LoadProf($matricula)
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],
						"select  EMPL_NUMERO, CONCAT(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) as NOMBRE, EMPL_CORREOINS ".
						"from pempleados where EMPL_NUMERO='".$matricula."'");
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
		$pdf->AddPage();
		
	
		 
		$data = $pdf->LoadData();
		$miutil = new UtilUser();
	
		
		$dataGen = $pdf->LoadDatosGen();
	
		
		$dataof=$miutil->verificaOficio('101',"AUTCOMITE",$_GET["id"]);
		
		$fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
		
		
		$dirgen=$miutil->getJefe('101');
		$diracad=$miutil->getJefe('301');

	
		if (($_GET["tipo"]=='1') ||($_GET["tipo"]=='2')) {			
			$pdf->Image($data[0]["EMPL_SELLO"],150,200,45);
			$pdf->Image($data[0]["EMPL_FIRMA"],50,215,40);			
		}
		
		
		$pdf->SetFont('Montserrat-Medium','',9);
		$pdf->Ln(10);
		$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Ln(20);
		$pdf->Cell(0,0,utf8_decode($diracad),0,1,'L');
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("PRESIDENTE DEL COMITÉ ACADÉMICO"),0,1,'L');
		$pdf->Ln(10);
		$pdf->SetFont('Montserrat-SemiBold','',10);

		$tipoper="";
		if ($data[0]["TIPO"]=='ALUMNOS') {$tipoper="estudiante";}
		if ($data[0]["TIPO"]=='DOCENTES') {$tipoper="docente";}
		$eladd=utf8_decode(' a el(la) '.$tipoper.' '.$data[0]["NOMBRE"].' de la carrera de '.$data[0]["CARRERAD"].
		' con número de control '.$data[0]["PERSONA"].".");
		if ($data[0]["TIPO"]=='GENERAL') {$eladd="";}

		$pdf->MultiCell(0,8,utf8_decode('Por este conducto y atediendo la recomendación de Comité Académico comunicó a usted, ').
		utf8_decode('que SI, SE AUTORIZA, el No. de recomendación: '.$data[0]["NUMCOMITE"]).$eladd,0,'J', false);
		$pdf->Ln(10);
		$pdf->MultiCell(0,8,utf8_decode('Sin otro particular le envió un cordial saludo.'),0,'J', false);
		
		$pdf->eljefe=$dirgen;
		$pdf->eljefepsto="DIRECTOR GENERAL DEL ".$dataGen[0]["inst_campo2"];
	
			
		if ($_GET["tipo"]=='0') { $pdf->Output(); }
		
		if ($_GET["tipo"]=='1') {
			$pdf->Output(); 
		}

 } else {header("Location: index.php");}
 
 ?>
