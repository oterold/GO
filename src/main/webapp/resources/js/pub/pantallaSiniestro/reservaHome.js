function buscadorPanelCEntidadReserva() {
	  // Declare variables 
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("inputBusquedaReserva");
	  filter = input.value.toUpperCase();
	
	  $(".datoReservaCarusel").each(function(){
	 	    
		  var idH6 = $(this).attr('id');
		  var idCard = idH6.replace("datoReserva", "micaruB");
		  var idEncabezado = idH6.replace("datoReserva", "nroReserva");
		
	 	    if ((document.getElementById($(this).attr('id')).innerHTML.toUpperCase().indexOf(filter) > -1 ) || (document.getElementById(idEncabezado).innerHTML.toUpperCase().indexOf(filter) > -1 ) ) {
	 	   	$('#' +idCard ).css("display","");
			$('#' +idCard).parent().css("display","");
			}
	   else {
				$('#' +idCard ).css("display","none");
				$('#' +idCard).parent().css("display","none");
			}
	 	});
	  

	}



function abrirPopUpMovimientoReservaHome(numeroCard){
	bloquearPantallaGris();
	
	var valorSiniestro=document.getElementById("valorSiniestroReservaHome").value;
	var valorRamo=document.getElementById("valorRamoReservaHome").value;
	var annio=document.getElementById("valorAnnioSiniestroHome").value;
	
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosMovimientoReservas',
	    contentType: 'application/json', 
	    data : { siniestro : valorSiniestro, ramo : valorRamo,annio:annio},
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    	$.unblockUI();
	    	numeroCard = numeroCard - "1";
	    	llenarDinamicamente(json[numeroCard]);

			$("#DATO_MOVIMIENTO").html("Movimiento <b>#" + formatearFechaJson(json[numeroCard]['P_TF_LISTA_SMCC_SIMS_FE_MOVIMIENTO'])+"</b>" );
			$("#DATO_POLIZA").html("<b>" + json[numeroCard]['P_TF_LISTA_SMCC_SISI_NU_ANNIO']+" - " + json[numeroCard]['P_TF_LISTA_SMCC_CARP_CD_RAMO']+" - " + json[numeroCard]['P_TF_LISTA_SMCC_CAPO_NU_POLIZA']+"</b>" );
			$("#DATO_MONTO").html("<b>$" + json[numeroCard]['P_TF_LISTA_SMCC_MT_MOVIMIENTO']+"</b>" );
			
			//Abre el modal
			$("#movimientoReservaPopUp").modal({
				 escapeClose: false,
				  clickClose: false,
				  showClose: false,
				  fadeDuration: 400,
				  fadeDelay: 0.05
				});
	    	}
	    	catch(e)
	    	{
	    		mostrarError('Error 12323131. Se produjo un inconveniente al cargar los datos del movimiento',e);
	    		
	    	}
	    	
	    	
	    	},
	    error : function(xhr, status) {
	    	$.unblockUI();
	    	mostrarError('Se produjo un inconveniente al cargar los datos del productor');
	    },
	 
	   
	});
	

};



function mostrarReservasHome(obj,numCard,icono,siniestro,ramo,tercero,annio,fecha,periodo,adju,tipo){
	bloquearPantallaGris();
	$.ajax({
	    // la URL para la petici�n
	    url : 'datosDetalleReservas',
	    contentType: 'application/json', 
	    data : {siniestro:siniestro, ramo:ramo, annio:annio,periodo:periodo,tercero:tercero, adju:adju, tipo: tipo} ,
	    type : 'GET',
	    dataType : 'json',
	    success : function(json) {
	    	try{
	    		var d1 = document.getElementById("listaTitulo");
		    	var d2 = document.getElementById("listaResultado");
		    	
		    	d1.innerHTML = ' '; 
		    	d2.innerHTML = ' '; 
		    	
		    	var resultadoCuotas = '<div class="tab-content" id="nav-tabContent">';
		    	
		    	var listaCuotas = '<div class="list-group" id="list-tab" role="tablist">';
		    
		    	//llena el panel D
		    	for ( var int = 0; int < json.length; int++) {
		    		var num=int+1;
		    	
		    		//verifica que sea el primero, y si lo es lo acitva y muestra su contenido
		    		if(num == 1){
		    			//Setea el titulo de la lista
		    			listaCuotas = listaCuotas + '<a class="list-group-item list-group-item-action active" id="list'+num+'" data-toggle="list" href="#list-home'+num+'" role="tab" aria-controls="home"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_RMCONTAB']))+'</h6></a>';
		    			//Setea el campo de la lista
		    			resultadoCuotas = resultadoCuotas + '<div class="tab-pane show active" id="list-home'+num+'" role="tabpanel" aria-labelledby="list-home-list'+num+'">'+
		    		'<div class="row" id="panelc"><div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">' +
		    		'<table  style= "width:100%;">'+
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Hecho Gen. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_SIPE_CCHG_CD_HECHO_GEN'])+'</b></h6></td></tr> ' +
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Moneda :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_LISTA_SIPE_CAMO_CD_MONEDA'])+'</b></h6></td></tr>' + 
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Cobertura :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[0]['P_TF_LISTA_SIPE_CACB_CD_COBERTURA'])+" - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_INB_DESC_COBERTURA']))+'</b></h6></td></tr>' + 
	                	'</table></div>'+
	         		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">'+
		    			'<table  style= "width:100%;">'+
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reserva :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_SIPE_SMCC_CD_TIPO_RESERVA'])+' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_TIPO_RESERVA']))  +'</b></h6></td></tr> ' +
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Neta :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_MT_RESERVA'])) +'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Reasegu. :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_CACS_MT_LIMITE']))+'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Tot. :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_MT_RESERVA_TOTAL']))+'</b></h6></td></tr>' + 
		                	'</table></div>'+
	            	' </div>'+
	   			'</div>';
		    		}
		    	//si no es el primero llena los demas campos, pero no los activa
		    		
		    		else{
		    			listaCuotas = listaCuotas + '<a class="list-group-item list-group-item-action" id="list'+num+'" data-toggle="list" href="#list-home'+num+'" role="tab" aria-controls="home"><h6>'+validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_RMCONTAB']))+'</h6></a>';
		    			resultadoCuotas = resultadoCuotas + '<div class="tab-pane" id="list-home'+num+'" role="tabpanel" aria-labelledby="list-profile-list">' +
		    			'<div class="row" id="panelc"><div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">' +
			    		'<table  style= "width:100%;">'+
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Hecho Gen. :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>'+validarCampoVacio(json[int]['P_TF_LISTA_SIPE_CCHG_CD_HECHO_GEN'])+'</b></h6></td></tr> ' +
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Moneda :</h6></td><td style="padding-top:5px;"><h6><b>'+(json[int]['P_TF_LISTA_SIPE_CAMO_CD_MONEDA'])+'</b></h6></td></tr>' + 
	                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Cobertura :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(json[0]['P_TF_LISTA_SIPE_CACB_CD_COBERTURA'])+" - " + validarCampoVacio(primeraLetraMayus(json[0]['P_TF_LISTA_INB_DESC_COBERTURA']))+'</b></h6></td></tr>' + 
		                	'</table></div>'+
		         		'<div class="col-md-6" style="text-align: left;padding-left:1px;padding-right:1px">'+
			    			'<table  style= "width:100%;">'+
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reserva :</h6></td><td style="padding-top:5px;width:60%;"><h6><b>$'+validarCampoVacio(json[int]['P_TF_LISTA_SIPE_SMCC_CD_TIPO_RESERVA'])+' - ' +validarCampoVacio(primeraLetraMayus(json[int]['P_TF_LISTA_INB_DESC_TIPO_RESERVA']))  +'</b></h6></td></tr> ' +
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Neta :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_MT_RESERVA'])) +'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Reasegu. :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_CACS_MT_LIMITE']))+'</b></h6></td></tr>' + 
		                	'<tr><td align="right"  valign="top" style="padding-top:5px;"><h6>Reser. Tot. :</h6></td><td style="padding-top:5px;"><h6><b>'+validarCampoVacio(formatearMoneda(json[int]['P_TF_LISTA_SIPE_MT_RESERVA_TOTAL']))+'</b></h6></td></tr>' + 

			                	'</table></div>'+
		            	' </div>'+
		   			'</div>';
		    		
		    		}
			
		    	}
		    	
		    	//pasa el codigo al html
		    	d1.innerHTML = listaCuotas;  
		    	d2.innerHTML = resultadoCuotas;  

	//muestra el panel D
		$('#panelb').hide();
		$('#panela').show();
		$('#panelReservaDetalle').show();
		
		$(".seleccionPanelB").each(function(){
	 	    $(this).css("background","white");
	 	});
		$('#'+obj+numCard).css("background","#bac2bb");
		
		$('#labelPanelDetalleJuicio').html("Detalle reserva #"+ siniestro + " - " + fecha);
		
		var d1 = document.getElementById("panelImagenReserva");
		d1.innerHTML = '<i class="material-icons altoIcono"  style="color:#205081;">'+icono+'</i>';
		$.unblockUI();
	    }
		catch(e){
    		alert('Error (67854) generado por : '+e);
    	}

	    	 },
	 	    error : function(xhr, status) {
	 	    	$.unblockUI();
	 	    	mostrarError(xhr['responseText']);	 	    }
	 	});
	 }




