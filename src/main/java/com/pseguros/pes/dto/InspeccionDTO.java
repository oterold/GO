package com.pseguros.pes.dto;

import java.util.HashMap;

public class InspeccionDTO {
	
	private Integer nroSecuencia;
	private Integer nroSucursal;
	private String descSucursal;
	private String codProducto;
	private String descProducto;
	private Integer nroRamo;
	private String descRamo;
	private String nroCedula;
	private String asegurado;
	private String nroInspeccion;
	private String estadoInspeccion;
	private String entidad;
	private String atributo;
	private String nroPoliza;
	private String fechaInspeccion;
	
	public InspeccionDTO(){
		
	}
	
	public InspeccionDTO(HashMap object) {
		
		this.nroSucursal = Integer.valueOf(object.get("P_TF_INSP.CAIN_CNIN_CASU_CD_SUCURSAL").toString());
		this.descSucursal = object.get("P_TF_INSP.INB_DSP_SUCURSAL").toString();
		this.nroRamo = Integer.valueOf(object.get("P_TF_INSP.CAIN_CNIN_CARP_CD_RAMO").toString());
		this.descRamo = object.get("P_TF_INSP.INB_DSP_RAMO").toString();
		this.nroCedula = object.get("P_TF_INSP.CAIN_NU_CEDULA_RIF").toString();
		this.asegurado = object.get("P_TF_INSP.CAIN_NM_CLIENTE").toString();
		this.codProducto = object.get("P_TF_INSP.CAIN_CAPU_CD_PRODUCTO").toString();
		this.descProducto = object.get("P_TF_INSP.INB_PRODUCTO").toString();
		this.nroInspeccion = object.get("P_TF_INSP.CAIN_NU_INSPECCION").toString();
		this.estadoInspeccion = object.get("P_TF_INSP.INB_ESTADO").toString();
		this.entidad = object.get("P_TF_INSP.INB_ENTIDAD").toString();
		this.atributo = object.get("P_TF_INSP.INB_ATRIBUTO").toString();
		this.nroPoliza = object.get("P_TF_INSP.CAIN_CACE_CAPO_NU_POLIZA").toString();
		this.fechaInspeccion = object.get("P_TF_INSP.CAIN_FE_INSPECCION").toString();

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

	public String getCodProducto() {
		return codProducto;
	}

	public void setCodProducto(String codProducto) {
		this.codProducto = codProducto;
	}

	public String getDescProducto() {
		return descProducto;
	}

	public void setDescProducto(String descProducto) {
		this.descProducto = descProducto;
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

	public String getNroInspeccion() {
		return nroInspeccion;
	}

	public void setNroInspeccion(String nroInspeccion) {
		this.nroInspeccion = nroInspeccion;
	}

	public String getEstadoInspeccion() {
		return estadoInspeccion;
	}

	public void setEstadoInspeccion(String estadoInspeccion) {
		this.estadoInspeccion = estadoInspeccion;
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

	public String getFechaInspeccion() {
		return fechaInspeccion;
	}

	public void setFechaInspeccion(String fechaInspeccion) {
		this.fechaInspeccion = fechaInspeccion;
	}
	
}
