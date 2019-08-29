package com.pseguros.pes.controller.util.cache;

import java.util.ArrayList;

public class CacheMensajes {

	private ArrayList<Mensaje> mensajes;
	private boolean activo;
	private String comentario;

	public ArrayList<Mensaje> getMensajes() {
		return mensajes;
	}

	public boolean isActivo() {
		return activo;
	}

	public String getComentario() {
		return comentario;
	}

	public void setMensajes(ArrayList<Mensaje> mensajes) {
		this.mensajes = mensajes;
	}

	public void setActivo(boolean activo) {
		this.activo = activo;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

}
