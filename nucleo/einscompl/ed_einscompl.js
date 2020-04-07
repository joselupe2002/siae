

function changeACTIVIDAD(DATO, usuario, institucion, campus){
	
	
	elsql="select y.ACTIVIDADD as TIPO, count(*) as N from einscompl x, vecomplementaria y where x.ACTIVIDAD=y.ID and x.MATRICULA='"+$("#MATRICULA").val()+"' and "+ 
          " y.TIPO in (select a.TIPO from ecomplementaria a where a.ID='"+$("#ACTIVIDAD").val()+"')";
	
	agregarEspera("imggif_ACTIVIDAD",null);
	
	$.ajax({
        type: "GET",
        url: 'getdatossql.php?sql='+encodeURI(elsql)+"&sel=0&bd=Mysql", 
        success: function(data){ 
        	 losdatos=JSON.parse(data);
        	 jQuery.each(losdatos, function(clave, valor){
        	      if (valor.N==1) {alert ("El alumno con matricula: "+$("#MATRICULA").val()+" ya ha inscrito anteriormente actividad del tipo "+valor.TIPO)}
        	 });
        	          	 
             quitarEspera("imggif_ACTIVIDAD",null);

     },
     error: function(data) {
        alert('ERROR: '+data);
     }
   });  
   
}
