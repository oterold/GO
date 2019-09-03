package com.pseguros.pes.controller.pub.entidades;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.velocity.texen.util.FileUtil;
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

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.ftp.FTPExecutor;
import com.pseguros.pes.ftp.parametros.ParametrosSistema;
import com.pseguros.pes.ftp.parametros.ParametrosSistemaDelta;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.InspeccionesService;
import com.pseguros.pes.util.archivo.FileUtils;

@Controller
public class InspeccionesPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(InspeccionesPubController.class);
	
	private static final String PANTALLA_DIRECCIONES_INSPECCIONES = "partials/pes/entidades/poliza/inspecciones/inspeccionesHomeTemplate";


	@Autowired
	private ExecuteService executeService;
	
	@Autowired
	private InspeccionesService inspeccioneService;

	@RequestMapping(value = "/homeInspecciones", method = RequestMethod.GET)
	public ModelAndView homeInspeccionPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			logger.debug("Mostrar Pantalla homeInspecciones");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String ramo = request.getParameter("ramo");
			String poliza = request.getParameter("poliza");
			String sucursal = request.getParameter("sucursal");
			String inspeccion = request.getParameter("inspeccion");
			
			
			agregarBreadcrumb(request, "Inspeccion #" + inspeccion);
			mapa.putAll(getDatosComunes(request));
			
			Future<ArrayList> listaInspecciones = inspeccioneService.buscarInspeccionesPorPoliza(ramo, poliza, sucursal, inspeccion, getUser(request),getEntorno(request));
			
			
			while(!(listaInspecciones.isDone())){
				Thread.sleep(5);
			}
			
			mapa.put("InspeccionesPorPoliza",listaInspecciones.get());
			mapa.put("funcionOnload","inicioInspeccionesHome();");
			mapa.put("polizaInspec",poliza);
			mapa.put("ramoInspec",ramo);
			mapa.put("sucursalInspec", sucursal);
			mapa.put("valorInspeccion", inspeccion);
			
			
			mapa.put("scriptGrilla","");
			
			return new ModelAndView(PANTALLA_DIRECCIONES_INSPECCIONES, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+ "Exploto homeInspecciones", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

		
//panel A
	@RequestMapping(value = "/datosCabeceraInspec", method = RequestMethod.GET)
	public @ResponseBody Object getDatosCabeceraInspec(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			
			String inspeccion = request.getParameter("inspeccion");
			if(inspeccion == null || inspeccion.isEmpty()){
				inspeccion = "";
			}
			
			
			Future<ArrayList> listaInspecciones = inspeccioneService.buscarInspeccionesPorPoliza(ramo, poliza, sucursal, inspeccion, getUser(request),getEntorno(request));
			
			while(!(listaInspecciones.isDone())){
				Thread.sleep(5);
			}
			
			return listaInspecciones.get();

		} catch (Exception e) {
			logger.error(getUserLog(request)+ "Exploto al mostrar el detalle de las inspecciones", e);
			return "No se encontraron inspecciones";

		}
	}
	
	
	//panel C
		@RequestMapping(value = "/datosParametricosInspec", method = RequestMethod.GET)
		public @ResponseBody Object getDatosParametricosInspec(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
			try {
				logger.debug("inicio el metodo");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				
				String ramo = request.getParameter("ramo");
				String nroInspeccion = request.getParameter("nroInspeccion");
				String producto = request.getParameter("producto");
				
				Future<List> parametricosInspeccion = inspeccioneService.getDatosParametricosInspeccion(ramo, nroInspeccion, producto,/*consecutivo*/"0", getUser(request), getEntorno(request));
				
				while(!(parametricosInspeccion.isDone()))
				{
					Thread.sleep(5);
				}
				return parametricosInspeccion.get();
			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar el detalle de las inspecciones", e);
				return "No se encontraron datos parametricos de la inspeccion";

			}
		}
			
			
			@RequestMapping(value = "/existeInspecciones", method = RequestMethod.GET)
			public @ResponseBody Object getExisteInspecciones(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				try {
					logger.debug("inicio el metodo");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

					String poliza = request.getParameter("poliza");
					String ramo = request.getParameter("ramo");
					String sucursal = request.getParameter("sucursal");
					String inspeccion = request.getParameter("inspeccion");
					
					if(inspeccion == null || inspeccion.isEmpty()){
						inspeccion = "";
					}
					
					Future<ArrayList> listaInspecciones = inspeccioneService.buscarInspeccionesPorPoliza(ramo, poliza, sucursal, inspeccion, getUser(request),getEntorno(request));
					
					while(!(listaInspecciones.isDone())){
						Thread.sleep(5);
					}
					
					return listaInspecciones.get();

				} catch (Exception e) {
					logger.error(getUserLog(request)+"Exploto al mostrar el detalle de las inspecciones", e);

				}
				
				return "No se encontraron inspecciones";

			}
		
			
			@RequestMapping(value = "/datosVisitasInspeccion", method = RequestMethod.GET)
			public @ResponseBody Object getDatosVisitasInspeccion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				try {
					logger.debug("inicio el metodo");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

					String inspeccion = request.getParameter("inspeccion");
					
					Future<List> datoInspeccion = inspeccioneService.buscarVisitasPorInspeccion(inspeccion,getUser(request),getEntorno(request));
					
					while(!(datoInspeccion.isDone())){
						Thread.sleep(5);
					}
					
					return datoInspeccion.get();
				} catch (Exception e) {
					logger.error(getUserLog(request)+"Exploto al mostrar el detalle de visitas de la inspeccion ", e);

				}
				
				return "No se encontraron visitas de la inspeccion";

			}
			
			@RequestMapping(value = "/datosDocumentosInspeccion", method = RequestMethod.GET)
			public @ResponseBody Object getDatosDocumentosInspeccion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				try {
					logger.debug("inicio el metodo");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

					String inspeccion = request.getParameter("inspeccion");
					
					Future<List> datoInspeccion = inspeccioneService.buscarDocumentoPorInspeccion(inspeccion,getUser(request),getEntorno(request));
					
					while(!(datoInspeccion.isDone())){
						Thread.sleep(5);
					}
					
					return datoInspeccion.get();
				} catch (Exception e) {
					logger.error(getUserLog(request)+"Exploto al mostrar el detalle de documentos de la inspeccion ", e);

				}
				
				return "No se encontraron documentos de la inspeccion";

			}
			
			@RequestMapping(value = "/datosResultadoInspeccion", method = RequestMethod.GET)
			public @ResponseBody Object getDatosResultadoInspecion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
				try {
					logger.debug("inicio el metodo");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

					String ramo = request.getParameter("ramo");
					String nroInspeccion = request.getParameter("inspeccion");
					String producto = request.getParameter("producto");
					String sucursal = request.getParameter("sucursal");
					String tipo = request.getParameter("tipo");
					
					Future<List> resultadoInspeccion = inspeccioneService.getDatosResultadoInspeccion(ramo, nroInspeccion, producto, sucursal, tipo, getUser(request), getEntorno(request));
					
					while(!(resultadoInspeccion.isDone())){
						Thread.sleep(5);
					}
					
					return resultadoInspeccion.get();

				} catch (Exception e) {
					logger.error(getUserLog(request)+"Exploto al mostrar resultado de la inspecciones", e);
					
				}
				
				return "No se encontro resultados de la inspeccion";
			}
			
			
			
			
			
			
			@RequestMapping("/existeArchivoInspecciones")
			public @ResponseBody Object existeArchivoIndice(HttpServletRequest request, HttpServletResponse response) throws Exception {

				try {
					logger.debug("Metodo existeArchivoIndice: Se validara si el archivo existe");
					
					String tipo = request.getParameter("tipo");

					String nroOrden = request.getParameter("orden");
					String inspeccion = request.getParameter("inspeccion");

					
					File file = new File("/opt/tomcat/inspecciones/IP"+inspeccion+"/IP"+inspeccion+"_"+nroOrden+"."+tipo);
					
					
					response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
					
					response.setContentLength((int) file.length());
					
					response.setHeader("Content-Disposition", "attachment; filename=\""+inspeccion + "_" + nroOrden+"."+tipo + "\"");

					response.setHeader("Set-Cookie", "fileDownload=true; path=/");
					
					FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
					
					return null;
					
					
					
				} catch (Exception e) {
					logger.error(getUserLog(request)+"Se ha producido un error al querer validar archivo de poliza", e);
					return "Se ha producido un error al querer validar archivo de poliza";
				}
			}
			
			
			
			
			
			
}
