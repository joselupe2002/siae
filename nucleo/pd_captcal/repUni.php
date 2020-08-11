
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
 
   	
			function LoadData()
			{				
                $miConex = new Conexion();
                $sql="select ID, ".
                "IFNULL(LISPA1,'0') AS LISPA1,IFNULL(LISPA2,'0') AS LISPA2,IFNULL(LISPA3,'0') AS LISPA3,".
                "IFNULL(LISPA4,'0') AS LISPA4,IFNULL(LISPA5,'0') AS LISPA5,IFNULL(LISPA6,'0') AS LISPA6,".
                "IFNULL(LISPA7,'0') AS LISPA7,IFNULL(LISPA8,'0') AS LISPA8,IFNULL(LISPA9,'0') AS LISPA9,".
                "IFNULL(LISPA10,'0') AS LISPA10,IFNULL(LISPA11,'0') AS LISPA11,IFNULL(LISPA12,'0') AS LISPA12,".
                "IFNULL(LISPA13,'0') AS LISPA13,IFNULL(LISPA14,'0') AS LISPA14,IFNULL(LISPA15,'0') AS LISPA15,".
                "IFNULL(LISFA1,'0') AS LISFA1,IFNULL(LISFA2,'0') AS LISFA2,IFNULL(LISFA3,'0') AS LISFA3,".
                "IFNULL(LISFA4,'0') AS LISFA4,IFNULL(LISFA5,'0') AS LISFA5,IFNULL(LISFA6,'0') AS LISFA6,".
                "IFNULL(LISFA7,'0') AS LISFA7,IFNULL(LISFA8,'0') AS LISFA8,IFNULL(LISFA9,'0') AS LISFA9,".
                "IFNULL(LISFA10,'0') AS LISFA10,IFNULL(LISFA11,'0') AS LISFA11,IFNULL(LISFA12,'0') AS LISFA12,".
                "IFNULL(LISFA13,'0') AS LISFA13,IFNULL(LISFA14,'0') AS LISFA14,IFNULL(LISFA15,'0') AS LISFA15,".
                "concat(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) as NOMBRE, ALUM_MATRICULA, IF (LISCAL<70,'NA',LISCAL) as LISCAL".
                " from dlista a, falumnos b  where ALUCTR=ALUM_MATRICULA and a.PDOCVE='".$_GET["ciclo"].
                "' and a.MATCVE='".$_GET["materia"]."' and a.GPOCVE='".$_GET["grupo"]."' ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE";
                
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
            
            function LoadDatosGrupo()
			{	
                $data=[];			
                $miConex = new Conexion();
                $sql="select * from vedgrupos a where a.IDDETALLE='".$_GET["id"]."'";
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function LoadDatosCiclo()
			{				
                $miConex = new Conexion();
                $sql="select * from ciclosesc a where a.CICL_CLAVE='".$_GET["ciclo"]."'";
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function LoadDatosUnidad()
			{				
                $miConex = new Conexion();
                $sql="select count(*) as N from eunidades a where a.UNID_MATERIA='".$_GET["materia"]."' and UNID_PRED=''";
               // echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }
            
            function LoadDatosProfesor()
			{				
                $miConex = new Conexion();
                $sql="select EMPL_NUMERO, CONCAT(EMPL_ABREVIA,' ',EMPL_NOMBRE, ' ',EMPL_APEPAT, ' ',EMPL_APEMAT) AS NOMBRE, ".
                " EMPL_DEPTO from pempleados a where a.EMPL_NUMERO='".$_GET["profesor"]."'";
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
                //Para que cuando se cambie a la otra pagina empiece a la derecha y la stablas no se descuadren
                $this->SetX(10);
				$this->Ln(5);	
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'V');
				
				$this->SetX(10);$this->SetY(-30);
				$this->SetFont('Montserrat-ExtraBold','B',10);
				$this->Cell(60,5,'Firma del Profesor','T',1,'L');
				
				
			}
			
			function LoadProf($matricula)
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],
						"select  EMPL_NUMERO, CONCAT(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) as NOMBRE, EMPL_CORREOINS ".
						"from pempleados where EMPL_NUMERO='".$matricula."'");
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
		$pdf->SetAutoPageBreak(true,40); 
		$pdf->AddPage();
		 
		$data = $pdf->LoadData();
        $miutil = new UtilUser();
        
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Cell(0,0,'REPORTE DE UNIDADES',0,1,'C');
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-ExtraBold','B',9);$pdf->Cell(0,0,'MATERIA: ',0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9);$pdf->setX(50);$pdf->Cell(0,0,utf8_decode($_GET["materia"]."-".$_GET["materiad"]),0,1,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',9); $pdf->setX(145);$pdf->Cell(0,0,"FOLIO:",0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9); $pdf->setX(195); $pdf->Cell(0,0,$_GET["id"],0,1,'R');
        $pdf->Ln(3);

        $dataGrupo = $pdf->LoadDatosGrupo();
        $dataCiclo = $pdf->LoadDatosCiclo();
        $dataUnidad = $pdf->LoadDatosUnidad();
        $numUni=$dataUnidad[0][0];
        $dataProfesor = $pdf->LoadDatosProfesor();
        $pdf->SetFont('Montserrat-Medium','B',5); 
        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(255);
        $pdf->Cell(20,3,"LUNES",1,0,'L',true);
        $pdf->Cell(20,3,"MARTES",1,0,'L',true);
        $pdf->Cell(20,3,"MIERCOLES",1,0,'L',true);
        $pdf->Cell(20,3,"JUEVES",1,0,'L',true);
        $pdf->Cell(20,3,"VIERNES",1,0,'L',true);
        $pdf->Cell(20,3,"SABADO",1,0,'L',true);
        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(0);
        $pdf->SetFont('Montserrat-ExtraBold','B',9); $pdf->setX(145);$pdf->Cell(0,0,"PERIODO:",0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9); $pdf->setX(195); $pdf->Cell(0,0,$dataCiclo[0]["CICL_DESCRIP"],0,1,'R');
        $pdf->Ln(3);        
        $pdf->SetFont('Montserrat-Medium','',5); 
        $pdf->Cell(20,3,$dataGrupo[0]["LUNES"],1,0,'L');
        $pdf->Cell(20,3,$dataGrupo[0]["MARTES"],1,0,'L');
        $pdf->Cell(20,3,$dataGrupo[0]["MIERCOLES"],1,0,'L');
        $pdf->Cell(20,3,$dataGrupo[0]["JUEVES"],1,0,'L');
        $pdf->Cell(20,3,$dataGrupo[0]["VIERNES"],1,0,'L');
        $pdf->Cell(20,3,$dataGrupo[0]["SABADO"],1,0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',9); $pdf->setX(145);$pdf->Cell(0,0,"FECHA:",0,1,'L');
        $fecha=date("d/m/Y");
        $pdf->SetFont('Montserrat-Medium','',9); $pdf->setX(195); $pdf->Cell(0,0,$fecha,0,1,'R');
        $pdf->Ln(6); 
        $pdf->SetFont('Montserrat-ExtraBold','B',9);$pdf->Cell(0,0,'DOCENTE: ',0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9);$pdf->setX(50);$pdf->Cell(0,0,utf8_decode($dataProfesor[0]["NOMBRE"]),0,1,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',9); $pdf->setX(145);$pdf->Cell(0,0,"GRUPO:",0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9); $pdf->setX(195); $pdf->Cell(0,0,$_GET["semestre"].$_GET["grupo"],0,1,'R');
        $pdf->Ln(3); 
        $pdf->SetFont('Montserrat-ExtraBold','B',9);$pdf->Cell(0,0,'CARRERA: ',0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9);$pdf->setX(50);$pdf->Cell(0,0,utf8_decode($dataGrupo[0]["CARRERAD"]." ".$dataGrupo[0]["MAPA"]),0,1,'L');
       
        $pdf->Ln(10);

        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(255);  
        $pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Cell(7,5,'No ',1,0,'C',true);
        $pdf->Cell(17,5,'Control',1,0,'C',true);
        $pdf->Cell(60,5,'Nombre',1,0,'C',true);
        
        for ($i=1;$i<=10; $i++) {     
            $pdf->SetFillColor(172,31,6);
            $pdf->SetTextColor(255);       
            if ($i<=$numUni) {
                $pdf->SetFillColor(23,5,124);
                $pdf->SetTextColor(255);
            }
            $pdf->Cell(8,5,'U'.$i,1,0,'C',true); 
        }

        $pdf->SetFillColor(23,5,124);
        $pdf->SetTextColor(255);
        $pdf->Cell(8,5,'CF',1,0,'C',true);

        $pdf->Ln();
        $pdf->SetFont('Montserrat-Medium','',7);
        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(0);
        $pdf->SetWidths(array(7,17, 60, 8,8,8,8,8,8,8,8,8,8,8));
        $n=1;


        foreach($data as $row) {
            //$pdf->Cell(70,5,$row["NOMBRE"],1,0,'L');            
            $pdf->Row(array($n,
                             utf8_decode($row["ALUM_MATRICULA"]),
                             utf8_decode($row["NOMBRE"]),
                             utf8_decode($row[1]),
                             utf8_decode($row[2]),
                             utf8_decode($row[3]),
                             utf8_decode($row[4]),
                             utf8_decode($row[5]),
                             utf8_decode($row[6]),
                             utf8_decode($row[7]),
                             utf8_decode($row[8]),
                             utf8_decode($row[9]),
                             utf8_decode($row[10]),
                             utf8_decode($row["LISCAL"])
                             )
                      );
            $n++;
        }
        
    

            $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
