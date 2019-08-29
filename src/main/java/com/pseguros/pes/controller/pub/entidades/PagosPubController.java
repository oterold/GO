package com.pseguros.pes.controller.pub.entidades;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.PagoService;


@Controller
public class PagosPubController  extends AbstractPubController {

	
	private static final Logger logger = LoggerFactory.getLogger(PagosPubController.class);
	private static final String PANTALLA_HOME_PAGOS= "partials/pes/entidades/pagos/pagoHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	@Autowired
	private PagoService pagoService;
	
	
	@RequestMapping(value = "/homePagos1", method = RequestMethod.GET)
	public ModelAndView homePagos(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {
			logger.debug("Mostrar Pantalla homePago");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String siniestro = request.getParameter("nroSiniestro");
			String ramo = request.getParameter("ramo");
			String subSiniestro = request.getParameter("subSiniestro");
			String annio = request.getParameter("annio");
			
			Future<ArrayList> datosSiniestro = pagoService.getSiniestroDatos(siniestro,ramo,annio,getEntorno(request), getUser(request));

			agregarBreadcrumb(request, "Pago #" + siniestro);
			
			while (!(datosSiniestro.isDone())) {
				Thread.sleep(5);
			}
			mapa.put("subSiniestroNumero",subSiniestro);
			mapa.put("datoSiniestro",datosSiniestro.get());
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload","inicioJuicioHome()");

			return new ModelAndView(PANTALLA_HOME_PAGOS, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeFacturacion", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		
		return new ModelAndView(PANTALLA_ERROR, mapa);
		
	}
	
	
	
	
	//------------------------------------ pantalla JSON cronograma ---------------------------- //
	@RequestMapping(value = "/datosCronograma", method = RequestMethod.GET)
	public @ResponseBody Object getDatosCronograma(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal cronograma");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String compromiso = request.getParameter("compromiso");

			return pagoService.getCronograma(compromiso, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el cronograma codigo de error :51240", e);
		}

		return "El pago no posee un cronograma";
	}
	
	
	
	
}

