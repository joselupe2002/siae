
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
   	
   	/*========================================================================================================*/
   	        
   	     var $eljefe="";
   	       
   	      
        
   	
			function LoadData()
			{				
				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vss_alumnos a where  ID=".$_GET["id"]);				
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
				//$miutil = new UtilUser();
				//$miutil->getEncabezado($this,'V');	
				$this->SetY(20);$this->SetX(25);
				$this->Cell(40,15,"",1,0,'L',false);
				$this->SetFont('Times','B',9);
				$this->Cell(90,3,utf8_decode("CARTA COMPROMISO"),"TRL",0,'C',false);
				$this->Cell(40,15,"",1,0,'L',false);
				
				$this->SetY(23);$this->SetX(65);
				$this->Cell(90,3,utf8_decode(""),"B",0,'C',false);
				$this->SetY(26);$this->SetX(65);
				$this->SetFillColor(242,242,242);
				$this->Cell(90,9,"IT - VIN - 02 - F - 02",1,0,'C',true);
				$this->Image('../../imagenes/empresa/pie1.png',28,22,23,11);
				
				$this->SetFont('Times','',9);
				$this->SetY(20);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("PÁG. 1 DE 2"),"TRL",0,'C',false);
				$this->SetY(23);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("REVISIÓN NO. 01"),"B",0,'C',false);
				$this->SetY(26);$this->SetX(155);
				$this->Cell(40,3,"VIGENTE A PARTIR DEL","",0,'C',false);
				$this->SetY(29);$this->SetX(155);
				$this->Cell(40,3,"11 DE JUNIO 2018","",0,'C',false);
				$this->SetY(32);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("VERSIÓN 2015"),"",0,'C',false);

				
				//Para cuando las tablas estas no se coirten 
				$this->SetX(20);
				$this->Ln(5);
			}

			function Footer()
			{				
				//$miutil = new UtilUser();
				//$miutil->getPie($this,'V');
				
			}
		
			
   }
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Times','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,25); 
		$pdf->AddPage();
		
		
		$pdf->SetY(50);
		$data = $pdf->LoadData();
		
		$pdf->SetFont('Times','B',10);


		$pdf->Cell(0,5,utf8_decode("FECHA:".$data[0]["FECHACOM"]),"",1,'R',false);



		$pdf->Cell(170,3,utf8_decode("CARTA COMPROMISO"),"",1,'C',false);
		$pdf->Ln(10);
		$pdf->MultiCell(170,5,utf8_decode("Con el fin de dar cumplimiento a lo establecido en la Ley Reglamentaria del Artículo 5° Constitucional relativo al ejercicio de profesiones, el suscrito:"),"",'J',false);
		$pdf->Ln(10);
	

		$pdf->Cell(25,10,utf8_decode("Nombre:"),"1",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(95,10,utf8_decode($data[0]["NOMBRE"]),"1",0,'L',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(25,10,utf8_decode("No. de Control:"),"1",0,'L',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(25,10,utf8_decode($data[0]["MATRICULA"]),"1",1,'L',false);

		$pdf->Cell(25,10,utf8_decode("Carrera:"),"1",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(95,10,utf8_decode($data[0]["CARRERAD"]),"1",0,'L',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(25,10,utf8_decode("Semestre:"),"1",0,'L',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(25,10,utf8_decode($data[0]["PERIODOS_INS"]),"1",1,'L',false);


		$pdf->Cell(25,10,utf8_decode("Dependencia:"),"1",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(145,10,utf8_decode($data[0]["EMPRESA"]),"1",1,'L',false);
		$pdf->SetFont('Times','B',10);

		$pdf->Ln(10);
		$pdf->SetFont('Times','',12);
		$pdf->MultiCell(170,7,utf8_decode("Me comprometo a realizar el Servicio Social acatando la Normatividad establecida por el Instituto Tecnológico Superior de Macuspana y llevarlo a cabo en el lugar y periodos manifestados, así como, a participar con mis conocimientos e iniciativa en las actividades que desempeñe, procurando dar imagen positiva del Instituto Tecnológico en la dependencia oficial, de no hacerlo así, quedo enterado(a) de la cancelación respectiva, la cual procederá automáticamente."),"",'J',false);

		$miutil = new UtilUser();
		$fechadecof=$miutil->formatFecha($data[0]["FECHACOM"]);
		$fechapie=date("d", strtotime($fechadecof))." de ".strtolower($miutil->getMesLetra(date("m", strtotime($fechadecof))))." del ". date("Y", strtotime($fechadecof));

		$pdf->Ln(5);
		$pdf->MultiCell(170,5,utf8_decode("En la ciudad de Macuspana, Tabasco, ".
		"del día ".$fechapie),"",'J',false);
		
		$pdf->SetFont('Times','B',12);
		$pdf->Ln(15);
		$pdf->Cell(170,7,utf8_decode("Firma de Conformidad"),"","",'C',false);

		$pdf->Ln(15);
		$pdf->Cell(170,7,utf8_decode(utf8_decode($data[0]["NOMBRE"])),"","",'C',false);

		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
