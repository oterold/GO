package com.pseguros.pes.controller.pub.entidades;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

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
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;

@Controller
public class CotiPubController  extends AbstractPubController{
private static final Logger logger = LoggerFactory.getLogger(CotiPubController.class);
	
	private static final String PANTALLA_COTI = "partials/pes/buscadorExperto/coti/cotiHomeTemplate";
	private static final String PANTALLA_COTI_GENERALES = "partials/pes/buscadorExperto/coti/generales/cotiGeneralesHomeTemplate";
	private static final String PANTALLA_COTI_BIENES = "partials/pes/buscadorExperto/coti/bienes/cotiBienesHomeTemplate";
	private static final String PANTALLA_COTI_PLANES = "partials/pes/buscadorExperto/coti/planes/cotiPlanesHomeTemplate";
	private static final String PANTALLA_COTI_FIN = "partials/pes/buscadorExperto/coti/finCoti/cotiFinHomeTemplate";
	
	
	@Autowired
	private ExecuteService executeService;
	
	
	@RequestMapping(value = "/cotizador", method = RequestMethod.GET)
	public ModelAndView homeCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "");

			return new ModelAndView(PANTALLA_COTI, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	@RequestMapping(value = "/cotizadorGenerales", method = RequestMethod.GET)
	public ModelAndView homeCotiGenerales(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			

			return new ModelAndView(PANTALLA_COTI_GENERALES, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	
	@RequestMapping(value = "/cotizadorBienes", method = RequestMethod.GET)
	public ModelAndView homeCotiBienes(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			

			return new ModelAndView(PANTALLA_COTI_BIENES, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}


	
	@RequestMapping(value = "/cotizadorPlanes", method = RequestMethod.GET)
	public ModelAndView homeCotiPlanes(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			

			return new ModelAndView(PANTALLA_COTI_PLANES, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	
	@RequestMapping(value = "/cotizadorFin", method = RequestMethod.GET)
	public ModelAndView homeCotiFin(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			

			return new ModelAndView(PANTALLA_COTI_FIN, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	

}
