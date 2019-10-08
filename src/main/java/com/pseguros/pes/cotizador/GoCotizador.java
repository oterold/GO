package com.pseguros.pes.cotizador;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ExecutionException;
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

import com.pseguros.pes.bean.DatoDinamicoType;
import com.pseguros.pes.bean.DatosCotizacionGO;
import com.pseguros.pes.bean.DatosDinamicosCotizador;
import com.pseguros.pes.bean.DatosMostrarPanelB;
import com.pseguros.pes.bean.DatosTomadorAseg;
import com.pseguros.pes.bean.datoValoDefaultCotizacion;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.interceptor.ConstantesDeSession;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.GoCotizadorService;
import com.pseguros.pes.util.auxiliar.AuxiliarUtil;
import com.pseguros.pes.util.db.PLUtils;
import com.pseguros.pes.util.pantalla.RequestCotizadorUtils;
import com.pseguros.pes.util.pantalla.UtilGuardarDatosSession;

@Controller
public class GoCotizador extends AbstractPubController {
	private static final Logger logger = LoggerFactory.getLogger(GoCotizador.class);
	private static final String PANTALLA_HOME_DATOS_GENERALES = "partials/pes/cotizador/step1/datosTemplateGenerales";
	private static final String PANTALLA_HOME_STEP_2 = "partials/pes/cotizador/step2/step2CotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_DATOS_BIEN = "partials/pes/cotizador/step3/step3CotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_PROMOCIONES = "partials/pes/cotizador/step4/step4CotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_FINAL = "/partials/pes/cotizador/step5/step5CotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_COBERTURAS = "partials/pes/cotizador/stepCoberturas/stepCoberturasCotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_COTIZADOR = "partials/pes/cotizador/step0/step0CotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_DATOS_DEL_ASEGURADO = "partials/pes/cotizador/step6/step6CotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_DATOS_DEL_BIEN = "partials/pes/cotizador/step7/step7CotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_DATOS_COMPLEMENTARIOS = "partials/pes/cotizador/step8/step8CotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_FIN_EMISION = "partials/pes/cotizador/step9/step9CotizacionTemplateGenerales";
	private static final String COTIZADOR_STEP_INSPECCION = "partials/pes/cotizador/stepInspeccion/stepInspeccionCotizacionTemplateGenerales";
	private static final String PANTALLA_ERROR_COTI = "partials/error/errorGeneralTemplateCotizador";

	
	
	
	
	@Autowired
	private ExecuteService executeService;
	@Autowired
	private GoCotizadorService goCotizador;

	/**
	 * Primer paso de la cotizacion
	 * 
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/cotizadorGO", method = RequestMethod.GET)
	public ModelAndView cotizadorGO(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

		try {

			logger.debug("Primer paso de la Cotizacion");

			DatosCotizacionGO datosCoti = new DatosCotizacionGO();
			datosCoti.setRol("10001");
			datosCoti.setOrigen("WEBPRO");
			datosCoti.setEsquemaA("1");
			datosCoti.setEsquemaB("1");
			datosCoti.setProductor("15925");

			guardarEnSession(request, datosCoti);

			mapa.put("funcionOnload", "inicioCotizacion()");
			mapa.put("card", 0);
			mapa.put("clienteCotizacion", "");
			mapa.put("datosGenerales", "");
			mapa.put("datosBien", "");
			mapa.put("datosPromo", "");

			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(COTIZADOR_STEP_COTIZADOR, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto goCotizador", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}

	@RequestMapping(value = "/volverCotizadorGO", method = RequestMethod.GET)
	public ModelAndView volverCotizadorGO(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

		try {

			logger.debug("Primer paso de la Cotizacion");


			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
				datosCoti.setRol("10001");
				datosCoti.setOrigen("WEBPRO");
				datosCoti.setEsquemaA("1");
				datosCoti.setEsquemaB("1");
				datosCoti.setProductor("917");
				guardarEnSession(request, datosCoti);
				mapa.put("datosCoti", datosCoti);
			mapa.put("funcionOnload", "inicioCotizacion()");

			mapa.put("card", 0);
			mapa.put("clienteCotizacion", "");
			mapa.put("datosGenerales", "");
			mapa.put("datosBien", "");
			mapa.put("datosPromo", "");

			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(COTIZADOR_STEP_COTIZADOR, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto goCotizador", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}

	/**
	 * Segundo paso de la cotizacion
	 * 
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/cotizacionStep1", method = RequestMethod.GET)
	public ModelAndView cotizacionStep1(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			logger.debug("Mostrar Pantalla step 1, ingreso con el rol :" + datosCoti.getRol());

			Future<ArrayList> datosRamos = goCotizador.getRamos(datosCoti.getOrigen(), AuxiliarUtil.generarAux(datosCoti), getEntorno(request), getUser(request));

			while (!(datosRamos.isDone())) {
				Thread.sleep(5);
			}

			mapa.put("datosRamos", datosRamos.get());
			mapa.put("funcionOnload", "inicioCotizacion()");
			mapa.put("card", 1);

			mapa.put("datosCoti", datosCoti);
			mapa.putAll(getDatosComunes(request));

			guardarEnSession(request, datosCoti);
			
			return new ModelAndView(PANTALLA_HOME_DATOS_GENERALES, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto goCotizador", e);
			mapa.put("pantalla", "cotizadorGO");
			mapa.putAll(getDatosComunes(request));
		}

		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}

	/**
	 * Tercer paso de la cotizacion
	 * 
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/cotizacionStep2", method = RequestMethod.GET)
	public ModelAndView getCotizacionStep2(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

		try {
			logger.debug("Mostrar Pantalla step 2");

			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
	

			Future<ArrayList> datosValoresDefault = goCotizador.datosValoresDefault(datosCoti, getEntorno(request), getUser(request));
			while (!(datosValoresDefault.isDone())) {
				Thread.sleep(5);
			}
			datosCoti.setDatosDefault(AuxiliarUtil.cargarDatosDefault(datosCoti, request, datosValoresDefault));
			Future<datoValoDefaultCotizacion> datosProvincias = goCotizador.getProvincias(datosCoti, getEntorno(request), getUser(request));
			Future<datoValoDefaultCotizacion> datosTipoPersonas = goCotizador.getTipoPersonas(datosCoti, getEntorno(request), getUser(request));
			Future<datoValoDefaultCotizacion> datosMedioPago = goCotizador.getMedioPago(datosCoti, getEntorno(request), getUser(request));
			Future<datoValoDefaultCotizacion> datosCondicionIva = goCotizador.datosCondicionIva(datosCoti, getEntorno(request), getUser(request));
			Future<datoValoDefaultCotizacion> datosVigencia = goCotizador.datosVigencia(datosCoti, getEntorno(request), getUser(request));
			Future<datoValoDefaultCotizacion> datosFacturacion = goCotizador.datosFacturacion(datosCoti, getEntorno(request), getUser(request));
			Future<datoValoDefaultCotizacion> datosMoneda = goCotizador.datosMoneda(datosCoti, getEntorno(request), getUser(request));
			Future<datoValoDefaultCotizacion> datosCalculo = goCotizador.datosCalculo(datosCoti, getEntorno(request), getUser(request));

			while (!(datosProvincias.isDone() && datosTipoPersonas.isDone() && datosMedioPago.isDone() && datosCondicionIva.isDone() && datosVigencia.isDone() && datosFacturacion.isDone() && datosMoneda.isDone() && datosCalculo.isDone())) {
				Thread.sleep(5);
			}

			
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCotizacionStep2()");

			mapa.put("datosProvincias", datosProvincias.get());
			mapa.put("datosTipoPersonas", datosTipoPersonas.get());
			mapa.put("datosMedioPago", datosMedioPago.get());
			mapa.put("datosCondicionIva", datosCondicionIva.get());
			mapa.put("datosVigencia", datosVigencia.get());
			mapa.put("datosFacturacion", datosFacturacion.get());
			mapa.put("datosMoneda", datosMoneda.get());
			mapa.put("datosCalculo", datosCalculo.get());
			mapa.put("datosValoresDefault", datosCoti);

			mapa.put("card", 2);

			mapa.put("datosCoti", datosCoti);
			guardarEnSession(request, datosCoti);
			
			return new ModelAndView(PANTALLA_HOME_STEP_2, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto goCotizador", e);
			mapa.put("pantalla", "cotizacionStep1");
			mapa.putAll(getDatosComunes(request));
		}

		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}

	/**
	 * Cuarto paso de la cotizacion
	 * 
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/cotizacionStep3", method = RequestMethod.GET)
	public ModelAndView getCotizacionStep3(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			logger.debug("Mostrar Pantalla step 3 cotizador GO");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			datosCoti.setPromocionA(""); datosCoti.setPromocionB(""); datosCoti.setPromocionC("");
			
			String acc = "C";

			Future<ArrayList> datosDinamicos = goCotizador.datosDinamicos(datosCoti, acc, getEntorno(request), getUser(request));
			Future<ArrayList> datosAccesorios = goCotizador.datosAccesorios(datosCoti, getEntorno(request), getUser(request));

			while (!(datosDinamicos.isDone() && datosAccesorios.isDone())) {
				Thread.sleep(5);
			}

			ArrayList datos = cargarDinamicos(request, datosCoti, datosDinamicos);
			datosCoti.setDatosDinamicos(datos);

			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCotizacionStep3()");
			mapa.put("datosDinamicos", datosDinamicos.get());
			mapa.put("datosResultadoDinamico", datos);
			
			mapa.put("accesorios", datosAccesorios.get());

			mapa.put("card", 3);
			mapa.put("datosCoti", datosCoti);
			
			guardarEnSession(request, datosCoti);

			return new ModelAndView(COTIZADOR_STEP_DATOS_BIEN, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto step 3", e);
			mapa.put("pantalla", "cotizacionStep2");
			mapa.putAll(getDatosComunes(request));
		}

		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}

	/**
	 * Quinto paso de la cotizacion
	 * 
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/cotizacionStep4", method = RequestMethod.GET)
	public ModelAndView getCotizacionStep4(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			logger.debug("Mostrar Pantalla step 4 cotizador GO --- Promociones");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			Future<ArrayList> datosPromociones = goCotizador.datosPromociones(datosCoti, getEntorno(request), getUser(request));

			while (!(datosPromociones.isDone())) {
				Thread.sleep(5);
			}

			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCotizacion4()");
			mapa.put("card", 4);
			mapa.put("datosPromociones", datosPromociones.get());
			mapa.put("datosCoti", datosCoti);

			guardarEnSession(request, datosCoti);
			
			return new ModelAndView(COTIZADOR_STEP_PROMOCIONES, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto step 4", e);
			mapa.put("pantalla", "cotizacionStep3");
			mapa.putAll(getDatosComunes(request));
		}
		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);

	}

	/**
	 * Sexto paso de la cotizacion
	 * 
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/cotizacionStep5", method = RequestMethod.GET)
	public ModelAndView getCotizacionStep5(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			logger.debug("Mostrar Pantalla step 5 cotizador GO --- final coti");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
		
			String tipo = "N";
			String ruti = "1";
			
			goCotizador.guardarPromocion(datosCoti,getEntorno(request), getUser(request));
			goCotizador.calculoCotizacion(datosCoti,  tipo,getEntorno(request), getUser(request));
			
			logger.debug("Se guardaron las promociones" + datosCoti.getPromocionA() + " _ " + datosCoti.getPromocionB() + " _ " + datosCoti.getPromocionC());

			String datosVarios = goCotizador.datosVarios(datosCoti, ruti, getEntorno(request), getUser(request));
			Future<ArrayList> datosPromociones = goCotizador.datosCuerpoPromociones(datosCoti, getEntorno(request), getUser(request));
			Future<ArrayList> datosComision = goCotizador.datosComision(datosCoti, getEntorno(request), getUser(request));
			HashMap datosRecalculo = (HashMap) goCotizador.datosRecalculo(datosCoti, getEntorno(request), getUser(request));
			
			if(datosCoti.getRamo().toString().equals("4")){
				Future<ArrayList> datosCertificado = goCotizador.datosCertificado(datosCoti, getEntorno(request), getUser(request));
		
				while (!(datosCertificado.isDone())) {
					Thread.sleep(5);
				}
				UtilGuardarDatosSession.guardarDatosCertificado(datosCertificado.get(),datosCoti);
			}
			while (!(datosPromociones.isDone())) {
				Thread.sleep(5);
			}

			
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCotizacionStep5()");
			mapa.put("card", 5);
			mapa.put("datosPromoCuerpo", datosPromociones.get());
			mapa.put("datoVigencia", datosVarios);
			mapa.put("datosCoti", datosCoti);
			mapa.put("datosComision", datosComision.get());
			mapa.put("datosRecalculo", datosRecalculo);

			guardarEnSession(request, datosCoti);
			
			return new ModelAndView(COTIZADOR_STEP_FINAL, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto step 5", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg",e.getMessage());
			mapa.put("pantalla", "cotizacionStep4");
			mapa.putAll(getDatosComunes(request));

		}

		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}

	
	@RequestMapping(value = "/cotizacionStep5Coberturas", method = RequestMethod.GET)
	public ModelAndView getCotizacionStep5Coberturas(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			logger.debug("Mostrar Pantalla step 5 cotizador GO ");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			
			String tipo = "N";
			String ruti = "1";
			
			goCotizador.guardarPromocion(datosCoti,getEntorno(request), getUser(request));

			String datosPlan = goCotizador.datosPlan(datosCoti, getEntorno(request), getUser(request));

			datosCoti.setPlan(datosPlan);
			
			logger.debug("Se guarda el plan : " +datosPlan);

			
			Future<ArrayList> datosCoberturas = goCotizador.datosCoberturas(datosCoti, getEntorno(request), getUser(request));

			while (!(datosCoberturas.isDone())) {
				Thread.sleep(5);
			}
			
			
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCotizacion()");
			mapa.put("card", 6);
			mapa.put("datosCoti", datosCoti);
			mapa.put("coberturas", datosCoberturas.get());
			guardarEnSession(request, datosCoti);

			
			return new ModelAndView(COTIZADOR_STEP_COBERTURAS, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto step 5", e);
			mapa.put("pantalla", "cotizacionStep4");
			mapa.putAll(getDatosComunes(request));
		}
		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}
	
	@RequestMapping(value = "/cotizacionStep6", method = RequestMethod.GET)
	public ModelAndView getCotizacionStep6(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			logger.debug("Mostrar Pantalla step 6 cotizador GO ");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			
			Future<ArrayList> datosProfesiones = goCotizador.datosProfesiones(datosCoti, getEntorno(request), getUser(request));
			Future<ArrayList> datosDocumentos = goCotizador.datosDocumentos(datosCoti, getEntorno(request), getUser(request));
			Future<ArrayList> datosGenero = goCotizador.datosGenero(datosCoti, getEntorno(request), getUser(request));
			Future<ArrayList> datosLugarNacimiento = goCotizador.datosLugarNacimiento(datosCoti, getEntorno(request), getUser(request));
			Future<ArrayList> datosEstadoCivil = goCotizador.datosEstadoCivil(datosCoti, getEntorno(request), getUser(request));
			Future<ArrayList> datosPaises = goCotizador.datosPaises(datosCoti, getEntorno(request), getUser(request));

			while (!(datosProfesiones.isDone() && datosDocumentos.isDone() && datosGenero.isDone() && datosEstadoCivil.isDone() && datosPaises.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCotizacionStep6()");
			mapa.put("datosCoti", datosCoti);
			mapa.put("datosProfesiones", datosProfesiones.get());
			mapa.put("datosDocumentos", datosDocumentos.get());
			mapa.put("datosLugarNacimiento", datosLugarNacimiento.get());
			mapa.put("datosEstadoCivil", datosEstadoCivil.get());
			mapa.put("datosGenero", datosGenero.get());
			mapa.put("datosPaises", datosPaises.get());

			
			mapa.put("card", 0);
			
			return new ModelAndView(COTIZADOR_STEP_DATOS_DEL_ASEGURADO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto step 6", e);
			mapa.put("pantalla", "cotizacionStep5");
			mapa.putAll(getDatosComunes(request));
		}
		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}
	
	
	@RequestMapping(value = "/cotizacionStep7", method = RequestMethod.GET)
	public ModelAndView getCotizacionStep7(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			logger.debug("Mostrar Pantalla step 7 cotizador GO ");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			
			Future<ArrayList> datosDelBien = goCotizador.datosDelBien(datosCoti, getEntorno(request), getUser(request));
			ArrayList datos = cargarDinamicos(request, datosCoti, datosDelBien);
			datosCoti.setDatosDinamicosEmision(datos);
			while (!(datosDelBien.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCotizacion()");
			mapa.put("datosCoti", datosCoti);
			mapa.put("datosDinamicos", datosDelBien.get());
			mapa.put("datosResultadoDinamico", datos);

			mapa.put("card", 1);
			
			return new ModelAndView(COTIZADOR_STEP_DATOS_DEL_BIEN, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto step 7", e);
			mapa.put("pantalla", "cotizacionStep6");
			mapa.putAll(getDatosComunes(request));
		}
		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}
	
	
	
	
	@RequestMapping(value = "/cotizacionStep8", method = RequestMethod.GET)
	public ModelAndView getCotizacionStep8(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			logger.debug("Mostrar Pantalla step 8 cotizador GO ");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCotizacion()");
			mapa.put("datosCoti", datosCoti);

			mapa.put("card", 2);
			
			return new ModelAndView(COTIZADOR_STEP_DATOS_COMPLEMENTARIOS, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto step 8", e);
			mapa.put("pantalla", "cotizacionStep7");
			mapa.putAll(getDatosComunes(request));
		}
		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}
	
	@RequestMapping(value = "/cotizacionStep9", method = RequestMethod.GET)
	public ModelAndView getCotizacionStep9(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			logger.debug("Mostrar Pantalla step 8 cotizador GO ");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCotizacion()");
			mapa.put("datosCoti", datosCoti);

			mapa.put("card", 3);
			
			return new ModelAndView(COTIZADOR_STEP_FIN_EMISION, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto step 9", e);
			mapa.put("pantalla", "cotizacionStep8");
			mapa.putAll(getDatosComunes(request));
		}
		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}
	
	
	
	@RequestMapping(value = "/cotizacionStepInspeccion", method = RequestMethod.GET)
	public ModelAndView getCotizacionStepInspeccion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			logger.debug("Mostrar Pantalla step 8 cotizador GO ");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			
			Future<ArrayList> datosInspeccionTabla = goCotizador.datosInspeccionTabla(datosCoti, getEntorno(request), getUser(request));

			

			Future<ArrayList> datosInspeccion = goCotizador.datosDinamicosInspeccion(datosCoti, getEntorno(request), getUser(request));
			ArrayList datos = cargarDinamicos(request, datosCoti, datosInspeccion);
			while (!(datosInspeccion.isDone())) {
				Thread.sleep(5);
			}

			mapa.putAll(getDatosComunes(request));
			mapa.put("datosDinamicos", datosInspeccion.get());
			mapa.put("datosResultadoDinamico", datos);
			mapa.put("funcionOnload", "inicioCotizacion()");
			mapa.put("datosInspeccionTabla", datosInspeccionTabla.get());
			mapa.put("datosCoti", datosCoti);

			mapa.put("card", 3);
			
			return new ModelAndView(COTIZADOR_STEP_INSPECCION, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto step 9", e);
			mapa.put("pantalla", "cotizacionStep8");
			mapa.putAll(getDatosComunes(request));
		}
		return new ModelAndView(PANTALLA_ERROR_COTI, mapa);
	}
		
	
	
	// ---------------------------------------------------------------------------------------------------------------------------------------
	// ----------------------------------------------------- METODOS
	// ------------------------------------------------
	// ---------------------------------------------------------------------------------------------------------------------------------------

	@RequestMapping(value = "/guardarDatosGenerales", method = RequestMethod.POST)
	public @ResponseBody
	Object getGuardarDatosGenerales(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			DatosMostrarPanelB datosPanelB = datosCoti.getDatosPanelB();
			datosCoti.setDatosGenerales(AuxiliarUtil.cargarDatosgeneralesForm(request));
			datosCoti.setDatosPanelB(AuxiliarUtil.cargarDatosGeneralesMostrar(request,datosCoti,datosPanelB));
			String cotizacion = (String) goCotizador.finDatosGenerales(datosCoti, getEntorno(request), getUser(request));

			datosCoti.setCotizacion(Integer.parseInt(cotizacion));

			goCotizador.guardarDatosCliente(datosCoti, getEntorno(request), getUser(request));

			logger.debug("Se cargaron los datos del cliente en la coti" + cotizacion);
			return "";
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto el fin de datos generales", e);
			return e.getMessage();
		}
	}

	@RequestMapping(value = "/guardarDatosContacto", method = RequestMethod.GET)
	public @ResponseBody
	Object guardarDatosContacto(HttpSession session, HttpServletRequest request) throws Exception {

		EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

		try {

			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			datosCoti.setDatosContacto(RequestCotizadorUtils.cargardatosContacto(request));
			guardarEnSession(request, datosCoti);
			return datosCoti.getDatosContacto();
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto el fin de datos generales", e);
			return e.getMessage();
		}
	}

	private Object tomarDeSession(HttpServletRequest request, String dato) {
		return request.getSession().getAttribute(dato);
	}

	@RequestMapping(value = "/datosParametricosGoCotizador", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosParametricosGoCotizador(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			String dato = request.getParameter("dato");
			String tabla = request.getParameter("tabla");

			return goCotizador.datosParametricos(datosCoti, tabla, dato, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto el fin de datos parametricos", e);
			return e.getMessage();
		}
	}
	
	
	@RequestMapping(value = "/datosParametricosGoCotizadorGenerico", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosParametricosGoCotizadorGenerico(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String dato  = RequestCotizadorUtils.buscarDatoDependencia(request);
			String tabla = request.getParameter("tabla");

			return goCotizador.datosParametricos(datosCoti, tabla, dato, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto el fin de datos parametricos", e);
			return e.getMessage();
		}
	}
	
	
	
	
	@RequestMapping(value = "/guardarDatosProductoRamo", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarDatosProductoRamo(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			DatosMostrarPanelB datosPanelB = datosCoti.getDatosPanelB();
			
			AuxiliarUtil.cargarDatosEsqRamoProd(request,datosCoti,datosPanelB);
			
			guardarEnSession(request, datosCoti);
			
			logger.debug("Se guardaron los datos de los esquemas, ramo y prod");
			
			return datosCoti;
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto el fin de datos parametricos", e);
			return e.getMessage();
		}
	}
	
	

	@RequestMapping(value = "/datoTipoVehiculo", method = RequestMethod.GET)
	public @ResponseBody
	Object getdatoTipoVehiculo(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String marca = request.getParameter("marca");
			String modelo = request.getParameter("modelo");
			String stri = marca + ";" + modelo + ";";
			String tabla = "40007";
			String deri = "40021";
			return goCotizador.tipoVehiculo(stri, datosCoti, deri, tabla, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto el fin de datos generales", e);
			return e.getMessage();
		}
	}

	@RequestMapping(value = "/validarFechaNacimiento", method = RequestMethod.GET)
	public @ResponseBody
	Object getValidarFechaNacimiento(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String fecha = request.getParameter("fecha");
			String origen = "WEBPRO";
			String aux = (String) request.getSession().getAttribute(ConstantesDeSession.AUXILIAR);

			return goCotizador.validarFechaNac(fecha, aux, origen, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto el fin de datos generales", e);
			return e.getMessage();
		}
	}

	@RequestMapping(value = "/datosSumaAsegurada", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosSumaAsegurada(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String marca = request.getParameter("marca");
			String modelo = request.getParameter("modelo");
			String anio = request.getParameter("anio");
			String ceroKm = request.getParameter("ceroKm");
			return goCotizador.datosSumaAsegurada(marca, modelo, anio, ceroKm, datosCoti, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al cargar la suma asegurada", e);
			return e.getMessage();
		}

	}
	
	@RequestMapping(value = "/buscarUbicacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getBuscarUbicacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String dato = request.getParameter("dato");
			return goCotizador.datosUbicaciones(dato, datosCoti, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al cargar la suma asegurada", e);
			return e.getMessage();
		}

	}
	
	

	@RequestMapping(value = "/selectorOrigenPago", method = RequestMethod.GET)
	public @ResponseBody
	Object getSelectorOrigenPago(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String medioPago = request.getParameter("medioPago");

			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			return goCotizador.getOrigenPago(medioPago, getEntorno(request), getUser(request), datosCoti);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}

	@RequestMapping(value = "/productosDeLaCotizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getProductosDeLaCotizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosMostrarPanelB datosPanelB = new DatosMostrarPanelB();
			
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			datosCoti.setRamo(request.getParameter("ramo"));
			
			datosPanelB.setRamo(request.getParameter("descRamo"));
			datosCoti.setDatosPanelB(datosPanelB);

			guardarEnSession(request, datosCoti);
			return goCotizador.getProductos(datosCoti, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}

	@RequestMapping(value = "/selectorVigenciaTecnica", method = RequestMethod.GET)
	public @ResponseBody
	Object getSelectorVigenciaTecnica(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);

			return goCotizador.getVigenciaTecnica(datosCoti, request.getParameter("vigencia"), getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}

	@RequestMapping(value = "/selectorPlanesPagos", method = RequestMethod.GET)
	public @ResponseBody
	Object getSelectorPlanesPagos(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String vigencia = request.getParameter("vigencia");

			return goCotizador.getPlanesPagos(vigencia, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}

	@RequestMapping(value = "/guardarDatosDelBien", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarDatosDelBien(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			DatosMostrarPanelB datosPanelB= datosCoti.getDatosPanelB();
			datosCoti.setDatosDinamicos(RequestCotizadorUtils.obtenerDatosDinamicosFormateados(datosCoti,request,datosCoti.getDatosDinamicos()));
			
			if(datosCoti.getRamo().toString().equals("4")){
				datosCoti.setDatosPanelB(RequestCotizadorUtils.obtenerDatosDinamicosMostrarPanelB(datosCoti,request,datosPanelB));
				datosCoti.setValorFinalDatosDinamicos(RequestCotizadorUtils.obtenerDatosFinalDinamico(datosCoti,datosCoti.getDatosDinamicos()));
			}else{
				datosCoti.setValorFinalDatosDinamicos(RequestCotizadorUtils.obtenerDatosFinalDinamicoGenerico(datosCoti));

			}
			return goCotizador.guardarDatosDelBien(datosCoti, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	@RequestMapping(value = "/guardarDatosAccesorios", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarDatosAccesorios(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			datosCoti.setAccesorios(request.getParameter("accesorioString"));
			return goCotizador.guardarDatosAccesorios(datosCoti, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}

	
	@RequestMapping(value = "/guardarDatosPromo", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarDatosPromo(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			DatosMostrarPanelB datosPanelB= datosCoti.getDatosPanelB();
			
			UtilGuardarDatosSession.guardarDatosPromocion(datosCoti,request);
			datosCoti.setDatosPanelB(RequestCotizadorUtils.obtenerDatosPromoPanelB(datosCoti,request,datosPanelB));

			guardarEnSession(request, datosCoti);
			return goCotizador.guardarDatosDelBien(datosCoti, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}

	
	
	

	@RequestMapping(value = "/recalculoCotizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getRecalculoCotizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String comision = request.getParameter("comision");
			datosCoti.setComision(comision);
			
			return goCotizador.recalculoComision(datosCoti, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	@RequestMapping(value = "/buscarPersona", method = RequestMethod.GET)
	public @ResponseBody
	Object getBuscarPersona(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String documento = request.getParameter("documento");
			DatosTomadorAseg datosTomador = new DatosTomadorAseg();			
			datosTomador.setDni(documento);
			datosCoti.setDatosAseg(datosTomador);
			
			guardarEnSession(request, datosCoti);
			return goCotizador.buscarPersona(datosCoti,datosTomador, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	@RequestMapping(value = "/buscarComunicaciones", method = RequestMethod.GET)
	public @ResponseBody
	Object getBuscarComunicaciones(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String codigo = request.getParameter("codigo");
			
			return goCotizador.buscarComunicacion(datosCoti,codigo,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	@RequestMapping(value = "/buscarComunicacionesTelefono", method = RequestMethod.GET)
	public @ResponseBody
	Object getBuscarComunicacionesTelefono(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String codigo = request.getParameter("codigo");
			
			return goCotizador.buscarComunicacion(datosCoti,codigo,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	@RequestMapping(value = "/buscarBanco", method = RequestMethod.GET)
	public @ResponseBody
	Object getBuscarBanco(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			return goCotizador.buscarBanco(datosCoti,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	@RequestMapping(value = "/buscarDomicilios", method = RequestMethod.GET)
	public @ResponseBody
	Object getBuscarDomicilios(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			return goCotizador.buscarDomicilio(datosCoti,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	@RequestMapping(value = "/confirmarCotizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getConfirmarCotizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String impr = "N";
			return goCotizador.confirmarCotizacion(datosCoti,impr,getEntorno(request), getUser(request));
			
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	@RequestMapping(value = "/guardarPlanPromo", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarPlanPromo(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			UtilGuardarDatosSession.guardarDatosCotizacion(request,datosCoti);
			return goCotizador.guardarDatosPromoPlan(datosCoti,getEntorno(request), getUser(request));
			
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	@RequestMapping(value = "/guardarDomicilio", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarDomicilio(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String valor = RequestCotizadorUtils.obtenerDatosFormateadosDomicilio(datosCoti, request);
			String condicion = request.getParameter("condicion");
			return goCotizador.guardarDomicilio(datosCoti,valor,condicion,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	@RequestMapping(value = "/guardarComunicacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarComunicacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String valor = RequestCotizadorUtils.obtenerDatosFormateadosDomicilio(datosCoti, request);
			String conz = request.getParameter("conz");
			return goCotizador.guardarComunicacion(datosCoti,valor,conz,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	@RequestMapping(value = "/guardarComunicacionNueva", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarComunicacionNueva(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String valor = RequestCotizadorUtils.obtenerDatosFormateadosDomicilio(datosCoti, request);
			String conz = request.getParameter("conz");
			return goCotizador.guardarComunicacionNuevo(datosCoti,valor,conz,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	@RequestMapping(value = "/guardarDatosBanco", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarDatosBancarios(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String valor = "1;5;VI;4546570955309807;;;;#";
			String datoBanco = request.getParameter("dato");
			
			DatosTomadorAseg datosAseg = datosCoti.getDatosAseg();
			datosAseg.setNuCuenta(datoBanco);
			datosCoti.setDatosAseg(datosAseg);
			
			return goCotizador.guardarDatosBancarios(datosCoti,valor,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	@RequestMapping(value = "/cargarNuevaPersona", method = RequestMethod.GET)
	public @ResponseBody
	Object getCargarNuevaPersona(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String valor = RequestCotizadorUtils.obtenerDatosFormateadosCrearPersona(datosCoti, request);
			return goCotizador.crearPersona(datosCoti,valor,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	
	@RequestMapping(value = "/guardarCliente", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarCliente(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String valor = RequestCotizadorUtils.obtenerDatosFormateadosCrearPersona(datosCoti, request);
			return goCotizador.guardarPersona(datosCoti,valor,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	
	
	
	@RequestMapping(value = "/contenidoCobertura", method = RequestMethod.GET)
	public @ResponseBody
	Object getContenidoCobertura(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String plan = request.getParameter("plan");
			String promo = request.getParameter("promo");
			
			return goCotizador.buscarDetallePlanPromo(datosCoti,plan,promo,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	@RequestMapping(value = "/contenidoDetalle", method = RequestMethod.GET)
	public @ResponseBody
	Object getContenidoDetalle(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			String plan = request.getParameter("plan");
			String promo = request.getParameter("promo");
			
			return goCotizador.buscarDetallePlanPromoCobertura(datosCoti,plan,promo,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}
	
	
	@RequestMapping(value = "/guardarDatosDelBienCotizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getGuardarDatosDelBienCotizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			DatosMostrarPanelB datosPanelB= datosCoti.getDatosPanelB();
			datosCoti.setDatosDinamicosEmision(RequestCotizadorUtils.obtenerDatosDinamicosFormateados(datosCoti,request,datosCoti.getDatosDinamicosEmision()));
			
			if(datosCoti.getRamo().toString().equals("4")){
				datosCoti.setValorFinalDatosDinamicosEmision(RequestCotizadorUtils.obtenerDatosFinalDinamicoEmision(datosCoti,datosCoti.getDatosDinamicosEmision()));
			}else{
				datosCoti.setValorFinalDatosDinamicos(RequestCotizadorUtils.obtenerDatosFinalDinamicoGenerico(datosCoti));

			}
			return goCotizador.guardarDatosDelBienEmision(datosCoti, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}

	
	@RequestMapping(value = "/emitirPoliza", method = RequestMethod.GET)
	public @ResponseBody
	Object getEmitirPoliza(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
			return goCotizador.emitirPoliza(datosCoti, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar detalles", e);
			return e.getMessage();
		}
	}

	
	
	// ---------------------------------------------------------------------------------------------------------------------------------------
	// ----------------------------------------------------- PRIVADOS
	// ------------------------------------------------
	// ---------------------------------------------------------------------------------------------------------------------------------------


	
	private ArrayList cargarDinamicos(HttpServletRequest request, DatosCotizacionGO datosCoti, Future<ArrayList> datosDinamicos) throws InterruptedException, ExecutionException, Exception {
		
		ArrayList dinamicos = datosDinamicos.get();
		ArrayList datos = new ArrayList();
		int i = 0;

		for (Iterator iterator = dinamicos.iterator(); iterator.hasNext();) {
			i++;
			DatoDinamicoType dato = PLUtils.cargarDatoType((HashMap) iterator.next());
			datos.add(new DatosDinamicosCotizador(dato ,obtenerListaValores(dato,request),i));
		}
		return datos;
	}

	
	private ArrayList cargarDinamicosCotizacion(HttpServletRequest request, DatosCotizacionGO datosCoti, Future<ArrayList> datosDinamicos) throws InterruptedException, ExecutionException, Exception {
		
		ArrayList dinamicos = datosDinamicos.get();
		ArrayList datos = new ArrayList();
		int i = 0;

		for (Iterator iterator = dinamicos.iterator(); iterator.hasNext();) {
			i++;
			DatoDinamicoType dato = PLUtils.cargarDatoType((HashMap) iterator.next());
			datos.add(new DatosDinamicosCotizador(dato ,obtenerListaValores(dato,request),i));
		}
		return datos;
	}
	
	private ArrayList obtenerListaValores(DatoDinamicoType dato, HttpServletRequest request) throws Exception {
		DatosCotizacionGO datosCoti = (DatosCotizacionGO) tomarDeSession(request, ConstantesDeSession.DATOS_COTIZACION_GO);
		if (dato.getCrdpTieneLdv().toString().toUpperCase().trim().equals("S") && dato.getInbInDependencias().toString().toUpperCase().trim().equals("")) {
			Future<ArrayList> dinamicoResultado = goCotizador.datosResultadoParametricos(datosCoti, dato.getCrcoCrtdCdDato(), getEntorno(request), getUser(request));
			while (!(dinamicoResultado.isDone())) {
				Thread.sleep(5);
			}
			return  dinamicoResultado.get();
		}
		return null;
	}

	private void guardarEnSession(HttpServletRequest request, DatosCotizacionGO datosCoti) {
		request.getSession().setAttribute(ConstantesDeSession.DATOS_COTIZACION_GO, datosCoti);
	}


}
