function cambiarSelect2(){
	$("#select2-selectorAccesorios-results").css("max-height","250px");
	$("#select2-selectorAccesorios-results").css("top", "-290.7px");

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
	var height = $(window).height();
    $('#rowAlto').height(parseInt(height)-parseInt(50));
    
}

function inicioCotizacion1() {
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
	var height = $(window).height();
    $('#rowAlto').height(parseInt(height)-parseInt(50));
    //$('#rowCuerpo').height(parseInt(height)-parseInt(200));
    
}

function validarCampo(id) {
	var valor = $("#" + id).val();
	var valor;
	if (valor != '') {
		$("#" + id + "_validar").css("display", "none");
	} else {
		$("#" + id + "_validar").css("display", "");
		valor = 1;
	}
	return valor;
}

function validarSelect(id) {
	var select = document.getElementById('' + id);
	var valorSelect = select.options[select.selectedIndex].value;
	var valor;
	if (valorSelect != '' && valorSelect != "Selecione..") {
		$("#" + id + "_validar").css("display", "none");
	} else {
		$("#" + id + "_validar").css("display", "");
		valor = 1;
	}
	return valor;
}

function cambiarSelect() {
	$(".dropdown-content").css("height", "330px");
	$(".dropdown-content").css("top", "-290.7px");
}

function comprobarForm() {
	var inputValor = "";
	$("#valorForm").val(0);
	$(".validarForm").each(function(i, obj) {
		var valor = $("#valorForm").val();
		var x = document.getElementById(this.id);
		if (x.type == "text") {
			inputValor = validarCampo(this.id);

		} else {
			inputValor = validarSelect(this.id);
		}
		if(inputValor == 1){
			$("#valorForm").val(inputValor);
		}
	});
	var valor = $("#valorForm").val();
	return valor;

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

