
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
				$data=[];
				$miConex = new Conexion();

				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vtit_pasantes where  MATRICULA='".$_GET["alumno"]."'");				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}


			function LoadRequisitos($op)
			{				
				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],"select * from vtit_opcionreq where IDOPCION='".$op."' order by ORDEN");				
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
                //Para que cuando se cambie a la otra pagina empiece a la derecha y la stablas no se descuadren
                $this->SetX(10);
                $this->Ln(5);	
			}
		
			function Footer()
			{	
                
                $miutil = new UtilUser();            
                $miutil->getPie($this,'V');

		
                $this->SetFont('Montserrat-ExtraBold','B',10);
				$this->setY(-40);
				$this->Cell(50,5,"","",0,'C');
				$this->Cell(66,5,"Firma del Solicitante","T",0,'C');
				$this->Cell(50,5,"","",0,'C');
             
			}

			
			
   }
		
  		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,50); 
		$pdf->AddPage();
	
	
		$miutil = new UtilUser();
        $pstotit=$miutil->getJefe('303');//Nombre del puesto de coordinacion de titulacion 


		$data = $pdf->LoadData();
		$dataGen = $pdf->LoadDatosGen();

		
		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("SOLICITUD DE OPCION DE TITULACION"),"",0,'C',false);
		$pdf->Ln(5);
		$pdf->Cell(0,0,utf8_decode("(PLAN OBJETIVOS)"),"",0,'C',false);
		$pdf->Ln(5);

		$pdf->SetFont('Montserrat-ExtraBold','B',10);
		$pdf->Cell(0,5,utf8_decode("DATOS DEL SOLICITANTE"),"LTR",0,'C',false);
		$pdf->Ln(5);		
		$pdf->Cell(55,5,utf8_decode($data[0]["ALUM_NOMBRE"]),"LB",0,'C',false);
		$pdf->Cell(55,5,utf8_decode($data[0]["ALUM_APEPAT"]),"B",0,'C',false);
		$pdf->Cell(56,5,utf8_decode($data[0]["ALUM_APEMAT"]),"BR",0,'C',false);

		$pdf->Ln(5);
		$pdf->Cell(55,5,utf8_decode("Nombre"),"LT",0,'C',false);
		$pdf->Cell(55,5,utf8_decode("Apellido Paterno"),"T",0,'C',false);
		$pdf->Cell(56,5,utf8_decode("Apellido Materno"),"TR",0,'C',false);
		
		$pdf->Ln(3);
		$pdf->Cell(166,5,"","LR",0,'L',false);
		
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraBold','B',8);
		$pdf->Cell(55,5,"Domicilio:","L",0,'L',false);
		$pdf->SetFont('Montserrat-Medium','U',8);
		$pdf->Cell(111,5,utf8_decode($data[0]["DIRECCION"]),"R",0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraBold','',8);
		$pdf->Cell(55,5,utf8_decode("Teléfono, mail:"),"L",0,'L',false);
		$pdf->SetFont('Montserrat-Medium','U',8);
		$pdf->Cell(111,5,utf8_decode($data[0]["TELEFONO"]. " ".$data[0]["CORREO"]),"R",0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraBold','',8);
		$pdf->Cell(166,5,utf8_decode("Institución o empresa donde labora, ubicación y teléfono:"),"LR",0,'L',false);
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-Medium','U',8);
		$pdf->MultiCell(166,5,utf8_decode($data[0]["TRABAJO"]. " ".$data[0]["DIRTRABAJO"]." ".$data[0]["TELTRABAJO"]),"LR",'J',false);
		$pdf->Cell(166,5,"","LR",0,'L',false);

		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-ExtraBold','',8);
		$pdf->Cell(55,5,utf8_decode("Pasante de la carrera de:"),"L",0,'L',false);
		$pdf->SetFont('Montserrat-Medium','U',8);
		$pdf->Cell(111,5,utf8_decode($data[0]["CARRERAD"]),"R",0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-ExtraBold','',8);
		$pdf->Cell(55,5,utf8_decode("Clave de la Carrera:"),"L",0,'L',false);
		$pdf->SetFont('Montserrat-Medium','U',8);
		$pdf->Cell(40,5,utf8_decode($data[0]["MAPA"]),"",0,'L',false);
		$pdf->SetFont('Montserrat-ExtraBold','',8);
		$pdf->Cell(30,5,utf8_decode("No. de Control:"),"",0,'L',false);
		$pdf->SetFont('Montserrat-Medium','U',8);
		$pdf->Cell(41,5,utf8_decode($data[0]["MATRICULA"]),"R",0,'L',false);

		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-ExtraBold','',8);
		$pdf->Cell(55,5,utf8_decode("Terminación de estudios:"),"L",0,'L',false);
		$pdf->SetFont('Montserrat-Medium','U',8);
		$pdf->Cell(111,5,utf8_decode(strtoupper($miutil->getMesLetra($data[0]["MESINI"]). " ".$data[0]["ANIOINI"]). " ".strtoupper($miutil->getMesLetra($data[0]["MESFIN"]). 
		" A ".$data[0]["ANIOFIN"])),"R",0,'L',false);
		
		$pdf->Ln(3);
		$pdf->Cell(166,5,"","LR",0,'L',false);
		
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-ExtraBold','',8);
		$pdf->Cell(166,3,utf8_decode("OPCIÓN SOLICITADA"),"LR",0,'C',false);
		
		$pdf->Ln(3);
		$pdf->Cell(166,5,"","LR",0,'L',false);
		
		$parte1=false;
		$cadop="  "; if ($data[0]["ID_OPCION"]=="1") {$cadop="X"; $parte1=true;}
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"L",0,'L',false);
		$pdf->Cell(156,5,utf8_decode("I TESIS PROFESIONAL"),"R",0,'L',false);

		$cadop="  "; if ($data[0]["ID_OPCION"]=="2") {$cadop="X"; $parte1=true;}
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"L",0,'L',false);
		$pdf->Cell(156,5,utf8_decode("II ELABORACIÓN DE LIBROS DE TEXTO O PROTOTIPOS DIDÁCTICO."),"R",0,'L',false);

		$cadop="  "; if ($data[0]["ID_OPCION"]=="3") {$cadop="X"; $parte1=true;}
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"L",0,'L',false);
		$pdf->Cell(156,5,utf8_decode("III PROYECTO DE INVESTIGACIÓN"),"R",0,'L',false);

		$cadop="  "; if ($data[0]["ID_OPCION"]=="4") {$cadop="X"; $parte1=true;}
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"L",0,'L',false);
		$pdf->Cell(156,5,utf8_decode("IV DISEÑO O REDISEÑO DE EQUIPO, APARATO O MAQUINARIA"),"R",0,'L',false);

		$cadop="  "; if ($data[0]["ID_OPCION"]=="7") {$cadop="X"; $parte1=true;}
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"L",0,'L',false);
		$pdf->Cell(156,5,utf8_decode("VII MEMORIA DE EXPERIENCIA PROFESIONAL"),"R",0,'L',false);

		if ($parte1) {
				$pdf->Ln(5);
				$pdf->SetFont('Montserrat-ExtraBold','',8);
				$pdf->Cell(55,5,utf8_decode("NOMBRE TENTATIVO DEL TEMA:"),"L",0,'L',false);
				$pdf->SetFont('Montserrat-Medium','U',8);
				$pdf->MultiCell(111,3,utf8_decode($data[0]["TEMA"]),"R",'J',false);
				$pdf->SetFont('Montserrat-Medium','',8);
				$pdf->Ln(3);				
				$pdf->Cell(166,5,utf8_decode("ANEXAR A LA PRESENTE: OBJETIVO, INTRODUCCIÓN, INDICE Y BIBLIOGRAFÍA DEL TEMA PROPUESTO."),"LR",0,'L',false);
				$pdf->Ln(3);				
				$pdf->Cell(166,5,utf8_decode("Presentar Constancia de Participación en el proyecto."),"LR",0,'L',false);
				$pdf->Ln(3);				
				$pdf->Cell(166,5,utf8_decode("Presentar Constancia Laboral como profesionista (mínimo 2 años) que mencione las aportaciones personales"),"LR",0,'L',false);
				$pdf->Ln(3);				
				$pdf->Cell(166,5,utf8_decode("realizada a la empresa en cuestión"),"LR",0,'L',false);

		}
		$pdf->Ln(3);
		$pdf->Cell(166,5,"","LRB",0,'L',false);


		$pdf->Ln(3); $sec5="Nombre del curso"; 
		$cadop="  "; if ($data[0]["ID_OPCION"]=="5") {$cadop="X"; $parte1=true;  $sec5=$data[0]["TEMA"]; }
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"LT",0,'L',false);
		$pdf->Cell(63,5,utf8_decode("V. CURSO DE TITULACIÓN"),"RT",0,'L',false);

		$cadop="  "; $sec6="Área solicitada";  if ($data[0]["ID_OPCION"]=="6") {$cadop="X"; $parte1=true; $sec6=$data[0]["TEMA"];}
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"LT",0,'L',false);
		$pdf->Cell(83,5,utf8_decode("VI. EXAMEN GLOBAL POR AREA DE CONOCIMIENTOS"),"RT",0,'L',false);
		
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',6);
		$pdf->Cell(73,5,utf8_decode($sec5),"LR",0,'C',false);	
		$pdf->Cell(93,5,utf8_decode($sec6),"LR",0,'C',false);	
		$pdf->Ln(1);
		$pdf->Cell(73,5,"","LRB",0,'L',false); $pdf->Cell(93,5,"","LRB",0,'L',false);


		$pdf->Ln(); 
		$cadop="  "; if ($data[0]["ID_OPCION"]=="8") {$cadop="X"; $parte1=true; }
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"LT",0,'L',false);
		$pdf->Cell(63,5,utf8_decode("VIII. ESCOLARIDAD POR PROMEDIO "),"RT",0,'L',false);

		$cadop="  "; if ($data[0]["ID_OPCION"]=="9") {$cadop="X"; $parte1=true;}
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"LT",0,'L',false);
		$pdf->Cell(83,5,utf8_decode("IX. ESCOLARIDAD POR EST.  DE POSGRADO  "),"RT",0,'L',false);
		
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',6);
		$pdf->Cell(73,5,utf8_decode("Anexar original y 2 copias de la constancia de promedio válido"),"LR",0,'C',false);	
		$pdf->Cell(93,5,utf8_decode("Anexar original y 2 copias de constancia con calificaciones y créditos mismos"),"LR",0,'C',false);	
		$pdf->Ln(3);

		$pdf->Cell(73,5,utf8_decode("para titulación, 2 copias del Kardex y 2 copias del certificado."),"LR",0,'C',false);	
		$pdf->Cell(93,5,utf8_decode("que deberá mencionar el registro ante la Dirección Gral. De Profesiones y "),"LR",0,'C',false);	
		$pdf->Ln(3);

		$pdf->Cell(73,5,utf8_decode(""),"LR",0,'C',false);	
		$pdf->Cell(93,5,utf8_decode("también original y 2 copias del plan de Estudios. "),"LR",0,'C',false);	

		$pdf->Ln(1);
		$pdf->Cell(73,5,"","LRB",0,'L',false); $pdf->Cell(93,5,"","LRB",0,'L',false);

		
		$pdf->Ln(); 
		$cadop="  "; if ($data[0]["ID_OPCION"]=="10") {$cadop="X";}
		$pdf->Ln(3);
		$pdf->SetFont('Montserrat-Medium','',8);
		$pdf->Cell(10,5,utf8_decode("( ".$cadop." )"),"LT",0,'L',false);
		$pdf->Cell(156,5,utf8_decode("X. MEMORIA DE RESIDENCIA PROFESIONAL "),"RT",0,'L',false);

		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-Medium','',6);
		$pdf->MultiCell(166,3,utf8_decode("Anexar original y copia de la constancia de Anuencia firmada por el asesor externo en papel membretado de la Institución o Empresa donde se realizó la Residencia Prof. 4 copias del informe de la Residencia Prof. Debidamente engargolado. 1 copia legible de las generalidades del proyecto de Residencia Prof. Con broche."),"LR",'J',false);

		$pdf->Ln(0);
		$pdf->Cell(166,3,"","LRB",0,'L',false);

		$pdf->SetFont('Montserrat-Medium','',10);
		$fechadec=$miutil->formatFecha($data[0]["FECHA_REG"]);
		$fecha=date("d", strtotime($fechadec))." de ".$miutil->getFecha($fechadec,'MES'). " del ".date("Y", strtotime($fechadec));

		$pdf->Ln(10);
		$pdf->Cell(0,0,utf8_decode($dataGen[0]["inst_fechaof"]." a ".$fecha),"",0,'R',false);
		
/*
		$pdf->Ln(5);
		$pdf->SetFont('Montserrat-Medium','B',8);
		$pdf->setX(70);
		$pdf->Cell(80,3,utf8_decode($data[0]["PASANTE"]),"T",1,'C',false);
		$pdf->setX(70);
		$pdf->Cell(80,3,utf8_decode("Firma del Solicitante"),"",1,'C',false);
		*/

						
		$pdf->Output();

 } else {header("Location: index.php");}
 
 ?>
