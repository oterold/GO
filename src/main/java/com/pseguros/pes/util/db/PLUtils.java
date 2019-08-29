package com.pseguros.pes.util.db;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Set;

import com.pseguros.pes.bean.DatoDinamicoType;

public class PLUtils {

	public static String obtenerNombreCursor(HashMap elementoDelCursor) {
		Set keys = elementoDelCursor.keySet();
		for (Object object : keys) {
			String key = (String) object;
			//return key.substring(0,key.indexOf("."));
			return key.replace(".","-").split("-")[0];
		}
		return "";
	}
	
	
	public static DatoDinamicoType cargarDatoType(HashMap elementoDelCursor) throws Exception {
		DatoDinamicoType resultado = new DatoDinamicoType();
		
		Method[] metodos=resultado.getClass().getMethods();
	    
		String nombreCursor = PLUtils.obtenerNombreCursor(elementoDelCursor);
		
		for(Method m: metodos) {   
			if(m.getName().contains("set")){
	          m.invoke(resultado, tomarDatoMapa(nombreCursor,elementoDelCursor,m.getName()));
			}
		}
	      
		return resultado;
	}
	
	

	private static Object tomarDatoMapa(String nombreCursor, HashMap elementoDelCursor, String nombreMetodo) {
		String dato = "";
		for (char c: nombreMetodo.toCharArray ()) {
			  if(Character.isUpperCase(c)){         
				  dato = dato +"_"+c;		
			  }else{
			  dato = dato +c;
			}
		}
		
		dato = dato.substring(4,dato.length());
		
		return elementoDelCursor.get(nombreCursor + "." + dato.toUpperCase());
		
		}
	
	

}
