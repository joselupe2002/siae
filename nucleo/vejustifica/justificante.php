
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
   	        
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vejustifica WHERE JUST_CLAVE=".$_GET["id"]);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			function LoadProf($matricula)
			{
				$miConex = new Conexion();
				
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select getciclo() from dual");
				foreach ($resultado as $row) {
					$elciclo= $row[0];
				}
				
				$resultado=$miConex->getConsulta($_SESSION['bd'],
                                                 "select DISTINCT b.PROFESOR, b.PROFESORD, c.EMPL_CORREOINS ".
						                         "from dlista a, vedgrupos b, pempleados c where a.ALUCTR='".$matricula."'".
						                         " and a.PDOCVE='".$elciclo."' and  a.MATCVE=b.MATERIA and a.GPOCVE=b.SIE ".
						                         " AND a.PDOCVE=b.CICLO and b.PROFESOR=c.EMPL_NUMERO ".
						                         " and b.MATERIA not like 'ING%' and b.MATERIA not like 'EXT%'");
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			
			function imprimeProf($headerdes, $datades)
			{
				$this->SetFillColor(172,31,6);
				$this->SetTextColor(255);
				$this->SetDrawColor(181,57,35);
				$this->SetLineWidth(.3);
				
				$w = array(20, 100, 44);
				$this->SetFont('Montserrat-ExtraBold','B',10);
				for($i=0;$i<count($headerdes);$i++)
					$this->Cell($w[$i],7,$headerdes[$i],1,0,'C',true);
					$this->Ln();
					// Restauraci�n de colores y fuentes
					$this->SetFillColor(255,254,174);
					$this->SetTextColor(0);
					$this->SetFont('');
					// Datos
					$fill = false;
					$this->SetFont('Montserrat-Medium','',10);
					$suma=0;
					
					
					foreach($datades as $rowdes)
					{
						
						if (count($rowdes)) {
							$this->Cell($w[0],10,utf8_decode($rowdes[0]),'LRT',0,'C',$fill);
							$this->Cell($w[1],10,utf8_decode($rowdes[1]),'LRT',0,'L',$fill);	
							$this->Cell($w[2],10,'','LRT',1,'L',$fill);

						}
						
					}
					
					$this->Cell(array_sum($w),0,'','T');
					$this->Ln();
					$this->SetFont('Montserrat-ExtraBold','B',8);					
					$this->Ln();
					$this->Cell(array_sum($w),0,'','T');
					// L�nea de cierre
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
	
		$fechadecof=$miutil->formatFecha($data[0]["JUST_FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
	
		$fechadec1=$miutil->formatFecha($data[0]["JUST_FECINI"]);
		$fecha1=date("d", strtotime($fechadec1))." de ".$miutil->getFecha($fechadec1,'MES'). " del ".date("Y", strtotime($fechadec1));
		
		$fechadec2=$miutil->formatFecha($data[0]["JUST_FECFIN"]);
		$fecha2=date("d", strtotime($fechadec2))." de ".$miutil->getFecha($fechadec2,'MES'). " del ".date("Y", strtotime($fechadec2));
		
		$textofecha=" los d�as del ";
		if ($fecha1==$fecha2) {$fecha2=""; $textofecha=" el "; } else {$fecha2=" AL ".$fecha2;}
		
		$rechum=$miutil->getJefe('402');
		$subdir=$miutil->getJefe('304');
		
		
		if (($_GET["tipo"]=='1') ||($_GET["tipo"]=='2')) {
			$pdf->Image($data[0]["JUST_SELLO"],150,200,45);
			$pdf->Image($data[0]["JUST_FIRMA"],50,200,45);
		}
		

		$pdf->SetFont('Montserrat-Medium','',9);
		$pdf->Ln(10);
		$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,'FOLIO No. '.utf8_decode($data[0]["JUST_CLAVE"]),0,1,'R');
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
		$pdf->Ln(5);
	
		$pdf->Cell(0,0,'ESTIMADO PROFESOR:',0,1,'L');
		$pdf->Ln(10);
		
		
		
		
		$pdf->SetFont('Montserrat-SemiBold','',10);
		$pdf->MultiCell(0,5,'Por medio de la presente solicito a usted se le justifiquen las faltas al(a) alumno(a) '.utf8_decode($data[0]["JUST_NOMBREC"]).
				', con n�mero de control '.utf8_decode($data[0]["JUST_MATRICULA"]).' de la carrera de '.utf8_decode($data[0]["JUST_CARRERAD"]).
				', '.$textofecha.utf8_decode($fecha1).$fecha2.', Por motivos de '.utf8_decode($data[0]["JUST_TIPOD"]).' ('.utf8_decode($data[0]["JUST_OBS"]).').',0,'J', false);
		$pdf->Ln(5);
		$pdf->MultiCell(0,5,'Agradezco coloque su firma de enterado, el formato correspondiente ya fue enviado a su correo institucional.',0,'J', false);
		$pdf->Ln(5);
		
		
		
		$headerdes = array('NO.','PROFESOR','FIRMA');
		$dataProf = $pdf->LoadProf($data[0]["JUST_MATRICULA"]);
		$pdf->imprimeProf($headerdes,$dataProf);
				
		
		$pdf->SetFont('Montserrat-SemiBold','',10);
		$pdf->Ln(5);
		$pdf->MultiCell(0,5,'Sin m�s por el momento aprovecho para enviarle un cordial saludo. ',0,'J', false);
		$pdf->Ln(5);
		
		$pdf->setX(25);$pdf->setY(220);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,'A T E N T A M E N T E',0,1,'L');
		$pdf->setX(25);$pdf->setY(225);
		$pdf->SetFont('Montserrat-ExtraLight','I',8);
		$pdf->Cell(0,0,'Excelencia en Educaci�n Tecnol�gica',0,1,'L');
		$pdf->setX(25);$pdf->setY(236);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,utf8_decode($data[0]["JUST_AUTORIZOD"]),0,1,'L');
		$pdf->setX(25);$pdf->setY(240);
		$pdf->Cell(0,0,utf8_decode($data[0]["JUST_FIRMAOF"]),0,1,'L');
		
		$pdf->setX(25);$pdf->setY(245);
		$pdf->SetFont('Montserrat-Medium','',7);
		$pdf->Cell(0,0,"C.c.p. ".utf8_decode($subdir)."; Subdirecci�n acad�mica.",0,1,'L');
		
		

		
		if ($_GET["tipo"]=='0') { $pdf->Output(); }
		
		if ($_GET["tipo"]=='1') {
			$doc = $pdf->Output('', 'S');	
		    ?>
		       <html lang="en">
	               <head>
						<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
						<meta charset="utf-8" />
						<link rel="icon" type="image/gif" href="imagenes/login/sigea.ico">
						<title>Sistema de Gesti&oacute;n Escolar-Administrativa</title>
						<meta name="description" content="User login page" />
						<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
						<link rel="stylesheet" href="../../assets/css/bootstrap.min.css" />
						<link rel="stylesheet" href="../../assets/font-awesome/4.5.0/css/font-awesome.min.css" />
						<link rel="stylesheet" href="../../assets/css/select2.min.css" />
						<link rel="stylesheet" href="../../assets/css/fonts.googleapis.com.css" />
					    <link rel="stylesheet" href="../../assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
						<link rel="stylesheet" href="../../assets/css/ace-rtl.min.css" />		
						<script src="../../assets/js/ace-extra.min.js"></script>		
						<link rel="stylesheet" href="../../assets/css/jquery-ui.min.css" />
	                </head>
	      <?php 
					foreach($dataProf as $rowdes)
					{
						$res=$miutil->enviarCorreo($rowdes[2],'Justificante de falta: '.utf8_decode($data[0]["JUST_NOMBREC"]),
								'Por medio de la presente solicito a usted se le justifiquen las faltas al(a) alumno(a) '.utf8_decode($data[0]["JUST_NOMBREC"]).
								', con número de control '.utf8_decode($data[0]["JUST_MATRICULA"]).' de la carrera de '.utf8_decode($data[0]["JUST_CARRERAD"]).
								', los días del '.utf8_decode($fecha1).$fecha2.', Por motivos de '.utf8_decode($data[0]["JUST_TIPOD"]).' ('.utf8_decode($data[0]["JUST_OBS"]).').'.
								' <br/> En adjunto encontrará el formato debidamente firmado y sellado. '
								,$doc);	
						if ($res=="") {echo "<span class=\"label label-success arrowed\">Correo Eviado a: ". $rowdes[1]." ". $rowdes[2]."</span><br/><br/>"; }
						else { echo "<span class=\"label label-danger arrowed-in\">".$res."</span><br/><br/>"; }
						
					}
		}
		if ($_GET["tipo"]=='2') {
			$pdf->Output(); 
		}
		
		
		

 } else {header("Location: index.php");}
 
 ?>
