var globlal=1;
var lostipos="";
var c=0;

function dameElemento(tipo,id,valor,evento, ancho){
	cad="";
    if (tipo=='INPUT_BTN') {
	     cad="<div class=\"input-group\" style=\"width:"+ancho+"px;\" >"+		        
		         "<input  class=\"form-control\" style=\"width:210px;\" type=\"text\" value=\""+valor+"\" id=\""+id+"\" />"+
	             "<span onclick=\""+evento+"();\" style=\"cursor:pointer;\"class=\"input-group-addon\">"+
	                     "<i class=\"ace-icon blue  fa fa-search-plus\"></i></span>"+
              "</div> ";}
    
	if (tipo=='INPUT') {
		     cad="<input  class=\"form-control\"  style=\"width:"+ancho+"px;\" type=\"text\" value=\""+valor+"\" id=\""+id+"\" />";
	}
	
	if (tipo=='SELECT_SN') {
	     cad="<SELECT  class=\"form-control\"  style=\"width:"+ancho+"px;\" id=\""+id+"\">"+
	         "<OPTION value=\"S\">SI</OPTION>"+
	         "<OPTION value=\"N\">NO</OPTION>"+
	         "<SELECT>";
    }
	
	if (tipo=='SELECT_TIPO') {
	     cad="<SELECT  class=\"form-control\"  style=\"width:"+ancho+"px;\" id=\""+id+"\"><SELECT>";	  
   }
	
	return(cad);

}


function addComentarios(modulo,usuario,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		script="<div class=\"modal fade\" id=\"modalDocument\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> "+
	       "   <div class=\"modal-dialog modal-lg \"  role=\"document\">"+
		   "      <div class=\"modal-content\">"+
		   "          <div class=\"modal-header\">"+
		   "             <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cancelar\">"+
		   "                  <span aria-hidden=\"true\">&times;</span>"+
		   "             </button>"+
		   "             <div class=\"row\"> "+			
	       "                 <div class=\"col-sm-3\"> "+			   
		   "                      <select class=\"form-control\" id=\"campos\"></select>"+	
		   "                  </div>"+
	       "                 <div class=\"col-sm-3\"> "+
	       "                      <button title=\"Agregar un nuevo campo\" type=\"button\" class=\"btn btn-white btn-dark btn-bold\" onclick=\"agregarCampo();\">"+
		   "                      <i class=\"ace-icon fa fa-plus  bigger-120 blue\"></i></button>"+
	       "                      <button title=\"Guardar todos los cambios\" type=\"button\" class=\"btn btn-white btn-warning btn-bold\" onclick=\"guardarComments();\">"+
		   "                      <i class=\"ace-icon fa fa-floppy-o bigger-120 red\"></i></button>"+		   
		   "                 </div>"+	
		   "             </div>"+		   
		   "          </div>"+
		   "          <div id=\"frmdocumentos\" class=\"modal-body\" style=\"overflow: auto;\">"+	
	       "                           <table id=\"tabHorarios\" class= \"table table-hover\">"+
	   	   "                              <thead>  "+
		   "                                  <tr>"+
		   "                             	     <th>Op</th> "+
		   "                             	     <th>R</th> "+
		   "                             	     <th>ID</th> "+		   
		   "                             	     <th>Columna</th> "+	
		   "                             	     <th>Título</th> "+
		   "                             	     <th>Descripción</th> "+
		   "                             	     <th>Orden</th> "+
		   "                             	     <th>LLave</th> "+
		   "                             	     <th>Tipo</th> "+
		   "                             	     <th>Grid</th> "+
		   "                             	     <th>Formulario</th> "+
		   "                             	     <th>Validación</th> "+
		   "                             	     <th>Mensaje_Val</th> "+
		   "                             	     <th>SQL</th> "+
		   "                             	     <th>Sección</th> "+
		   "                             	     <th>Gif</th> "+
		   "                             	     <th>Autoincremento</th> "+	   
		   "                      			</tr> "+
		   "                              </thead>" +
		   "                           </table>"+	
		   "          </div>"+
		   "      </div>"+
		   "   </div>"+
		   "</div>";
	 
		
		 $("#modalDocument").remove();
	    if (! ( $("#modalDocument").length )) {
	        $("#grid_"+modulo).append(script);
	     
	    }
	    
	    $('#modalDocument').modal({show:true});
	    $.ajax({
	           type: "GET",
	           url:  "../base/getdatossql.php?bd=SQLite&sql=SELECT count(*) as NUM FROM ALL_COL_COMMENT WHERE table_name='"+table.rows('.selected').data()[0][5]+"'",
	           success: function(data){  
	        	      losdatos=JSON.parse(data);  
	        	        
	        	      jQuery.each(losdatos, function(clave, valor) { hay=valor.NUM; });
	        
	        	    	  if (hay>0) {	        	    			        	    	
	        	    		  $.ajax({
	        	   	           type: "GET",
	        	   	           url:  "../base/getdatossql.php?bd=SQLite&sql=SELECT num, colum_name, comments,comentario, "+
	        	   	                 " numero,keys,tipo, visgrid,visfrm,validacion, msjval, sql, seccion, gif, autoinc "+
	        	   	                 " FROM ALL_COL_COMMENT WHERE table_name='"+table.rows('.selected').data()[0][5]+"' order by numero",
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
	    
	    
	    $.ajax({
	           type: "GET",
	           url:  "../base/dameselect.php?sql="+encodeURI("SELECT DISTINCT(tipo), tipo FROM all_col_comment where  tipo is not null and tipo<>'' order by 1")+"&sel=0&bd=SQLite",
	           success: function(data){
	        	  lostipos=data;   
	           }
	    });
	    
	  
	    $.ajax({
	           type: "GET",
	           url:  "../base/dameselect.php?sql="+encodeURI("SELECT COLUMN_NAME, COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'sigea' AND TABLE_NAME = '"+table.rows('.selected').data()[0][5]+"'")+"&sel=0&bd=Mysql",
	           success: function(data){
	        	   $("#campos").html(data);   
	           }
	    });
	    
		
	}
	else {
		alert ("Debe seleccionar un grupo");
		return 0;

		}
	
}




function generaTabla(grid_data){
	
	 $("#cuerpo").empty();
	 $("#tabHorarios").append("<tbody id=\"cuerpo\">");
     c=1;	    
		
	jQuery.each(grid_data, function(clave, valor) { 	        			
		$("#cuerpo").append("<tr id=\"row"+c+"\">");
		$("#row"+c).append("<td><button onclick=\"eliminarFila('row"+c+"');\" class=\"btn btn-xs btn-danger\"> " +
                 "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
                 "</button></td>");
		$("#row"+c).append("<td>"+c+"</td>");
		$("#row"+c).append("<td>"+ "<label id=\"c_"+c+"_0\" class=\"small text-info font-weight-bold\">"+valor.num+"</label</td>");
		$("#row"+c).append("<td><label  id=\"c_"+c+"_1\" class=\"font-weight-bold small text-info\">"+valor.colum_name+"</label></td>");
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_2',valor.comments,'',110));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_3',valor.comentario,'',180));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_4',valor.numero,'',110));
		$("#row"+c).append("<td>"+dameElemento('SELECT_SN','c_'+c+'_5',valor.keys,'',60));
		$("#c_"+c+"_5").val(valor.keys);		     
		$("#row"+c).append("<td>"+dameElemento('SELECT_TIPO','c_'+c+'_6',valor.tipo,'',80));
		$("#c_"+c+"_6").html(lostipos);
		$("#c_"+c+"_6").val(valor.tipo);
		$("#row"+c).append("<td>"+dameElemento('SELECT_SN','c_'+c+'_7',valor.visgrid,'',60));
		$("#c_"+c+"_7").val(valor.visgrid);
		$("#row"+c).append("<td>"+dameElemento('SELECT_SN','c_'+c+'_8',valor.visfrm,'',60));
		$("#c_"+c+"_8").val(valor.visfrm);
		$("#row"+c).append("<td>"+dameElemento('INPUT_BTN','c_'+c+'_9',valor.validacion,'helpValida',100));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_10',valor.msjval,'',110));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_11',valor.sql,'',110));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_12',valor.seccion,'',110));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_13',valor.gif,'',110));
		$("#row"+c).append("<td>"+dameElemento('INPUT','c_'+c+'_14',valor.autoinc,'',110));
			
		c++;
		global=c;
	});
}




function agregarCampo(){	
	
     if ($("#campos").val()==0) {alert ("Por favor elija una asignatura"); return 0;}
     
     esta=false;
	 $('#tabHorarios tr').each(function () {
	     if (c>=0) {
	        var i = $(this).find("td").eq(1).html();		        
	        if ($("#c_"+i+"_1").html()==$("#campos").val()) {
	        	esta=true; alert ("El campo ya esta agregado en la Lista"); return 0;
	        }
	     }
         c++;
	 });
	 
	 if ($("#cuerpo").length<=0) {global=1; $("#tabHorarios").append("<tbody id=\"cuerpo\">");}
	 
	 
	 if (!(esta)) {
		     
		    $("#cuerpo").append("<tr id=\"row"+global+"\">");
			$("#row"+global).append("<td><button onclick=\"eliminarFila('row"+c+"');\" class=\"btn btn-xs btn-danger\"> " +
	                 "    <i class=\"ace-icon fa fa-trash-o bigger-120\"></i>" +
	                 "</button></td>");
			$("#row"+global).append("<td>"+global+"</td>");
			$("#row"+global).append("<td>"+ "<label id=\"c_"+global+"_0\" class=\"small text-info font-weight-bold\">SC</label</td>");
			
			$("#row"+global).append("<td><label  id=\"c_"+global+"_1\" class=\"font-weight-bold small text-info\">"+$("#campos").val()+"</label></td>");
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_2','','',110));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_3','','',110));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_4','','',180));
			$("#row"+global).append("<td>"+dameElemento('SELECT_SN','c_'+global+'_5','','',60));	     
			$("#row"+global).append("<td>"+dameElemento('SELECT_TIPO','c_'+global+'_6','','',80));
			$("#row"+global).append("<td>"+dameElemento('SELECT_SN','c_'+global+'_7','','',60));
			$("#row"+global).append("<td>"+dameElemento('SELECT_SN','c_'+global+'_8','','',60));
			$("#row"+global).append("<td>"+dameElemento('INPUT_BTN','c_'+global+'_9','','helpValida',100));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_10','','',110));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_11','','',110));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_12','','',110));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_13','','',110));
			$("#row"+global).append("<td>"+dameElemento('INPUT','c_'+global+'_14','','',110));

			global++;
	 }
}

function eliminarFila(nombre) {
	var r = confirm("Seguro que desea eliminar del horario esta asignatura");
	if (r == true) {
        $("#"+nombre).remove();
        }
}




function guardarComments(){
	var form = $( "#frmdocumentos" );
	
    var losdatos=[];
    var i=0; 
    var j=0; var cad="";
    var c=-1;
    	
    $('#tabHorarios tr').each(function () {
    		     if (c>=0) {
    		        var i = $(this).find("td").eq(1).html();
    		        cad+= table.rows('.selected').data()[0][5]+"|"+ //table_name
    		        $("#c_"+i+"_1").html()+"|"+    //colum_name
                    $("#c_"+i+"_2").val()+"|"+    //comments                  
                    $("#c_"+i+"_3").val()+"|"+ //comentario
                    $("#c_"+i+"_4").val()+"|"+ //numero
                    $("#c_"+i+"_5").val()+"|"+ //keys
                    $("#c_"+i+"_6").val()+"|"+ //tipo
                    $("#c_"+i+"_7").val()+"|"+ //visgrid
                    $("#c_"+i+"_8").val()+"|"+ //visfrm
                    $("#c_"+i+"_9").val()+"|"+ //validacion
                    $("#c_"+i+"_10").html()+"|"+ //msjval
                    $("#c_"+i+"_11").html()+"|"+ //sql
                    $("#c_"+i+"_12").html()+"|"+ //seccion
                    $("#c_"+i+"_13").html()+"|"+ //gif
                    $("#c_"+i+"_14").html(); //autoinc
                
		            losdatos[c]=cad;
		            
		            cad="";
    		     }
		         c++;
    		 });
    	 
    	    var loscampos = ["table_name","colum_name","comments","comentario","numero","keys","tipo","visgrid","visfrm","validacion","msjval",
    	    	             "sql","seccion","gif","autoinc"];
    	    
    	    parametros={
    	    		tabla:"ALL_COL_COMMENT",
    	    		campollave:"table_name",
    	    		bd:"SQLite",
    	    		valorllave:table.rows('.selected').data()[0][5],
    	    		eliminar: "S",
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

