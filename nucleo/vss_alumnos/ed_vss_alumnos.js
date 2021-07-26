

function changeCALIFICACIONL(elemento, usuario, institucion, campus){
    
 $("#CALIFICACION2").val($("#CALIFICACIONL option:selected").text().split("-")[0]);
 $('#CALIFICACION2').prop('disabled', 'disabled');

}

function calculaCalif(){
   /*
    var prom=60;
    var cal1=parseInt($("#REP1EVAL").val())+parseInt($("#REP1AUTO").val());
    var cal2=parseInt($("#REP2EVAL").val())+parseInt($("#REP2AUTO").val());
    var cal3=parseInt($("#REP3EVAL").val())+parseInt($("#REP3AUTO").val());

    
        prom=((cal1+cal2+cal3)/3).toFixed(0);
 
        if (isNaN(prom)) {prom=60;}
        
    $("#CALIFICACION").val(prom);
    $('#CALIFICACION').prop('disabled', 'disabled');
    */

    var prom=60;
  
    
    var alumno=((parseFloat($("#REP1EVAL").val()))+
              (parseFloat($("#REP2EVAL").val()))+
              (parseFloat($("#REP3EVAL").val()))+
              (parseFloat($("#REP1AUTO").val()))+
              (parseFloat($("#REP2AUTO").val()))+
              (parseFloat($("#REP3AUTO").val()))
              )/6;

    var empresa=((parseFloat($("#REP1EVALACT").val()))+
                 (parseFloat($("#REP2EVALACT").val()))+
                 (parseFloat($("#REP3EVALACT").val()))          
                )/3;


    console.log("EVAL: "+alumno+" AUTO:"+empresa);
 
    p90=(empresa*0.9);
    p10=(alumno*0.10);

    console.log("p90: "+p90+" p10:"+p10);

    prom=(p90+p10).toFixed(2);
    prom2=(p90+p10).toFixed(0);


    if (isNaN(prom)) {prom=0;prom2=0;}
        
    $("#CALIFICACION").val(prom);
    $('#CALIFICACION').prop('disabled', 'disabled');
    elsql="SELECT CATA_DESCRIP FROM scatalogos where CATA_TIPO='CALIF_SS' AND  CATA_CLAVE='"+prom2+"'"+
          "ORDER BY CATA_DESCRIP ";
      
		parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    $.ajax({
			   type: "POST",
			   data:parametros,
			   url:  "../base/getdatossqlSeg.php",
	           success: function(data){  				      			             
                    $("#CALIFICACIONL").val(JSON.parse(data)[0][0]);
                    $("#CALIFICACION2").val(prom2);	
                    $('#CALIFICACIONL').prop('disabled', 'disabled');	
                    $('#CALIFICACION2').prop('disabled', 'disabled');																																												
			    }
	});	      	      			

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