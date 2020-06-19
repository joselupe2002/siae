function showResultExamen(idexa,idpresenta,contenedor){
    script="<div class=\"modal fade\" id=\"resultado_"+idexa+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	"   <div class=\"modal-dialog modal-lg\"  role=\"document\">"+
	"      <div class=\"modal-content\">"+
	"          <div class=\"modal-header\" >"+
	"             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	"                  <span aria-hidden=\"true\">&times;</span>"+
	"             </button>"+
	"             <span><i class=\"menu-icon fa fa-list-ol\"></i><span class=\"text-success lead \"> <strong>Resultados de Evaluación</strong></span></span>"+	   
	"          </div>"+
	"          <div id=\"body_"+idexa+"\" class=\"modal-body\"  style=\"height:330px; overflow-y: auto;\">"+	
	"          </div>"+
	"      </div>"+
	"   </div>"+
    "</div>";

    
    $("#resultado_"+idexa).remove();
    $("#resultado_"+idexa).empty();
    if (! ( $("#resultado_"+idexa).length )) { $("#"+contenedor).append(script);}	    
    $("#resultado_"+idexa).modal({show:true, backdrop: 'static'});

	var cad="";
	
	cad="<div class=\"widget-box widget-color-blue\" style=\"width:100%;\"  >"+		   
		   "<div class=\"widget-body\" style=\"padding:10px;\">"+
			      "<div id=\"contpreg\"></div>"+					    			
			"</div>"+
		"</div>";
    $("#body_"+idexa).append(cad);
    
    sq="SELECT IDPREG,IDSECC,b.IDSECCION, c.DESCRIP AS SECCIOND, PREGUNTA, CORRECTA, RESPUESTA, b.PUNTAJE, b.RESPUESTA1,b.RESPUESTA2,b.RESPUESTA3,b.RESPUESTA4 "+
    " from linrespuestas a, linpreguntas b, linsecciones c  WHERE a.IDPREGUNTA=b.IDPREG  AND b.IDSECCION=c.IDSECC "+    
    " AND a.IDEXAMEN="+idexa+" and a.IDPRESENTA='"+idpresenta+"' order by b.IDSECCION,b.ORDEN,b.IDPREG" ;
    parametros={sql:sq,dato:sessionStorage.co,bd:"Mysql"}


    contPreg=0;
	mipuntaje=0;
	laseccion="";
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function (dataPre) {		
		    jQuery.each(JSON.parse(dataPre), function(clave, valorPre) { 
                            
				            if ((clave==0)||!(laseccion==valorPre.IDSECCION)) {	
                                
                                
								$("#enc_"+laseccion).html(mipuntaje);	
								mipuntaje=0;	
								laseccion=valorPre.IDSECCION;								
								$("#contpreg").append("<div class=\"alert alert-info\">"+
													  "    <div class=\"row\">"+
													  "        <div class=\"col-sm-10\"><span class=\"text-danger bigger-130\">SECCION: "+valorPre.SECCIOND+"</span></div>"+
													  "        <div class=\"col-sm-2\"><span id=\"enc_"+laseccion+"\" class=\"badge badge-danger\"></span></div>"+
													  "    </div>"+
													  "</div>");	                                                  
							}
				            respondio=valorPre.RESPUESTA;

				            cadPreg=  "<div id=\"laPregunta"+contPreg+"\>"+
									  "   <div class\"row\">"+
									  "      <span class=\"fontAmaranthB\" style=\"font-size:18px;\">"+valorPre.PREGUNTA+"</span>"+
									  "      <span class=\"badge badge-danger pull-right\">Puntaje: "+valorPre.PUNTAJE+"</span>"+
									  "   </div>";						
						    if (valorPre.RESPUESTA==valorPre.CORRECTA) {
								mipuntaje+=parseInt(valorPre.PUNTAJE);
								cadPreg+="<div class=\"alert alert-success\"><div id=\"resp"+valorPre.IDPREG+"\" class=\"row\"></div></div>";}
							else {cadPreg+="<div class=\"alert alert-danger\"><div id=\"resp"+valorPre.IDPREG+"\" class=\"row\"></div></div>";}
							$("#contpreg").append(cadPreg);
							
							cadPreg="";						
							flecha=""; if (valorPre.CORRECTA==1) {flecha="<i class=\"fa fa-check green bigger-160\"></i>";}
							check="";if (respondio==1) { check="checked"; }							
							if (!((valorPre.RESPUESTA1=='')||(valorPre.RESPUESTA1==null))) {							
								$("#resp"+valorPre.IDPREG).append("       <div class=\"col-sm-3\">"+
										"            <div class=\"\"> <div  class=\"radio\"><label><input disabled=\"disabled\" "+check+"   idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_1\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA1+"</span>"+flecha+"</label>"+
										"             </div>"+
										"       </div>");
								}
							
						    flecha=""; if (valorPre.CORRECTA==2) {flecha="<i class=\"fa fa-check green bigger-160\"></i>";}
							check=""; if (respondio==2) { check="checked"; }
							if (!((valorPre.RESPUESTA2=='')||(valorPre.RESPUESTA2==null))) {							
								$("#resp"+valorPre.IDPREG).append("       <div class=\"col-sm-3\">"+
										"             <div class=\"radio\"><label><input disabled=\"disabled\" "+check+"  idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_2\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA2+"</span>"+flecha+"</label>"+
										"             </div>"+
										"       </div>");
								}

							check="";if (respondio==3) { check="checked"; }
							flecha=""; if (valorPre.CORRECTA==3) {flecha="<i class=\"fa fa-check green bigger-160\"></i>";}
							if (!((valorPre.RESPUESTA3=='')||(valorPre.RESPUESTA3==null))) {							
								$("#resp"+valorPre.IDPREG).append("        <div class=\"col-sm-3\">"+
										"             <div class=\"radio\"><label><input disabled=\"disabled\" "+check+"   idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_3\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA3+"</span>"+flecha+"</label>"+
										"             </div>"+
										"       </div>");;
								}

							check=""; if (respondio==4) { check="checked"; }
							flecha=""; if (valorPre.CORRECTA==4) {flecha="<i class=\"fa fa-check green bigger-160\"></i>";}
							if (!((valorPre.RESPUESTA4=='')||(valorPre.RESPUESTA4==null))) {							
								$("#resp"+valorPre.IDPREG).append("       <div class=\"col-sm-3\">"+
										"             <div class=\"radio\"><label><input disabled=\"disabled\" "+check+"  idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_4\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA4+"</span>"+flecha+"</label>"+
										"             </div>"+
										"       </div>");;
								}
				
				contPreg++;
			}); 
			$("#enc_"+laseccion).html(mipuntaje);	//Para el ultimo valor 		
		}
    });
}
