
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
   	        var $eljefepsto="";
 
   	
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from ivcomplalum where CARRERA=".$_GET["carrera"].
						                                         " and CAPT_SIE=0 and NUMCRED=5");				
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
			
			function LoadDatosDepto($carrera)
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("Mysql","SELECT URES_URES, EMPL_NUMERO, concat(EMPL_NOMBRE, ' ',EMPL_APEPAT, ' ', EMPL_APEMAT) AS NOMBRE, EMPL_ABREVIA, EMPL_FIRMAOF
			                                              FROM fures a, pempleados b  where a.`CARRERA`=".$carrera." and a.`URES_JEFE`=b.`EMPL_NUMERO`");
				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			
			
		
			function Header()
			{
				$miutil = new UtilUser();
				$miutil->getEncabezado($this,'V');	
				
				//Para cuando las tablas estas no se coirten 
				$this->SetX(20);
				$this->Ln(5);
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'V');
				
				
			}
			
			function LoadProf($matricula)
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],
						"select  EMPL_NUMERO, CONCAT(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) as NOMBRE, EMPL_CORREOINS ".
						"from pempleados where EMPL_NUMERO='".$matricula."'");
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			
			function lasComplementarias($id)
			{
				$miConex = new Conexion();
				$sql="SELECT ACTIVIDADD,RESPONSABLED,CREDITOS, PROM, PROML FROM vecompl_cal where MATRICULA='".$id."'";
				
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
		$pdf->AddPage();
		 
		
		$miutil = new UtilUser();
		

		$dataGen = $pdf->LoadDatosGen();
		$nombre=$miutil->getJefe('303');//Nombre del puesto de Recursos Humanos
		$elpsto="DEPARTAMENTO DE SERVICIOS ESCOLARES";
		
		
		//Extraemos el Departamento de acuerdo a la carrera 
		$dataDepto = $pdf->LoadDatosDepto($_GET["carrera"]);
		
	
		//Para el numero de oficio 
		$depto=$dataDepto[0]["URES_URES"];
		$dataof=$miutil->verificaOficio($depto,"COMPLEMENTARIAS",$depto.date("DMY"));
		
		$fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
	
		
		$pdf->SetFont('Montserrat-Medium','',9);
		$pdf->Ln(10);
		$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
		$pdf->Ln(20);
		$pdf->Cell(0,0,utf8_decode($nombre),0,1,'L');
		$pdf->Ln(5);
		$pdf->Cell(0,0,$elpsto,0,1,'L');
		$pdf->Ln(10);
		
		
		$pdf->eljefe=$dataDepto[0]["EMPL_ABREVIA"]." ".$dataDepto[0]["NOMBRE"];
		$pdf->eljefepsto=$dataDepto[0]["EMPL_FIRMAOF"];
		
		
		$pdf->SetFont('Montserrat-SemiBold','',10);		

		
		$pdf->MultiCell(0,5,'La(El) que suscribe : '.utf8_decode($dataDepto[0]["NOMBRE"])." ".utf8_decode($dataDepto[0]["EMPL_FIRMAOF"]). ", por este medio se permite hacer de su ".
		utf8_decode("conocimiento que lo(s) estudiantes que se enlistan a continuación de la carrera de ").$_GET["carrerad"]." han cumplido un total de ".
		utf8_decode(" CINCO créditos."),0,'J', false);
		$pdf->ln();
		
		
		
		$data = $pdf->LoadData();
		
	
		
		foreach($data as $rowdes)
		{
			$pdf->SetFont('Montserrat-SemiBold','',10);
			$pdf->MultiCell(0,5,$rowdes["MATRICULA"]." ".$rowdes["NOMBRE"],0,'J', false);
			$dataCompl=$pdf->lasComplementarias($rowdes["MATRICULA"]);			
			$header = array('ACTIVIDAD', 'RESPONSABLE', utf8_decode('CREDITOS'),'CAL.','LETRA');
			
			$pdf->SetFont('Montserrat-ExtraBold','B',8);
			$pdf->SetWidths(array(60,60,15,15,18));
			$pdf->SetAligns(array('J','J','C','C','C'));
			$pdf->SetFillColor(172,31,6);
			$pdf->SetTextColor(255);
			$pdf->SetDrawColor(0,0,0);
			$pdf->SetLineWidth(.2);
			$w = array(60,60,15,15,18);
			for($i=0;$i<count($header);$i++) {$pdf->Cell($w[$i],7,$header[$i],1,0,'C',true);}
			$pdf->Ln();
			// Restauraci�n de colores y fuentes
			$pdf->SetFillColor(255,255,255);
			$pdf->SetTextColor(0);
			$pdf->SetFont('');
			// Datos
			$fill = false;
			$pdf->SetFont('Montserrat-Medium','',7);
			$suma=0;
			$alto=3;
			
			if ($dataCompl) {
			     foreach($dataCompl as $rowcomp){ 	
							$pdf->Row(array(utf8_decode($rowcomp[0]),utf8_decode($rowcomp[1]),utf8_decode($rowcomp[2]),
							utf8_decode($rowcomp[3]),utf8_decode($rowcomp[4])
							));
			     }									
			}
			$pdf->Ln(5);
			
		}
		$pdf->Ln(5);
		
		$pdf->Cell(0,0,$pdf->getY(),0,1,'L');
		$pdf->Ln(5);
		
		if ($pdf->getY()>=200) {$pdf->addPage();}
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,'A T E N T A M E N T E',0,1,'L');
		
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraLight','I',8);
		$pdf->Cell(0,0,utf8_decode('Excelencia en Educación Tecnológica'),0,1,'L');
		
		$pdf->Ln(25);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,utf8_decode($pdf->eljefe),0,1,'L');
		
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode($pdf->eljefepsto),0,1,'L');
		$pdf->Ln(5);
		
		$pdf->SetX(10);$pdf->SetY(245);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->Cell(0,0,"c.c.p. Archivo.",0,1,'L');
		
		
		
		$pdf->Output(); 
 } else {header("Location: index.php");}
 
 ?>
