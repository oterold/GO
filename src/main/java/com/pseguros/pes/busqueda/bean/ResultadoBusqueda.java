package com.pseguros.pes.busqueda.bean;

import java.util.ArrayList;
import java.util.List;

public class ResultadoBusqueda {
	
	private List resultado= new ArrayList();
	private List ramos = new ArrayList();
	
	private Integer cantidadTotalDeRegistros;
	private String entidad;
	private Integer paginaActual;

	
	public ResultadoBusqueda(List datos, List ramos, Integer cantidadDeRegistros,String cardEntidad,int pagActual) {
		this.resultado = datos;
		this.ramos = ramos;
		this.cantidadTotalDeRegistros = cantidadDeRegistros;
		this.entidad=cardEntidad;
		this.paginaActual=pagActual;
	}
	
	public Integer getPaginaActual() {
		return paginaActual;
	}

	public void setPaginaActual(Integer paginaActual) {
		this.paginaActual = paginaActual;
	}

	public String getEntidad() {
		return entidad;
	}

	public void setEntidad(String entidad) {
		this.entidad = entidad;
	}

	public Integer getCantidadTotalDeRegistros() {
		return cantidadTotalDeRegistros;
	}

	public void setCantidadTotalDeRegistros(Integer cantidadTotalDeRegistros) {
		this.cantidadTotalDeRegistros = cantidadTotalDeRegistros;
	}

	public ResultadoBusqueda(List resultados) {
		this.resultado = resultados;
	}

	public List getResultado() {
		return resultado;
	}

	public void setResultado(List resultado) {
		this.resultado = resultado;
	}

	public List getRamos() {
		return ramos;
	}

	public void setRamos(List ramos) {
		this.ramos = ramos;
	}
	
	
	

}
