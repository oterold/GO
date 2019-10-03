
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


function volverRedirectStep3() {
	bloquearPantallaGris();
	location.href = "/PSPES/cotizacionStep3";

}


