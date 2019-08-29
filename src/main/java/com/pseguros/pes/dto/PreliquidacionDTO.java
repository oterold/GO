package com.pseguros.pes.dto;

import java.util.HashMap;

import com.pseguros.pes.util.Dateutils;

public class PreliquidacionDTO {

	private Integer ramo;
	private Integer poliza;
	private Integer sucursal;
	private Integer remAEmitir;
	private Integer total;
	private String remesa;
	private Integer montoExigible;
	private Integer montoAPagar;
	private Integer certificado;
	private String fechaCobro;
	
	public PreliquidacionDTO(HashMap object) {
    	this.ramo = Integer.valueOf(object.get("P_TF_LISTA.RAMO").toString());
    	this.poliza = Integer.valueOf(object.get("P_TF_LISTA.POLIZA").toString());
    	this.sucursal = Integer.valueOf(object.get("P_TF_LISTA.SUCURSAL").toString());
    	this.remAEmitir = Integer.valueOf(object.get("P_TF_LISTA.MT_REM_A_EMITIR").toString());
    	this.total = Integer.valueOf(object.get("P_TF_LISTA.MT_TOTAL").toString());
    	//this.remesa = Integer.valueOf(object.get("P_TF_LISTA.REMESA_DEV").toString());
    	this.remesa = object.get("P_TF_LISTA.REMESA_DEV").toString() == null || object.get("P_TF_LISTA.REMESA_DEV").toString().equals("") ? "" : object.get("P_TF_LISTA.REMESA_DEV").toString();
    	
    	this.montoExigible = Integer.valueOf(object.get("P_TF_LISTA.MT_EXIGIBLE").toString());
    	this.montoAPagar = Integer.valueOf(object.get("P_TF_LISTA.MT_A_PAGAR").toString());
    	this.certificado = Integer.valueOf(object.get("P_TF_LISTA.CERTIFICADO").toString());
    	this.fechaCobro = object.get("P_TF_LISTA.FE_COBRO") != null	? Dateutils.formatearFecha(object.get("P_TF_LISTA.FE_COBRO").toString() ): "";
    }

	public Integer getRamo() {
		return ramo;
	}

	public void setRamo(Integer ramo) {
		this.ramo = ramo;
	}

	public Integer getPoliza() {
		return poliza;
	}

	public void setPoliza(Integer poliza) {
		this.poliza = poliza;
	}

	public Integer getSucursal() {
		return sucursal;
	}

	public void setSucursal(Integer sucursal) {
		this.sucursal = sucursal;
	}

	public Integer getRemAEmitir() {
		return remAEmitir;
	}

	public void setRemAEmitir(Integer remAEmitir) {
		this.remAEmitir = remAEmitir;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public String getRemesa() {
		return remesa;
	}

	public void setRemesa(String remesa) {
		this.remesa = remesa;
	}

	public Integer getMontoExigible() {
		return montoExigible;
	}

	public void setMontoExigible(Integer montoExigible) {
		this.montoExigible = montoExigible;
	}

	public Integer getMontoAPagar() {
		return montoAPagar;
	}

	public void setMontoAPagar(Integer montoAPagar) {
		this.montoAPagar = montoAPagar;
	}

	public Integer getCertificado() {
		return certificado;
	}

	public void setCertificado(Integer certificado) {
		this.certificado = certificado;
	}

	public String getFechaCobro() {
		return fechaCobro;
	}

	public void setFechaCobro(String fechaCobro) {
		this.fechaCobro = fechaCobro;
	}

	
}
