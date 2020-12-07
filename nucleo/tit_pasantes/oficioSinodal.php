
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

            
                $nombre=$miutil->getJefe('303');//Nombre del puesto DECONTRL ESCOLAR
                $this->SetFont('Montserrat-ExtraBold','B',11);

                $this->setY(-70);
                $this->Cell(0,5,"Atentamente",0,1,'L');
                $this->setY(-65);
                $this->SetFont('Montserrat-ExtraLight','I',11);
                $this->Cell(0,5,"Habilidad, Actitud, Conocimiento",0,1,'L');

                $this->setY(-50);
                $this->SetFont('Montserrat-ExtraBold','I',11);
                $this->Cell(0,5,utf8_decode($this->eljefe),0,1,'L');
                $this->setY(-45);
                $this->SetFont('Montserrat-ExtraBold','I',11);
                $this->Cell(0,5,utf8_decode($this->eljefepsto),0,1,'L');

                $this->SetFont('Montserrat-Medium','',8);
                $this->setY(-35);
                $this->Cell(0,5,"c.c.p. Expediente",0,1,'L');
            }
            
            function imprimeOficio($tipo,$clave,$nombre) {
                $this->AddPage();
       
                $dataP = $this->LoadDatosPas();
                $dataGen =$this->LoadDatosGen();
                $dataDep =$this->LoadDepto($dataP[0]["CARRERA"]);
           
                $miutil = new UtilUser();
        
                //si fuera coordinacion de titulacion 
                //$this->eljefe=$miutil->getJefe('701');
                //$this->eljefepsto="COORDINADOR(A) DE TITULACIÓN";
        
                $this->eljefe=$dataP[0]["NOMBREJEFE"];
                $this->eljefepsto=$dataP[0]["FIRMAOF"];
        
                $dataof=$miutil->verificaOficio($dataDep[0]["URES_URES"],"OFICIOSINODAL",$tipo."-".$_GET["alumno"]);
                $fechadecof=$miutil->formatFecha($dataof[0]["CONT_FECHA"]);
                $fechaof=date("d", strtotime($fechadecof))."/".$miutil->getFecha($fechadecof,'MES'). "/".date("Y", strtotime($fechadecof));
                
                $this->SetFont('Montserrat-Medium','',9);
                $this->Cell(0,0,$dataGen[0]["inst_fechaof"].$fechaof,0,1,'R');	
                $this->Ln(5);
                $this->Cell(0,0,'OFICIO No. '.utf8_decode($dataof[0]["CONT_NUMOFI"]),0,1,'R');
                $this->SetFont('Montserrat-ExtraBold','B',11);
                $this->Ln(5);
                
                $this->Cell(0,0,utf8_decode($dataP[0][$nombre]),0,1,'L');
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("DOCENTE"),0,1,'L');
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("PRESENTE"),0,1,'L');
                $this->Ln(10);

                $this->SetFont('Montserrat-Medium','',12);
                $this->MultiCell(0,5,utf8_decode("Por este conducto, tengo a bien comunicarle la asignación de sinodal en calidad de"),0,'J',FALSE);

                $this->Ln(5);
                $this->SetFont('Montserrat-ExtraBold','B',11);
                $this->Cell(0,0,utf8_decode($tipo),0,1,'C');
                $this->SetFont('Montserrat-Medium','',12);

                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("Al examen profesional del C.".$dataP[0]["PASANTE"]),0,1,'L');
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("Con número de control: ".$dataP[0]["MATRICULA"]),0,1,'L');
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("Pasante de la carrera de: ".$dataP[0]["CARRERAD"]),0,1,'L');
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("Para titularse por la opción:  "),0,1,'L');
                $this->Ln(5);
                $this->SetFont('Montserrat-ExtraBold','B',11);
                $this->Cell(0,0,utf8_decode($dataP[0]["OPCIOND"]),0,1,'C');
                $this->SetFont('Montserrat-Medium','',12);
                $this->Ln(5);
                $this->Cell(0,0,utf8_decode("Con el trabajo titulado:"),0,1,'L');
                $this->Ln(5);
                $this->SetFont('Montserrat-ExtraBold','B',11);
                $this->MultiCell(0,5,utf8_decode($dataP[0]["TEMA"]),0,'J',FALSE);
                $this->SetFont('Montserrat-Medium','',12);

                $this->Ln(5);
                $this->SetFont('Montserrat-ExtraBold','B',11);
                $this->MultiCell(0,5,utf8_decode("FECHA: ".$dataP[0]["FECHA_TIT"]),0,'J',FALSE);
                $this->MultiCell(0,5,utf8_decode("HORA: ".$dataP[0]["HORA_TIT"]),0,'J',FALSE);
                $this->MultiCell(0,5,utf8_decode("SALA: ".$dataP[0]["SALA_TIT"]),0,'J',FALSE);
                $this->SetFont('Montserrat-Medium','',12);

                $this->Ln(5);
                $this->MultiCell(0,5,utf8_decode("Del cual se anexa el trabajo profesional."),0,'J',FALSE);
                $this->Ln(5);
                $this->MultiCell(0,5,utf8_decode("Posteriormente se le indicará la fecha, hora y lugar del examen profesional ".                
                "el cual no podrá realizarse sin su presencia, sin otro particular por el momento, le reitero un cordial saludo."),0,'J',FALSE);
                $this->Ln(5);
                $this->MultiCell(0,5,utf8_decode("Agradeciendo de antemano su puntual asistencia, quedo de usted."),0,'J',FALSE);


            }

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
       
        $pdf->imprimeOficio("PRESIDENTE","PRES","PRESIDENTED");
        $pdf->imprimeOficio("SECRETARIO","SEC","SECRETARIOD");
        $pdf->imprimeOficio("VOCAL","VOC","VOCALD");
        $pdf->imprimeOficio("VOCAL SUPLENTE","VOC_S","VOCALSUPLENTED");
       
         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
