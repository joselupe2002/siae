
<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
    require('../../fpdf/PDF_WriteTag.php');
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";
	

	
	
	class PDF extends PDF_WriteTag {
       
        
        function parseVar($key='',$value='') {
            if(empty($key) or empty($value)) return;
            $nb = $this->page;
            for($n=1;$n<=$nb;$n++) {
               $this->pages[$n] = str_replace($key,$value,$this->pages[$n]);
            }
         }

        var $widths;
        var $aligns;
        var $border;
        var $fondo;

        function SetWidths($w) {$this->widths=$w;}
        
        function SetAligns($a) {$this->aligns=$a;}

        function SetBorder($bor) {$this->border=$bor;}

        function SetFondo($fon) {$this->fondo=$fon;}
        
        function Row($data)
        {
            //Calculate the height of the row
            $nb=0;
            for($i=0;$i<count($data);$i++)
                $nb=max($nb,$this->NbLines($this->widths[$i],$data[$i]));
                $h=3*$nb;
                //Issue a page break first if needed
                $this->CheckPageBreak($h);
                //Draw the cells of the row
                for($i=0;$i<count($data);$i++)
                {
                    $w=$this->widths[$i];
                    $bor=$this->border[$i];
                    $fon=isset($this->fondo[$i]) ? $this->fondo[$i] : false;
                    
                    $a=isset($this->aligns[$i]) ? $this->aligns[$i] : 'L';
                    //Save the current position
                    $x=$this->GetX();
                    $y=$this->GetY();
                    //Draw the border
                   // $this->Rect($x,$y,$w,$h);
                    //Print the text
                    $this->MultiCell($w,3,$data[$i],$bor,$a,$fon);
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
                $miConex = new Conexion();
                $sql="SELECT MATRICULA, NOMBRE,MATERIA, MATERIAD, SEMESTRE, GPOCVE,". 
                "(CASE WHEN TIPOMAT='AC' THEN (select CALLET from ecalcertificado i where i.MATRICULA=a.MATRICULA and i.MATERIA=a.MATERIA limit 1)".
                "      WHEN TIPOMAT='SS' THEN (select CALLET from ecalcertificado i where i.MATRICULA=a.MATRICULA and i.MATERIA=a.MATERIA limit 1) ".
                " ELSE CAL END) AS CAL,".
                "TCAL,CICLO,CREDITO,TIPOMAT, VECES, PRIMERA, SEGUNDA, TERCERA FROM kardexcursadas a ".
                " where MATRICULA='".$_GET["matricula"]."' AND CAL>=70 AND CERRADO='S' AND CERRADO='S' ORDER BY SEMESTRE, MATERIAD";
            
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

            function LoadDatosCertificado()
			{				
                $miConex = new Conexion();
                $sql="SELECT * FROM vecertificado where FOLIO=".$_GET["folio"];                
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }
            

            function LoadDatosAlumnos()
			{				
                $miConex = new Conexion();
                $sql="select ALUM_MATRICULA, CONCAT(ALUM_NOMBRE, ' ',ALUM_APEPAT, ' ',ALUM_APEMAT) AS NOMBRE, ".
                " ALUM_CARRERAREG AS CARRERA, ALUM_ACTIVO AS SITUACION, ALUM_CICLOTER AS CICLOTER, ".
                " ALUM_CICLOINS AS CICLOINS, CARR_DESCRIP AS CARRERAD, ".
                " PLACRED, PLAMAT,  c.CLAVEOF AS ESPECIALIDAD, ALUM_MAPA AS MAPA,".
                " getavance('".$_GET["matricula"]."') as AVANCE, ".
                " getPromedio('".$_GET["matricula"]."','N') as PROMEDIO_SR,".
                " getPromedio('".$_GET["matricula"]."','S') as PROMEDIO_CR, ".
                " getPeriodos('".$_GET["matricula"]."',getciclo()) AS PERIODOS,".
                " (select SUM(a.CREDITO) from kardexcursadas a where a.CICLO=getciclo() and CERRADO='N' and a.MATRICULA='".$_GET["matricula"]."') AS CRECUR, ".
                " (select SUM(a.CREDITO) from kardexcursadas a where CERRADO='S' and a.cal>=70 and a.MATRICULA='".$_GET["matricula"]."') AS CREDACUM ".
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
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("SQLite","SELECT * from INSTITUCIONES where _INSTITUCION='".$_SESSION['INSTITUCION']."'");
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			function Header()
			{
			}
			

			function Footer()
			{				
               
			}
			
		}
		
		$pdf = new PDF('P','mm','Legal');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',8);
		$pdf->SetMargins(10, 20 , 32);
		$pdf->SetAutoPageBreak(true,20); 
        $pdf->AddPage();

        $pdf->AddFont('Montserrat-Black','B','Montserrat-Black.php');
		$pdf->AddFont('Montserrat-Black','','Montserrat-Black.php');
		$pdf->AddFont('Montserrat-Medium','B','Montserrat-Medium.php');
		$pdf->AddFont('Montserrat-Medium','','Montserrat-Medium.php');
		$pdf->AddFont('Montserrat-SemiBold','','Montserrat-SemiBold.php');
		$pdf->AddFont('Montserrat-SemiBold','B','Montserrat-SemiBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','B','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','I','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraLight','I','Montserrat-ExtraLight.php');
		$pdf->AddFont('Montserrat-ExtraLight','','Montserrat-ExtraLight.php');


        $margeniz=50;
      		 
        $dataAlum = $pdf->LoadDatosAlumnos();
        $data = $pdf->LoadDatosCursadas();
        $data2 = $pdf->LoadDatosGen();
        $dataCer = $pdf->LoadDatosCertificado();
        $miutil = new UtilUser();
        $nombre=$miutil->getJefe('101');//Nombre del puesto DIRECTOR GENERAL
        $nombreEsc=$miutil->getJefe('303');//Nombre del puesto ESCOLARES

        $pdf->SetStyle("p","Montserrat-Medium","",10,"0,0,0");
        $pdf->SetStyle("vs","Montserrat-Medium","U",10,"0,0,0");
		$pdf->SetStyle("vsb","Montserrat-ExtraBold","UB",10,"0,0,0");
        $pdf->SetStyle("vb","Montserrat-ExtraBold","B",10,"0,0,0");

        
        $iniCiclo=$miutil->formatFecha($dataCer[0]["FECHAINICIO"]);
        $cadInicio=strtoupper($miutil->getMesLetra(date("m", strtotime($iniCiclo))). " DE ".date("Y", strtotime($iniCiclo)));

        $finCiclo=$miutil->formatFecha($dataCer[0]["FECHAINICIO"]);
        $cadfin=strtoupper($miutil->getMesLetra(date("m", strtotime($finCiclo))). " DE ".date("Y", strtotime($finCiclo)));

        $pdf->setY(25);
        $pdf->WriteTag(0,3,"<p>FOLIO: <vsb>".$dataCer[0]["FOLIO"]."</vsb><p>",0,'R');
    

		$pdf->setY(35);
        $pdf->setX($margeniz);
        $pdf->WriteTag(135,3,utf8_decode("<p>EL C. ".$nombre." DIRECTOR GENERAL DEL <vb>". $data2[0]["inst_razon"].
        "</vb> CLAVE ". $data2[0]["inst_claveof"].", CERTIFICA, QUE SEGÚN CONSTANCIAS QUE EXISTEN EN EL ARCHIVO ESCOLAR, EL C. ".
        $dataAlum[0]["NOMBRE"]." CURSO LAS ASIGNATURAS QUE INTEGRAN EL PLAN DE ESTUDIOS DE ".$dataAlum[0]["CARRERAD"].
        "(".$dataAlum[0]["MAPA"]."-".$dataAlum[0]["PLACRED"].") DE ". $cadInicio." A ".$finCiclo.
        ", CON LOS RESULTADOS QUE A CONTINUACIÓN SE ENLISTAN</p>") ,0,'J');
        $pdf->Ln();

        $pdf->setY(45);
        $pdf->SetFont('Montserrat-ExtraBold','',8);
        $pdf->Cell(10,5,'',0,0,'C');$pdf->Cell(20,5,'MATRICULA',1,1,'C');
        $pdf->SetFont('Montserrat-Medium','',8);
        $pdf->Cell(10,5,'',0,0,'C');$pdf->Cell(20,5,$dataCer[0]["MATRICULA"],1,0,'C');

       
        $pdf->setX($margeniz);
        $pdf->setY(65);
        $pdf->SetFillColor(231,230,227);
        $pdf->SetFont('Montserrat-Black','',6);
        $pdf->Cell(40,5,'',0,0,'C');
        $pdf->Cell(87,5,'MATERIA','TBL',0,'L',true);
        $pdf->Cell(15,5,'CALIF.','LTBR',0,'C',true);    
        $pdf->Cell(25,5,'OBSERVACIONES',1,0,'C',true);
        $pdf->Cell(8,5,'CR',1,0,'C');
        $pdf->SetFont('Montserrat-Medium','',7,true);

        /*=======================colacamos las calificaciones ==========================*/
        $pdf->Ln();
        $pdf->SetFont('Montserrat-Medium','',6);
        $pdf->SetWidths(array(40,87, 15,25,8));
        $pdf->SetAligns(array('L','L', 'C','J','C'));
        $pdf->SetBorder(array('','L', 'L','L','LR'));
        
        $n=0;
        $sumacal=0;
        $totcred=0;
        foreach($data as $row) {    
            $cadRev='';
            if (($row["GPOCVE"]=='REV') && (($row["TIPOMAT"]!='AC') && ($row["TIPOMAT"]!='SS'))) {$cadRev='*';}
            $pdf->Row(array( "",
                             utf8_decode($row["MATERIAD"]." ".$cadRev),
                             utf8_decode($row["CAL"]),
                             "",
                             str_pad($row["CREDITO"],  2, "0",STR_PAD_LEFT)                             
                             )
                      );
            $totcred+=$row["CREDITO"];
            if  (($row["TIPOMAT"]!='AC') && ($row["TIPOMAT"]!='SS')) {
                $sumacal+=$row["CAL"];
                $n++;
            }            
        }

        //echo $pdf->getY();
        
        while ($pdf->getY()<=280) {
            $pdf->SetBorder(array('','L', 'L','L','LR'));
            $pdf->SetFondo(array(false,false, false,false,false));
            $pdf->Row(array("", "","","",""));
        }
    
        /*=======================colacamos el promedio ==========================*/
        $promedio=round($sumacal/($n));
        $pdf->SetWidths(array(40,87, 15,25,8));
        $pdf->SetBorder(array('','TBL', '1','1','1'));
        $pdf->SetAligns(array('L','L', 'R','J','C'));
        $pdf->SetFillColor(231,230,227);
        $pdf->SetFont('Montserrat-Black','',8);
        $pdf->SetFondo(array(false,true, true,true,true));
        $pdf->Row(array("", "PROMEDIO",$promedio,"",""));



        $fechaexp=$miutil->formatFecha($dataCer[0]["FECHAEXP"]);
        $fechadecexp=$miutil->aletras(date("d", strtotime($fechaexp)))." DÍAS DEL MES DE ".
                     $miutil->getMesLetra(date("m", strtotime($fechaexp)))." DEL AÑO ". $miutil->aletras(date("Y", strtotime($fechaexp)));
      
        $pdf->Ln(5);

        $pdf->SetFont('Montserrat-Medium','',8);
        $pdf->Ln();
        $pdf->setX($margeniz);
        $pdf->WriteTag(0,3,utf8_decode("<p>SE EXTIENDE EL PRESENTE CERTIFICADO QUE AMPARA <vsb>".$totcred.
        "</vsb> CRÉDITOS DE UN TOTAL DE <vsb>".$dataAlum[0]["PLACRED"]."</vsb> QUE INTEGRAN EL PLAN DE ESTUDIO CLAVE <vsb>".
        $dataAlum[0]["MAPA"]."</vsb>, EN MACUSPANA TABASCO A LOS ".strtoupper($fechadecexp)."</p>" ) ,0,'J');
        $pdf->Ln(10);




        $pdf->setX($margeniz);
        $pdf->Cell(0,0,"DIRECTOR GENERAL",0,1,'C');
        $pdf->Ln(10);
        $pdf->setX($margeniz);
        $pdf->Line(80,320,150,320);
        $pdf->Cell(0,0,utf8_decode($nombre),0,1,'C');


        $pdf->SetFont('Arial','',6);
        $fechacer= date("Y", strtotime($fechaexp))."-".$miutil->getMesRomano(date("m", strtotime($fechaexp)))."-".date("d", strtotime($fechaexp));
        $pdf->setY(225);
        $pdf->Cell(10,2,'',0,0,'C');$pdf->Cell(28,2,'','TLR',1,'C');
        $pdf->Cell(10,2,'',0,0,'C');$pdf->Cell(28,2,'REGISTRADO EN EL','LR',1,'C');
        $pdf->Cell(10,2,'',0,0,'C');$pdf->Cell(28,2,'DEPARTAMENTO DE','LR',1,'C');
        $pdf->Cell(10,2,'',0,0,'C');$pdf->Cell(28,2,'SERVICIOS ESCOLARES','LR',1,'C');
        $pdf->Cell(10,2,'',0,0,'C');$pdf->Cell(28,2,'','LRB',1,'C');

        $pdf->Cell(10,4,'',0,0,'C');$pdf->Cell(28,4,'','TLR',1,'C');
        $pdf->Cell(10,4,'',0,0,'C');$pdf->Cell(10,4,'CON NO.','L',0,'L'); $pdf->Cell(18,4, $dataCer[0]["FOLIO"],'RB',1,'C');
        $pdf->Cell(10,4,'',0,0,'C');$pdf->Cell(18,4,'CON EL LIBRO','L',0,'L'); $pdf->Cell(10,4, $dataCer[0]["LIBRO"],'RB',1,'C');
        $pdf->Cell(10,4,'',0,0,'C');$pdf->Cell(10,4,'A FOJAS','L',0,'L'); $pdf->Cell(18,4, $dataCer[0]["FOJA"],'RB',1,'C');

        $pdf->Cell(10,4,'',0,0,'C');$pdf->Cell(2,4,'','L',0,'C');$pdf->Cell(24,4,$fechacer,'B',0,'C'); $pdf->Cell(2,4,'','R',1,'C');
        $pdf->Cell(10,4,'',0,0,'C');$pdf->Cell(2,4,'','LB',0,'C');$pdf->Cell(24,4,"FECHA",'B',0,'C'); $pdf->Cell(2,4,'','RB',1,'C');
  
        $pdf->Cell(10,5,'',0,0,'C');$pdf->Cell(28,5,'COTEJO','',1,'C');
        $pdf->Cell(10,2,'',0,0,'C');$pdf->Cell(28,2,'JEFE DEL DEPARTAMENTO','',1,'C');
        $pdf->Cell(10,2,'',0,0,'C');$pdf->Cell(28,2,'DE SERVICIOS ESCOLARES','',1,'C');
        
        $pdf->Ln(5);
        $pdf->Cell(10,2,'',0,0,'C');$pdf->MultiCell(28,2,$nombreEsc,0,'C',false);

/*=========================COLOCAMOS LAS OBSERVACIONES ===============================*/
        $pdf->setY(56);$pdf->setY(75);
        $pdf->Cell(142,0,"",0,0,'C');
        $pdf->MultiCell(25,2,utf8_decode($dataCer[0]["OBS"]),0,'J',false);
     
      

            $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
