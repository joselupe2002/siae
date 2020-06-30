
<?php session_start(); if (($_SESSION['inicio']==1)  && (strpos($_SESSION['permisos'],$_GET["modulo"])) ){ 
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";  
	$nivel="../../";
?> 
<!DOCTYPE html>
<html lang="es">
	<head>
	    <link rel="icon" type="image/gif" href="imagenes/login/sigea.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="<?php echo $_SESSION['encode'];?>" />
		<title><?php echo $_SESSION["titApli"];?></title>
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/font-awesome/4.5.0/css/font-awesome.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/fonts.googleapis.com.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ace-rtl.min.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>estilos/preloader.css" type="text/css" media="screen">         
        <link href="imagenes/login/sigea.png" rel="image_src" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ui.jqgrid.min.css" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/bootstrap-editable.min.css" />
        

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	    
    <div class="main-content"  style="margin-left: 10px; margin-right: 10px; width: 98%;">
		 <div id="user-profile-1" class="user-profile row">
		      <div class="col-xs-12 col-sm-3 center">
				   <div>
					   <span class="profile-picture"><img id="img_ALUM_FOTO"  style="width: 150px; height: 170px;" class="editable img-responsive" src=""/></span>
    				   <div class="space-4"></div>
                      
 	    		       <input class="fileSigea" type="file" id="file_ALUM_FOTO" name="file_ALUM_FOTO" 
 	    		             onchange="subirArchivoDriveName('file_ALUM_FOTO','ALUM_FOTO','img_ALUM_FOTO','ALUM_FOTO','jpeg|bmp|png|gif','S','<?php echo $_SESSION["usuario"];?>')">
 	    		       
                        <input  type="hidden" value=""  name="ALUM_FOTO" id="ALUM_FOTO"  placeholder="" />   	    	      
					</div>

					<div class="space-6"></div>
                         <div class="profile-contact-info">
							  <div class="profile-contact-links align-left">
								  <i class="ace-icon fa fa-plus-circle bigger-120 green"></i><span class="text-success" id ="nota1">Una Nota</span><br/>
								  <i class="ace-icon fa fa-envelope bigger-120 pink"></i><span class="text-success" id ="nota2">Una nota</span><br/>
								  <i class="ace-icon fa fa-globe bigger-125 blue"></i><span class="text-success" id ="nota3">Una Nota</span><br/>
							  </div>
							  <div class="space-6"></div>
							        <!-- 
                                    <div class="profile-social-links align-center">
									     <a href="#" class="tooltip-info" title="" data-original-title="Visit my Facebook"><i class="middle ace-icon fa fa-facebook-square fa-2x blue"></i></a>
										 <a href="#" class="tooltip-info" title="" data-original-title="Visit my Twitter"><i class="middle ace-icon fa fa-twitter-square fa-2x light-blue"></i></a>
                                         <a href="#" class="tooltip-error" title="" data-original-title="Visit my Pinterest"><i class="middle ace-icon fa fa-pinterest-square fa-2x red"></i></a>
									</div>-->									
							  </div>
							   
							  
							  <div class="hr hr12 dotted"></div>
                                   <div class="clearfix">
                                        <div class="grid2"><span onclick="verMaterias('A');" style="cursor: pointer;" title="Promedio General de asignaturas aprobadas"  id="promedio" class="bigger-175 blue"></span><br />Promedio</div>
                                        <div class="grid2"><span onclick="verMaterias('R');" style="cursor: pointer;" title="N&uacute;mero de veces que ha reprobado alguna asignatura" id="reprobadas" class="bigger-175 blue"></span><br />Reprobadas</div>
								   </div>
							       <div class="hr hr16 dotted"></div>
								   <div class="clearfix">
								        <button  onclick="mikardex();" class="btn btn-white btn-info btn-bold">
				                            <i class="ace-icon green fa fa-book bigger-160"></i><span class=" fontRobot btn-lg">Mi Kardex</span>            
				                        </button>
								   </div>
							   </div>

							   <div class="col-xs-12 col-sm-9">
								    <div class="center">
								         <span class="btn btn-app btn-sm btn-light no-hover">
								             <span id="periodos" class="line-height-1 bigger-170 blue">3</span>
								             <br />
										     <span class="line-height-1 smaller-90"> Periodo </span>
										 </span>

										 <span class="btn btn-app btn-sm btn-yellow no-hover">
											   <span class="line-height-1 bigger-170" id="ALUM_CICLOINS"> </span><br />
											   <span class="line-height-1 smaller-90"> Ingreso </span>
										 </span>
									  </div>

									<div class="space-12"></div>
                                        <div class="profile-user-info profile-user-info-striped">
										   
								
								           <div class="profile-info-row"><div class="profile-info-name">Matricula</div>
                                                <div class="profile-info-value"><i class="fa fa-user light-orange bigger-110"></i>
                                                     <span id="matricula"></span>
                                                </div>
										    </div>
										    
										    <div class="profile-info-row"><div class="profile-info-name">Nombre</div>
                                                <div class="profile-info-value"><i class="fa fa-user light-orange bigger-110"></i>
                                                     <span id="nombreal">Nombre de la persona</span>
                                                </div>
										    </div>

											<div class="profile-info-row"><div class="profile-info-name">Direcci&oacute;n </div>
                                                <div class="profile-info-value"><i class="fa fa-map-marker light-orange bigger-110"></i>
													<span class="editable" id="direccion">Direcci&oacute;n</span>
												</div>
											</div>
											
											<div class="profile-info-row"><div class="profile-info-name">Tel&eacute;fono </div>
                                                <div class="profile-info-value"><i class="fa fa-phone light-orange bigger-110"></i>
													<span class="editable" id="telefono">999999999</span>
												</div>
											</div>
											
											<div class="profile-info-row"><div class="profile-info-name">e-mail </div>
                                                <div class="profile-info-value"><i class="fa fa-maxcdn light-orange bigger-110"></i>
													<span class="editable" id="correo">micorreo@algo.mx</span>
												</div>
											</div>
											
											<div class="profile-info-row"><div class="profile-info-name">Carrera </div>
                                                <div class="profile-info-value"><i class="fa fa-gears light-orange bigger-110"></i>
													<span class="editable" id="carrera"></span>
												</div>
											</div>
											
										 </div>

										 <div class="space-20"></div>
										 
										 <div style="text-align: center;">
				                               <button  onclick="guardar();" class="btn  btn-white btn-primary" value="Agregar" style="width: 150px; height: 40px;">
				                               <i class="ace-icon blue fa fa-save bigger-160"></i><span class="btn-lg">Guardar</span>            
				                               </button>
				                         </div>
											
										 

			                   </div> <!--  De la segunda columna del row  -->
	    </div><!--  Del profile  -->
    </div> <!--  Del contenedor principal  -->
  
 
 
 <div class="modal fade" id="modalDocument" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
      <div class="modal-dialog modal-lg "  role="document">
		   <div class="modal-content">
		         <div class="modal-header  widget-header  widget-color-green">	
		                <span class="label label-lg arrowed arrowed-right" id="leyendap" >Historial de Asignaturas <span id="leyenda"></span></span> 
		                	   
		                <button type="button" class="close" data-dismiss="modal" aria-label="Cancelar">
		                     <span aria-hidden="true">&times;</span>
		                </button>	
		          </div>
                  <div id="frmdocumentos" class="modal-body" style="overflow-y: auto; height:350px;" class="modal-body">                  
		                  <div class="timeline-container">
								    <div class="timeline-label"><span class="label label-primary arrowed-in-right label-lg"><b>Historial</b></span></div>															                        
			                        <div id="lositems" class="timeline-items">									     									     
										
									 </div> <!-- time contenedor de los items -->										 
						   </div> <!-- time contenedor principal  de los items -->                       
		          </div> <!-- del modal-body -->     
		     </div>
      </div>
</div> 
 
 

 
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>       
<script src="<?php echo $nivel; ?>assets/js/jquery-2.1.4.min.js"></script>
<script type="<?php echo $nivel; ?>text/javascript"> if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");</script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery-ui.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.dataTables.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.dataTables.bootstrap.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/dataTables.buttons.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.flash.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.html5.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.print.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/buttons.colVis.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/dataTables.select.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>



<!-- -------------------Medios ----------------------->
<script src="<?php echo $nivel; ?>assets/js/jquery.inputlimiter.min.js"></script>
<script src="<?php echo $nivel; ?>js/mask.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-tag.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>


<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/sha/sha512.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-editable.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace-editable.min.js"></script>



<script type="text/javascript">
   $(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
   $(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

   
   $(document).ready(function($) {

	   $('.fileSigea').ace_file_input({
			no_file:'Sin archivo ...',
			btn_choose:'Buscar',
			btn_change:'Cambiar',
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			whitelist:'png|jpeg|gif|bmp',
			blacklist:'exe|php'
			//onchange:''
			//
		});
		

	 //editables on first profile page
		$.fn.editable.defaults.mode = 'inline';
		$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
	    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
	                                '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';    
		
		//editables 
	
	

		elsql="SELECT alum_matricula, alum_foto,alum_nombrec,alum_direccion, alum_telefono, alum_correo, "+
		             " alum_carreraregd, alum_cicloins, getcuatrialum(alum_matricula, getciclo()) AS CUAT,"+
                     " alum_correo AS CORREO,alum_telefono AS TEL, alum_tutor AS TUTOR "+
					 " FROM pvalumnos_cb  WHERE alum_matricula='<?php echo $_SESSION['usuario'];?>'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		   $.ajax({
			   type: "POST",
			   data:parametros,
		       url:  "../base/getdatossqlSeg.php",
		       success: function(data){  
		    	      losdatos=JSON.parse(data);		    	      		    	    		    	        
		    	      jQuery.each(losdatos, function(clave, valor) { 
		    	    	
		    	    	//text editable		    	  	   
		    	  	    $('#nombreal').html(valor.alum_nombrec);		    	  	  
		    	  	    $('#ALUM_CICLOINS').html(valor.alum_cicloins);

		    	  	   $('#promedio').html(valor.PROM_SR);
		    	  	   $('#reprobadas').html(valor.NUMREP);
		    	  	   
		    	  	    ladirecccion=valor.alum_direccion;
		    	  	    if (valor.alum_direccion.length<=0) {ladirecccion="Direccion...";}
		    	  	    $('#direccion').editable({type: 'text',id: 'direccion_ed', value:ladirecccion});
		    	  	    $('#direccion').html(ladirecccion);

		    	  	    tel=valor.alum_telefono;
		    	  	    if (valor.alum_telefono.length<=0) {tel="999999999";}
		    	  	    $('#telefono').editable({type: 'text',id: 'telefono_ed', value:tel});
		    	  	    $('#telefono').html(tel);


		    	  	    elcorreo=valor.alum_correo;
		    	  	    if (valor.alum_telefono.length<=0) {elcorreo="999999999";}
		    	  	    $('#correo').editable({type: 'text',id: 'telefono_ed', value:elcorreo});
		    	  	    $('#correo').html(elcorreo);


		    	  	    $('#matricula').html(valor.alum_matricula);
		    	  	    $('#carrera').html(valor.alum_carreraregd);
		    	  	    $('#img_ALUM_FOTO').attr("src",valor.alum_foto);
		    	    	 
		    	      });		    
		
		
		             },
		       error: function(data) {	                  
		                  alert('ERROR: '+data);
		              }
		});


	  //Cargando el promedio 
	      $('#promedio').html("<img width=\"25px\" height=\"25px\" src=\"../../imagenes/menu/preloader.gif\">");
		  $('#reprobadas').html("<img width=\"25px\" height=\"25px\" src=\"../../imagenes/menu/preloader.gif\">");
		  elsql="SELECT "+
		             " getpromedio (alum_matricula,'N') as PROM_SR, "+
		             " getNumVecRep (alum_matricula) as NUMREP "+		                      
					 " FROM pvalumnos_cb  WHERE alum_matricula='<?php echo $_SESSION['usuario'];?>'";
		   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		   $.ajax({
			   type: "POST",
			   data:parametros,
		       url:  "../base/getdatossqlSeg.php",
		       success: function(data){  
		    	      losdatos=JSON.parse(data);
		    	      jQuery.each(losdatos, function(clave, valor) { 
		    	    	
		    	  	    $('#promedio').html(valor.PROM_SR);
		    	  	    $('#reprobadas').html(valor.NUMREP);
		    	    	 
		    	      });		    
		             },
		       error: function(data) {	                  
		                  alert('ERROR: '+data);
		              }
		});//fin del promedio


			
			
   });// Fin del ready 



   

function guardar(){

	
     parametros={
		    	tabla:"falumnos",
		    	campollave:"ALUM_MATRICULA",
		    	valorllave:"<?php echo $_SESSION['usuario'];?>",
		    	bd:"Mysql",
		    	ALUM_DIRECCION:$("#direccion").html(),
		    	ALUM_TELEFONO:$("#telefono").html(),
		    	ALUM_CORREO:$("#correo").html(),
		    	ALUM_FOTO:$("#ALUM_FOTO").val()
		    	//ALUM_TUTOR:$("#ALUM_TUTOR").val(),
		    	//ALUM_TELTUTOR:$("#ALUM_TELTUTOR").val(),
		    	//ALUM_PARENTESCO:$("#ALUM_PARENTESCO").val(),
		    	//ALUM_TIPOSANGRE:$("#ALUM_TIPOSANGRE").val(),
		    	//ALUM_ALERGIAS:$("#ALUM_ALERGIAS").val(),
		    	//ALUM_MEDICOCAB:$("#ALUM_MEDICOCAB").val(),
		    	//ALUM_DIRMEDICO:$("#ALUM_DIRMEDICO").val()
		      };
		    		
       $('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
	   $.ajax({
		        type: "POST",
		        url:"../base/actualiza.php",
		    	data: parametros,
		    	success: function(data){		    				
		    		$('#dlgproceso').modal("hide");  			                                	                      
		    		if (!(data.substring(0,1)=="0")){	alert (data);}	
		    		else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
		           }					     
		      });               
	      } 

		    		  

function verMaterias(tipo){
	   $('#lositems').empty();
	   
	   
	   if (tipo=='A') {
		               eltipo=" and a.LISCAL>=70";
		               $('#leyendap').addClass("label-success"); 
		               $('#leyenda').html("Aprobadas");
		               coloric="blue"; } 
       else {
                       eltipo=" and a.LISCAL<70"; 
                       $('#leyendap').addClass("label-danger"); 
                       $('#leyenda').html("Reprobadas");
                       coloric="red";
					   } 
	   elsql="SELECT a.MATCVE, b.MATE_DESCRIP, a.PDOCVE,a.LISCAL, a.PDOCVE, CONCAT(c.EMPL_NOMBRE,' ',c.EMPL_APEPAT,' ',c.EMPL_APEMAT) as PROFESORD "+
                " FROM dlista a, cmaterias b, pempleados c "+
     		   " where IFNULL(MATE_TIPO,'0') NOT IN ('T','I','AC') AND a.MATCVE=b.MATE_CLAVE and  a.LISTC15=c.EMPL_NUMERO and a.ALUCTR='<?php echo $_SESSION["usuario"];?>'"+eltipo+
     		   " order by a.PDOCVE";
       parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	   $.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){  
            losdatos=JSON.parse(data);                          
            jQuery.each(losdatos, function(clave, valor) { 

         	     colorCic="label-info";
         	     
         	     if (valor.LISCAL<70) {colorCic="label-danger";}
         	     if ((valor.LISCAL>=70) && (valor.LISCAL<80)) {coloric="red";}
         	     if ((valor.LISCAL>=80) && (valor.LISCAL<90)) {coloric="purple";}
         	     if ((valor.LISCAL>=90) && (valor.LISCAL<100)) {coloric="green";}
                  $('#lositems').append("<div class=\"timeline-item clearfix\"> "+
					                           "<div class=\"timeline-info\">"+
						                           "<span class=\"label "+colorCic+" label-sm\">"+valor.PDOCVE+"</span>"+
					                           "</div>"+
					                           "<div class=\"widget-box transparent\">"+
						                           "<div class=\"widget-header widget-header-small\">"+
								                        "<h5 class=\"widget-title smaller\">"+valor.MATE_DESCRIP+"   </h5>"+
								                              "<span class=\"grey\">"+valor.PROFESORD+"</span>"+								                        
								                        "<span class=\"widget-toolbar no-border\"><i class=\"ace-icon "+coloric+" fa fa-star-o bigger-110\"></i>"+valor.LISCAL+"</span> "+                                           
							                       "</div>"+
					                           "</div>"+
				                             "</div>");
				 
         	     $('#modalDocument').modal({show:true, backdrop: 'static'});
	               });
        }
	 });
		 
	  
	   }


	function mikardex(){
		enlace="nucleo/pa_datosgen/kardex.php?matricula=<?php echo $_SESSION["usuario"];?>";
		var content = '<iframe frameborder="0" id="FRNoti" src="'+enlace+'" style="overflow-x:hidden;width:100%;height:100%;"></iframe></div>';	
		$('#parentPrice', window.parent.document).html();
		window.parent.$("#myTab").tabs('add',{
				    	    title:'Notificacion',				    	    
				    	    content:content,
				    	    closable:true		    
				    	});
	   //window.open(enlace, '_blank'); 
      }

   
</script>



	</body>
<?php } else {header("Location: index.php");}?>
</html>
