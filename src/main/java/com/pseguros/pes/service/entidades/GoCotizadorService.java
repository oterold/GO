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
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
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
		xx.put("P_VC_MENS","datosSalida");
		xx.put("P_VC_ERRO","mensaje");
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
	
}
