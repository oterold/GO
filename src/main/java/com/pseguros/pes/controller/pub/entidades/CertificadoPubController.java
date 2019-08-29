package com.pseguros.pes.controller.pub.entidades;

import java.io.File;
import java.io.FileInputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import com.pseguros.pes.dto.DeudaPoliza;
import com.pseguros.pes.excel.util.ExcelUtil;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.CertificadoService;
import com.pseguros.pes.service.entidades.PolizaService;
import com.pseguros.pes.util.Dateutils;

@Controller
public class CertificadoPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(CertificadoPubController.class);

	private static final String PANTALLA_DIRECCIONES_CERTIFICADO = "partials/pes/entidades/certificado/certificadoHomeTemplate";

	@Autowired
	private ExecuteService executeService;

	@Autowired
	private CertificadoService certificadoService;

	@Autowired
	private PolizaService polizaService;

	
	@RequestMapping(value = "/homeCertificado", method = RequestMethod.GET)
	public ModelAndView homeCertificadoPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			logger.debug("Mostrar Pantalla homeCertificado");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String nroCertificado = request.getParameter("nroCertificado");
			String sucursal = request.getParameter("sucursal");
			String tipoFac = request.getParameter("facturacion");
			String endoso = request.getParameter("endoso");

			agregarBreadcrumb(request, "Certificado #" + nroCertificado);
			mapa.putAll(getDatosComunes(request));
			mapa.put("funcionOnload", "inicioCertificadoHome()");

			Future<ArrayList> cabeceraCertificados = certificadoService.getCertificadoCabecera(ramo, poliza, nroCertificado, sucursal, getUser(request), getEntorno(request));
			Future<ArrayList> cabeceraCertificadosExtra = certificadoService.getCertificadoCabeceraExtra(ramo, poliza, nroCertificado, sucursal,endoso, getUser(request), getEntorno(request));
			Future<ArrayList> endososCertificados = certificadoService.getCertificadoEndosos(ramo, poliza, nroCertificado, sucursal, getUser(request), getEntorno(request));
			
			while (!(cabeceraCertificados.isDone() && endososCertificados.isDone() && cabeceraCertificadosExtra.isDone())) {
				Thread.sleep(5);
			}

			mapa.put("usuaro", getUser(request)+"@pseguros.com.ar");
			mapa.put("cabecera", cabeceraCertificados.get());
			mapa.put("endososCertificado", endososCertificados.get());
			mapa.put("cabeceraExtra", cabeceraCertificadosExtra.get());
			mapa.put("endosoCertificadoSeleccionado", Integer.toString(endososCertificados.get().size()));
			mapa.put("tipoFactu", tipoFac);
			return new ModelAndView(PANTALLA_DIRECCIONES_CERTIFICADO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto homeCertificado", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	@RequestMapping(value = "/certificadoCab", method = RequestMethod.GET)
	public @ResponseBody Object getCertificado(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String nroCertificado = request.getParameter("nroCertificado");
			String sucursal = request.getParameter("sucursal");

			Future<ArrayList> certificadoCabecera = certificadoService.getCertificadoCabecera(ramo, poliza, nroCertificado, sucursal, getUser(request), getEntorno(request));

			while (!(certificadoCabecera.isDone())) {
				Thread.sleep(5);
			}

			return certificadoCabecera.get().get(0);

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar el certificado", e);
			return "" + e.getMessage();
		}

	}

	@RequestMapping(value = "/certificadoParametrico", method = RequestMethod.GET)
	public @ResponseBody Object getCertificadoParametrico(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		try {
			logger.debug("inicio el metodo");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			
			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String nroCertificado = request.getParameter("certificado");
			String sucursal = request.getParameter("sucursal");
			String endoso = request.getParameter("endoso");
			String bien = request.getParameter("bien");

			return certificadoService.getCertificadoDatosParametricos(ramo, poliza, nroCertificado, sucursal, endoso,bien,getEntorno(request), getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los datos parametricos de certificado", e);
			return "" + e.getMessage();
		}
		
	}
	//------------------------------------ pantalla modal prima ---------------------------- //
	@RequestMapping(value = "/datosPrima", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosEmbargos(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal prima");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String endoso = request.getParameter("endoso");
			String certificado = request.getParameter("certificado");
			String sucursal = request.getParameter("sucursal");
			
			return certificadoService.getDatosPrima(poliza, ramo, sucursal, certificado, endoso, getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar las primas del certificado codigo de error :501680", e);
		}

		return "El certificado no posee primas";
	}
	
	
	//------------------------------------ pantalla modal componentes ---------------------------- //
	@RequestMapping(value = "/datosComponente", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosComponentes(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal componentes");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String endoso = request.getParameter("endoso");
			String certificado = request.getParameter("certificado");
			String sucursal = request.getParameter("sucursal");
			
			return certificadoService.getDatosComponentes(poliza, ramo, sucursal, certificado, endoso, getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los componentes del certificado codigo de error :5011680", e);
		}

		return "El certificado no posee componentes";
	}
	
	
	
	//------------------------------------ pantalla modal IIBB ---------------------------- //
	@RequestMapping(value = "/datosIIBB", method = RequestMethod.GET)
	public @ResponseBody
	Object getDatosIIBB(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("inicio el modal IIBB");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String endoso = request.getParameter("endoso");
			String certificado = request.getParameter("certificado");
			String sucursal = request.getParameter("sucursal");
			
			return certificadoService.getDatosIiBb(poliza, ramo, sucursal, certificado, endoso, getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los IIBB del certificado codigo de error :51461680", e);
		}

		return "El certificado no posee IIBB";
	}
	
	
	
	
	//------------------------------------ lista bienes ---------------------------- //
	@RequestMapping(value = "/bienesCertificado", method = RequestMethod.GET)
	public @ResponseBody
	Object getBienes(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String ramo = request.getParameter("ramo");
			String producto = request.getParameter("producto");
			
			return certificadoService.getBienes(ramo,producto, getEntorno(request),getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar de bienes codigo de error :5112461680", e);
		}

		return "El endoso no posee bienes";
	}
	
	
	
	
	//------------------------------------ acredores Modal ---------------------------- //
	@RequestMapping(value = "/acredoresModalCertificado", method = RequestMethod.GET)
	public @ResponseBody
	Object getAcredoresModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String endoso = request.getParameter("endoso");
			String certificado = request.getParameter("certificado");
			String sucursal = request.getParameter("sucursal");
			String bien = request.getParameter("bien");
			return certificadoService.getAcredores(sucursal, ramo, poliza, certificado, endoso,bien, getEntorno(request),getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los acredores codigo de error :51112461680", e);
		}

		return "El endoso no posee acreedores";
	}
	
	
	//------------------------------------ lista bienes Modal ---------------------------- //
	@RequestMapping(value = "/listaBienesModalCertificado", method = RequestMethod.GET)
	public @ResponseBody
	Object getListaBienesModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String poliza = request.getParameter("poliza");
			String ramo = request.getParameter("ramo");
			String endoso = request.getParameter("endoso");
			String certificado = request.getParameter("certificado");
			String sucursal = request.getParameter("sucursal");
			String bien = request.getParameter("bien");
			
			return certificadoService.getListaBienes(sucursal, ramo, poliza, certificado, endoso,bien,getEntorno(request),getUser(request));

		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto al mostrar los acredores codigo de error :51112461680", e);
		}

		return "El endoso no posee bienes";
	}
	
	
	//------------------------------------ lista bienes Modal ---------------------------- //
		@RequestMapping(value = "/anexosModalCertificado", method = RequestMethod.GET)
		public @ResponseBody
		Object getAnexosModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String poliza = request.getParameter("poliza");
				String ramo = request.getParameter("ramo");
				String endoso = request.getParameter("endoso");
				String certificado = request.getParameter("certificado");
				String sucursal = request.getParameter("sucursal");
				return certificadoService.geAnexosBienes(sucursal, ramo, poliza, certificado, endoso,getEntorno(request),getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request) + "Exploto al mostrar los anexos codigo de error :51112461680", e);
			}

			return "El endoso no posee anexos";
		}
		
		
		//------------------------------------ lista bienes Modal ---------------------------- //
		@RequestMapping(value = "/anexosLineaModalCertificado", method = RequestMethod.GET)
		public @ResponseBody
		Object getAnexosLineaModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String poliza = request.getParameter("poliza");
				String ramo = request.getParameter("ramo");
				String endoso = request.getParameter("endoso");
				String certificado = request.getParameter("certificado");
				String sucursal = request.getParameter("sucursal");
				
				return certificadoService.geAnexosLinea(sucursal, ramo, poliza, certificado, endoso,getEntorno(request),getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request) + "Exploto al mostrar los acredores codigo de error :51112461680", e);
			}

			return "El endoso no posee lineas";
		}
		
		
		
		//------------------------------------ lista clausula Modal ---------------------------- //
		@RequestMapping(value = "/anexosClausulaModalCertificado", method = RequestMethod.GET)
		public @ResponseBody
		Object getAnexosClausulaModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String poliza = request.getParameter("poliza");
				String ramo = request.getParameter("ramo");
				String endoso = request.getParameter("endoso");
				String certificado = request.getParameter("certificado");
				String sucursal = request.getParameter("sucursal");
				String linea = request.getParameter("linea");

				return certificadoService.geAnexosClausula(sucursal, ramo, poliza, certificado, endoso,linea,getEntorno(request),getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request) + "Exploto al mostrar los acredores codigo de error :51112461680", e);
			}

			return "El endoso no posee clausulas";
		}
		
		
		
		//------------------------------------ lista texto Modal ---------------------------- //
		@RequestMapping(value = "/textoModalCertificado", method = RequestMethod.GET)
		public @ResponseBody
		Object getTextoModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String poliza = request.getParameter("poliza");
				String ramo = request.getParameter("ramo");
				String endoso = request.getParameter("endoso");
				String certificado = request.getParameter("certificado");
				String sucursal = request.getParameter("sucursal");
				return certificadoService.geTextoCertificado(sucursal, ramo, poliza, certificado, endoso,getEntorno(request),getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request) + "Exploto al mostrar los acredores codigo de error :51112461680", e);
			}

			return "El endoso no posee textos";
		}
	

		//------------------------------------ lista bneficiario Modal ---------------------------- //
		@RequestMapping(value = "/beneficiarioModalCertificado", method = RequestMethod.GET)
		public @ResponseBody
		Object getBeneficiarioModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String poliza = request.getParameter("poliza");
				String ramo = request.getParameter("ramo");
				String bien = request.getParameter("bien");
				String certificado = request.getParameter("certificado");
				String sucursal = request.getParameter("sucursal");
				return certificadoService.geBeneficiariosCertificado(sucursal, ramo, poliza, certificado, bien,getEntorno(request),getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request) + "Exploto al mostrar los acredores codigo de error :3151112461680", e);
			}

			return "El bien no posee beneficiarios";
		}
		
		
		//------------------------------------ lista ubicacion Modal ---------------------------- //
		@RequestMapping(value = "/ubicacionModalCertificado", method = RequestMethod.GET)
		public @ResponseBody
		Object getUbicacionModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String poliza = request.getParameter("poliza");
				String ramo = request.getParameter("ramo");
				String bien = request.getParameter("bien");
				String certificado = request.getParameter("certificado");
				String sucursal = request.getParameter("sucursal");
				return certificadoService.geUbicacionCertificado(sucursal, ramo, poliza, certificado, bien,getEntorno(request),getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request) + "Exploto al mostrar los acredores codigo de error :351112461680", e);
			}

			return "El bien no posee ubicaciones";
		}
		
		

		//------------------------------------ lista ubicacion Modal ---------------------------- //
		@RequestMapping(value = "/dispSatelitalModalCertificado", method = RequestMethod.GET)
		public @ResponseBody
		Object getDipsSatelitalModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
			try {
				EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

				String prestador = request.getParameter("prestador");
				String identificador = request.getParameter("identificador");
				return certificadoService.getDispSatelitalCertificado(prestador, identificador,getEntorno(request),getUser(request));

			} catch (Exception e) {
				logger.error(getUserLog(request) + "Exploto al mostrar los acredores codigo de error :151112461680", e);
			}

			return "El endoso no posee dispositivos satelital";
		}
		
		
		
		//------------------------------------ lista ubicacion Modal ---------------------------- //
				@RequestMapping(value = "/alarmaModalCertificado", method = RequestMethod.GET)
				public @ResponseBody
				Object getAlarmaModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
					try {
						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

						String identificador = request.getParameter("identificador");
						return certificadoService.getAlarmaCertificado(identificador,getEntorno(request),getUser(request));

					} catch (Exception e) {
						logger.error(getUserLog(request) + "Exploto al mostrar los acredores codigo de error :15111246168320", e);
					}

					return "El endoso no posee alarma";
				}
				
				//------------------------------------ lista ubicacion Modal ---------------------------- //
				@RequestMapping(value = "/libreDeudaModalCertificado", method = RequestMethod.GET)
				public @ResponseBody
				Object getLibreDeudaModalCertificado(HttpSession session, HttpServletRequest request) throws Exception {
					try {
						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

						String poliza = request.getParameter("poliza");
						String ramo = request.getParameter("ramo");
						String certificado = request.getParameter("certificado");
						String sucursal = request.getParameter("sucursal");
						String email = request.getParameter("email");
						
						return certificadoService.getLibreDeudaCertificado(poliza, ramo, certificado, sucursal,email,getEntorno(request),getUser(request));

					} catch (Exception e) {
						logger.error(getUserLog(request) + "Exploto al mostrar el libre de deuda error :351112246146180", e);
					}

					return "no se pudo enviar el email";
				}
				
				
				
				
				
				
				
				
				@RequestMapping("/descargarArchivoExcelTextosCertificados")
				public ModelAndView descargarArchivoExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
					Map<String, Object> mapa = new HashMap<String, Object>();
					
					try {

						logger.debug("Mostrar Pantalla Poliza Home");
						
						EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
						mapa.putAll(getDatosComunes(request));
						mapa.put("entorno", getEntorno(request));
						
						
						String texto = request.getParameter("texto");

							ExcelUtil eu = new ExcelUtil();
							Map beans=new HashMap();
							
							Date date = new Date();
							DateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
							DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
							beans.put("fechaActual",dateFormat.format(date) +" - "+hourFormat.format(date)); 
							
							String archivoXLS = "/tmp/"+new Date().getTime() + ".xls";
							String tipoArchivo ="";
							beans.put("texto",texto);
							
							
							eu.ejecutar(beans, "templateCertificadoTextos.xls", archivoXLS);
							tipoArchivo = "CertificadoTexto";
							


						
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
