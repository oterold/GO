	
	$(".dropdowntipo").each(function(){
		var elem= $(this);
		
		elem.mouseover(function(){
			
			//Agregar esta clase en todas las pantallas entidades
			$('.habilitarContainer').css("pointer-events", "none");
			$('.habilitarContainer').css("opacity", "0.4");
			$('.encabezadoMenuEntidad').css("font-weight", "bold");
			
			
		});
		
		elem.mouseout(function(){
			
			$('.habilitarContainer').css("pointer-events", "");
			$('.habilitarContainer').css("opacity", "");
			$('.encabezadoMenuEntidad').css("font-weight", "normal");
			$('.encabezadoMenuExpeto').css("font-weight", "normal");
			$('.encabezadoMenuExpeto').css("font-weight", "normal");

			//$('.dropdown-content').css("display","");

		});
	
		elem.find(".dropdown-content").mouseover(function(){
			elem.find("#dropdowntipo").css("font-weight", "bold");
			
			$('.habilitarContainer').css("pointer-events", "none");
			$('.habilitarContainer').css("opacity", "0.4");
			
		});
		elem.find(".dropdown-content").mouseout(function(){
			elem.find("#dropbtnActive").css("border-bottom", "");
			elem.find("#dropdowntipo").css("font-weight", "");
			
			$('.habilitarContainer').css("pointer-events", "");
			$('.habilitarContainer').css("opacity", "");
		});
		
	});

	
	//abre el menu de entidades
	

	$(".abrirMenuEntidades").each(function(){
		var elem= $(this);
	
			elem.mouseover(function(){
			
			//Agregar esta clase en todas las pantallas entidades
				$('.entidadesMenu').css("display","block");
				$('.habilitarContainer').css("pointer-events", "none");
				$('.habilitarContainer').css("opacity", "0.4");
				$('.encabezadoMenuEntidad').css("font-weight", "bold");
			
		});
			
			
			elem.mouseout(function(){
				
				$('.entidadesMenu').css("display", "");

			});
		
	
	});
	
	
	//abre menu go experto

	$(".abrirMenuGoExperto").each(function(){
		var elem= $(this);
	
			elem.mouseover(function(){
			
			//Agregar esta clase en todas las pantallas entidades
				$('.entidadesGoExperto').css("display","block");
				$('.habilitarContainer').css("opacity", "0.4");
				$('.habilitarContainer').css("pointer-events", "none");
				$('.encabezadoMenuExpeto').css("font-weight", "bold");

		});
			
	elem.mouseout(function(){
				
				$('.entidadesGoExperto').css("display", "");

			});
		
	
	});
	
	
	//abre menu de promociones

	$(".abrirMenuPromociones").each(function(){
		var elem= $(this);
	
			elem.mouseover(function(){
			
			//Agregar esta clase en todas las pantallas entidades
			$('.entidadesMenuPromociones').css("display","block");
			$('.habilitarContainer').css("pointer-events", "none");
			$('.habilitarContainer').css("opacity", "0.4");
			$('.encabezadoMenuPromociones').css("font-weight", "bold");

		});
		
	elem.mouseout(function(){
				
				$('.entidadesMenuPromociones').css("display", "");

			});
	
	});
	
	
	
	//muestra el menu entidades
	$(".entidadesMenu").each(function(){
		var elem= $(this);
	
			elem.mouseover(function(){
			
			
			elem.css("display","block");
			$('.habilitarContainer').css("pointer-events", "none");
			$('.habilitarContainer').css("opacity", "0.4");
			$('.encabezadoMenuEntidad').css("font-weight", "bold");

			
		});
		
		
		elem.mouseout(function(){
			
			elem.css("display", "none");
			$('.habilitarContainer').css("pointer-events", "");
			$('.habilitarContainer').css("opacity", "");
			$('.encabezadoMenuEntidad').css("font-weight","normal");

		});
	
	
	});
	
	
	//muestra el menu experto
	$(".entidadesGoExperto").each(function(){
		var elem= $(this);
	
			elem.mouseover(function(){
			
			elem.css("display","block");
			$('.habilitarContainer').css("pointer-events", "none");
			$('.habilitarContainer').css("opacity", "0.4");
			$('.encabezadoMenuExpeto').css("font-weight", "bold");

			
		});
		
		
		elem.mouseout(function(){
			elem.css("display", "none");
			$('.habilitarContainer').css("pointer-events", "");
			$('.habilitarContainer').css("opacity", "");
			$('.encabezadoMenuExpeto').css("font-weight", "normal");

		});
	
	
	});
	
	//muestra el menu promociones
	$(".entidadesMenuPromociones").each(function(){
		var elem= $(this);
	
			elem.mouseover(function(){
			
			//Agregar esta clase en todas las pantallas entidades
			elem.css("display","block");
			$('.habilitarContainer').css("pointer-events", "none");
			$('.habilitarContainer').css("opacity", "0.4");
			$('.encabezadoMenuPromociones').css("font-weight", "bold");

			
		});
		
		
		elem.mouseout(function(){
			
			elem.css("display", "none");
			$('.habilitarContainer').css("pointer-events", "");
			$('.habilitarContainer').css("opacity", "");
			$('.encabezadoMenuPromociones').css("font-weight", "normal");

		});
	
	
	});
	
	
	