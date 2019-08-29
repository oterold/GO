package com.pseguros.pes.controller.pub.busqueda;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.bean.Breadcrumb;
import com.pseguros.pes.controller.pub.AbstractPubController;

@Controller
public class BreadcrumbPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(BreadcrumbPubController.class);

	@RequestMapping(value = "/breadcrumb/{id}", method = RequestMethod.GET)
	public ModelAndView breadcrumb(HttpServletRequest request, @PathVariable("id") int id) {

		try {

			logger.debug("Mostrar breadcrumb" + id);

			Breadcrumb dato = getBreadcrumb(request, id);
			eliminarBreadcrumb(request, id);

			return new ModelAndView("redirect:" + dato.getUrl());

		} catch (Exception e) {
			logger.error(getUserLog(request)+"error", e);
		}

		return new ModelAndView("redirect:" + "/go");

	}
	
	@RequestMapping(value = "/breadcrumbExperto/{id}", method = RequestMethod.GET)
	public ModelAndView breadcrumbExperto(HttpServletRequest request, @PathVariable("id") int id) {

		try {

			logger.debug("Mostrar breadcrumb" + id);

			Breadcrumb dato = getBreadcrumb(request, id);
			eliminarBreadcrumb(request, id);

			return new ModelAndView("redirect:" + dato.getUrl());

		} catch (Exception e) {
			logger.error(getUserLog(request)+"error", e);
		}

		return new ModelAndView("redirect:" + "/goExperto");

	}
	

}
