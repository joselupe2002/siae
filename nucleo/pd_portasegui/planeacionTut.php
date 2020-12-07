
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
				$data=[];  	       
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_ABREVIA,EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
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
			
			
			function loadDatosMateria()
			{
				$data=[];
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("Mysql","select * from cmaterias a where MATE_CLAVE='".$_GET["materia"]."'");
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			
			function loadDatosHor()
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("Mysql","select * from vedgrupos, ciclosesc where IDDETALLE='".
				$_GET["ID"]."' and CICLO=CICL_CLAVE");						                     															
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
            
            
            function loadDatosPlanEval($ciclo,$materia,$grupo)
			{
                $data=[];
				$miConex = new Conexion();
                $resultado=$miConex->getConsulta("Mysql","SELECT l.UNID_NUMERO, UNID_DESCRIP, ".
                "IFNULL((SELECT j.FECHA from eplaneacion j where  j.CICLO='".$ciclo.
                "' and j.MATERIA=l.UNID_MATERIA AND j.GRUPO='".$grupo."' AND j.NUMUNIDAD=l.UNID_NUMERO),'') AS FECHA".
                " FROM eunidades l where l.UNID_MATERIA='".$materia."'  and l.UNID_PRED=''".
                " order by UNID_PRED,UNID_NUMERO ");
															
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }
            

            function loadDatosPlan($ciclo,$materia,$grupo)
			{
                $data=[];
				$miConex = new Conexion();
                $resultado=$miConex->getConsulta("Mysql", "SELECT l.UNID_PRED AS TMACVE, ".
                "(SELECT UNID_DESCRIP FROM eunidades i WHERE i.UNID_MATERIA=l.UNID_MATERIA and i.UNID_NUMERO=l.UNID_PRED  ".
                "		   and i.UNID_PRED='' LIMIT 1) AS TEMA,".
                "UNID_NUMERO AS SMACVE, UNID_DESCRIP AS SUBTEMA, ".
                "IFNULL((SELECT j.PGRFEPI from pgrupo j where  j.PDOCVE='".$ciclo."' and j.MATCVE=l.UNID_MATERIA AND j.GPOCVE='".$grupo."' ".
                "        AND j.TMACVE=l.UNID_PRED and j.SMACVE=l.UNID_NUMERO),'') AS FECHAINIPROG,".
                "IFNULL((SELECT j.PGRFEPT from pgrupo j where  j.PDOCVE='".$ciclo."' and j.MATCVE=l.UNID_MATERIA AND j.GPOCVE='".$grupo."'  ".
                "        AND j.TMACVE=l.UNID_PRED and j.SMACVE=l.UNID_NUMERO),'') AS FECHAFINPROG ".
                " FROM eunidades l where l.UNID_MATERIA='".$materia."'  and l.UNID_PRED<>''".
                " order by UNID_PRED,UNID_NUMERO ");
															
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
				
			
				//249 ANCHO
				$this->SetFont('Montserrat-Medium','B',7);
				$this->SetX(10);
				$this->SetY(-45);
				$this->Cell(60,4,utf8_decode("FIRMA DEL TUTOR"),'T',0,'C',false);				
				$this->SetX(140);
				$this->Cell(55,4,utf8_decode("VO. BO. COODINADOR DE TUTORÍAS"),'T',0,'C',false);
	
				
				
			}
			
			
			
				
		}
		
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(18, 25 , 25);
		$pdf->SetAutoPageBreak(true,55); 
		$pdf->AddPage();
		
		
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,5,utf8_decode("PROGRAMA DE TUTORÍAS"),'0',0,'C',false);
		$pdf->Ln();
		$pdf->Cell(0,5,utf8_decode("PLAN DE ACCIÓN TUTORIAL"),'0',0,'C',false);
		$pdf->Ln();
	

   
        $arrMateria=$pdf->loadDatosMateria();
        $arrHor=$pdf->loadDatosHor();
   
        $arrPlan=$pdf->loadDatosPlan($arrHor[0]["CICLO"],$arrHor[0]["MATERIA"],$arrHor[0]["SIE"]);
		$arrPlanEval=$pdf->loadDatosPlanEval($arrHor[0]["CICLO"],$arrHor[0]["MATERIA"],$arrHor[0]["SIE"]);
		
		$arrProf=$pdf->getDatosPersona($arrHor[0]["PROFESOR"]);

		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(40,5,utf8_decode("PROFESOR"),'1',0,'L',false);
		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(140,5,utf8_decode($arrProf[0]["EMPL_ABREVIA"]." ". $arrProf[0]["EMPL_NOMBREC"]),'1',0,'L',false);
		$pdf->Ln();

		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(40,5,utf8_decode("ASIGNATURA"),'1',0,'L',false);
		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(140,5,utf8_decode($arrHor[0]["MATERIA"]." ". $arrHor[0]["MATERIAD"]),'1',0,'L',false);
	
		$pdf->Ln();
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(40,5,utf8_decode("CICLO"),'1',0,'L',false);
		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(140,5,utf8_decode($arrHor[0]["CICL_CLAVE"]." ". $arrHor[0]["CICL_DESCRIP"]),'1',0,'L',false);

		$pdf->Ln();
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(40,5,utf8_decode("PROG. EDUCATIVO"),'1',0,'L',false);
		$pdf->SetFont('Montserrat-Medium','',10);
		$pdf->Cell(140,5,utf8_decode($arrHor[0]["CARRERA"]." ". $arrHor[0]["CARRERAD"]),'1',0,'L',false);

		$pdf->Ln();
		$pdf->SetWidths(array(40,140));
		$pdf->SetAligns(array("J","J"));
		$pdf->SetFuente(array('Montserrat-ExtraBold','Montserrat-Medium'));
		$pdf->SetTamano(array('10','10'));
		$pdf->SetEstilo(array('B',''));
		$pdf->Row(array("OBJETIVO",utf8_decode(strtoupper($arrMateria[0]["CARACTERIZACION"]))));


		// Colores, ancho de l�nea y fuente en negrita
		$pdf->SetFillColor(172,31,6);
		$pdf->SetTextColor(255);
		$pdf->Ln();
		$pdf->Ln();
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(180,5,utf8_decode("HORARIO"),'1',0,'C',true);

		$pdf->Ln();
		$pdf->SetFillColor(245, 226, 102 );
		$pdf->SetTextColor(0);
		$pdf->SetFont('Montserrat-ExtraBold','B',7);
		$pdf->Cell(26,5,utf8_decode("LUNES"),'1',0,'C',true);
		$pdf->Cell(26,5,utf8_decode("MARTES"),'1',0,'C',true);
		$pdf->Cell(26,5,utf8_decode("MIERCOLES"),'1',0,'C',true);
		$pdf->Cell(26,5,utf8_decode("JUEVES"),'1',0,'C',true);
		$pdf->Cell(26,5,utf8_decode("VIERNES"),'1',0,'C',true);
		$pdf->Cell(25,5,utf8_decode("SABADO"),'1',0,'C',true);
		$pdf->Cell(25,5,utf8_decode("DOMINGO"),'1',0,'C',true);
		$pdf->Ln();
		$pdf->SetFillColor(255,255,255);
		$pdf->SetTextColor(0);

		$pdf->SetFont('Montserrat-Medium','',7);
		$pdf->Cell(26,5,utf8_decode($arrHor[0]["LUNES"]),'1',0,'C',false);
		$pdf->Cell(26,5,utf8_decode($arrHor[0]["MARTES"]),'1',0,'C',false);
		$pdf->Cell(26,5,utf8_decode($arrHor[0]["MIERCOLES"]),'1',0,'C',false);
		$pdf->Cell(26,5,utf8_decode($arrHor[0]["JUEVES"]),'1',0,'C',false);
		$pdf->Cell(26,5,utf8_decode($arrHor[0]["VIERNES"]),'1',0,'C',false);
		$pdf->Cell(25,5,utf8_decode($arrHor[0]["SABADO"]),'1',0,'C',false);
		$pdf->Cell(25,5,utf8_decode($arrHor[0]["DOMINGO"]),'1',0,'C',false);
		$pdf->Ln();
	
	
		$pdf->Ln();

		$eltema="";
        $renglon=0;
		foreach($arrPlan as $row) {
		     if (($eltema!=$row["TEMA"]) || ($renglon==0)) {
				$pdf->SetFont('Montserrat-ExtraBold','B',10);
				$pdf->SetFillColor(172,31,6);
				$pdf->SetTextColor(255);
				$pdf->Cell(180,5,utf8_decode($row["TEMA"]),'1',0,'L',true);
				$pdf->Ln();
				$pdf->SetFont('Montserrat-ExtraBold','B',10);
				$pdf->SetFillColor(245, 226, 102 );
				$pdf->SetTextColor(0);
				$pdf->Cell(130,5,utf8_decode("TEMA"),'1',0,'C',true);
				$pdf->Cell(25,5,utf8_decode("INICIA"),'1',0,'C',true);
				$pdf->Cell(25,5,utf8_decode("TERMINA"),'1',0,'C',true);
				$eltema=$row["TEMA"];
				$pdf->Ln();
				$pdf->SetFillColor(255,255,255);
				$pdf->SetTextColor(0);
				$eltema=$row["TEMA"];
			 }

			 $pdf->SetWidths(array(130,25,25));
			 $pdf->SetAligns(array("J","L","L"));
			 $pdf->SetFuente(array('Montserrat-Medium','Montserrat-Medium','Montserrat-Medium'));
			 $pdf->SetTamano(array('10','8','8'));
			 $pdf->SetEstilo(array('B','','B','','B','','B',''));
			 $pdf->Row(array(utf8_decode($row["SUBTEMA"]),utf8_decode($row["FECHAINIPROG"]),utf8_decode($row["FECHAFINPROG"])));
	
			 $renglon++;
		}


		
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
