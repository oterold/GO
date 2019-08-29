package com.pseguros.pes.bean;

import java.util.Map;

public class ComponenteComparacionBean {


	
	private String sucursal;
	private String cotizacion;
	private String certificado;
	private String componente;
	private String monto;
	private String tasa;
	private String codigo;
	private int valor;
	
	
	public ComponenteComparacionBean(Map<String, Object> datosCoti1, String coti, String certificado2,int valor) {
		this.sucursal = (String) datosCoti1.get("P_TF_CACX_CACX_CAPJ_CD_SUCURSAL");
		this.cotizacion = (String) datosCoti1.get("P_TF_CACX_CACX_CAZB_NU_COTIZACION");
		this.certificado = (String) datosCoti1.get("P_TF_CACX_CACX_CAZB_NU_CONSECUTIVO");
		this.componente = (String) datosCoti1.get("P_TF_CACX_CAPP_DE_COMPONENTE");
		this.monto = (String) datosCoti1.get("P_TF_CACX_CACX_MT_COMPONENTE");
		this.tasa = (String) datosCoti1.get("P_TF_CACX_CACX_TA_COMPONENTE");
		this.codigo = (String) datosCoti1.get("P_TF_CACX_CACX_CAPP_CD_COMPONENTE");
		this.valor = valor;
		
		
	}
	public String getSucursal() {
		return sucursal;
	}
	public void setSucursal(String sucursal) {
		this.sucursal = sucursal;
	}
	public String getCotizacion() {
		return cotizacion;
	}
	
	public int getValor() {
		return valor;
	}
	public void setValor(int valor) {
		this.valor = valor;
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
	public String getComponente() {
		return componente;
	}
	public void setComponente(String componente) {
		this.componente = componente;
	}
	public String getMonto() {
		return monto;
	}
	public void setMonto(String monto) {
		this.monto = monto;
	}
	public String getTasa() {
		return tasa;
	}
	public void setTasa(String tasa) {
		this.tasa = tasa;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	
	
	
	
	
}
