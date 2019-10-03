function cambiarIconoAcordeonInspeccion(id) {
	$(".acoordeonInspeccion").each(function(){
		$(this).removeClass("fa-angle-double-up");
		$(this).addClass("fa-angle-double-down");
	});

	
	if ($("#"+id).hasClass('fa-angle-double-down')) {
		$("#"+id).removeClass("fa-angle-double-down");
		$("#"+id).addClass("fa-angle-double-up");
	} else {
		$("#"+id).removeClass("fa-angle-double-up");
		$("#"+id).addClass("fa-angle-double-down");
		
		
		
	}
	
}

function validarCodigoPostal(id){
	$("#"+id).prop('checked', false);
	Swal.fire(
			   '',
			  'Tiene que informar el c&oacute;digo postal.',
			  'info'
			)
}

function mostrarParticular(){
	var dato = $("#lugarInspeccion").val();
	ocultarUbicaciones();
	
	if(dato == '' || dato == null){
		validarCodigoPostal('checkParticular');
	}else{
		bloquearPantallaGris();
				$.ajax({
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
								mostrarError('No se encontro un resultado con el valor ingresado.');
							},
			
						});

	}
}
function ocultarUbicaciones(){
	$("#direccionCentroInspeccion").css("display","none");
	$("#mostrarUbicacionVarias").css("display","none");
	$("#mostrarUbicacion").css("display","none");
}
function mostrarCentrosInspeccion(){
	var dato = $("#lugarInspeccion").val();
	ocultarUbicaciones();
	if(dato == '' || dato == null){
		validarCodigoPostal('checkCentroInspeccion');
	}else{
		bloquearPantallaGris();
		$("#direccionCentroInspeccion").css("display","");
		$.unblockUI();
	}

}



function buscarInspecciones(idTablaParametricos){
	input = document.getElementById("inputBusquedaInspeccion");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);
	
}
