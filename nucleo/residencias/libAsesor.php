
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
 
   	
			function LoadDatosResidencia()
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="select * from vresidencias where IDRES='".$_GET["ID"]."'";

				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

          
            function LoadDatosCar($carrera)
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="SELECT URES_URES AS DEPTO,CONCAT(EMPL_ABREVIA,' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS JEFED, ".
                     " EMPL_FIRMAOF AS FIRMAOF, EMPL_FIRMA AS FIRMA, EMPL_SELLO AS SELLO FROM fures, pempleados where CARRERA='".$carrera."'".
                     " and URES_JEFE=EMPL_NUMERO";

				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
      
            function LoadDatosAlumnos()
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select * FROM vresidencias WHERE IDRES='".$_GET["ID"]."'";
               //echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function LoadResidentes($ciclo,$asesor)
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select * FROM vresidencias WHERE CICLO='".$ciclo."' and CVE_ASESOR='".$asesor."'";
               //echo $sql;
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

                $nombre=$miutil->getJefe('303');//Nombre del puesto DECONTRL ESCOLAR
                
                $this->SetFont('Montserrat-ExtraBold','B',10);
                $this->setY(-70);
                $this->Cell(0,5,"ATENTAMENTE",0,1,'L');

                $this->setY(-60);
                $this->Cell(0,5,utf8_decode($this->eljefe),0,1,'L');

                $this->setY(-55);
                $this->Cell(0,5,utf8_decode($this->eljefepsto),0,1,'L');

                
                $this->SetFont('Montserrat-Medium','',8);
                $this->setY(-40);
                $this->Cell(0,5,"c.c.p. Expediente",0,1,'L');

		
			}

            // Tabla coloreada
			function imprimeResidentes($header, $data)
			{
				$this->Ln(5);
				// Colores, ancho de l�nea y fuente en negrita
				$this->SetFillColor(172,31,6);
				$this->SetTextColor(255);
				$this->SetDrawColor(0,0,0);
				$this->SetLineWidth(.2);
				
				$w = array(10,40, 20,80,20);
				$this->SetFont('Montserrat-ExtraBold','B',7);
				$this->SetWidths(array(10,40, 20,80,20));	
				for($i=0;$i<count($header);$i++)
					$this->Cell($w[$i],7,$header[$i],1,0,'C',true);
					$this->Ln();
					// Restauraci�n de colores y fuentes
					$this->SetFillColor(255,255,255);
					$this->SetTextColor(0);
					$this->SetFont('');
					// Datos
					$fill = false;
					$this->SetFont('Montserrat-Medium','',6);
					$suma=0;
					$alto=3;
					if ($data) {
                        $c=1;
						foreach($data as $row)
						{
							//$this->setX(10);
							$this->Row(array(utf8_decode($c),utf8_decode($row["NOMBRE"]),utf8_decode($row["MATRICULA"]),
									utf8_decode($row["PROYECTO"]),utf8_decode($row["INICIA"]." / ".$row["TERMINA"])
							));
                            $c++;
						}
					}	
			}			


		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
        $pdf->AddPage();
       
        $data = $pdf->LoadDatosResidencia();
        $dataGen = $pdf->LoadDatosGen();
        $dataAlum = $pdf->LoadDatosAlumnos();
        $dataCar = $pdf->LoadDatosCar($dataAlum[0]["CARRERA"]);
      
    
        $miutil = new UtilUser();
        $pstocoor=$miutil->getJefe('701');//Nombre del puesto de coordinacion de titulacion 
    
        
        $dataof=$miutil->verificaOficio($dataCar[0]["DEPTO"],"LIBERARES",$_GET["ID"]);
		
		$fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
        
        $pdf->SetFont('Montserrat-Medium','',9);
		$pdf->Ln(10);
		$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"]." ".$fechaof,0,1,'R');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
        $pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Ln(5);
        $pdf->Cell(0,0,'ASUNTO:'.utf8_decode("CONSTANCIA DE CUMPLIMIENTO"),0,1,'R');
        $pdf->Ln(3);
        $pdf->Cell(0,0,'ASUNTO:'.utf8_decode("DE ASESORÍAS RESIDENCIA"),0,1,'R');
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Ln(5);
        
        
        $pdf->Cell(0,0,utf8_decode($dataAlum[0]["ASESOR"]),0,1,'L');
		$pdf->Ln(5);
        $pdf->Cell(0,0,utf8_decode("DOCENTE ".$dataAlum[0]["CARRERAD"]),0,1,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,0,utf8_decode("PRESENTE"),0,1,'L');
        $pdf->Ln(10);
        
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->MultiCell(0,5,utf8_decode("Por medio de la presente hago constar que cumplió con el 100% de sus ACTIVIDADES DE ASESORÍAS DE RESIDENCIAS PROFESIONALES en el periodo ".$dataAlum[0]["CICLOD"].", de el(los) siguiente(s) alumno(s)."),0,'J',FALSE);
        $pdf->Ln(10);

        $header = array('No.', 'NOMBRE DEL ALUMNO', 'MATRICULA','PROYECTO','PERIODO');		
        $dataRes= $pdf->LoadResidentes($dataAlum[0]["CICLO"],$dataAlum[0]["CVE_ASESOR"]);
		$pdf->imprimeResidentes($header,$dataRes);


        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->MultiCell(0,5,utf8_decode("Sin otro particular me despido agradeciendo su interés y compromiso, quedo a sus órdenes para dudas o aclaraciones y envío un cordial saludo."),0,'J',FALSE);
        $pdf->Ln(10);

        $pdf->eljefe=$dataCar[0]["JEFED"];
        $pdf->eljefepsto=$dataCar[0]["FIRMAOF"];

        if ($_GET["tipo"]==1) {
            $pdf->Image($dataCar[0]["SELLO"],140,200,45);
			$pdf->Image($dataCar[0]["FIRMA"],50,200,40);	
        }

        $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
