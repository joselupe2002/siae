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

function ocultarEspera (nombre){
	$('#'+nombre).modal("hide");  
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

function generaTablaBus(modulo,contenedor, sql, titulos) {
	
	$("#"+contenedor).empty();
	$('.tableTools-container').empty();
	
	$("#"+contenedor).append("<table id=\"G_"+contenedor+"\" class=\"display table-condensed table-striped table-sm table-bordered table-hover nowrap \" style=\"width:100%; font-size:11px;\">"); 
     
	addSELECTJSONGRID("id_campo",contenedor,titulos);
	
	mostrarEspera("esperaDatos","grid_"+modulo,"Cargando la información solicitada");
	
	$.ajax({
        type: "GET",
        url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(sql),
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
function generaTabla(nombreTabla,contenedor, sql, titulos, campos) {
	$.ajax({
        type: "GET",
        url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(sql),
        success: function(data){
       	       losdatos=JSON.parse(data);
       	       c=0;
               $("#cuerpo"+nombreTabla).empty();
               
               cadTit="";
               jQuery.each(titulos, function(clave,valor) { 
            	   
            	   cadTit+="<th style=\""+valor.estilo+"\">"+valor.titulo+"</th>";
               });
             
               $("#"+nombreTabla).append("<thead><tr id=\"titulo\">"+cadTit+"</tr>"); 
               $("#"+nombreTabla).append("<tbody id=\"cuerpo"+nombreTabla+"\">");

               jQuery.each(losdatos, function(clave, valor) { 	             	    
         	         $("#cuerpo"+nombreTabla).append("<tr id=\"row"+c+"\">");   
         	         jQuery.each(campos, function(claveC,valorC) {
         	        	dato=losdatos[clave][valorC.campo]; 
         	        	$("#row"+c).append("<td style=\""+valorC.estilo+"\">"+valorC.antes+dato+valorC.despues+"</td>");   
         	        	
         	         });         	                 	              	   
         	         $("#row"+c).append("</tr>");
         	         c++;
                });                   	    
              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
       });
}


/*================================================GENERAR SELECT EN UN CONTENEDOR CON DATOS=================================================*/

function getSQLTipo(tipo,otrascondiciones){
	elsql="";
	if (tipo=='PROPIO') {elsql=sql;}
	if (tipo=='CICLOS') {elsql="SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) from ciclosesc where 1=1 "+otrascondiciones+ " order by CICL_CLAVE DESC";}
	if (tipo=='MATERIAS') {elsql="SELECT MATE_CLAVE, CONCAT(MATE_CLAVE,' ',MATE_DESCRIP) from cmaterias where 1=1 "+otrascondiciones+ " order by MATE_DESCRIP";}
	return elsql;
}

function addSELECT(nombre,contenedor,tipo, sql, otrascondiciones, tipoSelect) {

	elsql=getSQLTipo(tipo,otrascondiciones);
	if (tipo=='PROPIO') {elsql=sql;}

	$.ajax({
        type: "GET",
        url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
        success: function(data){
       	       losdatos=JSON.parse(data);   
       	       eltipo="";
       	       if (tipoSelect=='BUSQUEDA') {eltipo="chosen-select";}
       	       $("#"+contenedor).append("<select class=\" "+eltipo+" form-control text-success\"  id=\""+nombre+"\"> </select>");
       	    $("#"+nombre).append("<option value=\"0\">"+"Seleccione una opci&oacute;n"+"</option>");
               jQuery.each(JSON.parse(data), function(clave, valor) { 	
	  				     $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\">"+losdatos[clave][0]+"-"+utf8Decode(losdatos[clave][1])+"</option>");			  				     			  		
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


/*==================================================ACTUALIZA LOS DATOS DE UN SELECT =============================================*/

function actualizaSelect(nombre,sql,tipoSelect){
	 $('#dlgproceso').modal({show:true, backdrop: 'static'});
	 $("#"+nombre).empty();
	 $("#"+nombre).append("<option value=\"0\">Elija Unidad</option>");
	 $.ajax({
        type: "GET",
        url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(sql),
        success: function(data){  
        	losdatos=JSON.parse(data);
       	 jQuery.each(JSON.parse(data), function(clave, valor) { 	
       		 $("#"+nombre).append("<option value=\""+losdatos[clave][0]+"\">"+losdatos[clave][0]+"-"+utf8Decode(losdatos[clave][1])+"</option>");       	     
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




function aceptarEdicionCelda(celda){
	 $("#"+celda).html($("#INP_"+celda).val());   
}

function editarCeldaTabla(celda, tipo){           
    loquetiene=$("#"+celda).html();  
    if (!($("#INP_"+celda).length > 0)) {
    	  if (tipo=="INPUT") {
                     $("#"+celda).html("<div class=\"input-group editandotabla\">"+
                             "<input id=\"INP_"+celda+"\" class=\"form-control\" value=\""+loquetiene+"\"></input>"+
                             "<span class=\"input-group-addon\" onclick=\"aceptarEdicionCelda('"+celda+"');\"><i class=\"ace-icon green fa fa-check\"></i></span>"+
                      "</div>");                       
    	  }
    	  if (tipo=="FECHA") {
    		  $("#"+celda).html("<div class=\"input-group\">"+
    				            "     <input class=\"form-control editandotabla date-picker\" id=\"INP_"+celda+"\""+
	                            "            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
	                            "     <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span>"+
	                            "     <span class=\"input-group-addon\" onclick=\"aceptarEdicionCelda('"+celda+"');\"><i class=\"ace-icon green fa fa-check\"></i></span>"+
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

function damesqldep(elsql) {
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
				elsql=elsql.replace ("{"+lista[i]+"}","'"+$("#"+lista[i]).val()+"'");
			}
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


function getElementoEd(padre,nombre,tipo,etiqueta,sql,dato,esllave,ico,autoinc,funcion,bd, ancho)
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
				 $.ajax({
		             type: "GET",
		             url: "damedato.php?sql="+encodeURI(sqlauto)+"&numcol=0&bd="+bd, 
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
				 $.ajax({
		             type: "GET",
		             url: "dameselect.php?sql="+encodeURI(param[1])+"&sel="+dato+"&bd="+param[0], 
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
			 $.ajax({
	             type: "GET",
	             url: "dameselect.php?sql="+encodeURI(param[1])+"&sel="+dato+"&bd="+param[0], 
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
			 $.ajax({
	             type: "GET",
	             url: "dameselect.php?sql="+encodeURI(param[1])+"&sel="+dato+"&bd="+param[0], 
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
		$.ajax({
             type: "GET",
             url: "damedato.php?sql="+encodeURI(param[1])+"&numcol=1&bd="+param[0], 
             success: function(data){            
            	 desc=data;            		
         		 cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
         		     "<div class=\"input-group\">"+dameGif(nombre,ico)+
         	         "<select onchange=\"cambioSelect('"+nombre+"')\""+estilo+" class=\"form-control\" name=\""+nombre+"\"  id=\""+nombre+"\" data-placeholder=\"Elija una Opci&oacute;n-->\">\n"+
         	         "<OPTION value=\""+dato+"\" selected>"+desc+"</OPTION>\n";
         		 cad+="</SELECT></div>";
         		 
         		$("#"+padre).append(cad);    
         		elsql=damesqldep(sql);                 
         		agregarEspera("imggif_"+nombre,ico);
 			   
         		param2=buscarBD(bd,elsql);
 				 $.ajax({
                      type: "GET",
                      url: 'dameselect.php?sql='+encodeURI(param2[1])+"&sel=0&bd="+param2[0], 
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
		$.ajax({
             type: "GET",
             url: "damedato.php?sql="+encodeURI(param[1])+"&numcol=1&bd="+param[0], 
             success: function(data){             	 
            	 desc=data;            		
         		 cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label> "+
         		     "<div class=\"input-group\">"+dameGif(nombre,ico)+
         	         "<select onchange=\"cambioSelect('"+nombre+"')\""+estilo+" class=\"chosen-select form-control\" name=\""+nombre+"\"  id=\""+nombre+"\" data-placeholder=\"Elija una Opci&oacute;n-->\">\n"+
         	         "<OPTION value=\""+dato+"\" selected>"+desc+"</OPTION>\n";
         		 cad+="</SELECT></div>";
         		 
         		$("#"+padre).append(cad);  		
         		elsql=damesqldep(sql);
                 
         		agregarEspera("imggif_"+nombre,ico);
 			   
         		param2=buscarBD(bd,elsql);
      
 				 $.ajax({
                      type: "GET",
                      url: 'dameselect.php?sql='+encodeURI(param2[1])+"&sel=0&bd="+param2[0], 
                      success: function(data){     						  
                           $("#"+nombre).html(data);                                 
                           quitarEspera("imggif_"+nombre,ico);                           
                           $("#"+nombre).val(dato);  
                           $('#'+nombre).trigger("chosen:updated");
                           $('.chosen-select').chosen({allow_single_deselect:true}); 			
                   		   $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
                   		   $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width':"100%"});})});
                   		   
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

		if ((dato==null)||(dato=="")) {dato="../../imagenes/menu/default.png";}
	
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		     "  <div class=\"row align-items-end\"> "+
		     "      <div class=\"col-sm-2\">"+
		     "           <img id=\"img_"+nombre+"\" name=\"img_"+nombre+"\" src=\""+dato+"\" width=\"50px\" height=\"50px\">"+
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

		if ((dato==null)||(dato=="")) {dato="../../imagenes/menu/default.png";}
	
		cad="<label class=\"et\" for=\""+nombre+"\">"+etiqueta+"</label><br/> "+
		     "  <div class=\"row align-items-end\"> "+
		     "      <div class=\"col-sm-2\">"+
		     "           <a target=\"_blank\" id=\"enlace_"+nombre+"\" href=\""+dato+"\">"+
		     "                <img id=\"img_"+nombre+"\" name=\"img_"+nombre+"\" src=\"..\\..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
		     "           </a>"+
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

	
}









