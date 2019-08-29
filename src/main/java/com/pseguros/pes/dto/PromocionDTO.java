package com.pseguros.pes.dto;

import java.util.HashMap;

import com.pseguros.pes.util.Dateutils;

public class PromocionDTO {
	
	private Integer num;
	private String index;
	private String descProm;
	private String codDerivado;
	private String descDerivado;
	private String datoEntidad;
	private String entidad;
	private String atributo;


public PromocionDTO() {
	// TODO Auto-generated constructor stub
}


//constructor
public PromocionDTO(HashMap object) { 
	this.num = Integer.valueOf(object.get("P_TF_PROMO.RNUM").toString());
	this.index = object.get("P_TF_PROMO.CRTB_INDEX").toString();
	this.descProm = object.get("P_TF_PROMO.INB_PROMOCION").toString();
	this.codDerivado = object.get("P_TF_PROMO.CRTD_DERIVADO").toString();
	this.descDerivado = object.get("P_TF_PROMO.INB_DERIVADO").toString();
	this.datoEntidad = object.get("P_TF_PROMO.INB_IN_DATO_ENTIDAD").toString();
	this.entidad= object.get("P_TF_PROMO.INB_ENTIDAD").toString();
	this.atributo = object.get("P_TF_PROMO.INB_ATRIBUTO").toString();
}


	public Integer getNum() {
		return num;
	}
	public String getIndex() {
		return index;
	}
	public String getDescProm() {
		return descProm;
	}
	public String getCodDerivado() {
		return codDerivado;
	}
	public String getDescDerivado() {
		return descDerivado;
	}
	public String getDatoEntidad() {
		return datoEntidad;
	}
	public String getEntidad() {
		return entidad;
	}
	public String getAtributo() {
		return atributo;
	}
	public void setNum(Integer num) {
		this.num = num;
	}
	public void setIndex(String index) {
		this.index = index;
	}
	public void setDescProm(String descProm) {
		this.descProm = descProm;
	}
	public void setCodDerivado(String codDerivado) {
		this.codDerivado = codDerivado;
	}
	public void setDescDerivado(String descDerivado) {
		this.descDerivado = descDerivado;
	}
	public void setDatoEntidad(String datoEntidad) {
		this.datoEntidad = datoEntidad;
	}
	public void setEntidad(String entidad) {
		this.entidad = entidad;
	}
	public void setAtributo(String atributo) {
		this.atributo = atributo;
	}

	
}
