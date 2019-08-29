package com.pseguros.pes.dto;

import java.util.HashMap;

public class ProductorPromocionDTO {

	private String ramo;
	private String descRamo;
	private String producto;
	private String descpProducto;
	private String nuPersona;
	private String apellido;
	private String rol;
	private String promo;
	private String codProd;
	
	
	public ProductorPromocionDTO(HashMap object) {
		this.ramo = object.get("P_TF_CARM.CARM_CARP_CD_RAMO").toString();
		this.descRamo = object.get("P_TF_CARM.CARP_DE_RAMO").toString();
		this.producto = object.get("P_TF_CARM.CARM_CAPU_CD_PRODUCTO").toString();
		this.descpProducto = object.get("P_TF_CARM.CAPU_DE_PRODUCTO").toString();
		this.nuPersona = object.get("P_TF_CARM.CARM_CABU_NU_PERSONA").toString();
		this.apellido = object.get("P_TF_CARM.CABU_NM_APELLIDO").toString();
		this.rol = object.get("P_TF_CARM.CARM_CACL_CD_TIPO_ROL").toString();
		this.promo = object.get("P_TF_CARM.CARM_CD_PROMOCION").toString();
		this.codProd = object.get("P_TF_CARM.CARM_CAPD_CD_PRODUCTOR").toString();

	}


	public String getRamo() {
		return ramo;
	}


	public String getDescRamo() {
		return descRamo;
	}


	public String getProducto() {
		return producto;
	}


	public String getDescpProducto() {
		return descpProducto;
	}


	public String getNuPersona() {
		return nuPersona;
	}


	public String getApellido() {
		return apellido;
	}


	public String getRol() {
		return rol;
	}


	public String getPromo() {
		return promo;
	}


	public String getCodProd() {
		return codProd;
	}


	public void setRamo(String ramo) {
		this.ramo = ramo;
	}


	public void setDescRamo(String descRamo) {
		this.descRamo = descRamo;
	}


	public void setProducto(String producto) {
		this.producto = producto;
	}


	public void setDescpProducto(String descpProducto) {
		this.descpProducto = descpProducto;
	}


	public void setNuPersona(String nuPersona) {
		this.nuPersona = nuPersona;
	}


	public void setApellido(String apellido) {
		this.apellido = apellido;
	}


	public void setRol(String rol) {
		this.rol = rol;
	}


	public void setPromo(String promo) {
		this.promo = promo;
	}


	public void setCodProd(String codProd) {
		this.codProd = codProd;
	}
	
	
	
	
	
	
	
}
