package com.pseguros.pes.dto;

import java.util.HashMap;

import com.pseguros.pes.util.Dateutils;

public class SiniestroDTO {
	
	
	private Integer annio;
	private Integer ramo;
	private String descRamo;
	private Integer nroSiniestro;
	private Integer nroPoliza;
	private Integer certificado;
	private Integer endoso;
	private String feOcurrencia;
	private String feDeclaracion;
	private String reserva;
	private String pagos;
	private String recuperado;
	private String tipoSiniestro;
	private String tipoSiniestroDesc;
	private String entidad;
	private String atributo;
	private String asegurado;
	private String fechaDeclaracion;
	private String resultadoEntidad;
	
	public SiniestroDTO() {
		// TODO Auto-generated constructor stub
	}

	public SiniestroDTO(HashMap object) { 
		this.annio = Integer.valueOf(object.get("P_TF_SINI.SISI_NU_ANNIO").toString());
		this.ramo = Integer.valueOf(object.get("P_TF_SINI.SISI_CARP_CD_RAMO").toString());
		this.descRamo = object.get("P_TF_SINI.INB_DSP_RAMO").toString();
		this.nroSiniestro = Integer.valueOf(object.get("P_TF_SINI.SISI_NU_SINIESTRO").toString());
		this.nroPoliza = Integer.valueOf(object.get("P_TF_SINI.SISI_CAPO_NU_POLIZA").toString());
		this.certificado = Integer.valueOf(object.get("P_TF_SINI.SISI_CACE_NU_CERTIFICADO").toString());
		this.endoso = Integer.valueOf(object.get("P_TF_SINI.SISI_CACE_NU_ENDOSO").toString());
		this.feOcurrencia = object.get("P_TF_SINI.SISI_FE_OCURRENCIA").toString() != null	? Dateutils.formatearFecha(object.get("P_TF_SINI.SISI_FE_OCURRENCIA").toString() ): ""; 
		this.feDeclaracion = object.get("P_TF_SINI.SISI_FE_DECLARACION").toString() != null	? Dateutils.formatearFecha(object.get("P_TF_SINI.SISI_FE_DECLARACION").toString() ): ""; 
		this.reserva = object.get("P_TF_SINI.INB_MT_RESERVA").toString();
		this.pagos = object.get("P_TF_SINI.INB_MT_PAGOS").toString();
		this.recuperado = object.get("P_TF_SINI.SISI_MT_RECUPERADO").toString();
		this.tipoSiniestro = object.get("P_TF_SINI.SISI_SITP_TIPO_SINIESTRO").toString();
		this.tipoSiniestroDesc = object.get("P_TF_SINI.SITP_DE_TIPO_SINIESTRO").toString();
		this.entidad = object.get("P_TF_SINI.INB_ENTIDAD").toString();
		this.atributo = object.get("P_TF_SINI.INB_ATRIBUTO").toString();
		this.asegurado = object.get("P_TF_SINI.INB_DSP_ASEGURADO").toString();
		this.resultadoEntidad = object.get("P_TF_SINI.INB_IN_DATO_ENTIDAD").toString() ; 

		this.fechaDeclaracion = object.get("P_TF_SINI.SISI_FE_DECLARACION").toString() != null	? Dateutils.formatearFecha(object.get("P_TF_SINI.SISI_FE_DECLARACION").toString() ): "";  
	}

	
	
	public String getFechaDeclaracion() {
		return fechaDeclaracion;
	}

	public void setFechaDeclaracion(String fechaDeclaracion) {
		this.fechaDeclaracion = fechaDeclaracion;
	}

	public String getAsegurado() {
		return asegurado;
	}

	public void setAsegurado(String asegurado) {
		this.asegurado = asegurado;
	}

	public Integer getAnnio() {
		return annio;
	}

	public void setAnnio(Integer annio) {
		this.annio = annio;
	}

	public Integer getRamo() {
		return ramo;
	}

	public void setRamo(Integer ramo) {
		this.ramo = ramo;
	}

	public String getDescRamo() {
		return descRamo;
	}

	public void setDescRamo(String descRamo) {
		this.descRamo = descRamo;
	}

	public Integer getNroSiniestro() {
		return nroSiniestro;
	}

	public void setNroSiniestro(Integer nroSiniestro) {
		this.nroSiniestro = nroSiniestro;
	}

	public Integer getNroPoliza() {
		return nroPoliza;
	}

	public void setNroPoliza(Integer nroPoliza) {
		this.nroPoliza = nroPoliza;
	}

	public Integer getCertificado() {
		return certificado;
	}

	public void setCertificado(Integer certificado) {
		this.certificado = certificado;
	}

	public Integer getEndoso() {
		return endoso;
	}

	public void setEndoso(Integer endoso) {
		this.endoso = endoso;
	}

	public String getFeOcurrencia() {
		return feOcurrencia;
	}

	public void setFeOcurrencia(String feOcurrencia) {
		this.feOcurrencia = feOcurrencia;
	}

	public String getFeDeclaracion() {
		return feDeclaracion;
	}

	public void setFeDeclaracion(String feDeclaracion) {
		this.feDeclaracion = feDeclaracion;
	}



	public String getReserva() {
		return reserva;
	}

	public void setReserva(String reserva) {
		this.reserva = reserva;
	}

	public String getPagos() {
		return pagos;
	}

	public void setPagos(String pagos) {
		this.pagos = pagos;
	}

	public String getRecuperado() {
		return recuperado;
	}

	public void setRecuperado(String recuperado) {
		this.recuperado = recuperado;
	}

	public String getTipoSiniestro() {
		return tipoSiniestro;
	}

	public void setTipoSiniestro(String tipoSiniestro) {
		this.tipoSiniestro = tipoSiniestro;
	}

	public String getTipoSiniestroDesc() {
		return tipoSiniestroDesc;
	}

	public void setTipoSiniestroDesc(String tipoSiniestroDesc) {
		this.tipoSiniestroDesc = tipoSiniestroDesc;
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

	public String getResultadoEntidad() {
		return resultadoEntidad;
	}

	public void setResultadoEntidad(String resultadoEntidad) {
		this.resultadoEntidad = resultadoEntidad;
	}








}
