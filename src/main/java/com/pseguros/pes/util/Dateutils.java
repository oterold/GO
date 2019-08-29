package com.pseguros.pes.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Dateutils {

	public static String formatearFecha(String dato) {
		String[] fechaSpl = dato.split("-");
		if (fechaSpl.length>1) {
			return fechaSpl[2] +"/"+fechaSpl[1] +"/"+fechaSpl[0] ;
		}else {
			return "";
		}
	}
	
	/**
	 * Formatea una fecha en el formato  "dd/MM/yyyy  hh:mm:ss"
	 * Se utiliza para persistir los datos en la base de datos
	 * 
	 * @param fecha
	 * @return
	 */
	public static String toDBFormat(Date fecha) {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy  HH:mm:ss");
		return formatter.format(fecha);
	}
	
	
	
	
	public static String toServiceFormat(Date fecha) {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		return formatter.format(fecha);
	}
	
	

	/**
	 * Devuelve el dia actual
	 * @return
	 */
	public static Date getNow() {
		return new Date(Calendar.getInstance().getTime().getTime());
	}

	/**
	 * Formato que recibe => 30/12/2012
	 * @param formatoString
	 * @return
	 */
	public static java.sql.Date getDate(String formatoString) {
		Calendar cal = Calendar.getInstance();
	    
	    cal.set( cal.YEAR, Integer.parseInt(formatoString.split("/")[2] ));
	    cal.set( cal.MONTH,Integer.parseInt(formatoString.split("/")[1]) - 1 );
	    cal.set( cal.DATE, Integer.parseInt(formatoString.split("/")[0]) );
	    
	    cal.set( cal.HOUR_OF_DAY, 0 );
	    cal.set( cal.MINUTE, 0 );
	    cal.set( cal.SECOND, 0 );
	    cal.set( cal.MILLISECOND, 0 );
	    
	    java.sql.Date jsqlD =  new java.sql.Date( cal.getTime().getTime() );
	    
	    
	    return jsqlD;
	    
	}



	/**
	 * Formato que recibe => 30/12/2012 10:15
	 * @param rangoDesde
	 * @return
	 */
	public static Date getDateHour(String rangoDesde) {
		Calendar cal = Calendar.getInstance();
	    
	    String formatoString = rangoDesde.split(" ")[0].trim();
		cal.set( cal.YEAR, Integer.parseInt(formatoString.split("/")[2] ));
	    cal.set( cal.MONTH,Integer.parseInt(formatoString.split("/")[1]) - 1 );
	    cal.set( cal.DATE, Integer.parseInt(formatoString.split("/")[0]) );
	    
	    String hora = rangoDesde.split(" ")[1].trim();
	    cal.set( cal.HOUR_OF_DAY, Integer.parseInt(hora.split(":")[0]) );
	    cal.set( cal.MINUTE, Integer.parseInt(hora.split(":")[1]) );
	    cal.set( cal.SECOND, 0 );
	    cal.set( cal.MILLISECOND, 0 );
	    
	    java.sql.Date jsqlD =  new java.sql.Date( cal.getTime().getTime() );
	    
	    
	    return jsqlD;
	}

	
	public static Date getDateHourGuiones(String fechaGuiones) {
		Calendar cal = Calendar.getInstance();
	    
	    String[] formatoString = fechaGuiones.split("-");
		cal.set( cal.YEAR, Integer.parseInt(formatoString[0] ));
	    cal.set( cal.MONTH,Integer.parseInt(formatoString[1]) - 1 );
	    cal.set( cal.DATE, Integer.parseInt(formatoString[2]) );
	    
	    java.sql.Date jsqlD =  new java.sql.Date( cal.getTime().getTime() );
	    
	    
	    return jsqlD;
	}

	
	
	
	public static String getHours(Date fecha) {
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
		return formatter.format(fecha);
	}

	/**
	 * ConBarras
	 * @param fecha
	 * @return
	 */
	public static String toDDMMYYYYConSeparador(Calendar fecha) {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		return formatter.format(fecha.getTime());
		
	}


	public static String toCustomFormat(Date fecha) {
		SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyyHHmmss");
		return formatter.format(fecha);
	}

	

}
