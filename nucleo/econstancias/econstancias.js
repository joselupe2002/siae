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

		$("#losalumnos").append("<span class=\"label label-info\">Alumno</span>");
		$("#loscons").append("<span class=\"label label-warning\">Consecutivo</span><br/>"+
		                     "<input id=\"consecutivo\" type=\"text\" class=\"\" style=\"width:81px;\"></input>");
		
		$("#lostipos").append("<span class=\"label label-info\">Tipo</span>");
		$("#lostipoexp").append("<span class=\"label label-warning\">Ver como</span>");
		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc order by cicl_clave desc", "","");  			      
	
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		$("#selCiclos").val($("#elciclo").html());

		addSELECT("selAlumnos","losalumnos","PROPIO", "SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) from falumnos WHERE ALUM_ACTIVO IN (1,2)", "","BUSQUEDA");  			      
		
		addSELECT("selTipos","lostipos","PROPIO", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='TIPCONSTANCIAS' ORDER BY CATA_DESCRIP", "","");  			      
		
	
		var losper = [{id: "1",opcion: "WORD"},{id: "2",opcion: "PDF"},];
		addSELECTJSON("selTipoExp","lostipoexp",losper);

	});
	
	function change_SELECT(elemento) {
    
	}
	


	function imprimirConstancia (){
		var hoy= new Date();		
		elanio=hoy.getFullYear();
		tipocons=$("#selTipos").val();
		if (tipocons==5) {cata="CARDEX";}
		else {cata="CONSTANCIAS";}

		micons=$("#consecutivo").val();				

		if (micons.length<=0) {			
				$.ajax({
					type: "POST",
					url:"../base/getConsecutivo.php?tabla=econsoficial&campok=concat(TIPO,ANIO)&campocons=CONSECUTIVO&valork="+cata+elanio,
					success: function(data){
						micons=data;
						imprimeReporte(tipocons,micons);
					}					     
				});    	    
		}
		else 
		{
			imprimeReporte(tipocons,micons);
		}
}


function imprimeReporte(tipocons,consecutivo) {
	var hoy= new Date();
	lafecha=hoy.getDay()+"/"+hoy.getMonth()+"/"+hoy.getFullYear()+" "+ hoy.getHours()+":"+hoy.getMinutes();

    parametros={tabla:"econstancias",
			    bd:"Mysql",
			    _INSTITUCION:"ITSM",
			    _CAMPUS:"0",
			    CONSECUTIVO:consecutivo,
				MATRICULA:$("#selAlumnos").val(),
				USUARIO:elusuario,
				TIPO:$("#selTipos option:selected").text(),
				FECHA:lafecha
			};
			    $.ajax({
			 		  type: "POST",
			 		  url:"../base/inserta.php",
			 	      data: parametros,
			 	      success: function(data){ 
						if (data.substring(0,2)=='0:') { 
					         alert ("Ocurrio un error: "+data); console.log(data);
					    	 }
					   
						}
					});

	if ($("#selTipoExp").val()==1) {
		if (tipocons=="1") {creaConsCal($("#elciclo").html(),$("#selAlumnos").val(),consecutivo,elanio); }  
		if (tipocons=="2") {creaConsHor($("#elciclo").html(),$("#selAlumnos").val(),consecutivo,elanio); } 
		if (tipocons=="3") {creaConsPer($("#elciclo").html(),$("#selAlumnos").val(),consecutivo,elanio); } 
		if (tipocons=="4") {creaConsIns($("#elciclo").html(),$("#selAlumnos").val(),consecutivo,elanio); } 
	}
	if ($("#selTipoExp").val()==2) {
		if (tipocons=="1") {window.open("conscal.php?elciclo="+$("#elciclo").html()+"&matricula="+$("#selAlumnos").val()+"&consec="+consecutivo+"&anio="+elanio, '_blank');  }
		if (tipocons=="2") {window.open("conshorario.php?elciclo="+$("#elciclo").html()+"&matricula="+$("#selAlumnos").val()+"&consec="+consecutivo+"&anio="+elanio, '_blank');  }
		if (tipocons=="3") {window.open("consperiodo.php?elciclo="+$("#elciclo").html()+"&matricula="+$("#selAlumnos").val()+"&consec="+consecutivo+"&anio="+elanio, '_blank');  }
		if (tipocons=="4") {window.open("conssincal.php?elciclo="+$("#elciclo").html()+"&matricula="+$("#selAlumnos").val()+"&consec="+consecutivo+"&anio="+elanio, '_blank');  }
		if (tipocons=="5") {window.open("../avancecurri/kardex.php?matricula="+$("#selAlumnos").val(), '_blank');  }
	}
}


function creaEncabezado(consec,anio,clave){

	$("#encabezadoCons").append("<table>"+
	"    <tr>"+
	"       <td style=\"width:50%\"></td>"+
	"       <td style=\"width:15%\">DEPENENCIA:</td>"+
	"       <tds tyle=\"width:20%\" ><td>DPTO DE SERV.ESCS.</td>"+
	"    </tr>"+
	"    <tr>"+
	"       <td style=\"width:50%\"></td>"+
	"       <td style=\"width:15%\">OFICIO NO.: </td>"+
	"       <tds tyle=\"width:20%\" ><td>"+consec+"/"+anio+"</td>"+
	"    </tr>"+
	"    <tr>"+
	"       <td style=\"width:50%\"></td>"+
	"       <td style=\"width:15%\">CLAVE: </td>"+
	"       <tds tyle=\"width:20%\" ><td>"+clave+"</td>"+
	"    </tr>"+
	"    <tr>"+
	"       <td style=\"width:50%\"></td>"+
	"       <td style=\"width:15%\">ASUNTO: </td>"+
	"       <tds tyle=\"width:20%\" ><td>CONSTANCIA</td>"+
	"    </tr>"+
	"</table>");
}

function creaCuerpo (MATRICULA,NOMBRE,SEMESTRE,CARRERAD,CICL_INICIO,CICL_FIN,CICL_VACINI, CICL_VACFIN,PROMEDIO_SR, AVANCE, PERIODOS,ADD){
	$("#cuerpoCons").append("<br/><div style=\"text-align:justify\">LA QUE SUSCRIBE, HACE CONSTAR, QUE SEGÚN EL ARCHIVO ESCOLAR, LA (EL) <strong>C."+
	NOMBRE+"</strong> CON  MATRICULA <strong>"+MATRICULA+"</strong>, ESTA CURSANDO EL SEMESTRE "+
	PERIODOS+" DE "+CARRERAD+", EN EL PERIODO COMPRENDIDO DE "+
	CICL_INICIO+" AL "+CICL_FIN+" CON UN PERÍODO VACACIONAL DE "+
	CICL_VACINI+" AL "+CICL_VACFIN+" Y PROMEDIO DE "+
	PROMEDIO_SR+" CON UN AVANCE DEL "+AVANCE.split("|")[2]+"%."+ADD+"</div>");
}


function colocaCalificaciones(dataCal) {
	$("#calCons").append("<br/><table id=\"tablacal\" border=\"1\" style=\"width:100%; border-collapse: collapse;\"></table>");
	jQuery.each(dataCal, function(claveCal, valorCal) { 
			$("#tablacal").append(
			"    <tr>"+
			"       <td style=\"width:90%; font-size:10px;\">"+valorCal.MATERIAD+"</td>"+
			"       <td style=\"width:10%; font-size:10px; text-align:center;\">"+valorCal.CAL+"</td>"+
			"    </tr>");
    }); //del each de las calificaciones
}


function colocaPie(consec,matricula,nombre,carrera) {
	var hoy = new Date();
	var anio = hoy.getFullYear();
	var dia=hoy.getDay();
	var mes=hoy.getMonth();
	var meses = ["ENERO", "FEEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", 
	            "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

	cadena=consec+"|"+matricula.replace(/ /g, "")+"|"+nombre.replace(/ /g, "")+"|"+carrera.replace(/ /g, "");
	$("#pieCons").append("<br/>");
	$("#pieCons").append("<div style=\"text-align:justify;\" > SE EXTIENDE LA PRESENTE EN LA CIUDAD DE MACUSPANA, ESTADO DE TABASCO A"+
	" LOS "+NumeroALetras(dia)+" DÍAS DEL MES DE "+meses[mes]+" DE "+NumeroALetras(anio)+
	", PARA LOS FINES QUE CONVENGAN AL INTERESADO.</div>");
	$("#pieCons").append("<br/>");
	$("#pieCons").append("<br/> <div style=\"text-align:center;\" >M.C.E. NANCY PATRICIA ROMELLON CERINO</div>");
	$("#pieCons").append("<br/> <div style=\"text-align:center;\" >JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES</div>");
	$("#pieCons").append("<br/> <img src=\"https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+cadena+"\"></img>");
}

function creaConsCal (elciclo,matricula,consec,anio){
	$("#encabezadoCons").empty();$("#cuerpoCons").empty();$("#calCons").empty();$("#pieCons").empty();
	mostrarEspera("esperacons","grid_econstancias", "Cargando Datos..");
    elsqlGen="SELECT * from INSTITUCIONES where _INSTITUCION='ITSM'";
	$.ajax({
		type: "GET",
		url:  "../base/getdatossql.php?sql="+encodeURI(elsqlGen)+"&sel=0&bd=SQLite",
		success: function(dataGen){ 
			jQuery.each(JSON.parse(dataGen), function(claveGen, valorGen) { clave=valorGen.inst_fechaof;});
			creaEncabezado(consec,anio,clave);
			elsqlCic="SELECT * FROM ciclosesc where CICL_CLAVE=getciclo();";
			
			$.ajax({
			    type: "GET",
			    url:  "../base/getdatossql.php?sql="+encodeURI(elsqlCic)+"&sel=0&bd=Mysql",
			    success: function(dataCic){ 
			        jQuery.each(JSON.parse(dataCic), function(claveCic, valorCic) { 
				        elsqlAlu="select ALUM_MATRICULA, CONCAT(ALUM_NOMBRE, ' ',ALUM_APEPAT, ' ',ALUM_APEMAT) AS NOMBRE, "+
						" ALUM_CARRERAREG AS CARRERA, ALUM_ACTIVO AS SITUACION, ALUM_CICLOTER AS CICLOTER, "+
						" ALUM_CICLOINS AS CICLOINS, CARR_DESCRIP AS CARRERAD, "+
						" PLACRED, PLAMAT,  c.CLAVEOF AS ESPECIALIDAD, ALUM_MAPA AS MAPA,"+
						" getavance('"+matricula+"') as AVANCE, "+
						" getPromedio('"+matricula+"','N') as PROMEDIO_SR,"+
						" getPeriodos('"+matricula+"',getciclo()) AS PERIODOS,"+
						" getcuatrialum('"+matricula+"',getciclo()) as SEMESTRE,"+
						" (select SUM(a.CREDITO) from kardexcursadas a where a.CICLO=getciclo() and a.MATRICULA='"+matricula+"') AS CRECUR "+
						" from falumnos a LEFT outer JOIN especialidad c on (a.ALUM_ESPECIALIDAD=c.ID), ccarreras b, mapas d where "+
						" CARR_CLAVE=ALUM_CARRERAREG"+
						" and ALUM_MAPA=d.MAPA_CLAVE and a.ALUM_MATRICULA='"+matricula+"'";
			    		$.ajax({
							type: "GET",
							url:  "../base/getdatossql.php?sql="+encodeURI(elsqlAlu)+"&sel=0&bd=Mysql",
							success: function(dataAlu){ 
								jQuery.each(JSON.parse(dataAlu), function(claveAlu, valorAlu) { 
									creaCuerpo(valorAlu.ALUM_MATRICULA,valorAlu.NOMBRE,valorAlu.SEMESTRE,
											   valorAlu.CARRERAD,valorCic.CICL_INICIO,valorCic.CICL_FIN,
											   valorCic.CICL_VACINI,valorCic.CICL_VACFIN,valorAlu.PROMEDIO_SR,
											   valorAlu.AVANCE,valorAlu.PERIODOS," CON LAS CALIFICACIONES QUE A CONTINUACION SE ENLISTAN:" );
									
									elsqlCal="SELECT MATRICULA, NOMBRE,MATERIA, MATERIAD, SEMESTRE,"+ 
									         "(CASE WHEN TIPOMAT='AC' THEN 'AC' WHEN TIPOMAT='SS' THEN 'AC' ELSE CAL END) AS CAL,"+
											 "TCAL,CICLO,CREDITO,TIPOMAT, VECES, PRIMERA, SEGUNDA, TERCERA FROM kardexcursadas "+											
											 " where MATRICULA='"+matricula+"' AND CAL>=70 ORDER BY SEMESTRE, MATERIAD";
									$.ajax({
										type: "GET",
										url:  "../base/getdatossql.php?sql="+encodeURI(elsqlCal)+"&sel=0&bd=Mysql",
										success: function(dataCal){ 
											//alert (dataCal);											
											colocaCalificaciones(JSON.parse(dataCal));	
											colocaPie(consec,valorAlu.ALUM_MATRICULA,valorAlu.NOMBRE,valorAlu.CARRERAD);																				
											exportHTML("htmlConst","C_"+valorAlu.ALUM_MATRICULA+".doc");	
											ocultarEspera("esperacons")	;
										}//success de las calificaciones
									});	//del ajax de las calificaciones	
								}); //del each de datos delalumno									
							}//success de de datos del alumno 
						});	//del ajax de datos generales del alumno 
					}); //del each de los datos delciclo	
				} //del success de los datos del ciclo	  
			}); // ajax de los datos del ciclo	 
		} //success de datos generales de la institucions
	}); //del ajax de datos generales de la institucion
}


function colocaHorarios(dataCal) {
	$("#calCons").append("<br/><table id=\"tablacal\" border=\"1\" style=\"width:100%; border-collapse: collapse;\"></table>");
	$("#tablacal").append(
		"    <tr>"+
		"       <th style=\"width:10%; font-size:8px;\">GRUPO</th>"+
		"       <th style=\"width:25%; font-size:8px;\">MATERIA/PROFESOR</th>"+
		"       <th style=\"width:5%; font-size:8px;\">CRED</th>"+
		"       <th style=\"width:10%; font-size:8px;\">LUNES</th>"+
		"       <th style=\"width:10%; font-size:8px;\">MARTES</th>"+
		"       <th style=\"width:10%; font-size:8px;\">MIERCOLES</th>"+
		"       <th style=\"width:10%; font-size:8px;\">JUEVES</th>"+
		"       <th style=\"width:10%; font-size:8px;\">VIERNES</th>"+
		"       <th style=\"width:10%; font-size:8px;\">SABADO</th>"+
		"    </tr>");
	jQuery.each(dataCal, function(claveCal, valorCal) { 
			$("#tablacal").append(
			"    <tr>"+
			"       <td style=\"width:10%; font-size:8px;\">"+valorCal.MATCVE+valorCal.GPOCVE+"</td>"+
			"       <td style=\"width:25%; font-size:8px;\">"+valorCal.MATERIAD+"<br/>"+valorCal.PROFESORD+"</td>"+
			"       <td style=\"width:5%;  font-size:8px;\">"+valorCal.CREDITOS+"</td>"+
			"       <td style=\"width:10%; font-size:8px;\">"+valorCal.LUNES+"</td>"+
			"       <td style=\"width:10%; font-size:8px;\">"+valorCal.MARTES+"</td>"+
			"       <td style=\"width:10%; font-size:8px;\">"+valorCal.MIERCOLES+"</td>"+
			"       <td style=\"width:10%; font-size:8px;\">"+valorCal.JUEVES+"</td>"+
			"       <td style=\"width:10%; font-size:8px;\">"+valorCal.VIERNES+"</td>"+
			"       <td style=\"width:10%; font-size:8px;\">"+valorCal.SABADO+"</td>"+
			"    </tr>");
    }); //del each de las calificaciones
}

function creaConsHor(elciclo,matricula,consec,anio){
	$("#encabezadoCons").empty();$("#cuerpoCons").empty();$("#calCons").empty();$("#pieCons").empty();
	mostrarEspera("esperacons","grid_econstancias", "Cargando Datos..");
    elsqlGen="SELECT * from INSTITUCIONES where _INSTITUCION='ITSM'";
	$.ajax({
		type: "GET",
		url:  "../base/getdatossql.php?sql="+encodeURI(elsqlGen)+"&sel=0&bd=SQLite",
		success: function(dataGen){ 
			jQuery.each(JSON.parse(dataGen), function(claveGen, valorGen) { clave=valorGen.inst_fechaof;});
			creaEncabezado(consec,anio,clave);
			elsqlCic="SELECT * FROM ciclosesc where CICL_CLAVE=getciclo();";
			
			$.ajax({
			    type: "GET",
			    url:  "../base/getdatossql.php?sql="+encodeURI(elsqlCic)+"&sel=0&bd=Mysql",
			    success: function(dataCic){ 
			        jQuery.each(JSON.parse(dataCic), function(claveCic, valorCic) { 
				        elsqlAlu="select ALUM_MATRICULA, CONCAT(ALUM_NOMBRE, ' ',ALUM_APEPAT, ' ',ALUM_APEMAT) AS NOMBRE, "+
						" ALUM_CARRERAREG AS CARRERA, ALUM_ACTIVO AS SITUACION, ALUM_CICLOTER AS CICLOTER, "+
						" ALUM_CICLOINS AS CICLOINS, CARR_DESCRIP AS CARRERAD, "+
						" PLACRED, PLAMAT,  c.CLAVEOF AS ESPECIALIDAD, ALUM_MAPA AS MAPA,"+
						" getavance('"+matricula+"') as AVANCE, "+
						" getPromedio('"+matricula+"','N') as PROMEDIO_SR,"+
						" getPeriodos('"+matricula+"',getciclo()) AS PERIODOS,"+
						" getcuatrialum('"+matricula+"',getciclo()) as SEMESTRE,"+
						" (select SUM(a.CREDITO) from kardexcursadas a where a.CICLO=getciclo() and a.MATRICULA='"+matricula+"') AS CRECUR "+
						" from falumnos a LEFT outer JOIN especialidad c on (a.ALUM_ESPECIALIDAD=c.ID), ccarreras b, mapas d where "+
						" CARR_CLAVE=ALUM_CARRERAREG"+
						" and ALUM_MAPA=d.MAPA_CLAVE and a.ALUM_MATRICULA='"+matricula+"'";
			    		$.ajax({
							type: "GET",
							url:  "../base/getdatossql.php?sql="+encodeURI(elsqlAlu)+"&sel=0&bd=Mysql",
							success: function(dataAlu){ 
								jQuery.each(JSON.parse(dataAlu), function(claveAlu, valorAlu) { 
									creaCuerpo(valorAlu.ALUM_MATRICULA,valorAlu.NOMBRE,valorAlu.SEMESTRE,
											   valorAlu.CARRERAD,valorCic.CICL_INICIO,valorCic.CICL_FIN,
											   valorCic.CICL_VACINI,valorCic.CICL_VACFIN,valorAlu.PROMEDIO_SR,
											   valorAlu.AVANCE,valorAlu.PERIODOS," CON EL HORARIO QUE A CONTINUACION SE ENLISTAN:" );
									
									elsqlCal="select MATCVE,MATERIAD, concat(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) as PROFESORD, GPOCVE, PDOCVE,CREDITOS, LUNES, MARTES, MIERCOLES,"+
									"JUEVES, VIERNES, SABADO, (CASE WHEN REP = 1 THEN 'R' WHEN REP>1 THEN 'E' ELSE '' END )"+
									" AS REP from vhorarioscons a "+
									"left outer join pempleados i on (i.EMPL_NUMERO=LISTC15) "+
									" where a.ALUCTR='"+matricula+"' AND a.PDOCVE='"+elciclo+"'";
									$.ajax({
										type: "GET",
										url:  "../base/getdatossql.php?sql="+encodeURI(elsqlCal)+"&sel=0&bd=Mysql",
										success: function(dataCal){ 
											//alert (dataCal);											
											colocaHorarios(JSON.parse(dataCal));	
											colocaPie(consec,valorAlu.ALUM_MATRICULA,valorAlu.NOMBRE,valorAlu.CARRERAD);																				
											exportHTML("htmlConst","C_"+valorAlu.ALUM_MATRICULA+".doc");	
											ocultarEspera("esperacons")	;
										}//success de las calificaciones
									});	//del ajax de las calificaciones	
								}); //del each de datos delalumno									
							}//success de de datos del alumno 
						});	//del ajax de datos generales del alumno 
					}); //del each de los datos delciclo	
				} //del success de los datos del ciclo	  
			}); // ajax de los datos del ciclo	 
		} //success de datos generales de la institucions
	}); //del ajax de datos generales de la institucion
}
