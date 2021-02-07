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
		   "                <th>ORDEN</th> "+
		   "                <th>ACTIVIDAD</th> "+
		   "                <th>ENTREGABLE</th> "+
		   "                <th>fecha</th> "+		
		   "              </tr>"+
		   "            </thead>" +
		   "         </table>";
		   $("#informacion").empty();
		   $("#informacion").append(script);

	
		elsql="select y.ID, y.IDACT, ORDEN,ACTIVIDAD, ENTREGABLE, IFNULL(z.FECHA,'') AS FECHA "+
			  " from edestipplan y left outer join edesfechas z on ( z.`IDTIPOACT`=y.ID) where  IDACT='"+$("#selActividades").val()+"'";

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
		$("#rowM"+contR).append("<td>"+valor.PROFESOR+"</td>");
		$("#rowM"+contR).append("<td>"+valor.PROFESORD+"</td>");
		$("#rowM"+contR).append("<td>"+valor.ACTIVIDAD+"</td>");
		$("#rowM"+contR).append("<td>"+valor.ACTIVIDADD+"</td>");

		evento="crearPlan("+valor.ID+",'"+valor.ACTIVIDAD+"','"+valor.ACTIVIDADD+"');"; etbtn="Crear Plan"; ico="fa-list-ol red";
		if (valor.ESTA>0) {evento="verPlan("+valor.ID+",'"+valor.ACTIVIDAD+"','"+valor.ACTIVIDADD+"');"; etbtn="Ver Plan"; ico="fa-th-list blue";}
		$("#rowM"+contR).append("<td><button id=\"btn"+valor.ID+"\"  onclick=\""+evento+"\""+
		                        "class=\"btn btn-white btn-info btn-round\" value=\"Agregar\"> "+
		                        "<i id=\"iconbtn"+valor.ID+"\" class=\"ace-icon fa "+ico+" bigger-140\"></i><span id=\"etbtn"+valor.ID+"\" class=\"btn-small\">"+
		                        etbtn+"</span></button></td>");
		
		contR++;    
		
		
	});	
	ocultarEspera("esperaInf");  
} 



function agregarTodas(){
	if (confirm("¿Seguro desea asignar a todos los alumnos de esta vista la especialidad "+$("#selEspecialidad option:selected").text())){
		$(".losselectesp").each(function(){
			$(this).val($("#selEspecialidad").val());
			lamat=$(this).attr("matricula");
			actualizaEsp(lamat,$("#selEspecialidad").val());
		});
	}
}




function crearPlan (id,actividad,actividadd) {
    elsql="INSERT INTO eplandescarga (PLAN_IDACT, PLAN_ACTIVIDAD,PLAN_ENTREGABLE,"+
		  "PLAN_FECHAENTREGA,PLAN_ORDEN, _INSTITUCION,_CAMPUS )  SELECT "+id+", ACTIVIDAD, ENTREGABLE, "+
		  "b.FECHA, ORDEN, a._INSTITUCION, a._CAMPUS FROM edestipplan a, edesfechas b "+
		  "where a.ID=b.IDTIPOACT and b.CICLO='"+$("#selCiclos").val()+"' and a.IDACT='"+actividad+"'";
		
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/ejecutasql.php",
	           success: function(data){  
				$("#etbtn"+id).html("Ver Plan");
				$("#iconbtn"+id).removeClass("fa-list-ol red");
				$("#iconbtn"+id).addClass("fa-th-list blue");
				$("#btn"+id).removeAttr('onclick');
				$("#btn"+id).bind( "click", function( ) {
					verPlan(id,actividad,actividadd);
				});
			
			   }	
			   
			});			 
   
}



/*==============================================VER PLAN ============================0*/
function verPlan(id,actividad,actividadd){
	script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
    "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header widget-header  widget-color-green\">"+
	 
	   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Actividad:"+actividad+" "+actividadd+"</span></b> </span>"+
	   "             <input type=\"hidden\" id=\"elid\" value=\""+id+"\"></input>"+
	   "             <button type=\"button\" class=\"close\"  data-dismiss=\"modal\"   aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "          </div>"+  
	   "          <div id=\"frmdescarga\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto;\" >"+					  
	   "             <div class=\"row\"> "+		
       "                  <table id=\"tabActividad\" class= \"table table-condensed table-bordered table-hover\">"+
	   "                         <thead>  "+
	   "                               <tr>"+
	   "                             	   <th>Op</th> "+
	   "                             	   <th>PDF</th> "+
	   "                             	   <th>R</th> "+//Sirve para le lectura del renglon al momento de validar cruce
	   "                             	   <th>ID</th> "+ 
	   "                                   <th>Orden</th> "+
	   "                                   <th>Actividad</th> "+
	   "                                   <th>Entregable</th> "+
	   "                                   <th>Fecha</th> "+
	   "                               </tr> "+
	   "                         </thead>" +
	   "                   </table>"+	
	   "             </div> "+ //div del row
	   "          </div>"+ //div del modal-body		 
    "          </div>"+ //div del modal content		  
	   "      </div>"+ //div del modal dialog
	   "   </div>"+ //div del modal-fade
	   "</div>";
	 $("#modalDocument").remove();
 if (! ( $("#modalDocument").length )) {
     $("#grid_desasignaprof").append(script);
 }



 $('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
 
 $('#modalDocument').modal({show:true, backdrop: 'static'});

 elsql="SELECT count(*) as NUM FROM eplandescarga WHERE PLAN_IDACT='"+id+"'";
 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
 
 $.ajax({
		type: "POST",
		data:parametros,
        url:  "../base/getdatossqlSeg.php",
        success: function(data){  
     	      losdatos=JSON.parse(data);  
     	        
     	      jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; });
     
     	    	  if (hay>0) {	        	    			        	    	
					   elsql="SELECT *  FROM eplandescarga WHERE PLAN_IDACT='"+id+"' order by PLAN_ORDEN";
					   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
     	    		  $.ajax({
     	   	           type: "POST",
					   data:parametros,   
					   url:  "../base/getdatossqlSeg.php",
     	   	           success: function(data){ 	        	   	        	
     	   	        	     generaTablaActividad(JSON.parse(data));
     	   	                 },
     	   	           error: function(data) {	                  
     	   	                      alert('ERROR: '+data);
     	   	                  }
     	   	          });
     	   	   
     	    	  }

              },
        error: function(data) {	                  
                   alert('ERROR: '+data);
               }
});
	   
}


function generaTablaActividad(grid_data){		
  	 $("#cuerpoActividad").empty();
  	 $("#tabActividad").append("<tbody id=\"cuerpoActividad\">");
      c=1;	
      global=1; 
      ladefault="..\\..\\imagenes\\menu\\pdf.png";
      
  	jQuery.each(grid_data, function(clave, valor) { 	
  		
  		
  	       btnSubir="<button title=\"Subir archivo PDF comprobable de la actividad\" onclick=\"subirArchivo('"+valor.PLAN_ID+"','"+valor.PLAN_ACTIVIDAD+"');\" class=\"btn btn-xs btn-success\"> " +
                     "    <i class=\"ace-icon fa fa-upload bigger-120\"></i>" +
                      "</button>";
	       boton=btnSubir;

	       
           botonPDF="<a target=\"_blank\" id=\"enlace_I_"+valor.PLAN_ID+"\" href=\""+valor.RUTA+"\">"+
	  		        "     <img width=\"40px\" height=\"40px\" id=\"pdf_"+valor.PLAN_ID+"\" name=\"pdf_"+valor.PLAN_ID+"\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
	 		        "</a>";

	 	   botonPDF+="<input type=\"hidden\" value=\""+valor.RUTA+"\"  name=\"I_"+valor.PLAN_ID+"\" id=\"I_"+valor.PLAN_ID+"\"  placeholder=\"\" />";    

	   	 
	   	 $("#cuerpoActividad").append("<tr id=\"row"+c+"\">");
	   	 $("#row"+c).append("<td>"+btnSubir+"</td>");
	   	 $("#row"+c).append("<td>"+botonPDF+"</td>");
	   	 $("#row"+c).append("<td>"+c+"</td>");
	     $("#row"+c).append("<td>SC</td>");	
	     $("#row"+c).append("<td id=\"a_"+c+"_1\">"+valor.PLAN_ORDEN+"</td>");		
	   	 $("#row"+c).append("<td id=\"a_"+c+"_2\">"+valor.PLAN_ACTIVIDAD+"</td>");	
	   	 $("#row"+c).append("<td id=\"a_"+c+"_3\">"+valor.PLAN_ENTREGABLE+"</td>");	
		 $("#row"+c).append("<td id=\"a_"+c+"_4\">"+valor.PLAN_FECHAENTREGA+"</td>");	  	
		 
		 
		 if (valor.RUTA=='') { 								
			$('#enlace_I_'+valor.PLAN_ID).click(function(evt) {evt.preventDefault();});			
			$("#pdf_"+valor.PLAN_ID).attr('src', "..\\..\\imagenes\\menu\\pdfno.png");	                        		                       	                    
		  }

  		c++;
  		global=c;
  	});
  }



function subirArchivo (id,actividad) {

	ladefault="..\\..\\imagenes\\menu\\pdf.png";
	script="<div class=\"modal fade\" id=\"modalFile\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
    "   <div class=\"modal-dialog modal-sm \" role=\"document\">"+
	   "      <div class=\"modal-content\">"+
	   "          <div class=\"modal-header\">"+
	   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-thumb-tack\"></i><span class=\"menu-text\"> Actividad: "+actividad+"</span></b> </span>"+
	   "             <input type=\"hidden\" id=\"elidfile\" value=\""+id+"\"></input>"+
	   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
	   "                  <span aria-hidden=\"true\">&times;</span>"+
	   "             </button>"+
	   "             <div class=\"row\"> "+			
       "                 <div class=\"col-sm-12\"> "+			   
	    "                       <div class=\"widget-box widget-color-green2\"> "+
		"                              <div class=\"widget-header\">"+
		"	                                <h4 class=\"widget-title lighter smaller\">Subir Archivo PDF</h4>"+
		"                              </div>"+
		"                              <div id =\"elarchivo\" style=\"overflow-y: auto;height:200px;width:100%;\">"+
		"                                  <div class=\"row\" style=\"width:90%;\">"+
		"                                    <div class=\"col-sm-1\"></div>"+
		"                                    <div class=\"col-sm-10\">"+
		"                                        <input class=\"fileSigea\" type=\"file\" id=\"file_"+id+"\" name=\"file_"+id+"\""+
	        "                                        onchange=\"subirPDFDriveSave('file_"+id+"','ACTDESCARGA','pdf_"+id+"','I_"+id+"','pdf','S','PLAN_ID','"+id+"','"+actividad+"','eplandescarga','edita','');\">"+
	        "                                    <\div>"+  
	        "                                    <div class=\"col-sm-1\"></div>"+	         	                                     
	        "                                  <\div>"+
	        "                                  <div class=\"row\">"+
	        "                                      <a target=\"_blank\" id=\"enlace_I_"+id+"_2\" href=\"\">"+
	    "                                          <img width=\"40px\" height=\"40px\" id=\"pdf_"+id+"_2\" name=\"pdf_"+id+"_2\" src=\""+ladefault+"\" width=\"50px\" height=\"50px\">"+
        "                                      </a>"+
        "                                  <\div>"+
			"                              </div>"+
	    "                       </div>"+
	    "                 </div>"+
	    "             </div>"+	    
       "          </div>"+
	   "      </div>"+
	   "   </div>"+
	   "</div>";
	   
	 $("#modalFile").remove();
	 if (! ( $("#modalFile").length )) {$("body").append(script);}
	    
	 $('#modalFile').modal({show:true, backdrop: 'static', keyboard: false});

	 $('.fileSigea').ace_file_input({
			no_file:'Sin archivo ...',
			btn_choose:'Buscar',
			btn_change:'Cambiar',
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			whitelist:'pdf',
			blacklist:'exe|php'
			//onchange:''
			//
		});
	   
}
