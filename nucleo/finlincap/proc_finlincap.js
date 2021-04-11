

function consultarEstadoUno(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
	    
	
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}
	
}

function consultarFin(lafila,modulo,institucion, campus) {
	res="";
	var table = $("#G_"+modulo).DataTable();	

	var parametros = {
		folioSeguimiento:lafila[0]["FOLIOSEG"],
		folioestado:lafila[0]["FOLIOESTADO"],
		idtramite:lafila[0]["IDTRAMITE"]	
		};


    $.ajax({type: "POST",
        	url:"../../nucleo/finlincap/consulta.php",
        	data: parametros,
        	success: function(data){  
				respuesta=data.split("*");
				if (respuesta[0]=="EXITO") {							                	 			                   
			        $('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se consulto status "+lafila[0]["FOLIOESTADO"]+" correctamente \n"); 
					parametros2={tabla:"finlincap",bd:"Mysql",campollave:"ID",valorllave:lafila[0]["ID"],
					             STATUS:respuesta[3],MONTOPAGADO:respuesta[2],CODSTATUS:respuesta[1],FECHACONS:dameFecha("FECHAHORA")};
								$.ajax({
										type: "POST",
										url:"../base/actualiza.php",
										data: parametros2,
										success: function(data){       
																																				
										}					     
								}); 
								
				    }	
			    else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
        			        	
        		elReg++;
				if (nreg>elReg) {consultarFin(table.rows(elReg).data(),modulo,institucion,campus);}
				if (nreg==elReg) { window.parent.document.getElementById('FRfinlincap').contentWindow.location.reload();}
			 }					     
          });    	            
}


function consultarEstado(modulo,usuario,institucion, campus,essuper){
	
	table = $("#G_"+modulo).DataTable();
	agregarDialog(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
	consultarFin(table.rows(elReg).data(), modulo,institucion,campus);

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
					window.parent.document.getElementById('FRfinlincap').contentWindow.location.reload();
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
	$('#resul').val("");
}
