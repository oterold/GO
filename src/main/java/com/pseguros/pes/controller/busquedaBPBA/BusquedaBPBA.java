package com.pseguros.pes.controller.busquedaBPBA;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.controller.bpbaSiniestro.HomeBPBASiniestro;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;

@Controller
public class BusquedaBPBA  extends AbstractPubController{

	private static final Logger logger = LoggerFactory.getLogger(HomeBPBASiniestro.class);

	private static final String PANTALLA_BPBA_BUSQUEDA = "partials/pes/bpba/buscadorBPBA/buscadorBPBATemplate";
	
	
	@RequestMapping(value = "/goBPBA", method = RequestMethod.GET)
	public ModelAndView siniestroProducto(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		logger.debug("Request Encoding : " + request.getCharacterEncoding());

		Map<String, Object> mapa = new HashMap<String, Object>();

		System.setProperty("file.encoding", "UTF-8");

		try {

			logger.debug("Mostrar Pantalla BPBA Siniestro Producto");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			mapa.put("funcionOnload", "inicioBusquedaBPBA()");
			
			mapa.put("tipoBuscador", "goBPBA");

			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(PANTALLA_BPBA_BUSQUEDA, mapa);

		} catch (Exception e) {

			logger.error(getUserLog(request) + "Exploto al mostrar  go BPBA", e);
			mapa.put("errorMsg", "" + e.getMessage());
			mapa.putAll(getDatosComunes(request));

		}

		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	@RequestMapping(value = "/buscarSiniestroBPBA", method = RequestMethod.GET)
	public ModelAndView buscarSiniestroBPBA(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		logger.debug("Request Encoding : " + request.getCharacterEncoding());

		Map<String, Object> mapa = new HashMap<String, Object>();

		System.setProperty("file.encoding", "UTF-8");

		try {

			logger.debug("Mostrar Pantalla BPBA Siniestro Producto");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			mapa.put("funcionOnload", "inicioBusquedaBPBA()");
			
			mapa.put("sinResultados", "SI");
			mapa.put("tipoBuscador", "goBPBA");

			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(PANTALLA_BPBA_BUSQUEDA, mapa);

		} catch (Exception e) {

			logger.error(getUserLog(request) + "Exploto al mostrar  go BPBA", e);
			mapa.put("errorMsg", "" + e.getMessage());
			mapa.putAll(getDatosComunes(request));

		}

		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	
}
