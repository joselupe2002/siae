
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
       
        
        function parseVar($key='',$value='') {
            if(empty($key) or empty($value)) return;
            $nb = $this->page;
            for($n=1;$n<=$nb;$n++) {
               $this->pages[$n] = str_replace($key,$value,$this->pages[$n]);
            }
         }

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
                $h=4*$nb;
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

/*===================================================================================================================*/
   	        var $eljefe="";
   	        var $eljefepsto="";
 
   	
		
        
            function LoadDatosPas()
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select * FROM vtit_pasantes WHERE MATRICULA='".$_GET["alumno"]."'";
              // echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function LoadDepto($carrera)
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select * FROM fures WHERE CARRERA='".$carrera."'";
              // echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

			function LoadDatosGen()
			{
                $data=[];	
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
                $nombre=$miutil->getJefe('303');//Nombre del puesto de Recursos Humanos
                $miutil->getPie($this,'V');

            }
            


            function protesta() {
                $this->AddPage();       
                $dataP = $this->LoadDatosPas();
                $dataGen =$this->LoadDatosGen();           
                $miutil = new UtilUser();
                $this->eljefe=$dataP[0]["NOMBREJEFE"];
                $this->eljefepsto=$dataP[0]["FIRMAOF"];
                $fechadec=$miutil->formatFecha($dataP[0]["FECHA_TIT"]);
                $eldia=date("d", strtotime($fechadec));
                $elmes=strtoupper($miutil->getFecha($fechadec,'MES'));
                $elanio=date("Y", strtotime($fechadec));
                 
                $this->SetFont('Montserrat-ExtraBold','B',16);
                $this->Ln(10);
                $this->Cell(0,0,utf8_decode($dataGen[0]["inst_razon"]),0,1,'C');
                $this->Ln(10);
                $this->Cell(0,0,utf8_decode("PROTESTA DE LEY"),0,1,'C');
                $this->Ln(10);
                
                $this->MultiCell(0,8,utf8_decode("¡Protesta Usted ejercer la profesión con absoluto respeto a las normas establecidas por la Constitución Política de los Estados Unidos Mexicanos y la Ley Reglamentaria del Artículo 5° Constitucional, así como su reglamento respectivo con la responsabilidad y decisión que ella requiere, con respeto, dignidad y la ética profesional que de usted espera el pueblo de México y el Instituto Tecnológico Superior de Macuspana que hoy le otorga el título de:")
                ,0,'J',FALSE);

                $this->Ln(15);
                $this->Cell(0,0,utf8_decode($dataP[0]["CARRERAD"]),0,1,'C');

                $this->Ln(15);
                $this->Cell(0,0,utf8_decode("¡Si protesto!"),0,1,'C');

                $this->Ln(15);
                $this->MultiCell(0,8,utf8_decode("Que sea su propia conciencia y sociedad a la que va a servir quien vigile el cumplimiento de esta protesta.")
                ,0,'J',FALSE);

                $this->Ln(15);
                $this->Cell(0,0,utf8_decode($dataGen[0]["inst_fechaof"]." a ".$eldia." de ".$elmes. " de ". $elanio),0,1,'R');
                

            }

            function protocolo() {
                $this->AddPage();       
                $dataP = $this->LoadDatosPas();
                $dataGen =$this->LoadDatosGen();           
                $miutil = new UtilUser();
                $this->eljefe=$dataP[0]["NOMBREJEFE"];
                $this->eljefepsto=$dataP[0]["FIRMAOF"];
                $fechadec=$miutil->formatFecha($dataP[0]["FECHA_TIT"]);
                $eldia=date("d", strtotime($fechadec));
                $elmes=strtoupper($miutil->getFecha($fechadec,'MES'));
                $elanio=date("Y", strtotime($fechadec));
                 
                $this->SetFont('Montserrat-ExtraBold','B',16);
                $this->Ln(10);
                $this->Cell(0,0,utf8_decode($dataGen[0]["inst_razon"]),0,1,'C');
                $this->Ln(10);

                $this->MultiCell(0,8,utf8_decode("PROTOCOLO QUE DEBE SEGUIRSE PARA APLICAR UN EXAMEN PROFESIONAL")
                ,0,'J',FALSE);                
                $this->Ln(10);

                $this->SetFont('Montserrat-Medium','B',12);
                $this->MultiCell(0,8,utf8_decode("PRESIDENTE: SE SOLICITA A TODAS LAS PERSONAS PRESENTES, PONERSE DE PIE.")
                ,0,'J',FALSE);   
                $this->Ln(20);
           
            
                $this->MultiCell(0,8,utf8_decode("CON LA AUTORIDAD QUE NOS CONCEDE EL REGLAMENTO DEL TECNOLOGICO NACIONAL DE MEXICO, Y DE ACUERDO CON LO PREESCRITO POR LA SECRETARIA DE EDUCACIÓN PÚBLICA, CELEBRAMOS EL EXAMEN PROFESIONAL DEL (LA) C.")
                ,0,'J',FALSE);   

                $this->Ln(10);
                $this->MultiCell(0,8,utf8_decode("SIENDO LAS ".$dataP[0]["HORA_TIT"]." HRS. DEL DÍA ".$eldia." de ".$elmes." del ".$elanio)
                ,0,'R',FALSE);   

                $this->Ln(10);
                $this->MultiCell(0,8,utf8_decode("AGRADECEMOS A LA CONCURRENCIA GUARDAR SILENCIO")
                ,0,'C',FALSE);   

                $this->Ln(10);
                $this->MultiCell(0,8,utf8_decode("MUCHAS GRACIAS")
                ,0,'C',FALSE);  

            }


            function lista() {
                $this->AddPage();       
                $dataP = $this->LoadDatosPas();
                $dataGen =$this->LoadDatosGen();           
                $miutil = new UtilUser();
                $this->eljefe=$dataP[0]["NOMBREJEFE"];
                $this->eljefepsto=$dataP[0]["FIRMAOF"];
                $fechadec=$miutil->formatFecha($dataP[0]["FECHA_TIT"]);
                $eldia=date("d", strtotime($fechadec));
                $elmes=strtoupper($miutil->getFecha($fechadec,'MES'));
                $elanio=date("Y", strtotime($fechadec));
                 
                $this->SetFont('Montserrat-ExtraBold','B',14);
                $this->Ln(10);

                $this->MultiCell(0,8,utf8_decode("DIVISION DE ESTUDIOS PROFESIONALES")
                ,0,'C',FALSE);                
                $this->MultiCell(0,8,utf8_decode("COORDINACION DE APOYO A LA TITULACIÓN")
                ,0,'C',FALSE);  
                $this->SetFont('Montserrat-ExtraBold','B',10);  
                $this->MultiCell(0,5,utf8_decode("REGISTRO DE PARTICIPACIÓN DE SINODALES EN LOS EXAMENES PROFESIONALES")
                ,0,'C',FALSE); 
                $this->Ln(10); 

                $this->MultiCell(0,8,utf8_decode($dataP[0]["PASANTE"])
                ,0,'C',FALSE); 
                $this->Ln(10); 

      
                $this->SetFont('Montserrat-Medium','B',10);
                $this->Cell(0,0,utf8_decode("CARRERA: ".$dataP[0]["CARRERAD"]),0,1,'L');
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("OPCION: ".$dataP[0]["OPCIOND"]." ".$dataP[0]["PRODUCTOD"]),0,1,'L'); 
                $this->Ln(5);
                
                $this->Cell(0,0,utf8_decode("EGRESADO DEL: ".$dataGen[0]["inst_razon"]),0,1,'L');
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode(strtoupper("FECHA DEL EXAMEN: ".$eldia." DE ".$elmes." DEL ".$elanio)),0,1,'L'); 
                $this->Ln(5);

                $this->SetFont('Montserrat-ExtraBold','B',7);
                $this->Ln(5);
		        $this->Cell(86,5,utf8_decode("SINODALES"),"1",0,'L',false);
		        $this->Cell(40,5,utf8_decode("HORA ASISTENCIA"),"1",0,'L',false);
		        $this->Cell(40,5,utf8_decode("FIRMA"),"1",0,'L',false);
		        $this->Ln(5);

                $this->SetFont('Montserrat-Medium','',8);
                $this->Cell(86,15,utf8_decode($dataP[0]["PRESIDENTED"]),"1",0,'L',FALSE); 
                $this->Cell(40,15,"","1",0,'L',false);
                $this->Cell(40,15,"","1",0,'L',false);
                $this->Ln();

                $this->Cell(86,15,utf8_decode($dataP[0]["SECRETARIOD"]),"1",0,'L',FALSE); 
                $this->Cell(40,15,"","1",0,'L',false);
                $this->Cell(40,15,"","1",0,'L',false);
                $this->Ln();

                $this->Cell(86,15,utf8_decode($dataP[0]["VOCALD"]),"1",0,'L',FALSE); 
                $this->Cell(40,15,"","1",0,'L',false);
                $this->Cell(40,15,"","1",0,'L',false);
                $this->Ln();

                $this->Cell(86,15,utf8_decode($dataP[0]["VOCALSUPLENTED"]),"1",0,'L',FALSE); 
                $this->Cell(40,15,"","1",0,'L',false);
                $this->Cell(40,15,"","1",0,'L',false);
                $this->Ln();
           
                $this->SetFont('Montserrat-ExtraBold','B',10);
                $this->MultiCell(0,8,utf8_decode("OBSERVACIONES: ")
                ,0,'J',FALSE); 
                $this->Ln(5); 
                $this->Cell(166,5,"","T",0,'L',false);
                $this->Ln(5); 
                $this->Cell(166,5,"","T",0,'L',false);
                $this->Ln(5); 
                $this->Cell(166,5,"","T",0,'L',false);

             

            }


            function juramento() {
                $this->AddPage();       
                $dataP = $this->LoadDatosPas();
                $dataGen =$this->LoadDatosGen();           
                $miutil = new UtilUser();
                $this->eljefe=$dataP[0]["NOMBREJEFE"];
                $this->eljefepsto=$dataP[0]["FIRMAOF"];
                $fechadec=$miutil->formatFecha($dataP[0]["FECHA_TIT"]);
                $eldia=date("d", strtotime($fechadec));
                $elmes=$miutil->getFecha($fechadec,'MES');
                $elanio=date("Y", strtotime($fechadec));
                 

                $this->SetFont('Montserrat-ExtraBold','B',14);
                $this->Ln(10);
                $this->Cell(0,0,utf8_decode("JURAMENTO DE ETICA PROFESIONAL"),0,1,'C');
                $this->Ln(10);
                
                $this->SetFont('Montserrat-ExtraBold','B',12);
                $this->MultiCell(0,8,utf8_decode("Como Ingeniero de profesión, dedico mis conocimientos profesionales al progreso y mejoramiento del bienestar humano. Me comprometo: a dar  un rendimiento máximo, a participar tan solo en empresas dignas, a vivir de acuerdo con las leyes propias del hombre y el más elevado nivel de conducta profesional, a preferir el servicio al provecho, el honor y la calidad de la profesión a la ventaja personal, el bien público a toda consideración.")
                ,0,'J',FALSE);

                $this->Ln(5);

                $this->SetFont('Montserrat-Medium','',10);
                $this->Ln(15);
                $this->Cell(0,0,utf8_decode($dataGen[0]["inst_fechaof"]." a ".$eldia." de ".$elmes. " de ". $elanio),0,1,'R');
                
                $this->Ln(15);
                $this->SetFont('Montserrat-ExtraBold','U',12);
                $this->Cell(0,0,utf8_decode($dataP[0]["PASANTE"]),0,1,'C');
                $this->Ln(5);
                $this->SetFont('Montserrat-Medium','',12);
                $this->Cell(0,0,utf8_decode("NOMBRE Y FIRMA"),0,1,'C');

                $this->Ln(15);
                $this->SetFont('Montserrat-ExtraBold','B',14);
                $this->Cell(0,0,utf8_decode("JURADO"),0,1,'C');

                $this->Ln(15);
                $this->SetFont('Montserrat-ExtraBold','U',12);
                $this->Cell(0,0,utf8_decode($dataP[0]["PRESIDENTED"]),0,1,'C');
                $this->Ln(5);
                $this->SetFont('Montserrat-Medium','',10);
                $this->Cell(0,0,utf8_decode("PRESIDENTE"),0,1,'C');
                

                $this->Ln(15);
                $this->SetFont('Montserrat-ExtraBold','U',12);
                $this->setX(20);
                $this->Cell(88,0,utf8_decode($dataP[0]["SECRETARIOD"]),0,0,'C');
                $this->Cell(88,0,utf8_decode($dataP[0]["VOCALD"]),0,0,'C');
                $this->Ln(5);
                $this->setX(20);
                $this->SetFont('Montserrat-Medium','',10);
                $this->Cell(88,0,utf8_decode("SECRETARIO"),0,0,'C');
                $this->Cell(88,0,utf8_decode("VOCAL"),0,0,'C');

            }


            function juramento2() {
                $this->AddPage();       
                $dataP = $this->LoadDatosPas();
                $dataGen =$this->LoadDatosGen();                           
                $miutil = new UtilUser();

                $this->AddFont('brush script mt kursiv','B','brush script mt kursiv.php');
                $this->AddFont('brush script mt kursiv','','brush script mt kursiv.php');
          

                $this->eljefe=$dataP[0]["NOMBREJEFE"];
                $this->eljefepsto=$dataP[0]["FIRMAOF"];
                $fechadec=$miutil->formatFecha($dataP[0]["FECHA_TIT"]);
                $eldia=date("d", strtotime($fechadec));
                $elmes=$miutil->getFecha($fechadec,'MES');
                $elanio=date("Y", strtotime($fechadec));
                 

                $this->SetFont('brush script mt kursiv','B',16);
                $this->Ln(10);
                $this->Cell(0,0,utf8_decode("JURAMENTO DE ETICA PROFESIONAL"),0,1,'C');
                $this->Ln(10);
                
                $this->SetFont('brush script mt kursiv','',16);
                $this->MultiCell(0,8,utf8_decode("Como Ingeniero de profesión, dedico mis conocimientos profesionales al progreso y mejoramiento del bienestar humano. Me comprometo: a dar  un rendimiento máximo, a participar tan solo en empresas dignas, a vivir de acuerdo con las leyes propias del hombre y el más elevado nivel de conducta profesional, a preferir el servicio al provecho, el honor y la calidad de la profesión a la ventaja personal, el bien público a toda consideración.")
                ,0,'J',FALSE);

                $this->Ln(5);

                $this->SetFont('brush script mt kursiv','',16);
                $this->Ln(15);
                $this->Cell(0,0,utf8_decode($dataGen[0]["inst_fechaof"]." a ".$eldia." de ".$elmes. " de ". $elanio),0,1,'R');
                
                $this->Ln(15);
                $this->Cell(0,0,utf8_decode($miutil->convTitulo($dataP[0]["PASANTE"])),0,1,'C');
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("Nombre y Firma"),0,1,'C');

                $this->Ln(15);
                $this->Cell(0,0,utf8_decode("JURADO"),0,1,'C');

                $this->Ln(15);
                $this->Cell(0,0,utf8_decode($miutil->convTitulo($dataP[0]["PRESIDENTED"])),0,1,'C');
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("Presidente"),0,1,'C');
                

                $this->Ln(15);
                $this->setX(20);
                $this->Cell(88,0,utf8_decode($miutil->convTitulo($dataP[0]["SECRETARIOD"])),0,0,'C');
                $this->Cell(88,0,utf8_decode($miutil->convTitulo($dataP[0]["VOCALD"])),0,0,'C');
                $this->Ln(5);
                $this->setX(20);
                $this->Cell(88,0,utf8_decode("Secretario"),0,0,'C');
                $this->Cell(88,0,utf8_decode("Vocal"),0,0,'C');

            }

		}
        
        
        

		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
       
        $miutil = new UtilUser();


        $pdf->protesta();
        $pdf->protocolo();        
        $pdf->lista();
        $pdf->juramento();
        $pdf->juramento2();
        
         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
