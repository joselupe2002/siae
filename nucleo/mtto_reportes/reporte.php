
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

/*===================================================================================================================*/
   	        var $eljefe="";
   	        var $eljefepsto="";
 
   	
			function LoadDatos()
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="select * from vmtto_reportes where IdReporte='".$_GET["ID"]."'";

				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

          
    
			function LoadDatosGen()
			{
                $data=[];	
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
                //Cargamos las fuentes 
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

			}
			
			

			function Footer()
			{	
                
                $miutil = new UtilUser();
                $nombre=$miutil->getJefe('303');//Nombre del puesto de Recursos Humanos
                $miutil->getPie($this,'V');

              
		
			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
        $pdf->AddPage();
       
        $data = $pdf->LoadDatos();
        $dataGen = $pdf->LoadDatosGen();

        $miutil = new UtilUser();
        $pdf->Ln(3);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->SetX(120);
        $pdf->Ln(5);
        $pdf->Cell(170,5,'SOLICITUD DE MANTENIMIENTO Y/O ORDEN DE SERVICIO',0,0,'C');
        $pdf->Ln(5);
        $pdf->Cell(170,5,'FOLIO: '.$data[0]["IdReporte"],0,0,'R');
        $pdf->Ln(5);

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(170,5,'TIPO DE MANTENIMIENTO:',"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(170,5,utf8_decode($data[0]["IdTipoD"]),"LRB",1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(170,5,utf8_decode('ÁREA SOLICITANTE:'),"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(170,5,utf8_decode($data[0]["URESD"]),"LRB",1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(170,5,utf8_decode('NOMBRE DEL SOLICITANTE:'),"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(170,5,utf8_decode($data[0]["UsuarioCapturaD"]),"LRB",1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(170,5,utf8_decode('FECHA DE LA SOLICITUD:'),"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(170,5,utf8_decode($data[0]["FechaReporte"]." ".$data[0]["HoraReporte"]),"LRB",1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(170,5,utf8_decode('DESCRIPCIÓN DE LA SOLICITUD:'),"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->MultiCell(170,5,utf8_decode($data[0]["Descripcion"]),"LRB",'J');

        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(170,5,'TIPO DE SERVICIO:',"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(170,5,utf8_decode($data[0]["IdTipoD"]),"LRB",1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(170,5,'ASIGNADO A:',"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(170,5,utf8_decode($data[0]["tecnicoD"]),"LRB",1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(170,5,utf8_decode('FECHA DE REALIZACIÓN:'),"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(170,5,utf8_decode($data[0]["FechaAtencion"]." ".$data[0]["HoraAtencion"]),"LRB",1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(170,5,utf8_decode('TRABAJO REALIZADO:'),"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->MultiCell(170,5,utf8_decode($data[0]["TrabajoRealizado"]),"LRB",'J');


        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(130,5,'VERIFICADO Y LIBERADO POR:',"LRT",0,'L');
        $pdf->Cell(40,5,'Fecha y Hora:',"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(130,5,utf8_decode($data[0]["UsuarioCapturaD"]),"LR",0,'L');
        $pdf->Cell(40,5,$data[0]["FechaResultado"]." ".$data[0]["HoraResultado"],"LR",1,'L');

        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(130,5,utf8_decode($data[0]["PSTOCAPTURA"]),"LRB",0,'L');
        $pdf->Cell(40,5,"","LRB",1,'L');
      

        $nombre=$miutil->getJefe('421');//Nombre del puesto SOPORTE TECNICO
        $pdf->SetFont('Montserrat-ExtraBold','B',11);


        $pdf->Ln(0);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(130,5,'APROBADO POR:',"LRT",0,'L');
        $pdf->Cell(40,5,'Fecha:',"LRT",1,'L');
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(130,5,utf8_decode($nombre),"LR",0,'L');
        $pdf->Cell(40,5,$data[0]["FechaResultado"],"LR",1,'L');

        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->Cell(130,5,utf8_decode("JEFE DE SOPORTE TÉCNICO"),"LRB",0,'L');
        $pdf->Cell(40,5,"","LRB",1,'L');
      


         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
