
function selectorOrigenPago() {
	var select = document.getElementById('selectMedioPago');
	var valorSelect = select.options[select.selectedIndex].value;
	bloquearPantallaGris();
	$.ajax({
		url : 'selectorOrigenPago',
		contentType : 'application/json',
		data : {
			medioPago : valorSelect
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var valordefault = $("#valorOrigenPago").val();
				var d1 = document.getElementById("selectOrigenPago");
				d1.innerHTML = ' ';
				var panelNuevo = '';
				for ( var int = 0; int < json.length; int++) {
					if (valordefault.trim() == json[int]['P_TF_COTC_COTC_CD_ORIGEN'].trim()) {
						panelNuevo = panelNuevo + '<option value=' + json[int]['P_TF_COTC_COTC_CD_ORIGEN']
								+ ' selected><h6>'
								+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COTC_COTC_DE_ORIGEN']))
								+ '</h6></option>';
					} else {
						panelNuevo = panelNuevo + '<option value=' + json[int]['P_TF_COTC_COTC_CD_ORIGEN'] + '><h6>'
								+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COTC_COTC_DE_ORIGEN']))
								+ '</h6></option>';
					}
				}
				d1.innerHTML = panelNuevo;
				$(document).ready(function() {
					$('#selectOrigenPago').formSelect();
				});
			} catch (e) {
				mostrarError('Por favor informe a sistema con el cod de error:928716.', e);

			}
			$.unblockUI();

		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
		},
	});
};

function selectorVigenciaTecnica() {
	var select = document.getElementById('selectVigencia');
	var valorSelect = select.options[select.selectedIndex].value;

	$.ajax({
		url : 'selectorVigenciaTecnica',
		contentType : 'application/json',
		data : {
			vigencia : valorSelect
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var d1 = document.getElementById("selectVigenciaTecnica");
				d1.innerHTML = ' ';
				var valordefault = $("#valorVigenciaTecnica").val();
				var panelNuevo = '';
				for ( var int = 0; int < json.length; int++) {
					if (valordefault.trim() == json[int]['P_TF_CAVT_CAFP_CD_VIGENCIA'].trim()) {
						panelNuevo = panelNuevo + '<option value=' + json[int]['P_TF_CAVT_CAFP_CD_VIGENCIA']
								+ ' selected><h6>'
								+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAVT_CAFP_DE_VIGENCIA']))
								+ '</h6></option>';
					} else {
						panelNuevo = panelNuevo + '<option value=' + json[int]['P_TF_CAVT_CAFP_CD_VIGENCIA'] + '><h6>'
								+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAVT_CAFP_DE_VIGENCIA']))
								+ '</h6></option>';
					}
				}
				d1.innerHTML = panelNuevo;
				$(document).ready(function() {
					$('#selectVigenciaTecnica').formSelect();
				});

				cargarSelectorPlanDePago(valorSelect);
			} catch (e) {
				// mostrarError('Por favor informe a sistema con el cod
				// de error:928716.',e);

			}
		},
		error : function(xhr, status) {
		},
	});
};

function cargarSelectorPlanDePago(vigencia) {
	bloquearPantallaGris();
	$.ajax({
		url : 'selectorPlanesPagos',
		contentType : 'application/json',
		data : {
			vigencia : vigencia
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
				var d1 = document.getElementById("selectPlanesPago");
				d1.innerHTML = ' ';
				var valordefault = $("#valorPlanPago").val();
				var panelNuevo = '';
				for ( var int = 0; int < json.length; int++) {
					if (valordefault.trim() == json[int]['P_TF_CAFR_CAFR_CD_FRAGMENT'].trim()) {
						panelNuevo = panelNuevo + '<option value=' + json[int]['P_TF_CAFR_CAFR_CD_FRAGMENT']
								+ ' selected><h6>'
								+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAFR_CAFR_DE_FRAGMENT']))
								+ '</h6></option>';
					} else {
						panelNuevo = panelNuevo + '<option value=' + json[int]['P_TF_CAFR_CAFR_CD_FRAGMENT'] + '><h6>'
								+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAFR_CAFR_DE_FRAGMENT']))
								+ '</h6></option>';
					}
				}
				d1.innerHTML = panelNuevo;
				$(document).ready(function() {
					$('#selectPlanesPago').formSelect();
				});
			} catch (e) {
				mostrarError('Por favor informe a sistema con el cod de error:928716.', e);

			}
			$.unblockUI();
		},
		error : function(xhr, status) {
			mostrarError(xhr['responseText']);
		},
	});
};

function inicioCotizacionStep2() {
	bloquearPantallaGris();
	$('input#input_text, textarea#textarea2').characterCounter();
	$(".js-select2").select2({
		placeholder : "",
		theme : "material"
	})
	$(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");
	$('.selectorMaterialice').formSelect();
	var select = document.getElementById('selectVigencia');
	var valorSelect = select.options[select.selectedIndex].value;
	cargarSelectorPlanDePago(valorSelect);

	selectorOrigenPago();
	selectorVigenciaTecnica();
	$.unblockUI();
}

function volverRedirectStep2() {
	bloquearPantallaGris();

	var valorProducto = document.getElementById("valorProducto").value;
	var esqA = document.getElementById("esqA").value;
	var esqB = document.getElementById("esqB").value;

	location.href = "/PSPES/cotizacionStep2?producto=" + valorProducto + "&esqA=" + esqA + "&esqB=" + esqB;
}



function redirectStep3() {
	bloquearPantallaGris();
	guardarDatosMostrar();
	var dataString = $('#formularioStep2').serialize();
	$.ajax({
		type : "POST",
		url : "guardarDatosGenerales",
		data : dataString,
		success : function(e, data) {
			location.href = "/PSPES/cotizacionStep3";
		},
		error : function(xhr, ajaxOptions, thrownError) {
			$.unblockUI();
		}
	});
}
