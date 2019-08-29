package com.pseguros.pes.controller.util.cache;

import java.util.ArrayList;

public class Mensaje {
	
	private String id;
	private String tipo;
	private String mensaje;
	private int vecesDisplayaTotal;
	private int vecesDisplayaPorUsuario;
	private ArrayList<FechaMensaje> fechas;
	private ArrayList<String> usuarios;

	public ArrayList<String> getUsuarios() {
		return usuarios;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setUsuarios(ArrayList<String> usuarios) {
		this.usuarios = usuarios;
	}

	public String getTipo() {
		return tipo;
	}

	public String getMensaje() {
		return mensaje;
	}

	public int getVecesDisplayaTotal() {
		return vecesDisplayaTotal;
	}

	public int getVecesDisplayaPorUsuario() {
		return vecesDisplayaPorUsuario;
	}

	public ArrayList<FechaMensaje> getFechas() {
		return fechas;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public void setVecesDisplayaTotal(int vecesDisplayaTotal) {
		this.vecesDisplayaTotal = vecesDisplayaTotal;
	}

	public void setVecesDisplayaPorUsuario(int vecesDisplayaPorUsuario) {
		this.vecesDisplayaPorUsuario = vecesDisplayaPorUsuario;
	}

	public void setFechas(ArrayList<FechaMensaje> fechas) {
		this.fechas = fechas;
	}

}
