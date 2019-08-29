
function inicioCotizacionComparacion(){
	$( ".cerrarModalBotonHoover" ).trigger( "click" );

}

function cargarSelectorPlanes(cotizacionA,cotizacionB,certificado){
	$.ajax({
	    url : '/PSPES/comparacionCotizacionPlanes',
	    contentType: 'application/json', 
	    data : { cotizacionA : cotizacionA,cotizacionB : cotizacionB,certificado : certificado},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		var d1 = document.getElementById("selectorPlanesPromocionCMP");
	    		var panelNuevo = "<option>Seleccione..</option>";
	    		d1.innerHTML = ' ';
	    		
	    		$.each(json, function(key, value){
	    			if(value.length == 2){
		    		panelNuevo =panelNuevo + '<option value="'+value[0]['plan']+'_'+value[0]['promo']+'_'+certificado+'">'+completarEspacios(value[0]['plan'],2) + '&nbsp;|&nbsp;'+ completarEspacios(value[0]['promo'],15) +'&nbsp;|&nbsp;'+completarEspacios(formatearMoneda(value[0]['premio']),20)+'&nbsp;|&nbsp;'+formatearMoneda(value[1]['premio'])+'</option>';
	    			}else{
			    	panelNuevo =panelNuevo + '<option value="'+value[0]['plan']+'_'+value[0]['promo']+'_'+certificado+'">'+completarEspacios(value[0]['plan'],2) + '&nbsp;|&nbsp;'+ completarEspacios(value[0]['promo'],15) +'&nbsp;|&nbsp;'+completarEspacios(formatearMoneda(value[0]['premio']),20)+'&nbsp;|&nbsp;--</option>';

	    			}
	    			});	    		
	    		d1.innerHTML =panelNuevo;
	    		
	    		
	    	} catch (e) {
	    		mostrarError('Code 465 : No se pudo cargar los certiciados');
	    	}
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
		    	mostrarError('Code 469 - Se ha producido un inconveniente al cargar los certificados!');
	    },
	});
	
	
}
function completarEspacios(dato,tam){
	var cantidad = dato.length;
	if(dato.length>=tam){
		return dato;
	}
	var llenar = parseInt(tam)-parseInt(cantidad);
	var completar='';
	for(var a = 0;a<llenar;a++){
		completar = completar + "&nbsp;"
	};
	return dato + completar;
	
}
function mostrarCotiAoB(coti){
	var cotizacionA	= $('#cotizacionActual').val();
	if(cotizacionA == coti){
		return coti = "A";
	}else{
		return coti="B";
	}
}
function cargarCoberturasComponentes(){
	var select = document.getElementById('selectorPlanesPromocionCMP');
	var valorSelect = select.options[select.selectedIndex].value;
	var plan = valorSelect.split("_")[0];
	var promo = valorSelect.split("_")[1];
	var certificado = valorSelect.split("_")[2];
	
	cargarComponentesCotizacion(plan,promo,certificado);
	cargarCoberturasCotizacion(plan,promo,certificado);
	
	$("#panelComponentes").css("display","");
	$("#mensajeComponentes").css("display","none");
	
	
}


function cargarComponentesCotizacion(plan,promo,certificado){
	var cotizacionA	= $('#cotizacionActual').val();
	var cotizacionB	= $('#cotizacionNueva').val();
	bloquearPantallaGris();

	$.ajax({
	    url : '/PSPES/comparacionCotizacionComponentes',
	    contentType: 'application/json', 
	    data : { cotizacionA : cotizacionA, cotizacionB : cotizacionB,certificado:certificado,plan:plan,promo:promo},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		bloquearPantallaGris();

	    		
	        	$("#cantIgualesComponentes").val("0");
	        	$("#cantDifComponentes").val("0");
	    		var d1 = document.getElementById("tablaCmpComponentes");
		    	d1.innerHTML = ' ';
		    	var panelNuevo = '';
		    	
	    			$.each(json, function(key, value){
	    			if(value.length > 1){
			    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="cursor:pointer;text-align:right;font-weight:400" title="'+value[0]['codigo']+'"">'+validarCampoVacio(primeraLetraMayus(value[0]['componente']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(formatearMoneda(value[0]['monto']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((value[0]['tasa']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"></h6>'+mostrarIconoComponentes(value[0]['monto'],value[0]['tasa'],value[1]['monto'],value[1]['tasa'])+'</td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(formatearMoneda(value[1]['monto']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((value[1]['tasa']))+'</h6></td>'+
			    		'</tr>';
	    			}else if(value[0]['valor'] == 0){
	    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="cursor:pointer;text-align:right;font-weight:400" title="'+value[0]['codigo']+'"">'+validarCampoVacio(primeraLetraMayus(value[0]['componente']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(formatearMoneda(value[0]['monto']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((value[0]['tasa']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"></h6>'+mostrarIconoComponentes(value[0]['monto'],value[0]['tasa'],'','')+'</td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio('')+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio('')+'</h6></td>'+
			    		'</tr>';
	    			}else{
	    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="cursor:pointer;text-align:right;font-weight:400" title="'+value[0]['codigo']+'"">'+validarCampoVacio(primeraLetraMayus(value[0]['componente']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio('')+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio('')+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"></h6>'+mostrarIconoComponentes('','',value[0]['monto'],value[0]['tasa'])+'</td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(formatearMoneda(value[0]['monto']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((value[0]['tasa']))+'</h6></td>'+
			    		'</tr>';
	    			}
	    				
	    			});

	    			d1.innerHTML = panelNuevo + '</tr>';
		    		var distintos = $("#cantDifComponentes").val();
		    		var iguales = $("#cantIgualesComponentes").val();
		    		
		    		$("#cantIgualesComponentesLabel").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
		    		$("#cantDifComponentesLabel").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");
		    		
		    		
	    	} catch (e) {
	    	 	mostrarError('No es posible realizar la comparacion de componentes. Por favor seleccione otro plan/promocion');
		    	$("#mensajeComponentes").css("display","");
	    		$("#panelComponentes").css("display","none");
	    		}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('No es posible realizar la busqueda. Por favor seleccione otro plan/promoci&oacute;n');
	    	$("#mensajeComponentes").css("display","");
    		$("#panelComponentes").css("display","none");
	    },
	});
	
}


function cargarCoberturasCotizacion(plan,promo,certificado){
	var cotizacionA	= $('#cotizacionActual').val();
	var cotizacionB	= $('#cotizacionNueva').val();
	bloquearPantallaGris();

	$.ajax({
	    url : '/PSPES/comparacionCotizacionCoberturas',
	    contentType: 'application/json', 
	    data : { cotizacionA : cotizacionA, cotizacionB : cotizacionB,certificado:certificado,plan:plan,promo:promo},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		bloquearPantallaGris();

	    		
	        	$("#cantIgualesCoberturas").val("0");
	        	$("#cantDifCoberturas").val("0");
	    		var d1 = document.getElementById("tablaCmpCoberturas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo = '';
		    	var posicion = 0;
		    	$("#datosObjCoberturas").val(JSON.stringify(json));
		    	
	    			$.each(json, function(key, value){
	    			if(value.length > 1){
		    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="'+value[0]['codigo']+'"" ">'+validarCampoVacio(primeraLetraMayus(value[0]['descripcion']))+'</h6></td>'+
		    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button onclick="mostrarDetalleCoberturas('+quitarCeroIzq(key)+',0);" style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio(formatearMoneda(value[0]['mtPrima']))+'&nbsp;  <i style="cursor:pointer;color: #0b4376;font-size:15px" class="fas fa-plus"></i></button></h6></td>'+
		    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoCoberturas(value[0]['mtPrima'],value[1]['mtPrima'])+'</h6></td>'+
		    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button onclick="mostrarDetalleCoberturas('+quitarCeroIzq(key)+',1);" style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio(formatearMoneda(value[1]['mtPrima']))+'&nbsp; <i style="cursor:pointer;color: #0b4376;font-size:15px" class="fas fa-plus"></i></button></h6></td>'+
		    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"><i onclick="mostrarTarifasCMP('+key+');"  style="cursor:pointer;color: #0b4376;font-size:15px" class="pt-3 fas fa-info-circle"></i></h6></td>'+
		    		'</tr>';
	    			}else if(value[0]['valor'] == 0){
	    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="'+value[0]['codigo']+'"" ">'+validarCampoVacio(primeraLetraMayus(value[0]['descripcion']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button onclick="mostrarDetalleCoberturas('+quitarCeroIzq(key)+',0);" style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio(formatearMoneda(value[0]['mtPrima']))+'&nbsp;  <i style="cursor:pointer;color: #0b4376;font-size:15px" class="fas fa-plus"></i></button></h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoCoberturas(value[0]['mtPrima'],'')+'</h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio('')+'&nbsp;</button></h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"><i onclick="mostrarTarifasCMP('+key+');"  style="cursor:pointer;color: #0b4376;font-size:15px" class="pt-3 fas fa-info-circle"></i></h6></td>'+
			    		'</tr>';
	    			}else{
			    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="'+value[0]['codigo']+'"" ">'+validarCampoVacio(primeraLetraMayus(value[0]['descripcion']))+'</h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio('')+'&nbsp;</button></h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoCoberturas('',value[0]['mtPrima'])+'</h6></td>'+
			    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;" title="Detalle"><button onclick="mostrarDetalleCoberturas('+quitarCeroIzq(key)+',1);" style="background:none;font-size:12px;color:black;padding-top:0px;margin-top:0px;box-shadow: none !important;" type="button" class="btn"  data-toggle="modal">'+validarCampoVacio(formatearMoneda(value[0]['mtPrima']))+'&nbsp; <i style="cursor:pointer;color: #0b4376;font-size:15px" class="fas fa-plus"></i></button></h6></td>'+
			    		'<td  role="cell"><h6 style="text-align:center;font-weight:400"><i onclick="mostrarTarifasCMP('+key+');"  style="cursor:pointer;color: #0b4376;font-size:15px" class="pt-3 fas fa-info-circle"></i></h6></td>'+
			    		'</tr>';

	    			}
		    		posicion++;
		    		});
		    		d1.innerHTML = panelNuevo + '</tr>';
		    		
		    		var distintos = $("#cantDifCoberturas").val();
		    		var iguales = $("#cantIgualesCoberturas").val();
		    		
		    		$("#cantIgualesCoberturasLabel").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
		    		$("#cantDifCoberturasLabel").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");
		    		
		    		
	    	} catch (e) {
	    	 	mostrarError('No es posible realizar la comparacion de componentes. Por favor seleccione otro plan/promocion');
		    	$("#mensajeComponentes").css("display","");
	    		$("#panelComponentes").css("display","none");	
	    		}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	     	mostrarError('No es posible realizar la busqueda. Por favor seleccione otro plan y promocion');
	    	$("#mensajeComponentes").css("display","");
    		$("#panelComponentes").css("display","none");
    		},
	});
	
}
function quitarCeroIzq(dato){
	return parseInt(dato, 10);

}


function bienesCotiCMP(){
	bloquearPantallaGris();

	var cotizacionA	= $('#cotizacionActual').val();
	var certificado	= $('#valorCertificado').val();
	var ramo = '4';
	$.ajax({
	    url : 'bienModalCoti',
	    contentType: 'application/json', 
	    data : {  ramo : ramo , cotizacion : cotizacionA , consecutivo : certificado },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	
	    	try {
	    		
	    	var d1 = document.getElementById("selectorDatosParametricosCMPA");
    		var panelNuevo = "<option>Seleccione..</option>";
    		d1.innerHTML = ' ';
    		
    		$.each(json, function(key, value){
	    		panelNuevo =panelNuevo + '<option value='+json[key]['P_TF_BIENES_CRCI_CD_BIEN_ASEG']+'><h6>('+json[key]['P_TF_BIENES_CRCI_CD_BIEN_ASEG']+') '+validarCampoVacio(primeraLetraMayus(json[key]['P_TF_BIENES_INB_BIEN_ASEG'])) +'</h6></option>';
    			});	    		
    		d1.innerHTML =panelNuevo;
    		
	    	} catch (e) {
	    		// TODO: handle exception
	    	}
	    	
	    	$.unblockUI();
	    	
	    	
	    	$("#datosParametricosCMP").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
			});
	    	
	    	
	    },
		 
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('Code 4099 - Se ha producido un inconveniente al cargar el selector de bienes!.');

	    },
	 
	   
	});
    
	
}


function mostrarParametricosCMP(){
	bloquearPantallaGris();

 
		var select = document.getElementById('selectorDatosParametricosCMPA');
		var dato = select.options[select.selectedIndex].value;
		var cotizacionA	= $('#cotizacionActual').val();
		var cotizacionB	= $('#cotizacionNueva').val();
		var certificado	= $('#valorCertificado').val();
		$.ajax({
		    url : 'comparacionCotizacionParametricos',
		    contentType: 'application/json', 
		    data : {cotizacionA : cotizacionA, cotizacionB : cotizacionB , certificado : certificado ,bien:dato},
		    type : 'GET',
		    dataType : 'json',
		    success : function (json) {
		    	
		    	try {
		    		
		    		$("#mostrarTablaParametricos").css("display","");
		    		$("#mensajeDatosParametricos").css("display","none");
		    		var d1 = document.getElementById("tablaDatosParametricos");
			    	d1.innerHTML = ' ';
			    	var panelNuevo = '';
		    			$.each(json, function(key, value){
			    			if(value.length >1){
					    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
					    		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">'+validarCampoVacio(primeraLetraMayus(value[0]['label']))+'</h6></td>'+
					    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoDato'])+'</h6></td>'+
					    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoParam(value[0]['codigoDato'],value[1]['codigoDato'])+'</h6></td>'+
					    		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[1]['codigoDato'])+'</h6></td>'+
					    		'</tr>';
					    		
			    			}else if(value[0]['valor'] == 0){
			    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">'+validarCampoVacio(primeraLetraMayus(value[0]['label']))+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoDato'])+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoParam(value[0]['codigoDato'],'')+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio('')+'</h6></td>'+
			    				'</tr>';
			    			}else{
			    				panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">'+validarCampoVacio(primeraLetraMayus(value[0]['label']))+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio('')+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoParam(value[0]['codigoDato'],'')+'</h6></td>'+
			    				'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoDato'])+'</h6></td>'+
			    				'</tr>';
			    			}
			    		});
			    		d1.innerHTML = panelNuevo + '</tr>';
		    		
			    		
			    		
			    		var distintos = $("#cantDifParamCoberturas").val();
			    		var iguales = $("#cantIgualesParamCoberturas").val();
			    		
			    		$("#cantIgualParamLabel").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
			    		$("#cantDifParamLabel").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");
		    		
		    	
		    	} catch (e) {
		    		// TODO: handle exception
		    	}
		    	
		    	$.unblockUI();
		    },
			 
		    error: function (request, status, error) {
		    	$.unblockUI();
		    	mostrarError('Code 4099 - Se ha producido un inconveniente al cargar el selector de bienes!.');

		    },
		 
		   
		});
	    
		
	}
	
function cargarLabelTarifas(value){
	var panelNuevo = '';

	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Tarifa</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoTarifa'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['codigoTarifa'],value[1]['codigoTarifa'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[1]['codigoTarifa'])+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Suma</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['suma']))+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['suma'],value[1]['suma'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[1]['suma']))+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Prima</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['primaAcum']))+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['primaAcum'],value[1]['primaAcum'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[1]['primaAcum']))+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Fecha Act.</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearFechaJson(value[0]['feActu']))+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['feActu'],value[1]['feActu'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearFechaJson(value[1]['feActu']))+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Index</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['index'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['index'],value[1]['index'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[1]['index'])+'</h6></td>'+
	'</tr>';
	
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Secuencia</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['sequencia'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['sequencia'],value[1]['sequencia'])+'</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[1]['sequencia'])+'</h6></td>'+
	'</tr>';
	
	panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">---------</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
	'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
	'</tr>';
	
	
	
	return panelNuevo;
	
}


function cargarLabelPrimeraCoti(value){
	
	var vacio = '';
	var panelNuevo = '';	
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Tarifa</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoTarifa'])+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['codigoTarifa'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Suma</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['suma']))+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['suma'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Prima</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['primaAcum']))+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['primaAcum'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Fecha Act.</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearFechaJson(value[0]['feActu']))+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['feActu'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Index</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['index'])+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['index'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Secuencia</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['sequencia'])+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['sequencia'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">---------</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">--------</h6></td>'+
		'</tr>';
		
		return panelNuevo;
		
	
}

function mostrarTarifas(tarifa){
	bloquearPantallaGris();
	
	if( $(".tarifa_"+tarifa+"").is(":visible") ){
		$(".tarifa_"+tarifa+"").each(function(){
			$(this).css("display","none");
		});
		$('#tarifaCabecera'+tarifa).css("background-color","white")
		$("#botonCollspan"+tarifa).removeClass("fas fa-caret-square-up");
		$("#botonCollspan"+tarifa).addClass("fas fa-caret-square-down");
	}else{
		$(".tarifa_"+tarifa+"").each(function(){
			$(this).css("display","");
		});
		$(".tarifa_"+tarifa+"").each(function(){
			$(this).css("background-color","#dfdfdf");
		});
		$('#tarifaCabecera'+tarifa).css("background-color","#dfdfdf")
		$("#botonCollspan"+tarifa).removeClass("fas fa-caret-square-down");
		$("#botonCollspan"+tarifa).addClass("fas fa-caret-square-up");
	}
	$.unblockUI();

}


function cargarLabelSegundaCoti(value){
	
	var vacio = '';
	var panelNuevo = '';
	var ocultar = "'"+value[0]['codigoTarifa']+"'";
	var tarifa = value[0]['codigoTarifa'];
		panelNuevo = panelNuevo +'<tr class="tr-grilla" id="tarifaCabecera'+tarifa+'" style="cursor:pointer;" onclick="mostrarTarifas('+ocultar+');">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Tarifa</h6><i class="fas fa-caret-square-down" id="botonCollspan'+tarifa+'" style="color:#0b4376!important"></i></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400"></h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['codigoTarifa'])+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Suma</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['suma'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['suma']))+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Prima</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['primaAcum'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearMoneda(value[0]['primaAcum']))+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Fecha Act.</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['feActu'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(formatearFechaJson(value[0]['feActu']))+'</h6></td>'+
		'</tr>';
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Index</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['index'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['index'])+'</h6></td>'+
		'</tr>';
		
		
		panelNuevo = panelNuevo +'<tr class="tr-grilla tarifa_'+tarifa+'" style="display:none;">'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400;">Secuencia</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+mostrarIconoTarifas(value[0]['sequencia'],vacio)+'</h6></td>'+
		'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400;">'+validarCampoVacio(value[0]['sequencia'])+'</h6></td>'+
		'</tr>';
		
		return panelNuevo;
		
	
}



function mostrarTarifasCMP(cobertura){
	bloquearPantallaGris();
	var select = document.getElementById('selectorPlanesPromocionCMP');
	var valorSelect = select.options[select.selectedIndex].value;
	var plan = valorSelect.split("_")[0];
	var promo = valorSelect.split("_")[1];
	var certificado = valorSelect.split("_")[2];
	var cotizacionA	= $('#cotizacionActual').val();
	var cotizacionB	= $('#cotizacionNueva').val();
	var certificado	= $('#valorCertificado').val();
		$.ajax({
		    url : 'comparacionCotizacionTarifas',
		    contentType: 'application/json', 
		    data : {cotizacionA : cotizacionA, cotizacionB : cotizacionB , certificado : certificado ,promo:promo,cobertura:cobertura,plan:plan},
		    type : 'GET',
		    dataType : 'json',
		    success : function (json) {
		    	
		    	try {
		    		
		    		if(Object.keys(json).length != 0){
		    		
		    		$("#cantDifTarifas").val(0);
		    		$("#cantIgualesTarifas").val(0);
		    		
		    		
		    		var d1 = document.getElementById("tablaDatosTarifas");
			    	d1.innerHTML = ' ';
			    	var labels;
			    	var panelNuevo = '';
		    			$.each(json, function(key, value){
		    				if(value.length >1){
		    					labels = cargarLabelTarifas(value);
		    					panelNuevo = panelNuevo + labels;
							}else if(value[0]['valor'] == 0){
								labels = cargarLabelPrimeraCoti(value);
		    					panelNuevo = panelNuevo + labels;
							}else{
								labels = cargarLabelSegundaCoti(value);
		    					panelNuevo = panelNuevo + labels;
							}
		    						    			
		    			});
			    		d1.innerHTML = panelNuevo + '</tr>';

			    		
			    		
			    		var distintos = $("#cantDifTarifas").val();
			    		var iguales = $("#cantIgualesTarifas").val();
			    		
			    		$("#cantIgualesDetalleTarifasLabel").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
			    		$("#cantDifDetalleTarifasLabel").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");
		    		
			    		
			    		
			    		$("#datosTarifasCMP").modal({
							 escapeClose: false,
							  clickClose: false,
							  showClose: false,
							  fadeDuration: 400,
							  fadeDelay: 0.05
						});
			    		
		    		}else{
				    	mostrarError('No se encuentran tarifas para la cobertura seleccionada.');

		    		}
			    		
		    	} catch (e) {
		    		// TODO: handle exception
		    	}
		    	
		    	$.unblockUI();
		    },
			 
		    error: function (request, status, error) {
		    	$.unblockUI();
		    	mostrarError('Code 4099 - Se ha producido un inconveniente al cargar el selector de bienes!.');

		    },
		 
		   
		});
	    
		
	}












	



function mostrarIconoParam(tasaA,tasaB){
	var distintos = $("#cantDifParamCoberturas").val();
	var iguales = $("#cantIgualesParamCoberturas").val();
	if(tasaA ==tasaB){
		iguales++;
		$("#cantIgualesParamCoberturas").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosParam' style='color:green;'></i>";
	}else{
		distintos++;
		$("#cantDifParamCoberturas").val(distintos);
		return "<i class='fas fa-not-equal iconoDiferenciasDatosParam' style='color:red;'></i>";
	}
}




function mostrarIconoTarifas(tasaA,tasaB){
	var distintos = $("#cantDifTarifas").val();
	var iguales = $("#cantIgualesTarifas").val();
	if(tasaA ==tasaB){
		iguales++;
		$("#cantIgualesTarifas").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosTarifas' style='color:green;'></i>";
	}else{
		distintos++;
		$("#cantDifTarifas").val(distintos);
		return "<i class='fas fa-not-equal iconoDiferenciasDatosTarifas' style='color:red;'></i>";
	}
}





function mostrarDetalleCoberturas(posicion,dato){
	$("#cantDifDetalleCoberturas").val(0);
	$("#cantIgualesDetalleCoberturas").val(0);
	var datos = $("#datosObjCoberturas").val();
	datos = JSON.parse(datos);
	var valorA=0;
	var valorB=1;
	var d1 = document.getElementById("datosDetalleCoberturaCMP");
	d1.innerHTML = ' ';
	var panelNuevo = '';
	
	bloquearPantallaGris();
	$.each(datos, function(key, value){

	if(key == posicion){
		for(var key2 in datos[key][valorA]){
			valorA =  datos[key][dato][key2];
	 		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			'<td  role="cell"><h6 style="padding-top:8px;text-align:right;font-weight:400">'+validarCampoVacioNull(primeraLetraMayus(key2))+'</h6></td>'+
			'<td  role="cell"><h6 style="padding-top:8px;text-align:center;font-weight:400">'+validarCampoVacioNull(valorA)+'</h6></td>'+
			'</tr>';
			};
			d1.innerHTML = panelNuevo + '</tr>';
			$("#titulo_detalle_cobertura").html("<h4 style='border:none;'>Detalle de la Cobertura "+primeraLetraMayus(datos[key][dato]["descripcion"])+"</h4>")
		}
	});

	
	$("#detalleCoberturaModal").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
	});
	
	
	$.unblockUI();


}



function mostrarIconoCoberturas(tasaA,tasaB){
	var distintos = $("#cantDifCoberturas").val();
	var iguales = $("#cantIgualesCoberturas").val();
	if(tasaA ==tasaB){
		iguales++;
		$("#cantIgualesCoberturas").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosCoberturas' style='color:green;'></i>";
	}else{
		distintos++;
		$("#cantDifCoberturas").val(distintos);
		return "<i class='fas fa-not-equal iconoDiferenciasDatosCoberturas' style='color:red;'></i>";
	}
}

function mostrarIconoComponentes(tasaA,montoA,tasaB,montoB){
	var distintos = $("#cantDifComponentes").val();
	var iguales = $("#cantIgualesComponentes").val();
	if(tasaA.trim() ==tasaB.trim() && tasaA.trim() == tasaB.trim()){
		iguales++;
		$("#cantIgualesComponentes").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosComponentes' style='color:green;'></i>";
	}else{
		distintos++;
		$("#cantDifComponentes").val(distintos);
		return "<i class='fas fa-not-equal iconoDiferenciasDatosComponentes' style='color:red;'></i>";
	}
}

function realizarComparacionCotizacion(certificado){
	
	//obtengo las coti
	var cotizacionA	= $('#cotizacionActual').val();
	var cotizacionB	= $('#cotizacionNueva').val();
	$('.cotizacionB').html(cotizacionB).css("color","black");
	$('#valorCertificado').val(certificado);
	$('.cotizacionA').html(cotizacionA).css("color","black");
	
	
	$("#mostrarTablaParametricos").css("display","none");
	$("#mensajeDatosParametricos").css("display","");
	
	$.ajax({
	    url : '/PSPES/cantidadCertificados',
	    contentType: 'application/json', 
	    data : { cotizacion : cotizacionA},
	    type : 'GET',
	    dataType : 'json',
	    success : function (jsonA) {
	    	try {
	    		bloquearPantallaGris();

		    		$.ajax({
		    		    url : '/PSPES/cantidadCertificados',
		    		    contentType: 'application/json', 
		    		    data : { cotizacion : cotizacionB},
		    		    type : 'GET',
		    		    dataType : 'json',
		    		    success : function (json) {
		    		    	try {

		    		    		var cantidadCertificadosA = jsonA.length;
		    			    		
		    		    		var cantidadCertificadosB = json.length;
		    		    		
		    		    		cargarCertificadosCotizaciones(cantidadCertificadosA,cotizacionA,cantidadCertificadosB,cotizacionB);
		    		    		compararCotizaciones(certificado);
		    		    		cargarSelectorPlanes(cotizacionA,cotizacionB,certificado);
		    		    		
		    		    		$("#datosCabecera").css("display","");
		    		    		
		    		    		$("#panelBCertificadosCMP").css("display","");
		    		    		$("#mensajePanelCertificado").css("display","none");
		    		    		
		    		    		
		    		    		
		    		    		
		    		    		$("#mensajeComponentes").css("display","");
		    		    		$("#panelComponentes").css("display","none");
		    		    		
		    		    		
		    		    	} catch (e) {
		    		    		mostrarError('Code 465 : No se pudo cargar los certiciados');
		    		    	}
		    		    },
		    		    error: function (request, status, error) {
		    		    	$.unblockUI();
		    			    	mostrarError('Code 469 - Se ha producido un inconveniente al cargar los certificados!');
		    		    },
		    		});
		    		
		    	$.unblockUI();

	    	} catch (e) {
	    		mostrarError('Code 465 : No se pudo cargar los certiciados');
	    	}
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
		    	mostrarError('Code 469 - Se ha producido un inconveniente al cargar los certificados!');
	    },
	});
	
}


function cargarCertificadosCotizaciones(cantidadA,cotiA,cantidadB,cotiB){
	var tam = 0;
	var menor = 0;
	var cartificadoMayor = 0;
	var cartificadoMenor = 0;
	var cotiMayor = 0;
	var cotiMenor = 0
	if(cantidadA >= cantidadB){
		tam = cantidadA;
		menor = cantidadB;
		cartificadoMayor = "Cotizaci&oacute;n A";
		cartificadoMenor = "Cotizaci&oacute;n B";
		cotiMayor= cotiA;
		cotiMenor= cotiB;
		
	}else{
		tam = cantidadB;
		menor = cantidadA;
		cartificadoMayor = "Cotizaci&oacute;n B";
		cartificadoMenor = "Cotizaci&oacute;n A";
		cotiMayor = cotiB;
		cotiMenor = cotiA;
	}
	
	var d1 = document.getElementById("panelBCertificadosCMP");
	d1.innerHTML = ' ';
	var panelNuevo = '';
	
	for(var int =0;int<tam;int++){
		panelNuevo=panelNuevo + '<div style="cursor:pointer; background-color:#ffffff">'+
	    '<div class="timeline__post seleccionPanelB" onclick="realizarComparacionCotizacion('+int+');" id="certificadoCotizacionComparacion'+int+'" style="cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px">'+
	        '<div class="timeline__content" style="overflow:hidden;">'+
	            '<i class="material-icons altoIcono"  style="color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;">note</i>'+
	            '<h6>'+
	                '<b>Certificado : '+int+'</b>'+
	            '</h6>'+
	            '<h6 style="padding-top:3px;font-weight:400">'+
	            	cartificadoMayor+" : "+ cotiMayor +
	            '</h6>'+
	            '<h6 style="padding-top:3px;font-weight:400" id="iconoCertificadoMenor'+int+'"> '+
            	cartificadoMenor+" : -" +
            	'</h6>'+
	        '</div>'+
	    '</div>'+
	'</div>';
	}
	d1.innerHTML = panelNuevo;

	for(var int =0;int<menor;int++){
	$('#iconoCertificadoMenor'+int).html(cartificadoMenor+" : "+ cotiMenor);
	}



}

function cargarListarCertificadosCoti(cotizacion,id){
	bloquearPantallaGris();

	$.ajax({
	    url : '/PSPES/cantidadCertificados',
	    contentType: 'application/json', 
	    data : { cotizacion : cotizacion},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
		    		$('#'+id).val(json.length);
	    	} catch (e) {
	    		mostrarError('Code 465 : No se pudo cargar los certiciados');
	    	}
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
		    	mostrarError('Code 469 - Se ha producido un inconveniente al cargar los certificados!');
	    },
	});
}


function compararCotizaciones(certificado){

bloquearPantallaGris();
	
var cotizacionA	= $('#cotizacionActual').val();
var cotizacionB	= $('#cotizacionNueva').val();


$.ajax({
    url : '/PSPES/comparacionCotizacion',
    contentType: 'application/json', 
    data : { cotizacionA : cotizacionA , cotizacionB : cotizacionB, certificado :certificado },
    type : 'GET',
    dataType : 'json',
    success : function (json) {
    	try {
    		
    	$("#valoresDistintosCabecera").val("0");
    	$("#valoresIgualesCabecera").val("0");
    		
    		var d1 = document.getElementById("tablaComparacionCabecera");
	    	d1.innerHTML = ' ';
	    	var panelNuevo = '';
	    	
	    		for ( var int = 0; int < json.length ; int++) {
	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	    		'<td  role="cell"><h6 style="text-align:right;font-weight:400">'+validarCampoVacio((json[int]['etiqueda']))+'</h6></td>'+
	    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio((json[int]['valorDatoA']))+'</h6></td>'+
	    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+resultadoComparacion(json[int]['resultadoDeLaComparacion'])+'</h6></td>'+
	    		'<td  role="cell"><h6 style="text-align:center;font-weight:400">'+validarCampoVacio(json[int]['valorDatoB'])+'</h6></td>'+
	    		'</tr>';
	    		}
	    		d1.innerHTML = panelNuevo + '</tr>';
	    		
	    		var distintos = $("#valoresDistintosCabecera").val();
	    		var iguales = $("#valoresIgualesCabecera").val();
	    		
	    		$("#cantIgualesCabecera").html("Iguales : <a id='igualesCabecera' style='color:green'>"+iguales+" </a>").css("display","");
	    		$("#cantDifCabecera").html("Diferencias : <a id='igualesCabecera' style='color:red'>"+distintos+" </a>").css("display","");

	    		$("#certificadoCotizacionComparacion"+certificado).css("background-color","#bac2bb");
	    		
    	} catch (e) {
    		mostrarError('Code 465 : No se pudo cargar los planes');
    	}
    	$.unblockUI();
    },
    error: function (request, status, error) {
    	$.unblockUI();
	    	mostrarError('Code 469 - Se ha producido un inconveniente al obtener los planes de la cotizacion!');

    },
   
});

}

function mostrarDeferenciasCabecera(dato,label){
	bloquearPantallaGris();	
	var padreIcono=$("."+dato).parent().closest('tr');
	if( padreIcono.is(":visible") ){
		padreIcono.css("display","none");
		$("#"+label).append("<i class='fas fa-check' id='remover_"+label+"'></i>");
	}else{
		padreIcono.css("display","");
		$("#remover_"+label).remove();

	}
	$.unblockUI();

}


function resultadoComparacion(valor){
	var distintos = $("#valoresDistintosCabecera").val();
	var iguales = $("#valoresIgualesCabecera").val();
	if(valor){
		iguales++;
		$("#valoresIgualesCabecera").val(iguales);
		return "<i class='fas fa-equals iconoIgualDatosCabecera' style='color:green;'></i>";
		
	}else{
		distintos++;
		$("#valoresDistintosCabecera").val(distintos);
		return "<i class='fas fa-not-equal iconoDistintosDatosCabecera' style='color:red;'></i>";
	}
	
}