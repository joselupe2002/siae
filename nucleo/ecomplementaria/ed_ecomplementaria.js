

function changeTIPO(elemento, usuario, institucion, campus){
	  var empl="";
	  $.ajax({
          type: "GET",
          url:  "../base/getdatossql.php?bd=Mysql&sql=SELECT EMPL_NUMERO as NUM FROM pempleados WHERE EMPL_USER='"+usuario+"'",
          success: function(data){  
       	      losdatos=JSON.parse(data);  
       	      jQuery.each(losdatos, function(clave, valor) { empl=valor.NUM; });    
       	      
       	      $("#LUNES").mask("99:99-99:99");
       	      $("#MARTES").mask("99:99-99:99");
       	      $("#MIERCOLES").mask("99:99-99:99"); 
       		  $("#JUEVES").mask("99:99-99:99");    
       		  $("#VIERNES").mask("99:99-99:99");   
       		  $("#SABADO").mask("99:99-99:99");
       		  $("#DOMINGO").mask("99:99-99:99");      
       		  $('#RESPONSABLE').val(empl);
       		  $('#RESPONSABLE').trigger("chosen:updated");

          }
	  });
	  
	
    
	
}



