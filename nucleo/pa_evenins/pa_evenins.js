var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		cargarInformacion();
		cargarInformacionHist();
	});
	
	
		

/*===========================================================POR MATERIAS ==============================================*/
function cargarInformacion(){

	mostrarEspera("esperaInf","grid_pa_evenins","Cargando Datos...");
	cadSql="select x.ID, x.FOTOACTIVIDAD, x.ENLACE, x.DESCRIPCION, x.FECHA, x.HORA, (select count(*) from eventos_ins where EVENTO=x.ID and PERSONA='"+usuario+"') as INSCRITO "+
	" from eeventos x, eeventosprin y, vepersonas z where "+
	" x.EVENTO=y.ID AND STR_TO_DATE(x.FECHA,'%d/%m/%Y')>=NOW() - INTERVAL 1 DAY	and x.TITULAR=z.ID and ABIERTOINS='S' order by STR_TO_DATE(x.FECHA,'%d/%m/%Y'), x.HORA";
	
	
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
		
		lafoto=valor.FOTOACTIVIDAD;
		if  (valor.FOTOACTIVIDAD=='') {lafoto="../../imagenes/menu/default.png";}
		$("#principal").append("<div  style=\"border-bottom:1px dotted; border-color:#14418A;\" "+
							   "      <div class=\"row\">"+
							   "        <div class=\"fontRobotoB col-sm-1\">"+
							   "                  <img class=\"ma_foto\" src=\""+lafoto+"\" />"+							   
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

	

	/*====================================================*//////////////

	function cargarInformacionHist(){

		mostrarEspera("esperaInf","grid_pa_evenins","Cargando Datos...");
		cadSql=" select * from `veventos_ins` a where a.PERSONA='"+usuario+"' order by ID DESC";
		
		parametros={sql:cadSql,dato:sessionStorage.co,bd:"Mysql"}
		$("#informacion").empty();		
		$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(data2){  
					generaTablaHis(JSON.parse(data2));   													
					ocultarEspera("esperaInf");  	
				}
			});
													
	}


	
function generaTablaHis(grid_data){	
	contAlum=1;
	$("#historial").empty();
	cont=1;
	jQuery.each(grid_data, function(clave, valor) { 

		laclase="badge badge-success";
		leyendaday="Días restan";
		
		etasistio="Asistió al evento";
		asistio="<i class=\"fa fa-check blue bigger-200\"></i>";
		if (valor.ASISTIO=='N') {etasistio="No se ha marcado como que asistió al evento"; asistio="<i class=\"fa fa-times red bigger-200\"></i>";}

		etconstancia="";constancia="";
		etautorizada="La constancia NO se ha autorizado"; 
		autorizada="<i class=\"fa fa-thumbs-o-up green bigger-200\"></i>";
		if (valor.AUTORIZADO=='S') {
			etautorizada="La constancia se encuentra autorizada"; 
			autorizada="<i class=\"fa fa-thumbs-o-down red bigger-200\"></i>";
			etconstancia="Descargue su constancia de participación";
			constancia="<button class=\"btn btn-white btn-info btn-bold\" onclick=\"verConstancia("+valor.ID+");\">"+
			                "<i class=\"ace-icon fa fa-check-square-o bigger-120 blue\"></i>Ver Constancia</button>";
		}
		lafecha=fechaLetra(valor.FECHA);

		lafoto=valor.FOTOACTIVIDAD;
		if  (valor.FOTOACTIVIDAD=='') {lafoto="../../imagenes/menu/default.png";}

		$("#historial").append("<div style=\"border-bottom:1px dotted; border-color:#14418A;\"> "+
							   "      <div class=\"row\" >"+
							   "        <div class=\"fontRobotoB col-sm-1\">"+
							   "                  <img  class=\"ma_foto\" src=\""+lafoto+"\"/>"+							   
							   "         </div>"+
							   "         <div class=\"fontRobotoB col-sm-6 bigger-80 text-success\">"+
							   "             <span class=\"fontRoboto bigger-150 text-primary\">"+valor.EVENTOD+"</span>"+"<br>"+
							   "             <span title=\"Fecha en la que se llevará acabo el evento\" class=\"badge badge-success fontRoboto bigger-50 \">"+lafecha+"</span><br>"+
							   "             <span title=\"Hora en la que se realizará el evento\"  class=\"badge badge-warning fontRoboto bigger-50 \">"+valor.HORA+"</span><br>"+
							   "             <a href=\""+valor.ENLACE+"\" target=\"_blank\"><span class=\"fontRoboto bigger-100 \">"+valor.ENLACE+"</span></a><br>"+
							   "         </div>"+
							   "         <div class=\"col-sm-1\" title=\""+etasistio+"\">"+asistio+"</div>"+	
							   "         <div class=\"col-sm-1\" title=\""+etautorizada+"\">"+autorizada+"</div>"+
							   "         <div class=\"col-sm-1\" title=\""+etconstancia+"\">"+constancia+"</div>"+							   
							   "     </div>"+
							   "</div><br>");
		contAlum++;     
	});	
} 
	
	
function verConstancia(id){		
	enlace=("nucleo/eventos_ins/constancia.php?id="+id+"&tipo=1");
	abrirPesta(enlace,"Constancia");
}