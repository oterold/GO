package com.pseguros.pes.controller.pub.home;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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
import com.pseguros.pes.controller.pub.entidades.CertificadoPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;

@Controller
public class HomePubController extends AbstractPubController{


	private static final Logger logger = LoggerFactory.getLogger(CertificadoPubController.class);
	private static final String PANTALLA_HOME_GO = "partials/pes/home/goHomeTemplate";
	private static final String PANTALLA_HOME_GO_MAS ="partials/pes/home/homeMas/goHomeMasTemplate";

	@Autowired
	private ExecuteService executeService;
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public ModelAndView homeCertificadoPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeNid");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			ArrayList usr = new ArrayList();
			usr.add("puentel");
			usr.add("grisaym");
			usr.add("pozzie");
			usr.add("fiandesion");
			usr.add("fiandesioa");
			usr.add("fiandesioc");
			usr.add("carthyg");
			usr.add("morol");
			usr.add("brunog");
			usr.add("llanose");
			usr.add("velazquezg");
			usr.add("gomezlc");
			usr.add("guzmanj");
			
			
			for (Iterator iterator = usr.iterator(); iterator.hasNext();) {
				Object object = (Object) iterator.next();
				if(object.toString().toLowerCase().trim().equals(getUser(request).toLowerCase().trim())){
					mapa.put("tienePermiso", true);
				}
			}
			
			return new ModelAndView(PANTALLA_HOME_GO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeNid", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	
	
	@RequestMapping(value = "/homeMas", method = RequestMethod.GET)
	public ModelAndView homeMas(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeNid");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			
			return new ModelAndView(PANTALLA_HOME_GO_MAS, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeNid", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	
	
	
	
}
