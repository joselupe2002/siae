
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
                $this->SetFont('Montserrat-ExtraBold','B',11);

                $this->setY(-40);
                $this->Cell(0,5,"c.c.p. Expediente",0,1,'L');

		
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
    
        
        $dataof=$miutil->verificaOficio($dataCar[0]["DEPTO"],"OFTITULACIONINT",$_GET["ID"]);
		
		$fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
        
        $pdf->SetFont('Montserrat-Medium','',9);
		$pdf->Ln(10);
		$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
        $pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Ln(5);
        $pdf->Cell(0,0,'ASUNTO:'.utf8_decode("LIBERACIÓN DE PROYECTO "),0,1,'R');
        $pdf->Ln(3);
        $pdf->Cell(0,0,utf8_decode("PARA LA TITULACIÓN INTEGRAL"),0,1,'R');
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Ln(5);
        
        
        $pdf->Cell(0,0,utf8_decode($pstocoor),0,1,'L');
		$pdf->Ln(5);
        $pdf->Cell(0,0,utf8_decode("COORDINADOR(A) DE TITULACIÓN"),0,1,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,0,utf8_decode("PRESENTE"),0,1,'L');
        $pdf->Ln(10);
        
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->MultiCell(0,5,utf8_decode("Por este medio informo que ha sido liberado el siguiente proyecto para la titulación integral:"),0,'J',FALSE);
        $pdf->Ln(10);


        $pdf->SetWidths(array(60,105));
        $pdf->Row(array(utf8_decode("Nombre del estuduante y/o egresado:"),utf8_decode($dataAlum[0]["NOMBRE"])));
        $pdf->Row(array(utf8_decode("Carrera:"),utf8_decode($dataAlum[0]["CARRERAD"])));
        $pdf->Row(array(utf8_decode("No. de Control:"),utf8_decode($dataAlum[0]["MATRICULA"])));
        $pdf->Row(array(utf8_decode("Nombre del Proyecto:"),utf8_decode($dataAlum[0]["PROYECTO"])));    
        $pdf->Row(array(utf8_decode("Producto:"),utf8_decode($_GET["producto"])));

        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->MultiCell(0,5,utf8_decode("Agradezco de antemano su valioso apoyo en esta importante actividad para la formación profesional de nuestros egresados."),0,'J',FALSE);
        $pdf->Ln(10);

        $pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Cell(0,0,utf8_decode("ATENTAMENTE"),0,1,'L');
        $pdf->Ln(10);
        $pdf->Cell(0,0,utf8_decode($dataCar[0]["JEFED"]),0,1,'L');
		$pdf->Ln(5);
        $pdf->Cell(0,0,utf8_decode($dataCar[0]["FIRMAOF"]),0,1,'L');
        $pdf->Ln(5);
       
      
        $pdf->Cell(55,20,"",1,0,'L');$pdf->Cell(55,20,"",1,0,'L');$pdf->Cell(55,20,"",1,1,'L');
        $pdf->SetWidths(array(55,55,55));
        $pdf->SetAligns(array("C","C","C"));
        $pdf->Row(array(utf8_decode($dataAlum[0]["ASESOR"]."\n"."Asesor"),utf8_decode($dataAlum[0]["REVISOR1"]."\n"."Revisor 1"),utf8_decode($dataAlum[0]["RESVISOR2"]."\n"."Revisor 2")));     
    

         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
