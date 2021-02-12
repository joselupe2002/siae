
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
				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vss_alumnos a where  ID=".$_GET["id"]);				
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
				//$miutil = new UtilUser();
				//$miutil->getEncabezado($this,'V');	
				$this->SetY(20);$this->SetX(25);
				$this->Cell(40,15,"",1,0,'L',false);
				$this->SetFont('Times','B',9);
				$this->Cell(90,3,utf8_decode("SOLICITUD DE SERVICIO SOCIAL"),"TRL",0,'C',false);
				$this->Cell(40,15,"",1,0,'L',false);
				
				$this->SetY(23);$this->SetX(65);
				$this->Cell(90,3,utf8_decode(""),"B",0,'C',false);
				$this->SetY(26);$this->SetX(65);
				$this->SetFillColor(242,242,242);
				$this->Cell(90,9,"IT - VIN - 02 - F - 01",1,0,'C',true);
				$this->Image('../../imagenes/empresa/pie1.png',28,22,23,11);
				
				$this->SetFont('Times','',9);
				$this->SetY(20);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("PÁG. 1 DE 2"),"TRL",0,'C',false);
				$this->SetY(23);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("REVISIÓN NO. 01"),"B",0,'C',false);
				$this->SetY(26);$this->SetX(155);
				$this->Cell(40,3,"VIGENTE A PARTIR DEL","",0,'C',false);
				$this->SetY(29);$this->SetX(155);
				$this->Cell(40,3,"11 DE JUNIO 2018","",0,'C',false);
				$this->SetY(32);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("VERSIÓN 2015"),"",0,'C',false);

				
				//Para cuando las tablas estas no se coirten 
				$this->SetX(20);
				$this->Ln(5);
			}

			function Footer()
			{				
				//$miutil = new UtilUser();
				//$miutil->getPie($this,'V');
				
			}
		
			
   }
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Times','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,25); 
		$pdf->AddPage();
		
		
		$pdf->SetY(50);
		$data = $pdf->LoadData();
		
		$pdf->SetFont('Times','B',10);


		$pdf->Cell(0,5,utf8_decode("FECHA:".$data[0]["FECHACOM"]),"",1,'R',false);



		$pdf->Cell(170,3,utf8_decode("DATOS DEL PRESTANTE DEL SERVICIO SOCIAL:"),"",1,'L',false);

		$pdf->Cell(170,5,utf8_decode(""),"TLR",1,'C',false);

		$pdf->Cell(40,5,utf8_decode("Nombre Completo:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(130,5,utf8_decode($data[0]["NOMBRE"]),"BR",1,'L',false);
		$pdf->SetFont('Times','B',10);

		$pdf->Cell(10,5,utf8_decode("Edad:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(10,5,utf8_decode($data[0]["EDAD"]),"B",0,'C',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(10,5,utf8_decode("Sexo:"),"",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(10,5,utf8_decode($data[0]["SEXO"]),"B",0,'C',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(40,5,utf8_decode("Correo Electrónico:"),"",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(90,5,utf8_decode($data[0]["CORREO"]),"BR",1,'L',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(20,5,utf8_decode("Dirección:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(150,5,utf8_decode($data[0]["DIRECCION"]),"BR",1,'L',false);
		

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(20,5,utf8_decode("Teléfono:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(20,5,utf8_decode($data[0]["TELEFONO"]),"B",0,'C',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(20,5,utf8_decode("Carrera:"),"",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(110,5,utf8_decode($data[0]["CARRERAD"]),"BR",1,'L',false);
	
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(20,5,utf8_decode("No. Control:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(20,5,utf8_decode($data[0]["MATRICULA"]),"B",0,'C',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(20,5,utf8_decode("Periodo:"),"",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(110,5,utf8_decode($data[0]["CICLOD"]),"BR",1,'L',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(20,5,utf8_decode("Semestre:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(20,5,utf8_decode($data[0]["PERIODOS_INS"]),"B",0,'C',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(60,5,utf8_decode("Porcentaje de Créditos aprobados:"),"",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(70,5,utf8_decode($data[0]["AVANCE"]),"BR",1,'L',false);

		$pdf->Cell(170,5,utf8_decode(""),"BLR",1,'C',false);

		$pdf->Ln(10);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(170,3,utf8_decode("DATOS DEL PROGRAMA:"),"",1,'L',false);
		$pdf->Cell(170,5,utf8_decode(""),"TLR",1,'C',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(30,5,utf8_decode("Tipo de Programa:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(140,5,utf8_decode($data[0]["TIPOPROGD"]),"BR",1,'L',false);


		$pdf->SetFont('Times','B',10);
		$pdf->Cell(170,5,utf8_decode("Actividades:"),"LR",1,'L',false);

		$pdf->SetFont('Times','',10);
		$pdf->MultiCell(170,5,utf8_decode($data[0]["ACTIVIDADES"]),"LRB",'L',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Dependencia Oficial:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(120,5,utf8_decode($data[0]["EMPRESA"]),"BR",1,'L',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Domicilio de la Dependencia:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(120,5,utf8_decode($data[0]["DIREMPRESA"]),"BR",1,'L',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Titular de la Dependencia:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(120,5,utf8_decode($data[0]["REPRESENTANTE"]),"BR",1,'L',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Puesto:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(120,5,utf8_decode($data[0]["PUESTO"]),"BR",1,'L',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Responsable del Programa:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(120,5,utf8_decode($data[0]["RESPPROG"]),"BR",1,'L',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Puesto:"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(120,5,utf8_decode($data[0]["PSTORESPPROG"]),"BR",1,'L',false);


		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Fechas de la prestación:   Del"),"L",0,'L',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(15,5,utf8_decode($data[0]["INICIO"]),"B",0,'C',false);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Al: "),"",0,'R',false);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(15,5,utf8_decode($data[0]["TERMINO"]),"B",0,'C',false);
		$pdf->Cell(40,5,"","R",1,'C',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Teléfono:"),"L",0,'L',false);		
		$pdf->SetFont('Times','',10);
		$pdf->Cell(40,5,utf8_decode($data[0]["TELEMPRESA"]),"B",0,'L',false);
		$pdf->Cell(80,5,"","R",1,'C',false);

		$valsi='X'; $valno=''; if ($data[0]["AYUDA"]=='N') {$valsi="";$valno='X';}
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(50,5,utf8_decode("Ayuda Económica:"),"L",0,'L',false);		
		$pdf->SetFont('Times','',10);
		$pdf->Cell(10,5,utf8_decode("SI"),"",0,'R',false);
		$pdf->Cell(10,5,$valsi,"B",0,'C',false);
		$pdf->Cell(10,5,utf8_decode("NO"),"",0,'R',false);
		$pdf->Cell(10,5,$valno,"B",0,'C',false);
		$pdf->Cell(60,5,utf8_decode("MONTO"),"",0,'R',false);
		$pdf->Cell(20,5,$data[0]["MONTO"],"BR",1,'C',false);

		$pdf->SetFont('Times','B',10);
		$pdf->Cell(170,5,utf8_decode("Para uso exclusivo del departamento de servicio social:"),"LR",1,'L',false);		

		$valsi='X'; $valno=''; if ($data[0]["VALIDADO"]=='N') {$valsi="";$valno='X';}
		$pdf->Cell(50,5,utf8_decode("Aceptado:"),"L",0,'L',false);		
		$pdf->SetFont('Times','',10);
		$pdf->Cell(10,5,utf8_decode("SI"),"",0,'R',false);
		$pdf->Cell(10,5,$valsi,"B",0,'C',false);
		$pdf->Cell(10,5,utf8_decode("NO"),"",0,'R',false);
		$pdf->Cell(10,5,$valno,"B",0,'C',false);
		$pdf->Cell(20,5,utf8_decode("Motivo:"),"",0,'R',false);
		$pdf->Cell(60,5,$data[0]["OBS"],"BR",1,'C',false);
		$pdf->Cell(170,5,utf8_decode(""),"BLR",1,'C',false);

		$pdf->Ln(15);
		$pdf->Cell(70,5,utf8_decode("Firma del Alumno"),"T",1,'C',false);
		$pdf->Ln(10);
		$pdf->Cell(170,5,utf8_decode("NOTA: Este documento deberá ser llenado a computadora,  no es válido si presenta tachaduras, enmendaduras y/o correcciones."),"",1,'C',false);
		

		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
