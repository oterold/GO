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
import com.pseguros.pes.service.entidades.ReservaService;

@Controller
public class ReservaPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(ReservaPubController.class);
	
	private static final String PANTALLA_DIRECCIONES_RESERVAS = "partials/pes/entidades/siniestro/reserva/reservasHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	@Autowired
	private ReservaService reservaService;
	@RequestMapping(value = "/homeReservas", method = RequestMethod.GET)
	public ModelAndView homeReservas(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();


		try {
			logger.debug("Mostrar Pantalla homeSiniestro");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String siniestro=request.getParameter("nroSiniestro");
			String ramo=request.getParameter("ramo");
			String annio = request.getParameter("annio");
			String subSiniestro=request.getParameter("subSiniestro");
			
			Future<ArrayList> datosSiniestro = reservaService.getSiniestroDatos(siniestro,ramo,annio,getEntorno(request), getUser(request));
			Future<ArrayList> datosMovimientos = reservaService.getMovimientosDatos(siniestro, ramo, annio, getEntorno(request), getUser(request));
			Future<ArrayList> datosListaReserva = reservaService.getReservaLista(siniestro, ramo, annio,subSiniestro, getEntorno(request), getUser(request));
			agregarBreadcrumb(request, "Reserva #" + siniestro);
			
			while (!(datosSiniestro.isDone() && datosMovimientos.isDone() && datosListaReserva.isDone() )) {
				Thread.sleep(5);
			}
			
			mapa.put("datoSiniestro",datosSiniestro.get());
			mapa.put("datoMovimientos",datosMovimientos.get());
			mapa.put("datoListaReserva",datosListaReserva.get());
			mapa.put("subSiniestroNumero",subSiniestro);
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload","inicioPolizaHome()");
			mapa.put("scriptCustom","<script src=\"/PSPES/resources/js/bootstrap/bootstrap.min.js\"></script>");

			return new ModelAndView(PANTALLA_DIRECCIONES_RESERVAS, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeReservas", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	//------------------------------------ pantalla JSON cuand se carga el modal de MOVIMIENTOS ---------------------------- //
	@RequestMapping(value = "/datosMovimientoReservas", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosDetalleTercero(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal movimientos reservas");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String siniestro = request.getParameter("siniestro");
			String annio = request.getParameter("annio");
			String ramo = request.getParameter("ramo");

			return reservaService.getModalMovimiento(siniestro, ramo, annio, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Error 1568. Exploto al mostrar los movimientos", e);
		}

		return "El siniestro no posee movimientos";
	}

	//------------------------------------ pantalla JSON  panel D ---------------------------- //
	@RequestMapping(value = "/datosDetalleReservas", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosSentenciasJuicio(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String siniestro = request.getParameter("siniestro");
			String ramo = request.getParameter("ramo");
			String tercero = request.getParameter("tercero");
			String periodo = request.getParameter("periodo");
			String annio = request.getParameter("annio");
			String adju = request.getParameter("adju");
			String tipo = request.getParameter("tipo");
			
				
			return  reservaService.getDetalleReserva(siniestro, ramo, annio, tercero, periodo ,adju,tipo , getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las sentencias error 1232131", e);
		}

		return "No se encontro un detalle de la reserva";
	}
	
	
	
	
}
