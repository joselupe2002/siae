function eliminarArchivo(nombreComponente,nombreImg, nombreInput){	
			    $.ajax({
	                type: "POST",
	                url: 'eliminarArchivo.php?imgborrar='+$("#"+nombreImg).attr("src"),
	                success: function(data){	
	                	$("#"+nombreImg).attr("src","../imagenes/menu/default.png");
			        	$("#"+nombreInput).attr("value","../imagenes/menu/default.png");	
			        	$('#'+nombreComponente).val("");                  		              		                				               				                		                    			           
	                }
	            });	            					
		}


function comprueba_extension(nombreComponente,ext_permitidas) { 
	          extensiones_permitidas = ext_permitidas.split("|");	         
			   mierror = ""; 
			   archivo=$('#'+nombreComponente).val();
			   if (!archivo) { 
			      	mierror = "No has seleccionado ning&uacute;n archivo"; 
			   }else{ 
			      extension = (archivo.substring(archivo.lastIndexOf(".")+1)).toLowerCase(); 	
			      permitida = false; 
			      for (var i = 0; i < extensiones_permitidas.length; i++) { 
			         if (extensiones_permitidas[i] == extension) { 
			         permitida = true; 
			         break; 
			         } 
			      } 
			      if (!permitida) { 
			         mierror = "Favor de verificar la extension del archivo no es valida:  " + extensiones_permitidas.join(); 
			      	}else{ 
			         return 1; 
			      	} 
			   } 
			   alert (mierror);
			   return 0; 
			}

	
	

function subirArchivoDrive(nombreComponente,carpeta,nombreImg, nombreInput, extensiones,fuera){		
	var haymayor=false;	
	        elsql="SELECT DRIVE FROM DRIVE WHERE CAMPO='"+carpeta+"'";
	        parametros={sql:elsql,dato:sessionStorage.co,bd:"SQLite"}
			$.ajax({
					  type: "POST",
					  data:parametros,
	   	              url:  "../base/getdatossqlSeg.php",
	   	              success: function(datosr){
	   	        	      
	   	        	        var data = new FormData();
			   	        	jQuery.each($('#'+nombreComponente)[0].files, function(i, file) {
			   				    data.append('archivo', file);
			   				    var fileName = file.name;
			   				    var fileSize = file.size;
			   				    if(fileSize > 4000000){
			   					    alert('El archivo no debe superar los 4MB');
			   					    file.value = '';
			   					    haymayor=true;
			   				    }
			   				    
			   				});
			   	        	
	   	        	     carpetaDrive="";
	   	        	     jQuery.each(JSON.parse(datosr), function(clave, valor) {carpetaDrive=valor.DRIVE;});	   	        	  
	   	        	     if (comprueba_extension(nombreComponente,extensiones)==1) {
	   	    				      $("#"+nombreImg).attr("src","../../imagenes/menu/esperar.gif");	
	   	    				      preruta="";
	 	    				      if (fuera=='S') {preruta="..\\base\\";}
	 	    				  
			   	    			  jQuery.ajax({
			   	    				    url: preruta+'subirArchivoDrive.php?carpeta='+carpetaDrive+'&inputFile=archivo&imganterior='+$("#"+nombreInput).attr("value"),
			   	    				    data: data,
			   	    				    cache: false,
			   	    				    contentType: false,
			   	    				    processData: false,
			   	    				    type: 'POST'})
			   	    				    .done(function(res){ 	
			   	    				    	
			   	    				    	laimagen=res.split("|")[1];
			   	    				    	
			   	    				    	if (!(res.substring(0,2)=="0|")){
			   	    				    		$("#"+nombreImg).attr("src",laimagen);
			   	    				        	$("#"+nombreInput).attr("value",laimagen);
			   	    				    	}
			   	    				    	else {
			   	    				    		$("#"+nombreImg).attr("src","../../imagenes/menu/default.png");
			   	    				        	$("#"+nombreInput).attr("value","../../imagenes/menu/default.png");
			   	    				        	alert ("Ocurrio un error al subir el archivo al Drive: "+res); 				    		
			   	    				    	}				    						    	
			   	    				    
			   	    		    	     }); // del .done del ajax
	   	        	            } ///del si cumple con las extensiones
	   	                 }, //del success de la carpeta
	   	           error: function(data) {	                  
	   	                      alert('ERROR: '+data);
	   	                  }
	   	          });   
		}



function subirArchivoDriveName(nombreComponente,carpeta,nombreImg, nombreInput, extensiones,fuera,nombre){		
	var haymayor=false;	
	laruta=$("#"+nombreInput).val(); 
	elid=laruta.substring(laruta.indexOf('id=')+3,laruta.length);
			elsql="SELECT DRIVE FROM DRIVE WHERE CAMPO='"+carpeta+"'";
			parametros={sql:elsql,dato:sessionStorage.co,bd:"SQLite"}

			$.ajax({
					  type: "POST",
					  data:parametros,
	   	           url:  "../base/getdatossqlSeg.php",
	   	           success: function(datosr){
	   	        	      
	   	        	        var data = new FormData();
			   	        	jQuery.each($('#'+nombreComponente)[0].files, function(i, file) {
			   				    data.append('archivo', file);
			   				    var fileName = file.name;
			   				    var fileSize = file.size;
			   				    if(fileSize > 4000000){
			   					    alert('El archivo no debe superar los 4MB');
			   					    file.value = '';
			   					    haymayor=true;
			   				    }
			   				    
			   				});
			   	        	
	   	        	     carpetaDrive="";
	   	        	     jQuery.each(JSON.parse(datosr), function(clave, valor) {carpetaDrive=valor.DRIVE;});	   	        	  
	   	        	     if (comprueba_extension(nombreComponente,extensiones)==1) {
	   	    				      $("#"+nombreImg).attr("src","../../imagenes/menu/esperar.gif");	
	   	    				      preruta="";
	 	    				      if (fuera=='S') {preruta="..\\base\\";}
	 	    				  
			   	    			  jQuery.ajax({
			   	    				    url: preruta+'subirArchivoDrive.php?carpeta='+carpetaDrive+'&inputFile=archivo&imganterior='+$("#"+nombreInput).attr("value")+"&nombre="+nombre,
			   	    				    data: data,
			   	    				    cache: false,
			   	    				    contentType: false,
			   	    				    processData: false,
			   	    				    type: 'POST'})
			   	    				    .done(function(res){ 	

			   	    				    	laimagen=res.split("|")[1];			   	    				    	
			   	    				    	if (res.substring(0,2)=="1|"){
												if (elid.length>0) {																		  
													jQuery.ajax({
														   url: preruta+'eliminarArchivoDrive.php?idfile='+elid,
														   cache: false,
														   timeout: 600000, 
														   contentType: false,
														   processData: false,
														   type: 'POST'})
														   .done(function(res){ 			  	   		    		   	    			  
														   });	    					  
												}	  
			   	    				    		$("#"+nombreImg).attr("src",laimagen);
			   	    				        	$("#"+nombreInput).val(laimagen);
			   	    				    	}
			   	    				    	else {
			   	    				    		$("#"+nombreImg).attr("src","../../imagenes/menu/default.png");
			   	    				        	$("#"+nombreInput).attr("value","../../imagenes/menu/default.png");
			   	    				        	alert ("Ocurrio un error al subir el archivo al Drive: "+res); 				    		
			   	    				    	}				    						    	
			   	    				    
			   	    		    	     }); // del .done del ajax
	   	        	            } ///del si cumple con las extensiones
	   	                 }, //del success de la carpeta
	   	           error: function(data) {	                  
	   	                      alert('ERROR: '+data);
	   	                  }
	   	          });   
		}



function subirPDFDrive(nombreComponente,carpeta,nombreImg, nombreInput, extensiones,fuera){		
	var haymayor=false;
	elid=laruta.substring(laruta.indexOf('id=')+3,laruta.length);

	elsql="SELECT DRIVE FROM DRIVE WHERE CAMPO='"+carpeta+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"SQLite"}

	$.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(datosr){
	        	       
	        	        var data = new FormData();
	   	        	jQuery.each($('#'+nombreComponente)[0].files, function(i, file) {
	   				    data.append('archivo', file);
	   				    var fileName = file.name;
	   				    var fileSize = file.size;
	   				    if(fileSize > 4000000){
	   					    alert('El archivo no debe superar los 4MB');
	   					    file.value = '';
	   					    haymayor=true;
	   				    }

	   				});
	   	        	
	   	        	if (haymayor) {return 0;}
	   	        	
	        	     carpetaDrive="";
	        	     jQuery.each(JSON.parse(datosr), function(clave, valor) {carpetaDrive=valor.DRIVE;});	   	        	  
	        	     if (comprueba_extension(nombreComponente,extensiones)==1) {
	    				      $("#"+nombreImg).attr("src","../../imagenes/menu/esperar.gif");	
	    				  
	    				  preruta="";
	    				  if (fuera=='S') {preruta="..\\base\\";}
	    				  
	    				  
	   	    			  jQuery.ajax({
	   	    				    url: preruta+'subirArchivoDrive.php?carpeta='+carpetaDrive+'&inputFile=archivo&imganterior='+$("#"+nombreInput).attr("value")+"&modo=pdf",
	   	    				    data: data,
	   	    				    cache: false,
	   	    				    timeout: 600000, 
	   	    				    contentType: false,
	   	    				    processData: false,
	   	    				    type: 'POST'})
	   	    				    .done(function(res){ 	
	   	    				    	
	   	    				    	
	   	    				    	laimagen=res.split("|")[1];	   	  
	   	    				    	
	   	    				    	
	   	    				    	if (!(res.substring(0,2)=="0|")){
	   	    				    	 //eliminamos archivo anterior en caso de existir
		  	   		    				  if (elid.length>0) {	    					  
		  	   		    					  jQuery.ajax({
		  	   		    		   	    		  url: preruta+'eliminarArchivoDrive.php?idfile='+elid,
		  	   		    		   	    	      cache: false,
		  	   		    		   	    		  timeout: 600000, 
		  	   		    		   	    		  contentType: false,
		  	   		    		   	    		  processData: false,
		  	   		    		   	    		  type: 'POST'})
		  	   		    		   	    		  .done(function(res){ 			  	   		    		   	    			  
		  	   		    		   	    		  });	    					  
		  	   		    				  }	  	   
		  	   		    				  
	   	    				    		$("#"+nombreImg).attr("src","../../imagenes/menu/pdf.png");
	   	    				    		$("#enlace_"+nombreInput).attr("href",laimagen);	   	    				    		
	   	    				        	$("#"+nombreInput).attr("value",laimagen);
	   	    				    	}
	   	    				    	else {
	   	    				    		$("#"+nombreImg).attr("src","../../imagenes/menu/pdfno.png");
	   	    				        	$("#"+nombreInput).attr("value","");
	   	    				        	alert ("Ocurrio un error al subir el archivo al Drive: "+res); 				    		
	   	    				    	}				    						    	
	   	    				    
	   	    		    	     }); // del .done del ajax
	        	            } ///del si cumple con las extensiones
	                 }, //del success de la carpeta
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });   
}


function pad (str, max) {
	  str = str.toString();
	  return str.length < max ? pad("0" + str, max) : str;
	}
	


function guadarPorta(campoid,id,campo,materia,tabla){
    dato=$("#"+campo).val();
    var f = new Date();
	fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
	if ((dato != null) && (dato != 'null')) {
		 $('#modalDocument').modal({show:true, backdrop: 'static'});	 
			parametros={
				tabla:tabla,
				campollave:campoid,
				bd:"Mysql",
				valorllave:id,
				RUTA: dato,
				FECHARUTA: fechacap
			};
			$.ajax({
			type: "POST",
			url:"../base/actualiza.php",
			data: parametros,
			success: function(data){
				$('#dlgproceso').modal("hide"); 
				if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
				else {alert ("Se ha guardado el archivo de: "+materia);}		
			}					     
			});    	    
	}
}


function insertaPorta(campoid,id,campo,materia,tabla,aux){

    var losdatos=[];
	dato=$("#"+campo).val();
    var f = new Date();
    fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
	
	if ((dato != null) && (dato != 'null')) {
		 $('#modalDocument').modal({show:true, backdrop: 'static'});
		 
		   cad=id+"|"+aux+"|"+dato+"|"+fechacap;
           losdatos[0]=cad;                                                             
           var loscampos = ["ID","AUX","RUTA","FECHARUTA",];

          parametros={
	                  tabla:tabla,
                      campollave:"CONCAT(ID,AUX)",
                      bd:"Mysql",
                      valorllave:id+aux,
                      eliminar: "S",
                      separador:"|",
                      campos: JSON.stringify(loscampos),
                      datos: JSON.stringify(losdatos)
               };


			$.ajax({
			type: "POST",
			url:"../base/grabadetalle.php",
			data: parametros,
			success: function(data){	
				$('#dlgproceso').modal("hide"); 
				if (data.length>0) {alert ("Ocurrio un error: "+data);}
				else {alert ("Se ha guardado el archivo de: "+materia);}		
			}					     
			});    	    
	}
}

function subirPDFDriveSave(nombreComponente,carpeta,nombreImg, nombreInput, extensiones,fuera,campoid,id,descrip,tabla, operacion, aux){
	var haymayor=false;
	laruta=$("#"+nombreInput).attr("value"); 
	elid=laruta.substring(laruta.indexOf('id=')+3,laruta.length);
	
	elsql="SELECT DRIVE FROM DRIVE WHERE CAMPO='"+carpeta+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"SQLite"}
	$.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(datosr){
	        	       
	        	        var data = new FormData();
	   	        	jQuery.each($('#'+nombreComponente)[0].files, function(i, file) {
	   				    data.append('archivo', file);
	   				    var fileName = file.name;
	   				    var fileSize = file.size;
	   				    if(fileSize > 4000000){
	   					    alert('El archivo no debe superar los 4MB');
	   					    file.value = '';
	   					    haymayor=true;
	   				    }

	   				});
	   	        	
	   	        	if (haymayor) {return 0;}
	   	        		   	        	
	        	     carpetaDrive="";
	        	     jQuery.each(JSON.parse(datosr), function(clave, valor) {carpetaDrive=valor.DRIVE;});	   	        	  
	        	     if (comprueba_extension(nombreComponente,extensiones)==1) {
	    				      
	        	    	  $("#"+nombreImg).attr("src","../../imagenes/menu/esperar.gif");
	        	    	  $("#"+nombreImg+"_2").attr("src","../../imagenes/menu/esperar.gif");
	    				  
	    				  preruta="";
	    				  if (fuera=='S') {preruta="..\\base\\";}
	    				  
	    				 
	    				  
	   	    			  jQuery.ajax({
	   	    				    url: preruta+'subirArchivoDrive.php?carpeta='+carpetaDrive+'&inputFile=archivo&imganterior='+elid+"&modo=pdf",
	   	    				    data: data,
	   	    				    cache: false,
	   	    				    timeout: 600000, 
	   	    				    contentType: false,
	   	    				    processData: false,
	   	    				    type: 'POST'})
	   	    				    .done(function(res){ 	
	   	    				    	
	   	    				 
	   	    				    	laimagen=res.split("|")[1];	   	    				    				   	    				    	
			   	    				 if (!(res.substring(0,2)=="0|")){
			   	    					      //eliminamos archivo anterior en caso de existir
			  	   		    				  if (elid.length>0) {	    					  
			  	   		    					  jQuery.ajax({
			  	   		    		   	    		  url: preruta+'eliminarArchivoDrive.php?idfile='+elid,
			  	   		    		   	    	      cache: false,
			  	   		    		   	    		  timeout: 600000, 
			  	   		    		   	    		  contentType: false,
			  	   		    		   	    		  processData: false,
			  	   		    		   	    		  type: 'POST'})
			  	   		    		   	    		  .done(function(res){ 			  	   		    		   	    			  
			  	   		    		   	    		  });	    					  
			  	   		    				  }	  	   		    				  
	   	    				    		$("#"+nombreImg).attr("src","../../imagenes/menu/pdf.png");
	   	    				    		$("#"+nombreImg+"_2").attr("src","../../imagenes/menu/pdf.png");
	   	    				    		
	   	    				    		
	   	    				    		$("#btnEli_"+nombreInput).show();
	   	    				    		
										$("#enlace_"+nombreInput).attr("href",laimagen);										   
	   	    				    		$("#enlace_"+nombreInput+"_2").attr("href",laimagen);
										
										   
	   	    				        	$("#"+nombreInput).attr("value",laimagen);
										   

	   	    				        	if (operacion=="alta") {insertaPorta(campoid,id,nombreInput,descrip,tabla,aux);
	   	    				        	}
	   	    				        	if (operacion=="edita") {guadarPorta(campoid,id,nombreInput,descrip,tabla);}
	   	    				    	}
	   	    				    	else {
	   	    				    		$("#"+nombreImg).attr("src","../../imagenes/menu/pdfno.png");
	   	    				        	$("#"+nombreInput).attr("value","");
	   	    				        	alert ("Ocurrio un error al subir el archivo al Drive: "+laimagen+res); 				    		
	   	    				    	}	

	   	    		    	     }); // del .done del ajax
	        	            } ///del si cumple con las extensiones
	                 }, //del success de la carpeta
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });   
}






function subirImagenDriveSave(nombreComponente,carpeta,nombreImg, nombreInput, extensiones,fuera,campoid,id,descrip,tabla, operacion, aux){
	var haymayor=false;
	laruta=$("#"+nombreInput).attr("value"); 
	elid=laruta.substring(laruta.indexOf('id=')+3,laruta.length);
	elsql="SELECT DRIVE FROM DRIVE WHERE CAMPO='"+carpeta+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"SQLite"}
	$.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../base/getdatossqlSeg.php",
	           success: function(datosr){
	        	       
	        	        var data = new FormData();
	   	        	jQuery.each($('#'+nombreComponente)[0].files, function(i, file) {
	   				    data.append('archivo', file);
	   				    var fileName = file.name;
	   				    var fileSize = file.size;
	   				    if(fileSize > 4000000){
	   					    alert('El archivo no debe superar los 4MB');
	   					    file.value = '';
	   					    haymayor=true;
	   				    }

	   				});
	   	        	
	   	        	if (haymayor) {return 0;}
	   	        		   	        	
	        	     carpetaDrive="";
	        	     jQuery.each(JSON.parse(datosr), function(clave, valor) {carpetaDrive=valor.DRIVE;});	   	        	  
	        	     if (comprueba_extension(nombreComponente,extensiones)==1) {
	    				      
	        	    	  $("#"+nombreImg).attr("src","../../imagenes/menu/esperar.gif");
	        	    	  $("#"+nombreImg+"_2").attr("src","../../imagenes/menu/esperar.gif");
	    				  
	    				  preruta="";
	    				  if (fuera=='S') {preruta="..\\base\\";}
	    				  
	    				 
	    				  
	   	    			  jQuery.ajax({
	   	    				    url: preruta+'subirArchivoDrive.php?carpeta='+carpetaDrive+'&inputFile=archivo&imganterior='+elid+"&modo=pdf",
	   	    				    data: data,
	   	    				    cache: false,
	   	    				    timeout: 600000, 
	   	    				    contentType: false,
	   	    				    processData: false,
	   	    				    type: 'POST'})
	   	    				    .done(function(res){ 	
	   	    				    	
	   	    				    	
	   	    				    	laimagen=res.split("|")[1];	   	    				    				   	    				    	
			   	    				 if (!(res.substring(0,2)=="0|")){
			   	    					      //eliminamos archivo anterior en caso de existir
			  	   		    				  if (elid.length>0) {	    					  
			  	   		    					  jQuery.ajax({
			  	   		    		   	    		  url: preruta+'eliminarArchivoDrive.php?idfile='+elid,
			  	   		    		   	    	      cache: false,
			  	   		    		   	    		  timeout: 600000, 
			  	   		    		   	    		  contentType: false,
			  	   		    		   	    		  processData: false,
			  	   		    		   	    		  type: 'POST'})
			  	   		    		   	    		  .done(function(res){ 			  	   		    		   	    			  
			  	   		    		   	    		  });	    					  
			  	   		    				  }	  	   		    				  
	   	    				    		$("#"+nombreImg).attr("src",laimagen);
	   	    				    		$("#"+nombreImg+"_2").attr("src",laimagen);
	   	    				    		
	   	    				    		
	   	    				    		$("#btnEli_"+nombreInput).show();
	   	    				    			   	    				    
	   	    				    		
	   	    				        	$("#"+nombreInput).attr("value",laimagen);
	   	    				        	
	   	    				        	if (operacion=="alta") {insertaPorta(campoid,id,nombreInput,descrip,tabla,aux);
	   	    				        	}
	   	    				        	if (operacion=="edita") {guadarPorta(campoid,id,nombreInput,descrip,tabla);}
	   	    				    	}
	   	    				    	else {
	   	    				    		$("#"+nombreImg).attr("src","../../imagenes/menu/default.png");
	   	    				        	$("#"+nombreInput).attr("value","");
	   	    				        	alert ("Ocurrio un error al subir el archivo al Drive: "+laimagen+res); 				    		
	   	    				    	}	

	   	    		    	     }); // del .done del ajax
	        	            } ///del si cumple con las extensiones
	                 }, //del success de la carpeta
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });   
}


function editaAdjunto(campoid,id,campo,materia,tabla){
		    $('#modalDocument').modal({show:true, backdrop: 'static'});	 
			parametros={
				tabla:tabla,
				campollave:campoid,
				bd:"Mysql",
				valorllave:id,
				RUTA: "",
				FECHARUTA: ""
			};
			$.ajax({
			type: "POST",
			url:"../base/actualiza.php",
			data: parametros,
			success: function(data){
				$('#dlgproceso').modal("hide"); 
				if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
				else {alert ("Se ha elimador el archivo de: "+materia);}		
			}					     
			});    	    
}


function eliminaAdjunto(campoid,id,campo,materia,tabla,aux){
    
	  	   $('#modalDocument').modal({show:true, backdrop: 'static'});		                                                             
           var loscampos = ["ID","AUX","RUTA","FECHARUTA",];

           parametros={
	                  tabla:tabla,
                      campollave:"CONCAT(ID,AUX)",
                      bd:"Mysql",
                      valorllave:id+aux                      
               };

			$.ajax({
			type: "POST",
			url:"../base/eliminar.php",
			data: parametros,
			success: function(data){
				$('#dlgproceso').modal("hide"); 
				if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
				else {alert ("Se ha eliminado el archivo de: "+materia);}		
			}					     
			});    	    
}


function eliminarEnlaceDrive(nombreComponente,carpeta,nombreImg, nombreInput, extensiones,fuera,campoid,id,descrip,tabla, operacion, aux){
    op=confirm("¿Seguro que desea eliminar el archivo?");
    if (op == true) {   
    	 laruta=$("#"+nombreInput).attr("value"); 
    	 elid=laruta.substring(laruta.indexOf('id=')+3,laruta.length);
    	 
	     $("#"+nombreImg).attr("src","../../imagenes/menu/esperar.gif");
	     $("#"+nombreImg+"_2").attr("src","../../imagenes/menu/esperar.gif");
	     preruta="";
	     if (fuera=='S') {preruta="..\\base\\";}
	     jQuery.ajax({
	   	    		  url: preruta+'eliminarArchivoDrive.php?idfile='+elid,
	   	    	      cache: false,
	   	    		  timeout: 600000, 
	   	    		  contentType: false,
	   	    		  processData: false,
	   	    		  type: 'POST'})
	   	    		  .done(function(res){ 	
	   	    				        laimagen=res.split("|")[1];	   	
	   	    				        $("#"+nombreImg).attr("src","../../imagenes/menu/pdfno.png");
	   	    				        $("#btnEli_"+nombreInput).css("display","none");
	    				    		$("#"+nombreImg+"_2").attr("src","../../imagenes/menu/pdfno.png");
									
									
	    				    		$("#enlace_"+nombreInput).attr("href",'..\\..\\imagenes\\menu\\pdfno.png');	
	    				    		$("#enlace_"+nombreInput+"_2").attr("href",'..\\..\\imagenes\\menu\\pdfno.png');
	    				    		
	    				        	$("#"+nombreInput).attr("value","");
	    				        	
	    				        	if (operacion=="alta") {eliminaAdjunto(campoid,id,nombreInput,descrip,tabla,aux);
	    				        	}
	    				        	if (operacion=="edita") {editaAdjunto(campoid,id,nombreInput,descrip,tabla);}
	    				        	
	   	    				    	if ((res.substring(0,2)=="0|")){	   	    				    			   	    				    
	   	    				    		$("#"+nombreImg).attr("src","../../imagenes/menu/pdfno.png");
	   	    				        	$("#"+nombreInput).attr("value","");
	   	    				        	alert ("Ocurrio un error al eliminar el archivo al Drive: "+laimagen+res); 				    		
	   	    				    	}				    						    		   	    				    	   	    		    	    
                         }); // del .done del ajax  
    }
}

/*=================================PARA LOS APIRANTES =============================================================*/

function eliminaTabla(campoid,id,campo,materia,tabla,aux){
    
	$('#modalDocument').modal({show:true, backdrop: 'static'});		                                                             
  var loscampos = ["ID","AUX","RUTA","FECHARUTA",];

  parametros={
			 tabla:tabla,
			 campollave:"CONCAT(ID,AUX)",
			 bd:"Mysql",
			 valorllave:id+aux                      
	  };

   $.ajax({
   type: "POST",
   url:"../nucleo/base/eliminar.php",
   data: parametros,
   success: function(data){
	   $('#dlgproceso').modal("hide"); 
	   if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
	   else {alert ("Se ha eliminado el archivo de: "+materia);}		
   }					     
   });    	    
}


function insertaTabla(campoid,id,campo,materia,tabla,aux){
    var losdatos=[];
	dato=$("#"+campo).val();
    var f = new Date();
    fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
	
	if ((dato != null) && (dato != 'null')) {
		 $('#modalDocument').modal({show:true, backdrop: 'static'});
		 
		   cad=id+"|"+aux+"|"+dato+"|"+fechacap;
           losdatos[0]=cad;                                                             
           var loscampos = ["ID","AUX","RUTA","FECHARUTA",];
          parametros={
	                  tabla:tabla,
                      campollave:"CONCAT(ID,AUX)",
                      bd:"Mysql",
                      valorllave:id+aux,
                      eliminar: "S",
                      separador:"|",
                      campos: JSON.stringify(loscampos),
                      datos: JSON.stringify(losdatos)
               };

			$.ajax({
			type: "POST",
			url:"../nucleo/base/grabadetalle.php",
			data: parametros,
			success: function(data){
				$('#dlgproceso').modal("hide"); 
				if (data.substring(0,1)=='0') {alert ("Ocurrio un error: "+data);}
				else {alert ("Se ha guardado el archivo de: "+materia);}		
			}					     
			});    	    
	}
}

function subirPDFDriveSaveAsp(nombreComponente,carpeta,nombreImg, nombreInput, extensiones,fuera,campoid,id,descrip,tabla, operacion, aux){
	var haymayor=false;
	laruta=$("#"+nombreInput).attr("value"); 
	elid=laruta.substring(laruta.indexOf('id=')+3,laruta.length);
	elsql="SELECT DRIVE FROM DRIVE WHERE CAMPO='"+carpeta+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"SQLite"}
	$.ajax({
			   type: "POST",
			   data:parametros,
	           url:  "../nucleo/base/getdatossqlSeg.php",
	           success: function(datosr){	        	       
	        	    var data = new FormData();
	   	        	jQuery.each($('#'+nombreComponente)[0].files, function(i, file) {
	   				    data.append('archivo', file);
	   				    var fileName = file.name;
	   				    var fileSize = file.size;
	   				    if(fileSize > 4000000){
	   					    alert('El archivo no debe superar los 4MB');
	   					    file.value = '';
	   					    haymayor=true;
	   				    }
	   				});
	   	        	
	   	        	if (haymayor) {return 0;}
	   	        		   	        	
	        	     carpetaDrive="";
	        	     jQuery.each(JSON.parse(datosr), function(clave, valor) {carpetaDrive=valor.DRIVE;});	   	        	  
	        	     if (comprueba_extension(nombreComponente,extensiones)==1) {
	    				      
	        	    	  $("#"+nombreImg).attr("src","../imagenes/menu/esperar.gif");
	        	    	  $("#"+nombreImg+"_2").attr("src","../imagenes/menu/esperar.gif");
	    				  
	    				  preruta="";
	    				  if (fuera=='S') {preruta="..\\nucleo\\base\\";}
	    				  
	    				 
	    				  
	   	    			  jQuery.ajax({
	   	    				    url: preruta+'subirArchivoDriveAsp.php?carpeta='+carpetaDrive+'&inputFile=archivo&imganterior='+elid+"&modo=pdf",
	   	    				    data: data,
	   	    				    cache: false,
	   	    				    timeout: 600000, 
	   	    				    contentType: false,
	   	    				    processData: false,
	   	    				    type: 'POST'})
	   	    				    .done(function(res){ 	
	   	    				    	
	   	    				    	
	   	    				    	laimagen=res.split("|")[1];	   	    				    				   	    				    	
			   	    				 if (!(res.substring(0,2)=="0|")){
			   	    					      //eliminamos archivo anterior en caso de existir
			  	   		    				  if (elid.length>0) {	    					  
			  	   		    					  jQuery.ajax({
			  	   		    		   	    		  url: preruta+'eliminarArchivoDriveAsp.php?idfile='+elid,
			  	   		    		   	    	      cache: false,
			  	   		    		   	    		  timeout: 600000, 
			  	   		    		   	    		  contentType: false,
			  	   		    		   	    		  processData: false,
			  	   		    		   	    		  type: 'POST'})
			  	   		    		   	    		  .done(function(res){ 			  	   		    		   	    			  
			  	   		    		   	    		  });	    					  
			  	   		    				  }	  	   		    				  
	   	    				    		$("#"+nombreImg).attr("src","../imagenes/menu/pdf.png");
	   	    				    		$("#"+nombreImg+"_2").attr("src","../imagenes/menu/pdf.png");
										   
										if ((extensiones.indexOf("png")>=0) || (extensiones.indexOf("bmp")>=0) ){
											$("#"+nombreImg).attr("src",laimagen);
											$("#"+nombreImg+"_2").attr("src",laimagen);
										}
	   	    				    		
	   	    				    		$("#btnEli_"+nombreInput).show();
	   	    				    		
	   	    				    		$("#enlace_"+nombreInput).attr("href",laimagen);	
	   	    				    		$("#enlace_"+nombreInput+"_2").attr("href",laimagen);
	   	    				    		
	   	    				        	$("#"+nombreInput).attr("value",laimagen);
	   	    				        	
	   	    				        	if (operacion=="alta") {insertaTabla(campoid,id,nombreInput,descrip,tabla,aux);
	   	    				        	}
	   	    				        	if (operacion=="edita") {guadarPorta(campoid,id,nombreInput,descrip,tabla);}
	   	    				    	}
	   	    				    	else {
	   	    				    		$("#"+nombreImg).attr("src","../imagenes/menu/pdfno.png");
	   	    				        	$("#"+nombreInput).attr("value","");
	   	    				        	alert ("Ocurrio un error al subir el archivo al Drive: "+laimagen+res); 				    		
	   	    				    	}	

	   	    		    	     }); // del .done del ajax
	        	            } ///del si cumple con las extensiones
	                 }, //del success de la carpeta
	           error: function(data) {	                  
	                      alert('ERROR: '+data);
	                  }
	          });   
}


function eliminarEnlaceDriveAsp(nombreComponente,carpeta,nombreImg, nombreInput, extensiones,fuera,campoid,id,descrip,tabla, operacion, aux){
    op=confirm("¿Seguro que desea eliminar el archivo?");
    if (op == true) {   
    	 laruta=$("#"+nombreInput).attr("value"); 
    	 elid=laruta.substring(laruta.indexOf('id=')+3,laruta.length);
    	 
	     $("#"+nombreImg).attr("src","../imagenes/menu/esperar.gif");
	     $("#"+nombreImg+"_2").attr("src","../imagenes/menu/esperar.gif");
	     preruta="";
	     if (fuera=='S') {preruta="..\\nucleo\\base\\";}
	     jQuery.ajax({
	   	    		  url: preruta+'eliminarArchivoDriveAsp.php?idfile='+elid,
	   	    	      cache: false,
	   	    		  timeout: 600000, 
	   	    		  contentType: false,
	   	    		  processData: false,
	   	    		  type: 'POST'})
	   	    		  .done(function(res){ 	
	   	    				        laimagen=res.split("|")[1];	   	
	   	    				        $("#"+nombreImg).attr("src","../imagenes/menu/pdfno.png");
	   	    				        $("#btnEli_"+nombreInput).css("display","none");
	    				    		$("#"+nombreImg+"_2").attr("src","../imagenes/menu/pdfno.png");
	    				    		
	    				    		$("#enlace_"+nombreInput).attr("href","");	
	    				    		$("#enlace_"+nombreInput+"_2").attr("href","");
	    				    		
	    				        	$("#"+nombreInput).attr("value","");
	    				        	
	    				        	if (operacion=="alta") {eliminaTabla(campoid,id,nombreInput,descrip,tabla,aux);
	    				        	}
	    				        	if (operacion=="edita") {editaAdjunto(campoid,id,nombreInput,descrip,tabla);}
	    				        	
	   	    				    	if ((res.substring(0,2)=="0|")){	   	    				    			   	    				    
	   	    				    		$("#"+nombreImg).attr("src","../imagenes/menu/pdfno.png");
	   	    				        	$("#"+nombreInput).attr("value","");
	   	    				        	alert ("Ocurrio un error al eliminar el archivo al Drive: "+laimagen+res); 				    		
	   	    				    	}				    						    		   	    				    	   	    		    	    
                         }); // del .done del ajax  
    }
}

/*================================================================================================================================*/

function subirArchivo(nombreComponente,carpeta,nombreImg, nombreInput, extensiones){		
	var data = new FormData();
	
	jQuery.each($('#'+nombreComponente)[0].files, function(i, file) {
	    data.append('archivo', file);
	});

	if (comprueba_extension(nombreComponente,extensiones)==1) {
		$("#"+nombreImg).attr("src","../../imagenes/menu/esperar.gif");	
		jQuery.ajax({
		    url: 'subirArchivo.php?carpeta='+carpeta+'&inputFile=archivo&imganterior='+$("#"+nombreInput).attr("value"),
		    data: data,
		    cache: false,
		    contentType: false,
		    processData: false,
		    type: 'POST'})
		    .done(function(res){ 	
		    	laimagen=res.split("|")[1];
		    	if (!(res.substring(0,2)=="0|")){
		    		$("#"+nombreImg).attr("src",laimagen);
		        	$("#"+nombreInput).attr("value",laimagen);
		    	}
		    	else {
		    		$("#"+nombreImg).attr("src","../../imagenes/menu/default.png");
		        	$("#"+nombreInput).attr("value","../../imagenes/menu/default.png");
		        	alert ("Ocurrio un error al subir la imagen: "+laimagen); 				    		
		    	}				    						    			    
    	    });        		            
	}
}



