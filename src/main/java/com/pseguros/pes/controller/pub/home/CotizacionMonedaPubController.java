package com.pseguros.pes.controller.pub.home;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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

import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;

@Controller
public class CotizacionMonedaPubController extends AbstractPubController{
	private static final Logger logger = LoggerFactory.getLogger(CotizacionMonedaPubController.class);
	private static final String PANTALLA_COTI_MONEDA = "partials/pes/home/cotizacionMoneda/cotizacionMonedaHomeTemplate";


	@Autowired
	private ExecuteService executeService;
	
	@RequestMapping(value = "/cotizacionMoneda", method = RequestMethod.GET)
	public ModelAndView cotizacionMoneda(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla cotizacionMoneda");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
		//	agregarBreadcrumb(request, "Cotizaci&oacute;n Moneda");
			mapa.put("funcionOnload", "inicioCotizacionMonedaHome()");
			mapa.putAll(getDatosComunes(request));
			
			
			
			
			return new ModelAndView(PANTALLA_COTI_MONEDA, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeNid", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	
	
	
	@RequestMapping(value = "/datosCotizacionMoneda", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosCotizacionMoneda(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio cotizacion moneda");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			Map<String, Object> mapa = new HashMap<String, Object>() ;

			String desde = request.getParameter("fechaDesde");
			String hasta = request.getParameter("fechaHasta");
			String moneda = request.getParameter("moneda");
			return datosCotizacionMoneda(desde,hasta,moneda,getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los movimientos de la Poliza", e);
		}

		return "No se pudo realizar la conversion";
	}


	
	public Object datosCotizacionMoneda(String desde,String hasta,String moneda ,EnvironmentType environment, String user) throws Exception {

		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NU_MONEDA","moneda");
		xx.put("P_FECHA_DESDE","desde");
		xx.put("P_FECHA_HASTA","hasta");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("moneda",moneda);
		parametrosIn.put("desde",desde);
		parametrosIn.put("hasta",hasta);
		parametrosIn.put("origen","go");	
		parametrosIn.put("user",user);
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean("PKG_PUB_COBRANZAS","PUB_CONSULTA_TASAS"), parametrosIn, xx, "PUB_CONSULTA_TASAS", new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;
	}
	
	
	
}
