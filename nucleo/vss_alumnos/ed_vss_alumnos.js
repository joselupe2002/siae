

function changeCALIFICACIONL(elemento, usuario, institucion, campus){
    
 $("#CALIFICACION2").val($("#CALIFICACIONL option:selected").text().split("-")[0]);
 $('#CALIFICACION2').prop('disabled', 'disabled');

}

function calculaCalif(){
    var prom=60;
    var cal1=parseInt($("#REP1EVAL").val())+parseInt($("#REP1AUTO").val());
    var cal2=parseInt($("#REP2EVAL").val())+parseInt($("#REP2AUTO").val());
    var cal3=parseInt($("#REP3EVAL").val())+parseInt($("#REP3AUTO").val());

    
        prom=((cal1+cal2+cal3)/3).toFixed(0);
 
        if (isNaN(prom)) {prom=60;}
        
    $("#CALIFICACION").val(prom);
    $('#CALIFICACION').prop('disabled', 'disabled');

}

function changeREP1EVAL(elemento, usuario, institucion, campus){
    calculaCalif();
   }

function changeREP1AUTO(elemento, usuario, institucion, campus){
    calculaCalif();
   }
   function changeREP2EVAL(elemento, usuario, institucion, campus){
    calculaCalif();
   }

function changeREP2AUTO(elemento, usuario, institucion, campus){
    calculaCalif();
   }
   function changeREP3EVAL(elemento, usuario, institucion, campus){
    calculaCalif();
   }

function changeREP3AUTO(elemento, usuario, institucion, campus){
    calculaCalif();
   }