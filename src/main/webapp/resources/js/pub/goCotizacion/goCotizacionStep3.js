function inicioCotizacionStep3() {
	bloquearPantallaGris();

	$('.selectorMaterialice').formSelect();
	$(".js-select2").select2({
		theme : "material",
		placeholder : 'Seleccione..'
	})
	var fecha = new Date();
	var ano = fecha.getFullYear();
	$(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");
	$('.selectorMaterialice').formSelect();

	$('.datepicker').datepicker({
		yearRange : [ 1930, ano ],
		format : 'dd/mm/yyyy'
	});

	$('#fechaNac').mask('00/00/0000');
	
	$.unblockUI();
}


function reiniciarSelect(id) {
	validarSelect("40012");
	var select = document.getElementById('selectorModelo');
	var modelo = select.options[select.selectedIndex].value;

	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value;

	if (modelo != "" || marca != "") {
		seleccionarModelo();
	}
}

function validarFechanacimiento() {
	var fecha = $("#fechaNac").val();

	$.ajax({
		url : 'validarFechaNacimiento',
		contentType : 'application/json',
		data : {
			fecha : fecha
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				if (json) {
					$("#fechaNac").css("border-color", "");
				} else {
					Swal.fire({
						type : 'error',
						title : 'Oops...',
						text : 'El cliente tiene que ser mayor de edad.',
					})
					$("#fechaNac").css("border-color", "red");
				}
				$.unblockUI();
			} catch (e) {
				mostrarError('Error al cargar el tipo de vehiculo', e);
			}
		},
		error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
		},

	});
}

function agregarAccesorios() {
	// obtengo el monto final para mostrar
	var montoFinal = $("#montoFinal").val()

	// obtengo el monto de cada accesorio
	var montoAccesorios = $("#montoAccesorios").val();

	$("#msjErrorAcessorio").css("display","none");
	
	// obtengo datos del select
	var datosAccesorios = new Object();
	datosAccesorios = llenarDatosAccesorios();
	if(datosAccesorios.valor == 00 || montoAccesorios == ''){
		$("#msjErrorAcessorio").css("display","");

	}else{
		cargarPanelAgregadoAccesorios(datosAccesorios, montoAccesorios);
		// guardo el valor final
		$("#montoFinal").val(parseInt(montoAccesorios) + parseInt(montoFinal))
		$("#listaTotalAccesorios").css("display", "");
		$("#valorAccesorios").text(formatearMonedaCotizador(parseInt(montoAccesorios) + parseInt(montoFinal)));
		setearSelectoraccesoriosInicio();
	}
}



function cargarPanelAgregadoAccesorios(obj, monto) {
	var id = '"' + obj.valor + '"';
	var panelAgregado = "<div style='width:100%;margin-bottom:0px;' class='row' id='" + obj.valor
			+ "'><div class='input-field col-md-5'><input type='hidden' class='accesorioStringSend' value="+obj.valor+";"+monto+";#>" + "<h6>" + obj.texto + "</h6>" + "</div>"
			+ "<div class='col-md-2'>" + "</div>" + "<div class='input-field col-md-2'>"
			+ "<h6 style='text-align:right;'>" + formatearMonedaCotizador(monto) + "<input type='hidden' value='"
			+ monto + "' id='monto" + obj.valor + "'/></h6>" + "</div>" + "<div class='input-field col-md-2'>"
			+ "<a style='background-color:#0b4376;' onclick='removerAccesorio(" + id
			+ ");' class='btn-floating btn-small'>" + "<i class='material-icons'>close</i></a>" + "</div></div>"
	$("#listaAccesorios").append(panelAgregado);

}

function llenarDatosAccesorios() {
	var select = document.getElementById("selectorAccesorios");
	var objectoAccesorio = new Object();
	objectoAccesorio.valor = select.value;
	objectoAccesorio.texto = select.options[select.selectedIndex].innerText;
	return objectoAccesorio;
}

function setearSelectoraccesoriosInicio() {
	$("#montoAccesorios").attr("placeholder", "$0,00").val('');
	$("#selectorAccesorios").val("00").change();
}

function removerAccesorio(id) {
	var montoFinal = $("#montoFinal").val();
	var monto = $("#monto" + id).val();

	montoFinal = parseInt(montoFinal) - parseInt(monto);
	$("#montoFinal").val(montoFinal)
	$("#valorAccesorios").text(formatearMonedaCotizador(montoFinal));
	$("#" + id).remove();
	

}



function cargarDependencias(id) {
	$("." + id).each(function(index) {
		cargarSelectorParametricoByClass(id)
	});

}

function seleccionarModelo(valor) {
	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value + ";";
	var ceroKm;
	var select = document.getElementById('40012');
	var anio = select.options[select.selectedIndex].value + ";";

	if ($("#esCeroKm").is(':checked')) {
		ceroKm = "S" + ";";
	} else {
		ceroKm = "N" + ";";
	}
	var datos = "4;" + marca + anio + ceroKm;
	var id = "selectorModelo";
	var tabla = "40021";
	cargarSelectorParametrico(id, datos, tabla);
	validarSelect(valor);
}

function cargarDatosarrayDependencias(id) {
	var arrayDatos = [];
	var classList = document.getElementById('' + id).className.split(/\s+/);
	for ( var i = 0; i < classList.length; i++) {
		if (classList[i].indexOf("d") == 0) {
			var obj = new Object();
			obj.name = classList[i];
			obj.value = "";
			arrayDatos.push(obj);
		}
	}
	return arrayDatos;
}

function cargarDatosarrayFormulario(formData) {
	var arrayForm = [];
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
		arrayForm.push(valor);
	})
	return arrayForm;
}

function cargarSelectorParametricoByClass(id) {

	var id = document.getElementsByClassName("" + id)[0].id;
	var arrayDatos = [];
	var arrayForm = [];

	arrayDatos = cargarDatosarrayDependencias(id);
	dependencias = JSON.stringify(arrayDatos);

	var formData = JSON.stringify(jQuery('.enviarForm').serializeArray());
	arrayForm = cargarDatosarrayFormulario(formData);
	formData = JSON.stringify(arrayForm);

	$.ajax({
		url : 'datosParametricosGoCotizadorGenerico',
		contentType : 'application/json',
		data : {
			dependencias : dependencias,
			formData : formData,
			tabla : id
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var d1 = document.getElementById("" + id);
				d1.innerHTML = '';
				var panelNuevo = '<option value="" selected>Seleccione..</option>';
				for ( var int = 0; int < json.length; int++) {
					panelNuevo = panelNuevo + '<option value="' + json[int]['P_TF_CRTB_CRTB_CD_DATO'] + '"><h6>'
							+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CRTB_CRTB_DE_DATO']))
							+ '</h6></option>';
				}
				d1.innerHTML = panelNuevo;
				$('#' + id).select2({
					placeholder : "",
					theme : "material"
				})
				if (id == "selectorModelo") {
					$(".modeloClass").select2({
						theme : "material",
						placeholder : 'Seleccione..'
					})
					$(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");
				} else {
					$('.selectorMaterialice').formSelect();
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);

		},

	});

}

function cargarSelectorParametrico(id, datos, tabla) {
	bloquearPantallaGris();
	$.ajax({
		url : 'datosParametricosGoCotizador',
		contentType : 'application/json',
		data : {
			dato : datos,
			tabla : tabla
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var d1 = document.getElementById("" + id);
				d1.innerHTML = '';
				var panelNuevo = '<option value="" selected>Seleccione..</option>';
				for ( var int = 0; int < json.length; int++) {
					panelNuevo = panelNuevo + '<option value="' + json[int]['P_TF_CRTB_CRTB_CD_DATO'] + '"><h6>'
							+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CRTB_CRTB_DE_DATO']))
							+ '</h6></option>';
				}
				d1.innerHTML = panelNuevo;
				$('#' + id).select2({
					placeholder : "",
					theme : "material"
				})
				if (id == "selectorModelo") {
					$(".modeloClass").select2({
						theme : "material",
						placeholder : 'Seleccione..'
					})
					$(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");
				} else {
					$('.selectorMaterialice').formSelect();
				}
				$.unblockUI();
			} catch (e) {
				mostrarError('Error al cargar los planes', e);

			}
		},
		error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
		},

	});

}

function cargarSumaAsegurada(id) {
	validarSelect(id);

	var select = document.getElementById('selectorModelo');
	var modelo = select.options[select.selectedIndex].value;

	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value;

	var ceroKm;

	var select = document.getElementById('40012');
	var anio = select.options[select.selectedIndex].value;
	if ($("#esCeroKm").is(':checked')) {
		ceroKm = "S";
	} else {
		ceroKm = "N";
	}

	cargarTipoVehiculo();

	$.ajax({
		url : 'datosSumaAsegurada',
		contentType : 'application/json',
		data : {
			modelo : modelo,
			marca : marca,
			ceroKm : ceroKm,
			anio : anio
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				$("#labelSumaAsegurada").val(json);
				$('#labelSumaAsegurada').characterCounter();

				$.unblockUI();
			} catch (e) {
				mostrarError('Error al cargar la suma asegurada', e);
			}
		},
		error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
		},

	});

}

function buscarDirecciones() {
	bloquearPantallaGris();

	var dato = $("#inputUbicacion").val();
	$
			.ajax({
				url : 'buscarUbicacion',
				contentType : 'application/json',
				data : {
					dato : dato
				},
				type : 'GET',
				dataType : 'json',
				success : function(json) {
					try {
						if (json.length > 1) {
							var panelNuevo = '';
							var d1 = document.getElementById("contenidoTablaUbicaciones");
							d1.innerHTML = '';
							$("#mostrarUbicacionVarias").css("display", "");
							for ( var int = 0; int < json.length; int++) {
								var postal = "'" + json[int]["P_TF_GECP_GECP_CD_CODIGO_POSTAL"] + "'";
								var codPostal = "'" + json[int]["P_TF_GECP_GECP_NU_POSTAL"] + "'";
								var calle = "'" + json[int]["P_TF_GECP_GECP_DE_CALLE"] + "'";
								var localidad = "'" + json[int]["P_TF_GECP_GECP_DE_LOCALIDAD"] + "'";
								var provincia = "'" + json[int]["P_TF_GECP_CAES_DE_PROVINCIA"] + "'";
								var pais = "'" + json[int]["P_TF_GECP_CAPA_DE_PAIS"] + "'";

								panelNuevo = panelNuevo
										+ '<tr>'
										+ '<td>'
										+ json[int]["P_TF_GECP_GECP_CD_CODIGO_POSTAL"]
										+ '</td>'
										+ '<td>'
										+ json[int]["P_TF_GECP_CAPA_DE_PAIS"]
										+ '</td>'
										+ '<td>'
										+ json[int]["P_TF_GECP_CAES_DE_PROVINCIA"]
										+ '</td>'
										+ '<td>'
										+ json[int]["P_TF_GECP_GECP_DE_LOCALIDAD"]
										+ '</td>'
										+ '<td>'
										+ json[int]["P_TF_GECP_GECP_DE_CALLE"]
										+ ' ('
										+ json[int]["P_TF_GECP_GECP_NU_INICIO"]
										+ ' - '
										+ json[int]["P_TF_GECP_GECP_NU_FINAL"]
										+ ')</td>'
										+ '<td><i class="material-icons" style="color:#0b4376!important;cursor:pointer;" onclick="mostrarUbicacion('
										+ codPostal + ',' + postal + ',' + calle + ',' + localidad + ',' + provincia
										+ ',' + pais + ')">exit_to_app</i></td>' + '</tr>';
							}
							d1.innerHTML = panelNuevo;
						} else {
							var codPostal = "'" + json[int]["P_TF_GECP_GECP_NU_POSTAL"] + "'";
							var postal = "'" + json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"] + "'";
							var calle = "'" + json[int]["P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION"] + "'";
							var localidad = "'" + json[int]["P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION"] + "'";
							var provincia = "'" + json[int]["P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION"] + "'";
							var pais = "'" + json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"] + "'";
							mostrarUbicacion("'" + codPostal + "'", "'" + postal + "'", "'" + calle + "'", "'"
									+ localidad + "'", "'" + provincia + "'", "'" + pais + "'");

						}
						$.unblockUI();

					} catch (e) {
						mostrarError('No se encontro un resultado con el valor ingresado.', e);
					}
				},
				error : function(xhr, status) {
			    	mostrarError(xhr['responseText']);
				},

			});

}

function reiniciarDomicilio() {
	$("#buscarUbicacion").css("display", "");
	$("#mostrarUbicacion").css("display", "none");
	$("#mostrarUbicacionVarias").css("display", "none");
	$("#inputUbicacion").val("");
}

function mostrarUbicacion(codPostal, postal, calle, localidad, provincia, pais) {
	$("#mostrarUbicacionVarias").css("display", "none");
	$("#buscarUbicacion").css("display", "none");
	$("#mostrarUbicacion").css("display", "");

	var d1 = document.getElementById("mostrarUbicacion");
	var panelNuevo = '<div class="input-field col-md-5">'
			+ '	<input type="hidden" value="1" class="ingresoDomicilioNuevo" name="valorEnviar" id="valorEnviar"/><input class="ingresoDomicilioNuevo" name="valorCodigoPostal" type="hidden" value="'
			+ codPostal
			+ '" id="valorCodigoPostal" /><input class="ingresoDomicilioNuevo" placeholder="calle"  value="'
			+ calle
			+ '" id="calleUbicacion" name="calleUbicacion" type="text">'
			+ '<label for="calleUbicacion" style="cursor:pointer;z-index:30" for="first_name">Calle *'
			+ '</label>'
			+ '</div>'
			+ '<div class="input-field col-md-2">'
			+ '</div>'
			+ '<div class="input-field col-md-2">'
			+ '<input class="ingresoDomicilioNuevo"  value="" id="numeroUbicacion" name="numeroUbicacion" type="text">'
			+ '<label for="numeroUbicacion" style="cursor:pointer;z-index:30" for="first_name">Numero *'
			+ '</label>'
			+ '</div>'
			+ '<div class="input-field col-md-1">'
			+ '<input class="ingresoDomicilioNuevo"  value="" id="pisoUbicacion" name="pisoUbicacion" type="text">'
			+ '<label for="pisoUbicacion" style="cursor:pointer;z-index:30" for="first_name">Piso'
			+ '</label>'
			+ '</div>'
			+ '<div class="input-field col-md-1">'
			+ '<input class="ingresoDomicilioNuevo"  value="" id="deptoUbicacion" name="deptoUbicacion" type="text">'
			+ '<label for="deptoUbicacion" style="cursor:pointer;z-index:30" for="first_name">Depto'
			+ '</label>'
			+ '</div>'
			+ '<div class="input-field col-md-2">'
			+ '<input class="" placeholder="codPostal"   value="'
			+ postal
			+ '" id="codPostalUb" name="codPostalUb" type="text">'
			+ '<label for="codPostalUb" style="cursor:pointer;z-index:30"  for="first_name">Cod Postal *'
			+ '</label>'
			+ '</div>'
			+ '<div class="input-field col-md-3">'
			+ '<input class="ingresoDomicilioNuevo"  value="'
			+ localidad
			+ '" id="localidadUbicacion" name="calleUbicacion" type="text">'
			+ '<label for="localidadUbicacion" style="cursor:pointer;z-index:30" for="first_name">Localidad *'
			+ '</label>'
			+ '</div>'
			+ '<div class="input-field col-md-2">'
			+ '</div>'
			+ '<div class="input-field col-md-5">'
			+ '<input class=""  value="" id="municipioUbicacion" name="municipioUbicacion" type="text">'
			+ '<label for="municipioUbicacion" style="cursor:pointer;z-index:30" for="first_name">Municipio *'
			+ '</label>'
			+ '</div>'
			+ '<div class="input-field col-md-5">'
			+ '<input class="" placeholder="provincia"   value="'
			+ provincia
			+ '" id="provinciaUbicacion" name="provinciaUbicacion" type="text">'
			+ '<label for="provinciaUbicacion" style="cursor:pointer;z-index:30" for="first_name">Provincia *'
			+ '</label>'
			+ '</div>'
			+ '<div class="input-field col-md-2">'
			+ '</div>'
			+ '<div class="input-field col-md-5">'
			+ '<input class="" placeholder="pais"  value="'
			+ pais
			+ '" id="paisUbicacion" name="paisUbicacion" type="text">'
			+ '<label for="calleUbicacion" style="cursor:pointer;z-index:30" for="first_name">Pais *'
			+ '</label>'
			+ '</div>' + '</div>';

	d1.innerHTML = panelNuevo;

	M.updateTextFields();

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
					location.href = "/PSPES/cotizacionStep4";
			} catch (e) {
				// TODO: handle exception
			}
			$.unblockUI();

		},
		error : function(xhr, ajaxOptions, thrownError) {
	    	mostrarError(xhr['responseText']);
			$.unblockUI();
		}
	});
}

function cargarAccesorios(){
	var valor = comprobarForm();
	if(valor == 0){
		var accesorioString='';
		$(".accesorioStringSend").each(function(){
			accesorioString = accesorioString + $(this).val();
	 	});
	
		if(accesorioString != ''){
			$.ajax({
				url : 'guardarDatosAccesorios',
				contentType : 'application/json',
				data : {
					accesorioString : accesorioString,
				},
				type : 'GET',
				dataType : 'json',
				success : function(json) {
					try {
					} catch (e) {
					}
					$.unblockUI();
				},
				error : function(xhr, ajaxOptions, thrownError) {
			    	mostrarError(xhr['responseText']);
					$.unblockUI();
				},
				 complete: function (data) {
					 redirectStep4(); 
				}
			});
		}else{
			redirectStep4();
		}
	}	
		
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
