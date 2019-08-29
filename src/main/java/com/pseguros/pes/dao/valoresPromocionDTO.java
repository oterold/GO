package com.pseguros.pes.dao;

import java.util.HashMap;

public class valoresPromocionDTO {

	
	private String componente;
	private String feEfectiva;
	private String index;
	private String dato1;
	private String dato2;
	private String dato3;
	private String dato4;
	private String dato5;
	private String dato6;
	private String impuesto;
	private String fijo;
	private String minImponible;
	private String minImpuesto;
	private String formula;
	private String feHasta;
	private String baseMin;
	private String descFormula;
	private String usuario;
	private String dato7;
	
	
	
	
	
	public valoresPromocionDTO(HashMap object){
		
		this.componente = object.get("P_TF_CAPV.CAPV_CAPP_CD_COMPONENTE").toString();
		this.feEfectiva = object.get("P_TF_CAPV.CAPV_FE_EFECTIVA").toString();
		this.index = object.get("P_TF_CAPV.CAPV_CD_INDEX").toString();
		this.dato1 = object.get("P_TF_CAPV.CAPV_DATO1").toString();
		this.dato2 = object.get("P_TF_CAPV.CAPV_DATO2").toString();
		this.dato3 = object.get("P_TF_CAPV.CAPV_DATO3").toString();
		this.dato4 = object.get("P_TF_CAPV.CAPV_DATO4").toString();
		this.dato5 = object.get("P_TF_CAPV.CAPV_DATO5").toString();
		this.dato6 = object.get("P_TF_CAPV.CAPV_DATO6").toString();
		this.impuesto = object.get("P_TF_CAPV.CAPV_PO_IMPUESTO").toString();
		this.fijo = object.get("P_TF_CAPV.CAPV_MT_FIJO").toString();
		this.minImponible = object.get("P_TF_CAPV.CAPV_MT_MIN_IMPONIBLE").toString();
		this.minImpuesto = object.get("P_TF_CAPV.CAPV_MT_MIN_IMPUESTO").toString();
		this.formula = object.get("P_TF_CAPV.CAPV_DE_FORMULA").toString();
		this.feHasta = object.get("P_TF_CAPV.CAPV_FE_HASTA").toString();
		this.baseMin = object.get("P_TF_CAPV.CAPV_MT_BASE_MINIMA").toString();
		this.descFormula = object.get("P_TF_CAPV.CAPV_DESC_FORMULA").toString();
		this.usuario = object.get("P_TF_CAPV.CAPV_CAUS_CD_USUARIO").toString();
		this.dato7 = object.get("P_TF_CAPV.CAPV_DATO7").toString();

		
		
	}





	public String getComponente() {
		return componente;
	}





	public String getFeEfectiva() {
		return feEfectiva;
	}





	public String getIndex() {
		return index;
	}





	public String getDato1() {
		return dato1;
	}





	public String getDato2() {
		return dato2;
	}





	public String getDato3() {
		return dato3;
	}





	public String getDato4() {
		return dato4;
	}





	public String getDato5() {
		return dato5;
	}





	public String getDato6() {
		return dato6;
	}





	public String getImpuesto() {
		return impuesto;
	}





	public String getFijo() {
		return fijo;
	}





	public String getMinImponible() {
		return minImponible;
	}





	public String getMinImpuesto() {
		return minImpuesto;
	}





	public String getFormula() {
		return formula;
	}





	public String getFeHasta() {
		return feHasta;
	}





	public String getBaseMin() {
		return baseMin;
	}





	public String getDescFormula() {
		return descFormula;
	}





	public String getUsuario() {
		return usuario;
	}





	public String getDato7() {
		return dato7;
	}





	public void setComponente(String componente) {
		this.componente = componente;
	}





	public void setFeEfectiva(String feEfectiva) {
		this.feEfectiva = feEfectiva;
	}





	public void setIndex(String index) {
		this.index = index;
	}





	public void setDato1(String dato1) {
		this.dato1 = dato1;
	}





	public void setDato2(String dato2) {
		this.dato2 = dato2;
	}





	public void setDato3(String dato3) {
		this.dato3 = dato3;
	}





	public void setDato4(String dato4) {
		this.dato4 = dato4;
	}





	public void setDato5(String dato5) {
		this.dato5 = dato5;
	}





	public void setDato6(String dato6) {
		this.dato6 = dato6;
	}





	public void setImpuesto(String impuesto) {
		this.impuesto = impuesto;
	}





	public void setFijo(String fijo) {
		this.fijo = fijo;
	}





	public void setMinImponible(String minImponible) {
		this.minImponible = minImponible;
	}





	public void setMinImpuesto(String minImpuesto) {
		this.minImpuesto = minImpuesto;
	}





	public void setFormula(String formula) {
		this.formula = formula;
	}





	public void setFeHasta(String feHasta) {
		this.feHasta = feHasta;
	}





	public void setBaseMin(String baseMin) {
		this.baseMin = baseMin;
	}





	public void setDescFormula(String descFormula) {
		this.descFormula = descFormula;
	}





	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}





	public void setDato7(String dato7) {
		this.dato7 = dato7;
	}
	
	
}
