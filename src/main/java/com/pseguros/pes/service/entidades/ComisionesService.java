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
public class ComisionesService {
private static final Logger logger = LoggerFactory.getLogger(ComisionesService.class);
	
	@Autowired
	private ExecuteService executeService;
	
	//panel A
			@Async
			public Future<ArrayList>  getPolizaComisiones(String ramo, String poliza,String sucursal, EnvironmentType environment,String user) throws Exception {
				
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
			
			
			//panel B
			@Async
			public Future<ArrayList>  getPolizaComisionesPeriodo(String ramo, String poliza,String certificado,String sucursal, EnvironmentType environment,String user) throws Exception {
				
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();
				
				
				xx.put("P_TF_LISTA","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_NU_POLIZA","poliza");
				xx.put("P_NU_CERTIFICADO","certificado");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("certificado", certificado);
				parametrosIn.put("user", user);
				parametrosIn.put("sucursal", sucursal);

				
				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMISIONES,ConstantsProcedureDB.COMI_TOT_POLIZA);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,"COMI_TOT_POLIZA",new Date().getTime());
				
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
			public Object getComiDevengadas(String poliza,String ramo ,String certificado, String periodo,String sucursal, EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo panel D comi");

				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_LISTA", "datosSalida");
				xx.put("P_VC_MENS", "mensaje");
				xx.put("P_VC_ERRO", "error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO", "ramo");
				xx.put("P_NU_POLIZA", "poliza");
				xx.put("P_NU_CERTIFICADO", "certificado");
				xx.put("P_NU_PERIODO_CONT", "periodo");
				xx.put("P_ORIGEN", "origen");
				xx.put("P_USUARIO", "user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("certificado", certificado);
				parametrosIn.put("periodo", periodo);
				parametrosIn.put("user", user);
				parametrosIn.put("sucursal", sucursal);


				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMISIONES, ConstantsProcedureDB.COMI_DEV_PERI_POLIZA), parametrosIn, xx, ConstantsProcedureDB.COMI_DEV_PERI_POLIZA, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			//PANEL C CON JSON
			public Object getComiLib(String poliza,String ramo ,String certificado, String periodo,String sucursal, EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo panel D comi");

				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_LISTA", "datosSalida");
				xx.put("P_VC_MENS", "mensaje");
				xx.put("P_VC_ERRO", "error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO", "ramo");
				xx.put("P_NU_POLIZA", "poliza");
				xx.put("P_NU_CERTIFICADO", "certificado");
				xx.put("P_NU_PERIODO_CONT", "periodo");
				xx.put("P_ORIGEN", "origen");
				xx.put("P_USUARIO", "user");
				
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("certificado", certificado);
				parametrosIn.put("periodo", periodo);
				parametrosIn.put("user", user);
				parametrosIn.put("sucursal", sucursal);

				
				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMISIONES, ConstantsProcedureDB.COMI_LIB_PERI_POLIZA), parametrosIn, xx, ConstantsProcedureDB.COMI_LIB_PERI_POLIZA, new Date().getTime(), "_");

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