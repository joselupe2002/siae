<?php session_start(); if ($_SESSION['inicio']==1) {
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";
	$nivel="../../";
	?> 
	<head>
	    <link rel="icon" type="image/gif" href="imagenes/login/sigea.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<link href="imagenes/login/sigea.png" rel="image_src" />
		<title>Sistema Gesti&oacute;n Escolar - Administrativa</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		
	
	  <link rel="stylesheet" href="../../assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="../../assets/font-awesome/4.5.0/css/font-awesome.min.css" />
		<link rel="stylesheet" href="../../assets/css/fonts.googleapis.com.css" />
		<link rel="stylesheet" href="../../assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link rel="stylesheet" href="../../assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="../../assets/css/ace-rtl.min.css" />
        <link rel="stylesheet" href="../../assets/css/jquery-ui.min.css" />
        <script src="../../assets/js/ace-extra.min.js"></script>

	
		
	</head>

<body id="cuerpo" style="background-color: white;">
  <button onclick="dameFechasEval();"> Materias</button>      
  <textarea id="sql" cols="160" rows="10"></textarea>
  <textarea id="sql2" cols="160" rows="10"></textarea>
  <button onclick="agregar();"> Ejecutar</button>


<div style="padding: 0; width: 100px;">	
  <div class="row">
      <div class="col-md-6" style="padding: 0;">
          <select style="width:100%;  font-size:11px;  font-weight:bold; color:#0E536C;"></select>
      </div>
     <div class="col-md-6" style="padding: 0;">
        <input   class= "small form-control input-mask-horario"  style="width:100%; height: 30px;" type="text"></input>
     </div>
  </div>
</div>	

<?php phpinfo(); ?>


    
    
<!-- -------------------Primero ----------------------->
<script src="<?php echo $nivel; ?>assets/js/jquery-2.1.4.min.js"></script>
<script type="<?php echo $nivel; ?>text/javascript"> if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");</script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>

<!-- -------------------Segundo ----------------------->
<script src="<?php echo $nivel; ?>assets/js/jquery-ui.custom.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.dataTables.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.dataTables.bootstrap.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/dataTables.buttons.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.flash.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.html5.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.print.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.colVis.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-select.js"></script>


<script src="<?php echo $nivel; ?>assets/js/jquery.ui.touch-punch.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/chosen.jquery.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/dataTables.select.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-timepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/moment.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/daterangepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datetimepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-colorpicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.knob.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/autosize.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.inputlimiter.min.js"></script>
<script src="<?php echo $nivel; ?>js/mask.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-tag.min.js"></script>


<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>


<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>

<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>

<script src="<?php echo $nivel; ?>assets/js/jquery.gritter.min.js"></script>




<script type="text/javascript">

/*
$(document).ready(function() {
    $('#example').DataTable( {
        "scrollY": 200,
        "scrollX": true
    } );
} );

function prueba(){
	getHash();
//	$('#otro').val(['AK','AZ']).trigger('chosen:updated');
	//$("#otro").val();
}


function getHash(){
	console.log(sha512('JOSE'));
	//form.submit();
}




function ver(){

	script=
		 "<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">"+ 
		 "   <div class=\"modal-dialog modal-lg \"  role=\"document\">"+
		 "     <div class=\"modal-content\">"+
		 "         <div class=\"modal-header\">"+
		 "            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		 "                 <span aria-hidden=\"true\">&times;</span>"+
		 "            </button>"+
		 "         </div>"+
		 "        <div id=\"frmdocumentos\" class=\"modal-body\"  style=\"max-height: calc(100vh - 210px); overflow-y: auto;\">"+
		 "             <div class=\"widget-box widget-color-green2\">"+
		 "	              <div class=\"widget-header\"><h4 class=\"widget-title lighter smaller\">Permisos</h4></div>"+
		 "                <div class=\"widget-body\" style=\" max-height: calc(100vh - 210px); overflow-y: auto;\">"+
		 "				          <div class=\"main-container ace-save-state\" id=\"main-container\">"+
		 "		                       <div id=\"sidebar\" style=\"width:100%;\" class=\"sidebar  ace-save-state\">	"+		
		"			                       <ul  style=\"width: 100%\" id=\"miMenu\" class=\"nav nav-list\" ></ul>"+
		"		                       </div>"+
		"                         </div>"+
		"	               </div>"+
		"             </div>"+
		"        </div>"+
		"      </div>"+
		"  </div>"+
		"</div>";

		$("body").append(script);
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});

	    jQuery.each(data, function(clave, valor){

			   cad=""; cadsm="";
			   
			   laimg="menu-icon fa fa-caret-right";
			   if (valor.modu_imaico.length>0){laimg=valor.modu_imaico;}
			                                
			   if (valor.modu_ejecuta=="1") {
				    laClase_a="opExec"; 
			        elclick="";
			        laClase_b="arrow";
			        submenu="";
			        check= "<div class= \"row\"><div class=\"col-sm-12\"><strong><label class=\"text-success\" style=\"Font-weight:bold\" for=\"c_"+valor.modu_modulo+"\">"+valor.modu_descrip+"</label></strong></div></div>"+
				           "<div class= \"row\">"+
				           "<div class=\"col-sm-3\"><input id=\"d_"+clave+"\" pred=\""+valor.modu_pred+"\" modulo=\""+valor.modu_modulo+"\" type=\"checkbox\">Det</div>"+
			               "<div class=\"col-sm-3\"><input id=\"i_"+clave+"\" pred=\""+valor.modu_pred+"\" modulo=\""+valor.modu_modulo+"\" type=\"checkbox\">Ins</div>"+
			               "<div class=\"col-sm-3\"><input id=\"m_"+clave+"\" pred=\""+valor.modu_pred+"\" modulo=\""+valor.modu_modulo+"\" type=\"checkbox\">Mod</div>"+
			               "<div class=\"col-sm-3\"><input id=\"e_"+clave+"\" pred=\""+valor.modu_pred+"\" modulo=\""+valor.modu_modulo+"\" type=\"checkbox\">Eli</div>"+
			               "</div>";
			              
                  descrip="";
		               }
			   else {laClase_a="dropdown-toggle"; 
			         elclick="";
			         descrip=valor.modu_descrip;
			         check="";
			         submenu=" <b class='arrow fa fa-angle-down'></b>"; 
                  cadsm="<ul class='submenu'  id='S_"+valor.modu_modulo+"'></ul>";				        	      
			   }

			   if (valor.modu_pred==" ") {estilo="menu-text"; padre="style=\"font-weight:bold;\""} else {estilo=""; padre="";} 
			   
			           cad="<li descrip='"+valor.modu_descrip+"' id='"+valor.modu_modulo+"' class=''>\n"+
			                    "<a class='"+laClase_a+"' "+elclick+" style='cursor: pointer;'>\n"+
			                         "<i class='"+laimg+"'></i> \n"+
                                "<span class='"+estilo+"' "+padre+">"+check+descrip+"</span>"+
                                submenu+"\n"+
                           "</a>\n"+
                           cadsm+
                        "</li> \n";
						    
                   if (valor.modu_pred==" ") {$("#miMenu").append(cad);}
                   else {$("#S_"+valor.modu_pred).append(cad);} 
                       					          
			});
	
}



   function agregar(){
       datos=$("#sql").val().split(";");
       for (i=0;i<datos.length;i++) {
            
       $.ajax({
           type: "GET",
           url:  "../base/ejecutasql.php?sql="+datos[i],
           success: function(data){ 
           	     
        	   $("#sql2").val( $("#sql2").val()+" "+data);

           }
       });
       	 
	   }
   }


   function pad(n, width, z) {
	   z = z || '0';
	   n = n + '';
	   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	 }
	 


   function dameMaterias(){
	   $.ajax({
	       type: "GET",
	       url:  "../base/getdatossql.php?bd=Mysql&sql=SELECT * from dmateria3 ",
	       success: function(data){  
	    	      losdatos=JSON.parse(data);	 
	    	      		    	   
	    	      jQuery.each(losdatos, function(clave, valor) { 
	    	    	   for (x=1; x<=valor.MATUNI; x++) {
		    	    	     cad="insert into eunidades (unid_materia,unid_pred,unid_numero,unid_descrip, _INSTITUCION,_CAMPUS) values ('"+
		    	    	     valor.MATCVE+"','','"+pad(x,2)+"','"+valor[10+x].replace(/\n|\r/g, " ").replace(";","")+"','ITSM','0');\n";		    	    	     
                             $("#sql").append(cad);
		    	    	   }
	    	    	 
	    	      });		    
	
	
	             },
	       error: function(data) {	                  
	                  alert('ERROR: '+data);
	              }
	});

	   
	   }



  


   function dameFechasEval(){
	   $.ajax({
	       type: "GET",
	       url:  "../base/getdatossql.php?bd=Mysql&sql=select a.MATCVE, a.GPOCVE, b.MATUNI, UNI01P,UNI02P,UNI03P,UNI04P,UNI05P,UNI06P,UNI07P,"+
	    	   "UNI08P,UNI09P,UNI10P,UNI11P,UNI12P,UNI13P,UNI14P,UNI15P, "+
	    	   "UNI01R,UNI02R,UNI03R,UNI04R,UNI05R,UNI06R,UNI07R,"+
	    	   "UNI08R,UNI09R,UNI10R,UNI11R,UNI12R,UNI13R,UNI14R,UNI15R"+
	    	   " from dgrupo a, dmateria3 b  where PDOCVE=2201 and a.MATCVE=b.MATCVE order by MATCVE,GPOCVE",
	    	   
	       success: function(data){  
	    	      losdatos=JSON.parse(data);	 
	    	      		    	   
	    	      jQuery.each(losdatos, function(clave, valor) { 
	    	    	   for (x=1; x<=valor.MATUNI; x++) {
		    	    	     cad="insert into eplaneacion (MATERIA,PROFESOR,GRUPO,IDUNIDAD,NUMUNIDAD,FECHA,FECHAR,_INSTITUCION,_CAMPUS) values ('"+
		    	    	     valor.MATCVE+"','','"+valor.GPOCVE+"','','"+pad(x,2)+"','"+valor[2+x].replace(/\n|\r/g, " ").replace(";","")+"','"+valor[17+x].replace(/\n|\r/g, " ").replace(";","")+"','ITSM','0');\n";		    	    	     
                             $("#sql").append(cad);
		    	    	   }
	    	    	 
	    	      });		    
	
	
	             },
	       error: function(data) {	                  
	                  alert('ERROR: '+data);
	              }
	});

	   
	   }


   function damesubtemas(){
	   $.ajax({
	       type: "GET",
	       url:  "../base/getdatossql.php?bd=Mysql&sql=SELECT * from smater  order by MATCVE,TMACVE LIMIT 15000,5000",
	       success: function(data){  
	    	      losdatos=JSON.parse(data);	
	    	      alert (data); 
	    	      		    	   
	    	      jQuery.each(losdatos, function(clave, valor) { 
		    	    	     cad="insert into eunidades (unid_materia,unid_pred,unid_numero,unid_descrip, _INSTITUCION,_CAMPUS) values ('"+
		    	    	     valor.MATCVE+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.SMADES.replace(/\n|\r/g, " ").replace(";","")+"','ITSM','0');\n";		    	    	     
                             $("#sql").append(cad);
	    	      });		    
	
	
	             },
	       error: function(data) {	                  
	                  alert('ERROR: '+data);
	              }
	});

	   
	   }


   function guardar(){
	   var losmodulos=[]; var cad=""; var entre=false;
	   c=0;
	   permpred='|S|S|S|S';
	   jQuery.each(data, function(clave, valor){
           cad="";
           entre=false;
		   modulo=$("#d_"+clave).attr("modulo");
		   pred=$("#d_"+clave).attr("pred");
		   
		   if ($("#d_"+clave).prop('checked')) {cad+="|S"; entre=true;} else {cad+="|N";}
		   if ($("#i_"+clave).prop('checked')) {cad+="|S"; entre=true;} else {cad+="|N";}
		   if ($("#m_"+clave).prop('checked')) {cad+="|S"; entre=true;} else {cad+="|N";}
		   if ($("#e_"+clave).prop('checked')) {cad+="|S"; entre=true;} else {cad+="|N";}

		   if (entre) {
			    losmodulos[c]=modulo+cad;
			    c++;
			    if (!(losmodulos.includes(pred+permpred))) {losmodulos[c]=pred+permpred; c++; }
			   }
   });
	   for(i=0;i<=losmodulos.length-1;i++) {
		   $("#sql").append(losmodulos[i]+"\n");
		      }
	   
	   }
	
	jQuery(function($) {

		 


	
		$(".input-mask-product").mask("99:99-99:99",{placeholder:"HH:MM-HH:MM",completed:function(){alert("You typed the following: "+this.val());}});

		if(!ace.vars['touch']) {
			$('.chosen-select').chosen({allow_single_deselect:true}); 
			
	
		    $(window).off('resize.chosen').on('resize.chosen', function() {
				$('.chosen-select').each(function() {
					 var $this = $(this);
					 $this.next().css({'width': $this.parent().width()});
				})
			}).trigger('resize.chosen');

			//resize chosen on sidebar collapse/expand
			$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
				if(event_name != 'sidebar_collapsed') return;
				$('.chosen-select').each(function() {
					 var $this = $(this);
					 $this.next().css({'width': $this.parent().width()});
				})
			});
		}

		
	});


*/
	
	


</script>



	</body>
<?php } else {header("Location: index.php");}?>
</html>
