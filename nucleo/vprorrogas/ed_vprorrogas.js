
function MATRICULAclicadd(DATO, usuario, institucion, campus){

 lamat=$("#MATRICULA").val();
 elsql="select *  from falumnos, ccarreras  where ALUM_MATRICULA='"+lamat+"' and ALUM_CARRERAREG=CARR_CLAVE";
 parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}

  $.ajax({
    type: "POST",
    data:parametros,
      url: 'getdatossqlSeg.php', 
      success: function(data){           	
          losdatos=JSON.parse(data);
          mostrarIfo("info","frmReg","Datos del Alumno",
          "<div class=\"row\" style=\"text-align:left;\">"+
          "    <div class=\"col-sm-4\">"+
          "         <span class=\"profile-picture\">"+
          "                <img id=\"img_ALUM_FOTO\"  style=\"width: 150px; height: 170px;\" class=\"editable img-responsive\" src=\""+losdatos[0]["ALUM_FOTO"]+"\"/>"+
          "         </span>"+
          "    </div>"+
          "    <div class=\"col-sm-8\" style=\"text-align:left;\" >"+
          "         <span class=\"fontRobotoB text-pink bigger-130\">Matricula: </span>"+
          "         <span class=\"fontRobotoB text-success bigger-130\">"+losdatos[0]["ALUM_MATRICULA"]+"</span><br>"+
          "         <span class=\"fontRobotoB text-warning bigger-130\">"+losdatos[0]["ALUM_NOMBRE"]+" "+losdatos[0]["ALUM_APEPAT"]+" "+losdatos[0]["ALUM_APEMAT"]+"</span><br>"+
          "         <span class=\"fontRobotoB text-danger bigger-130\">"+losdatos[0]["CARR_DESCRIP"]+"</span>"+
          "    </div>"+
          " </div>"
          ,"modal-lg")
       
         }
   });

  
}
