var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var laCarrera="";
var elalumno="";
var laconfig=[];


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 


		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");


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



	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selAlumnos') {
			$("#lacarrera").empty();
			$("#lafoto").empty();
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
				

				$("#lacarrera").append("<span class=\"label label-primary\">CARRERA </span><br><span>"+arr[0]["CARRERAD"]+"</span>");
				$("#lafoto").append("<span class=\"profile-picture\">"+
									"    <img id=\"img_FOTO\"  style=\"width:50px; height:50px;\"  "+
									"          class=\"editable img-responsive\" src=\""+lafoto+"\"/>"+
									"</span>");
				}
			});	
			cargarInformacion();		
		  }

	}  



    function cargarInformacion(){
		$("#informacion").empty();
		mostrarEspera("esperaInf","grid_bib_devoluciones","Cargando Datos...");
		elsql="SELECT * from vbib_prestamos a where MATRICULA='"+$("#selAlumnos").val()+"' AND ENTREGADO='N' AND TIPO='LIBROS'"+
		"  ORDER BY ID";

	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
				if (JSON.parse(data).length>0) {
					if (JSON.parse(data).length>0) {			
						generaTablaInformacion(JSON.parse(data));   
						ocultarEspera("esperaInf");     
					}
					else {ocultarEspera("esperaInf");  }	     	
				}
				else {
					$("#informacion").html("<div class=\"alert alert-danger\">No existen prestamos de este usuario</div>");
					ocultarEspera("esperaInf");
				}	   
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
		 if (valor.DIASDIF==0) {icon="<i class=\"fa fa-retweet blue\"></i>";}	
			 
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


function grabaDevolver(id,lamulta){
	fecha=dameFecha("FECHAHORA");
	fechaent=dameFecha("FECHAHORA",2);
	fechasola=dameFecha("FECHA");
	hora=dameFecha("HORA");
	parametros={tabla:"bib_prestamos",
					bd:"Mysql",
					campollave:"ID",
					valorllave:id,
					ENTREGADO:'S',
					FECHAENTREGO:fechasola,
					HORAENTREGO:hora,
					MULTA:lamulta,
					USUARIOENT: usuario,
					FECHAUSENT:fecha};
		$.ajax({
				type: "POST",
				url:"../base/actualiza.php",
				data: parametros,
				success: function(data){ 					 	
						cargarInformacion();
					}
				});		
}

function devolver(id,diasdif){
	lamulta=0;
	if (diasdif<0) {
		lamulta=Math.abs(diasdif)*laconfig[0]["MULTA"];
		if (confirm("El usuario debe pagar "+lamulta+" de multa ¿Ya lo pago?")) {
			grabaDevolver(id,lamulta);
		}
	}
	else {
		grabaDevolver(id,lamulta);
	}
		  
}
