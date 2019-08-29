package com.pseguros.pes.dto;


import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.HashMap;

import com.pseguros.pes.util.Dateutils;

public class PolizaDTO {

    private Integer poliza;
    private Integer ramo;
    private Integer certificado;
    private Integer sucursal;
    private String vigenciaDesde;
    private String vigenciaHasta;
    private String sumaAsegurada;
    private String descripcion;
    private String cantCerticados;
    private String flota;
    private String isla = "N";
    private String descRamo;
    private String codProductor;
    private String descProductor;
    private String codCliente;
    private String asegurado;
    private String tpDocumento;
    private String nuDocumento;
    private String descEstado;
    private String feOperacion;
    private String polizaSiguiente;
    private String vigenciaTecnicaDesde;
    private String vigenciaTecnicaHasta;
    private String simbMoneda;
    private String premio;
    private String deuda;
    private String saldoVencido;
    private String descSucursal;
    private String polizaAnterior;
    private String entidad;
    private String atributo;
    private String codEstado;
    private String plan;
    private String encontradoEntidad;
    
    public PolizaDTO(ResultSet rs) throws Exception {
	super();

	this.plan = rs.getString("INB_PLAN");
	this.poliza = Integer.valueOf(rs.getString("CACE_CAPO_NU_POLIZA"));
	this.ramo = Integer.valueOf(rs.getString("CACE_CARP_CD_RAMO"));
	this.certificado = Integer.valueOf(rs.getString("INB_CT_CERTIFICADOS"));
	this.sucursal = Integer.valueOf(rs.getString("CACE_CASU_CD_SUCURSAL"));
	this.vigenciaDesde = rs.getDate("CACE_FE_DESDE") != null ? new SimpleDateFormat("dd/MM/yyyy").format(rs.getDate("CACE_FE_DESDE")) : "";
	this.vigenciaHasta = rs.getDate("CACE_FE_HASTA") != null ? new SimpleDateFormat("dd/MM/yyyy").format(rs.getDate("CACE_FE_HASTA")) : "";
	this.sumaAsegurada = rs.getString("INB_MT_SUMA_ASEGURADA");
	this.descripcion = rs.getString("INB_DSP_BIEN") == null || rs.getString("INB_DSP_BIEN").toString().equals("") ? "A Definir" : rs.getString("INB_DSP_BIEN");
	this.cantCerticados = rs.getString("INB_CT_CERTIFICADOS");
	this.flota = Integer.valueOf(rs.getString("INB_CT_CERTIFICADOS")) > 1 ? "S" : "N";
	this.descRamo = rs.getString("INB_DSP_RAMO");
	this.codProductor = rs.getString("CACE_CAPD_CD_PRODUCTOR");
	this.descProductor = rs.getString("INB_DSP_PRODUCTOR");
	this.codCliente = rs.getString("CACE_CACN_NU_CEDULA_RIF");
	this.asegurado = rs.getString("INB_DSP_ASEGURADO");
	this.tpDocumento = rs.getString("INB_TP_DOCUMENTO");
	this.nuDocumento = rs.getString("INB_NRO_DOCUMENTO");
	this.descEstado = rs.getString("INB_DSP_ESTADO");
	this.feOperacion = rs.getDate("CACW_FE_OPERACION") != null	? new SimpleDateFormat("dd/MM/yyyy").format(rs.getDate("CACW_FE_OPERACION")) : "";
	this.polizaSiguiente = rs.getString("CAPO_NU_POLIZA_SIGUIENTE");
	this.vigenciaTecnicaDesde = rs.getDate("CACE_FE_DESDE_TECNICA") != null	? new SimpleDateFormat("dd/MM/yyyy").format(rs.getDate("CACE_FE_DESDE_TECNICA")) : "";
	this.vigenciaTecnicaHasta = rs.getDate("CACE_FE_HASTA_TECNICA") != null	? new SimpleDateFormat("dd/MM/yyyy").format(rs.getDate("CACE_FE_HASTA_TECNICA")) : "";
	this.simbMoneda = rs.getString("CAMO_SM_MONEDA");
	this.premio = rs.getString("INB_MT_PREMIO");
	this.deuda = rs.getString("INB_MT_DEUDA");
	this.saldoVencido = rs.getString("INB_MT_SALDO_VENCIDO");
    this.descSucursal = rs.getString("INB_DSP_SUCURSAL");
    this.polizaAnterior = rs.getString("CAPO_NU_POLIZA_ANTERIOR");
    this.entidad = rs.getString("INB_ENTIDAD");
    this.atributo = rs.getString("INB_ATRIBUTO");
    this.codEstado = rs.getString("INB_CD_ESTADO");
    this.encontradoEntidad = rs.getString("INB_IN_DATO_ENTIDAD");
    
    
    }

    public String getEncontradoEntidad() {
		return encontradoEntidad;
	}

	public void setEncontradoEntidad(String encontradoEntidad) {
		this.encontradoEntidad = encontradoEntidad;
	}

	public PolizaDTO() {
	super();
    }

    public PolizaDTO(Integer poliza, Integer ramo, Integer sucursal) {
	super();
	this.poliza = poliza;
	this.ramo = ramo;
	this.sucursal = sucursal;
    }

    public PolizaDTO(Integer poliza, Integer ramo, Integer certificado, Integer sucursal, String vigenciaDesde,
	    String vigenciaHasta, String sumaAsegurada, String descripcion, String cantCerticados, String flota,
	    String isla, String descRamo, String codProductor, String descProductor, String codCliente,
	    String asegurado, String tpDocumento, String nuDocumento, String descEstado, String feOperacion,
	    String polizaSiguiente, String vigenciaTecnicaDesde, String vigenciaTecnicaHasta, String simbMoneda,
	    String premio, String deuda, String saldoVencido, String descSucursal, String polizaAnterior, String entidad, String atributo, String codEstado, String plan) {
	super();
	this.poliza = poliza;
	this.ramo = ramo;
	this.certificado = certificado;
	this.sucursal = sucursal;
	this.vigenciaDesde = vigenciaDesde;
	this.vigenciaHasta = vigenciaHasta;
	this.sumaAsegurada = sumaAsegurada;
	this.descripcion = descripcion;
	this.cantCerticados = cantCerticados;
	this.flota = flota;
	this.isla = isla;
	this.descRamo = descRamo;
	this.codProductor = codProductor;
	this.descProductor = descProductor;
	this.codCliente = codCliente;
	this.asegurado = asegurado;
	this.tpDocumento = tpDocumento;
	this.nuDocumento = nuDocumento;
	this.descEstado = descEstado;
	this.feOperacion = feOperacion;
	this.polizaSiguiente = polizaSiguiente;
	this.vigenciaTecnicaDesde = vigenciaTecnicaDesde;
	this.vigenciaTecnicaHasta = vigenciaTecnicaHasta;
	this.simbMoneda = simbMoneda;
	this.premio = premio;
	this.deuda = deuda;
	this.saldoVencido = saldoVencido;
    this.descSucursal = descSucursal;
    this.polizaAnterior = polizaAnterior;
    this.entidad = entidad;
    this.atributo = atributo;
    this.codEstado = codEstado;
    this.plan = plan;
    }

    public PolizaDTO(HashMap object) {
    	this.poliza = Integer.valueOf(object.get("P_TF_POLI.CACE_CAPO_NU_POLIZA").toString());
    	this.ramo = Integer.valueOf(object.get("P_TF_POLI.CACE_CARP_CD_RAMO").toString());
    	this.certificado = Integer.valueOf(object.get("P_TF_POLI.INB_CT_CERTIFICADOS").toString());
    	this.sucursal = Integer.valueOf(object.get("P_TF_POLI.CACE_CASU_CD_SUCURSAL").toString());
    	this.vigenciaDesde = object.get("P_TF_POLI.CACE_FE_DESDE") != null	? Dateutils.formatearFecha(object.get("P_TF_POLI.CACE_FE_DESDE").toString() ): ""; 
    	this.vigenciaHasta = object.get("P_TF_POLI.CACE_FE_HASTA") != null	? Dateutils.formatearFecha(object.get("P_TF_POLI.CACE_FE_HASTA").toString()) : ""; 
    	this.sumaAsegurada = object.get("P_TF_POLI.INB_MT_SUMA_ASEGURADA").toString();
    	this.descripcion = object.get("P_TF_POLI.INB_DSP_BIEN").toString() == null || object.get("P_TF_POLI.INB_DSP_BIEN").toString().equals("") ? "A Definir" : object.get("P_TF_POLI.INB_DSP_BIEN").toString();
    	this.cantCerticados = object.get("P_TF_POLI.INB_CT_CERTIFICADOS").toString();
    	this.flota = Integer.valueOf(object.get("P_TF_POLI.INB_CT_CERTIFICADOS").toString()) > 1 ? "S" : "N";
    	this.descRamo = object.get("P_TF_POLI.INB_DSP_RAMO").toString();
    	this.codProductor = object.get("P_TF_POLI.CACE_CAPD_CD_PRODUCTOR").toString();
    	this.descProductor = object.get("P_TF_POLI.INB_DSP_PRODUCTOR").toString();
    	this.codCliente = object.get("P_TF_POLI.CACE_CACN_NU_CEDULA_RIF").toString();
    	this.asegurado = object.get("P_TF_POLI.INB_DSP_ASEGURADO").toString();
    	this.tpDocumento = object.get("P_TF_POLI.INB_TP_DOCUMENTO").toString();
    	this.nuDocumento = object.get("P_TF_POLI.INB_NRO_DOCUMENTO").toString();
    	this.descEstado = object.get("P_TF_POLI.INB_DSP_ESTADO").toString(); 
    	this.feOperacion = object.get("P_TF_POLI.CACW_FE_OPERACION") != null	? Dateutils.formatearFecha(object.get("P_TF_POLI.CACW_FE_OPERACION").toString()) : "";
    	this.polizaSiguiente = object.get("P_TF_POLI.CAPO_NU_POLIZA_SIGUIENTE").toString();
    	this.vigenciaTecnicaDesde = object.get("P_TF_POLI.CACE_FE_DESDE_TECNICA") != null	? Dateutils.formatearFecha(object.get("P_TF_POLI.CACE_FE_DESDE_TECNICA").toString()) : ""; 
    	this.vigenciaTecnicaHasta = object.get("P_TF_POLI.CACE_FE_HASTA_TECNICA") != null	? Dateutils.formatearFecha(object.get("P_TF_POLI.CACE_FE_HASTA_TECNICA").toString()) : ""; 
    	this.simbMoneda = object.get("P_TF_POLI.CAMO_SM_MONEDA").toString();
    	this.premio = object.get("P_TF_POLI.INB_MT_PREMIO").toString();
    	this.deuda = object.get("P_TF_POLI.INB_MT_DEUDA").toString();
    	this.saldoVencido = object.get("P_TF_POLI.INB_MT_SALDO_VENCIDO").toString();
    	this.descSucursal = object.get("P_TF_POLI.INB_DSP_SUCURSAL").toString();
    	this.polizaAnterior = object.get("P_TF_POLI.CAPO_NU_POLIZA_ANTERIOR").toString();
    	this.entidad = object.get("P_TF_POLI.INB_ENTIDAD").toString();
    	this.atributo = object.get("P_TF_POLI.INB_ATRIBUTO").toString();
    	this.codEstado =object.get("P_TF_POLI.INB_CD_ESTADO").toString();
    	this.plan = object.get("P_TF_POLI.INB_PLAN").toString();
    	this.encontradoEntidad = object.get("P_TF_POLI.INB_IN_DATO_ENTIDAD").toString();
    }

	@Override
    public String toString() {
	return "PolizaDTO [poliza=" + poliza + ", ramo=" + ramo + ", certificado=" + certificado + ", sucursal="
		+ sucursal + ", vigenciaDesde=" + vigenciaDesde + ", vigenciaHasta=" + vigenciaHasta
		+ ", sumaAsegurada=" + sumaAsegurada + ", descripcion=" + descripcion + ", cantCerticados="
		+ cantCerticados + ", flota=" + flota + ", isla=" + isla + ", descRamo=" + descRamo + ", codProductor="
		+ codProductor + ", descProductor=" + descProductor + ", codCliente=" + codCliente + ", asegurado="
		+ asegurado + ", tpDocumento=" + tpDocumento + ", nuDocumento=" + nuDocumento + ", descEstado="
		+ descEstado + ", feOperacion=" + feOperacion + ", polizaSiguiente=" + polizaSiguiente
		+ ", vigenciaTecnicaDesde=" + vigenciaTecnicaDesde + ", vigenciaTecnicaHasta=" + vigenciaTecnicaHasta
		+ ", simbMoneda=" + simbMoneda + ", premio=" + premio + ", deuda=" + deuda + ", saldoVencido="
		+ saldoVencido + ", descSucursal = "+ descSucursal +" polizaSiguiente= "+ polizaAnterior +" entidad = "+entidad+", atributo = "+atributo+", codEstado = "+codEstado+", plan = "+plan+"]";
    }

	
    public String getCodEstado() {
		return codEstado;
	}

	public void setCodEstado(String codEstado) {
		this.codEstado = codEstado;
	}

	public Integer getPoliza() {
	return poliza;
    }

    public void setPoliza(Integer poliza) {
	this.poliza = poliza;
    }

    public Integer getRamo() {
	return ramo;
    }

    public String getPlan() {
		return plan;
	}

	public void setPlan(String plan) {
		this.plan = plan;
	}

	public void setRamo(Integer ramo) {
	this.ramo = ramo;
    }

    public Integer getCertificado() {
	return certificado;
    }

    public void setCertificado(Integer certificado) {
	this.certificado = certificado;
    }

    public Integer getSucursal() {
	return sucursal;
    }

    public void setSucursal(Integer sucursal) {
	this.sucursal = sucursal;
    }

    public String getVigenciaDesde() {
	return vigenciaDesde;
    }

    public void setVigenciaDesde(String vigenciaDesde) {
	this.vigenciaDesde = vigenciaDesde;
    }

    public String getVigenciaHasta() {
	return vigenciaHasta;
    }

    public void setVigenciaHasta(String vigenciaHasta) {
	this.vigenciaHasta = vigenciaHasta;
    }

    public String getSumaAsegurada() {
	return sumaAsegurada;
    }

    public void setSumaAsegurada(String sumaAsegurada) {
	this.sumaAsegurada = sumaAsegurada;
    }

    public String getDescripcion() {
	return descripcion;
    }

    public void setDescripcion(String descripcion) {
	this.descripcion = descripcion;
    }

    public String getCantCerticados() {
	return cantCerticados;
    }

    public void setCantCerticados(String cantCerticados) {
	this.cantCerticados = cantCerticados;
    }

    public String getFlota() {
	return flota;
    }

    public void setFlota(String flota) {
	this.flota = flota;
    }

    public String getIsla() {
	return isla;
    }

    public void setIsla(String isla) {
	this.isla = isla;
    }

    public String getDescRamo() {
	return descRamo;
    }

    public void setDescRamo(String descRamo) {
	this.descRamo = descRamo;
    }

    public String getCodProductor() {
	return codProductor;
    }

    public void setCodProductor(String codProductor) {
	this.codProductor = codProductor;
    }

    public String getDescProductor() {
	return descProductor;
    }

    public void setDescProductor(String descProductor) {
	this.descProductor = descProductor;
    }

    public String getCodCliente() {
	return codCliente;
    }

    public void setCodCliente(String codCliente) {
	this.codCliente = codCliente;
    }

    public String getAsegurado() {
	return asegurado;
    }

    public void setAsegurado(String asegurado) {
	this.asegurado = asegurado;
    }

    public String getTpDocumento() {
	return tpDocumento;
    }

    public void setTpDocumento(String tpDocumento) {
	this.tpDocumento = tpDocumento;
    }

    public String getNuDocumento() {
	return nuDocumento;
    }

    public void setNuDocumento(String nuDocumento) {
	this.nuDocumento = nuDocumento;
    }

    public String getDescEstado() {
	return descEstado;
    }

    public void setDescEstado(String descEstado) {
	this.descEstado = descEstado;
    }

    public String getFeOperacion() {
	return feOperacion;
    }

    public void setFeOperacion(String feOperacion) {
	this.feOperacion = feOperacion;
    }

    public String getPolizaSiguiente() {
	return polizaSiguiente;
    }

    public void setPolizaSiguiente(String polizaSiguiente) {
	this.polizaSiguiente = polizaSiguiente;
    }

    public String getVigenciaTecnicaDesde() {
	return vigenciaTecnicaDesde;
    }

    public void setVigenciaTecnicaDesde(String vigenciaTecnicaDesde) {
	this.vigenciaTecnicaDesde = vigenciaTecnicaDesde;
    }

    public String getVigenciaTecnicaHasta() {
	return vigenciaTecnicaHasta;
    }

    public void setVigenciaTecnicaHasta(String vigenciaTecnicaHasta) {
	this.vigenciaTecnicaHasta = vigenciaTecnicaHasta;
    }

    public String getSimbMoneda() {
	return simbMoneda;
    }

    public void setSimbMoneda(String simbMoneda) {
	this.simbMoneda = simbMoneda;
    }

    public String getPremio() {
	return premio;
    }

    public void setPremio(String premio) {
	this.premio = premio;
    }

    public String getDeuda() {
	return deuda;
    }

    public void setDeuda(String deuda) {
	this.deuda = deuda;
    }

    public String getSaldoVencido() {
	return saldoVencido;
    }

    public void setSaldoVencido(String saldoVencido) {
	this.saldoVencido = saldoVencido;
    }

    public String getDescSucursal() {
	return descSucursal;
    }

    public void setDescSucursal(String descSucursal) {
	this.descSucursal = descSucursal;
    }
    
    public String getPolizaAnterior() {
	return     polizaAnterior;
    }

    public void setPolizaAnterior(String polizaAnterior) {
	this.    polizaAnterior = polizaAnterior;
    }

    public String getEntidad() {
	return     entidad;
    }

    public void setEntidad(String entidad) {
	this.    entidad = entidad;
    }

    public String getAtributo() {
	return     atributo;
    }

    public void setAtributo(String atributo) {
	this.    atributo = atributo;
    }

    


    
    
    
    @Override
    public int hashCode() {
	final int prime = 31;
	int result = 1;
	result = prime * result + ((asegurado == null) ? 0 : asegurado.hashCode());
	result = prime * result + ((cantCerticados == null) ? 0 : cantCerticados.hashCode());
	result = prime * result + ((certificado == null) ? 0 : certificado.hashCode());
	result = prime * result + ((codCliente == null) ? 0 : codCliente.hashCode());
	result = prime * result + ((codProductor == null) ? 0 : codProductor.hashCode());
	result = prime * result + ((descEstado == null) ? 0 : descEstado.hashCode());
	result = prime * result + ((descProductor == null) ? 0 : descProductor.hashCode());
	result = prime * result + ((descRamo == null) ? 0 : descRamo.hashCode());
	result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
	result = prime * result + ((deuda == null) ? 0 : deuda.hashCode());
	result = prime * result + ((feOperacion == null) ? 0 : feOperacion.hashCode());
	result = prime * result + ((flota == null) ? 0 : flota.hashCode());
	result = prime * result + ((isla == null) ? 0 : isla.hashCode());
	result = prime * result + ((nuDocumento == null) ? 0 : nuDocumento.hashCode());
	result = prime * result + ((poliza == null) ? 0 : poliza.hashCode());
	result = prime * result + ((polizaSiguiente == null) ? 0 : polizaSiguiente.hashCode());
	result = prime * result + ((premio == null) ? 0 : premio.hashCode());
	result = prime * result + ((ramo == null) ? 0 : ramo.hashCode());
	result = prime * result + ((saldoVencido == null) ? 0 : saldoVencido.hashCode());
	result = prime * result + ((simbMoneda == null) ? 0 : simbMoneda.hashCode());
	result = prime * result + ((sucursal == null) ? 0 : sucursal.hashCode());
	result = prime * result + ((sumaAsegurada == null) ? 0 : sumaAsegurada.hashCode());
	result = prime * result + ((tpDocumento == null) ? 0 : tpDocumento.hashCode());
	result = prime * result + ((vigenciaDesde == null) ? 0 : vigenciaDesde.hashCode());
	result = prime * result + ((vigenciaHasta == null) ? 0 : vigenciaHasta.hashCode());
	result = prime * result + ((vigenciaTecnicaDesde == null) ? 0 : vigenciaTecnicaDesde.hashCode());
	result = prime * result + ((vigenciaTecnicaHasta == null) ? 0 : vigenciaTecnicaHasta.hashCode());
	result = prime * result + ((descSucursal == null) ? 0 : descSucursal.hashCode());
	result = prime * result + ((polizaAnterior == null) ? 0 : polizaAnterior.hashCode());
	
	result = prime * result + ((entidad == null) ? 0 : entidad.hashCode());
	result = prime * result + ((atributo == null) ? 0 : atributo.hashCode());
	result = prime * result + ((codEstado == null) ? 0 : codEstado.hashCode());
	
	return result;
    }

    @Override
    public boolean equals(Object obj) {
	if (this == obj)
	    return true;
	if (obj == null)
	    return false;
	if (getClass() != obj.getClass())
	    return false;
	PolizaDTO other = (PolizaDTO) obj;

	if (poliza == null) {
	    if (other.poliza != null)
		return false;
	} else if (!poliza.equals(other.poliza))
	    return false;
	if (ramo == null) {
	    if (other.ramo != null)
		return false;
	} else if (!ramo.equals(other.ramo))
	    return false;
	if (sucursal == null) {
	    if (other.sucursal != null)
		return false;
	} else if (!sucursal.equals(other.sucursal))
	    return false;
	return true;
    }

}
