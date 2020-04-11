

function changeMAPA(DATO, usuario, institucion, campus){

   elsql="select CARR_CLAVE, CARR_DESCRIP from `ccarreras` a where a.CARR_CLAVE "+
         " in (select MAPA_CARRERA from mapas where MAPA_CLAVE='"+$("#MAPA").val()+"')";     
   agregarEspera("imggif_CARRERA",null);
   $.ajax({
      type: "GET",
      url: 'dameselect.php?sql='+encodeURI(elsql)+"&sel=0&bd=Mysql", 
      success: function(data){              
           $("#CARRERA").empty();
           $("#CARRERA").html(data);   
           $("#CARRERA")[0].selectedIndex = 1;
           $('#CARRERA').trigger("chosen:updated");                        
           quitarEspera("imggif_CARRERA",null);

      }
   });

   elsql2="SELECT CVESIE FROM mapas where MAPA_CLAVE='"+$("#MAPA").val()+"'";
   $.ajax({
      type: "GET",
      url: 'getdatossql.php?sql='+encodeURI(elsql2)+"&bd=Mysql", 
      success: function(data2){          
         jQuery.each(JSON.parse(data2), function(clave2, valor2) { 	
           $("#MAPASIE").val(valor2.CVESIE);
           $("#MAPASIE").prop('disabled', true);                                          
         });
      }
   });
}

