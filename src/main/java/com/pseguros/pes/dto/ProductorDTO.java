package com.pseguros.pes.dto;

import java.util.HashMap;
public class ProductorDTO {
	
	private Integer codProductor;
	private String descDni;
	private String nroDni;
	private String nombreProd;
	private String nroSucursal;
	private String descSucursal;
	private String estadoProd;
	private String descEstadoProd;
	private String feAlta;
	private String feBaja;
	private String atributo;
	private String entidad;
	private String resultadoEntidad;

	public String getResultadoEntidad() {
		return resultadoEntidad;
	}

	public void setResultadoEntidad(String resultadoEntidad) {
		this.resultadoEntidad = resultadoEntidad;
	}

	public ProductorDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public ProductorDTO(HashMap object){
		this.codProductor = Integer.valueOf(object.get("P_TF_PROD.CAPD_CD_PRODUCTOR").toString());
		this.descDni = object.get("P_TF_PROD.CAPD_TP_DOCUMENTO").toString();
		this.nroDni = object.get("P_TF_PROD.CAPD_NU_DOCUMENTO").toString();
		this.nombreProd = object.get("P_TF_PROD.CAPD_NM_PRODUCTOR").toString();
		this.nroSucursal = object.get("P_TF_PROD.CAPD_CASU_CD_AGENCIA").toString();
		this.descSucursal= object.get("P_TF_PROD.INB_CD_AGENCIA").toString();
		this.estadoProd= object.get("P_TF_PROD.CAPD_ST_PRODUCTOR").toString();
		this.descEstadoProd= object.get("P_TF_PROD.INB_ST_PRODUCTOR").toString();
		this.feAlta= object.get("P_TF_PROD.CAPD_FE_ALTA").toString();
		this.feBaja= object.get("P_TF_PROD.CAPD_FE_BAJA").toString();
		this.atributo= object.get("P_TF_PROD.INB_ATRIBUTO").toString();
		this.entidad= object.get("P_TF_PROD.INB_ENTIDAD").toString();
		this.resultadoEntidad = object.get("P_TF_PROD.INB_IN_DATO_ENTIDAD").toString() ; 

		
	}

	public String getAtributo() {
		return atributo;
	}

	public void setAtributo(String atributo) {
		this.atributo = atributo;
	}

	public String getEntidad() {
		return entidad;
	}

	public void setEntidad(String entidad) {
		this.entidad = entidad;
	}

	public Integer getCodProductor() {
		return codProductor;
	}

	public void setCodProductor(Integer codProductor) {
		this.codProductor = codProductor;
	}

	public String getDescDni() {
		return descDni;
	}

	public void setDescDni(String descDni) {
		this.descDni = descDni;
	}

	public String getNroDni() {
		return nroDni;
	}

	public void setNroDni(String nroDni) {
		this.nroDni = nroDni;
	}

	public String getNombreProd() {
		return nombreProd;
	}

	public void setNombreProd(String nombreProd) {
		this.nombreProd = nombreProd;
	}

	public String getNroSucursal() {
		return nroSucursal;
	}

	public void setNroSucursal(String nroSucursal) {
		this.nroSucursal = nroSucursal;
	}

	public String getDescSucursal() {
		return descSucursal;
	}

	public void setDescSucursal(String descSucursal) {
		this.descSucursal = descSucursal;
	}

	public String getEstadoProd() {
		return estadoProd;
	}

	public void setEstadoProd(String estadoProd) {
		this.estadoProd = estadoProd;
	}

	public String getDescEstadoProd() {
		return descEstadoProd;
	}

	public void setDescEstadoProd(String descEstadoProd) {
		this.descEstadoProd = descEstadoProd;
	}

	public String getFeAlta() {
		return feAlta;
	}

	public void setFeAlta(String feAlta) {
		this.feAlta = feAlta;
	}

	public String getFeBaja() {
		return feBaja;
	}

	public void setFeBaja(String feBaja) {
		this.feBaja = feBaja;
	}


}
