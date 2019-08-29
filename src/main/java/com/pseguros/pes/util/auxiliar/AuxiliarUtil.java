package com.pseguros.pes.util.auxiliar;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pseguros.pes.bean.DatosContactoCotizador;
import com.pseguros.pes.bean.DatosCotizacionGO;
import com.pseguros.pes.bean.DatosDefaultCotizacion;
import com.pseguros.pes.bean.DatosDinamicosCotizador;
import com.pseguros.pes.bean.DatosGeneralesCotizacion;
import com.pseguros.pes.bean.DatosMostrarPanelB;
import com.pseguros.pes.bean.DatosSeleccionados;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.cotizador.GoCotizador;
import com.pseguros.pes.interceptor.ConstantesDeSession;

public class AuxiliarUtil extends AbstractPubController {
	private static final Logger logger = LoggerFactory.getLogger(GoCotizador.class);

	public static String generarAux(DatosCotizacionGO datosCoti) {
		StringBuffer aux = new StringBuffer();
		aux.append(datosCoti.getProductor());
		aux.append(";");
		aux.append(datosCoti.getProductor());
		aux.append(";");
		aux.append(datosCoti.getEsquemaA());
		aux.append(";");
		aux.append(datosCoti.getEsquemaB());
		aux.append(";");
		aux.append(datosCoti.getRol());
		aux.append(";");
		aux.append(";");
		return aux.toString();
	}

	public static DatosDefaultCotizacion cargarDatosDefault(DatosCotizacionGO datosCoti, HttpServletRequest request, Future<ArrayList> datosValoresDefault) throws Exception {

		while (!(datosValoresDefault.isDone())) {
			Thread.sleep(5);
		}
		// recorro la lista para poder sacar los valores default de los 3
		// elementos
		DatosDefaultCotizacion datosObjDefault = new DatosDefaultCotizacion();

		try {
			logger.debug("cargar el objeto de valores por defecto");

			for (Iterator iterator = datosValoresDefault.get().iterator(); iterator.hasNext();) {
				Object type = (Object) iterator.next();

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("1")) {
					datosObjDefault.setProductor(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("2")) {
					datosObjDefault.setProvincia(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("3")) {
					datosObjDefault.setVigencia(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}
				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("4")) {
					datosObjDefault.setVigenciaTecnica(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("5")) {
					datosObjDefault.setMoneda(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("6")) {
					datosObjDefault.setTipoFacturacion(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("7")) {
					datosObjDefault.setTipoPersona(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("8")) {
					datosObjDefault.setPlanPago(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}
				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("9")) {
					datosObjDefault.setModoCalculo(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("10")) {
					datosObjDefault.setMedioPago(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("11")) {
					datosObjDefault.setOrigenPago(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("12")) {
					datosObjDefault.setIva(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("12")) {
					datosObjDefault.setCuit(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

				if (((HashMap) type).get("P_TF_GANA.GANA_NU_CAMPO").toString().trim().equals("12")) {
					datosObjDefault.setCantCertificado(((HashMap) type).get("P_TF_GANA.GANA_DE_VALOR_DEFAULT").toString());
				}

			}
		} catch (Exception e) {
			logger.error("Error al cargar el objeto de valores por defecto" + e);
		}
		return datosObjDefault;
	}

	public static DatosGeneralesCotizacion cargarDatosgeneralesForm(HttpServletRequest request) {

		// CARGO EL OBJETO CON LOS DATOS DLE REQUEST
		DatosGeneralesCotizacion datosGenerales = new DatosGeneralesCotizacion();
		datosGenerales.setProductor(request.getParameter("productorLabel"));
		datosGenerales.setProvincia(request.getParameter("datoProvincia"));
		datosGenerales.setTipoPersona(request.getParameter("tipoPersona"));
		datosGenerales.setMedioPago(request.getParameter("selectMedioPago"));
		datosGenerales.setOrigenPago(request.getParameter("selectOrigenPago"));
		datosGenerales.setCondicionIva(request.getParameter("condicionIVA"));
		datosGenerales.setCuit(request.getParameter("cuit"));
		datosGenerales.setVigencia(request.getParameter("selectVigencia"));
		datosGenerales.setVigenciaTecnica(request.getParameter("selectVigenciaTecnica"));
		datosGenerales.setTipoFacturacion(request.getParameter("tipoFacturacion"));
		datosGenerales.setMoneda(request.getParameter("moneda"));
		datosGenerales.setPlanPago(request.getParameter("selectPlanesPago"));
		datosGenerales.setModoCalculo(request.getParameter("modoCalculo"));

		return datosGenerales;
	}

	public static DatosContactoCotizador cargardatosContacto(HttpServletRequest request) {

		// CARGO EL OBJETO CON LOS DATOS DLE REQUEST
		DatosContactoCotizador datosContacto = new DatosContactoCotizador();
		datosContacto.setCuit(request.getParameter("cuit"));
		datosContacto.setDni(request.getParameter("dniCliente"));
		datosContacto.setDomicilio(request.getParameter("domicilio"));
		datosContacto.setEmail(request.getParameter("email"));
		datosContacto.setNombre(request.getParameter("nombreCliente"));
		datosContacto.setTelefono(request.getParameter("celular"));

		// guardo en session los datos dle cliente

		request.getSession().setAttribute(ConstantesDeSession.NOMBRE_CLIENTE_COTIZADOR, datosContacto.getNombre());
		request.getSession().setAttribute(ConstantesDeSession.DNI_CLIENTE_COTIZADOR, datosContacto.getDni());
		request.getSession().setAttribute(ConstantesDeSession.EMIAL_CLIENTE_COTIZADOR, datosContacto.getEmail());
		request.getSession().setAttribute(ConstantesDeSession.CUIT_CLIENTE_COTIZADOR, datosContacto.getCuit());
		request.getSession().setAttribute(ConstantesDeSession.TELEFONO_CLIENTE_COTIZADOR, datosContacto.getTelefono());
		request.getSession().setAttribute(ConstantesDeSession.DOMICIOLIO_CLIENTE_COTIZADOR, datosContacto.getDomicilio());

		return datosContacto;
	}

	public static List cargarDatosGeneralesSeleccionados(DatosCotizacionGO datosCoti, HttpServletRequest request) {

		List datosSeleccionados = datosCoti.getDatosGeneralesSeleccionados();
		String dato = request.getParameter("textoSeleccionadoStep2");
		JsonParser parser = new JsonParser();
        JsonArray gsonArr = parser.parse(dato).getAsJsonArray();
        DatosSeleccionados datosSelec = new DatosSeleccionados();
		        for (JsonElement obj : gsonArr) {
		            JsonObject gsonObj = obj.getAsJsonObject();
		            datosSelec.setId(gsonObj.get("id").toString());
		            datosSelec.setValor(gsonObj.get("texto").toString());
		            datosSeleccionados.add(datosSelec);
		        }
        return datosSeleccionados;
	}


	public static Object generarPromo(DatosCotizacionGO datosCoti) {
		String datosPromo = "";
		if(datosCoti.getPromocionA()!=null && !datosCoti.getPromocionA().equals("") && datosCoti.getPromocionA().length() != 0){
			datosPromo = datosCoti.getPromocionA()+";";
		}
		if(datosCoti.getPromocionB()!=null && !datosCoti.getPromocionB().equals("") && datosCoti.getPromocionB().length() != 0){
			datosPromo = datosPromo + datosCoti.getPromocionB()+";";
		}
		if(datosCoti.getPromocionC()!=null && !datosCoti.getPromocionC().equals("") && datosCoti.getPromocionC().length() != 0){
			datosPromo = datosPromo+ datosCoti.getPromocionC()+";";
		}
		return datosPromo;
	}

	public static void cargarDatosEsqRamoProd(HttpServletRequest request, DatosCotizacionGO datosCoti, DatosMostrarPanelB datosPanelB) {
		
		datosPanelB.setProd(request.getParameter("descProd"));
		datosCoti.setProducto(request.getParameter("prod"));
		datosCoti.setEsquemaA(request.getParameter("esqA"));
		datosCoti.setEsquemaB(request.getParameter("esqB"));	
		datosCoti.setDatosPanelB(datosPanelB);
		
	}

	public static DatosMostrarPanelB cargarDatosGeneralesMostrar(HttpServletRequest request, DatosCotizacionGO datosCoti, DatosMostrarPanelB datosPanelB) {
		datosPanelB.setFacturacion(request.getParameter("valorFacturacion"));
		datosPanelB.setMedioPago(request.getParameter("valorMedioPago"));
		datosPanelB.setFormaPago(request.getParameter("valorFormaPago"));
		datosPanelB.setVigencia(request.getParameter("valorVigencia"));
		datosPanelB.setMoneda(request.getParameter("valorMoneda"));
		return datosPanelB;
	}
}
