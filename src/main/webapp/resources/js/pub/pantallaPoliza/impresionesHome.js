
function mostrarProcesoImpressionPoliza(obj,num,icono,proceso,indice, nroSecuencia)
{	
	
bloquearPantallaGris();
	
	//document.getElementById("valorIndiceProceso").value = indice;
	document.getElementById("valorNroSecuencia").value = nroSecuencia;
	

	var valorPoliza=document.getElementById("valorPolizaImpresion").value;
	var valorRamo=document.getElementById("valorRamoImpresion").value;
	var valorImp=document.getElementById("valorSucursalImpresion").value;
	
	
	$.ajax({
	    url : 'datosImpresio',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo : valorRamo, sucursal:valorImp},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	var numCard = num - 1;
	    	llenarDinamicamente(json[numCard]);
	    	$("#procesoImpresion").val(proceso);

	
	//muestra el panel D
	$('#panelb').hide();
	$('#panela').show();
	$('#panelDetalleImpresion').show();
	$('#verMasPanelA').text('Ver mas');

	
	
	$(".seleccionPanelB").each(function(){
 	    $(this).css("background","white");
 	});
	$('#'+obj+num).css("background","#bac2bb");
	
	$('#labelPanelDetalleImpresora').html("Detalle de Impresi&oacute;n #"+ proceso);
	    	}
	catch(e)
	{
		mostrarError('Error 12323131. Se produjo un inconveniente al cargar los datos del movimiento',e);
		
	}
	
	

//ARRANCA EL PANEL C JSON
	
	$.ajax({
	    url : 'datosDetalleImpresion',
	    contentType: 'application/json', 
	    data : { indice : indice,proceso: proceso},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
				
	    		$('#cantidadSentencias').html("Movimientos de la Impresi&oacute;n (" + json.length + ")");	    	    	
	    	    $('#cantidadSentencias').parent().next().find('i:first').remove();
	    	    $('#cantidadSentencias').parent().next().append('<i class="material-icons altoIcono"  style="color:#271765;padding-top:15px;" >&#xE02f;</i>');
	    	    $("#caruMayor").attr("style","text-align:left;padding-left:30px;padding-right:30px;width:100%;height:280px;overflow-y:auto;");
    	   
	    		var d1 = document.getElementById("caruMayor");
    	    	d1.innerHTML = ' ';

    	    	var panelNuevo = '<table class="table table-hover table-grilla" role="table">'+
    			'<thead class="thead-grilla" role="rowgroup">'+
    			'<tr class="tr-grilla" role="row">'+
	            '<th class="th-grilla" role="columnheader">Fecha</th>'+
	            '<th class="th-grilla" style="width:20%;" role="columnheader">Movimiento</th>'+
	            '<th class="th-grilla" role="columnheader">Remito</th>'+
				'<th class="th-grilla" role="columnheader">Rechazo</th>'+
				'<th class="th-grilla" style="width:10%;" role="columnheader">Usuario</th>'+
				'</tr>'+
    			'</thead>'+
    			'<tbody class="tbody-grilla" id="datosDetalleImpresion">'+
    			'</tbody>'+
    			'</table>';
    	    	
    	    	d1.innerHTML = panelNuevo;
	    		var d2 = document.getElementById("datosDetalleImpresion");
	    		
	    		d2.innerHTML = ' ';

    	    	var panelNuevo = '';
    	    	
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo + '<tr class="tr-grilla">';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_MOVIMIENTOS_CFIF_FE_MOVIMIENTO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_MOVIMIENTOS_INB_TP_MOVIMIENTO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_MOVIMIENTOS_CFIF_CFIT_NU_REMITO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_MOVIMIENTOS_INB_RECHAZO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '<td class="td-grilla-detalleImpresionHome" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_MOVIMIENTOS_INB_USUARIO'])) +'</h6></td>';
    	    		panelNuevo = panelNuevo + '</tr>';
    	    	}
    	    	d2.innerHTML = panelNuevo;
	    
    	    	activarCaru();
    	    	} catch (e) {
    	    		alert('Disculpe, existio un problema codigo:11113',e);	     
    	    	}	        	    	
    	    	$.unblockUI();
    	    },
    		 
    	    // codigo a ejecutar si la peticion falla;
    	    // son pasados como argumentos a la funcion
    	    // el objeto de la peticion en crudo y codigo de estatus de la peticion
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	    	$('#cantidadSentencias').text("Movimientos de la impresi&oacute;n");	    	    	
    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;width:100%;");
    	        document.getElementById("micaru").innerHTML = request.responseText; 
    	    	
    	       },
    	   
    	   });
	    },
	
	
error : function(xhr, status) {
	$.unblockUI();
	mostrarError('Se produjo un inconveniente al cargar los datos del productor');
},


});


};

function abrirModalDatosPanelC(poliza,proceso,indice,numCard){
	
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la peticion
	    url : 'datosDetallePanelC',
	    contentType: 'application/json', 
	    data : { poliza : poliza, proceso:proceso,indice:indice},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		llenarDinamicamente(json[numCard]);  	    	
    	    	$("#DATOS_MODAL_IMPRESIONES").html("Movimientos del archivo, Indice #<b>"+indice+"</b>");
    	    	$("#DATOS_IMAGEN_ICONO_IMPRESORA").html("printer");
    			    	
			//Abre el modal
			$("#impresionesPopUp").modal({
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
		        alert('No posee datos detalle',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function inicioImpresoraHome() {
	activarCaru();
	$( "#timeLineImpresora1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );

});
}


function abrirModalNoImpresion(){
	var valorPoliza=document.getElementById("valorPolizaImpresion").value;
	var valorRamo=document.getElementById("valorRamoImpresion").value;
	var valorImp=document.getElementById("valorSucursalImpresion").value;
	
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la peticion
	    url : 'datosNoImpresion',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza, ramo:valorRamo,sucursal:valorImp},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("valorNoImpresionImpresiones");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	

    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-noImpresionImpresionesHome" role="cell">'+validarCampoVacio((json[int]['P_TF_NO_IMPRESION_CFNI_CACW_NU_ENDOSO']))+'</td>'+
		            '<td class="td-grilla-noImpresionImpresionesHome" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_NO_IMPRESION_CFNI_FE_ACTUALIZACION'])) +'</td>'+
		            '<td class="td-grilla-noImpresionImpresionesHome" role="cell">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_NO_IMPRESION_INB_USUARIO'])) +'</td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
                                                    
    	    	
    	    	$("#DATO_MODAL_NO_IMP").html("No impresiones de la p&oacute;liza #<b>"+valorPoliza+"</b>");
    	    	$("#DATOS_IMAGEN_ICONO_IMPRESORA_NO").html("printer");
    			    	
			//Abre el modal
			$("#noImpresionPopUp").modal({
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
		        alert('Error : 9457458',e);
				$.unblockUI();

	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};

function descargarPdfPoliza(){
	
	var nroSecuencia = document.getElementById("valorNroSecuencia").value;
	var valorPoliza=document.getElementById("valorPolizaImpresion").value;
	bloquearPantallaGris();
	$.ajax({
		url : 'existeArchivoIndice',
		contentType : 'application/json',
		data : {
			nroSecuencia : nroSecuencia
		},
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			try {
					location.href = "/PSPES/descargarArchivoPdf?archivoPdf="+json[0]+"&poliza="+valorPoliza;

				$.unblockUI();
			} catch (e) {
				alert('Error : 15610', e);
				$.unblockUI();

			}

		},
		error : function(xhr, status) {
			$.unblockUI();
	    	mostrarError(xhr['responseText']);

			
		},

	});
	
	
}
