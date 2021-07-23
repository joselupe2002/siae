
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
 
   	
			function LoadData($cadAsesorias)
			{		
                $data=[];		
                $miConex = new Conexion();
                $sql="select ID, concat(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) as NOMBRE, ALUM_MATRICULA, ".
                " IF (LISCAL<70,'NA',LISCAL) as LISCAL,".$cadAsesorias."LISCAL AS LISCAL2".
                " from dlista a, falumnos b  where ALUCTR=ALUM_MATRICULA and a.PDOCVE='".$_GET["ciclo"].
                "' and a.IDGRUPO='".$_GET["id"]."' ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE";            
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);		
                
            
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
            
            function LoadDatosGrupo()
			{	
                $data=[];			
                $miConex = new Conexion();
                $sql="select * from vedgrupos a where a.IDDETALLE='".$_GET["id"]."'";
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function LoadDatosCiclo()
			{				
                $miConex = new Conexion();
                $sql="select * from ciclosesc a where a.CICL_CLAVE='".$_GET["ciclo"]."'";
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

            function LoadDatosmisCortes()
			{				
                $miConex = new Conexion();
                $sql="select * from ecortescal where  CICLO='".$_GET["ciclo"]."'".
                " and CLASIFICACION='CALIFICACION' ".
                " order by STR_TO_DATE(INICIA,'%d/%m/%Y')";   
                       
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }


            function LoadDatosCorte($idcorte)
			{				
                $miConex = new Conexion();
                $sql="select * from ecortescal where  ID='".$idcorte."'";   
                    
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}                
				return $data;
            }

          
            function LoadDatosProfesor()
			{				
                $miConex = new Conexion();
                $sql="select EMPL_NUMERO, CONCAT(EMPL_ABREVIA,' ',EMPL_NOMBRE, ' ',EMPL_APEPAT, ' ',EMPL_APEMAT) AS NOMBRE, ".
                " EMPL_DEPTO from pempleados a where a.EMPL_NUMERO='".$_GET["profesor"]."'";
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
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
				
				$this->SetX(10);$this->SetY(-30);
				$this->SetFont('Montserrat-ExtraBold','B',10);
				$this->Cell(60,5,'Firma del Profesor','T',1,'L');
				
				
			}
			
			function LoadProf($matricula)
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta($_SESSION['bd'],
						"select  EMPL_NUMERO, CONCAT(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) as NOMBRE, EMPL_CORREOINS ".
						"from pempleados where EMPL_NUMERO='".$matricula."'");
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,40); 
		$pdf->AddPage();
		 
        $datamiCorte=$pdf->LoadDatosmisCortes();
        $dataCorte=$pdf->LoadDatosCorte($datamiCorte[0]["ID"]);
        
        $cad=""; $c=1;
        foreach($datamiCorte as $row) {
            $cad.=   "(select count(*) from asesorias WHERE ASES_MATRICULA=ALUM_MATRICULA".
                    " AND ASES_ASIGNATURA=MATCVE AND STR_TO_DATE(ASES_FECHA,'%d/%m/%Y')  ".
                    " Between STR_TO_DATE('".$row["INICIA"]."','%d/%m/%Y') AND ".
                    " STR_TO_DATE('".$row["TERMINA"]."','%d/%m/%Y')) AS ASE".$c.",";
            $c++;
        }
       
        $data = $pdf->LoadData($cad);
        $dataProfesor=$pdf->LoadDatosProfesor();
        $dataGrupo=$pdf->LoadDatosGrupo();
        


      
        
        $miutil = new UtilUser();
        
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-ExtraBold','B',9);
        $pdf->Cell(0,0,'REPORTE DE ASESORIAS',0,1,'C');
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-ExtraBold','B',9);$pdf->Cell(0,0,'MATERIA: ',0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9);$pdf->setX(50);$pdf->Cell(0,0,utf8_decode($_GET["materia"]."-".$_GET["materiad"]),0,1,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',9); $pdf->setX(145);$pdf->Cell(0,0,"FOLIO:",0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9); $pdf->setX(195); $pdf->Cell(0,0,$_GET["id"],0,1,'R');
        $pdf->Ln(5);
     
       
        $pdf->SetFont('Montserrat-ExtraBold','B',9);$pdf->Cell(0,0,'DOCENTE: ',0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9);$pdf->setX(50);$pdf->Cell(0,0,utf8_decode($dataProfesor[0]["NOMBRE"]),0,1,'L');
        $pdf->SetFont('Montserrat-ExtraBold','B',9); $pdf->setX(145);$pdf->Cell(0,0,"GRUPO:",0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9); $pdf->setX(195); $pdf->Cell(0,0,$_GET["semestre"]."-".$_GET["grupo"],0,1,'R');
        $pdf->Ln(3); 
        $pdf->SetFont('Montserrat-ExtraBold','B',9);$pdf->Cell(0,0,'CARRERA: ',0,1,'L');
        $pdf->SetFont('Montserrat-Medium','',9);$pdf->setX(50);$pdf->Cell(0,0,utf8_decode($dataGrupo[0]["CARRERAD"]." ".$dataGrupo[0]["MAPA"]),0,1,'L');
       
        $pdf->Ln(10);

        $pdf->SetFillColor(172,31,6);
        $pdf->SetTextColor(0);  
        $pdf->SetFont('Montserrat-ExtraBold','B',8);

        $titulos=["No.","Control","Nombre"];
        $ancol=[10,20,60];
        $alig=["L","L","L"];
        $i=3;
        foreach($datamiCorte as $row) {
            $ancol[$i]=25;
            $alig[$i]="C";
            $titulos[$i]=strtoupper(utf8_decode($row["DESCRIPCION"]));
            $i++;
        }
        $pdf->SetWidths($ancol);
        $pdf->SetAligns($alig);
        $pdf->Row($titulos);
        $pdf->SetFont('Montserrat-Medium','',7);
        $pdf->SetTextColor(0);

        $n=1;
       
        foreach($data as $row) {
            $line=[$n,utf8_decode($row["ALUM_MATRICULA"]), utf8_decode($row["NOMBRE"])];
            $i=3; $c=1; foreach($datamiCorte as $row2) { $line[$i]=$row["ASE".$c];$c++;$i++; }
            $pdf->Row($line);
            $n++;
        }
    
        $pdf->Ln(10);
        $pdf->SetWidths([80,20,20]);
        $pdf->SetAligns($alig);

        foreach($datamiCorte as $row) {
            $line=[utf8_decode(strtoupper($row["DESCRIPCION"])), utf8_decode($row["INICIA"]),utf8_decode($row["TERMINA"])];
            $pdf->Row($line);
        }
    

            $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
