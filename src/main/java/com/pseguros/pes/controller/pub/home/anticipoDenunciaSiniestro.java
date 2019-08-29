package com.pseguros.pes.controller.pub.home;

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
import com.pseguros.pes.controller.pub.entidades.CotiPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;


@Controller
public class anticipoDenunciaSiniestro extends AbstractPubController {
	private static final Logger logger = LoggerFactory.getLogger(CotiPubController.class);

	
	private static final String PANTALLA_ANTICIPO_SINIESTRO = "partials/pes/home/denunciaSiniestro/denunciaSiniestroHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	
	
	@RequestMapping(value = "/anticipoSiniestro", method = RequestMethod.GET)
	public ModelAndView homeCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			

			return new ModelAndView(PANTALLA_ANTICIPO_SINIESTRO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
}
