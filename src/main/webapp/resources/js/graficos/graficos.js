
function inicioCotizacionMonedaHome(){
	
	bloquearPantallaGris();
	

	  $('#datepickerCotizacionMonedaDesde').datepicker({
			defaultDate:new Date(new Date().getFullYear(), new Date().getMonth()),
			format: 'dd/mm/yyyy',
		    minViewMode: 0,
		    firstDay: 1,
		    language: 'es',
		    orientation: 'bottom auto',
		    autoclose:true,
		    multidate: false
		});
		$('#datepickerCotizacionMonedaDesde').datepicker(
		"setDate" , new Date(new Date().getFullYear(), new Date().getMonth()-1,new Date().getDate()));
		  
	  $('#datepickerCotizacionMonedaHasta').datepicker({
			defaultDate:"",
			format: 'dd/mm/yyyy',
		    minViewMode: 0,
		    firstDay: 1,
		    language: 'es',
		    orientation: 'bottom auto',
		    autoclose:true,
		    multidate: false
		});
		$('#datepickerCotizacionMonedaHasta').datepicker(
				"setDate" , new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate()));
		  
		$( "#dolarCard" ).trigger( "click" );

			$.unblockUI();

}


function mostrarCotizacionMoneda(id,moneda){
	bloquearPantallaGris();
	
	$('#monedaCotizacion').val(moneda);

				$(".timeline__post").each(function(){
			 	    $(this).css("background","white");
			 	});
				
				$('#'+id).css("background","#bac2bb");
				
				mostrarSelectorCambioMoneda(moneda);
				
	    		$.unblockUI();

				
}


function mostrarSelectorCambioMoneda(){
	
	var select = document.getElementById('selectorMonedaCotizacion');
	var valorSelect = select.options[select.selectedIndex].value;
	var d1 = document.getElementById("panelGraficosCotizacionMoneda");
	d1.innerHTML = ' ';
	if(valorSelect == '01'){
    	var panelNuevo='<div class="col-md-12">'+
    				   '<h5 style="border:none;">*Compra</h5></div>'+
    				   '<div id="chart_div"></div></div>'+
    				   '<div class="col-md-12" style="padding-top:10px;"><hr style="margin-top:5px;margin-bottom:5px;width:100%;"></div>'+
    				   '<div class="col-md-12"><h5 style="border:none;">*Venta</h5></div><div id="chart_div_b"></div></div>';
    	d1.innerHTML = panelNuevo;
    	
    
        
	
	google.charts.load('current', {packages: ['corechart', 'line'],language:'es'});
	google.charts.setOnLoadCallback(drawCrosshairs);
	
	google.charts.load('current', {packages: ['corechart', 'line'],language:'es'});
	google.charts.setOnLoadCallback(drawCrosshairsB);
	}
	else{
		var panelNuevo='<div class="col-md-12" style="text-align: left;height: 350px;overflow-y:auto;padding:0px">'+
		'<div><table class="table table-hover table-grilla" role="table">'+
		'<thead class="thead-grilla" role="rowgroup">'+
		'<tr class="tr-grilla" role="row">'+
		'<th class="th-grilla" role="columnheader">Fecha</th>'+
		'<th class="th-grilla" role="columnheader">Compra</th>'+
		'<th class="th-grilla" role="columnheader">Venta</th>'+
		' <tbody class="tbody-grilla" id="datosTablaCambioMoneda"></tbody>'+
		'</table></div></div></div>';
    	d1.innerHTML = panelNuevo;
    	mostrarTablaMoneda();

	}
	
}


function mostrarTablaMoneda(){
	
	bloquearPantallaGris();
	
	var valorDatapickerDesde = $("#datepickerMonedaDesde").val(); 
	var moneda=document.getElementById("monedaCotizacion").value;

	monedaCotizacion
	var valorDatapickerHasta= ($("#datepickerMonedaHasta").val()); 
	$.ajax({
	    url : 'datosCotizacionMoneda',
	    contentType: 'application/json', 
	    data : {fechaDesde:valorDatapickerDesde,fechaHasta:valorDatapickerHasta,moneda:moneda },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
	    		
	    		var d1 = document.getElementById("datosTablaCambioMoneda");
    	    	d1.innerHTML = ' ';

    	    	var panelNuevo = '';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo + '<tr class="tr-grilla">';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-monedaCotizacionHome" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_CATA_FE_CAMBIO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-monedaCotizacionHome" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_CATA_TA_CAMBIO_COMPRA'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-monedaCotizacionHome" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_CATA_TA_CAMBIO_VENTA_UTIL'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	
	    	} catch (e) {
	    		mostrarError('Code 34511 : No pudo cargar la conversion');
	    	}
    		$.unblockUI();

	    	
	    },
	    error: function (request, status, error) {
	    	var d1 = document.getElementById("panelGraficosCotizacionMoneda");
	    	d1.innerHTML = ' ';
	    	var panelNuevo='<div class="col-md-12" style="text-align: left;height: 350px;overflow-y:auto;padding:0px"><h5 style="padding-top:10%;text-align:center;border:none;">No se pudo encontrar un valor para la fecha ingresada. Por favor seleccione otra fecha o moneda.</h5></div>';
	    	d1.innerHTML = panelNuevo;
	    	
	    	$.unblockUI();
	    },
	   
	});
	
}



//grafico de Compra

function drawCrosshairs() {
	bloquearPantallaGris();

	var valorDatapickerDesde = ($("#datepickerMonedaDesde").val()); 
	var moneda=document.getElementById("monedaCotizacion").value;
	var valorDatapickerHasta= ($("#datepickerMonedaHasta").val()); 
	
	
	$.ajax({
	    url : 'datosCotizacionMoneda',
	    contentType: 'application/json', 
	    data : {fechaDesde:valorDatapickerDesde, fechaHasta:valorDatapickerHasta, moneda:moneda },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try {
	
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'X');
      data.addColumn('number', 'Pesos');
		for ( var int = 0; int < json.length; int++) {
			
			try {
				
			var b = formatearFechaJson(json[int]['P_TF_LISTA_CATA_FE_CAMBIO']).split(/\D/);
			if(Number(b[2])>1900){
				
			data.addRows([
		        [new Date(b[2], --b[1], b[0], 0, 0, 0,0), Number(json[int]['P_TF_LISTA_CATA_TA_CAMBIO_COMPRA'])],
		      ]);
			}  
			} catch (e) {
				// TODO: handle exception
			}
		}
		
		
      var options = {
        colors: ['#22700e'],
        crosshair: {
          color: '#000',
          trigger: 'selection'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
      chart.setSelection([{row: 38, column: 1}]);

	    	} catch (e) {


	    		mostrarError('error : 1928748'+e);
	    	}
			$.unblockUI();

	    },
	 
	    error : function(xhr, status) {
	    	var d1 = document.getElementById("panelGraficosCotizacionMoneda");
	    	d1.innerHTML = ' ';
	    	var panelNuevo='<div class="col-md-12" style="text-align: left;height: 350px;overflow-y:auto;padding:0px"><h5 style="padding-top:10%;text-align:center;border:none;">No se pudo encontrar un valor para la fecha ingresada. Por favor seleccione otra fecha o moneda.</h5></div>';
	    	d1.innerHTML = panelNuevo;			$.unblockUI();

	        },
	 
	   
	});
	
};



//grafico de venta

function drawCrosshairsB() {
	bloquearPantallaGris();

	var valorDatapickerDesde = ($("#datepickerMonedaDesde").val()); 
	var moneda=document.getElementById("monedaCotizacion").value;
	var valorDatapickerHasta= ($("#datepickerMonedaHasta").val()); 
	$.ajax({
	    url : 'datosCotizacionMoneda',
	    contentType: 'application/json', 
	    data : {fechaDesde:valorDatapickerDesde, fechaHasta:valorDatapickerHasta,moneda:moneda },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try {
	
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'X');
      data.addColumn('number', 'Pesos');
		for ( var int = 0; int < json.length; int++) {
			var b = formatearFechaJson(json[int]['P_TF_LISTA_CATA_FE_CAMBIO']).split(/\D/);
			try {
				
				if(Number(b[2])>1900){  
				data.addRows([
			        [new Date(b[2], --b[1], b[0], 0, 0, 0,0), Number(json[int]['P_TF_LISTA_CATA_TA_CAMBIO_VENTA_UTIL'])],
			      ]);
				}
			} catch (e) {
				// TODO: handle exception
			}
			
		}
		
		
      var options = {
        colors: ['#22700e'],
        crosshair: {
          color: '#000',
          trigger: 'selection'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div_b'));

      chart.draw(data, options);
      chart.setSelection([{row: 38, column: 1}]);

	    	} catch (e) {


	    		mostrarError('error : 1928748'+e);
	    	}
			$.unblockUI();

	    },
	 
	    error : function(xhr, status) {
	    	var d1 = document.getElementById("panelGraficosCotizacionMoneda");
	    	d1.innerHTML = ' ';
	    	var panelNuevo='<div class="col-md-12" style="text-align: left;height: 350px;overflow-y:auto;padding:0px"><h5 style="padding-top:10%;text-align:center;border:none;">No se pudo encontrar un valor para la fecha ingresada. Por favor seleccione otra fecha o moneda.</h5></div>';
	    	d1.innerHTML = panelNuevo;	
	    	$.unblockUI();

	        },
	 
	   
	});
	
};