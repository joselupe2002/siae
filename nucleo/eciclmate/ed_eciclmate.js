

function changeCICL_MAPA(DATO, usuario, institucion, campus){
	elsql="SELECT MATE_CLAVE, CONCAT(MATE_DESCRIP,' ',MATE_CLAVE) FROM cmaterias WHERE MATE_CLAVE NOT IN "+
	         "(SELECT CICL_MATERIA FROM eciclmate WHERE CICL_MAPA='"+$("#CICL_MAPA").val()+"') ORDER BY MATE_DESCRIP";
	agregarEspera("imggif_CICL_MATERIA",null);
	$.ajax({
        type: "GET",
        url: 'dameselect.php?sql='+encodeURI(elsql)+"&sel=0&bd=Mysql", 
        success: function(data){ 
        	  $("#CICL_MATERIA").empty();
              $("#CICL_MATERIA").html(data);                               
        	  $('#CICL_MATERIA').trigger("chosen:updated"); 
        	          	 
             quitarEspera("imggif_CICL_MATERIA",null);

     },
     error: function(data) {
        alert('ERROR: '+data);
     }
   });     
}


function changeCICL_CICLO(DATO, usuario, institucion, campus){
	elsql="SELECT CONCAT(CICL_DE, \"|\",CICL_A) FROM ciclosfor WHERE CICL_CLAVE='"+$("#CICL_CICLO").val()+"'";
	
	agregarEspera("imggif_CICL_CUATRIMESTRE",null);
	$.ajax({
        type: "GET",
        url: 'damedato.php?sql='+encodeURI(elsql)+"&numcol=0&bd=Mysql", 
        success: function(data){  
        	 periodo=data.split("|");
        	  $("#CICL_CUATRIMESTRE").empty();
        	 for (x=periodo[0];x<=periodo[1];x++){
        	     $("#CICL_CUATRIMESTRE").append("<option id=\""+x+"\">"+x+"</option>");   
        	 }
             quitarEspera("imggif_CICL_CUATRIMESTRE",null);
     },
     error: function(data) {
        alert('ERROR: '+data);
     }
   });     
}


function changeCICL_MATERIA(DATO, usuario, institucion, campus){

	if ($("#CICL_CLAVEMAPA").val().length<=0) {
	   $("#CICL_CLAVEMAPA").val( $("#CICL_MATERIA").val());

	}
}