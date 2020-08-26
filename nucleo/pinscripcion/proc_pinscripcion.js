var table;
var nreg=0;
var elReg=0;


function crearUsuario(lafila,modulo,institucion, campus) {
	res="";
	var table = $("#G_"+modulo).DataTable();
  //  var lafila = table.rows(elReg).data();
	
	elsql="select count(*) as n from CUSUARIOS where usua_usuario='"+lafila[0][0]+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"SQLite"}

    $.ajax({
		type: "POST",
		data:parametros,
        url: 'getdatossqlSeg.php', 
        success: function(data){           	
        	 losdatos=JSON.parse(data);
        	 jQuery.each(losdatos, function(clave, valor){
        		 if (valor.n==0) {
        			 
        			 encrip=sha512(lafila[0][0]);
        			 parametros={
        			    		tabla:"CUSUARIOS",
        			    		bd:"SQLite",
        			    		usua_usuario:lafila[0][0],
        			    		usua_nombre:lafila[0][1]+" "+lafila[0][2]+" "+lafila[0][3],
        			    		usua_super: "N",
        			    		usua_rol: "N",
        			    		usua_usuader:"ALUMNOS",
        			    		usua_carrera:lafila[0]["CARRERA"],
        			    		usua_clave: encrip,
        			    		_INSTITUCION:institucion,
        			    		_CAMPUS:campus,
        			    };
        			    $.ajax({
        			        type: "POST",
        			        url:"inserta.php",
        			        data: parametros,
        			        success: function(data){        			        	
        			        	
        			        	if (!(data.substring(0,1)=="0"))	
				                 { 					                	 			                   
			                	 $('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se creo el usuario "+lafila[0][0]+" correctamente contraseña:"+lafila[0][0]+"\n"); 
				                  }	
			                    else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
        			        	
        			             elReg++;
        			             if (nreg>elReg) {crearUsuario(table.rows(elReg).data(),modulo,institucion,campus);}
        			             
				                                                       	                                        					          
        			        }					     
        			    });    	            
        				
        			 
        		 } 
        		 else 
        			 { $('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Ya se ha creado el usuario a "+lafila[0][0]+"\n");
        			 elReg++;
		             if (nreg>elReg) {crearUsuario(table.rows(elReg).data(),modulo,institucion,campus);}
        			 }
        	 });
        }
	});
}





function agregarDialog(modulo){
	
	script="<div id=\"dlg-resultados\" class=\"hide\">"+
               "<textarea id=\"resul\" style=\"width: 100%; height: 100%; font-size: 10px;\"> </textarea>"+
           "</div>";
   
	if (! ( $("#dlg-resultados").length )) {
	    $("#grid_"+modulo).append(script);
	    }
	
	var dialog = $( "#dlg-resultados" ).removeClass('hide').dialog({
        modal: true,
        title: "Resultados...",
        width: 400,
        height: 400,
        title_html: true,
        buttons: [
            {
                text: "OK",
                "class" : "btn btn-primary btn-minier",
                click: function() {
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
	
	$('#resul').val("");
    
}

function crearUsuarioAlum(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	
	nreg=1;
	elReg=0;
	
	
	if (table.rows('.selected').data().length>0) { 
		 agregarDialog(modulo);
		 fila=table.rows('.selected').data();
		 cad=crearUsuario (fila,modulo,institucion,campus);
	}
	else {
		alert ("Debe seleccionar un alumno");
		return 0;
		}
	
}



function usuariosMasivos(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	agregarDialog(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
   crearUsuario (table.rows(elReg).data(), modulo,institucion,campus);
}




//Actualiza Usuario 
function editaRol(lafila,modulo,institucion, campus,rol) {
	res="";
	var table = $("#G_"+modulo).DataTable();
	parametros={
    		tabla:"CUSUARIOS",
    		bd:"SQLite",
    		campollave:"usua_usuario",
    	    valorllave:lafila[0][0],
    		usua_usuader:rol,    	
    };
    $.ajax({
        type: "POST",
        url:"actualiza.php",
        data: parametros,
        success: function(data){       

        	if (!(data.substring(0,1)=="0"))	
             { 					                	 			                   
        	 $('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se modifico el usuario "+lafila[0][0]+"ROL: "+rol+"\n"); 
              }	
            else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
        	
             elReg++;
             if (nreg>elReg) {editaRol(table.rows(elReg).data(),modulo,institucion,campus,rol);}                                        	                                        					         
        }					     
    });    	            
}


function cambiaRol(modulo,usuario,institucion, campus,essuper){
	var rol = prompt("Escriba el rol que tendran los usuarios", "ALUMNOS");

	if (rol != null) {
		table = $("#G_"+modulo).DataTable();
		agregarDialog(modulo);
		nreg=0;
		elReg=0;
		table.rows().iterator('row', function(context, index){
			 nreg++;		    
		});
		editaRol (table.rows(elReg).data(), modulo,institucion,campus,rol);
	}
	
	
}



//Actualiza Usuario 
function editaUsuario(lafila,modulo,institucion, campus) {
	res="";
	var table = $("#G_"+modulo).DataTable();
	parametros={
    		tabla:"CUSUARIOS",
    		bd:"SQLite",
    		campollave:"usua_usuario",
    	    valorllave:lafila[0][0],
    		usua_carrera:lafila[0]["CARRERA"] ,    	
    };
    $.ajax({
        type: "POST",
        url:"actualiza.php",
        data: parametros,
        success: function(data){       

        	if (!(data.substring(0,1)=="0"))	
             { 					                	 			                   
        	 $('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se modifico el usuario "+lafila[0][0]+"CARRERA: "+lafila[0]["CARRERA"]+"\n"); 
              }	
            else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
        	
             elReg++;
             if (nreg>elReg) {editaUsuario(table.rows(elReg).data(),modulo,institucion,campus);}
                                        	                                        					          
        }					     
    });    	            
}



function verKardex(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	fila=table.rows('.selected').data();
	enlace="nucleo/avancecurri/kardex.php?matricula="+fila[0]["MATRICULA"];
	var content = '<iframe frameborder="0" id="FRNoti" src="'+enlace+'" style="overflow-x:hidden;width:100%;height:100%;"></iframe></div>';	
	$('#parentPrice', window.parent.document).html();
	window.parent.$("#myTab").tabs('add',{
						title:'Kardex'+fila[0]["MATRICULA"],				    	    
						content:content,
						closable:true		    
					});
   //window.open(enlace, '_blank'); 
  }


function actualizaCarrera(modulo,usuario,institucion, campus,essuper){

	table = $("#G_"+modulo).DataTable();
	agregarDialog(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
   editaUsuario (table.rows(elReg).data(), modulo,institucion,campus);
}



function documentos(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
         
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
		       "   <div class=\"modal-dialog\" role=\"document\">"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header\">"+
			   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
			   "                  <span aria-hidden=\"true\">&times;</span>"+
			   "             </button>"+
			   "             <h4 class=\"modal-title\" id=\"myModalLabel\">Entrega de Documentos</h4>"+
			   "          </div>"+
			   "          <div class=\"modal-body\">"+
			   "                 <form id=\"frmdocumentos\"></form> "+
			   "          </div>"+
			   "          <div class=\"modal-footer\">"+
		       "               <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancelar</button>"+
		       "               <button type=\"button\" class=\"btn btn-primary\" onclick=\"guardarDocumentos();\">Guardar</button>"+
		       "          </div>"+		      
			   "      </div>"+
			   "   </div>"+
			   "</div>";
		 
		    if (! ( $("#modalDocument").length )) {
		    $("#grid_"+modulo).append(script);
		    }
			
			
			elsql="select a.DOCU_CLAVE, CONCAT(a.DOCU_DESCRIP,' (',a.DOCU_ORIGINAL,'|',a.DOCU_COPIAS,')') AS DOCU_DESCRIP,"+
			"(SELECT COUNT(*) FROM edocumalum Y WHERE Y.DOCU_CLAVE=a.DOCU_CLAVE AND "+
			" Y.DOCU_MATRICULA='"+table.rows('.selected').data()[0][0]+"') AS ESTA from  edocument a  where a.DOCU_ACTIVO='S'";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		
		    $.ajax({
				type: "POST",
				data:parametros,
                url: 'getdatossqlSeg.php', 
                success: function(data){                   	 
                	 losdatos=JSON.parse(data);
                	 
                	 if (! ( $("#DOCU_CLAVE").length )) {
                		 jQuery.each(losdatos, function(clave, valor){	
                    		 $("#frmdocumentos").append("<div class=\"checkbox\"> "+
    													"    <label class=\"block\">"+
    													"    	<input name=\"DOCU_CLAVE\" title=\"DOCU_CLAVE"+valor.DOCU_CLAVE+"\" id=\"DOCU_CLAVE\" value=\""+valor.DOCU_CLAVE+"\"type=\"checkbox\" class=\"ace input-lg\" />"+
    													"     	<span class=\"lbl bigger-120\">"+valor.DOCU_DESCRIP+"</span>"+
    													"    </label>"+
    												    "</div>");
                    		 
                    	 });
                		}
                	 else
                		 {$(".input-lg").prop("checked", false);}                
                	
                	 jQuery.each(losdatos, function(clave, valor){
                            if (valor.ESTA=="1") {                     
                            	$(".input-lg").each(function(){
                            		if ($(this).val()==valor.DOCU_CLAVE) {
                            			$(this).prop("checked", true);
                            		}
                            	});                            	
                            
                            }
                		 
                	 });
                     
             },
             error: function(data) {
                alert('ERROR: '+data);
             }
           });    
		    
		    $('#modalDocument').modal({show:true});
		    
	
		}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}
	
}

function guardarDocumentos(){
	var form = $( "#frmdocumentos" );
	$('#modalDocument').modal("hide");  	
    $('#dlgproceso').modal({backdrop: 'static', keyboard: false});	 
    var losdatos=[];
    var i=0; 
    $(".input-lg").each(function(){
		if ($(this).prop("checked")) {
			losdatos[i]=table.rows('.selected').data()[0][0]+"|"+$(this).val()+"|"+"I";
			i++;
		}
		
	});       
    
    var loscampos = ["DOCU_MATRICULA","DOCU_CLAVE","DOCU_STATUS"];
    
    parametros={
    		tabla:"edocumalum",
    		campollave:"DOCU_MATRICULA",
    		bd:"Mysql",
    		separador:"|",
    		valorllave:table.rows('.selected').data()[0][0],
    		eliminar: "S",
    		campos: JSON.stringify(loscampos),
    	    datos: JSON.stringify(losdatos)
    };
    $.ajax({
        type: "POST",
        url:"grabadetalle.php",
        data: parametros,
        success: function(data){
        	$('#dlgproceso').modal("hide"); 
        	if (data.length>0) {alert ("Ocurrio un error: "+data);}
        	else {alert ("Registros guardados")}		                                	                                        					          
        }					     
    });    	                	

}


function envioCorreoAlum(modulo,usuario,essuper) {
	getVentanaCorreo("pinscripcion","CORREO");
	
}