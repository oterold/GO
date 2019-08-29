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
public class JuicioService {

	private static final Logger logger = LoggerFactory.getLogger(JuicioService.class);

	@Autowired
	private ExecuteService executeService;
	
	//PANEL A
			@Async
			public Future<ArrayList> getSiniestroDatos(String siniestro,String ramo, String annio,EnvironmentType environment, String user) throws Exception {
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
			public Future<ArrayList> getJuiciosDatos(String siniestro,String ramo, String annio,EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				
				xx.put("P_TF_LISTA_RAJ","datosSalida");
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
				
				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_RAJ,ConstantsProcedureDB.PUB_LISTA_RAJ);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_RAJ,new Date().getTime());
				
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
			public Object getDetalleJuicio(String juicio, EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo panel D juicio : " + juicio );
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_DETALLE_RAJ", "datosSalida");
				xx.put("P_VC_MENS", "mensaje");
				xx.put("P_VC_ERRO", "error");
				xx.put("P_NU_JUICIO", "juicio");
				xx.put("P_ORIGEN", "origen");
				xx.put("P_USUARIO", "user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("juicio", juicio);
				parametrosIn.put("user", user);

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_RAJ, ConstantsProcedureDB.PUB_DETALLE_RAJ), parametrosIn, xx, ConstantsProcedureDB.PUB_DETALLE_RAJ, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}

			
			
			//PANEL C CON JSON
			public Object getSentencia(String juicio,String ramo , String annio, EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo panel C juicio : " + juicio +" con ramo"+ramo );

				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_SENTENCIA", "datosSalida");
				xx.put("P_VC_MENS", "mensaje");
				xx.put("P_VC_ERRO", "error");
				xx.put("P_NU_ANNIO", "annio");
				xx.put("P_NU_RAMO", "ramo");
				xx.put("P_NU_JUICIO", "juicio");
				xx.put("P_ORIGEN", "origen");
				xx.put("P_USUARIO", "user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("juicio", juicio);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("annio", annio);
				parametrosIn.put("user", user);

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_RAJ, ConstantsProcedureDB.PUB_SINI_SENTENCIA), parametrosIn, xx, ConstantsProcedureDB.PUB_SINI_SENTENCIA, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			
			//Modal notas Juicio
			public Object getNotasJuicio(String juicio, EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo modal notas con juicio : " + juicio);
				
				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_NOTA","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_JUICIO","juicio");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("juicio", juicio);
				parametrosIn.put("user", user);

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_RAJ, ConstantsProcedureDB.PUB_SINI_NOTAS), parametrosIn, xx, ConstantsProcedureDB.PUB_LISTA_SINIESTROS, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			
			//Modal modificaciones 
			public Object getdatosParametricosJuicio(String juicio,String orden, EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo modal datos parametricos con juicio : " + juicio);
				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_SIJH","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_JUICIO","juicio");
				xx.put("P_NU_ORDEN","orden");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("juicio", juicio);
				parametrosIn.put("orden", orden);
				parametrosIn.put("user", user);
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_RAJ, ConstantsProcedureDB.PUB_SINI_SIJH), parametrosIn, xx, ConstantsProcedureDB.PUB_SINI_SIJH, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			
			//Modal parametricos
			public Object getDatosParametricos(String juicio) throws Exception {
				logger.debug("Inicio metetodo modal notas con juicio : " + juicio);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_DETALLE_SIJD","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_JUICIO","juicio");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("juicio", juicio);
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_RAJ,ConstantsProcedureDB.PUB_SINI_JUICIO), parametrosIn, xx, ConstantsProcedureDB.PUB_SINI_JUICIO, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			//Modal embargos
			public Object getDatosEmbargos(String juicio) throws Exception {
				logger.debug("Inicio metetodo modal notas con juicio : " + juicio);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_DEJU","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_JUICIO","juicio");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("juicio", juicio);
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINI_RAJ,ConstantsProcedureDB.PUB_SINI_DEJU), parametrosIn, xx, ConstantsProcedureDB.PUB_SINI_DEJU, new Date().getTime(), "_");

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


	