package com.pseguros.pes.controller.pub.entidades;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
import com.pseguros.pes.service.entidades.CobranzaService;

@Controller
public class CobranzaPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(CobranzaPubController.class);
	
	private static final String PANTALLA_DIRECCIONES_COBRANZA = "partials/pes/entidades/poliza/cobranza/cobranzaHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	@Autowired
	private CobranzaService cobranzaService;

	@RequestMapping(value = "/homeCobranza", method = RequestMethod.GET)
	public ModelAndView homeCobranzaPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			logger.debug("Mostrar Pantalla homeCobranza");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza=request.getParameter("poliza");
			String ramo=request.getParameter("ramo");
			String certificado=request.getParameter("certificado");
			String sucursal=request.getParameter("sucursal");
			
			
			agregarBreadcrumb(request, "Cobranzas #" + poliza);
			Future<ArrayList> datosPoliza =cobranzaService.getPolizaCobranza(ramo, poliza,sucursal, getEntorno(request), getUser(request));
			Future<ArrayList> datosImputaciones =cobranzaService.getImputaciones(ramo, poliza,certificado, sucursal,getEntorno(request), getUser(request));
			Future<ArrayList> datosConsolidados = cobranzaService.getCoutasConsolidadas(ramo, poliza,certificado,sucursal, getEntorno(request), getUser(request));
			while (!(datosPoliza.isDone() && datosImputaciones.isDone() && datosConsolidados.isDone() )) {
				Thread.sleep(5);
			}
			
			mapa.put("funcionOnload","inicioCobranzaHome()");
			mapa.put("valorCobranzaCertificado", certificado);
			mapa.putAll(getDatosComunes(request));
			mapa.put("polizaDato", datosPoliza.get());
		
			ArrayList preliquidaciones = datosImputaciones.get();
			
			Collections.sort(preliquidaciones, new Comparator() {
				public int compare(Object p1, Object p2) {
					return new Integer(((HashMap<String, String>) p1).get("P_TF_IMPUTACION.CJIP_CALI_NU_PRELIQUIDACION")).compareTo(new Integer(((HashMap<String, String>) p2).get("P_TF_IMPUTACION.CJIP_CALI_NU_PRELIQUIDACION")));
				}
			});
			
			mapa.put("clienteImputaciones", preliquidaciones);
			mapa.put("clienteCuotas",datosConsolidados.get());
			mapa.put("scriptCustom","<script src=\"/PSPES/resources/js/bootstrap/bootstrap.min.js\"></script>");

			
			

			return new ModelAndView(PANTALLA_DIRECCIONES_COBRANZA, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCobranza", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	//Panel D que se carga por json	
	@RequestMapping(value = "/detalleCuotas", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosdetalleCuotas(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el panel d con json");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String fechaFiltro=request.getParameter("fecha");
			String certificado=request.getParameter("certificado");
			String sucursal=request.getParameter("sucursal");
			
			return cobranzaService.getDetalleCuotas(poliza, ramo,fechaFiltro,certificado,sucursal, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos del detalle de las cuotas", e);
		}

		return "No posee un detalle de la cuota consolidada";
	}
	/*********************************************************************************************************************************************************
	************************************************ MODAL IMPUTACIONES DETALLE **********************************************************************************************************
		******************************************************************************************************************************************************/

	@RequestMapping(value = "/datosImputaciones", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosImputaciones(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal imputaciones");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String certificado = request.getParameter("certificado");
			String sucursal=request.getParameter("sucursal");

			

			return cobranzaService.getImputacionesCobranza(poliza,ramo,certificado,sucursal, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las datos de imputaciones", e);
		}

		return "No se encontraron movimientos de la poliza";
	}



	/*********************************************************************************************************************************************************
	************************************************ MODAL PRODUCTOR  **********************************************************************************************************
		******************************************************************************************************************************************************/

	@RequestMapping(value = "/datosProductor", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosProductor(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal productor");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String productor = request.getParameter("productor");


		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos de productor", e);
		}

		return "No se encontraron movimientos de la poliza";
	}

	
	
	
}
	
