function emitirPoliza() {
	bloquearPantallaGris();
	$.ajax({
		url : 'emitirPoliza',
		contentType : 'application/json',
		data : {
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				$.unblockUI();
			} catch (e) {
					mostrarError("error al emitir la poliza, 91827376 ",e);
			}
		},
		error : function(xhr, ajaxOptions, thrownError) {
			mostrarError(xhr['responseText']);

			$.unblockUI();
		}
	});
}
