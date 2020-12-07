
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

				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vtit_pasantes where  MATRICULA='".$_GET["alumno"]."'");				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}


			function LoadRequisitos($op)
			{				
				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vtit_opcionreq where IDOPCION='".$op."' order by ORDEN");				
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
                //Para que cuando se cambie a la otra pagina empiece a la derecha y la stablas no se descuadren
                $this->SetX(10);
                $this->Ln(5);	
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
		$pdf->SetAutoPageBreak(true,50); 
		$pdf->AddPage();
	
	
		$miutil = new UtilUser();
        $pstotit=$miutil->getJefe('303');//Nombre del puesto de coordinacion de titulacion 


		$data = $pdf->LoadData();
		$dataGen = $pdf->LoadDatosGen();

		
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("COMPROBANTE DE NO ADEUDO"),"",0,'C',false);
		$pdf->Ln(5);


		$pdf->SetFont('Montserrat-Medium','',10);
	
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraBold','',10);
		$pdf->MultiCell(0,5,utf8_decode("EL C. ".$data[0]["PASANTE"]." DE LA CARRERA DE: ".
		                $data[0]["CARRERAD"]." NO. DE CONTROL ".$data[0]["MATRICULA"]." NO ADEUDA MATERIAL EN: "),0,'J',false);
		 

		$pdf->Ln(5);
		$pdf->Cell(66,5,utf8_decode("DEPARTAMENTO:"),"1",0,'L',false);
		$pdf->Cell(50,5,utf8_decode("NOMBRE ENCARGADO"),"1",0,'L',false);
		$pdf->Cell(50,5,utf8_decode("FIRMA"),"1",0,'L',false);
		$pdf->Ln(5);

		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(66,15,utf8_decode("CENTRO DE INFORMACIÓN"),"1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Ln();

		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(66,15,utf8_decode("RECURSOS FINANCIEROS"),"1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Ln();

		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(66,15,utf8_decode("ACTIVIDADES EXTRAESCOLARES"),"1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Ln();

		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(66,15,utf8_decode("LABORATORIO DE COMPUTO"),"1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Ln();

		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(66,15,utf8_decode("LABORATORIO MULTIFUNCIONAL"),"1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Ln();
   
		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(66,15,utf8_decode("DESARROLLO ACADÉMICO"),"1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Cell(50,15,"","1",0,'L',false);
		$pdf->Ln(30);
		
		
		$pdf->Cell(80,3,"FECHA: ___________________         FIRMA: ___________________ ","",1,'L',false);

	
		$pdf->Ln(10);

						
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
