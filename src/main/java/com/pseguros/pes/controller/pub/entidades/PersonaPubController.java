package com.pseguros.pes.controller.pub.entidades;

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

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;

@Controller
public class PersonaPubController  extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(ClientePubController.class);
	private static final String PANTALLA_HOME_PERSONA = "partials/pes/entidades/persona/personaHomeTemplate";

	private static final String PANTALLA_ERROR = "";

	
	
	@RequestMapping(value = "/homePersona", method = RequestMethod.GET)
	public ModelAndView homeCliente(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		
		try {

			logger.debug("Mostrar Pantalla homePersona");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza="1";
			agregarBreadcrumb(request, "Persona #" + poliza);
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload","inicioPolizaHome()");


			return new ModelAndView(PANTALLA_HOME_PERSONA, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homePersona", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg",""+e.getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	
}
