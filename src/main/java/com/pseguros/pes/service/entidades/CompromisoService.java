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
public class CompromisoService {
	private static final Logger logger = LoggerFactory.getLogger(CompromisoService.class);

	@Autowired
	private ExecuteService executeService;
	
	
	
	//PANEL A
			@Async
			public Future<ArrayList> getcompromisoDatos(String compromiso,EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				
				xx.put("P_TF_COMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_COMPROMISO","compromiso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("compromiso", compromiso);
				
				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMPROMISOS,ConstantsProcedureDB.PUB_COMPR_DATOS);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_COMPR_DATOS,new Date().getTime());
				
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
			public Future<ArrayList> getConceptosDatos(String compromiso,EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				
				xx.put("P_TF_COMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_COMPROMISO","compromiso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("compromiso", compromiso);
				
				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMPROMISOS,ConstantsProcedureDB.PUB_COMPR_CONCEPTO);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_COMPR_CONCEPTO,new Date().getTime());
				
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
			public Future<ArrayList> getBeneficiarioDatos(String compromiso,EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				
				xx.put("P_TF_COMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_COMPROMISO","compromiso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("compromiso", compromiso);
				
				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMPROMISOS,ConstantsProcedureDB.PUB_COMPR_BENEFICIARIO);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_COMPR_BENEFICIARIO,new Date().getTime());
				
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
			public Object getDetalleConcepto(String compromiso, EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_COMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_COMPROMISO","compromiso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("compromiso", compromiso);
				
				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMPROMISOS, ConstantsProcedureDB.PUB_COMPR_CONCEPTO), parametrosIn, xx, ConstantsProcedureDB.PUB_COMPR_CONCEPTO, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}

			
			
			
			//MODAL DETALLE PANEL C
			public Object getDetalleConceptoModal(String compromiso, EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_COMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_COMPROMISO","compromiso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("compromiso", compromiso);
				
				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMPROMISOS,  ConstantsProcedureDB.PUB_COMPR_BENEFICIARIO), parametrosIn, xx, ConstantsProcedureDB.PUB_COMPR_BENEFICIARIO, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			
			
			
			//MODAL FORMA PAGO
			public Object getFormaPagoCompromisoModal(String compromiso, EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_COMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_COMPROMISO","compromiso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("compromiso", compromiso);
				
				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMPROMISOS, ConstantsProcedureDB.PUB_COMPR_FORMA_PAGO), parametrosIn, xx, ConstantsProcedureDB.PUB_COMPR_CONCEPTO, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;
			}
			
			
			
			//MODAL ASOCIACIONES
			public Object getAsociacionesCompromisoModal(String compromiso, EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_COMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_COMPROMISO","compromiso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("compromiso", compromiso);
				
				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMPROMISOS, ConstantsProcedureDB.PUB_COMPR_ASOCIACIONES), parametrosIn, xx, ConstantsProcedureDB.PUB_COMPR_ASOCIACIONES, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			//MODAL ERRORES
			public Object getErroresCompromisoModal(String compromiso, EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_COMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_COMPROMISO","compromiso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("compromiso", compromiso);
				
				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMPROMISOS, ConstantsProcedureDB.PUB_COMPR_ERROR), parametrosIn, xx, ConstantsProcedureDB.PUB_COMPR_ERROR, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}

			
			
			
			//MODAL CRONOGRAMA PAGO
			public Object getCronogramaCompromisoModal(String compromiso, EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);
				
				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_COMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_COMPROMISO","compromiso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("compromiso", compromiso);
				
				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COMPROMISOS, ConstantsProcedureDB.PUB_COMPR_CRONOGRAMA), parametrosIn, xx, ConstantsProcedureDB.PUB_COMPR_CRONOGRAMA, new Date().getTime(), "_");

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
