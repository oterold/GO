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
public class ImpresionService {
	
	private static final Logger logger = LoggerFactory.getLogger(ImpresionService.class);

	@Autowired
	private ExecuteService executeService;
	
	
	//PANEL A
			@Async
			public Future<ArrayList> getPoliza(String ramo, String poliza, String sucursal, EnvironmentType environment, String user) throws Exception {

				Map<String, String> xx = new HashMap<String, String>();
				
				EnvironmentContextHolder.setEnvironmentType(environment);

			
				xx.put("P_TF_POLI","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","nuPoliza");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("nuPoliza", poliza);
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
			
			
		
			//PANEL B
			@Async
			public Future<ArrayList> getProcesoImp(String sucursal,String ramo, String poliza, EnvironmentType environment, String user) throws Exception {

				Map<String, String> xx = new HashMap<String, String>();
				
				EnvironmentContextHolder.setEnvironmentType(environment);

			
				xx.put("P_TF_LISTA_IMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","nuPoliza");
				xx.put("P_NU_ENDOSO","endoso");
				xx.put("P_NU_CERTIFICADO","certificado");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("nuPoliza", poliza);
				parametrosIn.put("sucursal", sucursal);
				parametrosIn.put("user", user);
				
				
				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_IMPRESIONES,ConstantsProcedureDB.PUB_LISTA_IMPRESIONES);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_IMPRESIONES,new Date().getTime());
				
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
			public Object getProcesoImpConJson(String sucursal,String ramo, String poliza, EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();

				
				xx.put("P_TF_LISTA_IMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","nuPoliza");
				xx.put("P_NU_ENDOSO","endoso");
				xx.put("P_NU_CERTIFICADO","certificado");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("nuPoliza", poliza);
				parametrosIn.put("sucursal", sucursal);
				parametrosIn.put("user", user);

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_IMPRESIONES, ConstantsProcedureDB.PUB_LISTA_IMPRESIONES), parametrosIn, xx, ConstantsProcedureDB.PUB_LISTA_IMPRESIONES, new Date().getTime(), "_");

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
			public Object getMovimientosConJson(String proceso, String indice, EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();

				
				xx.put("P_TF_MOVIMIENTOS","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_PROCESO","proceso");
				xx.put("P_NU_INDEX","indice");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("proceso", proceso);
				parametrosIn.put("indice", indice);
				parametrosIn.put("user", user);

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_IMPRESIONES, ConstantsProcedureDB.PUB_MOVIMIENTOS), parametrosIn, xx, ConstantsProcedureDB.PUB_MOVIMIENTOS, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			
			//PANEL NO IMPRESION MODAL
			public Object getNoImpresion(String poliza, String ramo,String sucursal, EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();

				
				xx.put("P_TF_NO_IMPRESION","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","poliza");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("sucursal", sucursal);

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_IMPRESIONES, ConstantsProcedureDB.PUB_NO_IMPRESION), parametrosIn, xx, ConstantsProcedureDB.PUB_NO_IMPRESION, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}


}