function inicioPreliquidacionHome() {
	bloquearPantallaGris();
	activarCaru();
	$( "#timeLineItemPreliquidacion1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
})
}


function buscadorPanelCEntidadPreliquidacion() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaPreliquidacion");
	  filter = input.value.toUpperCase();
	  
	  
	  $(".datoPreliquidacionCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoPreliquidacionCarusel", "micaruB");
		  var idEncabezado = idH6.replace("datoPreliquidacion", "nroPreliquidacion");
		  
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idEncabezado).innerHTML.toUpperCase().indexOf(filter) > -1 )) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  
}


function mostrarPanelPreliquidacion(obj,nuCard,icono,ramo,poliza){

	
	var valorPre=document.getElementById("valorPreliquidacion").value;

	
	bloquearPantallaGris();
	$.ajax({
	    url : 'infoDetallePre',
	    contentType: 'application/json', 
	    data : { preliquidacion : valorPre},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var card=nuCard -1;
	    		llenarDinamicamente(json[card]);		
    	    	
	    		$('#panelDPreli').show();
	    		
				$("#DATO_POLIZA_PRE").html("<b> " + validarCampoVacio(json[card]['P_TF_LISTA.RAMO']) +" - "+validarCampoVacio(json[card]['P_TF_LISTA.POLIZA'])+  "</b>");
				$("#DATO_TOTAL_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.MT_TOTAL'])) +  "</b>");
				$("#DATO_EXIGIBLE_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.MT_EXIGIBLE'])) +  "</b>");
				$("#DATO_APAGAR_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.MT_A_PAGAR'])) +  "</b>");
				$("#DATO_EMITIR_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.REMESA_DEV'])) +  "</b>");
				$("#DATO_DEVOLUCION_PRE").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_LISTA.MT_REM_A_EMITIR'])) +  "</b>");
				$("#DATO_FE_COBRO").html("<b>" + validarCampoVacio(formatearFechaJson(json[card]['P_TF_LISTA.FE_COBRO'])) +  "</b>");
				$("#DATO_CERTIFICADO").html("<b>" + validarCampoVacio((json[card]['P_TF_LISTA.CERTIFICADO'])) +  "</b>");
				$("#DATO_SUCURSAL").html("<b>" + validarCampoVacio((json[card]['P_TF_LISTA.SUCURSAL'])) +  "</b>");

    	    	$(".seleccionPanelB").each(function(){
    	     	    $(this).css("background","white");
    	     	});
    	    	$('#'+obj+nuCard).css("background","#bac2bb");
    	    	
    	    	$('#labelDetallePre').html("Informacion del Detalle #"+ramo+"-"+poliza);
    	    	
    	    	var d1 = document.getElementById("panelImagenPre");
    	    	d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+getIconoRamo(ramo)+'</i>';
			
	    	}
	    	catch(e)
	    	{
		        alert('No se encontro un detalle de la informaci&oacute;n',e);
	    		
	    	}
	    	
	    	
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};
	


function paginadoPre(pag){
	
	var valorPre=document.getElementById("valorPreliquidacion").value;
	var cantidadPag = document.getElementById("cantidadPag").value;
	var totalPag =parseInt(cantidadPag)+ parseInt(pag);
	$('#cantidadPag').val(totalPag);
		
	if(totalPag <= 0){
		
		$('#cantidadPag').val(1);
		mostrarError('Por favor,avance hacia la derecha para continuar con el paginado');
		
	}else{
		bloquearPantallaGris();
		$.ajax({
		    url : 'datosDetallePrePaginado',
		    contentType: 'application/json', 
		    data : { preliquidacion : valorPre, pagina:totalPag},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		$('#paginadoEndososBtn').css('display','');
		    		var d1 = document.getElementById("panelPrePaginado");
	    	    	d1.innerHTML = '';
	    	    	var panelNuevo = '';
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		var card =int;
	    	    		var poliza = validarCampoVacio((json[int]['P_TF_LISTA.POLIZA']));
	    	    		var ramo = validarCampoVacio((json[int]['P_TF_LISTA.RAMO']));
	    	    		var certificado = validarCampoVacio((json[int]['P_TF_LISTA.CERTIFICADO']));
	    	    		var timeLineItemPreliquidacion = "'timeLineItemPreliquidacion'";
	    	    		var icono = getIconoRamo(json[int]['P_TF_LISTA.RAMO']);
	    	    		var ss ="''";
	    	    		panelNuevo = panelNuevo+''+
	    	    		'<div  id="cuadroImgEndoso" style="cursor:pointer; background-color:#ffffff">'+
	    	    		'<div class="timeline__post seleccionPanelB" style="cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px" id="timeLineItemPreliquidacion'+int+'" onclick="mostrarPanelPreliquidacion('+timeLineItemPreliquidacion+','+card+','+ss+','+ramo+','+poliza+')";>'+
	                    '<div class="timeline__content" style="overflow:hidden;">'+
	                    '<i class="material-icons altoIcono"  style="color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;"  id="imgTimeLineEndoso$nroPoliza">'+icono+'</i>'+
	                    '<h6>Ramo:<b>  '+ramo+'  </b></h6>'+
	                    '<h6>P&oacute;liza :<b> '+poliza+' </b></h6>'+
	                    '<h6>Certificado :<b> '+certificado+' </b></h6>'+
	                    '</div>'+
	                    '</div>'+
	                    '</div>';
	    	    	
	    	    	}
	    	    	d1.innerHTML = panelNuevo +'</div>';
		    		
	    			
	    			$(".btnPaginado").each(function(){
	    		 	    $(this).css("background","white");
	    		 	});
		    		
		    	} catch (e) {
		    		mostrarError('Se genero un inconveniente mostrar los endosos, Error:'+e);
		    	}
		    	$.unblockUI();
				
		    },
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	
		    	document.getElementById("cantidadPag").value -= 1;
		    	
				mostrarError('Por favor, avance hacia la izquierda para continuar con el paginado anterior');

		    	
		    },
		 
		   
		});
		
	}
	
	
	
}



function getIconoRamo(ramoIn) {
	
	if (ramoIn == null) 
		return "";
	var ramo = ramoIn 
	
	if (ramo == "1") 
		return "&#xE80E;";
	if (ramo == "2") 
		return "&#xE558;";
	if (ramo == "3") 
		return "&#xE195;";
	if (ramo == "4") 
		return "&#xE531;";
	if (ramo == "5") 
		return "&#xE3AD;";
	if (ramo == "6") 
		return "&#xE899;";
	if (ramo == "7") 
		return "&#xE90E;";
	if (ramo == "8") 
		return "&#xE88A;";
	if (ramo == "9") 
		return "&#xE545;";
	if (ramo == "10") 
		return "&#xE3EA;";
	if (ramo == "11") 
		return "&#xE60E;";
	if (ramo == "12") 
		return "&#xE8F9;";
	if (ramo == "13") 
		return "&#xE333;";
	if (ramo == "14") 
		return "&#xE7F1;";
	if (ramo == "15") 
		return "&#xE02F;";
	if (ramo == "16") 
		return "&#xE536;";
	if (ramo == "17") 
		return "&#xE7FB;";
	if (ramo == "18") 
		return "&#xE532;";
	if (ramo == "21") 
		return "&#xE7FD;";
	if (ramo == "22") 
		return "&#xE91B;";
	
	return "all_inclusive";
	
}





function getDatosModalCancelacion(card,valor){
	
	var valorPre=document.getElementById("valorPreliquidacion").value;
		
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'infoDetalleCancel',
	    contentType: 'application/json', 
	    data : { preliquidacion : valorPre},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		if(valor == 0){
	    		var posicion = card -1;
	    		}
	    		else{
		    		var posicion = card;
	    		}
	    		$("#DATOS_MODAL_CANCELACION_PRE").html("Cancelaci&oacute;n de la Preliquidaci&oacute;n #<b>" + valorPre + "</b>");
				$("#DATO_MONEDA_CANCELACION").html("<b> " + validarCampoVacio(json[posicion]['P_TF_LISTA_CAPC_MONEDA_CANCELACION']) +" - "+validarCampoVacio(primeraLetraMayus(json[posicion]['P_TF_LISTA_INB_DE_MONEDA_CANCELACION']))+  "</b>");
				$("#DATO_CANCELACION").html("<b> "+validarCampoVacio(formatearMoneda(json[posicion]['P_TF_LISTA_CAPC_MT_CANCELADO']))+  "</b>");
 			      
				
				llenarDinamicamente(json[posicion]);	
			//Abre el modal
			$("#cancelacionPrePopUp").modal({
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
		        alert('No posee datos',e);
	    		
	    	}
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


function descargarDetallePreliExcel(){
	
	var preliquidacion = document.getElementById("valorPreliquidacion").value;
	
	location.href = '/PSPES/descargarPreliExcel?preliquidacion=' + preliquidacion;
	
}
