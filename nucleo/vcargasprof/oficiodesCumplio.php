
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
   	        
   	     var $eljefe="";
   	       
   	     function verificaOficioDes($depto,$tipo,$elidControl){
   	     	$fecha_actual=date("d/m/Y");
   	     	$anio=date("Y");
   	     	$miConex = new Conexion();
   	     	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT count(*) as N from contoficios where CONT_TIPO='".$tipo."' and CONT_CONTROL='".$elidControl."'");
   	     	foreach ($resultado as $row) {$hay=$row["N"];}
   	     	if ($hay==0) {
   	     		$numofi="NO HAY CONSECUTIVO";
   	     		$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT CONS_NUMERO, CONS_PRE from pconsoficios where CONS_URES='".$depto."' and CONS_ANIO='".$anio."'");
   	     		foreach ($resultado as $row) {$ofisolo=$row["CONS_NUMERO"]; $numofi=$row["CONS_PRE"]."-".$row["CONS_NUMERO"]."/".$anio;}
   	     		$res=$miConex->afectaSQL($_SESSION['bd'],"UPDATE pconsoficios set CONS_NUMERO=CONS_NUMERO+1 where CONS_URES='".$depto."'");
   	     		
   	     		if (!($numofi=="NO HAY CONSECUTIVO")){
   	     			$res=$miConex->afectaSQL($_SESSION['bd'],"INSERT INTO contoficios (CONT_TIPO,CONT_NUMOFI,CONT_FECHA, CONT_CONTROL,".
   	     					"CONT_USUARIO,_INSTITUCION,_CAMPUS,CONT_SOLO) values ('".$tipo."','".$numofi."','".$fecha_actual."','".$_GET["ID"]."-".$_GET["ciclo"]."',".
   	     					"'".$_SESSION['usuario']."','".$_SESSION['INSTITUCION']."','".$_SESSION['CAMPUS']."','".$ofisolo."');");
   	     		}
   	     		$data[0]["CONT_FECHA"]=$fecha_actual;
   	     		$data[0]["CONT_NUMOFI"]=$numofi;
   	     	}
   	     	else {   	   		
   	     		$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from contoficios where CONT_TIPO='".$tipo."' and CONT_CONTROL='".$elidControl."'");
   	     		foreach ($resultado as $row) {$data[] = $row;}
				}   	
				
				
				return $data;   	     	
   	     }
   	     
   	     
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
			
			function Header()
			{
				$miutil = new UtilUser();
				$miutil->getEncabezado($this,'V');			
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'V');
				
			}
			
			
			function descarga()
			{
				$entre=false;
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select  a.DESC_ACTIVIDAD, a.DESC_ACTIVIDADD, a.DESC_DESCRIP, a.DESC_HORAS ".
						" from  vedescarga a where a.DESC_CICLO='".$_GET["ciclo"]."' and a.DESC_PROFESOR='".$_GET["ID"]."'" );
				foreach ($resultado as $row) {
					$data[] = $row;
					$entre=true;
				}
				if ($entre) {return $data;}
				else  return null;
			}		
			
		
		function imprimeDescarga($headerdes, $datades)
		{
			$this->SetFillColor(172,31,6);
			$this->SetTextColor(255);
			$this->SetDrawColor(181,57,35);
			$this->SetLineWidth(.3);

			$w = array(10, 76, 70, 10);
			$this->SetFont('Montserrat-ExtraBold','B',8);
			for($i=0;$i<count($headerdes);$i++) 
				$this->Cell($w[$i],7,$headerdes[$i],1,0,'C',true);
				$this->Ln();
				// Restauraci�n de colores y fuentes
				$this->SetFillColor(255,254,174);
				$this->SetTextColor(0);
				$this->SetFont('');
				// Datos
				$fill = false;
				$this->SetFont('Montserrat-Medium','',6);
				$suma=0;
				
				
				foreach($datades as $rowdes)
				{
					
					if (count($rowdes)) {
						$this->Cell($w[0],4,utf8_decode($rowdes[0]),'LR',0,'J',$fill);
						$this->Cell($w[1],4,utf8_decode($rowdes[1]),'LR',0,'L',$fill);
						$this->Cell($w[2],4,utf8_decode($rowdes[2]),'LR',0,'L',$fill);
						$this->Cell($w[3],4,$rowdes[3],'LR',0,'C',$fill);						
						$suma+=$rowdes[3];						
						$this->Ln();
						$fill = !$fill;
					}
					
				}
				
				$this->Cell(array_sum($w),0,'','T');
				$this->Ln();
				$this->SetFont('Montserrat-ExtraBold','B',8);
				$this->Cell(array_sum($w)-10,4,'Suma de Horas','LR',0,'R',$fill);
				$this->Cell(10,4,$suma,'LR',0,'C',$fill);
				$this->Ln();
				$this->Cell(array_sum($w),0,'','T');
				// L�nea de cierre
		    }
		
         
		
		
   }
   
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,25); 
		$pdf->AddPage();
		
		
		$dataEmpl = $pdf->getDatosPersona($_GET["ID"]);
		
		$datades = $pdf->descarga();
		if (!($datades[0]==null)) { 
			
			$miutil = new UtilUser();
			
			$dataGen = $pdf->LoadDatosGen();
			$depto=$miutil->getDatoEmpl($_GET["ID"],"EMPL_DEPTO");
			
			
			$dataof=$pdf->verificaOficioDes($depto,"DESCARGACUMPLE",$_GET["ID"]."-".$_GET["ciclo"]);
			
		

			$fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
			$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
			
			$pdf->SetFont('Montserrat-Medium','',9);
			$pdf->Ln(10);
			$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"]." ".$fechaof,0,1,'R');
			$pdf->Ln(5);
			$pdf->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
			$pdf->Ln(5);
		    $pdf->SetFont('Montserrat-ExtraBold','B',9);
			$pdf->Cell(0,0,utf8_decode('ASUNTO: DESCARGA ACADÉMICA.'),0,1,'R');
			$pdf->SetFont('Montserrat-ExtraBold','B',9);
			$pdf->Ln(20);
			$pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_ABREVIA"])." ".utf8_decode($dataEmpl[0]["EMPL_NOMBREC"]),0,1,'L');
			$pdf->Ln(5);
			$pdf->Cell(0,0,'DOCENTE '.utf8_decode($dataEmpl[0]["EMPL_DEPTOD"]),0,1,'L');
			$pdf->Ln(10);
			
			$pdf->SetFont('Montserrat-SemiBold','',10);
			$pdf->MultiCell(0,8,utf8_decode("Por este medio me permito informarle a usted, que HA CUMPLIDO con las Actividades asignadas en su carga horaria correspondiente al semestre ".
					$_GET["ciclo"]." ".$_GET["ciclod"]. ", las cuáles son:"),0,'J', false);
			$pdf->Ln(5);			
			$headerdes = array('CVE',utf8_decode('ACTIVIDAD'),utf8_decode('DESCRIPCIÓN/ENTREGABLE'),'HRS');
			$pdf->imprimeDescarga($headerdes,$datades);
			$pdf->Ln(5);
			$pdf->SetFont('Montserrat-SemiBold','',10);
			$pdf->MultiCell(0,8,utf8_decode("Mismas que se han revisado y validado con las evidencias correspondientes y que se, ").
			utf8_decode("apegan a los procedimientos e instructivo de trabajo alojados en el SGC del ").
			utf8_decode("cual forma parte."),0,'J', false);
			$pdf->Ln(5);
			$pdf->MultiCell(0,8,utf8_decode("Sin más por el momento envió un cordial saludo."),0,'J', false);

			
			$firmaof=$miutil->getDatoEmpl($dataEmpl[0]["EMPL_JEFE"],"EMPL_FIRMAOF");
			
			if (($_GET["tipo"]=='1') ||($_GET["tipo"]=='2')) {
				$elsello=$miutil->getDatoEmpl($dataEmpl[0]["EMPL_JEFE"],"EMPL_SELLO");
				$lafirma=$miutil->getDatoEmpl($dataEmpl[0]["EMPL_JEFE"],"EMPL_FIRMA");
				$pdf->Image($elsello,150,200,45);
				$pdf->Image($lafirma,50,215,40);
				
			}
			
			
			$pdf->setX(25);$pdf->setY(220);
			$pdf->SetFont('Montserrat-ExtraBold','B',10);
			$pdf->Cell(0,0,'A T E N T A M E N T E',0,1,'L');
			$pdf->setX(25);$pdf->setY(225);
			$pdf->SetFont('Montserrat-ExtraLight','I',8);
			$pdf->Cell(0,0,utf8_decode('Excelencia en Educación Tecnológica'),0,1,'L');
			$pdf->setX(25);$pdf->setY(235);
			$pdf->SetFont('Montserrat-ExtraBold','B',10);
			$pdf->Cell(0,0,utf8_decode($dataEmpl[0]["EMPL_JEFED"]),0,1,'L');
			$pdf->setX(25);$pdf->setY(240);
			$pdf->Cell(0,0,utf8_decode($firmaof),0,1,'L');
			
			$subdir=$miutil->getJefe('304');
			$pdf->setX(25);$pdf->setY(250);
			$pdf->SetFont('Montserrat-Medium','',7);
			$pdf->Cell(0,0,"C.c.p. ".utf8_decode($subdir)."; Subdirección académica.",0,1,'L');
			
			
		}
		
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
