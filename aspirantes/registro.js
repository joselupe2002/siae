var elciclo="";

    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		elsql="SELECT CICL_CLAVE FROM ciclosesc where CICL_ADMISION='S' order by CICL_ORDEN DESC";
		$.ajax({
			type: "GET",
			url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
			success: function(data){				 
				   jQuery.each(JSON.parse(data), function(clave, valor) { 	
				      elciclo=valor.CICL_CLAVE;			  
								   }); 				   
				  },
			error: function(data) {	                  
					   alert('ERROR: '+data);
				   }
		   });

		actualizaSelect("CARRERA","select CARR_CLAVE, CARR_DESCRIP from ccarreras where "+
							"CARR_OFERTAR='S'","NORMAL","FUERA");
		actualizaSelect("CARRERA2","select CARR_CLAVE, CARR_DESCRIP from ccarreras where "+
							"CARR_OFERTAR='S'","NORMAL","FUERA");
		actualizaSelect("EDOCIVIL","select EDOC_CLAVE, EDOC_DESCRIP from eedocivil ORDER BY EDOC_DESCRIP","NORMAL","FUERA");

		actualizaSelect("EDONAC","select ID_ESTADO, ESTADO from cat_estado  ORDER BY ID_ESTADO","NORMAL","FUERA");
        actualizaSelect("MUNINAC","SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio","NORMAL","FUERA"); 
		
		actualizaSelect("ESTESCPROC","select ID_ESTADO, ESTADO from cat_estado  ORDER BY ID_ESTADO","NORMAL","FUERA");
		actualizaSelect("ESCPROC","SELECT ESCCVE, ESCNOM FROM descue","BUSQUEDA","FUERA"); 

		actualizaSelect("ESTTUTOR","select ID_ESTADO, ESTADO from cat_estado  ORDER BY ID_ESTADO","NORMAL","FUERA");
		actualizaSelect("MUNTUTOR","SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio","NORMAL","FUERA"); 

		actualizaSelect("AREACONOC","SELECT CLAVE, NOMBRE FROM areaconoc order by NOMBRE","NORMAL","FUERA"); 

		actualizaSelect("ESTRES","select ID_ESTADO, ESTADO from cat_estado  ORDER BY ID_ESTADO","NORMAL","FUERA");
        actualizaSelect("MUNRES","SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio","NORMAL","FUERA"); 

		actualizaSelect("GRUPOIND","select IDGRUPO, DESCRIP from grupoindigena  ORDER BY IDGRUPO","NORMAL","FUERA");

		actualizaSelect("LENIND","select IDLENGUA, DESCRIP from lenguaindigena  ORDER BY IDLENGUA","NORMAL","FUERA");
		
		actualizaSelect("SM","select IDSM, DESCRIP from servmed  ORDER BY IDSM","NORMAL","FUERA");


							$('.date-picker').datepicker({autoclose: true,todayHighlight: true}).next().on(ace.click_event, function(){$(this).prev().focus();});
		
							$('.fileSigea').ace_file_input({
								no_file:'Sin archivo ...',
								btn_choose:'Buscar',
								btn_change:'Cambiar',
								droppable:false,
								onchange:null,
								thumbnail:false, //| true | large
								whitelist:'pdf',
								blacklist:'exe|php'
								//onchange:''
								//
							});

		$("#CARRERA").change(function(){			
			actualizaSelect("CARRERA2","select CARR_CLAVE, CARR_DESCRIP from ccarreras where "+
			                           "CARR_OFERTAR='S' and CARR_CLAVE<>'"+$("#CARRERA").val()+"' ORDER BY CARR_DESCRIP","NORMAL","FUERA"); 
		}); 
					
		$("#NACIONALIDAD").change(function(){
			if ($(this).val()=='E') {apareceEdit($(this).attr("id"),true);}
			else {apareceEdit($(this).attr("id"),false);}
		}); 
		$("#CAPACIDADDIF").change(function(){
			if ($(this).val()=='S') {apareceEdit($(this).attr("id"),true);}
			else {apareceEdit($(this).attr("id"),false);}
		}); 
		$("#BECA").change(function(){
			if ($(this).val()=='S') {apareceEdit($(this).attr("id"),true);}
			else {apareceEdit($(this).attr("id"),false);}
		}); 

		$("#EDONAC").change(function(){			
			actualizaSelect("MUNINAC","SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio where ID_ESTADO='"+$("#EDONAC").val()+"' ORDER BY MUNICIPIO","NORMAL","FUERA"); 
		}); 
		

		$("#ELTUTOR").change(function(){			
			if ($("#ELTUTOR").val()=='P') {
				$("#TUTOR").val($("#PADRE").val());
			}
			if ($("#ELTUTOR").val()=='M') {
				$("#TUTOR").val($("#MADRE").val());
			}
		}); 

		$("#ESTRES").change(function(){				
			actualizaSelect("MUNRES","SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio where ID_ESTADO='"+$("#ESTRES").val()+"' ORDER BY MUNICIPIO","NORMAL","FUERA"); 
		}); 

		$("#ESTTUTOR").change(function(){				
			actualizaSelect("MUNTUTOR","SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio where ID_ESTADO='"+$("#ESTTUTOR").val()+"' ORDER BY MUNICIPIO","NORMAL","FUERA"); 
		}); 

		$("#ESTESCPROC").change(function(){			
			actualizaSelect("ESCPROC","SELECT ESCCVE, ESCNOM FROM descue WHERE ESTCVE='"+$("#ESTESCPROC").val()+"' "+
			" UNION SELECT ESCCVE, ESCNOM FROM descue WHERE ESCCVE='999' ORDER BY 2 ","BUSQUEDA","FUERA"); 
		}); 

		$("#ESCPROC").change(function(){
			if ($(this).val()=='999') {apareceEdit($(this).attr("id"),true);}
			else {apareceEdit($(this).attr("id"),false);}
		}); 

		$("#CURP").change(function(){
			encontre=false;
			
			//mostrarEspera("esperaCURP","grid_registro","Cargando..");
			//Verificamos si la CURP ya fue registrada anteriormente 
			elsql="SELECT CURP, FINALIZADO FROM aspirantes where CURP='"+$("#CURP").val().toUpperCase()+"' and CICLO='"+elciclo+"'";
			$.ajax({
					type: "GET",
					url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
					success: function(data){														 
						jQuery.each(JSON.parse(data), function(clave, valor) { 
								if (valor.FINALIZADO=='S') {
									lacurp=$("#CURP").val();
									mostrarConfirm("confirmReimpresion", "grid_registro", "Registro finalizado",
									"<span class=\"lead text-danger\"><strong> la CURP <span class=\"lead text-success\"> "+lacurp+" </span> ya cuenta con un registro finalizado para este periodo</span>",
		                             "¿Desea reimprimir su ficha?","Reimprimir", "reimprimir('"+lacurp+"');","modal-lg");
									$("#CURP").val("");
									$("#CURP").focus();
								}	
								else { 
									mostrarIfo("infoYa", "grid_registro", "Registro no Finalizado",
									"<span class=\"lead text-danger\"><strong> Al parecer ya se registro anteriormente en este ciclo,"+
									" pero no ha finalizado su registro se cargaran los datos capturados anteriormente para que "+
									" finalize su registro</strong></span>","modal-lg");
									elsqlbus="SELECT * from aspirantes where CURP='"+$("#CURP").val()+"' and CICLO='"+elciclo+"'";
									$.ajax({
										type: "GET",
										url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsqlbus),
										success: function(data){
											datosasp=JSON.parse(data);													 
											jQuery.each(datosasp, function(clave, valor) {
											
												$("#NOMBRE").val(valor.NOMBRE);
												$("#APEPAT").val(valor.APEPAT);
												$("#APEMAT").val(valor.APEMAT);
												$("#CARRERA").val(valor.CARRERA);
												$("#CARRERA2").val(valor.CARRERA2);

												$("#NACIONALIDAD").val(valor.NACIONALIDAD);
												$("#NACIONALIDAD_ADD").val(valor.NACIONALIDAD_ADD);
												$("#FECHANAC").val(valor.FECHANAC);
												$("#GENERO").val(valor.GENERO);
												$("#EDOCIVIL").val(valor.EDOCIVIL);
												$("#CAPACIDADDIF").val(valor.CAPACIDADDIF);
												$("#CAPACIDADDIF_ADD").val(valor.CAPACIDADDIF_ADD);
												$("#BECA").val(valor.BECA);
												$("#BECA_ADD").val(valor.BECA_ADD);
												$("#EDONAC").val(valor.EDONAC  );
												$("#MUNINAC").val(valor.MUNINAC);
												$("#RFC").val(valor.RFC);
												$("#ESTESCPROC").val(valor.ESTESCPROC);
												$("#ESCPROC").val(valor.ESCPROC);
												$("#ESCPROC").trigger("chosen:updated");	

												$("#ESCPROC_ADD").val(valor.ESCPROC_ADD);
												$("#PROMBAC").val(valor.PROMBAC);
												$("#EGRESOBAC").val(valor.EGRESOBAC);
												$("#AREACONOC").val(valor.AREACONOC);
												$("#GRUPOIND").val(valor.GRUPOIND);
												$("#LENIND").val(valor.LENIND);
												$("#ESTRES").val(valor.ESTRES);
												$("#MUNRES").val(valor.MUNRES);
												$("#CIUDADRES").val(valor.CIUDADRES);
												$("#CALLE").val(valor.CALLE );
												$("#NUMEROCALLE").val(valor.NUMEROCALLE );
												$("#COLONIA").val(valor.COLONIA);
												$("#CP").val(valor.CP);
												$("#TELCEL").val(valor.TELCEL );
												$("#TELCASA").val(valor.TELCASA );
												$("#CORREO").val(valor.CORREO );
												$("#SM").val(valor.SM );											
												$("#SMNUMERO").val(valor.SMNUMERO);
												$("#TIPOSAN").val(valor.TIPOSAN);
												$("#PADRE").val(valor.PADRE);
												$("#PADREVIVE").val(valor.PADREVIVE);
												$("#MADRE").val(valor.MADRE);
												$("#MADREVIVE").val(valor.MADREVIVE);
												$("#PADRETEL").val(valor.PADRETEL);
												$("#MADRETEL").val(valor.MADRETEL);
												$("#TUTOR").val(valor.TUTOR); 
												$("#ESTTUTOR").val(valor.ESTTUTOR); 
												$("#MUNTUTOR").val(valor.MUNTUTOR); 
												$("#CIUDADTUTOR").val(valor.CIUDADTUTOR);
												$("#CALLETUTOR").val(valor.CALLETUTOR);
												$("#NUMEROCALLETUTOR").val(valor.NUMEROCALLETUTOR);
												$("#COLONIATUTOR").val(valor.COLONIATUTOR);
												$("#CPTUTOR").val(valor.CPTUTOR);
												$("#TELCASATUTOR").val(valor.TELCASATUTOR);
												$("#TELCELTUTOR").val(valor.TELCELTUTOR);
												$("#CORREOTUTOR").val(valor.CORREOTUTOR);
												$("#TRABAJOTUTOR").val(valor.TRABAJOTUTOR);
												$("#CURP").prop("disabled","true");
												$("#CURP").val($("#CURP").val().toUpperCase());
												//ocultarEspera("esperaCURP");
											}); 				   
										},
									error: function(data) {	                  
											alert('ERROR: '+data);
											//ocultarEspera("esperaCURP");
										}
								});
									}
								  
						}); 				   
					},
				error: function(data) {	                  
						alert('ERROR: '+data);
					}
			});

		}); 


		

		$('.chosen-select').chosen({allow_single_deselect:true});
		$(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
		$(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    



		$.validator.setDefaults({
			ignore: [],
			rules: {
					CURP:{ required: true, curpCorrecta:"#CURP"},
					CARRERA:{min: 1},
					CARRERA2:{min: 1},
					APEPAT:{ required: true},
					APEMAT:{ required: true},
					NOMBRE:{ required: true},
					uno:{ required: true},
					
					FECHANAC: {required: true, edadCorrecta:"#FECHANAC"},
					EDONAC:{min: 1},
					MUNINAC:{min: 1},

					ESTESCPROC:{min: 1},
					ESCPROC:{min: 1},
					PROMBAC : {required : true,number: true, min:60, max:100},
					SMNUMERO: {required : true,number: true, maxlength:11, minlength:11},

					EDORES:{min: 1},
					MUNIRES:{min: 1},
					CIUDADRES:{ required: true},
					CALLE:{ required: true},
					CP : {number: true},
					TELCEL : {required : true, number: true,maxlength:10, minlength:10},
					CORREO : {required : true, email: true},

					TUTOR : {required: true},
					TELCELTUTOR : {required : true, number: true,maxlength:10, minlength:10},
					CORREOTUTOR : {required : true, email: true},


					},
			messages: {
					CURP:{required:"Debe colocar su CURP",curpCorrecta:"La CURP no cumple con un formato valido"},
					CARRERA: "Debe elegir la carrera a la que desea ingresar",
					CARRERA: "Debe elegir una carrera de segunda opción",
					APEPAT: "Debe colocar su Apellido Paterno",
					APEMAT: "Debe colocar su Apellido Materno",
					NOMBRE: "Debe colocar su Nombre Completo",	
					uno: "Debe colocar su Apellido Materno",
					
					FECHANAC: {required:"Debe colocar su fecha de Nacimiento",edadCorrecta:"Su edad no es mayor a 17"},		
					EDONAC: "Debe elegir su estado de nacimiento",
					MUNINAC: "Debe elegir su municipio de nacimiento",

					ESTESCPROC: "Debe elegir el estado de la escuela de procedencia",
					ESCPROC: "Debe elegir una escuela de procedencia",
					PROMBAC: {required: "Debe colocar su promedio de Bachiller", number: "No es un número valido", min:"El promedio debe ser  entre 60 a 100",max:"El promedio debe ser  entre 60 a 100"},
					SMNUMERO: {required: "Debe colocar su número de IMSS", number: "No es un número valido",
					           maxlength:"El número de afiliación debe ser de 11 carácteres",
							   minlength:"El número de afiliación debe ser de 11 carácteres"},

					EDORES: "Debe elegir su estado de Residencia actual",
					MUNIRES: "Debe elegir su municipio de Residencia actual",
					CIUDADRES:"Debe colocar su ciudado localidad de Residencia actual",
					CALLE:"Debe colocar su dirección de Residencia actual",
					CP : "El CP debe ser número",
					TELCEL : {required:"Se requiere número de celular",number:"debe colocar sólo números",
					          maxlength:"El número de TELÉFONO debe ser de 10 números",
					          minlength:"El número de TELÉFONO debe ser de 10 números"},
					CORREO : {required:"Se requiere correo electrónico",email:"El email no es correcto"},

					TUTOR: "Debe colocar el nombre de un tutor",
					TELCELTUTOR : {required:"Se requiere número de celular de tutor",number:"debe colocar sólo números",
					               maxlength:"El número de TELÉFONO debe ser de 10 números",
					               minlength:"El número de TELÉFONO debe ser de 10 números"},
					CORREOTUTOR : {required:"Se requiere correo electrónico de tutor",email:"El email no es correcto"},
					
			}			
		});

			
		function sonvalidos(formulario){
			var noval = 0;
			$(formulario).find("input, select").each(function () {			
			    if (!($(this).valid())) {noval++; ultimo=$(this).attr("id");}     
			});
			if (noval>0) {return ultimo;}
			else {return "";}		
		}


		$.validator.addMethod("edadCorrecta", function(value, element) {
			res=false;
			edad=calcularEdad(value);
	        if (edad>=16) {res=true;} 
			return res;
		}, "La Edad debe ser mayor o igual a 17 años");

		$.validator.addMethod("curpCorrecta", function(value, element) {
			res=false;
			res=curpValida(value);
			return res;
		}, "");


		$('#fuelux-wizard-container').ace_wizard({}).on('actionclicked.fu.wizard' , function(e, info){
			  
			    if(info.step == 1) {					  
				  if (!$("#RFC").val().length>0) { $("#RFC").val($("#CURP").val().substr(0,10));}
				      	
					  var form = $( "#frmReg" );
					  form.validate();
					  campo=sonvalidos(form);
					  if (!(campo=="")) { e.preventDefault();}					
					  else {						   
						if (!$("#CURP").prop("disabled")) {guardarGen(); cargarAdjuntos();}
					    else {guardarPag1(); cargarAdjuntos();}
					}
				}
				if(info.step == 2) {
					var form = $( "#frmReg2" ); form.validate(); campo=sonvalidos(form);
					if (!(campo=="")) { e.preventDefault();}
					else {guardarPag2();}
				}
			

				if(info.step == 3) {
					var form = $( "#frmReg3" ); form.validate(); campo=sonvalidos(form);
					if (!(campo=="")) { e.preventDefault();}
					else {guardarPag3();}
				}
				

				if(info.step == 4) {
					var form = $( "#frmReg4" ); form.validate(); campo=sonvalidos(form);
					if (!(campo=="")) { e.preventDefault();}
					else {guardarPag4();}
				}
                
				
				if(info.step == 5) {					
					var form = $( "#frmReg5" ); form.validate(); campo=sonvalidos(form);
					if (!(campo=="")) { e.preventDefault();}
					else {guardarPag5();}
				}
			

				if(info.step == 6) {
					var form = $( "#frmReg6" ); form.validate(); campo=sonvalidos(form);
					if (!(campo=="")) { e.preventDefault();}
					else {guardarPag6();}
				}
			
							
			  })
	     .on('changed.fu.wizard', function(e, info) {
			    //alert ("cambie "+info.step);
				})
		.on('finished.fu.wizard', function(e) { 
			  confirmarFinalizado();
			  /*
			                    bootbox.dialog({
									message: "Gracias. Su registro ha finalizado", 
									buttons: {
										"success" : {
											"label" : "OK",
											"className" : "btn-sm btn-primary"
										}
									}
								});
								*/
		}).on('stepclick.fu.wizard', function(e){ 
			
		});
						
		$('#modal-wizard-container').ace_wizard();
		$('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');
	

	});
	
function guardarGen(){
	var f = new Date();
	fechacap=pad(f.getDate(),2) + "/" + pad((f.getMonth() +1),2) + "/" + f.getFullYear()+" "+ f.getHours()+":"+ f.getMinutes()+":"+ f.getSeconds();
	
		parametros={
			tabla:"aspirantes",
			bd:"Mysql",
			CURP:$("#CURP").val().toUpperCase(),
			APEPAT:$("#APEPAT").val().toUpperCase(),
			APEMAT:$("#APEMAT").val().toUpperCase(),
			NOMBRE:$("#NOMBRE").val().toUpperCase(),
			CARRERA:$("#CARRERA").val(),
			CARRERA2:$("#CARRERA2").val(),
			TIPOCAPT:"WEB",
			CICLO:elciclo,
			_INSTITUCION:"ITSM",
			_CAMPUS:"0",
			fechacap: fechacap
	};
	$.ajax({
		type: "POST",
		url:"../nucleo/base/inserta.php",
		data: parametros,
		success: function(data){        			        	
										 
		}					     
	}); 
	
	$("#CURP").prop("disabled",true);
}


function guardarPag1(){
	parametros={
		tabla:"aspirantes",
		bd:"Mysql",
		campollave:"CURP",
		valorllave:$("#CURP").val().toUpperCase(),		
			APEPAT:$("#APEPAT").val().toUpperCase(),
			APEMAT:$("#APEMAT").val().toUpperCase(),
			NOMBRE:$("#NOMBRE").val().toUpperCase(),
			CARRERA:$("#CARRERA").val(),
			CARRERA2:$("#CARRERA2").val(),
			CICLO:elciclo
	};
	$.ajax({
		type: "POST",
		url:"../nucleo/base/actualiza.php",
		data: parametros,
		success: function(data){        			        	
										 
		}					     
	}); 
	
	$("#CURP").prop("disabled",true);
}

function guardarPag2(){
		parametros={
			tabla:"aspirantes",
			bd:"Mysql",
			campollave:"CURP",
			valorllave:$("#CURP").val().toUpperCase(),
			NACIONALIDAD: $("#NACIONALIDAD").val(),	
			NACIONALIDAD_ADD : $("#NACIONALIDAD_ADD").val().toUpperCase(),
			FECHANAC: $("#FECHANAC").val(),
			GENERO: $("#GENERO").val(),
			EDOCIVIL: $("#EDOCIVIL").val(),
			CAPACIDADDIF: $("#CAPACIDADDIF").val(),
			CAPACIDADDIF_ADD: $("#CAPACIDADDIF_ADD").val().toUpperCase(),
			BECA: $("#BECA").val(),
			BECA_ADD: $("#BECA_ADD").val().toUpperCase(),
			EDONAC: $("#EDONAC").val() ,
			MUNINAC: $("#MUNINAC").val() ,
			RFC: $("#RFC").val().toUpperCase(),
			CICLO:elciclo			
	};
	$.ajax({
		type: "POST",
		url:"../nucleo/base/actualiza.php",
		data: parametros,
		success: function(data){        			        	
												 
	},
	error: function(data) {	                  
			alert('ERROR: '+data);
		}					     
	}); 
}


function guardarPag3(){
	parametros={
		tabla:"aspirantes",
		bd:"Mysql",
		campollave:"CURP",
		valorllave:$("#CURP").val().toUpperCase(),
		
		ESTESCPROC: $("#ESTESCPROC").val() ,
	    ESCPROC: $("#ESCPROC").val() , 
		ESCPROC_ADD: $("#ESCPROC_ADD").val() ,
		PROMBAC: $("#PROMBAC").val() ,
		EGRESOBAC: $("#EGRESOBAC").val() ,
		AREACONOC: $("#AREACONOC").val() ,
		GRUPOIND: $("#GRUPOIND").val() , 
		LENIND: $("#LENIND").val()  
		};
		$.ajax({
			type: "POST",
			url:"../nucleo/base/actualiza.php",
			data: parametros,
			success: function(data){        			        	
													 
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
			}					     
		}); 

}

function guardarPag4(){
	parametros={
		tabla:"aspirantes",
		bd:"Mysql",
		campollave:"CURP",
		valorllave:$("#CURP").val().toUpperCase(),
		
		    ESTRES: $("#ESTRES").val() , 
			MUNRES: $("#MUNRES").val() , 
			CIUDADRES: $("#CIUDADRES").val().toUpperCase() , 
			CALLE : $("#CALLE").val().toUpperCase() ,
			NUMEROCALLE : $("#NUMEROCALLE").val().toUpperCase() ,
			COLONIA: $("#COLONIA").val().toUpperCase() , 
			CP : $("#CP").val() ,
			TELCEL : $("#TELCEL").val() ,
			TELCASA : $("#TELCASA").val() ,
			CORREO : $("#CORREO").val()
		};
		$.ajax({
			type: "POST",
			url:"../nucleo/base/actualiza.php",
			data: parametros,
			success: function(data){        			        	
														 
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
			}					     
		}); 
}


function guardarPag5(){
	parametros={
		tabla:"aspirantes",
		bd:"Mysql",
		campollave:"CURP",
		valorllave:$("#CURP").val().toUpperCase(),
		
		SM : $("#SM").val() ,
		SMNUMERO: $("#SMNUMERO").val() ,
		TIPOSAN: $("#TIPOSAN").val().toUpperCase(), 
		PADRE: $("#PADRE").val().toUpperCase() ,
		PADREVIVE: $("#PADREVIVE").val() ,
		MADRE: $("#MADRE").val().toUpperCase() ,
		MADREVIVE: $("#MADREVIVE").val() , 
		PADRETEL: $("#PADRETEL").val() , 
		MADRETEL: $("#MADRETEL").val() 
		};
		$.ajax({
			type: "POST",
			url:"../nucleo/base/actualiza.php",
			data: parametros,
			success: function(data){        			        	
														 
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
			}					     
		}); 

}


function guardarPag6(){
	parametros={
		tabla:"aspirantes",
		bd:"Mysql",
		campollave:"CURP",
		valorllave:$("#CURP").val().toUpperCase(),
		TUTOR: $("#TUTOR").val().toUpperCase() , 
		ESTTUTOR: $("#ESTTUTOR").val() ,
		MUNTUTOR: $("#MUNTUTOR").val() ,
		CIUDADTUTOR: $("#CIUDADTUTOR").val().toUpperCase() , 
		CALLETUTOR: $("#CALLETUTOR").val().toUpperCase() ,
		NUMEROCALLETUTOR: $("#NUMEROCALLETUTOR").val().toUpperCase() ,
		COLONIATUTOR: $("#COLONIATUTOR").val().toUpperCase() , 
		CPTUTOR: $("#CPTUTOR").val() , 
		TELCASATUTOR : $("#TELCASATUTOR").val() ,
		TELCELTUTOR: $("#TELCELTUTOR").val() , 
		CORREOTUTOR: $("#CORREOTUTOR").val() , 
		TRABAJOTUTOR: $("#TRABAJOTUTOR").val().toUpperCase() 
		};
		$.ajax({
			type: "POST",
			url:"../nucleo/base/actualiza.php",
			data: parametros,
			success: function(data){        			        	
														 
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
			}					     
		}); 

}


function finalizar(){
	parametros={
		tabla:"aspirantes",
		bd:"Mysql",
		campollave:"CURP",
		valorllave:$("#CURP").val().toUpperCase(),
		FINALIZADO:"S"
		};

		$('#confirmFinalizar').modal("hide");
	
		$.ajax({
			type: "POST",
			url:"../nucleo/base/actualiza.php",
			data: parametros,
			success: function(data){   
				window.open("ficha.php?curp="+$("#CURP").val().toUpperCase()+"&ciclo="+elciclo, '_blank');      			        	
				location. reload();
										 
		},
		error: function(data) {	                  
				alert('ERROR: '+data);
			}					     
		}); 

}

function reimprimir(lacurppas){
	window.open("ficha.php?curp="+lacurppas+"&ciclo="+elciclo, '_blank'); 
	$('#confirmReimpresion').modal("hide");
}


function apareceEdit(id,op){
	if (op) {$("#"+id+"_ADD").removeClass("hide"); $("#"+id+"_ET").removeClass("hide");}
	else {$("#"+id+"_ADD").addClass("hide"); $("#"+id+"_ET").addClass("hide");}
}


function confirmarFinalizado(){
	todos=true;
	$( ".imgadj" ).each(function( index ) {
		if ($(this).attr("cargado")=='N') {
			todos=false;
		}	
	});

	if (todos) {
		mostrarConfirm("confirmFinalizar", "grid_registro", "Finalizar Proceso",
		"<span class=\"lead text-danger\"><strong> Al finalizar el proceso ya no podrá relaizar "+
		"cambios en sus datos, y su información será "+
		"enviada para cotejamiento.</span>"+
		"<span class=\"lead text-danger\"><strong>Al finalizar se visualizará una ficha, la cuál de guardar e imprimir y será presentada el día de su exámen</span>"+
		"</strong>",
		"¿Esta usted Seguro?","Finalizar Proceso", "finalizar();","modal-lg");
	}
	else {
		mostrarIfo("infoFalta", "grid_registro", "Documentos Adjuntos",
				   "<span class=\"lead text-danger\"><strong>Su registro no puede ser Finalizado </strong></span> "+
				   "<span class=\"lead text-warning\"><strong> Al parecer no ha adjuntado todos los documentos, "+
									" si tiene problema con alguno su registro quedá guardado para continuar posteriormente solo capturando su CURP</strong></span>","modal-lg");
	}
}



function cargarAdjuntos() {
	contFila=0;
	contDatos=1;
	elsqlAdj="select IDDOC, DOCUMENTO, ifnull(b.RUTA,'') as RUTA, CLAVE, TIPOADJ, "+
			 " (SELECT CICL_CLAVE FROM ciclosesc where CICL_ADMISION='S' ORDER BY CICL_ORDEN DESC LIMIT 1) AS CICLO "+
	         " from documaspirantes a "+
	         "LEFT OUTER JOIN  adjaspirantes b  on (b.AUX=concat(a.CLAVE,'"+$("#CURP").val()+"'))"+
			 " WHERE a.ENLINEA='S' order by TIPOADJ, DOCUMENTO";
	$.ajax({
		type: "GET",
		url:  "../nucleo/base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsqlAdj),
		success: function(data){    
			$("#listaadj").empty();		
			$("#listaadj").append(
				                "<div class=\"alert alert-danger\" style=\"padding:0px; margin:0px;\">"+
								"   <div class=\"row\" style=\"padding:0px;  margin:0px;\">"+								  
			                      "    <div class=\"col-sm-1\" style=\"padding:0px; margin:0px;\" ></div>"+
								  "    <div class=\"col-sm-8\" style=\"padding:0px; margin:0px;\">"+								  
								  "             <p><strong><span class=\"text-success\">Nota:</span>"+
								  "	              <span class=\"text-primary \">Todos los documentos a excepción de la FOTO se deben adjuntar en formato PDF. </span>"+
								  " 	          <span class=\"text-danger\"> Máximo 4MB</span>"+								                       
								  "             </strong></p> "+
								  "    </div>"+								  								
								  "    <div class=\"col-sm-2\" style=\"padding:0px; margin:0px;\">"+								  
								  "            <a href=\"https://www.ilovepdf.com/es/jpg_a_pdf\" target=\"_blank\">"+
								  "                 <span title=\"Click para ir a una página que le ayude en la conversión de imagenes a formato PDF\" "+
								  "                       class=\"label  label-danger label-white middle\">Convertir Imagen-PDF</span>"+
								  "            </a>"+
								  "    </div>"+								 
								  "    <div class=\"col-sm-1\" style=\"padding:0px; margin:0px;\"></div>"+
								  "</div>"+								
								  "<div class=\"row\" style=\"padding:0px;  margin:0px;\"  >"+								  
								  "    <div class=\"col-sm-1\" style=\"padding:0px; margin:0px;\"></div>"+
								  "    <div class=\"col-sm-8\" style=\"padding:0px; margin:0px;\" >"+
								  "             <p><strong><span class= \"text-success\">FOTO INFANTIL:</span>"+
								  "	              <span class=\"text-primary \">Deberá ser en formato <span class=\"badge badge-pink\">PNG</span>"+
								  " 	          <span class=\"text-danger\"> Máximo 4MB</span> blanco y negro o a color </span>"+
								  "             </strong></p> "+
								  "     </div>"+
								  "     <div class=\"col-sm-3\" style=\"padding:0px; margin:0px;\">"+
								  "               <a href=\"https://www.iloveimg.com/es/recortar-imagen\" target=\"_blank\">"+
								  "                      <span title=\"Click para ir a una página que le ayude a recortar imágenes\" "+
								  "                      class=\"label  label-purple label-white middle\">   Recortar Imágen</span>"+
								  "                </a>"+
								  "               <a href=\"https://imagen.online-convert.com/es/convertir-a-png\" target=\"_blank\">"+
								  "                      <span title=\"Click para ir a una página que le ayude a convertir imagenes a PNG\" "+
								  "                      class=\"label  label-pink label-white middle\">Convertir a PNG</span>"+
								  "                </a>"+
								  "     </div>"+
								  "</div>"+
								"</div>"); 

			jQuery.each(JSON.parse(data), function(clave, valor) { 
				   stElim="display:none; cursor:pointer;";
					if (valor.RUTA.length>0) { stElim="cursor:pointer; display:block; ";} 
					
					cadFile="<div class=\"col-sm-4\">"+											
					"            <span class=\"text-primary\"><strong>"+utf8Decode(valor.DOCUMENTO)+"</strong></span>"+											
					"            <input class=\"fileSigea\" type=\"file\" id=\"file_"+valor.CLAVE+"\""+
					"                   onchange=\"subirPDFDriveSaveAsp('file_"+valor.CLAVE+"','ASPIRANTES_"+valor.CICLO+"','pdf_"+
												  valor.CLAVE+"','RUTA_"+valor.CLAVE+"','"+valor.TIPOADJ+"','S','ID','"+valor.CLAVE+
												  "',' DOCUMENTO  "+valor.DOCUMENTO+" ','adjaspirantes','alta','"+valor.CLAVE+$("#CURP").val()+"');\">"+
					"           <input  type=\"hidden\" value=\""+valor.RUTA+"\"  name=\"RUTA_"+valor.CLAVE+"\" id=\"RUTA_"+valor.CLAVE+"\"  placeholder=\"\" />"+
					"        </div>"+
					"        <div class=\"col-sm-1\" style=\"padding-top:5px;\">"+
					"           <a target=\"_blank\" id=\"enlace_RUTA_"+valor.CLAVE+"\" href=\""+valor.RUTA+"\">"+
					"                 <img class=\"imgadj\" cargado=\"S\" width=\"40px\" height=\"40px\" id=\"pdf_"+valor.CLAVE+"\" name=\"pdf_"+valor.CLAVE+"\" src=\"..\\imagenes\\menu\\pdf.png\" width=\"50px\" height=\"50px\">"+
					"           </a>"+
					"           <i style=\""+stElim+"\"  id=\"btnEli_RUTA_"+valor.CLAVE+"\" title=\"Eliminar el PDF que se ha subido anteriormente\" class=\"ace-icon glyphicon red glyphicon-trash \" "+
					"            onclick=\"eliminarEnlaceDriveAsp('file_"+valor.CLAVE+"','ASPIRANTES_"+valor.CICLO+"',"+
					"                      'pdf_"+valor.CLAVE+"','RUTA_"+valor.CLAVE+"','"+valor.TIPOADJ+"','S','ID','"+valor.CLAVE+"','"+valor.DOCUMENTO+"-DOCUMENTO',"+
					"                      'adjaspirantes','alta','"+valor.CLAVE+$("#CURP").val()+"');\"></i> "+              				                        
					"      </div> ";

					

					if ((contDatos % 2)==1) {contFila++; fila="<div class=\"row\" style=\"padding:0px;\" id=\"fila"+contFila+"\"><div  class=\"col-sm-1\"></div></div>"; }
					else {fila="";}
					
					$("#listaadj").append(fila);
					$("#fila"+contFila).append(cadFile);
					
					contDatos++;	
						
					
				   if (valor.RUTA=='') { 
					   $('#enlace_RUTA'+valor.CLAVE).attr('disabled', 'disabled');					  
					   $('#enlace_RUTA'+valor.CLAVE).attr('href', '../imagenes/menu/pdfno.png');
					   $('#pdf_'+valor.CLAVE).attr('src', "../imagenes/menu/pdfno.png");
					   $('#pdf_'+valor.CLAVE).attr('cargado', 'N');		                    
					  }
				
					if (((valor.TIPOADJ.indexOf("png")>=0) || (valor.TIPOADJ.indexOf("bmp")>=0)) && !(valor.RUTA=='')) {			
						$('#pdf_'+valor.CLAVE).attr('src', valor.RUTA);	
					}
												
			  });

			$('.fileSigea').ace_file_input({
				no_file:'Sin archivo ...',
				btn_choose:'Buscar',
				btn_change:'Cambiar',
				droppable:false,
				onchange:null,
				thumbnail:false, //| true | large
				whitelist:'pdf|jpg|png|bmp',
				blacklist:'exe|php'
				//onchange:''
				//
			});
				
			},
		error: function(data) {	                  
				   alert('ERROR: '+data);
			   }
	   });
   }