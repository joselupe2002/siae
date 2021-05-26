
var misdatos=[];

$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

$(document).ready(function($) { 
    cargarDatos();
    verificarDatos();
    
   
});

function cargarDatos(){
    elsql="SELECT alum_matricula, alum_foto,concat(alum_nombre,' ',alum_apepat,' ',alum_apemat) as alum_nombrec,alum_direccion, alum_telefono, alum_correo, "+
    " CARR_DESCRIP AS alum_carreraregd, alum_cicloins,"+
    " alum_correo AS CORREO,alum_telefono AS TEL, alum_tutor AS TUTOR, ALUM_TRABAJO, ALUM_TELTRABAJO, ALUM_DIRTRABAJO "+
    " FROM falumnos, ccarreras  WHERE alum_matricula='"+elusuario+"' and ALUM_CARRERAREG=CARR_CLAVE";
        parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
        $.ajax({
            type: "POST",
            data:parametros,
            url:  "../base/getdatossqlSeg.php",
            success: function(data){  
                losdatos=JSON.parse(data);		    	      		    	    		    	        
                jQuery.each(losdatos, function(clave, valor) { 
                    $('#nombre').html(valor.alum_nombrec);	
                    $('#carrera').html(valor.alum_carreraregd);	
                    $('#correo').html(valor.alum_correo);	
                    	
                    $('#img_ALUM_FOTO').attr("src",valor.alum_foto);

            });
        }
    });



}


function verificarDatos(){
    elsql="select a.*, count(*) as HAY from estudiosoc a where  MATRICULA='"+elusuario+"'";
	parametros={sql:elsql,dato:sessionStorage.co,bd:"Mysql"}
	$.ajax({
			type: "POST",
			data:parametros,
			url:  "../base/getdatossqlSeg.php",
			success: function(data){
                misdatos=JSON.parse(data);
                if (misdatos[0]["HAY"]>0) {
                    cargarElementos();                   
                }
                else {
                    //creamos nuevo registro 
                    insertaRegistro();
                }
				
            }
        });
}

function insertaRegistro(){
    lafecha=dameFecha("FECHAHORA");
    parametros={tabla:"estudiosoc",
			    bd:"Mysql",
			    _INSTITUCION:institucion,
			    _CAMPUS:campus,
			    MATRICULA:elusuario,
				FECHACAP:lafecha,	
                USUARIO:elusuario		
			};
			    $.ajax({
			 		  type: "POST",
			 		  url:"../base/inserta.php",
			 	      data: parametros,
			 	      success: function(data){                 
						 cargarElementos();
					   }					
					});
}

function cargarElementos(){

    $("#servicios").append("<div class=\"row\"><div id=\"i1\" class=\"col-sm-3\"></div><div id=\"i2\" class=\"col-sm-3\"></div><div id=\"i3\" class=\"col-sm-3\"></div><div id=\"i4\" class=\"col-sm-3\"></div></div>");
   
    addElementPes("SINO","i1","estudiosoc","MATRICULA",elusuario,"ESCABEZA","Soy la Cabeza de la Familia","","","",misdatos);

    elsql="SELECT EDOC_CLAVE, EDOC_DESCRIP FROM eedocivil ORDER BY EDOC_CLAVE";
    addElementPes("SELECT","i2","estudiosoc","MATRICULA",elusuario,"EDOCIV","Estado Civil","PROPIO",elsql,"",misdatos);
    
    elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='EST_TIPOCASA' ORDER BY CATA_DESCRIP";
    addElementPes("SELECT","i3","estudiosoc","MATRICULA",elusuario,"CASA","¿Su Casa es?","PROPIO",elsql,"",misdatos);

    elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='EST_DISCAPACIDAD' ORDER BY CATA_CLAVE";
    addElementPes("SELECT","i4","estudiosoc","MATRICULA",elusuario,"DISCAPACIDAD","¿Tienes alguna discapacidad?","PROPIO",elsql,"",misdatos);

   

   // addSELECTMULT_CONVALOR("DISCAPACIDAD2","i4","CICLOS",elsql,"","BUSQUEDA","");


    $("#servicios").append("<br><div class=\"alert alert-success\"><span class=\"fontRobotoB bigger-160\">De la lista marque que tipo de Servicios cuenta en su Hogar</span></div><div class=\"row\"><div id=\"s1\" class=\"col-sm-4\"></div><div id=\"s2\" class=\"col-sm-4\"></div><div id=\"s3\" class=\"col-sm-4\"></div></div>");
    addElementPes("SINO","s1","estudiosoc","MATRICULA",elusuario,"SER_ENERGIA","¿Energía Eléctrica?","","","",misdatos);
    addElementPes("SINO","s1","estudiosoc","MATRICULA",elusuario,"SER_DRENAJE","¿Drenaje?","","","",misdatos);
    addElementPes("SINO","s1","estudiosoc","MATRICULA",elusuario,"SER_AGUA","¿Agua Potable?","","","",misdatos);   
    addElementPes("SINO","s1","estudiosoc","MATRICULA",elusuario,"SER_GAS","¿Gas?","","","",misdatos);         
    addElementPes("SINO","s1","estudiosoc","MATRICULA",elusuario,"SER_LAVADORA","¿Lavadora?","","","",misdatos);   
    addElementPes("SINO","s2","estudiosoc","MATRICULA",elusuario,"SER_REFRIGERADOR","¿Refrigerador?","","","",misdatos); 
    addElementPes("SINO","s2","estudiosoc","MATRICULA",elusuario,"SER_TV","¿Televisión?","","","",misdatos);   
    addElementPes("SINO","s2","estudiosoc","MATRICULA",elusuario,"SER_TELFIJO","¿Teléfono Fijo?","","","",misdatos);  
    addElementPes("SINO","s2","estudiosoc","MATRICULA",elusuario,"SER_TELCEL","¿Teléfono Celular?","","","",misdatos);     
    addElementPes("SINO","s2","estudiosoc","MATRICULA",elusuario,"SER_HORNOMICRO","¿Horno de Microondas?","","","",misdatos);   
    addElementPes("SINO","s3","estudiosoc","MATRICULA",elusuario,"SER_RADIO","¿Radio?","","","",misdatos);   
    addElementPes("SINO","s3","estudiosoc","MATRICULA",elusuario,"SER_COMPUTADORA","¿Computadora?","","","",misdatos); 
    addElementPes("SINO","s3","estudiosoc","MATRICULA",elusuario,"SER_CONSOLA","¿Consola de videojuegos?","","","",misdatos);   
    addElementPes("SINO","s3","estudiosoc","MATRICULA",elusuario,"SER_INTERNET","¿Servicio de Internet?","","","",misdatos);   
    addElementPes("SINO","s3","estudiosoc","MATRICULA",elusuario,"SER_STREAMING","¿Servicio de Streming Netflix, Amazon, Disney etc.?","","","",misdatos); 
	
    $("#casa").append("<br><div class=\"alert alert-success\"><span class=\"fontRobotoB bigger-160\">Indique el número de cada rubro que tienen su casa</span></div><div class=\"row\"><div id=\"c1\" class=\"col-sm-4\"></div><div id=\"c2\" class=\"col-sm-4\"></div><div id=\"c3\" class=\"col-sm-4\"></div></div>");
    addElementPes("SELECTNUM","c1","estudiosoc","MATRICULA",elusuario,"CASA_PLANTAS","¿No. de Plantas?","","0:5","",misdatos);
    addElementPes("SELECTNUM","c1","estudiosoc","MATRICULA",elusuario,"CASA_SALA","¿No. de Salas?","","0:5","",misdatos);
    addElementPes("SELECTNUM","c1","estudiosoc","MATRICULA",elusuario,"CASA_COMEDOR","¿No. de Comedor?","","0:5","",misdatos);
    addElementPes("SELECTNUM","c1","estudiosoc","MATRICULA",elusuario,"CASA_COCINA","¿No. de Cocinas?","","0:5","",misdatos);
    addElementPes("SELECTNUM","c2","estudiosoc","MATRICULA",elusuario,"CASA_RECAMARA","¿No. de Recamaras?","","0:5","",misdatos);
    addElementPes("SELECTNUM","c2","estudiosoc","MATRICULA",elusuario,"CASA_SANITARIO","¿No. de Sanitarios?","","0:5","",misdatos);
    addElementPes("SELECTNUM","c2","estudiosoc","MATRICULA",elusuario,"CASA_PATIOS","¿No. de Patios?","","0:5","",misdatos);
    addElementPes("SELECTNUM","c2","estudiosoc","MATRICULA",elusuario,"CASA_COCHERA","¿No. de Cocheras?","","0:5","",misdatos);

    elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='EST_TIPOPISO' ORDER BY CATA_DESCRIP";
    addElementPes("SELECT","c3","estudiosoc","MATRICULA",elusuario,"CASA_TIPOPISO","¿Tipo de Piso?","PROPIO",elsql,"",misdatos);

    elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='EST_TIPOTECHO' ORDER BY CATA_DESCRIP";
    addElementPes("SELECT","c3","estudiosoc","MATRICULA",elusuario,"CASA_TIPOTECHO","¿Tipo de Techo?","PROPIO",elsql,"",misdatos);

    elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='EST_TIPOCOMBUSTIBLE' ORDER BY CATA_DESCRIP";
    addElementPes("SELECT","c3","estudiosoc","MATRICULA",elusuario,"CASA_TIPOCOMBUSTIBLE","¿Tipo de Combustible?","PROPIO",elsql,"",misdatos);

    elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='EST_AUTOMOVIL' ORDER BY CATA_DESCRIP";
    addElementPes("SELECT","c3","estudiosoc","MATRICULA",elusuario,"CASA_AUTOMOVIL","¿Cuenta con Automovil?","PROPIO",elsql,"",misdatos);

    $("#gastos").append("<br><div class=\"alert alert-success\"><span class=\"fontRobotoB bigger-160\">Indique la cantidad en Pesos que gasta al mes en cada rubro (Sin espacios ni comas)</span></div><div class=\"row\"><div id=\"g1\" class=\"col-sm-4\"></div><div id=\"g2\" class=\"col-sm-4\"></div><div id=\"g3\" class=\"col-sm-4\"></div></div>");
    addElementPes("INPUTMON","g1","estudiosoc","MATRICULA",elusuario,"GASTO_ALIMENTACION","¿Alimentación?","","","",misdatos);   
    addElementPes("INPUTMON","g1","estudiosoc","MATRICULA",elusuario,"GASTO_EDUCACION","¿Educación?","","","",misdatos);
    addElementPes("INPUTMON","g1","estudiosoc","MATRICULA",elusuario,"GASTO_RENTA","¿Renta?","","","",misdatos);
    addElementPes("INPUTMON","g1","estudiosoc","MATRICULA",elusuario,"GASTO_LUZ","¿Luz?","","","",misdatos);
    addElementPes("INPUTMON","g2","estudiosoc","MATRICULA",elusuario,"GASTO_AGUA","¿Agua?","","","",misdatos);
    addElementPes("INPUTMON","g2","estudiosoc","MATRICULA",elusuario,"GASTO_TRANSPORTE","¿Transporte?","","","",misdatos);
    addElementPes("INPUTMON","g2","estudiosoc","MATRICULA",elusuario,"GASTO_COMBUSTIBLE","¿Combustible?","","","",misdatos);
    addElementPes("INPUTMON","g3","estudiosoc","MATRICULA",elusuario,"GASTO_INTERNET","¿Internet?","","","",misdatos);
    addElementPes("INPUTMON","g3","estudiosoc","MATRICULA",elusuario,"GASTO_STREAMING","¿Servicios de streming?","","","",misdatos);
    addElementPes("INPUTMON","g3","estudiosoc","MATRICULA",elusuario,"GASTO_OTROS","Otros Gastos","","","",misdatos);

    $("#g2").append("<div style=\"padding-top:20px;\"><button onclick=\"captIntegrantes();\" class=\"btn btn-white btn-info btn-bold\"><i class=\"ace-icon fa fa-home bigger-120 blue\"></i>Capturar Integrantes del Hogar</button></div>");

   
    $("#comunidad").append("<br><div class=\"alert alert-success\"><span class=\"fontRobotoB bigger-160\">Indica los servicios con los que dispone la comunidad donde vives</span></div><div class=\"row\"><div id=\"co1\" class=\"col-sm-4\"></div><div id=\"co2\" class=\"col-sm-4\"></div><div id=\"co3\" class=\"col-sm-4\"></div></div>");
    addElementPes("SINO","co1","estudiosoc","MATRICULA",elusuario,"COMU_ESCUELA","¿Escuelas públicas?","","","",misdatos);
    addElementPes("SINO","co1","estudiosoc","MATRICULA",elusuario,"COMU_CENTRO","¿Centros de Salud?","","","",misdatos);
    addElementPes("SINO","co1","estudiosoc","MATRICULA",elusuario,"COMU_PAVIEMENTO","¿Pavimentación ?","","","",misdatos);   
    addElementPes("SINO","co2","estudiosoc","MATRICULA",elusuario,"COMU_ALUMBRADO","¿Alumnbrado?","","","",misdatos);         
    addElementPes("SINO","co2","estudiosoc","MATRICULA",elusuario,"COMU_TELEFONO","¿Teléfonos Públicos?","","","",misdatos);
    addElementPes("SINO","co2","estudiosoc","MATRICULA",elusuario,"COMU_TRANSPORTE","¿Transporte?","","","",misdatos);   

    
    elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='EST_ENFERMEDADES' ORDER BY CATA_CLAVE";
    addElementPes("SELECTMULT","enfermedades","estudiosoc","MATRICULA",elusuario,"FAMI_ENFERMEDADES","¿Qué enfermedades existen en tu familia?","PROPIO",elsql,"",misdatos);

    elsql="SELECT CATA_CLAVE, CATA_DESCRIP FROM scatalogos where CATA_TIPO='EST_BECAS' ORDER BY CATA_CLAVE";
    addElementPes("SELECTMULT","enfermedades","estudiosoc","MATRICULA",elusuario,"BECAS","¿Cuentas con alguna Beca?","PROPIO",elsql,"",misdatos);
    $("#enfermedades").append("<br>");
    addElementPes("SINO","enfermedades","estudiosoc","MATRICULA",elusuario,"FAMI_PROSPERA","Marca Si ¿Alguno de tus familiares pertenece al programa PROSPERA?","","","",misdatos);   


    

}


function captIntegrantes(){
    enlace="nucleo/base/grid.php?modulo=est_integrantes&nombre=&padre=SIGEA&limitar=S&automatico=S&bd=Mysql&restr=";	    	      	 					  
    abrirPesta(enlace,"Integrantes");
}