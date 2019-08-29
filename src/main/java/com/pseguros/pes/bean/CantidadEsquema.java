package com.pseguros.pes.bean;

import java.util.HashMap;

public class CantidadEsquema {
	String esquema;
	public CantidadEsquema(HashMap object) {
		this.esquema = (String) object.get("CREW_DPTA_CD_TABLA");
	}
	public CantidadEsquema() {
	}
	public String getEsquema() {
		return esquema;
	}
	public void setEsquema(String esquema) {
		this.esquema = esquema;
	}
	
	
	

}
