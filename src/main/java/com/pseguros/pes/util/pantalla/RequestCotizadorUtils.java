package com.pseguros.pes.util.pantalla;

import groovyjarjarcommonscli.ParseException;

import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONException;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pseguros.pes.bean.DatosCotizacionGO;
import com.pseguros.pes.bean.DatosDinamicosCotizador;
import com.pseguros.pes.bean.DatosMostrarPanelB;

public class RequestCotizadorUtils {

	public static List obtenerDatosDinamicosFormateados(DatosCotizacionGO datosCoti, HttpServletRequest request) throws ParseException, JSONException {
		List datosDinamicos = datosCoti.getDatosDinamicos();
		String dato = request.getParameter("datosPantalla");
		JsonParser parser = new JsonParser();
        JsonArray gsonArr = parser.parse(dato).getAsJsonArray();
        for (Iterator iterator = datosDinamicos.iterator(); iterator.hasNext();) {
        	DatosDinamicosCotizador object = (DatosDinamicosCotizador) iterator.next();
		        for (JsonElement obj : gsonArr) {
		            JsonObject gsonObj = obj.getAsJsonObject();
			           if(object.getDato().getCrcoCrtdCdDato().trim().equals(gsonObj.get("name").toString().replace('"', ' ').trim())){
			        	   object.setValorCliente(gsonObj.get("value").toString().replace('"', ' ').trim());
			           }
		            }
		        	if(object.getValorCliente() == null || object.getValorCliente().length() <= 0){
		        		object.setValorCliente(object.getDato().getCrcoDato().toString());
		        	}
		        	object.setValorFinalDinamico("#"+object.getDato().getCrcoCrtdCdDato().toString()+";"+object.getValorCliente().toString()+";");
        }
        return datosDinamicos;
	}

	public static String obtenerDatosFinalDinamico(DatosCotizacionGO datosCoti) {
		List datosDinamicos = datosCoti.getDatosDinamicos();
		String datosFinal = "";
		String valorPrimer = "";
		for (Iterator iterator = datosDinamicos.iterator(); iterator.hasNext();) {
			DatosDinamicosCotizador object = (DatosDinamicosCotizador) iterator.next();
			if(object.getDato().getCrcoCrtdCdDato().equals("40021")){
				valorPrimer = object.getValorFinalDinamico().replace("#","");
			}else if(!object.getDato().getCrcoCrtdCdDato().equals("40010") && !object.getDato().getCrcoCrtdCdDato().equals("40220")){
				datosFinal = datosFinal + object.getValorFinalDinamico().toString();
			}
		}
		return valorPrimer + datosFinal;
	}

	public static String obtenerDatosFinalDinamicoGenerico(DatosCotizacionGO datosCoti) {
		List datosDinamicos = datosCoti.getDatosDinamicos();
		String datosFinal = "";
		String valorPrimer = "";
		for (Iterator iterator = datosDinamicos.iterator(); iterator.hasNext();) {
			DatosDinamicosCotizador object = (DatosDinamicosCotizador) iterator.next();
			if(object.getDato().getCrcoCrtdCdDato().equals("90000")){
				valorPrimer = object.getValorFinalDinamico().replace("#","");
			}else if(!object.getDato().getCrcoCrtdCdDato().equals("40010") && !object.getDato().getCrcoCrtdCdDato().equals("40220")){
				datosFinal = datosFinal + object.getValorFinalDinamico().toString();
			}
		}
		return valorPrimer + datosFinal;
}

	public static String buscarDatoDependencia(HttpServletRequest request) {

		String dependencias = request.getParameter("dependencias");
		String formData = request.getParameter("formData");
		String dato = "";
		JsonParser parser = new JsonParser();
        JsonArray gsonDependencias = parser.parse(dependencias).getAsJsonArray();
        
		JsonParser parserForm = new JsonParser();
        JsonArray gsonFormulario = parserForm.parse(formData).getAsJsonArray();
        
        for (JsonElement obj : gsonDependencias) {
            JsonObject gsonDependenciasObj = obj.getAsJsonObject();
            
            for (JsonElement objDos : gsonFormulario) {
                JsonObject gsonFormularioObj = objDos.getAsJsonObject();
                
                if(gsonDependenciasObj.get("name").toString().replace("d","").trim().equals(gsonFormularioObj.get("name").toString().trim())){
                	 dato = dato + gsonFormularioObj.get("value").toString().replace('"', ' ').trim();
                	 dato = dato +";";
                }
                
            }
        
        }
        return dato;
	}

	public static DatosMostrarPanelB obtenerDatosDinamicosMostrarPanelB(DatosCotizacionGO datosCoti, HttpServletRequest request, DatosMostrarPanelB datosPanelB) {
		String dato = request.getParameter("objDatosMostrar");
		JsonParser parser = new JsonParser();
        JsonArray gsonArr = parser.parse(dato).getAsJsonArray();
		        for (JsonElement obj : gsonArr) {
		            JsonObject gsonObj = obj.getAsJsonObject();
			           if(gsonObj.get("name").toString().replace('"', ' ').trim().equals("annio")){
			        	   datosPanelB.setAnnio(gsonObj.get("value").toString().replace('"', ' '));
			           }else if(gsonObj.get("name").toString().replace('"', ' ').trim().equals("marca")){
			        	   datosPanelB.setMarca(gsonObj.get("value").toString().replace('"', ' '));
			           }else if (gsonObj.get("name").toString().replace('"', ' ').trim().equals("modelo")){
			        	   datosPanelB.setModelo(gsonObj.get("value").toString().replace('"', ' '));
			           }else{
			        	   datosPanelB.setPrecioBien(gsonObj.get("value").toString().replace('"', ' '));
			           }
			           
		            }
        return datosPanelB;
	}

	public static DatosMostrarPanelB obtenerDatosPromoPanelB(DatosCotizacionGO datosCoti, HttpServletRequest request, DatosMostrarPanelB datosPanelB) {
		
		datosPanelB.setPromoA(request.getParameter("promoATexto"));
		datosPanelB.setPromoB(request.getParameter("promoBTexto"));
		datosPanelB.setPromoC(request.getParameter("promoCTexto"));
		
		
		return datosPanelB;
	}

}
