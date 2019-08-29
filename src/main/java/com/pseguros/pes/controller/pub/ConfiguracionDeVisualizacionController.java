package com.pseguros.pes.controller.pub;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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

import com.pseguros.pes.bean.EsquemaBean;
import com.pseguros.pes.bean.OrigenesParam;
import com.pseguros.pes.bean.ProductoBean;
import com.pseguros.pes.bean.RamoBean;
import com.pseguros.pes.controller.pub.entidades.CertificadoPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.ConfiguracionVisualizacionService;

@Controller
public class ConfiguracionDeVisualizacionController  extends AbstractPubController{

	private static final Logger logger = LoggerFactory.getLogger(CertificadoPubController.class);
	private static final String PANTALLA_CONFIG = "partials/pes/home/configuracionDeVisualizacion/configuracionDeVisualizacionHomeTemplate";
	
	
	@Autowired
	private ExecuteService executeService;
	@Autowired
	private ConfiguracionVisualizacionService configVisual;
	
	@RequestMapping(value = "/configVisualizacion", method = RequestMethod.GET)
	public ModelAndView configVisualizacion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			Future<ArrayList> listaEsquemasDatosGenerales = configVisual.selectEsquemasGenerales(getEntorno(request),getUser(request));			

			Future<ArrayList> listaRamos = configVisual.selectorRamosConfig(getEntorno(request),getUser(request));			
			
			Future<ArrayList> listaOrigen = configVisual.selectorOrigenConfig(getEntorno(request),getUser(request));			
			
			
			
			while (!(listaRamos.isDone() && listaEsquemasDatosGenerales.isDone() && listaOrigen.isDone() )) {
				Thread.sleep(5);
			}
			
			mapa.put("funcionOnload","inicioConfigVisualizacion()");
			mapa.putAll(getDatosComunes(request));
			mapa.put("datosRamos", listaRamos.get());
			mapa.put("datosEsquemaGenerales", listaEsquemasDatosGenerales.get());
			mapa.put("datosOrigen", listaOrigen.get());
			
			
			return new ModelAndView(PANTALLA_CONFIG, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto visualizacionesConfig", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	

	@RequestMapping(value = "/datosProductoConfigVisualizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosProductoConfigVisualizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String ramo = request.getParameter("ramo");
			
			
			return configVisual.selectorProductoConfig(ramo,getEntorno(request), getUser(request));


		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron productos para su busqueda.";
	}
	
	
	@RequestMapping(value = "/valoresDefaultConfigVisualizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getValoresDefaultConfigVisualizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String origen = request.getParameter("origen");
			String ramo = request.getParameter("ramo");
			String producto = request.getParameter("producto");
			String formulario = request.getParameter("formulario");
			String auxiliar = request.getParameter("auxiliar");

			
			return configVisual.panelBValoresDefaultConfig(origen,ramo,producto,formulario,auxiliar,getEntorno(request), getUser(request));


		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron productos para su busqueda.";
	}
	
	

	@RequestMapping(value = "/datosRamosConfigVisualizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosRamosConfigVisualizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			return configVisual.selectorRamosConfigJson(getEntorno(request), getUser(request));


		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron ramos para su busqueda.";
	}

	
	@RequestMapping(value = "/datosTablaConfigVisualizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosTablaConfigVisualizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String esquema = request.getParameter("esquema");

			return configVisual.datosTablaConfigJson(esquema,getEntorno(request), getUser(request));


		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron esquemas para su busqueda.";
	}
	
	
	
	
	
	@RequestMapping(value = "/datosOrigenConfigVisualizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosOrigenConfigVisualizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			return configVisual.selectorOrigenConfig(getEntorno(request), getUser(request));


		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron esquemas para su busqueda.";
	}

	
	
	
	@RequestMapping(value = "/datosEsquemaConfigVisualizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosEsquemaConfigVisualizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String ramo = request.getParameter("ramo");
			String producto = request.getParameter("producto");
			
			
			return configVisual.selectorEsquemaConfig(ramo,producto,getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron esquemas para su busqueda.";
	}

	
	@RequestMapping(value = "/datosEsquemaGrillaProductoConfigVisualizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosEsquemaGrillaProductoConfigVisualizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String origen = request.getParameter("origen");
			String roles = request.getParameter("rol");
			String ramos = request.getParameter("ramos");

			
			return configVisual.selectorProductosRolesConfig(origen,roles,ramos,getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron esquemas para su busqueda.";
	}
	
	
	
	
	
	
	
	@RequestMapping(value = "/datosBusquedaPanelB", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosBusquedaPanelB(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String ramo = request.getParameter("ramo");
			String producto = request.getParameter("producto");
			String esquema = request.getParameter("esquema");
						
			
			return configVisual.busquedaPanelB(ramo,producto,getEntorno(request), getUser(request));


		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron datos parametricos para su busqueda.";
	}
	
	@RequestMapping(value = "/datosPlanesConfigVisualizacion", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosPlanesConfigVisualizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String ramo = request.getParameter("ramo");

			return configVisual.planesModalConfig(ramo,getEntorno(request), getUser(request));


		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron esquemas generales.";
	}
	
	
	
	@RequestMapping(value = "/datosPromocionesContenido", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosPromocionesonfigVisualizacion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			return configVisual.datosPromociones(getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron promociones.";
	}
	
	
	
	@RequestMapping(value = "/datosGeneralesPanelB", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosGeneralesPanelB(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String tabla = request.getParameter("tabla");
			String dominio = request.getParameter("dominio");
			String esquema = request.getParameter("esquema");

			return configVisual.datosGenerlaesPanelB(tabla,dominio,esquema,getEntorno(request), getUser(request));


		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar detalles", e);
		}

		return "No se encontraron datos generales para su busqueda.";
	}
	
	
}
