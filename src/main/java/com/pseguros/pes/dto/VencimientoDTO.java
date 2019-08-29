package com.pseguros.pes.dto;


import java.sql.ResultSet;
import java.text.SimpleDateFormat;

public class VencimientoDTO {

    private String inbVcMensaje02;
    private Integer inbNuCompania;
    private String inbMtImporte;
    private String inbVcImporte;
    private String inbFeVencimiento;
    private String inbVcMensaje01;
    private String inbVcCodigoBarra;
    private String moneda;
    private String inbVcMensaje03;
    private String careFeHasta;

    SimpleDateFormat fromUser = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat myFormat = new SimpleDateFormat("dd/MM/yyyy");

    public VencimientoDTO(ResultSet rs) throws Exception {
	this.setInbNuCompania(rs.getInt("INB_NU_COMPANIA"));
	this.setInbMtImporte(rs.getString("INB_MT_IMPORTE"));
	this.setInbVcImporte(rs.getString("INB_VC_IMPORTE"));
	this.setInbFeVencimiento(myFormat.format(fromUser.parse(rs.getString("INB_FE_VENCIMIENTO"))));
	this.setInbVcCodigoBarra(
		rs.getString("INB_VC_CODIGO_BARRA") != null ? rs.getString("INB_VC_CODIGO_BARRA") : "");
	this.setMoneda(rs.getString("CAMO_SM_MONEDA") != null ? rs.getString("CAMO_SM_MONEDA") : "");
	this.setCareFeHasta(myFormat.format(fromUser.parse(rs.getString("CARE_FE_HASTA"))));
	this.setInbVcMensaje01(rs.getString("INB_VC_MENSAJE_01") != null ? rs.getString("INB_VC_MENSAJE_01") : "");
	this.setInbVcMensaje03(rs.getString("INB_VC_MENSAJE_02") != null ? rs.getString("INB_VC_MENSAJE_02") : "");
	this.setInbVcMensaje02(rs.getString("INB_VC_MENSAJE_03") != null ? rs.getString("INB_VC_MENSAJE_03") : "");
    }

    public VencimientoDTO(Integer inbNuCompania, String inbMtImporte, String inbVcImporte, String inbVcMensaje02,
	    String inbFeVencimiento, String inbVcMensaje01, String inbVcCodigoBarra, String camoSmMoneda,
	    String inbVcMensaje03, String careFeHasta) {
	super();
	this.setInbVcMensaje02(inbVcMensaje02);
	this.setInbNuCompania(inbNuCompania);
	this.setInbMtImporte(inbMtImporte);
	this.setInbVcImporte(inbVcImporte);
	this.setInbFeVencimiento(inbFeVencimiento);
	this.setInbVcMensaje01(inbVcMensaje01);
	this.setInbVcCodigoBarra(inbVcCodigoBarra);
	this.setMoneda(camoSmMoneda);
	this.setInbVcMensaje03(inbVcMensaje03);
	this.setCareFeHasta(careFeHasta);
    }

    public void setInbVcMensaje02(String inbVcMensaje02) {
	this.inbVcMensaje02 = inbVcMensaje02;
    }

    public String getInbVcMensaje02() {
	return inbVcMensaje02;
    }

    public void setInbNuCompania(Integer inbNuCompania) {
	this.inbNuCompania = inbNuCompania;
    }

    public Integer getInbNuCompania() {
	return inbNuCompania;
    }

    public void setInbMtImporte(String inbMtImporte) {
	this.inbMtImporte = inbMtImporte;
    }

    public String getInbMtImporte() {
	return inbMtImporte;
    }

    public void setInbVcImporte(String inbVcImporte) {
	this.inbVcImporte = inbVcImporte;
    }

    public String getInbVcImporte() {
	return inbVcImporte;
    }

    public void setInbFeVencimiento(String inbFeVencimiento) {
	this.inbFeVencimiento = inbFeVencimiento;
    }

    public String getInbFeVencimiento() {
	return inbFeVencimiento;
    }

    public void setInbVcMensaje01(String inbVcMensaje01) {
	this.inbVcMensaje01 = inbVcMensaje01;
    }

    public String getInbVcMensaje01() {
	return inbVcMensaje01;
    }

    public void setInbVcCodigoBarra(String inbVcCodigoBarra) {
	this.inbVcCodigoBarra = inbVcCodigoBarra;
    }

    public String getInbVcCodigoBarra() {
	return inbVcCodigoBarra;
    }

    public void setMoneda(String camoSmMoneda) {
	this.moneda = camoSmMoneda;
    }

    public String getMoneda() {
	return moneda;
    }

    public void setInbVcMensaje03(String inbVcMensaje03) {
	this.inbVcMensaje03 = inbVcMensaje03;
    }

    public String getInbVcMensaje03() {
	return inbVcMensaje03;
    }

    public void setCareFeHasta(String careFeHasta) {
	this.careFeHasta = careFeHasta;
    }

    public String getCareFeHasta() {
	return careFeHasta;
    }

    @Override
    public String toString() {
	return "BuscarDeuda [inbVcMensaje02=" + inbVcMensaje02 + ", inbNuCompania=" + inbNuCompania + ", inbMtImporte="
		+ inbMtImporte + ", inbVcImporte=" + inbVcImporte + ", inbFeVencimiento=" + inbFeVencimiento
		+ ", inbVcMensaje01=" + inbVcMensaje01 + ", inbVcCodigoBarra=" + inbVcCodigoBarra + ", moneda=" + moneda
		+ ", inbVcMensaje03=" + inbVcMensaje03 + ", careFeHasta=" + careFeHasta + ", fromUser=" + fromUser
		+ ", myFormat=" + myFormat + ", getInbVcMensaje02()=" + getInbVcMensaje02() + ", getInbNuCompania()="
		+ getInbNuCompania() + ", getInbMtImporte()=" + getInbMtImporte() + ", getInbVcImporte()="
		+ getInbVcImporte() + ", getInbFeVencimiento()=" + getInbFeVencimiento() + ", getInbVcMensaje01()="
		+ getInbVcMensaje01() + ", getInbVcCodigoBarra()=" + getInbVcCodigoBarra() + ", getMoneda()="
		+ getMoneda() + ", getInbVcMensaje03()=" + getInbVcMensaje03() + ", getCareFeHasta()="
		+ getCareFeHasta() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
		+ super.toString() + "]";
    }

}
