
function LEYENDAclicadd(DATO, usuario, institucion, campus){
   elsqlCic="SELECT * FROM eeventosprin where ID="+$("#EVENTO").val();
	parametros={sql:elsqlCic,dato:sessionStorage.co,bd:"Mysql"}
   $.ajax({
      type: "POST",
      data:parametros,
		url:  "../base/getdatossqlSeg.php",
      success: function(data){
            inicia=JSON.parse(data)[0]["INICIA"];
            termina=JSON.parse(data)[0]["TERMINA"];
            lugar=JSON.parse(data)[0]["LUGAR"];
            $("#LEYENDA").val("Por su valiosa participación como CONFERENCISTA del Tema "+$("#DESCRIPCION").val()+
            ", en el marco del "+ $("#EVENTO option:selected").text()+" Celebrado del "+fechaLetra(inicia)+
            " al "+fechaLetra(termina)+", en el "+lugar+"."
            );  
      }
});

  
}


function LEYENDA2clicadd(DATO, usuario, institucion, campus){
   elsqlCic="SELECT * FROM eeventosprin where ID="+$("#EVENTO").val();
	parametros={sql:elsqlCic,dato:sessionStorage.co,bd:"Mysql"}
   $.ajax({
      type: "POST",
      data:parametros,
		url:  "../base/getdatossqlSeg.php",
      success: function(data){
            inicia=JSON.parse(data)[0]["INICIA"];
            termina=JSON.parse(data)[0]["TERMINA"];
            lugar=JSON.parse(data)[0]["LUGAR"];
            $("#LEYENDA2").val("Por su valiosa participación como ASISTENTE en la CONFERENCIA "+$("#DESCRIPCION").val()+
            ", en el marco del "+ $("#EVENTO option:selected").text()+" Celebrado del "+fechaLetra(inicia)+
            " al "+fechaLetra(termina)+", en el "+lugar+"."
            );  
      }
});

  
}

