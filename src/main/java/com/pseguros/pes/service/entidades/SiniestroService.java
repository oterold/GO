package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Service
public class SiniestroService{
	@Autowired
	private ExecuteService executeService;
	
	private static final Logger logger = LoggerFactory.getLogger(SiniestroService.class);
	
	//PANEL A
		@Async
		public Future<ArrayList> getSiniestroDatos(String siniestro,String ramo, String annio, EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			
			xx.put("P_TF_LISTA_IMPR","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_NU_ANNIO","annio");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_NU_SINIESTRO","siniestro");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("annio", annio);
			parametrosIn.put("siniestro", siniestro);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("user", user);

			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS,ConstantsProcedureDB.PUB_LISTA_SINIESTROS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_SINIESTROS,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}
	
	
		//PANEL B
		@Async
		public Future<ArrayList> getSubSiniestroDatos(String siniestro,String ramo, String annio, EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			
			xx.put("P_TF_LISTA","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_ANNIO","annio");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_NU_SINIESTRO","siniestro");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("annio", annio);
			parametrosIn.put("siniestro", siniestro);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("user", user);

			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS,ConstantsProcedureDB.PUB_SUB_SINIESTROS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_SUB_SINIESTROS,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				return new AsyncResult<ArrayList>(new ArrayList());
			}
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}
		//PANEL C
		
		public Future<ArrayList> getDatoInspecciones(String siniestro,String ramo, String annio, EnvironmentType environmentType, String user)  throws Exception {
			
			logger.debug("Inicio inspecciones ");
			EnvironmentContextHolder.setEnvironmentType(environmentType);

			Map<String, String> xx = new HashMap<String, String>();

			xx.put("P_TF_LISTA_IMPR", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_NU_ANNIO", "annio");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_NU_SINIESTRO", "siniestro");
			xx.put("P_NU_SUB_SIN", "subSiniestro");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("annio", annio);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("siniestro", siniestro);
			parametrosIn.put("user", user);

			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_INSPECCIONES_SINIESTROS);
			Map<String, String> parametrosDeclarados = xx;

			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_INSPECCIONES_SINIESTROS, new Date().getTime());

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				return new AsyncResult<ArrayList>(new ArrayList());
			}

			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

			return new AsyncResult<ArrayList>(datoSalida);
		}

		
		

		
		
		
		//PANEL C CON JSON
		public Object getDatosInspecciones(String siniestro,String ramo, String annio, String subSiniestro, EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);
			logger.debug("Inicio metetodo panel C siniestro : " + siniestro +" ramo : "+  ramo +" annio : "+ annio+" tercero : " + subSiniestro);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_LISTA_IMPR", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_NU_ANNIO", "annio");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_NU_SINIESTRO", "siniestro");
			xx.put("P_NU_SUB_SIN", "subSiniestro");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("annio", annio);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("siniestro", siniestro);
			parametrosIn.put("subSiniestro", subSiniestro);
			parametrosIn.put("user", user);

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_INSPECCIONES_SINIESTROS), parametrosIn, xx, ConstantsProcedureDB.PUB_INSPECCIONES_SINIESTROS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}

		
		
		
		
		
		
		
		

		//PANEL D
		public Object getDatosParametricos(String siniestro,String ramo, String annio, String subSiniestro, EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);
			logger.debug("Inicio metetodo panel C siniestro : " + siniestro +" ramo : "+  ramo +" annio : "+ annio+" tercero : " + subSiniestro);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_LISTA_IMPR", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_NU_ANNIO", "annio");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_NU_SINIESTRO", "siniestro");
			xx.put("P_NU_SUB_SIN", "subSiniestro");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");

			xx.put("P_TF_LISTA_IMPR_DSP_DE_DATO","P_TF_LISTA_IMPR_INB_DSP_LABEL_DATOS");
			xx.put("P_TF_LISTA_IMPR_SITD_DATO","P_TF_LISTA_IMPR_SIDD_CRPD_DATO");
			xx.put("P_TF_LISTA_IMPR_DSP_DSC_DATO","P_TF_LISTA_IMPR_INB_DSP_DSC_DATO");
			
			
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("annio", annio);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("siniestro", siniestro);
			parametrosIn.put("subSiniestro", subSiniestro);
			parametrosIn.put("user", user);

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_SINIESTROS_DATOS), parametrosIn, xx, ConstantsProcedureDB.PUB_SINIESTROS_DATOS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}

		
		//Modal NOTAS
		public Object getDatosNotas(String siniestro,String ramo, String annio, EnvironmentType environment, String user) throws Exception {
			logger.debug("Inicio metetodo modal notas con siniestro : " + siniestro +" ramo : "+  ramo +" annio : "+ annio);
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_LISTA_IMPR", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_NU_ANNIO", "annio");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_NU_SINIESTRO", "siniestro");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("annio", annio);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("siniestro", siniestro);
			parametrosIn.put("user", user);

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_NOTAS_SINIESTROS), parametrosIn, xx, ConstantsProcedureDB.PUB_NOTAS_SINIESTROS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}

		
		
		//Modal Detalle del tercero
		public Object getDetalletercero(String siniestro,String ramo, String annio, String tercero, EnvironmentType environment, String user) throws Exception {
			logger.debug("Inicio metetodo modal notas con siniestro : " + siniestro +" ramo : "+  ramo +" annio : "+ annio);
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_LISTA_IMPR", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_NU_ANNIO", "annio");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_NU_SINIESTRO", "siniestro");
			xx.put("P_NU_SUB_SIN", "tercero");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("annio", annio);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("siniestro", siniestro);
			parametrosIn.put("tercero", tercero);
			parametrosIn.put("user", user);


			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_SINT_TERCEROS), parametrosIn, xx, ConstantsProcedureDB.PUB_SINT_TERCEROS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		
		//Modal Detalle del SINIESTRO
		public Object getDetalleModalSiniestro(String siniestro,String ramo, String annio, EnvironmentType environment, String user) throws Exception {
			logger.debug("Inicio metetodo modal notas con siniestro : " + siniestro +" ramo : "+  ramo +" annio : "+ annio);
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_LISTA_IMPR","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_NU_ANNIO","annio");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_NU_SINIESTRO","siniestro");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("annio", annio);
			parametrosIn.put("siniestro", siniestro);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("user", user);


			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_LISTA_SINIESTROS), parametrosIn, xx, "PUB_LISTA_SINIESTROS", new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		public Object getCoberturaFinancieraModalSiniestro(String sucursal,String ramo,String poliza,String certificado,String endoso,String fecha, EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_LISTA_IMPR","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_NU_SUCURSAL","sucursal");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CD_POLIZA","poliza");
			xx.put("P_CD_CERTIFICADO","certificado");
			xx.put("P_CD_ENDOSO","endoso");
			xx.put("P_FECHA","fecha");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("certificado", certificado);
			parametrosIn.put("endoso", endoso);
			parametrosIn.put("fecha", fecha);
			parametrosIn.put("origen", "go");
			parametrosIn.put("user", user);
			

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_COBERTURA_FINANCIERA), parametrosIn, xx, ConstantsProcedureDB.PUB_COBERTURA_FINANCIERA, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		//coberturas
		
		public Object getCoberturaModalSiniestro(String ramo,String siniestro,String annio, EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_LISTA_IMPR","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_NU_ANNIO","annio");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_NU_SINIESTRO","siniestro");
			xx.put("P_FECHA ","fecha");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("siniestro", siniestro);
			parametrosIn.put("annio", annio);
			parametrosIn.put("origen", "go");
			parametrosIn.put("user", user);
			


			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_COBERTURA_SINIESTROS), parametrosIn, xx, ConstantsProcedureDB.PUB_COBERTURA_SINIESTROS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		public String getDatoUrlCertificadoSiniestro(String datoReporteSiniestro, EnvironmentType environmentType, String user)  throws Exception {
			
			logger.debug("Inicio inspecciones ");
			EnvironmentContextHolder.setEnvironmentType(environmentType);

			Map<String, String> xx = new HashMap<String, String>();

			xx.put("P_URL_REPORT", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			
			xx.put("P_JSON_PARAMETROS", "parametros");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("parametros", datoReporteSiniestro);
			
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "GO");


			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_WEB_PROCESOS, ConstantsProcedureDB.PR_DEV_URL_GEN_REPORTE);
			Map<String, String> parametrosDeclarados = xx;

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PR_DEV_URL_GEN_REPORTE, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}

			String datoSalida = (String) salida.get("datosSalida");

			if (compruebaURL(datoSalida)) {
				return datoSalida;
			}
			throw new Exception("Url invalida " + datoSalida);
		}

		
		
		
	private boolean compruebaURL(String url) {
		boolean retValue = false;
		try {
			java.net.URL verificar = new java.net.URL(url);
			retValue = true;
		} catch (java.net.MalformedURLException mue) {
			return (retValue);
		}
		return (retValue);
	}
		
	

	//Modal Detalle del tercero
	public Object getIndiceRiesgoSiniestro(String annio,String ramo, String siniestro, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_LISTA_IMPR", "datosSalida");
		xx.put("P_AVISO_INDI", "avisoDato");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_ANNIO", "annio");
		xx.put("P_NU_RAMO", "ramo");
		xx.put("P_NU_SINIESTRO", "siniestro");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("annio", annio);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("siniestro", siniestro);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		


		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_SINT_IND_RIESGO), parametrosIn, xx, ConstantsProcedureDB.PUB_SINT_IND_RIESGO, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		
		return salida;

	}
	
	
		
		
}