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
import com.pseguros.pes.dao.PolizaDAO;
import com.pseguros.pes.dto.ClienteDTO;
import com.pseguros.pes.dto.PolizaDTO;
import com.pseguros.pes.dto.DeudaPoliza;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.generic.WebAplicatioonConst;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;




@Service
public class PolizaService {

	@Autowired
	private PolizaDAO polizaDAO;

	private static final Logger logger = LoggerFactory.getLogger(PolizaService.class);

	@Autowired
	private ExecuteService executeService;
	
	public List<PolizaDTO> getPolizas(String dato) throws Exception {
		return polizaDAO.getPolizas(dato);
	}

	public List<ClienteDTO> getClientes(String dato) throws Exception {
		return polizaDAO.getClientes(null, false, null, null, null, dato);
	}

		
		//PNAEL B
		
		@Async
		public Future<ArrayList> getEndososPoliza(String ramo, String poliza,String sucursal, EnvironmentType environment, String user, int desde, int hasta) throws Exception {
		Map<String, String> xx = new HashMap<String, String>();
		
		EnvironmentContextHolder.setEnvironmentType(environment);

		
			xx.put("P_TF_LISTA_END","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","nuPoliza");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("nuPoliza", poliza);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");

			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_POLIZA,ConstantsProcedureDB.PUB_LISTA_ENDOSOS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_ENDOSOS,new Date().getTime() ,desde,hasta);
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}

		
		//paginado panel b
		
		public Object getEndososPolizaPaginado(String ramo, String poliza,String sucursal, EnvironmentType environment, String user, int desde, int hasta) throws Exception {

	
			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_LISTA_END","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","nuPoliza");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("nuPoliza", poliza);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_POLIZA, ConstantsProcedureDB.PUB_LISTA_ENDOSOS), parametrosIn, xx, "PUB_LISTA_ENDOSOS", new Date().getTime(), "_",desde,hasta);

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}

		
		

//PANEL A
		@Async
		public Future<ArrayList> getPoliza(String ramo, String poliza,String sucursal, EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			
			EnvironmentContextHolder.setEnvironmentType(environment);

		
			xx.put("P_TF_POLI","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","nuPoliza");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("nuPoliza", poliza);
			parametrosIn.put("user", user);
			parametrosIn.put("entorno", "go");
			
			
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_POLIZA,ConstantsProcedureDB.PUB_POLIZA);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_POLIZA,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}
		

		//PANEL C
		
		@Async
		public Future<ArrayList> getCertificadoPoliza(String ramo, String poliza,String sucursal, EnvironmentType environment, String user) throws Exception {
			Map<String, String> xx = new HashMap<String, String>();
				
			EnvironmentContextHolder.setEnvironmentType(environment);

				xx.put("P_TF_CERTIF","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","nuPoliza");
				xx.put("P_NU_ENDOSO","endoso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("sucursal", sucursal);
				parametrosIn.put("nuPoliza", poliza);
				parametrosIn.put("user", user);

				
				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_POLIZA,ConstantsProcedureDB.PUB_CERTIFICADOS);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_CERTIFICADOS,new Date().getTime());
				
				if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
				
				return new AsyncResult<ArrayList>(datoSalida);

			}
		
		
		
		
		
		
		
		//deudaPoliza
		@Async
		public Future<DeudaPoliza> getDeudaPoliza(String poliza,String ramo,String certificado,String sucursal,EnvironmentType environment, String user) throws Exception {
			
			
			try {
				
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			
			xx.put("P_CASU_CD_SUCURSAL","sucursal");
			xx.put("P_CARP_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","poliza");
			xx.put("P_NU_CERTIFICADO","certificado");
			xx.put("P_VC_ORIG","orig");
			xx.put("P_USUARIO","user");
			xx.put("P_IMP_DEUDA","deuda");
			xx.put("P_OBSERVACION","obs");
			xx.put("P_DATO_SALIDA","datoSalida");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("ramo",ramo);
			parametrosIn.put("poliza",poliza);
			parametrosIn.put("certificado",certificado);
			parametrosIn.put("orig","GO");
			parametrosIn.put("user",user);
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_RUTINAS_VARIAS,ConstantsProcedureDB.P_DEUDA_POLIZA);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.P_DEUDA_POLIZA,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			String deuda = (String) salida.get("deuda");
			String obs = (String) salida.get("obs");
			String datoSalida = (String) salida.get("datoSalida");
			
			return new AsyncResult<DeudaPoliza>(new DeudaPoliza( deuda,obs,datoSalida));
			} catch (Exception e) {
				return new AsyncResult<DeudaPoliza>(new DeudaPoliza());
				//Descomentar esta linea cuando se pase todo a produccion
				//throw e;
			}
		}

		
		
		
		
		
		
		//modal movimientos 
		
		
		public Object getMovimientosPoliza(String poliza,String ramo,String sucursal) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(WebAplicatioonConst.ENTORNO);
			logger.debug("Inicio el modal MOVIMIENTOS con : " + poliza + " ramo : "+ramo	);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_MOVS", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_CD_SUCURSAL", "sucursal");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_CAPO_NU_POLIZA", "poliza");
			xx.put("P_NU_CERTIFICADO", "certificado");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("sucursal", sucursal);
			

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_COBRANZAS, ConstantsProcedureDB.PUB_MOVIMIENTOS), parametrosIn, xx, ConstantsProcedureDB.PUB_MOVIMIENTOS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		//datos extra 
		
		
		public Object getDatosExtraPoliza(String poliza,String ramo,String sucursal,String certificado,String endoso, EnvironmentType environment, String user) throws Exception {

	
			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_DATOS", "datosSalida");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_CD_SUCURSAL", "sucursal");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_CAPO_NU_POLIZA", "poliza");
			xx.put("P_CACE_NU_CERTIFICADO", "certificado");
			xx.put("P_NU_ENDOSO", "endoso");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("certificado", certificado);
			parametrosIn.put("endoso", endoso);
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO, ConstantsProcedureDB.PUB_DATOS_EXTRA), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_EXTRA, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}

		public List getBoletaDePagoPoliza(String ramo, String poliza,String sucursal, EnvironmentType environment, String user) throws Exception {

			EnvironmentContextHolder.setEnvironmentType(environment);
			
			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_DEUD","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_NU_SUCU","sucursal");
			xx.put("P_NU_RAMO","ramo");
			xx.put("P_NU_POLI","poliza");
			xx.put("P_NU_CERT","certificado");
			
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("sucursal", sucursal);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("poliza", poliza);
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean("PKG_EMI_PSERVICIOS", "PDS_DATOS_DEUDA"), parametrosIn, xx, "PDS_DATOS_DEUDA", new Date().getTime(), "_");

			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			List lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
}
