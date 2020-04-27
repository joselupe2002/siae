
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
                    $this->MultiCell($w,5,$data[$i],0,$a);
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
			
			

			function Footer()
			{				
               
			
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
                $this->Ln(15);

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
                $this->Ln(15);
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

                $this->Ln(15);  
                $this->SetFont('Montserrat-Black','',8); 
                $this->SetFillColor(1,68,106);
                $this->SetTextColor(255);  
                $this->Cell(170,5,utf8_decode("OBSERVACIONES"),1,0,'C',true);
                $this->Ln(5);
                $this->SetFont('Montserrat-Medium','',8);   
               
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(170));
                $this->Cell(170,5,utf8_decode("Exámen Nacional de Ingreso a la Educación Superior: ".
                                             $dataCiclo[0]["CICL_FECHAADMISION"]. "   Hora: ".$dataCiclo[0]["CICL_HORADMISION"]),'LR',1,'L',false);
                $this->Cell(170,5,utf8_decode("Favor de presentarse 30 Min. antes del Exámen con: "),'LR',1,'L',false);
                $this->Cell(170,5,utf8_decode("Formato Impreso con la clave de registro CENEVAL "),'LR',1,'L',false); 
                $this->Cell(170,5,utf8_decode("Lápiz Mirado No. 2"),'LR',1,'L',false);                                             
                $this->Cell(170,5,utf8_decode("Sacapuntas"),'LR',1,'L',false);  
                $this->Cell(170,5,utf8_decode("Borrador"),'LR',1,'L',false); 
                $this->Cell(170,5,utf8_decode("Identificación con Fotografía"),'LR',1,'L',false);  
                $this->Cell(170,5,utf8_decode("Solictud impresa de la Ficha"),'LR',1,'L',false);   
                $this->Cell(170,5,utf8_decode("Cálculadora básica"),'LR',1,'L',false);
                $this->Cell(170,5,utf8_decode("NOTA: ES REQUISITO PARA SU INSCRIPCIÓN LLEVAR LOS CURSOS DE INDUCCIÓN"),'LRB',1,'L',false);

/*
                $this->SetFont('Montserrat-SemiBold','B',10);
                $this->setX(50);
                $this->Cell(0,4,utf8_decode('CARGA ACADÉMICA'),0,0,'L');

                $this->setX(140);
                $this->Cell(0,4,utf8_decode('PERIODO:'),0,0,'L');
                $this->setX(170);
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(0,4,utf8_decode($dataCiclo[0][1]),0,1,'L');

                $fecha=date("d/m/Y"); 
                $this->SetFont('Montserrat-SemiBold','B',10);
                $this->setX(50);
                $this->Cell(0,4,utf8_decode('FECHA DE IMPRESIÓN:'),0,0,'L');
                $this->setX(100);
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(0,4,utf8_decode($fecha),0,0,'L');
                
                $this->setX(140);
                $this->Cell(0,5,utf8_decode('FECHA INS:'),0,0,'L');
                $this->setX(170);
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(0,4,utf8_decode($data[0]["FECHAINS"]),0,1,'L');

                $this->SetFont('Montserrat-Black','B',10);
                $this->setX(20);
                $this->Cell(30,4,utf8_decode($dataAlum[0]["ALUM_MATRICULA"]),0,0,'L');
                $this->Cell(90,4,utf8_decode($dataAlum[0]["NOMBRE"]),0,0,'L');
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(30,4,utf8_decode("NPRDO:"),0,0,'L');
                $this->Cell(30,4,utf8_decode($dataAlum[0]["PERIODOS"]),0,1,'L');

                $this->SetFont('Montserrat-Black','B',10);
                $this->setX(20);
                $this->Cell(30,4,utf8_decode("CARRERA:"),0,0,'L');
                $this->SetFont('Montserrat-SemiBold','',8);
                $this->Cell(90,4,utf8_decode($dataAlum[0]["CARRERAD"]),0,0,'L');
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(30,4,utf8_decode("CREDITOS:"),0,0,'L');
                $this->Cell(30,4,utf8_decode($dataCreditos[0][0]),0,1,'L');

                $this->Ln(2);
                $this->SetFillColor(172,31,8);
                $this->SetTextColor(255);  
                $this->SetFont('Montserrat-ExtraBold','B',7);
                $this->Cell(15,3,'CLAVE',1,0,'C',true);
                $this->Cell(70,3,'MATERIA/DOCENTE',1,0,'C',true);
                $this->Cell(15,3,'LUNES',1,0,'C',true);
                $this->Cell(15,3,'MARTES',1,0,'C',true);
                $this->Cell(15,3,'MIERCOLES',1,0,'C',true);
                $this->Cell(15,3,'JUEVES',1,0,'C',true);
                $this->Cell(15,3,'VIERNES',1,0,'C',true);
                $this->Cell(15,3,'SABADO',1,0,'C',true);
                $this->Cell(15,3,'DOMINGO',1,0,'C',true);
                $this->Cell(7,3,'C/A',1,0,'C',true);
                $this->Ln();

                $this->SetFont('Montserrat-Medium','',6);       
                $this->SetFillColor(172,31,6);
                $this->SetTextColor(0);
                $this->SetWidths(array(15,70,15, 15,15,15,15,15,15,7));
                $n=1;
                foreach($data as $row) {
                    $st="";
                    if ($row["REP"]==1) {$st="R";}
                    if ($row["REP"]>1) {$st="E";}
                    $this->Row(array( utf8_decode($row["MATERIA"]." ".$row["GRUPO"]),
                                    utf8_decode($row["MATERIAD"]."\n".$row["PROFESORD"]),
                                    utf8_decode($row["LUNES"]),
                                    utf8_decode($row["MARTES"]),
                                    utf8_decode($row["MIERCOLES"]),
                                    utf8_decode($row["JUEVES"]),
                                    utf8_decode($row["VIERNES"]),
                                    utf8_decode($row["SABADO"]),
                                    utf8_decode($row["DOMINGO"]),
                                    $st
                                    )
                            );
                    $n++;
                }

                $miutil = new UtilUser();
                $nombre=$miutil->getJefe('303');//Nombre del puesto de control escolar7

                $this->SetFont('Montserrat-Medium','',6);
                $this->Cell(0,5,utf8_decode("NOTA:ACEPTO TODAS LAS CONDICIONES DEL REGLAMENTO PARA ALUMNOS DEL INSTITUTO ". 
                "TECNOLÓGICO SUPERIOR DE MACUSPANA"),'',0,'C');
                $this->Ln(2);
                $this->Cell(0,5,utf8_decode("LAS MATERIAS INDICADAS CON * NO CUMPLEN CON EL PERIODO REQUERIDO"),'',0,'C');

                $this->SetFont('Montserrat-ExtraBold','',8);
                
                $this->setX(10);$this->setY(($linea+122));        
                $this->Cell(80,5,utf8_decode($nombre),'T',0,'L');
                $this->setX(10);$this->setY(($linea+125));
                $this->SetFont('Montserrat-SemiBold','',8);
                $this->Cell(0,5,"JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES",'',0,'L');

            
                $this->setX(0);$this->setY(140);
                $this->SetFont('Montserrat-SemiBold','',10);
                $this->Cell(0,1,"",'B',0,'L');
                */



            }

		}
		
		$pdf = new PDF('P','mm','Letter');
		header("Content-Type: text/html; charset=UTF-8");
		
		$pdf->SetFont('Arial','',10);
		$pdf->SetMargins(20, 25 , 25);
		$pdf->SetAutoPageBreak(true,30); 
        $pdf->AddPage();
         
        $pdf->ficha(0);
        
 
        $pdf->Output(); 


 } else {header("Location: index.php");}
 
 ?>
