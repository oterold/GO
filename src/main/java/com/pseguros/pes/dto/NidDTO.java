package com.pseguros.pes.dto;

import java.util.HashMap;

public class NidDTO {

	private String nroSecuencia;
	private String nroCiclo;
	private String descCiclo;
	private String nroPoder;
	private String descPoder;
	private String nroProd;
	private String descProd;
	private String nroCedula;
	private String cliente;
	private String codEstado;
	private String descEstado;
	private String entidad;
	private String atributo;
	private String tipoEntidad;
	private String resultadoEntidad;
	private String ramo;
	private String descRamo;
	private String agenda;
	private String feActuali;
	private String nuOrigen;
	private String descNuOrigen;
	
	public NidDTO() {
		// TODO Auto-generated constructor stub
	}

	public NidDTO(HashMap object) {
		this.nroSecuencia = object.get("P_TF_NID.GEAC_NU_SECUENCIA").toString();
		this.nroCiclo = object.get("P_TF_NID.GEAC_GEAT_CD_TIPO_CICLO").toString();
		this.descCiclo = object.get("P_TF_NID.INB_TIPO_CICLO").toString();
		this.nroPoder = object.get("P_TF_NID.GEAC_CJDP_EN_PODER").toString();
		this.descPoder = object.get("P_TF_NID.INB_EN_PODER").toString();
		this.nroProd = object.get("P_TF_NID.GEAC_CAPD_CD_PRODUCTOR").toString();
		this.descProd = object.get("P_TF_NID.INB_DSP_PRODUCTOR").toString();
		this.nroCedula = object.get("P_TF_NID.GEAC_CACN_NU_CEDULA_RIF").toString();
		this.cliente = object.get("P_TF_NID.INB_CLIENTE").toString();
		this.codEstado = object.get("P_TF_NID.GEAC_ST_ESTADO").toString();
		this.descEstado = object.get("P_TF_NID.INB_DSP_ESTADO").toString();
		this.entidad = object.get("P_TF_NID.INB_ENTIDAD").toString();
		this.atributo = object.get("P_TF_NID.INB_ATRIBUTO").toString();
		this.resultadoEntidad = object.get("P_TF_NID.INB_IN_DATO_ENTIDAD").toString() ; 
		this.ramo = object.get("P_TF_NID.INB_NU_RAMO").toString() ; 
		this.descRamo = object.get("P_TF_NID.INB_DSP_RAMO").toString() ; 
		this.agenda = object.get("P_TF_NID.INB_F_AGENDA").toString() ; 
		this.feActuali = object.get("P_TF_NID.INB_F_ACTUALI").toString() ; 
		this.nuOrigen = object.get("P_TF_NID.INB_NU_ORIGEN").toString() ; 
		this.descNuOrigen = object.get("P_TF_NID.INB_DSP_ORIGEN").toString() ; 


	}

	public String getResultadoEntidad() {
		return resultadoEntidad;
	}

	public void setResultadoEntidad(String resultadoEntidad) {
		this.resultadoEntidad = resultadoEntidad;
	}

	public String getNroSecuencia() {
		return nroSecuencia;
	}

	public String getNroCiclo() {
		return nroCiclo;
	}

	public String getDescCiclo() {
		return descCiclo;
	}

	public String getNroPoder() {
		return nroPoder;
	}

	public String getDescPoder() {
		return descPoder;
	}

	public String getNroProd() {
		return nroProd;
	}

	public String getDescProd() {
		return descProd;
	}

	

	public String getCodEstado() {
		return codEstado;
	}

	public String getDescEstado() {
		return descEstado;
	}

	public String getEntidad() {
		return entidad;
	}

	public String getAtributo() {
		return atributo;
	}

	public String getTipoEntidad() {
		return tipoEntidad;
	}

	public void setNroSecuencia(String nroSecuencia) {
		this.nroSecuencia = nroSecuencia;
	}

	public void setNroCiclo(String nroCiclo) {
		this.nroCiclo = nroCiclo;
	}

	public void setDescCiclo(String descCiclo) {
		this.descCiclo = descCiclo;
	}

	public void setNroPoder(String nroPoder) {
		this.nroPoder = nroPoder;
	}

	public void setDescPoder(String descPoder) {
		this.descPoder = descPoder;
	}

	public void setNroProd(String nroProd) {
		this.nroProd = nroProd;
	}

	public void setDescProd(String descProd) {
		this.descProd = descProd;
	}

	public String getNroCedula() {
		return nroCedula;
	}

	public void setNroCedula(String nroCedula) {
		this.nroCedula = nroCedula;
	}

	
	public String getCliente() {
		return cliente;
	}

	public void setCliente(String cliente) {
		this.cliente = cliente;
	}

	public void setCodEstado(String codEstado) {
		this.codEstado = codEstado;
	}

	public void setDescEstado(String descEstado) {
		this.descEstado = descEstado;
	}

	public void setEntidad(String entidad) {
		this.entidad = entidad;
	}

	public void setAtributo(String atributo) {
		this.atributo = atributo;
	}

	public void setTipoEntidad(String tipoEntidad) {
		this.tipoEntidad = tipoEntidad;
	}

	public String getRamo() {
		return ramo;
	}

	public String getDescRamo() {
		return descRamo;
	}

	public String getAgenda() {
		return agenda;
	}

	public String getFeActuali() {
		return feActuali;
	}

	public String getNuOrigen() {
		return nuOrigen;
	}

	public String getDescNuOrigen() {
		return descNuOrigen;
	}

	public void setRamo(String ramo) {
		this.ramo = ramo;
	}

	public void setDescRamo(String descRamo) {
		this.descRamo = descRamo;
	}

	public void setAgenda(String agenda) {
		this.agenda = agenda;
	}

	public void setFeActuali(String feActuali) {
		this.feActuali = feActuali;
	}

	public void setNuOrigen(String nuOrigen) {
		this.nuOrigen = nuOrigen;
	}

	public void setDescNuOrigen(String descNuOrigen) {
		this.descNuOrigen = descNuOrigen;
	}

}
