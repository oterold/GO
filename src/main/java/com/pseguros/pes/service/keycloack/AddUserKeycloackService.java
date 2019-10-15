package com.pseguros.pes.service.keycloack;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

import org.apache.http.HttpHeaders;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pseguros.pes.bean.ResultAddUser;
import com.pseguros.pes.bean.UserNewKeycloak;
import com.pseguros.pes.service.http.HttpsSSLClient;

@Service
public class AddUserKeycloackService {

	
	private static final Logger logger = LoggerFactory.getLogger(AddUserKeycloackService.class);
	
	private static final String URL_TOKEN = "https://10.6.110.220:8543/auth/realms/ps/protocol/openid-connect/token";
	private static final String CLIENT_ID_TOKEN = "portal-pas";
	private static final String CLIENT_SECRECT_TOKEN = "27c36084-3367-45c8-b4a2-1c3ed7faf873";
	private static final String USER_ADMIN_TOKEN = "abmusers";
	private static final String PASSWORD_ADMIN_TOKEN = "123123";


	private static final String URL_USERS = "https://10.6.110.220:8543/auth/admin/realms/ps/users";
	
	
	
	public ResultAddUser crearUsuario(UserNewKeycloak user) throws Exception {
		String token = getToken(URL_TOKEN,USER_ADMIN_TOKEN,PASSWORD_ADMIN_TOKEN,CLIENT_ID_TOKEN,CLIENT_SECRECT_TOKEN); 
		return addUser(token,URL_USERS,user);
	}



	private String getToken(String urlToken, String userAdminToken, String passwordAdminToken, String clientIdToken, String clientSecrectToken) throws Exception {
	
		CloseableHttpClient client = null;
		
		try {
	
		 client = HttpsSSLClient.createSSLInsecureClient();

		HttpPost postNew = new HttpPost(urlToken);

		ArrayList<NameValuePair> postParameters;

		postParameters = new ArrayList<NameValuePair>();
		postParameters.add(new BasicNameValuePair("client_id", clientIdToken));
		postParameters.add(new BasicNameValuePair("client_secret", clientSecrectToken));
		postParameters.add(new BasicNameValuePair("username", userAdminToken));
		postParameters.add(new BasicNameValuePair("password", passwordAdminToken));

		postParameters.add(new BasicNameValuePair("grant_type", "password"));

		postNew.setEntity(new UrlEncodedFormEntity(postParameters, "UTF-8"));

		CloseableHttpResponse dato = client.execute(postNew);

		String json = EntityUtils.toString(dato.getEntity());
		logger.debug(json);
		JsonParser parser = new JsonParser(); 
		JsonObject jsonOn = (JsonObject)parser.parse(json);
		Iterator entries = jsonOn.entrySet().iterator();
		
		String token = null;
		while (entries.hasNext()) {
		    Map.Entry entry = (Map.Entry) entries.next();
		    String key = entry.getKey().toString();
		    String value = entry.getValue().toString();
		    if (key.equals("access_token")) {
		    	logger.debug("Key = " + key + ", Value = " + value);
				token = value;
			}
		}
		
		if (token == null) {
			throw new Exception(json);
			
		}
		
		return token;
		
		} catch (Exception e) {
			logger.error("No se pudo obtener token del keycloack" ,  e);
			throw e;
		}finally{
			try {
				client.close();
			} catch (Exception e2) {
			}
			
		}
		
		
	}
	
	
	private ResultAddUser addUser(String token, String urlUsers, UserNewKeycloak user) throws Exception {

		try {

			//logear que persona crear q usuario

			if (token == null || token.length()<10) {
				throw new Exception("El token es nulo");
			}
			String tokenA = token.replace('"', ' ').trim();

			CloseableHttpClient client = HttpsSSLClient.createSSLInsecureClient();

			HttpPost postNew = new HttpPost(urlUsers);

			postNew.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + tokenA);
			postNew.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");

			StringEntity stringEntity = new StringEntity(new Gson().toJson(user));

			logger.debug(stringEntity.toString());

			postNew.setEntity(stringEntity);

			CloseableHttpResponse dato = client.execute(postNew);
			
			//String id = obtenerId(token,urlUsers,user);
			
			
			
			logger.debug(dato.getStatusLine().getStatusCode() + "");
			logger.debug(dato.toString());

			return new ResultAddUser(dato);
		} catch (Exception e) {
			logger.error("No se pudo agregar el usuario", e);
			throw e;
		}

	}



//	private String obtenerId(String token, String urlUsers, UserNewKeycloak user) throws Exception{
//
//		try {
//			logger.debug("entro a buscar el id del usuario");
//
//			if (token == null || token.length()<10) {
//				throw new Exception("El token es nulo");
//			}
//			String tokenA = token.replace('"', ' ').trim();
//
//	        CloseableHttpClient client = HttpClients.createDefault();
//
//			HttpGet  getNew = new HttpGet (urlUsers+"?email"+user.getEmail());
//
//			getNew.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + tokenA);
//			getNew.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
//
//			
//            CloseableHttpResponse response = client.execute(getNew);
//
//			StringEntity stringEntity = new StringEntity(new Gson().toJson(user));
//
//			logger.debug(stringEntity.toString());
//
//			((HttpResponse) getNew).setEntity(stringEntity);
//
//			CloseableHttpResponse dato = client.execute(getNew);
//			
//			
//			
//			String json = EntityUtils.toString(dato.getEntity());
//			logger.debug(json);
//			JsonParser parser = new JsonParser(); 
//			JsonObject jsonOn = (JsonObject)parser.parse(json);
//			Iterator entries = jsonOn.entrySet().iterator();
//			
//			String id = null;
//			while (entries.hasNext()) {
//			    Map.Entry entry = (Map.Entry) entries.next();
//			    String key = entry.getKey().toString();
//			    String value = entry.getValue().toString();
//			    if (key.equals("access_token")) {
//			    	logger.debug("Key = " + key + ", Value = " + value);
//					id = value;
//				}
//			}
//			
//			
//		} catch (Exception e) {
//			logger.debug("Error la buscar el id ",e);		
//			throw e;
//		}
//		return "";
//		
//	}
}
