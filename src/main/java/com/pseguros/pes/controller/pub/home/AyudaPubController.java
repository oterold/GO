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
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
@Controller
public class AyudaPubController extends AbstractPubController{

	private static final Logger logger = LoggerFactory.getLogger(AyudaPubController.class);
	private static final String PANTALLA_HOME_AYUDA_GO = "partials/pes/home/ayuda/ayudaHomeTemplate";


	@Autowired
	private ExecuteService executeService;
	
	@RequestMapping(value = "/ayudaHome", method = RequestMethod.GET)
	public ModelAndView ayudaHome(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeAyuda");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioAyudaHome();");

			return new ModelAndView(PANTALLA_HOME_AYUDA_GO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeNid", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
}
