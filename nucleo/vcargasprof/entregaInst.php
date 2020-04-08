
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
   	
   	/*========================================================================================================*/
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
   			$h=5*$nb;
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
   	
   	/*========================================================================================================*/
   	        
   	     var $eljefe="";
   	       
   	       function getDatosPersona($num){   		       
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
            			"EMPL_FOTO, EMPL_DEPTOD, EMPL_JEFEABREVIA,EMPL_JEFE, EMPL_JEFED, EMPL_RFC, EMPL_CURP, EMPL_NUMERO, EMPL_FECING ".
            			" FROM vempleados WHERE EMPL_NUMERO= '".$num."'" );
                foreach ($resultado as $row) {$data[] = $row;}            
            	return $data;            		
            }
            
            
            function getJefeCarrera($carr){
            	$miConex = new Conexion();
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
            			"EMPL_FOTO, EMPL_DEPTOD, EMPL_JEFEABREVIA,EMPL_JEFE, EMPL_JEFED, EMPL_RFC, EMPL_CURP, EMPL_NUMERO, EMPL_FECING ".
            			" FROM vempleados WHERE EMPL_NUMERO IN (SELECT URES_JEFE FROM fures WHERE CARRERA='".$carr."')");
            	foreach ($resultado as $row) {$data[] = $row;}
            	return $data;
            }
   	
			function LoadData()
			{				
				$cad=" and a.CARRERA='".$_GET["tipov"]."'";
				if ($_GET["tipo"]=='DEPTO') { $cad=" and a.DEPTO='".$_GET["tipov"]."'";}
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select a.MATERIA,a.MATERIAD, a.CARRERAD, ".
						                        "(SELECT COUNT(*) from eunidades l where l.UNID_MATERIA=a.MATERIA and UNID_PRED='')".
                                                " from vcargasprof a where a.PROFESOR='".$_GET["profesor"]."'".
						                        $cad." and a.CICLO='".$_GET["ciclo"]."'".
						                        " and ifnull(a.TIPOMAT,'U') NOT IN ('T')");				
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
				

				$this->SetY(20);$this->SetX(25);
				$this->Cell(40,15,"",1,0,'L',false);
				$this->SetFont('Times','B',9);
				$this->Cell(90,3,"FORMATO DE AUTORIZACIÓN DE PLANEACIÓN E","TRL",0,'C',false);
				$this->Cell(40,15,"",1,0,'L',false);
				
				$this->SetY(23);$this->SetX(65);
				$this->Cell(90,3,"INSTRUMENTACIÓN DIDÁCTICA","B",0,'C',false);
				$this->SetY(26);$this->SetX(65);
				$this->SetFillColor(242,242,242);
				$this->Cell(90,9,"P–ACA–02-F-01",1,0,'C',true);
				$this->Image('../../imagenes/empresa/pie1.png',28,22,23,11);
				
				$this->SetFont('Times','',9);
				$this->SetY(20);$this->SetX(155);
				$this->Cell(40,3,"PÁG. 1 DE 1","TRL",0,'C',false);
				$this->SetY(23);$this->SetX(155);
				$this->Cell(40,3,"REVISIÓN NO. 01","B",0,'C',false);
				$this->SetY(26);$this->SetX(155);
				$this->Cell(40,3,"VIGENTE A PARTIR DEL","",0,'C',false);
				$this->SetY(29);$this->SetX(155);
				$this->Cell(40,3,"8 DE ENERO 2020","",0,'C',false);
				$this->SetY(32);$this->SetX(155);
				$this->Cell(40,3,"VERSIÓN 2015","",0,'C',false);
				
				
			}
			
			
			function Footer()
			{
				
		
				//249 ANCHO			
				$this->SetDrawColor(0,0,0);
				$this->SetX(10);
				$this->SetY(-40);
				$this->Cell(60,4,utf8_decode($_GET["profesord"]),'T',0,'C',false);
				$this->SetX(130);
				$this->Cell(55,4,utf8_decode($this->eljefe),'T',0,'C',false);
				
				
				$this->SetY(-37);
				$this->SetX(20);
				$this->Cell(60,4,"ELABORO",'',0,'C',false);
				
				
				$this->SetX(130);
				$this->Cell(60,4,'JEFE DIVISIÓN','',0,'C',false);
				
				
			}
			
			
			// Tabla coloreada
			function imprimeCargaAcad($header, $data)
			{
				$this->Ln(5);
				$this->SetWidths(array(10, 63, 63, 30));
				$this->SetAligns(array('C','L','L','C'));
				$w = array(10, 63, 63, 30);
				
				$this->SetFont('Times','B',10);
				$this->Row(array("N","ASIGNATURA","PROGRAMA","NO. DE COMPETENCIA"));
		
				$this->SetFont('Times','',10);
                $c=1;
					foreach($data as $row)
					{
						$this->Row(array(utf8_decode($c),utf8_decode($row[0]."-".$row[1]),utf8_decode($row[2]),utf8_decode($row[3])
						));
						$c++;
					}		
					$this->Cell(array_sum($w),0,'','T');
					$this->Ln();

			}
			
			
			
   }
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Times','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,25); 
		$pdf->AddPage();
		
		
		$pdf->SetY(50);
		
		$pdf->SetFont('Times','',11);
		$pdf->Cell(0,0,"SUBDIRECCIÓN ACADÉMICA","",0,'C',false);
		$pdf->Ln(5);
		$pdf->Cell(0,0,"INSTITUTO TECNOLÓGICO SUPERIOR DE MACUSPANA","",0,'C',false);
		$pdf->Ln(5);
		
		$pdf->MultiCell(0,5,"REVISIÓN Y VALIDACIÓN DE LA  INSTRUMENTACIÓN DIDÁCTICA PARA LA FORMACIÓN Y DESARROLLO DE ".
				            "COMPETENCIAS PROFESIONALES DIGITAL Y REGISTRO DE PLANEACIÓN DIDÁCTICA EN EL SIE",0,'C', false);
		
		$pdf->Ln(5);
		$pdf->SetX(100);$pdf->SetY(90);
		$pdf->Cell(0,0,"PERIODO: ".$_GET["ciclod"],"",0,'C',false);
		
		$header= array('N', 'ASIGANTURA', 'PROGRAMA','NO. DE COMPETENCIAS');
		$data = $pdf->LoadData();
		$pdf->imprimeCargaAcad($header,$data);
		
		if ($_GET["tipo"]=='DEPTO') {
		    $dataEmpl = $pdf->getDatosPersona($_GET["profesor"]);		
		    $pdf->eljefe=$dataEmpl[0]["EMPL_JEFEABREVIA"]." ".$dataEmpl[0]["EMPL_JEFED"]; }
		else {
			$dataEmpl = $pdf->getJefeCarrera($_GET["tipov"]);
			$pdf->eljefe=$dataEmpl[0]["EMPL_JEFEABREVIA"]." ".$dataEmpl[0]["EMPL_JEFED"];
		}
		
		
	
		/*
		$dataEmpl = $pdf->getDatosPersona($_GET["ID"]);

		$pdf->Image($dataEmpl[0]["EMPL_FOTO"],10,40,20);
		
		$pdf->Ln(10);
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"NOMBRE: ",0,0,'L');	
		$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_NOMBREC"]),0,1,'L');
		
		$pdf->setX(180); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"RFC: ",0,0,'L');
		$pdf->setX(190); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_RFC"]),0,1,'L');
		
		$pdf->setX(220); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"HORARIO DEL PERSONAL ",0,0,'L');
		
		$pdf->Ln(4);
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"GRADO MÁXIMO DE ESTUDIOS: ",0,0,'L');
		$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_ULTIGRAD"]),0,1,'L');
		
		$pdf->setX(220); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"PERIODO:",0,0,'L');
		$pdf->setX(238); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($_GET["ciclod"]),0,1,'L');
		
		
		$pdf->Ln(4);
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"ES EGRESADO: ",0,0,'L');
		$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_EGRESADODED"]),0,1,'L');
		$pdf->setX(180); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"CURP: ",0,0,'L');
		$pdf->setX(190); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_CURP"]),0,1,'L');
		$pdf->Ln(4);
		$pdf->setX(40); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"DEPARTAMENTO O ACADEMÍA: ",0,0,'L');
		$pdf->setX(90); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_DEPTOD"]),0,1,'L');
		
		$pdf->setX(220); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"INGRESO:",0,0,'L');
		$pdf->setX(238); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_FECING"]),0,1,'L');
		
		$pdf->eljefe=$dataEmpl[0]["EMPL_JEFEABREVIA"]." ".$dataEmpl[0]["EMPL_JEFED"];
		
		$header = array('I. Carga Académica', 'Paq.', 'Grupo','Lunes','Martes','Miércoles','Jueves','Viernes','Sabado','Domingo', 'TH');
		
		$data = $pdf->cargaAcademica();
		$pdf->imprimeCargaAcad($header,$data);
		
		$headerdes = array('II. Otras Actividades', 'Cve.', 'Descripción','Lunes','Martes','Miércoles','Jueves','Viernes','Sabado','Domingo', 'TH');		
		$datades = $pdf->descarga();
		if (!($datades[0]==null)) { $pdf->imprimeDescarga($headerdes,$datades);}
		*/
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
