package com.pseguros.pes.bean;

import java.util.ArrayList;
import java.util.List;

public class datoValoDefaultCotizacion {
	private String valorDefault;
	private ArrayList contenido;


	public datoValoDefaultCotizacion(String valorDefault, ArrayList contenido) {
		this.valorDefault = valorDefault;
		this.contenido= contenido;
	}


	public String getValorDefault() {
		return valorDefault;
	}
	public ArrayList getContenido() {
		return contenido;
	}
	public void setValorDefault(String valorDefault) {
		this.valorDefault = valorDefault;
	}
	public void setContenido(ArrayList contenido) {
		this.contenido = contenido;
	}
}

