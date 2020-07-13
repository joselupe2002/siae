var globlal;

var parte0="<div style=\"width:150px; padding-left:10px;padding-right:10px;padding-top:0; padding-bottom:0;\">"+
           " <input autocomplete=\"off\" class= \"small form-control\" style=\"width:100%;  " +
           " font-size:11px;  font-weight:bold; color:#03661E; height: 30px;\" type=\"text\"";

var parte1="<div style=\"width:100px; padding-left:10px;padding-right:10px;padding-top:0; padding-bottom:0;\">"+
              "<input  autocomplete=\"off\" class= \"small form-control input-mask-horario\" style=\"width:100%;  " +
		                    " font-size:11px;  font-weight:bold; color:#03661E; height: 30px;\" type=\"text\"";
var parte2="</input></div></td>";





function addDescarga(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" > "+
	       "   <div class=\"modal-dialog modal-lg\" role=\"document\" >"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\" >"+
		   "             <span class=\"text-success\"><b> <i class=\"menu-icon red fa fa-male\"></i><span class=\"menu-text\"> Profesor:"+table.rows('.selected').data()[0][1]+"</span></b> </span>"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\" style=\"margin: 0 auto; top:0px;\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "          </div>"+
		    		   
		   "          <div id=\"frmdescarga\" class=\"modal-body\" >"+	
		   "               <ul class=\"nav nav-tabs\" > "+
		   "                  <li class=\"active\"><a data-toggle=\"tab\" href=\"#tabDes\"><i class=\"menu-icon green fa fa-thumbs-down\"></i><span class=\"menu-text\"> Descargas</span></a></li> "+
		   "                  <li><a data-toggle=\"tab\" href=\"#tabCla\"><i class=\"menu-icon blue fa fa-group\"></i><span class=\"menu-text\"> Clases</span></a></li> "+
		   "               </ul> "+
		   
		   "               <div class=\"tab-content\">"+
		   "                   <div id=\"tabDes\" class=\"tab-pane fade in active\">"+	
		   "                        <div style=\" height:100%;\">   "+
		   "                         <div class=\"row\"> "+	
	       "                                <div class=\"col-sm-8\" style=\"paddin:0px; margin-left:20px;\"> "+
	       "                                       <label class=\"text-success\" style=\"margin:0px;\"><b>Actividades de Descarga</b></label>"+
		   "                                       <select class=\"chosen-select form-control\"  id=\"add\"></select>"+
		   "                                 </div>"+
		   "                                <div class=\"col-sm-1\" style=\"padding-top:12px;\"> "+
		   "                                      <button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"agregarActividad();\">"+
		   "                                      <i class=\"ace-icon fa fa-plus bigger-120 blue\"></i></button>"+
		   "                                 </div>"+
		   "                                <div class=\"col-sm-1\" style=\"padding-top:12px;\"> "+
		   "                                      <button type=\"button\" class=\"btn btn-white btn-success btn-bold\" onclick=\"guardarHorario('"+institucion+"','"+campus+"');\">"+
		   "                                      <i class=\"ace-icon fa fa-floppy-o bigger-120 success\"></i> Guardar Descarga</button>"+
		   "                                 </div>"+		   
		   "                           </div>"+  //div del row
		   "                           <div class=\"space-10\"></div>"+
		   "                           <div class=\"row\" style=\"overflow-x: auto; overflow-y: auto; height:100%;\">" +
		   "                                <div class=\"col-sm-8\"> "+
	       "                                    <table id=\"tabHorarios\" class= \"table table-condensed table-bordered table-hover\">"+
	   	   "                                        <thead>  "+
		   "                                           <tr>"+
		   "                             	             <th>Op</th> "+
		   "                             	             <th>R</th> "+//Sirve para le lectura del renglon al momento de validar cruce
		   "                             	             <th>ID</th> "+ 
		   "                                             <th>Actividad</th> "+
		   "                                             <th>Descripción</th> "+
		   "                                     	     <th>Lunes</th> "+
		   "                                     	     <th>Martes</th> "+
		   "                                     	     <th>Miercoles</th> "+
		   "                                     	     <th>Jueves</th> "+
		   "                                     	     <th>Viernes</th> "+
		   "                                     	     <th>Sabado</th> "+
		   "                                     	     <th>Domingo</th> "+	 
		   "                                     	     <th>Horas</th> "+	
		   "                              			   </tr> "+
		   "                                        </thead>" +
		   "                                     </table>"+	
		   "                                </div> "+ //div del col
		   "                          </div> "+ //div del row 2
		   "                       </div> "+ //div contenedor de la tabla y combo
		   "                   </div> "+ //div del tab de descarga academica
		   "                   <div id=\"tabCla\" class=\"tab-pane fade\">"+
		   "                           <div class=\"row\" style=\"overflow-x: auto; overflow-y: auto; height:100%;\">" +
		   "                                <div class=\"col-sm-8\" style=\"padding:0px; margin-left:20px;\"> "+	       
		   "                                   <table id=\"tabHorariosB\" class= \"table table-condensed table-bordered table-hover\">"+
	   	   "                                     <thead>  "+
		   "                                        <tr>"+
		   "                             	           <th>R</th> "+ //Sirve para le lectura del renglon al momento de validar cruce
		   "                             	           <th>Asignatura</th> "+
		   "                             	           <th>Plan</th> "+
		   "                                   	     <th>Lunes</th> "+
		   "                                   	     <th>Martes</th> "+
		   "                                   	     <th>Miercoles</th> "+
		   "                                   	     <th>Jueves</th> "+
		   "                                   	     <th>Viernes</th> "+
		   "                                   	     <th>Sabado</th> "+
		   "                                   	     <th>Domingo</th> "+	  
		   "                            			</tr> "+
		   "                                    </thead>" +
		   "                                 </table>"+	
		   "                                </div> "+ //div del col
		   "                          </div> "+ //div del row 2		   		   
		   "                   </div> "+  //div del tab de horarios clases
		   "               </div"+//div del  tab content
		   "          </div>"+ //div del modal-body		 
	       "          </div>"+ //div del modal content		  
		   "      </div>"+ //div del modal dialog
		   "   </div>"+ //div del modal-fade
		   " <select id=\"aulas\" style=\"visibility:hidden\"></select> "
		   "</div>";
	 
		
		
 		 
		 $("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	    }
	    
	    $('#modalDocument').modal({show:true, backdrop: 'static'});
	    
	    
	   
		 elsql="SELECT edescarga.DESC_ID AS id, edescarga.DESC_ACTIVIDAD AS actividad, "+
		 " edescarga.DESC_DESCRIP AS descrip, "+
		 " LUNES AS lunes, MARTES AS martes, MIERCOLES as miercoles,"+
			 " JUEVES as jueves, VIERNES as viernes, SABADO as sabado, DOMINGO as domingo, DESC_HORAS as horas"+
			 " FROM edescarga, etipodescarga WHERE DESC_ACTIVIDAD=DESC_CLAVE AND DESC_PROFESOR='"+table.rows('.selected').data()[0][0]+"'"+
			 " and DESC_CICLO='"+table.rows('.selected').data()[0][2]+"'";

		 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			type: "POST",
			data:parametros,
        	url: "../base/getdatossqlSeg.php",
        	success: function(data){ 
							   
				               elsql="SELECT DESC_CLAVE, concat(DESC_CLAVE,' ',DESC_DESCRIP) FROM etipodescarga ORDER BY DESC_DESCRIP";
			                   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}
			
        		               $.ajax({
					       	           type: "POST",
					       	           url:  "../base/dameselectSeg.php",									
                                       data:parametros,	  
									   success: function(dataAct){					       	        	  
					       	        	   $("#add").html(dataAct); 
					       	               $("#add").trigger("chosen:updated");
					       	               $('.chosen-select').chosen({allow_single_deselect:true}); 			
					       	   	           $(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
					       			       $(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});
					       			
					       	        	   
					       	        	   generaTablaDescarga(JSON.parse(data));
											   
											elsql2="SELECT DGRU_MAPA AS mapa, DGRU_ID AS id, DGRU_MATERIA AS materia, MATE_DESCRIP AS materiad, "+
											" LUNES AS lunes, MARTES AS martes, MIERCOLES as miercoles,"+
											   " JUEVES as jueves, VIERNES as viernes, SABADO as sabado, DOMINGO as domingo,   "+
											   " A_LUNES AS a_lunes, A_MARTES AS a_martes, A_MIERCOLES AS a_miercoles, A_JUEVES AS a_jueves, "+
											   " A_VIERNES AS a_viernes, A_SABADO AS a_sabado, A_DOMINGO AS a_domingo, CUPO as cupo"+
											   " FROM edgrupos, cmaterias WHERE DGRU_BASE IS NULL AND DGRU_MATERIA=MATE_CLAVE AND DGRU_PROFESOR='"+table.rows('.selected').data()[0][0]+"'"+
											   " and DGRU_CICLO='"+table.rows('.selected').data()[0]["CICLO"]+"'";
										
											parametros={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}

			        	   	        	    $.ajax({
											   type: "POST",
											   data:parametros,
			        	   		        	   url: "../base/getdatossqlSeg.php",
			        	   		        	success: function(dataMat){ 														          	   		        		                 
			        	   		        	   	        	     generaTabla(JSON.parse(dataMat));
			        	   		        	   	                 },
			        	   		        	error: function(data) {	                  
			        	   		        	   	                      alert('ERROR: '+dataMat);
			        	   		        	   	                  }
			        	   		        	});
			        	   	        	    
					       	           }
					       	    });
        		
        	   	        	   
        	   		        	   	   
        	   	                 },
        	error: function(data) {	                  
        	   	                      alert('ERROR: '+data);
        	   	                  }
        	});
	    
	     	    			        	    	
	   
	    
	    
	  
	    
		
	}
	else {
		alert ("Debe seleccionar un profesor");
		return 0;

		}
	
}


function convierteHorario(cad) {
	h1=cad.substring(0,2);
	m1=cad.substring(2,4);
	h2=cad.substring(4,6);
	m2=cad.substring(6,8);
	res=h1+":"+m1+"-"+h2+":"+m2;
	if (res==":-:") {res="";}
	return res;
}

function generaTabla(grid_data){	
	 $("#cuerpoB").empty();
	 $("#tabHorariosB").append("<tbody id=\"cuerpoB\">");
	 c=1;	   
	 st="style=\"font-size:10px;\" ";
	 jQuery.each(grid_data, function(clave, valor) { 	        			
		    $("#cuerpoB").append("<tr id=\"rowB"+c+"\">");
		    $("#rowB"+c).append("<td id=\"c_"+c+"_0B\">"+c+"</td>");
			$("#rowB"+c).append("<td><b><span class=\"text-primary\" "+st+" id=\"c_"+c+"_1B\">"+valor.materiad+"</span></b></td>");	
			$("#rowB"+c).append("<td><b><span class=\"text-success \" "+st+"  id=\"c_"+c+"_2B\">"+valor.mapa+"</span></b></td>");
			$("#rowB"+c).append("<td><b><span class=\"text-secondary \" "+st+"  id=\"c_"+c+"_3B\">"+valor.lunes+"</span></b></td>");
			$("#rowB"+c).append("<td><b><span class=\"text-secondary \" "+st+"  id=\"c_"+c+"_4B\">"+valor.martes+"</span></b></td>");
			$("#rowB"+c).append("<td><b><span class=\"text-secondary \" "+st+"  id=\"c_"+c+"_5B\">"+valor.miercoles+"</span></b></td>");
			$("#rowB"+c).append("<td><b><span class=\"text-secondary \" "+st+"  id=\"c_"+c+"_6B\">"+valor.jueves+"</span></b></td>");
			$("#rowB"+c).append("<td><b><span class=\"text-secondary \" "+st+"  id=\"c_"+c+"_7B\">"+valor.viernes+"</span></b></td>");
			$("#rowB"+c).append("<td><b><span class=\"text-secondary \" "+st+"  id=\"c_"+c+"_8B\">"+valor.sabado+"</span></b></td>");
			$("#rowB"+c).append("<td><b><span class=\"text-secondary \" "+st+"  id=\"c_"+c+"_9B\">"+valor.domingo+"</span></b></td>");
			c++;			
	     });
}


function generaTablaDescarga(grid_data){	
	 $("#cuerpo").empty();
	 $("#tabHorarios").append("<tbody id=\"cuerpo\">");
	 c=1;	global=1;     
	 jQuery.each(grid_data, function(clave, valor) { 
		   
		    $("#cuerpo").append("<tr id=\"row"+c+"\">");
		    
		    $("#row"+c).append("<td><button onclick=\"eliminarFila('row"+c+"');\" class=\"btn btn-xs btn-danger\"> " +
	                 "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
	                 "</button></td>");
				$("#row"+c).append("<td>"+c+"</td>");
				$("#row"+c).append("<td>"+ "<label id=\"c_"+c+"_0\" class=\"small text-info font-weight-bold\">SC</label</td>");
				$("#row"+c).append("<td><select id=\"c_"+c+"_1\" style=\"width:200px;\"></select></td>");
				$("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_2\" value=\""+valor.descrip+"\">"+parte2);
				$("#row"+c).append("<td>"+parte1+" id=\"c_"+c+"_3\" value=\""+valor.lunes+"\">"+parte2);
				$("#row"+c).append("<td>"+parte1+" id=\"c_"+c+"_4\" value=\""+valor.martes+"\">"+parte2);
				$("#row"+c).append("<td>"+parte1+" id=\"c_"+c+"_5\" value=\""+valor.miercoles+"\">"+parte2);
				$("#row"+c).append("<td>"+parte1+" id=\"c_"+c+"_6\" value=\""+valor.jueves+"\">"+parte2);
				$("#row"+c).append("<td>"+parte1+" id=\"c_"+c+"_7\" value=\""+valor.viernes+"\">"+parte2);
				$("#row"+c).append("<td>"+parte1+" id=\"c_"+c+"_8\" value=\""+valor.sabado+"\">"+parte2);
				$("#row"+c).append("<td>"+parte1+" id=\"c_"+c+"_9\" value=\""+valor.domingo+"\">"+parte2);
				$("#row"+c).append("<td><input style=\"width:100%\" type=\"text\" class=\"input-mask-numero\" id=\"c_"+c+"_10\" value=\""+valor.horas+"\"></input></td>");				
				
				
				$("#c_"+c+"_1").html($("#add").html()); 
				
				$("#c_"+c+"_1").val(valor.actividad);	
			    				
			    c++;
			    global=c;  
			  
	     });
}



function agregarActividad(){	
    if ($("#add").val()==0) {alert ("Por favor elija una actividad"); return 0;}
    
     esta=false;
	 $('#tabHorarios tr').each(function () {
	     if (c>=0) {
	        var i = $(this).find("td").eq(1).html();
	        if ($("#c_"+i+"_1").val()==$("#add").val()) {
	        	esta=true; alert ("La actividad ya esta agregada en la Lista"); return 0;
	        }
	     }
        c++;
	 });
	 if (!(esta)) {
		    lactividad=$("#add option:selected").html();
		    $("#cuerpo").append("<tr id=\"row"+global+"\">");
			$("#row"+global).append("<td><button onclick=\"eliminarFila('row"+global+"');\" class=\"btn btn-xs btn-danger\"> " +
                 "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
                 "</button></td>");
			$("#row"+global).append("<td>"+global+"</td>");
			$("#row"+global).append("<td>"+ "<label id=\"c_"+global+"_0\" class=\"small text-info font-weight-bold\">SC</label</td>");
			$("#row"+global).append("<td><select id=\"c_"+global+"_1\" style=\"width:200px;\"></select></td>");
			$("#row"+global).append("<td>"+parte0+" id=\"c_"+global+"_2\">"+parte2);
			$("#row"+global).append("<td>"+parte1+" id=\"c_"+global+"_3\">"+parte2);
			$("#row"+global).append("<td>"+parte1+" id=\"c_"+global+"_4\">"+parte2);
			$("#row"+global).append("<td>"+parte1+" id=\"c_"+global+"_5\">"+parte2);
			$("#row"+global).append("<td>"+parte1+" id=\"c_"+global+"_6\">"+parte2);
			$("#row"+global).append("<td>"+parte1+" id=\"c_"+global+"_7\">"+parte2);
			$("#row"+global).append("<td>"+parte1+" id=\"c_"+global+"_8\">"+parte2);
			$("#row"+global).append("<td>"+parte1+" id=\"c_"+global+"_9\">"+parte2);
			$("#row"+global).append("<td><input  style=\"width:100%\" type=\"text\" class=\"input-mask-numero\" value=\"30\" id=\"c_"+global+"_10\"></input></td>");
			
						
			$("#c_"+global+"_1").html($("#add").html()); 		
			$("#c_"+global+"_1").val($("#add").val());
			global++;
	 }
}


function eliminarFila(nombre) {
	var r = confirm("Seguro que desea eliminar del horario esta asignatura");
	if (r == true) {
        $("#"+nombre).remove();
        }
}


function pad (str, max) {
	  str = str.toString();
	  return str.length < max ? pad("0" + str, max) : str;
	}







function verCruce (arreglo,numdia,marcar){
	
	arreglo=Burbuja(arreglo);
	
	renglon=[];	
	renglon=arreglo[0].split("|");
	terant=renglon[1];
	desant=renglon[2];
	inputant=renglon[3];
	
	if (marcar) {$("#c_"+inputant+"_"+numdia).css("border-color","#BEBEBE");
	             $("#c_"+inputant+"_"+numdia+"B").css("color","black");
                }
	
	cad="";
	
	for (i=1;i<arreglo.length;i++){		
		
		
		renglon=arreglo[i].split("|");
		tipo=renglon[4];
		
		if (marcar) {$("#c_"+renglon[3]+"_"+numdia).css("border-color","#BEBEBE");
		             $("#c_"+renglon[3]+"_"+numdia+"B").css("color","black");
		             }
		
		if (parseInt (terant)>parseInt (renglon[0])) {
			cad+=renglon[2]+" CON "+desant+"|";
			
			if (marcar) {$("#c_"+renglon[3]+"_"+numdia).css("border-color","red");
			             $("#c_"+inputant+"_"+numdia).css("border-color","red"); 
			             $("#c_"+renglon[3]+"_"+numdia+"B").css("color","red");
			             $("#c_"+inputant+"_"+numdia+"B").css("color","red"); }
			
		}
		terant=renglon[1];
		desant=renglon[2];
		inputant=renglon[3];
		
	}
	

	return cad;
}

function validarcruces(){
	
	var cadFin="";
	var eldia=[];
	var losdias=["LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO","DOMINGO"];
	
	//Horarios que se capturan de horas de descarga
	for (x=3;x<=9;x++) {
		 c=-1;
		 j=0;
		 eldia=[];
		
		 $('#tabHorarios tr').each(function () {
			 
		     if (c>=0) {
		        var i = $(this).find("td").eq(1).html();
		        hor=$("#c_"+i+"_"+x).val();
				if (hor!=="") {
					cad1=hor.substr(0,hor.indexOf("-"));
					cad2=hor.substr(hor.indexOf("-")+1,hor.length);
		            
					hora1=cad1.substr(0,cad1.indexOf(":"));
					min1=cad1.substr(cad1.indexOf(":")+1,cad1.length);
					
					hora2=cad2.substr(0,cad2.indexOf(":"));
					min2=cad2.substr(cad2.indexOf(":")+1,cad2.length);
					
					mintot1=parseInt(hora1)*60+parseInt(min1);
					mintot2=parseInt(hora2)*60+parseInt(min2);
                    
					eldia[j]=mintot1+"|"+mintot2+"|"+$("#c_"+i+"_"+"1 option:selected").html()+"|"+i+"|D";		
				
					j++;
					
				}
		     }
		     c++;		     
		 });
		 
		 
		 //Se anexan horarios de carga academica
		 c=-1;
		 $('#tabHorariosB tr').each(function () {
		     if (c>=0) {
		    	var i = $(this).find("td").eq(0).html(); 		    			   
		        hor=$("#c_"+i+"_"+x+"B").html();
				if (hor!=="") {
					cad1=hor.substr(0,hor.indexOf("-"));
					cad2=hor.substr(hor.indexOf("-")+1,hor.length);
		            
					hora1=cad1.substr(0,cad1.indexOf(":"));
					min1=cad1.substr(cad1.indexOf(":")+1,cad1.length);
					
					hora2=cad2.substr(0,cad2.indexOf(":"));
					min2=cad2.substr(cad2.indexOf(":")+1,cad2.length);
					
					mintot1=parseInt(hora1)*60+parseInt(min1);
					mintot2=parseInt(hora2)*60+parseInt(min2);
                    
					eldia[j]=mintot1+"|"+mintot2+"|"+$("#c_"+i+"_1B").html()+"-R"+$("#c_"+i+"_"+"0B").html()+"|"+i+"|C";					
					j++;
					
				}	
		     }
		     c++;		     
		 });
		 
		
		 
		 if (!(eldia.length==0)) {
			 res=verCruce(eldia,x,true);
			 if (res.length>0) {				  
			      cadFin+=losdias[x-3]+" "+res+"\n";
			 }			 
		 }
		 
	     
	 }
	 
	
	return cadFin;
	
}


function calculaHoras(){
	c=-1;
	$('#tabHorarios tr').each(function () {
		 var i = $(this).find("td").eq(1).html();
	    
	     if (c>=0) {
	    	 hortot=0;
	    	 for (x=3;x<=9;x++) {
	    		 hor=$("#c_"+i+"_"+x).val();
	    		 
	    		 if (!(hor=="")) {
		    		 cad1=hor.substr(0,hor.indexOf("-"));
					 cad2=hor.substr(hor.indexOf("-")+1,hor.length);
			            
					 hora1=cad1.substr(0,cad1.indexOf(":"));
					 min1=cad1.substr(cad1.indexOf(":")+1,cad1.length);
						
					 hora2=cad2.substr(0,cad2.indexOf(":"));
					 min2=cad2.substr(cad2.indexOf(":")+1,cad2.length);
						
					 mintot1=parseInt(hora1)*60+parseInt(min1);
					 mintot2=parseInt(hora2)*60+parseInt(min2);
					 
					 horas=(mintot2-mintot1)/60;
					 hortot+=horas;
	    		 }
	    	 }	
	    	 $("#c_"+i+"_10").val(hortot);  
	     }
	     c++;  	 	     		   
	 });
	 
}

function validarHorarios(){
	 error=false;
	 $(".input-mask-horario").each(function(){
		 
			hor=$(this).val();
			if (hor==":-:") {$(this).val(""); hor="";}
			if (hor!=="") {
				
				tam=hor.length;
				cad1=hor.substr(0,hor.indexOf("-"));
				cad2=hor.substr(hor.indexOf("-")+1,hor.length);
	            
				hora1=cad1.substr(0,cad1.indexOf(":"));
				min1=cad1.substr(cad1.indexOf(":")+1,cad1.length);
				
				hora2=cad2.substr(0,cad2.indexOf(":"));
				min2=cad2.substr(cad2.indexOf(":")+1,cad2.length);
				
				mintot1=parseInt(hora1)*60+parseInt(min1);
				mintot2=parseInt(hora2)*60+parseInt(min2);
				
				if ((!((parseInt(hora1)>=1) && (parseInt(hora1)<=23))) || (!((parseInt(hora2)>=1) && (parseInt(hora2)<=23)))) {
					$(this).css("border-color","red");
					error=true;
					 }
	
				
				if ((!((parseInt(min1)>=0) && (parseInt(min1)<=59))) || (!((parseInt(min2)>=0) && (parseInt(min2)<=59)))) {
					$(this).css("border-color","red");
					error=true;
					 }
				
				if (mintot1>=mintot2) {$(this).css("border-color","red"); error=true;}
				
				$(this).val(pad(hora1,2)+":"+pad(min1,2)+"-"+pad(hora2,2)+":"+pad(min2,2));
			}	
	 });
	 if (error) {alert ("Existen horarios que no tienen el formato HH:MM-HH:MM");}
	
	 return error;
	
}



function guardarHorario(institucion,campus){
	
	var form = $( "#frmdocumentos" );
	calculaHoras();
	
	
    var losdatos=[];
    var i=0; 
    var j=0; var cad="";
 
    if (!(validarHorarios())) {
    	
    	 res=validarcruces();
    	 
    	 
    	 if (res.length>0) {alert ("Existen los siguientes Cruces:\n "+res); return 0;}
    	
    	 $('#dlgproceso').modal({backdrop: 'static', keyboard: false});
    	 
   
    	 var c=-1;
    	 
    	 
    	 $('#tabHorarios tr').each(function () {
    		     if (c>=0) {
    		        var i = $(this).find("td").eq(1).html();
    		        cad+=$("#c_"+i+"_1").val()+"|"+    //Actividad  
    		        table.rows('.selected').data()[0][0]+"|"+    //Profesor  
    		        $("#c_"+i+"_2").val()+"|"+ //Descrip
                    $("#c_"+i+"_3").val()+"|"+ //Lunes
                    $("#c_"+i+"_4").val()+"|"+ //Martes
                    $("#c_"+i+"_5").val()+"|"+
                    $("#c_"+i+"_6").val()+"|"+
                    $("#c_"+i+"_7").val()+"|"+
                    $("#c_"+i+"_8").val()+"|"+
                    $("#c_"+i+"_9").val()+"|"+//domingo                  
                    $("#c_"+i+"_10").val()+"|"+
                    institucion+"|"+//Institucion
                    campus+"|"+//Campus
                    table.rows('.selected').data()[0][2];
		            losdatos[c]=cad; 
		            cad="";
		           
    		     }
		         c++;
    		 });
    	 

    	    var loscampos = ["DESC_ACTIVIDAD","DESC_PROFESOR","DESC_DESCRIP","LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO","DOMINGO",
    	    	            "DESC_HORAS","_INSTITUCION","_CAMPUS","DESC_CICLO",];

    	    parametros={
    	    		tabla:"edescarga",
    	    		campollave:"concat(DESC_PROFESOR,DESC_CICLO)",
    	    		bd:"Mysql",
    	    		valorllave:table.rows('.selected').data()[0]["CVE_PROFESOR"]+table.rows('.selected').data()[0]["CICLO"],
    	    		eliminar: "S",
    	    		separador:"|",
    	    		campos: JSON.stringify(loscampos),
    	    	    datos: JSON.stringify(losdatos)
    	    };
    	    

        	
        	
    	    $.ajax({
    	        type: "POST",
    	        url:"grabadetalle.php",
    	        data: parametros,
    	        success: function(data){
    	        	$('#modalDocument').modal("hide");  
    	        	$('#dlgproceso').modal("hide"); 
    	        	if (data.length>0) {alert ("Ocurrio un error: "+data);}
    	        	else {alert ("Registros guardados")}		                                	                                        					          
    	        }					     
    	    });    
    	    
    	 
    }  
       

    
}



function reporteDes(modulo,usuario,institucion, campus,essuper){	
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		window.open("../vcargasprof/horario.php?ID="+table.rows('.selected').data()[0][0]+"&ciclod="+table.rows('.selected').data()[0][3]+"&ciclo="+table.rows('.selected').data()[0][2], '_blank');
	}
	else {
		alert ("Debe seleccionar un profesor");
		return 0;
		}
}



function entInstxDepto(modulo,usuario,institucion, campus,essuper){	
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		window.open("../vcargasprof/entregaInst.php?profesor="+table.rows('.selected').data()[0]["CVE_PROFESOR"]+"&profesord="+
				table.rows('.selected').data()[0]["NOMBRE"]+"&ciclod="+table.rows('.selected').data()[0]["CICLOD"]+
				"&ciclo="+table.rows('.selected').data()[0]["CICLO"]+"&tipo=DEPTO&tipov="+
				table.rows('.selected').data()[0]["DEPTO"], '_blank');
	}
	else {
		alert ("Debe seleccionar un profesor");
		return 0;
		}
}


function entInstxCar(modulo,usuario,institucion, campus,essuper){	
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		window.open("../vcargasprof/entregaInst.php?profesor="+table.rows('.selected').data()[0]["CVE_PROFESOR"]+"&profesord="+
				    table.rows('.selected').data()[0]["NOMBRE"]+"&ciclod="+table.rows('.selected').data()[0]["CICLOD"]+
				    "&ciclo="+table.rows('.selected').data()[0]["CICLO"]+"&tipo=CAR&tipov="+
				    table.rows('.selected').data()[0]["CARRERA"], '_blank');
	}
	else {
		alert ("Debe seleccionar un profesor");
		return 0;
		}
}

function oficioDes(modulo,usuario,institucion, campus,essuper){	
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		window.open("../vcargasprof/oficiodes.php?ID="+table.rows('.selected').data()[0][0]+"&ciclod="+table.rows('.selected').data()[0][3]+"&ciclo="+table.rows('.selected').data()[0][2], '_blank');
	}
	else {
		alert ("Debe seleccionar un profesor");
		return 0;
		}
}