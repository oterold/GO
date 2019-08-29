package com.pseguros.pes.controller.pub.entidades;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.omg.CORBA.PRIVATE_MEMBER;
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
import com.pseguros.pes.service.entidades.ProductorService;

@Controller
public class ProductorPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(ProductorPubController.class);
	private static final String PANTALLA_HOME_PRODUCTOR = "partials/pes/entidades/productor/productorHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	@Autowired
	private ProductorService productorService;
	
	
	@RequestMapping(value = "/homeProductor", method = RequestMethod.GET)
	public ModelAndView homeProductor(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		
		try {

			logger.debug("Mostrar Pantalla homeProductor");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String codProductor = request.getParameter("codProductor");

			Future<List> datosProductor =productorService.getProductor(codProductor, getEntorno(request), getUser(request));
			Future<ArrayList> datosCarteraProductor =productorService.getCarteraProductor(codProductor, getEntorno(request), getUser(request));
			Future<ArrayList> datosPagosRechazados = productorService.getPagosRechazados(codProductor, getEntorno(request), getUser(request));
			
			agregarBreadcrumb(request, "Productor #" + codProductor);
			
			while (!(datosProductor.isDone() && datosCarteraProductor.isDone() && datosPagosRechazados.isDone())) {
				Thread.sleep(5);
			}

			mapa.put("tienePermiso", "no");

			ArrayList<String> usuarios = new ArrayList<String>();
			usuarios.add("puentel");
			usuarios.add("llacuaj");
			usuarios.add("grisaym");
			usuarios.add("molinarif");
			usuarios.add("gialurisa");
			usuarios.add("fiandesioa");
			usuarios.add("garijos");
			usuarios.add("fieirasj");
			usuarios.add("guzmanj");
			
			for (Iterator iterator = usuarios.iterator(); iterator.hasNext();) {
				String dato = (String) iterator.next();
				if(dato.trim().equals(getUser(request).trim()))
					mapa.put("tienePermiso","SI");
			}
			
			mapa.put("productorDato",datosProductor.get());
			mapa.put("productorCarteraDato",datosCarteraProductor.get());
			mapa.put("productorPagosRechazados",datosPagosRechazados.get());
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload","inicioProductorHome();");

		
			
			return new ModelAndView(PANTALLA_HOME_PRODUCTOR, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeProductor", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	//------------------------------------ pantalla JSON del productor panel C ---------------------------- //
	@RequestMapping(value = "/polizasRechazadas", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatospolizasRechazadas(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor = request.getParameter("productor");
			String ramo = request.getParameter("ramo");

			return productorService.getPolizasRechazadasJson(productor, ramo, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las polizas rechazadas", e);
		}

		return "No se encontraron Pagos Rechazados para el ramo seleccionado";
	}

	//------------------------------------ pantalla JSON del productor panel D ---------------------------- //
	@RequestMapping(value = "/polizasProductor", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosPolizasProductor(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor = request.getParameter("productor");

			return productorService.getPolizasProductor(productor, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datosPoliza", e);
		}

		return "No se encontraron Polizas del Productor";
	}
	
	//Llamada a este metodo siemre que se quiere mostara un modal con los datos del cliente
	@RequestMapping(value = "/datosProductorModal", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosProductor(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal productores");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor = request.getParameter("productor");

			return productorService.getModalProductor(productor, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el productor, con el error", e);
		}

		return "No se encontraron productor";
	}

	
	//------------------------------------ pantalla JSON del productor panel C MODAL ---------------------------- //
	@RequestMapping(value = "/polizasRechazadasModal", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatospolizasRechazadasModal(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor = request.getParameter("productor");
			String ramo = request.getParameter("ramo");

			return productorService.getPolizasRechazadasJson(productor, ramo, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las polizas rechazadas", e);
		}

		return "No se encontraron Pagos Rechazados para el ramo seleccionado";
	}
	
	@RequestMapping(value = "/datosImpositivos", method = RequestMethod.GET)
	public @ResponseBody Object getDatosImpositivos(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor= request.getParameter("productor");

			List datosImpositivos = productorService.getImpositivosProductor(productor, getEntorno(request), getUser(request));
			
			return datosImpositivos;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los impositivos de productor", e);

		}
		
		return "No se encontro impositivos de productor";

	}
	
	@RequestMapping(value = "/datosEsquema", method = RequestMethod.GET)
	public @ResponseBody Object getDatosEsquema(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor= request.getParameter("productor");

			List datosEsquema = productorService.getEsquemaProductor(productor, getEntorno(request), getUser(request));
			
			return datosEsquema;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el esquema de productor", e);

		}
		
		return "No se encontro esquema de productor";

	}
	
	@RequestMapping(value = "/datosConvenio", method = RequestMethod.GET)
	public @ResponseBody Object getDatosConvenio(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor= request.getParameter("productor");

			List datosConvenio = productorService.getConvenioProductor(productor, getEntorno(request), getUser(request));
			
			return datosConvenio;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el convenio de productor", e);

		}
		
		return "No se encontro el convenio de productor";

	}
	
	@RequestMapping(value = "/datosIntervinientes", method = RequestMethod.GET)
	public @ResponseBody Object getDatosIntervinientes(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor= request.getParameter("productor");

			List datosIntervinientes = productorService.getIntervinientesProductor(productor, getEntorno(request), getUser(request));
			
			return datosIntervinientes;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los intervinientes de productor", e);

		}
		
		return "No se encontro intervinientes de productor";

	}
	
	@RequestMapping(value = "/datosFormaDePago", method = RequestMethod.GET)
	public @ResponseBody Object getDatosFormaDePago(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor= request.getParameter("productor");

			List datosFormaDePago = productorService.getFormaDePagoProductor(productor, getEntorno(request), getUser(request));
			
			return datosFormaDePago;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar la forma de pago de productor", e);

		}
		
		return "No se encontro la forma de pago de productor";

	}
	
	@RequestMapping(value = "/datosOSSEG", method = RequestMethod.GET)
	public @ResponseBody Object getDatosOSSEG(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor= request.getParameter("productor");

			List datosFormaDePago = productorService.getOSSEGProductor(productor, getEntorno(request), getUser(request));
			
			return datosFormaDePago;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar OSSEG de productor", e);

		}
		
		return "No se encontro OSSEG de productor";

	}
	
	@RequestMapping(value = "/datosSSN", method = RequestMethod.GET)
	public @ResponseBody Object getDatosSSN(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor= request.getParameter("productor");

			List datosSSN = productorService.getSSNProductor(productor, getEntorno(request), getUser(request));
			
			return datosSSN;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar SSN de productor", e);

		}
		
		return "No se encontro SSN de productor";

	}
	
	@RequestMapping(value = "/datosInhabilitacionesSSN", method = RequestMethod.GET)
	public @ResponseBody Object getDatosInhabilitacionesSSN(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor= request.getParameter("productor");

			List datosInhabilitacionesSSN = productorService.getInhabilitacionesSSNProductor(productor, getEntorno(request), getUser(request));
			
			return datosInhabilitacionesSSN;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las inhabilitaciones SSN de productor", e);

		}
		
		return "No se encontro las inhabilitaciones SSN de productor";

	}
	
	@RequestMapping(value = "/datosHistoriaProductor", method = RequestMethod.GET)
	public @ResponseBody Object getDatosHistoriaProductor(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			Map<String, List> listaHistoria = new HashMap<String, List>();
			
			String productor= request.getParameter("productor");

			List datosHistoriaProductor = productorService.getHistoriaProductor(productor, "P",getEntorno(request), getUser(request));
			List datosHistoriaOrganizador = productorService.getHistoriaProductor(productor, "O",getEntorno(request), getUser(request));
			
			listaHistoria.put("productor", datosHistoriaProductor);
			listaHistoria.put("organizador", datosHistoriaOrganizador);
			
			return listaHistoria;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el historial de productor/organizador", e);

		}
		
		return "No se encontro el historial de productor/organizador";

	}
	
	@RequestMapping(value = "/datosChequesRechazados", method = RequestMethod.GET)
	public @ResponseBody Object getDatosChequesRechazadosProductor(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String productor= request.getParameter("productor");

			return productorService.getChequesRechazadosProductor(productor, getEntorno(request), getUser(request));
			

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los cheques rechazados de productor", e);

		}
		
		return "No se encontro cheques rechazados de productor";

	}
	
	@RequestMapping(value = "/datosMotivoBajaProductor", method = RequestMethod.GET)
	public @ResponseBody Object getDatosMotivoBajaProductor(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String productor= request.getParameter("productor");

			List datoMotivoBajaProductor = productorService.getMotivoBaja(productor, getEntorno(request), getUser(request));
			
			return datoMotivoBajaProductor;
			

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el motivo de baja de productor", e);

		}
		
		return "No se encontro el motivo de baja de productor";

	}
	
	@RequestMapping(value = "/datosEstadoHistoriaProductor", method = RequestMethod.GET)
	public @ResponseBody Object getDatosEstadoHistoriaProductor(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo: " + "getDatosEstadoHistoriaProductor");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String productor= request.getParameter("productor");

			List datosHistoriaProductor = productorService.getHistoriaProductor(productor, "P",getEntorno(request), getUser(request));
			
			return datosHistoriaProductor;
			

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el estado de la historia de productor", e);

		}
		
		return "No se encontro el estado de la historia de productor";

	}
	
	
	
	
	
	//modal contacto
	@RequestMapping(value = "/datosContactoProductor", method = RequestMethod.GET)
	public @ResponseBody Object getDatosContactoProductor(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String productor= request.getParameter("numPersona");
			String consecutivo= request.getParameter("consecutivo");
	
			return productorService.datosContactoProductor(productor,consecutivo,getEntorno(request), getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los contactos del prod", e);
			return "El productor no tiene contactos.";
		}
	
	}
	
	
}
