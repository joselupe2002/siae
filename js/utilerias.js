var ec_nreg=0;

function dameMesLetra(nummes) {
		var meses=["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
        return meses[nummes-1];
	}



	
	function utf8Encode(unicodeString) {
		    if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
		    const utf8String = unicodeString.replace(
		        /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
		        function(c) {
		            var cc = c.charCodeAt(0);
		            return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
		    ).replace(
		        /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
		        function(c) {
		            var cc = c.charCodeAt(0);
		            return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
		    );
		    return utf8String;
		}

	
		function utf8Decode(utf8String) {
		    if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
		    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
		    const unicodeString = utf8String.replace(
		        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
		        function(c) {  // (note parentheses for precedence)
		            var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
		            return String.fromCharCode(cc); }
		    ).replace(
		        /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
		        function(c) {  // (note parentheses for precedence)
		            var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
		            return String.fromCharCode(cc); }
		    );
		    return unicodeString;
		}
		
		
/*==================================CONVERTIR TABLA HTML a DATATABLE =============================*/
		function convertirDataTable (latabla){
			

			if ($("#opciones"+latabla).hasClass('hide')){
				if (! $.fn.DataTable.isDataTable( '#'+latabla)) {
						myTable=$("#"+latabla).DataTable({
							"paging":   false,
							"ordering": false,
							"info":     false});
						$(".dataTables_filter").css("display","none");
		
						$('#buscar'+latabla).keyup(function(){
							myTable.search($(this).val()).draw() ;
						});
		
						$.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';
						new $.fn.dataTable.Buttons( myTable, {
														buttons: [
															{
																"extend": "colvis",
																"text": "<i title='Columnas' class='fa fa-list-ul bigger-110 blue'></i>",
																"className": "btn btn-white btn-primary btn-bold",
																columns: ':not(:first):not(:last)'
															},
															{
																"extend": "copy",
																"text": "<i title='Copiar Datos' class='fa fa-copy bigger-110 pink'></i>",
																"className": "btn btn-white btn-primary btn-bold"
															},
															{
																"extend": "csv",
																"charset": "UTF-8",
																"text": "<i title='Exportar a Excel' class='glyphicon glyphicon-export bigger-110 orange'></i>",
																"className": "btn btn-white btn-primary btn-bold"
															}]
														});
		
		
						myTable.buttons().container().appendTo( $('#botones'+latabla) );
						//Columnas que se desean visualizar en el grid 
						var defaultColvisAction = myTable.button(0).action();
						myTable.button(0).action(function (e, dt, button, config) {
							defaultColvisAction(e, dt, button, config);		
							if($('.dt-button-collection > .dropdown-menu').length == 0) {
								$('.dt-button-collection')
								.wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
								.find('a').attr('href', '#').wrap("<li />")
							}
						//	$('.dt-button-collection').appendTo('.tableTools-container .dt-buttons')
						});
					}
		
						$("#opciones"+latabla).removeClass("hide");
					}
				else
				   { $("#opciones"+latabla).addClass("hide"); }
		}

/*=====================================FUNCIONES PARA DECODIFICAR LAS HORAS HH:MM-HH:MM ============================*/


function validarHora(hora){
    cad="";
	if (hora.indexOf(":")>0){ 
	    lahora=hora.split(":")[0].trim();
		elmin=hora.split(":")[1].trim();	

		if ((lahora>23) || (lahora<1)) { cad+="La hora debe estar entre 01 y 23\n";}
		if ((elmin>60) || (lahora<1)) { cad+="Los minutos deben estar entre 01 y 59\n";}
	}
	else {cad+="No se ha capturado una hora correcta\n";}
	return (cad);
}

function dameMinutos(hora){
    min=0;
	if (hora.indexOf(":")>0){ 
	    lahora=hora.split(":")[0].trim();
		elmin=hora.split(":")[1].trim();
		min=(parseInt(lahora)*60)+parseInt(elmin);	
	}
	return min;
}

function decodificaHora(horario) {
	var datos=[];
	if (horario.indexOf("-")>0){ 
	    horario1=horario.split("-")[0].trim();
		horario2=horario.split("-")[1].trim();	  
	} else {horario1="00"; horario2="00";} 
	
	hora1=horario1.substr(0,horario1.indexOf(":"));
	min1=horario1.substr(horario1.indexOf(":")+1,horario1.length);			   
	
	hora2=horario2.substr(0,horario2.indexOf(":"));
	min2=horario2.substr(horario2.indexOf(":")+1,horario2.length);			   
	
	mintot1=parseInt(hora1)*60+parseInt(min1);
	mintot2=parseInt(hora2)*60+parseInt(min2);	
	
	datos[0]=hora1;datos[1]=min1;datos[2]=hora2;datos[3]=min2;datos[4]=mintot1;datos[5]=mintot2;
	return datos;
}


function obtenerHorarios(id,elciclo,linea){
	var cadFin="";
	res=true;
	elsql="SELECT PROFESOR,PROFESORD,MATERIA,MATERIAD,SIE,LUNES_1,MARTES_1,MIERCOLES_1,JUEVES_1,VIERNES_1,SABADO_1,DOMINGO_1,"+
	       "LUNES_A,MARTES_A,MIERCOLES_A,JUEVES_A, VIERNES_A, SABADO_A, DOMINGO_A "+
		   " FROM `vedgrupos` b where b.`CICLO`='"+elciclo+"' and  IDDETALLE<>"+id;
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
			
			   for (x=3; x<=9; x++) { 
				   if (!($("#c_"+linea+"_"+x).val()==null) && !($("#c_"+linea+"_"+x).val()=='')) {
					   cadFin+=validaCruceHorario("PROFESOR",0,$("#c_"+linea+"_2").val(),$("#c_"+linea+"_2 option:selected").text(),
					                       JSON.parse(data),x+2,$("#c_"+linea+"_"+x).val(),linea);}   	      				 	
			   }
		
			   for (x=3; x<=9; x++) { 
				if (!($("#c_"+linea+"_"+x).val()==null) && !($("#c_"+linea+"_"+x).val()==''))  {
					cadFin+=validaCruceHorario("AULA",x+9,$("#c_"+linea+"_"+x+"B").val(),$("#c_"+linea+"_"+x+"B option:selected").text(),
										JSON.parse(data),x+2,$("#c_"+linea+"_"+x).val(),linea);}   	      				 	
			   }
			   cadFin+="\n";
			   if (cadFin.trim().length>0) {alert (cadFin); res=false; return false;}			
		 },
		 error: function(data) {	                  
					alert('ERROR: '+data);
					res=false;
					return false;
								  }
	});	  
	return res;   
}


function validarCruce (arreglo,horariodia){
	arreglo=Burbuja(arreglo);
	renglonInicial=[];	renglonInicial=arreglo[0].split("|");
	renglonFinal=[]; renglonFinal=arreglo[arreglo.length-1].split("|");	
	hordia=decodificaHora(horariodia);

	if (hordia[5]<=renglonInicial[0]) { return true;} //en caso de que el horario sea antes de todo el inicio 
	if (hordia[4]>=renglonFinal[1]) { return true;} //en caso de que el horario sea despues del final 
	 
	var encontre=false;
	terant=renglonInicial[1];
	for (i=1;i<arreglo.length;i++){
		renglonNuevo=arreglo[i].split("|");
		if ((parseInt(hordia[4]) >= parseInt(terant)) && (parseInt(hordia[5])<=parseInt (renglonNuevo[0]))) {
		   encontre=true;
		}  
		terant=renglonNuevo[1];
	}
	return encontre;
}


function getEspacio (arreglo,horariodia){	
	cad="";
	renglonInicial=[];	renglonInicial=arreglo[0].split("|");
	renglonFinal=[]; renglonFinal=arreglo[arreglo.length-1].split("|");	
	hordia=decodificaHora(horariodia);
	//cad=""; for (i=0;i<arreglo.length;i++){cad+=arreglo[i]+"\n";} alert ("EL ARREGLO: \n"+cad);

	if (hordia[5]<=renglonInicial[0]) {cad=renglonInicial[2]; return cad;} //en caso de que el horario sea antes de todo el inicio 
	if (hordia[4]>=renglonFinal[1]) { cad=renglonFinal[2]; return cad;} //en caso de que el horario sea despues del final 
	 
	terant=renglonInicial[1];
	for (i=1;i<arreglo.length;i++){
		renglonNuevo=arreglo[i].split("|");
		if ((parseInt(hordia[4]) >= parseInt(terant)) && (parseInt(hordia[5])<=parseInt (renglonNuevo[0]))) {
		   	cad=renglonNuevo[2];
		   return cad;
		}  
		terant=renglonNuevo[1];
	}
	return cad;
}

  	      				 
function validaCruceHorario(tipo,indiceComparar,valorComparar,valorComparard,loshorarios,indiceDia,horariodia,linea) {
	var eldia=[];
	var cad="";
	j=0;
    eldia=[];
	jQuery.each(loshorarios, function(clave, valor) { 
	    if (loshorarios[clave][indiceComparar]==valorComparar) {
			if (loshorarios[clave][indiceDia].length>0) {
  			    horariodec=decodificaHora(loshorarios[clave][indiceDia]);
				eldia[j]=horariodec[4]+"|"+horariodec[5];		
			    j++;
			}
		}
	});
	todobien=true;
	if (eldia.length>0) {todobien=validarCruce(eldia,horariodia);}
	if (!todobien) { 
		cad+="Error: "+tipo+" "+valorComparard+ " No disponible en el horario "+horariodia+"\n";
		$("#c_"+linea+"_"+(indiceDia-2)).css("border-color","red");
	}

	return cad;
}

/*=================================================================================================================*/

function Burbuja(lista) {

    var n, i, k, aux;
    n = lista.length;
    // Algoritmo de burbuja
    for (k = 1; k < n; k++) {
        for (i = 0; i < (n - k); i++) {			
            if (parseInt(lista[i].split("|")[0]) > parseInt(lista[i + 1].split("|")[0])) {
                aux = lista[i];
                lista[i] = lista[i + 1];
                lista[i + 1] = aux;
            }
        }
    }
    return lista;
}


function BurbujaCadena(lista) {
    var n, i, k, aux;
    n = lista.length;
    // Algoritmo de burbuja
    for (k = 1; k < n; k++) {
        for (i = 0; i < (n - k); i++) {
            if (lista[i].split("|")[0] > lista[i + 1].split("|")[0]) {
                aux = lista[i];
                lista[i] = lista[i + 1];
                lista[i + 1] = aux;
            }
        }
    }
    return lista;
}

/*================================================FUNCION PARA CREAR VENTANAS BOOTSTRAP ==============================*/
function dameVentana(nombre,contenedor,titulo,tam,colorfondohead,imaico, alto){
	script="<div class=\"modal fade\" id=\""+nombre+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	"   <div class=\"modal-dialog modal-"+tam+"\"  role=\"document\">"+
	"      <div class=\"modal-content\">"+
	"          <div class=\"modal-header "+colorfondohead+"\" >"+
	"             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	"                  <span aria-hidden=\"true\">&times;</span>"+
	"             </button>"+
	"             <span><i class=\"menu-icon "+imaico+"\"></i><span class=\"text-success lead \"> <strong>"+titulo+"</strong></span></span>"+	   
	"          </div>"+
	"          <div id=\"body_"+nombre+"\" class=\"modal-body\"  style=\"height:"+alto+"px; overflow-y: auto;\">"+	
	"          </div>"+
	"      </div>"+
	"   </div>"+
	"</div>";
	$("#"+nombre).remove();
    if (! ( $("#"+nombre).length )) {
	        $("#"+contenedor).append(script);	     
	    }	    
    $('#'+nombre).modal({show:true, backdrop: 'static'});

}


/*================================================FUNCION PARA AGREGAR DIALOGO DE ESPERA =================================================*/

function mostrarEspera (nombre,contenedor, mensaje){

	script=    "<div class=\"modal fade\" id=\""+nombre+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	           "   <div class=\"modal-dialog modal-sm \" role=\"document\">"+
               "         <div class=\"modal-content\">"+
               "             <div class=\"modal-header bg-danger\" >"+
    		   "                  <span><i class=\"menu-icon green fa-2x fa fa-spinner\"></i><span class=\"text-success lead \"> <strong>"+mensaje+"</strong></span></span>"+
    		   "          </div>"+
               "             <div class=\"modal-body\" style=\"text-align: center;\">"+
               "                  <img src=\"../../imagenes/menu/esperar.gif\" style=\"background: transparent; width: 100px; height: 80px\"/>	"+
               "             </div>"+     
               "         </div>"+
               "   </div>"+
               "</div>";
	$("#"+contenedor).append(script);
	$('#'+nombre).modal({show:true, backdrop: 'static'});
}

function mostrarEsperaAsp (nombre,contenedor, mensaje){

	script=    "<div class=\"modal fade\" id=\""+nombre+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	           "   <div class=\"modal-dialog modal-sm \" role=\"document\">"+
               "         <div class=\"modal-content\">"+
               "             <div class=\"modal-header bg-danger\" >"+
    		   "                  <span><i class=\"menu-icon green fa-2x fa fa-spinner\"></i><span class=\"text-success lead \"> <strong>"+mensaje+"</strong></span></span>"+
    		   "          </div>"+
               "             <div class=\"modal-body\" style=\"text-align: center;\">"+
               "                  <img src=\"../imagenes/menu/esperar.gif\" style=\"background: transparent; width: 100px; height: 80px\"/>	"+
               "             </div>"+     
               "         </div>"+
               "   </div>"+
               "</div>";
	$("#"+contenedor).append(script);
	$('#'+nombre).modal({show:true, backdrop: 'static'});
}

function mostrarConfirm (nombre,contenedor, titulo, mensajeInfo, mensajeConfirm,mensajebtn, eventoConfirm,tam){
	$("#"+nombre).remove();
	tamMsj="110";
	if (tam="modal-lg") {tamMsj="160";} 
	script=    "<div class=\"modal fade\" id=\""+nombre+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	           "   <div class=\"modal-dialog "+tam+"\" role=\"document\">"+
               "         <div class=\"modal-content\">"+
               "             <div class=\"modal-header bg-info\" >"+
			   "                  <span><i class=\"menu-icon green fa-2x fa fa-info\"></i>"+
			   "                        <span class=\"text-success lead \"> <strong>"+titulo+"</strong></span>"+
			   "                  </span>"+
			   "                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> "+
               "                        <span aria-hidden=\"true\">&times;</span> "+
               "                  </button> "+
    		   "             </div>"+
			   "             <div class=\"modal-body\" style=\"text-align: center;\">"+
			   "                   <div class=\"alert alert-info bigger-110\">"+mensajeInfo+"</div>"+
			   "                    <div class=\"space-6\"></div>"+
			   "                    <p id=\"msjConfirm\" class=\"bigger-"+tamMsj+" bolder center grey\">"+
			   "                        <i class=\"ace-icon fa fa-hand-o-right blue bigger-"+tamMsj+"\"></i><strong>"+mensajeConfirm+"</strong>"+
		       "                    </p>"+
			   "             </div>"+     
			   "             <div class=\"modal-footer\"> "+               
			   "                  <button type=\"button\" class=\"btn btn-white  btn-danger btn-round\" data-dismiss=\"modal\">Cancelar</button>"+
			   "                  <button type=\"button\" class=\"btn btn-white  btn-primary btn-round\" onclick=\""+eventoConfirm+"\"><strong>"+mensajebtn+"</strong></button>"+
               "             </div>"+
               "         </div>"+
               "   </div>"+
               "</div>";
	$("#"+contenedor).append(script);
	$('#'+nombre).modal({show:true, backdrop: 'static'});
}

function mostrarConfirm2 (nombre,contenedor, titulo, mensajeInfo,mensajebtn, eventoConfirm,tam){
	$("#"+nombre).remove();
	tamMsj="110";
	if (tam="modal-lg") {tamMsj="160";} 
	script=    "<div class=\"modal fade\" id=\""+nombre+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	           "   <div class=\"modal-dialog "+tam+"\" role=\"document\">"+
               "         <div class=\"modal-content\">"+
               "             <div class=\"modal-header bg-info\" >"+
			   "                  <span><i class=\"menu-icon green fa-2x fa fa-info\"></i>"+
			   "                        <span class=\"text-success lead \"> <strong>"+titulo+"</strong></span>"+
			   "                  </span>"+
			   "                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> "+
               "                        <span aria-hidden=\"true\">&times;</span> "+
               "                  </button> "+
    		   "             </div>"+
			   "             <div class=\"modal-body\" style=\"text-align: center;\">"+
			                        mensajeInfo+
			   "             </div>"+     
			   "             <div class=\"modal-footer\"> "+               
			   "                  <button type=\"button\" class=\"btn btn-white  btn-danger btn-round\" data-dismiss=\"modal\">Cancelar</button>"+
			   "                  <button type=\"button\" class=\"btn btn-white  btn-primary btn-round\" onclick=\""+eventoConfirm+"\"><strong>"+mensajebtn+"</strong></button>"+
               "             </div>"+
               "         </div>"+
               "   </div>"+
               "</div>";
	$("#"+contenedor).append(script);
	$('#'+nombre).modal({show:true, backdrop: 'static'});
}


function mostrarVentanaCierre (nombre,contenedor, titulo, mensajeInfo,mensajebtn, eventoConfirm,tam){
	$("#"+nombre).remove();
	tamMsj="110";
	if (tam="modal-lg") {tamMsj="160";} 
	script=    "<div class=\"modal fade\" id=\""+nombre+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	           "   <div class=\"modal-dialog "+tam+"\" role=\"dialog\">"+
               "         <div class=\"modal-content\">"+
               "             <div class=\"modal-header bg-info\" >"+
			   "                  <span><i class=\"menu-icon green fa-2x fa fa-info\"></i>"+
			   "                        <span class=\"text-success lead \"> <strong>"+titulo+"</strong></span>"+
			   "                  </span>"+
			   "                  <button type=\"button\" class=\"close\" onclick=\"cierraModal();\"  data-dismiss=\"modal\" aria-label=\"Close\"> "+
               "                        <span aria-hidden=\"true\">&times;</span> "+
               "                  </button> "+
    		   "             </div>"+
			   "             <div class=\"modal-body\">"+
			                        mensajeInfo+
			   "             </div>"+     
			   "             <div class=\"modal-footer\"> "+               
			   "                  <button type=\"button\" class=\"btn btn-white  btn-danger btn-round\"onclick=\"cierraModal();\" >Cancelar</button>"+
			   "                  <button type=\"button\" class=\"btn btn-white  btn-primary btn-round\" onclick=\""+eventoConfirm+"\"><strong>"+mensajebtn+"</strong></button>"+
               "             </div>"+
               "         </div>"+
               "   </div>"+
               "</div>";
	$("#"+contenedor).append(script);
	$('#'+nombre).modal({show:true, backdrop: 'static'});
}

function mostrarIfo(nombre,contenedor, titulo, mensajeInfo,tam){
	tamMsj="110";
	$("#"+nombre).remove();
	if (tam="modal-lg") {tamMsj="160";} 
	script=    "<div class=\"modal fade\" id=\""+nombre+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	           "   <div class=\"modal-dialog "+tam+"\" role=\"document\">"+
               "         <div class=\"modal-content\">"+
               "             <div class=\"modal-header bg-success\" >"+
			   "                  <span><i class=\"menu-icon yellow fa-2x fa fa-info\"></i>"+
			   "                        <span class=\"text-success lead \"> <strong>"+titulo+"</strong></span>"+
			   "                  </span>"+
			   "                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> "+
               "                        <span aria-hidden=\"true\">&times;</span> "+
               "                  </button> "+
    		   "             </div>"+
			   "             <div class=\"modal-body\" style=\"text-align: center;\">"+
			   "                   <div class=\"alert alert-info bigger-110\">"+mensajeInfo+"</div>"+
			   "                    <div class=\"space-6\"></div>"+
			   "             </div>"+     
			   "             <div class=\"modal-footer\"> "+               
			   "                  <button type=\"button\" class=\"btn btn-white  btn-danger btn-round\" data-dismiss=\"modal\">Aceptar</button>"+
			   "             </div>"+
               "         </div>"+
               "   </div>"+
               "</div>";
	$("#"+contenedor).append(script);
	$('#'+nombre).modal({show:true, backdrop: 'static'});	
}



function mostrarVentRes(nombre,nombretext,contenedor, titulo,tam){
	tamMsj="110";
	$("#"+nombre).remove();
	if (tam="modal-lg") {tamMsj="160";} 
	script=    "<div class=\"modal fade\" id=\""+nombre+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	           "   <div class=\"modal-dialog "+tam+"\" role=\"document\">"+
               "         <div class=\"modal-content\">"+
               "             <div class=\"modal-header bg-success\">"+
			   "                  <span><i class=\"menu-icon yellow fa-2x fa fa-info\"></i>"+
			   "                        <span class=\"text-success lead \"> <strong>"+titulo+"</strong></span>"+
			   "                  </span>"+
			   "                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> "+
               "                        <span aria-hidden=\"true\">&times;</span> "+
               "                  </button> "+
    		   "             </div>"+
			   "             <div class=\"modal-body\" style=\"height:280px;\">"+
			   "                   <textarea id=\""+nombretext+"\" style=\"width: 100%; height: 100%; font-size: 10px;\">"+
			   "                   </textarea>"+
			   "             </div>"+     
               "         </div>"+
               "   </div>"+
               "</div>";
	$("#"+contenedor).append(script);
	$('#'+nombre).modal({show:true, backdrop: 'static'});	
}



function ocultarEspera (nombre){
	$('#'+nombre).modal("hide");  
}

function agregarDialogResultado(modulo){
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
					window.parent.document.getElementById('FR'+modulo).contentWindow.location.reload();
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
	$('#resul').val("");
}


/*================================================FUNCION PAR AGENERA TABLA CON BUSQUEDA=================================================*/
function getJsonCol(cad){
	campos=cad.split(",");
	col=[];
	i=0;
	jQuery.each(campos, function(clave, valor){	 
		if (valor.trim().toUpperCase().indexOf(" AS ")>0) {
		    elcampo=valor.trim().toUpperCase().split(" AS ")[1];
		}
		else {
			elcampo=valor.trim().toUpperCase();
		}
        obj={"title":elcampo}
        col[i]=obj;
        i++;                      
       }); 
	return (col);
}

function addSELECTJSONGRID(nombre,contenedor,eljson) {
	  $("#"+contenedor).append("<select class=\"form-control input-sm\"  id=\""+nombre+"\"> </select>");
	  $("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
	  jQuery.each(eljson, function(clave, valor) { 			   
		     $("#"+nombre).append("<option value=\""+clave+"\">"+valor.title+"</option>");			  				     			  		
	  }); 
}

function addSELECTJSON(nombre,contenedor,eljson) {
	  $("#"+contenedor).append("<select class=\"form-control input-sm\"  id=\""+nombre+"\"> </select>");
	  $("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
	  jQuery.each(eljson, function(clave, valor) { 			   
		     $("#"+nombre).append("<option value=\""+valor.id+"\">"+valor.opcion+"</option>");			  				     			  		
    }); 
}

function generaTablaBus(modulo,contenedor, elsql, titulos) {
	
	$("#"+contenedor).empty();
	$('.tableTools-container').empty();
	
	$("#"+contenedor).append("<table id=\"G_"+contenedor+"\" class=\"display table-condensed table-striped table-sm table-bordered table-hover nowrap \" style=\"width:100%; font-size:11px;\">"); 
     
	addSELECTJSONGRID("id_campo",contenedor,titulos);
	
	mostrarEspera("esperaDatos","grid_"+modulo,"Cargando la información solicitada");
	
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){
        	losdatos=JSON.parse(data);
       	    var myTable = $('#G_'+contenedor).DataTable( {
    			bAutoWidth: true,  
    			"scrollX": true,                   	        
    			 data: losdatos,
                 columns:titulos,          		
    			 "aaSorting": [],
    			 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
    				
                },				
    			select: {style: 'single'},
    			"language": {
    				"emptyTable":			"No hay datos disponibles en la tabla.",
    				"info":		   			"Del _START_ al _END_ de _TOTAL_ ",
    				"infoEmpty":			"Mostrando 0 registros de un total de 0.",
    				"infoFiltered":			"(filtrados de un total de _MAX_ registros)",
    				"infoPostFix":			"(actualizados)",
    				"lengthMenu":			"Mostrar _MENU_ registros",
    				"loadingRecords":		"Cargando...",
    				"processing":			"Procesando...",
    				"search":				"Buscar:",
    				"searchPlaceholder":	"Dato para buscar",
    				"zeroRecords":			"No se han encontrado coincidencias.",
    				"paginate": {
    					"first":			"Primera",
    					"last":				"Última",
    					"next":				"Siguiente",
    					"previous":			"Anterior"
    				},
    				"aria": {
    					"sortAscending":	"Ordenación ascendente",
    					"sortDescending":	"Ordenación descendente"
    				}
    			},

    	    } );
       	    
       	    $.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';

			new $.fn.dataTable.Buttons( myTable, {
				buttons: [
					{
					    "extend": "copy",
						"text": "<i title='Copiar Datos' class='fa fa-copy bigger-110 pink'></i>",
						"className": "btn btn-white btn-primary btn-bold"
				     },
					{
				        "extend": "csv",
				        "charset": "UTF-8",
						"text": "<i title='Exportar a Excel' class='glyphicon glyphicon-export bigger-110 orange'></i>",
						"className": "btn btn-white btn-primary btn-bold"
					},
					
			      {
			  	        "extend": "print",
						"text": "<i title='Imprimir datos' class='fa fa-print bigger-110 grey'></i>",
						"className": "btn btn-white btn-primary btn-bold",
						autoPrint: false,
						message: 'SIGEA'
			      }		  	 
				]
			} );

			myTable.buttons().container().appendTo( $('.tableTools-container') );
			

 			$(".dataTables_filter").append($("#id_campo"));

			//Mensaje del copiado de datos del Grid
			var defaultCopyAction = myTable.button(0).action();
			myTable.button(0).action(function (e, dt, button, config) {
				defaultCopyAction(e, dt, button, config);
				$('.dt-button-info').addClass('gritter-item-wrapper gritter-info gritter-center white');
			});
			

			//Columnas que se desean visualizar en el grid 
			var defaultColvisAction = myTable.button(1).action();
			myTable.button(1).action(function (e, dt, button, config) {
				
				defaultColvisAction(e, dt, button, config);
				
				if($('.dt-button-collection > .dropdown-menu').length == 0) {
					$('.dt-button-collection')
					.wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
					.find('a').attr('href', '#').wrap("<li />")
				}
				$('.dt-button-collection').appendTo('.tableTools-container .dt-buttons')
			});

                       
			$('.dataTables_filter input').unbind().bind('keyup', function() {
				   var searchTerm = this.value.toLowerCase()
				   if (!searchTerm) {
				      myTable.draw()
				      return
				   }
				   $.fn.dataTable.ext.search.pop(); 
				   
				   opb=searchTerm.substr(0,2);
				   opa=searchTerm.substr(0,1);   
				 
				   $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {	
					   
					   if ($('#id_campo').prop('value')=="-1") {ini=0; fin=data.length-1;}
					   else  {ini=$('#id_campo').prop('value'); fin=$('#id_campo').prop('id');}	
		
				       for (var i=ini;i<=fin;i++) {
		
					     if ((opa=="=") ||(opa==">") ||(opa=="<") ||  (opb==">=")|| (opb=="<=")||(opb=="<=")||(opb=="!=")) {						     
					    	 if ((opa=="=")) {if (data[i].toLowerCase() == searchTerm.substr(1,searchTerm.length)) return true}
					    	 if ((opb==">=")) {if (parseFloat(data[i].toLowerCase()) >= parseFloat(searchTerm.substr(2,searchTerm.length))) return true}
					    	 if ((opa==">")) {if (parseFloat(data[i].toLowerCase()) > parseFloat(searchTerm.substr(1,searchTerm.length))) return true}
					    	 if ((opa=="<")) {if (parseFloat(data[i].toLowerCase()) < parseFloat(searchTerm.substr(1,searchTerm.length))) return true}
					    	 
					    	 if ((opb=="<=")) {if (parseFloat(data[i].toLowerCase()) <= parseFloat(searchTerm.substr(2,searchTerm.length))) return true}
					    	 if ((opb=="!=")) {if (!(data[i].toLowerCase() == searchTerm.substr(2,searchTerm.length))) return true}
						     }
					     else
					    	 if (data[i].toLowerCase().indexOf(searchTerm)>=0) return true				        
				      }
				      return false
				   });
				   
				   myTable.draw();  
				   
				});

			   ocultarEspera("esperaDatos");
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
                   ocultarEspera("esperaDatos");
               }
       });
}





/*================================================FUNCION PAR AGENERA TABLA DE TADOTS=================================================*/
function generaTablaDin(nombreTabla, elsql, titulos, campos) {
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){
			  
       	       losdatos=JSON.parse(data);	  
				c=0;
			   var linea="";
               $("#cuerpo"+nombreTabla).empty();
               
               cadTit="";
               jQuery.each(titulos, function(clave,valor) {             	   
            	   cadTit+="<th style=\""+valor.estilo+"\">"+valor.titulo+"</th>";
               });
             
               $("#"+nombreTabla).append("<thead><tr id=\"titulo\">"+cadTit+"</tr>"); 
			   $("#"+nombreTabla).append("<tbody id=\"cuerpo"+nombreTabla+"\">");
			   
               jQuery.each(losdatos, function(clave, valor) { 	
				     linea="";             	             	            
         	         jQuery.each(campos, function(claveC,valorC) {
         	        	dato=losdatos[clave][valorC.campo]; 
         	        	linea+="<td style=\""+valorC.estilo+"\">"+valorC.antes+dato+valorC.despues+"</td>";            	        	
					  });    	                 	              	   
         	         $("#cuerpo"+nombreTabla).append("<tr id=\"row"+c+"\">"+linea+"</tr>");
         	         c++;
                });                   	    
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}


function generaTablaDinBtn(nombreTabla, elsql, titulos, campos) {
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){
       	       losdatos=JSON.parse(data);	  
				c=0;
			   var linea="";
               $("#cuerpo"+nombreTabla).empty();
               
               cadTit="";
               jQuery.each(titulos, function(clave,valor) {             	   
            	   cadTit+="<th style=\""+valor.estilo+"\">"+valor.titulo+"</th>";
               });
             
               $("#"+nombreTabla).append("<thead><tr id=\"titulo\">"+cadTit+"</tr>"); 
			   $("#"+nombreTabla).append("<tbody id=\"cuerpo"+nombreTabla+"\">");
			   
               jQuery.each(losdatos, function(clave, valor) { 	
					 linea="";          	             	            
         	         jQuery.each(campos, function(claveC,valorC) {
						
						dato=losdatos[clave][valorC.campo];
						if (valorC.tipo=='btn') {
							parametros=valorC.parametros.split("|");
							cadparam="";
							for (i=0; i<parametros.length; i++){								
								cadparam+="'"+losdatos[clave][parametros[i]]+"',";
							}											
							cadparam.substring(0,cadparam.length-1);
                            linea+="<td><button title=\"Agregar asignatura al alumno\" "+
										  "onclick=\""+valorC.nombreevento+"("+cadparam+");\" "+
										  "class=\"btn btn-xs btn-white btn-info btn-round\"> "+ 
										  "<i class=\"ace-icon green fa "+valorC.ico+" bigger-120\"></i>"+
									"</button></td>";
						}
						if (valorC.tipo=='campo') {  
							 linea+="<td style=\""+valorC.estilo+"\">"+valorC.antes+dato+valorC.despues+"</td>";            	        	
						}
					  });    				     	              	   
         	         $("#cuerpo"+nombreTabla).append("<tr id=\"row"+c+"\">"+linea+"</tr>");
         	         c++;
                });                   	    
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}

/*================================================GENERAR SELECT EN UN CONTENEDOR CON DATOS=================================================*/

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

function convierteHHHMM(minutos){
	horas=Math.trunc(parseInt(minutos)/60);
	minutos=parseInt(minutos)%60;
	return pad(horas,2,'0')+":"+pad(minutos,2,'0');
 
}

function dameFecha(tipo,dias){
	dias=dias||0;
	var hoy = new Date();
	var lafecha= new Date(hoy.getTime()+(dias * 24 * 60 * 60 * 1000));
	if (tipo=="FECHA") {
       return pad(lafecha.getDate(),2,'0')+"/"+pad(lafecha.getMonth()+1,2,'0')+"/"+lafecha.getFullYear();
	}
	if (tipo=="HORA") {
		return pad(lafecha.getHours(),2,'0')+":"+pad(lafecha.getMinutes(),2,'0');
	 }
	if (tipo=="FECHAHORA") {
		return pad(lafecha.getDate(),2,'0')+"/"+pad(lafecha.getMonth()+1,2,'0')+"/"+lafecha.getFullYear()+ " "+
		       pad(lafecha.getHours(),2,'0')+":"+pad(lafecha.getMinutes(),2,'0');
	 }

	 if (tipo=="TAG") {
		return pad(lafecha.getDate(),2,'0')+pad(lafecha.getMonth()+1,2,'0')+lafecha.getFullYear()+
		       pad(lafecha.getHours(),2,'0')+pad(lafecha.getMinutes(),2,'0');
	 }

}


function dameFechaHabil(dias,losdias){
	var hoy = new Date();
	var dia_actual = moment(hoy);
	c=0;
  	while (c<dias) {						
			dia_actual.add(1, 'days');			   
			if (losdias.indexOf(dia_actual.format("DD/MM/YYYY"))<0) {				
				c++;
			}
				  
		  }	
		
    return dia_actual.format("DD/MM/YYYY");
	}




function fechaLetra(fecha){
	eldia=fecha.substr(0,2);
	elmes=fecha.substr(3,2);
	elanio=fecha.substr(6,4);
	return eldia+ " de " +dameMesLetra(elmes).toLowerCase()+" del "+elanio;

}


function fechaJava(fecha){

	eldia=fecha.substr(0,2);
	elmes=fecha.substr(3,2);
	elanio=fecha.substr(6,4);
	
	return elanio+"-"+elmes+"-"+eldia;

}

function calcularEdad(fecha) {
	var hoy = new Date();

	var cumpleanos = fecha.substring(6,10);
	var edad = hoy.getFullYear() - cumpleanos;
    return edad;
}

function curpValida(curp) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);
	
    if (!validado)  //Coincide con el formato general?
    	return false;
    
    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma      = 0.0,
            lngDigito    = 0.0;
        for(var i=0; i<17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;
    }
  
    if (validado[2] != digitoVerificador(validado[1])) 
    	return false;
        
    return true; //Validado
}


function getSQLTipo(tipo,otrascondiciones){
	elsql="";
	if (tipo=='CICLOS') {elsql="SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) from ciclosesc where 1=1 "+otrascondiciones+ " order by CICL_CLAVE DESC";}
	if (tipo=='MATERIAS') {elsql="SELECT MATE_CLAVE, CONCAT(MATE_CLAVE,' ',MATE_DESCRIP) from cmaterias where 1=1 "+otrascondiciones+ " order by MATE_DESCRIP";}
	if (tipo=='SINO') {elsql="SELECT 'SI','SI' from dual union SELECT 'NO','NO' from dual ";}
	return elsql;
}

function addSELECT(nombre,contenedor,tipo, sql, otrascondiciones, tipoSelect) {

	$("#"+contenedor).append("<img id=\"laespera1\" src=\"../../imagenes/menu/esperar.gif\" style=\"width:50px;height:50px;\">");

	elsql=getSQLTipo(tipo,otrascondiciones);
	if (tipo=='PROPIO') {elsql=sql;}

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){
       	       losdatos=JSON.parse(data);   
       	       eltipo="";
       	       if (tipoSelect=='BUSQUEDA') {eltipo="chosen-select";}
       	       $("#"+contenedor).append("<select class=\" "+eltipo+" form-control text-success\"  id=\""+nombre+"\"> </select>");
       	       $("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
               jQuery.each(JSON.parse(data), function(clave, valor) { 	
	  				     $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\">"+utf8Decode(losdatos[clave][1])+"</option>");			  				     			  		
	  				   	  }); 
               if (tipoSelect=='BUSQUEDA') {               
		         	   $('.chosen-select').chosen({allow_single_deselect:true}); 			
			     	   $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
			     	   $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
			  		   $("#"+nombre).trigger("chosen:updated");		}
			   
			
				 $("#"+nombre).change(function(){change_SELECT(nombre);
				
				});
				$("#laespera1").remove();                   	   
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}


function addSELECTAsp(nombre,contenedor,tipo, sql, otrascondiciones, tipoSelect) {

	$("#"+contenedor).append("<img id=\"laespera1\" src=\"../../imagenes/menu/esperar.gif\" style=\"width:50px;height:50px;\">");

	elsql=getSQLTipo(tipo,otrascondiciones);
	if (tipo=='PROPIO') {elsql=sql;}

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../nucleo/base/getdatossqlSeg.php",
        success: function(data){
       	       losdatos=JSON.parse(data);   
       	       eltipo="";
       	       if (tipoSelect=='BUSQUEDA') {eltipo="chosen-select";}
       	       $("#"+contenedor).append("<select class=\" "+eltipo+" form-control text-success\"  id=\""+nombre+"\"> </select>");
       	       $("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
               jQuery.each(JSON.parse(data), function(clave, valor) { 	
	  				     $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\">"+utf8Decode(losdatos[clave][1])+"</option>");			  				     			  		
	  				   	  }); 
               if (tipoSelect=='BUSQUEDA') {               
		         	   $('.chosen-select').chosen({allow_single_deselect:true}); 			
			     	   $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
			     	   $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
			  		   $("#"+nombre).trigger("chosen:updated");		}
			   
			
				 $("#"+nombre).change(function(){change_SELECT(nombre);
				
				});
				$("#laespera1").remove();                   	   
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}


function addSELECT_CONVALOR(nombre,contenedor,tipo, sql, otrascondiciones, tipoSelect, valor) {

	elsql=getSQLTipo(tipo,otrascondiciones);
	if (tipo=='PROPIO') {elsql=sql;}

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){
       	       losdatos=JSON.parse(data);   
       	       eltipo="";
       	       if (tipoSelect=='BUSQUEDA') {eltipo="chosen-select";}
       	       $("#"+contenedor).append("<select class=\" "+eltipo+" form-control text-success\"  id=\""+nombre+"\"> </select>");
       	       $("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
               jQuery.each(JSON.parse(data), function(clave, valor) { 	
	  				     $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\">"+utf8Decode(losdatos[clave][1])+"</option>");			  				     			  		
							   }); 
				$("#"+nombre).val(valor);
	
               if (tipoSelect=='BUSQUEDA') {               
		         	   $('.chosen-select').chosen({allow_single_deselect:true}); 			
			     	   $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
			     	   $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
			  		   $("#"+nombre).trigger("chosen:updated");		}
			   
	  		   $("#"+nombre).change(function(){change_SELECT(nombre);});                   	   
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}




function addSELECTMULT_CONVALOR(nombre,contenedor,tipo, sql, otrascondiciones, tipoSelect, valorDato) {

	elsql=getSQLTipo(tipo,otrascondiciones);
	if (tipo=='PROPIO') {elsql=sql;}

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){
       	       losdatos=JSON.parse(data);   
       	       eltipo="";
       	       if (tipoSelect=='BUSQUEDA') {eltipo="chosen-select";}
       	       $("#"+contenedor).append("<select multiple=\"\" class=\" "+eltipo+" form-control text-success\"  id=\""+nombre+"\"> </select>");
				$("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
			   estasel="";
               jQuery.each(JSON.parse(data), function(clave, valor) {
						 estasel="";
					     if (valorDato!=null) {if (valorDato.indexOf(losdatos[clave][0])>=0) {estasel="selected=\"true\"";} } 						
	  				     $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\""+ estasel +">"+utf8Decode(losdatos[clave][1])+"</option>");			  				     			  									   						
						}); 
	
               if (tipoSelect=='BUSQUEDA') {               
		         	   $('.chosen-select').chosen({allow_single_deselect:true}); 			
			     	   $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
			     	   $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
			  		   $("#"+nombre).trigger("chosen:updated");		}
			   
	  		   $("#"+nombre).change(function(){change_SELECT(nombre);});                   	   
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}


function addSELECT_ST(nombre,contenedor,tipo, sql, otrascondiciones, tipoSelect,estilo) {

	elsql=getSQLTipo(tipo,otrascondiciones);
	if (tipo=='PROPIO') {elsql=sql;}

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){
       	       losdatos=JSON.parse(data);   
       	       eltipo="";
				  if (tipoSelect=='BUSQUEDA') {eltipo="chosen-select";}			   
       	       $("#"+contenedor).append("<select style=\""+estilo+"\"class=\" "+eltipo+" form-control text-success\"  id=\""+nombre+"\"> </select>");
       	    $("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
               jQuery.each(JSON.parse(data), function(clave, valor) { 	
	  				     $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\">"+utf8Decode(losdatos[clave][1])+"</option>");			  				     			  		
	  				   	  }); 
               if (tipoSelect=='BUSQUEDA') {               
		         	   $('.chosen-select').chosen({allow_single_deselect:true}); 			
			     	   $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
			     	   $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
			  		   $("#"+nombre).trigger("chosen:updated");		}
               
	  		   $("#"+nombre).change(function(){change_SELECT(nombre);});                   	   
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}



/*=====================================================================================================================================*/


/*==================================================DATOS DE LA SESSION EN JAVASCRIPT=============================================*/

function getSesion(campo){
   var cad="";
	$.ajax({
	   type: "GET",
	   url:  "../base/getSesion.php?bd=Mysql&campo="+campo,
	   success: function(data){  
		    cad=data; 
		   },
	   error: function(data) {	                  
				  alert('ERROR: '+data);
				  $('#dlgproceso').modal("hide");  
			  }
	  });
	return cad;
}


function setSesion(contenedor,campo){
	var cad="";
	 $.ajax({
		type: "GET",
		url:  "../base/getSesion.php?bd=Mysql&campo="+campo,
		success: function(data){  
			 $("#"+contenedor).html(data); 
			},
		error: function(data) {	                  
				   alert('ERROR: '+data);
				   $('#dlgproceso').modal("hide");  
			   }
	   });
	 return cad;
 }

/*==================================================ACTUALIZA LOS DATOS DE UN SELECT =============================================*/

function actualizaSelect(nombre,elsql,tipoSelect,eltipo){
	 $('#dlgproceso').modal({show:true, backdrop: 'static'});
	 $("#"+nombre).empty();
	 $("#"+nombre).append("<option value=\"0\">Elija una opci&oacute;n</option>");
	 $("#"+nombre).trigger("chosen:updated");
	 fuera="";
	 if (eltipo=="FUERA") {fuera="nucleo/";}

	 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	 $.ajax({
		type: "POST",
		data:parametros,
        url:  "../"+fuera+"base/getdatossqlSeg.php",
        success: function(data){  
			losdatos=JSON.parse(data);
			
       	 jQuery.each(JSON.parse(data), function(clave, valor) { 	
       		 $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\">"+utf8Decode(losdatos[clave][1])+"</option>");       	     
              });
       	
       	 if (tipoSelect=='BUSQUEDA') {    
          
       		$("#"+nombre).trigger("chosen:updated");		
       		}
       	 
       	 $('#dlgproceso').modal("hide");  
            },
        error: function(data) {	                  
                   alert('ERROR: '+data);
                   $('#dlgproceso').modal("hide");  
               }
       });    
}


function actualizaSelectMarcar(nombre,elsql,tipoSelect,eltipo,eldato){
	$('#dlgproceso').modal({show:true, backdrop: 'static'});
	$("#"+nombre).empty();
	$("#"+nombre).append("<option value=\"0\">Elija una opci&oacute;n</option>");
	$("#"+nombre).trigger("chosen:updated");
	fuera="";
	if (eltipo=="FUERA") {fuera="nucleo/";}

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
	   type: "POST",
	   data:parametros,
	   url:  "../"+fuera+"base/getdatossqlSeg.php",
	   success: function(data){  
		   losdatos=JSON.parse(data);
		   
		   jQuery.each(JSON.parse(data), function(clave, valor) {

			   sele=""; if (eldato==losdatos[clave][0]) {sele="selected";}
			   $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\""+sele+">"+utf8Decode(losdatos[clave][1])+"</option>");       	     
			 });
		  
		   if (tipoSelect=='BUSQUEDA') {    
		 
			  $("#"+nombre).trigger("chosen:updated");		
			  }
		   
		   $('#dlgproceso').modal("hide");  
		   },
	   error: function(data) {	                  
				  alert('ERROR: '+data);
				  $('#dlgproceso').modal("hide");  
			  }
	  });
	
}

/*=============================================================================================*/



function editarCeldaTabla(celda, tipo, renglon,id){           
	loquetiene=$("#"+celda).html();  

    if (!($("#INP_"+celda).length > 0)) {
    	  if (tipo=="INPUT") {
                     $("#"+celda).html("<div class=\"input-group editandotabla\">"+
                             "<input id=\"INP_"+celda+"\" class=\"form-control\" value=\""+loquetiene+"\"></input>"+
                             "<span class=\"input-group-addon\" onclick=\"aceptarEdicionCelda('"+celda+"','"+renglon+"','"+id+"');\"><i class=\"ace-icon green fa fa-check\"></i></span>"+
                      "</div>");                       
    	  }
    	  if (tipo=="FECHA") {
    		  $("#"+celda).html("<div class=\"input-group\">"+
    				            "     <input class=\"form-control editandotabla date-picker\" id=\"INP_"+celda+"\""+
	                            "            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
	                            "     <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span>"+
	                            "     <span class=\"input-group-addon\" onclick=\"aceptarEdicionCelda('"+celda+"','"+renglon+"','"+id+"');\"><i class=\"ace-icon green fa fa-check\"></i></span>"+
	                            "</div>");
    		  $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
    	  }
    	  $("#INP_"+celda).focus();
    }      
 }



function dameGif(elnombre,ico) {
 if (ico==null) {ico="fa fa-list-alt";}
var elgif="<span id=\"gif_"+elnombre+"\"  class=\"input-group-addon\"> "+
          "      <i class=\"ace-icon "+ico+" blue\" id=\"imggif_"+elnombre+"\">  </i>"+
          "</span>";
   return elgif;
}

function agregarEspera(nombre,ico){
	  if (ico==null) {ico="fa fa-arrow-down";}
	  $("#"+nombre).html("<img src=\"../../imagenes/menu/esperar.gif\" width=\"14px\" height=\"14px\"></img>");
	  $("#"+nombre).removeClass("ace-icon "+ico+" blue");
	   
}

function quitarEspera(nombre,ico){
	  if (ico==null) {ico="fa fa-arrow-down";}
	  $("#"+nombre).html("");
	  $("#"+nombre).addClass("ace-icon "+ico+" blue");
	   
}


function dameParametrosSeparados(cad,cadIni,cadFin){
	var lista = new Array();
	graba=false; cadAux="";
	i=0;
	for (x=0; x<cad.length; x++) {            					
		if (cad[x]==cadIni) {graba=true;}
		if (cad[x]==cadFin) { graba=false;lista[i]=cadAux.substr(1,cadAux.length); i++; cadAux="";}
		if (graba) {cadAux+=cad[x];}
	}
	return lista;
}


function damesqldep(elsql,elusuario) {
        var lista = new Array();
  	    xdatos = elsql.split('|');
		  elsql=xdatos[1];
		  graba=false; cad="";
		  i=0;
		  for (x=0; x<elsql.length; x++) {            					
				if (elsql[x]=='{') {graba=true;}
				if (elsql[x]=='}') {graba=false;lista[i]=cad.substr(1,cad.length);i++; cad="";}
				if (graba) {cad+=elsql[x];}
			}

		    for(i=0;i<lista.length;i++){
				if ("{"+lista[i]+"}"=='{:USUARIO}') {
					elsql=elsql.replace ("{"+lista[i]+"}","'"+elusuario+"'");			 
				}
				else {
					elsql=elsql.replace ("{"+lista[i]+"}","'"+$("#"+lista[i]).val()+"'");
				}
			}
//alert (elsql);
   return elsql;
}
	

function buscarBD(base,elsql){
   res=[];
   
   inicia=elsql.indexOf("[*");
   termina=elsql.indexOf("*]")

   if (inicia>=0) {res[0]=elsql.substring(inicia+2,termina); res[1]=elsql.substring(termina+2,elsql.length);}
   else {res[0]=base;res[1]=elsql;}
   

   return res;
}


function getOptions(cadena){
		 lista=cadena.split("|");
		 op="";
		 c=0;
		 op+="<option value=\"\">Elija una opci&oacute;n</option>";
		 $.each(lista, function (ind, elem) { 
			  if (c>0) { op+="<option value=\""+elem+"\">"+elem+"</option>"; }
			  c++;
			}); 
		 return op;
		 
}

/*============================================================================================*/
var funciones=[];
funciones[0] = "<span style=\"position:relative; top:-8px; left:4px; font-size:11px;\">r</span>"+
			       "<span style=\"font-size:16px;\">&radic;</span>"+
				   "<span style=\"padding: -0px; margin: 0px; border-top:thin black solid;\">ab</span>";
funciones[1] = "<span style=\"font-size:16px;\">&radic;</span>"+
				   "<span style=\"padding: -0px; margin: 0px; border-top:thin black solid;\">ab</span>";				   
funciones[2]="<div style=\"display: inline-block; vertical-align: middle; margin: 0 0.2em 0.4ex; text-align: center;\">"+
             "     <span style=\"display: block;   padding-top: 0.15em;\">abc</span>"+
             "     <span style=\"border-top: thin solid black; display: block; padding-top: 0.15em;\">ab</span>"+
			 "</div>";
funciones[3]="<font face=\'symbol\'>&#64</font>";
funciones[4]="<font face='symbol'>&#201</font>";
funciones[5]="<font face='symbol'>&#181</font>";
funciones[6]="<font face='symbol'>&#187</font>";
funciones[7]="<font face='symbol'>&#202</font>";
funciones[8]="<font face='symbol'>&#203</font>";
funciones[9]="<font face='symbol'>&#204</font>";
funciones[10]="<font face='symbol'>&#205</font>";
funciones[11]="<font face='symbol'>&#219</font>";
funciones[12]="<font face='symbol'>&#220</font>";
funciones[13]="<font face='symbol'>&#221</font>";
funciones[14]="<font face='symbol'>&#222</font>";
funciones[15]="<font face='symbol'>&#223</font>";
funciones[16]="<font face='symbol'>&#199</font>";
funciones[17]="<font face='symbol'>&#200</font>";
funciones[18]="<font face='symbol'>&#206</font>";
funciones[19]="<font face='symbol'>&#207</font>";
funciones[20]="<font face='symbol'>&#34</font>";
funciones[21]="<font face='symbol'>&#36</font>";
funciones[22]="<font face='symbol'>&#165</font>";
funciones[23]="<font face='symbol'>&#171</font>";
funciones[24]="<font face='symbol'>&#172</font>";
funciones[25]="<font face='symbol'>&#174</font>";
funciones[26]="<font face='symbol'>&#175</font>";

/*============================================================================================*/		   

function copiarFormula(elmodal,elemento,elprev){
	$('#'+elemento).html($('#'+elemento).html()+$('#'+elprev).html());
	$('#'+elmodal).modal("hide");
}

function actualizarTexto(visual,editfor){
	$('#'+visual).html($('#'+editfor).val());
}

function verHTML(ht,padre,btn){
   if ($("#edbtnhtml_"+ht).attr("op")=="1") { $("#"+ht).text($("#"+ht).html()); $("#edbtnhtml_"+ht).attr("op","2");	}
   else { $("#"+ht).html($("#"+ht).text());	$("#edbtnhtml_"+ht).attr("op","1");}
	
}



function addFormula(visual,contenido,editfor) {
	elcontenido=contenido;
	if (contenido.indexOf("funcion|")>=0) {
		elcontenido=funciones[contenido.split("|")[1]];
	}
	$('#'+visual).append(elcontenido);
	$('#'+editfor).val($('#'+editfor).val()+elcontenido);
	
}

function editaFormula(elemento,padre) {
	$("#formulas").remove();
	script=    "<div class=\"modal fade\" id=\"formulas\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	           "   <div class=\"modal-dialog modal-lg role=\"document\">"+
               "         <div class=\"modal-content\">"+
               "             <div class=\"modal-header bg-info\" >"+
			   "                  <span><i class=\"menu-icon green fa-2x fa fa-info\"></i>"+
			   "                        <span class=\"text-success lead \"> <strong>Formulas</strong></span>"+
			   "                  </span>"+
			   "                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> "+
               "                        <span aria-hidden=\"true\">&times;</span> "+
			   "                  </button> "+
			   "                  <div class=\"row\">    "+
			   "                      <div class=\"col-sm-10\">    "+
			   "                           <label onclick=\"addFormula('prevFor','x<sup>2</sup>','editFor');\" "+
			   "                                  class=\"btn btn-sm btn-success btn-white btn-round\">x<sup>n</sup>"+
			   "                           </label>"+	
			   "                           <label onclick=\"addFormula('prevFor','x<sub>2</sub>','editFor');\" "+
			   "                                  class=\"btn btn-sm btn-success btn-white btn-round\">x<sub>n</sub>"+
			   "                           </label>"+
			   "                           <label onclick=\"addFormula('prevFor','&int;','editFor');\" "+
			   "                                  class=\"btn btn-sm btn-success btn-white btn-round\">&int;"+
			   "                           </label>"+
			   "                           <label onclick=\"addFormula('prevFor','<sup>a</sup>/<sub>b</sub>','editFor');\" "+
			   "                                  class=\"btn btn-sm btn-success btn-white btn-round\"><sup>a</sup>/<sub>b</sub>"+
			   "                           </label>";

			   for (i=0;i<funciones.length;i++) {
	    script+="         <label onclick=\"addFormula('prevFor','funcion|"+i+"','editFor');\" "+
				"               class=\"btn btn-sm btn-success btn-white btn-round\">"+funciones[i]+
				"         </label>";				
			   }
	   script+="                      </div>"+
			   "                      <div class=\"col-sm-2\">    "+
			   "                           <label onclick=\"copiarFormula('formulas','"+elemento+"','prevFor');\" "+
			   "                                  class=\"btn btn-sm btn-danger btn-white btn-round\">Copiar"+
			   "                           </label>"+	
			   "                      </div>"+	   
			   "                  </div>"+
    		   "             </div>"+
			   "             <div class=\"modal-body\" style=\"text-align: center;\">"+	
			   "                  <textarea onkeyup=\"actualizarTexto('prevFor','editFor');\"  style=\"width:100%; height:200px;\" id=\"editFor\" ></textarea>"+	
			   "             </div>"+  
			   "             <div id=\"prevFor\" style=\"padding-left:20px; height:40px; backgroud-color:whte;\" >"+			     
			   "              </div>"+
               "         </div>"+
               "   </div>"+
			   "</div>";
	elpadre=$("#"+padre).parent()
	$(elpadre).append(script);
	$('#formulas').modal({show:true, backdrop: 'static'});

}

function paginapreview(ht,padre){
//	 window.open("../base/pagPreview.php?ht="+encodeURI(ht),"Preview","width=600, height=300");
	$("#previewTexto").remove();
	script=    "<div class=\"modal fade\" id=\"previewTexto\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	           "   <div class=\"modal-dialog modal-lg role=\"document\">"+
               "         <div class=\"modal-content\">"+
               "             <div class=\"modal-header bg-info\" >"+
			   "                  <span><i class=\"menu-icon green fa-2x fa fa-info\"></i>"+
			   "                        <span class=\"text-success lead \"> <strong>Preview</strong></span>"+
			   "                  </span>"+
			   "                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> "+
               "                        <span aria-hidden=\"true\">&times;</span> "+
               "                  </button> "+
    		   "             </div>"+
			   "             <div class=\"modal-body\" style=\"text-align: center;\">"+
			   "                   <div class=\"alert alert-info bigger-110\">"+ht+"</div>"+		
			   "             </div>"+     
               "         </div>"+
               "   </div>"+
			   "</div>";
	elpadre=$("#"+padre).parent()
	$(elpadre).append(script);
	$('#previewTexto').modal({show:true, backdrop: 'static'});


	}

	function limpiarEdit(ht,padre){
			$("#"+ht).html($("#"+ht).text());	
	}


function getElementoEd(padre,nombre,tipo,etiqueta,sql,dato,esllave,ico,autoinc,funcion,bd, elusuario)
{   elauto="";
	hab="";	
	etiqueta=utf8Decode(etiqueta);
	
	eventos=" onchange=\"callChange('"+nombre+"');\""+" ondblclick=\"calldblclick('"+nombre+"');\"";
	
	
	if (esllave=="S") {hab="disabled";}
	if ((autoinc.length>0) && (funcion=='I')) { hab="disabled";}
	
	cad="";
	estilo=hab+" style=\"width:100%;\"";
	
	
	if ((autoinc.length>0) && (funcion=='I')) { 
		 resauto=autoinc.split("|");
		 sqlauto="SELECT "+resauto[1]+".nextval FROM DUAL";
		 if (resauto[0]=='SQL') {sqlauto=resauto[1];}
		 if (resauto[0]=='AUTOMATICO') {sqlauto=""; $("#"+nombre).val("");}
		 

		 if (sqlauto.length>0) {		 
			     parametros={sql:sqlauto,dato:sessionStorage.co,bd:bd,numcol:'0'}

				 $.ajax({
					 type: "POST",
					 data:parametros,
		             url: "damedato.php", 
		             success: function(data){  
		            	  $("#"+nombre).val(parseInt(data)+1);
		          },
		          error: function(data) {
		             alert('ERROR: '+data);
		          }
		        }); 	
		 }
	}

	if (tipo=="TEXTO_BTN") {
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label>\n "+
			"<div class=\"input-group\">"+		        
		         "<input "+eventos+estilo+" class=\"form-control\" type=\"text\" value=\""+dato+"\" id=\""+nombre+"\" />"+
	             "<span onclick=\""+nombre+"clicadd();\" style=\"cursor:pointer;\"class=\"input-group-addon\">"+
	                     "<i class=\"ace-icon blue "+ico+"\"></i></span>"+
            "</div> ";
		$("#"+padre).append(cad);
		return 0;
	}
	
	if (tipo=="TEXTO") {
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label>\n "+
	        "<input "+eventos+estilo+" autocomplete=\"off\" type=\"text\" value=\""+dato+"\" name=\""+nombre+"\" id=\""+nombre+"\"  placeholder=\"\" />\n";
		$("#"+padre).append(cad);
		return 0;
	}
	
	
	
	if (tipo=="PARRAFO") {
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label>\n "+
	        "<textarea "+eventos+estilo+" type=\"text\"  name=\""+nombre+"\" id=\""+nombre+"\"  placeholder=\"\">"+dato+"</textarea>\n";
		$("#"+padre).append(cad);
		return 0;
	}
	
	
	if (tipo=="PARRAFO_BTN") {
		
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label>\n "+
		"<div class=\"input-group\">"+		        
		     "<textarea "+eventos+estilo+" type=\"text\"  name=\""+nombre+"\" id=\""+nombre+"\"  placeholder=\"\">"+dato+"</textarea>"+
             "<span onclick=\""+nombre+"clicadd();\" style=\"cursor:pointer;\"class=\"input-group-addon\">"+
                     "<i class=\"ace-icon blue "+ico+"\"></i></span>"+
        "</div> ";
		
		$("#"+padre).append(cad);
		return 0;
	}


	if (tipo=="EDITOR") {
        eleditor="<div class=\"widget-box widget-color-green\">"+
					"<div class=\"widget-body\"> "+
					"     <div class=\"widget-main no-padding\">"+
					"         <div class=\"wysiwyg-editor\" id=\""+nombre+"\" style=\"height:100px;\">"+dato+"</div>"+
					"     </div>"+
                    "     <div class=\"widget-toolbox padding-4 clearfix\">"+
					"         <div class=\"btn-group pull-right\">"+
					"              <label op=\"1\" id=\"edbtnhtml_"+nombre+"\" onclick=\"verHTML('"+nombre+"','"+padre+"');\" "+
					"              class=\"btn btn-sm btn-danger btn-white btn-round\">"+
					"              <i class=\"ace-icon fa fa-code bigger-125\"></i>Html</label>"+

					"              <label onclick=\"limpiarEdit('"+nombre+"','"+padre+"');\" "+
					"              class=\"btn btn-sm btn-success btn-white btn-round\">"+
					"              <i class=\"ace-icon fa fa-external-link-square bigger-125\"></i>Limpiar</label>"+

					"              <label onclick=\"paginapreview($('#"+nombre+"').html(),'"+padre+"');\" "+
					"              class=\"btn btn-sm btn-success btn-white btn-round\">"+
					"              <i class=\"ace-icon fa fa-external-link-square bigger-125\"></i>Preview</label>"+
					"              <label onclick=\"editaFormula('"+nombre+"','"+padre+"');\" "+
					"              class=\"btn btn-sm btn-primary btn-white btn-round\">"+
					"              <i class=\"ace-icon fa fa-superscript bigger-125\"></i>Formulas</label>"+
					"         </div>"+
                    "     </div>"+
					"</div>"+
					"</div>";
	
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label>\n "+eleditor;	
		$("#"+padre).append(cad);

		$('#'+nombre).ace_wysiwyg({
			toolbar:
			[
				'font',
				'fontSize',
				{name:'bold', className:'btn-info'},			
				null,
				'foreColor',
				null,
				{name:'undo', className:'btn-grey'},
				{name:'redo', className:'btn-grey'},
				{name:'createLink', className:'btn-pink'},
			    {name:'unlink', className:'btn-pink'},
				null,
				{name:'insertImage', className:'btn-primary'},
				{name:'nuevo', className:'btn-success'}
			],
			'wysiwyg': {
				fileUploadError: showErrorAlert
			}
		}).prev().addClass('wysiwyg-style1');


		if ( typeof jQuery.ui !== 'undefined' && ace.vars['webkit'] ) {	
			var lastResizableImg = null;
			function destroyResizable() {
				if(lastResizableImg == null) return;
				lastResizableImg.resizable( "destroy" );
				lastResizableImg.removeData('resizable');
				lastResizableImg = null;
			}
			var enableImageResize = function() {
				$('.wysiwyg-editor')
				.on('mousedown', function(e) {
					var target = $(e.target);
					if( e.target instanceof HTMLImageElement ) {
						if( !target.data('resizable') ) {
							target.resizable({
								aspectRatio: e.target.width / e.target.height,
							});
							target.data('resizable', true);						
							if( lastResizableImg != null ) {
								//disable previous resizable image
								lastResizableImg.resizable( "destroy" );
								lastResizableImg.removeData('resizable');
							}
							lastResizableImg = target;
						}
					}
				})
				.on('click', function(e) {
					if( lastResizableImg != null && !(e.target instanceof HTMLImageElement) ) {
						destroyResizable();
					}
				})
				.on('keydown', function() {
					destroyResizable();
				});
			}

			enableImageResize();
		}

		
		return 0;
	}
	


	if (tipo=="FECHAMYSQL") {
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
	         " <div class=\"input-group\"><input "+eventos+estilo+" class=\"form-control date-picker\" name=\""+nombre+"\" id=\""+nombre+"\" "+
	         " type=\"text\" autocomplete=\"off\" value=\""+dato+"\"  data-date-format=\"yyyy-mm-dd\" /> "+
	         " <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>";
		$("#"+padre).append(cad);
		return 0;
	}


	if (tipo=="FECHA") {
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
	         " <div class=\"input-group\"><input "+eventos+estilo+" class=\"form-control date-picker\" name=\""+nombre+"\" id=\""+nombre+"\" "+
	         " type=\"text\" autocomplete=\"off\" value=\""+dato+"\"  data-date-format=\"dd/mm/yyyy\" /> "+
	         " <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>";
		$("#"+padre).append(cad);
		return 0;
	}
	
	if (tipo=="MONEDA") {
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
	        " <input "+eventos+estilo+" type=\"text\" name=\""+nombre+"\" id=\""+nombre+"\" data-mask=\"#+#\" "+
	        " data-mask-reverse=\"true\"  value=\""+dato+"\"  data-mask-clearifnotmatch=\"true\" />";
		$("#"+padre).append(cad);
		return 0;
	}
	
	
	if (tipo=="NUMERO") {
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
	        " <input "+eventos+estilo+" type=\"text\" name=\""+nombre+"\" id=\""+nombre+"\" data-mask=\"#\" "+
	        " data-mask-reverse=\"true\"  value=\""+dato+"\"  data-mask-clearifnotmatch=\"true\" />";
		$("#"+padre).append(cad);
		return 0;
	}
	
	if (tipo=="CHECK") {
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
	         " <input "+eventos+" value=\""+dato+"\"  name=\""+nombre+"\" id=\""+nombre+"\" class=\"ace ace-switch ace-switch-6\" type=\"checkbox\" value=\"S\"/> "+
			 " <span class=\"lbl\"></span>";
		$("#"+padre).append(cad);
		return 0;
	}
	
	if (tipo=="SELECT") {
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
		    "<div class=\"input-group\">"+dameGif(nombre,ico)+
	        " <select onchange=\"cambioSelect('"+nombre+"')\""+estilo+" class=\"form-control\" name=\""+nombre+"\"  id=\""+nombre+"\" data-placeholder=\"Elija una Opci&oacute;n+++\">\n"+
	        "<option value=\""+dato+"\" selected></option>"
		cad+="</SELECT></div>";
		
		 $("#"+padre).append(cad);
						
		 
		 if (sql.substring(0,1)=='|') { 
			 $("#"+nombre).html(getOptions(sql));
		 }
		 
		 else {
				 param=buscarBD(bd,sql);
				 parametros={sql:param[1],dato:sessionStorage.co,bd:param[0],sel:dato}
				 $.ajax({
					 type: "POST",
					 data:parametros,
		             url: "dameselectSeg.php", 
		             success: function(data){		            	  
		                  $("#"+nombre).html(data);   
		          },
		          error: function(data) {
		             alert('ERROR: '+data);
		          }
		        }); 
		 }
	
		 
		 
		 
		 return 0;
	}
	
	
	if (tipo=="SELECT_BUSQUEDA") {
		
		
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		    "<div class=\"input-group\">"+dameGif(nombre,ico)+
                 " <select onchange=\"cambioSelect('"+nombre+"')\""+estilo+" class=\"chosen-select form-control\" name=\""+nombre+"\"  id=\""+nombre+"\" data-placeholder=\"Elija una Opci&oacute;-->\">\n";
	        "<option value=\""+dato+"\" selected></option>"
		cad+="</SELECT></div>";
       
	     param=buscarBD(bd,sql);
	
	     $("#"+padre).append(cad);
	     
	     if (sql.substring(0,1)=='|') { 
			 $("#"+nombre).html(getOptions(sql));
		 }
		 
		 else {
			parametros={sql:param[1],dato:sessionStorage.co,bd:param[0],sel:dato}
			 $.ajax({
				 type: "POST",
				 data:parametros,
	             url: "dameselectSeg.php", 
	             success: function(data){                    
	                  $("#"+nombre).html(data); 
	                  $('#'+nombre).trigger("chosen:updated");
	                  $('.chosen-select').chosen({allow_single_deselect:true}); 
	                     
	                  $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width':"100%"});})}).trigger('resize.chosen');
	         		  $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this);   $this.next().css({'width':"100%"});})});

	          },
	          error: function(data) {
	             alert('ERROR: '+data);
	          }
	        }); 	
		 }
		 
 		
		 return 0;
	}
	
	
	if (tipo=="SELECT_BUSQUEDA_BTN") {
				
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		    "<div class=\"input-group\">"+
                 " <select onchange=\"cambioSelect('"+nombre+"')\""+estilo+" class=\"chosen-select form-control\" name=\""+nombre+"\"  id=\""+nombre+"\" data-placeholder=\"Elija una Opci&oacute;-->\">\n";
	        "<option value=\""+dato+"\" selected></option>"
		cad+="</SELECT><span onclick=\""+nombre+"clicadd();\" style=\"cursor:pointer;\"class=\"input-group-addon\">"+
		     "<i class=\"ace-icon blue "+ico+"\"></i></span></div>";
       
	     param=buscarBD(bd,sql);
	
	     $("#"+padre).append(cad);
	     
	     if (sql.substring(0,1)=='|') { 
			 $("#"+nombre).html(getOptions(sql));
		 }
		 
		 else {
			parametros={sql:param[1],dato:sessionStorage.co,bd:param[0],sel:dato}
			 $.ajax({
				 type: "POST",
				 data:parametros,
	             url: "dameselectSeg.php", 
	             success: function(data){                    
	                  $("#"+nombre).html(data); 
	                  $('#'+nombre).trigger("chosen:updated");
	                  $('.chosen-select').chosen({allow_single_deselect:true}); 
	                     
	                  $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width':"100%"});})}).trigger('resize.chosen');
	         		  $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this);   $this.next().css({'width':"100%"});})});

	          },
	          error: function(data) {
	             alert('ERROR: '+data);
	          }
	        }); 	
		 }
		 
 		
		 return 0;
	}
	

	
	
if (tipo=="SELECT_MULTIPLE") {
		
		
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		    "<div class=\"input-group\">"+dameGif(nombre,ico)+
                 " <select multiple=\"\" onchange=\"cambioSelect('"+nombre+"')\""+estilo+" class=\"chosen-select form-control\" name=\""+nombre+"\"  id=\""+nombre+"\" data-placeholder=\"Elija una Opci&oacute;-->\">\n";
	        "<option value=\""+dato+"\" selected></option>"
		cad+="</SELECT></div>";
       
	     param=buscarBD(bd,sql);
	     
	     $("#"+padre).append(cad);
	     if (sql.substring(0,1)=='|') { 
			 $("#"+nombre).html(getOptions(sql));
		 }
		 
		 else {
			parametros={sql:param[1],dato:sessionStorage.co,bd:param[0],sel:dato}
			 $.ajax({
				 type: "POST",
				 data:parametros,
	             url: "dameselectSeg.php", 
	             success: function(data){                    
	                  $("#"+nombre).html(data); 
	                  $('#'+nombre).trigger("chosen:updated");
	                  $('.chosen-select').chosen({allow_single_deselect:true}); 			
	          		  $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
	          		  $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});
	                 
	          },
	          error: function(data) {
	             alert('ERROR-SELMUL: '+data);
	          }
	        }); 	
		 }
		 
	
		
		 
		 return 0;
	}
	
	
	if (tipo=="SELECT_DEPENDE") {
		xsql=sql;
		xdatos = xsql.split("|");		
		xsql=xdatos[1];
		campoid=xdatos[0];
		xsql=xsql.substr(0,xsql.indexOf("WHERE"));
		xsql+=" WHERE "+campoid+"='"+dato+"'";
		
		param=buscarBD(bd,xsql);
		parametros={sql:param[1],dato:sessionStorage.co,bd:param[0],numcol:'1'}
		$.ajax({
             type: "POST",
			 url: "damedato.php", 
			 data:parametros,
             success: function(data){            
            	 desc=data;            		
         		 cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
         		     "<div class=\"input-group\">"+dameGif(nombre,ico)+
         	         "<select onchange=\"cambioSelect('"+nombre+"')\""+estilo+" class=\"form-control\" name=\""+nombre+"\"  id=\""+nombre+"\" data-placeholder=\"Elija una Opci&oacute;n-->\">\n"+
         	         "<OPTION value=\""+dato+"\" selected>"+desc+"</OPTION>\n";
         		 cad+="</SELECT></div>";
         		 
         		$("#"+padre).append(cad);    
         		elsql=damesqldep(sql,elusuario);                 
         		agregarEspera("imggif_"+nombre,ico);
 			   
				 param2=buscarBD(bd,elsql);
				 parametros={sql:param2[1],dato:sessionStorage.co,bd:param2[0],sel:0}
 				 $.ajax({
					  type: "POST",					   
					  data:parametros,
                      url: 'dameselectSeg.php', 
                      success: function(data){     
                           $("#"+nombre).html(data);                                 
                           quitarEspera("imggif_"+nombre,ico);
                           $("#"+nombre).val(dato);  
                   },
                   error: function(data) {
                      alert('ERROR: '+data);
                   }
                 });    
         		
         		
          },
          error: function(data) {
             alert('ERROR: '+data);
          }
        }); 	

		return 0;
	}
	
	
	if (tipo=="SELECT_DEPENDE_BUSQUEDA") {		
	
		xsql=sql;		
		xdatos = xsql.split("|");		
		xsql=xdatos[1];
		
		campoid=xdatos[0];
		xsql=xsql.substr(0,xsql.indexOf("WHERE"));
		xsql+=" WHERE "+campoid+"='"+dato+"'";
		
		param=buscarBD(bd,xsql);
		parametros={sql:param[1],dato:sessionStorage.co,bd:param[0],numcol:'1'}
		$.ajax({
			 type: "POST",
			 data:parametros,
             url: "damedato.php", 
             success: function(data){             	 
            	 desc=data;            		
         		 cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
         		     "<div class=\"input-group\">"+dameGif(nombre,ico)+
         	         "<select onchange=\"cambioSelect('"+nombre+"')\""+estilo+" class=\"chosen-select form-control\" name=\""+nombre+"\"  id=\""+nombre+"\" data-placeholder=\"Elija una Opci&oacute;n-->\">\n"+
         	         "<OPTION value=\""+dato+"\" selected>"+desc+"</OPTION>\n";
         		 cad+="</SELECT></div>";
         		 
         		$("#"+padre).append(cad);  		
				 elsql=damesqldep(sql,elusuario);
				 				
                 
         		agregarEspera("imggif_"+nombre,ico);
 			   
         		param2=buscarBD(bd,elsql);
	  
				 parametros={sql:param2[1],dato:sessionStorage.co,bd:param2[0],sel:"0"}
 				 $.ajax({
					  type: "POST",
					  data:parametros,
                      url: 'dameselectSeg.php', 
                      success: function(data){   
						    						  
						   $("#"+nombre).html(data);   
						   $('#'+nombre).trigger("chosen:updated");                              
                           quitarEspera("imggif_"+nombre,ico);                                                                                  
                           $('.chosen-select').chosen({allow_single_deselect:true}); 			
                   		   $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
						   $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width':"100%"});})});
						   $("#"+nombre).val(dato); 
						   $('#'+nombre).trigger("chosen:updated");  						   
                   },
                   error: function(data) {
                      alert('ERROR: '+data);
                   }
                 });    
         		
         		
          },
          error: function(data) {
             alert('ERROR: '+data);
          }
        }); 	

		return 0;
	}
	
	
	if (tipo=="IMAGEN") {
		dominio=document.domain;

		if ((dato==null)||(dato=="")) {dato="../../imagenes/menu/default.png";}
	
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		     "  <div class=\"row align-items-end\"> "+
		     "      <div class=\"col-sm-2\">"+
		     "           <img id=\"img_"+nombre+"\" name=\"img_"+nombre+"\" src=\""+dato+"\" width=\"50px\" height=\"50px\">"+
		     "      </div>"+
		     "      <div class=\"col-sm-10\">"+
		     "          <input type=\"file\" id=\"file_"+nombre+"\" name=\"file_"+nombre+"\""+
	         "                 onchange=\"subirArchivo('file_"+nombre+"','"+nombre+"','img_"+nombre+"','"+nombre+"','"+sql+"');\"/>"+
	         "          <input "+estilo+" type=\"hidden\" value=\""+dato+"\"  name=\""+nombre+"\" id=\""+nombre+"\"  placeholder=\"\" />\n"+
		     "      </div> "+
		     "  </div>";
		$("#"+padre).append(cad);
		return cad;
	}
	
	
	if (tipo=="IMAGEN_DRIVE") {
		dominio=document.domain;
		rutaimg=dato;
		if ((dato==null)||(dato=="")) {rutaimg="../../imagenes/menu/default.png"; }

		stElim="display:none; cursor:pointer;";
    	if (dato.length>0) {stElim="cursor:pointer; display:block; ";}
    	btnEliminar="<i style=\""+stElim+"\"  id=\"btnEli_"+nombre+"\"  title=\"Eliminar la Imagen que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
        "onclick=\"eliminarEnlace('file_"+nombre+"','"+nombre+"','img_"+nombre+"','"+nombre+"','pdf','S','"+nombre+"','"+
										dato+"','"+nombre+"');\"></i> "; 
										
	
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		     "  <div class=\"row align-items-end\"> "+
		     "      <div class=\"col-sm-2\">"+
			 "           <img id=\"img_"+nombre+"\" name=\"img_"+nombre+"\" src=\""+rutaimg+"\" width=\"50px\" height=\"50px\">"+
			 "           <div class=\"col-sm-1\">"+btnEliminar+"</div>"+
		     "      </div>"+
		     "      <div class=\"col-sm-10\">"+
		     "          <input type=\"file\" id=\"file_"+nombre+"\" name=\"file_"+nombre+"\""+
	         "                 onchange=\"subirArchivoDrive('file_"+nombre+"','"+nombre+"','img_"+nombre+"','"+nombre+"','"+sql+"');\"/>"+
	         "          <input "+estilo+" type=\"hidden\" value=\""+dato+"\"  name=\""+nombre+"\" id=\""+nombre+"\"  placeholder=\"\" />\n"+
		     "      </div> "+
		     "  </div>";
		$("#"+padre).append(cad);
		return cad;
	}
	
	
	if (tipo=="PDF_DRIVE") {
		dominio=document.domain;
        rutaimg="../../imagenes/menu/pdf.png";
		if ((dato==null)||(dato=="")) {rutaimg="../../imagenes/menu/pdfno.png";}

		stElim="display:none; cursor:pointer;";
    	if (dato.length>0) {stElim="cursor:pointer; display:block; ";}
    	btnEliminar="<i style=\""+stElim+"\"  id=\"btnEli_"+nombre+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
        "onclick=\"eliminarEnlace('file_"+nombre+"','"+nombre+"','img_"+nombre+"','"+nombre+"','pdf','S','"+nombre+"','"+
                                        dato+"','"+nombre+"');\"></i> "; 

		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		     "  <div class=\"row align-items-end\"> "+
		     "      <div class=\"col-sm-2\">"+
		     "           <a target=\"_blank\" id=\"enlace_"+nombre+"\" href=\""+dato+"\">"+
		     "                <img id=\"img_"+nombre+"\" name=\"img_"+nombre+"\" src=\""+rutaimg+"\" width=\"50px\" height=\"50px\">"+
			 "           </a>"+
			 "           <div class=\"col-sm-1\">"+btnEliminar+"</div>"+
		     "      </div>"+
		     "      <div class=\"col-sm-10\">"+
		     "          <input type=\"file\" id=\"file_"+nombre+"\" name=\"file_"+nombre+"\""+
	         "                 onchange=\"subirPDFDrive('file_"+nombre+"','"+nombre+"','img_"+nombre+"','"+nombre+"','"+sql+"');\"/>"+
	         "          <input "+estilo+" type=\"hidden\" value=\""+dato+"\"  name=\""+nombre+"\" id=\""+nombre+"\"  placeholder=\"\" />\n"+
		     "      </div> "+
		     "  </div>";
		$("#"+padre).append(cad);
		return cad;
	}



	if (tipo=="ARCHIVO_DRIVE") {
		dominio=document.domain;
		unaimagen=sql.split("*")[2];
		carpeta=sql.split('*')[1];
		elenlace=sql.split('*')[1];
		lasext=sql.split('*')[0];

		if (unaimagen=='IMG') {rutaimg=dato;} else {rutaimg="../../imagenes/menu/documentos.png";}
		

		if ((dato==null)||(dato=="")) { 
			if (unaimagen=='IMG') {rutaimg="../../imagenes/menu/default.png";} 
			else {rutaimg="../../imagenes/menu/pdfno.png";}			
		}
		

		stElim="display:none; cursor:pointer;";
    	if (dato.length>0) {stElim="cursor:pointer; display:block; ";}
    	btnEliminar="<i style=\""+stElim+"\"  id=\"btnEli_"+nombre+"\"  title=\"Eliminar el Archivo que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
        "onclick=\"eliminarEnlace('file_"+nombre+"','"+nombre+"','img_"+nombre+"','"+nombre+"','pdf','S','"+nombre+"','"+
                                        dato+"','"+nombre+"');\"></i> "; 

		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		     "  <div class=\"row align-items-end\"> "+
		     "      <div class=\"col-sm-2\">"+
		     "           <a target=\"_blank\" id=\"enlace_"+nombre+"\" href=\""+dato+"\">"+
		     "                <img id=\"img_"+nombre+"\" name=\"img_"+nombre+"\" src=\""+rutaimg+"\" width=\"50px\" height=\"50px\">"+
			 "           </a>"+
			 "           <div class=\"col-sm-1\">"+btnEliminar+"</div>"+
		     "      </div>"+
		     "      <div class=\"col-sm-10\">"+
		     "          <input type=\"file\" id=\"file_"+nombre+"\" name=\"file_"+nombre+"\""+
	         "                 onchange=\"subirPDFDrive('file_"+nombre+"','"+carpeta+"','img_"+nombre+"','"+nombre+"','"+lasext+"','N');\"/>"+
	         "          <input "+estilo+" type=\"hidden\" value=\""+dato+"\"  name=\""+nombre+"\" id=\""+nombre+"\"  placeholder=\"\" />\n"+
		     "      </div> "+
		     "  </div>";
		$("#"+padre).append(cad);
		return cad;
	}



	if (tipo=="ARCHIVO_CARPETA") {
		dominio=document.domain;
		unaimagen=sql.split("*")[2];
		if (unaimagen=='IMG') {rutaimg=sql.split('*')[1]+dato;} else {rutaimg="../../imagenes/menu/pdf.png";}
		rutag=sql.split('*')[1];
		elenlace=rutag+dato;
		lasext=sql.split('*')[0];

		if ((dato==null)||(dato=="")) { 
			if (unaimagen=='IMG') {rutaimg="../../imagenes/menu/default.png";} else {rutaimg="../../imagenes/menu/pdfno.png";}
			elenlace="";}
	
   	    stElim="display:none; cursor:pointer;";
    	if (dato.length>0) {stElim="cursor:pointer; display:block; ";}
    	btnEliminar="<i style=\""+stElim+"\"  id=\"btnEli_"+nombre+"\"  title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+        	                            
        "onclick=\"eliminarEnlaceCarpeta('file_"+nombre+"','"+nombre+"','img_"+nombre+"','"+nombre+"','pdf','S','"+nombre+"','"+
										dato+"','"+nombre+"','"+rutag+"','"+unaimagen+"');\"></i> "; 

		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		     "  <div class=\"row align-items-end\"> "+
		     "      <div class=\"col-sm-2\">"+
		     "           <a target=\"_blank\" id=\"enlace_"+nombre+"\" href=\""+elenlace+"\">"+
		     "                <img id=\"img_"+nombre+"\" name=\"img_"+nombre+"\" src=\""+rutaimg+"\" width=\"50px\" height=\"50px\">"+
			 "           </a>"+
			 "           <div class=\"col-sm-1\">"+btnEliminar+"</div>"+
		     "      </div>"+
		     "      <div class=\"col-sm-10\">"+
		     "          <input type=\"file\" id=\"file_"+nombre+"\" name=\"file_"+nombre+"\""+
	         "                 onchange=\"subirPDFCarpeta('file_"+nombre+"','"+nombre+"','img_"+nombre+"','"+nombre+"','"+lasext+"','"+rutag+"','"+unaimagen+"');\"/>"+
	         "          <input "+estilo+" type=\"hidden\"  value=\""+dato+"\"  name=\""+nombre+"\" id=\""+nombre+"\"  placeholder=\"\" />\n"+
		     "      </div> "+
		     "  </div>";
		$("#"+padre).append(cad);
		return cad;
	}
}


function showErrorAlert (reason, detail) {
	var msg='';
	if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
	else {
		//console.log("error uploading file", reason, detail);
	}
	$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
	 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
}


function esimagen(archivo) { 
	imagen=false;
	extimg=["JPG","PNG","BMPG","GIF"];
	extension = (archivo.substring(archivo.lastIndexOf(".")+1)).toLowerCase(); 	
	if (extimg.indexOf( extension.toUpperCase())>0) { imagen=true;}
	return imagen;
}



/*=====================================CARGA DE LAS FECHAS DE PLANEACION =====================================*/
function verPlaneacion(materia,materiad, grupo, ciclo, contenedor,esjefe){

	var abierto=false;
	elsql="select count(*) as N from ecortescal where  CICLO='"+ciclo+"'"+
	" and ABIERTO='S' and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') "+
	" Between STR_TO_DATE(INICIA,'%d/%m/%Y') "+
	" AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='PLANEACION' "+
	" order by STR_TO_DATE(TERMINA,'%d/%m/%Y')  DESC LIMIT 1";


	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){
			if (JSON.parse(data)[0]["N"]>0) {				
				abierto=true;
			}
			script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
			"   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
			"      <div class=\"modal-content\">"+
			"          <div class=\"modal-header bg-info\" >"+
			"             <span><i class=\"menu-icon green fa-2x fa fa-book\"></i>"+
			"                   <span class=\"text-success \"><strong>"+materiad+"</strong><i class=\"menu-icon green fa fa-angle-double-right\"></i></span>"+    		   
			"             <button type=\"button\" class=\"close\" data-dismiss=\"modal\"  aria-label=\"Cancelar\">"+
			"                  <span aria-hidden=\"true\">&times;</span>"+
			"             </button>"+
			"          </div>"+
			"          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\">"+
			"               <ul class=\"nav nav-tabs\" > "+
			"                  <li class=\"active\"><a data-toggle=\"tab\" href=\"#tabTemas\"><i class=\"menu-icon green fa fa-thumbs-down\"></i><span class=\"menu-text\">Temas</span></a></li> "+
			"                  <li><a data-toggle=\"tab\" href=\"#tabEval\"><i class=\"menu-icon blue fa fa-group\"></i><span class=\"menu-text\"> Evaluaciones</span></a></li> "+
			"               </ul> "+

			"               <div class=\"tab-content\">"+
			"                   <div id=\"tabTemas\" class=\"tab-pane fade in active\">"+		
			"                        <div class=\"row\">"+			
			"                             <div class=\"col-sm-12\" id=\"laTabla\"></div> "+			
			"                        </div>"+	
			"                   </div>"+
			"                   <div id=\"tabEval\" class=\"tab-pane fade\">"+		
			"                        <div class=\"row\">"+			
			"                             <div class=\"col-sm-12\" id=\"laTablaEval\"></div> "+		
			"                        </div>"+	
			"                   </div>"+
			"              </div>"+ 	     
			"          </div>"+
			"      </div>"+
			"   </div>"+
			" <select id=\"aulas\" style=\"visibility:hidden\"></select> "
			"</div>";
		
			$("#modalDocument").remove();
			if (! ( $("#modalDocument").length )) {
				$("#"+contenedor).append(script); }
			
			
			$('#modalDocument').modal({show:true, backdrop: 'static'});
			cargarFechas(materia,grupo,ciclo,abierto,esjefe);	
			cargarFechasEval  (materia,grupo,ciclo,abierto,esjefe);
			
		}
	});   
}


function cargarFechas(materia,grupo,ciclo, abierto, esjefe) {
	cargandoSubtemas=true;
elsql="SELECT l.UNID_PRED AS TMACVE, "+
	  "(SELECT UNID_DESCRIP FROM eunidades i WHERE i.UNID_MATERIA=l.UNID_MATERIA and i.UNID_NUMERO=l.UNID_PRED  "+
	  "		   and i.UNID_PRED='' LIMIT 1) AS TEMA,"+
	  "UNID_NUMERO AS SMACVE, UNID_DESCRIP AS SUBTEMA, "+
	  "IFNULL((SELECT j.PGRFEPI from pgrupo j where  j.PDOCVE='"+ciclo+"' and j.MATCVE=l.UNID_MATERIA AND j.GPOCVE='"+grupo+"' "+
      "        AND j.TMACVE=l.UNID_PRED and j.SMACVE=l.UNID_NUMERO),'') AS FECHAINIPROG,"+
	  "IFNULL((SELECT j.PGRFEPT from pgrupo j where  j.PDOCVE='"+ciclo+"' and j.MATCVE=l.UNID_MATERIA AND j.GPOCVE='"+grupo+"'  "+
	  "        AND j.TMACVE=l.UNID_PRED and j.SMACVE=l.UNID_NUMERO),'') AS FECHAFINPROG "+
      " FROM eunidades l where l.UNID_MATERIA='"+materia+"'  and l.UNID_PRED<>''"+
	  " order by UNID_PRED,UNID_NUMERO ";


parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
$.ajax({
   type: "POST",
   data:parametros,
   url:  "../base/getdatossqlSeg.php",
   success: function(data){    

		 $("#laTabla").empty();
		 $("#laTabla").append("<table id=tabFechas class= \"table table-sm table-condensed table-bordered table-hover\" style=\"overflow-y: auto;\">"+
				 "<thead><tr><th>SUBTEMA</th>"+
				 "<th style=\"text-align:center;\" ><span class=\"badge badge-success\"><i class=\"fa fa-sign-out\"></i> FECHA INICIO</span><span>&nbsp&nbsp&nbsp&nbsp&nbsp</span>"+
				 "<span class=\"badge badge-danger\"><i class=\"fa fa-flag\"></i> FECHA FIN</span></th></tr>"+ 
				 "</thead></table> ");

	     $("#cuerpoFechas").empty();
		 $("#tabFechas").append("<tbody id=\"cuerpoFechas\">");
		 c=0; 
		 
		 elTema=JSON.parse(data)[0]["TMACVE"];
		 

		   $("#cuerpoFechas").append("<tr id=\"row"+c+"\">");
		   $("#row"+c).append("<td width=\"50%\" colspan=\"2\"><span class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+elTema+" "+utf8Decode(JSON.parse(data)[0]["TEMA"])+"</span></td>");
		   $("#row"+c).append("</tr>");
		   c++;

		 
		  jQuery.each(JSON.parse(data), function(clave, valor) { 

		   if (!(elTema==valor.TMACVE)) {
			  $("#cuerpoFechas").append("<tr id=\"row"+c+"\">");
			   $("#row"+c).append("<td width=\"50%\" colspan=\"1\"><span class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+valor.TMACVE+" "+utf8Decode(valor.TEMA)+"</span></td>");
			   $("#row"+c).append("</tr>");
			   elTema=valor.TMACVE;
			   c++;
			   }
		
			   
			 $("#cuerpoFechas").append("<tr id=\"row"+c+"\">");   		          
			 $("#row"+c).append("<td><span class=\"text-primary\" style=\"font-size:11px; font-weight:bold; white-space: normal;\">"+valor.SMACVE+" "+utf8Decode(valor.SUBTEMA)+"</span></td>");	   		          	             		         
			
			 htmlfecini="<span class=\"label label-success label-white middle\">"+valor.FECHAINIPROG+"</span>";
			 htmlfecfin="<span class=\"label label-danger label-white middle\">"+valor.FECHAFINPROG+"</span>";

			 if ((abierto)||(esjefe=='S')) { 
				 htmlfecini= "<div class=\"input-group\">"+
							 "     <input onchange=\"grabafechaplan('"+materia+"','"+grupo+"','"+ciclo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+c+"');\" "+
							 "            value=\""+valor.FECHAINIPROG+"\" class=\"form-control date-picker\" id=\"fecini"+c+"\" "+
				             "            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
							 "     <span class=\"input-group-addon\"><i class=\"fa green fa-calendar bigger-110\"></i></span>"+
							 "</div>";
				htmlfecfin= "<div class=\"input-group\">"+
				             "     <input onchange=\"grabafechaplan('"+materia+"','"+grupo+"','"+ciclo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+c+"');\" "+
				             "            value=\""+valor.FECHAFINPROG+"\" class=\"form-control date-picker\" id=\"fecfin"+c+"\" "+
							"            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
							"     <span class=\"input-group-addon\"><i class=\"fa red fa-calendar bigger-110\"></i></span>"+
							"</div>";
			 }

			 $("#row"+c).append("<td><div class=\"row\"> <div class=\"col-md-6\">"+htmlfecini+"</div>"+
			                    "                        <div class=\"col-md-6\">"+htmlfecfin+"</div>"+				
			                    "</td>");			
			 $("#row"+c).append("</tr>");    	
			 c++;					    			
		});					
		$('.date-picker').datepicker({autoclose: true,todayHighlight: true});		
		cargandoSubtemas=false;	//Para que no ejecute el procedimiento de grabar 

	  },
  error: function(data) {	  
			$('#dlgproceso').modal("hide");                 
			 alert('ERROR: '+data);  
		 }
 });
}


function grabafechaplan(materia,grupo,ciclo,tema,subtema,id){
	if (!(cargandoSubtemas)) {
		console.log("entre "+ciclo+" "+materia+" "+grupo+" "+tema+" "+subtema+"cs:"+cargandoSubtemas); 
		var losdatos=[];
		losdatos[0]=ciclo+"|"+materia+"|"+grupo+"|"+tema+"|"+subtema+"|"+
		            $("#fecini"+id).val()+"|"+$("#fecfin"+id).val()+"|"+$("#fecini"+id).val()+"|"+$("#fecfin"+id).val();
    var loscampos = ["PDOCVE","MATCVE","GPOCVE","TMACVE","SMACVE","PGRFEPI","PGRFEPT","PGRFERI","PGRFERT",];
		   parametros={
			 tabla:"pgrupo",
			 campollave:"concat(PDOCVE,MATCVE,GPOCVE,TMACVE,SMACVE)",
			 bd:"Mysql",
			 valorllave:ciclo+materia+grupo+tema+subtema,
			 eliminar: "S",
			 separador:"|",
			 campos: JSON.stringify(loscampos),
			 datos: JSON.stringify(losdatos)
		   };

		  $.ajax({
			 type: "POST",
			 url:"../base/grabadetalle.php",
			 data: parametros,
			 success: function(data){		
				 if (data.length>0) {alert ("Ocurrio un error: "+data);}					                      	                                        					          
			 }					     
		 });    	 
	}
}


function cargarFechasEval(materia,grupo,ciclo,abierto, esjefe) {
	cargandoTemas=true;
    elsql="SELECT l.UNID_NUMERO, UNID_DESCRIP, "+
	  "IFNULL((SELECT j.FECHA from eplaneacion j where  j.CICLO='"+ciclo+"' and j.MATERIA=l.UNID_MATERIA AND j.GRUPO='"+grupo+"' "+
      "        AND j.NUMUNIDAD=l.UNID_NUMERO),'') AS FECHA"+
      " FROM eunidades l where l.UNID_MATERIA='"+materia+"'  and l.UNID_PRED=''"+
	  " order by UNID_PRED,UNID_NUMERO ";
	


   var ladefault="..\\..\\imagenes\\menu\\pdf.png";	
   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

   $.ajax({
	  type: "POST",
	  data:parametros,
	  url:  "../base/getdatossqlSeg.php",
	  success: function(data){    
			$("#laTablaEval").empty();
			$("#laTablaEval").append("<table id=tabFechasEval class= \"table table-sm table-condensed table-bordered table-hover\" style=\"overflow-y: auto;\">"+
					"<thead><tr><th>UNIDAD</th><th>FECHA EVALUACIÓN</th></tr>"+ 
					"</thead></table> ");
 
		     $("#cuerpoFechasEval").empty();
			$("#tabFechasEval").append("<tbody id=\"cuerpoFechasEval\">");
		 
			c=0;
			 jQuery.each(JSON.parse(data), function(clave, valor) { 
				 $("#cuerpoFechasEval").append("<tr id=\"rowEval"+c+"\">");
				  $("#rowEval"+c).append("<td><span class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+valor.UNID_NUMERO+" "+utf8Decode(valor.UNID_DESCRIP)+"</span></td>");             	    		      		             	   		          	             		       
				
				  htmlfecha="<span class=\"label label-danger label-white middle\">"+valor.FECHA+"</span>";

				  if ((abierto)||(esjefe=='S')) {
						htmlfecha= "<div class=\"input-group\">"+
									"     <input onchange=\"grabafechaeval('"+materia+"','"+grupo+"','"+ciclo+"','"+valor.UNID_NUMERO+"','"+c+"');\" "+
									"            value=\""+valor.FECHA+"\" class=\"form-control date-picker\" id=\"evalfecha"+c+"\" "+
									"            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
									"     <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span>"+
									"</div>";
					}

				   $("#rowEval"+c).append("<td>"+htmlfecha+"</td>");				   
				   $("#rowEval"+c).append("</tr>");    	
				c++;	         
		   });
		   $('.date-picker').datepicker({autoclose: true,todayHighlight: true});		   		
		   cargandoTemas=false;	//Para que no ejecute el procedimiento de grabar 
			
		 },
	 error: function(data) {	  
			   $('#dlgproceso').modal("hide");                 
				alert('ERROR: '+data);  
			}
	});
 }


 
function grabafechaeval(materia,grupo,ciclo,tema,id){
	if (!(cargandoTemas)) {
		console.log("entre "+ciclo+" "+materia+" "+grupo+" "+tema+"cs:"+cargandoTemas); 
		var losdatos=[];
		losdatos[0]=ciclo+"|"+materia+"|"+grupo+"|"+tema+"|"+
		            $("#evalfecha"+id).val()+"|"+$("#evalfecha"+id).val();
    var loscampos = ["CICLO","MATERIA","GRUPO","NUMUNIDAD","FECHA","FECHAR",];
		   parametros={
			 tabla:"eplaneacion",
			 campollave:"concat(CICLO,MATERIA,GRUPO,NUMUNIDAD)",
			 bd:"Mysql",
			 valorllave:ciclo+materia+grupo+tema,
			 eliminar: "S",
			 separador:"|",
			 campos: JSON.stringify(loscampos),
			 datos: JSON.stringify(losdatos)
		   };

		  $.ajax({
			 type: "POST",
			 url:"../base/grabadetalle.php",
			 data: parametros,
			 success: function(data){	
				 if (data.length>0) {alert ("Ocurrio un error: "+data);}					                      	                                        					          
			 }					     
		 });    	 
	}
}



/*==============================================================================================*/

/*===============================CALCULO DE LAS CALIFICACIONES POR GRUPOS ===================================*/
function calcularFinal(profesor,materia,materiad,grupo,ciclo, modulo){
	
	mostrarEspera("esperacalculo","grid_"+modulo,"Calculando...");
	
			 sqlLista="select ID, "+
						"IFNULL(LISPA1,'0') AS LISPA1,IFNULL(LISPA2,'0') AS LISPA2,IFNULL(LISPA3,'0') AS LISPA3,"+
						"IFNULL(LISPA4,'0') AS LISPA4,IFNULL(LISPA5,'0') AS LISPA5,IFNULL(LISPA6,'0') AS LISPA6,"+
						"IFNULL(LISPA7,'0') AS LISPA7,IFNULL(LISPA8,'0') AS LISPA8,IFNULL(LISPA9,'0') AS LISPA9,"+
						"IFNULL(LISPA10,'0') AS LISPA10,IFNULL(LISPA11,'0') AS LISPA11,IFNULL(LISPA12,'0') AS LISPA12,"+
						"IFNULL(LISPA13,'0') AS LISPA13,IFNULL(LISPA14,'0') AS LISPA14,IFNULL(LISPA15,'0') AS LISPA15,"+
						"IFNULL(LISFA1,'0') AS LISFA1,IFNULL(LISFA2,'0') AS LISFA2,IFNULL(LISFA3,'0') AS LISFA3,"+
                        "IFNULL(LISFA4,'0') AS LISFA4,IFNULL(LISFA5,'0') AS LISFA5,IFNULL(LISFA6,'0') AS LISFA6,"+
						"IFNULL(LISFA7,'0') AS LISFA7,IFNULL(LISFA8,'0') AS LISFA8,IFNULL(LISFA9,'0') AS LISFA9,"+
						"IFNULL(LISFA10,'0') AS LISFA10,IFNULL(LISFA11,'0') AS LISFA11,IFNULL(LISFA12,'0') AS LISFA12,"+
						"IFNULL(LISFA13,'0') AS LISFA13,IFNULL(LISFA14,'0') AS LISFA14,IFNULL(LISFA15,'0') AS LISFA15,"+
						"(select count(*) as N  from eunidades where UNID_MATERIA=MATCVE and UNID_PRED='') AS NUMUNI"+
						" from dlista a where a.PDOCVE='"+ciclo+"' and a.MATCVE='"+materia+"'"+
						" and a.GPOCVE='"+grupo+"' and CERRADO='N'";		
			 
			parametros={sql:sqlLista,dato:sessionStorage.co,bd:"Mysql"}
			 $.ajax({
				type: "POST",
				data:parametros,
				url:  "../base/getdatossqlSeg.php",
				success: function(dataLista){  
					   laLista=JSON.parse(dataLista);  
					   jQuery.each(laLista, function(clave, valor) { 
						   suma=0; sumaF=0;
						   promedio=0;
						   for (x=1;x<=valor.NUMUNI;x++) {
							   if (laLista[clave][x]<70) {suma=(valor.NUMUNI*60); break; }
							   suma+=parseFloat(laLista[clave][x]);
						   }	
						   for (y=1;y<=valor.NUMUNI;y++) {sumaF+=parseFloat(laLista[clave][y+15]);}		    	 
						   promedio=Math.round((suma/valor.NUMUNI));
						  
						   parametros={
							tabla:"dlista",
							campollave:"ID",
							valorllave:valor.ID,
							bd:"Mysql",
							LISCAL:promedio, 
							TCACVE:"1",
							LISFALT:sumaF							
							};
				            $.ajax({
					               type: "POST",
					               url:"../base/actualiza.php",
					               data: parametros,
					               success: function(data){			                                	                      
									if ((data.substring(0,1)=="0"))	
											{alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
					  			 }					     
				   			});      
					 });

					 ocultarEspera("esperacalculo");
					 					  
				   },
			   error: function(data) {	  				
						  alert('ERROR: '+data);  
					  }
			  });
			  
}



/*========================devuelve el ciclo escolar adtual =========================================*/
function colocarCiclo(contenedor,tipo) {
	ciclo="SIN CICLO";
	sqlCiclo="SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc where CICL_CLAVE=getciclo()";		
	parametros={sql:sqlCiclo,dato:sessionStorage.co,bd:"Mysql"}
    $.ajax({
		 type: "POST",
		 data:parametros,
         url:  "../base/getdatossqlSeg.php",
         success: function(data){            
                jQuery.each(JSON.parse(data), function(clave, valor) { 
					if (tipo=="CLAVE") {cad=valor.CICL_CLAVE;}
					if (tipo=="DESCRIP") {cad=valor.CICL_DESCRIP;}
					if (tipo=="AMBOS") {cad=ciclo=valor.CICL_CLAVE+"|"+valor.CICL_DESCRIP;}
			        $("#"+contenedor).html(cad); 
				});
			}            
    });
}

/*================================EXPORTAR A WORD =====================================================*/
function exportHTML(contenedor,nombre){
	var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
		 "xmlns:w='urn:schemas-microsoft-com:office:word' "+
		 "xmlns='http://www.w3.org/TR/REC-html40'>"+
		 "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
	var footer = "</body></html>";
	var sourceHTML = header+document.getElementById(contenedor).innerHTML+footer;
	
	var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
	var fileDownload = document.createElement("a");
	document.body.appendChild(fileDownload);
	fileDownload.href = source;
	fileDownload.download = nombre;
	fileDownload.click();
	document.body.removeChild(fileDownload);
 }



 /*************************************************************/
// NumeroALetras
// The MIT License (MIT)
// 
// Copyright (c) 2015 Luis Alfredo Chee 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// @author Rodolfo Carmona
// @contributor Jean (jpbadoino@gmail.com)
/*************************************************************/
function Unidades(num){
    switch(num)
    {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }

    return "";
}//Unidades()

function Decenas(num){
    decena = Math.floor(num/10);
    unidad = num - (decena * 10);
    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad);
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades(unidad);
    }
}//Unidades()

function DecenasY(strSin, NUMUNIdades) {
    if (NUMUNIdades > 0)
    return strSin + " Y " + Unidades(NUMUNIdades)
    return strSin;
}//DecenasY()

function Centenas(num) {
    centenas = Math.floor(num / 100);
    decenas = num - (centenas * 100);
    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }
    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}//Seccion()

function Miles(num) {
    divisor = 1000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    strCentenas = Centenas(resto);

    if(strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    divisor = 1000000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)
    strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    strMiles = Miles(resto);
    if(strMillones == "")
        return strMiles;
    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: "",//"PESOS", 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: "", //"PESO", 'Dólar', 'Bolivar', 'etc'
        letrasMonedaCentavoPlural: "",
        letrasMonedaCentavoSingular: ""
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function (){
            if (data.centavos == 1)
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
            })();
    };

    if(data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}//NumeroALetras()




/*===================================================AGREGAR ELEMENTO DE SUBIDA DE ARCHIVOS DRIVE =======================*/

function dameSubirArchivoDrive(contenedor,etiqueta,nombre,carpetaDrive,extensiones,campoIDTabla,valorid,mensajesubida,tablasubir,altaedita,aux, ruta, activareliminar) {		    
		cad=
		"  <div class=\"row \"> "+		
		"      <div class=\"col-sm-8\" id=\"inputFileRow\">"+
		"          <label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		"          <input  class=\"fileSigea\" type=\"file\" id=\"file_"+nombre+"\" name=\"file_"+nombre+"\""+
		"                 onchange=\"subirPDFDriveSave('file_"+nombre+"','"+carpetaDrive+"','img_"+nombre+"',"+
		"                 '"+nombre+"','"+extensiones+"','S','"+campoIDTabla+"','"+valorid+"','"+mensajesubida+
		"                 ','"+tablasubir+"','"+altaedita+"','"+aux+"');\"/>"+
		"          <input type=\"hidden\" value=\""+ruta+"\"  name=\""+nombre+"\" id=\""+nombre+"\"  placeholder=\"\" />\n"+
		"      </div> ";

		stElim="display:none; cursor:pointer;";
		if (ruta.length>0) { stElim="cursor:pointer; ";}    
		cadeliminar='';
		if (activareliminar=='S') {
				cadeliminar="<i style=\""+stElim+"\"  id=\"btnEli_"+nombre+"\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
								"onclick=\"eliminarEnlaceDrive('file_"+nombre+"','"+carpetaDrive+"',"+
								"'img_"+nombre+"','"+nombre+"','"+extensiones+"','S','"+campoIDTabla+"','"+
								valorid+"','"+mensajesubida+"','"+tablasubir+"','"+altaedita+"','"+aux+"');\">"+
							"</i>";
		}
		eliminar="<div class=\"col-sm-3\" style=\"padding-top:10px;\">"+
		"           <a title=\"Ver Archivo\" target=\"_blank\" id=\"enlace_"+nombre+"\" href=\""+ruta+"\">"+
		"                  <img id=\"img_"+nombre+"\" name=\"img_"+nombre+"\" src=\"..\\..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
		"           </a>"+cadeliminar+		
		"          </div>"+
	    "  </div>";
	
		
		$("#"+contenedor).append(cad+eliminar);

		$('.fileSigea').ace_file_input({
			no_file:'Sin archivo ...',
			btn_choose:'Buscar',
			btn_change:'Cambiar',
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			whitelist: extensiones,
			blacklist:'exe|php'
			//onchange:''
			//
		});
		if ((ruta=='') || (ruta==null)) { 
			$('#enlace_'+nombre).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
			$('#img_'+nombre).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
		   }



}

function abrirPesta(enlace,titulo) {
var content = '<iframe frameborder="0" id="FRNoti" src="'+enlace+'" style="overflow-x:hidden;width:100%;height:100%;"></iframe></div>';	
		$('#parentPrice', window.parent.document).html();
		window.parent.$("#myTab").tabs('add',{
				    	    title:titulo,				    	    
				    	    content:content,
				    	    closable:true		    
						});
}

/*==============================================VENTANA DE CORREO ================================================*/

function getVentanaCorreo(modulo,colcorreo) {
	ec_elReg=0;
	ec_nreg=0;
	var table =  $("#G_"+modulo).DataTable();	
	table.rows().iterator('row', function(context, index){ec_nreg++;});

    eleditor="<div class=\"widget-box widget-color-green\">"+
	"<div class=\"widget-body\"> "+
	"     <div class=\"widget-main no-padding\">"+
	"         <div class=\"wysiwyg-editor\" id=\"ec_elcorreo\" style=\"height:120px;\"></div>"+
	"     </div>"+
	"     <div class=\"widget-toolbox padding-4 clearfix\">"+
	"         <div class=\"btn-group pull-right\">"+
	"              <label onclick=\"limpiarEdit('ec_elcorreo','"+modulo+"');\" "+
	"              class=\"btn btn-sm btn-success btn-white btn-round\">"+
	"              <i class=\"ace-icon fa fa-external-link-square bigger-125\"></i>Limpiar</label>"+
	"         </div>"+
	"     </div>"+
	"</div>"+
	"</div>"


	script="<div class=\"modal fade\" id=\"vc_"+modulo+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	"   <div class=\"modal-dialog modal-lg\"  role=\"document\">"+
	"      <div class=\"modal-content\">"+
	"          <div class=\"modal-header\" >"+
	"             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	"                  <span aria-hidden=\"true\">&times;</span>"+
	"             </button>"+
	"             <span><i class=\"menu-icon bigger-160 blue fa  fa-envelope-o\"></i><span class=\"text-success lead \"> <strong>Envió de correo</strong></span></span>"+	   
	"          </div>"+
	"          <div id=\"bodyvc_"+modulo+"\" class=\"modal-body\"  style=\"height:300px; overflow-y: auto;\">"+	
	"               <div class=\"row \"> "+		
	"                   <div class=\"col-sm-4\" id=\"lasplantillas\" >"+      
	"                         <label class=\"label label-success\">Plantilla</label>"+
	"                         <select onchange=\"cargaPlantilla();\" id=\"selPlantillas\" class=\"form-control\"></select>"+
	"                   </div>"+    
	"                   <div class=\"col-sm-4\">"+      
	"                         <label class=\"label label-success\">Correo Prueba</label>"+
	"                         <input class=\"form-control\" id=\"elcorreoprueba\"></input>"+
	"                   </div>"+
	"                   <div class=\"col-sm-4\">"+      
	"                         <label class=\"label label-primary\">Asunto</label>"+
	"                         <input class=\"form-control\" id=\"elasunto\"></input>"+
	"                   </div>"+        
	"               </div>"+    
	"               <div class=\"row \"> "+	
	"                   <div class=\"col-sm-12\">"+   
	                        eleditor+
	"                   </div>"+	
	"               </div>"+   
	"          </div>"+
	"          <div id=\"headvc_"+modulo+"\" class=\"modal-head\" style=\"padding:10px; background-color:#F0EEEE; text-align:center;\">"+	
	"              <button onclick=\"procEnvioCorreo('"+modulo+"','"+colcorreo+"','0');\" "+
	"              class=\"btn btn-sm btn-primary btn-white btn-round\">"+
	"              <i class=\"ace-icon blue fa fa-mail-forward bigger-150\"></i>Enviar Correo</button>"+
	"          </div>"
	"      </div>"+
	"   </div>"+
	"</div>";
	$("#vc_"+modulo).remove();
    if (! ( $("#vc_"+modulo).length )) {
	        $("#grid_"+modulo).append(script);	     
	    }	    
	$('#vc_'+modulo).modal({show:true, backdrop: 'static'});
	
	actualizaSelect("selPlantillas", "SELECT NOMBRE, NOMBRE FROM ec_plantillas order by NOMBRE", "","");  			      

	$('#ec_elcorreo').ace_wysiwyg({
		toolbar:
		[   'font','fontSize',
			{name:'bold', className:'btn-info'},			
			null,
			'foreColor',
			null,
			{name:'undo', className:'btn-grey'},
			{name:'redo', className:'btn-grey'},
			{name:'createLink', className:'btn-pink'},
			{name:'unlink', className:'btn-pink'},
			null,
			{name:'insertImage', className:'btn-primary'},
			{name:'nuevo', className:'btn-success'}
		],
		'wysiwyg': {
			fileUploadError: showErrorAlert
		}
	}).prev().addClass('wysiwyg-style2');


	if ( typeof jQuery.ui !== 'undefined' && ace.vars['webkit'] ) {	
		var lastResizableImg = null;
		function destroyResizable() {
			if(lastResizableImg == null) return;
			lastResizableImg.resizable( "destroy" );
			lastResizableImg.removeData('resizable');
			lastResizableImg = null;
		}
		var enableImageResize = function() {
			$('.wysiwyg-editor')
			.on('mousedown', function(e) {
				var target = $(e.target);
				if( e.target instanceof HTMLImageElement ) {
					if( !target.data('resizable') ) {
						target.resizable({
							aspectRatio: e.target.width / e.target.height,
						});
						target.data('resizable', true);						
						if( lastResizableImg != null ) {
							//disable previous resizable image
							lastResizableImg.resizable( "destroy" );
							lastResizableImg.removeData('resizable');
						}
						lastResizableImg = target;
					}
				}
			})
			.on('click', function(e) {
				if( lastResizableImg != null && !(e.target instanceof HTMLImageElement) ) {
					destroyResizable();
				}
			})
			.on('keydown', function() {
				destroyResizable();
			});
		}

		enableImageResize();
	}
}

function cargaPlantilla() {
		elsql="select * from ec_plantillas where NOMBRE='"+$("#selPlantillas").val()+"'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  
				    losdatos=JSON.parse(data);				      			      
					$("#ec_elcorreo").html(losdatos[0]["MENSAJE"]);
					$("#elasunto").val(losdatos[0]["ASUNTO"]);																										
			},
			error: function(dataMat) {	                  
					alert('ERROR: '+dataMat);
								}
	});	      	      	
}


/*=======================PRCEDIMIENTOS DE ENVIO DE CORREO =================*/

function procEnvioCorreo(modulo,colcorreo,ec_elReg){
	
	$("#confirmFinalizar").modal("hide");
	if (!($("#vtnRes").is(":visible"))) { 
		mostrarVentRes('vtnRes','txtResultados','grid_'+modulo,'Resultados','modal-lg');
	}
	
	var table =  $("#G_"+modulo).DataTable();	
	var lafila = table.rows(ec_elReg).data();

	mensaje=$("#ec_elcorreo").html();

	lista=dameParametrosSeparados(mensaje,"{","}");
	for (var i = 0; i < lista.length; i++) {
		var regex = new RegExp("{" + lista[i]  + "}", "gi");
		mensaje=mensaje.replace(regex,lafila[0][lista[i]]);
	}

	elcorreo=lafila[0][colcorreo]; if ($("#elcorreoprueba").val().length>0) {elcorreo=$("#elcorreoprueba").val();}
	

    var parametros = {
		"MENSAJE": mensaje,
		"ADJSERVER": 'S',
		"ASUNTO": $("#elasunto").val(),
		"CORREO" : elcorreo,
		"NOMBRE":"",
		"ADJUNTO":''
    };

    $.ajax({
        data:  parametros,
        type: "POST",
        url: "../base/enviaCorreo.php",
        success: function(response)
        {
            $('#txtResultados').val($('#txtResultados').val()+(ec_elReg+1)+" de "+(ec_nreg)+" "+response+"\n");
            ec_elReg++;
            if (ec_nreg>=ec_elReg) {procEnvioCorreo(modulo,colcorreo,ec_elReg);}
        },
        error : function(error) {
            console.log(error);
            $('#txtResultados').val($('#txtResultados').val()+"Error en ajax "+error.toString()+"\n");
        }
	});

}


function correoalProfNoti(contenedor, msjnoti,clave, elmensaje, asunto){			
	elsql="select CONCAT(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS NOMBRE,EMPL_TELEFONO AS TELEFONO"+
	", EMPL_CORREO AS CORREO from pempleados c "+
		  " where EMPL_NUMERO='"+clave+"'";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
	type: "POST",
	data:parametros,
	url:  "../base/getdatossqlSeg.php",
	success: function(data){   

			elcorreo=JSON.parse(data)[0]["CORREO"];
			mensaje=elmensaje;

			var parametros = {
				"MENSAJE": mensaje,
				"ADJSERVER": 'N',
				"ASUNTO": asunto,
				"CORREO" :  elcorreo,
				"NOMBRE" :  JSON.parse(data)[0]["NOMBRE"],
				"ADJUNTO":''
			};
		
			$.ajax({
				data:  parametros,
				type: "POST",
				url: "../base/enviaCorreo.php",
				success: function(response)
				{
				   console.log("JEFE: "+response);
				   $("#"+contenedor).append("<b>"+msjnoti+" - </b>"+response+"<br>");
			
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


function correoalProf( clave, elmensaje, asunto){			
	elsql="select CONCAT(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS NOMBRE,EMPL_TELEFONO AS TELEFONO"+
	", EMPL_CORREO AS CORREO from pempleados c "+
		  " where EMPL_NUMERO='"+clave+"'";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
	type: "POST",
	data:parametros,
	url:  "../base/getdatossqlSeg.php",
	success: function(data){   

			elcorreo=JSON.parse(data)[0]["CORREO"];
			mensaje=elmensaje;

			var parametros = {
				"MENSAJE": mensaje,
				"ADJSERVER": 'N',
				"ASUNTO": asunto,
				"CORREO" :  elcorreo,
				"NOMBRE" :  JSON.parse(data)[0]["NOMBRE"],
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


function correoPersona( clave, elmensaje, asunto){			
	elsql="select CONCAT(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS NOMBRE,EMPL_TELEFONO AS TELEFONO"+
	", EMPL_CORREO AS CORREO from pempleados c "+
		  " where EMPL_NUMERO='"+clave+"'"+
	" UNION select CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE,ALUM_TELEFONO AS TELEFONO"+
		  ", ALUM_CORREO AS CORREO from falumnos c "+
				" where ALUM_MATRICULA='"+clave+"'";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
	type: "POST",
	data:parametros,
	url:  "../base/getdatossqlSeg.php",
	success: function(data){   
			
			elcorreo=JSON.parse(data)[0]["CORREO"];
			mensaje=elmensaje;

			var parametros = {
				"MENSAJE": mensaje,
				"ADJSERVER": 'N',
				"ASUNTO": asunto,
				"CORREO" :  elcorreo,
				"NOMBRE" :  JSON.parse(data)[0]["NOMBRE"],
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




function correoalAlum( clave, elmensaje, asunto){			
	elsql="select CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE,ALUM_TELEFONO AS TELEFONO"+
	", ALUM_CORREO AS CORREO from falumnos c "+
		  " where ALUM_MATRICULA='"+clave+"'";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
	type: "POST",
	data:parametros,
	url:  "../base/getdatossqlSeg.php",
	success: function(data){   

			elcorreo=JSON.parse(data)[0]["CORREO"];
			mensaje=elmensaje;

			var parametros = {
				"MENSAJE": mensaje,
				"ADJSERVER": 'N',
				"ASUNTO": asunto,
				"CORREO" :  elcorreo,
				"NOMBRE" :  JSON.parse(data)[0]["NOMBRE"],
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


function correoalAlumNoti(  contenedor,msjnoti, clave, elmensaje, asunto){			
	elsql="select CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE,ALUM_TELEFONO AS TELEFONO"+
	", ALUM_CORREO AS CORREO from falumnos c "+
		  " where ALUM_MATRICULA='"+clave+"'";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
	type: "POST",
	data:parametros,
	url:  "../base/getdatossqlSeg.php",
	success: function(data){   

			elcorreo=JSON.parse(data)[0]["CORREO"];
			mensaje=elmensaje;

			var parametros = {
				"MENSAJE": mensaje,
				"ADJSERVER": 'N',
				"ASUNTO": asunto,
				"CORREO" :  elcorreo,
				"NOMBRE" :  JSON.parse(data)[0]["NOMBRE"],
				"ADJUNTO":''
			};
		
			$.ajax({
				data:  parametros,
				type: "POST",
				url: "../base/enviaCorreo.php",
				success: function(response)
				{
				   console.log("JEFE: "+response);
				   $("#"+contenedor).append("<b>"+msjnoti+" - </b>"+response+"<br>");
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


function correoalJefe( matricula, elmensaje, asunto){			
	elsql="select CONCAT(ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) AS NOMBRE,ALUM_TELEFONO AS TELEFONO"+
	", ALUM_CORREO AS CORREO, EMPL_CORREOINS AS CORREOJEFE from falumnos a, fures b, pempleados c "+
		  " where ALUM_MATRICULA='"+matricula+"' AND ALUM_CARRERAREG=b.CARRERA and b.URES_JEFE=c.EMPL_NUMERO";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
	type: "POST",
	data:parametros,
	url:  "../base/getdatossqlSeg.php",
	success: function(data){   

			elcorreo=JSON.parse(data)[0]["CORREOJEFE"];
			mensaje=elmensaje;

			var parametros = {
				"MENSAJE": mensaje+"<br>Datos de contacto: <br> correo: "+JSON.parse(data)[0]["CORREO"]+"<br> Tel&eacute;fono:"+JSON.parse(data)[0]["TELEFONO"],
				"ADJSERVER": 'N',
				"ASUNTO": asunto,
				"CORREO" :  elcorreo,
				"NOMBRE" :  JSON.parse(data)[0]["NOMBRE"],
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

/*===================CREACION DE NOTIFICACIONES ===========================================*/
function setNotificacion(usuario,mensaje,enlace,tipo,institucion,campus){

	lafecha=dameFecha("FECHAHORA");
	lafechaNot=dameFecha("FECHA");
	lafechaNotFin=dameFecha("FECHA",3);

	parametros={tabla:"enotificaciones",
	bd:"Mysql",
	_INSTITUCION:institucion,
	_CAMPUS:campus,
	ENOT_DESCRIP:mensaje,
	ENOT_USUARIO:usuario,
	ENOT_INICIA:lafechaNot,							
	ENOT_TERMINA:lafechaNotFin,
	ENOT_ENLACE:enlace,
	ENOT_TIPO:tipo,
	ENOT_FECHA:lafecha,
	ENOT_USER:usuario};     
	$.ajax({
	type: "POST",
	url:"../base/inserta.php",
	data: parametros,
	success: function(data){ 
		
	}
	});
}


function setNotificacionFecha(usuario,mensaje,fechaIni,fechaFin,enlace,tipo,institucion,campus){

	lafecha=dameFecha("FECHAHORA");

	parametros={tabla:"enotificaciones",
	bd:"Mysql",
	_INSTITUCION:institucion,
	_CAMPUS:campus,
	ENOT_DESCRIP:mensaje,
	ENOT_USUARIO:usuario,
	ENOT_INICIA:fechaIni,							
	ENOT_TERMINA:fechaFin,
	ENOT_ENLACE:enlace,
	ENOT_TIPO:tipo,
	ENOT_FECHA:lafecha,
	ENOT_USER:usuario};     
	$.ajax({
	type: "POST",
	url:"../base/inserta.php",
	data: parametros,
	success: function(data){ 

	}
	});
}



function setNotificacionalJefe(matricula,mensaje,enlace,tipo,institucion,campus){
	elsql="select EMPL_NUMERO from falumnos a, fures b, pempleados c "+
		  " where ALUM_MATRICULA='"+matricula+"' AND ALUM_CARRERAREG=b.CARRERA and b.URES_JEFE=c.EMPL_NUMERO";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){   
				
			eluser=JSON.parse(data)[0][0];
			setNotificacion(eluser,mensaje,enlace,tipo,institucion,campus);
	}
  });
}


/*=========================SOLO PARA EL MODULO DE SUBIDA Y VALIDACION DE DOC CONFIGURABLES ===============================*/


function cargarPestania(seccion,padre,carpeta, tabla, elusuario, elciclo){
	var contFila=0;
	var contDatos=1;
		elsqlAdj="select IDDOC, VALIDADO, IFNULL(OBSVALIDADO,'') AS OBSVALIDADO, DOCUMENTO, ifnull(b.RUTA,'') as RUTA, CLAVE, TIPOADJ, '"+elciclo+"' "+
		" AS CICLO from documaspirantes a "+
		"LEFT OUTER JOIN  "+tabla+" b  on (b.AUX=concat('"+elusuario+"_','"+elciclo+"_',a.CLAVE))"+
		" WHERE a.ENLINEA='S' and a.MODULO='"+seccion+"' order by TIPOADJ, DOCUMENTO";			
		parametrosDoc={sql:elsqlAdj,dato:sessionStorage.co,bd:"Mysql"}

		$.ajax({
			type: "POST",
			data:parametrosDoc,
			url:  "../../nucleo/base/getdatossqlSeg.php",
			success: function(dataDoc){  								
				$("#"+padre).empty();		
				jQuery.each(JSON.parse(dataDoc), function(clave, valor) { 
				
					if (valor.VALIDADO!='S') {
							stElim="display:none; cursor:pointer;";
							if (valor.RUTA.length>0) { stElim="cursor:pointer; display:block; ";} 
							
							cadFile="<div title=\""+valor.OBSVALIDADO+"\" class=\"col-sm-5\">"+											
							"            <span class=\"text-primary\"><strong>"+utf8Decode(valor.DOCUMENTO)+"</strong></span>"+											
							"            <input class=\"fileSigea\" type=\"file\" id=\"file_"+valor.CLAVE+"\""+
							"                   onchange=\"subirPDFDriveSave('file_"+valor.CLAVE+"','"+carpeta+"','pdf_"+
														valor.CLAVE+"','RUTA_"+valor.CLAVE+"','"+valor.TIPOADJ+"','S','ID','"+valor.CLAVE+
														"',' DOCUMENTO  "+valor.DOCUMENTO+" ','"+tabla+"','alta','"+usuario+"_"+elciclo+"_"+valor.CLAVE+"');\">"+
							"           <input  type=\"hidden\" value=\""+valor.RUTA+"\"  name=\"RUTA_"+valor.CLAVE+"\" id=\"RUTA_"+valor.CLAVE+"\"  placeholder=\"\" />"+
							"        </div>"+
							"        <div class=\"col-sm-1\" style=\"padding-top:5px;\">"+
							"           <a target=\"_blank\" id=\"enlace_RUTA_"+valor.CLAVE+"\" href=\""+valor.RUTA+"\">"+
							"                 <img class=\"imgadj\" cargado=\"S\" width=\"40px\" height=\"40px\" id=\"pdf_"+valor.CLAVE+"\" name=\"pdf_"+valor.CLAVE+"\" src=\"..\\..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
							"           </a>"+
							"           <i style=\""+stElim+"\"  id=\"btnEli_RUTA_"+valor.CLAVE+"\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
							"            onclick=\"eliminarEnlaceDrive('file_"+valor.CLAVE+"','"+carpeta+"',"+
							"                      'pdf_"+valor.CLAVE+"','RUTA_"+valor.CLAVE+"','"+valor.TIPOADJ+"','S','ID','"+valor.CLAVE+"','"+valor.DOCUMENTO+"-DOCUMENTO',"+
							"                      '"+tabla+"','alta','"+usuario+"_"+elciclo+"_"+valor.CLAVE+"');\"></i> "+              				                        
							"      </div> ";


							if ((contDatos % 2)==1) {contFila++; fila="<div class=\"row\" style=\"padding:0px;\" id=\"fila"+padre+contFila+"\"></div>"; }
							else {fila="";}
							
							$("#"+padre).append(fila);
							$("#fila"+padre+contFila).append(cadFile);
							
							contDatos++;	
								
							
						if (valor.RUTA=='') { 
							$('#enlace_RUTA'+valor.CLAVE).attr('disabled', 'disabled');					  
							$('#enlace_RUTA'+valor.CLAVE).attr('href', '../../imagenes/menu/pdfno.png');
							$('#pdf_'+valor.CLAVE).attr('src', "../../imagenes/menu/pdfno.png");
							$('#pdf_'+valor.CLAVE).attr('cargado', 'N');		                    
							}
						
							if (((valor.TIPOADJ.indexOf("png")>=0) || (valor.TIPOADJ.indexOf("bmp")>=0)) && !(valor.RUTA=='')) {			
								$('#pdf_'+valor.CLAVE).attr('src', valor.RUTA);	
							}
					}
					else {
						$("#"+padre).append("<span class=\" label label-success\"><i class=\"fa fa-check white\"></i>"+valor.DOCUMENTO+"</span> <a title=\"Ver Archivo\" onclick=\"previewAdjunto('"+valor.RUTA+"');\">"+
						"                  	<img src=\"..\\..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
						"           </a>");
					} 																
			});

			$('.fileSigea').ace_file_input({
				no_file:'Sin archivo ...',
				btn_choose:'Buscar',
				btn_change:'Cambiar',
				droppable:false,
				onchange:null,
				thumbnail:false, //| true | large
				whitelist:'pdf|jpg|png|bmp',
				blacklist:'exe|php'
				//onchange:''
				//
			});


			}
		});

}



function ss_mostrarAdjuntosDin(modulo,elusuario,institucion, campus,essuper,elciclo,elusuario,descrip,elid,padre, tabla, carpeta,modulos){

	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
			script="<div class=\"modal fade sigeaPrin\" id=\""+padre+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header widget-header  widget-color-green\">"+
			   "             <span class=\"label label-lg label-primary arrowed arrowed-right\"> Documentos Adjuntados </span>"+
			   "             <span class=\"label label-lg label-success arrowed arrowed-right\">"+descrip+"</span>"+			   
			   "             <input type=\"hidden\" id=\"elid\" value=\""+elid+"\"></input>"+
			   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
			   "                  <span aria-hidden=\"true\">&times;</span>"+
			   "             </button>"+
			   "          </div>"+  
			   "          <div id=\"body"+padre+"\" class=\"modal-body\" >"+					 
			   "             <div class=\"row sigeaPrin\"   style=\"overflow-x: auto; overflow-y: auto; height:300px;\"> "+		
		       "                  <table id=\"tabla"+padre+"\" class= \"table  table-condensed table-bordered table-hover\">"+
		   	   "                         <thead>  "+
			   "                               <tr>"+	
			   "                                   <th>ID</th> "+
			   "                                   <th>Documento</th> "+
			   "                             	   <th>PDF</th> "+ 
			   "                                   <th>VALIDAR</th>"+
			   "                             	   <th>SUBIR PDF</th> "+ 
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
	 		

			$("#"+padre).remove();
		    if (! ( $("#"+padre).length )) {$("#grid_"+modulo).append(script);}

		    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		    
		    $("#"+padre).modal({show:true, backdrop: 'static'});

	        sqlAsp="select IDDOC, TIPOADJ, IFNULL(RUTA,'') AS RUTA, IFNULL(VALIDADO,'N') AS VALIDADO, IFNULL(OBSVALIDADO,'') AS OBSVALIDADO, CLAVE, DOCUMENTO "+
			"from  documaspirantes b left outer join "+tabla+" a on (a.AUX=concat('"+elusuario+"_"+elciclo+"_',b.CLAVE)) where "+
			"ENLINEA='S' AND MODULO IN ("+modulos+") order by IDDOC";
			
	
	
			parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  					        
							grid_data=JSON.parse(data);  
						  	ladefault="..\\..\\imagenes\\menu\\pdf.png";
							$("#cuerpo"+padre).empty();
							$("#tabla"+padre).append("<tbody id=\"cuerpo"+padre+"\">");
							c=0;	
							globalUni=1; 					
							
							jQuery.each(grid_data, function(clave, valor) { 	
										stElim="display:none; cursor:pointer;";
										if ((valor.RUTA!='')&&(valor.RUTA!=null)) { stElim="cursor:pointer; display:block; ";}
								
										cadFile="<input class=\"fileSigea\" type=\"file\" id=\"file_"+valor.CLAVE+"\""+
											"                   onchange=\"subirPDFDriveSave('file_"+valor.CLAVE+"','"+carpeta+"','pdf"+
																		c+"','RUTA_"+valor.CLAVE+"','"+valor.TIPOADJ+"','N','ID','"+valor.CLAVE+
																		"',' DOCUMENTO  "+valor.DOCUMENTO+" ','"+tabla+"','alta','"+elusuario+"_"+elciclo+"_"+valor.CLAVE+"');\">"+
											"           <input  type=\"hidden\" value=\"../"+valor.RUTA+"\"  name=\"RUTA_"+valor.CLAVE+"\" id=\"RUTA_"+valor.CLAVE+"\"  placeholder=\"\" />"+
											"        </div>"+
											"        <div class=\"col-sm-1\" style=\"padding-top:5px;\">"+
											"           <i style=\""+stElim+"\"  id=\"btnEli_RUTA_"+valor.CLAVE+"\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
											"            onclick=\"eliminarEnlaceDrive('file_"+valor.CLAVE+"','"+carpeta+"',"+
											"                      'pdf"+c+"','RUTA_"+valor.CLAVE+"','"+valor.TIPOADJ+"','N','ID','"+valor.CLAVE+"','"+valor.DOCUMENTO+"-DOCUMENTO',"+
											"                      '"+tabla+"','alta','"+elusuario+"_"+elciclo+"_"+valor.CLAVE+"');\"></i> ";

									
									$("#cuerpo"+padre).append("<tr id=\"rowAsp"+padre+c+"\"></tr>");
									$("#rowAsp"+padre+c).append("<td>"+valor.IDDOC+"</td>");
									$("#rowAsp"+padre+c).append("<td>"+valor.DOCUMENTO+"</td>");				
									
									cadEnc="<a title=\"Ver Archivo Adjunto\" target=\"_blank\" id=\"enlace_RUTA_"+valor.CLAVE+"\" href=\""+valor.RUTA+"\">"+
														" <img width=\"40px\" height=\"40px\" id=\"pdf"+c+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
														" </a>";	
														
								
										
									$("#rowAsp"+padre+c).append("<td style=\"text-align: center; vertical-align: middle;\">"+cadEnc+"</td>");					
										
									if (valor.VALIDADO=='S') {cadValor='N'; mensajebtn="Validado"; laclase="btn-danger"; } else {cadValor='S'; mensajebtn="Validar"; laclase="btn-primary";}									
									evento="ss_validaradjDin('"+valor.CLAVE+"','"+elciclo+"','"+elusuario+"','"+valor.OBSVALIDADO+"','"+valor.DOCUMENTO+"','"+padre+"','"+tabla+"');";
									$("#rowAsp"+padre+c).append( "<td><button id=\"btnVal"+valor.CLAVE+"\" type=\"button\" class=\"btn btn-white  "+laclase+" btn-round\" "+
																"onclick=\""+evento+"\"><strong>"+mensajebtn+"</strong></button></td>");	

									$("#rowAsp"+padre+c).append("<td>"+cadFile+"</td>");	
									
									if ((valor.RUTA=='')||(valor.RUTA==null)) { 				    
											$('#enlace_RUTA_'+valor.CLAVE).attr('disabled', 'disabled');
											$('#enlace_RUTA_'+valor.CLAVE).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
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
		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		   });					    
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	
}




function ss_validaradjDin(tipo,ciclo,matricula,obs, reporte, padre,tabla){
	 $("#confVal").empty();
	 mostrarConfirm("confVal", padre,  "Proceso de Cotejo",
	 "<span class=\"label label-success\">Observaciones "+reporte+"</span>"+
	 "     <textarea id=\"ss_obsValidado\" style=\"width:100%; height:100%; resize: none;\">"+obs+"</textarea>",
	 "¿Marcar como Validado? "+
	 "<SELECT id=\"ss_validado\"><OPTION value=\"S\">SI</OPTION><OPTION value=\"N\">NO</OPTION></SELECT>"
	 ,"Finalizar Proceso", "ss_btnValidarAdjDin('"+ciclo+"','"+matricula+"','"+tipo+"','"+reporte+"','"+padre+"','"+tabla+"');","modal-sm");
}


function ss_btnValidarAdjDin(ciclo,matricula,tipo, reporte,padre,tabla){

	   parametros={
		   tabla:tabla,
		   campollave:"AUX",
		   bd:"Mysql",
		   valorllave:matricula+"_"+ciclo+"_"+tipo,
		   VALIDADO: $("#ss_validado").val(),
		   OBSVALIDADO:$("#ss_obsValidado").val()
		};

	

	   $.ajax({
	   type: "POST",
	   url:"actualiza.php",
	   data: parametros,
	   success: function(data){
		
		   $('#dlgproceso').modal("hide"); 
		   status="<span style=\"color:red\"><b>NO VALIDADO</b></span>"; 
		   cadObs="<b>Favor de Revisar la siguiente Observación:<b><br>"+$("#ss_obsValidado").val();
		   if ($("#ss_validado").val()=='S') {status="<span style=\"color:green\"><b> VALIDADO</b></span>"; cadObs="";}

		   correoalAlum(matricula, "<html>"+reporte+" "+status+
								"</b></span>."+cadObs
								,"STATUS DE DOCUMENTOS "+matricula);
			//$("#"+padre).modal("hide");
			$("#confVal").modal("hide");
			laclase="btn-danger"; msjBtn="Validado"; if ($("#ss_validado").val()=='N') {msjBtn="Validar"; laclase="btn-primary";}
		    $("#btnVal"+tipo).html("<strong>"+msjBtn+"</strong>");
			$("#btnVal"+tipo).removeClass("btn-primary");
			$("#btnVal"+tipo).removeClass("btn-danger");
			$("#btnVal"+tipo).addClass(laclase);

			


	   		}					     
	   });    	
}
/*===================================================================================*/



/*=========================SOLO PARA EL MODULO DE RESIDENCIAS ===============================*/
function residencia_mostrarAdjuntos  (modulo,usuario,institucion, campus,essuper,miciclo){
	table = $("#G_"+modulo).DataTable();
	miciclo=table.rows('.selected').data()[0]["CICLO"];
	matricula=table.rows('.selected').data()[0]["MATRICULA"];
	if (table.rows('.selected').data().length>0) {
			script="<div class=\"modal fade\" id=\"adjuntos\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
		       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
			   "      <div class=\"modal-content\">"+
			   "          <div class=\"modal-header widget-header  widget-color-green\">"+
			   "             <span class=\"label label-lg label-primary arrowed arrowed-right\"> Documentos Adjuntados </span>"+
			   "             <span class=\"label label-lg label-success arrowed arrowed-right\">"+table.rows('.selected').data()[0]["NOMBRE"]+"</span>"+			   
			   "             <input type=\"hidden\" id=\"elid\" value=\""+table.rows('.selected').data()[0]["ID"]+"\"></input>"+
			   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
			   "                  <span aria-hidden=\"true\">&times;</span>"+
			   "             </button>"+
			   "          </div>"+  
			   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+					 
			   "             <div class=\"row\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\"> "+		
		       "                  <table id=\"tabAsp\" class= \"table table-condensed table-bordered table-hover\">"+
		   	   "                         <thead>  "+
			   "                               <tr>"+	
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
		 
		
	 		 
			 $("#adjuntos").remove();
		    if (! ( $("#adjuntos").length )) {
		        $("#grid_"+modulo).append(script);
		    }

		    $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		    
		    $('#adjuntos').modal({show:true, backdrop: 'static'});

			sqlAsp="SELECT 'CARTA DE PRESENTACIÓN' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_CARTAPRES'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'CARTA DE ACEPTACIÓN' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_CARTAACEP'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'CARDEX ACADÉMICO' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_CARDEX'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'LIBERACIÓN DE SERVICIO SOCIAL' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_LIBSER'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'CARTA VIGENCIA IMSS' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_IMSS'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'SOLICITUD DE ANTEPROYECTO' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_SOLANTEP'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'ANTEPROYECTO' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_ANTEP'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'PRIMERA EVALUACIÓN' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_EVAL1'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'SEGUNDA EVALUACIÓN' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_EVAL2'),'') AS RUTA FROM DUAL  "+
					"UNION "+
					"SELECT 'EVALUACIÓN FINAL' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_EVALF'),'') AS RUTA FROM DUAL  "+					
					"UNION "+
					"SELECT 'REPORTE TÉCNICO' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_REPTEC'),'') AS RUTA FROM DUAL "+
					"UNION "+
					"SELECT 'CARTA DE LIBERACIÓN' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_LIB'),'') AS RUTA FROM DUAL  "+					
					"UNION "+
					"SELECT 'CARTA DE ANUENCIA' AS REPORTE,IFNULL((select RUTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_ANUE'),'') AS RUTA FROM DUAL  ";					


			parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
		    $.ajax({
				   type: "POST",
				   data:parametros,
		           url:  "../base/getdatossqlSeg.php",
		           success: function(data){  
		        	      losdatos=JSON.parse(data);  
						  ladefault="..\\..\\imagenes\\menu\\pdf.png";
						  $("#cuerpoAsp").empty();
						  $("#tabAsp").append("<tbody id=\"cuerpoAsp\">");
						  c=0;	
						  globalUni=1; 
						  grid_data=JSON.parse(data);	  
						  jQuery.each(grid_data, function(clave, valor) { 	
							 
								$("#cuerpoAsp").append("<tr id=\"rowAsp"+c+"\"></tr>");								
								$("#rowAsp"+c).append("<td>"+valor.REPORTE+"</td>");	
							   
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
													  
		        	        		        	    
		                 },
		           error: function(data) {	                  
		                      alert('ERROR: '+data);
		                  }
		   });		
	}
	else {
		alert ("Debe seleccionar un Registro");
		return 0;

		}
	
}
/*===================================COMITE ACADEMICOS ===========================================*/
function addStatusComite(idsol,elestatus,usuario,INSTITUCION,CAMPUS) {
	var f = new Date();
	fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
	parametros={
		 tabla:"co_status",						    		    	      
		 bd:"Mysql",
		 IDSOL:idsol,
		 FECHA:fechacap,
		 SITUACION:elestatus,
		 USUARIO:usuario,
		 FECHAUS:fechacap,
		 _INSTITUCION:INSTITUCION,
		 _CAMPUS: CAMPUS};
 
		$.ajax({
					 type: "POST",
					 url:"../base/inserta.php",
					 data: parametros,
					 success: function(data){
							                              	                                        					          
						 }					     
			   });            
}

/*===========================CITAS ========================================*/

function ventanaConf(contenedor,eluser,lainst,elcam,valorMarcar,tipo) {
	cad="";
	dias=["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
	for (i=0; i<7; i++) {
      cad+=
	 	   "           <div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
	       "                 <label><input id=\"d"+i+"\" type=\"checkbox\" class=\"ace ace-switch ace-switch-6\"/><span class=\"lbl\">"+dias[i]+"</span></label> "+
	       "           </div> ";
	}
	mostrarConfirm2("verCitas",contenedor,"Apertura de Citas",
		"<div class=\"row fontRoboto\" style=\"text-align:justify; height:200px; overflow-y: scroll; \">"+
		"     <div class=\"col-sm-8\">"+
		"        <div class=\"row\">"+
		"             <div class=\"col-sm-12\">"+
		"                 <label class=\"fontRobotoB\">Tipo de Trámite</label><select class=\"form-control captProy\"  id=\"tramite\"></select>"+
		"             </div>"+
		"        </div>"+
		"        <div class=\"row\">"+
		"             <div class=\"col-sm-6\">"+
		"                  <label  class=\"fontRobotoB\">Fecha de Inicio</label>"+
		"                  <div class=\"input-group\"><input  class=\"form-control  captProy date-picker\" id=\"fini\" "+
		"                  type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
		"                  <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
		"             </div>"+
		"             <div class=\"col-sm-6\">"+
		"                  <label  class=\"fontRobotoB\">Fecha Termina</label>"+
		"                  <div class=\"input-group\"><input  class=\"form-control  captProy date-picker\" id=\"ffin\" "+
		"                   type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
		"                  <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
		"             </div>"+
		"        </div>"+
		"        <div class=\"row\">"+
		"             <div class=\"col-sm-4\">"+
		"                  <label  class=\"fontRobotoB\">Hora de Inicio</label>"+
		"                  <input  id=\"hini\" autocomplete=\"off\" class= \" small form-control input-mask-hora\" </input>"+
		"             </div>"+
		"             <div class=\"col-sm-4\">"+
		"                  <label  class=\"fontRobotoB\">Hora Termina</label>"+
		"                  <input id=\"hfin\"  autocomplete=\"off\" class= \" small form-control input-mask-hora\" </input>"+
		"             </div>"+
		"             <div class=\"col-sm-4\">"+
		"                  <label  class=\"fontRobotoB\">Minutos Cita</label>"+
		"                  <input id=\"min\"  autocomplete=\"off\" class= \" small form-control\" </input>"+
		"             </div>"+
		"        </div>"+
		"     </div>"+
		"     <div class=\"col-sm-4\">"+cad+"</div>"+
		"</div>","Generar Citas","ci_generarCitas('"+eluser+"','"+lainst+"','"+elcam+"','"+tipo+"');","modal-lg");

		actualizaSelectMarcar("tramite", "SELECT ID, TRAMITE FROM ci_tramites order by TRAMITE", "","",valorMarcar); 
		$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		$(".input-mask-hora").mask("99:99");
			
      return false;
}

function ci_generarCitas(eluser,lainst,elcam,tipo){
	
	var vfini=$("#fini").val();
	var vffin=$("#ffin").val();
	var vhini=$("#hini").val();
	var vhfin=$("#hfin").val();
	var vtram=$("#tramite").val();
	var vmin=$("#min").val();
	var desde = moment(fechaJava(vfini));
	var hasta = moment(fechaJava(vffin));
	
	if (vtram<=0) {alert ("Se debe elegir el tipo de tramite"); return 0;}
	if (vfini=="") {alert ("Se debe capturar fecha de inicio"); return 0;}
	if (vffin=="") {alert ("Se debe capturar fecha de termino o final"); return 0;}
	cad=validarHora(vhini);if (cad.length>0) {alert ("Error en Hora de inicio: "+cad); return 0;}
	cad=validarHora(vhfin);if (cad.length>0) {alert ("Error en Hora de Termino: "+cad); return 0;}
	if (vhini=="") {alert ("Se debe capturar Hora de inicio"); return 0;}
	if (vhfin=="") {alert ("Se debe capturar Hora de termino o final "); return 0;}
	if (desde>hasta) { alert ("La fecha de Inicio debe ser menor a la fecha Final"); return 0;}

	//creamos arreglo de los check 
	c=0;
	var misdias=[];
	for (i=0; i<7; i++) {if ($("#d"+i).prop('checked')) { misdias[c]=i; c++;}}

	ci_diasEntreFechas(desde, hasta, dameMinutos(vhini),dameMinutos(vhfin),vmin, misdias,vtram,eluser,lainst,elcam,tipo);
}

function ci_diasEntreFechas (desde, hasta, minini, minfin,minutos, misdias,vtram,eluser,lainst,elcam,tipo) {
    var losdatosGuardar=[];
	var dia_actual = desde;
	fechaus=dameFecha("FECHAHORA");
	elday = new Date();
	mitag=pad(elday.getDate(),2,'0')+pad(elday.getMonth()+1,2,'0')+elday.getFullYear()+elday.getHours()+elday.getMinutes()+elday.getSeconds();
	c=0;
	while (dia_actual.isSameOrBefore(hasta)) {
		  d = new Date(dia_actual);
		  var day = d.getDay();
		  mifecha= pad(d.getDate(),2,'0')+"/"+pad(d.getMonth()+1,2,'0')+"/"+d.getFullYear();
	
		  if (misdias.includes(day)) {
			  llevo=minini;
			  while (llevo<minfin) {			 
				 lahora=convierteHHHMM(llevo);
				 losdatosGuardar[c]=vtram+"||"+mifecha+"|"+lahora+"|"+llevo+"|"+minutos+"|N||"+mitag+"|"+eluser+"|"+fechaus+"|"+lainst+"|"+elcam;
				 llevo+=parseInt(minutos);
				 c++;		
			  }
		  }
		  dia_actual.add(1, 'days');
	}	

	var loscampos = ["TRAMITE","SOLICITANTE","FECHA","HORA","HORA2","MINUTOS","ATENDIDO","OBS","TAG","USUARIO","FECHAUS","_INSTITUCION","_CAMPUS"];
	parametros={
			tabla:"ci_citas",
			campollave:"TAG",
			bd:"Mysql",
			valorllave:mitag,
			eliminar: "S",
			separador:"|",
			campos: JSON.stringify(loscampos),
			datos: JSON.stringify(losdatosGuardar)
	};
	$.ajax({
		type: "POST",
		url:"../base/grabadetalle.php",
		data: parametros,
		success: function(data){
			$("#verCitas").modal("hide");	
			if (tipo==1) {window.parent.document.getElementById('FRci_citas').contentWindow.location.reload();  }
			if (tipo==2) {cargamosCitas(); }                         					          
		}					     
	});  
    
}


/*==================HISTORIAL DE TRAMITES ===========================================*/
function insertaHistorial(idtram,area,tipo,titulo,visible,usuario,institucion,campus){
	lafecha=dameFecha("FECHA");
	lahora=dameFecha("HORA",3);
	parametros={tabla:"historialtram",
	bd:"Mysql",
	_INSTITUCION:institucion,
	_CAMPUS:campus,
	IDTRAM:idtram,
	AREA:area,
	TIPO:tipo,
	TITULO:titulo,							
	VISIBLE:visible,
	FECHA:lafecha,
	HORA:lahora,
	USUARIO:usuario};     
	$.ajax({
	type: "POST",
	url:"../base/inserta.php",
	data: parametros,
	success: function(data){ 

	}
	});
}


function eliminaHistorial(idtram,area,tipo,){
		parametros={
			tabla:"historialtram",
			campollave:"CONCAT(AREA,TIPO,IDTRAM)",
			bd:"Mysql",
			valorllave:area+tipo+idtram
		};
		$.ajax({
			type: "POST",
			url:"../base/eliminar.php",
			data: parametros,
			success: function(data){
			
			}					     
		});    	    

}


/*=========================SOLO PARA EL MODULO DE SERVICIO SOCIAL ===============================*/
function ss_mostrarAdjuntos  (modulo,usuario,institucion, campus,essuper,miciclo,matricula){

	
	script="<div class=\"modal fade\" id=\"adjuntos\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
	   "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header widget-header  widget-color-green\">"+
	   "             <span class=\"label label-lg label-primary arrowed arrowed-right\"> Documentos Adjuntados </span>"+
	   "             <span class=\"label label-lg label-success arrowed arrowed-right\">"+table.rows('.selected').data()[0]["NOMBRE"]+"</span>"+			   
	   "             <input type=\"hidden\" id=\"elid\" value=\""+table.rows('.selected').data()[0]["ID"]+"\"></input>"+
	   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "          </div>"+  
	   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+					 
	   "             <div class=\"row\" style=\"overflow-x: auto; overflow-y: auto; height:300px;\"> "+		
	   "                  <table id=\"tabAsp\" class= \"table table-condensed table-bordered table-hover\">"+
		  "                         <thead>  "+
	   "                               <tr>"+	
	   "                                   <th>Documento</th> "+
	   "                             	   <th>PDF</th> "+ 
	   "                             	   <th>VALIDAR</th> "+ 
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
 

	  
	 $("#adjuntos").remove();
	if (! ( $("#adjuntos").length )) {
		$("#grid_"+modulo).append(script);
	}

	$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
	
	$('#adjuntos').modal({show:true, backdrop: 'static'});

	sqlAsp=
			"SELECT 'SSCARTAPRES' AS TIPO, 'CARTA PRESENTACIÓN SELLADA' as REPORTE FROM DUAL  "+
			"UNION "+
			"SELECT 'SSCARTAACEP' AS TIPO, 'CARTA ACEPTACIÓN SELLADA' as REPORTE FROM DUAL  "+
			"UNION "+
			"SELECT 'SSSOLSS' AS TIPO, 'SOLICITUD FIRMADA' as REPORTE FROM DUAL  "+
			"UNION "+
			"SELECT 'SSCARTACOM' AS TIPO, 'CARTA COMPROMISO' AS REPORTE FROM DUAL  "+
			"UNION "+
			"SELECT 'SSPLAN' AS TIPO, 'PLAN DE TRABAJO' AS REPORTE FROM DUAL  "+
			"UNION "+
			"SELECT 'SSBIM1' AS TIPO, 'REPORTE BIMESTRE 1' AS REPORTE FROM DUAL  "+
			"UNION "+
			"SELECT 'SSBIM2' AS TIPO, 'REPORTE BIMESTRE 2' AS REPORTE FROM DUAL  "+
			"UNION "+
			"SELECT 'SSBIM3' AS TIPO, 'REPORTE FINAL' AS REPORTE FROM DUAL  "+
			"UNION "+
			"SELECT 'SSFINAL' AS TIPO, 'DOCUMENTOS FINALES' AS REPORTE FROM DUAL  ";										


	parametros={sql:sqlAsp,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		   type: "POST",
		   data:parametros,
		   url:  "../base/getdatossqlSeg.php",
		   success: function(data){  
				  losdatos=JSON.parse(data);  
				  ladefault="..\\..\\imagenes\\menu\\pdf.png";
				  $("#cuerpoAsp").empty();
				  $("#tabAsp").append("<tbody id=\"cuerpoAsp\">");
				  c=0;	
				  globalUni=1; 
				  grid_data=JSON.parse(data);	  
				  jQuery.each(grid_data, function(clave, valor) { 	

					sqlad="select IFNULL(RUTA,'') AS RUTA, IFNULL(VALIDADO,'N') AS VALIDADO, IFNULL(OBSVALIDADO,'') AS OBSVALIDADO, count(*) as ESTA from eadjresidencia where  AUX='"+matricula+"_"+miciclo+"_"+valor.TIPO+"'";
					parametros={sql:sqlad,dato:sessionStorage.co,bd:"Mysql"}
					   $.ajax({
						type: "POST",
						data:parametros,
						url:  "../base/getdatossqlSeg.php",
						success: function(dataAdj){  
							jQuery.each(JSON.parse(dataAdj), function(clave, valorAdj) {
									$("#cuerpoAsp").append("<tr id=\"rowAsp"+c+"\"></tr>");								
									$("#rowAsp"+c).append("<td>"+valor.REPORTE+"</td>");
									grid_data=JSON.parse(data);

									cadEnc="<a title=\"Ver Archivo Adjunto\" target=\"_blank\" id=\"enlace_"+c+"\" href=\""+valorAdj.RUTA+"\">"+
												" <img width=\"40px\" height=\"40px\" id=\"pdf"+c+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
												" </a>";	
									$("#rowAsp"+c).append("<td style=\"text-align: center; vertical-align: middle;\">"+cadEnc+"</td>");
							
									if (valorAdj.VALIDADO=='S') {cadValor='N'; mensajebtn="No Validar"; } else {cadValor='S'; mensajebtn="Validar";}

									evento="ss_validaradj('"+valor.TIPO+"','"+miciclo+"','"+matricula+"','"+cadValor+"','"+valorAdj.OBSVALIDADO+"','"+valor.REPORTE+"');";
									$("#rowAsp"+c).append( "<td><button type=\"button\" class=\"btn btn-white  btn-primary btn-round\" "+
														"onclick=\""+evento+"\"><strong>"+mensajebtn+"</strong></button><td>");		
										
									if ((valorAdj.RUTA=='')||(valorAdj.RUTA==null)) { 				    
											$('#enlace_'+c).attr('disabled', 'disabled');
											$('#enlace_'+c).attr('href', '..\\..\\imagenes\\menu\\pdfno.png');
											$('#pdf'+c).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");
									}
										
									c++;
									globalUni=c;
								});
						
						}
					});

							  
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
											  
											
				 },
		   error: function(data) {	                  
					  alert('ERROR: '+data);
				  }
   });		

}



function ss_validaradj(tipo,ciclo,matricula,valor,obs, reporte){
$("#confVal").empty();
mostrarConfirm("confVal", "adjuntos",  "Proceso de Cotejo",
"<span class=\"label label-success\">Observaciones "+reporte+"</span>"+
"     <textarea id=\"ss_obsValidado\" style=\"width:100%; height:100%; resize: none;\">"+obs+"</textarea>",
"¿Marcar como Validado? "+
"<SELECT id=\"ss_validado\"><OPTION value=\"S\">SI</OPTION><OPTION value=\"N\">NO</OPTION></SELECT>"
,"Finalizar Proceso", "ss_btnValidarAdj('"+ciclo+"','"+matricula+"','"+valor+"','"+tipo+"','"+reporte+"');","modal-sm");
}


function ss_btnValidarAdj(ciclo,matricula,valor,tipo, reporte){

parametros={
   tabla:"eadjresidencia",
   campollave:"AUX",
   bd:"Mysql",
   valorllave:matricula+"_"+ciclo+"_"+tipo,
   VALIDADO: valor,
   OBSVALIDADO:$("#ss_obsValidado").val()
};

$.ajax({
type: "POST",
url:"actualiza.php",
data: parametros,
success: function(data){
   $('#dlgproceso').modal("hide"); 
   status="<span style=\"color:red\"><b>NO VALIDADO</b></span>"; 
   cadObs="<b>Favor de Revisar la siguiente Observación:<b><br>"+$("#obsCotejado").val();
   if ($("#ss_validado").val()=='S') {status="<span style=\"color:green\"><b> VALIDADO</b></span>"; cadObs="";}

   correoalAlum(matricula, "<html>Servicio Social: "+reporte+" "+status+
						"</b></span>."+cadObs
						,"STATUS DE SOLICITUD SERVICIO SOCIAL "+matricula);
	$("#adjuntos").modal("hide");
	$("#confVal").modal("hide");
	
	
	//ss_mostrarAdjuntos("vss_alumnos","","","","",ciclo,matricula);

	   }					     
});    	
}


function previewAdjunto(enlace) {
	//quitamos los ../ que tenga ya que se debe encontrar en raiz 
	var re = /\.\.\//gi;
	var str = enlace;
	var newstr = str.replace(re, "");
	abrirPesta(newstr, "Adjunto");
}


function addbtninfo(contenedor,titulo,tipo,valor,txt) {
	$("#"+contenedor).append("<span title=\""+titulo+"\" class=\"btn btn-app btn-sm "+tipo+" no-hover\">"+
	"   <span class=\"line-height-1 bigger-170\">"+valor+"</span>"+
	"   <br /> "+
	"   <span class=\"line-height-1 smaller-60\">"+txt+"</span>"+
	"</span>");
}

/*=================UTILERIAS PARA ELEMENTOS DE FORMULARIOS PERSONALIZADOS ====================*/

function addElementPes(tipo,contenedor,tabla,campok,valork,nombre,etiqueta,tiposel,sql,tipoSelect,misdatos){
	if (tipo=='INPUT') {
		$("#"+contenedor).append(
			"<label class=\"fontRobotoB\">"+etiqueta+"</label>"+
			"<input class=\"form-control\" value=\""+misdatos[0][nombre]+"\" onchange=\"grabaDatoPes('"+tipo+"','"+tabla+"','"+campok+"','"+valork+"','"+nombre+"');\"  id=\""+nombre+"\"></input>");
	}


	if (tipo=='INPUTMON') {
		$("#"+contenedor).append(
			"<label class=\"fontRobotoB\">"+etiqueta+"</label>"+
			"<div class=\"input-group\"><span class=\"input-group-addon\">"+
			"<i class=\"ace-icon fa fa-dollar\"></i></span>"+
			"<input class=\"form-control input-mask-moneda\" onchange=\"grabaDatoPes('"+tipo+"','"+tabla+"','"+campok+"','"+valork+"','"+nombre+"');\" value=\""+misdatos[0][nombre]+"\" type=\"text\" id=\""+nombre+"\" />"+
			"</div>");
			$('.input-mask-moneda').mask('9999999999');
	}

	


	if (tipo=='SELECT') {
		$("#"+contenedor).append("<div id=\""+contenedor+nombre+"\"><label class=\"fontRobotoB\">"+etiqueta+"</label></div>");
		addSELECTPes(nombre,contenedor,tiposel,sql,tipoSelect,tipo,tabla, campok, valork, misdatos);
	}

	if (tipo=='SELECTMULT') {
		$("#"+contenedor).append("<div id=\""+contenedor+nombre+"\"><label class=\"fontRobotoB\">"+etiqueta+"</label></div>");
		addSELECTMULT_CONVALORPes(nombre,contenedor+nombre,"PROPIO",sql,"BUSQUEDA",tipo,tabla,campok,valork,misdatos[0][nombre]);
		//addSELECTMULT_CONVALOR("DISCAPACIDAD2","i4","CICLOS",elsql,"","BUSQUEDA","");
	}
	

	

	if (tipo=='SELECTNUM') {
		$("#"+contenedor).append("<div id=\""+contenedor+nombre+"\"><label class=\"fontRobotoB\">"+etiqueta+"</label></div>");
		addSELECTNUMPes(nombre,contenedor,tiposel,sql,tipoSelect,tipo,tabla, campok, valork, misdatos);
	}

	if (tipo=='SINO') {
		$("#"+contenedor).append("<div class=\"checkbox\" style=\"padding:0px; margin: 0px;\">"+
		"<label> "+
		   "<input id=\""+nombre+"\" onclick=\"grabaDatoPes('"+tipo+"','"+tabla+"','"+campok+"','"+valork+"','"+nombre+"');\" type=\"checkbox\" "+
		   "class=\"selMateria ace ace-switch ace-switch-6\" />"+
		   "<span class=\"fontRobotoB lbl\">"+etiqueta+"</span>"+
		 "</label> "+
		 "</div> ");
		 if (misdatos[0][nombre]=='S') {$("#"+nombre).prop("checked",true);}	
	}
	

}

function grabaDatoPes(tipo,tabla,campok,valork,nombre){
	elvalor=$("#"+nombre).val();
	if (tipo=="SINO") {elvalor="N"; if ($("#"+nombre).prop("checked")) {elvalor="S";} }
	if (tipo=="SELECTMULT") { if ($("#"+nombre).val()!=null) {elvalor=$("#"+nombre).val().toString();}}

    parametros={
		tabla:tabla,
		campollave:campok,
		valorllave:valork,
		nombreCampo:nombre,
		valorCampo:elvalor,
		bd:"Mysql"};


	$('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
	   $.ajax({
		        type: "POST",
		        url:"../base/actualizaDin.php",
		    	data: parametros,
		    	success: function(data){
					console.log(data);		    				       					           
		           }					     
		      }); 
}




function addSELECTPes(nombre,contenedor,tipoSel, sql, tipoSelect,tipo,tabla,campok,valork,misdatos) {

	$("#"+contenedor+nombre).append("<img id=\"laespera1\" src=\"../../imagenes/menu/esperar.gif\" style=\"width:50px;height:50px;\">");

	elsql=getSQLTipo(tipoSel,'');
	if (tipoSel=='PROPIO') {elsql=sql;}

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){

       	       losdatos=JSON.parse(data);   
       	       eltipo="";
			   mult=""; if (tipoSelect=='MULTIPLE') {eltipo=""; mult="multiple=\"multiple\"";}
       	       if (tipoSelect=='BUSQUEDA') {eltipo="chosen-select";}

			   evento=" onchange=\"grabaDatoPes('"+tipo+"','"+tabla+"','"+campok+"','"+valork+"','"+nombre+"');\"";

       	       $("#"+contenedor+nombre).append("<select "+mult+evento+" class=\" "+eltipo+" form-control text-success\"  id=\""+nombre+"\"> </select>");
       	       $("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
               jQuery.each(JSON.parse(data), function(clave, valor) { 
						sele=""; if (misdatos[0][nombre]==losdatos[clave][0]) {sele="selected";}	
	  				     $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\" "+sele+" >"+utf8Decode(losdatos[clave][1])+"</option>");			  				     			  		
	  				   	  }); 
               if (tipoSelect=='BUSQUEDA') {               
		         	   $('.chosen-select').chosen({allow_single_deselect:true}); 			
			     	   $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
			     	   $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
			  		   $("#"+nombre).trigger("chosen:updated");		}				
							 
				$("#laespera1").remove();                   	   
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}


function addSELECTNUMPes(nombre,contenedor,tipoSel, sql, tipoSelect,tipo,tabla,campok,valork,misdatos) {
	
	$("#"+contenedor+nombre).append("<img id=\"laespera1\" src=\"../../imagenes/menu/esperar.gif\" style=\"width:50px;height:50px;\">");
	ini=sql.split(":")[0];
	fin=sql.split(":")[1];

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}   	     
	evento=" onchange=\"grabaDatoPes('"+tipo+"','"+tabla+"','"+campok+"','"+valork+"','"+nombre+"');\"";
	$("#"+contenedor+nombre).append("<select  "+evento+" class=\"form-control text-success\"  id=\""+nombre+"\"> </select>");
	$("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
	for (x=ini;x<=fin;x++) {
		sele=""; if (misdatos[0][nombre]==x) {sele="selected";}
		$("#"+nombre).append("<option value=\""+x+"\" "+sele+" >"+x+"</option>");			  				     			  		
	}
	$("#laespera1").remove(); 
    
}
            



function addSELECTMULT_CONVALORPes(nombre,contenedor,tipo, sql, tipoSelect, tipo,tabla,campok,valork,valorDato) {

	if (tipo=='PROPIO') {elsql=sql;}

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){
       	       losdatos=JSON.parse(data);   
       	       eltipo="";
				evento=" onchange=\"grabaDatoPes('"+tipo+"','"+tabla+"','"+campok+"','"+valork+"','"+nombre+"');\"";
       	       if (tipoSelect=='BUSQUEDA') {eltipo="chosen-select";}
       	       $("#"+contenedor).append("<select "+evento+" multiple=\"\" class=\" "+eltipo+" form-control text-success\"  id=\""+nombre+"\"> </select>");
				$("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
			   estasel="";
               jQuery.each(JSON.parse(data), function(clave, valor) {
						 estasel="";
					     if (valorDato!=null) {if (valorDato.indexOf(losdatos[clave][0])>=0) {estasel="selected=\"true\"";} } 						
	  				     $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\""+ estasel +">"+utf8Decode(losdatos[clave][1])+"</option>");			  				     			  									   						
						}); 
	
               if (tipoSelect=='BUSQUEDA') {               
		         	   $('.chosen-select').chosen({allow_single_deselect:true}); 			
			     	   $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
			     	   $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    
			  		   $("#"+nombre).trigger("chosen:updated");		}
			   	  	              	   
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}
