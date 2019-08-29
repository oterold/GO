package com.pseguros.pes.controller.pub.entidades;

import java.util.HashMap;
import java.util.List;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.DireccionService;

@Controller
public class DireccionesPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(DireccionesPubController.class);
	
	private static final String PANTALLA_DIRECCIONES_CERTIFICADO = "partials/pes/entidades/certificado/direcciones/direccionesHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	
	@Autowired
	private DireccionService direccionService;

	@RequestMapping(value = "/homeDireccionesPorCertificados", method = RequestMethod.GET)
	public ModelAndView homeDireccionesPorCertificados(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			logger.debug("Mostrar Pantalla homeDireccionesPorCertificados");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));

			String poliza = request.getParameter("poliza");

			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			String cerificado = "";

			mapa.put("direccionesDatos", direccionService.getDireccionesPoliza(ramo, poliza, sucursal, null, cerificado, getEntorno(request), getUser(request)));
			return new ModelAndView(PANTALLA_DIRECCIONES_CERTIFICADO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el cliente", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	/*------------------------------------------- panel C AJAX ---------------------------------- */
	@RequestMapping(value = "/datosContacto", method = RequestMethod.GET)
	public @ResponseBody Object getDatosEndoso(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo AJAX para cargar panel C");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String consecutivo = request.getParameter("consecutivo");
			String direccionConsecutivo = request.getParameter("direccionConsecutivo");
			String persona = request.getParameter("persona");
			return direccionService.getDirecciones(consecutivo, direccionConsecutivo, persona, getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos dle endoso",e);
		}
		
			return "La persona no posee una direcci&oacute;n declarada";
		}
	
	
       

	
	
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(value = "/obtenerContactoPorPoliza", method = RequestMethod.GET)
	public @ResponseBody Object obtenerContactoPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			
			logger.debug("Metodo obtenerContactoPorPoliza");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			String cliente = request.getParameter("cliente");
						
			List listadoDirecciones = direccionService.obtenerListadoDirecciones(ramo,poliza,sucursal,null,null,cliente, getEntorno(request), getUser(request));
			mapa.put("listadoDirecciones", listadoDirecciones);			
			
			return mapa;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto obtenerContactoPorPoliza", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return mapa;
	}
	
	@RequestMapping(value = "/obtenerContactoPorCliente", method = RequestMethod.GET)
	public @ResponseBody Object obtenerContactoPorCliente(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Metodo obtenerContactoPorCliente");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String cliente = request.getParameter("cliente");

			mapa.put("listadoDirecciones", direccionService.getListadoDirecciones(null,null,null,null,null,cliente, getEntorno(request), getUser(request)));
			
			return mapa;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto obtenerContactoPorCliente", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return mapa;

	}
	
}
