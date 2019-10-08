package com.pseguros.pes.bean;

import java.util.Map;

public class ReturnExecuteData {
	
	private String id;
	private String code;
	private String environment="";
	
	private Map<String, Object> data;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}

	public Map<String, Object> getData() {
		return data;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
	public String getEnvironment() {
		return environment;
	}
	public void setEnvironment(String environment) {
		this.environment = environment;
	}
	@Override
	public String toString() {
		return "ReturnExecuteData [id=" + id + ", code=" + code + ", environment="
				+ environment + ", data=" + data + "]";
	}

	
	
}
