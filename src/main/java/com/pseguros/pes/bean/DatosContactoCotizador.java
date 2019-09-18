package com.pseguros.pes.bean;

public class DatosContactoCotizador {
	
	private String dni;
	private String nombre;
	private String cuit;
	private String telefono;
	private String email;
	private String domicilio;
	private String canal;
	
	
	public String getCanal() {
		return canal;
	}
	public void setCanal(String canal) {
		this.canal = canal;
	}
	public String getDni() {
		return dni;
	}
	public String getNombre() {
		return nombre;
	}
	public String getCuit() {
		return cuit;
	}
	public String getTelefono() {
		return telefono;
	}
	public String getEmail() {
		return email;
	}
	public String getDomicilio() {
		return domicilio;
	}
	public void setDni(String dni) {
		this.dni = dni;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public void setCuit(String cuit) {
		this.cuit = cuit;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setDomicilio(String domicilio) {
		this.domicilio = domicilio;
	}
	
	
}
