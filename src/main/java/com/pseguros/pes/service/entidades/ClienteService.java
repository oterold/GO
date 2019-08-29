package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
public class ClienteService {

	
	private static final Logger logger = LoggerFactory.getLogger(ClienteService.class);

	
	@Autowired
	private ExecuteService executeService;
	
	@Async
	public Future<List> getCliente(String nroCliente, EnvironmentType environment, String user) throws Exception {
		
		logger.debug("Inicio getCliente ");
		
		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_CLIE", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CACN_NU_CEDULA_RIF", "nroCliente");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");

		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("nroCliente", nroCliente);
		parametrosIn.put("user", user);


		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CLIENTE, ConstantsProcedureDB.PUB_CLIENTE);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_CLIENTE, new Date().getTime());

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}

		List datoSalida = (ArrayList) salida.get("datosSalida");

		return new AsyncResult<List>(datoSalida);
	}
	
	@Async
	public Future<ArrayList> getPolizasCliente(String nroCliente, EnvironmentType environment, String user) throws Exception {
		
		logger.debug("Inicio getPolizasCliente ");
		
		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA_POL", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CACN_NU_CEDULA_RIF", "nroCliente");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");

		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("nroCliente", nroCliente);
		parametrosIn.put("user", user );

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CLIENTE, ConstantsProcedureDB.PUB_LISTA_POLIZAS);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_CLIENTE, new Date().getTime());

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new AsyncResult<ArrayList>(new ArrayList());
		}

		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

		Collections.sort(datoSalida, new Comparator() {
			@Override
			public int compare(Object o1, Object o2) {
				 return new Integer(((HashMap) o1).get("P_TF_LISTA_POL.CACE_CAPO_NU_POLIZA").toString()).compareTo(new Integer(((HashMap) o2).get("P_TF_LISTA_POL.CACE_CAPO_NU_POLIZA").toString())) ;
			}
		});
		
		
		return new AsyncResult<ArrayList>(datoSalida);
	}

	
	
	@Async
	public Future<ArrayList> getSiniestroCliente(String cliente, EnvironmentType environment, String user) throws Exception {
		
		logger.debug("Inicio getSiniestroCliente ");

		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_SINI", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CACN_NU_CEDULA_RIF", "cliente");
		xx.put("P_CD_RAMO", "ramo");
		xx.put("P_CAPO_NU_POLIZA", "nuPoliza");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");

		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cliente", cliente);
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CLIENTE, ConstantsProcedureDB.PUB_SINIESTROS);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_CLIENTE, new Date().getTime());

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new AsyncResult<ArrayList>(new ArrayList());
		}

		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

		return new AsyncResult<ArrayList>(datoSalida);
	}

	
	
	public Object getPolizaCliente(String ramo, String poliza,String sucursal,EnvironmentType environment, String user) throws Exception {

		logger.debug("Inicio getPolizaCliente :" + ramo + " poliza : " + poliza);

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_POLI", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CD_SUCURSAL", "sucursal");
		xx.put("P_CD_RAMO", "ramo");
		xx.put("P_CAPO_NU_POLIZA", "nuPoliza");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("nuPoliza", poliza);
		parametrosIn.put("sucursal", sucursal);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_POLIZA, ConstantsProcedureDB.PUB_POLIZA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_POLIZA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new ArrayList();
		}

		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

		return datoSalida.get(0);
	}
	
	
	public Object getSiniestrosCliente(String ramo, String poliza, String cliente,String sucursal) throws Exception {

		logger.debug("Inicio get endoso ramo :" + ramo + " cliente : " + cliente + " poliza : " + poliza);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_SINI", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CACN_NU_CEDULA_RIF", "cliente");
		xx.put("P_CD_SUCURSAL", "sucursal");
		xx.put("P_CD_RAMO", "ramo");
		xx.put("P_CAPO_NU_POLIZA", "nuPoliza");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cliente", cliente);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("sucursal", sucursal);
		parametrosIn.put("nuPoliza", poliza);

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CLIENTE, ConstantsProcedureDB.PUB_SINIESTROS), parametrosIn, xx, ConstantsProcedureDB.PUB_CLIENTE, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");
		
		
		
		

		return lista;

	}

	public Object getModalCliente(String cliente, EnvironmentType environment, String user) throws Exception {
		logger.debug("Inicio el modal del cliente con el numero de cliente : "+cliente);

		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CLIE","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CACN_NU_CEDULA_RIF","cliente");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cliente",cliente);
		parametrosIn.put("user",user);

		
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
