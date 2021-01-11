var globlal;
var parte0="<div style=\"width:150px; padding-left:10px;padding-right:10px;padding-top:0; padding-bottom:0;\"><div class=\"row\">" +
		   "     <div class=\"col-md-5\" style=\"padding: 0;\"><select style=\"width:100%; font-size:11px;  font-weight:bold; color:#0E536C;\"";
var parte1="</div><div class=\"col-md-7\" style=\"padding: 0;\">" +
		   " <input class= \"small form-control input-mask-horario\" style=\"width:100%;  " +
		                    " font-size:11px;  font-weight:bold; color:#03661E; height: 30px;\" type=\"text\"";
var parte2="</input></div></div></td>";

function reporteAsesorias(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	 claveProf="";
	 nombreProf="";
	 sq="SELECT CONCAT(EMPL_NUMERO,'|',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) FROM pempleados where EMPL_USER='"+usuario+"'";
	 parametros={sql:sq,dato:sessionStorage.co,bd:"Mysql",numcol:'0',numlin:'0'}

	 $.ajax({
		 type: "POST",
		 data:parametros,
    	 url:  "../base/damedatolin.php",
    	 success: function(data){ 	        	    		                 
    	   	        	     claveProf=data.split("|")[0];
    	   	        	     nombreProf=data.split("|")[1];
    	   	        	     
    	   	    script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
    	   		       "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
    	   		       "      <div class=\"modal-content\">"+
    	   			   "          <div class=\"modal-header\" >"+
    	   			   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Profesor: "+claveProf+"-"+nombreProf+"</span></b> </span>"+
    	   			   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
    	   			   "                  <span aria-hidden=\"true\">&times;</span>"+
    	   			   "             </button>"+
    	   			   "          </div>"+
    	   			   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:140px;\">"+
    	   			   "              <div class=\"row\"> "+
  	   		           "                    <div class=\"col-sm-3\"> "+
  	   		           "                        <span class=\"text-primary\"><b>Ciclo</b></span>"+
	   		           "                    </div>"+
  	   		           "                    <div class=\"col-sm-3\"> "+
  	   		           "                        <span class=\"text-primary\"><b>Mes</b></span>"+
  	   	    	       "                    </div>"+
    	   		       "                    <div class=\"col-sm-3\"> "+
    	   		       "                        <span class=\"text-primary\"><b>Periodo</b></span>"+
	   		           "                    </div>"+
	   		           "                    <div class=\"col-sm-3\"> "+
	   		           "                        <span class=\"text-primary\"><b>Tipo Asesoria</b></span>"+
	   		           "                    </div>"+
	   		           "              </div>"+
    	   		       "              <div class=\"row\"> "+
    	   		       "                    <div class=\"col-sm-3\"> "+
 	   		           "                         <select id=\"ciclo\" class=\"form-control\">"+
 	   		           "                         </select>"+
  	   		           "                    </div>"+
    	   		       "                    <div class=\"col-sm-3\"> "+
    	   		       "                         <select id=\"mes\" class=\"form-control\">"+
    	   		       "                                <option value='1'>ENERO</option>"+
    	   		       "                                <option value='2'>FEBRERO</option>"+
    	   		       "                                <option value='3'>MARZO</option>"+
    	   		       "                                <option value='4'>ABRIL</option>"+
    	   		       "                                <option value='5'>MAYO</option>"+
    	   		       "                                <option value='6'>JUNIO</option>"+
    	   		       "                                <option value='7'>JULIO</option>"+
    	   		       "                                <option value='8'>AGOSTO</option>"+
    	   		       "                                <option value='9'>SEPTIEMBRE</option>"+
    	   		       "                                <option value='10'>OCTUBRE</option>"+
    	   		       "                                <option value='11'>NOVIEMBRE</option>"+
    	   		       "                                <option value='12'>DICIEMBRE</option>"+
    	   		       "                                <option value='%'>TODOS</option>"+
    	   		       "                         </select>"+
     	   		       "                    </div>"+
      	   		       "                    <div class=\"col-sm-3\"> "+
 	   		           "                         <select  id=\"anio\"  class=\"form-control\">"+
 	   		           "                          </select>"+
 	   		           "                    </div>"+
 	   		           "                    <div class=\"col-sm-3\"> "+
	   		           "                         <select  id=\"tipoas\"  class=\"form-control\">"+
	   		           "                          </select>"+
	   		           "                    </div>"+
	   		           "              </div>"+
	   		           "              <div class=\"space-8\"></div>"+
	   		           "              <div class=\"row\"> "+
	   		           "                    <div class=\"col-sm-5\"> </div>"+ 
 	   		           "                    <div class=\"col-sm-2\"> "+ 	   		           
 	   		           "                          <div class=\"col-sm-1\" style=\"padding-top:0px;\"> "+
 	   		           "                                <button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"generarReporte();\">"+
 	   		           "                                <i class=\"ace-icon fa fa-plus bigger-120 blue\"> Generar Reporte</i></button>"+
 	   		           "                          </div>"+
 	   		           "                    </div>"+
 	   		           "                    <div class=\"col-sm-5\"> </div>"+ 
    	   		       "              </div>"+
    	   			   "          </div>"+
    	   			   "      </div>"+
    	   			   "   </div>"+    	   			 
    	   			   "</div>";
    	   		 
    	   			 $("#modalDocument").remove();
    	   		    if (! ( $("#modalDocument").length )) {
    	   		        $("#grid_"+modulo).append(script);
    	   		    }
					   
					elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='TIPOASESORIAS'";
					parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}
									   
    	   		     $.ajax({
					   type: "POST",
					   data:parametros,
    		           url:  "../base/dameselectSeg.php",
    		           success: function(data){
    		        	   $("#tipoas").html(data);   
    		        	   $("#tipoas").append("<option value=\"%\">Todos</option>") 
    		           }
    		         });
						
					 elsql2="SELECT DISTINCT(ASES_CICLO), CONCAT(ASES_CICLO,' ',ASES_CICLOD) FROM vasesorias ORDER BY ASES_CICLO DESC";
					parametros2={sql:elsql2,dato:sessionStorage.co,bd:"Mysql",sel:'0'}

    	   		     $.ajax({
						   type: "POST",
						   data:parametros2,
   		                	url:  "../base/dameselectSeg.php",
   		                	success: function(data){
   		        	       		$("#ciclo").html(data);   
   		                	}
   		            });
						
					   elsql3="SELECT DISTINCT(ANIO), ANIO FROM vasesorias";
					   parametros3={sql:elsql3,dato:sessionStorage.co,bd:"Mysql",sel:'0'}

    	   		  $.ajax({
						 type: "POST",
						 data:parametros3,
 		                url:  "../base/dameselectSeg.php",
 		                success: function(data){
 		        	       $("#anio").html(data);   
 		                }
 		            });
    		    
    	   		    
    	   		    $('#modalDocument').modal({show:true, backdrop: 'static'});
    	   	       	    	   		 
    	   	        	     
    	   	                 },
    	 error: function(data) {	                  
    	   	                      alert('ERROR: '+data);
    	   	                  }
      });    
}



function reporteAsesoriasJefe(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	 script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
	       "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\" >"+
		   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"></span></b> </span>"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:330px;\">"+
		   "              <div class=\"row\"> "+
		   "                     <div class=\"col-sm-4\"> "+
	       "                        <span class=\"text-primary\"><b>Profesor</b></span>"+
	       "                    </div>"+
           "                    <div class=\"col-sm-2\"> "+
           "                        <span class=\"text-primary\"><b>Ciclo</b></span>"+
           "                    </div>"+
           "                    <div class=\"col-sm-2\"> "+
           "                        <span class=\"text-primary\"><b>Mes</b></span>"+
	       "                    </div>"+
	       "                    <div class=\"col-sm-2\"> "+
	       "                        <span class=\"text-primary\"><b>Periodo</b></span>"+
           "                    </div>"+
           "                    <div class=\"col-sm-2\"> "+
           "                        <span class=\"text-primary\"><b>Tipo Asesoria</b></span>"+
           "                    </div>"+
           "              </div>"+
	       "              <div class=\"row\"> "+
	       "                    <div class=\"col-sm-4\"> "+
           "                         <select id=\"profesor\"  class=\"chosen-select form-control text-success\" style=\"color:blue;\">"+
           "                         </select>"+
           "                    </div>"+
	       "                    <div class=\"col-sm-2\"> "+
           "                         <select id=\"ciclo\" class=\"form-control\">"+
           "                         </select>"+
           "                    </div>"+
	       "                    <div class=\"col-sm-2\"> "+
	       "                         <select id=\"mes\" class=\"form-control\">"+
	       "                                <option value='1'>ENERO</option>"+
	       "                                <option value='2'>FEBRERO</option>"+
	       "                                <option value='3'>MARZO</option>"+
	       "                                <option value='4'>ABRIL</option>"+
	       "                                <option value='5'>MAYO</option>"+
	       "                                <option value='6'>JUNIO</option>"+
	       "                                <option value='7'>JULIO</option>"+
	       "                                <option value='8'>AGOSTO</option>"+
	       "                                <option value='9'>SEPTIEMBRE</option>"+
	       "                                <option value='10'>OCTUBRE</option>"+
	       "                                <option value='11'>NOVIEMBRE</option>"+
	       "                                <option value='12'>DICIEMBRE</option>"+
	       "                                <option value='%'>TODOS</option>"+
	       "                         </select>"+
	       "                    </div>"+
	       "                    <div class=\"col-sm-2\"> "+
         "                         <select  id=\"anio\"  class=\"form-control\">"+
         "                          </select>"+
         "                    </div>"+
         "                    <div class=\"col-sm-2\"> "+
        "                         <select  id=\"tipoas\"  class=\"form-control\">"+
        "                          </select>"+
        "                    </div>"+
        "              </div>"+
        "              <div class=\"space-8\"></div>"+
        "              <div class=\"row\"> "+
		"                    <div class=\"col-sm-1\"> </div>"+ 
		"                    <div class=\"col-sm-3\"> "+ 	   		           
         "                          <div class=\"col-sm-1\" style=\"padding-top:0px;\"> "+
         "                                <button type=\"button\" class=\"btn btn-white btn-warning btn-bold\" onclick=\"generarReporteJefe('1');\">"+
         "                                <i class=\"ace-icon fa fa-plus bigger-120 blue\"> Generar Reporte Sellado</i></button>"+
         "                          </div>"+
		 "                    </div>"+
		 "                    <div class=\"col-sm-2\"> </div>"+ 
         "                    <div class=\"col-sm-2\"> "+ 	   		           
         "                          <div class=\"col-sm-1\" style=\"padding-top:0px;\"> "+
         "                                <button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"generarReporteJefe('0');\">"+
         "                                <i class=\"ace-icon fa fa-plus bigger-120 blue\"> Generar Reporte</i></button>"+
         "                          </div>"+
         "                    </div>"+
         "                    <div class=\"col-sm-1\"> </div>"+ 
	       "              </div>"+
	     "              <div class=\"space-50\"></div>"+
		   "          </div>"+
		   "      </div>"+
		   "   </div>"+    	   			 
		   "</div>";
	 
	      
	 $("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	    }
	    
	    
	      $('.chosen-select').chosen({allow_single_deselect:true}); 			
		  $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
		  $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});
		  
		
		  elsql="SELECT EMPL_NUMERO, CONCAT(EMPL_NUMERO,' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) FROM pempleados ORDER BY EMPL_NOMBRE, EMPL_APEPAT";
		  parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}  
	    $.ajax({
			type: "POST",			
			data:parametros,
	        url:  "../base/dameselectSeg.php",
	        success: function(data){
	     	   $("#profesor").html(data);   
	     	  $('#profesor').trigger("chosen:updated");
	     	   
	        }
	      });
		
		  
		  elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='TIPOASESORIAS' ";
		  parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'} 
	    
	    $.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/dameselectSeg.php",
        success: function(data){
     	   $("#tipoas").html(data);   
     	   $("#tipoas").append("<option value=\"%\">Todos</option>") 
        }
      });
		 
	  elsql="SELECT DISTINCT(ASES_CICLO), CONCAT(ASES_CICLO,' ',ASES_CICLOD) FROM vasesorias ORDER BY ASES_CICLO DESC";
	  parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'} 

	     $.ajax({
			type: "POST",
			data:parametros,
            url:  "../base/dameselectSeg.php",
            success: function(data){
    	       $("#ciclo").html(data);   
            }
        });
		 
		elsql2="SELECT DISTINCT(ANIO), ANIO FROM vasesorias";
		parametros2={sql:elsql2,dato:sessionStorage.co,bd:"Mysql",sel:'0'} 
	  $.ajax({
		  type: "POST",
		  data:parametros2,
          url:  "../base/dameselectSeg.php",
          success: function(data){
  	       $("#anio").html(data);     	       
          }
      });
 
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
	    
}


function generarReporte(){
	
	window.open("../asesorias/asesorias.php?ID="+claveProf+"&mes="+$("#mes").val()+"&anio="+$("#anio").val()+
			                                "&tipo="+$("#tipoas").val()+"&tipod="+$("#tipoas  option:selected").text()+
			                                "&ciclo="+$("#ciclo").val()+"&ciclod="+$("#ciclo  option:selected").text(), '_blank');
	$('#modalDocument').modal("hide");  
    return false;
	
}


function generarReporteJefe(tipo){

	window.open("../asesorias/asesorias.php?ID="+$("#profesor").val()+"&mes="+$("#mes").val()+"&anio="+$("#anio").val()+
											"&tipo="+$("#tipoas").val()+"&tipod="+$("#tipoas  option:selected").text()+
											"&tipoRep="+tipo+
			                                "&ciclo="+$("#ciclo").val()+"&ciclod="+$("#ciclo  option:selected").text(), '_blank');
	$('#modalDocument').modal("hide");  
    return false;
	
}




