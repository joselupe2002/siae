
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
		<link rel="stylesheet" href="../../css/sigea.css" />


        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    
	    
	    
	    
	<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
         

		<div class="row" style="width:80%">
			<div class="col-sm-6"></div>
		    <div class="col-sm-3" id="contComite"></div>
			<div class="col-sm-3" style="padding-top:19px;">
					<button onclick="actaComite();" class="btn btn-white btn-default btn-round">
						<i class="ace-icon fa fa-book blue"></i>Acta de Comité
					</button>
			</div>
		</div> 
             
         <div class="tabbable fontRoboto">
			 <ul class="nav nav-tabs" id="myTab">
			 	 <li class="active">
					  <a data-toggle="tab" href="#act">Lista de Asistentes<span id="numpar" class="badge badge-danger">0</span></a>
				 </li>
				 <li >
					 <a data-toggle="tab" href="#ins"><i class="green ace-icon fa fa-home bigger-120"></i>Casos Comité</a>
			     </li>                
		     </ul>
		     
		     <div class="tab-content">
			 		  <div id="act" class="tab-pane fade in active">
					  		 <div style="height:360px; overflow-y: scroll;">
					             <table id=tabInt class= "fontRoboto display table-condensed table-striped table-sm table-bordered table-hover nowrap " style="overflow-y: auto;">
				   	                 <thead>  
					                      <tr>
					                          <th style="text-align: center;">ASISTENCIA</th> 
					                          <th style="text-align: center;">INTEGRANTE DEL COMITE</th> 	   	   
					                       </tr> 
					                 </thead> 
					              </table>	
		   					</div>          	
					  </div>

					  <div id="ins" class="tab-pane">
		
							<div id="accordion" class="accordion-style1 panel-group" >
							
							</div> 		<!-- DEL ACORDION-->  

					</div> 		<!-- DE LA PESTAÑA-->  
      		</div><!-- DEL TABA PRINCIPAL  -->  


 
<!-- DIALOGO DE ESPERA -->     
<div id="dlgproceso" class="modal fade" role="dialog">
    <div class="modal-dialog" style="width: 50%;">
     <div class="modal-content" style="vertical-align: middle;">
         <div class="modal-header" style="text-align: center;"> <p style="font-size: 16px; color: green; font-weight: bold;"> Procesando espere por favor..</p></div>
         <div class="modal-body" style="text-align: center;">
              <img src="../../imagenes/menu/esperar.gif" style="background: transparent; width: 100px; height: 80px"/>	
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
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-timepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/moment.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/daterangepicker.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-datetimepicker.min.js"></script>



<!-- -------------------Medios ----------------------->


<script src="<?php echo $nivel; ?>assets/js/jquery.inputlimiter.min.js"></script>
<script src="<?php echo $nivel; ?>js/mask.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootstrap-tag.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.easypiechart.min.js"></script>

<!-- -------------------ultimos ----------------------->
<script src="<?php echo $nivel; ?>assets/js/ace-elements.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/ace.min.js"></script>
<script type="text/javascript" src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/sha/sha512.js"></script>

<script src="<?php echo $nivel; ?>js/utilerias.js"></script>


<script type="text/javascript">
		var todasColumnas;
		var ext=false;
		var elnombre="";
		var miciclo="";
		var numAct=0;
		var usuario="<?php echo $_SESSION["usuario"];?>";
		var institucion="<?php echo $_SESSION["INSTITUCION"];?>";
		var campus="<?php echo $_SESSION["CAMPUS"];?>";

		<?php if ( isset($_GET["matricula"])) { 
			echo "lamat='".$_GET["matricula"]."';";
			echo "elnombre='".$_GET["nombre"]."';";
			echo "miciclo='".$_GET["ciclo"]."';";
			echo "ext=true;"; } ?>


		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 

			

			$("#contComite").append("<span class=\"label label-danger\">Elija el Comité Académico</span>");
			     addSELECT("selComites","contComite","PROPIO", "SELECT ID, DESCRIP FROM co_comites where ABIERTO='S' order by ID DESC", "","");  	
			});


			function change_SELECT (){cargarIntegrantes(); cargarCasos();}

			function cargarIntegrantes() {
				elsql="SELECT INVITADOS from co_comites where ID='"+$("#selComites").val()+"'";		
				parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
				$.ajax({
					type: "POST",
					data:parametros,
					url:  "../base/getdatossqlSeg.php",
					success: function(data){
							inv=JSON.parse(data)[0]["INVITADOS"];
							if (inv.indexOf(",")>=0){ inv=inv.replace(/,/gi,"','");  }
							
							
							elsql="SELECT ID, EMPL,NOMBRE,PUESTO, (select count(*) from co_asistencia where COMITE='"+
								$("#selComites").val()+"' AND EMPL=a.EMPL) as ASISTENCIA, "+
								" (SELECT COUNT(*) FROM co_asistencia where COMITE='"+$("#selComites").val()+"') as ASISTENTES, ORDEN"+
								" from co_integrantes a"+
								" UNION "+
								"select EMPL_NUMERO,EMPL_NUMERO AS EMPL, concat(EMPL_ABREVIA,' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS NOMBRE, EMPL_FIRMAOF AS PUESTO, "+
								"(select count(*) from co_asistencia where COMITE='"+$("#selComites").val()+"' AND EMPL=EMPL_NUMERO) as ASISTENCIA, "+
								"(SELECT COUNT(*) FROM co_asistencia where COMITE='"+$("#selComites").val()+"') as ASISTENTES, '999' AS ORDEN"+
                                " from pempleados where EMPL_NUMERO IN ('"+inv+"') ORDER BY ORDEN";		
						
							parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
							$.ajax({
								type: "POST",
								data:parametros,
								url:  "../base/getdatossqlSeg.php",
								success: function(data){
									c=1;
									$("#cuerpoInt").empty();
									$("#tabInt").append("<tbody id=\"cuerpoInt\">");
									$("#numpar").html(JSON.parse(data)[0]["ASISTENTES"]);  
									jQuery.each(JSON.parse(data), function(clave, valor) { 	
										
										elbtn="<button onclick=\"confirma('"+valor.EMPL+"','"+$("#selComites").val()+"','S'); \" "+			
											"class=\"btn btn-primary\"><i class=\"ace-icon fa fa-thumbs-up bigger-120\"></i> Asistencia</button>";
											
										if (valor.ASISTENCIA>0) { 
											elbtn="<span onclick=\"confirma('"+valor.EMPL+"','"+$("#selComites").val()+"','N'); \" >"+			
											"<i class=\"ace-icon fa green fa-thumbs-up bigger-240\"></i> </span>";
										}
											
										$("#cuerpoInt").append("<tr id=\"row"+c+"\">");
										$("#row"+c).append("<td>"+elbtn+"</td>");
										$("#row"+c).append("<td>"+valor.NOMBRE+"<br>"+valor.PUESTO+"</td>");   
										c++; 	   			
										}); 	     
									},
							});
						}
				});
			}


			
function confirma(empl,comite,op){
	 var losdatos=[];
	 lafecha=dameFecha("FECHA");
	 lahora=dameFecha("HORA");
	 
	 if (op=='S') {
		cad=comite+"|"+empl+"|"+lafecha+"|"+lahora+"|<?php echo $_SESSION["usuario"]?>|"+lafecha+"|<?php echo $_SESSION["INSTITUCION"]?>|<?php echo $_SESSION["CAMPUS"]?>";
		losdatos[c]=cad;    
		var loscampos = ["COMITE","EMPL","FECHA","HORA","USUARIO","FECHAUS","_INSTITUCION","_CAMPUS"];
		parametros={tabla:"co_asistencia",campollave:"concat(COMITE,EMPL)",bd:"Mysql",valorllave:comite+empl,
			     	eliminar: "S",separador:"|", campos: JSON.stringify(loscampos),datos: JSON.stringify(losdatos)};
		$.ajax({
			    type: "POST",
			    url:"../base/grabadetalle.php",
			    data: parametros,
			    success: function(data){
				
					 cargarIntegrantes();                              	                                        					          
			     	}					     
			    });    		     	                                                  
                                       
	 }

	 if (op=='N') {
		parametros={tabla:"co_asistencia", bd:"Mysql",campollave:"concat(COMITE,EMPL)",valorllave:comite+empl};
		$.ajax({type: "POST", url:"../base/eliminar.php", data: parametros, success: function(data){  cargarIntegrantes();  } });
	 }
	
}


function cargarCasos() {
	elsql="SELECT ID, PERSONA, NOMBRE, ifnull(CARRERAD,'GENERALES') AS CARRERAD, SOLICITUD,  "+
	"ACADEMICOS, PERSONALES, TIPO, OBSCOMITE, AUTCOMITE "+
	"from vco_solicitud a where COMITE='"+$("#selComites").val()+"' order by IFNULL(CARRERAD,'GENERALES') DESC, NUMCOMITE";
	
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){
			c=0;		
			jQuery.each(JSON.parse(data), function(clave, valor) { 	
				ev="onchange=\"guardar('"+c+"');\"";
				$("#accordion").append(
					"<div class=\"panel panel-default\">"+
				    "    <div class=\"panel-heading\"> "+
					"         <h4 class=\"panel-title\">"+
					"             <a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#tab"+c+"\">"+
					"		          <i class=\"ace-icon fa fa-angle-down bigger-110\" data-icon-hide=\"ace-icon fa fa-angle-down\" data-icon-show=\"ace-icon fa fa-angle-right\"></i>"+
					"                    &nbsp;"+valor.PERSONA+" <span class=\"text-success\">"+valor.NOMBRE+"</span> <span class=\"text-danger\">"+valor.CARRERAD+"</span>"+
					"              </a>"+
					"         </h4> "+
					"    </div>"+
                    "    <div class=\"panel-collapse collapse\" id=\"tab"+c+"\">"+
					"        <div class=\"panel-body fontRoboto bigger-120\"> "+
					"           <div class=\"row\">"+
					"                 <div class=\"col-sm-3\" id=\"pan1_"+c+"\" ></div>"+
					"                 <div class=\"col-sm-6\" id=\"pan2_"+c+"\">"+
										  valor.SOLICITUD+"<br><br>"+
					"                     <span class=\"badge badge-warning bigger-120\">Motivos Personales</span><br>"+
					                       valor.PERSONALES+"<br><br>"+
					"                     <span class=\"badge badge-danger bigger-120\">Motivos Académicos</span><br>"+
					                       valor.ACADEMICOS+"<br>"+
					"                 </div>"+
					"                 <div class=\"col-sm-3\" id=\"pan3_"+c+"\">"+
					"					 <span class=\"label label-danger\">Dictamén</span>"+
					"					 <select "+ev+" style=\"width:100%;\" id=\"seldic_"+c+"\"><option value='P'>Elija Opción</option><option value='S'>SI SE RECOMIENDA</option><option value='N'>NO SE RECOMIENDA</option></select>"+
					"					 <textarea "+ev+"  style=\"width:100%; height:200px;\" id=\"dic_"+c+"\">"+valor.OBSCOMITE+"</textarea>"+
					" 				  </div>"+
					"	        </div> "+				
					"	 </div> "+
					"</div>"
					);	
					$("#seldic_"+c+" option[value="+valor.AUTCOMITE+"]").attr("selected",true);
				
				if (valor.TIPO=='ALUMNOS') {
					elsql="SELECT ALUM_ESPECIALIDAD, ALUM_MAPA, ifnull(ALUM_FOTO,'../../imagenes/menu/default.png') as ALUM_FOTO,"+
					" getavanceCred(ALUM_MATRICULA) AS AVANCE, "+
					" getPeriodos(ALUM_MATRICULA,getciclo()) as PERIODO from falumnos  where ALUM_MATRICULA='"+valor.PERSONA+"'";							
					parametros2={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
					$.ajax({
						type: "POST",
						data:parametros2,
						url:  "../base/getdatossqlSeg.php",
						success: function(data2){
							datAlum=JSON.parse(data2);
							$("#pan1_"+c).append(
								"<div class=\"row\">  "+
							    "     <div class=\"col-sm-6\">  "+
								"			<span class=\"profile-picture\" style=\"text-align:center;\">"+
								"				<img id=\"foto_"+c+"\"  style=\"width: 80px; height: 90px;\" class=\"img-responsive\" src=\"../../imagenes/menu/esperar.gif\"/>"+																
								"			</span>"+	
								"	  </div>"+
								"	  <div class=\"col-sm-6\">  "+	
								"			<div class=\"infobox-progress\" title=\"Total de Créditos que tiene aprobados\">"+
								"				<div id=\"elavance\" id=\"porcavance\" class=\"easy-pie-chart percentage\" data-color=\"green\" data-percent=\""+datAlum[0]["AVANCE"]+"\" data-size=\"100\">"+
								"					<span id=\"etelavance\"  class=\"percent\">"+datAlum[0]["AVANCE"]+"</span>%"+
								"	  			</div>"+
								"			</div>"+
								"	   </div>"+
								"</div>"+
								"<div class=\"row\">  "+
								"     <span class=\"badge badge-success\">"+datAlum[0]["PERIODO"]+" Semestres </span>"+
								"  			<div class=\"tools action-buttons\">"+
								"						<a title=\"Ver Avance Curricular\" onclick=\"verAvanceAlum('"+valor.PERSONA+"','"+valor.CARRERA+"');\" style=\"cursor:pointer;\">"+
								"                            <i class=\"ace-icon fa fa-bar-chart-o blue bigger-150\"></i>"+
								"                       </a>"+
								"						<a title=\"Ver Kardex\" onclick=\"verKardex('"+valor.PERSONA+"');\" style=\"cursor:pointer;\">"+
								"                            <i class=\"ace-icon fa fa-file-text-o green bigger-150\"></i>"+
								"                       </a>"+
								"						<a title=\"Ver Calificaciones del ciclo actual\" onclick=\"verCalifCiclo('"+valor.PERSONA+"','"+valor.NOMBRE+"');\" style=\"cursor:pointer;\">"+
								"                            <i class=\"ace-icon fa fa-list-alt pink bigger-150\"></i>"+
								"                       </a>"+
								"						<a title=\"Horario de clases\" onclick=\"verHorario('"+valor.PERSONA+"','"+valor.NOMBRE+"');\" style=\"cursor:pointer;\">"+
								"                            <i class=\"ace-icon fa fa-calendar red bigger-150\"></i>"+
								"                       </a>"+
								"						<a title=\"Actividades Complementarias\" onclick=\"verActCom('"+valor.PERSONA+"','"+valor.NOMBRE+"');\" style=\"cursor:pointer;\">"+
								"                            <i class=\"ace-icon fa fa-thumb-tack yellow bigger-150\"></i>"+
								"                       </a>"+
								"			</div>"+
								"</div>"
							);
							
							
								$("#foto_"+c).attr("src",datAlum[0]["ALUM_FOTO"]);
								$('.easy-pie-chart.percentage').each(function(){
								    var barColor = $(this).data('color') || '#2979FF';var trackColor = '#E2E2E2'; var size = parseInt($(this).data('size')) || 72;
									$(this).easyPieChart({barColor: barColor,trackColor: trackColor,scaleColor: false,lineCap: 'butt',lineWidth: parseInt(size/5),animate:false,size: size}).css('color', barColor);
								});							
						}
					});

					
				}	
				if (valor.TIPO=='DOCENTES') {

					elsql="SELECT EMPL_FOTO from pempleados  where EMPL_NUMERO='"+valor.PERSONA+"'";							
					parametros2={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
					$.ajax({
						type: "POST",
						data:parametros2,
						url:  "../base/getdatossqlSeg.php",
						success: function(data2){
							datAlum=JSON.parse(data2);
							$("#pan1_"+c).append(
								"<div class=\"row\">  "+
							    "     <div class=\"col-sm-6\">  "+
								"			<span class=\"profile-picture\" style=\"text-align:center;\">"+
								"				<img id=\"foto_"+c+"\"  style=\"width: 80px; height: 90px;\" class=\"img-responsive\" src=\"../../imagenes/menu/esperar.gif\"/>"+																
								"			</span>"+	
								"	  </div>"+
								"</div>"
							);
							
							$("#foto_"+c).attr("src",datAlum[0]["EMPL_FOTO"]);
											
						}
					});

				}	
				

				}); 
				c++;	     
			},
	});
}

function guardar (elid){
	lafecha=dameFecha("FECHAHORA");
	parametros={
		   tabla:"co_solicitud",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:elid,
		   AUTCOMITE: $("#seldic_"+elid).val(),
		   OBSCOMITE: $("#dic_"+elid).val()
	   };
	   $.ajax({
	   type: "POST",
	   url:"../base/actualiza.php",
	   data: parametros,
	   success: function(data){ 
		   console.log(data);
		   if ($("#seldic_"+elid).val()=='S') {
			   addStatusComite(elid,"TU CASO HA SIDO RECOMENDADO PARA AUTORIZACIÓN "+lafecha,usuario,institucion,campus); 
		   }
		   if ($("#seldic_"+elid).val()=='N') {
			   addStatusComite(elid,"TU CASO NO HA SIDO RECOMENDADO PARA AUTORIZACIÓN "+lafecha,usuario,institucion,campus); 
		   }
		}					     
	   });    
	   

}



function verKardex(matricula){
	enlace="nucleo/avancecurri/kardex.php?matricula="+matricula;
	abrirPesta(enlace,"Kardex");
}

function verAvanceAlum(matricula,carrera){
   enlace="nucleo/avancecurri/grid.php?matricula="+matricula+"&carrera="+carrera;
   abrirPesta(enlace,"06) Avance Curricular");
}


function verCalifCiclo(matricula,nombre){
	enlace="nucleo/tu_caltutorados/grid.php?matricula="+matricula+"&nombre="+nombre;
	abrirPesta(enlace,"Calif. Ciclo");
 }

 function verHorario(matricula,nombre){
	enlace="nucleo/pa_mihorario/grid.php?matricula="+matricula+"&nombre="+nombre+"&ciclo="+$("#selCiclos").val();
	abrirPesta(enlace,"Horario");
 }


 function verActCom(matricula,nombre){
	enlace="nucleo/pa_inscompl/grid.php?matricula="+matricula+"&nombre="+nombre+"&ciclo="+$("#selCiclos").val();
	abrirPesta(enlace,"Complementarias");
 }


 function actaComite(){

	if ($("#selComites").val()>0) {
		enlace="nucleo/co_elcomite/actacomite.php?id="+$("#selComites").val();
		abrirPesta(enlace, "Acta."+$("#selComites").val());
	
	}
	else {
		alert ("Debe seleccionar primero un comite");
		return 0;

		}
}



</script>


</body>
<?php } else {header("Location: index.php");}?>
</html>

