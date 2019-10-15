package com.pseguros.pes.bean.keycloack;

public class CredencialesKeycloack {

	private String type = "password";
	private String value  = "12341234";
	
	public CredencialesKeycloack(String password) {
		this.value = password;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
}
