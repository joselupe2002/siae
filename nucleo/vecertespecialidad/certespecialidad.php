
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
       
        
        function parseVar($key='',$value='') {
            if(empty($key) or empty($value)) return;
            $nb = $this->page;
            for($n=1;$n<=$nb;$n++) {
               $this->pages[$n] = str_replace($key,$value,$this->pages[$n]);
            }
         }

        var $widths;
        var $aligns;
        var $border;
        var $fondo;

        function SetWidths($w) {$this->widths=$w;}
        
        function SetAligns($a) {$this->aligns=$a;}

        function SetBorder($bor) {$this->border=$bor;}

        function SetFondo($fon) {$this->fondo=$fon;}
        
        function Row($data)
        {
            //Calculate the height of the row
            $nb=0;
            for($i=0;$i<count($data);$i++)
                $nb=max($nb,$this->NbLines($this->widths[$i],$data[$i]));
                $h=3*$nb;
                //Issue a page break first if needed
                $this->CheckPageBreak($h);
                //Draw the cells of the row
                for($i=0;$i<count($data);$i++)
                {
                    $w=$this->widths[$i];
                    $bor=$this->border[$i];
                    $fon=isset($this->fondo[$i]) ? $this->fondo[$i] : false;
                    
                    $a=isset($this->aligns[$i]) ? $this->aligns[$i] : 'L';
                    //Save the current position
                    $x=$this->GetX();
                    $y=$this->GetY();
                    //Draw the border
                   // $this->Rect($x,$y,$w,$h);
                    //Print the text
                    $this->MultiCell($w,3,$data[$i],$bor,$a,$fon);
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

/*===================================================================================================================*/
   	        var $eljefe="";
   	        var $eljefepsto="";
 
   	
			

            function LoadDatosDiploma()
			{				
                $miConex = new Conexion();
                $sql="SELECT * FROM vecertespecialidad where ID=".$_GET["id"];                
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
                $miutil = new UtilUser();
				$miutil->getEncabezado($this,'V');	
				
				//Para cuando las tablas estas no se coirten 
				$this->SetX(20);
				$this->Ln(5);
			}
			

			function Footer()
			{				
                $miutil = new UtilUser();
				$miutil->getPie($this,'V');


				$nombre=$miutil->getJefe('101');//Nombre del puesto DIRECTOR GENERAL
                $this->SetFont('Montserrat-ExtraBold','B',11);

				$this->SetFont('Montserrat-ExtraBold','B',11);
                $this->setY(-50);
                $this->Cell(0,15,utf8_decode($nombre),0,1,'C');
                $this->setY(-40);
				$this->Cell(0,5,"DIRECTOR GENERAL",0,1,'C');
			}
			
		}
		
		$pdf = new PDF('P','mm','letter');
        header("Content-Type: text/html; charset=UTF-8");
        
        $pdf->AddFont('Beastformer','B','Beastformer.php');
        $pdf->AddFont('Beastformer','','Beastformer.php');

		
		$pdf->SetFont('Arial','',8);
		$pdf->SetMargins(30, 25 , 35);
		$pdf->SetAutoPageBreak(true,20); 
        $pdf->AddPage();

        $margeniz=30;
      		
        $data2 = $pdf->LoadDatosGen();
        $dataDip = $pdf->LoadDatosDiploma();
        $miutil = new UtilUser();
     
        $pdf->Ln(5);

        $pdf->SetFont('Beastformer','',14);
        $pdf->Cell(0,5,utf8_decode('El Tecnológico Nacional de México'),0,1,'C');
        $pdf->Cell(0,5,utf8_decode('y el Instituto Tecnológico Superior de Macuspana'),0,0,'C');
      
        $pdf->Ln(15);
        $pdf->SetFont('Arial','',13);
        $pdf->Cell(0,5,utf8_decode('Otorgan el Presente'),0,1,'C');

        $pdf->Ln(15);
        $pdf->SetFont('Arial','B',22);
        $pdf->Cell(0,5,utf8_decode('DIPLOMA'),0,1,'C');

        $pdf->Ln(15);
        $pdf->SetFont('Arial','',13);
        $pdf->Cell(0,5,utf8_decode('al C.'),0,1,'C');

        $pdf->Ln(15);
        $pdf->SetFont('Arial','B',18);
        $pdf->Cell(0,5,utf8_decode($dataDip[0]["NOMBRE"]),0,1,'C');

        $pdf->Ln(15);
        $pdf->SetFont('Arial','',13);
        $pdf->MultiCell(0,5,utf8_decode('Por haber concluido satisfactoramente las asignaturas que conforma la especialiad de '.
               $dataDip[0]["ESPECIALIDADD"]." en la carrera de: "),0,'J',false);

        $pdf->Ln(15);
        $pdf->SetFont('Arial','B',16);
        $pdf->Cell(0,5,utf8_decode($dataDip[0]["CARRERAD"]),0,1,'C');

        $pdf->Ln(15);
        $pdf->SetFont('Arial','',13);
        $pdf->Cell(0,5,utf8_decode("Generación: ".$dataDip[0]["GENERACION"]),0,1,'C');

        $fechadecof=$miutil->formatFecha($dataDip[0]["FECHAEXP"]);
        $fechapie=date("d", strtotime($fechadecof))." de ".
        $miutil->getMesLetra(date("m", strtotime($fechadecof)))." de ". 
        $miutil->aletras(date("Y", strtotime($fechadecof)));

        $pdf->Ln(15);
        $pdf->SetFont('Arial','',13);
        $pdf->MultiCell(0,5,utf8_decode('El presente se otorga el día  '.$fechapie.", en la ciudad de Macuspana, del estado de Tabasco."),0,'J',false);



            $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
