

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


function topFunction()
{
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};





function relocate_home()
{
	bloquearPantallaGris();
	document.getElementById("clienteLoginForm").submit();
};





function loginEnter(event)
{
	var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
	if (chCode == 13 ) {
		relocate_home();
	}else{
		   return true;
	}
};


function relocate_home_sin()
{
	bloquearPantallaGris();
	 document.getElementById("clienteLoginForm").submit();

};


function execute_registracion()
{
	bloquearPantallaGris();
	document.getElementById("formAction").submit();
};

function volverInicioRegistracion()
{
	bloquearPantallaGris();
	 location.href = "/PSClientes/clienteLoginRegistrarPasswordInicio";
};

function volverInicioPassoword()
{
	bloquearPantallaGris();
	 location.href = "/PSClientes/clienteLoginRecuperarPasswordInicio";
};


function solicitarAutorizacion(){
	bloquearPantallaGris();
	var nomApe = document.getElementById("nomApe").value;
	var email = document.getElementById("emailIn").value;
	var usuarioRed = document.getElementById("usuarioRedIn").value;
	var mensaje = document.getElementById("mensajeIn").value;
	
	location.href="/PSPES/loginAuthIn?nomApe=" +nomApe+'&email='+email + '&usuarioRed=' +usuarioRed + '&mensaje='+mensaje; 
	
}
