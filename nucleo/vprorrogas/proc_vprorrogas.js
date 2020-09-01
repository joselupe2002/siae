var table;
var nreg=0;
var elReg=0;


function setAutorizado(id,valor){
	$('#modalDocument').modal({show:true, backdrop: 'static'});	 
	   parametros={
		   tabla:"prorrogas",
		   campollave:"ID",
		   bd:"Mysql",
		   valorllave:id,
		   AUTORIZADA: valor
	   };
	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		   $('#dlgproceso').modal("hide"); 
		   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
		   window.parent.document.getElementById('FRvprorrogas').contentWindow.location.reload();
	   }					     
	   });    	                
}


//Actualiza Usuario 
function Autorizar(modulo,usuario,institucion, campus,essuper) {
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
        if (table.rows('.selected').data()[0]["AUTORIZADA"]=='S') {
			if (confirm("Desea DESAUTORIZAR PRORROGA DE: "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"])) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"N");
				
			}
		}
		else {
			if (confirm("Desea AUTORIZAR PRORROGA DE: "+table.rows('.selected').data()[0]["MATRICULA"]+" "+table.rows('.selected').data()[0]["NOMBRE"])) {
				setAutorizado(table.rows('.selected').data()[0]["ID"],"S");
				if (table.rows('.selected').data()[0]["TIPOPAGO"]=='I') {enviarCorreoJefe(modulo,"I");}
				else {enviarCorreoJefe(modulo,"N");}
				
			}
		} 

	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}    
}



function enviarCorreoJefe(modulo,tipo){			
	table = $("#G_"+modulo).DataTable();
	elcorreoalum=table.rows('.selected').data()[0]["CORREO"];
	matricula=table.rows('.selected').data()[0]["MATRICULA"];
	eltelefono=table.rows('.selected').data()[0]["TELEFONO"];
	nombre=table.rows('.selected').data()[0]["NOMBRE"];
	pagos=table.rows('.selected').data()[0]["PAGOS"];
	pago1=table.rows('.selected').data()[0]["PAGO1"];
	pago2=table.rows('.selected').data()[0]["PAGO2"];


	mensaje=" a las materias de su Programa Educativo";
	elsql="select EMPL_CORREOINS from falumnos a, fures b, pempleados c "+
	" where ALUM_MATRICULA='"+matricula+"' AND ALUM_CARRERAREG=b.CARRERA and b.URES_JEFE=c.EMPL_NUMERO";

	if (tipo=='I') {mensaje=" a las materias de Ingl&eacute;s";
                    elsql="select EMPL_CORREOINS from fures b, pempleados c where URES_URES=601 and b.URES_JEFE=c.EMPL_NUMERO";}


	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
	type: "POST",
	data:parametros,
	url:  "../base/getdatossqlSeg.php",
	success: function(data){   

			elcorreo=JSON.parse(data)[0][0];
			mensaje="<html>La Prorroga del Alumno <span style=\"color:green\"><b>"+matricula+" "+nombre+"</b></span> ha sido "+
			"<span style=\"color:blue\"><b> AUTORIZADA </b></span> , "+
			" ya se puede realizar su proceso de reinscripci&oacute;n"+mensaje+" <BR>"+
			"<b>Datos de contacto del alumno:</b><br>"+
			"<b>Correo:</b>"+elcorreoalum+"<br>"+
			"<b>Tel&eacute;fono:</b>"+eltelefono+"<br>"+
			"<b>No. de Pagos:</b>"+pagos+"<br>"+
			"<b>Pago 1:</b>"+pago1+"<br>"+
			"<b>Pago 2:</b>"+pago2+"<br>"+
			" <html>";

			var parametros = {
				"MENSAJE": mensaje,
				"ADJSERVER": 'N',
				"ASUNTO": 'ITSM: AUTORIZACION DE PRORROGA '+matricula+" "+nombre,
				"CORREO" :  elcorreo,
				"NOMBRE" :  table.rows('.selected').data()[0]["NOMBRE"],
				"ADJUNTO":''
			};
		
			$.ajax({
				data:  parametros,
				type: "POST",
				url: "../base/enviaCorreo.php",
				success: function(response)
				{
				   console.log("JEFE: "+response);
				},
				error : function(error) {
					console.log(error);
					alert ("Error en ajax "+error.toString()+"\n");
				}
			});

			
	},
	error: function(data) {	                  
			alert('ERROR: '+data);
			$('#dlgproceso').modal("hide");  
		}
	}); 	    

}



function impFormato(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	fila=table.rows('.selected').data();
	enlace="nucleo/vprorrogas/formato.php?id="+fila[0]["ID"];
	abrirPesta(enlace, "Formato")
	
   //window.open(enlace, '_blank'); 
  }


function envioCorreoAlum(modulo,usuario,essuper) {
	getVentanaCorreo("pinscripcion","CORREO");
	
}


function adjFormato(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	ladefault="..\\..\\imagenes\\menu\\pdf.png";
	if (table.rows('.selected').data().length>0) {
		 
		stElim="display:none; cursor:pointer;";
    	if (table.rows('.selected').data()[0]["RUTA"].length>0) {stElim="cursor:pointer; display:block; ";}
    	btnEliminar="<i style=\""+stElim+"\"  id=\"btnEli_RUTA\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
        "onclick=\"eliminarEnlaceDrive('file_RUTA','PRORROGAS','pdf_RUTA','RUTA','pdf','S','ID','"+
        table.rows('.selected').data()[0]["ID"]+"','"+table.rows('.selected').data()[0]["MATRICULA"]+
                                        "','prorrogas','edita','');\"></i> "; 
    	
    	 
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-sm \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header bg-info\" >"+
		   "             <span><i class=\"menu-icon green fa-2x fa fa-cloud-upload\"></i><span class=\"text-success lead \"> <strong>Subir Documento</strong></span></span>"+
		   "             <button type=\"button\" class=\"close\" onclick=\"cierraModal('"+modulo+"');\"  aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\">"+	
		   "                  <div class=\"row\"> "+
		   "                     <div class=\"col-sm-12\">"+
		   "                         <span class=\"label label-sm label-success arrowed-in\">"+table.rows('.selected').data()[0]["MATRICULA"]+"</span>"+
		   "                     </div>"+
		   "                  </div> "+
		   "                  <div class=\"row\"> "+
		   "                     <div class=\"col-sm-12\">"+
		   "                         <span class=\"label label-sm label-primary arrowed-in\">"+table.rows('.selected').data()[0]["NOMBRE"]+"</span>"+
		   "                     </div>"+
		   "                  </div> "+
		   "                  <div class=\"space-12\"></div> "+
		   "                  <div class=\"row\"> "+
		   "                     <div class=\"col-sm-3\"></div>"+
		   "                     <div class=\"col-sm-5\">"+
		   "                          <a target=\"_blank\" id=\"enlace_RUTA\" href=\""+table.rows('.selected').data()[0]["RUTA"]+"\">"+
		   "                               <img id=\"pdf_RUTA\" name=\"pdf_RUTA\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
		   "                          </a>"+
		   "                     </div>"+
		   "                     <div class=\"col-sm-1\">"+btnEliminar+"</div>"+
		   "                     <div class=\"col-sm-3\"></div>"+
		   "                  </div>"+
		   "                  <div class=\"space-12\"></div> "+
		   "                  <div class=\"row\"> "+
		   "                    <div class=\"col-sm-12\">"+
		   "                      <input type=\"file\" id=\"file_RUTA\" name=\"file_RUTA\""+
	       "                          onchange=\"subirPDFDriveSave('file_RUTA','PRORROGAS','pdf_RUTA','RUTA','pdf','S','ID','"+table.rows('.selected').data()[0]["ID"]+"','"+table.rows('.selected').data()[0]["MATRICULA"]+"','prorrogas','edita','');\"/>"+
	       "                      <input  type=\"hidden\" value=\""+table.rows('.selected').data()[0]["RUTA"]+"\"  name=\"RUTA\" id=\"RUTA\"  placeholder=\"\" />\n"+
           "                  </div> "+
	       "                 </div>"+		  
	       "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   " <select id=\"aulas\" style=\"visibility:hidden\"></select> "
		   "</div>";
	 
		$("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	    }
	    
	    	 if (table.rows('.selected').data()[0]["RUTA"]=='') { 
	                $('#enlace_RUTA').attr('disabled', 'disabled');
	                $('#enlace_RUTA').attr('href', '#');
	                $('#pdf_RUTA').attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
	       	    }
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
	
	    $('#file_RUTA').ace_file_input({
			no_file:'No File ...',
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
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}
}


function cierraModal(modulo){
	table = $("#G_"+modulo).DataTable();
	var cell = table.cell('.selected', 15);
	cell.data( $('#RUTA').val() ).draw();
	//window.parent.document.getElementById('FRvprorrogas').contentWindow.location.reload();
	$('#modalDocument').modal("hide");  
}


function verFormato(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["RUTA"]) {
			abrirPesta(table.rows('.selected').data()[0]["RUTA"],table.rows('.selected').data()[0]["MATRICULA"])
		}
		else {
			alert ("No se ha adjuntando PDF")
			}
		}
	else {
		alert ("Debe seleccionar a un alumno");
		return 0;
		}	
}
