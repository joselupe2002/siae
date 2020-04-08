var
elemento="";
base="-1";
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
	        $("#cuerpoALL_COL_COMMENT").append(script);
	    }
	    
	    $('#modalDocument').modal({show:true});
	
	  elsqlLite="SELECT name, name||'|'||'0' FROM sqlite_master WHERE type  IN ('table','view');";   
	  elsqlMy="SELECT table_name, concat(table_name,'|','1') FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'sigea' "+
        " UNION SELECT table_name, concat(table_name,'|','2') FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = 'sigea' order by 1";  
	    
	$.ajax({
        type: "GET",
        url: 'dameselect.php?sql='+encodeURI(elsqlLite)+"&sel=0&bd=SQLite", 
        success: function(data){     
             $("#tablas").append(data); 
             $.ajax({
                 type: "GET",
                 url: 'dameselect.php?sql='+encodeURI(elsqlMy)+"&sel=0&bd=Mysql", 
                 success: function(data){     
                       $("#tablas").append(data); 
                     	$('.chosen-select').chosen({allow_single_deselect:true}); 			 				
          				$(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this);$this.next().css({'width': "100%"});})}).trigger('resize.chosen'); 				 
          				$(document).on('settings.ace.chosen', function(e, event_name, event_val) {if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this);$this.next().css({'width': "100%"});})});
          				
              },
              error: function(data) {
                 alert('ERROR: '+data);
              }
            }); 
             
    },
     error: function(data) {
        alert('ERROR: '+data);
     }
   }); 
}


//SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'sigea' AND TABLE_NAME = 'veciclmate'

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

function gifclicadd(){
	elemento="gif";
	mostrarico();
}


function table_nameclicadd(){
	elemento="table_name";
    mostrarTablas();
}

function copiar(){
	$("#"+elemento).val($("#tablas").val());
	$('#modalDocument').modal("hide"); 
	base=$('#tablas option:selected').html().split("|")[1];
}

function elegirima(valor){
	$("#"+elemento).val(valor);
	$('#modalDocument').modal("hide"); 
	
	
}



function colum_nameclicadd(){
	elemento="colum_name";
    mostrarCampos();
}

function copiarCampos(){
	$("#"+elemento).val($("#campos").val());
	$('#modalDocument').modal("hide"); 
}

function mostrarCampos(){
	script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
    "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header\">"+
	   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "             <div class=\"row\"> "+			
       "                 <div class=\"col-sm-4\"> "+			   
	   "                      <select style=\"width:100%;\"class=\"chosen-select form-control\" id=\"campos\"></select>"+	
	   "                  </div>"+
	   "                 <div class=\"col-sm-2\"> "+
	   "                      <button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"copiarCampos();\">"+
	   "                            <i class=\"ace-icon fa fa-plus bigger-120 blue\"></i>Seleccionar Tabla</button>"+
	   "                 </div>"+
	   "            </div>"+
	   "          </div>"+
	   "      </div>"+
	   "   </div>"+
	   "</div>";
	
	 
	 $("#modalDocument").remove();
	 if (! ( $("#modalDocument").length )) {
	        $("#cuerpoALL_COL_COMMENT").append(script);
	    }
	    
	    $('#modalDocument').modal({show:true});
	
	    nombd="Mysql"; sql="SELECT COLUMN_NAME, COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'sigea' AND TABLE_NAME = '"+$("#table_name").val()+"'";
		if (base==0) {nombd="SQLite"; sql="";}
	  
		$.ajax({
	        type: "GET",
	        url: 'dameselect.php?sql='+encodeURI(sql)+"&sel=0&bd="+nombd, 
	        success: function(data){     
	             $("#campos").html(data);             
	    },
	     error: function(data) {
	        alert('ERROR: '+data);
	     }
	   }); 
		
}

