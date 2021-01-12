
<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	require('../fpdf/fpdf.php');
	include("../includes/Conexion.php");
	include("../includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";
	

class VariableStream
{
    private $varname;
    private $position;

    function stream_open($path, $mode, $options, &$opened_path)
    {
        $url = parse_url($path);
        $this->varname = $url['host'];
        if(!isset($GLOBALS[$this->varname]))
        {
            trigger_error('Global variable '.$this->varname.' does not exist', E_USER_WARNING);
            return false;
        }
        $this->position = 0;
        return true;
    }

    function stream_read($count)
    {
        $ret = substr($GLOBALS[$this->varname], $this->position, $count);
        $this->position += strlen($ret);
        return $ret;
    }

    function stream_eof()
    {
        return $this->position >= strlen($GLOBALS[$this->varname]);
    }

    function stream_tell()
    {
        return $this->position;
    }

    function stream_seek($offset, $whence)
    {
        if($whence==SEEK_SET)
        {
            $this->position = $offset;
            return true;
        }
        return false;
    }
    
    function stream_stat()
    {
        return array();
    }
}


	
	class PDF extends FPDF {
       

        function __construct($orientation='P', $unit='mm', $size='A4')
        {
            parent::__construct($orientation, $unit, $size);
            // Register var stream protocol
            stream_wrapper_register('var', 'VariableStream');
        }
    
        function MemImage($data, $x=null, $y=null, $w=0, $h=0, $link='')
        {
            // Display the image contained in $data
            $v = 'img'.md5($data);
            $GLOBALS[$v] = $data;
            $a = getimagesize('var://'.$v);
            if(!$a)
                $this->Error('Invalid image data');
            $type = substr(strstr($a['mime'],'/'),1);
            $this->Image('var://'.$v, $x, $y, $w, $h, $type, $link);
            unset($GLOBALS[$v]);
        }
    
        function GDImage($im, $x=null, $y=null, $w=0, $h=0, $link='')
        {
            // Display the GD image associated with $im
            ob_start();
            imagepng($im);
            $data = ob_get_clean();
            $this->MemImage($data, $x, $y, $w, $h, $link);
        }       
        
        
    /*============================================================================================*/
        
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
 
            
            function LoadDatosCiclo()
			{				
                $miConex = new Conexion();
                $sql="SELECT * FROM ciclosesc where CICL_CLAVE='".$_GET["ciclo"]."'";
                
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
          

            function LoadFoto()
			{	
                $data=[];			
                $miConex = new Conexion();
                $sql="select RUTA from adjaspirantes a where a.AUX='FOTO".$_GET["curp"]."'";
                
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }
            
            function LoadDatosAspirantes()
			{	
                $data=[];			
                $miConex = new Conexion();
                $sql="select * from vaspirantes where CURP='".$_GET["curp"]."' and CICLO='".$_GET["ciclo"]."'";
        
               //echo $sql;
				$resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
            }

			
			function Header()
			{
                $miutil = new UtilUser();    
                $left2=120; $left3=170;         
                $this->Image('../imagenes/empresa/enc1.png',20,8,85);
                $this->Image('../imagenes/empresa/enc2.png',$left2,6,40);
                $this->Image('../imagenes/empresa/enc3.png',$left3,8,10);
                $this->Image('../imagenes/empresa/fondo.png',0,0,187,275);
                
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
                
                $this->SetFont('Montserrat-Black','B',9);
                $this->Ln(6);
                $this->Cell(0,0,utf8_decode('Instituto Tecnológico Superior de Macuspana'),0,0,'R');
                
                $this->SetFont('Montserrat-Medium','B',8);
                $this->Ln(6);
                $this->Cell(0,0,utf8_decode('"2020, Año de Leona Vicario, Benemérita Madre de la Patria"'),0,0,'C');
			}
			
			
            
            function ficha() {
                $dataAlum = $this->LoadDatosAspirantes();             
              
                $dataCiclo = $this->LoadDatosCiclo();
                $dataFoto = $this->LoadFoto();
                $miutil = new UtilUser();    
                     
                
                if (!empty($dataFoto)) { 
                    $lafoto=$dataFoto[0][0]; 
                    $logo = file_get_contents($lafoto);
                  
                    $this->MemImage($logo,20,37,22,28);
                }
            

                 
                $fecha=date("d/m/Y"); 
                $this->SetFont('Montserrat-SemiBold','B',10);

                $this->Ln(5);
                $this->SetFont('Montserrat-Black','',10);   
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);     
                $this->SetX(60);                   
                $this->Cell(30,5,utf8_decode("No. de Ficha"),1,0,'C',true);
                $this->Cell(40,5,utf8_decode("Periodo"),1,0,'C',true);
                $this->Cell(30,5,utf8_decode("Aula"),1,0,'C',true);
                $this->Cell(30,5,utf8_decode("Fecha"),1,0,'C',true);
                $this->Ln(5);

                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetX(60);
                $this->Cell(30,5,utf8_decode($dataAlum[0]["IDASP"]),1,0,'C');
                $this->Cell(40,5,utf8_decode($dataCiclo[0]["CICL_DESCRIP"]),1,0,'C');
                $this->Cell(30,5,utf8_decode($dataAlum[0]["CARR_AULAADMINISION"]),1,0,'C');
                $this->Cell(30,5,utf8_decode($fecha),1,0,'C');
                $this->Ln(5);
                
                $this->SetFont('Montserrat-Black','',10);   
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);       
                $this->SetX(60);              
                $this->Cell(130,5,utf8_decode("ASPIRANTE"),1,0,'C',true);            
                $this->Ln(5);
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetX(60);
                $this->Cell(130,5,utf8_decode($dataAlum[0]["NOMBRE"]." ".$dataAlum[0]["APEPAT"]." ".$dataAlum[0]["APEMAT"]),1,0,'C');
                $this->Ln(5);

                $this->Ln(10);
                $this->SetFont('Montserrat-Black','',10);   
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);                     
                $this->Cell(85,5,utf8_decode("1RA OPCIÓN"),1,0,'C',true);
                $this->Cell(85,5,utf8_decode("2DA OPCIÓN"),1,0,'C',true);
                $this->Ln(5);

                $this->SetFont('Montserrat-Black','',8);  
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->Cell(85,5,utf8_decode($dataAlum[0]["CARRERAD"]),1,0,'C');
                $this->Cell(85,5,utf8_decode($dataAlum[0]["CARRERAD2"]),1,0,'C');
                $this->Ln(5);


                $this->SetFont('Montserrat-Black','',10);   
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);                     
                $this->Cell(75,5,utf8_decode("CALLE"),1,0,'C',true);
                $this->Cell(10,5,utf8_decode("NO."),1,0,'C',true);
                $this->Cell(70,5,utf8_decode("COLONIA"),1,0,'C',true);
                $this->Cell(15,5,utf8_decode("C.P."),1,0,'C',true);
                $this->Ln(5);

  
                $this->SetFont('Montserrat-Medium','',8);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(75,10,70,15));
                $this->Row(array( utf8_decode($dataAlum[0]["CALLE"]),
                                  utf8_decode($dataAlum[0]["NUMEROCALLE"]),
                                  utf8_decode($dataAlum[0]["COLONIA"]),
                                  utf8_decode($dataAlum[0]["CP"])
                                 ));

                $this->SetFont('Montserrat-Black','',10);   
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);                     
                $this->Cell(60,5,utf8_decode("MUNICIPIO"),1,0,'C',true);
                $this->Cell(60,5,utf8_decode("ESTADO"),1,0,'C',true);
                $this->Cell(50,5,utf8_decode("CIUDAD"),1,0,'C',true);                
                $this->Ln(5);
                
                $this->SetFont('Montserrat-Medium','',8);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(60,60,50));
                $this->Row(array( utf8_decode($dataAlum[0]["MUNRESD"]),
                                  utf8_decode($dataAlum[0]["ESTRESD"]),
                                  utf8_decode($dataAlum[0]["CIUDADRES"])
                                 ));


                $this->SetFont('Montserrat-Black','',10);   
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);                     
                $this->Cell(42,5,utf8_decode("TELÉFONO 1"),1,0,'C',true);
                $this->Cell(42,5,utf8_decode("TELÉFONO 2"),1,0,'C',true);
                $this->Cell(43,5,utf8_decode("CORREO"),1,0,'C',true);  
                $this->Cell(43,5,utf8_decode("RFC"),1,0,'C',true);                 
                $this->Ln(5);
                
                $this->SetFont('Montserrat-Medium','',8);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(42,42,43,43));
                $this->Row(array( utf8_decode($dataAlum[0]["TELCASA"]),
                                utf8_decode($dataAlum[0]["TELCEL"]),
                                utf8_decode($dataAlum[0]["CORREO"]),
                                utf8_decode($dataAlum[0]["RFC"])
                                ));
                $this->Ln(5);
                $this->SetFont('Montserrat-Black','',10);   
                $this->SetFillColor(1,68,106);
                $this->SetTextColor(255);   
                $this->Cell(170,5,utf8_decode("PROCEDENCIA"),1,0,'C',true);
                $this->Ln(5);
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(255);
                $this->Cell(90,5,utf8_decode("ESCUELA"),1,0,'C',true);
                $this->Cell(40,5,utf8_decode("MUNICIPIO"),1,0,'C',true);
                $this->Cell(40,5,utf8_decode("ESTADO"),1,0,'C',true);                 
                $this->Ln(5);
                $this->SetFont('Montserrat-Medium','',8);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(90,40,40));
                $this->Row(array( utf8_decode($dataAlum[0]["ESCPROCD"]),
                                  utf8_decode($dataAlum[0]["MUNESCPROCD"]),
                                  utf8_decode($dataAlum[0]["ESTESCPROCD"])
                                 ));

                $this->SetFillColor(172,31,6);
                $this->SetTextColor(255);
                $this->SetFont('Montserrat-Black','',8);  
                $this->Cell(20,5,utf8_decode("EGRESO"),1,0,'C',true);
                $this->Cell(20,5,utf8_decode("PROMEDIO"),1,0,'C',true);
                $this->Cell(50,5,utf8_decode("AREA"),1,0,'C',true);
                $this->Cell(40,5,utf8_decode("MUNICIPIO NACIMIENTO"),1,0,'C',true);
                $this->Cell(40,5,utf8_decode("ESTADO NACIMIENTO"),1,0,'C',true);                 
            
                $this->Ln(5);               
                $this->SetFont('Montserrat-Medium','',8);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(20,20,50,40,40));
                $this->Row(array( utf8_decode($dataAlum[0]["EGRESOBAC"]),
                                utf8_decode($dataAlum[0]["PROMBAC"]),
                                utf8_decode($dataAlum[0]["AREACONOCD"]),
                                utf8_decode($dataAlum[0]["MUNINACD"]),
                                utf8_decode($dataAlum[0]["EDONACD"])
                                ));

                $this->Ln(5);  
                $this->SetFont('Montserrat-Black','',8); 
                $this->SetFillColor(1,68,106);
                $this->SetTextColor(255);  
                $this->Cell(170,5,utf8_decode("OBSERVACIONES"),1,0,'C',true);
                $this->Ln(5);
                $this->SetFont('Montserrat-Medium','',8);   
               
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(170));
                $this->SetAligns(array('J'));

                $this->Row(array(utf8_decode("¡ADVERTENCIA!\n".
                "El procedimiento de inscripción está sujeto a la normatividad aplicable emitida por el ".
                "Tecnológico Nacional de México, por lo que su observancia es obligatoria para quienes desean ".
                "ingresar a una institución del sistema, como lo es el Instituto Tecnológico Superior de Macuspana.".
                "\n".
                "En consecuencia, la falta de un requisito, por ejemplo, no haber concluido sus estudios de bachillerato (adeudo de materias) u otras análogas; ".
                " para realizar su inscripción, produce la invalidación de su procedimiento de inscripción en esta institución; ". 
                " por ello, se le invita a que realice el pago de inscripción SOLO SI, cuenta con la documentación y requisitos ". 
                " solicitados para su inscripción. \n". 
                "En caso contrario, lo hace Usted, bajo su más estricta responsabilidad en el entendido de que su inscripción será nula, en cualquier momento, ". 
                " aunque haya realizado el pago por concepto de inscripción o cursado asignaturas, y las consecuencias que ". 
                " deriven de lo anterior solo son imputables a quien realiza el pago. \n\n".
                "RECIBIRÁ UN CORREO ELECTRÓNICO INDICANDO LA FECHA Y HORA DE ".
                "ENTREGA DE DOCUMENTOS ORIGINALES, ASÍ COMO TAMBIÉN DEL DÍA DE PRESENTACIÓN DEL EXAMEN DE INGRESO. \n\n"           
            )));
            $this->SetDrawColor(255);
            $this->Ln(5);   
            $this->Row(array(utf8_decode("Protesto que los datos aquí asentados y la información que adjunte en ".
            "formato electrónico es fidedigna y que soy el único responsable de la misma.")));
            
            $this->Ln(15); 
            $this->SetTextColor(0);  
            $this->SetFont('Montserrat-Black','',8); 
            $this->setX(70);
            $this->Cell(65,1,"",1,1,'C',true);
            $this->Cell(170,5,utf8_decode($dataAlum[0]["NOMBRE"]." ".$dataAlum[0]["APEPAT"]." ".$dataAlum[0]["APEMAT"]),'T',0,'C',false);


            }

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(25, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
        $pdf->AddPage();
         
        $pdf->ficha(0);
       //$pdf->Cell(65,1,"INTENTE MAS",1,1,'C',true);
 
        $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
