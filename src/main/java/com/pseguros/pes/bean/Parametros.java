package com.pseguros.pes.bean;

public class Parametros {

	private String parametro;
	private String contenido;
	
	public Parametros(String p1, String p2) {
		this.parametro = p1;
		this.contenido = p2;

	}
	public String getParametro() {
		return parametro;
	}
	public void setParametro(String parametro) {
		this.parametro = parametro;
	}
	public String getContenido() {
		return contenido;
	}
	public void setContenido(String contenido) {
		this.contenido = contenido;
	}
	
	
}
