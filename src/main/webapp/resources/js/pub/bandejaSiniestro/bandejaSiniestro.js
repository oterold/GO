function inicioBandejaSiniestro(){
	$("#scrollBandeja").focus();
	$( "#fila1" ).trigger( "click" );
	
	
}
try {
	shortcut.add("Up",function() {
		mostrarDetalleBandejaSiniestro(2);
	});
	shortcut.add("Down",function() {
		mostrarDetalleBandejaSiniestro(1);
	});
	
} catch (e) {
	// TODO: handle exception
}


function mostrarDetalleBandejaSiniestro(posicion,type,key){
	
	var cantidadRegistros=document.getElementById("cantidadRegistros").value;
	var valorRegistro=document.getElementById("registroActual").value;
	
	//aca pregunta s tiene que ir para abajo
	if(posicion == 1){
		if(valorRegistro == cantidadRegistros){
		$('#registroActual').val(1);
		document.getElementById('scrollBandeja').scrollTop -= 10000000;	
		posicionRegistro = 1;
		}
		else {
			posicionRegistro = parseInt(valorRegistro) +1;
			document.getElementById('scrollBandeja').scrollTop += 45;	
			$('#registroActual').val(posicionRegistro);
		}
	}
	
	//aca pregunta si tiene qe ir para arriba
	else if(posicion == 2){
		if(valorRegistro <=1){
			$('#registroActual').val(cantidadRegistros);
			posicionRegistro = cantidadRegistros;
			document.getElementById('scrollBandeja').scrollTop += 10000000;	

		}
		else {
			posicionRegistro = parseInt(valorRegistro) -1;
			document.getElementById('scrollBandeja').scrollTop -= 45;	
				$('#registroActual').val(posicionRegistro);
		}
	}
	
	$( "#fila"+posicionRegistro ).trigger( "click" );
	
}
function mostrarValorBandejaSiniestro(id,type,key,act,noti,anticipo){
	
	$('#typeBandejaSiniestro').val(type);
	$('#keyBandejaSiniestro').val(key);
	$('#actBandejaSiniestro').val(act);
	$('#notiBandejaSiniestro').val(noti);
	$('#anticipoBandejaSiniestro').val(anticipo)
	
	$.ajax({
	    url : 'detalleTarea',
	    contentType: 'application/json', 
	    data : { type:type,key:key},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$("#datosSiniestroSeleccionado").html("(" +validarCampoVacio(json[0]['P_TF_BANDEJA_TAREAS_WFB_FORMAT_SINI'])+ ")");

		    	$('#valorAnnioRamoSiniestro').val(json[0]['P_TF_BANDEJA_TAREAS_WFB_FORMAT_SINI']);
		    	
	    		llenarDinamicamente(json[0]);
	    		
	    		
	    		
	    		$('#registroActual').val(id);

	    		//pinta todo de blanco
	    		$(".tr-grilla").each(function(){
	    			$(this).css("background","white");
	    		});
	    		//pinta el seleccionado
	    		$('#fila'+id).css("background","#bac2bb");
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	$.unblockUI();
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function buscarFiltroBandejaSiniestro(idTablaParametricos){
	
	input = document.getElementById("inputBusquedaBandejaSiniestro");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function buscadorPanelModalNotas() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaSiniestroModal");
	  filter = input.value.toUpperCase();
	
	  $(".datoSiniestroModal").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("notasModalSiniestro", "panelModalSiniestroNotas");
		  var idCardParteB = idH6.replace("notasModalSiniestro", "panelModalSiniestroNotas");
		  
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idCardParteB).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  

	}






function abrirModalNotasBandejaSiniestro(){
	
	var valorSiniestro=document.getElementById("valorAnnioRamoSiniestro").value;
	var siniestro = valorSiniestro.split('-')[2].split('/')[0];
	var ramo = valorSiniestro.split('-')[1];
	var annio = valorSiniestro.split('-')[0];
	
	var annio ='1';
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosNotasModalBandejaSiniestro',
	    contentType: 'application/json', 
	    data : { siniestro : siniestro, annio:annio, ramo : ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	
			$("#DATOS_MODAL").html("Notas Del Siniestro #<b>" + valorSiniestro + "</b>");
	    	var d1 = document.getElementById("datosModal");
	    	d1.innerHTML = ' ';
    		
	    	var panelNuevo = '<div style="height:300px;overflow-y:auto;"><table  style= "width:100%;">';
	    	for ( var int = 0; int < json.length; int++) {
	    		
	    		panelNuevo = panelNuevo + '<div class="timeline__post seleccionPanelB" style="width:99%;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:12px">' +
	    								  '<div class="timeline__content" id="panelModalSiniestroNotas'+int+'" style="overflow:hidden;">'+
	    								  '<h6 class="datoSiniestroModal" id="notasModalSiniestro'+int+'">'+formatearFechaJson(json[int]['P_TF_LISTA_IMPR_SINO_FE_NOTA'])+' -- '+ primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_SINO_CD_USUARIO']) +'</h6><h6 class="datoSiniestroModal" id="notasModalSiniestro'+int+'"><b>'+primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_SINO_SITS_DE_TIPO_NOTA']) +' - '+ primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_SINO_DESC_NOTA'])+'.</b></h6></div></div>';
	    	}
	    	d1.innerHTML = panelNuevo;  
    			    	
			//Abre el modal
			$("#notasPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
			
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		        alert('No posee notas',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};
	



function abrirModalEscalamientos(){
	
	var type=document.getElementById("typeBandejaSiniestro").value;
	var key=document.getElementById("keyBandejaSiniestro").value;
	var act=document.getElementById("actBandejaSiniestro").value;
	var noti=document.getElementById("notiBandejaSiniestro").value;
	var siniestro=document.getElementById("valorAnnioRamoSiniestro").value;

	
	bloquearPantallaGris();
	$.ajax({
	    url : 'escalamientosModal',
	    contentType: 'application/json', 
	    data : { type : type, key : key, act:act, noti:noti},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	     		var d1 = document.getElementById("datosEscalamientoWF");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.datos.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json.datos[int]['P_TF_LISTA_INB_ESCALAMIENTO_A'])+'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json.datos[int]['P_TF_LISTA_WNES_TIEMPO_ESC']) +'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json.datos[int]['P_TF_LISTA_INB_DES_UNIDAD'])+'</h6></td>'+
		            '<td class="td-grilla-escalamientoWd" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json.datos[int]['P_TF_LISTA_WNES_FE_FINALIZACION'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo;  
    	    	$("#DATOS_MODAL_ESCALAMIENTOS").html("Escalamiento del siniestro: <b>#"+siniestro+"</b>");
    	    	$("#fechaEscalamiento").html("Fecha :<b>"+validarCampoVacio(formatearFechaJson(json.salida[0]))+"</b>");

    	    	
    	    	
			//Abre el modal
			$("#escalamientoWfPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
			
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('El siniestro no posee escalamientos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};





function abrirModalReasignaciones(){
	
	var type=document.getElementById("typeBandejaSiniestro").value;
	var key=document.getElementById("keyBandejaSiniestro").value;
	var act=document.getElementById("actBandejaSiniestro").value;
	var siniestro=document.getElementById("valorAnnioRamoSiniestro").value;

	
	bloquearPantallaGris();
	$.ajax({
	    url : 'reasignacionesWf',
	    contentType: 'application/json', 
	    data : { type : type, key : key, act:act},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	     		var d1 = document.getElementById("datosReasignacionesWF");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_WFR_USUARIO']) +'</h6></td>'+
		            '<td class="td-grilla-escalamientoWd" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_WFR_FEC_INICIO'])) +'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_WFR_FEC_FIN']))+'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_WFR_COMENTARIO'])+'</h6></td>'+
		            '</tr>';
    	    	}	
    	    	d1.innerHTML = panelNuevo;  
    	    	$("#DATOS_MODAL_REASIGNACIONES").html("Reasignaciones del siniestro: <b>#"+siniestro+"</b>");

    	    	
    	    	
			//Abre el modal
			$("#reasignacionesWfPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
			
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('El siniestro no posee escalamientos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};




function abrirModalAnticipo(){
	
	//var anticipo=document.getElementById("anticipoBandejaSiniestro").value;
	var siniestro=document.getElementById("valorAnnioRamoSiniestro").value;
	var anticipo = '1126';
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'anticiposWf',
	    contentType: 'application/json', 
	    data : { anticipo : anticipo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	     		var d1 = document.getElementById("datosAnticiposWF");
    	    	d1.innerHTML = '';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_WFB_NU_ANTICIPO']) +'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_WFB_CAPU_CD_PRODUCTO']) +'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_WFB_DE_MAIL']) +'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_WFB_NU_LATITUD']) +'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_WFB_NU_LONGITUD']) +'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_WFB_NU_TELE_ASEGURADO']) +'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_INB_SEL_MENU_MOBILE'])+'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_INB_CAPD_DSC_PRODUCTOR'])+'</h6></td>'+
		            '<td class="td-grilla-escalamientoWf" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_LISTA_INB_WMAP_DSC_APLICACION'])+'</h6></td>'+
		            '</tr>';
    	    	}	
    	    	d1.innerHTML = panelNuevo;  
    	    	$("#DATOS_MODAL_ANTICIPOS").html("Anticipo del siniestro: <b>#"+siniestro+"</b>");

    	    	
    	    	
			//Abre el modal
			$("#anticiposWfPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
			
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('El siniestro no posee escalamientos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function descargarExcelBandejaWF()
{
    
    location.href = "/PSPES/descargarArchivoExcelBandejaSiniestro";
};


