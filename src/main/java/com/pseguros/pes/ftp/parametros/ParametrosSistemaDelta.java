package com.pseguros.pes.ftp.parametros;

public class ParametrosSistemaDelta {

	
	private String userFTP = "puentel";
	private String passwordFTP ="lucas+39";
	private String urlFTP="ftp://10.6.1.60/Usuarios/Analisis de Riesgo/Archivo de Informes/";
	private String ip="10.6.1.60";
	public String getUserFTP() {
		return userFTP;
	}
	public void setUserFTP(String userFTP) {
		this.userFTP = userFTP;
	}
	public String getPasswordFTP() {
		return passwordFTP;
	}
	public void setPasswordFTP(String passwordFTP) {
		this.passwordFTP = passwordFTP;
	}
	public String getUrlFTP() {
		return urlFTP;
	}
	public void setUrlFTP(String urlFTP) {
		this.urlFTP = urlFTP;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	
}
