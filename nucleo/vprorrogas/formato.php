
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
                    $this->MultiCell($w,3,$data[$i],0,$a);
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
 
   	
		

            function LoadDatos()
			{		$data=[];		
                $miConex = new Conexion();
                $sql="SELECT * FROM vprorrogas where ID='".$_GET["id"]."'";
                
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
				
                
                $this->AddFont('Montserrat-Black','B','Montserrat-Black.php');
                $this->AddFont('Montserrat-Black','','Montserrat-Black.php');
                $this->AddFont('Montserrat-Medium','B','Montserrat-Medium.php');
                $this->AddFont('Montserrat-Medium','','Montserrat-Medium.php');
                $this->AddFont('Montserrat-SemiBold','','Montserrat-SemiBold.php');
                $this->AddFont('Montserrat-SemiBold','B','Montserrat-SemiBold.php');
                $this->AddFont('Montserrat-ExtraBold','B','Montserrat-ExtraBold.php');
                $this->AddFont('Montserrat-ExtraBold','','Montserrat-ExtraBold.php');
                $this->AddFont('Montserrat-ExtraBold','I','Montserrat-ExtraBold.php');
                $this->AddFont('Montserrat-ExtraLight','I','Montserrat-ExtraLight.php');
                $this->AddFont('Montserrat-ExtraLight','','Montserrat-ExtraLight.php');
  	
                //Para que cuando se cambie a la otra pagina empiece a la derecha y la stablas no se descuadren
                $this->SetX(10);
				$this->Ln(5);	
			}
			
			

			function Footer()
			{				
               
			
			}
			
		
            function formato() {
                $data = $this->LoadDatos();
                $miutil = new UtilUser();            

                $fechadecof=$miutil->formatFecha($data[0]["FECHAUS"]);
                $fechaof=date("d", strtotime($fechadecof))." de ".$miutil->getFecha($fechadecof,'MES'). " del ".date("Y", strtotime($fechadecof));
              
                $this->SetFont('Montserrat-Medium','',10);  
                $this->Cell(0,5,"Macuspana Tabasco a ".$fechaof,0,1,'R');	  
                $this->Cell(0,5,utf8_decode("Asunto: Solicitud de prórroga"),0,1,'R');	   
                $this->Ln(5);
                $this->SetFont('Montserrat-Black','B',10);    
                $this->Cell(0,5,utf8_decode($data[0]["JEFE"]),0,1,'L');	  
                $this->Cell(0,5,utf8_decode($data[0]["FIRMAOF"]),0,1,'L');	  
                $this->Ln(10);
                
                $this->SetFont('Montserrat-SemiBold','',12);
                $this->MultiCell(0,5,utf8_decode('El que suscribe C. ').utf8_decode($data[0]["NOMBRE"]).
                utf8_decode(', con número de control ').utf8_decode($data[0]["MATRICULA"]).' de la carrera de '.utf8_decode($data[0]["CARRERAD"]).
                utf8_decode(" del Instituto Tecnológico Superior de Macuspana, le solicito de manera respetuosa, se me autorice la PRORROGA PARA GENERAR PAGO DE ").utf8_decode($data[0]["TIPOPAGOD"]).
                utf8_decode("con el único fin de no perder la reinscripción, toda vez que de momento me es imposible cubrir la cuota en su totalidad, por lo que solicito realizarla en ").$data[0]["PAGOS"].utf8_decode(" Pago(s). Estableciendo las siguientes fechas Compromisos.") ,0,'J', false);
                
            
                $this->Ln(10);
                $this->SetFont('Montserrat-SemiBold','',12);
                $this->Cell(30,5,"PAGO NO. 1:    ",1,0,'L');	
                $this->Cell(30,5,utf8_decode($data[0]["PAGO1"]),1,0,'L');	
                $this->Ln(5);
                if ($data[0]["PAGO2"]!='') {
                    $this->Cell(30,5,"PAGO NO. 2:    ",1,0,'L');	
                    $this->Cell(30,5,utf8_decode($data[0]["PAGO2"]),1,0,'L');	
                     $this->Ln(5);
                }

                $this->Ln(10);
                $this->MultiCell(0,5,utf8_decode('Así mismo estoy consciente que de no generar el pago en los tiempos aquí descritos proceda a la baja de las asignaturas cursadas en el período '.utf8_decode($data[0]["CICLOD"])),0,'J', false);
                

                $this->Ln(5);
                $this->MultiCell(0,5,utf8_decode('Sin otro asunto en particular, agradezco la atención a la presente.'),0,'J', false);
                $this->Ln(35);

                $this->Ln(10);
                $this->Cell(0,0,"FIRMA DE COMPROMISO",0,1,'C');	
                $this->Ln(10);
                $this->Cell(0,5,utf8_decode($data[0]["NOMBRE"]),"",1,'C');
                $this->Cell(0,5,utf8_decode("MATRICULA:". $data[0]["MATRICULA"]),"",1,'C');	
                $this->Cell(0,5,utf8_decode("CORREO:". $data[0]["CORREOINS"]),"",1,'C');
                $this->Cell(0,5,utf8_decode("TELEFONO:". $data[0]["TELEFONO"]),"",1,'C');
                $this->Ln(5);
                $this->SetFont('Montserrat-Medium','',8);
                $this->Cell(0,5,utf8_decode("NOTA: Esta solicitud deberá ir acompañada de la copia ambos lados del INE del alumno."),"",1,'L');
                $this->Ln(5);
                
                
            }

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',12);
		$pdf->SetMargins(30, 30 , 30);
		$pdf->SetAutoPageBreak(true,10); 
        $pdf->AddPage();
         
        $pdf->formato(0);
 
        $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
