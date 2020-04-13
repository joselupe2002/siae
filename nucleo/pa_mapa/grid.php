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
                
		  <div class="widget-box widget-color-green">
			  <div class="widget-header widget-header-small" style="padding:0px;">
			      <div class="row" >		                    		
						<div class="col-sm-2" style="text-align: center;">				              										
							<button title="Imprimir avance curricular" onclick="imprimir('mihoja');" class="btn  btn-white btn-primary" value="Agregar"> 
								<i class="ace-icon blue fa fa-print bigger-160"></i><span class="btn-small"></span>            
							</button>
						</div>			
						<div class="col-sm-8"  style="text-align:center; vertical-align:center;">
						    <span class="text-white lead" id="lacarrera">
								<strong><?php echo $_GET["descrip"];?></strong>
						    </span>							    
						</div>       			 
						<div class="col-sm-2" ></div>
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

        verAvance('<?php echo $_SESSION["usuario"];?>');
       
	      
    });


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
								                        "<h5 class=\"widget-title smaller\">"+utf8Decode(valor.MATE_DESCRIP)+"   </h5>"+
								                              "<span class=\"grey\">"+utf8Decode(valor.PROFESORD)+"</span>"+								                        
								                        "<span class=\"widget-toolbar no-border\"><i class=\"ace-icon green fa fa-star-o bigger-110\"></i>"+valor.LISCAL+"</span> "+                                           
							                       "</div>"+
					                           "</div>"+
				                             "</div>");
				 
            	     $('#modalDocument').modal({show:true, backdrop: 'static'});
	               });
           }
	 });
		 
	  
	   }

   function verAvance(matricula) {
	   $.ajax({
  		   type: "GET",
  		   url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT ALUM_MAPA, ALUM_ESPECIALIDAD "+
  		  		   " FROM falumnos where ALUM_MATRICULA='"+matricula+"'"),
  		   success: function(data){  
  			   losdatos=JSON.parse(data);  
		       jQuery.each(losdatos, function(clave, valor) { elmapa=valor.ALUM_MAPA; laespecialidad=valor.ALUM_ESPECIALIDAD;});
  			   cargaMapa(elmapa,laespecialidad,matricula);
  		   }
    	});

	    }
   

    function cargaMapa(elmapa,laespecialidad,elalumno){
    	$("#mihoja").empty();

    	$("#fondo").css("display","block");
    	$("#fondo").empty();
    	$("#fondo").append("<img src=\"../../imagenes/menu/esperar.gif\" style=\"background: transparent; width: 100px; height: 80px\"/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>");
    	
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
			           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select veciclmate.*, (SELECT COUNT(*) from `eseriacion` where seri_materia=cicl_materia "+
					           " and seri_mapa=CICL_MAPA) as numseriada from veciclmate where CICL_MAPA='"+elmapa+"' and (ifnull(CVEESP,0)=0 or ifnull(CVEESP,0)='"+laespecialidad+"') ORDER BY cicl_cuatrimestre, cicl_materia"),
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
                        $("#lacarrera").html(mapa);
		
                        // Para colocar el primero 1 
                        cad="<div style=\"font-size:12px; font-weight:bold; position: absolute; left: "+(left+(Math.round(ancho/2)))+"mm; "+
												"top:1mm; width:5mm; height:5mm;\"><span id =\"periodo_"+periodo+"\""+
												"class=\"pull-right badge badge-info classper\" Style=\"cursor:pointer;\">"+periodo+"</span></div>";
							   $("#mihoja").append(cad);	 

			        	jQuery.each(losdatos, function(clave, valor) { 
				           et="";
				           if (valor.numseriada>0){et="background-color:red;";}
				           

				           if (!(periodo==valor.CICL_CUATRIMESTRE)) { 
					           left+=ancho+4; 
					           arriba=8;
					           periodo=valor.CICL_CUATRIMESTRE;
							   cad="<div style=\"font-size:12px; font-weight:bold; position: absolute; left: "+(left+(Math.round(ancho/2)))+"mm;"+
							   " top:1mm; width:5mm; height:5mm;\"><span id =\"periodo_"+periodo+"\""+
							   " class=\"pull-right badge badge-info classper\" Style=\"cursor:pointer;\">"+periodo+"</span></div>";
							   $("#mihoja").append(cad);

					           }
                        
			        	   estiloPadre="style= \"background-color:white; position: absolute; left: "+left+"mm; top: "+arriba+"mm; width: "+ancho+"mm; height:"+alto+"mm; border: 0.1mm solid;\"";
			               estiloAsignatura="style=\"font-size:7px; font-weight:bold; text-align: center; word-wrap: break-word;  "+
			                                        "cursor:pointer; position:absolute; left: 0mm; top: 0mm; width:100%; height:"+altoasig+"mm; border-bottom: 0.1mm solid;\""+ 
			                                        "id=\""+valor.CICL_MATERIA+"\" elcolor=\""+valor.CICL_COLOR+"\" seleccionado=\"0\" onclick=\"getInfo('"+valor.CICL_MATERIA+"','"+elalumno+"');\"";
			 			        		
                         cad="<div id=\""+valor.CICL_MATERIA+"\""+estiloPadre+">"+                                     
		                            "<div "+estiloAsignatura+">"+utf8Decode(valor.CICL_MATERIAD)+" <span class=\"text-warning\"><br/>"+valor.CICL_CLAVEMAPA+"</span>"+
		                            "</div>"+
		                            "<div title=\"Calificaci&oacute;n con la que aprobo la asignatura\" id=\""+valor.CICL_MATERIA+"_CAL\" style=\"font-size:9px; font-weight:bold; text-align: center; color:blue; position: absolute; left: 0mm; top: "+altoasig+"mm; width:"+eltam+"mm; height:"+(alto-altoasig)+"mm; border-top: 0.1mm solid black;\"></div>"+
		                            "<div title=\"Numero de veces que ha cursado la asignatura\"id=\""+valor.CICL_MATERIA+"_NVE\" style=\"font-size:9px; font-weight:bold; text-align: center; color:green;  position: absolute; left: "+eltam+"mm; top: "+altoasig+"mm; width:"+eltam+"mm; height:"+(alto-altoasig)+"mm; border-top: 0.1mm solid black;\"></div>"+
		                            "<div title=\"Ciclo en el que se aprobo la asignatura\" id=\""+valor.CICL_MATERIA+"_BAN\" style=\"font-size:9px; font-weight:bold; text-align: center; color:red;  position: absolute; left: "+eltam*2+"mm; top: "+altoasig+"mm; width:"+(tamfin-0.1)+"mm; height:"+(alto-altoasig)+"mm; border-top: 0.1mm solid black;\"></div>"+
		                            "<div style=\"position:absolute; top:18px; left:80px;\" ><a id=\""+valor.CICL_MATERIA+"_ENL\" target=\"_BLANK\" href=\""+valor.RUTA+"\"><img id=\""+valor.CICL_MATERIA+"_PDF\" title=\"Ver Manual de Asignatura\" src=\"../../imagenes/menu/pdf.png\" width=\"15px\" height=\"15px\" /></a></div>"+		                      
		                          "</div>";
		                   //console.log(cad);
                        $("#mihoja").append(cad);

                        if (valor.RUTA=='') {$('#'+valor.CICL_MATERIA+"_ENL").remove(); $('#'+valor.CICL_MATERIA+"_PDF").attr('src', "..\\..\\imagenes\\menu\\pdfno.png");}
                        $('[data-rel=popover]').popover({html:true});
                        arriba+=alto+2;
			             });
			
			          }
			    
				
			    }); //Ajax de busqueda de las materias 


			    //buscamos las asignaturas que ya aprobo 

				 $.ajax({
			           type: "GET",
			           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT a.MATCVE, b.MATE_DESCRIP, a.PDOCVE,a.LISCAL, a.PDOCVE, IFNULL(a.LISTC15,'0') AS LISTC15 FROM dlista a, cmaterias b "+
			        		   " where a.MATCVE=b.MATE_CLAVE and a.ALUCTR='"+elalumno+"' and a.LISCAL>=70"),
			           success: function(data){  
			               losdatos=JSON.parse(data);                            
			               jQuery.each(losdatos, function(clave, valor) { 
							     if (valor.LISTC15=='9999') { 
									 $("#"+valor.MATCVE).prop("title","Asignatura Aprobada por (Revalidación o Equivalencia)"); 
									 $("#"+valor.MATCVE).css("background-color","#F2F899"); }
                                 else {
									 $("#"+valor.MATCVE).prop("title","Asignatura Aprobada en curso normal"); 
									 $("#"+valor.MATCVE).css("background-color","#CFFCE9");}
                                 $("#"+valor.MATCVE+"_CAL").html(valor.LISCAL);
                                 $("#"+valor.MATCVE+"_BAN").html(valor.PDOCVE);								 
				               });

							//buscamos las asignaturas que cursa actualmente
							$.ajax({
								type: "GET",
								url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT a.MATCVE, b.MATE_DESCRIP, a.PDOCVE,a.LISCAL FROM dlista a, cmaterias b "+
										" where a.MATCVE=b.MATE_CLAVE and a.ALUCTR='"+elalumno+"' and a.PDOCVE=getciclo()"),
								success: function(data){   
									losdatos=JSON.parse(data);                          
									jQuery.each(losdatos, function(clave, valor) { 
										$("#"+valor.MATCVE).prop("title","Asignatura que cursa actualmente"); 
										$("#"+valor.MATCVE).css("background-color","#CBF899");
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
							$('#dlgproceso').modal("hide");  
			           } // Fin del success
				 });


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




 
</script>



</body>
<?php } else {header("Location: index.php");}?>
</html>


