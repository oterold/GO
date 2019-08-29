package com.pseguros.pes.bean;

import java.util.HashMap;

public class RamoBean {
	String ramo;
	public RamoBean(HashMap object) {
		this.ramo = (String) object.get("CTRA_CARP_CD_RAMO");
	}
	public RamoBean() {
	}
	public String getRamo() {
		return ramo;
	}
	public void setRamo(String ramo) {
		this.ramo = ramo;
	}
	
	
	

}
