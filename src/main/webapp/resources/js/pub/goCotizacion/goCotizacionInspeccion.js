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
	
	if(id == 'coordinarNuevaInspeccion'){
		var height = $(window).height();
		var altoPanel = $("#collapseTwo").height();
		$('#rowAlto').height(parseInt(height)+ parseInt(altoPanel));
		$('#rowCuerpo').height(parseInt(height)+ parseInt(altoPanel) - parseInt(300));
	}else if(id ="gestionarInspeccion"){
		var height = $(window).height();
	    $('#rowAlto').height(parseInt(height)-parseInt(50));
	    $('#rowCuerpo').height(parseInt(height)-parseInt(50));
	}
	else{
		var height = $(window).height();
	    $('#rowAlto').height(parseInt(height)-parseInt(100));
	    $('#rowCuerpo').height(parseInt(height)-parseInt(100));
	}
	
}

function botonNuevaInspeccion(id){
	bloquearPantallaGris();
	$(".botonInspeccion").each(function(){
		$(this).css("display","none");
	});
	
	$("#"+id).css("display","");
	
    $.unblockUI();
	
}


function limpiarTodasLasFotos(){
	bloquearPantallaGris();

	$("#labelArchivo1").css("display","none");
	$("#imgArchivo1").css("display","none");
	
	$("#labelArchivo2").css("display","none");
	$("#imgArchivo2").css("display","none");
	
	$("#labelArchivo3").css("display","none");
	$("#imgArchivo3").css("display","none");

	$("#labelArchivo4").css("display","none");
	$("#imgArchivo4").css("display","none");
	
	$("#totalArchivosSubidos").val("0");

	$("#labelNombre1").css("display","none");
	$("#labelNombre2").css("display","none");
	$("#labelNombre3").css("display","none");
	$("#labelNombre4").css("display","none");
	
	$("#borrarTodasLasImagenesBotom").css("display","none");
	
    $.unblockUI();
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


function inicioCotizacionInspeccion(){
	
	$('.datepicker').datepicker({
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
    $('#rowAlto').height(parseInt(height)-parseInt(0));
    $('#rowCuerpo').height(parseInt(height)-parseInt(0));
    
	document.getElementById('files').addEventListener('change',handleFileSelect, false);

    $('#files').fileupload({
        dataType: 'json',
        done: function (e, data) {
        	
        	bloquearPantallaGris();

        	var cantidadDeArchivos = $("#totalArchivosSubidos").val();
        	
        	if(data.result["code"] == "0"){
        		Swal.fire(
      				  '',
      				  ''+data.result["data"]["errorMsg"],
      				  'error'
      				)
        		return false;
        	}
        	
        	$("#borrarTodasLasImagenesBotom").css("display","");
        	bloquearPantallaGris();
			if (cantidadDeArchivos == "0") {
				$("#archivo1").val(data.result["data"]["secuencia"] + "." + data.result["data"]["extension"]);			
				$("#totalArchivosSubidos").val("1");
				
				$("#labelArchivo1").html(data.result["data"]["name"]);
				$("#labelArchivo1").css("display","");
				$("#imgArchivo1").css("display","");
				$("#labelNombre1").css("display","");

				
			}
			if (cantidadDeArchivos == "1") {
				$("#archivo2").val(data.result["data"]["secuencia"] + "." + data.result["data"]["extension"]);
				
				$("#labelArchivo2").html(data.result["data"]["name"]);
				$("#labelArchivo2").css("display","");
				$("#imgArchivo2").css("display","");
				$("#totalArchivosSubidos").val("2");

				$("#labelNombre2").css("display","");

			}
			if (cantidadDeArchivos == "2") {
				$("#archivo3").val(data.result["data"]["secuencia"] + "." + data.result["data"]["extension"]);
				$("#totalArchivosSubidos").val("3");
				
				$("#labelArchivo3").html(data.result["data"]["name"]);
				$("#labelArchivo3").css("display","");
				$("#imgArchivo3").css("display","");
				$("#labelNombre3").css("display","");

			}
			if (cantidadDeArchivos == "3") {
				$("#archivo4").val(data.result["data"]["secuencia"] + "." + data.result["data"]["extension"]);
				$("#totalArchivosSubidos").val("4");
				
				$("#labelArchivo4").html(data.result["data"]["name"]);
				$("#labelArchivo4").css("display","");
				$("#imgArchivo4").css("display","");
				$("#labelNombre4").css("display","");

			}	
			
	        $.unblockUI();      
	        }
	
    });
    
}
function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	var archivos = files.length;
	if (archivos <= 4) {
		for ( var i = 0, f; f = files[i]; i++) {
			// Only process image files.
			if (!f.type.match('image.*')) {
				continue;
			}
			var reader = new FileReader();
			reader.onload = (function(theFile) {
				return function(e) {
					var span = document.createElement('span');
					span.innerHTML = [ '<img class="thumb" src="',
							e.target.result, '" title="', escape(theFile.name),
							'"/>' ].join('');
					document.getElementById('list').insertBefore(span, null);
				};
			})(f);
			reader.readAsDataURL(f);
		}
	} else {
		 Swal.fire(
				  '',
				  'Por favor seleccionar menos de 4 imagenes!',
				  'info'
				)
	}
}

function eliminarImg()
{
	const file = document.querySelector('.file');
	file.value = '';
	var d1 = document.getElementById("list");
	d1.innerHTML = '<output id="list"></output>';
}


function validaImg()
{
	var file = document.querySelector("#files");
	  if ( /\.(jpg|png|pdf|doc|docx)$/i.test(file.files[0].name) === false ) 
	  { 
		  eliminarImg();
		  Swal.fire(
				  '',
				  'La extensi\u00F3n de la imagen no es valida, por favor ingrese .jpg, .pdf o .png!',
				  'Error'
				)
	  }
}



function enviarInspeccion(){
	bloquearPantallaGris();
	var arrayDatos = [];
	$(".asociarInspeccionCheck").each(function(){
		var valor = $(this).children('input');
		if ($("#"+valor[0].id).prop('checked')) {
		var obj = new Object();
		obj.value = valor[0].id;
		arrayDatos.push(obj);
		}
	});
	if(arrayDatos.length == 0){
		Swal.fire(
				  '',
				  'Asocie un n\u00FAmero de inspecci\u00F3n a la cotizaci\u00F3n.',
				  'info'
				)
				$.unblockUI();

	}else{
		formData = JSON.stringify(arrayDatos);
		$.ajax({
			url : 'asociarInspeccionNueva',
			contentType : 'application/json',
			data : {
				numerosInspeccion : formData,
			},
			type : 'GET',
			dataType : 'json',
			success : function(json) {
				try {
					location.href="/PSPES/cotizacionStep9"
				} catch (e) {
				}
			},
			error : function(xhr, status) {
		    	mostrarError(xhr['responseText']);
			},complete: function (data) {
				$.unblockUI();
			}
		});
	}
}


function enviarInspeccionImagenes() {
	bloquearPantallaGris();
	if($("#totalArchivosSubidos").val() > 3){
		var formData = jQuery('.imagenesForm').serialize();
		$.ajax({
			type : "POST",
			url : "imagenesInspeccion",
			data : formData,
			success : function(e, data) {
				location.href="/PSPES/cotizacionStep9"
			},
			error : function(xhr, ajaxOptions, thrownError) {
				mostrarError(xhr['responseText']);
				$.unblockUI();
			},complete: function (data) {
				$.unblockUI();
			}
			
		});
	}else{
		 Swal.fire(
				  '',
				  'Seleccione al menos 4 imagenes!',
				  'info'
				)
		$.unblockUI();
	}
}





function enviarInspeccionNueva() {
	bloquearPantallaGris();
	var formData = JSON.stringify(jQuery('.inspeccionDinamico').serializeArray()).replace("/", "").replace("/", "");
	$.ajax({
		url : 'generarInspeccionNueva',
		contentType : 'application/json',
		data : {
			datosPantalla : formData
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
			} catch (e) {
				
			}
		},
		error : function(xhr, ajaxOptions, thrownError) {
			mostrarError(xhr['responseText']);
			$.unblockUI();
		},
		 complete: function (data) {
			 asociarInspeccion(); 
		}
	});
}



function asociarInspeccion() {
	bloquearPantallaGris();
	$.ajax({
		url : 'asociarInspeccion',
		contentType : 'application/json',
		data : {
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
			} catch (e) {
				
			}
		},
		error : function(xhr, ajaxOptions, thrownError) {
			mostrarError(xhr['responseText']);
			$.unblockUI();
		},
		 complete: function (data) {
			 enviarInspeccionImagenes(); 
		}
	});
}
 








