<?php session_start(); if (($_SESSION['inicio']==1)) {
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
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/jquery.gritter.min.css" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/chosen.min.css" />

        

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	   
	    
	      <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	      
		  <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	      
		  <div class="widget-box widget-color-green">
			  <div class="widget-header widget-header-small" style="padding:0px;">
			      <div class="row" >		                    				
						<div id="lascarreras" class="col-sm-3">
						</div>  								
						<div class="col-sm-4">						   
							<span class="label label-warning">Alumno</span>														
							<span class="label label-info" id="lacarrera"></span>		
						    <select onchange="verAvance();" class="chosen-select form-control" id="alumnos"></select>
						</div>     
						<div class="col-sm-3" style="text-align: center; padding-top:10px;">				              										
							<button title="Imprimir avance curricular" onclick="imprimir('mihoja');" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon blue fa fa-print bigger-160"></i><span class="btn-small"></span>            
							</button>
							<button title="Informaci&oacute;n del alumno" onclick="verInfo();" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon pink glyphicon glyphicon-info-sign bigger-150"></i><span class="btn-small"></span>            
							</button>
							<button title="Informaci&oacute;n del cumplimiento del perfil de egreso" onclick="verInfoPerfil();" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon red glyphicon glyphicon-education bigger-150"></i><span class="btn-small"></span>            
							</button>
							<button title="Kardex del alumno" onclick="imprimirKardex();" class="btn btn-xs btn-white btn-primary btn-round"> 
								<i class="ace-icon green glyphicon glyphicon-list-alt bigger-150"></i><span class="btn-small"></span>            
							</button>							
						</div>	  			 
						<div class="col-sm-2">	
						    <span class="label label-warning" id="elmapa">Alumno</span>														
							<span class="label label-info" id="laespecialidad"></span>
							<span class="label label-info" id="cveespecialidad"></span>	
						</div>		 			               		           
		            </div> 
		      </div>

              <div class="widget-body">
				   <div class="widget-main">
				       <div class="row" style=" overflow-x: scroll;">	
                           <div class="col-sm-12" >
                               <div id="carta" style="width: 289mm; height: 226mm; border: 0px solid;  overflow-x: scroll; padding:0px; margin:0px; ">
                               <div id="mihoja" style="position: absolute; left: 2mm; top: 1mm; width: 269mm; height: 206mm; border: 0px solid;">             
                           </div>
                       </div>
                    </div>
			   </div>
		</div>
 
    </div>
         
         
         
     
<div class="modal fade" id="modalDocument" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
      <div class="modal-dialog modal-lg "  role="document">
		   <div class="modal-content">
		         <div class="modal-header">		   
		                <button type="button" class="close" data-dismiss="modal" aria-label="Cancelar">
		                     <span aria-hidden="true">&times;</span>
		                </button>	
		          </div>
                  <div id="frmdocumentos" class="modal-body">                  
		                  <div class="timeline-container">
								    <div class="timeline-label"><span class="label label-primary arrowed-in-right label-lg"><b>Historial</b></span></div>															                        
			                        <div id="lositems" class="timeline-items">									     									     
										
									 </div> <!-- time contenedor de los items -->										 
						   </div> <!-- time contenedor principal  de los items -->                       
		          </div> <!-- del modal-body -->     
		     </div>
      </div>
</div> 



			                  
<!-- ===============================VENTANA DE INFORMACION=================================================================-->
 <div id="info" class="modal fade" role="dialog" >
     <div class="modal-dialog modal-sm">
		   <div class="modal-content">
		        <div class="modal-header bg-primary">	
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								 <span class="white">&times;</span>
						 </button>
						<span class="lead text-white">Información General</span>
				 </div>
				 <div class="modal-body">
				
	                     <div class="row">
						      <div class="col-sm-12">
						           <i class="ace-icon fa fa-user icon-animated-hand-pointer blue bigger-160"></i>	
								   <strong><span class="lighter text-success " id="elnombre"></span> </strong> 							       
							   </div>
						 </div>
						 <div class="row">
	                           <div class="col-sm-12">  
							       <i class="ace-icon fa fa-book icon-animated-hand-pointer green bigger-160"></i>	
								   <strong><span class="lighter text-info " id="lacarrerainfo"></span> </strong> 		                               
                               </div>	
						 </div>   
						 <div class="row">   
							   <div class="col-sm-12" >
									<span class="btn btn-app btn-sm btn-light no-hover">
										 <span id="prom_cr" class="line-height-1 bigger-170 blue"></span><br />
										  <span class="line-height-1 smaller-90"> Prom.Rep. </span>
									</span>
									<span class="btn btn-app btn-sm btn-yellow no-hover">
									      <span id="prom_sr" class="line-height-1 bigger-170">  </span><br />
										  <span class="line-height-1 smaller-90"> Promedio </span>
									</span>	
									<span class="btn btn-app btn-sm btn-danger no-hover">
									      <span id="periodos" class="line-height-1 bigger-170">  </span><br />
										  <span class="line-height-1 smaller-90"> Periodos </span>
									</span>									
							   </div>
						 </div>
						 <div class="row">   
							   <div class="col-sm-12">
							        <span class="btn btn-app btn-sm btn-pink no-hover">
									      <span id="loscreditost"  class="line-height-1 bigger-170">  </span><br />
										  <span class="line-height-1 smaller-90"> Cr&eacute;ditos </span>
									</span>
									<span class="btn btn-app btn-sm btn-success  no-hover">
									      <span id="loscreditos" class="line-height-1 bigger-170">  </span><br />
										  <span class="line-height-1 smaller-90"> Cursados </span>
									</span>
							   </div>
						</div>
	                           
	                    <div class="space-10"></div>  
						<div class="row">   
							 <div class="col-sm-12">       	                           
								<div class="infobox infobox-blue2">
									<div class="infobox-progress">
											<div id="elavance"  class="easy-pie-chart percentage" data-percent="0" data-size="50">
												<span id="etelavance"  class="percent"></span>%
											</div>
									</div>
									<div class="infobox-data">
											<span class="infobox-text">Avance Cr&eacute;ditos</span>
												<div class="infobox-content">
													<span id="credpen" class=" text-danger bigger-60"></span>
															
													</div>
									</div>
								</div>
							 </div>
						</div>
						<div class="row">   
							 <div class="col-sm-12">   	  
								<div class="infobox infobox-green">
									<div class="infobox-icon"><i class="ace-icon fa fa-sitemap"></i></div>
									<div class="infobox-data">
											<span id="matcur" class="infobox-data-number"></span>
											<div class="infobox-content">Mat. Aprobadas</div>
									</div>
									<div id="matavance" class="stat stat-success"></div>
								</div>
							  </div>				                           					 
	                     </div>	                    
                 </div><!-- /.modal-body -->
		   </div><!-- /.modal-content -->         
	 </div><!-- /.modal-dialog -->
</div>
			


			<!-- ===============================VENTANA DE INFORMACION PERFIL DE EGRESO=================================================================-->
 <div id="infoPerfil" class="modal fade" role="dialog" >
     <div class="modal-dialog modal-lg">
		   <div class="modal-content">
		        <div class="modal-header bg-primary">	
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								 <span class="white">&times;</span>
						 </button>
						<span class="lead text-white">Cumplimiento Perfil de Egreso</span>
				 </div>
				 <div class="modal-body" id="bodyperfil">				

                 </div><!-- /.modal-body -->
		   </div><!-- /.modal-content -->         
	 </div><!-- /.modal-dialog -->
</div>
<!-- ============================================================================================================-->			
		 							
<!-- -------------------Primero ----------------------->
<script src="<?php echo $nivel; ?>assets/js/jquery-2.1.4.min.js"></script>
<script type="<?php echo $nivel; ?>text/javascript"> if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");</script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap.min.js"></script>

<!-- -------------------Segundo ----------------------->
<script src="<?php echo $nivel; ?>assets/js/jquery-ui.custom.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.ui.touch-punch.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/chosen.jquery.min.js"></script>

<!-- -------------------Medios ----------------------->
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
<script src="<?php echo $nivel; ?>assets/js/bootstrap-select.js"></script>

<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>

<script src="<?php echo $nivel; ?>assets/js/jquery.gritter.min.js"></script>

<script src="<?php echo $nivel; ?>assets/js/jquery.easypiechart.min.js"></script>


<script type="text/javascript">

var id_unico="";
var estaseriando=false;
var matser="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
        $("#info").css("display","none");

    	$('.easy-pie-chart.percentage').each(function(){
			var barColor = $(this).data('color') || '#2979FF';
			var trackColor = '#E2E2E2';
			var size = parseInt($(this).data('size')) || 72;
			$(this).easyPieChart({
				barColor: barColor,
				trackColor: trackColor,
				scaleColor: false,
				lineCap: 'butt',
				lineWidth: parseInt(size/10),
				animate:false,
				size: size
			}).css('color', barColor);
			});


          $('.chosen-select').chosen({allow_single_deselect:true}); 			
		  $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
		  $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});

		  $('[data-rel=popover]').popover({html:true});


		  $("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		 
			$.ajax({
				type: "GET",
				url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
				success: function(data){  
					addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
					" and CARR_CLAVE IN ("+data+")", "",""); 
					},
				error: function(data) {	                  
						alert('ERROR: '+data);
						$('#dlgproceso').modal("hide");  
					}
			});
		

			elsql="SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE, ' ',ALUM_APEPAT,' ',ALUM_APEMAT) "+
  		  		   " FROM falumnos where ALUM_CARRERAREG=0 order by ALUM_NOMBRE, ALUM_APEPAT, ALUM_APEMAT";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}	
    	$.ajax({
			 type: "POST",
			 data:parametros,
  		   url:  "../base/dameselectSeg.php",
  		   success: function(data){  
  			   $("#alumnos").empty();
  		       $("#alumnos").html(data);
  		       $('#alumnos').trigger("chosen:updated"); 
  		   }
    	});
       
	      
    });

	function change_SELECT(elemento) {
        if (elemento=='selCarreras') {
			actualizaSelect("alumnos","SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE, ' ',ALUM_APEPAT,' ',ALUM_APEMAT) "+
  		  		   " FROM falumnos where ALUM_CARRERAREG='"+$("#selCarreras").val()+"' order by ALUM_NOMBRE, ALUM_APEPAT, ALUM_APEMAT","BUSQUEDA");
			}
        
	}
	

   function getInfo(materia,elalumno){
	   $('#lositems').empty();
		
	   $.ajax({
           type: "GET",
           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT a.MATCVE, b.MATE_DESCRIP, a.PDOCVE,a.LISCAL, a.PDOCVE, CONCAT(c.EMPL_NOMBRE,' ',c.EMPL_APEPAT,' ',c.EMPL_APEMAT) as PROFESORD "+
                   " FROM dlista a, cmaterias b, pempleados c "+
        		   " where a.MATCVE=b.MATE_CLAVE and  a.LISTC15=c.EMPL_NUMERO and a.ALUCTR='"+elalumno+"' and a.MATCVE='"+materia+"'"),
           success: function(data){  
               losdatos=JSON.parse(data);                          
               jQuery.each(losdatos, function(clave, valor) { 

            	     colorCic="label-info";
            	     if (valor.LISCAL<70) {colorCic="label-danger";}
                     $('#lositems').append("<div class=\"timeline-item clearfix\"> "+
					                           "<div class=\"timeline-info\">"+
						                           "<span class=\"label "+colorCic+" label-sm\">"+valor.PDOCVE+"</span>"+
					                           "</div>"+
					                           "<div class=\"widget-box transparent\">"+
						                           "<div class=\"widget-header widget-header-small\">"+
								                        "<h5 class=\"widget-title smaller\">"+valor.MATE_DESCRIP+"   </h5>"+
								                              "<span class=\"grey\">"+valor.PROFESORD+"</span>"+								                        
								                        "<span class=\"widget-toolbar no-border\"><i class=\"ace-icon green fa fa-star-o bigger-110\"></i>"+valor.LISCAL+"</span> "+                                           
							                       "</div>"+
					                           "</div>"+
				                             "</div>");
				 
            	     $('#modalDocument').modal({show:true, backdrop: 'static'});
	               });
           }
	 });
		 
	  
	   }

   function verAvance() {
	   $.ajax({
  		   type: "GET",
  		   url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT CARR_DESCRIP, ALUM_MAPA, CLAVEOF, ALUM_ESPECIALIDAD, ALUM_ESPECIALIDADSIE "+
					   " FROM falumnos a LEFT outer JOIN especialidad c on (a.ALUM_ESPECIALIDAD=c.ID), "+
					   " ccarreras b where ALUM_CARRERAREG=CARR_CLAVE and ALUM_MATRICULA='"+$("#alumnos").val()+"'"),
  		   success: function(data){  
  			   losdatos=JSON.parse(data);  
			   jQuery.each(losdatos, function(clave, valor) { 
				   elmapa=valor.ALUM_MAPA;
				   laespecialidad=valor.ALUM_ESPECIALIDAD;
				   $("#lacarrera").html(valor.CARR_DESCRIP);
				   $("#lacarrerainfo").html(valor.CARR_DESCRIP);
				   $("#elmapa").html(valor.ALUM_MAPA);
				   $("#laespecialidad").html(valor.CLAVEOF);
				   $("#cveespecialidad").html(valor.ALUM_ESPECIALIDAD);
			   });
				   
  			       cargaMapa(elmapa,$("#alumnos").val());
  		   }
    	});

	    }
   

    function cargaMapa(elmapa,elalumno){
    	$("#mihoja").empty();
        laespera="<img src=\"../../imagenes/menu/esperar.gif\" style=\"background: transparent; width: 30%; height:30%;\"/>"
    	$("#fondo").css("display","block");
    	$("#fondo").empty();
    	$("#fondo").append("<img src=\"../../imagenes/menu/esperar.gif\" style=\"background: transparent; width: 100px; height: 80px\"/>");
    	
        $("#info").css("display","none");
    	$.ajax({
 		   type: "GET",
 		   url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT MAX(N) as N FROM (select CICL_CUATRIMESTRE,count(*) as N "+
 	    		   "from veciclmate where CICL_MAPA='"+elmapa+"' group by CICL_CUATRIMESTRE) as miscuat "),
 		   success: function(data){  
 		       losdatos=JSON.parse(data);  
 		       jQuery.each(losdatos, function(clave, valor) { elmax=valor.N });

			       $.ajax({
			           type: "GET",
			           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select veciclmate.*, (SELECT COUNT(*) from `eseriacion` "+
					   " where seri_materia=cicl_materia and seri_mapa=CICL_MAPA) as numseriada from veciclmate "+
					   " where CICL_MAPA='"+elmapa+"' and (ifnull(CVEESP,0)=0 or ifnull(CVEESP,0)='"+laespecialidad+"') ORDER BY cicl_cuatrimestre, cicl_materia"),
			           success: function(data){  
			           losdatos=JSON.parse(data);  

						left=5; ancho=Math.round(((305-10)/10))-5;
						arriba=8;
						alto=Math.round(((206-60)/elmax))-2;
						eltam=Math.round(ancho/3);				
						tamfin=ancho-(eltam*2);
						
						altoasig=(alto*0.70);

						periodo=losdatos[0]["CICL_CUATRIMESTRE"];
						mapa=losdatos[0]["CICL_MAPAD"];

                        // Para colocar el primero 1 
                        cad="<div style=\"font-size:12px; font-weight:bold; position: absolute; left: "+(left+(Math.round(ancho/2)))+"mm; "+
												"top:1mm; width:5mm; height:5mm;\"><span id =\"periodo_"+periodo+"\" ondblclick=\"cambiarPeriodo('"+periodo+"');\""+
												"title=\"Doble click para cambiar materias de periodos\" "+
												"class=\"pull-right badge badge-info classper\" Style=\"cursor:pointer;\">"+periodo+"</span></div>";
						$("#mihoja").append(cad);	
						
					
                   
			        	jQuery.each(losdatos, function(clave, valor) { 
				           et="";
				           if (valor.numseriada>0){et="background-color:red;";}
				           
				           if (!(periodo==valor.CICL_CUATRIMESTRE)) { 
					           left+=ancho+4; 
					           arriba=8;
					           periodo=valor.CICL_CUATRIMESTRE;
							   cad="<div style=\"font-size:12px; font-weight:bold; position: absolute; left: "+(left+(Math.round(ancho/2)))+"mm; "+
												"top:1mm; width:5mm; height:5mm;\"><span id =\"periodo_"+periodo+"\" ondblclick=\"cambiarPeriodo('"+periodo+"');\""+
												"title=\"Doble click para cambiar materias de periodos\" "+
												"class=\"pull-right badge badge-info classper\" Style=\"cursor:pointer;\">"+periodo+"</span></div>";
							   $("#mihoja").append(cad);	

					           }
                        
			        	   estiloPadre="style= \"background-color:white; position: absolute; left: "+left+"mm; top: "+arriba+"mm; width: "+ancho+"mm; height:"+alto+"mm; border: 0.1mm solid;\"";
			               estiloAsignatura="style=\"font-size:7px; font-weight:bold; text-align: center; word-wrap: break-word;  "+
			                                        "cursor:pointer; position:absolute; left: 0mm; top: 0mm; width:100%; height:"+altoasig+"mm; border-bottom: 0.1mm solid;\""+ 
			                                        "id=\""+valor.CICL_MATERIA+"\" elcolor=\""+valor.CICL_COLOR+"\" seleccionado=\"0\" onclick=\"getInfo('"+valor.CICL_MATERIA+"','"+elalumno+"');\"";
			 			        		
                         cad="<div id=\""+valor.CICL_MATERIA+"\""+estiloPadre+">"+                                     
		                            "<div "+estiloAsignatura+">"+valor.CICL_MATERIAD+" ("+valor.CICL_CLAVEMAPA+")"+
		                            "</div>"+
		                            "<div title=\"Calificaci&oacute;n con la que aprobo la asignatura\" id=\""+valor.CICL_MATERIA+"_CAL\" style=\"font-size:9px; font-weight:bold; text-align: center; color:blue; position: absolute; left: 0mm; top: "+altoasig+"mm; width:"+eltam+"mm; height:"+(alto-altoasig)+"mm; border-top: 0.1mm solid black;\"></div>"+
		                            "<div title=\"Numero de veces que ha cursado la asignatura\"id=\""+valor.CICL_MATERIA+"_NVE\" style=\"font-size:9px; font-weight:bold; text-align: center; color:green;  position: absolute; left: "+eltam+"mm; top: "+altoasig+"mm; width:"+eltam+"mm; height:"+(alto-altoasig)+"mm; border-top: 0.1mm solid black;\"></div>"+
		                            "<div title=\"Ciclo en el que se aprobo la asignatura\" id=\""+valor.CICL_MATERIA+"_BAN\" style=\"font-size:9px; font-weight:bold; text-align: center; color:red;  position: absolute; left: "+eltam*2+"mm; top: "+altoasig+"mm; width:"+(tamfin-0.1)+"mm; height:"+(alto-altoasig)+"mm; border-top: 0.1mm solid black;\"></div>"+		                      
		                          "</div>";
		                   //console.log(cad);
                        $("#mihoja").append(cad);
                        $('[data-rel=popover]').popover({html:true});
                        arriba+=alto+2;

			             });
			
			          }
			    
				
			    }); //Ajax de busqueda de las materias 


			    
			    
			    //buscamos las asignaturas que ya aprobo 

				 $.ajax({
			           type: "GET",
			           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT a.MATCVE, b.MATE_DESCRIP, a.PDOCVE,a.LISCAL, a.PDOCVE FROM dlista a, cmaterias b "+
			        		   " where a.MATCVE=b.MATE_CLAVE and a.ALUCTR='"+elalumno+"' and a.LISCAL>=70"),
			           success: function(data){  
			               losdatos=JSON.parse(data);                            
			               jQuery.each(losdatos, function(clave, valor) { 
                                 $("#"+valor.MATCVE).css("background-color","#6EF2AE");
                                 $("#"+valor.MATCVE+"_CAL").html(valor.LISCAL);
                                 $("#"+valor.MATCVE+"_BAN").html(valor.PDOCVE);
				               });
			           }
				 });


				//buscamos las asignaturas que cursa actualmente
				 $.ajax({
			           type: "GET",
			           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT a.MATCVE, b.MATE_DESCRIP, a.PDOCVE,a.LISCAL FROM dlista a, cmaterias b "+
			        		   " where a.MATCVE=b.MATE_CLAVE and a.ALUCTR='"+elalumno+"' and a.PDOCVE=getciclo()"),
			           success: function(data){   
			               losdatos=JSON.parse(data);                          
			               jQuery.each(losdatos, function(clave, valor) { 
                               $("#"+valor.MATCVE).css("background-color","#77B5FF");
				               });

			               
			           }
				 });


				//numero de veces que ha cursado la asignatura
				 $.ajax({
			           type: "GET",
			           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT a.MATCVE, count(*) as N FROM dlista a"+
			        		   " where a.ALUCTR='"+elalumno+"' GROUP BY MATCVE"),
			           success: function(data){   
			               losdatos=JSON.parse(data);                          
			               jQuery.each(losdatos, function(clave, valor) { 
                               $("#"+valor.MATCVE+"_NVE").html(valor.N);
				               });

			               
			           }
				 });

				 /*
				 

				 */
				
				 $('#dlgproceso').modal("hide");  

		      } //success del primer ajax
	   
        });//ajax del semestre que mas asignaturas tiene
    	

        }

    
    function imprimir(nombreDiv) {
    
        var contenido= document.getElementById(nombreDiv).innerHTML;
        var contenidoOriginal= document.body.innerHTML;

        document.body.innerHTML = contenido;
        window.print();

        document.body.innerHTML = contenidoOriginal;
   }


   function verInfo(){
		$('#info').modal({show:true, backdrop: 'static'});
		elalumno=$("#alumnos").val();
		$("#elpromedio").html(laespera);
				 $("#loscreditost").html(laespera);
				 $("#loscreditos").html(laespera);
				 $("#prom_cr").html(laespera);
                 $("#prom_sr").html(laespera);
				 $("#periodos").html(laespera);
				//LLenamos datos del Perfil del Alumno 
				misql="SELECT CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE, "+
				               "getPeriodos('"+elalumno+"',getciclo()) as PERIODOS,"+
					           " CARR_DESCRIP as CARRERA, getavance('"+elalumno+"') as CREDITOS, getAvanceMat('"+elalumno+"') as MATERIAS, "+
					           " getPromedio('"+elalumno+"','N') as PROMEDIO_SR, getPromedio('"+elalumno+"','S') as PROMEDIO_CR   FROM falumnos a, ccarreras b"+
							   " where a.ALUM_MATRICULA='"+elalumno+"' and a.ALUM_CARRERAREG=b.CARR_CLAVE";				
				 $.ajax({
			           type: "GET",
			           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(misql),
			           success: function(data){   
						   losdatos=JSON.parse(data);   
						                        
			               jQuery.each(losdatos, function(clave, valor) { 				               
                                $("#elnombre").html(valor.NOMBRE);
                                $("#lacarrerainfo").html(valor.CARRERA);
                                $("#elpromedio").html(valor.PROMEDIO);
                                $("#loscreditost").html(valor.CREDITOS.split('|')[0]);
                                $("#loscreditos").html(valor.CREDITOS.split('|')[1]);
                                $("#etelavance").html(valor.CREDITOS.split('|')[2]);                               
                                $('#elavance').data('easyPieChart').update(valor.CREDITOS.split('|')[2]);
                                $("#credpen").html(valor.CREDITOS.split('|')[0]-valor.CREDITOS.split('|')[1]+" Cr&eacute;ditos pend."); 
                                $("#matcur").html(valor.MATERIAS.split('|')[1]);
 
                                $("#matavance").html(valor.MATERIAS.split('|')[2]);
                                $("#prom_cr").html(valor.PROMEDIO_CR);
                                $("#prom_sr").html(valor.PROMEDIO_SR);

								$("#periodos").html(valor.PERIODOS);

                                $("#fondo").css("display","none");
                                $("#info").css("display","block");
                                
				               });

			               
			           }
				 });
   }


 function verInfoPerfil(){

		$('#infoPerfil').modal({show:true, backdrop: 'static'});
		elalumno=$("#alumnos").val();
		//$("#elpromedio").html(laespera);
		$("#bodyperfil").empty();
		
	   $("#bodyperfil").append("<table id=tabPerfil class= \"display table-condensed table-striped "+
	           "table-sm table-bordered table-hover nowrap \" style= \"overflow-y: auto;\">"+
		"</table>");	
		$("#tabPerfil").append("<thead><tr><th style=\"text-aling:center\">ID</th><th style=\"text-aling:center\">PERFIL</th><th style=\"text-aling:center\">%</th></tr></thead>");
		$("#tabPerfil").append("<body id=\"tabbodyper\"></body>");
			

		misqlperfil="SELECT IDPER,DESCRIP,'100%' AS AVANCE FROM falumnos, perfilegreso where ALUM_MAPA=MAPA and ALUM_MATRICULA='"+elalumno+"' ORDER BY IDPER";				
		$.ajax({type: "GET",
			    url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(misqlperfil),
			    success: function(dataperfil){   
					losdatosperfil=JSON.parse(dataperfil);  
					var cont=0; 
					jQuery.each(losdatosperfil, function(clavep, valorp) { 				               
						$("#tabPerfil").append("<tr id=\"row_"+cont+"\"></tr>");
						$("#row_"+cont).append("<td id=\"idper_"+cont+"\">"+valorp.IDPER+"</td>"+
												 "<td><span class=\"text-primary\">"+valorp.DESCRIP+"</span></td>"+
												 "<td><span id=\"avance_"+valorp.IDPER+"\" class=\"badge badge-danger\">"+valorp.AVANCE+"</td>");
						cont++;	
					});

					for (i=0; i<cont;i++) {
						misqlav="SELECT  "+$("#idper_"+i).html()+" AS IDPER,"+
								"(SELECT COUNT(*) FROM matperfil c,eciclmate d Where IDPERFIL="+$("#idper_"+i).html()+
								" and (d.CICL_MAPA='"+$("#elmapa").html()+"' and IFNULL(d.CVEESP,'0')='0' and d.CICL_MATERIA=c.MATERIA)"+
								") AS NUMMATMAPA,"+
								"(SELECT COUNT(*) FROM matperfil c,eciclmate d Where IDPERFIL="+$("#idper_"+i).html()+
								" and (d.CICL_MAPA='"+$("#elmapa").html()+"' and  d.CVEESP="+$("#cveespecialidad").html()+"  and d.CICL_MATERIA=c.MATERIA)"+
								") AS NUMMATESP,"+
								"(SELECT COUNT(*) FROM dlista e where e.ALUCTR='"+$("#alumnos").val()+"' and e.LISCAL>=70 and e.MATCVE IN "+
								"	(SELECT MATERIA FROM vmatperfil WHERE MAPA='"+$("#elmapa").html()+"' and IDPERFIL="+$("#idper_"+i).html()+")) AS APROBADAS"+
								" FROM DUAL ";		
								
						$.ajax({type: "GET",
								url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(misqlav),
								success: function(dataav){   
									losdatosav=JSON.parse(dataav);  
									jQuery.each(losdatosav, function(claveav, valorav) { 
										total=parseInt(valorav.NUMMATMAPA)+parseInt(valorav.NUMMATESP);
									    $("#avance_"+valorav.IDPER).html(Math.round((parseInt(valorav.APROBADAS)/total*100),2));
									});
									
								}		
							});

                          
					}
				}		
			});
   }

   function imprimirKardex(){
	   window.open("kardex.php?matricula="+$("#alumnos").val(), '_blank'); 
   }


   function guardarTodos(){

   }
 
</script>



</body>
<?php } else {header("Location: index.php");}?>
</html>


