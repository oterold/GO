package com.pseguros.pes.util.pantalla;


import java.lang.reflect.Field;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.apache.velocity.tools.config.DefaultKey;


//@DefaultKey("utilToolScreen")
public class UtilPantalla {
	
	private static final Logger logger = LoggerFactory.getLogger(UtilPantalla.class);

		
public static String nombreMayuscula(String dato) {
    if (dato == null) {
        return dato;
    }
    StringBuilder builder = new StringBuilder();
    StringTokenizer st = new StringTokenizer(dato," ");
    while (st.hasMoreElements()) {
        dato = (String)st.nextElement();
        if (dato.length()>0) {
            builder.append(dato.substring(0, 1).toUpperCase());
            builder.append(dato.substring(1).toLowerCase()); 
            builder.append(' ');
        }
    }
    return builder.toString();
}
	

public static String  getCssDependencia(String cadena) {

    String[] clases = cadena.split(";");
    StringBuffer css = new StringBuffer();
    for (int i = 0; i < clases.length; i++) {
    	css.append("d");
    	css.append(clases[i]);
    	css.append(" ");
		
	}
    return css.toString();
}


public static String  isNumeric(String cadena) {

    String resultado;

    try {
    	if(cadena == null)
        resultado = "";
    	else{
    		resultado=cadena;
    	}
    } catch (Exception excepcion) {
        resultado = "";
    }

    return resultado;
}




public static Object ucFirst(String str) {
	    if (str ==null || str.isEmpty()) {
	        return str;            
	    } else {
	        return Character.toUpperCase(str.charAt(0)) + str.substring(1).toLowerCase(); 
	    }
	}
	
public static Object campoSiniestro(String campo){
	if(campo.length()> 20 && campo != null){
		campo = campo.replace("  ", " ");
		campo = "<h6 style='color:#6fa1d4'><b>" +campo.substring(0,20) + "....</b></h6>";;
	}
	
	return campo;
}



public static Object campoCortar(String campo){
if(campo.length()> 40 && campo != null){
	campo = campo.replace("  ", " ");
	campo = "<h6 style='color:#6fa1d4'><b>" +campo.substring(0,40) + "....</b></h6>";;
}

return campo;
}

public static Object verFechaHasta(Object datoA, Object datoB) {
		
		if (datoA != null && datoA.toString().length()>2) {
			return datoA;
		}
		return datoB;
	}


public static Object adJu(Object dato) {
	
	if (dato != null && dato.equals("A")) {
		return "Administrativo";
	}
	else
	{
		return "Judicial";
	}
}

	
public static Object ocultarNulo(Object obj) {
	
	try {
		
		return obj.toString();
	} catch (Exception e) {
		// TODO: handle exception
	}
	return "";
}

public static String formatearFecha(String dato) {
	String[] fechaSpl = dato.split("-");
	if (fechaSpl.length>1) {
		return fechaSpl[2] +"/"+fechaSpl[1] +"/"+fechaSpl[0] ;
	}else {
		return "";
	}
}
	
public static String PasarAmayuscula(String dato) {
	
	return dato.toUpperCase();
	
	}


	public static String formatearImporte(Object dato) {
		
		if (dato == null || dato.toString().length() < 1 || (dato.toString() != null  && dato.toString().equals("0"))) {
			return "0,00";
		}
		
		
		try {
			DecimalFormatSymbols simbolos = new DecimalFormatSymbols();
			simbolos.setDecimalSeparator(',');
			simbolos.setGroupingSeparator('.');
			DecimalFormat formateador = new DecimalFormat("###,###.00", simbolos);

			return formateador.format(dato);

		} catch (Exception e) {

			try {

				DecimalFormatSymbols simbolos = new DecimalFormatSymbols();
				simbolos.setDecimalSeparator(',');
				simbolos.setGroupingSeparator('.');
				DecimalFormat formateador = new DecimalFormat("###,###.00", simbolos);
				return formateador.format(new java.math.BigDecimal(dato.toString()));

			} catch (Exception e2) {
				return dato.toString();
			}

		}

	}

	public static Object fechaAnnioMes(Object datoA) {
		
		if (datoA != null && datoA.toString().length()>0) {
			
	String datoC =  ((String) datoA).substring(0,4);	
	String datoB =  ((String) datoA).substring(4,6);	
	datoA = datoB + "/"+datoC;
			return datoA;
		}
		return datoA;
	}
	
	
	public static String formatearFechaSiniestro(Object fechaIn) {
		try {
			
			String[] datos = fechaIn.toString().split(" ");
			String[] dia = datos[0].split("-");
			
			//String[] hora = datos[1].split(":");
			
			return dia[2] + "-"+dia[1] +"-" + dia[0] ;//+ " " + hora[1]+":"+hora[0];
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return "";
		
	}
	public static String recortarBien(Object obj) {
		try {

			return obj.toString();
			//return obj.toString().substring(0,4) + "......................................."  + obj.toString().substring(obj.toString().length()-3,obj.toString().length());
			
		} catch (Exception e) {

		}
		return "";
		
	}
	
	
	public static String recortarNombre(Object obj) {
		try {
			return obj.toString();
//			return obj.toString().substring(0,4) + "...";
			
		} catch (Exception e) {

		}
		return "";
		
	}
	
	public String listarObjeto(Object objIn) {
		StringBuffer dato = new StringBuffer();
		try {
			
		Class clase = objIn.getClass();
		Field[] atributos = clase.getDeclaredFields();
		
		for (Field field : atributos) {
			
		Field atributo = field;
		 
		String nombreAtributo = atributo.getName();
		Object tipoAtributo = atributo.getType();
		
		     
		  atributo.setAccessible(true);
		  Object value = field.get(objIn);
		  
		  System.out.println("Valor : " + value);
		  if (value != null && value.toString().length()>0) {
			
			  dato.append("<li><b>"+atributo.getName()+":</b>&nbsp;"+value+"</li>");
		}
		}

		} catch (Exception e) {
			// TODO: handle exception
		}
		return dato.toString();
		
	}

	
	
	public static String noNull(Object obj) {
		try {

			return obj.toString();
			
		} catch (Exception e) {

		}
		return "";
		
	}
	public static String getIconoEndoso(Object tipoEndoso) {
		
		if (tipoEndoso == null) 
			return "";
		String endoso = tipoEndoso.toString(); 
		if (endoso.equals("A")) //Anulacion 
			return "/PSPES/resources/img/rector/timeLine/formularioAnulacion.svg";
		
		if (endoso.equals("C")) //recuotificacion 
			return "/PSPES/resources/img/rector/timeLine/calendarioAzul.svg";
		
		if (endoso.equals("E")) // emision 
			return "/PSPES/resources/img/rector/timeLine/emisionAzul.svg";
		
		if (endoso.equals("F")) // refacturacion 
			return "/PSPES/resources/img/rector/timeLine/bolsaDineroAzul.svg";
		
		if (endoso.equals("H")) //rehabilitacion 
			return "/PSPES/resources/img/rector/timeLine/tildeVerde.svg";
		
		if (endoso.equals("L")) //endoso cualitativo 
			return "/PSPES/resources/img/rector/timeLine/formularioCualitativoAzul.svg";
		
		if (endoso.equals("M")) //endoso cuantitativo negativos 
			return "/PSPES/resources/img/rector/timeLine/bolsaDineroRojo.svg";
		
		if (endoso.equals("N")) //endoso cuantitativo 
			return "/PSPES/resources/img/rector/timeLine/bolsaDineroVerde.svg";
		
		if (endoso.equals("P")) //pago  
			return "/PSPES/resources/img/rector/timeLine/pesosAzul.svg";
		
		if (endoso.equals("R")) //renovacion 
			return "/PSPES/resources/img/rector/timeLine/emisionAzul.svg";
		
		if (endoso.equals("T")) //transferencia propiedad
			return "/PSPES/resources/img/rector/timeLine/flechasAzul.svg";
		
		if (endoso.equals("U")) //reverso ultimo endoso 
			return "/PSPES/resources/img/rector/timeLine/undo.svg";
		
		return "";
	}
	
	public static String getIcono(Object ramoIn) {
	
		if (ramoIn == null) 
			return "";
		String ramo = ramoIn.toString(); 
		
		if (ramo.equals("1")) 
			return "&#xE80E;";
		if (ramo.equals("2")) 
			return "&#xE558;";
		if (ramo.equals("3")) 
			return "&#xE195;";
		if (ramo.equals("4")) 
			return "&#xE531;";
		if (ramo.equals("5")) 
			return "&#xE3AD;";
		if (ramo.equals("6")) 
			return "&#xE899;";
		if (ramo.equals("7")) 
			return "&#xE90E;";
		if (ramo.equals("8")) 
			return "&#xE88A;";
		if (ramo.equals("9")) 
			return "&#xE545;";
		if (ramo.equals("10")) 
			return "&#xE3EA;";
		if (ramo.equals("11")) 
			return "&#xE60E;";
		if (ramo.equals("12")) 
			return "&#xE8F9;";
		if (ramo.equals("13")) 
			return "&#xE333;";
		if (ramo.equals("14")) 
			return "&#xE7F1;";
		if (ramo.equals("15")) 
			return "&#xE02F;";
		if (ramo.equals("16")) 
			return "&#xE536;";
		if (ramo.equals("17")) 
			return "&#xE7FB;";
		if (ramo.equals("18")) 
			return "&#xE532;";
		if (ramo.equals("21")) 
			return "&#xE7FD;";
		if (ramo.equals("22")) 
			return "&#xE91B;";
		
		return "all_inclusive";
		
	}
	
	
	
	
	public static String getIconoMaterial(Object ramoIn) {
		
		if (ramoIn == null) 
			return "";
		String ramo = ramoIn.toString(); 
		
		if (ramo.equals("1")) 
			return "<i class='fas fa-fire-alt icono-cabecera-ramos'></i>";
		if (ramo.equals("2")) 
			return "<i class='fas fa-truck-moving icono-cabecera-ramos'></i>";
		if (ramo.equals("4")) 
			return "<i class='fas fa-car-alt icono-cabecera-ramos'></i>";
		if (ramo.equals("5")) 
			return "<i class='far fa-window-restore icono-cabecera-ramos'></i>";
		if (ramo.equals("6")) 
			return "<i class='fas fa-lock icono-cabecera-ramos'></i>";
		if (ramo.equals("7")) 
			return "<i class='fas fa-gavel icono-cabecera-ramos'></i>";
		if (ramo.equals("8")) 
			return "<i class='fas fa-home icono-cabecera-ramos'></i>";
		if (ramo.equals("10")) 
			return "<i class='fas fa-cloud-rain icono-cabecera-ramos'></i>";
		if (ramo.equals("13")) 
			return "<i class='fas fa-tv icono-cabecera-ramos'></i>";
		if (ramo.equals("14")) 
			return "<i class='fas fa-building icono-cabecera-ramos'></i>";
		if (ramo.equals("15")) 
			return "<i class='fas fa-file-alt icono-cabecera-ramos'></i>";
		if (ramo.equals("16")) 
			return "<i class='fas fa-walking icono-cabecera-ramos'></i>";
		if (ramo.equals("22")) 
			return "<i class='fas fa-motorcycle icono-cabecera-ramos'></i>";
		
		return "all_inclusive";
		
	}
	
	

	public static Object datoVacio(Object dato) {

		String dadoDefectoVacio = "<h6 style='color:#b3b0b0; display:inline;'>Sin dato</h6>";
		try {
			if (dato == null ) {
				return dadoDefectoVacio;
			}
			if (dato != null && dato.toString().equals("")) {
				return dadoDefectoVacio;
			}
			if (dato != null && dato.toString().trim().equals("")) {
				return dadoDefectoVacio;
			}
			if (dato != null && dato.toString().trim().length() == 1 && dato.toString().trim().equals("-")) {
				return dadoDefectoVacio;
			}
			

		} catch (Exception e) {
			logger.error("Error dato vacio ", e);
		}

		return dato.toString().trim();
	}

	public static String datoVacio(Object dato,Object dato1 , Object dato2) {

		String dadoDefectoVacio = "<h6 style='color:#b3b0b0;'>Sin dato</h6>";
		try {
			if (dato == null && dato1 == null) {
				return dadoDefectoVacio;
			}
			if ((dato == null || dato.toString().equals("")) &&  (dato1 == null || dato1.toString().equals(""))) {
				return dadoDefectoVacio;
			}
			
		
		
		} catch (Exception e) {
			logger.error("Error dato vacio ", e);
		}

		return  dato + "&nbsp;" + dato2 + "&nbsp;" + dato1;
	}
	
	public static Object datoVacioGuion(Object dato) {

		String dadoDefectoVacio = "<b>-</b>";
		try {
			if (dato == null ) {
				return dadoDefectoVacio;
			}
			if (dato != null && dato.toString().equals("")) {
				return dadoDefectoVacio;
			}
			if (dato != null && dato.toString().trim().equals("")) {
				return dadoDefectoVacio;
			}
			if (dato != null && dato.toString().trim().length() == 1 && dato.toString().trim().equals("-")) {
				return dadoDefectoVacio;
			}
			

		} catch (Exception e) {
			logger.error("Error dato vacio ", e);
		}

		return dato.toString().trim();
	}
	
	public static String getDescRamo(Object ramoIn) {
	
		if (ramoIn == null) 
			return "";
		String ramo = ramoIn.toString(); 

		
		
		
		if (ramo.equals("1")) 
			return "Incendio";
		if (ramo.equals("2")) 
			return "Transportes";
		if (ramo.equals("3")) 
			return "Aeronavegacion";
		if (ramo.equals("4")) 
			return "Automotores";
		if (ramo.equals("5")) 
			return "Cristales";
		if (ramo.equals("6")) 
			return "Robo";
		if (ramo.equals("7")) 
			return "Responsabilidad Civil";
		if (ramo.equals("8")) 
			return "Integrales";
		if (ramo.equals("9")) 
			return "Sepelio";
		if (ramo.equals("10")) 
			return "Granizo";
		if (ramo.equals("11")) 
			return "Ganado";
		if (ramo.equals("12")) 
			return "Accidentes del Trabajo";
		if (ramo.equals("13")) 
			return "Seguro Tecnico";
		if (ramo.equals("14")) 
			return "Riesgos Varios";
		if (ramo.equals("15")) 
			return "Caucion";
		if (ramo.equals("16")) 
			return "Accidentes Personales";
		if (ramo.equals("17")) 
			return "Vida Colectivo";
		if (ramo.equals("18")) 
			return "Cascos";
		if (ramo.equals("21")) 
			return "Vida Colectivo - Obligatorio";
		if (ramo.equals("22")) 
			return "Motovehiculos";
		
		return "";
		
	}

	
	public static String escalamientoWF (Object escalamiento){
		
		if (escalamiento == null) 
			return "";
		
		String prioridad = escalamiento.toString();
		
		if (prioridad.equals("NIVEL0")) 
			return "<a title='Estado Normal de la Tarea'   style='color:#808080;'>account_box</a>";
		
		if (prioridad.equals("NIVEL1")) 
			return "<a title='Aviso al Ajustador' style='color:#17a33d;'>account_box</a>";
		
		
		if (prioridad.equals("NIVEL2")) 
			return "<a  title='Aviso al jefe de Area' style='color:#1b83d0;'>account_box</a>";
		
		
		if (prioridad.equals("NIVEL3")) 
			return "<a  title='Aviso al jefe de Departamento' style='color:#ff6c00;'>account_box</a>";
		
		
		if (prioridad.equals("NIVEL4")) 
			return "<a  title='Aviso al SubGerente' style='color:red;'>account_box</a>";
		
		
		return "";
		
		
	}
	
	
	
	
	public static String formatearMoneda(Object numero){
		
		//if(numero.toString().isEmpty() || numero==""){
		if(numero == null || numero.equals("")){
		return (String) numero;
		}
		DecimalFormat formateador = new DecimalFormat("###,###,##0.00"); 
		if(((String) numero).indexOf('-') == 0){
		return "<a style='color:red'>$ "+formateador.format(Double.valueOf(numero.toString()))+"</a>";
		}
		else{
		return "$ "+formateador.format(Double.valueOf(numero.toString()));
		}
	}
	
	public static String formatearMonedaCotizador(Object numero){
		
		//if(numero.toString().isEmpty() || numero==""){
		if(numero == null || numero.equals("")){
		return (String) numero;
		}
		DecimalFormat formateador = new DecimalFormat("###,###,##0.00"); 
		return "$ "+formateador.format(Double.valueOf(numero.toString()));
	}
	
	
	public static String codigoTarjeta(String numero){
		if(numero.equals("")){
			return "</b><a style='color:#bfbac2;'>Sin dato</a>";
		}
		String dato = numero.substring(12,numero.length());
		return "xxxx xxxx xxxx " + dato;
	}
	
	
	
}
