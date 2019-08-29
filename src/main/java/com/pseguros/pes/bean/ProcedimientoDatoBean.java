package com.pseguros.pes.bean;


public class ProcedimientoDatoBean {

	
	private String nombre;
	private String paquete;
	
	public ProcedimientoDatoBean(String dato0, String dato1) {
		this.nombre = dato1;
		this.paquete = dato0;
		
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getPaquete() {
		return paquete;
	}
	public void setPaquete(String paquete) {
		this.paquete = paquete;
	}
	
	
	
}
