package com.pseguros.pes.service.entidades;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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

import com.pseguros.pes.bean.DatosContactoCotizador;
import com.pseguros.pes.bean.DatosCotizacionGO;
import com.pseguros.pes.bean.DatosDefaultCotizacion;
import com.pseguros.pes.bean.DatosGeneralesCotizacion;
import com.pseguros.pes.bean.DatosTomadorAseg;
import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.bean.ResultadoBusquedaEntidad;
import com.pseguros.pes.bean.datoValoDefaultCotizacion;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.interceptor.ConstantesDeSession;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.auxiliar.AuxiliarUtil;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Service

public class GoCotizadorService {
	private static final Logger logger = LoggerFactory.getLogger(GoCotizadorService.class);
	@Autowired
	private ExecuteService executeService;
	
	//ramos
	@Async
	public Future<ArrayList> getRamos(String origen,String aux, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CARP","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen", origen);
		parametrosIn.put("aux", aux);

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_GRILLA_RAMOS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_GRILLA_RAMOS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	public Future<ArrayList> datosCoberturas(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CACK","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","cons");
		xx.put("P_VC_PLAN","plan");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
		parametrosIn.put("plan", datosCoti.getPlan());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.MDW_COBERTURAS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.MDW_COBERTURAS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	
	public Future<ArrayList> datosProfesiones(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CAPW","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.L_PROFESIONES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_PROFESIONES,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	public Future<ArrayList> datosDocumentos(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CATU","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.L_TIPOS_DOCUMENTOS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_TIPOS_DOCUMENTOS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}

	public Future<ArrayList> datosGenero(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_RV","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.L_GENEROS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_GENEROS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}


	public Future<ArrayList> datosLugarNacimiento(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CAES","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.L_LUGARES_NACIMIENTO);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_LUGARES_NACIMIENTO,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	
	public Future<ArrayList> datosEstadoCivil(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_RV","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.L_ESTADOS_CIVIL);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_ESTADOS_CIVIL,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	public Future<ArrayList> datosPaises(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CAPA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.L_PAISES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_PAISES,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	public Future<ArrayList> datosDelBien(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_PARA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","cons");
		xx.put("P_VC_ACCI","acc");
		xx.put("P_NU_RAMO","ramo");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
		parametrosIn.put("acc", "P");
		parametrosIn.put("ramo", datosCoti.getRamo());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.B_DATOS_DINAMICOS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_DATOS_DINAMICOS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	public Future<HashMap> datosDinamicosInspeccion(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CPDI","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_INSP","inspc");
		xx.put("P_VC_PROD","prod");
		xx.put("P_NU_RAMO","ramo");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());
		parametrosIn.put("prod", datosCoti.getProducto());
		parametrosIn.put("ramo", datosCoti.getRamo());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_S,ConstantsProcedureDB.B_DINAMICOS_INSPECCION);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_DINAMICOS_INSPECCION,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		HashMap datosDinamicosInspeccion = new HashMap();
		
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		String numeroInspeccion = (String) salida.get("inspc");
		datosDinamicosInspeccion.put("dinamicos", datoSalida);
		datosDinamicosInspeccion.put("numeroInspeccion", numeroInspeccion);
		
		return new AsyncResult<HashMap>(datosDinamicosInspeccion);

	}
	
	public Future<ArrayList> datosInspeccionTabla(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CAIN","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_S,ConstantsProcedureDB.B_INSPECCIONES);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_INSPECCIONES,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	
	public String datosPlan(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_VC_PLAN","datosSalida");
		xx.put("P_VC_DPLA","datosSalidaDesc");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","cons");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());

		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.L_INGRESO_COBERTURAS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_INGRESO_COBERTURAS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		String datoSalida = (String) salida.get("datosSalida");
		String datoSalidaDesc = (String) salida.get("datosSalidaDesc");
		datosCoti.setDescPlan(datoSalidaDesc);
		
		return datoSalida;

	}
	
	
	


	@Async
	public Future<ArrayList> getProductosDirecciones(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CAPU","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_RAMO","ramo");
		xx.put("P_VC_PROD ","prod");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("ramo", datosCoti.getRamo());
		parametrosIn.put("origen", datosCoti.getOrigen());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("prod", datosCoti.getProducto());
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_GRILLA_PRODUCTOS), parametrosIn, xx, ConstantsProcedureDB.L_PRODUCTOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);

	}
	
	
	
	
	//provincias
	@Async
	public Future<datoValoDefaultCotizacion> getProvincias(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CAES","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_PROVINCIAS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_PROVINCIAS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<datoValoDefaultCotizacion>(new datoValoDefaultCotizacion(datosCoti.getDatosDefault().getProvincia(),datoSalida));
	}
	
	
	public Future<datoValoDefaultCotizacion> getTipoPersonas(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_RV","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_TIPOS_PERSONAS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_TIPOS_PERSONAS,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

		return new AsyncResult<datoValoDefaultCotizacion>(new datoValoDefaultCotizacion(datosCoti.getDatosDefault().getTipoPersona(),datoSalida));

	}
	
	//medip Pago
	public Future<datoValoDefaultCotizacion> getMedioPago(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CAMD","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_MEDIOS_PAGO);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_MEDIOS_PAGO,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<datoValoDefaultCotizacion>(new datoValoDefaultCotizacion(datosCoti.getDatosDefault().getMedioPago(),datoSalida));
	}
	

	//medip Pago
	public Future<datoValoDefaultCotizacion> datosCondicionIva(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CJIV","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_RAMO","ramo");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("ramo", datosCoti.getRamo());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_CONDICION_IVA);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_CONDICION_IVA,new Date().getTime());
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<datoValoDefaultCotizacion>(new datoValoDefaultCotizacion(datosCoti.getDatosDefault().getIva(),datoSalida));
	}
	
	
	//medip Pago
		public Future<datoValoDefaultCotizacion> datosVigencia(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			
			xx.put("P_TF_CAFP","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","origen");
			xx.put("P_VC_AUXI","aux");
			xx.put("P_NU_RAMO","ramo");
			xx.put("P_VC_PROD","prod");

			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", datosCoti.getRamo());
			parametrosIn.put("prod", datosCoti.getProducto());
			parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
			parametrosIn.put("origen", datosCoti.getOrigen());
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_VIGENCIAS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_VIGENCIAS,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<datoValoDefaultCotizacion>(new datoValoDefaultCotizacion(datosCoti.getDatosDefault().getVigencia(),datoSalida));
		}
		
		
		
		//facutacoin
				public Future<datoValoDefaultCotizacion> datosFacturacion(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CTFA","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_RAMO","ramo");

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("ramo", datosCoti.getRamo());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("origen", datosCoti.getOrigen());
					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_TIPOS_FACTURACION);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_TIPOS_FACTURACION,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

					return new AsyncResult<datoValoDefaultCotizacion>(new datoValoDefaultCotizacion(datosCoti.getDatosDefault().getTipoFacturacion(),datoSalida));
				}
				
				
				//moneda
				public Future<datoValoDefaultCotizacion> datosMoneda(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CAMO","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_RAMO","ramo");

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("ramo", datosCoti.getRamo());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("origen", datosCoti.getOrigen());
					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_MONEDAS);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_MONEDAS,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
					return new AsyncResult<datoValoDefaultCotizacion>(new datoValoDefaultCotizacion(datosCoti.getDatosDefault().getMoneda(),datoSalida));
				}
		
				

				//datos Calculo
				public Future<datoValoDefaultCotizacion> datosCalculo(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_RV","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_RAMO","ramo");

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("ramo", datosCoti.getRamo());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("origen", datosCoti.getOrigen());
					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_MODO_CALCULO);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_MODO_CALCULO,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

					return new AsyncResult<datoValoDefaultCotizacion>(new datoValoDefaultCotizacion(datosCoti.getDatosDefault().getModoCalculo(),datoSalida));
				}
				
				
				
				//datos Calculo
				public Future<ArrayList> datosValoresDefault(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_GANA","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_VC_FORM","form");
					xx.put("P_NU_RAMO","ramo");
					xx.put("P_VC_PROD","prod");
					

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("prod", datosCoti.getProducto());
					parametrosIn.put("ramo", datosCoti.getRamo());
					parametrosIn.put("form", datosCoti.getFormDatosGenerales());
					
					

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.D_VALORES_DEFAULT_DG);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.D_VALORES_DEFAULT_DG,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
					return new AsyncResult<ArrayList>(datoSalida);

				}
		
				
				//datos dinamicos
				public Future<ArrayList> datosDinamicos(DatosCotizacionGO datosCoti, String acc, EnvironmentType environment, String user) throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_PARA","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","cons");
					xx.put("P_VC_ACCI","acc");
					

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("coti", ""+datosCoti.getCotizacion());
					parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
					parametrosIn.put("acc", acc);
					

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.B_DATOS_DINAMICOS);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_DATOS_DINAMICOS,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
//					Collections.sort(datoSalida, new Comparator() {
//					public int compare(Object p1, Object p2) {
//						return new Integer(((HashMap<String, String>) p1).get("P_TF_PARA.CRCO_CRDP_CONSECUTIVO")).compareTo(new Integer(((HashMap<String, String>) p2).get("P_TF_PARA.CRCO_CRDP_CONSECUTIVO")));
//						}
//					});
					
					
					return new AsyncResult<ArrayList>(datoSalida);

				}
				
				
				public Future<ArrayList> datosAccesorios(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CAAX","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("origen", datosCoti.getOrigen());
					

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.L_ACCESORIOS);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_ACCESORIOS,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
					return new AsyncResult<ArrayList>(datoSalida);

				}
		
				public Future<ArrayList> datosPromociones(DatosCotizacionGO datosCoti, EnvironmentType environment, String user)throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_PROM","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","cons");
					

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("coti", ""+datosCoti.getCotizacion());
					parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
					

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_GRILLA_PROMOCIONES);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_GRILLA_PROMOCIONES,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
					return new AsyncResult<ArrayList>(datoSalida);

				}
				
				
				
				public Future<ArrayList> datosCuerpoPromociones(DatosCotizacionGO datosCoti, EnvironmentType environment, String user)throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CAZB","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","cons");
					

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("coti", ""+datosCoti.getCotizacion());
					parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
					

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.B_DATOS_PREMIO);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_DATOS_PREMIO,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
					return new AsyncResult<ArrayList>(datoSalida);

				}
				
				public Future<ArrayList> datosComision(DatosCotizacionGO datosCoti, EnvironmentType environment, String user)throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CPRC","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_COTI","coti");
					

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("coti", ""+datosCoti.getCotizacion());
					

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_COMISIONES_RECARGOS);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_COMISIONES_RECARGOS,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
					return new AsyncResult<ArrayList>(datoSalida);

				}
				

				public Map datosRecalculo(DatosCotizacionGO datosCoti, EnvironmentType environment, String user)throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);
					Map<String, String> datosSalidas = new HashMap<String, String>();

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_NU_DATO","datosSalidaA");
					xx.put("P_VC_DATO","datosSalidaB");
					xx.put("P_NU_RELA","datosSalidaC");
					xx.put("P_VC_MANT","datosSalidaD");
					xx.put("P_VC_INFO","datosSalidaE");
					xx.put("P_VC_TABL","datosSalidaF");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","cons");

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("coti", ""+datosCoti.getCotizacion());
					parametrosIn.put("cons", ""+datosCoti.getConsecutivo());

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.L_PARAMETRICO_RECALCULO);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_PARAMETRICO_RECALCULO,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					String datoSalidaA = (String) salida.get("datosSalidaA");
					String datoSalidaB = (String) salida.get("datosSalidaB");
					String datoSalidaE = (String) salida.get("datosSalidaE");
					String datoSalidaF = (String) salida.get("datosSalidaF");

					
					datosSalidas.put("P_NU_DATO", datoSalidaA);
					datosSalidas.put("P_VC_DATO", datoSalidaB);
					datosSalidas.put("P_VC_INFO", datoSalidaE);
					datosSalidas.put("P_VC_TABL", datoSalidaF);
					return datosSalidas;

				}
				
				
				public Future<ArrayList> datosCertificado(DatosCotizacionGO datosCoti, EnvironmentType environment, String user)throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CAZB","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_COTI","coti");
					

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("coti", ""+datosCoti.getCotizacion());
					

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.B_GRILLA_CERTIFICADOS);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_GRILLA_CERTIFICADOS,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
					return new AsyncResult<ArrayList>(datoSalida);

				}
				
				
				public String datosVarios(DatosCotizacionGO datosCoti, String ruti,EnvironmentType environment, String user)throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_VC_INFO","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","cons");
					xx.put("P_NU_RUTI","ruti");
					
					 

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("coti", ""+datosCoti.getCotizacion());
					parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
					parametrosIn.put("ruti", ruti);
					

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.B_DATOS_VARIOS);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.B_DATOS_VARIOS,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					String datoSalida = (String) salida.get("datosSalida");
					
					return datoSalida;

				}
				
				
				
				public void guardarPromocion(DatosCotizacionGO datosCoti ,EnvironmentType environment, String user)throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);
					try {
						
					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","consecutivo");
					xx.put("P_VC_PROM","promo");

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("coti", ""+datosCoti.getCotizacion());
					parametrosIn.put("consecutivo", ""+datosCoti.getConsecutivo());
					parametrosIn.put("promo", AuxiliarUtil.generarPromo(datosCoti));
				

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.GUARDAR_PROMOCION);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.GUARDAR_PROMOCION,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					} catch (Exception e) {
						logger.error("error al ejecutar el procedimiento GUARDAR_PROMOCION",e);			
					}
				}
				
				public void calculoCotizacion(DatosCotizacionGO datosCoti , String tipo, EnvironmentType environment, String user)throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);
					String datosPromo = null;
					try {
						
					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_COTI","coti");
					xx.put("P_NU_CONS","consecutivo");
					xx.put("P_VC_TIPO","tipo");
					 

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("coti", ""+datosCoti.getCotizacion());
					parametrosIn.put("consecutivo", ""+datosCoti.getConsecutivo());
					parametrosIn.put("tipo", tipo);

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.MDW_CALCULO_COTIZACION);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.MDW_CALCULO_COTIZACION,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}

					} catch (Exception e) {
						logger.error("error al ejecutar el procedimiento MDW_CALCULO_COTIZACION",e);			
						 throw new Exception(e.getMessage());
					}
				}
				
				//resultado parametricos
				public Future<ArrayList> datosResultadoParametricos(DatosCotizacionGO datosCoti , String tabla,  EnvironmentType environment, String user) throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CRTB","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_TABL","tabla");
					xx.put("P_NU_RAMO","ramo");
					xx.put("P_VC_PROD","prod");
					

					Map<String, Object> parametrosIn = new HashMap<String, Object>();
				
					parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
					parametrosIn.put("origen", datosCoti.getOrigen());
					parametrosIn.put("prod", datosCoti.getProducto());
					parametrosIn.put("ramo", datosCoti.getRamo());
					
					parametrosIn.put("tabla", tabla);
					

					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_PARAMETRICOS);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_PARAMETRICOS,new Date().getTime());
					
//					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
//						throw new Exception(salida.get("error").toString());
//					}
//					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
//						throw new Exception(salida.get("mensaje").toString());
//					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
					return new AsyncResult<ArrayList>(datoSalida);

				}
		
				
	
	// productos
	public Object getProductos(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CAPU","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_RAMO","ramo");
		xx.put("P_VC_PROD ","prod");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("ramo", datosCoti.getRamo());
		parametrosIn.put("origen", datosCoti.getOrigen());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_GRILLA_PRODUCTOS), parametrosIn, xx, ConstantsProcedureDB.L_PRODUCTOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	
	// Parametricos
	public Object datosParametricos(DatosCotizacionGO datosCoti,String tabla,String stri,EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CRTB","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_TABL","tab");
		xx.put("P_VC_STRI","stri");
		xx.put("P_VC_FILT","filt");
		xx.put("P_NU_RAMO","ramo");
		xx.put("P_VC_PROD","prod");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("tab", tabla);
		parametrosIn.put("stri", stri);
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());
		parametrosIn.put("prod", datosCoti.getProducto());
		parametrosIn.put("ramo", datosCoti.getRamo());
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_PARAMETRICOS), parametrosIn, xx, ConstantsProcedureDB.L_PARAMETRICOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	public String tipoVehiculo(String stri,DatosCotizacionGO datosCoti, String deri, String tabla, EnvironmentType environmentType, String string) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_DATO","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_TABL","tab");
		xx.put("P_VC_DERI","deri");
		xx.put("P_VC_STRI","stri");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen", datosCoti.getOrigen());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("tab", tabla);
		parametrosIn.put("deri",deri);
		parametrosIn.put("stri",stri);
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.L_VALOR_DERIVADO), parametrosIn, xx, ConstantsProcedureDB.L_VALOR_DERIVADO, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		String lista = (String) salida.get("datosSalida");

		return lista;

	}
	
	
	public boolean validarFechaNac(String fecha,String aux,String origen, EnvironmentType environmentType, String string) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_VC_FNAC","fecha");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen", origen);
		parametrosIn.put("aux", aux);
		parametrosIn.put("fecha",fecha);
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_VALIDAR_FNACIMIENTO), parametrosIn, xx, ConstantsProcedureDB.L_VALIDAR_FNACIMIENTO, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		
		String lista = (String) salida.get("mensaje");
		if( lista != null && lista.length() > 0){
			return false;
		}
		return true;
	}
	
	
	public String datosSumaAsegurada(String marca, String modelo, String anio, String ceroKm, DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_NU_MT_SUMA","datosSalida");
		xx.put("P_VC_MENS","mensake");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_VC_MARC","marc");
		xx.put("P_VC_MODE","modelo");
		xx.put("P_VC_ANIO","annio");
		xx.put("P_VC_0KM","ceroKm");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen", datosCoti.getOrigen());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("marc", marca);
		parametrosIn.put("modelo", modelo);
		parametrosIn.put("annio",anio);
		parametrosIn.put("ceroKm",ceroKm);

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.L_OBTENER_SUMA_ASEGURADA), parametrosIn, xx, ConstantsProcedureDB.L_OBTENER_SUMA_ASEGURADA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		String valor = (String) salida.get("datosSalida");

		return valor;

	}
	
	
	
	public Object datosUbicaciones(String dato, DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_GECP","datosSalida");
		xx.put("P_VC_MENS","mensake");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_VC_BUSQ","busq");
		xx.put("P_VC_ACCI","acci");
		
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen", datosCoti.getOrigen());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("busq",dato);

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.B_CODIGOS_POSTALES), parametrosIn, xx, ConstantsProcedureDB.B_CODIGOS_POSTALES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	//finalDatosGenerales
	public Object finDatosGenerales(DatosCotizacionGO datosCoti, EnvironmentType environment, String user) throws Exception {

		
		DatosGeneralesCotizacion datos = datosCoti.getDatosGenerales();
		
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","datosSalida");
		xx.put("P_VC_ERRO","mensaje");
		xx.put("P_NU_COTI","P_NU_COTI");
		xx.put("P_VC_ORIG","P_VC_ORIG");
		xx.put("P_VC_AUXI","P_VC_AUXI");
		xx.put("P_NU_CONS","P_NU_CONS");
		xx.put("P_NU_RAMO","P_NU_RAMO");
		xx.put("P_VC_PROD","P_VC_PROD");
		xx.put("P_VC_TRAN","P_VC_TRAN");
		xx.put("P_VC_TFAC","P_VC_TFAC");
		xx.put("P_VC_VIGE","P_VC_VIGE");
		xx.put("P_VC_MONE","P_VC_MONE");
		xx.put("P_VC_CALC","P_VC_CALC");
		xx.put("P_NU_OEND","P_NU_OEND");
		xx.put("P_VC_VIGT","P_VC_VIGT");
		xx.put("P_NU_PROD","P_NU_PROD");
		xx.put("P_NU_PCIA","P_NU_PCIA");
		xx.put("P_NU_MEDI","P_NU_MEDI");
		xx.put("P_VC_ORIC","P_VC_ORIC");
		xx.put("P_VC_PROM","P_VC_PROM");
		xx.put("P_NU_NID","P_NU_NID");
		xx.put("P_VC_TPER","P_VC_TPER");
		xx.put("P_NU_PPAG","P_NU_PPAG");
		xx.put("P_VC_CUIT","P_VC_CUIT");
		xx.put("P_VC_CIVA","P_VC_CIVA");
		xx.put("P_VC_INDI","P_VC_INDI");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
	
		parametrosIn.put("P_NU_CONS", "1");
		parametrosIn.put("P_VC_TRAN", "E");
		parametrosIn.put("P_VC_INDI", "S");

		parametrosIn.put("P_VC_MONE", datos.getMoneda());
		parametrosIn.put("P_VC_CALC", datos.getModoCalculo());
		parametrosIn.put("P_VC_VIGT", datos.getVigenciaTecnica());
		parametrosIn.put("P_NU_MEDI", datos.getMedioPago());
		parametrosIn.put("P_NU_PPAG", datos.getPlanPago());
		parametrosIn.put("P_VC_TPER", datos.getTipoPersona());
		parametrosIn.put("P_VC_CIVA", datos.getCondicionIva());
		parametrosIn.put("P_NU_PCIA", datos.getProvincia());
		parametrosIn.put("P_VC_VIGE", datos.getVigencia());
		parametrosIn.put("P_VC_TFAC", datos.getTipoFacturacion());
		parametrosIn.put("P_VC_ORIC", datos.getOrigenPago());

		parametrosIn.put("P_NU_PROD", datosCoti.getProductor());
		parametrosIn.put("P_VC_PROD", datosCoti.getProducto());
		parametrosIn.put("P_VC_AUXI", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("P_VC_ORIG", datosCoti.getOrigen());
		parametrosIn.put("P_NU_RAMO", datosCoti.getRamo());
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.MDW_FIN_DATOS_GENERALES), parametrosIn, xx, ConstantsProcedureDB.MDW_FIN_DATOS_GENERALES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		String lista = (String) salida.get("P_NU_COTI");

		return lista;

	}
	
	
	
	// vigencia tecnica
		public Object getVigenciaTecnica(DatosCotizacionGO datosCoti,String vigencia, EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_CAVT","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","origen");
			xx.put("P_VC_AUXI","aux");
			xx.put("P_NU_RAMO","ramo");
			xx.put("P_VC_PROD","prod");
			xx.put("P_VC_VIGE","vigencia");
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", datosCoti.getRamo());
			parametrosIn.put("prod", datosCoti.getProducto());
			parametrosIn.put("vigencia", vigencia);
			parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
			parametrosIn.put("origen", datosCoti.getOrigen());
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_VIGENCIAS_TECNICAS), parametrosIn, xx, ConstantsProcedureDB.L_VIGENCIAS_TECNICAS, new Date().getTime(), "_");

			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
	
		
		
		public void guardarDatosCliente(DatosCotizacionGO datosCoti,EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","origen");
			xx.put("P_VC_AUXI","aux");
			xx.put("P_NU_COTI","coti");
			xx.put("P_VC_APEL","apellido");
			xx.put("P_VC_DOCU","doc");
			xx.put("P_VC_CUIT","cuit");
			xx.put("P_VC_TELE","telefono");
			xx.put("P_VC_EMAI","email");
			xx.put("P_VC_DOMI","domicilio");
			
			DatosContactoCotizador datosCliente = datosCoti.getDatosContacto();
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("origen",datosCoti.getOrigen() );
			parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
			parametrosIn.put("coti",""+datosCoti.getCotizacion() );
			parametrosIn.put("apellido",datosCliente.getNombre());
			parametrosIn.put("doc", datosCliente.getDni());
			parametrosIn.put("telefono",datosCliente.getTelefono());
			parametrosIn.put("email",datosCliente.getEmail());
			parametrosIn.put("domicilio",datosCliente.getDomicilio());

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.ACTUALIZAR_CONTACTO), parametrosIn, xx, ConstantsProcedureDB.ACTUALIZAR_CONTACTO, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}

		}
		
		
		// planes Pagos
				public Object getPlanesPagos(String vigencia,EnvironmentType environment, String user) throws Exception {

					Map<String, String> xx = new HashMap<String, String>();
					xx.put("P_TF_CAFR","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_VC_VIGE","vigencia");
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("vigencia", vigencia);
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_PLANES_PAGO), parametrosIn, xx, ConstantsProcedureDB.L_PLANES_PAGO, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;

				}
				
		
	
	// selector origen de pago
	public Object getOrigenPago(String medioPago, EnvironmentType environment, String user, DatosCotizacionGO datosCoti) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_COTC","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_MEDI","medioPago");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("medioPago", medioPago);
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_ORIGEN_PAGO), parametrosIn, xx, ConstantsProcedureDB.L_ORIGEN_PAGO, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	//fin step 3 datos del bien
	public Object guardarDatosDelBien (DatosCotizacionGO datosCoti, EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_VC_DATO","dato");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("dato", datosCoti.getValorFinalDatosDinamicos());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("consecutivo", ""+datosCoti.getConsecutivo());
		parametrosIn.put("origen", datosCoti.getOrigen());
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.MDW_ACTUALIZA_DATOS), parametrosIn, xx, ConstantsProcedureDB.MDW_ACTUALIZA_DATOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList<String> dato = new ArrayList();
		ArrayList lista = (ArrayList) salida.get("datosSalida");
				if (lista == null){
					dato.add("ok");
				}
		return dato;
	}
	
	public Object guardarDatosAccesorios (DatosCotizacionGO datosCoti, EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_VC_ACCE","accesorio");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("accesorio", datosCoti.getAccesorios());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("consecutivo", ""+datosCoti.getConsecutivo());
		parametrosIn.put("origen", datosCoti.getOrigen());
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.I_ACCESORIOS), parametrosIn, xx, ConstantsProcedureDB.I_ACCESORIOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
	}
	
	public Object guardarDatosDelBienEmision (DatosCotizacionGO datosCoti, EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_VC_DATO","dato");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("dato", datosCoti.getValorFinalDatosDinamicosEmision());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("consecutivo", ""+datosCoti.getConsecutivo());
		parametrosIn.put("origen", datosCoti.getOrigen());
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.MDW_ACTUALIZA_DATOS), parametrosIn, xx, ConstantsProcedureDB.MDW_ACTUALIZA_DATOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList<String> dato = new ArrayList();
		ArrayList lista = (ArrayList) salida.get("datosSalida");
				if (lista == null){
					dato.add("ok");
				}
		return dato;
	}
	
	
	public Object emitirPoliza (DatosCotizacionGO datosCoti, EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_NU_POLI","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCU","sucu");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("aux", AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("origen", datosCoti.getOrigen());
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_E,ConstantsProcedureDB.MDW_SOLICITUD_EMISION), parametrosIn, xx, ConstantsProcedureDB.MDW_SOLICITUD_EMISION, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList<String> dato = new ArrayList();
		ArrayList lista = (ArrayList) salida.get("datosSalida");
				if (lista == null){
					dato.add("ok");
				}
		return dato;
	}
	
	
	public Object recalculoComision (DatosCotizacionGO datosCoti, EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_NU_RELA","rela");
		xx.put("P_VC_MANT","mant");
		xx.put("P_NU_DATO","dato");
		xx.put("P_VC_DATO","vcDato");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("consecutivo", ""+datosCoti.getConsecutivo());
		parametrosIn.put("rela", datosCoti.getComision());
		parametrosIn.put("mant", "N");
		parametrosIn.put("dato", "40088");
		parametrosIn.put("vcDato", "1");

		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.MDW_RECALCULO_COTIZACION), parametrosIn, xx, ConstantsProcedureDB.MDW_RECALCULO_COTIZACION, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList<String> dato = new ArrayList();
		ArrayList lista = (ArrayList) salida.get("datosSalida");
				if (lista == null){
					dato.add("ok");
				}
		return dato;
	}
	
	
	public Object buscarPersona (DatosCotizacionGO datosCoti,DatosTomadorAseg datosTomador, EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CABU","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_VC_BUSQ","busqueda");
		xx.put("P_NU_PERS","persona");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("busqueda", datosTomador.getDni());
	
	
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.B_PERSONAS), parametrosIn, xx, ConstantsProcedureDB.B_PERSONAS, new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");
		if(!lista.isEmpty()){
			for (Iterator iterator = lista.iterator(); iterator.hasNext();) {
				Object object = (Object) iterator.next();
				datosCoti.setNuPersona(((HashMap)object).get("P_TF_CABU_CABU_NU_PERSONA_R").toString());
			}
		}
		return lista;
	}

	
	public Object buscarComunicacion (DatosCotizacionGO datosCoti,String codigo,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CACF","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_PERS","persona");
		xx.put("P_CD_TIPO","tipo");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","cons");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("persona", datosCoti.getNuPersona());
		parametrosIn.put("tipo", codigo);
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
		
		
	
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.B_COMUNICACIONES), parametrosIn, xx, ConstantsProcedureDB.B_COMUNICACIONES, new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");
		
		return lista;
	}

	
	
	public Object buscarBanco (DatosCotizacionGO datosCoti,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CADM","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_PERS","persona");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","cons");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("persona", datosCoti.getNuPersona());
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
		
		
	
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.B_DOMICILIOS_BANCARIOS), parametrosIn, xx, ConstantsProcedureDB.B_DOMICILIOS_BANCARIOS, new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");
		
		return lista;
	}
	
	public Object buscarDomicilio (DatosCotizacionGO datosCoti,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CADO","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_PERS","persona");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","cons");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("persona", datosCoti.getNuPersona());
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
		
		
	
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.B_DOMICILIOS), parametrosIn, xx, ConstantsProcedureDB.B_DOMICILIOS, new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");
		
		return lista;
	}
	
	public Object buscarDetallePlanPromo (DatosCotizacionGO datosCoti,String plan,String promo,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CACX","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","cons");
		xx.put("P_VC_PLAN","plan");
		xx.put("P_VC_PROM","promo");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
		parametrosIn.put("plan", plan);
		parametrosIn.put("promo", promo);
		
	
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
	

	public Object buscarDetallePlanPromoCobertura (DatosCotizacionGO datosCoti,String plan,String promo,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CACK","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","cons");
		xx.put("P_VC_PLAN","plan");
		xx.put("P_VC_PROM","promo");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
		parametrosIn.put("plan", plan);
		parametrosIn.put("promo", promo);
		
	
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
	
	
	public Object confirmarCotizacion (DatosCotizacionGO datosCoti,String impr,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_VC_IMPR","impr");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("impr", impr);
		
	
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_C,ConstantsProcedureDB.CIERRE_COTIZACION), parametrosIn, xx, ConstantsProcedureDB.CIERRE_COTIZACION, new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		
		return true;
		
	}
	
	
	

	public Object guardarDatosPromoPlan (DatosCotizacionGO datosCoti,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","coti");
		xx.put("P_NU_CONS","cons");
		xx.put("P_VC_PLAN","plan");
		xx.put("P_VC_PROM","prom");
		xx.put("P_VC_DESD","desde");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("cons", ""+datosCoti.getConsecutivo());
		parametrosIn.put("plan", datosCoti.getPlan());
		parametrosIn.put("prom", datosCoti.getPromocion());
		parametrosIn.put("desde", datosCoti.getFechaEmision());
		
	
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_E,ConstantsProcedureDB.I_SELECCION_PLAN), parametrosIn, xx, ConstantsProcedureDB.I_SELECCION_PLAN, new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}
	
	
	public Object guardarComunicacion (DatosCotizacionGO datosCoti,String valor,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_SALI","datoSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_PERS","persona");
		xx.put("P_NU_COTI","coti");
		xx.put("P_VC_COMU","comunicacion");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("coti", ""+datosCoti.getCotizacion());
		parametrosIn.put("presona", datosCoti.getNuPersona());
		parametrosIn.put("comunicacion", valor);
		
	
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.I_COMUNICACIONES), parametrosIn, xx, ConstantsProcedureDB.I_COMUNICACIONES, new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}
	
	
	
	public Object guardarComunicacion  (DatosCotizacionGO datosCoti,String valor,String conz,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_SALI","datoSalida");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_PERS","persona");
		xx.put("P_NU_CONZ","conz");
		xx.put("P_NU_COTI","cotizacion");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_VC_COMU","comunicacion");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("persona",datosCoti.getNuPersona());
		parametrosIn.put("conz", conz);
		parametrosIn.put("cotizacion", ""+datosCoti.getCotizacion());
		parametrosIn.put("consecutivo",""+datosCoti.getConsecutivo());
		parametrosIn.put("comunicacion", valor);
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.I_COMUNICACIONES), parametrosIn, xx, ConstantsProcedureDB.I_COMUNICACIONES , new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}
	
	public Object guardarComunicacionNuevo  (DatosCotizacionGO datosCoti,String valor,String conz,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_SALI","datoSalida");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_PERS","persona");
		xx.put("P_NU_CONZ","conz");
		xx.put("P_NU_COTI","cotizacion");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_VC_COMU","comunicacion");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("persona",datosCoti.getNuPersona());
		parametrosIn.put("cotizacion", ""+datosCoti.getCotizacion());
		parametrosIn.put("consecutivo",""+datosCoti.getConsecutivo());
		parametrosIn.put("comunicacion", valor);
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.I_COMUNICACIONES), parametrosIn, xx, ConstantsProcedureDB.I_COMUNICACIONES , new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}

	public Object guardarDomicilio  (DatosCotizacionGO datosCoti,String valor,String condicion,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_SALI","datoSalida");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_PERS","persona");
		xx.put("P_NU_COND","condicion");
		xx.put("P_NU_COTI","cotizacion");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_VC_DIRE","direccion");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("persona",datosCoti.getNuPersona());
		parametrosIn.put("condicion", condicion);
		parametrosIn.put("cotizacion", ""+datosCoti.getCotizacion());
		parametrosIn.put("consecutivo",""+datosCoti.getConsecutivo());
		parametrosIn.put("direccion", valor);
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.I_DOMICILIOS), parametrosIn, xx, ConstantsProcedureDB.I_DOMICILIOS , new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}
	
	
	public Object guardarDatosBancarios  (DatosCotizacionGO datosCoti,String valor,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_SALI","datoSalida");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_DOMI","domi");
		xx.put("P_NU_CONZ","conz");
		xx.put("P_NU_COTI","cotizacion");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_VC_BANC","datoBanco");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("persona",datosCoti.getNuPersona());
		parametrosIn.put("cotizacion", ""+datosCoti.getCotizacion());
		parametrosIn.put("consecutivo",""+datosCoti.getConsecutivo());
		parametrosIn.put("datoBanco", valor);
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.I_DATOS_BANCARIOS), parametrosIn, xx, ConstantsProcedureDB.I_DATOS_BANCARIOS , new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}
	
	
	public Object crearPersona  (DatosCotizacionGO datosCoti,String valor,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_SALI","datoSalida");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_PERS","persona");
		xx.put("P_NU_COTI","cotizacion");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_VC_TIPO","tipo");
		xx.put("P_VC_STRI","datoPersona");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("tipo","TF");
		parametrosIn.put("cotizacion", ""+datosCoti.getCotizacion());
		parametrosIn.put("consecutivo",""+datosCoti.getConsecutivo());
		parametrosIn.put("datoPersona", valor);
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.I_PERSONA), parametrosIn, xx, ConstantsProcedureDB.I_PERSONA , new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}
	public Object guardarPersona  (DatosCotizacionGO datosCoti,String valor,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_SALI","datoSalida");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_PERS","persona");
		xx.put("P_NU_COTI","cotizacion");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_VC_TIPO","tipo");
		xx.put("P_VC_STRI","datoPersona");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("cotizacion", ""+datosCoti.getCotizacion());
		parametrosIn.put("consecutivo",""+datosCoti.getConsecutivo());
		parametrosIn.put("datoPersona", datosCoti.getNuPersona()+valor);
		parametrosIn.put("tipo", "TF");
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_P,ConstantsProcedureDB.I_PERSONA), parametrosIn, xx, ConstantsProcedureDB.I_PERSONA , new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}
	
	
	public Object generarNuevaInspeccion  (DatosCotizacionGO datosCoti,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","cotizacion");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_NU_INSP","inspeccion");
		xx.put("P_VC_RESU","dato");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("cotizacion", ""+datosCoti.getCotizacion());
		parametrosIn.put("consecutivo",""+datosCoti.getConsecutivo());
		parametrosIn.put("inspeccion", datosCoti.getInspeccion());
		parametrosIn.put("dato", datosCoti.getValorFinalDatosDinamicosInspeccion());
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_S,ConstantsProcedureDB.I_INSPECCION), parametrosIn, xx, ConstantsProcedureDB.I_INSPECCION , new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}
	
	public Object asociarInspeccion  (DatosCotizacionGO datosCoti,EnvironmentType entorno, String user) throws Exception{
		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_NU_COTI","cotizacion");
		xx.put("P_NU_CONS","consecutivo");
		xx.put("P_NU_INSP","inspeccion");
		xx.put("P_VC_OBSE","dato");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("origen",datosCoti.getOrigen());
		parametrosIn.put("aux",AuxiliarUtil.generarAux(datosCoti));
		parametrosIn.put("cotizacion", ""+datosCoti.getCotizacion());
		parametrosIn.put("consecutivo",""+datosCoti.getConsecutivo());
		parametrosIn.put("inspeccion", datosCoti.getInspeccion());
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_S,ConstantsProcedureDB.ASOCIAR_INSPECCION), parametrosIn, xx, ConstantsProcedureDB.ASOCIAR_INSPECCION , new Date().getTime(), "_");
	
		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		return true;
		
	}
}
