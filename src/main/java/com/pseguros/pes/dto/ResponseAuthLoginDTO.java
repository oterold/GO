package com.pseguros.pes.dto;

import com.google.gson.JsonObject;

public class ResponseAuthLoginDTO {
	
	private String accessToken;
	private String expiresIn;
	private String refreshExpiresIn;
	private String refreshToken;
	
	private String tokenType;
	private String notBeforePolicy;
	private String sessionState;
	private String scope;
	
	public ResponseAuthLoginDTO(JsonObject dato){
		setAccessToken(dato.get("access_token").toString());
		setExpiresIn(dato.get("expires_in").toString());
		setRefreshExpiresIn(dato.get("refresh_expires_in").toString());
		setRefreshToken(dato.get("refresh_token").toString());
		setTokenType(dato.get("token_type").toString());
		setNotBeforePolicy(dato.get("not-before-policy").toString());
		setSessionState(dato.get("session_state").toString());
		setScope(dato.get("scope").toString());
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getExpiresIn() {
		return expiresIn;
	}

	public void setExpiresIn(String expiresIn) {
		this.expiresIn = expiresIn;
	}

	public String getRefreshExpiresIn() {
		return refreshExpiresIn;
	}

	public void setRefreshExpiresIn(String refreshExpiresIn) {
		this.refreshExpiresIn = refreshExpiresIn;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getTokenType() {
		return tokenType;
	}

	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}

	public String getNotBeforePolicy() {
		return notBeforePolicy;
	}

	public void setNotBeforePolicy(String notBeforePolicy) {
		this.notBeforePolicy = notBeforePolicy;
	}

	public String getSessionState() {
		return sessionState;
	}

	public void setSessionState(String sessionState) {
		this.sessionState = sessionState;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

}
