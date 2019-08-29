function buscarPlanesConfiguracionVisualizacion(idTablaParametricos){
	
	input = document.getElementById("inputPlanesConfiguracion");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function buscarDatoPanelCConfiguracionVisualizacion(idTablaParametricos){
	
	input = document.getElementById("inputDatoPanelCConfiguracion");
	filter = input.value;
    buscarTablaFiltro("#"+idTablaParametricos, filter);

}

function mostrarBusquedaConfigVisualizaciones(id,btn){
	bloquearPantallaGris();
	$(".ocultarSeccion").each(function(){
		    $(this).css("display","none");
			});
	$("#"+id).css("display","");
	
	$(".fondoBoton").each(function(){
	    $(this).css("background-color","#7a7a7a");
		});
	$("#"+btn).css("background-color","#0b4376");
	
	$("#selectorPlanesProductosEsquema").css("display","none");
	$("#inputDatoPanelCConfiguracion").css("display","");
	
	
	var d1 = document.getElementById("panelEsquemas");
	d1.innerHTML = ' ';
	var  panelNuevo='Realice una b&uacute;squeda';
	d1.innerHTML = panelNuevo;
	$("#tablaPanelC").css("display","none");
	$("#textoInicialPanelC").css("display","");
	
	if(btn.trim() == 'btnPlanes'.trim()){
		planesConfigVisualizacion();
	}
	
	if(btn.trim() == 'btnPromo'.trim()){
		mostrarPanelBPromociones();
	}else{
	    $.unblockUI();
	}

}
function buscarDatosPanelBRoles(){
	bloquearPantallaGris();
	 $.ajax({
	    url : '/PSPES/datosRamosConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$("#tablaPanelC").css("display","none");
	    		$("#textoInicialPanelC").css("display","");
	    		$("#datoTituloPanelB").text("Ramos");
	    		
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	    		
		    	for ( var int = 0; int < json.length ; int++) {
		    		var id='"ramosRoles'+json[int]['P_TF_CARP_CARP_CD_RAMO']+'"';
		    		var ramos='"'+json[int]['P_TF_CARP_CARP_CD_RAMO']+'"';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='mostrarPanelCRoles("+id+","+ramos+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'>"+json[int]['P_TF_CARP_CARP_CD_RAMO']+" - "+json[int]['P_TF_CARP_CARP_DE_RAMO']+"</h6>"
		    								+"</div>"
		    								+"</div>";
		    		}
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    		
	    	}
	    	
	    	},
	    error : function(xhr, status) {

	    	var d1 = document.getElementById("panelEsquemas");
	    	d1.innerHTML = ' ';
	    	var  panelNuevo='Realice una b&uacute;squeda';
	    	d1.innerHTML = panelNuevo;
	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron planes para el ramo seleccionado.');
	    },
	 
	   
	});

};



function mostrarPanelBPromociones(){
	
	bloquearPantallaGris();

	 $.ajax({
	    url : 'datosPromocionesContenido',
	    contentType: 'application/json', 
	    data : {},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$("#tablaPanelC").css("display","none");
    	    	$("#textoInicialPanelC").css("display","");
	    		$("#datoTituloPanelB").text("Promociones ("+json.length+")");

	    		
		    	$("#datosObjPromociones").val(JSON.stringify(json));

		    	$("#selectorPlanesProductosEsquema").css("display","none");
		    	$("#inputDatoPanelCConfiguracion").css("display","");
	    		
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	    		
		    	for ( var int = 0; int < json.length ; int++) {
		    		var id='"'+json[int]['P_TF_CROT_CROT_CRTB_CD_PROMOCION']+'"';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='mostrarPanelCPromociones("+id+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'>"+json[int]['P_TF_CROT_CROT_CRTB_CD_PROMOCION']+" - "+json[int]['P_TF_CROT_CROT_DE_PROMOCION']+"</h6>"
		    								+"</div>"
		    								+"</div>";
		    		}
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    		
	    	}
	    	
	    	},
	    error : function(xhr, status) {

	    	var d1 = document.getElementById("panelEsquemas");
	    	d1.innerHTML = ' ';
	    	var  panelNuevo='Realice una b&uacute;squeda';
	    	d1.innerHTML = panelNuevo;
	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron planes para el ramo seleccionado.');
	    },
	 
	   
	});

};


function mostrarPanelCPromociones(id){
	bloquearPantallaGris();
	
	var datos = $("#datosObjPromociones").val();
	datos = JSON.parse(datos);

	$(".seleccionPanelB").each(function(){
		    $(this).css("background","white");
		});
	$(".timeline__date").each(function(){
		    $(this).css("background","white");
		});

	$('#'+id).css("background","#bac2bb");

	var d1 = document.getElementById("tablaConfiguVisualizacion");
	d1.innerHTML = ' ';
	var panelNuevo = ' ';

	cambiarEncabezadoTabla(2);

	for ( var int = 0; int < datos.length ; int++) {
		if(id.trim() == datos[int]['P_TF_CROT_CROT_CRTB_CD_PROMOCION'].trim())
		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(datos[int]['P_TF_CROT_CROT_CRTB_CD_PROMOCION']) +'</h6></td>'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(datos[int]['P_TF_CROT_CROT_DE_PROMOCION'])) +'</h6></td>'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(datos[int]['P_TF_CROT_CROT_DE_CONTENIDO'])) +'</h6></td>'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(datos[int]['P_TF_CROT_CROT_CAUS_CD_USUARIO'])) +'</h6></td>'+
	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(datos[int]['P_TF_CROT_CROT_FE_ACTUALIZACION'])) +'</h6></td>'+
	    '</tr>';
	}
	d1.innerHTML = panelNuevo + '</tr>';

	$("#tablaPanelC").css("display","");
	$("#textoInicialPanelC").css("display","none");


	$.unblockUI();
	
	
	
}
	

function mostrarPanelBPlanesConfiguracionVisualizacion(json){
	
	$("#valorTexto").html("Planes");
	var datosJson = json;
	$("#tablaPanelC").css("display","none");
	$("#textoInicialPanelC").css("display","");
	
	$("#datoTituloPanelB").text("Ramos")

	var d1 = document.getElementById("panelEsquemas");
	d1.innerHTML = ' ';
	var panelNuevo ='';
	panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	


	for ( var int = 0; int < json.length ; int++) {
		var valor='"'+json[int]['P_TF_CARP_CARP_CD_RAMO']+'"';
		id ='"ramo_'+json[int]['P_TF_CARP_CARP_CD_RAMO']+'"'
		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='cargarSelectorProductosPlanes("+valor+","+id+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
								+"<h6 style='text-align:left;'><b>"+validarCampoVacio(json[int]['P_TF_CARP_CARP_CD_RAMO'])+" - "+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CARP_CARP_DE_RAMO']))+"</b></h6>"
								+"</div>"
								+"</div>";
		}
	d1.innerHTML = panelNuevo;
	
	
	
	
}



function cargarValoresPorDefaultPanelB(){
	bloquearPantallaGris();
	var select = document.getElementById('selectorValoresDefaultConfigVisualOrigen');
	var origen = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectRamosValoresDefaultConfigVisual');
	var ramo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectorProdValoresDefaultConfiguracion');
	var producto = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectorValoresDefaultFormularioConfigVisual');
	var formulario = select.options[select.selectedIndex].value;
	
	var auxiliar = $("#inputAuxiliarValoresDefault").val();
	
	 $.ajax({
	    url : 'valoresDefaultConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {origen:origen,ramo:ramo,producto:producto,formulario:formulario,auxiliar:auxiliar},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$("#tablaPanelC").css("display","none");
	    		$("#textoInicialPanelC").css("display","");
	    		$("#datoTituloPanelB").text("Valores Default ("+json.length+")");
	    		
		    	$("#datosObjPromociones").val(JSON.stringify(json));

		    	$("#selectorPlanesProductosEsquema").css("display","none");
		    	$("#inputDatoPanelCConfiguracion").css("display","");
	    		
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = '';
		    	var panelNuevo ='';
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	    		
		    	for ( var int = 0; int < json.length ; int++) {
		    		var id='"'+json[int]['P_TF_GANA_GANA_NU_CAMPO']+'"';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='mostrarPanelCValoresDefault("+id+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'>"+json[int]['P_TF_GANA_GANA_NU_CAMPO']+" - "+json[int]['P_TF_GANA_GANA_DE_CAMPO']+"</h6>"
		    								+"</div>"
		    								+"</div>";
		    		}
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	}
	    	catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    		
	    	}
	    	
	    	},
	    error : function(xhr, status) {

	    	var d1 = document.getElementById("panelEsquemas");
	    	d1.innerHTML = ' ';
	    	var  panelNuevo='Realice una b&uacute;squeda';
	    	d1.innerHTML = panelNuevo;
	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron planes para el ramo seleccionado.');
	    },
	 
	   
	});

};


function mostrarPanelCValoresDefault(valor){
	bloquearPantallaGris();
	
	$(".seleccionPanelB").each(function(){
 	    $(this).css("background","white");
 	});
	$(".timeline__date").each(function(){
 	    $(this).css("background","white");
 	});
	
	$('#'+valor).css("background","#bac2bb");
	
	$("#tablaPanelC").css("display","");
	$("#textoInicialPanelC").css("display","none");
	
	cambiarEncabezadoTabla(4);
	
	var d1 = document.getElementById("tablaConfiguVisualizacion");
	d1.innerHTML = ' ';
	var datos = $("#datosObjPromociones").val();
	json = JSON.parse(datos);
	var panelNuevo="";
	for ( var int = 0; int < json.length ; int++) {
		if(valor == json[int]["P_TF_GANA_GANA_NU_CAMPO"]){
			panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_GANA_GANA_NU_CAMPO']) +' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_GANA_GANA_DE_CAMPO']))+'</h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio((json[int]['P_TF_GANA_GANA_DE_VALOR_DEFAULT'])) +'</h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_GANA_GANA_IN_VISUALIZACION'])+'</h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_GANA_GANA_NU_RUTINA'])+' </h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_GANA_GANA_CAUS_CD_USUARIO'])+' </h6></td>'+
		    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_GANA_GANA_FE_ACTUALIZACION']))+' </h6></td>'+
		    '</tr>';
		}
	}
	d1.innerHTML =panelNuevo;
	$.unblockUI();

	
}


function cargarSelectorProductosPlanes(valor,id){
	bloquearPantallaGris();

	 $.ajax({
	    url : 'datosPlanesConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {ramo:valor},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$(".seleccionPanelB").each(function(){
				    $(this).css("background","white");
				});
			$(".timeline__date").each(function(){
				    $(this).css("background","white");
				});
			
			$('#'+id).css("background","#bac2bb");
			
	    	$('#labelPanelC').html('Productos');
	    	$("#selectorPlanesProductosEsquema").css("display","");
	    	$("#inputDatoPanelCConfiguracion").css("display","none");
	    	
	    	json = eliminarObjetosDuplicados(json, 'P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION');
	    	
	    	var d1 = document.getElementById("selectorPlanesProductosEsquema");
	    	d1.innerHTML = ' ';
	    	var panelNuevo="<option>Selecione..</option>";
	    	for ( var int = 0; int < json.length ; int++) {
	    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION']+'_'+valor+'"><h6>('+json[int]['P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION']+')&nbsp;'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRP_CPP_DE_ESQ_VISUALIZACION'])) +'</h6></option>';
	    	}
	    	d1.innerHTML =panelNuevo;
	    	
	    	}catch(e)
	    	{
		    	mostrarError('Error al cargar los productos de los ramos',e);
	    	}
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {

	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron productos para el ramo seleccionado.');
	    },
	 
	   
	});

};
	


function cambiarEncabezadoTabla(valor){
	//valor 0 d.generales y param
	//1 planes
	// 2 promos
	//valor 3 roles del producto
	if(valor == 0){
		$('#datoCabecera1').text('Visualizacion');
		$('#datoCabecera2').text('Tabla');
		$('#datoCabecera3').text('Dominio');
		$('#datoCabecera4').text('Clave');
		$('#datoCabecera5').text('Fe. Alta');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('Usr. Alta');
		$('#columnaDatoCabecera7').css('display','');
		$('#datoCabecera7').text('Fe. Mod');
		$('#columnaDatoCabecera8').css('display','');
		$('#datoCabecera8').text('Usr. Mod');

	}
	if(valor == 1){
		$('#datoCabecera1').text('Ramo');
		$('#datoCabecera2').text('Producto');
		$('#datoCabecera3').text('Plan');
		$('#datoCabecera4').text('Esquema');
		$('#datoCabecera4').text('Visualizacion')
		$('#datoCabecera5').text('Usuario');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('Fe. Actualizacion');
		$('#columnaDatoCabecera7').css('display','none');
		$('#columnaDatoCabecera8').css('display','none');

	}
	if(valor == 2){
		$('#datoCabecera1').text('Codigo');
		$('#datoCabecera2').text('Descripcion');
		$('#datoCabecera3').text('Contenido');
		$('#datoCabecera4').text('Usuario');
		$('#datoCabecera5').text('Fe. Actualizacion');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('');
		$('#columnaDatoCabecera7').css('display','none');
		$('#columnaDatoCabecera8').css('display','none');

		
	}if(valor == 3){
		$('#datoCabecera1').text('Cod. Prod');
		$('#datoCabecera2').text('Producto');
		$('#datoCabecera3').text('Prod. Estado');
		$('#datoCabecera4').text('Esq. Visualizacion');
		$('#datoCabecera5').text('Esquema');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('');
		$('#columnaDatoCabecera7').css('display','none');
		$('#columnaDatoCabecera8').css('display','none');

	}if(valor == 4){
		$('#datoCabecera1').text('Campo');
		$('#datoCabecera2').text('Default');
		$('#datoCabecera3').text('Visualizacion');
		$('#datoCabecera4').text('Rutina');
		$('#datoCabecera5').text('Usuario');
		$('#columnaDatoCabecera6').css('display','');
		$('#datoCabecera6').text('Fecha Act.');
		$('#columnaDatoCabecera7').css('display','none');
		$('#columnaDatoCabecera8').css('display','none');

	}
}
function mostrarPanelCRoles(id,ramos){
bloquearPantallaGris();
var select = document.getElementById('selectorOrigenDatosRoles');
var valorSelectOrigen = select.options[select.selectedIndex].value;

var select = document.getElementById('selectorEsquemaDatosRolesRoles');
var valorSelectRoles = select.options[select.selectedIndex].value;


 $.ajax({
    url : 'datosEsquemaGrillaProductoConfigVisualizacion',
    contentType: 'application/json', 
    data : {ramos:ramos,origen:valorSelectOrigen,rol:valorSelectRoles},
    type : 'GET',
    dataType : 'json',
    success : function(json) {
    	try{
	    	$(".seleccionPanelB").each(function(){
	    	    $(this).css("background","white");
	    	});
	    	$(".timeline__date").each(function(){
	    	    $(this).css("background","white");
	    	});
	    	$('#'+id).css("background","#bac2bb");
	    	$('#labelPanelC').html('Productos');
	
	    	$("#datosObjPromociones").val(JSON.stringify(json));
	    	
	    	$("#selectorPlanesProductosEsquema").css("display","none");
	    	$("#inputDatoPanelCConfiguracion").css("display","");
	    	
	    	cambiarEncabezadoTabla(3);
	
	    	var d1 = document.getElementById("tablaConfiguVisualizacion");
	    	d1.innerHTML = ' ';
	    	var panelNuevo = ' ';
	    	
	    	for ( var int = 0; int < json.length ; int++) {
	    		var producto ="'"+json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO']+"'";
	    		var esq1 ="'"+json[int]['P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION']+"'";
	    		var esq2 ="'"+json[int]['P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION']+"'";
	    		
	    		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO'])+'</h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAPU_CAPU_DE_PRODUCTO'])) +'</h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(json[int]['P_TF_CAPU_CAPU_ST_PRODUCTO'])+'</h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(json[int]['P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION'])+' </h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6>'+validarCampoVacio(json[int]['P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION'])+'</h6></td>'+
	    	    '<td class="" role="cell"><h6 style="font-weight:400"><h6 style="cursor:pointer;" onclick="mostrarDetalleProductosRoles('+producto+','+esq1+','+esq2+');"><i style="cursor:pointer;font-size:14px;" class="fas fa-eye"></i></h6></td>'+
	    	    '</tr>';
	    		
	    	}
	    	d1.innerHTML = panelNuevo + '</tr>';
	
	    	$("#tablaPanelC").css("display","");
	    	$("#textoInicialPanelC").css("display","none");
	
	    	$.unblockUI();
    		
    	}catch(e)
    	{
	    	mostrarError('Error al cargar los planes',e);
    	}
    	$.unblockUI();
    	},
    error : function(xhr, status) {
    	$(".seleccionPanelB").each(function(){
    	    $(this).css("background","white");
    	});
    	$(".timeline__date").each(function(){
    	    $(this).css("background","white");
    	});
    	$("#tablaPanelC").css("display","none");
    	$("#textoInicialPanelC").css("display","");
    	mostrarError('No se encontraron productos para el ramo seleccionado.');
    },
 });
};


function mostrarDetalleProductosRoles(producto,esq1,esq2){

	bloquearPantallaGris();

	var datos = $("#datosObjPromociones").val();
	json = JSON.parse(datos);
	
	for ( var int = 0; int < json.length ; int++) {
		if(producto == json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"] && esq1 == json[int]["P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION"] && esq2 == json[int]["P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION"]){
			$("#P_TF_CAPU_CAPU_CD_PRODUCTO").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO']))+" </b>");
			$("#P_TF_CAPU_CAPU_DE_PRODUCTO").html("<b> " +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAPU_CAPU_DE_PRODUCTO']))+" </b>");
			$("#P_TF_CAPU_CAPU_FE_INICIO").html("<b> " +validarCampoVacio(formatearFechaJson(json[int]['P_TF_CAPU_CAPU_FE_INICIO']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_BENEFICIARIOS").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_BENEFICIARIOS']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_DIRECCION").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_DIRECCION']))+" </b>");
			$("#P_TF_CAPU_CAPU_IN_CERRADO").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CAPU_IN_CERRADO']))+" </b>");
			$("#P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION']))+" </b>");
			$("#P_TF_CAPU_CAPU_CARP_CD_RAMO").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CAPU_CARP_CD_RAMO']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_NOMINA").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_NOMINA']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_LISTAS_BIENES").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_LISTAS_BIENES']))+" </b>");
			$("#P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION']))+" </b>");
			$("#P_TF_CAPU_CRPB_IN_COBERTURAS").html("<b> " +validarCampoVacio((json[int]['P_TF_CAPU_CRPB_IN_COBERTURAS']))+" </b>");
			$("#titulo_productos_roles").html("Detale del Producto " +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAPU_CAPU_DE_PRODUCTO']))+"");
			
		}
	}
	
	
	$("#detalleRolesProductosPopUp").modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
	});
	
	$.unblockUI();

	
}

function MostrarPanelCPlanesConfiguracionVisualizacion(){
	bloquearPantallaGris();

	var select = document.getElementById('selectorPlanesProductosEsquema');
	var valorSelect = select.options[select.selectedIndex].value;
	
	var producto = valorSelect.split("_")[0];
	var ramo = valorSelect.split("_")[1];
	
	 $.ajax({
	    url : 'datosPlanesConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {ramo:ramo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
				
				var d1 = document.getElementById("tablaConfiguVisualizacion");
				d1.innerHTML = ' ';
				var panelNuevo = ' ';
				
				cambiarEncabezadoTabla(1);
				
				for ( var int = 0; int < json.length ; int++) {
					if(producto.trim() == json[int]['P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION'].trim()){
						panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_PRP_PRP_CARP_CD_RAMO']) +' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRP_CARP_DE_RAMO']))+'</h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_PRP_PRP_CAPU_CD_PRODUCTO']) +' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRP_CAPU_DE_PRODUCTO'])) +'</h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_PRP_PRP_CAPB_CD_PLAN']) +' - '+primeraLetraMayus(validarCampoVacio(json[int]['P_TF_PRP_CAPB_DE_PLAN'])) +' </h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_PRP_PRP_CPP_CD_ESQ_VISUALIZACION']) +' - '+primeraLetraMayus(validarCampoVacio(json[int]['P_TF_PRP_CPP_DE_ESQ_VISUALIZACION'])) +' </h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_PRP_PRP_CAUS_CD_USUARIO'])) +'</h6></td>'+
					    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_PRP_PRP_FE_ACTUALIZACION'])) +'</h6></td>'+
					    '</tr>';
					}
				}
				d1.innerHTML = panelNuevo + '</tr>';
				
				$("#tablaPanelC").css("display","");
				$("#textoInicialPanelC").css("display","none");
	    	}catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    	}
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {

	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron productos para el ramo seleccionado.');
	    },
	 
	   
	});

};


function planesConfigVisualizacion(valor){
	bloquearPantallaGris();

	 $.ajax({
	    url : 'datosRamosConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		mostrarPanelBPlanesConfiguracionVisualizacion(json);
	    	}catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    	}
	    	$.unblockUI();
	    	},
	    error : function(xhr, status) {
	    	$("#tablaPanelC").css("display","none");
	    	$("#textoInicialPanelC").css("display","");
	    	mostrarError('No se encontraron ramos.');
	    },
	 
	   
	});

};


function inicioConfigVisualizacion(){
	$( ".cerrarModalBotonHoover" ).trigger( "click" );
	$('[data-toggle="tooltip"]').tooltip();
	$(document).ready(function(){
	    $('select').formSelect();
	  });
	
}


function buscarEsquemasPanelB(){
	bloquearPantallaGris();
	var select = document.getElementById('valorEsquemaDatos');
	var valorSelect = select.options[select.selectedIndex].value;

}

function buscadorPanelParamGrales() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("filtroPanelBConfiguracionVisualizacion");
	  filter = input.value.toUpperCase();
	
	  $(".FiltroConfiguracionVisualizacion").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("cardConfiguracionVisualizacion", "FiltroCongVisualizacion");
		  var idCardParteB = idH6.replace("cardConfiguracionVisualizacion", "FiltroCongVisualizacion");
		  
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

function selecionarEsquemasConfigVisualizacion(){
	bloquearPantallaGris();
	var select = document.getElementById('selectRamosConfigVisual');
	var valorSelect = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectorProdConfiguracion');
	var valorSelectProd = select.options[select.selectedIndex].value;
	
	$.ajax({
	    url : 'datosEsquemaConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {ramo:valorSelect,producto:valorSelectProd} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
		    		var d2 = document.getElementById("selectorEsquemaConfiguracionVisualizacion");
	    		
		    	d2.innerHTML= '';
		    	var panelNuevo = '';
	    		panelNuevo = panelNuevo + '<option value=""><h6>Seleccione..</h6></option>';

		    	for ( var int = 0; int < json.length ; int++) {
		    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_CPP_CPP_CD_ESQ_VISUALIZACION']+'"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CPP_CPP_CD_ESQ_VISUALIZACION']))+' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CPP_CPP_DE_ESQ_VISUALIZACION']))+'</h6></option>';
		    	}
		    	
		    	d2.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	
	    	}
	    catch(e){
	    		alert('Error (5467) generado por : '+e);
	    	}
	    $.unblockUI();
	},
    error : function(xhr, status) {
    	mostrarError(xhr['responseText']);
	    $.unblockUI();

    }
});
}



function buscarDatosPanelBDatosGenerales(){
	bloquearPantallaGris();
	var select = document.getElementById('selectorEsquemaDatosGenerlaes');
	var valorSelectGenerales = select.options[select.selectedIndex].value;
	
	
	$.ajax({
	    url : 'datosTablaConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {esquema:valorSelectGenerales} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#tablaPanelC").css("display","none");
    	    	$("#textoInicialPanelC").css("display","");
	    		
	    		$("#datoTituloPanelB").text("Datos Generales")

	    		$("#selectorPlanesProductosEsquema").css("display","none");
	    		$("#inputDatoPanelCConfiguracion").css("display","");
	    		
	    		
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
	    		
	    		
		    	for ( var int = 0; int < json.length ; int++) {
		    		var domin='"'+json[int]["P_TF_CREW_CREW_RV_DOMAIN"]+'"';
		    		var codTabla='"'+json[int]["P_TF_CREW_CREW_DPTA_CD_TABLA"]+'"';
		    		var id='"panelGeneralB'+int+'"';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' id="+id+" onclick='mostrarPanelCGenerales("+codTabla+","+domin+","+id+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'>"+primeraLetraMayus(json[int]['P_TF_CREW_CREK_DE_VISUALIZACION'])+"</h6>"
		    								+"<h6 style='text-align:left;'>Tabla : <b>"+json[int]['P_TF_CREW_CREW_DPTA_CD_TABLA']+"</b></h6>"
		    								+"</div>"
		    								+"</div>";
		    	}
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	}
	    catch(e){
	    		alert('Error (5467) generado por : '+e);
	    	  	
	    	    $.unblockUI();
	    	}

	    
	    },
    error : function(xhr, status) {
    	mostrarError(xhr['responseText']);

    }
});
}


function mostrarPanelCGenerales(codTabla,domain,id){
	bloquearPantallaGris();

	var select = document.getElementById('selectorEsquemaDatosGenerlaes');
	var valorSelectGenerales = select.options[select.selectedIndex].value;
		$.ajax({
		    url : 'datosGeneralesPanelB',
		    contentType: 'application/json', 
		    data : {tabla:codTabla,dominio:domain,esquema:valorSelectGenerales},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		
		    		$(".seleccionPanelB").each(function(){
				 	    $(this).css("background","white");
				 	});
					$(".timeline__date").each(function(){
				 	    $(this).css("background","white");
				 	});
					
					$('#'+id).css("background","#bac2bb");
		    		
		    		var d1 = document.getElementById("tablaConfiguVisualizacion");
	    	    	d1.innerHTML = ' ';
	    	    	var panelNuevo = ' ';
	    	    	
	    	    	
	    	    	cambiarEncabezadoTabla(0);
	    	    	
	    	    	for ( var int = 0; int < json.length ; int++) {
	    	    		panelNuevo = panelNuevo +'<tr style="cursor:pointer;" class="textoCards" class="tr-grilla">'+
	    	    		'<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_CREW_CREW_CREK_NU_VISUALIZACION']) +' - '+primeraLetraMayus(validarCampoVacio(json[int]['P_TF_CREW_CREK_DE_VISUALIZACION'])) +' </h6></td>'+
	    	    		'<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio((json[int]['P_TF_CREW_CREW_DPTA_CD_TABLA'])) +'</h6></td>'+
	    	    		'<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio((json[int]['P_TF_CREW_CREW_RV_DOMAIN'])) +'</h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(json[int]['P_TF_CREW_CREW_CD_CLAVE']) +' - '+primeraLetraMayus(validarCampoVacio(json[int]['P_TF_CREW_CREW_DE_CLAVE'])) +' </h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_CREW_CREW_FE_ALTA'])) +'</h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CREW_CREW_CAUS_CD_USUARIO_A'])) +'</h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(formatearFechaJson(json[int]['P_TF_CREW_CREW_FE_MODIFICACION'])) +'</h6></td>'+
	    	    	    '<td class="" role="cell"><h6 style="font-weight:400">'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CREW_CREW_CAUS_CD_USUARIO_M'])) +'</h6></td>'+
	    	    	    '</tr>';
	    	    	}
	    	    	
	    	    	$("#tablaPanelC").css("display","");
	    	    	$("#textoInicialPanelC").css("display","none");
	    	    	
	    	    	d1.innerHTML = panelNuevo + '</tr>';

				$.unblockUI();
		    	}
		    	catch(e)
		    	{
			    	mostrarError('Por favor informe a sistema con el cod de error:98716.',e);
		    		
		    	}
		    	
		    	
		    	},
		    error : function(xhr, status) {
		    	mostrarError(xhr['responseText']);
		    },
		 
		   
		});
		

	};






function eliminarObjetosDuplicados(arr, prop) {
	var nuevoArray = [];
    var lookup  = {};

    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }

    return nuevoArray;

}


function selecionarProductoConfigVisualizacion(valor){
	bloquearPantallaGris();
	if(valor ==1){
	var select = document.getElementById('selectRamosConfigVisual');
	}else{
		var select = document.getElementById('selectRamosValoresDefaultConfigVisual');
	}
	
	var valorSelect = select.options[select.selectedIndex].value;
	$.ajax({
	    url : 'datosProductoConfigVisualizacion',
	    contentType: 'application/json', 
	    data : {ramo:valorSelect} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	if(valor==1){
		    	var d1 = document.getElementById("selectorProdConfiguracion");
	    	}else{
    			var d1 = document.getElementById("selectorProdValoresDefaultConfiguracion");
    		}
		    	d1.innerHTML= '';
		    	var panelNuevo = '';
	    		panelNuevo = panelNuevo + '<option value=""><h6></h6></option>';

		    	for ( var int = 0; int < json.length ; int++) {
		    		panelNuevo = panelNuevo + '<option value="'+validarCampoVacio(json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO'])+'"><h6>'+json[int]['P_TF_CAPU_CAPU_CD_PRODUCTO']+' - '+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAPU_CAPU_DE_PRODUCTO']))+'</h6></option>';
		    	}
		    	
		    	d1.innerHTML =panelNuevo;
	    	    $.unblockUI();
	    	
	    	}
	    catch(e){
	    		alert('Error (5467) generado por : '+e);
	    	}
	    $.unblockUI();
	},
    error : function(xhr, status) {
    	mostrarError(xhr['responseText']);
	    $.unblockUI();

    }
});
}



function buscarDatosPanelB(){
	bloquearPantallaGris();
	var select = document.getElementById('selectRamosConfigVisual');
	var valorSelectRamo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectorProdConfiguracion');
	var valorSelectProd = select.options[select.selectedIndex].value;
	
	
	var select = document.getElementById('selectorEsquemaConfiguracionVisualizacion');
	var valorEsquema = select.options[select.selectedIndex].value;
	
	
	$.ajax({
	    url : 'datosBusquedaPanelB',
	    contentType: 'application/json', 
	    data : {esquema:valorEsquema,ramo:valorSelectRamo,producto:valorSelectProd} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		$("#tablaPanelC").css("display","none");
    	    	$("#textoInicialPanelC").css("display","");
	    		$("#datoTituloPanelB").text("Datos Parametricos")
		    	var d1 = document.getElementById("panelEsquemas");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';;
	    		panelNuevo = panelNuevo + '<div style="cursor:pointer; id="panelEsquemasB" background-color:#ffffff">';
		    	for ( var int = 0; int < json.length ; int++) {
		    		var datoParametrico='';
		    		panelNuevo = panelNuevo + "<div class='timeline__post seleccionPanelB' onclick='mostrarPanelC("+datoParametrico+")' style='cursor:pointer;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:5px'>"
		    								+ "<div class='timeline__content FiltroConfiguracionVisualizacion' id='FiltroCongVisualizacion"+int+"' style='overflow:hidden;'>"
		    								+ "<i class='fas fa-file-signature altoIcono' style='color:#205081; font-size:20px;margin-bottom:32px; margin-right:20px;float:left;'></i>"
		    								+"<h6 style='text-align:left;'><b>Codigo : "+json[int]['P_TF_WVD_VDPR_CRCD_CD_DATO']+"</b></h6>"
		    								+"<h6 style='padding-top:5px;text-align:left;'><b>"+json[int]['P_TF_WVD_CRCD_QT_DATO']+" - "+json[int]['P_TF_WVD_CRCD_DE_DATO']+"</b></h6>"
		    								+"</div>"
		    								+"</div>";
		    	}
		    	d1.innerHTML =panelNuevo+"</div>";
	    	    $.unblockUI();
	    	}
	    catch(e){
	    		alert('Error (5467) generado por : '+e);
	    	  	
	    	    $.unblockUI();
	    	}

	    },
    error : function(xhr, status) {
    	mostrarError(xhr['responseText']);

    }
});
}

