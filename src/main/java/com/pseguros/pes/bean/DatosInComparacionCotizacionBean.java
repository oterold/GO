package com.pseguros.pes.bean;

public class DatosInComparacionCotizacionBean {

	
	private String cotizacionA;
	private String cotizacionB;
	private String certificado;
	private String plan;
	private String promo;
	private String tarifa;
	
	
	
	
	
	

	public DatosInComparacionCotizacionBean(String cotizacionA, String cotizacionB, String certificado, String plan, String promo, String tarifa) {
		super();
		this.cotizacionA = cotizacionA;
		this.cotizacionB = cotizacionB;
		this.certificado = certificado;
		this.plan = plan;
		this.promo = promo;
		this.tarifa = tarifa;
	}

	public DatosInComparacionCotizacionBean(String cotizacionA, String cotizacionB, String certificado) {
		super();
		this.cotizacionA = cotizacionA;
		this.cotizacionB = cotizacionB;
		this.certificado = certificado;
		this.plan = null;
		this.promo = null;
		this.tarifa = null;
	}
	
	
	
	public String getCotizacionA() {
		return cotizacionA;
	}
	public void setCotizacionA(String cotizacionA) {
		this.cotizacionA = cotizacionA;
	}
	public String getCotizacionB() {
		return cotizacionB;
	}
	public void setCotizacionB(String cotizacionB) {
		this.cotizacionB = cotizacionB;
	}
	public String getCertificado() {
		return certificado;
	}
	public void setCertificado(String certificado) {
		this.certificado = certificado;
	}
	public String getPlan() {
		return plan;
	}
	public void setPlan(String plan) {
		this.plan = plan;
	}
	public String getPromo() {
		return promo;
	}
	public void setPromo(String promo) {
		this.promo = promo;
	}
	public String getTarifa() {
		return tarifa;
	}
	public void setTarifa(String tarifa) {
		this.tarifa = tarifa;
	}
	
	
	
	
	
	
}
