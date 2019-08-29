package com.pseguros.pes.bean;

import java.util.HashMap;

public class OrigenesParam {

	String codigo;
	String valor;

	public OrigenesParam(HashMap object) {
		this.codigo = (String) object.get("DATO");
		this.valor = (String) object.get("DATO");
		
	}

	public OrigenesParam() {
		// TODO Auto-generated constructor stub
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
