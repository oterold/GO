package com.pseguros.pes.controller.pub.home;

import java.io.File;
import java.io.FileInputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.excel.util.ExcelUtil;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.BandejaSiniestroService;
import com.pseguros.pes.util.Dateutils;

@Controller
public class BandejaSiniestroPubController extends AbstractPubController{
	
	private static final Logger logger = LoggerFactory.getLogger(AyudaPubController.class);
	private static final String PANTALLA_BANDEJA_SINIESTRO = "partials/pes/home/bandejaSiniestro/BandejaSiniestroTemplate";
	private static final String PANTALLA_BANDEJA_SINIESTRO_B = "partials/pes/home/bandejaSiniestroHomeDos/BandejaSiniestroDosTemplate";


	@Autowired
	private ExecuteService executeService;
	@Autowired
	private BandejaSiniestroService bandeSiniestroService;

	@RequestMapping(value = "/bandejaSiniestroB", method = RequestMethod.GET)
	public ModelAndView bandejaSiniestro(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeAyuda");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "");
		
			return new ModelAndView(PANTALLA_BANDEJA_SINIESTRO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeNid", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	

	@RequestMapping(value = "/bandejaSiniestro", method = RequestMethod.GET)
	public ModelAndView bandejaSiniestroB(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeAyuda");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioBandejaSiniestro()");
			Future<ArrayList> datosBandeja =bandeSiniestroService.getListaBandeja(getEntorno(request), getUser(request));
			mapa.put("datosBandeja", datosBandeja.get());
			mapa.put("cantidadBandeja",datosBandeja.get().size());

			return new ModelAndView(PANTALLA_BANDEJA_SINIESTRO_B, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeNid", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}



//llama al detalle de la tarea
	@RequestMapping(value = "/detalleTarea", method = RequestMethod.GET)
	public @ResponseBody
	Object getDetalleTarea(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal clientes");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String type = request.getParameter("type");
			String key = request.getParameter("key");


			return bandeSiniestroService.getDetalleTarea(type,key,getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar el detalle de la tarea", e);
		}

		return "No se encontro un detalle de la tarea";
	}

	

	
	
	//------------------------------------ pantalla JSON cuand se carga el modal de NOTAS ---------------------------- //
	@RequestMapping(value = "/datosNotasModalBandejaSiniestro", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosNotasModalBandejaSiniestro(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal inspecciones");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String siniestro = request.getParameter("siniestro");
			String annio = request.getParameter("annio");
			String ramo = request.getParameter("ramo");

			return bandeSiniestroService.getDatosNotas(siniestro, ramo, annio, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las notas siniestro", e);
		}

		return "El siniestro no posee notas";
	}
	
	



	
	//------------------------------------ escalamientos modal ---------------------------- //
	
	@RequestMapping(value = "/escalamientosModal", method = RequestMethod.GET)
	public @ResponseBody Object getEscalamientos(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		try {

			logger.debug("Inicio metodo detalleComponentes");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String type = request.getParameter("type");
			String key = request.getParameter("key");
			String act = request.getParameter("act");
			String noti = request.getParameter("noti");
			
			return bandeSiniestroService.getEscalamientos(type,key,act,noti, getEntorno(request),getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los escalamientos de wf", e);
		}
		return "El siniestro no posee escalamientos";
		

	}
	
	
	
	
	
	
	//------------------------------------ reasignaciones modal ---------------------------- //
	
	@RequestMapping(value = "/reasignacionesWf", method = RequestMethod.GET)
	public @ResponseBody Object getReasignacionesWf(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		try {

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String type = request.getParameter("type");
			String key = request.getParameter("key");
			String act = request.getParameter("act");
			
			return bandeSiniestroService.getReasignaciones(type,key,act,getEntorno(request),getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los escalamientos de wf", e);
		}
		return "El siniestro no posee escalamientos";
		

	}
	
	
	
	//------------------------------------ anticipos modal ---------------------------- //
	
	@RequestMapping(value = "/anticiposWf", method = RequestMethod.GET)
	public @ResponseBody Object getAnticiposWf(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		try {

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String anticipo = request.getParameter("anticipo");
			return bandeSiniestroService.getAnticipos(anticipo,getEntorno(request),getUser(request));
	
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los escalamientos de wf", e);
		}
		return "El siniestro no posee anticipos";
		

	}
	
	
	
	
	
	@RequestMapping("/descargarArchivoExcelBandejaSiniestro")
	public ModelAndView descargarArchivoExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();
		
		try {

			logger.debug("Mostrar Pantalla Poliza Home");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));
			mapa.put("entorno", getEntorno(request));
			
			
			Future<ArrayList> datosBandeja =bandeSiniestroService.getListaBandeja(getEntorno(request), getUser(request));
				

				ExcelUtil eu = new ExcelUtil();
				Map beans=new HashMap();
				
				Date date = new Date();
				DateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				beans.put("fechaActual",dateFormat.format(date) +" - "+hourFormat.format(date)); 
				
				String archivoXLS = "/tmp/"+new Date().getTime() + ".xls";
				String tipoArchivo ="";
				beans.put("detalle",datosBandeja.get());
				beans.put("cantidadBandeja", datosBandeja.get().size());
				
				
				eu.ejecutar(beans, "templateBandejaSiniestro.xls", archivoXLS);
				tipoArchivo = "BandejaSiniestro";
				


			
			File file = new File( archivoXLS);
			
			response.setContentType("application/xls");
			
			response.setContentLength((int) file.length());
			
			response.setHeader("Content-Disposition", "attachment; filename=\"" + "excel"+tipoArchivo+"_"+Dateutils.toCustomFormat(Dateutils.getNow())+".xls" + "\"");

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
	
	
	
	
	
	
	
	
	
	
	
	
	

}


