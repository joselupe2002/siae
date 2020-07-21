

function changeCALIFICACIONL(elemento, usuario, institucion, campus){
    
 $("#CALIFICACION2").val($("#CALIFICACIONL option:selected").text().split("-")[0]);
 $('#CALIFICACION2').prop('disabled', 'disabled');

}

