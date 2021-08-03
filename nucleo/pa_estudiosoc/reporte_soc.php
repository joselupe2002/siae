
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
            var $elalumno="";
 
   	
			function LoadDatos()
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="select * from vestudiosoc where MATRICULA='".$_GET["mat"]."'";

				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}


            function LoadDatosInt()
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="SELECT * FROM vest_integrantes where MATRICULA='".$_GET["mat"]."'";
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
                $sql="select a.*, c.*, x.*,  b.*,s.*, t.LOCALIDAD AS ALUM_LOCALIDADD, o.MUNICIPIO AS ALUM_MUNINACD, p.ESTADO as ALUM_EDONACD, q.MUNICIPIO AS ALUM_MUNICIPIOD, r.ESTADO AS ALUM_ESTADOD, ".
                "u.DESCRIP AS GPOINDD, v.DESCRIP AS LENINDD, y.MUNICIPIO AS ALUM_TUTORMUNICIPIOD,z.LOCALIDAD AS ALUM_TUTORLOCD,".
                " round(getavanceCred('".$_GET["mat"]."'),0) as AVANCE, ".
                "(  select COUNT(*) from est_integrantes where PARENTESCO=8 AND MATRICULA ='".$_GET["mat"]."') AS HIJOS,".
                " getPromedio('".$_GET["mat"]."','N') as PROMEDIO_SR,".
                " getPromedioCiclo('".$_GET["mat"]."',(select MAX(ifnull(PDOCVE,0)) from dlista where ALUCTR='".$_GET["mat"]."'),'S') AS PROMEDIO_UC,".
                " getPeriodos('".$_GET["mat"]."',(select MAX(ifnull(PDOCVE,0)) from dlista where ALUCTR='".$_GET["mat"]."')) AS PERIODOS,".
                " (SELECT CATA_DESCRIP FROM scatalogos where CATA_TIPO='STALUM' AND CATA_CLAVE=ALUM_ACTIVO) AS STATUS,".
                " getcuatrialum('".$_GET["mat"]."',getciclo()) as SEMESTRE,".
                " (select SUM(a.CREDITO) from kardexcursadas a where CERRADO='S'  and a.MATRICULA='".$_GET["mat"]."' AND CAL>=70) AS CRETOT, ".
                " (select SUM(a.CREDITO) from kardexcursadas a where a.CICLO=getciclo() AND CERRADO='N'  and a.MATRICULA='".$_GET["mat"]."') AS CRECUR ".
                " from falumnos a ".
                " LEFT outer JOIN cat_municipio o on (o.ID_MUNICIPIO=ALUM_MUNINAC)".
                " LEFT outer JOIN cat_estado p on (p.ID_ESTADO=ALUM_EDONAC)".
                " LEFT outer JOIN cat_municipio q on (q.ID_MUNICIPIO=ALUM_MUNICIPIO)".
                " LEFT outer JOIN cat_estado r on (r.ID_ESTADO=ALUM_ESTADO)".
                " LEFT outer JOIN descue s on (s.ESCCVE=ALUM_ESCPROV)".
                " LEFT outer JOIN cat_localidad t on (t.ID_LOCALIDAD=ALUM_LOCALIDAD)".
                " LEFT outer JOIN grupoindigena u on (u.IDGRUPO=GPOIND)".
                " LEFT outer JOIN lenguaindigena v on (v.IDLENGUA=LENIND)".
                " LEFT outer JOIN eedocivil x on (x.EDOC_CLAVE=ALUM_EDOCIVIL)".
                " LEFT outer JOIN cat_municipio y on (y.ID_MUNICIPIO=ALUM_TUTORMUNICIPIO)".
                " LEFT outer JOIN cat_localidad z on (z.ID_LOCALIDAD=ALUM_TUTORLOC)".
                
                " LEFT outer JOIN especialidad c on (a.ALUM_ESPECIALIDAD=c.ID), ccarreras b, mapas d where ".
                " CARR_CLAVE=ALUM_CARRERAREG".
                " and ALUM_MAPA=d.MAPA_CLAVE and a.ALUM_MATRICULA='".$_GET["mat"]."'";
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
          
                $this->SetFont('Montserrat-ExtraBold','B',10);
                $this->setY(-50);
                $this->Cell(0,5,"ATENTAMENTE",0,1,'C');
                $this->setY(-40);
                $this->Cell(0,5,utf8_decode($this->elalumno),0,1,'C');
                $this->setY(-35);
                $this->Cell(0,5,"ALUMNO",0,1,'C');
        
                
			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,50); 
        $pdf->AddPage();

        $dataGen = $pdf->LoadDatosGen();
        $dataAlum = $pdf->LoadDatosAlumnos();
        $data = $pdf->LoadDatos();
        $dataInt = $pdf->LoadDatosInt();
      
        $miutil = new UtilUser();

        $pdf->elalumno=$dataAlum[0]["ALUM_NOMBRE"]." ". $dataAlum[0]["ALUM_APEPAT"]." ". $dataAlum[0]["ALUM_APEMAT"];

        $pdf->Ln(3);
        $sh=""; $sm="X"; if ($dataAlum[0]["ALUM_SEXO"]=="1") {$sh="X"; $sm="";}
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,'NOMBRE:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(105,5,utf8_decode($pdf->elalumno),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,'SEXO:   M',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(10,5,$sh,"B",0,'C');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(5,5,'F',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(10,5,$sm,"B",0,'C');
        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,'CARRERA:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(105,5,utf8_decode($dataAlum[0]["CARR_DESCRIP"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(10,5,'CURP:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(35,5,$dataAlum[0]["ALUM_CURP"],"B",0,'C');
      
        $pdf->Ln(10);

        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(20,5,'PROCEDENCIA:',0,0,'L');
        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,'LUGAR DE NACIMIENTO:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(130,5,utf8_decode($dataAlum[0]["ALUM_MUNINACD"].", ".$dataAlum[0]["ALUM_EDONACD"]),"B",0,'L');
        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,'FECHA DE NACIMIENTO:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(20,5,utf8_decode($dataAlum[0]["ALUM_FECNAC"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(35,5,'ESC. PROCEDENCIA:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(75,5,utf8_decode($dataAlum[0]["ESCNOM"]),"B",0,'L');
        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(30,5,'ESPECIALIDAD:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(30,5,utf8_decode($dataAlum[0]["CLAVEOF"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(35,5,'PROMEDIO GRAL.:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(17,5,utf8_decode($dataAlum[0]["PROMEDIO_SR"]),"B",0,'C');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,'PROMEDIO ULT. CICLO:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(18,5,utf8_decode($dataAlum[0]["PROMEDIO_UC"]),"B",0,'C');

        $pdf->Ln(10);


        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(20,5,'DOMICILIO:',0,0,'L');
        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(15,5,'CALLE:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(135,5,utf8_decode($dataAlum[0]["ALUM_DIRECCION"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(10,5,'C.P.:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(10,5,utf8_decode($dataAlum[0]["ALUM_CP"]),"B",0,'C');

        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,'COLONIA:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(90,5,utf8_decode($dataAlum[0]["ALUM_COLONIA"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,'MUNICIPIO:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(40,5,utf8_decode($dataAlum[0]["ALUM_MUNICIPIOD"]),"B",0,'L');

        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,'LOCALIDAD:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(90,5,utf8_decode($dataAlum[0]["ALUM_LOCALIDADD"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,utf8_decode('TELÉFONO:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(40,5,utf8_decode($dataAlum[0]["ALUM_TELEFONO"]),"B",0,'L');

        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,utf8_decode('CORREO ELECTRÓNICO:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(130,5,utf8_decode($dataAlum[0]["ALUM_CORREO"]),"B",0,'L');

        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,'BECAS QUE TIENE:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(130,5,utf8_decode($data[0]["BECAS"]),"B",0,'L');

        $pdf->Ln();
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,utf8_decode('EXPERIENCIA LABORAL:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(130,5,utf8_decode($dataAlum[0]["ALUM_TRABAJO"]),"B",0,'L');

        $pdf->Ln(10);
        
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(20,5,utf8_decode('SERVICIO MÉDICO:'),0,0,'L');
        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,utf8_decode('TIPO DE SERVICIO:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(130,5,utf8_decode("IMSS (X) ISSTE ( ) PEMEX ( ) ISSET ( ) PARTICULAR ( )"),"",0,'L');

        $pdf->Ln();
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(30,5,utf8_decode('INSTITUTCIÓN:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(80,5,utf8_decode("INST. MEXICANO DEL SEGURO SOCIAL"),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(35,5,utf8_decode('NO. DE AFILIACIÓN:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(25,5,utf8_decode($dataAlum[0]["ALUM_NOSEGURO"]),"B",0,'L');

        $pdf->Ln();
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(30,5,utf8_decode('TIPO DE SANGRE:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(20,5,utf8_decode($dataAlum[0]["ALUM_TIPOSANGRE"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(35,5,utf8_decode('GRUPO INDIGENA:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(25,5,utf8_decode($dataAlum[0]["GPOINDD"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(35,5,utf8_decode('LENGUA INDIGENA:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(25,5,utf8_decode($dataAlum[0]["LENINDD"]),"B",0,'L');
        $pdf->Ln(10);

        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(20,5,'DATOS FAMILIARES:',0,0,'L');
        $pdf->Ln();

      
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(30,5,utf8_decode('ESTADO CIVIL:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(30,5,utf8_decode($data[0]["EDOCIVD"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(30,5,utf8_decode('NO. HIJOS:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(20,5,utf8_decode($dataAlum[0]["HIJOS"]),"B",0,'C');
        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,utf8_decode('NOMBRE DEL PADRE:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(100,5,utf8_decode($dataAlum[0]["ALUM_PADRE"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(10,5,utf8_decode('VIVE:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(20,5,utf8_decode($dataAlum[0]["ALUM_PADREVIVE"]),"B",0,'C');
        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,utf8_decode('NOMBRE DE LA MADRE:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(100,5,utf8_decode($dataAlum[0]["ALUM_MADRE"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(10,5,utf8_decode('VIVE:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(20,5,utf8_decode($dataAlum[0]["ALUM_MADREVIVE"]),"B",0,'C');
        $pdf->Ln(10);

        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(20,5,'TUTOR:',0,0,'L');
        $pdf->Ln();



        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(25,5,utf8_decode('NOMBRE:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(145,5,utf8_decode($dataAlum[0]["ALUM_TUTOR"]),"B",0,'L');
        $pdf->Ln();
        
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(15,5,'CALLE:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(135,5,utf8_decode($dataAlum[0]["ALUM_TUTORDIR"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(10,5,'C.P.:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(10,5,utf8_decode($dataAlum[0]["ALUM_TUTORCP"]),"B",0,'C');
        $pdf->Ln();
   
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,'COLONIA:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(90,5,utf8_decode($dataAlum[0]["ALUM_TUTORCOL"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,'MUNICIPIO:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(40,5,utf8_decode($dataAlum[0]["ALUM_TUTORMUNICIPIOD"]),"B",0,'L');
        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,'LOCALIDAD:',0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(90,5,utf8_decode($dataAlum[0]["ALUM_TUTORLOCD"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(20,5,utf8_decode('TELÉFONO:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(40,5,utf8_decode($dataAlum[0]["ALUM_TUTORTEL"]),"B",0,'L');

        $pdf->Ln();

        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Cell(40,5,utf8_decode('CORREO ELECTRÓNICO:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(130,5,utf8_decode($dataAlum[0]["ALUM_TUTORCORREO"]),"B",0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',8);
        $pdf->Ln();
        $pdf->Cell(40,5,utf8_decode('CORREO ELECTRÓNICO:'),0,0,'L');
        $pdf->SetFont('Montserrat-Medium','B',8);
        $pdf->Cell(130,5,utf8_decode($dataAlum[0]["ALUM_TUTORTRABAJO"]),"B",0,'L');

/*===================HOJA NUMERO 2 ==========================*/
         $pdf->AddPage();

         $pdf->SetFont('Montserrat-ExtraBold','B',10);
         $pdf->Cell(20,5,'INTEGRANTES DE LA FAMILIA:',0,0,'L');
         $pdf->Ln();
 

            $pdf->SetFont('Montserrat-ExtraBold','B',7);
			$pdf->SetDrawColor(0,0,0);
			$pdf->SetLineWidth(.2);
			$pdf->SetFillColor(172,31,6);
			$pdf->SetTextColor(255);
			$pdf->Cell(50,8,"NOMBRE",'1',0,'C',TRUE);
			$pdf->Cell(20,8,"ESCOLARIDAD",'1',0,'C',TRUE);
			$pdf->Cell(20,8,"PARENTESCO",'1',0,'C',TRUE);
			$pdf->Cell(50,8,utf8_decode("OCUPACIÓN"),'1',0,'C',TRUE);
            $pdf->Cell(30,8,utf8_decode("INGRESOS"),'1',0,'C',TRUE);
		
			$pdf->SetDrawColor(0,0,0);
			$pdf->SetLineWidth(.2);
			$pdf->SetFillColor(255,255,255);
			$pdf->SetTextColor(0);
			$pdf->Ln();
            $pdf->SetFont('Montserrat-Medium','B',7);
			foreach($dataInt as $row2) {
				$pdf->SetWidths(array(50,20,20,50,30)); //184
				$pdf->SetAligns(array("L","L","L","L","R"));
				$pdf->Row(array(utf8_decode($row2["NOMBRE"]),utf8_decode($row2["ESCOLARIDADD"]),
                utf8_decode($row2["PARENTESCOD"]),utf8_decode($row2["OCUPACION"]),
                utf8_decode(number_format($row2["INGRESO"],2,'.',',') )));				
			}

            $pdf->Ln();
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(80,5,'QUE ENFERMEDADES EXISTEN EN TU FAMILIA:',0,0,'L');
            $pdf->SetFont('Montserrat-Medium','B',8);
            $pdf->Cell(90,5,utf8_decode($data[0]["FAMI_ENFERMEDADES"]),"B",0,'L');
          
            $pdf->Ln(10);
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(40,5,'LA CASA DONDE VIVE ES:',0,0,'L');
            $pdf->SetFont('Montserrat-Medium','B',8);
            $pdf->Cell(80,5,utf8_decode($data[0]["CASAD"]),"B",0,'L');
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(40,5,'ES CABEZA DE FAMILIA:',0,0,'L');
            $pdf->SetFont('Montserrat-Medium','B',8);
            $pdf->Cell(10,5,utf8_decode($data[0]["ESCABEZA"]),"B",0,'C');
            $pdf->Ln(10);
            $pdf->SetFont('Montserrat-ExtraBold','B',10);
            $pdf->Cell(20,5,'SERVICIOS CON LOS QUE CUENTA:',0,0,'L');
            $pdf->Ln();

            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(5,5,$data[0]["SER_ENERGIA"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('ENERGÍA ELÉCTRICA'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_REFRIGERADOR"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('REFRIGERADOR'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_RADIO"],1,0,'L');
            $pdf->Cell(51,5,utf8_decode('RADIO'),1,0,'L');
            $pdf->Ln();
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(5,5,$data[0]["SER_DRENAJE"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('DRENAJE'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_TV"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('TELEVISIÓN'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_COMPUTADORA"],1,0,'L');
            $pdf->Cell(51,5,utf8_decode('COMPUTADORA'),1,0,'L');
            $pdf->Ln();
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(5,5,$data[0]["SER_AGUA"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('AGUA POTABLE'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_TELFIJO"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('TELÉFONO FIJO'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_CONSOLA"],1,0,'L');
            $pdf->Cell(51,5,utf8_decode('CONSOLA DE VIDEOJUEGOS'),1,0,'L');
            $pdf->Ln();
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(5,5,$data[0]["SER_GAS"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('GAS'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_TELCEL"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('TELÉFONO CELULAR'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_INTERNET"],1,0,'L');
            $pdf->Cell(51,5,utf8_decode('SERVICIO DE INTERNET'),1,0,'L');
            $pdf->Ln();
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(5,5,$data[0]["SER_LAVADORA"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('LAVADORA'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_HORNOMICRO"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('HORNO DE MICROONDAS'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["SER_STREAMING"],1,0,'L');
            $pdf->Cell(51,5,utf8_decode('SERVICIO DE STREAMING'),1,0,'L');


            $pdf->Ln(10);


            $gastos=$data[0]["GASTO_ALIMENTACION"]+$data[0]["GASTO_EDUCACION"]+$data[0]["GASTO_RENTA"]+
            $data[0]["GASTO_LUZ"]+$data[0]["GASTO_AGUA"]+
            $data[0]["GASTO_TRANSPORTE"]+$data[0]["GASTO_COMBUSTIBLE"]+$data[0]["GASTO_INTERNET"]+$data[0]["GASTO_STREAMING"]+
            $data[0]["GASTO_OTROS"];

            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(70,5,'DE QUIEN DEPENDES ECONOMICAMENTE:',0,0,'L');
            $pdf->SetFont('Montserrat-Medium','B',8);
            $pdf->Cell(40,5,utf8_decode($data[0]["DEPENDED"]),"B",0,'L');
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(35,5,'TOTAL GASTOS MES:',0,0,'L');
            $pdf->SetFont('Montserrat-Medium','B',8);
            $pdf->Cell(25,5,"$ ".number_format($gastos,2,'.',','),"B",0,'L');


            $pdf->Ln();
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(70,5,'TIENES ALGUNA DISCPACIDAD:',0,0,'L');
            $pdf->SetFont('Montserrat-Medium','B',8);
            $pdf->Cell(100,5,utf8_decode($data[0]["DISCAPACIDADD"]),"B",0,'L');

            $pdf->Ln();
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(90,5,'ALGUN FAMILIAR PERTENECE AL PROGRAMA PROSPERA:',0,0,'L');
            $pdf->SetFont('Montserrat-Medium','B',8);
            $pdf->Cell(80,5,utf8_decode($data[0]["FAMI_PROSPERA"]),"B",0,'L');


            $pdf->Ln(10);
            $pdf->SetFont('Montserrat-ExtraBold','B',10);
            $pdf->Cell(20,5,'SERVICIOS QUE TIENE SU COMUNIDAD:',0,0,'L');
            $pdf->Ln();



            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(5,5,$data[0]["COMU_ESCUELA"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('ESCUELAS'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["COMU_CENTRO"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('CENTRO DE SALUD'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["COMU_PAVIEMENTO"],1,0,'L');
            $pdf->Cell(51,5,utf8_decode('PAVIMENTACIÓN'),1,0,'L');
            $pdf->Ln();
            $pdf->SetFont('Montserrat-ExtraBold','B',8);
            $pdf->Cell(5,5,$data[0]["COMU_ALUMBRADO"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('ALUMBRADO'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["COMU_TELEFONO"],1,0,'L');
            $pdf->Cell(52,5,utf8_decode('TELÉFONO PÚBLICO'),1,0,'L');
            $pdf->Cell(5,5,$data[0]["COMU_TRANSPORTE"],1,0,'L');
            $pdf->Cell(51,5,utf8_decode('TRANSPORTE PÚBLICO'),1,0,'L');
            $pdf->Ln();

        
         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
