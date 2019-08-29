package com.pseguros.pes.bean;

import java.util.Map;

public class ComparacionTarifasBean {

	private String CodigoTarifa;
	private String Sequencia;
	private String Index;
	private String Prima;
	private String MontoPrima;
	private String primaAcum;
	private String Suma;
	private String Tasa;
	private String FeActu;
	private Integer valor;
	
	public ComparacionTarifasBean(Map<String, Object> datosCoti1, String codigoDato, String dato,int valor) {
		this.CodigoTarifa = (String) datosCoti1.get("P_TF_CRTU_CRTU_CRTA_CD_TARIFA");
		this.Sequencia = (String) datosCoti1.get("P_TF_CRTU_CRTU_CTPR_NU_SEQ");
		this.Index = (String) datosCoti1.get("P_TF_CRTU_CRTU_CRTA_INDEX");
		this.Prima = (String)datosCoti1.get("P_TF_CRTU_CRTU_TA_PRIMA");
		this.MontoPrima = (String) datosCoti1.get("P_TF_CRTU_CRTU_MT_PRIMA");
		this.primaAcum = (String) datosCoti1.get("P_TF_CRTU_CRTU_MT_PRIMA_ACUM");
		this.Suma = (String) datosCoti1.get("P_TF_CRTU_CRTU_MT_SUMA_ASEGURADA");
		this.Tasa = (String)datosCoti1.get("P_TF_CRTU_CRTU_CTPR_IN_USO_TASA");
		this.FeActu = (String)datosCoti1.get("P_TF_CRTU_CRTU_FE_ACTUALIZACION");
		this.valor = valor;
	}


	public Integer getValor() {
		return valor;
	}


	public void setValor(Integer valor) {
		this.valor = valor;
	}


	public String getCodigoTarifa() {
		return CodigoTarifa;
	}


	public String getSequencia() {
		return Sequencia;
	}


	public String getIndex() {
		return Index;
	}


	public String getPrima() {
		return Prima;
	}


	public String getMontoPrima() {
		return MontoPrima;
	}


	public String getPrimaAcum() {
		return primaAcum;
	}


	public String getSuma() {
		return Suma;
	}


	public String getTasa() {
		return Tasa;
	}


	public String getFeActu() {
		return FeActu;
	}


	public void setCodigoTarifa(String codigoTarifa) {
		CodigoTarifa = codigoTarifa;
	}


	public void setSequencia(String sequencia) {
		Sequencia = sequencia;
	}


	public void setIndex(String index) {
		Index = index;
	}


	public void setPrima(String prima) {
		Prima = prima;
	}


	public void setMontoPrima(String montoPrima) {
		MontoPrima = montoPrima;
	}


	public void setPrimaAcum(String primaAcum) {
		this.primaAcum = primaAcum;
	}


	public void setSuma(String suma) {
		Suma = suma;
	}


	public void setTasa(String tasa) {
		Tasa = tasa;
	}


	public void setFeActu(String feActu) {
		FeActu = feActu;
	}


	
	
}
