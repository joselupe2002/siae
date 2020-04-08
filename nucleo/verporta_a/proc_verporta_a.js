

function verPortafolioA(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
			script="<div class=\"modal fade\" id=\"modalDocumentUni\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header widget-header  widget-color-green\">"+
			   "             <span class=\"label label-lg label-primary arrowed arrowed-right\"> Portafolio de Evidencia </span>"+
			   "             <span class=\"label label-lg label-success arrowed arrowed-right\">"+table.rows('.selected').data()[0]["MATERIAD"]+"</span>"+			   
			   "             <input type=\"hidden\" id=\"elid\" value=\""+table.rows('.selected').data()[0]["MATRICULA"]+"\"></input>"+
			   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
			   "                  <span aria-hidden=\"true\">&times;</span>"+
			   "             </button>"+
			   "          </div>"+  
			   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+					 
			   "             <div class=\"row\" style=\"overflow-x: auto; overflow-y: auto; height:100%;\"> "+		
		       "                  <table id=\"tabUnidades\" class= \"table table-condensed table-bordered table-hover\">"+
		   	   "                         <thead>  "+
			   "                               <tr>"+	
			   "                                   <th colspan=\"1\">Encuadre</th> "+
			   "                                   <th colspan=\"1\">Diagn&oacute;stica</th> "+
			   "                             	   <th>NO.</th> "+ 
			   "                                   <th>Unidad</th> "+
			   "                                   <th>Producto</th> "+
			   "                                   <th>Desempe&ntilde;o</th> "+
			   "                                   <th>Conocimiento</th> "+
			   "                                   <th>Actitud</th> "+
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
		 
			
			
	 		 
			 $("#modalDocumentUni").remove();
		    if (! ( $("#modalDocumentUni").length )) {
		        $("#grid_"+modulo).append(script);
		    }

		    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		    
		    $('#modalDocumentUni').modal({show:true, backdrop: 'static'});

		    
	

		    $.ajax({
		           type: "GET",
		           url:  "../base/getdatossql.php?bd=Mysql&sql=SELECT UNID_NUMERO, UNID_DESCRIP, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(UNID_ID,'"+table.rows('.selected').data()[0]["CICLO"]+"','"+table.rows('.selected').data()[0]["MATRICULA"]+"',UNID_MATERIA) and b.AUX='EP'),'') AS RUTAEP, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(UNID_ID,'"+table.rows('.selected').data()[0]["CICLO"]+"','"+table.rows('.selected').data()[0]["MATRICULA"]+"',UNID_MATERIA) and b.AUX='ED'),'') AS RUTAED, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(UNID_ID,'"+table.rows('.selected').data()[0]["CICLO"]+"','"+table.rows('.selected').data()[0]["MATRICULA"]+"',UNID_MATERIA) and b.AUX='EC'),'') AS RUTAEC, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT(UNID_ID,'"+table.rows('.selected').data()[0]["CICLO"]+"','"+table.rows('.selected').data()[0]["MATRICULA"]+"',UNID_MATERIA) and b.AUX='EA'),'') AS RUTAEA, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+table.rows('.selected').data()[0]["CICLO"]+"','"+table.rows('.selected').data()[0]["MATRICULA"]+"',UNID_MATERIA) and b.AUX='ENCUADRE'),'') AS RUTAENCU, "+
		                  "IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=CONCAT('"+table.rows('.selected').data()[0]["CICLO"]+"','"+table.rows('.selected').data()[0]["MATRICULA"]+"',UNID_MATERIA) and b.AUX='DIAGNOSTICA'),'') AS RUTADIAG "+
	                      "  FROM eunidades j "+		                 
		        	      " where j.`UNID_MATERIA`='"+table.rows('.selected').data()[0]["MATERIA"]+"' and j.UNID_PRED=''  order by UNID_NUMERO",
		           success: function(data){  
		        	      losdatos=JSON.parse(data);  
		        	      generaTablaSubir(JSON.parse(data),"CAPTURA");
		        	        		        	    
		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		   });
			   
		    
	}
	else {
		alert ("Debe seleccionar un Mapa Curricular");
		return 0;

		}
	
}


function generaTablaSubir(grid_data, op){		
	ladefault="..\\..\\imagenes\\menu\\pdf.png";
    $("#cuerpoUnidades").empty();
	   $("#tabUnidades").append("<tbody id=\"cuerpoUnidades\">");
       c=0;	
	   globalUni=1; 
	   entre=false;
	   jQuery.each(grid_data, function(clave, valor) { c++;});
	   
       jQuery.each(grid_data, function(clave, valor) { 	
          
          var f = new Date();
		     fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear();
             $("#cuerpoUnidades").append("<tr id=\"rowUni"+c+"\">");
             
             cadEnc="";
			 cadDiag="";
             if (!(entre)) {
				 cadEnc="<a title=\"Ver Archivo de Encuadre\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"A_"+c+"\" href=\""+valor.RUTAENCU+"\">"+
				                " <img width=\"40px\" height=\"40px\" id=\"pdfA_"+c+"_"+valor.ENCU_ID+"\" name=\"pdfA_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
				                " </a>";
				 cadDiag="<a title=\"Ver Archivo de Evidencia Diagn&oacute;stica\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"B_"+c+"\" href=\""+valor.RUTADIAG+"\">"+
	                " <img width=\"40px\" height=\"40px\" id=\"pdfB_"+c+"_"+valor.ENCU_ID+"\" name=\"pdfB_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	                " </a>";
				 
				  $("#rowUni"+c).append("<td style=\"text-align: center; vertical-align: middle;\" rowspan=\""+c+"\">"+cadEnc+"</td>");					
			      $("#rowUni"+c).append("<td style=\"text-align: center; vertical-align: middle;\"  rowspan=\""+c+"\">"+cadDiag+"</td>");
				 
			      if (valor.RUTAENCU=='') { 
			        $('#enlace_'+valor.ENCU_ID+"A_"+c).attr('disabled', 'disabled');
	                $('#enlace_'+valor.ENCU_ID+"A_"+c).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
	                $('#pdfA_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
			      }
			      if (valor.RUTADIAG=='') { 			    	
	                $('#enlace_'+valor.ENCU_ID+"B_"+c).attr('disabled', 'disabled');
	                $('#enlace_'+valor.ENCU_ID+"B_"+c).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
	                $('#pdfB_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
			      }
				 entre=true;
			      }
             
			 $("#rowUni"+c).append("<td>"+valor.UNID_NUMERO+"</td>");
			 $("#rowUni"+c).append("<td title=\""+valor.UNID_DESCRIP+"\">"+valor.UNID_DESCRIP.substring(0,30)+"</td>");	
			

			 $("#rowUni"+c).append("<td> <a title=\"Ver Archivo de Evidencia de Producto\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"1_"+c+"\" href=\""+valor.RUTAEP+"\">"+
	     	  		                " <img width=\"40px\" height=\"40px\" id=\"pdf1_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf1_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	     	 		                " </a>"+
	  	    	                  "</td>");


			 
            $("#rowUni"+c).append("<td> <a title=\"Ver Archivo de Evidencia de Desempe&ntilde;o\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"2_"+c+"\" href=\""+valor.RUTAED+"\">"+
		                " <img width=\"40px\" height=\"40px\" id=\"pdf2_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf2_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
		                " </a>"+
	                  "</td>");

           
            $("#rowUni"+c).append("<td> <a title=\"Ver Archivo de Evidencia de Conocimiento\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"3_"+c+"\" href=\""+valor.RUTAEC+"\">"+
		                " <img width=\"40px\" height=\"40px\" id=\"pdf3_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf3_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
		                " </a>"+
	                  "</td>");


          
            $("#rowUni"+c).append("<td> <a title=\"Ver Archivo de Evidencia de Actitud\" target=\"_blank\" id=\"enlace_"+valor.ENCU_ID+"4_"+c+"\" href=\""+valor.RUTAEA+"\">"+
		                " <img width=\"40px\" height=\"40px\" id=\"pdf4_"+c+"_"+valor.ENCU_ID+"\" name=\"pdf4_"+c+"_"+valor.ENCU_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
		                " </a>"+
	                  "</td>");
	           


			 if (valor.RUTAEP=='') { 
	                $('#enlace_'+valor.ENCU_ID+"1_"+c).attr('disabled', 'disabled');
	                $('#enlace_'+valor.ENCU_ID+"1_"+c).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
	                $('#pdf1_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
	       	    }
			 if (valor.RUTAED=='') { 
				    $('#enlace_'+valor.ENCU_ID+"2_"+c).attr('disabled', 'disabled');
	                $('#enlace_'+valor.ENCU_ID+"2_"+c).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
	                $('#pdf2_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
	       	    }
			 if (valor.RUTAEC=='') { 
				    $('#enlace_'+valor.ENCU_ID+"3_"+c).attr('disabled', 'disabled');
	                $('#enlace_'+valor.ENCU_ID+"3_"+c).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
	                $('#pdf3_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
	       	    }
			 if (valor.RUTAEA=='') { 
				    $('#enlace_'+valor.ENCU_ID+"4_"+c).attr('disabled', 'disabled');
	                $('#enlace_'+valor.ENCU_ID+"4_"+c).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
	                $('#pdf4_'+c+'_'+valor.ENCU_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
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
		
		   }




