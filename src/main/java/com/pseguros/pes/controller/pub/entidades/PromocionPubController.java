package com.pseguros.pes.controller.pub.entidades;

import java.io.File;
import java.io.FileInputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.bean.PromocionesEmisionList;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.dto.RamoDTO;
import com.pseguros.pes.dto.RamoTarifaDTO;
import com.pseguros.pes.dto.TarifaDTO;
import com.pseguros.pes.excel.util.ExcelUtil;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.PromocionService;
import com.pseguros.pes.util.Dateutils;

@Controller
public class PromocionPubController extends AbstractPubController {

private static final Logger logger = LoggerFactory.getLogger(PromocionPubController.class);
	
	private static final String PANTALLA_PROMOCIONES = "partials/pes/entidades/promociones/promosionesHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	
	@Autowired
	private PromocionService promosionService;
	
	@RequestMapping(value = "/homePromociones", method = RequestMethod.GET)
	public ModelAndView homePromociones(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			String tipo = "PR";
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			String promocion = request.getParameter("promocion");
			agregarBreadcrumb(request, promocion);
			//Future<ArrayList> productoresPromocion = promosionService.getProductoresPromocion(promocion, getEntorno(request), getUser(request));
			Future<PromocionesEmisionList> cabeceraPromocion = promosionService.getCabeceraPromocion(promocion, getEntorno(request), getUser(request));
			Future<ArrayList> valoresPromocion = promosionService.getValores(promocion, getEntorno(request), getUser(request));
			
			while (!(cabeceraPromocion.isDone() && valoresPromocion.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.put("promocion", promocion);
			mapa.put("funcionOnload", "");
			//mapa.put("datosProductor", productoresPromocion.get());
			mapa.put("datosCabeceraDpro", cabeceraPromocion.get().getDpro());
			mapa.put("datosCabeceraMensaje", cabeceraPromocion.get().getMensaje());
			mapa.put("datosCabeceraFecha", cabeceraPromocion.get().getFecha());
			mapa.put("datosCabeceraUserModifico", cabeceraPromocion.get().getUser());
			mapa.put("datosValores", valoresPromocion.get());
			
			mapa.put("campo1", "Campo1");
			mapa.put("campo2", "Campo2");
			mapa.put("campo3", "Campo3");
			mapa.put("campo4", "Campo4");
			mapa.put("campo5", "Campo5");
			mapa.put("campo6", "Campo6");

			
			return new ModelAndView(PANTALLA_PROMOCIONES, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las promociones", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	@RequestMapping(value = "/datoRamosTarifas", method = RequestMethod.GET)
	public @ResponseBody Object getDatosRamosTarifas(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal cronograma");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String promocion = request.getParameter("promocion");
			
			List datos = promosionService.buscarRamosTarifas(promocion,getEntorno(request), getUser(request));
			
			List tarifas = null;
			tarifas = getListaRamoPorTarifas(datos, session);
			
			return tarifas;
			
		
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los ramos de promocion", e);
		}

		return "Error al ejecutar el procedimiento";
	}
	
	@RequestMapping(value = "/datoTarifasPorRamo", method = RequestMethod.GET)
	public @ResponseBody Object getDatoTarifasPorRamo(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal cronograma");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String promocion = request.getParameter("promocion");
			String ramo= request.getParameter("ramo");
			
			List datos = promosionService.buscarRamosTarifas(promocion,getEntorno(request), getUser(request));
			
			List tarifas = null;
			tarifas = getListaSelectorTarifas(datos, session, ramo);
			
			return tarifas;
			
		
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los ramos de promocion", e);
		}

		return "Error al ejecutar el procedimiento";
	}
	
	
	public List getListaRamoPorTarifas(List datos, HttpSession session){
		
		Map<RamoDTO, List> ramosTarifas = new HashMap<RamoDTO, List>();
		
		Map<String, List> camposTarifa = new HashMap();
		RamoDTO ramoDTO;
		
		List campos = null;
		
		for (Iterator iterator = datos.iterator(); iterator.hasNext();) {
			Map<RamoDTO, String> tarifa = (HashMap<RamoDTO, String>) iterator.next();
			
			ramoDTO = new RamoDTO();
			ramoDTO.setCodigo(tarifa.get("P_TF_CTDF_CTDF_CARP_CD_RAMO"));
			ramoDTO.setDescripcion(tarifa.get("P_TF_CTDF_CARP_DE_RAMO"));
			String ramo1 = tarifa.get("P_TF_CTDF_CTDF_CARP_CD_RAMO");
					
			if (ramosTarifas.containsKey(ramoDTO)) {
				List listaTmp = ramosTarifas.get(ramoDTO);
				listaTmp.add(tarifa);
				ramosTarifas.put(ramoDTO, listaTmp);
				
				String dato1= tarifa.get("P_TF_CTDF_CRTB_DE_DATO1");
				String dato2= tarifa.get("P_TF_CTDF_CRTB_DE_DATO2");
				String dato3= tarifa.get("P_TF_CTDF_CRTB_DE_DATO3");
				String dato4= tarifa.get("P_TF_CTDF_CRTB_DE_DATO4");
				String dato5= tarifa.get("P_TF_CTDF_CRTB_DE_DATO5");
				String dato6= tarifa.get("P_TF_CTDF_CRTB_DE_DATO6");
				String ramo = tarifa.get("P_TF_CTDF_CTDF_CARP_CD_RAMO");
				campos = new ArrayList();
				
				campos.add(dato1);
				campos.add(dato2);
				campos.add(dato3);
				campos.add(dato4);
				campos.add(dato5);
				campos.add(dato6);
				campos.add(ramo);
				
				camposTarifa.put(tarifa.get("P_TF_CTDF_CTDF_CD_TARIFA"), campos);
				
			}else {
			
				List listaTmp = new ArrayList();
				listaTmp.add(tarifa);
				ramosTarifas.put(ramoDTO, listaTmp);
				
				String ramo = tarifa.get("P_TF_CTDF_CTDF_CARP_CD_RAMO");

				String dato1= tarifa.get("P_TF_CTDF_CRTB_DE_DATO1");
				String dato2= tarifa.get("P_TF_CTDF_CRTB_DE_DATO2");
				String dato3= tarifa.get("P_TF_CTDF_CRTB_DE_DATO3");
				String dato4= tarifa.get("P_TF_CTDF_CRTB_DE_DATO4");
				String dato5= tarifa.get("P_TF_CTDF_CRTB_DE_DATO5");
				String dato6= tarifa.get("P_TF_CTDF_CRTB_DE_DATO6");
				
				campos = new ArrayList();
				
				campos.add(dato1);
				campos.add(dato2);
				campos.add(dato3);
				campos.add(dato4);
				campos.add(dato5);
				campos.add(dato6);
				campos.add(ramo);
				
			
			}
			
		}
				
		List tarifas = new ArrayList();
		Map map = new HashMap();
	
		Iterator entries = ramosTarifas.entrySet().iterator();
		
		RamoTarifaDTO ramoTarifas;
		while (entries.hasNext()) {
		    Map.Entry entry = (Map.Entry) entries.next();
		    ramoTarifas = new RamoTarifaDTO();
		    
		    ramoTarifas.setRamoDTO((RamoDTO) entry.getKey());
		    ramoTarifas.setTarifas((List) entry.getValue());
		    tarifas.add(ramoTarifas);
		}
		
		Collections.sort(tarifas, new Comparator() {
			@Override
			public int compare(Object o1, Object o2) {
				return new Integer(((RamoTarifaDTO)o1).getRamoDTO().getCodigo()).compareTo(new Integer(((RamoTarifaDTO)o2).getRamoDTO().getCodigo()));
			}
		});
		

		return tarifas;
		
		
	}
	
	
	public List getListaSelectorTarifas(List datos, HttpSession session, String ramo){
		
		Map<String, List> ramosTarifas = new HashMap<String, List>();
		
		Map<String, List> camposTarifa = new HashMap();
		RamoDTO ramoDTO;
		
		List<TarifaDTO> listaTarifa = new ArrayList();
		
		List campos = null;
		
		for (Iterator iterator = datos.iterator(); iterator.hasNext();) {
			Map<String, String> tarifa = (HashMap<String, String>) iterator.next();
			
			ramoDTO = new RamoDTO();
			ramoDTO.setCodigo(tarifa.get("P_TF_CTDF_CTDF_CARP_CD_RAMO"));
			ramoDTO.setDescripcion(tarifa.get("P_TF_CTDF_CARP_DE_RAMO"));
				
			if(ramo.equals(tarifa.get("P_TF_CTDF_CTDF_CARP_CD_RAMO"))){
				TarifaDTO tarifaDTO = new TarifaDTO();
				tarifaDTO.setCodigo(tarifa.get("P_TF_CTDF_CTDF_CD_TARIFA"));
				tarifaDTO.setDescripcion(tarifa.get("P_TF_CTDF_CTDF_DE_TARIFA"));
				
				listaTarifa.add(tarifaDTO);
								
				String dato1= tarifa.get("P_TF_CTDF_CRTB_DE_DATO1");
				String dato2= tarifa.get("P_TF_CTDF_CRTB_DE_DATO2");
				String dato3= tarifa.get("P_TF_CTDF_CRTB_DE_DATO3");
				String dato4= tarifa.get("P_TF_CTDF_CRTB_DE_DATO4");
				String dato5= tarifa.get("P_TF_CTDF_CRTB_DE_DATO5");
				String dato6= tarifa.get("P_TF_CTDF_CRTB_DE_DATO6");
				String ramo1 = tarifa.get("P_TF_CTDF_CTDF_CARP_CD_RAMO");
				campos = new ArrayList();
				
				campos.add(dato1);
				campos.add(dato2);
				campos.add(dato3);
				campos.add(dato4);
				campos.add(dato5);
				campos.add(dato6);
				campos.add(ramo);
				
				camposTarifa.put(tarifa.get("P_TF_CTDF_CTDF_CD_TARIFA"), campos);
				
			}
			
		}
		
		session.setAttribute("camposTarifa", camposTarifa);
		
		
		return listaTarifa;
		
		
	}
	
	
	
	//------------------------------------ visualizaciones Modal ---------------------------- //
	@RequestMapping(value = "/visualizacionesModal", method = RequestMethod.GET)
	public @ResponseBody
	Object getVisualizacionesModal(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String promocion = request.getParameter("promocion");
			
			return promosionService.getVisualizaciones(promocion, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar las promociones error :3546180", e);
		}

		return "no posee visualizaciones";
	}
	
	
	
	
	@RequestMapping("/descargarArchivoExcelPromocion")
	public ModelAndView descargarArchivoExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();
		mapa.put("estadoCheckEntidadProductoresHome", "");
		
		
		try {

			logger.debug("Mostrar Pantalla Poliza Home");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("entorno", getEntorno(request));
			
			
			String tipo = "PR";
			String promocion = request.getParameter("promocion");
			String ramo = request.getParameter("ramo");
			Future<ArrayList> productoresPromocion = promosionService.getProductoresPromocion(promocion, ramo, getEntorno(request), getUser(request));
			Future<ArrayList> tarifasPromocion = promosionService.getTarifas(promocion, ramo, "",tipo, getEntorno(request), getUser(request));
			Future<PromocionesEmisionList> cabeceraPromocion = promosionService.getCabeceraPromocion(promocion, getEntorno(request), getUser(request));
				

				ExcelUtil eu = new ExcelUtil();
				Map beans=new HashMap();
				
				Date date = new Date();
				DateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				beans.put("fechaActual",dateFormat.format(date) +" - "+hourFormat.format(date)); 
				
				String archivoXLS = "/tmp/"+new Date().getTime() + ".xls";
				String tipoArchivo ="";
				//beans.put("asignacion",productoresPromocion.get());
				beans.put("tarifas", tarifasPromocion.get());
				beans.put("cantidaTarifas", tarifasPromocion.get().size());
				beans.put("nombrePromocion", promocion);
				
				
				eu.ejecutar(beans, "templatePromocion.xls", archivoXLS);
				tipoArchivo = "Promocion";
				


			
			File file = new File( archivoXLS);
			
			response.setContentType("application/xls");
			
			response.setContentLength((int) file.length());
			
			response.setHeader("Content-Disposition", "attachment; filename=\"" + "Promocion"+promocion+tipoArchivo+"_"+Dateutils.toCustomFormat(Dateutils.getNow())+".xls" + "\"");

			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
			
			FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
			
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Se ha producido un error al querer descargar el archivo de poliza", e);
			mapa.put("funcionOnload","");
			mapa.put("errorMsg", "Se ha producido un error al querer descargar el archivo de poliza");
			return new ModelAndView(PANTALLA_ERROR, mapa);
		}
		return null;
	}
	
	
	
	
	@RequestMapping(value = "/datoTarifasPromocion", method = RequestMethod.GET)
	public @ResponseBody Object getDatoTarifasPromocion(HttpSession session, HttpServletRequest request) throws Exception {
		Map mapa = new HashMap();
		
		try {
			logger.debug("inicio el metodo datoTarifasPromocion");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String tipo= "PR";
			String promocion = request.getParameter("promocion");
			String ramo = request.getParameter("ramo");
			String tarifa = request.getParameter("tarifa");
			
			
			Future<ArrayList> tarifasPromocion = promosionService.getTarifas(promocion, ramo, tarifa,tipo, getEntorno(request), getUser(request));

			while (!(tarifasPromocion.isDone())) {
				Thread.sleep(5);
			}
			
			Map<String, List> camposTarifa = (Map<String, List>) session.getAttribute("camposTarifa");
			
			for (Entry<String, List> entry : camposTarifa.entrySet()) {
				if(entry.getKey().equals(tarifa)){
					mapa.put("campo1", entry.getValue().get(0));
					mapa.put("campo2", entry.getValue().get(1));
					mapa.put("campo3", entry.getValue().get(2));
					mapa.put("campo4", entry.getValue().get(3));
					mapa.put("campo5", entry.getValue().get(4));
					mapa.put("campo6", entry.getValue().get(5));

					
				}
			}
			
			return tarifasPromocion.get();

		
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las tarifas de la promocion", e);
		}

		return "Error al ejecutar el procedimiento";
	}
	
	@RequestMapping(value = "/datoTarifasCamposPromocion", method = RequestMethod.GET)
	public @ResponseBody Object datoTarifasCamposPromocion(HttpSession session, HttpServletRequest request) throws Exception {
		List campos = new ArrayList();
		
		try {
			logger.debug("inicio el metodo datoTarifasPromocion");
			
			String tarifa = request.getParameter("tarifa");
			
			
			
			Map<String, List> camposTarifa = (Map<String, List>) session.getAttribute("camposTarifa");
			
			for (Entry<String, List> entry : camposTarifa.entrySet()) {
				if(entry.getKey().equals(tarifa)){
					campos.add( entry.getValue().get(0));
					campos.add( entry.getValue().get(1));
					campos.add( entry.getValue().get(2));
					campos.add(entry.getValue().get(3));
					campos.add( entry.getValue().get(4));
					campos.add( entry.getValue().get(5));

					
				}
			}
			
			return campos;

		
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las tarifas de la promocion", e);
		}

		return "Error al ejecutar el procedimiento";
	}
	
	
	@RequestMapping(value = "/datoUtilizacionPromocion", method = RequestMethod.GET)
	public @ResponseBody Object getDatoUtilizacionPromocion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo datoTarifasPromocion");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String promocion = request.getParameter("promocion");
			String ramo = request.getParameter("ramo");
			
			Future<ArrayList> productoresPromocion = promosionService.getProductoresPromocion(promocion, ramo, getEntorno(request), getUser(request));

			while (!(productoresPromocion.isDone())) {
				Thread.sleep(5);
			}
			
			return productoresPromocion.get();

		
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las tarifas de la promocion", e);
		}

		return "Error al ejecutar el procedimiento";
	}
	
	
	@RequestMapping(value = "/datoTarifaVentana", method = RequestMethod.GET)
	public @ResponseBody Object getDatoTarifaVentana(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal cronograma");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String registroTarifa = request.getParameter("registroTarifa");
			
			List datos = promosionService.buscarTarifaVentana(registroTarifa,getEntorno(request), getUser(request));
			
			
			
			return datos;
			
		
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar la ventana de tarifa", e);
		}

		return "Error al ejecutar el procedimiento";
	}
	
	
	
	
}
