	
function formatearMoneda(numero) {
	if(numero !='' && numero !=null){
	var nStr= parseFloat(numero).toFixed(2);
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    var nu = numero.indexOf('-')
    if(nu == 0){
    	return '<a style="color:red">$ ' + x1 + x2+"</a>";
    }
    return '$ ' + x1 + x2;
	}
	return "$ 0,00";
	}

function formatearMonedaSinSimbolo(numero) {
	if(numero !=''){
	var nStr= parseFloat(numero).toFixed(2);
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return '' + x1 + x2;
	}
	return "0,00";
	}

function formatearMonedaSincolor(numero) {
	
	
	if(numero !=''){
	var nStr= parseFloat(numero).toFixed(2);
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    var nu = numero.indexOf('-')
    return '$ ' + x1 + x2;
	}
	return "$ 0,00";
	}


function formatearMonedaCotizador(numero) {
	
	
	if(numero !=''){
	var nStr= parseFloat(numero).toFixed(2);
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return '$ ' + x1 + x2;
	}
	return "$ 0,00";
	}

function cerrarVentana(){
	
	open(location, '_self').close();
	
}
function mostrarError(msg){
	try {
		$.unblockUI();
	} catch (e) {
	}
	swal({
		  type: 'warning',
		  title: 'Oops...',
		  text: msg
		});
}

function mostrarWarning(msg){
	try {
		$.unblockUI();
	} catch (e) {
	}
	swal({
		  type: 'warning',
		  title: 'Oops...',
		  text: msg
		});
}

function bloquearPantallaGris()
{
	 $.blockUI({ 
		 message: '<img style=" object-fit: contain ; max-width: 100%; max-height: 100%; max-width:100%;		  max-height:100%;	  margin:auto;	  display:block; border-radius:5px;" src="resources/img/cargandoPS.gif"/>',
		 css: {
			 top:  ($(window).height() - 150) /2 + 'px', 
             left: ($(window).width() - 200) /2 + 'px',
             border: '0px',
             borderRadius: '5px',
             backgroundColor: 'transparent',
             width: '200px',
             boxShadow: '4px 4px 5px 0px rgba(0,0,0,0.56)'
           	 },
        centerY: true,
	    centerX: true
	 });
	 
};
	function primeraLetraMayus(dato) {
	    return dato.replace(
	        /\w\S*/g,
	        function(txt) {
	            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	        }
	    );
	}

function formatearFechaJson(fechaIn)
{
	try {
		if (fechaIn != "") {
			var fechaSeparada = fechaIn.split('-');
			return fechaSeparada[2] +"/"+fechaSeparada[1]+"/"+fechaSeparada[0];
		}
		
	} catch (e) {
		mostrarError('Upsss!! , ocurrio un error al formatear la fecha');
	}

	return fechaIn;
};






  var arrowWidth = 30;

  $.fn.resizeselect = function(settings) {  
    return this.each(function() { 

      $(this).change(function(){
        var $this = $(this);

        // create test element
        var text = $this.find("option:selected").text();
        
        var $test = $("<span>").html(text).css({
        	"font-size": $this.css("font-size"), // ensures same size text
          "visibility": "hidden" 							 // prevents FOUC
        });
        

        // add to body, get width, and get out
        $test.appendTo($this.parent());
        var width = $test.width();
        $test.remove();

        if(width != 0){
        	
        	// set select width
        	$this.width(width + arrowWidth);
        }

        // run on start
      }).change();

    });
  };



function buscadorPanelCEntidadCliente() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaSiniestro");
	  filter = input.value.toUpperCase();
	
	  $(".datoSiniestroCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoSiniestro", "micaruB");
		  var idEncabezado = idH6.replace("datoSiniestro", "nroSiniestro");
		
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

function buscarPorPagina(){
	bloquearPantallaGris();
}


function buscarHome()
{
	bloquearPantallaGris();
    var dato = $("#datoFiltro").val().trim();
    var entidades = $('input:radio[name=radio-input]:checked').val();
    
    var datoP1 = $("#selectorP1 option:selected").val();
    var datoP2 = $("#selectorP2 option:selected").val();
    var datoP3 = $("#selectorP3 option:selected").val();
    
    dato=escape(dato);
    if((((datoP2 != "0" && datoP2 !="4002") || datoP1 != "0") && datoP3 == "0")  && entidades == "000100"){
    	Swal.fire({
			 title:"Hola ! Para realizar una busqueda avanzada tiene que seleccionar una fecha.",
		       text: "GO Team.",
		       type: "info",
		       customClass: 'modificar-sweetalert',
		});
    	$.unblockUI();

    }
    else if (datoP3 == "11" && (datoP2== '4007' || datoP2=='4008')){    
    	 	Swal.fire({
   			 title:"Hola !! No se puede realizar la busqueda de los departamentos cerrados/todos mayores a un mes.",
   		       text: "GO Team.",
   		       type: "info",
   		       customClass: 'modificar-sweetalert',
   		});
        	$.unblockUI();

    	}
    else if ( (datoP2=='4006' || datoP2=='4007' || datoP2=='4008') &&(datoP3== '01' || datoP3=='02' || datoP3== '03' || datoP3=='06')){
    		Swal.fire({
      			 title:"Hola !! No se puede realizar la busqueda de los departamentos abiertos/cerrados/todos por la fecha de creac&oacute;n o actualizaci&oacute;n",
      		       text: "GO Team.",
      		       type: "info",
      		       customClass: 'modificar-sweetalert',
      		});
           	$.unblockUI();
    	}
    	else{
    	location.href = "/PSPES/go?dato="+dato +"&entidades=" + entidades +"&p1=" + datoP1 +"&p2=" + datoP2 +"&p3=" + datoP3;
    	}
};


function buscarHomeExperto()
{
	bloquearPantallaGris();
	
    var dato = $("#datoFiltro").val().trim();
    var datoP1 = $("#selectorExpertoEntidad option:selected").val();
    var datoP2 = $("#selectorExpertoPor option:selected").val();
    var datoP3 = $("#selectorExpertoRamo option:selected").val();
    var datoP4 = $("#selectorExpertoEstado option:selected").val();
    
    var feDesde= $("#inputGoExpertoDesde").val();
    var feHasta= $("#inputGoExpertoHasta").val();
    
    dato=escape(dato);
    
    location.href = "/PSPES/goExperto?dato="+dato+"&p1=" + datoP1+"&p2="+datoP2+"&p3="+datoP3+"&p4="+datoP4+"&desde="+feDesde+"&hasta="+feHasta;
    
    
};


function descargarExcel()
{
    var dato = $("#datoFiltro").val().trim();
    var entidades = $('input:radio[name=radio-input]:checked').val();
    
    var datoP1 = $("#selectorP1 option:selected").val();
    var datoP2 = $("#selectorP2 option:selected").val();
    var datoP3 = $("#selectorP3 option:selected").val();
    
    dato=escape(dato);
    
    location.href = "/PSPES/descargarArchivoExcel?dato="+dato +"&entidades=" + entidades +"&p1=" + datoP1 +"&p2=" + datoP2 +"&p3=" + datoP3;
};



function buscarHomeEntidad(valor)
{
	bloquearPantallaGris();
    var dato = $("#datoFiltro").val();
    var datoP1 = '0';
    var datoP2 = '0';
    var datoP3 = '0';
    location.href = "/PSPES/go?dato="+dato +"&entidades=" + valor +"&p1=" + datoP1 +"&p2=" + datoP2 +"&p3=" + datoP3;
};

function buscarHomeRamo(valor)
{
	bloquearPantallaGris();
    var dato = $("#datoFiltro").val();
    var entidades = $('input:radio[name=radio-input]:checked').val();
    var datoP1 = valor;
    var datoP2 = $("#selectorP2 option:selected").val();
    var datoP3 = $("#selectorP3 option:selected").val();
    
    location.href = "/PSPES/go?dato="+dato +"&entidades=" + entidades +"&p1=" + datoP1 +"&p2=" + datoP2 +"&p3=" + datoP3;
};

function buscarHomeRamoExperto(valor){
	
	bloquearPantallaGris();
    var dato = $("#datoFiltro").val().trim();
    var datoP1 = $("#selectorExpertoEntidad option:selected").val();
    var datoP2 = $("#selectorExpertoPor option:selected").val();
    var datoP4 = $("#selectorExpertoEstado option:selected").val();

    var datoP3 = valor;
    
    var feDesde= $("#inputGoExpertoDesde").val();
    var feHasta= $("#inputGoExpertoHasta").val();
    
    dato=escape(dato);
    
    location.href = "/PSPES/goExperto?dato="+dato+"&p1=" + datoP1+"&p2="+datoP2+"&p3="+datoP3+"&p4="+datoP4+"&desde="+feDesde+"&hasta="+feHasta;
	
}

function buscarHomeEstado(valor)
{
	bloquearPantallaGris();
    var dato = $("#datoFiltro").val();
    var entidades = $('input:radio[name=radio-input]:checked').val();
    var datoP1 = $("#selectorP1 option:selected").val();
    var datoP2 = $("#selectorP2 option:selected").val();
    var datoP3 = valor;
    location.href = "/PSPES/go?dato="+dato +"&entidades=" + entidades +"&p1=" + datoP1 +"&p2=" + datoP2 +"&p3=" + datoP3;


    
};

function buscarHomeEstadoExperto(valor)
{
	bloquearPantallaGris();
    var dato = $("#datoFiltro").val();
    var datoP1 = $("#selectorExpertoEntidad option:selected").val();
    var datoP2 = $("#selectorExpertoPor option:selected").val();
    var datoP3 = $("#selectorExpertoRamo option:selected").val();
    
    var feDesde= $("#inputGoExpertoDesde").val();
    var feHasta= $("#inputGoExpertoHasta").val();
    
    var datoP4 = valor;
    
    dato=escape(dato);
    
    location.href = "/PSPES/goExperto?dato="+dato+"&p1=" + datoP1+"&p2="+datoP2+"&p3="+datoP3+"&p4="+datoP4+"&desde="+feDesde+"&hasta="+feHasta;
    
};


function descargarFileGeneric(url) {
	  if (url == "" ) {
	    mostrarMensajeError("La URL se encuentra vacia");
	    return false;
	  }else {
	    var urldown = url;
	    $.fileDownload(urldown, {
	         preparingMessageHtml: "<p align='center'><br><b> Preparando para descarga el reporte ... </b><br></p>",
	         failMessageHtml: "<p align='center'><br><b> Se ha producido un error. Por favor reitere la operaci&oacute;n.</b><br></p>"
	    });
	  }
	};





//Devuelve uno o cero si esta o no chckeado
function obtenerEstadoCheck(dato)
{
	try {
		
	if( $('#' + dato).is(':checked') ) {
	    return "1";
	}
	} catch (e) {}
     
	return "0";
};


function verSiniestrosPES(dato)
{
	
     location.href = "/PSPES/siniestros?dato="+dato ;
};

function verDetallePolizaPES(dato,poliza)
{
     location.href = "/PSPES/detallePoliza?dato="+dato +"&poliza=" + poliza ;
};

function verDetalleClientePolizaPES(dato,poliza)
{
     location.href = "/PSPES/clientePoliza?dato="+dato +"&poliza=" + poliza ;
};

function actionBusquedaAvanzada(dato1,dato2,dato3)
{
	resetMenuAvanzado();
	if( $('#panelCAvanzado').is(":visible") ){
	
	}
	else
		{
		$('#panelCAvanzado').show(350);

		}
	
	if( $('#panelBAvanzado').is(":visible") ){
		$('#panelBAvanzado').hide();
		$('#'+dato1).text('B\u00FAsqueda Avanzada');
		

	}else{
		
		$('#panelBAvanzado').show();
		$('#'+dato1).text('B\u00FAsqueda Simple');

	}
};





function goBackAll() {
    window.history.back();
};



function enterBuscarHome(event){
	var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
	if (chCode == 13 ) {
		buscarHome();
	}else{
		   return true;
	}
};

function enterBuscarHomeExperto(event){
	var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
	if (chCode == 13 ) {
		buscarHomeExperto();
	}else{
		   return true;
	}
};

function activarCaru()
{
	$('.owl-carousel').owlCarousel({
	    loop:false,
	    margin:10,
	    nav:true,
	    navText:['<<&nbsp;','&nbsp;>>'],
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:3
	        },
	        2000:{
	            items:3
	        }
	    }
	});

};


function mostrarContenidoVerMasVerMenosCardBusqueda(entidad,contador)
{
	
	$('#botomVerMasVerMenos'+entidad+contador).text('Ver menos');
	$('#panelC'+entidad+contador).toggle();
	$('#panelD'+entidad+contador).toggle();
	
	if( $('#panelC'+entidad+contador).is(":visible") )
		$('#botomVerMasVerMenos'+entidad+contador).text('Ver mas');
	
	
	
	
};




function mostrarPoliza(idPanelA,idPanelB,idBoton)
{
	if( $('#'+idPanelA).is(":visible") ){
		$('#'+idPanelA).hide();
		$('#'+idPanelB).show();
		$('#'+idBoton).text('Ver menos');

	}else{
		$('#'+idPanelB).hide();
		$('#'+idPanelA).show();
		$('#'+idBoton).text('Ver mas');
		
	}
};
function abrirPopUpNuevo(idPopUp){
	bloquearPantallaGris();

	$("#"+idPopUp).modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
	$.unblockUI();

};


function abrirPopUpClientePolizaHome(idPopUp){

	var objJson = {
			'valorCliente' : document.getElementById("valorPolizaCliente").value
	};
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosCliente',
	    contentType: 'application/json', 
	    
	    data : JSON.stringify(objJson) ,
		 
	    type : 'POST',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	$.unblockUI();
	    	llenarDinamicamente(json);

			$("#INFO_NU_CLIENTE_P_TF_CLIE_CACN_NU_CEDULA_RIF").html("Cliente :&nbsp#" + json['P_TF_CLIE_CACN_NU_CEDULA_RIF']);
			$("#INFO_NU_CLIENTE_P_TF_CLIE_CACN_NU_CEDULA_RIF").html("Cliente :&nbsp#" + json['P_TF_CLIE_CACN_NU_CEDULA_RIF']);
			$("#INFO_NU_DOC_P_TF_CLIE_CABU_CATU_TP_DOCUMENTO").html("<b>" + json['P_TF_CLIE_CABU_CATU_TP_DOCUMENTO'] +"&nbsp-&nbsp"+json['P_TF_CLIE_CABU_NU_DOCUMENTO']+"</b>" );

	    },
	 
	    error : function(xhr, status) {
	    	mostrarError('Disculpe, existi� un problema');
	    },
	 
	   
	});
	
	
	$("#"+idPopUp).modal({
		 escapeClose: false,
		  clickClose: false,
		  showClose: false,
		  fadeDuration: 400,
		  fadeDelay: 0.05
		});
};

function ocultarEndoso(endoso)
{
	bloquearPantallaGris();
	var valorEndoso=document.getElementById("cantidadEndosos").value;
	$("#valorPolizaEndoso").val(valorEndoso);
	$('#'+endoso).hide();
	$(".seleccionPanelB").each(function(){
 	    $(this).css("background","white");
 	});
	
	$('#panela').hide();
	$('#panelb').show();
	$('#verMasPanelA').text('Ver menos');
	$(".timeline__date").each(function(){
 	    $(this).css("background","white");
 	});
	
	$.unblockUI();

	
};
function verificarCampoJson(dato){
	
	  if (dato != null && dato.length ==  10 && dato.indexOf("-") > 3 ) {
		  return formatearFechaJson(dato);
	  }
	  return dato.charAt(0).toUpperCase() + dato.slice(1);
}

function llenarDinamicamente(json)
{
	for (var prop in json) {
        try {
        	if(json[prop].length == 0 || json[prop] == null)
            	{
            		$("#INFO_"+prop).html("Sin dato").css("color","#b3b0b0");
        			$("#INFO_PANEL_2_"+prop).html("Sin dato").css("color","#b3b0b0");
        		}
        	else
        		{
        		$("#INFO_"+prop).html("<b>" + verificarCampoJson(primeraLetraMayus(json[prop])) + "</b>").css("color","black");
        		$("#INFO_PANEL_2_"+prop).html("<b>" + verificarCampoJson(primeraLetraMayus(json[prop])) + "</b>").css("color","black");
        		
        		}
        	
		} catch (e) { }
    }	
}


function validarCampoVacio(json) {
	try {
		if (json.length == 0 || json == "" || json == null) {
			return "</b><a style='color:#bfbac2;'>Sin dato</a>";
		}
	} catch (e) {}
	return  json;
}


function validarCampoVacioNull(json) {
	try {
		if (json.length == 0 || json == "" || json == "null") {
			return "</b><a style='color:#bfbac2;'>Sin dato</a>";
		}
	} catch (e) {}
	return  json;
}

function validarCampoVacioConGuion(json) {
	try {
		if (json.length == 0 || json == "") {
			return "</b><a style='color:#bfbac2;'>-</a>";
		}
	} catch (e) {}
	return  json;
}
function validarCampoVacioConVacio(json) {
	try {
		if (json.length == 0 || json == "") {
			return "</b>&nbsp;";
		}
	} catch (e) {}
	return  json;
}


function validarCampoVacioNoMostrar(json) {
	try {
		if (json.length == 0 || json == "") {
			return "</b>";
		}
	} catch (e) {}
	return  json;
}




function validarCampoVacioOcultar(json) {
	try {
		if (json.length == 0 || json == "") {
			return "display:none;";
		}
	} catch (e) {}
	return  json;
}





function validarCampoVacioInspecciones(json) {
	try {
		if (json.length == 0 || json == "") {
			return "";
		}
	} catch (e) {}
	return  json + "&nbsp;-&nbsp;";
}




function validarCampoVacioSinB(json) {
	try {
		if (json.length == 0 || json == "") {
			return "<a style='color:#bfbac2;'>Sin dato</a>";
		}
	} catch (e) {}
	return json;
}



function tieneDato(prop,id)
{
if(json[id].length == 0)	
	{
	$("#"+id+"").html("Sin dato").css("color","#b3b0b0");
	}
else
	{
	$("#"+id+"").html("<b>" + json[prop] +"&nbsp;al&nbsp;"+ "</b>").css("color","black");
	}

}


function mostrarDireccionesHome(obj,numContacto,consecutivo,direccionConsecutivo,persona)
{
	
	bloquearPantallaGris();
	$.ajax({
	    url : 'datosContacto',
	    contentType: 'application/json', 
	    
	    data : { consecutivo : consecutivo , direccionConsecutivo : direccionConsecutivo , persona : persona  },
		 
	    type : 'GET',
	 
	    dataType : 'json',
	 
	    success : function(json) {
	    	$.unblockUI();
	    	llenarDinamicamente(json[0]);
	    },
	 
	    error : function(xhr, status) {
	    	mostrarError('Disculpe, existe un problema al cargar las direcciones');
	    },
	 
	   
	});
	
	$(".seleccionPanelB").each(function(){
 	    $(this).css("background","white");
 	});
	$(".timeline__date").each(function(){
 	    $(this).css("background","white");
 	});
	$('#'+obj+numContacto).css("background","#bac2bb");
	var contactoEtiqueta = $('#contacto'+numContacto).html();
	$('#labelPanelContacto').html(contactoEtiqueta);

}


function detallePolizaClienteHome()
{
	bloquearPantallaGris();
	var valorSucursal=document.getElementById("sucursalClienteHome").value;

	var jsonRecuperado = JSON.parse($('#datoTmp').val()); 
	
	var ramo = jsonRecuperado['P_TF_POLI_CACE_CARP_CD_RAMO'];
	var poliza = jsonRecuperado['P_TF_POLI_CACE_CAPO_NU_POLIZA'];

	location.href = "/PSPES/homePoliza?poliza="+poliza+"&ramo="+ramo+"&sucursal="+valorSucursal;
	$.unblockUI();

}

function mostrarPolizasSiniestroHome(obj,endoso,numeroEndoso,tipoEndoso)
{
	
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
	var endosoEtiqueta = $('#etiquetaEndoso'+numeroEndoso +' b').html();
	$('#labelPanelEndoso').html("Endoso " + endosoEtiqueta );
	var imgTimeLine = $('#imgTimeLineEndoso'+numeroEndoso).attr("src");
	$('#imgCliente').attr('src',imgTimeLine);
	
	

	var d1 = document.getElementById("panelImagenEndoso");
	d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+imagenPoliiza+'</i>'; 
	
};


function mostrarImpresionesPolizaHome(obj,endoso,numeroEndoso,tipoEndoso)
{	
	$(".seleccionPanelB").each(function(){
 	    $(this).css("background","white");
 	});
	$(".timeline__date").each(function(){
 	    $(this).css("background","white");
 	});

	
	$('#'+obj).css("background","#bac2bb");
	var endosoEtiqueta = $('#etiquetaEndoso'+numeroEndoso+' b').html();
	$('#labelPanelEndoso').html("Detalle Impresion "+endosoEtiqueta );


	
	
};




function mostrarEndoso(obj,endoso)
{
	
	if( $('#'+endoso).is(":visible") ){
		$('#'+endoso).hide();
		$("#"+obj).removeClass("activoPanelBTimeLine");

	}
	else
		{
		$("#"+obj).addClass("activoPanelBTimeLine");
		$('#'+endoso).show();

		};
		mostrarPoliza('panela','panelb','verMasPanelA');

};

function inicioBusquedaHome(){
	
	try {
		var p1 = document.getElementById("datoSaveP1").value;
		var p2 = document.getElementById("datoSaveP2").value;
		var p3 = document.getElementById("datoSaveP3").value;
		
		var selValue = $('input[name=radio-input]:checked').val(); 
		ocultarMenuAvanzado(null,selValue);

		$('#selectorP1 option[value="'+p1+'"]').attr("selected", true);
		$('#selectorP2 option[value="'+p2+'"]').attr("selected", true);
		$('#selectorP3 option[value="'+p3+'"]').attr("selected", true);
		
		
		jQuery("#filtroIzquierdo"+p3).attr('checked', true);
		
		$("#datoFiltro").focus();
		var dato = $("#datoFiltro").val();
		if(dato == ''){
		mostrarMensaje();
		
		
		shortcut.add("esc",function() {
			$( ".cerrarModalBotonHoover" ).trigger( "click" );

});

		
		}

	} catch (e) {
		alert('Upps, error al iniciar selectores (Error 4545) ...');
	}
	
	 

	iniciarPlaceHolder();
	
};


function inicioClienteHome(){
	$("select.resizeselect").resizeselect();        
	
	 
	$("#labelCantidadRegistrosBusqueda").html( contarResultados() + " resultados");
	
	
	try {
		iniciarFiltro();
	} catch (e) {
	}

};

function contarResultados(){
	var contador = '0';
	 $(".cardResultado").each(function(){
		 if( $(this).is(":visible") ){
			 contador = parseInt(contador) + parseInt('1');
		 }
	 });
	 
	 
	 return contador;
}



function mostrarPolizasRamo(ramo, obj)
{
	
	 $(".ramoAllResult").each(function(){
 	    $(this).hide();
 	});

	 
	 $(".ramo"+ramo).each(function(){
		 $(this).fadeOut('slow').removeClass('hidden');
	 	    /*$(this).show();*/
	 	});
	 
	if(ramo == "0")
		{
		 $(".ramoAllResult").each(function(){
		 	    $(this).show();
		 	});
		 

		}
	
	 $(".ramoFilter").each(function(){
	 	    $(this).css("color","black");
	 	});
	
	$("#"+obj.id).css("color","blue");
	
	$("#labelCantidadRegistrosBusqueda").html( contarResultados() + " resultados");
	
	
};




function filtroEntidad( elemento) {
	
	if( $('#checkFiltroEntidad' + elemento).is(':checked') ) {
		$("#etiquetaFiltroEntidad"+elemento).css("color","black");
		$("#checkFiltroEntidad"+elemento).attr('checked', false);
		
		$(".claseCardBusqueda"+elemento).each(function(){
	 	    $(this).hide();
	 	});
		
		
	}else {
		$("#checkFiltroEntidad"+elemento).attr('checked', true);
		
		$("#etiquetaFiltroEntidad"+elemento).css("color","blue");
		
		$(".claseCardBusqueda"+elemento).each(function(){
	 	    $(this).show();
	 	});
		
		
		
	}
	
}


function filtroGeneral( elemento, obj , valor, contador) {
	var ramo = $('#valorSeleccionadoRamo').val();
    var estado =$('#valorSeleccionadoEstado').val();;
	var cantidad = 0;

	
	if (obj === "1") {

		ramo = valor;
		
		$('#valorSeleccionadoRamo').val(valor);

		$(".ramoFilter").each(function(){
	 	    $(this).css("color","black");
	 	});
	 
		$(".checkRamos").each(function(){
	 	    $(this).attr('checked', false);
	 	});
	 

		
		
		
		if (valor != "0") {
			
			$("#"+elemento.id).css("color","blue");
			$("#elementoCheckRamo" + ramo).attr('checked', true);

		}else{
			
			$("#elementoCheckRamo0").attr('checked', true);
		}

		
		
	}
	if (obj === "2") {
		estado = valor;

		$('#valorSeleccionadoEstado').val(valor);
		
		
		$(".checkEstados").each(function(){
	 	    $(this).attr('checked', false);
	 	});
		
		$(".estadoFilter").each(function(){
		 	    $(this).css("color","black");
		 	});
		
		if (valor != "0") {
			
			$("#"+elemento.id).css("color","blue");
			$("#elementoCheckEstado" + contador).attr('checked', true);

			
		}else {
			$("#elementoCheckEstado0").attr('checked', true);
		}
	}
	
	
	if (obj === "3") {

	}
	

	 $(".ramoAllResult").each(function(){
		 if($(this).hasClass('ramo'+ramo) && $(this).hasClass('estado'+estado.toUpperCase())){
		 	   $(this).show("fast");
		 	    cantidad = parseInt(cantidad) + parseInt(1);
		 }else{
			 
		 	   $(this).hide();

		 }
	 });
	 

    $("#labelCantidadRegistrosBusqueda").html( contarResultados() + " resultados");
	
	
};


function expanderMenuAvanzado(){
			$('#panelCAvanzado').show(350);
		
}

function iniciarPlaceHolder(){


setInterval(function randomPlaceHolder(){ 
	
	var valorRandom = Math.floor(Math.random() * 5 + 1 );
	
	if(valorRandom  == 1){
		$("#datoFiltro").attr("placeholder", "Intentalo con <<NUMERO DE POLIZA>>");
	}
	else if(valorRandom == 2){
		$("#datoFiltro").attr("placeholder", "Intentalo con <<PATENTE>>");
	}
	 else if(valorRandom == 3){
		$("#datoFiltro").attr("placeholder", "Intentalo con <<CODIGO DE PRODUCTOR>>");
	}
	else if(valorRandom == 4){
		$("#datoFiltro").attr("placeholder", "Intentalo con <<NUMERO DE SINIESTRO>>");
	}
	else if(valorRandom == 5){
		$("#datoFiltro").attr("placeholder", "Intentalo con <<DOCUMENTO>>");
		}
	else if(valorRandom == 6){
		$("#datoFiltro").attr("placeholder", "Intentalo con <<APELLIDO>>");
		} 
	}, 3500);

}


function ocultarMenuAvanzado(id,valueIn)
{
	
	$(".ocultarPanel").each(function(){
		$(this).css("display","none");
 	});
	
	$('#polizaIn').prop("disabled", true);
	$('#clienteIn').prop("disabled", true);
	$('#siniestroIn').prop("disabled", true);
	$('#nidIn').prop("disabled", true);
	$('#cotizacionesIn').prop("disabled", true);
	$('#productoresIn').prop("disabled", true);
	
		
	resetMenuAvanzado();
	
	var valorCliente = valueIn;
	if (valueIn == null ) {
		valorCliente = document.getElementById(id).value;
	}
	
		
	if (valorCliente == "100000") {
		
		$('#polizaIn').removeAttr("disabled");
		
		
	 	   	$('#polizaIn' ).css("display","");
	 	   	$('#selectorP1Productor' ).css("display","none");
		 	$('#selectorP1' ).css("display","");
		 	$('#fechaActualizacion' ).css("display","none");
		 	$('#fechaEstados' ).css("display","");
		 	$('#fechaCreacionNid').css("display","none");
		 	$('#fechaCreacion').css("display","");


		 	
	}
		if (valorCliente == "010000") {
			$('#clienteIn').removeAttr("disabled");

			
	 	   	$('#clienteIn' ).css("display","");
	 	   	$('#selectorP1Productor' ).css("display","");
	 	    $('#selectorP1' ).css("display","none");
		 	$('#fechaActualizacion' ).css("display","");
		 	$('#fechaEstados' ).css("display","");
		 	$('#fechaCreacionNid').css("display","none");
		 	$('#fechaCreacion').css("display","");

		}
		if (valorCliente == "001000") {
			$('#siniestroIn').removeAttr("disabled");

			
	 	   	$('#siniestroIn' ).css("display","");
	 	   	$('#selectorP1Productor' ).css("display","none");
	 	    $('#selectorP1' ).css("display","");
		 	$('#fechaActualizacion' ).css("display","");
		 	$('#fechaEstados' ).css("display","");
		 	$('#fechaCreacionNid').css("display","none");
		 	$('#fechaCreacion').css("display","");


		}
		if (valorCliente == "000100") {
			$('#nidIn').removeAttr("disabled");

			
	 	   	$('#nidIn' ).css("display","");
	 	   	$('#selectorP1Productor' ).css("display","none");
	 	   $('#selectorP1' ).css("display","");
		 	$('#fechaActualizacion' ).css("display","");
		 	$('#fechaEstados' ).css("display","none");
		 	$('#fechaCreacionNid').css("display","");
		 	$('#fechaCreacion').css("display","");


		 	
		}
		if (valorCliente == "000010") {
			$('#cotizacionesIn').removeAttr("disabled");

			
	 	   	$('#cotizacionesIn' ).css("display","");
	 	   	$('#selectorP1Productor' ).css("display","none");
	 	    $('#selectorP1' ).css("display","");
	 		$('#fechaActualizacion' ).css("display","none");
		 	$('#fechaEstados' ).css("display","none");
		 	$('#fechaCreacionNid').css("display","none");
		 	$('#fechaCreacion').css("display","");

		}
		if (valorCliente == "000001") {
			$('#productoresIn').removeAttr("disabled");
			
	 	   	$('#productoresIn' ).css("display","");
	 	    $('#selectorP1Productor' ).css("display","");
	 	    $('#selectorP1' ).css("display","none");
	 	    $('#fechaActualizacion' ).css("display","");
		 	$('#fechaEstados' ).css("display","");
		 	$('#fechaCreacionNid').css("display","none");
		 	$('#fechaCreacion').css("display","");


		}
		
}
function redirecVolver(dato1,dato2,dato3)
{
if(dato3){
    location.href = "/PSPES/breadcrumb/"+dato2;
	}
	else{
	    location.href = "/PSPES/breadcrumb/"+dato1;
	}
}

function resetMenuAvanzado()
{
	$("#selectorP1").val('0');
	$("#selectorP2").val('0');
	$("#selectorP3").val('0');	
}

function redirectBreadCrumb(indicadorNivel){
	bloquearPantallaGris();
	location.href= "/PSPES/breadcrumb/"+indicadorNivel;
}

function redirectBreadCrumbExperto(indicadorNivel){
	bloquearPantallaGris();
	location.href= "/PSPES/breadcrumbExperto/"+indicadorNivel;
}
function redirectHome(){
	bloquearPantallaGris();
	location.href= "/PSPES/home";
}


function redirectGO(){
	bloquearPantallaGris();
	location.href= "/PSPES/go";
}




function buscarTablaFiltro(id, value){
    var rows = document.querySelectorAll(id + ' tbody tr');
    
    for(var i = 0; i < rows.length; i++){
        var mostrarRow = false;
        
        var row = rows[i];
        row.style.display = 'none';
        
        for(var x = 0; x < row.childElementCount; x++){
            if(row.children[x].textContent.toLowerCase().indexOf(value.toLowerCase().trim()) > -1){
                mostrarRow = true;
                break;
            }
        }
        
        if(mostrarRow){
            row.style.display = "";
        }
    }
}

function mostrarPanel(panel,idBoton){
	if (document.getElementById){
		var idPanel = document.getElementById(panel);
		
		if(idPanel.style.display == 'none'){
			idPanel.style.display= 'block';
			$('#'+idBoton).text('Ver menos');
		}
		else{
			idPanel.style.display= 'none';
			$('#'+idBoton).text('Ver mas');
		}
	}
}


function abrirPopUpContacto(valorPoliza, valorCliente, valorRamo, valorSucursal, urlContacto){

	bloquearPantallaGris();
	$.ajax({
	    url : urlContacto,
	    contentType: 'application/json', 
	    data : {poliza: valorPoliza, cliente: valorCliente, ramo: valorRamo, sucursal: valorSucursal} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{

	    		var mostrarContactoDireccion = false;
	    		var contAux=0;
	    		
	    		var self={
	    			consecutivo: "",
	    			direccionConsecutivo: "",
	    			persona: ""
	    		};

				$("#datoHeaderModal").html("Contactos");

	    		var descDireccion = '';
	    		var dl;
	    		
    			dl = document.getElementById("direccionesContacto");

    			dl.innerHTML='';
    			var cardDireccion='';

	    		//obtengo los consecutivos para obtener el detalle de cada direccion
	    		for(var int=0; int<json.listadoDirecciones.length; int++){

	    			self.consecutivo = json.listadoDirecciones[int]['P_TF_LISTA_DIRE.CACF_NU_CONSECUTIVO'];
	    			self.direccionConsecutivo = json.listadoDirecciones[int]['P_TF_LISTA_DIRE.CADO_CONSECUTIVO_DIRECCION'];
	    			self.persona = json.listadoDirecciones[int]['P_TF_LISTA_DIRE.CADO_NU_PERSONA'];
	    			descDireccion = json.listadoDirecciones[int]['P_TF_LISTA_DIRE.INB_DE_DIRECCION'];

	    			cardDireccion = cardDireccion + '<div class="timeline__post seleccionPanelB" style="display:none; width:99%;margin-bottom:10px;border-left:3px solid #00317A;padding-bottom:12px" id="numCardContacto'+ int +'">';
	    			cardDireccion = cardDireccion +  '<div class="timeline__content direccionCliente" id="panelModalSiniestroNotas'+int+'" style="overflow:hidden;">';
	    			cardDireccion = cardDireccion +  '<h5 class="datoSiniestroModal" id="notasModalSiniestro'+int+'">'+'<b>'+descDireccion +'</b>'+'</h5>'+'<hr style="margin-top:0px;border-top: 0px solid #00317A;">'; 
	    			cardDireccion = cardDireccion +  '<h6 class="datoSiniestroModal" id="detallesContacto'+int+'">'+'</h6>'+ '</div></div>';

	    			cardDireccion = cardDireccion + '</div></div>';
	    			
	    		}

	    		dl.innerHTML = cardDireccion;
	    		for(var int=0; int<json.listadoDirecciones.length; int++){

	    			self.consecutivo = json.listadoDirecciones[int]['P_TF_LISTA_DIRE.CACF_NU_CONSECUTIVO'];

	    			self.direccionConsecutivo = json.listadoDirecciones[int]['P_TF_LISTA_DIRE.CADO_CONSECUTIVO_DIRECCION'];
	    			self.persona = json.listadoDirecciones[int]['P_TF_LISTA_DIRE.CADO_NU_PERSONA'];
	    			obtenerDatosContacto(int, self.consecutivo, self.direccionConsecutivo, self.persona, function(resultado){
	    				
	    				if(++contAux === json.listadoDirecciones.length){
	    					
	    					if(resultado =="true")
	    					{
		    					$("#mostrarContactoModal").val("1");
		    					mostrarContactoDireccion = true;
	    						$("#mostrarContactoModal").trigger("change");
		    				}
	    					else{
		    					$("#mostrarContactoModal").val("1");
	    						$("#mostrarContactoModal").trigger("change");

	    					}
	    					
	    				}
	    					
	    			});
	    			
	    		}
	    		
	    		$('#mostrarContactoModal').on('change',function(e){
	    			e.preventDefault();
		    	    e.stopImmediatePropagation();

	    			if(mostrarContactoDireccion){
	    				//Abre el modal
			    		$("#contactoDireccionesPopUp").modal({
			    			escapeClose: false,
			    			clickClose: false,
			    			showClose: false,
			    			fadeDuration: 400,
			    			fadeDelay: 0.05
						});
			    		
				    	$.unblockUI();
				    	
	    			}else{
	    				mostrarError("No existe direcciones de contacto");
				    	$.unblockUI();

	    			}
	    			
	    		});
	    		
	    		
	    	}
	    	catch(e)
	    	{    			

		    	$.unblockUI();
	    		mostrarError('Se produjo un inconveniente al cargar los datos del contacto',e);
	    		
	    	}
	    	
	    },
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError(xhr['responseText']);
	    }
	   
	});
	
	
}

function obtenerDatosContacto(numDetalleContacto, consecutivo, direccionConsecutivo, persona, mycallback){
	
	/********************************************************************
	 ***********Obtener detalle de cada direccion del contacto************
	 ********************************************************************/
	$.ajax({
		url : 'datosContacto',
		contentType: 'application/json', 
    
		data : { consecutivo : consecutivo , direccionConsecutivo : direccionConsecutivo , persona : persona  },
	 
		type : 'GET',
 
		dataType : 'json',
 
		success : function(json) {
			
			var resultado = "true";
			
			self={};
			
			/*Valido los campos para no mostrar el card con datos vacios.
			  Elimino el card de los datos vacios.
			*/
			if(json[0]['P_TF_DETALLE_CADO_DE_CALLE'] ==""
				&& json[0]['P_TF_DETALLE_GECP_CD_CODIGO_POSTAL'] == ""
				&& json[0]['P_TF_DETALLE_CADO_DE_NUMERO'] == ""
				&& json[0]['P_TF_DETALLE_INB_DE_LOCALIDAD'] == ""
				&& json[0]['P_TF_DETALLE_CADO_DE_PISO'] == ""
				&& json[0]['P_TF_DETALLE_INB_DE_PROVINCIA'] == ""
				&& json[0]['P_TF_DETALLE_CADO_DE_DEPARTAMENTO'] ==""
				&& json[0]['P_TF_DETALLE_CADO_DE_UNIDAD'] =="" 
				&& json[0]['P_TF_DETALLE_INB_DATO_CONTACTO'] ==""){
				
				var numeroCardContacto = '#numCardContacto'+numDetalleContacto;
				$(numeroCardContacto).remove();
								
			}else{
				
				var numeroCardContacto = '#numCardContacto'+numDetalleContacto;
				$(numeroCardContacto).css('display','');
				
				
				var cardDetalle = "detallesContacto"+numDetalleContacto;
				var cardDireccion = document.getElementById(cardDetalle);
				cardDireccion.innerHTML = '';
				var cardDireccionNuevo='';
				
				cardDireccionNuevo = cardDireccionNuevo + '<div class="row">';
				cardDireccionNuevo = cardDireccionNuevo + '<div class="col-md-6" style="'+validarCampoVacioOcultar(json[0]['P_TF_DETALLE_CADO_DE_CALLE'])+'";>'+ "Calle: " + '<b>'+  primeraLetraMayus(validarCampoVacio(json[0]['P_TF_DETALLE_CADO_DE_CALLE']))+'.</b>' + '</div>';
				cardDireccionNuevo = cardDireccionNuevo + '<div class="col-md-6" style="'+validarCampoVacioOcultar(json[0]['P_TF_DETALLE_GECP_CD_CODIGO_POSTAL'])+'";>'+ "Cod. Postal: " + '<b>'+  validarCampoVacio(json[0]['P_TF_DETALLE_GECP_CD_CODIGO_POSTAL'])+'.</b>' + '</div>';
				cardDireccionNuevo = cardDireccionNuevo + '</div>';
				
				cardDireccionNuevo = cardDireccionNuevo + '<div class="row">';
				cardDireccionNuevo = cardDireccionNuevo + '<div class="col-md-6" style="'+validarCampoVacioOcultar(json[0]['P_TF_DETALLE_CADO_DE_NUMERO'])+'";>'+ "Numero: " + '<b>'+  validarCampoVacio(json[0]['P_TF_DETALLE_CADO_DE_NUMERO'])+'.</b>' + '</div>';
				cardDireccionNuevo = cardDireccionNuevo + '<div class="col-md-6" style="'+validarCampoVacioOcultar(json[0]['P_TF_DETALLE_INB_DE_LOCALIDAD'])+'";>'+ "Localidad: "+ '<b>'+  primeraLetraMayus(validarCampoVacio(json[0]['P_TF_DETALLE_INB_DE_LOCALIDAD']))+'.</b>' + '</div>';
				cardDireccionNuevo = cardDireccionNuevo + '</div>';
				
				cardDireccionNuevo = cardDireccionNuevo + '<div class="row">';
				cardDireccionNuevo = cardDireccionNuevo + '<div class="col-md-6" style="'+validarCampoVacioOcultar(json[0]['P_TF_DETALLE_CADO_DE_PISO'])+'";>'+ "Piso: " +'<b>'+ validarCampoVacio(json[0]['P_TF_DETALLE_CADO_DE_PISO'])+'.</b>' + '</div>';
				cardDireccionNuevo = cardDireccionNuevo + '<div class="col-md-6" style="'+validarCampoVacioOcultar(json[0]['P_TF_DETALLE_INB_DE_PROVINCIA'])+'";>'+ "Provincia: " + '<b>'+  primeraLetraMayus(validarCampoVacio(json[0]['P_TF_DETALLE_INB_DE_PROVINCIA']))+'.</b>' + '</div>';
				cardDireccionNuevo = cardDireccionNuevo + '</div>';
				
				cardDireccionNuevo = cardDireccionNuevo + '<div class="row">';
				cardDireccionNuevo = cardDireccionNuevo + '<div class="col-md-6" style="'+validarCampoVacioOcultar(json[0]['P_TF_DETALLE_CADO_DE_DEPARTAMENTO'])+'";>'+ "Departamento: " + '<b>'+  validarCampoVacio(json[0]['P_TF_DETALLE_CADO_DE_DEPARTAMENTO'])+'.</b>' + '</div>';
				cardDireccionNuevo = cardDireccionNuevo + '<div class="col-md-6" style="'+validarCampoVacioOcultar(json[0]['P_TF_DETALLE_CADO_DE_UNIDAD'])+'";>'+ "Unidad: " + '<b>'+  validarCampoVacio(json[0]['P_TF_DETALLE_CADO_DE_UNIDAD'])+'.</b>' + '</div>';
				cardDireccionNuevo = cardDireccionNuevo + '</div>';
				
				cardDireccionNuevo = cardDireccionNuevo + '<div class="row">';
				cardDireccionNuevo = cardDireccionNuevo + '<div class="col-md-6">'+ "Contacto: " + '<b>'+  validarCampoVacio(json[0]['P_TF_DETALLE_INB_DATO_CONTACTO'])+'</b>' + '</div>';
				cardDireccionNuevo = cardDireccionNuevo + '</div>';

				cardDireccion.innerHTML = cardDireccionNuevo;
								
			};
			
			//verifico si existen cards con los datos de contacto
			if($("#direccionesContacto").children().length!=0){
				mycallback(resultado);
			}else{
				resultado = "false";
				mycallback(resultado);
			}
			
			
		},
 
		error : function(xhr, status) {
			mostrarError('Disculpe, existe un problema al cargar las direcciones');
		},
   
	});
}


function mostrarMensaje(){
	
	$.ajax({
	    url : 'mensajes',
	    contentType: 'application/json', 
	    data : { },
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	  
	    		if(json.length != 0 && json.length>=1){
	    			var d1 = document.getElementById("datosParametricosMensajesinicio");
			    		var mensajesDatos = "";
			    		for ( var int = 0; int < json.length ; int++) {
				    			 mensajesDatos = mensajesDatos +"<h5 style='text-align:left;border:none;text-align:justify;line-height:1.5;letter-spacing:2px;'>"+ json[int]['mensaje']+"</h5><br>";
			    			}
			    	    	d1.innerHTML =mensajesDatos;

			    		$("#mensajeInicioModal").modal({
							 escapeClose: false,
							  clickClose: false,
							  showClose: false,
							  fadeDuration: 400,
							  fadeDelay: 0.05
							});
	    		}	
			$.unblockUI();
	    	}
	    	
	    	catch(e)
	    	{
		    	mostrarError('Por favor informe a sistema con el cod de error:1198716.',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {

	    },
	 
	   
	});
	

};


function inicioGoExperto(){
	
	var entidad = $('#valorSelectorEntidadExperto').val();
	
	var ramo = $('#valorSelectorRamoExperto').val();
	var selectPor = $('#valorSelectorPorExperto').val();
	var selectEstado = $('#valorSelectorEstadoExperto').val();
	var fechaDesde= $('#valorSelectorFechaDesdeExperto').val();;
	var fechaHasta= $('#valorSelectorFechaHastaExperto').val();
	
	
	  if($('#valorSelectorEntidadExperto').val()=='00'){
			document.getElementById("selectorExpertoEntidad").value = "01";
	  }else{
		  $("#selectorExpertoEntidad").val(entidad);
	  }

	  if($('#valorSelectorEstadoExperto').val()=='T'){
		  $("#selectorExpertoEstado").val('T');
	  }else{
		  if($('#valorSelectorEstadoExperto').val()!='V' && $('#valorSelectorEstadoExperto').val()!='N'){
			  $("#selectorExpertoEstado").val('T');
		  }else{
			  $("#selectorExpertoEstado").val(selectEstado);
		  }
	  }

	  $("#selectorExpertoRamo").val(ramo);
	  $("#inputGoExpertoDesde").val(fechaDesde);
	  $("#inputGoExpertoHasta").val(fechaHasta);

	  var selectorExpertoEntidad = document.getElementById("selectorExpertoEntidad").value;
	  if( selectorExpertoEntidad == '02'){
		  $("#selectorExpertoPor").val(selectPor);

	  }else {
				$('#selectorExpertoPor').prop("disabled", true);
				$('#selectorExpertoEstado').prop("disabled", true);
				if(selectorExpertoEntidad == '01' || selectorExpertoEntidad== '03'){
					$('#selectorExpertoRamo').prop("disabled", true);
				}
				
				$('#selectorExpertoPor').append($('<option>', {
				    value: '00',
				    text: 'Todo'
				}));
				$('#selectorExpertoPor option[value="00"]').prop("selected", true);
				
				$('#selectorExpertoRamo option[value="0"]').prop("selected", true);
				$('#selectorExpertoEstado option[value="T"]').prop("selected", true);
		
	  }
	  
	  if(selectEstado == 'V')
		  jQuery("#filtroIzquierdo07").attr('checked', true);
	  if(selectEstado == 'N')
		  jQuery("#filtroIzquierdo08").attr('checked', true);
		
	 $("#datoFiltro").focus();
	  
	 //Se deshabilita las opciones de fecha desde - hasta porque todavia
	 //no hay funcionalidad
	 
	  $('#datepickerGoExpertoDesde').datepicker({
			defaultDate:"",
			format: 'dd/mm/yyyy',
		    minViewMode: 0,
		    firstDay: 1,
		    language: 'es',
		    orientation: 'bottom auto',
		    autoclose:true,
		    multidate: false
		});

		
	  $('#datepickerGoExpertoHasta').datepicker({
			defaultDate:"",
			format: 'dd/mm/yyyy',
		    minViewMode: 0,
		    firstDay: 1,
		    language: 'es',
		    orientation: 'bottom auto',
		    autoclose:true,
		    multidate: false
		});
		
	  
	  //Valido fechas de entrada desde - hasta
	 
		$('#datepickerGoExpertoDesde').datepicker({
		    startDate: '+5d',
		    endDate: '+35d',
		}).on('changeDate',
		    function (selected) {
		        
		        if(!($('#inputGoExpertoHasta').val().length>0)){
		        	if(!($('#inputGoExpertoDesde').val().length>0)){
		        		$('#datepickerGoExpertoHasta').datepicker('setDate', null);
		        	}else{
		        		$('#datepickerGoExpertoHasta').datepicker('setStartDate', getDate(selected));
			        	document.getElementById("inputGoExpertoHasta").focus();
		        	}
		        }else{
		        	if(validarFechaMenorActual($('#inputGoExpertoDesde').val(), $('#inputGoExpertoHasta').val())){
		        		$('#datepickerGoExpertoHasta').datepicker('setStartDate', getDate(selected));
			        	document.getElementById("inputGoExpertoHasta").focus();
		        	}
		        }
		        
		    });

		$('#datepickerGoExpertoHasta').datepicker({
		    startDate: '+6d',
		    endDate: '+36d',
		}).on('changeDate',
		    function (selected) {
		        
		        if(!($('#inputGoExpertoDesde').val().length>0)){
		        	if(!($('#inputGoExpertoHasta').val().length>0)){
		        		$('#datepickerGoExpertoDesde').datepicker('setDate', null);
		        	}else{
		        		$('#datepickerGoExpertoDesde').datepicker('setEndDate', getDate(selected));
		        		document.getElementById("inputGoExpertoDesde").focus();
		        	}
		        }

		    });

			$.unblockUI();
			
}


function habilitarSelectorExperto(){
	var selectorExpertoEntidad = document.getElementById("selectorExpertoEntidad").value;
	
	var arrayEntidad = [ '01', '03'];
	
	
	if(arrayEntidad.indexOf(selectorExpertoEntidad)<0){
		$('#selectorExpertoPor').removeAttr("disabled");
		$('#selectorExpertoEstado').removeAttr("disabled");
		$('#selectorExpertoRamo').removeAttr("disabled");

		$('#selectorExpertoPor').css("display", "");
		$('#selectorExpertoEstado').css("display", "");
		$('#selectorExpertoRamo').css("display", "");
		
		$("#selectorExpertoPor option[value='00']").remove();


	}
	else{
		$('#selectorExpertoPor').prop("disabled", true);
		$('#selectorExpertoEstado').prop("disabled", true);
		if(selectorExpertoEntidad == '01' || selectorExpertoEntidad == '03'){
			$('#selectorExpertoRamo').prop("disabled", true);

		}
		
		$('#selectorExpertoPor').append($('<option>', {
		    value: '00',
		    text: 'Todo'
		}));
		$('#selectorExpertoPor option[value="00"]').prop("selected", true);
		
		$('#selectorExpertoRamo option[value="0"]').prop("selected", true);
		$('#selectorExpertoEstado option[value="T"]').prop("selected", true);
		
	}
	
	document.getElementById("inputGoExpertoDesde").value="";
	document.getElementById("inputGoExpertoHasta").value="";
	
}

function getIconoEndoso(tipoEndoso) {
	
	if (tipoEndoso == null) 
		return '';
	var endoso = tipoEndoso; 
	if (endoso=='A') //Anulacion 
		return '/PSPES/resources/img/rector/timeLine/formularioAnulacion.svg';
	
	if (endoso == 'C') //recuotificacion 
		return '/PSPES/resources/img/rector/timeLine/calendarioAzul.svg';
	
	if (endoso=='E') // emision 
		return '/PSPES/resources/img/rector/timeLine/emisionAzul.svg';
	
	if (endoso == 'F') // refacturacion 
		return '/PSPES/resources/img/rector/timeLine/bolsaDineroAzul.svg';
	
	if (endoso =='H') //rehabilitacion 
		return '/PSPES/resources/img/rector/timeLine/tildeVerde.svg';
	
	if (endoso=='L') //endoso cualitativo 
		return '/PSPES/resources/img/rector/timeLine/formularioCualitativoAzul.svg';
	
	if (endoso=='M') //endoso cuantitativo negativos 
		return '/PSPES/resources/img/rector/timeLine/bolsaDineroRojo.svg';
	
	if (endoso=='N') //endoso cuantitativo 
		return '/PSPES/resources/img/rector/timeLine/bolsaDineroVerde.svg';
	
	if (endoso=='P') //pago  
		return '/PSPES/resources/img/rector/timeLine/pesosAzul.svg';
	
	if (endoso=='R') //renovacion 
		return '/PSPES/resources/img/rector/timeLine/emisionAzul.svg';
	
	if (endoso=='T') //transferencia propiedad
		return '/PSPES/resources/img/rector/timeLine/flechasAzul.svg';
	
	if (endoso=='U') //reverso ultimo endoso 
		return '/PSPES/resources/img/rector/timeLine/undo.svg';
	
	return '';
}

function validarEmail(elemento){

	  var texto = document.getElementById(elemento).value;
	  var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	  
	  var checkEmail=false;
	  if (regex.test(texto)) {
		  checkEmail = true;
	  }
	  
	  return checkEmail;

}

//Descomentar lineas al momento de usar el filtro por fecha
//en modo Experto

var getDate = function (input) {
	return new Date(input.date.valueOf());
};

var validarFechaMenorActual = function(desde, hasta){
	var x=new Date();
	var fechaDesde = desde.split("/");
	x.setFullYear(fechaDesde[2],fechaDesde[1]-1,fechaDesde[0]);
	
	var y = new Date();
	var fechaHasta = hasta.split("/");
	y.setFullYear(fechaHasta[2],fechaHasta[1]-1,fechaHasta[0]);
	
	if (x >= y)
		return true;
	else
		return false;
};


//Ocultar seccion al scrollear hacia abajo
$(window).scroll(function () { 
	$(this).scrollTop() < 50 ?
        $('.ocultarNavBar').removeClass('hidden'):
		$('.ocultarNavBar').addClass('hidden');
});


function redirectHome(){
	bloquearPantallaGris();
    location.href="/PSPES/home";
}

function redirectGo(){
	bloquearPantallaGris();
    location.href="/PSPES/go";
}



function redirectExperto(){
	bloquearPantallaGris();
    location.href="/PSPES/goExperto";
}




function validarCampoVacioNull(palabra){
		try {
			if (palabra == '' || palabra == null) {
				return "&nbsp;-&nbsp;";
			}
		} catch (e) {}
		return palabra;

}
function ocultarMenuBotones(){
	if( $('#panelABotones').is(":visible") ){
		$('#panelABotones').css("display","none");
		$("#botonMasMenosPanelA").removeClass("fas fa-minus");
		$("#botonMasMenosPanelA").addClass("fas fa-plus");
	}else{
		 $('#panelABotones').css("display","");
		 $("#botonMasMenosPanelA").removeClass("fas fa-plus");
		 $("#botonMasMenosPanelA").addClass("fas fa-minus");
	}
}


function esAfiliado(){
	var dato = $("#afiliadoDoc").val();
	if(dato == "" || dato.length <1){
		Swal.fire({
			  type: 'info',
			  text: 'El campo no puede estar vac\u00EDo',
			})
			
			$("#contenidoAyuda").css("display","");
		$("#resultadoAfiliado").css("display","none");
		
			
	}else{
		bloquearPantallaGris();
	 $.ajax({
	    url : 'datosAfiliado',
	    contentType: 'application/json', 
	    data : {dato:dato},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		
	    		if(json[0]['P_TF_CEPG_CEPG_ST_ESTADO'] == "B"){
	    			$("#textoAfiliado").html('<b>La persona no existe en el padr\u00F3n del Programa de Empleados.</b> &nbsp; <i style="font-size: 30px;color:red;" class="fas fa-user-times"></i>');
	    	    	$("#datosAfiliado").css("display","none");

	    		}else{
	    			$("#textoAfiliado").html('<b>La persona existe en el padr\u00F3n del Grupo Provincia.</b> &nbsp; <i style="font-size: 30px;color: #077e07;" class="fas fa-user-check"></i>');
	    			$("#documento").html("<b>"+json[0]['P_TF_CEPG_CEPG_NU_DOCUMENTO']+"</b>");
	    			$("#apellido").html("<b>"+json[0]['P_TF_CEPG_CEPG_DE_PERSONA']+"</b>")
	    			$("#altaEstado").html("<b>"+json[0]['P_TF_CEPG_INB_DSP_ESTADO']+"</b>")
	    			$("#datosAfiliado").css("display","");
	    		}
	    		$("#contenidoAyuda").css("display","none");
	    		$("#resultadoAfiliado").css("display","");
	    		
	    		
		    	$.unblockUI();
	    	}catch(e)
	    	{
		    	mostrarError('Error al cargar los datos del afiliado',e);
	    		
	    	}
	    	},
	    error : function(xhr, status) {
    		$("#textoAfiliado").html('<b>La persona no existe en el padr\u00F3n del Programa de Empleados.</b> &nbsp; <i style="font-size: 30px;color:red;" class="fas fa-user-times"></i>');
    		$("#documento").html("");
    		$("#apellido").html("")
    		$("#altaEstado").html("")
    		$("#fechaIn").html("")
    		$("#contenidoAyuda").css("display","none");
	    	$("#resultadoAfiliado").css("display","");
	    	$("#datosAfiliado").css("display","none");
	    	
	    		
	    	$.unblockUI();

	    },
	 
	   
	});
}
}

