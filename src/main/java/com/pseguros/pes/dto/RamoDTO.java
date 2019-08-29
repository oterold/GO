package com.pseguros.pes.dto;

public class RamoDTO {
	private String codigo;
	private String descripcion;
	
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	@Override
	  public boolean equals(Object o) {
	    if (this == o) return true;
	    if (o == null || getClass() != o.getClass()) return false;
	    return codigo.equals(((RamoDTO) o).codigo);
	  }

	  @Override
	  public int hashCode() {
	    return Integer.parseInt(codigo);
	  }
	
	
}
