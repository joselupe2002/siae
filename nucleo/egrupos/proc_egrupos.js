var globlal;
var parte0="<div style=\"width:150px; padding-left:10px;padding-right:10px;padding-top:0; padding-bottom:0;\"><div class=\"row\">" +
		   "     <div class=\"col-md-5\" style=\"padding: 0;\"><select style=\"width:100%; font-size:11px;  font-weight:bold; color:#0E536C;\"";
var parte1="</div><div class=\"col-md-7\" style=\"padding: 0;\">" +
		   " <input  autocomplete=\"off\" class= \"small form-control input-mask-horario\" style=\"width:100%;  " +
		                    " font-size:11px;  font-weight:bold; color:#03661E; height: 30px;\" type=\"text\"";
var parte2="</input></div></div></td>";

function horarios(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \" role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "                           <div class=\"row\"> "+	
	       "                                <div class=\"col-sm-4\" style=\"padding:0;\"> "+	
		   "                                       <select class=\"form-control\" id=\"add\"></select>"+
		   "                                 </div>"+
		   "                                <div class=\"col-sm-1\" style=\"padding:0;\"> "+
		   "                                      <button type=\"button\" class=\"btn btn-white btn-info btn-bold\" onclick=\"agregarAsignatura();\">"+
		   "                                      <i class=\"ace-icon fa fa-plus bigger-120 blue\"></i></button>"+
		   "                                 </div>"+
		   "                                <div class=\"col-sm-1\"> "+
		   "                                      <button type=\"button\" class=\"btn btn-white btn-success btn-bold\" onclick=\"guardarHorarios();\">"+
		   "                                      <i class=\"ace-icon fa fa-floppy-o bigger-120 success\"></i></button>"+
		   "                                 </div>"+
		   "                           </div>"+		   
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow-x: auto; overflow-y: auto; height:370px;\">"+	
	       "                           <table id=\"tabHorarios\" class= \"table table-condensed table-bordered table-hover\">"+
	   	   "                              <thead>  "+
		   "                                  <tr>"+
		   "                             	     <th>Op</th> "+	
		   "                             	     <th>R</th> "+
		   "                             	     <th>ID</th> "+
		   "                             	     <th>Asignatura</th> "+
		   "                             	     <th>Profesor</th> "+
		   "                             	     <th>Grupo</th> "+
		   "                             	     <th>HT</th> "+
		   "                             	     <th>HP</th> "+
		   "                             	     <th>Lunes</th> "+
		   "                             	     <th>Martes</th> "+
		   "                             	     <th>Miercoles</th> "+
		   "                             	     <th>Jueves</th> "+
		   "                             	     <th>Viernes</th> "+
		   "                             	     <th>Sabado</th> "+
		   "                             	     <th>Domingo</th> "+	  
		   "                             	     <th>Cupo</th> "+			   
		   "                      			</tr> "+
		   "                              </thead>" +
		   "                           </table>"+	
		   "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   " <select id=\"aulas\" style=\"visibility:hidden\"></select> "
		   "</div>";
	 
		 $("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	    }
	    
		$('#modalDocument').modal({show:true, backdrop: 'static'});
		
		elsql="SELECT count(*) as NUM FROM edgrupos WHERE DGRU_GRUPO='"+table.rows('.selected').data()[0][0]+"'";
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){  
	        	      losdatos=JSON.parse(data);  
	        	      
	        	      jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; });
	        
	        	    	  if (hay<=0) {	 
							  
							 elsql="SELECT 'SN' as id, CICL_MATERIA as materia, CICL_MATERIAD as materiad,  '' as profesor, CICL_HT AS ht, CICL_HP as hp,"+
							 "'' as lunes, '' as martes, '' as miercoles, '' as jueves, '' as viernes, '' as sabado, '' as domingo,  "+
							 "'' as a_lunes, '' as a_martes, '' as a_miercoles, '' as a_jueves, '' as a_viernes, '' as a_sabado, '' as a_domingo, '30' as cupo "+
							 
							 " FROM veciclmate WHERE CICL_MAPA='"+table.rows('.selected').data()[0][5]+"' AND " +
							   "CICL_CUATRIMESTRE='"+table.rows('.selected').data()[0][7]+"'";

							 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	        	    		  $.ajax({
								  type: "POST",
								  data:parametros,
	        	   	           url:  "../base/getdatossqlSeg.php",
	        	   	           success: function(data){ 
	        	   	        	
	        	   	        	     generaTabla(JSON.parse(data));
	        	   	                 },
	        	   	           error: function(data) {	                  
	        	   	                      alert('ERROR: '+data);
	        	   	                  }
	        	   	          });
	        	   	   
	        	    	  }
	        	    	  else {
							  
							  elsql="SELECT DGRU_ID AS id, DGRU_MATERIA AS materia, MATE_DESCRIP AS materiad, "+
							  " DGRU_PROFESOR AS profesor, CICL_HT AS ht, CICL_HP as hp, LUNES AS lunes, MARTES AS martes, MIERCOLES as miercoles,"+
							  " JUEVES as jueves, VIERNES as viernes, SABADO as sabado, DOMINGO as domingo,   "+
							  " A_LUNES AS a_lunes, A_MARTES AS a_martes, A_MIERCOLES AS a_miercoles, A_JUEVES AS a_jueves, "+
							  " A_VIERNES AS a_viernes, A_SABADO AS a_sabado, A_DOMINGO AS a_domingo, CUPO as cupo,SIE"+
							  " FROM edgrupos, cmaterias, eciclmate WHERE DGRU_GRUPO='"+table.rows('.selected').data()[0][0]+"'"+
							  " and MATE_CLAVE=DGRU_MATERIA and MATE_CLAVE=CICL_MATERIA AND CICL_MAPA='"+table.rows('.selected').data()[0][5]+"'";

							  parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	        	    		  $.ajax({
									  type: "POST",
									  data:parametros,
		        	   	           url:  "../base/getdatossqlSeg.php",
		        	   	           success: function(data){  		        	   	        	 
		        	   	        	     
		        	   	        	     generaTabla(JSON.parse(data));
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
	    
	
	   elsql="SELECT CICL_MATERIA, CONCAT(CICL_CUATRIMESTRE,'|',MATE_DESCRIP,'|',CICL_HT,'|',CICL_HP,'|',CICL_MATERIA) FROM  eciclmate, cmaterias WHERE "+
	   "CICL_MAPA='"+table.rows('.selected').data()[0][5]+"' and CICL_MATERIA=MATE_CLAVE ORDER BY CICL_CUATRIMESTRE, MATE_DESCRIP";
	   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}

	    $.ajax({
			   type: "POST",			   
               data:parametros,
	           url:  "../base/dameselectSeg.php",
	           success: function(data){
	        	   $("#add").html(data);   
	        	
	           }
	    });
		
		elsql="select AULA_CLAVE, AULA_DESCRIP from eaula order by AULA_DESCRIP";
        parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}	    
	    $.ajax({
			   type: "POST",			   
               data:parametros,
	           url:  "../base/dameselectSeg.php",
	           success: function(data){
	        	   $("#aulas").html(data);   
	           }
	    });
	    
		
	}
	else {
		alert ("Debe seleccionar un grupo");
		return 0;

		}
	
}



function agregarAsignatura(){	
     if ($("#add").val()==0) {alert ("Por favor elija una asignatura"); return 0;}
     
     esta=false;
	 $('#tabHorarios tr').each(function () {
	     if (c>=0) {
	        var i = $(this).find("td").eq(1).html();
	        if ($("#c_"+i+"_1").val()==$("#add").val()) {
	        	esta=true; alert ("La asignatura ya esta agregada en la Lista"); return 0;
	        }
	     }
         c++;
	 });
	 if (!(esta)) {
		    lamateria=$("#add option:selected").html().split("|");
		    $("#cuerpo").append("<tr id=\"row"+global+"\">");
			$("#row"+global).append("<td><button onclick=\"eliminarFila('row"+global+"');\" class=\"btn btn-xs btn-danger\"> " +
                  "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
                  "</button></td>");
			$("#row"+global).append("<td>"+global+"</td>");
			$("#row"+global).append("<td>"+ "<label id=\"c_"+global+"_0\" class=\"small text-info font-weight-bold\">SC</label</td>");
			$("#row"+global).append("<td><input  style=\"width:100%\" type=\"hidden\" value=\""+$("#add").val()+"\" id=\"c_"+global+"_1\"></input>"+
					                     "<label  id=\"c_"+global+"_1B\" class=\"font-weight-bold small text-info\">"+lamateria[1]+"</label></td>");
			$("#row"+global).append("<td><select id=\"c_"+global+"_2\" style=\"width:200px;\"></select></td>");
			$("#row"+global).append("<td><input style=\"width:50px;\" id=\"c_"+global+"_2SIE\"></td>");
			$("#row"+global).append("<td>"+lamateria[2]+"</td>");
			$("#row"+global).append("<td>"+lamateria[3]+"</td>");
			$("#row"+global).append("<td>"+parte0+" id=\"c_"+global+"_3B\"></select>"+parte1+" id=\"c_"+global+"_3\">"+parte2);
			$("#row"+global).append("<td>"+parte0+" id=\"c_"+global+"_4B\"></select>"+parte1+" id=\"c_"+global+"_4\">"+parte2);
			$("#row"+global).append("<td>"+parte0+" id=\"c_"+global+"_5B\"></select>"+parte1+" id=\"c_"+global+"_5\">"+parte2);
			$("#row"+global).append("<td>"+parte0+" id=\"c_"+global+"_6B\"></select>"+parte1+" id=\"c_"+global+"_6\">"+parte2);
			$("#row"+global).append("<td>"+parte0+" id=\"c_"+global+"_7B\"></select>"+parte1+" id=\"c_"+global+"_7\">"+parte2);
			$("#row"+global).append("<td>"+parte0+" id=\"c_"+global+"_8B\"></select>"+parte1+" id=\"c_"+global+"_8\">"+parte2);
			$("#row"+global).append("<td>"+parte0+" id=\"c_"+global+"_9B\"></select>"+parte1+" id=\"c_"+global+"_9\">"+parte2);
			$("#row"+global).append("<td><input  style=\"width:100%\" type=\"text\" class=\"input-mask-numero\" value=\"30\" id=\"c_"+global+"_10\"></input></td>");
			
			$("#c_"+global+"_2").html($("#losprofes").html()); 
			$("#c_"+global+"_3B").html($("#aulas").html()); 
			$("#c_"+global+"_4B").html($("#aulas").html()); 
			$("#c_"+global+"_5B").html($("#aulas").html()); 
			$("#c_"+global+"_6B").html($("#aulas").html()); 
			$("#c_"+global+"_7B").html($("#aulas").html()); 
			$("#c_"+global+"_8B").html($("#aulas").html()); 
			$("#c_"+global+"_9B").html($("#aulas").html()); 
			$("#c_"+global+"_2").val("0");
  		    
			global++;
	 }
}

function eliminarFila(nombre) {
	var r = confirm("Seguro que desea eliminar del horario esta asignatura");
	if (r == true) {
        $("#"+nombre).remove();
        }
}

function generaTabla(grid_data){
	$("#frmdocumentos").append("<select style=\"visibility:hidden;\" id=\"losprofes\">");
	global=1;
	elsql="SELECT EMPL_NUMERO, CONCAT(IFNULL(EMPL_APEPAT,''),' ',IFNULL(EMPL_APEMAT,''),' ',IFNULL(EMPL_NOMBRE,''),' ',EMPL_NUMERO) AS NOMBRE FROM pempleados ORDER BY 2";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}	
		
	 $.ajax({
	           type: "POST",
			   data:parametros,  
			   url:  "../base/dameselectSeg.php?",			   
	           success: function(data){
	        	    $("#losprofes").html(data);
	        	    $("#cuerpo").empty();
	        	    $("#tabHorarios").append("<tbody id=\"cuerpo\">");
	        		c=1;	    
	        		jQuery.each(grid_data, function(clave, valor) { 	        			
	        			$("#cuerpo").append("<tr id=\"row"+c+"\">");
	        			$("#row"+c).append("<td><button onclick=\"eliminarFila('row"+c+"');\" class=\"btn btn-xs btn-danger\"> " +
			                     "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
			                     "</button></td>");
	        			$("#row"+c).append("<td>"+c+"</td>");
	        			$("#row"+c).append("<td>"+ "<label id=\"c_"+c+"_0\" class=\"small text-info font-weight-bold\">"+valor.id+"</label</td>");
	        			$("#row"+c).append("<td><input  style=\"width:100%\" type=\"hidden\" value=\""+valor.materia+"\" id=\"c_"+c+"_1\"></input>"+
	        					                     "<label  id=\"c_"+c+"_1B\" class=\"font-weight-bold small text-info\">"+valor.materiad+"</label></td>");
	        			$("#row"+c).append("<td><select id=\"c_"+c+"_2\" style=\"width:200px;\"></select></td>");
	        			$("#row"+c).append("<td><input style=\"width:50px;\" id=\"c_"+c+"_2SIE\" value=\""+valor.SIE+"\"></td>");
	        			$("#row"+c).append("<td>"+valor.ht+"</td>");
	        			$("#row"+c).append("<td>"+valor.hp+"</td>");
	        			$("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_3B\"></select>"+parte1+" id=\"c_"+c+"_3\" value=\""+valor.lunes+"\">"+parte2);
	        			$("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_4B\"></select>"+parte1+" id=\"c_"+c+"_4\" value=\""+valor.martes+"\">"+parte2);
	        			$("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_5B\"></select>"+parte1+" id=\"c_"+c+"_5\" value=\""+valor.miercoles+"\">"+parte2);
	        			$("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_6B\"></select>"+parte1+" id=\"c_"+c+"_6\" value=\""+valor.jueves+"\">"+parte2);
	        			$("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_7B\"></select>"+parte1+" id=\"c_"+c+"_7\" value=\""+valor.viernes+"\">"+parte2);
	        			$("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_8B\"></select>"+parte1+" id=\"c_"+c+"_8\" value=\""+valor.sabado+"\">"+parte2);
	        			$("#row"+c).append("<td>"+parte0+" id=\"c_"+c+"_9B\"></select>"+parte1+" id=\"c_"+c+"_9\" value=\""+valor.domingo+"\">"+parte2);
	        			$("#row"+c).append("<td><input  style=\"width:100%\" type=\"text\" class=\"input-mask-numero\" value=\""+valor.cupo+"\" id=\"c_"+c+"_10\"></input></td>");
	        			
	        			$("#c_"+c+"_2").html($("#losprofes").html()); 
	        			$("#c_"+c+"_2").val(valor.profesor);
	        			
	        			$("#c_"+c+"_3B").html($("#aulas").html()); 
	        			$("#c_"+c+"_3B").val(valor.a_lunes); 
	        			$("#c_"+c+"_4B").html($("#aulas").html()); 
	        			$("#c_"+c+"_4B").val(valor.a_martes); 
	        			$("#c_"+c+"_5B").html($("#aulas").html()); 
	        			$("#c_"+c+"_5B").val(valor.a_miercoles); 
	        			$("#c_"+c+"_6B").html($("#aulas").html()); 
	        			$("#c_"+c+"_6B").val(valor.a_jueves); 
	        			$("#c_"+c+"_7B").html($("#aulas").html()); 
	        			$("#c_"+c+"_7B").val(valor.a_viernes); 
	        			$("#c_"+c+"_8B").html($("#aulas").html()); 
	        			$("#c_"+c+"_8B").val(valor.a_sabado); 
	        			$("#c_"+c+"_9B").html($("#aulas").html()); 
	        			$("#c_"+c+"_9B").val(valor.a_domingo); 
	        			
	        			c++;
	        			global=c;
	        			//$("#profe"+valor.materia).appendTo("#losprofes");
	        			
	        		});
	        	   
	        	   
	                 },
	          });

}



function agregarAula(hor){
	if ($("#aulas").val()==0) {alert ("Por favor elija un aula"); return 0;}
	if ($("#"+hor).val().length>0) { 
        $("#"+hor+"B").html($("#aulas").val());	
	}
}


function setAulasAll(op){
	if (($("#aulas").val()==0) && (op==1)) {alert ("Por favor elija un aula"); return 0;}
	$(".aulas-fa").each(function(){
		id=$(this).attr("id").substring(0,$(this).attr("id").length-1);
		if ($("#"+id).val().length>0) {
			if (op==1) { $(this).html($("#aulas").val()); }			
		}		
		if (op==0) { $(this).html(""); }
	});
		
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
	if (marcar) {$("#c_"+inputant+"_"+numdia).css("border-color","#BEBEBE");}
	cad="";
	for (i=1;i<arreglo.length;i++){		
		renglon=arreglo[i].split("|");
		if (marcar) {$("#c_"+renglon[3]+"_"+numdia).css("border-color","#BEBEBE");}
		if (parseInt (terant)>parseInt (renglon[0])) { 
			cad+=renglon[2]+" CON "+desant+"|";
			if (marcar) {$("#c_"+renglon[3]+"_"+numdia).css("border-color","red");
			             $("#c_"+inputant+"_"+numdia).css("border-color","red");}
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
                    
					eldia[j]=mintot1+"|"+mintot2+"|"+$("#c_"+i+"_"+"1B").html()+"|"+i;					
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



function guardarHorarios(){
	var form = $( "#frmdocumentos" );
	
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
    		        cad+=$("#c_"+i+"_1").val()+"|"+    //Materia
                    $("#c_"+i+"_2").val()+"|"+    //Profesor
                    table.rows('.selected').data()[0][0]+"|"+ //Grupo
                    $("#c_"+i+"_3").val()+"|"+ //Lunes
                    $("#c_"+i+"_4").val()+"|"+ //Martes
                    $("#c_"+i+"_5").val()+"|"+
                    $("#c_"+i+"_6").val()+"|"+
                    $("#c_"+i+"_7").val()+"|"+
                    $("#c_"+i+"_8").val()+"|"+
                    $("#c_"+i+"_9").val()+"|"+
                    $("#c_"+i+"_3B").val()+"|"+ //Lunes Aulas
                    $("#c_"+i+"_4B").val()+"|"+ //Martes
                    $("#c_"+i+"_5B").val()+"|"+
                    $("#c_"+i+"_6B").val()+"|"+
                    $("#c_"+i+"_7B").val()+"|"+
                    $("#c_"+i+"_8B").val()+"|"+
                    $("#c_"+i+"_9B").val()+"|"+
                    $("#c_"+i+"_10").val()+"|"+
                    $("#c_"+i+"_2SIE").val();
		            losdatos[c]=cad; 
		            cad="";
    		     }
		         c++;
    		 });
    	 
    
    	    
    	    var loscampos = ["DGRU_MATERIA","DGRU_PROFESOR","DGRU_GRUPO","LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO","DOMINGO",
    	    	             "A_LUNES","A_MARTES","A_MIERCOLES","A_JUEVES","A_VIERNES","A_SABADO","A_DOMINGO","CUPO","SIE"];
    	    
    	    parametros={
    	    		tabla:"edgrupos",
    	    		campollave:"DGRU_GRUPO",
    	    		bd:"Mysql",
    	    		valorllave:table.rows('.selected').data()[0][0],
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

