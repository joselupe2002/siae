
function showResultExamen(idexa,idpresenta,contenedor, nombre){
    script="<div class=\"modal fade\" id=\"resultado_"+idexa+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	"   <div class=\"modal-dialog modal-lg\"  role=\"document\">"+
	"      <div class=\"modal-content\">"+
	"          <div class=\"modal-header\" >"+
	"             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	"                  <span aria-hidden=\"true\">&times;</span>"+
	"             </button>"+
	"             <span><i class=\"menu-icon glyphicon red glyphicon-copy bigger-160\"></i><span class=\"text-success lead \"> <strong>Resultados de Evaluación</strong></span></span>"+	   
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
				  "<div id=\"contpreg\">"+
				  "<div class=\"row\">"+
				  "   <div class=\"col-sm-10\" style=\"text-align:center;\">"+
				  "         <span class=\"text-primary bigger-130\"><strong>"+nombre+"</strong></span>"+
				  "    </div>"+ 
				  "   <div class=\"col-sm-1\">"+
				  "         <button title=\"Imprimir\" onclick=\"imprimirDiv('resultado_"+idexa+"');\" class=\"btn btn-xs btn-white btn-primary btn-round\">"+ 
				  "				<i class=\"ace-icon blue fa fa-print bigger-160\"></i><span class=\"btn-small\"></span>"+            
				  "			</button>"+
				  "    </div>"+ 				 
				  "</div>"+
				  "<div class=\"space-10\"></div>"+
				  "</div>"+					    			
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
								$("#contpreg").append("<div style=\"width:100%; height:3px; background-color:#841C06;\"></div>"+
													  "    <div class=\"row\">"+
                                                      "        <div class=\"col-sm-10\">"+
                                                      "              <span class=\"text-danger bigger-130\"><i class=\"fa fa-ticket red bigger-160\"></i> SECCION: "+valorPre.SECCIOND+"</span></div>"+
                                                      "        <div class=\"col-sm-2\">"+
                                                      "              <span id=\"enc_"+laseccion+"\" title=\"Puntaje total obtenido en esta sección\" "+
                                                      "              class=\"badge badge-primary  bigger-160\"></span></div>"+
													  "    </div>"+
													  "<div style=\"width:100%; height:5px; background-color:#841C06; margin-bottom:10px;\"></div>");	                                                  
							}
				            respondio=valorPre.RESPUESTA;

				            cadPreg=  "<div id=\"laPregunta"+contPreg+"\>"+
                                      "   <div class\"row\">"+
                                      "        <div class=\"col-sm-11\">"+
                                      "             <span class=\"fontAmaranthB\" style=\"font-size:18px;\">"+valorPre.PREGUNTA+"</span>"+
                                      "        </div>"+
                                      "        <div class=\"col-sm-1\">"+
                                      "             <span title=\"Puntaje de la pregunta en caso de responder correctamente\" "+
                                      "               class=\"badge badge-danger bigger-130\">P: "+valorPre.PUNTAJE+"</span>"+
                                      "        </div>"+
									  "   </div>";						
						    if (valorPre.RESPUESTA==valorPre.CORRECTA) {
								mipuntaje+=parseInt(valorPre.PUNTAJE);
								cadPreg+="<div class=\"alert alert-success\"><div id=\"resp"+valorPre.IDPREG+"\" class=\"row\"></div></div>";}
							else {cadPreg+="<div class=\"alert alert-danger\"><div id=\"resp"+valorPre.IDPREG+"\" class=\"row\"></div></div>";}
							$("#contpreg").append(cadPreg);
							
							var lafecha="<span class=\"badge badge-success\">(R)</span><i class=\"fa fa-check green bigger-160\"></i>";
							cadPreg="";						
							flecha=""; if (valorPre.CORRECTA==1) {flecha=lafecha;}
							check="";if (respondio==1) { check="checked"; }							
							if (!((valorPre.RESPUESTA1=='')||(valorPre.RESPUESTA1==null))) {							
								$("#resp"+valorPre.IDPREG).append("       <div class=\"col-sm-3\">"+
										"            <div class=\"\"> <div  class=\"radio\"><label><input disabled=\"disabled\" "+check+"   idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_1\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA1+"</span>"+flecha+"</label>"+
										"             </div>"+
										"       </div>");
								}
							
						    flecha=""; if (valorPre.CORRECTA==2) {flecha=lafecha;}
							check=""; if (respondio==2) { check="checked"; }
							if (!((valorPre.RESPUESTA2=='')||(valorPre.RESPUESTA2==null))) {							
								$("#resp"+valorPre.IDPREG).append("       <div class=\"col-sm-3\">"+
										"             <div class=\"radio\"><label><input disabled=\"disabled\" "+check+"  idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_2\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA2+"</span>"+flecha+"</label>"+
										"             </div>"+
										"       </div>");
								}

							check="";if (respondio==3) { check="checked"; }
							flecha=""; if (valorPre.CORRECTA==3) {flecha=lafecha;}
							if (!((valorPre.RESPUESTA3=='')||(valorPre.RESPUESTA3==null))) {							
								$("#resp"+valorPre.IDPREG).append("        <div class=\"col-sm-3\">"+
										"             <div class=\"radio\"><label><input disabled=\"disabled\" "+check+"   idpreg=\""+valorPre.IDPREG+"\" id=\"opcion_"+valorPre.IDPREG+"_3\" name=\"opcion_"+valorPre.IDPREG+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										"                                 <span class=\"lbl fontAmaranth bigger-120\">"+valorPre.RESPUESTA3+"</span>"+flecha+"</label>"+
										"             </div>"+
										"       </div>");;
								}

							check=""; if (respondio==4) { check="checked"; }
							flecha=""; if (valorPre.CORRECTA==4) {flecha=lafecha;}
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


function imprimirDiv(nombre) {
   
	var ficha = document.getElementById(nombre);
	var ventimp = window.open(' ', 'popimpr');
	ventimp.document.write( $("#contpreg").html());
	ventimp.document.close();
	ventimp.print( );
	ventimp.close();
  }
  
