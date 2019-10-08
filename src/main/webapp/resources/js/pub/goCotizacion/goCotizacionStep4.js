
function selecionarPromo(id) {
	$("#titloStep4").css("color","#0b4376");
	$("#iconoTitulo").css("display","none");	
	
	var promoUno = $("#promoUno").val();
	var promoDos = $("#promoDos").val();
	var promoTres = $("#promoTres").val();
	if(promoUno == id || promoDos == id || promoTres == id){
		if(promoUno == id){
		removerPromocionSeleccionada(id);
		$("#promoUno").val('');
			if(promoDos!=''){
				$("#promoUno").val($("#promoDos").val());
				$("#promoDos").val('');
				if(promoTres!=''){
					$("#promoDos").val($("#promoTres").val());
					$("#promoTres").val('');
				}
			}
		}
			else if(promoDos == id){
			removerPromocionSeleccionada(id);
			$("#promoDos").val('');
			if(promoTres != ''){
				$("#promoDos").val($("#promoTres").val());
				$("#promoTres").val('');
				}
			}
				else if (promoTres == id){
				removerPromocionSeleccionada(id);
				$("#promoTres").val('');
				}
	}
	else{
		if(sobrePasaLimitePromos()){
		removerPromocionSeleccionadaYswap(id);
		}
		else{
		resaltarPromocionSeleccionada(id);
		}
		}
}

function sobrePasaLimitePromos(){
	if ($("#promoUno").val()!='' && $("#promoDos").val()!='' && $("#promoTres").val()!='')
		return true;
	else
		return false;
}
function removerPromocionSeleccionadaYswap(id){
	$("#" + $("#promoUno").val()).removeClass("animated pulse");
	if ($("#cuerpo_" + $("#promoUno").val()).hasClass('cuerpo-card-seleccionado')) {
		$("#check_" + $("#promoUno").val()).css("display", "none")
		$("#cuerpo_" + $("#promoUno").val()).removeClass("cuerpo-card-seleccionado");
		$("#cuerpo_" + $("#promoUno").val()).addClass("cuerpo-card");
		$("#check_" + id).css("display", "")
		$("#cuerpo_" + id).removeClass("cuerpo-card");
		$("#cuerpo_" + id).addClass("cuerpo-card-seleccionado");
		$("#" + id).addClass("animated pulse");
		$("#promoUno").val(id);
}
}
function removerPromocionSeleccionada(id) {
	$("#" + id).removeClass("animated pulse");
	$("#cuerpo_" + id).hasClass('cuerpo-card-seleccionado')
	$("#check_" + id).css("display", "none")
	$("#cuerpo_" + id).removeClass("cuerpo-card-seleccionado");
	$("#cuerpo_" + id).addClass("cuerpo-card");
}

function resaltarPromocionSeleccionada(id)  {
		$("#check_" + id).css("display", "")
		$("#cuerpo_" + id).removeClass("cuerpo-card");
		$("#cuerpo_" + id).addClass("cuerpo-card-seleccionado");
		$("#" + id).addClass("animated pulse");
		if($("#promoUno").val()=='')
			$("#promoUno").val(id);
		else if($("#promoDos").val()=='')
			$("#promoDos").val(id);
		else{
			$("#promoTres").val(id);
		}
	}

function soloResaltarPromocionSeleccionada(id)  {
	$("#check_" + id).css("display", "")
	$("#cuerpo_" + id).removeClass("cuerpo-card");
	$("#cuerpo_" + id).addClass("cuerpo-card-seleccionado");
	$("#" + id).addClass("animated pulse");
}

function inicioCotizacion4(){
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
	if(promocionSeleccionadaA.value != ''){
		$("#promoUno").val(promocionSeleccionadaA.value);	
		soloResaltarPromocionSeleccionada($("#promoUno").val())
	}
	if(promocionSeleccionadaB.value != ''){
		$("#promoDos").val(promocionSeleccionadaB.value);	
		soloResaltarPromocionSeleccionada($("#promoDos").val())
	}
	if(promocionSeleccionadaC.value != ''){
		$("#promoTres").val(promocionSeleccionadaC.value);	
		soloResaltarPromocionSeleccionada($("#promoTres").val())
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


