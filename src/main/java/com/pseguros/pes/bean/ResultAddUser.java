package com.pseguros.pes.bean;

import org.apache.http.client.methods.CloseableHttpResponse;

public class ResultAddUser {

	String code;
	String result;
	String all;
	
	
	public ResultAddUser(CloseableHttpResponse dato) {
		this.code = dato.getStatusLine().getStatusCode()+"";
		this.result = dato.toString();
	}
	
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getAll() {
		return all;
	}
	public void setAll(String all) {
		this.all = all;
	}
	
	
	
	
}
