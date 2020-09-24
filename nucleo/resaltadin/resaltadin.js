var id_unico="";
var estaseriando=false;
var matser="";
contAlum=1;
contMat=1;


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
				"                <th>Proyecto</th> "+
				"                <th>IDEMPRESA</th> "+
				"                <th>IDPROY</th> "+
				"                <th>IDASESOR</th> "+
				"                <th>ID</th> "+
				"                <th>RFC</th> "+
				"                <th>Nombre</th> "+
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

	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   	
		
		arreglo=[valor.EMPRESA]
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");

		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span onclick=\"buscar('"+valor.ID+"','"+valor.RFC+"','"+valor.EMPRESA+"')\" "+
								   "class=\"btn btn-white\"><i class=\"fa fa-search red bigger-160\"></i></span></td>");

		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span onclick=\"agregarEmpresa('"+valor.ID+"','"+valor.RFC+"','"+valor.EMPRESA+"','"++"')\" "+
								   "class=\"btn btn-white\"><i class=\"fa fa-home blue bigger-160\"></i></span></td>");

		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span onclick=\"agregarProyecto('"+valor.ID+"','"+valor.MATRICULA+"','"+valor.NOMBRE+"','0')\" "+
		                           "class=\"btn btn-white\"><i class=\"fa fa-tags green bigger-160\"></i></span></td>");
		
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.IDEMPRESA+"</span></td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.IDPROYECTO+"</span></td>");

		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><SELECT id=\"prof_"+valor.ID+"_cal"+"\"></SELECT></td>");

		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.ID+"</span></td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.RFC+"</span></td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-success\">"+valor.EMPRESA+"</span></td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-success\">"+valor.DEPARTAMENTO+"</span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.SECTOR+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.GIRO+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.TITULAR+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.DOMICILIO+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.ASESOREX+"</td>");

		$("#prof_"+valor.ID+"_cal").html($("#base").html());
		$("#prof_"+valor.ID+"_cal option[value='"+ valor.IDASESOR +"']").attr("selected",true);

	    contAlum++;      			
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


function agregarEmpresa() {

}





/*==============================================//////////////////////////////////////////========================*/
	function cargaMateriaRes (){
		elsql="select VMAT_MATERIA,VMAT_MATERIAD from vmatciclo a  where a.VMAT_TIPOMAT IN('RP') and a.CARRERA "+
			  " and a.CARRERA IN ('"+$("#selCarreras").val()+"')   AND a.VMAT_MAPA='"+$("#selMapas").val()+"'";


	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    mostrarEspera("esperahor","grid_ecomplcal","Cargando Datos...");
	    $.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  
				$("#lamateria").html(JSON.parse(data)[0][0]);
				$("#lamateriad").html(JSON.parse(data)[0][1]);
				ocultarEspera("esperahor");
		   }
		});
	}


/*===========================================================POR MATERIAS ==============================================*/
    



function guardarCal (elid,matricula,nombre,lacal){
	if (lacal==0) { c12="9"; calasig=$("#"+matricula+"_cal").val();} else {calasig='60'; c12="";}
	if (confirm("¿Seguro que desea asignar Cal: "+calasig+" a la Asignatura: "+nombre+"?")) {
		fecha=dameFecha("FECHAHORA");
		parametros={tabla:"dlista",		       
				bd:"Mysql",
				campollave:"ID",
				valorllave:elid,			
				LISCAL:calasig,
				CERRADO:"S",
				TCACVE:"1",
				LISTC12:c12,
				USUARIO: usuario,
				FECHAINS:fecha,
				_INSTITUCION: institucion, 
				_CAMPUS: campus,
				TIPOCAL:"9999"};
				$('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
				$.ajax({
						type: "POST",
						url:"../base/actualiza.php",
						data: parametros,
						success: function(data){ 
								parametros={tabla:"wa_bitacora",
								bd:"Mysql",
								CICLO:$("#selCiclos").val(),
								USUARIO:usuario,
								MATERIA:$("#lamateria").html(), 
								GRUPO:"REV", 
								PROFESOR:"9999",
								MATRICULA: matricula,
								CALIFICACION:$("#"+matricula+"_cal").val(),						
								FECHA_REG: fecha,
								_INSTITUCION: institucion, 
								_CAMPUS: campus};	
							$.ajax({
									type: "POST",
									url:"../base/inserta.php",
									data: parametros,
									success: function(data){ 	
									cargarInformacion();        		        	 
								}
							});
							}
						});			
		}		
}




function generaMateriasRev(grid_data){	
	contAlum=1;
	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   			
		$("#tabActividad").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.ID+"</span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.MATERIA+"</td>");	
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.MATERIAD+"</td>");	
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-success\">"+valor.CAL+"</span></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span onclick=\"guardarCal('"+valor.ID+"','"+valor.MATRICULA+"','"+valor.MATERIAD+"','60')\" "+
		                           "class=\"btn btn-white\"><i class=\"fa fa-times red bigger-160\"></i></span></td>");		
		contAlum++;    		
	});	
} 


function eliminarCal(id, materiad){
	if(confirm("Seguro que desea eliminar la Calificación de la Materia: "+materiad)) 
		 {
				 var parametros = {
							tabla : "dlista",
							bd:"Mysql",
	    	                campollave : "ID",
	    	                valorllave : id
	    	        };
	    	        $.ajax({
	    	            data:  parametros,
	    	            url:   '../base/eliminar.php',
	    	            type:  'post',          
	    	            success:  function (response) {  
							$("#modalDocument").modal("hide");		        
							cargarInformacion();
	    	            }
	    	    });
		}

    }



	function verOficio(matricula){

	    window.open("oficioLib.php?matricula="+matricula+"&ciclo="+$("#selCiclos").val(),"_blank");
			
	}	