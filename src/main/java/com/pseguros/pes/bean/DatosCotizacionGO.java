package com.pseguros.pes.bean;

import java.util.List;

public class DatosCotizacionGO {
	
	private String user;
	private String esquemaA;
	private String esquemaB;
	private String rol;
	private String origen;
	private String aux;
	private String sucursal;
	private String productor;
	private String ramo;
	private String producto;
	private int cotizacion;
	private int consecutivo = 1;
	private String transaccion ="E";
	private String valorFinalDatosDinamicos="";
	private String valorFinalDatosDinamicosEmision="";
	private String valorFinalDatosDinamicosInspeccion="";
	public String getValorFinalDatosDinamicosInspeccion() {
		return valorFinalDatosDinamicosInspeccion;
	}
	public void setValorFinalDatosDinamicosInspeccion(String valorFinalDatosDinamicosInspeccion) {
		this.valorFinalDatosDinamicosInspeccion = valorFinalDatosDinamicosInspeccion;
	}
	private String promocionA;
	private String promocionB;
	private String promocionC;
	private String bien;
	private String sumaAseg; 
	private String plan; 
	private String descPlan; 
	private String comision; 
	private String nuPersona; 
	private String promocion; 
	private String fechaEmision; 
	private String valorPromo; 
	private String accesorios; 
	private String inspeccion; 
	private String patente; 
	private String chasis; 
	private String motor; 
	

	private DatosTomadorAseg datosAseg;
	
	private String formDatosGenerales="DGENERALES";
	
	private DatosDefaultCotizacion datosDefault;
	
	private DatosContactoCotizador datosContacto;
	
	private DatosGeneralesCotizacion datosGenerales;

	private List datosGeneralesSeleccionados;
	
	private List datosDinamicos;
	
	private List datosDinamicosEmision;
	
	private List datosDinamicosInspeccion;

	private DatosMostrarPanelB datosPanelB;
	
	private DatosGrillaProducto direccion;
	
	
	
	public String getPatente() {
		return patente;
	}
	public void setPatente(String patente) {
		this.patente = patente;
	}
	public String getChasis() {
		return chasis;
	}
	public void setChasis(String chasis) {
		this.chasis = chasis;
	}
	public String getMotor() {
		return motor;
	}
	public void setMotor(String motor) {
		this.motor = motor;
	}
	
	public List getDatosDinamicosInspeccion() {
		return datosDinamicosInspeccion;
	}
	public void setDatosDinamicosInspeccion(List datosDinamicosInspeccion) {
		this.datosDinamicosInspeccion = datosDinamicosInspeccion;
	}
	public String getInspeccion() {
		return inspeccion;
	}
	public void setInspeccion(String inspeccion) {
		this.inspeccion = inspeccion;
	}
	public String getAccesorios() {
		return accesorios;
	}
	public void setAccesorios(String accesorios) {
		this.accesorios = accesorios;
	}
	public String getValorFinalDatosDinamicosEmision() {
		return valorFinalDatosDinamicosEmision;
	}
	public void setValorFinalDatosDinamicosEmision(String valorFinalDatosDinamicosEmision) {
		this.valorFinalDatosDinamicosEmision = valorFinalDatosDinamicosEmision;
	}
	public List getDatosDinamicosEmision() {
		return datosDinamicosEmision;
	}
	public void setDatosDinamicosEmision(List datosDinamicosEmision) {
		this.datosDinamicosEmision = datosDinamicosEmision;
	}
	public DatosTomadorAseg getDatosAseg() {
		return datosAseg;
	}
	public void setDatosAseg(DatosTomadorAseg datosAseg) {
		this.datosAseg = datosAseg;
	}
	public String getValorPromo() {
		return valorPromo;
	}
	public void setValorPromo(String valorPromo) {
		this.valorPromo = valorPromo;
	}
	public String getFechaEmision() {
		return fechaEmision;
	}
	public void setFechaEmision(String fechaEmision) {
		this.fechaEmision = fechaEmision;
	}
	public String getPromocion() {
		return promocion;
	}
	public void setPromocion(String promocion) {
		this.promocion = promocion;
	}
	public String getNuPersona() {
		return nuPersona;
	}
	public void setNuPersona(String nuPersona) {
		this.nuPersona = nuPersona;
	}
	public DatosMostrarPanelB getDatosPanelB() {
		return datosPanelB;
	}
	public void setDatosPanelB(DatosMostrarPanelB datosPanelB) {
		this.datosPanelB = datosPanelB;
	}
	public String getComision() {
		return comision;
	}
	public void setComision(String comision) {
		this.comision = comision;
	}
	public String getDescPlan() {
		return descPlan;
	}
	public void setDescPlan(String descPlan) {
		this.descPlan = descPlan;
	}
	public String getPlan() {
		return plan;
	}
	public void setPlan(String plan) {
		this.plan = plan;
	}
	public DatosGrillaProducto getDireccion() {
		return direccion;
	}
	public void setDireccion(DatosGrillaProducto direccion) {
		this.direccion = direccion;
	}
	public List getDatosGeneralesSeleccionados() {
		return datosGeneralesSeleccionados;
	}
	public void setDatosGeneralesSeleccionados(List datosGeneralesSeleccionados) {
		this.datosGeneralesSeleccionados = datosGeneralesSeleccionados;
	}
	public String getBien() {
		return bien;
	}
	public String getSumaAseg() {
		return sumaAseg;
	}
	public void setBien(String bien) {
		this.bien = bien;
	}
	public void setSumaAseg(String sumaAseg) {
		this.sumaAseg = sumaAseg;
	}
	public String getPromocionA() {
		return promocionA;
	}
	public String getPromocionB() {
		return promocionB;
	}
	public String getPromocionC() {
		return promocionC;
	}
	public void setPromocionA(String promocionA) {
		this.promocionA = promocionA;
	}
	public void setPromocionB(String promocionB) {
		this.promocionB = promocionB;
	}
	public void setPromocionC(String promocionC) {
		this.promocionC = promocionC;
	}
	public int getConsecutivo() {
		return consecutivo;
	}
	public String getTransaccion() {
		return transaccion;
	}
	public void setConsecutivo(int consecutivo) {
		this.consecutivo = consecutivo;
	}
	public void setTransaccion(String transaccion) {
		this.transaccion = transaccion;
	}
	public DatosGeneralesCotizacion getDatosGenerales() {
		return datosGenerales;
	}
	public void setDatosGenerales(DatosGeneralesCotizacion datosGenerales) {
		this.datosGenerales = datosGenerales;
	}
	public String getUser() {
		return user;
	}
	public String getRol() {
		return rol;
	}
	public String getOrigen() {
		return origen;
	}
	public String getAux() {
		return aux;
	}
	public String getSucursal() {
		return sucursal;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public void setRol(String rol) {
		this.rol = rol;
	}
	public void setOrigen(String origen) {
		this.origen = origen;
	}
	public void setAux(String aux) {
		this.aux = aux;
	}
	public void setSucursal(String sucursal) {
		this.sucursal = sucursal;
	}
	public DatosContactoCotizador getDatosContacto() {
		return datosContacto;
	}
	public void setDatosContacto(DatosContactoCotizador datosContacto) {
		this.datosContacto = datosContacto;
	}
	public String getEsquemaA() {
		return esquemaA;
	}
	public String getEsquemaB() {
		return esquemaB;
	}
	public void setEsquemaA(String esquemaA) {
		this.esquemaA = esquemaA;
	}
	public void setEsquemaB(String esquemaB) {
		this.esquemaB = esquemaB;
	}
	public String getProductor() {
		return productor;
	}
	public void setProductor(String productor) {
		this.productor = productor;
	}
	public String getRamo() {
		return ramo;
	}
	public String getProducto() {
		return producto;
	}
	public void setRamo(String ramo) {
		this.ramo = ramo;
	}
	public void setProducto(String producto) {
		this.producto = producto;
	}
	public String getFormDatosGenerales() {
		return formDatosGenerales;
	}
	public void setFormDatosGenerales(String formDatosGenerales) {
		this.formDatosGenerales = formDatosGenerales;
	}
	public DatosDefaultCotizacion getDatosDefault() {
		return datosDefault;
	}
	public void setDatosDefault(DatosDefaultCotizacion datosDefault) {
		this.datosDefault = datosDefault;
	}
	public int getCotizacion() {
		return cotizacion;
	}
	public void setCotizacion(int cotizacion) {
		this.cotizacion = cotizacion;
	}
	public List getDatosDinamicos() {
		return datosDinamicos;
	}
	public void setDatosDinamicos(List datosDinamicos) {
		this.datosDinamicos = datosDinamicos;
	}
	public String getValorFinalDatosDinamicos() {
		return valorFinalDatosDinamicos;
	}
	public void setValorFinalDatosDinamicos(String valorFinalDatosDinamicos) {
		this.valorFinalDatosDinamicos = valorFinalDatosDinamicos;
	}


	
}
