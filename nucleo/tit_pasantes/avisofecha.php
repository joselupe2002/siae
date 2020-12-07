
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
   	       
			function LoadDatosPas()
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select * FROM vtit_pasantes WHERE MATRICULA='".$_GET["alumno"]."'";
              // echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
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
				

				$this->SetY(20);$this->SetX(25);
				$this->Cell(40,15,"",1,0,'L',false);
				$this->SetFont('Times','B',9);
				$this->Cell(90,3,utf8_decode("FORMATO DE AVISO DE HORA Y FECHA DE "),"TRL",0,'C',false);
				$this->Cell(40,15,"",1,0,'L',false);
				
				$this->SetY(23);$this->SetX(65);
				$this->Cell(90,3,utf8_decode("REALIZACIÓN DE ACTO PROFESIONAL"),"B",0,'C',false);
				$this->SetY(26);$this->SetX(65);
				$this->SetFillColor(242,242,242);
				$this->Cell(90,9,utf8_decode("IT-ACA-02-F2"),1,0,'C',true);
				$this->Image('../../imagenes/empresa/pie1.png',28,22,23,11);
				
				$this->SetFont('Times','',9);
				$this->SetY(20);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("PÁG. 1 DE 2"),"TRL",0,'C',false);
				$this->SetY(23);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("REVISIÓN NO. 02"),"B",0,'C',false);
				$this->SetY(26);$this->SetX(155);
				$this->Cell(40,3,"VIGENTE A PARTIR DEL","",0,'C',false);
				$this->SetY(29);$this->SetX(155);
				$this->Cell(40,3,"8 DE ENERO 2020","",0,'C',false);
				$this->SetY(32);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("VERSIÓN 2015"),"",0,'C',false);
				
				
			}
			
			
			function Footer()
			{
				
		
				$miutil = new UtilUser();
				$pstotit=$miutil->getJefe('701');
				$pstosub=$miutil->getJefe('304');
		
				//249 ANCHO			
				$this->SetFont('Times','',12);
				$this->SetDrawColor(0,0,0);
				$this->SetX(20);
				$this->SetY(-80);
				$this->Cell(90,4,utf8_decode("ATENTAMENTO"),'',0,'C',false);
				$this->Cell(90,4,utf8_decode("VO. BO."),'',0,'C',false);

				$this->SetY(-60);
				$this->Cell(90,4,utf8_decode("COORDINADOR(A) DE TITULACIÓN"),'',0,'C',false);
				$this->Cell(90,4,utf8_decode("SUBDIRECTOR ACADÉMICO"),'',0,'C',false);
				
				$this->SetY(-55);
				$this->Cell(90,4,utf8_decode($pstotit),'',0,'C',false);
				$this->Cell(90,4,utf8_decode($pstosub),'',0,'C',false);
			
				$this->SetFont('Times','B',10);
				$this->SetY(-45);
				$this->MultiCell(0,4,utf8_decode("NOTA: Deberá asistir con traje sastre para darle la formalidad y respeto necesario al acto protocolario ya que así lo indica el reglamento."),0,'J',FALSE);



				$this->SetFont('Times','',8);
				$this->SetY(-30);
				$this->MultiCell(0,4,utf8_decode("c.c.p. Egresado"),0,'J',FALSE);
				$this->SetY(-27);
				$this->MultiCell(0,4,utf8_decode("c.c.p. Archivo"),0,'J',FALSE);
			}
			
			
			
			
			
			
   }
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Times','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,25); 
		$pdf->AddPage();

		$miutil = new UtilUser();
		$dataP = $pdf->LoadDatosPas();
		$dataGen =$pdf->LoadDatosGen();
		
		$fechadec=$miutil->formatFecha($dataP[0]["FECHA_TIT"]);
		$eldia=date("d", strtotime($fechadec));
		$elmes=strtoupper($miutil->getFecha($fechadec,'MES'));
		$elanio=date("Y", strtotime($fechadec));

		$fechaof=date("d", strtotime($fechadec))."/".$miutil->getFecha($fechadec,'MES'). "/".date("Y", strtotime($fechadec));
		
		$pdf->Ln(25);    
		$pdf->SetFont('Times','',12);
		$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');	
		$pdf->Ln(10);
		
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(0,0,"C. INTEGRANTE DEL JURADO",0,1,'L');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("PRESIDENTE: ".$dataP[0]["PRESIDENTED"]),0,1,'L');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("SECRETARIO: ".$dataP[0]["SECRETARIOD"]),0,1,'L');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("VOCAL: ".$dataP[0]["VOCALD"]),0,1,'L');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("VOCAL SUPLENTE: ".$dataP[0]["VOCALSUPLENTED"]),0,1,'L');	
		$pdf->Ln(5);
		$pdf->Ln(5);

		$pdf->SetFont('Times','',12);
		$pdf->MultiCell(0,10,utf8_decode("Por este medio le informo que el acto de Recepción Profesional del C.".
		$dataP[0]["PASANTE"]." con No. De control ".$dataP[0]["MATRICULA"]." egresado(a) del ".$dataGen[0]["inst_razon"].
		", pasante  de la carrera de ".$dataP[0]["CARRERAD"].". Se realizará el Día ".$eldia." de ".$elmes." de ".$elanio.
		" a las ".$dataP[0]["HORA_TIT"]." HORAS ".
		" por la opción de ".$dataP[0]["OPCIOND"]." en ".$dataP[0]["SALA_TIT"].
		" de este instituto. Por lo que se le pide su puntual asistencia."),0,'J',FALSE);

		
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
