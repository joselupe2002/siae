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
			  
		$("#losmapas").append("<span class=\"label label-warning\">Mapa Curricular</span>");
		addSELECT("selMapas","losmapas","PROPIO", "SELECT MAPA_CLAVE, CONCAT(MAPA_CLAVE,' ',MAPA_DESCRIP) from mapas  WHERE MAPA_CARRERA=0 order by MAPA_CLAVE", "","");  			      
		      

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selCarreras') {	
			$("#loshorarios").empty();
			actualizaSelect("selMapas","SELECT MAPA_CLAVE, CONCAT(MAPA_CLAVE,' ',MAPA_DESCRIP) from mapas  WHERE MAPA_CARRERA="+$("#selCarreras").val()+" order by MAPA_CLAVE DESC", "","");  			      
	
		}  
		if (elemento=='selMapas') {	
			$("#loshorarios").empty();
			cargaMateriaRes ();
		}  
	}
	
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
    function cargarInformacion(){
		
		elsql="select k.ID, MATRICULA, NOMBRE, PROYECTO, ASESOR, CALIF, "+
		"IFNULL((select LISCAL FROM dlista where ALUCTR=MATRICULA AND MATCVE='"+$("#lamateria").html()+"' AND LISCAL>=70),'') CALASEN "+
		" from vresidencias j, dlista k  where j.MATRICULA=k.ALUCTR AND k.PDOCVE=j.CICLO AND k.MATCVE='"+$("#lamateria").html()+"'"+
	    " AND j.CICLO='"+$("#selCiclos").val()+
		"' and j.CARRERA='"+$("#selCarreras").val()+"'";
	
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  				      			      
				 $("#elmapa").html(JSON.parse(data)[0]["ALUM_MAPA"]);  
				 $("#laesp").html(JSON.parse(data)[0]["ESP"]);  
				 $("#laespd").html(JSON.parse(data)[0]["ESPD"]);  
				 
				 script="<table id=\"tabMaterias\" name=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
				"        <thead >  "+
				"             <tr id=\"headMaterias\">"+
				"                <th>No.</th> "+
				"                <th>ID.</th> "+
				"                <th>Matricula</th> "+
				"                <th>Nombre</th> "+						
				"                <th>Asesor</th> "+	
				"                <th>Cal.</th> "+	
				"                <th>Guardar</th> "+	
				"                <th>Proyecto</th> "+		   
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
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.ID+"</span></td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-info\">"+valor.MATRICULA+"</span></td>");
		$("#rowM"+contAlum).append("<td> <span class=\"badge  badge-success\">"+valor.NOMBRE+"</span></td>");
		
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.ASESOR+"</td>");
		if (valor.CALASEN=='') {
			$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><SELECT id=\""+valor.MATRICULA+"_cal"+"\"></SELECT></td>");
			$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span onclick=\"guardarCal('"+valor.ID+"','"+valor.MATRICULA+"','"+valor.NOMBRE+"','0')\" "+
		                           "class=\"btn btn-white\"><i class=\"fa fa-save red bigger-160\"></i></span></td>");
		}
		else {
			$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span class=\"badge badge-success\">"+valor.CALASEN+"</span></td>");
			$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+
											 //"<input  placeholder=\"Folio\" id=\"folio"+valor.MATRICULA+"\" class=\"fontRoboto\" style=\"width:40px;\"></input>&nbsp;&nbsp;"+
											 "<span onclick=\"OficioPersonalizado('"+valor.MATRICULA+"');\" "+
		                                     "title=\"Ver oficio personalizado\" class=\"btn btn-white\"><i class=\"fa fa-file blue  bigger-160\"></i></span>"+
										     "<span onclick=\"verOficio('"+valor.MATRICULA+"','N','0');\" "+
		                                     "title=\"Ver oficio\" class=\"btn btn-white\"><i class=\"fa fa-file-text-o green  bigger-160\"></i></span></td>");
		}
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.PROYECTO+"</td>");	
		
		$("#"+valor.MATRICULA+"_cal").html($("#base").html());
		$("#"+valor.MATRICULA+"_cal option[value="+ valor.CALIF +"]").attr("selected",true);
	    contAlum++;      			
	});	
} 



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


function verCalificaciones() {
	$("#modalDocument").modal("hide");

	script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
    "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header widget-header  widget-color-green\">"+
	   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Alumno:"+$("#selAlumnos option:selected").text()+"</span></b> </span>"+
	   "             <button type=\"button\" class=\"close\"  data-dismiss=\"modal\"   aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "          </div>"+  
	   "          <div id=\"frmdescarga\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto;\" >"+					  
	   "             <div class=\"row\"> "+		
       "                  <table id=\"tabActividad\" class= \"table table-condensed table-bordered table-hover\">"+
	   "                         <thead>  "+
	   "                               <tr>"+
	   "                             	   <th>No</th> "+
	   "                             	   <th>Id</th> "+
	   "                             	   <th>Clave</th> "+
	   "                             	   <th>Materia</th> "+  
	   "                             	   <th>Cal</th> "+
	   "                                   <th>Eliminar</th> "+
	   "                               </tr> "+
	   "                         </thead>" +
	   "                   </table>"+	
	   "             </div> "+ //div del row
	   "          </div>"+ //div del modal-body		 
       "        </div>"+ //div del modal content		  
	   "      </div>"+ //div del modal dialog
	   "   </div>"+ //div del modal-fade
	   "</div>";

	 $("#modalDocument").remove();
     if (! ( $("#modalDocument").length )) {
          $("#grid_rescalifica").append(script);
	 }
	  
    $('#modalDocument').modal({show:true, backdrop: 'static'});

	elsql="select ALUCTR AS MATRICULA, ID AS ID, MATCVE AS MATERIA, MATE_DESCRIP AS MATERIAD, LISCAL AS CAL "+
	    " from dlista a, cmaterias b where MATCVE=MATE_CLAVE AND MATCVE='"+$("#lamateria").html()+"'"+
		" and LISTC12='9' AND a.PDOCVE='"+$("#selCiclos").val()+"' ORDER BY ID DESC";

	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  
				generaMateriasRev(JSON.parse(data));
				ocultarEspera("esperahor"); 
			},
			error: function(data) {	                  
					alert('ERROR: '+data);
				}
			});
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



	function verOficio(matricula,confolio,folio,fecha){
		
		enlace="nucleo/rescalifica/oficioLib.php?matricula="+matricula+"&ciclo="+$("#selCiclos").val()+
		"&folio="+folio+"&confolio="+confolio+"&fecha="+fecha;


		abrirPesta(enlace,"Oficio")
	
			
	}	

	function OficioPersonalizado(matricula){		
		mostrarConfirm2("pidefec","grid_rescalifica","Oficio Personalizado",
		"<div class=\"row\" style=\"text-align:left;\">"+
			"<div class=\"col-sm-6\"> "+
				"<label class=\"fontRobotoB label label-success\">Fecha de Oficio</label>"+
				" <div class=\"input-group\"><input  class=\"form-control date-picker\"  id=\"lafecha\" "+
					" type=\"text\" autocomplete=\"off\"  data-date-format=\"dd/mm/yyyy\" /> "+
					" <span class=\"input-group-addon\"><i class=\"fa fa-calendar bigger-110\"></i></span></div>"+
			"</div>"+
			"<div class=\"col-sm-6\"> "+
				"<label class=\"fontRobotoB label label-success\" >Folio de Oficio</label>"+
				"<input class=\"form-control\" id=\"elfolio\"></input>"+
			"</div>"+
		"</div>"
			, "Ver Oficio", "verOficioP('"+matricula+"')", "modal-sm");
		
		$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
			
	}	


	function verOficioP(matricula){
		verOficio(matricula,'S',$("#elfolio").val(),$("#lafecha").val());
		$("#pidefec").modal("hide");
			
	}	
