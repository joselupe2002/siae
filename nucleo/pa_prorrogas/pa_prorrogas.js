var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;
elcorreoins="";
elcorreo="";
eltel="";
matricula="";
nombre="";

    jQuery(function($) { 
		$(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
		$(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});
		cargarProrroga();
	});
	
	
		

/*===========================================================POR MATERIAS ==============================================*/
function cargarProrroga(){

	cadSql="select ID,CICLO, AUTORIZADA, TIPOPAGO, MATRICULA, NOMBRE, CORREO, CORREOINS, TELEFONO, YEAR(NOW()), RUTA, TIPOPAGOD, PAGO1, "+
	"DATEDIFF(STR_TO_DATE(PAGO1,'%d/%m/%Y'),now()) AS DIF, "+
	" ifnull((SELECT RUTA FROM eadjreins n where n.ID=a.ID),'') AS RUTAPAGO,"+
	" ifnull((SELECT COTEJADO FROM eadjreins n where n.ID=a.ID),'N') AS COTEJADO"+
	" from vprorrogas a where MATRICULA='"+usuario+"' AND CICLO=getciclo() AND AUTORIZADA='S' AND PAGADA='N'";

	parametros={sql:cadSql,dato:sessionStorage.co,bd:"Mysql"}
	$("#informacion").empty();		
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data2){  
				generaTabla(JSON.parse(data2));   													
				ocultarEspera("esperaInf");  	

			}
		});
				  					  		
}

function generaTabla(grid_data){	
	contAlum=1;
	$("#prorroga").empty();
	cont=1;

	ladefault="../../imagenes/menu/pdf.png";

	jQuery.each(grid_data, function(clave, valor) { 

		stElim="display:none; cursor:pointer;";
		if (valor.RUTA.length>0) {stElim="cursor:pointer; display:block; ";}
		
		elcorreoins=valor.CORREOINS;
		elcorreo=valor.CORREO;
		eltel=valor.TELEFONO;
		matricula=valor.MATRICULA;
		nombre=valor.NOMBRE;
		

    	btnEliminar="<i style=\""+stElim+"\"  id=\"btnEli_RUTA\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
        "onclick=\"eliminarEnlaceDrive('file_RUTA','PRORROGAS','pdf_RUTA','RUTA','pdf','S','ID','"+
        valor.ID+"','"+valor.MATRICULA+"','prorrogas','edita','');\"></i> "; 

		if (valor.AUTORIZADA=='S') {btnEliminar="";}

		laclase="badge badge-success";
		leyendaday="Días restan";

		if (valor.DIF==0) {laclase="badge badge-warning"; leyendaday="Vence hoy"; }
		if (valor.DIF==1) {laclase="badge badge-pink"; leyendaday="Vence en 1 día";}
		if (valor.DIF<0) {laclase="badge badge-danger"; leyendaday="Vencida "+Math.abs(valor.DIF)+" días de retraso"; }
		if (valor.DIF>1) {laclase="badge badge-success"; leyendaday="Vence en "+valor.DIF+" días";}

	
		
		$("#prorroga").append("<div class=\"alert alert-danger\">"+
		                       "  <div class=\"row\">"+
							   "         <div class=\"fontRobotoB col-sm-6 \">"+
							   "             <div class=\"row\">"+
							   "                  <span class=\"bigger-160 text-danger\">TIENE PRORROGA EN: "+valor.TIPOPAGOD+"<br>"+							   
							   "           		  <span class=\"label label-white middle fontRoboto bigger-60  label-primary\">VENCE EL: "+valor.PAGO1+"</span>"+							   
							   "           		  <span class=\""+laclase+"\">"+leyendaday+"</span>"+							   
							   "        	 </div>"+
							   "             <div class=\"row\" style=\"text-align:right;\">"+
							   "                  <button onclick=\"enviarNotiPago('img_reciboreins"+valor.ID+"');\" class=\"btn btn-white btn-info btn-bold\">"+
							   "                  <i class=\"ace-icon fa fa-share-square-o bigger-120 blue\"></i>"+
							   "                  Enviar Notificación de Pago</button> "+
							   "        	 </div>"+
							   "         </div>"+
							   "         <div class=\"col-sm-6 fontRobotoB col-sm-8 bigger-160 text-danger\">"+
							   "             <div class=\"row\">"+
							   "                <div class=\"col-sm-8\">"+
							   "                      <label>Compromiso y Credencial Firmada</label>"+
							   "                      <input class=\"fileSigea\" type=\"file\" id=\"file_RUTA"+valor.ID+"\""+
							   "                          onchange=\"subirPDFDriveSave('file_RUTA"+valor.ID+"','PRORROGAS','pdf_RUTA"+valor.ID+"','RUTA"+valor.ID+"','pdf','S','ID','"+valor.ID+"','"+valor.MATRICULA+"','prorrogas','edita','');\"/>"+
							   "                      <input  type=\"hidden\" value=\""+valor.RUTA+"\"  id=\"RUTA"+valor.ID+"\"  placeholder=\"\" />\n"+
							   "                </div> "+							   
							   "                <div class=\"col-sm-3\" style=\"padding-top:10px;\">"+
							   "                     <a target=\"_blank\" id=\"enlace_RUTA"+valor.ID+"\" href=\""+valor.RUTA+"\">"+
							   "                         <img id=\"pdf_RUTA"+valor.ID+"\"  src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
							   "                     </a>"+
							   "                     <div class=\"col-sm-1\">"+btnEliminar+"</div>"+
							   "                </div>"+
							   "             </div> "+
							   "             <div id=\"elpago"+valor.ID+"\">"+							  
							   "             </div> "+

							   "         </div>"+	
							   "   </div>"+		                    
							   "</div>");

			
			if (valor.RUTA=='') { 
					$('#enlace_RUTA'+valor.ID).attr('disabled', 'disabled');
					$('#enlace_RUTA'+valor.ID).attr('href', '#');
					$('#pdf_RUTA'+valor.ID).attr('src', "../../imagenes/menu/pdfno.png");					
				 }

			if (valor.AUTORIZADA=='S') {$("#file_RUTA"+valor.ID).remove();}

			eltag=dameFecha("TAG");
			txtop="PAGO PRORROGA "+valor.TIPOPAGOD;
			idop=valor.TIPOPAGO+"P";
							 

			activaEliminar="S";
			if (valor.COTEJADO=='S') {activaEliminar="N";}
			dameSubirArchivoDrive("elpago"+valor.ID,"Recibo: "+txtop,"reciboreins"+valor.ID,'RECIBOREINS','pdf',
			'ID',valor.ID,'RECIBO DE PAGO '+txtop,'eadjreins','alta',usuario+"_"+valor.CICLO+"_"+idop,valor.RUTAPAGO,activaEliminar);	
					

		contAlum++;     
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


function enviarNotiPago(comp){
	if ($("#"+comp).attr("src")!='..\\..\\imagenes\\menu\\pdfno.png'){
	
			mostrarEspera("esperaInf","grid_pa_prorrogas","Enviando Correo...");
			elsql="SELECT (select EMPL_CORREOINS from fures b, pempleados c where URES_URES=406 and b.URES_JEFE=c.EMPL_NUMERO) AS CORREOCONTA,"+ 
						 "(select EMPL_CORREOINS from falumnos a, fures b, pempleados c where ALUM_MATRICULA='"+matricula+"' AND ALUM_CARRERAREG=b.CARRERA and b.URES_JEFE=c.EMPL_NUMERO) as CORREOJEFE "+
						 " FROM DUAL";
	

			parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
			$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){   
			
					elcorreoConta=JSON.parse(data)[0][0];
					elcorreoJefe=JSON.parse(data)[0][1];
					mensaje="<html>El alumno <span style=\"color:green\"><b>"+matricula+" "+nombre+"</b></span> ha subido su pago de prorroga para ser cotejado <br>"+
					"<b>Datos de contacto del alumno:</b><br>"+
					"<b>Correo:</b>"+elcorreo+"<br>"+
					"<b>Correo:</b>"+eltel+"<br>"+
					" <html>";

					var parametros = {
						"MENSAJE": mensaje,
						"ADJSERVER": 'N',
						"ASUNTO": 'ITSM: PAGO DE PRORROGA SUBIDO '+matricula+" "+nombre,
						"CORREO" :  elcorreoConta,
						"NOMBRE" :  nombre,
						"ADJUNTO":'',
						"COPIA": elcorreoJefe
					};
				
					$.ajax({
						data:  parametros,
						type: "POST",
						url: "../base/enviaCorreoCopia.php",
						success: function(response)
						{
						console.log("CONTABILIDAD: "+response);
						ocultarEspera("esperaInf");  
						alert ("Su notificación ha sido enviado, no es necesario que vuelva a dar clic a este botón")
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
		else { alert ("No se ha adjuntado el pago");}  

}