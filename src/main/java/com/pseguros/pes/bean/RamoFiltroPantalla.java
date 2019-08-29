package com.pseguros.pes.bean;

public class RamoFiltroPantalla implements Comparable<RamoFiltroPantalla> {

	private String nombre;
	private Integer codigo;
	
	public RamoFiltroPantalla(String descRamo, Integer ramo) {
		this.nombre = descRamo;
		this.codigo = ramo;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public Integer getCodigo() {
		return codigo;
	}
	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	@Override
	public int compareTo(RamoFiltroPantalla o) {
		return o.getNombre().compareTo(this.getNombre());
				
	}

	@Override
	public boolean equals(Object o) {
		return ((RamoFiltroPantalla) o).getCodigo().equals(this.getCodigo()) && ((RamoFiltroPantalla) o).getNombre().equals(this.nombre);
	}
	
	
}
