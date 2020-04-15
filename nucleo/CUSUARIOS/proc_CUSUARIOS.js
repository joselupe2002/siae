
var losdatos="";


function addPassword(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {   
	   
		

		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-sm \"  role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+		   
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+	
		   "             <h5 class=\"modal-title\">Asignación de contraseña</h5>"+
		   "          </div>"+
           "          <div id=\"frmdocumentos\" class=\"modal-body\">"+
           "            <div class=\"container-fluid\">"+
		   "                 <div class=\"row\"> "+			
		   "                    <div class=\"col-sm-12\"> "+
		   "                        <input type=\"text\" class=\"form-control\" id=\"laclave\"></input><br/>"+	
	       "                        <button style=\"width:100%\" title=\"Guardar todos los cambios\" type=\"button\" class=\"btn btn-white btn-warning btn-bold\" onclick=\"asignaPassword();\">"+
		   "                        <i class=\"ace-icon fa fa-floppy-o bigger-120 red\"></i>Asignar Contraseña</button>"+		   
		   "                    </div>"+
	       "                 </div>"+	
	       "             </div>"+
		   "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   "</div>";
		   

		
		
		 $("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	     
	    }
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
	    	  
		
	}
	else {
		alert ("Debe seleccionar un Usuario");
		return 0;

		}
	
}



function asignaPassword(){
	
	 encrip=sha512($("#laclave").val());

	 parametros={
			 tabla:"CUSUARIOS",
			 campollave:"usua_usuario",
			 valorllave:table.rows('.selected').data()[0][0],
			 bd:"SQLite",
			 usua_clave:encrip		
			 };
	$.ajax({
        type: "POST",
        url:"../base/actualiza.php",
        data: parametros,
        success: function(data){			                                	                      
            if (!(data.substring(0,1)=="0"))	
                 { 						                  
                  alert ("El password se asigno corectamente");
                  $('#modalDocument').modal("hide");
                  }	
            else {alert ("OCURRIO EL SIGUIENTE ERROR: "+data);}          					           
        }					     
    });      
		    	
}



/*=================================================PARA LOS PERMISOS DE USUARIO ========================================*/


function guardarFiltros(modulo,latabla,elusuario){
    var losdatos=[];
    var i=0; 
    var j=0; var cad="";
    var c=-1;
    	
    c=0;
    $('.filtrostxt').each(function () {
    	if (!($(this).val()=='')) {    		
    		 cad+=latabla+"|"+$(this).prop("id")+"|"+elusuario+"|"+$(this).val();
    		 losdatos[c]=cad;     		 
    		 c++;
    		 cad="";
    		 
    	} 
    });
    	
    var loscampos = ["derc_modulo","derc_campo","derc_usuario","derc_values",];

    parametros={
    	    		tabla:"SDERCAMPOS",
    	    		campollave:"derc_modulo||derc_usuario",
    	    		bd:"SQLite",
    	    		valorllave:latabla+elusuario,
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
    	        	$('#modalFiltro').modal("hide");  
    	        	if (data.length>0) {alert ("Ocurrio un error: "+data);}
    	        	else {alert ("Registros guardados")}		                                	                                        					          
    	        }					     
    	    });    	                	 
	
}

function agregarFiltros(modulo, nombre, latabla,elusuario){
	
			script="<div class=\"modal fade\" id=\"modalFiltro\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg\"  role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+		   
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+	
		   "             <span class=\"text-success\"><strong>Filtros:</strong></span><span class=\"text-primary\"><strong> "+nombre+"</strong></span>"+
		   "               <button title=\"Guardar todos los cambios\" type=\"button\" class=\"btn btn-white btn-warning btn-bold\" onclick=\"guardarFiltros('"+modulo+"','"+latabla+"','"+elusuario+"');\">Guardar Filtros</button>"+           
		   "          </div>"+
           "          <div id=\"frmdocumentos\" style=\"overflow-y: auto; height:400px;\" class=\"modal-body\">"+
           "               <table id=\"tabCampos\" style=\"width:95%;\" class= \"table table-condensed table-striped table-bordered table-hover\">"+
	   	   "               </table>"+	
		   "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   "</div>";
		   
		
		 $("#modalFiltro").remove();
		// $('#modalPermisos').modal('hide');
	     if (! ( $("#modalFiltro").length )) {
	        $("#grid_"+modulo).append(script);	
	      }
	    
	     $("#tabCampos").append("<tbody id=\"cuerpo\">");

	 	    
	 	    
	 	   $.ajax({
	           type: "GET",
	           url:  "../base/getdatossql.php?bd=SQLite&sql="+encodeURI("SELECT colum_name, comments,  IFNULL(derc_values,'') as derc_values FROM ALL_COL_COMMENT  a "+
                     " LEFT OUTER JOIN SDERCAMPOS ON (colum_name=derc_campo and derc_modulo=a.table_name and derc_usuario='"+elusuario+"')"+
                     " where a.table_name='"+latabla+"' "),
	           success: function(data){  
	        	   
	        	   todasColumnas=JSON.parse(data);  
	        	   inp="<input class=\"small form-control filtrostxt\" style=\"width:200px;\" type=\"text\"";
	   	 	       c=0;
	   			   jQuery.each(todasColumnas, function(clave, valor){	
	   				   
		   	           $("#cuerpo").append("<tr id=\"row"+c+"\">");
		   	           $("#row"+c).append("<td class=\"text-primary\"><strong>"+valor.comments+"</strong></td>");
		   	           $("#row"+c).append("<td>"+inp+" id =\""+valor.colum_name+"\" value =\""+valor.derc_values+"\"></input></td>");   	            
		   	          c++;                      
	   	            }); 
	   			  
	   			  $('#modalFiltro').modal({show:true, backdrop: 'static'});
	   			
	           }
	 	   });    
	    	  
}



function addPermisos(modulo,usuario,essuper){
table = $("#G_"+modulo).DataTable();
if (table.rows('.selected').data().length>0) {   
	  
	    $('#modalPermisos').modal({show:true, backdrop: 'static'});
	    	  
	    $.ajax({
	           type: "GET",
	           url:  "../base/getdatossql.php?bd=SQLite&sql="+encodeURI("select distinct(modu_modulo) as modu_modulo, modu_pred, modu_descrip, "+
	        		   "modu_aplicacion, modu_tabla, modu_tablagraba, modu_version, modu_ejecuta, modu_icono, modu_imaico, modu_cancel, modu_teclarap, "+
                       "modu_auxiliar, modu_automatico, modu_pagina ,(SELECT count(*) FROM SPROCESOS WHERE proc_modulo=modu_modulo) as tieneproc"+
                       " from Cmodulos where  modu_cancel='N' and modu_auxiliar<>'S'"+
                       " order by modu_aplicacion, modu_pred, modu_descrip ASC"),
	           success: function(data){  
	           losdatos=JSON.parse(data);  
	        	
	    
	            $("#miMenu").empty();
	        	      jQuery.each(losdatos, function(clave, valor) { 
	        	    	  	        	    		        	    	 
                           cadFiltro="";
	        	    	   cad=""; cadsm="";	       			   
		       			   laimg="menu-icon fa fa-caret-right";
		       			   if (valor.modu_imaico.length>0){laimg=valor.modu_imaico;}
		       			                                
		       			   if (valor.modu_ejecuta=="1") {
		       				    laClase_a="opExec"; 
		       			        elclick="";
		       			        laClase_b="arrow";
		       			        submenu="";
		       			        cadFiltro= "<div id=\"btn_"+valor.modu_modulo+"\" class= \"row\">"+
		       			                       "<div class=\"col-sm-3\">"+
		       			                          "<button  title=\"Filtros sobre campos\" type=\"button\" class=\"btn btn-minier btn-white btn-success  btn-round\" "+
		       			                                   "onclick=\"agregarFiltros('"+modulo+"','"+valor.modu_descrip+"','"+valor.modu_tabla+"','"+table.rows('.selected').data()[0][0]+"');\">"+
                                                           "<i class=\"ace-icon fa fa-lock bigger-60 blue\">Filtros</i>"+
                                                  "</button>"+
                                               "</div>"+
                                            "</div>";
		       			        check= "<strong><label class=\"text-success\" style=\"Font-weight:bold\" for=\"c_"+valor.modu_modulo+"\">"+valor.modu_descrip+"</label></strong>"+
		       				           "<div class= \"row\">"+
		       				           "<div class=\"col-sm-3\"><input id=\"d_"+valor.modu_modulo+"\" pred=\""+valor.modu_pred+"\" modulo=\""+valor.modu_modulo+"\" type=\"checkbox\"><strong><span class=\"small text-info\">Detalle</span></strong></div>"+
		       			               "<div class=\"col-sm-3\"><input id=\"i_"+valor.modu_modulo+"\" pred=\""+valor.modu_pred+"\" modulo=\""+valor.modu_modulo+"\" type=\"checkbox\"><strong><span class=\"small text-primary\">Insertar</span></strong></div>"+
		       			               "<div class=\"col-sm-3\"><input id=\"m_"+valor.modu_modulo+"\" pred=\""+valor.modu_pred+"\" modulo=\""+valor.modu_modulo+"\" type=\"checkbox\"><strong><span class=\"small text-warning\">Modificar</span></strong></div>"+
		       			               "<div class=\"col-sm-3\"><input id=\"e_"+valor.modu_modulo+"\" pred=\""+valor.modu_pred+"\" modulo=\""+valor.modu_modulo+"\" type=\"checkbox\"><strong><span class=\"small text-danger\">Eliminar</span></strong></div>"+
		       			               "</div>"+cadFiltro;
		       			              
		                            descrip="";
		       		               }
		       			   else {laClase_a="dropdown-toggle"; 
		       			         elclick="";
		       			         descrip=valor.modu_descrip;
		       			         check="";
		       			         submenu=" <b class='arrow fa fa-angle-down'></b>"; 
		                            cadsm="<ul class='submenu'  id='S_"+valor.modu_modulo+"' pred=\""+valor.modu_pred+"\"></ul>";				        	      
		       			   }
	
		       			   if (valor.modu_pred==" ") {estilo="menu-text"; padre="style=\"font-weight:bold;\""} else {estilo=""; padre="";} 
		       			   
		       			           cad="<li descrip='"+valor.modu_descrip+"' id='"+valor.modu_modulo+"' class=''>\n"+
		       			                    "<a class='"+laClase_a+"' "+elclick+" style='cursor: pointer;'>\n"+
		       			                         "<i class='"+laimg+"'></i> \n"+
		                                          "<span id=\"SPAN_"+valor.modu_modulo+"\" class='"+estilo+"' "+padre+">"+check+descrip+"</span>"+
		                                          submenu+"\n"+
		                                     "</a>\n"+
		                                     cadsm		                                    
		                                "</li> \n";		       			          
		                             if (valor.modu_pred==" ") { $("#miMenu").append(cad); }
		                             else {$("#S_"+valor.modu_pred).append(cad);} 
		                                 
		                  
		                      
		                             
		                  //Buscamos si tiene procesos 
		                  if (valor.tieneproc>0) {
			        	      $.ajax({ 
			        	             type: "GET",
			   	                     url:  "../base/getdatossql.php?bd=SQLite&sql="+encodeURI("SELECT proc_proceso, proc_descrip from SPROCESOS where proc_modulo='"+valor.modu_modulo+"'"),
			   	                      success: function(data){  
			   	                    	    	                    	  
			   	                          misProcesos=JSON.parse(data);  
			   	                          	
						                  //$("#SPAN_"+valor.modu_modulo).append("<div id=\"sproc_"+valor.modu_modulo+"\" class= \"row\"></div>");
			   	                           jQuery.each(misProcesos, function(claveproc, valorproc) {
                                                $("#btn_"+valor.modu_modulo).append("<div class=\"col-sm-3\"><input class=\"proceso\" id=\""+valorproc.proc_proceso+"\""+
																					"modulo=\""+valor.modu_modulo+"\" type=\"checkbox\"><strong><span class=\"small text-success\">"+
																					valorproc.proc_descrip+"</span></strong></div>");

			   	                           });
			   	                          
			   	                       },
			   	                    error: function(data) {	                  
			  	                      alert('ERROR: '+data);
			  	                  }   
			        	      });
		                  }
	        	      });
	        	      
	        	
	        	      
	        	      // Buscamos los permisos que tiene el usuarios sobrelos procesos 
	        	      $.ajax({ 
	        	             type: "GET",
	   	                     url:  "../base/getdatossql.php?bd=SQLite&sql="+encodeURI("SELECT derp_proceso from SDERPROCESOS where derp_usuario='"+table.rows('.selected').data()[0][0]+"'"),
	   	                      success: function(data){  	   	                    	    	                    	 
	   	                          misPermisosProc=JSON.parse(data);               
	   	                           jQuery.each(misPermisosProc, function(clavePerProc, valorPerProc) {	   	                        	    
	   	                                 $("#"+valorPerProc.derp_proceso).prop('checked', true);
	   	                                                           	   	                          
	   	                           });
	   	                          
	   	                       },
	   	                    error: function(data) {	                  
	  	                      alert('ERROR: '+data);
	  	                  }   
	        	      });
	        	      
	        	      
	        	      // Buscamos los permisos que tiene el usuarios
	        	      $.ajax({ 
	        	             type: "GET",
	   	                     url:  "../base/getPermisosUser.php?bd=SQLite&elusuario="+table.rows('.selected').data()[0][0],
	   	                      success: function(data){  
	   	                    	    	                    	  
	   	                          misPermisos=JSON.parse(data);  
	   	                          	   	                         
	   	                           jQuery.each(misPermisos, function(clave, valor) {
	   	                        	
	   	                                 if (valor.derm_detalle=='S') {$("#d_"+valor.modu_modulo).prop('checked', true);}
	   	                                 if (valor.derm_inserta=='S') {$("#i_"+valor.modu_modulo).prop('checked', true);}
	   	                                 if (valor.derm_edita=='S') {$("#m_"+valor.modu_modulo).prop('checked', true);}
	   	                                 if (valor.derm_borra=='S') {$("#e_"+valor.modu_modulo).prop('checked', true);}	   	                                 	   	                          
	   	                           });
	   	                          
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
	    
	   
        
	}
	else {
		alert ("Debe seleccionar un Usuario");
		return 0;

		}
	
}



function guardarPermisos(){
	   table = $("#G_CUSUARIOS").DataTable();
	   var losmodulos=[]; var cad=""; var entre=false;
	   c=0;
	   permpred='|S|S|S|S';
	  
	   jQuery.each(losdatos, function(clave, valor){
           cad="";
           entre=false;
		   modulo=$("#d_"+valor.modu_modulo).attr("modulo");
		   pred=$("#d_"+valor.modu_modulo).attr("pred");
		   
		   if ($("#d_"+valor.modu_modulo).prop('checked')) {cad+="|S"; entre=true;} else {cad+="|N";}
		   if ($("#i_"+valor.modu_modulo).prop('checked')) {cad+="|S"; entre=true;} else {cad+="|N";}
		   if ($("#m_"+valor.modu_modulo).prop('checked')) {cad+="|S"; entre=true;} else {cad+="|N";}
		   if ($("#e_"+valor.modu_modulo).prop('checked')) {cad+="|S"; entre=true;} else {cad+="|N";}
		   
		   if (entre) {
			    losmodulos[c]=table.rows('.selected').data()[0][0]+'|'+modulo+cad;
			    c++;
			   
			    
			    while (!(losmodulos.includes(table.rows('.selected').data()[0][0]+'|'+pred+permpred))) {
			    	losmodulos[c]=table.rows('.selected').data()[0][0]+'|'+pred+permpred; 
			    	c++;
			    	pred=$("#S_"+pred).attr("pred");
			    }
			    			 
			   }
      });
	   
	
	   
	   var loscampos = ["derm_usuario","derm_modulo","derm_detalle","derm_inserta","derm_edita","derm_borra"];

		parametros={
			tabla:"SDERMODU",
			campollave:"derm_usuario",
			bd:"SQLite",
			valorllave:table.rows('.selected').data()[0][0],
			eliminar: "S",
			separador:"|",
			campos: JSON.stringify(loscampos),
		  datos: JSON.stringify(losmodulos)
		};
		$.ajax({
		type: "POST",
		url:"../base/grabadetalle.php",
		data: parametros,
		success: function(data){
			
			if (data.length>0) {alert ("Ocurrio un error: "+data); console.log(data);}
			else {
				//Guardar los proceso 
				var losprocesos=[]; 
				cad=""; entre=false;
				c=0;
				$(".proceso").each(function(){
					 modulo=$(this).attr("modulo");
					if ($(this).prop('checked')) {losprocesos[c]=$(this).attr('id')+'|'+table.rows('.selected').data()[0][0]+'|'+modulo; c++;}					
		   		});
				var loscamposproc = ["derp_proceso","derp_usuario","derp_modulo"];
				parametros={
						tabla:"SDERPROCESOS",
						campollave:"derp_usuario",
						bd:"SQLite",
						valorllave:table.rows('.selected').data()[0][0],
						eliminar: "S",
						separador:"|",
						campos: JSON.stringify(loscamposproc),
					  datos: JSON.stringify(losprocesos)
					};
					$.ajax({
					type: "POST",
					url:"../base/grabadetalle.php",
					data: parametros,
					success: function(data){
						
						if (data.length>0) {alert ("Ocurrio un error: "+data); console.log(data);}
						else {alert ("Permisos a módulos y procesos guardados"); 
						      $('#modalPermisos').modal("hide");  
						      $('#dlgproceso').modal("hide"); }		                                	                                        					          
					}					     
					});    	      
                                	                                        					          
		   }
		}
		});    	         

}

/*=========================================PROCESO PARA SACAR EL SQL DE LOS MODULOS ===================*/
function sacaPermisos (modulo,usuario,essuper) {
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
       alert ("Por favor seleccione un Usuario");

	}
}

function getResultados(){
	dameVentana("modalRes","grid_CUSUARIOS","Resultados","sm","bg-danger","blue fa-2x fa fa-gears","370");
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

function dameSQL (elsql,usuario) {
			$.ajax({
				type: "GET",
				url:  "../base/getdatossql.php?sql="+encodeURI("SELECT * from SDERMODU where derm_usuario='"+usuario+"'")+"&bd="+$("#labase").val(),
				success: function(data){					
					losdatos=JSON.parse(data); 
					jQuery.each(losdatos, function(clave, valor) { 
						cad="INSERT INTO SDERMODU (derm_usuario,derm_modulo,derm_manten,"+
							                      "derm_detalle,derm_reporte,derm_inserta,"+
							                      "derm_edita,derm_borra)VALUES ("+
														  "'"+valor.derm_usuario+"',"+"'"+valor.derm_modulo+"',"+"'"+valor.derm_manten+
														  "','"+valor.derm_detalle+"',"+"'"+valor.derm_reporte+"',"+"'"+valor.derm_inserta+
														  "','"+valor.derm_edita+"',"+"'"+valor.derm_borra+"')";
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
									cadmsj=valor.msjval;
									if (!(valor.sql==null)) {cadSQL=valor.sql.replace(/'/g,"''");}
									if (!(valor.validacion==null)) {cadVal=valor.validacion.replace(/&/g,"<*>");}
									if (!(valor.msjval==null)) {cadmsj=valor.msjval.replace(/'/g,"''");}
									
									cad="INSERT INTO SDERMODU (derp_proceso,derp_usuario,derp_modulo) VALUES ("+
														  "'"+valor.derp_proceso+"',"+"'"+valor.derp_usuario+"',"+"'"+valor.derp_modulo+"')";
									$("#"+elsql).append(cad+"<;>\n");
					      	    });				
			                }
					});				

		        } //del SUCCEES DEL AJAX
	        });
}

/*==================================================================================================*/