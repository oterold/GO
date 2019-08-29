package com.pseguros.pes.bean;

import java.util.Map;

public class ParametricoComparacionBean {

	private String label;
	private String labelCodigo;
	private String codigoDato;
	private String dato;
	private int valor;
	public ParametricoComparacionBean(Map<String, Object> datosCoti1, String codigoDato, String dato,int valor) {
		this.label = (String) datosCoti1.get("P_TF_PARAM_INB_LABEL");
		this.codigoDato = (String) datosCoti1.get("P_TF_PARAM_CRCO_DATO");
		this.dato = (String) datosCoti1.get("P_TF_PARAM_INB_DATO");
		this.labelCodigo = (String)datosCoti1.get("P_TF_PARAM_CRCO_CRTD_CD_DATO");
		this.valor = valor;
	}



	public Integer getValor() {
		return valor;
	}



	public void setValor(Integer valor) {
		this.valor = valor;
	}



	public String getLabelCodigo() {
		return labelCodigo;
	}

	public void setLabelCodigo(String labelCodigo) {
		this.labelCodigo = labelCodigo;
	}

	public String getLabel() {
		return label;
	}
	public String getCodigoDato() {
		return codigoDato;
	}
	public String getDato() {
		return dato;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public void setCodigoDato(String codigoDato) {
		this.codigoDato = codigoDato;
	}
	public void setDato(String dato) {
		this.dato = dato;
	}


}
