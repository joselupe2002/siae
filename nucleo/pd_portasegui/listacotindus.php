
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
   	var $nomfont;
   	var $tamfont;
   	var $estfont;

   	
   	function SetWidths($w) {$this->widths=$w;}
   	function SetAligns($a) {$this->aligns=$a;}   	
   	function SetFuente($f) {$this->nomfont=$f;}
   	function SetTamano($f) {$this->tamfont=$f;}
   	function SetEstilo($f) {$this->estfont=$f;}

   	
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
   				
   				$fuente=isset($this->nomfont[$i]) ? $this->nomfont[$i] : 'Montserrat-ExtraBold';
   				$tamano=isset($this->tamfont[$i]) ? $this->tamfont[$i] : '10';
   				$estilo=isset($this->estfont[$i]) ? $this->estfont[$i] : 'B';
   				
   				//Save the current position
   				$x=$this->GetX();
   				$y=$this->GetY();
   				//Draw the border
   				$this->SetFont($fuente,$estilo,$tamano);
   				
   				$this->SetDrawColor(0,0,0);
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
   				$nb--;$sep=-1;$i=0;$j=0;$l=0;$nl=1;
   				while($i<$nb)
   				{
   					$c=$s[$i];
   					if($c=="\n")
   					{
   						$i++;$sep=-1;$j=$i;$l=0;$nl++;
   						continue;
   					}
   					if($c==' ')
   						$sep=$i; $l+=$cw[$c];
   						if($l>$wmax)
   						{
   							if($sep==-1)
   							{
   								if($i==$j)
   									$i++;
   							}
   							else
   								$i=$sep+1;$sep=-1;$j=$i;$l=0;$nl++;
   						}
   						else
   							$i++;
   				}
   				return $nl;
   	}
   	
/*================================================================================================*/   
   	        
   	     var $eljefe="";
   	       
   	       function getDatosPersona($num){   		       
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_ABREVIA, EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
            			"EMPL_FOTO, EMPL_DEPTOD, EMPL_JEFEABREVIA,EMPL_JEFE, EMPL_JEFED, EMPL_RFC, EMPL_CURP, EMPL_NUMERO, EMPL_FECING ".
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
			
			
			function loadDatosGrupo()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("Mysql","select ALUM_MATRICULA, CARR_DESCRIP AS CARRERAD, CONCAT(ALUM_APEPAT,' ',ALUM_APEMAT,' ',ALUM_NOMBRE) AS NOMBREC ".
						                   " from dlista, falumnos, ccarreras  where ALUM_CARRERAREG=CARR_CLAVE AND ALUCTR=ALUM_MATRICULA and MATCVE='".$_GET['materia']."'".
						                   " and LISTC15='".$_SESSION['usuario']."' and GPOCVE='".$_GET['grupo']."'".
						                   " and PDOCVE='".$_GET['ciclo']."' order by ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE");
	
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				
				if (empty($resultado)) {$data=null;}
				return $data;
			}
			
			
		
			
			function Header()
			{
				$miutil = new UtilUser();
				$miutil->getEncabezado($this,'V');		
				$this->SetX(10);
				$this->Ln(5);
				
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'V');
			}
			
			
			
				
		}
		
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(18, 25 , 25);
		$pdf->SetAutoPageBreak(true,55); 
		$pdf->AddPage();
		
		$grupodat=$pdf->loadDatosGrupo();
		if (!(empty($grupodat))) {
			foreach($grupodat as $row) {
				
			
				$pdf->Ln(5);
				$pdf->SetFont('Montserrat-ExtraBold','B',10); $pdf->Cell(0,0,"LISTA DE COTEJO PARA EVALUAR PORTAFOLIO DE EVIDENCIA",0,0,'C');	
				$pdf->Ln(5);
		        
				$pdf->SetFont('Montserrat-ExtraBold','B',8);
				$pdf->Cell(30,8,"PROFESOR",'1',0,'L',false);
				$pdf->SetFont('Montserrat-Medium','',10);		
				$dataEmpl = $pdf->getDatosPersona($_SESSION["usuario"]);
				$profesord=$dataEmpl[0]["EMPL_ABREVIA"]." ".$dataEmpl[0]["EMPL_NOMBREC"];		
				$pdf->Cell(110,8,utf8_decode($profesord),'1',0,'L',false);
				$pdf->SetFont('Montserrat-ExtraBold','B',8);
				$pdf->Cell(15,8,"FECHA",'1',0,'L',false);
				$pdf->SetFont('Montserrat-Medium','',8);
				$pdf->Cell(29,8, date("d/m/Y"),'1',0,'L',false);		
				$pdf->Ln();
				
				$pdf->SetFont('Montserrat-ExtraBold','B',8);
				$pdf->Cell(30,8,"PROG. EDUCATIVO",'1',0,'L',false);
				$pdf->SetFont('Montserrat-Medium','',10);
				$pdf->Cell(154,8,utf8_decode(($row["CARRERAD"])),'1',0,'L',false);
				$pdf->Ln();
				
				$pdf->SetFont('Montserrat-ExtraBold','B',8);
				$pdf->Cell(30,8,"ASIGNATURA",'1',0,'L',false);
				$pdf->SetFont('Montserrat-Medium','',10);
				$pdf->Cell(154,8,utf8_decode($_GET["materiad"]),'1',0,'L',false);
				$pdf->Ln();
				
				$pdf->SetFont('Montserrat-ExtraBold','B',8);
				$pdf->Cell(30,8,"UNIDAD",'1',0,'L',false);
				$pdf->SetFont('Montserrat-Medium','',10);
				$pdf->Cell(154,8,utf8_decode($_GET["unidad"]."-".$_GET["unidadd"]),'1',0,'L',false);
				
				$pdf->Ln();
				$pdf->Ln();
				
				$pdf->SetFont('Montserrat-ExtraBold','B',10);
				$pdf->Cell(140,8,"NOMBRE DEL ESTUDIANTE",'1',0,'C',false);
				$pdf->Cell(44,8,"NÚMERO CONTROL",'1',0,'C',false);
				$pdf->Ln();
				$pdf->SetFont('Montserrat-Medium','',10);
				$pdf->Cell(140,8,utf8_decode($row["NOMBREC"]),'1',0,'L',false);
				$pdf->Cell(44,8,utf8_decode($row["ALUM_MATRICULA"]),'1',0,'L',false);
				
		
			
				
				$pdf->Ln();
				$pdf->Ln();
				
				$pdf->SetFont('Montserrat-Medium','',10);
				$pdf->MultiCell(184,5,"INSTRUCCIONES: Ubique en la tabla que se encuentra a continuación la característica que ".
						              "describa mejor el desempeño del estudiante a evaluar y cloque en la columna correspondiente una (x).","",'J', false);	
				$pdf->Ln();
				
				$pdf->SetFont('Montserrat-ExtraBold','',10);
				$pdf->Cell(100,8,"ASPECTO",'1',0,'C',false);
				$pdf->Cell(54,8,"PONDERACIÓN",'1',0,'C',false);
				$pdf->Cell(15,8,"SI",'1',0,'C',false);
				$pdf->Cell(15,8,"NO",'1',0,'C',false);
				$pdf->Ln();
				$pdf->SetFont('Montserrat-Medium','',10);
				$pdf->Cell(100,8,"1. Entregó el portafolio en la fecha y hora establecida",'1',0,'C',false);
				$pdf->Cell(54,8,"30%",'1',0,'C',false);
				$pdf->Cell(15,8,"",'1',0,'C',false);
				$pdf->Cell(15,8,"",'1',0,'C',false);
				$pdf->Ln();
				$pdf->SetFont('Montserrat-Medium','',10);
				$pdf->Cell(100,8,"2. El portafolio refleja orden y limpieza",'1',0,'C',false);
				$pdf->Cell(54,8,"30%",'1',0,'C',false);
				$pdf->Cell(15,8,"",'1',0,'C',false);
				$pdf->Cell(15,8,"",'1',0,'C',false);
				$pdf->Ln();
				$pdf->SetFont('Montserrat-Medium','',10);
				$pdf->Cell(100,8,"3. Presenta completo el contenido del portafolio",'1',0,'C',false);
				$pdf->Cell(54,8,"40%",'1',0,'C',false);
				$pdf->Cell(15,8,"",'1',0,'C',false);
				$pdf->Cell(15,8,"",'1',0,'C',false);
				
				$pdf->Ln();
				$pdf->Ln();
				$pdf->Ln();
				$pdf->Cell(100,8,"Firma del Docente",'',0,'L',false);
				$pdf->Ln();
				$pdf->Ln();
				$pdf->Cell(100,8,$profesord,'T',0,'L',false);
				
				
				
				$pdf->AddPage();
				
			}
		}
		
				
		//184
		
		
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
