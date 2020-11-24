
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
   	       
   	       function getDatosPersona($num){   		       
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
            			"EMPL_FOTO, EMPL_DEPTOD, EMPL_JEFEABREVIA,EMPL_JEFE, EMPL_JEFED, EMPL_RFC, EMPL_CURP, EMPL_NUMERO, EMPL_FECING ".
            			" FROM vempleados WHERE EMPL_NUMERO= '".$num."'" );
                foreach ($resultado as $row) {$data[] = $row;}            
            	return $data;            		
            }
   	
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vdprefectura where ID=".$_GET["ID"]);				
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
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'H');
				
				
				$dir=$miutil->getJefe('301');
				$subdir=$miutil->getJefe('304');
				$dirgen=$miutil->getJefe('101');
				
				
				//249 ANCHO
				$this->SetFont('Montserrat-Medium','B',6);
				$this->SetDrawColor(0,0,0);
				$this->SetX(10);
				$this->SetY(-40);
				$this->Cell(45,4,"INTERESADO",'T',0,'C',false);
				$this->SetX(38);

				$this->Cell(45,4,utf8_decode($this->eljefe),'T',0,'C',false);
				$this->SetX(181);

				$this->Cell(55,4,utf8_decode($subdir),'T',0,'C',false);
				$this->SetX(189);

				$this->Cell(45,4,utf8_decode($dir),'T',0,'C',false);
				$this->SetX(209);
				
				$this->Cell(45,4,utf8_decode($dirgen),'T',0,'C',false);
				
		
				$this->SetY(-37);
				$this->SetX(80);
				$this->Cell(60,4,utf8_decode('JEFE DIVISIÓN'),'',0,'C',false);
				$this->SetX(140);
				$this->Cell(60,4,utf8_decode('SUBDIRECTOR ACADÉMICO'),'',0,'C',false);
				$this->SetX(210);
				$this->Cell(60,4,utf8_decode('DIRECTOR ACADÉMICO'),'',0,'C',false);
				
				
			}
			
			
			
			function cargaAcademica()
			{
			    $entre=false;
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select a.MATERIAD, CONCAT(a.CARRERA,' ',a.PERIODO), ".
                                                 "a.GRUPO, LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO, (IFNULL(a.HP,0)+IFNULL(a.HT,0)) as HT".
						                         " from  vedgrupos a where a.BASE IS NULL and a.CICLO='".$_GET["ciclo"]."' and a.PROFESOR='".$_GET["ID"]."'" );				
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
				$this->Ln(5);
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
					foreach($data as $row)
					{
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
					// L�nea de cierre
			}
			
			
			
			function descarga()
			{
				$entre=false;
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select a.DESC_ACTIVIDADD, a.DESC_ACTIVIDAD, a.DESC_DESCRIP, ".
						"LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO,DESC_HORAS ".
						" from  vedescarga a where a.DESC_CICLO='".$_GET["ciclo"]."' and a.DESC_PROFESOR='".$_GET["ID"]."'" );
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
				// Colores, ancho de l�nea y fuente en negrita
				$this->SetFillColor(172,31,6);
				$this->SetTextColor(255);
				$this->SetDrawColor(181,57,35);
				$this->SetLineWidth(.3);
				
			
				$w = array(71, 10, 51,16,16,16,16,16,16,16,10);
				$this->SetFont('Montserrat-ExtraBold','B',8);
				for($i=0;$i<count($headerdes);$i++)
					$this->Cell($w[$i],7,$headerdes[$i],1,0,'C',true);
					$this->Ln();
					// Restauraci�n de colores y fuentes
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
							$horasDes=$this->dameHoras($rowdes);
							$this->Cell($w[0],4,utf8_decode($rowdes[0]),'LR',0,'J',$fill);
							$this->Cell($w[1],4,$rowdes[1],'LR',0,'L',$fill);
							$this->Cell($w[2],4,utf8_decode($rowdes[2]),'LR',0,'L',$fill);
							$this->Cell($w[3],4,$rowdes[3],'LR',0,'L',$fill);
							$this->Cell($w[4],4,$rowdes[4],'LR',0,'L',$fill);
							$this->Cell($w[5],4,$rowdes[5],'LR',0,'L',$fill);
							$this->Cell($w[6],4,$rowdes[6],'LR',0,'L',$fill);
							$this->Cell($w[7],4,$rowdes[7],'LR',0,'L',$fill);
							$this->Cell($w[8],4,$rowdes[8],'LR',0,'L',$fill);
							$this->Cell($w[9],4,$rowdes[9],'LR',0,'L',$fill);
							$this->Cell($w[10],4,$horasDes,'LR',0,'C',$fill);
							$suma+=$horasDes;
							
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
					// L�nea de cierre
			}
			
		}
		
		
		$pdf = new PDF('L','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(10, 25 , 25);
		$pdf->SetAutoPageBreak(true,25); 
		$pdf->AddPage();
		
		
		$dataEmpl = $pdf->getDatosPersona($_GET["ID"]);
		$dataCiclo = $pdf->LoadCiclo();
		

	
		$logo = file_get_contents($dataEmpl[0]["EMPL_FOTO"]);
		$pdf->MemImage($logo,10,40,20);

		
		$pdf->Ln(10);
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"NOMBRE: ",0,0,'L');	
		$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_NOMBREC"]),0,1,'L');
		
		$pdf->setX(180); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"RFC: ",0,0,'L');
		$pdf->setX(190); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_RFC"]),0,1,'L');
		
		$pdf->setX(220); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"HORARIO DEL PERSONAL ",0,0,'L');
		
		$pdf->Ln(4);
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,utf8_decode("GRADO MÁXIMO DE ESTUDIOS: "),0,0,'L');
		$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_ULTIGRAD"]),0,1,'L');
		
		$pdf->setX(220); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"PERIODO:",0,0,'L');
		$pdf->setX(238); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataCiclo[0]["CICL_DESCRIP"]),0,1,'L');
		
		
		$pdf->Ln(4);
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"ES EGRESADO: ",0,0,'L');
		$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_EGRESADODED"]),0,1,'L');
		$pdf->setX(180); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"CURP: ",0,0,'L');
		$pdf->setX(190); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_CURP"]),0,1,'L');
		$pdf->Ln(4);
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,utf8_decode("DEPARTAMENTO O ACADEMIA: "),0,0,'L');
		$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_DEPTOD"]),0,1,'L');
		
		$pdf->setX(220); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"INGRESO:",0,0,'L');
		$pdf->setX(238); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_FECING"]),0,1,'L');
		
		$pdf->eljefe=$dataEmpl[0]["EMPL_JEFEABREVIA"]." ".$dataEmpl[0]["EMPL_JEFED"];
		
		$header = array(utf8_decode('I. Carga Académica'), 'Paq.', 'Grupo','Lunes','Martes',utf8_decode('Miércoles'),'Jueves','Viernes','Sabado','Domingo', 'TH');
		
		$data = $pdf->cargaAcademica();
		$pdf->imprimeCargaAcad($header,$data);
		
		$headerdes = array('II. Otras Actividades', 'Cve.', utf8_decode('Descripción'),'Lunes','Martes',utf8_decode('Miércoles'),'Jueves','Viernes','Sabado','Domingo', 'TH');		
		$datades = $pdf->descarga();
		if (!($datades[0]==null)) { $pdf->imprimeDescarga($headerdes,$datades);}
		
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
