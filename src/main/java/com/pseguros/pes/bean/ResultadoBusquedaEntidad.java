package com.pseguros.pes.bean;

import java.util.ArrayList;
import java.util.List;

/**
 * Objeto que nos va a devolver todas las busquedas de la pantalla principal
 * @author grisaym
 *
 */
public class ResultadoBusquedaEntidad {

	private List resultados = new ArrayList();
	private List ramos = new ArrayList();
	
	private Integer cantidadTotalDeRegistros;
	private Integer registroDesde;
	private Integer registroHasta;
	private Integer paginaActual;
	
	
	public ResultadoBusquedaEntidad(List datos, Integer cantidadDeRegistros, Integer inicio, Integer fin, Integer datoPagina , List ramos) {
		this.resultados = datos;
		this.cantidadTotalDeRegistros = cantidadDeRegistros;
		this.registroHasta = fin;
		this.registroDesde = inicio;
		this.paginaActual = datoPagina;
		this.ramos = ramos;
		
	}
	
	public ResultadoBusquedaEntidad() {
		
	}

	public List getResultados() {
		return resultados;
	}
	public void setResultados(List resultados) {
		this.resultados = resultados;
	}
	public Integer getCantidadTotalDeRegistros() {
		return cantidadTotalDeRegistros;
	}
	public void setCantidadTotalDeRegistros(Integer cantidadTotalDeRegistros) {
		this.cantidadTotalDeRegistros = cantidadTotalDeRegistros;
	}
	public Integer getRegistroDesde() {
		return registroDesde;
	}
	public Integer getPaginaActual() {
		return paginaActual;
	}

	public void setPaginaActual(Integer paginaActual) {
		this.paginaActual = paginaActual;
	}

	public void setRegistroDesde(Integer registroDesde) {
		this.registroDesde = registroDesde;
	}
	public Integer getRegistroHasta() {
		return registroHasta;
	}
	public void setRegistroHasta(Integer registroHasta) {
		this.registroHasta = registroHasta;
	}

	public List getRamos() {
		return ramos;
	}

	public void setRamos(List ramos) {
		this.ramos = ramos;
	}
	

	
	
}
