
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
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select  DISTINCT(a.FECHA) as FECHA, b.MATERIAD, b.AULA, b.HORARIO, b.PROFESORD, b.JEFE, b.JEFED, b.FIRMAOF, b.DEPTO, b.DEPTOD  from vprefectura a, vdprefectura b  where a.ID=b.IDPREF".
                                                                         " and a.PREF_ANIO='".$_GET['periodo']."'".
						                                                 " and a.PREF_MES='".$_GET['mes']."'".
						                                                 " and b.PROFESOR='".$_GET['profesor']."'".
                                                                         " and b.INCIDENCIA='F' order by STR_TO_DATE(a.FECHA,'%d/%m/%Y')");				
			
				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			
			
			function imprimeIncidencias($headerdes, $datades)
			{
				$this->SetFillColor(172,31,6);
				$this->SetTextColor(255);
				$this->SetDrawColor(181,57,35);
				$this->SetLineWidth(.3);
				
				$w = array(20, 100, 22, 22);
				$this->SetFont('Montserrat-ExtraBold','B',8);
				for($i=0;$i<count($headerdes);$i++)
					$this->Cell($w[$i],7,$headerdes[$i],1,0,'C',true);
					$this->Ln();
					// Restauración de colores y fuentes
					$this->SetFillColor(255,254,174);
					$this->SetTextColor(0);
					$this->SetFont('');
					// Datos
					$fill = false;
					$this->SetFont('Montserrat-Medium','',6);
					$suma=0;
					
					
					foreach($datades as $rowdes)
					{
						
						if (count($rowdes)) {
							$this->Cell($w[0],4,utf8_decode($rowdes[0]),'LR',0,'J',$fill);
							$this->Cell($w[1],4,utf8_decode($rowdes[1]),'LR',0,'L',$fill);
							$this->Cell($w[2],4,utf8_decode($rowdes[2]),'LR',0,'L',$fill);
							$this->Cell($w[3],4,utf8_decode($rowdes[3]),'LR',0,'C',$fill);
							$suma+=$rowdes[3];
							$this->Ln();
							$fill = !$fill;
						}
						
					}
					
					$this->Cell(array_sum($w),0,'','T');
					$this->Ln();
					$this->SetFont('Montserrat-ExtraBold','B',8);					
					$this->Ln();
					$this->Cell(array_sum($w),0,'','T');
					// Línea de cierre
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
		$pdf->SetAutoPageBreak(true,25); 
		$pdf->AddPage();
		
	
		$data = $pdf->LoadData();
		$miutil = new UtilUser();
		$fechadec=$miutil->formatFecha($data[0]["FECHA"]);
		$fecha=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
		
		
				
		$dataGen = $pdf->LoadDatosGen();
		
		$dataof=$miutil->verificaOficio($data[0]["DEPTO"],"EXHORTO",$_GET["mes"]."-".$_GET["periodo"]."-".$_GET["profesor"]);
		
		
		
		$fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
		
		
		$rechum=$miutil->getJefe('402');
		$subdir=$miutil->getJefe('304');
		
		

		$pdf->SetFont('Montserrat-Medium','',9);
		$pdf->Ln(10);
		$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
		$pdf->Ln(5);
		$pdf->Cell(0,0,'ASUNTO: EL QUE SE INDICA',0,1,'R');
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
		$pdf->Ln(10);
		$pdf->Cell(0,0,utf8_decode($data[0]["PROFESORD"]),0,1,'L');
		$pdf->Ln(5);
		$pdf->Cell(0,0,'DOCENTE DEL ITSM',0,1,'L');
		$pdf->Ln(5);
		$pdf->Cell(0,0,'PRESENTE',0,1,'L');
		$pdf->Ln(5);
		
		
		$eldeptomaestro=utf8_decode($data[0]["DEPTOD"]);
		
		$pdf->SetFont('Montserrat-SemiBold','',10);
		$pdf->MultiCell(0,5,'De conformidad con las atribuciones conferidas y encomendadas por el M.A.T.I. Leonardo Rafael Bojorges Güereña, Director General del Instituto Tecnológico Superior de Macuspana,'.
                            'en términos del artículo 13, fracción III, VIII y XIV de la Ley que Crea el Instituto Tecnológico Superior de Macuspana, artículo 11, '.
				            'fracción II y X, artículo 16, fracción VIII, X y las demás aplicables del Reglamento Interior del Instituto Tecnológico Superior '.
				            'de Macuspana, me dirijo a Usted con la oportunidad de hacerle el presente llamado de atención por escrito, debido a su actuación de los días: ',0,'J', false);
		
		$pdf->Ln(5);
		$headerdes = array('FECHA','MATERIA','AULA','HORARIO');
		$pdf->imprimeIncidencias($headerdes,$data);
		
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-SemiBold','',10);
		$pdf->MultiCell(0,5,'Cuando Usted falto injustificadamente a su jornada de trabajo en el '.
				$eldeptomaestro.' del Instituto Tecnológico Superior de Macuspana, sin tomar las precauciones debido a las importantes funciones que usted realiza, no notificando con tiempo a su superior jerárquico. ',0,'J', false);
		$pdf->Ln(5);
		$pdf->MultiCell(0,5,'Esto crea una imagen de falta de seriedad en su persona y por extensión, de nuestra Institución Educativa. Por lo anterior, '.
				'se le exhorta para que corrija su comportamiento, y en lo futuro notifique previamente a su jefe inmediato cuando tenga la necesidad de ausentarse de sus labores, '.
				'pues de lo contrario, nos veremos en la obligación de tomar otro tipo de acciones legales.',0,'J', false);
		$pdf->Ln(5);
		
		
		
		
		$pdf->setX(25);$pdf->setY(220);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,'A T E N T A M E N T E',0,1,'L');
		$pdf->setX(25);$pdf->setY(225);
		$pdf->SetFont('Montserrat-ExtraLight','I',8);
		$pdf->Cell(0,0,'Excelencia en Educación Tecnológica',0,1,'L');
		$pdf->setX(25);$pdf->setY(236);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,utf8_decode($data[0]["JEFED"]),0,1,'L');
		$pdf->setX(25);$pdf->setY(240);
		$pdf->Cell(0,0,utf8_decode($data[0]["FIRMAOF"]),0,1,'L');
		
		$pdf->setX(25);$pdf->setY(245);
		$pdf->SetFont('Montserrat-Medium','',7);
		$pdf->Cell(0,0,"C.c.p. ".utf8_decode($subdir)."; Subdirección académica.",0,1,'L');
		

		
		
		/*
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-SemiBold','',10);
		$pdf->MultiCell(0,8,'Agradeceré se envie copia del exhorto a esta jefatura de división.',0,'J', false);
		$pdf->Ln(5);
		$pdf->MultiCell(0,8,'Sin más por el momento aprovecho para enviarle un cordial saludo.',0,'J', false);
		$pdf->Ln(40);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,'A T E N T A M E N T E',0,1,'L');
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraLight','I',8);
		$pdf->Cell(0,0,'Excelencia en Educación Tecnológica',0,1,'L');
		$pdf->Ln(10);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,utf8_decode($data[0]["JEFED"]),0,1,'L');
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode($data[0]["FIRMAOF"]),0,1,'L');
		$pdf->Ln(55);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->setX(25);$pdf->setY(240);
		$pdf->Cell(0,0,utf8_decode($subdir)."; Subdirección académica.",0,1,'L');
		
	*/
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
