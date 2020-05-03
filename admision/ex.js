var elciclo="";

    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		$(document).bind("contextmenu",function(e){return false;});

		window.location.hash="red";
	    window.location.hash="Red" //chrome
		window.onhashchange=function(){window.location.hash="red";}
	
		cargarFoto();
		cargarExamenes();
		}); 



function cargarFoto(){
	sql="select RUTA from adjaspirantes  b where b.AUX='FOTO"+curp+"'";
	$.ajax({
		type: "POST",
		url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(sql),
		success: function (dataExa) {
			laruta="";
			jQuery.each(JSON.parse(dataExa), function(clave, valor) { 
				laruta=valor.RUTA;
			});
		if (!(laruta=='')) {$("#fotoAsp").attr("src",laruta);}
		else{$("#fotoAsp").attr("src","../imagenes/menu/default.png");}
		}
	});

}


	function cargarExamenes(){
        $("#contenidoAsp").append("<h3 class=\"fontAmaranthB header smaller lighter text-success\"><strong>Examenes que debes aplicar</strong></h3>"+
		                          "      <div  class=\"table-responsive\">"+
								  "           <table id=tabExamenes class= \"display table-condensed table-striped table-sm "+
								  "                  table-bordered table-hover nowrap \" style=\"overflow-y: auto;\">"+
								  "               <thead>  "+
								  "                    <tr style=\"background-color: #9F5906; color: white;\">"+
								  "                         <th style=\"text-align: center;\">ID</th> "+
								  "	  						<th style=\"text-align: center;\">Exámen</th>"+
								  "							<th style=\"text-align: center;\">Tiempo</th> "+
								  "	                        <th style=\"text-align: center;\">Minutos</th> "+
								  "               	        <th style=\"text-align: center;\">Fecha de Aplicación</th> "+                                    
								  "	                        <th style=\"text-align: center;\">Hora</th>  	"+			       
								  "	                        <th style=\"text-align: center;\">Aplicar</th> 	"+				        
								  "                    </tr> "+
								  "                <tbody id=\"tabExamBody\"> </tbody>"+
								  "      </div>");
		sq="select h.*, (SELECT count(*) FROM lincontestar where IDEXAMEN=h.IDEXAMEN and IDPRESENTA='"+curp+"' and TERMINADO='S') as N "+
		    " from vlinaplex h where  STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') "+
			" Between STR_TO_DATE(h.`INICIA`,'%d/%m/%Y') and STR_TO_DATE(h.`TERMINA`,'%d/%m/%Y') and tipo='ASPIRANTES'";

		$.ajax({
			type: "POST",
			url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(sq),
			success: function (dataExa) {
				jQuery.each(JSON.parse(dataExa), function(clave, valor) { 	
					cadLinea="<tr>"+
					            "<td class=\"fontAmaranthB bigger-130\">"+valor.IDEXAMEN+"</td>"+
								"<td class=\"fontAmaranthB bigger-130\">"+valor.EXAMEND+"</td>"+
								"<td class=\"fontAmaranthB bigger-130\">"+valor.CONTIEMPO+"</td>"+
								"<td class=\"fontAmaranthB bigger-130\">"+valor.MINUTOS+"</td>";
					if (valor.INICIA==valor.TERMINA) {                                            
						cadLinea+="<td class=\"fontAmaranthB bigger-130\">"+valor.INICIA+"</td>";
					}
					else {
						cadLinea+="<td class=\"fontAmaranthB bigger-130\">"+valor.INICIA+"-"+valor.TERMINA+"</td>";
					}
					if (!(valor.HORAINICIO=="")){ 
						cadHora=valor.HORAINICIO;
						cadLinea+="<td class=\"fontAmaranthB bigger-130\">"+valor.HORAINICIO+"</td>";				
					}
					else {
						cadHora="LIBRE";
						cadLinea+="<td class=\"fontAmaranthB bigger-130\">LIBRE</td>";
					}

					if (valor.N==0) {						
						cadLinea+="<td style= \"text-align: center;\" > "+
						           "<a  onclick=\"verExamen('"+valor.IDEXAMEN+"','"+curp+"','"+valor.CONTIEMPO+"','"+valor.MINUTOS+"','"+cadHora+"');\" title=\"Aplicar Examen\""+
						                "class=\"btn btn-white btn-waarning btn-bold\">"+
										"<i class=\"ace-icon fa fa-pencil-square bigger-160 green \"></i>"+	
									"</a></td>";
					}
					else {
						cadLinea+="<td style= \"text-align: center;\" ><span class=\"label label-danger "+
						               "label-white middle\">Examen resuelto Gracias!</span></td>";
					}

					$("#tabExamBody").append(cadLinea);
				}); 		
			}
		});
		$("#contenidoAsp").append("<div class='space-7'></div>"+
			                      "   <div class=\"row\">"+
				                  "        <div class=\"col-sm-12 text-center\">"+
								  "              <span class=\"fontAmaranthB text-danger bigger-130\">"+
								  "                    <strong>INFORMACIÓN IMPORTANTE</strong>"+
								  "              </span>"+ 
				                  "        </div>"+
			                      "   </div>"+
			                      "   <div class=\"row\"> "+
				                  "        <div class=\"col-sm-12\">"+
								  "             <span class=\"fontAmaranthB text-light bigger-120\">"+
								  "                   Antes de iniciar tu proceso de pre-inscripción es necesario que "+
								  "                   tomes en cuente la documentación que debes tener a la mano para que sea más ágil tu registro. "+
								  "             </span> "+
								  "        </div>"+
								  "   </div>"
								  );



	}

		
function mandaExamen(idexa, fechaini,horaini){
	sq="SELECT ifnull(IDCON,0) as IDCON,count(*) as N FROM lincontestar WHERE IDEXAMEN="+idexa+" and IDPRESENTA='"+curp+"'";
	$.ajax({
		type: "POST",
		url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(sq),
		success: function (dataCon) {	
	        idcon=0;  encontre=false;
			jQuery.each(JSON.parse(dataCon), function(clave, valorCon) { 
				if (valorCon.N>0) {encontre=true;}
			});  

			if (!(encontre)) {
				parametros={tabla:"lincontestar",
			                 bd:"Mysql",
			                 _INSTITUCION:"ITSM",
							 _CAMPUS:"0",
							 IDEXAMEN:idexa,
							 IDPRESENTA:curp,
							 FECHAINICIA:fechaini,
							 INICIO:horaini};         
			    $.ajax({
			 		  type: "POST",
			 		  url:"../nucleo/base/inserta.php",
			 	      data: parametros,
			 	      success: function(data){ 
						   alert ("cargare");
                            cargandoExamen(idexa);
					   }
					});
			}

		}
	});
}



function cargandoExamen(idexa){
	$("#contenidoAsp").empty();
	var cad="";
	sq="SELECT * from vlinpreguntas WHERE IDEXAMEN="+idexa+" order by IDSECCION,ORDEN" ;

	cad="<div class=\"widget-box\">"+
	       "<div class=\"widget-body\">"+
		        "<div class=\"widget-main\">"+
			        "<div id=\"fuelux-wizard-container\"><div>"+
						"<ul id=\"itempreg\" class=\"steps\">"+
					"</div>"+
				"</div>"+
			"</div>"+
		"</div>";
	$("#contenidoAsp").append(cad);


	$.ajax({
		type: "POST",
		url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(sq),
		success: function (dataPre) {	
			jQuery.each(JSON.parse(dataCon), function(clave, valorCon) { 
				
			}); 

			$("#contenidoAsp").append(cad);
		}
	});

}

function verExamen(id,curp,contiempo,minutos,horaInicia) {
	var minAct=0;
	$.ajax({
		type: "POST",
		url:  "../nucleo/base/getFechaHora.php",
		success: function (dataFecha) {			
			   horaAct=dataFecha.split("|")[0];
			   fechaAct=dataFecha.split("|")[1];
			   minAct=parseInt(horaAct.split(":")[0])*60 + parseInt(horaAct.split(":")[1]);
			   minIni=0;
			   if (!(horaInicia=='LIBRE')) {
				   minIni=parseInt(horaInicia.split(":")[0])*60+parseInt(horaInicia.split(":")[1]);
			    }
			
			   if (!(contiempo=='S')) { }
		
			   if (minAct<minIni) { alert ("El examen comienza a las "+horaInicia+" La hora en el servidor es: "+horaAct+" Aun falta para iniciar"); return 0;}
			   if ((minAct>=(parseInt(minIni)+parseInt(minutos))) && (contiempo=='S')) {alert ("El tiempo para iniciar el examen se ha concluido"); return 0;}
			   mandaExamen(id,fechaAct,horaAct);		   
			}
	});
}
	