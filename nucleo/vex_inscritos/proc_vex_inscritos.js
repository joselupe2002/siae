function impBoletaEx(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	var cadError="";

	if (table.rows('.selected').data().length>0) {
		
	
	   elsql=" select PDOCVE, MATCVE,MATE_DESCRIP, count(*)  AS N from dlista, cmaterias b where ALUCTR='"+table.rows('.selected').data()[0]["MATRICULA"]+"' "+
	   " AND MATCVE=MATE_CLAVE and MATE_TIPO='OC' AND LISCAL>=70 order by PDOCVE DESC ";

	   parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql",sel:'0'}

	    if (table.rows('.selected').data()[0]["DESFILE1"]=='N') {
			cadError+="El alumno no cumple aún con el Desfile del 16 de Septiembre<br>";
		}
		if (table.rows('.selected').data()[0]["DESFILE2"]=='N') {
			cadError+="El alumno no cumple aún con el Desfile del 20 de Noviembre<br>";
		}

	    $.ajax({
			   type: "POST",			   
               data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(data){				    
					losdatos=JSON.parse(data);  
					miactividad=losdatos[0]["MATE_DESCRIP"];
					if (losdatos[0]["N"]<2) {
						cadError+="El alumno no ha aprobado dos semestres de Extraescolares<br>";
					}

					if (cadError=="") {imprimeBoleta(table.rows('.selected').data()[0]["MATRICULA"],"ACREDITADO",miactividad);}
					else {imprimeBoleta(table.rows('.selected').data()[0]["MATRICULA"],"NO ACREDITADO",miactividad);
					mostrarIfo("infoEval","grid_vex_inscritos","NO ACREDITADO",
								"<div class=\"alert alert-danger\" style=\"text-align:justify; height:200px; overflow-y: scroll; \">"+cadError+"</div>","modal-lg");

				}
	        	
	           }
	    });
		
	
	}
	else {
		alert ("Debe seleccionar un registro");
		return 0;

		}
	
}


function imprimeBoleta(matricula,valor, actividad){
	enlace="nucleo/vex_inscritos/boletaExtra.php?matricula="+matricula+"&valor="+valor+"&actividad="+actividad;
	abrirPesta(enlace,"Boleta Ex");
//window.open(enlace,"_blank");
}



