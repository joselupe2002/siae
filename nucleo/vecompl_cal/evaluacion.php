
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
   	      
   	      
   	        
   	        var $eljefe="";
   	        var $responsable="";
   	        var $eljefepsto="";
 
   	
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vecompl_cal where IDCAL=".$_GET["ID"]);				
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
			
			
			// Tabla coloreada
			function getCal($lacal)
			{
		      $calif=[]; 
			  
			  for($i=0;$i<5;$i++) { 
			  	   $calif[$i]=""; 
			  	   if  ($i==$lacal) {$calif[$i]="X";}
			  }
			 return $calif; 
											
			}// Fin de funcion 
			
			
		
		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
		$pdf->AddPage();
		
	
		 
		$data = $pdf->LoadData();
		$dataGen = $pdf->LoadDatosGen();
		
		$miutil = new UtilUser();
		
	
        $fechadec=$miutil->formatFecha($data[0]["INICIA"]);
        $fechaini=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
        
        $fechadec=$miutil->formatFecha($data[0]["TERMINA"]);
        $fechafin=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
        
        $pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Ln(10);
        $pdf->Cell(0,0,"FORMATO DE EVALUACIÓN AL DESEMPEÑO DE LA ACTIVIDAD",0,1,'C');
        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-SemiBold','',10);
        $pdf->setX(20); $pdf->Cell(0,0,"Nombre del estudiante: ",0,0,'L');
        $pdf->setX(75); $pdf->Cell(0,0,utf8_decode($data[0]["MATRICULAD"]),0,1,'L');
        $pdf->Ln(5);
        $pdf->setX(20); $pdf->Cell(0,0,"Actividad Complementaria: ",0,1,'L');
        $pdf->setX(75); $pdf->Cell(0,0,utf8_decode($data[0]["ACTIVIDADD"]),0,1,'L');
        $pdf->Ln(5);
        $pdf->setX(20); $pdf->Cell(0,0,"Periodo de Realización: ",0,1,'L');
        $pdf->setX(75); $pdf->Cell(0,0,utf8_decode(" Del ".$fechaini." al ".$fechafin),0,1,'L');
        $pdf->Ln(10);
        
        
        $pdf->SetFont('Montserrat-ExtraBold','B',7);
        $header = array("No.","Criterios a Evealuar","Insuficiente","Suficiente","Bueno","Notable","Excelente");
        $w = array(10, 65, 18,18,18,18,18);
        $pdf->SetWidths(array(10, 65, 18,18,18,18,18));
        $pdf->SetAligns(array("C","J","C","C","C","C","C"));
        
        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(255);
        $pdf->SetDrawColor(0,0,0);
        $pdf->SetLineWidth(.2);
        
        for($i=0;$i<7;$i++)
        	$pdf->Cell($w[$i],7,$header[$i],1,0,'C',true);
        
        	$pdf->Ln();
        	$pdf->SetFillColor(255,255,255);
        	$pdf->SetTextColor(0);
        	$pdf->SetFont('Montserrat-Medium','',10);
        
        	$cal=$pdf->getCal($data[0]["CAL1"]);
        	$pdf->Row(array("1",
        			       "Cumple en tiempo y forma con las actividades encomendadas alcanzando los objetivos.",
        			        $cal[0],
        					$cal[1],
        					$cal[2],
        					$cal[3],
        					$cal[4]));
        			
        	$cal=$pdf->getCal($data[0]["CAL2"]);
        	$pdf->Row(array("2",
        			"Trabaja en equipo y se adapta a nuevas situaciones.",
        			$cal[0],
        			$cal[1],
        			$cal[2],
        			$cal[3],
        			$cal[4]));
        	
        	$cal=$pdf->getCal($data[0]["CAL3"]);
        	$pdf->Row(array("3",
        			"Muestra liderazgo en las actividades encomendadas.",
        			$cal[0],
        			$cal[1],
        			$cal[2],
        			$cal[3],
        			$cal[4]));
        	
        	$cal=$pdf->getCal($data[0]["CAL4"]);
        	$pdf->Row(array("4","Organiza su tiempo y trabaja de manera proactiva.",
        			$cal[0],
        			$cal[1],
        			$cal[2],
        			$cal[3],
        			$cal[4]));
        	
        	$cal=$pdf->getCal($data[0]["CAL5"]);
        	$pdf->Row(array("5",
        			"Interpreta la realidad y se sensibiliza aportando soluciones a la problemática con la actividad complementaria.",
        			$cal[0],
        			$cal[1],
        			$cal[2],
        			$cal[3],
        			$cal[4]));
        	
        	$cal=$pdf->getCal($data[0]["CAL6"]);
        	$pdf->Row(array("6",
        			"Realiza sugerencias innovadoras para beneficio o mejora del programa en el que participa.",
        			$cal[0],
        			$cal[1],
        			$cal[2],
        			$cal[3],
        			$cal[4]));
        	
        	$cal=$pdf->getCal($data[0]["CAL7"]);
        	$pdf->Row(array("7",
        			"Tiene iniciativa para ayudar en las actividades encomendadas y muestra espíritu de servicio.",
        			$cal[0],
        			$cal[1],
        			$cal[2],
        			$cal[3],
        			$cal[4]));
        	
        	$pdf->MultiCell(array_sum($w),7,"Observaciones: ".$data[0]["OBS"],"TLR",1,'J',true);
        	$pdf->Cell(array_sum($w),7,"___________________________________________________________________________________________","LR",1,'L',true);
        	$pdf->Cell(array_sum($w),7,"___________________________________________________________________________________________","LR",1,'L',true);
        	$pdf->Cell(array_sum($w),7,"Valor Numérico de la actividad Complementaria: ".$data[0]["PROM"],"LR",1,'L',true);
        	$pdf->Cell(array_sum($w),7,"Nivel de desempeño alcanzado de la actividad complementaria: ".$data[0]["PROML"],"LRB",0,'L',true);
      			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
