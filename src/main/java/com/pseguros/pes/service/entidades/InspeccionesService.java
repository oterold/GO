package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;

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
public class InspeccionesService {

	@Autowired
	private ExecuteService executeService;

		
		@Async
		public Future<ArrayList> buscarInspeccionesPorPoliza(String ramo, String poliza, String sucursal, String inspeccion, String user, EnvironmentType entorno) throws Exception {
			Map<String, String> xx = new HashMap<String, String>();
			
			EnvironmentContextHolder.setEnvironmentType(entorno);

		
			xx.put("P_TF_INSPE","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_NU_INSPECCION","inspeccion");
			xx.put("P_NU_POLIZA","poliza");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("user", user);
			parametrosIn.put("inspeccion", inspeccion);
			
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_INSPECCION,ConstantsProcedureDB.PUB_DATOS_INSPECCION);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_DATOS_INSPECCION,new Date().getTime(), "_");
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}
		
	
		
		@Async
		public Future<List> getDatosParametricosInspeccion(String ramo, String nroInspeccion, String producto, String consecutivo, String user, EnvironmentType entorno) throws Exception {
			Map<String, String> xx = new HashMap<String, String>();
			
			EnvironmentContextHolder.setEnvironmentType(entorno);

		
			xx.put("P_TF_DATOS","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_NU_INSPECCION","inspeccion");
			xx.put("P_CD_PRODUCTO","producto");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("inspeccion", nroInspeccion);
			parametrosIn.put("producto", producto);
			parametrosIn.put("user", user);
			
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_INSPECCION,ConstantsProcedureDB.PUB_DATOS_PARAMETRICOS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_DATOS_PARAMETRICOS,new Date().getTime(), "_");
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			List datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<List>(datoSalida);

		}
		
		@Async
		public Future<List> getDatosResultadoInspeccion(String ramo, String nroInspeccion, String producto, String sucursal, String tipo, String user, EnvironmentType entorno) throws Exception {
			Map<String, String> xx = new HashMap<String, String>();
			
			EnvironmentContextHolder.setEnvironmentType(entorno);
		
			
			xx.put("P_TF_RESULTADOS","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_NU_INSPECCION","inspeccion");
			xx.put("P_CD_PRODUCTO","producto");
			xx.put("P_IN_RESULTADO","inResultado");
			xx.put("P_IN_CARTA","inCarta");
			xx.put("P_IN_ACCESORIOS","inAccesorios");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("inspeccion", nroInspeccion);
			parametrosIn.put("producto", producto);
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "GO");
			
			if(tipo.equals("r")){
				parametrosIn.put("inResultado", "s");
			}
			if(tipo.equals("c")){
				parametrosIn.put("inCarta", "s");
			}
			if(tipo.equals("a")){
				parametrosIn.put("inAccesorios", "s");
			}

			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_INSPECCION,ConstantsProcedureDB.PUB_DATOS_RESULTADOS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_DATOS_RESULTADOS,new Date().getTime(), "_");
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			List datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<List>(datoSalida);

		}
		
		
		@Async
		public Future<List> buscarDocumentoPorInspeccion(String inspeccion, String user, EnvironmentType entorno) throws Exception {
			Map<String, String> xx = new HashMap<String, String>();
			
			EnvironmentContextHolder.setEnvironmentType(entorno);

		
			xx.put("P_TF_DOCUMENTO","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_NU_INSPECCION","inspeccion");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("inspeccion", inspeccion);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "GO");

			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_INSPECCION,ConstantsProcedureDB.PUB_DATOS_DOCUMENTOS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_DATOS_DOCUMENTOS,new Date().getTime(), "_");
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			List datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<List>(datoSalida);

		}
		
		@Async
		public Future<List> buscarVisitasPorInspeccion(String inspeccion, String user, EnvironmentType entorno) throws Exception {
			Map<String, String> xx = new HashMap<String, String>();
			
			EnvironmentContextHolder.setEnvironmentType(entorno);

		
			xx.put("P_TF_VISITAS","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_NU_INSPECCION","inspeccion");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("inspeccion", inspeccion);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "GO");

			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_INSPECCION,ConstantsProcedureDB.PUB_DATOS_VISITAS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_DATOS_VISITAS,new Date().getTime(), "_");
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			List datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<List>(datoSalida);

		}
		
}
