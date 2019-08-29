function buscadorPanelCEntidadSiniestro() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaSiniestro");
	  filter = input.value.toUpperCase();
	
	  $(".datoInspeccionesSiniestro").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("inspecSiniestro", "micaruB");
		  var idEncabezado = idH6.replace("inspecSiniestro", "nroInspec");
		
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



function buscadorPanelModalNotas() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaSiniestroModal");
	  filter = input.value.toUpperCase();
	
	  $(".datoSiniestroModal").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("notasModalSiniestro", "panelModalSiniestroNotas");
		  var idCardParteB = idH6.replace("notasModalSiniestro", "panelModalSiniestroNotas");
		  
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



function mostrarSiniestroHome(obj,num,icono,siniestro,ramo,annio,tercero){	
	bloquearPantallaGris();

	$("#labelPanelSiniestro").val(tercero);
	if(tercero == 0){
		$('#btnDetalleTercero').hide();
		}
	else{
		$('#btnDetalleTercero').show();

	}

	$.ajax({
	    url : 'datosParametricosSiniestro',
	    contentType: 'application/json', 
	    data : { siniestro : siniestro, annio:annio, ramo : ramo , subSiniestro:tercero},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosParametricosSiniestro");
    	    	d1.innerHTML = ' ';
	    		
    	    	var panelNuevo = '<div style="height:150px;overflow-y:auto;"><table id="tablaParametricosSiniestro" style= "width:100%;">';
    	    	for ( var int = 0; int < json.length; int++) {
    	    		panelNuevo = panelNuevo + '<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>'+ validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_INB_DSP_LABEL_DATOS'])) +' : </td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_SIDD_CRPD_DATO'])) +'</b> - <b>'+ primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_INB_DSP_DSC_DATO'])+'.</b></h6></td></tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</div>';  

			$('#panelb').hide();
			$('#panela').show();
			$('#panelSubSiniestro').show();
			
			$(".seleccionPanelB").each(function(){
		 	    $(this).css("background","white");
		 	});
			$('#'+obj+num).css("background","#bac2bb");
			
			$('#labelPanelSiniestro').html("Sub Siniestro #"+ annio +" - "+ ramo + " - "+siniestro);
			
			var d1 = document.getElementById("panelPrueba");
			d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
	    	}
	    	catch(e)
	    	{
	    		alert('Error (444999494) generado por : '+e);
	    	}
	    	//ARRANCA EL PANEL C JSON
			
	    	$.ajax({
	    	    url : 'datosInspecciones',
	    	    contentType: 'application/json', 
	    	    data : { siniestro : siniestro, annio:annio, ramo : ramo , subSiniestro:tercero},
	    	    type : 'GET',
	    	    dataType : 'json',
	    	    success : function (json) {
	    	    	try {
	        	    	
	    	    		$('#cantInspecciones').text("Inspecciones (" + json.length+")");	    	    	
	    	    		$('#iconoInspeccionesSiniestro').addClass("material-icons altoIcono");
	        	    	$('#iconoInspeccionesSiniestro').css('color','#271765');
	        	    	$('#iconoInspeccionesSiniestro').css('padding-top','15px');
	    	    		$('#iconoInspeccionesSiniestro').html("&#xE02f;");
	    	    		
	    	    		$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;");
	        	    	var d1 = document.getElementById("caruMayor");
	        	    	d1.innerHTML = ' ';
	        	    	var caruNuevo = '<div id="micaru" class="owl-carousel owl-theme" style="text-align:center; padding-left:25px;">';
	        	    	  
	        	    	for ( var int = 0; int < json.length; int++) {
	        	    	
	        	    		var num=int+1;
	        	    		var popUp= "'inspeccionesPopUp'";
	        	    		var nroInsp= 'nroInspec'+num;
	        	    		var DatoInsp= 'inspecSiniestro'+num;
	        	    		
	        	    		caruNuevo = caruNuevo + '<div id="micaruB'+num+'" onClick="abrirPopUpInspeccionesSiniestrosHome('+tercero+',1,'+num+');" class="item" style="height:105px; cursor:pointer; background:#efeeee;border-radius: 3px; border-width: 1px; border-color:#271765; border-style: solid; box-shadow: 0 0 0px black;">'+
							'<h6 id="nroInspec'+int+'" style="height:25px;border-bottom:1px solid; padding-top:4%;padding-bottom:4%;background-color:#271765;color:#ffffff;">#'+json[int]['P_TF_LISTA_IMPR_SIID_NU_INSPECCION']+'</b></h6>'+
							'<h6 style="margin-top:2%;" id="'+DatoInsp+'"  class="datoInspeccionesSiniestro">Denuncia : <b>'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_IMPR_SIID_FE_DENUNCIA']))+'</b></h6>'+
							'<h6 style="margin-top:2%;"  id="'+DatoInsp+'" class="datoInspeccionesSiniestro">Presupuesto : <b>'+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SIID_MT_PRESUPUESTO'])+'</b></h6>'+
							'<h6 style="margin-top:2%;"  id="'+DatoInsp+'" class="datoInspeccionesSiniestro">Pagado : '+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SIID_IN_PAGADO'])+'</b></h6>'+
							'<h6 style="margin-top:2%;" id="'+DatoInsp+'"  class="datoInspeccionesSiniestro">Tercero :<b>'+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SIID_SITC_NU_TERCERO'])+'</b></h6></div>';
							
	        	    	}
	        	    	d1.innerHTML = caruNuevo +'</div>';  
	    	    	
	        	    	activarCaru();
	        	    	} catch (e) {
	        	    		mostrarError('Disculpe, existio un problema codigo:11113',e);	     
	        	    	}	        	    	
	        	    	$.unblockUI();
	        	    },
	        		 

	        	    // codigo a ejecutar si la peticion falla;
	        	    // son pasados como argumentos a la funcion
	        	    // el objeto de la peticion en crudo y codigo de estatus de la peticion
	        	    error: function (request, status, error) {
	        	    	$.unblockUI();
	        	    	$('#cantInspecciones').text("Inspecciones (0)");	    	    	
	        	    	$('#cantSiniestros').text("sub siniestros");
	        	    	
	        	    	$('#iconoInspeccionesSiniestro').addClass("material-icons altoIcono");
	        	    	$('#iconoInspeccionesSiniestro').css('color','#39b3d7');
	        	    	$('#iconoInspeccionesSiniestro').css('padding-top','15px');
	    	    		$('#iconoInspeccionesSiniestro').html("&#xE611;");
	        	    	
	        	    	
	        	    	$("#caruMayor").attr("style","text-align: left;padding-left:30px;padding-right:30px;padding-top: 30px;padding-bottom: 30px;");
	        	        document.getElementById("micaru").innerHTML = request.responseText; 
	        	    	
	        	       },
	        	   
	        	   });
	    	    	
	    	    },
	    	    error : function(xhr, status) {
	    	    	$.unblockUI();
	    	    	mostrarError(xhr['responseText']);	    	    }
	    	});
	    }




function inicioSiniestroHome() {
	bloquearPantallaGris();
	activarCaru();
	
	shortcut.add("esc",function() {
		$( ".cerrarModalBotonHoover" ).trigger( "click" );
	})

	$.unblockUI();
}

function abrirPopUpInspeccionesSiniestrosHome(subSi,annio,numCard){

	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var varlorAnnio=document.getElementById("valorAnnioSiniestroHome").value;

	bloquearPantallaGris();
	$.ajax({
	    // la URL para la peticion
	    url : 'datosInspeccionesModal',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, annio:varlorAnnio, ramo : valorRamo, subSiniestro : subSi},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	numCard = numCard-1;
	    	llenarDinamicamente(json[numCard]);
			$("#DATO_INSPECCION").html("Inspeccion #<b>"+json[numCard]['P_TF_LISTA_IMPR_SIID_NU_INSPECCION']+"</b> del tercero <b>#"+subSi+"</b>");
			$("#DATO_CENTRO_INSPECCION").html("<b>" +validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_SIID_SCCI_CD_CENTRO']))+ " - "+validarCampoVacio(json[numCard]['P_TF_LISTA_IMPR_INB_DSP_CENTRO'])+"</b>");
	    	$("#DATO_CENTRO_TALLER").html("<b>" +validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_SIID_CD_TALLER']))+ " - "+validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_SIID_TALLER_MECANICO']))+"</b>");
	    	$("#DATO_MOTIVO_INSPEC").html("<b>" +validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_SIID_SMIN_CD_MOTIVO']))+ " - "+validarCampoVacio(json[numCard]['P_TF_LISTA_IMPR_INB_DESC_MOTIVO'])+"</b>");
	    	$("#DATO_ESTADO_INSPECCION").html("<b>" +validarCampoVacio(json[numCard]['P_TF_LISTA_IMPR_SIID_CD_RESULTADO'])+ " - "+validarCampoVacio(primeraLetraMayus(json[numCard]['P_TF_LISTA_IMPR_INB_DESC_RESULTADO']))+"</b>");
	    	
	    	
	    	
			//Abre el modal
			$("#inspeccionesPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
		        alert('Se produjo un inconveniente al cargar los datos de las inspecciones',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	

};


function abrirModalNotas(){
	
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosNotasModal',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, annio:annio, ramo : valorRamo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	
			$("#DATOS_MODAL").html("Notas Del Siniestro #<b>" + valorSiniestro + "</b>");
	    	var d1 = document.getElementById("datosModal");
	    	d1.innerHTML = ' ';
    		
	    	var panelNuevo = '<div style="height:300px;overflow-y:auto;"><table  style= "width:100%;">';
	    	for ( var int = 0; int < json.length; int++) {
	    		
	    		panelNuevo = panelNuevo + '<div class="timeline__post seleccionPanelB" style="width:99%;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:12px">' +
	    								  '<div class="timeline__content" id="panelModalSiniestroNotas'+int+'" style="overflow:hidden;">'+
	    								  '<h6 class="datoSiniestroModal" id="notasModalSiniestro'+int+'">'+formatearFechaJson(json[int]['P_TF_LISTA_IMPR_SINO_FE_NOTA'])+' -- '+ primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_SINO_CD_USUARIO']) +'</h6><h6 class="datoSiniestroModal" id="notasModalSiniestro'+int+'"><b>'+primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_SINO_SITS_DE_TIPO_NOTA']) +' - '+ primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_SINO_DESC_NOTA'])+'.</b></h6></div></div>';
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
	





function abrirModalDetalleSiniestro(siniestro,ramo,annio){
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosDetalleSiniestroHome',
	    contentType: 'application/json', 
	    data : { siniestro : siniestro, annio:annio, ramo : ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);	
	    	$("#DATO_SINIESTRO").html("Siniestro - <b>#" +json[0]['P_TF_LISTA_IMPR_SISI_NU_SINIESTRO']+ "</b>");
	    	$("#DATO_OCURRENCIA").html("<b>" +validarCampoVacio(formatearFechaJson(json[0]['P_TF_LISTA_IMPR_SISI_FE_OCURRENCIA']))+ " - " +validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_HORA_OCURRENCIA'])+ "</b>");
	    	$("#DATO_POLIZA").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_CARP_CD_RAMO'])+ " - " +validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_CAPO_NU_POLIZA'])+ " - " +validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_CACE_NU_CERTIFICADO'])+ "</b>");
	    	$("#DATO_PATENTE").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_PATENTE'])+"</b>");
	    	$("#DATO_RIESGO").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SISI_SITP_TIPO_SINIESTRO'])+" - "+primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_TIPO_SIN']))+"</b>");
	    	$("#DATO_COBERTURA").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_CD_PLAN'])+" - "+primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_IMPR_TERCEROS COMPLETOS']))+"</b>");
	    	$("#DATO_MODELO").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_CD_MODELO'])+" - "+primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_MODELO']))+"</b>");
	    	$("#DATO_ESTADO_SINIESTRO").html("<b>"+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_SITE_TIPO_ESTADO'])+" - "+primeraLetraMayus(validarCampoVacio(json[0]['P_TF_LISTA_IMPR_INB_SITE_DE_TIPO_ESTADO']))+"</b>");
			    
	    	
	    	$('#valorSiniestroHomeModal').val(json[0]['P_TF_LISTA_IMPR_SISI_NU_SINIESTRO']);
	    	$('#valorRamoSiniestroHomeModal').val(json[0]['P_TF_LISTA_IMPR_SISI_CARP_CD_RAMO']);

	    	
			//Abre el modal
			$("#siniestroPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		mostrarError('Error : 553453. Se produjo un inconveniente al cargar los datos del tercero',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
};
 	

function abrirModalOcurrencia(){
	

	//Abre el modal
	$("#ocurrenciaPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	}
	

function abrirModalDetalleTercero(){
	
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	var valorTercero=document.getElementById("labelPanelSiniestro").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosDetalleTercero',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, annio:annio, ramo : valorRamo, tercero : valorTercero},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);	
	    	$("#DATO_TERCERO").html("Detalle tercero<b> #" +json[0]['P_TF_LISTA_IMPR_SITC_NU_TERCERO']+ "</b>");
	    	$("#DATO_DOCUMENTO").html("<b>" +validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_IMPR_SITC_TP_DOCUMENTO'])+ " - "+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SITC_NU_DOCUMENTO']))+" </b>");
	    	$("#DATO_SINIESTRO").html("<b>" +validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_IMPR_SIID_SISI_NU_ANNIO'])+ " - "+validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SIID_CARP_CD_RAMO']))+" -" + validarCampoVacio(json[0]['P_TF_LISTA_IMPR_SIID_SISI_NU_SINIESTRO']) + " </b>");
	    	
	    	
			//Abre el modal
			$("#terceroDetallePopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		mostrarError('Error : 553453. Se produjo un inconveniente al cargar los datos del tercero',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
};
 	

function abrirModaldanios(){

	//Abre el modal
	$("#daniosPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	}
	




function abrirModalCoberturasFinanciera(){
	bloquearPantallaGris();

	//Abre el modal
	$("#coberturaFinanieraPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	
	coberturaFinanciera();
	
};





function abrirModalCoberturas(){
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'coberturaModalSiniestroHome',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, ramo : valorRamo,annio : annio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosCoberturasSiniestroHome");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SISC_CACB_CD_COBERTURA']) +'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(json[int]['P_TF_LISTA_IMPR_SISC_CCHG_CD_HECHO_GEN']) +" - "+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_IMPR_INB_DESC_HECHO_GEN']))+'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_IMPR_SISC_FE_ACTUALIZACION'])) +'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_LISTA_IMPR_SISC_FE_PRESCRIPCION'])) +'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_IMPR_SISC_MT_FRANQUICIA'])) +'</td>'+
		            '<td class="td-grilla-coberturasSiniestroHome" role="cell">'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_IMPR_SISC_MT_RESERVA_ACTUAL'])) +'</td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	total = json.length - 1;
    	    	$("#DATO_COBERTURA_MODAL").html("Coberturas del siniestro #<b>"+valorSiniestro+"</b>");
    	    	
			//Abre el modal
			$("#coberturasSiniestroPopUp").modal({
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
		    	mostrarError(xhr['responseText']);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
}




function abrirModalIndiceRiesgosSiniestro(){
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var annio =document.getElementById("valorAnnioSiniestroHome").value;
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'indiceRiesgoModalSiniestroHome',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, ramo : valorRamo,annio : annio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosindRiesgoSiniestro");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	var puntaje;
    	    	var resaltaLinea;
    	    	for ( var int = 0; int < json["datosSalida"].length; int++) {
    	    	
    	    		//pregunta si puede ver los puntajes
    	    		if(json["datosSalida"][int]["P_TF_LISTA_IMPR_INB_IN_PERMISO_VER_PUNTAJE"].trim() === 'S'){
        	    		$('#columnaPuntajeRiesgoSiniestroHome').css('display','');
    	    			puntaje='<td class="td-grilla-incRiesgoSiniestroHome" role="cell">'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_INB_TOT_PUNTAJE_INSTANC']) +'</td>';
    	    		}
    	    		else{
    	    		$('#columnaPuntajeRiesgoSiniestroHome').css("display","none");
	    			puntaje='';
    	    		}
    	    		//pregunta si reslta la linea
    	    		if(json["datosSalida"][int]["P_TF_LISTA_IMPR_INB_TP_INDICADOR"].trim() === 'A'){
    	    			iconoLinea='<i class="material-icons iconoIndRiesgoSiniestro" data-toggle="tooltip"  title="Automatico"  style="color:#289f28;font-size: 25px;">assignment_turned_in</i>';
    	    		}
    	    		else{
    	    			iconoLinea='<i class="material-icons iconoIndRiesgoSiniestro" data-toggle="tooltip"  title="Manual"  style="color:#00317A;font-size: 25px;">assignment_ind</i>';
    	    		}
    	    		
    	    		
    	    		panelNuevo = panelNuevo +'<tr tr-grilla" style="cursor:pointer;">'+
    	    		'<td class="td-grilla-incRiesgoSiniestroHome" role="cell">'+iconoLinea+'</td>'+
    	    		'<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIPO_CD_INSTANCIA']) +" - "+validarCampoVacio(primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_INB_DE_INSTANCIA']))+'</h6></td>'+
    	    		'<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIPO_SITC_NU_TERCERO']) +'</h6></td>'+
    	    		'<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_SIDO_NU_INDICADOR'])  +" - "+validarCampoVacio(primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_INB_DE_INDICADOR']))+'</h6></td>'+
		            '<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_INB_DE_VALOR']))+'</h6></td>'+
		            '<td class="td-grilla-incRiesgoSiniestroHome" role="cell"><h6 data-toggle="tooltip"  title='+primeraLetraMayus(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_DE_MEMO_INSTANCIA'])+'>'+validarCampoVacio(json['datosSalida'][int]['P_TF_LISTA_IMPR_SIDM_US_MOD']) +'</h6></td>'+
		            puntaje+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';
    	    	$("#DATOS_RIESGO_SINIESTRO").html("Indicadores del Siniestro #<b>"+valorSiniestro+"</b>");
    	    	if(json['avisoDato'].trim() === "AMERITA INVESTIGAR"){
    	    		$('#DATO_AVISO_RIESGO_SINIESTRO').css("color","#e50909");
    	    	}
    	    	else{
    	    		$('#DATO_AVISO_RIESGO_SINIESTRO').css("color","#108249");
    	    	}
    	    	$("#DATO_AVISO_RIESGO_SINIESTRO").html("<b>"+json['avisoDato']+"</b>");
    	    	
    	    	
    	    	
			//Abre el modal
			$("#indRiesgoSiniestroPopUp").modal({
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
		    	mostrarError(xhr['responseText']);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	 
	   
	});
}






function urlIndiceRiesgosSiniestro(url){
	bloquearPantallaGris();
	window.open(url);
	$.unblockUI();

}







function redirSiniestroHome()
{
	bloquearPantallaGris();

	var valorSiniestro=document.getElementById("valorSiniestroHomeModal").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHomeModal").value;
	location.href = "/PSPES/homeSiniestro?nroSiniestro=" + valorSiniestro + "&ramo="+valorRamo+"&anio=1";
}

function redirReservasHome()
{
	bloquearPantallaGris();

	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var valorSubsiniestro=document.getElementById("labelPanelSiniestro").value;
	var annio=document.getElementById("valorAnnioSiniestroHome").value;

	
	location.href = "/PSPES/homeReservas?nroSiniestro="+valorSiniestro+"&ramo="+valorRamo+"&subSiniestro="+valorSubsiniestro+"&annio="+annio;
}

function redirPagoHome()
{
	bloquearPantallaGris();

	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var valorRamo=document.getElementById("valorRamoSiniestroHome").value;
	var valorSubsiniestro=document.getElementById("labelPanelSiniestro").value;
	var annio=document.getElementById("valorAnnioSiniestroHome").value;

	
	location.href = "/PSPES/homePagos?nroSiniestro=" + valorSiniestro + "&ramo="+valorRamo+"&subSiniestro="+valorSubsiniestro+"&annio="+annio;
}

function zambaSiniestroHome(){
	bloquearPantallaGris();
	var valorSiniestro=document.getElementById("valorNumeroSiniestroHome").value;
	var url = "http://imageapp/zamba.web/globalsearch/search/search.html?User=3&attr=17&types=15%2c12&search="+valorSiniestro+"#Zamba/";

		window.open(url);
    	$.unblockUI();

}

function buscarFiltroParametricoSubSiniestro(idTablaParametricos){
	
	input = document.getElementById("inputBusquedaSubSiniestro");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function abrirDescargaCertificadoSiniestro(dato){
	
	if(dato !=""){
		window.open(dato);
	}else{
		mostrarError("No se encontro la denuncia del siniestro");
	}
	
}
