
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
 
   	
			function LoadDatosCursando()
			{				
                $miConex = new Conexion();
            
                $sql="select e.ID, FECHAINS, TCACVE AS TCAL, e.ALUCTR as MATRICULA,e.PDOCVE AS CICLO, e.MATCVE AS MATERIA, f.MATE_DESCRIP AS MATERIAD, ".
                "ifnull(LISCAL,0) as LISCAL,ifnull(LISPA1,0)  as LISPA1,ifnull(LISPA2,0) AS LISPA2,ifnull(LISPA3,0) as LISPA3,".
                "ifnull(LISPA4,0) as LISPA4,ifnull(LISPA5,0) as LISPA5,ifnull(LISPA6,0) as LISPA6,ifnull(LISPA7,0) as LISPA7,".
                "ifnull(LISPA8,0) as LISPA8,ifnull(LISPA9,0) as LISPA9,ifnull(LISPA10,0) as LISPA10, ifnull(LISPA11,0) as LISPA11,".
                "ifnull(LISPA12,0) AS LISPA12,ifnull(LISPA13,0) AS LISPA13,ifnull(LISPA14,0) AS LISPA14,ifnull(LISPA15,0) AS LISPA15,".
                " e.GPOCVE AS GRUPO, e.LISTC15 as PROFESOR, concat(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS PROFESORD,".
                " (select count(*) from eunidades l where l.UNID_MATERIA=e.MATCVE and UNID_PRED='') AS NUMUNI,".
                " getcuatrimatxalum(e.MATCVE,ALUCTR) AS SEM ".
                " from dlista e, cmaterias f, pempleados g  where  e.LISTC15=g.EMPL_NUMERO and e.MATCVE=f.MATE_CLAVE".
                " and PDOCVE='".$_GET["ciclo"]."'".    	                     
                " AND e.ALUCTR='".$_GET["matricula"]."' and e.BAJA='N' and CERRADO='S' order by PDOCVE DESC";
                
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

            function LoadDatosCiclo()
			{				
                $miConex = new Conexion();
                $sql="SELECT * FROM ciclosesc where CICL_CLAVE='".$_GET["ciclo"]."'";
                
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
          
            function LoadDatosAlumnos()
			{				
                $miConex = new Conexion();
                $sql="select ALUM_MATRICULA,  CONCAT(ALUM_NOMBRE, ' ',ALUM_APEPAT, ' ',ALUM_APEMAT) AS NOMBRE, ".
                " ALUM_CARRERAREG AS CARRERA, ALUM_ACTIVO AS SITUACION, ALUM_CICLOTER AS CICLOTER, ".
                " ALUM_CICLOINS AS CICLOINS, CARR_DESCRIP AS CARRERAD, ".
                " PLACRED, PLAMAT,  c.CLAVEOF AS ESPECIALIDAD, ALUM_MAPA AS MAPA, getPeriodos('".$_GET["matricula"]."','".$_GET["ciclo"]."') as PERIODOS".
                " from falumnos a LEFT outer JOIN especialidad c on (a.ALUM_ESPECIALIDAD=c.ID), ccarreras b, mapas d where ".
                " CARR_CLAVE=ALUM_CARRERAREG".
                " and ALUM_MAPA=d.MAPA_CLAVE and a.ALUM_MATRICULA='".$_GET["matricula"]."'";
        
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
			
		
            function boleta($linea) {
                $dataAlum = $this->LoadDatosAlumnos();
                $data = $this->LoadDatosCursando();
                $dataCiclo = $this->LoadDatosCiclo();
            
                $miutil = new UtilUser();                

                $this->Image('../../imagenes/empresa/logo2.png',20,($linea+8),30);

                $this->setY(($linea+10)); 
                $this->setX(50); 
                $this->SetFont('Montserrat-Black','B',10);
                $this->Cell(0,5,utf8_decode('INSTITUTO TECNOLÓGICO SUPERIOR DE MACUSPANA'),'B',1,'C');

                $this->SetFont('Montserrat-SemiBold','B',10);
                $this->setX(50);
                $this->Cell(0,4,utf8_decode('BOLETA DE CALIFICACIONES'),0,0,'L');

                $this->setX(140);
                $this->Cell(0,4,utf8_decode('PERIODO:'),0,0,'L');
                $this->setX(170);
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(0,4,utf8_decode($dataCiclo[0][1]),0,1,'L');

                $fecha=date("d/m/Y"); 
                $this->SetFont('Montserrat-SemiBold','B',10);
                $this->setX(50);
                $this->Cell(0,4,utf8_decode('FECHA DE IMPRESIÓN:'),0,0,'L');
                $this->setX(100);
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(0,4,utf8_decode($fecha),0,0,'L');
                
                $this->setX(140);
                $this->Cell(0,5,utf8_decode('FECHA INS:'),0,0,'L');
                $this->setX(170);
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(0,4,utf8_decode($data[0]["FECHAINS"]),0,1,'L');

                $this->SetFont('Montserrat-Black','B',10);
                $this->setX(20);
                $this->Cell(30,4,utf8_decode($dataAlum[0]["ALUM_MATRICULA"]),0,0,'L');
                $this->Cell(90,4,utf8_decode($dataAlum[0]["NOMBRE"]),0,0,'L');
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(30,4,utf8_decode("NPRDO:"),0,0,'L');
                $this->Cell(30,4,utf8_decode($dataAlum[0]["PERIODOS"]),0,1,'L');

                $this->SetFont('Montserrat-Black','B',10);
                $this->setX(20);
                $this->Cell(30,4,utf8_decode("CARRERA:"),0,0,'L');
                $this->SetFont('Montserrat-SemiBold','',8);
                $this->Cell(90,4,utf8_decode($dataAlum[0]["CARRERAD"]),0,0,'L');
                $this->SetFont('Montserrat-SemiBold','',10);


                
                $this->Ln();
                $this->Ln();
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);  
                $this->SetFont('Montserrat-ExtraBold','B',10);
                $this->Cell(10,5,'NO.',1,0,'C',true);
                $this->Cell(15,5,'SEM.',1,0,'C',true);
                $this->Cell(15,5,'GRUPO',1,0,'C',true);
                $this->Cell(100,5,'MATERIA / PROFESOR',1,0,'C',true);
                $this->Cell(20,5,'TCAL',1,0,'C',true);
                $this->Cell(30,5,utf8_decode('CALIFICACIÓN'),1,0,'C',true);
            
                $this->Ln();

                $this->SetFont('Montserrat-Medium','',8);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(10,15,15,100,20,30));
                $n=1;
                foreach($data as $row) {
                    $this->Row(array( 
                                    $n,
                                    utf8_decode($row["SEM"]),
                                    utf8_decode($row["GRUPO"]),
                                    utf8_decode($row["MATERIAD"]."\n".$row["PROFESORD"]),
                                    utf8_decode($row["TCAL"]),
                                    utf8_decode($row["LISCAL"])                               
                                    )
                            );
                    $n++;
                }

                
                $miutil = new UtilUser();
                $nombre=$miutil->getJefe('303');//Nombre del puesto de control escolar7

                $this->SetFont('Montserrat-Medium','',6);
                $this->Cell(0,5,utf8_decode("NOTA:ACEPTO TODAS LAS CONDICIONES DEL REGLAMENTO PARA ALUMNOS DEL INSTITUTO ". 
                "TECNOLÓGICO SUPERIOR DE MACUSPANA"),'',0,'C');
                $this->Ln(2);
                $this->Cell(0,5,utf8_decode("LAS MATERIAS INDICADAS CON * NO CUMPLEN CON EL PERIODO REQUERIDO"),'',0,'C');

                $this->SetFont('Montserrat-ExtraBold','',8);
                
                $this->setX(10);$this->setY(($linea+122));        
                $this->Cell(80,5,utf8_decode($nombre),'T',0,'L');
                $this->setX(10);$this->setY(($linea+125));
                $this->SetFont('Montserrat-SemiBold','',8);
                $this->Cell(0,5,"JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES",'',0,'L');

               /*
                $this->setX(0);$this->setY(140);
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(0,1,"",'B',0,'L');
                */

     

            }

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(10, 25 , 25);
		$pdf->SetAutoPageBreak(true,10); 
        $pdf->AddPage();
         
        $pdf->boleta(0);
        $pdf->boleta(135);
 
        $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
