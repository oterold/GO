package com.pseguros.pes.bean;

import java.util.List;

public class UsuarioLog {

	private String nombre;
	private String cantidad;
	
	private List<URLLog> accesos;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getCantidad() {
		return cantidad;
	}

	public void setCantidad(String cantidad) {
		this.cantidad = cantidad;
	}

	public List<URLLog> getAccesos() {
		return accesos;
	}

	public void setAccesos(List<URLLog> accesos) {
		this.accesos = accesos;
	}
	
	
	
	
}
