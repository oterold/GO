package com.pseguros.pes.bean;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.Future;

public class DatosDinamicosCotizador {

	private DatoDinamicoType dato;
	private ArrayList listaValores;
	private Integer orden;
	private String valorCliente;
	private String valorFinalDinamico="";
	
	
	public DatosDinamicosCotizador(DatoDinamicoType dato, ArrayList listaValores, Integer orden) {
		this.dato = dato;
		this.listaValores = listaValores;
		this.orden = orden;
	}
	
	
	public DatoDinamicoType getDato() {
		return dato;
	}
	public String getValorFinalDinamico() {
		return valorFinalDinamico;
	}


	public void setValorFinalDinamico(String valorFinalDinamico) {
		this.valorFinalDinamico = valorFinalDinamico;
	}


	public ArrayList getListaValores() {
		return listaValores;
	}
	public Integer getOrden() {
		return orden;
	}
	public void setDato(DatoDinamicoType dato) {
		this.dato = dato;
	}
	public void setListaValores(ArrayList listaValores) {
		this.listaValores = listaValores;
	}
	public void setOrden(Integer orden) {
		this.orden = orden;
	}


	public String getValorCliente() {
		return valorCliente;
	}


	public void setValorCliente(String valorCliente) {
		this.valorCliente = valorCliente;
	}

	

	
	
}
