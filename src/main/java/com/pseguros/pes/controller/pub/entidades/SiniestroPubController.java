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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.pseguros.pes.bean.Parametros;
import com.pseguros.pes.bean.Reporte;
import com.pseguros.pes.bean.ReporteSiniestro;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.SiniestroService;
import com.pseguros.pes.util.json.JsonUtils;
import com.pseguros.pes.util.pantalla.UtilPantalla;

@Controller
public class SiniestroPubController  extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(SiniestroPubController.class);
	private static final String PANTALLA_HOME_SINIESTRO= "partials/pes/entidades/siniestro/siniestroHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	@Autowired
	private SiniestroService siniestroService;
	
	@RequestMapping(value = "/homeSiniestro", method = RequestMethod.GET)
	public ModelAndView homeSiniestro(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		

		try {

			logger.debug("Mostrar Pantalla homeSiniestro");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String siniestro=request.getParameter("nroSiniestro");
			String ramo=request.getParameter("ramo");
			String annio = request.getParameter("anio");
			
			Future<ArrayList> datosSiniestro = siniestroService.getSiniestroDatos(siniestro,ramo,annio, getEntorno(request), getUser(request));
			Future<ArrayList> datosSubSiniestro = siniestroService.getSubSiniestroDatos(siniestro, ramo, annio, getEntorno(request), getUser(request));
			Future<ArrayList> datosInspecciones = siniestroService.getDatoInspecciones(siniestro, ramo, annio, getEntorno(request), getUser(request));
						
			agregarBreadcrumb(request, "Siniestros #" + siniestro);
			
			while (!(datosSiniestro.isDone() && datosSubSiniestro.isDone() && datosInspecciones.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.put("datoSiniestro",datosSiniestro.get());
			mapa.put("urlDescarga",getDatoUrlReporteCertificado(annio,ramo,siniestro,getEntorno(request), getUser(request)));
			String poliza =((HashMap)datosSiniestro.get().get(0)).get("P_TF_LISTA_IMPR.SISI_CAPO_NU_POLIZA").toString();
			String sucursal=((HashMap)datosSiniestro.get().get(0)).get("P_TF_LISTA_IMPR.SISI_SUCURSAL_SINIESTRO").toString();
			String ocurrencia =((HashMap)datosSiniestro.get().get(0)).get("P_TF_LISTA_IMPR.SISI_FE_OCURRENCIA").toString();
			String endoso=((HashMap)datosSiniestro.get().get(0)).get("P_TF_LISTA_IMPR.SISI_CACE_NU_ENDOSO").toString();
			String certificado=((HashMap)datosSiniestro.get().get(0)).get("P_TF_LISTA_IMPR.SISI_CACE_NU_CERTIFICADO").toString();
			mapa.put("urlDescargaCobertura", getDatoUrlReporteCobertura(sucursal, ramo, poliza, certificado, endoso, UtilPantalla.formatearFecha(ocurrencia), getEntorno(request), getUser(request)));
			mapa.put("urlDescargaIndiceRiesgo", getIndiceRiesgoURLSiniestroHome(ramo,annio,siniestro, getEntorno(request), getUser(request)));
			
			mapa.put("datosSubSiniestros",datosSubSiniestro.get());
			mapa.put("datosInspecciones", datosInspecciones.get());
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload","inicioSiniestroHome();");

			return new ModelAndView(PANTALLA_HOME_SINIESTRO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeSiniestro", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	
	
	
	
	
	
	//------------------------------------ pantalla JSON del siniestro panel D ---------------------------- //
		@RequestMapping(value = "/datosParametricosSiniestro", method = RequestMethod.GET)
		public @ResponseBody
		Object getDatosParametricosSiniestro(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				logger.debug("inicio el metodo");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String siniestro = request.getParameter("siniestro");
				String annio = request.getParameter("annio");
				String ramo = request.getParameter("ramo");
				String subSiniestro = request.getParameter("subSiniestro");

				return siniestroService.getDatosParametricos(siniestro, ramo, annio, subSiniestro, getEntorno(request), getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar los datos parametricos de siniestro", e);
			}

			return "No se encontraron datos parametricos del subSiniestro";
		}
		
	
	

		//------------------------------------ pantalla JSON del siniestro panel C ---------------------------- //
			@RequestMapping(value = "/datosInspecciones", method = RequestMethod.GET)
			public @ResponseBody
			Object getDatosInspecciones(HttpSession session, HttpServletRequest request) throws Exception {
				try {
					logger.debug("inicio el metodo");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

					String siniestro = request.getParameter("siniestro");
					String annio = request.getParameter("annio");
					String ramo = request.getParameter("ramo");
					String subSiniestro = request.getParameter("subSiniestro");

					return siniestroService.getDatosInspecciones(siniestro, ramo, annio, subSiniestro, getEntorno(request), getUser(request));

				} catch (Exception e) {
					logger.error(getUserLog(request)+"Exploto al mostrar los datos de inspecciones", e);
				}

				return "El sub siniestro no posee inspecciones";
			}
		
			
			//------------------------------------ pantalla JSON cuand se carga el modal de INSPECCIONES ---------------------------- //
				@RequestMapping(value = "/datosInspeccionesModal", method = RequestMethod.GET)
				public @ResponseBody
				Object getDatosInspeccionesModal(HttpSession session, HttpServletRequest request) throws Exception {
					try {
						logger.debug("inicio el modal inspecciones");
						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

						String siniestro = request.getParameter("siniestro");
						String annio = request.getParameter("annio");
						String ramo = request.getParameter("ramo");
						String subSiniestro = request.getParameter("subSiniestro");

						return siniestroService.getDatosInspecciones(siniestro, ramo, annio, subSiniestro, getEntorno(request), getUser(request));

					} catch (Exception e) {
						logger.error(getUserLog(request)+"Exploto al mostrar las inspecciones siniestro", e);
					}

					return "El siniestro no posee inspecciones";
				}
				
	
				
				//------------------------------------ pantalla JSON cuand se carga el modal de NOTAS ---------------------------- //
				@RequestMapping(value = "/datosNotasModal", method = RequestMethod.GET)
				public @ResponseBody
				Object getDatosNotasModal(HttpSession session, HttpServletRequest request) throws Exception {
					try {
						logger.debug("inicio el modal inspecciones");
						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

						String siniestro = request.getParameter("siniestro");
						String annio = request.getParameter("annio");
						String ramo = request.getParameter("ramo");

						return siniestroService.getDatosNotas(siniestro, ramo, annio, getEntorno(request), getUser(request));

					} catch (Exception e) {
						logger.error(getUserLog(request)+"Exploto al mostrar las notas siniestro", e);
					}

					return "El siniestro no posee notas";
				}
				
				//------------------------------------ pantalla JSON cuand se carga el modal de DETALLE TERCERO ---------------------------- //
				@RequestMapping(value = "/datosDetalleTercero", method = RequestMethod.GET)
				public @ResponseBody
				Object getDatosDetalleTercero(HttpSession session, HttpServletRequest request) throws Exception {
					try {
						logger.debug("inicio el modal inspecciones");
						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

						String siniestro = request.getParameter("siniestro");
						String annio = request.getParameter("annio");
						String ramo = request.getParameter("ramo");
						String tercero = request.getParameter("tercero");

						return siniestroService.getDetalletercero(siniestro, ramo, annio, tercero, getEntorno(request), getUser(request));

					} catch (Exception e) {
						logger.error(getUserLog(request)+"Exploto al mostrar los detalles de terceros siniestro", e);
					}

					return "El siniestro no posee notas";
				}
				
				
				
				//------------------------------------ pantalla JSON cuand se carga el modal de DETALLE TERCERO ---------------------------- //
				@RequestMapping(value = "/datosDetalleSiniestroHome", method = RequestMethod.GET)
				public @ResponseBody
				Object getDatosDetalleSiniestroHome(HttpSession session, HttpServletRequest request) throws Exception {
					try {
						logger.debug("inicio el modal datos siniestros ");
						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

						String siniestro = request.getParameter("siniestro");
						String annio = request.getParameter("annio");
						String ramo = request.getParameter("ramo");

						return siniestroService.getDetalleModalSiniestro(siniestro, ramo, annio, getEntorno(request), getUser(request));

					} catch (Exception e) {
						logger.error(getUserLog(request)+"Exploto al mostrar datos de detalle siniestro", e);
					}

					return "No existe un detalle del siniestro";
				}
				
				
				//------------------------------------ pantalla modal cobertura financiera ---------------------------- //
				@RequestMapping(value = "/coberturaFinancieraModalSiniestroHome", method = RequestMethod.GET)
				public @ResponseBody
				Object getCoberturaFinancieraModalSiniestroHome(HttpSession session, HttpServletRequest request) throws Exception {
					try {
						logger.debug("inicio el modal datos cobertura financiera ");
						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

						String sucursal = request.getParameter("sucursal");
						String ramo = request.getParameter("ramo");
						String poliza = request.getParameter("poliza");
						String certificado = request.getParameter("certificado");
						String endoso = request.getParameter("endoso");
						String fecha = request.getParameter("fecha");

						return siniestroService.getCoberturaFinancieraModalSiniestro(sucursal, ramo, poliza, certificado, endoso, fecha,  getEntorno(request), getUser(request));

					} catch (Exception e) {
						logger.error(getUserLog(request)+"Exploto al mostrar cobertura financiera siniestro", e);
					}

					return "No existen coberturas financieras del siniestro";
				}
				
				
				//------------------------------------ pantalla modal cobertura---------------------------- //
				@RequestMapping(value = "/coberturaModalSiniestroHome", method = RequestMethod.GET)
				public @ResponseBody Object getCoberturaModalSiniestroHome(HttpSession session, HttpServletRequest request) throws Exception {
					try {
						logger.debug("inicio el modal datos cobertura ");
						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

						String siniestro = request.getParameter("siniestro");
						String ramo = request.getParameter("ramo");
						String annio = request.getParameter("annio");

						return siniestroService.getCoberturaModalSiniestro(ramo, siniestro, annio, getEntorno(request), getUser(request));

					} catch (Exception e) {
						logger.error(getUserLog(request)+"Exploto al mostrar cobertura siniestro", e);
					}

					return "No existen coberturas del siniestro";
				}
				
				
				
				
				private String getDatoUrlReporteCertificado(String annio,String ramo,String siniestro, EnvironmentType environmentType, String user) throws Exception {
					try {
						logger.debug("inicio el metodo getDatoUrlReporteCertificado");
					    
					    List<Parametros> lista = new ArrayList<Parametros>();
					    lista.add(new Parametros("ANIO",annio));
					    lista.add(new Parametros("RAMO",ramo));
					    lista.add(new Parametros("SINIESTRO",siniestro));
					    ReporteSiniestro reporteSiniestro = new ReporteSiniestro(new Reporte("SINR10000", lista));
					    
						return siniestroService.getDatoUrlCertificadoSiniestro(JsonUtils.generateJson(reporteSiniestro), environmentType, user);

					} catch (Exception e) {
						logger.error("Error al genera la url", e);
						return "";
					}

				}
				
				
				public String getDatoUrlReporteCobertura(String sucursal, String ramo, String poliza, String certificado, String endoso, String ocurrencia, EnvironmentType environmentType, String user) throws Exception {
					try {
						logger.debug("inicio el metodo getDatoUrlReporteCobertura");
					    							
					    List<Parametros> lista = new ArrayList<Parametros>();
					    lista.add(new Parametros("P_SUCURSAL",sucursal));
					    lista.add(new Parametros("P_RAMO",ramo));
					    lista.add(new Parametros("P_POLIZA",poliza));
					    lista.add(new Parametros("P_CERTIFICADO", certificado));
					    lista.add(new Parametros("P_ENDOSO", endoso));
					    lista.add(new Parametros("P_FE_OCURRENCIA",ocurrencia));
					    ReporteSiniestro reporteSiniestro = new ReporteSiniestro(new Reporte("CARR30900", lista));
					    
						return siniestroService.getDatoUrlCertificadoSiniestro(JsonUtils.generateJson(reporteSiniestro), environmentType, user);

					} catch (Exception e) {
						logger.error("Error al genera la url", e);
						return "";
					}

				}
				
				
				//------------------------------------ pantalla modal cobertura---------------------------- //
				
				@RequestMapping(value = "/indiceRiesgoModalSiniestroHome", method = RequestMethod.GET)
				public @ResponseBody Object getDetalleComponentes(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
					
					Map<String, Object> mapa = new HashMap<String, Object>() ;
					try {

						logger.debug("Inicio metodo detalleComponentes");

						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
						
						String siniestro = request.getParameter("siniestro");
						String ramo = request.getParameter("ramo");
						String annio = request.getParameter("annio");
						
						
						mapa.put("funcionOnload","");

						return siniestroService.getIndiceRiesgoSiniestro(annio,ramo, siniestro, getEntorno(request), getUser(request));
				
					} catch (Exception e) {
						logger.error("Exploto al mostrar los indices de riesgo, error :606132", e);
					}

					return "No existen indices de riesgo del siniestro";

				}
				
				
				
				public String getIndiceRiesgoURLSiniestroHome(String ramo,String annio,String siniestro, EnvironmentType environmentType, String user) throws Exception {
					try {
						logger.debug("inicio el metodo getIndiceRiesgoURLSiniestroHome");
					    							
						 List<Parametros> lista = new ArrayList<Parametros>();
						    lista.add(new Parametros("P_NU_ANNIO",annio));
						    lista.add(new Parametros("P_NU_RAMO",ramo));
						    lista.add(new Parametros("P_NU_SINIESTRO",siniestro));
						    ReporteSiniestro reporteSiniestro = new ReporteSiniestro(new Reporte("SINR10700", lista));
						    
					    
						return siniestroService.getDatoUrlCertificadoSiniestro(JsonUtils.generateJson(reporteSiniestro), environmentType, user);

					} catch (Exception e) {
						logger.error("Error al genera la url", e);
						return "";
					}

				}
	
}
