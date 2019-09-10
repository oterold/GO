package com.pseguros.pes.bean;

public class IngresarPersonaCotizador {
	
	private String tipoDni;
	private String dni;
	private String cf = "CF";
	private String cuit;
	private String nombre;
	private String apellido;
	private String sexo;
	private String estadoCivil;
	private String fecha;
	private String profesion;
	private String nacionalidad;
	private String lugarNacimiento;
	private String art;
	private String politicamenteExpuesto;
	private String observacion="";
	
	
	
	
	public String getObservacion() {
		return observacion;
	}
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}
	public String getTipoDni() {
		return tipoDni;
	}
	public void setTipoDni(String tipoDni) {
		this.tipoDni = tipoDni;
	}
	public String getDni() {
		return dni;
	}
	public void setDni(String dni) {
		this.dni = dni;
	}
	public String getCf() {
		return cf;
	}
	public void setCf(String cf) {
		this.cf = cf;
	}
	public String getCuit() {
		return cuit;
	}
	public void setCuit(String cuit) {
		this.cuit = cuit;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getEstadoCivil() {
		return estadoCivil;
	}
	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public String getProfesion() {
		return profesion;
	}
	public void setProfesion(String profesion) {
		this.profesion = profesion;
	}
	public String getNacionalidad() {
		return nacionalidad;
	}
	public void setNacionalidad(String nacionalidad) {
		this.nacionalidad = nacionalidad;
	}
	public String getLugarNacimiento() {
		return lugarNacimiento;
	}
	public void setLugarNacimiento(String lugarNacimiento) {
		this.lugarNacimiento = lugarNacimiento;
	}
	public String getArt() {
		return art;
	}
	public void setArt(String art) {
		this.art = art;
	}
	public String getPoliticamenteExpuesto() {
		return politicamenteExpuesto;
	}
	public void setPoliticamenteExpuesto(String politicamenteExpuesto) {
		this.politicamenteExpuesto = politicamenteExpuesto;
	}
	@Override
	public String toString() {
		return getObservacion()
				+ ";" + getTipoDni() + ";" + getDni()
				+ ";" + getCf() + ";" + getCuit()
				+ ";" +  getApellido() + ";"
				+ getNombre() + ";" + getSexo()
				+ ";" + getEstadoCivil() + ";"
				+ getFecha() + ";" + getProfesion()
				+ ";" + getNacionalidad()
				+ ";" + getLugarNacimiento()
				+ ";" + getArt() + ";"
				+ getPoliticamenteExpuesto()+";"+ getObservacion()+";;#";
	}

	
	
	
	
}
