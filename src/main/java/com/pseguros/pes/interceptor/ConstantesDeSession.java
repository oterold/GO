package com.pseguros.pes.interceptor;

import com.pseguros.pes.util.properties.UtilProperties;


public class ConstantesDeSession {
	public static final String FILTRO_GENERAL_ESTADO_SOLAMENTE_ACTIVOS = "filtroGeneralEstadoSolamenteActivos";

	public  static final String USUARIO = "USUARIO_REGISTRADO";

	public static final String BREADCRUMB = "BREADCRUMB";

	public static final String USUARIO_DISPLAY = "DISPLAY";
	
	public static final String PATH_TMP = UtilProperties.getDato("PATH.TMP");

	

	public static final String DATOS_CONTACTO = "DATOS_CONTACTO";

///////////////////////////////////////////////////////// SESSIONES DE COTIZACION /////	
	public static final String DATO_ROLL = "DATO_ROLL";
	public static final String ESQUEMA_A = "ESQUEMA_A";
	public static final String ESQUEMA_B = "ESQUEMA_B";
	public static final String AUXILIAR = "AUXILIAR";
	
	public static final String DATOS_COTIZACION_GO = "DATOS_COTI_GO";
	

	//pantalla A
	public static final String NOMBRE_CLIENTE_COTIZADOR = "NOMBRE_CLIENTE_COTIZADOR";
	public static final String DNI_CLIENTE_COTIZADOR = "DNI_CLIENTE_COTIZADOR";
	public static final String CUIT_CLIENTE_COTIZADOR = "CUIT_CLIENTE_COTIZADOR";
	public static final String EMIAL_CLIENTE_COTIZADOR = "EMIAL_CLIENTE_COTIZADOR";
	public static final String DOMICIOLIO_CLIENTE_COTIZADOR = "DOMICIOLIO_CLIENTE_COTIZADOR";
	public static final String TELEFONO_CLIENTE_COTIZADOR = "TELEFONO_CLIENTE_COTIZADOR";


	//pantalla B
	public static final String PRODUCTO_COTIZACION = "PRODUCTO_COTIZACION";
	public static final String RAMO_COTIZACION = "RAMO_COTIZACION";
	
	public static final String DATOS_GUARDAR_STEP_2 = "DATOS_GUARDAR_STEP_2";
	public static final String COTIZACION_NUMERO_COTIZADOR = "COTIZACION_NUMERO_COTIZADOR";
	
}
