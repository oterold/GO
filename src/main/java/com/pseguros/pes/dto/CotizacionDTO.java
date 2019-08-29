package com.pseguros.pes.dto;

import java.util.HashMap;

public class CotizacionDTO {
	
	private Integer cotizacion;
	private Integer nroSucursal;
	private String descSucursal;
	private Integer nroRamo;
	private String descRamo;
	private Integer nroProd;
	private String descProd;
	private String nroPoliza;
	private Integer nroEndoso;
	private Integer nroCertificado;
	private Integer nroCliente;
	private String descCliente;
	private String nroDocumento;
	private String descDocumento;
	private Integer nroCotizacion;
	private String descEstado;
	private String feCotizacion;
	private String feDesde;
	private String feHasta;
	private String feTecnicaHasta;
	private String feTecnicaDesde;
	private String moneda;
	private String premio;
	private String sumaAsegurada;
	private String descBien;
	private String entidad;
	private String atributo;
	private String resultadoEntidad;
	
	
	
	
	public CotizacionDTO()
	{
	}
	
	public CotizacionDTO(HashMap object)
	{
		try {  this.cotizacion = Integer.valueOf(object.get("P_TF_COTI.CAZB_NU_COTIZACION").toString());       } catch (Exception e) {	}
		try {  this.nroSucursal =  Integer.valueOf(object.get("P_TF_COTI.CAZB_CAPO_CD_SUCURSAL").toString()); 	} catch (Exception e) {	}
		try {  this.descSucursal = object.get("P_TF_COTI.INB_DSP_SUCURSAL").toString();                        } catch (Exception e) {	}
		try {  this.nroRamo = Integer.valueOf(object.get("P_TF_COTI.CAZB_CARP_CD_RAMO").toString());           } catch (Exception e) {	}
		try {  this.descRamo = object.get("P_TF_COTI.INB_DSP_RAMO").toString();                                } catch (Exception e) {	}
		try {  this.nroProd = Integer.valueOf(object.get("P_TF_COTI.CAZB_CAPD_CD_PRODUCTOR").toString());      } catch (Exception e) {	}
		try {  this.descProd = object.get("P_TF_COTI.INB_DSP_PRODUCTOR").toString();                           } catch (Exception e) {	}
		try {  this.nroPoliza = object.get("P_TF_COTI.CAZB_CAPO_NU_POLIZA").toString();                        } catch (Exception e) {	}
		try {  this.nroEndoso = Integer.valueOf(object.get("P_TF_COTI.CAZB_NU_ENDOSO").toString());            } catch (Exception e) {	}
		try {  this.nroCertificado = Integer.valueOf(object.get("P_TF_COTI.INB_CT_CERTIFICADOS").toString());  } catch (Exception e) {	}
		try {  this.nroCliente = Integer.valueOf(object.get("P_TF_COTI.CAZB_CACN_CD_CLIENTE").toString());     } catch (Exception e) {	}
		try {  this.descCliente = object.get("P_TF_COTI.INB_DSP_ASEGURADO").toString();                        } catch (Exception e) {	}
		try {  this.nroDocumento = object.get("P_TF_COTI.INB_NRO_DOCUMENTO").toString();                       } catch (Exception e) {	}
		try {  this.descDocumento = object.get("P_TF_COTI.INB_TP_DOCUMENTO").toString();                       } catch (Exception e) {	}
		try {  this.nroCotizacion = Integer.valueOf(object.get("P_TF_COTI.CAZB_ST_COTIZACION").toString());    } catch (Exception e) {	}
		try {  this.feCotizacion = object.get("P_TF_COTI.CAZB_FE_COTIZACION").toString();                      } catch (Exception e) {	}
		try {  this.feDesde = object.get("P_TF_COTI.CAZB_FE_DESDE").toString();                                } catch (Exception e) {	}
		try {  this.feHasta = object.get("P_TF_COTI.CAZB_FE_HASTA").toString();                                } catch (Exception e) {	}
		try {  this.feTecnicaDesde = object.get("P_TF_COTI.CAZB_FE_DESDE_TECNICA").toString();                 } catch (Exception e) {	}
		try {  this.feTecnicaHasta = object.get("P_TF_COTI.CAZB_FE_HASTA_TECNICA").toString();                 } catch (Exception e) {	}
		try {  this.moneda = object.get("P_TF_COTI.INB_CAMO_SM_MONEDA").toString();                            } catch (Exception e) {	}
		try {  this.premio = object.get("P_TF_COTI.CAZB_MT_PREMIO").toString();                                } catch (Exception e) {	}
		try {  this.sumaAsegurada = object.get("P_TF_COTI.CAZB_MT_SUMA_ASEGURADA").toString();                 } catch (Exception e) {	}
		try {  this.descBien = object.get("P_TF_COTI.INB_DSP_BIEN").toString();                                } catch (Exception e) {	}
		try {  this.entidad = object.get("P_TF_COTI.INB_ENTIDAD").toString();                                  } catch (Exception e) {	}
		try {  this.atributo = object.get("P_TF_COTI.INB_ATRIBUTO").toString();                                } catch (Exception e) {	}
		try {  this.resultadoEntidad = object.get("P_TF_COTI.INB_IN_DATO_ENTIDAD").toString() ;                } catch (Exception e) {	} 

	}

	public String getResultadoEntidad() {
		return resultadoEntidad;
	}

	public void setResultadoEntidad(String resultadoEntidad) {
		this.resultadoEntidad = resultadoEntidad;
	}

	public Integer getCotizacion() {
		return cotizacion;
	}

	public Integer getNroSucursal() {
		return nroSucursal;
	}

	public String getDescSucursal() {
		return descSucursal;
	}

	public Integer getNroRamo() {
		return nroRamo;
	}

	public String getDescRamo() {
		return descRamo;
	}

	public Integer getNroProd() {
		return nroProd;
	}

	public String getDescProd() {
		return descProd;
	}

	public String getNroPoliza() {
		return nroPoliza;
	}

	public Integer getNroEndoso() {
		return nroEndoso;
	}

	public Integer getNroCertificado() {
		return nroCertificado;
	}

	public Integer getNroCliente() {
		return nroCliente;
	}

	public String getDescCliente() {
		return descCliente;
	}

	public String getNroDocumento() {
		return nroDocumento;
	}

	public String getDescDocumento() {
		return descDocumento;
	}

	public Integer getNroCotizacion() {
		return nroCotizacion;
	}

	public String getDescEstado() {
		return descEstado;
	}

	public String getFeCotizacion() {
		return feCotizacion;
	}

	public String getFeDesde() {
		return feDesde;
	}

	public String getFeHasta() {
		return feHasta;
	}

	public String getFeTecnicaHasta() {
		return feTecnicaHasta;
	}

	public String getFeTecnicaDesde() {
		return feTecnicaDesde;
	}

	public String getMoneda() {
		return moneda;
	}


	public String getSumaAsegurada() {
		return sumaAsegurada;
	}

	public String getDescBien() {
		return descBien;
	}

	public String getEntidad() {
		return entidad;
	}

	public String getAtributo() {
		return atributo;
	}

	public void setCotizacion(Integer cotizacion) {
		this.cotizacion = cotizacion;
	}

	public void setNroSucursal(Integer nroSucursal) {
		this.nroSucursal = nroSucursal;
	}

	public void setDescSucursal(String descSucursal) {
		this.descSucursal = descSucursal;
	}

	public void setNroRamo(Integer nroRamo) {
		this.nroRamo = nroRamo;
	}

	public void setDescRamo(String descRamo) {
		this.descRamo = descRamo;
	}

	public void setNroProd(Integer nroProd) {
		this.nroProd = nroProd;
	}

	public void setDescProd(String descProd) {
		this.descProd = descProd;
	}

	public void setNroPoliza(String nroPoliza) {
		this.nroPoliza = nroPoliza;
	}

	public void setNroEndoso(Integer nroEndoso) {
		this.nroEndoso = nroEndoso;
	}

	public void setNroCertificado(Integer nroCertificado) {
		this.nroCertificado = nroCertificado;
	}

	public void setNroCliente(Integer nroCliente) {
		this.nroCliente = nroCliente;
	}

	public void setDescCliente(String descCliente) {
		this.descCliente = descCliente;
	}

	public void setNroDocumento(String nroDocumento) {
		this.nroDocumento = nroDocumento;
	}

	public void setDescDocumento(String descDocumento) {
		this.descDocumento = descDocumento;
	}

	public void setNroCotizacion(Integer nroCotizacion) {
		this.nroCotizacion = nroCotizacion;
	}

	public void setDescEstado(String descEstado) {
		this.descEstado = descEstado;
	}

	public void setFeCotizacion(String feCotizacion) {
		this.feCotizacion = feCotizacion;
	}

	public void setFeDesde(String feDesde) {
		this.feDesde = feDesde;
	}

	public void setFeHasta(String feHasta) {
		this.feHasta = feHasta;
	}

	public void setFeTecnicaHasta(String feTecnicaHasta) {
		this.feTecnicaHasta = feTecnicaHasta;
	}

	public void setFeTecnicaDesde(String feTecnicaDesde) {
		this.feTecnicaDesde = feTecnicaDesde;
	}

	public void setMoneda(String moneda) {
		this.moneda = moneda;
	}


	public String getPremio() {
		return premio;
	}

	public void setPremio(String premio) {
		this.premio = premio;
	}

	public void setSumaAsegurada(String sumaAsegurada) {
		this.sumaAsegurada = sumaAsegurada;
	}

	public void setDescBien(String descBien) {
		this.descBien = descBien;
	}

	public void setEntidad(String entidad) {
		this.entidad = entidad;
	}

	public void setAtributo(String atributo) {
		this.atributo = atributo;
	}
	
	
}
