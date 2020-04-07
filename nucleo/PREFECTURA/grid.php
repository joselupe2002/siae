
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

        <style type="text/css">table.dataTable tbody tr.selected {color: blue; font-weight:bold; }
               th, td {  word-wrap: break-word;        
                         overflow-wrap: break-word;   }
               
        </style>
	</head>


	<body id="grid_<?php echo $_GET['modulo']; ?>" style="background-color: white;">
	    
	    <?php 
	         date_default_timezone_set("America/Monterrey"); 
	         $dias = array("DOMINGO","LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO");?>
	    <script> eldia="<?php echo $dias[date("N")];?>";</script>	
	    <script> lahora="<?php echo date("H");?>";</script>	
	    
        
	    
	    
	    
	    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>


        
        <div class="row" style="margin-left: 10px; margin-right: 10px; width: 98%;">
             <div class="col-md-4">        
		    

                 <div class="row">
                        <div class="col-md-5"> 
				 	         <span class="label label-warning">Fecha</span>	          
			                
	                         <div class="input-group">
	                              <input  class="form-control date-picker" style="cursor: pointer;" name="fecha" id="fecha" 
	                               type="text"  autocomplete="off"  data-date-format="dd/mm/yyyy" /> 
	                              <span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i></span>
	                         </div>	                         	                       
			                 
			              </div>
			              
					    
					        
			              <div class="col-md-3">
			                   <span class="label label-info">Hora</span>
			                   <select id="hora" style="width: 100%;">
			                     <option value="07">07:00</option>
			                     <option value="08">08:00</option>
			                     <option value="09">09:00</option>
			                     <option value="10">10:00</option>
			                     <option value="11">11:00</option>
			                     <option value="12">12:00</option>
			                     <option value="13">13:00</option>   
			                     <option value="14">14:00</option> 
			                     <option value="15">15:00</option> 
			                     <option value="16">16:00</option> 
			                     <option value="17">17:00</option> 
			                     <option value="18">18:00</option>                    
			                  </select>
			              </div>			            
                  </div>
              </div>
              <div class="col-md-2" style=" padding-top: 10px;" >    
                  <button type="button" onclick="cargarHorarios();" class="btn btn-success">Abrir Prefectura</button>
              </div>
                   
          </div> <!--  De la fila  -->
          
        <div class="space-6"></div>


          
          <div class="row" style="margin-left: 10px; margin-right: 10px; width: 98%;">
             <div style="overflow-y: auto;">
	                 <table id=tabHorarios class= "table table-sm table-condensed table-bordered table-hover" style="overflow-y: auto;">
	   	                 <thead>  
		                      <tr>
		                          <th>Profesor</th> 	
		                          <th>Aula</th> 
		                           <th>Horario</th> 
		                          <th>Incidencia</th> 
		                                	   	   
		                       </tr> 
		                 </thead> 
		              </table>	
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
        var comisiones;
        var tiempo;
        
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		function pad (str, max) {
			  str = str.toString();
			  return str.length < max ? pad("0" + str, max) : str;
			}

		$(document).ready(function($) { 
						
			$("#dia option[value='"+eldia+"']").attr("selected", true);
			$("#hora option[value='"+lahora+"']").attr("selected", true);
		
			
			var f = new Date();
			$("#fecha").val(pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear());
			
			//Para los componentes de fecha 
			$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
			

			});


 function buscarIncidencia(prof){
	 var cad="";
	 jQuery.each(comisiones, function(clave, valor) { 
		 if (prof==valor.COMI_PROFESOR) {
               if ((tiempo>=parseInt(valor.COMI_HORAI)+parseInt(valor.COMI_MINI)) & (tiempo<parseInt(valor.COMI_HORAF)+parseInt(valor.COMI_MINF))) {
            	   cad='COMISIONADO: '+valor.COMI_ACTIVIDAD+'-'+valor.COMI_HORAINI+' A '+valor.COMI_HORAFIN;
                   }
		    }
		 });
     return cad;
}

 function generaTabla(grid_data){
       c=0;
       opc="<OPTION value=\"P\">Presente</OPTION>"+"<OPTION value=\"F\">Falta</OPTION>"+"<OPTION value=\"J\">Justificada</OPTION>"+"<OPTION value=\"T\">Tarde</OPTION>";
       $("#cuerpo").empty();
	   $("#tabHorarios").append("<tbody id=\"cuerpo\">");
       jQuery.each(grid_data, function(clave, valor) { 	
    	    elcolor="style=\"background-color:white\"";
 
            cadInci=buscarIncidencia(valor.DPRE_PROFESOR);
            estiloInci="";
            DPRE_INCIDENCIA=valor.DPRE_INCIDENCIA;
            if (cadInci.length>0) {estiloInci=" style=\"text-color:blue; text-weight:bold; \"";  DPRE_INCIDENCIA='J' } 
   		

            if (DPRE_INCIDENCIA=='F') { elcolor="style=\"background-color:#F6704C\""; }
            if (DPRE_INCIDENCIA=='J') { elcolor="style=\"background-color:#F5E394\""; }

            
		    $("#cuerpo").append("<tr "+elcolor+" id=\"row"+valor.DPRE_ID+"\">");
		    $("#row"+valor.DPRE_ID).append("<td><span data-rel=\"popover\" data-trigger=\"hover\" data-content=\""+"Asignatura:"+valor.DPRE_MATERIAD+"\n"+cadInci+"\"><span "+estiloInci+">"+valor.DPRE_PROFESORD+"</span></span></td>");
		    $("#row"+valor.DPRE_ID).append("<td>"+valor.DPRE_AULA+"</td>");
		    $("#row"+valor.DPRE_ID).append("<td>"+valor.DPRE_HORARIO+"</td>");
			$("#row"+valor.DPRE_ID).append("<td><select onchange=\"grabainci('"+valor.DPRE_ID+"');\" id=\"inci_"+valor.DPRE_ID+"\">"+opc+"</select></td>");
			$("#inci_"+valor.DPRE_ID).val(DPRE_INCIDENCIA); 
            c++;
            $('[data-rel=popover]').popover({html:true});
        });
}		


function grabainci(id){
	 parametros={
			 tabla:"edprefectura",
			 campollave:"DPRE_ID",
			 valorllave:id,
			 bd:"Mysql",			
			 DPRE_INCIDENCIA:$("#inci_"+id).val()
			};

	 $.ajax({
         type: "POST",
         url:"../base/actualiza.php",
         data: parametros,
         success: function(data){		                                	                      
             if (!(data.substring(0,1)=="0"))	
	                 { 						                  
                      if ($("#inci_"+id).val()=='F') {
                    	  $("#row"+id).css("background-color","#F6704C");
                          }
                      if ($("#inci_"+id).val()=='J') {
                    	  $("#row"+id).css("background-color","#F5E394");
                          }
                      if ($("#inci_"+id).val()=='P') {
                    	  $("#row"+id).css("background-color","white");
                          }
                      if ($("#inci_"+id).val()=='T') {
                    	  $("#row"+id).css("background-color","white");
                          }
                      
	                  }	
             else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
         }					     
     });      
     
}

function cargarPrefectura(id){
        $.ajax({
	           type: "GET",
	           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT * from edprefectura where DPRE_PREFECTURA="+id+" order by DPRE_AULA"),
	           success: function(data){ 	        	   	        	
	        	     generaTabla(JSON.parse(data));
	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });
}


function insertarPrefectura(dia,numsem,mes,anio){ 
  parametros={tabla:"eprefectura",
			  bd:"Mysql",
			  _INSTITUCION:"<?php echo $_SESSION['INSTITUCION'];?>",
			  _CAMPUS:"<?php echo $_SESSION['CAMPUS'];?>",
			  PREF_FECHA:$("#fecha").val(),
			  PREF_DIA:dia,
			  PREF_NSEM:numsem, 
			  PREF_MES:mes, 
			  PREF_ANIO:anio,
			  PREF_HORA:$("#hora").val(),
			  PREF_USUARIO:"<?php echo $_SESSION['usuario'];?>"};

              $('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
			  $.ajax({
			 		  type: "POST",
			 		  url:"../base/inserta.php",
			 	      data: parametros,
			 	      success: function(data){ 

	                        //Obtenemos el ID insertado 
                           laurl="../base/getdatossql.php?sql="+encodeURI("select max(PREF_ID) as ID from eprefectura")+"&bd=Mysql";

                           $.ajax({
            	               type: "GET",
            	               url: laurl,
            	               success: function(data){  		                
            	            	   losdatos=JSON.parse(data);  
            		        	   jQuery.each(losdatos, function(clave, valor) { idPref=valor.ID;});            		        	 
            	               }
            			 });


			 			   			                                	                      
			 			   if (!(data.substring(0,1)=="0"))	{ 					                	 			                  
			                     //cargamos los horarios para el dia  
			 				   laurl="../base/getdatossql.php?sql="+encodeURI("select IDDETALLE,CARRERA, CARRERAD,PROFESOR,PROFESORD,MATERIA, MATERIAD,"+dia+"_1 as HORARIO,"+dia+"_A as AULA"+
			 						 " from vedgrupos s where s.CICLO=getciclo() "+ 
			 						 " and "+$("#hora").val()+"01 between  substr("+dia+"_S,1,4) and substr("+dia+"_S,5,4)")+"&bd=Mysql";

			                   
			 				  $.ajax({
			 		               type: "GET",
			 		               url: laurl,
			 		               success: function(data){  		
			 		            	   var losdatos=[];                
			 		            	   losdatos=JSON.parse(data);  
			 		            	   cad="";
			 		            	   c=0;
			 			        	   jQuery.each(losdatos, function(clave, valor) { 
                                            cad+=idPref+"|"+
                                                 valor.PROFESOR+"|"+
                                                 valor.PROFESORD+"|"+
                                                 valor.MATERIA+"|"+
                                                 valor.MATERIAD+"|"+
                                                 valor.HORARIO+"|"+
                                                 "P|"+
                                                 valor.AULA+"|"+
                                                 valor.CARRERA+"|"+
                                                 valor.CARRERAD+"|"+
                                                 valor.IDDETALLE;
                                                 losdatos[c]=cad;                                                  
                                                 cad="";
                                                 c++;
				 			        	    });
			 			        	  var loscampos = ["DPRE_PREFECTURA","DPRE_PROFESOR","DPRE_PROFESORD","DPRE_MATERIA","DPRE_MATERIAD",
				 			        	               "DPRE_HORARIO","DPRE_INCIDENCIA","DPRE_AULA","DPRE_CARRERA","DPRE_CARRERAD","DPRE_GRUPOID",];
			     	    
			     	                  parametros={
			     	    	           	tabla:"edprefectura",
			     	    		        campollave:"DPRE_PREFECTURA",
			     	    		        bd:"Mysql",
			     	    		        valorllave:idPref,
			     	    		        eliminar: "S",
			     	    		        separador:"|",
			     	    		        campos: JSON.stringify(loscampos),
			     	    	            datos: JSON.stringify(losdatos)
			     	                  };


			     	                 $.ajax({
			     	        	        type: "POST",
			     	        	        url:"../base/grabadetalle.php",
			     	        	        data: parametros,
			     	        	        success: function(data){
			     	        	        	$('#dlgproceso').modal("hide");  
			     	        	        	if (data.length>0) {alert ("Ocurrio un error: "+data);}
			     	        	        	else {cargarPrefectura(idPref);}		                                	                                        					          
			     	        	        }					     
			     	        	    });    	 
			 			        	  
			 		               }
			 				 });
			 			
			                                                                            
			 			    }	
			 				else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
			 	      }			     
			  });              
}



Date.prototype.getWeekNumber = function () {
    var d = new Date(+this);  //Creamos un nuevo Date con la fecha de "this".
    d.setHours(0, 0, 0, 0);   //Nos aseguramos de limpiar la hora.
    d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
    //Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};


	function cargarHorarios() { 
             //buscamos el dia de acuerdo a la fecha
             dias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO","DOMINGO"];
             var lafecha = $("#fecha").val().replace(/\/+/g,'-');
             dia=lafecha.substring(0,2);
             mes=lafecha.substring(3,5);
             anio=lafecha.substring(6,10);
 			 date = new Date(anio+"-"+mes+"-"+dia);
 			 eldia=dias[date.getDay()];
 			 numsem=date.getWeekNumber();

 			

 			 tiempo=$("#hora").val().substring(0,2)*60;

 			
			 laurl="../base/getdatossql.php?sql="+encodeURI("select COUNT(*) as NUM, IDPREF from vdprefectura where "+
					 " FECHA='"+$("#fecha").val()+"'"+
					 " AND USUARIO='<?php echo $_SESSION['usuario'];?>'"+
					 " AND DIA='"+eldia+"'"+
					 " AND HORA='"+$("#hora").val()+":00'")+"&bd=Mysql";


			 $.ajax({
	               type: "GET",
	               url: laurl,
	               success: function(data){  		                

	            	   $.ajax({
	    	               type: "GET",
	    	               url: "../base/getdatossql.php?sql="+encodeURI("select COMI_PROFESOR, COMI_HORAINI, COMI_HORAFIN, COMI_ACTIVIDAD, "+
	    	            	    "SUBSTRING(COMI_HORAINI,1,2)*60 AS COMI_HORAI,SUBSTRING(COMI_HORAINI,4,2) AS COMI_MINI,"+
	    	            	    "SUBSTRING(COMI_HORAFIN,1,2)*60 AS COMI_HORAF,SUBSTRING(COMI_HORAFIN,4,2) AS COMI_MINF from vpcomisiones "+
	    	            	    "where  STR_TO_DATE('"+$("#fecha").val()+"','%d/%m/%Y') BETWEEN  STR_TO_DATE(COMI_FECHAINI,'%d/%m/%Y')  AND STR_TO_DATE(COMI_FECHAFIN,'%d/%m/%Y') ")+"&bd=Mysql",
	    	               success: function(data){  		    	              			               
	    	            	   comisiones=JSON.parse(data);  		    	            	       		        	 		    		        
	    	               }
	    			    });

	    			  
	            	   losdatos=JSON.parse(data);  
		        	   jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; elid=valor.IDPREF;  });
		     
		        	   if (hay>0) {
                             cargarPrefectura(elid);		        		   
			        	   }
		        	   else { 
                             insertarPrefectura(eldia,numsem,mes,anio);
			        	   }
	               }
			 });
			
	 
		}





		</script>


	</body>
<?php } else {header("Location: index.php");}?>
</html>
