
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
		<link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/chosen.min.css" />
        

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	    
    <div class="main-content"  style="margin-left: 10px; margin-right: 10px; width: 98%;">
		 <div id="user-profile-1" class="user-profile row">
		      <div class="col-xs-12 col-sm-3 center">
				   <div>
					   <span class="profile-picture">
					        <img id="img_EMPL_FOTO"  style="width: 150px; height: 170px;" class="editable img-responsive" src=""/>
					   </span>
    				   <div class="space-4"></div>
                      
 	    		       <input class="fileSigea" type="file" id="file_EMPL_FOTO" name="file_EMPL_FOTO" 
 	    		             onchange="subirArchivoDriveName('file_EMPL_FOTO','EMPL_FOTO','img_EMPL_FOTO','EMPL_FOTO','jpeg|png|JPG|jpg','S','<?php echo $_SESSION["usuario"];?>')">
 	    		       
                        <input type="hidden" value=""  name="EMPL_FOTO" id="EMPL_FOTO" placeholder="" />   	
						<button  onclick="guardarCampo('EMPL_FOTO',true,'La Foto fue asignada correctamente');" class="btn btn-white btn-info btn-bold">
				                 <i class="ace-icon green fa fa-camera bigger-160"></i><span class=" fontRobot bigger-100">Asignar Foto</span>            
				        </button>

					</div>

					<div class="space-6"></div>
                       
														  
							  <div class="hr hr12 dotted"></div>
                                   <div class="clearfix">
                                        
								   </div>
							       <div class="hr hr16 dotted"></div>
								   <div class="clearfix">
								    
								   </div>
							   </div>

							   <div class="col-xs-12 col-sm-9">	

							  		 <div class="tabbable">		
									   	<ul class="nav nav-tabs" id="myTab">
												<li class="active">
													<a data-toggle="tab" href="#generales">
														<i class="green ace-icon fa fa-user bigger-120"></i>
														Generales
													</a>
												</li>

												<li>
													<a data-toggle="tab" href="#formacion">
													<i class="blue ace-icon fa fa-group bigger-120"></i>
														Formación													
													</a>
												</li>	

												<li>
													<a data-toggle="tab" href="#asesorias">
													<i class="blue ace-icon blue fa fa-skype bigger-120"></i>
														Asesorías													
													</a>
												</li>	

										</ul>				    
										<div class="tab-content">
											<div id="generales" class="tab-pane fade in active">
												<div class="profile-user-info profile-user-info-striped">										   								
													<div class="profile-info-row"><div class="profile-info-name">No.</div>
														<div class="profile-info-value"><i class="fa fa-user light-orange bigger-110"></i>
															<span id="EMPL_NUMERO"></span>
														</div>
													</div>
													
													<div class="profile-info-row"><div class="profile-info-name">Nombre</div>
														<div class="profile-info-value"><i class="fa fa-user light-orange bigger-110"></i>
															<span id="EMPL_NOMBRE">Nombre de la persona</span>
														</div>
													</div>

													<div class="profile-info-row"><div class="profile-info-name">Direcci&oacute;n </div>
														<div class="profile-info-value"><i class="fa fa-map-marker light-orange bigger-110"></i>
															<span class="editable" id="EMPL_DIRECCION" name="EMPL_DIRECCION">Direcci&oacute;n</span>
														</div>
													</div>
													
													<div class="profile-info-row"><div class="profile-info-name">Tel&eacute;fono </div>
														<div class="profile-info-value"><i class="fa fa-phone light-orange bigger-110"></i>
															<span class="editable" name="EMPL_TELEFONO" id="EMPL_TELEFONO">999999999</span>
														</div>
													</div>
													
													<div class="profile-info-row"><div class="profile-info-name">e-mail </div>
														<div class="profile-info-value"><i class="fa fa-maxcdn light-orange bigger-110"></i>
															<span class="editable" id="EMPL_CORREO">micorreo@algo.mx</span>
														</div>
													</div>
													
													<div class="profile-info-row"><div class="profile-info-name">Carrera </div>
														<div class="profile-info-value"><i class="fa fa-gears light-orange bigger-110"></i>
															<span class="editable" id="EMPL_DEPTO"></span>
														</div>
													</div>


													<div class="profile-info-row"><div class="profile-info-name">Ingreso </div>
														<div class="profile-info-value"><i class="fa fa-tag light-orange bigger-110"></i>
															<span class="editable" id="EMPL_FECING"></span>
														</div>
													</div>											
													
												</div>
											</div> <!--  Del contenido del primer tab -->
											<div id="formacion" class="tab-pane fade">
												<div class="profile-user-info profile-user-info-striped">
													<div class="profile-info-row"><div class="profile-info-name">Formación </div>
														<div class="profile-info-value">
															<span id="EMPL_FORMACION"></span>
														</div>
													</div>

													<div class="profile-info-row"><div class="profile-info-name">Egresado de </div>
														<div class="profile-info-value">
															<span id="EMPL_EGRESADODE"></span>
														</div>
													</div>

													<div class="profile-info-row"><div class="profile-info-name">Ult. Grado </div>
														<div class="profile-info-value">
															<span  id="EMPL_ULTIGRA"></span>
														</div>
													</div>

													<div class="profile-info-row"><div class="profile-info-name">Abrevia (Ing.) </div>
														<div class="profile-info-value"><i class="fa fa-gears light-orange bigger-110"></i>
															<span class="editable" id="EMPL_ABREVIA"></span>
														</div>
													</div>

													<div class="profile-info-row"><div class="profile-info-name">Habilidades Técnicas</div>
														<div class="profile-info-value">
															<span class="editable" id="EMPL_HABTEC"></span>
														</div>
													</div>

													<div class="profile-info-row"><div class="profile-info-name">Habilidades Personales</div>
														<div class="profile-info-value">
															<span class="editable" id="EMPL_HABPER"></span>
														</div>
													</div>
												</div>
											</div> <!--  Del contenido del segundo  tab -->

											<div id="asesorias" class="tab-pane fade">
												<div class="profile-user-info profile-user-info-striped">
													<div class="profile-info-row"><div class="profile-info-name">Lugar / Enlace </div>
														<div class="profile-info-value"><i class="fa fa-globe light-orange bigger-110"></i>
															<span class="editable" id="EMPL_LUGARAS">Sin Lugar</span>
														</div>
													</div>

													<div class="profile-info-row"><div class="profile-info-name">Asignaturas Asesorar</div>
														<div class="profile-info-value">
															<span class="editable" id="EMPL_EXPASIG"></span>
														</div>
													</div>
												</div>

													
											</div> <!--  Del contenido del tercer  tab -->
										</div> <!--  Del Tab principal -->

										 <div class="space-20"></div>
										 
										 <div style="text-align: center;">
				                               <button  onclick="guardar();" class="btn  btn-bold btn-danger" value="Agregar" >
				                               <i class="ace-icon white fa fa-save bigger-200"></i><span class="btn-lg">Guardar Cambios Realizados</span>            
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
 
 

 
<script src="<?php echo $nivel; ?>js/subirArchivos.js?v=<?php echo date('YmdHis'); ?>"></script>       
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
<script src="<?php echo $nivel; ?>assets/js/chosen.jquery.min.js"></script>

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
<script src="<?php echo $nivel; ?>js/utilerias.js?v=<?php echo date('YmdHis'); ?>"></script>


<script type="text/javascript">
   $(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
   $(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});


   function change_SELECT(elemento) {
		
	}
	

   function guardarCampo(campo,conmsj,mensaje) {
	if (campo=='EMPL_FOTO') {parametros={EMPL_FOTO:$("#EMPL_FOTO").val(),tabla:"pempleados",campollave:"EMPL_NUMERO",valorllave:"<?php echo $_SESSION['usuario'];?>",bd:"Mysql"};}
	if (campo=='EMPL_CORREO') {parametros={EMPL_CORREO:$("#correo").val(),tabla:"pempleados",campollave:"EMPL_NUMERO",valorllave:"<?php echo $_SESSION['usuario'];?>",bd:"Mysql"};}
	if (campo=='EMPL_TELEFONO') {parametros={EMPL_TELEFONO:$("#telefono").val(),tabla:"pempleados",campollave:"EMPL_NUMERO",valorllave:"<?php echo $_SESSION['usuario'];?>",bd:"Mysql"};}
	if (campo=='EMPL_DIRECCION') {parametros={EMPL_DIRECCION:$("#direccion").val(),tabla:"pempleados",campollave:"EMPL_NUMERO",valorllave:"<?php echo $_SESSION['usuario'];?>",bd:"Mysql"};}
	


	$('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
	   $.ajax({
		        type: "POST",
		        url:"../base/actualiza.php",
		    	data: parametros,
		    	success: function(data){		    				
		    		$('#dlgproceso').modal("hide");  			                                	                      
		    		if (!(data.substring(0,1)=="0")){ if (conmsj){alert (mensaje);}}	
		    		else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
		           }					     
		      });          
}
   
   $(document).ready(function($) {

	   $('.fileSigea').ace_file_input({
			no_file:'Sin archivo ...',
			btn_choose:'Buscar',
			btn_change:'Cambiar',
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			whitelist:'png|jpg|JPG|jpeg',
			blacklist:'exe|php'
			//onchange:''
			//
		});
		

	 //editables on first profile page
		$.fn.editable.defaults.mode = 'inline';
		$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
	    $.fn.editableform.buttons = '<button class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
	                                '<button class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';    
		
		//editables 
	
	

		elsql="SELECT * FROM pempleados left outer join fures on (EMPL_DEPTO=URES_URES) WHERE EMPL_NUMERO='<?php echo $_SESSION['usuario'];?>'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		   $.ajax({
			   type: "POST",
			   data:parametros,
		       url:  "../base/getdatossqlSeg.php",
		       success: function(data){  
					  losdatos=JSON.parse(data);	
			      		    	    		    	        
		    	      jQuery.each(losdatos, function(clave, valor) { 
		    	    	
		    	    	//text editable		    	  	   
		    	  	    $('#EMPL_NOMBRE').html(valor.EMPL_NOMBRE+' '+valor.EMPL_APEPAT+' '+valor.EMPL_APEMAT);		    	  	  
		    	  	
		    	  	    ladirecccion=valor.EMPL_DIRECCION;
		    	  	    if (valor.EMPL_DIRECCION.length<=0) {ladirecccion="Direccion...";}
		    	  	    $('#EMPL_DIRECCION').editable({type: 'text',id: 'direccion_ed', value:ladirecccion});
		    	  	    $('#EMPL_DIRECCION').html(ladirecccion);

						tel=valor.EMPL_TELEFONO;						  
		    	  	    if ((valor.EMPL_TELEFONO=='') || (valor.EMPL_TELEFONO==null)) {tel="999999999";}
		    	  	    $('#EMPL_TELEFONO').editable({type: 'text',id: 'telefono_ed', value:tel});
		    	  	    $('#EMPL_TELEFONO').html(tel);


		    	  	    elcorreo=valor.EMPL_CORREO;
		    	  	    if (valor.EMPL_CORREO.length<=0) {elcorreo="@macuspana.tecnm.mx";}
		    	  	    $('#EMPL_CORREO').editable({type: 'text',id: 'telefono_ed', value:elcorreo});
					    $('#EMPL_CORREO').html(elcorreo);
						  

						laabrevia=valor.EMPL_ABREVIA;
		    	  	    if (valor.EMPL_ABREVIA.length<=0) {laabrevia="ING.";}
		    	  	    $('#EMPL_ABREVIA').editable({type: 'text',id: 'abrevia_ed', value:laabrevia});
						$('#EMPL_ABREVIA').html(laabrevia);
						  

						  $('#EMPL_FECING').html(valor.EMPL_FECING);


						  $('#EMPL_NUMERO').html(valor.EMPL_NUMERO);

						  lugar=valor.EMPL_LUGARAS;						  
		    	  	    if ((valor.EMPL_LUGARAS=='') || (valor.EMPL_LUGARAS==null)) {lugar="Sin Lugar";}
		    	  	    $('#EMPL_LUGARAS').editable({type: 'text',id: 'lugaras_ed', value:lugar});
		    	  	    $('#EMPL_LUGARAS').html(lugar);



				
						  $('#EMPL_DEPTO').html(valor.EMPL_DEPTO+' '+valor.URES_DESCRIP);					
						  $('#img_EMPL_FOTO').attr("src",valor.EMPL_FOTO);
						  $('#EMPL_FOTO').val(valor.EMPL_FOTO);

						  $('#EMPL_FECING').html(valor.EMPL_FECING);
						  
						  
						  addSELECT_CONVALOR("selEMPL_FORMACION","EMPL_FORMACION","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM pcarrempl order by CARR_DESCRIP", "","BUSQUEDA",valor.EMPL_FORMACION);  			      
						  addSELECT_CONVALOR("selEMPL_EGRESADODE","EMPL_EGRESADODE","PROPIO", "SELECT UNIV_ID, UNIV_DESCRIP FROM puniversidades order by UNIV_DESCRIP", "","BUSQUEDA",valor.EMPL_EGRESADODE);  			      
						  addSELECT_CONVALOR("selEMPL_ULTIGRA","EMPL_ULTIGRA","PROPIO", "select ESCO_CLAVE, ESCO_DESCRIP from cescolaridad order by ESCO_CLAVE ", "","BUSQUEDA",valor.EMPL_ULTIGRA);  			      
						  
						  addSELECTMULT_CONVALOR("selEMPL_HABTEC","EMPL_HABTEC","PROPIO", "select CATA_CLAVE, CATA_DESCRIP "+
						  "from scatalogos WHERE CATA_TIPO='HABTEC' order by CATA_DESCRIP ", "","BUSQUEDA",valor.EMPL_HABTEC);  	
						  
						  addSELECTMULT_CONVALOR("selEMPL_HABPER","EMPL_HABPER","PROPIO", "select CATA_CLAVE, CATA_DESCRIP "+
						  "from scatalogos WHERE CATA_TIPO='HABPER' order by CATA_DESCRIP ", "","BUSQUEDA",valor.EMPL_HABPER);  
						  
						  addSELECTMULT_CONVALOR("selEMPL_EXPASIG","EMPL_EXPASIG","PROPIO", 
						  "SELECT DISTINCT(CICL_MATERIA), CONCAT (CICL_MATERIA,' ',CICL_MATERIAD) FROM veciclmate  WHERE "+
                                  " IFNULL(TIPOMAT,'0') NOT IN ('T','AC','OC','I','RP') ORDER BY CICL_MATERIAD ", "","BUSQUEDA",valor.EMPL_EXPASIG);  
	
						  

		    	    	 
		    	      });		    
		
		
		             },
		       error: function(data) {	                  
		                  alert('ERROR: '+data);
		              }
		});


   });// Fin del ready 


function guardar(){

     parametros={
		    	tabla:"pempleados",
		    	campollave:"EMPL_NUMERO",
		    	valorllave:"<?php echo $_SESSION['usuario'];?>",
		    	bd:"Mysql",
		    	EMPL_DIRECCION:$("#EMPL_DIRECCION").html(),
		    	EMPL_TELEFONO:$("#EMPL_TELEFONO").val(),
		    	EMPL_CORREO:$("#EMPL_CORREO").html(),
				EMPL_FOTO:$("#EMPL_FOTO").val(), 
				EMPL_FORMACION:$("#selEMPL_FORMACION").val(),
				EMPL_EGRESADODE:$("#selEMPL_EGRESADODE").val(), 
				EMPL_ABREVIA:$("#EMPL_ABREVIA").html(), 
				EMPL_LUGARAS:$("#EMPL_LUGARAS").html(), 
				EMPL_ULTIGRA:$("#selEMPL_ULTIGRA").val(),
				EMPL_HABTEC: $("#selEMPL_HABTEC").val()==null?' ':$("#selEMPL_HABTEC").val().toString(), 
				EMPL_HABPER:$("#selEMPL_HABPER").val()==null?' ':$("#selEMPL_HABPER").val().toString(), 
				EMPL_EXPASIG:$("#selEMPL_EXPASIG").val()==null?' ':$("#selEMPL_EXPASIG").val().toString(), 	    
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
