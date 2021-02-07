var id_unico="";
var estaseriando=false;
var matser="";
contR=1;
contMat=1;


    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 		
		$(".input-mask-hora").mask("99:99");
		$(".input-mask-horario").mask("99:99-99:99");
		$(".input-mask-numero").mask("99");

		$("#lasactividades").append("<span class=\"label label-warning\">Actividades</span>");
		addSELECT("selActividades","lasactividades","PROPIO", "SELECT  DESC_CLAVE, CONCAT(DESC_CLAVE,' ',DESC_DESCRIP) FROM etipodescarga WHERE DESC_ACTIVO='S' ", "","BUSQUEDA");  			      
	
		$("#losciclossel").append("<span class=\"label label-danger\">Ciclo</span>");
		addSELECT("selCiclos","losciclossel","PROPIO", "SELECT CICL_CLAVE, CONCAT(CICL_CLAVE,' ',CICL_DESCRIP) FROM ciclosesc order by cicl_clave desc", "","");  			      
	
		$("#losciclos").append("<i class=\" fa white fa-level-down bigger-180\"></i> ");
		$("#losciclos").append("<strong><span id=\"elciclo\" class=\"text-white bigger-40\"></span></strong>");
		colocarCiclo("elciclo","CLAVE");
		
	});
	
	
		 
	function change_SELECT(elemento) {

		
    }


    function cargarInformacion(){
		
      $("#opcionestabInformacion").addClass("hide");
      $("#botonestabInformacion").empty();
	
		script="<table id=\"tabInformacion\" name=\"tabInformacion\" class= \"table table-condensed table-bordered table-hover\" "+
		        ">"+
	   	   "        <thead >  "+
		   "             <tr id=\"headMaterias\">"+
		   "                <th>No.</th> "+
		   "                <th>ID</th> "+
		   "                <th>ORDEN</th> "+
		   "                <th>ACTIVIDAD</th> "+
		   "                <th>ENTREGABLE</th> "+
		   "                <th>FECHA</th> "+		
		   "              </tr>"+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);

	
		elsql="select y.ID, y.IDACT, ORDEN,ACTIVIDAD, ENTREGABLE, IFNULL(z.FECHA,'') AS FECHA "+
			  " from edestipplan y left outer join edesfechas z on ( z.IDTIPOACT=y.ID) where  IDACT='"+$("#selActividades").val()+"' order by ORDEN";

		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	  
		mostrarEspera("esperaInf","grid_asignaespecialidad","Cargando Datos...Puede tardar");
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  				      			      
					generaTablaInformacion(JSON.parse(data));   																																													
			    },
			    error: function(dataMat) {	                  
					alert('ERROR: '+dataMat);
								}
	});	      	      					  					  		
}





function generaTablaInformacion(grid_data){
	totegr=0;totdes=0;
	contR=1;
	$("#cuerpoInformacion").empty();
	$("#tabInformacion").append("<tbody id=\"cuerpoInformacion\">");
	//$("#btnfiltrar").attr("disabled","disabled");
	jQuery.each(grid_data, function(clave, valor) { 
		//alert ($("#rowM"+contR).html()+" "+valor.PROFESOR);   	
		$("#cuerpoInformacion").append("<tr id=\"rowM"+contR+"\">");
		$("#rowM"+contR).append("<td>"+contR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.ID+"</td>");
		$("#rowM"+contR).append("<td>"+valor.ORDEN+"</td>");
		$("#rowM"+contR).append("<td>"+valor.ACTIVIDAD+"</td>");
		$("#rowM"+contR).append("<td>"+valor.ENTREGABLE+"</td>");

		htmlfecfin= "<div class=\"input-group\">"+
				             "     <input onchange=\"grabaFecha('"+valor.ID+"');\" "+
				             "            value=\""+valor.FECHA+"\" class=\"form-control date-picker\" id=\"fecha"+valor.ID+"\" "+
							"            type=\"text\" autocomplete=\"off\" data-date-format=\"dd/mm/yyyy\" /> "+
							"     <span class=\"input-group-addon\"><i class=\"fa red fa-calendar bigger-110\"></i></span>"+
							"</div>";

		$("#rowM"+contR).append("<td>"+htmlfecfin+"</td>");
		$('.date-picker').datepicker({autoclose: true,todayHighlight: true});
		
		contR++;    
		
		
	});	
	ocultarEspera("esperaInf");  
} 


function grabaFecha(id){
		ciclo=$("#selCiclos").val();
		lafecha=$("#fecha"+id).val();
		var losdatos=[];
		losdatos[0]=ciclo+"|"+id+"|"+lafecha;
    	var loscampos = ["CICLO","IDTIPOACT","FECHA",];
		   parametros={
			 tabla:"edesfechas",
			 campollave:"IDTIPOACT",
			 bd:"Mysql",
			 valorllave:id,
			 eliminar: "S",
			 separador:"|",
			 campos: JSON.stringify(loscampos),
			 datos: JSON.stringify(losdatos)
		   };

		  $.ajax({
			 type: "POST",
			 url:"../base/grabadetalle.php",
			 data: parametros,
			 success: function(data){		
				 if (data.length>0) {alert ("Ocurrio un error: "+data);}					                      	                                        					          
			 }					     
		 });    	 

}


