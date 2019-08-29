package com.pseguros.pes.email.util;


import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class MailAuthenticator extends Authenticator {

	private PasswordAuthentication authentication = null;
	private String username;
	private String password;

	public MailAuthenticator(String user, String pass) {
		this.username = user;
		this.password = pass;
		this.authentication = new PasswordAuthentication(username, password);
	}

	public MailAuthenticator() {

	}

	protected PasswordAuthentication getPasswordAuthentication() {
		return authentication;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
