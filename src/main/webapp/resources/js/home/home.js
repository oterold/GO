			
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
		location.href="http://bloasp:7778/forms/frmservlet?config=RECTORLB";
	}