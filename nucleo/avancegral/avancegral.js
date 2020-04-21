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

		$("#lascarreras").append("<span class=\"label label-warning\">Carrera</span>");
		 
		$.ajax({
			type: "GET",
			url:  "../base/getSesion.php?bd=Mysql&campo=carrera",
			success: function(data){  
				addSELECT("selCarreras","lascarreras","PROPIO", "SELECT CARR_CLAVE, CARR_DESCRIP FROM ccarreras where CARR_ACTIVO='S'"+
				" and CARR_CLAVE IN ("+data+")", "",""); 
				},
			error: function(data) {	                  
					   alert('ERROR: '+data);
					   $('#dlgproceso').modal("hide");  
				   }
		   });
		
		$("#losplanes").append("<span class=\"label label-danger\">Plan de estudios</span>");
		addSELECT("selPlanes","losplanes","PROPIO", "SELECT MAPA_CLAVE,MAPA_DESCRIP FROM mapas where MAPA_CLAVE='0'", "","");  			      
	 
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
        if (elemento=='selCarreras') {
			actualizaSelect("selPlanes","select MAPA_CLAVE, CONCAT(MAPA_CLAVE, ' ', MAPA_DESCRIP) from mapas l where "+
		                    "l.MAPA_CARRERA='"+$("#selCarreras").val()+"' AND l.MAPA_ACTIVO='S'");
			}
		if (elemento=='selCarreras') {	
			$("#loshorarios").empty();	
		}
		if (elemento=='selPlanes') {
			cargarAvances();		
		}
        
    }


    function cargarAvances(){
		
		script="<table id=\"tabAvances\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headAvances\">"+
		   "                <th>No.</th> "+
		   "                <th>Control</th> "+	
		   "                <th>Nombre</th> "+	
		   "                <th>Per</th> "+		
		   "             </tr> "+
		   "            </thead>" +
		   "         </table>";
		   $("#losAvances").empty();
		   $("#losAvances").append(script);
				
		elsql="SELECT distinct ALUM_MATRICULA, concat(ALUM_APEPAT,' ',ALUM_APEMAT, ' ',ALUM_NOMBRE) AS NOMBRE,"+
		" getPeriodos(ALUM_MATRICULA,'"+$("#elciclo").html()+"') as PERIODOS  FROM "+
		" dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA and PDOCVE='"+$("#elciclo").html()+"'"+
		" and b.ALUM_CARRERAREG="+$("#selCarreras").val()+" and b.ALUM_MAPA='"+$("#selPlanes").val()+"' ORDER BY ALUM_MATRICULA";
		mostrarEspera("esperahor","grid_horarios","Cargando Horarios...");
	    $.ajax({
	           type: "GET",
			   url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
	           success: function(data){  				      
					  generaTablaAvances(JSON.parse(data));   
						 
					   elsqlMat="select CICL_MATERIA as MATERIA, CICL_MATERIAD AS MATERIAD, CICL_CUATRIMESTRE AS SEMESTRE, "+
								"IFNULL(CVEESP,0) as CVEESP from veciclmate a where a.CICL_MAPA='"+$("#selPlanes").val()+"'"+
								" AND IFNULL(CICL_TIPOMAT,0) NOT IN ('T') "
					            " order by CICL_CUATRIMESTRE, CICL_MATERIAD ";
						$.ajax({
							type: "GET",
							url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsqlMat),
							success: function(dataMat){  											      
									generaTablaMaterias(JSON.parse(dataMat));  
									
									for (i=1;i<contAlum;i++) {
										elsqlPaso="select ALUCTR,MATCVE, IF(PDOCVE='"+$("#elciclo"+i).html()+"','A','C') AS CICLO, max(LISCAL) AS LISCAL, count(*) as VECES "+
										" from dlista n where ALUCTR='"+$("#alum_"+i).html()+"'"+ 
										" group by ALUCTR,MATCVE";							
											$.ajax({
												type: "GET",
												url:  "../base/getdatossql.php?bd=Mysql&sql="+elsqlPaso,
												success: function(dataPaso){  											      
													jQuery.each(JSON.parse(dataPaso), function(clavePaso, valorPaso) { 														
														for (j=1;j<contMat;j++) {														
															if (valorPaso.MATCVE==$("#mat_"+j).html()) {
																if (valorPaso.CICLO=='C') {
																	$("#celda_"+valorPaso.ALUCTR+"_"+valorPaso.MATCVE).html("<i class=\"fa green fa-thumbs-up bigger-160\"><i>"); 														
																}
																if (valorPaso.LISCAL>=70) {
																	  $("#celda_"+valorPaso.ALUCTR+"_"+valorPaso.MATCVE).html("<i class=\"fa blue fa-check bigger-160\"><i>"); 															
																}
																$("#celda_"+valorPaso.ALUCTR+"_"+valorPaso.MATCVE).append("<span class=\"small text-danger\">"+valorPaso.VECES+"<span>"); 
																//alert (valorPaso.ALUCTR+" "+ valorPaso.MATCVE+" "+$("#celda_"+valorPaso.ALUCTR+"_"+valorPaso.MATCVE).html()+ " ");
																break;
															}
														}
													}); 
													ocultarEspera("esperahor");  
												}
											});																				
									}								
									   	      					  					  
								},
								error: function(dataMat) {	                  
										alert('ERROR: '+dataMat);
													}
						});	      	      					  					  
	            },
	        	error: function(data) {	                  
	        	   	    alert('ERROR: '+data);
	        	   	                  }
	    });	        	   	   	        	    	 
		
}


function generaTablaAvances(grid_data){
	contAlum=1;
	$("#cuerpoAvances").empty();
	$("#tabAvances").append("<tbody id=\"cuerpoAvances\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 	        			
		$("#cuerpoAvances").append("<tr id=\"rowA"+contAlum+"\">");
		
		$("#rowA"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowA"+contAlum).append("<td id=\"alum_"+contAlum+"\" style=\"font-size:10px;\">"+valor.ALUM_MATRICULA+"</td>");
		$("#rowA"+contAlum).append("<td id=\"Nalum_"+contAlum+"\" style=\"font-size:10px;\">"+valor.NOMBRE+"</td>");
		$("#rowA"+contAlum).append("<td style=\"font-size:10px;\"><span class=\"badge  badge-info\">"+valor.PERIODOS+"</span></td>");

	    contAlum++;      			
	});	
	
} 



function generaTablaMaterias(grid_data){
	contMat=1;
	//$("#btnfiltrar").attr("disabled","disabled");
	
	jQuery.each(grid_data, function(clave, valor) { 
		if (valor.CVEESP=='0') {item=0; esplan='S';}
		else {item=(valor.CVEESP%10)+1; esplan='N';}
	    fondos=["bg-success","bg-danger","bg-warning","bg-primary","bg-yellow","bg-purple","bg-info"];	        			
		$("#headAvances").append("<th style=\"font-size:8px;\" class=\""+fondos[item]+"\" title=\""+valor.MATERIAD+"\" "+
								"class=\"materias\" id=\"mat_"+contMat+"\" esplan=\""+esplan+"\" fondo=\""+fondos[item]+"\" descrip=\""+valor.MATERIAD+"\" >"+valor.MATERIA+"</th>");	    
	    contMat++;   			
	});	
	for (i=1;i<contAlum;i++) {
		for (j=1; j<contMat; j++) {
			if ($("#mat_"+j).attr("esplan")=='S') {elfondo="";}
			else {elfondo=$("#mat_"+j).attr("fondo");}

			$("#rowA"+i).append("<td class=\""+elfondo+"\" "+
			                         "title=\""+$("#Nalum_"+i).html()+"-"+$("#mat_"+j).attr("descrip")+"\""+
									 " style=\"text-align:center;\" "+
									 "id=\"celda_"+$("#alum_"+i).html()+"_"+$("#mat_"+j).html()+"\"></td>");
		}
	}
	
} 