package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Service
public class DireccionService {
	private static final Logger logger = LoggerFactory.getLogger(DireccionService.class);

	@Autowired
	private ExecuteService executeService;
	
	
	 /* ----------------------------- PANEL A ---------------------*/
		public Object getDireccionesPoliza(String ramo, String poliza, String sucursal, String cliente, String cerificado, EnvironmentType environment, String user) throws Exception {

			EnvironmentContextHolder.setEnvironmentType(environment);
			
			Map<String, String> xx = new HashMap<String, String>();

			xx.put("P_TF_DIRE", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_CACN_NU_CEDULA_RIF", "nuCliente");
			xx.put("P_CD_SUCURSAL", "nuSucursal");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_CAPO_NU_POLIZA", "nuPoliza");
			xx.put("P_NU_CERTIFICADO", "certificado");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");

			Map<String, Object> parametrosIn = new HashMap<String, Object>();

			if (ramo != null) {
				parametrosIn.put("ramo", ramo);
			}
			if (poliza != null) {
				parametrosIn.put("nuPoliza", poliza);
			}
			if (cliente != null) {
				parametrosIn.put("nuCliente", cliente);
			}
			if (cerificado != null) {
				parametrosIn.put("certificado", cerificado);
			}
			if (sucursal != null) {
				parametrosIn.put("nuSucursal", sucursal);
			}
			
			parametrosIn.put("user", user);

			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_DIRECCIONES, ConstantsProcedureDB.PUB_CABECERA_DIRECCIONES);

			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, xx, ConstantsProcedureDB.PUB_CABECERA_DIRECCIONES, new Date().getTime());

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}

			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

			return datoSalida;
		}
		
		
		/* ----------------------------- PANEL B ------------------------------------------*/
		public Object getListadoDirecciones(String ramo, String poliza, String sucursal, String dato, String cerificado,String cliente, EnvironmentType environment, String user) throws Exception {

			EnvironmentContextHolder.setEnvironmentType(environment);
			
			Map<String, String> xx = new HashMap<String, String>();

			xx.put("P_TF_LISTA_DIRE", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_CACN_NU_CEDULA_RIF", "nuCliente");
			xx.put("P_CACE_CACN_NU_CEDULA_RIF","nuCedula");
			xx.put("P_CD_SUCURSAL", "nuSucursal");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_CAPO_NU_POLIZA", "nuPoliza");
			xx.put("P_NU_CERTIFICADO", "certificado");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");

			Map<String, Object> parametrosIn = new HashMap<String, Object>();

			if (ramo != null) {
				parametrosIn.put("ramo", ramo);
			}
			if (poliza != null) {
				parametrosIn.put("nuPoliza", poliza);
			}
			if (cliente != null) {
				parametrosIn.put("nuCliente", cliente);
			}
			if (cerificado != null) {
				parametrosIn.put("certificado", cerificado);
			}
			if (sucursal != null) {
				parametrosIn.put("nuSucursal", sucursal);
			}
			
			parametrosIn.put("user", user);

			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_DIRECCIONES, ConstantsProcedureDB.PUB_LISTA_DIRECCIONES);

			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, xx, ConstantsProcedureDB.PUB_LISTA_DIRECCIONES, new Date().getTime());

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}

			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

			return datoSalida;
		}
		
		
		
		/*------------------------- panel c AJAX -------------------- */
		
		public Object getDirecciones(String consecutivo, String direConsecutivo, String cliente, EnvironmentType environment, String user) throws Exception {

			logger.debug("Inicio get panelC direccion, consecutivo :" + consecutivo + " direConsecutivo : " + direConsecutivo + " cliente : " + cliente);
			
			EnvironmentContextHolder.setEnvironmentType(environment);
			
			Map<String, String> xx = new HashMap<String, String>();

			xx.put("P_TF_DETALLE", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_CABU_NU_PERSONA", "cliente");
			xx.put("P_CADO_CONSECUTIVO_DIRECCION", "direConsecutivo");
			xx.put("P_CACF_NU_CONSECUTIVO", "consecutivo");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("cliente", cliente);
			parametrosIn.put("direConsecutivo", direConsecutivo);
			parametrosIn.put("consecutivo", consecutivo);
			parametrosIn.put("user", user);

			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_DIRECCIONES, ConstantsProcedureDB.PUB_DETALLE_DIRECCIONES);
			Map<String, String> parametrosDeclarados = xx;

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato, parametrosIn, parametrosDeclarados, ConstantsProcedureDB.PUB_DETALLE_DIRECCIONES, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}

			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");

			return datoSalida;
		}
		
		public List obtenerListadoDirecciones(String ramo, String poliza, String sucursal, String dato, String cerificado,String cliente, EnvironmentType environment, String user) throws Exception {

			EnvironmentContextHolder.setEnvironmentType(environment);
			
			Map<String, String> xx = new HashMap<String, String>();

			xx.put("P_TF_LISTA_DIRE", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_CACN_NU_CEDULA_RIF", "nuCliente");
			xx.put("P_CACE_CACN_NU_CEDULA_RIF","nuCedula");
			xx.put("P_CD_SUCURSAL", "nuSucursal");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_CAPO_NU_POLIZA", "nuPoliza");
			xx.put("P_NU_CERTIFICADO", "certificado");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");

			Map<String, Object> parametrosIn = new HashMap<String, Object>();

			if (ramo != null) {
				parametrosIn.put("ramo", ramo);
			}
			if (poliza != null) {
				parametrosIn.put("nuPoliza", poliza);
			}
			if (cliente != null) {
				parametrosIn.put("nuCliente", cliente);
			}
			if (cerificado != null) {
				parametrosIn.put("certificado", cerificado);
			}
			if (sucursal != null) {
				parametrosIn.put("nuSucursal", sucursal);
			}
			
			parametrosIn.put("user", user);

			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_DIRECCIONES, ConstantsProcedureDB.PUB_LISTA_DIRECCIONES);

			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, xx, ConstantsProcedureDB.PUB_LISTA_DIRECCIONES, new Date().getTime());

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
