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
import com.pseguros.pes.bean.PromocionesEmisionList;
import com.pseguros.pes.dao.valoresPromocionDTO;
import com.pseguros.pes.dto.ProductorPromocionDTO;
import com.pseguros.pes.dto.TarifaPromocionDTO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Service
public class PromocionService {
	
	private static final Logger logger = LoggerFactory.getLogger(PromocionService.class);

	@Autowired
	private ExecuteService executeService;
	

	
	
	

	//PANEL A
	@Async
	public Future<PromocionesEmisionList> getCabeceraPromocion(String promocion,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_VC_MENS","datosSalida");
		xx.put("P_VC_DPRO","dpro");
		xx.put("P_VC_ALTA","feAlta");
		xx.put("P_VC_USER","user");
		xx.put("P_VC_PROM","prom");
		xx.put("P_VC_USUA","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("prom", promocion);
		parametrosIn.put("user", user);
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_PRO,ConstantsProcedureDB.B_PROMOCION_CABECERA);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_PROMOCION_CABECERA,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		String datoSalida = (String) salida.get("datosSalida");
		String dpro = (String) salida.get("dpro");
		String feAlta = (String) salida.get("feAlta");
		String userModifico = (String) salida.get("user");
		
		ArrayList<PromocionesEmisionList> devolver = new ArrayList();
		
		
		
		return new AsyncResult<PromocionesEmisionList>(new PromocionesEmisionList(datoSalida,dpro,feAlta,userModifico));

	}


	
	
	//PANEL B
	@Async
	public Future<ArrayList> getProductoresPromocion(String promocion, String ramo, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		
		ArrayList<ProductorPromocionDTO> promociones = new ArrayList<ProductorPromocionDTO>();

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CARM","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_PROM","promocion");
		xx.put("P_NU_RAMO","ramo");

		xx.put("P_VC_USUA","user");
		 
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("promocion", promocion);
		parametrosIn.put("user", user);
		parametrosIn.put("ramo", ramo);
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_PRO,ConstantsProcedureDB.B_PROMOCION_UTILIZACION);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_PROMOCION_UTILIZACION,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		for (Object object : datoSalida) {

			ProductorPromocionDTO dato = new ProductorPromocionDTO((HashMap) object);

			promociones.add(dato);
		}
		
		return new AsyncResult<ArrayList>(promociones);

	}


	

	
	//PANEL C
	@Async
	public Future<ArrayList> getTarifas(String promocion, String ramo, String tarifa, String tipo,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		ArrayList<TarifaPromocionDTO> tarifas = new ArrayList<TarifaPromocionDTO>();

		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CRTA","datosSalida");
		xx.put("P_VC_MENS","msj");
		xx.put("P_VC_TIPO","tipo");
		xx.put("P_VC_PROM","prom");
		xx.put("P_NU_RAMO","ramo");
		xx.put("P_VC_TARI","tarifa");
		xx.put("P_VC_USUA","user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("prom", promocion);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("tarifa", tarifa);
		parametrosIn.put("user", user);
		parametrosIn.put("tipo", tipo);
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_PRO,ConstantsProcedureDB.B_TARIFAS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_TARIFAS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		if (datoSalida != null) {
			
			for (Object object : datoSalida) {
	
				TarifaPromocionDTO dato = new TarifaPromocionDTO((HashMap) object);
	
				tarifas.add(dato);
			}
		}
		
		return new AsyncResult<ArrayList>(tarifas);

	}

	
	//PANEL C
	@Async
	public Future<ArrayList> getValores(String promocion,EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		ArrayList<valoresPromocionDTO> valores = new ArrayList<valoresPromocionDTO>();

		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CAPV","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_PROM","prom");
		xx.put("P_VC_USUA","user");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("prom", promocion);
		parametrosIn.put("user", user);
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_PRO,ConstantsProcedureDB.B_VALORES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_VALORES,new Date().getTime());
		
		
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			//
			logger.debug(salida.get("mensaje").toString() );
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			return new AsyncResult<ArrayList>(valores);

			
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		for (Object object : datoSalida) {

			valoresPromocionDTO dato = new valoresPromocionDTO((HashMap) object);

			valores.add(dato);
		}
		
		return new AsyncResult<ArrayList>(valores);

	}
	
	
	
	//visualizaciones
	public Object getVisualizaciones(String promocion,EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_VDPR","datoSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_PROM","prom");
		xx.put("P_VC_USUA","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("prom", promocion);
		parametrosIn.put("user", user);
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_PRO,ConstantsProcedureDB.B_VISUALIZACIONES), parametrosIn, xx, ConstantsProcedureDB.B_VISUALIZACIONES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datoSalida");

		return lista;

	}




	public List buscarRamosTarifas(String promocion, EnvironmentType environmentType, String user) throws Exception {
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CTDF","datoSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_TIPO","tipo");
		xx.put("P_VC_PROM","prom");
		xx.put("P_VC_USUA","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("prom", promocion);
		parametrosIn.put("user", user);
		parametrosIn.put("tipo", "PR");
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_PRO,ConstantsProcedureDB.B_RAMO_TARIFA), parametrosIn, xx, ConstantsProcedureDB.B_RAMO_TARIFA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datoSalida");

		return lista;
	}
	
public List buscarTarifaVentana(String registro, EnvironmentType environmentType, String user) throws Exception {
		
		EnvironmentContextHolder.setEnvironmentType(environmentType);

	
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CTDF","datoSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_USUA","user");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_NU_REGI","registro");
		xx.put("P_VC_AUXI","auxi");

		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen", "go");
		parametrosIn.put("user", "go");
		parametrosIn.put("auxi", "go");
		parametrosIn.put("registro", registro);
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_PRO,ConstantsProcedureDB.B_TARIFA_VENTANA), parametrosIn, xx, ConstantsProcedureDB.B_TARIFA_VENTANA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datoSalida");

		return lista;
	}
	
}
