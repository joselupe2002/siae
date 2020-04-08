
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
   	        
   	
   	function verificaOficio($depto){
   		        $fecha_actual=date("d/m/Y");
   		        $anio=date("Y");
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT count(*) as N from contoficios where CONT_TIPO='PREFECTURA' and CONT_CONTROL=".$_GET["ID"]);
            	foreach ($resultado as $row) {$hay=$row["N"];}
            	if ($hay==0) {
            		$numofi="NO HAY CONSECUTIVO";
            		$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT CONS_NUMERO, CONS_PRE from pconsoficios where CONS_URES='".$depto."' and CONS_ANIO='".$anio."'");
            		foreach ($resultado as $row) {$ofisolo=$row["CONS_NUMERO"]; $numofi=$row["CONS_PRE"]."-".$row["CONS_NUMERO"]."/".$anio;}
            		$res=$miConex->afectaSQL($_SESSION['bd'],"UPDATE pconsoficios set CONS_NUMERO=CONS_NUMERO+1 where CONS_URES='".$depto."'");
            		
            		if (!($numofi=="NO HAY CONSECUTIVO")){
            		        $res=$miConex->afectaSQL($_SESSION['bd'],"INSERT INTO contoficios (CONT_TIPO,CONT_NUMOFI,CONT_FECHA, CONT_CONTROL,".
            				"CONT_USUARIO,_INSTITUCION,_CAMPUS,CONT_SOLO) values ('PREFECTURA','".$numofi."','".$fecha_actual."','".$_GET["ID"]."',".
            				                              "'".$_SESSION['usuario']."','".$_SESSION['INSTITUCION']."','".$_SESSION['CAMPUS']."','".$ofisolo."');");                       	            		
            		    }
            		$data[0]["CONT_FECHA"]=$fecha_actual;
            		$data[0]["CONT_NUMOFI"]=$numofi;
            	}
            	else {
            		
            		$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from contoficios where CONT_TIPO='PREFECTURA' and CONT_CONTROL=".$_GET["ID"]);
            		foreach ($resultado as $row) {$data[] = $row;}
            	}
            	
            	return $data;
            		
            }
   	
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT * from vdprefectura where ID=".$_GET["ID"]);				
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
		$fechadec=$miutil->formatFecha($data[0]["FECHA"]);
		$fecha=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));
		
		
				
		$dataGen = $pdf->LoadDatosGen();
		
		$dataof=$pdf->verificaOficio($data[0]["DEPTO"]);
		$fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
		$fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
		
		
		$rechum=$miutil->getJefe('402');
		$subdir=$miutil->getJefe('304');
		
		

		$pdf->SetFont('Montserrat-Medium','',9);
		$pdf->Ln(10);
		$pdf->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');	
		$pdf->Ln(5);
		$pdf->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
		$pdf->SetFont('Montserrat-ExtraBold','B',9);
		$pdf->Ln(20);
		$pdf->Cell(0,0,utf8_decode($rechum),0,1,'L');
		$pdf->Ln(5);
		$pdf->Cell(0,0,'DEPARTAMENTO DE RECURSOS HUMANOS',0,1,'L');
		$pdf->Ln(10);
		
		
		
		
		$pdf->SetFont('Montserrat-SemiBold','',10);
		$pdf->MultiCell(0,8,'Por medio de la presente, solicitó a usted de la manera más atenta emitir un exhorto para el docente: '.utf8_decode($data[0]["PROFESORD"]).
				', ya que en la supervisión del '.$fecha.', no se encontró en su salón de clases. Asignatura: '.utf8_decode($data[0]["MATERIAD"]).
				' Horario: '.$data[0]["HORARIO"].' Aula: '.$data[0]["AULA"],0,'J', false);
		$pdf->Ln(5);
		$pdf->MultiCell(0,8,'Agradeceré se envie copia del exhorto a esta jefatura de división.',0,'J', false);
		$pdf->Ln(5);
		$pdf->MultiCell(0,8,'Sin más por el momento aprovecho para enviarle un cordial saludo.',0,'J', false);
		$pdf->Ln(40);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,'A T E N T A M E N T E',0,1,'L');
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraLight','I',8);
		$pdf->Cell(0,0,'Excelencia en Educación Tecnológica',0,1,'L');
		$pdf->Ln(10);
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,0,utf8_decode($data[0]["JEFED"]),0,1,'L');
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode($data[0]["FIRMAOF"]),0,1,'L');
		$pdf->Ln(55);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->setX(25);$pdf->setY(240);
		$pdf->Cell(0,0,utf8_decode($subdir)."; Subdirección académica.",0,1,'L');
		
	
			
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
