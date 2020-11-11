var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
	

		$("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");		
		addSELECT("selSecciones","lascarreras","PROPIO", "SELECT ID, SECCION FROM bib_secciones ", "",""); 
		
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
	lapal="";

	$("#informacion").empty();
	$("#informacion").append(script);
	
	lascarr="";
    if ($("#selSecciones").val()!="0") { lascarr=" AND SECCION='"+$("#selSecciones").val()+"'";}
	lapal=$("#palabra").val().toUpperCase();
	cad="";
	if (lapal!='') { cad=" and (AUTOR LIKE '%"+lapal+"%' or TITULO LIKE '%"+lapal+"%')";}
	elsql="select * from vbib_ejemplares where  TIPO='LIBROS'  AND ACCESIBLE=3 "+lascarr+cad+" order by IDFICHA";


	mostrarEspera("esperahor","grid_bib_consultas","Cargando Datos...");
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
$("#contenido").empty();
$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");

jQuery.each(grid_data, function(clave, valor) { 
	lafoto=valor.FOTO_LIBRO;
	if ((valor.FOTO_LIBRO ==null) ||(valor.FOTO_LIBRO =="")){lafoto="../../imagenes/menu/default.png";} 
	
    $("#contenido").append(		
		"	<div class=\"itemdiv memberdiv\" id=\""+valor.ID+"\">"+
		"		<div class=\"ma_principal\">"+		
		"				<a href=\"#\"><img src=\""+lafoto+"\" class=\"ma_foto\"  /></a><br/>"+		
		"			<div class=\"body\">"+
		"				<div class=\"name fontRoboto\">"+
		"					<a href=\"#\">"+
		"                   <span class=\"elname\" mipadre=\""+valor.ID+"\">"+valor.TITULO+
		"							<span class=\"hidden\">"+valor.AUTOR+"</span></span></a>"+
		"			</div>"+
		"		</div>"+
		"		<div class=\"popover ma_popover\">"+
		"			<div class=\"arrow\"></div>"+
		"			<div class=\"popover-content\">"+
		"				<div class=\"bolder\">"+valor.TITULO+"</div>"+
		"					<div class=\"time\"><i class=\"ace-icon fa fa-user middle bigger-120 orange\"></i><span class=\"green\">"+valor.AUTOR+"</span></div>"+
		"					<div class=\"time\"><i class=\"ace-icon fa fa-columns  middle bigger-120 purple\"></i><span class=\"blue\"> ANAQUEL: "+valor.ANAQUEL+"</span></div>"+
		"					<div class=\"hr dotted hr-8\"></div>"+
		"					<div class=\"tools action-buttons\">"+
		"						<a title=\"Ver Avance Curricular\" onclick=\"reservar('"+valor.ID+"');\" style=\"cursor:pointer;\">"+
		"                            <i class=\"ace-icon fa fa-bar-chart-o blue bigger-150\"></i>"+
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
