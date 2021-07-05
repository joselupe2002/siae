

function changeCICLO(DATO, usuario, institucion, campus){

   $.ajax({
      type: "GET",
      url:  "../base/getSesion.php?bd=Mysql&campo=roles",
      success: function(data){ 
          roles=data;        
          if ((roles.indexOf("DOCENTE")>=0) ){             
               elsql="SELECT  EMPL_NUMERO,CONCAT(EMPL_NUMERO,' ',EMPL_APEPAT,' ',EMPL_APEMAT, ' ',EMPL_NOMBRE) "+
               " FROM pempleados a where a.EMPL_NUMERO="+"'"+usuario+"'";                 
               actualizaSelect('TUTOR',elsql,"BUSQUEDA","");    
            }
            else {
               elsql="SELECT DISTINCT PROFESOR, CONCAT(PROFESOR,' ',PROFESORD) FROM vcargasprof a where a.CICLO="+
               "'"+$("#CICLO").val()+"' and a.TIPOMAT IN ('T')";     
               actualizaSelect('TUTOR',elsql,"BUSQUEDA","");
            }            
         }
      });
}

function changeMODALIDAD(DATO, usuario, institucion, campus){
  
      elsql=" select DISTINCT ID, SIE FROM vcargasprof a where a.CICLO="+
      "'"+$("#CICLO").val()+"' and a.TIPOMAT IN ('T') AND PROFESOR='"+$("#TUTOR").val()+"'";
      actualizaSelect('GRUPO',elsql,"BUSQUEDA","");   
      actualizaSelect('MATRICULA',"SELECT '0','0 NO APLICA' FROM DUAL","BUSQUEDA","");
 }


 function changeGRUPO(DATO, usuario, institucion, campus){
  

   if ($("#MODALIDAD").val()=="GRP") {
      elsql="SELECT '0','0 GRUPAL' FROM DUAL";
     
   } else {

      elsql="SELECT distinct ALUM_MATRICULA, concat(ALUM_APEPAT,' ',ALUM_APEMAT, ' ',ALUM_NOMBRE) AS NOMBRE FROM "+
		" dlista a, falumnos b where a.ALUCTR=b.ALUM_MATRICULA and a.IDGRUPO ='"+$("#GRUPO").val()+"'";
		" ORDER BY ALUM_APEPAT, ALUM_APEMAT, ALUM_NOMBRE"    
       
   }
      
   actualizaSelect('MATRICULA',elsql,"BUSQUEDA","");   
    
 }

