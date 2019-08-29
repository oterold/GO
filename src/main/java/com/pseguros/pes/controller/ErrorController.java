package com.pseguros.pes.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.controller.pub.entidades.PolizaPubController;

@Controller
public class ErrorController extends AbstractPubController{
 
	private static final Logger logger = LoggerFactory.getLogger(PolizaPubController.class);

	private static final String PANTALLA_ERROR = "partials/error/errorGeneralTemplate";
	
	  @RequestMapping(value = "errors", method = RequestMethod.GET)
	    public ModelAndView renderErrorPage(HttpServletRequest request) {
		  
		  logger.error(getUserLog(request)+ "Exploto realizar la consulta");

		  Map<String, Object> mapa = new HashMap<String, Object>() ;

		  mapa.put("errorMsg", "No se pudo realizar la consulta. Vuelva a intentar o informe a sistemas.");
			
		  return new ModelAndView(PANTALLA_ERROR, mapa);
	    }
	
}