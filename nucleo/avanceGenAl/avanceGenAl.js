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

	
		$("#contCiclo").append("<span class=\"label label-danger\">Ciclo Escolar</span>");
		addSELECT("selCiclos","contCiclo","PROPIO", "SELECT CICL_CLAVE, concat(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc ORDER BY CICL_CLAVE DESC", "","");  			      
	

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
		
	

		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {
        
		if (elemento=='selCarreras') {	
			$("#loshorarios").empty();	
		}  
    }

	function exportar (){
		$("#tabAvances").tableExport();
	}

    function cargarAvances(){

		$("#opcionestabAvances").addClass("hide");
		$("#botonestabAvances").empty();

		for (i=1; i<=10; i++) { cad+="<th>Unidad"+i+"</th> "; }

		
		script="<table id=\"tabAvances\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headAvances\">"+
		   "                <th>No.</th> "+
		   "                <th>Control</th> "+	
		   "                <th>Nombre</th> "+
		   "                <th>Periodo</th> "+		cad+	
		   "             </tr> "+
		   "            </thead>" +
		   "         </table>";
		   $("#losAvances").empty();
		   $("#losAvances").append(script);
				
		elsql="SELECT distinct ALUM_MATRICULA, concat(ALUM_APEPAT,' ',ALUM_APEMAT, ' ',ALUM_NOMBRE) AS NOMBRE,"+
		" getPeriodos(ALUM_MATRICULA,'"+$("#selCiclos").val()+"') as PERIODOS "+		
		"FROM "+
		" dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA and PDOCVE='"+$("#selCiclos").val()+"'"+
		" and b.ALUM_CARRERAREG="+$("#selCarreras").val()+" ORDER BY ALUM_MATRICULA DESC";

		mostrarEspera("esperahor","grid_avanceGenAl","Cargando Datos...");

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  				      
					  generaTablaAvances(JSON.parse(data));   
					  ocultarEspera("esperahor");	  
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
		for (j=1; j<=10; j++) { $("#rowA"+contAlum).append("<td  class=\"fontRoboto\" style=\"font-size:10px;\" id=\"LISPA"+j+"_"+valor.ALUM_MATRICULA+"\"></td>"); }

	    contAlum++;      			
	});	

	
	for (i=1; i<=10; i++) {
		elsqlMat=" SELECT ALUCTR, concat('LISPA',"+i+") UNI, group_concat(concat(MATE_DESCRIP,'|',LISPA"+i+",'|<br>')) as STATUS FROM dlista a, cmaterias  "+
		"    where a.PDOCVE='"+$("#selCiclos").val()+"'"+
		"    and a.MATCVE=MATE_CLAVE AND ifnull(MATE_TIPO,'') NOT IN ('T','OC')"+
		"    and GPOCVE<>'REV'"+
		"    GROUP BY ALUCTR";
		
		parametros2={sql:elsqlMat,dato:sessionStorage.co,bd:"Mysql"}
		$.ajax({
			type: "POST",
			data:parametros2,
			url:  "../base/getdatossqlSeg.php",
			success: function(dataMat){ 			
				jQuery.each(JSON.parse(dataMat), function(clave, valorMat) { 
					arreglo=valorMat.STATUS.split(",");	
					cadEstilo=setEstilo(arreglo);	
																	      
					$("#"+valorMat.UNI+"_"+valorMat.ALUCTR).html(cadEstilo);
					//console.log($("#"+valorMat.UNI+"_"+valorMat.ALUCTR).html());	
				});
			}
		});
	}
	
} 

function setEstilo(arreglo) {
	var i=0; apr=0; rep=0; 
	var cadFin="";
	
	arreglo.forEach(function(dato) {
		divi=dato.split("|");
		if (parseInt(divi[1])<=60) { rep++; arreglo[i]="<span  class=\"badge badge-danger\">"+dato+"</span><br>"; }
		else { apr++; arreglo[i]="<span  class=\"badge badge-success\">"+dato+"</span><br>"; }
		cadFin+=arreglo[i];
		i++;
	  });

return cadFin+"<br>"+"<span class=\"badge badge-danger\">"+rep+"</span>"+
					 "<span  class=\"badge badge-success\">"+apr+"</span>"+
					 "<span  class=\"badge badge-primary\">"+Math.round(apr/(i+1)*100,0)+"%</span>";
}
