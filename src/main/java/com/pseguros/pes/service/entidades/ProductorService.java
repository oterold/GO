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
public class ProductorService {
	@Autowired
	private ExecuteService executeService;
	
	private static final Logger logger = LoggerFactory.getLogger(ProductorService.class);
	//PANEL A
	
	@Async
	public Future<List> getProductor(String codProductor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_PROD","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CAPD_CD_PRODUCTOR","codProductor");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("codProductor", codProductor);
		parametrosIn.put("user", user);

		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR,ConstantsProcedureDB.PUB_CABECERA_PRODUCTOR);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_CABECERA_PRODUCTOR,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<List>(datoSalida);

	}
	//PANEL B
	@Async
	public Future<ArrayList> getCarteraProductor(String codProductor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA_VIG","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CAPD_CD_PRODUCTOR","codProductor");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("codProductor", codProductor);
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR,ConstantsProcedureDB.PUB_LISTA_VIGENTES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_VIGENTES,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	// PANEL D

	
	public Object getPolizasProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("Inicio metetodo panel D productor : " + productor);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_LISTA_VIG", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_LISTA_VIGENTES), parametrosIn, xx, ConstantsProcedureDB.PUB_LISTA_VIGENTES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
//panel c sin json 
	

	@Async
	public Future<ArrayList> getPagosRechazados(String productor, EnvironmentType environment, String user) throws Exception {
	
		//TODO:ver que pasa con esto q esta muy lento
		if (true) {
			return new AsyncResult<ArrayList>(new ArrayList());

		}else {
			
		EnvironmentContextHolder.setEnvironmentType(environment);

		logger.debug("Inicio los pagos rechazados ");
		
		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_RECHAZOS", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_CD_RAMO", "ramo");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");

		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_RECHAZOS);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_RECHAZOS, new Date().getTime());

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new AsyncResult<ArrayList>(new ArrayList());
		}

		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

		return new AsyncResult<ArrayList>(datoSalida);
		}
	}

	//panel c actualizado
	
	public Object getPolizasRechazadasJson(String productor, String ramo, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de polizas rechazadas con json productor :" +productor + " ramo : "+ramo);
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_RECHAZOS", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_CARP_CD_RAMO", "ramo");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("user", user);

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_RECHAZOS), parametrosIn, xx, ConstantsProcedureDB.PUB_RECHAZOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");
		
		return lista;

	}
	
	public Object getModalProductor(String productor, EnvironmentType environment, String user) throws Exception {
		logger.debug("Inicio el modal del cliente con el numero de cliente : "+productor);
		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_PROD","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CAPD_CD_PRODUCTOR","codProductor");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("codProductor", productor);
		parametrosIn.put("user", user);

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR,ConstantsProcedureDB.PUB_CABECERA_PRODUCTOR), parametrosIn, xx, ConstantsProcedureDB.PUB_LISTA_VIGENTES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;
	}
	
	
	public List getImpositivosProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de impositivos productor : " +productor );
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_IMPOSITIVO", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_IMPOSITIVOS), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_IMPOSITIVOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista = (ArrayList) salida.get("datosSalida");
		
		return lista;

	}
	
	public List getEsquemaProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de impositivos productor : " +productor );
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_ESQUEMA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_ESQUEMA), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_ESQUEMA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista = (ArrayList) salida.get("datosSalida");
		
		return lista;

	}
	
	public List getConvenioProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de impositivos productor : " +productor );
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CONVENIO", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_CONVENIO), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_CONVENIO, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista = (ArrayList) salida.get("datosSalida");
		
		return lista;

	}

	public List getIntervinientesProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de impositivos productor : " +productor );
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_INTERVINIENTES", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_INTERVINIENTES), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_INTERVINIENTES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista = (ArrayList) salida.get("datosSalida");
		
		return lista;

	}
	
	public List getFormaDePagoProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de forma de pago productor : " +productor );
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_FORMA_PAGO", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_FORMA_PAGO), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_FORMA_PAGO, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista = (ArrayList) salida.get("datosSalida");
		
		return lista;

	}
	
	public List getOSSEGProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de forma de pago productor : " +productor );
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_OSSEG", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_OSSEG), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_OSSEG, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista = (ArrayList) salida.get("datosSalida");
		
		return lista;

	}
	
	public List getSSNProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de forma de pago productor : " +productor );
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_SSN", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_SSN), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_SSN, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista = (ArrayList) salida.get("datosSalida");
		
		return lista;

	}
	
	public List getInhabilitacionesSSNProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de forma de pago productor : " +productor );
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_PROD_INVALIDOS", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_PROD_INVALIDOS), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_PROD_INVALIDOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista = (ArrayList) salida.get("datosSalida");
		
		return lista;

	}
	
	public List getHistoriaProductor(String productor, String tipoBusqueda, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de historia productor : " +productor );
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_HISTORIA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_TIPO_BUSQUEDA", "tipoBusqueda");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("tipoBusqueda", tipoBusqueda);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_HISTORIA), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_HISTORIA, new Date().getTime(), "_");
		
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista = (ArrayList) salida.get("datosSalida");
		
		return lista;
	}
	
	public Map<String, List> getChequesRechazadosProductor(String productor, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("inicio el metodo de historia productor : " +productor );
		
		Map<String, List> map = new HashMap<String, List>();
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CHEQUES_RECH", "datosSalida");
		xx.put("P_TF_TOTALES_CHEQUES", "datosSalida1");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "GO");

		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_CHEQUES_RECH), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_CHEQUES_RECH, new Date().getTime(), "_");
		
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		List lista1 = (ArrayList) salida.get("datosSalida");
		List lista2 = (ArrayList) salida.get("datosSalida1");

		map.put("chequesRechazados", lista1);
		map.put("totalCheques", lista2);
		
		return map;
	}
	
	//Modal Motivo Baja Productor
	
	public List getMotivoBaja(String productor, EnvironmentType environment, String user) throws Exception {
	
		
			
		EnvironmentContextHolder.setEnvironmentType(environment);

		logger.debug("Inicio los pagos rechazados ");
		
		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_MOTIVO_BAJA", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CAPD_CD_PRODUCTOR", "productor");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");

		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("productor", productor);
		parametrosIn.put("user", user);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_PRODUCTOR, ConstantsProcedureDB.PUB_DATOS_MOTIVO_BAJA);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, "PUB_DATOS_MOTIVO_BAJA", new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}

		List datoSalida = (ArrayList) salida.get("datosSalida");

		return datoSalida;
	}
	
	


	
	//fuera de pauta
	public Object datosContactoProductor(String productor,String consecutivo, EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_DETALLE", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_CABU_NU_PERSONA", "nuPersona");
		xx.put("P_CADO_CONSECUTIVO_DIRECCION", "direccion");
		xx.put("P_CACF_NU_CONSECUTIVO", "consecutivo");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("nuPersona", productor);
		parametrosIn.put("consecutivo", consecutivo);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_DIRECCIONES,ConstantsProcedureDB.PUB_DETALLE_DIRECCIONES), parametrosIn, xx, ConstantsProcedureDB.PUB_DETALLE_DIRECCIONES, new Date().getTime(), "_");

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
