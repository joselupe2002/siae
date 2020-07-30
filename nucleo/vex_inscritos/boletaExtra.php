
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
				$data=[];
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select a.*, b.*, getPeriodos(MATRICULA,getciclo()) as PERIODO ".
				" from vex_inscritos a, ciclosesc b ".
				" where CICLO=CICL_CLAVE AND MATRICULA='".$_GET["matricula"]."'");				
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
				 // 

				$this->SetY(20);$this->SetX(25);
				$this->Cell(40,15,"",1,0,'L',false);
				$this->SetFont('Times','B',11);
				$this->Cell(90,3,utf8_decode("FORMATO DE BOLETA DE"),"TRL",0,'C',false);
				$this->Cell(40,15,"",1,0,'L',false);
				
				$this->SetY(23);$this->SetX(65);
				$this->Cell(90,3,utf8_decode("ACREDITACIÓN DE ACTIVIDADES"),"LR",0,'C',false);

				$this->SetY(26);$this->SetX(65);
				$this->Cell(90,3,utf8_decode("DEPORTIVAS-CULTURALES"),"B",0,'C',false);


				$this->SetY(29);$this->SetX(65);
				$this->SetFillColor(242,242,242);
				$this->Cell(90,6,utf8_decode("IT-VIN-05-F-04"),1,0,'C',true);
				$this->Image('../../imagenes/empresa/pie1.png',28,22,23,11);
				
				$this->SetFont('Times','',9);
				$this->SetY(23);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("PÁG. 1 DE 1"),"",0,'C',false);
				$this->SetY(26);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("REVISIÓN NO. 00"),"B",0,'C',false);
				$this->SetY(29);$this->SetX(155);
				$this->Cell(40,3,"VIGENTE A PARTIR DEL","",0,'C',false);
				$this->SetY(32);$this->SetX(155);
				$this->Cell(40,3,"22 DE FEBRERO 2018","",0,'C',false);
			
				
				
			}
			
			
			function Footer()
			{
				
				//249 ANCHO			
				$this->SetDrawColor(0,0,0);
				$this->SetX(10);
				$this->SetY(-40);
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
		
		$pdf->SetFont('Arial','',11);
		$pdf->Cell(0,0,utf8_decode("ÁREA DE ACTIVIDADES DEPORTIVAS-CULTURALES"),"",0,'C',false);
		$pdf->Ln(15);
		
		$pdf->Cell(170,5,utf8_decode("BOLETA DE ACREDITACIÓN DE ACTIVIDADES DEPORTIVAS-CULTURALES"),1,1,'C',false);

		$pdf->Cell(40,10,utf8_decode("NO. DE CONTROL:"),1,0,'L',false);
		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(45,10,utf8_decode($data[0]["MATRICULA"]),1,0,'L',false);
		$pdf->SetFont('Arial','',11);
		$pdf->Cell(40,10,utf8_decode("PERIODO ESCOLAR:"),1,0,'L',false);
		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(45,10,utf8_decode($data[0]["CICL_DESCRIP"]),1,1,'L',false);

		$pdf->SetFont('Arial','',11);
		$pdf->Cell(40,10,utf8_decode("NOMBRE:"),1,0,'L',false);
		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(130,10,utf8_decode($data[0]["NOMBRE"]),1,1,'L',false);

		$pdf->SetFont('Arial','',11);
		$pdf->Cell(40,10,utf8_decode("ESPECIALIDAD:"),1,0,'L',false);
		$pdf->SetFont('Arial','B',10);
		$pdf->Cell(95,10,utf8_decode($data[0]["CARRERA"]),1,0,'L',false);
		$pdf->SetFont('Arial','',11);
		$pdf->Cell(25,10,utf8_decode("SEMESTRE:"),1,0,'L',false);
		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(10,10,utf8_decode($data[0]["PERIODO"]),1,1,'L',false);


		$pdf->SetFont('Arial','',11);
		$pdf->Cell(40,10,utf8_decode("ACTIVIDAD:"),1,0,'L',false);
		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(130,10,utf8_decode($_GET["actividad"]),1,1,'L',false);

		$pdf->SetFont('Arial','',11);
		$pdf->Cell(40,10,utf8_decode("RESULTADO:"),1,0,'L',false);
		$pdf->SetFont('Arial','B',11);
		$pdf->Cell(130,10,utf8_decode($_GET["valor"]),1,1,'L',false);


		$pdf->SetFont('Arial','',8);
		$pdf->Cell(56,10,"","TLR",0,'L',false);
		$pdf->Cell(57,10,"","TLR",0,'L',false);
		$pdf->Cell(57,10,"","TLR",1,'L',false);
		$pdf->Cell(56,20,"","LR",0,'L',false);
		$pdf->Cell(57,20,"","LR",0,'L',false);
		$pdf->Cell(57,20,"","LR",1,'L',false);
		$pdf->Cell(56,5,"","LR",0,'L',false);
		$pdf->Cell(57,5,utf8_decode("JEFE(A) DE VINCULACIÓN, GESTIÓN Y"),"LR",0,'C',false);
		$pdf->Cell(57,5,"","LR",1,'L',false);

		$pdf->Cell(56,5,utf8_decode("FECHA"),"BLR",0,'L',false);
		$pdf->Cell(57,5,utf8_decode("EXTENSIÓN"),"BLR",0,'C',false);
		$pdf->Cell(57,5,utf8_decode("SELLO"),"BLR",1,'L',false);
		$pdf->ln(30);
	
		$pdf->Cell(170,5,utf8_decode("NOTA. * CONSERVE ESTA BOLETA SE LE SOLICITARÁ EN LA REALIZACIÓN DE OTROS TRÁMITES"),0,1,'L',false);
		
		$pdf->ln(50);
		$pdf->Cell(170,5,utf8_decode("c.c.p.. Expediente del Alumno"),0,1,'L',false);
	

		
		
		/*
		$pdf->MultiCell(0,5,utf8_decode("REVISIÓN Y VALIDACIÓN DE LA  INSTRUMENTACIÓN DIDÁCTICA PARA LA FORMACIÓN Y DESARROLLO DE ").
		utf8_decode("COMPETENCIAS PROFESIONALES DIGITAL Y REGISTRO DE PLANEACIÓN DIDÁCTICA EN EL SIE"),0,'C', false);
		
		$pdf->Ln(5);
		$pdf->SetX(100);$pdf->SetY(90);
		$pdf->Cell(0,0,"PERIODO: ".$_GET["ciclod"],"",0,'C',false);
		
		$header= array('N', 'ASIGANTURA', 'PROGRAMA','NO. DE COMPETENCIAS');
		$data = $pdf->LoadData();
		$pdf->imprimeCargaAcad($header,$data);
		
		if ($_GET["tipo"]=='DEPTO') {
		    $dataEmpl = $pdf->getDatosPersona($_GET["profesor"]);		
		    $pdf->eljefe=$dataEmpl[0]["EMPL_JEFEABREVIA"]." ".$dataEmpl[0]["EMPL_JEFED"]; }
		else {
			$dataEmpl = $pdf->getJefeCarrera($_GET["tipov"]);
			$pdf->eljefe=$dataEmpl[0]["EMPL_JEFEABREVIA"]." ".$dataEmpl[0]["EMPL_JEFED"];
		}
		
		*/
	
		
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
