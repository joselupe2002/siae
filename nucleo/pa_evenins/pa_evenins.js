var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		cargarInformacion();
	});
	
	
		

/*===========================================================POR MATERIAS ==============================================*/
function cargarInformacion(){

	mostrarEspera("esperaInf","grid_avisos","Cargando Datos...");
	cadSql="select x.ID, x.FOTOACTIVIDAD, x.ENLACE, x.DESCRIPCION, x.FECHA, x.HORA, (select count(*) from eventos_ins where EVENTO=x.ID and PERSONA='"+usuario+"') as INSCRITO "+
	" from eeventos x, eeventosprin y, vepersonas z where "+
	" x.EVENTO=y.ID AND STR_TO_DATE(x.FECHA,'%d/%m/%Y')>now() and x.TITULAR=z.ID order by STR_TO_DATE(x.FECHA,'%d/%m/%Y'), x.HORA";
	
	
	parametros={sql:cadSql,dato:sessionStorage.co,bd:"Mysql"}
	$("#informacion").empty();		
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data2){  
				generaTabla(JSON.parse(data2));   													
				ocultarEspera("esperaInf");  	

			}
		});
				  					  		
}

function generaTabla(grid_data){	
	contAlum=1;
	$("#principal").empty();
	cont=1;
	jQuery.each(grid_data, function(clave, valor) { 

		laclase="badge badge-success";
		leyendaday="Días restan";
		
		elbtn="<button onclick=\"inscribir('"+valor.ID+"');\" "+			
		"class=\"btn btn-primary\"><i class=\"ace-icon fa fa-thumbs-up bigger-120\"></i> Inscribirme</button>";
		if (valor.INSCRITO>0) {elbtn="<span class=\"badge badge-primary fontRobotoB bigger-130 text-primary\"><i class=\"fa fa-check white\">Inscrito</span>"+"<br>";}
		lafecha=fechaLetra(valor.FECHA);
		$("#principal").append("<div  class=\"profile-activity clearfix\"> "+
							   "      <div class=\"row\">"+
							   "        <div class=\"fontRobotoB col-sm-1\">"+
							   "                  <img  src=\""+valor.FOTOACTIVIDAD+"\"/>"+							   
							   "         </div>"+
							   "         <div class=\"fontRobotoB col-sm-8 bigger-80 text-success\">"+
							   "             <span class=\"fontRoboto bigger-150 text-primary\">"+valor.DESCRIPCION+"</span>"+"<br>"+
							   "             <span title=\"Fecha en la que se llevará acabo el evento\" class=\"badge badge-success fontRoboto bigger-50 \">"+lafecha+"</span><br>"+
							   "             <span title=\"Hora en la que se realizará el evento\"  class=\"badge badge-warning fontRoboto bigger-50 \">"+valor.HORA+"</span><br>"+
							   "             <a href=\""+valor.ENLACE+"\" target=\"_blank\"><span class=\"fontRoboto bigger-100 \">"+valor.ENLACE+"</span></a><br>"+
							   "         </div>"+
							   "         <div class=\"col-sm-2\">"+elbtn+
							   "         </div>"+							   
							   "     </div>"+
							   "</div>");
		contAlum++;     
	});	
} 



function inscribir(id){

		 var losdatos=[];
		 var f = new Date();
		 lafecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
		
		 parametros={
				 tabla:"eventos_ins",		
				 bd:"Mysql",	
				 PERSONA:usuario,
				 EVENTO:id,
				 FECHAUS:lafecha,	
				 TIPO:"ASISTENTE",	
				 USUARIO:usuario,
				 _INSTITUCION:institucion,
				 _CAMPUS:campus	 			 
				};
	
		 $.ajax({
			 type: "POST",
			 url:"../base/inserta.php",
			 data: parametros,
			 success: function(data){		                                	                      
				 if (!(data.substring(0,1)=="0"))	
						 { 						                  
							cargarInformacion();
						  }	
				 else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
			 }					     
		 });      
	}

	