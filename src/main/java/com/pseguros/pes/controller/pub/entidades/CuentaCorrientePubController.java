package com.pseguros.pes.controller.pub.entidades;

import java.io.File;
import java.io.FileInputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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

import com.pseguros.pes.bean.RegistroExcelCC;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.excel.util.ExcelUtil;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.CuentaCorrienteService;
import com.pseguros.pes.util.Dateutils;
import com.pseguros.pes.util.pantalla.UtilPantalla;

@Controller
public class CuentaCorrientePubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(CobranzaPubController.class);
	
	private static final String PANTALLA_CC_PRODUCTOR = "partials/pes/entidades/cuentaCorriente/cuentaCorrienteHomeTemplate";

	@Autowired
	private ExecuteService executeService;
	
	@Autowired
	private CuentaCorrienteService cuentaCorriente;
	
	
	@RequestMapping(value = "/homeCCProductor", method = RequestMethod.GET)
	public ModelAndView homeJuicios(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeCCProductor");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String codProductor=request.getParameter("codProductor");

			agregarBreadcrumb(request, "CC Productor #" + codProductor);
			Future<ArrayList> datosProd = cuentaCorriente.getdatosProd(codProductor,getEntorno(request), getUser(request));

			while (!(datosProd.isDone())) {
				Thread.sleep(5);
			}
			mapa.putAll(getDatosComunes(request));
			mapa.put("datosProd",datosProd.get());
			mapa.put("funcionOnload","ccCorrienteProductorHome()");
				//mapa.put("styleGrilla", "<link href=\"resources/css/slickGrid/slick.grid.css\"> <link href=\"resources/css/smoothness/jquery-ui-1.8.16.custom.css\">");
				mapa.put("scriptCustom", "<script src=\"/PSPES/resources/js/bootstrap/bootstrap.min.js\"></script><script src=\"resources/js/jquery-custom/jquery-ui-1.8.16.custom.min.js\"></script> <script src=\"resources/js/jquery-custom/jquery.event.drag-2.3.js\"></script>");
				mapa.put("scriptGrilla", "<script src=\"/PSPES/resources/js/slickGrid/slick.core.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.editors.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.grid.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.dataview.js\"></script>   <script src=\"/PSPES/resources/js/pub/pantallaCuentaCorriente/bootstrap-datepicker.js\"></script>");
			
			return new ModelAndView(PANTALLA_CC_PRODUCTOR, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeCCproductor", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	
	
	//------------------------------------ pantalla JSON del juicio panel B ---------------------------- //
		@RequestMapping(value = "/datosMovimientoProductorCC", method = RequestMethod.GET)
		public @ResponseBody
		Object getDatosMovimientoProductorCC(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				logger.debug("inicio el metodo");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String productor = request.getParameter("productor");
				String moneda = request.getParameter("moneda");
				String periodo = request.getParameter("periodo");

				return cuentaCorriente.getResumenMov(productor,moneda,periodo, getEntorno(request), getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar los movimientos productor", e);
			}

			return "No se encontraron movimientos de la CC";
		}
		
		
		
		
		//------------------------------------ pantalla JSON del juicio panel c ---------------------------- //
			@RequestMapping(value = "/datosDetalleMovimientoProductorCC", method = RequestMethod.GET)
			public @ResponseBody
			Object getDatosDetalleMovimientoProductorCC(HttpSession session, HttpServletRequest request) throws Exception {
				try {
					logger.debug("inicio el metodo");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

					String productor = request.getParameter("productor");
					String moneda = request.getParameter("moneda");
					String periodo = request.getParameter("periodo");
					String movimiento = request.getParameter("movimiento");
					

					return cuentaCorriente.getDetalleMov(productor,moneda,periodo,movimiento, getEntorno(request), getUser(request));

				} catch (Exception e) {
					logger.error(getUserLog(request)+"Exploto al mostrar el detalle de movimiento productor", e);
				}

				return "El movimientos no posee un detalle";
			}
			
			
			
			
			
			@RequestMapping("/exportarExcelCCProductor")
			public ModelAndView descargarArchivoExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
				Map<String, Object> mapa = new HashMap<String, Object>();

				try {
					logger.debug("Descargar grilla cuenta corriente");
					EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
					mapa.put("entorno", getEntorno(request));


					String productor = request.getParameter("productor");
					String moneda = request.getParameter("moneda");
					String periodo = request.getParameter("periodo");
					String movimiento;
					
					Future<ArrayList> datosProdExcel = cuentaCorriente.getDatosProdExcel(productor, moneda, periodo, getEntorno(request), getUser(request));
					while (!(datosProdExcel.isDone())) {
						Thread.sleep(5);
					}
					ArrayList totalResultados = new ArrayList();
					ArrayList datos = datosProdExcel.get();
					
					
					Map<String, Object> resultados = new HashMap<String, Object>();
					
					
					for (Iterator itrator = datos.iterator(); itrator.hasNext();) {
						HashMap object = (HashMap) itrator.next();
						 movimiento = (String) object.get("P_TF_LISTA.TP_MOVIMIENTO");
						Future<ArrayList> datosDetalleProdExcel =cuentaCorriente.getDatosProdExcelDetalle(productor, moneda, periodo,movimiento, getEntorno(request), getUser(request));
						while (!(datosDetalleProdExcel.isDone())) {
							Thread.sleep(5);
						}
					 totalResultados.addAll(datosDetalleProdExcel.get());
					}
					
					List<RegistroExcelCC> datosExcel = new ArrayList<RegistroExcelCC>();
					for (Iterator iterator = totalResultados.iterator(); iterator.hasNext();) {
						HashMap datoBruto = (HashMap) iterator.next();
						RegistroExcelCC cc = new RegistroExcelCC();
						cc.setFechaMovimiento((String) (UtilPantalla.formatearFechaSiniestro((datoBruto.get("P_TF_LISTA.FE_MOVIMIENTO")))));
						cc.setMovimiento((String) datoBruto.get("P_TF_LISTA.TP_MOVIMIENTO"));
						cc.setMovimientoDesc((String)datoBruto.get("P_TF_LISTA.DESC_TP_MOVIMIENTO"));
						cc.setComprobante((String)datoBruto.get("P_TF_LISTA.COMPROBANTE"));
						cc.setRemesa((String) datoBruto.get("P_TF_LISTA.REMESA"));
						cc.setImputacion((String) datoBruto.get("P_TF_LISTA.IMPUTACION"));
						cc.setObservacion((String)datoBruto.get("P_TF_LISTA.OBSERVACIONES"));
						cc.setComision((String)datoBruto.get("P_TF_LISTA.COMISION"));
						
						datosExcel.add(cc);
					}
					
					ExcelUtil eu = new ExcelUtil();
					Map beans=new HashMap();
					Date date = new Date();
					DateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
					DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					beans.put("fechaActual",dateFormat.format(date) +" - "+hourFormat.format(date)); 
					
					String archivoXLS = "/tmp/"+new Date().getTime() + ".xls";
					String tipoArchivo ="";
					beans.put("detalle", datosExcel);
//					beans.put("datosProductorExcelDetalle", totalResultados);
					
					eu.ejecutar(beans, "templateCuentaCorrienteProductor2.xls", archivoXLS);
				
				File file = new File( archivoXLS);
				
				response.setContentType("application/xls");
				
				response.setContentLength((int) file.length());
				
				response.setHeader("Content-Disposition", "attachment; filename=\"" + "cuentaCorrienteProductor_"+Dateutils.toCustomFormat(Dateutils.getNow())+".xls" + "\"");

				response.setHeader("Set-Cookie", "fileDownload=true; path=/");
				
				FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
				
				
			} catch (Exception e) {
				logger.error(getUserLog(request)+"Se ha producido un error al querer descargar el archivo de cuenta corriente", e);
				mapa.put("funcionOnload","");
				mapa.put("errorMsg", "Se ha producido un error al querer descargar el archivo de cuenta corriente");
				return new ModelAndView(PANTALLA_ERROR, mapa);
			}
			return null;
		}
			
			
			
			
			
			
			
			
}
	
