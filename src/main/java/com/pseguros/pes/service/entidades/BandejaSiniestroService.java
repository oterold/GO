package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
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
import com.pseguros.pes.dto.BandejaTareaSiniestroDTO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;
import java.util.Arrays;
@Service
public class BandejaSiniestroService {

	@Autowired
	private ExecuteService executeService;
	
	private static final Logger logger = LoggerFactory.getLogger(BandejaSiniestroService.class);
	
//carga la bandeja	
	@Async
	public Future<ArrayList> getListaBandeja(EnvironmentType environment, String user) throws Exception {
		
		
		ArrayList<BandejaTareaSiniestroDTO> bandejaSiniestro = new ArrayList<BandejaTareaSiniestroDTO>();
		
		logger.debug("Inicio bandeja siniestro ");
		
		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_BANDEJA_TAREAS", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_WHERE", "nroCliente");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");

		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("P_ORIGEN", "go");
		parametrosIn.put("user", user);


		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_WF, ConstantsProcedureDB.PR_BANDEJA_TAREAS);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PR_BANDEJA_TAREAS, new Date().getTime());

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}

		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

		
		for (Object object : datoSalida) {

			BandejaTareaSiniestroDTO dato = new BandejaTareaSiniestroDTO((HashMap) object);
			bandejaSiniestro.add(dato);
		}
		return new AsyncResult<ArrayList>(bandejaSiniestro);
	}
		
	
	//Datos extra
	public Object getDetalleTarea(String type, String key,EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_BANDEJA_TAREAS","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_ITEMTYPE","type");
		xx.put("P_ITEMKEY","key");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("type", type);
		parametrosIn.put("key", key);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_WF,ConstantsProcedureDB.PR_BANDEJA_TAREAS_REG), parametrosIn, xx, ConstantsProcedureDB.PR_BANDEJA_TAREAS_REG, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	

	//Modal NOTAS
	public Object getDatosNotas(String siniestro,String ramo, String annio, EnvironmentType environment, String user) throws Exception {
		logger.debug("Inicio metetodo modal notas con siniestro : " + siniestro +" ramo : "+  ramo +" annio : "+ annio);
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_LISTA_IMPR", "datosSalida");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_NU_ANNIO", "annio");
		xx.put("P_CD_RAMO", "ramo");
		xx.put("P_NU_SINIESTRO", "siniestro");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("annio", annio);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("siniestro", siniestro);
		parametrosIn.put("user", user);

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS, ConstantsProcedureDB.PUB_NOTAS_SINIESTROS), parametrosIn, xx, ConstantsProcedureDB.PUB_NOTAS_SINIESTROS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	
	public Map getEscalamientos(String type, String key,String act,String noti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, List> datosSalidas = new HashMap<String, List>();
		
		
		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_FE_INICIO","fechaInicio");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NOTIFICATION_ID","noti");
		xx.put("P_PROCESS_ACTIVITY","act");
		xx.put("P_ITEM_TYPE","type");
		xx.put("P_ITEM_KEY","key");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("noti", noti);
		parametrosIn.put("act", act);
		parametrosIn.put("type", type);
		parametrosIn.put("key", key);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_WF,ConstantsProcedureDB.PR_BANDEJA_SINI_ESCALA);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PR_BANDEJA_SINI_ESCALA,new Date().getTime(), "_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		List datosSalida = (ArrayList) salida.get("datosSalida");
		
		List<Object> fechaInicio = Arrays.asList(salida.get("fechaInicio"));

		
		datosSalidas.put("datos", datosSalida);
		datosSalidas.put("salida", fechaInicio);

		return datosSalidas;

	}
	
	

	//Modal REASIGNACIONES
	public Object getReasignaciones(String type, String key,String act, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_PROCESS_ACTIVITY","act");
		xx.put("P_ITEM_TYPE","type");
		xx.put("P_ITEM_KEY","key");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("act", act);
		parametrosIn.put("type", type);
		parametrosIn.put("key", key);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_WF, ConstantsProcedureDB.PR_BANDEJA_SINI_REASIG), parametrosIn, xx, ConstantsProcedureDB.PR_BANDEJA_SINI_REASIG, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	

	//Modal Anticipos
	public Object getAnticipos(String anticipo, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_NU_ANTICIPO","anticipo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("anticipo", anticipo);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_WF, ConstantsProcedureDB.PR_BANDEJA_SINI_ANTI), parametrosIn, xx, ConstantsProcedureDB.PR_BANDEJA_SINI_ANTI, new Date().getTime(), "_");

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
