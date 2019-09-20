

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

function abrirModalDetalleCobertura(promo, plan, premio, descPromo) {
	$('#modalDetallePlan').modal('open');
	$("#valorPromoModal").val(promo);
	$("#valorPlanModal").val(plan);

	$("#textoPromo").html("Promoci&oacute;n " + descPromo);
	$("#textoPremio").text("Premio " + formatearMoneda(premio) + "/ MENSUAL");
	$("#textoPlan").text("Plan " + plan);

	detalleCoberturas(promo, plan, premio);

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

function cambiarIconoAcordeon() {
	if ($("#iconoAcordeon").hasClass('fa-angle-double-down')) {
		$("#iconoAcordeon").removeClass("fa-angle-double-down");
		$("#iconoAcordeon").addClass("fa-angle-double-up");
	} else {
		$("#iconoAcordeon").removeClass("fa-angle-double-up");
		$("#iconoAcordeon").addClass("fa-angle-double-down");
	}
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
