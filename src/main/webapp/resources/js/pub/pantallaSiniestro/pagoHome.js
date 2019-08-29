function buscadorPanelCEntidadPago() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaPago");
	  filter = input.value.toUpperCase();
	
	  $(".datoPagoCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoConcep", "micaruB");
		  var idEncabezado = idH6.replace("datoConcep", "nroConcep");
		
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









function mostrarDetallePagoHome(obj,num,icono,compromiso){

	bloquearPantallaGris();
	$("#valorNumeroCompromiso").val(compromiso);
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosListaPagos',
	    contentType: 'application/json', 
	    data : {compromiso:compromiso} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);
			$("#DATO_SECTOR").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_CD_DEPARTAMENTO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_DE_DEPARTAMENTO']))+ "</b>");
			$("#DATO_EGRESO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_CD_EGRESO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_DE_TIPO_EGRESO']))+ "</b>");
			$("#DATO_MONEDA").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_SIGNO_MONEDA']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_INB_MONEDA']))+ "</b>");
			$("#DATO_DOCUMENTO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_TP_DOCUMENTO']) +" - "+validarCampoVacio(json[0]['P_TF_DETA_CJCR_NU_DOCUMENTO'])+ "</b>");
			$("#DATO_PAGO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_CD_FORMA_PAGO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_DE_FORMA_PAGO']))+ "</b>");
			$("#DATO_BANCO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETA_CJCR_CABA_CD_BANCO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETA_DE_BANCO']))+ "</b>");
			$("#DATO_OBS").html("<b onclick=\"swal('Observaciones','"+primeraLetraMayus(json[0]['P_TF_DETA_CJCR_OBSERVACIONES'])+"','warning');\"> " + validarCampoVacio(campoObs(json[0]['P_TF_DETA_CJCR_OBSERVACIONES'])) +"</b>");
	//muestra el panel D
		$('#panelb').hide();
		$('#panela').show();
		$('#panelDetallePago').show();
		$('#verMasPanelA').text('Ver mas');

		
		
		$(".seleccionPanelB").each(function(){
	 	    $(this).css("background","white");
	 	});
		$('#'+obj+num).css("background","#bac2bb");
		
		$('#labelPanelDetallePago').html("Compromiso #"+ compromiso);
		
		var d1 = document.getElementById("panelImagenDetalle");
		d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#271765;">'+icono+'</i>';
    	}
    catch(e){
    		alert('Error (5467) generado por : '+e);
    	}
  //ARRANCA EL PANEL C JSON
    
    
	$.ajax({
	    url : 'datosConceptos',
	    contentType: 'application/json', 
	    data : {compromiso:compromiso} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
				
	    		$('#cantidadConceptos').text("Conceptos (" + json.length + ")");	    	    	
    	    	$('#cantidadConceptos').parent().next().find('i:first').remove();
    	    	$('#cantidadConceptos').parent().next().append('<i class="material-icons altoIcono"  style="color:#271765;padding-top:15px;" >&#xE02f;</i>');
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");
    	    	var d1 = document.getElementById("caruMayor");
    	    	d1.innerHTML = ' ';
    	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
    	    	  
    	    	for ( var int = 0; int < json.length; int++) {
    	    	
    	    		var num=int+1;
    	    		var nroInsp= 'nroConcep'+num;
    	    		var DatoInsp= 'datoConcep'+num;
    	    		
    	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'"  class="item" style="height:105px; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#271765; border-style: solid; box-shadow: 0 0 0px black;">'+
    	    		'<h6 id='+nroInsp+' style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#271765;color:#ffffff;">Concepto #'+json[int]['P_TF_CONCEPTOS_CJOC_CD_CONCEPTO']+'</h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel"><b>'+primeraLetraMayus(json[int]['P_TF_CONCEPTOS_DE_CONCEPTO'])+'</b></h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel">Neto : <b>'+formatearMoneda(json[int]['P_TF_CONCEPTOS_CJOC_MT_NETO'])+'</b></h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel">Bruto : <b>'+formatearMoneda(json[int]['P_TF_CONCEPTOS_CJOC_MT_BRUTO'])+'</b></h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel">Ret. Iva. : <b>'+formatearMoneda(json[int]['P_TF_CONCEPTOS_CJOC_RET_IVA'])+'</b></h6>'+
    	    		'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoPagoCarusel">Iva : <b>'+json[int]['P_TF_CONCEPTOS_CJOC_RET_IVA']+'</b></h6><br></div>';
	    	    	
    	    	}
    	    	d1.innerHTML = caruNuevo;  
	    	
    	    	activarCaru();
    	    	} catch (e) {
    	    		alert('Disculpe, existio un problema codigo:11113',e);	     
    	    	}	        	    	
    	    	$.unblockUI();
    	    },
    		 
    	    // c�digo a ejecutar si la petici�n falla;
    	    // son pasados como argumentos a la funci�n
    	    // el objeto de la petici�n en crudo y c�digo de estatus de la petici�n
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	    	$('#cantidadConceptos').text("Conceptos");	    	    	
    	    	$('#cantidadConceptos').parent().next().find('i:first').remove();
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");
    	        document.getElementById("micaru").innerHTML = request.responseText; 
    	    	
    	       },
    	   
    	   });
    
    
    
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError('Disculpe, no existen detales del pago');
	    }
	});
}


function mostrarPanelD(idPanelA,idPanelB,idBoton)
{
	if( $('#'+idPanelB).is(":visible") ){
		$('#'+idPanelB).hide();
		$('#'+idBoton).text('Ver menos');

	}else{
		$('#'+idPanelB).show();
		$('#'+idBoton).text('Ver mas');
		
	}
};



function inicioPagoHome() {
	bloquearPantallaGris();
	activarCaru();
	$( "#timeLineItemPago1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
	})
	
	$.unblockUI();

}


function abrirModalCronograma(){
	
	var valorCompromiso=document.getElementById("valorNumeroCompromiso").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosCronograma',
	    contentType: 'application/json', 
	    data : { compromiso : valorCompromiso},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);	
	    	$("#DATO_CRONOGRAMA").html("Cronograma del Compromiso <b> #" +valorCompromiso+ "</b>");
	    	$("#DATO_MONEDA_CRON").html("<b>" +validarCampoVacio(json[0]['P_TF_CRON_CJPA_CAMO_CD_MONEDA'])+ " - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_CRON_W_DESC_MONEDA']))+" </b>");
	    	$("#DATO_IMPORTE").html("<b> " +validarCampoVacio(formatearMoneda(json[0]['P_TF_CRON_CJPA_MT_IMPORTE_ORIGINAL']))+ "</b>");
	    	$("#DATO_PAGO_CRON").html("<b> " +validarCampoVacio(formatearMoneda(json[0]['P_TF_CRON_CJPA_MT_MONEDA_PAGO']))+ "</b>");
	    	
	    	
	    	
			//Abre el modal
			$("#cronogramaPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Error : 553453. Se produjo un inconveniente al cargar los datos del cronograma',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	   
	    	 },
	 
	   
	});
	

};

function campoObs(campo){
	try {
		if(campo.length> 20 && campo != ""){
			campo = campo.replace("  ", " ");
			campo = "<h6 style='color:#6fa1d4'><b>" +campo.substring(0,20) + "....</b></h6>";;
		}
	} catch (e) {
		// TODO: handle exception
	}
	return campo;
}


