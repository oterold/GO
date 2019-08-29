package com.pseguros.pes.controller.pub.entidades;

import java.io.File;
import java.io.FileInputStream;
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
import com.pseguros.pes.ftp.FTPExecutor;
import com.pseguros.pes.ftp.parametros.ParametrosSistema;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.ImpresionService;

@Controller
public class ImpresionesPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(ImpresionesPubController.class);
	
	private static final String PANTALLA_DIRECCIONES_IMPRESIONES = "partials/pes/entidades/poliza/impresiones/impresionesHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	
	
	@Autowired
	private ImpresionService impresionService;

	
	

	

	@RequestMapping(value = "/homeImpresiones", method = RequestMethod.GET)
	public ModelAndView homeImpresionesPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			logger.debug("Mostrar Pantalla homeFacturacion");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			
			agregarBreadcrumb(request, "Impresiones #" + poliza);

			mapa.putAll(getDatosComunes(request));
			
			Future<ArrayList> datosPoliza = impresionService.getPoliza(ramo, poliza, sucursal, getEntorno(request), getUser(request));
			Future<ArrayList> datosProcesoImp = impresionService.getProcesoImp(sucursal,ramo, poliza, getEntorno(request), getUser(request));

			while (!(datosPoliza.isDone() && datosProcesoImp.isDone())) {
				Thread.sleep(5);
			}
			
			mapa.put("polizaDato",datosPoliza.get());

			mapa.put("listaProcesosImpresion",datosProcesoImp.get());
			
			mapa.put("funcionOnload","inicioImpresoraHome()");
			
			return new ModelAndView(PANTALLA_DIRECCIONES_IMPRESIONES, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeFacturacion", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}



	
	/*
	 * Panel B y Descripcion panel D
	 */
	private List buscarProcesosDeImpresion(String ramo, String poliza, String user, EnvironmentType entorno) throws Exception {
		return executeService.executeGenericSQL("select * from cart_fp_impresion_c where cfic_nu_proceso in (select cfid_cfic_nu_proceso from cart_fp_impresion_d where cfid_cacw_nu_poliza = "+poliza+"  and cfid_cacw_cd_ramo = "+ramo+") order by cfic_fe_proceso");
	}


	/**
	 * Panel C
	 * @param ramo
	 * @param poliza
	 * @param proceso
	 * @param user
	 * @param entorno
	 * @return
	 * @throws Exception
	 */
	private List buscarDetallesDelProceso(String ramo, String poliza, String proceso, String user, EnvironmentType entorno) throws Exception {
		return executeService.executeGenericSQL("select * from cart_fp_impresion_d where cfid_cacw_nu_poliza = "+poliza+"  and cfid_cacw_cd_ramo = "+ramo+" and cfid_cfic_nu_proceso = "+proceso);
	}	

	
	/**
	 * Popup Panel C
	 * @param ramo
	 * @param poliza
	 * @param proceso
	 * @param user
	 * @param entorno
	 * @return
	 * @throws Exception
	 */
	private List buscarFinalDetalle(String indice, String proceso, String user, EnvironmentType entorno) throws Exception {
		return executeService.executeGenericSQL("select cfif_tp_movimiento, cfif_fe_movimiento, cfif_caus_cd_usuario  from cart_fp_impresion_f where cfif_cfic_nu_proceso = "+proceso+" and cfif_cfid_index = "+indice+" order by cfif_fe_actualizacion");
	}


	/**
	 * Panel A
	 * @param request
	 * @param poliza
	 * @param ramo
	 * @return
	 * @throws Exception
	 * @throws InterruptedException
	 */

	
//	
//	select * from cart_fp_impresion_c where cfic_nu_proceso in (select cfid_cfic_nu_proceso from cart_fp_impresion_d where cfid_cacw_nu_poliza = 8611256  and cfid_cacw_cd_ramo = 4) order by cfic_fe_proceso
//
//
	
	/**************************************************************************************************************************************
	/****************************************************************AJAXA PANEL D**********************************************************************
	/**************************************************************************************************************************************/
	@RequestMapping(value = "/datosImpresio", method = RequestMethod.GET)
	public @ResponseBody Object getDatosImpresio(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			
			return impresionService.getProcesoImpConJson(sucursal,ramo, poliza, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos del proceso de impresion", e);
			return "No se encontro un detalle del proceso de impresion";

		}
	}
	

	/**************************************************************************************************************************************
	/****************************************************************AJAXA PANEL C**********************************************************************
	/**************************************************************************************************************************************/
	@RequestMapping(value = "/datosDetalleImpresion", method = RequestMethod.GET)
	public @ResponseBody Object getDatosDetalleImpresion(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String indice = request.getParameter("indice");
			String proceso = request.getParameter("proceso");
			return impresionService.getMovimientosConJson(proceso, indice, getEntorno(request), getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar el detalle del procesoimpresion", e);
			return "No se encontro un detalle del proceso de impresi&oacute;n";

		}
	}
	
	
	//------------------------------------ pantalla modal panel c ---------------------------- //
	@RequestMapping(value = "/datosDetallePanelC", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosDetallePanelC(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal embargos");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String indice = request.getParameter("indice");
			String proceso = request.getParameter("proceso");
			

			return impresionService.getMovimientosConJson(proceso, indice, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar un detalle del proceso :51250980", e);
		}

		return "No posee un detalle del proceso.";
	}
	
	
	
	
	//------------------------------------ pantalla modal no impresion ---------------------------- //
	@RequestMapping(value = "/datosNoImpresion", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosNoImpresion(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal embargos");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			

			return impresionService.getNoImpresion(poliza, ramo,sucursal, getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las no impresiones codigo de error :509809821", e);
		}

		return "No existe  no impresiones";
	}
	
	
	@RequestMapping("/descargarArchivoPdf")
	public ModelAndView descargarArchivo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			

			String archivoPdf = request.getParameter("archivoPdf");
			String valorPoliza = request.getParameter("poliza");
			logger.debug("Se descarga el archivo pdf de la poliza: " + valorPoliza);
			
			File file = new File("/tmp/" + archivoPdf+".pdf");
			
			response.setContentType("application/pdf");
			
			response.setContentLength((int) file.length());
			
			response.setHeader("Content-Disposition", "attachment; filename=\"" + "Poliza " + valorPoliza+" digital.pdf" + "\"");

			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
			
			FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
			
			return null;
			
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Se ha producido un error al querer descargar el archivo de poliza", e);
			mapa.put("funcionOnload","");
			mapa.put("errorMsg", "Se ha producido un error al querer descargar el archivo de poliza");
			return new ModelAndView(PANTALLA_ERROR, mapa);
		}
	}
	
	
	@RequestMapping("/existeArchivoIndice")
	public @ResponseBody Object existeArchivoIndice(HttpServletRequest request, HttpServletResponse response) throws Exception {

		try {
			logger.debug("Metodo existeArchivoIndice: Se validara si el archivo existe");
			
			String nroSecuencia = request.getParameter("nroSecuencia");

			int numeroSecuencia = Integer.parseInt(nroSecuencia);
			
			int numeroCarpeta = numeroSecuencia  / 10000;
			
			String namePdfTmp = numeroSecuencia + "" + new Date().getTime();
			
			FTPExecutor ftpExecutor = new FTPExecutor(new ParametrosSistema());

			ftpExecutor.bajarArchivo("/home/piccardoa/pdf/"+numeroCarpeta+"/", numeroSecuencia+".pdf", "/tmp/" , namePdfTmp+".pdf");
			
			File file = new File("/tmp/" + namePdfTmp+".pdf");
			
			if(!file.exists()){
				return "No existe el archivo en el sistema FTP";

			}
			
			List<String> archivo = new ArrayList<String>();
			archivo.add(namePdfTmp);
			
			return archivo;
			
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Se ha producido un error al querer validar archivo de poliza", e);
			return "Se ha producido un error al querer validar archivo de poliza";
		}
	}
	
	

}





