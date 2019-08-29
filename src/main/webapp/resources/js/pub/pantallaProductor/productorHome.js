function inicioProductorHome(){
	
	bloquearPantallaGris();
	verDatosOSSEG();
	verDatosMotivoBaja();
	activarCaru();
	
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
	})
	$.unblockUI();
}

function primeraLetraMayus(dato) {
	if(dato === null || dato === undefined)
	{
	return '';
	}
	else
		{
	return dato.replace(
	        /\w\S*/g,
	        function(txt) {
	            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	        }
	    );
		}
}

function mostrarProductorHome(obj,desc,num,icono,ramo)
{
	var valorProductor=document.getElementById("valorProductor").value;

	bloquearPantallaGris();

	$.ajax({
	    url : 'polizasProductor',
	    contentType: 'application/json', 
	    data : { productor : valorProductor},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	llenarDinamicamente(json[num-1]);
			$("#INFO_PRODUCTOR_P_TF_PREMIO_DEL_RAMO ").html("<b> " + formatearMoneda(json[num-1]['P_TF_LISTA_VIG_INB_MT_PREMIO_RAMO']) + "</b>");
			$("#INFO_PRODUCTOR_P_TF_SALDO_DEL_RAMO ").html("<b> " + formatearMoneda(json[num-1]['P_TF_LISTA_VIG_INB_MT_SALDO_RAMO']) + "</b>");
			$("#DATO_IMG_RAMO").html(icono);
			
			
			$("#valorRamoProductor").val(ramo);
			
			
			$('#panelb').hide();
			$('#panela').show();
			$('#polizasRamo').show();
			$('#verMasPanelA').text('Ver mas');

			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$('#'+obj+num).css("background","#bac2bb");
			
			$('#labelPanelProductor').html("Ramo : "+ramo + " - "+desc);
			
			var d1 = document.getElementById("panelImagenProductor");
			d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
	    	}
	    	catch(e)
	    	{
	    		alert('Error generado por : '+e);
	    	}
			
			
			
	   		// JSON DE PAGOS RECHAZADOS
	    	$.ajax({
	    	    url : 'polizasRechazadas',
	    	    contentType: 'application/json', 
	    	    data : { productor : valorProductor , ramo : ramo },
	    	    type : 'GET',
	    	    dataType : 'json',
	    	    success : function (json) {
	    	    	try {
	    	    	$('#cantPagosRechazados').text("Pagos Rechazados (" + json.length + ")");	    	    	
	    	    	$('#cantPagosRechazados').parent().next().find('i:first').remove();
	    	    	
	    	    	var jj = document.getElementById("iconoPanelC");
	    			jj.innerHTML = '<i class="material-icons altoIcono"  style="color:#e0d100;padding-top:15px;" >&#xE02f;</i>'; 
	    	    	
	    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");
	    	    	var d1 = document.getElementById("caruMayor");
	    	    	d1.innerHTML = ' ';
	    	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
	    	    	  
	    	    	for ( var int = 0; int < json.length; int++) {
	    	    	
	    	    		var num=int+1;
	    	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#e0e0e0; border-style: solid; box-shadow: 0 0 0px black;" onclick="abrirModalPagosRechazadosProductor('+json[int]['P_TF_RECHAZOS_CJIP_CAPO_NU_POLIZA']+','+json[int]['P_TF_RECHAZOS_CJIP_CARP_CD_RAMO']+','+num+');"><h6 id="nroRamo'+num+'" style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#e0d100;color:#ffffff;">Ramo : '+json[int]['P_TF_RECHAZOS_CJIP_CARP_CD_RAMO']+'</h6><h6 style="margin-top:2%;" id="datoPagoRechazado$velocityCount" class="datoPolizaRechazada">P&oacute;liza : <b>'+json[int]['P_TF_RECHAZOS_CJIP_CAPO_NU_POLIZA']+'</b></h6><h6 style="margin-top:2%;" id="datoPagoRechazado$velocityCount" class="datoPolizaRechazada"><b>'+primeraLetraMayus(json[int]['P_TF_RECHAZOS_INB_VC_RAZO'])+'</b></h6><h6 style="margin-top:2%;" id="datoPagoRechazado$velocityCount" class="datoPolizaRechazada">'+json[int]['P_TF_RECHAZOS_COMR_DE_MOTIVO_RECHAZO']+'</h6><br></div>';
	    	    	}
	    	    	d1.innerHTML = caruNuevo;  
		    	
	    	    	activarCaru();
	    	    	} catch (e) {
	    	    		alert('Se produjo un inconveniente al cargar los pagos rechazados',e);
	    	    	}
	    	    	
	    	    	$.unblockUI();
	    	    },
	    	    error: function (request, status, error) {
	    	    	$.unblockUI();
	    	    	$('#cantPagosRechazados').text("Pagos Rechazados");	    	    	
	    	    	$('#cantSiniestros').text("Siniestros");
	    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
	    	    	
	    	    	var jj = document.getElementById("iconoPanelC");
	    			jj.innerHTML = '<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE611;</i>'; 
	    	    	
	    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");
	    	        document.getElementById("micaru").innerHTML = request.responseText; 
	    	    	
	    	    },
	    	   
	    	});
			
			
	    },
	 
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },

	   
	});
	
	
}

function buscadorPanelCEntidadProductor() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaPagosRechazados");
	  filter = input.value.toUpperCase();
	
	  $(".datoPolizaRechazada").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoPagoRechazado", "micaruB");
		  var idEncabezado = idH6.replace("datoPagoRechazado", "nroRamo");
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idCard).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  

	}


function abrirModalProductorHome(productor){
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosProductorModal',
	    contentType: 'application/json', 
	    data : {productor:productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);

			$("#DATO_P_TF_PROD_CAPD_NM_PRODUCTOR").html("<b>#" + json[0]['P_TF_PROD_CAPD_CD_PRODUCTOR']+" - "+primeraLetraMayus(json[0]['P_TF_PROD_CAPD_NM_PRODUCTOR'])  +"</b>" );
			$("#DATO_P_TF_PROD_CAPD_NM_PRODUCTOR_REDIRECT").val(json[0]['P_TF_PROD_CAPD_CD_PRODUCTOR']);

			//Abre el modal
			$("#productorPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos del productor',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};


	function redirecCarteraProd()
{
	bloquearPantallaGris();
	var valorProductor = document.getElementById("valorProductor").value;
	var valorRamo = document.getElementById("valorRamoProductor").value;
	if(valorRamo == 99)
		{
		valorRamo = 0;
		}
	
	location.href = "/PSPES/go?dato="+valorProductor+"&entidades=100000&p1="+valorRamo+"&p2=1001&p3=07";
}
	
function redireProductorHome()
{
	bloquearPantallaGris();
	var valorProductor = document.getElementById("DATO_P_TF_PROD_CAPD_NM_PRODUCTOR_REDIRECT").value;
	location.href = "/PSPES/homeProductor?codProductor=" + valorProductor;
}
function redirPolizaVencida(){
	bloquearPantallaGris();
	var poliza=document.getElementById("polizaProductorRechazada").value;
	var ramo=document.getElementById("ramoProductorRechazada").value;
	var sucursal=document.getElementById("sucursalProductorRechazada").value;

	location.href = "/PSPES/homePoliza?poliza="+poliza+"&ramo="+ramo+"&sucursal="+sucursal;
	}


function redireCCProductorHome()
{
	bloquearPantallaGris();
	var valorProductor = document.getElementById("valorProductor").value;
	location.href = "/PSPES/homeCCProductor?codProductor="+valorProductor;
}


function abrirModalPagosRechazadosProductor(poliza,ramo,card){
	var valorProductor=document.getElementById("valorProductor").value;
	var valorCard=card;
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'polizasRechazadasModal',
	    contentType: 'application/json', 
	    data : { ramo : ramo,productor:valorProductor},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	var card = valorCard-1;
	    	
	    	$("#polizaProductorRechazada").val(poliza);
	    	$("#ramoProductorRechazada").val(ramo);
	    	try{
	    		llenarDinamicamente(json[card]);
				$("#DATOS_MODAL_RECHAZOPROD").html("Rechazo de la p&oacute;liza#<b>" +poliza);
				$("#DATO_POLIZA_RECHAZOPROD").html("<b>" + validarCampoVacio(json[card]['P_TF_RECHAZOS_CJIP_CARP_CD_RAMO'])+" - " + validarCampoVacio(primeraLetraMayus(json[card]['P_TF_RECHAZOS_CJIP_CAPO_NU_POLIZA']))+"</b>" );
				
		    	$("#sucursalProductorRechazada").val(json[0]['P_TF_RECHAZOS_CJIP_CASU_CD_SUCURSAL']);
				$("#DATO_POLIZA_MONEDA").html("<b>" + validarCampoVacio(formatearMoneda(json[card]['P_TF_RECHAZOS_INB_MT_MONT']))+"</b>" );

				
			//Abre el modal
			$("#pagosRechazadosProductorPopUp").modal({
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

function verDatosDetalleRemesaPorProductor(){
	
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'existeDetalleRemesaProductor',
	    contentType: 'application/json', 
	    
	    data : {nroProductor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		location.href="/PSPES/homeDetalleRemesaPorProductor?nroProductor="+ productor;
				
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente al verificar remesa. Error:'+e);
	    	}
    		$.unblockUI();

	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verDatosImpositivos(){
	
	var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosImpositivos',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		/*Datos generales*/
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CD_SERVICIO_SOCIAL").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CD_SERVICIO_SOCIAL'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_SERVICIO_SOCIAL']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_NU_SERVICIO_SOCIAL").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_NU_SERVICIO_SOCIAL']) +"<b>");
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_IN_ING_BRUTOS").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_IN_ING_BRUTOS'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_ING_BRUTOS']) +"<b>");
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_NU_INGRESOS_BRUTOS").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CD_SERVICIO_SOCIAL']) +"<b>");
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CJIB_CD_CLASIF_IB").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CJIB_CD_CLASIF_IB'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_CLASIF_IB']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CJIV_CD_IVA").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CJIV_CD_IVA'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_IVA']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CJCC_CD_CONC_GANANCIA").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CJCC_CD_CONC_GANANCIA'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_CONC_GANANCIA']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_CJGN_CD_CONDICION").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_CJGN_CD_CONDICION'])+ "&nbsp;-&nbsp;"+validarCampoVacio(json[0]['P_TF_IMPOSITIVO_INB_CONDICION']) +"<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_NU_CAJAJUB").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_NU_CAJAJUB']) +"<b>");
	    		
	    		/*Tasas*/
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_RETEN_ISSS").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_RETEN_ISSS'])+ "<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_PO_RETEN_ISSS").html("<b>" +validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_PO_RETEN_ISSS']) +"<b>");
	    		
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_RETEN_IVA").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_RETEN_IVA'])+ "<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_PO_RETEN_IVA").html("<b>" +validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_PO_RETEN_IVA']) +"<b>")

	    		
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_RETEN_GANAN").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_RETEN_GANAN'])+ "<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_PO_RETEN_GANAN").html("<b>" +validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_PO_RETEN_GANAN']) +"<b>")

	    		
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_RETEN_IB").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_RETEN_IB'])+ "<b>")
	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_PO_RETEN_IB").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_PO_RETEN_IB']) +"<b>")

	    		$("#INFO_P_TF_IMPOSITIVO_CAPD_FE_RETEN_ISSS").html("<b>" + validarCampoVacio(json[0]['P_TF_IMPOSITIVO_CAPD_FE_RETEN_ISSS']) +"<b>");

	    		
	    		//Abre el modal
				$("#impositivosProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar impositivos. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
	
}

function verDatosConvenioEsquema(){
	
	bloquearPantallaGris();

	verDatosEsquema();
	verDatosConvenio();
	
	//Abre el modal
	$("#convenioEsquemaProductorPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	$.unblockUI();

}


function verDatosEsquema(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosEsquema',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_ESQUEMA_INB_ESQUEMA").html("<b>" + validarCampoVacio(json[0]['P_TF_ESQUEMA_CAPZ_CAEQ_CD_ESQUEMA'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_ESQUEMA_INB_ESQUEMA']) +"<b>")
	    		$("#INFO_P_TF_ESQUEMA_CAPZ_FE_DESDE").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_ESQUEMA_CAPZ_FE_DESDE'])) +"<b>");
	    		$("#INFO_P_TF_ESQUEMA_CAPZ_FE_HASTA").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_ESQUEMA_CAPZ_FE_HASTA']) +"<b>"));	    		

	    		
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar esquema. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDatosConvenio(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosConvenio',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_CONVENIO_CACV_CACO_CD_CONVENIO").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACV_CACO_CD_CONVENIO'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_DE_CONVENIO']) +"<b>")
	    		$("#INFO_P_TF_CONVENIO_CACO_NU_TOLERANCIA").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_TOLERANCIA']) +"<b>");
	    		
	    		$("#INFO_P_TF_CONVENIO_CACV_FE_INICIO").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_CONVENIO_CACV_FE_INICIO'])) +"<b>");
	    		$("#INFO_P_TF_CONVENIO_CACV_FE_TERMINO").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_CONVENIO_CACV_FE_TERMINO'])) +"<b>");

	    		$("#INFO_P_TF_CONVENIO_CACO_IN_RENDICION").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_IN_RENDICION'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_INB_IN_RENDICION']) +"<b>")
	    		$("#INFO_P_TF_CONVENIO_CACO_NU_DIAREN_1").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIAREN_1'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIAREN_2'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIAREN_3'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIAREN_4']) +"<b>")
	    																
	    		$("#INFO_P_TF_CONVENIO_CACO_IN_LIQUIDACION").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_IN_LIQUIDACION'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_INB_IN_LIQUIDACION']) +"<b>")
	    		$("#INFO_P_TF_CONVENIO_CACO_NU_DIALIQ_1").html("<b>" + validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIALIQ_1'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIALIQ_2'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIALIQ_3'])
	    																+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_CONVENIO_CACO_NU_DIALIQ_4']) +"<b>")

		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar convenio. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDatosIntervinientes(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosIntervinientes',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#DATOS_MODAL_INTERVINIENTES_PRODUCTOR").html("Intervinientes (" + json.length + ")");
	    		
	    		dl = document.getElementById("intervinientesProductor");

    			dl.innerHTML='';
    			var cardInter='';

	    		for(var int=0; int<json.length; int++){

	    			var cardInterDetalle='';
	    			

	    			cardInterDetalle = cardInterDetalle + '<div class="row">';
	    			cardInterDetalle = cardInterDetalle + '<div class="col-md-6"'+'";>'+ "Productor&nbsp;:&nbsp;" + '<b>'+  validarCampoVacio(json[0]['P_TF_INTERVINIENTES_CAPH_CAPD_CD_PRODUCTOR_I'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_INTERVINIENTES_INB_PRODUCTOR_I'])+'</b>' + '</div>';
	    			cardInterDetalle = cardInterDetalle + '<div class="col-md-6"'+'";>'+ "Comision&nbsp;:&nbsp;" + '<b>'+  validarCampoVacio(json[0]['P_TF_INTERVINIENTES_CAPH_PO_COMISION'])+'</b>' + '</div>';
	    			cardInterDetalle = cardInterDetalle + '</div>';
					

	    			cardInter = cardInter + '<div class="timeline__post seleccionPanelB" style="width:99%;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:12px" id="numCardContacto'+ int +'">';
	    			cardInter = cardInter +  '<div class="timeline__content direccionCliente" id="panelModalSiniestroNotas'+int+'" style="overflow:hidden;">';
	    			cardInter = cardInter +  '<h5 class="datoSiniestroModal" id="notasModalSiniestro'+int+'">'+'<b>'+"Interviniente #" + int +'</b>'+'</h5>'+'<hr style="margin-top:0px;border-top: 0px solid #00317A;">'; 
	    			cardInter = cardInter +  '<h6 class="datoSiniestroModal" id="detallesIntervinientesProductor'+int+'">'+ cardInterDetalle + '</h6>'+ '</div></div>';
	    			cardInter = cardInter + '</div></div>';
	    			
	    			
	    		}
	    		
	    		dl.innerHTML = cardInter;
	    		
	    		//Abre el modal
				$("#intervinientesProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar intervinientes. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDatosFormaDePago(){
	
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosFormaDePago',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_CABA_CD_BANCO").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_CABA_CD_BANCO'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_FORMA_PAGO_INB_BANCO']) +"<b>");
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_TP_CUENTA").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_TP_CUENTA']) + "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_FORMA_PAGO_INB_TP_CUENTA']) +"<b>");
	    		
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_CD_FORMA_PAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_CD_FORMA_PAGO']) + "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_FORMA_PAGO_INB_FORMA_PAGO']) +"<b>");

	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_CABS_NU_SUC_BANCO").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_CABS_NU_SUC_BANCO'])+ "&nbsp;"+"-"+"&nbsp;"+validarCampoVacio(json[0]['P_TF_FORMA_PAGO_INB_SUC_BANCO']) +"<b>")
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_CADM_NU_CUENTA").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_CADM_NU_CUENTA']) +"<b>");
	    		
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_NU_CBU").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_NU_CBU'])+"<b>");
	    		$("#INFO_P_TF_FORMA_PAGO_CAPD_ST_ORDEN_CHEQUE").html("<b>" + validarCampoVacio(json[0]['P_TF_FORMA_PAGO_CAPD_ST_ORDEN_CHEQUE']) +"<b>");
	    		
	    		
	    		
	    		//Abre el modal
				$("#formaDePagoProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar la forma de pago. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verDatosOSSEG(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosOSSEG',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		if(json.length>0){
	    			$("#INFO_P_TF_OSSEG_CAPD_NU_AFIL_OSSEG").html("<b>" + validarCampoVacio(json[0]['P_TF_OSSEG_CAPD_NU_AFIL_OSSEG']) +"<b>");
		    		$("#INFO_P_TF_OSSEG_CAPD_NU_PORC_OSSEG").html("<b>" + validarCampoVacio(json[0]['P_TF_OSSEG_CAPD_NU_PORC_OSSEG']) +"<b>");
	    			
	    			
	    		}else{
	    			$("#INFO_P_TF_OSSEG_CAPD_NU_AFIL_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    			$("#INFO_P_TF_OSSEG_CAPD_NU_PORC_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    		}
	    		
		    	$.unblockUI();

	    	} catch (e) {
	    		$("#INFO_P_TF_OSSEG_CAPD_NU_AFIL_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
    			$("#INFO_P_TF_OSSEG_CAPD_NU_PORC_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$.unblockUI();
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$("#INFO_P_TF_OSSEG_CAPD_NU_AFIL_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
			$("#INFO_P_TF_OSSEG_CAPD_NU_PORC_OSSEG").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$.unblockUI();
	    	},
	 
	   
	});
}

function verDatosSSN(){
	
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosSSN',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{	    		
	    		
	    		$("#INFO_P_TF_SSN_CAPD_NU_SUPERINTENDENCIA").html("<b>" + validarCampoVacio(json[0]['P_TF_SSN_CAPD_NU_SUPERINTENDENCIA'])+"<b>");
	    		$("#INFO_P_TF_SSN_CAPD_FE_NOTIF_MATRICULA").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_SSN_CAPD_FE_NOTIF_MATRICULA'])) +"<b>");
	    		
	    		$("#INFO_P_TF_SSN_CAPD_FE_PAGO_MATRICULA").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_SSN_CAPD_FE_PAGO_MATRICULA'])) +"<b>");
	    		$("#INFO_P_TF_SSN_CAPD_NU_ANIO_PAGO").html("<b>" + validarCampoVacio(json[0]['P_TF_SSN_CAPD_NU_ANIO_PAGO']) +"<b>");

	    		$("#INFO_P_TF_SSN_CAPD_NU_SUPERINTENDENCIA_RAI").html("<b>" + validarCampoVacio(json[0]['P_TF_SSN_CAPD_NU_SUPERINTENDENCIA_RAI']) +"<b>");
	    		$("#INFO_P_TF_SSN_CAPD_FE_NOTIF_MATRICULA_RAI").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_SSN_CAPD_FE_NOTIF_MATRICULA_RAI'])) +"<b>");
	    		
	    		$("#INFO_P_TF_SSN_CAPD_FE_PAGO_MATRICULA_RAI").html("<b>" + validarCampoVacio(formatearFechaJson(json[0]['P_TF_SSN_CAPD_FE_PAGO_MATRICULA_RAI']))+"<b>");
	    		$("#INFO_P_TF_SSN_CAPD_NU_ANIO_PAGO_RAI").html("<b>" + validarCampoVacio(json[0]['P_TF_SSN_CAPD_NU_ANIO_PAGO_RAI']) +"<b>");
	    		
	    		
	    		
	    		//Abre el modal
				$("#SSNProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar la SSN. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verDatosInhabilitacionesSSN(){
	
	var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosInhabilitacionesSSN',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    			    		
	    		var d1 = document.getElementById("datosInhabSSN");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	var cantInhSSN = json.length -1;
    	    	
    	    	for ( var int=0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PROD_INVALIDOS_CERP_CAUS_CD_USUARIO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_PROD_INVALIDOS_INB_DE_USUARIO'])) +'</h6></td>'+
		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_PROD_INVALIDOS_CERP_NU_ORDEN']) +'</h6></td>'+
		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PROD_INVALIDOS_CERP_FE_DESDE'])) +'</h6></td>'+
		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PROD_INVALIDOS_CERP_FE_HASTA'])) +'</h6></td>'+

		            '<td class="td-grilla-inhabilitacionSSNProductor" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PROD_INVALIDOS_CERP_FE_ACTUALIZACION'])) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
	    		$("#DATO_INHAB_SSN").html("Inhabilitaciones <b>#" + productor + "</b>");
	    		
	    		$("#INFO_P_TF_PROD_INVALIDOS_INB_ESTADO").html("<b>" + validarCampoVacio(json[cantInhSSN]['P_TF_PROD_INVALIDOS_INB_ESTADO'])+ "</b>");
	    		
	    		//Abre el modal
				$("#inhabilitacionesSSNProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
				
				
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar las inhabilitaciones SSN. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verDatosHistoriaProductor(){
	
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosHistoriaProductor',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		var panelNuevo='';
	    		if(((json.organizador==null || json.organizador.length==0) && (json.productor ==null || json.productor.length==0))){
	    			throw new Error("No exite historia de organizador/productor");
	    		}
	    		
	    		$("#DATO_HISTORIA_PRODUCTOR").html(
	    				"<b>" + "Historia"+ "</b>"
	    				+ "&nbsp;&nbsp;&nbsp;&nbsp;"
	    				+"<label class='radio-inline radioButtonPorHistoria'><input type='radio' name='optradio' value='1' onclick='verHistoria(this)' checked>Por&nbsp;productor</label>"
	    				+"<label class='radio-inline radioButtonPorHistoria'><input type='radio' name='optradio' value='2' onclick='verHistoria(this)'>Por&nbsp;organizador</label>"
	    		);
	    		
    	    	
    	    	if(!(json.organizador==null || json.organizador.length==0)){
    	    		var d1 = document.getElementById("datosHistoriaOrganizador");
        	    	d1.innerHTML = ' ';
        	    	panelNuevo = '';
        	    	
        	    	for ( var int=0; int < json.organizador.length ; int++) {
        	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    		            '<td class="td-grilla-historiaOrganizador" role="cell"><h6>'+validarCampoVacio(json.organizador[int]['P_TF_HISTORIA_CAOR_CD_ORGANIZADOR']) +" - "+validarCampoVacio(primeraLetraMayus(json.organizador[int]['P_TF_HISTORIA_INB_ORGANIZADOR'])) +'</h6></td>'+
    		            '<td class="td-grilla-historiaOrganizador" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json.organizador[int]['P_TF_HISTORIA_CAOR_FE_ALTA'])) +'</h6></td>'+
    		            '<td class="td-grilla-historiaOrganizador" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json.organizador[int]['P_TF_HISTORIA_CAOR_FE_BAJA'])) +'</h6></td>'+
    		            '</tr>';
        	    	}
        	    	
        	    	d1.innerHTML = panelNuevo + '</tr>';
    	    		
        	    	
    	    	}else{

    	    		document.getElementById("idHistoriaProductor").style.display="none";    	    	
        	    	document.getElementById("idHistoriaProductorAdicional").style.display="none";   
        	    	
        	    	var dl = document.getElementById("idHistoriaOrganizadorPanel");
        	    	
        	    	dl.innerHTML = ' ';
        	    	panelNuevo='';
        	    	panelNuevo = panelNuevo + "<div id='cuadroImgVacio' style='cursor:pointer; background-color:#ffffff'>"
        	    	
        	    	+"<div class='timeline__post seleccionPanelB' id='timeLineItemVacio' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A'>" 
        	    	
        	    	+"<div class='timeline__content' style='overflow:hidden;'>"
        	    	
        	    	+"<i class='material-icons altoIcono' style='color:#205081; font-size:40px; float:left; margin-right:20px;' id='imgTimeLineVacio'>" + "&#xE611;"+"</i>"
        	    	+"<h6 style='padding-top: 15px; padding-bottom: 15px; color:#b3b0b0;'>No se encontraron datos organizador</h6"
        	    	
        	    	+"</div>"
        	    	
        	    	+"</div>";
        	    	
        	    	dl.innerHTML = panelNuevo + '</div>';        	    	
    	    	}
    	    	
    	    	if(!(json.productor==null || json.productor.length==0)){

    	    		var d12 = document.getElementById("datosHistoriaProductor");
        	    	d12.innerHTML = ' ';
        	    	panelNuevo = '';
    	    				
    	    		for(var int=0; int<json.productor.length; int++){
    	    			panelNuevo = panelNuevo +'<tr class="tr-grilla" style="cursor:pointer;"onclick="verDatosEstadoHistoriaProductor('+ int+')">'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAOR_CAPD_CD_PRODUCTOR']) +'</h6></td>'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAPD_CASU_CD_AGENCIA']) +'</h6></td>'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAPD_CAUT_CD_LUGAR']) +'</h6></td>'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAOR_CACO_CD_CONVENIO']) +'</h6></td>'+

    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAOR_CAPZ_CD_ESQUEMA']) +'</h6></td>'+
    		            '<td class="td-grilla-historiaProductor" role="cell"><h6>'+validarCampoVacio(json.productor[int]['P_TF_HISTORIA_CAOR_CD_CATEGORIA_PRODUCTOR']) +'</h6></td>'+
    		            '</tr>';
    	    		}
        	    	d12.innerHTML = panelNuevo + '</tr>';
        	    	
        	    	var cantHistProd = json.productor.length - 1;

        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_ALTA").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_ALTA'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_MODIFICACION").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_MODIFICACION'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_PROV").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_BAJA_PROV'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_REHABILITACION").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_REHABILITACION'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_BAJA'])) +"</b>");
        	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_DEF").html("<b>"+ validarCampoVacio(formatearFechaJson(json.productor[cantHistProd]['P_TF_HISTORIA_CAOR_FE_BAJA_DEF'])) +"</b>");

        	    	
        	    	
        	    	document.getElementById("idHistoriaProductor").style.display="block";    	    	
        	    	document.getElementById("idHistoriaProductorAdicional").style.display="block";    	    	
        	    	document.getElementById("idHistoriaOrganizador").style.display="none";	  
        	    	
    	    	}else{
    	    		document.getElementById("idHistoriaProductor").style.display="none";    	    	
        	    	document.getElementById("idHistoriaProductorAdicional").style.display="none";   
        	    	
        	    	var dl = document.getElementById("idHistoriaProductor");
        	    	
        	    	dl.innerHTML = ' ';
        	    	panelNuevo='';
        	    	
        	    	panelNuevo = panelNuevo + "<div class='col-md-12' style='ext-align: left;height: 350px;overflow-y:auto;padding:0px;'>";
        	    	
        	    	panelNuevo = panelNuevo + "<div id='cuadroImgVacio' style='cursor:pointer; background-color:#ffffff'>"
        	    	
        	    	+"<div class='timeline__post seleccionPanelB' id='timeLineItemVacio' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A'>" 
        	    	
        	    	+"<div class='timeline__content' style='overflow:hidden;'>"
        	    	
        	    	+"<i class='material-icons altoIcono' style='color:#205081; font-size:40px; float:left; margin-right:20px;' id='imgTimeLineVacio'>" + "&#xE611;"+"</i>"
        	    	+"<h6 style='padding-top: 15px; padding-bottom: 15px; color:#b3b0b0;'>No se encontraron datos organizador</h6"
        	    	
        	    	+"</div>"
        	    	
        	    	+"</div>";
        	    	+"</div>";

        	    	
        	    	dl.innerHTML = panelNuevo + '</div>';  
    	    	}
  	
	    		
	    		//Abre el modal
				$("#historiaProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar la historia de productor/organizador. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}

function verHistoria(sel){
	if(sel.value=="1"){
		
		document.getElementById("idHistoriaOrganizador").style.display="none";
		document.getElementById("idHistoriaProductor").style.display="block";
		document.getElementById("idHistoriaProductorAdicional").style.display="block";

	}
	if(sel.value=="2"){
		document.getElementById("idHistoriaOrganizador").style.display="block";
		document.getElementById("idHistoriaProductor").style.display="none";
		document.getElementById("idHistoriaProductorAdicional").style.display="none";
		
		

	}
	
}

function verChequesRechazadosProductor(){
	
	var productor = document.getElementById("valorProductor").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'datosChequesRechazados',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		 
	    		
	    		var d1 = document.getElementById("datosChequesRechazados");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	
    	    	for ( var int=0; int < json.chequesRechazados.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CJIN_NU_INGRESO']) +'</h6></td>'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CJCI_NU_CHEQUE']) +'</h6></td>'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CJDV_FE_STATUS'])) +'</h6></td>'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CAMO_CD_MONEDA'])+ " - " + validarCampoVacio(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_INB_MONEDA']) + '</h6></td>'+

		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(formatearFechaJson(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_FE_ACTUALIZACION'])) +'</h6></td>'+
		            '<td class="td-grilla-chequesRechazados" role="cell"><h6>'+validarCampoVacio(formatearMoneda(json.chequesRechazados[int]['P_TF_CHEQUES_RECH_CJDA_CJCI_MT_CHEQUE'])) +'</h6></td>'+

		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
	    		
	    		
	    		$("#INFO_P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_DOLARES").html("<b>" + validarCampoVacio(formatearMoneda(json.totalCheques[0]['P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_DOLARES']))+ "</b>");
	    		$("#INFO_P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_EUROS").html("<b>" + validarCampoVacio(formatearMoneda(json.totalCheques[0]['P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_EUROS']))+ "</b>");
	    		$("#INFO_P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_PESOS").html("<b>" + validarCampoVacio(formatearMoneda(json.totalCheques[0]['P_TF_TOTALES_CHEQUES_INB_MT_TOTAL_PESOS']))+ "</b>");

	    		//Abre el modal
				$("#chequesRechazadosProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
				
				
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar las inhabilitaciones SSN. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function mostrarBotonesProductor(){
		
	$(".mostrarBotonProductor").each(function(){
		$(this).css("display","");
		
	});
	
	$("#btnVerMasBotonesProductor").css("display", "none");
	
}

function verDatosMotivoBaja(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosMotivoBajaProductor',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		if(json.length>0){
	    			$("#INFO_CAPD_CD_MOTIVO_BAJA").html("<b style='color:#6fa1d4;'>" +validarCampoVacio(json[0]['P_TF_MOTIVO_BAJA_CAPD_CD_MOTIVO_BAJA'])+ " - "+ validarCampoVacio(json[0]['P_TF_MOTIVO_BAJA_INB_MOTIVO_BAJA']) + "</b>");
	    			$("#INFO_CAPD_CD_MOTIVO_BAJA").css("cursor", "pointer");
	    			$("#INFO_CAPD_CD_MOTIVO_BAJA").click(function(e){ 
			    		e.preventDefault();
			    	    e.stopImmediatePropagation();
			    	    verMotivoBajaProductorModal(); 
			    	});
	    		}
	    		else{
	    			$("#INFO_CAPD_CD_MOTIVO_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");

	    		}
	    		
		    	$.unblockUI();

	    	} catch (e) {
	    		$("#INFO_CAPD_CD_MOTIVO_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    		$.unblockUI();
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$("#INFO_CAPD_CD_MOTIVO_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>"); 
	    	$.unblockUI();
	    	},
	 
	   
	});
}


function verMotivoBajaProductorModal(){
var productor = document.getElementById("valorProductor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosMotivoBajaProductor',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_MOTIVO_BAJA_CAPD_CD_MOTIVO_BAJA").html("<b>" + validarCampoVacio(json[0]['P_TF_MOTIVO_BAJA_CAPD_CD_MOTIVO_BAJA'])+ " - "+ validarCampoVacio(primeraLetraMayus(json[0]['P_TF_MOTIVO_BAJA_INB_MOTIVO_BAJA'])) +"<b>");
	    		
	    		$("#INFO_P_TF_MOTIVO_BAJA_CAPD_OBS_CD_BAJA").html("<b>" + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_MOTIVO_BAJA_CAPD_OBS_CD_BAJA'])) +"<b>");
	    		
	    		
	    		//Abre el modal
				$("#motivoBajaProductorPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
					});
				
	    		
		    	$.unblockUI();

	    	} catch (e) {
		    	$.unblockUI();
	    		mostrarError('Se genero un inconveniente al verificar Motivo de baja. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}

function verDatosEstadoHistoriaProductor(numeroFila){
	
	var productor = document.getElementById("valorProductor").value;
	
	$.ajax({
	    url : 'datosEstadoHistoriaProductor',
	    contentType: 'application/json', 
	    
	    data : {productor : productor} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#INFO_P_TF_HISTORIA_CAOR_FE_ALTA").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_ALTA'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_MODIFICACION").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_MODIFICACION'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_PROV").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_BAJA_PROV'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_REHABILITACION").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_REHABILITACION'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_BAJA'])) +"</b>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_DEF").html("<b>"+ validarCampoVacio(formatearFechaJson(json[numeroFila]['P_TF_HISTORIA_CAOR_FE_BAJA_DEF'])) +"</b>");

	    	} catch (e) {
	    		$("#INFO_P_TF_HISTORIA_CAOR_FE_ALTA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$("#INFO_P_TF_HISTORIA_CAOR_FE_MODIFICACION").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_PROV").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$("#INFO_P_TF_HISTORIA_CAOR_FE_REHABILITACION").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
		    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
    	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_DEF").html("</b><a style='color:#bfbac2;'>Sin dato</a>");

	    	}
			
	    },
	    error : function(xhr, status) {
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_ALTA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_MODIFICACION").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_PROV").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_REHABILITACION").html("</b><a style='color:#bfbac2;'>Sin dato</a>");
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA").html("</b><a style='color:#bfbac2;'>Sin dato</a>");  
	    	$("#INFO_P_TF_HISTORIA_CAOR_FE_BAJA_DEF").html("</b><a style='color:#bfbac2;'>Sin dato</a>");

	    	
	    },
	 
	   
	});
	
}







function datosContactoProductor(){
	bloquearPantallaGris();

	var numPersonaProd = document.getElementById("valorNumeroPersonaProd").value;

		$("#DATO_CONTACTO").html("Contacto Del Productor");
		var panelNuevo ='';
		var d1 ='';
		for ( var int = 0; int < 10; int++) {
			
		$.ajax({
		    url : 'datosContactoProductor',
		    contentType: 'application/json', 
		    
		    data : {numPersona : numPersonaProd,consecutivo:int} ,
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		
		    		if(json[0]['P_TF_DETALLE_INB_TIPO_CONTACTO'] != '' && json[0]['P_TF_DETALLE_INB_DATO_CONTACTO'] != ''){
		    		 d1 = document.getElementById("datosContactoProductor");

		    		 panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
			            '<td class="td-grilla-contactoProductorHome" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_DETALLE_INB_TIPO_CONTACTO']) +'</h6></td>'+
			            '<td class="td-grilla-contactoProductorHome" role="cell"><h6>'+validarCampoVacio(json[0]['P_TF_DETALLE_INB_DATO_CONTACTO']) +'</h6></td>'+
			            '</tr>';
	    	    		
	    	    	d1.innerHTML = panelNuevo;

		    		}
				
		    	}
		    	catch(e)
		    	{
			    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
		    		
		    	}
				
		    },
		    error : function(xhr, status) {
		    	$.unblockUI();
		    	},
		 
		   
		});
		}

		$("#datosContactoProdPopUp").modal({
			 escapeClose: false,
			  clickClose: false,
			  showClose: false,
			  fadeDuration: 400,
			  fadeDelay: 0.05
			});
		
		$.unblockUI();
		
	}



