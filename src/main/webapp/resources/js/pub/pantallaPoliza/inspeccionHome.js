function inicioInspeccionesHome() {
	bloquearPantallaGris();
	activarCaru();
	$( "#timeLineInspec1" ).trigger( "click" );
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );

});
	$.unblockUI();
}


function mostrarPanelDetalleInspeccion(obj,numeroCard,inspec,poliza,ramo,inspec,consecutivo, sucursal){
	
	
	bloquearPantallaGris();

	$.ajax({
	    url : 'datosCabeceraInspec',
	    contentType: 'application/json', 
	    data : {ramo : ramo , poliza : poliza, sucursal: sucursal, inspeccion:inspec},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    		try{
	    			var valor= 0;
	    			llenarDinamicamente(json[valor]);
	    			
	    			$('#inspeccionValor').val(inspec);
	    			$('#INFO_RAMO_INSPECCION').html("<b>"+json[valor]['P_TF_INSPE_CAIN_CNIN_CARP_CD_RAMO']+" - "+ primeraLetraMayus(json[valor]['P_TF_INSPE_INB_RAMO']));
	    			$('#INFO_RAMO_INSPECCION_B').html("<b>"+json[valor]['P_TF_INSPE_CAIN_CNIN_CARP_CD_RAMO']+" - "+ primeraLetraMayus(json[valor]['P_TF_INSPE_INB_RAMO']));
	    			
	    			document.getElementById("valorProducto").value= json[valor]['P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO'];
			    	document.getElementById("valorSucursal").value = json[valor]['P_TF_INSPE_CAIN_CNIN_CASU_CD_SUCURSAL'];
			    	$("#INFO_P_TF_INSPE_CAIN_CAPS_CD_PERITO").html(validarCampoVacio("<b>"+json[valor]['P_TF_INSPE_CAIN_CAPS_CD_PERITO']) + " - " + primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PERITO']))+"</b>");
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_CAPS_CD_PERITO").html(validarCampoVacio("<b>"+json[valor]['P_TF_INSPE_CAIN_CAPS_CD_PERITO']) + " - " + primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PERITO'])) + "</b>");

			    	$("#INFO_P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO").html("<b>"+validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO']) + " - " + primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PRODUCTO'])) +"</b>")
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO").html("<b>"+validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_CAPU_CD_PRODUCTO']) + " - " + primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PRODUCTO'])) +"</b>")

			    	//Popup Cliente
			    	$("#INFO_P_TF_INSPE_CAIN_NM_CLIENTE").css("color","#6fa1d4");
			    	$("#INFO_P_TF_INSPE_CAIN_NM_CLIENTE").css("cursor","pointer");
			    	$("#INFO_P_TF_INSPE_CAIN_NM_CLIENTE").click(function(e){ 
			    		e.preventDefault();
			    	    e.stopImmediatePropagation();
			    		abrirModalClienteHome(json[valor]['P_TF_INSPE_CAIN_NU_CEDULA_RIF']); 
			    	});
			    	document.getElementById("INFO_P_TF_INSPE_CAIN_NM_CLIENTE").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_NM_CLIENTE']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    	
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_NM_CLIENTE").css("color","#6fa1d4");
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_NM_CLIENTE").css("cursor","pointer");
			    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_NM_CLIENTE").click(function(e){ 
			    		e.preventDefault();
			    	    e.stopImmediatePropagation();
			    		abrirModalClienteHome(json[valor]['P_TF_INSPE_CAIN_NU_CEDULA_RIF']); 
			    	});
			    	document.getElementById("INFO_PANEL_2_P_TF_INSPE_CAIN_NM_CLIENTE").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_NM_CLIENTE']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>' + '</b>';
			    				    	
			    	//Popup productor
			    	$("#INFO_P_TF_INSPE_INB_PRODUCTOR").css("color","#6fa1d4");
			    	$("#INFO_P_TF_INSPE_INB_PRODUCTOR").css("cursor","pointer");
			    	$("#INFO_P_TF_INSPE_INB_PRODUCTOR").click(function(e){ 
			    		e.preventDefault();
			    	    e.stopImmediatePropagation();
			    		abrirModalProductorHome(json[valor]['P_TF_INSPE_CAIN_CAPD_CD_PRODUCTOR']); 
			    	});
			    	document.getElementById("INFO_P_TF_INSPE_INB_PRODUCTOR").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PRODUCTOR']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    	
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_PRODUCTOR").css("color","#6fa1d4");
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_PRODUCTOR").css("cursor","pointer");
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_PRODUCTOR").click( function(e){
			    		 e.preventDefault();
			    	        e.stopImmediatePropagation();
			    		abrirModalProductorHome(json[valor]['P_TF_INSPE_CAIN_CAPD_CD_PRODUCTOR']); 
			    	});
			    	document.getElementById("INFO_PANEL_2_P_TF_INSPE_INB_PRODUCTOR").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_PRODUCTOR']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    				    	
			    	//Popup sucursal
			    	
			    	document.getElementById("INFO_P_TF_INSPE_INB_SUCURSAL").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_SUCURSAL']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    	$("#INFO_P_TF_INSPE_INB_SUCURSAL").css("color","#6fa1d4");
			    	$("#INFO_P_TF_INSPE_INB_SUCURSAL").css("cursor","pointer");
					$("#INFO_P_TF_INSPE_INB_SUCURSAL").click(function(e){
			    		 e.preventDefault();
			    	        e.stopImmediatePropagation();
			    	        abrirModalSucursalHome(json[valor]['P_TF_INSPE_CAIN_CNIN_CASU_CD_SUCURSAL']);
			    	});
			    	
			    	document.getElementById("INFO_PANEL_2_P_TF_INSPE_INB_SUCURSAL").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_INB_SUCURSAL']))+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_SUCURSAL").css("color","#6fa1d4");
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_SUCURSAL").css("cursor","pointer");
			    	$("#INFO_PANEL_2_P_TF_INSPE_INB_SUCURSAL").click(function(e){
			    		 e.preventDefault();
			    	     e.stopImmediatePropagation();
			    		abrirModalSucursalHome(json[valor]['P_TF_INSPE_CAIN_CNIN_CASU_CD_SUCURSAL']);
			    	});
			    	
			    	//PopUp Observacion
			    	if(json[valor]['P_TF_INSPE_CAIN_DE_OBSERVACION']!=""){
			    		document.getElementById("INFO_P_TF_INSPE_CAIN_DE_OBSERVACION").innerHTML = '<b>'+primeraLetraMayus(json[valor]['P_TF_INSPE_CAIN_DE_OBSERVACION']).substr(0, 30) + '...'+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
				    	$("#INFO_P_TF_INSPE_CAIN_DE_OBSERVACION").css("color","#6fa1d4");
				    	$("#INFO_P_TF_INSPE_CAIN_DE_OBSERVACION").css("cursor","pointer");
						$("#INFO_P_TF_INSPE_CAIN_DE_OBSERVACION").click(function(e){
				    		 e.preventDefault();
				    	        e.stopImmediatePropagation();
				    	        abrirModalObservacionInspeccionHome();
				    	});
						
						document.getElementById("INFO_PANEL_2_P_TF_INSPE_CAIN_DE_OBSERVACION").innerHTML = '<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_DE_OBSERVACION'])).substr(0, 30) + '...'+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
				    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_DE_OBSERVACION").css("color","#6fa1d4");
				    	$("#INFO_PANEL_2_P_TF_INSPE_CAIN_DE_OBSERVACION").css("cursor","pointer");
						$("#INFO_PANEL_2_P_TF_INSPE_CAIN_DE_OBSERVACION").click(function(e){
				    		 e.preventDefault();
				    	        e.stopImmediatePropagation();
				    	        abrirModalObservacionInspeccionHome();
				    	});
						$("#observacionInspeccion").html('<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_DE_OBSERVACION'])));
				    	$("#DATO_HEADER_OBSERVACION_INSPECCION").html('Inspecci&oacute;n #'+inspec);
			    	}
			    	
			    	
			    	
					
			    	//PopUp Observacion Revision
			    	if(json[valor]['P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN'] != ""){
			    		document.getElementById("INFO_P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN").innerHTML = '<b>'+primeraLetraMayus(json[valor]['P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN']).substr(0, 30) + '...'+'<i class="material-icons" style="display:inline:color:#6fa1d4;font-size:14px;cursor:pointer;">arrow_drop_up</i>'+'</b>';
				    	$("#INFO_P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN").css("color","#6fa1d4");
				    	$("#INFO_P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN").css("cursor","pointer");
						$("#INFO_P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN").click(function(e){
				    		 e.preventDefault();
				    	        e.stopImmediatePropagation();
				    	        abrirModalObservacionRevisionInspeccionHome();
				    	});
						$("#observacionRevisionInspeccion").html('<b>'+primeraLetraMayus(validarCampoVacio(json[valor]['P_TF_INSPE_CAIN_DE_OBS_REV_ADMIN'])));
				    	$("#DATO_HEADER_OBSERVACION_REVISION_INSPECCION").html('Observaci&oacute;n Revisi&oacute;n - Inspecci&oacute;n #'+inspec);
			    	}
			    	
					$("#DATO_CABECERA").html("Inspecci&oacute;n #" + inspec);
					
					//muestra panel D setea img y titulo
					
					$('#panelb').hide();
					$('#panela').show();
					$('#panelDetalleInspec').show();
					
					$(".seleccionPanelB").each(function(){
						$(this).css("background","white");
					});
					$('#'+obj+numeroCard).css("background","#bac2bb");
					
					$('#labelPanelInspeccion').html("Detalle Inspecci&oacute;n #"+inspec+"");
					
					var producto = document.getElementById("valorProducto").value;
					//panel C
			    	mostrarDatosParametricosInspeccion(poliza, ramo, inspec, producto, consecutivo);
					
	    		}
	    	catch (e)
	    	{
	    		mostrarError('Se produjo un inconveniente al mostrar el detalle de inspeccion:'+e);
	    	}
	    	
	    	
	    	$.unblockUI();
	    	    	
	    },
	    	
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    }
	    
	 
	   
	});
	


}

function mostrarDatosParametricosInspeccion(poliza, ramo, nroInspeccion, producto, consecutivo){
	
	
	$.ajax({
	    url : 'datosParametricosInspec',
	    contentType: 'application/json', 
	    data : { poliza : poliza, ramo:ramo,  nroInspeccion: nroInspeccion , producto: producto},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosParametricosInspec");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '<div style="height:150px;overflow-y:auto;"><table  style= "width:100%;">';
    	    	for ( var int = 0; int < json.length; int++) {
    	    		panelNuevo = panelNuevo + '<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_DATOS_INB_DSP_LABEL'])) + ':</td><td style="padding-top:5px;width:60%;"><h6><b>';
    	    		if(json[int]['P_TF_DATOS_CADN_DATO']=="" || json[int]['P_TF_DATOS_CADN_DE_DATO']=="" ){
    	    			panelNuevo = panelNuevo + validarCampoVacio(json[int]['P_TF_DATOS_CADN_DATO']);
    	    		}
    	    		else{
        	    		panelNuevo = panelNuevo + validarCampoVacioInspecciones(json[int]['P_TF_DATOS_CADN_DATO']);
        	    		panelNuevo = panelNuevo + primeraLetraMayus(json[int]['P_TF_DATOS_CADN_DE_DATO']);

    	    		}	
    	    		panelNuevo = panelNuevo + '.</b></h6></td></tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</div>';

	    	}
	    	catch(e)
	    	{
	    		mostrarError('Se produjo un inconveniente al mostrar los datos parametricos de inspeccion : '+e);
	    	}
	    	
	    	
	    	
    	    },
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	    	mostrarError(xhr['responseText']);

    	       },
    	   
    	   });
	
}

function buscarFiltroResultadoInspeccion(idTablaParametricos){
	
	input = document.getElementById("inputBusquedaResultadoInspeccion");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function redirectZambaInspeccion(){
	
	var inspeccion = document.getElementById("inspeccionValor").value;
	
	var url = 'http://imageapp/zamba.web/globalsearch/search/search.html?User=3&attr=102&types=17&search='+ inspeccion +'#Zamba/';
	
	bloquearPantallaGris();
	window.open(url);
	$.unblockUI();

}

function redirectZambaInspeccionNid(parametro){
	
	
	var url = 'http://imageapp/zamba.web/globalsearch/search/search.html?User=3&attr=7&types=17&search='+ parametro +'#Zamba/';

	bloquearPantallaGris();
	window.open(url);
	$.unblockUI();

}

function verVisitasInspeccion(){
	
	var inspeccion = document.getElementById("valorInspeccion").value;
	bloquearPantallaGris();
	
	$.ajax({
	    url : 'datosVisitasInspeccion',
	    contentType: 'application/json', 
	    data : {inspeccion: inspeccion},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$.unblockUI();
		    	
		    	var d1 = document.getElementById("datosVisitasInspeccion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';

    	    		for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-visitasInspeccion" role="cell"><h6>'+validarCampoVacio((json[int]['P_TF_VISITAS_CADV_CAUS_CD_USUARIO']))+'</h6></td>'+
    	    		'<td class="td-grilla-visitasInspeccion" role="cell"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_VISITAS_CADV_DE_DATO']))+'</h6></td>'+
    	    		'<td class="td-grilla-visitasInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VISITAS_CADV_CAIN_FE_VISITA'])+'</h6></td>'+
    	    		'<td class="td-grilla-visitasInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VISITAS_INB_HORA'])+'</h6></td>'+
    	    		'</tr>';
    	    		}
    	    		d1.innerHTML = panelNuevo;
    	    		
        	    	$("#DATO_VISITAS_INSPECCION").html("Visitas de la Inspecci&oacute;n <b>#"+inspeccion+"</b>");

		    	
		    	//Abre el modal
				$("#visitasInspeccionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
				});

	    	}
	    	catch(e)
	    	{	    	$.unblockUI();

	    		mostrarError('Se genero un inconveniente al cargar los datos de visitas de inspeccion');
	    	}
	
	$.unblockUI();

	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
    		mostrarError('No existe visitas para la inspeccion');

	       },
	   
	   });
	
	
}


function descargarDocumentoInspecciones(){
	bloquearPantallaGris();
	$('.row-select input').each(function() {   
	      var condicion = $(this).is(":checked");
	      if (condicion) {
	    	  try {
				
	    	  nombre = $(this).attr("id");
	    	  var orden= $("#orden"+nombre).text();
	    	  var tipo= $("#tipo"+nombre).text();
	    	  var inspeccion = document.getElementById("valorInspeccion").value;
	    	  
	    	  location.href = "/PSPES/existeArchivoInspecciones?tipo="+tipo+"&orden="+orden+"&inspeccion="+inspeccion;
	    	  
	    	  var mensajeAlerta = 'Se descargo el documento correctamente';
		  	  mostrarMensajeBoletaDePago(mensajeAlerta, 'alert-success');
	    	  
		       	$.unblockUI();

	    	  } catch (e) {
	    		  // TODO: handle exception
	    	  }
	    	  
	      }
	      else{
		       	$.unblockUI();
			var mensajeAlerta = 'Seleccione un documento para iniciar la descarga';
	  		mostrarMensajeBoletaDePago(mensajeAlerta, 'alert-warning');
	      }
	});
	
	
   	$.unblockUI();

	
}

	
function verDocumentosInspeccion(){
	var inspeccion = document.getElementById("valorInspeccion").value;
	bloquearPantallaGris();
	
	$.ajax({
	    url : 'datosDocumentosInspeccion',
	    contentType: 'application/json', 
	    data : {inspeccion: inspeccion},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$.unblockUI();
		    	
		    	var d1 = document.getElementById("datosDocumentosInspeccion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    		
    	    		for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla row-select" id="fila'+int+'">'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="orden'+int+'">'+validarCampoVacio(json[int]['P_TF_DOCUMENTO_CAZZ_NU_DOCUMENTO'])+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="tipo'+int+'">'+validarCampoVacio(json[int]['P_TF_DOCUMENTO_CAZZ_TP_EXTENSION'])+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="desc'+int+'">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_DOCUMENTO_CAZZ_DE_DOCUMENTO']))+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="dueno'+int+'">'+validarCampoVacio(json[int]['P_TF_DOCUMENTO_CAZZ_CAUS_CD_USUARIO'])+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><h6 id="fecha'+int+'">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_DOCUMENTO_CAZZ_FE_ACTUALIZACION']))+'</h6></td>'+
    	    		'<td class="td-grilla-documentosInspeccion" role="cell"><input id="'+int+'"  type="radio" name="gender" style="cursor:pointer;" value="'+int+'" /></td>'+

    	    		'</tr>';
    	    		}
    	    		d1.innerHTML = panelNuevo;

    	    		
        	    	$("#DATO_DOCUMENTOS_INSPECCION").html("Documentos de la Inspecci&oacute;n <b>#"+inspeccion+"</b>");

		    	
		    	//Abre el modal
				$("#documentosInspeccionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
				});
				

	    	}
	    	catch(e)
	    	{	    	$.unblockUI();

	    		mostrarError('Se genero un inconveniente al cargar los datos de documentos de la inspeccion');
	    	}
	
	$.unblockUI();

	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
    		mostrarError('No existe documentos para la inspeccion');

	       },
	   
	   });
}

function verResultadoInspeccion(){
	
	var inspeccion = document.getElementById("valorInspeccion").value;
	var ramo = document.getElementById("inspeccionRamoValor").value;
	var producto = document.getElementById("valorProducto").value;
	var sucursal = document.getElementById("valorSucursal").value;

	bloquearPantallaGris();
	
	$.ajax({
	    url : 'datosResultadoInspeccion',
	    contentType: 'application/json', 
	    data : {ramo:ramo,  inspeccion: inspeccion , producto:producto, sucursal: sucursal, tipo: 'r'},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$.unblockUI();
		    	
		    	var d1 = document.getElementById("datosResultadosInspeccion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    		
    	    		for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_RESULTADOS_INB_DATO'])) +'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_DE_DATO']) +'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_PO_VALUACION'])+'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_MT_VALUACION'])+'</h6></td>'+

    	    		'</tr>';
    	    		}
    	    		d1.innerHTML = panelNuevo;

    	    		
        	    	$("#DATO_RESULTADOS_INSPECCION").html("Resultados de la Inspecci&oacute;n <b>#"+inspeccion+"</b>");

		    	
		    	//Abre el modal
				$("#resultadosInspeccionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
				});
				

	    	}
	    	catch(e)
	    	{	    	$.unblockUI();

	    		mostrarError('Se genero un inconveniente al cargar los datos de resultados de la inspeccion');
	    	}
	
	$.unblockUI();

	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
    		mostrarError('No existe resultados para la inspeccion');

	       },
	   
	   });
}

function verCartaDaniosInspeccion(){

	
	var inspeccion = document.getElementById("valorInspeccion").value;
	var ramo = document.getElementById("inspeccionRamoValor").value;
	var producto = document.getElementById("valorProducto").value;
	var sucursal = document.getElementById("valorSucursal").value;

	bloquearPantallaGris();
	
	$.ajax({
	    url : 'datosResultadoInspeccion',
	    contentType: 'application/json', 
	    data : {ramo:ramo,  inspeccion: inspeccion , producto:producto, sucursal: sucursal, tipo: 'c'},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    	$.unblockUI();
		    	
		    	var d1 = document.getElementById("datosCartaDaniosInspeccion");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    		
    	    		for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_RESULTADOS_INB_DATO'])) +'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_DE_DATO']) +'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_PO_VALUACION'])+'</h6></td>'+
    	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_MT_VALUACION'])+'</h6></td>'+

    	    		'</tr>';
    	    		}
    	    		d1.innerHTML = panelNuevo;

    	    		
        	    	$("#DATO_CARTA_DANIOS_INSPECCION").html("Cartas de danios de la Inspeccion <b>#"+inspeccion+"</b>");

		    	
		    	//Abre el modal
				$("#cartaDaniosInspeccionPopUp").modal({
					 escapeClose: false,
					  clickClose: false,
					  showClose: false,
					  fadeDuration: 400,
					  fadeDelay: 0.05
				});
				

	    	}
	    	catch(e)
	    	{	    	$.unblockUI();

	    		mostrarError('Se genero un inconveniente al cargar los da&ntilde;os de la inspeccion');
	    	}
	
	$.unblockUI();

	    },
	    error: function (request, status, error) {
	    	$.unblockUI();
    		mostrarError('No existe daños para la inspeccion');

	       },
	   
	   });

}

function verAccesoriosInspeccion(){
	var inspeccion = document.getElementById("valorInspeccion").value;
	var ramo = document.getElementById("inspeccionRamoValor").value;
	var producto = document.getElementById("valorProducto").value;
	var sucursal = document.getElementById("valorSucursal").value;

bloquearPantallaGris();

$.ajax({
    url : 'datosResultadoInspeccion',
    contentType: 'application/json', 
    data : {ramo:ramo,  inspeccion: inspeccion , producto:producto, sucursal: sucursal, tipo: 'a'},
    type : 'GET',
    dataType : 'json',
    success : function(json) {
    	try{
	    	$.unblockUI();
	    	
	    	var d1 = document.getElementById("datosAccesoriosInspeccion");
	    	d1.innerHTML = ' ';
	    	var panelNuevo = '';
	    		
	    		for ( var int = 0; int < json.length ; int++) {
	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_RESULTADOS_INB_DATO'])) +'</h6></td>'+
	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+ validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_DE_DATO']) +'</h6></td>'+
	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_PO_VALUACION'])+'</h6></td>'+
	    		'<td class="td-grilla-resultadosInspeccion" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_RESULTADOS_CADR_MT_VALUACION'])+'</h6></td>'+

	    		'</tr>';
	    		}
	    		d1.innerHTML = panelNuevo;

	    		
    	    	$("#DATO_ACCESORIOS_INSPECCION").html("Accesorios de la Inspeccion <b>#"+inspeccion+"</b>");

	    	
	    	//Abre el modal
			$("#accesoriosInspeccionPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
			});
			

    	}
    	catch(e)
    	{	    	$.unblockUI();

    		mostrarError('Se genero un inconveniente al cargar los accesorios de la inspeccion');
    	}

$.unblockUI();

    },
    error: function (request, status, error) {
    	$.unblockUI();
		mostrarError('No existe accesorios para la inspeccion');

       },
   
   });
}

function abrirModalObservacionInspeccionHome(){
	
	bloquearPantallaGris();
	
	//Abre el modal
	$("#observacionInspeccionPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
	});
	
	$.unblockUI();

}

function abrirModalObservacionRevisionInspeccionHome(){
bloquearPantallaGris();
	
	//Abre el modal
	$("#observacionRevisionInspeccionPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
	});
	
	$.unblockUI();
}

function irInspeccionesExpertoHome(poliza, ramo, sucursal, inspeccion){
	/*
	var poliza= document.getElementById("valorPoliza").value;
	var ramo= document.getElementById("valorRamo").value;
	var sucursal = document.getElementById("valorSucursal").value;
	*/
	bloquearPantallaGris();
	$.ajax({
	    url : 'existeInspecciones',
	    contentType: 'application/json', 
	    
	    data : {poliza :poliza, ramo: ramo, sucursal: sucursal, inspeccion: inspeccion} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		location.href="/PSPES/homeInspecciones?poliza="+poliza+"&ramo="+ramo+"&sucursal="+sucursal+"&inspeccion="+inspeccion;
				
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




function descargarDocumentoInspeccion(){
	
	var nroSecuencia = document.getElementById("valorNroSecuencia").value;
	var valorPoliza=document.getElementById("valorPolizaImpresion").value;
	
	
	
}

