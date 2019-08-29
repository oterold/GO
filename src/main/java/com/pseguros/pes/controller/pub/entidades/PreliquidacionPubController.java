package com.pseguros.pes.controller.pub.entidades;

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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.dto.PreliquidacionDTO;
import com.pseguros.pes.excel.util.ExcelUtil;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.PreliquidacionService;
import com.pseguros.pes.util.Dateutils;

@Controller
public class PreliquidacionPubController extends AbstractPubController{
	private static final Logger logger = LoggerFactory.getLogger(PreliquidacionPubController.class);
	private static final String PANTALLA_HOME_PRELIQUIDACION = "partials/pes/entidades/preliquidacion/preliquidacionHomeTemplate";

	private static final int TIEMPO_MAXIMO_ESPERA = 10;
	
	@Autowired
	private ExecuteService executeService;
	@Autowired
	private PreliquidacionService preliquidacionService;


	@RequestMapping(value = "/homePreliquidacion", method = RequestMethod.GET)
	public ModelAndView homePoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
	
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		String mostrarBotonDetallePreli = "";
		
		try {
			logger.debug("Mostrar Pantalla Preliquidacion Home");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String preLiquidacion = request.getParameter("preliquidacion");
			
			agregarBreadcrumb(request, "Preliquidacion #" + preLiquidacion);
			
			Future<ArrayList> datosPreli = preliquidacionService.getDatosCabeceraPreli(preLiquidacion,getEntorno(request), getUser(request));
			Future<ArrayList> datosPreliDetalle = preliquidacionService.getDetallePreli(preLiquidacion,getEntorno(request), getUser(request));
			Future<ArrayList> datosCancelacion = preliquidacionService.getCancelacion(preLiquidacion, getEntorno(request), getUser(request));


			while (!(datosPreli.isDone() && datosCancelacion.isDone() && datosPreliDetalle.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.putAll(getDatosComunes(request));
			
			mapa.put("scriptCustom", "<script src=\"resources/js/bootstrap/bootstrap.min.js\"></script> <script src=\"resources/js/jquery-custom/jquery-ui-1.8.16.custom.min.js\"></script> <script src=\"resources/js/jquery-custom/jquery.event.drag-2.3.js\"></script> 	<script src=\"resources/js/jquery-custom/jquery-ui-1.8.16.custom.min.js\"></script>");
			mapa.put("scriptGrilla", "<script src=\"/PSPES/resources/js/slickGrid/slick.core.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.editors.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.grid.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.dataview.js\"></script>");
			mapa.put("funcionOnload","inicioPreliquidacionHome()");
			mapa.put("datosPreli",datosPreli.get());
			mapa.put("datosCancelacion",datosCancelacion.get());
			mapa.put("datosPreliDetalle", datosPreliDetalle.get());
			mapa.put("mostrarBotonDetallePreli", mostrarBotonDetallePreli);

			
			
			return new ModelAndView(PANTALLA_HOME_PRELIQUIDACION, mapa);
		
		} catch (Exception e) {

			logger.error(getUserLog(request)+ "Exploto al mostrar la preliquidacion" , e);
			mapa.put("errorMsg", "" + e.getMessage());

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	
	
	//------------------------------------ pantalla JSON del juicio panel D ---------------------------- //
	@RequestMapping(value = "/infoDetallePre", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosInfoDetallePre(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String preliquidacion = request.getParameter("preliquidacion");

			return preliquidacionService.getDatosDetalleInfo(preliquidacion, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el detalle de la preliquidacion 9123111", e);
		}

		return "No se encontro un detalle de la informaci&oacute;n";
	}
	

	
	
	
	
	
	//------------------------------------ pantalla MODAL CANCELACION ---------------------------- //
	@RequestMapping(value = "/infoDetalleCancel", method = RequestMethod.GET)
	public @ResponseBody
	Object getInfoDetalleCancel(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String preliquidacion = request.getParameter("preliquidacion");

			return preliquidacionService.getDatosModalCancelacion(preliquidacion, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el detalle de la preliquidacion 9123111", e);
		}

		return "No se encontro un detalle de la cancelaci&oacute;n";
	}
	
	
	
	@RequestMapping(value = "/datosDetallePrePaginado", method = RequestMethod.GET)
	public @ResponseBody Object getDatosEndososPoliza(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo: " + "getDatosEndososPoliza");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String preliquidacion = request.getParameter("preliquidacion");
			int paginaNumeroRecibida =Integer.parseInt(request.getParameter("pagina").toString()); 

			return preliquidacionService.getDatosDetalleInfoPaginado(preliquidacion, getEntorno(request), getUser(request),(paginaNumeroRecibida*500)-500,500*paginaNumeroRecibida);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los endosos de la Poliza", e);
		}

		return "No se encontraron endosos de la poliza";
	}
	
	

	
	@RequestMapping(value = "/descargarPreliExcel", method = RequestMethod.GET)
	public ModelAndView getDescargarPreliExcel(HttpSession session, HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
	
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		String mostrarBotonDetallePreli = "";
		
		try {
			logger.debug("Mostrar Pantalla Preliquidacion Home");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String preLiquidacion = request.getParameter("preliquidacion");
						
			Future<ArrayList> datosPreliDetalle = preliquidacionService.getDetallePreli(preLiquidacion,getEntorno(request), getUser(request));

			while (!( datosPreliDetalle.isDone())) {
				Thread.sleep(5);
			}
						
			ExcelUtil eu = new ExcelUtil();
			
			Date date = new Date();
			DateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			mapa.put("fechaActual",dateFormat.format(date) +" - "+hourFormat.format(date));
			
			String archivoXLS = "/tmp/"+new Date().getTime() + ".xls";
			
			String tipoArchivo ="Preliquidacion";

			
			List<PreliquidacionDTO> preliquidaciones = new ArrayList<PreliquidacionDTO>();
			
			for (Object object : datosPreliDetalle.get()) {

				PreliquidacionDTO preliquidacion = new PreliquidacionDTO((HashMap) object);
				preliquidaciones.add(preliquidacion);
			}
			
			mapa.put("detalle",preliquidaciones);
			mapa.put("total", datosPreliDetalle.get().size());
			eu.ejecutar(mapa, "templatePreliquidacion.xls", archivoXLS);
			
			File file = new File( archivoXLS);
			
			response.setContentType("application/xls");
			
			response.setContentLength((int) file.length());
			
			response.setHeader("Content-Disposition", "attachment; filename=\"" + "ResultadosBusqueda"+tipoArchivo+"_"+Dateutils.toCustomFormat(Dateutils.getNow())+".xls" + "\"");

			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
			
			FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
			
			return null;
		
		} catch (Exception e) {

			logger.error(getUserLog(request)+"Exploto al descargar los detalles de la preliquidacion" , e);
			mapa.put("errorMsg", "" + e.getMessage());

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}

	

}
