function mostrarPanelCotizacion(idPanel,idBoton)
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




