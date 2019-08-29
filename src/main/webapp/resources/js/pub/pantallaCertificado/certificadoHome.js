function mostrarDetalleCertificadoSeleccionado(idPopUp, nroCertificado, poliza, ramo, sucursal){
	var valorEndoso=document.getElementById("valorPolizaEndoso").value;
	$.ajax({
	    url : '/PSPES/certificadoCab',
	    contentType: 'application/json', 
	    data : { nroCertificado : nroCertificado , ramo : ramo , poliza : poliza , sucursal: sucursal },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
				
	    			llenarDinamicamente(json);
			    	$('#INFO_P_TF_CERT_CACE_NU_CERTIFICADO').html("Certificado "+ '<b>' + '#'+ json['P_TF_CERT_CACE_NU_CERTIFICADO'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_CAMD_CD_MEDIO_PAGO').html('<b>'+json['P_TF_CERT_CACE_CAMD_CD_MEDIO_PAGO']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_MEDIO_PAGO'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_COTC_CD_ORIGEN').html('<b>'+json['P_TF_CERT_CACE_COTC_CD_ORIGEN']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_ORIGEN'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_CJIV_CD_CATEGORIA_IVA').html('<b>'+json['P_TF_CERT_CACE_CJIV_CD_CATEGORIA_IVA']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_CD_CATEGORIA_IVA'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_CAZB_CD_PROMOCION').html('<b>'+json['P_TF_CERT_CACE_CAZB_CD_PROMOCION']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_PROMOCION'] + '</b>');
			    	$('#INFO_P_TF_CERT_CACE_ST_CERTIFICADO').html('<b>'+json['P_TF_CERT_CACE_ST_CERTIFICADO']+'</b>' + ' - ' + '<b>'+json['P_TF_CERT_INB_ST_CERTIFICADO'] + '</b>');
			    	
			    	if(json['P_TF_CERT_CACE_CAMD_CD_MEDIO_PAGO'] === '2'){
			    	$('#INFO_P_TF_CUENTA').html('<b>'+validarCampoVacio(codigoTarjeta(json['P_TF_CERT_INB_NU_CUENTA']))+'</b>');
			    	$('#INFO_NOMBRE_CAMPO').html('Tarjeta :');
			    	}
			    	else{
				    	$('#INFO_P_TF_CUENTA').html('<b>'+validarCampoVacio(json['P_TF_CERT_INB_NU_CUENTA'])+'</b>');
				    	$('#INFO_NOMBRE_CAMPO').html('Cbu :');

			    	}
			    	
			    	$('#INFO_SUCURSAL').text(sucursal);
			    	$('#INFO_POLIZA').text(poliza);
			    	$('#INFO_CERTIFICADO').text(nroCertificado);
			    	$('#INFO_RAMO').text(ramo);
			    	abrirPopUpNuevo(idPopUp);	

	    	} catch (e) {
	    		alert('Code 778 : No pudo cargar.');
	    	}
	    
	    	$.ajax({
	    	    url : 'datosExtraPoliza',
	    	    contentType: 'application/json', 
	    	    data : { certificado : nroCertificado, ramo : ramo,poliza : poliza , sucursal: sucursal,endoso:valorEndoso},
	    	    type : 'GET',
	    	    dataType : 'json',
	    	    success : function (json) {
	    	    	try {
	    	    		$('#DATO_EXTRA_BIEN').html('<b>'+validarCampoVacio((json[0]['P_TF_DATOS_INB_DE_RIESGO']))+'</b>');
	    	    		$('#DATO_EXTRA_SUMA_ASEG').html('<b>'+validarCampoVacio(formatearMoneda(json[0]['P_TF_DATOS_INB_MT_SUMA_ASEGURADA']))+'</b>');
	    	    		$('#DATO_EXTRA_PLAN').html('<b>'+validarCampoVacio((json[0]['P_TF_DATOS_INB_CD_PLAN']))+ " - "+validarCampoVacio((json[0]['P_TF_DATOS_INB_DE_PLAN']))+'</b>');
				    	
	        	    	
	        	    	} catch (e) {
	        	    		mostrarError('Disculpe, existio un problema codigo:11113',e);	     
	        	    	}	        	    	
	        	    	$.unblockUI();
	        	    },
	        		 
	        	    error: function (request, status, error) {
	        	    	$.unblockUI();
	        	    	mostrarError('33 - Se a producido un inconveniente al cargar los certificados de la poliza!');

	        	       },
	        	   
	        	   });
	    
	    
	    
	    
	    
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('33 - Se a producido un inconveniente al cargar los certificados de la poliza!');
	    },
	   
	});
	
}

function codigoTarjeta(numero){
	if(numero == ''){
		return "</b><a style='color:#bfbac2;'>Sin dato</a>";
	}
	var dato = numero.substring(12,numero.length);
	return "xxxx xxxx xxxx " + dato;
}

function mostrarBienes(obj,endoso,card,numeroEndoso,poliza,ramo, sucursal, nroCertificadoCabecera,producto,prestador,identificador,alarma) {
	
	
	
	bloquearPantallaGris();
	$("#valorEndosoCertificadoHome").val(numeroEndoso);
	
	$("#valorPrestadorCertificadoHome").val(prestador);
	$("#valorNumCodCertificadoHome").val(producto);
	$("#valorAlarmaCertificadoHome").val(alarma);
	$("#valorIdentificadorCertificadoHome").val(identificador);
	

  	$(".timeline__post").each(function(){
 	    $(this).css("background","white");
 	});
 	
	$('#timeLineItemEndoso'+card).css("background","#bac2bb");
	$.ajax({
	    url : 'bienesCertificado',
	    contentType: 'application/json', 
	    data : {  producto : producto , ramo : ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	
	    	try {
	    		
	    	var d1 = document.getElementById("selectorBienCertificado");
	    	d1.innerHTML = ' ';
	    	var panelNuevo = '';
	    	for ( var int = 0; int < json.length ; int++) {
	    		pos = int +1;
	    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_PARAM_CRPB_CD_BIEN_ASEG']+'"><h6>'+json[int]['P_TF_PARAM_CRPB_CD_BIEN_ASEG']+' - ' +primeraLetraMayus(json[int]['P_TF_PARAM_INB_DESC_BIEN_ASEG'])+'</h6></option>';
	    	}
	    	
	    	d1.innerHTML =panelNuevo;
	    	mostrarEndosoParametricoHome();
	    	mostrarDatosExtra(numeroEndoso);
	    	} catch (e) {
	    		// TODO: handle exception
	    	}
	    	
	    	$.unblockUI();
	    },
		 
	    error: function (request, status, error) {
	    	var d1 = document.getElementById("selectorBienCertificado");
	    	d1.innerHTML = ' <option>No se encontraron bienes para en endoso seleccionado.</option>';
	       	var d1 = document.getElementById("datosParametricosSegunEndoso");
	    	d1.innerHTML = '<h6 style="padding-top:40px;text-align:center;"> No posee datos parametricos el endoso seleccionado. </h6>';
	    	$.unblockUI();

	    },
	 
	   
	});
    
	
}


function mostrarDatosExtra(endoso){
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;	
	$.ajax({
	    url : 'datosExtraPoliza',
	    contentType: 'application/json', 
	    data : { endoso : endoso , ramo : valorRamo , poliza : valorPoliza, sucursal: valorSucursal ,certificado: valorCertificado},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$("#DATO_PLAN_CERTIFICADO").html("<b>" +validarCampoVacio((json[0]['P_TF_DATOS_INB_CD_PLAN']))+ " - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DATOS_INB_DE_PLAN'])) +" </b>");
		    	$("#DATO_SUMA_ASEG_CERTIFICADO").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_DATOS_INB_MT_SUMA_ASEGURADA']))+" </b>");
		    	$("#DATO_RIESGO_ASEG_CERTIFICADO").html("<b>" +validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DATOS_INB_DE_RIESGO']))+"</b>");

	    	}catch (e) {
		    	mostrarError('Error 44 : no pudo cargar los parametricos');
			}
	    	$.unblockUI();
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();

	    },
	});
	
};

function mostrarEndosoParametricoHome(){
	bloquearPantallaGris();

	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;
	$.ajax({
	    url : 'certificadoParametrico',
	    contentType: 'application/json', 
	    data : { endoso : valorEndoso , ramo : valorRamo , poliza : valorPoliza, sucursal: valorSucursal ,certificado: valorCertificado,bien : valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    			var d1 = document.getElementById("datosParametricosSegunEndoso");
	    	    	d1.innerHTML = ' ';

	    	    	var panelNuevo = '<div style="height:250px;overflow-y:auto;"><table id="tablaParametricos" style= "width:100%;">';
	    	    	
	    	    	for ( var int = 0; int < json.length; int++) {
	    	    		panelNuevo = panelNuevo + '<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>'+ validarCampoVacioSinB(primeraLetraMayus(json[int]['P_TF_PARAM_INB_LABEL'])) +' : </td><td style="padding-top:5px;width:60%;"><h6>';
	    	    		
	    	    		panelNuevo = panelNuevo + '<b>' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CRPD_DATO'])) + '</b>';
	    	    		
	    	    		
	    	    		
	    	    		if(primeraLetraMayus(json[int]['P_TF_PARAM_CRPD_DATO']).length>0 || primeraLetraMayus(json[int]['P_TF_PARAM_CRPD_DATO']) !=""){
	    	    			if(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DATO']).length>0 || primeraLetraMayus(json[int]['P_TF_PARAM_INB_DATO']) != "")
	    	    				panelNuevo = panelNuevo + ' - ' + '<b>'+ primeraLetraMayus(json[int]['P_TF_PARAM_INB_DATO']) + '</b>';
	    	    		}
	    	    		
	    	    		panelNuevo = panelNuevo + '.</h6></td></tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo + '</table>' + '</div>';  
	    			
	    	}catch (e) {
		    	mostrarError('Error 44 : no pudo cargar los parametricos');
			}
	    	$.unblockUI();
	    },
	    error : function(xhr, status) {
	    	var d1 = document.getElementById("datosParametricosSegunEndoso");
	    	d1.innerHTML = '<h6 style="padding-top:40px;text-align:center;"> No se encontraron datos parametricos para el bien seleccionado. </h6>';
	    	$.unblockUI();

	    },
	});
	
};

function buscarFiltroParametrico(idTablaParametricos){
	
	input = document.getElementById("inputBusquedaParametrico");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}


function buscarFiltroParametricoTextos (idTablaParametricos){
	
	input = document.getElementById("inputBusquedaParametricoTextos");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}


//variable local a la funcion completarDetalleTablaCertificados
var buscarFiltroCertificado="";
var dataView;
var grid;
function completarDetalleTablaCertificados(data, nroCertificado, poliza, ramo, sucursal){
	var columns = [
	       	    {id: "certificado", name: "#", field: "certificado",  cssClass: "cell-title", selectable: false, resizable: false},
	       	    {id: "riesgo", name: "Riesgo", field: "riesgo", width:260,  selectable: false, resizable: false},
	       	    {id: "sumaAsegurada", name: "Suma", field: "sumaAsegurada",  selectable: false, resizable: false},
	       	    {id: "estado", name: "Estado", field: "estado", width:95, selectable: false, resizable: false}
	       	];

	       	var options = {
	       	    editable: true,
	       	    enableAddRow: false,
	       	    enableCellNavigation: true,
	       	    asyncEditorLoading: false,
	       	    fullWidthRows:true,
	       	    rowHeight: 25
	       	};
	       	
	      //inicializo la grilla
	        dataView = new Slick.Data.DataView({ inlineFilters: true });
	        dataView.beginUpdate();
	        dataView.setItems(data, "certificado");
	        dataView.setFilter(myFilterCertificado);
	        dataView.endUpdate();
	        
	        // inicializo la grilla
	        grid = new Slick.Grid("#grillaCertificados", dataView, columns, options);
	 	
	    grid.onClick.subscribe(function (e) {
	    	
	        var cell = grid.getCellFromEvent(e);
	        
	        var row = cell.row;
	        var row_values = dataView.getItem(row);
	        	    	
	    	mostrarDetalleCertificadoSeleccionado('certificadoPopUp',row_values.certificado,poliza,ramo,sucursal);
	    	
	    });
	    
	    dataView.onRowCountChanged.subscribe(function (e, args) {
	    	grid.updateRowCount();
	    	grid.render();
	    });

	    dataView.onRowsChanged.subscribe(function (e, args) {
	    	grid.invalidateRows(args.rows);
	    	grid.render();
	    });
	  
	    $("#inputBusquedaCertificado").keyup(function (e) {
	        Slick.GlobalEditorLock.cancelCurrentEdit();

	        // clear on Esc
	        if (e.which == 27) {
	          this.value = "";
	        }

	        buscarFiltroCertificado = this.value.toUpperCase();
	        updateFilterCertificado();

	     });
	    
	    //Modifico tamanio del scroll slickviewport
	    document.getElementById("idSlickViewport").style.height = "140px";
	    
	    var x = document.getElementsByClassName("slick-header-column");
	    /*Se cambia el tama�o del encabezado de tabla de header certificados*/
	    for(var i = 0; i<4; i++){
		    x[i].style.height="20px";
		    
	    }
	    
}

function updateFilterCertificado() {
    dataView.setFilterArgs({
      searchString: buscarFiltroCertificado
    });
    dataView.refresh();
}

function myFilterCertificado(item) {

    if (buscarFiltroCertificado != "" && item["certificado"].indexOf(buscarFiltroCertificado) == -1
        && item["riesgo"].indexOf(buscarFiltroCertificado) == -1
        && item["sumaAsegurada"].indexOf(buscarFiltroCertificado) == -1
        && item["estado"].indexOf(buscarFiltroCertificado) == -1) {
        return false;
    }

    if (item.parent != null) {
        var parent = data[item.parent];

        while (parent) {
            if (parent._collapsed ||
                (buscarFiltroCertificado != "" && parent["certificado"].indexOf(buscarFiltroCertificado) == -1
                    && parent["riesgo"].indexOf(buscarFiltroCertificado) == -1
                    && parent["sumaAsegurada"].indexOf(buscarFiltroCertificado) == -1
                    && parent["estado"].indexOf(buscarFiltroCertificado) == -1)) {
                return false;
            }

            parent = data[parent.parent];
        }
    }

    return true;
}

function abrirModalPrimaCertificadoPanelA(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorImagen=document.getElementById("imagenIconoCertificado").value;
	var valorEndoso=null;
	
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosPrima',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal,endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosCoberturaPanelACertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	
    	    	for ( var int = 0; int < json.length-1 ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_CARB_CD_RAMO']) +'</h6></td>'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_CACB_CD_COBERTURA']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRIMA_INB_COBERTURA']))+ '</h6></td>'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_TA_RIESGO']) +'</h6></td>'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_CARC_MT_SUMA_ASEGURADA'])) +'</h6></td>'+
		            '<td class="td-grilla-coberturaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_CARC_MT_PRIMA_BRUTA'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	total = json.length - 1;
    	    	$("#DATO_PRIMAS_COBERTURA").html(" <b>" + validarCampoVacio(formatearMoneda(json[total]['P_TF_PRIMA_TOTAL_INB_PRIMA_TOTAL'])) +"</b>");

    	    	$("#DATOS_MODAL_PRIMA").html("Cobertura #<b>"+valorPoliza+" - "+valorCertificado+"</b>");
    	    	$("#DATOS_IMAGEN_ICONO").html(valorImagen);

    	    	
    	    	
			//Abre el modal
			$("#coberturaCertificadoPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
			
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function abrirModalPrimaCertificado(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var valorImagen=document.getElementById("imagenIconoCertificado").value;
	
	
	
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosPrima',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal, endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosPrimaCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	
    	    	for ( var int = 0; int < json.length-1 ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_CARB_CD_RAMO']) +'</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_CACB_CD_COBERTURA']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRIMA_INB_COBERTURA']))+ '</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PRIMA_CARC_TA_RIESGO']) +'</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_CARC_MT_SUMA_ASEGURADA'])) +'</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_CARC_MT_PRIMA_BRUTA'])) +'</h6></td>'+
		            '<td class="td-grilla-primaCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PRIMA_INB_VARIACION_PRIMA'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	total = json.length - 1;
    	    	$("#DATO_PRIMAS").html(" <b>" + validarCampoVacio(formatearMoneda(json[total]['P_TF_PRIMA_TOTAL_INB_PRIMA_TOTAL'])) +"</b>");
    	    	$("#DATO_PRIMAS_ANUAL").html("<b>"+validarCampoVacio(formatearMoneda(json[total]['P_TF_PRIMA_TOTAL_INB_VARIACION_PRIMA_TOTAL']))+ "</b>");

    	    	$("#DATOS_MODAL_PRIMA").html("Cobertura #<b>"+valorPoliza+" - "+valorCertificado+" - "+valorEndoso+"</b>");
    	    	$("#DATOS_IMAGEN_ICONO").html(valorImagen);

    	    	
    	    	
			//Abre el modal
			$("#primaCertificadoPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
			
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function abrirModalComponenteCertificado(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var valorImagen=document.getElementById("imagenIconoCertificado").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosComponente',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal, endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	     		var d1 = document.getElementById("valorComponentesPolizaCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COMP_INB_COMPONENTE'])) +'</h6></td>'+
		            '<td class="td-grilla" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_COMP_CASB_TA_COMPONENTE']) +'</h6></td>'+
		            '<td class="td-grilla" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COMP_CASB_MT_COMPONTE'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>'; 
    	    	$("#DATOS_IMAGEN_ICONO_COMPONENTE").html(valorImagen);
    	    	$("#DATOS_COMPONENTE").html("Componentes<b> #"+valorCertificado+" - "+valorPoliza+" - "+valorEndoso+"</b>");


    	    	
    	    	
			//Abre el modal
			$("#componenteCertificadoPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
			
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};





function abrirModalIIBBCertificado(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var valorImagen=document.getElementById("imagenIconoCertificado").value;
	
	
	
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosIIBB',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, certificado:valorCertificado, sucursal:valorSucursal, endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	     		var d1 = document.getElementById("datosIIBBCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length-1 ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_COMP_INB_COMPONENTE']) +' - '+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COMP_INB_COMPONENTE'])) +'</h6></td>'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_COMP_CASE_TA_COMPONENTE'])+'</h6></td>'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COMP_CASE_MT_COMPONENTE'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo;  
    	    	total = json.length - 1;
    	    	$("#DATOS_IIBB").html("IIBB de la p&oacute;liza : <b>#"+valorPoliza+"</b>");

    	    	$("#DATO_IBB_CLIENTE").html(" <b>" + validarCampoVacio(json[total]['P_TF_CABECERA_CACE_CACN_NU_CEDULA_RIF']) +"</b>");
    	    	$("#DATO_IBB_PERSONA").html("<b>"+validarCampoVacio((json[total]['P_TF_CABECERA_CACE_CABU_NU_PERSONA']))+ "</b>");
    	    	$("#DATO_IBB_CUIT").html("<b>"+validarCampoVacio((json[total]['P_TF_CABECERA_CABU_NU_CUIT']))+ "</b>");
    	    	$("#DATO_IBB_ASEGURADO").html("<b>"+validarCampoVacio(primeraLetraMayus(json[total]['P_TF_CABECERA_INB_ASEGURADO']))+ "</b>");


    	    	
			//Abre el modal
			$("#IIBBCertificadoPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
			
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function abrirPopUpAcredoresCertificadoHome(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;	
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'acredoresModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosAcredoresCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_CRAC_CAAC_CD_ACREEDOR']) +' - ' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_ACREEDOR'])) +'</h6></td>'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRAC_CRCA_CD_OBJETO'])) +' - ' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_OBJETO'])) +'</h6></td>'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_INB_CRCA_TP_ACREEDOR']) +'</h6></td>'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRAC_PO_PARTICIPACION'])) +'</h6></td>'+
		            '<td class="td-grilla-acreedoresCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRAC_FE_EXCLUSION'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo;
    	    	$("#DATO_ACREEDOR_CER").html("Acreedores del endoso <b>#"+valorEndoso+"</b>");

    	    	
	$("#acreedoresCertificadoPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});

	$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    },
	 
	   
	});
	

};



function abrirPopUpListaBienesCertificadoHome(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;	
	bloquearPantallaGris();
	$.ajax({
	    url : 'listaBienesModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("listaBienesParametricosCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_CRLB_CROB_CD_OBJETO']) +' - ' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_OBJETO'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CRLB_DESCRIPCION'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRLB_NU_UNIDADES'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_CRLB_CRMA_CD_MARCA']) +' - ' + validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_MARCA'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRLB_SERIAL'])) +'</h6></td>'+
		            '<td class="td-grilla-listaBienesCertificado" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_PARAM_CRLB_VALOR_TOTAL'])) +'</h6></td>'+
		            
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo;
    	    	$("#DATO_LISTABIENES_CER").html("Objetos del endoso <b>#"+valorEndoso+"</b>");

    	    	
	$("#listaBienesCertificadoPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});

	$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};



function abrirPopUpAnexosCertificadoHome(){
	
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'anexosLineaModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    try {
        	    		
    	    	var d1 = document.getElementById("selectorLineasCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_PARAM_INB_LINEA_ANEXOS']+'"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_INB_LINEA_ANEXOS']) +" - "+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_LINEA'])) +'</h6></option>';
    	    	}
    	    	
    	    	d1.innerHTML =panelNuevo;
	
    	    	$("#DATO_ANEXO_CERTIFICADO").html("Anexos del endoso<b>#" + valorEndoso + "</b>");
    	    	

    	    	
    	    	mostrarClausulasCertificado();

				$("#anexoCertificadoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});

		}
		catch(e)
		{
	    	mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
			
		}
		$.unblockUI();
		
		
		},
	error : function(xhr, status) {
		mostrarError(xhr['responseText']);
	},


	});


	};



function mostrarClausulasCertificado(){
	bloquearPantallaGris();
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var select = document.getElementById('selectorLineasCertificado');
	var linea = select.options[select.selectedIndex].value;	
	$.ajax({
	    url : 'anexosClausulaModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso,linea:linea},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		var d1 = document.getElementById("datosClausulasCotizacion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" id="textoCer'+int+'" onclick="detalleClausulaCertificado('+int+');" class="textoCards tr-grilla">'+
		            '<td class="td-grilla-anexoCertificado"  role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_INB_CD_CLAUSULA'])+'</h6></td>'+
		            '<td class="td-grilla-anexoCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_CLAUSULA'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
		    	$("#valorTextoClausulaCotizacion").html("<b>Seleccione una clausula...</b>");

    	    	
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	       	var d1 = document.getElementById("datosAnexosClausulas");
	    	d1.innerHTML = '<tr><td style="width:100%;"><h5 style="border:none;padding-top:40px;text-align:center;"> No posee <b>clausulas</b> el endoso seleccionado. </h5></td></tr>';
	    	$.unblockUI();
	    }
	   
	});
	

};


function detalleClausulaCertificado(card){
	bloquearPantallaGris();
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	var select = document.getElementById('selectorLineasCertificado');
	var linea = select.options[select.selectedIndex].value;	
	$.ajax({
	    url : 'anexosClausulaModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso,linea:linea},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
			try{
		    	$("#valorTextoClausulaCotizacion").html("<b>" +validarCampoVacio(primeraLetraMayus(json[card]['P_TF_PARAM_INB_DE_TEXTO'].toLowerCase()))+"</b>");

		    	$(".textoCards").each(function(){
			 	    $(this).css("background","white");
			 	});
				
				$('#textoCer'+card).css("background","#bac2bb");
		    	
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9118716.',e);
	    		
	    	}
			$.unblockUI();
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function mostrarTextosCertificado(){
	bloquearPantallaGris();

	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	$.ajax({
	    url : 'textoModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosTextoCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" id="textoCertificado'+int+'" onclick="detalleTextosCertificado('+int+');" class="textoCards tr-grilla">'+
    	    		'<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_PARAM_CPOT_NU_CONSECUTIVO'])+'</h6></td>'+
    	    		'<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_PARAM_CPOT_CRTX_CD_TEXTO'])+'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CPOT_FE_DESDE'])) +'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CPOT_FE_HASTA'])) +'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_PARAM_CPOT_IN_IMPRESION'])+'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_PARAM_CPOT_IN_IMP_RENOVACION'])+'</h6></td>'+
		            '<td class="td-grilla-textoCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CPOT_DE_BREVE'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
    	    	
    	    	$("#DATO_TEXTO_CER").html("Textos del endoso <b>#"+valorEndoso+"</b>");
    	    	$("#valorTextoCertificado").html("<b>Seleccione un texto...</b>");

    	    	
    	    	$("#textosCertificadoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};

function detalleTextosCertificado(card){
	bloquearPantallaGris();
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEndoso=document.getElementById("valorEndosoCertificadoHome").value;
	
	bloquearPantallaGris();
	$.ajax({
		   url : 'textoModalCertificado',
		    contentType: 'application/json', 
		    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,endoso:valorEndoso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
			try{
		    	$("#valorTextoCertificado").html(validarCampoVacio(primeraLetraMayus(json[card]['P_TF_PARAM_CPOT_DE_TEXTO'].toLowerCase())));
		    	$('#textoCertificado').val(primeraLetraMayus(json[card]['P_TF_PARAM_CPOT_DE_TEXTO'].toLowerCase()))
		    	$(".textoCards").each(function(){
			 	    $(this).css("background","white");
			 	});
				
				$('#textoCertificado'+card).css("background","#bac2bb");
		    	
			$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9118716.',e);
	    		
	    	}
			$.unblockUI();
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function mostrarBeneficiariosCertificado(){
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;	
	$.ajax({
	    url : 'beneficiarioModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosBeneficiariosCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="reaseguroCards tr-grilla">'+
    	    		'<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PARAM_CRBE_TP_DOCUMENTO'])+' - '+validarCampoVacio(json[int]['P_TF_PARAM_CRBE_NU_DOCUMENTO'])+'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CRBE_NM_NOMBRES'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRBE_CD_PARENTESCO'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRBE_PO_PARTICIPACION'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CRBE_FE_INCLUSION'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CRBE_FE_NACIMIENTO'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CRBE_FE_EXCLUSION'])) +'</h6></td>'+
		            '<td class="td-grilla-benefiricarioCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CRBE_DE_OBSERVACIONES'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
    	    	$("#DATO_BENEFICIARIOS_CER").html("Beneficiarios del bien <b>#"+valorSelect+"</b>");

    	    	
    	    	$("#beneficiariosCertificadoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};




function mostrarUbicacionesCertificadoModal(){
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var select = document.getElementById('selectorBienCertificado');
	var valorSelect = select.options[select.selectedIndex].value;	
	$.ajax({
	    url : 'ubicacionModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal,bien:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosUbicacionCertificado");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CRDB_FE_EFECTIVA'])) +'</h6></td>'+
    	    		'<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_PARAM_CRDB_CALLE']))+'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_NUMERO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_PISO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_DEPTO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_NU_TELEFONO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_NU_FAX'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CRDB_GECP_NU_POSTAL'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_LOCALIDAD'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_DE_MUNICIPIO'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_DE_PROVINCIA'])) +'</h6></td>'+
		            '<td class="td-grilla-ubicacionesCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_DE_PAIS'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
    	    	$("#DATO_UBICACION_CER").html("Ubicaciones del bien <b>#"+valorSelect+"</b>");

    	    	
    	    	$("#ubicacionCertificadoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};





function mostrarAlarmaCertificadoModal(){
	var alarma=document.getElementById("valorAlarmaCertificadoHome").value;
	$.ajax({
	    url : 'alarmaModalCertificado',
	    contentType: 'application/json', 
	    data : {identificador:alarma},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosAlarmaCertificado");
    	    	d1.innerHTML = '';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CEAN_CAME_TP_TRANSAC'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CEAJ_CD_PRESTADOR'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CEAK_CD_IDENTIFICADOR'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_PARAM_CEAK_GEED_NU_PROCESO'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CEAJ_FE_PROCESO'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_CEAK_TP_MOVIMIENTO'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PARAM_INB_DSP_TP_SALIDA'])) +'</h6></td>'+
		            '<td class="td-grilla-alarmaCertificado" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PARAM_CEAK_FE_INSTALACION'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
    	    	$("#DATO_ALARMA_CER").html("Alarmas del bien");

    	    	
    	    	$("#alarmaCertificadoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:9812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};






function mostrarDispSatelitalCertificadoModal(){
	var prestador=document.getElementById("valorPrestadorCertificadoHome").value;
	var identificador=document.getElementById("valorIdentificadorCertificadoHome").value;
	$.ajax({
	    url : 'dispSatelitalModalCertificado',
	    contentType: 'application/json', 
	    data : { prestador:prestador,identificador:identificador},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		llenarDinamicamente(json[0]);
    	    	$("#DATO_SATELITICAL_CER").html("Dispositivo Satelital");

    	    	
    	    	$("#dispSatelitalCertificadoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:19121812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    	$.unblockUI();
	    }
	   
	});
	

};

function mostrarLibredeudaModal(){
	
	bloquearPantallaGris();

	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	
	
	$("#DATO_RAMO_CER_DEUDA").html("<b>" +valorRamo+"</b>");
	$("#DATO_POLIZA_CER_DEUDA").html("<b>" +valorPoliza+"</b>");
	$("#DATO_SUCURSAL_CER_DEUDA").html("<b>" +valorSucursal+"</b>");
	$("#DATO_CER_CER_DEUDA").html("<b>" +valorCertificado+"</b>");

	
	$("#libreDeudaPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	$.unblockUI();

}

function enviarEmailLibredeudaModal(){
	var valorCertificado=document.getElementById("valorCertificado").value;
	var valorPoliza=document.getElementById("valorPolizaCertificadoHome").value;
	var valorSucursal=document.getElementById("valorSucursalCertificadoHome").value;
	var valorRamo=document.getElementById("valorRamoCertificadoHome").value;
	var valorEmail=document.getElementById("emailLibreDeuda").value;
	
	bloquearPantallaGris();
	
	$.ajax({
	    url : 'libreDeudaModalCertificado',
	    contentType: 'application/json', 
	    data : { poliza:valorPoliza,ramo:valorRamo,sucursal:valorSucursal,certificado:valorCertificado,email:valorEmail},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    	
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:19121812716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
  				swal({
				  type: 'success',
				  title: 'Email Enviado!',
				});
	    	$.unblockUI();
	    }
	   
	});
	

};




function inicioCertificadoHome() {
	bloquearPantallaGris();
	$( "#timeLineItemEndoso1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );

});
	$.unblockUI();

}


function mostrarBotonesCertificado(){
	
	$(".mostrarBotonCer").each(function(){
		$(this).css("display","");
		
	});
	
	$("#btnVerMasBotonesCer").css("display", "none");
	
}

function irAPoliza(){
	
	var poliza = document.getElementById("valorPolizaCertificadoHome").value;
	var ramo = document.getElementById("valorRamoCertificadoHome").value;
	var sucursal = document.getElementById("valorSucursalCertificadoHome").value;
	
	bloquearPantallaGris();
	
	location.href = "/PSPES/homePoliza?"+"poliza="+poliza+"&ramo="+ramo+"&sucursal="+sucursal;
}

function descargarExcelTextoCertificado()
{
	var texto = document.getElementById("textoCertificado").value;

    location.href = "/PSPES/descargarArchivoExcelTextosCertificados?texto="+texto;
};
