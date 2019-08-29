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
import com.pseguros.pes.service.entidades.ComisionesService;

@Controller
public class ComisionesPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(ComisionesPubController.class);
	
	private static final String PANTALLA_DIRECCIONES_COMISIONES = "partials/pes/entidades/poliza/comisiones/comisionesHomeTemplate";

	@Autowired
	private ExecuteService executeSprivate;
	@Autowired
	private ComisionesService comisionesService;

	@RequestMapping(value = "/homeComisiones", method = RequestMethod.GET)
	public ModelAndView homeComisionesPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeComisiones");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String certificado = request.getParameter("certificado");
			String sucursal = request.getParameter("sucursal");
			
			
			
			agregarBreadcrumb(request, "Comisiones #" + poliza);
			mapa.putAll(getDatosComunes(request));
			Future<ArrayList> datosPolizaComi =comisionesService.getPolizaComisiones(ramo, poliza, sucursal,getEntorno(request), getUser(request));
			Future<ArrayList> datosComiPeriodo =comisionesService.getPolizaComisionesPeriodo(ramo, poliza,certificado, sucursal,getEntorno(request), getUser(request));

			while (!(datosPolizaComi.isDone() && datosComiPeriodo.isDone())) {
				Thread.sleep(5);
			}

			mapa.put("certificadoPolizaComi",certificado);
			mapa.put("funcionOnload","inicioComisionHome()");
			mapa.put("comiDetalle",datosComiPeriodo.get());
			mapa.put("polizaDato",datosPolizaComi.get());


			return new ModelAndView(PANTALLA_DIRECCIONES_COMISIONES, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeComisiones", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	//------------------------------------ pantalla D JSON  ---------------------------- //
			@RequestMapping(value = "/datosComidev", method = RequestMethod.GET)
			public @ResponseBody
			Object getDatosComidev(HttpSession session, HttpServletRequest request) throws Exception {
				try {
					logger.debug("inicio el metodo");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

					String poliza = request.getParameter("poliza");
					String ramo = request.getParameter("ramo");
					String certificado = request.getParameter("certificado");
					String periodo = request.getParameter("periodo");
					String sucursal = request.getParameter("sucursal");

					return comisionesService.getComiDevengadas(poliza, ramo, certificado, periodo,sucursal,getEntorno(request), getUser(request));

				} catch (Exception e) {
					logger.error(getUserLog(request)+"Exploto al mostrar las comieiones devengadas de la Poliza", e);
				}

				return "No se encontraron comisiones devengadas";
			}
			
			//------------------------------------ pantalla C JSON  ---------------------------- //
			@RequestMapping(value = "/datosComiLib", method = RequestMethod.GET)
			public @ResponseBody
			Object getDatosComiLib(HttpSession session, HttpServletRequest request) throws Exception {
				try {
					logger.debug("inicio el metodo");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

					String poliza = request.getParameter("poliza");
					String ramo = request.getParameter("ramo");
					String certificado = request.getParameter("certificado");
					String periodo = request.getParameter("periodo");
					String sucursal = request.getParameter("sucursal");

					return comisionesService.getComiLib(poliza, ramo, certificado, periodo,sucursal,getEntorno(request), getUser(request));

				} catch (Exception e) {
					logger.error(getUserLog(request)+"Exploto al mostrar las comisiones liberadas de la Poliza", e);
				}

				return "No se encontraron comisiones liberadas";
			}



}
