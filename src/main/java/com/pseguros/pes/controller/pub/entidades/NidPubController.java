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
import com.pseguros.pes.service.entidades.NidService;
@Controller
public class NidPubController extends AbstractPubController{

	private static final Logger logger = LoggerFactory.getLogger(CertificadoPubController.class);
	private static final String PANTALLA_DIRECCIONES_NID = "partials/pes/entidades/nid/nidHomeTemplate";


	@Autowired
	private ExecuteService executeService;
	@Autowired
	private NidService nidService;

	
	@RequestMapping(value = "/homeNid", method = RequestMethod.GET)
	public ModelAndView homeCertificadoPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeNid");	
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String nid=request.getParameter("nid");
			Future<ArrayList> datosNid = nidService.getNidDatos(nid, getEntorno(request), getUser(request));
			Future<ArrayList> datosHistorialNid = nidService.getNidListaDetalle(nid, getEntorno(request), getUser(request));
			Future<ArrayList> datosNidVinculados = nidService.getNidVinculados(nid, getEntorno(request), getUser(request));

			agregarBreadcrumb(request, "Nid #" + nid);
			
			while (!(datosNid.isDone() && datosHistorialNid.isDone() && datosNidVinculados.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.put("datoNid",datosNid.get());
			mapa.put("datoHistorialNid",datosHistorialNid.get());
			mapa.put("datosNidVinculados",datosNidVinculados.get());

			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload","inicioPolizaHome()");

			return new ModelAndView(PANTALLA_DIRECCIONES_NID, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeNid", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}


	
	//------------------------------------ pantalla JSON detalle panel D ---------------------------- //
	@RequestMapping(value = "/datosDetalleNid", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosSentenciasJuicio(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo datosDetalleNid");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String nid = request.getParameter("nid");
			String orden = request.getParameter("orden");
			return nidService.getDetalleOrden(nid, orden);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles nid", e);
		}

		return "El nid seleccionado no posee un detalle.";
	}
	
}
