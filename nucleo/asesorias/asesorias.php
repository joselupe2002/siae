
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
   	
   
   	        
			var $eljefe="";
			var $lafirma="";
			var $elsello="";
			var $lafirmaempl="";
   	       
   	       function getDatosPersona($num){   		       
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
						"ifnull(EMPL_JEFESELLO,'') as EMPL_JEFESELLO, ifnull(EMPL_JEFEFIRMA,'') as EMPL_JEFEFIRMA, ".
						"ifnull(EMPL_FIRMA,'') as EMPL_FIRMA, EMPL_FOTO, EMPL_DEPTOD, EMPL_JEFEABREVIA,EMPL_JEFE, EMPL_JEFED, EMPL_RFC, EMPL_CURP, EMPL_NUMERO, EMPL_FECING ".
            			" FROM vempleados WHERE EMPL_NUMERO= '".$num."'" );
                foreach ($resultado as $row) {$data[] = $row;}            
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
				$miutil->getEncabezado($this,'H');		
				//Para que cuando se cambie a la otra pagina empiece a la derecha y la stablas no se descuadren
				$this->SetX(10);
				$this->Ln(5);
				
			}
			
			

			function Footer()
			{		
				
				if (($_GET["tipoRep"]=='1')) {		
					if (($this->elsello!='') &&($this->elsello!='../../imagenes/menu/default.png'))
						{$this->Image($this->elsello,150,160,45);}

					if (($this->lafirma!='') &&($this->lafirma!='../../imagenes/menu/default.png'))
					    {$this->Image($this->lafirma,220,155,40);}
			
			
					if (($this->lafirmaempl!='') &&($this->lafirmaempl!='../../imagenes/menu/default.png'))
					    {$this->Image($this->lafirmaempl,20,155,40);}
				}

				$miutil = new UtilUser();
				$miutil->getPie($this,'H');
				
				
				$dir=$miutil->getJefe('301');
				$subdir=$miutil->getJefe('304');
				
			
				//249 ANCHO
				$this->SetFont('Montserrat-Medium','B',7);
				$this->SetDrawColor(0,0,0);
				$this->SetX(10);
				$this->SetY(-40);
				$this->Cell(60,4,"DOCENTE",'T',0,'C',false);				
				$this->SetX(209);
				$this->Cell(55,4,utf8_decode($this->eljefe),'T',0,'C',false);
				
		
				$this->SetY(-37);				
				$this->SetX(209);
				$this->Cell(60,4,utf8_decode('JEFE DIVISIÓN'),'',0,'C',false);
				
				

				
			}
			
			function cargaAsesorias()
			{
			    $entre=false;
				$miConex = new Conexion();
			
				
                $tipoas="";
                $elmes="";
                if (!($_GET["tipo"]=='%')) { $tipoas=" AND ASES_TIPO='".$_GET["tipo"]."'"; }
                if (!($_GET["mes"]=='%')) { $elmes=" AND MES='".$_GET["mes"]."'"; }
								
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT ASES_MATRICULA, ASES_MATRICULAD, IF(ASES_SEXO=1,'H','M') AS ASES_SEXOD, ASES_CARRERAD,". 
                                                  "ASES_ASIGNATURAD, ASES_FECHA, ASES_HORA, '' as ASES_FIRMA, ASES_TEMA from vasesorias ".
						                          " WHERE ASES_CICLO='".$_GET["ciclo"]."' and ASES_PROFESOR='".$_GET["ID"]."'".
						                          " and ANIO='".$_GET["anio"]."'".$tipoas." ".$elmes);				
				foreach ($resultado as $row) {
					$data[] = $row;
					$entre=true;
				}
				if ($entre) {return $data;}
				else  return null;
			}
			
			
			// Tabla coloreada
			function imprimeAsesorias($header, $data)
			{
				$this->Ln(5);
				// Colores, ancho de l�nea y fuente en negrita
				$this->SetFillColor(172,31,6);
				$this->SetTextColor(255);
				$this->SetDrawColor(0,0,0);
				$this->SetLineWidth(.2);
				
	
				$w = array(15, 61, 10,50,85,15,15);
				$this->SetFont('Montserrat-ExtraBold','B',7);
				$this->SetWidths(array(15, 61, 10,50,85,15,15));	
				for($i=0;$i<count($header);$i++)
					$this->Cell($w[$i],7,$header[$i],1,0,'C',true);
					$this->Ln();
					// Restauraci�n de colores y fuentes
					$this->SetFillColor(255,255,255);
					$this->SetTextColor(0);
					$this->SetFont('');
					// Datos
					$fill = false;
					$this->SetFont('Montserrat-Medium','',6);
					$suma=0;
					$alto=3;
					if ($data) {
						foreach($data as $row)
						{
							//$this->setX(10);
							$this->Row(array(utf8_decode($row[0]),utf8_decode($row[1]),utf8_decode($row[2]),
									utf8_decode($row[3]),utf8_decode($row[4]." / ".$row[8]),
									utf8_decode($row[5]), utf8_decode($row[6])
							));
						}
					}
				
				
					
			}
			
			
				
		}
		
		
		$pdf = new PDF('L','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(10, 25 , 25);
		$pdf->SetAutoPageBreak(true,55); 
		$pdf->AddPage();
		
		
		$dataEmpl = $pdf->getDatosPersona($_GET["ID"]);		
		$pdf->SetFont('Montserrat-ExtraBold','B',12); $pdf->Cell(0,0,"FORMATO DE REGISTRO DE ASESORIAS",0,0,'C');	
		$pdf->Ln(5);
		$pdf->setX(20); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"NOMBRE DEL DOCENTE: ",0,0,'L');	
		$pdf->setX(60); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_NOMBREC"]),0,1,'L');
		
		$pdf->Ln(5);
		$pdf->setX(20); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"ACADEMIA: ",0,0,'L');
		$pdf->setX(60); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,str_replace("DEPARTAMENTO","",utf8_decode($dataEmpl[0]["EMPL_DEPTOD"])),0,1,'L');
		$pdf->setX(150); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"TIPO DE ASESORIA: ",0,0,'L');
		$pdf->setX(185); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($_GET["tipod"]),0,1,'L');
		$pdf->Ln(5);
		$pdf->setX(20); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"CICLO ESCOLAR: ",0,0,'L');
		$pdf->setX(60); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,utf8_decode($_GET["ciclod"]),0,1,'L');
		$pdf->setX(150); $pdf->SetFont('Montserrat-ExtraBold','B',8); $pdf->Cell(0,0,"FECHA DE ENTREGA: ",0,0,'L');
		$pdf->setX(185); $pdf->SetFont('Montserrat-Medium','U',8); $pdf->Cell(0,0,"__________________________",0,1,'L');
		
		
		
		

		$pdf->Ln(4);
		
		$pdf->eljefe=$dataEmpl[0]["EMPL_JEFEABREVIA"]." ".$dataEmpl[0]["EMPL_JEFED"];
		$pdf->lafirma=$dataEmpl[0]["EMPL_JEFEFIRMA"];
		$pdf->elsello=$dataEmpl[0]["EMPL_JEFESELLO"];
		$pdf->lafirmaempl=$dataEmpl[0]["EMPL_FIRMA"];
	
		$header = array('CONT.', 'NOMBRE DEL ALUMNO', 'GEN.','PROGRAMA EDUCATIVO','TEMA/ASIGNATURA','FECHA','HORA');		
		$data = $pdf->cargaAsesorias();
		$pdf->imprimeAsesorias($header,$data);
		

		
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
