function mostrarAyudaHome(id,img){
	bloquearPantallaGris();
	$(".timeline__post").each(function(){
 	    $(this).css("background","white");
 	});
	$('#'+id).css("background","#bac2bb");

	var d1 = document.getElementById("panelImagenAyuda");
	d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+img+'</i>'; 
	
	//HOME
	if(id == "cuadroAyudaHome0"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Pantalla interactiva que contiene todas las aplicaciones que integran a GO. La funcionalidad es poder desplazarse entre las mismas, sin necesidad de salir o cambiar de aplicaci&oacute;n.</h5>'+
			'<h5 style="border:none;line-height: 1.3"> Dentro del proyecto podemos encontrar: </h5>'+
			'<ul style="padding-top:0px;">'+
			'<li><h6>Busquedas GO.</h6></li>'+
            '<li><h6>Experto.</h6></li>'+
            '<li><h6>Moneda.</h6></li>'+
            '<li><h6>Promociones.</h6></li>'+
            '<li><h6>Siniestros.</h6></li>'+
			'<li><h6>Contacto.</h6></li>'+
			'<li><h6>Ayuda.</h6></li></ul>'; 
			'<li><h6>Rector.</h6></li></ul>'; 
			'<li><h6>Salir.</h6></li></ul>'; 
	}
	//Busquedas
	if(id == "cuadroAyudaHome1"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Go permite realizar 4.488 combinaciones posibles de b&uacute;squedas, entre las entidades principales y su b&uacute;squeda avanzada.</h5>'+
			'<h5 style="border:none;line-height: 1.3"> Entidades : </h5>'+
			'<ul style="padding-top:0px;">'+
			'<li><h6>P&oacute;liza</h6></li>'+
            '<li><h6>Clientes</h6></li>'+
            '<li><h6>Siniestros</h6></li>'+
            '<li><h6>Nids</h6></li>'+
			'<li><h6>Productores</h6></li>'+
			'<li><h6>Cotizaciones</h6></li></ul>'; 
	}
	
	//busqueda vanzada
	if(id == "cuadroAyudaHome2"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Permite reducir el resultado de la b&uacute;squeda, a trav&eacute;s de tres selectores. Los mismos representan al ramo, al tipo de b&uacute;squeda (por numero de p&oacute;liza, por n&uacute;mero de cliente, etc) y su vigencia o creaci&oacute;n.</h5>';
	}
	
	//Topologia Pantallas
	if(id == "cuadroAyudaHome3"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Las pantallas que integran a la aplicaci&oacute;n se distribuyen en 4 paneles A ,B , C y D. Los primeros tres, siempre se encuetran visibles y el ultimo solamente cuando se seleccione una opci&oacute;n del panel B.</h5>';
	}
	//exportar a excel
	if(id == "cuadroAyudaHome5"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Go permite poder exportar las b&uacute;squedas que se realizan de las distintas entidades a Excel.</h5>';
	}
//descagar poliza
	if(id == "cuadroAyudaHome6"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Go cuenta con la posiblidad de poder descargar la p&oacute;liza, de cualquier endoso en un formato PDF.</h5>';
	}
	//resposive
	if(id == "cuadroAyudaHome7"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">La aplicaci&oacute;n redimensiona y coloca los elementos de la web de forma que se adapten al ancho de cada dispositivo permitiendo una correcta visualizaci&oacute;n y una mejor experiencia de usuario.</h5>';
	}
	//tecnologia
	if(id == "cuadroAyudaHome8"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Las tecnologias que se usaron en la creaci&oacute;n del proyecto son herramientas de desarrollo modernas.</h5>'+
		'<ul style="padding-top:0px;">'+
		'<li><h6>HTML 5</h6></li>'+
        '<li><h6>JavaScript</h6></li>'+
        '<li><h6>Boostrap / Responsive</h6></li>'+
        '<li><h6>Servicios Web</h6></li></ul>';
	
	}
	
	
	//modo experto
	if(id == "cuadroAyudaHome9"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Se desarrollo para el usuario experto que necesita realizar b&uacute;squedas mas espec&iacute;ficas, incluyendo el resto de las entidades que no se encuentran en GO Busuqedas.</h5>';
	
	}
	
	
	
	//promociones
	if(id == "cuadroAyudaHome10"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Go permite una b&uacute;squeda agil de promociones, en las cuales se van a poder editar o crear nuevas.</h5>';
	
	}
	
	
	
	//siniestro
	if(id == "cuadroAyudaHome11"){
		var d1 = document.getElementById("contenidoAyuda");
		d1.innerHTML = '<h5 style="border:none;line-height: 1.3">Estamos construyendo la nueva bandeja de visualizaci&oacute;n de las tareas de siniestros, para mostrar la informaci&oacute;n de una manera mas intuitiva y amigable para el usuario.</h5>';
	
	}
	$.unblockUI();
	
}


function inicioAyudaHome(){
	
	bloquearPantallaGris();
	$( '#cuadroAyudaHome0').trigger( "click" );
	$.unblockUI();
	
}