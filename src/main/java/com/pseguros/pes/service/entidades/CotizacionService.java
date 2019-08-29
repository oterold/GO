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
import com.pseguros.pes.dao.CotizacionDAO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Service
public class CotizacionService {
	
	@Autowired
	private CotizacionDAO cotizacionDAO;
	
	private static final Logger logger = LoggerFactory.getLogger(CotizacionService.class);

	@Autowired
	private ExecuteService executeService;
	
	@Async
	public Future<ArrayList> getListaCertificadosCotizacion(String cotizacion, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA_CERT","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		
		xx.put("P_CAZB_NU_COTIZACION","cotizacion");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cotizacion", cotizacion);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_LISTA_CERTIFICADOS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_CERTIFICADOS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	

	
	
	
	
	
	
	
	//certificadosJson

	public Object getDatosCertificadosJson(String cotizacion, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_LISTA_CERT","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		
		xx.put("P_CAZB_NU_COTIZACION","cotizacion");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cotizacion", cotizacion);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION, ConstantsProcedureDB.PUB_LISTA_CERTIFICADOS), parametrosIn, xx, ConstantsProcedureDB.PUB_LISTA_CERTIFICADOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}

	
	//panel a
	@Async
	public Future<ArrayList> getCertificadoCotizacion(String cotizacion, String nroConsecutivo, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_COTI","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		
		xx.put("P_CAZB_NU_COTIZACION","cotizacion");
		xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cotizacion", cotizacion);
		parametrosIn.put("consecutivo", nroConsecutivo);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_COTIZACION);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_COTIZACION,new Date().getTime(), "_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	
	
	//componetnes future
	@Async
	public Future<ArrayList> getComponentes(String cotizacion,String nroConsecutivo, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_COMPONENTES","datosComponentes");
		xx.put("P_TF_TOTALES","datosTotales");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		
		xx.put("P_CAZB_NU_COTIZACION","cotizacion");
		xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cotizacion", cotizacion);
		parametrosIn.put("consecutivo", nroConsecutivo);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_COMPONENTES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_COMPONENTES,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosComponentes");
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	
	
	
	public Map getCotizacionComponentes(String cotizacion, String nroConsecutivo, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, List> datosSalidas = new HashMap<String, List>();
		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_COMPONENTES","datosComponentes");
		xx.put("P_TF_TOTALES","datosTotales");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		
		xx.put("P_CAZB_NU_COTIZACION","cotizacion");
		xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cotizacion", cotizacion);
		parametrosIn.put("consecutivo", nroConsecutivo);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_COMPONENTES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_COMPONENTES,new Date().getTime(), "_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		List datoComponentes = (ArrayList) salida.get("datosComponentes");
		List datoTotales = (ArrayList) salida.get("datosTotales");
		
		datosSalidas.put("componentes", datoComponentes);
		datosSalidas.put("totales", datoTotales);
		
		return datosSalidas;

	}
	
	public Map getCotizacionPlanes(String cotizacion, String nroConsecutivo, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, List> datosSalidas = new HashMap<String, List>();

		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_PLANES","datosPlanes");
		xx.put("P_TF_PLANES_DESC","datoPlanesDescripciones");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		
		xx.put("P_CAZB_NU_COTIZACION","cotizacion");
		xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cotizacion", cotizacion);
		parametrosIn.put("consecutivo", nroConsecutivo);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_PLANES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_PLANES,new Date().getTime(), "_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		List datoPlanes = (ArrayList) salida.get("datosPlanes");
		List datoPlanesDescripciones = (ArrayList) salida.get("datoPlanesDescripciones");

		datosSalidas.put("planes", datoPlanes);
		datosSalidas.put("planesDescripciones", datoPlanesDescripciones);

		return datosSalidas;

	}
	
	
	
	//Modal texto
	public Object getTextoModal(String cotizacion, String nroConsecutivo, EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_TEXTOS","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CAZB_NU_COTIZACION","cotizacion");
		xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cotizacion", cotizacion);
		parametrosIn.put("consecutivo", nroConsecutivo);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_TEXTOS), parametrosIn, xx, ConstantsProcedureDB.PUB_TEXTOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	//Modal accesorios
	public Object getAccesoriosModal(String cotizacion, String nroConsecutivo, EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_ACCESORIOS","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CAZB_NU_COTIZACION","cotizacion");
		xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cotizacion", cotizacion);
		parametrosIn.put("consecutivo", nroConsecutivo);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_ACCESORIOS), parametrosIn, xx, ConstantsProcedureDB.PUB_ACCESORIOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	//Select bien
	public Object getBienModal(String cotizacion, String nroConsecutivo,String ramo, EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_BIENES","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAZB_NU_COTIZACION","cotizacion");
		xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cotizacion", cotizacion);
		parametrosIn.put("consecutivo", nroConsecutivo);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("user", user);
		parametrosIn.put("origen", "go");
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_BIENES), parametrosIn, xx, ConstantsProcedureDB.PUB_BIENES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	
	//Datos Parametricos
		public Object getDatosParametricosCotizacionesHome(String cotizacion, String nroConsecutivo,String bien, EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_PARAM","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CAZB_NU_COTIZACION","cotizacion");
			xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
			xx.put("P_CD_BIEN_ASEG","bien");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("cotizacion", cotizacion);
			parametrosIn.put("consecutivo", nroConsecutivo);
			parametrosIn.put("bien", bien);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_PARAMETRICOS), parametrosIn, xx, ConstantsProcedureDB.PUB_PARAMETRICOS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		
		//Datos Parametricos
		public Object getDatosDireccionesCotizacionesHome(String cotizacion, String nroConsecutivo,String bien,String ramo, EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_DIRECCIONES","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAZB_NU_COTIZACION","cotizacion");
			xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
			xx.put("P_CD_BIEN_ASEG","bien");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("cotizacion", cotizacion);
			parametrosIn.put("consecutivo", nroConsecutivo);
			parametrosIn.put("bien", bien);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_DIRECCIONES), parametrosIn, xx, ConstantsProcedureDB.PUB_DIRECCIONES, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		
		//Datos objetos
		public Object getDatosObjetosCotizacionesHome(String cotizacion, String nroConsecutivo,String bien,EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_OBJETOS","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CAZB_NU_COTIZACION","cotizacion");
			xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
			xx.put("P_CD_BIEN_ASEG","bien");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("cotizacion", cotizacion);
			parametrosIn.put("consecutivo", nroConsecutivo);
			parametrosIn.put("bien", bien);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_OBJETOS), parametrosIn, xx, ConstantsProcedureDB.PUB_OBJETOS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		
		
		//Datos coberturas
		public Object getDatosCoberturasCotizacionesHome(String cotizacion, String nroConsecutivo,String bien,EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_COBERTURAS","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CAZB_NU_COTIZACION","cotizacion");
			xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
			xx.put("P_CD_BIEN_ASEG","bien");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("cotizacion", cotizacion);
			parametrosIn.put("consecutivo", nroConsecutivo);
			parametrosIn.put("bien", bien);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_COBERTURAS), parametrosIn, xx, ConstantsProcedureDB.PUB_COBERTURAS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
	
		
		
		//Datos Beneficiario
		public Object getDatosBeneficiarioCotizacionesHome(String cotizacion, String nroConsecutivo,String bien,EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_BENEFICIARIOS","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CAZB_NU_COTIZACION","cotizacion");
			xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
			xx.put("P_CD_BIEN_ASEG","bien");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("cotizacion", cotizacion);
			parametrosIn.put("consecutivo", nroConsecutivo);
			parametrosIn.put("bien", bien);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_BENEFICIARIOS), parametrosIn, xx, ConstantsProcedureDB.PUB_BENEFICIARIOS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
	
		
		//Datos titulares
		public Object getDatosTitularesCotizacionesHome(String cotizacion, String nroConsecutivo,EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_TITULARES","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CAZB_NU_COTIZACION","cotizacion");
			xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("cotizacion", cotizacion);
			parametrosIn.put("consecutivo", nroConsecutivo);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_TITULARES), parametrosIn, xx, ConstantsProcedureDB.PUB_TITULARES, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		//Datos reaseguro
				public Object getDatosReaseguroCotizacionesHome(String cotizacion, String nroConsecutivo,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_REASEGURO","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_CAZB_NU_COTIZACION","cotizacion");
					xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
					xx.put("P_ORIGEN","origen");
					xx.put("P_USUARIO","user");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("cotizacion", cotizacion);
					parametrosIn.put("consecutivo", nroConsecutivo);
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "go");
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_REASEGURO), parametrosIn, xx, ConstantsProcedureDB.PUB_REASEGURO, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
				
				
				
				//Datos reaseguro
				public Object getDetalleReaseguroCotizacionesHome(String cotizacion, String nroConsecutivo,String moneda,String fecha,String programa,String grupo,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_COBER_REAS","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_CAZB_NU_COTIZACION","cotizacion");
					xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
					xx.put("P_CD_MONEDA","moneda");
					xx.put("P_FE_DESDE","fecha");
					xx.put("P_CD_PROGRAMA","programa");
					xx.put("P_CD_GRUPO","grupo");
					xx.put("P_ORIGEN","origen");
					xx.put("P_USUARIO","user");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("cotizacion", cotizacion);
					parametrosIn.put("consecutivo", nroConsecutivo);
					parametrosIn.put("moneda", moneda);
					parametrosIn.put("fecha", fecha);
					parametrosIn.put("programa", programa);
					parametrosIn.put("grupo", grupo);
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "go");
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_COBER_REAS), parametrosIn, xx, ConstantsProcedureDB.PUB_COBER_REAS, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
	
				
				
				//Datos lineas
				public Object getLineasCotizacionesHome(String cotizacion, String nroConsecutivo,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_LINEAS","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_CAZB_NU_COTIZACION","cotizacion");
					xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
					xx.put("P_ORIGEN","origen");
					xx.put("P_USUARIO","user");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("cotizacion", cotizacion);
					parametrosIn.put("consecutivo", nroConsecutivo);
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "go");
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_LINEAS), parametrosIn, xx, ConstantsProcedureDB.PUB_LINEAS, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
				
				
				//Datos clausulas
				public Object getClausulasCotizacionesHome(String cotizacion, String nroConsecutivo,String linea,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_CLAUSULAS","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_CAZB_NU_COTIZACION","cotizacion");
					xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
					xx.put("P_CD_LINEA","linea");
					xx.put("P_ORIGEN","origen");
					xx.put("P_USUARIO","user");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("cotizacion", cotizacion);
					parametrosIn.put("consecutivo", nroConsecutivo);
					parametrosIn.put("linea", linea);
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "go");
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_CLAUSULAS), parametrosIn, xx, ConstantsProcedureDB.PUB_CLAUSULAS, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
				
				
				//Datos text clausulas
				public Object getTextoClausulasCotizacionesHome(String cotizacion, String nroConsecutivo,String codClausula,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_TEXTO_CLAU","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_CAZB_NU_COTIZACION","cotizacion");
					xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
					xx.put("P_CD_CLAUSULA","codClausula");
					xx.put("P_ORIGEN","origen");
					xx.put("P_USUARIO","user");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("cotizacion", cotizacion);
					parametrosIn.put("consecutivo", nroConsecutivo);
					parametrosIn.put("codClausula", codClausula);
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "go");
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_TEXTO_CLAUSULA), parametrosIn, xx, "PUB_TEXTO_CLAUSULA", new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
	
				
				
				//fuera de pauta
				public Object getFueraDePautaCotizacionesHome(String cotizacion, String nroConsecutivo,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_FUERA_PAUTA","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_CAZB_NU_COTIZACION","cotizacion");
					xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
					xx.put("P_ORIGEN","origen");
					xx.put("P_USUARIO","user");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("cotizacion", cotizacion);
					parametrosIn.put("consecutivo", nroConsecutivo);
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "go");
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_FUERA_PAUTA), parametrosIn, xx, ConstantsProcedureDB.PUB_FUERA_PAUTA, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
				
				
				
				
				public List getPlanPromoParaComparacion(String cotizacion, String nroConsecutivo,EnvironmentType environment, String user) throws Exception {

					EnvironmentContextHolder.setEnvironmentType(environment);
					
					Map<String, List> datosSalidas = new HashMap<String, List>();

					
					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_PLANES","datosPlanes");
					xx.put("P_TF_PLANES_DESC","datoPlanesDescripciones");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					
					xx.put("P_CAZB_NU_COTIZACION","cotizacion");
					xx.put("P_CAZB_NU_CONSECUTIVO","consecutivo");
					xx.put("P_ORIGEN","origen");
					xx.put("P_USUARIO","user");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("cotizacion", cotizacion);
					parametrosIn.put("consecutivo", nroConsecutivo);
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "go");
					
					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_PLANES);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_PLANES,new Date().getTime(), "_");
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					List datoPlanes = (ArrayList) salida.get("datosPlanes");


					return datoPlanes;
				}
				
				
				
				
				
				public List getCoberturasParaComparacion(String cotizacion, String nroConsecutivo,String plan,String promo,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_CACK","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","cert");
					xx.put("P_VC_PLAN","plan");
					xx.put("P_VC_PROM","promo");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","user");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("coti", cotizacion);
					parametrosIn.put("cert", nroConsecutivo);
					parametrosIn.put("plan", plan);
					parametrosIn.put("promo", promo);
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "go");
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.L_COBERTURAS_DETALLE), parametrosIn, xx, ConstantsProcedureDB.L_COBERTURAS_DETALLE, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
				
				
				
				public List getParametricosParaComparacion(String cotizacion, String certificado,String bien ,EnvironmentType environment,String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_PARAM","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_CAZB_NU_COTIZACION","coti");
					xx.put("P_CAZB_NU_CONSECUTIVO","cert");
					xx.put("P_CD_BIEN_ASEG","bien");
					xx.put("P_ORIGEN","origen");
					xx.put("P_USUARIO","user");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("coti", cotizacion);
					parametrosIn.put("cert", certificado);
					parametrosIn.put("bien", bien);
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COTIZACION,ConstantsProcedureDB.PUB_PARAMETRICOS), parametrosIn, xx, ConstantsProcedureDB.PUB_PARAMETRICOS, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
				
				public List getComponentesParaComparacion(String cotizacion, String nroConsecutivo,String plan,String promo,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_CACX","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","user");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","cert");
					xx.put("P_VC_PLAN","plan");
					xx.put("P_VC_PROM","promo");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("coti", cotizacion);
					parametrosIn.put("cert", nroConsecutivo);
					parametrosIn.put("plan", plan);
					parametrosIn.put("promo", promo);
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "go");
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.L_COMPONENTES_DETALLE), parametrosIn, xx, ConstantsProcedureDB.L_COMPONENTES_DETALLE, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
				
				
				public List getTarifasParaComparacion(String cotizacion, String nroConsecutivo,String promo,String plan,String cobertura,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_CRTU","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","user");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","cert");
					xx.put("P_VC_COBE","cob");
					xx.put("P_VC_PLAN","plan");
					xx.put("P_VC_PROM","promo");
					
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("coti", cotizacion);
					parametrosIn.put("cert", nroConsecutivo);
					parametrosIn.put("plan", plan);
					parametrosIn.put("promo", promo);
					parametrosIn.put("cob", cobertura);
					
					parametrosIn.put("user", user);
					parametrosIn.put("origen", "WEBPRO");
					
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_TARIFA_DETALLE), parametrosIn, xx, ConstantsProcedureDB.L_TARIFA_DETALLE, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
				
				
				
				/****************************************************************************************
				 * FIN Comparacion
				 *****************************************************************************************/
				
				
				
				
}
