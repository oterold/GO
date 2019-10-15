package com.pseguros.pes.bean.keycloack;

public class AccesKeycloak {
	private String manageGroupMembership = "false";
	private String view = "true";
	private String mapRoles="false";
	private String impersonate="false";
	private String manage="false";
	
	
	public String getManageGroupMembership() {
		return manageGroupMembership;
	}
	public void setManageGroupMembership(String manageGroupMembership) {
		this.manageGroupMembership = manageGroupMembership;
	}
	public String getView() {
		return view;
	}
	public void setView(String view) {
		this.view = view;
	}
	public String getMapRoles() {
		return mapRoles;
	}
	public void setMapRoles(String mapRoles) {
		this.mapRoles = mapRoles;
	}
	public String getImpersonate() {
		return impersonate;
	}
	public void setImpersonate(String impersonate) {
		this.impersonate = impersonate;
	}
	public String getManage() {
		return manage;
	}
	public void setManage(String manage) {
		this.manage = manage;
	}
	 
	
	
	
}
