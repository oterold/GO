package com.pseguros.pes.ldap;


import java.util.Map;

import org.apache.log4j.Logger;

public class UserPs {

	private static final Logger logger = Logger.getLogger(UserPs.class);

	
	private String nombre;
	private String userAcceso;
	private String email;
	public String getUserAcceso() {
		return userAcceso;
	}
	public void setUserAcceso(String userAcceso) {
		this.userAcceso = userAcceso;
	}
	private Map<String, String> datos;
	
	
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public UserPs(String nombre, String email) {
		super();
		this.nombre = nombre;
		this.email = email;
	}
	
	public UserPs(String nombre, String email, Map<String, String> datosUser) {
		this.nombre = nombre;
		this.email = email;
		this.datos = datosUser;
	}
	public Map<String, String> getDatos() {
		return datos;
	}
	public void setDatos(Map<String, String> datos) {
		this.datos = datos;
	}
	public String getEmailCompleto() {
		try {
			return getDatos().get("mailNickname").trim()+"@pseguros.com.ar";
		} catch (Exception e) {
			logger.error("Error al conseguir el email " , e);
			return "";
		}
	}
	
	public String getNameLdap() {
		try {
			
			return getDatos().get("name").trim();
		} catch (Exception e) {
			logger.error("Error al conseguir el nombre ldap" , e);
			return "";
		}
	}
	
	
	
	
}