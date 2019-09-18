function redirectStep1() {
	bloquearPantallaGris();
	var formData = JSON.stringify(jQuery('#formularioStep0').serializeArray());

	$.ajax({
		url : 'guardarDatosContacto',
		contentType : 'application/json',
		data : {
			dataString : formData,
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var valor = comprobarForm(json);
				
				if(valor == 0){
					location.href="/PSPES/cotizacionStep1";
				}
			} catch (e) {
				mostrarError("Error al cargar los datos del cliente, error : 13642",e);
			}
			$.unblockUI();
		},
		error : function(xhr, ajaxOptions, thrownError) {
			$.unblockUI();
		}
	});
}
