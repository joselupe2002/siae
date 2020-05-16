var elciclo="";
var pregactiva=0;
var contPreg=1;	
var elexamen;
var arr_nombresec=[];
var arr_instsec=[];
var arr_instpreg=[];


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
		$("#contenidoAsp").empty();
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
			" Between STR_TO_DATE(h.`INICIA`,'%d/%m/%Y') and STR_TO_DATE(h.`TERMINA`,'%d/%m/%Y') and tipo='ASPIRANTES'"+
			" and ifnull(CARRERA,'"+carrera+"')='"+carrera+"'";

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

		
function mandaExamen(idexa, fechaini,horaini,contiempo,minutos,horaInicia,minIni,minAct){
    fechareal=""; horareal="";
	sq="SELECT ifnull(IDCON,0) as IDCON,FECHAINICIA, INICIO, count(*) as N FROM lincontestar WHERE IDEXAMEN="+idexa+" and IDPRESENTA='"+curp+"'";
	$.ajax({
		type: "POST",
		url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(sq),
		success: function (dataCon) {	
	        idcon=0;  encontre=false;
			jQuery.each(JSON.parse(dataCon), function(clave, valorCon) { 
				if (valorCon.N>0) {encontre=true;}
				fechareal=valorCon.FECHAINICIA;
				horareal=valorCon.INICIO;
			});  

			if (!(encontre)) {
				fechareal=fechaini;
				horareal=horaini;
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
					   }
					});

				
			}
			cargandoExamen(idexa, fechaini,horaini,fechareal,horareal);

			if (contiempo=='S') {
				mininireal=parseInt(horareal.split(":")[0])*60+parseInt(horareal.split(":")[1]);
				debeterminar=parseInt(minutos)+parseInt(mininireal);
				leresta=parseInt(debeterminar)-parseInt(minAct);
				$("#contminrestantes").html(leresta);
				cronometrar(debeterminar);
			}
			else {$("#contminrestantes").html("libre");}
			
		}
	});
}


function cronometrar(debeterminar){
	debeterminar--;
    id = setInterval(function() { escribir(debeterminar) },60000);
}

function escribir(debeterminar){
	$.ajax({
		type: "POST",
		url:  "../nucleo/base/getFechaHora.php",
		success: function (dataFecha) {	
			   horaAct=dataFecha.split("|")[0];
			   minAct=parseInt(horaAct.split(":")[0])*60 + parseInt(horaAct.split(":")[1]);
			   leresta=parseInt(debeterminar-minAct);
			   $("#contminrestantes").html(leresta);
			   if (leresta==5) {mostrarIfo("infoResta", "grid_registro", "Tiempo se agota",
			   "<span class=\"lead text-danger\"><strong>Le informamos que le quedan "+leresta+" Minuros para terminar su examen</strong></span>","modal-lg");}
			   if (leresta<=0) {
				   cierraExamen();
			   }
			}
	});
}

function cierraExamen(){
	var hoy= new Date();
	lahora=hoy.getHours()+":"+hoy.getMinutes();
	lafecha=hoy.getDay()+"/"+hoy.getMonth()+"/"+hoy.getFullYear();
	parametros={
		tabla:"lincontestar",
		bd:"Mysql",
		campollave:"concat(IDEXAMEN,IDPRESENTA)",
		valorllave:elexamen+curp,		
			TERMINADO:"S",
			FECHATERMINA:lafecha,
			TERMINO:lahora,
			MINUTOS:$("#contminrestantes").html(),
	};
	$.ajax({
		type: "POST",
		url:"../nucleo/base/actualiza.php",
		data: parametros,
		success: function(data){     
			$('#dlgcierraExamen').modal("hide");	   			        	
			cargarExamenes();	
						 
		}					     
	}); 

}


function cargandoExamen(idexa,fechaini,horaini,fechareal,horareal){
	$("#contenidoAsp").empty();
	var cad="";
	sq="SELECT * from vlinpreguntas WHERE IDEXAMEN="+idexa+" order by IDSECCION,ORDEN, IDPREG" ;
	cad="<div class=\"widget-box widget-color-blue\" style=\"width:100%;\"  >"+
		   "<div class=\"widget-header widget-header-small\">"+
		   "   <div class=\"row\">"+
		   "     <div class=\"col-sm-1\">"+"<span class=\"fontAmaranth text-white\">Apertura: </span>"+
		   "     </div>" +
		   "     <div class=\"col-sm-2\">"+"<span class=\"fontAmaranth\">"+fechareal+"</span>  <span class=\"fontAmaranth\">"+horareal+"</span>"+
		   "     </div>" +
		   "     <div class=\"col-sm-9\">"+"<span class=\"fontAmaranth pull-right\">Minutos Restantes:</span> <span id=\"contminrestantes\" class=\"pull-right fontAmaranth badge badge-success\"></span>"+
		   "     </div>" +
		   "   </div>"+   
		   "   <div class=\"row\">"+
		   "     <div class=\"col-sm-1\">"+"<span class=\"fontAmaranth text-white\">Última: </span>"+
		   "     </div>" +
		   "     <div class=\"col-sm-2\">"+"<span class=\"fontAmaranth\">"+fechaini+"</span>  <span class=\"fontAmaranth\">"+horaini+"</span>"+
		   "     </div>" +
		   "   </div>"+  
	       "</div>"+
		   "<div class=\"widget-body\" style=\"padding:10px;\">"+
				  "<div id=\"itempreg\"></div>"+
				  "<hr/>"+
			      "<div id=\"contpreg\"></div>"+					    			
			"</div>"+
			"<div class=\"widget-header\" style=\"padding:10px;\">"+
				"<button class=\"btn btn-white btn-success btn-bold pull-right\" onclick=\"aparecer(pregactiva,1);\">"+
				"<i class=\"ace-icon fa fa-arrow-right bigger-120 blue\"></i><span id=\"etavanzar\" >Sig</span></button>"+
				"<button  class=\"btn btn-white btn-danger btn-bold pull-right\" onclick=\"aparecer(pregactiva,-1);\">"+
				"<i class=\"ace-icon fa fa-arrow-left bigger-120 red\"></i><span>Atras</span></button>"+
			"</div>"+
		"</div>";
	$("#contenidoAsp").append(cad);

	$.ajax({
		type: "POST",
		url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(sq),
		success: function (dataPre) {		
		    jQuery.each(JSON.parse(dataPre), function(clave, valorPre) { 
				arr_nombresec[clave]=valorPre.SECCIOND;
				arr_instsec[clave]=valorPre.INSTRUCCIONES;
				arr_instpreg[clave]=valorPre.INSTRUCCIONESPREG;
		

			    hide="hide"; color="badge badge-gray";
				if (contPreg==1){ hide=""; pregactiva=1; color="badge badge-yellow";}
				$("#itempreg").append("<span id=\"elitem"+contPreg+"\" idPreg=\""+valorPre.IDPREG+"\" style=\"cursor:pointer;width:30px;\" class=\"itemPreg "+color+"\" "+
									  "onclick=\"aparecer('"+contPreg+"',0)\" >"+contPreg+"</span>");
				            cadPreg=  "<div id=\"laPregunta"+contPreg+"\" class=\""+hide+"\">"+
									  "   <div class\"row\">"+
									  "      <span class=\"fontAmaranthB\" style=\"font-size:18px;\">"+valorPre.PREGUNTA+"</span>"+
									  "   </div>"+
									  "   <div class=\"row\">";
							if (!((valorPre.RESPUESTA1=='')||(valorPre.RESPUESTA1==null))) {							
							 cadPreg+="       <div class=\"col-sm-3\">"+
									  "             <div class=\"radio\"><label><input onchange=\"cambioRespuesta('"+valorPre.IDPREG+"','"+contPreg+"','1','"+valorPre.PUNTAJE+"','"+idexa+"')\" idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_1\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
									  "                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA1+"</span></label>"+
									  "             </div>"+
									  "       </div>";
							}
							if (!((valorPre.RESPUESTA2=='')||(valorPre.RESPUESTA2==null))) {							
							 cadPreg+="      <div class=\"col-sm-3\">"+
									  "             <div class=\"radio\"><label><input onchange=\"cambioRespuesta('"+valorPre.IDPREG+"','"+contPreg+"','2','"+valorPre.PUNTAJE+"','"+idexa+"')\" idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_2\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
									  "                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA2+"</span></label>"+
									  "             </div>"+
									  "       </div>";
							}
							if (!((valorPre.RESPUESTA3=='')||(valorPre.RESPUESTA3==null))) {							
							 cadPreg+="       <div class=\"col-sm-3\">"+
									  "             <div class=\"radio\"><label><input onchange=\"cambioRespuesta('"+valorPre.IDPREG+"','"+contPreg+"','3','"+valorPre.PUNTAJE+"','"+idexa+"')\" idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_3\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
									  "                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA3+"</span></label>"+
									  "             </div>"+
									  "       </div>";
							}
							if (!((valorPre.RESPUESTA4=='')||(valorPre.RESPUESTA4==null))) {							
							 cadPreg+="      <div class=\"col-sm-3\">"+
									  "             <div class=\"radio\"><label><input onchange=\"cambioRespuesta('"+valorPre.IDPREG+"','"+contPreg+"','4','"+valorPre.PUNTAJE+"','"+idexa+"')\" idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_4\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
									  "                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA4+"</span></label>"+
									  "             </div>"+
									  "       </div>";
							}
							cadPreg+="      </div>"+
									  "</div>";
				$("#contpreg").append(cadPreg);
				contPreg++;
			}); 


			sqRes="SELECT * from linrespuestas WHERE IDEXAMEN="+idexa+" and IDPRESENTA='"+curp+"'" ;
			$.ajax({
				type: "POST",
				url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(sqRes),
				success: function (dataRes) {	
					jQuery.each(JSON.parse(dataRes), function(clave, valorRes) {						  
						   $("#opcion_"+valorRes.IDPREGUNTA+"_"+valorRes.RESPUESTA).attr('checked', true);
						   $(".itemPreg[idPreg='"+valorRes.IDPREGUNTA+"']").addClass("badge-primary");
						   $(".itemPreg[idPreg='"+valorRes.IDPREGUNTA+"']").removeClass("badge-gray");
					});
				}
			});

			colocarSeccion(0);


		}
	});
}



function colocarSeccion(item){
	cad="<span class=\"fontAmaranthB bigger-100 label label-danger label-white middle\"> SECCIÓN: "+arr_nombresec[item]+"</span><br/>";
	if (arr_instsec[item].length>0) {
		cad+="<span class=\"fontAmaranthB bigger-100 label label-success label-white middle\"> INSTRUCCIÓN: "+arr_instsec[item]+"</span><br/>"; }
	if (arr_instpreg[item].length>0) {	
		cad+="<span class=\"fontAmaranthB bigger-100 label label-info label-white middle\"> INSTRUCCIÓN PREGUNTA: "+arr_instpreg[item]+"</span><br/>";}
	$("#observaciones").html(cad);
}

function aparecer(idpreg,valsum){

	if ((pregactiva+valsum)>=contPreg)  {
		mostrarConfirm("dlgcierraExamen", "grid_registro", "Finalizar Examen",
									"<span class=\"lead text-danger\"><strong>Al finalizar su examen ya no se podrá realizar cambios ",
		                             "¿Seguro qeu desea finalizar?","Finalizar", "cierraExamen();","modal-lg");
	}

	modificarnum=parseInt(idpreg)+parseInt(valsum);
	$("#etavanzar").html("Sig");
	if (modificarnum<1) {modificarnum=1;}
	if (modificarnum>=contPreg-1) {modificarnum=contPreg-1; $("#etavanzar").html("Finalizar");}

	$("#laPregunta"+pregactiva).addClass("hide");
	$("#elitem"+pregactiva).removeClass("badge-yellow");

	$("#laPregunta"+modificarnum).removeClass("hide");
	numpregact=$("#laPregunta"+modificarnum).attr("numPreg");

	$("#elitem"+modificarnum).removeClass("badge-gray");
	$("#elitem"+modificarnum).removeClass("badge-yellow");
	$("#elitem"+modificarnum).addClass("badge-yellow");
	pregactiva=modificarnum;
	colocarSeccion(pregactiva-1);
}


function verExamen(id,curp,contiempo,minutos,horaInicia) {
	elexamen=id;
	var minAct=0;
	var minutosInicio=0;
	var yaabrio=false;
	sq="SELECT ifnull(IDCON,0) as IDCON,FECHAINICIA, INICIO, count(*) as N FROM lincontestar WHERE IDEXAMEN="+id+" and IDPRESENTA='"+curp+"'";
	$.ajax({
		type: "POST",
		url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(sq),
		success: function (dataCon) {	
	        idcon=0;  encontre=false;
			jQuery.each(JSON.parse(dataCon), function(clave, valorCon) { 
				if (valorCon.N>0)  {
					yaabrio=true;
				   minutosInicio=parseInt(valorCon.INICIO.split(":")[0])*60 + parseInt(valorCon.INICIO.split(":")[1]);
				   fechainicio=valorCon.FECHAINICIA;
				}
			});  

			$.ajax({
				type: "POST",
				url:  "../nucleo/base/getFechaHora.php",
				success: function (dataFecha) {		
					horaAct=dataFecha.split("|")[0];					   
					minAct=parseInt(horaAct.split(":")[0])*60 + parseInt(horaAct.split(":")[1]);						
					
					fechaAct=dataFecha.split("|")[1];
					minIni=0;
					if (!(horaInicia=='LIBRE')) {
						minIni=parseInt(horaInicia.split(":")[0])*60+parseInt(horaInicia.split(":")[1]);
						if (minAct<minIni) { alert ("El examen comienza a las "+horaInicia+" La hora en el servidor es: "+horaAct+" espere por favor"); return 0;}						
						}
					
					if (minutosInicio==0) {tiempoqueda=minutos-(parseInt(minutosInicio));}
					else {tiempoqueda=minutos-(parseInt(minAct)-parseInt(minutosInicio)); }
					    
					//alert (minutosInicio+" "+minAct+" "+minIni+" "+minutos+" queda:"+tiempoqueda);	
					//alert (fechainicio+"!="+fechaAct);
					if ((yaabrio) && (fechainicio!=fechaAct) && (contiempo=='S')) {
						alert ("El tiempo para iniciar el examen se ha concluido días diferentes: Inicio el examen el dia "+fechainicio); return 0;
					}
					if ((tiempoqueda<=0) && (contiempo=='S')) {alert ("El tiempo para iniciar el examen se ha concluido"); return 0;}  
					mandaExamen(id,fechaAct,horaAct,contiempo,minutos,horaInicia,minIni,minAct);		   
					}
			});
		}
	});
}
	


$(document).ready(function(){
	$(".opresp").change(function(){
            alert($(this).val()+" "+$(this).attr("idpreg"));         
		});
});

function cambioRespuesta(idpreg,num,opcion,puntaje,idexa){
	var hoy= new Date();
	lahora=hoy.getHours()+":"+hoy.getMinutes();
    var losdatos=[];
	losdatos[0]=idexa+"|"+curp+"|"+idpreg+"|"+opcion+"|"+puntaje+"|"+lahora;
    var loscampos = ["IDEXAMEN","IDPRESENTA","IDPREGUNTA","RESPUESTA","PUNTAJE","HORAGRABO",];

		   parametros={
				tabla:"linrespuestas",
			 campollave:"CONCAT(IDEXAMEN,IDPRESENTA,IDPREGUNTA)",
			 bd:"Mysql",
			 valorllave:idexa+curp+idpreg,
			 eliminar: "S",
			 separador:"|",
			 campos: JSON.stringify(loscampos),
			 datos: JSON.stringify(losdatos)
		   };

		  $.ajax({
			 type: "POST",
			 url:"../nucleo/base/grabadetalle.php",
			 data: parametros,
			 success: function(data){
				 $('#dlgproceso').modal("hide");  
				 if (data.length>0) {alert ("Ocurrio un error: "+data);}	
				 else {
					$(".itemPreg[idPreg='"+idpreg+"']").addClass("badge-primary");
					$(".itemPreg[idPreg='"+idpreg+"']").removeClass("badge-gray");
				 }                                	                                        					          
			 }					     
		 });    	 
}