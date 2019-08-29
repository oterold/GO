package com.pseguros.pes.util.json;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.pseguros.pes.bean.Parametros;
import com.pseguros.pes.bean.Reporte;
import com.pseguros.pes.bean.ReporteSiniestro;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class JsonUtils {

       private static JsonUtils instance;

       private JsonUtils() {
       }

       public static JsonUtils getInstance() {
             if (null == instance) {
                    instance = new JsonUtils();
             }
             return instance;
       }

       /**
       * Metodo que lee del request el json
       * @param incomingData
       * @return
       * @throws IOException
       */
       public JSONObject loadJsonRequest(final InputStream incomingData) throws IOException {
             return loadJsonRequest(incomingData, "UTF-8");
       }

       public JSONObject loadJsonRequest(InputStream incomingData, String ch) throws IOException {
             
             StringBuilder crunchifyBuilder = new StringBuilder();
             BufferedReader in = new BufferedReader(new InputStreamReader(incomingData,ch));
             String line = null;
             while ((line = in.readLine()) != null) {
                    crunchifyBuilder.append(line);
             }

             JSONObject obj = (JSONObject) JSONSerializer.toJSON(crunchifyBuilder.toString());
             
             return obj;
       }
       
       public JSONArray loadJsonArrayRequest(InputStream incomingData, String ch) throws IOException {
             
             StringBuilder crunchifyBuilder = new StringBuilder();
             BufferedReader in = new BufferedReader(new InputStreamReader(incomingData,ch));
             String line = null;
             while ((line = in.readLine()) != null) {
                    crunchifyBuilder.append(line);
             }

             JSONArray obj = (JSONArray) JSONSerializer.toJSON(crunchifyBuilder.toString());
             
             return obj;
       }

    /**
     * Metodo Util que tiene como funcionalidad pasar un objeto a un json   
     * @param obj
     * @return
     * @throws Exception
     */
	public static String generateJson(Object obj) throws Exception {

		try {

			if (obj == null) {
				return "{}";
			}
			
			Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
			gson = new Gson();

			return gson.toJson(obj);
			
		} catch (Exception e) {
			throw new Exception("No puedo generar el Json segun el objeto");
		}

	}
	
	/**
     * Metodo Util que tiene como funcionalidad pasar un json string a un json object   
     * @param obj
     * @return
     * @throws Exception
     */
	
	public static JsonObject generateToJson(String aux) throws Exception {

		try {

			if (aux == null || aux  == "" || aux == "{}") {
		        throw new Exception();
			}
			
			Gson gson = new GsonBuilder().setPrettyPrinting().create();
	        
	        JsonElement jelem = gson.fromJson(aux, JsonElement.class);
	        JsonObject response = jelem.getAsJsonObject();

			return response;
			
		} catch (Exception e) {
			throw new Exception("No puedo generar el Json Object segun el Json String");
		}

	}
       
/*************************************************************
 * ***********************************************************
 * Funcion para convertir datos provenientes de procedimientos
 * con formato [{key=value}] a formato json[{"key":"value"}]
 * ***********************************************************
 * ***********************************************************/	
	
public static String convertirAJson(List listaBoletaPago){
		
		String listaBoletaPago1="";
		
		String datosBoletaDePago ="";
		
		String[] separador1;
		String[] separador2;
		
		for(int x=0;x<listaBoletaPago.size();x++) {
			  listaBoletaPago1 += listaBoletaPago.get(x);
			  if((x+1)<listaBoletaPago.size()){
				  listaBoletaPago1 += ",";
			  }
			  
		}
		datosBoletaDePago += listaBoletaPago1.replace("{","").replace("}", ""); 
		separador1 = datosBoletaDePago.split(",");
		
		int parametros=10;
		
		String jsonDato="[";
		String dato = "";
		String datoAux="";
		
		for(int i=0; i<separador1.length; i++){

			separador2= separador1[i].split("=");
			
			
			if(separador2.length >1){
				dato += "\""+separador2[0].trim()+"\""+":"+"\""+separador2[1].trim()+"\"";
			}
			else{
				dato += "\""+separador2[0].trim()+"\""+":"+"\""+"\"";
			}			
			
			if((i+1)%parametros==0){
				datoAux = datoAux+"{" + dato + "}";
				if((i+1)<separador1.length){				
					datoAux +=",";
					
				}
				dato="";
			}
			else{
				dato += ",";
			}
			
		}
		
		jsonDato = "[" + datoAux + "]";
		
		return jsonDato;
	}    
       
       
}
