package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
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
public class RemesaService {

	private static final Logger logger = LoggerFactory.getLogger(PolizaService.class);

	@Autowired
	private ExecuteService executeService;

	public Future<List> getRemesaDatosGenerales(String remesa, String user, EnvironmentType environment) throws Exception {

		logger.debug("Inicio getRemesaDatosGenerales -" + " Remesa: " + remesa);

		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_NU_REMESA", "remesa");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		
		parametrosIn.put("remesa", remesa);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_DATOS_REMESA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_DATOS_REMESA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new AsyncResult<List>(new ArrayList());
		}

		List datoSalida = (ArrayList) salida.get("datosSalida");

		return new AsyncResult<List>(datoSalida);
	}
	
	public Future<List> getRemesaDetalle(String remesa, String user, EnvironmentType environment) throws Exception {

		logger.debug("Inicio getRemesaDetalle -" + " Remesa: " + remesa);

		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_NU_REMESA", "remesa");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		
		parametrosIn.put("remesa", remesa);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_DETALLE_REMESA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_DETALLE_REMESA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new AsyncResult<List>(new ArrayList());
		}

		List datoSalida = (List) salida.get("datosSalida");

		return new AsyncResult<List>(datoSalida);
	}
	
	public Future<List> getRemesaCancelaciones(String remesa, String user, EnvironmentType environment) throws Exception {

		logger.debug("Inicio getRemesaDetalle -" + " Remesa: " + remesa);

		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_NU_REMESA", "remesa");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		
		parametrosIn.put("remesa", remesa);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_CANCELACION_REMESA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_CANCELACION_REMESA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new AsyncResult<List>(new ArrayList());
		}

		List datoSalida = (ArrayList) salida.get("datosSalida");

		return new AsyncResult<List>(datoSalida);
	}
	
	
	public List getRemesaDetalleCancelaciones(String remesa, String user, EnvironmentType environment) throws Exception {

		logger.debug("Inicio getRemesaDetalle -" + " Remesa: " + remesa);

		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_NU_REMESA", "remesa");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		
		parametrosIn.put("remesa", remesa);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_CANCELACION_REMESA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_CANCELACION_REMESA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new ArrayList();
		}

		List datoSalida = (ArrayList) salida.get("datosSalida");

		return datoSalida;
	}
	
	
	public List getRemesaDetalleCobro(String remesa, String user, EnvironmentType environment) throws Exception {

		logger.debug("Inicio getRemesaDetalle -" + " Remesa: " + remesa);

		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_NU_REMESA", "remesa");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		
		parametrosIn.put("remesa", remesa);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_DETALLE_REMESA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_DETALLE_REMESA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new ArrayList();
		}

		List datoSalida = (ArrayList) salida.get("datosSalida");

		return datoSalida;
	}
	
	public Future<List> getListaSaldoRemesas(String nroCliente, String nroProductor, EnvironmentType environment, String user ) throws Exception {

		logger.debug("Inicio getListaSaldoRemesas -" + " Nro. Cliente: " + nroCliente + "Nro. Productor: " + nroProductor);

		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA", "datosSalida");
		xx.put("P_TF_LISTA_2", "datosSalida1");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_NU_PRODUCTOR", "productor");
		xx.put("P_NU_CLIENTE", "cliente");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		
		parametrosIn.put("cliente", nroCliente);
		parametrosIn.put("productor", nroProductor);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_REMESAS_CAJA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_REMESAS_CAJA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List datoSalida = null;
		List datoSalida1 = null;
		AsyncResult<List> dato = null;
		
		datoSalida = (List) salida.get("datosSalida");
		dato = (AsyncResult<List>) datoSalida;
				
		return dato;
	}
	
	@Async
	public Future<Map> getListaSaldoRemesasCliente(String nroCliente, String nroProductor, EnvironmentType environment, String user ) throws Exception {

		logger.debug("Inicio getListaSaldoRemesas -" + " Nro. Cliente: " + nroCliente + "Nro. Productor: " + nroProductor);

		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA", "datosSalida");
		xx.put("P_TF_LISTA_2", "datosSalida1");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_NU_PRODUCTOR", "productor");
		xx.put("P_NU_CLIENTE", "cliente");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		
		parametrosIn.put("cliente", nroCliente);
		parametrosIn.put("productor", nroProductor);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_REMESAS_CAJA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_REMESAS_CAJA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List datoSalida = null;
		List datoSalida1 = null;
		Map<String, List> datos= new HashMap<String, List>();
		
		datoSalida = (List) salida.get("datosSalida");
		datoSalida1 = (List) salida.get("datosSalida1");
		
		if((datoSalida==null ||datoSalida.isEmpty())&&(datoSalida1==null || datoSalida1.isEmpty())){
			
			throw new Exception("No se encontro detalle de remesas");
		}
		
		datos.put("remesaSaldo1", datoSalida==null ? new ArrayList(): datoSalida);		
		datos.put("remesaSaldo2", datoSalida1==null ? new ArrayList(): datoSalida1);
				
		
		return new AsyncResult<Map>(datos);
	}
	
	
	public List getRemesaUnificada(String comprobante, String user, EnvironmentType environment) throws Exception {

		logger.debug("Inicio getRemesaUnificada -" + " Comprobante: " + comprobante);

		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_LISTA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_NU_INGRESO_N", "comprobante");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		
		parametrosIn.put("comprobante", comprobante);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_REMESA_UNIFICADA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_REMESA_UNIFICADA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}

		List datoSalida = (ArrayList) salida.get("datosSalida");

		return datoSalida;
	}
	
}
