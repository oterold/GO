package com.pseguros.pes.bean;

public class PromocionesList {

	private String Mensaje;
	private String Dpro;
	private String fecha;
	private String user;


public PromocionesList(String mensaje,String dpro,String fecha,String user){
	this.Mensaje = Mensaje;
	this.Dpro = dpro;
	this.fecha = fecha;
}


public String getUser() {
	return user;
}


public void setUser(String user) {
	this.user = user;
}


public String getMensaje() {
	return Mensaje;
}


public String getDpro() {
	return Dpro;
}


public String getFecha() {
	return fecha;
}


public void setMensaje(String mensaje) {
	Mensaje = mensaje;
}


public void setDpro(String dpro) {
	Dpro = dpro;
}


public void setFecha(String fecha) {
	this.fecha = fecha;
}





}