package com.pseguros.pes.controller.pub.entidades;

import java.util.ArrayList;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.ClienteService;
import com.pseguros.pes.service.entidades.RemesaService;

@Controller
public class ClientePubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(ClientePubController.class);
	private static final String PANTALLA_HOME_CLIENTE = "partials/pes/entidades/cliente/clienteHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private RemesaService remesaService;

	@RequestMapping(value = "/homeCliente", method = RequestMethod.GET)
	public ModelAndView homeCliente(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla Cliente Home");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCliente = request.getParameter("nroCliente");

			agregarBreadcrumb(request, "Cliente #" + nroCliente);
			
			Future<List> datosCliente =clienteService.getCliente(nroCliente, getEntorno(request), getUser(request));
			Future<ArrayList> datosPolizas =clienteService.getPolizasCliente(nroCliente, getEntorno(request), getUser(request));
			Future<ArrayList> datossiniestros =clienteService.getSiniestroCliente(nroCliente, getEntorno(request), getUser(request));
			
			while (!(datosCliente.isDone() && datosPolizas.isDone() )) {
				Thread.sleep(5);
			}
			
			mapa.put("clienteDato",datosCliente.get() );
			mapa.put("clientePoliza", datosPolizas.get());
			
			
			int tiempoMaximo = 0;

			while (!(datossiniestros.isDone() || tiempoMaximo  > 2000 )) {
				Thread.sleep(5);
				tiempoMaximo++;
			}
			
			if (datossiniestros.get().size() < 40) {
				mapa.put("clienteSiniestro", datossiniestros.get());
				mapa.put("mostrarBotonDeBusquedaSiniestro", "NO");
			}else {
				mapa.put("clienteSiniestro", new ArrayList());
				mapa.put("mostrarBotonDeBusquedaSiniestro", "SI");
				
			}
			
			
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioClienteHome();");

			return new ModelAndView(PANTALLA_HOME_CLIENTE, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar el cliente", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);

	}

	/*
	 * ----------------------- invoca ajax cuando se selecciona el panel tipo B
	 * para llenar el panel D----------
	 */
	@RequestMapping(value = "/datosPoliza", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosEndoso(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");

			return clienteService.getPolizaCliente(ramo, poliza,sucursal,getEntorno(request),getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datosPoliza", e);
		}

		return "No se encontraron Polizas";
	}

	/*-------------------------------- Ajax que trae el panel c actualizado ----------------------------- */
	@RequestMapping(value = "/datosSiniestro", method = RequestMethod.GET)
	public @ResponseBody Object getDatosSiniestro(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo datosSiniestro");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String cliente = request.getParameter("cliente");
			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			
			return clienteService.getSiniestrosCliente(ramo, poliza, cliente,sucursal);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos dle endoso", e);
		}

		return "No se encontraron siniestros";
	}
	
//Llamada a este metodo siemre que se quiere mostara un modal con los datos del cliente
	
	@RequestMapping(value = "/datosCliente", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosCliente(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal clientes");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String cliente = request.getParameter("cliente");

			return clienteService.getModalCliente(cliente, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los movimientos de la Poliza", e);
		}

		return "No se encontraron clientes";
	}

	
	
	
	
}
