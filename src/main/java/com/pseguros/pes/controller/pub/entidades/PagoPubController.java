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
public class PagoPubController  extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(ClientePubController.class);
	private static final String PANTALLA_HOME_PAGO = "partials/pes/entidades/siniestro/pagos/pagosHomeTemplate";
	@Autowired
	private ExecuteService executeService;
	@Autowired
	private PagoService pagoService;

	
	@RequestMapping(value = "/homePagos", method = RequestMethod.GET)
	public ModelAndView homePagos(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		
		try {
			logger.debug("Mostrar Pantalla homePagos");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String siniestro=request.getParameter("nroSiniestro");
			String ramo=request.getParameter("ramo");
			String subSiniestro = request.getParameter("subSiniestro");
			
			String annio = request.getParameter("annio");
			
			Future<ArrayList> datosSiniestro = pagoService.getSiniestroDatos(siniestro,ramo,annio,getEntorno(request), getUser(request));
			Future<ArrayList> datosListaPagos = pagoService.getListaPagos(siniestro, ramo, subSiniestro, annio, getEntorno(request), getUser(request));

			agregarBreadcrumb(request, "Pago #" + siniestro);
			
			while (!(datosSiniestro.isDone() && datosListaPagos.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.put("datoSiniestro",datosSiniestro.get());
			mapa.put("datoListaPagos",datosListaPagos.get());
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload","inicioPagoHome()");
			mapa.put("subSiniestroNumero",subSiniestro);
			
			return new ModelAndView(PANTALLA_HOME_PAGO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homePagos", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	//------------------------------------ pantalla JSON detalle panel D ---------------------------- //
	@RequestMapping(value = "/datosListaPagos", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosListaPagos(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo del panel D pagos");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String compromiso = request.getParameter("compromiso");
			return pagoService.getDetallePago(compromiso, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalle de lista de pagos", e);
		}

		return "No se encontraron detalles del pago";
	}
	
	

	
	//------------------------------------ pantalla JSON detalle panel C ---------------------------- //
	@RequestMapping(value = "/datosConceptos", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosConceptos(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo del panel C pagos");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String compromiso = request.getParameter("compromiso");
			return pagoService.getConceptos(compromiso, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el concepto error 122451", e);
		}

		return "No se encontraron conceptos";
	}
	
	
}
