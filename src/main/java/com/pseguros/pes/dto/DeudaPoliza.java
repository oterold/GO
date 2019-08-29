package com.pseguros.pes.dto;

public class DeudaPoliza {

	
	private String deuda = "0";
	private String obs = "";
	private String datoSalida = "";
	
	
	public DeudaPoliza(String deuda, String obs, String datoSalida) {
		this.datoSalida= datoSalida;
		this.deuda = deuda;
		this.obs = obs;
	}


	public DeudaPoliza() {
		// TODO Auto-generated constructor stub
	}


	public String getDeuda() {
		return deuda;
	}


	public String getObs() {
		return obs;
	}


	public String getDatoSalida() {
		return datoSalida;
	}


	public void setDeuda(String deuda) {
		this.deuda = deuda;
	}


	public void setObs(String obs) {
		this.obs = obs;
	}


	public void setDatoSalida(String datoSalida) {
		this.datoSalida = datoSalida;
	}
	
	
	
}
