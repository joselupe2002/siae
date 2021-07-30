var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		verPrincipales();
	});
	
	
		

/*===========================================================POR MATERIAS ==============================================*/


function verPrincipales(){

	$("#titulo").empty();
	$("#principal").empty();
	$("#principal").append("<div id=\"principales\"></div>");
	
	mostrarEspera("esperaInf","grid_iso_generalidades","Cargando Datos...");
	elsql="SELECT * from iso_general a where ACTIVO='S' and TIPO='PRINCIPAL' order by ORDEN";
	
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  
				datos=JSON.parse(data);
				jQuery.each(datos, function(clave, valor) { 

					$("#principales").append(
						"<div class=\"col-sm-2\" style=\"cursor:pointer;\" onclick=\"llamarSub('"+valor.ID+"','"+valor.NOMBRE+"','1');\">"+
						"     <div class=\"thumbnail search-thumbnail\" style=\"height:100px;\">"+
						"         <div style=\"text-align:center;\">"+
						"              <i class=\""+valor.ICONO+" bigger-300\"></i>"+
						"         </div>"+
						"         <div style=\"text-align:center;\">"+
						"              <span class=\"fontRobotoB\" style=\"size:16px; color:#181562;\">"+valor.NOMBRE+"</span>"+
						"         </div>"+
						"     </div>"+
						"</div>"
					);
			
					ocultarEspera("esperaInf");
				});	
			}
			
		});


}

function llamarSub(elid,nombre,op){

	$("#titulo").html("<span class=\"fontRobotoB bigger-140 text-success\" style=\"cursor:pointer; span:hover:text-decoration: underline;\" onclick=\"verPrincipales();\">PRINCIPAL</span>"+
	                  " <i class=\"fa pink bigger-140  fa-chevron-right\"></i> "+					
					  "<span class=\"fontRobotoB bigger-140 text-primary\">"+nombre+"</span>");


	$("#principal").empty();
	$("#principal").append("<div id=\"principales\"></div> ");
	
	mostrarEspera("esperaInf","grid_iso_generalidades","Cargando Datos...");
	elsql="SELECT * from iso_general a where ACTIVO='S' and TIPO='SUBPRINCIPAL' and DEPENDE="+elid+" order by ORDEN";
	
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  						
				if (data != "[]") {
					datos=JSON.parse(data);
					jQuery.each(datos, function(clave, valor) { 

						$("#principales").append(
							"<div class=\"col-sm-2\" style=\"cursor:pointer;\" onclick=\"verSecciones('"+valor.ID+"','"+valor.NOMBRE+"','2','"+nombre+"','"+elid+"');\">"+
							"     <div class=\"thumbnail search-thumbnail\"  style=\"height:100px;\">"+
							"         <div style=\"text-align:center;\">"+
							"              <i class=\""+valor.ICONO+" bigger-300\"></i>"+
							"         </div>"+
							"         <div style=\"text-align:center;\">"+
							"              <span class=\"fontRobotoB\" style=\"size:16px; color:#181562;\">"+valor.NOMBRE+"</span>"+
							"         </div>"+
							"     </div>"+
							"</div>"
						);
				
						
					});	}
				else {
					verSecciones(elid,"",1,nombre);
				}
				ocultarEspera("esperaInf");
			}
			
		});

}



function verSecciones(elid,nombre,op,nombrepred,idpred){

	$("#titulo").html("<span class=\"fontRobotoB bigger-140 text-success\" style=\"cursor:pointer; span:hover:text-decoration: underline;\" onclick=\"verPrincipales();\">PRINCIPAL</span>"+
	                  " <i class=\"fa pink bigger-140  fa-chevron-right\"></i> "+
					  "<span class=\"fontRobotoB bigger-140 text-danger\" style=\"cursor:pointer; span:hover:text-decoration: underline;\" onclick=\"llamarSub('"+idpred+"','"+nombrepred+"','1');\">"+nombrepred+"</span>"+
					  " <i class=\"fa pink bigger-140  fa-chevron-right\"></i> "+ 
					  "<span class=\"fontRobotoB bigger-140 text-primary\">"+nombre+"</span>");

	$("#principal").empty();
	$("#principal").append("<div id=\"accordion\" class=\"accordion-style1 panel-group\"></div> ");
	
	mostrarEspera("esperaInf","grid_iso_generalidades","Cargando Datos...");
	elsql="SELECT * from iso_general a where ACTIVO='S' and TIPO='PAGINA' and DEPENDE="+elid+" order by ORDEN";
	
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  
				datos=JSON.parse(data);
				jQuery.each(datos, function(clave, valor) { 
					
					$("#accordion").append(
						"<div class=\"panel panel-default\">"+
						"    <div class=\"panel-heading\"> "+
						"         <h3 class=\"panel-title\">"+
						"             <a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#tab"+valor.ID+"\">"+
						"		          <i class=\"ace-icon fa fa-angle-down bigger-110\" data-icon-hide=\"ace-icon fa fa-angle-down\" data-icon-show=\"ace-icon fa fa-angle-right\"></i>"+
						"                    <span class=\" fontRobotoB bigger-160 text-success\">"+valor.NOMBRE+"</span>"+
						"              </a>"+
						"         </h3> "+
						"    </div>"+
						"    <div class=\"panel-collapse collapse\" id=\"tab"+valor.ID+"\"></div>"
					);


					if (valor.TIPOINFO=="PAGINA") {
						$("#tab"+valor.ID).append(
							" <div class=\"row\">"+			
							"   <div class=\"col-sm-12\"><img src=\""+valor.IMAGEN1+"\"  style=\"width:98%;\"/>"+	
							"   <div class=\"col-sm-12\"><img src=\""+valor.IMAGEN2+"\"  style=\"width:98%;\"/>"+	
							"   <div class=\"col-sm-12\"><img src=\""+valor.IMAGEN3+"\"  style=\"width:98%;\"/>"+	
							"   <div class=\"col-sm-12\"><img src=\""+valor.IMAGEN4+"\"  style=\"width:98%;\"/>"+	
							"   <div class=\"col-sm-12\"><img src=\""+valor.IMAGEN5+"\"  style=\"width:98%;\"/>"+	
							"   <div class=\"col-sm-12\"><img src=\""+valor.IMAGEN6+"\"  style=\"width:98%;\"/>"+	
							"   <div class=\"col-sm-12\"><img src=\""+valor.IMAGEN7+"\"  style=\"width:98%;\"/>"+				
							"   <div class=\"col-sm-12\"><img src=\""+valor.IMAGEN8+"\"  style=\"width:98%;\"/>"+
							" </div>"
						);
					}

					if (valor.TIPOINFO=="ARCHIVO") {
						elsql="SELECT * from iso_general a where ACTIVO='S' and TIPO='PAGINA' and DEPENDE="+valor.ID+" order by ORDEN";
	
						parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
								type: "POST",
								data:parametros,
								url:  "../base/getdatossqlSeg.php",
								success: function(data2){  
									datos2=JSON.parse(data2);
									jQuery.each(datos2, function(clave, valor2) { 
										$("#tab"+valor.ID).append(
											" <div class=\"row\">"+			
											"   <div class=\"col-sm-6\">"+
											"       <a style=\"cursor:pointer;\"href=\""+valor2.ARCHIVO1+"\" target=\"_blank\">"+
											"            <span style=\"padding-left:10px;\" class=\"fontRobotoB text-primary\">"+valor2.NOMBRE+"</span>"+
											"       </a>"+
											"   </div>"+
											"   <div class=\"col-sm-2\"><span class=\"fontRobotoB text-success\"><i class=\"fa blue fa-clock-o\"/> "+valor2.FECHAUS+"</span></div>"+
											"   <div class=\"col-sm-2\"><span class=\"fontRobotoB text-warning\"><i class=\"fa blue fa-tag\"/> Rev:"+valor2.REVISION+"</span></div>"+
											"   <div class=\"col-sm-2\"><span class=\"fontRobotoB text-danger\"><i class=\"fa blue fa-book\"/> Ver:"+valor2.VERSION+"</span></div>"+											
											"</div>"


										);
									});
								
								}
						});
					}					
				});	
			}
			
		});
		ocultarEspera("esperaInf");


}