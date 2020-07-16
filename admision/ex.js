
var elciclo="";
var pregactiva=0;
var contPreg=1;	
var elexamen;
var arr_nombresec=[];
var arr_instsec=[];
var arr_instpreg=[];
var arr_preguntas=[];


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		
		$(document).bind("contextmenu",function(e){return false;});
		window.location.hash="red";
	    window.location.hash="Red" //chrome
		window.onhashchange=function(){window.location.hash="red";}
		
		
		cargarFoto();

		if ((aceptado=='N') && (abiertoExa=='S')) {			
			cargarExamenes();
		} 
		else if ((abiertoRes=='S')) {
			cargarResultados(aceptado);
		}
		else {
			cargarMensajeEspera();
		}
		
		    
		}); 



function cargarResultados(resultado) {
	cad="Para el <strong> Instituto Tecnológico Superior de Macuspana</strong>, es un honor y privilegio informarle que ha sido "+
		"<span class=\"text-success\"><strong>ACEPTADO</strong></span>"+" en nuestra casa de estudios para cursar la "+
		" carrera de <strong>"+utf8Decode(carrerad)+".</strong><br/> Para continuar con su proceso de admisión e iniciar su inscripción a la Institución "+
		" es necesario que suba en el sistema la siguiente documentación:";

	$("#contenidoAsp").append("<div class='space-7'></div>"+
	"   <div class=\"row\">"+
	"        <div class=\"col-sm-18 text-center\">"+
	"              <span class=\"fontAmaranthB text-danger bigger-200\">"+
	"                    <strong>RESULTADO DE EXÁMEN DE ADMISIÓN</strong>"+
	"              </span>"+ 
	"        </div>"+
	"   </div>"+
	"   <div class=\"row\"> "+
	"        <div class=\"col-sm-1\"></div>"+
	"        <div class=\"col-sm-10\" style=\"text-align:justify;\">"+
	"             <span class=\"fontRoboto text-light bigger-180\">"+cad+
	"             </span> "+
	"        </div>"+
	"        <div class=\"col-sm-1\"></div>"+
	"   </div><br/>"+
	"   <div class=\"row\">"+
	"        <div class=\"col-sm-1\"></div>"+
	"        <div id=\"listaadj\" class=\"col-sm-10\"></div>"+
	"        <div class=\"col-sm-1\"></div>"+
	"   </div>"
	);

	if (resultado=='S') {
		if (enviodocins=='N') {cargarAdjuntos();}
		if (enviodocins=='S') {cargaMensajeEnvio();}
		
	}
}

function cargarFoto(){
	elsql="select RUTA from adjaspirantes  b where b.AUX='FOTO"+curp+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../nucleo/base/getdatossqlSeg.php",
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
			" and if(CARRERA='','"+carrera+"',CARRERA)='"+carrera+"' order by HORAINICIO ASC";

			parametros={sql:sq,dato:sessionStorage.co,bd:"Mysql"}

		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../nucleo/base/getdatossqlSeg.php",
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
								  "              <span class=\"fontAmaranthB text-danger bigger-230\">"+
								  "                    <strong>INFORMACIÓN IMPORTANTE</strong>"+
								  "              </span>"+ 
				                  "        </div>"+
			                      "   </div>"+
			                      "   <div class=\"row\"> "+
				                  "        <div class=\"col-sm-12\">"+
								  "             <span class=\"fontAmaranthB text-light bigger-140\">"+
								  "                   Antes de iniciar tu Exámen de Admisión es necesario que "+
								  "                   atiendas las siguientes instrucciones "+
								  "             </span><br> <br>"+
								  "             <span class=\"fontAmaranthB text-light bigger-140\">"+
								  "                   A. Debe contestar las evaluaciones en este orden 1. EXAMEN DE ADMISIÓN 2. EXAMEN PSICOMÉTRICO Y 3. EXAMEN DE CARRERA."+								  								  
								  "             </span>  <br>"+
								  "             <span class=\"fontAmaranthB text-light bigger-140\">"+
								  "                   B. Tome en cuenta la hora de inicio de cada examen y el tiempo que tiene para contestar."+								  								  
								  "             </span> <br> "+
								  "             <span class=\"fontAmaranthB text-light bigger-140\">"+
								  "                   C. En caso de que tenga problemas de conexión a internet las respuestas quedán grabadas y continuará donde se quedó."+								  								  
								  "             </span>  <br>"+
								  "             <span class=\"fontAmaranthB text-light bigger-140\">"+
								  "                   D. Asegurese de dar FINALIZAR al examen."+								  								  
								  "             </span>  <br>"+
								  "        </div>"+
								  "   </div>"
								  );



	}

		
function mandaExamen(idexa, fechaini,horaini,contiempo,minutos,horaInicia,minIni,minAct){
    fechareal=""; horareal="";
	sq="SELECT ifnull(IDCON,0) as IDCON,FECHAINICIA, INICIO, count(*) as N FROM lincontestar WHERE IDEXAMEN="+idexa+" and IDPRESENTA='"+curp+"'";
	parametros={sql:sq,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",		
        data:parametros,
		url:  "../nucleo/base/getdatossqlSeg.php",
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
			   "<span class=\"lead text-danger\"><strong>Le informamos que le quedan "+leresta+" Minutos para terminar su examen</strong></span>","modal-lg");}
			   if (leresta<=0) {
				   cierraExamen();
			   }
			}
	});
}

function cierraExamen(){
	lahora=dameFecha("HORA");
	lafecha=dameFecha("FECHA");
	
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
	contPreg=1;
	 arr_nombresec=[];
	 arr_instsec=[];
	 arr_instpreg=[];
	 arr_preguntas=[];
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
			"<div class=\"bg-white\">"+
			"     <div class=\"row\"><div class=\"col-sm-12\">"+"<br/><span id=\"observaciones\"></span><br/></div>"+
			"</div>"+
		"</div>";
	$("#contenidoAsp").append(cad);

	parametros={sql:sq,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../nucleo/base/getdatossqlSeg.php",
		success: function (dataPre) {		
		    jQuery.each(JSON.parse(dataPre), function(clave, valorPre) { 		
				arr_nombresec[clave]=valorPre.SECCIOND;
				arr_instsec[clave]=valorPre.INSTRUCCIONES;
				arr_instpreg[clave]=valorPre.INSTRUCCIONESPREG;
				arr_preguntas[clave]=valorPre.IDPREG;

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
			parametros={sql:sqRes,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../nucleo/base/getdatossqlSeg.php",
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

function verificarPreguntas(){
	resp=true;
	$.each(arr_preguntas, function (ind, elem) { 
		//alert ("elemento: "+elem+" "+ $("input[name=opcion_"+elem+"]:radio").is(':checked'));
		if (!( $("input[name=opcion_"+elem+"]:radio").is(':checked'))) {  
			
			 resp=false;
		   }
	  }); 
	  
	return resp;
}

function aparecer(idpreg,valsum){

	if ((pregactiva+valsum)>=contPreg)  {
		todos=verificarPreguntas();
		mimsj="Al finalizar su examen ya no se podrá realizar cambios ";
		if (!(todos)) {mimsj="Al parecer no ha contestado todas sus preguntas, aún así desea terminar el examen"; }
		mostrarConfirm("dlgcierraExamen", "grid_registro", "Finalizar Examen",
									"<span class=\"lead text-danger\"><strong>"+mimsj,
		                             "¿Seguro que desea finalizar?","Finalizar", "cierraExamen();","modal-lg");
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
	parametros={sql:sq,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../nucleo/base/getdatossqlSeg.php",
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

/*============================CARGA DE DATOS ADJUNTOS ===============================*/

function cargarAdjuntos() {
	contFila=0;
	contDatos=1;
	elsqlAdj="select IDDOC, DOCUMENTO, ifnull(b.RUTA,'') as RUTA, CLAVE, TIPOADJ, "+
			 " (SELECT CICL_CLAVE FROM ciclosesc where CICL_ADMISION='S' ORDER BY CICL_ORDEN DESC LIMIT 1) AS CICLO "+
	         " from documaspirantes a "+
	         "LEFT OUTER JOIN  adjaspirantes b  on (b.AUX=concat(a.CLAVE,'"+usuario+"'))"+
			 " WHERE a.ENLINEA='S' and a.MODULO='INSCRIPCION' order by TIPOADJ, DOCUMENTO";
			 parametros={sql:elsqlAdj,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../nucleo/base/getdatossqlSeg.php",
		success: function(data){    
			botonAdj="<div class=\"row\">"+
						"<div class=\"col-sm-9\"></div>"+
						"  <div class=\"col-sm-2\">"+
						"     <button title=\"Enviar los documentos al Departamento de Control Escolar\" "+
						"             onclick=\"enviarDocumentos();\" class=\"btn btn-white btn-purple "+
						"             btn-danger btn-round\"> "+
						"        <i class=\"ace-icon blue fa fa-rocket bigger-140\"></i>Enviar Documentación"+
						"        <span class=\"btn-small\"></span> "+
						"      </button>"+
						"  </div>"+
						"</div>"+
						"<div class=\"space-20\"></div>";

			$("#listaadj").empty();	
			$("#listaadj").append(botonAdj);	
			$("#listaadj").append(
				                "<div class=\"alert alert-danger\" style=\"padding:0px; margin:0px;\">"+
								"   <div class=\"row\" style=\"padding:0px;  margin:0px;\">"+								  
			                      "    <div class=\"col-sm-1\" style=\"padding:0px; margin:0px;\" ></div>"+
								  "    <div class=\"col-sm-8\" style=\"padding:0px; margin:0px;\">"+								  
								  "             <p><strong><span class=\"text-success\">Nota:</span>"+
								  "	              <span class=\"text-primary \">Todos los documentos a excepción de la FOTO se deben adjuntar en formato PDF. </span>"+
								  " 	          <span class=\"text-danger\"> Máximo 4MB</span>"+								                       
								  "             </strong></p> "+
								  "    </div>"+								  								
								  "    <div class=\"col-sm-2\" style=\"padding:0px; margin:0px;\">"+								  
								  "            <a href=\"https://www.ilovepdf.com/es/jpg_a_pdf\" target=\"_blank\">"+
								  "                 <span title=\"Click para ir a una página que le ayude en la conversión de imagenes a formato PDF\" "+
								  "                       class=\"label  label-danger label-white middle\">Convertir Imagen-PDF</span>"+
								  "            </a>"+
								  "    </div>"+								 
								  "    <div class=\"col-sm-1\" style=\"padding:0px; margin:0px;\"></div>"+
								  "</div>"+								
								  "<div class=\"row\" style=\"padding:0px;  margin:0px;\"  >"+								  
								  "    <div class=\"col-sm-1\" style=\"padding:0px; margin:0px;\"></div>"+
								  "    <div class=\"col-sm-8\" style=\"padding:0px; margin:0px;\" >"+
								  "             <p><strong><span class= \"text-success\">FOTO INFANTIL:</span>"+
								  "	              <span class=\"text-primary \">Deberá ser en formato <span class=\"badge badge-pink\">PNG</span>"+
								  "	              <span class=\"badge badge-success\">JPEG</span>"+
								  " 	          <span class=\"text-danger\"> Máximo 4MB</span> blanco y negro o a color </span>"+
								  "             </strong></p> "+
								  "     </div>"+
								  "     <div class=\"col-sm-3\" style=\"padding:0px; margin:0px;\">"+
								  "               <a href=\"https://www.iloveimg.com/es/recortar-imagen\" target=\"_blank\">"+
								  "                      <span title=\"Click para ir a una página que le ayude a recortar imágenes\" "+
								  "                      class=\"label  label-purple label-white middle\">   Recortar Imágen</span>"+
								  "                </a>"+
								  "               <a href=\"https://imagen.online-convert.com/es/convertir-a-png\" target=\"_blank\">"+
								  "                      <span title=\"Click para ir a una página que le ayude a convertir imagenes a PNG\" "+
								  "                      class=\"label  label-pink label-white middle\">Convertir a PNG</span>"+
								  "                </a>"+
								  "     </div>"+
								  "</div>"+
								"</div>"); 

								

			jQuery.each(JSON.parse(data), function(clave, valor) { 
				   stElim="display:none; cursor:pointer;";
					if (valor.RUTA.length>0) { stElim="cursor:pointer; display:block; ";} 
					
					cadFile="<div class=\"col-sm-4\">"+											
					"            <span class=\"text-primary\"><strong>"+utf8Decode(valor.DOCUMENTO)+"</strong></span>"+											
					"            <input class=\"fileSigea\" type=\"file\" id=\"file_"+valor.CLAVE+"\""+
					"                   onchange=\"subirPDFDriveSaveAsp('file_"+valor.CLAVE+"','ASPIRANTES_"+valor.CICLO+"','pdf_"+
												  valor.CLAVE+"','RUTA_"+valor.CLAVE+"','"+valor.TIPOADJ+"','S','ID','"+valor.CLAVE+
												  "',' DOCUMENTO  "+valor.DOCUMENTO+" ','adjaspirantes','alta','"+valor.CLAVE+usuario+"');\">"+
					"           <input  type=\"hidden\" value=\""+valor.RUTA+"\"  name=\"RUTA_"+valor.CLAVE+"\" id=\"RUTA_"+valor.CLAVE+"\"  placeholder=\"\" />"+
					"        </div>"+
					"        <div class=\"col-sm-1\" style=\"padding-top:5px;\">"+
					"           <a target=\"_blank\" id=\"enlace_RUTA_"+valor.CLAVE+"\" href=\""+valor.RUTA+"\">"+
					"                 <img class=\"imgadj\" cargado=\"S\" width=\"40px\" height=\"40px\" id=\"pdf_"+valor.CLAVE+"\" name=\"pdf_"+valor.CLAVE+"\" src=\"..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
					"           </a>"+
					"           <i style=\""+stElim+"\"  id=\"btnEli_RUTA_"+valor.CLAVE+"\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
					"            onclick=\"eliminarEnlaceDriveAsp('file_"+valor.CLAVE+"','ASPIRANTES_"+valor.CICLO+"',"+
					"                      'pdf_"+valor.CLAVE+"','RUTA_"+valor.CLAVE+"','"+valor.TIPOADJ+"','S','ID','"+valor.CLAVE+"','"+valor.DOCUMENTO+"-DOCUMENTO',"+
					"                      'adjaspirantes','alta','"+valor.CLAVE+usuario+"');\"></i> "+              				                        
					"      </div> ";

					

					if ((contDatos % 2)==1) {contFila++; fila="<div class=\"row\" style=\"padding:0px;\" id=\"fila"+contFila+"\"><div  class=\"col-sm-1\"></div></div>"; }
					else {fila="";}
					
					$("#listaadj").append(fila);
					$("#fila"+contFila).append(cadFile);
					
					contDatos++;	
						
					
				   if (valor.RUTA=='') { 
					   $('#enlace_RUTA'+valor.CLAVE).attr('disabled', 'disabled');					  
					   $('#enlace_RUTA'+valor.CLAVE).attr('href', '../imagenes/menu/pdfno.png');
					   $('#pdf_'+valor.CLAVE).attr('src', "../imagenes/menu/pdfno.png");
					   $('#pdf_'+valor.CLAVE).attr('cargado', 'N');		                    
					  }
				
					if (((valor.TIPOADJ.indexOf("png")>=0) || (valor.TIPOADJ.indexOf("bmp")>=0)) && !(valor.RUTA=='')) {			
						$('#pdf_'+valor.CLAVE).attr('src', valor.RUTA);	
					}
												
			  });


			$("#listaadj").append(botonAdj);

			$('.fileSigea').ace_file_input({
				no_file:'Sin archivo ...',
				btn_choose:'Buscar',
				btn_change:'Cambiar',
				droppable:false,
				onchange:null,
				thumbnail:false, //| true | large
				whitelist:'pdf|jpg|png|bmp',
				blacklist:'exe|php'
				//onchange:''
				//
			});
				
			},
		error: function(data) {	                  
				   alert('ERROR: '+data);
			   }
	   });
   }


   function enviarDocumentos(){
	todos=true;
	$( ".imgadj" ).each(function( index ) {
		if ($(this).attr("src").indexOf("pdfno.png")>=0) {
			todos=false;
		}	
	});

	if (todos) { msj="Al finalizar su exámen ya no podra hacer cambios."; }
	else {msj="Al parecer no ha contestado todas las preguntas, aún así desea finalizar su examen"};
		mostrarConfirm("confirmFinalizar", "grid_registro", "Finalizar Proceso",
		"<span class=\"lead text-danger\"><strong>"+msj,
		"¿Esta usted Seguro?","Finalizar Examen", "finalizar();","modal-lg");
   }

   function finalizar(){
	parametros={
		tabla:"aspirantes",
		bd:"Mysql",
		campollave:"IDASP",
		valorllave:idasp,
		ENVIODOCINS:"S"
		};

		$('#confirmFinalizar').modal("hide");
		$.ajax({
			type: "POST",
			url:"../nucleo/base/actualiza.php",
			data: parametros,
			success: function(data){  				
				enviodocins='S';   
				cargaMensajeEnvio(); 			        	
				//location.reload();										 
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
			}					     
		}); 
   }


 function cargaMensajeEnvio(){
	$("#listaadj").empty();	
	$("#listaadj").append(
						"<div class=\"alert alert-success\" style=\"padding:0px; margin:0px;\">"+
						"   <div class=\"row\" style=\"padding:0px;  margin:0px;\">"+								  						  
						  "    <div class=\"col-sm-12 fontRoboto\" style=\"padding:0px; margin:0px; text-align:center;\">"+								  
						  "             <p class=\"bigger-160\">Tus documentos fueron enviados. Gracias.</p> "+
						  "    </div>"+								  														  
						  "</div>");
					
 }