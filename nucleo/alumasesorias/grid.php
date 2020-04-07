
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
	    
	    
	    
	    
	    <div class="preloader-wrapper"><div class="preloader"><img src="<?php echo $nivel; ?>imagenes/menu/preloader.gif"></div></div>


          
          <div class="row" style="margin-left: 10px; margin-right: 10px; width: 98%;">
            <h3 class="header smaller lighter red">Listado de Asesorias sin confirmar</h3>
            
             <div style="overflow-y: auto;">
	                 <table id=tabHorarios class= "table table-sm table-condensed table-bordered table-hover" style="overflow-y: auto;">
	   	                 <thead>  
		                      <tr>
		                         <th style="text-align: center;">Id</th> 
		                          <th style="text-align: center;">Fecha</th> 
		                          <th style="text-align: center;">Profesor</th> 	
		                          <th style="text-align: center;" class="hidden-480">Asignatura</th> 		                          
		                          <th style="text-align: center;" class="hidden-480">Tema</th> 
		                          <th style="text-align: center;">Confirmar</th> 
		                                	   	   
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
		$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

		$(document).ready(function($) { 
			cargarAsesorias();
			

			});




 function generaTabla(grid_data){
       c=0;
       $("#cuerpo").empty();
	   $("#tabHorarios").append("<tbody id=\"cuerpo\">");
       jQuery.each(grid_data, function(clave, valor) { 	
    	    $("#cuerpo").append("<tr id=\"row"+valor.ASES_ID+"\">");
    	    $("#row"+valor.ASES_ID).append("<td>"+valor.ASES_ID+"</td>");
    	    $("#row"+valor.ASES_ID).append("<td>"+valor.ASES_FECHA+"</td>");
		    $("#row"+valor.ASES_ID).append("<td>"+valor.ASES_PROFESORD+"</td>");
		    $("#row"+valor.ASES_ID).append("<td class=\"hidden-480\">"+valor.ASES_ASIGNATURAD+"</td>");
		    $("#row"+valor.ASES_ID).append("<td class=\"hidden-480\">"+valor.ASES_TEMA+"</td>");
			$("#row"+valor.ASES_ID).append("<td><button onclick=\"confirma('"+valor.ASES_ID+"');\" class=\"btn btn-xs btn-succcess\"><i class=\"ace-icon fa fa-thumbs-up bigger-120\"></i></button></td>");
        });
}		


function confirma(id){
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
            	       $("#row"+id).remove();
	                  }	
             else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
         }					     
     });      
     
}

function cargarAsesorias(){
	    $.ajax({
	           type: "GET",
	           url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI("SELECT * from vasesorias where ASES_MATRICULA="+
	    	                                                           "'<?php echo $_SESSION['usuario']?>' AND ASES_STATUS='N' order by ASES_ID"),
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

			 laurl="../base/getdatossql.php?sql="+encodeURI("select COUNT(*) as NUM, PREF_ID from eprefectura where "+
					 " PREF_FECHA='"+$("#fecha").val()+"'"+
					 " AND PREF_USUARIO='<?php echo $_SESSION['usuario'];?>'"+
					 " AND PREF_DIA='"+eldia+"'"+
					 " AND PREF_HORA='"+$("#hora").val()+"'")+"&bd=Mysql";

			 $.ajax({
	               type: "GET",
	               url: laurl,
	               success: function(data){  		                
	            	   losdatos=JSON.parse(data);  
		        	   jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; elid=valor.PREF_ID;  });
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
