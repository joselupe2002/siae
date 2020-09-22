
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
  
      
            function LoadDatosAlumnos()
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select * from vco_solicitud where  ID='".$_GET["id"]."'";
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
        $pdf->Cell(0,5,utf8_decode('SOLICITUD DEL ESTUDIANTE PARA EL ANÁLISIS DEL COMITÉ ACADÉMICO:'),0,0,'C');
        $pdf->Ln(5);
        $pdf->Cell(0,5,utf8_decode($dataGen[0]["inst_razon"]),0,0,'C');
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-Medium','',10);

        $pdf->Cell(0,5,utf8_decode('LUGAR Y FECHA:')." ".$dataGen[0]["inst_fechaof"].$dataAlum[0]["FECHACAP"],0,0,'R');
        $pdf->Ln(5);

        strtoupper($fechaof)

        $fechaof=$miutil->aletras(date("d"))." DÍAS DEL MES DE ".$miutil->getMesLetra(date("m"))." DEL AÑO ". $miutil->aletras(date("Y"));
        /*
        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->MultiCell(0,5,utf8_decode("LA QUE SUSCRIBE, HACE CONSTAR, QUE SEGÚN EL ARCHIVO ESCOLAR, LA (EL) ".
        $dataAlum[0]["NOMBRE"]." CON  MATRICULA ". $dataAlum[0]["ALUM_MATRICULA"].", ESTA CURSANDO EL SEMESTRE ".
        $dataAlum[0]["SEMESTRE"]." DE ".$dataAlum[0]["CARRERAD"].", EN EL PERIODO COMPRENDIDO DE ".
        $dataCiclo[0]["CICL_INICIOR"]." AL ". $dataCiclo[0]["CICL_FINR"]." CON UN PERÍODO VACACIONAL DE ".
        $dataCiclo[0]["CICL_VACINI"]." AL ". $dataCiclo[0]["CICL_VACFIN"]." Y PROMEDIO DE ".
        $dataAlum[0]["PROMEDIO_SR"]. " CON UN AVANCE DEL ".explode("|",$dataAlum[0]["AVANCE"])[2]."%."),0,'J',FALSE);


        $pdf->Ln(5);
        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(255);  
        $pdf->SetFont('Montserrat-ExtraBold','B',7);
        
        $pdf->Cell(20,5,'GRUPO',1,0,'C',true);
        $pdf->Cell(35,5,'MATERIA.',1,0,'C',true);
        $pdf->Cell(10,5,'CRED.',1,0,'C',true);
        $pdf->Cell(15,5,'LUNES',1,0,'C',true);
        $pdf->Cell(15,5,'MARTES',1,0,'C',true);
        $pdf->Cell(15,5,'MIERCOLES',1,0,'C',true);
        $pdf->Cell(15,5,'JUEVES',1,0,'C',true);
        $pdf->Cell(15,5,'VIERNES',1,0,'C',true);
        $pdf->Cell(15,5,'SABADO',1,0,'C',true);
        $pdf->Cell(10,5,'REP.',1,0,'C',true);

        $pdf->Ln();
        $pdf->SetFont('Montserrat-Medium','',6);
        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(0);
        $pdf->SetWidths(array(20,35,10,15,15,15,15,15,15,10));
        $n=1;
        foreach($data as $row) {
            $pdf->Row(array( utf8_decode($row["MATCVE"].$row["GPOCVE"]),
                             utf8_decode($row["MATERIAD"]),
                             utf8_decode($row["CREDITOS"]),
                             utf8_decode($row["LUNES"]),
                             utf8_decode($row["MARTES"]),
                             utf8_decode($row["MIERCOLES"]),
                             utf8_decode($row["JUEVES"]),
                             utf8_decode($row["VIERNES"]),
                             utf8_decode($row["SABADO"]),
                             utf8_decode($row["REP"])
                             )
                      );
            $n++;
        }


        $pdf->SetFont('Montserrat-Medium','',11);
		$fechaof=$miutil->aletras(date("d"))." DÍAS DEL MES DE ".$miutil->getMesLetra(date("m"))." DEL AÑO ". $miutil->aletras(date("Y"));
        $pdf->Ln(5);
   

        $pdf->MultiCell(0,5,utf8_decode("SE EXTIENDE LA PRESENTE EN LA CIUDAD DE MACUSPANA, ESTADO DE TABASCO A LOS ".
        strtoupper($fechaof).", PARA LOS FINES QUE CONVENGAN AL INTERESADO."),0,'J',FALSE);
        
        $pdf->Ln(15);

        $nombre=$miutil->getJefe('303');//Nombre del puesto DECONTRL ESCOLAR
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(0,15,utf8_decode($nombre),0,1,'C');
        $pdf->Cell(0,5,"JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES",0,1,'C');
            
*/
         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
