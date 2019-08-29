
function redirecPreliquidacionesHome(){
	bloquearPantallaGris();

	var valorPreliquidacion = document.getElementById("valorPreliquidacion").value;

	location.href="/PSPES/homePreliquidacion?preliquidacion="+valorPreliquidacion+"";
	
}


function inicioCobranzaHome(){
	activarCaru();
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );

});
	
}

function mostrarDetalleCuotas(obj,numeroCard,icono,fecha)
{
	bloquearPantallaGris();
	var valorSucursal=document.getElementById("valorSucursal").value;
	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorCertificado=document.getElementById("valorCertificadoCobranza").value;
	

	$.ajax({
	    url : 'detalleCuotas',
	    contentType: 'application/json', 
	    data : { ramo : valorRamo , poliza : valorPoliza,fecha : fecha, certificado : valorCertificado,sucursal:valorSucursal  },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	  
	    	var d1 = document.getElementById("listaTitulo");
	    	var d2 = document.getElementById("listaResultado");
	    	
	    	d1.innerHTML = ' '; 
	    	d2.innerHTML = ' '; 
	    	
	    	var resultadoCuotas = '<div class="tab-content" id="nav-tabContent">';
	    	
	    	var listaCuotas = '<div class="list-group" id="list-tab" role="tablist">';
	    
	    	//llena el panel D
	    	for ( var int = 0; int < json.length; int++) {
	    		var num=int+1;
	    	
	    		//verifica que sea el primero, y si lo es lo acitva y muestra su contenido
	    		if(num == 1){
	    			//Setea el titulo de la lista
	    			listaCuotas = listaCuotas + '<a class="list-group-item list-group-item-action active" id="list'+num+'" data-toggle="list" href="#list-home'+num+'" role="tab" aria-controls="home"><h6>'+(json[int]['P_TF_CUOTA_INB_DE_TIPO'])+'</h6></a>';
	    			//Setea el campo de la lista
	    			resultadoCuotas = resultadoCuotas + '<div class="tab-pane show active" id="list-home'+num+'" role="tabpanel" aria-labelledby="list-home-list'+num+'">'+
	    		'<div class="row" id="panelc"><div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">' +
	    		'<table  style= "width:100%;">'+
                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Fecha:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_CUOTA_CARE_FE_EMISION']))+' - '+ formatearFechaJson(json[int]['P_TF_CUOTA_CARE_FE_HASTA'])+'</b></h6></td></tr> ' +
                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Premio :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_CUOTA_CARE_MT_PRIMA']))+'</b></h6></td></tr>' + 
                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Certificado :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[int]['P_TF_CUOTA_CARE_CACE_NU_CERTIFICADO'])+'</b></h6></td></tr>' + 
                	'</table></div>'+
         		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">'+
	    			'<table  style= "width:100%;">'+
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Prima Pura :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_CUOTA_CARE_MT_PRIMA_PURA']))+'</b></h6></td></tr> ' +
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Periodo :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[int]['P_TF_CUOTA_INB_PERIODO'])+'</b></h6></td></tr>' + 
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Endoso :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[int]['P_TF_CUOTA_CARE_NU_ENDOSO'])+'</b></h6></td></tr>' + 
	                	'</table></div>'+
            	' </div>'+
   			'</div>';
	    		}
	    	//si no es el primero llena los demas campos, pero no los activa
	    		
	    		else{
	    			listaCuotas = listaCuotas + '<a class="list-group-item list-group-item-action" id="list'+num+'" data-toggle="list" href="#list-home'+num+'" role="tab" aria-controls="home"><h6>'+json[int]['P_TF_CUOTA_INB_DE_TIPO']+'</h6></a>';
	    			resultadoCuotas = resultadoCuotas + '<div class="tab-pane" id="list-home'+num+'" role="tabpanel" aria-labelledby="list-profile-list">' +
	    			'<div class="row" id="panelc"><div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">' +
		    		'<table  style= "width:100%;">'+
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Fecha:</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+formatearFechaJson(json[int]['P_TF_CUOTA_CARE_FE_EMISION'])+' - '+ formatearFechaJson(json[int]['P_TF_CUOTA_CARE_FE_HASTA'])+'</b></h6></td></tr> ' +
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Premio :</h6></td><td style="padding-top:5px;"><h6><b>'+(formatearMoneda(json[int]['P_TF_CUOTA_CARE_MT_PRIMA']))+'</b></h6></td></tr>' + 
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Certificado :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_CUOTA_CARE_CACE_NU_CERTIFICADO'])+'</b></h6></td></tr>' + 
	                	'</table></div>'+
	         		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">'+
		    			'<table  style= "width:100%;">'+
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Prima Pura :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+(formatearMoneda(json[int]['P_TF_CUOTA_CARE_MT_PRIMA_PURA']))+'</b></h6></td></tr> ' +
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Periodo :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_CUOTA_INB_PERIODO'])+'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Endoso :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_CUOTA_CARE_NU_ENDOSO'])+'</b></h6></td></tr>' + 
			                
		                	'</table></div>'+
	            	' </div>'+
	   			'</div>';
	    		
	    		}
		
	    	}
	    	
	    	//pasa el codigo al html
	    	d1.innerHTML = listaCuotas;  
	    	d2.innerHTML = resultadoCuotas;  

	    	
	    	$('#panelb').hide();
			$('#panela').show();
			$('#detalleCuotas').show();
			
			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$('#'+obj+numeroCard).css("background","#bac2bb");
			
			$('#labelPanelCuotasConsolidadas').html("Detalle de Cuotas");
			
			//var d1 = document.getElementById("panelImagenCuotasConsolidadas");
		//	d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';

			$.unblockUI();
	    
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    
	    	 },
	 
	});
			
}



function abrirPopUpImputacionesCobranzaHome(idPopUp,numero,preliquidacion){

	var valorSucursal=document.getElementById("valorSucursal").value;

	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorCertificado=document.getElementById("valorCertificadoCobranza").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'datosImputaciones',
	    contentType: 'application/json', 
	    data : {poliza:valorPoliza, ramo:valorRamo,certificado:valorCertificado,sucursal:valorSucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	
	    	for ( var int = 0; int < json.length; int++) {
	    		if(preliquidacion == json[int]['P_TF_IMPUTACION_CJIP_CALI_NU_PRELIQUIDACION']){
	    			posicion = int;
	    			break;
	    		}
	    	}
	    	
			
	    	
	    	
	    	llenarDinamicamente(json[posicion]);

	    	$("#valorPreliquidacion").val(json[posicion]['P_TF_IMPUTACION_CJIP_CALI_NU_PRELIQUIDACION']);
	    	
			$("#DATO_P_TF_IMPUTACION_CJIP_CALI_NU_PRELIQUIDACION").html("Preliquidaci&oacute;n :&nbsp#" + json[posicion]['P_TF_IMPUTACION_CJIP_CALI_NU_PRELIQUIDACION']);

			$("#DATO_P_TF_IMPUTACION_MONEDA").html("<b>" + json[posicion]['P_TF_IMPUTACION_CJIP_CALI_CD_MONEDA'] +" - "+ verificarCampoJson(json[posicion]['P_TF_IMPUTACION_INB_DE_MONEDA'])+ "</b>");
			
			
			$("#INFO_COD_PAGO").html("<b>"+ validarCampoVacio(json[posicion]['P_TF_IMPUTACION_INB_CD_COBRANZA']) +" - " + validarCampoVacio(primeraLetraMayus(json[posicion]['P_TF_IMPUTACION_INB_DE_COBRANZA'])) + "</b>");
			
			$("#DATO_COBRANZA_IMPUTACIONES_PAGADO").html("<b>" + validarCampoVacio(formatearMoneda(json[posicion]['P_TF_IMPUTACION_CJIP_MT_PAGADO'])) +"</b>");

	    	
			//Abre el modal
			$("#"+idPopUp).modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos de la impustacion',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError('Se produjo un inconveniente al cargar los datos de la impustacion');
	    },
	 
	   
	});
	

};


function abrirPopUpModalCliente(id)
{
	
    location.href = "/PSPES/datosCliente?valorCliente="+id+"";

}

function buscarFiltroImputacionesCobranzaHome(idTablaParametricos){
	
	input = document.getElementById("inputImputacionesCobranzaHome");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}
