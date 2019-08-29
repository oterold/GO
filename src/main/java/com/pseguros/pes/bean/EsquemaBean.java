package com.pseguros.pes.bean;

import java.util.HashMap;

public class EsquemaBean {

	String codigo;
	String valor;

	public EsquemaBean(HashMap object) {
		this.codigo = (String) object.get("ESQUEMA");
		this.valor = (String) object.get("NOMBRE");
	}

	public EsquemaBean() {
	}

	public String getCodigo() {
		return codigo;
	}

	public String getValor() {
		return valor;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

}
