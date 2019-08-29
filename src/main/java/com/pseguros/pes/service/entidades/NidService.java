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
public class NidService {
	private static final Logger logger = LoggerFactory.getLogger(NidService.class);

	@Autowired
	private ExecuteService executeService;
	
	
	//PANEL A
	@Async
	public Future<ArrayList> getNidDatos(String nid,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_NID","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NU_SECUENCIA","secuencia");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("secuencia", nid);
		parametrosIn.put("user", user);

		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_NID,ConstantsProcedureDB.PUB_CABECERA_NID);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_CABECERA_NID,new Date().getTime());
		
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
		public Future<ArrayList> getNidListaDetalle(String nid,EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			
			xx.put("P_TF_LISTA_DET","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_NU_SECUENCIA","secuencia");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("secuencia", nid);
			parametrosIn.put("user", user);

			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_NID,ConstantsProcedureDB.PUB_LISTA_DETALLE);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_DETALLE,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}
	
		//PANEL C
		@Async
		public Future<ArrayList> getNidVinculados(String nid,EnvironmentType environment, String user) throws Exception {
			logger.debug("Inicio el metodo nid vinculados ");
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();

			xx.put("P_TF_NID_VINC","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_NU_SECUENCIA","secuencia");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("secuencia", nid);
			parametrosIn.put("user", user);


			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_NID, ConstantsProcedureDB.PUB_NIDS_VINCULADOS);
			Map<String, String> parametrosDeclarados = xx;

			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_NIDS_VINCULADOS, new Date().getTime());

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				return new AsyncResult<ArrayList>(new ArrayList());
			}

			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

			return new AsyncResult<ArrayList>(datoSalida);
		}

		
		
		
		
		
		
		
		//PANEL D CON JSON
		public Object getDetalleOrden(String nid,String orden) throws Exception {
			logger.debug("Inicio metetodo panel D nid : " + nid +" con orden "+orden );

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_DETALLE", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_NU_SECUENCIA", "secuencia");
			xx.put("P_NU_ORDEN", "orden");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("secuencia", nid);
			parametrosIn.put("orden", orden);

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_NID, ConstantsProcedureDB.PUB_DETALLE), parametrosIn, xx, "PUB_DETALLE", new Date().getTime(), "_");

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