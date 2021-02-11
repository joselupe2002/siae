
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

			var $widths;
			var $aligns;
			
			function SetWidths($w) {$this->widths=$w;}
			
			function SetAligns($a) {$this->aligns=$a;}
			
			function Row($data)
			{
				//Calculate the height of the row
				$nb=0;
				for($i=0;$i<count($data);$i++)
					$nb=max($nb,$this->NbLines($this->widths[$i],$data[$i]));
					$h=5*$nb;
					//Issue a page break first if needed
					$this->CheckPageBreak($h);
					//Draw the cells of the row
					for($i=0;$i<count($data);$i++)
					{
						$w=$this->widths[$i];
						$a=isset($this->aligns[$i]) ? $this->aligns[$i] : 'L';
						//Save the current position
						$x=$this->GetX();
						$y=$this->GetY();
						//Draw the border
						$this->Rect($x,$y,$w,$h);
						//Print the text
						$this->MultiCell($w,4,$data[$i],0,$a);
						//Put the position to the right of the cell
						$this->SetXY($x+$w,$y);
					}
					//Go to the next line
					$this->Ln($h);
			}
			
			function CheckPageBreak($h)
			{
				//If the height h would cause an overflow, add a new page immediately
				if($this->GetY()+$h>$this->PageBreakTrigger)
					$this->AddPage($this->CurOrientation);
			}
			
			function NbLines($w,$txt)
			{
				//Computes the number of lines a MultiCell of width w will take
				$cw=&$this->CurrentFont['cw'];
				if($w==0)
					$w=$this->w-$this->rMargin-$this->x;
					$wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
					$s=str_replace("\r",'',$txt);
					$nb=strlen($s);
					if($nb>0 and $s[$nb-1]=="\n")
						$nb--;
						$sep=-1;
						$i=0;
						$j=0;
						$l=0;
						$nl=1;
						while($i<$nb)
						{
							$c=$s[$i];
							if($c=="\n")
							{
								$i++;
								$sep=-1;
								$j=$i;
								$l=0;
								$nl++;
								continue;
							}
							if($c==' ')
								$sep=$i;
								$l+=$cw[$c];
								if($l>$wmax)
								{
									if($sep==-1)
									{
										if($i==$j)
											$i++;
									}
									else
										$i=$sep+1;
										$sep=-1;
										$j=$i;
										$l=0;
										$nl++;
								}
								else
									$i++;
						}
						return $nl;
			}

	/*============================================================================================*/
	


   	     var $eljefe="";
			  
	
			function getMateria(){   		       
            	$miConex = new Conexion();  
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vedgrupos WHERE IDDETALLE=".$_GET["materia"]);
				
				foreach ($resultado as $row) {$data[] = $row;}            
            	return $data;            		
			}
			
			function getAlumnosObs(){   		       
            	$miConex = new Conexion();  
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT distinct ALUM_MATRICULA AS MATRICULA, concat(ALUM_APEPAT,' ',ALUM_APEMAT, ' ',ALUM_NOMBRE) AS NOMBRE, OBS".							
				" FROM  dlista a, falumnos b LEFT outer join tut_obsprof on (MATRICULA=ALUM_MATRICULA AND IDCORTE='".$_GET["corte"]."') ".
				" where a.ALUCTR=b.ALUM_MATRICULA and a.IDGRUPO=".$_GET["materia"]." ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE");
				
				foreach ($resultado as $row) {$data[] = $row;}            
            	return $data;            		
			}
			
   	       function getAlumnos(){   		       
            	$miConex = new Conexion();  
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT distinct ALUM_MATRICULA AS MATRICULA, concat(ALUM_APEPAT,' ',ALUM_APEMAT, ' ',ALUM_NOMBRE) AS NOMBRE,".
				"getPeriodos(ALUM_MATRICULA,'".$_GET["ciclo"]."') as PERIODOS ".
				" FROM  dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA and a.IDGRUPO=".$_GET["materia"]." ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE");
				
				foreach ($resultado as $row) {$data[] = $row;}            
            	return $data;            		
            }
	   
			function getCuenta($lamat,$eltipo){   		       
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT COUNT(*) FROM tut_motrepalum a where ".
				"MATRICULA='".$lamat."' AND IDCORTE='".$_GET["corte"]."'  AND TIPO='".$eltipo."'");
				
				foreach ($resultado as $row) {$data[] = $row;}            
            	return $data;            		
			}
			
			function getTiposMot(){   		       
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from tut_catmotrep order by orden");
				
				foreach ($resultado as $row) {$data[] = $row;}            
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
				$this->SetX(10);
				$this->Ln(5);		
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'H');

				$this->SetFont('Montserrat-Medium','B',7);
				$this->SetDrawColor(0,0,0);
				$this->SetX(20);
				$this->SetY(-30);
				$this->Cell(60,4,"FIRMA DEL TUTOR",'T',0,'C',false);
				$this->Cell(20,4,"",'',0,'C',false);
				$this->Cell(60,4,utf8_decode('FIRMA DEL COORDINADOR DE TUTORÍAS'),'T',0,'C',false);				
		
				
				
			}
			
			

			
		}
		
		
		$pdf = new PDF('L','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(10, 35 , 10);
		$pdf->SetAutoPageBreak(true,40); 
		$pdf->AddPage();
		$data=$pdf->getAlumnos();
		$dataTipo=$pdf->getTiposMot();
		$dataMat=$pdf->getMateria();
		$dataObs=$pdf->getAlumnosObs();

		$pdf->Ln(5);
		$pdf->Cell(270,5,utf8_decode('FORMATO DE SEGUIMIENTO A LA TRAYECTORIA ACADÉMICA'),0,1,'C',false);
		$pdf->Cell(270,5,utf8_decode('PROGRAMA INSTITUCIONAL DE TUTORÍAS'),0,1,'C',false);
			
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(15,5,utf8_decode('TUTOR:'),0,0,'L',false);
		$pdf->SetFont('Montserrat-Medium','B',8);
		$pdf->Cell(65,5,utf8_decode($dataMat[0]["PROFESORD"]),0,0,'L',false);

		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(20,5,utf8_decode('CARRERA:'),0,0,'L',false);
		$pdf->SetFont('Montserrat-Medium','B',8);
		$pdf->Cell(90,5,utf8_decode($dataMat[0]["CARRERAD"]),0,0,'L',false);

		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(20,5,utf8_decode('MATERIA:'),0,0,'L',false);
		$pdf->SetFont('Montserrat-Medium','B',8);
		$pdf->Cell(50,5,utf8_decode($dataMat[0]["MATERIAD"]),0,0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(15,5,utf8_decode('CORTE:'),0,0,'L',false);
		$pdf->SetFont('Montserrat-Medium','B',8);
		$pdf->Cell(65,5,strtoupper(utf8_decode($_GET["corted"])),0,0,'L',false);

		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(15,5,utf8_decode('GRUPO:'),0,0,'L',false);
		$pdf->SetFont('Montserrat-Medium','B',8);
		$pdf->Cell(95,5,$dataMat[0]["SIE"],0,0,'L',false);

		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(20,5,utf8_decode('FECHA:'),0,0,'L',false);
		$pdf->SetFont('Montserrat-Medium','B',8);
		$fecha=date("d")."/".date("m")."/".date("Y");
		$pdf->Cell(50,5,$fecha,0,0,'L',false);


		$pdf->Ln(5);
        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(255);  
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(10,5,'No.',1,0,'C',true);
		$pdf->Cell(25,5,'MAT.',1,0,'C',true);
		$pdf->Cell(115,5,'NOMBRE',1,0,'C',true);
		$pdf->Cell(10,5,'SEM',1,0,'C',true);
		$c=0;foreach($dataTipo as $row) {$c++;}
		$an=intdiv (90,$c);
		foreach($dataTipo as $row) {
			$pdf->Cell($an,5,$row["CORTO"],1,0,'C',true);

		}
		$pdf->SetFillColor(255,255,255);
        $pdf->SetTextColor(0);
		
		$pdf->Ln();
		$lin=0;
		$pdf->SetFont('Montserrat-Medium','B',8);
		foreach($data as $rowP) {
			$pdf->Cell(10,5,$lin,1,0,'C',true);
			$pdf->Cell(25,5,$rowP["MATRICULA"],1,0,'L',true);
			$pdf->Cell(115,5,utf8_decode($rowP["NOMBRE"]),1,0,'L',true);
			$pdf->Cell(10,5,$rowP["PERIODOS"],1,0,'C',true);
			foreach($dataTipo as $row) {
				$dataHay=$pdf->getCuenta($rowP["MATRICULA"],$row["ID"]);
				$pdf->Cell($an,5,$dataHay[0][0],1,0,'C',true);
			}

			$pdf->Ln();
			$lin++;
		}

		$pdf->Ln(5);
		$pdf->Cell(270,5,utf8_decode('OBSERVACIONES DEL TUTOR'),0,1,'C',false);

		$pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(255);  
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(10,5,'No.',1,0,'C',true);
		$pdf->Cell(25,5,'MAT.',1,0,'C',true);
		$pdf->Cell(115,5,'NOMBRE',1,0,'C',true);
		$pdf->Cell(100,5,'OBSERVACIONES',1,0,'C',true);

		$pdf->Ln();
		$c=1;
		$pdf->SetFont('Montserrat-Medium','B',8);
		$pdf->SetWidths(array(10, 25, 115,100));
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0);			
	
		foreach($dataObs as $rowObs)
						{
							$pdf->Row(array($c,
									   utf8_decode($rowObs["MATRICULA"]),
									   utf8_decode($rowObs["NOMBRE"]),
									   utf8_decode($rowObs["OBS"])									
							));
							$c++;
						}
		



		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
