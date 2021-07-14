
<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	require('../../fpdf/PDF_WriteTag.php');
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";
	

	
	
	class PDF extends PDF_WriteTag {
   	
		/*========================================================================================================*/
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
		
   	
   	        var $eljefe="";
   	        var $eljefepsto="";
			var $inicia="";
			var $termina="";

			var $eldocente="";
	


			
			function LoadCorte()
			{				
				$miConex = new Conexion();
				$elsql="SELECT * FROM ecortescal where ID='".$_GET['corte']."'";
				
				$resultado=$miConex->getConsulta($_SESSION['bd'],$elsql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}


			function LoadCiclo()
			{				
				$miConex = new Conexion();
				$elsql="SELECT * FROM ciclosesc where CICL_CLAVE='".$_GET['ciclo']."'";
				
				$resultado=$miConex->getConsulta($_SESSION['bd'],$elsql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}


			function LoadDatos()
			{		
				$data=[];		
				$miConex = new Conexion();
				$elsql="SELECT c.ALUCTR as MATRICULA, concat(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE,".
				"a.TIPO, a.OBS, b.DESCRIP FROM tut_motrepalum a, tut_catmotrep b, dlista c, ".
				" falumnos d where a.TIPO=b.ID and a.IDCORTE='".$_GET["corte"]."'  AND IDDETALLE=c.ID and ALUCTR=ALUM_MATRICULA ".
				" AND c.IDGRUPO='".$_GET["id"]."'";

				$resultado=$miConex->getConsulta($_SESSION['bd'],$elsql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}


			function LoadDatosAg()
			{		
				$data=[];		
				$miConex = new Conexion();
				$elsql=" SELECT b.CORTO, b.DESCRIP, COUNT(*) AS TOTAL FROM tut_motrepalum a, tut_catmotrep b, dlista c, ".
				" falumnos d where a.TIPO=b.ID and a.IDCORTE='".$_GET["corte"]."' AND IDDETALLE=c.ID and ALUCTR=ALUM_MATRICULA ".
				" AND c.IDGRUPO='".$_GET["id"]."' GROUP BY b.CORTO, b.DESCRIP";
			
				$resultado=$miConex->getConsulta($_SESSION['bd'],$elsql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

			 

	
			
			function LoadDatosMateria()
			{		
				$data=[];		
				$miConex = new Conexion();
				$elsql="SELECT * from vedgrupos where IDDETALLE='".$_GET["id"]."'";

				$resultado=$miConex->getConsulta($_SESSION['bd'],$elsql);				
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
		
	
		 
		$dataCorte = $pdf->LoadCorte();
		$dataCiclo = $pdf->LoadCiclo();
		$dataMateria = $pdf->LoadDatosMateria();

		
		$dataAg = $pdf->LoadDatosAg();
		$data = $pdf->LoadDatos();
		$pdf->inicia=$dataCorte[0]["INICIA"];
		$pdf->termina=$dataCorte[0]["TERMINA"];


		$pdf->SetStyle("p","Montserrat-Medium","",10,"0,0,0");
        $pdf->SetStyle("vs","Montserrat-Medium","U",10,"0,0,0");
		$pdf->SetStyle("vsb","Montserrat-ExtraBold","UB",10,"0,0,0");
    

		$pdf->Ln();
		$pdf->SetFont('Montserrat-ExtraBold','',9);
		$pdf->Cell(0,0,utf8_decode("MOTIVOS DE REPROBACIÓN DE ASIGNATURA"),0,1,'C');	
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-SemiBold','',9);
		$pdf->Cell(0,0,utf8_decode("REPORTE PARCIAL - OPINIÓN DE LOS ALUMNOS"),0,1,'C');	
		$pdf->Ln(10);
	
		$pdf->Cell(40,0,utf8_decode("CORTE: "),0,0,'L');
		$pdf->Cell(130,0,utf8_decode($dataCorte[0]["DESCRIPCION"]." FECHAS ".$dataCorte[0]["INICIA"]." ".$dataCorte[0]["TERMINA"]),0,1,'L');
		$pdf->Ln(5);
		$pdf->Cell(40,0,utf8_decode("MATERIA: "),0,0,'L');
		$pdf->Cell(130,0,utf8_decode($dataMateria[0]["MATERIA"]." ".$dataMateria[0]["MATERIAD"]),0,1,'L');
		$pdf->Ln(5);
		$pdf->Cell(40,0,utf8_decode("PROFESOR: "),0,0,'L');
		$pdf->Cell(130,0,utf8_decode($dataMateria[0]["PROFESOR"]." ".$dataMateria[0]["PROFESORD"]),0,1,'L');


		$pdf->Ln(5);
		$pdf->SetFillColor(172,31,6);
		$pdf->SetTextColor(255);
		$pdf->SetDrawColor(0,0,0);
		$pdf->SetLineWidth(.2);
		
				$header = array('MATRICULA', 'NOMBRE', 'MOTIVO','OBSERVACIONES');		
				$w = array(20,50,50,50);
				$pdf->SetFont('Montserrat-ExtraBold','B',7);
				$pdf->SetWidths(array(20,50,50,50));	
				for($i=0;$i<count($header);$i++)
					$pdf->Cell($w[$i],7,$header[$i],1,0,'C',true);
					$pdf->Ln();
					// Restauraci�n de colores y fuentes
					$pdf->SetFillColor(255,255,255);
					$pdf->SetTextColor(0);
					$pdf->SetFont('');
					// Datos
					$fill = false;
					$pdf->SetFont('Montserrat-Medium','',6);
					$suma=0;
					$alto=3;
					if ($data) {
						foreach($data as $row)
						{
							//$this->setX(10);
							$pdf->Row(array(utf8_decode($row["MATRICULA"]),
											utf8_decode($row["NOMBRE"]),
											utf8_decode($row["DESCRIP"]),
											utf8_decode($row["OBS"])
							));
						}
					}
			

		//Tabla agrupada

		$pdf->Ln(5);
		$pdf->SetFillColor(172,31,6);
		$pdf->SetTextColor(255);
		$pdf->SetDrawColor(0,0,0);
		$pdf->SetLineWidth(.2);
		
		$header = array('CVE', 'TIPO', 'TOTAL');		
		$w = array(10,60,10);
		$pdf->SetFont('Montserrat-ExtraBold','B',6);
		$pdf->SetWidths(array(10,60,10));	
		for($i=0;$i<count($header);$i++)
			$pdf->Cell($w[$i],7,$header[$i],1,0,'C',true);
			$pdf->Ln();
			// Restauraci�n de colores y fuentes
			$pdf->SetFillColor(255,255,255);
			$pdf->SetTextColor(0);
			$pdf->SetFont('');
			
			// Datos
			$fill = false;
			$pdf->SetFont('Montserrat-Medium','',6);
			$pdf->SetAligns('C','L','C');
			$suma=0;
			$alto=3;
			if ($data) {
				foreach($dataAg as $rowAg)
				{
					//$this->setX(10);
					$pdf->Row(array(utf8_decode($rowAg["CORTO"]),
									utf8_decode($rowAg["DESCRIP"]),
									utf8_decode($rowAg["TOTAL"])
					));
				}
			}


		$pdf->Output(); 

 } else {header("Location: index.php");}
 
 ?>
