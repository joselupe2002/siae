var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;
var arrEmpresas = [];
var arrProyectos= [];
var arrResidente= [];



    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 

		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");
	

		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Escolar Proceso</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, concat(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by cicl_clave desc", "","");  			      
	
		$("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CONCAT(CARR_CLAVE,' ',CARR_DESCRIP) from ccarreras order by CARR_CLAVE", "","");  			      
			      
		addSELECT("base","losmaestros","PROPIO", "SELECT EMPL_NUMERO, concat(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT,' ',EMPL_NUMERO) FROM pempleados order by EMPL_NOMBRE, EMPL_APEPAT, EMPL_APEMAT desc", "","");  			      

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {}
	
	function cargarInformacion(){
		
		elsql="select * from rescapproy a, falumnos b where a.MATRICULA=ALUM_MATRICULA "+
		" and ALUM_CARRERAREG='"+$("#selCarreras").val()+"'"+
		" AND a.CICLO='"+$("#selCiclos").val()+"'";
	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  				      			      
				
				 script="<table id=\"tabMaterias\" name=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
				"        <thead >  "+
				"             <tr id=\"headMaterias\">"+
				"                <th>Buscar</th> "+
				"                <th>Empresa</th> "+
				"                <th>Buscar</th> "+
				"                <th>Proyecto</th> "+
				"                <th>Residente</th> "+
				"                <th>IDEMPRESA</th> "+
				"                <th>IDPROY</th> "+		
				"                <th>IDRESIDENCIA</th> "+		
				"                <th>IDASESOR</th> "+				
				"                <th>ID</th> "+
				"                <th>RFC</th> "+
				"                <th>Nombre</th> "+
				"                <th>ALUMNO</th> "+
				"                <th>PROYECTO</th> "+
				"                <th>Departamento</th> "+
				"                <th>Sector</th> "+						
				"                <th>Giro</th> "+	
				"                <th>Representante</th> "+	
				"                <th>Representante</th> "+	            
				"                <th>Domicilio</th> "+							   
				"             </tr> "+
				"            </thead>" +
				"         </table>";
				$("#informacion").empty();
				$("#informacion").append(script);
						
				generaTablaEmpresas(JSON.parse(data));   													
				ocultarEspera("esperahor");  																													
			},
			error: function(dataMat) {	                  
						alert('ERROR: '+dataMat);
									}
			});	      	      					  			  					  		
}



function generaTablaEmpresas(grid_data){	
	contAlum=1;
	lafecha=dameFecha("FECHAHORA");

	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	i=0;
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   	
		
		arrEmpresas[i]=[valor.RFC, valor.EMPRESA,valor.EMPRESA.substring(0,30),valor.GIRO,valor.SECTOR,valor.TITULAR,valor.MISION,
				 '',valor.DOMICILIO,'','','','',valor.CP,usuario,lafecha,institucion,campus,valor.TELEFONO,'',valor.ID];

		arrProyectos[i]=[valor.CICLO,valor.ALUM_CARRERAREG,'1',valor.IDEMPRESA,'0',valor.ASESOREX, valor.PSTOASESOREX,'0','','','',
						 valor.IDASESOR,'','','','','',valor.INICIA,valor.TERMINA,valor.PROYECTO,
						valor.PROYECTO.substring(0,30),'',valor.HORARIO,'AUTOMATICO',institucion,campus,valor.CORREOASESOREX,usuario,lafecha,'0',valor.ID];
				
		arrResidente[i]=[valor.CICLO, valor.ALUM_MATRICULA,valor.ALUM_CARRERAREG,'3',valor.ALUM_CARRERAREG,valor.IDPROYECTO,
						 valor.FECHAUS,valor.FECHAUS,valor.FECHAUS,'','','','','N',usuario,lafecha,institucion,campus,
						 valor.IDPROYECTO,valor.IDPROYECTO,valor.ID];

							
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");

		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span onclick=\"buscar('"+valor.ID+"','"+valor.RFC+"','"+valor.EMPRESA+"')\" "+
								   "class=\"btn btn-white\"><i class=\"fa fa-search red bigger-160\"></i></span></td>");

		$("#rowM"+contAlum).append("<td title=\"Agregar nueva empresa de acuerdo a los datos capturados\" style=\"font-size:12px;\"><span onclick=\"agregarEmpresa('"+valor.ID+"','"+valor.RFC+"','"+valor.EMPRESA+"',"+i+")\" "+
								   "class=\"btn btn-white\"><i class=\"fa fa-home blue bigger-160\"></i></span></td>");

		$("#rowM"+contAlum).append("<td title=\"Buscar un proyecto dado de alta\" style=\"font-size:12px;\"><span onclick=\"buscarProyecto('"+valor.ID+"')\" "+
								   "class=\"btn btn-white\"><i class=\"fa fa-search red bigger-160\"></i></span></td>");
					

		$("#rowM"+contAlum).append("<td title=\"Agregar nueva proyecto de acuerdo a los datos capturados\" style=\"font-size:12px;\"><span onclick=\"agregarProyecto('"+valor.ID+"',"+i+",arrProyectos)\" "+
								   "class=\"btn btn-white\"><i class=\"fa fa-tags green bigger-160\"></i></span></td>");
								   
		$("#rowM"+contAlum).append("<td  title=\"Agregar registro de residente de acuerdo a los datos capturados\" style=\"font-size:12px;\"><span onclick=\"agregarResidente('"+valor.ID+"',"+i+",arrResidente)\" "+
		                           "class=\"btn btn-white\"><i class=\"fa fa-user blue bigger-160\"></i></span></td>");
		
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.IDEMPRESA+"</span></td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.IDPROYECTO+"</span></td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.IDRESIDENCIA+"</span></td>");

		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><SELECT onchange=\"asignaAsesor('"+valor.ID+"');\" id=\"asesor_"+valor.ID+"\"></SELECT></td>");

		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.ID+"</span></td>");
		$("#rowM"+contAlum).append("<td>"+valor.RFC+"</td>");
		$("#rowM"+contAlum).append("<td>"+valor.EMPRESA+"</td>");
		$("#rowM"+contAlum).append("<td>"+ valor.ALUM_MATRICULA+' '+valor.ALUM_NOMBRE+' '+valor.ALUM_APEPAT+' '+valor.ALUM_APEMAT+"</td>");
		$("#rowM"+contAlum).append("<td>"+valor.PROYECTO+"</td>");
		

		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-success\">"+valor.DEPARTAMENTO+"</span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.SECTOR+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.GIRO+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.TITULAR+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.DOMICILIO+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.ASESOREX+"</td>");

		$("#asesor_"+valor.ID).html($("#base").html());
		$("#asesor_"+valor.ID+" option[value='"+ valor.IDASESOR +"']").attr("selected",true);

		contAlum++; 
		i++;     			
	});	
} 

function removeracentos (cadena) {

	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	

}

function buscar(elid, elrfc, laempresa) {

		elsql="select * from resempresas where RFC='"+elrfc+"' or NOMBRE LIKE '%"+laempresa+"%'";
	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  	
				cad="";			  
				jQuery.each(JSON.parse(data), function(clave, valor) { 
					btn="<span title=\"Asignar empresa ya creada al residente \"onclick=\"asignarEmpresa('"+elid+"','"+valor.IDEMP+"')\" class=\"btn btn-white\"><i class=\"fa fa-home blue bigger-160\"></i></span>";
					cad+=btn+"|"+valor.IDEMP+"|"+valor.RFC+"|"+valor.NOMBRE+"|"+valor.REPRESENTANTE+"|"+valor.DIRECCION+"<br>";
				});
				mostrarIfo("info","grid_resaltadin","Empresas con coincidencia",
				"<div class=\"alert alert-primary\" style=\"text-align:justify; height:200px; overflow-y: scroll; \">"+cad+"</div>","modal-lg");
																																	
			},
		});	      	      					    					  		
}



function buscarProyecto(elid) {


	elhtml="<div id=\"losproyectos\" class=\"alert alert-primary\" style=\"text-align:justify;\">"+
	"<span onclick=\"asignarelproy('"+elid+"');\" class=\"btn btn-white\"><i class=\"fa fa-search red bigger-160\"></i> Asignar Proyecto</span>"+
	"</div>";

	mostrarIfo("infoProy","grid_resaltadin","Proyectos registrados",elhtml,"modal-lg");
		
	addSELECT("selProyectos","losproyectos","PROPIO", "SELECT IDPROY,concat (IDPROY,' ',NOMBRE) FROM resproyectos order by CICLO DESC, NOMBRE", "","BUSQUEDA");  	
		  	      					    					  		
}


function asignarelproy(elid) {

	if ($("#selProyectos").val()>0) {
	  asignarProyecto(elid,$("#selProyectos").val());
	  $("#infoProy").modal("hide");
	}
	else {alert ("Debe seleccionar un proyecto");}
}

function asignarEmpresa (elid,idempresa){
	parametros={tabla:"rescapproy",		       
	bd:"Mysql",
	campollave:"ID",
	valorllave:elid,			
	IDEMPRESA:idempresa};  
	$.ajax({
			type: "POST",
			url:"../base/actualiza.php",
			data: parametros,
			success: function(data){ 
				$("#info").modal("hide");
				cargarInformacion();
				}
			});			
}

function asignaAsesor (elid){
	parametros={tabla:"rescapproy",		       
	bd:"Mysql",
	campollave:"ID",
	valorllave:elid,			
	IDASESOR:$("#asesor_"+elid).val()};  
	$.ajax({
			type: "POST",
			url:"../base/actualiza.php",
			data: parametros,
			success: function(data){ 
				$("#info").modal("hide");

				parametros={
					bd:"mysql",
					sql:"update resproyectos set ASESORINT1='"+$("#asesor_"+elid).val()+"' WHERE IDPROP="+elid,
					dato:sessionStorage.co				
				};

				$.ajax({
					type: "POST",
					url:"../base/ejecutasql.php",
					data:parametros,
					success: function(dataC){ cargarInformacion();}
				});
				
				}
			});			
}

function asignarProyecto (elid,idproy){
	parametros={tabla:"rescapproy",		       
	bd:"Mysql",
	campollave:"ID",
	valorllave:elid,			
	IDPROYECTO:idproy};  
	$.ajax({
			type: "POST",
			url:"../base/actualiza.php",
			data: parametros,
			success: function(data){ 
				$("#info").modal("hide");
				cargarInformacion();
				}
			});			
}



function agregarEmpresa(elid,rfc,empresa,i) {
	elsql="select count(*) from resempresas where IDPROP="+elid;
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
			if (JSON.parse(data)[0][0]<=0) {
				//Abrimos una notificación para el alumno
				parametros={tabla:"resempresas",RFC:arrEmpresas[i][0],NOMBRE:arrEmpresas[i][1],NOMBRECORTO:arrEmpresas[i][2],GIRO:arrEmpresas[i][3],
				SECTOR:arrEmpresas[i][4],REPRESENTANTE:arrEmpresas[i][5],MISION:arrEmpresas[i][6],VISION:arrEmpresas[i][7],DIRECCION:arrEmpresas[i][8],
				CORREO:arrEmpresas[i][9],ESTADO:arrEmpresas[i][10],MUNICIPIO:arrEmpresas[i][11],COLONIA:arrEmpresas[i][12],CP:arrEmpresas[i][13],
				USUARIO:arrEmpresas[i][14],FECHAUS:arrEmpresas[i][15],_INSTITUCION:arrEmpresas[i][16],_CAMPUS:arrEmpresas[i][17],TELEFONO:arrEmpresas[i][18],
				REGIMEN:arrEmpresas[i][19],IDPROP:arrEmpresas[i][20],	bd:"Mysql",
				};     
				$.ajax({
					type: "POST",
					url:"../base/inserta.php",
					data: parametros,
					success: function(data){
						elsql="select IDEMP from resempresas where IDPROP="+elid;
						parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){  
								asignarEmpresa(elid, JSON.parse(data)[0][0]);
							}
						});
					 }
				});

			}	
			else {
				alert ("La empresa de este registro ya fue dada de alta")
			}
		}
	});

}



function agregarProyecto(elid,i,arrProyectos){

	elsql="select count(*) from resproyectos where IDPROP="+elid;
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
			if (JSON.parse(data)[0][0]<=0) {
				//Abrimos una notificación para el alumno
				parametros={tabla:"resproyectos",CICLO:arrProyectos[i][0],CARRERA:arrProyectos[i][1],NUMPROY:arrProyectos[i][2],IDEMPRESA:arrProyectos[i][3],
				IDDEPTO:arrProyectos[i][4],ASESOREX:arrProyectos[i][5],PUESTOASEX:arrProyectos[i][6],REVISOR:arrProyectos[i][7],PROREVA:arrProyectos[i][8],
				PRODIC:arrProyectos[i][9],PROASIA:arrProyectos[i][10],ASESORINT1:arrProyectos[i][11],ASESORINT2:arrProyectos[i][12],ASESORINT3:arrProyectos[i][13],
				REVISOR1:arrProyectos[i][14],REVISOR2:arrProyectos[i][15],PROREVFA:arrProyectos[i][16],INICIA:arrProyectos[i][17],TERMINA:arrProyectos[i][18],
				NOMBRE:arrProyectos[i][19],NOMBRECORTO:arrProyectos[i][20],PRONRES:arrProyectos[i][21],HORARIO:arrProyectos[i][22],OBS:arrProyectos[i][23],
				_INSTITUCION:arrProyectos[i][24],_CAMPUS:arrProyectos[i][25],CORREOASEX:arrProyectos[i][26],USUARIO:arrProyectos[i][27],
				FECHAUS:arrProyectos[i][28],IDPROYSIE:arrProyectos[i][29],IDPROP:arrProyectos[i][30],						
				bd:"Mysql"
				};     
   
				$.ajax({
					type: "POST",
					url:"../base/inserta.php",
					data: parametros,
					success: function(data){
	
						elsql="select IDPROY from resproyectos where IDPROP="+elid;
						parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){  
								asignarProyecto(elid, JSON.parse(data)[0][0]);
							}
						});
					 }
				});

			}	
			else {
				alert ("El proyecto de este registro ya fue dada de alta")
			}
		}
	});

}



function asignarResidente (elid,idproy){
	parametros={tabla:"rescapproy",		       
	bd:"Mysql",
	campollave:"ID",
	valorllave:elid,			
	IDRESIDENCIA:idproy};  
	$.ajax({
			type: "POST",
			url:"../base/actualiza.php",
			data: parametros,
			success: function(data){ 
				$("#info").modal("hide");
				cargarInformacion();
				}
			});			
}



function agregarResidente(elid,i,arrResidentes){

	elsql="select count(*) from residencias where IDPROP="+elid;
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  
			if (JSON.parse(data)[0][0]<=0) {
				//Abrimos una notificación para el alumno
				parametros={tabla:"residencias",CICLO:arrResidentes[i][0],MATRICULA:arrResidentes[i][1],CARRERA:arrResidentes[i][2],RESOPC:arrResidentes[i][3],
				CARRERA2:arrResidentes[i][4],IDPROY:arrResidentes[i][5],RESFECS:arrResidentes[i][6],RESSOLR:arrResidentes[i][7],RESFECP:arrResidentes[i][8],
				REPORTE1:arrResidentes[i][9],REPORTE2:arrResidentes[i][10],RESPORTEF:arrResidentes[i][11],CALIF:arrResidentes[i][12],LIBERADO:arrResidentes[i][13],
				USUARIO:arrResidentes[i][14],FECHAUS:arrResidentes[i][15],_INSTITUCION:arrResidentes[i][16],_CAMPUS:arrResidentes[i][17],IDPROYECTO:arrResidentes[i][18],
				IDPROYSIE:arrResidentes[i][19],IDPROP:arrResidentes[i][20],						
				bd:"Mysql"
				};     

   
				$.ajax({
					type: "POST",
					url:"../base/inserta.php",
					data: parametros,
					success: function(data){
						elsql="select IDRES from residencias where IDPROP="+elid;
						parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
						$.ajax({
							type: "POST",
							data:parametros,
							url:  "../base/getdatossqlSeg.php",
							success: function(data){  
								asignarResidente(elid, JSON.parse(data)[0][0]);
							}
						});
					 }
				});

			}	
			else {
				alert ("El Residente de este registro ya fue dada de alta")
			}
		}
	});

}
