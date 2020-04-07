
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
   	        var $responsable="";
   	        var $eljefepsto="";
 
   	
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vecompl_cal where IDCAL=".$_GET["ID"]);				
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
				$miutil = new UtilUser();
				$miutil->getEncabezado($this,'V');			
			}
			
			

			function Footer()
			{				
				$miutil = new UtilUser();
				$miutil->getPie($this,'V');
				
				$this->SetX(10);$this->SetY(-60);
				$this->SetFont('Montserrat-ExtraBold','B',8);
				$this->Cell(0,0,'A T E N T A M E N T E',0,1,'C');
			
				$this->SetX(10);$this->SetY(-45);
				$this->SetFont('Montserrat-ExtraBold','B',8);
				$this->Cell(50,0,utf8_decode($this->responsable),0,0,'C');
				
				$this->SetX(10);$this->SetY(-40);
				$this->Cell(50,0,utf8_decode("RESPONSABLE DE ACTIVIDAD"),0,1,'C');
				
				$this->SetX(100);$this->SetY(-45);
				$this->SetFont('Montserrat-ExtraBold','B',8);
				$this->Cell(250,0,utf8_decode($this->eljefe),0,0,'C');
				
				$this->SetX(10);$this->SetY(-40);
				$this->Cell(250,0,utf8_decode($this->eljefepsto),0,1,'C');
				
				
				$this->SetX(10);$this->SetY(-30);
				$this->SetFont('Montserrat-Medium','',8);
				$this->Cell(0,0,"c.c.p. Archivo.",0,1,'L');
				
			}
			
		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
		$pdf->AddPage();
		
	
		 
		$data = $pdf->LoadData();
		$dataGen = $pdf->LoadDatosGen();
		
		$miutil = new UtilUser();
		
		
		$jefediv=$miUtil->getDatoGen("fures","CONCAT(URES_JEFE,'|',URES_URES)","CARRERA",$data[0]["CARRERA_ALUM"]);
		$datosJefe=explode("|", $jefediv);
		$jefediv=$miUtil->getDatoEmpl($datosJefe[0],"CONCAT(EMPL_ABREVIA,' ',EMPL_NOMBRE,' ',' ',EMPL_APEPAT,' ',EMPL_APEMAT)") ;

		$depto=$datosJefe[1];
		
		
		$elpsto=$miUtil->getDatoEmpl($datosJefe[0],"EMPL_FIRMAOF");
		
		$escolares=$miutil->getJefe('303'); //control escolar 
		$dataof=$miutil->verificaOficio($depto,"LIBCOMPL",$_GET["ID"]);		
		

		$fechadecof=$miutil->formatFecha(date("d/m/Y"));
        $fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
       
        $eldia=date("d", strtotime($fechadecof));
        $elmes=$miutil->getFecha($fechadecof,'MES');
        $elanio=date("Y", strtotime($fechadecof));
	
        $fechadec=$miutil->formatFecha($data[0]["INICIA"]);
        $fechaini=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
        
        $fechadec=$miutil->formatFecha($data[0]["TERMINA"]);
        $fechafin=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
        
        $pdf->SetFont('Montserrat-Medium','',9);
        $pdf->Ln(10);
        $pdf->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');
        $pdf->Ln(5);
        $pdf->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
        $pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Ln(20);
        $pdf->Cell(0,0,utf8_decode($escolares),0,1,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,0,utf8_decode("JEFE DE CONTROL ESCOLAR"),0,1,'L');
        $pdf->Ln(5);
        $pdf->Cell(0,0,utf8_decode("PRESENTE"),0,1,'L');
        $pdf->Ln(10);
        
        $pdf->SetFont('Montserrat-SemiBold','',10);
        

        
        $pdf->MultiCell(0,8,"El que suscribe : ".utf8_decode($jefediv).", por este medio se permite hacer de su conocimiento ".
        		"que el estudiante ". utf8_decode($data[0]["MATRICULAD"])." con número de control ".utf8_decode($data[0]["MATRICULA"]).
        		" de la carrera de ".utf8_decode($data[0]["CARRERA_ALUMD"])." ha cumplido su actividad complementaria con el nivel de desempeño ".
        		utf8_decode($data[0]["PROML"])." y un valor numérico de ".utf8_decode($data[0]["PROM"]).", durante el periodo escolar ".
        		utf8_decode($data[0]["CICLO"]." ".$data[0]["CICLOD"])." con un valor curricular de ".utf8_decode($data[0]["CREDITOS"])." créditos.".
        		" Actividad Desarrollada: ".utf8_decode($data[0]["ACTIVIDADD"])." del ".$fechaini." al ".$fechafin,0,'J', false);
        $pdf->Ln(5);
        $pdf->Ln(5);
        $pdf->MultiCell(0,8,"Se extiende la presente en la ciudad de Macuspana, Tabasco a los ".$eldia." días del mes de ".$elmes." de ".$elanio,0,'J', false);
        $pdf->Ln(5);
       
        
        $pdf->eljefe=$jefediv;
        $pdf->responsable=$data[0]["RESPONSABLED"];
        $pdf->eljefepsto=$elpsto;
		
		/*

		
		$pdf->eljefe=$data[0]["COMI_AUTORIZOABREVIA"]." ".$data[0]["COMI_AUTORIZOD"];
		$pdf->eljefepsto=$data[0]["COMI_AUTORIZOFIRMAOF"];
		*/
	
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
