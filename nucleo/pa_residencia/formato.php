
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
   	       
   	       function getDatosPersona($num){   		       
            	$miConex = new Conexion();  
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
            			"EMPL_FOTO, EMPL_DEPTOD, EMPL_JEFEABREVIA,EMPL_JEFE, EMPL_JEFED, EMPL_RFC, EMPL_CURP, EMPL_NUMERO, EMPL_FECING ".
            			" FROM vempleados WHERE EMPL_NUMERO= '".$num."'" );
                foreach ($resultado as $row) {$data[] = $row;}            
            	return $data;            		
            }
            
            
            function getJefeCarrera($carr){
            	$miConex = new Conexion();
            	$resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT EMPL_NOMBREC, EMPL_ULTIGRAD, EMPL_EGRESADODED, ".
            			"EMPL_FOTO, EMPL_DEPTOD, EMPL_JEFEABREVIA,EMPL_JEFE, EMPL_JEFED, EMPL_RFC, EMPL_CURP, EMPL_NUMERO, EMPL_FECING ".
            			" FROM vempleados WHERE EMPL_NUMERO IN (SELECT URES_JEFE FROM fures WHERE CARRERA='".$carr."')");
            	foreach ($resultado as $row) {$data[] = $row;}
            	return $data;
            }
   	
			function LoadData()
			{				
				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select a.*, concat(b.EMPL_ABREVIA,' ',b.EMPL_NOMBRE,' ',b.EMPL_APEPAT,' ',b.EMPL_APEMAT) AS ASESORD".
				" from rescapproy a left outer join pempleados b on (ASESOR=EMPL_NUMERO) where  ID=".$_GET["id"]);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}


			function LoadDataAlum($matricula)
			{				
				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select a.*, b.*, c.*, getPeriodos(ALUM_MATRICULA,getciclo())". 
				" as PERIODOS from falumnos a, ccarreras b LEFT OUTER JOIN pempleados c on (c.EMPL_NUMERO=CARR_JEFE) where ".
				" ALUM_MATRICULA='".$matricula."' AND ALUM_CARRERAREG=CARR_CLAVE");				
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
				$this->Cell(90,3,utf8_decode("FORMATO PARA SOLICITUD Y"),"TRL",0,'C',false);
				$this->Cell(40,18,"",1,0,'L',false); //GENERA EL TERCER CUADRO
				
				$this->SetY(23);$this->SetX(65);
				$this->Cell(90,3,utf8_decode("ANTEPROYECTO DE RESIDENCIA"),"LR",0,'C',false);

				$this->SetY(26);$this->SetX(65);
				$this->Cell(90,3,utf8_decode("PROFESIONAL"),"B",0,'C',false);

				$this->SetY(29);$this->SetX(65);
				$this->SetFillColor(242,242,242);
				$this->Cell(90,9,utf8_decode("(P-ACA-01-F-01)"),1,0,'C',true);

				$this->Image('../../imagenes/empresa/pie1.png',28,22,30,15);
				
				$this->SetFont('Times','',9);
				$this->SetY(23);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("PÁG. ".$this->PageNo()." DE 2"),"",0,'C',false);
				$this->SetY(26);$this->SetX(155);
				$this->Cell(40,3,utf8_decode("REVISIÓN NO. 03"),"B",0,'C',false);
				$this->SetY(29);$this->SetX(155);
				$this->Cell(40,3,"VIGENCIA A PARTIR DEL","",0,'C',false);
				$this->SetY(32);$this->SetX(155);
				$this->Cell(40,3,"18 DE ENERO 2021","",0,'C',false);
				$this->SetY(35);$this->SetX(155);
				$this->Cell(40,3,"VERSION 2015","BR",0,'C',false);
				
			}
		
			
			
   }
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Times','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,25); 
		$pdf->AddPage();
		
		
		$pdf->SetY(50);
		
		$pdf->SetFont('Times','',11);

		$data = $pdf->LoadData();
		$pdf->SetFont('Times','',10);
		$pdf->SetWidths(array(60, 115));
		$pdf->Row(array(utf8_decode("NOMBRE DEL PROYECTO"),utf8_decode($data[0]["PROYECTO"])));

		$pdf->Ln(10);
		$pdf->SetWidths(array(40,47,20,47,21));
		$pdf->Row(array(utf8_decode("PERIODO PROYECTADO"),utf8_decode("FECHA DE INICIO:"),utf8_decode($data[0]["INICIA"]),
		                utf8_decode("FECHA DE TERMINO:"),utf8_decode($data[0]["TERMINA"])));

		$pdf->Ln(10);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(0,0,utf8_decode("DATOS DE LA EMPRESA"),"",0,'L',false);
		$pdf->Ln(5);
		$pdf->SetFont('Times','',10);
		$pdf->SetWidths(array(30,145));
		$pdf->Row(array(utf8_decode("Nombre de la Empresa:"),utf8_decode($data[0]["EMPRESA"])));

		$pdf->SetWidths(array(30,145));
		$pdf->Row(array(utf8_decode("Departamento o Sección:"),utf8_decode($data[0]["DEPARTAMENTO"])));

		$pdf->SetWidths(array(30,95,15,35));

		$ind=" "; $ser=" "; $ot="X"; if ($data[0]["GIRO"]=="1") {$ind="X"; $ot=" ";}  if ($data[0]["GIRO"]=="2") {$ser="X"; $ot=" ";} 
		$pub=" "; $priv=" "; if ($data[0]["SECTOR"]=="1") {$pub="X"; }  if ($data[0]["SECTOR"]=="2") {$priv="X"; } 
		$pdf->Row(array(utf8_decode("Giro Ramo o Sector:"),
						utf8_decode("Industrial (".$ind.")      Servicio (".$ser.")      Otro (".$ot.")\n".
					                "Público    (".$pub.")      Privado  (".$priv.")"),
		"R.F.C.",utf8_decode($data[0]["RFC"])));

		$pdf->SetWidths(array(30,145));
		$pdf->Row(array(utf8_decode("Domicilio:"),utf8_decode($data[0]["DOMICILIO"])));

		$pdf->SetWidths(array(30,50,50,45));
		$pdf->Row(array(utf8_decode("Código Postal:"),utf8_decode($data[0]["CP"]),utf8_decode("Teléfono Fijo:"),utf8_decode($data[0]["TELEFONO"])));

		$pdf->SetWidths(array(30,145));
		$pdf->Row(array(utf8_decode("Misión de la Empresa:"),utf8_decode($data[0]["MISION"])));


		$pdf->SetWidths(array(40,70,15,50));
		$pdf->Row(array(utf8_decode("Nombre del Titular de la Empresa:"),utf8_decode($data[0]["TITULAR"]),utf8_decode("Puesto:"),utf8_decode($data[0]["PSTOTITULAR"])));

		$pdf->SetWidths(array(40,70,15,50));
		$pdf->Row(array(utf8_decode("Nombre del Asesor Externo:"),utf8_decode($data[0]["ASESOREX"]),
		                utf8_decode("Puesto:\nCorreo:"),utf8_decode($data[0]["PSTOASESOREX"]."\n".$data[0]["CORREOASESOREX"])));

		$pdf->Row(array(utf8_decode("Nombre de la persona que firmará el acuerdo de trabajo. Alumno- Escuela-Empresa:"),utf8_decode($data[0]["FIRMA"]),
		                utf8_decode("Puesto:\nCorreo:"),utf8_decode($data[0]["PSTOFIRMA"]."\n".$data[0]["CORREOFIRMA"])));

		$pdf->SetWidths(array(80,95));
		$pdf->Row(array(utf8_decode("Horario Establecido para la Residencia:"),utf8_decode($data[0]["HORARIO"])));

		$pdf->AddPage();

		$dataAlum = $pdf->LoadDataAlum($data[0]["MATRICULA"]);
		$pdf->Ln(10);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(0,0,utf8_decode("DATOS DEL ALUMNO RESIDENTE"),"",0,'L',false);
		$pdf->Ln(5);
		$pdf->SetFont('Times','',10);
		$pdf->SetWidths(array(30,145));
		$pdf->Row(array(utf8_decode("Nombre:"),utf8_decode($dataAlum[0]["ALUM_NOMBRE"]." ".$dataAlum[0]["ALUM_APEPAT"]." ".$dataAlum[0]["ALUM_APEMAT"])));

		$pdf->SetWidths(array(30,50,30,10,30,25));
		$pdf->Row(array(utf8_decode("Carrera:"),utf8_decode($dataAlum[0]["CARR_DESCRIP"]),
						utf8_decode("Semestre:"),utf8_decode($dataAlum[0]["PERIODOS"]),
						utf8_decode("No. Control:"),utf8_decode($dataAlum[0]["ALUM_MATRICULA"])));
		
		$pdf->SetWidths(array(30,145));
		$pdf->Row(array(utf8_decode("Domicilio:"),utf8_decode($dataAlum[0]["ALUM_DIRECCION"])));

		$pdf->SetWidths(array(30,65,30,50));
		$pdf->Row(array(utf8_decode("E-mail:"),utf8_decode($dataAlum[0]["ALUM_CORREOINS"]),
						utf8_decode("No. de Servicio Médico:"),utf8_decode($dataAlum[0]["ALUM_SEGUROORD"])));
		
		$pdf->SetWidths(array(30,65,30,50));
		$pdf->Row(array(utf8_decode("Ciudad:"),utf8_decode($dataAlum[0]["ALUM_CIUDAD"]),
						utf8_decode("No. Celular:"),utf8_decode($dataAlum[0]["ALUM_TELEFONO"])));
		
		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(0,0,utf8_decode("CONTENIDO DEL ANTEPROYECTO DESARROLLADO (ANEXO A ESTE DOCUMENTO):"),"",0,'L',false);
		$pdf->Ln(5);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(0,0,utf8_decode("a) Nombre y objetivo del proyecto."),"",1,'L',false);	
		$pdf->Ln(5);	
		$pdf->Cell(0,0,utf8_decode("b) Delimitación."),"",1,'L',false);
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("c) Objetivos."),"",1,'L',false);
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("d) Justificación."),"",1,'L',false);
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("e) Cronograma preliminar de actividades. "),"",1,'L',false);
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("f) Descripción detallada de las actividades."),"",1,'L',false);
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("g) Lugar donde se realizará el proyecto. "),"",1,'L',false);
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("h) Información sobre la empresa, organismo o dependencia para la que se desarrollará el proyecto."),"",1,'L',false);
		$pdf->Ln(5);
		$pdf->SetFont('Times','B',10);
		$pdf->Cell(0,0,utf8_decode("DOCUMENTACION A ENTREGAR (Esta sección será llenada por el personal del ITSM)"),"",0,'L',false);
		$pdf->Ln(5);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(10,5,utf8_decode("No."),"LTR",0,'C',false);$pdf->Cell(125,5,utf8_decode("DOCUMENTO"),"LRT",0,'C',false);$pdf->Cell(40,5,utf8_decode("ENTREGADO"),1,1,'C',false);
		$pdf->Cell(10,5,"","LRB",0,'L',false);$pdf->Cell(125,5,"","LRB",0,'L',false);$pdf->Cell(20,5,utf8_decode("SI"),1,0,'C',false);$pdf->Cell(20,5,utf8_decode("NO"),1,1,'C',false);
		$pdf->Cell(10,5,"1","LRB",0,'L',false);$pdf->Cell(125,5,utf8_decode("CARTA DE PRESENTACIÓN FIRMADA POR LA EMPRESA"),"LRB",0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,1,'L',false);
		$pdf->Cell(10,5,"2","LRB",0,'L',false);$pdf->Cell(125,5,utf8_decode("CARTA DE ACEPTACION"),"LRB",0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,1,'L',false);
		$pdf->Cell(10,5,"3","LRB",0,'L',false);$pdf->Cell(125,5,utf8_decode("KARDEX CON PORCENTAJE DE AVANCE	"),"LRB",0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,1,'L',false);
		$pdf->Cell(10,5,"4","LRB",0,'L',false);$pdf->Cell(125,5,utf8_decode("LIBERACION DEL SERVICIO SOCIAL (DOCTO. OFICIAL)"),"LRB",0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,1,'L',false);
		$pdf->Cell(10,5,"5","LRB",0,'L',false);$pdf->Cell(125,5,utf8_decode("AFILIACION VIGENTE DE SERVICIO MEDICO"),"LRB",0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,1,'L',false);
		$pdf->Cell(10,5,"6","LRB",0,'L',false);$pdf->Cell(125,5,utf8_decode("SOLICITUD DE RESIDENCIA PROFESIONAL	"),"LRB",0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,1,'L',false);
		$pdf->Cell(10,5,"7","LRB",0,'L',false);$pdf->Cell(125,5,utf8_decode("ANTEPROYECTO COMPLETO, VALIDADO POR ACADEMIA"),"LRB",0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,0,'L',false);$pdf->Cell(20,5,utf8_decode(""),1,1,'L',false);
	
		$pdf->Ln(5);
		$pdf->SetFont('Times','',10);
		$pdf->Cell(175,5,utf8_decode("Alumno"),"",1,'C',false);
		$pdf->Cell(50,5,"","",0,'C',false); $pdf->Cell(75,5,utf8_decode($dataAlum[0]["ALUM_NOMBRE"]." ".$dataAlum[0]["ALUM_APEPAT"]." ".$dataAlum[0]["ALUM_APEMAT"]),"T",0,'C',false);$pdf->Cell(50,5,"","",1,'C',false); 

		$pdf->Ln(5);
		$elJefe=$dataAlum[0]["EMPL_ABREVIA"]." ".$dataAlum[0]["EMPL_NOMBRE"]." ".$dataAlum[0]["EMPL_APEPAT"]." ".$dataAlum[0]["EMPL_APEMAT"];
		$pdf->Cell(85,5,"Autoriza","",0,'C',false); $pdf->Cell(15,5,"","",0,'C',false);$pdf->Cell(85,5,"Valida","",1,'C',false); 
		$pdf->Cell(85,5,$elJefe,"T","0",'C',false); $pdf->Cell(15,5,"","",0,'C',false);$pdf->Cell(85,5,utf8_decode($data[0]["ASESORD"]),"T",1,'C',false); 

		$miutil = new UtilUser();
        $subacad=$miutil->getJefe('304');//Nombre del puesto de Recursos Humanos
		
		
		$pdf->Ln(5);		
		$pdf->Cell(175,5,utf8_decode("Vo. Bo."),"",1,'C',false);
		$pdf->Cell(50,5,"","",0,'C',false); $pdf->Cell(75,5,utf8_decode($subacad),"T",0,'C',false);$pdf->Cell(50,5,"","",1,'C',false); 
		$pdf->Cell(50,5,"","",0,'C',false); $pdf->Cell(75,5,utf8_decode("Nombre y Firma (Subdirector(a) Académico)"),"",0,'C',false);$pdf->Cell(50,5,"","",1,'C',false); 


		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
