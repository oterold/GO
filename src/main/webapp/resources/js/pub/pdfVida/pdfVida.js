
function inicioPdfVida(){
	try {
		
		
	$(document).ready(function(){
		  $('#cuit').mask('00-00000000-0');
		  $('#Numero').mask('0000-0000-0000-0000');
		});
		new Card({
			form: document.querySelector('form'),
			container: '.card-wrapper'
		});
		
		
		// Data Picker Initialization
		$('.datepicker').pickadate({
			
			monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
			             'Noviembre', 'Diciembre'],
			monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
			weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
			today: 'Hoy',
			clear: 'Limpiar',
			close: 'Cerrar',
			labelMonthNext: 'Proximo mes',
			labelMonthPrev: 'Anterior mes',
			labelMonthSelect: 'Seleccione un mes',
			labelYearSelect: 'Seleccione un año',
			
		});
		
	} catch (e) {
		// TODO: handle exception
	}
	 
}

try {
	// Example starter JavaScript for disabling form submissions if there are invalid fields
	(function () {
	  'use strict';
	  window.addEventListener('load', function() {
	    // Fetch all the forms we want to apply custom Bootstrap validation styles to
	    var forms = document.getElementsByClassName('needs-validation');
	    // Loop over them and prevent submission
	    var validation = Array.prototype.filter.call(forms, function(form) {
	      form.addEventListener('submit', function(event) {
	        if (form.checkValidity() === false) {
	          event.preventDefault();
	          event.stopPropagation();
	        }
	        form.classList.add('was-validated');
	      }, false);
	    });
	  }, false);
	})();
} catch (e) {
	// TODO: handle exception
}


function redirectGenerales(){
	bloquearPantallaGris();
	location.href="/PSPES/cotizadorGenerales";
}
function redirectBienes(){
	
	bloquearPantallaGris();
	location.href="/PSPES/cotizadorBienes";
}
function redirectPlanes(){
	bloquearPantallaGris();

	location.href="/PSPES/cotizadorPlanes";
}
function redirectFin(){
	bloquearPantallaGris();

	location.href="/PSPES/cotizadorFin";
}
function redirectCoti(){
	bloquearPantallaGris();

	location.href="/PSPES/cotizador";
}

function redirectPdfVidaDatos(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaStep1";
}

function actualizarPorciento(porcentaje){
	$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentaje+"%)");
}

function cambiarPorcentaje(id,idInputOculto,suma){
	var valor= document.getElementById(id).value;
	var porcentajeActual= document.getElementById("porcentajeActual").value;
	var inputOculto= document.getElementById(idInputOculto).value;
	var suma = parseInt(suma);
	if(valor != '' && inputOculto == 0){
		porcentajeActual = parseInt(porcentajeActual) + suma;
	$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentajeActual+"%)");
	$("#porcentajeActual").val(porcentajeActual);
	$("#"+idInputOculto).val(1);
	// $('#'+id).removeAttr('onchange');
	}else if(valor == '' && inputOculto != 0){
		porcentajeActual = parseInt(porcentajeActual) - suma;
		$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentajeActual+"%)");
		$("#porcentajeActual").val(porcentajeActual);
		$("#"+idInputOculto).val(0);
	}
}
	
	function cambiarPorcentajeSelector(id,idInputOculto,suma){
		var porcentajeActual= document.getElementById("porcentajeActual").value;
		var select = document.getElementById(id);
		var valorSelect = select.options[select.selectedIndex].value;
		var inputOculto= document.getElementById(idInputOculto).value;
		var suma = parseInt(suma);
		if(valorSelect != 0 && inputOculto == 0){
			porcentajeActual = parseInt(porcentajeActual) + suma;
		$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentajeActual+"%)");
		$("#porcentajeActual").val(porcentajeActual);
		$("#"+idInputOculto).val(1);

		}else if(valorSelect == 0 && inputOculto != 0){
			porcentajeActual = parseInt(porcentajeActual) - suma;
			$('#porcentajeTitulo').text("Cotizaci\u00D3n ("+porcentajeActual+"%)");
			$("#porcentajeActual").val(porcentajeActual);
			$("#"+idInputOculto).val(0);

		}
}
function redirectPdfVidaDatosB(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaStep2";
}
 
function redirectHomeBpba(){
	bloquearPantallaGris();

	location.href="/PSPES/homeBPBA";
	
}

function redirectDatosRiesgo(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaStep3";
}
function redirectDatosAcreedor(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaStep4";
}
function redirectPdfVida(){
	bloquearPantallaGris();

	location.href="/PSPES/bpba";
}


function redirectPdfVidaFin(){
	bloquearPantallaGris();

	location.href="/PSPES/bpbaFin";
}


