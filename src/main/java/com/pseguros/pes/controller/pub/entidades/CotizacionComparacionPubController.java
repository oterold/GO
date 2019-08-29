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

import com.pseguros.pes.bean.CoberturaComparacionBean;
import com.pseguros.pes.bean.ComparacionCotizacionBean;
import com.pseguros.pes.bean.ComparacionTarifasBean;
import com.pseguros.pes.bean.ComponenteComparacionBean;
import com.pseguros.pes.bean.DatosInComparacionCotizacionBean;
import com.pseguros.pes.bean.ParametricoComparacionBean;
import com.pseguros.pes.bean.PlanPromoBean;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.CotizacionService;

/**
 * Compara dos cotizaciones, compara cabecera, componentes , coberturas y certificados
 */
@Controller
public class CotizacionComparacionPubController  extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(CotizacionComparacionPubController.class);
	
	@Autowired
	private ExecuteService executeService;

	@Autowired
	private CotizacionService cotizacionService;
	
	
	/**
	 * Metodo para comparar las cabeceras
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/comparacionCotizacion", method = RequestMethod.GET)
	public @ResponseBody Object comparacionCabecera(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		try {

			logger.debug("Inicio metodo detalleCotizacion");

			DatosInComparacionCotizacionBean datosIn = obtenerDatosRequest(request);
			
			Future<ArrayList> listaCertificadosCotizacion1 = cotizacionService.getCertificadoCotizacion(datosIn.getCotizacionA(),datosIn.getCertificado(), getEntorno(request), getUser(request));	
			Future<ArrayList> listaCertificadosCotizacion2 = cotizacionService.getCertificadoCotizacion(datosIn.getCotizacionB(),datosIn.getCertificado(), getEntorno(request), getUser(request));	
				
			while (!(listaCertificadosCotizacion1.isDone())  && !(listaCertificadosCotizacion2.isDone())) {
				Thread.sleep(5);
			}
					
			return armarDatosSalida(listaCertificadosCotizacion1.get(),listaCertificadosCotizacion2.get(),datosIn.getCertificado());

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos comparados de la cabecera de la cotizacion", e);
			return "" + e.getMessage();
		}

	}


	/**
	 * Metodo para comparar las cabeceras
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/comparacionCotizacionPlanes", method = RequestMethod.GET)
	public @ResponseBody Object comparacionPlanes(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		try {

			logger.debug("Inicio metodo comparacionPlanes");

			DatosInComparacionCotizacionBean datosIn = obtenerDatosRequest(request);

			return agrupamiento(
								getPlanesFromDB(request, datosIn , datosIn.getCotizacionA()), 
								getPlanesFromDB(request, datosIn , datosIn.getCotizacionB()));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos comparados de la cabecera de la cotizacion", e);
			return "" + e.getMessage();
		}

	}
	
	
	
	
	
	@RequestMapping(value = "/comparacionCotizacionParametricos", method = RequestMethod.GET)
	public @ResponseBody Object compararParametricos(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Inicio metodo compararComponentes");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String cotizacionA = request.getParameter("cotizacionA");
			String cotizacionB = request.getParameter("cotizacionB");
			String certificado = request.getParameter("certificado");
			String bien = request.getParameter("bien");

			
			
			List datoA = new ArrayList();
			List datoB = new ArrayList();
			
			try {
				datoA = pasarAListaParametricos(cotizacionService.getParametricosParaComparacion(cotizacionA,certificado,bien,getEntorno(request), getUser(request)),cotizacionA,certificado,0);	
			} catch (Exception e) {
			}
			
			try {
				datoB = pasarAListaParametricos(cotizacionService.getParametricosParaComparacion(cotizacionB,certificado,bien,getEntorno(request), getUser(request)),cotizacionB,certificado,1);	
			} catch (Exception e) {
			}
					
				
			return agrupamientoParametricos(datoA,datoB);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos comparados de la cabecera de la cotizacion", e);
			return "" + e.getMessage();
		}


	}

	
	
	private List pasarAListaParametricos(List datoB, String cotizacion, String certificado,int valor) {
		
		List lista = new ArrayList();
		for (Iterator iterator = datoB.iterator(); iterator.hasNext();) {
			Map<String,Object> datosCoti1 = (Map<String,Object>) iterator.next();
				lista.add(new ParametricoComparacionBean(datosCoti1,cotizacion,certificado,valor));
		}
		return lista;

	}
	


	/**
	 * Metodo para comparar las cabeceras
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/comparacionCotizacionComponentes", method = RequestMethod.GET)
	public @ResponseBody Object compararComponentes(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		try {

			logger.debug("Inicio metodo compararComponentes");

			DatosInComparacionCotizacionBean datosIn = obtenerDatosRequest(request);
				
			return agrupamientoComponentes(
										getComponenetesFromDB(request, datosIn, datosIn.getCotizacionA(),0),
										getComponenetesFromDB(request, datosIn, datosIn.getCotizacionB(),1));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos comparados de la cabecera de la cotizacion", e);
			return "" + e.getMessage();
		}


	}


	private List getComponenetesFromDB(HttpServletRequest request, DatosInComparacionCotizacionBean datosIn, String coti,int valor) {
		
		try {
			return   pasarAListaComponentes(
								cotizacionService.getComponentesParaComparacion(coti,datosIn.getCertificado(),datosIn.getPlan() ,datosIn.getPromo(),getEntorno(request), getUser(request)),
								coti,
								datosIn.getCertificado(),valor);	
		} catch (Exception e) {
			logger.error("Error" , e);
		}
		return new ArrayList();
	}

	
	/**
	 * Metodo para comparar las cabeceras
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/comparacionCotizacionCoberturas", method = RequestMethod.GET)
	public @ResponseBody Object compararCoberturas(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		try {

			logger.debug("Inicio metodo compararCoberturas");

			DatosInComparacionCotizacionBean datosIn = obtenerDatosRequest(request);
			
			return  agrupamientoCoberturas(
										getCoberturasFromDB(request, datosIn,datosIn.getCotizacionA(),0),
										getCoberturasFromDB(request, datosIn,datosIn.getCotizacionB(),1));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos comparados de la cabecera de la cotizacion", e);
			return "" + e.getMessage();
		}
	}


	/**
	 * Metodo para comparar las cabeceras
	 * @param session
	 * @param request
	 * @param locale
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/comparacionCotizacionTarifas", method = RequestMethod.GET)
	public @ResponseBody Object comparacionTarifas(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		try {

			logger.debug("Inicio metodo comparacionTarifas");

			DatosInComparacionCotizacionBean datosIn = obtenerDatosRequest(request);
		
			return  agrupamientoTarifas( 
										getTarifasFromDB(request, datosIn, datosIn.getCotizacionA(),0) ,
										getTarifasFromDB(request, datosIn, datosIn.getCotizacionB(),1));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos comparados de la cabecera de la cotizacion", e);
			return "" + e.getMessage();
		}
	}




	


	/******************************************************************************************************************************************
	 *  PRIVADOS
	 ******************************************************************************************************************************************/
	
	
	private List getCoberturasFromDB(HttpServletRequest request, DatosInComparacionCotizacionBean datosIn, String coti,int valor) {
		try {
			return pasarAListaCoberturas(
										cotizacionService.getCoberturasParaComparacion(
																					datosIn.getCotizacionA(),
																					datosIn.getCertificado(),
																					datosIn.getPlan() ,
																					datosIn.getPromo(),
																					getEntorno(request),
																					getUser(request)),
																					coti, 
																					datosIn.getCertificado(),valor);	
		} catch (Exception e) {
			logger.error("Errro al genera los datos" ,  e);
		}
		
		return new ArrayList();
	}

	
	
	
	
	
	private DatosInComparacionCotizacionBean obtenerDatosRequest(HttpServletRequest request) {
		
		EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
		
		// TODO Auto-generated method stub
		
		String cotizacionA= request.getParameter("cotizacionA");
		String cotizacionB = request.getParameter("cotizacionB");
		String consecutivo = request.getParameter("certificado");
		
		String plan = request.getParameter("plan");
		String promo = request.getParameter("promo");
		String tarifa = request.getParameter("tarifa");
		
		return new DatosInComparacionCotizacionBean(cotizacionA,cotizacionB,consecutivo,plan,promo, tarifa);
	}

	
	
	
	/**
	 * Armar datos salida para juntar las dos lista de componentes
	 * @param arrayList1
	 * @param arrayList2
	 * @param consecutivo
	 * @return
	 */
	private LinkedList<ComparacionCotizacionBean> armarDatosSalidaComponentes(List arrayList1, List arrayList2, String consecutivo) {
		
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




	
	private LinkedList<ComparacionCotizacionBean> armarDatosSalida(List arrayList1, List arrayList2, String consecutivo) {
		
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


	
	
	private List pasarALista(List datoB, String coti, String certificado) {
		
		List lista = new ArrayList();
		for (Iterator iterator = datoB.iterator(); iterator.hasNext();) {
			Map<String,Object> datosCoti1 = (Map<String,Object>) iterator.next();
				lista.add(new PlanPromoBean(datosCoti1,coti,certificado));
		}
		return lista;

	}
	
	
	private List pasarAListaComponentes(List datoB, String cotizacion, String certificado,int valor) {
		
		List lista = new ArrayList();
		for (Iterator iterator = datoB.iterator(); iterator.hasNext();) {
			Map<String,Object> datosCoti1 = (Map<String,Object>) iterator.next();
				lista.add(new ComponenteComparacionBean(datosCoti1,cotizacion,certificado,valor));
		}
		return lista;

	}
	
	private List pasarAListaCoberturas(List datoB, String cotizacion, String certificado,int valor) {
		
		List lista = new ArrayList();
		for (Iterator iterator = datoB.iterator(); iterator.hasNext();) {
			Map<String,Object> datosCoti1 = (Map<String,Object>) iterator.next();
				lista.add(new CoberturaComparacionBean(datosCoti1,cotizacion,certificado,valor));
		}
		return lista;

	}
	
	
	
	
	
	
	
	
	private Map agrupamiento(List datoA, List datoB) {

		Map datos = new HashMap();
	
		for (Iterator iterator = datoA.iterator(); iterator.hasNext();) {
			PlanPromoBean obj = (PlanPromoBean) iterator.next();
			List planes = new ArrayList();
			planes.add(obj);
			datos.put(obj.getPlan()+"_"+obj.getPromo(),planes);
		}
		
		for (Iterator iterator = datoB.iterator(); iterator.hasNext();) {
			PlanPromoBean obj = (PlanPromoBean) iterator.next();
			
			List planes = new ArrayList();
			if (datos.containsKey(obj.getPlan()+"_"+obj.getPromo())) {
				planes = (List) datos.get(obj.getPlan()+"_"+obj.getPromo());
			}
			planes.add(obj);
			datos.put(obj.getPlan()+"_"+obj.getPromo(),planes);
		}
		
		
		
		return datos;
	}

	
	
	private Map agrupamientoParametricos(List datoA, List datoB) {

		Map datos = new HashMap();
	
		for (Iterator iterator = datoA.iterator(); iterator.hasNext();) {
			ParametricoComparacionBean obj = (ParametricoComparacionBean) iterator.next();
			List planes = new ArrayList();
			planes.add(obj);
			datos.put(obj.getLabelCodigo(),planes);
		}
		
		for (Iterator iterator = datoB.iterator(); iterator.hasNext();) {
			ParametricoComparacionBean obj = (ParametricoComparacionBean) iterator.next();
			
			List planes = new ArrayList();
			if (datos.containsKey(obj.getLabelCodigo())) {
				planes = (List) datos.get(obj.getLabelCodigo());
			}
			planes.add(obj);
			datos.put(obj.getLabelCodigo(),planes);
		}
		
		
		
		return datos;
	}

	
	
	private Map agrupamientoComponentes(List datoA, List datoB) {

		Map datos = new HashMap();
	
		for (Iterator iterator = datoA.iterator(); iterator.hasNext();) {
			ComponenteComparacionBean obj = (ComponenteComparacionBean) iterator.next();
			List planes = new ArrayList();
			planes.add(obj);
			datos.put(obj.getCodigo(),planes);
		}
		
		for (Iterator iterator = datoB.iterator(); iterator.hasNext();) {
			ComponenteComparacionBean obj = (ComponenteComparacionBean) iterator.next();
			
			List planes = new ArrayList();
			if (datos.containsKey(obj.getCodigo())) {
				planes = (List) datos.get(obj.getCodigo());
			}
			planes.add(obj);
			datos.put(obj.getCodigo(),planes);
		}
		
		
		
		return datos;
	}

	
	

	private Object agrupamientoCoberturas(List datoA, List datoB) {
		Map datos = new HashMap();
		
		for (Iterator iterator = datoA.iterator(); iterator.hasNext();) {
			CoberturaComparacionBean obj = (CoberturaComparacionBean) iterator.next();
			List planes = new ArrayList();
			planes.add(obj);
			datos.put(obj.getCodigo(),planes);
		}
		
		for (Iterator iterator = datoB.iterator(); iterator.hasNext();) {
			CoberturaComparacionBean obj = (CoberturaComparacionBean) iterator.next();
			
			List planes = new ArrayList();
			if (datos.containsKey(obj.getCodigo())) {
				planes = (List) datos.get(obj.getCodigo());
			}
			planes.add(obj);
			datos.put(obj.getCodigo(),planes);
		}
		
		
		
		return datos;
	}

	
	
	private List getTarifasFromDB(HttpServletRequest request, DatosInComparacionCotizacionBean datosIn, String coti,int valor) {
			
			List datoB = new ArrayList();
			
			try {
				datoB = pasarAListaTarifas(cotizacionService.getTarifasParaComparacion(
																	coti,
																	datosIn.getCertificado(),
																	datosIn.getPlan() ,
																	datosIn.getPromo(),
																	datosIn.getTarifa(),
																	getEntorno(request), 
																	getUser(request)) , coti ,	datosIn.getCertificado(),valor );	
			} catch (Exception e) {
				logger.error("Errro general al comaprar" , e);
			}
			return datoB;
		}

	
	
	
	private List pasarAListaTarifas(List listaIn, String coti , String certificado,int valor) {
		
		List lista = new ArrayList();
		for (Iterator iterator = listaIn.iterator(); iterator.hasNext();) {
			Map<String,Object> datosCoti1 = (Map<String,Object>) iterator.next();
			lista.add(new ComparacionTarifasBean(datosCoti1,coti,certificado,valor));
		}
		return lista;

	}




	private Object agrupamientoTarifas(List datoA, List datoB) {
		Map datos = new HashMap();
		
		for (Iterator iterator = datoA.iterator(); iterator.hasNext();) {
			ComparacionTarifasBean obj = (ComparacionTarifasBean) iterator.next();
			List planes = new ArrayList();
			planes.add(obj);
			datos.put(obj.getCodigoTarifa(),planes);
		}
		
		for (Iterator iterator = datoB.iterator(); iterator.hasNext();) {
			ComparacionTarifasBean obj = (ComparacionTarifasBean) iterator.next();
			
			List planes = new ArrayList();
			if (datos.containsKey(obj.getCodigoTarifa())) {
				planes = (List) datos.get(obj.getCodigoTarifa());
			}
			planes.add(obj);
			datos.put(obj.getCodigoTarifa(),planes);
		}
		
		
		
		return datos;
	}


	
	private List getPlanesFromDB(HttpServletRequest request, DatosInComparacionCotizacionBean datosIn, String coti) {

		try {
			return  pasarALista(cotizacionService.getPlanPromoParaComparacion(coti, datosIn.getCertificado(), getEntorno(request), getUser(request)), coti, datosIn.getCertificado());
		} catch (Exception e) {
			logger.error("error" , e);
		}
		return new ArrayList();
	}

	
	



	
	
	
	
	
	
}
