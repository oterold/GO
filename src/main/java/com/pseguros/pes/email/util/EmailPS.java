package com.pseguros.pes.email.util;


import java.util.Properties;

public class EmailPS {

	
	private String subject = "Info";
	private String emailDestino;
	private String[] emailCC;
	private String template = "tempalteEmail01.html";
	private String[] images = {"logoHeader.jpg"};
	
	
	private Properties propiedadesUser;
	
	
	
	public String[] getEmailCC() {
		return emailCC;
	}
	public void setEmailCC(String[] emailCC) {
		this.emailCC = emailCC;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getEmailDestino() {
		return emailDestino;
	}
	public void setEmailDestino(String emailDestino) {
		this.emailDestino = emailDestino;
	}
	public String getTemplate() {
		return template;
	}
	public void setTemplate(String template) {
		this.template = template;
	}
	public String[] getImages() {
		return images;
	}
	public void setImages(String[] images) {
		this.images = images;
	}
	public Properties getPropiedadesUser() {
		return propiedadesUser;
	}
	public void setPropiedadesUser(Properties propiedadesUser) {
		this.propiedadesUser = propiedadesUser;
	}

	
	
	
	
}

