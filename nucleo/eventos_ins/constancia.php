
<?php session_start(); 
	header('Content-Type: text/html; charset=ISO-8859-1');
	require('../../fpdf/fpdf.php');
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
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


		 
   	
   	        var $eljefe="";
   	        var $elid="";
   	        var $eljefepsto="";
 
   	
			function LoadData()
			{				
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("Mysql","SELECT * from veventos_ins where ID='".$_GET["id"]."'");				
				foreach ($resultado as $row) {
					$data[] = $row;
				}
				return $data;
			}
			
			function LoadDatosGen()
			{
				$miConex = new Conexion();
				$resultado=$miConex->getConsulta("SQLite","SELECT * from INSTITUCIONES where _INSTITUCION='ITSM'");
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
		$pdf->SetAutoPageBreak(true,30); 
		$pdf->AddPage();

		$data = $pdf->LoadData();
		$dataGen = $pdf->LoadDatosGen();

		

		$top1=257; $top2=253; $left1=20; $left2=190; $left3=180;

		$pdf->Image('../../imagenes/empresa/fondo.png',0,0,187,275);
		$pdf->Image('../../imagenes/empresa/enc1.png',30,20,90);
		$pdf->Image('../../imagenes/empresa/enc2.png',130,17,40);

		$pdf->AddFont('Montserrat-Black','B','Montserrat-Black.php');
		$pdf->AddFont('Montserrat-Black','U','Montserrat-Black.php');
		$pdf->AddFont('Montserrat-Black','','Montserrat-Black.php');
		$pdf->AddFont('Montserrat-Medium','B','Montserrat-Medium.php');
		$pdf->AddFont('Montserrat-Medium','','Montserrat-Medium.php');
		$pdf->AddFont('Montserrat-SemiBold','','Montserrat-SemiBold.php');
		$pdf->AddFont('Montserrat-SemiBold','B','Montserrat-SemiBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','B','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','U','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraBold','I','Montserrat-ExtraBold.php');
		$pdf->AddFont('Montserrat-ExtraLight','I','Montserrat-ExtraLight.php');
		$pdf->AddFont('Montserrat-ExtraLight','','Montserrat-ExtraLight.php');
	
		
		$pdf->SetFont('Montserrat-ExtraBold','B',18);
		$pdf->setY(50);
		$pdf->Cell(0,0,utf8_decode("EL TECNOLÓGICO NACIONAL DE MÉXICO"),0,1,'C');
		$pdf->ln(10);
		$pdf->SetFont('Montserrat-ExtraBold','B',14);
		$pdf->Cell(0,0,utf8_decode("A TRAVÉS DEL INSTITUTO TECNOLÓGICO SUPERIOR DE MACUSPANA"),0,1,'C');
		//$pdf->SetTextColor(5,27,149);
		$pdf->ln(15);
		$pdf->Cell(0,0,"ORTORGA LA PRESENTE:",0,1,'C');
		$pdf->SetFont('Montserrat-Medium','B',14);
		$pdf->ln(30);
		$pdf->SetFont('Montserrat-ExtraBold','B',30);
		$pdf->Cell(0,0,"CONSTANCIA",0,1,'C');
		$pdf->ln(20);
		
		

		$pdf->SetTextColor(0,0,0);
		$pdf->SetFont('Montserrat-ExtraBold','B',20);
		$pdf->Cell(0,0,"AL ",0,0,'C');
		$pdf->ln(10);
		$pdf->SetFont('Montserrat-ExtraBold','B',24);
		$pdf->Cell(0,1,utf8_decode($data[0]["GRADO"]." ".$data[0]["NOMBRE"]),0,1,'C');
	

		$pdf->ln(15);
		$pdf->SetFont('Montserrat-Medium','',11);
		$pdf->MultiCell(170,5,utf8_decode(strtoupper($data[0]["LEYENDA"])),0,'C', false);


		$miutil = new UtilUser();
		$fechadec=$miutil->formatFecha($data[0]["FECHAEXP"]);
		$lafecha="MACUSPANA, TABASCO A ".date("d", strtotime($fechadec))." DE ".strtoupper($miutil->getFecha($fechadec,'MES')). " DEL ".date("Y", strtotime($fechadec));
		
		$pdf->ln(10);
		$pdf->SetFont('Montserrat-ExtraLight','',10);
		$pdf->Cell(0,0,$lafecha,0,1,'R', false);


		


		//Logo del Evento 
		$dataFoto=$data[0]["EVENTOSLOGO"];
		  //  echo $dataFoto[0][0];
		  if (!empty($dataFoto)) { 
			$lafoto=$dataFoto; 
			$logo = file_get_contents($lafoto);
			$pdf->MemImage($logo,15,67,40);
		}


		$pdf->Image('../../imagenes/empresa/enc3.png',20,255,10);
		$pdf->Image('../../imagenes/empresa/logo3.png',160,255,35);

		
		if (($_GET["tipo"]=='1') || ($_GET["tipo"]=='2'))  {
			if (!empty($data[0]["IMGFIRMA"])) { $lafirma = file_get_contents($data[0]["IMGFIRMA"]); $pdf->MemImage($lafirma,95,210,50);}
			if (!empty($data[0]["IMGSELLO"])) { $lafirma = file_get_contents($data[0]["IMGSELLO"]); $pdf->MemImage($lafirma,170,205,40);}
		}

	
		$pdf->SetFont('Montserrat-ExtraBold','B',13);
		$pdf->setY(240);
		$pdf->Cell(0,0,utf8_decode($data[0]["FIRMAD"]),0,1,'C', false);

		$pdf->setY(245);
		$pdf->Cell(0,0,utf8_decode($data[0]["PSTO"]),0,1,'C', false);

		$pdf->SetFont('Montserrat-Medium','B',8);
		$pdf->setY(248);
		$pdf->Cell(0,0,utf8_decode($data[0]["FOLIO"]),0,1,'R', false);


		if (($_GET["tipo"]=='0') || ($_GET["tipo"]=='1'))  { $pdf->Output(); }
		if ($_GET["tipo"]=='2') {
			$doc = $pdf->Output('', 'S');
			?>
		       <html lang="en">
	               <head>
						<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
						<meta charset="utf-8" />
						<link rel="icon" type="image/gif" href="imagenes/login/sigea.ico">
						<title>Sistema de Gesti&oacute;n Escolar-Administrativa</title>
						<meta name="description" content="User login page" />
						<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
						<link rel="stylesheet" href="../../assets/css/bootstrap.min.css" />
						<link rel="stylesheet" href="../../assets/font-awesome/4.5.0/css/font-awesome.min.css" />
						<link rel="stylesheet" href="../../assets/css/select2.min.css" />
						<link rel="stylesheet" href="../../assets/css/fonts.googleapis.com.css" />
					    <link rel="stylesheet" href="../../assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
						<link rel="stylesheet" href="../../assets/css/ace-rtl.min.css" />		
						<script src="../../assets/js/ace-extra.min.js"></script>		
						<link rel="stylesheet" href="../../assets/css/jquery-ui.min.css" />
	                </head>
	      <?php 
				
						$res=$miutil->enviarCorreo($data[0]["CORREO"],'SIGEA:ITSM CONSTANCIA '.$data[0]["EVENTOPRIND"].$data[0]["EVENTOD"],
						'Por medio de la presente se le hace llegar su constancia de participación en el evento: '.$data[0]["EVENTOD"]."br>".
						'En el marco del : '.$data[0]["EVENTOPRIND"]."<br>".
						' <br/> En adjunto encontrará su constancia debidamente firmada y sellada. ',$doc);	
						if ($res=="") {echo "<span class=\"label label-success arrowed\">Correo Eviado a: ". $data[0]["NOMBRE"]." ". $data[0]["CORREO"]."</span><br/><br/>"; }
						else { echo "0<span class=\"label label-danger arrowed-in\">".$res."</span><br/><br/>"; }
						$miConex = new Conexion();
						$res=$miConex->afectaSQL($_SESSION['bd'],"UPDATE eventos_ins set ENVIADA='S' where ID='".$_GET["id"]."'");
						echo "resultado:".$res;
				
		}
 
 ?>
