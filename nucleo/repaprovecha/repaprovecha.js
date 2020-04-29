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
		
		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc order by cicl_clave desc", "","");  			      
	

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
		if (elemento=='selCarreras') {	
			$("#loshorarios").empty();	
		}  
    }


    function cargarMaterias(){
	
		script="<table id=\"tabAvances\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headAvances\">"+
		   "                <th>No.</th> "+
		   "                <th>Profesor</th> "+	
		   "                <th>Materia</th> "+	
		   "                <th>U1</th> "+
		   "                <th>U2</th> "+
		   "                <th>U3</th> "+
		   "                <th>U4</th> "+
		   "                <th>U5</th> "+
		   "                <th>U6</th> "+
		   "                <th>U7</th> "+
		   "                <th>U8</th> "+
		   "                <th>U9</th> "+
		   "                <th>U10</th> "+	
		   "             </tr> "+
		   "            </thead>" +
		   "         </table>";
		   $("#losAvances").empty();
		   $("#losAvances").append(script);
				
		elsql="SELECT distinct ALUM_MATRICULA, concat(ALUM_APEPAT,' ',ALUM_APEMAT, ' ',ALUM_NOMBRE) AS NOMBRE,"+
		" getPeriodos(ALUM_MATRICULA,'"+$("#elciclo").html()+"') as PERIODOS  FROM "+
		" dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA and PDOCVE='"+$("#elciclo").html()+"'"+
		cadPeriodo+
		" and b.ALUM_CARRERAREG="+$("#selCarreras").val()+" and b.ALUM_MAPA='"+$("#selPlanes").val()+"' ORDER BY ALUM_MATRICULA";
		mostrarEspera("esperahor","grid_avancegral","Cargando Datos...");
	    $.ajax({
	           type: "GET",
			   url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
	           success: function(data){  				      
					  generaTablaAvances(JSON.parse(data));   
						 
					   elsqlMat="select CICL_MATERIA as MATERIA, CICL_MATERIAD AS MATERIAD, CICL_CUATRIMESTRE AS SEMESTRE, "+
								"IFNULL(CVEESP,0) as CVEESP from veciclmate a where a.CICL_MAPA='"+$("#selPlanes").val()+"'"+
								" AND IFNULL(CICL_TIPOMAT,0) NOT IN ('T') "+
								" order by IFNULL(CVEESP,0),CICL_CUATRIMESTRE, CICL_MATERIAD ";
						$.ajax({
							type: "GET",
							url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsqlMat),
							success: function(dataMat){  											      
									generaTablaMaterias(JSON.parse(dataMat));  
									
									for (i=1;i<contAlum;i++) {
										elsqlPaso="select ALUCTR,MATCVE, IF(MAX(PDOCVE)='"+$("#elciclo").html()+"','A','C') AS CICLO, max(LISCAL) AS LISCAL, count(*) as VECES "+
										" from dlista n where ALUCTR='"+$("#alum_"+i).html()+"'"+ 
										" group by ALUCTR,MATCVE";	
														
											$.ajax({
												type: "GET",
												url:  "../base/getdatossql.php?bd=Mysql&sql="+elsqlPaso,
												success: function(dataPaso){  											      
													jQuery.each(JSON.parse(dataPaso), function(clavePaso, valorPaso) { 														
														for (j=1;j<contMat;j++) {														
															if (valorPaso.MATCVE==$("#mat_"+j).html()) {
																if  (valorPaso.CICLO=='A') { // asignaturas del ciclo A = Acctual 
																	$("#celda_"+valorPaso.ALUCTR+"_"+valorPaso.MATCVE).html("<i class=\"fa green fa-thumbs-up bigger-160\"><i>"); 														
																}
																if ((valorPaso.CICLO=='C') && (valorPaso.LISCAL>=70)) {
																	  $("#celda_"+valorPaso.ALUCTR+"_"+valorPaso.MATCVE).html("<i class=\"fa blue fa-check bigger-160\"><i>"); 															
																} 
																if ((valorPaso.CICLO=='C') && (valorPaso.LISCAL<70)) {
																	$("#celda_"+valorPaso.ALUCTR+"_"+valorPaso.MATCVE).html("<i class=\"fa red fa-check bigger-160\"><i>"); 															
															     }
																$("#celda_"+valorPaso.ALUCTR+"_"+valorPaso.MATCVE).append("<span class=\"small text-danger\">"+valorPaso.VECES+"<span>"); 
																//alert (valorPaso.ALUCTR+" "+ valorPaso.MATCVE+" "+$("#celda_"+valorPaso.ALUCTR+"_"+valorPaso.MATCVE).html()+ " ");
																break;
															}
														}
													}); 
													
												}
											});																				
									}
									
									ocultarEspera("esperahor");  
									   	      					  					  
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
	colorSem=["success","warning","danger","info","purple","inverse","pink","yellow","grey","success"];
	fondos=["bg-success","bg-danger","bg-warning","bg-primary","bg-yellow","bg-purple","bg-info","bg-inverse","bg-grey","bg-pink"];
	jQuery.each(grid_data, function(clave, valor) { 
		if (valor.CVEESP=='0') {item=0; esplan='S';}
		else {item=(valor.CVEESP%10)+1; esplan='N';}
	    	        			
		$("#headAvances").append("<th style=\"font-size:8px;\" class=\""+fondos[item]+"\" title=\""+valor.MATERIAD+"\" >"+
								"<span class=\"materias\" id=\"mat_"+contMat+"\" esplan=\""+esplan+"\" "+
									   "fondo=\""+fondos[item]+"\" descrip=\""+valor.MATERIAD+"\" >"+valor.MATERIA+
								"</span>"+
								"<span class=\"badge badge-"+colorSem[valor.SEMESTRE]+"\" >"+valor.SEMESTRE+
								"</span>"+								
							     "</th>");	    
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