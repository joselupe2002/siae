function setAutorizado(valor){
	 $('#modalDocument').modal({show:true, backdrop: 'static'});	 
		parametros={
			tabla:"ecomplementaria",
			campollave:"ID",
			bd:"Mysql",
			valorllave:table.rows('.selected').data()[0][0],
			AUTORIZADO: valor
		};
		$.ajax({
		type: "POST",
		url:"actualiza.php",
		data: parametros,
		success: function(data){
			$('#dlgproceso').modal("hide"); 
			if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
			//else {alert ("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" ha sido autorizada")}	

			window.parent.document.getElementById('FRecomplementaria').contentWindow.location.reload();
		}					     
		});    	                
}


function confirmarCom(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {		
		
		if (table.rows('.selected').data()[0]["INSCRIPCION"]=='N') {
			if (confirm("Desea Abrir Inscripción para la actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"])) {
				setAutorizado("S");
			}
		}
		else {
			if (confirm("La actividad: "+table.rows('.selected').data()[0]["ACTIVIDAD"]+" Esta autorizada para inscripción ¿Desea cerrar la Inscripción?")) {
				setAutorizado("N");
			}
		} 
	 
	}
	else {
		alert ("Debe seleccionar una actividad complementaria");
		return 0;

		}
	
}



function actualizaCompl(elregistro,elvalor){
	parametros={
			tabla:"ecomplementaria",
			campollave:"ID",
			bd:"Mysql",
			valorllave: elregistro,
			ABIERTA: elvalor
		};
		$.ajax({
		type: "POST",
		url:"actualiza.php",
		data: parametros,
		success: function(data){
			$('#dlgproceso').modal("hide"); 
			if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}		
		}					     
		});
}



function abrirCerrar(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();
	table.rows().iterator('row', function(context, index){		
	    var node = $(this.row(index).node());
	    val_ac='S';
	    if ( node.find("td").eq(2).html()=='S') {val_ac='N';} 
	    actualizaCompl(node.find("td").eq(0).html(),val_ac);
	});
	 window.parent.document.getElementById('FRecomplementaria').contentWindow.location.reload();
}


function abrirTodo(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();	
	table.rows().iterator('row', function(context, index){		
	    var node = $(this.row(index).node());
	    actualizaCompl(node.find("td").eq(0).html(),'S');
	});
	 window.parent.document.getElementById('FRecomplementaria').contentWindow.location.reload();
}

function cerrarTodo(modulo,usuario,institucion, campus,essuper){
	table = $("#G_"+modulo).DataTable();	
	table.rows().iterator('row', function(context, index){		
	    var node = $(this.row(index).node());
	    actualizaCompl(node.find("td").eq(0).html(),'N');
	});
	 window.parent.document.getElementById('FRecomplementaria').contentWindow.location.reload();
}



function abrirCerrarUno(modulo,usuario,institucion, campus,essuper){

	table = $("#G_"+modulo).DataTable();
	if (table.rows('.selected').data().length>0) {
		     val_ac='S';
		    if ( table.rows('.selected').data()[0][2]=='S') {val_ac='N';} 		    
			  actualizaCompl(table.rows('.selected').data()[0][0],val_ac);
		      alert("ya actualice");
		      window.parent.document.getElementById('FRecomplementaria').contentWindow.location.reload();
	}
	else {
		alert ("Debe seleccionar una actividad complementaria");
		return 0;
		}
	
}

