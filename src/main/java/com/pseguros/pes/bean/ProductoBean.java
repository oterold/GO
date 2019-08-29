package com.pseguros.pes.bean;

import java.util.HashMap;



public class ProductoBean {
	String producto;

	
	public ProductoBean(HashMap object){
		this.producto=(String) object.get("CTRA_CAPU_CD_PRODUCTO");
		
	}
	
	public String getProducto() {
		return producto;
	}


	public void setProducto(String producto) {
		this.producto = producto;
	}


	public ProductoBean(){
		
	}
	
	
}
