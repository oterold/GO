function inicioHomePromocion() {
	bloquearPantallaGris();
	
	$(document).ready(function() {
		$('.mdb-select').materialSelect();
		});
	
	var valorPromocion = document.getElementById("valorPromocion").value;
	$.ajax({
	    url : 'datoRamosTarifas',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	
	    	$.unblockUI();
	    	
	    	var selectNuevo='<option value="0">Seleccione Ramo</option>';
	    	var d1=document.getElementById("ramosPromocion");
	    	d1.innerHTML='';
	    	
	    	for ( var i = 0; i < json.length; i++) {
    	        
    	        selectNuevo += '<option '+ 'value='+ json[i].ramoDTO.codigo +' >'
    	            	        
    	        if(json[i].ramoDTO.codigo.length<2){
    	        	selectNuevo += '0'+json[i].ramoDTO.codigo;
    	        }else{
    	        	selectNuevo += json[i].ramoDTO.codigo;
    	        }
    	        
    	        selectNuevo +=' - ' + json[i].ramoDTO.descripcion +'</option>';
    	        
    	       
	    	}
	    	d1.innerHTML = selectNuevo;
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
	
}

function actualizarPromocionPorRamo(){
	bloquearPantallaGris();

	$('#textoPanelC').css("display","none");
	$('#ocultarTablaPromo').css("display","block");
	
	mostrarSelectorTarifa();
	buscarUtilizacionPromocion();
	
	
}



function mostrarSelectorTarifa(){

	var valorPromocion = document.getElementById("valorPromocion").value;
	var select = document.getElementById('ramosPromocion');
	var valorRamoSelect = select.options[select.selectedIndex].value;
	
	$.ajax({
	    url : 'datoTarifasPorRamo',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion, ramo: valorRamoSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    		

	    		    	
	    	var d2=document.getElementById("datosTarifaPromocion");
	    	d2.innerHTML='';
	    	
	    	
	    	$("#tarifaDato1").html("Campo1");
	    	$("#tarifaDato2").html("Campo2");
	    	$("#tarifaDato3").html("Campo3");
	    	$("#tarifaDato4").html("Campo4");
	    	$("#tarifaDato5").html("Campo5");
	    	$("#tarifaDato6").html("Campo6");
	    	
	    	$("#cantTarifas").html("Tarifas (0)");
	    	
	    		    	
	    	
	    	 $('#tarifasPromocion option').remove();
	    	 $('#tarifasPromocion').append(new Option("Seleccione", "0"));

	    	for(var i= 0; i< json.length;i++){
	    		$('#tarifasPromocion').append(new Option(json[i].codigo+' - '+validarCampoVacio(primeraLetraMayus(json[i].descripcion)), json[i].codigo));

	    	}
	    		$('#tarifasPromocion').materialSelect();
		    	$.unblockUI();


	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
	
}


function buscarUtilizacionPromocion(){
	bloquearPantallaGris();

	var valorPromocion = document.getElementById("valorPromocion").value;
	
	var select = document.getElementById('ramosPromocion');
	var valorRamoSelect = select.options[select.selectedIndex].value;
	
	
	
	$.ajax({
	    url : 'datoUtilizacionPromocion',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion, ramo: valorRamoSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    		    	
	    	var d1=document.getElementById("datosUtilizacionPromocion");
	    	d1.innerHTML='';
	    	
	    	var nuevaFilaTarifa = '';
	    
	    	var d2 = document.getElementById("cantUtilPromocion");
	    	d2.innerHTML = 'Fuerza&nbsp;de&nbsp;venta&nbsp;' + '('+json.length+')';
	    	
	    	for(var int=0; int < json.length; int++){
	    		nuevaFilaTarifa += '<div  id="cuadroImgEndoso'+ int+'" class="'+'cardRelacionPromocion'+'" style="background-color:#ffffff">';
	    		nuevaFilaTarifa += '<div class="timeline__post seleccionPanelB" style="margin-bottom:10px;border-left:3px solid #611BBD;padding-bottom:5px">';	
	    		
	    		nuevaFilaTarifa += '<div class="timeline__content" style="overflow:hidden;">';	
	    		nuevaFilaTarifa += '<i class="material-icons altoIcono"  style="color:#611BBD; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;"  id="imgTimeLineEndoso$nroPoliza">&#xe7fb;</i>';	
	    		nuevaFilaTarifa += '<h6 id="datoPromocion'+int+' class="datoCertificadoCarusel">Ramo : <b>'+ json[int].ramo+' - '+ json[int].descRamo + '</b></h6>';	
	    		nuevaFilaTarifa += '<h6 id="datoProducto"'+int+'>Producto : <b>'+json[int].producto+' - '+json[int].descpProducto+'</b></h6>';	
	    		nuevaFilaTarifa += '<h6 id="datoProductor'+int+'">Productor : <b>'+json[int].nuPersona+'</b></h6>';	
	    		nuevaFilaTarifa+='</div></div></div>';
	    	}
	    	
	    	d1.innerHTML = nuevaFilaTarifa;
	    	
	    	},
	    error : function(xhr, status) {
	    	
	    	var d1=document.getElementById("datosUtilizacionPromocion");
	    	d1.innerHTML='';
	    	
	    	var nuevaFilaTarifa = '';

    		nuevaFilaTarifa += '<div  id="cuadroImgVacio" style="cursor:pointer; background-color:#ffffff" >';
    		nuevaFilaTarifa += '<div class="timeline__post seleccionPanelB" id="timeLineItemVacio" style="cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A">';
    		nuevaFilaTarifa += '<div class="timeline__content" style="overflow:hidden;">';
    		nuevaFilaTarifa += '<i class="material-icons altoIcono"  style="color:#205081; font-size:40px; float:left; margin-right:20px;"  id="imgTimeLineVacio">&#xE611;</i>';
    		nuevaFilaTarifa += '<h6 id="etiquetaVacio" style="padding-top: 15px; padding-bottom: 15px; color:#b3b0b0;">No se encontraron asignaciones de fuerza de venta</h6>';
    		nuevaFilaTarifa += '</div>';
    		nuevaFilaTarifa += '</div>';
    		nuevaFilaTarifa += '</div>';
	    	d1.innerHTML = nuevaFilaTarifa;

	    	var d2 = document.getElementById("cantUtilPromocion");
	    	d2.innerHTML = 'Fuerza&nbsp;de&nbsp;venta&nbsp;' + '(0)';
	    	
	    	$.unblockUI();
	    	
	    },
	 
	   
	});

	
}


function buscarTarifasPromocion(){
	
	var valorPromocion = document.getElementById("valorPromocion").value;
	
	var select = document.getElementById('ramosPromocion');
	var valorRamoSelect = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('tarifasPromocion');
	var valorTarifaSelect = select.options[select.selectedIndex].value;
	
	bloquearPantallaGris();
	
	
	$.ajax({
	    url : 'datoTarifasPromocion',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion, ramo: valorRamoSelect, tarifa: valorTarifaSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	
	    	buscarCamposDeTarifas(valorTarifaSelect);
	    		    	
	    	var d1=document.getElementById("datosTarifaPromocion");
	    	d1.innerHTML='';
	    	
	    	var nuevaFilaTarifa = '';
	    	
	    	var d2 = document.getElementById("cantTarifas");
	    	d2.innerHTML = 'Tarifas ' + '('+json.length+')';
	    	
	    	for(var int=0; int < json.length; int++){
	    		nuevaFilaTarifa += '<tr class="tr-grilla">';
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].feEfectiva)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].feHasta)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoUno)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoDos)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoTres)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoCuatro)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoCinco)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].datoSeis)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].suma)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="padding:3px;" role="cell"><h6 class="textoNegrita">' + validarCampoVacioConGuion(json[int].tasa)+'</h6></td>';	
	    		nuevaFilaTarifa += '<td class="td-grilla-tasaPromocionHome" style="color:#0b4376;cursor:pointer;padding:0px;" role="cell" style="cursor:pointer;" onclick="verDatoTarifaVentana('+json[int].registro+');">' +'<i class="material-icons">assignment</i>'+'</td>';	

	    		
	    		nuevaFilaTarifa+='</tr>';
	    	}
	    	
	    	d1.innerHTML = nuevaFilaTarifa;
	    	
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);	    },
	 
	   
	});
}


function buscarCamposDeTarifas(valorTarifaSelect){
	
	$.ajax({
    url : 'datoTarifasCamposPromocion',
    contentType: 'application/json', 
    data : { tarifa: valorTarifaSelect},
    type : 'GET',
    dataType : 'json',
    success : function(json) { 	

    	$("#tarifaDato1").html(primeraLetraMayus(validarCampoVacioConVacio(json[0])));
    	$("#tarifaDato2").html(primeraLetraMayus(validarCampoVacioConVacio(json[1])));
    	$("#tarifaDato3").html(primeraLetraMayus(validarCampoVacioConVacio(json[2])));
    	$("#tarifaDato4").html(primeraLetraMayus(validarCampoVacioConVacio(json[3])));
    	$("#tarifaDato5").html(primeraLetraMayus(validarCampoVacioConVacio(json[4])));
    	$("#tarifaDato6").html(primeraLetraMayus(validarCampoVacioConVacio(json[5])));
    	
    	},
    error : function(xhr, status) {
    	$.unblockUI();
    	mostrarError(xhr['responseText']);	    },
 
   
});}
function buscarFiltroPromocionTarifas(idTablaParametricos){
	
	input = document.getElementById("inputPromocionTarifa");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}
function buscarFiltroPromocionValores(idTablaParametricos){
	
	input = document.getElementById("inputPromocionValores");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function buscarFiltroPromocionTarifas(idTablaParametricos){
	
	input = document.getElementById("inputPromocionTarifas");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function filtrarListaDatosPanel(idInput , claseAFiltrar){
	
	var datoIn = document.getElementById(idInput).value.toUpperCase();
	
	claseAFiltrar = '.'+claseAFiltrar;
	
	$(claseAFiltrar).each(function() {
			
			var dato = " ";
			$('#' + $(this).attr('id')).find('b').each(function(){	
				dato = dato + " "+ $(this)[0].innerHTML;	
			});
			
			if ((datoIn.trim() == "") || ( dato.toUpperCase().indexOf(datoIn) > -1 ) ) {
				$('#' + $(this).attr('id')).css("display", "");
			} else {
				$('#' + $(this).attr('id')).css("display", "none");
			};
	});
	

}



function abrirModalVisualizaciones(){
	
	var valorPromocion=document.getElementById("valorPromocion").value;
	
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'visualizacionesModal',
	    contentType: 'application/json', 
	    data : { promocion : valorPromocion},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("datosVisualizacionesPromociones");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = ' ';
    	    	
    	    	for ( var int = 0; int < json.length-1 ; int++) {
    	    		panelNuevo = panelNuevo +'<tr class="tr-grilla">'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CARP_CD_RAMO']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_VDPR_CARP_DE_RAMO']))+ '</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CAPU_CD_PRODUCTO']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_VDPR_CAPU_DE_PRODUCTO']))+ '</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CPP_ESQ_VISUALIZACION']) +' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_VDPR_CPP_DE_ESQ_VISUALIZACION']))+ '</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CRCD_CD_DATO']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CRDP_CD_BIEN_ASEG']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CRTB_CD_TABLA']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_IN_VISIBLE']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_CAUS_CD_USUARIO']) +'</h6></td>'+
		            '<td class="td-grilla-visualizacionesPromociones" role="cell"><h6>'+validarCampoVacio(json[int]['P_TF_VDPR_VDPR_FE_ACTUALIZACION']) +'</h6></td>'+
		            '</tr>';
    	    	}
    	    	d1.innerHTML = panelNuevo + '</tr>';

    	    	$("#DATOS_MODAL_VISUALIZACIONES_PROMOCIONES").html("Visualizacion  #<b>"+valorPromocion+ "</b>");

    	    	
    	    	
			//Abre el modal
			$("#visualizacionesPromocionesPopUp").modal({
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

function verDatoTarifaVentana(registro){
	
	bloquearPantallaGris();
	
	
	$.ajax({
	    url : 'datoTarifaVentana',
	    contentType: 'application/json', 
	    data : { registroTarifa : registro},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
    	    	$("#CRTA_ID_REGISTRO").html("Tarifa #<b> "+json[0]["P_TF_CTDF_CTDF_CD_TARIFA"]+" - "+json[0]["P_TF_CTDF_CTDF_DE_TARIFA"]+ "</b>");
    	    	/*aca se setean los nombres de los campos */
    	    	
    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO1"] == ''){
    	    		$('#ocultarCampo1').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO1").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO1"]))+"&nbsp;:&nbsp;");
    	    	}
    	    	
    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO2"] == ''){
    	    		$('#ocultarCampo2').css('display','none');
    	    	}else{
    	    		
    	    		$("#CAMPO_CRCD_DE_DATO2").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO2"]))+"&nbsp;:&nbsp;");
    	    	}
    	    	
    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO3"] == ''){
    	    		$('#ocultarCampo3').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO3").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO3"]))+"&nbsp;:&nbsp;");
    	    	}

    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO4"] == ''){
    	    		$('#ocultarCampo4').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO4").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO4"]))+"&nbsp;:&nbsp;");
    	    	}

    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO5"] == ''){
    	    		$('#ocultarCampo5').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO5").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO5"]))+"&nbsp;:&nbsp;");
    	    	}
 
    	    	if(json[0]["P_TF_CTDF_CRCD_DE_DATO6"] == ''){
    	    		$('#ocultarCampo6').css('display','none');
    	    	}else{
    	    		$("#CAMPO_CRCD_DE_DATO6").html(validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRCD_DE_DATO6"]))+"&nbsp;:&nbsp;");
    	    	}

    	    	/*aca se setean el contenido del campo */
    	    	
    	    	$("#CRCD_DE_DATO1").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO1"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO1"]))+ "</b>");
    	    	$("#CRCD_DE_DATO2").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO2"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO2"]))+ "</b>");
    	    	$("#CRCD_DE_DATO3").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO3"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO3"]))+ "</b>");
    	    	$("#CRCD_DE_DATO4").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO4"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO4"]))+ "</b>");
    	    	$("#CRCD_DE_DATO5").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO5"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO5"]))+ "</b>");
    	    	$("#CRCD_DE_DATO6").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_DATO6"])+" - "+validarCampoVacio(primeraLetraMayus(json[0]["P_TF_CTDF_CRTB_DE_DATO6"]))+ "</b>");
    	    	$("#CRTA_PO_TASA").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_PO_TASA"])+"</b>");
    	    	$("#CRTA_MT_SUMA").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CRTA_MT_SUMA"])+"</b>");
    	    	$("#CTDF_IN_COBERTURA").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CTDF_IN_COBERTURA"])+"</b>");
    	    	$("#CTDF_IN_PRODUCTO").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CTDF_IN_PRODUCTO"])+"</b>");
    	    	$("#CTDF_IN_PLAN").html("<b>"+ validarCampoVacio(json[0]["P_TF_CTDF_CTDF_IN_PLAN"])+"</b>");

    	    	
    	    	
			//Abre el modal
			$("#tarifaVentanaPopUp").modal({
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
		    	mostrarError('Error al mostrar la ventana de tarifa',e);
	    		
	    	}
	    },
	    error : function(xhr, status) {
	    	mostrarError(xhr['responseText']);
	    },
	});
	
}



function descargarExcelPromocion(promocion)
{
	var select = document.getElementById('ramosPromocion');
	var valorRamo = select.options[select.selectedIndex].value;
	
	if(valorRamo =! 0){
    promocion=escape(promocion);
    location.href = "/PSPES/descargarArchivoExcelPromocion?promocion="+promocion+"&ramo="+valorRamo;
    }
};

