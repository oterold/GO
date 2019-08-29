package com.pseguros.pes.bean;

import java.util.List;

public class Reporte {

	private String nombreReporte;
	private List<Parametros> parametros;
	
	public Reporte(String p1, List<Parametros> lista) {
		this.nombreReporte = p1;
		this.parametros = lista;
	}
	public String getNombreReporte() {
		return nombreReporte;
	}
	public void setNombreReporte(String nombreReporte) {
		this.nombreReporte = nombreReporte;
	}
	public List<Parametros> getParametros() {
		return parametros;
	}
	public void setParametros(List<Parametros> parametros) {
		this.parametros = parametros;
	}
	
	
	
}

