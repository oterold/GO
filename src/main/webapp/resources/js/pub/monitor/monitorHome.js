function refrescarMonitor(){
	bloquearPantallaGris();
	
	var dato3 = $('#annioSelectorMonitor').val();
	var dato2 = $('#mesSelectorMonitor').val();	
	
	var dato1 = $('#diaSelectorMonitor').val();
    
    location.href = "/PSPES/monitor?p1=" + dato1 +"&p2=" + dato2 +"&p3=" + dato3;
}

function inicioMonitorHome(){
	
	var dia = $('#valorDiaMonitor').val();
	var mes = $('#valorMesMonitor').val();
	var annio = $('#valorAnnioMonitor').val();
	
	
	  $("#diaSelectorMonitor").val(dia);
	  $("#mesSelectorMonitor").val(mes);
	  $("#annioSelectorMonitor").val(""+annio);
}


function mostrarPanelCMonitorHome(user){
	bloquearPantallaGris();

	var dia = $('#diaSelectorMonitor').val();
	var mes = $('#mesSelectorMonitor').val();
	var annio = $('#annioSelectorMonitor').val();
	
	$.ajax({
	    url : 'datosMonitorUser',
	    contentType: 'application/json', 
	    data : {dia:dia,mes:mes,annio:annio,user:user},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$(".seleccionPanelB").each(function(){
	    	 	    $(this).css("background","white");
	    	 	});
	    		$('#card'+user).css("background","#bac2bb");
	    		
	    		
	    		
	    		var d1 = document.getElementById("datosNavegacionMonitor");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-accesoriosCotizacionHome" role="cell"><h6>'+validarCampoVacio(json[int]['fecha']) +'</h6></td>'+
		            '<td class="td-grilla-accesoriosCotizacionHome" role="cell"><h6>'+validarCampoVacio(json[int]['pantalla']) +'</h6></td>'+
		            '<td class="td-grilla-accesoriosCotizacionHome" role="cell"><a href="'+validarCampoVacio(json[int]['url'])+'">'+validarCampoVacio(json[int]['url']) +'</a></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';

    	    	
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

function exportarUsuariosMonitor(){
	var dia = $('#diaSelectorMonitor').val();
	var mes = $('#mesSelectorMonitor').val();
	var anio = $('#annioSelectorMonitor').val();
	
	location.href = "/PSPES/exportarUsuariosMonitor?p1=" + dia +"&p2=" + mes +"&p3=" + anio;
}

function exportarUsuariosTotalMonitor(){
	
	var mes = $('#mesSelectorMonitor').val();
	var anio = $('#annioSelectorMonitor').val();
	
	location.href = "/PSPES/exportarUsuariosAccesoTotal?p1=" + mes +"&p2=" + anio;
}