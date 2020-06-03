

function changeMAPA(DATO, usuario, institucion, campus){

   elsql="select CARR_CLAVE, CARR_DESCRIP from `ccarreras` a where a.CARR_CLAVE "+
         " in (select MAPA_CARRERA from mapas where MAPA_CLAVE='"+$("#MAPA").val()+"')";     
   agregarEspera("imggif_CARRERA",null);
   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}

   $.ajax({
      type: "POST",
      data:parametros,
      url: 'dameselectSeg.php', 
      success: function(data){              
           $("#CARRERA").empty();
           $("#CARRERA").html(data);   
           $("#CARRERA")[0].selectedIndex = 1;
           $('#CARRERA').trigger("chosen:updated");                        
           quitarEspera("imggif_CARRERA",null);

      }
   });

   
   elsql2="SELECT CVESIE FROM mapas where MAPA_CLAVE='"+$("#MAPA").val()+"'";7
   parametros={sql:elsql2,dato:sessionStorage.co,bd:"Mysql"}
   $.ajax({
      type: "POST",
      data:parametros,
      url: 'getdatossqlSeg.php', 
      success: function(data2){          
         jQuery.each(JSON.parse(data2), function(clave2, valor2) { 	
           $("#MAPASIE").val(valor2.CVESIE);
           $("#MAPASIE").prop('disabled', true);                                          
         });
      }
   });
}

