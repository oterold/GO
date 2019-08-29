function reDirectPreliquidacionHome(){
	
	var valorPreliquidacion = document.getElementById("valorPreliquidacionProd").value;

	location.href="/PSPES/homePreliquidacion?preliquidacion="+valorPreliquidacion+"";
	
}



function descargarGrillaCuentaCC(){
		var valorMoneda = $("#selectorMoneda option:selected").val();
		var valorDatapicker = convertirFechaPeriodo($("#inputDataPicker").val()); 
		var valorProductor = document.getElementById("numProductorCC").value;
		
		location.href="/PSPES/exportarExcelCCProductor?productor="+valorProductor+"&moneda="+valorMoneda+"&periodo="+valorDatapicker+"";
}

function reDirectRemesa(){
	var valorRemesa = document.getElementById("valorRemesa").value;

	location.href="/PSPES/homeRemesa?remesa="+valorRemesa+"";
}

function reDirectCompromisos(){

	var valorCompromiso = document.getElementById("valorCompromiso").value;

	location.href="/PSPES/homeCompromiso?compromiso="+valorCompromiso+"";
	
}

function ccCorrienteProductorHome()
{
	bloquearPantallaGris();
	$('#datepickerProd').datepicker({
		defaultDate: new Date(),
		format: 'mm/yyyy',
	    endDate: 'new date()',
	    minViewMode: 1,
	    language: 'es',
	    orientation: 'bottom auto',
	    multidate: false,
	    autoclose:true
	}).on('changeDate',function(){
		mostrarPantallaCuentaCorrienteProductor();

	});
	$('#datepickerProd').datepicker(
		"update" , new Date(new Date().getFullYear(), new Date().getMonth()));


	  mostrarPantallaCuentaCorrienteProductor();
	  
	  
	  shortcut.add("esc",function() {
			$( ".cerrarModalBotonHoover" ).trigger( "click" );
	  })
		$.unblockUI();
}



function mostrarPantallaCuentaCorrienteProductor(){
	
	var valorProductor = document.getElementById("numProductorCC").value;
	var valorMoneda = $("#selectorMoneda option:selected").val();
	var valorDatapicker = convertirFechaPeriodo($("#inputDataPicker").val()); 
	var valorPeriodo = $("#inputDataPicker").val(); 
	var valorMonedaDesc = $('select[name="selectorMoneda"] option:selected').text();
	

	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosMovimientoProductorCC',
	    contentType: 'application/json', 
	    data : {productor:valorProductor,moneda : valorMoneda, periodo : valorDatapicker} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try {
	    
	    		$('#tituloMovimiento').text("Resumen de Movimientos (" + json.length+")");	
	    		$('#labelMovimiento').text("Detalle de Movimentos");	
    	 		$('#datosParametricosProductorCC').html("<h5 style='border:none;text-align:center;padding-top:6%;'>Seleccione un movimiento para ver su detalle.</b></h5>");	
    	    	
	    		var d1 = document.getElementById("panelBdatosParametricos");
    	    	d1.innerHTML = ' ';
	    		
    	    	var panelNuevo = '<div>';
    	    	var nombrePanel ='timeLineItemMovimientos';
    	    	for ( var int = 0; int < json.length; int++) {
    	    		tipoMov = "'"+json[int]['P_TF_LISTA_TP_MOVIMIENTO']+"'";
    	    		descMov = "'"+json[int]['P_TF_LISTA_DESC_TP_MOVIMIENTO']+"'";
    	    		nombreCard = "'timeLineItemMovimientos'";
    	    		
    	    		panelNuevo = panelNuevo +'<div  id="cuadroImgEndoso" style="cursor:pointer;background-color:#ffffff";>'+
    	    		'<div class="timeline__post seleccionPanelB" id="timeLineItemMovimientos'+int+'" onclick="mostrarDetalleMovimientosProductorCC('+nombreCard+','+int+','+tipoMov+','+descMov+')";  style="cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px">'+
    	    		'<div class="timeline__content" style="overflow:hidden;">'+
    	    		'<i class="material-icons altoIcono"  style="color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;"  id="timeLineItemMovimientos'+int+'">attach_money</i>'+
    	    		'<h6>Movimiento : <b>'+validarCampoVacio((json[int]['P_TF_LISTA_TP_MOVIMIENTO']))+' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_DESC_TP_MOVIMIENTO']))+'</b></h6>'+
    	    		'<h6>Cantidad : <b>'+validarCampoVacio(json[int]['P_TF_LISTA_CANTIDAD'])+' </b></h6>'+
    	    		'<h6>Importe : <b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_IMPORTE']))+'</b></h6>'+
    	    		'</div></div></div>';
    	    	}
    	    	d1.innerHTML = panelNuevo;  

    		

	    	$.unblockUI();
	    	} catch (e) {

	    		mostrarError('error : 1928748'+e);
	    	}

	    },
	 
	    error : function(xhr, status) {
	    	$('#labelMovimiento').text("Detalle de Movimentos");	
	    	$('#tituloMovimiento').text("Resumen de Movimientos");	
	 		$('#datosParametricosProductorCC').html("<h5 style='border:none;text-align:center;padding-top:6%;'>No se encontraron movimientos para el per&iacute;odo <b>"+valorPeriodo+"</b> y moneda <b>"+valorMonedaDesc+"</b></h5>");	

    		var d1 = document.getElementById("panelBdatosParametricos");
	    	d1.innerHTML = ' ';
	    	panelNuevo="<div  id='cuadroImgVacio' style='cursor:pointer; background-color:#ffffff'>"+
	    				"<div class='timeline__post seleccionPanelB' id='timeLineItemVacio' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A'>"+
	    				"<div class='timeline__content' style='overflow:hidden;'>"+
	    				"<i class='material-icons altoIcono'  style='color:#205081; font-size:40px; float:left; margin-right:20px;'  id='imgTimeLineVacio'>&#xE611;</i>"+
	    				"<h6 id='etiquetaVacio' style='padding-top: 15px; padding-bottom: 15px; color:#b3b0b0;'>No se encontraron movimientos</h6>"+
	    				"</div></div></div>";
	    	d1.innerHTML = panelNuevo;  
	    	$.unblockUI();
	        },
	 
	   
	});
	
};
	
function convertirFechaPeriodo(fecha){
	
	var fechaA= fecha.substring(3,7);
	var fechaB= fecha.substring(0,2);

	var fechafinal = fechaA+ fechaB;
	return fechafinal;
	
}


function mostrarDetalleMovimientosProductorCC(obj,num,movimiento,descMovi){	
	bloquearPantallaGris();
	
	var valorProductor = document.getElementById("numProductorCC").value;
	var valorMoneda = $("#selectorMoneda option:selected").val();
	var valorDatapicker = convertirFechaPeriodo($("#inputDataPicker").val()); 
	
	

	$.ajax({
	    url : 'datosDetalleMovimientoProductorCC',
	    contentType: 'application/json', 
	    data : { productor : valorProductor, moneda:valorMoneda, periodo : valorDatapicker , movimiento:movimiento},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    			
	    		$('#labelMovimiento').text("Detalle de Movimientos #"+primeraLetraMayus(descMovi))+"("+json.length+")";	
	    		$(".seleccionPanelB").each(function(){
	    			$(this).css("background","white");
	    		});
	    		$(".timeline__date").each(function(){
	    			$(this).css("background","white");
	    		});
	    		
	    		$('#'+obj+num).css("background","#bac2bb");
	    		
	    			
		    		
		    		var data=[];
	    	    	for ( var i = 0; i < json.length; i++) {
	    	    	        var d = (data[i] = {});
	    	    	        d["fecha"] =  formatearFechaJson(json[i]['P_TF_LISTA_FE_MOVIMIENTO']);
	    	    	        d["imputacion"] = json[i]['P_TF_LISTA_IMPUTACION'];
	    	    	        d["comprobante"] = json[i]['P_TF_LISTA_COMPROBANTE'];
	    	    	        d["obs"] = primeraLetraMayus(json[i]['P_TF_LISTA_OBSERVACIONES']);
	    	    	        d["remesa"] = primeraLetraMayus(json[i]['P_TF_LISTA_REMESA']);
	    	    	        d["comision"] = "$ "+json[i]['P_TF_LISTA_COMISION'];
	    	    	        d["posicion"] = ""+i;
	    	    	    	
	    	    	}
	    	    	completarDetalleTablaCCProductor(data,valorProductor, valorMoneda,movimiento );
	    			
	    		}
	    		
	    	catch(e)
	    	{
	    		alert('Error (444999494) generado por : '+e);
	    	}
	    	$.unblockUI();
	
	    	    },
	    	    error : function(xhr, status) {
	    	    	$('#labelMovimiento').text("Detalle de Movimentos");	
	    	 		$('#datosParametricosProductorCC').html("<h5 style='border:none;text-align:center;padding-top:6%;'>No se encontraron un detalle del movimiento para el per&iacute;odo <b>"+valorPeriodo+"</b> y moneda <b>"+valorMonedaDesc+"</b></h5>");	
	    	    	$.unblockUI();
	    	    	}
	    	});
}









//variable local a la funcion completarDetalleTablaCertificados
var buscarFiltroMovimientos="";
var dataView;
var grid;
function completarDetalleTablaCCProductor(data, productor, moneda, movimiento){
	var valorDatapicker = convertirFechaPeriodo($("#inputDataPicker").val()); 

	var columns = [
	{id: "posicion", name: "#", field: "posicion", width:30, selectable: false, resizable: false},
	{id: "fecha", name: "Fecha", field: "fecha",width:100,  cssClass: "cell-title", selectable: false, resizable: false},
   {id: "imputacion", name: "Imputaci&oacute;n",width:100, field: "imputacion",  selectable: false, resizable: false},
   {id: "comprobante", name: "Comprobante",width:120, field: "comprobante",  selectable: false, resizable: false},
   {id: "remesa", name: "Remesa",width:100, field: "remesa",  selectable: false, resizable: false},
   {id: "comision", name: "Comisi&oacute;n", width:120, field: "comision",  cssClass: "cell-title", selectable: false, resizable: false},
   {id: "obs", name: "Obs", field: "obs", width:220, selectable: false, resizable: false}
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
	        dataView.setItems(data, "posicion");
	        dataView.setFilter(filtroProductorMovimiento);
	        dataView.endUpdate();
	        
	        // inicializo la grilla
	        grid = new Slick.Grid("#datosParametricosProductorCC", dataView, columns, options);
	 	
	    grid.onClick.subscribe(function (e) {
	    	
	        var cell = grid.getCellFromEvent(e);
	        
	        var row = cell.row;
	        var row_values = dataView.getItem(row);
	        	    	
	        mostrarDetalleMovimientoSeleccionado(row,productor,moneda,movimiento,valorDatapicker);
	    	
	    });
	    
	    dataView.onRowCountChanged.subscribe(function (e, args) {
	    	grid.updateRowCount();
	    	grid.render();
	    });

	    dataView.onRowsChanged.subscribe(function (e, args) {
	    	grid.invalidateRows(args.rows);
	    	grid.render();
	    });
	  
	    $("#inputBusquedaProductorMovimientos").keyup(function (e) {
	        Slick.GlobalEditorLock.cancelCurrentEdit();

	        // clear on Esc
	        if (e.which == 27) {
	          this.value = "";
	        }

	        buscarFiltroMovimientos = this.value.toUpperCase();
	        updateFilterProductor();

	     });
	    
	    //Modifico tamanio del scroll slickviewport
	    document.getElementById("idSlickViewport").style.height = "160px";
	    
	    
	    var x = document.getElementsByClassName("slick-header-column");
	    /*Se cambia el tama�o del encabezado de tabla de header certificados*/
	    for(var i = 0; i<7; i++){
		    x[i].style.height="20px";
		    
	    }
	    
}

function mostrarDetalleMovimientoSeleccionado(numero,productor,moneda, movimiento,periodo){
	$.ajax({
		  url : 'datosDetalleMovimientoProductorCC',
		    contentType: 'application/json', 
		    data : { productor : productor, moneda:moneda, periodo : periodo , movimiento:movimiento},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		ocultarMOstrarbontesPanelD(json[0]['P_TF_LISTA_TP_MOVIMIENTO']);
	    		$("#valorPreliquidacionProd").val(json[numero]['P_TF_LISTA_COMPROBANTE']);
	    		$("#valorRemesa").val(json[numero]['P_TF_LISTA_REMESA']);
	    		$("#valorCompromiso").val(json[numero]['P_TF_LISTA_IMPUTACION']);

	    			llenarDinamicamente(json[numero]);
	    			
	    	    	$('#DATO_MOVIMIENTO_PROD').text("Movimiento #"+numero);	    	    	
	    	    	$('#DATO_COMISION_PROD_CC').html("<b>$"+validarCampoVacio(json[numero]['P_TF_LISTA_COMISION'])+"</b>");	    	    	

	    			
			    	abrirPopUpNuevo('productorMovCCPopUp');	

	    	} catch (e) {
	    		alert('Code 77128 : No pudo cargar.');
	    	}
	    	$.unblockUI();
	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
	    	mostrarError('3133 - Se a producido un inconveniente el detalle del movimiento seleccionado');
	    },
	   
	});
	
}


function updateFilterProductor() {
    dataView.setFilterArgs({
      searchString: buscarFiltroMovimientos
    });
    dataView.refresh();
}

function filtroProductorMovimiento(item) {

	//var posicion = item["posicion"];
	
    if (buscarFiltroMovimientos != "" && item["posicion"].indexOf(buscarFiltroMovimientos) == -1
        && item["fecha"].indexOf(buscarFiltroMovimientos) == -1
        && item["imputacion"].indexOf(buscarFiltroMovimientos) == -1
        && item["comprobante"].indexOf(buscarFiltroMovimientos) == -1
        && item["obs"].indexOf(buscarFiltroMovimientos) == -1) {
        
    	return false;
    }

    if (item.parent != null) {
        var parent = data[item.parent];
        //var posicionParent = parent["posicion"];
    	
        while (parent) {
            if (parent._collapsed ||
                (buscarFiltroMovimientos != "" && item["posicion"].indexOf(buscarFiltroMovimientos) == -1
                        && parent["fecha"].indexOf(buscarFiltroMovimientos) == -1
                        && parent["imputacion"].indexOf(buscarFiltroMovimientos) == -1
                        && parent["comprobante"].indexOf(buscarFiltroMovimientos) == -1
                        && parent["obs"].indexOf(buscarFiltroMovimientos) == -1)) {
                        
                return false;
            }

            parent = data[parent.parent];
        }
    }

    return true;

	
	
}

function ocultarMOstrarbontesPanelD(tipo){


	if(tipo == 'LN'){
		$('#botonPreliquidacion').show();
		$('#botonRemesas').hide();
		$('#botonCompromiso').hide();
	}
	
	else if(tipo == 'CH' || tipo == 'CD'){
		$('#botonPreliquidacion').hide();
		$('#botonRemesas').show();
		$('#botonCompromiso').hide();
	}
	
	else if(tipo == 'LI'){
		$('#botonPreliquidacion').hide();
		$('#botonRemesas').hide();
		$('#botonCompromiso').show();
	}

	else{
		$('#botonPreliquidacion').hide();
		$('#botonRemesas').hide();
		$('#botonCompromiso').hide();
	}

}


