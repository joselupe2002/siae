

function boletaResidencia(modulo,usuario,institucion, campus,essuper){
 	 table = $("#G_"+modulo).DataTable();
	 	  
	  if (table.rows('.selected').data().length>0) {
		window.open("../residencias/boletaRes.php?ID="+table.rows('.selected').data()[0]["IDPROY"]+"&concal=N", '_blank');
		$('#modalDocument').modal("hide");  

	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}

      return false;
}


function boletaResidenciaCal(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
		 
	if (table.rows('.selected').data().length>0) {
	  window.open("../residencias/boletaRes.php?ID="+table.rows('.selected').data()[0]["IDPROY"]+"&concal=S", '_blank');
	  $('#modalDocument').modal("hide");  

  }
  else {
	  alert ("Debe seleccionar un registro");
	  return 0;

	  }

	return false;
}


function liberacionRes(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	elanio = new Date().getFullYear();	 

	if (table.rows('.selected').data().length>0) {
		$.ajax({
			type: "POST",
			url:"../base/getConsecutivo.php?tabla=econsoficial&campok=concat(TIPO,ANIO)&campocons=CONSECUTIVO&valork=LIBRESIDENCIA"+elanio,
			success: function(data){
				micons=data;
				window.open("../residencias/liberacion.php?ID="+table.rows('.selected').data()[0]["IDRES"]+"&consec="+micons+"&anio="+elanio, '_blank');
				$('#modalDocument').modal("hide");  
			}					     
		});

	

  }
  else {
	  alert ("Debe seleccionar un registro");
	  return 0;

	  }

	return false;
}





function verAdjRes  (modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	miciclo=table.rows('.selected').data()[0]["CICLO"];
	matricula=table.rows('.selected').data()[0]["MATRICULA"];
	if (table.rows('.selected').data().length>0) {
			script="<div class=\"modal fade\" id=\"adjuntos\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header widget-header  widget-color-green\">"+
			   "             <span class=\"label label-lg label-primary arrowed arrowed-right\"> Documentos Adjuntados </span>"+
			   "             <span class=\"label label-lg label-success arrowed arrowed-right\">"+table.rows('.selected').data()[0]["NOMBRE"]+"</span>"+			   
			   "             <input type=\"hidden\" id=\"elid\" value=\""+table.rows('.selected').data()[0]["ID"]+"\"></input>"+
			   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
			   "                  <span aria-hidden=\"true\">&times;</span>"+
			   "             </button>"+
			   "          </div>"+  
			   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+					 
			   "             <div class=\"row\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\"> "+		
		       "                  <table id=\"tabAsp\" class= \"table table-condensed table-bordered table-hover\">"+
		   	   "                         <thead>  "+
			   "                               <tr>"+	
			   "                                   <th>Documento</th> "+
			   "                             	   <th>PDF</th> "+ 
			   "                               </tr> "+
			   "                         </thead>" +
			   "                   </table>"+	
			   "             </div> "+ //div del row
			   "             <div class=\"space-10\"></div>"+		   
			   "          </div>"+ //div del modal-body		 
		       "          </div>"+ //div del modal content		  
			   "      </div>"+ //div del modal dialog
			   "   </div>"+ //div del modal-fade
			   "</div>";
		 
		
	 		 
			 $("#adjuntos").remove();
		    if (! ( $("#adjuntos").length )) {
		        $("#grid_"+modulo).append(script);
		    }

		    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		    
		    $('#adjuntos').modal({show:true, backdrop: 'static'});

			sqlAsp="SELECT 'CARTA DE PRESENTACIÓN' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_CARTAPRES'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'CARTA DE ACEPTACIÓN' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_CARTAACEP'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'PRIMERA EVALUACIÓN' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_EVAL1'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'SEGUNDA EVALUACIÓN' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_EVAL2'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'EVALUACIÓN FINAL' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_EVALF'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'REPORTE TÉCNICO' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_REPTEC'),'') AS RUTA FROM DUAL  ";										


			parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
		        	      losdatos=JSON.parse(data);  
						  ladefault="..\\..\\imagenes\\menu\\pdf.png";
						  $("#cuerpoAsp").empty();
						  $("#tabAsp").append("<tbody id=\"cuerpoAsp\">");
						  c=0;	
						  globalUni=1; 
						  grid_data=JSON.parse(data);	  
						  jQuery.each(grid_data, function(clave, valor) { 	
							 
								$("#cuerpoAsp").append("<tr id=\"rowAsp"+c+"\"></tr>");								
								$("#rowAsp"+c).append("<td>"+valor.REPORTE+"</td>");	
							   
								cadEnc="<a title=\"Ver Archivo Adjunto\" target=\"_blank\" id=\"enlace_"+c+"\" href=\""+valor.RUTA+"\">"+
												   " <img width=\"40px\" height=\"40px\" id=\"pdf"+c+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
												   " </a>";		
									
							   $("#rowAsp"+c).append("<td style=\"text-align: center; vertical-align: middle;\">"+cadEnc+"</td>");					
									
							   
								if ((valor.RUTA=='')||(valor.RUTA==null)) { 				    
									   $('#enlace_'+c).attr('disabled', 'disabled');
									   $('#enlace_'+c).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
									   $('#pdf'+c).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
									 }
				   
								   c++;
									  globalUni=c;
				   
									  
								  });
				   
					   $('.fileSigea').ace_file_input({
						   no_file:'Sin archivo ...',
						   btn_choose:'Buscar',
						   btn_change:'Cambiar',
						   droppable:false,
						   onchange:null,
						   thumbnail:false, //| true | large
						   whitelist:'pdf',
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
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	
}
