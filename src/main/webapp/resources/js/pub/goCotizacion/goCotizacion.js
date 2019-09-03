function agregarAccesorios(){
	//obtengo el monto final para mostrar
	var montoFinal = $("#montoFinal").val()
	
	//obtengo el monto de cada accesorio
	var montoAccesorios = $("#montoAccesorios").val();
	
	
	//obtengo datos del select
	var datosAccesorios = new Object();
	datosAccesorios = llenarDatosAccesorios();
	
	cargarPanelAgregadoAccesorios(datosAccesorios,montoAccesorios);
	//guardo el valor final
	$("#montoFinal").val(parseInt(montoAccesorios) + parseInt(montoFinal))
	$("#listaTotalAccesorios").css("display","");
	$("#valorAccesorios").text(formatearMonedaCotizador(parseInt(montoAccesorios) + parseInt(montoFinal)));
	setearSelectoraccesoriosInicio();
}


function cargarPanelAgregadoAccesorios(obj,monto){
	var id='"'+obj.valor+'"';
	var panelAgregado ="<div style='width:100%;margin-bottom:0px;' class='row' id='"+obj.valor+"'><div class='input-field col-md-5'>"+
   	"<h6>"+obj.texto+"</h6>"+
   "</div>"+
   "<div class='col-md-2'>"+
   "</div>"+
   "<div class='input-field col-md-2'>"+
   	"<h6 style='text-align:right;'>"+formatearMonedaCotizador(monto)+"<input type='hidden' value='"+monto+"' id='monto"+obj.valor+"'/></h6>"+
   "</div>"+
   "<div class='input-field col-md-2'>"+
   	"<a style='background-color:#0b4376;' onclick='removerAccesorio("+id+");' class='btn-floating btn-small'>" +
   	"<i class='material-icons'>close</i></a>"+
   "</div></div>"
$("#listaAccesorios").append(panelAgregado);
	
}

function llenarDatosAccesorios(){
	var select = document.getElementById("selectorAccesorios");
    var objectoAccesorio = new Object();
    objectoAccesorio.valor = select.value;
    objectoAccesorio.texto = select.options[select.selectedIndex].innerText;
    return objectoAccesorio;
}

function setearSelectoraccesoriosInicio(){
	$("#montoAccesorios").attr("placeholder", "$0,00").val('');
	$("#selectorAccesorios").val("00").change();
}

function removerAccesorio(id){
	var montoFinal = $("#montoFinal").val();
	var monto = $("#monto"+id).val();
	
	montoFinal = parseInt(montoFinal) - parseInt(monto);
	$("#montoFinal").val(montoFinal)
	$("#valorAccesorios").text(formatearMonedaCotizador(montoFinal));
	$("#"+id).css("display","none");
	
}


function cargarDependencias(id){
	  $("."+id).each(function(index) {
		  cargarSelectorParametricoByClass(id)
	  });
	
}

function seleccionarModelo(){
	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value+";";
	var ceroKm;
	var select = document.getElementById('selectAnio');
	var anio = select.options[select.selectedIndex].value+";";
	
	 if($("#esCeroKm").is(':checked')) {  
		  ceroKm="S"+";";  
       } else {  
    	   ceroKm="N"+";";    
       }  
	 var datos ="4;"+marca+anio+ceroKm;
	 var id="selectorModelo";
	 var tabla = "40021";
	 cargarSelectorParametrico(id,datos,tabla);
}

function cargarDatosarrayDependencias(id){
	var arrayDatos = [];
	var classList = document.getElementById(''+id).className.split(/\s+/);
	for (var i = 0; i < classList.length; i++) {
		if(classList[i].indexOf("d")==0){
		var obj = new Object();
		obj.name=classList[i];
		obj.value="";
		arrayDatos.push(obj);
		}
	}
	return arrayDatos;
}

function cargarDatosarrayFormulario(formData){
	var arrayForm = [];
	$.each(JSON.parse(formData), function(i, field){
		var valor = new Object();
		 if(field.name.indexOf("S")==0){
			 valor.name=field.name.replace("S","");
			 if($("#"+field.name).is(':checked')) {  
				  valor.value="S";  
		        } else {  
		        	valor.value="N";    
		        }
		 	}else{
		 		valor.name=field.name;
		 		valor.value = field.value;
		 			}
		 arrayForm.push(valor);
		  })
		  return arrayForm;
}

function cargarSelectorParametricoByClass(id){
	
	var id = document.getElementsByClassName(""+id)[0].id;
	var arrayDatos = [];
	var arrayForm = [];
	
	arrayDatos=cargarDatosarrayDependencias(id);
	dependencias = JSON.stringify(arrayDatos);    		
	
	
	var formData = JSON.stringify(jQuery('.enviarForm').serializeArray());
	arrayForm=cargarDatosarrayFormulario(formData);
	formData = JSON.stringify(arrayForm);    		
	
	
	 $.ajax({
	    url : 'datosParametricosGoCotizadorGenerico',
	    contentType: 'application/json', 
	    data : {dependencias:dependencias,formData:formData,tabla:id},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById(""+id);
	    		d1.innerHTML = '';
	    		var panelNuevo ='<option value="" selected>Seleccione..</option>';
		    	for ( var int = 0; int < json.length ; int++) {
		    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_CRTB_CRTB_CD_DATO']+'"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CRTB_CRTB_DE_DATO'])) +'</h6></option>';
		    	}
		    	d1.innerHTML =panelNuevo;
		   		 $('#'+id).select2({
			        placeholder: "",
			        theme: "material"
			    })
			     if(id == "selectorModelo"){
			    	 $(".modeloClass").select2({
			    		 theme: "material",
			    		 placeholder: 'Seleccione..'
			    	 })
			    	$(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");		
			    }else{
			    	$('.selectorMaterialice').formSelect();
			    }
	    	}catch(e)
	    	{

	    	}
	    	},
	    error : function(xhr, status) {
	    },
	 
	   
	});

}

function cargarDatosModalDatosBanco(json){
	$("#datoBanco").val(json[0]["P_TF_CADM_RV_TP_CUENTA"])
	$("#tarjetaCredito").val(json[0]["P_TF_CADM_CATT_DE_TARJETA"])
	$("#numTarjeta").val(ocultarDato(json[0]["P_TF_CADM_CADM_NU_CUENTA"]))
	M.updateTextFields();
}

function cargarDatosModalDocumento(json){

	
	$("#personaTpDni").val(json[0]["P_TF_CABU_CABU_CATU_TP_DOCUMENTO"])
	$("#personaDocumento").val(json[0]["P_TF_CABU_CABU_NU_DOCUMENTO"])
	$("#personaCuit").val(json[0]["P_TF_CABU_CABU_NU_CUIT"])
	$("#perdonaApellido").val(json[0]["P_TF_CABU_CABU_NM_APELLIDO_RAZON"])
	$("#PersonaNombre").val(json[0]["P_TF_CABU_CABU_NM_PERSONA"])
	$("#personaNac").val(json[0]["P_TF_CABU_CABU_FE_NACIMIENTO"])
	$("#PersonaGenero").val(json[0]["P_TF_CABU_CABU_ST_SEXO"])
	$("#personaNacionalidad").val(json[0]["P_TF_CABU_CABU_CAPA_CD_NACIONALIDAD"])
	$("#personaLugarNac").val(json[0]["P_TF_CABU_CABU_CD_ESTADO_NACIMIENTO"])
	$("#persoanEstadoCivil").val(json[0]["P_TF_CABU_CABU_ESTADO_CIVIL"])
	$("#personaProfesion").val(json[0]["P_TF_CABU_CABU_CAPW_CD_PROFESION"])

	if(json[0]["P_TF_CABU_CABU_PEP"] =='S'){
		$('#pep').prop('checked', true);
	}
	if(json[0]["P_TF_CABU_CABU_IN_RES_230"] =='S'){
		$('#pep').prop('checked', true);
	}
	   M.updateTextFields();

}


function buscarPersona(){
	var documento = $("#docPersona").val();
	if(documento.length>7){
	 $.ajax({
		    url : 'buscarPersona',
		    contentType: 'application/json', 
		    data : {documento:documento},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		$("#mensajeDni").css("display","none");
		    		$("#nombreAseg").text(primeraLetraMayus(primeraLetraMayus(json[0]["P_TF_CABU_CABU_NM_APELLIDO_RAZON"]) +" "+ json[0]["P_TF_CABU_CABU_NM_PERSONA"]))
		    		cargarDatosModalDocumento(json);
		    		cargarDatosComunicacion(json[0]["P_TF_CABU_CABU_NU_PERSONA"],1);
		    		cargarDatosComunicacion(json[0]["P_TF_CABU_CABU_NU_PERSONA"],4);
		    		cargarDatosBanco(json[0]["P_TF_CABU_CABU_NU_PERSONA"]);
		    		cargarDatosDomiciolio(json[0]["P_TF_CABU_CABU_NU_PERSONA"]);
		    		$(".iconos-modal").each(function(){
		    	 	    $(this).css("display","");
		    	 	});
		    	}catch(e)
		    	{
		    	}
		    	},
		    error : function(xhr, status) {

		    },
		});
	}else{
		if(documento.length == 0){
    		$("#mensajeDni").css("display","none");
		}else{
			$("#mensajeDni").css("display","");
		}
		$("#nombreAseg").text("");
		$("#telefonoPersona").val("");
		$("#emailPersona").val("");
		$("#datosBanco").val("");
		var d1 = document.getElementById("selecDomicilio");
   		d1.innerHTML = '<option value="" selected></option>';
	    $('select').formSelect();
	    
		
		$(".iconos-modal").each(function(){
	 	    $(this).css("display","none");
	 	});
	    
   		
   		M.updateTextFields();
	}
	}


function cargarDatosDomiciolio(persona){
	 $.ajax({
		    url : 'buscarDomicilios',
		    contentType: 'application/json', 
		    data : {persona:persona},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		var panelNuevo ='';
		    		var d1 = document.getElementById("selecDomicilio");
		    		d1.innerHTML = '';
		    		if(json.length>1){
		    			panelNuevo = panelNuevo + "<option value='' selected>Seleccione..</option>";
		    		panelNuevo = panelNuevo;
		    		}
			    	for ( var int = 0; int < json.length ; int++) {
		    			panelNuevo = panelNuevo + "<option value="+int+">"+primeraLetraMayus(json[int]["P_TF_CADO_CADO_DE_CALLE"])+" "+json[int]["P_TF_CADO_CADO_DE_NUMERO"]+"</option>";
			    	}
		    		d1.innerHTML =panelNuevo;
		    		
				    $('select').formSelect();

		    	}catch(e)
		    	{
		    	}
		    	},
		    error : function(xhr, status) {
		    },
		 
		   
		});

	}

function cargarSelectDomicilio(){
	var select = document.getElementById('selecDomicilio');
	var domicilio = select.options[select.selectedIndex].value;
	var persona=$("#docPersona").val();
	
	$.ajax({
	    url : 'buscarDomicilios',
	    contentType: 'application/json', 
	    data : {persona:persona},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		$("#callePersona").val(json[domicilio]["P_TF_CADO_CADO_DE_CALLE"]);
	    		$("#numeroPersona").val(json[domicilio]["P_TF_CADO_CADO_DE_NUMERO"]);
	    		$("#pisoPersona").val(json[domicilio]["P_TF_CADO_CADO_DE_PISO"]);
	    		$("#deptoPersona").val(json[domicilio]["P_TF_CADO_CADO_DE_DEPARTAMENTO"]);
	    		$("#unidadPersona").val(json[domicilio]["P_TF_CADO_CADO_DE_UNIDAD"]);
	    		$("#postalPersona").val(json[domicilio]["P_TF_CADO_GECP_CD_CODIGO_POSTAL"]);
	    		$("#localidadPersona").val(json[domicilio]["P_TF_CADO_GECP_DE_LOCALIDAD"]);
	    		$("#municipioPersona").val(json[domicilio]["P_TF_CADO_GEMU_DE_MUNICIPIO"]);
	    		$("#provinciaPersona").val(json[domicilio]["P_TF_CADO_CAES_DE_PROVINCIA"]);
	    		M.updateTextFields();

	    		
	    		
	    	}catch(e)
	    	{
	    	}
	    	},
	    error : function(xhr, status) {
	    },
	 
	   
	});

}

function abrirCargaCliente(){
	var dni = $("#docPersona").val();
	$("#clienteDniA").val(dni);
	M.updateTextFields();

}
	
	

function cargarDatosBanco(persona){
	 $.ajax({
		    url : 'buscarBanco',
		    contentType: 'application/json', 
		    data : {persona:persona},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		cargarDatosModalDatosBanco(json);
		    		$("#datosBanco").val(ocultarDato(json[0]["P_TF_CADM_CADM_NU_CUENTA"]))
		    		M.updateTextFields();
		    		
		    	}catch(e)
		    	{
		    	}
		    	},
		    error : function(xhr, status) {
		    },
		 
		   
		});

	}

function ocultarDato(dato){
	var valor = dato.substring(11,15);
	return "xxxxxxxxxxxx"+valor;
}

function cargarDatosComunicacion(persona,cod){
	 $.ajax({
		    url : 'buscarComunicaciones',
		    contentType: 'application/json', 
		    data : {persona:persona,codigo:cod},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		
		    		if(cod == 1){
		    			$("#telefonoPersona").val(json[0]["P_TF_CACF_CACF_DE_COMUNICACION"])
		    		}
		    		if(cod == 4){
		    			$("#emailPersona").val(json[0]["P_TF_CACF_CACF_DE_COMUNICACION"])
		    		}
					   M.updateTextFields();
		    		
		    	}catch(e)
		    	{
		    	}
		    	},
		    error : function(xhr, status) {
		    },
		 
		   
		});

	}



function cargarSelectorParametrico(id,datos,tabla){
	bloquearPantallaGris();
	 $.ajax({
	    url : 'datosParametricosGoCotizador',
	    contentType: 'application/json', 
	    data : {dato:datos,tabla:tabla},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById(""+id);
	    		d1.innerHTML = '';
	    		var panelNuevo ='<option value="" selected>Seleccione..</option>';
		    	for ( var int = 0; int < json.length ; int++) {
		    		panelNuevo = panelNuevo + '<option value="'+json[int]['P_TF_CRTB_CRTB_CD_DATO']+'"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CRTB_CRTB_DE_DATO'])) +'</h6></option>';
		    	}
		    	d1.innerHTML =panelNuevo;
		   		 $('#'+id).select2({
			        placeholder: "",
			        theme: "material"
			    })
			     if(id == "selectorModelo"){
			    	 $(".modeloClass").select2({
			    		 theme: "material",
			    		 placeholder: 'Seleccione..'
			    	 })
			    	$(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");		
			    }else{
			    	$('.selectorMaterialice').formSelect();
			    }
		    	$.unblockUI();
	    	}catch(e)
	    	{
		    	mostrarError('Error al cargar los planes',e);
	    		
	    	}
	    	},
	    error : function(xhr, status) {
	    	mostrarError('No se pudo cargar el selector, informe a sistemas con el codigo : 9871629.');
	    },
	 
	   
	});

}


function cargarSumaAsegurada(){
	var select = document.getElementById('selectorModelo');
	var modelo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value;
	
	var ceroKm;

	var select = document.getElementById('selectAnio');
	var anio = select.options[select.selectedIndex].value;
	 if($("#esCeroKm").is(':checked')) {  
		  ceroKm="S";  
       } else {  
    	   ceroKm="N";    
       }
	
		cargarTipoVehiculo();
	 
	 $.ajax({
		    url : 'datosSumaAsegurada',
		    contentType: 'application/json', 
		    data : {modelo:modelo,marca:marca,ceroKm:ceroKm,anio:anio},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		$("#labelSumaAsegurada").val(json);
		    		$('#labelSumaAsegurada').characterCounter();
		    	
			    	$.unblockUI();
		    	}catch(e){
			    	mostrarError('Error al cargar la suma asegurada',e);
		    	}
		    	},
		    error : function(xhr, status) {
		    	mostrarError('No se pudo cargar la suma asegurada, informe a sistemas con el codigo : 1231629.');
		    },
		 
		   
		});

	}


function buscarDirecciones(){
	bloquearPantallaGris();

	var dato = $("#inputUbicacion").val();
	 $.ajax({
		    url : 'buscarUbicacion',
		    contentType: 'application/json', 
		    data : {dato:dato},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		if(json.length > 1){
		    			var panelNuevo ='';
			    		var d1 = document.getElementById("contenidoTablaUbicaciones");
			    		d1.innerHTML = '';
				    	$("#mostrarUbicacionVarias").css("display","");
				    	for ( var int = 0; int < json.length ; int++) {
				    		var postal="'"+json[int]["P_TF_GECP_GECP_CD_CODIGO_POSTAL"]+"'";
				    		var calle="'"+json[int]["P_TF_GECP_GECP_DE_CALLE"]+"'";
				    		var localidad ="'"+json[int]["P_TF_GECP_GECP_DE_LOCALIDAD"]+"'";
				    		var provincia ="'"+json[int]["P_TF_GECP_CAES_DE_PROVINCIA"]+"'";
				    		var pais="'"+json[int]["P_TF_GECP_CAPA_DE_PAIS"]+"'";
				    		
				    		panelNuevo = panelNuevo + '<tr>'+
				    								  '<td>'+postal+'</td>'+
				    								  '<td>'+pais+'</td>'+
				    								  '<td>'+provincia+'</td>'+
				    								  '<td>'+localidad+'</td>'+
				    								  '<td>'+calle+'</td>'+
				    								  '<td><i class="material-icons" style="color:#0b4376!important;cursor:pointer;" onclick="mostrarUbicacion('+postal+','+calle+','+localidad+','+provincia+','+pais+')">exit_to_app</i></td>'+
				    								  '</tr>';
				    		}
				    	d1.innerHTML =panelNuevo;
		    		}else{
				    	var postal="'"+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"]+"'";
			    		var calle="'"+json[int]["P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION"]+"'";
			    		var localidad ="'"+json[int]["P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION"]+"'";
			    		var provincia ="'"+json[int]["P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION"]+"'";
			    		var pais=  "'"+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"]+"'";
				    	mostrarUbicacion("'"+postal+"'","'"+calle+"'","'"+localidad+"'","'"+provincia+"'","'"+pais+"'");
			    		
		    		}
			    	$.unblockUI();

		    	}catch(e){
			    	mostrarError('No se encontro un resultado con el valor ingresado.',e);
		    	}
		    	},
		    error : function(xhr, status) {
		    	mostrarError('No se encontro un resultado con el valor ingresado.');
		    },
		 
		   
		});

	}



function mostrarUbicacion(postal,calle,localidad,provincia,pais,codPostal,codcalle,codLocalidad,codProvincia,codPais){
	$("#mostrarUbicacionVarias").css("display","none");
	$("#buscarUbicacion").css("display","none");
	$("#mostrarUbicacion").css("display","");
	
	
	var d1 = document.getElementById("mostrarUbicacion");
	var panelNuevo = '<div class="input-field col-md-5">'+
				   '<input class="inputUbicacion" placeholder="calle"  value="'+calle+'" id="calleUbicacion" name="calleUbicacion" type="text">'+	
				   '<label for="calleUbicacion" style="cursor:pointer;z-index:30" for="first_name">Calle *'+
				   '</label>'+
				   '</div>'+
				   '<div class="input-field col-md-2">'+
				   '</div>'+
				   '<div class="input-field col-md-2">'+
				   '<input class="inputUbicacion"  value="" id="numeroUbicacion" name="numeroUbicacion" type="text">'+	
				   '<label for="numeroUbicacion" style="cursor:pointer;z-index:30" for="first_name">Numero *'+
				   '</label>'+
				   '</div>'+
				   '<div class="input-field col-md-1">'+
				   '<input class="inputUbicacion"  value="" id="pisoUbicacion" name="pisoUbicacion" type="text">'+	
				   '<label for="pisoUbicacion" style="cursor:pointer;z-index:30" for="first_name">Piso'+
				   '</label>'+
				   '</div>'+
				   '<div class="input-field col-md-1">'+
				   '<input class="inputUbicacion"  value="" id="deptoUbicacion" name="deptoUbicacion" type="text">'+	
				   '<label for="deptoUbicacion" style="cursor:pointer;z-index:30" for="first_name">Depto'+
				   '</label>'+
				   '</div>'+
				   '<div class="input-field col-md-2">'+
				   '<input class="inputUbicacion" placeholder="codPostal"   value="'+codPostal+'" id="codPostalUb" name="deptoUbi" type="text">'+	
				   '<label for="codPostalUb" style="cursor:pointer;z-index:30"  for="first_name">Cod Postal *'+
				   '</label>'+
				   '</div>'+
				   '<div class="input-field col-md-3">'+
				   '<input class="inputUbicacion"  value="'+localidad+'" id="localidadUbicacion" name="calleUbicacion" type="text">'+	
				   '<label for="localidadUbicacion" style="cursor:pointer;z-index:30" for="first_name">Localidad *'+
				   '</label>'+
				   '</div>'+
				   '<div class="input-field col-md-2">'+
				   '</div>'+
				   '<div class="input-field col-md-5">'+
				   '<input class="inputUbicacion"  value="" id="municipioUbicacion" name="municipioUbicacion" type="text">'+	
				   '<label for="municipioUbicacion" style="cursor:pointer;z-index:30" for="first_name">Municipio *'+
				   '</label>'+
				   '</div>'+
					'<div class="input-field col-md-5">'+
					   '<input class="inputUbicacion" placeholder="provincia"   value="'+provincia+'" id="provinciaUbicacion" name="provinciaUbicacion" type="text">'+	
					   '<label for="provinciaUbicacion" style="cursor:pointer;z-index:30" for="first_name">Provincia *'+
					   '</label>'+
					   '</div>'+
					   '<div class="input-field col-md-2">'+
					   '</div>'+
						'<div class="input-field col-md-5">'+
						   '<input class="inputUbicacion" placeholder="pais"  value="'+pais+'" id="paisUbicacion" name="paisUbicacion" type="text">'+	
						   '<label for="calleUbicacion" style="cursor:pointer;z-index:30" for="first_name">Pais *'+
						   '</label>'+
						   '</div>'+
				   '</div>';
	
				   
				   d1.innerHTML = panelNuevo;
				   
				   
				   M.updateTextFields();
				   
}

function recalculoCotizacion(){
	bloquearPantallaGris();

	var select = document.getElementById('valorComision');
	var comision = select.options[select.selectedIndex].value;
	 $.ajax({
		    url : 'recalculoCotizacion',
		    contentType: 'application/json', 
		    data : {comision:comision},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
			    	try{
			    		var promoA=$("#promoUno").val();
			    		var promoB=$("#promoDos").val();
			    		var promoC=$("#promoTres").val();
			    		location.href="/PSPES/cotizacionStep5?promoA="+promoA+"&promoB="+promoB+"&promoC="+promoC;
			    		}catch(e){
				    	mostrarError('Error al cambiar la comision',e);
				    	$.unblockUI();

			    	}
		    	},
		    error : function(xhr, status) {
		    	mostrarError('No se pudo realizar el cambio de comision, informe a sistemas con el codigo : 1847191219.');
		    	$.unblockUI();

		    },
		});

	}




function cargarTipoVehiculo(){
	var select = document.getElementById('selectorModelo');
	var modelo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value;
	
	 $.ajax({
		    url : 'datoTipoVehiculo',
		    contentType: 'application/json', 
		    data : {modelo:modelo,marca:marca},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		cargarSelectorParametrico('usoVehiculo',json,'40008');
			    	$.unblockUI();

		    	}catch(e){
			    	mostrarError('Error al cargar el tipo de vehiculo',e);
		    	}
		    	},
		    error : function(xhr, status) {
		    	mostrarError('No se pudo cargar el tipo de vehiculo, informe a sistemas con el codigo : 1232161219.');
		    },
		 
		   
		});

	}

function reiniciarSelect(){

	var select = document.getElementById('selectorModelo');
	var modelo = select.options[select.selectedIndex].value;
	
	var select = document.getElementById('selectMarca');
	var marca = select.options[select.selectedIndex].value;
	
	if(modelo != ""  || marca != ""){
		seleccionarModelo();
	}
}



function validarFechanacimiento(){
	var fecha = $("#fechaNac").val();
	
	 $.ajax({
		    url : 'validarFechaNacimiento',
		    contentType: 'application/json', 
		    data : {fecha:fecha},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		    	try{
		    		if(json){
		    			$("#fechaNac").css("border-color","");
		    		}else{
		    			Swal.fire({
		    				  type: 'error',
		    				  title: 'Oops...',
		    				  text: 'El cliente tiene que ser mayor de edad.',
		    				})		    			
		    			$("#fechaNac").css("border-color","red");
		    		}
			    	$.unblockUI();
		    	}catch(e){
			    	mostrarError('Error al cargar el tipo de vehiculo',e);
		    	}
		    	},
		    error : function(xhr, status) {
		    	mostrarError('No se pudo cargar el tipo de vehiculo, informe a sistemas con el codigo : 1232161219.');
		    },
		 
		   
		});
	}

function cambiarIconoAcordeon(){
	 if($("#iconoAcordeon").hasClass('fa-angle-double-down')){
		    $("#iconoAcordeon").removeClass("fa-angle-double-down");
		    $("#iconoAcordeon").addClass("fa-angle-double-up");
	    }else{
		    $("#iconoAcordeon").removeClass("fa-angle-double-up");
		    $("#iconoAcordeon").addClass("fa-angle-double-down");
	    }
}


function mostrarSegundoAseg(){
	if($('#segundoAseg').is(':visible')){
		$("#iconoAsegurado").removeClass("fas fa-user-minus");
		$("#iconoAsegurado").addClass("fas fa-user-plus");
		$('#mostrarPanelProd').removeClass('animated fadeIn');
		$("#segundoAseg").css("display","none");

	}else{
		$("#segundoAseg").css("display","");
		$('#segundoAseg').addClass('animated fadeIn');
		$("#iconoAsegurado").removeClass("fas fa-user-plus");
	    $("#iconoAsegurado").addClass("fas fa-user-minus");

	}
}


function mostrarBtnRamos(id){
		var ramo=document.getElementById("valorRamo").value;

		$("#btnMostrarRamos").css("display","none");
		$(".cardRamos").each(function(){
		    $(this).css("display","");
		});
	   
		$(".sacarSeleccionCard").each(function(){
		    $(this).removeClass("cuerpo-card-seleccionado");
		    $(this).addClass("cuerpo-card");
		    
		});
		$("#checkActivado_"+ramo).css("display","none")
		$('#mostrarPanelProd').addClass('animated fadeOut');
		$("#cardActivada_"+ramo).removeClass("cuerpo-card-seleccionado");
		$("#cardActivada_"+ramo).addClass("cuerpo-card");
		$("#mostrarPanelProd").removeClass("fadeIn");
		
		$('#mostrarPanelProd').css("display","none");
}

function mostrarProductosCotizacion(ramo,id,descRamo){
	bloquearPantallaGris();
	 $.ajax({
	    url : 'productosDeLaCotizacion',
	    contentType: 'application/json', 
	    data : {ramo:ramo,descRamo:descRamo},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{

	    		$("#tituloRamo").css("color","#0b4376");

	    		$("#mostrarPanelProd").css("display","");
	    		   
	    		   $('#mostrarPanelProd').addClass('animated fadeIn');
	    		   
	    		   $(".cardRamos").each(function(){
		    		    $(this).css("display","none");
		    		});
	    		   
	    		   $("#"+id).css("display","");
	    		   
	    		$("#valorRamo").val(ramo);
	    		
	    		$("#btnMostrarRamos").css("display","");
	    		
	    		$(".sacarCheckActivado").each(function(){
	    		    $(this).css("display","none");
	    		});
	    		$(".sacarSeleccionCard").each(function(){
	    		    $(this).removeClass("cuerpo-card-seleccionado");
	    		    $(this).addClass("cuerpo-card");
	    		    
	    		});
	    		
	    		
	    		$("#checkActivado_"+ramo).css("display","")
	    		$("#cardActivada_"+ramo).removeClass("cuerpo-card");
	    		$("#cardActivada_"+ramo).addClass("cuerpo-card-seleccionado");
	    		
	    		$("#mostrarPanelProd").removeClass("fadeOut");
	    		$("#mostrarPanelProd").css("display","");
	    		
	    		var d1 = document.getElementById("mostrarProductos");
		    	d1.innerHTML = ' ';
		    	var panelNuevo ='';
		    	var codProd='';
		    	var checkActivadoProducto;
		    	for ( var int = 0; int < json.length ; int++) {
		    		icono = mostrarIconoMaterial(ramo);
		    		cabeceraProducto = "cabeceraProducto"+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"];
		    		codProd="'"+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"]+"'";
		    		descProd="'"+json[int]["P_TF_CAPU_CAPU_DE_PRODUCTO"]+"'";
		    		esqA="'"+json[int]["P_TF_CAPU_CTRA_CPP_CD_ESQ_VISUALIZACION"]+"'";
		    		esqB="'"+json[int]["P_TF_CAPU_CTRA_CREK_NU_VISUALIZACION"]+"'";
		    		checkActivadoProducto = "checkActivadoProducto"+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"];
		    		panelNuevo = panelNuevo+ '<div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 cabeceraProd acomodar-card-resposive centrar-card-resposive" id='+cabeceraProducto+'>'
		    	    						+'<div class="card" style="cursor:pointer;" onclick="seleccionProducto('+codProd+','+esqA+','+esqB+','+descProd+')">'
		    	    						+'<div class="card-image cuerpo-card sacarSeleccionCardProducto" id="cardActivadaProducto'+json[int]["P_TF_CAPU_CAPU_CD_PRODUCTO"]+'">'
		    	    						+icono
		    	    						+'<a class="btn-floating halfway-fab waves-effect waves-light red sacarCheckActivadoProducto" id='+checkActivadoProducto+' style="display:none;">'
		    	    		                +'<i class="fas fa-check icono-check-ramos"></i>'
		    	    		                +'</a>'
		    	    						+'</div>'
		    	    						+'<div class="card-content texto-card">'
		    	    						+'<p>'+json[int]["P_TF_CAPU_CAPU_DE_PRODUCTO"]+'</p>'
		    	    						+'</div>'
		    	    						+'</div>'
		    	    						+'</div>';
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
	    	mostrarError('No se encontraron productos para el ramo seleccionado.');
	    },
	 
	   
	});

};



function seleccionProducto(codProducto,esqA,esqB,descProducto){

	$("#tituloProd").css("color","#0b4376");

	
	$(".cabeceraProd").each(function(){
	    $(this).removeClass("animated pulse");
	});
	$(".sacarCheckActivadoProducto").each(function(){
	    $(this).css("display","none");
	});
	$(".sacarSeleccionCardProducto").each(function(){
	    $(this).removeClass("cuerpo-card-seleccionado");
	    $(this).addClass("cuerpo-card");
	    
	});
	$("#checkActivadoProducto"+codProducto).css("display","")
	$("#cardActivadaProducto"+codProducto).removeClass("cuerpo-card");
	$("#cardActivadaProducto"+codProducto).addClass("cuerpo-card-seleccionado");

	$("#valorProducto").val(codProducto);
	$("#esqA").val(esqA);
	$("#esqB").val(esqB);
	$("#descProd").val(descProducto)
	$("#cabeceraProducto"+codProducto).addClass("animated pulse");
	
	
}


function inicioCotizacion(){
	$(document).ready(function(){
		$('.datepicker').datepicker({
			 months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			 monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		});

	});
	$(document).ready(function() {
	    $('input#input_text, textarea#textarea2').characterCounter();
	  });
	 $(document).ready(function(){
		    $('select').formSelect();
		  });
	 
	 $(document).ready(function(){
		    $('.modal').modal();
		  });
	 $(document).ready(function(){
		    $('.tooltipped').tooltip();
		  });
}


function inicioCotizacionStep2(){
bloquearPantallaGris();

	$(document).ready(function() {
	    $('input#input_text, textarea#textarea2').characterCounter();
	  });
	 
	 $(".js-select2").select2({
	        placeholder: "",
	        theme: "material"
	    })
	    
	     
    $(".select2-selection__arrow")
        .addClass("material-icons")
        .html("arrow_drop_down");
	 
	 $(document).ready(function(){
		    $('.selectorMaterialice').formSelect();
		  });
	 
	 var select = document.getElementById('selectVigencia');
	 var valorSelect = select.options[select.selectedIndex].value;
   	 cargarSelectorPlanDePago(valorSelect);

	 selectorOrigenPago();
	 selectorVigenciaTecnica();
	 
	 $.unblockUI();
}


function inicioCotizacionStep3(){
	bloquearPantallaGris();
	
	 $(document).ready(function(){
		    $('.selectorMaterialice').formSelect();
		  });
	
		 $(".js-select2").select2({
		        theme: "material",
		        placeholder: 'Seleccione..'
		    })
		    var fecha = new Date();
			 var ano = fecha.getFullYear();
		     $(".select2-selection__arrow").addClass("material-icons").html("arrow_drop_down");
		     $('.selectorMaterialice').formSelect();
		     
		     $('.datepicker').datepicker({yearRange:[1930,ano],format: 'dd/mm/yyyy'});

		     $('#fechaNac').mask('00/00/0000');
		     
		 $.unblockUI();
	}


function inicioCotizacionStep5(){
	$(document).ready(function(){
		$('.datepicker').datepicker({
			 months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			 monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		});

	});
	$(document).ready(function() {
	    $('input#input_text, textarea#textarea2').characterCounter();
	  });
	 $(document).ready(function(){
		    $('select').formSelect();
		  });
	 
	 $(document).ready(function(){
		    $('.modal').modal();
		  });
	 $(document).ready(function(){
		    $('.tooltipped').tooltip();
		  });
	comisionEstandar();
}


function redirectStep2(){
	bloquearPantallaGris();
	var valorProducto=document.getElementById("valorProducto").value;
	var valorRamo=document.getElementById("valorRamo").value;
	var esqA=document.getElementById("esqA").value;
	var esqB=document.getElementById("esqB").value;
	var descProd=document.getElementById("descProd").value;
	
	$.ajax({
		    url : 'guardarDatosProductoRamo',
		    contentType: 'application/json', 
		    data : {prod:valorProducto,ramo:valorRamo,esqA:esqA,esqB:esqB,descProd:descProd},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
					location.href="/PSPES/cotizacionStep2";
		},
			error: function(xhr, ajaxOptions, thrownError) {
		        $.unblockUI();
			}
		});
		}

function volverRedirectStep2(){
	bloquearPantallaGris();

	var valorProducto=document.getElementById("valorProducto").value;
	var esqA=document.getElementById("esqA").value;
	var esqB=document.getElementById("esqB").value;
	
	location.href="/PSPES/cotizacionStep2?producto="+valorProducto+"&esqA="+esqA+"&esqB="+esqB;
}





function redirectStep4(){
		bloquearPantallaGris();
		var formData = JSON.stringify(jQuery('.datoTablaClass').serializeArray()).replace("/", "").replace("/", "");
		var array = [];
			$.each(JSON.parse(formData), function(i, field){
				var valor = new Object();
				 if(field.name.indexOf("S")==0){
					 valor.name=field.name.replace("S","");
					 if($("#"+field.name).is(':checked')) {  
						  valor.value="S";  
				        } else {  
				        	valor.value="N";    
				        }
				 	}else{
				 		valor.name=field.name;
				 		valor.value = field.value;
				 			}
				 array.push(valor);
				  })
		  
				  formData = JSON.stringify(array);    		

		var ramo =$("#valorRamo").val();
		var objMostrar ="";
		if(ramo == "4"){
			objMostrar = datosMostrarDatosBien();
			var arrayMostrar = [];
			$.each(objMostrar, function(i, field){
					var valor = new Object();
					valor.name=i;
					valor.value =field;
					arrayMostrar.push(valor);
				  })
		  
			var objDatosMostrar = JSON.stringify(arrayMostrar);    		

		}
		$.ajax({
		    url : 'guardarDatosDelBien',
		    contentType: 'application/json', 
		    data : {datosPantalla:formData,objDatosMostrar:objDatosMostrar},
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
					location.href="/PSPES/cotizacionStep4";
		},
			error: function(xhr, ajaxOptions, thrownError) {
		        $.unblockUI();
			}
		});
		}


function datosMostrarDatosBien(){
	var obj=new Object();
	var select = document.getElementById("selectAnio"), 
    text = select.options[select.selectedIndex].innerText;
	obj.annio = text;
	
	var select = document.getElementById("selectMarca"), 
    text = select.options[select.selectedIndex].innerText;
	obj.marca = text;
	
	var select = document.getElementById("selectorModelo"), 
    text = select.options[select.selectedIndex].innerText;
	obj.modelo = text;
	
	obj.precio = $("#labelSumaAsegurada").val();
	
	
	return obj
}

function comisionEstandar(){
	 if($("#switchComision").is(':checked')) {  
	        $('#valorComision').attr('disabled', 'disabled');
    	   	$('#valorComision').formSelect();

       } else {  
    	   	$('#valorComision').prop("disabled", false);
    	   	$('#valorComision').formSelect();
       }
}

function enviarFormStep1(){
	
	/*bloquearPantallaGris();
	validadSelectMaterialice();
	'use strict';
			var forms = document.getElementsByClassName('needs-validation');
			var validation = Array.prototype.filter.call(forms, function(form) {
				form.addEventListener('submit', function(event) {
					if (form.checkValidity() === false) {
						event.preventDefault();
						event.stopPropagation();
					}
					 form.classList.add('was-validated');
				}, false);
			});
			$.unblockUI();
*/
}
function validadSelectMaterialice(){
	/*
	 * $('form').on('submit',function(e){
	    $(".error_note").remove();
	    var select = $(this).find('select').filter("[required=required]");
	    $.each(select , function(index, elm){
	        val = $(this).val();    
	        target = $(this).closest('.input-field');
	        if (typeof target !== "undefined") {
	            input_target = target.find('input.select-dropdown');
	            if (typeof input_target !== "undefined") {                  
	                if(val == '' || val == false || val == 0 || val == null){
	                    input_target.css({'border-color':'#dc3545'});
	                    input_target.after('<span class="error_note" style="color: #dc3545;font-size:80%;position:relative;bottom:5px;font-weight:600;">Este es un campo obligatorio.</span>');
	                    $(".caret").css("margin-top","7px");
	                    $('html,body').animate({ scrollTop: $("body").offset().top},'slow' );
	                    e.preventDefault();

	                }else{
	                    input_target.css({'border-color':'#cbcbcb'});
	                }

	            }
	        }           
	    });
	});
	*/
}
function soloLetras(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    if (tecla == 8) {
        return true;
    }

    patron = /^[ A-Za-z]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


function soloLetrasYnum(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    if (tecla == 8) {
        return true;
    }

    patron = /^[ A-Za-z0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


function volverRedirectStep1(){
	bloquearPantallaGris();
	var esqA = $("#esqA").val();
	var esqB = $("#esqB").val();
	var prod = $("#prod").val();
	location.href="/PSPES/cotizacionStep1?producto="+prod+"&esqA="+esqA+"&esqB="+esqB;
}


function redirectStep3(){
	bloquearPantallaGris();
	guardarDatosMostrar();
	   var dataString = $('#formularioStep2').serialize();
		$.ajax({
			type: "POST",
			url: "guardarDatosGenerales",
			data: dataString,
			success: function(e,data) {
				location.href="/PSPES/cotizacionStep3";
		},
			error: function(xhr, ajaxOptions, thrownError) {
		        $.unblockUI();
			}
		});
}


function guardarDatosMostrar(){
	var select = document.getElementById("selectMedioPago"), 
    text = select.options[select.selectedIndex].innerText;
	$("#valorMedioPago").val(text);
	
	var select = document.getElementById("selectOrigenPago"), 
    text = select.options[select.selectedIndex].innerText;
	$("#valorFormaPago").val(text);
	
	var select = document.getElementById("condicionIVA"), 
    text = select.options[select.selectedIndex].innerText;
	$("#valorVigencia").val(text);
	
	var select = document.getElementById("selectVigencia"), 
    text = select.options[select.selectedIndex].innerText;
	$("#valorFacturacion").val(text);
	
	var select = document.getElementById("moneda"), 
    text = select.options[select.selectedIndex].innerText;
	$("#valorMoneda").val(text);
	
}



function solonumeros(e){
var key = window.event ? e.which : e.keyCode;
    if(key < 48 || key > 57)
        e.preventDefault();
}


function volverRedirectStep0(){
	bloquearPantallaGris();
	location.href="/PSPES/cotizadorGO";
	
}

function volverRedirectStep3(){
	bloquearPantallaGris();
	location.href="/PSPES/cotizacionStep3";
	
}

function RedirectStep5(){
	bloquearPantallaGris();
	
	var promoA=$("#promoUno").val();
	var promoB=$("#promoDos").val();
	var promoC=$("#promoTres").val();
	var promoATexto="";
	var promoBTexto="";
	var promoCTexto="";

	if(promoA != ""){
		var promoATexto=$("#texto"+promoA).text();
	}
	if(promoB != ""){
		var promoBTexto=$("#texto"+promoB).text();

	}
	if(promoC != ""){
		var promoCTexto=$("#texto"+promoC).text();

	}
	
	$.ajax({
	    url : 'guardarDatosPromo',
	    contentType: 'application/json', 
	    data : {promoA:promoA,promoB:promoB,promoC:promoC,promoATexto:promoATexto,promoBTexto:promoBTexto,promoCTexto:promoCTexto},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
				location.href="/PSPES/cotizacionStep5";
	},
		error: function(xhr, ajaxOptions, thrownError) {
	        $.unblockUI();
		}
	});
	}



function redirectStep5Coberturas(){
	bloquearPantallaGris();
	
	var promoA=$("#promoUno").val();
	var promoB=$("#promoDos").val();
	var promoC=$("#promoTres").val();
	var promoATexto="";
	var promoBTexto="";
	var promoCTexto="";
	
	if(promoA != ""){
		var promoATexto=$("#texto"+promoA).text();
	}
	if(promoB != ""){
		var promoBTexto=$("#texto"+promoB).text();
	
	}
	if(promoC != ""){
		var promoCTexto=$("#texto"+promoC).text();
	
	}
	
	$.ajax({
	    url : 'guardarDatosPromo',
	    contentType: 'application/json', 
	    data : {promoA:promoA,promoB:promoB,promoC:promoC,promoATexto:promoATexto,promoBTexto:promoBTexto,promoCTexto:promoCTexto},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
				location.href="/PSPES/cotizacionStep5Coberturas";
	},
		error: function(xhr, ajaxOptions, thrownError) {
	        $.unblockUI();
		}
	});
}





function volverRedirectStep4(){
	bloquearPantallaGris();
	location.href="/PSPES/cotizacionStep4";

	
}








function selectorOrigenPago(){
	var select = document.getElementById('selectMedioPago');
	var valorSelect = select.options[select.selectedIndex].value;
	bloquearPantallaGris();
	$.ajax({
	    url : 'selectorOrigenPago',
	    contentType: 'application/json', 
	    data : { medioPago:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    	try {
    	    		var valordefault = $("#valorOrigenPago").val();
    	    	var d1 = document.getElementById("selectOrigenPago");
    	    	d1.innerHTML = ' ';
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		if(valordefault.trim() == json[int]['P_TF_COTC_COTC_CD_ORIGEN'].trim()){
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_COTC_COTC_CD_ORIGEN']+' selected><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COTC_COTC_DE_ORIGEN'])) +'</h6></option>';
    	    		}else{
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_COTC_COTC_CD_ORIGEN']+'><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_COTC_COTC_DE_ORIGEN'])) +'</h6></option>';
    	    		}
    	    	}
    	    	d1.innerHTML =panelNuevo;
    	    	 $(document).ready(function(){
    	 		    $('#selectOrigenPago').formSelect();
    	 		  });
	}
	catch(e)
	{
    	mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
		
	}
	$.unblockUI();
	
	
	},
error : function(xhr, status) {
	mostrarError(xhr['responseText']);
},
});
};



function selectorVigenciaTecnica(){
	var select = document.getElementById('selectVigencia');
	var valorSelect = select.options[select.selectedIndex].value;
	
	$.ajax({
	    url : 'selectorVigenciaTecnica',
	    contentType: 'application/json', 
	    data : { vigencia:valorSelect},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    	try {
    	    	var d1 = document.getElementById("selectVigenciaTecnica");
    	    	d1.innerHTML = ' ';
	    		var valordefault = $("#valorVigenciaTecnica").val();
    	    	var panelNuevo = '';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		if(valordefault.trim() == json[int]['P_TF_CAVT_CAFP_CD_VIGENCIA'].trim()){
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_CAVT_CAFP_CD_VIGENCIA']+' selected><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAVT_CAFP_DE_VIGENCIA'])) +'</h6></option>';
    	    		}else{
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_CAVT_CAFP_CD_VIGENCIA']+'><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAVT_CAFP_DE_VIGENCIA'])) +'</h6></option>';
    	    		}
    	    	}
    	    	d1.innerHTML =panelNuevo;
    	    	 $(document).ready(function(){
    	 		    $('#selectVigenciaTecnica').formSelect();
    	 		  });
    	    	 
    	    	 
    	    	 cargarSelectorPlanDePago(valorSelect);
	}
	catch(e)
	{
    	//mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
		
	}
	},
	error : function(xhr, status) {
	},
	});
};


function cargarSelectorPlanDePago(vigencia){
	bloquearPantallaGris();
	$.ajax({
	    url : 'selectorPlanesPagos',
	    contentType: 'application/json', 
	    data : { vigencia:vigencia},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
    	    	try {
    	    	var d1 = document.getElementById("selectPlanesPago");
    	    	d1.innerHTML = ' ';
	    		var valordefault = $("#valorPlanPago").val();
    	    	var panelNuevo = '<option>Selecione..</option>';
    	    	for ( var int = 0; int < json.length ; int++) {
    	    		if(valordefault.trim() == json[int]['P_TF_CAFR_CAFR_CD_FRAGMENT'].trim()){
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_CAFR_CAFR_CD_FRAGMENT']+' selected><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAFR_CAFR_DE_FRAGMENT'])) +'</h6></option>';
    	    		}else{
    	    			panelNuevo = panelNuevo + '<option value='+json[int]['P_TF_CAFR_CAFR_CD_FRAGMENT']+'><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_CAFR_CAFR_DE_FRAGMENT'])) +'</h6></option>';
    	    		}
    	    	}
    	    	d1.innerHTML =panelNuevo;
    	    	 $(document).ready(function(){
    	 		    $('#selectPlanesPago').formSelect();
    	 		  });
	}
	catch(e)
	{
    	mostrarError('Por favor informe a sistema con el cod de error:928716.',e);
		
	}
	$.unblockUI();
	},
	error : function(xhr, status) {
		mostrarError(xhr['responseText']);
	},
	});
};

function quitarSelectCardPromo(){
	$(".alto-panel-promo-seleccionado").each(function(){
    	$(this).removeClass("alto-panel-promo-seleccionado");
    	$(this).addClass("alto-panel-promo");
 	});
	$(".alto-panel-promo-seleccionado-b").each(function(){
    	$(this).removeClass("alto-panel-promo-seleccionado-b");
    	$(this).addClass("alto-panel-promo-b");
 	});
	$(".checkCard").each(function(){
    	$(this).css("display","none");
 	});
	$(".animated").each(function(){
    	$(this).removeClass("animated");
 	});
	
	$(".pulse").each(function(){
    	$(this).removeClass("pulse");
 	});
	
}

function selecionarCotizacion(id){
    if ($("#card_"+id).hasClass('animated pulse')){
    	$("#cuerpo_"+id).removeClass("alto-panel-promo-seleccionado");
    	$("#check_"+id).css("display","none");
    	$("#cuerpo_"+id).addClass("alto-panel-promo");
    	$("#card_"+id).removeClass("animated pulse");
    }else{
    	quitarSelectCardPromo();
    	$("#cuerpo_"+id).removeClass("alto-panel-promo");
    	$("#cuerpo_"+id).addClass("alto-panel-promo-seleccionado");
    	$("#check_"+id).css("display","");
    	$("#card_"+id).addClass("animated pulse");
    }
}



function selecionarCotizacionB(id){
    if ($("#card_"+id).hasClass('animated pulse')){
    	$("#cuerpo_"+id).removeClass("alto-panel-promo-seleccionado-b");
    	$("#check_"+id).css("display","none");
    	$("#cuerpo_"+id).addClass("alto-panel-promo-b");
    	$("#card_"+id).removeClass("animated pulse");
    }else{
    	quitarSelectCardPromo();
    	$("#cuerpo_"+id).removeClass("alto-panel-promo-b");
    	$("#cuerpo_"+id).addClass("alto-panel-promo-seleccionado-b");
    	$("#check_"+id).css("display","");
    	$("#card_"+id).addClass("animated pulse");
    }
}

function selecionarPromo(id){
	var promoUno= $("#promoUno").val();
	var promoDos= $("#promoDos").val();
	var promoTres= $("#promoTres").val();
	var valor= $("#valor").val();
	$(".card").each(function(){
 	    $(this).removeClass("card-no-promo");
 	});
	
	 if(promoUno == id){
		valor = parseInt(1);
		id = "";
		resaltarPromocionSeleccionada(promoUno);
	}else if(promoDos == id){
			id = "";
			valor = parseInt(2);
			resaltarPromocionSeleccionada(promoDos);
		}else if(promoTres == id){
			id = "";
			valor = parseInt(3);
			resaltarPromocionSeleccionada(promoTres);
		}
	
	
	if(valor == 1){
		$("#promoUno").val(id)
		$("#valor").val(parseInt(valor)+ 1);
		resaltarPromocionSeleccionada(id);
		if(promoUno != ''){
			resaltarPromocionSeleccionada(promoUno);
		}
	}else if(valor == 2){
		$("#promoDos").val(id)
		$("#valor").val(parseInt(valor)+ 1);
		resaltarPromocionSeleccionada(id);
		if(promoDos != ''){
			resaltarPromocionSeleccionada(promoDos);
		}
	}else{
		$("#promoTres").val(id)
		$("#valor").val(1);
		resaltarPromocionSeleccionada(id);
		if(promoTres != ''){
			resaltarPromocionSeleccionada(promoTres);
		}
	}
}




function resaltarPromocionSeleccionada(id){
		$("#"+id).removeClass("animated pulse");
		    if ($("#cuerpo_"+id).hasClass('cuerpo-card-seleccionado')){
		    	$("#check_"+id).css("display","none")
		    	$("#cuerpo_"+id).removeClass("cuerpo-card-seleccionado");
		    	$("#cuerpo_"+id).addClass("cuerpo-card");
		    }else{
		    	$("#check_"+id).css("display","")
		    	$("#cuerpo_"+id).removeClass("cuerpo-card");
		    	$("#cuerpo_"+id).addClass("cuerpo-card-seleccionado");
		    	$("#"+id).addClass("animated pulse");
		    }
}

function mostrarIconoMaterial(ramo){
	
	if (ramo == "1") 
		return "<i class='fas fa-fire-alt icono-cabecera-ramos'></i>";
	if (ramo == "2")
		return "<i class='fas fa-truck-moving icono-cabecera-ramos'></i>";
	if (ramo == "4")
		return "<i class='fas fa-car-alt icono-cabecera-ramos'></i>";
	if (ramo == "5")
		return "<i class='far fa-window-restore icono-cabecera-ramos'></i>";
	if (ramo == "6")
		return "<i class='fas fa-lock icono-cabecera-ramos'></i>";
	if (ramo == "7")
		return "<i class='fas fa-gavel icono-cabecera-ramos'></i>";
	if (ramo == "8")
		return "<i class='fas fa-home icono-cabecera-ramos'></i>";
	if (ramo == "10") 
		return "<i class='fas fa-cloud-rain icono-cabecera-ramos'></i>";
	if (ramo == "13")
		return "<i class='fas fa-tv icono-cabecera-ramos'></i>";
	if (ramo == "14")
		return "<i class='fas fa-building icono-cabecera-ramos'></i>";
	if (ramo == "15") 
		return "<i class='fas fa-file-alt icono-cabecera-ramos'></i>";
	if (ramo == "16") 
		return "<i class='fas fa-walking icono-cabecera-ramos'></i>";
	if (ramo == "22") 
		return "<i class='fas fa-motorcycle icono-cabecera-ramos'></i>";
	
	return "all_inclusive";
	
}


function mostrarMontoCoberturas(e,min,max,id){
	var importe_total = 0
	$(".amt").each(
			function(index, value) {
				if ( $.isNumeric( $(this).val() ) ){
					importe_total = importe_total + eval($(this).val());
				}
			}
	);
	$("#valorCoberturas").text(formatearMonedaCotizador(importe_total));
};

