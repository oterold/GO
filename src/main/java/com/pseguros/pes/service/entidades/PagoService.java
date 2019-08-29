package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
public class PagoService {

	private static final Logger logger = LoggerFactory.getLogger(PagoService.class);

	@Autowired
	private ExecuteService executeService;

	
	
	//PANEL A
	@Async
	public Future<ArrayList> getSiniestroDatos(String siniestro,String ramo, String annio,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("Inicio metetodo panel A pagos : " + siniestro );

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
	public Future<ArrayList> getListaPagos(String siniestro,String ramo,String subsiniestro, String annio,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("Inicio metetodo panel B pagos : " + siniestro );

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_SUBSINI","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NU_ANNIO","annio");
		xx.put("P_NU_RAMO","ramo");
		xx.put("P_NU_SINIESTRO","siniestro");
		xx.put("P_NU_TERCERO","tercero");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("annio", annio);
		parametrosIn.put("siniestro", siniestro);
		parametrosIn.put("tercero", subsiniestro);
		parametrosIn.put("ramo", ramo);
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_PAGO,ConstantsProcedureDB.PUB_SINI_LISTA_PAG);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_SINI_LISTA_PAG,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			return new AsyncResult<ArrayList>(new ArrayList());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}

	
	//PANEL D CON JSON
	public Object getDetallePago(String compromiso, EnvironmentType environment, String user) throws Exception {
		logger.debug("Inicio metetodo panel D pagos : " + compromiso );
		
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_DETA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_COMPROMISO", "compromiso");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("compromiso", compromiso);
		parametrosIn.put("user", user);

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_PAGO, ConstantsProcedureDB.PUB_SINI_COMP), parametrosIn, xx, "PUB_SINI_COMP", new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	
	//PANEL C CON JSON
		public Object getConceptos(String compromiso, EnvironmentType environment, String user) throws Exception {
			logger.debug("Inicio metetodo panel D pagos : " + compromiso );

			EnvironmentContextHolder.setEnvironmentType(environment);
			
			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_CONCEPTOS", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_COMPROMISO", "compromiso");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("compromiso", compromiso);
			parametrosIn.put("user", user);

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_PAGO, ConstantsProcedureDB.PUB_SINI_CONCEPTOS), parametrosIn, xx, "PUB_SINI_CONCEPTOS", new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		//Modal cronograma
		public Object getCronograma(String compromiso, EnvironmentType environment, String user) throws Exception {
			logger.debug("Inicio metetodo modal cronograma con comprmiso : " + compromiso);

			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_CRON","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_COMPROMISO","compromiso");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("compromiso",compromiso );
			parametrosIn.put("user", user);

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_PAGO, ConstantsProcedureDB.PUB_SINI_CRON), parametrosIn, xx, "PUB_SINI_CRON", new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		
		
		

}