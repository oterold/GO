package com.pseguros.pes.controller.pub.busqueda;

import java.io.File;
import java.io.FileInputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ExecutionException;
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
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.bean.EstadoFiltroPantalla;
import com.pseguros.pes.bean.ResultadoBusquedaEntidad;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.dto.ClienteDTO;
import com.pseguros.pes.dto.CotizacionDTO;
import com.pseguros.pes.dto.NidDTO;
import com.pseguros.pes.dto.PolizaDTO;
import com.pseguros.pes.dto.ProductorDTO;
import com.pseguros.pes.dto.SiniestroDTO;
import com.pseguros.pes.excel.util.ExcelUtil;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorClienteService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorCotizacionService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorNidService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorPolizaService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorProductorService;
import com.pseguros.pes.service.entidades.busqueda.BuscadorSiniestroService;
import com.pseguros.pes.util.Dateutils;
import com.pseguros.pes.util.pantalla.UtilPantalla;
//import org.apache.http.HttpStatus;

@Controller
public class BusquedaPubController extends AbstractPubController {

	
	private static final int TIEMPO_MAXIMO_DE_BUSQUEDA = 60;



	private static final Logger logger = LoggerFactory.getLogger(BusquedaPubController.class);
	
	
	
	private static final String PANTALLA_BUSQUEDA_HOME = "partials/pes/buscador/buscadorHomeTemplate";
	private static final String PANTALLA_PRUEBA_GO = "partials/pes/buscador/prueba/buscadorPruebaHomeTemplate";

	private static final String PANTALLA_ERROR = "partials/error/errorGeneralTemplate";

	@Autowired
	private ExecuteService executeService;
	@Autowired
	private BuscadorPolizaService buscadorPolizaService;
	@Autowired
	private BuscadorClienteService buscadorClienteService;
	@Autowired
	private BuscadorSiniestroService buscadorSiniestroService;
	@Autowired
	private BuscadorCotizacionService buscadorCotizacionService;
	@Autowired
	private BuscadorProductorService buscadorProductorService;
	@Autowired
	private BuscadorNidService buscadorNidService;
	
	
	@RequestMapping(value = "/entorno", method = RequestMethod.GET)
	public ModelAndView cambiarEntorno(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		
		logger.debug("Inicio Cambio de entorno ...");

		logger.debug("Nuevo entorno : " + request.getParameter("p1"));
		
		request.getSession().setAttribute("entorno", EnvironmentType.valueOf(request.getParameter("p1")));
		
		logger.debug("Fin Cambio de entorno ...");
		
		
		return new ModelAndView("redirect:" + "/home");

	}
	
	/*
	 * Se muestra la pantalla de busqueda
	 */
	@RequestMapping(value = "/go", method = RequestMethod.GET)
	public ModelAndView buscadorHome(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		logger.debug("Request Encoding : " + request.getCharacterEncoding());
		
		Map<String, Object> mapa = new HashMap<String, Object>();
		mapa.put("utilToolScreen", new UtilPantalla());
		mapa.put("userApp", getUser(request));
		mapa.put("estadoCheckEntidadProductoresHome", "");
		System.setProperty("file.encoding","UTF-8");
		
		
		try {

			logger.debug("Mostrar Pantalla Poliza Home");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			
			// verificarUser(request);
			String dato = request.getParameter("dato");
			
			String datoP1 = request.getParameter("p1");
			String datoP2 = request.getParameter("p2");
			String datoP3 = request.getParameter("p3");
			String datoPagina = request.getParameter("pp");
						
			if (datoPagina == null || datoPagina.isEmpty()) {
				datoPagina = "1";
			}
			
			String[] entidadesFiltro = null;
			try {
				entidadesFiltro = request.getParameter("entidades").split("");
			} catch (Exception e) {
				entidadesFiltro = "100000".split("");
			}
			
			if (datoP2 !=null && (datoP2.equals("1005")|| datoP2.equals("3007") || datoP2.equals("2001") || datoP2.equals("6001")  ) && isNumeric(dato) == true && dato != null && dato.length()>1 )
			{
					if(entidadesFiltro[1].equals("1"))
					datoP2 = "0";
					else if(entidadesFiltro[2].equals("1"))
					datoP2 = "0";
					else if(entidadesFiltro[6].equals("1"))
					datoP2 = "0";
					else if(entidadesFiltro[3].equals("1"))
						datoP2 = "0";
						
			}
			
			//Ver de hacer esto con una expresion regular
			if (datoP2!=null && datoP2.endsWith("0") && dato != null && dato.length()>2 &&
					dato.indexOf("0") <0 &&
					dato.indexOf("1") <0 &&
					dato.indexOf("2") <0 &&
					dato.indexOf("3") <0 &&
					dato.indexOf("4") <0 &&
					dato.indexOf("5") <0 &&
					dato.indexOf("6") <0 &&
					dato.indexOf("7") <0 &&
					dato.indexOf("8") <0 &&
					dato.indexOf("9") <0 
					) {
				
				if(entidadesFiltro[1].equals("1"))
				datoP2 = "1005";
				else if(entidadesFiltro[2].equals("1"))
				datoP2 = "2001";
				else if(entidadesFiltro[6].equals("1"))
				datoP2 = "6001";
				else if(entidadesFiltro[4].equals("1"))
					datoP2="4002";
				else if(entidadesFiltro[3].equals("1"))
					datoP2="3007";
		
			}

			mapa.put("utilToolScreen", new UtilPantalla());
			mapa.put("datoBuscado", "");
			mapa.put("entidades", request.getParameter("entidades"));
			mapa.put("sinResultados", "NO");
			mapa.put("polizas", null);
			mapa.put("funcionOnload", "inicioBusquedaHome();");

			mapa.put("estadoCheckEntidadPolizaHome", "");
			mapa.put("estadoCheckEntidadSiniestroHome", "");
			mapa.put("estadoCheckEntidadClienteHome", ""); 
			mapa.put("estadoCheckEntidadProductorHome", "");
			mapa.put("estadoCheckEntidadCotizacionesHome", "");
			mapa.put("estadoCheckEntidadNidHome", "");
			
			if (datoP1 == null || datoP1.equals("")) {
				datoP1 ="0";
			}
			if (datoP2 == null || datoP2.equals("")) {
				datoP2 ="0";
			}
			if (datoP3 == null || datoP3.equals("")) {
				datoP3 ="0";
			}
			
			mapa.put("datoRetornoP1", datoP1);
			mapa.put("datoRetornoP2", datoP2);
			mapa.put("datoRetornoP3", datoP3);

			if (entidadesFiltro != null) {
				if (entidadesFiltro[1].equals("1")) {
					mapa.put("estadoCheckEntidadPolizaHome", "checked");
				}
				if (entidadesFiltro[2].equals("1")) {
					mapa.put("estadoCheckEntidadClienteHome", "checked");
				}
				if (entidadesFiltro[3].equals("1")) {
					mapa.put("estadoCheckEntidadSiniestroHome", "checked");
				}
				if (entidadesFiltro[4].equals("1")) {
					mapa.put("estadoCheckEntidadNidHome", "checked");
				}
				if (entidadesFiltro[5].equals("1")) {
					mapa.put("estadoCheckEntidadCotizacionesHome", "checked");
				}
				if (entidadesFiltro[6].equals("1")) {
					mapa.put("estadoCheckEntidadProductoresHome", "checked");
				}
			}

			if (dato != null && dato.length() > 0) {
				dato = dato.toUpperCase();
				agregarBreadcrumb(request, "Busqueda #" + dato );
				//realizo las llamadas a todos los servicios
				Future<ResultadoBusquedaEntidad> polizasFuture = buscadorPolizaService.getAllPolizas(dato,entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request));
				Future<ResultadoBusquedaEntidad> clientesFuture = buscadorClienteService.getAllClientes(dato,entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request));
				Future<ResultadoBusquedaEntidad> siniestrosFuture = buscadorSiniestroService.getAllSiniestros(dato, entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request));
				Future<ResultadoBusquedaEntidad> cotizacionesFuture = buscadorCotizacionService.getAllCotizaciones(dato,entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request));
				Future<ResultadoBusquedaEntidad> productoresFuture = buscadorProductorService.getAllProductores(dato, entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request));				
				Future<ResultadoBusquedaEntidad> nidsFuture = buscadorNidService.getAllNids(dato, entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request));
				
				
				int tiempoMaximo = 0;
				
				//espero que terminen
				while ((!(polizasFuture.isDone() && clientesFuture.isDone() && siniestrosFuture.isDone()) && cotizacionesFuture.isDone() && productoresFuture.isDone() && nidsFuture.isDone() ) || tiempoMaximo > 1000 * TIEMPO_MAXIMO_DE_BUSQUEDA) {
					Thread.sleep(5);
					tiempoMaximo = tiempoMaximo + 5;
				}
				
				if (tiempoMaximo > 1000 * TIEMPO_MAXIMO_DE_BUSQUEDA) {
					throw new Exception("Se ha exedido el tiempo maximo de busqueda que es de " + TIEMPO_MAXIMO_DE_BUSQUEDA + " por favor simplifique su busqueda");
				}
				
				
				//tomodo los datos
				List<PolizaDTO> polizas = polizasFuture.get().getResultados();
				List<ClienteDTO> clientes = clientesFuture.get().getResultados();
				List<SiniestroDTO> siniestros = siniestrosFuture.get().getResultados();
				List<CotizacionDTO> cotizaciones = cotizacionesFuture.get().getResultados();
				List<ProductorDTO> productores = productoresFuture.get().getResultados();
				List<NidDTO> certificados = nidsFuture.get().getResultados();

				//todo los estados
				HashSet<EstadoFiltroPantalla> estados = buscarEstado(polizas);

				
				mapa.put("estadoFiltro", estados);
				mapa.put("polizas", polizas);
				mapa.put("polizasCantidad", polizas.size());
				mapa.put("datoBuscado", dato);
				
			
				getRamoSegunBusqueda(mapa, entidadesFiltro, polizasFuture, clientesFuture, siniestrosFuture, cotizacionesFuture, productoresFuture, nidsFuture);
				
				mapa.put("cantidadDeResultadosTotales", obtenerTotalDeRegistros(polizasFuture,clientesFuture,siniestrosFuture,cotizacionesFuture,productoresFuture,nidsFuture));
				mapa.put("indicePaginaActual", obtenerPaginaActual(polizasFuture,clientesFuture,siniestrosFuture,cotizacionesFuture,productoresFuture,nidsFuture));
				

				if (dato != null && dato.length() >= 1 && (polizas == null || polizas.size() == 0) && (siniestros == null || siniestros.size() == 0) && (clientes == null || clientes.size() == 0) && (productores == null || productores.size() == 0) && (cotizaciones == null || cotizaciones.size() == 0) && (certificados == null || certificados.size() == 0) ) {
					mapa.put("datoBuscado", dato);
					mapa.put("sinResultados", "SI");

				}

				setearLosEstadosDeLosCheck(mapa, polizas, clientes, siniestros, productores, cotizaciones,certificados);

				mapa.put("clientes", clientes);
				mapa.put("siniestros", siniestros);
				mapa.put("productores", productores);
				mapa.put("cotizaciones", cotizaciones);
				mapa.put("certificados", certificados);

			}else {
				eliminarBreadcrumb(request);
			}
			mapa.putAll(getDatosComunes(request));

			
			return new ModelAndView(PANTALLA_BUSQUEDA_HOME, mapa);

		} catch (Exception e) {

			logger.error(getUserLog(request) + "Exploto al mostrar la home", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
			mapa.putAll(getDatosComunes(request));

		}

		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	
	
	@RequestMapping(value = "/pruebaGo", method = RequestMethod.GET)
	public ModelAndView homeDireccionesPorCertificados(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			logger.debug("Mostrar Pantalla homeDireccionesPorCertificados");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(PANTALLA_PRUEBA_GO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el cliente", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	@RequestMapping("/descargarArchivoExcel")
	public ModelAndView descargarArchivoExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();
		mapa.put("estadoCheckEntidadProductoresHome", "");
		
		
		try {

			logger.debug("Mostrar Pantalla Poliza Home");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			mapa.put("entorno", getEntorno(request));
			
			// verificarUser(request);
			String dato = request.getParameter("dato");
			
			String datoP1 = request.getParameter("p1");
			String datoP2 = request.getParameter("p2");
			String datoP3 = request.getParameter("p3");
			String datoPagina = request.getParameter("pp");
			
			if (datoPagina == null || datoPagina.isEmpty()) {
				datoPagina = "1";
			}
			
			String[] entidadesFiltro = null;
			try {
				entidadesFiltro = request.getParameter("entidades").split("");
			} catch (Exception e) {
				entidadesFiltro = "100000".split("");
			}
			
			if (datoP2 !=null && (datoP2.equals("1005")|| datoP2.equals("3007") || datoP2.equals("2001") || datoP2.equals("6001")  ) && isNumeric(dato) == true && dato != null && dato.length()>1 )
			{
					if(entidadesFiltro[1].equals("1"))
					datoP2 = "0";
					else if(entidadesFiltro[2].equals("1"))
					datoP2 = "0";
					else if(entidadesFiltro[6].equals("1"))
					datoP2 = "0";
					else if(entidadesFiltro[3].equals("1"))
					datoP2 = "0";
						
			}
			
			//Ver de hacer esto con una expresion regular
			if (datoP2!=null && datoP2.endsWith("0") && dato != null && dato.length()>2 &&
					dato.indexOf("0") <0 &&
					dato.indexOf("1") <0 &&
					dato.indexOf("2") <0 &&
					dato.indexOf("3") <0 &&
					dato.indexOf("4") <0 &&
					dato.indexOf("5") <0 &&
					dato.indexOf("6") <0 &&
					dato.indexOf("7") <0 &&
					dato.indexOf("8") <0 &&
					dato.indexOf("9") <0 
					) {
				
				if(entidadesFiltro[1].equals("1"))
				datoP2 = "1005";
				else if(entidadesFiltro[2].equals("1"))
				datoP2 = "2001";
				else if(entidadesFiltro[6].equals("1"))
				datoP2 = "6001";
				else if(entidadesFiltro[4].equals("1"))
					datoP2="4002";
				else if(entidadesFiltro[3].equals("1"))
					datoP2="3007";
		
			}

			mapa.put("entidades", request.getParameter("entidades"));

			
			if (datoP1 == null || datoP1.equals("")) {
				datoP1 ="0";
			}
			if (datoP2 == null || datoP2.equals("")) {
				datoP2 ="0";
			}
			if (datoP3 == null || datoP3.equals("")) {
				datoP3 ="0";
			}
			
			String cantidadPag = "1";


			if (dato != null && dato.length() > 0) {

				//realizo las llamadas a todos los servicios
				Future<ResultadoBusquedaEntidad> polizasFuture = buscadorPolizaService.getAllPolizas(dato,entidadesFiltro,datoP1,datoP2,datoP3,cantidadPag,getEntorno(request), getUser(request),10000);
				Future<ResultadoBusquedaEntidad> clientesFuture = buscadorClienteService.getAllClientes(dato,entidadesFiltro,datoP1,datoP2,datoP3,cantidadPag,getEntorno(request), getUser(request),10000);
				Future<ResultadoBusquedaEntidad> siniestrosFuture = buscadorSiniestroService.getAllSiniestros(dato, entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request),10000);
				Future<ResultadoBusquedaEntidad> cotizacionesFuture = buscadorCotizacionService.getAllCotizaciones(dato,entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request),10000);
				Future<ResultadoBusquedaEntidad> productoresFuture = buscadorProductorService.getAllProductores(dato, entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request),10000);				
				Future<ResultadoBusquedaEntidad> nidsFuture = buscadorNidService.getAllNidsDescargaExcel(dato, entidadesFiltro,datoP1,datoP2,datoP3,datoPagina,getEntorno(request), getUser(request));
				
				
				int tiempoMaximo = 0;
				
				//espero que terminen
				while ((!(polizasFuture.isDone() && clientesFuture.isDone() && siniestrosFuture.isDone()) && cotizacionesFuture.isDone() && productoresFuture.isDone() && nidsFuture.isDone() ) || tiempoMaximo > 1000 * TIEMPO_MAXIMO_DE_BUSQUEDA) {
					Thread.sleep(5);
					tiempoMaximo = tiempoMaximo + 5;
				}
				
				if (tiempoMaximo > 1000 * TIEMPO_MAXIMO_DE_BUSQUEDA) {
					throw new Exception("Se ha exedido el tiempo maximo de busqueda que es de " + TIEMPO_MAXIMO_DE_BUSQUEDA + " por favor simplifique su busqueda");
				}
				

				ExcelUtil eu = new ExcelUtil();
				Map beans=new HashMap();
				
				Date date = new Date();
				DateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				beans.put("fechaActual",dateFormat.format(date) +" - "+hourFormat.format(date)); 
				
				String archivoXLS = "/tmp/"+new Date().getTime() + ".xls";
				String tipoArchivo ="";
				if(entidadesFiltro[1].equals("1")){
				beans.put("detalle",polizasFuture.get().getResultados());
				beans.put("total", polizasFuture.get().getCantidadTotalDeRegistros()); 
				eu.ejecutar(beans, "templatePoliza.xls", archivoXLS);
				tipoArchivo = "Poliza";
				}
				else if(entidadesFiltro[2].equals("1")){

					beans.put("detalle",clientesFuture.get().getResultados());
					beans.put("total", clientesFuture.get().getCantidadTotalDeRegistros()); 
					eu.ejecutar(beans, "templateCliente.xls", archivoXLS);
					tipoArchivo = "Cliente";

				}
				else if(entidadesFiltro[3].equals("1")){
					beans.put("detalle",siniestrosFuture.get().getResultados());
					beans.put("total", siniestrosFuture.get().getCantidadTotalDeRegistros()); 
					eu.ejecutar(beans, "templateSiniestros.xls", archivoXLS);
					tipoArchivo = "Siniestro";

				}
				else if(entidadesFiltro[4].equals("1")){
					
					beans.put("detalle",nidsFuture.get().getResultados());
					beans.put("total", nidsFuture.get().getCantidadTotalDeRegistros()); 
					eu.ejecutar(beans, "templateNids.xls", archivoXLS);
					tipoArchivo = "Nid";

				}
				else if(entidadesFiltro[5].equals("1")){
					beans.put("detalle",cotizacionesFuture.get().getResultados());
					beans.put("total", cotizacionesFuture.get().getCantidadTotalDeRegistros()); 
					eu.ejecutar(beans, "templateCotizaciones.xls", archivoXLS);
					tipoArchivo = "Cotizacion";
				}
				else if(entidadesFiltro[6].equals("1")){
					beans.put("detalle",productoresFuture.get().getResultados());
					beans.put("total", productoresFuture.get().getCantidadTotalDeRegistros()); 
					eu.ejecutar(beans, "templateProductores.xls", archivoXLS);
					tipoArchivo = "Productor";
				}
				


			
			File file = new File( archivoXLS);
			
			response.setContentType("application/xls");
			
			response.setContentLength((int) file.length());
			
			response.setHeader("Content-Disposition", "attachment; filename=\"" + "ResultadosBusqueda"+tipoArchivo+"_"+Dateutils.toCustomFormat(Dateutils.getNow())+".xls" + "\"");

			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
			
			FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
			
			}
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Se ha producido un error al querer descargar el archivo de poliza", e);
			mapa.put("funcionOnload","");
			mapa.put("errorMsg", "Se ha producido un error al querer descargar el archivo de poliza");
			return new ModelAndView(PANTALLA_ERROR, mapa);
		}
		return null;
	}


	private void getRamoSegunBusqueda(Map<String, Object> mapa, String[] entidadesFiltro, Future<ResultadoBusquedaEntidad> polizasFuture, Future<ResultadoBusquedaEntidad> clientesFuture, Future<ResultadoBusquedaEntidad> siniestrosFuture,
			Future<ResultadoBusquedaEntidad> cotizacionesFuture, Future<ResultadoBusquedaEntidad> productoresFuture, Future<ResultadoBusquedaEntidad> nidsFuture) throws InterruptedException, ExecutionException {
		
		if (entidadesFiltro != null) {
			if (entidadesFiltro[1].equals("1")) {
				mapa.put("ramosSegunBusqueda", getRamos(polizasFuture.get().getRamos()));
			}
			if (entidadesFiltro[2].equals("1")) {
				mapa.put("ramosSegunBusqueda", getRamos(clientesFuture.get().getRamos()));
			}
			if (entidadesFiltro[3].equals("1")) {
				mapa.put("ramosSegunBusqueda", getRamos(siniestrosFuture.get().getRamos()));
			}
			if (entidadesFiltro[4].equals("1")) {
				mapa.put("ramosSegunBusqueda", getRamos(cotizacionesFuture.get().getRamos()));
			}
			if (entidadesFiltro[5].equals("1")) {
				mapa.put("ramosSegunBusqueda", getRamos(productoresFuture.get().getRamos()));
			}
			if (entidadesFiltro[6].equals("1")) {
				mapa.put("ramosSegunBusqueda", getRamos(nidsFuture.get().getRamos()));
			}
		}
	}








	private Object getRamos(List ramos) {
		return ramos;
	}

	private Object obtenerPaginaActual(Future<ResultadoBusquedaEntidad> polizasFuture, Future<ResultadoBusquedaEntidad> clientesFuture, Future<ResultadoBusquedaEntidad> siniestrosFuture, Future<ResultadoBusquedaEntidad> cotizacionesFuture,
			Future<ResultadoBusquedaEntidad> productoresFuture, Future<ResultadoBusquedaEntidad> nidsFuture) throws Exception {
		
		if (polizasFuture.get().getPaginaActual()!=null) {
			return polizasFuture.get().getPaginaActual(); 
		}
		if (clientesFuture.get().getPaginaActual()!=null)
			return clientesFuture.get().getPaginaActual(); 
		if (siniestrosFuture.get().getPaginaActual()!=null)
			return siniestrosFuture.get().getPaginaActual(); 
		if (cotizacionesFuture.get().getPaginaActual()!=null)
			return cotizacionesFuture.get().getPaginaActual(); 
		if (nidsFuture.get().getPaginaActual()!=null)
			return nidsFuture.get().getPaginaActual(); 
		if (productoresFuture.get().getPaginaActual()!=null)
			return productoresFuture.get().getPaginaActual();
		
	return "0";

	}
	


	private Object obtenerTotalDeRegistros(Future<ResultadoBusquedaEntidad> polizasFuture, Future<ResultadoBusquedaEntidad> clientesFuture, Future<ResultadoBusquedaEntidad> siniestrosFuture, Future<ResultadoBusquedaEntidad> cotizacionesFuture,	Future<ResultadoBusquedaEntidad> productoresFuture, Future<ResultadoBusquedaEntidad> nidsFuture) throws Exception {
		
		if (polizasFuture.get().getCantidadTotalDeRegistros()!=null)
			return polizasFuture.get().getCantidadTotalDeRegistros(); 
		if (clientesFuture.get().getCantidadTotalDeRegistros()!=null)
			return clientesFuture.get().getCantidadTotalDeRegistros(); 
		if (siniestrosFuture.get().getCantidadTotalDeRegistros()!=null)
			return siniestrosFuture.get().getCantidadTotalDeRegistros(); 
		if (cotizacionesFuture.get().getCantidadTotalDeRegistros()!=null)
			return cotizacionesFuture.get().getCantidadTotalDeRegistros(); 
		if (nidsFuture.get().getCantidadTotalDeRegistros()!=null)
			return nidsFuture.get().getCantidadTotalDeRegistros(); 
		if (productoresFuture.get().getCantidadTotalDeRegistros()!=null)
			return productoresFuture.get().getCantidadTotalDeRegistros(); 
		
	return "0";
}




	private void setearLosEstadosDeLosCheck(Map<String, Object> mapa, List<PolizaDTO> polizas, List<ClienteDTO> clientes, List<SiniestroDTO> siniestros, List<ProductorDTO> productores, List<CotizacionDTO> cotizaciones, List<NidDTO> certificados) {

		mapa.put("checkPolizaEntidadEstado", "");
		mapa.put("checkSiniestroEntidadEstado", "");
		mapa.put("checkClientesEntidadEstado", "");
		mapa.put("checkProductorEntidadEstado", "");
		mapa.put("checkCotizacionEntidadEstado", "");
		mapa.put("checkCotizacionNidEstado", "");

		
		if (polizas != null && polizas.size() > 0)
			mapa.put("checkPolizaEntidadEstado", "checked");
		if (siniestros != null && siniestros.size() > 0)
			mapa.put("checkSiniestroEntidadEstado", "checked");
		if (clientes != null && clientes.size() > 0)
			mapa.put("checkClientesEntidadEstado", "checked");
		if (productores != null && productores.size() > 0)
			mapa.put("estadoCheckEntidadProductorHome", "checked");
		if (cotizaciones != null && cotizaciones.size() > 0)
			mapa.put("estadoCheckEntidadCotizacionesHome", "checked");
		if (certificados != null && certificados.size() > 0)
			mapa.put("estadoCheckEntidadNidHome", "checked");

	}


	

	private HashSet<EstadoFiltroPantalla> buscarEstado(List<PolizaDTO> polizas) {
		HashSet<EstadoFiltroPantalla> estado = new HashSet<EstadoFiltroPantalla>();
		HashMap<String, EstadoFiltroPantalla> mapaEstado = new HashMap<String, EstadoFiltroPantalla>();
		for (PolizaDTO polizaDTO : polizas) {
			mapaEstado.put(polizaDTO.getDescEstado(), new EstadoFiltroPantalla(polizaDTO.getCodEstado().toString(), ucFirst(polizaDTO.getDescEstado())));
		}
		for (Map.Entry<String, EstadoFiltroPantalla> entry : mapaEstado.entrySet()) {
			estado.add(entry.getValue());
		}

		return estado;

	}


	private static String ucFirst(String str) {
		if (str.isEmpty()) {
			return str;
		} else {
			return Character.toUpperCase(str.charAt(0)) + str.substring(1).toLowerCase();
		}
	}

	public static boolean isNumeric(String cadena) {

        boolean resultado;

        try {
            Integer.parseInt(cadena);
            resultado = true;
        } catch (NumberFormatException excepcion) {
            resultado = false;
        }

        return resultado;
    }
	
	
	
}

