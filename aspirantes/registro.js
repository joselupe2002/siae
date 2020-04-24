

    $(document).ready(function($) { var Body = $('container'); Body.addClass('preloader-site');});
    $(window).load(function() {$('.preloader-wrapper').fadeOut();$('container').removeClass('preloader-site');});


    jQuery(function($) { 
		actualizaSelect("CARRERA","select CARR_CLAVE, CARR_DESCRIP from ccarreras where "+
							"CARR_OFERTAR='S'","NORMAL","FUERA");
		actualizaSelect("CARRERA2","select CARR_CLAVE, CARR_DESCRIP from ccarreras where "+
							"CARR_OFERTAR=''","NORMAL","FUERA");
		actualizaSelect("EDOCIVIL","select EDOC_CLAVE, EDOC_DESCRIP from eedocivil ORDER BY EDOC_DESCRIP","NORMAL","FUERA");

		actualizaSelect("EDONAC","select ID_ESTADO, ESTADO from cat_estado  ORDER BY ID_ESTADO","NORMAL","FUERA");
        //actualizaSelect("MUNINAC","SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio where ID_MUNICIPIO=''","NORMAL","FUERA"); 
		
		actualizaSelect("ESTESCPROC","select ID_ESTADO, ESTADO from cat_estado  ORDER BY ID_ESTADO","NORMAL","FUERA");
		//actualizaSelect("ESCPROC","SELECT ESCCVE, ESCNOM FROM descue WHERE ESTCVE=0","BUSQUEDA","FUERA"); 

		actualizaSelect("ESTTUTOR","select ID_ESTADO, ESTADO from cat_estado  ORDER BY ID_ESTADO","NORMAL","FUERA");

		actualizaSelect("AREACONOC","SELECT CLAVE, NOMBRE FROM areaconoc order by NOMBRE","BUSQUEDA","FUERA"); 

		actualizaSelect("ESTRES","select ID_ESTADO, ESTADO from cat_estado  ORDER BY ID_ESTADO","NORMAL","FUERA");
        //actualizaSelect("MUNRES","SELECT ID_MUNICIPIO, MUNICIPIO FROM cat_municipio where ID_MUNICIPIO=''","NORMAL","FUERA"); 

		actualizaSelect("GRUPOIND","select IDGRUPO, DESCRIP from grupoindigena  ORDER BY IDGRUPO","NORMAL","FUERA");

		actualizaSelect("LENIND","select IDLENGUA, DESCRIP from lenguaindigena  ORDER BY IDLENGUA","NORMAL","FUERA");


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


		$('.chosen-select').chosen({allow_single_deselect:true});
		$(window).off('resize.chosen').on('resize.chosen', function() {$('.chosen-select').each(function() {var $this = $(this); $this.next().css({'width': "100%"});})}).trigger('resize.chosen');
		$(document).on('settings.ace.chosen', function(e, event_name, event_val) { if(event_name != 'sidebar_collapsed') return; $('.chosen-select').each(function() {  var $this = $(this); $this.next().css({'width': "100%"});})});	     		    



		$.validator.setDefaults({
			ignore: [],
			rules: {
					CURP:{ required: true, remote: {url: "../nucleo/base/verificaclave.php?tabla=aspirantes&campo=CURP", type: "get"}},
					CARRERA:{min: 1},
					CARRERA2:{min: 1},
					APEPAT:{ required: true},
					APEMAT:{ required: true},
					NOMBRE:{ required: true},
					uno:{ required: true}
					},
			messages: {
					CURP:{required:"Debe colocar su CURP",remote:"Ya existe la CURP registrada anteriormente"},
					CARRERA: "Debe elegir la carrera a la que desea ingresar",
					CARRERA: "Debe elegir una carrera de segunda opción",
					APEPAT: "Debe colocar su Apellido Paterno",
					APEMAT: "Debe colocar su Apellido Materno",
					NOMBRE: "Debe colocar su Nombre Completo",	
					uno: "Debe colocar su Apellido Materno"			
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


		$('#fuelux-wizard-container').ace_wizard({}).on('actionclicked.fu.wizard' , function(e, info){
			  if(info.step == 1) {	
				  /*									
					var form = $( "#frmReg" );
					form.validate();
					campo=sonvalidos(form);
					if (!(campo=="")) { e.preventDefault();}
					else {
						if (!$("#CURP").prop("disabled")) {guardarGen();}
					}*/
								}
			  })
	     .on('changed.fu.wizard', function(e, info) {
			    //alert ("cambie "+info.step);
				})
		.on('finished.fu.wizard', function(e) { 
			                    
			                    bootbox.dialog({
									message: "Gracias. Su registro ha finalizado", 
									buttons: {
										"success" : {
											"label" : "OK",
											"className" : "btn-sm btn-primary"
										}
									}
								});
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
			CURP:$("#CURP").val(),
			APEPAT:$("#APEPAT").val(),
			APEMAT:$("#APEMAT").val(),
			NOMBRE:$("#NOMBRE").val(),
			_INSTITUCION:"ITSM",
			_CAMPUS:"0",
			fechacap: fechacap
	};
	$.ajax({
		type: "POST",
		url:"../nucleo/base/inserta.php",
		data: parametros,
		success: function(data){        			        	
				alert (data);									 
		}					     
	}); 
	
	$("#CURP").prop("disabled",true);
}



function apareceEdit(id,op){
	if (op) {$("#"+id+"_ADD").removeClass("hide"); $("#"+id+"_ET").removeClass("hide");}
	else {$("#"+id+"_ADD").addClass("hide"); $("#"+id+"_ET").addClass("hide");}
}