package com.pseguros.pes.bean;

public class RegistroExcelCC {
	
	private String fechaMovimiento;
	private String movimiento;
	private String movimientoDesc;
	private String comprobante;
	private String remesa;
	private String imputacion;
	private String comision;
	private String observacion;
	
	
	public String getFechaMovimiento() {
		return fechaMovimiento;
	}
	public String getMovimiento() {
		return movimiento;
	}
	public String getMovimientoDesc() {
		return movimientoDesc;
	}
	public String getImputacion() {
		return imputacion;
	}
	public String getComision() {
		return comision;
	}
	public void setMovimiento(String movimiento) {
		this.movimiento = movimiento;
	}
	public void setMovimientoDesc(String movimientoDesc) {
		this.movimientoDesc = movimientoDesc;
	}
	public void setImputacion(String imputacion) {
		this.imputacion = imputacion;
	}
	public void setComision(String comision) {
		this.comision = comision;
	}
	public String getObservacion() {
		return observacion;
	}
	public String getComprobante() {
		return comprobante;
	}
	public String getRemesa() {
		return remesa;
	}
	public void setFechaMovimiento(String fechaMovimiento) {
		this.fechaMovimiento = fechaMovimiento;
	}
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}
	public void setComprobante(String comprobante) {
		this.comprobante = comprobante;
	}
	public void setRemesa(String remesa) {
		this.remesa = remesa;
	}

	
}
