var elciclo="";
var pregactiva=0;
var contPreg=1;	
arr_nombresec=[];
arr_instsec=[];
arr_instpreg=[];
var respuestas=[];


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		$(document).bind("contextmenu",function(e){return false;});
		cargandoExamen(elexamen);
		}); 


		

function cargandoExamen(idexa){
	$("#contenidoAsp").empty();
	var cad="";
	sq="SELECT * from vlinpreguntas WHERE IDEXAMEN="+idexa+" order by IDSECCION,ORDEN, IDPREG" ;
	cad="<div class=\"widget-box widget-color-blue\" style=\"width:100%;\"  >"+
		   "<div class=\"widget-header widget-header-small\">"+
		   "   <div class=\"row\">"+
		   "     <div class=\"col-sm-1\">"+"<span class=\"fontAmaranth text-white\">Apertura: </span>"+
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
		url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(sq),
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



$(document).ready(function(){
	$(".opresp").change(function(){
            alert($(this).val()+" "+$(this).attr("idpreg"));         
		});
});


function cambioRespuesta(idpreg,num,opcion,puntaje,idexa){
//	alert(idpreg+"|"+num+"|"+opcion+"|"+puntaje);
	respuestas[pregactiva-2]=idpreg+"|"+num+"|"+opcion+"|"+puntaje;
}



function cierraExamen(idexa){
	$("#contenidoAsp").empty();
	$("#dlgcierraExamen").modal("hide");
	var cad="";
	
	cad="<div class=\"widget-box widget-color-blue\" style=\"width:100%;\"  >"+		   
		   "<div class=\"widget-body\" style=\"padding:10px;\">"+
			      "<div id=\"contpreg\"></div>"+					    			
			"</div>"+
		"</div>";
	$("#contenidoAsp").append(cad);

	sq="SELECT * from vlinpreguntas WHERE IDEXAMEN="+elexamen+" order by IDSECCION,ORDEN,IDPREG" ;
	mipuntaje=0;
	laseccion="";
	$.ajax({
		type: "POST",
		url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(sq),
		success: function (dataPre) {		
		    jQuery.each(JSON.parse(dataPre), function(clave, valorPre) { 
				            if ((clave==0)||!(laseccion==valorPre.IDSECCION)) {		
								$("#enc_"+laseccion).html(mipuntaje);	
								mipuntaje=0;	
								laseccion=valorPre.IDSECCION;								
								$("#contpreg").append("<div class=\"alert alert-info\">"+
													  "    <div class=\"row\">"+
													  "        <div class=\"col-sm-6\">"+valorPre.SECCIOND+"</div>"+
													  "        <div class=\"col-sm-6\"><span id=\"enc_"+laseccion+"\" class=\"badge badge-danger\"></span></div>"+
													  "    </div>"+
													  "</div>");	                                                  
							}
				            respondio=0; if (respuestas[clave-1]) {respondio=respuestas[clave-1].split("|")[2];}

				            cadPreg=  "<div id=\"laPregunta"+contPreg+"\>"+
									  "   <div class\"row\">"+
									  "      <span class=\"fontAmaranthB\" style=\"font-size:18px;\">"+valorPre.PREGUNTA+"</span>"+
									  "      <span class=\"badge badge-danger\">"+valorPre.PUNTAJE+"</span>"+
									  "   </div>";						
						    if (respondio==valorPre.CORRECTA) {
								mipuntaje+=parseInt(valorPre.PUNTAJE);
								cadPreg+="<div class=\"alert alert-success\"><div id=\"resp"+valorPre.IDPREG+"\" class=\"row\"></div></div>";}
							else {cadPreg+="<div class=\"alert alert-danger\"><div id=\"resp"+valorPre.IDPREG+"\" class=\"row\"></div></div>";}
							$("#contpreg").append(cadPreg);
							
							cadPreg="";						
							flecha=""; if (valorPre.CORRECTA==1) {flecha="<i class=\"fa fa-check green\"></i>";}
							check="";if (respondio==1) { check="checked"; }							
							if (!((valorPre.RESPUESTA1=='')||(valorPre.RESPUESTA1==null))) {							
								$("#resp"+valorPre.IDPREG).append("       <div class=\"col-sm-3\">"+
										"            <div class=\"\"> <div  class=\"radio\"><label><input disabled=\"disabled\" "+check+"   idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_1\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA1+"</span></label>"+
										"             </div>"+flecha+
										"       </div>");
								}
							
						    flecha=""; if (valorPre.CORRECTA==2) {flecha="<i class=\"fa fa-check green\"></i>";}
							check=""; if (respondio==2) { check="checked"; }
							if (!((valorPre.RESPUESTA2=='')||(valorPre.RESPUESTA2==null))) {							
								$("#resp"+valorPre.IDPREG).append("       <div class=\"col-sm-3\">"+
										"             <div class=\"radio\"><label><input disabled=\"disabled\" "+check+"  idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_2\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA2+"</span></label>"+
										"             </div>"+flecha+
										"       </div>");
								}

							check="";if (respondio==3) { check="checked"; }
							flecha=""; if (valorPre.CORRECTA==3) {flecha="<i class=\"fa fa-check green\"></i>";}
							if (!((valorPre.RESPUESTA3=='')||(valorPre.RESPUESTA3==null))) {							
								$("#resp"+valorPre.IDPREG).append("        <div class=\"col-sm-3\">"+
										"             <div class=\"radio\"><label><input disabled=\"disabled\" "+check+"   idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_3\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA3+"</span></label>"+
										"             </div>"+flecha+
										"       </div>");;
								}

							check=""; if (respondio==4) { check="checked"; }
							flecha=""; if (valorPre.CORRECTA==4) {flecha="<i class=\"fa fa-check green\"></i>";}
							if (!((valorPre.RESPUESTA4=='')||(valorPre.RESPUESTA4==null))) {							
								$("#resp"+valorPre.IDPREG).append("       <div class=\"col-sm-3\">"+
										"             <div class=\"radio\"><label><input disabled=\"disabled\" "+check+"  idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_4\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA4+"</span></label>"+
										"             </div>"+flecha+
										"       </div>");;
								}
				
				contPreg++;
			}); 
			$("#enc_"+laseccion).html(mipuntaje);	//Para el ultimo valor 		
		}
	});
}
