
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


