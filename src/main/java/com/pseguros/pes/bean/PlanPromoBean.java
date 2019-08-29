package com.pseguros.pes.bean;

import java.util.Map;

public class PlanPromoBean {

	private String plan;
	private String promo = "NOAP";
	private String descPromo;
	private String descPlan;
	private String cotizacion;
	private String certificado;
	private String premio;
	
	
	
	public PlanPromoBean(Map<String, Object> datosCoti1,String coti, String certi) {
		this.plan =  datosCoti1.get("P_TF_PLANES_CAZB_CAPB_CD_PLAN").toString();
		try {
			
		if (datosCoti1.get("P_TF_PLANES_CAZB_CD_PROMOCION").toString() != null && !datosCoti1.get("P_TF_PLANES_CAZB_CD_PROMOCION").toString().equals("")) {
			this.promo = datosCoti1.get("P_TF_PLANES_CAZB_CD_PROMOCION").toString();
		}

		this.descPromo = datosCoti1.get("P_TF_PLANES_CROT_DE_PROMOCION").toString();
		
		} catch (Exception e) {
		}
		this.descPlan = datosCoti1.get("P_TF_PLANES_INB_PLAN").toString();
		this.premio = datosCoti1.get("P_TF_PLANES_CAZB_MT_PREMIO").toString();
		this.certificado=certi;
		this.cotizacion = coti;
		
	}
	
	public PlanPromoBean() {
	}
	
	
	
	public String getPremio() {
		return premio;
	}

	public void setPremio(String premio) {
		this.premio = premio;
	}

	public String getPlan() {
		return plan;
	}
	public void setPlan(String plan) {
		this.plan = plan;
	}
	public String getPromo() {
		return promo;
	}
	public void setPromo(String promo) {
		this.promo = promo;
	}
	public String getDescPromo() {
		return descPromo;
	}
	public void setDescPromo(String descPromo) {
		this.descPromo = descPromo;
	}
	public String getDescPlan() {
		return descPlan;
	}
	public void setDescPlan(String descPlan) {
		this.descPlan = descPlan;
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
	
	
	
}
