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
	   "                      <select style=\"width:100%;\"class=\"form-control\" id=\"tablas\"></select>"+	
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
	if ($("#modu_bd").val()=="Mysql") {elsql="SELECT table_name, table_name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'sigea' order by table_name;";}     
	    
	$.ajax({
        type: "GET",
        url: 'dameselect.php?sql='+encodeURI(elsql)+"&sel=0&bd="+$("#modu_bd").val(), 
        success: function(data){     
             $("#tablas").html(data);                               
             adaptarSelectBus();   
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
	
	    $('.selectpicker').selectpicker();
	    
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


function elegirima(valor){
	$("#"+elemento).val("menu-icon blue fa "+valor);
	$('#modalDocument').modal("hide"); 
}


function dblclickmodu_tabla(DATO){
    if (!($("#modu_bd").val()==0)) {
      	elemento="modu_tabla";
	    mostrarTablas();
    }
    else
    	{alert ("Seleccione primero la Base de Datos");}
	
}

function dblclickmodu_tablagraba(DATO){
	 if (!($("#modu_bd").val()==0)) {
	      	elemento="modu_tablagraba";
		    mostrarTablas();
	    }
	    else
	    	{alert ("Seleccione primero la Base de Datos");}
}

function copiar(){
	$("#"+elemento).val($("#tablas").val());
	$('#modalDocument').modal("hide"); 
}


function copiarima(){
	$("#"+elemento).val($("#imagenes").val());
	$('#modalDocument').modal("hide"); 
}

function dblclickmodu_imaico(DATO){
	elemento="modu_imaico";
	mostrarico();
}

