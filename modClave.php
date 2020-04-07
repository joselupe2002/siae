<?php session_start(); if ($_SESSION['inicio']==1) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	include("./includes/Conexion.php");
	include("./includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="imagenes/login/sigea.png";
	$nivel="";
	?> 
<!DOCTYPE html>
<html lang="en" >
  <head>
	    <link rel="icon" type="image/gif" href="imagenes/login/sigea.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="<?php echo $_SESSION['encode'];?>" />
		<link href="imagenes/login/sigea.png" rel="image_src" />
		<title><?php echo $_SESSION["titApli"];?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600' rel='stylesheet' type='text/css'>		
		
		<!---------------------1----------------------------->
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/font-awesome/4.5.0/css/font-awesome.min.css" />
	
	     <!--------------------2----------------------------->
	    <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery-ui.min.css" />
	    <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/select2.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/chosen.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-datepicker3.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-datetimepicker.min.css" />			
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-colorpicker.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ui.jqgrid.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-select.css">	
		
		
		<!---------------------3------ultimos--------------------->
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/fonts.googleapis.com.css" />			
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-rtl.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />	
			
	</head>
    <body style="background-color: white;">  
       <div  style="display: flex; text-align: center; justify-content: center; aling-items: center; width: 100%; border: 1px; "> 
         <div  class="row" style="text-align: center;">
			  <div class="col-sm-4">
				   <div class="widget-box" style="width:200px;">
				       
					    <div class="widget-header"><h4 class="smaller">Modificaci&oacute;n de clave</h4></div>
					    <div class="widget-body">
						    <div class="widget-main">
						       <form style="width: 100%" method="post" id="frmReg" name="frmReg">
		                             <fieldset>
					                     <div class="row">
					                         <div class="col-sm-12">
					                              <input type="password" name="passAnt" id="passAnt" placeholder="Contrase&ntilde;a Anterior"  autocomplete="off" required/>	
					                         </div>
					                     </div>
					                     <div class="space-10"> </div>
					                     <div class="row">
					                          <div class="col-sm-12">
					                              <input type="password" name="pass" id="pass" placeholder="contrase&ntilde;a Nueva"  autocomplete="off" required/>	
					                         </div>
					                     </div>
					                     <div class="space-10"> </div>
					                     <div class="row">
					                          <div class="col-sm-12">
					                              <input type="password" name="pass2" id="pass2" placeholder="Confirmar contrase&ntilde;a"  autocomplete="off" required/>	
					                         </div>
					                     </div>
					                     <div class="space-10"> </div>
	                                 </fieldset>
	                             </form>
			                     <div class="row" >
			                         <button   onclick="cambiarClave();" class="btn btn-white btn-info btn-bold"><i class="ace-icon fa fa-lock bigger-120 blue"></i>Cambiar</button>			                          
			                     </div>
			                </div>
					    </div>
					    
			       </div>
			  </div><!-- /.col -->
	     </div> <!-- /.row -->
    </div>
	<script src="assets/js/jquery-2.1.4.min.js"></script>
         <script type="text/javascript"> 
		     if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>		
		<script src="assets/js/bootstrap.min.js"></script>	
		<script src="assets/js/jquery-ui.custom.min.js"></script>
        <script src="assets/js/jquery-ui.min.js"></script>        
        <script src="assets/js/ace-elements.min.js"></script>
        <script src="assets/js/ace.min.js"></script>
        <script type="text/javascript" src="easyUI/jquery.min.js"></script>
        <script type="text/javascript" src="easyUI/jquery.easyui.min.js"></script>
         <script type="text/javascript" src="easyUI/jquery.easyui.min.js"></script>
        <script type="text/javascript" src="assets/js/jquery.validate.min.js"></script>
        <script src="js/sha/sha512.js"></script>

        
 	<script type="text/javascript">       


 	jQuery(function($) { 
		$.validator.setDefaults({
			 ignore: [],
			 rules: {
		            passAnt: { required: true, minlength: 1, remote:'nucleo/base/checkusuario.php' },
		            pass: { required: true, minlength: 1},
		            pass2:{ required: true, minlength: 1, equalTo: "#pass"},  
		        },
		        messages: {
		        	passAnt:  {  
			        	remote: "El password no es correcto",
                        required: "Campo requerido: Password anterior",  
                        minlength:   "L&oacute;ngitud M&iacute;nima: 6"  
                     },  
		            pass:  {  
                        required: "Campo requerido: Password",  
                        minlength:   "L&oacute;ngitud M&iacute;nima: 6"  
                     },    
                    pass2:  {  
                         required: "Campo requerido: Confirmaci&oacute;n",  
                         minlength:   "L&oacute;ngitud M&iacute;nima: 6",
                         equalTo:   "Las contrase&ntilde;as no coinciden" 
                      },  
		        },
		});
		
      });

 	


 	function sonvalidos(formulario){
		var noval = 0;
		$(formulario).find("input, select").each(function () {			
		    if (!($(this).valid())) {noval++; ultimo=$(this).attr("id");}     
		});
		if (noval>0) {return ultimo;}
		else {return "";}		
	}

    function cambiarClave(){
       
    	var form = $( "#frmReg" );
    	form.validate();
		campo=sonvalidos(form);
		if (form.valid()) {
			 encrip=sha512($("#pass2").val());

			 parametros={
					 tabla:"CUSUARIOS",
					 campollave:"usua_usuario",
					 valorllave:"<?php echo $_SESSION['usuario'];?>",
					 bd:"SQLite",
					 usua_clave:encrip		
					 };

			 $.ajax({
			        type: "POST",
			        url:"nucleo/base/checkusuario.php?passAnt="+$("#passAnt").val(),
			        data: parametros,
			        success: function(data){	
			        			                                	                      
			           if (data=="true") {			        	   
			        	     $.ajax({
			   		               type: "POST",
					   		        url:"nucleo/base/actualiza.php",
					   		        data: parametros,
					   		        success: function(data){	
					   		        	$('#myTab').tabs('close', 'Clave');   
					   		        	form.trigger("reset");                             	                     
					   		            if (!(data.substring(0,1)=="0"))	
					   		                 { 						                  
					   		                  alert ("El password se asigno corectamente");
					   		                  }	
					   		            else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
					   		        }					     
			   		        }); 

				           } 
			           else
			           {  alert ("La clave actual no es correcta");}   					           
			        }					     
			    }); 
              

			}
   }
    


</script>

    </body>
</html>
<?php } else {header("Location: index.php");}?>