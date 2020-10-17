
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
 
   	
			function LoadDatosCursadas()
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="SELECT MATRICULA, NOMBRE,MATERIA, MATERIAD, SEMESTRE,". 
                "(CASE WHEN TIPOMAT='AC' THEN 'AC' WHEN TIPOMAT='SS' THEN 'AC' ELSE CAL END) AS CAL,".
                "TCAL,TCALCONS, CICLO, CICLOD, CREDITO,TIPOMAT, VECES, PRIMERA, SEGUNDA, TERCERA FROM vconstperiodo ".
                "where MATRICULA='".$_GET["matricula"]."' AND CAL>=70 ".
                "and TIPOMAT NOT IN ('T','I','AC','SS')  ORDER BY CICLO,SEMESTRE, MATERIAD";
                //echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

            function LoadDatosCiclo()
			{		
                $data=[];			
                $miConex = new Conexion();
                $sql="SELECT * FROM ciclosesc where CICL_CLAVE=(select MAX(ifnull(PDOCVE,0)) from dlista where ALUCTR='".$_GET["matricula"]."');";
               
                
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }
            

            function LoadDatosCursando($ciclo)
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="SELECT * FROM kardexcursadas where MATRICULA='".$_GET["matricula"]."' and CICLO='".$ciclo."' ORDER BY SEMESTRE, MATERIAD";
                
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
                " ALUM_CICLOINS AS CICLOINS, CARR_DESCRIP AS CARRERAD, ".
                " PLACRED, PLAMAT,  c.CLAVEOF AS ESPECIALIDAD, ALUM_MAPA AS MAPA,".
                " round(getavanceCred('".$_GET["matricula"]."'),0) as AVANCE, ".
                " getPromedio('".$_GET["matricula"]."','N') as PROMEDIO_SR,".
                " getPeriodos('".$_GET["matricula"]."',(select MAX(ifnull(PDOCVE,0)) from dlista where ALUCTR='".$_GET["matricula"]."')) AS PERIODOS,".
                " (SELECT CATA_DESCRIP FROM scatalogos where CATA_TIPO='STALUM' AND CATA_CLAVE=ALUM_ACTIVO) AS STATUS,".
                " getcuatrialum('".$_GET["matricula"]."',getciclo()) as SEMESTRE,".
                " (select SUM(a.CREDITO) from kardexcursadas a where CERRADO='S'  and a.MATRICULA='".$_GET["matricula"]."' AND CAL>=70) AS CRETOT, ".
                " (select SUM(a.CREDITO) from kardexcursadas a where a.CICLO=getciclo() AND CERRADO='N'  and a.MATRICULA='".$_GET["matricula"]."') AS CRECUR ".
                " from falumnos a LEFT outer JOIN especialidad c on (a.ALUM_ESPECIALIDAD=c.ID), ccarreras b, mapas d where ".
                " CARR_CLAVE=ALUM_CARRERAREG".
                " and ALUM_MAPA=d.MAPA_CLAVE and a.ALUM_MATRICULA='".$_GET["matricula"]."'";
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
               
			}
			
			

			function Footer()
			{	
                
                $miutil = new UtilUser();
                $nombre=$miutil->getJefe('303');//Nombre del puesto de Recursos Humanos
                $miutil->getPie($this,'V');
                $this->SetFont('Montserrat-ExtraBold','B',10);
                $this->setY(-50);
                $this->Cell(0,5,"ATENTAMENTE",0,1,'C');
                $this->setY(-40);
                $this->Cell(0,5,utf8_decode($nombre),0,1,'C');
                $this->setY(-35);
                $this->Cell(0,5,"JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES",0,1,'C');
		
			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,50); 
        $pdf->AddPage();
        $dataCiclo=$pdf->LoadDatosCiclo();
        $elciclo=$dataCiclo[0]["CICL_CLAVE"];
         
        $dataGen = $pdf->LoadDatosGen();
        $dataAlum = $pdf->LoadDatosAlumnos();
        $data = $pdf->LoadDatosCursadas();
       // $data2 = $pdf->LoadDatosCursando($elciclo);
        $miutil = new UtilUser();

        $pdf->Ln(3);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'DEPENDENCIA:',0,0,'L');
        $pdf->Cell(35,5,'DPTO DE SERV.ESCS',0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'OFICIO NO.: :',0,0,'L');
        $pdf->Cell(35,5,$_GET["consec"]."/".$_GET["anio"],0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'CLAVE: :',0,0,'L');
        $pdf->Cell(35,5,$dataGen[0]["inst_claveof"],0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'ASUNTO: :',0,0,'L');
        $pdf->Cell(35,5,"CONSTANCIA",0,0,'L');
        $pdf->Ln(15);
        $pdf->Cell(0,5,"A QUIEN CORRESPONDA:",0,0,'L');
        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-Medium','',11);
       
        $loscre=$dataAlum[0]["CRETOT"];
        if ($dataAlum[0]["CRETOT"]>$dataAlum[0]["PLACRED"]) { $loscre=$dataAlum[0]["PLACRED"];}
        //CODIGO QR
        $cadena= "OF:".$_GET["consec"]."-".$_GET["anio"]."|".$dataAlum[0]["ALUM_MATRICULA"]."|".str_replace(" ","|",$dataAlum[0]["NOMBRE"]).
        str_replace(" ","|",$dataAlum[0]["CARRERAD"])."|CREDAVANCE:".$loscre."|AVANCE:".$dataAlum[0]["AVANCE"];     
        $pdf->Image('https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl='.$cadena.'&.png',20,40,28,28);     


        $pdf->MultiCell(0,5,utf8_decode("LA (EL) QUE SUSCRIBE, HACE CONSTAR, QUE SEGÚN EL ARCHIVO ESCOLAR, LA (EL) ".
        $dataAlum[0]["NOMBRE"]." CON  MATRICULA ". $dataAlum[0]["ALUM_MATRICULA"].", ES ".$dataAlum[0]["STATUS"]." EN EL SEMESTRE ".
        $dataAlum[0]["SEMESTRE"]." DE ".$dataAlum[0]["CARRERAD"].", EN EL PERIODO COMPRENDIDO DE ".
        $dataCiclo[0]["CICL_INICIOR"]." AL ". $dataCiclo[0]["CICL_FINR"]." CON UN PERÍODO VACACIONAL DE ".
        $dataCiclo[0]["CICL_VACINI"]." AL ". $dataCiclo[0]["CICL_VACFIN"].", CUBRIENDO ".$loscre." DE UN TOTAL DE ".$dataAlum[0]["PLACRED"].
        " CRÉDITOS DEL PLAN DE ESTUDIOS, UN PROMEDIO DE ".
        $dataAlum[0]["PROMEDIO_SR"]. " CON UN AVANCE DEL ".$dataAlum[0]["AVANCE"]."%. CON LAS CALIFICACIONES QUE ".
        " A CONTINUACION SE ENLISTAN: "),0,'J',FALSE);

        $pdf->Ln(5);
        $pdf->MultiCell(0,5,utf8_decode("CON LAS CALIFICACIONES QUE A CONTINUACION SE ENLISTAN:"),0,'J',FALSE);
        $pdf->Ln();
        $pdf->SetFont('Montserrat-Medium','',8);
        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(0);
        $pdf->SetWidths(array(80,20,50,10,10));
        $n=1;
        $ciclo="";
        $elsem=1;
        $lascal=0; $nummat=0;
        $totalcal=0; $totalmat=0;
        foreach($data as $row) {
            if (!($ciclo==$row["CICLO"])){
                if (!($n==1)) {
                    $pdf->SetFillColor(172,31,6);
                    $pdf->SetTextColor(255);  
                    $pdf->SetFont('Montserrat-ExtraBold','B',9);
                    $pdf->Cell(170,5,utf8_decode("PROMEDIO DEL PERIODO: ".round(($lascal/$nummat),2)),1,0,'L',true);
                    $lascal=0; $nummat=0;
                    $pdf->Ln();
                }
                $pdf->Ln();
                $pdf->SetFillColor(172,31,6);
                $pdf->SetTextColor(255);  
                $pdf->SetFont('Montserrat-ExtraBold','B',9);
                $pdf->Cell(170,5,utf8_decode("SEMESTRE ".$elsem." PERIODO: ".$row["CICLOD"]),1,0,'L',true);
                $pdf->Ln();
                $pdf->Cell(80,5,'MATERIA',1,0,'C',true);
                $pdf->Cell(70,5,utf8_decode('CALIFICACIÓN'),1,0,'C',true);
                $pdf->Cell(10,5,'OPC',1,0,'C',true);
                $pdf->Cell(10,5,'OBS',1,0,'C',true);
                $ciclo=$row["CICLO"];
                $elsem++;                
                $pdf->Ln();
            }
            $pdf->SetFont('Montserrat-Medium','',8);
            $pdf->SetFillColor(172,31,6);
            $pdf->SetTextColor(0);

            $pdf->Row(array( utf8_decode($row["MATERIAD"]),
                             utf8_decode($row["CAL"]),
                             utf8_decode(strtoupper($miutil->aletras($row["CAL"]))),
                             utf8_decode($row["TCALCONS"]),
                             utf8_decode("")
                             )
                      );
            $lascal+=$row["CAL"]; $nummat++;
            $totalcal+=$row["CAL"]; $totalmat++;
            $n++;
        }

            // ultimo periodo 
            $pdf->SetFillColor(172,31,6);
            $pdf->SetTextColor(255);  
            $pdf->SetFont('Montserrat-ExtraBold','B',9);
            $pdf->Cell(170,5,utf8_decode("PROMEDIO DEL PERIODO: ".round(($lascal/$nummat),2)),1,0,'L',true);
            $lascal=0; $nummat=0;
            $pdf->Ln();
    
       

        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(0);
        $pdf->SetFont('Montserrat-Medium','',7);
        $pdf->MultiCell(0,3,utf8_decode("OPC: OR Ordinario, RE Regularización, EX Extraordinario, O2 Ordinario de ".
        "repetición de curso, R2 Regularización de repetición de curso, EE Examen Especial, EQ Equivalencia de ".
        " Estudios, CO Convalidación, RE Revalidación"),0,'J',FALSE);
        $pdf->Ln(5);

        $pdf->SetFont('Montserrat-Medium','',11);
        $pdf->MultiCell(0,5,utf8_decode("PROMEDIO DE LOS PERIODOS LISTADOS ".round(($totalcal/$totalmat),2)),0,'J',FALSE);
        $pdf->Ln(5);

		$fechaof=$miutil->aletras(date("d"))." DÍAS DEL MES DE ".$miutil->getMesLetra(date("m"))." DEL AÑO ". $miutil->aletras(date("Y"));
        $pdf->Ln(5);
   

        $pdf->MultiCell(0,5,utf8_decode("SE EXTIENDE LA PRESENTE EN LA CIUDAD DE MACUSPANA, ESTADO DE TABASCO A LOS ".
        strtoupper($fechaof).", PARA LOS FINES QUE CONVENGAN AL INTERESADO."),0,'J',FALSE);
        

            

         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
