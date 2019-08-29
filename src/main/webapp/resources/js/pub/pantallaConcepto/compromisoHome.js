function mostrarDetalleConcepto(obj,card,concepto)
{	
	
		var valorConcepto = document.getElementById("valorConceptoCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    url : 'datosDetalleConcepto',
		    contentType: 'application/json', 
		    
		    data : {concepto :valorConcepto} ,
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    	$.unblockUI();
		    	var cardValor = card -1;
				llenarDinamicamente(json[cardValor]);
				
				$('#panelb').hide();
				$('#panela').show();
				$('#verMasPanelA').text('Ver mas');
				
				$(".seleccionPanelB").each(function(){
			 	    $(this).css("background","white");
			 	});
				$(".timeline__date").each(function(){
			 	    $(this).css("background","white");
			 	});
				
				$('#'+obj+card).css("background","#bac2bb");
				$('#panelDetalleConcepto').show();
				$('#labelPanelConcepto').html("Informacion del Concepto #" + concepto);
				
		    	} catch (e) {
		    		mostrarError('Se genero un inconveniente, al cargar la sucursal de la poliza. Error:'+e);
		    	}
		    	
				
		    },
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
	};

		
	function inicioCompromisoHome() {
		bloquearPantallaGris();
		activarCaru();
		$( "#timeLineItemConceptos1" ).trigger( "click" );
		shortcut.add("esc",function() {
			$( ".cerrarModalBotonHoover" ).trigger( "click" );
		})
		$.unblockUI();
	
}
	
	function abrirPopUpBeneficiarioCompromisoHome(compromiso,numeroCard){
		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosDetalleBeneficiarioCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : compromiso},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    	$.unblockUI();
		    	var card=numeroCard -1 ;
		    	llenarDinamicamente(json[card]);

				$("#DATO_BENEFICIARIO").html("Beneficiaro <b>#" + json[card]['P_TF_COMPR_CJCR_BENEFICIARIO']+"</b>" );
				$("#DATO_FACTURA_BENEF").html("<b>" + json[card]['P_TF_COMPR_CJCR_TP_FACTURA']+" - " + json[card]['P_TF_COMPR_INB_DES_TP_FACTURA']+"</b>" );

				//Abre el modal
				$("#beneficiarioPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}
		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos del beneficiario',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};
	
	
	
	function abrirPopUpFormaDePagoCompromisoHome(){
		var valorConcepto = document.getElementById("valorCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosFormaPagoCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : valorConcepto},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    	$.unblockUI();
		    	llenarDinamicamente(json[0]);

				$("#DATO_FORMAPAGO_COMPROMISO").html("Forma de Pago <b>#" + valorConcepto );
				$("#DATO_FORMAPAGO_DESC").html("<b>" + validarCampoVacio(json[0]['P_TF_COMPR_CJCR_CD_FORMA_PAGO'])+ " - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COMPR_INB_DESC_FORMA_PAGO']))+"</b>" );
				$("#DATO_BANCO_FORMAPAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_COMPR_CJCR_CABA_CD_BANCO'])+ " - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COMPR_INB_DESC_BANCO']))+"</b>" );
				$("#DATO_SUC_FORMAPAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_COMPR_CJCR_CABS_NU_SUC_BANCO'])+ " - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COMPR_INB_DESC_SUC_BANCO']))+"</b>" );
				$("#DATO_TP_CUENTA_FORMAPAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_COMPR_CJCR_TP_CUENTA'])+ " - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_COMPR_INB_DESC_TP_CUENTA']))+"</b>" );

				
				//Abre el modal
				$("#formaPagoCompromisoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}
		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos del beneficiario',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};
	
	
	
	

	function abrirPopUpAsociacionesCompromisoHome(){
		var valorConcepto = document.getElementById("valorCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosAsociacionesCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : valorConcepto},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		var d1 = document.getElementById("datosAsociacionesCompromiso");
	    	    	d1.innerHTML = ' ';
	    	    	var panelNuevo = ' ';
	    	    	
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_CALI_NU_LIQUIDACION']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_CJND_NU_NOTA']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_CJIN_NU_INGRESO']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_NU_SECUENCIA']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CAPC_MT_CANCELADO']) +'</td>'+
			            '</tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo + '</tr>';

	    	    	$("#DATO_ASOCIACIONES_COMPROMISO").html("Asociaciones #<b>"+valorConcepto+"</b>");

	    	    	$.unblockUI();
				//Abre el modal
				$("#asociacionesCompromisoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}

		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos del beneficiario',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};

	
	

	function abrirPopUpErrorCompromisoHome(){
		var valorConcepto = document.getElementById("valorCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosErroresCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : valorConcepto},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		var d1 = document.getElementById("datosErrorCompromiso");
	    	    	d1.innerHTML = ' ';
	    	    	var panelNuevo = ' ';
	    	    	
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_NU_ORDEN']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_CJDP_CD_DEPARTAMENTO']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_NU_SECUENCIA']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_CJCR_NU_COMPROMISOS']) +'</td>'+
			            '<td class="td-grilla-asociacionesCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJER_DE_ERROR']) +'</td>'+
			            '</tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo + '</tr>';

	    	    	$("#DATO_ERROR_COMPROMISO").html("Errores #<b>"+valorConcepto+"</b>");

	    	    	$.unblockUI();
				//Abre el modal
				$("#ErrorCompromisoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}

		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos de los errores',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};
	
	

	function abrirPopUpCronogramaCompromisoHome(){
		var valorConcepto = document.getElementById("valorCompromiso").value;

		bloquearPantallaGris();
		$.ajax({
		    // la URL para la petici�n
		    url : 'datosCronogramaCompromiso',
		    contentType: 'application/json', 
		    data : { compromiso : valorConcepto},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		var d1 = document.getElementById("datosCronogramaCompromiso");
	    	    	d1.innerHTML = ' ';
	    	    	var panelNuevo = ' ';
	    	    	
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_COMPR_CJPA_CJCR_FE_CAMBIO'])) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJPA_MT_IMPORTE_ORIGINAL']) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJPA_CATA_TASA_CAMBIO']) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJPA_CJCR_NU_COMPROMISO']) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_CJPA_PO_DISTRIBUCION']) +'</td>'+
			            '<td class="td-grilla-cronogramaCompromiso" role="cell">'+validarCampoVacio(json[int]['P_TF_COMPR_INB_DESC_MONEDA']) +'</td>'+
				           
			            '</tr>';
	    	    	}
	    	    	d1.innerHTML = panelNuevo + '</tr>';

	    	    	$("#DATO_CRONOGRAMA_COMPROMISO").html("Cronograma #<b>"+valorConcepto+"</b>");

	    	    	$.unblockUI();
				//Abre el modal
				$("#cronogramaCompromisoPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	}

		    	catch(e)
		    	{
		    		alert('Se produjo un inconveniente al cargar los datos de los errores',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	mostrarError(xhr['responseText']);	    },
		 
		   
		});
		

	};