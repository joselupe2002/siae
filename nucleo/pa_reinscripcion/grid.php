<!--  =================================================================
                  GRID PERSONALIZADO PARA LAS REINSCRIPCIONES  
      =================================================================                
                  -->
<!DOCTYPE unspecified PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
                  
<?php session_start(); if (($_SESSION['inicio']==1)  && (strpos($_SESSION['permisos'],$_GET["modulo"])) ){ 
	header('Content-Type: text/html; charset='.$_SESSION['encode']);
	include("../.././includes/Conexion.php");
	include("../.././includes/UtilUser.php");
	$miConex = new Conexion();
	$miUtil= new UtilUser();
	$logouser="../../imagenes/login/sigea.png";  
	$nivel="../../";
?>  	
	
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link rel="stylesheet" type="text/css" href="<?php echo $nivel;?>easyUI/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<?php echo $nivel;?>easyUI/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="<?php echo $nivel;?>estilos/tablasCardex.css" />
	<script type="text/javascript" src="<?php echo $nivel;?>easyUI/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo $nivel;?>easyUI/jquery.easyui.min.js"></script>

<?php 	
    $miConex = new Conexion(); 
    $resultado=$miConex->getConsulta($_SESSION['bd'],"SELECT count(*) as n FROM ehistacad WHERE HIST_CICLO=getciclo() 
                                     AND HIST_MATRICULA='".$_SESSION['usuario']."'");
    foreach ($resultado as $row) {
      	$esta=$row[0]; }
      
    if ($esta>0) {
      	echo "<body>
              <center>
                      <div class=\"msjReinsVis\">
                      <b>Tu ya has elegido horario para este ciclo escolar</b><br/>
                      <button id=\"btn\" onclick=\"window.open('horario.php')\">Ver Horario</button>
                      </div>
              </center>
             </body>";      
      }
      else 
      { 
      	$resultado=$miConex->getConsulta($_SESSION['bd'],'SELECT GETSTATUSALUM('.chr(39).$_SESSION['usuario'].chr(39).')');
      	foreach ($resultado as $row) {
      		$status=$row[0];
      	}
      	if ($status<>'ACTIVO:') {
      		echo "<body>
              <center>
                      <div class=\"msjReinsVis\">
                      <b>".$status."</b><br/>
                      <button id=\"btn\" onclick=\"salir()\">Salir</button>
                      </div>
              </center>
              <script type=\"text/javascript\">
                   function salir(){
                       $('#hoja').tabs('close','MiReinscripcion');
                  }
               </script> 
             </body>";   
      	}
      	else {
      		      
      	
      
?>

<body>
    
	<div style="margin:5px 0;"></div>	
	<table id="dg" class="easyui-datagrid" title="Materias Ofertadas" style="width:100%;height:350px"
			data-options="rownumbers:true,singleSelect:false">
		<thead>
			<tr>
				<th data-options="field:'ck',width:40,checkbox:true"></th>
				<th data-options="field:'g',width:45">Grupo</th>
				<th data-options="field:'mat',width:0"></th>
				<th data-options="field:'matd',width:250">Materia</th>
				<th data-options="field:'l',width:65">Lunes</th>
				<th data-options="field:'m',width:65">Martes</th>
				<th data-options="field:'mi',width:65">Miercoles</th>
				<th data-options="field:'j',width:65">Jueves</th>
				<th data-options="field:'j',width:65">Viernes</th>
				<th data-options="field:'j',width:65">Sabado</th>
			</tr>
		</thead>		
		<tbody>
		    <?php 
		       $resultado=$miConex->afectaSQL($_SESSION['bd'],"CALL getmaterias(getciclo(),".chr(39).$_SESSION['usuario'].chr(39).",'WEB')");      	            	   
		       $resultado=$miConex->getConsulta($_SESSION['bd'],'SELECT * FROM temp_materias A WHERE A.TEMP_MATRICULA='.chr(39).$_SESSION['usuario'].chr(39).
      	        		"order by TEMP_CUATRIMESTRE, TEMP_GRUPO");
                foreach ($resultado as $row) {
                	echo "<tr>";
                	echo "<td></td>".
                  	     "<td>".$row["TEMP_GRUPO"]."</td>".
                  	     "<td>".$row["TEMP_MATERIA"]."</td>".
                	     "<td>".$row["TEMP_MATERIAD"]."</td>".
                	     "<td>".$row["TEMP_LUNES"]."</td>".
                	     "<td>".$row["TEMP_MARTES"]."</td>".
                	     "<td>".$row["TEMP_MIERCOLES"]."</td>".
                	     "<td>".$row["TEMP_JUEVES"]."</td>".
                	     "<td>".$row["TEMP_VIERNES"]."</td>".
                	     "<td>".$row["TEMP_SABADO"]."</td>";
                	echo "</tr>";
                	
                }        	
        	?>
		</tbody>		
	</table>	
	<div style="margin:10px 0;">
		<a href="#" class="easyui-linkbutton" onclick="getSelected()">Verificar Horario</a>
		<button id="gh"  style="display:none;" onclick='guardarHorario()'>Grabar Horario</button>
		
	</div>	
	
   <script type="text/javascript">

      
       
		function getSelected(){
			linea="";
			var rows = $('#dg').datagrid('getSelections');
			for(var i=0; i<rows.length; i++){
				var row = rows[i];
				linea=linea+"INSERT INTO TEMP_REINS (TEMP_MATRICULA, TEMP_MATERIA, TEMP_GRUPO, TEMP_CICLO) VALUES ("+
                "'"+$("#laMat").val()+"',"+
		    	"'"+row.mat+"',"+
				"'"+row.g+"',getciclo);";				   		
			}
			$('#hoja').tabs('add',{title: 'Grab9900:',
	                closable: false,
	                href:'guardarHorTem.php?q='+linea                 
	                }); 
            
			var url = "verificaHorario.php"; 
	        var mat=$("#laMat").val();
	        $.ajax({
	               type: "POST",
	               url: url,
	               data: {mat:mat,linea:linea},
	               success: function(data)
	               {   if (data=="TRUE") {
	            	      $("#msj").html("<b>TUS MATERIAS SELECCIONADAS SON CORRECTAS</b>");
	                      $("#msj").show();
	                      $("#gh").show();
	                        	                           	                       	      	          
	                   }else{
		                  $("#msj").html(data);
		                  $("#gh").hide();
	                      $("#msj").show();
	                   } 	               
	               }
	             });
		}

		function guardarHorario(){
		 if(confirm("¿Su horario es correcto desea grabarlo?")){			   
	    	   $('#hoja').tabs('close','MiReinscripcion');
	    	   $('#hoja').tabs('add',{title: 'Grab9900:',
	                closable: false,
	                href:'guardarHorDef.php'                
	                }); 
	    	  
	    	   $('#hoja').tabs('close','Grab9900:');
	    	   alert ("Los Datos de tu Reinscripción fueron grabado adecuadamente");
	    	   window.open('horario.php');
               }
		}	   
	</script>
	
<center>
    <div class="msjReins" id="msj" ></div>
</center> 
    <input style="visibility:hidden" id="laMat" value="<?php echo $_SESSION['matricula'];?>"></input>
    <input style="visibility:hidden" id="verificado" value="0"></input>
</body>



<?php 
      	} //del status del alumno si tiene derecho a reinscribirse
       }// el del si se van a mostrar las materias no esta inscrito
   }// el del si hay sesion 
else 
{header("Location: index.php");}?>
</html>
                  