package com.pseguros.pes.generic;

import com.pseguros.pes.util.properties.UtilProperties;

public class WebAplicatioonConst {

	public static final EnvironmentType ENTORNO = EnvironmentType.valueOf(UtilProperties.getDato("ENTORNO.WEB"));
	
	public static final String SESSION_USER = "SESSION_USER";
	public static final String SESSION_USER_LOGIN = "SESSION_USER_LOGIN";
	
	public static final String SESSION_USER_SIN_LOGIN_POLIZAS = "SESSION_POL_USER";
	public static final String SESSION_USER_SIN_LOGIN_EMAIL = "SESSION_EMAIL_EMAIL";
	public static final String SESSION_USER_SIN_LOGIN_TIPO_DOCUMENTO = "SESSION_EMAIL_TIPO";
	public static final String SESSION_USER_SIN_LOGIN_DOCUMENTO = "SESSION_EMAIL_DOC";
	

}
