function inicioSiniestroBPBA(){

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

function redirectHomeBpba(){
	bloquearPantallaGris();
	location.href = "/PSPES/homeBPBA";
}

function redirectDenunciaSiniestro(){
	datosSiniestroProducto();
}

function datosSiniestroProducto(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroProducto";
}


function datosAseguradoSiniestro(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroAsegurado";
	
}

function datosSiniestroDeudaAsegurada(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroDeudaAsegurada";
}

function datosSiniestroFallecimiento(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroFallecimiento";
}

function datosSiniestroPago(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroPago";
}

function datosSiniestroFinalizacion(){
	bloquearPantallaGris();
	location.href = "/PSPES/bpbaSiniestroFinalizacion";
}