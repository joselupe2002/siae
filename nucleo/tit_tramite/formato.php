
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

   	
			function LoadData()
			{				
				$data=[];
				$miConex = new Conexion();

				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vtit_pasantes where  MATRICULA='".$_GET["alumno"]."'");				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}


			function LoadRequisitos($op)
			{				
				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vtit_opcionreq where IDOPCION='".$op."' order by ORDEN");				
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
		
			
			
   }
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Times','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,25); 
		$pdf->AddPage();
	
		$miutil = new UtilUser();
        $pstotit=$miutil->getJefe('303');//Nombre del puesto de coordinacion de titulacion 


		$data = $pdf->LoadData();
		$dataGen = $pdf->LoadDatosGen();
		$pdf->SetFont('Times','',10);

		$fechadec=$miutil->formatFecha($data[0]["FECHA_REG"]);
		$fecha=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));

		$pdf->Cell(0,0,utf8_decode($dataGen[0]["inst_fechaof"]." a ".$fecha),"",0,'R',false);
		
		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(0,0,utf8_decode($pstotit),"",0,'L',false);

		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("DEPARTAMENTO DE SERVICIOS ESCOLARES"),"",0,'L',false);
		$pdf->Ln(5);
		$pdf->MultiCell(0,5,utf8_decode("Por este conducto me permito solicitarle la apertura de expediente para iniciar el Trámite de titulación,".
		" proporcionando los siguientes datos personales y documentación anexa en el orden listado."),0,'J',FALSE);

		$pdf->Ln(5);
		$pdf->Cell(80,5,utf8_decode("Nombre(s) y apellidos completos:"),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->Cell(100,5,utf8_decode($data[0]["PASANTE"]),"",0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(80,5,utf8_decode("Pasante de la carrera de:"),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->Cell(100,5,utf8_decode($data[0]["CARRERAD"]),"",0,'L',false);


		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(80,5,utf8_decode("Clave del plan de estudios:"),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->Cell(100,5,utf8_decode($data[0]["MAPA"]),"",0,'L',false);


		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(80,5,utf8_decode("Teléfono particular: "),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->Cell(40,5,utf8_decode($data[0]["TELEFONO"]),"",0,'L',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(40,5,utf8_decode("Teléfono Trabajo: "),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->Cell(40,5,utf8_decode($data[0]["TELTRABAJO"]),"",0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(80,5,utf8_decode("Empresa donde labora:"),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->Cell(100,5,utf8_decode($data[0]["TRABAJO"]),"",0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
	
		$pdf->Cell(80,5,utf8_decode("Localidad y estado donde labora: "),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->MultiCell(0,5,utf8_decode($data[0]["DIRTRABAJO"]),0,'J',FALSE);

		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(80,5,utf8_decode("Periodo de estudios Realizados (mes y año):  "),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->Cell(100,5,utf8_decode(strtoupper($miutil->getMesLetra($data[0]["MESINI"]). " ".$data[0]["ANIOINI"]). " ".strtoupper($miutil->getMesLetra($data[0]["MESFIN"]). 
		                " A ".$data[0]["ANIOFIN"])),"",0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(80,5,utf8_decode("Correo Electronico: "),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->Cell(100,5,utf8_decode($data[0]["CORREO"]),"",0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(80,5,utf8_decode("Opción de Titulación: "),"",0,'L',false);
		$pdf->SetFont('Times','U',10);
		$pdf->Cell(100,5,utf8_decode($data[0]["OPCIOND"]),"",0,'L',false);
		
		$pdf->Ln(15);
		$c=1;
		$dataReq = $pdf->LoadRequisitos($data[0]["ID_OPCION"]);
		$pdf->SetFont('Times','',9);
		foreach($dataReq as $row) {

		   $cad=$c.". ".$row["REQUISITOD"];
		   if ($row["OBS"]!='') {$cad=$c.". ".$row["REQUISITOD"]."(".$row["OBS"].")";}
			$pdf->MultiCell(0,3,utf8_decode($cad),0,'J',FALSE);

			$c++;
		}
			
		$pdf->Ln(10);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(80,5,utf8_decode("Agradeciendo de antemano la atención brindada, quedo de Usted como su atento (a) y seguro (a) servidor(a)"),"",0,'L',false);

		$pdf->Ln(10);

		$pdf->Ln(10);
		$pdf->SetFont('Times','B',10);
		$pdf->setX(70);
		$pdf->Cell(80,5,utf8_decode($data[0]["PASANTE"]),"T",1,'C',false);
		$pdf->setX(70);
		$pdf->Cell(80,5,utf8_decode($data[0]["MATRICULA"]),"",1,'C',false);

						
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
