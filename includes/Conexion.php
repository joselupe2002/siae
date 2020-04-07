<?php
header("Content-Type: text/html;charset=UTF-8");
class Conexion {
	
	public $db;
	public $user;
	public $password;
	public $server;
	public $nivel;


	public function __construct() 
	{
		
		/*
		 * 
		//Base de datos oracle 
		$this->server='localhost';
		$this->user='|HnCgE866877667666888867887688788778688D';
		$this->password='~JiHeC788786667868877786877776778878877D';		
		$this->db='bdupc';
		for($i=1;$i <= substr_count($_SERVER['PHP_SELF'],'/')-2;$i++){$this->nivel.= "../";}
		
		*/
		
		
		
		//Base de datos Mysql
		$this->server='localhost';
		//$this->user='uDjFvHnG8786887868768778888887888877766E';   //Base de datos Local
		//$this->password='878667768788667786788787887867878767878A'; //Base de datos Local
	

		$this->user='kHsEjFyF87777887776886878887887878768667E';
		$this->password='DJfFgHfCpCiIeGmI6BAJ#B877778787867868768L';
		$this->db='sigea';
		
		$entre=false;
		for($i=1;$i <= substr_count($_SERVER['PHP_SELF'],'/')-2;$i++){$this->nivel.= "../"; $entre=true;}
		if ((!($_SERVER["SERVER_NAME"] == "localhost")) && ($entre)) {$this->nivel.= "../";}
	}
	
	public function tipoConex($tipoBD){
		$miSeg = new Conexion();
		$laClave=$miSeg->desencriptar($this->password);
		$elUser=$miSeg->desencriptar($this->user);
		
		if ($tipoBD=="SQLite") {
			try { $conn =new PDO("sqlite:".$this->nivel."bdatos"."/sigea.sq3");} 
		    catch (PDOException $e) {
		    	  echo "ERROR: ".$e->getMessage(). $this->nivel."bdatos"."/sigea.sq3";
			      die();} 
		                        }
		if ($tipoBD=="Oracle") { 
			try { 
			     $conn =new PDO("oci:dbname".$this->db,$elUser,$laClave);}
			catch (PDOException $e) {
			     	echo "ERROR: ".$e->getMessage();
			     	die();}
		}
		if ($tipoBD=="Mysql") { 
			
			try { 
			   $conn =new PDO("mysql:host=localhost;dbname=".$this->db, $elUser,$laClave);
			   }
		    catch (PDOException $e) {
			   	echo "ERROR: ".$e->getMessage();
			   	die();}
		}
		return $conn;
	}
	
	public function getConsulta($tipoBD,$elSQL) {
		 $datos = array();	
		 $miSeg = new Conexion();
		 $conn=$miSeg->tipoConex($tipoBD); 
		 try
		 {		 	
		 	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		 	
		 	$stm = $conn->prepare($elSQL);
		 	

		 	$stm->execute();
		 	while ($row = $stm->fetch(PDO::FETCH_BOTH)) {
		 		$datos[] = $row;
		 		
		 	}
		 	$stm->closeCursor();
		 	$stm= null;
		 	$conn = null;
		 	
		    return $datos;
		    
		 }
		 catch ( PDOException $e )
		 {  echo "Error: ".$e->getMessage( )/*." SQL: ".$elSQL*/;  }
	}

	
	public function afectaSQL($tipoBD,$elSQL) {	
		$miSeg = new Conexion();
		$error="";
		$conn=$miSeg->tipoConex($tipoBD);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		try
		{   
			$stm = $conn->prepare($elSQL);
			$stm->execute();			
			$stm= null;
			$conn = null;
		}
		catch ( PDOException $e )
		{ $error="Error: ".$e->getMessage( )/*." SQL: ".$elSQL*/;}
		return $error;
	}
	
public function afectaSQL_conex($conex,$tipoBD,$elSQL) {
		$miSeg = new Conexion();
		$error="";
		$conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		try
		{
			$stm = $conex->prepare($elSQL);
			$stm->execute();
			$stm= null;
		}
		catch ( PDOException $e )
		{ $error="Error: ".$e->getMessage( )/*." SQL: ".$elSQL*/;}
		return $error;
	}
	
	
	
	public function desencriptar($s)
	{
		$s1="";
		$j=0;$cont=0;$pos=0;
		$ban=true;
		$ch;
		if (ord($s[0])==1){ $ban=false; $pos=2;}
		else {$ban=true; $pos=1;}
		$ch=$s[40];
		$k=ord($ch)-65;
		$cont=1;
		while (strlen($s1)<$k) {
			$ch=$s[$pos];
			$j=ord($ch)-65;
			$ch=$s[$pos-1];
			if ($ban) {
				if (($cont%2)==0) { $s1=$s1.chr(ord($ch)-$j);}
				else { $s1=$s1.chr(ord($ch)+$j);}
			}
			else {
				if (($cont%2)==0) {  $s1=$s1.chr(ord($ch)+$j);}
				else {  $s1=$s1.chr(ord($ch)-$j);}
			}
			$pos+=2;
			$cont++;
		}
		
		return $s1;
	}
	
	
	public function encriptar ($s) {
		$s1="";
		$j=0;$cont=0;$pos=0;
		$ban=true;
		$ch;
		$password =array(42);
		
		$s1=$s;
		$k= rand(1,9);
		
		$ban=(($k%2)==0);
		$pos=($k%2)+1;
		$cont=1;
		
		while (strlen($s)>0) {
			$j=rand(1,9);
			if ($ban) {
				if (($cont%2)==0){$password[$pos-1]=ord($s[0])+$j;}
				else {$password[$pos-1]=ord($s[0])-$j;}
				$password[$pos]=65+$j;
			}
			else {
				if (($cont%2)==0){$password[$pos-1]=ord($s[0])-$j;}
				else {$password[$pos-1]=ord($s[0])+$j;}
				$password[$pos]=65+$j;
			}
			$s=substr($s,1);
			$pos+=2;
			$cont++;
		}
		
		if($ban) {for ($j=$pos-1;$j<=39;$j++) {$password[$j]=ord(rand(1,24)+65);}}
		else { for ($j=$pos-1;$j<=40;$j++) {$password[$j]=ord(rand(1,24)+65);}}
		if (!($ban)) { $password[0]=1;}
		
		$password[40]=strlen($s1)+65;
		$s1="";
		for ($j=0;$j<=40;$j++){ $s1=$s1.chr($password[$j]); }
		return $s1;
	}
	
}