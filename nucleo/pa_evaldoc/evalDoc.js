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
		//$(document).bind("contextmenu",function(e){return false;});

		window.location.hash="red";
	    window.location.hash="Red" //chrome
		window.onhashchange=function(){window.location.hash="red";}
		cargandoExamen();
		}); 


function cierraExamen(){
	
	
	var hoy= new Date();
	lahora=hoy.getHours()+":"+hoy.getMinutes();
	lafecha=hoy.getDate()+"/"+hoy.getMonth()+"/"+hoy.getFullYear();
	parametros={
		tabla:"ed_respuestas",
		bd:"Mysql",
		campollave:"concat(MATRICULA,IDDETALLE)",
		valorllave:usuario+iddetalle,		
			TERMINADA:"S"
	};
	$.ajax({
		type: "POST",
		url:"../base/actualiza.php",
		data: parametros,
		success: function(data){     
			$('#dlgcierraExamen').modal("hide");	   			        	
			window.location="grid.php?modulo=pa_evaldoc";							 
		}					     
	}); 

	
    var losdatos=[];
	losdatos[0]=iddetalle+"|"+idgrupo+"|"+$("#obsalum").val();
    var loscampos = ["IDDETALLE","IDGRUPO","DESCRIP",];
		   parametros={
				tabla:"ed_observa",
			 campollave:"IDDETALLE",
			 bd:"Mysql",
			 valorllave:iddetalle,
			 eliminar: "S",
			 separador:"|",
			 campos: JSON.stringify(loscampos),
			 datos: JSON.stringify(losdatos)
		   };

		  $.ajax({
			 type: "POST",
			 url:"../base/grabadetalle.php",
			 data: parametros,
			 success: function(data){				
				 if (data.length>0) {alert ("Ocurrio un error: "+data);}					                      	                                        					          
			 }					     
		 });    	 

}


function cargandoExamen(){
	
	$("#contenido").empty();
	var cad="";
	sq="SELECT * from ed_preguntas order by SECCION, IDP" ;
	cad="<div class=\"widget-box\">"+
		   "<div  style=\"background-color:#000C52;\">"+
		   "   <div class=\"row\">"+
		   "     <div class=\"col-sm-4\">"+"<br/><span id=\"observaciones\"></span>"+
		   "     </div>" +	
		   "     <div class=\"col-sm-4\">"+
		   "     </div>" +	
		   "     <div class=\"col-sm-4\">"+                  
		   "	    <div class=\"fontAmaranthB\" style=\"color:white; font-size:12px;\">ALUMNO: <span style=\"color:white;\">"+nombre+"</span></div>"+
		   " 	    <div class=\"fontAmaranthB\" style=\"color:white; font-size:12px;\">PROFESOR: <span style=\"color:white;\">"+profesord+"</span></div>"+
		   "	    <div class=\"fontAmaranthB\" style=\"color:white; font-size:12px;\">ASIGNATURA: <span style=\"color:white;\">"+materiad+"</span></div>"+
		   "     </div>"+	  
		   "   </div>"+  
	       "</div>"+
		   "<div class=\"widget-body\" style=\"padding:10px;\">"+
				  "<div id=\"itempreg\"></div>"+
				  "<hr/>"+
			      "<div id=\"contpreg\"></div>"+					    			
			"</div>"+
			"<div class=\"widget-header\" style=\"padding:10px;\">"+
				"<button class=\"btn btn-white btn-success btn-bold pull-right\" onclick=\"aparecer(pregactiva,1);\">"+
				"<i class=\"ace-icon fa fa-arrow-right bigger-80 blue\"></i><span id=\"etavanzar\" >Sig</span></button>"+
				"<button  class=\"btn btn-white btn-danger btn-bold pull-right\" onclick=\"aparecer(pregactiva,-1);\">"+
				"<i class=\"ace-icon fa fa-arrow-left bigger-80 red\"></i><span>Atras</span></button>"+
			"</div>"+
		"</div>";
	$("#contenido").append(cad);

	parametros={sql:sq,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function (dataPre) {

		    jQuery.each(JSON.parse(dataPre), function(clave, valorPre) { 
				arr_nombresec[clave]=valorPre.SECCION;
		
			    hide="hide"; color="badge badge-gray";
				if (contPreg==1){ hide=""; pregactiva=1; color="badge badge-yellow";}
				$("#itempreg").append("<span id=\"elitem"+contPreg+"\" idPreg=\""+valorPre.IDP+"\" style=\"cursor:pointer;width:30px;\" class=\"itemPreg "+color+"\" "+
									  "onclick=\"aparecer('"+contPreg+"',0)\" >"+contPreg+"</span>");
				            cadPreg=  "<div id=\"laPregunta"+contPreg+"\" class=\""+hide+"\">"+
									  "   <div class\"row\">"+
									  "      <span class=\"fontRobotoBk\" style=\"font-size:18px;\">"+valorPre.PREGUNTA+"</span>"+
									  "   </div>"+
									  "   <div class=\"row\">";
							if (!((valorPre.RESPUESTA1=='')||(valorPre.RESPUESTA1==null))) {							
							 cadPreg+="       <div class=\"col-sm-3\">"+
									  "             <div class=\"radio\"><label><input onchange=\"cambioRespuesta('"+valorPre.IDP+"','"+contPreg+"','5','"+valorPre.PUNTAJE+"','"+1+"')\" idpreg=\""+valorPre.IDP+"\" id=\"opcion_"+valorPre.IDP+"_5\" name=\"opcion_"+valorPre.IDP+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
									  "                                 <span class=\"lbl fontRoboto bigger-80\">"+valorPre.RESPUESTA1+"</span> <li class=\"fa fa-thumbs-o-up blue\"></li> </label>"+
									  "             </div>"+
									  "       </div>";
							}
							if (!((valorPre.RESPUESTA2=='')||(valorPre.RESPUESTA2==null))) {							
							 cadPreg+="      <div class=\"col-sm-2\">"+
									  "             <div class=\"radio\"><label><input onchange=\"cambioRespuesta('"+valorPre.IDP+"','"+contPreg+"','4','"+valorPre.PUNTAJE+"','"+1+"')\" idpreg=\""+valorPre.IDP+"\" id=\"opcion_"+valorPre.IDP+"_4\" name=\"opcion_"+valorPre.IDP+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
									  "                                 <span class=\"lbl fontRoboto bigger-80\">"+valorPre.RESPUESTA2+"</span> <li class=\"fa fa-thumbs-o-up green\"></li></label>"+
									  "             </div>"+
									  "       </div>";
							}
							if (!((valorPre.RESPUESTA3=='')||(valorPre.RESPUESTA3==null))) {							
							 cadPreg+="       <div class=\"col-sm-2\">"+
									  "             <div class=\"radio\"><label><input onchange=\"cambioRespuesta('"+valorPre.IDP+"','"+contPreg+"','3','"+valorPre.PUNTAJE+"','"+1+"')\" idpreg=\""+valorPre.IDP+"\" id=\"opcion_"+valorPre.IDP+"_3\" name=\"opcion_"+valorPre.IDP+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
									  "                                 <span class=\"lbl fontRoboto bigger-80\">"+valorPre.RESPUESTA3+"</span> <li class=\"fa fa-thumbs-o-up gray\"></li></label>"+
									  "             </div>"+
									  "       </div>";
							}
							if (!((valorPre.RESPUESTA4=='')||(valorPre.RESPUESTA4==null))) {							
							 cadPreg+="      <div class=\"col-sm-2\">"+
									  "             <div class=\"radio\"><label><input onchange=\"cambioRespuesta('"+valorPre.IDP+"','"+contPreg+"','2','"+valorPre.PUNTAJE+"','"+1+"')\" idpreg=\""+valorPre.IDP+"\" id=\"opcion_"+valorPre.IDP+"_2\" name=\"opcion_"+valorPre.IDP+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
									  "                                 <span class=\"lbl fontRoboto bigger-80\">"+valorPre.RESPUESTA4+"</span> <li class=\"fa fa-thumbs-o-down orange\"></label>"+
									  "             </div>"+
									  "       </div>";
							}
							if (!((valorPre.RESPUESTA5=='')||(valorPre.RESPUESTA5==null))) {							
								cadPreg+="      <div class=\"col-sm-3\">"+
										 "             <div class=\"radio\"><label><input onchange=\"cambioRespuesta('"+valorPre.IDP+"','"+contPreg+"','1','"+valorPre.PUNTAJE+"','"+1+"')\" idpreg=\""+valorPre.IDP+"\" id=\"opcion_"+valorPre.IDP+"_1\" name=\"opcion_"+valorPre.IDP+"\" type=\"radio\" class=\"opresp ace input-lg\"/>"+
										 "                                 <span class=\"lbl fontRoboto bigger-80\">"+valorPre.RESPUESTA5+"</span> <li class=\"fa fa-thumbs-o-down red\"></label>"+
										 "             </div>"+
										 "       </div>";
							   }
							cadPreg+="      </div>"+
									  "</div>";
				$("#contpreg").append(cadPreg);
				contPreg++;
			}); 


			sqRes="SELECT * from ed_respuestas WHERE matricula='"+usuario+"' and IDDETALLE='"+iddetalle+"'" ;
			parametros={sql:sqRes,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
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
	cad="<span class=\"fontRobotoBk bigger-100 label label-danger label-white middle\"> SECCIÓN: "+arr_nombresec[item]+"</span><br/>";
	$("#observaciones").html(cad);
}

function aparecer(idpreg,valsum){

	if ((pregactiva+valsum)>=contPreg)  {		
		for (i=0;i<contPreg;i++) {
			if ($("#elitem"+i).hasClass("badge-gray")) {
				alert("Exiten preguntas que no han tenido una respuesta no puede finalizar");
				return 0;
			}
		}
		$("#dlgcierraExamen").empty();
		mostrarConfirm("dlgcierraExamen", "grid_registro", "Finalizar Examen",
									"<span class=\"lead text-danger\"><strong>Antes de finalizar, podría dar una opinion general del maestro"+									
									 "    <textarea id=\"obsalum\" style=\"width:100%; height:100%; resize: none;\"></textarea>",
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


$(document).ready(function(){
	$(".opresp").change(function(){
            alert($(this).val()+" "+$(this).attr("idpreg"));         
		});
});


function cambioRespuesta(idpreg,num,opcion,puntaje,idexa){
	lafecha=dameFecha("FECHAHORA");
    var losdatos=[];
	losdatos[0]=iddetalle+"|"+ciclo+"|"+materia+"|"+profesor+"|"+usuario+"|"+grupo+"|"+idpreg+"|"+opcion+"|"+puntaje+"|"+lafecha+"|"+idgrupo+"|"+ip;
    var loscampos = ["IDDETALLE","CICLO","MATERIA","PROFESOR","MATRICULA","GRUPO","IDPREGUNTA","RESPUESTA","PUNTAJE","FECHA","IDGRUPO","IP"];

		   parametros={
				tabla:"ed_respuestas",
			 campollave:"CONCAT(MATRICULA,IDDETALLE,IDPREGUNTA)",
			 bd:"Mysql",
			 valorllave:usuario+iddetalle+idpreg,
			 eliminar: "S",
			 separador:"|",
			 campos: JSON.stringify(loscampos),
			 datos: JSON.stringify(losdatos)
		   };

		  $.ajax({
			 type: "POST",
			 url:"../base/grabadetalle.php",
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