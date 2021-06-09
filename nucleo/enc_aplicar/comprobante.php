
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
               var $nombre="";
 
   	
			function LoadDatosEnc()
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="select * from encuestas where ID='".$_GET["id"]."'";

				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

            function LoadDatosPre()
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="SELECT * FROM encpreguntas a where a.IDENC='".$_GET["id"]."' ORDER BY CLAVE";

				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

            
            
            function LoadDatosResp()
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="select * from encrespuestas where IDENC='".$_GET["id"]."' AND IDRESPONDE='".$_GET["matricula"]."'";

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
                $sql="select ALUM_MATRICULA, CONCAT(ALUM_NOMBRE, ' ',ALUM_APEPAT, ' ',ALUM_APEMAT) AS NOMBRE, ".
                " ALUM_CARRERAREG AS CARRERA, ALUM_ACTIVO AS SITUACION, ALUM_CICLOTER AS CICLOTER, ".
                " ALUM_CICLOINS AS CICLOINS, CARR_DESCRIP AS CARRERAD".              
                " from falumnos a, ccarreras b where ".
                " CARR_CLAVE=ALUM_CARRERAREG and a.ALUM_MATRICULA='".$_GET["matricula"]."'";
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
                // que cuando se cambie a la otra pagina empiece a la derecha y la stablas no se descuadren
                $this->SetX(10);
                $this->Ln(5);	  

               
              
			}
			
			

			function Footer()
			{	
                
                $miutil = new UtilUser();              
                $miutil->getPie($this,'V');

              
                $this->SetFont('Montserrat-ExtraBold','B',10);
                $this->setY(-50);
                $this->Cell(0,5,"ATENTAMENTE",0,1,'C');
                $this->setY(-40);
                $this->Cell(0,5,utf8_decode($this->nombre),0,1,'C');
                $this->setY(-35);
                $this->Cell(0,5,"EGRESADO",0,1,'C');

			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,50); 
        $pdf->AddPage();

         
        $dataEnc = $pdf->LoadDatosEnc();
        $dataAlum = $pdf->LoadDatosAlumnos();
        $dataRes = $pdf->LoadDatosResp();
        $dataPre = $pdf->LoadDatosPre();
        
        $cadena= "OF:".$_GET["id"]."-".str_replace(" ","|",$dataEnc[0]["DESCRIP"])."|".$dataAlum[0]["ALUM_MATRICULA"]."|".str_replace(" ","|",$dataAlum[0]["NOMBRE"]).
        str_replace(" ","|",$dataAlum[0]["CARRERAD"]);     
        $pdf->Image('https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl='.$cadena.'&.png',160,60,28,28); 
          
    
       // $data2 = $pdf->LoadDatosCursando($elciclo);
        $miutil = new UtilUser();

        $pdf->Ln(3);
        $pdf->SetFont('Montserrat-ExtraBold','B',14);
        $pdf->Cell(0,5,utf8_decode('COMPROBANTE DE APLICACIÓN DE ENCUESTA'),0,0,'C');
        $pdf->nombre=$dataAlum[0]["NOMBRE"];

        $pdf->Ln(15);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(40,5,utf8_decode('ENCUESTA:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',11);
        $pdf->Cell(130,5,utf8_decode($dataEnc[0]["ID"]."-".$dataEnc[0]["DESCRIP"]),0,1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(40,5,utf8_decode('ALUMNO:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',11);
        $pdf->Cell(130,5,utf8_decode($dataAlum[0]["ALUM_MATRICULA"]."    ".$dataAlum[0]["NOMBRE"]),0,1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(40,5,utf8_decode('CARRERA:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',11);
        $pdf->Cell(130,5,utf8_decode($dataAlum[0]["CARRERAD"]),0,1,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(40,5,utf8_decode('FECHA:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',11);
        $pdf->Cell(130,5,utf8_decode($dataRes[0]["FECHAUS"]),0,1,'L');

        
        $pdf->Ln(10);
        
        foreach($dataPre as $row) {
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $txt=str_replace("<br>","\n",str_replace("<br/>","\n",$row["PREGUNTA"]));
            $txt=str_replace("<span class=\"badge badge-danger\" >","",$txt);
            $txt=str_replace("</span>","",$txt);
            $pdf->MultiCell(0,3,utf8_decode($txt),0,'J',false);

            $pdf->SetFont('Montserrat-Medium','',8);            
            $pdf->MultiCell(0,3, utf8_decode($dataRes[0][$row["CLAVE"]]),0,'J',false);
           
        }


        
       
        $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
