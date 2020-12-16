
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
   				$this->MultiCell($w,4,$data[$i],0,$a, false);
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
   	        
			var $elrespm="";
			var $elrespm_p="";
			var $elresp="";
			var $elresp_p="";


   	       

   	
			function LoadData()
			{				
				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vdpactividades where MES='".$_GET["mes"].
				"' and ANIO='".$_GET["anio"]."' and META='".$_GET["meta"]."'");				
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
				
			

				$this->SetY(20);$this->SetX(20);
				$this->Cell(45,18,"",1,0,'L',false); //donde esta el logo
				$this->SetFont('Times','B',11);
				$this->Cell(154,3,"","TRL",0,'C',false);
				$this->Cell(40,18,"",1,0,'L',false); //GENERA EL TERCER CUADRO
				
				$this->SetY(23);$this->SetX(65);
				$this->Cell(154,3,utf8_decode("FORMATO DE SEGUIMIENTO FÍSICO DE METAS"),"LR",0,'C',false);

				$this->SetY(26);$this->SetX(65);
				$this->Cell(154,3,"","B",0,'C',false);

				$this->SetY(29);$this->SetX(65);
				$this->SetFillColor(242,242,242);
				$this->Cell(154,9,utf8_decode("(P-PLA-01-F-02)"),1,0,'C',true);

				$this->Image('../../imagenes/empresa/pie1.png',28,22,30,15);
				
				$this->SetFont('Times','',9);
				$this->SetY(23);$this->SetX(219);
				$this->Cell(40,3,utf8_decode("PÁG. ".$this->PageNo()." DE 1"),"",0,'C',false);
				$this->SetY(26);$this->SetX(219);
				$this->Cell(40,3,utf8_decode("REVISIÓN NO. 01"),"B",0,'C',false);
				$this->SetY(29);$this->SetX(219);
				$this->Cell(40,3,"VIGENCIA A PARTIR DEL","",0,'C',false);
				$this->SetY(32);$this->SetX(219);
				$this->Cell(40,3,"04 DE JUNIO DE 2018","",0,'C',false);
				$this->SetY(35);$this->SetX(219);
				$this->Cell(40,3,"VERSION 2015","BR",0,'C',false);

					//Para que cuando se cambie a la otra pagina empiece a la derecha y la stablas no se descuadren
					$this->SetX(20);
					$this->Ln(5);
				
			}
		

			function Footer()
			{	
                
				
				
 
				$this->SetFont('Times','B',10);
                $this->setY(-40);
				$this->Cell(100,5,utf8_decode($this->elresp),0,0,'C');
				$this->setX(149);
				$this->Cell(100,5,utf8_decode($this->elrespm),0,0,'C');

                $this->setY(-35);
				$this->Cell(100,5,utf8_decode($this->elresp_p),0,0,'C');
				$this->setX(149);
				$this->Cell(100,5,utf8_decode($this->elrespm_p),0,0,'C');

				$this->SetFont('Times','',8);
				$this->setY(-30);
				$this->Cell(100,5,utf8_decode("Nombre y firma del responsable del seguimiento"),0,0,'C');
				$this->setX(149);
				$this->Cell(100,5,utf8_decode("Firma del responsable de la meta"),0,0,'C');
        
                
			}

			
			
   }
		
		$pdf = new PDF('L','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		$meses=["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
		$pdf->SetFont('Times','B',12);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,50); 
		$pdf->AddPage();
	
		$data = $pdf->LoadData();
		$pdf->SetY(42);
		$pdf->Cell(0,0,utf8_decode("SEGUIMIENTO FÍSICO DE METAS INSTITUCIONALES"),"",0,'C',false);

		$pdf->Ln(2);
		$pdf->SetFont('Times','',10);

		$elavancemeta="14";
		$pdf->SetWidths(array(40,169,20,10));
		$pdf->Row(array(utf8_decode("META:"),utf8_decode($data[0]["METAD"]),utf8_decode("AVANCE:"),$elavancemeta));

		$pdf->SetWidths(array(40,199));
		$pdf->Row(array(utf8_decode("OBJETIVO ESTRATÉGICO:"),utf8_decode($data[0]["OBJESTD"])));

		$pdf->SetWidths(array(40,199));
		$pdf->Row(array(utf8_decode("ESTRATEGIA:"),utf8_decode($data[0]["ESTRAD"])));

		$pdf->SetWidths(array(40,199));
		$pdf->Row(array(utf8_decode("PROGRAMA ESTRATÉGICO:"),utf8_decode($data[0]["PROGESTD"])));

		$pdf->SetWidths(array(40,199));
		$pdf->Row(array(utf8_decode("PROGRAMA PRESUPUESTAL:"),utf8_decode($data[0]["PROGPRESD"])));

		$pdf->SetWidths(array(40,199));
		$pdf->Row(array(utf8_decode("RESPONSABLE:"),utf8_decode($data[0]["RESPMETAD"])));

		$pdf->Ln(5);
		$hoy = getdate();
		$pdf->Cell(119,0,utf8_decode("AVANCE CORRESPONDIENTE AL MES DE: ".$meses[$data[0]["MES"]-1]),0,0,'L',false);
		$pdf->Cell(119,0,utf8_decode("FECHA DE ELABORACIÓN: ".date("d")."/".date("m")."/".date("Y") ),0,0,'R',false);

		$pdf->elresp=$data[0]["NOMBRE"];
		$pdf->elresp_p=$data[0]["EMPL_FIRMAOF"];

		$pdf->elrespm=$data[0]["RESPMETAD"];
		$pdf->elrespm_p=$data[0]["FIRMAOFMETAD"];

		

		$pdf->SetFont('Times','B',8);
		$pdf->Ln(5);
		$pdf->SetAligns(array("C","C","C","C","C"));
		$pdf->SetWidths(array(50,30,30,49,80));
		$pdf->Row(array(
					  utf8_decode("ACTIVIDAD REALIZADA"),
					  utf8_decode("FECHA"),
					  utf8_decode("LUGAR"),
					  utf8_decode("POBLACIÓN BENEFICIADA POR GÉNERO"),
					  utf8_decode("DESCRIPCION E IMPACTO DE LA ACTIVIDAD REALIZADA PARA EL CUMPLIMIENTO DE LA META"),
					  )
				 );


		$pdf->SetFont('Times','',8);
		$pdf->SetAligns(array("J","J","J","J","J"));
		foreach ($data as $row) {
			
			$pdf->Row(array(				
				utf8_decode($row["DPAC_DESCRIPCION"]),
				utf8_decode($row["DPAC_TERMINA"]),
				utf8_decode($row["DPAC_SEDE"]),
				utf8_decode($row["DPAC_PARTICIPANTES"]),
				utf8_decode($row["DPAC_OBJETIVO"])
				)
		   );			
		}

		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
