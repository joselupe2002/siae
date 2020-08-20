

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
   	        var $eljefepsto="";
 
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vrespropuestas where ID=".$_GET["id"]);				
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
				$this->SetFont('Montserrat-ExtraBold','B',10);
				$this->Cell(0,0,'A T E N T A M E N T E',0,1,'L');
				
				$this->SetX(10);$this->SetY(-55);
				$this->SetFont('Montserrat-ExtraLight','I',8);
				$this->Cell(0,0,utf8_decode('Excelencia en Educación Tecnológica'),0,1,'L');

				$this->SetX(10);$this->SetY(-52);
				$this->SetFont('Montserrat-ExtraLight','I',8);
				$this->Cell(0,0,utf8_decode('Habilidad-actitud-conocimiento'),0,1,'L');

				
				$this->SetX(10);$this->SetY(-45);
				$this->SetFont('Montserrat-ExtraBold','B',10);
				$this->Cell(0,0,utf8_decode($this->eljefe),0,1,'L');
				
				$this->SetX(10);$this->SetY(-40);
				$this->Cell(0,0,utf8_decode($this->eljefepsto),0,1,'L');
				
				
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
		$miutil = new UtilUser();
		$fechadec=$miutil->formatFecha($data[0]["INICIA"]);
		$fechaini=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
		
		$fechadec=$miutil->formatFecha($data[0]["TERMINA"]);
		$fechafin=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
		
		
		$dataGen = $pdf->LoadDatosGen();
	
	
		$dataof=$miutil->verificaOficio("521","COMISION",$_GET["id"]);
		
		$fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
		
		
		$ss=$miutil->getJefe('521'); //empleado servicio social y residencia
		$elpsto=$miUtil->getDatoEmpl($miutil->getJefeNum('521'),"EMPL_FIRMAOF");
		$pdf->eljefe=$ss;
		$pdf->eljefepsto=$elpsto;
		
		
		$pdf->SetFont('Montserrat-Medium','',9);
		$pdf->Ln(10);
		$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Ln(10);

		$pdf->Cell(0,4,utf8_decode(strtoupper ($data[0]["PERSONA"])),0,1,'L');
		$pdf->Cell(0,4,utf8_decode(strtoupper ($data[0]["PUESTO"])),0,1,'L');
		$pdf->MultiCell(100,5,utf8_decode(strtoupper ($data[0]["EMPRESA"])),0,'L',false);

		$pdf->Ln(10);

		$pdf->SetFont('Montserrat-Medium','',9);
		$elperiodo='del '.$fechaini.' al '.$fechafin;
		$pdf->MultiCell(0,5,utf8_decode('El Instituto Tecnológico Superior de Macuspana, tiene a bien presentar a sus finas atenciones a (la) C ').
		utf8_decode($data[0]["NOMBRE"]).utf8_decode("con número de control ").utf8_decode($data[0]["MATRICULA"]).
		utf8_decode(', de la carrera de ').utf8_decode($data[0]["CARRERAD"]).utf8_decode(", quien desea desarrollar en esa empresa su proyecto ".
		"de Residencia Profesional, por lo que se requiere de ser aceptado(a), nos proporcione el nombre del proyecto en la ".
		"que realizara sus actividades y el nombre del departamento al cuál será asignado; así mismo se le informa que cubrirá ".
		"un total de 500 horas, en un período de cuatro a seis meses, .con fecha de inicio del ").utf8_decode($fechaini).".",0,'J', false);
		$pdf->Ln(5);

		$pdf->MultiCell(0,5,utf8_decode('Es importante hacer de su conocimiento que todos los estudiantes que se encuentran inscritos en esta institución cuentan con su inscripción en el IMSS.'),0,'J', false);
		$pdf->Ln(5);

		$pdf->MultiCell(0,5,utf8_decode('Así mismo, hacemos patente nuestro sincero agradecimiento por su buena disposición y colaboración para que nuestros estudiantes, aun estando en proceso de formación, desarrollen un proyecto de trabajo profesional, donde puedan aplicar el conocimiento y el trabajo en el campo de acción en el que se desenvolverán como futuros profesionistas.'),0,'J', false);
		$pdf->Ln(5);
		
		$pdf->MultiCell(0,5,utf8_decode('Al vernos favorecidos con su participación en nuestro objetivo, sólo nos resta manifestarle la seguridad de nuestra más atenta y distinguida consideración.'),0,'J', false);
		$pdf->Ln(5);
		

		$pdf->MultiCell(0,5,utf8_decode('Sin más por el momento, aprovecho la ocasión para enviarle un cordial saludo.'),0,'J', false);
		$pdf->Ln(5);

		
		$pdf->Output(); 
	
		/*
		$pdf->SetFont('Montserrat-SemiBold','',10);
		
		$laetfecha ='del '.$fechaini.' al '.$fechafin; $etfin=utf8_decode(" en fechas y horas señaladas.");
		if ($fechaini==$fechafin) {$laetfecha="el ".$fechaini; $etfin=utf8_decode(" en fecha y hora señalada.");}
		
		$pdf->MultiCell(0,8,utf8_decode('Por medio de la presente, le informó a usted que ha sido comisionado para la siguiente actividad: "').utf8_decode($data[0]["COMI_ACTIVIDAD"]).
		utf8_decode('", la cual se llevará a cabo ').$laetfecha.', en horario de '.utf8_decode($data[0]["COMI_HORAINI"]).
				' a '.$data[0]["COMI_HORAFIN"].', favor de presentarse en '.utf8_decode($data[0]["COMI_LUGAR"]).$etfin,0,'J', false);
		$pdf->Ln(5);
		$pdf->Ln(5);
		$pdf->MultiCell(0,8,utf8_decode('Sin más por el momento aprovecho para enviarle un cordial saludo.'),0,'J', false);
		
		$pdf->eljefe=$data[0]["COMI_AUTORIZOABREVIA"]." ".$data[0]["COMI_AUTORIZOD"];
		$pdf->eljefepsto=$data[0]["COMI_AUTORIZOFIRMAOF"];
	
		$dataProf = $pdf->LoadProf($data[0]["COMI_PROFESOR"]);
			
		if ($_GET["tipo"]=='0') { $pdf->Output(); }
		
		if ($_GET["tipo"]=='2') {
			$doc = $pdf->Output('', 'S');
			?>
		       <html lang="en">
	               <head>
						<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
						<meta charset="utf-8" />
						<link rel="icon" type="image/gif" href="imagenes/login/sigea.ico">
						<title>Sistema de Gesti&oacute;n Escolar-Administrativa</title>
						<meta name="description" content="User login page" />
						<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
						<link rel="stylesheet" href="../../assets/css/bootstrap.min.css" />
						<link rel="stylesheet" href="../../assets/font-awesome/4.5.0/css/font-awesome.min.css" />
						<link rel="stylesheet" href="../../assets/css/select2.min.css" />
						<link rel="stylesheet" href="../../assets/css/fonts.googleapis.com.css" />
					    <link rel="stylesheet" href="../../assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
						<link rel="stylesheet" href="../../assets/css/ace-rtl.min.css" />		
						<script src="../../assets/js/ace-extra.min.js"></script>		
						<link rel="stylesheet" href="../../assets/css/jquery-ui.min.css" />
	                </head>
	      <?php 
					foreach($dataProf as $rowdes)
					{
						$res=$miutil->enviarCorreo($rowdes[2],utf8_decode('Comisión ').utf8_decode($data[0]["COMI_ID"]),
						utf8_decode('Por medio de la presente se le asigna  la siguiente comisión:  ').utf8_decode($data[0]["COMI_ACTIVIDAD"]).
						utf8_decode('Por medio de la presente se le asigna  la siguiente comisión:  ').utf8_decode($data[0]["COMI_ACTIVIDAD"]).
								', del:  '.utf8_decode($data[0]["COMI_FECHAINI"]).' al:  '.utf8_decode($data[0]["COMI_FECHAFIN"]).
							    ' Lugar: '.utf8_decode($data[0]["COMI_LUGAR"]).
								utf8_decode(' <br/> En adjunto encontrará el Oficio debidamente firmado y sellado. ')
								,$doc);	
						if ($res=="") {echo "<span class=\"label label-success arrowed\">Correo Eviado a: ". $rowdes[1]." ". $rowdes[2]."</span><br/><br/>"; }
						else { echo "<span class=\"label label-danger arrowed-in\">".$res."</span><br/><br/>"; }
						
					}
		}
		if ($_GET["tipo"]=='1') {
			$pdf->Output(); 
		}

		*/
 } else {header("Location: index.php");}
 
 ?>
