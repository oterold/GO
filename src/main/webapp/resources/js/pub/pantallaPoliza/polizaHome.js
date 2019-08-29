function inicioPolizaHome() {
	bloquearPantallaGris();
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
});
	
	$('#datepickerCoberturaFinanciera').datepicker({
		defaultDate: new Date(),
		format: 'dd/mm/yyyy',
	    minViewMode: 0,
	    firstDay: 1,
	    language: 'es',
	    orientation: 'bottom auto',
	    autoclose:true,
	    multidate: false
	}).datepicker("setDate", new Date()).on('changeDate',function(){
		coberturaFinanciera();
	});
		$.unblockUI();

}


function inicioPolizaActiveHome(ramo, poliza, cantCertificados, cantEndososPoliza){
		
	bloquearPantallaGris();
	if(cantCertificados > 0 && cantCertificados<50){
		inicioPolizaHome();
		activarCaru();

	}
	
	$.unblockUI();

}

function coberturaFinanciera(){
	
	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorSucursal=document.getElementById("valorSucursal").value;
	var valorCertificado=document.getElementById("endosoCoberturaFinancieraModal").value;
	var valorEndoso="1";
	var valorFecha=document.getElementById("inputDataPickerCoberturaFinanciera").value;
	bloquearPantallaGris();

	$.ajax({
	    url : 'coberturaFinancieraModalSiniestroHome',
	    contentType: 'application/json', 
	    data : { poliza : valorPoliza,ramo : valorRamo, sucursal : valorSucursal,certificado:valorCertificado,endoso:valorEndoso,fecha:valorFecha},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var panelNuevo = '';
	    		var d1 = document.getElementById("textoCoberturaSiniestros");
	    		var d2 = document.getElementById("textoCoberturaIconoSiniestros");
	    		
	    		d1.innerHTML = '';
	    		d2.innerHTML = '';

	    	if(json[0]['P_TF_LISTA_IMPR_INB_COBERTURA'] == 'N'){
    	    	panelNuevo = 'La p&oacute;liza, <b style="color:red;">no posee</b> cobertura financiera a la fecha.';
    	    	panelIcono='<i class="material-icons" id="textoCoberturaIconoSiniestros" style="display:inline;color:red;font-size:75px;cursor:pointer;">clear</i>';
	    	}
	    	else{
	    		panelNuevo = 'La p&oacute;liza, <b style="color:#008000;">posee</b> cobertura financiera a la fecha.';
    	    	panelIcono='<i class="material-icons" id="textoCoberturaIconoSiniestros" style="display:inline;color:#008000;font-size:75px;cursor:pointer;">check</i>';

	    	}
	    	d1.innerHTML = panelNuevo;
	    	d2.innerHTML = panelIcono;
	    	
		
	    	}
	    	catch(e)
	    	{
	    		mostrarError('Error : 5534153. Se produjo un inconveniente al cargar los datos',e);
	    		
	    	}	    	
	    	$.unblockUI();
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDetalleTablaCertificados(ramo, poliza, valorSucursal){
	bloquearPantallaGris();

	$.ajax({
	    url : 'datosCertificado',
	    contentType: 'application/json', 
	   
	    data : {poliza :poliza, ramo :ramo, sucursal: valorSucursal} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{
	    		
	    		var data=[];
    	    	for ( var i = 0; i < json.length; i++) {
    	    	        var d = (data[i] = {});
    	    	        d["certificado"] =  json[i]['P_TF_CERTIF_CACE_NU_CERTIFICADO'];
    	    	        d["riesgo"] = json[i]['P_TF_CERTIF_INB_DE_RIESGO'];
    	    	        d["sumaAsegurada"] = json[i]['P_TF_CERTIF_INB_MT_SUMA_ASEGURADA'];
    	    	        d["estado"] = json[i]['P_TF_CERTIF_INB_DE_ESTADO'];
    	    	}
    	    	
    	    	document.getElementById("verCertificados").style.display="none";
	    		document.getElementById("tablaCertificados").style.display="block";

	    		completarDetalleTablaCertificados(data,"",poliza, ramo, valorSucursal);
	        	$.unblockUI();
				
	    	} catch (e) {
		    	$.unblockUI();
	    		alert('Code: 101 - Se genero un inconveniente, al cargar los certificados de la poliza. Error:'+e);
	    	}
	    	
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	 alert('Code: 102 - ' + xhr['responseText']);	    },
	 
	   
	});
}

function verDetalleTablaCertificadosEndoso(ramo, poliza, valorSucursal,numeroEndoso){
	bloquearPantallaGris();

	$.ajax({
		url : 'datosCertificado',
 	    contentType: 'application/json', 
 	    data : { endoso : numeroEndoso , ramo : ramo , poliza : poliza, sucursal: valorSucursal },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var cantCertificados = document.getElementById("cantCertificados");
    	    	cantCertificados.innerHTML = 'Certificados ' + '(' + json.length + ')';
	    		
	    		var data=[];
    	    	for ( var i = 0; i < json.length; i++) {
    	    	        var d = (data[i] = {});
    	    	        d["certificado"] =  json[i]['P_TF_CERTIF_CACE_NU_CERTIFICADO'];
    	    	        d["riesgo"] = json[i]['P_TF_CERTIF_INB_DE_RIESGO'];
    	    	        d["sumaAsegurada"] = json[i]['P_TF_CERTIF_INB_MT_SUMA_ASEGURADA'];
    	    	        d["estado"] = json[i]['P_TF_CERTIF_INB_DE_ESTADO'];
    	    	}
	    		completarDetalleTablaCertificados(data,"",poliza, ramo, valorSucursal);
	        	$.unblockUI();
				
	    	} catch (e) {
		    	$.unblockUI();
	    		alert('Code: 101 - Se genero un inconveniente, al cargar los certificados de la poliza. Error:'+e);
	    	}
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	try {
	    		var data=[];
	    		completarDetalleTablaCertificados(data,"",poliza, ramo, valorSucursal);
			} catch (e) {
				// TODO: handle exception
			}
			document.getElementById("cantCertificados").innerHTML = 'Certificados ' + '(0)';
	    	 alert('Code: 102 - ' + xhr['responseText']);	    },
	});
}


function abrirModalCliente(id)
{
    location.href = "/PSPES/datosCliente?valorCliente="+id+"";
}


function buscadorPanelCEntidadPoliza() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaCertificado");
	  filter = input.value.toUpperCase();
	  
	  
	  $(".datoCertificadoCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoCertificado", "micaruB");
		  var idEncabezado = idH6.replace("datoCertificado", "nroCertificado");
		
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




function abrirPopupPolizaAnterior(poliza,ramo,sucursal,idPopUp)
{
	bloquearPantallaGris();
    location.href = "/PSPES/homePoliza?poliza="+poliza+"&ramo="+ramo+"&sucursal="+sucursal;
};

function abrirPopupPolizaSiguiente(poliza,ramo,sucursal,idPopUp)
{
	bloquearPantallaGris();
    location.href = "/PSPES/homePoliza?poliza="+poliza+"&ramo=" + ramo+"&sucursal="+sucursal;
};



function llenarDinamicamenteMovimientos(json)
{
	for (var prop in json) {
        try {
        	if(json[prop].length == 0)
            	{
            		$("#INFO_"+prop).html("Sin dato").css("color","#b3b0b0");
        		}
        	else
        		{
        		$("#INFO_"+prop).html("<b>$" + verificarCampoJson(json[prop].toLowerCase()) + "</b>").css("color","black");
        		
        		}
        	
		} catch (e) { }
    }	
}

function llenarDinamicamenteProdOrg(json)
{
	for (var prop in json) {
        try {
        	if(json[prop].length == 0)
            	{
            		$("#DATO_"+prop).html("Sin dato").css("color","#b3b0b0");
        		}
        	else
        		{
        		$("#DATO_"+prop).html("<b>" + verificarCampoJson(json[prop].toLowerCase()) + "</b>").css("color","black");
        		
        		}
        	
		} catch (e) { }
    }	
}




function abrirPopUpMovimientosPolizaHome(idPopUp,certificado,poliza,ramo){

	var valorSucursal=document.getElementById("valorSucursal").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'datosMovimientos',
	    contentType: 'application/json', 
	    
	    
	    data : {poliza :poliza, ramo :ramo,sucursal:valorSucursal} ,
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	
	    	llenarDinamicamenteMovimientos(json[0]);
	    	llenarDinamicamenteProdOrg(json[0]);
	    	
	    	
	    	
	    	
	    	$("#DATO_MONTO_COBRADO").html("<b>" +validarCampoVacio(formatearMonedaSincolor(json[0]['P_TF_MOVS_INB_SUM_MT_COBRADO_PROD']))+" </b>");
	    	$("#DATO_MONTO_EMITIDO").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_EMITIDO_PROD']))+" </b>");

	    	//prod
	    	$("#DATO_COMI_DEVEN_PROD").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_DEV_PROD']))+" </b>");
	    	$("#DATO_COMI_AMO_PROD").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_AMO_PROD']))+" </b>");
	    	$("#DATO_COMI_LIB_PROD").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_LIB_PROD']))+" </b>");

	    	//org
	    	$("#DATO_COMI_DEVEN_ORG").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_DEV_ORG']))+" </b>");
	    	$("#DATO_COMI_AMO_ORG").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_AMO_ORG']))+" </b>");
	    	$("#DATO_COMI_LIB_ORG").html("<b>" +validarCampoVacio(formatearMoneda(json[0]['P_TF_MOVS_INB_SUM_MT_COM_LIB_ORG']))+" </b>");

	    	
	    	
	    	
	    	
			var productor = json[0]["P_TF_MOVS_INB_NM_PRODUCTOR"];
			var organizador = json[0]["P_TF_MOVS_CAOR_CD_ORGANIZADOR"];
			$("#DATO_P_TF_MOVS_CACE_CAPD_CD_PRODUCTOR").attr("title",productor);
			$("#DATO_P_TF_MOVS_CAOR_CD_ORGANIZADOR").attr("title",organizador);
			$("#valorCertificadoComi").val(certificado);
			$("#valorPolizaComi").val(poliza);
			$("#valorRamoComi").val(ramo);
			

			
			$("#"+idPopUp).modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
				
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente, al cargar los movimientos de la poliza. Error:'+e);
	    	}
	    	
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};



function mostrarEndosoPolizaHome(obj,endoso,numeroEndoso,tipoEndoso,poliza,ramo, sucursal, imgEndoso)
{	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosEndoso',
	    contentType: 'application/json', 
	    data : { endoso : numeroEndoso , ramo : ramo , poliza : poliza,sucursal:sucursal  },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    
	    	llenarDinamicamente(json);
	    	
	    	var fechaDesde = formatearFechaJson(json['P_TF_ENDOSO_CACW_FE_DESDE']);
	    	$("#valorPolizaEndoso").val(numeroEndoso);

	    	
			$("#INFO_PANEL_2_P_TF_ENDOSO_CACW_FE_OPERACION").html("<b>" + validarCampoVacio(formatearFechaJson(json['P_TF_ENDOSO_CACW_FE_OPERACION']))+ "</b>");
			$("#INFO_USUARIO_P_TF_ENDOSO_CACW_FE_DESDE").html("<b>" + validarCampoVacio(primeraLetraMayus(json['P_TF_ENDOSO_INB_DE_USUARIO']))+ "</b>");
			$("#INFO_FECHA_DESDE_PANEL_B_P_TF_ENDOSO_CACW_FE_DESDE").html("<b>" + fechaDesde +"&nbsp;-&nbsp;"+ "</b>");
			$("#INFO_FECHA_DESDE_PANEL_B_B_P_TF_ENDOSO_CACW_FE_DESDE").html("<b>" + validarCampoVacio(formatearFechaJson(json['P_TF_ENDOSO_CACW_FE_DESDE'])) +"&nbsp;-&nbsp;"+ "</b>");
			$("#DATO_SUCURSAL_ENDOSO").html("<b>" + json['P_TF_ENDOSO_CACW_CASU_CD_SUCURSAL']+" - "+ validarCampoVacio(primeraLetraMayus(json['P_TF_ENDOSO_INB_DSP_SUCURSAL']))+ "</b>");
			$("#DATO_RAMO_ENDOSO").html("<b>" + json['P_TF_ENDOSO_CACW_CARP_CD_RAMO']+" - "+ validarCampoVacio(primeraLetraMayus(json['P_TF_ENDOSO_INB_DSP_RAMO']))+ "</b>");
			$("#DATO_ESQUEMA_ENDOSO").html("<b>" + json['P_TF_ENDOSO_CACW_CAEQ_CD_ESQUEMA']+" - "+ validarCampoVacio(primeraLetraMayus(json['P_TF_ENDOSO_INB_CD_ESQUEMA']))+ "</b>");
			
			$("#DATO_SUMAASEG_ENDOSO").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_SUMA_ASEGURADA'])) +"</b>");
			$("#DATO_SUMAASEG_ENDOSO_B").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_SUMA_ASEGURADA'])) +"</b>");
				
			$("#DATO_PRIMA_POLIZA_ENDOSO").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_PRIMA'])) +"</b>");
			$("#DATO_PREMIO_POLIZA_ENDOSO").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_PREMIO'])) +"</b>");
			
			$("#DATO_PRIMA_POLIZA_ENDOSO_B").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_PRIMA'])) +"</b>");
			$("#DATO_PREMIO_POLIZA_ENDOSO_B").html("<b>" + validarCampoVacio(formatearMoneda(json['P_TF_ENDOSO_INB_MT_PREMIO'])) +"</b>");
			
			$("#DATO_COTIZACION_POLIZA_ENDOSO_B").html("<b onclick='redirectCotizacion("+json['P_TF_ENDOSO_CACW_CAZB_NU_COTIZACION']+");'>" + validarCampoVacio(json['P_TF_ENDOSO_CACW_CAZB_NU_COTIZACION']) +"</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#DATO_COTIZACION_POLIZA_ENDOSO").html("<b onclick='redirectCotizacion("+json['P_TF_ENDOSO_CACW_CAZB_NU_COTIZACION']+");'>" + validarCampoVacio(json['P_TF_ENDOSO_CACW_CAZB_NU_COTIZACION']) +"</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			
			
			//abre al panel y carga la imagen del panel D
			$('#panelb').hide();
			$('#panela').show();
			$('#verMasPanelA').text('Ver mas');
			
			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$(".timeline__date").each(function(){
		 	    $(this).css("background","white");
		 	});
			
			if(imgEndoso=='' || imgEndoso == null){
				$('#timeLineItemEndoso'+numeroEndoso).css("background","#bac2bb");
				
				var imgTimeLine = $('#imgTimeLineEndoso'+numeroEndoso).attr("src");
				$('#imgEndoso').attr('src',imgTimeLine);
			}else{
				var imgUrlEndoso = getIconoEndoso(imgEndoso);
				$('#imgEndoso').attr('src',imgUrlEndoso);
			}
			
			$('#labelPanelEndoso').html("Endoso #" + numeroEndoso);
			$('#'+endoso).show();
			
			$("#imgEndoso").css({'width':'80px'});
			$("#imgEndoso").css({'padding-left':'10px'});	
			$("#imgEndoso").css({'padding-bottom':'10px'});	
			$("#imgEndoso").css({'padding-top':'10px'});
			$("#cuadroImgEndoso"+numeroEndoso).css("background","#bac2bb");
			
			var cantidadCertificadosMarca = $("#certificadosCantidadAll").val();		
	    	$.unblockUI();

			if (cantidadCertificadosMarca == '50') {
				document.getElementById("verCertificados").style.display="none";
	    		document.getElementById("tablaCertificados").style.display="block";
				verDetalleTablaCertificadosEndoso(ramo, poliza, sucursal,numeroEndoso);
				
			}else {
				obtenerDatosCertificadosPoliza(numeroEndoso, ramo, poliza, sucursal);
			}
	    	
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
};



function obtenerDatosCertificadosPoliza(numeroEndoso, ramo, poliza, sucursal){
	// JSON DE CERTIFICADOS
	bloquearPantallaGris();

	$.ajax({
	    url : 'datosCertificado',
	    contentType: 'application/json', 
	    data : { endoso : numeroEndoso , ramo : ramo , poliza : poliza,sucursal:sucursal  },
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {

	    	$('#cantCertificados').text("Certificados (" + json.length + ")");
	    		
	    	var d1 = document.getElementById("iconoCertificadoDePoliza");
			d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#509750;padding-top:15px;" >&#xE02f;</i>'; 
	    	
	    	
	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");	    	    	
	    	
	    	var d1 = document.getElementById("caruMayor");
	    	d1.innerHTML = ' '; 
	    	
	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
	    	
	    	/**variable para almacenar los certificados de la grilla*/
	    	var data = [];
	    	
	    	var mostrarGrillaCertificados = true;
	    	
	    	if(json.length>0 && json.length<50){
	    		mostrarGrillaCertificados = false;
	    	}
	    	
	    	for ( var int = 0; int < json.length; int++) {
	    		
	    		var num=int+1;
	    		var popUp= "'certificadoPopUp'";
	    		var nroCer= 'nroCertificado'+num;
	    		var DatoCer= 'datoCertificado'+num;
	    		
	    		if(!mostrarGrillaCertificados){
					caruNuevo = caruNuevo + '<div id="micaruB'+num+'" onClick="mostrarDetalleCertificadoSeleccionado('+popUp+','+json[int]['P_TF_CERTIF_CACE_NU_CERTIFICADO']+','+poliza+','+ramo+','+sucursal+');" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#509750; border-style: solid; box-shadow: 0 0 0px black;"><h6 id='+nroCer+' style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#509750;color:#ffffff;">#'+json[int]['P_TF_CERTIF_CACE_NU_CERTIFICADO']+' </h6><h6 style="margin-top:10%;" id='+DatoCer+' class="datoCertificadoCarusel">'+json[int]['P_TF_CERTIF_INB_DE_RIESGO']+'</h6><br></div>';
	    		}
	    		else{
	    			var d = (data[int] = {});
	    	        d["certificado"] =  json[int]['P_TF_CERTIF.CACE_NU_CERTIFICADO'];
	    	        d["riesgo"] = json[int]['P_TF_CERTIF.INB_DE_RIESGO'];
	    	        d["sumaAsegurada"] = json[int]['P_TF_CERTIF.INB_MT_SUMA_ASEGURADA'];
	    	        d["estado"] = json[int]['P_TF_CERTIF.INB_DE_ESTADO'];
	    		}
										
	    	}
	    	
	    	if(!mostrarGrillaCertificados){
	    		d1.innerHTML = caruNuevo + '</div></div>' ;
    	    	activarCaru();

	    	}
	    	
	    	
	    	} catch (e) {
    	    	$.unblockUI();
		    	mostrarError('Se produjo un inconveniente al cargar los datos del certificado.Error :'+e);
	    	}
	    	$.unblockUI();

	    	
	    },
		 
	    error: function (request, status, error) {

	    	$.unblockUI();
	        //swal('Disculpe, no existen certificados para el endoso seleccionado');
	    	$('#cantCertificados').text("Certificados");
	    	document.getElementById("iconoCertificadoDePoliza").innerHTML = '<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE611;</i>';
	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");	    	    	

	    	document.getElementById("caruMayor").innerHTML = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">' + request.responseText + '</div></div>';
	    	document.getElementById("micaru").style.display="block";
	    },
	 
	   
	});
}



function redirectCotizacion(numCotizacion){
	bloquearPantallaGris();
	location.href = "/PSPES/homeCotizacion?cotizacion="+numCotizacion;
	
}


function redirecCobranza() {
	
	bloquearPantallaGris();
	var valorPoliza = document.getElementById("valorPolizaComi").value;
	var valorRamo = document.getElementById("valorRamoComi").value;
	var valorCertificado = document.getElementById("valorCertificadoComi").value;
	var valorSucursal=document.getElementById("valorSucursal").value;
	
	location.href = "/PSPES/homeCobranza?poliza=" + valorPoliza + "&ramo="+ valorRamo + "&certificado="+valorCertificado+"&sucursal="+valorSucursal;

	$.unblockUI();
}


function redirecComisiones() {
	bloquearPantallaGris();
	var valorPoliza = document.getElementById("valorPolizaComi").value;
	var valorRamo = document.getElementById("valorRamoComi").value;
	var valorCertificado = document.getElementById("valorCertificadoComi").value;
	var valorSucursal=document.getElementById("valorSucursal").value;

	location.href = "/PSPES/homeComisiones?poliza=" + valorPoliza + "&ramo="+ valorRamo + "&certificado="+valorCertificado+"&sucursal="+valorSucursal;
	$.unblockUI();
}





function irHomeCertificado(){
	
	bloquearPantallaGris();
	var tipoFac = document.getElementById("tipoFacturacion").value;
	var nroPolizaTfPoli = $('#INFO_POLIZA').text();
	var ramoTfPoli = $('#INFO_RAMO').text();
	var nroCertificadoTfCertif = $('#INFO_CERTIFICADO').text();
	var sucursalTfPoli = $('#INFO_SUCURSAL').text();
	var endoso = document.getElementById("valorPolizaEndoso").value;

    location.href = "/PSPES/homeCertificado?poliza="+nroPolizaTfPoli +"&ramo=" + ramoTfPoli + "&nroCertificado="+nroCertificadoTfCertif + "&sucursal=" + sucursalTfPoli+"&facturacion="+tipoFac+"&endoso="+endoso;
}




function abrirModalComponenteCertificadoPoliza(){
	
	var valorCertificado=0;
	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorSucursal=document.getElementById("valorSucursal").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorEndoso=document.getElementById("valorPolizaEndoso").value;
	var valorImagen=document.getElementById("valorIconoPoliza").value;
	
	
	
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
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
		            '<td class="td-grilla-componentePoliza" role="cell">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COMP_INB_COMPONENTE'])) +'</td>'+
		            '<td class="td-grilla-componentePoliza" role="cell">'+validarCampoVacio(json[int]['P_TF_COMP_CASB_TA_COMPONENTE']) +'</td>'+
		            '<td class="td-grilla-componentePoliza" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COMP_CASB_MT_COMPONTE'])) +'</td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
 
    	    	$("#DATOS_IMAGEN_ICONO_COMPONENTE").html(valorImagen);
    	    	$("#DATOS_COMPONENTE").html("Componentes : <b>#"+valorPoliza+" - "+valorEndoso+"</b>");


    	    	
    	    	
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





function abrirModalIIBBCertificadoPoliza(){
	
	var valorCertificado=0;
	var valorPoliza=document.getElementById("valorPoliza").value;
	var valorSucursal=document.getElementById("valorSucursal").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var valorEndoso=document.getElementById("valorPolizaEndoso").value;
	var valorImagen=document.getElementById("valorIconoPoliza").value;
	
	
	
	
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
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell">'+validarCampoVacio(json[int]['P_TF_COMP_INB_COMPONENTE']) +' - '+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COMP_INB_COMPONENTE'])) +'</td>'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell">'+validarCampoVacio(json[int]['P_TF_COMP_CASE_TA_COMPONENTE'])+'</td>'+
		            '<td class="td-grilla-IiBbCertificadoHome" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_COMP_CASE_MT_COMPONENTE'])) +'</td>'+
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






/* ----------------------------------------------------------------- MODAL SUCURSAL ------------------------------------------------*/

function abrirModalSucursalHome(codSucursal){
		
	bloquearPantallaGris();
	$.ajax({
	    url : 'detalleSucursal',
	    contentType: 'application/json', 
	    
	    data : {sucursal :codSucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
			llenarDinamicamente(json[0]);
			
			$("#INFO_P_TF_LISTA_CASU_CD_SUCURSAL").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_CD_SUCURSAL'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_CAEM_CD_CENTRO_EMISOR").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_CAEM_CD_CENTRO_EMISOR'])+ " - " + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_CENTRO_EMISOR']))+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_TELEFONO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_TELEFONO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_NU_TELEFONO3").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_NU_TELEFONO3'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_EMAIL").html("<b>" + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_EMAIL']))+ "</b>");
			
			$("#INFO_P_TF_LISTA_CASU_DE_CALLE").html("<b>" + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_CALLE']))+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_NUMERO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_NUMERO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_PISO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_PISO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_DE_DEPARTAMENTO").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_DE_DEPARTAMENTO'])+ "</b>");
			$("#INFO_P_TF_LISTA_CASU_CAGI_CD_REGION").html("<b>" + validarCampoVacio(json[0]['P_TF_LISTA_CASU_CAGI_CD_REGION'])+ " - " + primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_INB_DESC_REGION'])) + "</b>");

			$("#DATO_SUCURSAL_POLIZA").html("<b>" + primeraLetraMayus(json[0]['P_TF_LISTA_CASU_DE_SUCURSAL'])+ "</b>");
			
			$("#sucursalPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente, al cargar la sucursal de la poliza. Error:'+e);
	    	}
	    	
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
};

function verDatosContactoPorPoliza(){
	var valorPoliza = document.getElementById("valorPoliza").value;
	var valorCliente = document.getElementById("valorCliente").value;
	var valorRamo = document.getElementById("valorRamo").value;
	var valorSucursal = document.getElementById("valorSucursal").value; 

	abrirPopUpContacto(valorPoliza, valorCliente, valorRamo, valorSucursal, 'obtenerContactoPorPoliza');
	
}

function irInspeccionesHome(){
	
	var poliza= document.getElementById("valorPoliza").value;
	var ramo= document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'existeInspecciones',
	    contentType: 'application/json', 
	    
	    data : {poliza :poliza, ramo: ramo, sucursal: sucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		location.href="/PSPES/homeInspecciones?poliza="+ poliza + "&ramo=" + ramo +"&sucursal="+sucursal+"&inspeccion="+json[0]["P_TF_INSPE_CAIN_NU_INSPECCION"];
				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar inspecciones. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
	
}

function cargaTablaEndososPoliza(ramo, poliza){
	
	valorSucursal = document.getElementById("valorSucursal").value;
	bloquearPantallaGris();

	$.ajax({
		url : 'datosEndososPoliza',
 	    contentType: 'application/json', 
 	    data : { ramo : ramo , poliza : poliza, sucursal: valorSucursal },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		var cantEndosos = document.getElementById("cantEndosos");
    	    	cantEndosos.innerHTML = 'Endosos ' + '(' + json.length + ')';
	    		
	    		var data=[];
    	    	for ( var i = 0; i < json.length; i++) {
    	    	        var d = (data[i] = {});
    	    	        d["endoso"] =  json[i]['P_TF_LISTA_END.CACW_NU_ENDOSO'];
    	    	        d["descripcion"] = formatearFechaJson(json[i]['P_TF_LISTA_END.CACW_FE_OPERACION']) + " - " + primeraLetraMayus(json[i]['P_TF_LISTA_END.INB_TP_TRANSAC']) ;
    	    	        d["imgEndoso"] = json[i]['P_TF_LISTA_END.CACW_CAME_TP_TRANSAC'];

    	    	}
    	    	
    	    	document.getElementById("verEndosos").style.display="none";
    	    	document.getElementById("tablaEndososPoliza").style.display="block";

    	    	completarEndososTabla(data,"",poliza, ramo, valorSucursal);
	        	
	        	$.unblockUI();
				
	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Code: 101 - Se genero un inconveniente, al cargar los endosos de la poliza. Error:'+e);
	    	}
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	try {
	    		var data=[];
	    		completarEndososTabla(data,"",poliza, ramo, valorSucursal);
			} catch (e) {
				// TODO: handle exception
			}
			document.getElementById("cantEndosos").innerHTML = 'Endosos ' + '(0)';
	    	 mostrarError('Code: 102 - ' + xhr['responseText']);	    },
	});
}


/***************************************************************************/

//variable local a la funcion completarEndososTabla
var buscarFiltroEndoso="";
var dataViewEndoso;
var gridEndoso;
function completarEndososTabla(data, nroCertificado, poliza, ramo, sucursal){
	
	var columns = [
	       	    {id: "endoso", name: "#", field: "endoso", width:80, cssClass: "cell-title", selectable: false, resizable: false},
	       	    {id: "descripcion", name: "Descripcion", field: "descripcion", width:185,  selectable: false, resizable: false},
	       	    { id: "imgEndoso", name: "imgEndoso", field: "imgEndoso", width: 0, minWidth: 0, maxWidth: 0, cssClass: "reallyHidden", headerCssClass: "reallyHidden" }

	       	];

	       	var options = {
	       	    editable: true,
	       	    enableAddRow: false,
	       	    enableCellNavigation: true,
	       	    asyncEditorLoading: false,
	       	    fullWidthRows:true,
	       	    rowHeight: 30
	       	};

	      //inicializo la grilla
	       	dataViewEndoso = new Slick.Data.DataView({ inlineFilters: true });
	       	dataViewEndoso.beginUpdate();
	       	dataViewEndoso.setItems(data, "endoso");
	       	dataViewEndoso.setFilter(myFilterEndoso);
	       	dataViewEndoso.endUpdate();

	        // inicializo la grilla
	       	gridEndoso = new Slick.Grid("#grillaEndososPoliza", dataViewEndoso, columns, options);
	       	
	       	gridEndoso.onClick.subscribe(function (e) {
	       		
		        var cell = gridEndoso.getCellFromEvent(e);
		        
		        var row = cell.row;
		        var row_values = dataViewEndoso.getItem(row);
		        	    	
		        mostrarEndosoPolizaHome('timeLineItemEndoso'+row_values.endoso,'endoso',row_values.endoso,'cuantitativo',poliza,ramo, sucursal, row_values.imgEndoso);
	    		
	       	});
	    
	    dataViewEndoso.onRowCountChanged.subscribe(function (e, args) {
	    	gridEndoso.updateRowCount();
	    	gridEndoso.render();
	    });

	    dataViewEndoso.onRowsChanged.subscribe(function (e, args) {
	    	gridEndoso.invalidateRows(args.rows);
	    	gridEndoso.render();
	    });
	  
	    $("#inputBusquedaEndoso").keyup(function (e) {
	        Slick.GlobalEditorLock.cancelCurrentEdit();

	        // clear on Esc
	        if (e.which == 27) {
	          this.value = "";
	        }

	        buscarFiltroEndoso = this.value;
	        updateFilterEndoso();

	     });
	    
	    //Modifico tamanio del scroll slickviewport
	    document.getElementById("idSlickViewport").style.height = "493px";
	    //document.getElementById("idSlickViewport").className = "altoPanelB";

	    $(".ui-state-default").css("background","#205081");
	    
	    var x = document.getElementsByClassName("slick-header-column");
	    /*Se cambia el tamanio del encabezado de tabla de header endosos*/
	    for(var i = 0; i<3; i++){
		    x[i].style.height="20px";
		    x[i].style.background="#205081";
	    }
	    
}

function updateFilterEndoso() {
  dataViewEndoso.setFilterArgs({
    searchString: buscarFiltroEndoso
  });
  dataViewEndoso.refresh();
}

function myFilterEndoso(item) {
	
  if (buscarFiltroEndoso != "" && item["endoso"].indexOf(buscarFiltroEndoso) == -1
      && item["descripcion"].indexOf(buscarFiltroEndoso) == -1) {
      return false;
  }

  if (item.parent != null) {
      var parent = data[item.parent];

      while (parent) {
          if (parent._collapsed ||
              (buscarFiltroEndoso != "" && parent["endoso"].indexOf(buscarFiltroEndoso) == -1
                  && parent["descripcion"].indexOf(buscarFiltroEndoso) == -1)) {
              return false;
          }

          parent = data[parent.parent];
      }
  }

  return true;
}


function paginadoEndoso(pag){
	
	bloquearPantallaGris();
	
	
	var poliza= document.getElementById("valorPoliza").value;
	var ramo= document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;
	var cantidadPag = document.getElementById("cantidadPag").value;
	var totalPag =parseInt(cantidadPag)+ parseInt(pag);
	$('#cantidadPag').val(totalPag);
	if(totalPag <= 0){
		totalPag = 1;
		mostrarError('Por favor,avance hacia la derecha para continuar con el paginado');
	}
	$.ajax({
	    url : 'datosEndososPoliza',
	    contentType: 'application/json', 
	    
	    data : {poliza :poliza, ramo: ramo, sucursal: sucursal,numPag:totalPag} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$('#paginadoEndososBtn').css('display','');
	    		var d1 = document.getElementById("panelEndosoPaginado");
    	    	d1.innerHTML = '';
    	    	var panelNuevo = '<div class="timeline" style="padding-bottom:0px;width:100%;" id="panelEndosoPaginado">';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		var numEndoso = +validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_NU_ENDOSO']));
    	    		var poliza = +validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_CAPO_NU_POLIZA']));
    	    		var ramo = +validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_CARP_CD_RAMO']));
    	    		var timeLineItemEndoso = "'timeLineItemEndoso'";
    	    		var endoso = "'endoso'";
    	    		var cuantitativo = "'cuantitativo'";
    	    		panelNuevo = panelNuevo+'<div class="timeline__box">'+
    	    		'<div class="timeline__date" id="cuadroImgEndoso'+numEndoso+'" style="cursor:pointer; background-color:#ffffff" onclick="mostrarEndosoPolizaHome('+timeLineItemEndoso+','+endoso+','+numEndoso+','+cuantitativo+','+poliza+','+ramo+','+sucursal+','+null+');">'+
    	    		'<span class="timeline__day">'+
    	    		'<img src="'+getIconoEndoso(json[int]['P_TF_LISTA_END.CACW_CAME_TP_TRANSAC'])+'" width="30" height="30" id="imgTimeLineEndoso'+validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_NU_ENDOSO']))+'">'+
    	    		'</span>'+
                    '</div>'+
                    '<div class="timeline__post seleccionPanelB" id="timeLineItemEndoso'+numEndoso+'" onclick="mostrarEndosoPolizaHome('+timeLineItemEndoso+','+endoso+','+numEndoso+','+cuantitativo+','+poliza+','+ramo+','+sucursal+','+null+');">'+
                    '<div class="timeline__content" style="cursor:pointer;">'+
                    '<h6 style="cursor:pointer;" id="etiquetaEndoso$nroEndoso"><b>#'+validarCampoVacio((json[int]['P_TF_LISTA_END.CACW_NU_ENDOSO']))+' - '+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_END.CACW_FE_OPERACION']))+' .</b></h6>'+
                    '<h6> '+validarCampoVacio((json[int]['P_TF_LISTA_END.INB_TP_TRANSAC']))+' </h6>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
    	    	}
    	    	d1.innerHTML = panelNuevo;
	    		
    			
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
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
	
}



function getIconoEndoso(tipoEndoso) {
	
	if (tipoEndoso == null) 
		return "";
	var endoso = tipoEndoso; 
	if (endoso == "A") //Anulacion 
		return "/PSPES/resources/img/rector/timeLine/formularioAnulacion.svg";
	
	if (endoso == "C") //recuotificacion 
		return "/PSPES/resources/img/rector/timeLine/calendarioAzul.svg";
	
	if (endoso == "E") // emision 
		return "/PSPES/resources/img/rector/timeLine/emisionAzul.svg";
	
	if (endoso == "F") // refacturacion 
		return "/PSPES/resources/img/rector/timeLine/bolsaDineroAzul.svg";
	
	if (endoso == "H") //rehabilitacion 
		return "/PSPES/resources/img/rector/timeLine/tildeVerde.svg";
	
	if (endoso == "L") //endoso cualitativo 
		return "/PSPES/resources/img/rector/timeLine/formularioCualitativoAzul.svg";
	
	if (endoso == "M") //endoso cuantitativo negativos 
		return "/PSPES/resources/img/rector/timeLine/bolsaDineroRojo.svg";
	
	if (endoso == "N") //endoso cuantitativo 
		return "/PSPES/resources/img/rector/timeLine/bolsaDineroVerde.svg";
	
	if (endoso == "P") //pago  
		return "/PSPES/resources/img/rector/timeLine/pesosAzul.svg";
	
	if (endoso == "R") //renovacion 
		return "/PSPES/resources/img/rector/timeLine/emisionAzul.svg";
	
	if (endoso == "T") //transferencia propiedad
		return "/PSPES/resources/img/rector/timeLine/flechasAzul.svg";
	
	if (endoso == "U") //reverso ultimo endoso 
		return "/PSPES/resources/img/rector/timeLine/undo.svg";
	
	return "";
};

function abrirModalBoletaDePago(){
	
	bloquearPantallaGris();
	
	var poliza = document.getElementById("valorPoliza").value;
	var ramo = document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;

	$.ajax({
	    url : 'datosBoletaDePago',
	    contentType: 'application/json', 
	    
	    data : {poliza :poliza, ramo: ramo, sucursal: sucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var stringJsonBoletaPago = "[";
	    		var stringJsonBoletaPagoAux="";
	    		
	    		var dl = document.getElementById("datosBoletaDePago");
	    		dl.innerHTML=' ';
	    		var rowBoletaPago = '';
	    		
	    	    for ( var int = 0; int < json.length; int++) {
	    	    	rowBoletaPago = rowBoletaPago + '<tr class="tr-grilla row-select" id="fila'+int+'";">';
	    	    	
	    	    	rowBoletaPago = rowBoletaPago + '<td class="td-grilla-componentesBoletaPagoHome" style="width:14%;" role="cell">';
	    	    	rowBoletaPago = rowBoletaPago + '<h6>'+formatearFechaJson(json[int]['P_TF_DEUD_CARE_FE_HASTA'])+'</h6>';
	    	    	rowBoletaPago = rowBoletaPago + '</td>';
	    	    	
	    	    	rowBoletaPago = rowBoletaPago + '<td class="td-grilla-componentesBoletaPagoHome" style="width:14%;" role="cell">';
	    	    	rowBoletaPago = rowBoletaPago + '<h6>'+formatearMoneda(json[int]['P_TF_DEUD_INB_MT_IMPORTE'])+'</h6>';
	    	    	rowBoletaPago = rowBoletaPago + '</td>';
	    	    	
	    	    	rowBoletaPago = rowBoletaPago + '<td class="td-grilla-componentesBoletaPagoHome" style="width:14%;" role="cell">';
	    	    	rowBoletaPago = rowBoletaPago + '<input id="checkBoletaPago'+int+'" type="checkbox" style="cursor:pointer;" value="'+int+'" />';
	    	    	rowBoletaPago = rowBoletaPago + '</td>';
	    	    	
	    	    	
	    	    	rowBoletaPago = rowBoletaPago + '</tr>';
	    	    	
	    	    	
	    	    	//recupero los datos json para almacenarlo en una variable string json
	    	    	stringJsonBoletaPagoAux += "{" + 
	    	    	"'P_TF_DEUD_INB_VC_IMPORTE':'" +json[int]['P_TF_DEUD_INB_VC_IMPORTE'] + "'," +
	    	    	"'P_TF_DEUD_INB_FE_VENCIMIENTO':'" + formatearFechaJson(json[int]['P_TF_DEUD_INB_FE_VENCIMIENTO']) + "'," +
	    	    	"'P_TF_DEUD_INB_NU_COMPANIA':'" + json[int]['P_TF_DEUD_INB_NU_COMPANIA'] + "'," +
	    	    	"'P_TF_DEUD_INB_MT_IMPORTE':'" + formatearMonedaSinSimbolo(json[int]['P_TF_DEUD_INB_MT_IMPORTE']) + "'," +
	    	    	"'P_TF_DEUD_CARE_FE_HASTA':'" + formatearFechaJson(json[int]['P_TF_DEUD_CARE_FE_HASTA']) + "'," +
	    	    	"'P_TF_DEUD_INB_VC_CODIGO_BARRA':'" + json[int]['P_TF_DEUD_INB_VC_CODIGO_BARRA'] + "'," +
	    	    	"'P_TF_DEUD_CAMO_SM_MONEDA':'" + json[int]['P_TF_DEUD_CAMO_SM_MONEDA'] + "'," +
	    	    	"'P_TF_DEUD_INB_VC_MENSAJE_03':'" + json[int]['P_TF_DEUD_INB_VC_MENSAJE_03'] + "'," +
	    	    	"'P_TF_DEUD_INB_VC_MENSAJE_01':'" + json[int]['P_TF_DEUD_INB_VC_MENSAJE_01'] + "'," +
	    	    	"'P_TF_DEUD_INB_VC_MENSAJE_02':'" + json[int]['P_TF_DEUD_INB_VC_MENSAJE_02'] +"'"
	    	    	
	    	    	+"}";
	    	    	
	    	    	if((int + 1) < json.length){
	    	    		stringJsonBoletaPagoAux +=","
	    	    	}
	    	    	
	    	    }
	    		
	    	    stringJsonBoletaPago += stringJsonBoletaPagoAux + "]";
	    	    
	    	    document.getElementById("stringBoletaJson").value = stringJsonBoletaPago;
	    	    
	    		dl.innerHTML = rowBoletaPago;
	    		
	    		abrirPopUpNuevo('boletaDePagoPopUp');
	    		
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente al generar las boletas de pago, Error:'+e);
	    	}
	    	$.unblockUI();
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function enviarBoletaPorEmail(){

	var indicesBoleta = '';
	
	var checkBoletaPago = false;
	var checkEmail = false;
	
	$('.row-select input').each(function() {   
	      var condicion = $(this).is(":checked");
	      if (condicion) {
	        checkBoletaPago = true;
	      }
	});
	
	checkEmail = validarEmail('valorEmail');
	
	if(checkBoletaPago&&checkEmail){
		$('.row-select input:checked').each(function() {
			indicesBoleta = indicesBoleta +$(this).val()+",";
		});
		var stringJsonBoleta = document.getElementById("stringBoletaJson").value;		
		enviarBoletaDePago(indicesBoleta, stringJsonBoleta);
		
	}else{
		var mensajeAlerta='';
		if(!checkBoletaPago){
			mensajeAlerta += 'Seleccione la boleta de pago';
		}
		if(!checkEmail&&checkBoletaPago){
			mensajeAlerta += 'Ingrese un email valido';
		}
		
		mostrarMensajeBoletaDePago(mensajeAlerta, 'alert-warning');
		
	}
	
			
}

function enviarBoletaDePago(indicesBoleta, stringBoletaJson){
	
	var poliza = document.getElementById("valorPoliza").value;
	var ramo = document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;
	var emailDestino = document.getElementById("valorEmail").value;
	var descAsegurado = document.getElementById("valorNombreAsegurado").value;
	
	bloquearPantallaGris();
	
	$.ajax({
	    url : 'enviarBoletaDePago',
	    contentType: 'application/json', 
	    
	    data : {poliza: poliza, ramo:ramo, sucursal: sucursal, indicesBoleta: indicesBoleta, emailDestino: emailDestino, descAsegurado: descAsegurado, stringBoletaJson: stringBoletaJson} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var mensaje="Se envio el correo";
	    		
	    		document.getElementById("valorEmail").value="";
	    		document.getElementById("stringBoletaJson").value ="";
	    		$('.row-select input').each(function() {   
	    		      $(this).prop("checked", false);
	    		      
	    		});
	    		
	    		mostrarMensajeBoletaDePago(mensaje, 'alert-success');
	    		
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente al enviar por email las boletas de pago, Error:'+e);
	    	}
	    	$.unblockUI();
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function mostrarMensajeBoletaDePago(mensaje, tipoMensaje){
	
	var dl = document.getElementById("mensajeAlertaBoleta");
	dl.innerHTML = '';
	
	dl.innerHTML = '<div class="col-lg-12"><div class="alert '+tipoMensaje+'" style="padding: 10px; margin-bottom: 0px;" role="alert">'+mensaje+'</div></div>';
	
	$("#mensajeAlertaBoleta").show();
	$("#mensajeAlertaBoleta").delay(2000).hide(800);
	
}






