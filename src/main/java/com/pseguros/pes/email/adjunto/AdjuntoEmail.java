package com.pseguros.pes.email.adjunto;

public class AdjuntoEmail {

	private String nameFile;
	private String locationFile;
	private boolean borrarDespuesDeEnviar = false;



	public AdjuntoEmail(String filePath, String name,boolean borrar) {
		this.nameFile = name;
		this.locationFile = filePath;
		this.borrarDespuesDeEnviar = borrar;
	}


	public AdjuntoEmail(String filePath, String name) {
		this.nameFile = name;
		this.locationFile = filePath;
	}


	public String getNameFile() {
		return nameFile;
	}


	public void setNameFile(String nameFile) {
		this.nameFile = nameFile;
	}


	public String getLocationFile() {
		return locationFile;
	}


	public void setLocationFile(String locationFile) {
		this.locationFile = locationFile;
	}


	public boolean isBorrarDespuesDeEnviar() {
		return borrarDespuesDeEnviar;
	}


	public void setBorrarDespuesDeEnviar(boolean borrarDespuesDeEnviar) {
		this.borrarDespuesDeEnviar = borrarDespuesDeEnviar;
	}

	
}
