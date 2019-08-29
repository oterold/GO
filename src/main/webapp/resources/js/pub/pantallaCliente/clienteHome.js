function mostrarPolizaClienteHome(obj,endoso,numeroEndoso,tipoEndoso,imagenPoliiza,poliza,ramo,sucursal)
{
	var valorCliente=document.getElementById("valorCliente").value;
	bloquearPantallaGris();

	$.ajax({
	    url : 'datosPoliza',
	    contentType: 'application/json', 
	    data : {ramo : ramo , poliza : poliza, sucursal:sucursal  },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{	    	
	    		
	    		

	    	$("#datoTmp").val(JSON.stringify(json));
	    	
	    	var iconoHtml="<i class='material-icons' style='display:inline;color:#00317A;font-size:14px;cursor:pointer;'>arrow_drop_up</i>";
	    	
	    	llenarDinamicamente(json);
	    	
	    	var fechaDesde = formatearFechaJson(json['P_TF_POLI_CACE_FE_DESDE']);
	    	$("#productorClienteHome").val(json['P_TF_POLI_CACE_CAPD_CD_PRODUCTOR']);
	    	$("#sucursalClienteHome").val(json['P_TF_POLI_CACE_CASU_CD_SUCURSAL']);

	    	
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_ASEGURADO").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_ASEGURADO']) + "</b>");

			$("#INFO_FECHA_DESDE_P_TF_POLI_CACE_FE_DESDE").html("<b>" + fechaDesde +"&nbsp;al&nbsp;"+ "</b>");
			$("#INFO_FECHA_DESDE_B_P_TF_POLI_CACE_FE_DESDE").html("<b>" + fechaDesde +"&nbsp;al&nbsp;"+ "</b>");
			$("#INFO_CLIENTE_P_TF_POLI_INB_DSP_ASEGURADO").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_ASEGURADO'].toLowerCase()) + "</b>");
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_ASEGURADO").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_ASEGURADO'].toLowerCase()) + "</b>");
			$("#INFO_CLIENTE_P_TF_POLI_INB_DSP_PRODUCTOR").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_PRODUCTOR'].toLowerCase()) + "</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_PRODUCTOR").html("<b>" +primeraLetraMayus(json['P_TF_POLI_INB_DSP_PRODUCTOR'].toLowerCase()) + "</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#INFO_CLIENTE_P_TF_POLI_INB_DSP_SUCURSAL").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_SUCURSAL'].toLowerCase()) + "</b>"+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_SUCURSAL").html("<b>" + primeraLetraMayus(json['P_TF_POLI_INB_DSP_SUCURSAL'].toLowerCase())+ "<i class='material-icons' style='display:inline;color:#6fa1d4;font-size:14px;cursor:pointer;'>arrow_drop_up</i>");
			$("#INFO_CLIENTE_P_TF_POLI_INB_DSP_RAMO").html("<b>"+json['P_TF_POLI_CACE_CARP_CD_RAMO'] +"&nbsp;-&nbsp;"+ verificarCampoJson(json['P_TF_POLI_INB_DSP_RAMO'].toLowerCase())+ "</b>");
			$("#INFO_CLIENTE_B_P_TF_POLI_INB_DSP_RAMO").html("<b>"+json['P_TF_POLI_CACE_CARP_CD_RAMO'] +"&nbsp;-&nbsp;"+ verificarCampoJson(json['P_TF_POLI_INB_DSP_RAMO'].toLowerCase())+ "</b>");
			$("#DATO_FACTURACION_POLIZA_CLIENTEHOME").html("<b>"+json['P_TF_POLI_INB_TP_FACTURACION'] + "</b>");
			$("#DATO_PROMO_POLIZA_CLIENTEHOME").html("<b>"+json['P_TF_POLI_INB_PROMOCION'] + "</b>");
		    
			$("#DATO_PLAN_PAGO_A").html("<b>"+verificarCampoJson(json['P_TF_POLI_CACE_CAMD_CD_MEDIO_PAGO'])+" - "+ verificarCampoJson(json['P_TF_POLI_INB_MEDIO_PAGO'])+ "</b>");
			$("#DATO_PLAN_PAGO_B").html("<b>"+verificarCampoJson(json['P_TF_POLI_CACE_CAMD_CD_MEDIO_PAGO'])+" - "+ verificarCampoJson(json['P_TF_POLI_INB_MEDIO_PAGO'])+ "</b>");
		    
			$("#DATO_ORIGEN_PAGO_A").html("<b>"+verificarCampoJson(primeraLetraMayus(json['P_TF_POLI_CACE_COTC_CD_ORIGEN']))+" - "+ verificarCampoJson(primeraLetraMayus(json['P_TF_POLI_INB_ORIGEN']))+ "</b>");
			$("#DATO_ORIGEN_PAGO_B").html("<b>"+verificarCampoJson(primeraLetraMayus(json['P_TF_POLI_CACE_COTC_CD_ORIGEN']))+" - "+ verificarCampoJson(primeraLetraMayus(json['P_TF_POLI_INB_ORIGEN']))+ "</b>");
		    
			
			
			//muestra panel D setea img y titulo
			
			$('#panelb').hide();
			$('#panela').show();
			$('#verMasPanelA').text('Ver mas');
			
			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$(".timeline__date").each(function(){
		 	    $(this).css("background","white");
		 	});
			
			$('#'+obj).css("background","#bac2bb");
			$('#'+endoso).show();
			$('#labelPanelEndoso').html("P&oacute;liza #" + ramo+ " - " + poliza );
			var imgTimeLine = $('#imgTimeLineEndoso'+numeroEndoso).attr("src");
			$('#imgCliente').attr('src',imgTimeLine);
			$('#imgClientes').attr('src',imgTimeLine);

			var d1 = document.getElementById("panelImagenEndoso");
			d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+imagenPoliiza+'</i>'; 
			
			var d2 = document.getElementById("botonPoliza");
			d2.innerHTML = '<a class="btn btn-panela-poliza  btn-social btn-bitbucket  material-icons inspeccionesBotonHoover"  data-placement="bottom" data-toggle="tooltip" title="Poliza" style="margin-right:5px;font-size:20px; margin-top:5px;margin-bottom:5px;height:30px;padding-bottom:5px;padding-top:1px;color:#ffffff;background-color:#205081" onclick="detallePolizaClienteHome();">play_arrow</a>';
	    	}
	    	catch (e)
	    	{
	    		alert('Se produjo un inconveniente al mostrar la poliza el error generado es:'+e);
	    	}
			
			
			//agregar ajax siniestro aca	
	    	
	    	bloquearPantallaGris();
    	$.ajax({
    	    url : 'datosSiniestro',
    	    contentType: 'application/json', 
    	    data : {  ramo : ramo , poliza : poliza , cliente : valorCliente,sucursal:sucursal },
    	    type : 'GET',
    	    dataType : 'json',
    	    success : function (json) {
    	    	
    	    	try {
					
    	    	$('#cantSiniestros').text("Siniestros (" + json.length + ")");	    	    	
    	    	
    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
    	    	$('#cantSiniestros').parent().next().append('<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE02f;</i>');
    	    	
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");
    	    	var d1 = document.getElementById("caruMayor");
    	    	d1.innerHTML = ' ';
    	    	  
    	    	if(json.length < 40){
    	    		
    	    		var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
    	    		
    	    	
    	    	for ( var int = 0; int < json.length; int++) {
    	    	
    	    		var num=int+1;
    	    		var popUp= "'siniestroPopUp'";
    	    		var nroCer= 'nroSiniestro'+num;
    	    		var DatoCer= 'datoSiniestro'+num;
    	    		
    	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'" onclick="abrirModalDetalleSiniestro('+json[int]['P_TF_SINI_SISI_NU_SINIESTRO']+','+json[int]['P_TF_SINI_SISI_CARP_CD_RAMO']+','+1+');" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#39b3d7; border-style: solid; box-shadow: 0 0 0px black;"><h6 id='+nroCer+' style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#39b3d7;color:#ffffff;">#'+json[int]['P_TF_SINI_SISI_NU_SINIESTRO']+' </h6><h6 style="margin-top:2%;" id='+DatoCer+' class="datoSiniestroCarusel"><b>'+json[int]['P_TF_SINI_SISI_CARP_CD_RAMO']+'&nbsp;-&nbsp;'+json[int]['P_TF_SINI_SISI_CAPO_NU_POLIZA']+'</b></h6><h6 style="margin-top:2%;" id='+DatoCer+' class="datoSiniestroCarusel">'+json[int]['P_TF_SINI_INB_DSP_BIEN']+'</h6><h6 style="margin-top:2%;" id='+DatoCer+' class="datoSiniestroCarusel">'+json[int]['P_TF_SINI_SISI_FE_OCURRENCIA']+'</h6><br></div>';
	    	    	    	    	
    	    	}
    	    	d1.innerHTML = caruNuevo;  
    	    	}
    	    	else{
    	    		var caruNuevo = '<div style="text-align:center; padding-left:25px;">';

    	    		caruNuevo = caruNuevo + '<div class="row" style="text-align:center;width:100%;margin-top:15px;">'+
    	    								'<div class="col-lg-12" style="text-align: center;">'+
    	    								'<a class="btn btn-panela-poliza  btn-social btn-bitbucket"  onclick="redirecGoSiniestro('+ramo+');" style="margin-right:5px;font-size:15px; margin-top:5px;margin-bottom:5px;height:30px;padding-bottom:5px;padding-top:1px;color:#ffffff;background-color:#39b3d7">Ver Siniestros</a>'+
    	    								'</div></div>';
    	    				    	    	d1.innerHTML = caruNuevo;  
	
    	    	}
    	    	
    	    	activarCaru();
    	    	} catch (e) {
    	    		// TODO: handle exception
    	    	}
    	    	
    	    	$.unblockUI();
    	    },
    		 
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	        //alert('Disculpe, no existen certificados para el endoso seleccionado');
    	    	$('#cantCertificados').text("Certificados");	    	    	
    	    	$('#cantSiniestros').text("Siniestros");
    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
    	    	$('#cantSiniestros').parent().next().append('<i class="material-icons altoIcono"  style="color:#39b3d7;padding-top:15px;" >&#xE611;</i>');
    	    	
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");
    	        document.getElementById("micaru").innerHTML = request.responseText; 
    	    	
    	    },
    	 
    	   
    	});
	    	
	    
	    	
	    	
	    	
	    },
	 
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    }
	    
	 
	   
	});
	



}



function abrirModalClienteHome(cliente){
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosCliente',
	    contentType: 'application/json', 
	    data : {cliente:cliente} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);

			$("#INFO_NU_CLIENTE_P_TF_CLIE_CACN_NU_CEDULA_RIF").html("Cliente :&nbsp#" + json[0]['P_TF_CLIE_CACN_NU_CEDULA_RIF']);
			$("#INFO_NU_DOC_P_TF_CLIE_CABU_CATU_TP_DOCUMENTO").html("<b>" + json[0]['P_TF_CLIE_CABU_CATU_TP_DOCUMENTO'] +"&nbsp-&nbsp"+json[0]['P_TF_CLIE_CABU_NU_DOCUMENTO']+"</b>" );
			$("#DATO_P_TF_CLIE_CACN_NU_CEDULA_RIF").val(json[0]['P_TF_CLIE_CACN_NU_CEDULA_RIF']);

			//Abre el modal
			$("#clientePopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		alert('Se produjo un inconveniente al cargar los datos del cliente',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};
	
function redirecClienteHome(){
	bloquearPantallaGris();
	var valorCliente = document.getElementById("DATO_P_TF_CLIE_CACN_NU_CEDULA_RIF").value;
	location.href = "/PSPES/homeCliente?nroCliente=" + valorCliente;
}

function abrirpopUpClienteProductor(){
	var valorProductor = document.getElementById("productorClienteHome").value;
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosProductorModal',
	    contentType: 'application/json', 
	    data : {productor:valorProductor} ,
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
	



function abrirpopUpClienteSucursal(){
	var valorSucursal = document.getElementById("sucursalClienteHome").value;

	bloquearPantallaGris();
	$.ajax({
	    url : 'detalleSucursal',
	    contentType: 'application/json', 
	    
	    data : {sucursal :valorSucursal} ,
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
	    		mostrarError('Se genero un inconveniente, al cargar la sucursal de la poliza. Error:'+e);
	    	}
	    	
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
};


function buscadorPanelPolizaClienteHome() {
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaPolizasCliente");
	  filter = input.value.toUpperCase();
	
	  $(".datoPolizacliente").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("etiquetaPolizaCliente", "panelModalClientePolizas");
		  var idCardParteB = idH6.replace("etiquetaPolizaCliente", "panelModalClientePolizas");
		  
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idCardParteB).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  

	}
	

function redirecGoSiniestro(ramo){
	bloquearPantallaGris();
	var valorCliente=document.getElementById("valorCliente").value;
	location.href = "/PSPES/go?dato="+valorCliente+"&entidades=001000&p1="+ramo+"&p2=3008&p3=0";
	$.unblockUI();

}




//---------------------------------------------------DIRECCIONES HOME EMPIEZA ACA -------------------------------------------------------------------->
function inicioDireccionesHome()
{
	$( "#timeLineItemContacto1" ).trigger( "click" );
}


function verDatosContactoPorCliente(){
	
	var valorCliente = document.getElementById("valorCliente").value;
	abrirPopUpContacto("", valorCliente, "", "", 'obtenerContactoPorCliente');

}

function verDatosDetalleRemesaPorCliente(){
	
	var cliente = document.getElementById("valorCliente").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'existeDetalleRemesaCliente',
	    contentType: 'application/json', 
	    
	    data : {nroCliente : cliente} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    		location.href="/PSPES/homeDetalleRemesaPorCliente?nroCliente="+ cliente;
				
	    	} catch (e) {
	    		mostrarError('Se genero un inconveniente al verificar remesa. Error:'+e);
	    	}
			
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}


function inicioClienteHome(){
	
	activarCaru();
	
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
});
	
	
}