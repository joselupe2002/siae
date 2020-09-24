
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
               var $nombre="";
  
      
            function LoadDatosAlumnos($carrera)
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select n.*, getPeriodos(PERSONA,getciclo()) as PERIODO ".
                " from vco_solicitud n where COMITE='".$_GET["id"]."' and  IFNULL(CARRERA,'0')='".$carrera."'";
               //echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function LoadDatosComite()
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select  o.DESCRIP AS COMITED,o.FECHA AS FECHACOMITE, o.HORAINI, O.HORAFIN, O.LUGAR from co_comites o  where  o.ID='".$_GET["id"]."'";
               //echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function LoadAsuntos()
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="select  distinct(IFNULL(CARRERAD,'GENERALES')) AS CARRERAD, IFNULL(CARRERA,'0') AS CARRERA from vco_solicitud n  where COMITE='".$_GET["id"]."' ORDER BY 1 DESC";
               //echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function LoadDatosIntegrantes($tipo)
			{				
                $data=[];	
                $miConex = new Conexion();
                $sql="SELECT * FROM co_integrantes  WHERE TIPO='".$tipo."' ORDER BY ORDEN";
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function quitainicio($cad)
			{		
                $res=$cad;             
                if ((substr(strtoupper($cad),0,3)=='EL ') || (substr(strtoupper($cad),0,3)=='LA ')) {
                    $res=substr(strtoupper($cad),3,strlen($cad));
                }
				return $res;
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
				//$miutil = new UtilUser();
               // $miutil->getEncabezado($this,'V');			
                //Para que cuando se cambie a la otra pagina empiece a la derecha y la stablas no se descuadren
                $this->SetX(10);
                $this->Ln(5);	
                //Cargamos las fuentes 
                $this->AddFont('Montserrat-Black','B','Montserrat-Black.php');
                $this->AddFont('Montserrat-Black','','Montserrat-Black.php');
                $this->AddFont('Montserrat-Medium','B','Montserrat-Medium.php');
                $this->AddFont('Montserrat-Medium','','Montserrat-Medium.php');
                $this->AddFont('Montserrat-SemiBold','','Montserrat-SemiBold.php');
                $this->AddFont('Montserrat-SemiBold','B','Montserrat-SemiBold.php');
                $this->AddFont('Montserrat-ExtraBold','B','Montserrat-ExtraBold.php');
                $this->AddFont('Montserrat-ExtraBold','','Montserrat-ExtraBold.php');
                $this->AddFont('Montserrat-ExtraBold','I','Montserrat-ExtraBold.php');
                $this->AddFont('Montserrat-ExtraLight','I','Montserrat-ExtraLight.php');
                $this->AddFont('Montserrat-ExtraLight','','Montserrat-ExtraLight.php');

			}
			
			

			function Footer()
			{	
                
                //$miutil = new UtilUser();
                //$nombre=$miutil->getJefe('303');//Nombre del puesto de Recursos Humanos
                //$miutil->getPie($this,'V');

                $this->setY(-50);
                $this->SetFont('Montserrat-ExtraBold','B',11);
               
            
			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(15, 10 , 15);
		$pdf->SetAutoPageBreak(true,30); 
        $pdf->AddPage();

        $dataGen = $pdf->LoadDatosGen();
        $dataAsuntos = $pdf->LoadAsuntos();
        $dataCom= $pdf->LoadDatosComite();

        $dataPRE = $pdf-> LoadDatosIntegrantes('PRE');
        $dataDIR = $pdf-> LoadDatosIntegrantes('DIR');
        $dataVYV = $pdf-> LoadDatosIntegrantes('VYV');

        $miutil = new UtilUser();

        $pdf->Ln(3);
        $pdf->SetFont('Montserrat-ExtraBold','B',11);
        $pdf->Cell(0,5,utf8_decode($dataCom[0]["COMITED"]." DE COMITÉ ACADÉMICO DEL "),0,0,'C');
        $pdf->Ln(5);
        $pdf->Cell(0,5,utf8_decode($dataGen[0]["inst_razon"]),0,0,'C');
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-Medium','',10);
        $fechadecof=$miutil->formatFecha($dataCom[0]["FECHACOMITE"]);
        $fechaof=date("d", strtotime($fechadecof))." DE ".$miutil->getFecha($fechadecof,'MES'). " DEL ".date("Y", strtotime($fechadecof));
        $fechaof2=$miutil->aletras(date("d",strtotime($fechadecof))).utf8_decode(" DÍAS DEL MES DE ").
                            $miutil->getFecha($fechadecof,'MES'). utf8_decode(" DEL AÑO "). $miutil->aletras(date("Y", strtotime($fechadecof)));

        $pdf->Cell(0,5,strtoupper(utf8_decode($fechaof)),0,0,'C');

        $pdf->Ln(5);
        $cad="EN LA CIUDAD DE ".utf8_decode($dataGen[0]["inst_fechaof"])." A LOS ".$fechaof2. " SIENDO LAS ".$dataCom[0]["HORAINI"]." HORAS ".
        ", SE REUNEN ".$dataCom[0]["LUGAR"]." A FIN DE CELEBRAR LA ".utf8_decode($dataCom[0]["COMITED"]).utf8_decode(", DEL COMITÉ ACADÉMICO, DEL ").
        utf8_decode($dataGen[0]["inst_razon"]." ");

        foreach($dataPRE as $row) { $cad.=utf8_decode($row["NOMBRE"]." ".$row["PUESTO"].", "); }
        foreach($dataDIR as $row) { $cad.=utf8_decode($row["NOMBRE"]." ".$row["PUESTO"].", "); }
        foreach($dataVYV as $row) { $cad.=utf8_decode($row["NOMBRE"]." ".$row["PUESTO"].", "); }

        $cad.=utf8_decode("QUIENES FIRMARÁN DE CONFORMIDAD AL MARGEN Y AL CALCE DE LA PRESENTE PARA MAYOR CONSTANCIA.");
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->Multicell(0,5,strtoupper($cad),0,'J',false);
        $pdf->Ln(5);

        $pdf->SetFont('Montserrat-black','B',10);
        $pdf->Multicell(0,5,utf8_decode("DESARROLLO DE LA SESIÓN"),0,'J',false);
   
        $pdf->Ln(5);
        $pdf->Multicell(0,5,utf8_decode("1. BIENVENIDA DE LOS ASISTENTES"),0,'J',false);
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->Multicell(0,5,utf8_decode($dataPRE[0]["NOMBRE"]." ".$dataPRE[0]["PUESTO"].
        " PROCEDE A DAR LA BIENVENIDA A TODOS LOS ASISTENTES A LA ".$dataCom[0]["COMITED"]).".",0,'J',false);
        $pdf->Ln(5);

        $pdf->SetFont('Montserrat-black','B',10);
        $pdf->Multicell(0,5,utf8_decode("2. LISTA DE ASISTENCIA DECLARACIÓN DE QUÓRUM"),0,'J',false);
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->Multicell(0,5,utf8_decode("SE DECLARA QUE CONFORME A LA LISTA DE ASISTENTES A LA REUNIÓN SE ENCUENTRAN ".
        " PRESENTES "."12"." INTEGRANTES DE ESTE COMITÉ, POR LO TANTO, SE VALIDA LA EXISTENCIA DE QUÓRUM LEGAL Y SE DECLARA ".
        " FORMALMENTE INSTALADA LA ".$dataCom[0]["COMITED"]." DEL COMITÉ ACADÉMICO, DEL ".$dataGen[0]["inst_razon"].". ").".",0,'J',false);
        $pdf->Ln(5);


        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-black','B',10);
        $pdf->Multicell(0,5,utf8_decode("3. LECTURA DEL ORDEN DEL DÍA"),0,'J',false);
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->Multicell(0,5,utf8_decode("SEGUIDAMENTE ".$dataPRE[0]["NOMBRE"].
        " PROCEDE A DAR LECTURA DEL ORDEN DEL DÍA LA CUAL SOMETE A CONSIDERACIÓN DE LOS PRESENTES, MISMA QUE SE APRUEBA, ".
        " POR UNANIMIDAD ").".",0,'J',false);
        $pdf->Ln(5);

        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-black','B',10);
        $pdf->Multicell(0,5,utf8_decode("ORDEN DEL DÍA"),0,'J',false);
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->Multicell(0,5,utf8_decode("1. BIENVENIDA").".",0,'J',false);
        $pdf->Multicell(0,5,utf8_decode("2. LISTA DE ASISTENCIA DECLARACIÓN DE QUÓRUM").".",0,'J',false);
        $pdf->Multicell(0,5,utf8_decode("3. LECTURA DEL ORDEN DEL DÍA").".",0,'J',false);
     
        $i=4;
        foreach($dataAsuntos as $row) { 
            if ($row["CARRERAD"]!='GENERALES') {
                $pdf->Multicell(0,5,utf8_decode($i.". ASUNTOS ACADÉMICOS DEL PROGRAMA EDUCATIVO ".$row["CARRERAD"]."."),0,'J',false);
                $i++;
            }
         }
         $pdf->Multicell(0,5,utf8_decode($i++.". ASUNTOS GENERALES").".",0,'J',false);
         $pdf->Multicell(0,5,utf8_decode($i++.". CLAUSURA DE LA SESIÓN").".",0,'J',false);
    
         $i=4;
         foreach($dataAsuntos as $row) {     
            if ($row["CARRERAD"]!='GENERALES') {
                 $pdf->Ln(5);
                 $pdf->SetFont('Montserrat-black','B',8);
                 $pdf->Multicell(0,5,utf8_decode($i.". ASUNTOS ACADÉMICOS DEL PROGRAMA EDUCATIVO ".$row["CARRERAD"]."."),0,'J',false);
                 $i++;
                 $dataAlum = $pdf->LoadDatosAlumnos($row["CARRERA"]);
                 $pdf->SetFont('Montserrat-Medium','',8);

                 $pdf->SetWidths(array(25,105,60));
                 $pdf->SetAligns(array('C','C','C'));
                 $pdf->SetFont('Montserrat-black','B',8);
                 $pdf->Row(array(utf8_decode("No. ACUERDO"),utf8_decode("SITUACION"),utf8_decode("DICTAMEN")));

                    $pdf->SetFont('Montserrat-Medium','',8);   
                    $pdf->SetWidths(array(25,105,60));
                    $pdf->SetAligns(array('C','J','J'));
                    $n=1;
                    $pre="";
                    foreach($dataAlum as $row2) {
                        if ($row2["TIPO"]=="ALUMNOS" ) {
                            $pre="EL ALUMNO ".$row2["NOMBRE"]." CON NÚMERO DE CONTROL ".$row2["PERSONA"].
                            " DE LA CARRERA DE ".$row2["CARRERAD"]." CURSANDO EL ".$row2["PERIODO"]." SEMESTRE ";
                        }
                        if ($row2["TIPO"]=="DOCENTES" ) {
                            $pre="EL DOCENTE ".$row2["NOMBRE"]." CON NÚMERO DE EMPLEADO ".$row2["PERSONA"].
                            " ADSCRITO A LA CARRERA DE ".$row2["CARRERAD"]." ";
                        }
                        $cadaut="";
                        if ($row2["AUTCOMITE"]=='S') {$cadaut="SI SE RECOMIENDA\n\n";}
                        if ($row2["AUTCOMITE"]=='N') {$cadaut="NO SE RECOMIENDA\n\n";}

                        $pdf->Row(array( utf8_decode($row2["NUMCOMITE"]),
                                         utf8_decode($pre." ".$row2["SOLICITUD"]."\n\n"."PROBLEMÁTICA PERSONAL: \n".
                                                     $row2["PERSONALES"]."\n\nPROBLEMÁTICA ACADÉMICA: \n".$row2["ACADEMICOS"]),
                                         utf8_decode($cadaut.$row2["OBSCOMITE"])
                                         )
                                  );
                        $n++;
                    }
            }

            if ($row["CARRERAD"]=='GENERALES') {
                $pdf->Ln(5);
                
                $pdf->SetFont('Montserrat-black','B',8);
                $pdf->Multicell(0,5,utf8_decode($i.". ASUNTOS ".$row["CARRERAD"]."."),0,'J',false);
                $i++;
                $dataAlum = $pdf->LoadDatosAlumnos($row["CARRERA"]);

                $pdf->SetFont('Montserrat-black','B',8);
                $pdf->SetWidths(array(25,105,60));
                $pdf->SetAligns(array('C','C','C'));
                $pdf->Row(array(utf8_decode("No. ACUERDO"),utf8_decode("SITUACION"),utf8_decode("DICTAMEN")));

                   $pdf->SetFont('Montserrat-Medium','',8);               
                   $pdf->SetWidths(array(25,105,60));
                   $pdf->SetAligns(array('C','J','J'));
                   $n=1;
                   $cataut="";
                   
                   foreach($dataAlum as $row3) {
                             if ($row3["AUTCOMITE"]=='S') {$cadaut="SI SE RECOMIENDA\n\n";}
                             if ($row3["AUTCOMITE"]=='N') {$cadaut="NO SE RECOMIENDA\n\n";}
                            $pdf->Row(array(utf8_decode($row3["NUMCOMITE"]),
                                            utf8_decode($row3["SOLICITUD"]),
                                            utf8_decode($cadaut.$row3["OBSCOMITE"])
                                        )
                                    );
                            $n++;
                        }
                   }
         } // DEL RECORRIDO DEL ARREGLO DE LOS ASUNTOS 

         $pdf->Ln(5);
         $pdf->SetFont('Montserrat-black','B',8);
         $pdf->Multicell(0,5,utf8_decode($i.". CLAUSURA DE LA SESIÓN."),0,'J',false);
         $i++;
         $pdf->SetFont('Montserrat-Medium','',10);
         $pdf->Multicell(0,5,utf8_decode("INMEDIATAMENTE, ".$dataPRE[0]["NOMBRE"].
         " EN SU CARÁCTER DE ".$dataPRE[0]["PUESTO"].", DECLARA QUE NO HABIENDO OTRO ASUNTO QUE TRATAR SIENDO LAS ".
         $dataCom[0]["HORAFIN"]. " HRS., DE LA FECHA DE SU ENCABEZADO, SE DA POR TERMINADA LA ".$dataCom[0]["COMITED"].
         " DEL COMITÉ ACADÉMICO DEL ". $dataGen[0]["inst_razon"].", FIRMANDO AL MARGEN Y AL CALCE PARA MAYOR CONSTANCIA, QUIENES EN ELLA INTERVINIERON."),0,'J',false);
         $pdf->Ln(5);

         $pdf->SetWidths(array(140,50));
         $pdf->SetAligns(array('L','J'));
         $pdf->SetFont('Montserrat-Medium','',9);   
         
         foreach($dataPRE as $row) {$pdf->Row(array(utf8_decode($pdf->quitainicio($row["NOMBRE"]))."\n".utf8_decode($row["PUESTO"]),""));}
         foreach($dataDIR as $row) {$pdf->Row(array(utf8_decode($pdf->quitainicio($row["NOMBRE"]))."\n".utf8_decode($row["PUESTO"]),""));}
         foreach($dataVYV as $row) {$pdf->Row(array(utf8_decode($pdf->quitainicio($row["NOMBRE"]))."\n".utf8_decode($row["PUESTO"]),""));}
   
         $pdf->Ln(5);
         $pdf->SetFont('Montserrat-Medium','',10);
         $pdf->Multicell(0,5,utf8_decode("LAS FIRMAS ARRIBA PLASMADAS CORRESPONDEN AL ACTA DE LA ".$dataCom[0]["COMITED"].
         "DEL COMITÉ ACADÉMICO DEL ".$dataGen[0]["inst_razon"]." CELEBRADA EL DÍA ").strtoupper($fechaof2)." ".$dataCom[0]["LUGAR"].".",0,'J',false);
         $pdf->Ln(5);

         $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
