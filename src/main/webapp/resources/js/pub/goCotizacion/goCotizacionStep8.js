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
			if(xhr['responseText'].indexOf("46204") > -1){
				mostrarEmision(xhr['responseText']);
			}else{
				mostrarError(xhr['responseText']);
			}

		}
	});
}
function mostrarEmision(msg){
	try {
		$.unblockUI();
	} catch (e) {
	}
	swal({
		  type: 'success',
		  title: 'Emisi\u00F3n',
		  text: msg
		});
}