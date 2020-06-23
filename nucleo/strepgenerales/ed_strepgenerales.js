

function CAMPOSclicadd(){	
   var cadCampos="";
   var cadClases="";
   campos=$("#ELSQL").val().toUpperCase().split("SELECT")[1].split("FROM")[0].split(",");
  
   campos.forEach(function callback(currentValue, index, array) {
      cadCampos+=currentValue.trim()+"|";
      cadClases+="|";
   });
   cadCampos=cadCampos.substring(0,cadCampos.length-1);
   cadClases=cadClases.substring(0,cadClases.length-1);

   $("#CAMPOS").val(cadCampos);
   $("#CLASES").val(cadClases);
   $("#EVENTOS").val(cadClases);
   
   
}

function ELSQLclicadd(){	
	var str = $("#ELSQL").val().replace(/\n|\r/g, " ");
	$("#ELSQL").val(str);
}