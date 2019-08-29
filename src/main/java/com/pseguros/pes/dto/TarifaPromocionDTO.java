package com.pseguros.pes.dto;

import java.util.HashMap;

public class TarifaPromocionDTO {

	
	private String ramo;
	private String codTarifa;
	private String tarifa;
	private String feEfectiva;
	private String index;
	private String feHasta;
	private String cobertura;
	private String descCobertura;
	private String codProducto;
	private String descProducto;
	private String datoUno;
	private String descDatoUno;
	private String datoDos;
	private String descDatoDos;
	private String datoTres;
	private String descDatoTres;
	private String datoCuatro;
	private String descDatoCuatro;
	private String datoCinco;
	private String descDatoCinco;
	private String datoSeis;
	private String descDatoSeis;
	private String suma;
	private String tasa;
	private String registro;


public TarifaPromocionDTO(HashMap object) {
	this.ramo = object.get("P_TF_CRTA.CRTA_CARP_CD_RAMO").toString();
	this.codTarifa = object.get("P_TF_CRTA.CRTA_CTDF_CD_TARIFA").toString();
	this.tarifa = object.get("P_TF_CRTA.CTDF_DE_TARIFA").toString();
	this.feEfectiva = object.get("P_TF_CRTA.CRTA_FE_EFECTIVA").toString();
	this.index = object.get("P_TF_CRTA.CRTA_DATO_INDEX").toString();
	this.feHasta = object.get("P_TF_CRTA.CRTA_FE_HASTA").toString();
	this.cobertura = object.get("P_TF_CRTA.CRTA_CACB_CD_COBERTURA").toString();
	this.descCobertura = object.get("P_TF_CRTA.CACB_DE_COBERTURA").toString();
	this.codProducto = object.get("P_TF_CRTA.CRTA_CAPU_CD_PRODUCTO").toString();
	this.descProducto = object.get("P_TF_CRTA.CAPU_DE_PRODUCTO").toString();
	this.datoUno = object.get("P_TF_CRTA.CRTA_DATO1").toString();
	this.descDatoUno = object.get("P_TF_CRTA.CRTB_DE_DATO1").toString();
	this.datoDos = object.get("P_TF_CRTA.CRTA_DATO2").toString();
	this.descDatoDos = object.get("P_TF_CRTA.CRTB_DE_DATO2").toString();
	this.datoTres = object.get("P_TF_CRTA.CRTA_DATO3").toString();
	this.descDatoTres = object.get("P_TF_CRTA.CRTB_DE_DATO3").toString();
	this.datoTres = object.get("P_TF_CRTA.CRTA_DATO3").toString();
	this.descDatoTres = object.get("P_TF_CRTA.CRTB_DE_DATO3").toString();
	this.datoCuatro = object.get("P_TF_CRTA.CRTA_DATO4").toString();
	this.descDatoCuatro = object.get("P_TF_CRTA.CRTB_DE_DATO4").toString();
	this.datoCinco = object.get("P_TF_CRTA.CRTA_DATO5").toString();
	this.descDatoCinco = object.get("P_TF_CRTA.CRTB_DE_DATO5").toString();
	this.datoSeis = object.get("P_TF_CRTA.CRTA_DATO6").toString();
	this.descDatoSeis = object.get("P_TF_CRTA.CRTB_DE_DATO6").toString();
	this.suma = object.get("P_TF_CRTA.CRTA_MT_SUMA").toString();
	this.tasa = object.get("P_TF_CRTA.CRTA_PO_TASA").toString();
	this.registro = object.get("P_TF_CRTA.CRTA_ID_REGISTRO").toString();

	
}


public String getRamo() {
	return ramo;
}


public String getCodTarifa() {
	return codTarifa;
}


public String getTarifa() {
	return tarifa;
}


public String getFeEfectiva() {
	return feEfectiva;
}


public String getIndex() {
	return index;
}


public String getFeHasta() {
	return feHasta;
}


public String getCobertura() {
	return cobertura;
}


public String getDescCobertura() {
	return descCobertura;
}


public String getCodProducto() {
	return codProducto;
}


public String getDescProducto() {
	return descProducto;
}


public String getDatoUno() {
	return datoUno;
}


public String getDescDatoUno() {
	return descDatoUno;
}


public String getDatoDos() {
	return datoDos;
}


public String getDescDatoDos() {
	return descDatoDos;
}


public String getDatoTres() {
	return datoTres;
}


public String getDescDatoTres() {
	return descDatoTres;
}


public String getDatoCuatro() {
	return datoCuatro;
}


public String getDescDatoCuatro() {
	return descDatoCuatro;
}


public String getDatoCinco() {
	return datoCinco;
}


public String getDescDatoCinco() {
	return descDatoCinco;
}


public String getDatoSeis() {
	return datoSeis;
}


public String getDescDatoSeis() {
	return descDatoSeis;
}


public String getSuma() {
	return suma;
}


public String getTasa() {
	return tasa;
}


public String getRegistro() {
	return registro;
}


public void setRamo(String ramo) {
	this.ramo = ramo;
}


public void setCodTarifa(String codTarifa) {
	this.codTarifa = codTarifa;
}


public void setTarifa(String tarifa) {
	this.tarifa = tarifa;
}


public void setFeEfectiva(String feEfectiva) {
	this.feEfectiva = feEfectiva;
}


public void setIndex(String index) {
	this.index = index;
}


public void setFeHasta(String feHasta) {
	this.feHasta = feHasta;
}


public void setCobertura(String cobertura) {
	this.cobertura = cobertura;
}


public void setDescCobertura(String descCobertura) {
	this.descCobertura = descCobertura;
}


public void setCodProducto(String codProducto) {
	this.codProducto = codProducto;
}


public void setDescProducto(String descProducto) {
	this.descProducto = descProducto;
}


public void setDatoUno(String datoUno) {
	this.datoUno = datoUno;
}


public void setDescDatoUno(String descDatoUno) {
	this.descDatoUno = descDatoUno;
}


public void setDatoDos(String datoDos) {
	this.datoDos = datoDos;
}


public void setDescDatoDos(String descDatoDos) {
	this.descDatoDos = descDatoDos;
}


public void setDatoTres(String datoTres) {
	this.datoTres = datoTres;
}


public void setDescDatoTres(String descDatoTres) {
	this.descDatoTres = descDatoTres;
}


public void setDatoCuatro(String datoCuatro) {
	this.datoCuatro = datoCuatro;
}


public void setDescDatoCuatro(String descDatoCuatro) {
	this.descDatoCuatro = descDatoCuatro;
}


public void setDatoCinco(String datoCinco) {
	this.datoCinco = datoCinco;
}


public void setDescDatoCinco(String descDatoCinco) {
	this.descDatoCinco = descDatoCinco;
}


public void setDatoSeis(String datoSeis) {
	this.datoSeis = datoSeis;
}


public void setDescDatoSeis(String descDatoSeis) {
	this.descDatoSeis = descDatoSeis;
}


public void setSuma(String suma) {
	this.suma = suma;
}


public void setTasa(String tasa) {
	this.tasa = tasa;
}


public void setRegistro(String registro) {
	this.registro = registro;
}




}


