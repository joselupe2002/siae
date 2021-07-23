
<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	require('../../fpdf/PDF_Code128.php');
    include("../.././includes/barcode.php");
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";
	

	
	
	class PDF extends PDF_Code128  {
       
        
        function parseVar($key='',$value='') {
            if(empty($key) or empty($value)) return;
            $nb = $this->page;
            for($n=1;$n<=$nb;$n++) {
               $this->pages[$n] = str_replace($key,$value,$this->pages[$n]);
            }
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
                $h=4*$nb;
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
	
   	
   	    /*============================================*/
			function LoadDatos()
			{		
				$data=[];		
				$miConex = new Conexion();
				$elsql="SELECT * from vbib_ejemplares where ID>=".$_GET["ini"]." and ID<=".$_GET["fin"];

		
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
			

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,5); 
		$pdf->AddPage();
		
	
		$data = $pdf->LoadDatos();
	

		$pdf->Ln();
		$pdf->SetFont('Arial','',8);
		$pdf->setY(10);
		
		$lin=12;
		$col=5;
		foreach($data as $row) {
			$pdf->setX($col);
			$pdf->Cell(25,5,utf8_decode($row["CLASIFICACION"]),0,0,'L');	
			$pdf->Cell(35,5,utf8_decode("CENTRO DE INFORMACIÓN"),0,0,'L');	
			$pdf->setX($col+70);
			$pdf->Cell(25,5,utf8_decode($row["CLASIFICACION"]),0,0,'L');	
			$pdf->Cell(35,5,utf8_decode("CENTRO DE INFORMACIÓN"),0,0,'L');	
			$pdf->setX($col+140);
			$pdf->Cell(25,5,utf8_decode($row["CLASIFICACION"]),0,0,'L');	
			$pdf->Cell(35,5,utf8_decode("CENTRO DE INFORMACIÓN"),0,1,'L');	



			$pdf->setX($col);
			$pdf->Cell(25,5,utf8_decode($row["SECCIOND"]),0,0,'L');
			$pdf->Cell(35,5,utf8_decode("EJ.".$row["EJEMPLAR"]),0,0,'L');
			$pdf->setX($col+70);
			$pdf->Cell(25,5,utf8_decode($row["SECCIOND"]),0,0,'L');
			$pdf->Cell(35,5,utf8_decode("EJ.".$row["EJEMPLAR"]),0,0,'L');
			$pdf->setX($col+140);
			$pdf->Cell(25,5,utf8_decode($row["SECCIOND"]),0,0,'L');
			$pdf->Cell(35,5,utf8_decode("EJ.".$row["EJEMPLAR"]),0,1,'L');


			$pdf->setX($col);
			$pdf->Cell(25,5,utf8_decode($row["ID"]),0,0,'L');
			$pdf->Code128(35,$lin+10,$row["ID"],30,8);

			$pdf->setX($col+70);
			$pdf->Cell(25,5,utf8_decode($row["ID"]),0,0,'L');
			$pdf->Code128(35+70,$lin+10,$row["ID"],30,8);

			$pdf->setX($col+140);
			$pdf->Cell(25,5,utf8_decode($row["ID"]),0,0,'L');
			$pdf->Code128(35+140,$lin+10,$row["ID"],30,8);

			
			$lin+=25;
			$pdf->setY($lin);

			if ($lin>=250) {
				$pdf->AddPage();
				$lin=12;
				$col=5;
				$pdf->setY($lin);
			}

		}

		$pdf->Output(); 

 } else {header("Location: index.php");}
 
 ?>
