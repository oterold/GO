			
function menuSiniestro(){
	$(".ocultarMenuHover").each(function(){
 	    $(this).css("display","none");
 	});
	
	$(".menuSiniestroHover").each(function(){
 	    $(this).css("display","block !important");
 	});
	
	
	
}		

function redirectGoHome(){
	bloquearPantallaGris();
	location.href="/PSPES/home";
}			

function redirectGoHomeMas(){
	bloquearPantallaGris();
	location.href="/PSPES/homeMas";
}			


function redirectRectorHome(){
	var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if(es_chrome){
		Swal.fire({
			 title:"Hola !! Para utilizar Rector deber&aacute; ingresar con Internet Explorer.",
		       text: "GO Team.",
		       type: "info",
		       customClass: 'modificar-sweetalert',
		})
	}
	else{
		location.href="http://bloasp:7778/forms/frmservlet?config=RECTORLB";
	}
		
		
	}