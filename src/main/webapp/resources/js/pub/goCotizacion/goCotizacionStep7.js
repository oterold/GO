function redirectStep7() {
	bloquearPantallaGris();
	var formData = JSON.stringify(jQuery('.enviarForm').serializeArray());
	var array = [];
	$.each(JSON.parse(formData), function(i, field) {
		var valor = new Object();
		if (field.name.indexOf("S") == 0) {
			valor.name = field.name.replace("S", "");
			if ($("#" + field.name).is(':checked')) {
				valor.value = "S";
			} else {
				valor.value = "N";
			}
		} else {
			valor.name = field.name;
			valor.value = field.value;
		}
		array.push(valor);
	})

	formData = JSON.stringify(array);

	$.ajax({
		url : 'guardarDatosDelBienCotizacion',
		contentType : 'application/json',
		data : {
			datosPantalla : formData,
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var valor = comprobarForm();

				if (valor == 0) {
					location.href = "/PSPES/cotizacionStep8";
				}
			} catch (e) {
				// TODO: handle exception
			}
			$.unblockUI();

		},
		error : function(xhr, ajaxOptions, thrownError) {
			$.unblockUI();
		}
	});
}
