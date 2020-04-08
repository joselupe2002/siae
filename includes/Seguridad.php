<?php
header("Content-Type: text/html;charset=ISO-8859-1");
class Seguridad {
	
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