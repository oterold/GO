
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
					$("#numCliente").val(json[0]["P_TF_CABU_CABU_NU_PERSONA"])
					$("#mensajeDni").css("display", "none");
					$("#aseguradoPrincipal").css("background-color", "#2f780a");
					$("#btnAgregarPersona").css("display", "none");
					$(".ingresar-persona").each(function() {
						$(this).prop('disabled', true);
						
					});
					$("#nombreAseg").text(primeraLetraMayus(primeraLetraMayus(json[0]["P_TF_CABU_CABU_NM_APELLIDO_RAZON"]) + " "+ json[0]["P_TF_CABU_CABU_NM_PERSONA"]))
					cargarDatosModalDocumento(json);
					cargarDatosComunicacionTelefono(json[0]["P_TF_CABU_CABU_NU_PERSONA"], 1);
					cargarDatosComunicacionEmail(json[0]["P_TF_CABU_CABU_NU_PERSONA"], 4);
					cargarDatosBanco(json[0]["P_TF_CABU_CABU_NU_PERSONA"]);
					cargarDatosDomiciolio(json[0]["P_TF_CABU_CABU_NU_PERSONA"]);
					cargarNuevaPersonaEmision();
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

function guardarDatoComunicacionNueva() {
	var conz = $("#valorConz").val();
	var formData = JSON.stringify(jQuery('.datoComunicacion').serializeArray());
	M.updateTextFields();
	$.ajax({
		url : 'guardarComunicacionNueva',
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
		 complete: function (data) {
				 if(conz == 1){
					 cargarDatosComunicacionTelefonoNuevo(); 
				 }else{
					 cargarDatosComunicacionEmailNuevo();
				 }
		     }
	});
}


function cargarDatosComunicacionEmailNuevo(){
	var persona=$("#numCliente").val();
	var cod="4";
	var tam = $("#datoComunicacion").val();	
	 
	 $.ajax({
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
					panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option> <option value='0101'data-icon='resources/img/imagenesCotizador/addEmail.png' class='circle'>Agregar</option>";
					panelNuevo = panelNuevo;
				}
				for ( var int = 0; int < json.length; int++) {
					panelNuevo = panelNuevo + "<option value=" + json[int]["P_TF_CACF_CACF_DE_COMUNICACION"]
							+ ">" + primeraLetraMayus(json[int]["P_TF_CACF_CACF_DE_COMUNICACION"])
							+ "</option>";
				}
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
					  complete: function (data) {
						  posicionarSelectNuevo(tam,"emailPersona"); 
					     }

				});

	}

function cargarDatosComunicacionTelefonoNuevo(){
	var persona=$("#numCliente").val();
	var cod="1";
	var tam = $("#datoComunicacion").val();	
	$.ajax({
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
							panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option> <option value='0101'data-icon='resources/img/imagenesCotizador/addPhone.png' class='circle'>Agregar</option>";
							for ( var int = 0; int < json.length; int++) {
								panelNuevo = panelNuevo + "<option value=" + json[int]["P_TF_CACF_CACF_DE_COMUNICACION"]+ ">" + primeraLetraMayus(json[int]["P_TF_CACF_CACF_DE_COMUNICACION"])
										+ "</option>";
							}
							panelNuevo = panelNuevo;
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
					  complete: function (data) {
						  posicionarSelectNuevo(tam,"telefonoPersona"); 
					     }

				});

	}

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

function buscarDatos() {
	var formData = JSON.stringify(jQuery('.ingresoPersona').serializeArray());
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



function guardarClienteEmision() {
	bloquearPantallaGris();

	var formData = buscarDatos();

	M.updateTextFields();
	$.ajax({
		url : 'guardarCliente',
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
		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
			$.unblockUI();

		},complete: function (data) {
			location.href="/PSPES/cotizacionStep7";			
		}
	});

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
		async: false,
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
		 complete: function (data) {
			 cargarDatosDomiciolioNuevo(); 
		     }
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


function cargarDatosDomiciolio(persona) {
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
						var panelNuevo = '';
						var d1 = document.getElementById("selecDomicilio");
						d1.innerHTML = '';
						panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option> <option value='0101'data-icon='resources/img/imagenesCotizador/addHome.png' class='circle'>Agregar</option>";
						if (json.length > 1) {
							panelNuevo = panelNuevo;
						}
						for ( var int = 0; int < json.length; int++) {
							panelNuevo = panelNuevo + "<option value=" + int + ">"
									+ primeraLetraMayus(json[int]["P_TF_CADO_CADO_DE_CALLE"]) + " "
									+ json[int]["P_TF_CADO_CADO_DE_NUMERO"] + "</option>";
						}
						d1.innerHTML = panelNuevo
								+ "";

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




function cargarDatosDomiciolioNuevo(persona) {
	var tam=0;
	$.ajax({    url : 'buscarDomicilios',
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
						panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option> <option value='0101'data-icon='resources/img/imagenesCotizador/addHome.png' class='circle'>Agregar</option>";
						if (json.length > 1) {
							panelNuevo = panelNuevo;
						}
						for ( var int = 0; int < json.length; int++) {
							panelNuevo = panelNuevo + "<option value=" + int + ">"
									+ primeraLetraMayus(json[int]["P_TF_CADO_CADO_DE_CALLE"]) + " "
									+ json[int]["P_TF_CADO_CADO_DE_NUMERO"] + "</option>";
							tam = parseInt(tam)+1;
						}
						d1.innerHTML = panelNuevo
								+ "";

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
				  complete: function (data) {
					  posicionarSelectNuevo(parseInt(tam)-1,"selecDomicilio"); 
				     }
			});

}

function posicionarSelectNuevo(tam,id){
	$('#'+id).find('option[value="'+tam+'"]').prop('selected', true);
	$("#"+id).formSelect();
}


function reiniciarDomicilioPersona() {
	$("#buscarUbicacion").css("display", "");
	$("#mostrarUbicacion").css("display", "none");
	$("#mostrarUbicacionVarias").css("display", "none");
	$("#inputUbicacion").val("");
	$('#selecDomicilio').find('option[value=""]').prop('selected', true);
	$("#selecDomicilio").formSelect();
	
	
}

function abrirModalIngresoDomicilio(domicilio) {

	$('#modalIngresoDomicilio').modal('open');

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
		var texto ="Telefono";
		var conz = "1";
	}
	if (codigo == 4) {
		var select = document.getElementById('emailPersona');
		var valor = select.options[select.selectedIndex].value;
		var texto ="Email";
		conz = "4";
	}

	$("#tituloComunicacion").text(texto);
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

function reiniciarSelectTelefono(){
	$('#telefonoPersona').find('option[value=""]').prop('selected', true);
	$("#telefonoPersona").formSelect();
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
						panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option> <option value='0101'data-icon='resources/img/imagenesCotizador/addPhone.png' class='circle'>Agregar</option>";
						for ( var int = 0; int < json.length; int++) {
							panelNuevo = panelNuevo + "<option value=" + json[int]["P_TF_CACF_CACF_DE_COMUNICACION"]+ ">" + primeraLetraMayus(json[int]["P_TF_CACF_CACF_DE_COMUNICACION"])
									+ "</option>";
						}
						panelNuevo = panelNuevo;
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
							panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option> <option value='0101'data-icon='resources/img/imagenesCotizador/addEmail.png' class='circle'>Agregar</option>";
							panelNuevo = panelNuevo;
						}
						for ( var int = 0; int < json.length; int++) {
							panelNuevo = panelNuevo + "<option value=" + json[int]["P_TF_CACF_CACF_DE_COMUNICACION"]
									+ ">" + primeraLetraMayus(json[int]["P_TF_CACF_CACF_DE_COMUNICACION"])
									+ "</option>";
						}
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



function inicioCotizacionStep6() {
	$('input#input_text, textarea#textarea2').characterCounter();
	$('select').formSelect();
	$('.modal').modal();
	$('.tooltipped').tooltip();
	$('#fechaNac').mask('00/00/0000');
	buscarPersona();
	
	M.updateTextFields();
}