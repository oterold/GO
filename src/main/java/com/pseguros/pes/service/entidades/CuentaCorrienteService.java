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
import com.pseguros.pes.dao.CuentaCorrienteDAO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;




@Service
public class CuentaCorrienteService {

	@Autowired
	private CuentaCorrienteDAO cuentaCorrienteDAO;

	private static final Logger logger = LoggerFactory.getLogger(CuentaCorrienteService.class);

	@Autowired
	private ExecuteService executeService;
	
	
	//PANEL A
	@Async
	public Future<ArrayList> getdatosProd(String productor,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_PRODUCTOR","productor");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMISIONES,ConstantsProcedureDB.DATOS_CTA_CTE_COMISIONES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.DATOS_CTA_CTE_COMISIONES,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}

	
	
	

	//PANEL B CON JSON
	public Object  getResumenMov(String productor,String moneda, String periodo,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_PRODUCTOR","productor");
		xx.put("P_MONEDA","moneda");
		xx.put("P_PERIODO","periodo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("moneda", moneda);
		parametrosIn.put("periodo", periodo);
		parametrosIn.put("user", user);
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMISIONES, ConstantsProcedureDB.RESUMEN_MOV_CTA_CTE), parametrosIn, xx, ConstantsProcedureDB.RESUMEN_MOV_CTA_CTE, new Date().getTime(), "_");

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
	public Object  getDetalleMov(String productor,String moneda, String periodo,String movimiento,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_PRODUCTOR","productor");
		xx.put("P_MONEDA","moneda");
		xx.put("P_PERIODO","periodo");
		xx.put("P_TIPO_MOVIMIENTO","movimiento");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("moneda", moneda);
		parametrosIn.put("periodo", periodo);
		parametrosIn.put("movimiento", movimiento);
		parametrosIn.put("user", user);
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMISIONES, ConstantsProcedureDB.MOVIMIENTOS_CTA_CTE), parametrosIn, xx, ConstantsProcedureDB.MOVIMIENTOS_CTA_CTE, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			return new AsyncResult<ArrayList>(new ArrayList());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	//excel
	
	
	//PANEL B
	@Async
	public Future<ArrayList> getDatosProdExcel(String productor,String moneda, String periodo,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_PRODUCTOR","productor");
		xx.put("P_MONEDA","moneda");
		xx.put("P_PERIODO","periodo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("moneda", moneda);
		parametrosIn.put("periodo", periodo);
		parametrosIn.put("user", user);
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMISIONES,ConstantsProcedureDB.RESUMEN_MOV_CTA_CTE);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.RESUMEN_MOV_CTA_CTE,new Date().getTime());
		
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
		public Future<ArrayList> getDatosProdExcelDetalle(String productor,String moneda, String periodo,String movimiento,EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_LISTA","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_PRODUCTOR","productor");
			xx.put("P_MONEDA","moneda");
			xx.put("P_PERIODO","periodo");
			xx.put("P_TIPO_MOVIMIENTO","movimiento");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("productor", productor);
			parametrosIn.put("moneda", moneda);
			parametrosIn.put("periodo", periodo);
			parametrosIn.put("movimiento", movimiento);
			parametrosIn.put("user", user);
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMISIONES,ConstantsProcedureDB.MOVIMIENTOS_CTA_CTE);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.MOVIMIENTOS_CTA_CTE,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}
	
	}