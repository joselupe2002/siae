
<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	require('../../fpdf/PDF_Code128.php');
    include("../.././includes/barcode.php");
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";
	

	
	
	class PDF extends PDF_Code128  {
       
        
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

                $this->SetFont('Montserrat-ExtraBold','B',10);
                $this->setY(-48);
                $this->Cell(0,2,utf8_decode("SOLO TIENE QUE DECIRLE AL CAJERO, DONDE QUIERA QUE ESTÉ PAGANDO:"),0,1,'C',false);

                $this->setY(-45);
                $this->Cell(0,2,utf8_decode("ESTO ES UN PAGO REFERENCIADO A FAVOR DEL GOBIERNO DEL ESTADO DE TABASCO"),0,1,'C',false);
                $this->SetFont('Montserrat-Medium','B',8);
                $this->setY(-42);
                $this->MultiCell(0,2,utf8_decode("Ante cualquier duda, favor de comunicarse al Centro de Atención Telefónica de la SF ".
                "al 993-310-40-10 donde con gusto le atenderemos de Lunes a Viernes en horario de 8 a 15 horas, escríbanos al correo catspf@tabasco.gob.mx"),0,'C',false);

                


		
			}

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,20); 
        $pdf->AddPage();
      
      
        $miutil = new UtilUser();

        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(0,5,'GOBIERNO DEL ESTADO DE TABASCO',0,1,'C',false);
        $pdf->Cell(0,5,'SECRETARIA DE FINANZAS',0,1,'C',false);
        $pdf->Cell(0,5,'ESTADO DE CUENTA',0,1,'C',false);
        $pdf->Ln(5);

        $pdf->SetTextColor(22, 77, 138);
        $pdf->Cell(40,5,'',0,0,'L',false);$pdf->Cell(0,5,utf8_decode($_GET["usuario"]." ".$_GET["nombre"]),0,1,'L',false);
        $pdf->Cell(40,5,'',0,0,'L',false);$pdf->Cell(0,5,utf8_decode($_GET["carrera"]),0,1,'L',false);
        $pdf->SetFont('Montserrat-Medium','',10);

        $pdf->SetTextColor(0);
        $pdf->Cell(40,5,'',0,0,'L',false);
        $pdf->Cell(45,5,utf8_decode('ESTADO DE CUENTA:'),0,0,'L',false);
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(40,5,utf8_decode($_GET["folioestado"]),0,1,'L',false);
        


        $pdf->Cell(40,5,'',0,0,'L',false);
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->Cell(45,5,utf8_decode('FECHA EMISIÓN:'),0,0,'L',false);
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(40,5,utf8_decode($_GET["fechaexp"]),0,1,'L',false);

        $pdf->Cell(40,5,'',0,0,'L',false);
        $pdf->SetFont('Montserrat-Medium','',10);
        $pdf->Cell(45,5,utf8_decode('VENCIMIENTO:'),0,0,'L',false);
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(40,5,utf8_decode($_GET["fechavence"]),0,1,'L',false);
        
        $pdf->Ln(5);

        $pdf->SetFont('Montserrat-Medium','',14);
        $pdf->SetTextColor( 170, 22, 37);
        $pdf->Cell(0,5,utf8_decode($_GET["descripcion"]),0,0,'L',false);
        $pdf->SetTextColor(0);
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        
        $pdf->Ln(5);

        $pdf->SetFont('Montserrat-Medium','',18);
        $pdf->Cell(0,5,utf8_decode('TOTAL A PAGAR $ '.$_GET["importe"]),0,0,'C',false);
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
       
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-Medium','',7);
        $pdf->MultiCell(0,3,utf8_decode("En caso de que el instrumento de pago sea CHEQUE nominativo distinto al banco donde presentará su pago, el vencimiento de la línea de captura tendrá un día hábil ".
        "menos del citado en este documento. Lo anterior, se debe a políticas bancarias. Si usted es contribuyente del Impuesto Especial Sobre Producción y Servicios (IEPS),".
        "únicamente realice su pago en Instituciones Bancarias"),0,"J",false);
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-ExtraBold','B',10);
        $pdf->Cell(0,5,utf8_decode("*** NOTA ***"),0,0,'C',false);

        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-Medium','',7);
        $pdf->Cell(0,3,utf8_decode("A) Si usted no cuenta con Banca Electrónica, Tarjeta Débito o Crédito, debe utilizar, la opción de \"ESTADO DE CUENTA\""),0,1,'L',false);
        $pdf->Cell(0,3,utf8_decode("B) El ESTADO DE CUENTA tiene vigencia de 2 días naturales, en la hoja se refleja dicha fecha"),0,1,'L',false);
        $pdf->Ln(5);

        $bancos=explode("|",$_GET["linea"])[0];
        $oxxo=explode("|",$_GET["linea"])[1];
        $pdf->Ln(5);
        $pdf->SetFont('Montserrat-ExtraBold','B',18);
        $pdf->Cell(0,5,utf8_decode("LINEA DE CAPTURA PARA BANCOS"),0,1,'C',false);
        $pdf->Cell(0,5,utf8_decode($bancos),0,1,'C',false);
       
        
        

       //$pdf->Image("../../imagenes/empresa/bancos.png",30,170,150,25);
        $pdf->Code128(70,150,$bancos,80,20);

        $pdf->setY(193);$pdf->setX(10);
        $pdf->SetFont('Montserrat-ExtraBold','B',12);
        $pdf->SetTextColor(170, 22, 37 );
        $pdf->Cell(100,5,utf8_decode("LINEA DE CAPTURA EXCLUSIVA DE OXXO"),0,1,'C',false);
        $pdf->SetFont('Montserrat-ExtraBold','B',12);
        $pdf->setY(198);$pdf->setX(10);
        $pdf->Cell(100,5,utf8_decode($oxxo),0,1,'C',false);
        $pdf->SetTextColor(0);
        //$pdf->Image("../../imagenes/empresa/oxxo.png",45,204,20,5);
        $pdf->Code128(10,213,$oxxo,80,15);


    
        $pdf->setY(200);$pdf->setX(120);
        $pdf->SetFont('Montserrat-Medium','',8);
        $pdf->Cell(100,5,utf8_decode("CITIBANAMEX: SERVICIO EST 4630 GOB IMP TABASCO WS"),0,1,'L',false);

        $pdf->setY(203);$pdf->setX(120);
        $pdf->Cell(100,5,utf8_decode("HSBC: CLAVE RAP: 2950"),0,1,'L',false);

        $pdf->setY(206);$pdf->setX(120);
        $pdf->Cell(100,5,utf8_decode("BANCA AFIRME: PR"),0,1,'L',false);

        $pdf->setY(209);$pdf->setX(120);
        $pdf->Cell(100,5,utf8_decode("BANORTE: EMPRESA 48421"),0,1,'L',false);

        $pdf->setY(212);$pdf->setX(120);
        $pdf->Cell(100,5,utf8_decode("SCOTIABANK: SERVICIO 1098"),0,1,'L',false);

        $pdf->setY(215);$pdf->setX(120);
        $pdf->Cell(100,5,utf8_decode("SANTANDER: CONVENIO =2527"),0,1,'L',false);

        $pdf->setY(218);$pdf->setX(120);
        $pdf->Cell(100,5,utf8_decode("BANCOMER: CIE =0672505"),0,1,'L',false);

        $pdf->setY(221);$pdf->setX(120);
        $pdf->Cell(100,5,utf8_decode("BANCO DEL BAJIO: SERVICIO 1108"),0,1,'L',false);


       

        //CODIGO QR
        $cadena= "Transaccion|".$_GET["folioestado"]."|Importe|".$_GET["importe"];     
        $pdf->Image('https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl='.$cadena.'&.png',20,40,28,28);     

       

      

         $pdf->Output(); 

       



 } else {header("Location: index.php");}
 
 ?>
