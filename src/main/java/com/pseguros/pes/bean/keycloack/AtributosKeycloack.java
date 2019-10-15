package com.pseguros.pes.bean.keycloack;

public class AtributosKeycloack {

	private String[] codigo_productor = new String[1];
	private String[] locale = new String[1];
	private String[] id_rol_rector = new String[1];
	
	public AtributosKeycloack(String productor, String string, String rol) {
		super();
		this.codigo_productor[0] = productor;
		this.locale[0] = string;
		this.id_rol_rector[0] = rol;
	}
	
	
	public String[] getCodigo_productor() {
		return codigo_productor;
	}


	public void setCodigo_productor(String[] codigo_productor) {
		this.codigo_productor = codigo_productor;
	}


	public String[] getLocale() {
		return locale;
	}
	public void setLocale(String[] locale) {
		this.locale = locale;
	}
	public String[] getId_rol_rector() {
		return id_rol_rector;
	}
	public void setId_rol_rector(String[] id_rol_rector) {
		this.id_rol_rector = id_rol_rector;
	}
	

	
}
