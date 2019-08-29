package com.pseguros.pes.controller.pub.entidades;

import java.io.File;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bea.xml.stream.samples.Parse;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.dto.BoletaPagoDTO;
import com.pseguros.pes.dto.DeudaPoliza;
import com.pseguros.pes.email.util.EmailPS;
import com.pseguros.pes.email.util.EmailSender;
import com.pseguros.pes.excel.util.ExcelUtil;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.PolizaService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;
import com.pseguros.pes.util.json.JsonUtils;
import com.pseguros.pes.util.ReportePDFUtil;

@Controller
public class PolizaPubController extends AbstractPubController{

	private static final Logger logger = LoggerFactory.getLogger(PolizaPubController.class);
	private static final String PANTALLA_HOME_POLIZA = "partials/pes/entidades/poliza/polizaHomeTemplate";

	
	@Autowired
	private ExecuteService executeService;
	@Autowired
	private PolizaService polizaService;

	@RequestMapping(value = "/homePoliza", method = RequestMethod.GET)
	public ModelAndView homePoliza(HttpSession session, HttpServletRequest request, HttpServletResponse response, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		
		try {
			logger.debug("Mostrar Pantalla Poliza Home");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");

			agregarBreadcrumb(request, "Poliza #" + poliza);
			
			mapa.putAll(getDatosComunes(request));
			
			Future<ArrayList> datosPoliza =polizaService.getPoliza(ramo,poliza,sucursal, getEntorno(request), getUser(request));
			
			
			Future<DeudaPoliza> datosDeuda =polizaService.getDeudaPoliza(poliza,ramo,"0",sucursal, getEntorno(request), getUser(request));

			while (!(datosPoliza.isDone() && datosDeuda.isDone())) {
				Thread.sleep(5);
			}
			
			Map datosPanelAPoliza = (HashMap) datosPoliza.get().get(0);

			mapa.put("polizaDato",datosPoliza.get());
			mapa.put("cantidadTotalDeCertificadosReal",Integer.parseInt(datosPanelAPoliza.get("P_TF_POLI.INB_CT_CERTIFICADOS").toString()));
			mapa.put("cantidadTotalDeEndosoReal",Integer.parseInt(datosPanelAPoliza.get("P_TF_POLI.INB_CT_ENDOSOS").toString()));
			
			mapa.put("datoMensaje",datosDeuda.get().getObs());
			mapa.put("deudaPoliza",datosDeuda.get().getDeuda());
			if(datosDeuda.get().getDeuda()!=null){
				mapa.put("deudaPolizaEntero",Integer.parseInt(datosDeuda.get().getDeuda().replace(".","")));
				
			}

			
			if(Integer.parseInt(datosPanelAPoliza.get("P_TF_POLI.INB_CT_ENDOSOS").toString()) < 1000){
				Future<ArrayList> datosEndososPoliza = null;
				try{
					
					datosEndososPoliza =polizaService.getEndososPoliza(ramo,poliza,sucursal, getEntorno(request), getUser(request),0,50000);
					while (!(datosEndososPoliza.isDone())) {
						Thread.sleep(5);
					}
					
				}catch(Exception e){
					logger.error(getUserLog(request)+ "Exploto al obtener la lista de endosos de la poliza" , e);
					mapa.put("errorMsg", "" + e.getMessage());
				}
				mapa.put("endososPoliza",datosEndososPoliza==null ? new ArrayList():datosEndososPoliza.get());
				mapa.put("numeroDePaginaResultadoEndoso","1");
				
			}
			
			if (Integer.parseInt(datosPanelAPoliza.get("P_TF_POLI.INB_CT_CERTIFICADOS").toString()) < 5000) {
				Future<ArrayList> datosCertificadosPoliza = null;
				try{
					
					datosCertificadosPoliza =polizaService.getCertificadoPoliza(ramo,poliza,sucursal, getEntorno(request), getUser(request));
					while (!( datosCertificadosPoliza.isDone() )) {
						Thread.sleep(5);
					}
					
				}catch(Exception e){
					logger.error(getUserLog(request)+ "Exploto al obtener los certificados de la poliza" , e);
					mapa.put("errorMsg", "" + e.getMessage());
				}
				
				mapa.put("certificadosPoliza",datosCertificadosPoliza== null ? new ArrayList():datosCertificadosPoliza.get());

			}else {
				mapa.put("certificadosPoliza",new ArrayList());
				mapa.put("habilitarBotonGrillaVerCertificados","SI");
				
			}
			
			
			
			mapa.put("poliza", "poliza");	
			mapa.put("polizaEncabezado", poliza);
			mapa.put("funcionOnload","inicioPolizaActiveHome("+ ramo+ ","+ poliza+"," + Integer.parseInt(datosPanelAPoliza.get("P_TF_POLI.INB_CT_CERTIFICADOS").toString())+","+ Integer.parseInt(datosPanelAPoliza.get("P_TF_POLI.INB_CT_ENDOSOS").toString()) + ");");
			
				mapa.put("scriptCustom", "<script src=\"/PSPES/resources/js/bootstrap/bootstrap.min.js\"></script><script src=\"resources/js/jquery-custom/jquery-ui-1.8.16.custom.min.js\"></script> <script src=\"resources/js/jquery-custom/jquery.event.drag-2.3.js\"></script>");
				mapa.put("scriptGrilla", "<script src=\"/PSPES/resources/js/slickGrid/slick.core.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.editors.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.grid.js\"></script>	<script src=\"/PSPES/resources/js/slickGrid/slick.dataview.js\"></script>");
			
			return new ModelAndView(PANTALLA_HOME_POLIZA, mapa);
		
		} catch (Exception e) {

			logger.error(getUserLog(request)+ "Exploto al mostrar la poliza" , e);
			mapa.put("errorMsg", "" + e.getMessage());

		}
		
		return new ModelAndView(PANTALLA_ERROR, mapa);
		
	}
	

		private List buscarInspeccionesPorPoliza(String ramo, String poliza, String user, EnvironmentType entorno) throws Exception {
			return executeService.executeGenericSQL("select * from cart_inspecciones where cain_cace_carp_cd_ramo = " + ramo + "  and cain_cace_capo_nu_poliza = " + poliza);
		}
		
	
	
	//------------------------------------ pantalla JSON del modal MOVIMIENTOS ---------------------------- //
		@RequestMapping(value = "/datosMovimientos", method = RequestMethod.GET)
		public @ResponseBody
		Object getDatosPolizasProductor(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				logger.debug("inicio el metodo");
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
				Map<String, Object> mapa = new HashMap<String, Object>() ;

				String poliza = request.getParameter("poliza");
				String ramo = request.getParameter("ramo");
				String sucursal = request.getParameter("sucursal");
				
				return polizaService.getMovimientosPoliza(poliza,ramo,sucursal);

			} catch (Exception e) {
				logger.error(getUserLog(request)+"Exploto al mostrar los movimientos de la Poliza", e);
			}

			return "No se encontraron movimientos de la poliza";
		}


	/*
	 * Este metodo se invoca por ajax cuando se selecciona un endoso
	 */
	@RequestMapping(value = "/datosEndoso", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosEndoso(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String endoso = request.getParameter("endoso");
			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			return getEndosoPoliza(ramo, poliza, endoso,sucursal,getEntorno(request),getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos dle endoso", e);
		}

		return "vacio";
	}
	
	/*
	 * Este metodo se invca por ajax cuando se selecciona un endoso en el panel B de la entidad Poliza
	 */
	@RequestMapping(value = "/datosCertificado", method = RequestMethod.GET)
	public @ResponseBody Object getDatosCertificados(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String endoso = request.getParameter("endoso");
			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			
			return getCertificadosPoliza(ramo, poliza, endoso,sucursal, getEntorno(request),getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos del endoso", e);
			return "" + e.getMessage();

		}
	}
	
	
	/*
	 * Este metodo se invca por ajax cuando se selecciona el modal Poliza Anterior
	 */
	@RequestMapping(value = "/datoPolizaAnterior", method = RequestMethod.GET)
	public @ResponseBody Object getDatoPolizaAnteriors(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo modal para la poliza anterior");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			return getPolizaAnterior(poliza,ramo);
			
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos dle endoso",e);
			return "" + e.getMessage();

		}
	}
	

	
	
	
	//MUESTRA PANEL D
	
	private Object getEndosoPoliza(String ramo, String poliza, String endoso,String sucursal,EnvironmentType environment, String user) throws Exception {
		
		logger.debug("Inicio get endoso poliza :" + ramo + " endoso : " + endoso + " poliza : " + poliza);

		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_ENDOSO","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","nuPoliza");
		xx.put("P_NU_ENDOSO","endoso");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("sucursal", sucursal);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("nuPoliza", poliza);
		parametrosIn.put("endoso",endoso);
		parametrosIn.put("user",user);
		parametrosIn.put("origen","go");
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_POLIZA,ConstantsProcedureDB.PUB_ENDOSO);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,"PUB_ENDOSO",new Date().getTime(),"_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return datoSalida.get(0);
	}

	
	//panel c actualizado

	private Object getCertificadosPoliza(String ramo, String poliza, String endoso,String sucursal, EnvironmentType environment,String user) throws Exception {
		
		logger.debug("Inicio get endoso poliza :" + ramo + " endoso : " + endoso + " poliza : " + poliza);
		EnvironmentContextHolder.setEnvironmentType(environment);

		
		Map<String, String> xx = new HashMap<String, String>();
		Map<String, String> mapa = new HashMap<String, String>();

		xx.put("P_TF_CERTIF","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","nuPoliza");
		xx.put("P_NU_ENDOSO","endoso");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("nuPoliza", poliza);
		parametrosIn.put("sucursal", sucursal);
		parametrosIn.put("origen", "go");
		parametrosIn.put("user", user);
		

		if (endoso != null && endoso.length()>0) {
			parametrosIn.put("endoso",endoso);
		}
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean("PKG_PUB_POLIZA","PUB_CERTIFICADOS");
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,"PUB_CERTIFICADOS",new Date().getTime(),"_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
				
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return datoSalida;
	}

	@RequestMapping(value = "/datosExtraPoliza", method = RequestMethod.GET)
	public @ResponseBody Object getDatosExtraPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo modal para la poliza anterior");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			String certificado = request.getParameter("certificado");
			String endoso = request.getParameter("endoso");

			return polizaService.getDatosExtraPoliza(poliza, ramo,sucursal, certificado,endoso, getEntorno(request),getUser(request));
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos dle endoso",e);
			return "" + e.getMessage();

		}
	}
	
	

		/*------------------------------------ Modal Poliza anterior  ----------------------**/


		private Object getPolizaAnterior(String poliza, String ramo) throws Exception {
			
			logger.debug("Inicio get polizaAnterior con poliza :" + poliza +" y ramo ;"+ ramo );

			
			Map<String, String> xx = new HashMap<String, String>();
			
			xx.put("P_TF_POLI","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","poliza");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo",ramo);
			parametrosIn.put("poliza",poliza);

			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean("PKG_PUB_POLIZA","PUB_POLIZA");
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,"PUB_POLIZA",new Date().getTime(),"_");
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return datoSalida.get(0);
		}
		
		
		
		
	@RequestMapping(value = "/datosCertificadosPoliza", method = RequestMethod.GET)
	public @ResponseBody Object getDatosCertificadosPoliza(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo: " + "getDatosCertificadosPoliza");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			

			Future<ArrayList> datosCertificadosPoliza = polizaService.getCertificadoPoliza(ramo,poliza,sucursal, getEntorno(request), getUser(request));

			while (!(datosCertificadosPoliza.isDone() )) {
				Thread.sleep(5);
			}
			
			return datosCertificadosPoliza.get();

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los certificados de la Poliza", e);
		}

		return "No se encontraron certificados de la poliza";
	}
	
	@RequestMapping(value = "/datosEndososPoliza", method = RequestMethod.GET)
	public @ResponseBody Object getDatosEndososPoliza(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo: " + "getDatosEndososPoliza");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			int paginaNumeroRecibida =Integer.parseInt(request.getParameter("numPag").toString()); 

			return polizaService.getEndososPolizaPaginado(ramo,poliza, sucursal, getEntorno(request), getUser(request),(paginaNumeroRecibida*500)-500,500*paginaNumeroRecibida);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los endosos de la Poliza", e);
		}

		return "No se encontraron endosos de la poliza";
	}
	
	
	@RequestMapping(value = "/datosBoletaDePago", method = RequestMethod.GET)
	public @ResponseBody Object getDatosBoletaDePago(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo: " + "getDatosBoletaDePago");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			Map<String, Object> mapa = new HashMap<String, Object>() ;

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			
			List listaBoletaPago = polizaService.getBoletaDePagoPoliza(ramo,poliza, sucursal, getEntorno(request), getUser(request));
						
			return listaBoletaPago;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar las boletas de pago de la Poliza", e);
		}

		return "La poliza no posee deuda";
	}
	
	@RequestMapping(value = "/enviarBoletaDePago", method = RequestMethod.GET)
	public @ResponseBody Object getEnviarBoletaDePago(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el metodo: " + "getEnviarBoletaDePago");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			Map<String, Object> mapa = new HashMap<String, Object>() ;

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String sucursal = request.getParameter("sucursal");
			String[] indicesBoleta = request.getParameter("indicesBoleta").split(",");
			String emailDestino = request.getParameter("emailDestino");
			String asegurado = request.getParameter("descAsegurado");
			String datosBoletaPagoJson = request.getParameter("stringBoletaJson");

			List<BoletaPagoDTO> boletas; 
			
			boletas = obtenerBoletasDePago(datosBoletaPagoJson, poliza, asegurado, ramo, sucursal, indicesBoleta);
			
			if(enviarBoletaDePago(boletas, asegurado, emailDestino)){
				return boletas;
				
			}			

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al enviar las boletas de pago de la Poliza", e);
		}

		return "No se enviaron las boletas de la poliza";
	}
	
	public static List<BoletaPagoDTO> obtenerBoletasDePago(String datoJson, String poliza, String asegurado, String ramo, String sucursal, String[] indicesBoleta){
		
		List<BoletaPagoDTO> boletas = new ArrayList<BoletaPagoDTO>(); 
		
		 	JsonParser parser = new JsonParser();
	        JsonArray gsonArr = parser.parse(datoJson).getAsJsonArray();

	        int i=0, j=0;
	        for (JsonElement obj : gsonArr) {

	            JsonObject gsonObj = obj.getAsJsonObject();
	            
	            if( j<indicesBoleta.length && Integer.parseInt(indicesBoleta[j]) == i ){
					
					BoletaPagoDTO boleta = new BoletaPagoDTO();
					
					boleta.setAsegurado(asegurado);
					boleta.setCodigoBarras(gsonObj.get("P_TF_DEUD_INB_VC_CODIGO_BARRA").getAsString());
					boleta.setCompania(gsonObj.get("P_TF_DEUD_INB_NU_COMPANIA").getAsString());
					boleta.setFechaHasta(gsonObj.get("P_TF_DEUD_CARE_FE_HASTA").getAsString());
					boleta.setFechaVencimiento(gsonObj.get("P_TF_DEUD_INB_FE_VENCIMIENTO").getAsString());
					boleta.setImporte(gsonObj.get("P_TF_DEUD_INB_MT_IMPORTE").getAsString());
					boleta.setImporteDesc(gsonObj.get("P_TF_DEUD_INB_VC_IMPORTE").getAsString());
					boleta.setLogo("/imgPdf/logo_provincia_margen.jpg");
					boleta.setPoliza(poliza);
					boleta.setRamo(ramo);
					boleta.setTextoInferior1(gsonObj.get("P_TF_DEUD_INB_VC_MENSAJE_01") !=null ? gsonObj.get("P_TF_DEUD_INB_VC_MENSAJE_01").getAsString() : "");
					boleta.setTextoInferior2(gsonObj.get("P_TF_DEUD_INB_VC_MENSAJE_02") !=null ? gsonObj.get("P_TF_DEUD_INB_VC_MENSAJE_02").getAsString() : "");
					boleta.setTextoInferior3(gsonObj.get("P_TF_DEUD_INB_VC_MENSAJE_03") !=null ? gsonObj.get("P_TF_DEUD_INB_VC_MENSAJE_03").getAsString() : "");
					boleta.setTipoMoneda(gsonObj.get("P_TF_DEUD_CAMO_SM_MONEDA").getAsString());
					
					boletas.add(boleta);
					j++;

	            }
	            i++;
	        }
		
	        return boletas;
	}
	
	public static boolean enviarBoletaDePago(List boletas, String asegurado, String emailDestino){
		
		boolean isEnvio = false;
		
		try{
			

			String destinoBoleta = ReportePDFUtil.generarReporteBoletaDePago(boletas);
			//Configuro propiedades usuario
			Properties propiedadesUser = new Properties();
			
			Date date = new Date();
			DateFormat fechaFormato = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
			propiedadesUser.setProperty("fechaProcesamiento", fechaFormato.format(date));
			propiedadesUser.setProperty("usuario", asegurado);
			
			//Configuro email 
			EmailPS emailIn = new EmailPS();
			
			emailIn.setEmailDestino(emailDestino);
			
			emailIn.setSubject("Boleta de pago - Provincia Seguros S.A.");
			emailIn.setTemplate("templateEmailBoletaDePago.html");
			emailIn.setPropiedadesUser(propiedadesUser);
			
			//Envio email con adjunto
			isEnvio = EmailSender.enviarConAdjunto(emailIn, destinoBoleta);	
			
			
		}catch(Exception e){
			logger.error("Exploto al enviar las boletas de pago de la Poliza por email", e);
		}
		
		return isEnvio;
	}
	
}
