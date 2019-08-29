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


function inicioBusquedaBPBA(){
	
}

function redirectSiniestroBPBAHome(){
	
	bloquearPantallaGris();
	location.href ="/PSPES/goBPBA";
	
}

function buscarSiniestroBPBA(){
	
	bloquearPantallaGris();
	location.href = "/PSPES/buscarSiniestroBPBA";
}function selectCheck(dato) {

if (dato == "1") {
	verificarCheck2();
	verificarCheck3();
	verificarCheck4();
	verificarCheck5();
	verificarCheck6();
}

if (dato == "2") {
	verificarCheck1();
	verificarCheck3();
	verificarCheck4();
	verificarCheck5();
	verificarCheck6();
	
}
if (dato == "3") {
	verificarCheck1();
	verificarCheck2();
	verificarCheck4();
	verificarCheck5();
	verificarCheck6();
	
}
if (dato == "4") {
	verificarCheck1();
	verificarCheck2();
	verificarCheck3();
	verificarCheck5();
	verificarCheck6();
	
}
if (dato == "5") {
	verificarCheck1();
	verificarCheck2();
	verificarCheck3();
	verificarCheck4();
	verificarCheck6();
	
}
if (dato == "6") {
	verificarCheck1();
	verificarCheck2();
	verificarCheck3();
	verificarCheck4();
	verificarCheck5();
}


}

function verificarCheck1(dato) {
	if (($('#checkEntidadPoliza').is(':checked')))
		$('#labelCheck1').click();
	
}


function verificarCheck2(dato) {
	if ($('#checkEntidadCliente').is(':checked'))
		$('#labelCheck2').click();
}


function verificarCheck3(dato) {
	if ($('#checkEntidadSiniestro').is(':checked'))
		$('#labelCheck3').click();
}


function verificarCheck4(dato) {
	if ($('#checkEntidadNid').is(':checked'))
		$('#labelCheck4').click();
}


function verificarCheck5(dato) {
	if ($('#checkEntidadCotizacion').is(':checked'))
		$('#labelCheck5').click();
}


function verificarCheck6(dato) {
	if ($('#checkEntidadProductor').is(':checked'))
		$('#labelCheck6').click();
}





function inicioCotizacionComparacion(){
	$( ".cerrarModalBotonHoover" ).trigger( "click" );

}

function cargarSelectorPlanes(cotizacionA,cotizacionB,certificado){
	$.ajax({
	    url : '/PSPES/comparacionCotizacionPlanes',
	    contentType: 'application/json', 
	    data : { cotizacionA : cotizacionA,cotizacionB : cotizacionB,certificado : certificado},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		var d1 = document.getElementById("selectorPlanesPromocionCMP");
	    		var panelNuevo = "<option>Seleccione..</option>";
	    		d1.innerHTML = ' ';
	    		
	    		$.each(json, function(key, value){
	    			if(value.length == 2){
		    		panelNuevo =panelNuevo + '<option value="'+value[0]['plan']+'_'+value[0]['promo']+'_'+certificado+'">'+completarEspacios(value[0]['plan'],2) + '&nbsp;|&nbsp;'+ completarEspacios(value[0]['promo'],15) +'&nbsp;|&nbsp;'+completarEspacios(formatearMoneda(value[0]['premio']),20)+'&nbsp;|&nbsp;'+formatearMoneda(value[1]['premio'])+'</option>';
	    			}else{
			    	panelNuevo =panelNuevo + '<option value="'+value[0]['plan']+'_'+value[0]['promo']+'_'+certificado+'">'+completarEspacios(value[0]['plan'],2) + '&nbsp;|&nbsp;'+ completarEspacios(value[0]['promo'],15) +'&nbsp;|&nbsp;'+completarEspacios(formatearMoneda(value[0]['premio']),20)+'&nbsp;|&nbsp;--</option>';

	    			}
	    			});	    		
	    		d1.innerHTML =panelNuevo;
	    		
	    		
	    	} catch (e) {
	    		mostrarError('Code 465 : No se pudo cargar los certiciados');
	    	}
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
		    	mostrarError('Code 469 - Se ha producido un inconveniente al cargar los certificados!');
	    },
	});
	
	
}
function completarEspacios(dato,tam){
	var cantidad = dato.length;
	if(dato.length>=tam){
		return dato;
	}
	var llenar = parseInt(tam)-parseInt(cantidad);
	var completar='';
	for(var a = 0;a<llenar;a++){
		completar = completar + "&nbsp;"
	};
	return dato + completar;
	
}
function mostrarCotiAoB(coti){
	var cotizacionA	= $('#cotizacionActual').val();
	if(cotizacionA == coti){
		return coti = "A";
	}else{
		return coti="B";
	}
}
function cargarCoberturasComponentes(){
	var select = document.getElementById('selectorPlanesPromocionCMP');
	var valorSelect = select.options[select.selectedIndex].value;
	var plan = valorSelect.split("_")[0];
	var promo = valorSelect.split("_")[1];
	var certificado = valorSelect.split("_")[2];
	
	cargarComponentesCotizacion(plan,promo,certificado);
	cargarCoberturasCotizacion(plan,promo,certificado);
	
	$("#panelComponentes").css("display","");
	$("#mensajeComponentes").css("display","none");
	
	
}


function cargarComponentesCotizacion(plan,promo,certificado){
	var cotizacionA	= $('#cotizacionActual').val();
	var cotizacionB	= $('#cotizacionNueva').val();
	bloquearPantallaGris();

	$.ajax({
	    url : '/PSPES/comparacionCotizacionComponentes',
	    contentType: 'application/json', 
	    data : { cotizacionA : cotizacionA, cotizacionB : cotizacionB,certificado:certificado,plan:plan,promo:promo},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		bloquearPantallaGris();

	    		
	        	$("#cantIgualesComponentes").val("0");
	        	$("#cantDifComponentes").val("0");
	    		var d1 = document.getElementById("tablaCmpComponentes");
		    	d1.innerHTML = ' ';
		    	var panelNuevo = '';
		    	
	    			$.each(json, function(key, value){
	    			if(value.length > 1){
			    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="cursor:pointer;text-align:right;font-weight:400" title="'+value[0]['codigo']+'"">'+validarCampoVacio(primeraLetraMayus(value[0]['componente']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(formatearMoneda(value[0]['monto']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((value[0]['tasa']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"></h6>'+mostrarIconoComponentes(value[0]['monto'],value[0]['tasa'],value[1]['monto'],value[1]['tasa'])+'</td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(formatearMoneda(value[1]['monto']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((value[1]['tasa']))+'</h6></td>'+
			    		'</tr>';
	    			}else if(value[0]['valor'] == 0){
	    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="cursor:pointer;text-align:right;font-weight:400" title="'+value[0]['codigo']+'"">'+validarCampoVacio(primeraLetraMayus(value[0]['componente']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(formatearMoneda(value[0]['monto']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((value[0]['tasa']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"></h6>'+mostrarIconoComponentes(value[0]['monto'],value[0]['tasa'],'','')+'</td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio('')+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio('')+'</h6></td>'+
			    		'</tr>';
	    			}else{
	    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="cursor:pointer;text-align:right;font-weight:400" title="'+value[0]['codigo']+'"">'+validarCampoVacio(primeraLetraMayus(value[0]['componente']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio('')+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio('')+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"></h6>'+mostrarIconoComponentes('','',value[0]['monto'],value[0]['tasa'])+'</td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(formatearMoneda(value[0]['monto']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((value[0]['tasa']))+'</h6></td>'+
			    		'</tr>';
	    			}
	    				
	    			});

	    			d1.innerHTML = panelNuevo + '</tr>';
		    		var distintos = $("#cantDifComponentes").val();
		    		var iguales = $("#cantIgualesComponentes").val();
		    		
		    		$("#cantIgualesComponentesLabel").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
		    		$("#cantDifComponentesLabel").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");
		    		
		    		
	    	} catch (e) {
	    	 	mostrarError('No es posible realizar la comparacion de componentes. Por favor seleccione otro plan/promocion');
		    	$("#mensajeComponentes").css("display","");
	    		$("#panelComponentes").css("display","none");
	    		}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('No es posible realizar la busqueda. Por favor seleccione otro plan/promoci&oacute;n');
	    	$("#mensajeComponentes").css("display","");
    		$("#panelComponentes").css("display","none");
	    },
	});
	
}


function cargarCoberturasCotizacion(plan,promo,certificado){
	var cotizacionA	= $('#cotizacionActual').val();
	var cotizacionB	= $('#cotizacionNueva').val();
	bloquearPantallaGris();

	$.ajax({
	    url : '/PSPES/comparacionCotizacionCoberturas',
	    contentType: 'application/json', 
	    data : { cotizacionA : cotizacionA, cotizacionB : cotizacionB,certificado:certificado,plan:plan,promo:promo},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		bloquearPantallaGris();

	    		
	        	$("#cantIgualesCoberturas").val("0");
	        	$("#cantDifCoberturas").val("0");
	    		var d1 = document.getElementById("tablaCmpCoberturas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo = '';
		    	var posicion = 0;
		    	$("#datosObjCoberturas").val(JSON.stringify(json));
		    	
	    			$.each(json, function(key, value){
	    			if(value.length > 1){
		    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="'+value[0]['codigo']+'"" ">'+validarCampoVacio(primeraLetraMayus(value[0]['descripcion']))+'</h6></td>'+
		    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button onclick="mostrarDetalleCoberturas('+quitarCeroIzq(key)+',0);" style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio(formatearMoneda(value[0]['mtPrima']))+'&nbsp;  <i style="cursor:pointer;color: #0b4376;font-size:15px" class="fas fa-plus"></i></button></h6></td>'+
		    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoCoberturas(value[0]['mtPrima'],value[1]['mtPrima'])+'</h6></td>'+
		    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button onclick="mostrarDetalleCoberturas('+quitarCeroIzq(key)+',1);" style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio(formatearMoneda(value[1]['mtPrima']))+'&nbsp; <i style="cursor:pointer;color: #0b4376;font-size:15px" class="fas fa-plus"></i></button></h6></td>'+
		    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"><i onclick="mostrarTarifasCMP('+key+');"  style="cursor:pointer;color: #0b4376;font-size:15px" class="pt-3 fas fa-info-circle"></i></h6></td>'+
		    		'</tr>';
	    			}else if(value[0]['valor'] == 0){
	    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="'+value[0]['codigo']+'"" ">'+validarCampoVacio(primeraLetraMayus(value[0]['descripcion']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button onclick="mostrarDetalleCoberturas('+quitarCeroIzq(key)+',0);" style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio(formatearMoneda(value[0]['mtPrima']))+'&nbsp;  <i style="cursor:pointer;color: #0b4376;font-size:15px" class="fas fa-plus"></i></button></h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoCoberturas(value[0]['mtPrima'],'')+'</h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio('')+'&nbsp;</button></h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"><i onclick="mostrarTarifasCMP('+key+');"  style="cursor:pointer;color: #0b4376;font-size:15px" class="pt-3 fas fa-info-circle"></i></h6></td>'+
			    		'</tr>';
	    			}else{
			    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="'+value[0]['codigo']+'"" ">'+validarCampoVacio(primeraLetraMayus(value[0]['descripcion']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio('')+'&nbsp;</button></h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoCoberturas('',value[0]['mtPrima'])+'</h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button onclick="mostrarDetalleCoberturas('+quitarCeroIzq(key)+',1);" style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio(formatearMoneda(value[0]['mtPrima']))+'&nbsp; <i style="cursor:pointer;color: #0b4376;font-size:15px" class="fas fa-plus"></i></button></h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"><i onclick="mostrarTarifasCMP('+key+');"  style="cursor:pointer;color: #0b4376;font-size:15px" class="pt-3 fas fa-info-circle"></i></h6></td>'+
			    		'</tr>';

	    			}
		    		posicion++;
		    		});
		    		d1.innerHTML = panelNuevo + '</tr>';
		    		
		    		var distintos = $("#cantDifCoberturas").val();
		    		var iguales = $("#cantIgualesCoberturas").val();
		    		
		    		$("#cantIgualesCoberturasLabel").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
		    		$("#cantDifCoberturasLabel").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");
		    		
		    		
	    	} catch (e) {
	    	 	mostrarError('No es posible realizar la comparacion de componentes. Por favor seleccione otro plan/promocion');
		    	$("#mensajeComponentes").css("display","");
	    		$("#panelComponentes").css("display","none");	
	    		}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	     	mostrarError('No es posible realizar la busqueda. Por favor seleccione otro plan y promocion');
	    	$("#mensajeComponentes").css("display","");
    		$("#panelComponentes").css("display","none");
    		},
	});
	
}
function quitarCeroIzq(dato){
	return parseInt(dato, 10);

}


function bienesCotiCMP(){
	bloquearPantallaGris();

	var cotizacionA	= $('#cotizacionActual').val();
	var certificado	= $('#valorCertificado').val();
	var ramo = '4';
	$.ajax({
	    url : 'bienModalCoti',
	    contentType: 'application/json', 
	    data : {  ramo : ramo , cotizacion : cotizacionA , consecutivo : certificado },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	
	    	try {
	    		
	    	var d1 = document.getElementById("selectorDatosParametricosCMPA");
    		var panelNuevo = "<option>Seleccione..</option>";
    		d1.innerHTML = ' ';
    		
    		$.each(json, function(key, value){
	    		panelNuevo =panelNuevo + '<option value='+json[key]['P_TF_BIENES_CRCI_CD_BIEN_ASEG']+'><h6>('+json[key]['P_TF_BIENES_CRCI_CD_BIEN_ASEG']+') '+validarCampoVacio(primeraLetraMayus(json[key]['P_TF_BIENES_INB_BIEN_ASEG'])) +'</h6></option>';
    			});	    		
    		d1.innerHTML =panelNuevo;
    		
	    	} catch (e) {
	    		// TODO: handle exception
	    	}
	    	
	    	$.unblockUI();
	    	
	    	
	    	$("#datosParametricosCMP").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
			});
	    	
	    	
	    },
		 
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('Code 4099 - Se ha producido un inconveniente al cargar el selector de bienes!.');

	    },
	 
	   
	});
    
	
}


function mostrarParametricosCMP(){
	bloquearPantallaGris();

 
		var select = document.getElementById('selectorDatosParametricosCMPA');
		var dato = select.options[select.selectedIndex].value;
		var cotizacionA	= $('#cotizacionActual').val();
		var cotizacionB	= $('#cotizacionNueva').val();
		var certificado	= $('#valorCertificado').val();
		$.ajax({
		    url : 'comparacionCotizacionParametricos',
		    contentType: 'application/json', 
		    data : {cotizacionA : cotizacionA, cotizacionB : cotizacionB , certificado : certificado ,bien:dato},
		    type : 'GET',
		    dataType : 'json',
		    success : function (json) {
		    	
		    	try {
		    		
		    		$("#mostrarTablaParametricos").css("display","");
		    		$("#mensajeDatosParametricos").css("display","none");
		    		var d1 = document.getElementById("tablaDatosParametricos");
			    	d1.innerHTML = ' ';
			    	var panelNuevo = '';
		    			$.each(json, function(key, value){
			    			if(value.length >1){
					    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
					    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">'+validarCampoVacio(primeraLetraMayus(value[0]['label']))+'</h6></td>'+
					    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoDato'])+'</h6></td>'+
					    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoParam(value[0]['codigoDato'],value[1]['codigoDato'])+'</h6></td>'+
					    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[1]['codigoDato'])+'</h6></td>'+
					    		'</tr>';
					    		
			    			}else if(value[0]['valor'] == 0){
			    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">'+validarCampoVacio(primeraLetraMayus(value[0]['label']))+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoDato'])+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoParam(value[0]['codigoDato'],'')+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio('')+'</h6></td>'+
			    				'</tr>';
			    			}else{
			    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">'+validarCampoVacio(primeraLetraMayus(value[0]['label']))+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio('')+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoParam(value[0]['codigoDato'],'')+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoDato'])+'</h6></td>'+
			    				'</tr>';
			    			}
			    		});
			    		d1.innerHTML = panelNuevo + '</tr>';
		    		
			    		
			    		
			    		var distintos = $("#cantDifParamCoberturas").val();
			    		var iguales = $("#cantIgualesParamCoberturas").val();
			    		
			    		$("#cantIgualParamLabel").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
			    		$("#cantDifParamLabel").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");
		    		
		    	
		    	} catch (e) {
		    		// TODO: handle exception
		    	}
		    	
		    	$.unblockUI();
		    },
			 
		    error: function (request, status, error) {
		    	$.unblockUI();
		    	mostrarError('Code 4099 - Se ha producido un inconveniente al cargar el selector de bienes!.');

		    },
		 
		   
		});
	    
		
	}
	
function cargarLabelTarifas(value){
	var panelNuevo = '';

	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Tarifa</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoTarifa'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['codigoTarifa'],value[1]['codigoTarifa'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[1]['codigoTarifa'])+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Suma</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['suma']))+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['suma'],value[1]['suma'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[1]['suma']))+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Prima</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['primaAcum']))+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['primaAcum'],value[1]['primaAcum'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[1]['primaAcum']))+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Fecha Act.</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearFechaJson(value[0]['feActu']))+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['feActu'],value[1]['feActu'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearFechaJson(value[1]['feActu']))+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Index</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['index'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['index'],value[1]['index'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[1]['index'])+'</h6></td>'+
	'</tr>';
	
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Secuencia</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['sequencia'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['sequencia'],value[1]['sequencia'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[1]['sequencia'])+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">---------</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
	'</tr>';
	
	
	
	return panelNuevo;
	
}


function cargarLabelPrimeraCoti(value){
	
	var vacio = '';
	var panelNuevo = '';	
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Tarifa</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoTarifa'])+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['codigoTarifa'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Suma</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['suma']))+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['suma'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Prima</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['primaAcum']))+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['primaAcum'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Fecha Act.</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearFechaJson(value[0]['feActu']))+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['feActu'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Index</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['index'])+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['index'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Secuencia</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['sequencia'])+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['sequencia'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">---------</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
		'</tr>';
		
		return panelNuevo;
		
	
}

function mostrarTarifas(tarifa){
	bloquearPantallaGris();
	
	if( $(".tarifa_"+tarifa+"").is(":visible") ){
		$(".tarifa_"+tarifa+"").each(function(){
			$(this).css("display","none");
		});
		$('#tarifaCabecera'+tarifa).css("background-color","white")
		$("#botonCollspan"+tarifa).removeClass("fas fa-caret-square-up");
		$("#botonCollspan"+tarifa).addClass("fas fa-caret-square-down");
	}else{
		$(".tarifa_"+tarifa+"").each(function(){
			$(this).css("display","");
		});
		$(".tarifa_"+tarifa+"").each(function(){
			$(this).css("background-color","#dfdfdf");
		});
		$('#tarifaCabecera'+tarifa).css("background-color","#dfdfdf")
		$("#botonCollspan"+tarifa).removeClass("fas fa-caret-square-down");
		$("#botonCollspan"+tarifa).addClass("fas fa-caret-square-up");
	}
	$.unblockUI();

}


function cargarLabelSegundaCoti(value){
	
	var vacio = '';
	var panelNuevo = '';
	var ocultar = "'"+value[0]['codigoTarifa']+"'";
	var tarifa = value[0]['codigoTarifa'];
		panelNuevo = panelNuevo +'<tr class="tr-grilla" id="tarifaCabecera'+tarifa+'" style="cursor:pointer;" onclick="mostrarTarifas('+ocultar+');">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Tarifa</h6><i class="fas fa-caret-square-down" id="botonCollspan'+tarifa+'" style="color:#0b4376!important"></i></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400"></h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoTarifa'])+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Suma</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['suma'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['suma']))+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Prima</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['primaAcum'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['primaAcum']))+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Fecha Act.</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['feActu'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearFechaJson(value[0]['feActu']))+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Index</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['index'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['index'])+'</h6></td>'+
		'</tr>';
		
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Secuencia</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['sequencia'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['sequencia'])+'</h6></td>'+
		'</tr>';
		
		return panelNuevo;
		
	
}



function mostrarTarifasCMP(cobertura){
	bloquearPantallaGris();
	var select = document.getElementById('selectorPlanesPromocionCMP');
	var valorSelect = select.options[select.selectedIndex].value;
	var plan = valorSelect.split("_")[0];
	var promo = valorSelect.split("_")[1];
	var certificado = valorSelect.split("_")[2];
	var cotizacionA	= $('#cotizacionActual').val();
	var cotizacionB	= $('#cotizacionNueva').val();
	var certificado	= $('#valorCertificado').val();
		$.ajax({
		    url : 'comparacionCotizacionTarifas',
		    contentType: 'application/json', 
		    data : {cotizacionA : cotizacionA, cotizacionB : cotizacionB , certificado : certificado ,promo:promo,cobertura:cobertura,plan:plan},
		    type : 'GET',
		    dataType : 'json',
		    success : function (json) {
		    	
		    	try {
		    		
		    		if(Object.keys(json).length != 0){
		    		
		    		$("#cantDifTarifas").val(0);
		    		$("#cantIgualesTarifas").val(0);
		    		
		    		
		    		var d1 = document.getElementById("tablaDatosTarifas");
			    	d1.innerHTML = ' ';
			    	var labels;
			    	var panelNuevo = '';
		    			$.each(json, function(key, value){
		    				if(value.length >1){
		    					labels = cargarLabelTarifas(value);
		    					panelNuevo = panelNuevo + labels;
							}else if(value[0]['valor'] == 0){
								labels = cargarLabelPrimeraCoti(value);
		    					panelNuevo = panelNuevo + labels;
							}else{
								labels = cargarLabelSegundaCoti(value);
		    					panelNuevo = panelNuevo + labels;
							}
		    						    			
		    			});
			    		d1.innerHTML = panelNuevo + '</tr>';

			    		
			    		
			    		var distintos = $("#cantDifTarifas").val();
			    		var iguales = $("#cantIgualesTarifas").val();
			    		
			    		$("#cantIgualesDetalleTarifasLabel").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
			    		$("#cantDifDetalleTarifasLabel").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");
		    		
			    		
			    		
			    		$("#datosTarifasCMP").modal({
							 escapeClose: false,
							  clickClose: false,
							  showClose: false,
							  fadeDuration: 400,
							  fadeDelay: 0.05
						});
			    		
		    		}else{
				    	mostrarError('No se encuentran tarifas para la cobertura seleccionada.');

		    		}
			    		
		    	} catch (e) {
		    		// TODO: handle exception
		    	}
		    	
		    	$.unblockUI();
		    },
			 
		    error: function (request, status, error) {
		    	$.unblockUI();
		    	mostrarError('Code 4099 - Se ha producido un inconveniente al cargar el selector de bienes!.');

		    },
		 
		   
		});
	    
		
	}












	



function mostrarIconoParam(tasaA,tasaB){
	var distintos = $("#cantDifParamCoberturas").val();
	var iguales = $("#cantIgualesParamCoberturas").val();
	if(tasaA ==tasaB){
		iguales++;
		$("#cantIgualesParamCoberturas").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosParam' style='color:green;'></i>";
	}else{
		distintos++;
		$("#cantDifParamCoberturas").val(distintos);
		return "<i class='fas fa-not-equal iconoDiferenciasDatosParam' style='color:red;'></i>";
	}
}




function mostrarIconoTarifas(tasaA,tasaB){
	var distintos = $("#cantDifTarifas").val();
	var iguales = $("#cantIgualesTarifas").val();
	if(tasaA ==tasaB){
		iguales++;
		$("#cantIgualesTarifas").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosTarifas' style='color:green;'></i>";
	}else{
		distintos++;
		$("#cantDifTarifas").val(distintos);
		return "<i class='fas fa-not-equal iconoDiferenciasDatosTarifas' style='color:red;'></i>";
	}
}





function mostrarDetalleCoberturas(posicion,dato){
	$("#cantDifDetalleCoberturas").val(0);
	$("#cantIgualesDetalleCoberturas").val(0);
	var datos = $("#datosObjCoberturas").val();
	datos = JSON.parse(datos);
	var valorA=0;
	var valorB=1;
	var d1 = document.getElementById("datosDetalleCoberturaCMP");
	d1.innerHTML = ' ';
	var panelNuevo = '';
	
	bloquearPantallaGris();
	$.each(datos, function(key, value){

	if(key == posicion){
		for(var key2 in datos[key][valorA]){
			valorA =  datos[key][dato][key2];
	 		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400">'+validarCampoVacioNull(primeraLetraMayus(key2))+'</h6></td>'+
			'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+validarCampoVacioNull(valorA)+'</h6></td>'+
			'</tr>';
			};
			d1.innerHTML = panelNuevo + '</tr>';
			$("#titulo_detalle_cobertura").html("<h4 style='border:none;'>Detalle de la Cobertura "+primeraLetraMayus(datos[key][dato]["descripcion"])+"</h4>")
		}
	});

	
	$("#detalleCoberturaModal").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
	});
	
	
	$.unblockUI();


}



function mostrarIconoCoberturas(tasaA,tasaB){
	var distintos = $("#cantDifCoberturas").val();
	var iguales = $("#cantIgualesCoberturas").val();
	if(tasaA ==tasaB){
		iguales++;
		$("#cantIgualesCoberturas").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosCoberturas' style='color:green;'></i>";
	}else{
		distintos++;
		$("#cantDifCoberturas").val(distintos);
		return "<i class='fas fa-not-equal iconoDiferenciasDatosCoberturas' style='color:red;'></i>";
	}
}

function mostrarIconoComponentes(tasaA,montoA,tasaB,montoB){
	var distintos = $("#cantDifComponentes").val();
	var iguales = $("#cantIgualesComponentes").val();
	if(tasaA.trim() ==tasaB.trim() && tasaA.trim() == tasaB.trim()){
		iguales++;
		$("#cantIgualesComponentes").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosComponentes' style='color:green;'></i>";
	}else{
		distintos++;
		$("#cantDifComponentes").val(distintos);
		return "<i class='fas fa-not-equal iconoDiferenciasDatosComponentes' style='color:red;'></i>";
	}
}

function realizarComparacionCotizacion(certificado){
	
	//obtengo las coti
	var cotizacionA	= $('#cotizacionActual').val();
	var cotizacionB	= $('#cotizacionNueva').val();
	$('.cotizacionB').html(cotizacionB).css("color","black");
	$('#valorCertificado').val(certificado);
	$('.cotizacionA').html(cotizacionA).css("color","black");
	
	
	$("#mostrarTablaParametricos").css("display","none");
	$("#mensajeDatosParametricos").css("display","");
	
	$.ajax({
	    url : '/PSPES/cantidadCertificados',
	    contentType: 'application/json', 
	    data : { cotizacion : cotizacionA},
	    type : 'GET',
	    dataType : 'json',
	    success : function (jsonA) {
	    	try {
	    		bloquearPantallaGris();

		    		$.ajax({
		    		    url : '/PSPES/cantidadCertificados',
		    		    contentType: 'application/json', 
		    		    data : { cotizacion : cotizacionB},
		    		    type : 'GET',
		    		    dataType : 'json',
		    		    success : function (json) {
		    		    	try {

		    		    		var cantidadCertificadosA = jsonA.length;
		    			    		
		    		    		var cantidadCertificadosB = json.length;
		    		    		
		    		    		cargarCertificadosCotizaciones(cantidadCertificadosA,cotizacionA,cantidadCertificadosB,cotizacionB);
		    		    		compararCotizaciones(certificado);
		    		    		cargarSelectorPlanes(cotizacionA,cotizacionB,certificado);
		    		    		
		    		    		$("#datosCabecera").css("display","");
		    		    		
		    		    		$("#panelBCertificadosCMP").css("display","");
		    		    		$("#mensajePanelCertificado").css("display","none");
		    		    		
		    		    		
		    		    		
		    		    		
		    		    		$("#mensajeComponentes").css("display","");
		    		    		$("#panelComponentes").css("display","none");
		    		    		
		    		    		
		    		    	} catch (e) {
		    		    		mostrarError('Code 465 : No se pudo cargar los certiciados');
		    		    	}
		    		    },
		    		    error: function (request, status, error) {
		    		    	$.unblockUI();
		    			    	mostrarError('Code 469 - Se ha producido un inconveniente al cargar los certificados!');
		    		    },
		    		});
		    		
		    	$.unblockUI();

	    	} catch (e) {
	    		mostrarError('Code 465 : No se pudo cargar los certiciados');
	    	}
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
		    	mostrarError('Code 469 - Se ha producido un inconveniente al cargar los certificados!');
	    },
	});
	
}


function cargarCertificadosCotizaciones(cantidadA,cotiA,cantidadB,cotiB){
	var tam = 0;
	var menor = 0;
	var cartificadoMayor = 0;
	var cartificadoMenor = 0;
	var cotiMayor = 0;
	var cotiMenor = 0
	if(cantidadA >= cantidadB){
		tam = cantidadA;
		menor = cantidadB;
		cartificadoMayor = "Cotizaci&oacute;n A";
		cartificadoMenor = "Cotizaci&oacute;n B";
		cotiMayor= cotiA;
		cotiMenor= cotiB;
		
	}else{
		tam = cantidadB;
		menor = cantidadA;
		cartificadoMayor = "Cotizaci&oacute;n B";
		cartificadoMenor = "Cotizaci&oacute;n A";
		cotiMayor = cotiB;
		cotiMenor = cotiA;
	}
	
	var d1 = document.getElementById("panelBCertificadosCMP");
	d1.innerHTML = ' ';
	var panelNuevo = '';
	
	for(var int =0;int<tam;int++){
		panelNuevo=panelNuevo + '<div style="cursor:pointer; background-color:#ffffff">'+
	    '<div class="timeline__post seleccionPanelB" onclick="realizarComparacionCotizacion('+int+');" id="certificadoCotizacionComparacion'+int+'" style="cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px">'+
	        '<div class="timeline__content" style="overflow:hidden;">'+
	            '<i class="material-icons altoIcono"  style="color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;">note</i>'+
	            '<h6>'+
	                '<b>Certificado : '+int+'</b>'+
	            '</h6>'+
	            '<h6 style="padding-top:3px;font-weight:400">'+
	            	cartificadoMayor+" : "+ cotiMayor +
	            '</h6>'+
	            '<h6 style="padding-top:3px;font-weight:400" id="iconoCertificadoMenor'+int+'"> '+
            	cartificadoMenor+" : -" +
            	'</h6>'+
	        '</div>'+
	    '</div>'+
	'</div>';
	}
	d1.innerHTML = panelNuevo;

	for(var int =0;int<menor;int++){
	$('#iconoCertificadoMenor'+int).html(cartificadoMenor+" : "+ cotiMenor);
	}



}

function cargarListarCertificadosCoti(cotizacion,id){
	bloquearPantallaGris();

	$.ajax({
	    url : '/PSPES/cantidadCertificados',
	    contentType: 'application/json', 
	    data : { cotizacion : cotizacion},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
		    		$('#'+id).val(json.length);
	    	} catch (e) {
	    		mostrarError('Code 465 : No se pudo cargar los certiciados');
	    	}
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
		    	mostrarError('Code 469 - Se ha producido un inconveniente al cargar los certificados!');
	    },
	});
}


function compararCotizaciones(certificado){

bloquearPantallaGris();
	
var cotizacionA	= $('#cotizacionActual').val();
var cotizacionB	= $('#cotizacionNueva').val();


$.ajax({
    url : '/PSPES/comparacionCotizacion',
    contentType: 'application/json', 
    data : { cotizacionA : cotizacionA , cotizacionB : cotizacionB, certificado :certificado },
    type : 'GET',
    dataType : 'json',
    success : function (json) {
    	try {
    		
    	$("#valoresDistintosCabecera").val("0");
    	$("#valoresIgualesCabecera").val("0");
    		
    		var d1 = document.getElementById("tablaComparacionCabecera");
	    	d1.innerHTML = ' ';
	    	var panelNuevo = '';
	    	
	    		for ( var int = 0; int < json.length ; int++) {
	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	    		'<td  role="cell"><h6 style="text-align:right;font-weight:400">'+validarCampoVacio((json[int]['etiqueda']))+'</h6></td>'+
	    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((json[int]['valorDatoA']))+'</h6></td>'+
	    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+resultadoComparacion(json[int]['resultadoDeLaComparacion'])+'</h6></td>'+
	    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(json[int]['valorDatoB'])+'</h6></td>'+
	    		'</tr>';
	    		}
	    		d1.innerHTML = panelNuevo + '</tr>';
	    		
	    		var distintos = $("#valoresDistintosCabecera").val();
	    		var iguales = $("#valoresIgualesCabecera").val();
	    		
	    		$("#cantIgualesCabecera").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
	    		$("#cantDifCabecera").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");

	    		$("#certificadoCotizacionComparacion"+certificado).css("background-color","#bac2bb");
	    		
    	} catch (e) {
    		mostrarError('Code 465 : No se pudo cargar los planes');
    	}
    	$.unblockUI();
    },
    error: function (request, status, error) {
    	$.unblockUI();
	    	mostrarError('Code 469 - Se ha producido un inconveniente al obtener los planes de la cotizacion!');

    },
   
});

}

function mostrarDeferenciasCabecera(dato,label){
	bloquearPantallaGris();	
	var padreIcono=$("."+dato).parent().closest('tr');
	if( padreIcono.is(":visible") ){
		padreIcono.css("display","none");
		$("#"+label).append("<i class='fas fa-check' id='remover_"+label+"'></i>");
	}else{
		padreIcono.css("display","");
		$("#remover_"+label).remove();

	}
	$.unblockUI();

}


function resultadoComparacion(valor){
	var distintos = $("#valoresDistintosCabecera").val();
	var iguales = $("#valoresIgualesCabecera").val();
	if(valor){
		iguales++;
		$("#valoresIgualesCabecera").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosCabecera' style='color:green;'></i>";
		
	}else{
		distintos++;
		$("#valoresDistintosCabecera").val(distintos);
		return "<i class='fas fa-not-equal iconoDistintosDatosCabecera' style='color:red;'></i>";
	}
	
}function buscarPlanesConfiguracionVisualizacion(idTablaParametricos){
	
	input = document.getElementById("inputPlanesConfiguracion");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function buscarDatoPanelCConfiguracionVisualizacion(idTablaParametricos){
	
	input = document.getElementById("inputDatoPanelCConfiguracion");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function mostrarBusquedaConfigVisualizaciones(id,btn){
	bloquearPantallaGris();
	$(".ocultarSeccion").each(function(){
		    $(this).css("display","none");
			});
	$("#"+id).css("display","");
	
	$(".fondoBoton").each(function(){
	    $(this).css("background-color","#7a7a7a");
		});
	$("#"+btn).css("background-color","#0b4376");
	
	$("#selectorPlanesProductosEsquema").css("display","none");
	$("#inputDatoPanelCConfiguracion").css("display","");
	
	
	var d1 = document.getElementById("panelEsquemas");
	d1.innerHTML = ' ';
	var  panelNuevo='Realice una b&uacute;squeda';
	d1.innerHTML = panelNuevo;
	$("#tablaPanelC").css("display","none");
	$("#textoInicialPanelC").css("display","");
	
	if(btn.trim() == 'btnPlanes'.trim()){
		planesConfigVisualizacion();
	}
	
	if(btn.trim() == 'btnPromo'.trim()){
		mostrarPanelBPromociones();
	}else{
	    $.unblockUI();
	}

}
function buscarDatosPanelBRoles(){
	bloquearPantallaGris();
	 $.ajax({
	    url : '/PSPES/datosRamosConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$("#tablaPanelC").css("display","none");
	    		$("#textoInicialPanelC").css("display","");
	    		$("#datoTituloPanelB").text("Ramos");
	    		
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	    		
		    	for ( var int = 0; int < json.length ; int++) {
		    		var id='"ramosRoles'+json[int]['P_TF_CARP_CARP_CD_RAMO']+'"';
		    		var ramos='"'+json[int]['P_TF_CARP_CARP_CD_RAMO']+'"';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='mostrarPanelCRoles("+id+","+ramos+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'>"+json[int]['P_TF_CARP_CARP_CD_RAMO']+" - "+json[int]['P_TF_CARP_CARP_DE_RAMO']+"</h6>"
		    								+"</div>"
		    								+"</div>";
		    		}
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    		
	    	}
	    	
	    	},
	    error : function(xhr, status) {

	    	var d1 = document.getElementById("panelEsquemas");
	    	d1.innerHTML = ' ';
	    	var  panelNuevo='Realice una b&uacute;squeda';
	    	d1.innerHTML = panelNuevo;
	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron planes para el ramo seleccionado.');
	    },
	 
	   
	});

};



function mostrarPanelBPromociones(){
	
	bloquearPantallaGris();

	 $.ajax({
	    url : 'datosPromocionesContenido',
	    contentType: 'application/json', 
	    data : {},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$("#tablaPanelC").css("display","none");
    	    	$("#textoInicialPanelC").css("display","");
	    		$("#datoTituloPanelB").text("Promociones ("+json.length+")");

	    		
		    	$("#datosObjPromociones").val(JSON.stringify(json));

		    	$("#selectorPlanesProductosEsquema").css("display","none");
		    	$("#inputDatoPanelCConfiguracion").css("display","");
	    		
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	    		
		    	for ( var int = 0; int < json.length ; int++) {
		    		var id='"'+json[int]['P_TF_CROT_CROT_CRTB_CD_PROMOCION']+'"';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='mostrarPanelCPromociones("+id+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'>"+json[int]['P_TF_CROT_CROT_CRTB_CD_PROMOCION']+" - "+json[int]['P_TF_CROT_CROT_DE_PROMOCION']+"</h6>"
		    								+"</div>"
		    								+"</div>";
		    		}
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    		
	    	}
	    	
	    	},
	    error : function(xhr, status) {

	    	var d1 = document.getElementById("panelEsquemas");
	    	d1.innerHTML = ' ';
	    	var  panelNuevo='Realice una b&uacute;squeda';
	    	d1.innerHTML = panelNuevo;
	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron planes para el ramo seleccionado.');
	    },
	 
	   
	});

};


function mostrarPanelCPromociones(id){
	bloquearPantallaGris();
	
	var datos = $("#datosObjPromociones").val();
	datos = JSON.parse(datos);

	$(".seleccionPanelB").each(function(){
		    $(this).css("background","white");
		});
	$(".timeline__date").each(function(){
		    $(this).css("background","white");
		});

	$('#'+id).css("background","#bac2bb");

	var d1 = document.getElementById("tablaConfiguVisualizacion");
	d1.innerHTML = ' ';
	var panelNuevo = ' ';

	cambiarEncabezadoTabla(2);

	for ( var int = 0; int < datos.length ; int++) {
		if(id.trim() == datos[int]['P_TF_CROT_CROT_CRTB_CD_PROMOCION'].trim())
		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(datos[int]['P_TF_CROT_CROT_CRTB_CD_PROMOCION']) +'</h6></td>'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(datos[int]['P_TF_CROT_CROT_DE_PROMOCION'])) +'</h6></td>'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(datos[int]['P_TF_CROT_CROT_DE_CONTENIDO'])) +'</h6></td>'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(datos[int]['P_TF_CROT_CROT_CAUS_CD_USUARIO'])) +'</h6></td>'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(datos[int]['P_TF_CROT_CROT_FE_ACTUALIZACION'])) +'</h6></td>'+
	    '</tr>';
	}
	d1.innerHTML = panelNuevo + '</tr>';

	$("#tablaPanelC").css("display","");
	$("#textoInicialPanelC").css("display","none");


	$.unblockUI();
	
	
	
}
	

function mostrarPanelBPlanesConfiguracionVisualizacion(json){
	
	$("#valorTexto").html("Planes");
	var datosJson = json;
	$("#tablaPanelC").css("display","none");
	$("#textoInicialPanelC").css("display","");
	
	$("#datoTituloPanelB").text("Ramos")

	var d1 = document.getElementById("panelEsquemas");
	d1.innerHTML = ' ';
	var panelNuevo ='';
	panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	


	for ( var int = 0; int < json.length ; int++) {
		var valor='"'+json[int]['P_TF_CARP_CARP_CD_RAMO']+'"';
		id ='"ramo_'+json[int]['P_TF_CARP_CARP_CD_RAMO']+'"'
		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='cargarSelectorProductosPlanes("+valor+","+id+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
								+"<h6 style='text-align:left;'><b>"+validarCampoVacio(json[int]['P_TF_CARP_CARP_CD_RAMO'])+" - "+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CARP_CARP_DE_RAMO']))+"</b></h6>"
								+"</div>"
								+"</div>";
		}
	d1.innerHTML = panelNuevo;
	
	
	
	
}



function cargarValoresPorDefaultPanelB(){
	bloquearPantallaGris();
	var select = document.getElementById('selectorValoresDefaultConfigVisualOrigen');
	var origen = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectRamosValoresDefaultConfigVisual');
	var ramo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectorProdValoresDefaultConfiguracion');
	var producto = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectorValoresDefaultFormularioConfigVisual');
	var formulario = select.options[select.selectedIndex].value;
	
	var auxiliar = $("#inputAuxiliarValoresDefault").val();
	
	 $.ajax({
	    url : 'valoresDefaultConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {origen:origen,ramo:ramo,producto:producto,formulario:formulario,auxiliar:auxiliar},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$("#tablaPanelC").css("display","none");
	    		$("#textoInicialPanelC").css("display","");
	    		$("#datoTituloPanelB").text("Valores Default ("+json.length+")");
	    		
		    	$("#datosObjPromociones").val(JSON.stringify(json));

		    	$("#selectorPlanesProductosEsquema").css("display","none");
		    	$("#inputDatoPanelCConfiguracion").css("display","");
	    		
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = '';
		    	var panelNuevo ='';
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	    		
		    	for ( var int = 0; int < json.length ; int++) {
		    		var id='"'+json[int]['P_TF_GANA_GANA_NU_CAMPO']+'"';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='mostrarPanelCValoresDefault("+id+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'>"+json[int]['P_TF_GANA_GANA_NU_CAMPO']+" - "+json[int]['P_TF_GANA_GANA_DE_CAMPO']+"</h6>"
		    								+"</div>"
		    								+"</div>";
		    		}
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    		
	    	}
	    	
	    	},
	    error : function(xhr, status) {

	    	var d1 = document.getElementById("panelEsquemas");
	    	d1.innerHTML = ' ';
	    	var  panelNuevo='Realice una b&uacute;squeda';
	    	d1.innerHTML = panelNuevo;
	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron planes para el ramo seleccionado.');
	    },
	 
	   
	});

};


function mostrarPanelCValoresDefault(valor){
	bloquearPantallaGris();
	
	$(".seleccionPanelB").each(function(){
 	    $(this).css("background","white");
 	});
	$(".timeline__date").each(function(){
 	    $(this).css("background","white");
 	});
	
	$('#'+valor).css("background","#bac2bb");
	
	$("#tablaPanelC").css("display","");
	$("#textoInicialPanelC").css("display","none");
	
	cambiarEncabezadoTabla(4);
	
	var d1 = document.getElementById("tablaConfiguVisualizacion");
	d1.innerHTML = ' ';
	var datos = $("#datosObjPromociones").val();
	json = JSON.parse(datos);
	var panelNuevo="";
	for ( var int = 0; int < json.length ; int++) {
		if(valor == json[int]["P_TF_GANA_GANA_NU_CAMPO"]){
			panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_GANA_GANA_NU_CAMPO']) +' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_GANA_GANA_DE_CAMPO']))+'</h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio((json[int]['P_TF_GANA_GANA_DE_VALOR_DEFAULT'])) +'</h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_GANA_GANA_IN_VISUALIZACION'])+'</h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_GANA_GANA_NU_RUTINA'])+' </h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_GANA_GANA_CAUS_CD_USUARIO'])+' </h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_GANA_GANA_FE_ACTUALIZACION']))+' </h6></td>'+
		    '</tr>';
		}
	}
	d1.innerHTML =panelNuevo;
	$.unblockUI();

	
}


function cargarSelectorProductosPlanes(valor,id){
	bloquearPantallaGris();

	 $.ajax({
	    url : 'datosPlanesConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {ramo:valor},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$(".seleccionPanelB").each(function(){
				    $(this).css("background","white");
				});
			$(".timeline__date").each(function(){
				    $(this).css("background","white");
				});
			
			$('#'+id).css("background","#bac2bb");
			
	    	$('#labelPanelC').html('Productos');
	    	$("#selectorPlanesProductosEsquema").css("display","");
	    	$("#inputDatoPanelCConfiguracion").css("display","none");
	    	
	    	json = eliminarObjetosDuplicados(json, 'P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION');
	    	
	    	var d1 = document.getElementById("selectorPlanesProductosEsquema");
	    	d1.innerHTML = ' ';
	    	var panelNuevo="<option>Selecione..</option>";
	    	for ( var int = 0; int < json.length ; int++) {
	    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION']+'_'+valor+'"><h6>('+json[int]['P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION']+')&nbsp;'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRP_CPP_DE_ESQ_VISUALIZACION'])) +'</h6></option>';
	    	}
	    	d1.innerHTML =panelNuevo;
	    	
	    	}catch(e)
	    	{
		    	mostrarError('Error al cargar los productos de los ramos',e);
	    	}
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {

	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron productos para el ramo seleccionado.');
	    },
	 
	   
	});

};
	


function cambiarEncabezadoTabla(valor){
	//valor 0 d.generales y param
	//1 planes
	// 2 promos
	//valor 3 roles del producto
	if(valor == 0){
		$('#datoCabecera1').text('Visualizacion');
		$('#datoCabecera2').text('Tabla');
		$('#datoCabecera3').text('Dominio');
		$('#datoCabecera4').text('Clave');
		$('#datoCabecera5').text('Fe. Alta');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('Usr. Alta');
		$('#columnaDatoCabecera7').css('display','');
		$('#datoCabecera7').text('Fe. Mod');
		$('#columnaDatoCabecera8').css('display','');
		$('#datoCabecera8').text('Usr. Mod');

	}
	if(valor == 1){
		$('#datoCabecera1').text('Ramo');
		$('#datoCabecera2').text('Producto');
		$('#datoCabecera3').text('Plan');
		$('#datoCabecera4').text('Esquema');
		$('#datoCabecera4').text('Visualizacion')
		$('#datoCabecera5').text('Usuario');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('Fe. Actualizacion');
		$('#columnaDatoCabecera7').css('display','none');
		$('#columnaDatoCabecera8').css('display','none');

	}
	if(valor == 2){
		$('#datoCabecera1').text('Codigo');
		$('#datoCabecera2').text('Descripcion');
		$('#datoCabecera3').text('Contenido');
		$('#datoCabecera4').text('Usuario');
		$('#datoCabecera5').text('Fe. Actualizacion');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('');
		$('#columnaDatoCabecera7').css('display','none');
		$('#columnaDatoCabecera8').css('display','none');

		
	}if(valor == 3){
		$('#datoCabecera1').text('Cod. Prod');
		$('#datoCabecera2').text('Producto');
		$('#datoCabecera3').text('Prod. Estado');
		$('#datoCabecera4').text('Esq. Visualizacion');
		$('#datoCabecera5').text('Esquema');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('');
		$('#columnaDatoCabecera7').css('display','none');
		$('#columnaDatoCabecera8').css('display','none');

	}if(valor == 4){
		$('#datoCabecera1').text('Campo');
		$('#datoCabecera2').text('Default');
		$('#datoCabecera3').text('Visualizacion');
		$('#datoCabecera4').text('Rutina');
		$('#datoCabecera5').text('Usuario');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('Fecha Act.');
		$('#columnaDatoCabecera7').css('display','none');
		$('#columnaDatoCabecera8').css('display','none');

	}
}
function mostrarPanelCRoles(id,ramos){
bloquearPantallaGris();
var select = document.getElementById('selectorOrigenDatosRoles');
var valorSelectOrigen = select.options[select.selectedIndex].value;

var select = document.getElementById('selectorEsquemaDatosRolesRoles');
var valorSelectRoles = select.options[select.selectedIndex].value;


 $.ajax({
    url : 'datosEsquemaGrillaProductoConfigVisualizacion',
    contentType: 'application/json', 
    data : {ramos:ramos,origen:valorSelectOrigen,rol:valorSelectRoles},
    type : 'GET',
    dataType : 'json',
    success : function(json) {
    	try{
	    	$(".seleccionPanelB").each(function(){
	    	    $(this).css("background","white");
	    	});
	    	$(".timeline__date").each(function(){
	    	    $(this).css("background","white");
	    	});
	    	$('#'+id).css("background","#bac2bb");
	    	$('#labelPanelC').html('Productos');
	
	    	$("#datosObjPromociones").val(JSON.stringify(json));
	    	
	    	$("#selectorPlanesProductosEsquema").css("display","none");
	    	$("#inputDatoPanelCConfiguracion").css("display","");
	    	
	    	cambiarEncabezadoTabla(3);
	
	    	var d1 = document.getElementById("tablaConfiguVisualizacion");
	    	d1.innerHTML = ' ';
	    	var panelNuevo = ' ';
	    	
	    	for ( var int = 0; int < json.length ; int++) {
	    		var producto ="'"+json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO']+"'";
	    		var esq1 ="'"+json[int]['P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION']+"'";
	    		var esq2 ="'"+json[int]['P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION']+"'";
	    		
	    		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO'])+'</h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAPU_CAPU_DE_PRODUCTO'])) +'</h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(json[int]['P_TF_CAPU_CAPU_ST_PRODUCTO'])+'</h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(json[int]['P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION'])+' </h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(json[int]['P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION'])+'</h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6 style="cursor:pointer;" onclick="mostrarDetalleProductosRoles('+producto+','+esq1+','+esq2+');"><i style="cursor:pointer;font-size:14px;" class="fas fa-eye"></i></h6></td>'+
	    	    '</tr>';
	    		
	    	}
	    	d1.innerHTML = panelNuevo + '</tr>';
	
	    	$("#tablaPanelC").css("display","");
	    	$("#textoInicialPanelC").css("display","none");
	
	    	$.unblockUI();
    		
    	}catch(e)
    	{
	    	mostrarError('Error al cargar los planes',e);
    	}
    	$.unblockUI();
    	},
    error : function(xhr, status) {
    	$(".seleccionPanelB").each(function(){
    	    $(this).css("background","white");
    	});
    	$(".timeline__date").each(function(){
    	    $(this).css("background","white");
    	});
    	$("#tablaPanelC").css("display","none");
    	$("#textoInicialPanelC").css("display","");
    	mostrarError('No se encontraron productos para el ramo seleccionado.');
    },
 });
};


function mostrarDetalleProductosRoles(producto,esq1,esq2){

	bloquearPantallaGris();

	var datos = $("#datosObjPromociones").val();
	json = JSON.parse(datos);
	
	for ( var int = 0; int < json.length ; int++) {
		if(producto == json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"] && esq1 == json[int]["P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION"] && esq2 == json[int]["P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION"]){
			$("#P_TF_CAPU_CAPU_CD_PRODUCTO").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO']))+" </b>");
			$("#P_TF_CAPU_CAPU_DE_PRODUCTO").html("<b> " +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAPU_CAPU_DE_PRODUCTO']))+" </b>");
			$("#P_TF_CAPU_CAPU_FE_INICIO").html("<b> " +validarCampoVacio(formatearFechaJson(json[int]['P_TF_CAPU_CAPU_FE_INICIO']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_BENEFICIARIOS").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_BENEFICIARIOS']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_DIRECCION").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_DIRECCION']))+" </b>");
			$("#P_TF_CAPU_CAPU_IN_CERRADO").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CAPU_IN_CERRADO']))+" </b>");
			$("#P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION']))+" </b>");
			$("#P_TF_CAPU_CAPU_CARP_CD_RAMO").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CAPU_CARP_CD_RAMO']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_NOMINA").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_NOMINA']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_LISTAS_BIENES").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_LISTAS_BIENES']))+" </b>");
			$("#P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_COBERTURAS").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_COBERTURAS']))+" </b>");
			$("#titulo_productos_roles").html("Detale del Producto " +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAPU_CAPU_DE_PRODUCTO']))+"");
			
		}
	}
	
	
	$("#detalleRolesProductosPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
	});
	
	$.unblockUI();

	
}

function MostrarPanelCPlanesConfiguracionVisualizacion(){
	bloquearPantallaGris();

	var select = document.getElementById('selectorPlanesProductosEsquema');
	var valorSelect = select.options[select.selectedIndex].value;
	
	var producto = valorSelect.split("_")[0];
	var ramo = valorSelect.split("_")[1];
	
	 $.ajax({
	    url : 'datosPlanesConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {ramo:ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
				
				var d1 = document.getElementById("tablaConfiguVisualizacion");
				d1.innerHTML = ' ';
				var panelNuevo = ' ';
				
				cambiarEncabezadoTabla(1);
				
				for ( var int = 0; int < json.length ; int++) {
					if(producto.trim() == json[int]['P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION'].trim()){
						panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_PRP_PRP_CARP_CD_RAMO']) +' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRP_CARP_DE_RAMO']))+'</h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_PRP_PRP_CAPU_CD_PRODUCTO']) +' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRP_CAPU_DE_PRODUCTO'])) +'</h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_PRP_PRP_CAPB_CD_PLAN']) +' - '+primeraLetraMayus(validarCampoVacio(json[int]['P_TF_PRP_CAPB_DE_PLAN'])) +' </h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION']) +' - '+primeraLetraMayus(validarCampoVacio(json[int]['P_TF_PRP_CPP_DE_ESQ_VISUALIZACION'])) +' </h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRP_PRP_CAUS_CD_USUARIO'])) +'</h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PRP_PRP_FE_ACTUALIZACION'])) +'</h6></td>'+
					    '</tr>';
					}
				}
				d1.innerHTML = panelNuevo + '</tr>';
				
				$("#tablaPanelC").css("display","");
				$("#textoInicialPanelC").css("display","none");
	    	}catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    	}
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {

	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron productos para el ramo seleccionado.');
	    },
	 
	   
	});

};


function planesConfigVisualizacion(valor){
	bloquearPantallaGris();

	 $.ajax({
	    url : 'datosRamosConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		mostrarPanelBPlanesConfiguracionVisualizacion(json);
	    	}catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    	}
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {
	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron ramos.');
	    },
	 
	   
	});

};


function inicioConfigVisualizacion(){
	$( ".cerrarModalBotonHoover" ).trigger( "click" );
	$('[data-toggle="tooltip"]').tooltip();
	$(document).ready(function(){
	    $('select').formSelect();
	  });
	
}


function buscarEsquemasPanelB(){
	bloquearPantallaGris();
	var select = document.getElementById('valorEsquemaDatos');
	var valorSelect = select.options[select.selectedIndex].value;

}

function buscadorPanelParamGrales() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("filtroPanelBConfiguracionVisualizacion");
	  filter = input.value.toUpperCase();
	
	  $(".FiltroConfiguracionVisualizacion").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("cardConfiguracionVisualizacion", "FiltroCongVisualizacion");
		  var idCardParteB = idH6.replace("cardConfiguracionVisualizacion", "FiltroCongVisualizacion");
		  
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

function selecionarEsquemasConfigVisualizacion(){
	bloquearPantallaGris();
	var select = document.getElementById('selectRamosConfigVisual');
	var valorSelect = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectorProdConfiguracion');
	var valorSelectProd = select.options[select.selectedIndex].value;
	
	$.ajax({
	    url : 'datosEsquemaConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {ramo:valorSelect,producto:valorSelectProd} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    		var d2 = document.getElementById("selectorEsquemaConfiguracionVisualizacion");
	    		
		    	d2.innerHTML= '';
		    	var panelNuevo = '';
	    		panelNuevo = panelNuevo + '<option value=""><h6>Seleccione..</h6></option>';

		    	for ( var int = 0; int < json.length ; int++) {
		    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_CPP_CPP_CD_ESQ_VISUALIZACION']+'"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CPP_CPP_CD_ESQ_VISUALIZACION']))+' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CPP_CPP_DE_ESQ_VISUALIZACION']))+'</h6></option>';
		    	}
		    	
		    	d2.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	
	    	}
	    catch(e){
	    		alert('Error (5467) generado por : '+e);
	    	}
	    $.unblockUI();
	},
    error : function(xhr, status) {
    	mostrarError(xhr['responseText']);
	    $.unblockUI();

    }
});
}



function buscarDatosPanelBDatosGenerales(){
	bloquearPantallaGris();
	var select = document.getElementById('selectorEsquemaDatosGenerlaes');
	var valorSelectGenerales = select.options[select.selectedIndex].value;
	
	
	$.ajax({
	    url : 'datosTablaConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {esquema:valorSelectGenerales} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#tablaPanelC").css("display","none");
    	    	$("#textoInicialPanelC").css("display","");
	    		
	    		$("#datoTituloPanelB").text("Datos Generales")

	    		$("#selectorPlanesProductosEsquema").css("display","none");
	    		$("#inputDatoPanelCConfiguracion").css("display","");
	    		
	    		
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	    		
	    		
		    	for ( var int = 0; int < json.length ; int++) {
		    		var domin='"'+json[int]["P_TF_CREW_CREW_RV_DOMAIN"]+'"';
		    		var codTabla='"'+json[int]["P_TF_CREW_CREW_DPTA_CD_TABLA"]+'"';
		    		var id='"panelGeneralB'+int+'"';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='mostrarPanelCGenerales("+codTabla+","+domin+","+id+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'>"+primeraLetraMayus(json[int]['P_TF_CREW_CREK_DE_VISUALIZACION'])+"</h6>"
		    								+"<h6 style='text-align:left;'>Tabla : <b>"+json[int]['P_TF_CREW_CREW_DPTA_CD_TABLA']+"</b></h6>"
		    								+"</div>"
		    								+"</div>";
		    	}
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	}
	    catch(e){
	    		alert('Error (5467) generado por : '+e);
	    	  	
	    	    $.unblockUI();
	    	}

	    
	    },
    error : function(xhr, status) {
    	mostrarError(xhr['responseText']);

    }
});
}


function mostrarPanelCGenerales(codTabla,domain,id){
	bloquearPantallaGris();

	var select = document.getElementById('selectorEsquemaDatosGenerlaes');
	var valorSelectGenerales = select.options[select.selectedIndex].value;
		$.ajax({
		    url : 'datosGeneralesPanelB',
		    contentType: 'application/json', 
		    data : {tabla:codTabla,dominio:domain,esquema:valorSelectGenerales},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		
		    		$(".seleccionPanelB").each(function(){
				 	    $(this).css("background","white");
				 	});
					$(".timeline__date").each(function(){
				 	    $(this).css("background","white");
				 	});
					
					$('#'+id).css("background","#bac2bb");
		    		
		    		var d1 = document.getElementById("tablaConfiguVisualizacion");
	    	    	d1.innerHTML = ' ';
	    	    	var panelNuevo = ' ';
	    	    	
	    	    	
	    	    	cambiarEncabezadoTabla(0);
	    	    	
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
	    	    		'<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_CREW_CREW_CREK_NU_VISUALIZACION']) +' - '+primeraLetraMayus(validarCampoVacio(json[int]['P_TF_CREW_CREK_DE_VISUALIZACION'])) +' </h6></td>'+
	    	    		'<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio((json[int]['P_TF_CREW_CREW_DPTA_CD_TABLA'])) +'</h6></td>'+
	    	    		'<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio((json[int]['P_TF_CREW_CREW_RV_DOMAIN'])) +'</h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_CREW_CREW_CD_CLAVE']) +' - '+primeraLetraMayus(validarCampoVacio(json[int]['P_TF_CREW_CREW_DE_CLAVE'])) +' </h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_CREW_CREW_FE_ALTA'])) +'</h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CREW_CREW_CAUS_CD_USUARIO_A'])) +'</h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_CREW_CREW_FE_MODIFICACION'])) +'</h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CREW_CREW_CAUS_CD_USUARIO_M'])) +'</h6></td>'+
	    	    	    '</tr>';
	    	    	}
	    	    	
	    	    	$("#tablaPanelC").css("display","");
	    	    	$("#textoInicialPanelC").css("display","none");
	    	    	
	    	    	d1.innerHTML = panelNuevo + '</tr>';

				$.unblockUI();
		    	}
		    	catch(e)
		    	{
			    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	mostrarError(xhr['responseText']);
		    },
		 
		   
		});
		

	};






function eliminarObjetosDuplicados(arr, prop) {
	var nuevoArray = [];
    var lookup  = {};

    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }

    return nuevoArray;

}


function selecionarProductoConfigVisualizacion(valor){
	bloquearPantallaGris();
	if(valor ==1){
	var select = document.getElementById('selectRamosConfigVisual');
	}else{
		var select = document.getElementById('selectRamosValoresDefaultConfigVisual');
	}
	
	var valorSelect = select.options[select.selectedIndex].value;
	$.ajax({
	    url : 'datosProductoConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {ramo:valorSelect} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	if(valor==1){
		    	var d1 = document.getElementById("selectorProdConfiguracion");
	    	}else{
    			var d1 = document.getElementById("selectorProdValoresDefaultConfiguracion");
    		}
		    	d1.innerHTML= '';
		    	var panelNuevo = '';
	    		panelNuevo = panelNuevo + '<option value=""><h6></h6></option>';

		    	for ( var int = 0; int < json.length ; int++) {
		    		panelNuevo = panelNuevo + '<option value="'+validarCampoVacio(json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO'])+'"><h6>'+json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO']+' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAPU_CAPU_DE_PRODUCTO']))+'</h6></option>';
		    	}
		    	
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	
	    	}
	    catch(e){
	    		alert('Error (5467) generado por : '+e);
	    	}
	    $.unblockUI();
	},
    error : function(xhr, status) {
    	mostrarError(xhr['responseText']);
	    $.unblockUI();

    }
});
}



function buscarDatosPanelB(){
	bloquearPantallaGris();
	var select = document.getElementById('selectRamosConfigVisual');
	var valorSelectRamo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectorProdConfiguracion');
	var valorSelectProd = select.options[select.selectedIndex].value;
	
	
	var select = document.getElementById('selectorEsquemaConfiguracionVisualizacion');
	var valorEsquema = select.options[select.selectedIndex].value;
	
	
	$.ajax({
	    url : 'datosBusquedaPanelB',
	    contentType: 'application/json', 
	    data : {esquema:valorEsquema,ramo:valorSelectRamo,producto:valorSelectProd} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#tablaPanelC").css("display","none");
    	    	$("#textoInicialPanelC").css("display","");
	    		$("#datoTituloPanelB").text("Datos Parametricos")
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';;
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
		    	for ( var int = 0; int < json.length ; int++) {
		    		var datoParametrico='';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' onclick='mostrarPanelC("+datoParametrico+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'><b>Codigo : "+json[int]['P_TF_WVD_VDPR_CRCD_CD_DATO']+"</b></h6>"
		    								+"<h6 style='padding-top:5px;text-align:left;'><b>"+json[int]['P_TF_WVD_CRCD_QT_DATO']+" - "+json[int]['P_TF_WVD_CRCD_DE_DATO']+"</b></h6>"
		    								+"</div>"
		    								+"</div>";
		    	}
		    	d1.innerHTML =panelNuevo+"</div>";
	    	    $.unblockUI();
	    	}
	    catch(e){
	    		alert('Error (5467) generado por : '+e);
	    	  	
	    	    $.unblockUI();
	    	}

	    },
    error : function(xhr, status) {
    	mostrarError(xhr['responseText']);

    }
});
}

function inicioSiniestroBPBA(){

	try {
		$(document).ready(function(){
			  $('#cuit').mask('00-00000000-0');
			  $('#Numero').mask('0000-0000-0000-0000');
			});
			new Card({
				form: document.querySelector('form'),
				container: '.card-wrapper'
			});
		
		// Data Picker Initialization
		$('.datepicker').pickadate({
			
			monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
			             'Noviembre', 'Diciembre'],
			monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
			weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
			today: 'Hoy',
			clear: 'Limpiar',
			close: 'Cerrar',
			labelMonthNext: 'Proximo mes',
			labelMonthPrev: 'Anterior mes',
			labelMonthSelect: 'Seleccione un mes',
			labelYearSelect: 'Seleccione un año',
			
		});
		
	} catch (e) {
		// TODO: handle exception
	}
	 

}

try {
	// Example starter JavaScript for disabling form submissions if there are invalid fields
	(function () {
	  'use strict';
	  window.addEventListener('load', function() {
	    // Fetch all the forms we want to apply custom Bootstrap validation styles to
	    var forms = document.getElementsByClassName('needs-validation');
	    // Loop over them and prevent submission
	    var validation = Array.prototype.filter.call(forms, function(form) {
	      form.addEventListener('submit', function(event) {
	        if (form.checkValidity() === false) {
	          event.preventDefault();
	          event.stopPropagation();
	        }
	        form.classList.add('was-validated');
	      }, false);
	    });
	  }, false);
	})();
} catch (e) {
	// TODO: handle exception
}

function redirectHomeBpba(){
	bloquearPantallaGris();
	location.href = "/PSPES/homeBPBA";
}

function redirectDenunciaSiniestro(){
	datosSiniestroProducto();
}

function datosSiniestroProducto(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroProducto";
}


function datosAseguradoSiniestro(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroAsegurado";
	
}

function datosSiniestroDeudaAsegurada(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroDeudaAsegurada";
}

function datosSiniestroFallecimiento(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroFallecimiento";
}

function datosSiniestroPago(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroPago";
}

function datosSiniestroFinalizacion(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroFinalizacion";
}function agregarAccesorios(){
	//obtengo el monto final para mostrar
	var montoFinal = $("#montoFinal").val()
	
	//obtengo el monto de cada accesorio
	var montoAccesorios = $("#montoAccesorios").val();
	
	
	//obtengo datos del select
	var datosAccesorios = new Object();
	datosAccesorios = llenarDatosAccesorios();
	
	cargarPanelAgregadoAccesorios(datosAccesorios,montoAccesorios);
	//guardo el valor final
	$("#montoFinal").val(parseInt(montoAccesorios) + parseInt(montoFinal))
	$("#listaTotalAccesorios").css("display","");
	$("#valorAccesorios").text(formatearMonedaCotizador(parseInt(montoAccesorios) + parseInt(montoFinal)));
	setearSelectoraccesoriosInicio();
}

function cargarPanelAgregadoAccesorios(obj,monto){
	var id='"'+obj.valor+'"';
	var panelAgregado ="<div style='width:100%;margin-bottom:0px;' class='row' id='"+obj.valor+"'><div class='input-field col-md-5'>"+
   	"<h6>"+obj.texto+"</h6>"+
   "</div>"+
   "<div class='col-md-2'>"+
   "</div>"+
   "<div class='input-field col-md-2'>"+
   	"<h6 style='text-align:right;'>"+formatearMonedaCotizador(monto)+"<input type='hidden' value='"+monto+"' id='monto"+obj.valor+"'/></h6>"+
   "</div>"+
   "<div class='input-field col-md-2'>"+
   	"<a style='background-color:#0b4376;' onclick='removerAccesorio("+id+");' class='btn-floating btn-small'>" +
   	"<i class='material-icons'>close</i></a>"+
   "</div></div>"
$("#listaAccesorios").append(panelAgregado);
	
}

function llenarDatosAccesorios(){
	var select = document.getElementById("selectorAccesorios");
    var objectoAccesorio = new Object();
    objectoAccesorio.valor = select.value;
    objectoAccesorio.texto = select.options[select.selectedIndex].innerText;
    return objectoAccesorio;
}

function setearSelectoraccesoriosInicio(){
	$("#montoAccesorios").attr("placeholder", "$0,00").val('');
	$("#selectorAccesorios").val("00").change();
}

function removerAccesorio(id){
	var montoFinal = $("#montoFinal").val();
	var monto = $("#monto"+id).val();
	
	montoFinal = parseInt(montoFinal) - parseInt(monto);
	$("#montoFinal").val(montoFinal)
	$("#valorAccesorios").text(formatearMonedaCotizador(montoFinal));
	$("#"+id).css("display","none");
	
}
function mostrarPadre(dato){
	var select = document.getElementById(''+dato);
	var valorSelect = select.options[select.selectedIndex].value;
	var cantidadPalabra = 0;
	var datos='';
	
	if(valorSelect.indexOf(';') != -1){
		//saco la cantidad de dependencias que tiene
		for(var i = 0; i < valorSelect.length; i++) {
			if (valorSelect[i].toLowerCase() === ";"){
				cantidadPalabra = parseInt(cantidadPalabra) + 1;
			}
		}
		//las guardo en un array
		var dependencias = [];
		for(var i = 0; i < cantidadPalabra; i++) {
			dependencias.push(valorSelect.split(";")[i]);
		}
		
		//me fijo los datos de las dependencias
		for(var i = 0; i < dependencias.length; i++) {
			if($('#'+dependencias[i]).length >0){
				var select = document.getElementById(''+dependencias[i]);
					if(select.nodeName.trim().toUpperCase() == "SELECT".trim()){
						var valor = select.options[select.selectedIndex].value+";";
					}else{
						  if($("#"+dependencias[i]).is(':checked')) {  
							  valor="S"+";";  
					        } else {  
					        	valor="N"+";";    
					        }  
					}
			//SACAR ESTO ES POR QUE NO ESTA EL DATO 900992
			}else if(dependencias[i] == "900992"){
				valor=4+";";
			}
			datos = datos + valor;
		}
		cargarSelectorParametrico(dato,datos);
	}
}



function seleccionarModelo(){
	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value+";";
	var ceroKm;
	var select = document.getElementById('selectAnio');
	var anio = select.options[select.selectedIndex].value+";";
	
	 if($("#esCeroKm").is(':checked')) {  
		  ceroKm="S"+";";  
       } else {  
    	   ceroKm="N"+";";    
       }  
	 var datos ="4;"+marca+anio+ceroKm;
	 var id="selectorModelo";
	 var tabla = "40021";
	 cargarSelectorParametrico(id,datos,tabla);
}

function cargarSelectorParametrico(id,datos,tabla){
	bloquearPantallaGris();
	 $.ajax({
	    url : 'datosParametricosGoCotizador',
	    contentType: 'application/json', 
	    data : {dato:datos,tabla:tabla},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById(""+id);
	    		d1.innerHTML = '';
	    		var panelNuevo ='<option value="" selected>Seleccione..</option>';
		    	for ( var int = 0; int < json.length ; int++) {
		    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_CRTB_CRTB_CD_DATO']+'"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CRTB_CRTB_DE_DATO'])) +'</h6></option>';
		    	}
		    	d1.innerHTML =panelNuevo;
		   		 $('#'+id).select2({
			        placeholder: "",
			        theme: "material"
			    })
			     if(id == "selectorModelo"){
			    	$(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");		    
			    }else{
			    	$('.selectorMaterialice').formSelect();
			    }
		    	$.unblockUI();
	    	}catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    		
	    	}
	    	},
	    error : function(xhr, status) {
	    	mostrarError('No se pudo cargar el selector, informe a sistemas con el codigo : 9871629.');
	    },
	 
	   
	});

}


function cargarSumaAsegurada(){
	var select = document.getElementById('selectorModelo');
	var modelo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value;
	
	var ceroKm;

	var select = document.getElementById('selectAnio');
	var anio = select.options[select.selectedIndex].value;
	 if($("#esCeroKm").is(':checked')) {  
		  ceroKm="S";  
       } else {  
    	   ceroKm="N";    
       }
	
		cargarTipoVehiculo();
	 
	 $.ajax({
		    url : 'datosSumaAsegurada',
		    contentType: 'application/json', 
		    data : {modelo:modelo,marca:marca,ceroKm:ceroKm,anio:anio},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		$("#labelSumaAsegurada").val(json);
		    		$('#labelSumaAsegurada').characterCounter();
		    	
			    	$.unblockUI();
		    	}catch(e){
			    	mostrarError('Error al cargar la suma asegurada',e);
		    	}
		    	},
		    error : function(xhr, status) {
		    	mostrarError('No se pudo cargar la suma asegurada, informe a sistemas con el codigo : 1231629.');
		    },
		 
		   
		});

	}

function cargarTipoVehiculo(){
	var select = document.getElementById('selectorModelo');
	var modelo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value;
	
	 $.ajax({
		    url : 'datoTipoVehiculo',
		    contentType: 'application/json', 
		    data : {modelo:modelo,marca:marca},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		cargarSelectorParametrico('usoVehiculo',json,'40008');
			    	$.unblockUI();

		    	}catch(e){
			    	mostrarError('Error al cargar el tipo de vehiculo',e);
		    	}
		    	},
		    error : function(xhr, status) {
		    	mostrarError('No se pudo cargar el tipo de vehiculo, informe a sistemas con el codigo : 1232161219.');
		    },
		 
		   
		});

	}

function reiniciarSelect(){

	var select = document.getElementById('selectorModelo');
	var modelo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value;
	
	if(modelo != ""  || marca != ""){
		seleccionarModelo();
	}
}



function validarFechanacimiento(){
	var fecha = $("#fechaNac").val();
	
	 $.ajax({
		    url : 'validarFechaNacimiento',
		    contentType: 'application/json', 
		    data : {fecha:fecha},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		if(json){
		    			$("#fechaNac").css("border-color","");
		    		}else{
		    			Swal.fire({
		    				  type: 'error',
		    				  title: 'Oops...',
		    				  text: 'El cliente tiene que ser mayor de edad.',
		    				})		    			
		    			$("#fechaNac").css("border-color","red");
		    		}
			    	$.unblockUI();
		    	}catch(e){
			    	mostrarError('Error al cargar el tipo de vehiculo',e);
		    	}
		    	},
		    error : function(xhr, status) {
		    	mostrarError('No se pudo cargar el tipo de vehiculo, informe a sistemas con el codigo : 1232161219.');
		    },
		 
		   
		});
	}


function mostrarBtnRamos(id){
		var ramo=document.getElementById("valorRamo").value;

		$("#btnMostrarRamos").css("display","none");
		$(".cardRamos").each(function(){
		    $(this).css("display","");
		});
	   
		$(".sacarSeleccionCard").each(function(){
		    $(this).removeClass("cuerpo-card-seleccionado");
		    $(this).addClass("cuerpo-card");
		    
		});
		$("#checkActivado_"+ramo).css("display","none")
		$('#mostrarPanelProd').addClass('animated fadeOut');
		$("#cardActivada_"+ramo).removeClass("cuerpo-card-seleccionado");
		$("#cardActivada_"+ramo).addClass("cuerpo-card");
		$("#mostrarPanelProd").removeClass("fadeIn");
		
		$('#mostrarPanelProd').css("display","none");
}

function mostrarProductosCotizacion(ramo,id){
	bloquearPantallaGris();
	 $.ajax({
	    url : 'productosDeLaCotizacion',
	    contentType: 'application/json', 
	    data : {ramo:ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{

	    		$("#tituloRamo").css("color","#0b4376");
	    		$("#mensajeErrorRamo").css("display","none")

	    		$("#mostrarPanelProd").css("display","");
	    		   
	    		   $('#mostrarPanelProd').addClass('animated fadeIn');
	    		   
	    		   $(".cardRamos").each(function(){
		    		    $(this).css("display","none");
		    		});
	    		   
	    		   $("#"+id).css("display","");
	    		   
	    		$("#valorRamo").val(ramo);
	    		
	    		$("#btnMostrarRamos").css("display","");
	    		
	    		$(".sacarCheckActivado").each(function(){
	    		    $(this).css("display","none");
	    		});
	    		$(".sacarSeleccionCard").each(function(){
	    		    $(this).removeClass("cuerpo-card-seleccionado");
	    		    $(this).addClass("cuerpo-card");
	    		    
	    		});
	    		
	    		
	    		$("#checkActivado_"+ramo).css("display","")
	    		$("#cardActivada_"+ramo).removeClass("cuerpo-card");
	    		$("#cardActivada_"+ramo).addClass("cuerpo-card-seleccionado");
	    		
	    		$("#mostrarPanelProd").removeClass("fadeOut");
	    		$("#mostrarPanelProd").css("display","");
	    		
	    		var d1 = document.getElementById("mostrarProductos");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';
		    	var codProd='';
		    	var checkActivadoProducto;
		    	for ( var int = 0; int < json.length ; int++) {
		    		icono = mostrarIconoMaterial(ramo);
		    		cabeceraProducto = "cabeceraProducto"+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"];
		    		codProd="'"+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"]+"'";
		    		esqA="'"+json[int]["P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION"]+"'";
		    		esqB="'"+json[int]["P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION"]+"'";
		    		checkActivadoProducto = "checkActivadoProducto"+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"];
		    		panelNuevo = panelNuevo+ '<div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 cabeceraProd acomodar-card-resposive centrar-card-resposive" id='+cabeceraProducto+'>'
		    	    						+'<div class="card" style="cursor:pointer;" onclick="seleccionProducto('+codProd+','+esqA+','+esqB+')">'
		    	    						+'<div class="card-image cuerpo-card sacarSeleccionCardProducto" id="cardActivadaProducto'+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"]+'">'
		    	    						+icono
		    	    						+'<a class="btn-floating halfway-fab waves-effect waves-light red sacarCheckActivadoProducto" id='+checkActivadoProducto+' style="display:none;">'
		    	    		                +'<i class="fas fa-check icono-check-ramos"></i>'
		    	    		                +'</a>'
		    	    						+'</div>'
		    	    						+'<div class="card-content texto-card">'
		    	    						+'<p>'+json[int]["P_TF_CAPU_CAPU_DE_PRODUCTO"]+'</p>'
		    	    						+'</div>'
		    	    						+'</div>'
		    	    						+'</div>';
		    		}
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    		
	    	}
	    	
	    	

	    	},
	    error : function(xhr, status) {
	    	mostrarError('No se encontraron productos para el ramo seleccionado.');
	    },
	 
	   
	});

};



function seleccionProducto(codProducto,esqA,esqB){

	$("#tituloProd").css("color","#0b4376");
	$("#mensajeErrorProd").css("display","none")

	
	$(".cabeceraProd").each(function(){
	    $(this).removeClass("animated pulse");
	});
	$(".sacarCheckActivadoProducto").each(function(){
	    $(this).css("display","none");
	});
	$(".sacarSeleccionCardProducto").each(function(){
	    $(this).removeClass("cuerpo-card-seleccionado");
	    $(this).addClass("cuerpo-card");
	    
	});
	$("#checkActivadoProducto"+codProducto).css("display","")
	$("#cardActivadaProducto"+codProducto).removeClass("cuerpo-card");
	$("#cardActivadaProducto"+codProducto).addClass("cuerpo-card-seleccionado");

	$("#valorProducto").val(codProducto);
	$("#esqA").val(esqA);
	$("#esqB").val(esqB);

	$("#cabeceraProducto"+codProducto).addClass("animated pulse");
	
	
}


function inicioCotizacion(){
	$(document).ready(function(){
		$('.datepicker').datepicker({
			 months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			 monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		});

	});
	$(document).ready(function() {
	    $('input#input_text, textarea#textarea2').characterCounter();
	  });
	 $(document).ready(function(){
		    $('select').formSelect();
		  });
	 
	 $(document).ready(function(){
		    $('.modal').modal();
		  });
	 $(document).ready(function(){
		    $('.tooltipped').tooltip();
		  });
}


function inicioCotizacionStep2(){
bloquearPantallaGris();

	$(document).ready(function() {
	    $('input#input_text, textarea#textarea2').characterCounter();
	  });
	 
	 $(".js-select2").select2({
	        placeholder: "",
	        theme: "material"
	    })
	    
	     
    $(".select2-selection__arrow")
        .addClass("material-icons")
        .html("arrow_drop_down");
	 
	 $(document).ready(function(){
		    $('.selectorMaterialice').formSelect();
		  });
	 selectorOrigenPago();
	 selectorVigenciaTecnica();
	 $.unblockUI();
}


function inicioCotizacionStep3(){
	bloquearPantallaGris();
	
	 $(document).ready(function(){
		    $('.selectorMaterialice').formSelect();
		  });
	
		 $(".js-select2").select2({
		        placeholder: "",
		        theme: "material"
		    })
		    var fecha = new Date();
			 var ano = fecha.getFullYear();
		     $(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");
		     $('.selectorMaterialice').formSelect();
		     
		     $('.datepicker').datepicker({yearRange:[1930,ano],format: 'dd/mm/yyyy'});

		     
		 $.unblockUI();
	}



function redirectStep2(){
	var valorProducto=document.getElementById("valorProducto").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var esqA=document.getElementById("esqA").value;
	var esqB=document.getElementById("esqB").value;
	if(valorRamo == 0){
		$("#tituloRamo").css("color","#dc3545");
		$("#mensajeErrorRamo").css("display","");
	}else if(valorProducto == 0){
		$("#tituloProd").css("color","#dc3545");
		$("#mensajeErrorProd").css("display","");
	}else{
		bloquearPantallaGris();
		$("#tituloProd").css("color","#0b4376");
		$("#mensajeErrorProd").css("display","none");
		location.href="/PSPES/cotizacionStep2?ramo="+valorRamo+"&producto="+valorProducto+"&esqA="+esqA+"&esqB="+esqB;
	}
}

function volverRedirectStep2(){
	
	
	location.href="/PSPES/cotizacionStep2?ramo=4&producto=04100";
}





function redirectStep4(){
	validadSelectMaterialice();
	'use strict';
		window.addEventListener('load', function() {
			var forms = document.getElementsByClassName('needs-validation');
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('submit', function(event) {
					if (form.checkValidity() === false) {
						event.preventDefault();
						event.stopPropagation();
					}
					 form.classList.add('was-validated');
					bloquearPantallaGris();
				}, false);
			});
		}, false);
		
		var formData = JSON.stringify(jQuery('.datoTablaClass').serializeArray()).replace("/", "").replace("/", "");
		$.ajax({
			type: "GET",
			url: "guardarDatosDelBien",
			data: {datosPantalla:formData},
			success: function(e,data) {
				$.unblockUI();
			},
			error: function(xhr, ajaxOptions, thrownError) {
				$.unblockUI();
			}
		});
}


function enviarFormStep1(){
	validadSelectMaterialice();
	'use strict';
		window.addEventListener('load', function() {
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			var forms = document.getElementsByClassName('needs-validation');
			// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('submit', function(event) {
					if (form.checkValidity() === false) {
						event.preventDefault();
						event.stopPropagation();
					}
					 form.classList.add('was-validated');
				}, false);
			});
		}, false);
}

function validadSelectMaterialice(){
	$('form').on('submit',function(e){
	    $(".error_note").remove();
	    var select = $(this).find('select').filter("[required=required]");
	    $.each(select , function(index, elm){
	        val = $(this).val();    
	        target = $(this).closest('.input-field');
	        if (typeof target !== "undefined") {
	            input_target = target.find('input.select-dropdown');
	            if (typeof input_target !== "undefined") {                  
	                if(val == '' || val == false || val == 0 || val == null){
	                    input_target.css({'border-color':'#dc3545'});
	                    input_target.after('<span class="error_note" style="color: #dc3545;font-size:80%;position:relative;bottom:5px;font-weight:600;">Este es un campo obligatorio.</span>');
	                    $(".caret").css("margin-top","7px");
	                    $('html,body').animate({ scrollTop: $("body").offset().top},'slow' );
	                    e.preventDefault();

	                }else{
	                    input_target.css({'border-color':'#cbcbcb'});
	                }

	            }
	        }           
	    });
	});
}

function soloLetras(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    if (tecla == 8) {
        return true;
    }

    patron = /^[ A-Za-z]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


function soloLetrasYnum(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    if (tecla == 8) {
        return true;
    }

    patron = /^[ A-Za-z0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


function volverRedirectStep1(){
	bloquearPantallaGris();
	location.href="/PSPES/cotizacionStep1";
}

function redirectStep3(){
	validadSelectMaterialice();
	'use strict';
		window.addEventListener('load', function() {
			var forms = document.getElementsByClassName('needs-validation');
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('submit', function(event) {
					if (form.checkValidity() === false) {
						event.preventDefault();
						event.stopPropagation();
					}
					 form.classList.add('was-validated');
					bloquearPantallaGris();
				   var dataString = $('#formularioStep0').serialize();
					$.ajax({
						type: "POST",
						url: "guardarDatosGenerales",
						data: dataString,
						success: function(e,data) {
							
							$.unblockUI();
					},
						error: function(xhr, ajaxOptions, thrownError) {
					        $.unblockUI();
						}
					});
	
				}, false);
			});
		}, false);
}






function solonumeros(e){
var key = window.event ? e.which : e.keyCode;
    if(key < 48 || key > 57)
        e.preventDefault();
}


function volverRedirectStep0(){
	bloquearPantallaGris();
	location.href="/PSPES/cotizadorGO";
	
}

function volverRedirectStep3(){
	bloquearPantallaGris();
	location.href="/PSPES/cotizacionStep3";
	
}

function RedirectStep5(){
	bloquearPantallaGris();
	
	var promoA=$("#promoUno").val();
	var promoB=$("#promoDos").val();
	var promoC=$("#promoTres").val();
	
	location.href="/PSPES/cotizacionStep5?promoA="+promoA+"&promoB="+promoB+"&promoC="+promoC;
	
}

function volverRedirectStep4(){
	bloquearPantallaGris();
	location.href="/PSPES/cotizacionStep4";

	
}








function selectorOrigenPago(){
	var select = document.getElementById('selectMedioPago');
	var valorSelect = select.options[select.selectedIndex].value;
	bloquearPantallaGris();
	$.ajax({
	    url : 'selectorOrigenPago',
	    contentType: 'application/json', 
	    data : { medioPago:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    	try {
    	    		var valordefault = $("#valorOrigenPago").val();
    	    	var d1 = document.getElementById("selectOrigenPago");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		if(valordefault.trim() == json[int]['P_TF_COTC_COTC_CD_ORIGEN'].trim()){
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_COTC_COTC_CD_ORIGEN']+' selected><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COTC_COTC_DE_ORIGEN'])) +'</h6></option>';
    	    		}else{
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_COTC_COTC_CD_ORIGEN']+'><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COTC_COTC_DE_ORIGEN'])) +'</h6></option>';
    	    		}
    	    	}
    	    	d1.innerHTML =panelNuevo;
    	    	 $(document).ready(function(){
    	 		    $('#selectOrigenPago').formSelect();
    	 		  });
	}
	catch(e)
	{
    	mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
		
	}
	$.unblockUI();
	
	
	},
error : function(xhr, status) {
	mostrarError(xhr['responseText']);
},
});
};



function selectorVigenciaTecnica(){
	var select = document.getElementById('selectVigencia');
	var valorSelect = select.options[select.selectedIndex].value;
	
	$.ajax({
	    url : 'selectorVigenciaTecnica',
	    contentType: 'application/json', 
	    data : { vigencia:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    	try {
    	    	var d1 = document.getElementById("selectVigenciaTecnica");
    	    	d1.innerHTML = ' ';
	    		var valordefault = $("#valorVigenciaTecnica").val();
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		if(valordefault.trim() == json[int]['P_TF_CAVT_CAFP_CD_VIGENCIA'].trim()){
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_CAVT_CAFP_CD_VIGENCIA']+' selected><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAVT_CAFP_DE_VIGENCIA'])) +'</h6></option>';
    	    		}else{
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_CAVT_CAFP_CD_VIGENCIA']+'><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAVT_CAFP_DE_VIGENCIA'])) +'</h6></option>';
    	    		}
    	    	}
    	    	d1.innerHTML =panelNuevo;
    	    	 $(document).ready(function(){
    	 		    $('#selectVigenciaTecnica').formSelect();
    	 		  });
    	    	 
    	    	 
    	    	 cargarSelectorPlanDePago(valorSelect);
	}
	catch(e)
	{
    	//mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
		
	}
	},
	error : function(xhr, status) {
	},
	});
};


function cargarSelectorPlanDePago(vigencia){
	bloquearPantallaGris();
	$.ajax({
	    url : 'selectorPlanesPagos',
	    contentType: 'application/json', 
	    data : { vigencia:vigencia},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    	try {
    	    	var d1 = document.getElementById("selectPlanesPago");
    	    	d1.innerHTML = ' ';
	    		var valordefault = $("#valorPlanPago").val();
    	    	var panelNuevo = '<option>Selecione..</option>';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		if(valordefault.trim() == json[int]['P_TF_CAFR_CAFR_CD_FRAGMENT'].trim()){
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_CAFR_CAFR_CD_FRAGMENT']+' selected><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAFR_CAFR_DE_FRAGMENT'])) +'</h6></option>';
    	    		}else{
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_CAFR_CAFR_CD_FRAGMENT']+'><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAFR_CAFR_DE_FRAGMENT'])) +'</h6></option>';
    	    		}
    	    	}
    	    	d1.innerHTML =panelNuevo;
    	    	 $(document).ready(function(){
    	 		    $('#selectPlanesPago').formSelect();
    	 		  });
	}
	catch(e)
	{
    	mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
		
	}
	$.unblockUI();
	},
	error : function(xhr, status) {
		mostrarError(xhr['responseText']);
	},
	});
};



function selecionarPromo(id){
	var promoUno= $("#promoUno").val();
	var promoDos= $("#promoDos").val();
	var promoTres= $("#promoTres").val();
	var valor= $("#valor").val();

	
	 if(promoUno == id){
		valor = parseInt(1);
		id = "";
		resaltarPromocionSeleccionada(promoUno);
	}else if(promoDos == id){
			id = "";
			valor = parseInt(2);
			resaltarPromocionSeleccionada(promoDos);
		}else if(promoTres == id){
			id = "";
			valor = parseInt(3);
			resaltarPromocionSeleccionada(promoTres);
		}
	
	
	if(valor == 1){
		$("#promoUno").val(id)
		$("#valor").val(parseInt(valor)+ 1);
		resaltarPromocionSeleccionada(id);
		if(promoUno != ''){
			resaltarPromocionSeleccionada(promoUno);
		}
	}else if(valor == 2){
		$("#promoDos").val(id)
		$("#valor").val(parseInt(valor)+ 1);
		resaltarPromocionSeleccionada(id);
		if(promoDos != ''){
			resaltarPromocionSeleccionada(promoDos);
		}
	}else{
		$("#promoTres").val(id)
		$("#valor").val(1);
		resaltarPromocionSeleccionada(id);
		if(promoTres != ''){
			resaltarPromocionSeleccionada(promoTres);
		}
	}
}


function resaltarPromocionSeleccionada(id){
	$("#"+id).removeClass("animated pulse");
    if ($("#cuerpo_"+id).hasClass('cuerpo-card-seleccionado')){
    	$("#check_"+id).css("display","none")
    	$("#cuerpo_"+id).removeClass("cuerpo-card-seleccionado");
    	$("#cuerpo_"+id).addClass("cuerpo-card");
    }else{
    	$("#check_"+id).css("display","")
    	$("#cuerpo_"+id).removeClass("cuerpo-card");
    	$("#cuerpo_"+id).addClass("cuerpo-card-seleccionado");
    	$("#"+id).addClass("animated pulse");
    }
}

function mostrarIconoMaterial(ramo){
	
	if (ramo == "1") 
		return "<i class='fas fa-fire-alt icono-cabecera-ramos'></i>";
	if (ramo == "2")
		return "<i class='fas fa-truck-moving icono-cabecera-ramos'></i>";
	if (ramo == "4")
		return "<i class='fas fa-car-alt icono-cabecera-ramos'></i>";
	if (ramo == "5")
		return "<i class='far fa-window-restore icono-cabecera-ramos'></i>";
	if (ramo == "6")
		return "<i class='fas fa-lock icono-cabecera-ramos'></i>";
	if (ramo == "7")
		return "<i class='fas fa-gavel icono-cabecera-ramos'></i>";
	if (ramo == "8")
		return "<i class='fas fa-home icono-cabecera-ramos'></i>";
	if (ramo == "10") 
		return "<i class='fas fa-cloud-rain icono-cabecera-ramos'></i>";
	if (ramo == "13")
		return "<i class='fas fa-tv icono-cabecera-ramos'></i>";
	if (ramo == "14")
		return "<i class='fas fa-building icono-cabecera-ramos'></i>";
	if (ramo == "15") 
		return "<i class='fas fa-file-alt icono-cabecera-ramos'></i>";
	if (ramo == "16") 
		return "<i class='fas fa-walking icono-cabecera-ramos'></i>";
	if (ramo == "22") 
		return "<i class='fas fa-motorcycle icono-cabecera-ramos'></i>";
	
	return "all_inclusive";
	
}


function refrescarMonitor(){
	bloquearPantallaGris();
	
	var dato3 = $('#annioSelectorMonitor').val();
	var dato2 = $('#mesSelectorMonitor').val();	
	
	var dato1 = $('#diaSelectorMonitor').val();
    
    location.href = "/PSPES/monitor?p1=" + dato1 +"&p2=" + dato2 +"&p3=" + dato3;
}

function inicioMonitorHome(){
	
	var dia = $('#valorDiaMonitor').val();
	var mes = $('#valorMesMonitor').val();
	var annio = $('#valorAnnioMonitor').val();
	
	
	  $("#diaSelectorMonitor").val(dia);
	  $("#mesSelectorMonitor").val(mes);
	  $("#annioSelectorMonitor").val(""+annio);
}


function mostrarPanelCMonitorHome(user){
	bloquearPantallaGris();

	var dia = $('#diaSelectorMonitor').val();
	var mes = $('#mesSelectorMonitor').val();
	var annio = $('#annioSelectorMonitor').val();
	
	$.ajax({
	    url : 'datosMonitorUser',
	    contentType: 'application/json', 
	    data : {dia:dia,mes:mes,annio:annio,user:user},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$(".seleccionPanelB").each(function(){
	    	 	    $(this).css("background","white");
	    	 	});
	    		$('#card'+user).css("background","#bac2bb");
	    		
	    		
	    		
	    		var d1 = document.getElementById("datosNavegacionMonitor");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-accesoriosCotizacionHome" role="cell"><h6>'+validarCampoVacio(json[int]['fecha']) +'</h6></td>'+
		            '<td class="td-grilla-accesoriosCotizacionHome" role="cell"><h6>'+validarCampoVacio(json[int]['pantalla']) +'</h6></td>'+
		            '<td class="td-grilla-accesoriosCotizacionHome" role="cell"><a href="'+validarCampoVacio(json[int]['url'])+'">'+validarCampoVacio(json[int]['url']) +'</a></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';

    	    	
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function exportarUsuariosMonitor(){
	var dia = $('#diaSelectorMonitor').val();
	var mes = $('#mesSelectorMonitor').val();
	var anio = $('#annioSelectorMonitor').val();
	
	location.href = "/PSPES/exportarUsuariosMonitor?p1=" + dia +"&p2=" + mes +"&p3=" + anio;
}

function exportarUsuariosTotalMonitor(){
	
	var mes = $('#mesSelectorMonitor').val();
	var anio = $('#annioSelectorMonitor').val();
	
	location.href = "/PSPES/exportarUsuariosAccesoTotal?p1=" + mes +"&p2=" + anio;
}function mostrarAyudaHome(id,img){
	bloquearPantallaGris();
	$(".timeline__post").each(function(){
 	    $(this).css("background","white");
 	});
	$('#'+id).css("background","#bac2bb");

	var d1 = document.getElementById("panelImagenAyuda");
	d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+img+'</i>'; 
	
	//HOME
	if(id == "cuadroAyudaHome0"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Pantalla interactiva que contiene todas las aplicaciones que integran a GO. La funcionalidad es poder desplazarse entre las mismas, sin necesidad de salir o cambiar de aplicaci&oacute;n.</h5>'+
			'<h5 style="border:none;line-height: 1.3"> Dentro del proyecto podemos encontrar: </h5>'+
			'<ul style="padding-top:0px;">'+
			'<li><h6>Busquedas GO.</h6></li>'+
            '<li><h6>Experto.</h6></li>'+
            '<li><h6>Moneda.</h6></li>'+
            '<li><h6>Promociones.</h6></li>'+
            '<li><h6>Siniestros.</h6></li>'+
			'<li><h6>Contacto.</h6></li>'+
			'<li><h6>Ayuda.</h6></li></ul>'; 
			'<li><h6>Rector.</h6></li></ul>'; 
			'<li><h6>Salir.</h6></li></ul>'; 
	}
	//Busquedas
	if(id == "cuadroAyudaHome1"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Go permite realizar 4.488 combinaciones posibles de b&uacute;squedas, entre las entidades principales y su b&uacute;squeda avanzada.</h5>'+
			'<h5 style="border:none;line-height: 1.3"> Entidades : </h5>'+
			'<ul style="padding-top:0px;">'+
			'<li><h6>P&oacute;liza</h6></li>'+
            '<li><h6>Clientes</h6></li>'+
            '<li><h6>Siniestros</h6></li>'+
            '<li><h6>Nids</h6></li>'+
			'<li><h6>Productores</h6></li>'+
			'<li><h6>Cotizaciones</h6></li></ul>'; 
	}
	
	//busqueda vanzada
	if(id == "cuadroAyudaHome2"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Permite reducir el resultado de la b&uacute;squeda, a trav&eacute;s de tres selectores. Los mismos representan al ramo, al tipo de b&uacute;squeda (por numero de p&oacute;liza, por n&uacute;mero de cliente, etc) y su vigencia o creaci&oacute;n.</h5>';
	}
	
	//Topologia Pantallas
	if(id == "cuadroAyudaHome3"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Las pantallas que integran a la aplicaci&oacute;n se distribuyen en 4 paneles A ,B , C y D. Los primeros tres, siempre se encuetran visibles y el ultimo solamente cuando se seleccione una opci&oacute;n del panel B.</h5>';
	}
	//exportar a excel
	if(id == "cuadroAyudaHome5"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Go permite poder exportar las b&uacute;squedas que se realizan de las distintas entidades a Excel.</h5>';
	}
//descagar poliza
	if(id == "cuadroAyudaHome6"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Go cuenta con la posiblidad de poder descargar la p&oacute;liza, de cualquier endoso en un formato PDF.</h5>';
	}
	//resposive
	if(id == "cuadroAyudaHome7"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">La aplicaci&oacute;n redimensiona y coloca los elementos de la web de forma que se adapten al ancho de cada dispositivo permitiendo una correcta visualizaci&oacute;n y una mejor experiencia de usuario.</h5>';
	}
	//tecnologia
	if(id == "cuadroAyudaHome8"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Las tecnologias que se usaron en la creaci&oacute;n del proyecto son herramientas de desarrollo modernas.</h5>'+
		'<ul style="padding-top:0px;">'+
		'<li><h6>HTML 5</h6></li>'+
        '<li><h6>JavaScript</h6></li>'+
        '<li><h6>Boostrap / Responsive</h6></li>'+
        '<li><h6>Servicios Web</h6></li></ul>';
	
	}
	
	
	//modo experto
	if(id == "cuadroAyudaHome9"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Se desarrollo para el usuario experto que necesita realizar b&uacute;squedas mas espec&iacute;ficas, incluyendo el resto de las entidades que no se encuentran en GO Busuqedas.</h5>';
	
	}
	
	
	
	//promociones
	if(id == "cuadroAyudaHome10"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Go permite una b&uacute;squeda agil de promociones, en las cuales se van a poder editar o crear nuevas.</h5>';
	
	}
	
	
	
	//siniestro
	if(id == "cuadroAyudaHome11"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Estamos construyendo la nueva bandeja de visualizaci&oacute;n de las tareas de siniestros, para mostrar la informaci&oacute;n de una manera mas intuitiva y amigable para el usuario.</h5>';
	
	}
	$.unblockUI();
	
}


function inicioAyudaHome(){
	
	bloquearPantallaGris();
	$( '#cuadroAyudaHome0').trigger( "click" );
	$.unblockUI();
	
}function mostrarDetalleCertificadoSeleccionado(idPopUp, nroCertificado, poliza, ramo, sucursal){
	var valorEndoso=document.getElementById("valorPolizaEndoso").value;
	$.ajax({
	    url : '/PSPES/certificadoCab',
	    contentType: 'application/json', 
	    data : { nroCertificado : nroCertificado , ramo : ramo , poliza : poliza , sucursal: sucursal },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
				
	    			llenarDinamicamente(json);
			    	$('#INFO_P_TF_CERT_CACE_NU_CERTIFICADO').html("Certificado "+ '<b>' + '#'+ json['P_TF_CERT_CACE_NU_CERTIFICADO'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_CAMD_CD_MEDIO_PAGO').html('<b>'+json['P_TF_CERT_CACE_CAMD_CD_MEDIO_PAGO']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_MEDIO_PAGO'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_COTC_CD_ORIGEN').html('<b>'+json['P_TF_CERT_CACE_COTC_CD_ORIGEN']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_ORIGEN'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_CJIV_CD_CATEGORIA_IVA').html('<b>'+json['P_TF_CERT_CACE_CJIV_CD_CATEGORIA_IVA']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_CD_CATEGORIA_IVA'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_CAZB_CD_PROMOCION').html('<b>'+json['P_TF_CERT_CACE_CAZB_CD_PROMOCION']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_PROMOCION'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_ST_CERTIFICADO').html('<b>'+json['P_TF_CERT_CACE_ST_CERTIFICADO']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_ST_CERTIFICADO'] + '</b>');
			    	
			    	if(json['P_TF_CERT_CACE_CAMD_CD_MEDIO_PAGO'] === '2'){
			    	$('#INFO_P_TF_CUENTA').html('<b>'+validarCampoVacio(codigoTarjeta(json['P_TF_CERT_INB_NU_CUENTA']))+'</b>');
			    	$('#INFO_NOMBRE_CAMPO').html('Tarjeta :');
			    	}
			    	else{
				    	$('#INFO_P_TF_CUENTA').html('<b>'+validarCampoVacio(json['P_TF_CERT_INB_NU_CUENTA'])+'</b>');
				    	$('#INFO_NOMBRE_CAMPO').html('Cbu :');

			    	}
			    	
			    	$('#INFO_SUCURSAL').text(sucursal);
			    	$('#INFO_POLIZA').text(poliza);
			    	$('#INFO_CERTIFICADO').text(nroCertificado);
			    	$('#INFO_RAMO').text(ramo);
			    	abrirPopUpNuevo(idPopUp);	

	    	} catch (e) {
	    		alert('Code 778 : No pudo cargar.');
	    	}
	    
	    	$.ajax({
	    	    url : 'datosExtraPoliza',
	    	    contentType: 'application/json', 
	    	    data : { certificado : nroCertificado, ramo : ramo,poliza : poliza , sucursal: sucursal,endoso:valorEndoso},
	    	    type : 'GET',
	    	    dataType : 'json',
	    	    success : function (json) {
	    	    	try {
	    	    		$('#DATO_EXTRA_BIEN').html('<b>'+validarCampoVacio((json[0]['P_TF_DATOS_INB_DE_RIESGO']))+'</b>');
	    	    		$('#DATO_EXTRA_SUMA_ASEG').html('<b>'+validarCampoVacio(formatearMoneda(json[0]['P_TF_DATOS_INB_MT_SUMA_ASEGURADA']))+'</b>');
	    	    		$('#DATO_EXTRA_PLAN').html('<b>'+validarCampoVacio((json[0]['P_TF_DATOS_INB_CD_PLAN']))+ " - "+validarCampoVacio((json[0]['P_TF_DATOS_INB_DE_PLAN']))+'</b>');
				    	
	        	    	
	        	    	} catch (e) {
	        	    		mostrarError('Disculpe, existio un problema codigo:11113',e);	     
	        	    	}	        	    	
	        	    	$.unblockUI();
	        	    },
	        		 
	        	    error: function (request, status, error) {
	        	    	$.unblockUI();
	        	    	mostrarError('33 - Se a producido un inconveniente al cargar los certificados de la poliza!');

	        	       },
	        	   
	        	   });
	    
	    
	    
	    
	    
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('33 - Se a producido un inconveniente al cargar los certificados de la poliza!');
	    },
	   
	});
	
}

function codigoTarjeta(numero){
	if(numero == ''){
		return "</b><a style='color:#bfbac2;'>Sin dato</a>";
	}
	var dato = numero.substring(12,numero.length);
	return "xxxx xxxx xxxx " + dato;
}

function mostrarBienes(obj,endoso,card,numeroEndoso,poliza,ramo, sucursal, nroCertificadoCabecera,producto,prestador,identificador,alarma) {
	
	
	
	bloquearPantallaGris();
	$("#valorEndosoCertificadoHome").val(numeroEndoso);
	
	$("#valorPrestadorCertificadoHome").val(prestador);
	$("#valorNumCodCertificadoHome").val(producto);
	$("#valorAlarmaCertificadoHome").val(alarma);
	$("#valorIdentificadorCertificadoHome").val(identificador);
	

  	$(".timeline__post").each(function(){
 	    $(this).css("background","white");
 	});
 	
	$('#timeLineItemEndoso'+card).css("background","#bac2bb");
	$.ajax({
	    url : 'bienesCertificado',
	    contentType: 'application/json', 
	    data : {  producto : producto , ramo : ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	
	    	try {
	    		
	    	var d1 = document.getElementById("selectorBienCertificado");
	    	d1.innerHTML = ' ';
	    	var panelNuevo = '';
	    	for ( var int = 0; int < json.length ; int++) {
	    		pos = int +1;
	    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_PARAM_CRPB_CD_BIEN_ASEG']+'"><h6>'+json[int]['P_TF_PARAM_CRPB_CD_BIEN_ASEG']+' - ' +primeraLetraMayus(json[int]['P_TF_PARAM_INB_DESC_BIEN_ASEG'])+'</h6></option>';
	    	}
	    	
	    	d1.innerHTML =panelNuevo;
	    	mostrarEndosoParametricoHome();
	    	mostrarDatosExtra(numeroEndoso);
	    	} catch (e) {
	    		// TODO: handle exception
	    	}
	    	
	    	$.unblockUI();
	    },
		 
	    error: function (request, status, error) {
	    	var d1 = document.getElementById("selectorBienCertificado");
	    	d1.innerHTML = ' <option>No se encontraron bienes para en endoso seleccionado.</option>';
	       	var d1 = document.getElementById("datosParametricosSegunEndoso");
	    	d1.innerHTML = '<h6 style="padding-top:40px;text-align:center;"> No posee datos parametricos el endoso seleccionado. </h6>';
	    	$.unblockUI();

	    },
	 
	   
	});
    
	
}


function mostrarDatosExtra(endoso){
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;	
	$.ajax({
	    url : 'datosExtraPoliza',
	    contentType: 'application/json', 
	    data : { endoso : endoso , ramo : valorRamo , poliza : valorPoliza, sucursal: valorSucursal ,certificado: valorCertificado},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$("#DATO_PLAN_CERTIFICADO").html("<b>" +validarCampoVacio((json[0]['P_TF_DATOS_INB_CD_PLAN']))+ " - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DATOS_INB_DE_PLAN'])) +" </b>");
		    	$("#DATO_SUMA_ASEG_CERTIFICADO").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_DATOS_INB_MT_SUMA_ASEGURADA']))+" </b>");
		    	$("#DATO_RIESGO_ASEG_CERTIFICADO").html("<b>" +validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DATOS_INB_DE_RIESGO']))+"</b>");

	    	}catch (e) {
		    	mostrarError('Error 44 : no pudo cargar los parametricos');
			}
	    	$.unblockUI();
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();

	    },
	});
	
};

function mostrarEndosoParametricoHome(){
	bloquearPantallaGris();

	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;
	$.ajax({
	    url : 'certificadoParametrico',
	    contentType: 'application/json', 
	    data : { endoso : valorEndoso , ramo : valorRamo , poliza : valorPoliza, sucursal: valorSucursal ,certificado: valorCertificado,bien : valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    			var d1 = document.getElementById("datosParametricosSegunEndoso");
	    	    	d1.innerHTML = ' ';

	    	    	var panelNuevo = '<div style="height:250px;overflow-y:auto;"><table id="tablaParametricos" style= "width:100%;">';
	    	    	
	    	    	for ( var int = 0; int < json.length; int++) {
	    	    		panelNuevo = panelNuevo + '<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>'+ validarCampoVacioSinB(primeraLetraMayus(json[int]['P_TF_PARAM_INB_LABEL'])) +' : </td><td style="padding-top:5px;width:60%;"><h6>';
	    	    		
	    	    		panelNuevo = panelNuevo + '<b>' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CRPD_DATO'])) + '</b>';
	    	    		
	    	    		
	    	    		
	    	    		if(primeraLetraMayus(json[int]['P_TF_PARAM_CRPD_DATO']).length>0 || primeraLetraMayus(json[int]['P_TF_PARAM_CRPD_DATO']) !=""){
	    	    			if(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DATO']).length>0 || primeraLetraMayus(json[int]['P_TF_PARAM_INB_DATO']) != "")
	    	    				panelNuevo = panelNuevo + ' - ' + '<b>'+ primeraLetraMayus(json[int]['P_TF_PARAM_INB_DATO']) + '</b>';
	    	    		}
	    	    		
	    	    		panelNuevo = panelNuevo + '.</h6></td></tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo + '</table>' + '</div>';  
	    			
	    	}catch (e) {
		    	mostrarError('Error 44 : no pudo cargar los parametricos');
			}
	    	$.unblockUI();
	    },
	    error : function(xhr, status) {
	    	var d1 = document.getElementById("datosParametricosSegunEndoso");
	    	d1.innerHTML = '<h6 style="padding-top:40px;text-align:center;"> No se encontraron datos parametricos para el bien seleccionado. </h6>';
	    	$.unblockUI();

	    },
	});
	
};

function buscarFiltroParametrico(idTablaParametricos){
	
	input = document.getElementById("inputBusquedaParametrico");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}


function buscarFiltroParametricoTextos (idTablaParametricos){
	
	input = document.getElementById("inputBusquedaParametricoTextos");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}


//variable local a la funcion completarDetalleTablaCertificados
var buscarFiltroCertificado="";
var dataView;
var grid;
function completarDetalleTablaCertificados(data, nroCertificado, poliza, ramo, sucursal){
	var columns = [
	       	    {id: "certificado", name: "#", field: "certificado",  cssClass: "cell-title", selectable: false, resizable: false},
	       	    {id: "riesgo", name: "Riesgo", field: "riesgo", width:260,  selectable: false, resizable: false},
	       	    {id: "sumaAsegurada", name: "Suma", field: "sumaAsegurada",  selectable: false, resizable: false},
	       	    {id: "estado", name: "Estado", field: "estado", width:95, selectable: false, resizable: false}
	       	];

	       	var options = {
	       	    editable: true,
	       	    enableAddRow: false,
	       	    enableCellNavigation: true,
	       	    asyncEditorLoading: false,
	       	    fullWidthRows:true,
	       	    rowHeight: 25
	       	};
	       	
	      //inicializo la grilla
	        dataView = new Slick.Data.DataView({ inlineFilters: true });
	        dataView.beginUpdate();
	        dataView.setItems(data, "certificado");
	        dataView.setFilter(myFilterCertificado);
	        dataView.endUpdate();
	        
	        // inicializo la grilla
	        grid = new Slick.Grid("#grillaCertificados", dataView, columns, options);
	 	
	    grid.onClick.subscribe(function (e) {
	    	
	        var cell = grid.getCellFromEvent(e);
	        
	        var row = cell.row;
	        var row_values = dataView.getItem(row);
	        	    	
	    	mostrarDetalleCertificadoSeleccionado('certificadoPopUp',row_values.certificado,poliza,ramo,sucursal);
	    	
	    });
	    
	    dataView.onRowCountChanged.subscribe(function (e, args) {
	    	grid.updateRowCount();
	    	grid.render();
	    });

	    dataView.onRowsChanged.subscribe(function (e, args) {
	    	grid.invalidateRows(args.rows);
	    	grid.render();
	    });
	  
	    $("#inputBusquedaCertificado").keyup(function (e) {
	        Slick.GlobalEditorLock.cancelCurrentEdit();

	        // clear on Esc
	        if (e.which == 27) {
	          this.value = "";
	        }

	        buscarFiltroCertificado = this.value.toUpperCase();
	        updateFilterCertificado();

	     });
	    
	    //Modifico tamanio del scroll slickviewport
	    document.getElementById("idSlickViewport").style.height = "140px";
	    
	    var x = document.getElementsByClassName("slick-header-column");
	    /*Se cambia el tama�o del encabezado de tabla de header certificados*/
	    for(var i = 0; i<4; i++){
		    x[i].style.height="20px";
		    
	    }
	    
}

function updateFilterCertificado() {
    dataView.setFilterArgs({
      searchString: buscarFiltroCertificado
    });
    dataView.refresh();
}

function myFilterCertificado(item) {

    if (buscarFiltroCertificado != "" && item["certificado"].indexOf(buscarFiltroCertificado) == -1
        && item["riesgo"].indexOf(buscarFiltroCertificado) == -1
        && item["sumaAsegurada"].indexOf(buscarFiltroCertificado) == -1
        && item["estado"].indexOf(buscarFiltroCertificado) == -1) {
        return false;
    }

    if (item.parent != null) {
        var parent = data[item.parent];

        while (parent) {
            if (parent._collapsed ||
                (buscarFiltroCertificado != "" && parent["certificado"].indexOf(buscarFiltroCertificado) == -1
                    && parent["riesgo"].indexOf(buscarFiltroCertificado) == -1
                    && parent["sumaAsegurada"].indexOf(buscarFiltroCertificado) == -1
                    && parent["estado"].indexOf(buscarFiltroCertificado) == -1)) {
                return false;
            }

            parent = data[parent.parent];
        }
    }

    return true;
}

function abrirModalPrimaCertificadoPanelA(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorImagen=document.getElementById("imagenIconoCertificado").value;
	var valorEndoso=null;
	
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosPrima',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal,endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosCoberturaPanelACertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	
    	    	for ( var int = 0; int < json.length-1 ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_CARB_CD_RAMO']) +'</h6></td>'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_CACB_CD_COBERTURA']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRIMA_INB_COBERTURA']))+ '</h6></td>'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_TA_RIESGO']) +'</h6></td>'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_CARC_MT_SUMA_ASEGURADA'])) +'</h6></td>'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_CARC_MT_PRIMA_BRUTA'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	total = json.length - 1;
    	    	$("#DATO_PRIMAS_COBERTURA").html(" <b>" + validarCampoVacio(formatearMoneda(json[total]['P_TF_PRIMA_TOTAL_INB_PRIMA_TOTAL'])) +"</b>");

    	    	$("#DATOS_MODAL_PRIMA").html("Cobertura #<b>"+valorPoliza+" - "+valorCertificado+"</b>");
    	    	$("#DATOS_IMAGEN_ICONO").html(valorImagen);

    	    	
    	    	
			//Abre el modal
			$("#coberturaCertificadoPopUp").modal({
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
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function abrirModalPrimaCertificado(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var valorImagen=document.getElementById("imagenIconoCertificado").value;
	
	
	
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosPrima',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal, endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosPrimaCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	
    	    	for ( var int = 0; int < json.length-1 ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_CARB_CD_RAMO']) +'</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_CACB_CD_COBERTURA']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRIMA_INB_COBERTURA']))+ '</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_TA_RIESGO']) +'</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_CARC_MT_SUMA_ASEGURADA'])) +'</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_CARC_MT_PRIMA_BRUTA'])) +'</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_INB_VARIACION_PRIMA'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	total = json.length - 1;
    	    	$("#DATO_PRIMAS").html(" <b>" + validarCampoVacio(formatearMoneda(json[total]['P_TF_PRIMA_TOTAL_INB_PRIMA_TOTAL'])) +"</b>");
    	    	$("#DATO_PRIMAS_ANUAL").html("<b>"+validarCampoVacio(formatearMoneda(json[total]['P_TF_PRIMA_TOTAL_INB_VARIACION_PRIMA_TOTAL']))+ "</b>");

    	    	$("#DATOS_MODAL_PRIMA").html("Cobertura #<b>"+valorPoliza+" - "+valorCertificado+" - "+valorEndoso+"</b>");
    	    	$("#DATOS_IMAGEN_ICONO").html(valorImagen);

    	    	
    	    	
			//Abre el modal
			$("#primaCertificadoPopUp").modal({
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
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function abrirModalComponenteCertificado(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var valorImagen=document.getElementById("imagenIconoCertificado").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosComponente',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal, endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	     		var d1 = document.getElementById("valorComponentesPolizaCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COMP_INB_COMPONENTE'])) +'</h6></td>'+
		            '<td class="td-grilla" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_COMP_CASB_TA_COMPONENTE']) +'</h6></td>'+
		            '<td class="td-grilla" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COMP_CASB_MT_COMPONTE'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>'; 
    	    	$("#DATOS_IMAGEN_ICONO_COMPONENTE").html(valorImagen);
    	    	$("#DATOS_COMPONENTE").html("Componentes<b> #"+valorCertificado+" - "+valorPoliza+" - "+valorEndoso+"</b>");


    	    	
    	    	
			//Abre el modal
			$("#componenteCertificadoPopUp").modal({
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
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};





function abrirModalIIBBCertificado(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var valorImagen=document.getElementById("imagenIconoCertificado").value;
	
	
	
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosIIBB',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal, endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	     		var d1 = document.getElementById("datosIIBBCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length-1 ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_COMP_INB_COMPONENTE']) +' - '+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COMP_INB_COMPONENTE'])) +'</h6></td>'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_COMP_CASE_TA_COMPONENTE'])+'</h6></td>'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COMP_CASE_MT_COMPONENTE'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo;  
    	    	total = json.length - 1;
    	    	$("#DATOS_IIBB").html("IIBB de la p&oacute;liza : <b>#"+valorPoliza+"</b>");

    	    	$("#DATO_IBB_CLIENTE").html(" <b>" + validarCampoVacio(json[total]['P_TF_CABECERA_CACE_CACN_NU_CEDULA_RIF']) +"</b>");
    	    	$("#DATO_IBB_PERSONA").html("<b>"+validarCampoVacio((json[total]['P_TF_CABECERA_CACE_CABU_NU_PERSONA']))+ "</b>");
    	    	$("#DATO_IBB_CUIT").html("<b>"+validarCampoVacio((json[total]['P_TF_CABECERA_CABU_NU_CUIT']))+ "</b>");
    	    	$("#DATO_IBB_ASEGURADO").html("<b>"+validarCampoVacio(primeraLetraMayus(json[total]['P_TF_CABECERA_INB_ASEGURADO']))+ "</b>");


    	    	
			//Abre el modal
			$("#IIBBCertificadoPopUp").modal({
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
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function abrirPopUpAcredoresCertificadoHome(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;	
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'acredoresModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosAcredoresCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_CRAC_CAAC_CD_ACREEDOR']) +' - ' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_ACREEDOR'])) +'</h6></td>'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRAC_CRCA_CD_OBJETO'])) +' - ' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_OBJETO'])) +'</h6></td>'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_INB_CRCA_TP_ACREEDOR']) +'</h6></td>'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRAC_PO_PARTICIPACION'])) +'</h6></td>'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRAC_FE_EXCLUSION'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo;
    	    	$("#DATO_ACREEDOR_CER").html("Acreedores del endoso <b>#"+valorEndoso+"</b>");

    	    	
	$("#acreedoresCertificadoPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    },
	 
	   
	});
	

};



function abrirPopUpListaBienesCertificadoHome(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;	
	bloquearPantallaGris();
	$.ajax({
	    url : 'listaBienesModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("listaBienesParametricosCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_CRLB_CROB_CD_OBJETO']) +' - ' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_OBJETO'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CRLB_DESCRIPCION'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRLB_NU_UNIDADES'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_CRLB_CRMA_CD_MARCA']) +' - ' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_MARCA'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRLB_SERIAL'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PARAM_CRLB_VALOR_TOTAL'])) +'</h6></td>'+
		            
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo;
    	    	$("#DATO_LISTABIENES_CER").html("Objetos del endoso <b>#"+valorEndoso+"</b>");

    	    	
	$("#listaBienesCertificadoPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};



function abrirPopUpAnexosCertificadoHome(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'anexosLineaModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    try {
        	    		
    	    	var d1 = document.getElementById("selectorLineasCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_PARAM_INB_LINEA_ANEXOS']+'"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_INB_LINEA_ANEXOS']) +" - "+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_LINEA'])) +'</h6></option>';
    	    	}
    	    	
    	    	d1.innerHTML =panelNuevo;
	
    	    	$("#DATO_ANEXO_CERTIFICADO").html("Anexos del endoso<b>#" + valorEndoso + "</b>");
    	    	

    	    	
    	    	mostrarClausulasCertificado();

				$("#anexoCertificadoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});

		}
		catch(e)
		{
	    	mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
			
		}
		$.unblockUI();
		
		
		},
	error : function(xhr, status) {
		mostrarError(xhr['responseText']);
	},


	});


	};



function mostrarClausulasCertificado(){
	bloquearPantallaGris();
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var select = document.getElementById('selectorLineasCertificado');
	var linea = select.options[select.selectedIndex].value;	
	$.ajax({
	    url : 'anexosClausulaModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso,linea:linea},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		var d1 = document.getElementById("datosClausulasCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" id="textoCer'+int+'" onclick="detalleClausulaCertificado('+int+');" class="textoCards tr-grilla">'+
		            '<td class="td-grilla-anexoCertificado"  role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_INB_CD_CLAUSULA'])+'</h6></td>'+
		            '<td class="td-grilla-anexoCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_CLAUSULA'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
		    	$("#valorTextoClausulaCotizacion").html("<b>Seleccione una clausula...</b>");

    	    	
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	       	var d1 = document.getElementById("datosAnexosClausulas");
	    	d1.innerHTML = '<tr><td style="width:100%;"><h5 style="border:none;padding-top:40px;text-align:center;"> No posee <b>clausulas</b> el endoso seleccionado. </h5></td></tr>';
	    	$.unblockUI();
	    }
	   
	});
	

};


function detalleClausulaCertificado(card){
	bloquearPantallaGris();
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var select = document.getElementById('selectorLineasCertificado');
	var linea = select.options[select.selectedIndex].value;	
	$.ajax({
	    url : 'anexosClausulaModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso,linea:linea},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
			try{
		    	$("#valorTextoClausulaCotizacion").html("<b>" +validarCampoVacio(primeraLetraMayus(json[card]['P_TF_PARAM_INB_DE_TEXTO'].toLowerCase()))+"</b>");

		    	$(".textoCards").each(function(){
			 	    $(this).css("background","white");
			 	});
				
				$('#textoCer'+card).css("background","#bac2bb");
		    	
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9118716.',e);
	    		
	    	}
			$.unblockUI();
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function mostrarTextosCertificado(){
	bloquearPantallaGris();

	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	$.ajax({
	    url : 'textoModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosTextoCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" id="textoCertificado'+int+'" onclick="detalleTextosCertificado('+int+');" class="textoCards tr-grilla">'+
    	    		'<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_PARAM_CPOT_NU_CONSECUTIVO'])+'</h6></td>'+
    	    		'<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_PARAM_CPOT_CRTX_CD_TEXTO'])+'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CPOT_FE_DESDE'])) +'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CPOT_FE_HASTA'])) +'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_PARAM_CPOT_IN_IMPRESION'])+'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_PARAM_CPOT_IN_IMP_RENOVACION'])+'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CPOT_DE_BREVE'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
    	    	
    	    	$("#DATO_TEXTO_CER").html("Textos del endoso <b>#"+valorEndoso+"</b>");
    	    	$("#valorTextoCertificado").html("<b>Seleccione un texto...</b>");

    	    	
    	    	$("#textosCertificadoPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};

function detalleTextosCertificado(card){
	bloquearPantallaGris();
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	
	bloquearPantallaGris();
	$.ajax({
		   url : 'textoModalCertificado',
		    contentType: 'application/json', 
		    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
			try{
		    	$("#valorTextoCertificado").html(validarCampoVacio(primeraLetraMayus(json[card]['P_TF_PARAM_CPOT_DE_TEXTO'].toLowerCase())));
		    	$('#textoCertificado').val(primeraLetraMayus(json[card]['P_TF_PARAM_CPOT_DE_TEXTO'].toLowerCase()))
		    	$(".textoCards").each(function(){
			 	    $(this).css("background","white");
			 	});
				
				$('#textoCertificado'+card).css("background","#bac2bb");
		    	
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9118716.',e);
	    		
	    	}
			$.unblockUI();
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function mostrarBeneficiariosCertificado(){
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;	
	$.ajax({
	    url : 'beneficiarioModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosBeneficiariosCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="reaseguroCards tr-grilla">'+
    	    		'<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_CRBE_TP_DOCUMENTO'])+' - '+validarCampoVacio(json[int]['P_TF_PARAM_CRBE_NU_DOCUMENTO'])+'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CRBE_NM_NOMBRES'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRBE_CD_PARENTESCO'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRBE_PO_PARTICIPACION'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CRBE_FE_INCLUSION'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CRBE_FE_NACIMIENTO'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CRBE_FE_EXCLUSION'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CRBE_DE_OBSERVACIONES'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
    	    	$("#DATO_BENEFICIARIOS_CER").html("Beneficiarios del bien <b>#"+valorSelect+"</b>");

    	    	
    	    	$("#beneficiariosCertificadoPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};




function mostrarUbicacionesCertificadoModal(){
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;	
	$.ajax({
	    url : 'ubicacionModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosUbicacionCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CRDB_FE_EFECTIVA'])) +'</h6></td>'+
    	    		'<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_PARAM_CRDB_CALLE']))+'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_NUMERO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_PISO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_DEPTO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_NU_TELEFONO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_NU_FAX'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_GECP_NU_POSTAL'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_LOCALIDAD'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_DE_MUNICIPIO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_DE_PROVINCIA'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_DE_PAIS'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
    	    	$("#DATO_UBICACION_CER").html("Ubicaciones del bien <b>#"+valorSelect+"</b>");

    	    	
    	    	$("#ubicacionCertificadoPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};





function mostrarAlarmaCertificadoModal(){
	var alarma=document.getElementById("valorAlarmaCertificadoHome").value;
	$.ajax({
	    url : 'alarmaModalCertificado',
	    contentType: 'application/json', 
	    data : {identificador:alarma},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosAlarmaCertificado");
    	    	d1.innerHTML = '';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CEAN_CAME_TP_TRANSAC'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CEAJ_CD_PRESTADOR'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CEAK_CD_IDENTIFICADOR'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CEAK_GEED_NU_PROCESO'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CEAJ_FE_PROCESO'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CEAK_TP_MOVIMIENTO'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_TP_SALIDA'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CEAK_FE_INSTALACION'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
    	    	$("#DATO_ALARMA_CER").html("Alarmas del bien");

    	    	
    	    	$("#alarmaCertificadoPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};






function mostrarDispSatelitalCertificadoModal(){
	var prestador=document.getElementById("valorPrestadorCertificadoHome").value;
	var identificador=document.getElementById("valorIdentificadorCertificadoHome").value;
	$.ajax({
	    url : 'dispSatelitalModalCertificado',
	    contentType: 'application/json', 
	    data : { prestador:prestador,identificador:identificador},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		llenarDinamicamente(json[0]);
    	    	$("#DATO_SATELITICAL_CER").html("Dispositivo Satelital");

    	    	
    	    	$("#dispSatelitalCertificadoPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:19121812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};

function mostrarLibredeudaModal(){
	
	bloquearPantallaGris();

	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	
	
	$("#DATO_RAMO_CER_DEUDA").html("<b>" +valorRamo+"</b>");
	$("#DATO_POLIZA_CER_DEUDA").html("<b>" +valorPoliza+"</b>");
	$("#DATO_SUCURSAL_CER_DEUDA").html("<b>" +valorSucursal+"</b>");
	$("#DATO_CER_CER_DEUDA").html("<b>" +valorCertificado+"</b>");

	
	$("#libreDeudaPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	$.unblockUI();

}

function enviarEmailLibredeudaModal(){
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEmail=document.getElementById("emailLibreDeuda").value;
	
	bloquearPantallaGris();
	
	$.ajax({
	    url : 'libreDeudaModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,sucursal:valorSucursal,certificado:valorCertificado,email:valorEmail},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    	
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:19121812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
  				swal({
				  type: 'success',
				  title: 'Email Enviado!',
				});
	    	$.unblockUI();
	    }
	   
	});
	

};




function inicioCertificadoHome() {
	bloquearPantallaGris();
	$( "#timeLineItemEndoso1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );

});
	$.unblockUI();

}


function mostrarBotonesCertificado(){
	
	$(".mostrarBotonCer").each(function(){
		$(this).css("display","");
		
	});
	
	$("#btnVerMasBotonesCer").css("display", "none");
	
}

function irAPoliza(){
	
	var poliza = document.getElementById("valorPolizaCertificadoHome").value;
	var ramo = document.getElementById("valorRamoCertificadoHome").value;
	var sucursal = document.getElementById("valorSucursalCertificadoHome").value;
	
	bloquearPantallaGris();
	
	location.href = "/PSPES/homePoliza?"+"poliza="+poliza+"&ramo="+ramo+"&sucursal="+sucursal;
}

function descargarExcelTextoCertificado()
{
	var texto = document.getElementById("textoCertificado").value;

    location.href = "/PSPES/descargarArchivoExcelTextosCertificados?texto="+texto;
};
function mostrarPolizaClienteHome(obj,endoso,numeroEndoso,tipoEndoso,imagenPoliiza,poliza,ramo,sucursal)
{
	var valorCliente=document.getElementById("valorCliente").value;
	bloquearPantallaGris();

	$.ajax({
	    url : 'datosPoliza',
	    contentType: 'application/json', 
	    data : {ramo : ramo , poliza : poliza, sucursal:sucursal  },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{	    	
	    		
	    		

	    	$("#datoTmp").val(JSON.stringify(json));
	    	
	    	var iconoHtml="<i class='material-icons' style='display:inline;color:#00317A;font-size:14px;cursor:pointer;'>arrow_drop_up</i>";
	    	
	    	llenarDinamicamente(json);
	    	
	    	var fechaDesde = formatearFechaJson(json['P_TF_POLI_CACE_FE_DESDE']);
	    	$("#productorClienteHome").val(json['P_TF_POLI_CACE_CAPD_CD_PRODUCTOR']);
	    	$("#sucursalClienteHome").val(json['P_TF_POLI_CACE_CASU_CD_SUCURSAL']);

	    	
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_ASEGURADO").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_ASEGURADO']) + "</b>");

			$("#INFO_FECHA_DESDE_P_TF_POLI_CACE_FE_DESDE").html("<b>" + fechaDesde +"&nbsp;al&nbsp;"+ "</b>");
			$("#INFO_FECHA_DESDE_B_P_TF_POLI_CACE_FE_DESDE").html("<b>" + fechaDesde +"&nbsp;al&nbsp;"+ "</b>");
			$("#INFO_CLIENTE_P_TF_POLI_INB_DSP_ASEGURADO").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_ASEGURADO'].toLowerCase()) + "</b>");
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_ASEGURADO").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_ASEGURADO'].toLowerCase()) + "</b>");
			$("#INFO_CLIENTE_P_TF_POLI_INB_DSP_PRODUCTOR").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_PRODUCTOR'].toLowerCase()) + "</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_PRODUCTOR").html("<b>" +primeraLetraMayus(json['P_TF_POLI_INB_DSP_PRODUCTOR'].toLowerCase()) + "</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#INFO_CLIENTE_P_TF_POLI_INB_DSP_SUCURSAL").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_SUCURSAL'].toLowerCase()) + "</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_SUCURSAL").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_SUCURSAL'].toLowerCase())+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#INFO_CLIENTE_P_TF_POLI_INB_DSP_RAMO").html("<b>"+json['P_TF_POLI_CACE_CARP_CD_RAMO'] +"&nbsp;-&nbsp;"+ verificarCampoJson(json['P_TF_POLI_INB_DSP_RAMO'].toLowerCase())+ "</b>");
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_RAMO").html("<b>"+json['P_TF_POLI_CACE_CARP_CD_RAMO'] +"&nbsp;-&nbsp;"+ verificarCampoJson(json['P_TF_POLI_INB_DSP_RAMO'].toLowerCase())+ "</b>");
			$("#DATO_FACTURACION_POLIZA_CLIENTEHOME").html("<b>"+json['P_TF_POLI_INB_TP_FACTURACION'] + "</b>");
			$("#DATO_PROMO_POLIZA_CLIENTEHOME").html("<b>"+json['P_TF_POLI_INB_PROMOCION'] + "</b>");
		    
			$("#DATO_PLAN_PAGO_A").html("<b>"+verificarCampoJson(json['P_TF_POLI_CACE_CAMD_CD_MEDIO_PAGO'])+" - "+ verificarCampoJson(json['P_TF_POLI_INB_MEDIO_PAGO'])+ "</b>");
			$("#DATO_PLAN_PAGO_B").html("<b>"+verificarCampoJson(json['P_TF_POLI_CACE_CAMD_CD_MEDIO_PAGO'])+" - "+ verificarCampoJson(json['P_TF_POLI_INB_MEDIO_PAGO'])+ "</b>");
		    
			$("#DATO_ORIGEN_PAGO_A").html("<b>"+verificarCampoJson(primeraLetraMayus(json['P_TF_POLI_CACE_COTC_CD_ORIGEN']))+" - "+ verificarCampoJson(primeraLetraMayus(json['P_TF_POLI_INB_ORIGEN']))+ "</b>");
			$("#DATO_ORIGEN_PAGO_B").html("<b>"+verificarCampoJson(primeraLetraMayus(json['P_TF_POLI_CACE_COTC_CD_ORIGEN']))+" - "+ verificarCampoJson(primeraLetraMayus(json['P_TF_POLI_INB_ORIGEN']))+ "</b>");
		    
			
			
			//muestra panel D setea img y titulo
			
			$('#panelb').hide();
			$('#panela').show();
			$('#verMasPanelA').text('Ver mas');
			
			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$(".timeline__date").each(function(){
		 	    $(this).css("background","white");
		 	});
			
			$('#'+obj).css("background","#bac2bb");
			$('#'+endoso).show();
			$('#labelPanelEndoso').html("P&oacute;liza #" + ramo+ " - " + poliza );
			var imgTimeLine = $('#imgTimeLineEndoso'+numeroEndoso).attr("src");
			$('#imgCliente').attr('src',imgTimeLine);
			$('#imgClientes').attr('src',imgTimeLine);

			var d1 = document.getElementById("panelImagenEndoso");
			d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+imagenPoliiza+'</i>'; 
			
			var d2 = document.getElementById("botonPoliza");
			d2.innerHTML = '<a class="btn btn-panela-poliza  btn-social btn-bitbucket  material-icons inspeccionesBotonHoover"  data-placement="bottom" data-toggle="tooltip" title="Poliza" style="margin-right:5px;font-size:20px; margin-top:5px;margin-bottom:5px;height:30px;padding-bottom:5px;padding-top:1px;color:#ffffff;background-color:#205081" onclick="detallePolizaClienteHome();">play_arrow</a>';
	    	}
	    	catch (e)
	    	{
	    		alert('Se produjo un inconveniente al mostrar la poliza el error generado es:'+e);
	    	}
			
			
			//agregar ajax siniestro aca	
	    	
	    	bloquearPantallaGris();
    	$.ajax({
    	    url : 'datosSiniestro',
    	    contentType: 'application/json', 
    	    data : {  ramo : ramo , poliza : poliza , cliente : valorCliente,sucursal:sucursal },
    	    type : 'GET',
    	    dataType : 'json',
    	    success : function (json) {
    	    	
    	    	try {
					
    	    	$('#cantSiniestros').text("Siniestros (" + json.length + ")");	    	    	
    	    	
    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
    	    	$('#cantSiniestros').parent().next().append('<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE02f;</i>');
    	    	
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");
    	    	var d1 = document.getElementById("caruMayor");
    	    	d1.innerHTML = ' ';
    	    	  
    	    	if(json.length < 40){
    	    		
    	    		var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
    	    		
    	    	
    	    	for ( var int = 0; int < json.length; int++) {
    	    	
    	    		var num=int+1;
    	    		var popUp= "'siniestroPopUp'";
    	    		var nroCer= 'nroSiniestro'+num;
    	    		var DatoCer= 'datoSiniestro'+num;
    	    		
    	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'" onclick="abrirModalDetalleSiniestro('+json[int]['P_TF_SINI_SISI_NU_SINIESTRO']+','+json[int]['P_TF_SINI_SISI_CARP_CD_RAMO']+','+1+');" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#39b3d7; border-style: solid; box-shadow: 0 0 0px black;"><h6 id='+nroCer+' style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#39b3d7;color:#ffffff;">#'+json[int]['P_TF_SINI_SISI_NU_SINIESTRO']+' </h6><h6 style="margin-top:2%;" id='+DatoCer+' class="datoSiniestroCarusel"><b>'+json[int]['P_TF_SINI_SISI_CARP_CD_RAMO']+'&nbsp;-&nbsp;'+json[int]['P_TF_SINI_SISI_CAPO_NU_POLIZA']+'</b></h6><h6 style="margin-top:2%;" id='+DatoCer+' class="datoSiniestroCarusel">'+json[int]['P_TF_SINI_INB_DSP_BIEN']+'</h6><h6 style="margin-top:2%;" id='+DatoCer+' class="datoSiniestroCarusel">'+json[int]['P_TF_SINI_SISI_FE_OCURRENCIA']+'</h6><br></div>';
	    	    	    	    	
    	    	}
    	    	d1.innerHTML = caruNuevo;  
    	    	}
    	    	else{
    	    		var caruNuevo = '<div style="text-align:center; padding-left:25px;">';

    	    		caruNuevo = caruNuevo + '<div class="row" style="text-align:center;width:100%;margin-top:15px;">'+
    	    								'<div class="col-lg-12" style="text-align: center;">'+
    	    								'<a class="btn btn-panela-poliza  btn-social btn-bitbucket"  onclick="redirecGoSiniestro('+ramo+');" style="margin-right:5px;font-size:15px; margin-top:5px;margin-bottom:5px;height:30px;padding-bottom:5px;padding-top:1px;color:#ffffff;background-color:#39b3d7">Ver Siniestros</a>'+
    	    								'</div></div>';
    	    				    	    	d1.innerHTML = caruNuevo;  
	
    	    	}
    	    	
    	    	activarCaru();
    	    	} catch (e) {
    	    		// TODO: handle exception
    	    	}
    	    	
    	    	$.unblockUI();
    	    },
    		 
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	        //alert('Disculpe, no existen certificados para el endoso seleccionado');
    	    	$('#cantCertificados').text("Certificados");	    	    	
    	    	$('#cantSiniestros').text("Siniestros");
    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
    	    	$('#cantSiniestros').parent().next().append('<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE611;</i>');
    	    	
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");
    	        document.getElementById("micaru").innerHTML = request.responseText; 
    	    	
    	    },
    	 
    	   
    	});
	    	
	    
	    	
	    	
	    	
	    },
	 
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    }
	    
	 
	   
	});
	



}



function abrirModalClienteHome(cliente){
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosCliente',
	    contentType: 'application/json', 
	    data : {cliente:cliente} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);

			$("#INFO_NU_CLIENTE_P_TF_CLIE_CACN_NU_CEDULA_RIF").html("Cliente :&nbsp#" + json[0]['P_TF_CLIE_CACN_NU_CEDULA_RIF']);
			$("#INFO_NU_DOC_P_TF_CLIE_CABU_CATU_TP_DOCUMENTO").html("<b>" + json[0]['P_TF_CLIE_CABU_CATU_TP_DOCUMENTO'] +"&nbsp-&nbsp"+json[0]['P_TF_CLIE_CABU_NU_DOCUMENTO']+"</b>" );
			$("#DATO_P_TF_CLIE_CACN_NU_CEDULA_RIF").val(json[0]['P_TF_CLIE_CACN_NU_CEDULA_RIF']);

			//Abre el modal
			$("#clientePopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos del cliente',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};
	
function redirecClienteHome(){
	bloquearPantallaGris();
	var valorCliente = document.getElementById("DATO_P_TF_CLIE_CACN_NU_CEDULA_RIF").value;
	location.href = "/PSPES/homeCliente?nroCliente=" + valorCliente;
}

function abrirpopUpClienteProductor(){
	var valorProductor = document.getElementById("productorClienteHome").value;
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosProductorModal',
	    contentType: 'application/json', 
	    data : {productor:valorProductor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);

			$("#DATO_P_TF_PROD_CAPD_NM_PRODUCTOR").html("<b>#" + json[0]['P_TF_PROD_CAPD_CD_PRODUCTOR']+" - "+primeraLetraMayus(json[0]['P_TF_PROD_CAPD_NM_PRODUCTOR'])  +"</b>" );
			$("#DATO_P_TF_PROD_CAPD_NM_PRODUCTOR_REDIRECT").val(json[0]['P_TF_PROD_CAPD_CD_PRODUCTOR']);

			//Abre el modal
			$("#productorPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos del productor',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};
	



function abrirpopUpClienteSucursal(){
	var valorSucursal = document.getElementById("sucursalClienteHome").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'detalleSucursal',
	    contentType: 'application/json', 
	    
	    data : {sucursal :valorSucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
			llenarDinamicamente(json[0]);
			
			$("#INFO_P_TF_LISTA_CASU_CD_SUCURSAL").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_CD_SUCURSAL'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_CAEM_CD_CENTRO_EMISOR").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_CAEM_CD_CENTRO_EMISOR'])+ " - " + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_CENTRO_EMISOR']))+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_TELEFONO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_TELEFONO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_NU_TELEFONO3").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_NU_TELEFONO3'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_EMAIL").html("<b>" + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_EMAIL']))+ "</b>");
			
			$("#INFO_P_TF_LISTA_CASU_DE_CALLE").html("<b>" + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_CALLE']))+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_NUMERO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_NUMERO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_PISO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_PISO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_DEPARTAMENTO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_DEPARTAMENTO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_CAGI_CD_REGION").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_CAGI_CD_REGION'])+ " - " + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_REGION'])) + "</b>");

			$("#DATO_SUCURSAL_POLIZA").html("<b>" + primeraLetraMayus(json[0]['P_TF_LISTA_CASU_DE_SUCURSAL'])+ "</b>");
			
			$("#sucursalPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
				
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente, al cargar la sucursal de la poliza. Error:'+e);
	    	}
	    	
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
};


function buscadorPanelPolizaClienteHome() {
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaPolizasCliente");
	  filter = input.value.toUpperCase();
	
	  $(".datoPolizacliente").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("etiquetaPolizaCliente", "panelModalClientePolizas");
		  var idCardParteB = idH6.replace("etiquetaPolizaCliente", "panelModalClientePolizas");
		  
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
	

function redirecGoSiniestro(ramo){
	bloquearPantallaGris();
	var valorCliente=document.getElementById("valorCliente").value;
	location.href = "/PSPES/go?dato="+valorCliente+"&entidades=001000&p1="+ramo+"&p2=3008&p3=0";
	$.unblockUI();

}




//---------------------------------------------------DIRECCIONES HOME EMPIEZA ACA -------------------------------------------------------------------->
function inicioDireccionesHome()
{
	$( "#timeLineItemContacto1" ).trigger( "click" );
}


function verDatosContactoPorCliente(){
	
	var valorCliente = document.getElementById("valorCliente").value;
	abrirPopUpContacto("", valorCliente, "", "", 'obtenerContactoPorCliente');

}

function verDatosDetalleRemesaPorCliente(){
	
	var cliente = document.getElementById("valorCliente").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'existeDetalleRemesaCliente',
	    contentType: 'application/json', 
	    
	    data : {nroCliente : cliente} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    		location.href="/PSPES/homeDetalleRemesaPorCliente?nroCliente="+ cliente;
				
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente al verificar remesa. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}


function inicioClienteHome(){
	
	activarCaru();
	
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
});
	
	
}function mostrarDetalleConcepto(obj,card,concepto)
{	
	
		var valorConcepto = document.getElementById("valorConceptoCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    url : 'datosDetalleConcepto',
		    contentType: 'application/json', 
		    
		    data : {concepto :valorConcepto} ,
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    	$.unblockUI();
		    	var cardValor = card -1;
				llenarDinamicamente(json[cardValor]);
				
				$('#panelb').hide();
				$('#panela').show();
				$('#verMasPanelA').text('Ver mas');
				
				$(".seleccionPanelB").each(function(){
			 	    $(this).css("background","white");
			 	});
				$(".timeline__date").each(function(){
			 	    $(this).css("background","white");
			 	});
				
				$('#'+obj+card).css("background","#bac2bb");
				$('#panelDetalleConcepto').show();
				$('#labelPanelConcepto').html("Informacion del Concepto #" + concepto);
				
		    	} catch (e) {
		    		mostrarError('Se genero un inconveniente, al cargar la sucursal de la poliza. Error:'+e);
		    	}
		    	
				
		    },
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
	};

		
	function inicioCompromisoHome() {
		bloquearPantallaGris();
		activarCaru();
		$( "#timeLineItemConceptos1" ).trigger( "click" );
		shortcut.add("esc",function() {
			$( ".cerrarModalBotonHoover" ).trigger( "click" );
		})
		$.unblockUI();
	
}
	
	function abrirPopUpBeneficiarioCompromisoHome(compromiso,numeroCard){
		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosDetalleBeneficiarioCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : compromiso},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    	$.unblockUI();
		    	var card=numeroCard -1 ;
		    	llenarDinamicamente(json[card]);

				$("#DATO_BENEFICIARIO").html("Beneficiaro <b>#" + json[card]['P_TF_COMPR_CJCR_BENEFICIARIO']+"</b>" );
				$("#DATO_FACTURA_BENEF").html("<b>" + json[card]['P_TF_COMPR_CJCR_TP_FACTURA']+" - " + json[card]['P_TF_COMPR_INB_DES_TP_FACTURA']+"</b>" );

				//Abre el modal
				$("#beneficiarioPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}
		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos del beneficiario',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};
	
	
	
	function abrirPopUpFormaDePagoCompromisoHome(){
		var valorConcepto = document.getElementById("valorCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosFormaPagoCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : valorConcepto},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    	$.unblockUI();
		    	llenarDinamicamente(json[0]);

				$("#DATO_FORMAPAGO_COMPROMISO").html("Forma de Pago <b>#" + valorConcepto );
				$("#DATO_FORMAPAGO_DESC").html("<b>" + validarCampoVacio(json[0]['P_TF_COMPR_CJCR_CD_FORMA_PAGO'])+ " - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COMPR_INB_DESC_FORMA_PAGO']))+"</b>" );
				$("#DATO_BANCO_FORMAPAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_COMPR_CJCR_CABA_CD_BANCO'])+ " - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COMPR_INB_DESC_BANCO']))+"</b>" );
				$("#DATO_SUC_FORMAPAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_COMPR_CJCR_CABS_NU_SUC_BANCO'])+ " - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COMPR_INB_DESC_SUC_BANCO']))+"</b>" );
				$("#DATO_TP_CUENTA_FORMAPAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_COMPR_CJCR_TP_CUENTA'])+ " - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COMPR_INB_DESC_TP_CUENTA']))+"</b>" );

				
				//Abre el modal
				$("#formaPagoCompromisoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}
		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos del beneficiario',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};
	
	
	
	

	function abrirPopUpAsociacionesCompromisoHome(){
		var valorConcepto = document.getElementById("valorCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosAsociacionesCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : valorConcepto},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		var d1 = document.getElementById("datosAsociacionesCompromiso");
	    	    	d1.innerHTML = ' ';
	    	    	var panelNuevo = ' ';
	    	    	
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_CALI_NU_LIQUIDACION']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_CJND_NU_NOTA']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_CJIN_NU_INGRESO']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_NU_SECUENCIA']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_MT_CANCELADO']) +'</td>'+
			            '</tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo + '</tr>';

	    	    	$("#DATO_ASOCIACIONES_COMPROMISO").html("Asociaciones #<b>"+valorConcepto+"</b>");

	    	    	$.unblockUI();
				//Abre el modal
				$("#asociacionesCompromisoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}

		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos del beneficiario',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};

	
	

	function abrirPopUpErrorCompromisoHome(){
		var valorConcepto = document.getElementById("valorCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosErroresCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : valorConcepto},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		var d1 = document.getElementById("datosErrorCompromiso");
	    	    	d1.innerHTML = ' ';
	    	    	var panelNuevo = ' ';
	    	    	
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_NU_ORDEN']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_CJDP_CD_DEPARTAMENTO']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_NU_SECUENCIA']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_CJCR_NU_COMPROMISOS']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_DE_ERROR']) +'</td>'+
			            '</tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo + '</tr>';

	    	    	$("#DATO_ERROR_COMPROMISO").html("Errores #<b>"+valorConcepto+"</b>");

	    	    	$.unblockUI();
				//Abre el modal
				$("#ErrorCompromisoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}

		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos de los errores',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};
	
	

	function abrirPopUpCronogramaCompromisoHome(){
		var valorConcepto = document.getElementById("valorCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosCronogramaCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : valorConcepto},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		var d1 = document.getElementById("datosCronogramaCompromiso");
	    	    	d1.innerHTML = ' ';
	    	    	var panelNuevo = ' ';
	    	    	
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_COMPR_CJPA_CJCR_FE_CAMBIO'])) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJPA_MT_IMPORTE_ORIGINAL']) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJPA_CATA_TASA_CAMBIO']) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJPA_CJCR_NU_COMPROMISO']) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJPA_PO_DISTRIBUCION']) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_INB_DESC_MONEDA']) +'</td>'+
				           
			            '</tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo + '</tr>';

	    	    	$("#DATO_CRONOGRAMA_COMPROMISO").html("Cronograma #<b>"+valorConcepto+"</b>");

	    	    	$.unblockUI();
				//Abre el modal
				$("#cronogramaCompromisoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}

		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos de los errores',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};function mostrarPanelCotizacion(idPanel,idBoton)
{
	mostrarPanel(idPanel,idBoton);
};


function mostrarDetalleCotizacionHome(obj,numeroCard,icono, nroConsecutivo, nroCotizacion){
	
	
	$.ajax({
	    url : '/PSPES/detalleCotizacion',
	    contentType: 'application/json', 
	    data : { cotizacion : nroCotizacion , consecutivo: nroConsecutivo },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		
	    		document.getElementById("valorConsecutivo").value=nroConsecutivo;
	    		
	    		$('#INFO_P_TF_COTI_CAZB_CD_UBICACION_VENTA').html('<b>' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_CAZB_CD_UBICACION_VENTA'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_TP_CALCULO').html('<b>' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_CAZB_TP_CALCULO'])) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_TP_CALCULO'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_MT_PREMIO_INFORMADO').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_MT_PREMIO_INFORMADO']));
	    		$('#INFO_P_TF_COTI_CAZB_CAES_CD_PROVINCIA').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CAES_CD_PROVINCIA']) + ' - ' + validarCampoVacio(json['P_TF_COTI_INB_PROVINCIA']) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_CAMD_CD_MEDIO_PAGO').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CAMD_CD_MEDIO_PAGO']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_MEDIO_PAGO'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_COTC_CD_ORIGEN').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_COTC_CD_ORIGEN']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_ORIGEN'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_IN_RENOVACION').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_IN_RENOVACION']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_IN_RENOVACION'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_CAPD_CD_PRODUCTOR').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CAPD_CD_PRODUCTOR']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_DSP_PRODUCTOR'])) +'</b>'+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
	    		$('#INFO_P_TF_COTI_CAZB_CALG_CD_PLAN_PAGO').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CALG_CD_PLAN_PAGO']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_PLAN_PAGO'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_FR_PAGO_ELEGIDA').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_FR_PAGO_ELEGIDA']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_FR_PAGO'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_CAMO_CD_MONEDA').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CAMO_CD_MONEDA']) + ' - ' + validarCampoVacio(json['P_TF_COTI_INB_CD_MONEDA']) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_CAPO_CD_RAMO').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CAPO_CD_RAMO']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_DSP_RAMO'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_CACN_CD_CLIENTE').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CACN_CD_CLIENTE']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_CAZB_NM_SOLICITANTE'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_CAPO_NU_POLIZA').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CAPO_NU_POLIZA']) + '</b>' + "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
	    		$('#INFO_P_TF_COTI_CAZB_CAPU_CD_PRODUCTO').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CAPU_CD_PRODUCTO']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_CD_PRODUCTO'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_CAUS_CD_USUARIO').html('<b>' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_CAZB_CAUS_CD_USUARIO'])) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_DE_USUARIO'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_CAPO_CD_SUCURSAL').html('<b>' + validarCampoVacio(json['P_TF_COTI_CAZB_CAPO_CD_SUCURSAL']) + ' - ' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_DSP_SUCURSAL'])) +'</b>');
	    		$('#INFO_P_TF_COTI_INB_ESTADO_COTI').html('<b>' + validarCampoVacio(primeraLetraMayus(json['P_TF_COTI_INB_ESTADO_COTI'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_FE_DESDE_TECNICA').html('<b>' + validarCampoVacio(formatearFechaJson(json['P_TF_COTI_CAZB_FE_DESDE_TECNICA'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_FE_HASTA_TECNICA').html('<b>' + validarCampoVacio(formatearFechaJson(json['P_TF_COTI_CAZB_FE_HASTA_TECNICA'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_FE_DESDE').html('<b>' + validarCampoVacio(formatearFechaJson(json['P_TF_COTI_CAZB_FE_DESDE'])) +'</b>');
	    		$('#INFO_P_TF_COTI_CAZB_FE_HASTA').html('<b>' + validarCampoVacio(formatearFechaJson(json['P_TF_COTI_CAZB_FE_HASTA'])) +'</b>');
	    		
	    		
	    		$("#valorRamoCotizacion").val(json['P_TF_COTI_CAZB_CAPO_CD_RAMO']);
	    		$("#valorMonedaCotizacion").val(json['P_TF_COTI_CAZB_CAMO_CD_MONEDA']);
	    		$("#valorPolizaCotizacion").val(json['P_TF_COTI_CAZB_CAPO_NU_POLIZA']);
	    		$("#valorProductorCotizacion").val(json['P_TF_COTI_CAZB_CAPD_CD_PRODUCTOR']);
	    		$("#valorSucursalCotizacion").val(json['P_TF_COTI_CAZB_CAPO_CD_SUCURSAL']);

	    		  		
	    		$(".timeline__post").each(function(){
    		 	    $(this).css("background","white");
    		 	});
    	    	
    			$('#timeLineCertificadoCotizacion'+nroConsecutivo).css("background","#bac2bb");
    			
    			var il= document.getElementById("headerCotizacion");
    			il.innerHTML = 'Cotizacion ' + '<b>'+ '#'+ nroCotizacion+ '</b>' + ' - ' + ' Certificado ' + '<b>'+'#' + nroConsecutivo+'</b>';
	    		
    			mostrarComponentesCotizacion(nroCotizacion, nroConsecutivo);
		    	bienesCoti(nroCotizacion,nroConsecutivo);
		    	$("#selectorBienCotizacion").val(0);
    			
	    	} catch (e) {
	    		mostrarError('Code 778 : No pudo cargar la cotizacion');
	    	}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('33 - Se a producido un inconveniente al obtener la cotizacion de certificado!');
	    },
	   
	});
	
}

function mostrarComponentesCotizacion( nroCotizacion, nroConsecutivo){
	bloquearPantallaGris();

	$.ajax({
	    url : '/PSPES/detalleComponentes',
	    contentType: 'application/json', 
	    data : { cotizacion : nroCotizacion , consecutivo: nroConsecutivo },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		
	    		var d1 = document.getElementById("datosComponenteCotizacion");
    	    	d1.innerHTML = ' ';

    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.componentes.length ; int++) {
    	    		panelNuevo = panelNuevo + '<tr class="tr-grilla">';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-componentesModalCotizacionHome" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json.componentes[int]['P_TF_COMPONENTES_INB_COMPONENTE'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-componentesModalCotizacionHome" role="cell"><h6>'+validarCampoVacio((json.componentes[int]['P_TF_COMPONENTES_CACX_TA_COMPONENTE'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-componentesModalCotizacionHome" style="text-align:right; role="cell"><h6>'+validarCampoVacio(formatearMoneda(json.componentes[int]['P_TF_COMPONENTES_CACX_MT_COMPONENTE'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	$("#DATO_TOTAL_COMI").html("<b>" +validarCampoVacio(primeraLetraMayus(json.totales[0]['P_TF_TOTALES_INB_NIVEL_COMISIONES'])) + ' '+ validarCampoVacio(primeraLetraMayus(json.totales[0]['P_TF_TOTALES_INB_DE_NIVEL_COMISIONES']))+" </b>");
		    	$("#DATO_PREMIO_COTI").html("<b>" +validarCampoVacio(primeraLetraMayus(formatearMoneda(json.totales[0]['P_TF_TOTALES_INB_MT_SUMA_PREMIO'])))+" </b>");
		    	$("#DATO_PRIMA_COT").html("<b>" +validarCampoVacio(primeraLetraMayus(formatearMoneda(json.totales[0]['P_TF_TOTALES_INB_MT_SUMA_PRIMA'])))+" </b>");
		    	$("#DATO_SUMAPREMIO_COTI").html("<b>"+ validarCampoVacio(primeraLetraMayus(formatearMoneda(json.totales[0]['P_TF_TOTALES_INB_MT_SUMA_COMP_PREMIO'])))+" </b>");
		    	$("#DATP_PREMIO_INFORMADO_COTI").html("<b>" +validarCampoVacio(formatearMoneda(json.totales[0]['P_TF_TOTALES_INB_MT_PREMIO_INFORMADO'])) +" </b>");
		    	
		    	if(json.totales[0]['P_TF_TOTALES_INB_FUERA_PAUTA'] != ''){
		    		$("#DATP_PAUTA_COTI").html("<b style='color:#ff9064'>" +(primeraLetraMayus(json.totales[0]['P_TF_TOTALES_INB_FUERA_PAUTA']))  +" </b>");
		    	
		    	}
		    	else{
		    		$("#DATP_PAUTA_COTI").html("<b>" +(primeraLetraMayus(json.totales[0]['P_TF_TOTALES_INB_FUERA_PAUTA']))  +" </b>");
		    		
		    	}

	    	} catch (e) {
	    		mostrarError('Code 451 : No pudo cargar los componentes');
	    	}
	    	
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('Code 452 - Se ha producido un inconveniente al obtener los componentes de la cotizacion!');
	    },
	   
	});
	
}


function bienesCoti(cotizacion,consecutivo){
	bloquearPantallaGris();

	var valorRamo=document.getElementById("valorRamoCotizacion").value;
	$.ajax({
	    url : 'bienModalCoti',
	    contentType: 'application/json', 
	    data : {  ramo : valorRamo , cotizacion : cotizacion , consecutivo : consecutivo },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	
	    	try {
	    		
		    	var d1 = document.getElementById("tablaParametricosCotizacion");
		    	d1.innerHTML = '<h6 style="padding-top:60px;text-align:center;">Selecione un bien para visualizar los datos parametricos. </h6>';
	    		
	    	var d1 = document.getElementById("selectorBienCotizacion");
	    	d1.innerHTML = ' ';
	    	var pos;
	    	var panelNuevo;
	    	if(json.length>1){
	    		panelNuevo = '<option>Cantidad de bienes ('+json.length+')...</option>';
	    	}
	    	else{
	    		panelNuevo = '';
	    	}
	    	for ( var int = 0; int < json.length ; int++) {
	    		pos = int +1;
	    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_BIENES_CRCI_CD_BIEN_ASEG']+'"><h6>('+json[int]['P_TF_BIENES_CRCI_CD_BIEN_ASEG']+') '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_BIENES_INB_BIEN_ASEG'])) +'</h6></option>';
	    	}
	    	
	    	d1.innerHTML =panelNuevo;
			
	    	
	    	muestraPanelParametricosCotizacoinHome();
	    	} catch (e) {
	    		// TODO: handle exception
	    	}
	    	
	    	$.unblockUI();
	    },
		 
	    error: function (request, status, error) {
	    	var d1 = document.getElementById("tablaParametricosCotizacion");
	    	d1.innerHTML = '<h6 style="padding-top:60px;text-align:center;"> No se encontro un bien, para el certificado seleccionado. </h6>';
	    	var d1 = document.getElementById("selectorBienCotizacion");
	    	d1.innerHTML = ' <option>Seleccione un bien..</option>';
	    	$.unblockUI();

	    },
	 
	   
	});
    
	
}


function muestraPanelParametricosCotizacoinHome(){
	bloquearPantallaGris();

	var select = document.getElementById('selectorBienCotizacion');
	
	var valorSelect = select.options[select.selectedIndex].value;
	var valorCotizacion=document.getElementById("valorCotizacion").value;
	var valorConsecutivo=document.getElementById("valorConsecutivo").value;
	
	$.ajax({
	    url : 'datosParametricosCotizacion',
	    contentType: 'application/json', 
	    data : {  bien : valorSelect , cotizacion : valorCotizacion , consecutivo : valorConsecutivo },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    	var d1 = document.getElementById("tablaParametricosCotizacion");
	    	d1.innerHTML = ' ';
	    	var panelNuevo = '<div style="overflow-y:auto;"><table id="tablaParametricosCotizacion" style= "width:100%;">';
	    	for ( var int = 0; int < json.length ; int++) {
	    		pos = int +1;
	    		panelNuevo = panelNuevo + '<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_LABEL'])) +' : </td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacioNoMostrar((json[int]['P_TF_PARAM_CRCO_DATO'])) +' - '+ validarCampoVacioNoMostrar(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DATO']))+'.</b></h6></td></tr>';
	    	}
	    	d1.innerHTML =panelNuevo;
				
	    	} catch (e) {
	    		// TODO: handle exception
	    	}
	    	
	    	$.unblockUI();
	    },
		 
	    error: function (request, status, error) {
	    	var d1 = document.getElementById("tablaParametricosCotizacion");
	    	d1.innerHTML = '<h6 style="padding-top:60px;text-align:center;"> No se encontraron datos parametricos para el bien seleccionado. </h6>';
	    	$.unblockUI();

	    },
	 
	   
	});
	
	
}
function mostrarDatosParametricosCotizacion(nroCotizacion, nroConsecutivo){
	bloquearPantallaGris();
	$.ajax({
	    url : '/PSPES/detalleComponentes',
	    contentType: 'application/json', 
	    data : { cotizacion : nroCotizacion , consecutivo: nroConsecutivo },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {	    		
	    		if(json.length==0){
	    			
	    		}else{
	    			var d1 = document.getElementById("datosComponenteCotizacion");
	    	    	d1.innerHTML = ' ';

	    	    	var panelNuevo = ' ';
	    	    	
	    	    	for ( var int = 0; int < json.componentes.length ; int++) {
	    	    		panelNuevo = panelNuevo + '<tr class="tr-grilla">';
	    	    		panelNuevo = panelNuevo + '<td class="td-grilla-componentesModalCotizacionHome" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json.componentes[int]['P_TF_COMPONENTES_INB_COMPONENTE'])) +'</h6></td>';
	    	    		panelNuevo = panelNuevo + '<td class="td-grilla-componentesModalCotizacionHome" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json.componentes[int]['P_TF_COMPONENTES_CACX_TA_COMPONENTE'])) +'</h6></td>';
	    	    		panelNuevo = panelNuevo + '<td class="td-grilla-componentesModalCotizacionHome" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json.componentes[int]['P_TF_COMPONENTES_CACX_MT_COMPONENTE'])) +'</h6></td>';
	    	    		panelNuevo = panelNuevo + '</tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		}
	    		
	    		
	    	} catch (e) {
	    		mostrarError('Code 455 : No pudo cargar los datos parametricos');
	    	}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	if(nroConsecutivo == 0){
    			var dl = document.getElementById("datosParametricosSegunCotizacion");
    			dl.innerHTML = '<h5 style="border:none;color:#6f6767;text-align:center;"><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No se encontraron parametricos por ser cotizacion total</h5>';
	    	}
	    	else{
		    	mostrarError('Code 459 - Se ha producido un inconveniente al obtener los datos parametricos de la cotizacion!');
		    	var dl = document.getElementById("datosParametricosSegunCotizacion");
    			dl.innerHTML = '<span style="color:#6f6767;text-align:center;"><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No se encontraron datos parametricos de cotizacion</span>';
	    	}
	    },
	   
	});
	
	
}

function abrirModalPlanesCotizacion(){
	bloquearPantallaGris();
	
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;

	
	$.ajax({
	    url : '/PSPES/planesCotizacion',
	    contentType: 'application/json', 
	    data : { cotizacion : valorCotizacion , consecutivo: valorConsecutivo },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		
	    		var d1 = document.getElementById("datosPlanesCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    		for ( var int = 0; int < json.planes.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-planesCotizacion" role="cell"><h6>'+validarCampoVacio((json.planes[int]['P_TF_PLANES_CAZB_CAPB_CD_PLAN']))+'</h6></td>'+
    	    		'<td class="td-grilla-planesCotizacion" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json.planes[int]['P_TF_PLANES_INB_PLAN']))+'</h6></td>'+
    	    		'<td class="td-grilla-planesCotizacion" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json.planes[int]['P_TF_PLANES_CAZB_MT_PREMIO']))+'</h6></td>'+
    	    		'<td class="td-grilla-planesCotizacion" role="cell"><h6>'+validarCampoVacio(json.planes[int]['P_TF_PLANES_CAZB_CD_PROMOCION'])+' - '+validarCampoVacio(primeraLetraMayus(json.planes[0]['P_TF_PLANES_CROT_DE_PROMOCION']))+'</h6></td>'+
    	    		'</tr>';
    	    		}
    	    		d1.innerHTML = panelNuevo + '</tr>';

    	    		if(json.planesDescripciones[0]['P_TF_PLANES_DESC_INB_CAUCION'] != ''){
    	    	    	
    	    			$("#AlertaCaucionesPlanes").css("display","");
    	    			$("#DATO_CAUCION_PLANES").html("<b style='color:#ff9064'>" + json['P_TF_PLANES_INB_CAUCION'] + "</b>");

    	    		}
    	    		
    	    		if(json.planesDescripciones[0]['P_TF_PLANES_DESC_INB_INSPECCION'] != ''){
    	    	    	
    	    			$("#aletarInspeccionesPlanes").css("display","");
    	    			$("#DATO_INSPECCION_PLANES").html("<b style='color:#ff9064'>" + json['P_TF_PLANES_INB_INSPECCION'] + "</b>");

    	    		}
    	    		
        	    	$("#DATO_PLANES_COTI").html("Planes de la Cotizaci&oacute;n <b>#"+valorCotizacion+"</b>");

	    		
	    		//Abre el modal
				$("#planesCotizacionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
				});
	    		
	    	} catch (e) {
	    		mostrarError('Code 465 : No se pudo cargar los planes');
	    	}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
		    	mostrarError('Code 469 - Se ha producido un inconveniente al obtener los planes de la cotizacion!');

	    },
	   
	});
	
	
}


function buscarFiltroParametricoCotizacion(idTablaParametricos){
	
	input = document.getElementById("inputBusquedaParametricoCotizacion");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);
	
}

function inicioCotizacionHome(){
	bloquearPantallaGris();
	$( "#timeLineCertificadoCotizacion0" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
		})
	$.unblockUI();
}

function abrirPopUpTextoCotizacionHome(){
	
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'textoModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosTextoCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" id="textoCoti'+int+'" onclick="detalleTextos('+int+');" class="tr-grilla">'+
		            '<td class="td-grilla-textoCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_TEXTOS_CCOT_NU_CONSECUTIVO']) +'</h6></td>'+
		            '<td class="td-grilla-textoCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_TEXTOS_CCOT_CRTX_CD_TEXTO']) +'</h6></td>'+
		            '<td class="td-grilla-textoCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_TEXTOS_CCOT_DE_BREVE']) +'</h6></td>'+
		            '<td class="td-grilla-textoCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_TEXTOS_CCOT_IN_IMPRESION']) +'</h6></td>'+
		            '<td class="td-grilla-textoCotizacion" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_TEXTOS_CCOT_FE_DESDE'])) +'</h6></td>'+
		            '<td class="td-grilla-textoCotizacion" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_TEXTOS_CCOT_FE_HASTA'])) +'</h6></td>'+
		            '<td class="td-grilla-textoCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_TEXTOS_CCOT_IN_IMP_RENOVACION']) +'</h6></td>'+
		            '<td class="td-grilla-textoCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_TEXTOS_CCOT_IN_RENUEVA']) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';

    	    	$("#DATO_TEXTO_COTI").html("Texto de la Cotizaci&oacute;n <b>#"+valorCotizacion+"</b>");

    	    	$("#valorTextoCotizacion").html("Seleccione un c&oacute;digo...");
    	    	
    	    	
			//Abre el modal
			$("#textoCotizacionPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function detalleTextos(card){
			bloquearPantallaGris();
			var valorCotizacion = document.getElementById('valorCotizacion').value;
			var valorConsecutivo = document.getElementById('valorConsecutivo').value;
			
			
			bloquearPantallaGris();
			$.ajax({
			    url : 'textoModalCoti',
			    contentType: 'application/json', 
			    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo},
			    type : 'GET',
			    dataType : 'json',
			    success : function(json) {
					try{
				    	$("#valorTextoCotizacion").html("<b>" +validarCampoVacio(primeraLetraMayus(json[card]['P_TF_TEXTOS_CCOT_DE_TEXTO'].toLowerCase()))+"</b>");

				    	$(".textoCards").each(function(){
					 	    $(this).css("background","white");
					 	});
						
						$('#textoCoti'+card).css("background","#bac2bb");
				    	
					$.unblockUI();
			    	}
			    	catch(e)
			    	{
				    	mostrarError('Por favor informe a sistema con el cod de error:9118716.',e);
			    		
			    	}
					$.unblockUI();
			    	
			    	},
			    error : function(xhr, status) {
			    	mostrarError(xhr['responseText']);
			    },
			 
			   
			});
			

		};
			

function abrirPopUpAccesoriosCotizacionHome(){
	
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'accesoriosModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosAccesoriosCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-accesoriosCotizacionHome" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_ACCESORIOS_CASX_CAAX_CD_ACCESORIO']) +'</h6></td>'+
		            '<td class="td-grilla-accesoriosCotizacionHome" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_ACCESORIOS_INB_ACCESORIO']) +'</h6></td>'+
		            '<td class="td-grilla-accesoriosCotizacionHome" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_ACCESORIOS_CASX_MT_VALOR']) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	$("#DATO_ACCESORIOS_COTI").html("Accesorios de la Cotizaci&oacute;n <b>#"+valorCotizacion+"</b>");

    	    	
    	    	
    	    	
			//Abre el modal
			$("#accesoriosCotizacionPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function abrirPopUpTitularesCotizacionHome(){
	
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'titularsModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosTitularesCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-titularesCotizacionHome" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_TITULARES_CATH_CABU_NU_PERSONA']) +'</h6></td>'+
		            '<td class="td-grilla-titularesCotizacionHome" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_TITULARES_INB_PERSONA'])) +'</h6></td>'+
		            '<td class="td-grilla-titularesCotizacionHome" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_TITULARES_CATH_IN_TITULAR'])) +' - ' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_TITULARES_INB_TITULAR'])) +'</h6></td>'+
		            
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo;
    	    	$("#DATO_TITULARES_COTI").html("Titulares de la Cotizaci&oacute;n <b>#"+valorCotizacion+"</b>");

    	    	
	$("#titularesCotizacionPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};





function abrirPopUpDireccionesCotizacionHome(){
	
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	var select = document.getElementById('selectorBienCotizacion');
	var valorSelect = select.options[select.selectedIndex].value;
	var valorRamo=document.getElementById("valorRamoCotizacion").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'direccionesModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo,ramo:valorRamo,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		llenarDinamicamente(json[0]);
    	    	$("#DATO_DIRECCIONES_COTIZACION").html("Direcciones <b>#" + valorCotizacion + "</b>");
    			$("#DATO_MUNICIPIO_COTIZACION").html("<b> " + validarCampoVacio(json[0]['P_TF_DIRECCIONES_CD_MUNICIPIO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DIRECCIONES_INB_MUNICIPIO'])) + "</b>");
    			$("#DATO_COD_POSTAL_COTIZACION").html("<b> " + validarCampoVacio(json[0]['P_TF_DIRECCIONES_CD_CODIGO_POSTAL']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DIRECCIONES_INB_CODIGO_POSTAL'])) + "</b>");
    			$("#DATO_PROVINCIA_COTIZACION").html("<b> " + validarCampoVacio(json[0]['P_TF_DIRECCIONES_CD_PROVINCIA']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DIRECCIONES_INB_PROVINCIA'])) + "</b>");
    			$("#DATO_PAIS_COTIZACION").html("<b> " + validarCampoVacio(json[0]['P_TF_DIRECCIONES_CD_PAIS']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DIRECCIONES_INB_PAIS'])) + "</b>");

			//Abre el modal
			$("#direccionesCotizacionPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};



function abrirPopUpObjetosCotizacionHome(){
	
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	var select = document.getElementById('selectorBienCotizacion');
	var valorSelect = select.options[select.selectedIndex].value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'objetosModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosObjetosCotizacionHome");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-objetosCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_OBJETOS_CRCA_CROB_CD_OBJETO']) +" - " +  validarCampoVacio(json[int]['P_TF_OBJETOS_INB_OBJETO']) +'</h6></td>'+
		            '<td class="td-grilla-objetosCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_OBJETOS_CRCA_DESCRIPCION']) +'</h6></td>'+
		            '<td class="td-grilla-objetosCotizacion" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_OBJETOS_CRCA_VALOR'])) +'</h6></td>'+
		            '<td class="td-grilla-objetosCotizacion" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_OBJETOS_CRCA_NU_UNIDADES'])) +'</h6></td>'+
		            '<td class="td-grilla-objetosCotizacion" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_OBJETOS_CRCA_CRMA_CD_MARCA']))  +" - " + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_OBJETOS_INB_MARCA'])) +'</h6></td>'+
		            '<td class="td-grilla-objetosCotizacion" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_OBJETOS_CRCA_SERIAL'])) +'</h6></td>'+
		            '<td class="td-grilla-objetosCotizacion" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_OBJETOS_CRCA_VALOR_TOTAL'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
 
    	    	$("#DATOS_OBJETO_COTIZACION").html("Objetos <b>#"+valorCotizacion+"</b>");

    	    	
    	    	
    	    	
			//Abre el modal
			$("#objetosCertificadoPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:987126.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};




function abrirPopUpCoberturasCotizacionHome(){
	
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	var select = document.getElementById('selectorBienCotizacion');
	var valorSelect = select.options[select.selectedIndex].value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'coberturasModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		
	    		
	    		
	    		var d1 = document.getElementById("datosCoberturasCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-coberturasCotizacion" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_COBERTURAS_CACK_CARB_CD_RAMO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COBERTURAS_INB_COBERTURA'])) +'</h6></td>'+
		            '<td class="td-grilla-coberturasCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_COBERTURAS_CACK_NU_ELEMENTOS']) +'</h6></td>'+
		            '<td class="td-grilla-coberturasCotizacion" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[0]['P_TF_COBERTURAS_CACK_MT_SUMA_ASEGURADA'])) +'</h6></td>'+
		            '<td class="td-grilla-coberturasCotizacion" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_COBERTURAS_CACK_TA_PRIMA'])) +'</h6></td>'+

		            '<td class="td-grilla-coberturasCotizacion" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[0]['P_TF_COBERTURAS_CACK_MT_PRIMA'])) +'</h6></td>'+
		            '<td class="td-grilla-coberturasCotizacion" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COBERTURAS_CACK_PO_FRANQUICIA'])) +'</h6></td>'+
		            '<td class="td-grilla-coberturasCotizacion" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COBERTURAS_CACK_MT_DEDUCIBLE'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
	    		
	    		$("#DATO_COBERTURAS_COTIZACION").html("Coberturas <b>#" + valorCotizacion + "</b>");

    			
			//Abre el modal
			$("#coberturaCotizacionPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function abrirPopUpReasegurosCotizacionHome(){
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'reaseguroModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    	try {
        	    		
    	    	var d1 = document.getElementById("selectorReaseguroCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		pos = int +1;
    	    		panelNuevo = panelNuevo + '<option value="'+int+'"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_REASEGURO_INB_RAMO'])) +'</h6></option>';
    	    	}
    	    	
    	    	d1.innerHTML =panelNuevo;
    	    	var select = document.getElementById('selectorReaseguroCotizacion');
    	    	var valorSelect = select.options[select.selectedIndex].value;
    	    	llenoCabeceraReaseguro(valorSelect);
    	    	
	    		
	    		$("#DATO_REASEGURO_COTIZACION").html("Reaseguro <b>#" + valorCotizacion + "</b>");
	    		
	    		$("#reaseguroCotizacionPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
			
	
	}
	catch(e)
	{
    	mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
		
	}
	$.unblockUI();
	
	
	},
error : function(xhr, status) {
	mostrarError(xhr['responseText']);
},


});


};


function llenoCabeceraReaseguro(card){
	
	bloquearPantallaGris();
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;

	$.ajax({
	    url : 'reaseguroModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$("#valorFechaCoti").val(formatearFechaJson(json[card]['P_TF_REASEGURO_RECO_CACS_FE_DESDE']));
	    		$("#valorProgramaCoti").val(json[card]['P_TF_REASEGURO_RECO_CACS_CD_PROGRAMA']);
	    		$("#valorGrupoCoti").val(json[card]['P_TF_REASEGURO_RECO_CACS_CD_GRUPO']);
	    		
	    		$("#DATO_FUERA_DE_PAUTA_COTI").val(json[card]['P_TF_REASEGURO_INB_FUERA_PAUTA']);

	    		llenarDinamicamente(json[card]);
	    		
	    		tablaDatosReaseguroModal();

			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function tablaDatosReaseguroModal(){

	bloquearPantallaGris();
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	var valorMoneda = document.getElementById('valorMonedaCotizacion').value;
	var fecha = document.getElementById('valorFechaCoti').value;
	var grupo = document.getElementById('valorGrupoCoti').value;
	var codPrograma = document.getElementById('valorProgramaCoti').value;
	$.ajax({
	    url : 'reaseguroDetalleModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo,fecha:fecha,moneda:valorMoneda,grupo:grupo,programa:codPrograma},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		var d1 = document.getElementById("datosReaseguroCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="reaseguroCards" class="tr-grilla">'+
		            '<td class="td-grilla-reaseguCotizacion"  role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_COBER_REAS_CACK_CACB_CD_COBERTURA']) +' - '+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COBER_REAS_INB_COBERTURA']))+'</h6></td>'+
		            '<td class="td-grilla-reaseguCotizacion" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COBER_REAS_CACK_MT_SUMA_ASEGURADA'])) +'</h6></td>'+
		            '<td class="td-grilla-reaseguCotizacion" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COBER_REAS_CACK_MT_PRIMA'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
			
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function selectorReasegurosModal(){

	var select = document.getElementById('selectorReaseguroCotizacion');
	var valorSelect = select.options[select.selectedIndex].value;
	llenoCabeceraReaseguro(valorSelect);
	
	
}







function abrirPopUpAnexosCotizacionHome(){
	
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'lineasModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    try {
        	    		
    	    	var d1 = document.getElementById("selectorLineasCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		pos = int +1;
    	    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_LINEAS_CACJ_CRLA_CD_LINEA']+'"><h6>'+validarCampoVacio(json[int]['P_TF_LINEAS_CACJ_CRLA_CD_LINEA']) +" - "+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LINEAS_INB_LINEA'])) +'</h6></option>';
    	    	}
    	    	
    	    	d1.innerHTML =panelNuevo;
	
    	    	$("#DATO_ANEXO_COTIZACION").html("Anexos <b>#" + valorCotizacion + "</b>");
    	    	

    	    	
    	    	clausulasAnexoCotizacion();

				$("#anexoCotizacionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});

		}
		catch(e)
		{
	    	mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
			
		}
		$.unblockUI();
		
		
		},
	error : function(xhr, status) {
		mostrarError(xhr['responseText']);
	},


	});


	};

	function selectorAnexoModal(){
		
		bloquearPantallaGris();
		clausulasAnexoCotizacion();
		
	}
	
	function clausulasAnexoCotizacion(){
		var valorCotizacion = document.getElementById('valorCotizacion').value;
		var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	    var select = document.getElementById('selectorLineasCotizacion');
	    var valorSelect = select.options[select.selectedIndex].value;
		bloquearPantallaGris();
		$.ajax({
		    url : 'clausulasModalCoti',
		    contentType: 'application/json', 
		    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo,linea:valorSelect},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		var codClausula;
		    		var d1 = document.getElementById("datosClausulasCotizacion");
	    	    	d1.innerHTML = '';
	    	    	var panelNuevo = '';
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		codClausula = "'"+json[int]['P_TF_CLAUSULAS_CACQ_CRCL_CD_CLAUSULA']+"'";

	    	    		panelNuevo = panelNuevo +'<tr id="clausulasTexto'+int+'" onclick="detalleClausulaTextos('+codClausula+','+int+');" class="reaseguroCards tr-grilla">'+
			            '<td class="td-grilla-anexoCotizacion" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_CLAUSULAS_CACQ_CRCL_CD_CLAUSULA'])) +'</h6></td>'+
			            '<td class="td-grilla-anexoCotizacion" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CLAUSULAS_INB_CLAUSULA'])) +'</h6></td>'+
			            '<td class="td-grilla-anexoCotizacion" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_CLAUSULAS_CACQ_IN_EXCLUSION']))+" - "+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CLAUSULAS_INB_EXCLUSION'])) +'</h6></td>'+
			            '</tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo;
			    	$("#valorTextoClausulaCotizacion").html("Seleccione un c&oacute;digo...");

				
				$.unblockUI();
		    	}
		    	catch(e)
		    	{
			    	mostrarError('Por favor informe a sistema con el cod de error:19812716.',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	mostrarError(xhr['responseText']);
		    },
		 
		   
		});
		

	};
		
	function detalleClausulaTextos(cod,card){
		
		var valorCotizacion = document.getElementById('valorCotizacion').value;
		var valorConsecutivo = document.getElementById('valorConsecutivo').value;

		bloquearPantallaGris();
		$.ajax({
		    url : 'textoClausulasModalCoti',
		    contentType: 'application/json', 
		    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo,codClausula:cod},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		
			    	$("#valorTextoClausulaCotizacion").html("<b>" +validarCampoVacio(primeraLetraMayus(json[0]['P_TF_TEXTO_CLAU_CRCL_DE_TEXTO']))+" </b>");

			    	$(".reaseguroCards").each(function(){
				 	    $(this).css("background","white");
				 	});
					
					
					$('#clausulasTexto'+card).css("background","#bac2bb");
			    	
			    	
				$.unblockUI();
		    	}
		    	catch(e)
		    	{
			    	mostrarError('Por favor informe a sistema con el cod de error:918716.',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	mostrarError(xhr['responseText']);
		    },
		 
		   
		});
		

	};

function abrirPopUpBeneficiarioCotizacionHome(){
	
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	var select = document.getElementById('selectorBienCotizacion');
	var valorSelect = select.options[select.selectedIndex].value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'beneficiarioModalCoti',
	    contentType: 'application/json', 
	    data : { cotizacion:valorCotizacion,consecutivo:valorConsecutivo,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		llenarDinamicamente(json[0]);
    	    	$("#DATO_BENEFICIARIO_COTIZACION").html("Beneficiario <b>#" + valorCotizacion + "</b>");

    			
			//Abre el modal
			$("#beneficiarioCotizacionPopUp").modal({
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
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};
function abrirModalCotizacionProductorHome(){
	var valorProductor = document.getElementById('valorProductorCotizacion').value;
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosProductorModal',
	    contentType: 'application/json', 
	    data : {productor:valorProductor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);

			$("#DATO_P_TF_PROD_CAPD_NM_PRODUCTOR").html("<b>#" + json[0]['P_TF_PROD_CAPD_CD_PRODUCTOR']+" - "+primeraLetraMayus(json[0]['P_TF_PROD_CAPD_NM_PRODUCTOR'])  +"</b>" );
			$("#DATO_P_TF_PROD_CAPD_NM_PRODUCTOR_REDIRECT").val(json[0]['P_TF_PROD_CAPD_CD_PRODUCTOR']);

			//Abre el modal
			$("#productorPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos del productor',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};



function abrirModalCotizacionFueraPauta(){
	var valorCotizacion = document.getElementById('valorCotizacion').value;
	var valorConsecutivo = document.getElementById('valorConsecutivo').value;
	bloquearPantallaGris();
	$.ajax({
	    url : 'fueraPautaModalCoti',
	    contentType: 'application/json', 
	    data : {cotizacion:valorCotizacion,consecutivo:valorConsecutivo} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		

	    	var d1 = document.getElementById("datosFueraPautaCotizacion");
	    	d1.innerHTML = '';
	    	var panelNuevo = '';
	    	for ( var int = 0; int < json.length ; int++) {
	    		panelNuevo = panelNuevo +'<tr class="reaseguroCards" class="tr-grilla">'+
	            '<td class="td-grilla-fueraDePautaCotizacion"  role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_FUERA_PAUTA_CAFA_CCFP_CD_MOTIVO']) +' - '+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_FUERA_PAUTA_INB_MOTIVO']))+'</h6></td>'+
	            '<td class="td-grilla-fueraDePautaCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_FUERA_PAUTA_INB_NIVEL_FP']) +'</h6></td>'+
	            '<td class="td-grilla-fueraDePautaCotizacion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_FUERA_PAUTA_CAFA_CD_APROBADO']) +'</h6></td>'+
	            '<td class="td-grilla-fueraDePautaCotizacion" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_FUERA_PAUTA_CAFA_DE_FP'])) +'</h6></td>'+
	            '<td class="td-grilla-fueraDePautaCotizacion" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_FUERA_PAUTA_INB_DE_USUARIO'])) +'</h6></td>'+
	            '<td class="td-grilla-fueraDePautaCotizacion" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_FUERA_PAUTA_CAFA_FE_ACTUALIZACION'])) +'</h6></td>'+
	            '</tr>';
	    	}
	    	d1.innerHTML = panelNuevo + '</tr>';
    		
	    	

	    	$("#DATO_BENEFICIARIO_COTIZACION").html("Fuera de Pauta <b>#" + valorCotizacion + "</b>");

			//Abre el modal
			$("#fueraDePautaCotizacionPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos',e);
	    		
	    	}
	    	
	    	$.unblockUI();
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};

function redirPolizaHome(){
	bloquearPantallaGris();
	var valorPoliza = document.getElementById('valorPolizaCotizacion').value;
	var valorRamo = document.getElementById('valorRamoCotizacion').value;
	var valorSucursal = document.getElementById('valorSucursalCotizacion').value;
    location.href = "/PSPES/homePoliza?poliza="+valorPoliza+"&ramo="+valorRamo+"&sucursal="+valorSucursal;

	
}




/*!
 * Datepicker for Bootstrap v1.6.4 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */(function(factory){
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($, undefined){

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}
	function isUTCEquals(date1, date2) {
		return (
			date1.getUTCFullYear() === date2.getUTCFullYear() &&
			date1.getUTCMonth() === date2.getUTCMonth() &&
			date1.getUTCDate() === date2.getUTCDate()
		);
	}
	function alias(method){
		return function(){
			return this[method].apply(this, arguments);
		};
	}
	function isValidDate(d) {
		return d && !isNaN(d.getTime());
	}

	var DateArray = (function(){
		var extras = {
			get: function(i){
				return this.slice(i)[0];
			},
			contains: function(d){
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i=0, l=this.length; i < l; i++)
					if (this[i].valueOf() === val)
						return i;
				return -1;
			},
			remove: function(i){
				this.splice(i,1);
			},
			replace: function(new_array){
				if (!new_array)
					return;
				if (!$.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function(){
				this.length = 0;
			},
			copy: function(){
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};

		return function(){
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();


	// Picker object

	var Datepicker = function(element, options){
		$(element).data('datepicker', this);
		this._process_options(options);

		this.dates = new DateArray();
		this.viewDate = this.o.defaultViewDate;
		this.focusDate = null;

		this.element = $(element);
		this.isInput = this.element.is('input');
		this.inputField = this.isInput ? this.element : this.element.find('input');
		this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
		this.hasInput = this.component && this.inputField.length;
		if (this.component && this.component.length === 0)
			this.component = false;
		this.isInline = !this.component && this.element.is('div');

		this.picker = $(DPGlobal.template);

		// Checking templates and inserting
		if (this._check_template(this.o.templates.leftArrow)) {
			this.picker.find('.prev').html(this.o.templates.leftArrow);
		}
		if (this._check_template(this.o.templates.rightArrow)) {
			this.picker.find('.next').html(this.o.templates.rightArrow);
		}

		this._buildEvents();
		this._attachEvents();

		if (this.isInline){
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		}
		else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
		}

		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('thead .datepicker-title, tfoot .today, tfoot .clear')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
		this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
		this.setDatesDisabled(this.o.datesDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if (this.isInline){
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_resolveViewName: function(view, default_value){
			if (view === 0 || view === 'days' || view === 'month') {
				return 0;
			}
			if (view === 1 || view === 'months' || view === 'year') {
				return 1;
			}
			if (view === 2 || view === 'years' || view === 'decade') {
				return 2;
			}
			if (view === 3 || view === 'decades' || view === 'century') {
				return 3;
			}
			if (view === 4 || view === 'centuries' || view === 'millennium') {
				return 4;
			}
			return default_value === undefined ? false : default_value;
		},

		_check_template: function(tmp){
			try {
				// If empty
				if (tmp === undefined || tmp === "") {
					return false;
				}
				// If no html, everything ok
				if ((tmp.match(/[<>]/g) || []).length <= 0) {
					return true;
				}
				// Checking if html is fine
				var jDom = $(tmp);
				return jDom.length > 0;
			}
			catch (ex) {
				return false;
			}
		},

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			// Retrieve view index from any aliases
			o.startView = this._resolveViewName(o.startView, 0);
			o.minViewMode = this._resolveViewName(o.minViewMode, 0);
			o.maxViewMode = this._resolveViewName(o.maxViewMode, 4);

			// Check that the start view is between min and max
			o.startView = Math.min(o.startView, o.maxViewMode);
			o.startView = Math.max(o.startView, o.minViewMode);

			// true, false, or Number > 0
			if (o.multidate !== true){
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
			}
			o.multidateSeparator = String(o.multidateSeparator);

			o.weekStart %= 7;
			o.weekEnd = (o.weekStart + 6) % 7;

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity){
				if (!!o.startDate){
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity){
				if (!!o.endDate){
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
				return parseInt(d, 10);
			});

			o.daysOfWeekHighlighted = o.daysOfWeekHighlighted||[];
			if (!$.isArray(o.daysOfWeekHighlighted))
				o.daysOfWeekHighlighted = o.daysOfWeekHighlighted.split(/[,\s]*/);
			o.daysOfWeekHighlighted = $.map(o.daysOfWeekHighlighted, function(d){
				return parseInt(d, 10);
			});

			o.datesDisabled = o.datesDisabled||[];
			if (!$.isArray(o.datesDisabled)) {
				o.datesDisabled = [
					o.datesDisabled
				];
			}
			o.datesDisabled = $.map(o.datesDisabled,function(d){
				return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return /^auto|left|right|top|bottom$/.test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch (plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return /^left|right$/.test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return /^top|bottom$/.test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
			if (o.defaultViewDate) {
				var year = o.defaultViewDate.year || new Date().getFullYear();
				var month = o.defaultViewDate.month || 0;
				var day = o.defaultViewDate.day || 1;
				o.defaultViewDate = UTCDate(year, month, day);
			} else {
				o.defaultViewDate = UTCToday();
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ch, ev; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev, ch; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function(){
            var events = {
                keyup: $.proxy(function(e){
                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                        this.update();
                }, this),
                keydown: $.proxy(this.keydown, this),
                paste: $.proxy(this.paste, this)
            };

            if (this.o.showOnFocus === true) {
                events.focus = $.proxy(this.show, this);
            }

            if (this.isInput) { // single input
                this._events = [
                    [this.element, events]
                ];
            }
            else if (this.component && this.hasInput) { // component: input + button
                this._events = [
                    // For components that are not readonly, allow keyboard nav
                    [this.inputField, events],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}]
			);

			if (this.o.immediateUpdates) {
				// Trigger input updates immediately on changed year/month
				this._events.push([this.element, {
					'changeYear changeMonth': $.proxy(function(e){
						this.update(e.date);
					}, this)
				}]);
			}

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					mousedown: $.proxy(function(e){
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length ||
							this.isInline
						)){
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format){
					if (arguments.length === 0){
						ix = this.dates.length - 1;
						format = this.o.format;
					}
					else if (typeof ix === 'string'){
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(){
			if (this.inputField.prop('disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
				return;
			if (!this.isInline)
				this.picker.appendTo(this.o.container);
			this.place();
			this.picker.show();
			this._attachSecondaryEvents();
			this._trigger('show');
			if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
				$(this.element).blur();
			}
			return this;
		},

		hide: function(){
			if (this.isInline || !this.picker.is(':visible'))
				return this;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (this.o.forceParse && this.inputField.val())
				this.setValue();
			this._trigger('hide');
			return this;
		},

		destroy: function(){
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput){
				delete this.element.data().date;
			}
			return this;
		},

		paste: function(evt){
			var dateString;
			if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types
				&& $.inArray('text/plain', evt.originalEvent.clipboardData.types) !== -1) {
				dateString = evt.originalEvent.clipboardData.getData('text/plain');
			}
			else if (window.clipboardData) {
				dateString = window.clipboardData.getData('Text');
			}
			else {
				return;
			}
			this.setDate(dateString);
			this.update();
			evt.preventDefault();
		},

		_utc_to_local: function(utc){
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
		},
		_local_to_utc: function(local){
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDates: function(){
			return $.map(this.dates, this._utc_to_local);
		},

		getUTCDates: function(){
			return $.map(this.dates, function(d){
				return new Date(d);
			});
		},

		getDate: function(){
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function(){
			var selected_date = this.dates.get(-1);
			if (typeof selected_date !== 'undefined') {
				return new Date(selected_date);
			} else {
				return null;
			}
		},

		clearDates: function(){
			if (this.inputField) {
				this.inputField.val('');
			}

			this.update();
			this._trigger('changeDate');

			if (this.o.autoclose) {
				this.hide();
			}
		},
		setDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
			return this;
		},

		setUTCDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, $.map(args, this._utc_to_local));
			this._trigger('changeDate');
			this.setValue();
			return this;
		},

		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),
		remove: alias('destroy'),

		setValue: function(){
			var formatted = this.getFormattedDate();
			this.inputField.val(formatted);
			return this;
		},

		getFormattedDate: function(format){
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			return $.map(this.dates, function(d){
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
		},

		getStartDate: function(){
			return this.o.startDate;
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
			return this;
		},

		getEndDate: function(){
			return this.o.endDate;
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
			return this;
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			this.updateNavArrows();
			return this;
		},

		setDaysOfWeekHighlighted: function(daysOfWeekHighlighted){
			this._process_options({daysOfWeekHighlighted: daysOfWeekHighlighted});
			this.update();
			return this;
		},

		setDatesDisabled: function(datesDisabled){
			this._process_options({datesDisabled: datesDisabled});
			this.update();
			this.updateNavArrows();
		},

		place: function(){
			if (this.isInline)
				return this;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				container = $(this.o.container),
				windowWidth = container.width(),
				scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
				appendOffset = container.offset();

			var parentsZindex = [];
			this.element.parents().each(function(){
				var itemZIndex = $(this).css('z-index');
				if (itemZIndex !== 'auto' && itemZIndex !== 0) parentsZindex.push(parseInt(itemZIndex));
			});
			var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left - appendOffset.left,
				top = offset.top - appendOffset.top;

			if (this.o.container !== 'body') {
				top += scrollTop;
			}

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto'){
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				if (offset.left < 0) {
					// component is outside the window on the left side. Move it into visible range
					this.picker.addClass('datepicker-orient-left');
					left -= offset.left - visualPadding;
				} else if (left + calendarWidth > windowWidth) {
					// the calendar passes the widow right edge. Align it to component right side
					this.picker.addClass('datepicker-orient-right');
					left += width - calendarWidth;
				} else {
					// Default to left
					this.picker.addClass('datepicker-orient-left');
				}
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow;
			if (yorient === 'auto'){
				top_overflow = -scrollTop + top - calendarHeight;
				yorient = top_overflow < 0 ? 'bottom' : 'top';
			}

			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));
			else
				top += height;

			if (this.o.rtl) {
				var right = windowWidth - (left + width);
				this.picker.css({
					top: top,
					right: right,
					zIndex: zIndex
				});
			} else {
				this.picker.css({
					top: top,
					left: left,
					zIndex: zIndex
				});
			}
			return this;
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update)
				return this;

			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length){
				$.each(arguments, $.proxy(function(i, date){
					if (date instanceof Date)
						date = this._local_to_utc(date);
					dates.push(date);
				}, this));
				fromArgs = true;
			}
			else {
				dates = this.isInput
						? this.element.val()
						: this.element.data('date') || this.inputField.val();
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}

			dates = $.map(dates, $.proxy(function(date){
				return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
			}, this));
			dates = $.grep(dates, $.proxy(function(date){
				return (
					!this.dateWithinRange(date) ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);

			if (this.dates.length)
				this.viewDate = new Date(this.dates.get(-1));
			else if (this.viewDate < this.o.startDate)
				this.viewDate = new Date(this.o.startDate);
			else if (this.viewDate > this.o.endDate)
				this.viewDate = new Date(this.o.endDate);
			else
				this.viewDate = this.o.defaultViewDate;

			if (fromArgs){
				// setting date by clicking
				this.setValue();
			}
			else if (dates.length){
				// setting date by typing
				if (String(oldDates) !== String(this.dates))
					this._trigger('changeDate');
			}
			if (!this.dates.length && oldDates.length)
				this._trigger('clearDate');

			this.fill();
			this.element.change();
			return this;
		},

		fillDow: function(){
			var dowCnt = this.o.weekStart,
				html = '<tr>';
			if (this.o.calendarWeeks){
				this.picker.find('.datepicker-days .datepicker-switch')
					.attr('colspan', function(i, val){
						return parseInt(val) + 1;
					});
				html += '<th class="cw">&#160;</th>';
			}
			while (dowCnt < this.o.weekStart + 7){
				html += '<th class="dow';
        if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) > -1)
          html += ' disabled';
        html += '">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
      var localDate = this._utc_to_local(this.viewDate);
			var html = '',
			i = 0;
			while (i < 12){
        var focused = localDate && localDate.getMonth() === i ? ' focused' : '';
				html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){
					return d.valueOf();
				});
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
				cls.push('old');
			}
			else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() === today.getFullYear() &&
				date.getUTCMonth() === today.getMonth() &&
				date.getUTCDate() === today.getDate()){
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (!this.dateWithinRange(date)){
				cls.push('disabled');
			}
			if (this.dateIsDisabled(date)){
				cls.push('disabled', 'disabled-date');	
			} 
			if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1){
				cls.push('highlighted');
			}

			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1){
					cls.push('selected');
				}
				if (date.valueOf() === this.range[0]){
          cls.push('range-start');
        }
        if (date.valueOf() === this.range[this.range.length-1]){
          cls.push('range-end');
        }
			}
			return cls;
		},

		_fill_yearsView: function(selector, cssClass, factor, step, currentYear, startYear, endYear, callback){
			var html, view, year, steps, startStep, endStep, thisYear, i, classes, tooltip, before;

			html      = '';
			view      = this.picker.find(selector);
			year      = parseInt(currentYear / factor, 10) * factor;
			startStep = parseInt(startYear / step, 10) * step;
			endStep   = parseInt(endYear / step, 10) * step;
			steps     = $.map(this.dates, function(d){
				return parseInt(d.getUTCFullYear() / step, 10) * step;
			});

			view.find('.datepicker-switch').text(year + '-' + (year + step * 9));

			thisYear = year - step;
			for (i = -1; i < 11; i += 1) {
				classes = [cssClass];
				tooltip = null;

				if (i === -1) {
					classes.push('old');
				} else if (i === 10) {
					classes.push('new');
				}
				if ($.inArray(thisYear, steps) !== -1) {
					classes.push('active');
				}
				if (thisYear < startStep || thisYear > endStep) {
					classes.push('disabled');
				}
        if (thisYear === this.viewDate.getFullYear()) {
				  classes.push('focused');
        }

				if (callback !== $.noop) {
					before = callback(new Date(thisYear, 0, 1));
					if (before === undefined) {
						before = {};
					} else if (typeof(before) === 'boolean') {
						before = {enabled: before};
					} else if (typeof(before) === 'string') {
						before = {classes: before};
					}
					if (before.enabled === false) {
						classes.push('disabled');
					}
					if (before.classes) {
						classes = classes.concat(before.classes.split(/\s+/));
					}
					if (before.tooltip) {
						tooltip = before.tooltip;
					}
				}

				html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + thisYear + '</span>';
				thisYear += step;
			}
			view.find('td').html(html);
		},

		fill: function(){
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
				titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
				tooltip,
				before;
			if (isNaN(year) || isNaN(month))
				return;
			this.picker.find('.datepicker-days .datepicker-switch')
						.text(DPGlobal.formatDate(d, titleFormat, this.o.language));
			this.picker.find('tfoot .today')
						.text(todaytxt)
						.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot .clear')
						.text(cleartxt)
						.toggle(this.o.clearBtn !== false);
			this.picker.find('thead .datepicker-title')
						.text(this.o.title)
						.toggle(this.o.title !== '');
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			if (prevMonth.getUTCFullYear() < 100){
        nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
      }
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth){
				if (prevMonth.getUTCDay() === this.o.weekStart){
					html.push('<tr>');
					if (this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');
					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop){
					before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				//Check if uniqueSort exists (supported by jquery >=1.12 and >=2.2)
				//Fallback to unique function for older jquery versions
				if ($.isFunction($.uniqueSort)) {
					clsName = $.uniqueSort(clsName);
				} else {
					clsName = $.unique(clsName);
				}

				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				tooltip = null;
				if (prevMonth.getUTCDay() === this.o.weekEnd){
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

			var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
			var months = this.picker.find('.datepicker-months')
						.find('.datepicker-switch')
							.text(this.o.maxViewMode < 2 ? monthsTitle : year)
							.end()
						.find('span').removeClass('active');

			$.each(this.dates, function(i, d){
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});

			if (year < startYear || year > endYear){
				months.addClass('disabled');
			}
			if (year === startYear){
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear){
				months.slice(endMonth+1).addClass('disabled');
			}

			if (this.o.beforeShowMonth !== $.noop){
				var that = this;
				$.each(months, function(i, month){
          var moDate = new Date(year, i, 1);
          var before = that.o.beforeShowMonth(moDate);
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false && !$(month).hasClass('disabled'))
					    $(month).addClass('disabled');
					if (before.classes)
					    $(month).addClass(before.classes);
					if (before.tooltip)
					    $(month).prop('title', before.tooltip);
				});
			}

			// Generating decade/years picker
			this._fill_yearsView(
				'.datepicker-years',
				'year',
				10,
				1,
				year,
				startYear,
				endYear,
				this.o.beforeShowYear
			);

			// Generating century/decades picker
			this._fill_yearsView(
				'.datepicker-decades',
				'decade',
				100,
				10,
				year,
				startYear,
				endYear,
				this.o.beforeShowDecade
			);

			// Generating millennium/centuries picker
			this._fill_yearsView(
				'.datepicker-centuries',
				'century',
				1000,
				100,
				year,
				startYear,
				endYear,
				this.o.beforeShowCentury
			);
		},

		updateNavArrows: function(){
			if (!this._allow_update)
				return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode){
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
				case 3:
				case 4:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e){
			e.preventDefault();
			e.stopPropagation();

			var target, dir, day, year, month, monthChanged, yearChanged;
			target = $(e.target);

			// Clicked on the switch
			if (target.hasClass('datepicker-switch')){
				this.showMode(1);
			}

			// Clicked on prev or next
			var navArrow = target.closest('.prev, .next');
			if (navArrow.length > 0) {
				dir = DPGlobal.modes[this.viewMode].navStep * (navArrow.hasClass('prev') ? -1 : 1);
				if (this.viewMode === 0){
					this.viewDate = this.moveMonth(this.viewDate, dir);
					this._trigger('changeMonth', this.viewDate);
				} else {
					this.viewDate = this.moveYear(this.viewDate, dir);
					if (this.viewMode === 1){
						this._trigger('changeYear', this.viewDate);
					}
				}
				this.fill();
			}

			// Clicked on today button
			if (target.hasClass('today') && !target.hasClass('day')){
				this.showMode(-2);
				this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
			}

			// Clicked on clear button
			if (target.hasClass('clear')){
				this.clearDates();
			}

			if (!target.hasClass('disabled')){
				// Clicked on a day
				if (target.hasClass('day')){
					day = parseInt(target.text(), 10) || 1;
					year = this.viewDate.getUTCFullYear();
					month = this.viewDate.getUTCMonth();

					// From last month
					if (target.hasClass('old')){
						if (month === 0) {
							month = 11;
							year = year - 1;
							monthChanged = true;
							yearChanged = true;
						} else {
							month = month - 1;
							monthChanged = true;
 						}
 					}

					// From next month
					if (target.hasClass('new')) {
						if (month === 11){
							month = 0;
							year = year + 1;
							monthChanged = true;
							yearChanged = true;
 						} else {
							month = month + 1;
							monthChanged = true;
 						}
					}
					this._setDate(UTCDate(year, month, day));
					if (yearChanged) {
						this._trigger('changeYear', this.viewDate);
					}
					if (monthChanged) {
						this._trigger('changeMonth', this.viewDate);
					}
				}

				// Clicked on a month
				if (target.hasClass('month')) {
					this.viewDate.setUTCDate(1);
					day = 1;
					month = target.parent().find('span').index(target);
					year = this.viewDate.getUTCFullYear();
					this.viewDate.setUTCMonth(month);
					this._trigger('changeMonth', this.viewDate);
					if (this.o.minViewMode === 1){
						this._setDate(UTCDate(year, month, day));
						this.showMode();
					} else {
						this.showMode(-1);
					}
					this.fill();
				}

				// Clicked on a year
				if (target.hasClass('year')
						|| target.hasClass('decade')
						|| target.hasClass('century')) {
					this.viewDate.setUTCDate(1);

					day = 1;
					month = 0;
					year = parseInt(target.text(), 10)||0;
					this.viewDate.setUTCFullYear(year);

					if (target.hasClass('year')){
						this._trigger('changeYear', this.viewDate);
						if (this.o.minViewMode === 2){
							this._setDate(UTCDate(year, month, day));
						}
					}
					if (target.hasClass('decade')){
						this._trigger('changeDecade', this.viewDate);
						if (this.o.minViewMode === 3){
							this._setDate(UTCDate(year, month, day));
						}
					}
					if (target.hasClass('century')){
						this._trigger('changeCentury', this.viewDate);
						if (this.o.minViewMode === 4){
							this._setDate(UTCDate(year, month, day));
						}
					}

					this.showMode(-1);
					this.fill();
				}
			}

			if (this.picker.is(':visible') && this._focused_from){
				$(this._focused_from).focus();
			}
			delete this._focused_from;
		},

		_toggle_multidate: function(date){
			var ix = this.dates.contains(date);
			if (!date){
				this.dates.clear();
			}

			if (ix !== -1){
				if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){
					this.dates.remove(ix);
				}
			} else if (this.o.multidate === false) {
				this.dates.clear();
				this.dates.push(date);
			}
			else {
				this.dates.push(date);
			}

			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},

		_setDate: function(date, which){
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if (!which || which === 'view')
				this.viewDate = date && new Date(date);

			this.fill();
			this.setValue();
			if (!which || which !== 'view') {
				this._trigger('changeDate');
			}
			if (this.inputField){
				this.inputField.change();
			}
			if (this.o.autoclose && (!which || which === 'date')){
				this.hide();
			}
		},

		moveDay: function(date, dir){
			var newDate = new Date(date);
			newDate.setUTCDate(date.getUTCDate() + dir);

			return newDate;
		},

		moveWeek: function(date, dir){
			return this.moveDay(date, dir * 7);
		},

		moveMonth: function(date, dir){
			if (!isValidDate(date))
				return this.o.defaultViewDate;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1){
				test = dir === -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){
						return new_date.getUTCMonth() === month;
					}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){
						return new_date.getUTCMonth() !== new_month;
					};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			}
			else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		moveAvailableDate: function(date, dir, fn){
			do {
				date = this[fn](date, dir);

				if (!this.dateWithinRange(date))
					return false;

				fn = 'moveDay';
			}
			while (this.dateIsDisabled(date));

			return date;
		},

		weekOfDateIsDisabled: function(date){
			return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
		},

		dateIsDisabled: function(date){
			return (
				this.weekOfDateIsDisabled(date) ||
				$.grep(this.o.datesDisabled, function(d){
					return isUTCEquals(date, d);
				}).length > 0
			);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (!this.picker.is(':visible')){
				if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
					this.show();
					e.stopPropagation();
        }
				return;
			}
			var dateChanged = false,
				dir, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode){
				case 27: // escape
					if (this.focusDate){
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					}
					else
						this.hide();
					e.preventDefault();
					e.stopPropagation();
					break;
				case 37: // left
				case 38: // up
				case 39: // right
				case 40: // down
					if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
						break;
					dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
          if (this.viewMode === 0) {
  					if (e.ctrlKey){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');

  						if (newViewDate)
  							this._trigger('changeYear', this.viewDate);
  					}
  					else if (e.shiftKey){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');

  						if (newViewDate)
  							this._trigger('changeMonth', this.viewDate);
  					}
  					else if (e.keyCode === 37 || e.keyCode === 39){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
  					}
  					else if (!this.weekOfDateIsDisabled(focusDate)){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
  					}
          } else if (this.viewMode === 1) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
          } else if (this.viewMode === 2) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
          }
					if (newViewDate){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 13: // enter
					if (!this.o.forceParse)
						break;
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					if (this.o.keyboardNavigation) {
						this._toggle_multidate(focusDate);
						dateChanged = true;
					}
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')){
						e.preventDefault();
						e.stopPropagation();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged){
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				if (this.inputField){
					this.inputField.change();
				}
			}
		},

		showMode: function(dir){
			if (dir){
				this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + dir));
			}
			this.picker
				.children('div')
				.hide()
				.filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName)
					.show();
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options){
		$(element).data('datepicker', this);
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;

		datepickerPlugin.call($(this.inputs), options)
			.on('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){
			return $(i).data('datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;

			var dp = $(e.target).data('datepicker');

			if (typeof(dp) === "undefined") {
				return;
			}

			var new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				j = i - 1,
				k = i + 1,
				l = this.inputs.length;
			if (i === -1)
				return;

			$.each(this.pickers, function(i, p){
				if (!p.getUTCDate())
					p.setUTCDate(new_date);
			});

			if (new_date < this.dates[j]){
				// Date being moved earlier/left
				while (j >= 0 && new_date < this.dates[j]){
					this.pickers[j--].setUTCDate(new_date);
				}
			}
			else if (new_date > this.dates[k]){
				// Date being moved later/right
				while (k < l && new_date > this.dates[k]){
					this.pickers[k++].setUTCDate(new_date);
				}
			}
			this.updateDates();

			delete this.updating;
		},
		remove: function(){
			$.map(this.pickers, function(p){ p.remove(); });
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());
		function re_lower(_,a){
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, re_lower);
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]){
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	var datepickerPlugin = function(option){
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function(){
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data){
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.hasClass('input-daterange') || opts.inputs){
					$.extend(opts, {
						inputs: opts.inputs || $this.find('input').toArray()
					});
					data = new DateRangePicker(this, opts);
				}
				else {
					data = new Datepicker(this, opts);
				}
				$this.data('datepicker', data);
			}
			if (typeof option === 'string' && typeof data[option] === 'function'){
				internal_return = data[option].apply(data, args);
			}
		});

		if (
			internal_return === undefined ||
			internal_return instanceof Datepicker ||
			internal_return instanceof DateRangePicker
		)
			return this;

		if (this.length > 1)
			throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
		else
			return internal_return;
	};
	$.fn.datepicker = datepickerPlugin;

	var defaults = $.fn.datepicker.defaults = {
		assumeNearbyYear: false,
		autoclose: false,
		beforeShowDay: $.noop,
		beforeShowMonth: $.noop,
		beforeShowYear: $.noop,
		beforeShowDecade: $.noop,
		beforeShowCentury: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		toggleActive: false,
		daysOfWeekDisabled: [],
		daysOfWeekHighlighted: [],
		datesDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		maxViewMode: 4,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0,
		disableTouchKeyboard: false,
		enableOnReadonly: true,
		showOnFocus: true,
		zIndexOffset: 10,
		container: 'body',
		immediateUpdates: false,
		title: '',
		templates: {
			leftArrow: '&laquo;',
			rightArrow: '&raquo;'
		}
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear",
			titleFormat: "MM yyyy"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
			},
			{
				clsName: 'decades',
				navFnc: 'FullDecade',
				navStep: 100
			},
			{
				clsName: 'centuries',
				navFnc: 'FullCentury',
				navStep: 1000
		}],
		isLeapYear: function(year){
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function(year, month){
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
                return format;
            // IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language, assumeNearby){
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toValue)
                return format.toValue(date, format, language);
            var part_re = /([\-+]\d+)([dmwy])/,
				parts = date.match(/([\-+]\d+)([dmwy])/g),
				fn_map = {
					d: 'moveDay',
					m: 'moveMonth',
					w: 'moveWeek',
					y: 'moveYear'
				},
				dateAliases = {
					yesterday: '-1d',
					today: '+0d',
					tomorrow: '+1d'
				},
				part, dir, i, fn;
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
				date = new Date();
				for (i=0; i < parts.length; i++){
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					fn = fn_map[part[2]];
					date = Datepicker.prototype[fn](date, dir);
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
			}

			if (typeof dateAliases[date] !== 'undefined') {
				date = dateAliases[date];
				parts = date.match(/([\-+]\d+)([dmwy])/g);

				if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
					date = new Date();
				  	for (i=0; i < parts.length; i++){
						part = part_re.exec(parts[i]);
						dir = parseInt(part[1]);
						fn = fn_map[part[2]];
						date = Datepicker.prototype[fn](date, dir);
				  	}

			  		return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
				}
			}

			parts = date && date.match(this.nonpunctuation) || [];
			date = new Date();

			function applyNearbyYear(year, threshold){
				if (threshold === true)
					threshold = 10;

				// if year is 2 digits or less, than the user most likely is trying to get a recent century
				if (year < 100){
					year += 2000;
					// if the new year is more than threshold years in advance, use last century
					if (year > ((new Date()).getFullYear()+threshold)){
						year -= 100;
					}
				}

				return year;
			}

			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){
						return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					},
					yy: function(d,v){
						return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					},
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCToday();
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length){
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part(){
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m.toLowerCase() === p.toLowerCase();
			}
			if (parts.length === fparts.length){
				var cnt;
				for (i=0, cnt = fparts.length; i < cnt; i++){
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)){
						switch (part){
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i=0; i < setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toDisplay)
                return format.toDisplay(date, format, language);
            var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
			              '<tr>'+
			                '<th colspan="7" class="datepicker-title"></th>'+
			              '</tr>'+
							'<tr>'+
								'<th class="prev">&laquo;</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">&raquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>'+
							'<tr>'+
								'<th colspan="7" class="today"></th>'+
							'</tr>'+
							'<tr>'+
								'<th colspan="7" class="clear"></th>'+
							'</tr>'+
						'</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-decades">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-centuries">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};

	/* DATEPICKER VERSION
	 * =================== */
	$.fn.datepicker.version = '1.6.4';

	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			datepickerPlugin.call($this, 'show');
		}
	);
	$(function(){
		datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
	});

}));
/*!
 * Datepicker for Bootstrap v1.6.4 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a,b){function c(){return new Date(Date.UTC.apply(Date,arguments))}function d(){var a=new Date;return c(a.getFullYear(),a.getMonth(),a.getDate())}function e(a,b){return a.getUTCFullYear()===b.getUTCFullYear()&&a.getUTCMonth()===b.getUTCMonth()&&a.getUTCDate()===b.getUTCDate()}function f(a){return function(){return this[a].apply(this,arguments)}}function g(a){return a&&!isNaN(a.getTime())}function h(b,c){function d(a,b){return b.toLowerCase()}var e,f=a(b).data(),g={},h=new RegExp("^"+c.toLowerCase()+"([A-Z])");c=new RegExp("^"+c.toLowerCase());for(var i in f)c.test(i)&&(e=i.replace(h,d),g[e]=f[i]);return g}function i(b){var c={};if(q[b]||(b=b.split("-")[0],q[b])){var d=q[b];return a.each(p,function(a,b){b in d&&(c[b]=d[b])}),c}}var j=function(){var b={get:function(a){return this.slice(a)[0]},contains:function(a){for(var b=a&&a.valueOf(),c=0,d=this.length;d>c;c++)if(this[c].valueOf()===b)return c;return-1},remove:function(a){this.splice(a,1)},replace:function(b){b&&(a.isArray(b)||(b=[b]),this.clear(),this.push.apply(this,b))},clear:function(){this.length=0},copy:function(){var a=new j;return a.replace(this),a}};return function(){var c=[];return c.push.apply(c,arguments),a.extend(c,b),c}}(),k=function(b,c){a(b).data("datepicker",this),this._process_options(c),this.dates=new j,this.viewDate=this.o.defaultViewDate,this.focusDate=null,this.element=a(b),this.isInput=this.element.is("input"),this.inputField=this.isInput?this.element:this.element.find("input"),this.component=this.element.hasClass("date")?this.element.find(".add-on, .input-group-addon, .btn"):!1,this.hasInput=this.component&&this.inputField.length,this.component&&0===this.component.length&&(this.component=!1),this.isInline=!this.component&&this.element.is("div"),this.picker=a(r.template),this._check_template(this.o.templates.leftArrow)&&this.picker.find(".prev").html(this.o.templates.leftArrow),this._check_template(this.o.templates.rightArrow)&&this.picker.find(".next").html(this.o.templates.rightArrow),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan",function(a,b){return parseInt(b)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted),this.setDatesDisabled(this.o.datesDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};k.prototype={constructor:k,_resolveViewName:function(a,c){return 0===a||"days"===a||"month"===a?0:1===a||"months"===a||"year"===a?1:2===a||"years"===a||"decade"===a?2:3===a||"decades"===a||"century"===a?3:4===a||"centuries"===a||"millennium"===a?4:c===b?!1:c},_check_template:function(c){try{if(c===b||""===c)return!1;if((c.match(/[<>]/g)||[]).length<=0)return!0;var d=a(c);return d.length>0}catch(e){return!1}},_process_options:function(b){this._o=a.extend({},this._o,b);var e=this.o=a.extend({},this._o),f=e.language;q[f]||(f=f.split("-")[0],q[f]||(f=o.language)),e.language=f,e.startView=this._resolveViewName(e.startView,0),e.minViewMode=this._resolveViewName(e.minViewMode,0),e.maxViewMode=this._resolveViewName(e.maxViewMode,4),e.startView=Math.min(e.startView,e.maxViewMode),e.startView=Math.max(e.startView,e.minViewMode),e.multidate!==!0&&(e.multidate=Number(e.multidate)||!1,e.multidate!==!1&&(e.multidate=Math.max(0,e.multidate))),e.multidateSeparator=String(e.multidateSeparator),e.weekStart%=7,e.weekEnd=(e.weekStart+6)%7;var g=r.parseFormat(e.format);e.startDate!==-(1/0)&&(e.startDate?e.startDate instanceof Date?e.startDate=this._local_to_utc(this._zero_time(e.startDate)):e.startDate=r.parseDate(e.startDate,g,e.language,e.assumeNearbyYear):e.startDate=-(1/0)),e.endDate!==1/0&&(e.endDate?e.endDate instanceof Date?e.endDate=this._local_to_utc(this._zero_time(e.endDate)):e.endDate=r.parseDate(e.endDate,g,e.language,e.assumeNearbyYear):e.endDate=1/0),e.daysOfWeekDisabled=e.daysOfWeekDisabled||[],a.isArray(e.daysOfWeekDisabled)||(e.daysOfWeekDisabled=e.daysOfWeekDisabled.split(/[,\s]*/)),e.daysOfWeekDisabled=a.map(e.daysOfWeekDisabled,function(a){return parseInt(a,10)}),e.daysOfWeekHighlighted=e.daysOfWeekHighlighted||[],a.isArray(e.daysOfWeekHighlighted)||(e.daysOfWeekHighlighted=e.daysOfWeekHighlighted.split(/[,\s]*/)),e.daysOfWeekHighlighted=a.map(e.daysOfWeekHighlighted,function(a){return parseInt(a,10)}),e.datesDisabled=e.datesDisabled||[],a.isArray(e.datesDisabled)||(e.datesDisabled=[e.datesDisabled]),e.datesDisabled=a.map(e.datesDisabled,function(a){return r.parseDate(a,g,e.language,e.assumeNearbyYear)});var h=String(e.orientation).toLowerCase().split(/\s+/g),i=e.orientation.toLowerCase();if(h=a.grep(h,function(a){return/^auto|left|right|top|bottom$/.test(a)}),e.orientation={x:"auto",y:"auto"},i&&"auto"!==i)if(1===h.length)switch(h[0]){case"top":case"bottom":e.orientation.y=h[0];break;case"left":case"right":e.orientation.x=h[0]}else i=a.grep(h,function(a){return/^left|right$/.test(a)}),e.orientation.x=i[0]||"auto",i=a.grep(h,function(a){return/^top|bottom$/.test(a)}),e.orientation.y=i[0]||"auto";else;if(e.defaultViewDate){var j=e.defaultViewDate.year||(new Date).getFullYear(),k=e.defaultViewDate.month||0,l=e.defaultViewDate.day||1;e.defaultViewDate=c(j,k,l)}else e.defaultViewDate=d()},_events:[],_secondaryEvents:[],_applyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(d=b,e=a[f][1]):3===a[f].length&&(d=a[f][1],e=a[f][2]),c.on(e,d)},_unapplyEvents:function(a){for(var c,d,e,f=0;f<a.length;f++)c=a[f][0],2===a[f].length?(e=b,d=a[f][1]):3===a[f].length&&(e=a[f][1],d=a[f][2]),c.off(d,e)},_buildEvents:function(){var b={keyup:a.proxy(function(b){-1===a.inArray(b.keyCode,[27,37,39,38,40,32,13,9])&&this.update()},this),keydown:a.proxy(this.keydown,this),paste:a.proxy(this.paste,this)};this.o.showOnFocus===!0&&(b.focus=a.proxy(this.show,this)),this.isInput?this._events=[[this.element,b]]:this.component&&this.hasInput?this._events=[[this.inputField,b],[this.component,{click:a.proxy(this.show,this)}]]:this._events=[[this.element,{click:a.proxy(this.show,this),keydown:a.proxy(this.keydown,this)}]],this._events.push([this.element,"*",{blur:a.proxy(function(a){this._focused_from=a.target},this)}],[this.element,{blur:a.proxy(function(a){this._focused_from=a.target},this)}]),this.o.immediateUpdates&&this._events.push([this.element,{"changeYear changeMonth":a.proxy(function(a){this.update(a.date)},this)}]),this._secondaryEvents=[[this.picker,{click:a.proxy(this.click,this)}],[a(window),{resize:a.proxy(this.place,this)}],[a(document),{mousedown:a.proxy(function(a){this.element.is(a.target)||this.element.find(a.target).length||this.picker.is(a.target)||this.picker.find(a.target).length||this.isInline||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(b,c){var d=c||this.dates.get(-1),e=this._utc_to_local(d);this.element.trigger({type:b,date:e,dates:a.map(this.dates,this._utc_to_local),format:a.proxy(function(a,b){0===arguments.length?(a=this.dates.length-1,b=this.o.format):"string"==typeof a&&(b=a,a=this.dates.length-1),b=b||this.o.format;var c=this.dates.get(a);return r.formatDate(c,b,this.o.language)},this)})},show:function(){return this.inputField.prop("disabled")||this.inputField.prop("readonly")&&this.o.enableOnReadonly===!1?void 0:(this.isInline||this.picker.appendTo(this.o.container),this.place(),this.picker.show(),this._attachSecondaryEvents(),this._trigger("show"),(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&this.o.disableTouchKeyboard&&a(this.element).blur(),this)},hide:function(){return this.isInline||!this.picker.is(":visible")?this:(this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&this.inputField.val()&&this.setValue(),this._trigger("hide"),this)},destroy:function(){return this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date,this},paste:function(b){var c;if(b.originalEvent.clipboardData&&b.originalEvent.clipboardData.types&&-1!==a.inArray("text/plain",b.originalEvent.clipboardData.types))c=b.originalEvent.clipboardData.getData("text/plain");else{if(!window.clipboardData)return;c=window.clipboardData.getData("Text")}this.setDate(c),this.update(),b.preventDefault()},_utc_to_local:function(a){return a&&new Date(a.getTime()+6e4*a.getTimezoneOffset())},_local_to_utc:function(a){return a&&new Date(a.getTime()-6e4*a.getTimezoneOffset())},_zero_time:function(a){return a&&new Date(a.getFullYear(),a.getMonth(),a.getDate())},_zero_utc_time:function(a){return a&&new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate()))},getDates:function(){return a.map(this.dates,this._utc_to_local)},getUTCDates:function(){return a.map(this.dates,function(a){return new Date(a)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){var a=this.dates.get(-1);return"undefined"!=typeof a?new Date(a):null},clearDates:function(){this.inputField&&this.inputField.val(""),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()},setDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,b),this._trigger("changeDate"),this.setValue(),this},setUTCDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,a.map(b,this._utc_to_local)),this._trigger("changeDate"),this.setValue(),this},setDate:f("setDates"),setUTCDate:f("setUTCDates"),remove:f("destroy"),setValue:function(){var a=this.getFormattedDate();return this.inputField.val(a),this},getFormattedDate:function(c){c===b&&(c=this.o.format);var d=this.o.language;return a.map(this.dates,function(a){return r.formatDate(a,c,d)}).join(this.o.multidateSeparator)},getStartDate:function(){return this.o.startDate},setStartDate:function(a){return this._process_options({startDate:a}),this.update(),this.updateNavArrows(),this},getEndDate:function(){return this.o.endDate},setEndDate:function(a){return this._process_options({endDate:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekDisabled:function(a){return this._process_options({daysOfWeekDisabled:a}),this.update(),this.updateNavArrows(),this},setDaysOfWeekHighlighted:function(a){return this._process_options({daysOfWeekHighlighted:a}),this.update(),this},setDatesDisabled:function(a){this._process_options({datesDisabled:a}),this.update(),this.updateNavArrows()},place:function(){if(this.isInline)return this;var b=this.picker.outerWidth(),c=this.picker.outerHeight(),d=10,e=a(this.o.container),f=e.width(),g="body"===this.o.container?a(document).scrollTop():e.scrollTop(),h=e.offset(),i=[];this.element.parents().each(function(){var b=a(this).css("z-index");"auto"!==b&&0!==b&&i.push(parseInt(b))});var j=Math.max.apply(Math,i)+this.o.zIndexOffset,k=this.component?this.component.parent().offset():this.element.offset(),l=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),m=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),n=k.left-h.left,o=k.top-h.top;"body"!==this.o.container&&(o+=g),this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(n-=b-m)):k.left<0?(this.picker.addClass("datepicker-orient-left"),n-=k.left-d):n+b>f?(this.picker.addClass("datepicker-orient-right"),n+=m-b):this.picker.addClass("datepicker-orient-left");var p,q=this.o.orientation.y;if("auto"===q&&(p=-g+o-c,q=0>p?"bottom":"top"),this.picker.addClass("datepicker-orient-"+q),"top"===q?o-=c+parseInt(this.picker.css("padding-top")):o+=l,this.o.rtl){var r=f-(n+m);this.picker.css({top:o,right:r,zIndex:j})}else this.picker.css({top:o,left:n,zIndex:j});return this},_allow_update:!0,update:function(){if(!this._allow_update)return this;var b=this.dates.copy(),c=[],d=!1;return arguments.length?(a.each(arguments,a.proxy(function(a,b){b instanceof Date&&(b=this._local_to_utc(b)),c.push(b)},this)),d=!0):(c=this.isInput?this.element.val():this.element.data("date")||this.inputField.val(),c=c&&this.o.multidate?c.split(this.o.multidateSeparator):[c],delete this.element.data().date),c=a.map(c,a.proxy(function(a){return r.parseDate(a,this.o.format,this.o.language,this.o.assumeNearbyYear)},this)),c=a.grep(c,a.proxy(function(a){return!this.dateWithinRange(a)||!a},this),!0),this.dates.replace(c),this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate?this.viewDate=new Date(this.o.endDate):this.viewDate=this.o.defaultViewDate,d?this.setValue():c.length&&String(b)!==String(this.dates)&&this._trigger("changeDate"),!this.dates.length&&b.length&&this._trigger("clearDate"),this.fill(),this.element.change(),this},fillDow:function(){var b=this.o.weekStart,c="<tr>";for(this.o.calendarWeeks&&(this.picker.find(".datepicker-days .datepicker-switch").attr("colspan",function(a,b){return parseInt(b)+1}),c+='<th class="cw">&#160;</th>');b<this.o.weekStart+7;)c+='<th class="dow',a.inArray(b,this.o.daysOfWeekDisabled)>-1&&(c+=" disabled"),c+='">'+q[this.o.language].daysMin[b++%7]+"</th>";c+="</tr>",this.picker.find(".datepicker-days thead").append(c)},fillMonths:function(){for(var a=this._utc_to_local(this.viewDate),b="",c=0;12>c;){var d=a&&a.getMonth()===c?" focused":"";b+='<span class="month'+d+'">'+q[this.o.language].monthsShort[c++]+"</span>"}this.picker.find(".datepicker-months td").html(b)},setRange:function(b){b&&b.length?this.range=a.map(b,function(a){return a.valueOf()}):delete this.range,this.fill()},getClassNames:function(b){var c=[],d=this.viewDate.getUTCFullYear(),e=this.viewDate.getUTCMonth(),f=new Date;return b.getUTCFullYear()<d||b.getUTCFullYear()===d&&b.getUTCMonth()<e?c.push("old"):(b.getUTCFullYear()>d||b.getUTCFullYear()===d&&b.getUTCMonth()>e)&&c.push("new"),this.focusDate&&b.valueOf()===this.focusDate.valueOf()&&c.push("focused"),this.o.todayHighlight&&b.getUTCFullYear()===f.getFullYear()&&b.getUTCMonth()===f.getMonth()&&b.getUTCDate()===f.getDate()&&c.push("today"),-1!==this.dates.contains(b)&&c.push("active"),this.dateWithinRange(b)||c.push("disabled"),this.dateIsDisabled(b)&&c.push("disabled","disabled-date"),-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekHighlighted)&&c.push("highlighted"),this.range&&(b>this.range[0]&&b<this.range[this.range.length-1]&&c.push("range"),-1!==a.inArray(b.valueOf(),this.range)&&c.push("selected"),b.valueOf()===this.range[0]&&c.push("range-start"),b.valueOf()===this.range[this.range.length-1]&&c.push("range-end")),c},_fill_yearsView:function(c,d,e,f,g,h,i,j){var k,l,m,n,o,p,q,r,s,t,u;for(k="",l=this.picker.find(c),m=parseInt(g/e,10)*e,o=parseInt(h/f,10)*f,p=parseInt(i/f,10)*f,n=a.map(this.dates,function(a){return parseInt(a.getUTCFullYear()/f,10)*f}),l.find(".datepicker-switch").text(m+"-"+(m+9*f)),q=m-f,r=-1;11>r;r+=1)s=[d],t=null,-1===r?s.push("old"):10===r&&s.push("new"),-1!==a.inArray(q,n)&&s.push("active"),(o>q||q>p)&&s.push("disabled"),q===this.viewDate.getFullYear()&&s.push("focused"),j!==a.noop&&(u=j(new Date(q,0,1)),u===b?u={}:"boolean"==typeof u?u={enabled:u}:"string"==typeof u&&(u={classes:u}),u.enabled===!1&&s.push("disabled"),u.classes&&(s=s.concat(u.classes.split(/\s+/))),u.tooltip&&(t=u.tooltip)),k+='<span class="'+s.join(" ")+'"'+(t?' title="'+t+'"':"")+">"+q+"</span>",q+=f;l.find("td").html(k)},fill:function(){var d,e,f=new Date(this.viewDate),g=f.getUTCFullYear(),h=f.getUTCMonth(),i=this.o.startDate!==-(1/0)?this.o.startDate.getUTCFullYear():-(1/0),j=this.o.startDate!==-(1/0)?this.o.startDate.getUTCMonth():-(1/0),k=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,l=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,m=q[this.o.language].today||q.en.today||"",n=q[this.o.language].clear||q.en.clear||"",o=q[this.o.language].titleFormat||q.en.titleFormat;if(!isNaN(g)&&!isNaN(h)){this.picker.find(".datepicker-days .datepicker-switch").text(r.formatDate(f,o,this.o.language)),this.picker.find("tfoot .today").text(m).toggle(this.o.todayBtn!==!1),this.picker.find("tfoot .clear").text(n).toggle(this.o.clearBtn!==!1),this.picker.find("thead .datepicker-title").text(this.o.title).toggle(""!==this.o.title),this.updateNavArrows(),this.fillMonths();var p=c(g,h-1,28),s=r.getDaysInMonth(p.getUTCFullYear(),p.getUTCMonth());p.setUTCDate(s),p.setUTCDate(s-(p.getUTCDay()-this.o.weekStart+7)%7);var t=new Date(p);p.getUTCFullYear()<100&&t.setUTCFullYear(p.getUTCFullYear()),t.setUTCDate(t.getUTCDate()+42),t=t.valueOf();for(var u,v=[];p.valueOf()<t;){if(p.getUTCDay()===this.o.weekStart&&(v.push("<tr>"),this.o.calendarWeeks)){var w=new Date(+p+(this.o.weekStart-p.getUTCDay()-7)%7*864e5),x=new Date(Number(w)+(11-w.getUTCDay())%7*864e5),y=new Date(Number(y=c(x.getUTCFullYear(),0,1))+(11-y.getUTCDay())%7*864e5),z=(x-y)/864e5/7+1;v.push('<td class="cw">'+z+"</td>")}u=this.getClassNames(p),u.push("day"),this.o.beforeShowDay!==a.noop&&(e=this.o.beforeShowDay(this._utc_to_local(p)),e===b?e={}:"boolean"==typeof e?e={enabled:e}:"string"==typeof e&&(e={classes:e}),e.enabled===!1&&u.push("disabled"),e.classes&&(u=u.concat(e.classes.split(/\s+/))),e.tooltip&&(d=e.tooltip)),u=a.isFunction(a.uniqueSort)?a.uniqueSort(u):a.unique(u),v.push('<td class="'+u.join(" ")+'"'+(d?' title="'+d+'"':"")+">"+p.getUTCDate()+"</td>"),d=null,p.getUTCDay()===this.o.weekEnd&&v.push("</tr>"),p.setUTCDate(p.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(v.join(""));var A=q[this.o.language].monthsTitle||q.en.monthsTitle||"Months",B=this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode<2?A:g).end().find("span").removeClass("active");if(a.each(this.dates,function(a,b){b.getUTCFullYear()===g&&B.eq(b.getUTCMonth()).addClass("active")}),(i>g||g>k)&&B.addClass("disabled"),g===i&&B.slice(0,j).addClass("disabled"),g===k&&B.slice(l+1).addClass("disabled"),this.o.beforeShowMonth!==a.noop){var C=this;a.each(B,function(c,d){var e=new Date(g,c,1),f=C.o.beforeShowMonth(e);f===b?f={}:"boolean"==typeof f?f={enabled:f}:"string"==typeof f&&(f={classes:f}),f.enabled!==!1||a(d).hasClass("disabled")||a(d).addClass("disabled"),f.classes&&a(d).addClass(f.classes),f.tooltip&&a(d).prop("title",f.tooltip)})}this._fill_yearsView(".datepicker-years","year",10,1,g,i,k,this.o.beforeShowYear),this._fill_yearsView(".datepicker-decades","decade",100,10,g,i,k,this.o.beforeShowDecade),this._fill_yearsView(".datepicker-centuries","century",1e3,100,g,i,k,this.o.beforeShowCentury)}},updateNavArrows:function(){if(this._allow_update){var a=new Date(this.viewDate),b=a.getUTCFullYear(),c=a.getUTCMonth();switch(this.viewMode){case 0:this.o.startDate!==-(1/0)&&b<=this.o.startDate.getUTCFullYear()&&c<=this.o.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&b>=this.o.endDate.getUTCFullYear()&&c>=this.o.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:case 3:case 4:this.o.startDate!==-(1/0)&&b<=this.o.startDate.getUTCFullYear()||this.o.maxViewMode<2?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&b>=this.o.endDate.getUTCFullYear()||this.o.maxViewMode<2?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}}},click:function(b){b.preventDefault(),b.stopPropagation();var e,f,g,h,i,j,k;e=a(b.target),e.hasClass("datepicker-switch")&&this.showMode(1);var l=e.closest(".prev, .next");l.length>0&&(f=r.modes[this.viewMode].navStep*(l.hasClass("prev")?-1:1),0===this.viewMode?(this.viewDate=this.moveMonth(this.viewDate,f),this._trigger("changeMonth",this.viewDate)):(this.viewDate=this.moveYear(this.viewDate,f),1===this.viewMode&&this._trigger("changeYear",this.viewDate)),this.fill()),e.hasClass("today")&&!e.hasClass("day")&&(this.showMode(-2),this._setDate(d(),"linked"===this.o.todayBtn?null:"view")),e.hasClass("clear")&&this.clearDates(),e.hasClass("disabled")||(e.hasClass("day")&&(g=parseInt(e.text(),10)||1,h=this.viewDate.getUTCFullYear(),i=this.viewDate.getUTCMonth(),e.hasClass("old")&&(0===i?(i=11,h-=1,j=!0,k=!0):(i-=1,j=!0)),e.hasClass("new")&&(11===i?(i=0,h+=1,j=!0,k=!0):(i+=1,j=!0)),this._setDate(c(h,i,g)),k&&this._trigger("changeYear",this.viewDate),j&&this._trigger("changeMonth",this.viewDate)),e.hasClass("month")&&(this.viewDate.setUTCDate(1),g=1,i=e.parent().find("span").index(e),h=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(i),this._trigger("changeMonth",this.viewDate),1===this.o.minViewMode?(this._setDate(c(h,i,g)),this.showMode()):this.showMode(-1),this.fill()),(e.hasClass("year")||e.hasClass("decade")||e.hasClass("century"))&&(this.viewDate.setUTCDate(1),g=1,i=0,h=parseInt(e.text(),10)||0,this.viewDate.setUTCFullYear(h),e.hasClass("year")&&(this._trigger("changeYear",this.viewDate),2===this.o.minViewMode&&this._setDate(c(h,i,g))),e.hasClass("decade")&&(this._trigger("changeDecade",this.viewDate),3===this.o.minViewMode&&this._setDate(c(h,i,g))),e.hasClass("century")&&(this._trigger("changeCentury",this.viewDate),4===this.o.minViewMode&&this._setDate(c(h,i,g))),this.showMode(-1),this.fill())),this.picker.is(":visible")&&this._focused_from&&a(this._focused_from).focus(),delete this._focused_from},_toggle_multidate:function(a){var b=this.dates.contains(a);if(a||this.dates.clear(),-1!==b?(this.o.multidate===!0||this.o.multidate>1||this.o.toggleActive)&&this.dates.remove(b):this.o.multidate===!1?(this.dates.clear(),this.dates.push(a)):this.dates.push(a),"number"==typeof this.o.multidate)for(;this.dates.length>this.o.multidate;)this.dates.remove(0)},_setDate:function(a,b){b&&"date"!==b||this._toggle_multidate(a&&new Date(a)),b&&"view"!==b||(this.viewDate=a&&new Date(a)),this.fill(),this.setValue(),b&&"view"===b||this._trigger("changeDate"),this.inputField&&this.inputField.change(),!this.o.autoclose||b&&"date"!==b||this.hide()},moveDay:function(a,b){var c=new Date(a);return c.setUTCDate(a.getUTCDate()+b),c},moveWeek:function(a,b){return this.moveDay(a,7*b)},moveMonth:function(a,b){if(!g(a))return this.o.defaultViewDate;if(!b)return a;var c,d,e=new Date(a.valueOf()),f=e.getUTCDate(),h=e.getUTCMonth(),i=Math.abs(b);if(b=b>0?1:-1,1===i)d=-1===b?function(){return e.getUTCMonth()===h}:function(){return e.getUTCMonth()!==c},c=h+b,e.setUTCMonth(c),(0>c||c>11)&&(c=(c+12)%12);else{for(var j=0;i>j;j++)e=this.moveMonth(e,b);c=e.getUTCMonth(),e.setUTCDate(f),d=function(){return c!==e.getUTCMonth()}}for(;d();)e.setUTCDate(--f),e.setUTCMonth(c);return e},moveYear:function(a,b){return this.moveMonth(a,12*b)},moveAvailableDate:function(a,b,c){do{if(a=this[c](a,b),!this.dateWithinRange(a))return!1;c="moveDay"}while(this.dateIsDisabled(a));return a},weekOfDateIsDisabled:function(b){return-1!==a.inArray(b.getUTCDay(),this.o.daysOfWeekDisabled)},dateIsDisabled:function(b){return this.weekOfDateIsDisabled(b)||a.grep(this.o.datesDisabled,function(a){return e(b,a)}).length>0},dateWithinRange:function(a){return a>=this.o.startDate&&a<=this.o.endDate},keydown:function(a){if(!this.picker.is(":visible"))return void((40===a.keyCode||27===a.keyCode)&&(this.show(),a.stopPropagation()));var b,c,d=!1,e=this.focusDate||this.viewDate;switch(a.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),a.preventDefault(),a.stopPropagation();break;case 37:case 38:case 39:case 40:if(!this.o.keyboardNavigation||7===this.o.daysOfWeekDisabled.length)break;b=37===a.keyCode||38===a.keyCode?-1:1,0===this.viewMode?a.ctrlKey?(c=this.moveAvailableDate(e,b,"moveYear"),c&&this._trigger("changeYear",this.viewDate)):a.shiftKey?(c=this.moveAvailableDate(e,b,"moveMonth"),c&&this._trigger("changeMonth",this.viewDate)):37===a.keyCode||39===a.keyCode?c=this.moveAvailableDate(e,b,"moveDay"):this.weekOfDateIsDisabled(e)||(c=this.moveAvailableDate(e,b,"moveWeek")):1===this.viewMode?((38===a.keyCode||40===a.keyCode)&&(b=4*b),c=this.moveAvailableDate(e,b,"moveMonth")):2===this.viewMode&&((38===a.keyCode||40===a.keyCode)&&(b=4*b),c=this.moveAvailableDate(e,b,"moveYear")),c&&(this.focusDate=this.viewDate=c,this.setValue(),this.fill(),a.preventDefault());break;case 13:if(!this.o.forceParse)break;e=this.focusDate||this.dates.get(-1)||this.viewDate,this.o.keyboardNavigation&&(this._toggle_multidate(e),d=!0),this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(a.preventDefault(),a.stopPropagation(),this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}d&&(this.dates.length?this._trigger("changeDate"):this._trigger("clearDate"),this.inputField&&this.inputField.change())},showMode:function(a){a&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(this.o.maxViewMode,this.viewMode+a))),this.picker.children("div").hide().filter(".datepicker-"+r.modes[this.viewMode].clsName).show(),this.updateNavArrows()}};var l=function(b,c){a(b).data("datepicker",this),this.element=a(b),this.inputs=a.map(c.inputs,function(a){return a.jquery?a[0]:a}),delete c.inputs,n.call(a(this.inputs),c).on("changeDate",a.proxy(this.dateUpdated,this)),this.pickers=a.map(this.inputs,function(b){return a(b).data("datepicker")}),this.updateDates()};l.prototype={updateDates:function(){this.dates=a.map(this.pickers,function(a){return a.getUTCDate()}),this.updateRanges()},updateRanges:function(){var b=a.map(this.dates,function(a){return a.valueOf()});a.each(this.pickers,function(a,c){c.setRange(b)})},dateUpdated:function(b){if(!this.updating){this.updating=!0;var c=a(b.target).data("datepicker");if("undefined"!=typeof c){var d=c.getUTCDate(),e=a.inArray(b.target,this.inputs),f=e-1,g=e+1,h=this.inputs.length;if(-1!==e){if(a.each(this.pickers,function(a,b){b.getUTCDate()||b.setUTCDate(d)}),d<this.dates[f])for(;f>=0&&d<this.dates[f];)this.pickers[f--].setUTCDate(d);else if(d>this.dates[g])for(;h>g&&d>this.dates[g];)this.pickers[g++].setUTCDate(d);this.updateDates(),delete this.updating}}}},remove:function(){a.map(this.pickers,function(a){a.remove()}),delete this.element.data().datepicker}};var m=a.fn.datepicker,n=function(c){var d=Array.apply(null,arguments);d.shift();var e;if(this.each(function(){var b=a(this),f=b.data("datepicker"),g="object"==typeof c&&c;if(!f){var j=h(this,"date"),m=a.extend({},o,j,g),n=i(m.language),p=a.extend({},o,n,j,g);b.hasClass("input-daterange")||p.inputs?(a.extend(p,{inputs:p.inputs||b.find("input").toArray()}),f=new l(this,p)):f=new k(this,p),b.data("datepicker",f)}"string"==typeof c&&"function"==typeof f[c]&&(e=f[c].apply(f,d))}),e===b||e instanceof k||e instanceof l)return this;if(this.length>1)throw new Error("Using only allowed for the collection of a single element ("+c+" function)");return e};a.fn.datepicker=n;var o=a.fn.datepicker.defaults={assumeNearbyYear:!1,autoclose:!1,beforeShowDay:a.noop,beforeShowMonth:a.noop,beforeShowYear:a.noop,beforeShowDecade:a.noop,beforeShowCentury:a.noop,calendarWeeks:!1,clearBtn:!1,toggleActive:!1,daysOfWeekDisabled:[],daysOfWeekHighlighted:[],datesDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,maxViewMode:4,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-(1/0),startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0,disableTouchKeyboard:!1,enableOnReadonly:!0,showOnFocus:!0,zIndexOffset:10,container:"body",immediateUpdates:!1,title:"",templates:{leftArrow:"&laquo;",rightArrow:"&raquo;"}},p=a.fn.datepicker.locale_opts=["format","rtl","weekStart"];a.fn.datepicker.Constructor=k;var q=a.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",titleFormat:"MM yyyy"}},r={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10},{clsName:"decades",navFnc:"FullDecade",navStep:100},{clsName:"centuries",navFnc:"FullCentury",navStep:1e3}],isLeapYear:function(a){return a%4===0&&a%100!==0||a%400===0},getDaysInMonth:function(a,b){return[31,r.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,parseFormat:function(a){if("function"==typeof a.toValue&&"function"==typeof a.toDisplay)return a;var b=a.replace(this.validParts,"\x00").split("\x00"),c=a.match(this.validParts);if(!b||!b.length||!c||0===c.length)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(e,f,g,h){function i(a,b){return b===!0&&(b=10),100>a&&(a+=2e3,a>(new Date).getFullYear()+b&&(a-=100)),a}function j(){var a=this.slice(0,s[n].length),b=s[n].slice(0,a.length);return a.toLowerCase()===b.toLowerCase()}if(!e)return b;if(e instanceof Date)return e;if("string"==typeof f&&(f=r.parseFormat(f)),f.toValue)return f.toValue(e,f,g);var l,m,n,o,p=/([\-+]\d+)([dmwy])/,s=e.match(/([\-+]\d+)([dmwy])/g),t={d:"moveDay",m:"moveMonth",w:"moveWeek",y:"moveYear"},u={yesterday:"-1d",today:"+0d",tomorrow:"+1d"};if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)){for(e=new Date,n=0;n<s.length;n++)l=p.exec(s[n]),m=parseInt(l[1]),o=t[l[2]],e=k.prototype[o](e,m);return c(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}if("undefined"!=typeof u[e]&&(e=u[e],s=e.match(/([\-+]\d+)([dmwy])/g),/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e))){for(e=new Date,n=0;n<s.length;n++)l=p.exec(s[n]),m=parseInt(l[1]),o=t[l[2]],e=k.prototype[o](e,m);return c(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())}s=e&&e.match(this.nonpunctuation)||[],e=new Date;var v,w,x={},y=["yyyy","yy","M","MM","m","mm","d","dd"],z={yyyy:function(a,b){return a.setUTCFullYear(h?i(b,h):b)},yy:function(a,b){return a.setUTCFullYear(h?i(b,h):b)},m:function(a,b){if(isNaN(a))return a;for(b-=1;0>b;)b+=12;for(b%=12,a.setUTCMonth(b);a.getUTCMonth()!==b;)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}};z.M=z.MM=z.mm=z.m,z.dd=z.d,e=d();var A=f.parts.slice();if(s.length!==A.length&&(A=a(A).filter(function(b,c){return-1!==a.inArray(c,y)}).toArray()),s.length===A.length){var B;for(n=0,B=A.length;B>n;n++){if(v=parseInt(s[n],10),l=A[n],isNaN(v))switch(l){case"MM":w=a(q[g].months).filter(j),v=a.inArray(w[0],q[g].months)+1;break;case"M":w=a(q[g].monthsShort).filter(j),v=a.inArray(w[0],q[g].monthsShort)+1}x[l]=v}var C,D;for(n=0;n<y.length;n++)D=y[n],D in x&&!isNaN(x[D])&&(C=new Date(e),z[D](C,x[D]),isNaN(C)||(e=C))}return e},formatDate:function(b,c,d){if(!b)return"";if("string"==typeof c&&(c=r.parseFormat(c)),
c.toDisplay)return c.toDisplay(b,c,d);var e={d:b.getUTCDate(),D:q[d].daysShort[b.getUTCDay()],DD:q[d].days[b.getUTCDay()],m:b.getUTCMonth()+1,M:q[d].monthsShort[b.getUTCMonth()],MM:q[d].months[b.getUTCMonth()],yy:b.getUTCFullYear().toString().substring(2),yyyy:b.getUTCFullYear()};e.dd=(e.d<10?"0":"")+e.d,e.mm=(e.m<10?"0":"")+e.m,b=[];for(var f=a.extend([],c.separators),g=0,h=c.parts.length;h>=g;g++)f.length&&b.push(f.shift()),b.push(e[c.parts[g]]);return b.join("")},headTemplate:'<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};r.template='<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">'+r.headTemplate+"<tbody></tbody>"+r.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-decades"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+'</table></div><div class="datepicker-centuries"><table class="table-condensed">'+r.headTemplate+r.contTemplate+r.footTemplate+"</table></div></div>",a.fn.datepicker.DPGlobal=r,a.fn.datepicker.noConflict=function(){return a.fn.datepicker=m,this},a.fn.datepicker.version="1.6.4",a(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(b){var c=a(this);c.data("datepicker")||(b.preventDefault(),n.call(c,"show"))}),a(function(){n.call(a('[data-provide="datepicker-inline"]'))})});function reDirectPreliquidacionHome(){
	
	var valorPreliquidacion = document.getElementById("valorPreliquidacionProd").value;

	location.href="/PSPES/homePreliquidacion?preliquidacion="+valorPreliquidacion+"";
	
}



function descargarGrillaCuentaCC(){
		var valorMoneda = $("#selectorMoneda option:selected").val();
		var valorDatapicker = convertirFechaPeriodo($("#inputDataPicker").val()); 
		var valorProductor = document.getElementById("numProductorCC").value;
		
		location.href="/PSPES/exportarExcelCCProductor?productor="+valorProductor+"&moneda="+valorMoneda+"&periodo="+valorDatapicker+"";
}

function reDirectRemesa(){
	var valorRemesa = document.getElementById("valorRemesa").value;

	location.href="/PSPES/homeRemesa?remesa="+valorRemesa+"";
}

function reDirectCompromisos(){

	var valorCompromiso = document.getElementById("valorCompromiso").value;

	location.href="/PSPES/homeCompromiso?compromiso="+valorCompromiso+"";
	
}

function ccCorrienteProductorHome()
{
	bloquearPantallaGris();
	$('#datepickerProd').datepicker({
		defaultDate: new Date(),
		format: 'mm/yyyy',
	    endDate: 'new date()',
	    minViewMode: 1,
	    language: 'es',
	    orientation: 'bottom auto',
	    multidate: false,
	    autoclose:true
	}).on('changeDate',function(){
		mostrarPantallaCuentaCorrienteProductor();

	});
	$('#datepickerProd').datepicker(
		"update" , new Date(new Date().getFullYear(), new Date().getMonth()));


	  mostrarPantallaCuentaCorrienteProductor();
	  
	  
	  shortcut.add("esc",function() {
			$( ".cerrarModalBotonHoover" ).trigger( "click" );
	  })
		$.unblockUI();
}



function mostrarPantallaCuentaCorrienteProductor(){
	
	var valorProductor = document.getElementById("numProductorCC").value;
	var valorMoneda = $("#selectorMoneda option:selected").val();
	var valorDatapicker = convertirFechaPeriodo($("#inputDataPicker").val()); 
	var valorPeriodo = $("#inputDataPicker").val(); 
	var valorMonedaDesc = $('select[name="selectorMoneda"] option:selected').text();
	

	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosMovimientoProductorCC',
	    contentType: 'application/json', 
	    data : {productor:valorProductor,moneda : valorMoneda, periodo : valorDatapicker} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try {
	    
	    		$('#tituloMovimiento').text("Resumen de Movimientos (" + json.length+")");	
	    		$('#labelMovimiento').text("Detalle de Movimentos");	
    	 		$('#datosParametricosProductorCC').html("<h5 style='border:none;text-align:center;padding-top:6%;'>Seleccione un movimiento para ver su detalle.</b></h5>");	
    	    	
	    		var d1 = document.getElementById("panelBdatosParametricos");
    	    	d1.innerHTML = ' ';
	    		
    	    	var panelNuevo = '<div>';
    	    	var nombrePanel ='timeLineItemMovimientos';
    	    	for ( var int = 0; int < json.length; int++) {
    	    		tipoMov = "'"+json[int]['P_TF_LISTA_TP_MOVIMIENTO']+"'";
    	    		descMov = "'"+json[int]['P_TF_LISTA_DESC_TP_MOVIMIENTO']+"'";
    	    		nombreCard = "'timeLineItemMovimientos'";
    	    		
    	    		panelNuevo = panelNuevo +'<div  id="cuadroImgEndoso" style="cursor:pointer;background-color:#ffffff";>'+
    	    		'<div class="timeline__post seleccionPanelB" id="timeLineItemMovimientos'+int+'" onclick="mostrarDetalleMovimientosProductorCC('+nombreCard+','+int+','+tipoMov+','+descMov+')";  style="cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px">'+
    	    		'<div class="timeline__content" style="overflow:hidden;">'+
    	    		'<i class="material-icons altoIcono"  style="color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;"  id="timeLineItemMovimientos'+int+'">attach_money</i>'+
    	    		'<h6>Movimiento : <b>'+validarCampoVacio((json[int]['P_TF_LISTA_TP_MOVIMIENTO']))+' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_DESC_TP_MOVIMIENTO']))+'</b></h6>'+
    	    		'<h6>Cantidad : <b>'+validarCampoVacio(json[int]['P_TF_LISTA_CANTIDAD'])+' </b></h6>'+
    	    		'<h6>Importe : <b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_IMPORTE']))+'</b></h6>'+
    	    		'</div></div></div>';
    	    	}
    	    	d1.innerHTML = panelNuevo;  

    		

	    	$.unblockUI();
	    	} catch (e) {

	    		mostrarError('error : 1928748'+e);
	    	}

	    },
	 
	    error : function(xhr, status) {
	    	$('#labelMovimiento').text("Detalle de Movimentos");	
	    	$('#tituloMovimiento').text("Resumen de Movimientos");	
	 		$('#datosParametricosProductorCC').html("<h5 style='border:none;text-align:center;padding-top:6%;'>No se encontraron movimientos para el per&iacute;odo <b>"+valorPeriodo+"</b> y moneda <b>"+valorMonedaDesc+"</b></h5>");	

    		var d1 = document.getElementById("panelBdatosParametricos");
	    	d1.innerHTML = ' ';
	    	panelNuevo="<div  id='cuadroImgVacio' style='cursor:pointer; background-color:#ffffff'>"+
	    				"<div class='timeline__post seleccionPanelB' id='timeLineItemVacio' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A'>"+
	    				"<div class='timeline__content' style='overflow:hidden;'>"+
	    				"<i class='material-icons altoIcono'  style='color:#205081; font-size:40px; float:left; margin-right:20px;'  id='imgTimeLineVacio'>&#xE611;</i>"+
	    				"<h6 id='etiquetaVacio' style='padding-top: 15px; padding-bottom: 15px; color:#b3b0b0;'>No se encontraron movimientos</h6>"+
	    				"</div></div></div>";
	    	d1.innerHTML = panelNuevo;  
	    	$.unblockUI();
	        },
	 
	   
	});
	
};
	
function convertirFechaPeriodo(fecha){
	
	var fechaA= fecha.substring(3,7);
	var fechaB= fecha.substring(0,2);

	var fechafinal = fechaA+ fechaB;
	return fechafinal;
	
}


function mostrarDetalleMovimientosProductorCC(obj,num,movimiento,descMovi){	
	bloquearPantallaGris();
	
	var valorProductor = document.getElementById("numProductorCC").value;
	var valorMoneda = $("#selectorMoneda option:selected").val();
	var valorDatapicker = convertirFechaPeriodo($("#inputDataPicker").val()); 
	
	

	$.ajax({
	    url : 'datosDetalleMovimientoProductorCC',
	    contentType: 'application/json', 
	    data : { productor : valorProductor, moneda:valorMoneda, periodo : valorDatapicker , movimiento:movimiento},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    			
	    		$('#labelMovimiento').text("Detalle de Movimientos #"+primeraLetraMayus(descMovi))+"("+json.length+")";	
	    		$(".seleccionPanelB").each(function(){
	    			$(this).css("background","white");
	    		});
	    		$(".timeline__date").each(function(){
	    			$(this).css("background","white");
	    		});
	    		
	    		$('#'+obj+num).css("background","#bac2bb");
	    		
	    			
		    		
		    		var data=[];
	    	    	for ( var i = 0; i < json.length; i++) {
	    	    	        var d = (data[i] = {});
	    	    	        d["fecha"] =  formatearFechaJson(json[i]['P_TF_LISTA_FE_MOVIMIENTO']);
	    	    	        d["imputacion"] = json[i]['P_TF_LISTA_IMPUTACION'];
	    	    	        d["comprobante"] = json[i]['P_TF_LISTA_COMPROBANTE'];
	    	    	        d["obs"] = primeraLetraMayus(json[i]['P_TF_LISTA_OBSERVACIONES']);
	    	    	        d["remesa"] = primeraLetraMayus(json[i]['P_TF_LISTA_REMESA']);
	    	    	        d["comision"] = "$ "+json[i]['P_TF_LISTA_COMISION'];
	    	    	        d["posicion"] = ""+i;
	    	    	    	
	    	    	}
	    	    	completarDetalleTablaCCProductor(data,valorProductor, valorMoneda,movimiento );
	    			
	    		}
	    		
	    	catch(e)
	    	{
	    		alert('Error (444999494) generado por : '+e);
	    	}
	    	$.unblockUI();
	
	    	    },
	    	    error : function(xhr, status) {
	    	    	$('#labelMovimiento').text("Detalle de Movimentos");	
	    	 		$('#datosParametricosProductorCC').html("<h5 style='border:none;text-align:center;padding-top:6%;'>No se encontraron un detalle del movimiento para el per&iacute;odo <b>"+valorPeriodo+"</b> y moneda <b>"+valorMonedaDesc+"</b></h5>");	
	    	    	$.unblockUI();
	    	    	}
	    	});
}









//variable local a la funcion completarDetalleTablaCertificados
var buscarFiltroMovimientos="";
var dataView;
var grid;
function completarDetalleTablaCCProductor(data, productor, moneda, movimiento){
	var valorDatapicker = convertirFechaPeriodo($("#inputDataPicker").val()); 

	var columns = [
	{id: "posicion", name: "#", field: "posicion", width:30, selectable: false, resizable: false},
	{id: "fecha", name: "Fecha", field: "fecha",width:100,  cssClass: "cell-title", selectable: false, resizable: false},
   {id: "imputacion", name: "Imputaci&oacute;n",width:100, field: "imputacion",  selectable: false, resizable: false},
   {id: "comprobante", name: "Comprobante",width:120, field: "comprobante",  selectable: false, resizable: false},
   {id: "remesa", name: "Remesa",width:100, field: "remesa",  selectable: false, resizable: false},
   {id: "comision", name: "Comisi&oacute;n", width:120, field: "comision",  cssClass: "cell-title", selectable: false, resizable: false},
   {id: "obs", name: "Obs", field: "obs", width:220, selectable: false, resizable: false}
   ];

	       	var options = {
	       	    editable: true,
	       	    enableAddRow: false,
	       	    enableCellNavigation: true,
	       	    asyncEditorLoading: false,
	       	    fullWidthRows:true,
	       	    rowHeight: 25
	       	};
	       	
	      //inicializo la grilla
	        dataView = new Slick.Data.DataView({ inlineFilters: true });
	        dataView.beginUpdate();
	        dataView.setItems(data, "posicion");
	        dataView.setFilter(filtroProductorMovimiento);
	        dataView.endUpdate();
	        
	        // inicializo la grilla
	        grid = new Slick.Grid("#datosParametricosProductorCC", dataView, columns, options);
	 	
	    grid.onClick.subscribe(function (e) {
	    	
	        var cell = grid.getCellFromEvent(e);
	        
	        var row = cell.row;
	        var row_values = dataView.getItem(row);
	        	    	
	        mostrarDetalleMovimientoSeleccionado(row,productor,moneda,movimiento,valorDatapicker);
	    	
	    });
	    
	    dataView.onRowCountChanged.subscribe(function (e, args) {
	    	grid.updateRowCount();
	    	grid.render();
	    });

	    dataView.onRowsChanged.subscribe(function (e, args) {
	    	grid.invalidateRows(args.rows);
	    	grid.render();
	    });
	  
	    $("#inputBusquedaProductorMovimientos").keyup(function (e) {
	        Slick.GlobalEditorLock.cancelCurrentEdit();

	        // clear on Esc
	        if (e.which == 27) {
	          this.value = "";
	        }

	        buscarFiltroMovimientos = this.value.toUpperCase();
	        updateFilterProductor();

	     });
	    
	    //Modifico tamanio del scroll slickviewport
	    document.getElementById("idSlickViewport").style.height = "160px";
	    
	    
	    var x = document.getElementsByClassName("slick-header-column");
	    /*Se cambia el tama�o del encabezado de tabla de header certificados*/
	    for(var i = 0; i<7; i++){
		    x[i].style.height="20px";
		    
	    }
	    
}

function mostrarDetalleMovimientoSeleccionado(numero,productor,moneda, movimiento,periodo){
	$.ajax({
		  url : 'datosDetalleMovimientoProductorCC',
		    contentType: 'application/json', 
		    data : { productor : productor, moneda:moneda, periodo : periodo , movimiento:movimiento},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		ocultarMOstrarbontesPanelD(json[0]['P_TF_LISTA_TP_MOVIMIENTO']);
	    		$("#valorPreliquidacionProd").val(json[numero]['P_TF_LISTA_COMPROBANTE']);
	    		$("#valorRemesa").val(json[numero]['P_TF_LISTA_REMESA']);
	    		$("#valorCompromiso").val(json[numero]['P_TF_LISTA_IMPUTACION']);

	    			llenarDinamicamente(json[numero]);
	    			
	    	    	$('#DATO_MOVIMIENTO_PROD').text("Movimiento #"+numero);	    	    	
	    	    	$('#DATO_COMISION_PROD_CC').html("<b>$"+validarCampoVacio(json[numero]['P_TF_LISTA_COMISION'])+"</b>");	    	    	

	    			
			    	abrirPopUpNuevo('productorMovCCPopUp');	

	    	} catch (e) {
	    		alert('Code 77128 : No pudo cargar.');
	    	}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('3133 - Se a producido un inconveniente el detalle del movimiento seleccionado');
	    },
	   
	});
	
}


function updateFilterProductor() {
    dataView.setFilterArgs({
      searchString: buscarFiltroMovimientos
    });
    dataView.refresh();
}

function filtroProductorMovimiento(item) {

	//var posicion = item["posicion"];
	
    if (buscarFiltroMovimientos != "" && item["posicion"].indexOf(buscarFiltroMovimientos) == -1
        && item["fecha"].indexOf(buscarFiltroMovimientos) == -1
        && item["imputacion"].indexOf(buscarFiltroMovimientos) == -1
        && item["comprobante"].indexOf(buscarFiltroMovimientos) == -1
        && item["obs"].indexOf(buscarFiltroMovimientos) == -1) {
        
    	return false;
    }

    if (item.parent != null) {
        var parent = data[item.parent];
        //var posicionParent = parent["posicion"];
    	
        while (parent) {
            if (parent._collapsed ||
                (buscarFiltroMovimientos != "" && item["posicion"].indexOf(buscarFiltroMovimientos) == -1
                        && parent["fecha"].indexOf(buscarFiltroMovimientos) == -1
                        && parent["imputacion"].indexOf(buscarFiltroMovimientos) == -1
                        && parent["comprobante"].indexOf(buscarFiltroMovimientos) == -1
                        && parent["obs"].indexOf(buscarFiltroMovimientos) == -1)) {
                        
                return false;
            }

            parent = data[parent.parent];
        }
    }

    return true;

	
	
}

function ocultarMOstrarbontesPanelD(tipo){


	if(tipo == 'LN'){
		$('#botonPreliquidacion').show();
		$('#botonRemesas').hide();
		$('#botonCompromiso').hide();
	}
	
	else if(tipo == 'CH' || tipo == 'CD'){
		$('#botonPreliquidacion').hide();
		$('#botonRemesas').show();
		$('#botonCompromiso').hide();
	}
	
	else if(tipo == 'LI'){
		$('#botonPreliquidacion').hide();
		$('#botonRemesas').hide();
		$('#botonCompromiso').show();
	}

	else{
		$('#botonPreliquidacion').hide();
		$('#botonRemesas').hide();
		$('#botonCompromiso').hide();
	}

}


function mostrarDetalleNidHome(obj,num,icono,orden){
	bloquearPantallaGris();
	var valorNid=document.getElementById("valorNidHome").value;
	$.ajax({
	    url : 'datosDetalleNid',
	    contentType: 'application/json', 
	    data : {nid:valorNid, orden:orden} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);
			$("#DATO_NOVEDAD").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_GEAD_GEAN_CD_TIPO_NOVEDAD']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_INB_TIPO_NOVEDAD']))+ "</b>");
			$("#DATO_DERIVADO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_GEAD_CJDP_CD_DERIVADO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_INB_DERIVADO']))+ "</b>");
			$("#DATO_USUARIO").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_GEAD_CAUS_CD_USUARIO'])) +" - "+validarCampoVacio(json[0]['P_TF_DETALLE_INB_USUARIO'])+ "</b>");
			$("#DATO_CARTA").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_GEAD_NU_CARTA']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_INB_CARTA']))+ "</b>");
			$("#DATO_RECHAZO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_GEAD_GEAR_CD_MOTIVO_RECHAZO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_INB_MOTIVO_RECHAZO']))+ "</b>");

	    	
	
	   	//muestra el panel D
		$('#panelb').hide();
		$('#panela').show();
		$('#panelHistorialNid').show();
		$('#verMasPanelA').text('Ver mas');

		
		
		$(".seleccionPanelB").each(function(){
	 	    $(this).css("background","white");
	 	});
		$('#'+obj+num).css("background","#bac2bb");
		
		$('#labelPanelDetalleNid').html("Detalle Orden #"+ orden);
		
		var d1 = document.getElementById("panelImagenNid");
		d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
	    	}
	    catch(e){
	    		alert('Error (5467) generado por : '+e);
	    	}
	},
    error : function(xhr, status) {
    	mostrarError(xhr['responseText']);
    }
});
}

function redirectPoliza(poliza,ramo,sucursal){
	bloquearPantallaGris();
	location.href = "/PSPES/homePoliza?poliza="+poliza+"&ramo="+ramo+"&sucursal="+sucursal;

}

function redirecPreliquidacionesHome(){
	bloquearPantallaGris();

	var valorPreliquidacion = document.getElementById("valorPreliquidacion").value;

	location.href="/PSPES/homePreliquidacion?preliquidacion="+valorPreliquidacion+"";
	
}


function inicioCobranzaHome(){
	activarCaru();
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );

});
	
}

function mostrarDetalleCuotas(obj,numeroCard,icono,fecha)
{
	bloquearPantallaGris();
	var valorSucursal=document.getElementById("valorSucursal").value;
	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorCertificado=document.getElementById("valorCertificadoCobranza").value;
	

	$.ajax({
	    url : 'detalleCuotas',
	    contentType: 'application/json', 
	    data : { ramo : valorRamo , poliza : valorPoliza,fecha : fecha, certificado : valorCertificado,sucursal:valorSucursal  },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	  
	    	var d1 = document.getElementById("listaTitulo");
	    	var d2 = document.getElementById("listaResultado");
	    	
	    	d1.innerHTML = ' '; 
	    	d2.innerHTML = ' '; 
	    	
	    	var resultadoCuotas = '<div class="tab-content" id="nav-tabContent">';
	    	
	    	var listaCuotas = '<div class="list-group" id="list-tab" role="tablist">';
	    
	    	//llena el panel D
	    	for ( var int = 0; int < json.length; int++) {
	    		var num=int+1;
	    	
	    		//verifica que sea el primero, y si lo es lo acitva y muestra su contenido
	    		if(num == 1){
	    			//Setea el titulo de la lista
	    			listaCuotas = listaCuotas + '<a class="list-group-item list-group-item-action active" id="list'+num+'" data-toggle="list" href="#list-home'+num+'" role="tab" aria-controls="home"><h6>'+(json[int]['P_TF_CUOTA_INB_DE_TIPO'])+'</h6></a>';
	    			//Setea el campo de la lista
	    			resultadoCuotas = resultadoCuotas + '<div class="tab-pane show active" id="list-home'+num+'" role="tabpanel" aria-labelledby="list-home-list'+num+'">'+
	    		'<div class="row" id="panelc"><div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">' +
	    		'<table  style= "width:100%;">'+
                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Fecha:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_CUOTA_CARE_FE_EMISION']))+' - '+ formatearFechaJson(json[int]['P_TF_CUOTA_CARE_FE_HASTA'])+'</b></h6></td></tr> ' +
                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Premio :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_CUOTA_CARE_MT_PRIMA']))+'</b></h6></td></tr>' + 
                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Certificado :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[int]['P_TF_CUOTA_CARE_CACE_NU_CERTIFICADO'])+'</b></h6></td></tr>' + 
                	'</table></div>'+
         		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">'+
	    			'<table  style= "width:100%;">'+
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Prima Pura :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_CUOTA_CARE_MT_PRIMA_PURA']))+'</b></h6></td></tr> ' +
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Periodo :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[int]['P_TF_CUOTA_INB_PERIODO'])+'</b></h6></td></tr>' + 
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Endoso :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[int]['P_TF_CUOTA_CARE_NU_ENDOSO'])+'</b></h6></td></tr>' + 
	                	'</table></div>'+
            	' </div>'+
   			'</div>';
	    		}
	    	//si no es el primero llena los demas campos, pero no los activa
	    		
	    		else{
	    			listaCuotas = listaCuotas + '<a class="list-group-item list-group-item-action" id="list'+num+'" data-toggle="list" href="#list-home'+num+'" role="tab" aria-controls="home"><h6>'+json[int]['P_TF_CUOTA_INB_DE_TIPO']+'</h6></a>';
	    			resultadoCuotas = resultadoCuotas + '<div class="tab-pane" id="list-home'+num+'" role="tabpanel" aria-labelledby="list-profile-list">' +
	    			'<div class="row" id="panelc"><div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">' +
		    		'<table  style= "width:100%;">'+
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Fecha:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+formatearFechaJson(json[int]['P_TF_CUOTA_CARE_FE_EMISION'])+' - '+ formatearFechaJson(json[int]['P_TF_CUOTA_CARE_FE_HASTA'])+'</b></h6></td></tr> ' +
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Premio :</h6></td><td style="padding-top:5px;"><h6><b>'+(formatearMoneda(json[int]['P_TF_CUOTA_CARE_MT_PRIMA']))+'</b></h6></td></tr>' + 
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Certificado :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_CUOTA_CARE_CACE_NU_CERTIFICADO'])+'</b></h6></td></tr>' + 
	                	'</table></div>'+
	         		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">'+
		    			'<table  style= "width:100%;">'+
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Prima Pura :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+(formatearMoneda(json[int]['P_TF_CUOTA_CARE_MT_PRIMA_PURA']))+'</b></h6></td></tr> ' +
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Periodo :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_CUOTA_INB_PERIODO'])+'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Endoso :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_CUOTA_CARE_NU_ENDOSO'])+'</b></h6></td></tr>' + 
			                
		                	'</table></div>'+
	            	' </div>'+
	   			'</div>';
	    		
	    		}
		
	    	}
	    	
	    	//pasa el codigo al html
	    	d1.innerHTML = listaCuotas;  
	    	d2.innerHTML = resultadoCuotas;  

	    	
	    	$('#panelb').hide();
			$('#panela').show();
			$('#detalleCuotas').show();
			
			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$('#'+obj+numeroCard).css("background","#bac2bb");
			
			$('#labelPanelCuotasConsolidadas').html("Detalle de Cuotas");
			
			//var d1 = document.getElementById("panelImagenCuotasConsolidadas");
		//	d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';

			$.unblockUI();
	    
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    
	    	 },
	 
	});
			
}



function abrirPopUpImputacionesCobranzaHome(idPopUp,numero,preliquidacion){

	var valorSucursal=document.getElementById("valorSucursal").value;

	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorCertificado=document.getElementById("valorCertificadoCobranza").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'datosImputaciones',
	    contentType: 'application/json', 
	    data : {poliza:valorPoliza, ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	
	    	for ( var int = 0; int < json.length; int++) {
	    		if(preliquidacion == json[int]['P_TF_IMPUTACION_CJIP_CALI_NU_PRELIQUIDACION']){
	    			posicion = int;
	    			break;
	    		}
	    	}
	    	
			
	    	
	    	
	    	llenarDinamicamente(json[posicion]);

	    	$("#valorPreliquidacion").val(json[posicion]['P_TF_IMPUTACION_CJIP_CALI_NU_PRELIQUIDACION']);
	    	
			$("#DATO_P_TF_IMPUTACION_CJIP_CALI_NU_PRELIQUIDACION").html("Preliquidaci&oacute;n :&nbsp#" + json[posicion]['P_TF_IMPUTACION_CJIP_CALI_NU_PRELIQUIDACION']);

			$("#DATO_P_TF_IMPUTACION_MONEDA").html("<b>" + json[posicion]['P_TF_IMPUTACION_CJIP_CALI_CD_MONEDA'] +" - "+ verificarCampoJson(json[posicion]['P_TF_IMPUTACION_INB_DE_MONEDA'])+ "</b>");
			
			
			$("#INFO_COD_PAGO").html("<b>"+ validarCampoVacio(json[posicion]['P_TF_IMPUTACION_INB_CD_COBRANZA']) +" - " + validarCampoVacio(primeraLetraMayus(json[posicion]['P_TF_IMPUTACION_INB_DE_COBRANZA'])) + "</b>");
			
			$("#DATO_COBRANZA_IMPUTACIONES_PAGADO").html("<b>" + validarCampoVacio(formatearMoneda(json[posicion]['P_TF_IMPUTACION_CJIP_MT_PAGADO'])) +"</b>");

	    	
			//Abre el modal
			$("#"+idPopUp).modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos de la impustacion',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError('Se produjo un inconveniente al cargar los datos de la impustacion');
	    },
	 
	   
	});
	

};


function abrirPopUpModalCliente(id)
{
	
    location.href = "/PSPES/datosCliente?valorCliente="+id+"";

}

function buscarFiltroImputacionesCobranzaHome(idTablaParametricos){
	
	input = document.getElementById("inputImputacionesCobranzaHome");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function mostrarPanelDetallePeriodoComisiones(obj,numeroCard,periodoFormateado,periodo,icono){
	bloquearPantallaGris();
	var valorPoliza = document.getElementById("valorPolizaComi").value;
	var valorRamo = document.getElementById("valorRamoComi").value;
	var valorCertificado = document.getElementById("valorCertificadoComi").value;
	var valorSucursal=document.getElementById("valorSucursal").value;

	$.ajax({
	    url : 'datosComidev',
	    contentType: 'application/json', 
	    data : {ramo : valorRamo , poliza : valorPoliza,certificado:valorCertificado,periodo:periodo,sucursal:valorSucursal},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	
	    	try{
	    		var d1 = document.getElementById("datosParametricosComi");
    	    	d1.innerHTML = ' ';
	    		
        		if(json.length == 1){
        	    	var panelNuevo = '<div class="row" id="datosParametricosComi" style="height:130px;overflow-y:auto;">';
	    			}
	    		else{
    	    	var panelNuevo = '<div class="row" id="datosParametricosComi" style="height:250px;overflow-y:auto;">';
	    		}    	    	for ( var int = 0; int < json.length; int++) {
    	    		panelNuevo = panelNuevo +'<div class="col-md-10" style="text-align: left;padding-left:1px;padding-right:1px"><h6 style="text-align:center;padding-top:10px;padding-bottom:10px;"><b>'+validarCampoVacio(devLibe(json[int]['P_TF_LISTA_INB_TP_MOVIMIENTO']))+'</b></h6></div>'+
    	    		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px"><table  style= "width:100%;">'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fecha&nbsp;Mov.&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_INB_FE_MOVIMIENTO'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Comprobante&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio((json[int]['P_TF_LISTA_INB_COMPROBANTE'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Productor&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[0]['P_TF_LISTA_INB_PRODUCTOR'])+" - " + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_PRODUCTOR']))+'</b></h6></td></tr></table></div>'+
    	    		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px"><table  style= "width:100%;">'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Componente&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_INB_COMPONENTE'])+'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Comisi&oacute;n&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_INB_COMISION'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Moneda&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_INB_MONEDA'])+ " - " + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_MONEDA']))+'</b></h6></td></tr></table></div>'+
					'<hr style="margin-top:5px;margin-bottom:5px;width:90%;">';
    	    	}
    	    	d1.innerHTML = panelNuevo;  			
			}
	    	catch (e)
	    	{
	    		alert('Se produjo un inconveniente al mostrar las comisiones devengadas:'+e);
	    	}

        	$.ajax({
        	    url : 'datosComiLib',
        	    contentType: 'application/json', 
        	    data : {ramo : valorRamo , poliza : valorPoliza,certificado:valorCertificado,periodo:periodo,sucursal:valorSucursal},
        	    type : 'GET',
        	    dataType : 'json',
        	    success : function (json) {
        	    	
        	    	try {
        		   
        	    		$('#labelPanelComiLib').html("Comisiones Liberadas Por Periodo #"+periodoFormateado+"");
        	    		
        	    		$('#labelPanelComiLib').parent().next().find('i:first').remove();
        		    	$('#labelPanelComiLib').parent().next().append('<i class="material-icons altoIcono"  style="color:#00317A;padding-top:15px;" >attach_money</i>');
        	    		var d1 = document.getElementById("datosParametricosComiLib");
            	    	d1.innerHTML = ' ';
        	    		if(json.length == 1){
                	    	var panelNuevo = '<div class="row" id="datosParametricosComiLib" style="height:130px;overflow-y:auto;">';
        	    			}
        	    		else{
            	    	var panelNuevo = '<div class="row" id="datosParametricosComiLib" style="height:250px;overflow-y:auto;">';
        	    		}
        	    		for ( var int = 0; int < json.length; int++) {
            	    		panelNuevo = panelNuevo +'<div class="col-md-10" style="text-align: left;padding-left:1px;padding-right:1px"><h6 style="text-align:center;padding-top:10px;padding-bottom:10px;"><b>'+validarCampoVacio(devLibe(json[int]['P_TF_LISTA_INB_TP_MOVIMIENTO']))+'</b></h6></div>'+
            	    		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px"><table  style= "width:100%;">'+
            	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fecha&nbsp;Imputaci&oacute;n.&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_INB_FE_IMPUTACION'])) +'</b></h6></td></tr>'+
            	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Comprobante&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio((json[int]['P_TF_LISTA_INB_COMPROBANTE'])) +'</b></h6></td></tr>'+
            	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Riesgo&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio((json[int]['P_TF_LISTA_INB_PCIA_RIESGO'])) +'</b></h6></td></tr>'+
            	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Productor&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[0]['P_TF_LISTA_INB_PRODUCTOR'])+" - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_INB_DESC_PRODUCTOR']))+'</b></h6></td></tr></table></div>'+
            	    		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px"><table  style= "width:100%;">'+
            	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Componente&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_INB_COMPONENTE'])+'</b></h6></td></tr>'+
            	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Cobranza&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_INB_COBRANZA'])) +'</b></h6></td></tr>'+
            	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Comisi&oacute;n&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_INB_COMISION'])) +'</b></h6></td></tr>'+
            	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Moneda&nbsp;:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_INB_MONEDA'])+ " - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_INB_DESC_MONEDA']))+'</b></h6></td></tr></table></div>'+
        					'<hr style="margin-top:5px;margin-bottom:5px;width:90%;">';
            	    	}
            	    	d1.innerHTML = panelNuevo;  			
        	    	}
        	    	catch (e)
        	    	{
        	    		alert('Se produjo un inconveniente al mostrar las comisiones liberadas:'+e);
        	    	}
        	    	$.unblockUI();
        	    },
        		 
        	    error: function (request, status, error) {
        	    	$.unblockUI();
        	    	$('#labelPanelComiLib').html("Comisiones Liberadas Por Periodo");
        	    	$('#datosParametricosComiLib').html("<h5 style='text-align:center;padding-top:5%;border:none;'>No posee comisiones liberadas</h5>");
        	    	$('#labelPanelComiLib').parent().next().find('i:first').remove();
        	    	$('#labelPanelComiLib').parent().next().append('<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE611;</i>');
        	    	
        	    },
        	 
        	   
        	});
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	$('#labelPanelComi').html("Comisiones Liberadas Por Periodo");
	    	$('#datosParametricosComi').html("<h5 style='text-align:center;padding-top:5%;border:none;'>No posee comisiones devengadas</h5>");
	    	$('#imgComi').parent().next().find('i:first').remove();
	    	$('#imgComi').parent().next().append('<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE611;</i>');	    }
	   
	});
	
	
	$('#panelb').hide();
	$('#panela').show();
	$('#panelDetalleComi').show();
	
	$(".seleccionPanelB").each(function(){
		$(this).css("background","white");
	});
	$('#'+obj+numeroCard).css("background","#bac2bb");
	
	$('#labelPanelComi').html("Comisiones Devengadas Periodo Por #"+periodoFormateado+"");
	var d1 = document.getElementById("panelImagenComi");
	d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
	

}

function devLibe(dato){
	
	if(dato == null || dato== '' || dato ==' ')
		{
		return dato;
		}
	if(dato =='LN')
		{
		return 'Liberada';
		}
	else
		{
		return 'Devengada';
		}
}



function inicioComisionHome() {
	bloquearPantallaGris();
	activarCaru();
	$( "#timeLineItemComi1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );

});
	$.unblockUI();
}



function mostrarProcesoImpressionPoliza(obj,num,icono,proceso,indice, nroSecuencia)
{	
	
bloquearPantallaGris();
	
	//document.getElementById("valorIndiceProceso").value = indice;
	document.getElementById("valorNroSecuencia").value = nroSecuencia;
	

	var valorPoliza=document.getElementById("valorPolizaImpresion").value;
	var valorRamo=document.getElementById("valorRamoImpresion").value;
	var valorImp=document.getElementById("valorSucursalImpresion").value;
	
	
	$.ajax({
	    url : 'datosImpresio',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, sucursal:valorImp},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	var numCard = num - 1;
	    	llenarDinamicamente(json[numCard]);
	    	$("#procesoImpresion").val(proceso);

	
	//muestra el panel D
	$('#panelb').hide();
	$('#panela').show();
	$('#panelDetalleImpresion').show();
	$('#verMasPanelA').text('Ver mas');

	
	
	$(".seleccionPanelB").each(function(){
 	    $(this).css("background","white");
 	});
	$('#'+obj+num).css("background","#bac2bb");
	
	$('#labelPanelDetalleImpresora').html("Detalle de Impresi&oacute;n #"+ proceso);
	    	}
	catch(e)
	{
		mostrarError('Error 12323131. Se produjo un inconveniente al cargar los datos del movimiento',e);
		
	}
	
	

//ARRANCA EL PANEL C JSON
	
	$.ajax({
	    url : 'datosDetalleImpresion',
	    contentType: 'application/json', 
	    data : { indice : indice,proceso: proceso},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
				
	    		$('#cantidadSentencias').html("Movimientos de la Impresi&oacute;n (" + json.length + ")");	    	    	
	    	    $('#cantidadSentencias').parent().next().find('i:first').remove();
	    	    $('#cantidadSentencias').parent().next().append('<i class="material-icons altoIcono"  style="color:#271765;padding-top:15px;" >&#xE02f;</i>');
	    	    $("#caruMayor").attr("style","text-align:left;padding-left:30px;padding-right:30px;width:100%;height:280px;overflow-y:auto;");
    	   
	    		var d1 = document.getElementById("caruMayor");
    	    	d1.innerHTML = ' ';

    	    	var panelNuevo = '<table class="table table-hover table-grilla" role="table">'+
    			'<thead class="thead-grilla" role="rowgroup">'+
    			'<tr class="tr-grilla" role="row">'+
	            '<th class="th-grilla" role="columnheader">Fecha</th>'+
	            '<th class="th-grilla" style="width:20%;" role="columnheader">Movimiento</th>'+
	            '<th class="th-grilla" role="columnheader">Remito</th>'+
				'<th class="th-grilla" role="columnheader">Rechazo</th>'+
				'<th class="th-grilla" style="width:10%;" role="columnheader">Usuario</th>'+
				'</tr>'+
    			'</thead>'+
    			'<tbody class="tbody-grilla" id="datosDetalleImpresion">'+
    			'</tbody>'+
    			'</table>';
    	    	
    	    	d1.innerHTML = panelNuevo;
	    		var d2 = document.getElementById("datosDetalleImpresion");
	    		
	    		d2.innerHTML = ' ';

    	    	var panelNuevo = '';
    	    	
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo + '<tr class="tr-grilla">';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_MOVIMIENTOS_CFIF_FE_MOVIMIENTO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_MOVIMIENTOS_INB_TP_MOVIMIENTO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_MOVIMIENTOS_CFIF_CFIT_NU_REMITO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_MOVIMIENTOS_INB_RECHAZO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_MOVIMIENTOS_INB_USUARIO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '</tr>';
    	    	}
    	    	d2.innerHTML = panelNuevo;
	    
    	    	activarCaru();
    	    	} catch (e) {
    	    		alert('Disculpe, existio un problema codigo:11113',e);	     
    	    	}	        	    	
    	    	$.unblockUI();
    	    },
    		 
    	    // codigo a ejecutar si la peticion falla;
    	    // son pasados como argumentos a la funcion
    	    // el objeto de la peticion en crudo y codigo de estatus de la peticion
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	    	$('#cantidadSentencias').text("Movimientos de la impresi&oacute;n");	    	    	
    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;width:100%;");
    	        document.getElementById("micaru").innerHTML = request.responseText; 
    	    	
    	       },
    	   
    	   });
	    },
	
	
error : function(xhr, status) {
	$.unblockUI();
	mostrarError('Se produjo un inconveniente al cargar los datos del productor');
},


});


};

function abrirModalDatosPanelC(poliza,proceso,indice,numCard){
	
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la peticion
	    url : 'datosDetallePanelC',
	    contentType: 'application/json', 
	    data : { poliza : poliza, proceso:proceso,indice:indice},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		llenarDinamicamente(json[numCard]);  	    	
    	    	$("#DATOS_MODAL_IMPRESIONES").html("Movimientos del archivo, Indice #<b>"+indice+"</b>");
    	    	$("#DATOS_IMAGEN_ICONO_IMPRESORA").html("printer");
    			    	
			//Abre el modal
			$("#impresionesPopUp").modal({
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
		        alert('No posee datos detalle',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function inicioImpresoraHome() {
	activarCaru();
	$( "#timeLineImpresora1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );

});
}


function abrirModalNoImpresion(){
	var valorPoliza=document.getElementById("valorPolizaImpresion").value;
	var valorRamo=document.getElementById("valorRamoImpresion").value;
	var valorImp=document.getElementById("valorSucursalImpresion").value;
	
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la peticion
	    url : 'datosNoImpresion',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo:valorRamo,sucursal:valorImp},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("valorNoImpresionImpresiones");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-noImpresionImpresionesHome" role="cell">'+validarCampoVacio((json[int]['P_TF_NO_IMPRESION_CFNI_CACW_NU_ENDOSO']))+'</td>'+
		            '<td class="td-grilla-noImpresionImpresionesHome" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_NO_IMPRESION_CFNI_FE_ACTUALIZACION'])) +'</td>'+
		            '<td class="td-grilla-noImpresionImpresionesHome" role="cell">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_NO_IMPRESION_INB_USUARIO'])) +'</td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
                                                    
    	    	
    	    	$("#DATO_MODAL_NO_IMP").html("No impresiones de la p&oacute;liza #<b>"+valorPoliza+"</b>");
    	    	$("#DATOS_IMAGEN_ICONO_IMPRESORA_NO").html("printer");
    			    	
			//Abre el modal
			$("#noImpresionPopUp").modal({
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
		        alert('Error : 9457458',e);
				$.unblockUI();

	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function descargarPdfPoliza(){
	
	var nroSecuencia = document.getElementById("valorNroSecuencia").value;
	var valorPoliza=document.getElementById("valorPolizaImpresion").value;
	bloquearPantallaGris();
	$.ajax({
		url : 'existeArchivoIndice',
		contentType : 'application/json',
		data : {
			nroSecuencia : nroSecuencia
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
					location.href = "/PSPES/descargarArchivoPdf?archivoPdf="+json[0]+"&poliza="+valorPoliza;

				$.unblockUI();
			} catch (e) {
				alert('Error : 15610', e);
				$.unblockUI();

			}

		},
		error : function(xhr, status) {
			$.unblockUI();
	    	mostrarError(xhr['responseText']);

			
		},

	});
	
	
}
function inicioInspeccionesHome() {
	bloquearPantallaGris();
	activarCaru();
	$( "#timeLineInspec1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );

});
	$.unblockUI();
}


function mostrarPanelDetalleInspeccion(obj,numeroCard,inspec,poliza,ramo,inspec,consecutivo, sucursal){
	
	
	bloquearPantallaGris();

	$.ajax({
	    url : 'datosCabeceraInspec',
	    contentType: 'application/json', 
	    data : {ramo : ramo , poliza : poliza, sucursal: sucursal, inspeccion:inspec},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    		try{
	    			var valor= 0;
	    			llenarDinamicamente(json[valor]);
	    			
	    			$('#inspeccionValor').val(inspec);
	    			$('#INFO_RAMO_INSPECCION').html("<b>"+json[valor]['P_TF_INSPE_CAIN_CNIN_CARP_CD_RAMO']+" - "+ primeraLetraMayus(json[valor]['P_TF_INSPE_INB_RAMO']));
	    			$('#INFO_RAMO_INSPECCION_B').html("<b>"+json[valor]['P_TF_INSPE_CAIN_CNIN_CARP_CD_RAMO']+" - "+ primeraLetraMayus(json[valor]['P_TF_INSPE_INB_RAMO']));
	    			
	    			document.getElementById("valorProducto").value= json[valor]['P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO'];
			    	document.getElementById("valorSucursal").value = json[valor]['P_TF_INSPE_CAIN_CNIN_CASU_CD_SUCURSAL'];
			    	$("#INFO_P_TF_INSPE_CAIN_CAPS_CD_PERITO").html(validarCampoVacio("<b>"+json[valor]['P_TF_INSPE_CAIN_CAPS_CD_PERITO']) + " - " + primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PERITO']))+"</b>");
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_CAPS_CD_PERITO").html(validarCampoVacio("<b>"+json[valor]['P_TF_INSPE_CAIN_CAPS_CD_PERITO']) + " - " + primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PERITO'])) + "</b>");

			    	$("#INFO_P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO").html("<b>"+validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO']) + " - " + primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PRODUCTO'])) +"</b>")
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO").html("<b>"+validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO']) + " - " + primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PRODUCTO'])) +"</b>")

			    	//Popup Cliente
			    	$("#INFO_P_TF_INSPE_CAIN_NM_CLIENTE").css("color","#6fa1d4");
			    	$("#INFO_P_TF_INSPE_CAIN_NM_CLIENTE").css("cursor","pointer");
			    	$("#INFO_P_TF_INSPE_CAIN_NM_CLIENTE").click(function(e){ 
			    		e.preventDefault();
			    	    e.stopImmediatePropagation();
			    		abrirModalClienteHome(json[valor]['P_TF_INSPE_CAIN_NU_CEDULA_RIF']); 
			    	});
			    	document.getElementById("INFO_P_TF_INSPE_CAIN_NM_CLIENTE").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_NM_CLIENTE']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    	
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_NM_CLIENTE").css("color","#6fa1d4");
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_NM_CLIENTE").css("cursor","pointer");
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_NM_CLIENTE").click(function(e){ 
			    		e.preventDefault();
			    	    e.stopImmediatePropagation();
			    		abrirModalClienteHome(json[valor]['P_TF_INSPE_CAIN_NU_CEDULA_RIF']); 
			    	});
			    	document.getElementById("INFO_PANEL_2_P_TF_INSPE_CAIN_NM_CLIENTE").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_NM_CLIENTE']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>' + '</b>';
			    				    	
			    	//Popup productor
			    	$("#INFO_P_TF_INSPE_INB_PRODUCTOR").css("color","#6fa1d4");
			    	$("#INFO_P_TF_INSPE_INB_PRODUCTOR").css("cursor","pointer");
			    	$("#INFO_P_TF_INSPE_INB_PRODUCTOR").click(function(e){ 
			    		e.preventDefault();
			    	    e.stopImmediatePropagation();
			    		abrirModalProductorHome(json[valor]['P_TF_INSPE_CAIN_CAPD_CD_PRODUCTOR']); 
			    	});
			    	document.getElementById("INFO_P_TF_INSPE_INB_PRODUCTOR").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PRODUCTOR']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    	
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_PRODUCTOR").css("color","#6fa1d4");
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_PRODUCTOR").css("cursor","pointer");
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_PRODUCTOR").click( function(e){
			    		 e.preventDefault();
			    	        e.stopImmediatePropagation();
			    		abrirModalProductorHome(json[valor]['P_TF_INSPE_CAIN_CAPD_CD_PRODUCTOR']); 
			    	});
			    	document.getElementById("INFO_PANEL_2_P_TF_INSPE_INB_PRODUCTOR").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PRODUCTOR']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    				    	
			    	//Popup sucursal
			    	
			    	document.getElementById("INFO_P_TF_INSPE_INB_SUCURSAL").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_SUCURSAL']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    	$("#INFO_P_TF_INSPE_INB_SUCURSAL").css("color","#6fa1d4");
			    	$("#INFO_P_TF_INSPE_INB_SUCURSAL").css("cursor","pointer");
					$("#INFO_P_TF_INSPE_INB_SUCURSAL").click(function(e){
			    		 e.preventDefault();
			    	        e.stopImmediatePropagation();
			    	        abrirModalSucursalHome(json[valor]['P_TF_INSPE_CAIN_CNIN_CASU_CD_SUCURSAL']);
			    	});
			    	
			    	document.getElementById("INFO_PANEL_2_P_TF_INSPE_INB_SUCURSAL").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_SUCURSAL']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_SUCURSAL").css("color","#6fa1d4");
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_SUCURSAL").css("cursor","pointer");
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_SUCURSAL").click(function(e){
			    		 e.preventDefault();
			    	     e.stopImmediatePropagation();
			    		abrirModalSucursalHome(json[valor]['P_TF_INSPE_CAIN_CNIN_CASU_CD_SUCURSAL']);
			    	});
			    	
			    	//PopUp Observacion
			    	if(json[valor]['P_TF_INSPE_CAIN_DE_OBSERVACION']!=""){
			    		document.getElementById("INFO_P_TF_INSPE_CAIN_DE_OBSERVACION").innerHTML = '<b>'+primeraLetraMayus(json[valor]['P_TF_INSPE_CAIN_DE_OBSERVACION']).substr(0, 30) + '...'+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
				    	$("#INFO_P_TF_INSPE_CAIN_DE_OBSERVACION").css("color","#6fa1d4");
				    	$("#INFO_P_TF_INSPE_CAIN_DE_OBSERVACION").css("cursor","pointer");
						$("#INFO_P_TF_INSPE_CAIN_DE_OBSERVACION").click(function(e){
				    		 e.preventDefault();
				    	        e.stopImmediatePropagation();
				    	        abrirModalObservacionInspeccionHome();
				    	});
						
						document.getElementById("INFO_PANEL_2_P_TF_INSPE_CAIN_DE_OBSERVACION").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_DE_OBSERVACION'])).substr(0, 30) + '...'+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
				    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_DE_OBSERVACION").css("color","#6fa1d4");
				    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_DE_OBSERVACION").css("cursor","pointer");
						$("#INFO_PANEL_2_P_TF_INSPE_CAIN_DE_OBSERVACION").click(function(e){
				    		 e.preventDefault();
				    	        e.stopImmediatePropagation();
				    	        abrirModalObservacionInspeccionHome();
				    	});
						$("#observacionInspeccion").html('<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_DE_OBSERVACION'])));
				    	$("#DATO_HEADER_OBSERVACION_INSPECCION").html('Inspecci&oacute;n #'+inspec);
			    	}
			    	
			    	
			    	
					
			    	//PopUp Observacion Revision
			    	if(json[valor]['P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN'] != ""){
			    		document.getElementById("INFO_P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN").innerHTML = '<b>'+primeraLetraMayus(json[valor]['P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN']).substr(0, 30) + '...'+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
				    	$("#INFO_P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN").css("color","#6fa1d4");
				    	$("#INFO_P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN").css("cursor","pointer");
						$("#INFO_P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN").click(function(e){
				    		 e.preventDefault();
				    	        e.stopImmediatePropagation();
				    	        abrirModalObservacionRevisionInspeccionHome();
				    	});
						$("#observacionRevisionInspeccion").html('<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN'])));
				    	$("#DATO_HEADER_OBSERVACION_REVISION_INSPECCION").html('Observaci&oacute;n Revisi&oacute;n - Inspecci&oacute;n #'+inspec);
			    	}
			    	
					$("#DATO_CABECERA").html("Inspecci&oacute;n #" + inspec);
					
					//muestra panel D setea img y titulo
					
					$('#panelb').hide();
					$('#panela').show();
					$('#panelDetalleInspec').show();
					
					$(".seleccionPanelB").each(function(){
						$(this).css("background","white");
					});
					$('#'+obj+numeroCard).css("background","#bac2bb");
					
					$('#labelPanelInspeccion').html("Detalle Inspecci&oacute;n #"+inspec+"");
					
					var producto = document.getElementById("valorProducto").value;
					//panel C
			    	mostrarDatosParametricosInspeccion(poliza, ramo, inspec, producto, consecutivo);
					
	    		}
	    	catch (e)
	    	{
	    		mostrarError('Se produjo un inconveniente al mostrar el detalle de inspeccion:'+e);
	    	}
	    	
	    	
	    	$.unblockUI();
	    	    	
	    },
	    	
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    }
	    
	 
	   
	});
	


}

function mostrarDatosParametricosInspeccion(poliza, ramo, nroInspeccion, producto, consecutivo){
	
	
	$.ajax({
	    url : 'datosParametricosInspec',
	    contentType: 'application/json', 
	    data : { poliza : poliza, ramo:ramo,  nroInspeccion: nroInspeccion , producto: producto},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosParametricosInspec");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '<div style="height:150px;overflow-y:auto;"><table  style= "width:100%;">';
    	    	for ( var int = 0; int < json.length; int++) {
    	    		panelNuevo = panelNuevo + '<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_DATOS_INB_DSP_LABEL'])) + ':</td><td style="padding-top:5px;width:60%;"><h6><b>';
    	    		if(json[int]['P_TF_DATOS_CADN_DATO']=="" || json[int]['P_TF_DATOS_CADN_DE_DATO']=="" ){
    	    			panelNuevo = panelNuevo + validarCampoVacio(json[int]['P_TF_DATOS_CADN_DATO']);
    	    		}
    	    		else{
        	    		panelNuevo = panelNuevo + validarCampoVacioInspecciones(json[int]['P_TF_DATOS_CADN_DATO']);
        	    		panelNuevo = panelNuevo + primeraLetraMayus(json[int]['P_TF_DATOS_CADN_DE_DATO']);

    	    		}	
    	    		panelNuevo = panelNuevo + '.</b></h6></td></tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</div>';

	    	}
	    	catch(e)
	    	{
	    		mostrarError('Se produjo un inconveniente al mostrar los datos parametricos de inspeccion : '+e);
	    	}
	    	
	    	
	    	
    	    },
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	    	mostrarError(xhr['responseText']);

    	       },
    	   
    	   });
	
}

function buscarFiltroResultadoInspeccion(idTablaParametricos){
	
	input = document.getElementById("inputBusquedaResultadoInspeccion");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function redirectZambaInspeccion(){
	
	var inspeccion = document.getElementById("inspeccionValor").value;
	
	var url = 'http://imageapp/zamba.web/globalsearch/search/search.html?User=3&attr=102&types=17&search='+ inspeccion +'#Zamba/';
	
	bloquearPantallaGris();
	window.open(url);
	$.unblockUI();

}

function redirectZambaInspeccionNid(parametro){
	
	
	var url = 'http://imageapp/zamba.web/globalsearch/search/search.html?User=3&attr=7&types=17&search='+ parametro +'#Zamba/';

	bloquearPantallaGris();
	window.open(url);
	$.unblockUI();

}

function verVisitasInspeccion(){
	
	var inspeccion = document.getElementById("valorInspeccion").value;
	bloquearPantallaGris();
	
	$.ajax({
	    url : 'datosVisitasInspeccion',
	    contentType: 'application/json', 
	    data : {inspeccion: inspeccion},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$.unblockUI();
		    	
		    	var d1 = document.getElementById("datosVisitasInspeccion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';

    	    		for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-visitasInspeccion" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_VISITAS_CADV_CAUS_CD_USUARIO']))+'</h6></td>'+
    	    		'<td class="td-grilla-visitasInspeccion" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_VISITAS_CADV_DE_DATO']))+'</h6></td>'+
    	    		'<td class="td-grilla-visitasInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VISITAS_CADV_CAIN_FE_VISITA'])+'</h6></td>'+
    	    		'<td class="td-grilla-visitasInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VISITAS_INB_HORA'])+'</h6></td>'+
    	    		'</tr>';
    	    		}
    	    		d1.innerHTML = panelNuevo;
    	    		
        	    	$("#DATO_VISITAS_INSPECCION").html("Visitas de la Inspecci&oacute;n <b>#"+inspeccion+"</b>");

		    	
		    	//Abre el modal
				$("#visitasInspeccionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
				});

	    	}
	    	catch(e)
	    	{	    	$.unblockUI();

	    		mostrarError('Se genero un inconveniente al cargar los datos de visitas de inspeccion');
	    	}
	
	$.unblockUI();

	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
    		mostrarError('No existe visitas para la inspeccion');

	       },
	   
	   });
	
	
}


function descargarDocumentoInspecciones(){
	bloquearPantallaGris();
	$('.row-select input').each(function() {   
	      var condicion = $(this).is(":checked");
	      if (condicion) {
	    	  try {
				
	    	  nombre = $(this).attr("id");
	    	  var orden= $("#orden"+nombre).text();
	    	  var tipo= $("#tipo"+nombre).text();
	    	  var inspeccion = document.getElementById("valorInspeccion").value;
	    	  
	    	  location.href = "/PSPES/existeArchivoInspecciones?tipo="+tipo+"&orden="+orden+"&inspeccion="+inspeccion;
	    	  
	    	  var mensajeAlerta = 'Se descargo el documento correctamente';
		  	  mostrarMensajeBoletaDePago(mensajeAlerta, 'alert-success');
	    	  
		       	$.unblockUI();

	    	  } catch (e) {
	    		  // TODO: handle exception
	    	  }
	    	  
	      }
	      else{
		       	$.unblockUI();
			var mensajeAlerta = 'Seleccione un documento para iniciar la descarga';
	  		mostrarMensajeBoletaDePago(mensajeAlerta, 'alert-warning');
	      }
	});
	
	
   	$.unblockUI();

	
}

	
function verDocumentosInspeccion(){
	var inspeccion = document.getElementById("valorInspeccion").value;
	bloquearPantallaGris();
	
	$.ajax({
	    url : 'datosDocumentosInspeccion',
	    contentType: 'application/json', 
	    data : {inspeccion: inspeccion},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$.unblockUI();
		    	
		    	var d1 = document.getElementById("datosDocumentosInspeccion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    		
    	    		for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla row-select" id="fila'+int+'">'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="orden'+int+'">'+validarCampoVacio(json[int]['P_TF_DOCUMENTO_CAZZ_NU_DOCUMENTO'])+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="tipo'+int+'">'+validarCampoVacio(json[int]['P_TF_DOCUMENTO_CAZZ_TP_EXTENSION'])+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="desc'+int+'">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_DOCUMENTO_CAZZ_DE_DOCUMENTO']))+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="dueno'+int+'">'+validarCampoVacio(json[int]['P_TF_DOCUMENTO_CAZZ_CAUS_CD_USUARIO'])+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="fecha'+int+'">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_DOCUMENTO_CAZZ_FE_ACTUALIZACION']))+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><input id="'+int+'"  type="radio" name="gender" style="cursor:pointer;" value="'+int+'" /></td>'+

    	    		'</tr>';
    	    		}
    	    		d1.innerHTML = panelNuevo;

    	    		
        	    	$("#DATO_DOCUMENTOS_INSPECCION").html("Documentos de la Inspecci&oacute;n <b>#"+inspeccion+"</b>");

		    	
		    	//Abre el modal
				$("#documentosInspeccionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
				});
				

	    	}
	    	catch(e)
	    	{	    	$.unblockUI();

	    		mostrarError('Se genero un inconveniente al cargar los datos de documentos de la inspeccion');
	    	}
	
	$.unblockUI();

	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
    		mostrarError('No existe documentos para la inspeccion');

	       },
	   
	   });
}

function verResultadoInspeccion(){
	
	var inspeccion = document.getElementById("valorInspeccion").value;
	var ramo = document.getElementById("inspeccionRamoValor").value;
	var producto = document.getElementById("valorProducto").value;
	var sucursal = document.getElementById("valorSucursal").value;

	bloquearPantallaGris();
	
	$.ajax({
	    url : 'datosResultadoInspeccion',
	    contentType: 'application/json', 
	    data : {ramo:ramo,  inspeccion: inspeccion , producto:producto, sucursal: sucursal, tipo: 'r'},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$.unblockUI();
		    	
		    	var d1 = document.getElementById("datosResultadosInspeccion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    		
    	    		for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_RESULTADOS_INB_DATO'])) +'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_DE_DATO']) +'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_PO_VALUACION'])+'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_MT_VALUACION'])+'</h6></td>'+

    	    		'</tr>';
    	    		}
    	    		d1.innerHTML = panelNuevo;

    	    		
        	    	$("#DATO_RESULTADOS_INSPECCION").html("Resultados de la Inspecci&oacute;n <b>#"+inspeccion+"</b>");

		    	
		    	//Abre el modal
				$("#resultadosInspeccionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
				});
				

	    	}
	    	catch(e)
	    	{	    	$.unblockUI();

	    		mostrarError('Se genero un inconveniente al cargar los datos de resultados de la inspeccion');
	    	}
	
	$.unblockUI();

	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
    		mostrarError('No existe resultados para la inspeccion');

	       },
	   
	   });
}

function verCartaDaniosInspeccion(){

	
	var inspeccion = document.getElementById("valorInspeccion").value;
	var ramo = document.getElementById("inspeccionRamoValor").value;
	var producto = document.getElementById("valorProducto").value;
	var sucursal = document.getElementById("valorSucursal").value;

	bloquearPantallaGris();
	
	$.ajax({
	    url : 'datosResultadoInspeccion',
	    contentType: 'application/json', 
	    data : {ramo:ramo,  inspeccion: inspeccion , producto:producto, sucursal: sucursal, tipo: 'c'},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$.unblockUI();
		    	
		    	var d1 = document.getElementById("datosCartaDaniosInspeccion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    		
    	    		for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_RESULTADOS_INB_DATO'])) +'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_DE_DATO']) +'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_PO_VALUACION'])+'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_MT_VALUACION'])+'</h6></td>'+

    	    		'</tr>';
    	    		}
    	    		d1.innerHTML = panelNuevo;

    	    		
        	    	$("#DATO_CARTA_DANIOS_INSPECCION").html("Cartas de danios de la Inspeccion <b>#"+inspeccion+"</b>");

		    	
		    	//Abre el modal
				$("#cartaDaniosInspeccionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
				});
				

	    	}
	    	catch(e)
	    	{	    	$.unblockUI();

	    		mostrarError('Se genero un inconveniente al cargar los da&ntilde;os de la inspeccion');
	    	}
	
	$.unblockUI();

	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
    		mostrarError('No existe daños para la inspeccion');

	       },
	   
	   });

}

function verAccesoriosInspeccion(){
	var inspeccion = document.getElementById("valorInspeccion").value;
	var ramo = document.getElementById("inspeccionRamoValor").value;
	var producto = document.getElementById("valorProducto").value;
	var sucursal = document.getElementById("valorSucursal").value;

bloquearPantallaGris();

$.ajax({
    url : 'datosResultadoInspeccion',
    contentType: 'application/json', 
    data : {ramo:ramo,  inspeccion: inspeccion , producto:producto, sucursal: sucursal, tipo: 'a'},
    type : 'GET',
    dataType : 'json',
    success : function(json) {
    	try{
	    	$.unblockUI();
	    	
	    	var d1 = document.getElementById("datosAccesoriosInspeccion");
	    	d1.innerHTML = ' ';
	    	var panelNuevo = '';
	    		
	    		for ( var int = 0; int < json.length ; int++) {
	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_RESULTADOS_INB_DATO'])) +'</h6></td>'+
	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_DE_DATO']) +'</h6></td>'+
	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_PO_VALUACION'])+'</h6></td>'+
	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_MT_VALUACION'])+'</h6></td>'+

	    		'</tr>';
	    		}
	    		d1.innerHTML = panelNuevo;

	    		
    	    	$("#DATO_ACCESORIOS_INSPECCION").html("Accesorios de la Inspeccion <b>#"+inspeccion+"</b>");

	    	
	    	//Abre el modal
			$("#accesoriosInspeccionPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
			});
			

    	}
    	catch(e)
    	{	    	$.unblockUI();

    		mostrarError('Se genero un inconveniente al cargar los accesorios de la inspeccion');
    	}

$.unblockUI();

    },
    error: function (request, status, error) {
    	$.unblockUI();
		mostrarError('No existe accesorios para la inspeccion');

       },
   
   });
}

function abrirModalObservacionInspeccionHome(){
	
	bloquearPantallaGris();
	
	//Abre el modal
	$("#observacionInspeccionPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
	});
	
	$.unblockUI();

}

function abrirModalObservacionRevisionInspeccionHome(){
bloquearPantallaGris();
	
	//Abre el modal
	$("#observacionRevisionInspeccionPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
	});
	
	$.unblockUI();
}

function irInspeccionesExpertoHome(poliza, ramo, sucursal, inspeccion){
	/*
	var poliza= document.getElementById("valorPoliza").value;
	var ramo= document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;
	*/
	bloquearPantallaGris();
	$.ajax({
	    url : 'existeInspecciones',
	    contentType: 'application/json', 
	    
	    data : {poliza :poliza, ramo: ramo, sucursal: sucursal, inspeccion: inspeccion} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		location.href="/PSPES/homeInspecciones?poliza="+poliza+"&ramo="+ramo+"&sucursal="+sucursal+"&inspeccion="+inspeccion;
				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar inspecciones. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
	
}




function descargarDocumentoInspeccion(){
	
	var nroSecuencia = document.getElementById("valorNroSecuencia").value;
	var valorPoliza=document.getElementById("valorPolizaImpresion").value;
	
	
	
}

function inicioPolizaHome() {
	bloquearPantallaGris();
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
});
	
	$('#datepickerCoberturaFinanciera').datepicker({
		defaultDate: new Date(),
		format: 'dd/mm/yyyy',
	    minViewMode: 0,
	    firstDay: 1,
	    language: 'es',
	    orientation: 'bottom auto',
	    autoclose:true,
	    multidate: false
	}).datepicker("setDate", new Date()).on('changeDate',function(){
		coberturaFinanciera();
	});
		$.unblockUI();

}


function inicioPolizaActiveHome(ramo, poliza, cantCertificados, cantEndososPoliza){
		
	bloquearPantallaGris();
	if(cantCertificados > 0 && cantCertificados<50){
		inicioPolizaHome();
		activarCaru();

	}
	
	$.unblockUI();

}

function coberturaFinanciera(){
	
	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorSucursal=document.getElementById("valorSucursal").value;
	var valorCertificado=document.getElementById("endosoCoberturaFinancieraModal").value;
	var valorEndoso="1";
	var valorFecha=document.getElementById("inputDataPickerCoberturaFinanciera").value;
	bloquearPantallaGris();

	$.ajax({
	    url : 'coberturaFinancieraModalSiniestroHome',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza,ramo : valorRamo, sucursal : valorSucursal,certificado:valorCertificado,endoso:valorEndoso,fecha:valorFecha},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var panelNuevo = '';
	    		var d1 = document.getElementById("textoCoberturaSiniestros");
	    		var d2 = document.getElementById("textoCoberturaIconoSiniestros");
	    		
	    		d1.innerHTML = '';
	    		d2.innerHTML = '';

	    	if(json[0]['P_TF_LISTA_IMPR_INB_COBERTURA'] == 'N'){
    	    	panelNuevo = 'La p&oacute;liza, <b style="color:red;">no posee</b> cobertura financiera a la fecha.';
    	    	panelIcono='<i class="material-icons" id="textoCoberturaIconoSiniestros" style="display:inline;color:red;font-size:75px;cursor:pointer;">clear</i>';
	    	}
	    	else{
	    		panelNuevo = 'La p&oacute;liza, <b style="color:#008000;">posee</b> cobertura financiera a la fecha.';
    	    	panelIcono='<i class="material-icons" id="textoCoberturaIconoSiniestros" style="display:inline;color:#008000;font-size:75px;cursor:pointer;">check</i>';

	    	}
	    	d1.innerHTML = panelNuevo;
	    	d2.innerHTML = panelIcono;
	    	
		
	    	}
	    	catch(e)
	    	{
	    		mostrarError('Error : 5534153. Se produjo un inconveniente al cargar los datos',e);
	    		
	    	}	    	
	    	$.unblockUI();
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDetalleTablaCertificados(ramo, poliza, valorSucursal){
	bloquearPantallaGris();

	$.ajax({
	    url : 'datosCertificado',
	    contentType: 'application/json', 
	   
	    data : {poliza :poliza, ramo :ramo, sucursal: valorSucursal} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{
	    		
	    		var data=[];
    	    	for ( var i = 0; i < json.length; i++) {
    	    	        var d = (data[i] = {});
    	    	        d["certificado"] =  json[i]['P_TF_CERTIF_CACE_NU_CERTIFICADO'];
    	    	        d["riesgo"] = json[i]['P_TF_CERTIF_INB_DE_RIESGO'];
    	    	        d["sumaAsegurada"] = json[i]['P_TF_CERTIF_INB_MT_SUMA_ASEGURADA'];
    	    	        d["estado"] = json[i]['P_TF_CERTIF_INB_DE_ESTADO'];
    	    	}
    	    	
    	    	document.getElementById("verCertificados").style.display="none";
	    		document.getElementById("tablaCertificados").style.display="block";

	    		completarDetalleTablaCertificados(data,"",poliza, ramo, valorSucursal);
	        	$.unblockUI();
				
	    	} catch (e) {
		    	$.unblockUI();
	    		alert('Code: 101 - Se genero un inconveniente, al cargar los certificados de la poliza. Error:'+e);
	    	}
	    	
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	 alert('Code: 102 - ' + xhr['responseText']);	    },
	 
	   
	});
}

function verDetalleTablaCertificadosEndoso(ramo, poliza, valorSucursal,numeroEndoso){
	bloquearPantallaGris();

	$.ajax({
		url : 'datosCertificado',
 	    contentType: 'application/json', 
 	    data : { endoso : numeroEndoso , ramo : ramo , poliza : poliza, sucursal: valorSucursal },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var cantCertificados = document.getElementById("cantCertificados");
    	    	cantCertificados.innerHTML = 'Certificados ' + '(' + json.length + ')';
	    		
	    		var data=[];
    	    	for ( var i = 0; i < json.length; i++) {
    	    	        var d = (data[i] = {});
    	    	        d["certificado"] =  json[i]['P_TF_CERTIF_CACE_NU_CERTIFICADO'];
    	    	        d["riesgo"] = json[i]['P_TF_CERTIF_INB_DE_RIESGO'];
    	    	        d["sumaAsegurada"] = json[i]['P_TF_CERTIF_INB_MT_SUMA_ASEGURADA'];
    	    	        d["estado"] = json[i]['P_TF_CERTIF_INB_DE_ESTADO'];
    	    	}
	    		completarDetalleTablaCertificados(data,"",poliza, ramo, valorSucursal);
	        	$.unblockUI();
				
	    	} catch (e) {
		    	$.unblockUI();
	    		alert('Code: 101 - Se genero un inconveniente, al cargar los certificados de la poliza. Error:'+e);
	    	}
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	try {
	    		var data=[];
	    		completarDetalleTablaCertificados(data,"",poliza, ramo, valorSucursal);
			} catch (e) {
				// TODO: handle exception
			}
			document.getElementById("cantCertificados").innerHTML = 'Certificados ' + '(0)';
	    	 alert('Code: 102 - ' + xhr['responseText']);	    },
	});
}


function abrirModalCliente(id)
{
    location.href = "/PSPES/datosCliente?valorCliente="+id+"";
}


function buscadorPanelCEntidadPoliza() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaCertificado");
	  filter = input.value.toUpperCase();
	  
	  
	  $(".datoCertificadoCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoCertificado", "micaruB");
		  var idEncabezado = idH6.replace("datoCertificado", "nroCertificado");
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idEncabezado).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  
}




function abrirPopupPolizaAnterior(poliza,ramo,sucursal,idPopUp)
{
	bloquearPantallaGris();
    location.href = "/PSPES/homePoliza?poliza="+poliza+"&ramo="+ramo+"&sucursal="+sucursal;
};

function abrirPopupPolizaSiguiente(poliza,ramo,sucursal,idPopUp)
{
	bloquearPantallaGris();
    location.href = "/PSPES/homePoliza?poliza="+poliza+"&ramo=" + ramo+"&sucursal="+sucursal;
};



function llenarDinamicamenteMovimientos(json)
{
	for (var prop in json) {
        try {
        	if(json[prop].length == 0)
            	{
            		$("#INFO_"+prop).html("Sin dato").css("color","#b3b0b0");
        		}
        	else
        		{
        		$("#INFO_"+prop).html("<b>$" + verificarCampoJson(json[prop].toLowerCase()) + "</b>").css("color","black");
        		
        		}
        	
		} catch (e) { }
    }	
}

function llenarDinamicamenteProdOrg(json)
{
	for (var prop in json) {
        try {
        	if(json[prop].length == 0)
            	{
            		$("#DATO_"+prop).html("Sin dato").css("color","#b3b0b0");
        		}
        	else
        		{
        		$("#DATO_"+prop).html("<b>" + verificarCampoJson(json[prop].toLowerCase()) + "</b>").css("color","black");
        		
        		}
        	
		} catch (e) { }
    }	
}




function abrirPopUpMovimientosPolizaHome(idPopUp,certificado,poliza,ramo){

	var valorSucursal=document.getElementById("valorSucursal").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'datosMovimientos',
	    contentType: 'application/json', 
	    
	    
	    data : {poliza :poliza, ramo :ramo,sucursal:valorSucursal} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	
	    	llenarDinamicamenteMovimientos(json[0]);
	    	llenarDinamicamenteProdOrg(json[0]);
	    	
	    	
	    	
	    	
	    	$("#DATO_MONTO_COBRADO").html("<b>" +validarCampoVacio(formatearMonedaSincolor(json[0]['P_TF_MOVS_INB_SUM_MT_COBRADO_PROD']))+" </b>");
	    	$("#DATO_MONTO_EMITIDO").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_EMITIDO_PROD']))+" </b>");

	    	//prod
	    	$("#DATO_COMI_DEVEN_PROD").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_DEV_PROD']))+" </b>");
	    	$("#DATO_COMI_AMO_PROD").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_AMO_PROD']))+" </b>");
	    	$("#DATO_COMI_LIB_PROD").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_LIB_PROD']))+" </b>");

	    	//org
	    	$("#DATO_COMI_DEVEN_ORG").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_DEV_ORG']))+" </b>");
	    	$("#DATO_COMI_AMO_ORG").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_AMO_ORG']))+" </b>");
	    	$("#DATO_COMI_LIB_ORG").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_LIB_ORG']))+" </b>");

	    	
	    	
	    	
	    	
			var productor = json[0]["P_TF_MOVS_INB_NM_PRODUCTOR"];
			var organizador = json[0]["P_TF_MOVS_CAOR_CD_ORGANIZADOR"];
			$("#DATO_P_TF_MOVS_CACE_CAPD_CD_PRODUCTOR").attr("title",productor);
			$("#DATO_P_TF_MOVS_CAOR_CD_ORGANIZADOR").attr("title",organizador);
			$("#valorCertificadoComi").val(certificado);
			$("#valorPolizaComi").val(poliza);
			$("#valorRamoComi").val(ramo);
			

			
			$("#"+idPopUp).modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
				
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente, al cargar los movimientos de la poliza. Error:'+e);
	    	}
	    	
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};



function mostrarEndosoPolizaHome(obj,endoso,numeroEndoso,tipoEndoso,poliza,ramo, sucursal, imgEndoso)
{	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosEndoso',
	    contentType: 'application/json', 
	    data : { endoso : numeroEndoso , ramo : ramo , poliza : poliza,sucursal:sucursal  },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    
	    	llenarDinamicamente(json);
	    	
	    	var fechaDesde = formatearFechaJson(json['P_TF_ENDOSO_CACW_FE_DESDE']);
	    	$("#valorPolizaEndoso").val(numeroEndoso);

	    	
			$("#INFO_PANEL_2_P_TF_ENDOSO_CACW_FE_OPERACION").html("<b>" + validarCampoVacio(formatearFechaJson(json['P_TF_ENDOSO_CACW_FE_OPERACION']))+ "</b>");
			$("#INFO_USUARIO_P_TF_ENDOSO_CACW_FE_DESDE").html("<b>" + validarCampoVacio(primeraLetraMayus(json['P_TF_ENDOSO_INB_DE_USUARIO']))+ "</b>");
			$("#INFO_FECHA_DESDE_PANEL_B_P_TF_ENDOSO_CACW_FE_DESDE").html("<b>" + fechaDesde +"&nbsp;-&nbsp;"+ "</b>");
			$("#INFO_FECHA_DESDE_PANEL_B_B_P_TF_ENDOSO_CACW_FE_DESDE").html("<b>" + validarCampoVacio(formatearFechaJson(json['P_TF_ENDOSO_CACW_FE_DESDE'])) +"&nbsp;-&nbsp;"+ "</b>");
			$("#DATO_SUCURSAL_ENDOSO").html("<b>" + json['P_TF_ENDOSO_CACW_CASU_CD_SUCURSAL']+" - "+ validarCampoVacio(primeraLetraMayus(json['P_TF_ENDOSO_INB_DSP_SUCURSAL']))+ "</b>");
			$("#DATO_RAMO_ENDOSO").html("<b>" + json['P_TF_ENDOSO_CACW_CARP_CD_RAMO']+" - "+ validarCampoVacio(primeraLetraMayus(json['P_TF_ENDOSO_INB_DSP_RAMO']))+ "</b>");
			$("#DATO_ESQUEMA_ENDOSO").html("<b>" + json['P_TF_ENDOSO_CACW_CAEQ_CD_ESQUEMA']+" - "+ validarCampoVacio(primeraLetraMayus(json['P_TF_ENDOSO_INB_CD_ESQUEMA']))+ "</b>");
			
			$("#DATO_SUMAASEG_ENDOSO").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_SUMA_ASEGURADA'])) +"</b>");
			$("#DATO_SUMAASEG_ENDOSO_B").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_SUMA_ASEGURADA'])) +"</b>");
				
			$("#DATO_PRIMA_POLIZA_ENDOSO").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_PRIMA'])) +"</b>");
			$("#DATO_PREMIO_POLIZA_ENDOSO").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_PREMIO'])) +"</b>");
			
			$("#DATO_PRIMA_POLIZA_ENDOSO_B").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_PRIMA'])) +"</b>");
			$("#DATO_PREMIO_POLIZA_ENDOSO_B").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_PREMIO'])) +"</b>");
			
			$("#DATO_COTIZACION_POLIZA_ENDOSO_B").html("<b onclick='redirectCotizacion("+json['P_TF_ENDOSO_CACW_CAZB_NU_COTIZACION']+");'>" + validarCampoVacio(json['P_TF_ENDOSO_CACW_CAZB_NU_COTIZACION']) +"</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#DATO_COTIZACION_POLIZA_ENDOSO").html("<b onclick='redirectCotizacion("+json['P_TF_ENDOSO_CACW_CAZB_NU_COTIZACION']+");'>" + validarCampoVacio(json['P_TF_ENDOSO_CACW_CAZB_NU_COTIZACION']) +"</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			
			
			//abre al panel y carga la imagen del panel D
			$('#panelb').hide();
			$('#panela').show();
			$('#verMasPanelA').text('Ver mas');
			
			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$(".timeline__date").each(function(){
		 	    $(this).css("background","white");
		 	});
			
			if(imgEndoso=='' || imgEndoso == null){
				$('#timeLineItemEndoso'+numeroEndoso).css("background","#bac2bb");
				
				var imgTimeLine = $('#imgTimeLineEndoso'+numeroEndoso).attr("src");
				$('#imgEndoso').attr('src',imgTimeLine);
			}else{
				var imgUrlEndoso = getIconoEndoso(imgEndoso);
				$('#imgEndoso').attr('src',imgUrlEndoso);
			}
			
			$('#labelPanelEndoso').html("Endoso #" + numeroEndoso);
			$('#'+endoso).show();
			
			$("#imgEndoso").css({'width':'80px'});
			$("#imgEndoso").css({'padding-left':'10px'});	
			$("#imgEndoso").css({'padding-bottom':'10px'});	
			$("#imgEndoso").css({'padding-top':'10px'});
			$("#cuadroImgEndoso"+numeroEndoso).css("background","#bac2bb");
			
			var cantidadCertificadosMarca = $("#certificadosCantidadAll").val();		
	    	$.unblockUI();

			if (cantidadCertificadosMarca == '50') {
				document.getElementById("verCertificados").style.display="none";
	    		document.getElementById("tablaCertificados").style.display="block";
				verDetalleTablaCertificadosEndoso(ramo, poliza, sucursal,numeroEndoso);
				
			}else {
				obtenerDatosCertificadosPoliza(numeroEndoso, ramo, poliza, sucursal);
			}
	    	
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
};



function obtenerDatosCertificadosPoliza(numeroEndoso, ramo, poliza, sucursal){
	// JSON DE CERTIFICADOS
	bloquearPantallaGris();

	$.ajax({
	    url : 'datosCertificado',
	    contentType: 'application/json', 
	    data : { endoso : numeroEndoso , ramo : ramo , poliza : poliza,sucursal:sucursal  },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {

	    	$('#cantCertificados').text("Certificados (" + json.length + ")");
	    		
	    	var d1 = document.getElementById("iconoCertificadoDePoliza");
			d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#509750;padding-top:15px;" >&#xE02f;</i>'; 
	    	
	    	
	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");	    	    	
	    	
	    	var d1 = document.getElementById("caruMayor");
	    	d1.innerHTML = ' '; 
	    	
	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
	    	
	    	/**variable para almacenar los certificados de la grilla*/
	    	var data = [];
	    	
	    	var mostrarGrillaCertificados = true;
	    	
	    	if(json.length>0 && json.length<50){
	    		mostrarGrillaCertificados = false;
	    	}
	    	
	    	for ( var int = 0; int < json.length; int++) {
	    		
	    		var num=int+1;
	    		var popUp= "'certificadoPopUp'";
	    		var nroCer= 'nroCertificado'+num;
	    		var DatoCer= 'datoCertificado'+num;
	    		
	    		if(!mostrarGrillaCertificados){
					caruNuevo = caruNuevo + '<div id="micaruB'+num+'" onClick="mostrarDetalleCertificadoSeleccionado('+popUp+','+json[int]['P_TF_CERTIF_CACE_NU_CERTIFICADO']+','+poliza+','+ramo+','+sucursal+');" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#509750; border-style: solid; box-shadow: 0 0 0px black;"><h6 id='+nroCer+' style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#509750;color:#ffffff;">#'+json[int]['P_TF_CERTIF_CACE_NU_CERTIFICADO']+' </h6><h6 style="margin-top:10%;" id='+DatoCer+' class="datoCertificadoCarusel">'+json[int]['P_TF_CERTIF_INB_DE_RIESGO']+'</h6><br></div>';
	    		}
	    		else{
	    			var d = (data[int] = {});
	    	        d["certificado"] =  json[int]['P_TF_CERTIF.CACE_NU_CERTIFICADO'];
	    	        d["riesgo"] = json[int]['P_TF_CERTIF.INB_DE_RIESGO'];
	    	        d["sumaAsegurada"] = json[int]['P_TF_CERTIF.INB_MT_SUMA_ASEGURADA'];
	    	        d["estado"] = json[int]['P_TF_CERTIF.INB_DE_ESTADO'];
	    		}
										
	    	}
	    	
	    	if(!mostrarGrillaCertificados){
	    		d1.innerHTML = caruNuevo + '</div></div>' ;
    	    	activarCaru();

	    	}
	    	
	    	
	    	} catch (e) {
    	    	$.unblockUI();
		    	mostrarError('Se produjo un inconveniente al cargar los datos del certificado.Error :'+e);
	    	}
	    	$.unblockUI();

	    	
	    },
		 
	    error: function (request, status, error) {

	    	$.unblockUI();
	        //swal('Disculpe, no existen certificados para el endoso seleccionado');
	    	$('#cantCertificados').text("Certificados");
	    	document.getElementById("iconoCertificadoDePoliza").innerHTML = '<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE611;</i>';
	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");	    	    	

	    	document.getElementById("caruMayor").innerHTML = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">' + request.responseText + '</div></div>';
	    	document.getElementById("micaru").style.display="block";
	    },
	 
	   
	});
}



function redirectCotizacion(numCotizacion){
	bloquearPantallaGris();
	location.href = "/PSPES/homeCotizacion?cotizacion="+numCotizacion;
	
}


function redirecCobranza() {
	
	bloquearPantallaGris();
	var valorPoliza = document.getElementById("valorPolizaComi").value;
	var valorRamo = document.getElementById("valorRamoComi").value;
	var valorCertificado = document.getElementById("valorCertificadoComi").value;
	var valorSucursal=document.getElementById("valorSucursal").value;
	
	location.href = "/PSPES/homeCobranza?poliza=" + valorPoliza + "&ramo="+ valorRamo + "&certificado="+valorCertificado+"&sucursal="+valorSucursal;

	$.unblockUI();
}


function redirecComisiones() {
	bloquearPantallaGris();
	var valorPoliza = document.getElementById("valorPolizaComi").value;
	var valorRamo = document.getElementById("valorRamoComi").value;
	var valorCertificado = document.getElementById("valorCertificadoComi").value;
	var valorSucursal=document.getElementById("valorSucursal").value;

	location.href = "/PSPES/homeComisiones?poliza=" + valorPoliza + "&ramo="+ valorRamo + "&certificado="+valorCertificado+"&sucursal="+valorSucursal;
	$.unblockUI();
}





function irHomeCertificado(){
	
	bloquearPantallaGris();
	var tipoFac = document.getElementById("tipoFacturacion").value;
	var nroPolizaTfPoli = $('#INFO_POLIZA').text();
	var ramoTfPoli = $('#INFO_RAMO').text();
	var nroCertificadoTfCertif = $('#INFO_CERTIFICADO').text();
	var sucursalTfPoli = $('#INFO_SUCURSAL').text();
	var endoso = document.getElementById("valorPolizaEndoso").value;

    location.href = "/PSPES/homeCertificado?poliza="+nroPolizaTfPoli +"&ramo=" + ramoTfPoli + "&nroCertificado="+nroCertificadoTfCertif + "&sucursal=" + sucursalTfPoli+"&facturacion="+tipoFac+"&endoso="+endoso;
}




function abrirModalComponenteCertificadoPoliza(){
	
	var valorCertificado=0;
	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorSucursal=document.getElementById("valorSucursal").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorEndoso=document.getElementById("valorPolizaEndoso").value;
	var valorImagen=document.getElementById("valorIconoPoliza").value;
	
	
	
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosComponente',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal, endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("valorComponentesPolizaCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-componentePoliza" role="cell">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COMP_INB_COMPONENTE'])) +'</td>'+
		            '<td class="td-grilla-componentePoliza" role="cell">'+validarCampoVacio(json[int]['P_TF_COMP_CASB_TA_COMPONENTE']) +'</td>'+
		            '<td class="td-grilla-componentePoliza" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COMP_CASB_MT_COMPONTE'])) +'</td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
 
    	    	$("#DATOS_IMAGEN_ICONO_COMPONENTE").html(valorImagen);
    	    	$("#DATOS_COMPONENTE").html("Componentes : <b>#"+valorPoliza+" - "+valorEndoso+"</b>");


    	    	
    	    	
			//Abre el modal
			$("#componenteCertificadoPopUp").modal({
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
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};





function abrirModalIIBBCertificadoPoliza(){
	
	var valorCertificado=0;
	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorSucursal=document.getElementById("valorSucursal").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorEndoso=document.getElementById("valorPolizaEndoso").value;
	var valorImagen=document.getElementById("valorIconoPoliza").value;
	
	
	
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosIIBB',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal, endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	     		var d1 = document.getElementById("datosIIBBCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length-1 ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell">'+validarCampoVacio(json[int]['P_TF_COMP_INB_COMPONENTE']) +' - '+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COMP_INB_COMPONENTE'])) +'</td>'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell">'+validarCampoVacio(json[int]['P_TF_COMP_CASE_TA_COMPONENTE'])+'</td>'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COMP_CASE_MT_COMPONENTE'])) +'</td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo;  
    	    	total = json.length - 1;
    	    	$("#DATOS_IIBB").html("IIBB de la p&oacute;liza : <b>#"+valorPoliza+"</b>");

    	    	$("#DATO_IBB_CLIENTE").html(" <b>" + validarCampoVacio(json[total]['P_TF_CABECERA_CACE_CACN_NU_CEDULA_RIF']) +"</b>");
    	    	$("#DATO_IBB_PERSONA").html("<b>"+validarCampoVacio((json[total]['P_TF_CABECERA_CACE_CABU_NU_PERSONA']))+ "</b>");
    	    	$("#DATO_IBB_CUIT").html("<b>"+validarCampoVacio((json[total]['P_TF_CABECERA_CABU_NU_CUIT']))+ "</b>");
    	    	$("#DATO_IBB_ASEGURADO").html("<b>"+validarCampoVacio(primeraLetraMayus(json[total]['P_TF_CABECERA_INB_ASEGURADO']))+ "</b>");


    	    	
			//Abre el modal
			$("#IIBBCertificadoPopUp").modal({
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
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};






/* ----------------------------------------------------------------- MODAL SUCURSAL ------------------------------------------------*/

function abrirModalSucursalHome(codSucursal){
		
	bloquearPantallaGris();
	$.ajax({
	    url : 'detalleSucursal',
	    contentType: 'application/json', 
	    
	    data : {sucursal :codSucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
			llenarDinamicamente(json[0]);
			
			$("#INFO_P_TF_LISTA_CASU_CD_SUCURSAL").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_CD_SUCURSAL'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_CAEM_CD_CENTRO_EMISOR").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_CAEM_CD_CENTRO_EMISOR'])+ " - " + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_CENTRO_EMISOR']))+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_TELEFONO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_TELEFONO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_NU_TELEFONO3").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_NU_TELEFONO3'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_EMAIL").html("<b>" + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_EMAIL']))+ "</b>");
			
			$("#INFO_P_TF_LISTA_CASU_DE_CALLE").html("<b>" + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_CALLE']))+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_NUMERO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_NUMERO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_PISO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_PISO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_DEPARTAMENTO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_DEPARTAMENTO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_CAGI_CD_REGION").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_CAGI_CD_REGION'])+ " - " + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_REGION'])) + "</b>");

			$("#DATO_SUCURSAL_POLIZA").html("<b>" + primeraLetraMayus(json[0]['P_TF_LISTA_CASU_DE_SUCURSAL'])+ "</b>");
			
			$("#sucursalPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente, al cargar la sucursal de la poliza. Error:'+e);
	    	}
	    	
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
};

function verDatosContactoPorPoliza(){
	var valorPoliza = document.getElementById("valorPoliza").value;
	var valorCliente = document.getElementById("valorCliente").value;
	var valorRamo = document.getElementById("valorRamo").value;
	var valorSucursal = document.getElementById("valorSucursal").value; 

	abrirPopUpContacto(valorPoliza, valorCliente, valorRamo, valorSucursal, 'obtenerContactoPorPoliza');
	
}

function irInspeccionesHome(){
	
	var poliza= document.getElementById("valorPoliza").value;
	var ramo= document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'existeInspecciones',
	    contentType: 'application/json', 
	    
	    data : {poliza :poliza, ramo: ramo, sucursal: sucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		location.href="/PSPES/homeInspecciones?poliza="+ poliza + "&ramo=" + ramo +"&sucursal="+sucursal;
				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar inspecciones. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
	
}

function cargaTablaEndososPoliza(ramo, poliza){
	
	valorSucursal = document.getElementById("valorSucursal").value;
	bloquearPantallaGris();

	$.ajax({
		url : 'datosEndososPoliza',
 	    contentType: 'application/json', 
 	    data : { ramo : ramo , poliza : poliza, sucursal: valorSucursal },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		var cantEndosos = document.getElementById("cantEndosos");
    	    	cantEndosos.innerHTML = 'Endosos ' + '(' + json.length + ')';
	    		
	    		var data=[];
    	    	for ( var i = 0; i < json.length; i++) {
    	    	        var d = (data[i] = {});
    	    	        d["endoso"] =  json[i]['P_TF_LISTA_END.CACW_NU_ENDOSO'];
    	    	        d["descripcion"] = formatearFechaJson(json[i]['P_TF_LISTA_END.CACW_FE_OPERACION']) + " - " + primeraLetraMayus(json[i]['P_TF_LISTA_END.INB_TP_TRANSAC']) ;
    	    	        d["imgEndoso"] = json[i]['P_TF_LISTA_END.CACW_CAME_TP_TRANSAC'];

    	    	}
    	    	
    	    	document.getElementById("verEndosos").style.display="none";
    	    	document.getElementById("tablaEndososPoliza").style.display="block";

    	    	completarEndososTabla(data,"",poliza, ramo, valorSucursal);
	        	
	        	$.unblockUI();
				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Code: 101 - Se genero un inconveniente, al cargar los endosos de la poliza. Error:'+e);
	    	}
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	try {
	    		var data=[];
	    		completarEndososTabla(data,"",poliza, ramo, valorSucursal);
			} catch (e) {
				// TODO: handle exception
			}
			document.getElementById("cantEndosos").innerHTML = 'Endosos ' + '(0)';
	    	 mostrarError('Code: 102 - ' + xhr['responseText']);	    },
	});
}


/***************************************************************************/

//variable local a la funcion completarEndososTabla
var buscarFiltroEndoso="";
var dataViewEndoso;
var gridEndoso;
function completarEndososTabla(data, nroCertificado, poliza, ramo, sucursal){
	
	var columns = [
	       	    {id: "endoso", name: "#", field: "endoso", width:80, cssClass: "cell-title", selectable: false, resizable: false},
	       	    {id: "descripcion", name: "Descripcion", field: "descripcion", width:185,  selectable: false, resizable: false},
	       	    { id: "imgEndoso", name: "imgEndoso", field: "imgEndoso", width: 0, minWidth: 0, maxWidth: 0, cssClass: "reallyHidden", headerCssClass: "reallyHidden" }

	       	];

	       	var options = {
	       	    editable: true,
	       	    enableAddRow: false,
	       	    enableCellNavigation: true,
	       	    asyncEditorLoading: false,
	       	    fullWidthRows:true,
	       	    rowHeight: 30
	       	};

	      //inicializo la grilla
	       	dataViewEndoso = new Slick.Data.DataView({ inlineFilters: true });
	       	dataViewEndoso.beginUpdate();
	       	dataViewEndoso.setItems(data, "endoso");
	       	dataViewEndoso.setFilter(myFilterEndoso);
	       	dataViewEndoso.endUpdate();

	        // inicializo la grilla
	       	gridEndoso = new Slick.Grid("#grillaEndososPoliza", dataViewEndoso, columns, options);
	       	
	       	gridEndoso.onClick.subscribe(function (e) {
	       		
		        var cell = gridEndoso.getCellFromEvent(e);
		        
		        var row = cell.row;
		        var row_values = dataViewEndoso.getItem(row);
		        	    	
		        mostrarEndosoPolizaHome('timeLineItemEndoso'+row_values.endoso,'endoso',row_values.endoso,'cuantitativo',poliza,ramo, sucursal, row_values.imgEndoso);
	    		
	       	});
	    
	    dataViewEndoso.onRowCountChanged.subscribe(function (e, args) {
	    	gridEndoso.updateRowCount();
	    	gridEndoso.render();
	    });

	    dataViewEndoso.onRowsChanged.subscribe(function (e, args) {
	    	gridEndoso.invalidateRows(args.rows);
	    	gridEndoso.render();
	    });
	  
	    $("#inputBusquedaEndoso").keyup(function (e) {
	        Slick.GlobalEditorLock.cancelCurrentEdit();

	        // clear on Esc
	        if (e.which == 27) {
	          this.value = "";
	        }

	        buscarFiltroEndoso = this.value;
	        updateFilterEndoso();

	     });
	    
	    //Modifico tamanio del scroll slickviewport
	    document.getElementById("idSlickViewport").style.height = "493px";
	    //document.getElementById("idSlickViewport").className = "altoPanelB";

	    $(".ui-state-default").css("background","#205081");
	    
	    var x = document.getElementsByClassName("slick-header-column");
	    /*Se cambia el tamanio del encabezado de tabla de header endosos*/
	    for(var i = 0; i<3; i++){
		    x[i].style.height="20px";
		    x[i].style.background="#205081";
	    }
	    
}

function updateFilterEndoso() {
  dataViewEndoso.setFilterArgs({
    searchString: buscarFiltroEndoso
  });
  dataViewEndoso.refresh();
}

function myFilterEndoso(item) {
	
  if (buscarFiltroEndoso != "" && item["endoso"].indexOf(buscarFiltroEndoso) == -1
      && item["descripcion"].indexOf(buscarFiltroEndoso) == -1) {
      return false;
  }

  if (item.parent != null) {
      var parent = data[item.parent];

      while (parent) {
          if (parent._collapsed ||
              (buscarFiltroEndoso != "" && parent["endoso"].indexOf(buscarFiltroEndoso) == -1
                  && parent["descripcion"].indexOf(buscarFiltroEndoso) == -1)) {
              return false;
          }

          parent = data[parent.parent];
      }
  }

  return true;
}


function paginadoEndoso(pag){
	
	bloquearPantallaGris();
	
	
	var poliza= document.getElementById("valorPoliza").value;
	var ramo= document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;
	var cantidadPag = document.getElementById("cantidadPag").value;
	var totalPag =parseInt(cantidadPag)+ parseInt(pag);
	$('#cantidadPag').val(totalPag);
	if(totalPag <= 0){
		totalPag = 1;
		mostrarError('Por favor,avance hacia la derecha para continuar con el paginado');
	}
	$.ajax({
	    url : 'datosEndososPoliza',
	    contentType: 'application/json', 
	    
	    data : {poliza :poliza, ramo: ramo, sucursal: sucursal,numPag:totalPag} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$('#paginadoEndososBtn').css('display','');
	    		var d1 = document.getElementById("panelEndosoPaginado");
    	    	d1.innerHTML = '';
    	    	var panelNuevo = '<div class="timeline" style="padding-bottom:0px;width:100%;" id="panelEndosoPaginado">';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		var numEndoso = +validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_NU_ENDOSO']));
    	    		var poliza = +validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_CAPO_NU_POLIZA']));
    	    		var ramo = +validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_CARP_CD_RAMO']));
    	    		var timeLineItemEndoso = "'timeLineItemEndoso'";
    	    		var endoso = "'endoso'";
    	    		var cuantitativo = "'cuantitativo'";
    	    		panelNuevo = panelNuevo+'<div class="timeline__box">'+
    	    		'<div class="timeline__date" id="cuadroImgEndoso'+numEndoso+'" style="cursor:pointer; background-color:#ffffff" onclick="mostrarEndosoPolizaHome('+timeLineItemEndoso+','+endoso+','+numEndoso+','+cuantitativo+','+poliza+','+ramo+','+sucursal+','+null+');">'+
    	    		'<span class="timeline__day">'+
    	    		'<img src="'+getIconoEndoso(json[int]['P_TF_LISTA_END.CACW_CAME_TP_TRANSAC'])+'" width="30" height="30" id="imgTimeLineEndoso'+validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_NU_ENDOSO']))+'">'+
    	    		'</span>'+
                    '</div>'+
                    '<div class="timeline__post seleccionPanelB" id="timeLineItemEndoso'+numEndoso+'" onclick="mostrarEndosoPolizaHome('+timeLineItemEndoso+','+endoso+','+numEndoso+','+cuantitativo+','+poliza+','+ramo+','+sucursal+','+null+');">'+
                    '<div class="timeline__content" style="cursor:pointer;">'+
                    '<h6 style="cursor:pointer;" id="etiquetaEndoso$nroEndoso"><b>#'+validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_NU_ENDOSO']))+' - '+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_END.CACW_FE_OPERACION']))+' .</b></h6>'+
                    '<h6> '+validarCampoVacio((json[int]['P_TF_LISTA_END.INB_TP_TRANSAC']))+' </h6>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
    	    	}
    	    	d1.innerHTML = panelNuevo;
	    		
    			
    			$(".btnPaginado").each(function(){
    		 	    $(this).css("background","white");
    		 	});
	    		
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente mostrar los endosos, Error:'+e);
	    	}
	    	$.unblockUI();
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
	
}



function getIconoEndoso(tipoEndoso) {
	
	if (tipoEndoso == null) 
		return "";
	var endoso = tipoEndoso; 
	if (endoso == "A") //Anulacion 
		return "/PSPES/resources/img/rector/timeLine/formularioAnulacion.svg";
	
	if (endoso == "C") //recuotificacion 
		return "/PSPES/resources/img/rector/timeLine/calendarioAzul.svg";
	
	if (endoso == "E") // emision 
		return "/PSPES/resources/img/rector/timeLine/emisionAzul.svg";
	
	if (endoso == "F") // refacturacion 
		return "/PSPES/resources/img/rector/timeLine/bolsaDineroAzul.svg";
	
	if (endoso == "H") //rehabilitacion 
		return "/PSPES/resources/img/rector/timeLine/tildeVerde.svg";
	
	if (endoso == "L") //endoso cualitativo 
		return "/PSPES/resources/img/rector/timeLine/formularioCualitativoAzul.svg";
	
	if (endoso == "M") //endoso cuantitativo negativos 
		return "/PSPES/resources/img/rector/timeLine/bolsaDineroRojo.svg";
	
	if (endoso == "N") //endoso cuantitativo 
		return "/PSPES/resources/img/rector/timeLine/bolsaDineroVerde.svg";
	
	if (endoso == "P") //pago  
		return "/PSPES/resources/img/rector/timeLine/pesosAzul.svg";
	
	if (endoso == "R") //renovacion 
		return "/PSPES/resources/img/rector/timeLine/emisionAzul.svg";
	
	if (endoso == "T") //transferencia propiedad
		return "/PSPES/resources/img/rector/timeLine/flechasAzul.svg";
	
	if (endoso == "U") //reverso ultimo endoso 
		return "/PSPES/resources/img/rector/timeLine/undo.svg";
	
	return "";
};

function abrirModalBoletaDePago(){
	
	bloquearPantallaGris();
	
	var poliza = document.getElementById("valorPoliza").value;
	var ramo = document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;

	$.ajax({
	    url : 'datosBoletaDePago',
	    contentType: 'application/json', 
	    
	    data : {poliza :poliza, ramo: ramo, sucursal: sucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var stringJsonBoletaPago = "[";
	    		var stringJsonBoletaPagoAux="";
	    		
	    		var dl = document.getElementById("datosBoletaDePago");
	    		dl.innerHTML=' ';
	    		var rowBoletaPago = '';
	    		
	    	    for ( var int = 0; int < json.length; int++) {
	    	    	rowBoletaPago = rowBoletaPago + '<tr class="tr-grilla row-select" id="fila'+int+'";">';
	    	    	
	    	    	rowBoletaPago = rowBoletaPago + '<td class="td-grilla-componentesBoletaPagoHome" style="width:14%;" role="cell">';
	    	    	rowBoletaPago = rowBoletaPago + '<h6>'+formatearFechaJson(json[int]['P_TF_DEUD_CARE_FE_HASTA'])+'</h6>';
	    	    	rowBoletaPago = rowBoletaPago + '</td>';
	    	    	
	    	    	rowBoletaPago = rowBoletaPago + '<td class="td-grilla-componentesBoletaPagoHome" style="width:14%;" role="cell">';
	    	    	rowBoletaPago = rowBoletaPago + '<h6>'+formatearMoneda(json[int]['P_TF_DEUD_INB_MT_IMPORTE'])+'</h6>';
	    	    	rowBoletaPago = rowBoletaPago + '</td>';
	    	    	
	    	    	rowBoletaPago = rowBoletaPago + '<td class="td-grilla-componentesBoletaPagoHome" style="width:14%;" role="cell">';
	    	    	rowBoletaPago = rowBoletaPago + '<input id="checkBoletaPago'+int+'" type="checkbox" style="cursor:pointer;" value="'+int+'" />';
	    	    	rowBoletaPago = rowBoletaPago + '</td>';
	    	    	
	    	    	
	    	    	rowBoletaPago = rowBoletaPago + '</tr>';
	    	    	
	    	    	
	    	    	//recupero los datos json para almacenarlo en una variable string json
	    	    	stringJsonBoletaPagoAux += "{" + 
	    	    	"'P_TF_DEUD_INB_VC_IMPORTE':'" +json[int]['P_TF_DEUD_INB_VC_IMPORTE'] + "'," +
	    	    	"'P_TF_DEUD_INB_FE_VENCIMIENTO':'" + formatearFechaJson(json[int]['P_TF_DEUD_INB_FE_VENCIMIENTO']) + "'," +
	    	    	"'P_TF_DEUD_INB_NU_COMPANIA':'" + json[int]['P_TF_DEUD_INB_NU_COMPANIA'] + "'," +
	    	    	"'P_TF_DEUD_INB_MT_IMPORTE':'" + formatearMonedaSinSimbolo(json[int]['P_TF_DEUD_INB_MT_IMPORTE']) + "'," +
	    	    	"'P_TF_DEUD_CARE_FE_HASTA':'" + formatearFechaJson(json[int]['P_TF_DEUD_CARE_FE_HASTA']) + "'," +
	    	    	"'P_TF_DEUD_INB_VC_CODIGO_BARRA':'" + json[int]['P_TF_DEUD_INB_VC_CODIGO_BARRA'] + "'," +
	    	    	"'P_TF_DEUD_CAMO_SM_MONEDA':'" + json[int]['P_TF_DEUD_CAMO_SM_MONEDA'] + "'," +
	    	    	"'P_TF_DEUD_INB_VC_MENSAJE_03':'" + json[int]['P_TF_DEUD_INB_VC_MENSAJE_03'] + "'," +
	    	    	"'P_TF_DEUD_INB_VC_MENSAJE_01':'" + json[int]['P_TF_DEUD_INB_VC_MENSAJE_01'] + "'," +
	    	    	"'P_TF_DEUD_INB_VC_MENSAJE_02':'" + json[int]['P_TF_DEUD_INB_VC_MENSAJE_02'] +"'"
	    	    	
	    	    	+"}";
	    	    	
	    	    	if((int + 1) < json.length){
	    	    		stringJsonBoletaPagoAux +=","
	    	    	}
	    	    	
	    	    }
	    		
	    	    stringJsonBoletaPago += stringJsonBoletaPagoAux + "]";
	    	    
	    	    document.getElementById("stringBoletaJson").value = stringJsonBoletaPago;
	    	    
	    		dl.innerHTML = rowBoletaPago;
	    		
	    		abrirPopUpNuevo('boletaDePagoPopUp');
	    		
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente al generar las boletas de pago, Error:'+e);
	    	}
	    	$.unblockUI();
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function enviarBoletaPorEmail(){

	var indicesBoleta = '';
	
	var checkBoletaPago = false;
	var checkEmail = false;
	
	$('.row-select input').each(function() {   
	      var condicion = $(this).is(":checked");
	      if (condicion) {
	        checkBoletaPago = true;
	      }
	});
	
	checkEmail = validarEmail('valorEmail');
	
	if(checkBoletaPago&&checkEmail){
		$('.row-select input:checked').each(function() {
			indicesBoleta = indicesBoleta +$(this).val()+",";
		});
		var stringJsonBoleta = document.getElementById("stringBoletaJson").value;		
		enviarBoletaDePago(indicesBoleta, stringJsonBoleta);
		
	}else{
		var mensajeAlerta='';
		if(!checkBoletaPago){
			mensajeAlerta += 'Seleccione la boleta de pago';
		}
		if(!checkEmail&&checkBoletaPago){
			mensajeAlerta += 'Ingrese un email valido';
		}
		
		mostrarMensajeBoletaDePago(mensajeAlerta, 'alert-warning');
		
	}
	
			
}

function enviarBoletaDePago(indicesBoleta, stringBoletaJson){
	
	var poliza = document.getElementById("valorPoliza").value;
	var ramo = document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;
	var emailDestino = document.getElementById("valorEmail").value;
	var descAsegurado = document.getElementById("valorNombreAsegurado").value;
	
	bloquearPantallaGris();
	
	$.ajax({
	    url : 'enviarBoletaDePago',
	    contentType: 'application/json', 
	    
	    data : {poliza: poliza, ramo:ramo, sucursal: sucursal, indicesBoleta: indicesBoleta, emailDestino: emailDestino, descAsegurado: descAsegurado, stringBoletaJson: stringBoletaJson} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var mensaje="Se envio el correo";
	    		
	    		document.getElementById("valorEmail").value="";
	    		document.getElementById("stringBoletaJson").value ="";
	    		$('.row-select input').each(function() {   
	    		      $(this).prop("checked", false);
	    		      
	    		});
	    		
	    		mostrarMensajeBoletaDePago(mensaje, 'alert-success');
	    		
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente al enviar por email las boletas de pago, Error:'+e);
	    	}
	    	$.unblockUI();
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function mostrarMensajeBoletaDePago(mensaje, tipoMensaje){
	
	var dl = document.getElementById("mensajeAlertaBoleta");
	dl.innerHTML = '';
	
	dl.innerHTML = '<div class="col-lg-12"><div class="alert '+tipoMensaje+'" style="padding: 10px; margin-bottom: 0px;" role="alert">'+mensaje+'</div></div>';
	
	$("#mensajeAlertaBoleta").show();
	$("#mensajeAlertaBoleta").delay(2000).hide(800);
	
}






function inicioPreliquidacionHome() {
	bloquearPantallaGris();
	activarCaru();
	$( "#timeLineItemPreliquidacion1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
})
}


function buscadorPanelCEntidadPreliquidacion() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaPreliquidacion");
	  filter = input.value.toUpperCase();
	  
	  
	  $(".datoPreliquidacionCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoPreliquidacionCarusel", "micaruB");
		  var idEncabezado = idH6.replace("datoPreliquidacion", "nroPreliquidacion");
		  
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idEncabezado).innerHTML.toUpperCase().indexOf(filter) > -1 )) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  
}


function mostrarPanelPreliquidacion(obj,nuCard,icono,ramo,poliza){

	
	var valorPre=document.getElementById("valorPreliquidacion").value;

	
	bloquearPantallaGris();
	$.ajax({
	    url : 'infoDetallePre',
	    contentType: 'application/json', 
	    data : { preliquidacion : valorPre},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var card=nuCard -1;
	    		llenarDinamicamente(json[card]);		
    	    	
	    		$('#panelDPreli').show();
	    		
				$("#DATO_POLIZA_PRE").html("<b> " + validarCampoVacio(json[card]['P_TF_LISTA.RAMO']) +" - "+validarCampoVacio(json[card]['P_TF_LISTA.POLIZA'])+  "</b>");
				$("#DATO_TOTAL_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.MT_TOTAL'])) +  "</b>");
				$("#DATO_EXIGIBLE_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.MT_EXIGIBLE'])) +  "</b>");
				$("#DATO_APAGAR_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.MT_A_PAGAR'])) +  "</b>");
				$("#DATO_EMITIR_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.REMESA_DEV'])) +  "</b>");
				$("#DATO_DEVOLUCION_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.MT_REM_A_EMITIR'])) +  "</b>");
				$("#DATO_FE_COBRO").html("<b>" + validarCampoVacio(formatearFechaJson(json[card]['P_TF_LISTA.FE_COBRO'])) +  "</b>");
				$("#DATO_CERTIFICADO").html("<b>" + validarCampoVacio((json[card]['P_TF_LISTA.CERTIFICADO'])) +  "</b>");
				$("#DATO_SUCURSAL").html("<b>" + validarCampoVacio((json[card]['P_TF_LISTA.SUCURSAL'])) +  "</b>");

    	    	$(".seleccionPanelB").each(function(){
    	     	    $(this).css("background","white");
    	     	});
    	    	$('#'+obj+nuCard).css("background","#bac2bb");
    	    	
    	    	$('#labelDetallePre').html("Informacion del Detalle #"+ramo+"-"+poliza);
    	    	
    	    	var d1 = document.getElementById("panelImagenPre");
    	    	d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+getIconoRamo(ramo)+'</i>';
			
	    	}
	    	catch(e)
	    	{
		        alert('No se encontro un detalle de la informaci&oacute;n',e);
	    		
	    	}
	    	
	    	
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};
	


function paginadoPre(pag){
	
	var valorPre=document.getElementById("valorPreliquidacion").value;
	var cantidadPag = document.getElementById("cantidadPag").value;
	var totalPag =parseInt(cantidadPag)+ parseInt(pag);
	$('#cantidadPag').val(totalPag);
		
	if(totalPag <= 0){
		
		$('#cantidadPag').val(1);
		mostrarError('Por favor,avance hacia la derecha para continuar con el paginado');
		
	}else{
		bloquearPantallaGris();
		$.ajax({
		    url : 'datosDetallePrePaginado',
		    contentType: 'application/json', 
		    data : { preliquidacion : valorPre, pagina:totalPag},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		$('#paginadoEndososBtn').css('display','');
		    		var d1 = document.getElementById("panelPrePaginado");
	    	    	d1.innerHTML = '';
	    	    	var panelNuevo = '';
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		var card =int;
	    	    		var poliza = validarCampoVacio((json[int]['P_TF_LISTA.POLIZA']));
	    	    		var ramo = validarCampoVacio((json[int]['P_TF_LISTA.RAMO']));
	    	    		var certificado = validarCampoVacio((json[int]['P_TF_LISTA.CERTIFICADO']));
	    	    		var timeLineItemPreliquidacion = "'timeLineItemPreliquidacion'";
	    	    		var icono = getIconoRamo(json[int]['P_TF_LISTA.RAMO']);
	    	    		var ss ="''";
	    	    		panelNuevo = panelNuevo+''+
	    	    		'<div  id="cuadroImgEndoso" style="cursor:pointer; background-color:#ffffff">'+
	    	    		'<div class="timeline__post seleccionPanelB" style="cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px" id="timeLineItemPreliquidacion'+int+'" onclick="mostrarPanelPreliquidacion('+timeLineItemPreliquidacion+','+card+','+ss+','+ramo+','+poliza+')";>'+
	                    '<div class="timeline__content" style="overflow:hidden;">'+
	                    '<i class="material-icons altoIcono"  style="color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;"  id="imgTimeLineEndoso$nroPoliza">'+icono+'</i>'+
	                    '<h6>Ramo:<b>  '+ramo+'  </b></h6>'+
	                    '<h6>P&oacute;liza :<b> '+poliza+' </b></h6>'+
	                    '<h6>Certificado :<b> '+certificado+' </b></h6>'+
	                    '</div>'+
	                    '</div>'+
	                    '</div>';
	    	    	
	    	    	}
	    	    	d1.innerHTML = panelNuevo +'</div>';
		    		
	    			
	    			$(".btnPaginado").each(function(){
	    		 	    $(this).css("background","white");
	    		 	});
		    		
		    	} catch (e) {
		    		mostrarError('Se genero un inconveniente mostrar los endosos, Error:'+e);
		    	}
		    	$.unblockUI();
				
		    },
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	
		    	document.getElementById("cantidadPag").value -= 1;
		    	
				mostrarError('Por favor, avance hacia la izquierda para continuar con el paginado anterior');

		    	
		    },
		 
		   
		});
		
	}
	
	
	
}



function getIconoRamo(ramoIn) {
	
	if (ramoIn == null) 
		return "";
	var ramo = ramoIn 
	
	if (ramo == "1") 
		return "&#xE80E;";
	if (ramo == "2") 
		return "&#xE558;";
	if (ramo == "3") 
		return "&#xE195;";
	if (ramo == "4") 
		return "&#xE531;";
	if (ramo == "5") 
		return "&#xE3AD;";
	if (ramo == "6") 
		return "&#xE899;";
	if (ramo == "7") 
		return "&#xE90E;";
	if (ramo == "8") 
		return "&#xE88A;";
	if (ramo == "9") 
		return "&#xE545;";
	if (ramo == "10") 
		return "&#xE3EA;";
	if (ramo == "11") 
		return "&#xE60E;";
	if (ramo == "12") 
		return "&#xE8F9;";
	if (ramo == "13") 
		return "&#xE333;";
	if (ramo == "14") 
		return "&#xE7F1;";
	if (ramo == "15") 
		return "&#xE02F;";
	if (ramo == "16") 
		return "&#xE536;";
	if (ramo == "17") 
		return "&#xE7FB;";
	if (ramo == "18") 
		return "&#xE532;";
	if (ramo == "21") 
		return "&#xE7FD;";
	if (ramo == "22") 
		return "&#xE91B;";
	
	return "all_inclusive";
	
}





function getDatosModalCancelacion(card,valor){
	
	var valorPre=document.getElementById("valorPreliquidacion").value;
		
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'infoDetalleCancel',
	    contentType: 'application/json', 
	    data : { preliquidacion : valorPre},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		if(valor == 0){
	    		var posicion = card -1;
	    		}
	    		else{
		    		var posicion = card;
	    		}
	    		$("#DATOS_MODAL_CANCELACION_PRE").html("Cancelaci&oacute;n de la Preliquidaci&oacute;n #<b>" + valorPre + "</b>");
				$("#DATO_MONEDA_CANCELACION").html("<b> " + validarCampoVacio(json[posicion]['P_TF_LISTA_CAPC_MONEDA_CANCELACION']) +" - "+validarCampoVacio(primeraLetraMayus(json[posicion]['P_TF_LISTA_INB_DE_MONEDA_CANCELACION']))+  "</b>");
				$("#DATO_CANCELACION").html("<b> "+validarCampoVacio(formatearMoneda(json[posicion]['P_TF_LISTA_CAPC_MT_CANCELADO']))+  "</b>");
 			      
				
				llenarDinamicamente(json[posicion]);	
			//Abre el modal
			$("#cancelacionPrePopUp").modal({
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
		        alert('No posee datos',e);
	    		
	    	}
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function descargarDetallePreliExcel(){
	
	var preliquidacion = document.getElementById("valorPreliquidacion").value;
	
	location.href = '/PSPES/descargarPreliExcel?preliquidacion=' + preliquidacion;
	
}
function inicioProductorHome(){
	
	bloquearPantallaGris();
	verDatosOSSEG();
	verDatosMotivoBaja();
	activarCaru();
	
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
	})
	$.unblockUI();
}

function primeraLetraMayus(dato) {
	if(dato === null || dato === undefined)
	{
	return '';
	}
	else
		{
	return dato.replace(
	        /\w\S*/g,
	        function(txt) {
	            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	        }
	    );
		}
}

function mostrarProductorHome(obj,desc,num,icono,ramo)
{
	var valorProductor=document.getElementById("valorProductor").value;

	bloquearPantallaGris();

	$.ajax({
	    url : 'polizasProductor',
	    contentType: 'application/json', 
	    data : { productor : valorProductor},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	llenarDinamicamente(json[num-1]);
			$("#INFO_PRODUCTOR_P_TF_PREMIO_DEL_RAMO ").html("<b> " + formatearMoneda(json[num-1]['P_TF_LISTA_VIG_INB_MT_PREMIO_RAMO']) + "</b>");
			$("#INFO_PRODUCTOR_P_TF_SALDO_DEL_RAMO ").html("<b> " + formatearMoneda(json[num-1]['P_TF_LISTA_VIG_INB_MT_SALDO_RAMO']) + "</b>");
			$("#DATO_IMG_RAMO").html(icono);
			
			
			$("#valorRamoProductor").val(ramo);
			
			
			$('#panelb').hide();
			$('#panela').show();
			$('#polizasRamo').show();
			$('#verMasPanelA').text('Ver mas');

			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$('#'+obj+num).css("background","#bac2bb");
			
			$('#labelPanelProductor').html("Ramo : "+ramo + " - "+desc);
			
			var d1 = document.getElementById("panelImagenProductor");
			d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
	    	}
	    	catch(e)
	    	{
	    		alert('Error generado por : '+e);
	    	}
			
			
			
	   		// JSON DE PAGOS RECHAZADOS
	    	$.ajax({
	    	    url : 'polizasRechazadas',
	    	    contentType: 'application/json', 
	    	    data : { productor : valorProductor , ramo : ramo },
	    	    type : 'GET',
	    	    dataType : 'json',
	    	    success : function (json) {
	    	    	try {
	    	    	$('#cantPagosRechazados').text("Pagos Rechazados (" + json.length + ")");	    	    	
	    	    	$('#cantPagosRechazados').parent().next().find('i:first').remove();
	    	    	
	    	    	var jj = document.getElementById("iconoPanelC");
	    			jj.innerHTML = '<i class="material-icons altoIcono"  style="color:#e0d100;padding-top:15px;" >&#xE02f;</i>'; 
	    	    	
	    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");
	    	    	var d1 = document.getElementById("caruMayor");
	    	    	d1.innerHTML = ' ';
	    	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
	    	    	  
	    	    	for ( var int = 0; int < json.length; int++) {
	    	    	
	    	    		var num=int+1;
	    	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#e0e0e0; border-style: solid; box-shadow: 0 0 0px black;" onclick="abrirModalPagosRechazadosProductor('+json[int]['P_TF_RECHAZOS_CJIP_CAPO_NU_POLIZA']+','+json[int]['P_TF_RECHAZOS_CJIP_CARP_CD_RAMO']+','+num+');"><h6 id="nroRamo'+num+'" style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#e0d100;color:#ffffff;">Ramo : '+json[int]['P_TF_RECHAZOS_CJIP_CARP_CD_RAMO']+'</h6><h6 style="margin-top:2%;" id="datoPagoRechazado$velocityCount" class="datoPolizaRechazada">P&oacute;liza : <b>'+json[int]['P_TF_RECHAZOS_CJIP_CAPO_NU_POLIZA']+'</b></h6><h6 style="margin-top:2%;" id="datoPagoRechazado$velocityCount" class="datoPolizaRechazada"><b>'+primeraLetraMayus(json[int]['P_TF_RECHAZOS_INB_VC_RAZO'])+'</b></h6><h6 style="margin-top:2%;" id="datoPagoRechazado$velocityCount" class="datoPolizaRechazada">'+json[int]['P_TF_RECHAZOS_COMR_DE_MOTIVO_RECHAZO']+'</h6><br></div>';
	    	    	}
	    	    	d1.innerHTML = caruNuevo;  
		    	
	    	    	activarCaru();
	    	    	} catch (e) {
	    	    		alert('Se produjo un inconveniente al cargar los pagos rechazados',e);
	    	    	}
	    	    	
	    	    	$.unblockUI();
	    	    },
	    	    error: function (request, status, error) {
	    	    	$.unblockUI();
	    	    	$('#cantPagosRechazados').text("Pagos Rechazados");	    	    	
	    	    	$('#cantSiniestros').text("Siniestros");
	    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
	    	    	
	    	    	var jj = document.getElementById("iconoPanelC");
	    			jj.innerHTML = '<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE611;</i>'; 
	    	    	
	    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");
	    	        document.getElementById("micaru").innerHTML = request.responseText; 
	    	    	
	    	    },
	    	   
	    	});
			
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },

	   
	});
	
	
}

function buscadorPanelCEntidadProductor() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaPagosRechazados");
	  filter = input.value.toUpperCase();
	
	  $(".datoPolizaRechazada").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoPagoRechazado", "micaruB");
		  var idEncabezado = idH6.replace("datoPagoRechazado", "nroRamo");
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idCard).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  

	}


function abrirModalProductorHome(productor){
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosProductorModal',
	    contentType: 'application/json', 
	    data : {productor:productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);

			$("#DATO_P_TF_PROD_CAPD_NM_PRODUCTOR").html("<b>#" + json[0]['P_TF_PROD_CAPD_CD_PRODUCTOR']+" - "+primeraLetraMayus(json[0]['P_TF_PROD_CAPD_NM_PRODUCTOR'])  +"</b>" );
			$("#DATO_P_TF_PROD_CAPD_NM_PRODUCTOR_REDIRECT").val(json[0]['P_TF_PROD_CAPD_CD_PRODUCTOR']);

			//Abre el modal
			$("#productorPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos del productor',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};


	function redirecCarteraProd()
{
	bloquearPantallaGris();
	var valorProductor = document.getElementById("valorProductor").value;
	var valorRamo = document.getElementById("valorRamoProductor").value;
	if(valorRamo == 99)
		{
		valorRamo = 0;
		}
	
	location.href = "/PSPES/go?dato="+valorProductor+"&entidades=100000&p1="+valorRamo+"&p2=1001&p3=07";
}
	
function redireProductorHome()
{
	bloquearPantallaGris();
	var valorProductor = document.getElementById("DATO_P_TF_PROD_CAPD_NM_PRODUCTOR_REDIRECT").value;
	location.href = "/PSPES/homeProductor?codProductor=" + valorProductor;
}
function redirPolizaVencida(){
	bloquearPantallaGris();
	var poliza=document.getElementById("polizaProductorRechazada").value;
	var ramo=document.getElementById("ramoProductorRechazada").value;
	var sucursal=document.getElementById("sucursalProductorRechazada").value;

	location.href = "/PSPES/homePoliza?poliza="+poliza+"&ramo="+ramo+"&sucursal="+sucursal;
	}


function redireCCProductorHome()
{
	bloquearPantallaGris();
	var valorProductor = document.getElementById("valorProductor").value;
	location.href = "/PSPES/homeCCProductor?codProductor="+valorProductor;
}


function abrirModalPagosRechazadosProductor(poliza,ramo,card){
	var valorProductor=document.getElementById("valorProductor").value;
	var valorCard=card;
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'polizasRechazadasModal',
	    contentType: 'application/json', 
	    data : { ramo : ramo,productor:valorProductor},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	var card = valorCard-1;
	    	
	    	$("#polizaProductorRechazada").val(poliza);
	    	$("#ramoProductorRechazada").val(ramo);
	    	try{
	    		llenarDinamicamente(json[card]);
				$("#DATOS_MODAL_RECHAZOPROD").html("Rechazo de la p&oacute;liza#<b>" +poliza);
				$("#DATO_POLIZA_RECHAZOPROD").html("<b>" + validarCampoVacio(json[card]['P_TF_RECHAZOS_CJIP_CARP_CD_RAMO'])+" - " + validarCampoVacio(primeraLetraMayus(json[card]['P_TF_RECHAZOS_CJIP_CAPO_NU_POLIZA']))+"</b>" );
				
		    	$("#sucursalProductorRechazada").val(json[0]['P_TF_RECHAZOS_CJIP_CASU_CD_SUCURSAL']);
				$("#DATO_POLIZA_MONEDA").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_RECHAZOS_INB_MT_MONT']))+"</b>" );

				
			//Abre el modal
			$("#pagosRechazadosProductorPopUp").modal({
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
		        alert('No posee datos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function verDatosDetalleRemesaPorProductor(){
	
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'existeDetalleRemesaProductor',
	    contentType: 'application/json', 
	    
	    data : {nroProductor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		location.href="/PSPES/homeDetalleRemesaPorProductor?nroProductor="+ productor;
				
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente al verificar remesa. Error:'+e);
	    	}
    		$.unblockUI();

	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verDatosImpositivos(){
	
	var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosImpositivos',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		/*Datos generales*/
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CD_SERVICIO_SOCIAL").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CD_SERVICIO_SOCIAL'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_SERVICIO_SOCIAL']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_NU_SERVICIO_SOCIAL").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_NU_SERVICIO_SOCIAL']) +"<b>");
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_IN_ING_BRUTOS").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_IN_ING_BRUTOS'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_ING_BRUTOS']) +"<b>");
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_NU_INGRESOS_BRUTOS").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CD_SERVICIO_SOCIAL']) +"<b>");
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CJIB_CD_CLASIF_IB").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CJIB_CD_CLASIF_IB'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_CLASIF_IB']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CJIV_CD_IVA").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CJIV_CD_IVA'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_IVA']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CJCC_CD_CONC_GANANCIA").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CJCC_CD_CONC_GANANCIA'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_CONC_GANANCIA']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CJGN_CD_CONDICION").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CJGN_CD_CONDICION'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_CONDICION']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_NU_CAJAJUB").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_NU_CAJAJUB']) +"<b>");
	    		
	    		/*Tasas*/
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_RETEN_ISSS").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_RETEN_ISSS'])+ "<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_PO_RETEN_ISSS").html("<b>" +validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_PO_RETEN_ISSS']) +"<b>");
	    		
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_RETEN_IVA").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_RETEN_IVA'])+ "<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_PO_RETEN_IVA").html("<b>" +validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_PO_RETEN_IVA']) +"<b>")

	    		
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_RETEN_GANAN").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_RETEN_GANAN'])+ "<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_PO_RETEN_GANAN").html("<b>" +validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_PO_RETEN_GANAN']) +"<b>")

	    		
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_RETEN_IB").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_RETEN_IB'])+ "<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_PO_RETEN_IB").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_PO_RETEN_IB']) +"<b>")

	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_FE_RETEN_ISSS").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_FE_RETEN_ISSS']) +"<b>");

	    		
	    		//Abre el modal
				$("#impositivosProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar impositivos. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
	
}

function verDatosConvenioEsquema(){
	
	bloquearPantallaGris();

	verDatosEsquema();
	verDatosConvenio();
	
	//Abre el modal
	$("#convenioEsquemaProductorPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	$.unblockUI();

}


function verDatosEsquema(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosEsquema',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_ESQUEMA_INB_ESQUEMA").html("<b>" + validarCampoVacio(json[0]['P_TF_ESQUEMA_CAPZ_CAEQ_CD_ESQUEMA'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_ESQUEMA_INB_ESQUEMA']) +"<b>")
	    		$("#INFO_P_TF_ESQUEMA_CAPZ_FE_DESDE").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_ESQUEMA_CAPZ_FE_DESDE'])) +"<b>");
	    		$("#INFO_P_TF_ESQUEMA_CAPZ_FE_HASTA").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_ESQUEMA_CAPZ_FE_HASTA']) +"<b>"));	    		

	    		
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar esquema. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDatosConvenio(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosConvenio',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_CONVENIO_CACV_CACO_CD_CONVENIO").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACV_CACO_CD_CONVENIO'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_DE_CONVENIO']) +"<b>")
	    		$("#INFO_P_TF_CONVENIO_CACO_NU_TOLERANCIA").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_TOLERANCIA']) +"<b>");
	    		
	    		$("#INFO_P_TF_CONVENIO_CACV_FE_INICIO").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_CONVENIO_CACV_FE_INICIO'])) +"<b>");
	    		$("#INFO_P_TF_CONVENIO_CACV_FE_TERMINO").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_CONVENIO_CACV_FE_TERMINO'])) +"<b>");

	    		$("#INFO_P_TF_CONVENIO_CACO_IN_RENDICION").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_IN_RENDICION'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_INB_IN_RENDICION']) +"<b>")
	    		$("#INFO_P_TF_CONVENIO_CACO_NU_DIAREN_1").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIAREN_1'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIAREN_2'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIAREN_3'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIAREN_4']) +"<b>")
	    																
	    		$("#INFO_P_TF_CONVENIO_CACO_IN_LIQUIDACION").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_IN_LIQUIDACION'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_INB_IN_LIQUIDACION']) +"<b>")
	    		$("#INFO_P_TF_CONVENIO_CACO_NU_DIALIQ_1").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIALIQ_1'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIALIQ_2'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIALIQ_3'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIALIQ_4']) +"<b>")

		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar convenio. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDatosIntervinientes(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosIntervinientes',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#DATOS_MODAL_INTERVINIENTES_PRODUCTOR").html("Intervinientes (" + json.length + ")");
	    		
	    		dl = document.getElementById("intervinientesProductor");

    			dl.innerHTML='';
    			var cardInter='';

	    		for(var int=0; int<json.length; int++){

	    			var cardInterDetalle='';
	    			

	    			cardInterDetalle = cardInterDetalle + '<div class="row">';
	    			cardInterDetalle = cardInterDetalle + '<div class="col-md-6"'+'";>'+ "Productor&nbsp;:&nbsp;" + '<b>'+  validarCampoVacio(json[0]['P_TF_INTERVINIENTES_CAPH_CAPD_CD_PRODUCTOR_I'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_INTERVINIENTES_INB_PRODUCTOR_I'])+'</b>' + '</div>';
	    			cardInterDetalle = cardInterDetalle + '<div class="col-md-6"'+'";>'+ "Comision&nbsp;:&nbsp;" + '<b>'+  validarCampoVacio(json[0]['P_TF_INTERVINIENTES_CAPH_PO_COMISION'])+'</b>' + '</div>';
	    			cardInterDetalle = cardInterDetalle + '</div>';
					

	    			cardInter = cardInter + '<div class="timeline__post seleccionPanelB" style="width:99%;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:12px" id="numCardContacto'+ int +'">';
	    			cardInter = cardInter +  '<div class="timeline__content direccionCliente" id="panelModalSiniestroNotas'+int+'" style="overflow:hidden;">';
	    			cardInter = cardInter +  '<h5 class="datoSiniestroModal" id="notasModalSiniestro'+int+'">'+'<b>'+"Interviniente #" + int +'</b>'+'</h5>'+'<hr style="margin-top:0px;border-top: 0px solid #00317A;">'; 
	    			cardInter = cardInter +  '<h6 class="datoSiniestroModal" id="detallesIntervinientesProductor'+int+'">'+ cardInterDetalle + '</h6>'+ '</div></div>';
	    			cardInter = cardInter + '</div></div>';
	    			
	    			
	    		}
	    		
	    		dl.innerHTML = cardInter;
	    		
	    		//Abre el modal
				$("#intervinientesProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar intervinientes. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDatosFormaDePago(){
	
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosFormaDePago',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_CABA_CD_BANCO").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_CABA_CD_BANCO'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_FORMA_PAGO_INB_BANCO']) +"<b>");
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_TP_CUENTA").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_TP_CUENTA']) + "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_FORMA_PAGO_INB_TP_CUENTA']) +"<b>");
	    		
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_CD_FORMA_PAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_CD_FORMA_PAGO']) + "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_FORMA_PAGO_INB_FORMA_PAGO']) +"<b>");

	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_CABS_NU_SUC_BANCO").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_CABS_NU_SUC_BANCO'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_FORMA_PAGO_INB_SUC_BANCO']) +"<b>")
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_CADM_NU_CUENTA").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_CADM_NU_CUENTA']) +"<b>");
	    		
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_NU_CBU").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_NU_CBU'])+"<b>");
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_ST_ORDEN_CHEQUE").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_ST_ORDEN_CHEQUE']) +"<b>");
	    		
	    		
	    		
	    		//Abre el modal
				$("#formaDePagoProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar la forma de pago. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verDatosOSSEG(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosOSSEG',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		if(json.length>0){
	    			$("#INFO_P_TF_OSSEG_CAPD_NU_AFIL_OSSEG").html("<b>" + validarCampoVacio(json[0]['P_TF_OSSEG_CAPD_NU_AFIL_OSSEG']) +"<b>");
		    		$("#INFO_P_TF_OSSEG_CAPD_NU_PORC_OSSEG").html("<b>" + validarCampoVacio(json[0]['P_TF_OSSEG_CAPD_NU_PORC_OSSEG']) +"<b>");
	    			
	    			
	    		}else{
	    			$("#INFO_P_TF_OSSEG_CAPD_NU_AFIL_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    			$("#INFO_P_TF_OSSEG_CAPD_NU_PORC_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    		}
	    		
		    	$.unblockUI();

	    	} catch (e) {
	    		$("#INFO_P_TF_OSSEG_CAPD_NU_AFIL_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
    			$("#INFO_P_TF_OSSEG_CAPD_NU_PORC_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$.unblockUI();
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$("#INFO_P_TF_OSSEG_CAPD_NU_AFIL_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
			$("#INFO_P_TF_OSSEG_CAPD_NU_PORC_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$.unblockUI();
	    	},
	 
	   
	});
}

function verDatosSSN(){
	
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosSSN',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{	    		
	    		
	    		$("#INFO_P_TF_SSN_CAPD_NU_SUPERINTENDENCIA").html("<b>" + validarCampoVacio(json[0]['P_TF_SSN_CAPD_NU_SUPERINTENDENCIA'])+"<b>");
	    		$("#INFO_P_TF_SSN_CAPD_FE_NOTIF_MATRICULA").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_SSN_CAPD_FE_NOTIF_MATRICULA'])) +"<b>");
	    		
	    		$("#INFO_P_TF_SSN_CAPD_FE_PAGO_MATRICULA").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_SSN_CAPD_FE_PAGO_MATRICULA'])) +"<b>");
	    		$("#INFO_P_TF_SSN_CAPD_NU_ANIO_PAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_SSN_CAPD_NU_ANIO_PAGO']) +"<b>");

	    		$("#INFO_P_TF_SSN_CAPD_NU_SUPERINTENDENCIA_RAI").html("<b>" + validarCampoVacio(json[0]['P_TF_SSN_CAPD_NU_SUPERINTENDENCIA_RAI']) +"<b>");
	    		$("#INFO_P_TF_SSN_CAPD_FE_NOTIF_MATRICULA_RAI").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_SSN_CAPD_FE_NOTIF_MATRICULA_RAI'])) +"<b>");
	    		
	    		$("#INFO_P_TF_SSN_CAPD_FE_PAGO_MATRICULA_RAI").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_SSN_CAPD_FE_PAGO_MATRICULA_RAI']))+"<b>");
	    		$("#INFO_P_TF_SSN_CAPD_NU_ANIO_PAGO_RAI").html("<b>" + validarCampoVacio(json[0]['P_TF_SSN_CAPD_NU_ANIO_PAGO_RAI']) +"<b>");
	    		
	    		
	    		
	    		//Abre el modal
				$("#SSNProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar la SSN. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verDatosInhabilitacionesSSN(){
	
	var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosInhabilitacionesSSN',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    			    		
	    		var d1 = document.getElementById("datosInhabSSN");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	var cantInhSSN = json.length -1;
    	    	
    	    	for ( var int=0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PROD_INVALIDOS_CERP_CAUS_CD_USUARIO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_PROD_INVALIDOS_INB_DE_USUARIO'])) +'</h6></td>'+
		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PROD_INVALIDOS_CERP_NU_ORDEN']) +'</h6></td>'+
		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PROD_INVALIDOS_CERP_FE_DESDE'])) +'</h6></td>'+
		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PROD_INVALIDOS_CERP_FE_HASTA'])) +'</h6></td>'+

		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PROD_INVALIDOS_CERP_FE_ACTUALIZACION'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
	    		$("#DATO_INHAB_SSN").html("Inhabilitaciones <b>#" + productor + "</b>");
	    		
	    		$("#INFO_P_TF_PROD_INVALIDOS_INB_ESTADO").html("<b>" + validarCampoVacio(json[cantInhSSN]['P_TF_PROD_INVALIDOS_INB_ESTADO'])+ "</b>");
	    		
	    		//Abre el modal
				$("#inhabilitacionesSSNProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
				
				
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar las inhabilitaciones SSN. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verDatosHistoriaProductor(){
	
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosHistoriaProductor',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		var panelNuevo='';
	    		if(((json.organizador==null || json.organizador.length==0) && (json.productor ==null || json.productor.length==0))){
	    			throw new Error("No exite historia de organizador/productor");
	    		}
	    		
	    		$("#DATO_HISTORIA_PRODUCTOR").html(
	    				"<b>" + "Historia"+ "</b>"
	    				+ "&nbsp;&nbsp;&nbsp;&nbsp;"
	    				+"<label class='radio-inline radioButtonPorHistoria'><input type='radio' name='optradio' value='1' onclick='verHistoria(this)' checked>Por&nbsp;productor</label>"
	    				+"<label class='radio-inline radioButtonPorHistoria'><input type='radio' name='optradio' value='2' onclick='verHistoria(this)'>Por&nbsp;organizador</label>"
	    		);
	    		
    	    	
    	    	if(!(json.organizador==null || json.organizador.length==0)){
    	    		var d1 = document.getElementById("datosHistoriaOrganizador");
        	    	d1.innerHTML = ' ';
        	    	panelNuevo = '';
        	    	
        	    	for ( var int=0; int < json.organizador.length ; int++) {
        	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    		            '<td class="td-grilla-historiaOrganizador" role="cell"><h6>'+validarCampoVacio(json.organizador[int]['P_TF_HISTORIA_CAOR_CD_ORGANIZADOR']) +" - "+validarCampoVacio(primeraLetraMayus(json.organizador[int]['P_TF_HISTORIA_INB_ORGANIZADOR'])) +'</h6></td>'+
    		            '<td class="td-grilla-historiaOrganizador" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json.organizador[int]['P_TF_HISTORIA_CAOR_FE_ALTA'])) +'</h6></td>'+
    		            '<td class="td-grilla-historiaOrganizador" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json.organizador[int]['P_TF_HISTORIA_CAOR_FE_BAJA'])) +'</h6></td>'+
    		            '</tr>';
        	    	}
        	    	
        	    	d1.innerHTML = panelNuevo + '</tr>';
    	    		
        	    	
    	    	}else{

    	    		document.getElementById("idHistoriaProductor").style.display="none";    	    	
        	    	document.getElementById("idHistoriaProductorAdicional").style.display="none";   
        	    	
        	    	var dl = document.getElementById("idHistoriaOrganizadorPanel");
        	    	
        	    	dl.innerHTML = ' ';
        	    	panelNuevo='';
        	    	panelNuevo = panelNuevo + "<div id='cuadroImgVacio' style='cursor:pointer; background-color:#ffffff'>"
        	    	
        	    	+"<div class='timeline__post seleccionPanelB' id='timeLineItemVacio' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A'>" 
        	    	
        	    	+"<div class='timeline__content' style='overflow:hidden;'>"
        	    	
        	    	+"<i class='material-icons altoIcono' style='color:#205081; font-size:40px; float:left; margin-right:20px;' id='imgTimeLineVacio'>" + "&#xE611;"+"</i>"
        	    	+"<h6 style='padding-top: 15px; padding-bottom: 15px; color:#b3b0b0;'>No se encontraron datos organizador</h6"
        	    	
        	    	+"</div>"
        	    	
        	    	+"</div>";
        	    	
        	    	dl.innerHTML = panelNuevo + '</div>';        	    	
    	    	}
    	    	
    	    	if(!(json.productor==null || json.productor.length==0)){

    	    		var d12 = document.getElementById("datosHistoriaProductor");
        	    	d12.innerHTML = ' ';
        	    	panelNuevo = '';
    	    				
    	    		for(var int=0; int<json.productor.length; int++){
    	    			panelNuevo = panelNuevo +'<tr class="tr-grilla" style="cursor:pointer;"onclick="verDatosEstadoHistoriaProductor('+ int+')">'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAOR_CAPD_CD_PRODUCTOR']) +'</h6></td>'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAPD_CASU_CD_AGENCIA']) +'</h6></td>'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAPD_CAUT_CD_LUGAR']) +'</h6></td>'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAOR_CACO_CD_CONVENIO']) +'</h6></td>'+

    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAOR_CAPZ_CD_ESQUEMA']) +'</h6></td>'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAOR_CD_CATEGORIA_PRODUCTOR']) +'</h6></td>'+
    		            '</tr>';
    	    		}
        	    	d12.innerHTML = panelNuevo + '</tr>';
        	    	
        	    	var cantHistProd = json.productor.length - 1;

        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_ALTA").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_ALTA'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_MODIFICACION").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_MODIFICACION'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_PROV").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_BAJA_PROV'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_REHABILITACION").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_REHABILITACION'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_BAJA'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_DEF").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_BAJA_DEF'])) +"</b>");

        	    	
        	    	
        	    	document.getElementById("idHistoriaProductor").style.display="block";    	    	
        	    	document.getElementById("idHistoriaProductorAdicional").style.display="block";    	    	
        	    	document.getElementById("idHistoriaOrganizador").style.display="none";	  
        	    	
    	    	}else{
    	    		document.getElementById("idHistoriaProductor").style.display="none";    	    	
        	    	document.getElementById("idHistoriaProductorAdicional").style.display="none";   
        	    	
        	    	var dl = document.getElementById("idHistoriaProductor");
        	    	
        	    	dl.innerHTML = ' ';
        	    	panelNuevo='';
        	    	
        	    	panelNuevo = panelNuevo + "<div class='col-md-12' style='ext-align: left;height: 350px;overflow-y:auto;padding:0px;'>";
        	    	
        	    	panelNuevo = panelNuevo + "<div id='cuadroImgVacio' style='cursor:pointer; background-color:#ffffff'>"
        	    	
        	    	+"<div class='timeline__post seleccionPanelB' id='timeLineItemVacio' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A'>" 
        	    	
        	    	+"<div class='timeline__content' style='overflow:hidden;'>"
        	    	
        	    	+"<i class='material-icons altoIcono' style='color:#205081; font-size:40px; float:left; margin-right:20px;' id='imgTimeLineVacio'>" + "&#xE611;"+"</i>"
        	    	+"<h6 style='padding-top: 15px; padding-bottom: 15px; color:#b3b0b0;'>No se encontraron datos organizador</h6"
        	    	
        	    	+"</div>"
        	    	
        	    	+"</div>";
        	    	+"</div>";

        	    	
        	    	dl.innerHTML = panelNuevo + '</div>';  
    	    	}
  	
	    		
	    		//Abre el modal
				$("#historiaProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar la historia de productor/organizador. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verHistoria(sel){
	if(sel.value=="1"){
		
		document.getElementById("idHistoriaOrganizador").style.display="none";
		document.getElementById("idHistoriaProductor").style.display="block";
		document.getElementById("idHistoriaProductorAdicional").style.display="block";

	}
	if(sel.value=="2"){
		document.getElementById("idHistoriaOrganizador").style.display="block";
		document.getElementById("idHistoriaProductor").style.display="none";
		document.getElementById("idHistoriaProductorAdicional").style.display="none";
		
		

	}
	
}

function verChequesRechazadosProductor(){
	
	var productor = document.getElementById("valorProductor").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'datosChequesRechazados',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		 
	    		
	    		var d1 = document.getElementById("datosChequesRechazados");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int=0; int < json.chequesRechazados.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CJIN_NU_INGRESO']) +'</h6></td>'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CJCI_NU_CHEQUE']) +'</h6></td>'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CJDV_FE_STATUS'])) +'</h6></td>'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CAMO_CD_MONEDA'])+ " - " + validarCampoVacio(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_INB_MONEDA']) + '</h6></td>'+

		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_FE_ACTUALIZACION'])) +'</h6></td>'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CJCI_MT_CHEQUE'])) +'</h6></td>'+

		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
	    		
	    		$("#INFO_P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_DOLARES").html("<b>" + validarCampoVacio(formatearMoneda(json.totalCheques[0]['P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_DOLARES']))+ "</b>");
	    		$("#INFO_P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_EUROS").html("<b>" + validarCampoVacio(formatearMoneda(json.totalCheques[0]['P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_EUROS']))+ "</b>");
	    		$("#INFO_P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_PESOS").html("<b>" + validarCampoVacio(formatearMoneda(json.totalCheques[0]['P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_PESOS']))+ "</b>");

	    		//Abre el modal
				$("#chequesRechazadosProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
				
				
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar las inhabilitaciones SSN. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function mostrarBotonesProductor(){
		
	$(".mostrarBotonProductor").each(function(){
		$(this).css("display","");
		
	});
	
	$("#btnVerMasBotonesProductor").css("display", "none");
	
}

function verDatosMotivoBaja(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosMotivoBajaProductor',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		if(json.length>0){
	    			$("#INFO_CAPD_CD_MOTIVO_BAJA").html("<b style='color:#6fa1d4;'>" +validarCampoVacio(json[0]['P_TF_MOTIVO_BAJA_CAPD_CD_MOTIVO_BAJA'])+ " - "+ validarCampoVacio(json[0]['P_TF_MOTIVO_BAJA_INB_MOTIVO_BAJA']) + "</b>");
	    			$("#INFO_CAPD_CD_MOTIVO_BAJA").css("cursor", "pointer");
	    			$("#INFO_CAPD_CD_MOTIVO_BAJA").click(function(e){ 
			    		e.preventDefault();
			    	    e.stopImmediatePropagation();
			    	    verMotivoBajaProductorModal(); 
			    	});
	    		}
	    		else{
	    			$("#INFO_CAPD_CD_MOTIVO_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");

	    		}
	    		
		    	$.unblockUI();

	    	} catch (e) {
	    		$("#INFO_CAPD_CD_MOTIVO_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    		$.unblockUI();
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$("#INFO_CAPD_CD_MOTIVO_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>"); 
	    	$.unblockUI();
	    	},
	 
	   
	});
}


function verMotivoBajaProductorModal(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosMotivoBajaProductor',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_MOTIVO_BAJA_CAPD_CD_MOTIVO_BAJA").html("<b>" + validarCampoVacio(json[0]['P_TF_MOTIVO_BAJA_CAPD_CD_MOTIVO_BAJA'])+ " - "+ validarCampoVacio(primeraLetraMayus(json[0]['P_TF_MOTIVO_BAJA_INB_MOTIVO_BAJA'])) +"<b>");
	    		
	    		$("#INFO_P_TF_MOTIVO_BAJA_CAPD_OBS_CD_BAJA").html("<b>" + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_MOTIVO_BAJA_CAPD_OBS_CD_BAJA'])) +"<b>");
	    		
	    		
	    		//Abre el modal
				$("#motivoBajaProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
				
	    		
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar Motivo de baja. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDatosEstadoHistoriaProductor(numeroFila){
	
	var productor = document.getElementById("valorProductor").value;
	
	$.ajax({
	    url : 'datosEstadoHistoriaProductor',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_HISTORIA_CAOR_FE_ALTA").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_ALTA'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_MODIFICACION").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_MODIFICACION'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_PROV").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_BAJA_PROV'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_REHABILITACION").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_REHABILITACION'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_BAJA'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_DEF").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_BAJA_DEF'])) +"</b>");

	    	} catch (e) {
	    		$("#INFO_P_TF_HISTORIA_CAOR_FE_ALTA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$("#INFO_P_TF_HISTORIA_CAOR_FE_MODIFICACION").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_PROV").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$("#INFO_P_TF_HISTORIA_CAOR_FE_REHABILITACION").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_DEF").html("</b><a style='color:#bfbac2;'>Sin dato</a>");

	    	}
			
	    },
	    error : function(xhr, status) {
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_ALTA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_MODIFICACION").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_PROV").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_REHABILITACION").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");  
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_DEF").html("</b><a style='color:#bfbac2;'>Sin dato</a>");

	    	
	    },
	 
	   
	});
	
}







function datosContactoProductor(){
	bloquearPantallaGris();

	var numPersonaProd = document.getElementById("valorNumeroPersonaProd").value;

		$("#DATO_CONTACTO").html("Contacto Del Productor");
		var panelNuevo ='';
		var d1 ='';
		for ( var int = 0; int < 10; int++) {
			
		$.ajax({
		    url : 'datosContactoProductor',
		    contentType: 'application/json', 
		    
		    data : {numPersona : numPersonaProd,consecutivo:int} ,
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		
		    		if(json[0]['P_TF_DETALLE_INB_TIPO_CONTACTO'] != '' && json[0]['P_TF_DETALLE_INB_DATO_CONTACTO'] != ''){
		    		 d1 = document.getElementById("datosContactoProductor");

		    		 panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			            '<td class="td-grilla-contactoProductorHome" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_DETALLE_INB_TIPO_CONTACTO']) +'</h6></td>'+
			            '<td class="td-grilla-contactoProductorHome" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_DETALLE_INB_DATO_CONTACTO']) +'</h6></td>'+
			            '</tr>';
	    	    		
	    	    	d1.innerHTML = panelNuevo;

		    		}
				
		    	}
		    	catch(e)
		    	{
			    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
		    		
		    	}
				
		    },
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	},
		 
		   
		});
		}

		$("#datosContactoProdPopUp").modal({
			 escapeClose: false,
			  clickClose: false,
			  showClose: false,
			  fadeDuration: 400,
			  fadeDelay: 0.05
			});
		
		$.unblockUI();
		
	}



function inicioHomePromocion() {
	bloquearPantallaGris();
	
	$(document).ready(function() {
		$('.mdb-select').materialSelect();
		});
	
	var valorPromocion = document.getElementById("valorPromocion").value;
	$.ajax({
	    url : 'datoRamosTarifas',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	
	    	$.unblockUI();
	    	
	    	var selectNuevo='<option value="0">Seleccione Ramo</option>';
	    	var d1=document.getElementById("ramosPromocion");
	    	d1.innerHTML='';
	    	
	    	for ( var i = 0; i < json.length; i++) {
    	        
    	        selectNuevo += '<option '+ 'value='+ json[i].ramoDTO.codigo +' >'
    	            	        
    	        if(json[i].ramoDTO.codigo.length<2){
    	        	selectNuevo += '0'+json[i].ramoDTO.codigo;
    	        }else{
    	        	selectNuevo += json[i].ramoDTO.codigo;
    	        }
    	        
    	        selectNuevo +=' - ' + json[i].ramoDTO.descripcion +'</option>';
    	        
    	       
	    	}
	    	d1.innerHTML = selectNuevo;
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
	
}

function actualizarPromocionPorRamo(){
	bloquearPantallaGris();

	$('#textoPanelC').css("display","none");
	$('#ocultarTablaPromo').css("display","block");
	
	mostrarSelectorTarifa();
	buscarUtilizacionPromocion();
	
	
}



function mostrarSelectorTarifa(){

	var valorPromocion = document.getElementById("valorPromocion").value;
	var select = document.getElementById('ramosPromocion');
	var valorRamoSelect = select.options[select.selectedIndex].value;
	
	$.ajax({
	    url : 'datoTarifasPorRamo',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion, ramo: valorRamoSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    		

	    		    	
	    	var d2=document.getElementById("datosTarifaPromocion");
	    	d2.innerHTML='';
	    	
	    	
	    	$("#tarifaDato1").html("Campo1");
	    	$("#tarifaDato2").html("Campo2");
	    	$("#tarifaDato3").html("Campo3");
	    	$("#tarifaDato4").html("Campo4");
	    	$("#tarifaDato5").html("Campo5");
	    	$("#tarifaDato6").html("Campo6");
	    	
	    	$("#cantTarifas").html("Tarifas (0)");
	    	
	    		    	
	    	
	    	 $('#tarifasPromocion option').remove();
	    	 $('#tarifasPromocion').append(new Option("Seleccione", "0"));

	    	for(var i= 0; i< json.length;i++){
	    		$('#tarifasPromocion').append(new Option(json[i].codigo+' - '+validarCampoVacio(primeraLetraMayus(json[i].descripcion)), json[i].codigo));

	    	}
	    		$('#tarifasPromocion').materialSelect();
		    	$.unblockUI();


	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}


function buscarUtilizacionPromocion(){
	bloquearPantallaGris();

	var valorPromocion = document.getElementById("valorPromocion").value;
	
	var select = document.getElementById('ramosPromocion');
	var valorRamoSelect = select.options[select.selectedIndex].value;
	
	
	
	$.ajax({
	    url : 'datoUtilizacionPromocion',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion, ramo: valorRamoSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    		    	
	    	var d1=document.getElementById("datosUtilizacionPromocion");
	    	d1.innerHTML='';
	    	
	    	var nuevaFilaTarifa = '';
	    
	    	var d2 = document.getElementById("cantUtilPromocion");
	    	d2.innerHTML = 'Fuerza&nbsp;de&nbsp;venta&nbsp;' + '('+json.length+')';
	    	
	    	for(var int=0; int < json.length; int++){
	    		nuevaFilaTarifa += '<div  id="cuadroImgEndoso'+ int+'" class="'+'cardRelacionPromocion'+'" style="background-color:#ffffff">';
	    		nuevaFilaTarifa += '<div class="timeline__post seleccionPanelB" style="margin-bottom:10px;border-left:3px solid #611BBD;padding-bottom:5px">';	
	    		
	    		nuevaFilaTarifa += '<div class="timeline__content" style="overflow:hidden;">';	
	    		nuevaFilaTarifa += '<i class="material-icons altoIcono"  style="color:#611BBD; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;"  id="imgTimeLineEndoso$nroPoliza">&#xe7fb;</i>';	
	    		nuevaFilaTarifa += '<h6 id="datoPromocion'+int+' class="datoCertificadoCarusel">Ramo : <b>'+ json[int].ramo+' - '+ json[int].descRamo + '</b></h6>';	
	    		nuevaFilaTarifa += '<h6 id="datoProducto"'+int+'>Producto : <b>'+json[int].producto+' - '+json[int].descpProducto+'</b></h6>';	
	    		nuevaFilaTarifa += '<h6 id="datoProductor'+int+'">Productor : <b>'+json[int].nuPersona+'</b></h6>';	
	    		nuevaFilaTarifa+='</div></div></div>';
	    	}
	    	
	    	d1.innerHTML = nuevaFilaTarifa;
	    	
	    	},
	    error : function(xhr, status) {
	    	
	    	var d1=document.getElementById("datosUtilizacionPromocion");
	    	d1.innerHTML='';
	    	
	    	var nuevaFilaTarifa = '';

    		nuevaFilaTarifa += '<div  id="cuadroImgVacio" style="cursor:pointer; background-color:#ffffff" >';
    		nuevaFilaTarifa += '<div class="timeline__post seleccionPanelB" id="timeLineItemVacio" style="cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A">';
    		nuevaFilaTarifa += '<div class="timeline__content" style="overflow:hidden;">';
    		nuevaFilaTarifa += '<i class="material-icons altoIcono"  style="color:#205081; font-size:40px; float:left; margin-right:20px;"  id="imgTimeLineVacio">&#xE611;</i>';
    		nuevaFilaTarifa += '<h6 id="etiquetaVacio" style="padding-top: 15px; padding-bottom: 15px; color:#b3b0b0;">No se encontraron asignaciones de fuerza de venta</h6>';
    		nuevaFilaTarifa += '</div>';
    		nuevaFilaTarifa += '</div>';
    		nuevaFilaTarifa += '</div>';
	    	d1.innerHTML = nuevaFilaTarifa;

	    	var d2 = document.getElementById("cantUtilPromocion");
	    	d2.innerHTML = 'Fuerza&nbsp;de&nbsp;venta&nbsp;' + '(0)';
	    	
	    	$.unblockUI();
	    	
	    },
	 
	   
	});

	
}


function buscarTarifasPromocion(){
	
	var valorPromocion = document.getElementById("valorPromocion").value;
	
	var select = document.getElementById('ramosPromocion');
	var valorRamoSelect = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('tarifasPromocion');
	var valorTarifaSelect = select.options[select.selectedIndex].value;
	
	bloquearPantallaGris();
	
	
	$.ajax({
	    url : 'datoTarifasPromocion',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion, ramo: valorRamoSelect, tarifa: valorTarifaSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	
	    	buscarCamposDeTarifas(valorTarifaSelect);
	    		    	
	    	var d1=document.getElementById("datosTarifaPromocion");
	    	d1.innerHTML='';
	    	
	    	var nuevaFilaTarifa = '';
	    	
	    	var d2 = document.getElementById("cantTarifas");
	    	d2.innerHTML = 'Tarifas ' + '('+json.length+')';
	    	
	    	for(var int=0; int < json.length; int++){
	    		nuevaFilaTarifa += '<tr class="tr-grilla">';
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].feEfectiva)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].feHasta)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoUno)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoDos)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoTres)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoCuatro)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoCinco)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoSeis)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].suma)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].tasa)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="color:#0b4376;cursor:pointer;padding:0px;" role="cell" style="cursor:pointer;" onclick="verDatoTarifaVentana('+json[int].registro+');">' +'<i class="material-icons">assignment</i>'+'</td>';	

	    		
	    		nuevaFilaTarifa+='</tr>';
	    	}
	    	
	    	d1.innerHTML = nuevaFilaTarifa;
	    	
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}


function buscarCamposDeTarifas(valorTarifaSelect){
	
	$.ajax({
    url : 'datoTarifasCamposPromocion',
    contentType: 'application/json', 
    data : { tarifa: valorTarifaSelect},
    type : 'GET',
    dataType : 'json',
    success : function(json) { 	

    	$("#tarifaDato1").html(primeraLetraMayus(validarCampoVacioConVacio(json[0])));
    	$("#tarifaDato2").html(primeraLetraMayus(validarCampoVacioConVacio(json[1])));
    	$("#tarifaDato3").html(primeraLetraMayus(validarCampoVacioConVacio(json[2])));
    	$("#tarifaDato4").html(primeraLetraMayus(validarCampoVacioConVacio(json[3])));
    	$("#tarifaDato5").html(primeraLetraMayus(validarCampoVacioConVacio(json[4])));
    	$("#tarifaDato6").html(primeraLetraMayus(validarCampoVacioConVacio(json[5])));
    	
    	},
    error : function(xhr, status) {
    	$.unblockUI();
    	mostrarError(xhr['responseText']);	    },
 
   
});}
function buscarFiltroPromocionTarifas(idTablaParametricos){
	
	input = document.getElementById("inputPromocionTarifa");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}
function buscarFiltroPromocionValores(idTablaParametricos){
	
	input = document.getElementById("inputPromocionValores");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function buscarFiltroPromocionTarifas(idTablaParametricos){
	
	input = document.getElementById("inputPromocionTarifas");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function filtrarListaDatosPanel(idInput , claseAFiltrar){
	
	var datoIn = document.getElementById(idInput).value.toUpperCase();
	
	claseAFiltrar = '.'+claseAFiltrar;
	
	$(claseAFiltrar).each(function() {
			
			var dato = " ";
			$('#' + $(this).attr('id')).find('b').each(function(){	
				dato = dato + " "+ $(this)[0].innerHTML;	
			});
			
			if ((datoIn.trim() == "") || ( dato.toUpperCase().indexOf(datoIn) > -1 ) ) {
				$('#' + $(this).attr('id')).css("display", "");
			} else {
				$('#' + $(this).attr('id')).css("display", "none");
			};
	});
	

}



function abrirModalVisualizaciones(){
	
	var valorPromocion=document.getElementById("valorPromocion").value;
	
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'visualizacionesModal',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosVisualizacionesPromociones");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	
    	    	for ( var int = 0; int < json.length-1 ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CARP_CD_RAMO']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_VDPR_CARP_DE_RAMO']))+ '</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CAPU_CD_PRODUCTO']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_VDPR_CAPU_DE_PRODUCTO']))+ '</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CPP_ESQ_VISUALIZACION']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_VDPR_CPP_DE_ESQ_VISUALIZACION']))+ '</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CRCD_CD_DATO']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CRDP_CD_BIEN_ASEG']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CRTB_CD_TABLA']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_IN_VISIBLE']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CAUS_CD_USUARIO']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_FE_ACTUALIZACION']) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';

    	    	$("#DATOS_MODAL_VISUALIZACIONES_PROMOCIONES").html("Visualizacion  #<b>"+valorPromocion+ "</b>");

    	    	
    	    	
			//Abre el modal
			$("#visualizacionesPromocionesPopUp").modal({
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
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function verDatoTarifaVentana(registro){
	
	bloquearPantallaGris();
	
	
	$.ajax({
	    url : 'datoTarifaVentana',
	    contentType: 'application/json', 
	    data : { registroTarifa : registro},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
    	    	$("#CRTA_ID_REGISTRO").html("Tarifa #<b> "+json[0]["P_TF_CTDF_CTDF_CD_TARIFA"]+" - "+json[0]["P_TF_CTDF_CTDF_DE_TARIFA"]+ "</b>");
    	    	/*aca se setean los nombres de los campos */
    	    	
    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO1"] == ''){
    	    		$('#ocultarCampo1').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO1").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO1"]))+"&nbsp;:&nbsp;");
    	    	}
    	    	
    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO2"] == ''){
    	    		$('#ocultarCampo2').css('display','none');
    	    	}else{
    	    		
    	    		$("#CAMPO_CRCD_DE_DATO2").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO2"]))+"&nbsp;:&nbsp;");
    	    	}
    	    	
    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO3"] == ''){
    	    		$('#ocultarCampo3').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO3").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO3"]))+"&nbsp;:&nbsp;");
    	    	}

    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO4"] == ''){
    	    		$('#ocultarCampo4').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO4").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO4"]))+"&nbsp;:&nbsp;");
    	    	}

    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO5"] == ''){
    	    		$('#ocultarCampo5').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO5").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO5"]))+"&nbsp;:&nbsp;");
    	    	}
 
    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO6"] == ''){
    	    		$('#ocultarCampo6').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO6").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO6"]))+"&nbsp;:&nbsp;");
    	    	}

    	    	/*aca se setean el contenido del campo */
    	    	
    	    	$("#CRCD_DE_DATO1").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO1"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO1"]))+ "</b>");
    	    	$("#CRCD_DE_DATO2").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO2"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO2"]))+ "</b>");
    	    	$("#CRCD_DE_DATO3").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO3"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO3"]))+ "</b>");
    	    	$("#CRCD_DE_DATO4").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO4"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO4"]))+ "</b>");
    	    	$("#CRCD_DE_DATO5").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO5"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO5"]))+ "</b>");
    	    	$("#CRCD_DE_DATO6").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO6"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO6"]))+ "</b>");
    	    	$("#CRTA_PO_TASA").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_PO_TASA"])+"</b>");
    	    	$("#CRTA_MT_SUMA").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_MT_SUMA"])+"</b>");
    	    	$("#CTDF_IN_COBERTURA").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CTDF_IN_COBERTURA"])+"</b>");
    	    	$("#CTDF_IN_PRODUCTO").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CTDF_IN_PRODUCTO"])+"</b>");
    	    	$("#CTDF_IN_PLAN").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CTDF_IN_PLAN"])+"</b>");

    	    	
    	    	
			//Abre el modal
			$("#tarifaVentanaPopUp").modal({
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
		    	mostrarError('Error al mostrar la ventana de tarifa',e);
	    		
	    	}
	    },
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	});
	
}



function descargarExcelPromocion(promocion)
{
	var select = document.getElementById('ramosPromocion');
	var valorRamo = select.options[select.selectedIndex].value;
	
	if(valorRamo =! 0){
    promocion=escape(promocion);
    location.href = "/PSPES/descargarArchivoExcelPromocion?promocion="+promocion+"&ramo="+valorRamo;
    }
};

function inicioRemesaHome() {
	bloquearPantallaGris();
		activarCaru();
		
		shortcut.add("esc",function() {
			$( ".cerrarModalBotonHoover" ).trigger( "click" );
		})
		$.unblockUI();
}

function mostrarPanelRemesa(idPanel,idBoton)
{
	mostrarPanel(idPanel,idBoton);
};

function mostrarDetalleCancelacion(obj,numeroCard,icono, nroRemesa){
		
	bloquearPantallaGris();
	
	$.ajax({
	    url : '/PSPES/detalleCancelacionRemesa',
	    contentType: 'application/json', 
	    data : { remesa : nroRemesa  },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		
	    		$('#fechaRecuperoCancelacion').html('<b>' + validarCampoVacio(formatearFechaJson(json[numeroCard-1]['P_TF_LISTA_CJCR_FE_RECUPERO']))+'</b>');
	    		$('#moneda').html('<b>' + json[numeroCard-1]['P_TF_LISTA_INB_MONEDA'] + '</b>' + ' - ' + '<b>'+validarCampoVacio(primeraLetraMayus(json[numeroCard-1]['P_TF_LISTA_INB_DESC_MONEDA'])))+'</b>';
	    		$('#recuperadoCancelacion').html('<b>' + validarCampoVacio(formatearMoneda(json[numeroCard-1]['P_TF_LISTA_CJCR_MT_RECUPERADO'])) + '</b>');
	    		$('#comprobanteCancelacion').html('<b>' + json[numeroCard-1]['P_TF_LISTA_INB_COMPROBANTE'] + '</b>');
	    		$('#usuarioRecuperoCancelacion').html('<b>' + validarCampoVacio(primeraLetraMayus(json[numeroCard-1]['P_TF_LISTA_CJCR_CD_USUARIO_RECUPERO'])) + '</b>');
	    		$('#monedaCancelacion').html('<b>'+ validarCampoVacio(json[numeroCard-1]['P_TF_LISTA_INB_MONEDA_CANCELACION'])+ ' - ' + validarCampoVacio(primeraLetraMayus(json[numeroCard-1]['P_TF_LISTA_INB_DESC_MONEDA_CANCELACION'])) +' </b>');

	    		
	    		$(".timeline__post").each(function(){
    		 	    $(this).css("background","white");
    		 	});
    	    	
    			$('#timeLineRemesaCancelacion'+numeroCard).css("background","#bac2bb");
    			
    			document.getElementById("cancelacion").style.display = "block";
    			
	    	} catch (e) {
	    		mostrarError('Code 283 : No pudo cargar el detalle de cancelacion');
	    	}
	    	$.unblockUI();
	    	
	    	document.getElementById("panelc").style.display="block";
	    	document.getElementById("verCancelacionRemesa").style.display="none";
	    	
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('284 - Se a producido un inconveniente al obtener la cancelacion de remesa!');
	    },
	   
	});
}

function mostrarDetalleCobroSeleccionado(idPopUp, nroRemesa, numSeleccionado){
	bloquearPantallaGris();
	$.ajax({
	    url : '/PSPES/detalleCobroRemesa',
	    contentType: 'application/json', 
	    data : { remesa : nroRemesa },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		llenarDinamicamente(json[numSeleccionado]);
					$('#INFO_P_TF_LISTA_CJCI_FE_DEPOSITO').html('<b>' + validarCampoVacio(formatearFechaJson(json[numSeleccionado]['P_TF_LISTA_CJCI_FE_DEPOSITO'])) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_CAMO_CD_MONEDA').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_CAMO_CD_MONEDA']) +' - '+validarCampoVacio(primeraLetraMayus(json[numSeleccionado]['P_TF_LISTA_INB_DESC_MONEDA'])) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_MT_CHEQUE').html('<b>' + validarCampoVacio(formatearMoneda(json[numSeleccionado]['P_TF_LISTA_CJCI_MT_CHEQUE'])) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_CASU_CD_SUCURSAL').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_CASU_CD_SUCURSAL']) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_NU_CHEQUE').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_NU_CHEQUE']) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_ST_CHEQUE').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_ST_CHEQUE']) +' - '+validarCampoVacio(primeraLetraMayus(json[numSeleccionado]['P_TF_LISTA_INB_DESC_CHEQUE']))+'</b>');
					$('#INFO_P_TF_LISTA_CJCI_NU_CUENTA').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_NU_CUENTA']) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_CJMI_TP_MOVIMIENTO').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_CJMI_TP_MOVIMIENTO']) +' - ' + validarCampoVacio(primeraLetraMayus(json[numSeleccionado]['P_TF_LISTA_INB_TIPO_MOVIMIENTO']))   +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_CABA_CD_BANCO').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_CABA_CD_BANCO']) +' - ' +validarCampoVacio(primeraLetraMayus(json[numSeleccionado]['P_TF_LISTA_INB_DSP_BANCO']))   +'</b>');
					
					$('#INFO_NUM_COBRO').html('Cobro '+ '<b>#' + numSeleccionado + '</b>');
					
	    			abrirPopUpNuevo(idPopUp);	

	    	} catch (e) {
	    		alert('Code 821 : No pudo cargar.');
	    	}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('822 - Se a producido un inconveniente al cargar los cobros de la remesa!');
	    },
	   
	});
		
}

function verDetalleCobroTablaRemesa(nroRemesa){
	bloquearPantallaGris();
	$.ajax({
	    url : '/PSPES/detalleCobroRemesa',
	    contentType: 'application/json', 
	   
	    data : {remesa :nroRemesa} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{

	    		var data=[];
    	    	for ( var i = 0; i <= json.length; i++) {
    	    	        var d = (data[i] = {});
    	    	        d["id"] =  ''+i;
    	    	        d["montoCheque"] =  json[0]['P_TF_LISTA_CJCI_MT_CHEQUE'];
    	    	        d["estadoCheque"] = json[0]['P_TF_LISTA_CJCI_ST_CHEQUE'];
    	    	        d["fechaDeposito"] = json[0]['P_TF_LISTA_CJCI_FE_DEPOSITO'];
    	    	}
    	    	
    	    	document.getElementById("verDetalleCobroRemesa").style.display="none";
	    		document.getElementById("tablaCobroRemesa").style.display="block";

	    		completarDetalleTablaCobros(data,nroRemesa);
				
	    	} catch (e) {
		    	$.unblockUI();
	    		alert('Code: 372 - Se genero un inconveniente al cargar la lista de cobro. Error:'+e);
	    	}
        	$.unblockUI();
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	 alert('Code: 373 - ' + xhr['responseText']);	    },
	 
	   
	});
	
}

//variable local a la funcion completarDetalleTablaCertificados
var buscarFiltroRemesa="";
var dataView;
var grid;
function completarDetalleTablaCobros(data, nroRemesa){
	var columns = [
		       	{id: "id", name: "#", field: "id",  cssClass: "cell-title", selectable: false, resizable: false},
	       	    {id: "montoCheque", name: "Monto", field: "montoCheque",  width:120, cssClass: "cell-title", selectable: false, resizable: false},
	       	    {id: "estadoCheque", name: "Estado", field: "estadoCheque", width:120,  selectable: false, resizable: false},
	       	    {id: "fechaDeposito", name: "Fecha deposito", field: "fechaDeposito", width:190,  selectable: false, resizable: false}
	       	];

	       	var options = {
	       	    editable: true,
	       	    enableAddRow: false,
	       	    enableCellNavigation: true,
	       	    asyncEditorLoading: false,
	       	    fullWidthRows:true,
	       	    rowHeight: 25
	       	};
	       	
	      //inicializo la grilla
	        dataView = new Slick.Data.DataView({ inlineFilters: true });
	        dataView.beginUpdate();
	        dataView.setItems(data, "id");
	        dataView.setFilter(myFilterRemesa);
	        dataView.endUpdate();
	        
	        // inicializo la grilla
	        grid = new Slick.Grid("#grillaCobroRemesa", dataView, columns, options);
	 	
	    grid.onClick.subscribe(function (e) {
	    	
	        var cell = grid.getCellFromEvent(e);
	        
	        var row = cell.row;
	        var row_values = dataView.getItem(row);
	        mostrarDetalleCobroSeleccionado('cobroRemesaPopUp',nroRemesa,row_values.id);
	    	
	    });
	    
	    dataView.onRowCountChanged.subscribe(function (e, args) {
	    	grid.updateRowCount();
	    	grid.render();
	    });

	    dataView.onRowsChanged.subscribe(function (e, args) {
	    	grid.invalidateRows(args.rows);
	    	grid.render();
	    });
	  
	    $("#inputBusquedaCobro").keyup(function (e) {
	        Slick.GlobalEditorLock.cancelCurrentEdit();

	        // clear on Esc
	        if (e.which == 27) {
	          this.value = "";
	        }

	        buscarFiltroRemesa = this.value.toUpperCase();
	        updateFilterRemesa();

	     });
	    
	    //Modifico tamanio del scroll slickviewport
	    document.getElementById("idSlickViewport").style.height = "140px";
	    
	    var x = document.getElementsByClassName("slick-header-column");
	    /*Se cambia el tamanio del encabezado de tabla de header certificados*/
	    for(var i = 0; i<4; i++){
		    x[i].style.height="20px";
		    
	    }
	    for(var j = 0; j<5; j++){
	    	document.getElementsByClassName("ui-state-default")[j].style.backgroundColor = "#00317A";
	    }
	    
}

function updateFilterRemesa() {
    dataView.setFilterArgs({
      searchString: buscarFiltroCertificado
    });
    dataView.refresh();
}

function myFilterRemesa(item) {

    if (buscarFiltroCertificado != "" && item["id"].indexOf(buscarFiltroCertificado) == -1
        && item["montoCheque"].indexOf(buscarFiltroCertificado) == -1
        && item["estadoCheque"].indexOf(buscarFiltroCertificado) == -1
        && item["fechaDeposito"].indexOf(buscarFiltroCertificado) == -1) {
        return false;
    }

    if (item.parent != null) {
        var parent = data[item.parent];

        while (parent) {
            if (parent._collapsed ||
                (buscarFiltroCertificado != "" && parent["id"].indexOf(buscarFiltroCertificado) == -1
                    && parent["montoCheque"].indexOf(buscarFiltroCertificado) == -1
                    && parent["estadoCheque"].indexOf(buscarFiltroCertificado) == -1
                    && parent["fechaDeposito"].indexOf(buscarFiltroCertificado) == -1)) {
                return false;
            }

            parent = data[parent.parent];
        }
    }

    return true;
}

function buscadorPanelCCobroRemesa() {
	  // Declare variables 
	  var input, filter;
	  input = document.getElementById("inputBusquedaCobro");
	  filter = input.value.toUpperCase();
	  
	  
	  $(".datoCobroCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoCobro", "micaruB");
		  var idEncabezado = idH6.replace("datoCobro", "nroCobro");
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idEncabezado).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  
}

function irRemesaHome(){
	
	var nroRemesa = document.getElementById("valorRemesa").value;
	location.href = "/PSPES/homeRemesa?remesa="+ nroRemesa;
}

function mostrarDetalleRemesa(timeLineRemesaSaldo,numeroCard,icono, nroRemesa){
	document.getElementById("valorRemesa").value = nroRemesa;

	bloquearPantallaGris();
	
	$.ajax({
	    url : '/PSPES/detalleRemesa',
	    contentType: 'application/json', 
	   
	    data : {remesa :nroRemesa} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{
    	    	for(var i=0; i<json.length; i++){
    	    		$('#INFO_P_TF_LISTA_CJIN_COTC_CD_MEDIO_PAGO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_COTC_CD_MEDIO_PAGO']) + ' - '+ primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_MPAGO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_MT_TOTAL').html('<b>' + formatearMoneda(validarCampoVacio(json[0]['P_TF_LISTA_CJIN_MT_TOTAL'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_ST_ESTADO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_ST_ESTADO']) + ' - '+ primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_ESTADO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_INB_DSP_TIPO_INGRESO_DESC').html('<b>' + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DSP_TIPO_INGRESO_DESC'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_CD_USUARIO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_CD_USUARIO']) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_FE_COBRO').html('<b>' + validarCampoVacio(formatearFechaJson(json[0]['P_TF_LISTA_CJIN_FE_COBRO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_DE_CONCEPTO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_DE_CONCEPTO']) + '</b>');
    	    		
    	    		$('#INFO_P_TF_LISTA_CJIN_CD_COBRO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_CD_COBRO']) + ' - ' + validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_TIPO_COBRO'])+ '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_MT_SALDO').html('<b>' + formatearMoneda(validarCampoVacio(json[0]['P_TF_LISTA_CJIN_MT_SALDO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_CAMO_CD_MONEDA').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_CAMO_CD_MONEDA']) + ' - '+ primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_MONEDA'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_CJOI_CD_ORIGEN').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_COTC_CD_ORIGEN']) + ' - '+ validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_ORIGEN']) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_FE_INGRESO').html('<b>' + validarCampoVacio(formatearFechaJson(json[0]['P_TF_LISTA_CJIN_FE_INGRESO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_FE_ACTUALIZACION').html('<b>' + validarCampoVacio(formatearFechaJson(json[0]['P_TF_LISTA_CJIN_FE_ACTUALIZACION'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_INB_DESC_PRODUCTOR').html('<b>' + validarCampoVacio(json[0]['P_P_TF_LISTA_INB_DESC_PRODUCTOR']) + '</b>');

    	    	}
    	    	    	    	
    	    	$(".seleccionPanelB").each(function(){
    		 	    $(this).css("background","white");
    		 	});
    			$(".timeline__date").each(function(){
    		 	    $(this).css("background","white");
    		 	});
    			
    			
    			$('#'+timeLineRemesaSaldo+numeroCard).css("background","#bac2bb");
    	    	
    	    	$('#panelDetalleRemesa').show();
    	    	document.getElementById("seleccionRemesa").style.display="none";
	    		$('#verDetalleRemesa').show();	    		

				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Code: 398 - Se genero un inconveniente al cargar el detalle de la remesa. Error:'+e);
	    	}
        	$.unblockUI();
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	 mostrarError('Code: 397 - ' + xhr['responseText']);	    },
	 
	   
	});
	
	
}

function verDatosRemesaUnificada(){
	var comprobante = document.getElementById("nroComprobanteRemesa").value;
	bloquearPantallaGris();
	
	$.ajax({
	    url : '/PSPES/detalleRemesaUnificada',
	    contentType: 'application/json', 
	   
	    data : {comprobante:comprobante} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{
    	    	    	    	
    	    	var dl = document.getElementById("valorComprobantesRemesa");
    	    	dl.innerHTML = '';
    	    	
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length && int<100 ; int++) {
    	    		
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-comprobante" role="cell">'+'#'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_COMPROBANTE'])) +'</td>'+
		            '<td class="td-comprobante" role="cell">'+validarCampoVacio(json[int]['P_TF_LISTA_INB_CD_USUARIO_RECUPERO']) +'</td>'+
		            '<td class="td-comprobante" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_INB_MT_RECUPERADO'])) +'</td>'+
		            '<td class="td-comprobante" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_INB_FE_RECUPERO'])) +'</td>'+
		            '</tr>';
    	    		
    	    	}
    	    	dl.innerHTML = panelNuevo ; 
    	    	$("#DATOS_COMPROBANTES").html("Comprobantes");
    	    	
    	    	//Abre el modal
    			$("#comprobantesRemesaPopUp").modal({
    				 escapeClose: false,
    				  clickClose: false,
    				  showClose: false,
    				  fadeDuration: 400,
    				  fadeDelay: 0.05
    				});
    			
				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Code: 458 - Se genero un inconveniente al cargar los datos de la remesa unificada. Error:'+e);
	    	}
        	$.unblockUI();
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	 mostrarWarning('Code: 457 - ' + xhr['responseText']);	    },
	   
	});
	
}function buscadorPanelModalNotasJuicio() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaSiniestroModalJuicio");
	  filter = input.value.toUpperCase();
	
	  $(".datoJuicioModalNotas").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("notasModalJuiciosFiltro", "panelModalSiniestroNotasJuicio");
		  var idCardParteB = idH6.replace("notasModalJuiciosFiltro", "panelModalSiniestroNotasJuicio");
		  
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





function buscadorPanelCEntidadJuicio() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaJuicio");
	  filter = input.value.toUpperCase();
	
	  $(".datoJuicio").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoSentencia", "micaruB");
		  var idCardParteB = idH6.replace("datoSentencia", "nroSentencia");
		  
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




function inicioJuicioHome() {
	bloquearPantallaGris();
	activarCaru();
	$( "#timeLineItemJuicio1" ).trigger( "click" );
	
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
	
	})
	$.unblockUI();
}

function mostrarJuiciosHome(obj,num,icono,juicio,ramo){

	bloquearPantallaGris();
	$("#juicioValor").val(juicio);
	$.ajax({
	    url : 'datosDetalleJuicio',
	    contentType: 'application/json', 
	    data : {juicio:juicio} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	$("#ordenValor").val(json[0]['P_TF_DETALLE_RAJ_INB_NU_TERCERO']);
	    	llenarDinamicamente(json[0]);
	    	//panel D sin expandir
			$("#DATO_P_TF_DETALLE_RAJ_POLIZA").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SISJ_SISI_NU_ANNIO']) +" - "+json[0]['P_TF_DETALLE_RAJ_SIJU_CARP_CD_RAMO'] + " - "+ json[0]['P_TF_DETALLE_RAJ_POLIZA']+ "</b>");
			$("#DATO_P_TF_DETALLE_FECHA_VIGENCIA").html("<b> " + validarCampoVacio(formatearFechaJson(json[0]['P_TF_DETALLE_RAJ_FE_VIG_DESDE'])) +" - "+validarCampoVacio(formatearFechaJson(json[0]['P_TF_DETALLE_RAJ_FE_VIG_HASTA']))+ "</b>");
			$("#DATO_P_TF_DETALLE_SUB_SINIESTRO").html("<b> " + json[0]['P_TF_DETALLE_RAJ_SUBSINIESTRO'] +" - "+json[0]['P_TF_DETALLE_RAJ_SINIESTRO']+ "</b>");
			$("#DATO_P_TF_DETALLE_FUERO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SIJU_SIJF_CD_FUERO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_FUERO']))+ "</b>");
			$("#DATO_P_TF_DETALLE_ESTUDIO_CARGO").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_SIEC_CD_ESTUDIO'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_ESTUDIO']))+ "</b>");
			$("#DATO_P_TF_DETALLE_ESTUDIO_ORIGEN").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_SIEC_CD_ESTUDIO_ORIG'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_ESTUDIO_ORIG']))+ "</b>");
			$("#DATO_P_TF_DETALLE_ACTUACION").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_TP_ACTUACION'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_TIPO_ACT_JUDICIAL']))+ "</b>");
			$("#DATO_P_TF_DETALLE_HECHO_GEN").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_INB_CD_HECHO_GENERADOR'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DESC_COB']))+ "</b>");
			$("#DATO_TERCERO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_INB_NU_TERCERO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DESC_TERCERO']))+ "</b>");
			$("#DATO_PANEL_B_TERCERO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_INB_NU_TERCERO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DESC_TERCERO']))+ "</b>");

			

			
			//panel D expandido
	
			$("#DATO_PANEL_B_P_TF_DETALLE_RAJ_POLIZA").html("<b> " + json[0]['P_TF_DETALLE_RAJ_SISJ_SISI_NU_ANNIO'] +" - "+json[0]['P_TF_DETALLE_RAJ_SIJU_CARP_CD_RAMO'] + " - "+ json[0]['P_TF_DETALLE_RAJ_POLIZA']+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_FECHA_VIGENCIA").html("<b> " + validarCampoVacio(formatearFechaJson(json[0]['P_TF_DETALLE_RAJ_FE_VIG_DESDE'])) +" - "+validarCampoVacio(formatearFechaJson(json[0]['P_TF_DETALLE_RAJ_FE_VIG_HASTA']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_SUB_SINIESTRO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SUBSINIESTRO']) +" - "+validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SINIESTRO'])+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_FUERO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SIJU_SIJF_CD_FUERO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_FUERO']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_ESTUDIO_CARGO").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_SIEC_CD_ESTUDIO'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_ESTUDIO']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_ESTUDIO_ORIGEN").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_SIEC_CD_ESTUDIO_ORIG'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_ESTUDIO_ORIG']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_ACTUACION").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_TP_ACTUACION'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_TIPO_ACT_JUDICIAL']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_HECHO_GEN").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_INB_CD_HECHO_GENERADOR'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DESC_COB']))+ "</b>");

			
			
			
	//muestra el panel D
		$('#panelb').hide();
		$('#panela').show();
		$('#panelDetalleJuicio').show();
		$('#verMasPanelA').text('Ver mas');

		
		
		$(".seleccionPanelB").each(function(){
	 	    $(this).css("background","white");
	 	});
		$('#'+obj+num).css("background","#bac2bb");
		
		$('#labelPanelDetalleJuicio').html("Juicio RAJ #"+ juicio);
		
		var d1 = document.getElementById("panelImagenJuicio");
		d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
    	}
    catch(e){
    	mostrarError('Error (5467) generado por : '+e);
    	}
  //ARRANCA EL PANEL C JSON
	
	$.ajax({
	    url : 'datosSentenciasJuicio',
	    contentType: 'application/json', 
	    data : { juicio : juicio, ramo : ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
				
	    		$('#cantidadSentencias').text("Transacciones / Sentencias (" + json.length + ")");	    	    	
    	    	$('#cantidadSentencias').parent().next().find('i:first').remove();
    	    	$('#cantidadSentencias').parent().next().append('<i class="material-icons altoIcono"  style="color:#271765;padding-top:15px;" >&#xE02f;</i>');
    	    	$("#caruMayor").attr("style","text-align:left;padding-left:30px;padding-right:30px;width:100%");
    	    	var d1 = document.getElementById("caruMayor");
    	    	d1.innerHTML = ' ';
    	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px">';
    	    	  
    	    	for ( var int = 0; int < json.length; int++) {
    	    	
    	    		var num=int+1;
    	    		var popUp= "'inspeccionesPopUp'";
    	    		var nroInsp= 'nroSentencia'+num;
    	    		var DatoInsp= 'datoSentencia'+num;
    	    		

    	    		
               		
    	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'" onClick="abrirPopUpSentenciasJuiciosHome('+juicio+','+ramo+','+int+');" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#271765; border-style: solid; box-shadow: 0 0 0px black;">'
    	    		+'<h6 id='+nroInsp+' style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#271765;color:#ffffff;">Orden #'+json[int]['P_TF_SENTENCIA_SISE_NU_ORDEN']+' </h6>'
    	    		+'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoJuicio"><b>'+formatearFechaJson(json[int]['P_TF_SENTENCIA_SISE_FE_SENTENCIA_ORIG'])+'</b></h6>' 
    	    		+'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoJuicio">Monto : <b>'+json[int]['P_TF_SENTENCIA_SISE_MTO_SENTENCIA_ORIG']+'</b></h6>' 
    	    		+'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoJuicio"><b>'+primeraLetraMayus(json[int]['P_TF_SENTENCIA_DSP_CD_SENTENCIA'])+'</b></h6><br></div>';
	    	    	    	    	 	    	
    	    	}
    	    	d1.innerHTML = caruNuevo ;  
	    	
    	    	activarCaru();
    	    	} catch (e) {
    	    		mostrarError('Disculpe, existio un problema codigo:11113',e);	     
    	    	}	        	    	
    	    	$.unblockUI();
    	    },
    		 
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	    	$('#cantidadSentencias').text("Transacciones / Sentencias");	    	    	
    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;width:100%;");
    	        document.getElementById("micaru").innerHTML = request.responseText; 
    	    	
    	       },
    	   
    	   });
	    	
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    }
	});
}



function abrirPopUpSentenciasJuiciosHome(juicio,ramo,numeroCard){
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosSentenciasJuicio',
	    contentType: 'application/json', 
	    data : { juicio : juicio, ramo : ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[numeroCard]);

			$("#DATO_SENTENCIA").html("<b>Orden #" + json[numeroCard]['P_TF_SENTENCIA_SISE_NU_ORDEN']+"</b>" );
			$("#DATO_SINIESTRO").html("<b>" + json[numeroCard]['P_TF_SENTENCIA_SISE_SISI_NU_ANNIO']+" - " + json[numeroCard]['P_TF_SENTENCIA_SISE_SISI_CD_RAMO']+" - " + json[numeroCard]['P_TF_SENTENCIA_SISE_SISI_NU_SINIESTRO']+"</b>" );

			//Abre el modal
			$("#sentenciasPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos del productor',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};





function abrirModalNotasJuicio(){
	
	var valorJuicio=document.getElementById("juicioValor").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosNotasModalJuicio',
	    contentType: 'application/json', 
	    data : { juicio : valorJuicio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	
			$("#DATOS_MODAL").html("Notas Del Juicio RAJ #<b>" + valorJuicio + "</b>");
	    	var d1 = document.getElementById("datosModalJuicio");
	    	d1.innerHTML = ' ';
    		
	    	var panelNuevo = '<div style="height:300px;overflow-y:auto;"><table  style= "width:100%;">';
	    	for ( var int = 0; int < json.length; int++) {
	    		
	    		panelNuevo = panelNuevo + '<div class="timeline__post seleccionPanelB" style="width:99%;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:12px">' +
	    								  '<div class="timeline__content" id="panelModalSiniestroNotasJuicio'+int+'" style="overflow:hidden;">'+
	    								  '<h6 class="datoJuicioModalNotas" id="notasModalJuiciosFiltro'+int+'">'+formatearFechaJson(json[int]['P_TF_NOTA_SIJN_FE_NOTA'])+' -- '+ primeraLetraMayus(json[int]['P_TF_NOTA_SIJN_CD_USUARIO']) +'</h6><h6 class="datoSiniestroModal" id="notasModalJuiciosFiltro'+int+'"><b>'+primeraLetraMayus(json[int]['P_TF_NOTA_SIJN_DESC_NOTA'])+'.</b></h6></div></div>';
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



function abrirModalDatosModificacionesJuicio(){
	
	var valorJuicio=document.getElementById("juicioValor").value;
	var valorOrden=document.getElementById("ordenValor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosParametricosJuicio',
	    contentType: 'application/json', 
	    data : { juicio : valorJuicio, orden : valorOrden},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosModificacionesJuicio");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '<div class="row" id="datosModificacionesJuicio">';
    	    	
    	    	for ( var int = 0; int < json.length; int++) {
    	    		panelNuevo = panelNuevo +'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px"><table  style= "width:100%;">'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Mediaci&oacute;n :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_SIJH_SIJH_SIJU_MEDIACION']) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Est. Deman. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_SIJH_SIJH_SIJU_ESTADO_DEMANDA']) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Monto Deman. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_SIJH_SIJH_SIJU_MTO_DEMANDA_ORIG'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fecha. Estado :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+(formatearFechaJson(json[int]['P_TF_SIJH_SIJH_SIJU_FE_ESTADO_DEMANDA'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Cod. Riesgo :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio((json[int]['P_TF_SIJH_SIJH_SIJU_SIRJ_CD_RIESGO'])) +'</b></h6></td></tr></table></div>'+
    	    		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px"><table  style= "width:100%;">'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Usuario :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_SIJH_SIJH_CAUS_CD_USUARIO'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fecha Act. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_SIJH_SIJH_FE_ACTUALIZACION'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Estudio :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_SIJH_SIJH_SIEC_CD_ESTUDIO'])) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_SIJH_DESC_ESTUDIO'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fe. Efectiva. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_SIJH_SIJH_FE_EFECTIVA'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fe. Baja :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_SIJH_SIJH_SIJU_FE_BAJA'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Cod. Baja :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_SIJH_SIJH_SIJU_CD_MOTIVO_BAJA']) +'</b></h6></td></tr></table></div>'+
					'<hr style="margin-top:5px;margin-bottom:5px;width:100%;">';
    	    	}
    	    	d1.innerHTML = panelNuevo
    	    	$("#DATO_MODIFICACIONES").html("Modificaciones Juicio<b> #" + valorJuicio +"</b>");

			//Abre el modal
			$("#datosModificacionesJuicioPopUp").modal({
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
		        alert('No posee datos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};





function abrirModalEmbargosJuicio(){
	
	var valorJuicio=document.getElementById("juicioValor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosEmbargos',
	    contentType: 'application/json', 
	    data : { juicio : valorJuicio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		llenarDinamicamente(json[0]);
				$("#DATOS_MODAL_EMBARGOS").html("Embargo #<b>" + json[0]['P_TF_DEJU_DEJU_NU_EMBARGO'] +"</b> del juicio <b>#"+valorJuicio+"</b>");
				$("#DATO_BANCO").html("<b>" + validarCampoVacio(json[0]['P_TF_DEJU_DEJU_CABA_CD_BANCO'])+" - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DEJU_DE_BANCO']))+"</b>" );
				$("#DATO_DETALLE").html("<b>" + validarCampoVacio(json[0]['P_TF_DEJU_DEJU_TP_DETALLE'])+" - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DEJU_DE_TP_DETALLE']))+"</b>" );
				$("#DATO_MONTO").html("<b>$" + validarCampoVacio(json[0]['P_TF_DEJU_DEJU_MT_OPE_EMBARGO']) +"</b>");
				$("#DATO_CUENTA").html("<b>" + validarCampoVacio(json[0]['P_TF_DEJU_DEJU_CJCB_NU_CUENTA']) +"</b>");
				
				
				
				
			//Abre el modal
			$("#embargosJuicioPopUp").modal({
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
		        alert('No posee datos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};





function abrirModalDatosParametricosJuicio(){
	
	var valorJuicio=document.getElementById("juicioValor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosParametricos',
	    contentType: 'application/json', 
	    data : { juicio : valorJuicio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosParametricosJuicio");
    	    	d1.innerHTML = ' ';
	    		
    	    	var panelNuevo = '<div style="height:150px;overflow-y:auto;"><table  style= "width:100%;">';
    	    	for ( var int = 0; int < json.length; int++) {
    	    		panelNuevo = panelNuevo + '<tr><td align="right"  valign="top" style="width:47%;padding-top:5px;"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_DETALLE_SIJD_DESC_DATO'])) +' : </td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_DETALLE_SIJD_SIJD_CRPD_DATO']))+'.</b></h6></td></tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</div>';  
				
    	    	
    	    	$("#DATOS_MODAL_PARAMAMETRICOS").html("Datos Param. Juicio RAJ #<b>" + valorJuicio + "</b>");
    			    	
			//Abre el modal
			$("#datosParametricosJuicioPopUp").modal({
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
		        alert('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function buscadorPanelCEntidadPago() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaPago");
	  filter = input.value.toUpperCase();
	
	  $(".datoPagoCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoConcep", "micaruB");
		  var idEncabezado = idH6.replace("datoConcep", "nroConcep");
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idEncabezado).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  

	}









function mostrarDetallePagoHome(obj,num,icono,compromiso){

	bloquearPantallaGris();
	$("#valorNumeroCompromiso").val(compromiso);
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosListaPagos',
	    contentType: 'application/json', 
	    data : {compromiso:compromiso} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);
			$("#DATO_SECTOR").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_CD_DEPARTAMENTO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_DE_DEPARTAMENTO']))+ "</b>");
			$("#DATO_EGRESO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_CD_EGRESO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_DE_TIPO_EGRESO']))+ "</b>");
			$("#DATO_MONEDA").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_SIGNO_MONEDA']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_INB_MONEDA']))+ "</b>");
			$("#DATO_DOCUMENTO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_TP_DOCUMENTO']) +" - "+validarCampoVacio(json[0]['P_TF_DETA_CJCR_NU_DOCUMENTO'])+ "</b>");
			$("#DATO_PAGO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_CD_FORMA_PAGO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_DE_FORMA_PAGO']))+ "</b>");
			$("#DATO_BANCO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_CABA_CD_BANCO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_DE_BANCO']))+ "</b>");
			$("#DATO_OBS").html("<b onclick=\"swal('Observaciones','"+primeraLetraMayus(json[0]['P_TF_DETA_CJCR_OBSERVACIONES'])+"','warning');\"> " + validarCampoVacio(campoObs(json[0]['P_TF_DETA_CJCR_OBSERVACIONES'])) +"</b>");
	//muestra el panel D
		$('#panelb').hide();
		$('#panela').show();
		$('#panelDetallePago').show();
		$('#verMasPanelA').text('Ver mas');

		
		
		$(".seleccionPanelB").each(function(){
	 	    $(this).css("background","white");
	 	});
		$('#'+obj+num).css("background","#bac2bb");
		
		$('#labelPanelDetallePago').html("Compromiso #"+ compromiso);
		
		var d1 = document.getElementById("panelImagenDetalle");
		d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#271765;">'+icono+'</i>';
    	}
    catch(e){
    		alert('Error (5467) generado por : '+e);
    	}
  //ARRANCA EL PANEL C JSON
    
    
	$.ajax({
	    url : 'datosConceptos',
	    contentType: 'application/json', 
	    data : {compromiso:compromiso} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
				
	    		$('#cantidadConceptos').text("Conceptos (" + json.length + ")");	    	    	
    	    	$('#cantidadConceptos').parent().next().find('i:first').remove();
    	    	$('#cantidadConceptos').parent().next().append('<i class="material-icons altoIcono"  style="color:#271765;padding-top:15px;" >&#xE02f;</i>');
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");
    	    	var d1 = document.getElementById("caruMayor");
    	    	d1.innerHTML = ' ';
    	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
    	    	  
    	    	for ( var int = 0; int < json.length; int++) {
    	    	
    	    		var num=int+1;
    	    		var nroInsp= 'nroConcep'+num;
    	    		var DatoInsp= 'datoConcep'+num;
    	    		
    	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'"  class="item" style="height:105px; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#271765; border-style: solid; box-shadow: 0 0 0px black;">'+
    	    		'<h6 id='+nroInsp+' style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#271765;color:#ffffff;">Concepto #'+json[int]['P_TF_CONCEPTOS_CJOC_CD_CONCEPTO']+'</h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel"><b>'+primeraLetraMayus(json[int]['P_TF_CONCEPTOS_DE_CONCEPTO'])+'</b></h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel">Neto : <b>'+formatearMoneda(json[int]['P_TF_CONCEPTOS_CJOC_MT_NETO'])+'</b></h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel">Bruto : <b>'+formatearMoneda(json[int]['P_TF_CONCEPTOS_CJOC_MT_BRUTO'])+'</b></h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel">Ret. Iva. : <b>'+formatearMoneda(json[int]['P_TF_CONCEPTOS_CJOC_RET_IVA'])+'</b></h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel">Iva : <b>'+json[int]['P_TF_CONCEPTOS_CJOC_RET_IVA']+'</b></h6><br></div>';
	    	    	
    	    	}
    	    	d1.innerHTML = caruNuevo;  
	    	
    	    	activarCaru();
    	    	} catch (e) {
    	    		alert('Disculpe, existio un problema codigo:11113',e);	     
    	    	}	        	    	
    	    	$.unblockUI();
    	    },
    		 
    	    // c�digo a ejecutar si la petici�n falla;
    	    // son pasados como argumentos a la funci�n
    	    // el objeto de la petici�n en crudo y c�digo de estatus de la petici�n
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	    	$('#cantidadConceptos').text("Conceptos");	    	    	
    	    	$('#cantidadConceptos').parent().next().find('i:first').remove();
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");
    	        document.getElementById("micaru").innerHTML = request.responseText; 
    	    	
    	       },
    	   
    	   });
    
    
    
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError('Disculpe, no existen detales del pago');
	    }
	});
}


function mostrarPanelD(idPanelA,idPanelB,idBoton)
{
	if( $('#'+idPanelB).is(":visible") ){
		$('#'+idPanelB).hide();
		$('#'+idBoton).text('Ver menos');

	}else{
		$('#'+idPanelB).show();
		$('#'+idBoton).text('Ver mas');
		
	}
};



function inicioPagoHome() {
	bloquearPantallaGris();
	activarCaru();
	$( "#timeLineItemPago1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
	})
	
	$.unblockUI();

}


function abrirModalCronograma(){
	
	var valorCompromiso=document.getElementById("valorNumeroCompromiso").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosCronograma',
	    contentType: 'application/json', 
	    data : { compromiso : valorCompromiso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);	
	    	$("#DATO_CRONOGRAMA").html("Cronograma del Compromiso <b> #" +valorCompromiso+ "</b>");
	    	$("#DATO_MONEDA_CRON").html("<b>" +validarCampoVacio(json[0]['P_TF_CRON_CJPA_CAMO_CD_MONEDA'])+ " - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_CRON_W_DESC_MONEDA']))+" </b>");
	    	$("#DATO_IMPORTE").html("<b> " +validarCampoVacio(formatearMoneda(json[0]['P_TF_CRON_CJPA_MT_IMPORTE_ORIGINAL']))+ "</b>");
	    	$("#DATO_PAGO_CRON").html("<b> " +validarCampoVacio(formatearMoneda(json[0]['P_TF_CRON_CJPA_MT_MONEDA_PAGO']))+ "</b>");
	    	
	    	
	    	
			//Abre el modal
			$("#cronogramaPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Error : 553453. Se produjo un inconveniente al cargar los datos del cronograma',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	   
	    	 },
	 
	   
	});
	

};

function campoObs(campo){
	try {
		if(campo.length> 20 && campo != ""){
			campo = campo.replace("  ", " ");
			campo = "<h6 style='color:#6fa1d4'><b>" +campo.substring(0,20) + "....</b></h6>";;
		}
	} catch (e) {
		// TODO: handle exception
	}
	return campo;
}


function buscadorPanelCEntidadReserva() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaReserva");
	  filter = input.value.toUpperCase();
	
	  $(".datoReservaCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoReserva", "micaruB");
		  var idEncabezado = idH6.replace("datoReserva", "nroReserva");
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idEncabezado).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  

	}



function abrirPopUpMovimientoReservaHome(numeroCard){
	bloquearPantallaGris();
	
	var valorSiniestro=document.getElementById("valorSiniestroReservaHome").value;
	var valorRamo=document.getElementById("valorRamoReservaHome").value;
	var annio=document.getElementById("valorAnnioSiniestroHome").value;
	
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosMovimientoReservas',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, ramo : valorRamo,annio:annio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	numeroCard = numeroCard - "1";
	    	llenarDinamicamente(json[numeroCard]);

			$("#DATO_MOVIMIENTO").html("Movimiento <b>#" + formatearFechaJson(json[numeroCard]['P_TF_LISTA_SMCC_SIMS_FE_MOVIMIENTO'])+"</b>" );
			$("#DATO_POLIZA").html("<b>" + json[numeroCard]['P_TF_LISTA_SMCC_SISI_NU_ANNIO']+" - " + json[numeroCard]['P_TF_LISTA_SMCC_CARP_CD_RAMO']+" - " + json[numeroCard]['P_TF_LISTA_SMCC_CAPO_NU_POLIZA']+"</b>" );
			$("#DATO_MONTO").html("<b>$" + json[numeroCard]['P_TF_LISTA_SMCC_MT_MOVIMIENTO']+"</b>" );
			
			//Abre el modal
			$("#movimientoReservaPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		mostrarError('Error 12323131. Se produjo un inconveniente al cargar los datos del movimiento',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError('Se produjo un inconveniente al cargar los datos del productor');
	    },
	 
	   
	});
	

};



function mostrarReservasHome(obj,numCard,icono,siniestro,ramo,tercero,annio,fecha,periodo,adju,tipo){
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosDetalleReservas',
	    contentType: 'application/json', 
	    data : {siniestro:siniestro, ramo:ramo, annio:annio,periodo:periodo,tercero:tercero, adju:adju, tipo: tipo} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("listaTitulo");
		    	var d2 = document.getElementById("listaResultado");
		    	
		    	d1.innerHTML = ' '; 
		    	d2.innerHTML = ' '; 
		    	
		    	var resultadoCuotas = '<div class="tab-content" id="nav-tabContent">';
		    	
		    	var listaCuotas = '<div class="list-group" id="list-tab" role="tablist">';
		    
		    	//llena el panel D
		    	for ( var int = 0; int < json.length; int++) {
		    		var num=int+1;
		    	
		    		//verifica que sea el primero, y si lo es lo acitva y muestra su contenido
		    		if(num == 1){
		    			//Setea el titulo de la lista
		    			listaCuotas = listaCuotas + '<a class="list-group-item list-group-item-action active" id="list'+num+'" data-toggle="list" href="#list-home'+num+'" role="tab" aria-controls="home"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_RMCONTAB']))+'</h6></a>';
		    			//Setea el campo de la lista
		    			resultadoCuotas = resultadoCuotas + '<div class="tab-pane show active" id="list-home'+num+'" role="tabpanel" aria-labelledby="list-home-list'+num+'">'+
		    		'<div class="row" id="panelc"><div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">' +
		    		'<table  style= "width:100%;">'+
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Hecho Gen. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_SIPE_CCHG_CD_HECHO_GEN'])+'</b></h6></td></tr> ' +
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Moneda :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_LISTA_SIPE_CAMO_CD_MONEDA'])+'</b></h6></td></tr>' + 
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Cobertura :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[0]['P_TF_LISTA_SIPE_CACB_CD_COBERTURA'])+" - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_INB_DESC_COBERTURA']))+'</b></h6></td></tr>' + 
	                	'</table></div>'+
	         		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">'+
		    			'<table  style= "width:100%;">'+
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reserva :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_SIPE_SMCC_CD_TIPO_RESERVA'])+' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_TIPO_RESERVA']))  +'</b></h6></td></tr> ' +
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Neta :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_MT_RESERVA'])) +'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Reasegu. :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_CACS_MT_LIMITE']))+'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Tot. :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_MT_RESERVA_TOTAL']))+'</b></h6></td></tr>' + 
		                	'</table></div>'+
	            	' </div>'+
	   			'</div>';
		    		}
		    	//si no es el primero llena los demas campos, pero no los activa
		    		
		    		else{
		    			listaCuotas = listaCuotas + '<a class="list-group-item list-group-item-action" id="list'+num+'" data-toggle="list" href="#list-home'+num+'" role="tab" aria-controls="home"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_RMCONTAB']))+'</h6></a>';
		    			resultadoCuotas = resultadoCuotas + '<div class="tab-pane" id="list-home'+num+'" role="tabpanel" aria-labelledby="list-profile-list">' +
		    			'<div class="row" id="panelc"><div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">' +
			    		'<table  style= "width:100%;">'+
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Hecho Gen. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_SIPE_CCHG_CD_HECHO_GEN'])+'</b></h6></td></tr> ' +
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Moneda :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_LISTA_SIPE_CAMO_CD_MONEDA'])+'</b></h6></td></tr>' + 
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Cobertura :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[0]['P_TF_LISTA_SIPE_CACB_CD_COBERTURA'])+" - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_INB_DESC_COBERTURA']))+'</b></h6></td></tr>' + 
		                	'</table></div>'+
		         		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">'+
			    			'<table  style= "width:100%;">'+
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reserva :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>$'+validarCampoVacio(json[int]['P_TF_LISTA_SIPE_SMCC_CD_TIPO_RESERVA'])+' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_TIPO_RESERVA']))  +'</b></h6></td></tr> ' +
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Neta :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_MT_RESERVA'])) +'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Reasegu. :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_CACS_MT_LIMITE']))+'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Tot. :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_MT_RESERVA_TOTAL']))+'</b></h6></td></tr>' + 

			                	'</table></div>'+
		            	' </div>'+
		   			'</div>';
		    		
		    		}
			
		    	}
		    	
		    	//pasa el codigo al html
		    	d1.innerHTML = listaCuotas;  
		    	d2.innerHTML = resultadoCuotas;  

	//muestra el panel D
		$('#panelb').hide();
		$('#panela').show();
		$('#panelReservaDetalle').show();
		
		$(".seleccionPanelB").each(function(){
	 	    $(this).css("background","white");
	 	});
		$('#'+obj+numCard).css("background","#bac2bb");
		
		$('#labelPanelDetalleJuicio').html("Detalle reserva #"+ siniestro + " - " + fecha);
		
		var d1 = document.getElementById("panelImagenReserva");
		d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
		$.unblockUI();
	    }
		catch(e){
    		alert('Error (67854) generado por : '+e);
    	}

	    	 },
	 	    error : function(xhr, status) {
	 	    	$.unblockUI();
	 	    	mostrarError(xhr['responseText']);	 	    }
	 	});
	 }




function buscadorPanelCEntidadSiniestro() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaSiniestro");
	  filter = input.value.toUpperCase();
	
	  $(".datoInspeccionesSiniestro").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("inspecSiniestro", "micaruB");
		  var idEncabezado = idH6.replace("inspecSiniestro", "nroInspec");
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idEncabezado).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  

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



function mostrarSiniestroHome(obj,num,icono,siniestro,ramo,annio,tercero){	
	bloquearPantallaGris();

	$("#labelPanelSiniestro").val(tercero);
	if(tercero == 0){
		$('#btnDetalleTercero').hide();
		}
	else{
		$('#btnDetalleTercero').show();

	}

	$.ajax({
	    url : 'datosParametricosSiniestro',
	    contentType: 'application/json', 
	    data : { siniestro : siniestro, annio:annio, ramo : ramo , subSiniestro:tercero},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosParametricosSiniestro");
    	    	d1.innerHTML = ' ';
	    		
    	    	var panelNuevo = '<div style="height:150px;overflow-y:auto;"><table id="tablaParametricosSiniestro" style= "width:100%;">';
    	    	for ( var int = 0; int < json.length; int++) {
    	    		panelNuevo = panelNuevo + '<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_INB_DSP_LABEL_DATOS'])) +' : </td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_SIDD_CRPD_DATO'])) +'</b> - <b>'+ primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_INB_DSP_DSC_DATO'])+'.</b></h6></td></tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</div>';  

			$('#panelb').hide();
			$('#panela').show();
			$('#panelSubSiniestro').show();
			
			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$('#'+obj+num).css("background","#bac2bb");
			
			$('#labelPanelSiniestro').html("Sub Siniestro #"+ annio +" - "+ ramo + " - "+siniestro);
			
			var d1 = document.getElementById("panelPrueba");
			d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
	    	}
	    	catch(e)
	    	{
	    		alert('Error (444999494) generado por : '+e);
	    	}
	    	//ARRANCA EL PANEL C JSON
			
	    	$.ajax({
	    	    url : 'datosInspecciones',
	    	    contentType: 'application/json', 
	    	    data : { siniestro : siniestro, annio:annio, ramo : ramo , subSiniestro:tercero},
	    	    type : 'GET',
	    	    dataType : 'json',
	    	    success : function (json) {
	    	    	try {
	        	    	
	    	    		$('#cantInspecciones').text("Inspecciones (" + json.length+")");	    	    	
	    	    		$('#iconoInspeccionesSiniestro').addClass("material-icons altoIcono");
	        	    	$('#iconoInspeccionesSiniestro').css('color','#271765');
	        	    	$('#iconoInspeccionesSiniestro').css('padding-top','15px');
	    	    		$('#iconoInspeccionesSiniestro').html("&#xE02f;");
	    	    		
	    	    		$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");
	        	    	var d1 = document.getElementById("caruMayor");
	        	    	d1.innerHTML = ' ';
	        	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
	        	    	  
	        	    	for ( var int = 0; int < json.length; int++) {
	        	    	
	        	    		var num=int+1;
	        	    		var popUp= "'inspeccionesPopUp'";
	        	    		var nroInsp= 'nroInspec'+num;
	        	    		var DatoInsp= 'inspecSiniestro'+num;
	        	    		
	        	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'" onClick="abrirPopUpInspeccionesSiniestrosHome('+tercero+',1,'+num+');" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#271765; border-style: solid; box-shadow: 0 0 0px black;">'+
							'<h6 id="nroInspec'+int+'" style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#271765;color:#ffffff;">#'+json[int]['P_TF_LISTA_IMPR_SIID_NU_INSPECCION']+'</b></h6>'+
							'<h6 style="margin-top:2%;" id="'+DatoInsp+'"  class="datoInspeccionesSiniestro">Denuncia : <b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_IMPR_SIID_FE_DENUNCIA']))+'</b></h6>'+
							'<h6 style="margin-top:2%;"  id="'+DatoInsp+'" class="datoInspeccionesSiniestro">Presupuesto : <b>'+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SIID_MT_PRESUPUESTO'])+'</b></h6>'+
							'<h6 style="margin-top:2%;"  id="'+DatoInsp+'" class="datoInspeccionesSiniestro">Pagado : '+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SIID_IN_PAGADO'])+'</b></h6>'+
							'<h6 style="margin-top:2%;" id="'+DatoInsp+'"  class="datoInspeccionesSiniestro">Tercero :<b>'+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SIID_SITC_NU_TERCERO'])+'</b></h6></div>';
							
	        	    	}
	        	    	d1.innerHTML = caruNuevo +'</div>';  
	    	    	
	        	    	activarCaru();
	        	    	} catch (e) {
	        	    		mostrarError('Disculpe, existio un problema codigo:11113',e);	     
	        	    	}	        	    	
	        	    	$.unblockUI();
	        	    },
	        		 

	        	    // codigo a ejecutar si la peticion falla;
	        	    // son pasados como argumentos a la funcion
	        	    // el objeto de la peticion en crudo y codigo de estatus de la peticion
	        	    error: function (request, status, error) {
	        	    	$.unblockUI();
	        	    	$('#cantInspecciones').text("Inspecciones (0)");	    	    	
	        	    	$('#cantSiniestros').text("sub siniestros");
	        	    	
	        	    	$('#iconoInspeccionesSiniestro').addClass("material-icons altoIcono");
	        	    	$('#iconoInspeccionesSiniestro').css('color','#39b3d7');
	        	    	$('#iconoInspeccionesSiniestro').css('padding-top','15px');
	    	    		$('#iconoInspeccionesSiniestro').html("&#xE611;");
	        	    	
	        	    	
	        	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");
	        	        document.getElementById("micaru").innerHTML = request.responseText; 
	        	    	
	        	       },
	        	   
	        	   });
	    	    	
	    	    },
	    	    error : function(xhr, status) {
	    	    	$.unblockUI();
	    	    	mostrarError(xhr['responseText']);	    	    }
	    	});
	    }




function inicioSiniestroHome() {
	bloquearPantallaGris();
	activarCaru();
	
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
	})

	$.unblockUI();
}

function abrirPopUpInspeccionesSiniestrosHome(subSi,annio,numCard){

	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var varlorAnnio=document.getElementById("valorAnnioSiniestroHome").value;

	bloquearPantallaGris();
	$.ajax({
	    // la URL para la peticion
	    url : 'datosInspeccionesModal',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, annio:varlorAnnio, ramo : valorRamo, subSiniestro : subSi},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	numCard = numCard-1;
	    	llenarDinamicamente(json[numCard]);
			$("#DATO_INSPECCION").html("Inspeccion #<b>"+json[numCard]['P_TF_LISTA_IMPR_SIID_NU_INSPECCION']+"</b> del tercero <b>#"+subSi+"</b>");
			$("#DATO_CENTRO_INSPECCION").html("<b>" +validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_SIID_SCCI_CD_CENTRO']))+ " - "+validarCampoVacio(json[numCard]['P_TF_LISTA_IMPR_INB_DSP_CENTRO'])+"</b>");
	    	$("#DATO_CENTRO_TALLER").html("<b>" +validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_SIID_CD_TALLER']))+ " - "+validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_SIID_TALLER_MECANICO']))+"</b>");
	    	$("#DATO_MOTIVO_INSPEC").html("<b>" +validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_SIID_SMIN_CD_MOTIVO']))+ " - "+validarCampoVacio(json[numCard]['P_TF_LISTA_IMPR_INB_DESC_MOTIVO'])+"</b>");
	    	$("#DATO_ESTADO_INSPECCION").html("<b>" +validarCampoVacio(json[numCard]['P_TF_LISTA_IMPR_SIID_CD_RESULTADO'])+ " - "+validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_INB_DESC_RESULTADO']))+"</b>");
	    	
	    	
	    	
			//Abre el modal
			$("#inspeccionesPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
		        alert('Se produjo un inconveniente al cargar los datos de las inspecciones',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};


function abrirModalNotas(){
	
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosNotasModal',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, annio:annio, ramo : valorRamo},
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
	





function abrirModalDetalleSiniestro(siniestro,ramo,annio){
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosDetalleSiniestroHome',
	    contentType: 'application/json', 
	    data : { siniestro : siniestro, annio:annio, ramo : ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);	
	    	$("#DATO_SINIESTRO").html("Siniestro - <b>#" +json[0]['P_TF_LISTA_IMPR_SISI_NU_SINIESTRO']+ "</b>");
	    	$("#DATO_OCURRENCIA").html("<b>" +validarCampoVacio(formatearFechaJson(json[0]['P_TF_LISTA_IMPR_SISI_FE_OCURRENCIA']))+ " - " +validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_HORA_OCURRENCIA'])+ "</b>");
	    	$("#DATO_POLIZA").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_CARP_CD_RAMO'])+ " - " +validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_CAPO_NU_POLIZA'])+ " - " +validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_CACE_NU_CERTIFICADO'])+ "</b>");
	    	$("#DATO_PATENTE").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_PATENTE'])+"</b>");
	    	$("#DATO_RIESGO").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_SITP_TIPO_SINIESTRO'])+" - "+primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_TIPO_SIN']))+"</b>");
	    	$("#DATO_COBERTURA").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_CD_PLAN'])+" - "+primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_IMPR_TERCEROS COMPLETOS']))+"</b>");
	    	$("#DATO_MODELO").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_CD_MODELO'])+" - "+primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_MODELO']))+"</b>");
	    	$("#DATO_ESTADO_SINIESTRO").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_SITE_TIPO_ESTADO'])+" - "+primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_SITE_DE_TIPO_ESTADO']))+"</b>");
			    
	    	
	    	$('#valorSiniestroHomeModal').val(json[0]['P_TF_LISTA_IMPR_SISI_NU_SINIESTRO']);
	    	$('#valorRamoSiniestroHomeModal').val(json[0]['P_TF_LISTA_IMPR_SISI_CARP_CD_RAMO']);

	    	
			//Abre el modal
			$("#siniestroPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		mostrarError('Error : 553453. Se produjo un inconveniente al cargar los datos del tercero',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
};
 	

function abrirModalOcurrencia(){
	

	//Abre el modal
	$("#ocurrenciaPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	}
	

function abrirModalDetalleTercero(){
	
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	var valorTercero=document.getElementById("labelPanelSiniestro").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosDetalleTercero',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, annio:annio, ramo : valorRamo, tercero : valorTercero},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);	
	    	$("#DATO_TERCERO").html("Detalle tercero<b> #" +json[0]['P_TF_LISTA_IMPR_SITC_NU_TERCERO']+ "</b>");
	    	$("#DATO_DOCUMENTO").html("<b>" +validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_IMPR_SITC_TP_DOCUMENTO'])+ " - "+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SITC_NU_DOCUMENTO']))+" </b>");
	    	$("#DATO_SINIESTRO").html("<b>" +validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_IMPR_SIID_SISI_NU_ANNIO'])+ " - "+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SIID_CARP_CD_RAMO']))+" -" + validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SIID_SISI_NU_SINIESTRO']) + " </b>");
	    	
	    	
			//Abre el modal
			$("#terceroDetallePopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		mostrarError('Error : 553453. Se produjo un inconveniente al cargar los datos del tercero',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
};
 	

function abrirModaldanios(){

	//Abre el modal
	$("#daniosPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	}
	




function abrirModalCoberturasFinanciera(){
	bloquearPantallaGris();

	//Abre el modal
	$("#coberturaFinanieraPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	
	coberturaFinanciera();
	
};





function abrirModalCoberturas(){
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'coberturaModalSiniestroHome',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, ramo : valorRamo,annio : annio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosCoberturasSiniestroHome");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SISC_CACB_CD_COBERTURA']) +'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SISC_CCHG_CD_HECHO_GEN']) +" - "+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_INB_DESC_HECHO_GEN']))+'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_IMPR_SISC_FE_ACTUALIZACION'])) +'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_IMPR_SISC_FE_PRESCRIPCION'])) +'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_IMPR_SISC_MT_FRANQUICIA'])) +'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_IMPR_SISC_MT_RESERVA_ACTUAL'])) +'</td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	total = json.length - 1;
    	    	$("#DATO_COBERTURA_MODAL").html("Coberturas del siniestro #<b>"+valorSiniestro+"</b>");
    	    	
			//Abre el modal
			$("#coberturasSiniestroPopUp").modal({
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
		    	mostrarError(xhr['responseText']);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
}




function abrirModalIndiceRiesgosSiniestro(){
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'indiceRiesgoModalSiniestroHome',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, ramo : valorRamo,annio : annio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosindRiesgoSiniestro");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	var puntaje;
    	    	var resaltaLinea;
    	    	for ( var int = 0; int < json["datosSalida"].length; int++) {
    	    	
    	    		//pregunta si puede ver los puntajes
    	    		if(json["datosSalida"][int]["P_TF_LISTA_IMPR_INB_IN_PERMISO_VER_PUNTAJE"].trim() === 'S'){
        	    		$('#columnaPuntajeRiesgoSiniestroHome').css('display','');
    	    			puntaje='<td class="td-grilla-incRiesgoSiniestroHome" role="cell">'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_INB_TOT_PUNTAJE_INSTANC']) +'</td>';
    	    		}
    	    		else{
    	    		$('#columnaPuntajeRiesgoSiniestroHome').css("display","none");
	    			puntaje='';
    	    		}
    	    		//pregunta si reslta la linea
    	    		if(json["datosSalida"][int]["P_TF_LISTA_IMPR_INB_TP_INDICADOR"].trim() === 'A'){
    	    			iconoLinea='<i class="material-icons iconoIndRiesgoSiniestro" data-toggle="tooltip"  title="Automatico"  style="color:#289f28;font-size: 25px;">assignment_turned_in</i>';
    	    		}
    	    		else{
    	    			iconoLinea='<i class="material-icons iconoIndRiesgoSiniestro" data-toggle="tooltip"  title="Manual"  style="color:#00317A;font-size: 25px;">assignment_ind</i>';
    	    		}
    	    		
    	    		
    	    		panelNuevo = panelNuevo +'<tr tr-grilla" style="cursor:pointer;">'+
    	    		'<td class="td-grilla-incRiesgoSiniestroHome" role="cell">'+iconoLinea+'</td>'+
    	    		'<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIPO_CD_INSTANCIA']) +" - "+validarCampoVacio(primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_INB_DE_INSTANCIA']))+'</h6></td>'+
    	    		'<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIPO_SITC_NU_TERCERO']) +'</h6></td>'+
    	    		'<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_SIDO_NU_INDICADOR'])  +" - "+validarCampoVacio(primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_INB_DE_INDICADOR']))+'</h6></td>'+
		            '<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_INB_DE_VALOR']))+'</h6></td>'+
		            '<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_US_MOD']) +'</h6></td>'+
		            puntaje+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	$("#DATOS_RIESGO_SINIESTRO").html("Indicadores del Siniestro #<b>"+valorSiniestro+"</b>");
    	    	if(json['avisoDato'].trim() === "AMERITA INVESTIGAR"){
    	    		$('#DATO_AVISO_RIESGO_SINIESTRO').css("color","#e50909");
    	    	}
    	    	else{
    	    		$('#DATO_AVISO_RIESGO_SINIESTRO').css("color","#108249");
    	    	}
    	    	$("#DATO_AVISO_RIESGO_SINIESTRO").html("<b>"+json['avisoDato']+"</b>");
    	    	
    	    	
    	    	
			//Abre el modal
			$("#indRiesgoSiniestroPopUp").modal({
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
		    	mostrarError(xhr['responseText']);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
}






function urlIndiceRiesgosSiniestro(url){
	bloquearPantallaGris();
	window.open(url);
	$.unblockUI();

}







function redirSiniestroHome()
{
	bloquearPantallaGris();

	var valorSiniestro=document.getElementById("valorSiniestroHomeModal").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHomeModal").value;
	location.href = "/PSPES/homeSiniestro?nroSiniestro=" + valorSiniestro + "&ramo="+valorRamo+"&anio=1";
}

function redirReservasHome()
{
	bloquearPantallaGris();

	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var valorSubsiniestro=document.getElementById("labelPanelSiniestro").value;
	var annio=document.getElementById("valorAnnioSiniestroHome").value;

	
	location.href = "/PSPES/homeReservas?nroSiniestro="+valorSiniestro+"&ramo="+valorRamo+"&subSiniestro="+valorSubsiniestro+"&annio="+annio;
}

function redirPagoHome()
{
	bloquearPantallaGris();

	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var valorSubsiniestro=document.getElementById("labelPanelSiniestro").value;
	var annio=document.getElementById("valorAnnioSiniestroHome").value;

	
	location.href = "/PSPES/homePagos?nroSiniestro=" + valorSiniestro + "&ramo="+valorRamo+"&subSiniestro="+valorSubsiniestro+"&annio="+annio;
}

function zambaSiniestroHome(){
	bloquearPantallaGris();
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var url = "http://imageapp/zamba.web/globalsearch/search/search.html?User=3&attr=17&types=15%2c12&search="+valorSiniestro+"#Zamba/";

		window.open(url);
    	$.unblockUI();

}

function buscarFiltroParametricoSubSiniestro(idTablaParametricos){
	
	input = document.getElementById("inputBusquedaSubSiniestro");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function abrirDescargaCertificadoSiniestro(dato){
	
	if(dato !=""){
		window.open(dato);
	}else{
		mostrarError("No se encontro la denuncia del siniestro");
	}
	
}

function inicioPdfVida(){
	try {
		
		
	$(document).ready(function(){
		  $('#cuit').mask('00-00000000-0');
		  $('#Numero').mask('0000-0000-0000-0000');
		});
		new Card({
			form: document.querySelector('form'),
			container: '.card-wrapper'
		});
		
		
		// Data Picker Initialization
		$('.datepicker').pickadate({
			
			monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
			             'Noviembre', 'Diciembre'],
			monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
			weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
			today: 'Hoy',
			clear: 'Limpiar',
			close: 'Cerrar',
			labelMonthNext: 'Proximo mes',
			labelMonthPrev: 'Anterior mes',
			labelMonthSelect: 'Seleccione un mes',
			labelYearSelect: 'Seleccione un año',
			
		});
		
	} catch (e) {
		// TODO: handle exception
	}
	 
}

try {
	// Example starter JavaScript for disabling form submissions if there are invalid fields
	(function () {
	  'use strict';
	  window.addEventListener('load', function() {
	    // Fetch all the forms we want to apply custom Bootstrap validation styles to
	    var forms = document.getElementsByClassName('needs-validation');
	    // Loop over them and prevent submission
	    var validation = Array.prototype.filter.call(forms, function(form) {
	      form.addEventListener('submit', function(event) {
	        if (form.checkValidity() === false) {
	          event.preventDefault();
	          event.stopPropagation();
	        }
	        form.classList.add('was-validated');
	      }, false);
	    });
	  }, false);
	})();
} catch (e) {
	// TODO: handle exception
}


function redirectGenerales(){
	bloquearPantallaGris();
	location.href="/PSPES/cotizadorGenerales";
}
function redirectBienes(){
	
	bloquearPantallaGris();
	location.href="/PSPES/cotizadorBienes";
}
function redirectPlanes(){
	bloquearPantallaGris();

	location.href="/PSPES/cotizadorPlanes";
}
function redirectFin(){
	bloquearPantallaGris();

	location.href="/PSPES/cotizadorFin";
}
function redirectCoti(){
	bloquearPantallaGris();

	location.href="/PSPES/cotizador";
}

function redirectPdfVidaDatos(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaStep1";
}

function actualizarPorciento(porcentaje){
	$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentaje+"%)");
}

function cambiarPorcentaje(id,idInputOculto,suma){
	var valor= document.getElementById(id).value;
	var porcentajeActual= document.getElementById("porcentajeActual").value;
	var inputOculto= document.getElementById(idInputOculto).value;
	var suma = parseInt(suma);
	if(valor != '' && inputOculto == 0){
		porcentajeActual = parseInt(porcentajeActual) + suma;
	$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentajeActual+"%)");
	$("#porcentajeActual").val(porcentajeActual);
	$("#"+idInputOculto).val(1);
	// $('#'+id).removeAttr('onchange');
	}else if(valor == '' && inputOculto != 0){
		porcentajeActual = parseInt(porcentajeActual) - suma;
		$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentajeActual+"%)");
		$("#porcentajeActual").val(porcentajeActual);
		$("#"+idInputOculto).val(0);
	}
}
	
	function cambiarPorcentajeSelector(id,idInputOculto,suma){
		var porcentajeActual= document.getElementById("porcentajeActual").value;
		var select = document.getElementById(id);
		var valorSelect = select.options[select.selectedIndex].value;
		var inputOculto= document.getElementById(idInputOculto).value;
		var suma = parseInt(suma);
		if(valorSelect != 0 && inputOculto == 0){
			porcentajeActual = parseInt(porcentajeActual) + suma;
		$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentajeActual+"%)");
		$("#porcentajeActual").val(porcentajeActual);
		$("#"+idInputOculto).val(1);

		}else if(valorSelect == 0 && inputOculto != 0){
			porcentajeActual = parseInt(porcentajeActual) - suma;
			$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentajeActual+"%)");
			$("#porcentajeActual").val(porcentajeActual);
			$("#"+idInputOculto).val(0);

		}
}
function redirectPdfVidaDatosB(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaStep2";
}
 
function redirectHomeBpba(){
	bloquearPantallaGris();

	location.href="/PSPES/homeBPBA";
	
}

function redirectDatosRiesgo(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaStep3";
}
function redirectDatosAcreedor(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaStep4";
}
function redirectPdfVida(){
	bloquearPantallaGris();

	location.href="/PSPES/bpba";
}


function redirectPdfVidaFin(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaFin";
}


