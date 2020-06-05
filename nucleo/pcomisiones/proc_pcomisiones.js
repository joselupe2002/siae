
//tipo 0 Oficio sin sello y firma 
//tipo 1 Oficio Con sello y firma 
//tipo 2 Oficio con sello y firma y enviar al correo

function reporteCom(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	elid=table.rows('.selected').data()[0][0];
	window.open("../pcomisiones/oficiocom.php?tipo=0&ID="+elid, '_blank');
    return false;
}



function reporteComSell(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	elid=table.rows('.selected').data()[0][0];
	window.open("../pcomisiones/oficiocom.php?tipo=1&ID="+elid, '_blank');
    return false;
}


function envComision(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	elid=table.rows('.selected').data()[0][0];
	window.open("../pcomisiones/oficiocom.php?tipo=2&ID="+elid, '_blank');
    return false;
}


function reporteComRH(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	elid=table.rows('.selected').data()[0][0];
	window.open("../pcomisiones/oficiocomRH.php?tipo=0&ID="+elid, '_blank');
    return false;
}


function copiarCom(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	
	if (table.rows('.selected').data().length>0) {
		
		if (!(table.rows('.selected').data()[0]["GRUPO"]=="")){ 
				script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
			       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
				   "      <div class=\"modal-content\">"+
				   "          <div class=\"modal-header\" >"+
				   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Actividad:"+table.rows('.selected').data()[0]["ACTIVIDAD"].substring(0,30)+"</span></b> </span>"+
				   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
				   "                  <span aria-hidden=\"true\">&times;</span>"+
				   "             </button>"+
				   "          </div>"+
				    		   
				   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+	
				   "                         <div class=\"row\" style=\"padding:0px;\"> "+	
				   "                                <div class=\"col-sm-4\"> </div>"+
				   "                                <div class=\"col-sm-4\"> "+
				   "                                      <button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"crearCopias("+table.rows('.selected').data()[0]["ID"]+",'"+modulo+"');\">"+
				   "                                      <i class=\"ace-icon fa fa-plus bigger-120 blue\"></i>Crear Copias</button>"+
				   "                                 </div>"+
				   "                                 <div class=\"col-sm-4\"> </div>"+
				   "                           </div>"+  //div del row
				   "                           <div class=\"space-10\"></div>"+
				   "                         <div class=\"row\" > "+	
				   "                                <div class=\"col-sm-12\" style=\"padding-top:12px;\"> "+
				   "                                   <span class=\"label label-lg label-success arrowed-right\"><strong>Profesores</strong></span><br/> "+
				   "                                       <div class=\"input-group\">"+
		           "                                          <select multiple=\"\" class=\"chosen-select form-control\" name=\"lista\"  id=\"lista\" data-placeholder=\"Elija una Opci&oacute;-->\">\n";
				   "                                          <option value=\"-1\" selected >Elija profesores</option>"+
				   "                                          </SELECT></div>"+		
				   "                                       </div"+
				   "                                 </div"+
				   "                         </div"+
				   "          </div>"+ //div del modal-body		 
			       "          </div>"+ //div del modal content		  
				   "      </div>"+ //div del modal dialog
				   "   </div>"+ //div del modal-fade
				   " <select id=\"aulas\" style=\"visibility:hidden\"></select> "
				   "</div>";
			 
				
				
		 		 
			    
			    
				elsql="SELECT EMPL_NUMERO, CONCAT(EMPL_NUMERO,' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS NOMBRE  FROM pempleados WHERE EMPL_ACTIVO='S' and EMPL_NUMERO<>0 order by EMPL_NOMBRE, EMPL_APEPAT, EMPL_APEMAT"
				parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}
			    $.ajax({
					type: "POST",
					data:parametros,
		            url: "dameselectSeg.php", 
		            success: function(data){    
						 $("#modalDocument").remove();						 
		        	     if (! ( $("#modalDocument").length )) {$("#grid_"+modulo).append(script);}
		        	    
		        	      $('#modalDocument').modal({show:true, backdrop: 'static'});
		        	    
		                 $("#lista").html(data); 
		                 $('#lista').trigger("chosen:updated");
		                 $('#lista').chosen({allow_single_deselect:true}); 	
		                 $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "300px"});})}).trigger('resize.chosen');
		               
		             
		                 
		         },
		         error: function(data) {
		            alert('ERROR-SELMUL: '+data);
		         }
		       }); 	
		}
		else
			{alert ("Para sacar una copia debe colocar el campo GRUPO ");}
	
	}
	else {
		alert ("Debe seleccionar un profesor");
		return 0;

		}  
	    
}


function crearCopias(id,modulo){
	
	var cad=String($("#lista").val());
	var losdatos=[];
	losprofes=cad.split(",");
	 elsql="SELECT * FROM pcomisiones where COMI_ID="+id;
	 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	 $.ajax({
			type: "POST",
			data:parametros,
        	url: "../base/getdatossqlSeg.php",
        	success: function(data){ 
        		original=JSON.parse(data);
        		 var loscampos = ["COMI_PROFESOR","COMI_FECHAINI","COMI_FECHAFIN","COMI_HORAINI","COMI_HORAFIN",
        		                  "COMI_LUGAR","COMI_RESPONSABLE","COMI_ACTIVIDAD","COMI_FECHAUS","COMI_USUARIO",
        		                  "COMI_AUTORIZO","_INSTITUCION","_CAMPUS","COMI_GRUPO"];
        		 
        		c=0;
        		cad="";
        		$.each(losprofes,function(index,contenido){
        			
        			cad+=contenido+"|"+    //el profesor       		     
     		         original[0]["COMI_FECHAINI"]+"|"+ //Descrip
     		         original[0]["COMI_FECHAFIN"]+"|"+
     		         original[0]["COMI_HORAINI"]+"|"+
     		         original[0]["COMI_HORAFIN"]+"|"+
     		         original[0]["COMI_LUGAR"]+"|"+
     		         original[0]["COMI_RESPONSABLE"]+"|"+
     		         original[0]["COMI_ACTIVIDAD"]+"|"+
     	      	     original[0]["COMI_FECHAUS"]+"|"+
     		         original[0]["COMI_USUARIO"]+"|"+
     		         original[0]["COMI_AUTORIZO"]+"|"+
     		         original[0]["_INSTITUCION"]+"|"+
     		         original[0]["_CAMPUS"]+"|"+
     		         original[0]["COMI_GRUPO"];
        			 losdatos[c]=cad;
        			 cad="";
        			 
                     c++;
        			});
        		
        	
        		
        		parametros={
	    	    		tabla:"pcomisiones",
	    	    		campollave:"COMI_ID",
	    	    		bd:"Mysql",
	    	    		valorllave:0,
	    	    		eliminar: "N",
	    	    		separador:"|",
	    	    		campos: JSON.stringify(loscampos),
	    	    	    datos: JSON.stringify(losdatos)
	    	    };
			 
			   $.ajax({
	    	        type: "POST",
	    	        url:"grabadetalle.php",
	    	        data: parametros,
	    	        success: function(data){
	    	        	$('#modalDocument').modal("hide");  
	    	        	$('#dlgproceso').modal("hide"); 
	    	        	if (data.length>0) {alert ("Ocurrio un error: "+data);}
	    	        	else {alert ("Copias Creadas")}	
	    	        	
	    	        	window.parent.document.getElementById('FRpcomisiones').contentWindow.location.reload();

	    	        }					     
	    	    });  
			   
        	},
        	error: function(data) {	                  
        	   	                      alert('ERROR: '+data);
        	   	                  }
        	});
	
	
	
	
	return 0;
}


