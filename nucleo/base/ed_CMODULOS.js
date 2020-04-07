var
elemento="";
function mostrarTablas(){
	script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
    "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header\">"+
	   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "             <div class=\"row\"> "+			
       "                 <div class=\"col-sm-4\"> "+			   
	   "                      <select style=\"width:100%;\"class=\"chosen-select form-control\" id=\"tablas\"></select>"+	
	   "                  </div>"+
	   "                 <div class=\"col-sm-2\"> "+
	   "                      <button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"copiar();\">"+
	   "                            <i class=\"ace-icon fa fa-plus bigger-120 blue\"></i>Seleccionar Tabla</button>"+
	   "                 </div>"+
	   "            </div>"+
	   "          </div>"+
	   "      </div>"+
	   "   </div>"+
	   "</div>";
	
	 $("#modalDocument").remove();
	 if (! ( $("#modalDocument").length )) {
	        $("#cuerpoCMODULOS").append(script);
	    }
	    
	    $('#modalDocument').modal({show:true});
	
	if ($("#modu_bd").val()=="SQLite") {elsql="SELECT name, name FROM sqlite_master WHERE type  IN ('table','view');";}    
	if ($("#modu_bd").val()=="Mysql") {elsql="SELECT table_name, table_name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'sigea' "+
        " UNION SELECT table_name, table_name FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = 'sigea' order by 1";}     
	$.ajax({
        type: "GET",
        url: 'dameselect.php?sql='+encodeURI(elsql)+"&sel=0&bd="+$("#modu_bd").val(), 
        success: function(data){     
             $("#tablas").html(data);                               
             if(!ace.vars['touch']) {
 				
            	$('.chosen-select').chosen({allow_single_deselect:true}); 			
 				
 				$(window).off('resize.chosen').on('resize.chosen', function() {
 					       $('.chosen-select').each(function() {
 						         var $this = $(this);
 						         $this.next().css({'width': "100%"});
 						         })
 						         }).trigger('resize.chosen');
 				 
 				$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
 					                 if(event_name != 'sidebar_collapsed') return; 
 							             $('.chosen-select').each(function() {  
 								              var $this = $(this);
 								              $this.next().css({'width': "100%"});
 								          })
 						          });
 			}
     },
     error: function(data) {
        alert('ERROR: '+data);
     }
   }); 
}




function mostrarico(){
	script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
    "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header\">"+
	   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "             <div class=\"row\"> "+			
       "                 <div class=\"col-sm-12\"> "+			   
	    "                       <div class=\"widget-box widget-color-green2\"> "+
		"                              <div class=\"widget-header\">"+
		"	                                <h4 class=\"widget-title lighter smaller\">Iconos</h4>"+
		"                              </div>"+
		"                              <div style=\"overflow-y: auto;height:200px;width:100%;\">"+
		"		                                   <ul id=\"tree\"></ul>"+
		"                              </div>"+
	    "                       </div>"+
	    "                 </div>"+
	    "             </div>"+	    
       "          </div>"+
	   "      </div>"+
	   "   </div>"+
	   "</div>";
	   $("#modalDocument").remove();
	   
	    if (! ( $("#modalDocument").length )) { $("body").append(script);}
	    

	    $('#modalDocument').modal({show:true});
	    
	elsql="SELECT nombre, nombre, icon FROM ICONOS order by 1";  
	    
	$.ajax({
        type: "GET",
        url: 'dameselectima.php?sql='+encodeURI(elsql)+"&sel=0&bd=SQLite&tipo=tree", 
        success: function(data){  
        	$("#tree").html(data);
     },
     error: function(data) {
        alert('ERROR: '+data);
     }
   }); 
}

function modu_imaicoclicadd(){
	elemento="modu_imaico";
	mostrarico();
}


function modu_tablaclicadd(){
	 if (!($("#modu_bd").val()==0)) {
	      	elemento="modu_tabla";
		    mostrarTablas();
	    }
	    else
	    	{alert ("Seleccione primero la Base de Datos");}
}

function modu_tablagrabaclicadd(){
	 if (!($("#modu_bd").val()==0)) {
	      	elemento="modu_tablagraba";
		    mostrarTablas();
	    }
	    else
	    	{alert ("Seleccione primero la Base de Datos");}
}


function elegirima(valor){
	$("#"+elemento).val("menu-icon blue "+valor);
	$('#modalDocument').modal("hide"); 
}


function copiar(){
	$("#"+elemento).val($("#tablas").val());
	$('#modalDocument').modal("hide"); 
}


function copiarima(){
	$("#"+elemento).val($("#imagenes").val());
	$('#modalDocument').modal("hide"); 
}

/*
function dblclickmodu_imaico(DATO){
	elemento="modu_imaico";
	mostrarico();
}
*/

