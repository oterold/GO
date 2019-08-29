package com.pseguros.pes.controller.bpbaSiniestro;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
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
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.bean.EstadoFiltroPantalla;
import com.pseguros.pes.bean.ResultadoBusquedaEntidad;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.controller.pub.busqueda.BusquedaPubController;
import com.pseguros.pes.dto.ClienteDTO;
import com.pseguros.pes.dto.CotizacionDTO;
import com.pseguros.pes.dto.NidDTO;
import com.pseguros.pes.dto.PolizaDTO;
import com.pseguros.pes.dto.ProductorDTO;
import com.pseguros.pes.dto.SiniestroDTO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorClienteService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorCotizacionService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorNidService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorPolizaService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorProductorService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorSiniestroService;
import com.pseguros.pes.util.pantalla.UtilPantalla;

@Controller
public class HomeBPBASiniestro extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(HomeBPBASiniestro.class);

	private static final String PANTALLA_BPBA_SINIESTRO_PRODUCTO = "partials/pes/bpba/siniestro/siniestroProducto/siniestroProductoTemplate";
	private static final String PANTALLA_BPBA_SINIESTRO_ASEGURADO = "partials/pes/bpba/siniestro/siniestroAsegurado/siniestroAseguradoTemplate";
	private static final String PANTALLA_BPBA_SINIESTRO_DEUDA_ASEGURADA = "partials/pes/bpba/siniestro/siniestroDeudaAsegurada/siniestroDeudaAseguradaTemplate";
	private static final String PANTALLA_BPBA_SINIESTRO_FALLECIMIENTO = "partials/pes/bpba/siniestro/siniestroFallecimiento/siniestroFallecimientoTemplate";
	private static final String PANTALLA_BPBA_SINIESTRO_PAGO = "partials/pes/bpba/siniestro/siniestroPago/siniestroPagoTemplate";
	private static final String PANTALLA_BPBA_SINIESTRO_FINALIZACION = "partials/pes/bpba/siniestro/siniestroFinalizacion/siniestroFinalizacionTemplate";

	
	private static final String PANTALLA_ERROR = "partials/error/errorGeneralTemplate";

	@Autowired
	private ExecuteService executeService;

	/*
	 * Se muestra la pantalla de bpba siniestro
	 */
	@RequestMapping(value = "/bpbaSiniestroProducto", method = RequestMethod.GET)
	public ModelAndView siniestroProducto(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		logger.debug("Request Encoding : " + request.getCharacterEncoding());

		Map<String, Object> mapa = new HashMap<String, Object>();

		System.setProperty("file.encoding", "UTF-8");

		try {

			logger.debug("Mostrar Pantalla BPBA Siniestro Producto");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			mapa.put("funcionOnload", "inicioSiniestroBPBA()");
			mapa.put("tipoBuscador", "siniestroBPBA");

			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(PANTALLA_BPBA_SINIESTRO_PRODUCTO, mapa);

		} catch (Exception e) {

			logger.error(getUserLog(request) + "Exploto al mostrar  siniestroProducto", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
			mapa.putAll(getDatosComunes(request));

		}

		return new ModelAndView(PANTALLA_ERROR, mapa);

	}

	@RequestMapping(value = "/bpbaSiniestroAsegurado", method = RequestMethod.GET)
	public ModelAndView bpbaSiniestroAsegurado(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		logger.debug("Request Encoding : " + request.getCharacterEncoding());

		Map<String, Object> mapa = new HashMap<String, Object>();

		System.setProperty("file.encoding", "UTF-8");
		
		try{

			logger.debug("Mostrar Pantalla BPBA Siniestro Asegurado");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioSiniestroBPBA()");
			mapa.put("tipoBuscador", "siniestroBPBA");


			return new ModelAndView(PANTALLA_BPBA_SINIESTRO_ASEGURADO, mapa);
			
		}catch(Exception e){

			logger.error(getUserLog(request) + "Exploto al mostrar la bpbaSiniestroAsegurado", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
			mapa.putAll(getDatosComunes(request));

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	@RequestMapping(value = "/bpbaSiniestroDeudaAsegurada", method = RequestMethod.GET)
	public ModelAndView bpbaSiniestroDeudaAsegurada(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		logger.debug("Request Encoding : " + request.getCharacterEncoding());

		Map<String, Object> mapa = new HashMap<String, Object>();

		System.setProperty("file.encoding", "UTF-8");
		
		try{

			logger.debug("Mostrar Pantalla BPBA Siniestro Deuda Asegurada");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioSiniestroBPBA()");
			mapa.put("tipoBuscador", "siniestroBPBA");


			return new ModelAndView(PANTALLA_BPBA_SINIESTRO_DEUDA_ASEGURADA, mapa);
			
		}catch(Exception e){

			logger.error(getUserLog(request) + "Exploto al mostrar la bpbaSiniestroDeudaAsegurada", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
			mapa.putAll(getDatosComunes(request));

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	@RequestMapping(value = "/bpbaSiniestroFallecimiento", method = RequestMethod.GET)
	public ModelAndView bpbaSiniestroFallecimiento(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		logger.debug("Request Encoding : " + request.getCharacterEncoding());

		Map<String, Object> mapa = new HashMap<String, Object>();

		System.setProperty("file.encoding", "UTF-8");
		
		try{

			logger.debug("Mostrar Pantalla BPBA Siniestro Asegurado");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioSiniestroBPBA()");
			mapa.put("tipoBuscador", "siniestroBPBA");


			return new ModelAndView(PANTALLA_BPBA_SINIESTRO_FALLECIMIENTO, mapa);
			
		}catch(Exception e){

			logger.error(getUserLog(request) + "Exploto al mostrar la bpbaSiniestroFallecimiento", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
			mapa.putAll(getDatosComunes(request));

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	@RequestMapping(value = "/bpbaSiniestroPago", method = RequestMethod.GET)
	public ModelAndView bpbaSiniestroPago(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		logger.debug("Request Encoding : " + request.getCharacterEncoding());

		Map<String, Object> mapa = new HashMap<String, Object>();

		System.setProperty("file.encoding", "UTF-8");
		
		try{

			logger.debug("Mostrar Pantalla BPBA Siniestro Pago");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioSiniestroBPBA()");
			mapa.put("tipoBuscador", "siniestroBPBA");


			return new ModelAndView(PANTALLA_BPBA_SINIESTRO_PAGO, mapa);
			
		}catch(Exception e){

			logger.error(getUserLog(request) + "Exploto al mostrar la bpbaSiniestroPago", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
			mapa.putAll(getDatosComunes(request));

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	@RequestMapping(value = "/bpbaSiniestroFinalizacion", method = RequestMethod.GET)
	public ModelAndView bpbaSiniestroFinalizacion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		logger.debug("Request Encoding : " + request.getCharacterEncoding());

		Map<String, Object> mapa = new HashMap<String, Object>();

		System.setProperty("file.encoding", "UTF-8");
		
		try{

			logger.debug("Mostrar Pantalla BPBA Siniestro Pago");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioSiniestroBPBA()");
			mapa.put("tipoBuscador", "siniestroBPBA");


			return new ModelAndView(PANTALLA_BPBA_SINIESTRO_FINALIZACION, mapa);
			
		}catch(Exception e){

			logger.error(getUserLog(request) + "Exploto al mostrar la bpbaSiniestroPago", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
			mapa.putAll(getDatosComunes(request));

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}

}