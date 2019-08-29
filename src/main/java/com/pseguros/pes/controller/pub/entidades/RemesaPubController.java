package com.pseguros.pes.controller.pub.entidades;

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
import com.pseguros.pes.service.entidades.ProductorService;
import com.pseguros.pes.service.entidades.RemesaService;

@Controller
public class RemesaPubController extends AbstractPubController{

	private static final Logger logger = LoggerFactory.getLogger(RemesaPubController.class);
	private static final String PANTALLA_HOME_REMESA = "partials/pes/entidades/remesa/remesaHomeTemplate";
	private static final String PANTALLA_HOME_DETALLE_REMESA_CLIENTE = "partials/pes/entidades/remesa/detalleRemesaHomeTemplate";
	private static final String PANTALLA_HOME_DETALLE_REMESA_PRODUCTOR = "partials/pes/entidades/remesa/detalleRemesaHomeTemplate";


	@Autowired
	private ExecuteService executeService;
	@Autowired
	private RemesaService remesaService;
	
	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private ProductorService productorService;

	@RequestMapping(value = "/homeRemesa", method = RequestMethod.GET)
	public ModelAndView homeRemesa(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
	
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		
		try {
			logger.debug("Mostrar Pantalla Remesa Home");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String remesa = request.getParameter("remesa");
			
			agregarBreadcrumb(request, "Remesa #" + remesa);
			
			mapa.putAll(getDatosComunes(request));
			
			mapa.put("funcionOnload","inicioRemesaHome()");
			mapa.put("valorNroRemesa", remesa);
			
			Future<List> datosRemesa = remesaService.getRemesaDatosGenerales( remesa, getUser(request), getEntorno(request));
			Future<List> datosDetalleRemesa = remesaService.getRemesaDetalle(remesa, getUser(request), getEntorno(request));
			Future<List> datosCancelacionesRemesa = remesaService.getRemesaCancelaciones(remesa, getUser(request), getEntorno(request));

			while (!(datosRemesa.isDone() && datosDetalleRemesa.isDone() && datosCancelacionesRemesa.isDone())) {
				Thread.sleep(5);
			}
			
			if (datosDetalleRemesa.get().size() > 50) {
				mapa.put("scriptCustom", "<script src=\"resources/js/bootstrap/bootstrap.min.js\"></script> <script src=\"resources/js/jquery-custom/jquery-ui-1.8.16.custom.min.js\"></script> <script src=\"resources/js/jquery-custom/jquery.event.drag-2.3.js\"></script> 	<script src=\"resources/js/jquery-custom/jquery-ui-1.8.16.custom.min.js\"></script>");
				mapa.put("scriptGrilla", "<script src=\"/PSPES/resources/js/slickGrid/slick.core.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.editors.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.grid.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.dataview.js\"></script>");
				//mapa.put("styleGrilla", "<link href=\"resources/css/slickGrid/slick.grid.css\"> <link href=\"resources/css/smoothness/jquery-ui-1.8.16.custom.css\">");
			}
			
			mapa.put("remesa", datosRemesa.get().get(0));
			mapa.put("detalleCobroRemesa", datosDetalleRemesa.get());
			mapa.put("cancelacionesRemesa", datosCancelacionesRemesa.get());

			return new ModelAndView(PANTALLA_HOME_REMESA, mapa);
		
		} catch (Exception e) {

			logger.error(getUserLog(request)+"Exploto al mostrar la remesa" , e);
			mapa.put("errorMsg", "" + e.getMessage());

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	

	@RequestMapping(value = "/detalleCancelacionRemesa", method = RequestMethod.GET)
	public @ResponseBody Object getdetalleCancelacionRemesa(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Inicio metodo detalleCancelacionRemesa");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroRemesa = request.getParameter("remesa");
			
			mapa.put("funcionOnload","");

			return remesaService.getRemesaDetalleCancelaciones(nroRemesa, getUser(request), getEntorno(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalle de cancelacion de remesa", e);
			return "" + e.getMessage();
		}

	}

	
	@RequestMapping(value = "/detalleCobroRemesa", method = RequestMethod.GET)
	public @ResponseBody Object getDetalleCobroRemesa(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Inicio metodo detalleCobroRemesa");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroRemesa = request.getParameter("remesa");
			
			mapa.put("funcionOnload","");

			return remesaService.getRemesaDetalleCobro(nroRemesa, getUser(request), getEntorno(request));

		} catch (Exception e) {
			logger.error(getUser(request)+"Exploto al mostrar los datos de cobros de remesa", e);
			return "" + e.getMessage();
		}

	}
	
	//Aca se mostrara el detalle de remesa por Cliente
	@RequestMapping(value = "/homeDetalleRemesaPorCliente", method = RequestMethod.GET)
	public ModelAndView homeDetalleRemesaPorCliente(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
	
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		
		try {
			logger.debug("Mostrar Pantalla Remesa Home Por Cliente");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCliente= request.getParameter("nroCliente");
			
			agregarBreadcrumb(request, "Detalle Remesa #" + nroCliente);
			
			mapa.putAll(getDatosComunes(request));
			
			mapa.put("funcionOnload","inicioRemesaHome()");
			
			Future<List> datosCliente = clienteService.getCliente(nroCliente, getEntorno(request), getUser(request));
			Future<Map> datosListaSaldo = remesaService.getListaSaldoRemesasCliente(nroCliente, "", getEntorno(request), getUser(request));
			
			while (!(datosCliente.isDone() && datosListaSaldo.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.put("clienteDato",datosCliente.get());
			mapa.put("remesasSaldo", datosListaSaldo.get().get("remesaSaldo1"));
			mapa.put("remesasSaldoE", datosListaSaldo.get().get("remesaSaldo2"));
			mapa.put("tipoDetalleRemesa","cliente");
			return new ModelAndView(PANTALLA_HOME_DETALLE_REMESA_CLIENTE, mapa);
		
		} catch (Exception e) {

			logger.error(getUser(request)+ "Exploto al mostrar el detalle de remesa cliente" , e);
			mapa.put("errorMsg", "" + e.getMessage());

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
		//Aca se mostrara el detalle de remesa por Productor
		@RequestMapping(value = "/homeDetalleRemesaPorProductor", method = RequestMethod.GET)
		public ModelAndView homeDetalleRemesaPorProductor(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
			Map<String, Object> mapa = new HashMap<String, Object>() ;
			
			try {
				logger.debug("Mostrar Pantalla Remesa Home Por Productor");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
				
				String nroProductor = request.getParameter("nroProductor");
				
				agregarBreadcrumb(request, "Detalle Remesa #" + nroProductor);
				
				mapa.putAll(getDatosComunes(request));
				
				mapa.put("funcionOnload","inicioRemesaHome()");
				
				Future<List> datosProductor = null;
				
				datosProductor =productorService.getProductor(nroProductor, getEntorno(request), getUser(request));
				Future<List> datosListaSaldo = remesaService.getListaSaldoRemesas("", nroProductor, getEntorno(request), getUser(request));
				
				while (!(datosProductor.isDone()&& datosListaSaldo.isDone())) {
					Thread.sleep(5);
				}
				
				mapa.put("productorDato",datosProductor.get());
				mapa.put("remesasSaldo", datosListaSaldo.get());

				mapa.put("tipoDetalleRemesa","productor");
				mapa.put("nroProductor",nroProductor);

				return new ModelAndView(PANTALLA_HOME_DETALLE_REMESA_PRODUCTOR, mapa);
			
			} catch (Exception e) {
				logger.error(getUser(request)+"Exploto al mostrar el detalle de remesa productor" , e);
				mapa.put("errorMsg", "" + e.getMessage());
			}
			
			return new ModelAndView(PANTALLA_ERROR, mapa);

		}
	
		@RequestMapping(value = "/detalleRemesa", method = RequestMethod.GET)
		public @ResponseBody Object getDetalleRemesa(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
			
			Map<String, Object> mapa = new HashMap<String, Object>() ;
			try {

				logger.debug("Inicio metodo detalleRemesa");

				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
				
				String nroRemesa = request.getParameter("remesa");
				

				Future<List> datosRemesa = remesaService.getRemesaDatosGenerales(nroRemesa, getUser(request), getEntorno(request));
				
				while (!(datosRemesa.isDone())) {
					Thread.sleep(5);
				}
				
				
				return datosRemesa.get();
			} catch (Exception e) {
				logger.error(getUser(request)+"Exploto al mostrar los datos del detalle de remesa", e);
				return "" + e.getMessage();
			}

		}
		
		@RequestMapping(value = "/detalleRemesaUnificada", method = RequestMethod.GET)
		public @ResponseBody Object getDetalleRemesaUnificada(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
			
			Map<String, Object> mapa = new HashMap<String, Object>() ;
			try {

				logger.debug("Inicio metodo detalleRemesaUnificada");

				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
				
				String nroComprobante = request.getParameter("comprobante");
				

				List datosRemesaUnificada = remesaService.getRemesaUnificada(nroComprobante, getUser(request), getEntorno(request));
				
				return datosRemesaUnificada;
			} catch (Exception e) {
				logger.error(getUser(request)+"Exploto al mostrar los datos de la remesa unificada", e);
			}
			
			return "No existe datos de remesa unificada";

		}
		
		
		@RequestMapping(value = "/existeDetalleRemesaCliente", method = RequestMethod.GET)
		public @ResponseBody Object getExisteDetalleRemesaCliente(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
			try {
				logger.debug("inicio el metodo");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String nroCliente= request.getParameter("nroCliente");

				Future<Map> datosListaSaldo = remesaService.getListaSaldoRemesasCliente(nroCliente, "", getEntorno(request), getUser(request));
				
				while (!(datosListaSaldo.isDone())) {
					Thread.sleep(5);
				}
				
				return datosListaSaldo.get();

			} catch (Exception e) {
				logger.error(getUser(request)+"Exploto al verificar existencia del detalle de remesa cliente", e);

			}
			
			return "No se encontro detalle de remesas";

		}
		
		@RequestMapping(value = "/existeDetalleRemesaProductor", method = RequestMethod.GET)
		public @ResponseBody Object getExisteDetalleRemesaProductor(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
			try {
				logger.debug("inicio el metodo");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String nroProductor= request.getParameter("nroProductor");

				Future<List> datosListaSaldo = remesaService.getListaSaldoRemesas("", nroProductor, getEntorno(request), getUser(request));
				
				while(!(datosListaSaldo.isDone())){
					Thread.sleep(5);
				}
				
				return datosListaSaldo.get();

			} catch (Exception e) {
				logger.error(getUser(request)+"Exploto al verificar existencia del detalle de remesa productor", e);

			}
			
			return "No se encontro detalle de remesas";

		}
	
}
