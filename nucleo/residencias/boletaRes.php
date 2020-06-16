
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
	   
	 /*=======================================================================*/  
			function LoadData()
			{				
				$data=[];
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * FROM vresidencias a where a.IDPROY='".$_GET["ID"]."'");				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			function LoadCiclo($ciclo)
			{
				$miConex = new Conexion();		
				$data=[];
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select CICL_DESCRIP from ciclosesc where CICL_CLAVE='".$ciclo."'");
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
				
				$this->setY(-60);				
				$this->SetFont('Montserrat-Medium','B',8);
				$this->Cell(0,0,utf8_decode("CAL. Calificación   Escala de Calificación 0-100; La calificación mínima aprobatoria es 70."),0,0,'L',true);
				$this->setY(-55);
				$this->SetFont('Montserrat-Medium','B',8);
				$this->Cell(0,0,utf8_decode("EN LA CIUDAD DE MACUSPANA ESTADO DE TABASCO A ".date("d")." DE ".$miutil->getMesLetra(date("m"))." DEL AÑO ". date("Y")),0,0,'L',true);
				$this->setY(-45);
				$this->SetFont('Montserrat-Black','B',8);
				$this->Cell(110,5,"",0,0,'R',true);
				$this->Cell(50,5,utf8_decode("ASESOR(A) INTERNO"),"T",0,'C',false);
				

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
		
		$elciclo=$data[0]["CICLO"];
		$dataCiclo = $pdf->LoadCiclo($elciclo);

		$pdf->SetFont('Montserrat-Black','',9);

		$pdf->Ln(10);
		$pdf->Cell(0,0,"ACTA DE CALIFICACIONES DE RESIDENCIA PROFESIONAL",0,1,'C');	
		$pdf->Ln(5);
		$pdf->setX(160);
		$pdf->Cell(15,0,"FOLIO: ",0,0,'L');	
		$pdf->SetFont('Montserrat-Medium','',9);
		$pdf->Cell(15,0,$data[0]["IDPROY"],0,0,'L');	
		$pdf->Ln(5);

		$pdf->SetFillColor(172,31,6);
		$pdf->SetTextColor(255);
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
		$pdf->Cell(130,5,"EMPRESA",1,0,'C',true);
		$pdf->Cell(30,5,"PERIODO",1,1,'C',true);		
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0);
		$pdf->SetFont('Montserrat-Medium','B',9);
		$pdf->SetWidths(array(130, 30));	
		$pdf->Row(array(utf8_decode($data[0]["EMPRESAD"]),utf8_decode($dataCiclo[0]["CICL_DESCRIP"])));

		$pdf->SetFillColor(172,31,6);
		$pdf->SetTextColor(255);
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
		$pdf->Cell(130,5,"PROYECTO",1,0,'C',true);
		$pdf->Cell(30,5,utf8_decode("DURACIÓN"),1,1,'C',true);		
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0);
		$pdf->SetFont('Montserrat-Medium','B',9);
		$pdf->SetWidths(array(130, 30));	
		$pdf->Row(array(utf8_decode($data[0]["PROYECTO"]),utf8_decode($data[0]["INICIA"]." ". $data[0]["TERMINA"])));

		$pdf->SetFillColor(172,31,6);
		$pdf->SetTextColor(255);
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
		$pdf->Cell(80,5,"ASESOR(ES) INTERNO(S)",1,0,'C',true);
		$pdf->Cell(80,5,utf8_decode("ASESOR(ES) EXTERNO(S)"),1,1,'C',true);		
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0);
		$pdf->SetFont('Montserrat-Medium','B',9);
		$pdf->SetWidths(array(80, 80));	
		$pdf->Row(array(utf8_decode($data[0]["ASESOR"]."\n".$data[0]["REVISOR1"]."".$data[0]["RESVISOR2"]),utf8_decode($data[0]["ASESOREXT"])));
		
		$pdf->Ln(5);
		$pdf->SetFillColor(172,31,6);
		$pdf->SetTextColor(255);
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
		$pdf->Cell(10,5,"NO.",1,0,'C',true);
		$pdf->Cell(20,5,utf8_decode("CONTROL"),1,0,'C',true);		
		$pdf->Cell(60,5,"ESTUDIANTES",1,0,'C',true);
		$pdf->Cell(30,5,utf8_decode("CARRERA"),1,0,'C',true);	
		$pdf->Cell(10,5,"CAL.",1,0,'C',true);
		$pdf->Cell(30,5,utf8_decode("OBSERVACIONES"),1,1,'C',true);	


		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0);
		$pdf->SetFont('Montserrat-Medium','B',8);

		$n=1;
		$pdf->SetWidths(array(10, 20,60,30,10,30));	
		foreach ($data as $valor) {			
			$lacal=	utf8_decode($data[0]["CALIF"]);
			if ($_GET["concal"]=='N') {$lacal='';}		
			$pdf->Row(array($n,
				            utf8_decode($data[0]["MATRICULA"]),
							utf8_decode($data[0]["NOMBRE"]),
							utf8_decode($data[0]["CARRERAD"]),
						     $lacal,
							utf8_decode($data[0]["OBS"])
							)
					 );
			$n++;
		}


		$estoy=$pdf->getY();
		$pdf->Cell(10,(209-$estoy),"",1,0,'C',true);
		$pdf->Cell(20,(209-$estoy),"",1,0,'C',true);		
		$pdf->Cell(60,(209-$estoy),"",1,0,'C',true);
		$pdf->Cell(30,(209-$estoy),"",1,0,'C',true);	
		$pdf->Cell(10,(209-$estoy),"",1,0,'C',true);
		$pdf->Cell(30,(209-$estoy),"",1,1,'C',true);

		
		
		$pdf->Output(); 
		

 } else {header("Location: index.php");}
 
 ?>
