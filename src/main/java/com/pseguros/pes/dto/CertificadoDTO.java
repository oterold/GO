package com.pseguros.pes.dto;

import java.util.HashMap;

public class CertificadoDTO {

	private Integer nroSecuencia;
	private Integer nroSucursal;
	private String descSucursal;
	private Integer nroEstadoPoliza;
	private String descEstadoPoliza;
	private Integer nroRamo;
	private String descRamo;
	private String nroCedula;
	private String asegurado;
	private String codDni;
	private String descDni;
	private String nroCertificado;
	private String estadoCertificado;
	private String entidad;
	private String atributo;
	private String nroPoliza;
	private String estadoPoliza;
	private String fechaVigencia;

	public CertificadoDTO() {
		// TODO Auto-generated constructor stub
	}

	public CertificadoDTO(HashMap object) {
		this.nroSucursal = Integer.valueOf(object.get("P_TF_CERT.CACE_CASU_CD_SUCURSAL").toString());
		this.descSucursal = object.get("P_TF_CERT.INB_DSP_SUCURSAL").toString();
		this.nroEstadoPoliza = Integer.valueOf(object.get("P_TF_CERT.INB_CD_ESTADO_POL").toString());
		this.descEstadoPoliza = object.get("P_TF_CERT.INB_DSP_ESTADO_POL").toString();
		this.nroRamo = Integer.valueOf(object.get("P_TF_CERT.CACE_CARP_CD_RAMO").toString());
		this.descRamo = object.get("P_TF_CERT.INB_DSP_RAMO").toString();
		this.nroCedula = object.get("P_TF_CERT.CACE_CACN_NU_CEDULA_RIF").toString();
		this.asegurado = object.get("P_TF_CERT.INB_DSP_ASEGURADO").toString();
		this.codDni = object.get("P_TF_CERT.INB_NRO_DOCUMENTO").toString();
		this.descDni = object.get("P_TF_CERT.INB_TP_DOCUMENTO").toString();
		this.nroCertificado = object.get("P_TF_CERT.CACE_NU_CERTIFICADO").toString();
		this.estadoCertificado = object.get("P_TF_CERT.INB_DSP_ESTADO_CERT").toString();
		this.entidad = object.get("P_TF_CERT.INB_ENTIDAD").toString();
		this.atributo = object.get("P_TF_CERT.INB_ATRIBUTO").toString();
		this.nroPoliza = object.get("P_TF_CERT.CACE_CAPO_NU_POLIZA").toString();
		this.estadoPoliza = object.get("P_TF_CERT.INB_DSP_ESTADO_POL").toString();
		this.fechaVigencia = object.get("P_TF_CERT.CACE_FE_HASTA").toString();

	}

	public Integer getNroSecuencia() {
		return nroSecuencia;
	}

	public void setNroSecuencia(Integer nroSecuencia) {
		this.nroSecuencia = nroSecuencia;
	}

	public Integer getNroSucursal() {
		return nroSucursal;
	}

	public void setNroSucursal(Integer nroSucursal) {
		this.nroSucursal = nroSucursal;
	}

	public String getDescSucursal() {
		return descSucursal;
	}

	public void setDescSucursal(String descSucursal) {
		this.descSucursal = descSucursal;
	}

	public Integer getNroEstadoPoliza() {
		return nroEstadoPoliza;
	}

	public void setNroEstadoPoliza(Integer nroEstadoPoliza) {
		this.nroEstadoPoliza = nroEstadoPoliza;
	}

	public String getDescEstadoPoliza() {
		return descEstadoPoliza;
	}

	public void setDescEstadoPoliza(String descEstadoPoliza) {
		this.descEstadoPoliza = descEstadoPoliza;
	}

	public Integer getNroRamo() {
		return nroRamo;
	}

	public void setNroRamo(Integer nroRamo) {
		this.nroRamo = nroRamo;
	}

	public String getDescRamo() {
		return descRamo;
	}

	public void setDescRamo(String descRamo) {
		this.descRamo = descRamo;
	}

	public String getNroCedula() {
		return nroCedula;
	}

	public void setNroCedula(String nroCedula) {
		this.nroCedula = nroCedula;
	}

	public String getAsegurado() {
		return asegurado;
	}

	public void setAsegurado(String asegurado) {
		this.asegurado = asegurado;
	}

	public String getCodDni() {
		return codDni;
	}

	public void setCodDni(String codDni) {
		this.codDni = codDni;
	}

	public String getDescDni() {
		return descDni;
	}

	public void setDescDni(String descDni) {
		this.descDni = descDni;
	}

	public String getNroCertificado() {
		return nroCertificado;
	}

	public void setNroCertificado(String nroCertificado) {
		this.nroCertificado = nroCertificado;
	}

	public String getEstadoCertificado() {
		return estadoCertificado;
	}

	public void setEstadoCertificado(String estadoCertificado) {
		this.estadoCertificado = estadoCertificado;
	}

	public String getEntidad() {
		return entidad;
	}

	public void setEntidad(String entidad) {
		this.entidad = entidad;
	}

	public String getAtributo() {
		return atributo;
	}

	public void setAtributo(String atributo) {
		this.atributo = atributo;
	}

	public String getNroPoliza() {
		return nroPoliza;
	}

	public void setNroPoliza(String nroPoliza) {
		this.nroPoliza = nroPoliza;
	}

	public String getFechaVigencia() {
		return fechaVigencia;
	}

	public void setFechaVigencia(String fechaVigencia) {
		this.fechaVigencia = fechaVigencia;
	}

	public String getEstadoPoliza() {
		return estadoPoliza;
	}

	public void setEstadoPoliza(String estadoPoliza) {
		this.estadoPoliza = estadoPoliza;
	}

}
