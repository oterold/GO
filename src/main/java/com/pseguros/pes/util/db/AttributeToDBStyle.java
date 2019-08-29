package com.pseguros.pes.util.db;

public class AttributeToDBStyle {

	/**
	 * Pasa el campo hola_casa a holaCasa
	 * @param dato
	 * @return
	 */
	public static String dbToAtribute(String dato) {
		String campo = dato.toLowerCase();
		StringBuffer rtn = new StringBuffer();
		boolean mayuscula = false;
		for (int i = 0; i < campo.length(); i++) {
			if (campo.charAt(i) == "_".toCharArray()[0]) {
				mayuscula = true;
			} else {
				if (mayuscula) {
					StringBuffer rtn3 = new StringBuffer();
					rtn3.append(campo.charAt(i));
					rtn.append(rtn3.toString().toUpperCase());
					mayuscula = false;
				} else {
					rtn.append(campo.charAt(i));
				}
			}
		}
		return rtn.toString();
	}
	
	
	/**
	 * Pasa el campo holaCasa a HOLA_CASA
	 * @param dato
	 * @return
	 */
	public static String atributeToDB(String cadena) {
		StringBuffer nuevaCadena = new StringBuffer();
		for (int i=0;i<cadena.length(); i++)
		{
		   if (i>0 && Character.isUpperCase(cadena.charAt(i))) {
		      nuevaCadena.append("_");
		   }
		   nuevaCadena.append(cadena.charAt(i));
		}
		return nuevaCadena.toString().toUpperCase();
	}
}
