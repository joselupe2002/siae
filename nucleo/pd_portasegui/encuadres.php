
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
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
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
				$resultado=$miConex->getConsulta("Mysql","select h.CICLO,i.CICL_DESCRIP as CICLOD, h.CARRERAD, h.HT, h.HP,". 
                                                 "h.CREDITOS, h.MAPA,  h.SEMESTRE, h.SIE,  h.PROFESOR, h.PROFESORD, h.MATERIA, h.MATERIAD,".
						                         " j.CARACTERIZACION, j.COMPETENCIAS, j.COMPETENCIASP, ".
						                         " k.ENCU_APORTACION, k.ENCU_APOYOS, k.ENCU_BIBLIOGRAFIA, k.ENCU_POLITICAS".
						                         " from vedgrupos h, ciclosesc i, cmaterias j, encuadresadd k ".
						                         " where h.IDDETALLE=".$_GET["ID"]." and h.CICLO=i.CICL_CLAVE and h.MATERIA=j.MATE_CLAVE  and h.IDDETALLE=k.ENCU_IDDETGRUPO");
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			
			function loadDatosEncuadre()
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("Mysql","SELECT s.UNID_NUMERO AS NUM, UNID_DESCRIP AS TEMA,  IF(ENCU_EP='',ENCU_EP,CONCAT('EP1: ',ENCU_EP)) AS EP,".
			                                     " IF(ENCU_ED='',ENCU_ED,CONCAT('ED1: ',ENCU_ED)) AS ED, IF(ENCU_EC='',ENCU_EC,CONCAT('EC1: ',ENCU_EC)) AS EC,".
												 " IF(ENCU_EA='',ENCU_EA,CONCAT('EA1: ',ENCU_EA)) AS EA ".
												 " from encuadres u, eunidades s where u.ENCU_IDTEMA=s.UNID_ID ".
						                         " and u.ENCU_IDDETGRUPO=".$_GET["ID"]." ORDER BY UNID_NUMERO ");
															
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			
			function loadDatosNotPol($tipo)
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("Mysql","SELECT ENCU_DESCRIP, ENCU_SECCION, ENCU_NUMERO FROM encuadrespol WHERE ENCU_TIPO='".$tipo."' order by ENCU_SECCION, ENCU_NUMERO");
				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
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
				
				
				$dir=$miutil->getJefe('301');
				$subdir=$miutil->getJefe('304');
				
				
				/*
				//249 ANCHO
				$this->SetFont('Montserrat-Medium','B',7);
				$this->SetDrawColor(0,0,0);
				$this->SetX(10);
				$this->SetY(-45);
				$this->Cell(60,4,"DOCENTE",'T',0,'C',false);				
				$this->SetX(140);
				$this->Cell(55,4,utf8_decode($this->eljefe),'T',0,'C',false);
				
		
				$this->SetY(-43);				
				$this->SetX(140);
				$this->Cell(60,4,'JEFE DIVISI�N','',0,'C',false);
				
				*/
			}
			
			
			
				
		}
		
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(18, 25 , 25);
		$pdf->SetAutoPageBreak(true,55); 
		$pdf->AddPage();
		
		
		
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraBold','B',20); $pdf->Cell(0,0,"ENCUADRE",0,0,'C');	
		$pdf->Ln(5);

		$grupodat=$pdf->loadDatosGrupo();
		
		
		
		foreach($grupodat as $row) {
			$dataEmpl = $pdf->getDatosPersona($row["PROFESOR"]);
			$pdf->eljefe=$dataEmpl[0]["EMPL_JEFEABREVIA"]." ".$dataEmpl[0]["EMPL_JEFED"];
			
			$pdf->SetFont('Montserrat-ExtraBold','B',10);
			$pdf->Cell(46,8,"Profesor:",'1',0,'R',false);
			$pdf->SetFont('Montserrat-Medium','',10);
			$pdf->Cell(138,8,utf8_decode($row["PROFESOR"]." ".$row["PROFESORD"]),'1',0,'L',false);
			$pdf->Ln();
			
			$pdf->SetFont('Montserrat-ExtraBold','B',10); 
			$pdf->Cell(46,8,"Periodo:",'1',0,'R',false);
			$pdf->SetFont('Montserrat-Medium','',10); 
			$pdf->Cell(46,8,utf8_decode($row["CICLO"]." ".$row["CICLOD"]),'1',0,'L',false);
			$pdf->SetFont('Montserrat-ExtraBold','B',10); 
			$pdf->Cell(35,8,"Fecha:",'1',0,'R',false);
			$pdf->SetFont('Montserrat-Medium','',10); 
			$pdf->Cell(57,8,date("d")."/".date("m")."/".date("Y"),'1',0,'L',false);
			$pdf->Ln();
			
			$pdf->SetFont('Montserrat-ExtraBold','B',10);		    
			$pdf->Cell(46,8,"Asignatura:",'1',0,'R',false);
			$pdf->SetFont('Montserrat-Medium','',10); 
			$pdf->Cell(138,8,utf8_decode($row["MATERIAD"]),'1',0,'L',false);
			$pdf->Ln();
		
			$pdf->SetWidths(array(46,46,35,57));
			$pdf->SetAligns(array("R","L","R","L"));
			$pdf->SetFuente(array('Montserrat-ExtraBold','Montserrat-Medium','Montserrat-ExtraBold','Montserrat-Medium'));
			$pdf->SetTamano(array('10','10','10','10'));
			$pdf->SetEstilo(array('B','','B',''));			
			$pdf->Row(array("Plan de Estudios:",utf8_decode($row["MAPA"]),"Programa Educativo:",utf8_decode($row["CARRERAD"])));
			

			$pdf->SetWidths(array(46,15,15,16,35,57));
			$pdf->SetAligns(array("R","L","R","L","R","L"));
			$pdf->SetFuente(array('Montserrat-ExtraBold','Montserrat-Medium','Montserrat-ExtraBold','Montserrat-Medium','Montserrat-ExtraBold','Montserrat-Medium'));
			$pdf->SetTamano(array('10','10','10','10','10','10'));
			$pdf->SetEstilo(array('B','','B','','B',''));
			$pdf->Row(array("Semestre:",utf8_decode($row["SEMESTRE"]),"Grupo:",utf8_decode($row["SIE"]),"Clave:",utf8_decode($row["MATERIA"])));
			
			$pdf->SetWidths(array(92,92));
			$pdf->SetAligns(array("R","L"));
			$pdf->SetFuente(array('Montserrat-ExtraBold','Montserrat-Medium'));
			$pdf->SetTamano(array('10','10'));
			$pdf->SetEstilo(array('B',''));
			$pdf->Row(array(utf8_decode("Horas teorícas horas prácticas y créditos:"),utf8_decode($row["HT"])."-".utf8_decode($row["HP"])."-".utf8_decode($row["CREDITOS"])));
			
			$pdf->SetFont('Montserrat-ExtraBold','B',10);
			$pdf->Cell(184,8,utf8_decode("Objetivo(s) general  de la asignatura. (competencias específicas)"),'1',0,'L',false);
			$pdf->Ln();
			$pdf->SetFont('Montserrat-Medium','',10); 
			$pdf->MultiCell(184,5,utf8_decode($row["COMPETENCIAS"]),1,'J', false);			
			
			$pdf->SetFont('Montserrat-ExtraBold','B',10);
			$pdf->Cell(184,8,utf8_decode("Aportación al perfil profesional"),'1',0,'L',false);
			$pdf->Ln();
			$pdf->SetFont('Montserrat-Medium','',10);
			$pdf->MultiCell(184,5,utf8_decode($row["CARACTERIZACION"]),1,'J', false);
			
			$pdf->SetFont('Montserrat-ExtraBold','B',10);
			$pdf->Cell(184,8,"Competencias previas",'1',0,'L',false);
			$pdf->Ln();
			$pdf->SetFont('Montserrat-Medium','',10);
			$pdf->MultiCell(184,5,utf8_decode($row["COMPETENCIASP"]),1,'J', false);
			
			$pdf->SetFont('Montserrat-ExtraBold','B',10);
			$pdf->Cell(184,8,"Competencias a desarrollar",'1',0,'L',false);
			$pdf->Ln();
			$pdf->SetFont('Montserrat-Medium','',10);
			$pdf->MultiCell(184,5,utf8_decode($row["COMPETENCIAS"]),1,'J', false);
						
			$pdf->Ln();
			
			$pdf->AddPage(); 
			
			
			$pdf->SetFont('Montserrat-ExtraBold','B',8);
			$pdf->SetDrawColor(0,0,0);
			$pdf->SetLineWidth(.2);
			$pdf->SetFillColor(172,31,6);
			$pdf->SetTextColor(255);
			$pdf->Cell(10,8,"No.",'1',0,'C',TRUE);
			$pdf->Cell(54,8,"Temas",'1',0,'C',TRUE);
			$pdf->Cell(30,8,"EV. PRODUCTO",'1',0,'C',TRUE);
			$pdf->Cell(30,8,utf8_decode("EV. DESEMPEÑO"),'1',0,'C',TRUE);
			$pdf->Cell(30,8,"EV. CONOCIMIENTO",'1',0,'C',TRUE);
			$pdf->Cell(30,8,"EV. ACTITUD",'1',0,'C',TRUE);
			$pdf->Ln();
			$pdf->Cell(10,16,"",'BL',0,'C',TRUE);
			$pdf->Cell(54,8,"Ponderaciones",'BR',0,'R',TRUE);
			$pdf->Cell(60,8,"50%",'1',0,'C',TRUE);
			$pdf->Cell(30,8,"40%",'1',0,'C',TRUE);
			$pdf->Cell(30,8,"10%",'1',0,'C',TRUE);
			
			$pdf->SetDrawColor(0,0,0);
			$pdf->SetLineWidth(.2);
			$pdf->SetFillColor(255,255,255);
			$pdf->SetTextColor(0);
			$pdf->Ln();
			
			$datenc=$pdf->loadDatosEncuadre();
			foreach($datenc as $row2) {

				$pdf->SetWidths(array(10,54,30,30,30,30)); //184
				$pdf->SetAligns(array("R","L"));
				$pdf->SetFuente(array('Montserrat-Medium','Montserrat-Medium','Montserrat-Medium','Montserrat-Medium','Montserrat-Medium','Montserrat-Medium'));
				$pdf->SetTamano(array('8','8','8','8','8','8'));							
				$pdf->SetEstilo(array('','','','','',''));
				$pdf->Row(array(utf8_decode($row2["NUM"]),utf8_decode($row2["TEMA"]),utf8_decode($row2["EP"]),utf8_decode($row2["ED"]),utf8_decode($row2["EC"]),utf8_decode($row2["EA"])));
				
			}
			
			$pdf->Ln();
			$pdf->SetFont('Montserrat-ExtraBold','B',8);
			$pdf->SetDrawColor(0,0,0);
			$pdf->SetLineWidth(.2);
			$pdf->SetFillColor(172,31,6);
			$pdf->SetTextColor(255);
			$pdf->Cell(92,8,"Referencias",'1',0,'C',TRUE);
			$pdf->Cell(92,8,utf8_decode("Apoyos Didácticos"),'1',0,'C',TRUE);
			
			$pdf->SetFont('Montserrat-Medium','',8);
			$pdf->Ln();
			$pdf->SetTextColor(0);
			$pdf->SetFillColor(255,255,255);
			$pdf->SetWidths(array(92,92)); //184
			$pdf->SetAligns(array("L","L"));
			$pdf->SetFuente(array('Montserrat-Medium','Montserrat-Medium'));
			$pdf->SetTamano(array('8','8'));
			$pdf->SetEstilo(array('',''));
			$pdf->Row(array(utf8_decode($row["ENCU_BIBLIOGRAFIA"]),utf8_decode($row["ENCU_APOYOS"])));
			$pdf->SetFillColor(255,255,255);
			
			
			$pdf->AddPage(); 
			$pdf->Ln();
			$pdf->SetDrawColor(0,0,0);
			$pdf->SetLineWidth(.2);
			$pdf->SetFillColor(255,255,255);
			$pdf->SetTextColor(0);
			$pdf->SetFont('Montserrat-ExtraBold','B',10);
			$pdf->Cell(184,8,"IMPORTANTE",1,0,'C',FALSE);
			$pdf->Ln();
			$pdf->SetFont('Montserrat-Medium','B',10);
			
			
			$datnotas=$pdf->loadDatosNotPol("NOTA");
			foreach($datnotas as $row2) {
				
				$pdf->SetWidths(array(20,164)); //184
				$pdf->SetAligns(array("C","J"));
				$pdf->SetFuente(array('Montserrat-ExtraBold','Montserrat-Medium'));
				$pdf->SetTamano(array('10','10'));
				$pdf->SetEstilo(array('',''));
				$pdf->Row(array(utf8_decode("Nota ".$row2["ENCU_NUMERO"]),utf8_decode($row2["ENCU_DESCRIP"])));				
				
			}
			

			
			$pdf->Ln();
			$pdf->SetFont('Montserrat-ExtraBold','B',10);
			$pdf->Cell(184,8,"POLITICAS",1,0,'C',FALSE);
			$pdf->Ln();
			$pdf->SetFont('Montserrat-Medium','B',10);
			
			
			
			$datnotas=$pdf->loadDatosNotPol("POLITICA");
		    $lasex='Para la Asignatura:';
		    $seccionpon=$lasex;
		    $c=0;
			foreach($datnotas as $row2) {
				if (($row2["ENCU_SECCION"]==$lasex) && ($c>0)) {$seccionpon="";} else {$seccionpon=$row2["ENCU_SECCION"];$lasex=$row2["ENCU_SECCION"];}
				$pdf->SetWidths(array(30,154)); //184
				$pdf->SetAligns(array("C","J"));
				$pdf->SetFuente(array('Montserrat-ExtraBold','Montserrat-Medium'));
				$pdf->SetTamano(array('10','10'));
				$pdf->SetEstilo(array('',''));
				$pdf->Row(array(utf8_decode($seccionpon),utf8_decode($row2["ENCU_DESCRIP"])));
				$c++;
				
			}	
			
			
		
			if (!($row["ENCU_POLITICAS"]=='')) {
					$pdf->SetFont('Montserrat-ExtraBold','B',10);
					$pdf->Cell(184,8,"OTRAS POLITICAS",1,0,'C',FALSE);
					$pdf->Ln();
					$pdf->SetFont('Montserrat-Medium','B',10);
					
				
					$laspol=explode("\n",$row["ENCU_POLITICAS"]);
					
					
					foreach ($laspol as $pol) {
						$pdf->MultiCell(184,5,utf8_decode($pol),1,'J', false);

					}
					
					$pdf->Ln();
			   }
			   
			   
			  
			   $pdf->Ln();
			   $pdf->SetFont('Montserrat-ExtraBold','B',10);
			   $pdf->Cell(184,8,utf8_decode("LISTA DE ALUMNOS ENTERADOS DEL ENCUADRE E INSTRUMENTACIÓN DIDÁCTICA"),1,0,'C',FALSE);
			   $pdf->Ln();
			   $pdf->SetFont('Montserrat-Medium','B',8);
			   $pdf->MultiCell(184,5,utf8_decode("1. Dió a conocer las reglas y/o políticas de este curso de acuerdo al lineamiento para la acreditaciÓn de asignaturas."),1,'J', false);
			   $pdf->MultiCell(184,5,utf8_decode("2. Explicó y entrego la instrumentación didáctica (digital) y los indicadores de cada rubro a evaluar."),1,'J', false);
			   $pdf->MultiCell(184,5,utf8_decode("3. Aplicó la evaluación diagnóstica."),1,'J', false);
			   $pdf->SetFont('Montserrat-Medium','B',10);
			
			$pdf->SetFont('Montserrat-ExtraBold','B',8);
			$pdf->Cell(10,8,"No.",1,0,'C',FALSE);
			$pdf->Cell(100,8,"Nombre",1,0,'C',FALSE);
			$pdf->Cell(30,8,"No. Control",1,0,'C',FALSE);
			$pdf->Cell(44,8,"Firma de Conformidad",1,0,'C',FALSE);
			$pdf->Ln();
			for ($i=0;$i<=30;$i++) {
				$pdf->Cell(10,8,$i+1,1,0,'C',FALSE);
				$pdf->Cell(100,8,"",1,0,'C',FALSE);
				$pdf->Cell(30,8,"",1,0,'C',FALSE);
				$pdf->Cell(44,8,"",1,0,'C',FALSE);
				$pdf->Ln();
			}
			
		
			
		}
		

		
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
