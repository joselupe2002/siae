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
	
		script="<table id=\"tabMaterias\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headMaterias\">"+
		   "                <th>No.</th> "+
		   "                <th>ID.</th> "+
		   "                <th>Profesor</th> "+	
		   "                <th>Materia</th> "+	
		   "                <th>Sem</th> "+	
		   "                <th>GPO</th> "+
		   "                <th>UNID</th>"+
		   "                <th>Alum</th> ";
		   for (i=1; i<=10; i++) {
			script+="<th>%APR_U"+i+"</th><th>APR_U"+i+"</th><th>REP_U"+i+"</th>";
		  }	
		  script+="             </tr> "+
		   "            </thead>" +
		   "         </table>";
		   $("#aprovecha").empty();
		   $("#aprovecha").append(script);

		  

				
		elsql="select a.IDDETALLE, PROFESOR, PROFESORD, MATERIA, MATERIAD, SEMESTRE, SIE AS GRUPO, "+		      
		      "(select count(*) from eunidades where UNID_MATERIA=MATERIA and UNID_PRED='') AS NUMUNI"+
		      " from vedgrupos a where a.CICLO='"+$("#selCiclos").val()+"'"+ 
			  " and a.CARRERA="+$("#selCarreras").val()+"  ORDER BY SEMESTRE,MATERIAD";
	  
		mostrarEspera("esperahor","grid_avancegral","Cargando Datos...");
	    $.ajax({
	           type: "GET",
			   url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
	           success: function(data){  
				      			      
					generaTablaProfesores(JSON.parse(data));   
				  	
					for (i=1;i<contAlum;i++) {
							elsqlPaso="select IDGRUPO,count(*) AS N from dlista where IDGRUPO="+$("#IDDETALLE_"+i).html();															
							$.ajax({
								type: "GET",
								url:  "../base/getdatossql.php?bd=Mysql&sql="+elsqlPaso,
								success: function(dataPaso){  											      
									jQuery.each(JSON.parse(dataPaso), function(clavePaso, valorPaso) { 														
										$("#n_"+valorPaso.IDGRUPO).html(valorPaso.N);

										
										for (j=1; j<=$("#uni_"+valorPaso.IDGRUPO).html(); j++) {
											unidades+="SUM(IF (LISPA"+j+">=70,1,0)),";
										}

									
										if (unidades.length>0) {
												elsqlUni="select IDGRUPO,"+unidades.substring(0,unidades.length-1)+" from dlista where IDGRUPO="+valorPaso.IDGRUPO+
												"   GROUP BY IDGRUPO";																																	
												$.ajax({
													type: "GET",
													url:  "../base/getdatossql.php?bd=Mysql&sql="+elsqlUni,
													success: function(dataUni){  
														cont=0;	
														datosUnidades=JSON.parse(dataUni);										      
														jQuery.each(datosUnidades, function(claveUni, valorUni) { 
															
															for (k=1; k<=parseInt($("#uni_"+valorUni.IDGRUPO).html()); k++) {	
																	//alert ("#PROMU"+k+"_"+valorUni.IDGRUPO+" "+datosUnidades[0][k]+" "+datosUnidades[0][k]);													
																	
																	$("#APRU"+k+"_"+valorUni.IDGRUPO).html(datosUnidades[0][k]);
																	$("#REPU"+k+"_"+valorUni.IDGRUPO).html(parseInt($("#n_"+valorPaso.IDGRUPO).html())-parseInt($("#APRU"+k+"_"+valorUni.IDGRUPO).html()));
																	$("#PROMU"+k+"_"+valorUni.IDGRUPO).html(Math.round(parseInt($("#APRU"+k+"_"+valorUni.IDGRUPO).html())/
																	                                        parseInt($("#n_"+valorPaso.IDGRUPO).html())*100,2)+"%");
																	
			
																}															
														}); 													
													}
												});
											}		

									}); 													
								}
							});	
							
							unidades="";
							
							

					}
									
				ocultarEspera("esperahor");  
																	
			},
			error: function(dataMat) {	                  
					alert('ERROR: '+dataMat);
								}
	});	      	      					  					  		
}


function exportar (){
	$("#tabMaterias").tableExport();
}

function generaTablaProfesores(grid_data){
	
	contAlum=1;
	$("#cuerpoMaterias").empty();
	$("#tabMaterias").append("<tbody id=\"cuerpoMaterias\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contAlum).html()+" "+valor.PROFESOR);   			
		$("#cuerpoMaterias").append("<tr id=\"rowM"+contAlum+"\">");
		$("#rowM"+contAlum).append("<td>"+contAlum+"</td>");
		$("#rowM"+contAlum).append("<td id=\"IDDETALLE_"+contAlum+"\" style=\"font-size:10px;\">"+valor.IDDETALLE+"</td>");
		$("#rowM"+contAlum).append("<td id=\"Nalum_"+contAlum+"\" style=\"font-size:10px;\">"+valor.PROFESORD+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:10px;\">"+valor.MATERIAD+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:10px;\" id=\"uni_"+valor.IDDETALLE+"\">"+valor.NUMUNI+"</td>");
		
		evento="onclick=\"window.open('../pd_captcal/repUni.php?materia="+valor.MATERIA+"&grupo="+valor.GRUPO+
				"&ciclo="+$("#selCiclos").val()+"&profesor="+valor.PROFESOR+"&id="+valor.IDDETALLE+
				"&materiad="+valor.MATERIAD+"&semestre="+valor.SEMESTRE+"','_blank');\" ";
		
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><a "+evento+">"+
										"<span title=\"Click para ver reporte por Unidades\" style=\"cursor:pointer;\""+
										" class=\"badge badge-warning\">"+valor.GRUPO+"</span></a></td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\">"+valor.SEMESTRE+"</td>");
		$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><span class=\"badge  badge-info\" id=\"n_"+valor.IDDETALLE+"\"></span></td>");
		
		for (i=1; i<=10; i++) {
			$("#rowM"+contAlum).append("<td style=\"font-size:12px;\" ><span class=\"badge  badge-success\" id=\"PROMU"+i+"_"+valor.IDDETALLE+"\"> </span></td>");
			$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><i class=\"fa fa-hand-o-up blue bigger-130\"></i><span  id=\"APRU"+i+"_"+valor.IDDETALLE+"\"></span></td>");
			$("#rowM"+contAlum).append("<td style=\"font-size:12px;\"><i class=\"fa fa-hand-o-down red bigger-130\"></i><span id=\"REPU"+i+"_"+valor.IDDETALLE+"\"></span> </td>");
		}
	
		

		
		 
		
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
	    	        			
		$("#headMaterias").append("<th style=\"font-size:8px;\" class=\""+fondos[item]+"\" title=\""+valor.MATERIAD+"\" >"+
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

			$("#rowM"+i).append("<td class=\""+elfondo+"\" "+
			                         "title=\""+$("#Nalum_"+i).html()+"-"+$("#mat_"+j).attr("descrip")+"\""+
									 " style=\"text-align:center;\" "+
									 "id=\"celda_"+$("#alum_"+i).html()+"_"+$("#mat_"+j).html()+"\"></td>");
		}
	}
	
} 