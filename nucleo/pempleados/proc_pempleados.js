var table;


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
        			    		usua_usuader:"DOCENTES",
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
        title: "Resultados de envio de Correo",
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




function crearUsuarioEmpl(modulo,usuario,institucion, campus,essuper){	
    table = $("#G_"+modulo).DataTable();	
	nreg=1;
	elReg=0;
	if (table.rows('.selected').data().length>0) { 
		 agregarDialog(modulo);
		 fila=table.rows('.selected').data();
		 cad=crearUsuario (fila,modulo,institucion,campus);
	}
	else {
		alert ("Debe seleccionar un empleado");
		return 0;
		}	
}


function emplMasivos(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	agregarDialog(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
   crearUsuario (table.rows(elReg).data(), modulo,institucion,campus);
		
	
}



