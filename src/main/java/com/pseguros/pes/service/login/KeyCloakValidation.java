package com.pseguros.pes.service.login;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.pseguros.pes.bean.Parametros;
import com.pseguros.pes.dto.ResponseAuthLoginDTO;
import com.pseguros.pes.util.json.JsonUtils;
import com.pseguros.pes.util.properties.PropertiesConstantes;
import com.pseguros.pes.util.properties.UtilProperties;

@Service
public class KeyCloakValidation {

	private static final Logger logger = LoggerFactory.getLogger(KeyCloakValidation.class);

	public List<Parametros> getUsuario(String usuario,
			String password) {

		
		try {
			if (InetAddress.getLocalHost().getHostName().toString().toUpperCase().trim().equals("SVRPES")) {
				
				return getUsuarioPorToken(UtilProperties.getDato(PropertiesConstantes.URL_OAUTH2_PRODUCCION),usuario,password);
			}else {
				return getUsuarioPorToken(UtilProperties.getDato(PropertiesConstantes.URL_OAUTH2),usuario,password);
			}
			
		} catch (Exception e) {
			return getUsuarioPorToken(UtilProperties.getDato(PropertiesConstantes.URL_OAUTH2),usuario,password);
		}
		
	}
	
	
	public List<Parametros> getUsuarioPorToken(String urlAuth, String usuario,
			String password) {

		ResponseAuthLoginDTO responseAuthLoginDTO = null;
		JsonObject token = null;
		Set<String> keys = null;
		
		List<Parametros> datosToken = new ArrayList<Parametros>();
		
		Parametros parametro = null;
		
		try {
			responseAuthLoginDTO = getResponseAuthLoginDTO(urlAuth, usuario, password);
			token = obtenerTokenJson(responseAuthLoginDTO);
			
			keys = token.keySet();
			
			for(String aux: keys){
				String keyToken = aux;
				String contenidoToken = token.get(keyToken).toString();
				parametro = new Parametros(aux, contenidoToken);
				
				datosToken.add(parametro);
			}			

		} catch (Exception e) {
			logger.error("No se pudo obtener los datos de autenticacion del usuario", e);
		}

		return datosToken;

	}
	
	

	private ResponseAuthLoginDTO getResponseAuthLoginDTO(String urlAuth, String usuario,
			String password) {

		String grantType = UtilProperties
				.getDato(PropertiesConstantes.GRANT_TYPE);
		String clientId = UtilProperties
				.getDato(PropertiesConstantes.CLIENT_ID);
		String clientSecret = UtilProperties
				.getDato(PropertiesConstantes.CLIENT_SECRET);
		
		String contentType = UtilProperties
				.getDato(PropertiesConstantes.CONTENT_TYPE);

		ResponseAuthLoginDTO responseAuthLogin = null;

		String urlInputParameters = "grant_type=" + grantType + "&client_id="
				+ clientId + "&username=" + usuario + "&password=" + password
				+ "&client_secret=" + clientSecret;

		logger.info("Validacion OAuth2 getUsuario" + urlAuth + " " + urlInputParameters);
		try {
			URL url = new URL(urlAuth);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", contentType);
			OutputStream os = conn.getOutputStream();
			os.write(urlInputParameters.getBytes());
			os.flush();
			if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));
			String output;
			String respuesta = "";
			while ((output = br.readLine()) != null) {
				respuesta = output;
			}
			conn.disconnect();

			JsonObject response = JsonUtils.generateToJson(respuesta);

			responseAuthLogin = new ResponseAuthLoginDTO(response);

		} catch (Exception e) {
			logger.error(e.getMessage(),e);
		}

		return responseAuthLogin;
	}

	private JsonObject obtenerTokenJson(ResponseAuthLoginDTO responseAuthLoginDTO) {
		JsonObject dato = null;
		try {
			String[] partes = responseAuthLoginDTO.getAccessToken()
					.split("\\.");
			String datoUsuario = partes[1];

			byte[] valueDecoded = Base64.decodeBase64(datoUsuario);
			Gson gson = new GsonBuilder().setPrettyPrinting().create();

			JsonElement jelem;
			jelem = gson.fromJson(new String(valueDecoded, "UTF-8"),
					JsonElement.class);
			dato = jelem.getAsJsonObject();
		} catch (JsonSyntaxException e) {
			logger.error(e.getMessage());
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage());
		}

		return dato;
	}
}
