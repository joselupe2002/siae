function setAutorizado(id,valor,actualiza){
	 $('#dlgproceso').modal({show:true, backdrop: 'static'});	 
		parametros={
			tabla:"edescarga",
			campollave:"DESC_ID",
			bd:"Mysql",
			valorllave:id,
			DESC_ABIERTA: valor
		};
		$.ajax({
		type: "POST",
		url:"actualiza.php",
		data: parametros,
		success: function(data){
			$('#dlgproceso').modal("hide"); 
			if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
			//else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
			if (actualiza) {
			    window.parent.document.getElementById('FRvedescarga').contentWindow.location.reload();
			}
		}					     
		});    	                
}


function verPlan(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
    "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header widget-header  widget-color-green\">"+
	 
	   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Actividad:"+table.rows('.selected').data()[0]["ACTIVIDAD"]+"</span></b> </span>"+
	   "             <input type=\"hidden\" id=\"elid\" value=\""+table.rows('.selected').data()[0]["ID"]+"\"></input>"+
	   "             <button type=\"button\" class=\"close\"  data-dismiss=\"modal\"   aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "          </div>"+  
	   "          <div id=\"frmdescarga\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto;\" >"+					  
	   "             <div class=\"row\"> "+		
       "                  <table id=\"tabActividad\" class= \"table table-condensed table-bordered table-hover\">"+
	   "                         <thead>  "+
	   "                               <tr>"+
	   "                             	   <th>Op</th> "+
	   "                             	   <th>PDF</th> "+
	   "                             	   <th>R</th> "+//Sirve para le lectura del renglon al momento de validar cruce
	   "                             	   <th>ID</th> "+ 
	   "                                   <th>Orden</th> "+
	   "                                   <th>Actividad</th> "+
	   "                                   <th>Entregable</th> "+
	   "                                   <th>Fecha</th> "+
	   "                               </tr> "+
	   "                         </thead>" +
	   "                   </table>"+	
	   "             </div> "+ //div del row
	   "          </div>"+ //div del modal-body		 
    "          </div>"+ //div del modal content		  
	   "      </div>"+ //div del modal dialog
	   "   </div>"+ //div del modal-fade
	   "</div>";

	
	
	 
	 $("#modalDocument").remove();
 if (! ( $("#modalDocument").length )) {
     $("#grid_"+modulo).append(script);
 }

 $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
 
 $('#modalDocument').modal({show:true, backdrop: 'static'});

 elsql="SELECT count(*) as NUM FROM eplandescarga WHERE PLAN_IDACT='"+table.rows('.selected').data()[0]["ID"]+"'";
 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
 
 $.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){  
     	      losdatos=JSON.parse(data);  
     	        
     	      jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; });
     
     	    	  if (hay>0) {	        	    			        	    	
					   elsql="SELECT *  FROM eplandescarga WHERE PLAN_IDACT='"+table.rows('.selected').data()[0]["ID"]+"' order by PLAN_ORDEN";
					   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
     	    		  $.ajax({
     	   	           type: "POST",
					   data:parametros,   
					   url:  "../base/getdatossqlSeg.php",
     	   	           success: function(data){ 	        	   	        	
     	   	        	     generaTablaActividad(JSON.parse(data));
     	   	                 },
     	   	           error: function(data) {	                  
     	   	                      alert('ERROR: '+data);
     	   	                  }
     	   	          });
     	   	   
     	    	  }

              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
});
	   
}


function generaTablaActividad(grid_data){		
  	 $("#cuerpoActividad").empty();
  	 $("#tabActividad").append("<tbody id=\"cuerpoActividad\">");
      c=1;	
      global=1; 
      ladefault="..\\..\\imagenes\\menu\\pdf.png";
      
  	jQuery.each(grid_data, function(clave, valor) { 	
  		
  		
  	       btnSubir="<button title=\"Subir archivo PDF comprobable de la actividad\" onclick=\"subirArchivo('"+valor.PLAN_ID+"','"+valor.PLAN_ACTIVIDAD+"');\" class=\"btn btn-xs btn-success\"> " +
                     "    <i class=\"ace-icon fa fa-upload bigger-120\"></i>" +
                      "</button>";
	       boton=btnSubir;

	       
           botonPDF="<a target=\"_blank\" id=\"enlace_I_"+valor.PLAN_ID+"\" href=\""+valor.RUTA+"\">"+
	  		        "     <img width=\"40px\" height=\"40px\" id=\"pdf_"+valor.PLAN_ID+"\" name=\"pdf_"+valor.PLAN_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	 		        "</a>";

	 	   botonPDF+="<input type=\"hidden\" value=\""+valor.RUTA+"\"  name=\"I_"+valor.PLAN_ID+"\" id=\"I_"+valor.PLAN_ID+"\"  placeholder=\"\" />";    

	   	 
	   	 $("#cuerpoActividad").append("<tr id=\"row"+c+"\">");
	   	 $("#row"+c).append("<td>"+btnSubir+"</td>");
	   	 $("#row"+c).append("<td>"+botonPDF+"</td>");
	   	 $("#row"+c).append("<td>"+c+"</td>");
	     $("#row"+c).append("<td>SC</td>");	
	     $("#row"+c).append("<td id=\"a_"+c+"_1\">"+valor.PLAN_ORDEN+"</td>");		
	   	 $("#row"+c).append("<td id=\"a_"+c+"_2\">"+valor.PLAN_ACTIVIDAD+"</td>");	
	   	 $("#row"+c).append("<td id=\"a_"+c+"_3\">"+valor.PLAN_ENTREGABLE+"</td>");	
		 $("#row"+c).append("<td id=\"a_"+c+"_4\">"+valor.PLAN_FECHAENTREGA+"</td>");	  	
		 
		 
		 if (valor.RUTA=='') { 								
			$('#enlace_I_'+valor.PLAN_ID).click(function(evt) {evt.preventDefault();});			
			$("#pdf_"+valor.PLAN_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");	                        		                       	                    
		  }

  		c++;
  		global=c;
  	});
  }



function subirArchivo (id,actividad) {

	ladefault="..\\..\\imagenes\\menu\\pdf.png";
	script="<div class=\"modal fade\" id=\"modalFile\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
    "   <div class=\"modal-dialog modal-sm \" role=\"document\">"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header\">"+
	   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-thumb-tack\"></i><span class=\"menu-text\"> Actividad: "+actividad+"</span></b> </span>"+
	   "             <input type=\"hidden\" id=\"elidfile\" value=\""+id+"\"></input>"+
	   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "             <div class=\"row\"> "+			
       "                 <div class=\"col-sm-12\"> "+			   
	    "                       <div class=\"widget-box widget-color-green2\"> "+
		"                              <div class=\"widget-header\">"+
		"	                                <h4 class=\"widget-title lighter smaller\">Subir Archivo PDF</h4>"+
		"                              </div>"+
		"                              <div id =\"elarchivo\" style=\"overflow-y: auto;height:200px;width:100%;\">"+
		"                                  <div class=\"row\" style=\"width:90%;\">"+
		"                                    <div class=\"col-sm-1\"></div>"+
		"                                    <div class=\"col-sm-10\">"+
		"                                        <input class=\"fileSigea\" type=\"file\" id=\"file_"+id+"\" name=\"file_"+id+"\""+
	        "                                        onchange=\"subirPDFDriveSave('file_"+id+"','ACTDESCARGA','pdf_"+id+"','I_"+id+"','pdf','S','PLAN_ID','"+id+"','"+actividad+"','eplandescarga','edita','');\">"+
	        "                                    <\div>"+  
	        "                                    <div class=\"col-sm-1\"></div>"+	         	                                     
	        "                                  <\div>"+
	        "                                  <div class=\"row\">"+
	        "                                      <a target=\"_blank\" id=\"enlace_I_"+id+"_2\" href=\"\">"+
	    "                                          <img width=\"40px\" height=\"40px\" id=\"pdf_"+id+"_2\" name=\"pdf_"+id+"_2\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
        "                                      </a>"+
        "                                  <\div>"+
			"                              </div>"+
	    "                       </div>"+
	    "                 </div>"+
	    "             </div>"+	    
       "          </div>"+
	   "      </div>"+
	   "   </div>"+
	   "</div>";
	   
	 $("#modalFile").remove();
	 if (! ( $("#modalFile").length )) {$("body").append(script);}
	    
	 $('#modalFile').modal({show:true, backdrop: 'static', keyboard: false});

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


function abrircerrarPlan(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["ABIERTA"]=='N') {
			if (confirm("Desea Abrir captura de Plan para actividad de descarga: "+table.rows('.selected').data()[0]["ACTIVIDAD"])) {
				setAutorizado(table.rows('.selected').data()[0][0],"S",true);
			}
		}
		else {
			if (confirm("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" Esta abierta ¿Desea cerrar la captura de Plan?")) {
				setAutorizado(table.rows('.selected').data()[0][0],"N",true);
			}
		} 
	 
	}
	else {
		alert ("Debe seleccionar una actividad de descarga");
		return 0;

		}
	
}


function abrirTodo(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();	
	table.rows().iterator('row', function(context, index){		
	    var node = $(this.row(index).node());
	    setAutorizado(node.find("td").eq(0).html(),'S',false);
	    node.find("td").eq(1).html("S");
	});
 window.parent.document.getElementById('FRecomplementaria').contentWindow.location.reload();
}

function cerrarTodo(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();	
	table.rows().iterator('row', function(context, index){		
	    var node = $(this.row(index).node());
	    setAutorizado(node.find("td").eq(0).html(),'N',false);
	    node.find("td").eq(1).html("N");
	});
	window.parent.document.getElementById('FRecomplementaria').contentWindow.location.reload();
}



