function iniciarFiltro() {

try {
	
$("#all").click(function() {
	
   $(".cardResultado").hide();
   
   $("#filters :checkbox").each(function() {
           $(this).attr('checked','checked');
    });
   $("#filtersEstados :checkbox").each(function() {
           $(this).attr('checked','checked');
    });
    
   $("#filtersRamo :checkbox").each(function() {
           $(this).attr('checked','checked');
    });
       
       
});
} catch (e) {
	// TODO: handle exception
}

$("#filters :checkbox").click(function() {
       $(".cardResultado").hide();
       
       $("#filters :checkbox:checked").each(function() {
           $("." + $(this).val()).show( "slow" );
       });
       
       $("#filtersRamo :checkbox").each(function() {
       		if($(this).is(':checked')){
          
          }else{
           $("." + $(this).val()).hide();
          }
          
       });
//       
        $("#filtersEstados :checkbox").each(function() {
       		if($(this).is(':checked')){
          
          }else{
           $("." + $(this).val()).hide();
          }
          
       });
       

        $("#filtersCreado :checkbox").each(function() {
       		if($(this).is(':checked')){
          
          }else{
           $("." + $(this).val()).hide();
          }
          
       });
        
        $("#filtersActualizado :checkbox").each(function() {
       		if($(this).is(':checked')){
          
          }else{
           $("." + $(this).val()).hide();
          }
          
       });
        
       
       $("#labelCantidadRegistrosBusqueda").html( contarResultados() + " resultados");
       
    });

$("#filtersRamo :checkbox").click(function() {
	$(".cardResultado").hide();
       
       $("#filters :checkbox:checked").each(function() {
           $("." + $(this).val()).show( "slow" );
       });
       
       $("#filtersRamo :checkbox").each(function() {
       		if($(this).is(':checked')){
          
          }else{
           $("." + $(this).val()).hide();
          }
          
       });
      
       $("#filtersEstados :checkbox").each(function() {
       		if($(this).is(':checked')){
          
          }else{
           $("." + $(this).val()).hide();
          }
          
       });
       
       
       $("#labelCantidadRegistrosBusqueda").html( contarResultados() + " resultados");
       
    });
    
    
    
    $("#filtersEstados :checkbox").click(function() {
    	$(".cardResultado").hide();
       
       $("#filters :checkbox:checked").each(function() {
           $("." + $(this).val()).show( "slow" );
       });
       
       $("#filtersRamo :checkbox").each(function() {
       		if($(this).is(':checked')){
          
          }else{
           $("." + $(this).val()).hide();
          }
          
       });
       
        $("#filtersEstados :checkbox").each(function() {
       		if($(this).is(':checked')){
          
          }else{
           $("." + $(this).val()).hide();
          }
          
       });
      
        $("#labelCantidadRegistrosBusqueda").html( contarResultados() + " resultados");
       
    });
    
}