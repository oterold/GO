function mostrarProductosCotizacion(ramo, id, descRamo) {
	
	$("#tituloProd").css("color","#0b4376");
	$("#iconoProd").css("display","none");
	bloquearPantallaGris();
	$
			.ajax({
				url : 'productosDeLaCotizacion',
				contentType : 'application/json',
				data : {
					ramo : ramo,
					descRamo : descRamo
				},
				type : 'GET',
				dataType : 'json',
				success : function(json) {
					try {

						$("#iconoTitulo").css("display","none");
						$("#tituloRamo").css("color","#0b4376");
						$("#mostrarPanelProd").css("display", "");
						$('#mostrarPanelProd').addClass('animated fadeIn');
						$(".cardRamos").each(function() {
							$(this).css("display", "none");
						});
						$("#" + id).css("display", "");
						$("#valorRamo").val(ramo);
						$("#btnMostrarRamos").css("display", "");

						$(".sacarCheckActivado").each(function() {
							$(this).css("display", "none");
						});
						$(".sacarSeleccionCard").each(function() {
							$(this).removeClass("cuerpo-card-seleccionado");
							$(this).addClass("cuerpo-card");

						});

						$("#checkActivado_" + ramo).css("display", "")
						$("#cardActivada_" + ramo).removeClass("cuerpo-card");
						$("#cardActivada_" + ramo).addClass("cuerpo-card-seleccionado");

						$("#mostrarPanelProd").removeClass("fadeOut");
						$("#mostrarPanelProd").css("display", "");

						var d1 = document.getElementById("mostrarProductos");
						d1.innerHTML = ' ';
						var panelNuevo = '';
						var codProd = '';
						var checkActivadoProducto;
						for ( var int = 0; int < json.length; int++) {
							icono = mostrarIconoMaterial(ramo);
							cabeceraProducto = "cabeceraProducto" + json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"];
							codProd = "'" + json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"] + "'";
							descProd = "'" + json[int]["P_TF_CAPU_CAPU_DE_PRODUCTO"] + "'";
							esqA = "'" + json[int]["P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION"] + "'";
							esqB = "'" + json[int]["P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION"] + "'";
							checkActivadoProducto = "checkActivadoProducto" + json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"];
							panelNuevo = panelNuevo
									+ '<div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 cabeceraProd acomodar-card-resposive centrar-card-resposive" id='
									+ cabeceraProducto
									+ '>'
									+ '<div class="card" style="cursor:pointer;" onclick="seleccionProducto('
									+ codProd
									+ ','
									+ esqA
									+ ','
									+ esqB
									+ ','
									+ descProd
									+ ')">'
									+ '<div class="card-image cuerpo-card sacarSeleccionCardProducto" id="cardActivadaProducto'
									+ json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"]
									+ '">'
									+ icono
									+ '<a class="btn-floating halfway-fab waves-effect waves-light red sacarCheckActivadoProducto" id='
									+ checkActivadoProducto + ' style="display:none;">'
									+ '<i class="fas fa-check icono-check-ramos"></i>' + '</a>' + '</div>'
									+ '<div class="card-content texto-card">' + '<p>'
									+ json[int]["P_TF_CAPU_CAPU_DE_PRODUCTO"] + '</p>' + '</div>' + '</div>' + '</div>';
						}
						d1.innerHTML = panelNuevo;
						$.unblockUI();
					} catch (e) {
						mostrarError('Error al cargar los planes', e);

					}

				},
				error : function(xhr, status) {
					mostrarError('No se encontraron productos para el ramo seleccionado.');
				},

			});

};

function seleccionProducto(codProducto, esqA, esqB, descProducto) {

	$("#tituloProd").css("color", "#0b4376");
	$("#iconoProd").css("display","none");

	$(".cabeceraProd").each(function() {
		$(this).removeClass("animated pulse");
	});
	$(".sacarCheckActivadoProducto").each(function() {
		$(this).css("display", "none");
	});
	$(".sacarSeleccionCardProducto").each(function() {
		$(this).removeClass("cuerpo-card-seleccionado");
		$(this).addClass("cuerpo-card");

	});
	$("#checkActivadoProducto" + codProducto).css("display", "")
	$("#cardActivadaProducto" + codProducto).removeClass("cuerpo-card");
	$("#cardActivadaProducto" + codProducto).addClass("cuerpo-card-seleccionado");

	$("#valorProducto").val(codProducto);
	$("#esqA").val(esqA);
	$("#esqB").val(esqB);
	$("#descProd").val(descProducto)
	$("#cabeceraProducto" + codProducto).addClass("animated pulse");

}


function mostrarBtnRamos(id) {
	var ramo = document.getElementById("valorRamo").value;
	
	$("#valorRamo").val('');
	$("#valorProducto").val('');


	$("#btnMostrarRamos").css("display", "none");
	$(".cardRamos").each(function() {
		$(this).css("display", "");
	});

	$(".sacarSeleccionCard").each(function() {
		$(this).removeClass("cuerpo-card-seleccionado");
		$(this).addClass("cuerpo-card");

	});
	$("#checkActivado_" + ramo).css("display", "none")
	$('#mostrarPanelProd').addClass('animated fadeOut');
	$("#cardActivada_" + ramo).removeClass("cuerpo-card-seleccionado");
	$("#cardActivada_" + ramo).addClass("cuerpo-card");
	$("#mostrarPanelProd").removeClass("fadeIn");

	$('#mostrarPanelProd').css("display", "none");
}

function volverRedirectStep0() {
	bloquearPantallaGris();
	location.href = "/PSPES/cotizadorGO";

}


function redirectStep2() {
	bloquearPantallaGris();
	var valorProducto = document.getElementById("valorProducto").value;
	var valorRamo = document.getElementById("valorRamo").value;
	var esqA = document.getElementById("esqA").value;
	var esqB = document.getElementById("esqB").value;
	var descProd = document.getElementById("descProd").value;

	if(valorRamo == ''){
		$("#tituloRamo").css("color","#dc3545");
		$("#iconoTitulo").css("display","");
	}

	if(valorRamo != '' && valorProducto == ''){
		$("#tituloProd").css("color","#dc3545");
		$("#iconoProd").css("display","");
	}
	
	if(valorProducto != '' && valorRamo != ''){
		$("#tituloRamo").css("color","#0b4376");
		$("#tituloProd").css("color","#0b4376");
		$("#iconoProd").css("display","none");
		$("#iconoTitulo").css("display","none");


		
		
		$.ajax({
			url : 'guardarDatosProductoRamo',
			contentType : 'application/json',
			data : {
				prod : valorProducto,
				ramo : valorRamo,
				esqA : esqA,
				esqB : esqB,
				descProd : descProd
			},
			type : 'GET',
			dataType : 'json',
			success : function(json) {
				location.href = "/PSPES/cotizacionStep2";
			},
			error : function(xhr, ajaxOptions, thrownError) {
				$.unblockUI();
			}
		});
	}
	
	$.unblockUI();

}