var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var elalumno="";
var laconfig=[];
var losdias=[];


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		$("#losalumnos").append("<span class=\"label label-primary\">No. de Control</span>");
		addSELECT("selAlumnos","losalumnos","PROPIO", "SELECT NUMERO, CONCAT(NUMERO,' ',NOMBRE) "+
		" FROM vpersonas WHERE STATUS IN ('1','S') ORDER BY NOMBRE", "","BUSQUEDA");  	

		$("#loslibros").append("<span class=\"label label-primary\">No. de Ejemplar</span>");
		addSELECT("selLibros","loslibros","PROPIO", "SELECT ID, CONCAT(ID,' ',TITULO) FROM vbib_ejemplares where ACCESIBLE=3", "","BUSQUEDA");  			
		
		colocarCiclo("elciclo","CLAVE");

		elsql="SELECT * FROM bib_config where TIPO='LIBROS'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){   
				laconfig=JSON.parse(data);
			}
		});

		elsql="select DIAS_FECHA from ediasnoha a where  STR_TO_DATE(DIAS_FECHA,'%d/%m/%Y')>=now()";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){   
				arrt=JSON.parse(data);
				jQuery.each(arrt, function(clave, valor) { 
					losdias[clave]=valor.DIAS_FECHA;					
				});
			}
		});


	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selAlumnos') {
			$("#contAlumno").empty();
			elsql="SELECT NUMERO,CARRERAD, CORREO, TELEFONO, FOTO as FOTO,"+
			" (SELECT COUNT(*) from dlista where PDOCVE=getciclo() and ALUCTR='"+$('#selAlumnos').val()+"') AS INSCRITO"+
			"  FROM vpersonas a where NUMERO='"+$('#selAlumnos').val()+"'";
		
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){   

				arr=JSON.parse(data);
				elcolor="red";
				if (arr[0]["INSCRITO"]>0) {elcolor="green";}
				lafoto=arr[0]["FOTO"];
				if (lafoto=='') {lafoto="../../imagenes/menu/default.png";}
				$("#contAlumno").append(
										"<div class=\"row\">"+
										"     <div class=\"fontRobotoB col-sm-4\">"+
										"         <span class=\"profile-picture\" >"+
										"             <img id=\"img_FOTO\"  style=\"width: 100%; height: 100%;\" "+
										"                  class=\"editable img-responsive\" src=\""+lafoto+"\"/>"+
										"  	      </span>"+
			 							"     </div>"+
										"     <div class=\"fontRobotoB col-sm-8\">"+
										"          <div class=\"row\">"+
										"               <span class=\"text-success\">CARRERA </span><br><span>"+arr[0]["CARRERAD"]+"</span>"+
										"          </div><br>"+
										"          <div class=\"row\">"+
										"               <span class=\"text-success\">CORREO </span><br><span>"+arr[0]["CORREO"]+"</span>"+
										"          </div><br>"+
										"          <div class=\"row\">"+
										"               <span class=\"text-success\">CELULAR</span>"+
										"               <i class=\"fa fa-user "+elcolor+" pull-right bigger-260\" style=\"padding-right:30px;\"></i>"+
										"               <br><span>"+arr[0]["TELEFONO"]+"</span>"+
										"          </div><br>"+
										"      </div>"+
										"</div>"
										);						   
				}
			});	
			cargarInformacion();		
		  }

		  if (elemento=='selLibros') {
			$("#contLibro").empty();
			elsql="SELECT * from vbib_ejemplares where ID='"+$('#selLibros').val()+"' order by TITULO";
		
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){   
				arr=JSON.parse(data);
				lafoto=arr[0]["FOTO_LIBRO"];
				lafechae=dameFechaHabil(laconfig[0]["DIAS"],losdias);
				$("#contLibro").append(
										"<div class=\"row\">"+
										"     <div class=\"fontRobotoB col-sm-4\">"+
										"         <span class=\"profile-picture\">"+
										"             <img id=\"img_ALUM_FOTO\"  style=\"width: 100%; height: 100%;\"  "+
										"                  class=\"editable img-responsive\" src=\""+lafoto+"\"/>"+
										"  	      </span>"+
			 							"     </div>"+
										"     <div class=\"fontRobotoB col-sm-8\">"+
										"          <div class=\"row\">"+
										"               <div class=\"col-sm-6\">"+
										"              		<span class=\"text-success\">AUTOR </span><br><span>"+arr[0]["AUTOR"]+"</span>"+
										"          		</div>"+
										"          </div>"+
										"          <div class=\"row\">"+
										"          		<div class=\"col-sm-6\">"+
										"               	<span class=\"text-success\">CLAS: </span><span>"+arr[0]["CLASIFICACION"]+"</span>"+
										"          		</div>"+										
										"          		<div class=\"col-sm-6\">"+
										"               	<span class=\"text-success\">ANAQUEL:</span><span>"+arr[0]["ANAQUEL"]+"</span>"+	
										"          		</div>"+	
										"          </div>"+
										"		   <hr>"+
										"          <div class=\"row\">"+
										"          		<div class=\"col-sm-6\">"+
										"               	<span class=\"label label-primary\">Fecha Entrega</span>"+
										" 					<div class=\"input-group\"><input  class=\"form-control date-picker\"  id=\"laentrega\" "+
										" 							type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" value=\""+lafechae+"\"/> "+
										" 							<span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
										"          		</div>"+
										"          		<div class=\"col-sm-6\" style=\"padding-top:15px;\">"+
										"               	<button onclick=\"prestaLibro();\" class=\"btn btn-white  btn-info btn-bold\">"+
										"                     <i class=\"ace-icon fa fa-book bigger-120 blue\"></i>Prestar Libro</button>"+
										"          		</div>"+																		
										"          </div><br>"+
										"      </div>"+
										"</div>"
										);	
										$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});					   
				}
			});

			
		  }

	}  



	function prestaLibro(){
		if (($("#selAlumnos").val()>0) && ($("#selLibros").val()>0)) {
			fecha=dameFecha("FECHAHORA");
			fechaent=dameFecha("FECHAHORA",2);
			fechasola=dameFecha("FECHA");
			hora=dameFecha("HORA");
			parametros={tabla:"bib_prestamos",
							bd:"Mysql",
							MATRICULA:$("#selAlumnos").val(),
							IDARTICULO:$("#selLibros").val(),
							FECHASALIDA:fechasola, 
							HORASALIDA:hora, 
							FECHAENTREGA:$("#laentrega").val(),
							HORAENTREGA:hora,
							CICLO:$("#elciclo").html(),
							ENTREGADO:"N",
							TIPO:"LIBROS",
							USUARIOSAL: usuario,
							FECHAUSSAL:fecha,
							_INSTITUCION: institucion, 
							_CAMPUS: campus	};
				$.ajax({
						type: "POST",
						url:"../base/inserta.php",
						data: parametros,
						success: function(data){ 
								cargarInformacion();
								$("#contLibro").empty();
								$("#selLibros").val("0");
								
							}
						});			
		}
		else {alert ("Debe seleccionar Alumno y Libro");}
				
	}



    function cargarInformacion(){
		$("#informacion").empty();
		mostrarEspera("esperaInf","grid_bib_prestamos","Cargando Datos...");
		elsql="SELECT * from vbib_prestamos where MATRICULA='"+$("#selAlumnos").val()+"' AND ENTREGADO='N' AND TIPO='LIBROS'"+
		"  ORDER BY ID";
	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){      
			  	if (JSON.parse(data).length>0) {			
					generaTablaInformacion(JSON.parse(data));   
					ocultarEspera("esperaInf");     
				  }
				else {ocultarEspera("esperaInf");  }	     		   
		}
		}); 					  		
}


function generaTablaInformacion(grid_data){
	c=0;

	script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"fontRoboto table table-condensed table-bordered table-hover\" "+
				" style=\"font-size:10px;\">";
	$("#informacion").empty();
	$("#informacion").append(script);
				
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");

	$("#tabInformacion").append("<thead><tr id=\"headMaterias\">"+
	"<th style=\"text-align: center;\">OP</th>"+ 
	"<th style=\"text-align: center;\">ID</th>"+ 
	"<th style=\"text-align: center;\">TITULO</th>"+ 
	"<th style=\"text-align: center;\">AUTOR</th>"+
	"<th style=\"text-align: center;\">FECHA_SALIDA</th>"+
	"<th style=\"text-align: center;\">FECHA_ENTREGA</th>"+
	"<th style=\"text-align: center;\">DIAS_RETRASO</th>"+
	"<th style=\"text-align: center;\">RENOVACIONES</th>"
	); 

	 $("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	
	 jQuery.each(grid_data, function(clave, valor) { 
		 icon="<i class=\"fa fa-times red\"></i>";
		 if (valor.DIASDIF>0) {icon="<i class=\"fa fa-check green\"></i>";}	
		 if (valor.DIASDIF==0) {icon="<i class=\"fa fa-retweet blue\"></i>";}	
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ID+"\">"); 
		 $("#row"+valor.ID).append("<i title=\"Eliminar el prestamos\" onclick=\"eliminar('"+valor.ID+"');\" class=\"ace-icon red fa fa-trash-o bigger-200\" style=\"cursor:pointer;\"></i>");
		 $("#row"+valor.ID).append("<td>"+valor.ID+"</td>");   	
		 $("#row"+valor.ID).append("<td>"+valor.TITULO+"</td>");    
		 $("#row"+valor.ID).append("<td>"+valor.AUTOR+"</td>");         	    
		 $("#row"+valor.ID).append("<td>"+valor.FECHASALIDA+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.FECHAENTREGA+"</td>");

		 $("#row"+valor.ID).append("<td>"+valor.DIASDIF+icon+"</td>");
		 $("#row"+valor.ID).append("<td>"+valor.RENOVACIONES+"</td>");
		 
		$("#row"+valor.ID).append("</tr>");
	 });
	$('#dlgproceso').modal("hide"); 
}	


function eliminar(id){
	if (confirm("¿Seguro que desea cancelar el prestamos de libro") ){
		parametros={
			tabla:"bib_prestamos",
			campollave:"ID",
			bd:"Mysql",
			valorllave:id
		};
		$.ajax({
			type: "POST",
			url:"../base/eliminar.php",
			data: parametros,
			success: function(data){
				cargarInformacion();
				
			}					     
		});    	 
	}        
}
