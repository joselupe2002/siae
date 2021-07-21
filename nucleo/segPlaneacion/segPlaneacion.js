var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;
var elprof="";
var materia="";
var ciclo="";
var grupo="";
var cargandoSubtemas=false;

var colores=["4,53,252","238,18,8","238,210,7","5,223,5","7,240,191","240,7,223","240,7,7","240,7,12"];



    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");


		$("#losciclos2").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclo","losciclos2","PROPIO", "SELECT CICL_CLAVE, concat(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by CICL_CLAVE DESC", "","");  	
		
		$("#losprofesores").append("<span class=\"label label-danger\">Profesor</span>");
		addSELECT("selProfesores","losprofesores","PROPIO", "SELECT EMPL_NUMERO, CONCAT(EMPL_NUMERO,' ',EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS NOMBRE  FROM pempleados  where EMPL_ACTIVO='S' order by EMPL_NOMBRE, EMPL_APEPAT, EMPL_APEMAT", "","BUSQUEDA");  	
		
		$("#lasmaterias").append("<span class=\"label label-danger\">Profesor</span>");
		addSELECT("selMaterias","lasmaterias","PROPIO", "select MATERIA, CONCAT(MATERIAD,'|',SIE) from vedgrupos where CICLO='0' AND PROFESOR='0'", "","BUSQUEDA");  	
		

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");

		actualizaSelect("selTipoCierre", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='AVPROGTIPTER' ORDER BY CATA_DESCRIP", "","");
		actualizaSelect("selTipoRetraso", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='AVPROGTIPRET' ORDER BY CATA_CLAVE", "","");
	
		
	});
	
	

		 
	function change_SELECT(elemento) {
		if (elemento=='selCiclo') {
			ciclo=$("#selCiclo").val(); 
			$("#elciclo").html($("#selCiclo").val());	
		}
		if (elemento=='selProfesores') {
			elprof=$("#selProfesores").val();			
			elql="select MATERIA, CONCAT(MATERIAD,'|',SIE) from vedgrupos where CICLO='"+$("#selCiclo").val()+"' AND PROFESOR='"+$("#selProfesores").val()+"'";
			actualizaSelect("selMaterias", elql, "BUSQUEDA","");  	
		}
		if (elemento=='selMaterias') {
			materia=$("#selMaterias").val();				
			grupo=$("#selMaterias option:selected").text().split("|")[1];				
		}
		
	}  



	function dameIcono(tipo) {
		ico="<i class=\"fa fa-refresh\" style=\"color:gray;\"></i> ";
		if (tipo=='T') {ico="<i class=\"fa fa-check green\"></i> ";}     
		if (tipo=='R') {ico="<i class=\"fa fa-check purple\"></i> ";}  
		if (tipo=='C') {ico="<i class=\"fa fa-times red \"></i> "; }    
		if (tipo=='P') {ico="<i class=\"fa fa-rotate-right pink \"></i> "; } 
		return ico;
	}

	


	function cargarProgramacion (){
		cargandoSubtemas=true;
		elsql="SELECT l.UNID_ID AS ID, l.UNID_PRED AS TMACVE, "+
		"IFNULL(PGRFERI,PGRFEPI) AS FECHAINIREAL, IFNULL(PGRFERT,PGRFEPT) FECHAFINREAL, "+
		"IFNULL(PGRFERIDA,PGRFEPI) AS FECHAINIREALDA, IFNULL(PGRFERTDA,PGRFEPT) FECHAFINREALDA, "+
		" UNID_DESCRIP as TEMA, UNID_NUMERO AS SMACVE, "+
	    " UNID_DESCRIP AS SUBTEMA, PGRFEPI AS FECHAINIPROG,  PGRFEPT AS FECHAFINPROG, TIPORETRASODA, "+
		" ifnull((select CATA_DESCRIP from scatalogos where CATA_TIPO='AVPROGTIPRET' AND CATA_CLAVE=TIPORETRASODA),'') AS TIPORETRASODAD,"+
		" OBSDA,TIPOCIERREDA, ifnull((select CATA_DESCRIP from scatalogos where CATA_TIPO='AVPROGTIPTER' AND CATA_CLAVE=TIPOCIERREDA),'') AS TIPOCIERREDAD,"+
		"ifnull(TIPORETRASO,'') as TIPORETRASO, ifnull((select CATA_DESCRIP from scatalogos where CATA_TIPO='AVPROGTIPRET' AND CATA_CLAVE=TIPORETRASO),'') AS TIPORETRASOD, "+
		"ifnull(TIPOCIERRE,'') as TIPOCIERRE, ifnull((select CATA_DESCRIP from scatalogos where CATA_TIPO='AVPROGTIPTER' AND CATA_CLAVE=TIPOCIERRE),'') AS TIPOCIERRED, OBS "+
      	" FROM eunidades l left outer join pgrupo on "+
		" (PDOCVE='"+ciclo+"' and MATCVE='"+materia+"' and GPOCVE='"+grupo+"' and TMACVE=UNID_PRED AND SMACVE=UNID_NUMERO)"+ 
		" where l.UNID_MATERIA='"+materia+"'  and l.UNID_PRED<>''"+
	  	" order by UNID_PRED,UNID_NUMERO ";



		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
		type: "POST",
		data:parametros,
		url:  "../base/getdatossqlSeg.php",
		success: function(data){    
			
				$("#cuerpoFechasProg").empty();
				$("#tabFechas").append("<tbody id=\"cuerpoFechasProg\">");
				c=1; 
				
		 		elTema=JSON.parse(data)[0]["TMACVE"];
		 
				$("#cuerpoFechasProg").append("<tr id=\"rowProg"+c+"\">");				
				$("#rowProg"+c).append("<td colspan=\"16\" ><span class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+elTema+" "+utf8Decode(JSON.parse(data)[0]["TEMA"])+"</span></td>");
				$("#rowProg"+c).append("</tr>");
				c++;

		  		jQuery.each(JSON.parse(data), function(clave, valor) { 

					if (!(elTema==valor.TMACVE)) {						
						$("#cuerpoFechasProg").append("<tr id=\"rowProg"+c+"\">");
						$("#rowProg"+c).append("<td colspan=\"16\"><span class=\"text-success\" style=\"font-size:11px; font-weight:bold;\">"+valor.TMACVE+" "+utf8Decode(valor.TEMA)+"</span></td>");
						$("#rowProg"+c).append("</tr>");
						elTema=valor.TMACVE;
						c++;
					}
		
					
			 		$("#cuerpoFechasProg").append("<tr id=\"rowProg"+c+"\">");   
					
					spico="<span id=\"ICO"+ciclo+materia+grupo+valor.ID+"\">"+dameIcono(valor.TIPOCIERREDA)+"</span>";

			 		$("#rowProg"+c).append("<td><span class=\"text-primary fontRobotoB\">"+spico+valor.SMACVE+" "+utf8Decode(valor.SUBTEMA)+"</span></td>");	   		          	             		         
			
					htmlfecini="<span class=\"label label-success label-white middle\">"+valor.FECHAINIPROG+"</span>";
					htmlfecfin="<span class=\"label label-danger label-white middle\">"+valor.FECHAFINPROG+"</span>";

					$("#rowProg"+c).append("<td>"+htmlfecini+"</td>");
					$("#rowProg"+c).append("<td>"+htmlfecfin+"</td>");	
				


					if (insertar=='S') {
							htmlfeciniR= "<div class=\"input-group\">"+
									"     <input onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','PGRFERIDA');\" "+
									"            value=\""+valor.FECHAINIREALDA+"\" class=\"form-control date-picker\" id=\"PGRFERIDA"+ciclo+materia+grupo+valor.ID+"\" "+
									"            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" style=\"width:85px;\"/> "+
									"     <span class=\"input-group-addon\"><i class=\"fa green fa-calendar bigger-110\"></i></span>"+
									"</div>";

									
							htmlfecfinR= "<div class=\"input-group\">"+
									"     <input onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','PGRFERTDA');\" "+
									"            value=\""+valor.FECHAFINREALDA+"\" class=\"form-control date-picker\" id=\"PGRFERTDA"+ciclo+materia+grupo+valor.ID+"\" "+
									"            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" style=\"width:85px;\"/> "+
									"     <span class=\"input-group-addon\"><i class=\"fa green fa-calendar bigger-110\"></i></span>"+
									"</div>";
							$("#rowProg"+c).append("<td>"+htmlfeciniR+"</td>");
							$("#rowProg"+c).append("<td>"+htmlfecfinR+"</td>");	


							$("#rowProg"+c).append("<td><select style=\"width:180px;\" id=\"TIPOCIERREDA"+ciclo+materia+grupo+valor.ID+"\" "+
							"onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','TIPOCIERREDA');\" class=\"form-control\"  id=\"selTipoCierre\"></select></td>");			                                   
							
							$("#rowProg"+c).append("<td><select style=\"width:180px;\" id=\"TIPORETRASODA"+ciclo+materia+grupo+valor.ID+"\" "+
							"onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','TIPORETRASODA');\" class=\"form-control\"  id=\"selTipoCierre\"></select></td>");			                                   

							$("#rowProg"+c).append("<td><textarea id=\"OBSDA"+ciclo+materia+grupo+valor.ID+"\" "+
							"onchange=\"guardaAvance('"+ciclo+"','"+materia+"','"+grupo+"','"+valor.TMACVE+"','"+valor.SMACVE+"','"+valor.ID+"','OBSDA');\" class=\"form-control\"  id=\"selTipoCierre\" style=\"width:180px;\" >"+valor.OBSDA+"</textarea></td>");			                                   
					}
					else {
						$("#rowProg"+c).append("<td><span class=\"text-primary\">"+valor.FECHAINIREALDA+"</td></span>");
						$("#rowProg"+c).append("<td><span class=\"text-primary\">"+valor.FECHAFINREALDA+"</td></span>");	
						$("#rowProg"+c).append("<td><span class=\"text-primary\">"+valor.TIPOCIERREDAD+"</td></span>");	
						$("#rowProg"+c).append("<td><span class=\"text-primary\">"+valor.TIPORETRASODAD+"</td></span>");	
						$("#rowProg"+c).append("<td><span class=\"text-primary\">"+valor.OBSDA+"</td></span>");			
					}



					$("#rowProg"+c).append("<td><span class=\"text-success\">"+valor.FECHAINIREAL+"</td></span>");
					$("#rowProg"+c).append("<td><span class=\"text-success\">"+valor.FECHAFINREAL+"</td></span>");	
					$("#rowProg"+c).append("<td><span class=\"text-success\">"+valor.TIPOCIERRED+"</td></span>");	
					$("#rowProg"+c).append("<td><span class=\"text-success\">"+valor.TIPORETRASOD+"</td></span>");	
					$("#rowProg"+c).append("<td><span class=\"text-success\">"+valor.OBS+"</td></span>");			
					$("#rowProg"+c).append("</tr>");    

					
					$("#TIPOCIERREDA"+ciclo+materia+grupo+valor.ID).html($("#selTipoCierre").html());	
					$("#TIPORETRASODA"+ciclo+materia+grupo+valor.ID).html($("#selTipoRetraso").html());	
	
					$("#TIPOCIERREDA"+ciclo+materia+grupo+valor.ID+" option[value='"+valor.TIPOCIERREDA+"']").attr("selected",true);						
					$("#TIPORETRASODA"+ciclo+materia+grupo+valor.ID+" option[value='"+valor.TIPORETRASODA+"']").attr("selected",true);						
					c++;					    			
				});	
							
			$('.date-picker').datepicker({autoclose: true,todayHighlight: true});		
			cargandoSubtemas=false;	//Para que no ejecute el procedimiento de grabar 

	  },
  error: function(data) {	  
			$('#dlgproceso').modal("hide");                 
			 alert('ERROR: '+data);  
		 }
 });
	}


	
function guardaAvance(ciclo,materia,grupo,tmacve, smacve,id,campo){
	
	if (!cargandoSubtemas) {
		//alert (campo+" "+ciclo+" "+materia+" "+grupo+" "+id+" "+tmacve+" "+smacve);
		elvalor=$("#"+campo+ciclo+materia+grupo+id).val();
		console.log(elvalor);
			parametros={
				tabla:"pgrupo",
				campollave:"concat(PDOCVE,MATCVE,GPOCVE,TMACVE,SMACVE)",
				valorllave:ciclo+materia+grupo+tmacve+smacve,
				nombreCampo:campo,
				valorCampo:elvalor,
				bd:"Mysql"};
			$('#dlgproceso').modal({backdrop: 'static', keyboard: false});	         
			$.ajax({
						type: "POST",
						url:"../base/actualizaDin.php",
						data: parametros,
						success: function(data){
							console.log(data);		
							if (campo=='TIPOCIERREDA') {$("#ICO"+ciclo+materia+grupo+id).html(dameIcono(elvalor));}
							$('#dlgproceso').modal("hide");    				       					           
						}					     
					}); 
	}
}
