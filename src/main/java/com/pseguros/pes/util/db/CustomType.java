package com.pseguros.pes.util.db;

public class CustomType {

	private String valor;

	public CustomType(String valor) {
		this.valor = valor;
	}

	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

	@Override
	public String toString() {
		if (valor != null) {
			return valor;
		} else {
			return "";
		}
	}

}
