function buscadorPanelModalNotasJuicio() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaSiniestroModalJuicio");
	  filter = input.value.toUpperCase();
	
	  $(".datoJuicioModalNotas").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("notasModalJuiciosFiltro", "panelModalSiniestroNotasJuicio");
		  var idCardParteB = idH6.replace("notasModalJuiciosFiltro", "panelModalSiniestroNotasJuicio");
		  
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





function buscadorPanelCEntidadJuicio() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaJuicio");
	  filter = input.value.toUpperCase();
	
	  $(".datoJuicio").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoSentencia", "micaruB");
		  var idCardParteB = idH6.replace("datoSentencia", "nroSentencia");
		  
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




function inicioJuicioHome() {
	bloquearPantallaGris();
	activarCaru();
	$( "#timeLineItemJuicio1" ).trigger( "click" );
	
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
	
	})
	$.unblockUI();
}

function mostrarJuiciosHome(obj,num,icono,juicio,ramo){

	bloquearPantallaGris();
	$("#juicioValor").val(juicio);
	$.ajax({
	    url : 'datosDetalleJuicio',
	    contentType: 'application/json', 
	    data : {juicio:juicio} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	$("#ordenValor").val(json[0]['P_TF_DETALLE_RAJ_INB_NU_TERCERO']);
	    	llenarDinamicamente(json[0]);
	    	//panel D sin expandir
			$("#DATO_P_TF_DETALLE_RAJ_POLIZA").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SISJ_SISI_NU_ANNIO']) +" - "+json[0]['P_TF_DETALLE_RAJ_SIJU_CARP_CD_RAMO'] + " - "+ json[0]['P_TF_DETALLE_RAJ_POLIZA']+ "</b>");
			$("#DATO_P_TF_DETALLE_FECHA_VIGENCIA").html("<b> " + validarCampoVacio(formatearFechaJson(json[0]['P_TF_DETALLE_RAJ_FE_VIG_DESDE'])) +" - "+validarCampoVacio(formatearFechaJson(json[0]['P_TF_DETALLE_RAJ_FE_VIG_HASTA']))+ "</b>");
			$("#DATO_P_TF_DETALLE_SUB_SINIESTRO").html("<b> " + json[0]['P_TF_DETALLE_RAJ_SUBSINIESTRO'] +" - "+json[0]['P_TF_DETALLE_RAJ_SINIESTRO']+ "</b>");
			$("#DATO_P_TF_DETALLE_FUERO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SIJU_SIJF_CD_FUERO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_FUERO']))+ "</b>");
			$("#DATO_P_TF_DETALLE_ESTUDIO_CARGO").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_SIEC_CD_ESTUDIO'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_ESTUDIO']))+ "</b>");
			$("#DATO_P_TF_DETALLE_ESTUDIO_ORIGEN").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_SIEC_CD_ESTUDIO_ORIG'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_ESTUDIO_ORIG']))+ "</b>");
			$("#DATO_P_TF_DETALLE_ACTUACION").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_TP_ACTUACION'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_TIPO_ACT_JUDICIAL']))+ "</b>");
			$("#DATO_P_TF_DETALLE_HECHO_GEN").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_INB_CD_HECHO_GENERADOR'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DESC_COB']))+ "</b>");
			$("#DATO_TERCERO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_INB_NU_TERCERO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DESC_TERCERO']))+ "</b>");
			$("#DATO_PANEL_B_TERCERO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_INB_NU_TERCERO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DESC_TERCERO']))+ "</b>");

			

			
			//panel D expandido
	
			$("#DATO_PANEL_B_P_TF_DETALLE_RAJ_POLIZA").html("<b> " + json[0]['P_TF_DETALLE_RAJ_SISJ_SISI_NU_ANNIO'] +" - "+json[0]['P_TF_DETALLE_RAJ_SIJU_CARP_CD_RAMO'] + " - "+ json[0]['P_TF_DETALLE_RAJ_POLIZA']+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_FECHA_VIGENCIA").html("<b> " + validarCampoVacio(formatearFechaJson(json[0]['P_TF_DETALLE_RAJ_FE_VIG_DESDE'])) +" - "+validarCampoVacio(formatearFechaJson(json[0]['P_TF_DETALLE_RAJ_FE_VIG_HASTA']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_SUB_SINIESTRO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SUBSINIESTRO']) +" - "+validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SINIESTRO'])+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_FUERO").html("<b> " + validarCampoVacio(json[0]['P_TF_DETALLE_RAJ_SIJU_SIJF_CD_FUERO']) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_FUERO']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_ESTUDIO_CARGO").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_SIEC_CD_ESTUDIO'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_ESTUDIO']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_ESTUDIO_ORIGEN").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_SIEC_CD_ESTUDIO_ORIG'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_ESTUDIO_ORIG']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_ACTUACION").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_SIJU_TP_ACTUACION'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DSP_TIPO_ACT_JUDICIAL']))+ "</b>");
			$("#DATO_PANEL_B_P_TF_DETALLE_HECHO_GEN").html("<b> " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_INB_CD_HECHO_GENERADOR'])) +" - "+validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DETALLE_RAJ_DESC_COB']))+ "</b>");

			
			
			
	//muestra el panel D
		$('#panelb').hide();
		$('#panela').show();
		$('#panelDetalleJuicio').show();
		$('#verMasPanelA').text('Ver mas');

		
		
		$(".seleccionPanelB").each(function(){
	 	    $(this).css("background","white");
	 	});
		$('#'+obj+num).css("background","#bac2bb");
		
		$('#labelPanelDetalleJuicio').html("Juicio RAJ #"+ juicio);
		
		var d1 = document.getElementById("panelImagenJuicio");
		d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
    	}
    catch(e){
    	mostrarError('Error (5467) generado por : '+e);
    	}
  //ARRANCA EL PANEL C JSON
	
	$.ajax({
	    url : 'datosSentenciasJuicio',
	    contentType: 'application/json', 
	    data : { juicio : juicio, ramo : ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function (json) {
	    	try {
				
	    		$('#cantidadSentencias').text("Transacciones / Sentencias (" + json.length + ")");	    	    	
    	    	$('#cantidadSentencias').parent().next().find('i:first').remove();
    	    	$('#cantidadSentencias').parent().next().append('<i class="material-icons altoIcono"  style="color:#271765;padding-top:15px;" >&#xE02f;</i>');
    	    	$("#caruMayor").attr("style","text-align:left;padding-left:30px;padding-right:30px;width:100%");
    	    	var d1 = document.getElementById("caruMayor");
    	    	d1.innerHTML = ' ';
    	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px">';
    	    	  
    	    	for ( var int = 0; int < json.length; int++) {
    	    	
    	    		var num=int+1;
    	    		var popUp= "'inspeccionesPopUp'";
    	    		var nroInsp= 'nroSentencia'+num;
    	    		var DatoInsp= 'datoSentencia'+num;
    	    		

    	    		
               		
    	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'" onClick="abrirPopUpSentenciasJuiciosHome('+juicio+','+ramo+','+int+');" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#271765; border-style: solid; box-shadow: 0 0 0px black;">'
    	    		+'<h6 id='+nroInsp+' style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#271765;color:#ffffff;">Orden #'+json[int]['P_TF_SENTENCIA_SISE_NU_ORDEN']+' </h6>'
    	    		+'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoJuicio"><b>'+formatearFechaJson(json[int]['P_TF_SENTENCIA_SISE_FE_SENTENCIA_ORIG'])+'</b></h6>' 
    	    		+'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoJuicio">Monto : <b>'+json[int]['P_TF_SENTENCIA_SISE_MTO_SENTENCIA_ORIG']+'</b></h6>' 
    	    		+'<h6 style="margin-top:2%;" id='+DatoInsp+' class="datoJuicio"><b>'+primeraLetraMayus(json[int]['P_TF_SENTENCIA_DSP_CD_SENTENCIA'])+'</b></h6><br></div>';
	    	    	    	    	 	    	
    	    	}
    	    	d1.innerHTML = caruNuevo ;  
	    	
    	    	activarCaru();
    	    	} catch (e) {
    	    		mostrarError('Disculpe, existio un problema codigo:11113',e);	     
    	    	}	        	    	
    	    	$.unblockUI();
    	    },
    		 
    	    error: function (request, status, error) {
    	    	$.unblockUI();
    	    	$('#cantidadSentencias').text("Transacciones / Sentencias");	    	    	
    	    	$('#cantSiniestros').parent().next().find('i:first').remove();
    	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;width:100%;");
    	        document.getElementById("micaru").innerHTML = request.responseText; 
    	    	
    	       },
    	   
    	   });
	    	
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    }
	});
}



function abrirPopUpSentenciasJuiciosHome(juicio,ramo,numeroCard){
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosSentenciasJuicio',
	    contentType: 'application/json', 
	    data : { juicio : juicio, ramo : ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[numeroCard]);

			$("#DATO_SENTENCIA").html("<b>Orden #" + json[numeroCard]['P_TF_SENTENCIA_SISE_NU_ORDEN']+"</b>" );
			$("#DATO_SINIESTRO").html("<b>" + json[numeroCard]['P_TF_SENTENCIA_SISE_SISI_NU_ANNIO']+" - " + json[numeroCard]['P_TF_SENTENCIA_SISE_SISI_CD_RAMO']+" - " + json[numeroCard]['P_TF_SENTENCIA_SISE_SISI_NU_SINIESTRO']+"</b>" );

			//Abre el modal
			$("#sentenciasPopUp").modal({
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





function abrirModalNotasJuicio(){
	
	var valorJuicio=document.getElementById("juicioValor").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosNotasModalJuicio',
	    contentType: 'application/json', 
	    data : { juicio : valorJuicio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	
			$("#DATOS_MODAL").html("Notas Del Juicio RAJ #<b>" + valorJuicio + "</b>");
	    	var d1 = document.getElementById("datosModalJuicio");
	    	d1.innerHTML = ' ';
    		
	    	var panelNuevo = '<div style="height:300px;overflow-y:auto;"><table  style= "width:100%;">';
	    	for ( var int = 0; int < json.length; int++) {
	    		
	    		panelNuevo = panelNuevo + '<div class="timeline__post seleccionPanelB" style="width:99%;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:12px">' +
	    								  '<div class="timeline__content" id="panelModalSiniestroNotasJuicio'+int+'" style="overflow:hidden;">'+
	    								  '<h6 class="datoJuicioModalNotas" id="notasModalJuiciosFiltro'+int+'">'+formatearFechaJson(json[int]['P_TF_NOTA_SIJN_FE_NOTA'])+' -- '+ primeraLetraMayus(json[int]['P_TF_NOTA_SIJN_CD_USUARIO']) +'</h6><h6 class="datoSiniestroModal" id="notasModalJuiciosFiltro'+int+'"><b>'+primeraLetraMayus(json[int]['P_TF_NOTA_SIJN_DESC_NOTA'])+'.</b></h6></div></div>';
	    	}
	    	d1.innerHTML = panelNuevo;  
			//Abre el modal
			$("#notasPopUp").modal({
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
		        alert('No posee notas',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};



function abrirModalDatosModificacionesJuicio(){
	
	var valorJuicio=document.getElementById("juicioValor").value;
	var valorOrden=document.getElementById("ordenValor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosParametricosJuicio',
	    contentType: 'application/json', 
	    data : { juicio : valorJuicio, orden : valorOrden},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosModificacionesJuicio");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '<div class="row" id="datosModificacionesJuicio">';
    	    	
    	    	for ( var int = 0; int < json.length; int++) {
    	    		panelNuevo = panelNuevo +'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px"><table  style= "width:100%;">'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Mediaci&oacute;n :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_SIJH_SIJH_SIJU_MEDIACION']) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Est. Deman. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_SIJH_SIJH_SIJU_ESTADO_DEMANDA']) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Monto Deman. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_SIJH_SIJH_SIJU_MTO_DEMANDA_ORIG'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fecha. Estado :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+(formatearFechaJson(json[int]['P_TF_SIJH_SIJH_SIJU_FE_ESTADO_DEMANDA'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Cod. Riesgo :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio((json[int]['P_TF_SIJH_SIJH_SIJU_SIRJ_CD_RIESGO'])) +'</b></h6></td></tr></table></div>'+
    	    		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px"><table  style= "width:100%;">'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Usuario :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_SIJH_SIJH_CAUS_CD_USUARIO'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fecha Act. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_SIJH_SIJH_FE_ACTUALIZACION'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Estudio :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_SIJH_SIJH_SIEC_CD_ESTUDIO'])) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_SIJH_DESC_ESTUDIO'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fe. Efectiva. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_SIJH_SIJH_FE_EFECTIVA'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Fe. Baja :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_SIJH_SIJH_SIJU_FE_BAJA'])) +'</b></h6></td></tr>'+
    	    		'<tr><td align="right"  valign="top" style="padding-top:5px;" ><h6>Cod. Baja :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_SIJH_SIJH_SIJU_CD_MOTIVO_BAJA']) +'</b></h6></td></tr></table></div>'+
					'<hr style="margin-top:5px;margin-bottom:5px;width:100%;">';
    	    	}
    	    	d1.innerHTML = panelNuevo
    	    	$("#DATO_MODIFICACIONES").html("Modificaciones Juicio<b> #" + valorJuicio +"</b>");

			//Abre el modal
			$("#datosModificacionesJuicioPopUp").modal({
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





function abrirModalEmbargosJuicio(){
	
	var valorJuicio=document.getElementById("juicioValor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosEmbargos',
	    contentType: 'application/json', 
	    data : { juicio : valorJuicio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		llenarDinamicamente(json[0]);
				$("#DATOS_MODAL_EMBARGOS").html("Embargo #<b>" + json[0]['P_TF_DEJU_DEJU_NU_EMBARGO'] +"</b> del juicio <b>#"+valorJuicio+"</b>");
				$("#DATO_BANCO").html("<b>" + validarCampoVacio(json[0]['P_TF_DEJU_DEJU_CABA_CD_BANCO'])+" - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DEJU_DE_BANCO']))+"</b>" );
				$("#DATO_DETALLE").html("<b>" + validarCampoVacio(json[0]['P_TF_DEJU_DEJU_TP_DETALLE'])+" - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_DEJU_DE_TP_DETALLE']))+"</b>" );
				$("#DATO_MONTO").html("<b>$" + validarCampoVacio(json[0]['P_TF_DEJU_DEJU_MT_OPE_EMBARGO']) +"</b>");
				$("#DATO_CUENTA").html("<b>" + validarCampoVacio(json[0]['P_TF_DEJU_DEJU_CJCB_NU_CUENTA']) +"</b>");
				
				
				
				
			//Abre el modal
			$("#embargosJuicioPopUp").modal({
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





function abrirModalDatosParametricosJuicio(){
	
	var valorJuicio=document.getElementById("juicioValor").value;
	
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosParametricos',
	    contentType: 'application/json', 
	    data : { juicio : valorJuicio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosParametricosJuicio");
    	    	d1.innerHTML = ' ';
	    		
    	    	var panelNuevo = '<div style="height:150px;overflow-y:auto;"><table  style= "width:100%;">';
    	    	for ( var int = 0; int < json.length; int++) {
    	    		panelNuevo = panelNuevo + '<tr><td align="right"  valign="top" style="width:47%;padding-top:5px;"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_DETALLE_SIJD_DESC_DATO'])) +' : </td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_DETALLE_SIJD_SIJD_CRPD_DATO']))+'.</b></h6></td></tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</div>';  
				
    	    	
    	    	$("#DATOS_MODAL_PARAMAMETRICOS").html("Datos Param. Juicio RAJ #<b>" + valorJuicio + "</b>");
    			    	
			//Abre el modal
			$("#datosParametricosJuicioPopUp").modal({
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
		        alert('No posee datos parametricos',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
	

};


