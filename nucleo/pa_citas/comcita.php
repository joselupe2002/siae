
<?php session_start(); if (($_SESSION['inicio']==1)) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	require('../../fpdf/fpdf.php');
	include("../../includes/Conexion.php");
	include("../../includes/UtilUser.php");
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
 
            
          
               function LoadDatosAlumnos($mat)
               {	
                   $data=[];			
                   $miConex = new Conexion();
                   $sql="select IFNULL(ALUM_FOTO,'../../imagenes/menu/default.png') from falumnos where ALUM_MATRICULA='".$mat."'".
                   " union select IFNULL(EMPL_FOTO,'../../imagenes/menu/default.png') from pempleados where EMPL_NUMERO='".$mat."'";
           
                  //echo $sql;
                   $resultado=$miConex->getConsulta($_SESSION['bd'],$sql);				
                   foreach ($resultado as $row) {
                       $data[] = $row;
                   }
                   return $data;
               }

            
            function LoadDatosCitas()
			{	
                $data=[];			
                $miConex = new Conexion();
                $sql="select * from vci_citas where ID='".$_GET["id"]."'";
        
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
                $miutil->getEncabezado($this,'V');	
				
				//Para cuando las tablas estas no se coirten 
				$this->SetX(20);
				$this->Ln(5);
			}
			
			
            
            function ficha() {
                $dataCita = $this->LoadDatosCitas();             
              
                $dataFoto = $this->LoadDatosAlumnos($dataCita[0]["SOLICITANTE"]);
                $miutil = new UtilUser();    
                         
              //  echo $dataFoto[0][0];
                if (!empty($dataFoto)) { 
                    $lafoto=$dataFoto[0][0]; 
                    $logo = file_get_contents($lafoto);
                    $this->MemImage($logo,20,37,22,28);
                }

                 
                $fecha=date("d/m/Y"); 
                $this->SetFont('Montserrat-SemiBold','B',10);

                
                $this->Ln(5);
                $this->SetFont('Montserrat-Black','',8);   
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);     
                $this->SetX(60);                   
                $this->Cell(30,5,utf8_decode("No. de Cita"),1,0,'C',true);
                $this->Cell(70,5,utf8_decode("COMPROBANTE DE CITA"),'TLR',0,'C',true);
                $this->Cell(30,5,utf8_decode("Fecha Impresión:"),1,0,'C',true);
                $this->Ln(5);

                $this->SetFont('Montserrat-Medium','',10);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->setX(60);
                $this->SetWidths(array(30,70,30));
                $this->Row(array( utf8_decode($dataCita[0]["ID"]), 
                                  utf8_decode($dataCita[0]["TRAMITED"]),
                                  utf8_decode($fecha)                     
                                 ));


                $this->Ln(8);
                $this->SetFont('Montserrat-Black','',8);   
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);                     
                $this->Cell(40,5,utf8_decode("Fecha Cita:"),1,0,'L',true);
                $this->SetTextColor(0);  
                $this->Cell(95,5,utf8_decode($dataCita[0]["FECHA"]),1,0,'L',false);
                $this->Ln(5);

                $this->SetTextColor(255);                     
                $this->Cell(40,5,utf8_decode("Hora de Cita:"),1,0,'L',true);
                $this->SetTextColor(0);  
                $this->Cell(95,5,utf8_decode($dataCita[0]["HORA"]),1,0,'L',false);
                $this->Ln(5);

                $this->SetTextColor(255);                     
                $this->Cell(40,5,utf8_decode("Tiempo Atención:"),1,0,'L',true);
                $this->SetTextColor(0);  
                $this->Cell(95,5,utf8_decode($dataCita[0]["MINUTOS"]." Minutos"),1,0,'L',false);
                $this->Ln(5);

                $this->SetTextColor(255);                     
                $this->Cell(40,5,utf8_decode("Solicitante:"),1,0,'L',true);
                $this->SetTextColor(0);  
                $this->Cell(95,5,utf8_decode($dataCita[0]["SOLICITANTE"]." ".$dataCita[0]["NOMBRE"]),1,0,'L',false);
                $this->Ln(5);

                $this->SetTextColor(255);                     
                $this->Cell(40,5,utf8_decode("Lugar:"),1,0,'L',true);
                $this->SetTextColor(0);  
                $this->Cell(95,5,utf8_decode($dataCita[0]["LUGAR"]),1,0,'L',false);
                $this->Ln(5);

                $this->SetTextColor(255);                     
                $this->Cell(40,5,utf8_decode("Nota:"),1,0,'L',true);
                $this->SetTextColor(0);  
                $this->Cell(95,5,utf8_decode($dataCita[0]["OBS"]),1,0,'L',false);
                $this->Ln(10);


                $this->SetTextColor(255);                     
                $this->Cell(170,5,utf8_decode("REQUISITOS:"),1,0,'C',true);
                $this->SetTextColor(0);  
                $this->Ln(5);
               
                $this->SetFont('Montserrat-Medium','',10);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(170));
                $this->Row(array( utf8_decode($dataCita[0]["REQUISITOS"])                                          
                                 ));

                $this->SetTextColor(255);                     
                $this->Cell(170,5,utf8_decode("NOTA / OBSERVACIONES:"),1,0,'C',true);
                $this->SetTextColor(0);  
                $this->Ln(5);
               
                             
                $this->SetFont('Montserrat-Medium','',10);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(170));
                $this->Row(array( utf8_decode($dataCita[0]["NOTA"])                                          
                                ));

                $cadena= "FECHA:".str_replace("/","",$fecha)."|".str_replace(" ","|",$dataCita[0]["ID"]).
                str_replace(" ","|",$dataCita[0]["SOLICITANTE"])."|".str_replace(" ","|",$dataCita[0]["NOMBRE"]);
         
         
                $this->Image('https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl='.$cadena.'&.png',160,62,35,35);         


            }

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
        $pdf->AddPage();
         
        $pdf->ficha(0);
       //$pdf->Cell(65,1,"INTENTE MAS",1,1,'C',true);
 
        $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
