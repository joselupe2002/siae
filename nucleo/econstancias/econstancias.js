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
		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CICL_DESCRIP FROM ciclosesc order by cicl_clave desc", "","");  			      
	
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		$("#selCiclos").val($("#elciclo").html());

		addSELECT("selAlumnos","losalumnos","PROPIO", "SELECT ALUM_MATRICULA, CONCAT(ALUM_MATRICULA,' ',ALUM_NOMBRE,' ',ALUM_APEPAT,' ',ALUM_APEMAT) from falumnos WHERE ALUM_ACTIVO IN (1,2)", "","BUSQUEDA");  			      
		
		addSELECT("selTipos","lostipos","PROPIO", "SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='TIPCONSTANCIAS' ORDER BY CATA_DESCRIP", "","");  			      
		
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

	if (tipocons=="1") {window.open("conscal.php?matricula="+$("#selAlumnos").val()+"&consec="+consecutivo+"&anio="+elanio, '_blank');  }
	if (tipocons=="5") {window.open("../avancecurri/kardex.php?matricula="+$("#selAlumnos").val(), '_blank');  }

}





