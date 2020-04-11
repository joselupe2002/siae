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

        

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	   	    
	      <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
	      
		  <div class="widget-box widget-color-green">
			  <div class="widget-header widget-header-small" style="padding:0px;">
			      <div class="row" >		                    		
						<div class="col-sm-2" style="text-align: center;">				              				
							<button title="Regresar a listado de planes" onclick="regresar();" class="btn  btn-white btn-primary" value="Agregar"> 
								<i class="ace-icon green fa fa-arrow-left bigger-160"></i><span class="btn-small"></span>            
							</button>
							<button title="Imprimir avance curricular" onclick="imprimir('mihoja');" class="btn  btn-white btn-primary" value="Agregar"> 
								<i class="ace-icon blue fa fa-print bigger-160"></i><span class="btn-small"></span>            
							</button>
						</div>			
						<div class="col-sm-5">
						    <span class="label label-info" id="lacarrera"></span>	
						    <span class="label label-warning">Especialidad</span>							
						    <select class="form-control" id="especialidad"></select>
						</div>       			 
						<div class="col-sm-4" >
							<div class="ace-settings-container" id="panelser">
								<div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
									<i class="ace-icon fa fa-cog bigger-130"></i>
								</div>				
								<div class="ace-settings-box"   id="ace-settings-box">						
								</div><!-- /.ace-settings-box -->
							</div><!-- /.ace-settings-container -->
							<!-- /section:settings.box -->				 
							<input id="gritter-light" checked="" type="checkbox" class="ace ace-switch ace-switch-5" />		        
						</div>	
						<div class="col-sm-1">	</div>		 			               		           
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


<script type="text/javascript">

var id_unico="";
var estacambiandoperiodo=false;
var elperiodosel=0;
var estaseriando=false;
var matser="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		actualizaSelect("especialidad","SELECT ID, DESCRIP FROM especialidad i where i.MAPA='<?php echo $_GET['mapa'];?>'"+
					   "ORDER BY DESCRIP");
		$("#especialidad").append("<option value=\"0\">Mapa curricular</option>");		   
		$("#especialidad").change(function(){cargaMapa();}); 	      
	});
	

	function cargaMapa () {
		$("#mihoja").empty();
		$.ajax({
    		   type: "GET",
    		   url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT MAX(N) as N FROM (select CICL_CUATRIMESTRE,count(*) as N "+
    	    		   "from veciclmate where CICL_MAPA='<?php echo $_GET['mapa'];?>' group by CICL_CUATRIMESTRE) as miscuat "),
    		   success: function(data){  
    		       losdatos=JSON.parse(data);  
    		       jQuery.each(losdatos, function(clave, valor) { elmax=valor.N });


    		       var elcampus=""; dircampus="";
    		       $.ajax({
			           type: "GET",
			           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select * from campus where CAMP_CLAVE='<?php echo $_SESSION['CAMPUS'];?>'"),
			           success: function(dataEmpresa){  
			           losdatosEmpr=JSON.parse(dataEmpresa);  
			               jQuery.each(losdatosEmpr, function(clave, valor) {elcampus=valor.CAMP_DESCRIP; dircampus=valor.CAMP_DIRECCION;});			             
			
				       }
    		       });

	
				 
			       $.ajax({
			           type: "GET",
					   url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select veciclmate.*, (SELECT COUNT(*) from `eseriacion` "+
					   " where seri_materia=cicl_materia and seri_mapa=CICL_MAPA) as numseriada from veciclmate "+
					   " where CICL_MAPA='<?php echo $_GET['mapa'];?>' and (ifnull(CVEESP,0)=0 or ifnull(CVEESP,0)="+$("#especialidad").val()+") ORDER BY cicl_cuatrimestre, cicl_materia"),
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
                           
			        	   estiloPadre="style= \"background-color: "+valor.CICL_COLOR+"; position: absolute; left: "+left+"mm; top: "+arriba+"mm; width: "+ancho+"mm; height:"+alto+"mm; border: 0.1mm solid;\"";
			               estiloAsignatura="style=\"font-size:7px; font-weight:bold; text-align: center; word-wrap: break-word;  "+
			                                        "cursor:pointer; position:absolute; left: 0mm; top: 0mm; width:100%; height:"+altoasig+"mm; border: 0.1mm solid;\""+ 
			                                        "id=\""+valor.CICL_MATERIA+"\" elcolor=\""+valor.CICL_COLOR+"\" seleccionado=\"0\" onclick=\"seriacionver('"+valor.CICL_MATERIA+"','"+valor.CICL_MATERIAD+"');\" "+
			                                        " ondblclick=\"seriacionhacer('"+valor.CICL_MATERIA+"','"+valor.CICL_MATERIAD+"','"+valor.CICL_ID+"');\" ";
			 			        		
                            cad="<div "+estiloPadre+">"+ 
		                            "<div "+estiloAsignatura+">"+valor.CICL_MATERIAD+" ("+valor.CICL_CLAVEMAPA+")"+"</div>"+
		                            "<div style=\"font-size:8px; "+et+" font-weight:bold; text-align: center; color:blue; position: absolute; left: 0mm; top: "+altoasig+"mm; width:"+eltam+"mm; height:"+(alto-altoasig)+"mm; border: 0.1mm solid black;\">"+valor.CICL_HT+" </div>"+
		                            "<div style=\"font-size:8px; font-weight:bold; text-align: center; color:green;  position: absolute; left: "+eltam+"mm; top: "+altoasig+"mm; width:"+eltam+"mm; height:"+(alto-altoasig)+"mm; border: 0.1mm solid black;\">"+valor.CICL_HP+"</div>"+
		                            "<div style=\"font-size:8px; font-weight:bold; text-align: center; color:red;  position: absolute; left: "+eltam*2+"mm; top: "+altoasig+"mm; width:"+(tamfin-0.1)+"mm; height:"+(alto-altoasig)+"mm; border: 0.1mm solid black;\">"+valor.CICL_CREDITO+"</div>"+		                      
		                          "</div>";
		                   //console.log(cad);
                           $("#mihoja").append(cad);
                           arriba+=alto+2;

			             });
			
			          }
			    
				
			    }); //Ajax de busqueda de las materias

		      } //success del primer ajax
	   
           });//ajax del semestre que mas asignaturas tiene
	}


	function cambiarPeriodo(per){
		if (!estaseriando) {
			if (!estacambiandoperiodo) {
		       $("#periodo_"+per).removeClass("badge-info");
			   $("#periodo_"+per).addClass("badge-danger");
			   elperiodosel=per;
			   estacambiandoperiodo=true;
			}
			else {
			   $(".classper").removeClass("badge-danger");
			   $(".classper").addClass("badge-info");
			   estacambiandoperiodo=false;
			   elperiodosel=0;
			}
		}
		else  {alert ("No puede cambiar de semestre si esta en modo seriación");	}
	}

    
    function imprimir(nombreDiv) {
    
        var contenido= document.getElementById(nombreDiv).innerHTML;
        var contenidoOriginal= document.body.innerHTML;

        document.body.innerHTML = contenido;
        window.print();

        document.body.innerHTML = contenidoOriginal;
   }



    function quitarseriada(id,descrip){
    	$("#"+id).css("background-color",$("#"+id).attr("elcolor"));
  	    $("#"+id).css("color","black");
  	    $("#"+id).attr("seleccionado","0");
  	    $("#matantes_"+id).remove();
    }
    
    function seriacionver(id,descrip){
        if (estaseriando) {
            if ($("#"+id).attr("seleccionado")=='0') {
                $("#"+id).css("background-color","#ED4E13");
                $("#"+id).css("color","white");
                $("#"+id).attr("seleccionado","1");
                $("#titser_"+matser).append("<strong><span class=\"text-info bigger-60\"><div onclick=\"quitarseriada('"+id+"','"+descrip+"',0);\" style=\"cursor:pointer;\"  class=\"matantes\" id=\"matantes_"+id+"\">"+id+"-"+descrip+"</div></span></strong>");
                }
            else {
            	  $("#"+id).css("background-color",$("#"+id).attr("elcolor"));
            	  $("#"+id).css("color","black");
            	  $("#"+id).attr("seleccionado","0");
            	  $("#matantes_"+id).remove();
            	  
                }
        }
        else {
        	 limpiarSeriacion();
        	 getSeriadas(id); 
            }                     
        }
    

    function seriacionhacer(id,descrip,idReg){
		
		if (!estacambiandoperiodo) {
				if(!estaseriando) {
					estaseriando=true;
					matser=id;
					$("#"+id).css("background-color","#BB0000");
					$("#"+id).css("color","white");

					$("#ace-settings-btn").click();
					
					$("#ace-settings-box").append("<strong><span class=\"text-warning bigger-60\"><div>"+id+"-"+descrip+"<div></span></strong>"+
							"<div id=\"titser_"+id+"\"><div>"+
							"<div style=\"text-align:center\"> "+
							"     <button  onclick=\"cancelarSeriacion();\" class=\"btn btn-warning\"  style=\"width: 100px; height: 40px;\">"+
							"     <i class=\"ace-icon white fa fa-save bigger-120\"></i><span class=\"btn-small\">Cancelar</span></button>"+
							"     <button  onclick=\"guardarSeriaciones();\" class=\"btn btn-success\" value=\"Agregar\" style=\"width: 100px; height: 40px;\">"+
							"     <i class=\"ace-icon white fa fa-save bigger-120\"></i><span class=\"btn-small\">Guardar</span></button>"+
							"<div>");
					getSeriadas();

				}
				else { alert ("Ya se encuentra en modo seriacion"); }
		}
		
		// ===============================================Cambio del periodo =================================
		if (estacambiandoperiodo) {			
			parametros={
					tabla:"eciclmate",
					campollave:"CICL_ID",
					bd:"Mysql",
					valorllave:idReg,
					CICL_CUATRIMESTRE: elperiodosel
				};
				$.ajax({
				type: "POST",
				url:"../base/actualiza.php",
				data: parametros,
				success: function(data){
					$('#dlgproceso').modal("hide"); 
					$('#modalDocument').modal("hide");
					if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
					else {						
						$(".classper").removeClass("badge-danger");
			            $(".classper").addClass("badge-info");
			            estacambiandoperiodo=false;
						elperiodosel=0;
						cargaMapa();
					}
										
				}					     
				});    	   
		}

        
        }


function getSeriadas(materia){
	$.ajax({
        type: "GET",
        url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("select * from eseriacion, cmaterias "+
                "where SERI_MATERIAP=MATE_CLAVE and SERI_MAPA='<?php echo $_GET['mapa'];?>' and SERI_MATERIA='"+materia+"'"),
        success: function(dataSeriacion){  
        losdatosSer=JSON.parse(dataSeriacion);  
            jQuery.each(losdatosSer, function(claveSer, valorSer) {
            	 $("#"+valorSer.SERI_MATERIAP).css("background-color","#ED4E13");
            	 $("#"+valorSer.SERI_MATERIAP).css("color","white");
                 $("#"+valorSer.SERI_MATERIAP).attr("seleccionado","1");

                 if (estaseriando) {
                      $("#titser_"+matser).append("<strong><span class=\"text-info bigger-60\">"+
                               "<div onclick=\"quitarseriada('"+valorSer.SERI_MATERIAP+"','"+valorSer.MATE_DESCRIP+"',0);\" style=\"cursor:pointer;\" class=\"matantes\" id=\"matantes_"+valorSer.SERI_MATERIAP+"\">"+
                                valorSer.SERI_MATERIAP+"-"+valorSer.MATE_DESCRIP+"</div></span></strong>");
                 }

                });			             
	       }
    });
}


function limpiarSeriacion(){
	jQuery.each(losdatos, function(clave, valor) { 
		 $("#"+valor.CICL_MATERIA).css("background-color",$("#"+valor.CICL_MATERIA).attr("elcolor"));
		 $("#"+valor.CICL_MATERIA).css("color","black");
   	     $("#"+valor.CICL_MATERIA).attr("seleccionado","0");
		});
	$("#titser_"+matser).remove();
	$("#ace-settings-box").empty();
	
	estaseriando=false;
	matser="";	
}

function cancelarSeriacion(){
	limpiarSeriacion();
	$("#ace-settings-btn").click();
	
}


function guardarSeriaciones(){
	var losdatosGuardar=[];
    var i=0; 
    var j=0; var cad="";
    var c=0;
    	
    $('.matantes').each(function () {
    		    
    	cad+= "<?php echo $_GET['mapa'];?>"+"|"+ //mapa curricula
    		   $(this).html().split("-")[0]+"|"+    //materia predecesora
               matser+"|S";    //materia                  
               losdatosGuardar[c]=cad;
		       cad="";
		       c++;
     });
    	 
      var loscampos = ["SERI_MAPA","SERI_MATERIAP","SERI_MATERIA","SERI_ACTIVO"];
    	    
    	    parametros={
    	    		tabla:"eseriacion",
    	    		campollave:"concat(SERI_MAPA,SERI_MATERIA)",
    	    		bd:"Mysql",
    	    		valorllave:"<?php echo $_GET['mapa'];?>"+matser,
    	    		eliminar: "S",
    	    		separador:"|",
    	    		campos: JSON.stringify(loscampos),
    	    	    datos: JSON.stringify(losdatosGuardar)
    	    };
    	    $.ajax({
    	        type: "POST",
    	        url:"../base/grabadetalle.php",
    	        data: parametros,
    	        success: function(data){
    	        	
    	        	if (data.length>0) {alert ("Ocurrio un error: "+data); console.log(data);}
    	        	else {alert ("Registros guardados"); 
    	        	      limpiarSeriacion();
	        	       }		                                	                                        					          
    	        }					     
    	    });    	         
}
    
function regresar(){
	window.history.back();
}
 
</script>



</body>
<?php } else {header("Location: index.php");}?>
</html>


