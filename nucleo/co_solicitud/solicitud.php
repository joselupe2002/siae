
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
  
      
            function LoadDatosAlumnos()
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select n.*, getPeriodos(PERSONA,getciclo()) as PERIODO from vco_solicitud n where  ID='".$_GET["id"]."'";
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
				//$miutil = new UtilUser();
               // $miutil->getEncabezado($this,'V');			
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
                
                //$miutil = new UtilUser();
                //$nombre=$miutil->getJefe('303');//Nombre del puesto de Recursos Humanos
                //$miutil->getPie($this,'V');

                $this->setY(-50);
                $this->SetFont('Montserrat-ExtraBold','B',11);
               
                $this->Cell(0,5,"ATENTAMENTE",0,1,'C');
                $this->setY(-40);
                $this->Cell(0,15,utf8_decode($this->nombre),0,1,'C');

                $this->SetFont('Montserrat-Medium','B',8);
                $this->setY(-30);
                $this->Cell(0,15,utf8_decode("c.c.p. Interesado"),0,1,'L');
		
			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
        $pdf->AddPage();

        $dataGen = $pdf->LoadDatosGen();
        $dataAlum = $pdf->LoadDatosAlumnos();
    
        $miutil = new UtilUser();

        $pdf->Ln(3);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);

        $cadAux="";$cadAux2="";$cadAux3="";
        if ($dataAlum[0]["TIPO"]=='DOCENTES') {$cadAux=" DEL(LA) PROFESOR(A)"; $cadAux2="PROFESOR";$cadAux3="";}
        if ($dataAlum[0]["TIPO"]=='ALUMNOS') {$cadAux="DEL ESTUDIANTE"; $cadAux2="ESTUDIANTE"; $cadAux3=" DEL ".$dataAlum[0]["PERIODO"]." SEMESTRE,";}
       
        $pdf->Cell(0,5,utf8_decode('SOLICITUD  '.$cadAux.' PARA EL ANÁLISIS DEL COMITÉ ACADÉMICO:'),0,0,'C');
        $pdf->Ln(5);
        $pdf->Cell(0,5,utf8_decode($dataGen[0]["inst_razon"]),0,0,'C');
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-Medium','',10);

        $fechadecof=$miutil->formatFecha($dataAlum[0]["FECHACAP"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
    
        $pdf->Ln(5);
        $pdf->Cell(0,5,strtoupper(utf8_decode($dataGen[0]["inst_fechaof"]." ".$fechaof)),0,0,'R');
        $pdf->Ln(5);

        $pdf->setX(100);
        $pdf->Multicell(91,5,strtoupper(utf8_decode("ASUNTO:".$dataAlum[0]["ASUNTOD"])),0,'R',false);
        $pdf->Ln(5);

        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Ln(5);
        $pdf->Cell(0,5,strtoupper(utf8_decode($dataAlum[0]["JEFED"])),0,0,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,5,strtoupper(utf8_decode($dataAlum[0]["FIRMAOF"])),0,0,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,5,strtoupper(utf8_decode("PRESENTE")),0,0,'L');
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-Medium','B',10);
        $pdf->Ln(5);
        $pdf->MultiCell(0,5,utf8_decode("EL QUE SUSCRIBE C. ".
        $dataAlum[0]["NOMBRE"]." ".$cadAux2.$cadAux3." DE LA CARRERA DE ".
        $dataAlum[0]["CARRERAD"]." CON NÚMERO DE CONTROL ".$dataAlum[0]["PERSONA"].
        " SOLICITO DE LA MANERA MAS ATENTA: "),0,'J',FALSE);
        $pdf->Ln(5);
        $pdf->MultiCell(0,5,utf8_decode($dataAlum[0]["SOLICITUD"]),0,'J',FALSE);
     
        $pdf->Ln(5);
        $pdf->MultiCell(0,5,utf8_decode("POR LOS SIGUIENTES MOTIVOS:"),0,'J',FALSE);
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->MultiCell(0,5,utf8_decode("MOTIVOS ACADÉMICOS:"),0,'J',FALSE);
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-Medium','B',10);
        $pdf->MultiCell(0,5,utf8_decode($dataAlum[0]["ACADEMICOS"]),0,'J',FALSE);
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->MultiCell(0,5,utf8_decode("MOTIVOS PERSONALES:"),0,'J',FALSE);
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-Medium','B',10);
        $pdf->MultiCell(0,5,utf8_decode($dataAlum[0]["PERSONALES"]),0,'J',FALSE);

        $pdf->nombre=$dataAlum[0]["NOMBRE"];
         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
