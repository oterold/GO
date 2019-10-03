		function buscarPersonaAerolineas(){
			
			$('#rtn').val('');
			ocultarPanelb();
        	
			$("#datosContacto").css("display","");

			var select = document.getElementById('selectAmbienteBuscarCliente');
        	var ambiente = select.options[select.selectedIndex].value;
        	if(ambiente== 1){
        		ambienteURL = 'https://pswtest.aerolineas.com.ar/api/modARPlusServices/wsCorpValidaSocio?vl_id_socio_ffp=DNI:';
        	}else{
        		ambienteURL = 'https://psw.aerolineas.com.ar/api/modARPlusServices/wsCorpValidaSocio?vl_id_socio_ffp=DNI:';
        	}
			var documento = $("#documentoPersona").val().trim();
			//if documento nulo
			if (documento === '') {
				Swal.fire(
						  'Debe completar un n&uacute;mero de documento v&aacute;lido.',
						  '',
						  'info'
						)
			}else{
				
        	bloquearPantallaGris();
        	   $.ajax({
                   url: ambienteURL+documento,
                   dataType: 'text',
                   type: 'GET',
                   headers: {
                   	"Authorization": "Basic dXNlcnByb3ZpbmNpYXNlZ3Vyb3M6N2V1cTZjMjhXNHF2LkZHR1g="
                   },
                   contentType: 'application/x-www-form-urlencoded',
                   success: function( data, textStatus, jQxhr ){
                	   	
                	   	$("#documentoPersonaIn").val('');
              			$("#clienteIn").val('');
              			$("#apellidoPersonaIn").val('');
              			
	                   		try {
	                   		datos = JSON.parse(data);
	                   		
	                   		$("#clienteNombre").html("<b>"+datos[0]["lv_nombre"]  +" "+ datos[0]["lv_apellido"]+"<b>");
	                		$("#clienteNum").html("<b>"+datos[0]["lv_nume_doc"]+"<b>");
	                   		$("#clienteTPDoc").html("<b>"+datos[0]["lv_tipo_doc"]+"<b>");
	                   		
	                   		if(datos[0]["lv_cod_error"] == 1){
	                   			$("#clienteMensaje").html("<b>"+datos[0]["lv_mensaje_error"]+"<b>").css("color","green");
	                   			$("#documentoPersonaIn").val(documento.trim());
	                   			$("#clienteIn").val(datos[0]["lv_nume_doc"].trim());
	                   			$("#apellidoPersonaIn").val(datos[0]["lv_apellido"].trim());

	                   		}else{
	                   			$("#clienteMensaje").html("<b>"+datos[0]["lv_mensaje_error"]+"<b>").css("color","red");
	                   		}
	                  	 	
	                   		} catch (e) {
	                   				alert(e);
   						}
   						$.unblockUI();
                   },
                  
                   error: function( jqXhr, textStatus, errorThrown ){
                	    $("#clienteNombre").html(" - ");
               			$("#clienteNum").html(" - ");
                  		$("#clienteTPDoc").html(" - ");
             			$("#clienteMensaje").html("<b> Error al buscar los datos del cliente <b>").css("color","red");
                	    $.unblockUI();
                   }
               });
			}

          }

function ocultarPanelb(){
	$(".msjOk").each(function(){
 	    $(this).css("display","none");
 	});
	$("#msjError").css("display","none");
	$("#iconoError").css("display","none");	
	
	
}


function aceptarAcreditacion(usuario){

	var mil = $('#Millas').val();
 Swal.fire({
  title: 'Estas Seguro ?',
  text: "Hola " + usuario+ " estas seguro/a que vas a acreditar "+mil+" millas ",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Estoy de acuerdo!'
	}).then((result) => {
	  if (result.value) {
		  validarCode();
	  }
	})



}

function validarCode(){
	$('#rtn').val('');

	var code = $("#valorCode").val();
	       	bloquearPantallaGris()
            $.ajax({
            	 url : 'validarCode',
         	    contentType: 'application/json', 
                data: $("#formulario").serialize(),
         	    type : 'GET',
         	    dataType : 'json',
         	    success : function(data) {
            	
            		try {
            			if(data == true){
            				callAAAcreditarMillas();
            				}else{
            					Swal.fire(
            							  'C&oacute;digo Inv&aacute;lido',
            							  '',
            							  'error'
            							)
            				ocultarPanelb();
            			}
					} catch (e) {  alert(e);  }
					
					$.unblockUI();
            },
            error: function( jqXhr, textStatus, errorThrown ){
    			alert(errorThrown);
    			ocultarPanelb();
            	$.unblockUI();

            }
        });

   }
			

        function callAAAcreditarMillas(){
        	
        	$("#datosContacto").css("display","none");
        
        	var select = document.getElementById('selectAmbiente');
        	var ambiente = select.options[select.selectedIndex].value;
        	
        	if(ambiente== 1){
        		ambienteURL = 'https://pswtest.aerolineas.com.ar/api/modARPlusServices/wsPartnersAcreditarMillasService';
        	}else{
        		ambienteURL = 'https://psw.aerolineas.com.ar/api/modARPlusServices/wsPartnersAcreditarMillasService';
        	}
                $.ajax({
                url: ambienteURL,
                dataType: 'text',
                type: 'post',
                headers: {
                	"Authorization": "Basic dXNlcnByb3ZpbmNpYXNlZ3Vyb3M6N2V1cTZjMjhXNHF2LkZHR1g="
                },
                contentType: 'application/x-www-form-urlencoded',
                data: $("#formulario").serialize(),
                success: function( data, textStatus, jQxhr ){
                	var resultado = "El resultado del servicio de Aerolineas Argentina es : "
                		$("#msjError").css("display","none");
                		$("#iconoError").css("display","none");
            			
                		$("#iconoOk").css("display","none");
            			$("#iconoError").css("display","none");

                		try {
                			var datos = JSON.parse(data);
                			
                			callRegistracionDatos(data);
                			
                			$("#msjOk").html(resultado );
                			$("#msjOkId").html("id : <b>"+datos.$id+"</b>");
                			$("#msjOkStatus").html("Cod Status :<b> "+datos.codigo_status+"</b>" );
                			$("#msjOkDeStatus").html("Desc. Status :<b> "+datos.descri_status+"</b>" );
                			$("#msjOkCodigo_sqlerr").html( "Cod. SQL : <b>"+datos.codigo_sqlerr+"</b>" );
                			$("#msjOkCodigo_isamerr").html( "Cod isamerr : <b>"+datos.codigo_isamerr+"</b>" );
                			$("#msjOkKeyEncrypted").html("KeyEncrypted : <b>"+ datos.KeyEncrypted+"</b>" );

                			if(datos.codigo_status.trim() == '000'){
	                			$("#iconoOk").css("display","");
                			}else{
	                			$("#iconoError").css("display","");
	                			
                			}
                			
                			$(".msjOk").each(function(){
                				$(this).css("display","");
                			});
                			
						} catch (e) {
                			$("#msjOkId").html(data);
                			$("#msjOkId").css("display","none");
                			
						}
                	
						$.unblockUI();

                },
                error: function( jqXhr, textStatus, errorThrown ){
                	$(".msjOk").each(function(){
        		 	    $(this).css("display","none");
        		 	});             
                	$("#msjError").css("display","");
                	$("#iconoError").css("display","")
                	try {
                		$("#msjError").text("Response STATUS : "+textStatus +" / "+jqXhr.responseText);
					} catch (e) {
                		$("#msjError").text(textStatus);
					}
					$.unblockUI();

                }
            });

       }

        
        function callRegistracionDatos(datos){
        $('#rtn').val(datos);
        	
                    $.ajax({
                    	 url : 'registracionCall',
                 	    contentType: 'application/json', 
                        data: $("#formulario").serialize(),
                 	    type : 'GET',
                 	    dataType : 'json',
                 	    success : function(data) {
                    
                    },
                    error: function( jqXhr, textStatus, errorThrown ){
            			

                    }
                });

           }
        
        

