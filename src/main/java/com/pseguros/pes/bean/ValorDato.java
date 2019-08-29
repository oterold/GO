package com.pseguros.pes.bean;

import java.util.HashMap;

public class ValorDato {
String valor;
String tabla;
String clave;
String visualizacion;
public ValorDato(HashMap object) {
	this.valor = (String) object.get("CREW_DE_CLAVE");
	this.tabla = (String) object.get("CREW_DPTA_CD_TABLA");
	this.clave = (String) object.get("CREW_CD_CLAVE");
	this.visualizacion = (String) object.get("CREW_CREK_NU_VISUALIZACION");
	}
public ValorDato() {
}
public String getValor() {
	return valor;
}
public void setValor(String valor) {
	this.valor = valor;
}
public String getTabla() {
	return tabla;
}
public String getClave() {
	return clave;
}
public void setTabla(String tabla) {
	this.tabla = tabla;
}
public void setClave(String clave) {
	this.clave = clave;
}
public String getVisualizacion() {
	return visualizacion;
}
public void setVisualizacion(String visualizacion) {
	this.visualizacion = visualizacion;
}


}
