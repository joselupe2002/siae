

function changeMATRICULA(DATO, usuario, institucion, campus){
   elsql=" SELECT "+
         "       (SELECT sum(l.CREDITO) FROM kardexcursadas l where l.MATRICULA='"+$("#MATRICULA").val()+"') AS CREDITOS,"+
         "       (SELECT ROUND(avg(l.CAL)) FROM kardexcursadas l where l.MATRICULA='"+$("#MATRICULA").val()+"' AND l.TIPOMAT NOT IN ('SS','AC')) AS PROM,"+
         "       (SELECT getavanceMatCiclo('"+$("#MATRICULA").val()+"',getciclo()) from dual) AS AVANCE"+
         " FROM DUAL "; 

   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}   
   $.ajax({
      type: "POST",
      data:parametros,
      url: 'getdatossqlSeg.php', 
      success: function(data){ 
         jQuery.each(JSON.parse(data), function(clave, valor) { 	
           $("#AVANCE").val(valor.AVANCE);
           $("#CREDITOS").val(valor.CREDITOS);
           $("#PROMEDIO").val(valor.PROM);                      
         });
      }
   });
   elsql2=" SELECT ALUM_CICLOINS, ALUM_CICLOTER FROM falumnos a WHERE  ALUM_MATRICULA='"+$("#MATRICULA").val()+"'";
   
   parametros2={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}   
   $.ajax({
   type: "POST",
   data:parametros2,
   url: 'getdatossqlSeg.php', 
   success: function(data2){ 
      jQuery.each(JSON.parse(data2), function(clave2, valor2) { 	         
          $("#INICIO").val(valor2.ALUM_CICLOINS);
          $("#TERMINO").val(valor2.ALUM_CICLOTER);  
          $("#INICIO").trigger("chosen:updated");	  
          $("#TERMINO").trigger("chosen:updated");	
      });
   }
   });
}

function FOLIOclicadd(){	
   
   elsql=" SELECT ifnull(MAX(FOLIO),0)+1 as ELFOLIO FROM ecertificado "; 
   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}   
   $.ajax({
      type: "POST",
      data:parametros,
      url: 'getdatossqlSeg.php', 
      success: function(data){ 
         jQuery.each(JSON.parse(data), function(clave, valor) { 	
           $("#FOLIO").val(valor.ELFOLIO);                 
         });
      }
   });
}
