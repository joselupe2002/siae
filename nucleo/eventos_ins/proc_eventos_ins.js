
//tipo 0 Oficio sin sello y firma 
//tipo 1 Oficio Con sello y firma 
//tipo 2 Oficio con sello y firma y enviar al correo

function verconstancia(modulo,id,tipo){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
			elid=table.rows('.selected').data()[0][0];
			window.open("../eventos_ins/constancia.php?id="+id+"&tipo="+tipo, '_blank');
			return false;
	
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;
		}
}



function constancia(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	mostrarIfo("lasconst", "grid_"+modulo,  "Constancias",
	"<div class=\"row\" style=\"text-align:left;\">"+
		"<div class=\"col-sm-4\">"+
			"<button style=\"width:100%; text-align:left;\" onclick=\"verconstancia('"+modulo+"','"+table.rows('.selected').data()[0]["ID"]+"','0');\" "+
			" class=\"btn btn-white btn-info btn-round\"><i class=\"ace-icon  blue glyphicon glyphicon-hand-right bigger-140\">"+
			"</i><span class=\"btn-small\"></span> Constancia</button><br/>"+
			"<button style=\"width:100%; text-align:left;\" onclick=\"verconstancia('"+modulo+"','"+table.rows('.selected').data()[0]["ID"]+"','1');\" "+
			" class=\"btn btn-white btn-info btn-round\"><i class=\"ace-icon blue glyphicon glyphicon-qrcode bigger-140\">"+
			"</i><span class=\"btn-small\"></span> Constancia firmada</button><br/>"+				
		"</div>"+
		"<div class=\"col-sm-4\">"+	
		"</div>"+
		"<div class=\"col-sm-4\">"+		
			"<button style=\"width:100%; text-align:left;\" onclick=\"verconstancia('"+modulo+"','"+table.rows('.selected').data()[0]["ID"]+"','2');\" "+
			" class=\"btn btn-white btn-info btn-round\"><i class=\"ace-icon pink glyphicon glyphicon-envelope bigger-140\">"+
			"</i><span class=\"btn-small\"></span> Enviar Constancia</button><br/>"+		
		"</div>"+
	"</div>"
	,"modal-sm");
}




function generarConstancia(lafila,modulo,institucion, campus, valor) {
	res="";
	var table = $("#G_"+modulo).DataTable();	
	parametros={
		bd:"Mysql",
		id:lafila[0][0],
		tipo: 2
	};
    $.ajax({type: "GET",
        	url:"../eventos_ins/constancia.php",
        	data: parametros,
        	success: function(data){        			        	
                if (!(data.substring(0,1)=="0"))	{ 					                	 			                   
			        $('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se envio constancia "+lafila[0]["ID"]+" "+lafila[0]["NOMBRE"]+" correctamente \n"); 
				    }	
			    else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
        			        	
        		elReg++;
				if (nreg>elReg) {generarConstancia(table.rows(elReg).data(),modulo,institucion,campus, valor);}
				if (nreg==elReg) { window.parent.document.getElementById('FReventos_ins').contentWindow.location.reload();}
			 }					     
          });    	            
}


function enviarMasivo(modulo,usuario,institucion, campus,essuper) {
	if (confirm("¿Seguro que desea enviar todas las costancias filtradas?")) {
		table = $("#G_"+modulo).DataTable();
		agregarDialogResultado(modulo);
		nreg=0;
		elReg=0;
		table.rows().iterator('row', function(context, index){
			nreg++;		    
		});
		generarConstancia(table.rows(elReg).data(), modulo,institucion,campus,'S');
	}
}




function marcarAsistenciaGen(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	mostrarVentanaCierre ("vtnDatos","G_"+modulo, "Listado de Matricula", 
	 "<div id=\"losEventos\" style=\"width:100%;\"></div>"+
	 "<textarea id=\"lasmat\" style=\"width:100%; height:250px;\"></textarea>","Marcar", "marcarAsistencia('S');","modal-sm");

	 $("#losEventos").append("<span class=\"label label-danger\">Evento</span>");
	 addSELECT("selEventos","losEventos","PROPIO", "SELECT ID, DESCRIPCION  FROM eeventos order by ID DESC", "","BUSQUEDA");  	
}

function marcarAsistencia(valor){
	var lines = $('#lasmat').val().split('\n');
	var matricula="";
	$('#lasmat').val("");
	for(var i = 0;i < lines.length;i++){
		matricula=lines[i];
		parametros={
			tabla:"eventos_ins",
			bd:"Mysql",
			campollave:"concat(PERSONA,EVENTO)",
			valorllave:lines[i]+$("#selEventos").val(),		
			ASISTIO:valor
		};
		$.ajax({
			type: "POST",
			url:"../base/actualiza.php",
			data: parametros,
			success: function(data){        			        	
									 
			}					     
		}); 
		$('#lasmat').val($('#lasmat').val()+"\n"+matricula+"-- HECHO"+i);	
	}
}


function cierraModal(){
	window.parent.document.getElementById('FReventos_ins').contentWindow.location.reload();
}






function AutorizarTodos(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	agregarDialogResultado(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
		autorizarReg(table.rows(elReg).data(), modulo,institucion,campus,'S');
}


function DesAutorizarTodos(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	agregarDialogResultado(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
		autorizarReg(table.rows(elReg).data(), modulo,institucion,campus,'N',usuario);
}



function autorizarReg(lafila,modulo,institucion, campus, valor,usuario) {
	res="";
	lafecha=dameFecha("FECHAHORA");
	eluser=usuario;
	if (valor=='N'){lafecha=""; eluser="";}

	var table = $("#G_"+modulo).DataTable();	
	parametros={
		tabla:"eventos_ins",
		campollave:"ID",
		bd:"Mysql",
		valorllave:lafila[0][0],
		AUTORIZADO: valor,
		FECHAAUT:lafecha,
		USERAUTORIZO:eluser
	};
    $.ajax({type: "POST",
        	url:"actualiza.php",
        	data: parametros,
        	success: function(data){        			        	
                if (!(data.substring(0,1)=="0"))	{ 					                	 			                   
			        $('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se Autorizo el resgistro "+lafila[0]["ID"]+" "+lafila[0]["NOMBRE"]+" correctamente \n"); 
				    }	
			    else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
        			        	
        		elReg++;
				if (nreg>elReg) {autorizarReg(table.rows(elReg).data(),modulo,institucion,campus, valor,usuario);}
				if (nreg==elReg) { window.parent.document.getElementById('FReventos_ins').contentWindow.location.reload();}
			 }					     
          });    	            
}




function asignarConsecutivo(modulo,usuario,institucion, campus,essuper){
	
		table = $("#G_"+modulo).DataTable();
		mostrarVentanaCierre ("vtnDatos","G_"+modulo, "Asignación de Consecutivos", 
		 "<div class=\"row\"> "+
		 "    <div class=\"col-sm-6\" id=\"lasareas\">"+
		 "         <span class=\"label label-sucess\">Tipo de Consecutivo/área </span>"+
		 "    </div>"+
		 "    <div class=\"col-sm-6\">"+
		 "         <span class=\"label label-danger\">Fecha de Expedición </span>"+
		 "         <div style=\"width:150px;\" class=\"input-group\">"+
		 "              <input id=\"fechafol\" class=\"form-control date-picker\" type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
		 "              <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span>"+
		 "         </div>"+
		 "    </div>"+
		 "</div>",
		 "Asignar Folios", "ponConsecutivo('"+modulo+"');","modal-sm");
	
		 addSELECT("selAreas","lasareas","PROPIO", "SELECT CATA_CLAVE,CATA_DESCRIP FROM scatalogos where CATA_TIPO='TIPOEVENTOS' order by CATA_DESCRIP", "","");  
		 $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});  

}

function ponConsecutivo(modulo){
	//alert ($("#fechafol").val()+" "+$("#selAreas").val());
	if ($("#selAreas").val()=='0') {alert ("Debe Capturar Tipo de constancia"); return 0;}
	if ($("#fechafol").val()=='') {alert ("Debe Capturar Fecha de Expedición"); return 0;}
		table = $("#G_"+modulo).DataTable();
		agregarDialogResultado(modulo);
		nreg=0;
		elReg=0;
		table.rows().iterator('row', function(context, index){nreg++;});
		colocaConsecutivo(table.rows(elReg).data(), modulo);


}


function colocaConsecutivo(lafila,modulo) {
	res="";
	var table = $("#G_"+modulo).DataTable();
	elarea=$("#selAreas").val();
	elsqlCic="select CONSECUTIVO from econsoficial where TIPO='"+elarea+"'";
	parametros={sql:elsqlCic,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
			url:  "../base/getdatossqlSeg.php",
		success: function(data){

			//Actualizacion del consecutivo 
			parametros={
				tabla:"econsoficial",
				campollave:"TIPO",
				bd:"Mysql",
				valorllave:elarea,
				CONSECUTIVO: parseInt(JSON.parse(data)[0][0])+1
			};
			$.ajax({type: "POST",
					url:"actualiza.php",
					data: parametros,
				
						success: function(data){        			        	
					}					     
				}); 
				
			parametros={
				tabla:"eventos_ins",
				campollave:"ID",
				bd:"Mysql",
				valorllave:lafila[0]["ID"],
				FOLIO: "ITSM"+"-"+elarea+"-"+JSON.parse(data)[0][0],
				FECHAEXP:$("#fechafol").val()
			};
			
			$.ajax({type: "POST",
					url:"actualiza.php",
					data: parametros,
					success: function(data){        			        	
						if (!(data.substring(0,1)=="0"))	{ 					                	 			                   
							$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se Autorizo el resgistro "+lafila[0]["ID"]+" "+lafila[0]["NOMBRE"]+" correctamente \n"); 
							}	
						else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
										
						elReg++;
						if (nreg>elReg) {colocaConsecutivo(table.rows(elReg).data(),modulo);}
						if (nreg==elReg) { window.parent.document.getElementById('FReventos_ins').contentWindow.location.reload();}
					}					     
				});			
		}
	});


		
	           
}