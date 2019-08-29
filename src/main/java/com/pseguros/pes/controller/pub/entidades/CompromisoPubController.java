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
import com.pseguros.pes.service.entidades.CompromisoService;


@Controller
public class CompromisoPubController extends AbstractPubController {
	
private static final Logger logger = LoggerFactory.getLogger(CobranzaPubController.class);
	
	private static final String PANTALLA_DIRECCIONES_COMPROMISO = "partials/pes/entidades/compromiso/compromisoHomeTemplate";
	@Autowired
	private ExecuteService executeService;
	@Autowired
	private CompromisoService compromisoService;
	
	
	@RequestMapping(value = "/homeCompromiso", method = RequestMethod.GET)
	public ModelAndView homeJuicios(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCompromiso");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String compromiso=request.getParameter("compromiso");

			Future<ArrayList> datosCompromiso = compromisoService.getcompromisoDatos(compromiso,getEntorno(request), getUser(request));
			Future<ArrayList> datosConceptos = compromisoService.getConceptosDatos(compromiso,getEntorno(request), getUser(request));
			Future<ArrayList> datosBeneficiario = compromisoService.getBeneficiarioDatos(compromiso,getEntorno(request), getUser(request));

			
			agregarBreadcrumb(request, "Compromiso #" + compromiso);
			
			while (!(datosCompromiso.isDone() && datosConceptos.isDone() && datosBeneficiario.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.put("datosCompromiso",datosCompromiso.get());
			
			mapa.put("datosConceptos",datosConceptos.get());

			mapa.put("datosBeneficiario",datosBeneficiario.get());
			
			mapa.putAll(getDatosComunes(request));
			
			mapa.put("funcionOnload","inicioCompromisoHome()");

			return new ModelAndView(PANTALLA_DIRECCIONES_COMPROMISO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCompromiso", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	//------------------------------------ pantalla JSON del modal MOVIMIENTOS ---------------------------- //
			@RequestMapping(value = "/datosDetalleConcepto", method = RequestMethod.GET)
			public @ResponseBody
			Object getDatosPolizasProductor(HttpSession session, HttpServletRequest request) throws Exception {
				try {
					logger.debug("inicio el metodo");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					Map<String, Object> mapa = new HashMap<String, Object>() ;
					String concepto = request.getParameter("concepto");
					return compromisoService.getDetalleConcepto(concepto,getEntorno(request), getUser(request));

				} catch (Exception e) {
					logger.error(getUserLog(request)+"Exploto al mostrar el detalle del concepto", e);
				}

				return "No se encontro un detalle del concepto.";
			}


			

			//------------------------------------ pantalla JSON del modal BENEFICIARIO ---------------------------- //
					@RequestMapping(value = "/datosDetalleBeneficiarioCompromiso", method = RequestMethod.GET)
					public @ResponseBody
					Object getDatosDetalleBeneficiarioCompromiso(HttpSession session, HttpServletRequest request) throws Exception {
						try {
							logger.debug("inicio el metodo");
							EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
							Map<String, Object> mapa = new HashMap<String, Object>() ;
							String compromiso = request.getParameter("compromiso");
							return compromisoService.getDetalleConceptoModal(compromiso,getEntorno(request), getUser(request));

						} catch (Exception e) {
							logger.error(getUserLog(request)+"Exploto al mostrar el detalle del beneficiario", e);
						}

						return "No se encontro un detalle del beneficiario.";
					}


					

					//------------------------------------ pantalla JSON del modal ERROREs ---------------------------- //
					@RequestMapping(value = "/datosErroresCompromiso", method = RequestMethod.GET)
					public @ResponseBody
					Object getDatosErroresCompromiso(HttpSession session, HttpServletRequest request) throws Exception {
						try {
							logger.debug("inicio el metodo");
							EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
							Map<String, Object> mapa = new HashMap<String, Object>() ;
							String compromiso = request.getParameter("compromiso");
							return compromisoService.getErroresCompromisoModal(compromiso,getEntorno(request), getUser(request));

						} catch (Exception e) {
							logger.error(getUserLog(request)+"Exploto al mostrar el errores de comprommiso", e);
						}

						return "No se encontro un error en los componentes.";
					}

					//------------------------------------ pantalla JSON del modal FORMA PAGO ---------------------------- //
					@RequestMapping(value = "/datosFormaPagoCompromiso", method = RequestMethod.GET)
					public @ResponseBody
					Object getDatosFormaPagoCompromiso(HttpSession session, HttpServletRequest request) throws Exception {
						try {
							logger.debug("inicio el metodo");
							EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
							Map<String, Object> mapa = new HashMap<String, Object>() ;
							String compromiso = request.getParameter("compromiso");
							return compromisoService.getFormaPagoCompromisoModal(compromiso,getEntorno(request), getUser(request));

						} catch (Exception e) {
							logger.error(getUserLog(request)+"Exploto al mostrar forma de pago compromiso", e);
						}

						return "No se encontro una forma de pago.";
					}

					//------------------------------------ pantalla JSON del modal ASOCIASIONES ---------------------------- //
					@RequestMapping(value = "/datosAsociacionesCompromiso", method = RequestMethod.GET)
					public @ResponseBody
					Object getDatosAsociacionesCompromiso(HttpSession session, HttpServletRequest request) throws Exception {
						try {
							logger.debug("inicio el metodo");
							EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
							Map<String, Object> mapa = new HashMap<String, Object>() ;
							String compromiso = request.getParameter("compromiso");
							return compromisoService.getAsociacionesCompromisoModal(compromiso,getEntorno(request), getUser(request));

						} catch (Exception e) {
							logger.error(getUserLog(request)+"Exploto al mostrar asociaciones de compromiso", e);
						}

						return "No se encontraron asociasiones.";
					}
					
					//------------------------------------ pantalla JSON del modal CRONOGRAMA ---------------------------- //
					@RequestMapping(value = "/datosCronogramaCompromiso", method = RequestMethod.GET)
					public @ResponseBody
					Object getDatosCronogramaCompromiso(HttpSession session, HttpServletRequest request) throws Exception {
						try {
							logger.debug("inicio el metodo");
							EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
							Map<String, Object> mapa = new HashMap<String, Object>() ;
							String compromiso = request.getParameter("compromiso");
							return compromisoService.getCronogramaCompromisoModal(compromiso,getEntorno(request), getUser(request));

						} catch (Exception e) {
							logger.error(getUserLog(request)+"Exploto al mostrar el cronograma", e);
						}

						return "No se encontraron cronogramas.";
					}


	

}
