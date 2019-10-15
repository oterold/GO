package com.pseguros.pes.bean;


import java.util.ArrayList;
import java.util.List;

import com.pseguros.pes.bean.keycloack.AccesKeycloak;
import com.pseguros.pes.bean.keycloack.AtributosKeycloack;
import com.pseguros.pes.bean.keycloack.CodigoProductorAtributoKeycloack;
import com.pseguros.pes.bean.keycloack.CredencialesKeycloack;
import com.pseguros.pes.bean.keycloack.IdRollAtributoKeycloack;
import com.pseguros.pes.bean.keycloack.LocaleAtributoKeycloack;

public class UserNewKeycloak {
	
	private String username="patricio.folini@provinciaseguros.com";
	private String firstName="User";
	private String lastName="79702";
	private String email =  "patricio.folini@provinciaseguros.com";

	private String enabled = "true";
	private String totp ="false";
	private String emailVerified="false";
	private List<CredencialesKeycloack> credentials = null;
	private AtributosKeycloack attributes = null;
	private String[] disableableCredentialTypes = new String[1];
	private List requiredActions = new ArrayList();
	private String notBefore = "0";
	private AccesKeycloak access = new AccesKeycloak();
	private String[] realmRoles = new String[1];
	
	
	public UserNewKeycloak(String username, String firstName, String lastName, String email,String productor,String rol, String password) {
		super();
		
		this.username = username;
		this.firstName = firstName;
		if (lastName.toUpperCase().equals("NULL")) {
			this.lastName = "";
		}else {
			this.lastName = lastName;
		}
		
		this.email = email;
		
		
		List<CredencialesKeycloack> credenciales =  new ArrayList<CredencialesKeycloack>();
		CredencialesKeycloack obj = new CredencialesKeycloack(password);
		credenciales.add(obj);
		this.credentials = credenciales ;

		
		AtributosKeycloack atributosObj = new AtributosKeycloack(productor, "es", rol);
		this.attributes = atributosObj;
		
		String[] dato = new String[1];
		dato[0]  = "password";
		disableableCredentialTypes = dato;
		
		String[] realmRolesArray = new String[1];
		realmRolesArray[0] = "ASSERTDEV";
		realmRoles = realmRolesArray;
		
	}
	
	
	
	
	
	public String[] getRealmRoles() {
		return realmRoles;
	}


	public void setRealmRoles(String[] realmRoles) {
		this.realmRoles = realmRoles;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getEnabled() {
		return enabled;
	}
	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}
	public String getTotp() {
		return totp;
	}
	public void setTotp(String totp) {
		this.totp = totp;
	}
	public String getEmailVerified() {
		return emailVerified;
	}
	public void setEmailVerified(String emailVerified) {
		this.emailVerified = emailVerified;
	}
	public List<CredencialesKeycloack> getCredentials() {
		return credentials;
	}
	public void setCredentials(List<CredencialesKeycloack> credentials) {
		this.credentials = credentials;
	}
	
	
	
	public AtributosKeycloack getAttributes() {
		return attributes;
	}



	public void setAttributes(AtributosKeycloack attributes) {
		this.attributes = attributes;
	}



	public String[] getDisableableCredentialTypes() {
		return disableableCredentialTypes;
	}



	public void setDisableableCredentialTypes(String[] disableableCredentialTypes) {
		this.disableableCredentialTypes = disableableCredentialTypes;
	}



	public List getRequiredActions() {
		return requiredActions;
	}
	public void setRequiredActions(List requiredActions) {
		this.requiredActions = requiredActions;
	}
	public String getNotBefore() {
		return notBefore;
	}
	public void setNotBefore(String notBefore) {
		this.notBefore = notBefore;
	}
	public AccesKeycloak getAccess() {
		return access;
	}
	public void setAccess(AccesKeycloak access) {
		this.access = access;
	}
	
	

}
