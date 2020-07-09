var nreg=0;
var elReg=0;

function setFinalizado(id,valor){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"aspirantes",
		   campollave:"IDASP",
		   bd:"Mysql",
		   valorllave:id,
		   FINALIZADO: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   window.parent.document.getElementById('FRvaspirantes').contentWindow.location.reload();
	   }					     
	   });    	                
}



function noFinalizada(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        if (table.rows('.selected').data()[0]["FINALIZADO"]=='S') {
			if (confirm("Desea Abrir la ficha "+table.rows('.selected').data()[0]["IDASP"])) {
				setFinalizado(table.rows('.selected').data()[0]["IDASP"],"N");
			}
		}
		else {
			if (confirm("La Ficha: "+table.rows('.selected').data()[0]["IDASP"]+" Esta abierta ¿desea finalizarla?")) {
				setFinalizado(table.rows('.selected').data()[0]["IDASP"],"S");
			}
		} 

	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	}


function verDocumentos(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
			script="<div class=\"modal fade\" id=\"modalDocumentAsp\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header widget-header  widget-color-green\">"+
			   "             <span class=\"label label-lg label-primary arrowed arrowed-right\"> Documentos Adjuntados </span>"+
			   "             <span class=\"label label-lg label-success arrowed arrowed-right\">"+table.rows('.selected').data()[0]["NOMBRE"]+" "+table.rows('.selected').data()[0]["APEPAT"]+" "+table.rows('.selected').data()[0]["APEMAT"]+"</span>"+			   
			   "             <input type=\"hidden\" id=\"elid\" value=\""+table.rows('.selected').data()[0]["IDASP"]+"\"></input>"+
			   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
			   "                  <span aria-hidden=\"true\">&times;</span>"+
			   "             </button>"+
			   "          </div>"+  
			   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+					 
			   "             <div class=\"row\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\"> "+		
		       "                  <table id=\"tabAsp\" class= \"table table-condensed table-bordered table-hover\">"+
		   	   "                         <thead>  "+
			   "                               <tr>"+	
			   "                                   <th>ID</th> "+
			   "                                   <th>Documento</th> "+
			   "                             	   <th>PDF</th> "+ 
			   "                               </tr> "+
			   "                         </thead>" +
			   "                   </table>"+	
			   "             </div> "+ //div del row
			   "             <div class=\"space-10\"></div>"+		   
			   "          </div>"+ //div del modal-body		 
		       "          </div>"+ //div del modal content		  
			   "      </div>"+ //div del modal dialog
			   "   </div>"+ //div del modal-fade
			   "</div>";
		 
			
			
	 		 
			 $("#modalDocumentAsp").remove();
		    if (! ( $("#modalDocumentAsp").length )) {
		        $("#grid_"+modulo).append(script);
		    }

		    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		    
		    $('#modalDocumentAsp').modal({show:true, backdrop: 'static'});

		    
	        sqlAsp="select a.IDDOC, a.CLAVE, a.DOCUMENTO,"+
			       "(SELECT ifnull(RUTA,'') AS RUTA FROM adjaspirantes b where b.AUX=CONCAT(a.CLAVE,'"+table.rows('.selected').data()[0]["CURP"]+"')) AS RUTA "+
		           " from documaspirantes a Where ENLINEA='S' order by IDDOC";

			parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
		        	      losdatos=JSON.parse(data);  
						  generaTablaSubirAsp(JSON.parse(data));						       
		        	        		        	    
		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		   });
			   
		    
	}
	else {
		alert ("Debe seleccionar un Mapa Curricular");
		return 0;

		}
	
}


function generaTablaSubirAsp(grid_data, op){		
	   ladefault="..\\..\\imagenes\\menu\\pdf.png";
       $("#cuerpoAsp").empty();
	   $("#tabAsp").append("<tbody id=\"cuerpoAsp\">");
       c=0;	
	   globalUni=1; 

	   
       jQuery.each(grid_data, function(clave, valor) { 	
          
			 $("#cuerpoAsp").append("<tr id=\"rowAsp"+c+"\"></tr>");
			 $("#rowAsp"+c).append("<td>"+valor.IDDOC+"</td>");
			 $("#rowAsp"+c).append("<td>"+valor.DOCUMENTO+"</td>");	
			
		     cadEnc="<a title=\"Ver Archivo Adjunto\" target=\"_blank\" id=\"enlace_"+c+"\" href=\""+valor.RUTA+"\">"+
				                " <img width=\"40px\" height=\"40px\" id=\"pdf"+c+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
								" </a>";		
				 
			$("#rowAsp"+c).append("<td style=\"text-align: center; vertical-align: middle;\">"+cadEnc+"</td>");					
				 
			
		     if ((valor.RUTA=='')||(valor.RUTA==null)) { 				    
			        $('#enlace_'+c).attr('disabled', 'disabled');
	                $('#enlace_'+c).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
	                $('#pdf'+c).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
			      }

			    c++;
		   		globalUni=c;

		   		
		   	});

    $('.fileSigea').ace_file_input({
		no_file:'Sin archivo ...',
		btn_choose:'Buscar',
		btn_change:'Cambiar',
		droppable:false,
		onchange:null,
		thumbnail:false, //| true | large
		whitelist:'pdf',
		blacklist:'exe|php'
		//onchange:''
		//
	});
		
		   }
	

function verPago(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {

		    
			sqlAsp="SELECT ifnull(RUTA,'') AS RUTA FROM adjaspirantes b where "+
				   " b.AUX=CONCAT('PAGO','"+table.rows('.selected').data()[0]["CURP"]+"')";		          
			parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
						  losdatos=JSON.parse(data);  
						  entre=false;
						  jQuery.each(losdatos, function(clave, valor) { 	
							   ruta=valor.RUTA;
							   entre=true;
						   });			
						   
						   if (entre) {
							   window.open(ruta, '_blank'); 
						   }
						   else {alert ("No se adjunto documento de pago");}
		        	        		        	    
		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		   });
			   
		    
	}
	else {
		alert ("Debe seleccionar un Mapa Curricular");
		return 0;

		}
	
}



function setPagado(id,valor,obs){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"aspirantes",
		   campollave:"IDASP",
		   bd:"Mysql",
		   valorllave:id,
		   PAGADO: valor,
		   OBSPAGO:obs
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   window.parent.document.getElementById('FRvaspirantes').contentWindow.location.reload();
	   }					     
	   });    	                
}


function setCotejado(id,valor,obs){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"aspirantes",
		   campollave:"IDASP",
		   bd:"Mysql",
		   valorllave:id,
		   COTEJADO: valor,
		   OBSCOTEJO:obs
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   window.parent.document.getElementById('FRvaspirantes').contentWindow.location.reload();
	   }					     
	   });    	                
}



function marcarPagado(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data()[0]["FINALIZADO"]=='S') {
		$("#confirmPagado").empty();
		mostrarConfirm("confirmPagado", "grid_vaspirantes",  "Proceso de Pagado",
		"<span class=\"label label-success\">Observaciones</span>"+
		"     <textarea id=\"obsPagado\" style=\"width:100%; height:100%; resize: none;\">"+table.rows('.selected').data()[0]["OBSPAGO"]+"</textarea>",
		"¿Marcar como Pagado? "+
		"<SELECT id=\"pagado\"><OPTION value=\"S\">S</OPTION><OPTION value=\"N\">N</OPTION></SELECT>"
		,"Finalizar Proceso", "btnMarcarPagado('"+table.rows('.selected').data()[0]["IDASP"]+"');","modal-sm");
	}
	else {alert ("El registro de este aspirante no esta finalizado");}
}

function btnMarcarPagado(id){
	
	setPagado(id,$("#pagado").val(),$("#obsPagado").val());
}


function marcarCotejado(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data()[0]["FINALIZADO"]=='S') {
		$("#confirmCotejado").empty();
		mostrarConfirm("confirmCotejado", "grid_vaspirantes",  "Proceso de Cotejo",
		"<span class=\"label label-success\">Observaciones</span>"+
		"     <textarea id=\"obsCotejado\" style=\"width:100%; height:100%; resize: none;\">"+table.rows('.selected').data()[0]["OBSCOTEJO"]+"</textarea>",
		"¿Marcar como Cotejado? "+
		"<SELECT id=\"cotejado\"><OPTION value=\"S\">S</OPTION><OPTION value=\"N\">N</OPTION></SELECT>"
		,"Finalizar Proceso", "btnMarcarCotejado('"+table.rows('.selected').data()[0]["IDASP"]+"');","modal-sm");
	}
	else {alert ("El registro de este aspirante no esta finalizado");}
}

function btnMarcarCotejado(id){
	setCotejado(id,$("#cotejado").val(),$("#obsCotejado").val());
}


function setAprobado(id,valor){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"aspirantes",
		   campollave:"IDASP",
		   bd:"Mysql",
		   valorllave:id,
		   ACEPTADO: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   //else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	
		   window.parent.document.getElementById('FRvaspirantes').contentWindow.location.reload();
	   }					     
	   });    	                
}



function AceptarInd(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
		if (table.rows('.selected').data().length>0) {
			if (table.rows('.selected').data()[0]["FINALIZADO"]=='S') {
				if (table.rows('.selected').data()[0]["ACEPTADO"]=='N') {
					if (confirm("Desea aprobar al alumno ID: "+table.rows('.selected').data()[0]["IDASP"])) {
						setAprobado(table.rows('.selected').data()[0]["IDASP"],"S");
					}
				}
				else {
					if (confirm("La Ficha: "+table.rows('.selected').data()[0]["IDASP"]+" Esta aprobada ¿desea NO ACEPTADO?")) {
						setAprobado(table.rows('.selected').data()[0]["IDASP"],"N");
					}
				} 	
		    }
	         else {alert ("El registro de este aspirante no esta finalizado");}
        }

		else { alert ("Debe seleccionar un Registro"); return 0; }
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
					window.parent.document.getElementById('FRvaspirantes').contentWindow.location.reload();
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
	$('#resul').val("");
}





function aceptarAspirante(lafila,modulo,institucion, campus) {
	res="";
	var table = $("#G_"+modulo).DataTable();	
	parametros={
		tabla:"aspirantes",
		campollave:"IDASP",
		bd:"Mysql",
		valorllave:lafila[0][0],
		ACEPTADO: "S"
	};
    $.ajax({type: "POST",
        	url:"actualiza.php",
        	data: parametros,
        	success: function(data){        			        	
                if (!(data.substring(0,1)=="0"))	{ 					                	 			                   
			        $('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se acepto el aspirante "+lafila[0][0]+" correctamente \n"); 
				    }	
			    else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
        			        	
        		elReg++;
				if (nreg>elReg) {aceptarAspirante(table.rows(elReg).data(),modulo,institucion,campus);}
				if (nreg==elReg) { window.parent.document.getElementById('FRvaspirantes').contentWindow.location.reload();}
			 }					     
          });    	            
}


function AceptarTodos(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	agregarDialog(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
		aceptarAspirante(table.rows(elReg).data(), modulo,institucion,campus);
}


//=============================================INSCRIPCION ==================================*/


function insTodos(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	agregarDialog(modulo);
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){
		 nreg++;		    
	});
	inscribirAspirante(table.rows(elReg).data(), modulo,institucion,campus);
}

function insInd(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
		if (table.rows('.selected').data().length>0) {
			if (table.rows('.selected').data()[0]["ACEPTADO"]=='S') {
				if (table.rows('.selected').data()[0]["INSCRITO"]=='N') {
					if (confirm("Desea inscribir al aspirante ID: "+table.rows('.selected').data()[0]["IDASP"])) {
						setInscrito(table.rows('.selected').data()[0]["IDASP"],"S");
					}
				}
				else {
					  if (confirm("El aspirante ya se encuentra inscrito, desea deshacer su inscripción recuerde que el consecutivo no se regresa")){
						  eliminarMatricula(table.rows('.selected').data()[0]["IDASP"],table.rows('.selected').data()[0]["MATRICULA"]);
					  }
					}
				} 	
	         else {alert ("El aspirante no ha sido aceptado");}
        }
		else { alert ("Debe seleccionar un Registro"); return 0; }
}
	

function eliminarMatricula(id,lamatricula){
  
   $('#modalDocument').modal({show:true, backdrop: 'static'});	 
   parametros={ tabla:"aspirantes", campollave:"IDASP",bd:"Mysql",valorllave:id,INSCRITO: 'N',MATRICULA:''};
   $.ajax({
		type: "POST",
		url:"actualiza.php",
		data: parametros,
		success: function(data){
			//eliminamos de dlista
			$('#modalDocument').modal({show:true, backdrop: 'static'});	 
			parametros={ tabla:"dlista", campollave:"ALUCTR",bd:"Mysql",valorllave:lamatricula};
			$.ajax({
				 type: "POST",
				 url:"eliminar.php",
				 data: parametros,
				 success: function(data){
					   //eliminamos de falumnos
					$('#modalDocument').modal({show:true, backdrop: 'static'});	 
					parametros={ tabla:"falumnos", campollave:"ALUM_MATRICULA",bd:"Mysql",valorllave:lamatricula};
					$.ajax({
							type: "POST",
							url:"eliminar.php",
							data: parametros,
							success: function(data){ window.parent.document.getElementById('FRvaspirantes').contentWindow.location.reload(); }
						}); 
				 }
			 });
		}
	});
   
}


function setInscrito(id,valor){
	var hoy= new Date();		
	var elanio=hoy.getFullYear();
	elaniomat=elanio.toString().substring(2,4)
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"aspirantes",
		   campollave:"IDASP",
		   bd:"Mysql",
		   valorllave:id,
		   INSCRITO: valor
	   };
	   $.ajax({
			type: "POST",
			url:"actualiza.php",
			data: parametros,
			success: function(data){
					$.ajax({
						type: "POST",
						url:"../base/getConsecutivo.php?tabla=econsoficial&campok=concat(TIPO,ANIO)&campocons=CONSECUTIVO&valork="+"MATRICULA"+elanio,
						success: function(dataC){
							micons=dataC;							
							mimat=elaniomat+"E40"+pad(micons,3,'0');	
							elsqlpas="call inscribeAspirante('"+id+"','"+mimat+"');";						
							if (micons>0) {
								parametros={
									bd:"mysql",
									sql:elsqlpas,
									dato:sessionStorage.co							
								};

								$.ajax({
									type: "POST",
									url:"../base/ejecutasql.php",
									data:parametros,
									success: function(dataC){				
										alert ("El aspirante "+id+" Ha quedado inscrito con la matricula "+mimat);
										$('#dlgproceso').modal("hide"); 
										if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}										
										window.parent.document.getElementById('FRvaspirantes').contentWindow.location.reload();
									}					     
								});   //ajax del procedimiento de insercion en falumnos  					   
							}
							else {$('#dlgproceso').modal("hide"); }
						}					     
					});  // ajax del consecutivo   
			} 					     
	   }); //ajax de actualizacion   	                
}


function inscribirAspirante(lafila,modulo,institucion, campus) {
	res="";
	var table = $("#G_"+modulo).DataTable();	
	var hoy= new Date();		
	var elanio=hoy.getFullYear();
	elaniomat=elanio.toString().substring(2,4)

	if ((lafila[0]["INSCRITO"]=='N') && (lafila[0]["ACEPTADO"]=='S')) {
		parametros={tabla:"aspirantes",campollave:"IDASP",bd:"Mysql",valorllave:lafila[0][0],INSCRITO: "S"};
		$.ajax({type: "POST",
				url:"actualiza.php",
				data: parametros,
				success: function(data){    
					$.ajax({
						type: "POST",
						url:"../base/getConsecutivo.php?tabla=econsoficial&campok=concat(TIPO,ANIO)&campocons=CONSECUTIVO&valork="+"MATRICULA"+elanio,
						success: function(dataC){
							micons=dataC;							
							mimat=elaniomat+"E40"+pad(micons,3,'0');						
							if (micons>0) {
								parametros={
									bd:"mysql",
									sql:"call inscribeAspirante('"+lafila[0][0]+"','"+mimat+"'); ",
									dato:sessionStorage.co				
								};

								$.ajax({
									type: "POST",
									url:"../base/ejecutasql.php",
									data:parametros,
									success: function(dataC){
										
										if (!(data.substring(0,1)=="0"))	{ 					                	 			                   
											$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" Se inscribio el aspirante "+lafila[0][0]+". Matricula: "+mimat+"\n"); 
											}	
										else {$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" OCURRIO EL SIGUIENTE ERROR: "+data+"\n");}
														
										elReg++;
										if (nreg>elReg) {inscribirAspirante(table.rows(elReg).data(),modulo,institucion,campus);}										
									 }																								     
								});   //ajax del procedimiento de insercion en falumnos  					   
							}
							else {$('#dlgproceso').modal("hide"); }
						}					     
					});  // ajax del consecutivo   	
				}						     
			  });    	  
	} 
	else {
		$('#resul').val($('#resul').val()+(elReg+1)+" de "+(nreg)+" EL ASPIRANTE "+lafila[0][0]+" YA ESTA INSCRITO O NO ESTA ACEPTADO \n");
		elReg++;
		inscribirAspirante(table.rows(elReg).data(),modulo,institucion,campus);	
	}
     
}


/*======================================Envio de Correos =====================================*/


function enviaMail(modulo){
	
	$("#confirmFinalizar").modal("hide");
	if (!($("#vtnRes").is(":visible"))) { 
		mostrarVentRes('vtnRes','txtResultados','grid_'+modulo,'Resultados','modal-lg');
	}
	
	var table =  $("#G_"+modulo).DataTable();	
	var lafila = table.rows(elReg).data();

	mensaje=$("#msjCorreo").val();

	lista=dameParametrosSeparados(mensaje,"{","}");
	for (var i = 0; i < lista.length; i++) {
		var regex = new RegExp("{" + lista[i]  + "}", "gi");
		mensaje=mensaje.replace(regex,lafila[0][lista[i]]);
	}
	
    elcorreo=lafila[0]["CORREO"]; if ($("#inpPrueba").val().length>0) {elcorreo=$("#inpPrueba").val();}

    var parametros = {
		"MENSAJE": mensaje,
		"ADJSERVER": 'S',
		"ASUNTO": $("#elasunto").val(),
		"CORREO" :  elcorreo,
		"NOMBRE" :  lafila[0]["NOMBRE"]+" "+lafila[0]["APEPAT"],
		"ADJUNTO":''
    };

    $.ajax({
        data:  parametros,
        type: "POST",
        url: "../base/enviaCorreo.php",
        success: function(response)
        {
            $('#txtResultados').val($('#txtResultados').val()+(elReg+1)+" de "+(nreg)+" "+response+"\n");
            elReg++;
            if (nreg>=elReg) {enviaMail(modulo);}
        },
        error : function(error) {
            console.log(error);
            $('#txtResultados').val($('#txtResultados').val()+"Error en ajax "+error.toString()+"\n");
        }
	});

}

function envioCorreo(modulo,usuario,essuper) {
	res="";
	var table = $("#G_"+modulo).DataTable();	
	nreg=0;
	elReg=0;
	table.rows().iterator('row', function(context, index){nreg++;});

	mostrarConfirm2("confirmFinalizar", "grid_"+modulo, "Envio de Correo Electrónico",
		      "<div class=\"row\">"+
			  "    <div class=\"col-sm-6\" style=\"text-align:justify;\">"+
			  "         <span class=\"label label-success\">Tipo de Correo</span><BR/>"+
			  "         <select id=\"opcorreo\" onchange=\"cargaMsj();\">"+
			  "              <option value=\"0\">Elija una opción</option> "+
			  "              <option value=\"1\">Clave y Usuario</option>"+
			  "              <option value=\"2\">Correo General</option>"+
			  "              <option value=\"3\">Aviso Exámen</option>"+
			  "         </select>"+
			  "     </div>"+
			  "    <div class=\"col-sm-6\" style=\"text-align:justify;\">"+
			  "         <span class=\"label label-success\">Correo de Prueba</span>"+
			  "         <input class=\"form-control\" id=\"inpPrueba\" value=\"joselupe_2002@hotmail.com\"></input>"+
			  "    </div>"+
			  "</div>"+
			  "<br/>"+
			  "<div class=\"row\">"+
			  "    <div class=\"col-sm-12\">"+
			  "         <span class=\"label label-primary\">Asunto del Correo</span>"+
			  "         <input class=\"form-control\"  id=\"elasunto\" row=\"20\" style=\"width:100%;\"></input>"+
			  "         <span class=\"label label-success\">Mensaje de Correo</span>"+
			  "         <textarea class=\"form-control\"  id=\"msjCorreo\"  style=\"width:100%; height:100px;\"></textarea>"+
			  "     </div>"+	  
		      "</div>","Enviar Correo", "enviaMail('"+modulo+"');","modal-lg");
}

function cargaMsj(){
	$("#elasunto").val();
	$("#msjCorreo").html();

	if  ($("#opcorreo").val()=='1') {
		$("#elasunto").val("ITSM: ENTREGA DE USUARIO Y CLAVE PARA EXÁMEN DE ADMISIÓN");
		$("#msjCorreo").html("ESTIMADO ASPIRANTE <BR/>\n"+"<b>{NOMBRE} {APEPAT} {APEMAT}</b></BR/></BR/>\n"+
		" EL PRESENTE CORREO ES PARA INDICARLE EL USUARIO Y CLAVE PARA EL EXÁMEN DE ADMISIÓN:<BR/><BR/>\n"+
		" <b>USUARIO:</b>{CURP}<BR/>\n"+
		" <b>CLAVE:</b> {CLAVE}<BR/>\n"+
		" <b>PAGINA</b> :<a href=\"https://escolar.webcoretic.com/admision/\">https://escolar.webcoretic.com/admision/</a><BR/>\n"+
		" <b>FECHA:</b> 03/08/2020<BR/>\n"+
		" <b>HORA:</b> 10:00<BR/><BR/>\n"+
		" <b>POR FAVOR CONSULTE EL MANUAL Y VÍDEO PARA LA APLICACIÓN DEL EXÁMEN DE ADMISIÓN</b></BR/>\n"+
		" <a href=\"https://escolar.webcoretic.com/admision/\">Manual</a><BR/>\n"+
		" <a href=\"https://escolar.webcoretic.com/admision/\">Video</a><BR/>\n"
		);
	}

	if  ($("#opcorreo").val()=='2') {
		$("#elasunto").val("ITSM: LEYENDA DEL ASUNTO");
		$("#msjCorreo").html("PARA UN SALTO DE LINEA USE <br/>\n"+
		" PARA COLOCAR NEGRITAS ENCIERRE ENTRE <b>ESTO VA NEGRITA</b>\n"+
		" PARA COLOCAR INFORMACIÓN DEL ASPIRANTE UN CAMPO {TITULO_COLUMNA} EJEMPLO {NOMBRE}\n"+
		" PARA COLOCAR UN ENLACE <a href=\"https://escolar.webcoretic.com/admision/\">Texto del Enlace</a><BR/>\n"
		);
	}

	if  ($("#opcorreo").val()=='3') {
		$("#elasunto").val("ITSM: INFORMACIÓN SOBRE EXÁMEN DE ADMISIÓN");
		$("#msjCorreo").html("<b>AVISO IMPORTANTE ASIPIRANTES AL ITSM</b> <br/><br/>"+
							 "El Instituto Tecnológico Superior de Macuspana atendiendo las "+
							 " disposiciones del Consejo de Salubridad General de nuestro país y con la finalidad "+
							 " de prevenir la propagación del SARS-CoV-2 (COVID-19), comunica a TODOS SUS ASPIRANTES "+
							 " que la aplicación del <b>EXAMEN DE ADMISIÓN</b> se realizará en la <b>MODALIDAD EN LÍNEA,</b> "+
							 " el <b>LUNES 03 DE AGOSTO</b>, para lo que deberá atender las siguientes disposiciones: <br/><br/>"+ 
		
		"1.-  Tener digital o impreso su ficha de ingreso.<br/>"+
		"<br/>2.- Tener la clave de  acceso al examen  que se  les enviará al correo electrónico registrado en su solicitud  de ingreso, con la información necesaria para responder el examen,<br/>"+
		"<br/>3.- Ingresar al examen en línea desde un  dispositivo  electrónico  con  acceso a internet ( PC de escritorio, laptop, tablet o teléfono celular). a través  de la URL <br/>"+
		" <a href=\"https://escolar.macuspana.tecnm.mx/admision/\"> https://escolar.macuspana.tecnm.mx/admision/</a> <br/>"+
		"<br/>4.- El horario del examen es de 9:00 a 13:00 hrs., solicitamos tu puntual  ingreso.<br/>"+
		"<br/>5.- Para dudas y aclaraciones del examen,  vía whatsApp al numero <b> 9361298912 </b> y al correo electrónico <b>escolares@macuspana.tecnm.mx</b><br/>"+
		"<br/>6.- En caso de  interrupción  por   cuestiones  de  internet o energía  eléctrica, el examen guarda las respuestas hasta donde te hayas q uedado y podrás continuar al resolver tu imprevisto técnico.<br/>"+
		"<br/>7.- El examen consta de distintas áreas de conocimiento, por lo que al terminar de responder las preguntas de cada sección, deberás dar click en el botón siguiente para continuar resolviendo el examen. Cuando hayas contestado todas las preguntas, deberás dar click en el botón finalizar  y tu examen se guardara automáticamente.<br/>"+
		"<br/>8.- Publicación de resultados el Martes 04 de agosto de 2020, en nuestra página web <a href=\"https://macuspana.tecnm.mx\"> https://macuspana.tecnm.mx </a> <br/>"+
		
		"<br/><b>Les sugerimos estar atentos a las redes sociales oficiales del instituto.</b><br/>"+
		
		"<b>Facebook: <a href=\"https://www.facebook.com/tecnologico.macuspana.73\"> Itsm Tecnologico Macuspana</b><br/>"+
		"<b>Instragram: itsdemacuspana</b><br/>"
		
		);
	}

}

