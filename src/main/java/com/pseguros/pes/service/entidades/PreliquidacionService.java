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
public class PreliquidacionService {
	private static final Logger logger = LoggerFactory.getLogger(PreliquidacionService.class);

	@Autowired
	private ExecuteService executeService;
	
	
	//PANEL A
	@Async
	public Future<ArrayList> getDatosCabeceraPreli(String preliquidacion,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NU_PRELIQUIDACION","preliquidacion");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("preliquidacion", preliquidacion);
		parametrosIn.put("user", user);
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS,ConstantsProcedureDB.PUB_PRELIQ_CABECERA);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_PRELIQ_CABECERA,new Date().getTime());
		
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
	public Future<ArrayList> getDetallePreli(String preliquidacion,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NU_PRELIQUIDACION","preliquidacion");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("preliquidacion", preliquidacion);
		parametrosIn.put("user", user);
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS,ConstantsProcedureDB.PUB_PRELIQ_DETALLE);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_PRELIQ_DETALLE,new Date().getTime(),0,500);
		
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
	@Async
	public Future<ArrayList> getCancelacion(String preliquidacion,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NU_PRELIQUIDACION","preliquidacion");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("preliquidacion", preliquidacion);
		parametrosIn.put("user", user);
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS,ConstantsProcedureDB.PUB_PRELIQ_CANCELACIONES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_PRELIQ_CANCELACIONES,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			return new AsyncResult<ArrayList>(new ArrayList());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	
	//panel D
	public Object getDatosDetalleInfo(String preliquidacion,EnvironmentType environment, String user) throws Exception {
		
		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NU_PRELIQUIDACION","preliquidacion");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("preliquidacion", preliquidacion);
		parametrosIn.put("user", user);
		
		
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS,ConstantsProcedureDB.PUB_PRELIQ_DETALLE), parametrosIn, xx, ConstantsProcedureDB.PUB_PRELIQ_DETALLE, new Date().getTime(), "_",0,500);

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	//paginado
public Object getDatosDetalleInfoPaginado(String preliquidacion,EnvironmentType environment, String user,int desde,int hasta) throws Exception {
		
		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NU_PRELIQUIDACION","preliquidacion");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("preliquidacion", preliquidacion);
		parametrosIn.put("user", user);
		
		
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_PRELIQ_DETALLE), parametrosIn, xx, ConstantsProcedureDB.PUB_PRELIQ_DETALLE, new Date().getTime(), "_",desde,hasta);

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	//panel Modal
		public Object getDatosModalCancelacion(String preliquidacion,EnvironmentType environment, String user) throws Exception {
			
			Map<String, String> xx = new HashMap<String, String>();

			xx.put("P_TF_LISTA","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_NU_PRELIQUIDACION","preliquidacion");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("preliquidacion", preliquidacion);
			parametrosIn.put("user", user);
			
			

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS,ConstantsProcedureDB.PUB_PRELIQ_CANCELACIONES), parametrosIn, xx, ConstantsProcedureDB.PUB_PRELIQ_CANCELACIONES, new Date().getTime(), "_");

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
