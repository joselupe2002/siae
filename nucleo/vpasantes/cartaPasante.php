
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
		
/*============================================================================================*/		
   	
   	        var $eljefe="";
   	        var $eljefepsto="";
 
   	
			function LoadData()
			{	
				$data=[];			
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from falumnos a, ccarreras c".				
				" where  ALUM_CARRERAREG=CARR_CLAVE and ALUM_MATRICULA='".$_GET["ID"]."'");				
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


				$nombre=$miutil->getJefe('101');//Nombre del puesto DIRECTOR GENERAL
                $this->SetFont('Montserrat-ExtraBold','B',11);

				$this->SetFont('Montserrat-ExtraBold','B',11);
                $this->setY(-50);
                $this->Cell(0,15,utf8_decode($nombre),0,1,'C');
                $this->setY(-40);
				$this->Cell(0,5,"DIRECTOR GENERAL",0,1,'C');
				
				
				
			}
			
		
		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(50, 25 , 25);
		$pdf->SetAutoPageBreak(true,45); 
		$pdf->AddPage();
		 
		
		$miutil = new UtilUser();
	
		$data=$pdf->LoadData();
        $dataGen = $pdf->LoadDatosGen();
		$nombre=$miutil->getJefe('303');//Nombre del puesto Control escolar
		$elpsto="DEPARTAMENTO DE SERVICIOS ESCOLARES";
        
		//Para el numero de oficio 
		$dataof=$miutil->getConsecutivoDocumento("CARTAPASANTE",$data[0]["ALUM_MATRICULA"]);
	
		$fechadecof=$miutil->formatFecha($dataof[0]["FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
	
        $pdf->Image("../../imagenes/empresa/marcofoto.png",10,70,31,41);
        
		$pdf->Ln(3);
        $pdf->SetFont('Montserrat-Medium','B',10);
        $pdf->SetX(120);
        $pdf->Cell(50,5,'CARTA DEL PASANTE NO.',0,0,'L');
        $pdf->Cell(35,5,$dataof[0]["CONSECUTIVO"],0,0,'L');
        
        $pdf->Ln(20);        
        $pdf->Cell(50,5,'EN VIRTUD QUE EL C.',0,1,'L');
        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-ExtraBold','B',14);
        $pdf->Cell(0,0,utf8_decode($data[0]["ALUM_NOMBRE"].' '.$data[0]["ALUM_APEPAT"].' '.$data[0]["ALUM_APEMAT"]),0,1,'C');

        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-Medium','B',10);     
        $pdf->Cell(50,5,'HA REALIZADO LOS ESTUDIOS CORRESPONDIENTES A LA CARRERA DE',0,1,'L');
        $pdf->Ln(10);
        
        $pdf->SetFont('Montserrat-ExtraBold','B',14);
        $pdf->Cell(0,0,utf8_decode($data[0]["CARR_DESCRIP"]),0,1,'C');

        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-Medium','B',10);     
        $pdf->Cell(0,0,'EN EL',0,1,'C');
        $pdf->Ln(10);

        $pdf->SetFont('Montserrat-ExtraBold','B',14);
        $pdf->MultiCell(0,5,utf8_decode($dataGen[0]["inst_razon"]),0,'C',FALSE);
        

        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-Medium','B',10);     
        $pdf->MultiCell(0,5,utf8_decode("SEGÚN CONSTANCIAS QUE EXISTEN EN EL EXPEDIENTE NO. ".$data[0]["ALUM_MATRICULA"].
        ", QUE OBRA EN EL ARCHIVO DEL DEPARTAMENTO DE SERVICIOS ESCOLARES DE ESTA INSTITUCIÓN, SE LE CONSIDERA"),0,'J',FALSE);
        $pdf->Ln(10);

        $pdf->SetFont('Montserrat-ExtraBold','B',14);
        $pdf->Cell(0,0,utf8_decode("PASANTE"),0,1,'C');

        $fechapie=$miutil->aletras(date("d", strtotime($fechadecof)))." DÍAS DEL MES DE ".
				  $miutil->getMesLetra(date("m", strtotime($fechadecof)))." DEL AÑO ". 
                  $miutil->aletras(date("Y", strtotime($fechadecof)));
                  
        $pdf->Ln(10);
        $pdf->SetFont('Montserrat-Medium','B',10);     
        $pdf->MultiCell(0,5,utf8_decode("DE ACUERDO CON LO QUE ESTABLECE LA LEY GENERAL DE PROFESIONES Y EL REGLAMENTO ".
        "RESPECTIVO, EXPIDIÉNDOSE LA PRESENTE EN LA CIUDAD DE MACUSPANA, ESTADO DE TABASCO, A LOS ".strtoupper($fechapie)),0,'J',FALSE);
        $pdf->Ln(5);

        $pdf->setX(10);
        $pdf->SetFont('Montserrat-medium','B',6);
        $pdf->MultiCell(30,3,utf8_decode("EL JEFE DE DEPARTAMENTO DE SERVICIOS ESCOLARES"),0,'J',false);

        $escolares=$miutil->getJefe('303');//Nombre del puesto CONTROL ESCOLAR
        
        $pdf->Ln(10);
        $pdf->setX(10);
        $pdf->SetFont('Montserrat-medium','B',6);
        $pdf->MultiCell(30,3,utf8_decode($escolares),0,'J',false);

       /* 
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
		"DURANTE EL PERÍODO ESCOLAR ".$data[0]["CICL_INICIO"]." AL ".$data[0]["CICL_FIN"]."  CON UN VALOR CURRICULAR DE ".
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

		*/
		$pdf->Output(); 
 } else {header("Location: index.php");}
 
 ?>
