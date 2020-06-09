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
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc order by cicl_clave desc", "","");  			      
	
		$("#losoficios").append("<span class=\"label label-warning\">Oficios</span>");
		addSELECT("selOficios","losoficios","PROPIO", "SELECT CONT_NUMOFI,CONCAT(CONT_NUMOFI,'|',SUBSTRING_INDEX(CONT_CONTROL,'-',1)) from contoficios WHERE CONT_TIPO='COMPLEMENTARIAS' ORDER BY CONT_SOLO DESC", "","BUSQUEDA");  			      

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");

		addSELECT("selPondera","aux","PROPIO", "SELECT VALOR,DESCRIP AS DESCRIP from eponderacion where TIPO='ACTCOMPL' ORDER BY VALOR", "","NORMAL");  			      
	
	});
	

		 
	function change_SELECT(elemento) {
		if (elemento=='selCarreras') {	
			$("#loshorarios").empty();
				
		}  
		
		if (elemento=="selOficios") {			
			cargaMateriaCom();
		}
	}

	function cargaMateriaCom (){
		elsql="select VMAT_MATERIA,VMAT_MATERIAD from vmatciclo a  where a.VMAT_TIPOMAT IN('AC') and a.CARRERA "+
			  " and a.CARRERA IN (SELECT CARRERA from fures WHERE URES_URES="+$("#selOficios option:selected").text().split("|")[1]+") ";
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





	function verOficio(matricula){
	    window.open("oficioLib.php?matricula="+matricula,"_blank");
			
	}	

/*===========================================================POR MATERIAS ==============================================*/
    function cargarInformacion(){
		
	elsql="select CONT_INFO from contoficios WHERE CONT_NUMOFI='"+$("#selOficios").val()+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	mostrarEspera("esperahor","grid_ecomplcal","Cargando Datos...");
	$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){  	

			lasmat=JSON.parse(data)[0]["CONT_INFO"].replace(/,/gi,"','");
			elsql="select * from ivcomplalum n where n.MATRICULA in ('"+lasmat+"')";
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
						"                <th>No.</th> "+
						"                <th>No. Control</th> "+
						"                <th>Nombre</th> "+		
						"                <th>Carrera</th> "+
						"                <th>Créditos</th> "+	
						"                <th>Promedio</th> "+	
						"                <th>Guardar</th> "+	
						"                <th>Oficio</th> "+		   
						"             </tr> "+
						"            </thead>" +
						"         </table>";
						$("#informacion").empty();
						$("#informacion").append(script);

						generaTablaMaterias(JSON.parse(data));   													
						ocultarEspera("esperahor");  																											
					},
					error: function(dataMat) {	                  
							alert('ERROR: '+dataMat);
										}
				});	      	      																	
																																	
			},
			error: function(dataMat) {	                  
					alert('ERROR: '+dataMat);
								}
			});	      	      					  
			  					  		
}

function generaTablaMaterias(grid_data){	
	contAlum=1;

	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   			
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td>"+valor.MATRICULA+"</td>");
		$("#rowM"+contAlum).append("<td>"+valor.NOMBRE+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.CARRERAD+"</td>");	
		$("#rowM"+contAlum).append("<td id=\"rutas"+valor.MATRICULA+"\"><span class=\"badge  badge-info\">"+valor.NUMCRED+"</span> | </td>");

		elsql="SELECT IDCAL, COMP_LIBERACION, CREDITOS from vecompl_cal n where n.PROM>1 AND MATRICULA='"+valor.MATRICULA+"'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(dataCred){							
				jQuery.each(JSON.parse(dataCred), function(claveCred, valorCred) { 
					$("#rutas"+valor.MATRICULA).append("<a id=\"C_"+valorCred.IDCAL+"\" href=\""+valorCred.COMP_LIBERACION+"\" target=\"_blank\"  >"+
					"<span id=\"B_"+valorCred.IDCAL+"\"  class=\"badge badge-danger\">"+valorCred.CREDITOS+"</span></a>")					
								
				
				if ((valorCred.COMP_LIBERACION=='') ||  (valorCred.COMP_LIBERACION==null) ) { 
																	
					$('#C_'+valorCred.IDCAL).click(function(evt) {evt.preventDefault();});	
					$('#B_'+valorCred.IDCAL).removeClass("badge-danger");	
					$('#B_'+valorCred.IDCAL).addClass("badge-gray");	
				  }
				});

			}
        });
		
		elpromedio=Math.round(valor.PROM);
		et=$("#selPondera option[value='"+elpromedio+"']").html();
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"> <span class=\"badge  badge-success\">"+elpromedio+"</span>"+
		                           "<span class=\"badge  badge-warning\">"+et+"</span></td>");
		
		btnCod="<span title=\"Asignar calificación de Actividad Complementaria al Alumnos\" "+
		       " id=\"btnGuardar"+valor.MATRICULA+"\" onclick=\"guardarCal('"+valor.MATRICULA+"','"+elpromedio+"','"+et+"','"+valor.NOMBRE+"')\" "+
		       "class=\"btn btn-white\"><i class=\"fa fa-save blue bigger-160\"></i></span>";

        if (valor.CAPT_SIE==1) {
			btnCod="<span title=\"La calificación ya se asigno ¿Click para eliminarla?\" "+
			       "id=\"btnGuardar"+valor.MATRICULA+"\" onclick=\"eliminarCal('"+valor.MATRICULA+"','"+valor.NOMBRE+"')\" "+
				   "class=\"btn btn-white\"><i class=\"fa fa-times red bigger-160\"></i></span>";
		}

				
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+btnCod+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span onclick=\"verOficio('"+valor.MATRICULA+"')\" "+
		                           "title=\"Imprimir Oficio de Liberación\" class=\"btn btn-white\"><i class=\"fa fa-file-text blue bigger-160\"></i></span></td>");

		//						   $("#"+valor.MATERIA+"_cal").html($("#base").html());
		
	    contAlum++;      			
	});	
} 



function guardarCal (matricula,lacal,laletra, alumno){
    alert ("entre a guardas");
	if (confirm("¿Seguro que desea asignar la Cal al alumno: "+alumno+"?")) {
		elsql="select VMAT_MATERIA from vmatciclo a, falumnos b where b.ALUM_MAPA=a.VMAT_MAPA AND a.VMAT_TIPOMAT in ('AC') AND b.ALUM_MATRICULA='17E40113' ";
	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    mostrarEspera("esperahor","grid_ecomplcal","Cargando Datos...");
	 
				materia=$("#lamateria").html();
				fecha=dameFecha("FECHAHORA");
		        parametros={tabla:"dlista",
							bd:"Mysql",
							PDOCVE:$("#selCiclos").val(),
							ALUCTR:matricula,
							MATCVE:materia, 
							GPOCVE:"REV", 
							LISCAL:100,
							TCACVE:1,
							LISTC15:"9999",
							USUARIO: usuario,
							FECHAINS:fecha,
							_INSTITUCION: institucion, 
							_CAMPUS: campus,
							BAJA: "N",
							TIPOCAL:1};
				$.ajax({
						type: "POST",
						url:"../base/inserta.php",
						data: parametros,
						success: function(data){ 
								parametros={tabla:"ecalcertificado",
								bd:"Mysql",
								CICLO:$("#selCiclos").val(),
								MATRICULA:matricula,
								MATERIA:materia,
								CAL:100, 
								CALCER:lacal, 
								CALLET:laletra,
								CALTIPO:"AC",
								USUARIO:usuario,						
								FECHA: fecha,
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

		
		} //del if 		
}


function eliminarCal (matricula,alumno){

	if (confirm("¿Seguro que desea elimnar la Cal. Asignada al alumno: "+alumno+"?")) {
	
		materia=$("#lamateria").html();
	
	    mostrarEspera("esperahor","grid_ecomplcal","Cargando Datos...");
		parametros={tabla:"dlista",
					bd:"Mysql",					
					campollave:"concat(ALUCTR,MATCVE)",
					valorllave:matricula+materia};
		$.ajax({
					type: "POST",
					url:"../base/eliminar.php",
					data: parametros,
					success: function(data){ 
						parametros={tabla:"ecalcertificado",
									bd:"Mysql",					
									campollave:"concat(MATRICULA,MATERIA)",
									valorllave:matricula+materia};
						$.ajax({
							type: "POST",
							url:"../base/eliminar.php",
							data: parametros,
							success: function(data){ 					
								cargarInformacion(); 
							}
						});
									
					}
				});
		} //del if 	
	
}

