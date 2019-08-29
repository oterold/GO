package com.pseguros.pes.bean;

public class URLLog {

	private String url;
	private String pantalla;
	private String tipo;
	private String fecha;
	
	public URLLog(String fecha2, String pantalla2, String url2) {
		this.fecha = fecha2;
		this.url = url2;
		this.pantalla = pantalla2;
	
		 
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getPantalla() {
		return pantalla;
	}
	public void setPantalla(String pantalla) {
		this.pantalla = pantalla;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	
	
	
	
}
