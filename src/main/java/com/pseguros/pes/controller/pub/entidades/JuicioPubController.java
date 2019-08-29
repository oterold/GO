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
import com.pseguros.pes.service.entidades.JuicioService;

@Controller
public class JuicioPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(CobranzaPubController.class);
	
	private static final String PANTALLA_DIRECCIONES_COBRANZA = "partials/pes/entidades/siniestro/juicios/juiciosHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	@Autowired
	private JuicioService juicioService;

	@RequestMapping(value = "/homeJuicios", method = RequestMethod.GET)
	public ModelAndView homeJuicios(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeSiniestro");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String siniestro=request.getParameter("nroSiniestro");
			String ramo=request.getParameter("ramo");
			String annio = request.getParameter("annio");
			Future<ArrayList> datosSiniestro = juicioService.getSiniestroDatos(siniestro,ramo,annio,getEntorno(request), getUser(request));
			Future<ArrayList> datosListaJuicios = juicioService.getJuiciosDatos(siniestro, ramo, annio,getEntorno(request), getUser(request));

			agregarBreadcrumb(request, "Juicio #" + siniestro);
			
			while (!(datosSiniestro.isDone() && datosSiniestro.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.put("datoSiniestro",datosSiniestro.get());
			mapa.put("datoListaJuicios",datosListaJuicios.get());
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload","inicioJuicioHome()");

			return new ModelAndView(PANTALLA_DIRECCIONES_COBRANZA, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeFacturacion", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	//------------------------------------ pantalla JSON del juicio panel D ---------------------------- //
		@RequestMapping(value = "/datosDetalleJuicio", method = RequestMethod.GET)
		public @ResponseBody
		Object getDatosDetalleJuicio(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				logger.debug("inicio el metodo");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String juicio = request.getParameter("juicio");

				return juicioService.getDetalleJuicio(juicio, getEntorno(request), getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar los Juicios error 123111", e);
			}

			return "No se encontro un detalle del juicio";
		}
		
	
		
		
		//------------------------------------ pantalla JSON del sentencias panel C ---------------------------- //
		@RequestMapping(value = "/datosSentenciasJuicio", method = RequestMethod.GET)
		public @ResponseBody
		Object getDatosSentenciasJuicio(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				logger.debug("inicio el metodo");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String juicio = request.getParameter("juicio");
				String ramo = request.getParameter("ramo");
				String annio = request.getParameter("annio");
				return juicioService.getSentencia(juicio, ramo, annio, getEntorno(request), getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar las sentencias error 1232131", e);
			}

			return "No se encontraron sentencias / transacciones del juicio";
		}
		
		
		
		
		//------------------------------------ pantalla JSON cuand se carga el modal de NOTAS ---------------------------- //
		@RequestMapping(value = "/datosNotasModalJuicio", method = RequestMethod.GET)
		public @ResponseBody
		Object getDatosNotasModalJuicio(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				logger.debug("inicio el modal juicio");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String juicio = request.getParameter("juicio");

				return juicioService.getNotasJuicio(juicio, getEntorno(request), getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar las notas codigo de error :505450", e);
			}

			return "El juicio no posee notas";
		}
		

		
		//------------------------------------ pantalla JSON datos param ---------------------------- //
		@RequestMapping(value = "/datosParametricosJuicio", method = RequestMethod.GET)
		public @ResponseBody
		Object getDatosParametricosJuicio(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				logger.debug("inicio el modal juicio");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String juicio = request.getParameter("juicio");
				String orden = request.getParameter("orden");

				return juicioService.getdatosParametricosJuicio(juicio,orden, getEntorno(request), getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar las notas codigo de error :50545750", e);
			}

			return "El juicio no datos ";
		}
		
		//------------------------------------ pantalla JSON datos parametricos este ---------------------------- //
		@RequestMapping(value = "/datosParametricos", method = RequestMethod.GET)
		public @ResponseBody
		Object getDatosParametricos(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				logger.debug("inicio el modal juicio");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String juicio = request.getParameter("juicio");

				return juicioService.getDatosParametricos(juicio);

			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar las notas codigo de error :501545750", e);
			}

			return "El juicio no posee datos parametricos";
		}
		
		
		
		//------------------------------------ pantalla modal embargos ---------------------------- //
		@RequestMapping(value = "/datosEmbargos", method = RequestMethod.GET)
		public @ResponseBody
		Object getDatosEmbargos(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				logger.debug("inicio el modal embargos");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String juicio = request.getParameter("juicio");

				return juicioService.getDatosEmbargos(juicio);

			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar los embargos codigo de error :50980", e);
			}

			return "El juicio no posee embargos";
		}
		
		
		
}
