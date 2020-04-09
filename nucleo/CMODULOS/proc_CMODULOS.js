var globlal=1;
var lostipos="";
var c=0;
var elemento="";
var elemento2="";

function dameElemento(tipo,id,valor,evento, ancho){
	cad="";
    if (tipo=='INPUT_BTN') {
	     cad="<div class=\"input-group\" style=\"width:"+ancho+"px;\" >"+		        
		         "<input onfocus=\"entre('"+id+"')\" class=\"form-control\" style=\"width:210px;\" type=\"text\" value=\""+valor+"\" id=\""+id+"\" />"+
	             "<span  title=\"Mostrar ejemplos para el campo\"  onclick=\""+evento+"('"+id+"');\" style=\"cursor:pointer;\"class=\"input-group-addon\">"+
	                     "<i class=\"ace-icon blue  fa fa-search-plus\"></i></span>"+
              "</div> ";}
    
    if (tipo=='TEXTAERA_BTN') {
	     cad="<div class=\"input-group\" style=\"width:"+ancho+"px;\" >"+		        
		         "<textarea  onfocus=\"entre('"+id+"')\" class=\"form-control\" style=\"font-size:10px; width:260px; height:60px;\" id=\""+id+"\">"+valor+"</textarea>"+
	             "<span title=\"Mostrar ejemplos para el campo\"  onclick=\""+evento+"('"+id+"');\" style=\"cursor:pointer;\"class=\"input-group-addon\">"+
	                     "<i class=\"ace-icon blue  fa fa-search-plus\"></i></span>"+
             "</div> ";}
    
    
    if (tipo=='TEXTAERA_BTNSQL') {
	     cad="<div class=\"input-group\" style=\"width:"+ancho+"px;\" >"+		        
		         "<textarea  onfocus=\"entre('"+id+"')\" class=\"form-control\" style=\"font-size:10px; width:260px; height:60px;\" id=\""+id+"\">"+valor+"</textarea>"+
	             "<span title=\"Mostrar ejemplos para el campo\"  onclick=\""+evento+"('"+id+"');\" style=\"cursor:pointer;\"class=\"input-group-addon\"><i class=\"ace-icon blue  fa fa-search-plus\"></i></span>"+
	             "<span title=\"Probar el SQL\"  onclick=\""+evento+"sql('"+id+"');\" style=\"cursor:pointer;\"class=\"input-group-addon\"><i class=\"ace-icon green  fa fa-play\"></i></span>"+
            "</div> ";}
    
    if (tipo=='TEXTAREA') {
	     cad="<div class=\"input-group\" style=\"width:"+ancho+"px;\" >"+	
	          "<textarea onfocus=\"entre('"+id+"')\" class=\"form-control\" style=\"width:260px;\" id=\""+id+"\">"+valor+"</textarea>";
	     "</div> ";}
    
	if (tipo=='INPUT') {
		     cad="<input  onfocus=\"entre('"+id+"')\" class=\"form-control myinput\"  style=\"width:"+ancho+"px;\" type=\"text\" value=\""+valor+"\" id=\""+id+"\" />";
	}
	
	if (tipo=='SELECT_SN') {
		 cads=""; cadn=""; if (valor=='S') {cads="SELECTED";} if (valor=='N') {cadn="SELECTED";}
	     cad="<SELECT onfocus=\"entre('"+id+"')\" class=\"form-control\"  style=\"width:"+ancho+"px;\" id=\""+id+"\">"+
	         "<OPTION value=\"S\" "+cads+">SI</OPTION>"+
	         "<OPTION value=\"N\" "+cadn+">NO</OPTION>"+
	         "<SELECT>";
    }
	
	if (tipo=='SELECT_TIPO') {
	     cad="<SELECT  onfocus=\"entre('"+id+"')\" class=\"form-control\"  style=\"width:"+ancho+"px;\" id=\""+id+"\"><SELECT>";	  
   }
	
	return(cad);

}

function entre (nombre){
	el=nombre.substring(0,nombre.lastIndexOf("_"))+"_1";
	$("#campoed").html($("#"+el).html());
}


function execSQL (modulo,usuario,essuper) {
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		 dameVentana("modalSQL","grid_"+modulo,"Manejador SQL","lg","bg-success","blue fa-2x fa fa-gears","370");
		 $("#body_modalSQL").append("<div class=\"row\">"+
										"<div class=\"col-sm-12\">"+
											"<textarea id=\"elsql\" class=\"form-control\" style=\"font-size:10px; width:100%; height:260px;\"></textarea>"+
										"</div>"+
									"</div>"+
									"<div class=\"row\">"+
										"<div id=\"elselect\" class=\"col-sm-4\">"+	
										     "<span class=\"label label-success\">Base de Datos</span>"+										
										"</div>"+
										"<div  class=\"col-sm-4\" style=\"padding-top:20px;\">"+				
										"   <button class=\"btn btn-white btn-success btn-bold\" "+
										"                   onclick=\"dameSQL('elsql','"+table.rows('.selected').data()[0][0]+"');\">"+
										"     <i class=\"ace-icon fa fa-magic bigger-120 green\"></i>Obtener SQL"+
										"   </button>"+	
										"</div>"+															
										"<div  class=\"col-sm-4\" style=\"padding-top:20px;\">"+				
										"   <button class=\"btn btn-white btn-danger btn-bold\" "+
										"                   onclick=\"ejecutaSQL('elsql');\">"+
										"     <i class=\"ace-icon fa  fa-play bigger-120 red\"></i>Ejecutar SQL"+
								        "   </button>"+											
										"</div>"+
									"</div"

		 );
		 var bases=[{id:"Mysql",opcion:"Mysql"},{id:"SQLite",opcion:"SQLite"}];
		 addSELECTJSON("labase","elselect",bases);
	}
	else {
       alert ("Por favor seleccione un módulo")

	}
}

function getResultados(){
	dameVentana("modalRes","grid_CMODULOS","Resultados","sm","bg-danger","blue fa-2x fa fa-gears","370");
	$("#body_modalRes").append("<textarea row=\"70\" id=\"elsqlRes\" class=\"form-control\" "+
											"style=\"font-size:10px; width:100%; height:100%;\"></textarea>");
}


function recursiva (arreglo,elindice,elmax) {
	$.ajax({		
		type: "GET",
		url:  "../base/ejecutasqlDin.php?bd="+$("#labase").val()+"&sql="+encodeURI(arreglo[elindice]),
		success: function(data){           	     
			$("#elsqlRes").val($("#elsqlRes").val()+"Lin: "+elindice+":"+data+"\n");
			if (elindice++<elmax) { recursiva (arreglo,elindice++,elmax); }
		},
		error: function(data) {
			$("#elsqlRes").val($("#elsqlRes").val()+"Lin: "+elindice+":"+data+"\n");
			if (elindice++<elmax) { recursiva (arreglo,elindice++,elmax); }
		 }		
	});
}

function ejecutaSQL(elsql){
	if (!($("#labase").val()=='0')) {
		datos=$("#"+elsql).val().split("<;>");
		getResultados();
		$("#elsqlRes").val("");
        recursiva(datos,0,datos.length-1);
	}
	else {alert ("Debe elegir la base de datos");}
}

function dameSQL (elsql,modulo) {
			$.ajax({
				type: "GET",
				url:  "../base/getdatossql.php?sql="+encodeURI("SELECT * from cmodulos where modu_modulo='"+modulo+"'")+"&bd="+$("#labase").val(),
				success: function(data){					
					losdatos=JSON.parse(data); 
					jQuery.each(losdatos, function(clave, valor) { 
						cad="INSERT INTO CMODULOS (modu_modulo,modu_pred,modu_descrip,"+
							                             "modu_aplicacion,modu_version,modu_ejecuta,modu_tabla,"+
							                             "modu_icono, modu_imaico,modu_cancel,modu_teclarap,"+
							                             "modu_auxiliar, modu_automatico, modu_pagina, modu_tablagraba,"+
							                             "modu_bd,_INSTITUCION, _CAMPUS)VALUES ("+
														  "'"+valor.modu_modulo+"',"+"'"+valor.modu_pred+"',"+"'"+valor.modu_descrip+
														  "',"+"'"+valor.modu_aplicacion+"',"+"'"+valor.modu_version+"',"+"'"+valor.modu_ejecuta+"',"+"'"+valor.modu_tabla+"',"+
														  "'"+valor.modu_icono+"',"+"'"+valor.modu_imaico+"',"+"'"+valor.modu_cancel+"',"+"'"+valor.modu_teclarap+"',"+
														  "'"+valor.modu_auxiliar+"',"+"'"+valor.modu_automatico+"',"+"'"+valor.modu_pagina+"',"+"'"+valor.modu_tablagraba+"',"+
														  "'"+valor.modu_bd+"',"+"'"+valor._INSTITUCION+"',"+"'"+valor._CAMPUS+"')";
					   $("#"+elsql).append(cad+"<;>\n");
					   latabla=valor.modu_tabla;
				   });   	
				   
			        $.ajax({
							type: "GET",
							url:  "../base/getdatossql.php?sql="+encodeURI("SELECT * from all_col_comment where table_name='"+latabla+"'")+"&bd="+$("#labase").val(),
							success: function(data){
								losdatos=JSON.parse(data);  							      	      
								jQuery.each(losdatos, function(clave, valor) { 
									cadSQL=valor.sql;
									cadVal=valor.validacion;
									if (!(valor.sql==null)) {cadSQL=valor.sql.replace(/'/g,"''");}
									if (!(valor.validacion==null)) {cadVal=valor.validacion.replace(/&/g,"<*>");}
									cad="INSERT INTO ALL_COL_COMMENT (owner,table_name,colum_name,comments,"+
																	"width, numero,comentario,keys,"+
																	"tipo,visgrid,visfrm,validacion,"+
																	"msjval,sql,seccion,gif,autoinc,"+
																	"_INSTITUCION,_CAMPUS) values ("+
																	"'"+valor.owner+"',"+"'"+valor.table_name+"',"+"'"+valor.colum_name+"',"+"'"+valor.comments+
																	"',"+"'"+valor.width+"',"+"'"+valor.numero+"',"+"'"+valor.comentario+"',"+"'"+valor.keys+"',"+
																	"'"+valor.tipo+"',"+"'"+valor.visgrid+"',"+"'"+valor.visfrm+"',"+"'"+cadVal+"',"+
																	"'"+valor.msjval+"',"+"'"+cadSQL+"',"+"'"+valor.seccion+"',"+"'"+valor.gif+"',"+"'"+valor.autoinc+"',"+
																	"'"+valor._INSTITUCION+"',"+"'"+valor._CAMPUS+"')";
									$("#"+elsql).append(cad+"<;>\n");
					      	    });				
			                }
					});
					
					$.ajax({
						type: "GET",
						url:  "../base/getdatossql.php?sql="+encodeURI("SELECT * from sprocesos where proc_modulo='"+modulo+"'")+"&bd="+$("#labase").val(),
						success: function(data){
							losdatos=JSON.parse(data);  							
							jQuery.each(losdatos, function(clave, valor) { 
								cad="INSERT INTO SPROCESOS (proc_modulo, proc_proceso,proc_descrip) VALUES ("+
									 "'"+valor.proc_modulo+"',"+"'"+valor.proc_proceso+"',"+"'"+valor.proc_descrip+"')";
								$("#"+elsql).append(cad+"<;>\n");
							  });				
						}
			 	    });

		        } //del SUCCEES DEL AJAX
	        });
}

function addComentarios(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		
		global=1;
	    $.ajax({
	           type: "GET",
	           url:  "../base/dameselect.php?sql="+encodeURI("SELECT DISTINCT(tipo), tipo FROM all_col_comment where  tipo is not null and tipo<>'' order by 1")+"&sel=0&bd=SQLite",
	           success: function(data){
	        	  lostipos=data; 
	        	  
	           }
	    });
	    
	    
	   
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \"  role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header bg-info\" >"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "             <div class=\"row\">"+			
	       "                 <div class=\"col-sm-3\"> "+			   
		   "                      <select class=\"form-control\" id=\"campos\"></select>"+	
		   "                  </div>"+
	       "                 <div class=\"col-sm-3\"> "+
	       "                      <button title=\"Agregar un nuevo campo\" type=\"button\" class=\"btn btn-white btn-dark btn-bold\" onclick=\"agregarCampo();\">"+
		   "                      <i class=\"ace-icon fa fa-plus  bigger-120 blue\"></i></button>"+
	       "                      <button title=\"Guardar todos los cambios\" type=\"button\" class=\"btn btn-white btn-warning btn-bold\" onclick=\"guardarComments();\">"+
		   "                      <i class=\"ace-icon fa fa-floppy-o bigger-120 red\"></i></button>"+		   
		   "                 </div>"+
	       "                 <div class=\"col-sm-3\"> "+			   
		   "                      <strong><span class=\"text-success\">Campo </span><span class=\"text-primary\" id=\"campoed\"></span></strong>"+	
		   "                 </div>"+		   
		   "             </div>"+		   
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\"  style=\"height:370px; overflow-y: auto;\">"+	
	       "                           <table id=\"tabHorarios\" class= \"table table-hover\" > "+
	   	   "                              <thead>  "+
		   "                                  <tr>"+
		   "                             	     <th>Op</th> "+
		   "                             	     <th>R</th> "+
		   "                             	     <th>ID</th> "+		   
		   "                             	     <th>Columna</th> "+	
		   "                             	     <th>Título</th> "+
		   "                             	     <th>Descripción</th> "+
		   "                             	     <th>Orden</th> "+
		   "                             	     <th>Sección</th> "+
		   "                             	     <th>LLave</th> "+
		   "                             	     <th>Tipo</th> "+
		   "                             	     <th>Grid</th> "+
		   "                             	     <th>Formulario</th> "+
		   "                             	     <th>Validación</th> "+
		   "                             	     <th>Mensaje_Val</th> "+
		   "                             	     <th>SQL</th> "+
		  
		   "                             	     <th>Gif</th> "+
		   "                             	     <th>Autoincremento</th> "+	   
		   "                      			</tr> "+
		   "                              </thead>" +
		   "                           </table>"+	
		   "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   "</div>";
	 
		
		 $("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	     
	    }
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
	    $.ajax({
	           type: "GET",
	           url:  "../base/getdatossql.php?bd=SQLite&sql=SELECT count(*) as NUM FROM ALL_COL_COMMENT WHERE table_name='"+table.rows('.selected').data()[0][6]+"'",
	           success: function(data){  
	        	      losdatos=JSON.parse(data);  
	        	        
	        	      jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; });
	        
	        	    	  if (hay>0) {	        	    			        	    	
	        	    		  $.ajax({
	        	   	           type: "GET",
	        	   	           url:  "../base/getdatossql.php?bd=SQLite&sql=SELECT num, colum_name, comments,comentario, "+
	        	   	                 " numero,keys,tipo, visgrid,visfrm,validacion, msjval, sql, seccion, gif, autoinc "+
	        	   	                 " FROM ALL_COL_COMMENT WHERE table_name='"+table.rows('.selected').data()[0][6]+"' order by numero",
	        	   	           success: function(data){ 
	        	   	        	
	        	   	        	     generaTabla(JSON.parse(data));
	        	   	                 },
	        	   	           error: function(data) {	                  
	        	   	                      alert('ERROR: '+data);
	        	   	                  }
	        	   	          });
	        	   	   
	        	    	  }

	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	   });
	    
	   
	    $.ajax({
	           type: "GET",
	           url:  "../base/dameselect.php?sql="+encodeURI("SELECT COLUMN_NAME, COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'sigea' AND TABLE_NAME = '"+table.rows('.selected').data()[0][6]+"'")+"&sel=0&bd=Mysql",
	           success: function(data){
	        	   $("#campos").html(data);   
	           }
	    });
	    
		
	}
	else {
		alert ("Debe seleccionar un Módulo");
		return 0;

		}
	
}




function generaTabla(grid_data){
	 global=1; 
	 $("#cuerpo").empty();
	 $("#cuerpoProc").empty();
	 $("#tabHorarios").append("<tbody id=\"cuerpo\">");
     c=1;	

		
	jQuery.each(grid_data, function(clave, valor) {
		
		$("#cuerpo").append("<tr id=\"row"+c+"\">");
		$("#row"+c).append("<td><button onclick=\"eliminarFila('row"+c+"');\" class=\"btn btn-xs btn-danger\"> " +
                 "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
                 "</button></td>");
		$("#row"+c).append("<td>"+c+"</td>");
		$("#row"+c).append("<td>"+ "<label id=\"c_"+c+"_0\" class=\"small text-info font-weight-bold\">"+valor.num+"</label</td>");
		$("#row"+c).append("<td><label  id=\"c_"+c+"_1\" class=\"font-weight-bold small text-info\">"+valor.colum_name+"</label></td>");
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_2',utf8Decode(valor.comments),'',110));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_3',utf8Decode(valor.comentario),'',180));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_4',valor.numero,'',60));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_12',valor.seccion,'',110));
		$("#row"+c).append("<td>"+dameElemento('SELECT_SN','c_'+c+'_5',valor.keys,'',60));
		$("#c_"+c+"_5").val(valor.keys);		     
		$("#row"+c).append("<td>"+dameElemento('SELECT_TIPO','c_'+c+'_6',valor.tipo,'',80));
		$("#c_"+c+"_6").html(lostipos);
		$("#c_"+c+"_6").val(valor.tipo);
		$("#row"+c).append("<td>"+dameElemento('SELECT_SN','c_'+c+'_7',valor.visgrid,'',60));
		$("#c_"+c+"_7").val(valor.visgrid);
		$("#row"+c).append("<td>"+dameElemento('SELECT_SN','c_'+c+'_8',valor.visfrm,'',60));
		$("#c_"+c+"_8").val(valor.visfrm);
		$("#row"+c).append("<td>"+dameElemento('TEXTAERA_BTN','c_'+c+'_9',valor.validacion,'helpvalida',100));
		$("#row"+c).append("<td>"+dameElemento('TEXTAREA','c_'+c+'_10',utf8Decode(valor.msjval),'',110));
		$("#row"+c).append("<td>"+dameElemento('TEXTAERA_BTNSQL','c_'+c+'_11',valor.sql,'helpsql',160));
		
		$("#row"+c).append("<td>"+dameElemento('INPUT_BTN','c_'+c+'_13',valor.gif,'helpgif',110));
		$("#row"+c).append("<td>"+dameElemento('TEXTAERA_BTN','c_'+c+'_14',valor.autoinc,'helpauto',110));
			
		c++;
		global=c;
	});
}




function agregarCampo(){	
	
     if ($("#campos").val()==0) {alert ("Por favor elija un campo"); return 0;}
     
     esta=false;
	 $('#tabHorarios tr').each(function () {
	     if (c>=0) {
	        var i = $(this).find("td").eq(1).html();		        
	        if ($("#c_"+i+"_1").html()==$("#campos").val()) {
	        	esta=true; alert ("El campo ya esta agregado en la Lista"); return 0;
	        }
	     }
         c++;
	 });
	 
	 if ($("#cuerpo").length<=0) {global=1; $("#tabHorarios").append("<tbody id=\"cuerpo\">");}
	 
	 
	 if (!(esta)) {
		     
		    $("#cuerpo").append("<tr id=\"row"+global+"\">");
			$("#row"+global).append("<td><button onclick=\"eliminarFila('row"+global+"');\" class=\"btn btn-xs btn-danger\"> " +
	                 "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
	                 "</button></td>");
			$("#row"+global).append("<td>"+global+"</td>");
			$("#row"+global).append("<td>"+ "<label id=\"c_"+global+"_0\" class=\"small text-info font-weight-bold\">SC</label</td>");
			
			$("#row"+global).append("<td><label  id=\"c_"+global+"_1\" class=\"font-weight-bold small text-info\">"+$("#campos").val()+"</label></td>");
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_2',$("#campos").val(),'',110));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_3','','',180));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_4','','',60));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_12','','',110));
			$("#row"+global).append("<td>"+dameElemento('SELECT_SN','c_'+global+'_5','N','',60));	     
			$("#row"+global).append("<td>"+dameElemento('SELECT_TIPO','c_'+global+'_6','','',80));
			$("#c_"+global+"_6").html(lostipos);
			$("#row"+global).append("<td>"+dameElemento('SELECT_SN','c_'+global+'_7','','',60));
			$("#row"+global).append("<td>"+dameElemento('SELECT_SN','c_'+global+'_8','','',60));
			$("#row"+global).append("<td>"+dameElemento('TEXTAERA_BTN','c_'+global+'_9','','helpvalida',110));
			$("#row"+global).append("<td>"+dameElemento('TEXTAREA','c_'+global+'_10','','',110));
			$("#row"+global).append("<td>"+dameElemento('TEXTAERA_BTNSQL','c_'+global+'_11','','helpsql',160));			
			$("#row"+global).append("<td>"+dameElemento('INPUT_BTN','c_'+global+'_13','','helpgif',110));
			$("#row"+global).append("<td>"+dameElemento('TEXTAERA_BTN','c_'+global+'_14','','helpauto',110));
			
		
			global++;
	 }
}


function eliminarFila(nombre) {
	var r = confirm("Seguro que desea eliminar el proceso");
	if (r == true) {
        $("#"+nombre).remove();
        }
}


/*======================================== PARA EL CASO DE SQL==================================*/

function mostrarsql(tipo){
	script="<div class=\"modal fade\" id=\"modalDocumentsql\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
        "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
	   "      <div class=\"modal-content\">"+
	   "        <div class=\"modal-header\">"+
	   "             <h5 class=\"modal-title\">Ejemplos de SQL</h5>"+
	   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cerrar\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "        </div>"+
	   "        <div class=\"modal-body\">"+
	   "            <div class=\"container-fluid\">"+
	   "                 <div class=\"row\"> "+			
       "                     <div class=\"col-md-12\"> "+			   
	   "                          <select style=\"width:100%;\"class=\"chosen-select form-control\" id=\"selsql\"></select>"+	
	   "                     </div>"+
	   "                     <br/>"+
	   "                     <div class=\"col-md-3 ml-auto \"> "+
	   "                            <button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"copiarsql();\">"+
	   "                            <i class=\"ace-icon fa fa-plus bigger-120 blue\"></i>Seleccionar Ejemplo de SQL</button>"+
	   "                     </div>"+ 
	   "                 </div>"+
	   "             </div>"+
	   "         </div>"+
	   "      </div>"+
	   "   </div>"+
	   "</div>";
	
	   
	    elsql="SELECT id, mensaje||'/'||validacion FROM SVALIDACIONES WHERE tipo='"+tipo+"'";
	    $.ajax({
	           type: "GET",
	           url:  "dameselect.php?sql="+encodeURI(elsql)+"&sel=0&bd=SQLite", 
	           success: function(data){ 	

	        	   $("#selsql").html(data);
	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });
	 
	
	 $("#modalDocumentsql").remove();
	 if (! ( $("#modalDocumentsql").length )) {$("body").append(script);}
	    
	 $('#modalDocumentsql').modal({show:true, backdrop: 'static', keyboard: false});

}


function ejecutarsqlprobar(sqlprobar){
	cadres="";
	$.ajax({
        type: "GET",
        url:  "getdatossql.php?sql="+encodeURI(sqlprobar)+"&bd=Mysql", 
        success: function(data){ 
     	       if (data.substring(0,1)=='[') { alert ("EL SQL SE EJECUTO CON ÉXITO:  \n"+data);}
     	       else {alert ("EL SQL ES INCORRECTO:  \n"+data)}
              },
        error: function(data) {	                  
                   cadres='ERROR: '+data;
               }
       });
	return cadres;
}

function helpsql(nombre){
	elemento=nombre;
	mostrarsql('SQL');
}

function helpsqlsql(nombre){
	ejecutarsqlprobar($("#"+nombre).val());
}


function copiarsql(){
	$("#"+elemento).val(""+$("#selsql option:selected").html().split("/")[1]);
	$('#modalDocumentsql').modal("hide"); 
}

function helpauto(nombre){
	elemento=nombre;
	mostrarsql('AUTO');
}

/*=======================================================================================================*/



/*======================================== PARA EL CASO DE VALIDACION==================================*/

function mostrarValidaciones(){
	script="<div class=\"modal fade\" id=\"modalDocumentval\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
        "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
	   "      <div class=\"modal-content\">"+
	   "        <div class=\"modal-header\">"+
	   "             <h5 class=\"modal-title\">Ejemplo de Validaciones</h5>"+
	   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cerrar\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "        </div>"+
	   "        <div class=\"modal-body\">"+
	   "            <div class=\"container-fluid\">"+
	   "                 <div class=\"row\"> "+			
       "                     <div class=\"col-md-12\"> "+			   
	   "                          <select style=\"width:100%;\"class=\"chosen-select form-control\" id=\"selval\"></select>"+	
	   "                     </div>"+
	   "                     <br/>"+	   
	   "                     <div class=\"col-md-3 ml-auto \"> "+
	   "                            <button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"copiarval();\">"+
	   "                            <i class=\"ace-icon fa fa-plus bigger-120 blue\"></i>Seleccionar Ejemplo de Validación</button>"+
	   "                     </div>"+ 
	   "                 </div>"+
	   "             </div>"+
	   "         </div>"+
	   "      </div>"+
	   "   </div>"+
	   "</div>";
	
	   
	    elsql="SELECT validacion||'|'||mensaje, validacion||'|'||mensaje FROM SVALIDACIONES  WHERE tipo='VAL'";
	    $.ajax({
	           type: "GET",
	           url:  "dameselect.php?sql="+encodeURI(elsql)+"&sel=0&bd=SQLite", 
	           success: function(data){ 	
	        	   $("#selval").html(data);
	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });
	 
	
	 $("#modalDocumentval").remove();
	 if (! ( $("#modalDocumentval").length )) {$("body").append(script);}
	    
	 $('#modalDocumentval').modal({show:true, backdrop: 'static', keyboard: false});

}


function helpvalida(nombre){
	elemento2=nombre.substring(0,nombre.lastIndexOf("_"))+"_10";
	elemento=nombre;
	mostrarValidaciones();
}

function copiarval(){
	$("#"+elemento).val(""+$("#selval option:selected").html().split("|")[0]);
	$("#"+elemento2).val($("#selval option:selected").html().split("|")[1]);
	$('#modalDocumentval').modal("hide"); 
}

/*=======================================================================================================*/



/*======================================== PARA EL CASO DEL GIF ==================================*/
function helpgif(nombre){
	elemento=nombre;
	mostrarico();
}
function elegirima(valor){
	$("#"+elemento).val(""+valor);
	$('#modalDocumentGif').modal("hide"); 
}

function mostrarico(){
	script="<div class=\"modal fade\" id=\"modalDocumentGif\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
    "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header\">"+
	   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "             <div class=\"row\"> "+			
       "                 <div class=\"col-sm-12\"> "+			   
	    "                       <div class=\"widget-box widget-color-green2\"> "+
		"                              <div class=\"widget-header\">"+
		"	                                <h4 class=\"widget-title lighter smaller\">Iconos</h4>"+
		"                              </div>"+
		"                              <div style=\"overflow-y: auto;height:200px;width:100%;\">"+
		"		                                   <ul id=\"tree\"></ul>"+
		"                              </div>"+
	    "                       </div>"+
	    "                 </div>"+
	    "             </div>"+	    
       "          </div>"+
	   "      </div>"+
	   "   </div>"+
	   "</div>";
	   $("#modalDocumentGif").remove();
	   
	    if (! ( $("#modalDocumentGif").length )) { $("body").append(script);}
	    
	    $('#modalDocumentGif').modal({show:true, backdrop: 'static', keyboard: false});
	    
	    elsql="SELECT nombre, nombre, icon FROM ICONOS order by 1";  
	    
		$.ajax({
	        type: "GET",
	        url: 'dameselectima.php?sql='+encodeURI(elsql)+"&sel=0&bd=SQLite&tipo=tree", 
	        success: function(data){  
	        	$("#tree").html(data);
	     },
	     error: function(data) {
	        alert('ERROR: '+data);
	     }
   }); 
}

/*=======================================================================================================*/





function guardarComments(){
	var form = $( "#frmdocumentos" );
	
    var losdatos=[];
    var i=0; 
    var j=0; var cad="";
    var c=-1;
    	
    $('#tabHorarios tr').each(function () {
    		     if (c>=0) {
    		        var i = $(this).find("td").eq(1).html();
    		        cad+= table.rows('.selected').data()[0][6]+"||"+ //table_name
    		        $("#c_"+i+"_1").html()+"||"+    //colum_name
                    $("#c_"+i+"_2").val()+"||"+    //comments                  
                    $("#c_"+i+"_3").val()+"||"+ //comentario
                    $("#c_"+i+"_4").val()+"||"+ //numero
                    $("#c_"+i+"_5").val()+"||"+ //keys
                    $("#c_"+i+"_6").val()+"||"+ //tipo
                    $("#c_"+i+"_7").val()+"||"+ //visgrid
                    $("#c_"+i+"_8").val()+"||"+ //visfrm
                    $("#c_"+i+"_9").val()+"||"+ //validacion
                    $("#c_"+i+"_10").val()+"||"+ //msjval
                    $("#c_"+i+"_11").val()+"||"+ //sql
                    $("#c_"+i+"_12").val()+"||"+ //seccion
                    $("#c_"+i+"_13").val()+"||"+ //gif
                    $("#c_"+i+"_14").val(); //autoinc
                
		            losdatos[c]=cad;
		            cad="";
    		     }
		         c++;
    		 });
    	 
    	    var loscampos = ["table_name","colum_name","comments","comentario","numero","keys","tipo","visgrid","visfrm","validacion","msjval",
    	    	             "sql","seccion","gif","autoinc"];
    	    
    	    parametros={
    	    		tabla:"ALL_COL_COMMENT",
    	    		campollave:"table_name",
    	    		bd:"SQLite",
    	    		valorllave:table.rows('.selected').data()[0][6],
    	    		eliminar: "S",
    	    		separador:"||",
    	    		campos: JSON.stringify(loscampos),
    	    	    datos: JSON.stringify(losdatos)
    	    };
    	    $.ajax({
    	        type: "POST",
    	        url:"grabadetalle.php",
    	        data: parametros,
    	        success: function(data){
    	        	
    	        	if (data.length>0) {alert ("Ocurrio un error: "+data); console.log(data);}
    	        	else {alert ("Registros guardados"); 
    	        	      $('#modalDocument').modal("hide");  
    	        	      $('#dlgproceso').modal("hide"); }		                                	                                        					          
    	        }					     
    	    });    	                	 
}




/*===================================================PARA LOS PROCESOS ===================================================*/
function addProcesos(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
	    global=1;
		script="<div class=\"modal fade\" id=\"modalDocumentProc\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \"  role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "             <div class=\"row\"> "+			
	       "                 <div class=\"col-sm-3\"> "+
	       "                      <button title=\"Agregar un nuevo Proceso\" type=\"button\" class=\"btn btn-white btn-dark btn-bold\" onclick=\"agregarProceso();\">"+
		   "                      <i class=\"ace-icon fa fa-plus  bigger-120 blue\"></i></button>"+
	       "                      <button title=\"Guardar todos los cambios\" type=\"button\" class=\"btn btn-white btn-warning btn-bold\" onclick=\"guardarProcesos();\">"+
		   "                      <i class=\"ace-icon fa fa-floppy-o bigger-120 red\"></i></button>"+		   
		   "                 </div>"+
	       "                 <div class=\"col-sm-3\"> "+			   
		   "                      <strong><span class=\"text-success\">Campo </span><span class=\"text-primary\" id=\"campoed\"></span></strong>"+	
		   "                 </div>"+		   
		   "             </div>"+		   
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\"  style=\"max-height: calc(100vh - 210px); overflow-y: auto;\">"+	
	       "                           <table id=\"tabProcesos\" class= \"table table-hover\">"+
	   	   "                              <thead>  "+
		   "                                  <tr>"+
		   "                             	     <th>Op</th> "+
		   "                             	     <th>R</th> "+
		   "                             	     <th>ID</th> "+		   
		   "                             	     <th>Nombre de Proceso</th> "+	
		   "                             	     <th>Descripción</th> "+	
		   "                      			</tr> "+
		   "                              </thead>" +
		   "                           </table>"+	
		   "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   "</div>";
	 
		
		 $("#modalDocumentProc").remove();
	    if (! ( $("#modalDocumentProc").length )) {
	        $("#grid_"+modulo).append(script);
	     
	    }
	    
	    $('#modalDocumentProc').modal({show:true, backdrop: 'static'});
	    $.ajax({
	           type: "GET",
	           url:  "../base/getdatossql.php?bd=SQLite&sql=SELECT count(*) as NUM FROM SPROCESOS WHERE proc_modulo='"+table.rows('.selected').data()[0][0]+"'",
	           success: function(data){  
	        	      losdatos=JSON.parse(data);  
	        	        
	        	      jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; });
	        
	        	    	  if (hay>0) {	        	    			        	    	
	        	    		  $.ajax({
	        	   	           type: "GET",
	        	   	           url:  "../base/getdatossql.php?bd=SQLite&sql=SELECT proc_id,proc_proceso,proc_descrip"+
	        	   	                 " FROM SPROCESOS WHERE proc_modulo='"+table.rows('.selected').data()[0][0]+"' order by proc_proceso",
	        	   	           success: function(data){ 	        	   	        	
	        	   	        	     generaTablaProc(JSON.parse(data));
	        	   	                 },
	        	   	           error: function(data) {	                  
	        	   	                      alert('ERROR: '+data);
	        	   	                  }
	        	   	          });
	        	   	   
	        	    	  }

	                 },
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	   });
		
	}
	else {
		alert ("Debe seleccionar un Módulo");
		return 0;

		}
	
}


function generaTablaProc(grid_data){		
	 $("#cuerpo").empty();
	 $("#cuerpoProc").empty();
	 $("#tabProcesos").append("<tbody id=\"cuerpoProc\">");
    c=1;	
    global=1; 
	jQuery.each(grid_data, function(clave, valor) { 	        			
		$("#cuerpoProc").append("<tr id=\"rowp"+c+"\">");
		$("#rowp"+c).append("<td><button onclick=\"eliminarFila('rowp"+c+"');\" class=\"btn btn-xs btn-danger\"> " +
                           "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
                           "</button></td>");
		$("#rowp"+c).append("<td>"+c+"</td>");
		$("#rowp"+c).append("<td>"+ "<label id=\"pc_"+c+"_0\" class=\"small text-info font-weight-bold\">"+valor.proc_id+"</label</td>");
		$("#rowp"+c).append("<td>"+dameElemento('INPUT','pc_'+c+'_1',valor.proc_proceso,'',110));
		$("#rowp"+c).append("<td>"+dameElemento('INPUT','pc_'+c+'_2',valor.proc_descrip,'',110));
		c++;
		global=c;
	});
}




function agregarProceso(){	

	 if ($("#cuerpoProc").length<=0) {global=1; $("#tabProcesos").append("<tbody id=\"cuerpoProc\">");}
	 
	 $("#cuerpoProc").append("<tr id=\"rowp"+global+"\">");
	 $("#rowp"+global).append("<td><button onclick=\"eliminarFila('rowp"+global+"');\" class=\"btn btn-xs btn-danger\"> " +
	                 "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
	                 "</button></td>");
	 $("#rowp"+global).append("<td>"+global+"</td>");
	 $("#rowp"+global).append("<td>"+ "<label id=\"pc_"+global+"_0\" class=\"small text-info font-weight-bold\">SC</label</td>");
	 $("#rowp"+global).append("<td>"+dameElemento('INPUT','pc_'+global+'_1','','',110));		
	 $("#rowp"+global).append("<td>"+dameElemento('INPUT','pc_'+global+'_2','','',110));	
	 
	 
	 global++;

}


function validaProcesos(){
	 error=false;
	 $("input[id^='pc_']").each(function(){
			dato=$(this).val();
			if (dato.length<=0) {
				$(this).css("border-color","red"); 
				error=true;
			}
	 });
				
	 return error;
}

function guardarProcesos(){
	var form = $( "#frmdocumentos" );
	
    var losdatos=[];
    var i=0; 
    var j=0; var cad="";
    var c=-1;
    if (validaProcesos()) {alert ("No deben existir campos vacios"); return 0;}
    else {
		    $('#tabProcesos tr').each(function () {
		    		     if (c>=0) {
		    		        var i = $(this).find("td").eq(1).html();
		    		        cad+= table.rows('.selected').data()[0][0]+"|"+ //proc_modulo
		    		        $("#pc_"+i+"_1").val()+"|"+    //proc_proceso
		                    $("#pc_"+i+"_2").val();    //proc_descrip                  
		                                
				            losdatos[c]=cad;
				            cad="";
		    		     }
				         c++;
		    		 });
		    	 
		    	    var loscampos = ["proc_modulo","proc_proceso","proc_descrip"];
		    	    
		    	    parametros={
		    	    		tabla:"SPROCESOS",
		    	    		campollave:"proc_modulo",
		    	    		bd:"SQLite",
		    	    		valorllave:table.rows('.selected').data()[0][0],
		    	    		eliminar: "S",
		    	    		separador:"|",
		    	    		campos: JSON.stringify(loscampos),
		    	    	    datos: JSON.stringify(losdatos)
		    	    };
		    	    $.ajax({
		    	        type: "POST",
		    	        url:"grabadetalle.php",
		    	        data: parametros,
		    	        success: function(data){
		    	        	
		    	        	if (data.length>0) {alert ("Ocurrio un error: "+data); console.log(data);}
		    	        	else {alert ("Registros guardados"); 
		    	        	      $('#modalDocumentProc').modal("hide");  
		    	        	      $('#dlgproceso').modal("hide"); }		                                	                                        					          
		    	        }					     
		    	    }); 
    }
}

