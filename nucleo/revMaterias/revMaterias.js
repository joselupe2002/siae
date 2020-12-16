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
	

		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Escolar Proceso</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc order by cicl_clave desc", "","");  			      
	
		$("#losalumnos").append("<span class=\"label label-warning\">Alumno</span>");
		addSELECT("selAlumnos","losalumnos","PROPIO", "SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) from falumnos WHERE ALUM_ACTIVO IN (1,2)", "","BUSQUEDA");  			      

		$("#lostipos").append("<span class=\"label label-warning\">Tipo Calificación</span>");
		addSELECT("selTipos","lostipos","PROPIO", "SELECT TCACVE, TCADES FROM dtcali order by TCACVE desc", "","");  			      

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selCarreras') {	
			$("#loshorarios").empty();
				
		}  
    }

/*===========================================================POR MATERIAS ==============================================*/
    function cargarInformacion(){
		
		elsql="SELECT ALUM_MAPA, IFNULL(ALUM_ESPECIALIDAD,'0') as ESP, IFNULL(b.CLAVEOF,'SE') AS ESPD FROM falumnos a "+
		" LEFT OUTER JOIN especialidad b on (b.ID=a.ALUM_ESPECIALIDAD)"+
		" WHERE ALUM_MATRICULA='"+$("#selAlumnos").val()+"'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  				      			      
				 $("#elmapa").html(JSON.parse(data)[0]["ALUM_MAPA"]);  
				 $("#laesp").html(JSON.parse(data)[0]["ESP"]);  
				 $("#laespd").html(JSON.parse(data)[0]["ESPD"]);  
				 
				 script="<table id=\"tabMaterias\" name=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
				"        <thead >  "+
				"             <tr id=\"headMaterias\">"+
				"                <th>No.</th> "+
				"                <th>Semestre</th> "+
				"                <th>Créditos</th> "+		
				"                <th>Cve. Mat.</th> "+
				"                <th>Nombre Materia</th> "+	
				"                <th>Cal.</th> "+	
				"                <th>Guardar</th> "+			   
				"             </tr> "+
				"            </thead>" +
				"         </table>";
				$("#informacion").empty();
				$("#informacion").append(script);
						
				elsql="SELECT CICL_MATERIA AS MATERIA, CICL_MATERIAD as MATERIAD, CICL_CUATRIMESTRE AS SEM, c.CICL_CREDITO AS CRED "+
				" FROM veciclmate c where c.CICL_MAPA='"+$("#elmapa").html()+"'"+
				" and if(c.CVEESP=0,'"+$("#laesp").html()+"',CVEESP)='"+$("#laesp").html()+"' AND CICL_MATERIA NOT IN "+
			    " (SELECT MATCVE from  dlista WHERE ALUCTR='"+$("#selAlumnos").val()+"' and LISCAL>=70) order by CICL_CUATRIMESTRE, CICL_MATERIAD";
			   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

			
				mostrarEspera("esperahor","grid_revMaterias","Cargando Datos...");
				$.ajax({
					type: "POST",
					data:parametros,
					url:  "../base/getdatossqlSeg.php",
					success: function(data){  	
						   		      			      
							generaTablaMaterias(JSON.parse(data));   													
							ocultarEspera("esperahor");  																											
					},
					error: function(dataMat) {	                  
							alert('ERROR: '+dataMat);
										}
				});	      	      																	
																																	
				},
				error: function(dataMat) {	                  
						alert('ERROR: '+dataMat);
									}
				});	      	      					  
			  					  		
}

function generaTablaMaterias(grid_data){	
	contAlum=1;

	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   			
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.SEM+"</span></td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-success\">"+valor.CRED+"</span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.MATERIA+"</td>");	
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.MATERIAD+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><SELECT id=\""+valor.MATERIA+"_cal"+"\"></SELECT></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span onclick=\"guardarCal('"+valor.MATERIA+"','"+valor.MATERIAD+"')\" "+
		                           "class=\"btn btn-white\"><i class=\"fa fa-save red bigger-160\"></i></span></td>");
		$("#"+valor.MATERIA+"_cal").html($("#base").html());
		
	    contAlum++;      			
	});	
} 



function guardarCal (materia,materiad){
	if (confirm("¿Seguro que desea agregar Cal: "+$("#"+materia+"_cal").val()+" a la Asignatura: "+materiad+"?")) {
		fecha=dameFecha("FECHAHORA");
		parametros={tabla:"dlista",
				bd:"Mysql",
				PDOCVE:$("#selCiclos").val(),
				ALUCTR:$("#selAlumnos").val(),
				MATCVE:materia, 
				GPOCVE:"REV", 
				LISCAL:$("#"+materia+"_cal").val(),
				CERRADO:"S",
				TCACVE:$("#selTipos").val(),
				LISTC15:"9999",
				USUARIO: usuario,
				FECHAINS:fecha,
				_INSTITUCION: institucion, 
				_CAMPUS: campus,
				BAJA: "N",
				TIPOCAL:$("#selTipos").val()};
				$('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
				$.ajax({
						type: "POST",
						url:"../base/inserta.php",
						data: parametros,
						success: function(data){ 
								parametros={tabla:"wa_bitacora",
								bd:"Mysql",
								CICLO:$("#selCiclos").val(),
								USUARIO:usuario,
								MATERIA:materia, 
								GRUPO:"REV", 
								PROFESOR:"9999",
								MATRICULA: $("#selAlumnos").val(),
								CALIFICACION:$("#"+materia+"_cal").val(),						
								FECHA_REG: fecha,
								_INSTITUCION: institucion, 
								_CAMPUS: campus};	
							$.ajax({
									type: "POST",
									url:"../base/inserta.php",
									data: parametros,
									success: function(data){ 	
									cargarInformacion();        		        	 
								}
							});
							}
						});			
		}		
}


function verCalificaciones() {
	$("#modalDocument").modal("hide");

	script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
    "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header widget-header  widget-color-green\">"+
	   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Alumno:"+$("#selAlumnos option:selected").text()+"</span></b> </span>"+
	   "             <button type=\"button\" class=\"close\"  data-dismiss=\"modal\"   aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "          </div>"+  
	   "          <div id=\"frmdescarga\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto;\" >"+					  
	   "             <div class=\"row\"> "+		
       "                  <table id=\"tabActividad\" class= \"table table-condensed table-bordered table-hover\">"+
	   "                         <thead>  "+
	   "                               <tr>"+
	   "                             	   <th>No</th> "+
	   "                             	   <th>Id</th> "+
	   "                             	   <th>Clave</th> "+
	   "                             	   <th>Materia</th> "+  
	   "                             	   <th>Cal</th> "+
	   "                                   <th>Eliminar</th> "+
	   "                               </tr> "+
	   "                         </thead>" +
	   "                   </table>"+	
	   "             </div> "+ //div del row
	   "          </div>"+ //div del modal-body		 
       "        </div>"+ //div del modal content		  
	   "      </div>"+ //div del modal dialog
	   "   </div>"+ //div del modal-fade
	   "</div>";

	 $("#modalDocument").remove();
     if (! ( $("#modalDocument").length )) {
          $("#grid_revMaterias").append(script);
	 }
	  
    $('#modalDocument').modal({show:true, backdrop: 'static'});

	elsql="select ID AS ID, MATCVE AS MATERIA, MATE_DESCRIP AS MATERIAD, LISCAL AS CAL "+
	    " from dlista a, cmaterias b where MATCVE=MATE_CLAVE AND a.ALUCTR='"+$("#selAlumnos").val()+"'"+
		" and a.GPOCVE='REV' ORDER BY MATCVE DESC";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  
				generaMateriasRev(JSON.parse(data));
				ocultarEspera("esperahor"); 
			},
			error: function(data) {	                  
					alert('ERROR: '+data);
				}
			});
}

function generaMateriasRev(grid_data){	
	contAlum=1;
	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   			
		$("#tabActividad").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.ID+"</span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.MATERIA+"</td>");	
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.MATERIAD+"</td>");	
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-success\">"+valor.CAL+"</span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span onclick=\"eliminarCal('"+valor.ID+"','"+valor.MATERIAD+"')\" "+
		                           "class=\"btn btn-white\"><i class=\"fa fa-times red bigger-160\"></i></span></td>");		
	    contAlum++;      			
	});	
} 


function eliminarCal(id, materiad){
	if(confirm("Seguro que desea eliminar la Calificación de la Materia: "+materiad)) 
		 {
				 var parametros = {
							tabla : "dlista",
							bd:"Mysql",
	    	                campollave : "ID",
	    	                valorllave : id
	    	        };
	    	        $.ajax({
	    	            data:  parametros,
	    	            url:   '../base/eliminar.php',
	    	            type:  'post',          
	    	            success:  function (response) {  
							$("#modalDocument").modal("hide");		        
							cargarInformacion();
	    	            }
	    	    });
		}

    }
