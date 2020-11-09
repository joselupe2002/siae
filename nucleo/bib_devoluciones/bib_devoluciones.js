var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var elalumno="";


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 


		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");


		$("#losalumnos").append("<span class=\"label label-primary\">No. de Control</span>");
		addSELECT("selAlumnos","losalumnos","PROPIO", "SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) "+
		" FROM falumnos WHERE ALUM_ACTIVO IN (1) ORDER BY ALUM_MATRICULA", "","BUSQUEDA");  	

		$("#loslibros").append("<span class=\"label label-primary\">No. de Ejemplar</span>");
		addSELECT("selLibros","loslibros","PROPIO", "SELECT ID, CONCAT(ID,' ',TITULO) FROM vbib_ejemplares where ACCESIBLE=3", "","BUSQUEDA");  			
		
		colocarCiclo("elciclo","CLAVE");
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selAlumnos') {
			$("#lacarrera").empty();
			$("#lafoto").empty();
			elsql="SELECT ALUM_MATRICULA,CARR_DESCRIP, ALUM_CORREOINS, ALUM_TELEFONO, ifnull(ALUM_FOTO,'') as ALUM_FOTO, "+
			" (SELECT COUNT(*) from dlista where PDOCVE=getciclo() and ALUCTR='"+$('#selAlumnos').val()+"') AS INSCRITO"+
			"  FROM falumnos a, ccarreras b where ALUM_CARRERAREG=CARR_CLAVE AND ALUM_MATRICULA='"+$('#selAlumnos').val()+"'";
		

			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){   
				arr=JSON.parse(data);
				elcolor="red";
				if (arr[0]["INSCRITO"]>0) {elcolor="green";}
				lafoto=arr[0]["ALUM_FOTO"];
				if (lafoto=='') {lafoto="../../imagenes/menu/default.png";}
				

				$("#lacarrera").append("<span class=\"label label-primary\">CARRERA </span><br><span>"+arr[0]["CARR_DESCRIP"]+"</span>");
				$("#lafoto").append("<span class=\"profile-picture\">"+
									"    <img id=\"img_ALUM_FOTO\"  style=\"width:50px; height:50px;\"  "+
									"          class=\"editable img-responsive\" src=\""+lafoto+"\"/>"+
									"</span>");
				}
			});	
			cargarInformacion();		
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
		mostrarEspera("esperaInf","grid_bib_devoluciones","Cargando Datos...");
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
				" style=\"font-size:12px;\">";
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
			 
		 $("#cuerpoInformacion").append("<tr id=\"row"+valor.ID+"\">"); 
		 $("#row"+valor.ID).append("<i title=\"Devolver el Libro\" onclick=\"devolver('"+valor.ID+"','"+valor.DIASDIF+"');\" class=\"ace-icon blue fa fa-retweet bigger-200\" style=\"cursor:pointer;\"></i>");
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


function devolver(id){
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
