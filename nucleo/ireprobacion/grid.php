
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
        
        <link rel="stylesheet"  href="<?php echo $nivel; ?>js/morris/morris.css">
        


        
        

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	    
	    
 
    <div class="main-content"  style="margin-left: 10px; margin-right: 10px; width: 98%;">  
       
		 <div class="tabbable">
			      <ul class="nav nav-tabs" id="myTab">
				   <li class="active">
				        <a data-toggle="tab" href="#carreras">
				              <i class="green ace-icon fa fa-road bigger-120"></i>Carerras
				        </a>
				   </li>
		           <li>
		               <a data-toggle="tab" href="#profesores">
				               <i class="blue ace-icon fa fa-user bigger-120"></i>Profesores
				       </a>
				   </li>				
		       </ul>
		       <div class="tab-content">
					<div id="carreras" class="tab-pane fade in active">
					
					    <div class="row">
		                   <div class="col-sm-6">
					            <div class="dd" id="nestable">
					                  <ol class="dd-list" id="listaprin"> </ol>
					            </div>
					       </div>
					       
					       <div class="col-sm-6">
					             <div class="widget-box">
                                       <div class="widget-header widget-header-flat widget-header-small">
                                            <div class="row">
                                                <div class="col-sm-10">
                                                     <h5 class="widget-title"><i class="ace-icon fa fa-signal"></i> Programas Educativos</h5>
                                                </div>
                                                 <div class="col-sm-2">
                                                    <label class="middle">
													    <input id="checkrep" onclick="generaCarrera();" class="ace" type="checkbox" id="id-disable-check" />
													    <span class="lbl">Rep</span>
												    </label>
                                                </div>
                                            </div> 
                                        </div> <!-- del  widget-header -->
								        <div class="widget-body">
								             <div class="widget-main">             
								                   <div id="chartdiv" class="graph"></div>
								             </div>
								        </div>								       
								 </div> <!-- del  widget-box -->
					        </div>	<!-- del colsm de la caja de la grafica -->				       
					   					     
					          <div class="col-sm-12">
					              <div class="widget-box">
                                       <div class="widget-header widget-header-flat widget-header-small"  >
                                            <div class="row"> 
                                                <div class="col-sm-6"> 
                                                     <h5 class="widget-title"><i class="ace-icon fa fa-signal"></i> Asignatura</h5>
                                                </div>
                                                <div class="col-sm-6"> 
                                                    <label class="middle">
													    <input id="checkrepmat" onclick="generaGrafica();" class="ace" type="checkbox" id="id-disable-check" />
													    <span class="lbl">Rep</span>
												    </label>
                                                </div>
                                                <div class="col-sm-12"> 
                                                     <select class="form-control" id="lacarrera" onchange="generaGrafica();">
                                                         <option value="1">Sistemas</option><option value="11">Petrolera</option><option value="2">Industrial</option><option value="4">Civil</option><option value="5">Mecatronica</option><option value="7">Electromecanica</option><option value="8">Alimentarias</option> <option value="9">Gestion</option>                                                         
                                                     </select>                                                     
                                                 </div>
                                            </div> 
                                       </div>
								       <div class="widget-body">
											<div class="widget-main">             
								                 <div id="graphmaterias" class="graph"></div>
								            </div>
								       </div>
								 </div>
					          </div>	
					          
					          
					          <div class="col-sm-12">
					              <div class="widget-box">
                                       <div class="widget-header widget-header-flat widget-header-small"  >
                                            <div class="row"> 
                                                <div class="col-sm-6"> 
                                                     <h5 class="widget-title"><i class="ace-icon fa fa-signal"></i> Semestres</h5>
                                                </div>
                                                <div class="col-sm-6"> 
                                                    <label class="middle">
													    <input id="checkrepsem" onclick="generaGraficaSem();" class="ace" type="checkbox" id="id-disable-check" />
													    <span class="lbl">Rep</span>
												    </label>
                                                </div>
                                                <div class="col-sm-12"> 
                                                     <select class="form-control" id="elsemestre" onchange="generaGraficaSem();">
                                                         <option value="1">Sistemas</option><option value="11">Petrolera</option><option value="2">Industrial</option><option value="4">Civil</option><option value="5">Mecatronica</option><option value="7">Electromecanica</option><option value="8">Alimentarias</option> <option value="9">Gestion</option>                                                         
                                                     </select>                                                     
                                                 </div>
                                            </div> 
                                       </div> <!--  del widget header  -->
								       <div class="widget-body">
											<div class="widget-main">             
								                  <div id="graphsemestre" class="graph"></div>
								             </div>
								       </div>								        
								 </div><!--  widget-box -->
					          </div>  <!-- del colsm de la grafica -->  
					      </div>	 <!-- del row principal de la lista -->    				     					     					
				     </div>  <!-- del tab pane -->   
				     		
					 <div id="profesores" class="tab-pane fade">
					    
					       <div  class="row">
					           <div class="col-sm-6">
					               <div class="dd" id="nestableProf" > <ol class="dd-list" id="listaprinProf"></ol></div> 					                 
					            </div>					       				       
						        <div class="col-sm-6">
						              <div class="widget-box">
	                                       <div class="widget-header widget-header-flat widget-header-small"  >
	                                            <div class="row"> 
	                                                <div class="col-sm-6"> 
	                                                     <h5 class="widget-title"><i class="ace-icon fa fa-signal"></i> Profesores</h5>
	                                                </div>
	                                                <div class="col-sm-6"> 
	                                                    <label class="middle">
														    <input id="checkrepprof" onclick="generaGraficaProf();" class="ace" type="checkbox" id="id-disable-check" />
														    <span class="lbl">Rep</span>
													    </label>
	                                                </div>
	                                                <div class="col-sm-12"> 
	                                                     <select class="form-control" id="elprofesor" onchange="generaGraficaProf();">
	                                                         <option value="1">Sistemas</option><option value="11">Petrolera</option><option value="2">Industrial</option><option value="4">Civil</option><option value="5">Mecatronica</option><option value="7">Electromecanica</option><option value="8">Alimentarias</option> <option value="9">Gestion</option>	                                                         
	                                                     </select>	                                                     
	                                                 </div> <!--  de la columna del select  -->
	                                            </div> <!--  del row del titula de la grafica-->
	                                       </div><!--  del widget header-->
									       <div class="widget-body">
											     <div class="widget-main">             
									                  <div id="graphprofesor" class="graph"></div>
									             </div>
									      </div>
									        
									 </div><!--  del widget box-->
						        
					           </div>  <!-- Del col de de la grafica -->  
					       </div><!-- Del row de de la grafica -->  
					     </div>	<!-- Del tab pane-->  									     			
		        </div>
		</div>
	</div> <!--  Del contenedor principal  -->




<div id="right-menu" class="modal aside" data-body-scroll="false" data-offset="true" data-placement="left" data-fixed="true" data-backdrop="false" tabindex="-1">
     <div class="modal-dialog" style="width: 400px;">
		   <div class="modal-content">
		        <div class="modal-header no-padding">
					<div class="table-header">
						 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								 <span class="white">&times;</span>
						 </button>
						 Ciclo-Corte
					</div>
				 </div>
				 <div class="modal-body container">
                    <div class="row">
                        <div class="col-sm-1"></div>
                        
                        <div class="col-sm-3"> 
                             <span class="text-primary"><strong>Ciclo</strong></span>
                             <select class="form-control" id="ciclo" onchange="cargaCortes();"></select>
                        </div>                        
                        <div class="col-sm-1"></div>
                    </div>
                     <div class="row">
                        <div class="col-sm-1"></div>
                        <div class="col-sm-3">
                             <span class="text-success"><strong>No. Corte</strong></span> 
                            <select class="form-control" id="corte"></select></div>                        
                        <div class="col-sm-1"></div>
                    </div>
                    <div class="space-6"></div>
                     <div class="row">
                        <div class="col-sm-1"></div>
                        <div class="col-sm-3" style="text-align: center;">
                             <button class="btn btn-white btn-info btn-bold" onclick="mostrar();"><i class="ace-icon fa fa-floppy-o bigger-120 blue"></i> Ver Datos</button>
                        </div>                       
                        <div class="col-sm-1"></div>
                    </div>
						
                 </div><!-- /.modal-body -->
		   </div><!-- /.modal-content -->
          <button class="aside-trigger btn btn-info btn-app btn-xs ace-settings-btn" data-target="#right-menu" data-toggle="modal" type="button">
				<i data-icon1="fa-plus" data-icon2="fa-minus" class="ace-icon fa fa-plus bigger-110 icon-only"></i>
		  </button>
	 </div><!-- /.modal-dialog -->
   </div>


<div class="modal" id="dlgMaterias" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="overflow-x: auto; overflow-y: auto; height:300px;">
         <div  class="table-responsive">
		  <table id=tabmaterias class= "display table-condensed table-striped table-sm table-bordered  nowrap " style="overflow-y: auto;">
             <thead style="background-color: #92BCFA;">
                  <tr>
                    <td style="text-align:center; font-weight: bold;">Sem</td>
                    <td style="text-align:center; font-weight: bold;">Materia</td>
                    <td style="text-align:center; font-weight: bold;">Profesor</td>                    
                    <td style="text-align:center; font-weight: bold;">No. Alum</td>
                    <td style="text-align:center; font-weight: bold;">Reprobados</td>
                    <td style="text-align:center; font-weight: bold;"><i class="ace-icon fa blue fa-male bigger-130"></i> % Apr.</td>
                    <td style="text-align:center; font-weight: bold;"><i class="ace-icon fa red fa-male bigger-130"></i> % Rep.</td>  
                 </tr>                  
             </thead>
             <tbody id="cuerpo">
             
             </tbody>
         </table>
         </div>
      </div>     
    </div>
  </div>
</div>

 
        
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
<script src="<?php echo $nivel; ?>assets/js/jquery.nestable.min.js"></script>




<script src="<?php echo $nivel; ?>js/morris/raphael-min.js"></script>
<script src="<?php echo $nivel; ?>js/morris/morris.min.js"></script>


<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>






<script type="text/javascript">

   var graficaMateria;
   var graficaCarrera;
   var graficaSemestre;
   var graficaProfesor;
   var cadCarrera;  
   var elciclo;
   var elcorte;
   $(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
   $(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});




   function generaTabla(grid_data){
       c=1;
       $("#cuerpo").empty();
	   $("#tabMaterias").append("<tbody id=\"cuerpo\">");
       jQuery.each(grid_data, function(clave, valor) { 	    	    
    	    $("#cuerpo").append("<tr id=\"row"+c+"\">");
    	    $("#row"+c).append("<td class=\"text-primary\" style=\"font-size:10px;\"><strong>"+valor.SEMESTRE+"</strong></td>");
    	    $("#row"+c).append("<td class=\"text-success\" style=\"font-size:10px;\"><strong>"+valor.MATERIAD+"</strong></td>");
    	    $("#row"+c).append("<td class=\"text-success\" style=\"font-size:10px;\"><strong>"+valor.PROFESOR+"</strong></td>");
    	    $("#row"+c).append("<td class=\"text-success\" style=\"font-size:10px;\"><strong>"+valor.ALUM_TOT+"</strong></td>");
    	    $("#row"+c).append("<td class=\"text-success\" style=\"font-size:10px;\"><strong>"+valor.ALUM_REP+"</strong></td>");
    	    $("#row"+c).append("<td class=\"text-primary\" style=\"font-size:12px;\"><strong>"+valor.PORC_APR+"</strong></td>");    	    
    	    $("#row"+c).append("<td class=\"text-danger\" style=\"font-size:12px;\"><strong>"+valor.PORC_REPR+"</strong></td>");
    	    c++;
        });
}


   function detalle(carrera,materia,profesor,semestre){
	   aux='';
	   if (!(carrera=='')) { aux+=" and CARRERAD= '"+carrera+"'";}
	   if (!(materia=='')) { aux+=" and MATERIAD= '"+materia+"'";}
	   if (!(profesor=='')) { aux+=" and PROFESOR= '"+profesor+"'";}
	   if (!(semestre=='')) { aux+=" and SEMESTRE= '"+semestre+"'";}
	   
	   elsql="SELECT * FROM reprobacion where ciclo="+elciclo+" and corte="+elcorte+" and "+cadCarrera+aux+" order by SEMESTRE,MATERIA";
	   $.ajax({
           type: "GET",
           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
           success: function(data){
        	     generaTabla(JSON.parse(data));	        	
        	     $("#dlgMaterias").modal("show");     
                 },
           error: function(data) {	                  
                      alert('ERROR: '+data);
                  }
          });

	   }

   


   function cargaGraficas(elciclo,elcorte){
	   var elid=1;
       var colores=["4,53,252","238,18,8","238,210,7","5,223,5","7,240,191","240,7,223","240,7,7","240,7,12"];

       
       /*======================================REPROBACIÓN POR CARRERA ===========================================*/
       $("#chartdiv").empty();
  	   $.ajax({
             type: "GET",
             url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT CARRERAD as x, ROUND(AVG(PORC_APR),2) AS y"+
                                                                     "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+
                                                                     " and "+cadCarrera+" group by CARRERA ORDER By 2"),
             success: function(data){ 
                         	  
          	  datosgraf=JSON.parse(data);  
          	  
          	 graficaCarrera= Morris.Bar({
         		   element: 'chartdiv',
         		   data: datosgraf,
         		   xkey: 'x',
         		   ykeys: ['y'],
         		   labels: ['y'],
         		   xLabelAngle: 50,
         		   postUnits: '%',
         		  gridTextSize: '10',
         		   resize: true,
         		   barColors: function (row, series, type) {
         		     if (type === 'bar') {return 'rgb(' +colores[row.x]+')';}
         		     else {return '#000';}
         		   }
         		 });

          	    $( "#chartdiv svg rect" ).on("click", function(data) {    			     
                      detalle($(".morris-hover-row-label").html(),'','','');    			     
    			});
			
          	
             }
  	   });

  	// ========================= cargamos los datos de la carrera del sistema===================================================
  	     $("#graphmaterias").empty();
  	 	  $.ajax({
  		       type: "GET",
  		       url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT MATERIAD as x, ROUND(AVG(PORC_APR),2) AS y"+
  		                                                               "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+
  		                                                               " and "+cadCarrera+" group by MATERIAD ORDER By 2"),
  		       success: function(data){        	   
  		    	  datosgraf=JSON.parse(data);  
  		    	  
  		    	 graficaMateria= Morris.Bar({
  		   		   element: 'graphmaterias',
  		   		   data: datosgraf,
  		   		   xkey: 'x',
  		   		   ykeys: ['y'],
  		   		   labels: ['y'],
  		   		   xLabelAngle: 50,
  		   		   postUnits: '%',
  		   		  gridTextSize: '10',
  		   		   resize: true
  		   		  
  		   		 });

  		    	
      			
  		    	
  		       }
  		   });


  	 	// ========================= cargamos los datos de SEMESTRE carrera de sistemas===================================================
  	 	  $("#graphsemestre").empty();
  	 	  $.ajax({
  		       type: "GET",
  		       url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT SEMESTRE as x, ROUND(AVG(PORC_APR),2) AS y"+
  		                                                               "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and "+cadCarrera+" group by SEMESTRE ORDER By 2"),
  		       success: function(data){          	   
  		    	  datosgraf=JSON.parse(data);  
  		    	  
  		    	  graficaSemestre= Morris.Bar({
  		   		   element: 'graphsemestre',
  		   		   data: datosgraf,
  		   		   xkey: 'x',
  		   		   ykeys: ['y'],
  		   		   labels: ['y'],
  		   		   xLabelAngle: 50,
  		   		   postUnits: '%',
  		   		   gridTextSize: '10',
  		   		   resize: true,
  		   		   barColors: function (row, series, type) {
  	       		     if (type === 'bar') {return 'rgb(' +colores[2]+')';}
  	       		     else {return '#000';}
  	       		   }
  		   		  
  		   		 });
  		    	
  		       }
  		   });

  	 	// ========================= cargamos los datos de PROFESOR carrera de sistemas===================================================
  	 	  $("#graphprofesor").empty();
  	 	  $.ajax({
  		       type: "GET",
  		       url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT PROFESOR as x, ROUND(AVG(PORC_APR),2) AS y"+
  		                                                               "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and "+cadCarrera+" group by PROFESOR ORDER By 2"),
  		       success: function(data){          	   
  		    	  datosgraf=JSON.parse(data);  
  		    	  graficaProfesor= Morris.Bar({
  		   		   element: 'graphprofesor',
  		   		   data: datosgraf,
  		   		   xkey: 'x',
  		   		   ykeys: ['y'],
  		   		   labels: ['y'],
  		   		   xLabelAngle: 60,
  		   		   postUnits: '%',
  		   		   gridTextSize: '8',
  		   		   resize: true,
  		   		   barColors: function (row, series, type) {
  	       		     if (type === 'bar') {return 'rgb(' +colores[3]+')';}
  	       		     else {return '#000';}
  	       		   }
  		   		  
  		   		 });
  		    	
  		       }
  		   });
  		   
  	 
  	   $("#listaprin").empty();	
  	   $.ajax({
             type: "GET",
             url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT CARRERA, CARRERAD, ROUND(AVG(PORC_APR),2) AS PORC_APR, ROUND(AVG(PORC_REPR),2) AS PORC_REPR "+
                                                                     "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and "+cadCarrera+" group by CARRERA ORDER By 4"),
             success: function(data){          	   
          	  carreras=JSON.parse(data);  
          	  
          	  jQuery.each(carreras, function(clave, valor){	
                    $("#listaprin").append("<li class=\"dd-item item-blue\" data-id=\""+elid+"\" id=\"Car"+valor.CARRERA+"\">\n"+
  					                         "<div class=\"dd-handle\">\n"+
  				                                  "<div class=\"row\">\n"+
  				                                      "<div class=\"col-sm-5\" style=\"font-size:10px;\" title=\"Nombre del Programa Educativo\">"+valor.CARRERAD+"</div>\n"+
  					                                  "<div class=\"col-sm-3 text-success\" title=\"Porcentaje de Aprobaci&oacute;n\" style=\"text-align: right;\"><span class=\"label label-success arrowed-in\">"+valor.PORC_APR+"%</span></div>\n "+  
  					                                  "<div class=\"col-sm-3 text-warning\" title=\"Porcentaje de Reprobaci&oacute;n\" style=\"text-align: right;\"><span class=\"label label-warning arrowed-in\">"+valor.PORC_REPR+"%</span></div> \n"+ 
  					                              "</div>\n"+							 				
  				                              "</div>\n "+
  				                          "</li>\n");
                    elid++;
          	   }); //dl ajax de carrera  


          	  elid++;
                //Buscamos el promedio por semestre de las carreras 
                $.ajax({
                          type: "GET",
                          url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT CARRERA, SEMESTRE, ROUND(AVG(PORC_APR),2) AS PORC_APR, ROUND(AVG(PORC_REPR),2) AS PORC_REPR "+
                                                                                  "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and "+cadCarrera+" group by CARRERA, SEMESTRE ORDER BY 4 "),
                          success: function(data){          	   
                       	  semestres=JSON.parse(data);  

                       	  
                       	  jQuery.each(semestres, function(clave, valorSem){	                   	  
                           	     if (!($("#Carol"+valorSem.CARRERA).length)) {
                       		         $("#Car"+valorSem.CARRERA).append("<ol class=\"dd-list\" id=\"Carol"+valorSem.CARRERA+"\"></ol>\n");}
                       	     
                           	     
                                 $("#Carol"+valorSem.CARRERA).append("<li class=\"dd-item item-green\" data-id=\""+elid+"\" id=\"Sem"+valorSem.CARRERA+valorSem.SEMESTRE+"\">\n"+
               					                         "<div class=\"dd-handle\">\n"+
               				                                  "<div class=\"row\">\n"+
               				                                      "<div class=\"col-sm-5\"  style=\"font-size:10px;\">SEMESTRE "+valorSem.SEMESTRE+"</div>\n"+
               					                                  "<div class=\"col-sm-3 text-success\" title=\"Porcentaje de Aprobaci&oacute;n\" style=\"text-align: right;\"><span class=\"label label-success arrowed-in\">"+valorSem.PORC_APR+"%</span></div>\n "+  
               					                                  "<div class=\"col-sm-3 text-warning\" title=\"Porcentaje de Reprobaci&oacute;n\" style=\"text-align: right;\"><span class=\"label label-warning arrowed-in\">"+valorSem.PORC_REPR+"%</span></div>\n "+ 
               					                              "</div>\n"+							 				
               				                              "</div>\n "+
               				                          "</li>\n");
        	                          
                                elid++;
                           	  });
                       	  
                  			
                          } //del succcess de los semestre  
                	   });  //del ajax de los semestre  


                //Buscamos el promedio por MATERUA de las carreras 
                $.ajax({
                          type: "GET",
                          url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT CONCAT(CARRERA,SEMESTRE) as CARSEM, PROFESOR,MATERIA, MATERIAD, SUM(ALUM_TOT) AS ALUM_TOT, SUM(ALUM_REP) AS ALUM_REP, ROUND(AVG(PORC_APR),2) AS PORC_APR, ROUND(AVG(PORC_REPR),2) AS PORC_REPR "+
                                                                                  "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and "+cadCarrera+" group by CARRERA, SEMESTRE,PROFESOR, MATERIA,MATERIAD ORDER BY MATERIA,PROFESOR,7"),
                            success: function(data){          	   
                       	  materias=JSON.parse(data);  

                       	  
                       	  jQuery.each(materias, function(clave, valorMat){	                   	  
                           	     if (!($("#Carmat"+valorMat.CARSEM).length)) {
                       		         $("#Sem"+valorMat.CARSEM).append("<ol class=\"dd-list\" id=\"Carmat"+valorMat.CARSEM+"\"></ol>\n");}
                       	     
                           	     
                                 $("#Carmat"+valorMat.CARSEM).append("<li class=\"dd-item item-orange\" data-id=\""+elid+"\">\n"+
               					                         "<div class=\"dd-handle\">\n"+
               				                                  "<div class=\"row\">\n"+
               				                                      "<div class=\"col-sm-5\"  style=\"font-size:10px;\">"+valorMat.MATERIAD+"<br/>"+valorMat.PROFESOR+"</div>\n"+
               					                                  "<div class=\"col-sm-2 text-success\" title=\"Porcentaje de Aprobaci&oacute;n\" style=\"text-align: right;\">"+valorMat.PORC_APR+"%</div> \n"+  
               					                                  "<div class=\"col-sm-2 text-warning\" title=\"Porcentaje de Reprobaci&oacute;n\" style=\"text-align: right;\">"+valorMat.PORC_REPR+"%</div>\n "+ 
               					                                   "<div class=\"col-sm-1 text-success\"title=\"Alumnos inscritos en la materia\" style=\"text-align: right;\"><i class=\"ace-icon fa blue fa-male bigger-130\"></i><br/> "+valorMat.ALUM_TOT+"</div>\n "+
               					                                   "<div class=\"col-sm-1 text-warning\"title=\"Alumnos reprobados en la materia\"  style=\"text-align: right;\"><i class=\"ace-icon fa red fa-male bigger-130\"></i> <br/>"+valorMat.ALUM_REP+"</div>\n "+ 
               					                              "</div>\n"+							 				
               				                              "</div>\n "+
               				                          "</li>\n");
        	                          
                                elid++;
                           	  });
                       	  
                       	 colapsar();	
                          } //del succcess de los semestre  
                	   });  //del ajax de los semestre  
           	   
                
                 
             }// Del succcess del ajax de carrera 
   	   }); //dl ajax de carrera    


   	


  	// ========================= cargamos los datos de los profesors ===================================================
         elid=1;

         $("#listaprinProf").empty();	
         $.ajax({
             type: "GET",
             url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT CVEPROF,PROFESOR, ROUND(AVG(PORC_APR),2) AS PORC_APR, ROUND(AVG(PORC_REPR),2) AS PORC_REPR "+
                                                                     "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and "+cadCarrera+" group by CVEPROF,PROFESOR ORDER By 4"),
             success: function(data){          	   
          	  profesores=JSON.parse(data);  
          	  
          	  jQuery.each(profesores, function(clave, valorProf){	
              	 
                    $("#listaprinProf").append("<li class=\"dd-item item-blue\" data-id=\""+elid+"\" id=\"Prof"+valorProf.CVEPROF+"\">\n"+
  					                         "<div class=\"dd-handle\">\n"+
  				                                  "<div class=\"row\">\n"+
  				                                      "<div class=\"col-sm-5\" style=\"font-size:10px;\" title=\"Nombre del Programa Educativo\">"+valorProf.PROFESOR+"</div>\n"+
  					                                  "<div class=\"col-sm-3 text-success\" title=\"Porcentaje de Aprobaci&oacute;n\" style=\"text-align: right;\"><span class=\"label label-success arrowed-in\">"+valorProf.PORC_APR+"%</span></div>\n "+  
  					                                  "<div class=\"col-sm-3 text-warning\" title=\"Porcentaje de Reprobaci&oacute;n\" style=\"text-align: right;\"><span class=\"label label-warning arrowed-in\">"+valorProf.PORC_REPR+"%</span></div> \n"+ 
  					                              "</div>\n"+							 				
  				                              "</div>\n "+
  				                          "</li>\n");
                    elid++;
          	   }); //dl ajax de carrera  


          	  elid++;
                //Buscamos las materias que da el profesor
                $.ajax({
                          type: "GET",
                          url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT CVEPROF,PROFESOR, MATERIA, MATERIAD,  SUM(ALUM_TOT) as ALUM_TOT,sum(ALUM_REP) as ALUM_REP,ROUND(AVG(PORC_APR),2) AS PORC_APR, ROUND(AVG(PORC_REPR),2) AS PORC_REPR "+
                                                                                  "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and "+cadCarrera+" group by PROFESOR, MATERIA, MATERIAD ORDER BY 8"),
                          success: function(data){          	   
                       	materias=JSON.parse(data);  
                       	  jQuery.each(materias, function(clave, valorMat){	 
                           	     if (!($("#MatolProf"+valorMat.CVEPROF).length)) {
                       		         $("#Prof"+valorMat.CVEPROF).append("<ol class=\"dd-list\" id=\"MatolProf"+valorMat.CVEPROF+"\"></ol>\n");}
                       	     
                           	     $("#MatolProf"+valorMat.CVEPROF).append("<li class=\"dd-item item-orange\" data-id=\""+elid+"\">\n"+
  				                         "<div class=\"dd-handle\">\n"+
  			                                  "<div class=\"row\">\n"+
  			                                      "<div class=\"col-sm-5\"  style=\"font-size:10px;\">"+valorMat.MATERIAD+"</div>\n"+
  				                                  "<div class=\"col-sm-2 text-success\" title=\"Porcentaje de Aprobaci&oacute;n\" style=\"text-align: right;\">"+valorMat.PORC_APR+"%</div> \n"+  
  				                                  "<div class=\"col-sm-2 text-warning\" title=\"Porcentaje de Reprobaci&oacute;n\" style=\"text-align: right;\">"+valorMat.PORC_REPR+"%</div>\n "+ 
  				                                   "<div class=\"col-sm-1 text-success\"title=\"Alumnos inscritos en la materia\" style=\"text-align: right;\"><i class=\"ace-icon fa blue fa-male bigger-130\"></i><br/> "+valorMat.ALUM_TOT+"</div>\n "+
  				                                   "<div class=\"col-sm-1 text-warning\"title=\"Alumnos reprobados en la materia\"  style=\"text-align: right;\"><i class=\"ace-icon fa red fa-male bigger-130\"></i><br/> "+valorMat.ALUM_REP+"</div>\n "+ 
  				                              "</div>\n"+							 				
  			                              "</div>\n "+
  			                          "</li>\n");
                                 
        	                          
                                elid++;
                           	  });

                   	          colapsar();
                   	          //LLenamos los combos de la carrera 

                   	           $.ajax({
                                 type: "GET",
                                  url:  "../base/dameselect.php?bd=Mysql&sel=0&sql="+encodeURI("SELECT DISTINCT(CARRERA), CARRERAD "+
                                                                                  "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and "+cadCarrera),
                                      success: function(data){   
                                      	   $("#lacarrera").html(data);
                                      	   $("#elsemestre").html(data);
                                      	   $("#elprofesor").html(data);
                                            }
                   	           }); 
                   	          
                  			
                          } //del succcess de los semestre  
                	   });  //del ajax de los semestre  
                 
             }// Del succcess del ajax de carrera 
   	   }); //dl ajax de carre
   } //Fin del function 



   function mostrar(){
	   elciclo=$("#ciclo").val();
	   elcorte=$("#corte").val();
	   cargaGraficas($("#ciclo").val(),$("#corte").val());
	   $('.modal.aside').modal('hide');
	   }

   function cargaCortes(){
	   $.ajax({
           type: "GET",
            url:  "../base/dameselect.php?bd=Mysql&sel=0&sql="+encodeURI("SELECT DISTINCT(CORTE), CORTE "+
                                                            "  from reprobacion where CICLO="+$("#ciclo").val()+" and "+cadCarrera),
                success: function(data){   
                	   $("#corte").html(data);                 
                      }
	           }); 
	   }

/*===========================================================================================================================*/
   jQuery(function($){
	 
        $('.modal.aside').ace_aside();		
		$('#aside-inside-modal').addClass('aside').ace_aside({container: '#my-modal > .modal-dialog'});
		$(document).one('ajaxloadstart.page', function(e) {$('.modal.aside').remove();$(window).off('.aside')});
		$('.modal.aside').modal('show');

		cadCarrera=" CARRERA IN ('<?php echo str_replace(",","','",$_SESSION['carrera'])?>')";
		
		$.ajax({
            type: "GET",
             url:  "../base/dameselect.php?bd=Mysql&sel=0&sql="+encodeURI("SELECT DISTINCT(CICLO), CICLO "+
                                                             "  from reprobacion where "+cadCarrera),
                 success: function(data){   
                 	   $("#ciclo").html(data); 
                 	  
                 	                   
                       }
	           }); 
	          

		
		
	
	});

 /*===========================================================================================================================*/
   

   function colapsar(){

	   $('.dd').nestable();
	   $('.dd').nestable().nestable('collapseAll');

	   $('#nestable').nestable();
	   $('#nestableProf').nestable();
	   
	   $('[data-action="collapse"],[data-action="expand"]').remove();

	   let collapseBtnTemplate = '<button data-action="collapse" type="button">Collapse</button><button data-action="expand" type="button" style="display: none;">Expand</button>';
	   let expandBtnTemplate = '<button data-action="collapse" type="button" style="display: none;">Collapse</button><button data-action="expand" type="button">Expand</button>';

	   $('#nestable li.dd-item').each(function(){$(this).prepend( $(this).hasClass('dd-collapsed')? expandBtnTemplate : collapseBtnTemplate );})
	      
	   $('#nestableProf li.dd-item').each(function(){$(this).prepend( $(this).hasClass('dd-collapsed')? expandBtnTemplate : collapseBtnTemplate );})
	   
       $('.dd-handle a').on('mousedown', function(e){e.stopPropagation();});
		
	   $('[data-rel="tooltip"]').tooltip();

	   $("#texto").val($("#listaprin").html());
}


   /*======================================REPROBACIÓN POR MATERIA ===========================================*/
   function generaGrafica() {
	   
	   if ($("#checkrepmat").is(':checked')){ tipo='ROUND(AVG(PORC_REPR),2)'; } else {tipo='ROUND(AVG(PORC_APR),2)'; }
	   $.ajax({
	       type: "GET",
	       url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT MATERIAD as x, "+tipo+" AS y"+
	                                                               "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and CARRERA="+$("#lacarrera").val()+" group by MATERIAD ORDER By 2"),
	       success: function(data){   
	    	  datosgraf=JSON.parse(data);  	    	  
	    	  graficaMateria.setData(datosgraf);

	    	  $( "#graphmaterias svg rect" ).on("click", function(data) { 		     
                  detalle($("#lacarrera  option:selected").text(),$("#graphmaterias .morris-hover-row-label").html(),'','');    			     
		     	});
					    	
	       }
	   });
   }


   //======================== De la reprobacion general por carrera usado cuando se hace clic en el check de rep
   function generaCarrera() {
	   
	   if ($("#checkrep").is(':checked')){ tipo='ROUND(AVG(PORC_REPR),2)'; } else {tipo='ROUND(AVG(PORC_APR),2)'; }
	   $.ajax({
	       type: "GET",
	       url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT CARRERAD as x, "+tipo+" AS y"+
	                                                               "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and "+cadCarrera+" group by CARRERAD ORDER By 2"),
	       success: function(data){   

	    	  datosgraf=JSON.parse(data);  	    	  
	    	  graficaCarrera.setData(datosgraf);

		      $( "#chartdiv svg rect" ).on("click", function(data) { 		     
                  detalle($("#chartdiv .morris-hover-row-label").html(),'','','');    			     
		     	}); 	
	    	 
	       }
	   });
   }

 function generaGraficaSem() {

	   if ($("#checkrepsem").is(':checked')){ tipo='ROUND(AVG(PORC_REPR),2)'; } else {tipo='ROUND(AVG(PORC_APR),2)'; }
	   $.ajax({
	       type: "GET",
	       url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT SEMESTRE as x, "+tipo+" AS y"+
	                                                               "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and CARRERA="+$("#elsemestre").val()+" group by SEMESTRE ORDER By 2"),
	       success: function(data){   
	    	  datosgraf=JSON.parse(data);  	    	  
	    	  graficaSemestre.setData(datosgraf);	   
	    	  $( "#graphsemestre svg rect" ).on("click", function(data) { 		     
                  detalle($("#elsemestre  option:selected").text(),'','',$("#graphsemestre .morris-hover-row-label").html());    			     
		     	});
		     	    	 	
	       }
	   });
   }



 function generaGraficaProf() {
	   if ($("#checkrepprof").is(':checked')){ tipo='ROUND(AVG(PORC_REPR),2)'; } else {tipo='ROUND(AVG(PORC_APR),2)'; }
	   $.ajax({
	       type: "GET",
	       url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT PROFESOR as x, "+tipo+" AS y"+
	                                                               "  from reprobacion where CICLO="+elciclo+" AND CORTE="+elcorte+" and CARRERA="+$("#elprofesor").val()+" group by PROFESOR ORDER By 2"),
	       success: function(data){   
	    	  datosgraf=JSON.parse(data);  	    	  
	    	  graficaProfesor.setData(datosgraf);	
	    	  $( "#graphprofesor svg rect" ).on("click", function(data) { 		     
                  detalle($("#elprofesor  option:selected").text(),'',$("#graphprofesor .morris-hover-row-label").html(),'');    			     
		     	});    	
	       }
	   });
 }



	
</script>



    

	</body>
<?php } else {header("Location: index.php");}?>
</html>
