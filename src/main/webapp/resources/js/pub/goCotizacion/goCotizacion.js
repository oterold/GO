
function cargarDatosModalDatosBanco() {
	var select = document.getElementById('datosBanco');
	var dato = select.options[select.selectedIndex].value;

	$.ajax({
		url : 'buscarBanco',
		contentType : 'application/json',
		data : {},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {

				for ( var int = 0; int < json.length; int++) {
					if (dato == json[int]["P_TF_CADM_CADM_NU_CUENTA"]) {
						$("#datoBanco").val(json[int]["P_TF_CADM_RV_TP_CUENTA"])
						$("#tarjetaCredito").val(json[int]["P_TF_CADM_CATT_DE_TARJETA"])
						$("#numTarjeta").val(ocultarDato(json[int]["P_TF_CADM_CADM_NU_CUENTA"]))
					}
				}

				M.updateTextFields();

			} catch (e) {
			}
		},
		error : function(xhr, status) {
		},

	});

}

function cargarDatosModalDocumento(json) {

	$("#personaTpDni").val(json[0]["P_TF_CABU_CABU_CATU_TP_DOCUMENTO"])
	$("#personaDocumento").val(json[0]["P_TF_CABU_CABU_NU_DOCUMENTO"])
	$("#personaCuit").val(json[0]["P_TF_CABU_CABU_NU_CUIT"])
	$("#perdonaApellido").val(json[0]["P_TF_CABU_CABU_NM_APELLIDO_RAZON"])
	$("#PersonaNombre").val(json[0]["P_TF_CABU_CABU_NM_PERSONA"])
	$("#personaNac").val(json[0]["P_TF_CABU_CABU_FE_NACIMIENTO"])
	$("#PersonaGenero").val(json[0]["P_TF_CABU_CABU_ST_SEXO"])
	$("#personaNacionalidad").val(json[0]["P_TF_CABU_CABU_CAPA_CD_NACIONALIDAD"])
	$("#personaLugarNac").val(json[0]["P_TF_CABU_CABU_CD_ESTADO_NACIMIENTO"])
	$("#persoanEstadoCivil").val(json[0]["P_TF_CABU_CABU_ESTADO_CIVIL"])
	$("#personaProfesion").val(json[0]["P_TF_CABU_CABU_CAPW_CD_PROFESION"])

	if (json[0]["P_TF_CABU_CABU_PEP"] == 'S') {
		$('#pep').prop('checked', true);
	}
	if (json[0]["P_TF_CABU_CABU_IN_RES_230"] == 'S') {
		$('#pep').prop('checked', true);
	}
	M.updateTextFields();

}

function buscarPersona() {
	var documento = $("#docPersona").val();
	if (documento.length > 7) {
		$.ajax({
			url : 'buscarPersona',
			contentType : 'application/json',
			data : {
				documento : documento
			},
			type : 'GET',
			dataType : 'json',
			success : function(json) {
				try {
					$("#mensajeDni").css("display", "none");
					$("#nombreAseg").text(
							primeraLetraMayus(primeraLetraMayus(json[0]["P_TF_CABU_CABU_NM_APELLIDO_RAZON"]) + " "
									+ json[0]["P_TF_CABU_CABU_NM_PERSONA"]))
					cargarDatosModalDocumento(json);
					$("#aseguradoPrincipal").css("background-color", "#2f780a");
					cargarDatosComunicacionTelefono(json[0]["P_TF_CABU_CABU_NU_PERSONA"], 1);
					cargarDatosComunicacionEmail(json[0]["P_TF_CABU_CABU_NU_PERSONA"], 4);
					cargarDatosBanco(json[0]["P_TF_CABU_CABU_NU_PERSONA"]);
					cargarDatosDomiciolio(json[0]["P_TF_CABU_CABU_NU_PERSONA"]);
					$("#btnAgregarPersona").css("display", "none");
					$(".ingresar-persona").each(function() {
						$(this).prop('disabled', true);
					});
				} catch (e) {
				}
			},
			error : function(xhr, status) {
				ocultarDatosPersona(documento);
			},
		});
	} else {
		ocultarDatosPersona(documento);
	}
}

function ocultarDatosPersona(documento) {
	if (documento.length == 0) {
		$("#mensajeDni").css("display", "none");
	} else {
		$("#mensajeDni").css("display", "");
	}
	$("#nombreAseg").text("");

	$(".campo-persona").each(function() {
		$(this).val("");
	});
	$(".ingresar-persona").each(function() {
		$(this).prop('disabled', false);
	});
	$("#btnAgregarPersona").css("display", "");
	$("#aseguradoPrincipal").css("background-color", "#0b4376");

	$(".input-vacio").each(function() {
		$(this).empty();
		$(this).val("");
	});

	$('select').formSelect();
	M.updateTextFields();
}
function cargarFecha() {
	var fecha = new Date(); // Fecha actual
	var mes = fecha.getMonth() + 1; // obteniendo mes
	var dia = fecha.getDate(); // obteniendo dia
	var ano = fecha.getFullYear(); // obteniendo año
	if (dia < 10)
		dia = '0' + dia; // agrega cero si el menor de 10
	if (mes < 10)
		mes = '0' + mes // agrega cero si el menor de 10

	return dia + mes + ano;
}

function guardarDatoComunicacion() {
	var conz = $("#valorConz").val();
	var formData = JSON.stringify(jQuery('.datoComunicacion').serializeArray());
	M.updateTextFields();
	$.ajax({
		url : 'guardarComunicacion',
		contentType : 'application/json',
		data : {
			datos : formData,
			conz : conz
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {

			} catch (e) {
				mostrarError('Por favor informe a sistema con el cod de error: 921726.', e);
			}
			$.unblockUI();
		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
		},
	});
}

function buscarDatosFormateados() {
	var formData = JSON.stringify(jQuery('.ingresoNuevaPersona').serializeArray());
	var array = [];
	var valor;
	$.each(JSON.parse(formData), function(i, field) {
		var valor = new Object();
		valor.name = field.name;
		valor.value = field.value;
		array.push(valor);
	})
	var valor = new Object();
	valor.name = "checkPoliticamente";
	if ($("#checkPoliticamente").is(':checked')) {
		valor.value = "S";
	} else {
		valor.value = "N";
	}
	array.push(valor)

	var valor = new Object();
	valor.name = "checkArt";
	if ($("#checkArt").is(':checked')) {
		valor.value = "S";
	} else {
		valor.value = "N";
	}
	array.push(valor)

	return formData = JSON.stringify(array);
}

function cargarNuevaPersona() {

	var formData = buscarDatosFormateados();

	M.updateTextFields();
	$.ajax({
		url : 'cargarNuevaPersona',
		contentType : 'application/json',
		data : {
			datos : formData
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {

			} catch (e) {
				mostrarError('Por favor informe a sistema con el cod de error: 921726.', e);
			}
			$.unblockUI();
		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
		},
	});

	$("#docPersona").val($("#clienteDni").val());

	buscarPersona();

}

function guardarDatosDomicilio() {
	var formData = JSON.stringify(jQuery('.ingresoDomicilio').serializeArray());
	var condicion = 0;
	M.updateTextFields();
	$.ajax({
		url : 'guardarDomicilio',
		contentType : 'application/json',
		data : {
			datos : formData,
			condicion : condicion
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {

			} catch (e) {
				mostrarError('Por favor informe a sistema con el cod de error: 921726.', e);
			}
			$.unblockUI();
		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
		},
	});
}

function guardarDatosDomicilioNuevo() {
	var formData = JSON.stringify(jQuery('.ingresoDomicilioNuevo').serializeArray());
	M.updateTextFields();
	var condicion = "";
	$.ajax({
		url : 'guardarDomicilio',
		contentType : 'application/json',
		data : {
			datos : formData,
			condicion : condicion
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {

				guardarDatosDomicilio();
			} catch (e) {
				mostrarError('Por favor informe a sistema con el cod de error: 921726.', e);
			}
			$.unblockUI();
		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
		},
	});
}

function guardarComunicacion(conz) {

	var formData = JSON.stringify(jQuery('.datoComunicacion').serializeArray());

	$.ajax({
		url : 'guardarComunicacion',
		contentType : 'application/json',
		data : {
			datos : formData,
			conz : conz
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {

			} catch (e) {
				mostrarError('Por favor informe a sistema con el cod de error: 921726.', e);
			}
			$.unblockUI();
		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
		},
	});
}

function cargarPromoPlan() {
	var promo = $("#datoPromo").val();
	var plan = $("#datoPlan").val();
	var valor = $("#datoMonto").val();
	var descPlan = $("#datoDescPlan").val();

	var f = new Date();
	var fecha = cargarFecha();

	$.ajax({
		url : 'guardarPlanPromo',
		contentType : 'application/json',
		data : {
			promo : promo,
			plan : plan,
			fecha : fecha,
			valor : valor,
			descPlan : descPlan
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				location.href = "/PSPES/cotizacionStep6"
			} catch (e) {
				mostrarError('Por favor informe a sistema con el cod de error: 91726.', e);
			}
			$.unblockUI();

		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
		},
	});
}

function confirmarCotizacion() {
	$.ajax({
		url : 'confirmarCotizacion',
		contentType : 'application/json',
		data : {},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				$(".botones-promociones").each(function() {
					$(this).css("pointer-events", "auto");
				});

				$("#btnSiguienteStep5").css("display", "");
				$("#btnConfirmarStep5").css("display", "none");
				Swal.fire({
					type : 'success',
					title : 'Se confirm\u00F3 la cotizaci\u00F3n',
					showConfirmButton : false,
					timer : 2000
				})
			} catch (e) {
				mostrarError('Por favor informe a sistema con el cod de error:91221228716.', e);
			}
			$.unblockUI();

		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
		},
	});
}

function cargarDatosDomiciolio(persona) {
	$
			.ajax({
				url : 'buscarDomicilios',
				contentType : 'application/json',
				data : {
					persona : persona
				},
				type : 'GET',
				dataType : 'json',
				success : function(json) {
					try {
						var panelNuevo = '';
						var d1 = document.getElementById("selecDomicilio");
						d1.innerHTML = '';
						if (json.length > 1) {
							panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option>";
							panelNuevo = panelNuevo;
						}
						for ( var int = 0; int < json.length; int++) {
							panelNuevo = panelNuevo + "<option value=" + int + ">"
									+ primeraLetraMayus(json[int]["P_TF_CADO_CADO_DE_CALLE"]) + " "
									+ json[int]["P_TF_CADO_CADO_DE_NUMERO"] + "</option>";
						}
						d1.innerHTML = panelNuevo
								+ "<option value='0101'data-icon='resources/img/imagenesCotizador/addHome.png' class='circle'>Agregar</option>";

						$('select').formSelect();

					} catch (e) {
					}
				},
				error : function(xhr, status) {

					var panelNuevo = '';
					var d1 = document.getElementById("selecDomicilio");
					d1.innerHTML = '';
					panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option>";
					d1.innerHTML = panelNuevo
							+ "<option value='0101'data-icon='resources/img/imagenesCotizador/addHome.png' class='circle'>Agregar</option>";
					$('select').formSelect();
				},

			});

}

function abrirModalIngresoDomicilio(domicilio) {

	$('#modalIngresoDomicilio').modal('open');

}

function abrirModalDetalleCobertura(promo, plan, premio, descPromo) {
	$('#modalDetallePlan').modal('open');
	$("#valorPromoModal").val(promo);
	$("#valorPlanModal").val(plan);

	$("#textoPromo").html("Promoci&oacute;n " + descPromo);
	$("#textoPremio").text("Premio " + formatearMoneda(premio) + "/ MENSUAL");
	$("#textoPlan").text("Plan " + plan);

	detalleCoberturas(promo, plan, premio);

}

function detalleCoberturas(promo, plan, premio) {
	bloquearPantallaGris();
	$("#tablaCobertura").css("display", "");
	$("#tablaComponente").css("display", "none");

	$("#letraCobertura").css("color", "#0b4376");
	$("#letraComponente").css("color", "#a3a3a3");

	$
			.ajax({
				url : 'contenidoDetalle',
				contentType : 'application/json',
				data : {
					plan : plan,
					promo : promo
				},
				type : 'GET',
				dataType : 'json',
				success : function(json) {
					try {
						var d1 = document.getElementById("contenidoCobertura");
						d1.innerHTML = ' ';
						var panelNuevo = '';
						for ( var int = 0; int < json.length; int++) {
							panelNuevo = panelNuevo
									+ '<tr><td align="right"style="padding-top:5px;"><h6 style="font-size:13px;color:#a3a3a3">'
									+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CACK_CACB_DE_COBERTURA']))
									+ ' </td><td style="padding-top:5px;width:60%;"><h6 style="font-size:13px;color:#a3a3a3">'
									+ validarCampoVacioNoMostrar(formatearMoneda(json[int]['P_TF_CACK_CACK_MT_SUMA_ASEGURADA']))
									+ '</h6></td><td style="padding-top:5px;width:60%;"><h6 style="font-size:13px;color:#a3a3a3">'
									+ validarCampoVacioNoMostrar(formatearMoneda(json[int]['P_TF_CACK_CACK_CACK_MT_PRIMA']))
									+ '</h6></td></tr>';
						}
						d1.innerHTML = panelNuevo;

					} catch (e) {
						// TODO: handle exception
					}

					$.unblockUI();
				},
				error : function(request, status, error) {
					$.unblockUI();

				},
			});

}

function cargarComponentesDetalle(promo, plan, premio) {
	bloquearPantallaGris();
	$("#tablaComponente").css("display", "");
	$("#tablaCobertura").css("display", "none");

	$("#letraComponente").css("color", "#0b4376");
	$("#letraCobertura").css("color", "#a3a3a3");

	var promo = $("#valorPromoModal").val();
	var plan = $("#valorPlanModal").val();
	$.ajax({
		url : 'contenidoCobertura',
		contentType : 'application/json',
		data : {
			plan : plan,
			promo : promo
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var d1 = document.getElementById("contenidoComponente");
				d1.innerHTML = ' ';
				var panelNuevo = '';
				for ( var int = 0; int < json.length; int++) {
					panelNuevo = panelNuevo
							+ '<tr><td align="right"style="padding-top:5px;"><h6 style="font-size:13px;color:#a3a3a3">'
							+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CACX_CAPP_DE_COMPONENTE']))
							+ ' </td><td style="padding-top:5px;width:60%;"><h6 style="font-size:13px;color:#a3a3a3">'
							+ validarCampoVacioNoMostrar(formatearMoneda(json[int]['P_TF_CACX_CACX_MT_COMPONENTE']))
							+ '</h6></td></tr>';
				}
				d1.innerHTML = panelNuevo;

			} catch (e) {
				// TODO: handle exception
			}

			$.unblockUI();
		},
		error : function(request, status, error) {
			$.unblockUI();

		},
	});
}

function cargarSelectDomicilio() {

	var select = document.getElementById('selecDomicilio');
	var domicilio = select.options[select.selectedIndex].value;

	if (domicilio == "0101") {
		abrirModalIngresoDomicilio(domicilio);
	} else {
		buscarDomicilios(domicilio);
	}
}

function buscarDomicilios(domicilio) {
	var persona = $("#docPersona").val();
	$.ajax({
		url : 'buscarDomicilios',
		contentType : 'application/json',
		data : {
			persona : persona
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				$("#direccionConsecutivo").val(json[domicilio]["P_TF_CADO_CADO_CONSECUTIVO_DIRECCION"]);
				$("#codigoUbicacion").val(json[domicilio]["P_TF_CADO_CADO_GECP_NU_POSTAL"]);

				$("#callePersona").val(json[domicilio]["P_TF_CADO_CADO_DE_CALLE"]);
				$("#callePersona").val(json[domicilio]["P_TF_CADO_CADO_DE_CALLE"]);
				$("#numeroPersona").val(json[domicilio]["P_TF_CADO_CADO_DE_NUMERO"]);
				$("#pisoPersona").val(json[domicilio]["P_TF_CADO_CADO_DE_PISO"]);
				$("#deptoPersona").val(json[domicilio]["P_TF_CADO_CADO_DE_DEPARTAMENTO"]);
				$("#unidadPersona").val(json[domicilio]["P_TF_CADO_CADO_DE_UNIDAD"]);
				$("#postalPersona").val(json[domicilio]["P_TF_CADO_GECP_CD_CODIGO_POSTAL"]);
				$("#localidadPersona").val(json[domicilio]["P_TF_CADO_GECP_DE_LOCALIDAD"]);
				$("#municipioPersona").val(json[domicilio]["P_TF_CADO_GEMU_DE_MUNICIPIO"]);
				$("#provinciaPersona").val(json[domicilio]["P_TF_CADO_CAES_DE_PROVINCIA"]);

				M.updateTextFields();

				guardarDatosDomicilio();
			} catch (e) {
			}
		},
		error : function(xhr, status) {
		},
	})
}

function cargarSelectComunicacion(codigo) {
	if (codigo == 1) {
		var select = document.getElementById('telefonoPersona');
		var valor = select.options[select.selectedIndex].value;
		var conz = "15";
	}
	if (codigo == 4) {
		var select = document.getElementById('emailPersona');
		var valor = select.options[select.selectedIndex].value;
		var conz = "9";
	}

	$("#valorConz").val(conz);
	$("#comunicacionValor").val(codigo);
	$("#datoComunicacion").val(valor);

	if (valor == "0101") {
		$("#datoComunicacion").val("");
		$('#modalDatosTelefono').modal('open');
		M.updateTextFields();

	} else {
		cargarComunicacion();
	}
}

function cargarComunicacion(codigo, valor, conz) {

	var codigo = $("#comunicacionValor").val();
	var valor = $("#datoComunicacion").val();
	var conz = $("#valorConz").val();

	$.ajax({
		url : 'buscarComunicaciones',
		contentType : 'application/json',
		data : {
			codigo : codigo
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {

				$("#datoComunicacion").val(valor);
				M.updateTextFields();

				guardarDatoComunicacion();
			} catch (e) {
			}
		},
		error : function(xhr, status) {
		},

	});

}

function abrirCargaCliente() {
	var dni = $("#docPersona").val();
	$("#clienteDni").val(dni);
	M.updateTextFields();

}

function guardarDatoBanco() {
	var select = document.getElementById('datosBanco');
	var valor = select.options[select.selectedIndex].value;
	$.ajax({
		url : 'guardarDatosBanco',
		contentType : 'application/json',
		data : {
			dato : valor
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {

			} catch (e) {
			}
		},
		error : function(xhr, status) {

		},

	});

}

function cargarDatosBanco(persona) {
	$
			.ajax({
				url : 'buscarBanco',
				contentType : 'application/json',
				data : {
					persona : persona
				},
				type : 'GET',
				dataType : 'json',
				success : function(json) {
					try {

						var panelNuevo = '';
						var d1 = document.getElementById("datosBanco");
						d1.innerHTML = '';
						if (json.length > 1) {
							panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option>";
							panelNuevo = panelNuevo;
						}
						for ( var int = 0; int < json.length; int++) {
							panelNuevo = panelNuevo + "<option value=" + json[int]["P_TF_CADM_CADM_NU_CUENTA"] + ">"
									+ ocultarDato(json[int]["P_TF_CADM_CADM_NU_CUENTA"]) + "</option>";
						}
						d1.innerHTML = panelNuevo
								+ "<option value='0101'data-icon='resources/img/imagenesCotizador/addCreditCard.png' class='circle'>Agregar</option>";

						$('select').formSelect();

						guardarDatoBanco();

						M.updateTextFields();

					} catch (e) {
					}
				},
				error : function(xhr, status) {

					var panelNuevo = '';
					var d1 = document.getElementById("datosBanco");
					d1.innerHTML = '';
					panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option>";
					d1.innerHTML = panelNuevo
							+ "<option value='0101'data-icon='resources/img/imagenesCotizador/addCreditCard.png' class='circle'>Agregar</option>";

					$('select').formSelect();

					M.updateTextFields();

				},

			});

}

function ocultarDato(dato) {
	var valor = dato.substring(11, 15);
	return "xxxxxxxxxxxx" + valor;
}

function cargarDatosComunicacionTelefono(persona, cod) {
	$
			.ajax({
				url : 'buscarComunicacionesTelefono',
				contentType : 'application/json',
				data : {
					persona : persona,
					codigo : cod
				},
				type : 'GET',
				dataType : 'json',
				success : function(json) {
					try {
						var panelNuevo = '';
						var d1 = document.getElementById("telefonoPersona");
						d1.innerHTML = '';
						if (json.length > 1) {
							panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option>";
							panelNuevo = panelNuevo;
						}
						for ( var int = 0; int < json.length; int++) {
							panelNuevo = panelNuevo + "<option value=" + json[int]["P_TF_CACF_CACF_DE_COMUNICACION"]
									+ ">" + primeraLetraMayus(json[int]["P_TF_CACF_CACF_DE_COMUNICACION"])
									+ "</option>";
						}
						panelNuevo = panelNuevo
								+ "<option value='0101'data-icon='resources/img/imagenesCotizador/addPhone.png' class='circle'>Agregar</option>";
						d1.innerHTML = panelNuevo;
						$('select').formSelect();

						M.updateTextFields();

					} catch (e) {
					}
				},
				error : function(xhr, status) {

					var panelNuevo = '';
					var d1 = document.getElementById("telefonoPersona");
					d1.innerHTML = '';
					panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option>";
					d1.innerHTML = panelNuevo
							+ "<option value='0101'data-icon='resources/img/imagenesCotizador/addPhone.png' class='circle'>Agregar</option>";
					$('select').formSelect();

				},

			});

}

function cargarDatosComunicacionEmail(persona, cod) {
	$
			.ajax({
				url : 'buscarComunicaciones',
				contentType : 'application/json',
				data : {
					persona : persona,
					codigo : cod
				},
				type : 'GET',
				dataType : 'json',
				success : function(json) {
					try {

						var panelNuevo = '';
						var d1 = document.getElementById("emailPersona");
						d1.innerHTML = '';
						if (json.length > 1) {
							panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option>";
							panelNuevo = panelNuevo;
						}
						for ( var int = 0; int < json.length; int++) {
							panelNuevo = panelNuevo + "<option value=" + json[int]["P_TF_CACF_CACF_DE_COMUNICACION"]
									+ ">" + primeraLetraMayus(json[int]["P_TF_CACF_CACF_DE_COMUNICACION"])
									+ "</option>";
						}
						panelNuevo = panelNuevo
								+ "<option value='0101'data-icon='resources/img/imagenesCotizador/addEmail.png' class='circle'>Agregar</option>";
						d1.innerHTML = panelNuevo;

						$('select').formSelect();

						M.updateTextFields();

					} catch (e) {
					}
				},
				error : function(xhr, status) {

					var panelNuevo = '';
					var d1 = document.getElementById("emailPersona");
					d1.innerHTML = '';
					panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option>";
					d1.innerHTML = panelNuevo
							+ "<option value='0101'data-icon='resources/img/imagenesCotizador/addEmail.png' class='circle'>Agregar</option>";
					$('select').formSelect();

				},

			});

}

function nuevoTelefono() {
	var select = document.getElementById('telefonoPersona');
	var dato = select.options[select.selectedIndex].value;
	if (dato == 991)
		$('#modalDatosTelefono').modal('open');
}
function abrirDatosDomicilio() {
	$('#modalDatosDomicilio').modal('open');

}



function recalculoCotizacion() {
	bloquearPantallaGris();

	var select = document.getElementById('valorComision');
	var comision = select.options[select.selectedIndex].value;
	$.ajax({
		url : 'recalculoCotizacion',
		contentType : 'application/json',
		data : {
			comision : comision
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var promoA = $("#promoUno").val();
				var promoB = $("#promoDos").val();
				var promoC = $("#promoTres").val();
				location.href = "/PSPES/cotizacionStep5?promoA=" + promoA + "&promoB=" + promoB + "&promoC=" + promoC;
			} catch (e) {
				mostrarError('Error al cambiar la comision', e);
				$.unblockUI();

			}
		},
		error : function(xhr, status) {
			mostrarError('No se pudo realizar el cambio de comision, informe a sistemas con el codigo : 1847191219.');
			$.unblockUI();

		},
	});

}

function cargarTipoVehiculo() {
	var select = document.getElementById('selectorModelo');
	var modelo = select.options[select.selectedIndex].value;

	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value;

	$.ajax({
		url : 'datoTipoVehiculo',
		contentType : 'application/json',
		data : {
			modelo : modelo,
			marca : marca
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				cargarSelectorParametrico('usoVehiculo', json, '40008');
				$.unblockUI();

			} catch (e) {
				mostrarError('Error al cargar el tipo de vehiculo', e);
			}
		},
		error : function(xhr, status) {
			mostrarError('No se pudo cargar el tipo de vehiculo, informe a sistemas con el codigo : 1232161219.');
		},

	});

}


function cambiarIconoAcordeon() {
	if ($("#iconoAcordeon").hasClass('fa-angle-double-down')) {
		$("#iconoAcordeon").removeClass("fa-angle-double-down");
		$("#iconoAcordeon").addClass("fa-angle-double-up");
	} else {
		$("#iconoAcordeon").removeClass("fa-angle-double-up");
		$("#iconoAcordeon").addClass("fa-angle-double-down");
	}
}

function mostrarSegundoAseg() {
	if ($('#segundoAseg').is(':visible')) {
		$("#iconoAsegurado").removeClass("fas fa-user-minus");
		$("#iconoAsegurado").addClass("fas fa-user-plus");
		$('#mostrarPanelProd').removeClass('animated fadeIn');
		$("#segundoAseg").css("display", "none");

	} else {
		$("#segundoAseg").css("display", "");
		$('#segundoAseg').addClass('animated fadeIn');
		$("#iconoAsegurado").removeClass("fas fa-user-plus");
		$("#iconoAsegurado").addClass("fas fa-user-minus");

	}
}

function inicioCotizacion() {
	$('.datepicker').datepicker(
			{
				months : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
						'Octubre', 'Noviembre', 'Diciembre' ],
				monthsShort : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
			});

	$('input#input_text, textarea#textarea2').characterCounter();
	$('select').formSelect();
	$('.modal').modal();
	$('.tooltipped').tooltip();
	$('#fechaNac').mask('00/00/0000');

}

function validarCampo(id){
	var valor = $("#"+id).val();
	var valor;
	if(valor!= ''){
		$("#"+id+"_validar").css("display","none");
	}else{
		$("#"+id+"_validar").css("display","");
		valor = 1;
	}
	return valor;
}

function validarSelect(id){
	var select = document.getElementById(''+id);
	var valorSelect = select.options[select.selectedIndex].value;
	var valor;
	if(valorSelect!= '' && valorSelect!="Selecione.."){
		$("#"+id+"_validar").css("display","none");
	}else{
		$("#"+id+"_validar").css("display","");
		valor = 1;
	}
	return valor;
}





function inicioCotizacionStep5() {
	$('.datepicker').datepicker(
			{
				months : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
						'Octubre', 'Noviembre', 'Diciembre' ],
				monthsShort : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
			});
	$('input#input_text, textarea#textarea2').characterCounter();
	$('select').formSelect();
	$('.modal').modal();
	$('.tooltipped').tooltip();
	comisionEstandar();

	$(".botones-promociones").each(function() {
		$(this).css("pointer-events", "none");
	});

}

function inicioCotizacionStep6() {
	$('input#input_text, textarea#textarea2').characterCounter();
	$('select').formSelect();
	$('.modal').modal();
	$('.tooltipped').tooltip();
	$('#fechaNac').mask('00/00/0000');
	buscarPersona();
	M.updateTextFields();
}

function cambiarSelect() {
	$(".dropdown-content").css("height", "330px");
	$(".dropdown-content").css("top", "-290.7px");
}


function comprobarForm(){
	var valor="";
	var inputValor="";
	var selectValor="";
	$(".validarForm").each(function(i, obj){
 	   var x = document.getElementById(this.id);
	 	   if(x.type == "text"){
	    	 inputValor = validarCampo(this.id);

	 	   }else{
	    	 selectValor = validarSelect(this.id);

	 	   }
 	   }
	);
	
	 if(inputValor == 1 || selectValor== 1){
	    	valor = 1;
	    }else{
	    	valor = 0;
	    }
	    return valor;
	
}




function redirectStep4() {
	bloquearPantallaGris();
	var formData = JSON.stringify(jQuery('.datoTablaClass').serializeArray()).replace("/", "").replace("/", "");
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

	var ramo = $("#valorRamo").val();
	var objMostrar = "";
	if (ramo == "4") {
		objMostrar = datosMostrarDatosBien();
		var arrayMostrar = [];
		$.each(objMostrar, function(i, field) {
			var valor = new Object();
			valor.name = i;
			valor.value = field;
			arrayMostrar.push(valor);
		})

		var objDatosMostrar = JSON.stringify(arrayMostrar);

	}
	$.ajax({
		url : 'guardarDatosDelBien',
		contentType : 'application/json',
		data : {
			datosPantalla : formData,
			objDatosMostrar : objDatosMostrar
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var valor = comprobarForm();
				
				if(valor == 0){
					location.href = "/PSPES/cotizacionStep4";
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

function datosMostrarDatosBien() {
	var obj = new Object();
	var select = document.getElementById("40012"), text = select.options[select.selectedIndex].innerText;
	obj.annio = text;

	var select = document.getElementById("selectMarca"), text = select.options[select.selectedIndex].innerText;
	obj.marca = text;

	var select = document.getElementById("selectorModelo"), text = select.options[select.selectedIndex].innerText;
	obj.modelo = text;

	obj.precio = $("#labelSumaAsegurada").val();

	return obj
}

function comisionEstandar() {
	if ($("#switchComision").is(':checked')) {
		$('#valorComision').attr('disabled', 'disabled');
		$('#valorComision').formSelect();

	} else {
		$('#valorComision').prop("disabled", false);
		$('#valorComision').formSelect();
	}
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

function volverRedirectStep1() {
	bloquearPantallaGris();
	var esqA = $("#esqA").val();
	var esqB = $("#esqB").val();
	var prod = $("#prod").val();
	location.href = "/PSPES/cotizacionStep1?producto=" + prod + "&esqA=" + esqA + "&esqB=" + esqB;
}

function guardarDatosMostrar() {
	var select = document.getElementById("selectMedioPago"), text = select.options[select.selectedIndex].innerText;
	$("#valorMedioPago").val(text);

	var select = document.getElementById("selectOrigenPago"), text = select.options[select.selectedIndex].innerText;
	$("#valorFormaPago").val(text);

	var select = document.getElementById("condicionIVA"), text = select.options[select.selectedIndex].innerText;
	$("#valorVigencia").val(text);

	var select = document.getElementById("selectVigencia"), text = select.options[select.selectedIndex].innerText;
	$("#valorFacturacion").val(text);

	var select = document.getElementById("moneda"), text = select.options[select.selectedIndex].innerText;
	$("#valorMoneda").val(text);

}

function solonumeros(e) {
	var key = window.event ? e.which : e.keyCode;
	if (key < 48 || key > 57)
		e.preventDefault();
}



function volverRedirectStep3() {
	bloquearPantallaGris();
	location.href = "/PSPES/cotizacionStep3";

}

function RedirectStep5() {
	bloquearPantallaGris();

	var promoA = $("#promoUno").val();
	var promoB = $("#promoDos").val();
	var promoC = $("#promoTres").val();
	var promoATexto = "";
	var promoBTexto = "";
	var promoCTexto = "";

	if (promoA != "") {
		var promoATexto = $("#texto" + promoA).text();
	}
	if (promoB != "") {
		var promoBTexto = $("#texto" + promoB).text();

	}
	if (promoC != "") {
		var promoCTexto = $("#texto" + promoC).text();

	}
	if(promoA == '' && promoB == '' && promoC == ''){
		$("#titloStep4").css("color","#dc3545");
		$("#iconoTitulo").css("display","");
		$.unblockUI();

	}else{
		$("#titloStep4").css("color","#0b4376");
		$("#iconoTitulo").css("display","none");		
		$.ajax({
			url : 'guardarDatosPromo',
			contentType : 'application/json',
			data : {
				promoA : promoA,
				promoB : promoB,
				promoC : promoC,
				promoATexto : promoATexto,
				promoBTexto : promoBTexto,
				promoCTexto : promoCTexto
			},
			type : 'GET',
			dataType : 'json',
			success : function(json) {
				comprobarForm();
				location.href = "/PSPES/cotizacionStep5";
			},
			error : function(xhr, ajaxOptions, thrownError) {
				$.unblockUI();
			}
		});
	}
}



function redirectStep5Coberturas() {
	bloquearPantallaGris();

	var promoA = $("#promoUno").val();
	var promoB = $("#promoDos").val();
	var promoC = $("#promoTres").val();
	var promoATexto = "";
	var promoBTexto = "";
	var promoCTexto = "";

	if (promoA != "") {
		var promoATexto = $("#texto" + promoA).text();
	}
	if (promoB != "") {
		var promoBTexto = $("#texto" + promoB).text();

	}
	if (promoC != "") {
		var promoCTexto = $("#texto" + promoC).text();

	}

	$.ajax({
		url : 'guardarDatosPromo',
		contentType : 'application/json',
		data : {
			promoA : promoA,
			promoB : promoB,
			promoC : promoC,
			promoATexto : promoATexto,
			promoBTexto : promoBTexto,
			promoCTexto : promoCTexto
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			location.href = "/PSPES/cotizacionStep5Coberturas";
		},
		error : function(xhr, ajaxOptions, thrownError) {
			$.unblockUI();
		}
	});
}

function volverRedirectStep4() {
	bloquearPantallaGris();
	location.href = "/PSPES/cotizacionStep4";

}

function quitarSelectCardPromo() {
	$(".alto-panel-promo-seleccionado").each(function() {
		$(this).removeClass("alto-panel-promo-seleccionado");
		$(this).addClass("alto-panel-promo");
	});
	$(".alto-panel-promo-seleccionado-b").each(function() {
		$(this).removeClass("alto-panel-promo-seleccionado-b");
		$(this).addClass("alto-panel-promo-b");
	});
	$(".checkCard").each(function() {
		$(this).css("display", "none");
	});
	$(".animated").each(function() {
		$(this).removeClass("animated");
	});

	$(".pulse").each(function() {
		$(this).removeClass("pulse");
	});

}

function selecionarCotizacion(id, promo, plan, valor, descPlan) {
	if ($("#card_" + id).hasClass('animated pulse')) {
		$("#cuerpo_" + id).removeClass("alto-panel-promo-seleccionado");
		$("#check_" + id).css("display", "none");
		$("#cuerpo_" + id).addClass("alto-panel-promo");
		$("#card_" + id).removeClass("animated pulse");
	} else {
		quitarSelectCardPromo();
		$("#cuerpo_" + id).removeClass("alto-panel-promo");
		$("#cuerpo_" + id).addClass("alto-panel-promo-seleccionado");
		$("#check_" + id).css("display", "");
		$("#card_" + id).addClass("animated pulse");
	}

	$("#datoPromo").val(promo)
	$("#datoPlan").val(plan)
	$("#datoMonto").val(valor)
	$("#datoDescPlan").val(descPlan)

}

function selecionarCotizacionB(id, promo, plan, valor, descPlan) {
	if ($("#card_" + id).hasClass('animated pulse')) {
		$("#cuerpo_" + id).removeClass("alto-panel-promo-seleccionado-b");
		$("#check_" + id).css("display", "none");
		$("#cuerpo_" + id).addClass("alto-panel-promo-b");
		$("#card_" + id).removeClass("animated pulse");
	} else {
		quitarSelectCardPromo();
		$("#cuerpo_" + id).removeClass("alto-panel-promo-b");
		$("#cuerpo_" + id).addClass("alto-panel-promo-seleccionado-b");
		$("#check_" + id).css("display", "");
		$("#card_" + id).addClass("animated pulse");
	}

	$("#datoPromo").val(promo)
	$("#datoPlan").val(plan)
	$("#datoMonto").val(valor)
	$("#datoDescPlan").val(descPlan)

}

function selecionarPromo(id) {
	$("#titloStep4").css("color","#0b4376");
	$("#iconoTitulo").css("display","none");	
	
	var promoUno = $("#promoUno").val();
	var promoDos = $("#promoDos").val();
	var promoTres = $("#promoTres").val();
	var valor = $("#valor").val();
	$(".card").each(function() {
		$(this).removeClass("card-no-promo");
	});

	if (promoUno == id) {
		valor = parseInt(1);
		id = "";
		resaltarPromocionSeleccionada(promoUno);
	} else if (promoDos == id) {
		id = "";
		valor = parseInt(2);
		resaltarPromocionSeleccionada(promoDos);
	} else if (promoTres == id) {
		id = "";
		valor = parseInt(3);
		resaltarPromocionSeleccionada(promoTres);
	}

	if (valor == 1) {
		$("#promoUno").val(id)
		$("#valor").val(parseInt(valor) + 1);
		resaltarPromocionSeleccionada(id);
		if (promoUno != '') {
			resaltarPromocionSeleccionada(promoUno);
		}
	} else if (valor == 2) {
		$("#promoDos").val(id)
		$("#valor").val(parseInt(valor) + 1);
		resaltarPromocionSeleccionada(id);
		if (promoDos != '') {
			resaltarPromocionSeleccionada(promoDos);
		}
	} else {
		$("#promoTres").val(id)
		$("#valor").val(1);
		resaltarPromocionSeleccionada(id);
		if (promoTres != '') {
			resaltarPromocionSeleccionada(promoTres);
		}
	}
}

function resaltarPromocionSeleccionada(id) {
	$("#" + id).removeClass("animated pulse");
	if ($("#cuerpo_" + id).hasClass('cuerpo-card-seleccionado')) {
		$("#check_" + id).css("display", "none")
		$("#cuerpo_" + id).removeClass("cuerpo-card-seleccionado");
		$("#cuerpo_" + id).addClass("cuerpo-card");
	} else {
		$("#check_" + id).css("display", "")
		$("#cuerpo_" + id).removeClass("cuerpo-card");
		$("#cuerpo_" + id).addClass("cuerpo-card-seleccionado");
		$("#" + id).addClass("animated pulse");
	}
}

function mostrarIconoMaterial(ramo) {

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

function mostrarMontoCoberturas(e, min, max, id) {
	var importe_total = 0
	$(".amt").each(function(index, value) {
		if ($.isNumeric($(this).val())) {
			importe_total = importe_total + eval($(this).val());
		}
	});
	$("#valorCoberturas").text(formatearMonedaCotizador(importe_total));
};

