var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#laspreguntas").append("<span class=\"label label-warning\">Preguntas</span>");
		addSELECT("selPreguntas","laspreguntas","PROPIO", "SELECT CLAVE, PREGUNTA FROM encpreguntas where IDENC=0  order by CLAVE", "","BUSQUEDA"); 

		$("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_CLAVE=0", "","");  			      

		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				actualizaSelect("selCarreras", "(SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+")) UNION (SELECT '%', 'TODAS LAS CARRERAS' FROM DUAL)", "",""); 				
				miscarreras=data;
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });
		
		$("#lasencuestas").append("<span class=\"label label-danger\">Encuesta</span>");
		addSELECT("selEncuestas","lasencuestas","PROPIO", "SELECT ID, DESCRIP FROM encuestas order by ID desc", "","");  			      
	

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selEncuestas') {	
			actualizaSelect("selPreguntas","SELECT CLAVE, concat(CLAVE,' ',PREGUNTA) FROM encpreguntas where IDENC='"+$("#selEncuestas").val()+"' order by CLAVE","BUSQUEDA");
		}  
    }

/*===========================================================POR MATERIAS ==============================================*/
    function cargarInformacion(){

		cadPreg="";
		miscampos="";
		$("#selPreguntas option").each(function(){
			if ($(this).attr('value')!='0') {
				cadPreg+="<td title=\""+$(this).text()+"\">"+$(this).attr('value')+"</td>";
				miscampos+=$(this).val()+',';
			}
		 });

		script="<table id=\"tabMaterias\" name=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headMaterias\">"+
		   "                <th>No.</th> "+
		   "                <th>No. Control</th> "+
		   "                <th>Nombre</th> "+
		   "                <th>Carrera</th> "+
		   "                <th>Especialiad</th> "+
		   cadPreg+			 
		   "             </tr> "+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);
				
		elsql="SELECT a.ID, ALUM_MATRICULA AS MATRICULA,  CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) as NOMBRE, "+
		" CARR_DESCRIP AS CARRERAD,"+miscampos+"CLAVEOF, e.DESCRIP AS ESPECIALIDADD  FROM encrespuestas a, "+
		" falumnos b JOIN ccarreras ON (ALUM_CARRERAREG=CARR_CLAVE)"+
		" LEFT OUTER JOIN especialidad e ON (ALUM_ESPECIALIDAD=ID)  where  IDENC='"+$("#selEncuestas").val()+"'"+
		      " and a.IDRESPONDE=b.ALUM_MATRICULA AND ALUM_CARRERAREG LIKE '"+$("#selCarreras").val()+"'";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  				      			      
					generaTabla(JSON.parse(data));   													
				    ocultarEspera("esperahor");  																											
			},
			error: function(dataMat) {	                  
					alert('ERROR: '+dataMat);
								}
	});	      	      					  					  		
}

function generaTabla(grid_data){	
	contAlum=1;
	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   			
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		
		$("#rowM"+contAlum).append("<td class=\"fontRoboto\">"+valor.MATRICULA+"</td>");
		$("#rowM"+contAlum).append("<td class=\"fontRoboto\">"+valor.NOMBRE+"</td>");
		$("#rowM"+contAlum).append("<td class=\"fontRoboto\">"+valor.CARRERAD+"</td>");
		$("#rowM"+contAlum).append("<td class=\"fontRoboto\">"+valor.ESPECIALIDADD+"</td>");
		$("#selPreguntas option").each(function(){
			if ($(this).attr('value')!='0') {
				$("#rowM"+contAlum).append("<td class=\"fontRobotoB\">"+grid_data[contAlum-1][$(this).attr('value')]+"</td>");		
			}
		 });
		
	    contAlum++;      			
	});	
} 



function verTablas(){

	var losdatos=[];
	var loscolores=[];
	var lasetiquetas=[];

	var colores=["#4b77a9","#5f255f","#d21243","#B27200","#B21200","#B23200","#B57200","#B47200"];
	latabla="<table id=\"tabTab\" name=\"tabTab\" class= \"table table-condensed table-bordered table-hover\">"+
                   "        <thead >  "+
                   "             <tr id=\"headTab\">"+
                   "                <th>No.</th> "+
				   "                <th>Respuesta</th> "+
					"                <th>No.</th> "+
					"             </tr> "+
					"            </thead>" +
					"         </table>"+
					"  <div class=\"row\" style=\"border:1px #E4E4E9 solid;\">"+
					"       <div class=\"col-sm-12\" id=\"canvas-holder\">"+
					"            <canvas id=\"chart-area\"></canvas>"+
					"       </div> "+
					" </div> ";
	

	mostrarIfo("infoMat","grid_enc_resultados",$("#selPreguntas option:selected").text(),latabla,"modal-lg"); 
	

	sql="SELECT "+$("#selPreguntas").val()+" as x,count(*) AS y "+
	" FROM encrespuestas s, falumnos t where s.IDRESPONDE=t.ALUM_MATRICULA "+
	" and IDENC= '"+$("#selEncuestas").val()+"'"+
	" and t.ALUM_CARRERAREG like '"+$("#selCarreras").val()+"' GROUP BY "+$("#selPreguntas").val();

	parametros={sql:sql,dato:sessionStorage.co,bd:"Mysql"}
	cont=1;
	$("#cuerpoTab").empty();
	$("#tabTab").append("<tbody id=\"cuerpoTab\">");

	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  	


			jQuery.each(JSON.parse(data), function(clave, valor) {
				$("#cuerpoTab").append("<tr id=\"rowT"+cont+"\">");
				$("#rowT"+cont).append("<td>"+cont+"</td>");
				$("#rowT"+cont).append("<td style=\"white-space: normal;\">"+valor.x+"</td>");
				$("#rowT"+cont).append("<td>"+valor.y+"</td>");		
				losdatos[cont-1]=valor.y;	
				loscolores[cont-1]=colores[cont-1];		
				lasetiquetas[cont-1]=valor.x;	
				cont++;
			});	
	
			
			var data = [{data:losdatos,
				backgroundColor: loscolores,
				borderColor: "#fff"
			  }];
  
			var options = {
				tooltips: {
					callbacks: {
						label: function(tooltipItem, data) {
							var dataset = data.datasets[tooltipItem.datasetIndex];
						var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
							return parseFloat(previousValue) + parseFloat(currentValue);
						});
						var currentValue = dataset.data[tooltipItem.index];
						var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
						return total+" "+currentValue+" "+precentage + "%";
						}
					}
					}
			};
  
			var ctx = document.getElementById("chart-area").getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'pie',
				data: {
				labels: lasetiquetas,
				datasets: data
				},
				options: options
			});




			
	 },
	 error: function(dataMat) {	                  
			 alert('ERROR: '+dataMat);
						 }
    });	  
   	      				
}


