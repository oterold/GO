package com.pseguros.pes.util.pantalla;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.pseguros.pes.cotizador.GoCotizador;



public class UtilEnviarImagenes {

	
	private static final String urlZamba ="http://imageapp/zambaweb.restapi/api/InsertFiles/UploadFile";
	
	private static final Logger logger = LoggerFactory.getLogger(GoCotizador.class);

	public static void ejecutarProcedimientoFotos(HttpServletRequest request, String inspeccion, String encode,String ext) throws UnsupportedEncodingException, HttpException, IOException {
		String dominio="TRR222";
				subirArchivo(encode,dominio, inspeccion,ext);
	}

	public static String subirFotosDenunciaSiniestro(String pathTmp, String nombre, String ext) {
		try {
					File file = new File(pathTmp+nombre);
					byte[] bytes = loadFile(file);
					byte[] encoded = Base64.encodeBase64(bytes);
					String encodedString = new String(encoded);
					
					logger.debug("El archivo " + nombre + " contiene : " + bytes.length / 1204 + " KB y el encode es : "+encodedString);
					
					return encodedString;
					
				} catch (Exception e) {
					logger.error("Error encodeFileToBase64Binary " , e);
				}
		return "";		
	}
	
	
	
private static Boolean subirArchivo(String fileAll, String dominio, String inspeccion, String ext) 	throws UnsupportedEncodingException, IOException, HttpException {
		try {
			
		final HttpClient httpClient = new HttpClient();
		String valorfijo = "14";
		String JSON_STRING = "{\"file\":{\"data\":\"data:application/pdf;base64,"+fileAll+"\",\"extension\":\"pdf\"} ,\"DocTypeId\":\"17\",\"userid\":\"45\",\"indexs\":[{\"id\":\"102\",\"value\":\""+inspeccion+"\"},{\"id\":\"3\",\"value\":\""+dominio+"\"},{\"id\":\"25\",\"value\":\""+valorfijo +"\"}]}";
		
		logger.debug("Inicio subida .....  " );
		
		//logger.debug("JSON : " + JSON_STRING );
		
		
		StringRequestEntity requestEntity = new StringRequestEntity(
			    JSON_STRING,
			    "application/json",
			    "UTF-8");

			PostMethod postMethod = new PostMethod(urlZamba);
			postMethod.setRequestEntity(requestEntity);

			httpClient.getHttpConnectionManager().getParams().setConnectionTimeout(300 * 1000);
			httpClient.getHttpConnectionManager().getParams().setSoTimeout(300 * 1000);
	  
	  
			int statusCode = httpClient.executeMethod(postMethod);
			
			logger.debug("Return Code : " + statusCode);
			InputStream data = postMethod.getResponseBodyAsStream();
			
			String dato = getStringFromInputStream(data).replaceAll("\"", "");
			logger.debug("Return Msg :" + dato);
			postMethod.releaseConnection();
			
			try {
				return new Boolean(dato);
				
			} catch (Exception e) {
				logger.error("Error subirArchivo " + dato , e);

			}finally{
				logger.debug("FIN SUBIDA " );
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
			return false;
	
	}
	
	
			
		private static String getStringFromInputStream(InputStream is) {
		
			BufferedReader br = null;
			StringBuilder sb = new StringBuilder();
		
			String line;
			try {
		
				br = new BufferedReader(new InputStreamReader(is));
				while ((line = br.readLine()) != null) {
					sb.append(line);
				}
		
			} catch (IOException e) {
				logger.error("Error getStringFromInputStream1 " , e);
			} finally {
				if (br != null) {
					try {
						br.close();
					} catch (IOException e) {
						logger.error("Error getStringFromInputStream2 " , e);
					}
				}
			}
		
			return sb.toString();
		
		}
	
	private static  byte[] loadFile(File file) throws IOException {
	    InputStream is = new FileInputStream(file);

	    long length = file.length();
	    if (length > Integer.MAX_VALUE) {
	        // File is too large
	    }
	    byte[] bytes = new byte[(int)length];
	    
	    int offset = 0;
	    int numRead = 0;
	    while (offset < bytes.length
	           && (numRead=is.read(bytes, offset, bytes.length-offset)) >= 0) {
	        offset += numRead;
	    }

	    if (offset < bytes.length) {
	        throw new IOException("Could not completely read file "+file.getName());
	    }

	    is.close();
	    return bytes;
	}
	
	
}
