package com.pseguros.pes.bean;


public class ComparacionCotizacionBean {
	
	private String etiqueda;
	private String auxEtiqueda;
	
	private String valorDatoA;
	private String auxValorDatoA;
	
	private String valorDatoB;
	private String auxValorDatoB;
	
	private boolean resultadoDeLaComparacion = false;
	
	
	public ComparacionCotizacionBean(String etiqueda, String valorDatoA, String valorDatoB) {
		super();
		this.etiqueda = etiqueda;
		this.valorDatoA = valorDatoA;
		this.valorDatoB = valorDatoB;
	}


	public String getEtiqueda() {
		return etiqueda;
	}


	public String getValorDatoA() {
		return valorDatoA;
	}


	public String getValorDatoB() {
		return valorDatoB;
	}


	public boolean isResultadoDeLaComparacion() {
		return resultadoDeLaComparacion;
	}


	public void setEtiqueda(String etiqueda) {
		this.etiqueda = etiqueda;
	}


	public void setValorDatoA(String valorDatoA) {
		this.valorDatoA = valorDatoA;
	}


	public void setValorDatoB(String valorDatoB) {
		this.valorDatoB = valorDatoB;
	}


	public void setResultadoDeLaComparacion(boolean resultadoDeLaComparacion) {
		this.resultadoDeLaComparacion = resultadoDeLaComparacion;
	}


	public void comparar() {
		if (valorDatoA.equals(valorDatoB)) {
			this.resultadoDeLaComparacion=true;
		}
		
	}


	public String getAuxEtiqueda() {
		return auxEtiqueda;
	}


	public void setAuxEtiqueda(String auxEtiqueda) {
		this.auxEtiqueda = auxEtiqueda;
	}


	public String getAuxValorDatoA() {
		return auxValorDatoA;
	}


	public void setAuxValorDatoA(String auxValorDatoA) {
		this.auxValorDatoA = auxValorDatoA;
	}


	public String getAuxValorDatoB() {
		return auxValorDatoB;
	}


	public void setAuxValorDatoB(String auxValorDatoB) {
		this.auxValorDatoB = auxValorDatoB;
	}
	
	
	
	
	
}
