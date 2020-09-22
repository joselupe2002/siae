

function changeEMPL(DATO, usuario, institucion, campus){

	$("#NOMBRE").val($("#EMPL option:selected").text());

	    elsql="SELECT concat('JEFE DE ',URES_DESCRIP) FROM  fures where URES_JEFE='"+$("#EMPL").val()+"'";
	    parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	    mostrarEspera("esperahor","grid_co_integrantes","Cargando Datos...");
	    $.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){  
		
				$("#PUESTO").val(JSON.parse(data)[0][0]);		
				ocultarEspera("esperahor");
		   }
		});
}
