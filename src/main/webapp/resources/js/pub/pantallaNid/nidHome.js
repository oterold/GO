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
