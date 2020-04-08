
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
   	     var $elprofe="";
   	       
   	       function getDatosPersona($num){   		       
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_ABREVIA,EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
            			"EMPL_FOTO, EMPL_DEPTOD, EMPL_JEFEABREVIA,EMPL_JEFE, EMPL_JEFED, EMPL_RFC, EMPL_CURP, EMPL_NUMERO, EMPL_FECING ".
            			" FROM vempleados WHERE EMPL_NUMERO= '".$num."'" );
                foreach ($resultado as $row) {$data[] = $row;}            
            	return $data;            		
            }
   	
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vedescarga a where DESC_PROFESOR='".$_GET["profesor"]."' AND DESC_CICLO=getciclo()");				
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
			
			
			function LoadPlan($actividad)
			{
				$miConex = new Conexion();	
				$data[]=null;
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT PLAN_ORDEN,PLAN_ACTIVIDAD,PLAN_ENTREGABLE,PLAN_FECHAENTREGA from eplandescarga a where PLAN_IDACT='".$actividad."' order by PLAN_ORDEN");
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
				
				
				$dir=$miutil->getJefe('301');
				$subdir=$miutil->getJefe('304');
				
				
				//249 ANCHO
				$this->SetFont('Montserrat-Medium','B',7);
				$this->SetDrawColor(0,0,0);
				$this->SetX(30);
				$this->SetY(-40);
				$this->Cell(60,4,$this->elprofe,'T',0,'C',false);
				$this->SetX(130);
				$this->Cell(60,4,$this->eljefe,'T',0,'C',false);
				
		
				$this->SetY(-37);
				$this->SetX(30);
				$this->Cell(60,4,'PROFESOR','',0,'L',false);
				$this->SetX(130);
				$this->Cell(60,4,'JEFE DIVISIÓN','',0,'C',false);
				
		
				
				
			}
			
			
			
		
			
			
			function descarga()
			{
				$entre=false;
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select a.DESC_ID, a.DESC_ACTIVIDADD,".
						"LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, DESC_HORAS ".
						" from  vedescarga a where a.DESC_CICLO='".$_GET["ciclo"]."' and a.DESC_PROFESOR='".$_GET["profesor"]."'" );
				foreach ($resultado as $row) {
					$data[] = $row;
					$entre=true;
				}
				if ($entre) {return $data;}
				else  return null;
			}
			
			function imprimeDescarga($headerdes, $datades)
			{
				$this->Ln(5);
				// Colores, ancho de línea y fuente en negrita
				$this->SetFillColor(172,31,6);
				$this->SetTextColor(255);
				$this->SetDrawColor(181,57,35);
				$this->SetLineWidth(.3);
				
			
				$w = array(10,85,16,16,16,16,16,10);
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
							$this->Cell($w[2],4,$rowdes[2],'LR',0,'L',$fill);
							$this->Cell($w[3],4,$rowdes[3],'LR',0,'L',$fill);
							$this->Cell($w[4],4,$rowdes[4],'LR',0,'L',$fill);
							$this->Cell($w[5],4,$rowdes[5],'LR',0,'L',$fill);
							$this->Cell($w[6],4,$rowdes[6],'LR',0,'L',$fill);
							$this->Cell($w[7],4,$rowdes[7],'LR',0,'C',$fill);
							$suma+=$rowdes[7];
							
							$this->Ln();
							$fill = !$fill;
						}
						
					}
					
					$this->Cell(array_sum($w),0,'','T');
					$this->Ln();
					$this->SetFont('Montserrat-ExtraBold','B',8);
					$this->Cell(array_sum($w)-10,4,'Suma de Horas','LR',0,'R',$fill);
					$this->Cell(10,4,$suma,'LR',0,'C',$fill);
					$this->Ln();
					$this->Cell(array_sum($w),0,'','T');
					// Línea de cierre
			}
			
			
			function imprimePlanDescarga($datades)
			{
				
				
				foreach($datades as $rowdes)
				{
					$this->Ln(10);
					$this->SetFont('Montserrat-ExtraBold','B',10);
					$this->Cell(0,0,"PLAN DE TRABAJO: ".utf8_decode($rowdes[1]),0,0,'L');
					$this->Ln(3);
					$dataPlan = $this->loadPlan($rowdes[0]);
					
					$this->SetFillColor(4,53,142);
					$this->SetTextColor(255);
					$this->SetDrawColor(55,85,172);
					$this->SetLineWidth(.3);
					
					$w = array(10,78,73,20);
					$this->SetFont('Montserrat-ExtraBold','B',8);
					
					$headerplan = array('No','Actividad','Entregable','Fecha');	
					
					$this->setX(15);
					for($i=0;$i<count($headerplan);$i++)
						$this->Cell($w[$i],7,$headerplan[$i],1,0,'C',true);
						$this->Ln();
						// Restauración de colores y fuentes
						$this->SetFillColor(183,201,255);
						$this->SetTextColor(0);
						$this->SetFont('');
						// Datos
						$fill = false;
						$this->SetFont('Montserrat-Medium','',8);
						$suma=0;
						
						if (!(empty($dataPlan))) {
								foreach($dataPlan as $rowdes)
								{
									$this->setX(15);
									if (count($rowdes)) {
										$this->Cell($w[0],4,utf8_decode($rowdes[0]),'LR',0,'J',$fill);
										$this->Cell($w[1],4,utf8_decode($rowdes[1]),'LR',0,'L',$fill);
										$this->Cell($w[2],4,utf8_decode($rowdes[2]),'LR',0,'L',$fill);
										$this->Cell($w[3],4,utf8_decode($rowdes[3]),'LR',0,'L',$fill);
									    $this->Ln();
										$fill = !$fill;
									}
									
								}
						}
						$this->setX(15);
						$this->Cell(array_sum($w),0,'','T');
					
				}
				
				
				
				
			}
			
			
		}
		
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(10, 25 , 25);
		$pdf->SetAutoPageBreak(true,45); 
		$pdf->AddPage();
		
		
		$dataEmpl = $pdf->getDatosPersona($_GET["profesor"]);
		
		$pdf->Ln(10);
		
	    $pdf->SetFont('Montserrat-ExtraBold','B',10); 
	    $pdf->Cell(0,0,"PLAN DE TRABAJO DE ACTIVIDADES DE DESCARGA ",0,0,'C');
	    $pdf->Ln(3);
	    $pdf->Cell(0,0,$_GET["ciclod"],0,1,'C');
		
	    $pdf->Ln(10);
		
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"NOMBRE: ",0,0,'L');	
		$pdf->setX(60); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_NOMBREC"]),0,1,'L');
		$pdf->Ln(4);
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"ACADEMÍA: ",0,0,'L');
		$pdf->setX(60); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_DEPTOD"]),0,1,'L');
		
			
		$pdf->eljefe=$dataEmpl[0]["EMPL_JEFEABREVIA"]." ".$dataEmpl[0]["EMPL_JEFED"];
		$pdf->elprofe=$dataEmpl[0]["EMPL_ABREVIA"]." ".$dataEmpl[0]["EMPL_NOMBREC"];
		
		$headerdes = array('ID','Actividades de Descarga','Lunes','Martes','Miércoles','Jueves','Viernes','TH');		
		$datades = $pdf->descarga();
		if (!($datades[0]==null)) { $pdf->imprimeDescarga($headerdes,$datades);}
		
		if (!($datades[0]==null)) { $pdf->imprimePlanDescarga($datades);}
		
		
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
