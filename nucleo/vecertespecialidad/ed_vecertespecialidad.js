

function changeMATRICULA(DATO, usuario, institucion, campus){
   elsql=" SELECT ALUM_ESPECIALIDAD, b.DESCRIP,ALUM_CICLOINS, ALUM_CICLOTER, c.CICL_INICIO, d.CICL_FIN  "+      
         " FROM falumnos a, especialidad b, ciclosesc c, ciclosesc d "+
         " where a.ALUM_ESPECIALIDAD=b.ID and ALUM_MATRICULA='"+$("#MATRICULA").val()+"'"+
         " and ALUM_CICLOINS=c.CICL_CLAVE AND ALUM_CICLOTER=d.CICL_CLAVE"; 

   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}   
   $.ajax({
      type: "POST",
      data:parametros,
      url: 'getdatossqlSeg.php', 
      success: function(data){ 
         alert (data);
         jQuery.each(JSON.parse(data), function(clave, valor) { 	
           $("#CVEESPECIALIDAD").val(valor.ALUM_ESPECIALIDAD);
           $("#CVEESPECIALIDAD").prop('disabled', true);

           $("#ESPECIALIDADD").val(valor.DESCRIP);           
           $("#ESPECIALIDADD").prop('disabled', true);

           $("#INICIO").val(valor.ALUM_CICLOINS);
           $("#TERMINO").val(valor.ALUM_CICLOTER);  
           $("#INICIO").trigger("chosen:updated");	  
           $("#TERMINO").trigger("chosen:updated");	

           alert (valor.CICL_INICIO+" "+valor.CICL_INICIO+" "+valor.CICL_INICIO.split("/")[1]);
           $("#GENERACION").val(dameMesLetra(valor.CICL_INICIO.split("/")[1])+" DEL "+valor.CICL_INICIO.split("/")[2]+
           " A "+ dameMesLetra(valor.CICL_FIN.split("/")[1])+" DEL "+valor.CICL_FIN.split("/")[2] );
       
         });
      }
   });
   
}

function FOLIOclicadd(){	
   
   elsql=" SELECT ifnull(MAX(FOLIO),0)+1 as ELFOLIO FROM ecertespecialidad "; 
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
