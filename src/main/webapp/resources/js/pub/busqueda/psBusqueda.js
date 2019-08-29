function selectCheck(dato) {

if (dato == "1") {
	verificarCheck2();
	verificarCheck3();
	verificarCheck4();
	verificarCheck5();
	verificarCheck6();
}

if (dato == "2") {
	verificarCheck1();
	verificarCheck3();
	verificarCheck4();
	verificarCheck5();
	verificarCheck6();
	
}
if (dato == "3") {
	verificarCheck1();
	verificarCheck2();
	verificarCheck4();
	verificarCheck5();
	verificarCheck6();
	
}
if (dato == "4") {
	verificarCheck1();
	verificarCheck2();
	verificarCheck3();
	verificarCheck5();
	verificarCheck6();
	
}
if (dato == "5") {
	verificarCheck1();
	verificarCheck2();
	verificarCheck3();
	verificarCheck4();
	verificarCheck6();
	
}
if (dato == "6") {
	verificarCheck1();
	verificarCheck2();
	verificarCheck3();
	verificarCheck4();
	verificarCheck5();
}


}

function verificarCheck1(dato) {
	if (($('#checkEntidadPoliza').is(':checked')))
		$('#labelCheck1').click();
	
}


function verificarCheck2(dato) {
	if ($('#checkEntidadCliente').is(':checked'))
		$('#labelCheck2').click();
}


function verificarCheck3(dato) {
	if ($('#checkEntidadSiniestro').is(':checked'))
		$('#labelCheck3').click();
}


function verificarCheck4(dato) {
	if ($('#checkEntidadNid').is(':checked'))
		$('#labelCheck4').click();
}


function verificarCheck5(dato) {
	if ($('#checkEntidadCotizacion').is(':checked'))
		$('#labelCheck5').click();
}


function verificarCheck6(dato) {
	if ($('#checkEntidadProductor').is(':checked'))
		$('#labelCheck6').click();
}




