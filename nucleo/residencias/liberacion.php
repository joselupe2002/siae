
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

          
      
            function LoadDatosAlumnos($matricula)
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select ALUM_MATRICULA, CONCAT(ALUM_NOMBRE, ' ',ALUM_APEPAT, ' ',ALUM_APEMAT) AS NOMBRE, ".
                " ALUM_CARRERAREG AS CARRERA, ALUM_ACTIVO AS SITUACION, ALUM_CICLOTER AS CICLOTER, ".
                " ALUM_CICLOINS AS CICLOINS, CARR_DESCRIP AS CARRERAD, ".
                " PLACRED, PLAMAT,  c.CLAVEOF AS ESPECIALIDAD, ALUM_MAPA AS MAPA ".
                " from falumnos a LEFT outer JOIN especialidad c on (a.ALUM_ESPECIALIDAD=c.ID), ccarreras b, mapas d where ".
                " CARR_CLAVE=ALUM_CARRERAREG".
                " and ALUM_MAPA=d.MAPA_CLAVE and a.ALUM_MATRICULA='".$matricula."'";
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

                $this->setY(-50);
                $this->Cell(0,15,$nombre,0,1,'L');
                $this->setY(-40);
                $this->Cell(0,5,"JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES",0,1,'L');

		
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
        $dataAlum = $pdf->LoadDatosAlumnos($data[0]["MATRICULA"]);
    
        $miutil = new UtilUser();
        $pdf->Ln(3);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'DEPENDENCIA:',0,0,'L');
        $pdf->Cell(35,5,'DPTO DE SERV.ESCS',0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'OFICIO NO:',0,0,'L');
        $pdf->Cell(35,5,$_GET["consec"]."/".$_GET["anio"],0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'CLAVE:',0,0,'L');
        $pdf->Cell(35,5,$dataGen[0]["inst_claveof"],0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'ASUNTO:',0,0,'L');
        $pdf->Cell(35,5,utf8_decode("LIBERACIÓN DE"),0,0,'L');
        $pdf->Cell(35,5,'',0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'        ',0,0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(35,5,"RESIDENCIA PROFESIONAL",0,0,'L');

        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Ln(15);
        $pdf->Cell(0,5,utf8_decode("C. ".$dataAlum[0]["NOMBRE"]),0,0,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,5,utf8_decode("NÚMERO DE CONTROL: ".$dataAlum[0]["ALUM_MATRICULA"]),0,0,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,5,utf8_decode("PLAN DE ESTUDIOS CLAVE: ".$dataAlum[0]["MAPA"]),0,0,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,5,utf8_decode($dataAlum[0]["CARRERAD"]),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','',10);

        $pdf->Ln(15);
        $pdf->MultiCell(0,5,utf8_decode("POR MEDIO DEL PRESENTE LE COMUNICO QUE HA SIDO LIBERADA LA RESIDENCIA PROFESIONAL CON EL PROYECTO \"".
        $data[0]["PROYECTO"])."\".",0,'J',FALSE);

        $pdf->Ln(5);
        $pdf->MultiCell(0,5,utf8_decode("REALIZADA EN LA EMPRESA O INSTITUCION \"".
        $data[0]["EMPRESAD"]."\ EN EL PERIODO COMPRENDIDO DEL ". $data[0]["INICIA"]." AL ".  $data[0]["TERMINA"].
        " CONTANDO CON EL(LOS) ASESOR(ES) EXTERNO(S) ". $data[0]["ASESOREXT"].
        " Y EL(LOS) ASESOR(ES) INTERNO(S) ".$data[0]["ASESOR"]),0,'J',FALSE);

        $pdf->Ln(5);
        $pdf->MultiCell(0,5,utf8_decode("LO ANTERIOR CON FUNDAMENTO EN EL MANUAL DE PROCEDIMIENTOS PARA LA PLANEACION ".        
        " OPERACIÓN Y ACREDITACION DE LAS RESIDENCIAS PROFESIONALES. SEGÚN LO AVALA CON EL PROYECTO PRESENTADO POR EL ".
        " ALUMNO QUE ESTA EN CUSTODIA EN EL DEPARTAMENTO ACADEMICO. "),0,'J',FALSE);
    
        $pdf->Ln(5);
        $pdf->MultiCell(0,5,utf8_decode(" SIN MÁS POR EL MOMENTO."),0,'J',FALSE);
        $pdf->Ln(5);
       
      

         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
