
<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	require('../../fpdf/fpdf.php');
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";

	class VariableStream
	{
		private $varname;
		private $position;
	
		function stream_open($path, $mode, $options, &$opened_path)
		{
			$url = parse_url($path);
			$this->varname = $url['host'];
			if(!isset($GLOBALS[$this->varname]))
			{
				trigger_error('Global variable '.$this->varname.' does not exist', E_USER_WARNING);
				return false;
			}
			$this->position = 0;
			return true;
		}
	
		function stream_read($count)
		{
			$ret = substr($GLOBALS[$this->varname], $this->position, $count);
			$this->position += strlen($ret);
			return $ret;
		}
	
		function stream_eof()
		{
			return $this->position >= strlen($GLOBALS[$this->varname]);
		}
	
		function stream_tell()
		{
			return $this->position;
		}
	
		function stream_seek($offset, $whence)
		{
			if($whence==SEEK_SET)
			{
				$this->position = $offset;
				return true;
			}
			return false;
		}
		
		function stream_stat()
		{
			return array();
		}
	}

	
   class PDF extends FPDF {
			   
			function __construct($orientation='P', $unit='mm', $size='A4')
			{
				parent::__construct($orientation, $unit, $size);
				// Register var stream protocol
				stream_wrapper_register('var', 'VariableStream');
			}

			function MemImage($data, $x=null, $y=null, $w=0, $h=0, $link='')
			{
				// Display the image contained in $data
				$v = 'img'.md5($data);
				$GLOBALS[$v] = $data;
				$a = getimagesize('var://'.$v);
				if(!$a)
					$this->Error('Invalid image data');
				$type = substr(strstr($a['mime'],'/'),1);
				$this->Image('var://'.$v, $x, $y, $w, $h, $type, $link);
				unset($GLOBALS[$v]);
			}

			function GDImage($im, $x=null, $y=null, $w=0, $h=0, $link='')
			{
				// Display the GD image associated with $im
				ob_start();
				imagepng($im);
				$data = ob_get_clean();
				$this->MemImage($data, $x, $y, $w, $h, $link);
			}
	/*============================================================================================*/
	


   	     var $eljefe="";
   	       
		  
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vedgrupos where CICLO=".$_GET["ciclo"].
				" and CARRERA='".$_GET["carrera"]."' BASE IS NULL ");				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}


			function LoadCiclo()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from ciclosesc  where CICL_CLAVE=".$_GET["ciclo"]);				
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
				$miutil->getEncabezado($this,'H');		
				$this->setY(50);	
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'H');
				
			}
			

			function cargaAcademica()
			{
			    $entre=false;
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select a.MATERIAD, CONCAT(a.CARRERA,' ',a.PERIODO), ".
                                                 "a.SIE, LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO, (IFNULL(a.HP,0)+IFNULL(a.HT,0)) as HT,".
												 " CARRERAD, SEMESTRE from  vedgrupos a where a.BASE IS NULL and a.CICLO='".$_GET["ciclo"]."' and a.CARRERA='".$_GET["carrera"]."'".
												" order by SEMESTRE, SIE" );				
				foreach ($resultado as $row) {
					$data[] = $row;
					$entre=true;
				}
				if ($entre) {return $data;}
				else  return null;
			}
			
			
		
			

			function dameHoras($lin){
				$lashoras=0;
					for ($i=3; $i<=9; $i++) {
						if (($lin[$i]!='') && (strlen($lin[$i])>10)) {
							$hor1=substr($lin[$i],0,2);
							$min1=substr($lin[$i],3,2);

							$hor2=substr($lin[$i],6,2);
							$min2=substr($lin[$i],9,2);

							$lashoras+=(($hor2*60)+$min2)-(($hor1*60)+$min1);
						}
					}
				return ($lashoras/60);
			}
			
			// Tabla coloreada
			function imprimeCargaAcad($header, $data)
			{
			
				// Colores, ancho de l�nea y fuente en negrita
				$this->SetFillColor(172,31,6);
				$this->SetTextColor(255);
				$this->SetDrawColor(181,57,35);
				$this->SetLineWidth(.3);
				
	
				$w = array(82, 10, 19,19,19,19,19,19,19,19,10);
				$this->SetFont('Montserrat-ExtraBold','B',8);
				for($i=0;$i<count($header);$i++)
					$this->Cell($w[$i],7,$header[$i],1,0,'C',true);
					$this->Ln();
					// Restauraci�n de colores y fuentes
					$this->SetFillColor(255,254,174);
					$this->SetTextColor(0);
					$this->SetFont('');
					// Datos
					$fill = false;
					$this->SetFont('Montserrat-Medium','',6);
					$suma=0;
					$lin=0;
					$elsem=$data[0]["SEMESTRE"];
					foreach($data as $row)
					{

						if (($elsem!=$row["SEMESTRE"])&&($lin>0)) { 
							$this->Ln();
							$this->Cell(array_sum($w),0,'','T');
							$this->Ln();
							$this->SetFont('Montserrat-ExtraBold','B',8);
							$this->Cell(array_sum($w)-10,4,'Suma de Horas','LR',0,'R',$fill);
							$this->Cell(10,4,$suma,'LR',0,'C',$fill);
							$this->Ln();
							$this->Cell(array_sum($w),0,'','T');
							$suma=0;	
							$this->SetFont('Montserrat-Medium','B',6);

							$this->ln(); 
							$this->Cell(254,0,"",'T',0,'L',$fill);  
							$elsem=$row["SEMESTRE"]; 
							$this->ln(5);
							$this->SetFillColor(172,31,6);
							$this->SetTextColor(255);	
							$this->SetFont('Montserrat-ExtraBold','B',8);									
							for($i=0;$i<count($header);$i++) {$this->Cell($w[$i],7,$header[$i],1,0,'C',true);}
							$this->SetFont('Montserrat-Medium','B',6);
							$this->SetFillColor(255,254,174);
							$this->SetTextColor(0);
							$this->ln();
							$this->Cell(254,0,"",'T',0,'L',$fill); 
							$this->ln();
						}
						else {if ($lin>0) $this->Ln(); }

						$horasMat=$this->dameHoras($row);
						$this->Cell($w[0],4,utf8_decode($row[0]),'LR',0,'J',$fill);
						$this->Cell($w[1],4,$row[1],'LR',0,'L',$fill);
						$this->Cell($w[2],4,$row[2],'LR',0,'L',$fill);
						$this->Cell($w[3],4,$row[3],'LR',0,'L',$fill);
						$this->Cell($w[4],4,$row[4],'LR',0,'L',$fill);
						$this->Cell($w[5],4,$row[5],'LR',0,'L',$fill);
					    $this->Cell($w[6],4,$row[6],'LR',0,'L',$fill);
					    $this->Cell($w[7],4,$row[7],'LR',0,'L',$fill);
					    $this->Cell($w[8],4,$row[8],'LR',0,'L',$fill);
					    $this->Cell($w[9],4,$row[9],'LR',0,'L',$fill);
					    $this->Cell($w[10],4,$horasMat,'LR',0,'C',$fill);
						$suma+=$horasMat;	
						$lin++;
										
											
						$fill = !$fill;
					}		
					
					// L�nea de cierre
							$this->Ln();
							$this->Cell(array_sum($w),0,'','T');
							$this->Ln();
							$this->SetFont('Montserrat-ExtraBold','B',8);
							$this->Cell(array_sum($w)-10,4,'Suma de Horas','LR',0,'R',$fill);
							$this->Cell(10,4,$suma,'LR',0,'C',$fill);
							$this->Ln();
							$this->Cell(array_sum($w),0,'','T');
							$suma=0;	
							$this->SetFont('Montserrat-Medium','B',6);
			}
			
			
			
		}
		
		
		$pdf = new PDF('L','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(10, 25 , 25);
		$pdf->SetAutoPageBreak(true,50); 
		$pdf->AddPage();
		
		$dataCiclo = $pdf->LoadCiclo();

		$data = $pdf->cargaAcademica();
		
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"PROGRAMA EDUCATIVO: ",0,0,'L');	
		$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($data[0]["CARRERAD"]),0,1,'L');
		
		$pdf->ln(5);
		$header = array(utf8_decode('Asignaturas'), 'C|S', 'Grupo','Lunes','Martes',utf8_decode('Miércoles'),'Jueves','Viernes','Sabado','Domingo', 'TH');
		
		
		$pdf->imprimeCargaAcad($header,$data);
		
	
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
