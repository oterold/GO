package com.pseguros.pes.bean;

public class EstadoFiltroPantalla implements Comparable <EstadoFiltroPantalla>{
	
	private String estado;
	private String codigo;
	
	
	public  EstadoFiltroPantalla (String code , String descEstado)
	{
		this.estado = descEstado;
		this.codigo = code;
	
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	@Override
	public int compareTo(EstadoFiltroPantalla o) {
		return o.getEstado().compareTo(this.getEstado());
		
	}

	@Override
	public boolean equals(Object o) {
		return ((EstadoFiltroPantalla) o).getEstado().equals(this.getEstado());
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	

	
	
}
