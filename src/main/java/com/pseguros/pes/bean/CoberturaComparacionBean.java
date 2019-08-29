package com.pseguros.pes.bean;

import java.util.Map;

public class CoberturaComparacionBean {

	private String sucursal;
	private String cotizacion;
	private String certificado;

	private String codigo;

	private String descripcion;
	private String tpMov;
	private String montoAnual;
	private String suma;
	private String franquicia;
	private String deducible;
	
	private String mov;
	private String primaAnual;
	private String elementos;
	private String mtPrima;
	private String taPrima;
	
	private String tasaAnual;
	private String capital;
	private String vida;
	private String ajuste;
	private int valor;
	
	
	public CoberturaComparacionBean(Map<String, Object> datosCoti1, String coti, String certificado2,int valor) {
		this.sucursal = (String) datosCoti1.get("P_TF_CACK_CACK_CAPJ_CD_SUCURSAL");
		this.cotizacion = (String) datosCoti1.get("P_TF_CACK_CACK_CAZB_NU_COTIZACION");
		this.certificado = (String) datosCoti1.get("P_TF_CACK_CACK_CAZB_NU_CONSECUTIVO");
		this.codigo = (String) datosCoti1.get("P_TF_CACK_CACK_CACB_CD_COBERTURA");
		this.descripcion = (String) datosCoti1.get("P_TF_CACK_CACB_DE_COBERTURA");
		

		this.suma = (String) datosCoti1.get("P_TF_CACK_CACK_MT_SUMA_ASEGURADA");
		this.franquicia = (String) datosCoti1.get("P_TF_CACK_CACK_PO_FRANQUICIA");
		this.deducible = (String) datosCoti1.get("P_TF_CACK_CACK_MT_DEDUCIBLE");

		this.mov = (String) datosCoti1.get("P_TF_CACK_CACK_TP_MOV");
		this.primaAnual = (String) datosCoti1.get("P_TF_CACK_CACK_MT_PRIMA_ANUAL");
		this.elementos = (String) datosCoti1.get("P_TF_CACK_CACK_NU_ELEMENTOS ");
		this.taPrima = (String) datosCoti1.get("P_TF_CACK_CACK_TA_PRIMA");
		this.mtPrima = (String) datosCoti1.get("P_TF_CACK_CACK_MT_PRIMA");
		this.tasaAnual = (String) datosCoti1.get("P_TF_CACK_CACK_TA_TASA_ANUAL");
		this.capital = (String) datosCoti1.get("P_TF_CACK_CACK_MT_CAPITAL_EXCLUIDO");
		this.vida = (String) datosCoti1.get("P_TF_CACK_CACK_FACTOR_VIDA");
		this.ajuste = (String) datosCoti1.get("P_TF_CACK_CACK_FACTOR_AJUSTE");

		this.sucursal = (String) datosCoti1.get("P_TF_CACK_CACK_CAPJ_CD_SUCURSAL");
		this.valor = valor;
	}
	
	
	public String getSucursal() {
		return sucursal;
	}
	public void setSucursal(String sucursal) {
		this.sucursal = sucursal;
	}
	
	
	public Integer getValor() {
		return valor;
	}


	public void setValor(Integer valor) {
		this.valor = valor;
	}


	public String getCotizacion() {
		return cotizacion;
	}
	public void setCotizacion(String cotizacion) {
		this.cotizacion = cotizacion;
	}
	public String getCertificado() {
		return certificado;
	}
	public void setCertificado(String certificado) {
		this.certificado = certificado;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getTpMov() {
		return tpMov;
	}
	public void setTpMov(String tpMov) {
		this.tpMov = tpMov;
	}

	public String getMontoAnual() {
		return montoAnual;
	}
	public void setMontoAnual(String montoAnual) {
		this.montoAnual = montoAnual;
	}
	public String getSuma() {
		return suma;
	}
	public void setSuma(String suma) {
		this.suma = suma;
	}
	public String getFranquicia() {
		return franquicia;
	}
	public void setFranquicia(String franquicia) {
		this.franquicia = franquicia;
	}
	public String getDeducible() {
		return deducible;
	}
	public void setDeducible(String deducible) {
		this.deducible = deducible;
	}


	public String getMov() {
		return mov;
	}


	public void setMov(String mov) {
		this.mov = mov;
	}


	public String getPrimaAnual() {
		return primaAnual;
	}


	public void setPrimaAnual(String primaAnual) {
		this.primaAnual = primaAnual;
	}


	public String getElementos() {
		return elementos;
	}


	public void setElementos(String elementos) {
		this.elementos = elementos;
	}





	public String getTasaAnual() {
		return tasaAnual;
	}


	public void setTasaAnual(String tasaAnual) {
		this.tasaAnual = tasaAnual;
	}


	public String getCapital() {
		return capital;
	}


	public void setCapital(String capital) {
		this.capital = capital;
	}


	public String getVida() {
		return vida;
	}


	public void setVida(String vida) {
		this.vida = vida;
	}


	public String getAjuste() {
		return ajuste;
	}


	public void setAjuste(String ajuste) {
		this.ajuste = ajuste;
	}


	public String getMtPrima() {
		return mtPrima;
	}


	public void setMtPrima(String mtPrima) {
		this.mtPrima = mtPrima;
	}


	public String getTaPrima() {
		return taPrima;
	}


	public void setTaPrima(String taPrima) {
		this.taPrima = taPrima;
	}
	
	
	
	
	
}
