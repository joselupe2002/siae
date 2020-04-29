<?php 
	header('Content-Type: text/html; charset=ISO-8859-1');
	include("../includes/Conexion.php");
	include("../includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../imagenes/login/sigea.png";
	$nivel="../";
	session_start();		
	$_SESSION['usuario'] = "ASPIRANTES";
	$_SESSION['nombre'] = "registro de aspirantes";
	$_SESSION['super'] = "N";
	$_SESSION['inicio'] = 1;
	$_SESSION['INSTITUCION'] = "ITSM";
	$_SESSION['CAMPUS'] = "0";
	$_SESSION['encode'] = "ISO-8859-1";
	$_SESSION['carrera'] = "1";
	$_SESSION['depto'] = "0";
	$_SESSION['titApli'] = "Sistema Gesti&oacute;n Escolar - Administrativa";
	$_SESSION['bd'] = "Mysql";

	?>
<!DOCTYPE html>
<html lang="es">
	<head>
	    <link rel="icon" type="image/gif" href="../imagenes/login/sigea.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="ISO-8859-1"/>
		<title>SIGEA Sistema de Gestión Escolar - Administrativa </title>
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
		<link rel="stylesheet" href="<?php echo $nivel; ?>css/sigea.css" />	

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }</style>
	</head>


	<body id="grid_registro" style="background-color: white;">
       
    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>	      
    </div>


	<div style="height:10px; background-color: #C18900;"> </div>
	<div class="container-fluid informacion" style="background-color: #9B0B0B;">   
         <div class="row">
             <div class="col-md-4" >
                   <img src="../imagenes/empresa/logo2.png" alt="" width="50%" class="img-fluid" alt="Responsive image" />  
			  </div>
			  <div class="col-md-4" >
				   <div class="text-success" style="padding:0px;  font-size:35px; font-family:'Girassol'; color:white; text-align:center; font-weight: bold;">
						  PROCESO DE ADMISIÓN
				    </div>
				   <div class="text-primary"  style="padding:0px; font-size:35px; font-family:'Girassol'; color:white; text-align:center; font-weight: bold;">2020</div>
			  </div>
			  <div class="col-md-4" style="padding-top: 20px; text-align: right;">			      
			  </div>
        </div>
    </div>
	<div style="height:10px; background-color: #C18900;"> 
	 </div>


	 <div class="widget-box">
		<div class="widget-body">
			<div class="widget-main">
				<div id="fuelux-wizard-container"><div>
				<ul class="steps">
					<li data-step="1" class="active"><span class="step">1</span><span class="title">Registro</span></li>
					<li data-step="2"><span class="step">2</span><span class="title">Personales</span></li>
					<li data-step="3"><span class="step">3</span><span class="title">Procedencia</span></li>
					<li data-step="4"><span class="step">4</span><span class="title">Contacto</span></li>
					<li data-step="5"><span class="step">5</span><span class="title">Padres</span></li>
					<li data-step="6"><span class="step">6</span><span class="title">Tutor</span></li>
					<li data-step="7"><span class="step">7</span><span class="title">Documentos</span></li>					
				</ul>
			</div>
			<hr />
			<div class="step-content pos-rel">
<!--================ =======================================================================================-->					
				<div class="step-pane active" data-step="1">
				<form style="width: 100%" method="post" id="frmReg" name="frmReg">
					<fieldset>
						<div class="row"> 
							<div class="col-sm-1"> </div>
							<!--================ CURP DEL ASPIRANTE ======================-->
							<div class="col-sm-4"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">1</span> Clave &Uacute;nica de Registro de Población</strong> 
								</label>
								<span class="block input-icon input-icon-right">
									<input  class="UNO form-control width-100" name="CURP" id="CURP" />
									<i class="ace-icon fa fa-pencil-square"></i>
								</span>
								<span title="Consulte su CURP en la página oficial" class="label label-success" style="cursor:pointer;" onclick="window.open('https://www.gob.mx/curp/', '_blank');" 
								         class="btn btn-white  btn-info btn-round">Buscar CURP
						            <i class="ace-icon fa fa-search icon-on-right"></i>
								</span>
							</div>
							<!--================ CARRERA  DEL ASPIRANTE ======================-->
							<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">2</span> Carrera que desea</strong> 
								</label>								
							    <Select  class="UNO form-control width-100" name="CARRERA" id="CARRERA"></SELECT>
							</div>
							<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">2A</span> 2da Opción</strong> 
								</label>								
							    <Select  class="UNO form-control width-100" name="CARRERA2" id="CARRERA2"></SELECT>
							</div>
							<div class="col-sm-1"> </div>
						</div>
						<div class="row"> 
							<div class="col-sm-1"> </div>
							<!--================NOMBRE DEL ASPIRANTE ======================-->
							<div class="col-sm-4"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">3</span> Nombre (s)</strong> 
								</label>
								<span class="block input-icon input-icon-right">
									<input  class="UNO form-control width-100" name="NOMBRE"  id="NOMBRE" />
									<i class="ace-icon fa fa-pencil-square"></i>
								</span>
							</div>
							<!--================ PATERNO DEL ASPIRANTE ======================-->
							<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">4</span> Apellido Paterno</strong> 
								</label>
								<span class="block input-icon input-icon-right">
									<input  class="UNO form-control width-100" name="APEPAT"   id="APEPAT" />
									<i class="ace-icon fa fa-pencil-square"></i>
								</span>
							</div>
							<!--================ MATERNO DEL ASPIRANTE ======================-->
							<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-danger">5</span> Apellido Materno</strong> 
								</label>
								<span class="block input-icon input-icon-right">
									<input  class="UNO form-control width-100" name="APEMAT"  id="APEMAT" />
									<i class="ace-icon fa fa-pencil-square"></i>
								</span>
							</div>
							<div class="col-sm-1"> </div>
						</div>
					</fieldset>
				</form>
				</div><!-- Fin del panel 1-->
<!--================ =======================================================================================-->					
				<div class="step-pane" data-step="2">
				    <form style="width: 100%" method="post" id="frmReg2" name="frmReg2">
					<fieldset>
					<!--================================LINEA 1 PANEL 2 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">6</span> Nacionalidad</strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="NACIONALIDAD" id="NACIONALIDAD">
									<OPTION value="M">MEXICANA</OPTION>
									<OPTION value="E">EXTRANJERA</OPTION>
								</SELECT>
								<label class=" hide text-primary" id="NACIONALIDAD_ET">
									<strong><span class="badge badge-success">6</span> Especifique</strong> 
								</label>
								<input  class="hide DOS form-control width-100" name="NACIONALIDAD_ADD"   id="NACIONALIDAD_ADD" />
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">7</span> Fecha Nacimiento <span class="text-danger">dd/mm/aaaa</span></strong> 
								</label>								
							    <div class="input-group">
    				                 <input class="TRES form-control editandotabla date-picker" name="FECHANAC" id="FECHANAC" type="text" autocomplete="off" data-date-format="dd/mm/yyyy" /> 
	                                 <span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i></span>	                                 
	                            </div>
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">8</span> Género </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="GENERO" id="GENERO">
									<OPTION value="1">HOMBRE</OPTION>
									<OPTION value="2">MUJER</OPTION>
								</SELECT>
								
						</div>					

						<div class="col-sm-1"> </div>
					</div>
					<!--================================LINEA 2 PANEL 2 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>						
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">9</span> Estado Civil </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="EDOCIVIL" id="EDOCIVIL">									
								</SELECT>
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">10</span> Capacidad Diferente </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="CAPACIDADDIF" id="CAPACIDADDIF">
								    <OPTION value="N">NO</OPTION>
									<OPTION value="S">SI</OPTION>									
								</SELECT>
								<label class=" hide text-primary" id="CAPACIDADDIF_ET">
									<strong><span class="badge badge-success">10</span> Especifique</strong> 
								</label>
								<input  class="hide DOS form-control width-100" name="CAPACIDADDIF_ADD"   id="CAPACIDADDIF_ADD" />
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">10</span> Cuentas con alguna Beca </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="BECA" id="BECA">
								    <OPTION value="N">NO</OPTION>
									<OPTION value="S">SI</OPTION>									
								</SELECT>
								<label class=" hide text-primary" id="BECA_ET">
									<strong><span class="badge badge-success">10</span>¿Quien la otorgo?</strong> 
								</label>
								<input  class="hide DOS form-control width-100" name="BECA_ADD"   id="BECA_ADD" />
						</div>
					 </div>
					 <!--================================LINEA 3 PANEL 2 ================================-->
					 <div class="row">
					    <div class="col-sm-1"> </div>						
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">11</span> Estado de Nacimiento</strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="EDONAC" id="EDONAC">									
								</SELECT>
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">10</span> Municipio de Nacimiento </strong> 
								</label>								
							    <Select  class="DOS form-control width-100" name="MUNINAC" id="MUNINAC">								  								
								</SELECT>							
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">11</span> RFC </strong> 
								</label>
								<input  class="DOS form-control width-100" name="RFC"   id="RFC" />								
							    
					     </div>
					 </div>	
					</fieldset>
				    </form>				 
				</div><!-- Fin del panel 2-->
<!--================ =======================================================================================-->					
				
				<div class="step-pane" data-step="3">
				    <form style="width: 100%" method="post" id="frmReg3" name="frmReg3">
					<fieldset>
					<!--================================LINEA 1 PANEL 3 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-5"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">12</span> Estado Bachiller</strong> 
								</label>								
							    <Select  class="TRES form-control width-100" name="ESTESCPROC" id="ESTESCPROC">									
								</select>								
						</div>
						<div class="col-sm-5"> 
						       <label class="text-primary">
									<strong><span class="badge badge-info">13</span> Escuela de Bachillerato</strong> 
								</label>								
							    <Select  class="TRES chosen-select form-control width-100" name="ESCPROC" id="ESCPROC">									
								</select>	
								<label class=" hide text-primary" id="ESCPROC_ET">
									<strong><span class="badge badge-success">13</span> Especifique</strong> 									
								</label>
								<input  class="hide TRES form-control width-100" name="ESCPROC_ADD"   id="ESCPROC_ADD" />
						</div>							
						<div class="col-sm-1"> </div>
					</div>
					
					<!--================================LINEA 2 PANEL 3 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-5"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">14</span> Promedio Bachiller <span class="text-danger">(Escala 60-100 ej. 8.3=83)</span></strong> 
								</label>	
								<input  class="TRES form-control width-100" name="PROMBAC"   id="PROMBAC" />							
							   							
						</div>
						<div class="col-sm-3"> 
						        <label class="text-primary">
									<strong><span class="badge badge-info">14A</span> Area de Conocimiento</strong> 
								</label>
								<Select  class="TRES  form-control width-100" name="AREACONOC" id="AREACONOC">									
								</select>		
						

						</div>
						<div class="col-sm-2"> 
						        <label class="text-primary">
									<strong><span class="badge badge-info">14B</span> Año de Egreso</strong> 
								</label>	
								<input  class="TRES form-control width-100" name="EGRESOBAC"   id="EGRESOBAC" />

						</div>
						<div class="col-sm-1"> </div>

					</div>

					<!--================================LINEA 3 PANEL 3 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-5"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">15</span> Grupo índigena</strong> 
							</label>															   
							<Select  class="TRES form-control width-100" name="GRUPOIND" id="GRUPOIND">									
							</select>															   							
						</div>
						<div class="col-sm-5"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">16</span> Lengua índigena</strong> 
							</label>															   
							<Select  class="TRES form-control width-100" name="LENIND" id="LENIND">									
							</select>															   							
						</div>	
						<div class="col-sm-1"> </div>								
					</div>	
					</fieldset>
				    </form>

				</div><!-- Fin del panel 3-->

<!--================ =======================================================================================-->									
				<div class="step-pane" data-step="4">
				    <form style="width: 100%" method="post" id="frmReg4" name="frmReg4">
					<fieldset>

					
					<!--================================LINEA 1 PANEL 4================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">17</span> Estado de Residencia</strong> 
								</label>								
							    <Select  class="CUATRO form-control width-100" name="ESTRES" id="ESTRES">									
								</select>								
						</div>
						<div class="col-sm-3"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">18</span> Municipio de Residencia</strong> 
								</label>								
							    <Select  class="CUATRO form-control width-100" name="MUNRES" id="MUNRES">									
								</select>								
						</div>
						<div class="col-sm-3"> 
						       <label class="text-primary">
									<strong><span class="badge badge-info">19</span> Ciudad o Localidad</strong> 
								</label>															   
								<input  class="CUATRO form-control width-100" name="CIUDADRES"   id="CIUDADRES" />
						</div>							
						<div class="col-sm-1"> </div>
					</div>
					
					<!--================================LINEA 2 PANEL 4 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-3"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">20</span> Calle</strong> 
							</label>															   
							<input  class="CUATRO form-control width-100" name="CALLE"   id="CALLE" />														   							
						</div>
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">21</span> No. Ext/Int</strong> 
							</label>															   
							<input  class="CUATRO form-control width-100" name="NUMEROCALLE"   id="NUMEROCALLE" />														   							
						</div>
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">22</span> COLONIA </strong> 
							</label>															   
							<input  class="CUATRO form-control width-100" name="COLONIA"   id="COLONIA" />														   							
						</div>
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">23</span> C.P.</strong> 
							</label>															   
							<input  class="CUATRO form-control width-100" name="CP"   id="CP" />														   							
						</div>						
					</div>	

					<!--================================LINEA 3 PANEL 4 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-3"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">24</span> Teléfono Celular</strong> 
							</label>															   
							<input  class="CUATRO form-control width-100" name="TELCEL"   id="TELCEL" />														   							
						</div>
						<div class="col-sm-3"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">25</span> Teléfono de Casa</strong> 
							</label>															   
							<input  class="CUATRO form-control width-100" name="TELCASA"   id="TELCASA" />														   							
						</div>
						<div class="col-sm-3"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">26</span> Correo Electrónico <span class="label label-danger">Importante</span></strong> 
							</label>															   
							<input  class="CUATRO form-control width-100" name="CORREO"   id="CORREO" />														   							
						</div>
						<div class="col-sm-1"> </div>						
					</div>	
					</fieldset>
				    </form>
				</div><!-- Fin del panel 4-->

<!--================ =======================================================================================-->					
				<div class="step-pane" data-step="5">
				    <form style="width: 100%" method="post" id="frmReg5" name="frmReg5">
					<fieldset>

					<!--================================LINEA 1 PANEL 5 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-4"> 
								<label class="text-primary">
									<strong><span class="badge badge-info">27</span> Servicio Médico</strong> 
								</label>								
							    <Select  class="CINCO form-control width-100" name="SM" id="SM">									
								</select>								
						</div>
						
						<div class="col-sm-3"> 
						       <label class="text-primary">
									<strong><span class="badge badge-info">29</span> No. Afiliación IMSS (Bachiller)</strong> 
								</label>															   
								<input  class="CINCO form-control width-100" name="SMNUMERO"   id="SMNUMERO" />
								<span title="Consulte su CURP en la página oficial" class="label label-success" style="cursor:pointer;" 
								         onclick="window.open('https://serviciosdigitales.imss.gob.mx/gestionAsegurados-web-externo/asignacionNSS;JSESSIONIDASEGEXTERNO=SpgaCff8MRCqwDIw13E4NlcwPXSkV1jKBE6u0cilknwtWuzE4o0r!-1509158015', '_blank');" 
								         class="btn btn-white  btn-info btn-round">Buscar IMSS
						            <i class="ace-icon fa fa-search icon-on-right"></i>
								</span>
						</div>
						<div class="col-sm-3"> 
						       <label class="text-primary">
									<strong><span class="badge badge-info">30</span> Tipo de Sangre</strong> 
								</label>															   
								<input  class="CINCO form-control width-100" name="TIPOSAN"   id="TIPOSAN" />
						</div>							
						<div class="col-sm-1"> </div>
					</div>

					<!--================================LINEA 2 PANEL 5 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-4"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">31</span> Nombre del Padre</strong> 
							</label>																					   
							    <input  class="CINCO form-control width-100" name="PADRE"   id="PADRE" />														   							
						</div>
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">32</span> Vive</strong> 
							</label>															   
							<Select  class="CINCO form-control width-100" name="PADREVIVE" id="PADREVIVE">
							        <OPTION value="S">SI</OPTION>	
									<OPTION value="N">NO</OPTION>																	
							</SELECT>														   							
						</div>
						<div class="col-sm-4"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">33</span> Teléfono</strong> 
							</label>															   
							<input  class="CINCO form-control width-100" name="PADRETEL"   id="PADRETEL" />														   							
						</div>	
						<div class="col-sm-1"> </div>					
					</div>	
					<!--================================LINEA 3 PANEL 5 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-4"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">34</span> Nombre del Madre</strong> 
							</label>															   
							<input  class="CINCO form-control width-100" name="MADRE"   id="MADRE" />														   							
						</div>
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">35</span> Vive</strong> 
							</label>															   
							<Select  class="CINCO form-control width-100" name="MADREVIVE" id="MADREVIVE">
							        <OPTION value="S">SI</OPTION>	
									<OPTION value="N">NO</OPTION>																	
							</SELECT>														   							
						</div>
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">36</span> Teléfono</strong> 
							</label>															   
							<input  class="CINCO form-control width-100" name="MADRETEL"   id="MADRETEL" />														   							
						</div>	
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">36</span> El tutor es:</strong> 
							</label>															   
							<Select  class="CINCO form-control width-100" name="ELTUTOR" id="ELTUTOR">
							        <OPTION value="O">OTRA PERSONA</OPTION>		
							        <OPTION value="P">EL PADRE</OPTION>	
									<OPTION value="M">LA MADRE</OPTION>																									
							</SELECT>														   							
						</div>	

						<div class="col-sm-1"> </div>					
					</div>
					</fieldset>
				    </form>
								
				</div><!-- Fin del panel 5-->
<!--================ =======================================================================================-->					
				<div class="step-pane" data-step="6">
				    <form style="width: 100%" method="post" id="frmReg6" name="frmReg6">
					<fieldset>
					<!--================================LINEA 1 PANEL 6 ================================-->
					<div class="row">
					    <div class="col-sm-1"> </div>
						<div class="col-sm-3"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">37</span> Nombre del Tutor</strong> 
							</label>															   
							<input  class="SEIS form-control width-100" name="TUTOR"   id="TUTOR" />														   							
						</div>
						<div class="col-sm-3"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">38</span> Estado de Residencia</strong> 
							</label>															   
							<Select  class="SEIS form-control width-100" name="ESTTUTOR" id="ESTTUTOR">							      																
							</SELECT>														   							
						</div>
						<div class="col-sm-4"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">39</span> Municipio de Residencia</strong> 
							</label>															   
							<Select  class="SEIS form-control width-100" name="MUNTUTOR" id="MUNTUTOR">							      																
							</SELECT>														   							
						</div>	
						<div class="col-sm-1"> </div>					
					</div>	
					<!--================================LINEA 2 PANEL 6 ================================-->
					<div class="row">
						<div class="col-sm-1"> </div>
						<div class="col-sm-3"> 
						       <label class="text-primary">
									<strong><span class="badge badge-info">40</span> Ciudad o Localidad</strong> 
								</label>															   
								<input  class="CUATRO form-control width-100" name="CIUDADTUTOR"   id="CIUDADTUTOR" />
						</div>	
						<div class="col-sm-3"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">41</span> Calle</strong> 
							</label>															   
							<input  class="SEIS form-control width-100" name="CALLETUTOR"   id="CALLETUTOR" />														   							
						</div>
						<div class="col-sm-1"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">42</span> No. Ext/Int</strong> 
							</label>															   
							<input  class="SEIS form-control width-100" name="NUMEROCALLETUTOR"   id="NUMEROCALLETUTOR" />														   							
						</div>
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">43</span> COLONIA </strong> 
							</label>															   
							<input  class="SEIS form-control width-100" name="COLONIATUTOR"   id="COLONIATUTOR" />														   							
						</div>
						<div class="col-sm-1"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">44</span> C.P.</strong> 
							</label>															   
							<input  class="SEIS form-control width-100" name="CPTUTOR"   id="CPTUTOR" />														   							
						</div>						
					</div>	

					<!--================================LINEA 3 PANEL 6 ================================-->
					<div class="row">
						<div class="col-sm-1"> </div>
						<div class="col-sm-2"> 
						       <label class="text-primary">
									<strong><span class="badge badge-info">45</span> Télefono Celular</strong> 
								</label>															   
								<input  class="CUATRO form-control width-100" name="TELCELTUTOR"   id="TELCELTUTOR" />
						</div>	
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">46</span> Teléfono de casa</strong> 
							</label>															   
							<input  class="SEIS form-control width-100" name="TELCASATUTOR"   id="TELCASATUTOR" />														   							
						</div>
						<div class="col-sm-2"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">47</span> Correo electrónico</strong> 
							</label>															   
							<input  class="SEIS form-control width-100" name="CORREOTUTOR"   id="CORREOTUTOR" />														   							
						</div>
						<div class="col-sm-4"> 
						    <label class="text-primary">
								<strong><span class="badge badge-info">48</span> Centro de Trabajo </strong> 
							</label>															   
							<input  class="SEIS form-control width-100" name="TRABAJOTUTOR"   id="TRABAJOTUTOR" />														   							
						</div>										
					</div>	
					</fieldset>
				    </form>			
				</div><!-- Fin del panel 6-->
<!--================ =======================================================================================-->					
					<div class="step-pane" data-step="7" id="listaadj" style="padding-top: 0px; margin:0px;">
					    
					</div>
			</div>


			<hr/>
		    </div>
			<div class="wizard-actions">
					<button class="btn btn-white btn-danger btn-round btn-prev">
					    <i class="ace-icon danger fa fa-arrow-left"></i>Ant
					</button>

					<button class="btn btn-white  btn-info btn-round btn-next" data-last="Finalizar">Sig
						<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
					</button>
			</div>
		</div><!-- /.widget-main -->
	</div><!-- /.widget-body -->


<!--====================================================PIE DE PAGINA ========================================= -->
<div style="height:5px; background-color:#C40E0E;"> </div>
<div class="container-fluid informacion" >   
		 <div class="row" style="background-color: #9B0B0B;">
		     <div class="col-md-2" > </div>
             <div class="col-md-3" > 
			    <div class='space-8'></div>
			    <div class="row"> 
					<div class="col-md-12"> 
						 <span style="color:#9E9494; font-weight: bold;"> REDES SOCIALES</span>
					</div>
				 </div>
				 <div class="row"> 
				    <div class="col-md-12"> 
						 <a href="https://www.facebook.com/tecnologico.macuspana.73" target="_blank">
						 <i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
						 <span style="color:white; font-weight: bold;"> Facebook</span></a>
                    </div>

				 </div>
             </div>
			  <div class="col-md-3" >
					<div class='space-8'></div>
					<div class="row"> 
							<div class="col-md-12"> 
								<span style="color:#9E9494; font-weight: bold;"> CONTACTO</span>
							</div>
					</div>
					<div class="row"> 
							<div class="col-md-12"> 
								<i class="ace-icon fa fa-phone white bigger-150"></i>
								<span style="color:white; font-weight: bold;"> escolares@macuspana.tecnm.mx</span>
							</div>
					</div>				
			  </div>				

			  <div class="col-md-4" >
					<div class='space-8'></div>
					<div class="row"> 
							<div class="col-md-12"> 
								<span style="color:#9E9494; font-weight: bold;">INSTITUTO TECNOLÓGICO SUPERIOR DE MACUSPANA</span>
							</div>
					</div>
					<div class="row"> 
							<div class="col-md-12"> 
								<i class="ace-icon fa fa-map-marker green bigger-150"></i>
								<span style="color:white; font-weight: bold;"> Avenida Tecnológico s/n, Lerdo de Tejada 1ra Secc.</span>
						    </div>
					</div>
					<div class="row"> 
							<div class="col-md-12"> 								
								<span style="color:white; font-weight: bold;"> Macuspana, Tabasco, C.P. 86719</span>
						    </div>
					</div>
					
					

					
			  </div>

			  <div class="col-md-1" style="padding-top: 20px; text-align: right;">
			    
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
<script src="<?php echo $nivel; ?>assets/js/jquery.validate.min.js"></script>
<script src="<?php echo $nivel; ?>js/subirArchivos.js"></script>
<script src="<?php echo $nivel; ?>js/utilerias.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.jqGrid.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/grid.locale-en.js"></script>
<script src="<?php echo $nivel; ?>assets/js/bootbox.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.gritter.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.easypiechart.min.js"></script>

<script src="<?php echo $nivel; ?>assets/js/wizard.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery-additional-methods.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/jquery.maskedinput.min.js"></script>
<script src="<?php echo $nivel; ?>assets/js/select2.min.js"></script>

<script src="registro.js"></script>
<script type="text/javascript">


</script>

</body>
</html>


