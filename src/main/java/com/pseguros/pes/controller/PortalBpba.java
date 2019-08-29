package com.pseguros.pes.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.controller.pub.entidades.CobranzaPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;

@Controller
public class PortalBpba extends AbstractPubController{

private static final Logger logger = LoggerFactory.getLogger(CobranzaPubController.class);
	
	private static final String PANTALLA_PORTAL_BPBA = "partials/pes/portalBpba/portalBpbaTemplate";
	private static final String PANTALLA_PDF_VIDA = "partials/pes/pdfVida/pdfVidaHomeTemplate";
	private static final String PANTALLA_PDF_VIDA_DATOS = "partials/pes/pdfVida/pdfVidaDatos/pdfVidaDatosHomeTemplate";
	private static final String PANTALLA_PDF_VIDA_DATOS_PAGO = "partials/pes/pdfVida/pdfVidaPago/pdfVidaDatosPagoHomeTemplate";
	private static final String PANTALLA_PDF_VIDA_DATOS_RIESGO = "partials/pes/pdfVida/pdfVidaDatosRiesgo/pdfVidaDatosRiesgoHomeTemplate";
	private static final String PANTALLA_PDF_VIDA_DATOS_ACREDOR = "partials/pes/pdfVida/pdfVidaAcreedor/pdfVidaDatosAcreedorHomeTemplate";
	private static final String PANTALLA_PDF_VIDA_FIN = "partials/pes/pdfVida/finCotizacion/pdfVidaFinHomeTemplate";
	
	
	@Autowired
	private ExecuteService executeService;
	
	
	
	@RequestMapping(value = "/homeBPBA", method = RequestMethod.GET)
	public ModelAndView homeJuicios(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeSiniestro");

			
			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(PANTALLA_PORTAL_BPBA, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeFacturacion", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	@RequestMapping(value = "/bpba", method = RequestMethod.GET)
	public ModelAndView pdfVida(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioPdfVida()");

			return new ModelAndView(PANTALLA_PDF_VIDA, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	@RequestMapping(value = "/bpbaStep1", method = RequestMethod.GET)
	public ModelAndView pdfVidaDatos(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioPdfVida()");

			return new ModelAndView(PANTALLA_PDF_VIDA_DATOS, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	@RequestMapping(value = "/bpbaStep2", method = RequestMethod.GET)
	public ModelAndView pdfVidaPago(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioPdfVida()");

			return new ModelAndView(PANTALLA_PDF_VIDA_DATOS_PAGO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	
	@RequestMapping(value = "/bpbaStep3", method = RequestMethod.GET)
	public ModelAndView pdfVidaDatosRiesgo(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioPdfVida()");

			return new ModelAndView(PANTALLA_PDF_VIDA_DATOS_RIESGO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	@RequestMapping(value = "/bpbaStep4", method = RequestMethod.GET)
	public ModelAndView pdfVidaDatosAcreedor(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioPdfVida()");

			return new ModelAndView(PANTALLA_PDF_VIDA_DATOS_ACREDOR, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	
	@RequestMapping(value = "/bpbaFin", method = RequestMethod.GET)
	public ModelAndView pdfVidaDatosFin(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioPdfVida()");

			return new ModelAndView(PANTALLA_PDF_VIDA_FIN, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
}
