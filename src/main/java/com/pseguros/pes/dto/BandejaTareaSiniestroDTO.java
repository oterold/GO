package com.pseguros.pes.dto;

import java.util.HashMap;

public class BandejaTareaSiniestroDTO {

	private String siniestro;
	private String proceso;
	private String tarea;
	private String comienzo;
	private String finalizacion;
	private String resultado;
	private String patente;
	private String asegurado;
	private String feDeclaracion;
	private String feOcurrencia;
	private String anticipo;
	private String origen;
	private String responsable;
	private String	escalamiento;
	private String type;
	private String	key;
	private String activity;
	private String	id;
	
	
	
	
	public BandejaTareaSiniestroDTO(HashMap object){
		this.siniestro = object.get("P_TF_BANDEJA_TAREAS.WFB_FORMAT_SINI").toString();
		this.proceso = object.get("P_TF_BANDEJA_TAREAS.WFB_DISPLAY_NAME").toString();
		this.tarea = object.get("P_TF_BANDEJA_TAREAS.WFB_USER_COMMENT").toString();
		this.comienzo = object.get("P_TF_BANDEJA_TAREAS.WFB_BEGIN_DATE").toString();
		this.finalizacion = object.get("P_TF_BANDEJA_TAREAS.WFB_END_DATE").toString();
		this.resultado = object.get("P_TF_BANDEJA_TAREAS.WFB_RESULTADO").toString();
		this.patente = object.get("P_TF_BANDEJA_TAREAS.WFB_NU_PATENTE").toString();
		this.asegurado = object.get("P_TF_BANDEJA_TAREAS.WFB_CACN_NM_APELLIDO_RAZON").toString();
		this.feDeclaracion = object.get("P_TF_BANDEJA_TAREAS.WFB_FE_DECLARACION").toString();
		this.feOcurrencia = object.get("P_TF_BANDEJA_TAREAS.WFB_SISI_FE_OCURRENCIA").toString();
		this.anticipo = object.get("P_TF_BANDEJA_TAREAS.WFB_NU_ANTICIPO").toString();
		this.origen = object.get("P_TF_BANDEJA_TAREAS.WFB_CJDP_CD_DEPTO_ORIGEN").toString();
		this.responsable = object.get("P_TF_BANDEJA_TAREAS.WFB_RECIPIENT_ROLE").toString();
		this.escalamiento = object.get("P_TF_BANDEJA_TAREAS.WFB_ESCALAMIENTO").toString();
		this.type = object.get("P_TF_BANDEJA_TAREAS.WFB_ITEM_TYPE").toString();
		this.key = object.get("P_TF_BANDEJA_TAREAS.WFB_ITEM_KEY").toString();
		this.activity = object.get("P_TF_BANDEJA_TAREAS.WFB_PROCESS_ACTIVITY").toString();
		this.id = object.get("P_TF_BANDEJA_TAREAS.WFB_NOTIFICATION_ID").toString();

	}




	public String getType() {
		return type;
	}




	public String getKey() {
		return key;
	}




	public String getActivity() {
		return activity;
	}




	public String getId() {
		return id;
	}




	public void setType(String type) {
		this.type = type;
	}




	public void setKey(String key) {
		this.key = key;
	}




	public void setActivity(String activity) {
		this.activity = activity;
	}




	public void setId(String id) {
		this.id = id;
	}




	public String getSiniestro() {
		return siniestro;
	}




	public String getEscalamiento() {
		return escalamiento;
	}




	public void setEscalamiento(String escalamiento) {
		this.escalamiento = escalamiento;
	}




	public String getProceso() {
		return proceso;
	}




	public String getTarea() {
		return tarea;
	}




	public String getComienzo() {
		return comienzo;
	}




	public String getFinalizacion() {
		return finalizacion;
	}




	public String getResultado() {
		return resultado;
	}




	public String getPatente() {
		return patente;
	}




	public String getAsegurado() {
		return asegurado;
	}




	public String getFeDeclaracion() {
		return feDeclaracion;
	}




	public String getFeOcurrencia() {
		return feOcurrencia;
	}




	public String getAnticipo() {
		return anticipo;
	}




	public String getOrigen() {
		return origen;
	}




	public String getResponsable() {
		return responsable;
	}




	public void setSiniestro(String siniestro) {
		this.siniestro = siniestro;
	}




	public void setProceso(String proceso) {
		this.proceso = proceso;
	}




	public void setTarea(String tarea) {
		this.tarea = tarea;
	}




	public void setComienzo(String comienzo) {
		this.comienzo = comienzo;
	}




	public void setFinalizacion(String finalizacion) {
		this.finalizacion = finalizacion;
	}




	public void setResultado(String resultado) {
		this.resultado = resultado;
	}




	public void setPatente(String patente) {
		this.patente = patente;
	}




	public void setAsegurado(String asegurado) {
		this.asegurado = asegurado;
	}




	public void setFeDeclaracion(String feDeclaracion) {
		this.feDeclaracion = feDeclaracion;
	}




	public void setFeOcurrencia(String feOcurrencia) {
		this.feOcurrencia = feOcurrencia;
	}




	public void setAnticipo(String anticipo) {
		this.anticipo = anticipo;
	}




	public void setOrigen(String origen) {
		this.origen = origen;
	}




	public void setResponsable(String responsable) {
		this.responsable = responsable;
	}
	
	
	
	
	
	
	
}
