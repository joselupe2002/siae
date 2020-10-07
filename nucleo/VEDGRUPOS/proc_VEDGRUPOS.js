
var cargandoSubtemas=true;
var cargandoTemas=true;

function grupoBase(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+
		   "             <b><span class=\"text-success\">"+table.rows('.selected').data()[0]["CVE_MAT"]+" "+table.rows('.selected').data()[0]["MATERIA"]+" ("+table.rows('.selected').data()[0]["PROFESOR"]+")"+"</b>"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\">"+	
           "                    <select  style=\"width:100%;\" class=\"chosen-select form-control\" name=\"gbase\"  id=\"gbase\" data-placeholder=\"Elija una Opci&oacute;-->\">\n"+
           "                    </SELECT></div>"+
           
           "                           <div class=\"row\"> "+	
           "                                <div class=\"col-sm-3\"> </div>"+
	       "                                <div class=\"col-sm-6\" style=\"text-align:center;\"> "+
		   "                                      <button type=\"button\" class=\"btn btn-white btn-success btn-bold\" onclick=\"asignarbase();\">"+
		   "                                      <i class=\"ace-icon fa fa-floppy-o bigger-120 success\"></i>Asignar Grupo Base</button>"+
		   "                                 </div>"+
		   "                                <div class=\"col-sm-3\"> </div>"+
		   "                           </div><br/><br/>"+		   
		   
		   "      </div>"+
		   "   </div>"+
		   " <select id=\"aulas\" style=\"visibility:hidden\"></select> "
		   "</div>";
	 
		 $("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	    }
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
       	 

	    elsql="select a.`IDDETALLE`, CONCAT(a.MATERIA,' ',a.`MATERIAD`,' (', a.`PROFESORD`,') ',a.`CARRERA`)  from `vedgrupos` a where a.`CICLO`='" +table.rows('.selected').data()[0]["CICLO"]+"'";
        parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}
 
	    $.ajax({
				 type: "POST",				 
                 data:parametros,
	        	 url:  "../base/dameselectSeg.php",
	        	 success: function(data){ 		        		
	        		  $("#gbase").html(data); 
	                  $('#gbase').trigger("chosen:updated");
	                  $('.chosen-select').chosen({allow_single_deselect:true}); 			
	          		  $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
	          		  $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});
	          		
	        	   	                 },
	        	 error: function(data) {	                  
	        	   	                      alert('ERROR: '+data);
	        	   	                  }
	          });
	        	   	   
	    
	   
		
	}
	else {
		alert ("Debe seleccionar un grupo");
		return 0;

		}
	
}

function verPlanea(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	verPlaneacion(table.rows('.selected').data()[0]["CVE_MAT"],table.rows('.selected').data()[0]["MATERIA"],
	table.rows('.selected').data()[0]["GRUPO"],table.rows('.selected').data()[0]["CICLO"],"grid_VEDGRUPOS",'S');
}

function verEncuadre(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	enlace="nucleo/pd_portasegui/encuadres.php?ID="+table.rows('.selected').data()[0]["IDDET"]+"&materiad="+table.rows('.selected').data()[0]["MATERIA"];
	abrirPesta(enlace,'Encuadre')
}

function verPlanImp(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	enlace="nucleo/pd_portasegui/planeacion.php?ID="+table.rows('.selected').data()[0]["IDDET"]+"&materia="+table.rows('.selected').data()[0]["MATERIA"];
	abrirPesta(enlace,'Planeacion');

}


function VerHorario(modulo,usuario,institucion, campus,essuper){	

	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
	    enlace="nucleo/vcargasprof/horario.php?ID="+table.rows('.selected').data()[0]["EMPL"]+"&ciclod="+table.rows('.selected').data()[0]["CICLO"]+"&ciclo="+table.rows('.selected').data()[0]["CICLO"];
		abrirPesta(enlace,'Planeacion');
	}

	else {
		alert ("Debe seleccionar un profesor");
		return 0;
		}

}


function verLista(modulo,usuario,institucion, campus,essuper){	

	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		enlace="nucleo/pd_listas/listaAsis.php?id="+table.rows('.selected').data()[0]["IDDET"]+"&ciclo="+table.rows('.selected').data()[0]["CICLO"];
		abrirPesta(enlace,"Lista-"+table.rows('.selected').data()[0]["IDDET"]);
	}

	else {
		alert ("Debe seleccionar un profesor");
		return 0;
		}

}





function verRepUni(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	window.open("../pd_captcal/repUni.php?materia="+table.rows('.selected').data()[0]["CVE_MAT"]+
	            "&grupo="+table.rows('.selected').data()[0]["GRUPO"]+
				"&ciclo="+table.rows('.selected').data()[0]["CICLO"]+
				"&profesor="+table.rows('.selected').data()[0]["EMPL"]+
				"&id="+table.rows('.selected').data()[0]["IDDET"]+
				"&materiad="+table.rows('.selected').data()[0]["MATERIA"]+
				"&semestre=1","_blank");
}



function asignarbase(){
	
	if ($("#gbase").val()>0) {
		
		
        parametros={
	    tabla:"edgrupos",
	    campollave:"DGRU_ID",
	    bd:"Mysql",
	    valorllave:table.rows('.selected').data()[0]["IDDET"],
	    DGRU_BASE:$("#gbase").val()
        };
        $.ajax({
			type: "POST",
			url:"actualiza.php",
			data: parametros,
			success: function(data){
				$('#modalDocument').modal("hide");  
				$('#dlgproceso').modal("hide"); 
				alert (data);                               	                                        					          
            }					     
        });    	  
	}
	else 
		alert ("Debe elegir una materia que será la base de la asignatura: "+table.rows('.selected').data()[0]["MATERIA"]);
	
}




function verPortaGrupo(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
			script="<div class=\"modal fade\" id=\"modalDocumentUni\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header widget-header  widget-color-green\">"+
			   "             <span class=\"label label-lg label-primary arrowed arrowed-right\"> Portafolio de Evidencia </span>"+
			   "             <span class=\"label label-lg label-success arrowed arrowed-right\">"+table.rows('.selected').data()[0]["MATERIA"]+"</span>"+			   
			   "             <input type=\"hidden\" id=\"elid\" value=\""+table.rows('.selected').data()[0]["IDDET"]+"\"></input>"+
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

		    
	        elsql="SELECT ENCU_ID, UNID_NUMERO, UNID_DESCRIP, "+
			"IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_ID and b.AUX='EP'),'') AS RUTAEP, "+
			"IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_ID and b.AUX='ED'),'') AS RUTAED, "+
			"IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_ID and b.AUX='EC'),'') AS RUTAEC, "+
			"IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_ID and b.AUX='EA'),'') AS RUTAEA, "+
			"IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_IDDETGRUPO and b.AUX='ENCUADRE'),'') AS RUTAENCU, "+
			"IFNULL((SELECT RUTA FROM eadjuntos b where b.ID=k.ENCU_IDDETGRUPO and b.AUX='DIAGNOSTICA'),'') AS RUTADIAG "+
			"  FROM eunidades j "+
			" join encuadres k on (j.UNID_ID=k.`ENCU_IDTEMA` and k.`ENCU_IDDETGRUPO`="+table.rows('.selected').data()[0]["IDDET"]+")"+
			" where j.`UNID_MATERIA`='"+table.rows('.selected').data()[0]["CVE_MAT"]+"' and j.UNID_PRED=''  order by UNID_NUMERO";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
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




