





function aceptarAspirante(lafila,modulo,institucion, campus, valor) {
	res="";
	var table = $("#G_"+modulo).DataTable();	
	parametros={
		tabla:"cal_fechas",
		campollave:"ID",
		bd:"Mysql",
		valorllave:lafila[0][0],
		ACTIVO: valor
	};
    $.ajax({type: "POST",
        	url:"actualiza.php",
        	data: parametros,
        	success: function(data){        			        	
                if (!(data.substring(0,1)=="0"))	{ 					                	 			                   
			        $('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se autorizo "+lafila[0][0]+" correctamente \n"); 
				    }	
			    else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
        			        	
        		elReg++;
				if (nreg>elReg) {aceptarAspirante(table.rows(elReg).data(),modulo,institucion,campus,valor);}
				if (nreg==elReg) { window.parent.document.getElementById('FRcal_fechas').contentWindow.location.reload();}
			 }					     
          });    	            
}


function autFechas(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	agregarDialog(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
		aceptarAspirante(table.rows(elReg).data(), modulo,institucion,campus,'S');
}


function desFechas(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	agregarDialog(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
		aceptarAspirante(table.rows(elReg).data(), modulo,institucion,campus,'N');
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
					window.parent.document.getElementById('FRcal_fechas').contentWindow.location.reload();
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
	$('#resul').val("");
}
