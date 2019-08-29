package com.pseguros.pes.controller;

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

import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.generic.WebAplicatioonConst;
import com.pseguros.pes.service.RectorService;

@Controller
public class RectorControler {
	
	private static final Logger logger = LoggerFactory.getLogger(RectorControler.class);

	private static final String RECTOR_LOGIN = "partials/pes/rector/login/loginRectorTemplate";

	@Autowired
	private  RectorService rectorService;
	
	@RequestMapping(value = "/rector", method = RequestMethod.GET)
	public ModelAndView rectorLogin(HttpSession session, HttpServletRequest request, Locale locale, Model model) {

		logger.debug("Ingreso a rector");
		EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
		Map<String, Object> mapa = new HashMap<String, Object>();
		
		
		String userURL = (String) request.getParameter("user");
		//Esto es simplemente para las pruebas
		if (userURL == null || userURL.length()==0) {
			userURL = "piccardoa";
		}
	
		mapa.put("usuario", userURL);
		mapa.put("urlRectorTestingContinente", getUrlRectorTestingContinente(userURL));
		mapa.put("urlRectorTestingIsla", getUrlRectorTestingIsla(userURL));
		mapa.put("urlRectorProduccionContinente", "");
		mapa.put("urlRectorProduccionIsla", "");
		
		
		
		return new ModelAndView(RECTOR_LOGIN, mapa);

	}
	
	private EnvironmentType getEntorno(HttpServletRequest request) {
		EnvironmentType entorno = (EnvironmentType) request.getSession().getAttribute("entorno");
		if (entorno == null) {
			request.getSession().setAttribute("entorno", WebAplicatioonConst.ENTORNO);
		}
		return entorno;
	}

	
	private Object getUrlRectorTestingIsla(String userURL) {
		try {
			
		String destino = "S";
		String origen = "92";
		
		String valorControl=rectorService.getValorControl(userURL,destino,origen);;
		return "http://bloas11.pseguros.com:7778/forms/frmservlet?config=RECTEST_10G&otherparams=usuario="+userURL+"+destino="+origen+"+validacion="+valorControl;
		
		} catch (Exception e) {
			logger.error("error", e);
			return "";
		}
	}

	private Object getUrlRectorTestingContinente(String userURL) {
		try {
			
		String destino = "S";
		String origen = "91";
		
		String valorControl=rectorService.getValorControl(userURL,destino,origen);;
		return "http://bloas11.pseguros.com:7778/forms/frmservlet?config=RECTEST_10G&otherparams=usuario="+userURL+"+destino="+origen+"+validacion="+valorControl;
		
		} catch (Exception e) {
			logger.error("error", e);
			return "";
		}
		
	}



}
