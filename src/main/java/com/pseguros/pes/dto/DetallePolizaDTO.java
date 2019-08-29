package com.pseguros.pes.dto;


import java.util.List;

public class DetallePolizaDTO implements Cloneable{

    private PolizaDTO poliza;
    private List<CertificadoDTO> certificados;
    private List<VencimientoDTO> vencimientos;

    public DetallePolizaDTO() {
	super();
    }

    public DetallePolizaDTO(List<CertificadoDTO> certificados, List<VencimientoDTO> vencimientos) {
	super();
	this.certificados = certificados;
	this.vencimientos = vencimientos;
    }

    public List<CertificadoDTO> getCertificados() {
	return certificados;
    }

    public void setCertificados(List<CertificadoDTO> certificados) {
	this.certificados = certificados;
    }

    public List<VencimientoDTO> getVencimientos() {
	return vencimientos;
    }

    public void setVencimientos(List<VencimientoDTO> vencimientos) {
	this.vencimientos = vencimientos;
    }

    public PolizaDTO getPoliza() {
	return poliza;
    }

    public void setPoliza(PolizaDTO poliza) {
	this.poliza = poliza;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
    	// TODO Auto-generated method stub
    	return super.clone();
    }
}
