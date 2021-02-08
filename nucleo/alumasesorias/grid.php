
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
		<link rel="stylesheet" href="<?php echo $nivel; ?>/css/sigea.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>estilos/preloader.css" type="text/css" media="screen">         
        <link href="imagenes/login/sigea.png" rel="image_src" />
        <link rel="stylesheet" href="<?php echo $nivel; ?>assets/css/ui.jqgrid.min.css" />

        
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    
		<div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>
		
		<div class="tabbable fontRoboto">
			 <ul class="nav nav-tabs" id="myTab">
			 	 <li class="active">
					  <a data-toggle="tab" href="#act"><i class="blue ace-icon fa fa-calendar bigger-120"></i>Programar Asesoria</a>
				 </li>

				 <li >
					 <a data-toggle="tab" href="#age"><i class="pink ace-icon fa fa-calendar bigger-120"></i>Agendadas<span id="numage" class="badge badge-success">0</span></a>
			     </li>

				 <li >
					 <a data-toggle="tab" href="#ins"><i class="green ace-icon fa fa-pencil bigger-120"></i>Firmar Asesoria</a>
			     </li>

				
                
		     </ul>

			 <div class="tab-content">
			 		  <div id="act" class="tab-pane fade in active">
					             

								<div id="opcionestabInformacion" class="row hide" >
					        		<div class="col-sm-8"> 
											<h3 class="header smaller lighter  fontRobotoB">
								  					<i class="blue ace-icon fa fa-skype bigger-160"></i> Listado de Asesores
								  			</h3>		
								  </div>
						    		<div class="col-sm-2">
										<div class="pull-left tableTools-container" id="botonestabInformacion"></div>
									</div>
									<div class="col-sm-2">
										<input type="text" id="buscartabInformacion" placeholder="Filtrar...">	
									</div>
				      			</div>
				      		 	<div class="row">							   
					       				<div id="informacion" class="col-sm-12" style="overflow-x: auto; height:350px;" >   
										   <table id="tabInformacion" class= "table table-sm table-condensed table-bordered table-hover" style="overflow-y: auto;">
											<thead>  
												<tr>
													<th style="text-align: center;">No.</th> 
													<th style="text-align: center;">No.</th> 
													<th style="text-align: center;">Profesor</th> 	
													<th style="text-align: center;">Lunes</th> 		                          
													<th style="text-align: center;">Martes</th> 
													<th style="text-align: center;">Miercoles</th> 
													<th style="text-align: center;">Jueves</th> 
													<th style="text-align: center;">Viernes</th> 
													<th style="text-align: center;">Sabado</th> 
													<th style="text-align: center;">Domingo</th> 		 
																	
												</tr> 
											</thead> 
										</table>	 
						   				</div>
                      			 </div>
					  </div>
					  <div id="ins" class="tab-pane">          
							<div class="row" style="margin-left: 10px; margin-right: 10px; width: 98%;">
								<h3 class="header smaller lighter fontRobotoB">
								  	<i class="green ace-icon fa fa-retweet bigger-160"></i> Asesorías pendientes de confirmar
								</h3>	
								
								<div style="overflow-y: auto;">
										<table id="tabHorarios" class= "table table-sm table-condensed table-bordered table-hover" style="overflow-y: auto;">
											<thead>  
												<tr>
													<th style="text-align: center;">Id</th> 
													<th style="text-align: center;">Fecha</th> 
													<th style="text-align: center;">Hora</th> 
													<th style="text-align: center;">Profesor</th> 	
													<th style="text-align: center;" class="hidden-480">Asignatura</th> 		                          
													<th style="text-align: center;" class="hidden-480">Tema</th> 
													<th style="text-align: center;">Confirmar</th> 
																	
												</tr> 
											</thead> 
										</table>	
								</div>
							
							</div>
						</div>

						<div id="age" class="tab-pane">          
							<div class="row" style="margin-left: 10px; margin-right: 10px; width: 98%;">
								<h3 class="header smaller lighter fontRobotoB">
								  	<i class="green ace-icon fa fa-retweet bigger-160"></i> Asesorías Agendadas
								</h3>	
								
								<div style="overflow-y: auto;">
										<table id="tabAge" class= "table table-sm table-condensed table-bordered table-hover" style="overflow-y: auto;">
											<thead>  
												<tr>
													<th style="text-align: center;">Id</th> 
													<th style="text-align: center;">Fecha</th> 
													<th style="text-align: center;">Hora</th> 
													<th style="text-align: center;">Profesor</th> 	
													<th style="text-align: center;" class="hidden-480">Asignatura</th> 		                          
													<th style="text-align: center;" class="hidden-480">Tema</th> 
													<th style="text-align: center;" class="hidden-480">Lugar</th> 
													<th style="text-align: center;">Eliminar</th> 																	
												</tr> 
											</thead> 
										</table>	
								</div>
							
							</div>
						</div>
				</div>
		</div>


 
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
<script src="<?php echo $nivel; ?>js/utilerias.js?v=<?php echo date('YmdHis'); ?>"></script>


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




<script type="text/javascript">
		var todasColumnas;
		var usuario="<?php echo $_SESSION["usuario"];	?>";
		var nombreuser="<?php echo $_SESSION["nombre"];	?>";
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 
			cargarAsesores();
			cargarAsesorias();
			cargarAsesoriasAge();

			});




 function generaTabla(grid_data){
       c=1;
       $("#cuerpo").empty();
	   $("#tabHorarios").append("<tbody id=\"cuerpo\">");
       jQuery.each(grid_data, function(clave, valor) { 	
    	    $("#cuerpo").append("<tr id=\"rowFirma"+c+"\">");
    	    $("#rowFirma"+c).append("<td>"+c+"</td>");
			$("#rowFirma"+c).append("<td>"+valor.ASES_FECHA+"</td>");
			$("#rowFirma"+c).append("<td>"+valor.ASES_HORA+"</td>");
		    $("#rowFirma"+c).append("<td style=\"width:30px;\">"+valor.ASES_PROFESORD+"</td>");
		    $("#rowFirma"+c).append("<td>"+valor.ASES_ASIGNATURAD+"</td>");
		    $("#rowFirma"+c).append("<td>"+valor.ASES_TEMA+"</td>");
			$("#rowFirma"+c).append("<td><button onclick=\"confirma('"+valor.ASES_ID+"','"+c+"');\" class=\"btn btn-xs btn-primary\"><i class=\"ace-icon fa fa-thumbs-up bigger-120\"></i></button></td>");
			c++;
        });
}		


function confirma(id, renglon){
	 parametros={
			 tabla:"asesorias",
			 campollave:"ASES_ID",
			 valorllave:id,
			 bd:"Mysql",			
			 ASES_STATUS:"S"
			};

	 $.ajax({
         type: "POST",
         url:"../base/actualiza.php",
         data: parametros,
         success: function(data){		                                	                      
             if (!(data.substring(0,1)=="0"))	
	                 { 						                  
            	       $("#rowFirma"+renglon).remove();
	                  }	
             else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
         }					     
     });      
     
}

function cargarAsesorias(){
	    elsql="SELECT * from vasesorias  where ASES_MATRICULA="+ "'<?php echo $_SESSION['usuario']?>' AND ASES_STATUS='N' order by ASES_ID";
	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){
		                    	   	        	
	        	     generaTabla(JSON.parse(data));
	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });
}


	
/*=========================================================================*/
	function generaTablaAsesores(grid_data){
       c=1;
       $("#cuerpoInformacion").empty();
	   $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
       jQuery.each(grid_data, function(clave, valor) { 	
		btnMat="";
			btnMat="<span title=\"Ver Asignaturas que puede asesorar el maestro "+valor.PROFESORD+"\" onclick=\"verMaterias('"+valor.EMPL_EXPASIG+"','"+valor.DESC_PROFESORD+"','"+valor.EMPL_LUGARAS+"');\" style=\"cursor:pointer;\"><i class=\"ace-icon green fa fa-book bigger-140\"></i></span>";

			btnl=""; if (valor.LUNES!='') {btnl="<span title=\"Programar asesorías para el dia "+valor.LUNES+"\" onclick=\"programar('"+valor.DESC_PROFESOR+"','"+valor.DESC_PROFESORD+"','1','LUNES','"+valor.LUNES+"','"+valor.DESC_CICLO+"','"+valor.EMPL_LUGARAS+"');\" style=\"cursor:pointer;\"><i class=\"ace-icon blue fa fa-calendar bigger-140\"></i></span>";}
			btnm=""; if (valor.MARTES!='') {btnm="<span title=\"Programar asesorías para el dia "+valor.MARTES+"\" onclick=\"programar('"+valor.DESC_PROFESOR+"','"+valor.DESC_PROFESORD+"','2','MARTES','"+valor.MARTES+"','"+valor.DESC_CICLO+"','"+valor.EMPL_LUGARAS+"');\" style=\"cursor:pointer;\"><i class=\"ace-icon blue fa fa-calendar bigger-140\"></i></span>";}
			btnmi=""; if (valor.MIERCOLES!='') {btnmi="<span title=\"Programar asesorías para el dia "+valor.MIERCOLES+"\" onclick=\"programar('"+valor.DESC_PROFESOR+"','"+valor.DESC_PROFESORD+"','3','MIERCOLES','"+valor.MIERCOLES+"','"+valor.DESC_CICLO+"','"+valor.EMPL_LUGARAS+"');\" style=\"cursor:pointer;\"><i class=\"ace-icon blue fa fa-calendar bigger-140\"></i></span>";}
			btnj=""; if (valor.JUEVES!='') {btnj="<span title=\"Programar asesorías para el dia "+valor.JUEVES+"\" onclick=\"programar('"+valor.DESC_PROFESOR+"','"+valor.DESC_PROFESORD+"','4','JUEVES','"+valor.JUEVES+"','"+valor.DESC_CICLO+"','"+valor.EMPL_LUGARAS+"');\" style=\"cursor:pointer;\"><i class=\"ace-icon blue fa fa-calendar bigger-140\"></i></span>";}
			btnv=""; if (valor.VIERNES!='') {btnv="<span title=\"Programar asesorías para el dia "+valor.VIERNES+"\" onclick=\"programar('"+valor.DESC_PROFESOR+"','"+valor.DESC_PROFESORD+"','5','VIERNES','"+valor.VIERNES+"','"+valor.DESC_CICLO+"','"+valor.EMPL_LUGARAS+"');\" style=\"cursor:pointer;\"><i class=\"ace-icon blue fa fa-calendar bigger-140\"></i></span>";}
			btns=""; if (valor.SABADO!='') {btns="<span title=\"Programar asesorías para el dia "+valor.SABADO+"\" onclick=\"programar('"+valor.DESC_PROFESOR+"','"+valor.DESC_PROFESORD+"','6','SABADO','"+valor.SABADO+"','"+valor.DESC_CICLO+"','"+valor.EMPL_LUGARAS+"');\" style=\"cursor:pointer;\"><i class=\"ace-icon blue fa fa-calendar bigger-140\"></i></span>";}
			btnd=""; if (valor.DOMINGO!='') {btnd="<span title=\"Programar asesorías para el dia "+valor.DOMINGO+"\" onclick=\"programar('"+valor.DESC_PROFESOR+"','"+valor.DESC_PROFESORD+"','7','DOMINGO','"+valor.DOMINGO+"','"+valor.DESC_CICLO+"','"+valor.EMPL_LUGARAS+"');\" style=\"cursor:pointer;\"><i class=\"ace-icon blue fa fa-calendar bigger-140\"></i></span>";}
			

    	    $("#cuerpoInformacion").append("<tr id=\"row"+c+"\">");
    	    $("#row"+c).append("<td>"+c+"</td>");
    	    $("#row"+c).append("<td>"+valor.DESC_PROFESOR+"</td>");
			$("#row"+c).append("<td style=\"width:30px;\">"+btnMat+"&nbsp&nbsp"+valor.DESC_PROFESORD+"<br>"+
			                        "<a href=\""+valor.EMPL_LUGARAS+"\" target=\"_blank\">"+valor.EMPL_LUGARAS+"</a></td>");
		    $("#row"+c).append("<td>"+valor.LUNES+"&nbsp&nbsp"+btnl+"</td>");
		    $("#row"+c).append("<td>"+valor.MARTES+"&nbsp&nbsp"+btnm+"</td>");
			$("#row"+c).append("<td>"+valor.MIERCOLES+"&nbsp&nbsp"+btnmi+"</td>");
			$("#row"+c).append("<td>"+valor.JUEVES+"&nbsp&nbsp"+btnj+"</td>");
			$("#row"+c).append("<td>"+valor.VIERNES+"&nbsp&nbsp"+btnv+"</td>");
			$("#row"+c).append("<td>"+valor.SABADO+"&nbsp&nbsp"+btns+"</td>");
			$("#row"+c).append("<td>"+valor.DOMINGO+"&nbsp&nbsp"+btnd+"</td>");

			c++;
        });
	}		


	function verMaterias(mat,prof,lugar){
		cadMat=mat.replace(/,/gi,"','");
		elsql="select * from cmaterias where MATE_CLAVE IN ('"+cadMat+"')";


		dameVentana("ventaulas", "grid_alumasesorias",prof,"lg","bg-successs","fa fa-book blue bigger-180","370");
 		
 
		 titulos=[{titulo:"CLAVE",estilo:""},{titulo:"MATERIA",estilo:""}];
	  
		 var campos = [{campo: "MATE_CLAVE",estilo:"",antes:"<span class=\"badge badge-success\">",despues:"</span>"}, 
		 {campo: "MATE_DESCRIP",estilo: "",antes:"",despues:""}];
	  
		 $("#body_ventaulas").append("<table id=tabaulas class=\"fontRobotoB display table-condensed table-striped table-sm table-bordered "+
									 "table-hover nowrap\" style=\"overflow-y: auto;\"></table>");
		 generaTablaDin("tabaulas",elsql,titulos,campos);
			
		 $("#body_ventaulas").append("<div class=\"row\"><div class=\"col-sm-4\"><br>Enlace:<br><span class=\"fontRobotoB text-success\">"+lugar+"</span></div></div>");
	}
	

	function diasEntreFechas (desde, hasta, eldia, componente) {
  		var dia_actual = desde;
  		while (dia_actual.isSameOrBefore(hasta)) {
				d = new Date(dia_actual);
				var day = d.getDay();
				if (eldia==day) {$("#"+componente).append("<option value=\""+dia_actual.format('DD/MM/YYYY')+"\">"+dia_actual.format('DD/MM/YYYY')+"</option");}
   				dia_actual.add(1, 'days');
  		}	
	}


	function programar (prof, profd, dia, diad, horario,ciclo,lugar) {

		elsql="select CICL_INICIOR, CICL_FINR from ciclosesc where CICL_CLAVE='"+ciclo+"'";
	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){	
							 
					inicia=JSON.parse(data)[0]["CICL_INICIOR"];
					termina=JSON.parse(data)[0]["CICL_FINR"];
								
					dameVentana("vagendar", "grid_alumasesorias","<span class=\"fontRobotoB\">"+
					"Agendar con "+profd+"</span>&nbsp;<span class=\"badge badge-warning\">"+diad+"</span>&nbsp;<span class=\"badge badge-success\">"+horario+"</span>","lg","bg-successs","fa fa-book blue bigger-180","250");
					$("#body_vagendar").append(
						"<div class=\"row fontRoboto\"> "+
						"    <div class=\"col-sm-6\">"+
						"		<label>Fecha de la Asesoría</label><select class=\"form-control\" id=\"fecha\"></select>"+
						"    </div>"+
						"    <div class=\"col-sm-6\">"+
						"		<label>Asignatura</label><select class=\"form-control\" id=\"asignatura\"></select>"+
						"    </div>"+						
						"</div>"+
						"<div class=\"row fontRoboto\"> "+
						"    <div class=\"col-sm-6\">"+
						"		<label>¿Que te motivo a buscar asesoria?</label><select class=\"form-control\" id=\"motivo\"></select>"+
						"    </div>"+	
						"    <div class=\"col-sm-6\">"+
						"		<label>Tema a tratar</label><input class=\"form-control\" id=\"tema\"></input>"+
						"    </div>"+				
						"</div><br>"+
						"<div class=\"row fontRoboto\"> "+
						"    <div class=\"col-sm-4\"></div>"+
						"    <div class=\"col-sm-4\" style=\"text-align:center;\">"+
						"         <button onclick=\"guardarAsesorias('"+prof+"','"+profd+"','"+dia+"','"+horario+"','"+ciclo+"','"+lugar+"')\" class=\"btn btn-white btn-info btn-bold\">"+
						"                 <i class=\"ace-icon fa fa-floppy-o bigger-120 blue\"></i>Agendar Asesoria"+										
						"         </button>"+
						"    </div>"+					
						"</div>"
					);
	
					var desde = moment(fechaJava(inicia));
					var hasta = moment(fechaJava(termina));
					diasEntreFechas(desde, hasta, dia,"fecha");

					sqas="SELECT CICL_MATERIA, CICL_MATERIAD FROM veciclmate, falumnos "+
					"where ALUM_MATRICULA='"+usuario+"' AND CICL_MAPA=ALUM_MAPA AND IFNULL(TIPOMAT,'0') NOT IN "+
					"('T','AC','OC','I','RP') order by CICL_MATERIAD";
		
					actualizaSelect("asignatura",sqas, "",""); 
					
					sqas2="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='MOTIVASESORIA' ORDER BY CATA_DESCRIP";
					actualizaSelect("motivo",sqas2, "","");  
	        	}
			});			
	}


	function cargarAsesores(){
	    elsql="select * from vedescarga i, pempleados where DESC_PROFESOR=EMPL_NUMERO AND i.DESC_CICLO=getciclo() AND i.DESC_ACTIVIDAD IN ('124','DC04','13') ORDER BY DESC_PROFESORD";
	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){		                    	   	        	
					 generaTablaAsesores(JSON.parse(data));
					 convertirDataTable('tabInformacion');
	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });
	}


		function guardarAsesorias (prof, profd, dia, horario,ciclo,lugar){

			if (($("#asignatura").val()!='0') && ($("#tema").val()!='') && ($("#motivo").val()!='') ) {
			lafecha=dameFecha("FECHAHORA");

			parametros={
					tabla:"propasesorias",
					bd:"Mysql",			
					ASES_PROFESOR:prof,
					ASES_MATRICULA:usuario,			 
					ASES_FECHA:$("#fecha").val(),
					ASES_HORA:horario.substr(0,5),
					ASES_TIPO:"AA",
					ASES_ASIGNATURA:$("#asignatura").val(),
					ASES_MOTIVO:$("#motivo").val(),
					ASES_TEMA:$("#tema").val(),
					ASES_CICLO:ciclo,
					ASES_FECHAUS:lafecha,
					ASES_STATUS: "N",
					ASES_USUARIO:usuario ,
					_INSTITUCION:"<?php echo $_SESSION["INSTITUCION"]; ?>",
					_CAMPUS: "<?php  echo $_SESSION["CAMPUS"]; ?>"
				
					};

			$.ajax({
				type: "POST",
				url:"../base/inserta.php",
				data: parametros,
				success: function(data){		
					console.log(data);                                	                      

					$("#vagendar").modal("hide");
					correoalProf(prof, "<html>El alumno <span style=\"color:green\"><b>"+usuario+" "+nombreuser+
								"</b></span> ha agendado una asesoria , para el d&iacute;a  "+$("#fecha").val()+" a las "+horario.substr(0,5)+" horas <br/>"+
								"Lugar: "+"<a href=\""+lugar+"\">"+lugar+"</a>","ITSM: SOLICITUD DE ASESORIAS "+usuario+" "+nombreuser);			

					correoalAlum(usuario, "<html>"+usuario+" "+nombreuser+" Te confirmamos que tu asesoria quedo agendada <span style=\"color:green\"><b>"+
								"</b></span> <br> Fecha: "+$("#fecha").val()+" a las "+horario.substr(0,5)+" <br>hora: <br>"+
								"<br> Lugar: "+"<a href=\""+lugar+"\">"+lugar+"</a>","ITSM: CONFIRMACION DE ASESORIAS "+usuario+" "+nombreuser);			

					setNotificacion(prof,"Sol. ASESORIA."+usuario+" "+nombreuser+" Fecha:"+$("#fecha").val()+" Hora:"+horario.substr(0,5),"","","<?php echo $_SESSION["INSTITUCION"]; ?>","<?php  echo $_SESSION["CAMPUS"]; ?>");         

					cargarAsesoriasAge();
				}					     
			}); 
			}
			else {
				alert ("Debe elegir asignatura y tema");
			}     
		}



		/*======================================================================================*/

	function generaTablaAge(grid_data){
       c=1;
       $("#cuerpoAge").empty();
	   $("#tabAge").append("<tbody id=\"cuerpoAge\">");
       jQuery.each(grid_data, function(clave, valor) { 	
    	    $("#cuerpoAge").append("<tr id=\"rowAge"+c+"\">");
    	    $("#rowAge"+c).append("<td>"+c+"</td>");
			$("#rowAge"+c).append("<td>"+valor.ASES_FECHA+"</td>");
			$("#rowAge"+c).append("<td>"+valor.ASES_HORA+"</td>");
		    $("#rowAge"+c).append("<td>"+valor.PROFESORD+"</td>");
		    $("#rowAge"+c).append("<td>"+valor.MATERIAD+"</td>");
			$("#rowAge"+c).append("<td>"+valor.ASES_TEMA+"</td>");
			$("#rowAge"+c).append("<td><a href=\""+valor.EMPL_LUGARAS+"\" target=\"_blank\">"+valor.EMPL_LUGARAS+"</a></td>");
			$("#rowAge"+c).append("<td><button onclick=\"cancelar('"+valor.ASES_ID+"',"+c+",'"+valor.ASES_PROFESOR+"','"+valor.ASES_FECHA+"','"+valor.ASES_HORA+"');\" class=\"btn btn-xs btn-danger\"><i class=\"ace-icon fa fa-trash-o bigger-120\"></i></button></td>");
			c++;
		});
		
		$("#numage").html(c-=1);
	}		


	function cancelar(id,renglon,prof, fecha, horario){
		if (confirm("Seguro que desea cancelar la asesoria No. "+id)) {
			parametros={
					tabla:"propasesorias",
					campollave:"ASES_ID",
					valorllave:id,
					bd:"Mysql"
					};

			$.ajax({
				type: "POST",
				url:"../base/eliminar.php",
				data: parametros,
				success: function(data){		                                	                      
					if (!(data.substring(0,1)=="0"))	
							{ 						                  
							cargarAsesoriasAge();

							correoalProf(prof, "<html>El alumno <span style=\"color:green\"><b>"+usuario+" "+nombreuser+
								"</b></span> ha <span style=\"color:red;\">CANCELADO </span> la asesoria , para el d&iacute;a  "+fecha+" a las "+horario+" horas <br/>"
							,"ITSM: CANCELACION DE ASESORIAS "+usuario+" "+nombreuser);			

							correoalAlum(usuario, "<html>"+usuario+" "+nombreuser+" Te confirmamos que tu asesoria quedo<span style=\"color:red;\">CANCELADA</span> <span style=\"color:green\"><b>"+
								"</b></span> <br> Fecha: "+fecha+" a las "+horario+" <br>hora: <br>"
								,"ITSM: CANCELACION DE ASESORIAS "+usuario+" "+nombreuser);			

							}	
					else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
				}					     
			});      
		}
}

function cargarAsesoriasAge(){
		elsql="select ASES_ID, ASES_PROFESOR, ASES_TEMA,ASES_FECHA, ASES_HORA, CONCAT(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS PROFESORD,"+
              "EMPL_LUGARAS, MATE_DESCRIP AS MATERIAD from propasesorias, pempleados, cmaterias where ASES_PROFESOR=EMPL_NUMERO "+
			  "and ASES_ASIGNATURA=MATE_CLAVE  and ASES_MATRICULA='"+usuario+"' and ASES_STATUS='N'";

       parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){											 
				    
	        	     generaTablaAge(JSON.parse(data));
	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });
}


		

		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
