function inicioRemesaHome() {
	bloquearPantallaGris();
		activarCaru();
		
		shortcut.add("esc",function() {
			$( ".cerrarModalBotonHoover" ).trigger( "click" );
		})
		$.unblockUI();
}

function mostrarPanelRemesa(idPanel,idBoton)
{
	mostrarPanel(idPanel,idBoton);
};

function mostrarDetalleCancelacion(obj,numeroCard,icono, nroRemesa){
		
	bloquearPantallaGris();
	
	$.ajax({
	    url : '/PSPES/detalleCancelacionRemesa',
	    contentType: 'application/json', 
	    data : { remesa : nroRemesa  },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		
	    		$('#fechaRecuperoCancelacion').html('<b>' + validarCampoVacio(formatearFechaJson(json[numeroCard-1]['P_TF_LISTA_CJCR_FE_RECUPERO']))+'</b>');
	    		$('#moneda').html('<b>' + json[numeroCard-1]['P_TF_LISTA_INB_MONEDA'] + '</b>' + ' - ' + '<b>'+validarCampoVacio(primeraLetraMayus(json[numeroCard-1]['P_TF_LISTA_INB_DESC_MONEDA'])))+'</b>';
	    		$('#recuperadoCancelacion').html('<b>' + validarCampoVacio(formatearMoneda(json[numeroCard-1]['P_TF_LISTA_CJCR_MT_RECUPERADO'])) + '</b>');
	    		$('#comprobanteCancelacion').html('<b>' + json[numeroCard-1]['P_TF_LISTA_INB_COMPROBANTE'] + '</b>');
	    		$('#usuarioRecuperoCancelacion').html('<b>' + validarCampoVacio(primeraLetraMayus(json[numeroCard-1]['P_TF_LISTA_CJCR_CD_USUARIO_RECUPERO'])) + '</b>');
	    		$('#monedaCancelacion').html('<b>'+ validarCampoVacio(json[numeroCard-1]['P_TF_LISTA_INB_MONEDA_CANCELACION'])+ ' - ' + validarCampoVacio(primeraLetraMayus(json[numeroCard-1]['P_TF_LISTA_INB_DESC_MONEDA_CANCELACION'])) +' </b>');

	    		
	    		$(".timeline__post").each(function(){
    		 	    $(this).css("background","white");
    		 	});
    	    	
    			$('#timeLineRemesaCancelacion'+numeroCard).css("background","#bac2bb");
    			
    			document.getElementById("cancelacion").style.display = "block";
    			
	    	} catch (e) {
	    		mostrarError('Code 283 : No pudo cargar el detalle de cancelacion');
	    	}
	    	$.unblockUI();
	    	
	    	document.getElementById("panelc").style.display="block";
	    	document.getElementById("verCancelacionRemesa").style.display="none";
	    	
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('284 - Se a producido un inconveniente al obtener la cancelacion de remesa!');
	    },
	   
	});
}

function mostrarDetalleCobroSeleccionado(idPopUp, nroRemesa, numSeleccionado){
	bloquearPantallaGris();
	$.ajax({
	    url : '/PSPES/detalleCobroRemesa',
	    contentType: 'application/json', 
	    data : { remesa : nroRemesa },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		llenarDinamicamente(json[numSeleccionado]);
					$('#INFO_P_TF_LISTA_CJCI_FE_DEPOSITO').html('<b>' + validarCampoVacio(formatearFechaJson(json[numSeleccionado]['P_TF_LISTA_CJCI_FE_DEPOSITO'])) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_CAMO_CD_MONEDA').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_CAMO_CD_MONEDA']) +' - '+validarCampoVacio(primeraLetraMayus(json[numSeleccionado]['P_TF_LISTA_INB_DESC_MONEDA'])) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_MT_CHEQUE').html('<b>' + validarCampoVacio(formatearMoneda(json[numSeleccionado]['P_TF_LISTA_CJCI_MT_CHEQUE'])) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_CASU_CD_SUCURSAL').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_CASU_CD_SUCURSAL']) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_NU_CHEQUE').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_NU_CHEQUE']) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_ST_CHEQUE').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_ST_CHEQUE']) +' - '+validarCampoVacio(primeraLetraMayus(json[numSeleccionado]['P_TF_LISTA_INB_DESC_CHEQUE']))+'</b>');
					$('#INFO_P_TF_LISTA_CJCI_NU_CUENTA').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_NU_CUENTA']) +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_CJMI_TP_MOVIMIENTO').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_CJMI_TP_MOVIMIENTO']) +' - ' + validarCampoVacio(primeraLetraMayus(json[numSeleccionado]['P_TF_LISTA_INB_TIPO_MOVIMIENTO']))   +'</b>');
					$('#INFO_P_TF_LISTA_CJCI_CABA_CD_BANCO').html('<b>' + validarCampoVacio(json[numSeleccionado]['P_TF_LISTA_CJCI_CABA_CD_BANCO']) +' - ' +validarCampoVacio(primeraLetraMayus(json[numSeleccionado]['P_TF_LISTA_INB_DSP_BANCO']))   +'</b>');
					
					$('#INFO_NUM_COBRO').html('Cobro '+ '<b>#' + numSeleccionado + '</b>');
					
	    			abrirPopUpNuevo(idPopUp);	

	    	} catch (e) {
	    		alert('Code 821 : No pudo cargar.');
	    	}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('822 - Se a producido un inconveniente al cargar los cobros de la remesa!');
	    },
	   
	});
		
}

function verDetalleCobroTablaRemesa(nroRemesa){
	bloquearPantallaGris();
	$.ajax({
	    url : '/PSPES/detalleCobroRemesa',
	    contentType: 'application/json', 
	   
	    data : {remesa :nroRemesa} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{

	    		var data=[];
    	    	for ( var i = 0; i <= json.length; i++) {
    	    	        var d = (data[i] = {});
    	    	        d["id"] =  ''+i;
    	    	        d["montoCheque"] =  json[0]['P_TF_LISTA_CJCI_MT_CHEQUE'];
    	    	        d["estadoCheque"] = json[0]['P_TF_LISTA_CJCI_ST_CHEQUE'];
    	    	        d["fechaDeposito"] = json[0]['P_TF_LISTA_CJCI_FE_DEPOSITO'];
    	    	}
    	    	
    	    	document.getElementById("verDetalleCobroRemesa").style.display="none";
	    		document.getElementById("tablaCobroRemesa").style.display="block";

	    		completarDetalleTablaCobros(data,nroRemesa);
				
	    	} catch (e) {
		    	$.unblockUI();
	    		alert('Code: 372 - Se genero un inconveniente al cargar la lista de cobro. Error:'+e);
	    	}
        	$.unblockUI();
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	 alert('Code: 373 - ' + xhr['responseText']);	    },
	 
	   
	});
	
}

//variable local a la funcion completarDetalleTablaCertificados
var buscarFiltroRemesa="";
var dataView;
var grid;
function completarDetalleTablaCobros(data, nroRemesa){
	var columns = [
		       	{id: "id", name: "#", field: "id",  cssClass: "cell-title", selectable: false, resizable: false},
	       	    {id: "montoCheque", name: "Monto", field: "montoCheque",  width:120, cssClass: "cell-title", selectable: false, resizable: false},
	       	    {id: "estadoCheque", name: "Estado", field: "estadoCheque", width:120,  selectable: false, resizable: false},
	       	    {id: "fechaDeposito", name: "Fecha deposito", field: "fechaDeposito", width:190,  selectable: false, resizable: false}
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
	        dataView.setItems(data, "id");
	        dataView.setFilter(myFilterRemesa);
	        dataView.endUpdate();
	        
	        // inicializo la grilla
	        grid = new Slick.Grid("#grillaCobroRemesa", dataView, columns, options);
	 	
	    grid.onClick.subscribe(function (e) {
	    	
	        var cell = grid.getCellFromEvent(e);
	        
	        var row = cell.row;
	        var row_values = dataView.getItem(row);
	        mostrarDetalleCobroSeleccionado('cobroRemesaPopUp',nroRemesa,row_values.id);
	    	
	    });
	    
	    dataView.onRowCountChanged.subscribe(function (e, args) {
	    	grid.updateRowCount();
	    	grid.render();
	    });

	    dataView.onRowsChanged.subscribe(function (e, args) {
	    	grid.invalidateRows(args.rows);
	    	grid.render();
	    });
	  
	    $("#inputBusquedaCobro").keyup(function (e) {
	        Slick.GlobalEditorLock.cancelCurrentEdit();

	        // clear on Esc
	        if (e.which == 27) {
	          this.value = "";
	        }

	        buscarFiltroRemesa = this.value.toUpperCase();
	        updateFilterRemesa();

	     });
	    
	    //Modifico tamanio del scroll slickviewport
	    document.getElementById("idSlickViewport").style.height = "140px";
	    
	    var x = document.getElementsByClassName("slick-header-column");
	    /*Se cambia el tamanio del encabezado de tabla de header certificados*/
	    for(var i = 0; i<4; i++){
		    x[i].style.height="20px";
		    
	    }
	    for(var j = 0; j<5; j++){
	    	document.getElementsByClassName("ui-state-default")[j].style.backgroundColor = "#00317A";
	    }
	    
}

function updateFilterRemesa() {
    dataView.setFilterArgs({
      searchString: buscarFiltroCertificado
    });
    dataView.refresh();
}

function myFilterRemesa(item) {

    if (buscarFiltroCertificado != "" && item["id"].indexOf(buscarFiltroCertificado) == -1
        && item["montoCheque"].indexOf(buscarFiltroCertificado) == -1
        && item["estadoCheque"].indexOf(buscarFiltroCertificado) == -1
        && item["fechaDeposito"].indexOf(buscarFiltroCertificado) == -1) {
        return false;
    }

    if (item.parent != null) {
        var parent = data[item.parent];

        while (parent) {
            if (parent._collapsed ||
                (buscarFiltroCertificado != "" && parent["id"].indexOf(buscarFiltroCertificado) == -1
                    && parent["montoCheque"].indexOf(buscarFiltroCertificado) == -1
                    && parent["estadoCheque"].indexOf(buscarFiltroCertificado) == -1
                    && parent["fechaDeposito"].indexOf(buscarFiltroCertificado) == -1)) {
                return false;
            }

            parent = data[parent.parent];
        }
    }

    return true;
}

function buscadorPanelCCobroRemesa() {
	  // Declare variables 
	  var input, filter;
	  input = document.getElementById("inputBusquedaCobro");
	  filter = input.value.toUpperCase();
	  
	  
	  $(".datoCobroCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoCobro", "micaruB");
		  var idEncabezado = idH6.replace("datoCobro", "nroCobro");
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idEncabezado).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  
}

function irRemesaHome(){
	
	var nroRemesa = document.getElementById("valorRemesa").value;
	location.href = "/PSPES/homeRemesa?remesa="+ nroRemesa;
}

function mostrarDetalleRemesa(timeLineRemesaSaldo,numeroCard,icono, nroRemesa){
	document.getElementById("valorRemesa").value = nroRemesa;

	bloquearPantallaGris();
	
	$.ajax({
	    url : '/PSPES/detalleRemesa',
	    contentType: 'application/json', 
	   
	    data : {remesa :nroRemesa} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{
    	    	for(var i=0; i<json.length; i++){
    	    		$('#INFO_P_TF_LISTA_CJIN_COTC_CD_MEDIO_PAGO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_COTC_CD_MEDIO_PAGO']) + ' - '+ primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_MPAGO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_MT_TOTAL').html('<b>' + formatearMoneda(validarCampoVacio(json[0]['P_TF_LISTA_CJIN_MT_TOTAL'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_ST_ESTADO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_ST_ESTADO']) + ' - '+ primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_ESTADO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_INB_DSP_TIPO_INGRESO_DESC').html('<b>' + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DSP_TIPO_INGRESO_DESC'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_CD_USUARIO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_CD_USUARIO']) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_FE_COBRO').html('<b>' + validarCampoVacio(formatearFechaJson(json[0]['P_TF_LISTA_CJIN_FE_COBRO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_DE_CONCEPTO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_DE_CONCEPTO']) + '</b>');
    	    		
    	    		$('#INFO_P_TF_LISTA_CJIN_CD_COBRO').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_CD_COBRO']) + ' - ' + validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_TIPO_COBRO'])+ '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_MT_SALDO').html('<b>' + formatearMoneda(validarCampoVacio(json[0]['P_TF_LISTA_CJIN_MT_SALDO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_CAMO_CD_MONEDA').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_CAMO_CD_MONEDA']) + ' - '+ primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_MONEDA'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_CJOI_CD_ORIGEN').html('<b>' + validarCampoVacio(json[0]['P_TF_LISTA_CJIN_COTC_CD_ORIGEN']) + ' - '+ validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_ORIGEN']) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_FE_INGRESO').html('<b>' + validarCampoVacio(formatearFechaJson(json[0]['P_TF_LISTA_CJIN_FE_INGRESO'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_CJIN_FE_ACTUALIZACION').html('<b>' + validarCampoVacio(formatearFechaJson(json[0]['P_TF_LISTA_CJIN_FE_ACTUALIZACION'])) + '</b>');
    	    		$('#INFO_P_TF_LISTA_INB_DESC_PRODUCTOR').html('<b>' + validarCampoVacio(json[0]['P_P_TF_LISTA_INB_DESC_PRODUCTOR']) + '</b>');

    	    	}
    	    	    	    	
    	    	$(".seleccionPanelB").each(function(){
    		 	    $(this).css("background","white");
    		 	});
    			$(".timeline__date").each(function(){
    		 	    $(this).css("background","white");
    		 	});
    			
    			
    			$('#'+timeLineRemesaSaldo+numeroCard).css("background","#bac2bb");
    	    	
    	    	$('#panelDetalleRemesa').show();
    	    	document.getElementById("seleccionRemesa").style.display="none";
	    		$('#verDetalleRemesa').show();	    		

				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Code: 398 - Se genero un inconveniente al cargar el detalle de la remesa. Error:'+e);
	    	}
        	$.unblockUI();
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	 mostrarError('Code: 397 - ' + xhr['responseText']);	    },
	 
	   
	});
	
	
}

function verDatosRemesaUnificada(){
	var comprobante = document.getElementById("nroComprobanteRemesa").value;
	bloquearPantallaGris();
	
	$.ajax({
	    url : '/PSPES/detalleRemesaUnificada',
	    contentType: 'application/json', 
	   
	    data : {comprobante:comprobante} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{
    	    	    	    	
    	    	var dl = document.getElementById("valorComprobantesRemesa");
    	    	dl.innerHTML = '';
    	    	
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length && int<100 ; int++) {
    	    		
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-comprobante" role="cell">'+'#'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_COMPROBANTE'])) +'</td>'+
		            '<td class="td-comprobante" role="cell">'+validarCampoVacio(json[int]['P_TF_LISTA_INB_CD_USUARIO_RECUPERO']) +'</td>'+
		            '<td class="td-comprobante" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_INB_MT_RECUPERADO'])) +'</td>'+
		            '<td class="td-comprobante" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_INB_FE_RECUPERO'])) +'</td>'+
		            '</tr>';
    	    		
    	    	}
    	    	dl.innerHTML = panelNuevo ; 
    	    	$("#DATOS_COMPROBANTES").html("Comprobantes");
    	    	
    	    	//Abre el modal
    			$("#comprobantesRemesaPopUp").modal({
    				 escapeClose: false,
    				  clickClose: false,
    				  showClose: false,
    				  fadeDuration: 400,
    				  fadeDelay: 0.05
    				});
    			
				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Code: 458 - Se genero un inconveniente al cargar los datos de la remesa unificada. Error:'+e);
	    	}
        	$.unblockUI();
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	 mostrarWarning('Code: 457 - ' + xhr['responseText']);	    },
	   
	});
	
}