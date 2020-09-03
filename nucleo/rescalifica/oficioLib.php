
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
 

			function LoadDataRes()
			{	
				$data=[];			
				$miConex = new Conexion();
				$cadsql="select * from vresidencias where MATRICULA='".$_GET["matricula"]."' and CICLO='".$_GET["ciclo"]."'";
				$resultado=$miConex->getConsulta($_SESSION['bd'],$cadsql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

   	
			function LoadData()
			{	
				$data=[];			
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from falumnos a, ccarreras c, ciclosesc d ".				
				" where ALUM_CARRERAREG=CARR_CLAVE AND CICL_CLAVE='".$_GET["ciclo"]."' and ALUM_MATRICULA='".$_GET["matricula"]."'");				
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


				$nombre=$miutil->getJefe('303');//Nombre del puesto DECONTRL ESCOLAR
                $this->SetFont('Montserrat-ExtraBold','B',11);

				$this->SetY(-55);
				$this->SetFont('Montserrat-ExtraBold','B',8);
				$this->Cell(0,0,'A T E N T A M E N T E',0,1,'L');

				$this->SetY(-52);
		        $this->SetFont('Montserrat-ExtraLight','I',8);
				$this->Cell(0,0,utf8_decode('Excelencia en Educación Tecnológica'),0,1,'L');
				

				$this->SetFont('Montserrat-ExtraBold','B',11);
                $this->setY(-50);
                $this->Cell(0,15,$nombre,0,1,'L');
                $this->setY(-40);
				$this->Cell(0,5,"JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES",0,1,'L');
				

				$this->SetY(-30);
				$this->SetFont('Montserrat-Medium','',8);
				$this->Cell(0,0,"c.c.p. Archivo.",0,1,'L');
				
				
			}
			
		
		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,45); 
		$pdf->AddPage();
		 
		
		$miutil = new UtilUser();
	
		$dataRes=$pdf->LoadDataRes();
		$data=$pdf->LoadData();
		$dataGen = $pdf->LoadDatosGen();
		$nombre=$miutil->getJefe('303');//Nombre del puesto Control escolar
		$elpsto="DEPARTAMENTO DE SERVICIOS ESCOLARES";
		
		//Para el numero de oficio 
		$dataof=$miutil->getConsecutivoDocumento("LIBRESIDENCIAS",$data[0]["ALUM_MATRICULA"]);
		

		$fechadecof=$miutil->formatFecha($dataof[0]["FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
	
		
		$pdf->Ln(3);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'DEPENDENCIA:',0,0,'L');
        $pdf->Cell(35,5,'DPTO DE SERV.ESCS',0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'OFICIO NO:',0,0,'L');
        $pdf->Cell(35,5,$dataof[0]["CONSECUTIVO"],0,0,'L');
		$pdf->Ln(5);
		$pdf->SetX(120);
        $pdf->Cell(35,5,'FECHA:',0,0,'L');
        $pdf->Cell(35,5,$dataof[0]["FECHA"],0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'CLAVE:',0,0,'L');
        $pdf->Cell(35,5,$dataGen[0]["inst_claveof"],0,0,'L');
        $pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'ASUNTO:',0,0,'L');
        $pdf->Cell(35,5,utf8_decode("LIBERACIÓN DE"),0,0,'L');
        $pdf->Cell(35,5,'',0,0,'L');
		$pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'        ',0,0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',9);
		$pdf->Cell(35,5,"RESIDENCIA PROFESIONAL",0,0,'L');
		

		$pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Ln(15);
        $pdf->Cell(0,5,utf8_decode("C. ".$data[0]["ALUM_NOMBRE"].' '.$data[0]["ALUM_APEPAT"].' '.$data[0]["ALUM_APEMAT"]),0,0,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,5,utf8_decode("NÚMERO DE CONTROL: ".$data[0]["ALUM_MATRICULA"]),0,0,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,5,utf8_decode("PLAN DE ESTUDIOS CLAVE: ".$data[0]["ALUM_MAPA"]),0,0,'L');
        $pdf->Ln(5);
		$pdf->Cell(0,5,utf8_decode($data[0]["CARR_DESCRIP"]),0,0,'L');
		$pdf->Ln(5);
		$pdf->Cell(0,5,utf8_decode("PRESENTE"),0,0,'L');
		$pdf->SetFont('Montserrat-Medium','',10);
	
        $pdf->Ln(15);
		$pdf->MultiCell(0,5,utf8_decode("POR MEDIO DEL PRESENTE LE COMUNICO QUE HA SIDO LIBERADA LA RESIDENCIA PROFESIONAL ".
		"CON EL PROYECTO ".$dataRes[0]["PROYECTO"].", REALIZADO EN LA EMPRESA O INSTITUCION ".$dataRes[0]["EMPRESAD"].", ".
		"EN EL PERÍODO COMPRENDIDO DE ".$dataRes[0]["INICIA"]." AL ".$dataRes[0]["TERMINA"]."  CONTANDO CON EL(LOS) ".
		" ASESOR(ES) EXTERNO(S) ".$dataRes[0]["ASESOREXT"]." Y EL(LOS) ASESOR(ES) INTERNO(S) ".$dataRes[0]["ASESOR"]."."),0,'J',FALSE);

		$pdf->Ln(5);
		$pdf->MultiCell(0,5,utf8_decode("LO ANTERIOR CON FUNDAMENTO EN EL MANUAL DE PROCEDIMIENTOS PARA LA PLANEACIÓN OPERACIÓN ".
		"Y ACREDITACIÓN DE LAS RESIDENCIAS PROFESIONALES"),0,'J',FALSE);

		$pdf->Ln(5);
		$pdf->MultiCell(0,5,utf8_decode("SEGÚN LO AVALA CON EL PROYECTO PRESENTADO POR EL ALUMNO QUE ESTA EN CUSTODIA EN EL ".
		"DEPARTAMENTO ACADÉMICO"),0,'J',FALSE);
		
		$pdf->Ln(5);
		$pdf->MultiCell(0,5,utf8_decode("SIN MÁS POR EL MOMENTO"),0,'J',FALSE);

		$pdf->Output(); 
 } else {header("Location: index.php");}
 
 ?>
