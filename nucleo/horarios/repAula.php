
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
			

			function cargaAulas($aula)
			{
				$cadAula=""; if ($aula!="0") {$cadAula=" AND AULA_CLAVE='".$aula."'";}
			    $entre=false;
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select AULA_CLAVE, AULA_DESCRIP from eaula where ".
				"AULA_ACTIVO='S'".$cadAula." order by AULA_DESCRIP ");				
				foreach ($resultado as $row) {
					$data[] = $row;
					$entre=true;
				}
				if ($entre) {return $data;}
				else  return null;
			}
			


			function cargaAcademica($aula)
			{

			    $entre=false;
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select a.MATERIAD, CONCAT(a.CARRERA,' ',a.PERIODO), ".
                                                 "a.SIE, LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO, (IFNULL(a.HP,0)+IFNULL(a.HT,0)) as HT,".
												 " CARRERAD, SEMESTRE from  vedgrupos a where a.BASE IS NULL and a.CICLO='".$_GET["ciclo"]."'".
												 " and (LUNES_A='".$aula."' OR MARTES_A='".$aula."' OR MIERCOLES_A='".$aula.
												 "' OR JUEVES_A='".$aula."' OR VIERNES_A='".$aula."' OR SABADO_A='".$aula.
												 "' OR DOMINGO_A='".$aula."')".
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
			function imprimeCargaAcad($header, $data, $aula)
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
					$elsem=$data[0]["SEMESTRE"];
					foreach($data as $row)
					{
						$horasMat=$this->dameHoras($row);
						$this->Cell($w[0],4,utf8_decode($row[0]),'LR',0,'J',$fill);
						$this->Cell($w[1],4,$row[1],'LR',0,'L',$fill);
						$this->Cell($w[2],4,$row[2],'LR',0,'L',$fill);
						
						if (strpos($row[3],$aula)>0) {$dia=$row[3];} else $dia=""; 
						$this->Cell($w[3],4,$dia,'LR',0,'L',$fill);

						if (strpos($row[4],$aula)>0) {$dia=$row[4];} else $dia=""; 
						$this->Cell($w[4],4,$dia,'LR',0,'L',$fill);

						if (strpos($row[5],$aula)>0) {$dia=$row[5];} else $dia=""; 
						$this->Cell($w[5],4,$dia,'LR',0,'L',$fill);

						if (strpos($row[6],$aula)>0) {$dia=$row[6];} else $dia=""; 
						$this->Cell($w[6],4,$dia,'LR',0,'L',$fill);

						if (strpos($row[7],$aula)>0) {$dia=$row[7];} else $dia=""; 
						$this->Cell($w[7],4,$dia,'LR',0,'L',$fill);
						
						if (strpos($row[8],$aula)>0) {$dia=$row[8];} else $dia=""; 
						$this->Cell($w[8],4,$dia,'LR',0,'L',$fill);

						if (strpos($row[9],$aula)>0) {$dia=$row[9];} else $dia=""; 
						$this->Cell($w[9],4,$dia,'LR',0,'L',$fill);

						
					    $this->Cell($w[10],4,$horasMat,'LR',0,'C',$fill);
						$suma+=$horasMat;	
						$this->Ln();
											
						$fill = !$fill;
					}		
					
							$this->Cell(array_sum($w),0,'','T');
							$this->Ln();
							$this->SetFont('Montserrat-ExtraBold','B',8);
							$this->Cell(array_sum($w)-10,4,'Suma de Horas','LR',0,'R',$fill);
							$this->Cell(10,4,$suma,'LR',0,'C',$fill);
							$this->Ln();
							$this->Cell(array_sum($w),0,'','T');
							$suma=0;	
							$this->SetFont('Montserrat-Medium','B',6);
					// L�nea de cierre
			}
			
			
			
		}
		
		
		$pdf = new PDF('L','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(10, 25 , 25);
		$pdf->SetAutoPageBreak(true,50); 
		
		
		$dataCiclo = $pdf->LoadCiclo();

		$dataAulas = $pdf->cargaAulas($_GET["aula"]);
		foreach($dataAulas as $rowA) {
			
			$data = $pdf->cargaAcademica($rowA["AULA_CLAVE"]);	
			if ($data!=null) {	
				$pdf->AddPage();	
				$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"AULA: ",0,0,'L');	
				$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($rowA["AULA_CLAVE"]),0,1,'L');			
				$pdf->ln(5);
				$header = array(utf8_decode('Asignaturas'), 'C|S', 'Grupo','Lunes','Martes',utf8_decode('Miércoles'),'Jueves','Viernes','Sabado','Domingo', 'TH');				
				$pdf->imprimeCargaAcad($header,$data,$rowA["AULA_CLAVE"]);
			}
		}	
	
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
