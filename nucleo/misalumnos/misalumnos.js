var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
	

		$("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		 
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+")", "",""); 
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });
		
		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, concat(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by cicl_clave desc", "","");  			      
	

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
	script="";

	   $("#informacion").empty();
	   $("#informacion").append(script);
			
	elsql="select DISTINCT(ALUM_MATRICULA), ALUM_NOMBRE, ALUM_APEPAT, ALUM_APEMAT, ALUM_MAPA, ALUM_ACTIVO, "+
	"ALUM_FOTO, CARR_DESCRIP"+
	" from falumnos a, ccarreras c where ALUM_CARRERAREG=CARR_CLAVE "+
	" AND ALUM_MATRICULA IN (SELECT ALUCTR FROm dlista where PDOCVE='"+$("#selCiclos").val()+"')"+
	" and ALUM_CARRERAREG='"+$("#selCarreras").val()+"' ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE";


	mostrarEspera("esperahor","grid_resEvalDoc","Cargando Datos...");
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

jQuery.each(grid_data, function(clave, valor) { 
	lafoto=valor.ALUM_FOTO;
	if ((valor.ALUM_FOTO ==null) ||(valor.ALUM_FOTO =="")){lafoto="../../imagenes/menu/default.png";} 
	
	activo="red";
	if (valor.ALUM_ACTIVO==1) {activo="green"}
    $("#contenido").append(		
		"	<div class=\"itemdiv memberdiv\" id=\""+valor.ALUM_MATRICULA+"\">"+
		"		<div class=\"ma_principal\">"+		
		"				<a href=\"#\"><img src=\""+lafoto+"\" class=\"ma_foto\"  /></a><br/>"+		
		"			<div class=\"body\">"+
		"				<div class=\"name fontRoboto\">"+
		"					<a href=\"#\"><i class=\"fa "+activo+" fa-circle \"></i> "+
		"                   <span class=\"elname\" mipadre=\""+valor.ALUM_MATRICULA+"\">"+valor.ALUM_MATRICULA+" "+valor.ALUM_APEPAT+" "+valor.ALUM_APEMAT+" "+valor.ALUM_NOMBRE+"</span></a>"+
		"			</div>"+
		"		</div>"+
		"		<div class=\"popover ma_popover\">"+
		"			<div class=\"arrow\"></div>"+
		"			<div class=\"popover-content\">"+
		"				<div class=\"bolder\">"+valor.ALUM_APEPAT+" "+valor.ALUM_APEMAT+" "+valor.ALUM_NOMBRE+"</div>"+
		"					<div class=\"time\"><i class=\"ace-icon fa fa-road middle bigger-120 orange\"></i><span class=\"green\">"+valor.CARR_DESCRIP+"</span></div>"+
		"					<div class=\"hr dotted hr-8\"></div>"+
		"					<div class=\"tools action-buttons\">"+
		"						<a title=\"Ver Avance Curricular\" onclick=\"verAvanceAlum('"+valor.ALUM_MATRICULA+"');\" style=\"cursor:pointer;\">"+
		"                            <i class=\"ace-icon fa fa-bar-chart-o blue bigger-150\"></i>"+
		"                       </a>"+
		"						<a title=\"Ver Kardex\" onclick=\"verKardex('"+valor.ALUM_MATRICULA+"');\" style=\"cursor:pointer;\">"+
		"                            <i class=\"ace-icon fa fa-file-text-o green bigger-150\"></i>"+
		"                       </a>"+
		"						<a title=\"Ver Calificaciones del ciclo actual\" onclick=\"verCalifCiclo('"+valor.ALUM_MATRICULA+"','"+valor.ALUM_APEPAT+" "+valor.ALUM_APEMAT+" "+valor.ALUM_NOMBRE+"');\" style=\"cursor:pointer;\">"+
		"                            <i class=\"ace-icon fa fa-list-alt pink bigger-150\"></i>"+
		"                       </a>"+
		"						<a title=\"Horario de clases\" onclick=\"verHorario('"+valor.ALUM_MATRICULA+"','"+valor.ALUM_APEPAT+" "+valor.ALUM_APEMAT+" "+valor.ALUM_NOMBRE+"');\" style=\"cursor:pointer;\">"+
		"                            <i class=\"ace-icon fa fa-calendar red bigger-150\"></i>"+
		"                       </a>"+
		"						<a title=\"Actividades Complementarias\" onclick=\"verActCom('"+valor.ALUM_MATRICULA+"','"+valor.ALUM_APEPAT+" "+valor.ALUM_APEMAT+" "+valor.ALUM_NOMBRE+"');\" style=\"cursor:pointer;\">"+
		"                            <i class=\"ace-icon fa fa-thumb-tack yellow bigger-150\"></i>"+
		"                       </a>"+
		"					</div>"+
		"				</div>"+
		"			</div>"+
		"		</div>"+
		"	</div>");
		
	contAlum++;     
	
	$('.memberdiv').on('mouseenter touchstart', function(){
			
		var $this = $(this);
		var $parent = $this.closest('.tab-pane');

		var off1 = $parent.offset();
		var w1 = $parent.width();

		var off2 = $this.offset();
		var w2 = $this.width();

		var place = 'left';
		if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) place = 'right';
		
		$this.find('.popover').removeClass('right left').addClass(place);
	}).on('click', function(e) {
		e.preventDefault();
	});


});	
} 


function verKardex(matricula){
	enlace="nucleo/avancecurri/kardex.php?matricula="+matricula;
	abrirPesta(enlace,"Kardex");
}

function verAvanceAlum(matricula){
   enlace="nucleo/avancecurri/grid.php?matricula="+matricula;
   abrirPesta(enlace,"06) Avance Curricular");
}


function verCalifCiclo(matricula,nombre){
	enlace="nucleo/tu_caltutorados/grid.php?matricula="+matricula+"&nombre="+nombre;
	abrirPesta(enlace,"Calif. Ciclo");
 }

 function verHorario(matricula,nombre){
	enlace="nucleo/pa_mihorario/grid.php?matricula="+matricula+"&nombre="+nombre+"&ciclo="+$("#selCiclos").val();
	abrirPesta(enlace,"Horario");
 }


 function verActCom(matricula,nombre){
	enlace="nucleo/pa_inscompl/grid.php?matricula="+matricula+"&nombre="+nombre+"&ciclo="+$("#selCiclos").val();
	abrirPesta(enlace,"Complementarias");
 }


function filtrarMenu() {

	var input = $('#filtrar').val();
	var filter = input.toUpperCase();
	var contenidoMenu="";
	
	if (filter.length == 0) { // show all if filter is empty	
			$(".itemdiv").removeClass("hide");
		return;
	} else {														

		$(".itemdiv").addClass("hide");
		$(' .elname:contains("' + filter + '")').each(function() {				
		   $("#"+$(this).attr("mipadre")).removeClass("hide");
		});
		
	}
}
