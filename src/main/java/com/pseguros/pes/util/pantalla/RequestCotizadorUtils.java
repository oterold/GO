package com.pseguros.pes.util.pantalla;

import groovyjarjarcommonscli.ParseException;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.groovy.runtime.metaclass.NewStaticMetaMethod;

import net.sf.json.JSONException;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pseguros.pes.bean.DatosContactoCotizador;
import com.pseguros.pes.bean.DatosCotizacionGO;
import com.pseguros.pes.bean.DatosDinamicosCotizador;
import com.pseguros.pes.bean.DatosMostrarPanelB;
import com.pseguros.pes.bean.DatosSeleccionados;
import com.pseguros.pes.bean.DatosTomadorAseg;
import com.pseguros.pes.bean.IngresarPersonaCotizador;

public class RequestCotizadorUtils {

	public static List obtenerDatosDinamicosFormateados(DatosCotizacionGO datosCoti, HttpServletRequest request, List datosDinamicosRequest,String mascara) throws ParseException, JSONException {
		List datosDinamicos = datosDinamicosRequest;
		String dato = request.getParameter("datosPantalla");
		JsonParser parser = new JsonParser();
		JsonArray gsonArr = parser.parse(dato).getAsJsonArray();
		for (Iterator iterator = datosDinamicos.iterator(); iterator.hasNext();) {
			DatosDinamicosCotizador object = (DatosDinamicosCotizador) iterator.next();
			for (JsonElement obj : gsonArr) {
				JsonObject gsonObj = obj.getAsJsonObject();
				if (object.getDato().getCrcoCrtdCdDato().trim().equals(gsonObj.get("name").toString().replace('"', ' ').trim())) {
					object.setValorCliente(gsonObj.get("value").toString().replace('"', ' ').trim());
				}
				guardarDatosPanelBdatosDelBien(gsonObj.get("name").toString().replace('"', ' ').trim(),gsonObj.get("value").toString().replace('"', ' ').trim(),datosCoti);
			}
			if (object.getValorCliente() == null || object.getValorCliente().length() <= 0) {
				object.setValorCliente(object.getDato().getCrcoDato().toString());
			}
			object.setValorFinalDinamico("#" + object.getDato().getCrcoCrtdCdDato().toString() + ";" + object.getValorCliente().toString() + mascara);
		}
		return datosDinamicos;
	}
	

	private static void guardarDatosPanelBdatosDelBien(String key, String value, DatosCotizacionGO datosCoti) {
		if(key.equals("40023")){
			datosCoti.setPatente(value);
		}
		if(key.equals("40004")){
			datosCoti.setChasis(value);
		}
		if(key.equals("40005")){
			datosCoti.setMotor(value);
		}
	}


	public static String obtenerDatosFinalDinamico(DatosCotizacionGO datosCoti, List datosDinamicosRequest) {
		List datosDinamicos =datosDinamicosRequest;
		String datosFinal = "";
		String valorPrimer = "";
		for (Iterator iterator = datosDinamicos.iterator(); iterator.hasNext();) {
			DatosDinamicosCotizador object = (DatosDinamicosCotizador) iterator.next();
			if (object.getDato().getCrcoCrtdCdDato().equals("40021")) {
				valorPrimer = object.getValorFinalDinamico().replace("#", "");
			} else if (!object.getDato().getCrcoCrtdCdDato().equals("40010") && !object.getDato().getCrcoCrtdCdDato().equals("40220")) {
				datosFinal = datosFinal + object.getValorFinalDinamico().toString();
			}
		}
		return valorPrimer + datosFinal;
	}
	
	
	public static String obtenerDatosFinalDinamicoEmision(DatosCotizacionGO datosCoti, List datosDinamicosRequest) {
		List datosDinamicos =datosDinamicosRequest;
		String datosFinal = "";
		String valorPrimer = "";
		for (Iterator iterator = datosDinamicos.iterator(); iterator.hasNext();) {
			DatosDinamicosCotizador object = (DatosDinamicosCotizador) iterator.next();
			if (object.getDato().getCrcoCrtdCdDato().equals("40023")) {
				valorPrimer = object.getValorFinalDinamico().replace("#", "");
			} else if (!object.getDato().getCrcoCrtdCdDato().equals("40010") && !object.getDato().getCrcoCrtdCdDato().equals("40220")) {
				datosFinal = datosFinal + object.getValorFinalDinamico().toString();
			}
		}
		return valorPrimer + datosFinal;
	}
	

	
	public static String obtenerDatosFinalDinamicoInspeccion(DatosCotizacionGO datosCoti, List datosDinamicosRequest) {
		List datosDinamicos =datosDinamicosRequest;
		String datosFinal = "";
		String valorPrimer = "";
		for (Iterator iterator = datosDinamicos.iterator(); iterator.hasNext();) {
			DatosDinamicosCotizador object = (DatosDinamicosCotizador) iterator.next();
			if (object.getDato().getCrcoCrtdCdDato().equals("48000")) {
				valorPrimer = object.getValorFinalDinamico().replace("#", "");
			} else {
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
			if (object.getDato().getCrcoCrtdCdDato().equals("90000")) {
				valorPrimer = object.getValorFinalDinamico().replace("#", "");
			} else if (!object.getDato().getCrcoCrtdCdDato().equals("40010") && !object.getDato().getCrcoCrtdCdDato().equals("40220")) {
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

				if (gsonDependenciasObj.get("name").toString().replace("d", "").trim().equals(gsonFormularioObj.get("name").toString().trim())) {
					dato = dato + gsonFormularioObj.get("value").toString().replace('"', ' ').trim();
					dato = dato + ";";
				}

			}

		}
		return dato;
	}

	public static String obtenerDatosFormateados(DatosCotizacionGO datosCoti, HttpServletRequest request) {
		String datos = request.getParameter("datos");
		JsonParser parser = new JsonParser();
		String valor = "";
		JsonArray gsonDependencias = parser.parse(datos).getAsJsonArray();
		for (JsonElement obj : gsonDependencias) {
			JsonObject gsonDependenciasObj = obj.getAsJsonObject();
			valor = valor + gsonDependenciasObj.get("value").toString().replace('"', ' ').trim() + ";";
		}
		return valor + ";#";

	}

	
	
	public static String obtenerDatosFormateadosDomicilio(DatosCotizacionGO datosCoti, HttpServletRequest request) {
		String datos = request.getParameter("datos");
		JsonParser parser = new JsonParser();
		String valor = "";
		JsonArray gsonDependencias = parser.parse(datos).getAsJsonArray();
		for (JsonElement obj : gsonDependencias) {
			JsonObject gsonDependenciasObj = obj.getAsJsonObject();
			valor = valor + gsonDependenciasObj.get("value").toString().replace('"', ' ').trim() + ";";
			guardarDatosenSession(gsonDependenciasObj.get("name"), gsonDependenciasObj.get("value"), datosCoti);
		}
		return valor + "#";
	}

	public static DatosMostrarPanelB obtenerDatosDinamicosMostrarPanelB(DatosCotizacionGO datosCoti, HttpServletRequest request, DatosMostrarPanelB datosPanelB) {
		String dato = request.getParameter("objDatosMostrar");
		JsonParser parser = new JsonParser();
		JsonArray gsonArr = parser.parse(dato).getAsJsonArray();
		for (JsonElement obj : gsonArr) {
			JsonObject gsonObj = obj.getAsJsonObject();
			if (gsonObj.get("name").toString().replace('"', ' ').trim().equals("annio")) {
				datosPanelB.setAnnio(gsonObj.get("value").toString().replace('"', ' '));
			} else if (gsonObj.get("name").toString().replace('"', ' ').trim().equals("marca")) {
				datosPanelB.setMarca(gsonObj.get("value").toString().replace('"', ' '));
			} else if (gsonObj.get("name").toString().replace('"', ' ').trim().equals("modelo")) {
				datosPanelB.setModelo(gsonObj.get("value").toString().replace('"', ' '));
			} else {
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

	public static String obtenerDatosFormateadosCrearPersona(DatosCotizacionGO datosCoti, HttpServletRequest request) {
		String datos = request.getParameter("datos");
		JsonParser parser = new JsonParser();
		JsonArray gsonDependencias = parser.parse(datos).getAsJsonArray();

		return cargarDatosIngresoPersona(gsonDependencias);
	}

	/*******************************************************
	 * PRIVADOS
	 * 
	 * @param gsonDependencias
	 * @return
	 ****************************************************************/

	private static String cargarDatosIngresoPersona(JsonArray gsonDependencias) {
		IngresarPersonaCotizador persona = new IngresarPersonaCotizador();
		String valor = "";
		String nombre = "";
		for (JsonElement obj : gsonDependencias) {
			JsonObject gsonDependenciasObj = obj.getAsJsonObject();
			valor = gsonDependenciasObj.get("value").toString().replace('"', ' ').trim();
			nombre = gsonDependenciasObj.get("name").toString().replace('"', ' ').trim();
			cargarObjetoPersona(valor, nombre, persona);
		}
		return persona.toString();
	}

	private static void cargarObjetoPersona(String valor, String nombre, IngresarPersonaCotizador persona) {

		if (nombre.equals("selectDni")) {
			persona.setTipoDni(valor);
		}
		if (nombre.equals("clienteDni")) {
			persona.setDni(valor);

		}
		if (nombre.equals("cuit")) {
			persona.setCuit(valor);
		}
		if (nombre.equals("nombre")) {
			persona.setNombre(valor);
		}
		if (nombre.equals("apell")) {
			persona.setApellido(valor);
		}
		if (nombre.equals("selectGenero")) {
			persona.setSexo(valor);
		}
		if (nombre.equals("estadoCivil")) {
			persona.setEstadoCivil(valor);
		}
		if (nombre.equals("fechaNac")) {
			persona.setFecha(valor);
		}
		if (nombre.equals("profesion")) {
			persona.setProfesion(valor);
		}
		if (nombre.equals("nacionalidad")) {
			persona.setNacionalidad(valor);
		}
		if (nombre.equals("checkPoliticamente")) {
			persona.setPoliticamenteExpuesto(valor);
		}
		if (nombre.equals("checkArt")) {
			persona.setArt(valor);
		}

		if (nombre.equals("lugarNacimiento")) {
			persona.setLugarNacimiento(valor);
		}

		if (nombre.equals("observacion")) {
			persona.setObservacion(valor);
		}
	}

	private static void guardarDatosenSession(JsonElement nombre, JsonElement dato, DatosCotizacionGO datosCoti) {

		DatosTomadorAseg datosAseg = datosCoti.getDatosAseg();
		if (nombre.toString().replace('"', ' ').trim().equals("callePersona")) {
			datosAseg.setCalle(dato.toString().replace('"', ' ').trim());
		}
		if (nombre.toString().replace('"', ' ').trim().equals("numeroPersona")) {
			datosAseg.setNumero(dato.toString().replace('"', ' ').trim());
		}
		if (nombre.toString().replace('"', ' ').trim().equals("datoComunicacion")) {
			if (dato.toString().replace('"', ' ').trim().indexOf("@") > 0) {
				datosAseg.setTelefono(dato.toString().replace('"', ' ').trim());
			} else {
				datosAseg.setEmail(dato.toString().replace('"', ' ').trim());
			}
		}
		datosCoti.setDatosAseg(datosAseg);
		// falta el banco
	}

	public static DatosContactoCotizador cargardatosContacto(HttpServletRequest request) {
		String datos = request.getParameter("dataString");
		DatosContactoCotizador datosContacto = new DatosContactoCotizador();
		JsonParser parser = new JsonParser();
		JsonArray gsonArr = parser.parse(datos).getAsJsonArray();
		DatosSeleccionados datosSelec = new DatosSeleccionados();
		for (JsonElement obj : gsonArr) {
			JsonObject gsonObj = obj.getAsJsonObject();
			guardarDatosenSessionDatosCliente(gsonObj.get("name"), gsonObj.get("value"), datosContacto, request);
		}

		return datosContacto;
	}

	private static void guardarDatosenSessionDatosCliente(JsonElement id, JsonElement dato, DatosContactoCotizador datosContacto, HttpServletRequest request) {
		if (id.toString().replace('"', ' ').trim().equals("cuit")) {
			datosContacto.setCuit(dato.toString().replace('"', ' ').trim());
		}
		if (id.toString().replace('"', ' ').trim().equals("dni")) {
			datosContacto.setDni(dato.toString().replace('"', ' ').trim());
		}
		if (id.toString().replace('"', ' ').trim().equals("domicilio")) {
			datosContacto.setDomicilio(dato.toString().replace('"', ' ').trim());
		}
		if (id.toString().replace('"', ' ').trim().equals("email")) {
			datosContacto.setEmail(dato.toString().replace('"', ' ').trim());
		}
		if (id.toString().replace('"', ' ').trim().equals("nombre")) {
			datosContacto.setNombre(dato.toString().replace('"', ' ').trim());
		}
		if (id.toString().replace('"', ' ').trim().equals("telefono")) {
			datosContacto.setTelefono(dato.toString().replace('"', ' ').trim());
		}
		if (id.toString().replace('"', ' ').trim().equals("canal")) {
			datosContacto.setCanal(dato.toString().replace('"', ' ').trim());
		}
	}


	public static ArrayList obtenerNumerosInspeccion(String numerosInspeccion) {
		ArrayList datosInspeccion = new ArrayList();
		JsonParser parser = new JsonParser();
		JsonArray gsonArr = parser.parse(numerosInspeccion).getAsJsonArray();
		for (JsonElement obj : gsonArr) {
			JsonObject gsonObj = obj.getAsJsonObject();
				datosInspeccion.add(gsonObj.get("value").toString().replace('"', ' ').trim());
		}
		return datosInspeccion ;
	}
}
