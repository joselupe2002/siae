
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
				$data=[];			
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from falumnos a, ecalcertificado b, ccarreras c, ciclosesc d ".				
				" where  ALUM_MATRICULA=MATRICULA and ALUM_CARRERAREG=CARR_CLAVE AND CICLO=CICL_CLAVE and MATRICULA='".$_GET["matricula"]."'");				
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
	
		$data=$pdf->LoadData();
		$dataGen = $pdf->LoadDatosGen();
		$nombre=$miutil->getJefe('303');//Nombre del puesto Control escolar
		$elpsto="DEPARTAMENTO DE SERVICIOS ESCOLARES";
		
		//Para el numero de oficio 
		$dataof=$miutil->getConsecutivoDocumento("LIBCOMPLEMENTARIAS",$data[0]["ALUM_MATRICULA"]);
		

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
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
		$pdf->Cell(35,5,"ACTIVIDADES",0,0,'L');
		$pdf->Ln(5);
        $pdf->SetX(120);
        $pdf->Cell(35,5,'        ',0,0,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
		$pdf->Cell(35,5,"COMPLEMENTARIAS",0,0,'L');
		

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
		$pdf->MultiCell(0,5,utf8_decode("POR MEDIO DEL PRESENTE LE COMUNICO QUE HA SIDO LIBERADA SU ACTIVIDAD COMPLEMENTARIA ".
		"CON EL NIVEL DE DESEMPEÑO ".$data[0]["CALLET"]." Y UN VALOR NUMÉRICO DE ".$data[0]["CALCER"].", ".
		"DURANTE EL PERÍODO ESCOLAR ".$data[0]["CICL_INICIOR"]." AL ".$data[0]["CICL_FINR"]."  CON UN VALOR CURRICULAR DE ".
		" 05 CRÉDITOS."),0,'J',FALSE);

		$fechapie=$miutil->aletras(date("d", strtotime($fechadecof)))." DÍAS DEL MES DE ".
				  $miutil->getMesLetra(date("m", strtotime($fechadecof)))." DEL AÑO ". 
				  $miutil->aletras(date("Y", strtotime($fechadecof)));
        $pdf->Ln(5);
        $pdf->MultiCell(0,5,utf8_decode("SE EXTIENDE LA PRESENTE EN LA CIUDAD DE MACUSPANA, ESTADO DE TABASCO A LOS ".
		strtoupper($fechapie).", PARA LOS FINES QUE CONVENGAN AL INTERESADO."),0,'J',FALSE);
	
        $pdf->Ln(5);
        $pdf->MultiCell(0,5,utf8_decode(" SIN MÁS POR EL MOMENTO."),0,'J',FALSE);
        $pdf->Ln(5);

		
/*
		
		$pdf->eljefe=$dataDepto[0]["EMPL_ABREVIA"]." ".$dataDepto[0]["NOMBRE"];
		$pdf->eljefepsto=$dataDepto[0]["EMPL_FIRMAOF"];
		
		
		$pdf->SetFont('Montserrat-SemiBold','',10);		

		
		$pdf->MultiCell(0,5,'La(El) que suscribe : '.utf8_decode($dataDepto[0]["NOMBRE"])." ".utf8_decode($dataDepto[0]["EMPL_FIRMAOF"]). ", por este medio se permite hacer de su ".
		utf8_decode("conocimiento que lo(s) estudiantes que se enlistan a continuación de la carrera de ").utf8_decode($_GET["carrerad"])." han cumplido un total de ".
		utf8_decode(" CINCO créditos."),0,'J', false);
		$pdf->ln();
		
		
		
		$data = $pdf->LoadData();
		
	
		$lasmatricula="";
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

			$lasmatricula.=$rowdes["MATRICULA"].",";
			
		}
		$pdf->Ln(5);
		
		$elsql="UPDATE contoficios set ".
		"CONT_INFO='".substr($lasmatricula,0,strlen($lasmatricula)-1)."' WHERE CONT_CONTROL='".$depto."-".date("dmY")."'".
		" and CONT_SOLO='".$dataof[0]["CONT_SOLO"]."'";

		//echo $elsql;
		$res=$miConex->afectaSQL($_SESSION['bd'],$elsql);	    
		
*/
		$pdf->Output(); 
 } else {header("Location: index.php");}
 
 ?>
