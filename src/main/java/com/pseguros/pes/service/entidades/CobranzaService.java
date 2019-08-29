package com.pseguros.pes.service.entidades;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Future;

import org.apache.commons.jexl2.internal.AbstractExecutor.Set;
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
public class CobranzaService {
	
	
	private static final Logger logger = LoggerFactory.getLogger(CobranzaService.class);
	
	@Autowired
	private ExecuteService executeService;
	
	//panel A
		@Async
		public Future<ArrayList>  getPolizaCobranza(String ramo, String poliza,String sucursal, EnvironmentType environment, String user) throws Exception {
			
			EnvironmentContextHolder.setEnvironmentType(environment);
			
			Map<String, String> xx = new HashMap<String, String>();
			
			
			xx.put("P_TF_POLI","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","poliza");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("user", user);
			parametrosIn.put("sucursal", sucursal);
			
			
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_POLIZA,ConstantsProcedureDB.PUB_POLIZA);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_POLIZA,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}

		
		//panel C
		@Async
		public Future<ArrayList>  getImputaciones(String ramo, String poliza,String certificado,String sucursal, EnvironmentType environmentType, String user) throws Exception {
			
			EnvironmentContextHolder.setEnvironmentType(environmentType);
			logger.debug("Inicio el modal del panel D impitaciones con  : " + poliza+" ramo :"+ramo);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_IMPUTACION","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","poliza");
			xx.put("P_NU_CERTIFICADO","certificado");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("user", user);
			parametrosIn.put("certificado", certificado);
			parametrosIn.put("sucursal", sucursal);
			
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS,ConstantsProcedureDB.PUB_IMPUTACIONES);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,"PUB_IMPUTACIONES",new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				return new AsyncResult<ArrayList>(new ArrayList());
			}
			
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}
		
		//panel B
		
		@Async
		public Future<ArrayList>  getCoutasConsolidadas(String ramo, String poliza, String certificado,String sucursal,EnvironmentType environmentType, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environmentType);
			logger.debug("Inicio metetodo panel B de cobranzas con poliza : " + poliza+"ramo :"+ramo);
			Map<String, String> xx = new HashMap<String, String>();
			
			xx.put("P_TF_CUOTA_CONSOLIDADA","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","poliza");
			xx.put("P_NU_CERTIFICADO","certificado");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("user", user);
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("certificado", certificado);
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS,ConstantsProcedureDB.PUB_CUOTAS_CONSOLIDADAS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_CUOTAS_CONSOLIDADAS,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				return new AsyncResult<ArrayList>(new ArrayList());
			}
			
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}
		
		
		// PANEL D

		
		public Object getDetalleCuotas(String poliza,String ramo, String fechaFiltro,String certificado,String sucursal, EnvironmentType environmentType, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environmentType);
			logger.debug("Inicio metetodo panel D cobranza con  : " + poliza+" ramo :"+ramo +" y la fecha :");

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_CUOTA", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_CD_SUCURSAL", "sucursal");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_CAPO_NU_POLIZA", "poliza");
			xx.put("P_NU_CERTIFICADO", "certificado");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			xx.put("P_FE_HASTA", "fechaFiltro");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("fechaFiltro", fechaFiltro);
			parametrosIn.put("user", user);
			parametrosIn.put("certificado", certificado);
			parametrosIn.put("sucursal", sucursal);
			


			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_DETALLE_CUOTAS), parametrosIn, xx, "PUB_LISTA_VIGENTES", new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}

		//MODAL DE IMPUTACIONES

		public Object getImputacionesCobranza(String poliza,String ramo,String certificado,String sucursal, EnvironmentType environmentType, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environmentType);
			logger.debug("Inicio el modal del panel D impitaciones con  : " + poliza+" ramo :"+ramo);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_IMPUTACION","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","poliza");
			xx.put("P_NU_CERTIFICADO","certificado");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("user", user);
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("certificado", certificado);

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS,ConstantsProcedureDB.PUB_IMPUTACIONES), parametrosIn, xx, ConstantsProcedureDB.PUB_IMPUTACIONES, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}


		
		
		
		
		
		
		
		
		//MODAL DE PRODUCTOR

				public Object getModalProductorCobranza(String cliente) throws Exception {
					logger.debug("Inicio el modal del cliente con el numero de cliente : "+cliente);

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_CLIE","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_CACN_NU_CEDULA_RIF","cliente");
					xx.put("P_ORIGEN","origen");
					xx.put("P_USUARIO","user");
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("cliente",cliente);

					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CLIENTE,ConstantsProcedureDB.PUB_CLIENTE), parametrosIn, xx, ConstantsProcedureDB.PUB_CLIENTE, new Date().getTime(), "_");

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