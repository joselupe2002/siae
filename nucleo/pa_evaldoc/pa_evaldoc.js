var todasColumnas;
var global,globalUni;
var abierto=false;
$(document).ready(function($) { var Body = $('body'); Body.addClass('preloader-site');});
$(window).load(function() {$('.preloader-wrapper').fadeOut();$('body').removeClass('preloader-site');});

$(document).ready(function($) { 
    cargarMaterias();
    });




function generaTabla(grid_data){
c=0;
ladefault="..\\..\\imagenes\\menu\\pdf.png";
$("#cuerpo").empty();
$("#tabHorarios").append("<tbody id=\"cuerpo\">");
jQuery.each(grid_data, function(clave, valor) { 	
        
    $("#cuerpo").append("<tr id=\"row"+valor.ID+"\">");    	   
    $("#row"+valor.ID).append("<td>"+valor.GRUPO+"</td>");
    $("#row"+valor.ID).append("<td>"+valor.MATERIA+"</td>");
    $("#row"+valor.ID).append("<td>"+utf8Decode(valor.MATERIAD)+"</td>");
    $("#row"+valor.ID).append("<td>"+valor.PROFESOR+"</td>");
    $("#row"+valor.ID).append("<td>"+utf8Decode(valor.PROFESORD)+"</td>");
    if (valor.HIZO==0) {
    $("#row"+valor.ID).append("<td style= \"text-align: center;\" ><a  onclick=\"evaluar('"+valor.ID+"','"+valor.PROFESOR+"','"+
                               valor.MATERIA+"','"+valor.MATERIAD+"','"+valor.GRUPO+"','"+valor.CICLO+"','"+utf8Decode(valor.PROFESORD)+"');\" title=\"Capturar actividades para la asignatura\" "+
            "class=\"btn btn-white btn-waarning btn-bold\">"+
            "<i class=\"ace-icon fa fa-check bigger-160 blue \"></i>"+
            "</a></td>");
    }
    else {
        $("#row"+valor.ID).append("<td style= \"text-align: center;\" >"+
        "<span class=\"badge badge-danger\"><i class=\"ace-icon fa fa-check bigger-160 white \"></i> Hecha</span>" +
        "</a></td>");
    }
});
$('#dlgproceso').modal("hide"); 

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

}		

function cargarMaterias() {
    $('#dlgproceso').modal({show:true, backdrop: 'static'});
    elsql="select CICLO,CICL_DESCRIP AS CICLOD, COUNT(*) AS HAY from ecortescal a, ciclosesc b where  CICLO=getciclo() "+
    " and STR_TO_DATE(DATE_FORMAT(now(),'%d/%m/%Y'),'%d/%m/%Y') Between STR_TO_DATE(INICIA,'%d/%m/%Y')  "+
    " AND STR_TO_DATE(TERMINA,'%d/%m/%Y') and CLASIFICACION='EVALDOC'"+
    " and a.CICLO=b.CICL_CLAVE";

    $.ajax({
    type: "GET",
    url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(elsql),
    success: function(data){
        losdatos=JSON.parse(data);
        cad1="";cad2="";
        jQuery.each(losdatos, function(clave, valor) { cad1=valor.CICLO; cad2=valor.CICLOD; abierto=valor.HAY;});   
                $("#elciclo").html(cad1);
                $("#elciclod").html(cad2);

                sqlmater="select e.ID, e.ALUCTR as MATRICULA,e.PDOCVE AS CICLO, e.MATCVE AS MATERIA, f.MATE_DESCRIP AS MATERIAD, "+
                " e.GPOCVE AS GRUPO, e.LISTC15 as PROFESOR, concat(EMPL_NOMBRE,' ',EMPL_APEPAT,' ',EMPL_APEMAT) AS PROFESORD, "+
                " (select count(*) from ed_respuestas where IDDETALLE=e.ID and MATRICULA='"+elusuario+"' and TERMINADA='S') HIZO "+
                " from dlista e, cmaterias f, pempleados g  where  e.LISTC15=g.EMPL_NUMERO and e.MATCVE=f.MATE_CLAVE and ifnull(MATE_TIPO,'0') NOT IN ('T','AC')"+
                " AND e.ALUCTR='"+elusuario+"' and e.PDOCVE=getciclo()";

                if (abierto) { 
                        $.ajax({
                            type: "GET",
                            url:  "../base/getdatossql.php?bd=Mysql&sql="+encodeURI(sqlmater),
                            success: function(data){        	    
                                    generaTabla(JSON.parse(data));	   
                                    $('#dlgproceso').modal("hide");      	     
                                },
                            error: function(data) {	                  
                                    alert('ERROR: '+data);
                                    $('#dlgproceso').modal("hide");  
                                }
                        });
                    }
                else 
                    {$('#dlgproceso').modal("hide"); }
                                
        },
    error: function(data) {	                  
            alert('ERROR: '+data);
            $('#dlgproceso').modal("hide");  
        }
    });

}



function evaluar(id,profesor,materia,materiad,grupo,ciclo,profesord){
      window.location="evalDoc.php?&id="+id+"&ciclo="+ciclo+"&profesord="+profesord+"&profesor="+profesor+"&grupo="+grupo+"&materia="+materia+"&materiad="+materiad;
}


