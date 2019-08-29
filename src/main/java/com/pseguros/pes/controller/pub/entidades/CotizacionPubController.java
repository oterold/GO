package com.pseguros.pes.controller.pub.entidades;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
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

import com.pseguros.pes.bean.ComparacionCotizacionBean;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.CotizacionService;

@Controller
public class CotizacionPubController  extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(CotizacionPubController.class);
	private static final String PANTALLA_HOME_COTIZACION = "partials/pes/entidades/cotizacion/cotizacionHomeTemplate";
	private static final String PANTALLA_HOME_COTIZACION_COMPARACION = "partials/pes/entidades/cotizacion/comparacion/cotizacionComparacionHomeTemplate";

	private static final String PANTALLA_ERROR = "partials/error/errorGeneralTemplate";

	@Autowired
	private ExecuteService executeService;

	@Autowired
	private CotizacionService cotizacionService;
	
	@RequestMapping(value = "/homeCotizacion", method = RequestMethod.GET)
	public ModelAndView homeCotizacionPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Mostrar Pantalla homeComisiones");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String cotizacion = request.getParameter("cotizacion");
			
			agregarBreadcrumb(request, "Cotizacion #" + cotizacion);
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload","inicioCotizacionHome()");
			mapa.put("cotizacion", cotizacion);

			Future<ArrayList> listaCertificadosCotizacion = cotizacionService.getListaCertificadosCotizacion(cotizacion, getEntorno(request), getUser(request));			
			
			
			while (!(listaCertificadosCotizacion.isDone() )) {
				Thread.sleep(5);
			}
			
			mapa.put("listaCertificadosCotizacion", listaCertificadosCotizacion.get());

			return new ModelAndView(PANTALLA_HOME_COTIZACION, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto homeComisiones", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg",""+e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	


	




	@RequestMapping(value = "/homeCotizacionComparacion", method = RequestMethod.GET)
	public ModelAndView homeCotizacionComparacion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Mostrar Pantalla homeComisiones");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("funcionOnload","inicioCotizacionComparacion()");

			String cotizacion = request.getParameter("cotizacion");
			if(cotizacion == null || cotizacion.length() < 0 || cotizacion.equals("")){
				cotizacion = "Sin dato";
				mapa.put("cotizacion", "");
			}else{
				mapa.put("cotizacion", cotizacion);
			}
			
			//agregarBreadcrumb(request, "Comparacion de Cotizacion #" + cotizacion);
			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(PANTALLA_HOME_COTIZACION_COMPARACION, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto homeComisiones", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg",""+e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	
	
	
	
	
	
	



	private LinkedList<ComparacionCotizacionBean> armarDatosSalida(ArrayList arrayList1, ArrayList arrayList2, String consecutivo) {
		
		LinkedList<ComparacionCotizacionBean> datosSalida = new LinkedList<ComparacionCotizacionBean>();
		
		Map<String,Object>  datosTMP = new HashMap<String,Object>();
		
		
	
		for (Iterator iterator = arrayList1.iterator(); iterator.hasNext();) {
			
			Map<String,Object> datosCoti1 = (Map<String,Object>) iterator.next();
			
			for (Map.Entry<String,Object> entry : datosCoti1.entrySet()) {
			    datosTMP.put(entry.getKey(), new ComparacionCotizacionBean(entry.getKey().toString(), entry.getValue().toString(), null));
			}
			
		}
	
		
		for (Iterator iterator = arrayList2.iterator(); iterator.hasNext();) {
		
			Map<String,Object> datosCoti1 = (Map<String,Object>) iterator.next();
			
			for (Map.Entry<String,Object> entry : datosCoti1.entrySet()) {
			   
			    if (datosTMP.containsKey(entry.getKey())) {
			    
			    	ComparacionCotizacionBean tmpObj = (ComparacionCotizacionBean) datosTMP.get(entry.getKey());
			    	tmpObj.setValorDatoB(entry.getValue().toString());
			    	datosTMP.put(entry.getKey(), tmpObj);
					
				}else {
					datosTMP.put(entry.getKey(), new ComparacionCotizacionBean(entry.getKey().toString(),null, entry.getValue().toString()));
				}
			    
			}
			
		}
		
		
		for (Map.Entry<String,Object> entry : datosTMP.entrySet()) {
			ComparacionCotizacionBean dato = (ComparacionCotizacionBean) entry.getValue();
			dato.comparar();
			datosSalida.add(dato);
		}
		
		
		Collections.sort(datosSalida, new Comparator<ComparacionCotizacionBean>(){
		    @Override
		    public int compare(ComparacionCotizacionBean o1, ComparacionCotizacionBean o2) {
		        return o1.getEtiqueda().compareTo(o2.getEtiqueda());
		    }
		});      
		
	     
		
		return datosSalida;
	}


	
	






	@RequestMapping(value = "/detalleCotizacion", method = RequestMethod.GET)
	public @ResponseBody Object getDetalleCotizacion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Inicio metodo detalleCotizacion");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			String nroConsecutivo = request.getParameter("consecutivo");
			
			mapa.put("funcionOnload","");

			Future<ArrayList> cotizacionCertificado = cotizacionService.getCertificadoCotizacion(nroCotizacion, nroConsecutivo, getEntorno(request), getUser(request));
			
			
			while (!(cotizacionCertificado.isDone())) {
				Thread.sleep(5);
			}
			
			return cotizacionCertificado.get().get(0);


		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos de cotizacion de certificado", e);
			return "" + e.getMessage();
		}

	}
	
	
	
	@RequestMapping(value = "/cantidadCertificados", method = RequestMethod.GET)
	public @ResponseBody Object CantidadCertificados(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Inicio metodo detalleCotizacion");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			
			return cotizacionService.getDatosCertificadosJson(nroCotizacion, getEntorno(request), getUser(request));
			
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos de cotizacion de certificado", e);
			return "" + e.getMessage();
		}

	}
	
	@RequestMapping(value = "/detalleComponentes", method = RequestMethod.GET)
	public @ResponseBody Object getDetalleComponentes(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Inicio metodo detalleComponentes");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			String nroConsecutivo = request.getParameter("consecutivo");
			
			mapa.put("funcionOnload","");

			return cotizacionService.getCotizacionComponentes(nroCotizacion, nroConsecutivo, getEntorno(request), getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos de cotizacion de certificado", e);
			return "" + e.getMessage();
		}

	}
	
	
	@RequestMapping(value = "/datosParametricosCotizacion", method = RequestMethod.GET)
	public @ResponseBody Object getDatosParametricosCotizacion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Inicio metodo datosParametricosCotizacion");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			String nroConsecutivo = request.getParameter("consecutivo");
			String nroBien = request.getParameter("bien");
			
			
			mapa.put("funcionOnload","");

			return cotizacionService.getDatosParametricosCotizacionesHome(nroCotizacion, nroConsecutivo,nroBien, getEntorno(request), getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos de cotizacion de certificado", e);
			return "" + e.getMessage();
		}

	}
	
	@RequestMapping(value = "/planesCotizacion", method = RequestMethod.GET)
	public @ResponseBody Object getPlanesCotizacion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Inicio metodo planesCotizacion");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			String nroConsecutivo = request.getParameter("consecutivo");
			
			mapa.put("funcionOnload","");

			return cotizacionService.getCotizacionPlanes(nroCotizacion, nroConsecutivo, getEntorno(request), getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos de cotizacion de certificado", e);
			return "" + e.getMessage();
		}

	}
	
	
	
	
	//modal texto
	@RequestMapping(value = "/textoModalCoti", method = RequestMethod.GET)
	public @ResponseBody Object getTextoModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {


			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			String nroConsecutivo = request.getParameter("consecutivo");

			return cotizacionService.getTextoModal(nroCotizacion, nroConsecutivo, getEntorno(request), getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos de cotizacion de certificado", e);
			return "La cotizacion no posee textos.";
		}

	}
	
	
	//modal texto
	@RequestMapping(value = "/accesoriosModalCoti", method = RequestMethod.GET)
	public @ResponseBody Object getAccesoriosModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {


			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			String nroConsecutivo = request.getParameter("consecutivo");

			return cotizacionService.getAccesoriosModal(nroCotizacion, nroConsecutivo, getEntorno(request), getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos de cotizacion de certificado", e);
			return "La cotizacion no posee accesorios.";
		}

	}
	
	//modal bien
	@RequestMapping(value = "/bienModalCoti", method = RequestMethod.GET)
	public @ResponseBody Object getBienModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {


			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			String nroConsecutivo = request.getParameter("consecutivo");
			String ramo = request.getParameter("ramo");

			return cotizacionService.getBienModal(nroCotizacion, nroConsecutivo, ramo, getEntorno(request), getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los bienes de cotizacion", e);
			return "La cotizacion no posee bienes.";
		}

	}
	
	//modal direcciones
	@RequestMapping(value = "/direccionesModalCoti", method = RequestMethod.GET)
	public @ResponseBody Object getDireccionesModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {


			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			String nroConsecutivo = request.getParameter("consecutivo");
			String ramo = request.getParameter("ramo");
			String bien = request.getParameter("bien");

			return cotizacionService.getDatosDireccionesCotizacionesHome(nroCotizacion, nroConsecutivo,bien, ramo, getEntorno(request), getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los bienes de cotizacion", e);
			return "El bien no posee direcciones.";
		}

	}
	
	
	
	
	//modal objetos
	@RequestMapping(value = "/objetosModalCoti", method = RequestMethod.GET)
	public @ResponseBody Object getObjetosModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {


			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nroCotizacion = request.getParameter("cotizacion");
			String nroConsecutivo = request.getParameter("consecutivo");
			String bien = request.getParameter("bien");

			return cotizacionService.getDatosObjetosCotizacionesHome(nroCotizacion, nroConsecutivo,bien,getEntorno(request), getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los objetos de cotizacion", e);
			return "El bien no posee objetos.";
		}

	}
	
	
	
	
	
	//modal objetos
		@RequestMapping(value = "/coberturasModalCoti", method = RequestMethod.GET)
		public @ResponseBody Object getCoberturasModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
			
			Map<String, Object> mapa = new HashMap<String, Object>() ;
			try {


				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
				
				String nroCotizacion = request.getParameter("cotizacion");
				String nroConsecutivo = request.getParameter("consecutivo");
				String bien = request.getParameter("bien");

				return cotizacionService.getDatosCoberturasCotizacionesHome(nroCotizacion, nroConsecutivo,bien,getEntorno(request), getUser(request));
		
			} catch (Exception e) {
				logger.error(getUserLog(request) + "Exploto al mostrar los objetos de cotizacion", e);
				return "El bien no posee coberturas.";
			}

		}
		
		
		
		
		
		
		//modal objetos
			@RequestMapping(value = "/beneficiarioModalCoti", method = RequestMethod.GET)
			public @ResponseBody Object getBeneficiarioModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				
				Map<String, Object> mapa = new HashMap<String, Object>() ;
				try {


					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					
					String nroCotizacion = request.getParameter("cotizacion");
					String nroConsecutivo = request.getParameter("consecutivo");
					String bien = request.getParameter("bien");

					return cotizacionService.getDatosBeneficiarioCotizacionesHome(nroCotizacion, nroConsecutivo,bien,getEntorno(request), getUser(request));
			
				} catch (Exception e) {
					logger.error(getUserLog(request) + "Exploto al mostrar los objetos de cotizacion", e);
					return "El bien no posee beneficiario.";
				}

			}
			
			
			
			//modal titulares
			@RequestMapping(value = "/titularsModalCoti", method = RequestMethod.GET)
			public @ResponseBody Object getTitularesModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				
				Map<String, Object> mapa = new HashMap<String, Object>() ;
				try {


					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					
					String nroCotizacion = request.getParameter("cotizacion");
					String nroConsecutivo = request.getParameter("consecutivo");

					return cotizacionService.getDatosTitularesCotizacionesHome(nroCotizacion, nroConsecutivo,getEntorno(request), getUser(request));
			
				} catch (Exception e) {
					logger.error(getUserLog(request) + "Exploto al mostrar los titulares de cotizacion", e);
					return "El bien no posee titulares.";
				}

			}
			
			
			//modal reaseguro
			@RequestMapping(value = "/reaseguroModalCoti", method = RequestMethod.GET)
			public @ResponseBody Object getReaseguroModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				
				Map<String, Object> mapa = new HashMap<String, Object>() ;
				try {
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					
					String nroCotizacion = request.getParameter("cotizacion");
					String nroConsecutivo = request.getParameter("consecutivo");

					return cotizacionService.getDatosReaseguroCotizacionesHome(nroCotizacion, nroConsecutivo,getEntorno(request), getUser(request));
			
				} catch (Exception e) {
					logger.error(getUserLog(request) + "Exploto al mostrar los titulares de reaseguro", e);
					return "El bien no posee reaseguro.";
				}

			}
			
			
			//modal titulares
			@RequestMapping(value = "/reaseguroDetalleModalCoti", method = RequestMethod.GET)
			public @ResponseBody Object getReaseguroDetalleModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				
				Map<String, Object> mapa = new HashMap<String, Object>() ;
				try {
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					
					String nroCotizacion = request.getParameter("cotizacion");
					String nroConsecutivo = request.getParameter("consecutivo");
					String fecha = request.getParameter("fecha");
					String programa = request.getParameter("programa");
					String grupo = request.getParameter("grupo");
					String moneda = request.getParameter("moneda");

					return cotizacionService.getDetalleReaseguroCotizacionesHome(nroCotizacion, nroConsecutivo, moneda, fecha, programa, grupo, getEntorno(request), getUser(request));
			
				} catch (Exception e) {
					logger.error(getUserLog(request) + "Exploto al mostrar los titulares de reaseguro", e);
					return "El bien no posee coberturas del reaseguro.";
				}

			}
			
			
			
			//modal lienas
			@RequestMapping(value = "/lineasModalCoti", method = RequestMethod.GET)
			public @ResponseBody Object getLineasModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				
				Map<String, Object> mapa = new HashMap<String, Object>() ;
				try {
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					
					String nroCotizacion = request.getParameter("cotizacion");
					String nroConsecutivo = request.getParameter("consecutivo");

					return cotizacionService.getLineasCotizacionesHome(nroCotizacion, nroConsecutivo, getEntorno(request),getUser(request));
			
				} catch (Exception e) {
					logger.error(getUserLog(request) + "Exploto al mostrar las lineas de la coti", e);
					return "El bien no posee lineas.";
				}

			}


			//modal clausulas
			@RequestMapping(value = "/clausulasModalCoti", method = RequestMethod.GET)
			public @ResponseBody Object getClausulasModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				
				Map<String, Object> mapa = new HashMap<String, Object>() ;
				try {
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					
					String nroCotizacion = request.getParameter("cotizacion");
					String nroConsecutivo = request.getParameter("consecutivo");
					String linea = request.getParameter("linea");
			
					return cotizacionService.getClausulasCotizacionesHome(nroCotizacion, nroConsecutivo,linea, getEntorno(request),getUser(request));
			
				} catch (Exception e) {
					logger.error(getUserLog(request) + "Exploto al mostrar las clausulas de la coti", e);
					return "El bien no posee clausulas.";
				}
			
			}
			
			//modal clausulas
			@RequestMapping(value = "/textoClausulasModalCoti", method = RequestMethod.GET)
			public @ResponseBody Object getTextoClausulasModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				
				Map<String, Object> mapa = new HashMap<String, Object>() ;
				try {
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					
					String nroCotizacion = request.getParameter("cotizacion");
					String nroConsecutivo = request.getParameter("consecutivo");
					String codClausula = request.getParameter("codClausula");
			
					return cotizacionService.getTextoClausulasCotizacionesHome(nroCotizacion, nroConsecutivo, codClausula,getEntorno(request),getUser(request));
			
				} catch (Exception e) {
					logger.error(getUserLog(request) + "Exploto al mostrar las clausulas de la coti", e);
					return "El bien no posee textos de la  clausulas.";
				}
			
			}
			
			
			
			//modal fuera de pauta
			@RequestMapping(value = "/fueraPautaModalCoti", method = RequestMethod.GET)
			public @ResponseBody Object getFueraPautaModalCoti(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				
				Map<String, Object> mapa = new HashMap<String, Object>() ;
				try {
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					
					String nroCotizacion = request.getParameter("cotizacion");
					String nroConsecutivo = request.getParameter("consecutivo");
			
					return cotizacionService.getFueraDePautaCotizacionesHome(nroCotizacion, nroConsecutivo, getEntorno(request),getUser(request));
			
				} catch (Exception e) {
					logger.error(getUserLog(request) + "Exploto al mostrar las clausulas de la coti", e);
					return "El bien no posee fuera de pautas.";
				}
			
			}
			
			
			
			
			
}